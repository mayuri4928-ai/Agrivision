import { DISEASES_DATABASE } from './diseases';
import { DiseaseDetail } from '../types';

export interface CropProfile {
  id: string;
  name: string;
  scientificName: string;
  family: string;
  season: 'Kharif' | 'Rabi' | 'Zaid' | 'Perennial / Orchard';
  indianGrowingStates: string[];
  totalPathologies: number;
  economicImportanceIndia: string;
  commonInFieldRisks: string[];
  benchmarkDatasets: string[];
}

export const CROP_PROFILES: CropProfile[] = [
  {
    id: 'apple',
    name: 'Apple',
    scientificName: 'Malus domestica',
    family: 'Rosaceae (Rose family)',
    season: 'Perennial / Orchard',
    indianGrowingStates: ['Jammu & Kashmir', 'Himachal Pradesh', 'Uttarakhand', 'Arunachal Pradesh'],
    totalPathologies: 4,
    economicImportanceIndia: 'Major temperate horticultural export crop of NW Himalayas generating over ₹8,000 crores annually.',
    commonInFieldRisks: ['Spring rains during bud burst', 'Overcrowded orchard canopies', 'Overwintering fallen leaves in leaf litter'],
    benchmarkDatasets: ['PlantDoc (IIT Bombay)', 'PlantVillage (Penn State)', 'ICAR-CITH Srinagar', 'EPPO Global'],
  },
  {
    id: 'blueberry',
    name: 'Blueberry',
    scientificName: 'Vaccinium corymbosum',
    family: 'Ericaceae (Heath family)',
    season: 'Perennial / Orchard',
    indianGrowingStates: ['Tamil Nadu (Nilgiris)', 'Himachal Pradesh (Mid Hills)', 'Uttarakhand'],
    totalPathologies: 3,
    economicImportanceIndia: 'High-value emerging superfood crop under protected cultivation and acidic hill soils.',
    commonInFieldRisks: ['Alkaline irrigation water', 'Root zone waterlogging', 'Iron chlorosis'],
    benchmarkDatasets: ['PlantVillage (Penn State)', 'CABI CPC'],
  },
  {
    id: 'cherry',
    name: 'Cherry',
    scientificName: 'Prunus avium',
    family: 'Rosaceae (Stone fruit)',
    season: 'Perennial / Orchard',
    indianGrowingStates: ['Jammu & Kashmir (Shopian/Ganderbal)', 'Himachal Pradesh (Kullu/Shimla)'],
    totalPathologies: 2,
    economicImportanceIndia: 'Prestigious Himalayan stone fruit with high early-summer market value in Indian metros.',
    commonInFieldRisks: ['High relative humidity during ripening', 'Overcast skies promoting powdery mildew', 'Spring frosts during bloom'],
    benchmarkDatasets: ['PlantVillage (Penn State)', 'ICAR-CITH', 'EPPO Global'],
  },
  {
    id: 'corn',
    name: 'Corn (Maize)',
    scientificName: 'Zea mays',
    family: 'Poaceae (Grass family)',
    season: 'Kharif',
    indianGrowingStates: ['Karnataka', 'Madhya Pradesh', 'Bihar', 'Rajasthan', 'Maharashtra', 'Telangana'],
    totalPathologies: 4,
    economicImportanceIndia: 'India is the 5th largest global producer. Key coarse grain for food, poultry feed, and starch industries.',
    commonInFieldRisks: ['Monsoon overcast weather', 'High planting density with poor leaf aeration', 'Continuous monocropping without rotation'],
    benchmarkDatasets: ['PlantDoc (IIT Bombay)', 'PlantVillage (Penn State)', 'ICAR-IIMR Ludhiana', 'CABI CPC'],
  },
  {
    id: 'grape',
    name: 'Grape',
    scientificName: 'Vitis vinifera',
    family: 'Vitaceae (Grape family)',
    season: 'Perennial / Orchard',
    indianGrowingStates: ['Maharashtra (Nashik, Sangli, Solapur)', 'Karnataka', 'Andhra Pradesh', 'Tamil Nadu'],
    totalPathologies: 4,
    economicImportanceIndia: 'Premium commercial table grape and wine export sector contributing billions in foreign exchange.',
    commonInFieldRisks: ['Post-pruning dampness', 'Canopy microclimate humidity >80%', 'Old woody trunk fungal reservoirs (Esca)'],
    benchmarkDatasets: ['PlantDoc (IIT Bombay)', 'PlantVillage (Penn State)', 'ICAR-NRCG Pune', 'EPPO Global'],
  },
  {
    id: 'orange',
    name: 'Orange / Citrus',
    scientificName: 'Citrus sinensis',
    family: 'Rutaceae (Rue / Citrus family)',
    season: 'Perennial / Orchard',
    indianGrowingStates: ['Maharashtra (Vidarbha / Nagpur Mandarin)', 'Punjab', 'Rajasthan', 'Andhra Pradesh'],
    totalPathologies: 2,
    economicImportanceIndia: 'Famous Nagpur Mandarin and Kinnow belts sustain millions of smallholders and juice supply chains.',
    commonInFieldRisks: ['Asian citrus psyllid (Diaphorina citri) vector transmission', 'Uncertified nursery saplings', 'Drought stress followed by flash rains'],
    benchmarkDatasets: ['PlantVillage (Penn State)', 'ICAR-CCRI Nagpur', 'EPPO Global', 'CABI CPC'],
  },
  {
    id: 'peach',
    name: 'Peach',
    scientificName: 'Prunus persica',
    family: 'Rosaceae (Stone fruit)',
    season: 'Perennial / Orchard',
    indianGrowingStates: ['Himachal Pradesh', 'Uttarakhand', 'Jammu & Kashmir', 'Punjab (Subtropical varieties)'],
    totalPathologies: 2,
    economicImportanceIndia: 'Key sub-temperate deciduous fruit supporting foothill and valley agrarian incomes.',
    commonInFieldRisks: ['Warm rainy spring weather', 'Bacterial ingress through windblown rain abrasions', 'Poor soil drainage'],
    benchmarkDatasets: ['PlantVillage (Penn State)', 'ICAR-CITH', 'EPPO Global'],
  },
  {
    id: 'pepper',
    name: 'Bell Pepper (Capsicum)',
    scientificName: 'Capsicum annuum',
    family: 'Solanaceae (Nightshade family)',
    season: 'Rabi',
    indianGrowingStates: ['Karnataka', 'Himachal Pradesh (Polyhouse)', 'Maharashtra', 'West Bengal', 'Haryana'],
    totalPathologies: 2,
    economicImportanceIndia: 'Major polyhouse and open-field protected cash crop with rapid harvest turnarounds.',
    commonInFieldRisks: ['Overhead misting / sprinkler irrigation', 'High temperatures (28-34°C) with frequent showers', 'Contaminated seed lots'],
    benchmarkDatasets: ['PlantDoc (IIT Bombay)', 'PlantVillage (Penn State)', 'ICAR-IIHR Bengaluru', 'EPPO Global'],
  },
  {
    id: 'potato',
    name: 'Potato',
    scientificName: 'Solanum tuberosum',
    family: 'Solanaceae (Nightshade family)',
    season: 'Rabi',
    indianGrowingStates: ['Uttar Pradesh', 'West Bengal', 'Bihar', 'Gujarat', 'Punjab', 'Madhya Pradesh'],
    totalPathologies: 3,
    economicImportanceIndia: 'India is the worlds 2nd largest potato producer. Primary vegetable food security staple.',
    commonInFieldRisks: ['Foggy winter weather in Gangetic plains', 'Prolonged dews >10 hours with 12-20°C temperatures', 'Infected seed tubers'],
    benchmarkDatasets: ['PlantDoc (IIT Bombay)', 'PlantVillage (Penn State)', 'ICAR-CPRI Shimla', 'CABI CPC', 'EPPO Global'],
  },
  {
    id: 'raspberry',
    name: 'Raspberry',
    scientificName: 'Rubus idaeus',
    family: 'Rosaceae (Rose family)',
    season: 'Perennial / Orchard',
    indianGrowingStates: ['High altitude zones of Himachal Pradesh and Uttarakhand'],
    totalPathologies: 3,
    economicImportanceIndia: 'Specialty culinary cane fruit commanding premium prices in farm-to-table hospitality.',
    commonInFieldRisks: ['Cane overcrowding', 'Monsoon canopy fungal dampness', 'Spider mite outbreaks in summer'],
    benchmarkDatasets: ['PlantVillage (Penn State)', 'CABI CPC'],
  },
  {
    id: 'soybean',
    name: 'Soybean',
    scientificName: 'Glycine max',
    family: 'Fabaceae (Legume family)',
    season: 'Kharif',
    indianGrowingStates: ['Madhya Pradesh (Soya Bowl)', 'Maharashtra', 'Rajasthan', 'Karnataka', 'Telangana'],
    totalPathologies: 3,
    economicImportanceIndia: 'Prime oilseed and protein-rich meal source powering Indias edible oil and animal nutrition sectors.',
    commonInFieldRisks: ['Excessive rainfall during vegetative phase', 'Continuous mono-cropping', 'Whitefly and defoliator pest pressures'],
    benchmarkDatasets: ['PlantDoc (IIT Bombay)', 'PlantVillage (Penn State)', 'ICAR-IISR Indore'],
  },
  {
    id: 'squash',
    name: 'Squash / Cucurbits',
    scientificName: 'Cucurbita pepo',
    family: 'Cucurbitaceae (Gourd family)',
    season: 'Zaid',
    indianGrowingStates: ['Uttar Pradesh', 'Bihar', 'Punjab', 'Karnataka', 'Andhra Pradesh', 'Tamil Nadu'],
    totalPathologies: 2,
    economicImportanceIndia: 'Fast-growing riverbed and arable cash crop essential for fresh regional wholesale mandis.',
    commonInFieldRisks: ['High atmospheric humidity with shaded canopies', 'Dense creeping foliage touching damp soil', 'Late-season dry warmth'],
    benchmarkDatasets: ['PlantDoc (IIT Bombay)', 'PlantVillage (Penn State)', 'ICAR-IIVR Varanasi'],
  },
  {
    id: 'strawberry',
    name: 'Strawberry',
    scientificName: 'Fragaria × ananassa',
    family: 'Rosaceae (Rose family)',
    season: 'Rabi',
    indianGrowingStates: ['Maharashtra (Mahabaleshwar - 85% of national output)', 'Himachal Pradesh', 'Meghalaya', 'Punjab'],
    totalPathologies: 2,
    economicImportanceIndia: 'High-earning seasonal agro-tourism and fresh table berry crop for Western Ghats and Himalayan foothills.',
    commonInFieldRisks: ['Drip emitter leaks saturating plastic mulch', 'Dead leaf debris left on crowns', 'Humid overcast weather'],
    benchmarkDatasets: ['PlantVillage (Penn State)', 'ICAR-CITH', 'EPPO Global'],
  },
  {
    id: 'tomato',
    name: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    family: 'Solanaceae (Nightshade family)',
    season: 'Kharif',
    indianGrowingStates: ['Andhra Pradesh', 'Madhya Pradesh', 'Karnataka', 'Gujarat', 'Odisha', 'West Bengal', 'Maharashtra'],
    totalPathologies: 10,
    economicImportanceIndia: 'Indias most vital horticultural kitchen staple (TOP: Tomato, Onion, Potato) cultivated year-round.',
    commonInFieldRisks: ['Whitefly (Bemisia tabaci) viral vector outbreaks', 'Monsoon rain splash spreading fungal spores', 'Overhead sprinkler wetting'],
    benchmarkDatasets: ['PlantDoc (IIT Bombay)', 'PlantVillage (Penn State)', 'ICAR-IIHR Bengaluru', 'ICAR-IIVR Varanasi', 'CABI CPC', 'EPPO Global'],
  },
  {
    id: 'rice',
    name: 'Rice (Paddy)',
    scientificName: 'Oryza sativa',
    family: 'Poaceae (Grass family)',
    season: 'Kharif',
    indianGrowingStates: ['West Bengal', 'Uttar Pradesh', 'Punjab', 'Andhra Pradesh', 'Odisha', 'Tamil Nadu', 'Bihar', 'Chhattisgarh', 'Telangana'],
    totalPathologies: 4,
    economicImportanceIndia: 'Indias foremost food grain security staple feeding over 800 million citizens and major agricultural export.',
    commonInFieldRisks: ['Excessive uncalibrated urea top-dressing inducing blast', 'Prolonged stagnant submergence in nursery beds', 'Cloudy humid weather with dew formation'],
    benchmarkDatasets: ['ICAR-NRRI Cuttack', 'PlantDoc (IIT Bombay)', 'IRRI Rice Knowledge Bank', 'CABI CPC'],
  },
  {
    id: 'wheat',
    name: 'Wheat',
    scientificName: 'Triticum aestivum',
    family: 'Poaceae (Grass family)',
    season: 'Rabi',
    indianGrowingStates: ['Uttar Pradesh', 'Punjab', 'Madhya Pradesh', 'Haryana', 'Rajasthan', 'Bihar', 'Gujarat', 'Maharashtra'],
    totalPathologies: 4,
    economicImportanceIndia: 'Crucial rabi cereal staple providing calorific foundation for northern and central Indian food security.',
    commonInFieldRisks: ['Late sowing into high spring temperatures (terminal heat stress)', 'High winter humidity triggering stripe/leaf rust epidemics', 'Irrigation waterlogging at seedling emergence'],
    benchmarkDatasets: ['ICAR-IIWBR Karnal', 'ICAR Crop Protection', 'CIMMYT Rust Monitor', 'CABI CPC'],
  },
  {
    id: 'cotton',
    name: 'Cotton',
    scientificName: 'Gossypium hirsutum',
    family: 'Malvaceae (Mallow family)',
    season: 'Kharif',
    indianGrowingStates: ['Gujarat', 'Maharashtra', 'Telangana', 'Andhra Pradesh', 'Punjab', 'Haryana', 'Rajasthan', 'Karnataka'],
    totalPathologies: 3,
    economicImportanceIndia: 'Primary cash and fiber crop ("White Gold") providing livelihoods to over 60 million farmers and textile workers.',
    commonInFieldRisks: ['Whitefly (Bemisia tabaci) vectors spreading Cotton Leaf Curl Virus', 'Intermittent monsoon rain showers spreading bacterial blight', 'Waterlogged vertisol black soils lacking drainage'],
    benchmarkDatasets: ['ICAR-CICR Nagpur', 'PlantDoc (IIT Bombay)', 'CABI CPC', 'EPPO Global'],
  },
  {
    id: 'sugarcane',
    name: 'Sugarcane',
    scientificName: 'Saccharum officinarum',
    family: 'Poaceae (Grass family)',
    season: 'Kharif',
    indianGrowingStates: ['Uttar Pradesh', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Bihar', 'Gujarat', 'Punjab', 'Haryana'],
    totalPathologies: 3,
    economicImportanceIndia: 'Major commercial sweetener and bio-ethanol energy crop powering rural agro-industrial processing hubs.',
    commonInFieldRisks: ['Planting uncertified red-rot infected seed setts', 'Successive ratoon crops harboring smut spores', 'Waterlogging during active elongation phase'],
    benchmarkDatasets: ['ICAR-SBI Coimbatore', 'ICAR-IISR Lucknow', 'CABI CPC', 'EPPO Global'],
  },
];

export interface EnrichedDiseaseEntry extends DiseaseDetail {
  cropId: string;
  eppoCode: string;
  pathogenType: 'Fungal' | 'Bacterial' | 'Viral' | 'Pest / Physiological' | 'Healthy';
  severityLevel: 'High' | 'Moderate' | 'Low / Cosmetic' | 'None (Healthy)';
  favorableConditions: string;
  affectedPlantParts: string[];
  organicRemedies: string[];
  icarAdvisory: string;
  benchmarkDatasets: string[];
}

export const MULTI_DATABASE_SOURCES = [
  {
    id: 'plantdoc',
    name: 'PlantDoc (IIT Bombay)',
    type: 'In-Field Visual Benchmark',
    stats: '2,598 images across 13 species in 17 disease classes',
    contribution: 'Supplies real-world noisy in-field conditions: variable outdoor sunlight, shadow occlusions, multiple leaves, and background soil clutter.',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  },
  {
    id: 'plantvillage',
    name: 'PlantVillage (Penn State & EPFL)',
    type: 'Standard Neural Feature Benchmark',
    stats: '54,306 expert-annotated leaf images across 38 classes',
    contribution: 'Provides transfer-learning weight baselines for neural feature extraction across 14 crops.',
    badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
  },
  {
    id: 'icar',
    name: 'ICAR Crop Knowledge Portal',
    type: 'Indian Agronomic Package of Practices',
    stats: 'National Agricultural Research System (NARS) Protocols',
    contribution: 'Supplies bio-control agent schedules (Trichoderma, Pseudomonas, Neem Azadirachtin) aligned with Indian agro-climatic zones and KVK farmer helplines.',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
  },
  {
    id: 'cabi',
    name: 'CABI Crop Protection Compendium (CPC)',
    type: 'Global Host-Pathogen Epidemiology',
    stats: 'Comprehensive international diagnostic keys',
    contribution: 'Verifies geographic disease distributions, vector life cycles, and international phytosanitary alert lists.',
    badgeColor: 'bg-purple-50 text-purple-800 border-purple-200',
  },
  {
    id: 'eppo',
    name: 'EPPO Global Database',
    type: 'Taxonomic & Quarantine Nomenclature',
    stats: 'Official phytosanitary codes and diagnostic standards',
    contribution: 'Provides validated scientific binomials, preferred organism names, and standardized quarantine disease tracking codes.',
    badgeColor: 'bg-rose-50 text-rose-800 border-rose-200',
  },
];

export function getEnrichedDiseasesList(): EnrichedDiseaseEntry[] {
  const result: EnrichedDiseaseEntry[] = [];

  for (const [className, detail] of Object.entries(DISEASES_DATABASE)) {
    const isHealthy = detail.isHealthy;
    const diseaseName = detail.disease;
    const cropName = detail.crop;
    let cropId = cropName.toLowerCase().replace(/[^a-z]/g, '');
    if (cropId.includes('rice') || cropId.includes('paddy')) {
      cropId = 'rice';
    } else if (cropId.includes('corn') || cropId.includes('maize')) {
      cropId = 'corn';
    } else if (cropId.includes('pepper') || cropId.includes('capsicum')) {
      cropId = 'pepper';
    } else if (cropId.includes('cotton')) {
      cropId = 'cotton';
    } else if (cropId.includes('sugar') || cropId.includes('cane')) {
      cropId = 'sugarcane';
    } else if (cropId.includes('wheat')) {
      cropId = 'wheat';
    }

    let pathogenType: 'Fungal' | 'Bacterial' | 'Viral' | 'Pest / Physiological' | 'Healthy' = 'Fungal';
    let severityLevel: 'High' | 'Moderate' | 'Low / Cosmetic' | 'None (Healthy)' = 'Moderate';
    let eppoCode = 'PHYTO-GEN';
    let favorableConditions = 'Warm temperatures (20-28°C) with high relative humidity (>80%) and prolonged leaf wetness.';
    let affectedPlantParts = ['Leaves', 'Leaf stems'];
    let organicRemedies = [
      'Foliar spray of Trichoderma viride / harzianum (5g/liter of water) at first sign of disease.',
      'Neem seed kernel extract (NSKE 5%) or Azadirachtin 1500 ppm (3ml/liter).',
      'Copper oxychloride (COC 50% WP at 2.5g/liter) or 1% Bordeaux mixture as protective barrier.',
    ];
    let icarAdvisory = 'Consult nearest Krishi Vigyan Kendra (KVK). Maintain clean weeding and follow crop rotation with non-host crops for at least 2 seasons.';

    if (isHealthy) {
      pathogenType = 'Healthy';
      severityLevel = 'None (Healthy)';
      eppoCode = 'HEALTHY-PLANT';
      favorableConditions = 'Optimal photosynthetic sunlight, balanced NPK fertigation, and aerobic soil drainage.';
      affectedPlantParts = ['Leaves', 'Stems', 'Fruit', 'Roots'];
      organicRemedies = [
        'Maintain prophylactic organic soil amendments with vermicompost and Trichoderma enriched FYM.',
        'Apply weekly jeevamrutha or seaweed extract bio-stimulants to sustain leaf vigor.',
      ];
      icarAdvisory = 'Optimal plant vigor. Maintain regular scouting and install yellow/blue sticky traps for early pest detection.';
    } else if (diseaseName.includes('Bacterial') || className.includes('Bacterial') || className.includes('Haunglongbing')) {
      pathogenType = 'Bacterial';
      severityLevel = 'High';
      eppoCode = 'XANT-BACT';
      favorableConditions = 'Warm rainy weather (25-32°C), windblown rain splash, mechanical wounds, and high nitrogen fertilization.';
      affectedPlantParts = ['Leaves', 'Fruit', 'Stems', 'Twigs'];
      organicRemedies = [
        'Spray Copper hydroxide or Copper oxychloride (2.5g/L) mixed with Streptocycline (0.1g/L as per state guidelines).',
        'Pseudomonas fluorescens 0.5% foliar spray to outcompete bacterial colonies on phyllosphere.',
        'Sanitize all pruning tools in 1% potassium permanganate or 10% sodium hypochlorite solution.',
      ];
      icarAdvisory = 'ICAR recommends using certified pathogen-free disease-resistant seed varieties and avoiding sprinkler irrigation in diseased patches.';
    } else if (diseaseName.includes('Virus') || diseaseName.includes('Curl') || diseaseName.includes('mosaic') || className.includes('Virus') || className.includes('mosaic')) {
      pathogenType = 'Viral';
      severityLevel = 'High';
      eppoCode = 'VIRUS-BEG';
      favorableConditions = 'Dry warm weather favoring whitefly (Bemisia tabaci), aphid, or thrips vector populations (>28°C).';
      affectedPlantParts = ['Young leaf flush', 'Growth tips', 'Fruit setting'];
      organicRemedies = [
        'Install yellow sticky traps (15 traps/acre) to suppress whitefly and vector insect vectors.',
        'Spray Neem oil (5ml/L) + Pongamia oil (3ml/L) with liquid soap emulsifier to deter insect feeding.',
        'Intercrop with 2 border rows of maize or pearl millet as live insect barrier fences.',
      ];
      icarAdvisory = 'Viral diseases cannot be cured once inside the vascular system. Rogue out and destroy early infected plants immediately to prevent field-wide vector transmission.';
    } else if (diseaseName.includes('Mite') || diseaseName.includes('Spider')) {
      pathogenType = 'Pest / Physiological';
      severityLevel = 'Moderate';
      eppoCode = 'TETR-URT';
      favorableConditions = 'Hot dry weather (30-38°C) with low relative humidity and dusty field borders.';
      affectedPlantParts = ['Leaf undersides', 'Chloroplast tissues'];
      organicRemedies = [
        'Spray wettable sulfur 80% WP (2g/L) or neem oil 10,000 ppm (2ml/L) targeting leaf undersides.',
        'Release predatory phytoseiid mites (e.g. Neoseiulus californicus) under polyhouse conditions.',
        'High-pressure overhead water jetting during morning to dislodge webbing and mite colonies.',
      ];
      icarAdvisory = 'Avoid excessive synthetic pyrethroids which decimate natural predatory insects and spark secondary spider mite resurgence.';
    } else if (diseaseName.includes('Scab')) {
      pathogenType = 'Fungal';
      severityLevel = 'High';
      eppoCode = 'VENT-INA';
      favorableConditions = 'Continuous leaf wetness for 9-18 hours at temperatures between 15-22°C during spring leaf emergence.';
      affectedPlantParts = ['Upper & lower leaf surfaces', 'Sepals', 'Developing fruit skin'];
      organicRemedies = [
        'Pre-bloom sulfur sprays or Bordeaux mixture (1%) before rain forecasts.',
        'Urea spray (5%) on fallen autumn orchard leaves to hasten winter decomposition of perithecia.',
        'Bio-agent Ampelomyces quisqualis or Trichoderma viride foliar colonization.',
      ];
      icarAdvisory = 'Follow ICAR-CITH scab forecasting calendar. Never let primary ascospore infections establish during bud break to petal fall.';
    } else if (diseaseName.includes('Late Blight') || className.includes('Late_blight')) {
      pathogenType = 'Fungal';
      severityLevel = 'High';
      eppoCode = 'PHYT-INF';
      favorableConditions = 'Cool moist nights (10-15°C) and cloudy days (16-22°C) with RH >90% and continuous free water on leaves.';
      affectedPlantParts = ['Leaf tips and margins', 'Petioles', 'Stems', 'Potato tubers', 'Tomato green fruit'];
      organicRemedies = [
        'Preventative Bordeaux mixture 1% or Copper oxychloride (0.3%) before canopy closure.',
        'Seed tuber treatment with Trichoderma viride (10g/kg tuber).',
        'Strictly destroy cull piles and volunteer Solanaceous plants surrounding fields.',
      ];
      icarAdvisory = 'Highly destructive epidemic potential. Follow ICAR-CPRI Indo-Blightcast system. Cease irrigation immediately upon first necrotic water-soaked lesion sighting.';
    } else if (diseaseName.includes('Early Blight') || className.includes('Early_blight')) {
      pathogenType = 'Fungal';
      severityLevel = 'Moderate';
      eppoCode = 'ALTE-SOL';
      favorableConditions = 'Alternating wet and dry cycles with temperatures between 24-29°C; stressed or aging lower foliage.';
      affectedPlantParts = ['Older lower leaves', 'Fruit calyx and stem ends'];
      organicRemedies = [
        'Prune lower 12 inches of foliage after fruit set to avoid soil splash.',
        'Foliar spray with Bacillus subtilis or Trichoderma harzianum (5g/L).',
        'Azadirachtin (Neem seed extract 5%) weekly preventative schedule.',
      ];
      icarAdvisory = 'Maintain balanced potash and nitrogen fertilization; calcium deficiency accentuates Alternaria target spot vulnerability.';
    } else if (diseaseName.includes('Rust')) {
      pathogenType = 'Fungal';
      severityLevel = 'Moderate';
      eppoCode = 'PUCC-SORG';
      favorableConditions = 'Moderate temperatures (16-25°C) with high morning humidity (>95%) and dew formation.';
      affectedPlantParts = ['Both upper and lower leaf surfaces'];
      organicRemedies = [
        'Dust sulfur (20-25 kg/hectare) in early morning when leaves have light dew.',
        'Spray cow urine distillate (Gomutra 10%) mixed with neem oil (2ml/L).',
        'Remove wild alternate host plants (Juniper, wild grasses) from field boundaries.',
      ];
      icarAdvisory = 'Plant rust-resistant cultivars recommended by state agricultural university (SAU).';
    } else if (diseaseName.includes('Mildew')) {
      pathogenType = 'Fungal';
      severityLevel = 'Moderate';
      eppoCode = 'ERYS-POD';
      favorableConditions = 'Warm dry days (22-30°C) following humid mornings; shaded, overcrowded canopies with low UV penetration.';
      affectedPlantParts = ['Upper leaf lamina', 'Tender shoots', 'Flower buds'];
      organicRemedies = [
        'Potassium bicarbonate (3g/L) or Baking soda (Sodium bicarbonate 4g/L) with horticultural oil.',
        'Diluted milk whey spray (1 part milk to 9 parts water) exposed to midday sunlight.',
        'Wettable sulfur (2g/L) before fruit set.',
      ];
      icarAdvisory = 'Open up canopy via green pruning to allow wind penetration; powdery mildew conidia germinate in high humidity even without free water droplets.';
    }

    result.push({
      ...detail,
      cropId,
      pathogenType,
      severityLevel,
      eppoCode,
      favorableConditions,
      affectedPlantParts,
      organicRemedies,
      icarAdvisory,
      benchmarkDatasets: [
        'PlantDoc (IIT Bombay)',
        'PlantVillage (Penn State)',
        'ICAR Crop Protection',
        'CABI CPC',
        'EPPO Global Database',
      ],
    });
  }

  return result;
}
