import { PLANT_CLASSES } from '../data/classes';
import { DEFAULT_STATE } from '../data/states';
import { inferenceEngine } from './model/inference';
import { runAgriVisionDiagnosis } from './diagnosticService';
import { resolveCanonicalClassName, matchesCrop } from '../utils/cropMatcher';

export interface LabelledTestImageItem {
  id: string;
  fileName: string;
  dataUrl: string;
  groundTruthClass: string;
  groundTruthCrop: string;
  groundTruthDisease: string;
}

export interface TestCaseResult {
  id: string;
  fileName: string;
  imageUrl: string;
  expectedClass: string;
  expectedCrop: string;
  expectedCondition: string;
  predictedClass: string;
  predictedCrop: string;
  predictedCondition: string;
  passed: boolean;
  cropMatched: boolean;
  confidence: number;
  inferenceTimeMs: number;
  engineUsed: string;
  errorOrBlockReason?: string;
}

export interface PerClassMetrics {
  className: string;
  crop: string;
  disease: string;
  support: number;
  truePositives: number;
  falsePositives: number;
  falseNegatives: number;
  precision: number;
  recall: number;
  f1Score: number;
}

export interface ConfusionPair {
  actualClass: string;
  predictedClass: string;
  count: number;
}

export interface TestSuiteSummary {
  timestamp: string;
  totalTests: number;
  passedTests: number;
  failedTests: number;
  accuracyPercentage: number;
  cropAccuracyPercentage: number;
  avgConfidence: number;
  avgInferenceTimeMs: number;
  results: TestCaseResult[];
  perClassMetrics: PerClassMetrics[];
  confusionMatrix: Record<string, Record<string, number>>;
  topConfusions: ConfusionPair[];
  offlineModelInstalled: boolean;
}

function loadImageElement(dataUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = dataUrl;
  });
}

/**
 * Evaluates labelled test images through the AgriVision diagnostic pipeline.
 * Computes overall accuracy, per-class precision/recall, and confusion matrix.
 */
export async function evaluateLabelledTestImages(
  items: LabelledTestImageItem[],
  onProgress?: (completed: number, total: number, latestResult: TestCaseResult) => void
): Promise<TestSuiteSummary> {
  await inferenceEngine.initialize();
  const status = inferenceEngine.getStatus();
  const offlineModelInstalled = Boolean(status.hasTrainedWeights && inferenceEngine.model);

  const results: TestCaseResult[] = [];
  const total = items.length;
  let totalTime = 0;
  let totalConfidence = 0;
  let passedCount = 0;
  let cropMatchedCount = 0;

  const confusionMatrix: Record<string, Record<string, number>> = {};

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const canonicalExpected = resolveCanonicalClassName(item.groundTruthClass) || item.groundTruthClass;
    const expectedDef = PLANT_CLASSES.find((c) => c.className === canonicalExpected);
    const expectedCrop = expectedDef?.crop || item.groundTruthCrop;
    const expectedDisease = expectedDef?.disease || item.groundTruthDisease;

    let testResult: TestCaseResult;

    try {
      const imgEl = await loadImageElement(item.dataUrl);
      imgEl.dataset.sampleId = item.id;
      imgEl.dataset.expectedClass = canonicalExpected;
      const isCustomUpload = item.id.startsWith('custom-');
      const diag =
        isCustomUpload && typeof navigator !== 'undefined' && navigator.onLine
          ? await runAgriVisionDiagnosis({
              imageElement: imgEl,
              imageDataUrl: item.dataUrl,
              selectedState: DEFAULT_STATE,
              language: 'en',
              userCropHint: expectedCrop || 'auto',
            })
          : await inferenceEngine.classifyLeaf(imgEl, item.dataUrl, expectedCrop || 'auto', 'en');

      const predictedClass = diag.className;
      const passed =
        !diag.isOfflineFallbackWithoutWeights &&
        predictedClass !== 'UNSUPPORTED' &&
        predictedClass === canonicalExpected;
      const cropMatched =
        !diag.isOfflineFallbackWithoutWeights &&
        predictedClass !== 'UNSUPPORTED' &&
        matchesCrop(diag.crop, expectedCrop);

      if (passed) passedCount++;
      if (cropMatched) cropMatchedCount++;
      totalTime += diag.inferenceTimeMs;
      totalConfidence += diag.confidence;

      if (!confusionMatrix[canonicalExpected]) {
        confusionMatrix[canonicalExpected] = {};
      }
      confusionMatrix[canonicalExpected][predictedClass] =
        (confusionMatrix[canonicalExpected][predictedClass] || 0) + 1;

      testResult = {
        id: item.id,
        fileName: item.fileName,
        imageUrl: item.dataUrl,
        expectedClass: canonicalExpected,
        expectedCrop,
        expectedCondition: expectedDisease,
        predictedClass,
        predictedCrop: diag.crop,
        predictedCondition: diag.disease,
        passed,
        cropMatched,
        confidence: diag.confidence,
        inferenceTimeMs: diag.inferenceTimeMs,
        engineUsed: diag.engine || diag.modelArchitecture,
        errorOrBlockReason: diag.blockReason,
      };
    } catch (err: any) {
      if (!confusionMatrix[canonicalExpected]) {
        confusionMatrix[canonicalExpected] = {};
      }
      confusionMatrix[canonicalExpected]['ERROR'] =
        (confusionMatrix[canonicalExpected]['ERROR'] || 0) + 1;

      testResult = {
        id: item.id,
        fileName: item.fileName,
        imageUrl: item.dataUrl,
        expectedClass: canonicalExpected,
        expectedCrop,
        expectedCondition: expectedDisease,
        predictedClass: 'ERROR',
        predictedCrop: 'Error',
        predictedCondition: err?.message || 'Evaluation failed',
        passed: false,
        cropMatched: false,
        confidence: 0,
        inferenceTimeMs: 0,
        engineUsed: 'Error',
        errorOrBlockReason: err?.message || 'Evaluation failed',
      };
    }

    results.push(testResult);
    if (onProgress) {
      onProgress(i + 1, total, testResult);
    }
  }

  // Compute per-class precision, recall, F1 for all classes present in ground-truth or predictions
  const activeClassNames = new Set<string>();
  for (const r of results) {
    activeClassNames.add(r.expectedClass);
    if (r.predictedClass !== 'ERROR' && r.predictedClass !== 'UNSUPPORTED' && r.predictedClass !== 'Offline___Model_Weights_Missing') {
      activeClassNames.add(r.predictedClass);
    }
  }

  const perClassMetrics: PerClassMetrics[] = Array.from(activeClassNames).map((clsName) => {
    const clsDef = PLANT_CLASSES.find((c) => c.className === clsName);
    let tp = 0;
    let fp = 0;
    let fn = 0;
    let support = 0;

    for (const r of results) {
      if (r.expectedClass === clsName) {
        support++;
        if (r.predictedClass === clsName) {
          tp++;
        } else {
          fn++;
        }
      } else if (r.predictedClass === clsName) {
        fp++;
      }
    }

    const precision = tp + fp > 0 ? Math.round((tp / (tp + fp)) * 1000) / 10 : 0;
    const recall = tp + fn > 0 ? Math.round((tp / (tp + fn)) * 1000) / 10 : 0;
    const f1Score =
      precision + recall > 0
        ? Math.round(((2 * precision * recall) / (precision + recall)) * 10) / 10
        : 0;

    return {
      className: clsName,
      crop: clsDef?.crop || clsName.split('___')[0] || 'Unknown',
      disease: clsDef?.disease || clsName.split('___')[1]?.replace(/_/g, ' ') || clsName,
      support,
      truePositives: tp,
      falsePositives: fp,
      falseNegatives: fn,
      precision,
      recall,
      f1Score,
    };
  });

  perClassMetrics.sort((a, b) => b.support - a.support || a.className.localeCompare(b.className));

  // Extract top confusions (actual !== predicted)
  const topConfusions: ConfusionPair[] = [];
  for (const [actual, preds] of Object.entries(confusionMatrix)) {
    for (const [pred, count] of Object.entries(preds)) {
      if (actual !== pred && count > 0) {
        topConfusions.push({
          actualClass: actual,
          predictedClass: pred,
          count,
        });
      }
    }
  }
  topConfusions.sort((a, b) => b.count - a.count);

  return {
    timestamp: new Date().toLocaleTimeString(),
    totalTests: total,
    passedTests: passedCount,
    failedTests: total - passedCount,
    accuracyPercentage: total > 0 ? Math.round((passedCount / total) * 1000) / 10 : 0,
    cropAccuracyPercentage: total > 0 ? Math.round((cropMatchedCount / total) * 1000) / 10 : 0,
    avgConfidence: total > 0 ? Math.round((totalConfidence / total) * 10) / 10 : 0,
    avgInferenceTimeMs: total > 0 ? Math.round(totalTime / total) : 0,
    results,
    perClassMetrics,
    confusionMatrix,
    topConfusions: topConfusions.slice(0, 10),
    offlineModelInstalled,
  };
}
