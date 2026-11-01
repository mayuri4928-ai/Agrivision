import { IndianState, CropSuitabilityReport, LanguageCode } from '../types';
import { CROP_PROFILES } from './cropEncyclopediaData';
import { getLocalizedCropName } from './localizedCropsAndDiseases';

/**
 * Agro-climatic suitability mapping for the 14 PlantVillage / PlantDoc benchmark crops
 * across Indian States & Agro-Climatic Zones based on ICAR guidelines.
 */

// Canonical crops in lowercase
export type CanonicalCropKey =
  | 'apple'
  | 'blueberry'
  | 'cherry'
  | 'corn'
  | 'grape'
  | 'orange'
  | 'peach'
  | 'pepper'
  | 'potato'
  | 'raspberry'
  | 'soybean'
  | 'squash'
  | 'strawberry'
  | 'tomato'
  | 'rice'
  | 'wheat'
  | 'cotton'
  | 'sugarcane';

export interface CropAgroRequirement {
  cropKey: CanonicalCropKey;
  cropName: string;
  chillingHoursRequired: number; // e.g. 800-1200 hrs < 7°C for temperate apples
  climateCategory: 'Temperate / Alpine' | 'Sub-Tropical' | 'Tropical / Humid' | 'Warm Semi-Arid' | 'Broadly Adaptable';
  idealTempRange: string;
  soilRequirement: string;
  unsuitableRegions: string[]; // State codes or names where natural open-field cultivation causes crop failure
  suitableStates: string[]; // State codes
  marginalStates: string[]; // Polyhouse only / specialty high hills
  unsuitableExplanation: (stateName: string, zone: string) => string;
  removalSteps: string;
}

export const CROP_AGRO_REQUIREMENTS: Record<CanonicalCropKey, CropAgroRequirement> = {
  apple: {
    cropKey: 'apple',
    cropName: 'Apple',
    chillingHoursRequired: 1000,
    climateCategory: 'Temperate / Alpine',
    idealTempRange: '12°C - 24°C in summer, <7°C chilling for 800-1200 hours in winter',
    soilRequirement: 'Well-drained deep loam to clay-loam, pH 5.5 - 6.5, high organic matter',
    suitableStates: ['JK', 'HP', 'UK', 'AR'],
    marginalStates: ['SK', 'NL', 'MN'],
    unsuitableRegions: ['AP', 'BR', 'CG', 'GA', 'GJ', 'HR', 'JH', 'KA', 'KL', 'MP', 'MH', 'MZ', 'OR', 'PB', 'RJ', 'TN', 'TG', 'TR', 'UP', 'WB', 'AN', 'CH', 'DH', 'DL', 'PY'],
    unsuitableExplanation: (stateName, zone) =>
      `Apple is a high-chill temperate fruit requiring 800–1200 hours of winter chilling temperatures below 7°C to break winter dormancy. In ${stateName} (${zone}), tropical or subtropical heat with high summer temperatures (>35°C) and lack of winter chilling prevents floral bud initiation, causing flower drop, severe vegetative stuntedness, and complete yield failure in open fields.`,
    removalSteps:
      'Uproot or safely excavate unproductive apple saplings from the plot. Till the bed to a depth of 25–30 cm to break hard pans, solarize the topsoil for 10–14 days under clear polyethylene to eliminate root pathogens, and amend with well-decomposed FYM (farmyard manure) before sowing the replacement crop.',
  },
  cherry: {
    cropKey: 'cherry',
    cropName: 'Cherry',
    chillingHoursRequired: 900,
    climateCategory: 'Temperate / Alpine',
    idealTempRange: '10°C - 22°C, requires 800-1000 chilling hours',
    soilRequirement: 'Deep, gravelly or sandy loam with excellent subsoil drainage, pH 6.0 - 7.0',
    suitableStates: ['JK', 'HP', 'UK'],
    marginalStates: ['AR', 'SK'],
    unsuitableRegions: ['AP', 'BR', 'CG', 'GA', 'GJ', 'HR', 'JH', 'KA', 'KL', 'MP', 'MH', 'MZ', 'NL', 'OR', 'PB', 'RJ', 'TN', 'TG', 'TR', 'UP', 'WB', 'AN', 'CH', 'DH', 'DL', 'PY'],
    unsuitableExplanation: (stateName, zone) =>
      `Sweet cherry trees strictly require 800–1000 winter chilling hours below 7°C and cool dry summers. In ${stateName} (${zone}), high winter temperatures prevent bud burst, and intense tropical monsoon rains during fruit set cause severe blossom blight, root suffocation, and tree mortality.`,
    removalSteps:
      'Carefully dig out the cherry plants along with root balls. Check for root rot spores. Inoculate the planting beds with Trichoderma viride bio-fungicide (5 kg/ha mixed with 100 kg vermicompost) to sterilize the soil microbiome before establishing suitable local commercial crops.',
  },
  peach: {
    cropKey: 'peach',
    cropName: 'Peach',
    chillingHoursRequired: 400,
    climateCategory: 'Temperate / Alpine',
    idealTempRange: '15°C - 28°C, requires 250-600 winter chilling hours',
    soilRequirement: 'Deep well-drained sandy loam, intolerant of waterlogging, pH 6.0 - 6.8',
    suitableStates: ['JK', 'HP', 'UK', 'PB'],
    marginalStates: ['HR', 'UP', 'SK'],
    unsuitableRegions: ['AP', 'CG', 'GA', 'GJ', 'JH', 'KA', 'KL', 'MP', 'MH', 'MZ', 'NL', 'OR', 'RJ', 'TN', 'TG', 'TR', 'AN', 'DH', 'PY'],
    unsuitableExplanation: (stateName, zone) =>
      `Deciduous peach requires chilling hours (250–500 hours <7°C) and cannot tolerate hot tropical summers or waterlogged heavy clay soils typical of ${stateName} (${zone}). Trees succumb rapidly to gummosis, collar rot, and zero flowering.`,
    removalSteps:
      'Remove peach rootstock safely. Level the plot and construct raised broad beds (15 cm height) with proper drainage channels to prevent root fungal stagnation for your next crop.',
  },
  blueberry: {
    cropKey: 'blueberry',
    cropName: 'Blueberry',
    chillingHoursRequired: 500,
    climateCategory: 'Temperate / Alpine',
    idealTempRange: '15°C - 25°C, requires acidic peat/soil pH 4.2 - 5.2',
    soilRequirement: 'Strictly acidic soil (pH 4.2 - 5.2), high organic matter, excellent aeration',
    suitableStates: ['HP', 'UK', 'TN'], // High Nilgiri hills only
    marginalStates: ['JK', 'ML', 'SK'],
    unsuitableRegions: ['AP', 'BR', 'CG', 'GA', 'GJ', 'HR', 'JH', 'KA', 'KL', 'MP', 'MH', 'MZ', 'NL', 'OR', 'PB', 'RJ', 'TG', 'TR', 'UP', 'WB', 'AN', 'CH', 'DH', 'DL', 'PY'],
    unsuitableExplanation: (stateName, zone) =>
      `Blueberries demand specialized acidic soil (pH 4.5–5.2) and cool mountain microclimates. In ${stateName} (${zone}), alkaline, neutral, or heavy black/alluvial soils trigger severe iron chlorosis, root necrosis, and death within months in standard field conditions.`,
    removalSteps:
      'Remove blueberry plants. Re-balance soil pH by incorporating agricultural gypsum or organic matter if sulfur amendments were previously applied. Broadcast green manure seeds (Daincha or Sunhemp) for 45 days before planting replacement crops.',
  },
  raspberry: {
    cropKey: 'raspberry',
    cropName: 'Raspberry',
    chillingHoursRequired: 600,
    climateCategory: 'Temperate / Alpine',
    idealTempRange: '14°C - 24°C, sensitive to heat >30°C',
    soilRequirement: 'Sandy loam rich in humus, well-aerated, pH 5.5 - 6.5',
    suitableStates: ['HP', 'UK', 'JK'],
    marginalStates: ['SK', 'AR'],
    unsuitableRegions: ['AP', 'BR', 'CG', 'GA', 'GJ', 'HR', 'JH', 'KA', 'KL', 'MP', 'MH', 'MZ', 'NL', 'OR', 'PB', 'RJ', 'TN', 'TG', 'TR', 'UP', 'WB', 'AN', 'CH', 'DH', 'DL', 'PY'],
    unsuitableExplanation: (stateName, zone) =>
      `Raspberry canes are easily scorched by tropical summer sun and cannot withstand temperatures above 30°C. In ${stateName} (${zone}), plants suffer cane dieback, flower desiccation, and complete loss.`,
    removalSteps:
      'Cut and remove cane brushwood. Solarize soil beds and incorporate well-rotted cow dung manure to replenish topsoil organic matter.',
  },
  strawberry: {
    cropKey: 'strawberry',
    cropName: 'Strawberry',
    chillingHoursRequired: 200,
    climateCategory: 'Sub-Tropical',
    idealTempRange: '16°C - 26°C daytime, 8°C - 14°C night',
    soilRequirement: 'Light sandy loam, well-drained, rich in humus, pH 5.5 - 6.5',
    suitableStates: ['MH', 'HP', 'ML', 'PB', 'UK', 'JK'],
    marginalStates: ['KA', 'HR', 'RJ', 'UP', 'WB'],
    unsuitableRegions: ['AN', 'DH', 'GA', 'KL', 'TR'],
    unsuitableExplanation: (stateName, zone) =>
      `While strawberry is grown seasonally in high hills or specialized winter pockets (like Mahabaleshwar), in tropical maritime or flood-prone humid regions like ${stateName} (${zone}), high nighttime temperatures and water saturation rot crowns and invite uncontrollable anthracnose fruit rot.`,
    removalSteps:
      'Remove plastic mulch and infected strawberry runners. Deep-plow the field to expose fungal resting sclerotia to direct sunlight, then ridge the soil for suitable vegetable crops.',
  },
  soybean: {
    cropKey: 'soybean',
    cropName: 'Soybean',
    chillingHoursRequired: 0,
    climateCategory: 'Warm Semi-Arid',
    idealTempRange: '20°C - 32°C, Kharif warm season legume',
    soilRequirement: 'Well-drained deep clay-loam to sandy loam, pH 6.0 - 7.5',
    suitableStates: ['MP', 'MH', 'RJ', 'KA', 'TG', 'CG', 'JH', 'GJ'],
    marginalStates: ['UP', 'AP', 'HR', 'PB', 'OR'],
    unsuitableRegions: ['JK', 'HP', 'LA'], // Extreme alpine cold
    unsuitableExplanation: (stateName, zone) =>
      `Soybean requires 20°C–32°C warm weather and adequate photoperiod. In cold alpine high-altitude regions like ${stateName} (${zone}), short frost-free windows and frigid temperatures prevent pod filling and grain maturation.`,
    removalSteps:
      'Harvest or disc-under unproductive soybean vegetative mass as green manure to fix atmospheric nitrogen into the soil before transitioning to cold-tolerant temperate crops.',
  },
  orange: {
    cropKey: 'orange',
    cropName: 'Orange / Citrus',
    chillingHoursRequired: 0,
    climateCategory: 'Sub-Tropical',
    idealTempRange: '20°C - 35°C, sub-tropical dry to semi-arid',
    soilRequirement: 'Deep light loam or black cotton soil with good drainage, pH 6.5 - 8.0',
    suitableStates: ['MH', 'PB', 'RJ', 'AP', 'MP', 'AS', 'ML', 'TR', 'WB'],
    marginalStates: ['KA', 'TG', 'GJ', 'HR', 'UP'],
    unsuitableRegions: ['LA', 'JK'], // High alpine cold zones
    unsuitableExplanation: (stateName, zone) =>
      `Citrus species cannot tolerate hard winter freezes or sub-zero frosts common in alpine high-altitude sectors of ${stateName} (${zone}). Frost cracks bark, destroys fruit, and kills saplings.`,
    removalSteps:
      'Remove frost-damaged citrus trees. Prepare the terrace or orchard with organic mulch and plant hardy deciduous fruit trees or winter root vegetables.',
  },
  grape: {
    cropKey: 'grape',
    cropName: 'Grape',
    chillingHoursRequired: 100,
    climateCategory: 'Sub-Tropical',
    idealTempRange: '22°C - 35°C, dry sunny ripening period essential',
    soilRequirement: 'Sandy loam to light black soil with good drainage, pH 6.5 - 7.5',
    suitableStates: ['MH', 'KA', 'AP', 'TN', 'PB', 'HR', 'MZ'],
    marginalStates: ['GJ', 'MP', 'RJ', 'TG'],
    unsuitableRegions: ['AS', 'ML', 'NL', 'TR', 'AN', 'LA', 'JK'], // Very high rainfall monsoon belt or alpine
    unsuitableExplanation: (stateName, zone) =>
      `Grapevine cultivation requires a distinct dry warm period during fruit maturation and berry ripening. In high-rainfall or cloud-heavy zones of ${stateName} (${zone}), continuous rainfall causes severe downy mildew, black rot, berry cracking, and sour rots, making commercial viticulture economically unviable.`,
    removalSteps:
      'Dismantle damaged vine canopies and trellis debris. Treat the plot with copper oxychloride drenching (3 g/L) and cultivate rain-tolerant crops with raised beds.',
  },
  potato: {
    cropKey: 'potato',
    cropName: 'Potato',
    chillingHoursRequired: 0,
    climateCategory: 'Broadly Adaptable',
    idealTempRange: '15°C - 22°C for tuber initiation',
    soilRequirement: 'Loose, friable sandy loam rich in organic matter, pH 5.2 - 6.4',
    suitableStates: ['UP', 'WB', 'BR', 'GJ', 'PB', 'MP', 'HP', 'AS', 'KA', 'MH'],
    marginalStates: ['RJ', 'HR', 'JH', 'OR', 'TN', 'CG', 'AP', 'TG'],
    unsuitableRegions: ['AN', 'LA'],
    unsuitableExplanation: (stateName, zone) =>
      `Potatoes require night temperatures below 20°C for tuber formation. In high-temperature tropical coastlines or waterlogged regions of ${stateName} (${zone}), plants produce only spindly haulms without underground tubers.`,
    removalSteps:
      'Dig up rotten seed tubers to prevent Erwinia soft rot bacteria from harboring in the soil. Allow soil to dry in the sun for 10 days, then rotate with heat-tolerant cucurbits or pulses.',
  },
  tomato: {
    cropKey: 'tomato',
    cropName: 'Tomato',
    chillingHoursRequired: 0,
    climateCategory: 'Broadly Adaptable',
    idealTempRange: '18°C - 30°C',
    soilRequirement: 'Rich loam with good drainage, pH 6.0 - 7.0',
    suitableStates: ['AP', 'MP', 'KA', 'GJ', 'OR', 'WB', 'MH', 'TN', 'TG', 'UP', 'BR', 'HR', 'PB', 'HP', 'JH', 'CG'],
    marginalStates: ['RJ', 'AS', 'ML', 'MZ', 'NL', 'TR'],
    unsuitableRegions: ['LA'], // High Ladakh alpine cold
    unsuitableExplanation: (stateName, zone) =>
      `Tomato is adaptable across most of India, but in sub-zero alpine frost areas of ${stateName} (${zone}), open-field cultivation is destroyed by early freezing without polyhouse heating.`,
    removalSteps:
      'Clear frost-wilted tomato residue and convert protected frames to cold-hardy leafy greens like spinach or cabbage.',
  },
  pepper: {
    cropKey: 'pepper',
    cropName: 'Bell Pepper (Capsicum)',
    chillingHoursRequired: 0,
    climateCategory: 'Broadly Adaptable',
    idealTempRange: '18°C - 28°C',
    soilRequirement: 'Fertile sandy loam, pH 6.0 - 6.8',
    suitableStates: ['KA', 'HP', 'MH', 'WB', 'HR', 'TN', 'UP', 'AP', 'PB', 'GJ'],
    marginalStates: ['MP', 'BR', 'JH', 'CG', 'OR', 'TG', 'RJ'],
    unsuitableRegions: ['LA'],
    unsuitableExplanation: (stateName, zone) =>
      `Capsicum blossoms drop when exposed to extreme cold (<10°C) or scorching heat (>35°C). In ${stateName} (${zone}), open field conditions cause severe flower drop and viral stuntedness.`,
    removalSteps:
      'Uproot infected or unproductive pepper plants, solarize the beds, and sow locally recommended legumes or gourds.',
  },
  corn: {
    cropKey: 'corn',
    cropName: 'Corn (Maize)',
    chillingHoursRequired: 0,
    climateCategory: 'Broadly Adaptable',
    idealTempRange: '21°C - 32°C',
    soilRequirement: 'Deep fertile loam to silt-loam, pH 5.8 - 7.5',
    suitableStates: ['KA', 'MP', 'BR', 'RJ', 'MH', 'TG', 'AP', 'UP', 'PB', 'HR', 'GJ', 'TN'],
    marginalStates: ['OR', 'WB', 'JH', 'CG', 'AS', 'HP', 'UK'],
    unsuitableRegions: ['LA'],
    unsuitableExplanation: (stateName, zone) =>
      `Maize requires warm daytime heat and fertile soil. In alpine cold desert sectors of ${stateName} (${zone}), inadequate thermal units cause stunted cob development.`,
    removalSteps:
      'Chop maize stalks for animal fodder or compost. Disc the field to prepare fine tilth for regional pulse crops.',
  },
  squash: {
    cropKey: 'squash',
    cropName: 'Squash / Cucurbits',
    chillingHoursRequired: 0,
    climateCategory: 'Broadly Adaptable',
    idealTempRange: '22°C - 34°C',
    soilRequirement: 'Sandy loam to riverbed alluvial soils, pH 6.0 - 7.5',
    suitableStates: ['UP', 'BR', 'PB', 'KA', 'AP', 'TN', 'WB', 'MP', 'MH', 'GJ', 'RJ', 'HR'],
    marginalStates: ['OR', 'CG', 'JH', 'TG', 'AS'],
    unsuitableRegions: ['LA', 'JK'], // High mountain winters
    unsuitableExplanation: (stateName, zone) =>
      `Cucurbits are highly frost-sensitive. In cold alpine sectors of ${stateName} (${zone}), plants rot quickly in freezing conditions.`,
    removalSteps:
      'Remove decaying vine mass. Solarize beds and sow cold-hardy cole crops like radish, turnip, or knol-khol.',
  },
  rice: {
    cropKey: 'rice',
    cropName: 'Rice (Paddy)',
    chillingHoursRequired: 0,
    climateCategory: 'Tropical / Humid',
    idealTempRange: '20°C - 38°C with abundant water',
    soilRequirement: 'Clay loam or heavy clay soils with high water retention capacity, pH 5.5 - 7.5',
    suitableStates: ['WB', 'UP', 'PB', 'AP', 'OR', 'TN', 'TG', 'BR', 'AS', 'CG', 'JH', 'HR', 'KL', 'MH'],
    marginalStates: ['RJ', 'GJ', 'MP', 'HP', 'UK'],
    unsuitableRegions: ['LA'],
    unsuitableExplanation: (stateName, zone) =>
      `Paddy requires warm humid weather and standing water for optimal growth. High-altitude cold arid sectors in ${stateName} (${zone}) cannot support rice due to severe low temperatures and water stress.`,
    removalSteps:
      'Drain excess moisture, incorporate crop stubbles into the soil, and prepare dryland pulse or oilseed beds.',
  },
  wheat: {
    cropKey: 'wheat',
    cropName: 'Wheat',
    chillingHoursRequired: 0,
    climateCategory: 'Broadly Adaptable',
    idealTempRange: '10°C - 25°C cool winter growing period',
    soilRequirement: 'Well-drained fertile loam to clay loam, pH 6.0 - 7.5',
    suitableStates: ['UP', 'PB', 'MP', 'HR', 'RJ', 'BR', 'GJ', 'MH', 'UK', 'JH'],
    marginalStates: ['WB', 'AS', 'OR', 'CG', 'HP', 'JK'],
    unsuitableRegions: ['KL', 'TN'],
    unsuitableExplanation: (stateName, zone) =>
      `Wheat requires a sustained cool winter period for tillering and grain setting. In humid tropical coastal belts of ${stateName} (${zone}), high temperatures cause premature forced maturity and negligible yield.`,
    removalSteps:
      'Harvest or incorporate dry biomass, apply organic manure, and prepare beds for tropical summer crops or paddy.',
  },
  cotton: {
    cropKey: 'cotton',
    cropName: 'Cotton',
    chillingHoursRequired: 0,
    climateCategory: 'Warm Semi-Arid',
    idealTempRange: '21°C - 35°C with 180-200 frost-free days',
    soilRequirement: 'Deep black cotton soils (vertisols) or well-drained alluvial loam, pH 6.0 - 8.0',
    suitableStates: ['GJ', 'MH', 'TG', 'AP', 'PB', 'HR', 'RJ', 'KA', 'MP', 'TN'],
    marginalStates: ['OR', 'UP'],
    unsuitableRegions: ['JK', 'HP', 'UK', 'LA', 'KL', 'AS', 'ML', 'NL', 'MZ', 'TR'],
    unsuitableExplanation: (stateName, zone) =>
      `Cotton requires a warm semi-arid growing season and is sensitive to waterlogging and cool montane climates. In ${stateName} (${zone}), persistent cold or excessive rainfall causes boll rot and plant death.`,
    removalSteps:
      'Uproot cotton stalks completely to prevent pink bollworm carryover, shred stalks for composting, and rotate with legumes.',
  },
  sugarcane: {
    cropKey: 'sugarcane',
    cropName: 'Sugarcane',
    chillingHoursRequired: 0,
    climateCategory: 'Tropical / Humid',
    idealTempRange: '24°C - 38°C with warm humid conditions',
    soilRequirement: 'Deep rich loamy soils with excellent drainage, pH 6.5 - 7.5',
    suitableStates: ['UP', 'MH', 'KA', 'TN', 'BR', 'GJ', 'AP', 'TG', 'PB', 'HR'],
    marginalStates: ['MP', 'WB', 'OR', 'JH', 'UK'],
    unsuitableRegions: ['JK', 'HP', 'LA', 'AR', 'MZ', 'NL'],
    unsuitableExplanation: (stateName, zone) =>
      `Sugarcane is a long-duration tropical crop requiring 10-12 months of frost-free warm weather. Cold montane regions of ${stateName} (${zone}) experience freezing temperatures that arrest sucrose accumulation.`,
    removalSteps:
      'Uproot old ratoon stools with tractor disc, apply bio-decomposers, and solarize the field before rotating with green manure.',
  },
};

/**
 * Helper to identify crop key from raw crop name string
 */
export function identifyCropKey(rawCrop: string): CanonicalCropKey {
  const lower = (rawCrop || '').toLowerCase();
  if (lower.includes('rice') || lower.includes('paddy') || lower.includes('dhan')) return 'rice';
  if (lower.includes('wheat') || lower.includes('gehun')) return 'wheat';
  if (lower.includes('cotton') || lower.includes('kapas')) return 'cotton';
  if (lower.includes('sugarcane') || lower.includes('ganna')) return 'sugarcane';
  if (lower.includes('apple')) return 'apple';
  if (lower.includes('cherry')) return 'cherry';
  if (lower.includes('peach')) return 'peach';
  if (lower.includes('blueberr')) return 'blueberry';
  if (lower.includes('raspberr')) return 'raspberry';
  if (lower.includes('strawberr')) return 'strawberry';
  if (lower.includes('corn') || lower.includes('maize')) return 'corn';
  if (lower.includes('grape')) return 'grape';
  if (lower.includes('orange') || lower.includes('citrus')) return 'orange';
  if (lower.includes('potato')) return 'potato';
  if (lower.includes('pepper') || lower.includes('capsicum')) return 'pepper';
  if (lower.includes('soybean')) return 'soybean';
  if (lower.includes('squash') || lower.includes('cucurbit')) return 'squash';
  return 'tomato';
}

/**
 * State-specific high-yield substitute crops recommended by ICAR
 */
export const STATE_REPLACEMENT_CROPS_DATABASE: Record<
  string,
  Array<{
    cropName: string;
    season: 'Kharif' | 'Rabi' | 'Zaid' | 'Perennial / Orchard';
    suitabilityReason: string;
    expectedAdvantage: string;
  }>
> = {
  // Northern Plains (UP, Bihar, Punjab, Haryana)
  UP: [
    {
      cropName: 'Potato (Kufri Pukhraj / Jyoti)',
      season: 'Rabi',
      suitabilityReason: 'Uttar Pradesh is India’s top potato producer with optimal winter alluvial sandy-loam soils in Agra, Kannauj, and Farrukhabad.',
      expectedAdvantage: 'Guaranteed harvest yield of 300–350 q/ha with high cold-storage market liquidity.',
    },
    {
      cropName: 'Tomato (Pusa Ruby / Arka Rakshak)',
      season: 'Kharif',
      suitabilityReason: 'Alluvial soils and warm sun support high-density vegetable beds with rapid 75-day turnaround.',
      expectedAdvantage: 'High daily local mandi demand and superior resistance to ToLCV in Arka varieties.',
    },
    {
      cropName: 'Corn / Maize (HQPM-1)',
      season: 'Kharif',
      suitabilityReason: 'Well-drained Gangetic silt supports vigorous coarse grain development during monsoon showers.',
      expectedAdvantage: 'Low input water footprint compared to paddy with assured feed industry procurement.',
    },
  ],
  BR: [
    {
      cropName: 'Corn / Maize (Shaktiman / Pioneer)',
      season: 'Rabi',
      suitabilityReason: 'Bihar (Begusarai, Khagaria, Samastipur) is the Maize Capital of India with world-class Rabi yields (70–80 q/ha).',
      expectedAdvantage: 'Highest maize profitability in South Asia with deep starch and poultry feed linkages.',
    },
    {
      cropName: 'Potato (Kufri Ashoka)',
      season: 'Rabi',
      suitabilityReason: 'Middle Gangetic cool winter mornings allow rapid bulking of tubers within 70 days.',
      expectedAdvantage: 'Quick harvest allowing triple cropping (Maize - Potato - Mung bean).',
    },
    {
      cropName: 'Tomato (Pusa Early Dwarf)',
      season: 'Rabi',
      suitabilityReason: 'Thrives in rich alluvial soil with mild winter sunlight.',
      expectedAdvantage: 'Consistent cash flow for smallholders in river valley plains.',
    },
  ],
  PB: [
    {
      cropName: 'Seed Potato (Kufri Chandramukhi)',
      season: 'Rabi',
      suitabilityReason: 'Jalandhar and Kapurthala offer aphid-free early winter windows producing certified disease-free seed tubers.',
      expectedAdvantage: 'Export-grade premium price supplied to all potato growing states across India.',
    },
    {
      cropName: 'Corn / Maize (PMH-1)',
      season: 'Kharif',
      suitabilityReason: 'Recommended by Punjab Agricultural University (PAU) to diversify away from water-depleting paddy.',
      expectedAdvantage: 'Saves 60% groundwater while fetching stable MSP.',
    },
    {
      cropName: 'Sub-tropical Peach (Sharbati / Shan-e-Punjab)',
      season: 'Perennial / Orchard',
      suitabilityReason: 'Low-chill sub-tropical peach varieties bred by PAU require only 150–200 chilling hours.',
      expectedAdvantage: 'High early-season market returns in Delhi/Chandigarh wholesale markets in May.',
    },
  ],
  HR: [
    {
      cropName: 'Tomato (Polyhouse / Arka Abhed)',
      season: 'Rabi',
      suitabilityReason: 'Haryana is a national leader in protected peri-urban vegetable farming near NCR markets.',
      expectedAdvantage: 'Triple-disease resistant hybrid producing 80–100 tonnes/ha with premium Delhi NCR pricing.',
    },
    {
      cropName: 'Bell Pepper / Capsicum (Indam Bharat)',
      season: 'Rabi',
      suitabilityReason: 'Ideal for shade-net and micro-irrigation cultivation in Karnal and Sonipat.',
      expectedAdvantage: 'High profit margin per square meter with export quality grade.',
    },
  ],
  // Western / Central India
  MH: [
    {
      cropName: 'Grape (Thompson Seedless / Sharad Seedless)',
      season: 'Perennial / Orchard',
      suitabilityReason: 'Maharashtra (Nashik, Sangli, Solapur) produces over 80% of India’s grapes under ideal semi-arid Deccan weather.',
      expectedAdvantage: 'High export value to Europe and UAE with established cold chains and processing wineries.',
    },
    {
      cropName: 'Soybean (JS-335 / JS-9560)',
      season: 'Kharif',
      suitabilityReason: 'Marathwada and Vidarbha black cotton soils hold Kharif moisture perfectly for oilseed pods.',
      expectedAdvantage: 'Assured processing mill demand across Indore and Nagpur edible oil clusters.',
    },
    {
      cropName: 'Tomato (Abhinav / US-440)',
      season: 'Kharif',
      suitabilityReason: 'Pune, Nashik, and Ahmednagar are year-round tomato hubs servicing national markets.',
      expectedAdvantage: 'Sturdy fruit with 14-day transport shelf life for long-distance transport to northern mandis.',
    },
    {
      cropName: 'Orange / Citrus (Nagpur Mandarin)',
      season: 'Perennial / Orchard',
      suitabilityReason: 'Vidarbha’s black soil and dry autumn climate produce the world-famous sweet Nagpur Santra.',
      expectedAdvantage: 'High retail fruit value with flourishing domestic and overseas demand.',
    },
  ],
  MP: [
    {
      cropName: 'Soybean (JS-20-34 / NRC-127)',
      season: 'Kharif',
      suitabilityReason: 'Madhya Pradesh is the "Soybean Bowl of India" with deep black soil and optimal rainfall.',
      expectedAdvantage: 'Highest commercial oilseed liquidity in central India with low chemical input costs.',
    },
    {
      cropName: 'Corn / Maize (JM-216)',
      season: 'Kharif',
      suitabilityReason: 'Chhindwara and Malwa regions provide rolling slopes with zero waterlogging for high-density corn.',
      expectedAdvantage: 'Heavy grain weight with guaranteed procurement by regional processing plants.',
    },
    {
      cropName: 'Tomato (Arka Rakshak)',
      season: 'Rabi',
      suitabilityReason: 'Dry winter weather reduces fungal blight pressure significantly compared to coastal regions.',
      expectedAdvantage: 'High yields of uniform firm fruits for wholesale traders.',
    },
  ],
  GJ: [
    {
      cropName: 'Potato (Lady Rosetta / Kufri Chipsona)',
      season: 'Rabi',
      suitabilityReason: 'Banaskantha and Deesa are world benchmarks for contract farming of processing-grade crisping potatoes.',
      expectedAdvantage: 'Contract buyback agreements with leading food conglomerates with assured margins.',
    },
    {
      cropName: 'Tomato (Gujarat Tomato-3)',
      season: 'Rabi',
      suitabilityReason: 'Deep light loam and drip fertigation maximize canopy productivity in Saurashtra.',
      expectedAdvantage: 'High total soluble solids (TSS) ideal for pulp and paste processing.',
    },
  ],
  RJ: [
    {
      cropName: 'Corn / Maize (Pratap QPM-1)',
      season: 'Kharif',
      suitabilityReason: 'Bred specifically by MPUAT Udaipur for semi-arid rainfed conditions of Mewar and Hadoti.',
      expectedAdvantage: 'Drought-hardy with superior protein content for dairy feed.',
    },
    {
      cropName: 'Soybean (RKS-18)',
      season: 'Kharif',
      suitabilityReason: 'Kota and Baran fertile vertisols sustain bumper Kharif oilseed yields.',
      expectedAdvantage: 'High oil yield and pod shatter resistance.',
    },
  ],
  // Southern India
  AP: [
    {
      cropName: 'Tomato (Arka Saurabh / Pusa Hybrid-2)',
      season: 'Kharif',
      suitabilityReason: 'Madanapalle in Chittoor is one of Asia’s largest tomato markets with well-established distribution.',
      expectedAdvantage: 'Year-round harvesting windows with direct auction market access.',
    },
    {
      cropName: 'Corn / Maize (DHM-117)',
      season: 'Kharif',
      suitabilityReason: 'Coastal and Rayalaseema irrigated fertile red loam soils support vigorous dual-season corn.',
      expectedAdvantage: 'High fodder and grain harvest with 60–70 q/ha yield.',
    },
    {
      cropName: 'Bell Pepper (Colour Capsicum - Yellow/Red)',
      season: 'Rabi',
      suitabilityReason: 'Growing polyhouse clusters around Bangalore-Hyderabad corridor command premium metro prices.',
      expectedAdvantage: 'Supermarket and HoReCa premium margins.',
    },
  ],
  KA: [
    {
      cropName: 'Tomato (Arka Abhed / Arka Alok)',
      season: 'Kharif',
      suitabilityReason: 'Kolar and Chikkaballapur red loams and moderate climate are the premier tomato belt of South India.',
      expectedAdvantage: 'Multiple disease resistance (ToLCV + Bacterial Wilt + Early Blight) bred by IIHR Bengaluru.',
    },
    {
      cropName: 'Corn / Maize (Hema / Nithyashree)',
      season: 'Kharif',
      suitabilityReason: 'Karnataka is India’s largest maize producer (Davangere, Haveri) with unmatched hybrid vigor.',
      expectedAdvantage: 'Highest institutional starch factory and poultry industry demand.',
    },
    {
      cropName: 'Grape (Bangalore Blue / Thompson Seedless)',
      season: 'Perennial / Orchard',
      suitabilityReason: 'Bijapur, Bagalkot, and Bengaluru Rural have ideal warm semi-arid climates for continuous cropping.',
      expectedAdvantage: 'Bangalore Blue possesses Geographical Indication (GI) tag with high juice processing demand.',
    },
  ],
  TN: [
    {
      cropName: 'Tomato (Co-3 / PKM-1)',
      season: 'Kharif',
      suitabilityReason: 'Dharmapuri and Salem red sandy loam soils promote vigorous taproots with drip irrigation.',
      expectedAdvantage: 'Bred by TNAU Coimbatore for high heat tolerance and heavy cluster fruit set.',
    },
    {
      cropName: 'Corn / Maize (CoHM-6)',
      season: 'Kharif',
      suitabilityReason: 'Palladam and Namakkal poultry clusters create massive direct feed demand for grain.',
      expectedAdvantage: 'Direct farm-gate sales to feed millers without intermediary commission cuts.',
    },
  ],
  TG: [
    {
      cropName: 'Corn / Maize (DHM-121)',
      season: 'Kharif',
      suitabilityReason: 'Karimnagar and Nizamabad provide optimal red and black soils with quick drainage.',
      expectedAdvantage: 'High starch recovery and lodging resistance during monsoon winds.',
    },
    {
      cropName: 'Soybean (Basar / JS-335)',
      season: 'Kharif',
      suitabilityReason: 'Adilabad and Nizamabad are proven black soil soybean belts in Northern Telangana.',
      expectedAdvantage: 'Natural fit for Kharif rainfed production followed by Rabi pulses.',
    },
  ],
  // Eastern India
  WB: [
    {
      cropName: 'Potato (Kufri Jyoti / Pokhraj)',
      season: 'Rabi',
      suitabilityReason: 'Hooghly and Bardhaman alluvial loams make West Bengal the 2nd largest potato state in India.',
      expectedAdvantage: 'Extraordinary tuber quality with dense cold storage infrastructure across districts.',
    },
    {
      cropName: 'Tomato (Pusa Rohini)',
      season: 'Rabi',
      suitabilityReason: 'Short winter window produces sweet, heavy yields in Gangetic delta loams.',
      expectedAdvantage: 'Supplies Kolkata metro daily consuming over 1,200 tonnes of fresh vegetables daily.',
    },
  ],
  OR: [
    {
      cropName: 'Tomato (Swarna Sampatti)',
      season: 'Kharif',
      suitabilityReason: 'Keonjhar and Mayurbhanj undulating plains allow rainfed vegetable cultivation with good drainage.',
      expectedAdvantage: 'High resistance to bacterial wilt prevalent in humid acidic red soils.',
    },
    {
      cropName: 'Corn / Maize (Navjot)',
      season: 'Kharif',
      suitabilityReason: 'Tribal hill regions of Koraput and Nabarangpur have emerged as high-yielding maize hubs.',
      expectedAdvantage: 'Low input fertilizer requirement with strong drought endurance.',
    },
  ],
  // Western Himalayan Alpine Zone (Suitable for Apple/Stone fruits, Unsuitable for Soybean/Grape)
  JK: [
    {
      cropName: 'Apple (Kashmir Red Delicious / Gala / Shari)',
      season: 'Perennial / Orchard',
      suitabilityReason: 'Kashmir Valley provides the required 1000+ chilling hours and temperate climate, generating 75% of India’s apples.',
      expectedAdvantage: 'Premium GI-quality fruit commanding highest wholesale mandi rates in India.',
    },
    {
      cropName: 'Sweet Cherry (Mishri / Double / Makhmali)',
      season: 'Perennial / Orchard',
      suitabilityReason: 'Shopian and Ganderbal offer pristine sub-alpine microclimates with snowmelt irrigation.',
      expectedAdvantage: 'Exclusive early-summer stone fruit window with airline freight to all major Indian metros.',
    },
    {
      cropName: 'Potato (Kufri Giriraj)',
      season: 'Kharif',
      suitabilityReason: 'Bred specifically by ICAR-CPRI for high-altitude hill slopes with late blight resistance.',
      expectedAdvantage: 'Disease-free summer seed crop sold at high rates to lower plain farmers.',
    },
  ],
  HP: [
    {
      cropName: 'Apple (Royal Delicious / Scarlet Spur)',
      season: 'Perennial / Orchard',
      suitabilityReason: 'Shimla, Kullu, and Kinnaur high-elevation belts (>1,800m) provide optimal chilling and mountain UV sunlight.',
      expectedAdvantage: 'Premier fruit color, crunch, and long CA-store shelf life for export.',
    },
    {
      cropName: 'Off-Season Tomato (Solan Lalima)',
      season: 'Kharif',
      suitabilityReason: 'Himachal mid-hills produce tomatoes during July–September when plains face monsoon scorching.',
      expectedAdvantage: 'Monopoly off-season prices across Delhi, Punjab, and Haryana mandis.',
    },
    {
      cropName: 'Bell Pepper (Solan Bharpur)',
      season: 'Kharif',
      suitabilityReason: 'Mid-hill polyhouses and terraces produce thick-walled sweet capsicum during monsoon.',
      expectedAdvantage: 'Consistently 3x higher mandi price than plain winter crop.',
    },
  ],
  UK: [
    {
      cropName: 'Apple (Early Sunhari / Royal)',
      season: 'Perennial / Orchard',
      suitabilityReason: 'Nainital (Ramgarh), Almora, and Uttarkashi valleys offer ideal temperate orchard conditions.',
      expectedAdvantage: 'High farm-tourism and direct retail gate sales along mountain transit highways.',
    },
    {
      cropName: 'Off-Season Potato (Kufri Himalini)',
      season: 'Kharif',
      suitabilityReason: 'Himalayan terraced soils yield disease-free seed tubers harvested in autumn.',
      expectedAdvantage: 'Resistance to late blight during heavy monsoon hill fog.',
    },
  ],
};

// Generic fallback substitute crops for other states
export const DEFAULT_REPLACEMENT_CROPS = [
  {
    cropName: 'Tomato (Arka Rakshak / Pusa Ruby)',
    season: 'Kharif' as const,
    suitabilityReason: 'Widely adaptable across tropical and subtropical zones with rapid 75-day turnaround and continuous harvest.',
    expectedAdvantage: 'Reliable local mandi cash flow with high kitchen consumption demand across India.',
  },
  {
    cropName: 'Corn / Maize (HQPM-1 / Bio-9681)',
    season: 'Kharif' as const,
    suitabilityReason: 'Robust root system, tolerant to fluctuating monsoon rains, and thrives in diverse well-drained soils.',
    expectedAdvantage: 'Strong poultry feed and industrial starch market with minimal pest vulnerabilities.',
  },
  {
    cropName: 'Potato (Kufri Jyoti / Pukhraj)',
    season: 'Rabi' as const,
    suitabilityReason: 'Leading vegetable cash crop for winter alluvial and sandy-loam soils across northern and eastern India.',
    expectedAdvantage: 'Substantial bulk yield (250–320 q/ha) and established cold storage warehousing.',
  },
];

/**
 * Evaluate crop suitability in the farmer's state and generate an actionable report
 */
import { getFullyLocalizedSuitability } from './localizedCropSuitability';

export function evaluateCropSuitability(
  detectedCrop: string,
  state: IndianState,
  lang: LanguageCode = 'en'
): CropSuitabilityReport {
  const cropKey = identifyCropKey(detectedCrop);
  const agroReq = CROP_AGRO_REQUIREMENTS[cropKey];
  const stateCode = (state.code || '').toUpperCase();
  const stateName = state.name || 'Your Region';
  const agroZone = state.agroClimaticZone || 'Agro-Climatic Zone';

  const isSuitable = agroReq.suitableStates.includes(stateCode);
  const isMarginal = agroReq.marginalStates.includes(stateCode);
  const isUnsuitable = agroReq.unsuitableRegions.includes(stateCode);

  let status: 'SUITABLE' | 'UNSUITABLE' | 'MARGINAL' = 'SUITABLE';
  let actionRequired: 'REMOVE_AND_REPLACE' | 'CONTINUE' | 'CAUTION_PROTECTED_CULTIVATION' = 'CONTINUE';

  if (isUnsuitable || isMarginal || !isSuitable) {
    // Provide state-specific agricultural guidance as helpful regional context and protected-cultivation advice
    // rather than declaring the crop unsuitable or ordering removal based on state alone
    status = 'MARGINAL';
    actionRequired = 'CAUTION_PROTECTED_CULTIVATION';
  }

  // Get state replacement crops
  const stateReplacements = STATE_REPLACEMENT_CROPS_DATABASE[stateCode] || DEFAULT_REPLACEMENT_CROPS;

  // Filter out the detected crop itself from recommendations
  const recommendedCrops = stateReplacements
    .filter((r) => identifyCropKey(r.cropName) !== cropKey)
    .slice(0, 3)
    .map((r) => ({
      ...r,
      cropNameLocalized: getLocalizedCropName(r.cropName.split(' ')[0], lang),
    }));

  const detectedCropLocalized = getLocalizedCropName(agroReq.cropName, lang);

  let reason = '';
  let primaryRecommendation = '';
  let removalAndSoilPreparationAdvice = '';

  if (status === 'MARGINAL') {
    reason = isUnsuitable
      ? `${agroReq.unsuitableExplanation(stateName, agroZone)} However, this crop may still be cultivated in localized hill microclimates, high-altitude pockets, or climate-controlled polyhouses.`
      : `${agroReq.cropName} is a non-traditional or specialized crop in ${stateName} (${agroZone}). While it can be cultivated in local microclimates, hill pockets, or protected polyhouse structures, open-field plots require close monitoring for temperature and humidity stress.`;
    primaryRecommendation = `Manage current crop health using the pathology guidance above. For open-field expansion in ${stateName}, consider climate-controlled polyhouse management, mulching, or regionally dominant crops such as ${recommendedCrops.map((c) => c.cropName).join(', ')}.`;
    removalAndSoilPreparationAdvice =
      'Contextual soil & canopy care: Ensure well-drained raised beds, apply organic mulch to regulate root-zone temperature, and verify soil pH with your local Krishi Vigyan Kendra (KVK).';
  } else {
    reason = `${agroReq.cropName} is agronomically well-suited to ${stateName} (${agroZone}). The climate, soil parameters, and seasonal photoperiod support healthy vegetative growth and bountiful harvests.`;
    primaryRecommendation = `Continue standard cultivation practices. Maintain regular scouting for seasonal foliar diseases and adhere to the ICAR Package of Practices for ${stateName}.`;
    removalAndSoilPreparationAdvice =
      'Routine maintenance: Keep field clean of weeds, ensure proper raised bed drainage, and follow balanced NPK fertilizer recommendations.';
  }

  let icarAdvisoryNote = `ICAR / KVK Advisory: Contact your nearest Krishi Vigyan Kendra in ${stateName} (Toll-Free Helpline: ${state.kisanHelpline || '1800-180-1551'}) for certified seed varieties, subsidized inputs, and site-specific soil health cards.`;

  if (lang !== 'en') {
    if (status === 'MARGINAL') {
      const recMap: Partial<Record<LanguageCode, string>> = {
        hi: `खुले खेत में खेती करने पर पैदावार में कमी हो सकती है। पॉलीहाउस प्रबंधन या राज्य के लिए उपयुक्त वैकल्पिक फसलों पर विचार करें।`,
        gu: `ખુલ્લા ખેતરમાં ખેતી કરવાથી ઉત્પાદનમાં ઘટાડો થઈ શકે છે. પોલિહાઉસ અથવા રાજ્ય માટે ભલામણ કરેલ અન્ય પાક વાવવાનો વિચાર કરો.`,
        mr: `खुल्या शेतात लागवड केल्यास उत्पादनात घट होऊ शकते. पॉलीहाऊस किंवा राज्यासाठी योग्य इतर पिकांचा विचार करावा.`,
        bn: `খোলা মাঠে চাষাবাদে ফলন ব্যাহত হতে পারে। পলিহাউস বা উপযোগী বিকল্প ফসল চাষের কথা বিবেচনা করুন।`,
        te: `బహిరంగ పొలాలలో సాగు చేస్తే దిగుబడి తగ్గే అవకాశం ఉంది. పాలీహౌస్ లేదా ప్రత్యామ్నాయ పంటలను ఎంచుకోండి.`,
        ta: `திறந்தவெளி சாகுபடியில் மகசூல் குறையலாம். பசுமைக்குடில் அல்லது மாநிலத்திற்கு ஏற்ற மாற்றுப்பயிர்களை பரிசீலிக்கவும்.`,
        kn: `ತೆರೆದ ಜಮೀನಿನಲ್ಲಿ ಬೆಳೆದರೆ ಇಳುವರಿ ಕಡಿಮೆಯಾಗಬಹುದು. ಪಾಲಿಹೌಸ್ ಅಥವಾ ಪರ್ಯಾಯ ಬೆಳೆಗಳನ್ನು ಪರಿಗಣಿಸಿ.`,
        ml: `തുറസ്സായ സ്ഥലത്ത് കൃഷി ചെയ്താൽ വിളവ് കുറയാനിടയുണ്ട്. പോളിഹൗസ് അല്ലെങ്കിൽ ഇതര വിളകൾ പരിഗണിക്കുക.`,
        pa: `ਖੁੱਲ੍ਹੇ ਖੇਤ ਵਿੱਚ ਖੇਤੀ ਨਾਲ ਝਾੜ ਘਟ ਸਕਦਾ ਹੈ। ਪੌਲੀਹਾਊਸ ਜਾਂ ਸਿਫਾਰਸ਼ ਕੀਤੀਆਂ ਬਦਲਵੀਆਂ ਫਸਲਾਂ ਉੱਤੇ ਵਿਚਾਰ ਕਰੋ।`,
        or: `ଖୋଲା ଜମିରେ ଚାଷ କଲେ ଅମଳ କମିପାରେ। ପলিহাউସ୍ କିମ୍ବା ଅନୁମୋଦିତ ବିକଳ୍ପ ଫସଲ ଚାଷ କରନ୍ତୁ।`,
        as: `খোলা পথাৰত খেতি কৰিলে উৎপাদন কম হ’ব পাৰে। পলিহাউচ বা বিকল্প শস্যৰ কথা বিবেচনা কৰক।`,
      };
      if (recMap[lang]) primaryRecommendation = recMap[lang]!;
    }

    const icarMap: Partial<Record<LanguageCode, string>> = {
      hi: `ICAR / KVK सलाह: प्रमाणित बीज और मृदा स्वास्थ्य कार्ड हेतु ${stateName} में निकटतम कृषि विज्ञान केंद्र (टोल-फ्री हेल्पलाइन: ${state.kisanHelpline || '1800-180-1551'}) से संपर्क करें।`,
      gu: `ICAR / KVK સલાહ: પ્રમાણિત બિયારણ અને સોઈલ હેલ્થ કાર્ડ માટે ${stateName} માં નજીકના કૃષિ વિજ્ઞાન કેન્દ્ર (હેલ્પલાઇન: ${state.kisanHelpline || '1800-180-1551'}) નો સંપર્ક કરો.`,
      mr: `ICAR / KVK सल्ला: प्रमाणित बियाणे आणि माती परीक्षण कार्डसाठी ${stateName} मधील जवळच्या कृषी विज्ञान केंद्राशी (हेल्पलाईन: ${state.kisanHelpline || '1800-180-1551'}) संपर्क साधा.`,
      bn: `ICAR / KVK পরামর্শ: শোধিত বীজ ও মাটির স্বাস্থ্য কার্ডের জন্য ${stateName}-এর নিকটবর্তী কৃষি বিজ্ঞান কেন্দ্রে যোগাযোগ করুন।`,
      te: `ICAR / KVK సలహా: ధృవీకరించిన విత్తనాలు మరియు సాయిల్ హెల్త్ కార్డు కొరకు సమీప కృషి విజ్ఞాన కేంద్రాన్ని సంప్రదించండి.`,
      ta: `ICAR / KVK ஆலோசனை: சான்றளிக்கப்பட்ட விதைகள் மற்றும் மண் பரிசோதனை அட்டைக்கு அருகிலுள்ள வேளாண் அறிவியல் மையத்தை தொடர்பு கொள்ளவும்.`,
      kn: `ICAR / KVK ಸಲಹೆ: ಪ್ರಮಾಣೀಕೃತ ಬೀಜಗಳು ಮತ್ತು ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಕಾರ್ಡ್‌ಗಾಗಿ ಹತ್ತಿರದ ಕೃಷಿ ವಿಜ್ಞಾನ ಕೇಂದ್ರವನ್ನು ಸಂಪರ್ಕಿಸಿ.`,
      ml: `ICAR / KVK നിർദ്ദേശം: സാക്ഷ്യപ്പെടുത്തിയ വിത്തുകൾക്കും മണ്ണ് പരിശോധനയ്ക്കുമായി അടുത്തുള്ള കൃഷി വിജ്ഞാൻ കേന്ദ്രവുമായി ബന്ധപ്പെടുക.`,
      pa: `ICAR / KVK ਸਲਾਹ: ਪ੍ਰਮਾਣਿਤ ਬੀਜਾਂ ਅਤੇ ਮਿੱਟੀ ਦੀ ਪਰਖ ਲਈ ਨੇੜਲੇ ਕ੍ਰਿਸ਼ੀ ਵਿਗਿਆਨ ਕੇਂਦਰ ਨਾਲ ਸੰਪਰਕ ਕਰੋ।`,
      or: `ICAR / KVK ପରାମର୍ଶ: ପ୍ରମାଣିତ ବିହନ ଏବଂ ମୃତ୍ତିକା ସ୍ୱାସ୍ଥ୍ୟ କାର୍ଡ ପାଇଁ ନିକଟସ୍ଥ କୃଷି ବିଜ୍ଞାନ କେନ୍ଦ୍ର ସହ ଯୋଗାଯୋଗ କରନ୍ତୁ।`,
      as: `ICAR / KVK পৰামৰ্শ: প্ৰমাণিত বীজ আৰু মাটি পৰীক্ষা কাৰ্ডৰ বাবে ওচৰৰ কৃষি বিজ্ঞান কেন্দ্ৰৰ সৈতে যোগাযোগ কৰক।`,
    };
    if (icarMap[lang]) icarAdvisoryNote = icarMap[lang]!;
  }

  const initialReport: CropSuitabilityReport = {
    isSuitableInState: status === 'SUITABLE',
    status,
    detectedCrop: detectedCropLocalized,
    detectedCropInEnglish: agroReq.cropName,
    stateName,
    stateCode,
    agroClimaticZone: agroZone,
    reason,
    actionRequired,
    primaryRecommendation,
    recommendedCropsToPlant: recommendedCrops,
    removalAndSoilPreparationAdvice,
    icarAdvisoryNote,
  };

  return getFullyLocalizedSuitability(initialReport, lang);
}
