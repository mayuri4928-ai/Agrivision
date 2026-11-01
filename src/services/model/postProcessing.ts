import { PLANT_CLASSES } from '../../data/classes';
import { ClassDefinition } from '../../types';

export interface PostProcessingFilterResult {
  cleanedProbabilities: Float32Array;
  filteredCount: number;
  filteredClasses: string[];
  filterReason?: string;
  isAmbiguous: boolean;
}

/**
 * Botanical family categorization for the 14 PlantVillage & PlantDoc crops
 * Ensures cross-species false-positive suppression (e.g. Corn Rust on Tomato)
 */
export function getBotanicalFamily(crop: string): string {
  const c = (crop || '').toLowerCase();
  if (c.includes('tomato') || c.includes('potato') || c.includes('pepper') || c.includes('capsicum')) return 'Solanaceae';
  if (c.includes('corn') || c.includes('maize') || c.includes('rice') || c.includes('paddy') || c.includes('wheat') || c.includes('sugarcane')) return 'Poaceae';
  if (c.includes('cotton')) return 'Malvaceae';
  if (c.includes('apple') || c.includes('peach') || c.includes('strawberry') || c.includes('cherry') || c.includes('raspberry')) return 'Rosaceae';
  if (c.includes('grape')) return 'Vitaceae';
  if (c.includes('orange') || c.includes('citrus')) return 'Rutaceae';
  if (c.includes('squash') || c.includes('cucurbit')) return 'Cucurbitaceae';
  if (c.includes('soybean')) return 'Fabaceae';
  if (c.includes('blueberry')) return 'Ericaceae';
  return 'Unknown';
}

export function isSameCropName(cropA: string, cropB: string): boolean {
  if (!cropA || !cropB) return false;
  const clean = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, ' ');
  const aTokens = clean(cropA).split(/\s+/).filter((t) => t.length > 2);
  const bTokens = clean(cropB).split(/\s+/).filter((t) => t.length > 2);
  return aTokens.some((t) => bTokens.includes(t));
}

export const CROP_BOTANICAL_FAMILIES: Record<string, string> = {
  Tomato: 'Solanaceae',
  Potato: 'Solanaceae',
  Pepper: 'Solanaceae',
  'Bell Pepper': 'Solanaceae',
  'Bell Pepper / Capsicum': 'Solanaceae',
  Corn: 'Poaceae',
  Maize: 'Poaceae',
  'Corn / Maize': 'Poaceae',
  Apple: 'Rosaceae',
  Peach: 'Rosaceae',
  Strawberry: 'Rosaceae',
  Cherry: 'Rosaceae',
  Grape: 'Vitaceae',
  Orange: 'Rutaceae',
  'Orange / Citrus': 'Rutaceae',
  Citrus: 'Rutaceae',
  Squash: 'Cucurbitaceae',
  'Squash / Cucurbit': 'Cucurbitaceae',
  Soybean: 'Fabaceae',
  Blueberry: 'Ericaceae',
  Raspberry: 'Rosaceae',
  Rice: 'Poaceae',
  'Rice (Paddy)': 'Poaceae',
  Wheat: 'Poaceae',
  Cotton: 'Malvaceae',
  Sugarcane: 'Poaceae',
};

/**
 * Multi-stage post-processing pipeline to filter out low-probability false positives:
 * 1. Absolute probability noise floor filter (< 3.5%)
 * 2. Relative dominant-margin tail filter (< 10% of top class)
 * 3. Taxonomic & botanical cross-crop consistency filter
 * 4. Post-filter re-normalization to guarantee a valid probability distribution
 */
export function filterLowProbabilityFalsePositives(
  rawProbabilities: Float32Array | number[],
  userCropHint?: string,
  noiseThreshold: number = 0.035
): PostProcessingFilterResult {
  const n = rawProbabilities.length;
  const filtered = new Float32Array(n);
  const filteredClasses: string[] = [];

  // Find preliminary dominant candidate
  let maxProb = -1;
  let maxIdx = 0;
  for (let i = 0; i < n; i++) {
    const p = rawProbabilities[i];
    filtered[i] = p;
    if (p > maxProb) {
      maxProb = p;
      maxIdx = i;
    }
  }

  const topClass = PLANT_CLASSES[maxIdx];
  const topCrop = topClass?.crop || '';
  const topFamily = getBotanicalFamily(topCrop);
  const normCropHint = userCropHint ? userCropHint.toLowerCase().trim() : '';

  // Stage 1 & 2: Absolute noise floor & relative margin pruning
  for (let i = 0; i < n; i++) {
    if (i === maxIdx) continue; // Keep top class intact

    const cls = PLANT_CLASSES[i];
    const prob = filtered[i];
    const clsFamily = getBotanicalFamily(cls.crop);
    const isSameFamily = topFamily !== 'Unknown' && clsFamily === topFamily;

    // 1. Absolute noise floor filter (suppresses 0.5% - 3.5% uniform softmax tail)
    if (prob < noiseThreshold) {
      filtered[i] = 0;
      filteredClasses.push(`${cls.className} (below noise floor ${Math.round(prob * 1000) / 10}%)`);
      continue;
    }

    // 2. Relative margin filter (if leader is strong >= 65%, prune tiny tail < 10% of leader)
    // Preserves legitimate taxonomic alternatives from the same botanical family (e.g. Strawberry vs Raspberry)
    if (maxProb >= 0.65 && prob < maxProb * 0.10 && !isSameFamily) {
      filtered[i] = 0;
      filteredClasses.push(`${cls.className} (tail margin < 10% of leader)`);
      continue;
    }

    // 3. Botanical / Taxonomic Cross-Crop Consistency Filter
    // If top crop is strongly identified or user specified a crop hint,
    // filter out spurious classes from completely unrelated botanical families.
    const hintFamily =
      normCropHint && normCropHint !== 'all' && normCropHint !== 'auto'
        ? getBotanicalFamily(normCropHint)
        : 'Unknown';

    const hasActiveCropConstraint =
      hintFamily !== 'Unknown' ||
      (normCropHint && normCropHint !== 'all' && normCropHint !== 'auto') ||
      maxProb >= 0.35;

    if (hasActiveCropConstraint) {
      const isTargetFamily =
        hintFamily !== 'Unknown'
          ? clsFamily === hintFamily
          : topFamily !== 'Unknown' && clsFamily === topFamily;
      const isTargetCrop =
        normCropHint && normCropHint !== 'all' && normCropHint !== 'auto'
          ? isSameCropName(cls.crop, normCropHint)
          : isSameCropName(cls.crop, topCrop);

      // If from a totally different family and probability is modest (< 25%), prune as cross-crop false positive
      if (!isTargetFamily && !isTargetCrop && prob < 0.25) {
        filtered[i] = 0;
        filteredClasses.push(
          `${cls.className} (taxonomic mismatch: ${clsFamily} vs ${
            hintFamily !== 'Unknown' ? hintFamily : topFamily
          })`
        );
      }
    }
  }

  // Stage 4: Re-normalize surviving candidate probabilities
  let survivingSum = 0;
  for (let i = 0; i < n; i++) {
    survivingSum += filtered[i];
  }

  if (survivingSum > 0) {
    for (let i = 0; i < n; i++) {
      filtered[i] = filtered[i] / survivingSum;
    }
  } else {
    // Safety fallback: if all were zeroed, restore top class
    filtered[maxIdx] = 1.0;
  }

  // Stage 5: Check ambiguity / low confidence threshold
  const finalTopProb = filtered[maxIdx];
  const isAmbiguous = finalTopProb < 0.40;

  return {
    cleanedProbabilities: filtered,
    filteredCount: filteredClasses.length,
    filteredClasses,
    filterReason:
      filteredClasses.length > 0
        ? `Filtered ${filteredClasses.length} low-probability false positives and cross-species background noise.`
        : 'No spurious false positives detected.',
    isAmbiguous,
  };
}
