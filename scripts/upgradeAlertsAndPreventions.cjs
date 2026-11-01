const fs = require('fs');
const path = require('path');

// Disease treatment encyclopedia
const TREATMENT_ENCYCLOPEDIA = {
  // Rice
  'rice_blast': {
    recommendedAction: "Apply split nitrogen applications (3-4 splits) and avoid excess urea which creates lush succulent tissue vulnerable to blast. Avoid water stress during tillering and panicle initiation. Burn or compost infected stubbles away from seedbeds.",
    organicTreatment: "Seed treatment with Pseudomonas fluorescens (10 g/kg seed) followed by foliar spray of Pseudomonas fluorescens @ 5 g/L or 10% Panchagavya at active tillering and panicle emergence.",
    chemicalTreatment: "Prophylactic: Tricyclazole 75% WP @ 0.6 g/L (120 g/acre in 200 L water) at early tillering. Curative at neck blast stage: Isoprothiolane 40% EC @ 1.5 ml/L or Kasugamycin 3% SL @ 2.5 ml/L."
  },
  'rice_blb': {
    recommendedAction: "Drain standing water from the paddy field for 3 to 4 days to arrest bacterial streaming. Strictly suspend all top-dressing of nitrogen fertilizers until new uninfected leaves emerge. Do not clip seedling tips during transplanting.",
    organicTreatment: "Spray fresh cow dung supernatant filtrate (20% w/v) or Bacillus subtilis formulation @ 5 g/L. Apply bio-control agent Pseudomonas fluorescens @ 5 g/L in morning dew.",
    chemicalTreatment: "Foliar spray with Copper Oxychloride 50% WP @ 2.5 g/L tank-mixed with Streptocycline @ 0.1 g/L (1 g pouch in 10 L water) or Plantomycin @ 1 g/L. Repeat after 10 days if humid weather persists."
  },
  'rice_brown_spot': {
    recommendedAction: "Address soil nutrient depletion: apply recommended potassium (MOP @ 50 kg/ha) and zinc sulfate (25 kg/ha) to strengthen silica epidermis. Avoid water stress in rainfed lowlands. Perform dry heat seed solarization.",
    organicTreatment: "Seed soaking in 2% Panchagavya slurry for 12 hours before nursery sowing. Foliar spray of vermiwash (10%) mixed with neem oil (3 ml/L) at tillering.",
    chemicalTreatment: "Seed treatment with Carbendazim 50 WP @ 2 g/kg seed. Foliar spray with Mancozeb 75% WP @ 2 g/L or Edifenphos (Hinosan 50 EC) @ 1 ml/L or Propiconazole 25% EC @ 1 ml/L."
  },
  // Wheat
  'wheat_yellow_rust': {
    recommendedAction: "Cultivate stripe-rust resistant wheat varieties (e.g. DBW 187, DBW 222, HD 3226). Avoid early sowing in sub-montane foothill corridors where rust spores overwinter. Organize village community surveillance rings to detect first foci.",
    organicTreatment: "Foliar spray with bio-fungicide Trichoderma harzianum @ 5 g/L or fermented butter milk (sour lassi 5%) + wood ash extract to suppress early spore germination on flag leaf.",
    chemicalTreatment: "Immediate ground application of Propiconazole 25% EC (Tilt) @ 1 ml/L (200 ml in 200 L water/acre) upon seeing initial yellow stripe lines. Protect the flag leaf. Alternative: Tebuconazole 25.9% EC @ 1 ml/L."
  },
  'wheat_brown_rust': {
    recommendedAction: "Sow during optimum November window to avoid late-season temperature spikes (>25°C) that trigger brown rust epidemics. Balance nitrogen with adequate potassium (K2O). Eliminate wild grass weed hosts along canal bunds.",
    organicTreatment: "Foliar spray of 5% Neem Seed Kernel Extract (NSKE) or Pseudomonas fluorescens @ 5 g/L. Dusting with fine sulfur powder @ 15 kg/ha in morning dew.",
    chemicalTreatment: "Spray Mancozeb 75% WP @ 2 g/L as prophylactic barrier, or Propiconazole 25% EC @ 1 ml/L if orange pustules appear on upper leaves before grain-fill stage."
  },
  'wheat_powdery_mildew': {
    recommendedAction: "Adopt optimum seed rate (100 kg/ha) to prevent dense canopy lodging and trapped humidity. Avoid excessive late nitrogen top-dressing. Ensure unobstructed wind airflow across borders.",
    organicTreatment: "Spray Potassium Bicarbonate @ 5 g/L or milk whey (10% solution in water) which disrupts fungal haustoria via osmotic shock and sunlight-induced free radicals.",
    chemicalTreatment: "Foliar spray with Wettable Sulfur 80% WP @ 2.5 g/L or Propiconazole 25% EC @ 1 ml/L. Repeat at 12-day intervals under cool overcast spells."
  },
  // Cotton
  'cotton_clcuv': {
    recommendedAction: "Install yellow sticky traps @ 15-20 traps/acre at crop canopy height to capture whitefly vectors (Bemisia tabaci). Uproot and burn alternate weed hosts like Abutilon indicum (Kanghi) and Parthenium. Sow resistant Bt hybrids.",
    organicTreatment: "Spray 5% Neem Seed Kernel Extract (NSKE) or Neem oil 1500 ppm @ 4 ml/L with soap emulsifier to deter whitefly oviposition and feeding. Apply entomopathogenic fungus Verticillium lecanii @ 5 g/L.",
    chemicalTreatment: "Vector control: Spray Diafenthiuron 50% WP @ 1.25 g/L or Pyriproxyfen 10% EC @ 2 ml/L or Flonicamid 50% WG @ 0.3 g/L. Rotate insecticidal chemistry to prevent whitefly resistance."
  },
  'cotton_bacterial_blight': {
    recommendedAction: "Acid delinting of cottonseed with commercial concentrated sulfuric acid (100 ml/kg seed) to destroy seed-borne bacteria. Destroy previous season cotton stalks and practice deep summer ploughing.",
    organicTreatment: "Seed treatment with Pseudomonas fluorescens @ 10 g/kg seed. Foliar spray of Pseudomonas fluorescens @ 5 g/L or cow urine distillate (10%) at square formation stage.",
    chemicalTreatment: "Foliar spray of Copper Oxychloride 50% WP @ 2.5 g/L + Streptocycline @ 0.1 g/L (1 g in 10 L water). Repeat at 12-day intervals if stormy rains cause angular water-soaked leaf spots."
  },
  // Potato
  'potato_late_blight': {
    recommendedAction: "Destroy cull potato piles and volunteer tubers near fields. High earthing up (ridge height 20-25 cm) to bury tubers deep away from zoospore wash. Immediately halt sprinkler irrigation during cool humid nights (12-18°C, RH >85%). Dehaulm 12 days before harvest.",
    organicTreatment: "Preventative foliar spray of Copper Hydroxide (2 g/L) or Bordeaux mixture 1%. Spray bio-fungicide Trichoderma viride @ 5 g/L before canopy closure.",
    chemicalTreatment: "Prophylactic: Mancozeb 75% WP @ 2.5 g/L. Curative upon outbreak: Cymoxanil 8% + Mancozeb 64% WP @ 2.5 g/L or Dimethomorph 50% WP @ 1.5 g/L or Metalaxyl-M + Mancozeb @ 2.5 g/L."
  },
  'potato_early_blight': {
    recommendedAction: "Rotate crops for 2-3 seasons away from tomatoes, chillies, and eggplants. Ensure adequate potassium and nitrogen nutrition to avoid premature canopy senescence. Drip irrigate early in the morning.",
    organicTreatment: "Foliar spray with Trichoderma harzianum @ 5 g/L or Neem oil 1500 ppm @ 3 ml/L. Apply compost tea rich in beneficial antagonistic bacteria.",
    chemicalTreatment: "Spray Chlorothalonil 75% WP @ 2 g/L or Mancozeb 75% WP @ 2 g/L. If concentric target-board lesions reach mid-canopy, spray Difenoconazole 25% EC @ 0.5 ml/L or Azoxystrobin @ 1 ml/L."
  },
  // Tomato
  'tomato_early_blight': {
    recommendedAction: "Mulch beds with clean paddy straw or silver plastic film to prevent soil-dwelling fungal spores from splashing onto foliage. Prune bottom 30 cm leaves. Stake vines on trellises to ensure maximum ventilation.",
    organicTreatment: "Foliar spray of Trichoderma viride @ 5 g/L or 5% Neem Seed Kernel Extract (NSKE). Spray copper soap bio-fungicide.",
    chemicalTreatment: "Spray Mancozeb 75% WP @ 2 g/L or Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1 ml/L. Alternate with Chlorothalonil 75% WP @ 2 g/L every 8-10 days."
  },
  'tomato_late_blight': {
    recommendedAction: "Rogue out and bury severely blighted tomato plants in deep pits away from fields; do not compost. Switch from overhead sprinklers to root-zone drip irrigation. Space rows at minimum 75 cm.",
    organicTreatment: "Preventive spray with Copper Oxychloride 50 WP @ 2.5 g/L or Bordeaux mixture 1% at first sign of regional fog and low night temperatures.",
    chemicalTreatment: "Spray Cymoxanil 8% + Mancozeb 64% WP @ 2.5 g/L or Fenamidone 10% + Mancozeb 50% WG (Sectin) @ 2.5 g/L or Dimethomorph 50 WP @ 1.5 g/L."
  },
  'tomato_bacterial_spot': {
    recommendedAction: "Use certified pathogen-free or hot water-treated seed (50°C for 25 minutes). Never work, prune, or harvest in wet fields. Rotate out of solanaceous crops for minimum 2 years.",
    organicTreatment: "Foliar spray of Bacillus amyloliquefaciens or Pseudomonas fluorescens @ 5 g/L. Apply copper octanoate liquid bio-fungicide.",
    chemicalTreatment: "Spray Copper Hydroxide 53.8% DF @ 2 g/L mixed with Streptocycline @ 0.1 g/L (1 g in 10 L water) or Kasugamycin @ 2 ml/L."
  },
  'tomato_tylcv': {
    recommendedAction: "Install yellow sticky cards (15-20/acre) at transplanting. Erect 40-mesh insect-proof netting in seedling nurseries. Plant 3 border rows of maize or sorghum as a physical barrier to intercept windborne whiteflies.",
    organicTreatment: "Spray 1500 ppm cold-pressed Neem oil @ 5 ml/L mixed with organic soft soap. Apply Beauveria bassiana @ 5 g/L to parasitize whitefly nymphs on leaf undersides.",
    chemicalTreatment: "Drench seedling trays with Imidacloprid 17.8% SL @ 0.5 ml/L before transplanting. Field spray: Spiromesifen 22.9% SC @ 1 ml/L or Flonicamid 50% WG @ 0.3 g/L or Cyantraniliprole 10.26% OD @ 1.8 ml/L."
  },
  'tomato_septoria': {
    recommendedAction: "Plow tomato debris deep under after harvest. Prune lower infected leaves showing circular spots with dark margins and white centers. Mulch heavily beneath plants.",
    organicTreatment: "Spray Copper Hydroxide @ 2 g/L or bio-agent Bacillus subtilis @ 5 g/L. Apply neem oil 3 ml/L preventative spray.",
    chemicalTreatment: "Spray Chlorothalonil 75 WP @ 2 g/L or Mancozeb 75 WP @ 2.5 g/L or Tebuconazole + Trifloxystrobin WG @ 0.7 g/L."
  },
  'tomato_target_spot': {
    recommendedAction: "Remove fallen senescent leaves from under the canopy. Improve air circulation between rows. Avoid overhead sprinkler irrigation during cloudy weather.",
    organicTreatment: "Foliar spray with Trichoderma viride @ 5 g/L or Copper Oxychloride @ 2.5 g/L.",
    chemicalTreatment: "Spray Azoxystrobin 23 SC @ 1 ml/L or Pyraclostrobin 20 WG @ 1 g/L or Chlorothalonil 75 WP @ 2 g/L."
  },
  'tomato_leaf_mold': {
    recommendedAction: "Ventilate polyhouses and pruning foliage to maintain relative humidity below 80%. Space plants widely to promote rapid morning drying. Avoid night-time wetting of foliage.",
    organicTreatment: "Spray Potassium Bicarbonate @ 4 g/L or bio-fungicide Trichoderma harzianum @ 5 g/L on lower leaf undersides where olive-green velvet mold develops.",
    chemicalTreatment: "Foliar spray with Copper Oxychloride 50 WP @ 2.5 g/L or Difenoconazole 25 EC @ 0.5 ml/L or Azoxystrobin 23 SC @ 1 ml/L."
  },
  'tomato_spider_mites': {
    recommendedAction: "Keep field borders and headlands free from dust and dry weeds which harbor mite reservoirs. Avoid excessive synthetic pyrethroids that destroy beneficial predatory mites.",
    organicTreatment: "Foliar spray with Wettable Sulfur 80 WP @ 3 g/L or pongamia oil (karanj oil) @ 4 ml/L. Release predatory phytoseiid mites (Neoseiulus californicus).",
    chemicalTreatment: "Spray Propargite 57% EC @ 2 ml/L or Spiromesifen 22.9% SC @ 1 ml/L or Fenazaquin 10% EC @ 2 ml/L with high pressure directed to leaf undersides."
  },
  // Corn
  'corn_rust': {
    recommendedAction: "Plant early in the season before regional airborne rust spore showers arrive. Avoid excessively dense plant populations that trap morning dew. Select resistant hybrids with Rp genes.",
    organicTreatment: "Spray Wettable Sulfur 80 WP @ 2.5 g/L or fermented cow urine filtrate (10%) at early vegetative stage.",
    chemicalTreatment: "Foliar spray with Azoxystrobin 23% SC @ 1 ml/L or Mancozeb 75% WP @ 2 g/L or Propiconazole 25% EC @ 1 ml/L when rust pustules appear before tasseling."
  },
  'corn_leaf_blight': {
    recommendedAction: "Shred and incorporate maize stubble deeply with a disc plough immediately after harvest to speed up spore decomposition. Cultivate resistant hybrids containing Ht genes. Rotate fields with legumes or mustard.",
    organicTreatment: "Foliar spray of Trichoderma harzianum @ 5 g/L or Neem cake extract (5%) at knee-high stage.",
    chemicalTreatment: "Foliar spray of Mancozeb 75% WP @ 2.5 g/L or Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1 ml/L upon seeing early elliptical cigar-shaped lesions on lower leaves."
  },
  // Grape
  'grape_black_rot': {
    recommendedAction: "Collect and incinerate all shriveled black mummified berries from the vines and vineyard floor during winter dormancy. Summer canopy management: tuck shoots and thin leaves around fruit clusters to maximize morning solar drying.",
    organicTreatment: "Spray Bordeaux mixture 1% (4:4:50) or Copper Hydroxide @ 2 g/L immediately post-pruning and at early bud break.",
    chemicalTreatment: "Apply Myclobutanil 10% WP @ 0.5 g/L or Mancozeb 75% WP @ 2.5 g/L or Azoxystrobin 23% SC @ 1 ml/L from bud-break through fruit-set at 10-14 day intervals."
  },
  'grape_esca': {
    recommendedAction: "Disinfect pruning shears between individual vines using 70% alcohol or bleach. Make clean angled cuts and avoid pruning during wet rainy weather. Mark symptomatic vines during summer and prune them last in winter.",
    organicTreatment: "Immediately paint large pruning cuts with Trichoderma atroviride paste or Bordeaux paste (10% copper sulfate + lime) to create an impermeable living bio-shield.",
    chemicalTreatment: "No curative systemic spray exists; trunk renewal: train a healthy basal sucker to replace compromised diseased wood. Protect fresh cuts with Thiophanate-methyl pruning paint."
  },
  'grape_leaf_blight': {
    recommendedAction: "Rake and burn fallen diseased vine leaves after harvest. Maintain good shoot spacing on the trellis wire to allow rapid breeze circulation through the canopy.",
    organicTreatment: "Spray Copper Oxychloride 50 WP @ 2.5 g/L or Bordeaux mixture 1% post-monsoon.",
    chemicalTreatment: "Spray Carbendazim 50% WP @ 1 g/L or Mancozeb 75% WP @ 2 g/L or Difenoconazole 25% EC @ 0.5 ml/L at first appearance of angular reddish-brown scorched leaf patches."
  },
  // Apple
  'apple_scab': {
    recommendedAction: "Post-harvest autumn spray of 5% Urea onto the orchard floor to accelerate leaf decomposition and eliminate overwintering pseudothecia spores. Prune open-center or central-leader trees to maximize interior sunlight.",
    organicTreatment: "Apply Lime Sulfur (liquid calcium polysulfide @ 20 ml/L) or Copper Oxychloride @ 3 g/L during silver tip and green tip stages before petal fall.",
    chemicalTreatment: "Prophylactic: Captan 50% WP @ 2.5 g/L or Mancozeb 75% WP @ 2.5 g/L. Curative kickback spray: Difenoconazole 25% EC @ 0.3 ml/L or Dodine 65% WP @ 1 g/L applied within 48 hours of infection rain."
  },
  'apple_cedar_rust': {
    recommendedAction: "Eradicate alternate host red cedar and juniper shrubs within a 1-2 km perimeter around commercial apple orchards. Plant scab and rust-resistant cultivars.",
    organicTreatment: "Foliar spray with Wettable Sulfur 80 WP @ 3 g/L from pink bud through petal fall.",
    chemicalTreatment: "Spray Myclobutanil 10% WP @ 0.5 g/L or Mancozeb 75% WP @ 2.5 g/L or Trifloxystrobin + Tebuconazole @ 0.7 g/L at tight cluster through petal fall."
  },
  'apple_black_rot': {
    recommendedAction: "Prune out dead shoots, mummified apples, and cankered limbs during winter. Make cuts 15 cm below visible cankers. Maintain tree vigor through balanced soil nutrition.",
    organicTreatment: "Spray Liquid Copper Sulfate @ 2.5 g/L or Bordeaux mixture 1% before bud swell.",
    chemicalTreatment: "Spray Captan 50% WP @ 2.5 g/L or Thiophanate-methyl 70% WP @ 1 g/L from pink bud stage through harvest."
  },
  // Cherry
  'cherry_powdery_mildew': {
    recommendedAction: "Prune water sprouts and inner canopy shoots to improve sunlight penetration and air movement. Avoid late-season excessive irrigation and high nitrogen fertilization.",
    organicTreatment: "Spray Potassium Bicarbonate @ 4 g/L or Wettable Sulfur 80 WP @ 2.5 g/L.",
    chemicalTreatment: "Spray Myclobutanil 10% WP @ 0.5 g/L or Trifloxystrobin 50% WG @ 0.3 g/L or Propiconazole 25% EC @ 1 ml/L upon early white leaf patches."
  },
  // Squash
  'squash_powdery_mildew': {
    recommendedAction: "Grow tolerant cucurbit varieties. Plant vines at wide row spacing (minimum 1.5 to 2 meters) to avoid dense moisture pockets. Drip irrigate under plastic mulch.",
    organicTreatment: "Spray Potassium Bicarbonate @ 5 g/L + Neem oil 1500 ppm @ 3 ml/L, or spray bio-control hyperparasitic fungus Ampelomyces quisqualis @ 5 g/L.",
    chemicalTreatment: "Foliar spray with Dinocap 48% EC @ 1 ml/L or Hexaconazole 5% EC @ 1 ml/L or Wettable Sulfur 80% WP @ 2.5 g/L at the first white talc-like powdery patch."
  },
  // Sugarcane
  'sugarcane_red_rot': {
    recommendedAction: "Select seed setts exclusively from certified disease-free primary nurseries; never use setts from affected blocks. Never take ratoon crops from red rot infected fields. Rotate fields with paddy or sunnhemp for 2 seasons.",
    organicTreatment: "Sett dip in Trichoderma viride @ 10 g/L slurry for 30 minutes before planting. Apply Trichoderma enriched farmyard manure (FYM @ 10 kg/furrow) at planting.",
    chemicalTreatment: "Sett treatment: dip setts in Carbendazim 50% WP @ 1 g/L or Thiophanate Methyl 70% WP @ 1 g/L solution for 15 minutes. Uproot and burn diseased clumps immediately."
  },
  'sugarcane_smut': {
    recommendedAction: "Carefully enclose the emerging pencil-thick black whip in a cloth or polythene bag before cutting to prevent wind dispersal of millions of teliospores. Rogue out and burn the stool outside the field.",
    organicTreatment: "Moist hot air treatment of seed setts (54°C for 2.5 hours) or hot water treatment (52°C for 30 minutes) to eliminate internal smut mycelium.",
    chemicalTreatment: "Sett treatment: dip setts in Propiconazole 25% EC @ 1 ml/L or Triadimefon 25% WP @ 1 g/L for 15 minutes before planting."
  },
  // Soybean
  'soybean_rust': {
    recommendedAction: "Avoid late sowing dates; plant at recommended onset of monsoon. Cultivate tolerant cultivars in endemic zones. Monitor lower canopy undersides during flowering and pod development.",
    organicTreatment: "Foliar spray with Trichoderma harzianum @ 5 g/L or 5% Neem Seed Kernel Extract (NSKE) at early flowering.",
    chemicalTreatment: "Spray Hexaconazole 5% EC @ 1 ml/L or Propiconazole 25% EC @ 1 ml/L or Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1 ml/L immediately at first rust tan speck."
  },
  'soybean_cercospora': {
    recommendedAction: "Rotate with non-legume crops (corn, sorghum) for 2 years. Plow under crop residue after harvest. Plant certified disease-free seed with fungicide coating.",
    organicTreatment: "Seed treatment with Pseudomonas fluorescens (10 g/kg) and foliar spray of Neem oil 3 ml/L.",
    chemicalTreatment: "Spray Pyraclostrobin 20% WG @ 1 g/L or Azoxystrobin 23% SC @ 1 ml/L or Carbendazim 50% WP @ 1 g/L at pod set."
  },
  // Citrus / Orange
  'citrus_greening': {
    recommendedAction: "Plant only disease-free certified budwood saplings produced in insect-proof screenhouses. Systematically scout and rogue out declining infected trees to eliminate vector feeding sources. Prune infected branches.",
    organicTreatment: "Foliar spray of 2% Neem oil or Beauveria bassiana @ 5 g/L during new leaf flush to suppress citrus psyllid nymphs (Diaphorina citri). Nutritional spray of Zinc sulfate 0.5% + Ferrous sulfate 0.5% + Manganese sulfate 0.5%.",
    chemicalTreatment: "Vector suppression: Spray Imidacloprid 17.8% SL @ 0.5 ml/L or Thiamethoxam 25% WG @ 0.3 g/L during spring and monsoon new vegetative flushes."
  },
  // Bell Pepper
  'pepper_bacterial_spot': {
    recommendedAction: "Hot water seed treatment at 50°C for 25 minutes to eradicate internal seed-borne bacteria. Avoid handling plants in rainy or dewy weather. Mulch with silver-black reflective film.",
    organicTreatment: "Seed treatment and foliar spray of Pseudomonas fluorescens @ 5 g/L or Bacillus subtilis @ 5 g/L. Spray 1% Bordeaux mixture.",
    chemicalTreatment: "Foliar spray of Copper Oxychloride 50% WP @ 2.5 g/L mixed with Streptocycline @ 0.1 g/L (1 g in 10 L water) or Copper Hydroxide 53.8% DF @ 2 g/L."
  },
  // Strawberry
  'strawberry_scorch': {
    recommendedAction: "Plant certified disease-free runners on raised beds with drip irrigation and black plastic mulch. Prune and remove old purplish-spotted foliage after harvest to prevent overwintering inoculum.",
    organicTreatment: "Spray Copper Hydroxide @ 2 g/L or bio-fungicide Bacillus subtilis @ 5 g/L early in the spring season.",
    chemicalTreatment: "Foliar spray of Captan 50% WP @ 2.5 g/L or Myclobutanil 10% WP @ 0.5 g/L or Difenoconazole 25% EC @ 0.5 ml/L during early bloom."
  }
};

function getTreatmentForAlert(alert) {
  const d = (alert.diseaseName || '').toLowerCase();
  const c = (alert.crop || '').toLowerCase();
  
  if (c.includes('rice') || c.includes('paddy')) {
    if (d.includes('blast')) return TREATMENT_ENCYCLOPEDIA['rice_blast'];
    if (d.includes('bacterial') || d.includes('blb')) return TREATMENT_ENCYCLOPEDIA['rice_blb'];
    if (d.includes('brown')) return TREATMENT_ENCYCLOPEDIA['rice_brown_spot'];
    return TREATMENT_ENCYCLOPEDIA['rice_blast'];
  }
  if (c.includes('wheat')) {
    if (d.includes('yellow') || d.includes('stripe')) return TREATMENT_ENCYCLOPEDIA['wheat_yellow_rust'];
    if (d.includes('brown') || d.includes('leaf rust')) return TREATMENT_ENCYCLOPEDIA['wheat_brown_rust'];
    if (d.includes('mildew')) return TREATMENT_ENCYCLOPEDIA['wheat_powdery_mildew'];
    return TREATMENT_ENCYCLOPEDIA['wheat_yellow_rust'];
  }
  if (c.includes('cotton')) {
    if (d.includes('curl') || d.includes('virus') || d.includes('whitefly')) return TREATMENT_ENCYCLOPEDIA['cotton_clcuv'];
    if (d.includes('bacterial') || d.includes('angular') || d.includes('black arm')) return TREATMENT_ENCYCLOPEDIA['cotton_bacterial_blight'];
    return TREATMENT_ENCYCLOPEDIA['cotton_clcuv'];
  }
  if (c.includes('potato')) {
    if (d.includes('late')) return TREATMENT_ENCYCLOPEDIA['potato_late_blight'];
    if (d.includes('early')) return TREATMENT_ENCYCLOPEDIA['potato_early_blight'];
    return TREATMENT_ENCYCLOPEDIA['potato_late_blight'];
  }
  if (c.includes('tomato')) {
    if (d.includes('late')) return TREATMENT_ENCYCLOPEDIA['tomato_late_blight'];
    if (d.includes('early')) return TREATMENT_ENCYCLOPEDIA['tomato_early_blight'];
    if (d.includes('curl') || d.includes('tylcv')) return TREATMENT_ENCYCLOPEDIA['tomato_tylcv'];
    if (d.includes('bacterial')) return TREATMENT_ENCYCLOPEDIA['tomato_bacterial_spot'];
    if (d.includes('septoria')) return TREATMENT_ENCYCLOPEDIA['tomato_septoria'];
    if (d.includes('target')) return TREATMENT_ENCYCLOPEDIA['tomato_target_spot'];
    if (d.includes('mold')) return TREATMENT_ENCYCLOPEDIA['tomato_leaf_mold'];
    if (d.includes('mite')) return TREATMENT_ENCYCLOPEDIA['tomato_spider_mites'];
    return TREATMENT_ENCYCLOPEDIA['tomato_early_blight'];
  }
  if (c.includes('corn') || c.includes('maize')) {
    if (d.includes('rust')) return TREATMENT_ENCYCLOPEDIA['corn_rust'];
    if (d.includes('blight') || d.includes('cercospora') || d.includes('spot')) return TREATMENT_ENCYCLOPEDIA['corn_leaf_blight'];
    return TREATMENT_ENCYCLOPEDIA['corn_rust'];
  }
  if (c.includes('grape')) {
    if (d.includes('black rot')) return TREATMENT_ENCYCLOPEDIA['grape_black_rot'];
    if (d.includes('esca') || d.includes('measles')) return TREATMENT_ENCYCLOPEDIA['grape_esca'];
    if (d.includes('blight') || d.includes('isariopsis')) return TREATMENT_ENCYCLOPEDIA['grape_leaf_blight'];
    return TREATMENT_ENCYCLOPEDIA['grape_black_rot'];
  }
  if (c.includes('apple')) {
    if (d.includes('scab')) return TREATMENT_ENCYCLOPEDIA['apple_scab'];
    if (d.includes('rust')) return TREATMENT_ENCYCLOPEDIA['apple_cedar_rust'];
    if (d.includes('black rot')) return TREATMENT_ENCYCLOPEDIA['apple_black_rot'];
    return TREATMENT_ENCYCLOPEDIA['apple_scab'];
  }
  if (c.includes('cherry')) return TREATMENT_ENCYCLOPEDIA['cherry_powdery_mildew'];
  if (c.includes('squash') || c.includes('cucurbit')) return TREATMENT_ENCYCLOPEDIA['squash_powdery_mildew'];
  if (c.includes('sugarcane')) {
    if (d.includes('red')) return TREATMENT_ENCYCLOPEDIA['sugarcane_red_rot'];
    if (d.includes('smut')) return TREATMENT_ENCYCLOPEDIA['sugarcane_smut'];
    return TREATMENT_ENCYCLOPEDIA['sugarcane_red_rot'];
  }
  if (c.includes('soybean')) {
    if (d.includes('rust')) return TREATMENT_ENCYCLOPEDIA['soybean_rust'];
    if (d.includes('cercospora')) return TREATMENT_ENCYCLOPEDIA['soybean_cercospora'];
    return TREATMENT_ENCYCLOPEDIA['soybean_rust'];
  }
  if (c.includes('orange') || c.includes('citrus')) return TREATMENT_ENCYCLOPEDIA['citrus_greening'];
  if (c.includes('pepper') || c.includes('chilli') || c.includes('capsicum')) return TREATMENT_ENCYCLOPEDIA['pepper_bacterial_spot'];
  if (c.includes('strawberry')) return TREATMENT_ENCYCLOPEDIA['strawberry_scorch'];

  return null;
}

// Read current defaultRegionalAlerts.ts
const targetPath = 'src/data/defaultRegionalAlerts.ts';
let code = fs.readFileSync(targetPath, 'utf8');

const jsonStart = code.indexOf('= [') + 2;
const jsonEnd = code.lastIndexOf(']');
const alerts = JSON.parse(code.slice(jsonStart, jsonEnd + 1));
console.log('Loaded alerts:', alerts.length);

let updatedCount = 0;
alerts.forEach(alert => {
  const treat = getTreatmentForAlert(alert);
  if (treat) {
    alert.recommendedAction = treat.recommendedAction;
    alert.organicTreatment = treat.organicTreatment;
    alert.chemicalTreatment = treat.chemicalTreatment;
    updatedCount++;
  }
});

console.log('Updated treatments on', updatedCount, 'alerts');

const outCode = `import { RegionalDiseaseAlert } from '../types/regionalAlerts';

/**
 * Authoritative Nationwide ICAR Epidemiological Outbreak Alert Dataset
 * Covers all 36 Indian States and Union Territories with authentic ICAR/DPPQS monitoring points,
 * precise district coordinates, and disease-specific containment protocols.
 */
export const DEFAULT_REGIONAL_ALERTS: RegionalDiseaseAlert[] = ${JSON.stringify(alerts, null, 2)};
`;

fs.writeFileSync(targetPath, outCode, 'utf8');
console.log('Successfully saved updated defaultRegionalAlerts.ts!');
