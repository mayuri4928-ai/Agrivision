import { DiseaseDetail } from '../types';

export const DISEASES_DATABASE: Record<string, DiseaseDetail> = {
  "Apple___Apple_scab": {
    "className": "Apple___Apple_scab",
    "crop": "Apple",
    "disease": "Apple Scab",
    "scientificName": "Venturia inaequalis",
    "isHealthy": false,
    "simpleDescription": "A fungal infection causing olive-green to black velvety spots on apple leaves and fruit.",
    "visibleSymptoms": [
      "Velvety olive-green spots with feathery borders on upper leaf surface",
      "Leaves may turn yellow, curl up, and drop prematurely",
      "Scabby, corky, or deformed patches on fruit"
    ],
    "generalPrevention": [
      "Rake and dispose of fallen autumn leaves to remove overwintering fungal spores",
      "Prune the tree canopy in dry weather to improve air circulation and sunlight penetration",
      "Avoid overhead sprinkler irrigation that keeps leaves wet for prolonged periods"
    ],
    "recommendedNextSteps": [
      "Isolate affected shoots and prune infected foliage carefully",
      "Apply registered bio-fungicides (such as sulfur or copper-based sprays) early in the growing season before flowering",
      "Disinfect pruning shears with isopropyl alcohol between cuts"
    ],
    "expertHelpWarning": "Consult your local Krishi Vigyan Kendra (KVK) if scab affects more than 20% of your orchard foliage before fruit set.",
    "organicRemedies": [
      "Spray Captan 50 WP (2.5 g/L) or Mancozeb (2.5 g/L) at silver tip to pink bud stages",
      "Apply Dodine 65 WP (1 g/L) or Difenoconazole (0.3 ml/L) for kickback curative action",
      "Maintain spray schedule every 7-10 days throughout wet spring"
    ]
  },
  "Apple___Black_rot": {
    "className": "Apple___Black_rot",
    "crop": "Apple",
    "disease": "Black Rot",
    "scientificName": "Botryosphaeria obtusa",
    "isHealthy": false,
    "simpleDescription": "A severe fungal disease causing \"frog-eye\" leaf spots, fruit rot, and bark cankers on apple branches.",
    "visibleSymptoms": [
      "Circular purple spots on leaves that enlarge to have brown centers (\"frog-eye\" leaf spot)",
      "Fruit develops firm, dark brown rot rings often with black fungal pimples",
      "Depressed cankers and peeling bark on branches"
    ],
    "generalPrevention": [
      "Remove mummified fruit left hanging on trees during the winter",
      "Prune out dead branches and fire blight cankers during dormant periods",
      "Keep trees vigorous through balanced soil nutrition and weed suppression"
    ],
    "recommendedNextSteps": [
      "Cut back infected branches 6-8 inches below any visible canker border",
      "Burn or safely bury infected debris away from the orchard",
      "Consult agricultural extension services for recommended preventative fungicide schedules"
    ],
    "expertHelpWarning": "Contact an agricultural specialist immediately if trunk cankers are present, as this can girdle and kill mature apple trees.",
    "organicRemedies": [
      "Spray Captan 50 WP (2.5 g/L) from petal fall through harvest",
      "Apply Copper Oxychloride (3 g/L) or Bordeaux mixture (1%) during silver tip bud break",
      "Seal large pruning cuts with copper fungicide paste"
    ]
  },
  "Apple___Cedar_apple_rust": {
    "className": "Apple___Cedar_apple_rust",
    "crop": "Apple",
    "disease": "Cedar Apple Rust",
    "scientificName": "Gymnosporangium juniperi-virginianae",
    "isHealthy": false,
    "simpleDescription": "A rust fungus that alternates between apple trees and nearby cedar or juniper trees, producing vivid yellow-orange spots.",
    "visibleSymptoms": [
      "Bright yellow-orange spots on the upper leaf surface that develop small black dots",
      "Tubular rust pustules forming on the underside of leaves and fruit",
      "Early defoliation of apple trees during humid summer months"
    ],
    "generalPrevention": [
      "Remove nearby wild red cedar or juniper trees within 500 meters of the orchard if possible",
      "Plant rust-resistant apple cultivars for new orchard blocks",
      "Inspect trees closely during warm rainy spring periods"
    ],
    "recommendedNextSteps": [
      "Collect and destroy infected leaves showing orange lesions",
      "Apply preventative protective fungicides during spring leaf emergence and petal fall",
      "Monitor nearby cedar trees for gelatinous orange galls in wet spring weather"
    ],
    "expertHelpWarning": "Consult your district horticulture officer if heavy defoliation occurs for consecutive years.",
    "organicRemedies": [
      "Spray Myclobutanil 10 WP (0.5 g/L) at pink bud through petal fall stages",
      "Apply Mancozeb 75 WP (2.5 g/L) as protective shield before spring rains",
      "Ensure sprays coincide with orange gelatinous horn emergence on cedars"
    ]
  },
  "Apple___healthy": {
    "className": "Apple___healthy",
    "crop": "Apple",
    "disease": "Healthy",
    "isHealthy": true,
    "simpleDescription": "The apple leaf appears vibrant, green, and free from observable fungal lesions or insect feeding marks.",
    "visibleSymptoms": [
      "Uniform green coloration with smooth leaf edges",
      "Intact leaf surface with no necrotic spots, rust, or powdery growth",
      "Healthy firm petiole and strong leaf turgor"
    ],
    "generalPrevention": [
      "Maintain regular balanced fertilizer application (NPK) according to soil test recommendations",
      "Ensure adequate drip irrigation and mulch around the drip line to conserve moisture",
      "Continue routine weekly orchard scouting for early pest or disease signs"
    ],
    "recommendedNextSteps": [
      "Continue current good agricultural practices (GAP)",
      "Keep tree canopy pruned for light and air circulation",
      "Record leaf scouting date in AgriVision history for seasonal monitoring"
    ],
    "expertHelpWarning": "No disease treatment is needed. Remember: this AI assessment is based on the uploaded leaf image and does not guarantee the entire tree is disease-free.",
    "organicRemedies": [
      "No fungicide needed; orchard is in excellent health",
      "Apply dormant horticultural oil in late winter for scale/mite eggs",
      "Record scouting report in AgriVision"
    ]
  },
  "Blueberry___healthy": {
    "className": "Blueberry___healthy",
    "crop": "Blueberry",
    "disease": "Healthy",
    "isHealthy": true,
    "simpleDescription": "The blueberry foliage demonstrates healthy chlorophyll density, clean margins, and no visible rust or scorch.",
    "visibleSymptoms": [
      "Glossy, deep-green leaf blades with no discolored spots",
      "Uniform leaf size and healthy new stem growth",
      "Absence of leaf scorch, mottling, or fungal mildew"
    ],
    "generalPrevention": [
      "Maintain acidic soil pH (4.5 to 5.5) using pine bark or organic compost",
      "Use drip irrigation with clean, low-salinity water",
      "Avoid mechanical damage to fine root systems near the surface"
    ],
    "recommendedNextSteps": [
      "Continue current nutrient and watering schedule",
      "Scout regularly for aphid or fruit fly activity",
      "Keep records of bush growth stages"
    ],
    "expertHelpWarning": "No disease detected. Maintain acidic soil conditions and consult an extension officer if leaves begin turning yellow (chlorosis).",
    "organicRemedies": [
      "No treatment needed; blueberry bush is in peak health",
      "Maintain iron chelate (Fe-EDDHA) applications if pH climbs above 5.5",
      "Log scouting record in AgriVision"
    ]
  },
  "Blueberry___Anthracnose": {
    "className": "Blueberry___Anthracnose",
    "crop": "Blueberry",
    "disease": "Anthracnose (Ripe Rot)",
    "scientificName": "Colletotrichum gloeosporioides / acutatum",
    "isHealthy": false,
    "simpleDescription": "A destructive fungal pathogen causing leaf lesions, shoot dieback, and salmon-pink fungal spore masses on ripening fruit.",
    "visibleSymptoms": [
      "Circular reddish-brown necrotic spots on foliage that coalesce into broad leaf blight",
      "Small sunken lesions on young green canes turning dark brown with blighted tips",
      "Soft sunken berry rot with wet salmon-pink or orange spore gelatinous droplets"
    ],
    "generalPrevention": [
      "Prune dead or weak canes in late winter to increase air velocity and sunlight inside bushes",
      "Use drip micro-irrigation instead of overhead sprinklers to keep foliage dry",
      "Harvest fruit promptly at maturity and chill berries immediately below 4°C"
    ],
    "recommendedNextSteps": [
      "Prune and burn blighted twig tips 4 inches below infected margins",
      "Apply preventative copper oxychloride (2.5 g/L) or Azoxystrobin bio-spray at early bloom",
      "Maintain pine needle mulch to minimize spore rain-splash from soil"
    ],
    "expertHelpWarning": "Consult your local horticulture department if berry clusters exhibit premature soft rotting across >15% of plants.",
    "organicRemedies": [
      "Copper Oxychloride 50 WP (2.5 g/L) or Azoxystrobin 23 SC (1 ml/L) at early bloom",
      "Bio-fungicide: Bacillus subtilis or Trichoderma spray (5 g/L)"
    ]
  },
  "Blueberry___Stem_blight": {
    "className": "Blueberry___Stem_blight",
    "crop": "Blueberry",
    "disease": "Botryosphaeria Stem Blight",
    "scientificName": "Botryosphaeria corticis / dothidea",
    "isHealthy": false,
    "simpleDescription": "A virulent vascular fungus that enters through mechanical wounds or pruning cuts, causing sudden yellowing, wilting, and brown flagging of individual canes.",
    "visibleSymptoms": [
      "Sudden rapid wilting and drying of leaves on one or more individual stems (\"flagging\")",
      "Leaves turn dry reddish-brown and remain clinging to the dead stems",
      "Brown to reddish discoloration of vascular tissue visible when cane is cut open longitudinally"
    ],
    "generalPrevention": [
      "Avoid unnecessary pruning cuts or machinery abrasions during high-humidity monsoon periods",
      "Disinfect pruning shears between bushes with 70% alcohol or 10% sodium hypochlorite",
      "Avoid high-dose late-season nitrogen fertilizers that produce tender vulnerable growth"
    ],
    "recommendedNextSteps": [
      "Immediately prune out infected flagged canes 6 to 8 inches below the lowest vascular discoloration line",
      "Destroy and burn all severed infected canes away from the plantation",
      "Apply protective foliar bio-spray of Trichoderma harzianum or Copper Hydroxide after pruning"
    ],
    "expertHelpWarning": "Stem blight can enter the crown and kill entire blueberry bushes. Rogue out plants showing crown rot.",
    "organicRemedies": [
      "Prune blighted canes 6-8 inches below visible internal discoloration and burn",
      "Foliar spray with Copper Hydroxide (2.5 g/L) immediately after pruning"
    ]
  },
  "Cherry_(including_sour)___Powdery_mildew": {
    "className": "Cherry_(including_sour)___Powdery_mildew",
    "crop": "Cherry",
    "disease": "Powdery Mildew",
    "scientificName": "Podosphaera clandestina",
    "isHealthy": false,
    "simpleDescription": "A widespread fungal disease coating cherry leaves with white, talcum powder-like fungal patches.",
    "visibleSymptoms": [
      "White powdery circular patches on both upper and lower leaf surfaces",
      "Distorted, curled, or crinkled young leaves and stunted shoots",
      "Premature leaf drop and blemished cherry fruit"
    ],
    "generalPrevention": [
      "Prune cherry canopies open to promote brisk air movement and rapid drying",
      "Avoid high nitrogen fertilization late in the season which promotes lush, susceptible tender growth",
      "Choose resistant rootstocks and varieties suited to your region"
    ],
    "recommendedNextSteps": [
      "Prune infected terminal shoots and safely discard them",
      "Apply potassium bicarbonate or sulfur sprays when first spots appear",
      "Ensure irrigation water does not splash onto the lower canopy"
    ],
    "expertHelpWarning": "Seek expert advisory if more than 30% of new cherry shoot tips are covered with powdery mildew.",
    "organicRemedies": [
      "Spray Wettable Sulfur (2-3 g/L) at shuck split and repeat every 10-14 days",
      "Apply Myclobutanil (0.5 g/L) or Tebuconazole (1 ml/L) during severe disease pressure",
      "Apply potassium bicarbonate (3 g/L) as organic contact curative"
    ]
  },
  "Cherry_(including_sour)___healthy": {
    "className": "Cherry_(including_sour)___healthy",
    "crop": "Cherry",
    "disease": "Healthy",
    "isHealthy": true,
    "simpleDescription": "Cherry leaves are healthy, displaying rich green luster and smooth margins without powdery mildew or shot-hole lesions.",
    "visibleSymptoms": [
      "Bright green, intact leaf surface",
      "No powdery white growth or reddish necrotic spots",
      "Vigorous leaf structure"
    ],
    "generalPrevention": [
      "Ensure well-drained orchard soil to prevent root rot",
      "Spray dormant winter oil to control overwintering mites and insect scales",
      "Inspect underside of leaves weekly during humid spring weather"
    ],
    "recommendedNextSteps": [
      "Continue standard orchard management practices",
      "Maintain consistent watering during fruit swelling",
      "Keep trees mulched to suppress weeds"
    ],
    "expertHelpWarning": "No disease detected. This result is based on the uploaded image and does not guarantee the entire tree is disease-free.",
    "organicRemedies": [
      "No fungicide intervention needed; cherry tree is in excellent health",
      "Apply dormant copper or horticultural oil during bud swell for insect prevention",
      "Log scouting record in AgriVision"
    ]
  },
  "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot": {
    "className": "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot",
    "crop": "Corn / Maize",
    "disease": "Cercospora Gray Leaf Spot",
    "scientificName": "Cercospora zeae-maydis",
    "isHealthy": false,
    "simpleDescription": "A severe fungal leaf disease causing rectangular tan-to-gray lesions running parallel to corn leaf veins.",
    "visibleSymptoms": [
      "Distinct rectangular lesions bordered strictly by leaf veins",
      "Lesions start grayish-tan and can merge, causing entire leaves to scorch and die",
      "Lower leaves affected first, progressing upward toward the ear leaves"
    ],
    "generalPrevention": [
      "Rotate maize with non-grass crops like legumes or soybean for 1-2 seasons",
      "Tillage or residue management to accelerate breakdown of previous crop debris",
      "Plant certified hybrids with documented gray leaf spot tolerance"
    ],
    "recommendedNextSteps": [
      "Scout ear leaves and leaves below the ear before tasseling",
      "Apply recommended foliar fungicides if lesions appear on the third leaf below the ear before silking",
      "Ensure balanced nitrogen and potassium fertilization"
    ],
    "expertHelpWarning": "Contact your district agriculture extension worker if lesions reach the ear leaf prior to pollination.",
    "organicRemedies": [
      "Spray Azoxystrobin (1 ml/L) or Pyraclostrobin at tassel/silking stage if lesions reach ear leaf",
      "Apply Propiconazole 25 EC (1 ml/L) during early symptom onset",
      "Harvest promptly to avoid lodging"
    ]
  },
  "Corn_(maize)___Common_rust": {
    "className": "Corn_(maize)___Common_rust",
    "crop": "Corn / Maize",
    "disease": "Common Rust",
    "scientificName": "Puccinia sorghi",
    "isHealthy": false,
    "simpleDescription": "A fungal rust characterized by golden-brown to cinnamon-brown powdery pustules on both leaf surfaces of maize.",
    "visibleSymptoms": [
      "Small, circular to elongated cinnamon-brown pustules scattered on both leaf surfaces",
      "Pustules rupture the leaf epidermis, releasing powdery reddish-brown spores on fingers when touched",
      "Heavy infection causes chlorosis and premature leaf desiccation"
    ],
    "generalPrevention": [
      "Plant rust-tolerant hybrid corn varieties suited for your agro-climatic zone",
      "Plant early in the season to avoid late-season airborne rust spore showers",
      "Maintain balanced plant nutrition; avoid excessive nitrogen"
    ],
    "recommendedNextSteps": [
      "Assess pustule coverage on leaves at vegetative stages V6 to V8",
      "Consider triazole or strobilurin fungicide spray if rust pustules are active on upper leaves during cool, humid conditions",
      "Protect ear leaves during grain filling stages"
    ],
    "expertHelpWarning": "Consult agricultural extension if rust pustules appear extensively before silking.",
    "organicRemedies": [
      "Spray Mancozeb 75 WP (2.5 g/L) at first notice of pustules",
      "Spray Tebuconazole 25.9 EC (1 ml/L) or Azoxystrobin (1 ml/L) before silking if disease increases",
      "Repeat spray after 14 days under continuous humid conditions"
    ]
  },
  "Corn_(maize)___Northern_Leaf_Blight": {
    "className": "Corn_(maize)___Northern_Leaf_Blight",
    "crop": "Corn / Maize",
    "disease": "Northern Leaf Blight",
    "scientificName": "Setosphaeria turcica / Exserohilum turcicum",
    "isHealthy": false,
    "simpleDescription": "A damaging fungal disease creating large, cigar-shaped grayish-green or tan lesions across maize leaves.",
    "visibleSymptoms": [
      "Large, elongated, cigar-shaped tan lesions (1 to 6 inches long)",
      "Lesions have smooth rounded ends unlike the rectangular gray leaf spot",
      "Dark olive-green velvety spores visible on lesions during damp mornings"
    ],
    "generalPrevention": [
      "Select maize hybrids carrying Ht resistance genes",
      "Practice 2-year crop rotation with pulses or oilseeds",
      "Incorporate maize stover deeply into the soil after harvest to decompose pathogen spores"
    ],
    "recommendedNextSteps": [
      "Check lower canopy leaves regularly during humid, overcast weather",
      "Apply protective fungicides if lesions appear on mid-canopy leaves before silking",
      "Avoid high plant density that traps moisture in the crop canopy"
    ],
    "expertHelpWarning": "Alert your local KVK or agricultural officer if cigar-shaped lesions spread to ear leaves early in the season.",
    "organicRemedies": [
      "Spray Mancozeb 75 WP (2.5 g/L) at first symptom appearance on lower leaves",
      "Apply Azoxystrobin (1 ml/L) or Pyraclostrobin if lesions reach ear leaf before pollination",
      "Repeat at 10-14 day intervals under heavy dew conditions"
    ]
  },
  "Corn_(maize)___healthy": {
    "className": "Corn_(maize)___healthy",
    "crop": "Corn / Maize",
    "disease": "Healthy",
    "isHealthy": true,
    "simpleDescription": "Corn leaf is healthy with broad green blades, prominent central midrib, and no rust pustules or necrotic blight lesions.",
    "visibleSymptoms": [
      "Vibrant deep green leaf blade with intact midrib",
      "No rust pustules, rectangular spots, or cigar-shaped lesions",
      "Sturdy leaf blade and normal vein structure"
    ],
    "generalPrevention": [
      "Follow recommended spacing and seed rate for optimal sunlight capture",
      "Apply split doses of nitrogen at planting and knee-high stages",
      "Keep fields weed-free during early vegetative stages (first 30-40 days)"
    ],
    "recommendedNextSteps": [
      "Continue standard crop management and irrigation cycles",
      "Scout for fall armyworm or stem borer periodically",
      "Maintain field drainage during heavy monsoon rains"
    ],
    "expertHelpWarning": "No disease detected. This result is based on the uploaded image and does not guarantee the entire field is disease-free.",
    "organicRemedies": [
      "No chemical intervention required; crop is healthy",
      "Monitor for fall armyworm in whorl",
      "Log observation in AgriVision"
    ]
  },
  "Grape___Black_rot": {
    "className": "Grape___Black_rot",
    "crop": "Grape",
    "disease": "Black Rot",
    "scientificName": "Guignardia bidwellii",
    "isHealthy": false,
    "simpleDescription": "A destructive fungal disease that causes reddish-brown leaf spots with dark borders and turns grape berries into shriveled black mummies.",
    "visibleSymptoms": [
      "Circular reddish-brown leaf spots surrounded by dark borders with tiny black specks",
      "Infected grapes turn brown, shrivel, and harden into black mummies that cling to the vine",
      "Black elongated lesions on green vine shoots"
    ],
    "generalPrevention": [
      "Remove and destroy all mummified grapes and infected cane prunings during winter dormancy",
      "Canopy management: prune vines and position shoots to maximize breeze and sun drying",
      "Clean vineyard floor of leaf litter before bud break"
    ],
    "recommendedNextSteps": [
      "Apply approved protective fungicides from bud break through fruit set",
      "Inspect young leaves after rain events for tiny reddish spots",
      "Ensure vineyard trellis keeps clusters well off the ground"
    ],
    "expertHelpWarning": "Consult an extension grape pathologist if berry rot begins appearing on developing bunches.",
    "organicRemedies": [
      "Spray Mancozeb 75 WP (2.5 g/L) from bud break through veraison",
      "Apply Myclobutanil (0.5 g/L) or Azoxystrobin (1 ml/L) during bloom and early berry set",
      "Spray Bordeaux mixture 1% post-pruning to protect cut wounds"
    ]
  },
  "Grape___Esca_(Black_Measles)": {
    "className": "Grape___Esca_(Black_Measles)",
    "crop": "Grape",
    "disease": "Esca (Black Measles)",
    "scientificName": "Phaeomoniella chlamydospora & Fomitiporia mediterranea",
    "isHealthy": false,
    "simpleDescription": "A chronic fungal wood-decay disease of grapevines causing distinctive \"tiger-stripe\" leaf patterns and spotted fruit.",
    "visibleSymptoms": [
      "\"Tiger-stripe\" pattern: interveinal yellow or red chlorosis with brown necrotic stripes",
      "Grape berries develop dark purple or black speckled spots (\"measles\")",
      "Sudden wilting and collapse of whole canes (apoplexy) in hot dry summer weather"
    ],
    "generalPrevention": [
      "Disinfect pruning shears between vines using 70% alcohol or bleach solution",
      "Apply pruning wound sealants or protective bio-fungicide pastes onto large cuts",
      "Avoid making large pruning cuts during wet, spore-heavy weather"
    ],
    "recommendedNextSteps": [
      "Mark affected vines during summer to prune them last in winter",
      "Prune dead wood well below infected areas into healthy white wood",
      "Maintain vine vigor through adequate irrigation and organic soil amendments"
    ],
    "expertHelpWarning": "Contact a grape viticulture consultant for trunk renewal techniques if prized mature vines show tiger-striping.",
    "organicRemedies": [
      "Mark infected vines and prune them last to avoid spreading spores to healthy vines",
      "Trunk renewal: train an uninfected basal sucker to replace compromised trunk",
      "Apply Trichoderma atroviride to pruning wounds as biological barrier"
    ]
  },
  "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)": {
    "className": "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)",
    "crop": "Grape",
    "disease": "Leaf Blight (Isariopsis)",
    "scientificName": "Pseudocercospora cladosporioides / Phaeoisariopsis vitis",
    "isHealthy": false,
    "simpleDescription": "A fungal leaf blight that causes brown, angular spots that later coalesce into large scorched blotches on grape foliage.",
    "visibleSymptoms": [
      "Irregular, angular brown spots bounded by smaller leaf veins",
      "Spots merge into extensive dead, brittle patches on the foliage",
      "Premature leaf fall leading to exposed grape clusters prone to sunburn"
    ],
    "generalPrevention": [
      "Improve canopy aeration through judicious shoot thinning and leaf removal around clusters",
      "Avoid high-volume overhead irrigation that wets the grapevine foliage",
      "Maintain proper vine nutrition to delay leaf senescence"
    ],
    "recommendedNextSteps": [
      "Apply copper-based or dithiocarbamate fungicides as preventative sprays after rainy spells",
      "Collect and safely compost or burn fallen infected leaves",
      "Check leaf undersides for dark velvety fungal tufts"
    ],
    "expertHelpWarning": "Consult agricultural officers if extensive defoliation occurs before grape bunches reach harvest maturity.",
    "organicRemedies": [
      "Spray Copper Oxychloride 50 WP (2.5-3.0 g/L) at first symptom appearance",
      "Apply Mancozeb 75 WP (2.5 g/L) or Carbendazim (1 g/L) if blight continues to spread",
      "Ensure thorough coverage of both upper and lower leaf canopy"
    ]
  },
  "Grape___healthy": {
    "className": "Grape___healthy",
    "crop": "Grape",
    "disease": "Healthy",
    "isHealthy": true,
    "simpleDescription": "Grapevine leaf is robust, displaying deep green lobes, clean veins, and no necrotic blotches or powdery mildew.",
    "visibleSymptoms": [
      "Well-formed lobed leaf with uniform green pigment",
      "Absence of black rot spots, tiger stripes, or mildew film",
      "Strong petiole attachment and pliable leaf blade"
    ],
    "generalPrevention": [
      "Follow canopy management (shoot positioning, suckering) for continuous light interception",
      "Manage irrigation carefully during veraison and fruit ripening",
      "Maintain protective spray calendar based on local weather forecasts"
    ],
    "recommendedNextSteps": [
      "Continue standard vineyard management practices",
      "Monitor cluster health and sugar accumulation",
      "Scout for mealybugs and downy mildew after rain"
    ],
    "expertHelpWarning": "No disease detected. This result is based on the uploaded image and does not guarantee the entire vineyard is disease-free.",
    "organicRemedies": [
      "No fungicide needed; vineyard is in prime agronomic health",
      "Continue micro-nutrient maintenance (Zinc, Boron) for berry sizing",
      "Log scouting record in AgriVision"
    ]
  },
  "Orange___Haunglongbing_(Citrus_greening)": {
    "className": "Orange___Haunglongbing_(Citrus_greening)",
    "crop": "Orange",
    "disease": "Huanglongbing (Citrus Greening)",
    "scientificName": "Candidatus Liberibacter asiaticus (vectored by Asian Citrus Psyllid)",
    "isHealthy": false,
    "simpleDescription": "A devastating bacterial disease spread by citrus psyllids, causing asymmetric yellow leaf mottling and bitter, deformed fruit.",
    "visibleSymptoms": [
      "Asymmetrical blotchy yellow mottling across leaf veins (one side yellow, other side green)",
      "Leaves become thick, leathery, and may point stiffly upright (\"rabbit ears\")",
      "Fruit remains small, lopsided, poorly colored (green at base), and bitter tasting"
    ],
    "generalPrevention": [
      "Plant only certified disease-free grafted saplings from registered government nurseries",
      "Monitor and strictly control Asian Citrus Psyllid (Diaphorina citri) vectors with yellow sticky traps",
      "Regularly scout citrus groves and remove severely infected decline trees to protect neighboring trees"
    ],
    "recommendedNextSteps": [
      "Control psyllid populations using registered horticultural oils or recommended systemic insecticides",
      "Provide foliar micronutrients (zinc, iron, manganese) to support affected trees temporarily",
      "Inspect citrus orchards for psyllid nymphs resting at 45-degree angles on young shoots"
    ],
    "expertHelpWarning": "IMPORTANT: Report suspected Citrus Greening immediately to your State Horticulture Department or Central Citrus Research Institute (ICAR-CCRI).",
    "organicRemedies": [
      "Spray Imidacloprid 17.8 SL (0.5 ml/L) or Thiamethoxam (0.3 g/L) to eliminate psyllid vectors during new flush",
      "Apply horticultural mineral oil 1-2% as organic barrier against psyllid feeding",
      "Rogue and burn confirmed declining trees to eliminate field inoculum reservoir"
    ]
  },
  "Orange___healthy": {
    "className": "Orange___healthy",
    "crop": "Orange",
    "disease": "Healthy",
    "scientificName": "Citrus sinensis (L.) Osbeck",
    "isHealthy": true,
    "simpleDescription": "Healthy orange citrus foliage characterized by glossy, dark green leaves with winged petioles, uniform chlorophyll density, and absence of bacterial canker, HLB mottling, or greasy spot.",
    "visibleSymptoms": [
      "Glossy dark green leaves with prominent central midrib and winged petiole",
      "Smooth, intact leaf margins free of yellow mottling or chlorotic vein clearing",
      "Robust tree canopy vigor with uniform seasonal flushing"
    ],
    "generalPrevention": [
      "Apply balanced NPK fertigation with zinc and iron foliar sprays during spring and monsoon flushes",
      "Monitor orchards with yellow sticky cards to detect Asian citrus psyllid vectors early",
      "Maintain drip irrigation around dripline and avoid water stagnation near root crown"
    ],
    "recommendedNextSteps": [
      "Continue standard citrus orchard management and soil moisture monitoring",
      "Apply prophylactic neem oil spray (3 ml/L) during tender flush emergence",
      "Keep records of fruit set and canopy flush cycles"
    ],
    "expertHelpWarning": "No disease detected. Maintain optimal soil drainage and scout orchards periodically for psyllid activity.",
    "organicRemedies": [
      "Continue standard citrus orchard management and soil moisture monitoring",
      "Apply prophylactic neem oil spray (3 ml/L) during tender flush emergence",
      "Keep records of fruit set and canopy flush cycles"
    ]
  },
  "Peach___Bacterial_spot": {
    "className": "Peach___Bacterial_spot",
    "crop": "Peach",
    "disease": "Bacterial Spot",
    "scientificName": "Xanthomonas arboricola pv. pruni",
    "isHealthy": false,
    "simpleDescription": "A bacterial disease causing water-soaked angular leaf spots that drop out, giving leaves a \"shot-hole\" appearance.",
    "visibleSymptoms": [
      "Small, water-soaked, angular spots on leaves turning purple, brown, and black",
      "The centers of leaf spots drop out, leaving a perforated \"shot-hole\" look",
      "Cracked, pitted fruit with gum exuding from lesions"
    ],
    "generalPrevention": [
      "Plant bacterial spot-resistant peach and nectarine varieties",
      "Avoid high-pressure overhead irrigation that drives bacteria into leaf stomata",
      "Avoid planting orchards in sandy soils with poor water retention without adequate organic matter"
    ],
    "recommendedNextSteps": [
      "Apply preventative copper bactericide sprays at dormant and bud-swell stages",
      "Avoid pruning during wet periods to prevent spreading the bacteria",
      "Maintain balanced tree vigor without excessive nitrogen fertilization"
    ],
    "expertHelpWarning": "Consult your district horticulture specialist if fruit cracking occurs widely across the orchard.",
    "organicRemedies": [
      "Apply Copper Hydroxide (1.5-2.0 g/L) at dormant bud break",
      "Spray Oxytetracycline during bloom and shuck split at 7-10 day intervals",
      "Alternate copper with Captan 50 WP (2.5 g/L) to prevent phytotoxicity"
    ]
  },
  "Peach___healthy": {
    "className": "Peach___healthy",
    "crop": "Peach",
    "disease": "Healthy",
    "isHealthy": true,
    "simpleDescription": "The peach leaf shows normal lanceolate shape, smooth finely-serrated margins, and vibrant green color without shot-holes.",
    "visibleSymptoms": [
      "Long, narrow lanceolate leaf with bright green surface",
      "Intact margins without yellowing, curl, or perforated holes",
      "Clean petiole and healthy axillary buds"
    ],
    "generalPrevention": [
      "Apply dormant copper spray in autumn or late winter to prevent peach leaf curl",
      "Provide adequate water during fruit sizing while keeping foliage dry",
      "Keep orchard floor clear of competing weeds"
    ],
    "recommendedNextSteps": [
      "Maintain standard orchard routine",
      "Monitor for oriental fruit moth or borer activity",
      "Ensure good soil drainage around the tree root flare"
    ],
    "expertHelpWarning": "No disease detected. This result is based on the uploaded image and does not guarantee the entire tree is disease-free.",
    "organicRemedies": [
      "No treatment needed; tree is completely healthy",
      "Apply dormant horticultural spray oil for scale and mite prevention",
      "Log record in AgriVision"
    ]
  },
  "Pepper,_bell___Bacterial_spot": {
    "className": "Pepper,_bell___Bacterial_spot",
    "crop": "Bell Pepper",
    "disease": "Bacterial Spot",
    "scientificName": "Xanthomonas campestris pv. vesicatoria",
    "isHealthy": false,
    "simpleDescription": "A destructive bacterial disease causing small, dark, water-soaked spots with yellow halos on bell pepper leaves and fruit.",
    "visibleSymptoms": [
      "Small, circular to irregular water-soaked spots that turn dark brown or black",
      "Leaves show yellowing around lesions, leading to extensive premature leaf drop",
      "Rough, raised, warty scabs on green bell pepper fruit"
    ],
    "generalPrevention": [
      "Use certified pathogen-free pepper seeds or hot water-treated seeds (50°C for 25 minutes)",
      "Rotate pepper fields with non-solanaceous crops (e.g. cereals, legumes) for at least 2 years",
      "Use drip irrigation instead of sprinkler systems to keep foliage completely dry"
    ],
    "recommendedNextSteps": [
      "Remove and safely destroy severely infected plants in small-scale plots",
      "Apply copper hydroxide mixed with mancozeb as a preventative spray during warm, wet periods",
      "Do not enter pepper fields or handle plants while foliage is wet with rain or dew"
    ],
    "expertHelpWarning": "Contact your local agricultural extension service if leaf drop threatens fruit sunburn across more than 20% of your plot.",
    "organicRemedies": [
      "Spray Copper Hydroxide (2.0 g/L) tank-mixed with Mancozeb (2.0 g/L) every 7-10 days",
      "Apply Streptomycin Sulphate + Tetracycline (Plantomycin 0.5-1.0 g/L) at first symptom onset",
      "Remove and destroy heavily blighted plants immediately"
    ]
  },
  "Pepper,_bell___healthy": {
    "className": "Pepper,_bell___healthy",
    "crop": "Bell Pepper",
    "disease": "Healthy",
    "isHealthy": true,
    "simpleDescription": "Bell pepper leaf exhibits glossy, deep green coloration, firm texture, and clean margins without bacterial spots or viral mosaic.",
    "visibleSymptoms": [
      "Smooth, glossy green leaf surface with no water-soaked lesions",
      "Intact leaf blade with clean veins and healthy petiole",
      "Strong upright plant growth and healthy flower buds"
    ],
    "generalPrevention": [
      "Maintain consistent soil moisture to prevent blossom end rot and leaf stress",
      "Apply organic mulch to stabilize soil temperature and prevent soil splash",
      "Scout for whiteflies, aphids, and thrips which transmit viral diseases"
    ],
    "recommendedNextSteps": [
      "Continue current watering and fertigation program",
      "Stake or support pepper plants as fruit load increases",
      "Maintain weed-free beds around pepper rows"
    ],
    "expertHelpWarning": "No disease detected. This result is based on the uploaded image and does not guarantee the entire plant is disease-free.",
    "organicRemedies": [
      "No fungicide needed; crop is in excellent health",
      "Continue calcium nitrate foliar feeding at 14-day intervals",
      "Log scouting record in AgriVision"
    ]
  },
  "Potato___Early_blight": {
    "className": "Potato___Early_blight",
    "crop": "Potato",
    "disease": "Early Blight",
    "scientificName": "Alternaria solani",
    "isHealthy": false,
    "simpleDescription": "A common fungal leaf spot characterized by dark brown spots featuring distinctive concentric rings (\"target board\" pattern).",
    "visibleSymptoms": [
      "Dark brown to black spots with concentric rings resembling a target board",
      "Yellow chlorotic halos surrounding older spots on lower leaves",
      "Infected leaves turn yellow, dry up, and droop like an umbrella on the stem"
    ],
    "generalPrevention": [
      "Rotate crops with corn, beans, or wheat; avoid planting after tomatoes or eggplants",
      "Plant certified, healthy seed tubers with documented early blight tolerance",
      "Ensure adequate nitrogen and potassium fertility; stressed plants are far more vulnerable"
    ],
    "recommendedNextSteps": [
      "Remove lower infected leaves if disease is spotted early in small plots",
      "Apply registered protective fungicides (mancozeb or chlorothalonil) before row closure",
      "Irrigate early in the morning so potato foliage dries rapidly under sunlight"
    ],
    "expertHelpWarning": "Consult agricultural authorities if target spots spread upward toward the top canopy during tuber bulking.",
    "organicRemedies": [
      "Spray Mancozeb 75 WP (2.0-2.5 g/L) at first symptom appearance",
      "Alternate with Chlorothalonil (2 g/L) every 10-14 days",
      "Apply neem oil (3 ml/L) as organic preventive measure"
    ]
  },
  "Potato___Late_blight": {
    "className": "Potato___Late_blight",
    "crop": "Potato",
    "disease": "Late Blight",
    "scientificName": "Phytophthora infestans",
    "isHealthy": false,
    "simpleDescription": "The infamous water-mold pathogen responsible for the Irish Potato Famine, causing rapid, dark water-soaked rot of potato leaves and tubers.",
    "visibleSymptoms": [
      "Irregular, dark water-soaked lesions that turn purplish-black and enlarge rapidly in cool, humid weather",
      "Delicate white fungal-like fuzz on the underside of leaves around lesion borders during damp mornings",
      "Foul odor in fields and rapid collapse of the entire vine canopy; brown dry rot inside tubers"
    ],
    "generalPrevention": [
      "Plant only certified disease-free seed tubers from trusted government or certified agencies",
      "Destroy all cull potato piles and volunteer potatoes that serve as primary inoculum sources",
      "Hill soil well around potato bases to protect shallow tubers from spore wash"
    ],
    "recommendedNextSteps": [
      "Apply systemic and contact fungicides (such as cymoxanil, metalaxyl, or mancozeb) immediately upon early warning",
      "Stop irrigation immediately during high-humidity, cool periods (15-20°C with high RH)",
      "Kill vines 2 weeks before harvest to prevent tuber contamination at digging"
    ],
    "expertHelpWarning": "EMERGENCY: Late blight spreads explosively across entire villages within days. Report suspected outbreaks immediately to your Kisan Call Center (1800-180-1551) or local Agriculture Officer.",
    "organicRemedies": [
      "Spray Cymoxanil 8% + Mancozeb 64% WP (2.5 g/L) immediately upon warning",
      "Spray Metalaxyl-M + Mancozeb (2.5 g/L) or Dimethomorph (1.5 g/L) during severe pressure",
      "Destroy haulms (vines) immediately if blight reaches 80% to protect underground tubers"
    ]
  },
  "Potato___healthy": {
    "className": "Potato___healthy",
    "crop": "Potato",
    "disease": "Healthy",
    "isHealthy": true,
    "simpleDescription": "The potato foliage shows rich, uniform green coloration, strong leaf turgor, and no signs of early target spots or late water-soaked blight.",
    "visibleSymptoms": [
      "Compound green leaves with clean leaflets and sharp margins",
      "No concentric target rings, water-soaked brown patches, or white fuzz",
      "Vigorous stem and lush vegetative growth"
    ],
    "generalPrevention": [
      "Proper hilling to ensure developing tubers are buried 5-8 cm deep",
      "Maintain regular drip or furrow irrigation to keep soil moisture uniform",
      "Monitor local weather alerts for late blight forecasts (cool, foggy, rainy periods)"
    ],
    "recommendedNextSteps": [
      "Continue standard crop maintenance and scheduled hilling",
      "Scout field corners and low-lying damp areas twice weekly",
      "Store harvest in cool, dark, well-ventilated godowns"
    ],
    "expertHelpWarning": "No disease detected. This result is based on the uploaded image and does not guarantee the entire field is disease-free.",
    "organicRemedies": [
      "No treatment needed; plant is completely healthy",
      "Maintain regular soil moisture",
      "Log scouting record in AgriVision"
    ]
  },
  "Raspberry___healthy": {
    "className": "Raspberry___healthy",
    "crop": "Raspberry",
    "disease": "Healthy",
    "isHealthy": true,
    "simpleDescription": "Raspberry cane foliage is healthy, showing vibrant serrated leaflets with pale undersides and no signs of rust or spur blight.",
    "visibleSymptoms": [
      "Clean trifoliate or pentafoliate leaves with vivid green upper surfaces",
      "No purple-bordered spur blight lesions or powdery mildew",
      "Sturdy canes with healthy floricane and primocane growth"
    ],
    "generalPrevention": [
      "Trellis canes upright to improve air circulation and facilitate picking",
      "Prune out old fruited canes at ground level immediately after harvest",
      "Maintain organic mulch layer around the root zone"
    ],
    "recommendedNextSteps": [
      "Maintain drip irrigation and bird netting where necessary",
      "Monitor for spider mites or cane borers",
      "Maintain soil organic matter"
    ],
    "expertHelpWarning": "No disease detected. Keep canes pruned for good airflow.",
    "organicRemedies": [
      "No treatment needed; raspberry planting is completely healthy",
      "Maintain drip irrigation during berry filling stages",
      "Log record in AgriVision"
    ]
  },
  "Raspberry___Cane_blight": {
    "className": "Raspberry___Cane_blight",
    "crop": "Raspberry",
    "disease": "Cane Blight",
    "scientificName": "Leptosphaeria coniothyrium (Paraconiothyrium cordaenum)",
    "isHealthy": false,
    "simpleDescription": "A fungal disease entering pruning snags and wound cracks, causing dark cankers that girdle fruiting floricanes and cause terminal wilting.",
    "visibleSymptoms": [
      "Dark brown or purplish sunken cankers developing around pruning cuts or harvest wounds",
      "Cankers expand and girdle the cane, turning wood brittle and grayish with tiny black pimples (pycnidia)",
      "Side branches and berries wilt, turn brown, and dry up before harvest"
    ],
    "generalPrevention": [
      "Prune canes only during dry sunny weather allowing pruning wounds to heal within 24 hours",
      "Remove and burn all old spent floricanes immediately after fruit harvest",
      "Avoid mechanical damage from weeders or pruning shears near cane bases"
    ],
    "recommendedNextSteps": [
      "Cut diseased canes several inches below cankers and destroy off-site",
      "Apply protective foliar bio-fungicide (Copper Oxychloride 3 g/L or Bordeaux mixture 1%) post-harvest and pre-bloom",
      "Maintain adequate cane spacing (15-20 cm) along trellises for rapid drying"
    ],
    "expertHelpWarning": "Cane blight weakens fruiting wood severely. If over 25% of canes snap or dry up, consult a berry pathologist.",
    "organicRemedies": [
      "Spray Copper Oxychloride (3 g/L) or Bordeaux Mixture (1%) post-harvest and pre-bloom",
      "Cut infected canes 4 inches below cankers and destroy"
    ]
  },
  "Raspberry___Yellow_rust": {
    "className": "Raspberry___Yellow_rust",
    "crop": "Raspberry",
    "disease": "Late Leaf Rust (Yellow Rust)",
    "scientificName": "Pucciniastrum americanum / Phragmidium rubi-idaei",
    "isHealthy": false,
    "simpleDescription": "An airborne fungal rust producing vibrant yellow or golden-orange powdery pustules on the undersides of raspberry leaves and fruit drupelets.",
    "visibleSymptoms": [
      "Small lemon-yellow to golden-orange powdery pustules (uredinia) on leaf undersides",
      "Corresponding light yellow chlorotic flecks on upper leaf surfaces",
      "Premature defoliation, stunted cane vigor, and yellow pustules contaminating ripe berries"
    ],
    "generalPrevention": [
      "Prune and destroy wild Rubus species (wild brambles) near the orchard perimeter",
      "Choose rust-resistant cultivars and maintain well-ventilated trellis rows",
      "Avoid overhead irrigation that creates prolonged moisture on cane foliage"
    ],
    "recommendedNextSteps": [
      "Rake and compost fallen autumn leaves to eliminate overwintering teliospores",
      "Spray wettable sulfur (3 g/L) or Propiconazole 25 EC (1 ml/L) at first symptom onset",
      "Apply bio-fungicide Bacillus subtilis or Trichoderma spray during overcast weather"
    ],
    "expertHelpWarning": "Yellow rust pustules on developing fruit can make the entire harvest unmarketable. Spray before fruit coloration.",
    "organicRemedies": [
      "Wettable Sulfur (3 g/L) or Propiconazole 25 EC (1 ml/L) at first symptom appearance",
      "Bio-fungicide: Bacillus subtilis or Trichoderma (5 g/L) foliar spray"
    ]
  },
  "Soybean___healthy": {
    "className": "Soybean___healthy",
    "crop": "Soybean",
    "disease": "Healthy",
    "isHealthy": true,
    "simpleDescription": "Soybean trifoliate leaf displays healthy deep-green color, fine pubescence (leaf hairs), and no rust pustules or bacterial blights.",
    "visibleSymptoms": [
      "Uniform green trifoliate leaflets with intact edges",
      "Absence of yellow mosaic mottling, brown rust pustules, or target spots",
      "Healthy nodulation on root system supporting nitrogen assimilation"
    ],
    "generalPrevention": [
      "Treat seed with rhizobium culture and fungicide before sowing",
      "Ensure field drainage during monsoon to prevent waterlogging and root rot",
      "Rotate crops annually with maize, sorghum, or wheat"
    ],
    "recommendedNextSteps": [
      "Continue regular crop scouting during flowering and pod development stages",
      "Scout for semilooper caterpillars, tobacco caterpillars, and stem flies",
      "Ensure fields remain weed-free during the critical first 30 days"
    ],
    "expertHelpWarning": "No disease detected. This result is based on the uploaded image and does not guarantee the entire crop is disease-free.",
    "organicRemedies": [
      "No fungicide needed; soybean crop is completely healthy",
      "Monitor for stem fly and semilooper larvae at flowering stage",
      "Log record in AgriVision"
    ]
  },
  "Soybean___Rust": {
    "className": "Soybean___Rust",
    "crop": "Soybean",
    "disease": "Asian Soybean Rust",
    "scientificName": "Phakopsora pachyrhizi",
    "isHealthy": false,
    "simpleDescription": "One of the worlds most aggressive airborne fungal diseases, forming dense tan-brown raised pustules on leaf undersides, causing catastrophic defoliation and up to 80% yield loss.",
    "visibleSymptoms": [
      "Pinhead-sized polygonal tan to reddish-brown raised pustules on the lower leaf surface",
      "Rapid yellowing (chlorosis) beginning on lower canopy and moving upward",
      "Premature leaf drop causing bare stems, small pods, and severely shriveled seeds"
    ],
    "generalPrevention": [
      "Sow early in Kharif season with recommended rust-tolerant varieties (e.g. JS 335, DSb 21, MACS 1407)",
      "Maintain recommended 30 cm x 10 cm row-to-plant spacing for sunlight penetration",
      "Avoid high nitrogen top-dressing that creates overly dense, humid crop canopies"
    ],
    "recommendedNextSteps": [
      "Foliar spray at first rust detection: Hexaconazole 5% EC @ 1 ml/L or Tebuconazole 25.9% EC @ 1 ml/L",
      "Alternative systemic triazole: Propiconazole 25% EC @ 1 ml/L mixed with adhesive sticker",
      "Organic bio-spray: Foliar Trichoderma harzianum (5 g/L) or 5% Neem Seed Kernel Extract (NSKE)"
    ],
    "expertHelpWarning": "Urgent: Asian rust can defoliate entire soybean acreages within 10-14 days. Notify your district agriculture officer or KVK immediately.",
    "organicRemedies": [
      "Foliar spray at first rust pustule appearance: Hexaconazole 5 EC (1 ml/L) or Tebuconazole 25.9 EC (1 ml/L)",
      "Alternative systemic triazole: Propiconazole 25 EC (1 ml/L) mixed with spreader-sticker",
      "Organic Bio-Spray: Trichoderma harzianum (5 g/L) or Neem oil (NSKE 5%)"
    ]
  },
  "Soybean___Cercospora_leaf_spot": {
    "className": "Soybean___Cercospora_leaf_spot",
    "crop": "Soybean",
    "disease": "Cercospora Leaf Spot & Purple Seed Stain",
    "scientificName": "Cercospora kikuchii / sojina",
    "isHealthy": false,
    "simpleDescription": "A widespread fungal disease causing angular reddish-purple lesions on leaves, leathery blight, and diagnostic purple discoloration of harvested seeds.",
    "visibleSymptoms": [
      "Upper leaves develop angular reddish-purple to dark bronze discoloration on upper surfaces",
      "Leaves become thickened, leathery, and develop a rough, crinkled texture before dropping",
      "Harvested soybean seeds exhibit distinct pink to dark purple blotches covering seed coats"
    ],
    "generalPrevention": [
      "Plant certified purple-seed-stain-free seed with >85% germination rate",
      "Perform seed treatment with Thiram + Carbendazim (2 g/kg seed) before sowing",
      "Practice deep summer plowing to bury infested crop residue and rotate with non-host cereals"
    ],
    "recommendedNextSteps": [
      "Foliar spray during early pod formation (R3 stage) with Carbendazim 12% + Mancozeb 63% WP (2 g/L)",
      "Apply Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1 ml/L for comprehensive pod protection",
      "Spray bio-fungicide Pseudomonas fluorescens @ 5 g/L during vegetative growth"
    ],
    "expertHelpWarning": "Cercospora purple stain lowers commercial grain grading drastically in regional APMC mandis. Spray at pod formation if lesions are visible.",
    "organicRemedies": [
      "Foliar spray at pod development: Azoxystrobin + Difenoconazole (1 ml/L) or Carbendazim + Mancozeb (2 g/L)",
      "Organic: Pseudomonas fluorescens (5 g/L) foliar spray"
    ]
  },
  "Squash___Powdery_mildew": {
    "className": "Squash___Powdery_mildew",
    "crop": "Squash",
    "disease": "Powdery Mildew",
    "scientificName": "Podosphaera xanthii / Erysiphe cichoracearum",
    "isHealthy": false,
    "simpleDescription": "A very common fungal disease producing distinctive white powdery spots on the broad leaves of squash and pumpkin vines.",
    "visibleSymptoms": [
      "White powdery spots appearing on both upper and lower leaf surfaces and stems",
      "Spots expand to cover entire leaves with a white talcum powder-like fungal mat",
      "Infected leaves turn yellow, then brown, brittle, and dry up prematurely"
    ],
    "generalPrevention": [
      "Plant powdery mildew-resistant cucurbit varieties",
      "Space squash hills generously (1.5 to 2 meters) to enable plenty of airflow and sunshine",
      "Irrigate at the base of the plant using drip or furrow methods; keep foliage dry"
    ],
    "recommendedNextSteps": [
      "Remove first infected older leaves showing white spots in small garden plots",
      "Apply neem oil (0.5%), potassium bicarbonate, or sulfur sprays at the first sign of mildew",
      "Avoid high-nitrogen fertilizers which stimulate lush, mildew-susceptible foliage"
    ],
    "expertHelpWarning": "Seek expert guidance if powdery mildew blankets more than 50% of canopy during peak flowering or fruit sizing.",
    "organicRemedies": [
      "Spray Wettable Sulfur (2.0 g/L) or Dinocap (1 ml/L) at first notice of white spots",
      "Apply Azoxystrobin (1 ml/L) or Tebuconazole (1 ml/L) during heavy spread",
      "Spray neem oil (5 ml/L) or potassium bicarbonate (3 g/L) as organic remedies"
    ]
  },
  "Squash___healthy": {
    "className": "Squash___healthy",
    "crop": "Squash",
    "disease": "Healthy",
    "scientificName": "Cucurbita pepo L.",
    "isHealthy": true,
    "simpleDescription": "Healthy squash vine foliage characterized by broad, serrated green leaves with natural silvery vein patterning, robust petioles with prickles, and free of powdery mildew or mosaic mottling.",
    "visibleSymptoms": [
      "Broad, vigorous dark green leaves with natural mottled venation",
      "Sturdy erect leaf stalks and vibrant yellow blossom buds",
      "Absence of white powdery fungal talc or necrotic leaf margins"
    ],
    "generalPrevention": [
      "Space vine plants at least 90 cm apart to ensure excellent air circulation across dense canopies",
      "Use drip irrigation beneath plastic or organic mulch to prevent splashing soil pathogens onto leaves",
      "Maintain regular scouting for early cucumber beetles or powdery mildew on lower leaves"
    ],
    "recommendedNextSteps": [
      "Continue regular drip fertigation and maintain clean raised bed weed control",
      "Apply prophylactic sour buttermilk or neem oil spray (3 ml/L) during warm humid periods",
      "Support fruit development with balanced potassium and organic compost amendments"
    ],
    "expertHelpWarning": "No disease detected. Maintain raised bed drainage and check weekly for powdery mildew spores on older shaded leaves.",
    "organicRemedies": [
      "Continue regular drip fertigation and maintain raised bed weed control",
      "Apply prophylactic sour buttermilk or neem oil spray (3 ml/L)",
      "Support fruit development with balanced potassium amendments"
    ]
  },
  "Strawberry___Leaf_scorch": {
    "className": "Strawberry___Leaf_scorch",
    "crop": "Strawberry",
    "disease": "Leaf Scorch",
    "scientificName": "Diplocarpon earlianum",
    "isHealthy": false,
    "simpleDescription": "A common fungal leaf disease of strawberries causing numerous small, purplish spots that coalesce, giving leaves a scorched, burnt look.",
    "visibleSymptoms": [
      "Numerous small, irregular purplish or dark brown spots on the upper leaf surface",
      "Spots enlarge and merge, causing entire leaf margins to turn reddish-purple and scorch brown",
      "Leaves dry up, curl upward, and look as if burned by fire"
    ],
    "generalPrevention": [
      "Plant certified pathogen-free strawberry runners on raised beds with drip irrigation",
      "Use plastic or clean straw mulch to keep leaves and fruit off wet soil",
      "Renovate strawberry beds after harvest by mowing and raking old foliage"
    ],
    "recommendedNextSteps": [
      "Pick and remove infected leaves during routine weeding",
      "Apply registered copper or protective fungicides after harvest or during early spring",
      "Avoid overhead watering that wets the crown of the strawberry plant"
    ],
    "expertHelpWarning": "Consult an extension horticulturist if scorch affects newly planted runners.",
    "organicRemedies": [
      "Spray Captan 50 WP (2.5 g/L) or Mancozeb (2.5 g/L) at crown emergence",
      "Apply Azoxystrobin (1 ml/L) or Pyraclostrobin during severe disease outbreaks",
      "Ensure sprays hit crown center and lower leaf surfaces"
    ]
  },
  "Strawberry___healthy": {
    "className": "Strawberry___healthy",
    "crop": "Strawberry",
    "disease": "Healthy",
    "isHealthy": true,
    "simpleDescription": "The strawberry leaf displays vivid deep-green trifoliate leaflets, healthy serrations, and clean petioles with no scorch or fungal leaf spots.",
    "visibleSymptoms": [
      "Glossy green trifoliate leaflets with clear, distinct veins",
      "No purple scorch spots, gray mold, or powdery mildew patches",
      "Vigorous crown development with healthy runners and floral clusters"
    ],
    "generalPrevention": [
      "Maintain drip irrigation under plastic mulch for clean berry development",
      "Ensure soil electrical conductivity (EC) is low, as strawberries are salt-sensitive",
      "Inspect crowns regularly for red stele or crown rot"
    ],
    "recommendedNextSteps": [
      "Continue regular fertigation and bed maintenance",
      "Protect ripe fruit from touching bare damp soil",
      "Scout for two-spotted spider mites and aphids"
    ],
    "expertHelpWarning": "No disease detected. This result is based on the uploaded image and does not guarantee the entire planting bed is disease-free.",
    "organicRemedies": [
      "No fungicide needed; strawberry crop is completely healthy",
      "Harvest ripe berries every 2 days to prevent overripe berry rotting",
      "Log scouting record in AgriVision"
    ]
  },
  "Tomato___Bacterial_spot": {
    "className": "Tomato___Bacterial_spot",
    "crop": "Tomato",
    "disease": "Bacterial Spot",
    "scientificName": "Xanthomonas perforans / Xanthomonas vesicatoria",
    "isHealthy": false,
    "simpleDescription": "A destructive bacterial disease that causes small, dark, water-soaked spots with yellow margins on tomato leaves, stems, and fruit.",
    "visibleSymptoms": [
      "Small (less than 3mm), dark brown, greasy, water-soaked spots on leaves",
      "Spots are often bordered by a distinct yellow ring (halo) and may drop out",
      "Rough, raised, black blister-like scabs on green tomato fruit"
    ],
    "generalPrevention": [
      "Use certified pathogen-free seed or hot water-treated seed",
      "Practice at least a 2-year crop rotation without tomatoes, peppers, or eggplants",
      "Never work in tomato fields when leaves are wet from dew or rain"
    ],
    "recommendedNextSteps": [
      "Prune and destroy infected lower leaves if disease is caught early",
      "Spray copper hydroxide mixed with mancozeb as a preventative barrier during warm, stormy periods",
      "Use drip irrigation instead of overhead sprinklers to prevent bacterial splash"
    ],
    "expertHelpWarning": "Contact your local Krishi Vigyan Kendra (KVK) if bacterial spots rapidly spread through young seedlings or nursery beds.",
    "organicRemedies": [
      "Spray Copper Hydroxide (2.0 g/L) mixed with Mancozeb (2.0 g/L) for protective barrier",
      "In severe outbreaks, spray Streptocycline (1 g in 10 L water) along with Copper Oxychloride",
      "Prune and destroy severely infected bottom leaves in dry weather"
    ]
  },
  "Tomato___Early_blight": {
    "className": "Tomato___Early_blight",
    "crop": "Tomato",
    "disease": "Early Blight",
    "scientificName": "Alternaria solani",
    "isHealthy": false,
    "simpleDescription": "A very common fungal disease causing dark brown spots with characteristic concentric rings (\"bullseye\" or target pattern) starting on lower leaves.",
    "visibleSymptoms": [
      "Circular dark brown spots with concentric target-board rings on older, lower leaves",
      "Yellow chlorotic halos surrounding spots; infected leaves turn brown, wither, and drop",
      "Dark, leathery, sunken cankers at the stem base and on fruit near the stem end"
    ],
    "generalPrevention": [
      "Mulch heavily around the base of tomato plants to prevent fungal spores from splashing up from soil",
      "Stake or cage tomato plants to elevate foliage off the ground and enhance air circulation",
      "Rotate crops for 2-3 years away from solanaceous species (potatoes, peppers, eggplants)"
    ],
    "recommendedNextSteps": [
      "Prune off the bottom 12 inches of foliage to keep leaves away from damp soil",
      "Apply preventative copper, mancozeb, or chlorothalonil fungicides every 7-10 days in wet conditions",
      "Water plants at soil level in the morning so sun can dry any accidental splashes"
    ],
    "expertHelpWarning": "Consult an agricultural extension specialist if early blight spreads to more than one-third of the canopy before fruit set.",
    "organicRemedies": [
      "Spray 1500 ppm Neem oil (3ml/L water) as organic barrier",
      "Apply Trichoderma viride bio-fungicide to soil and foliage",
      "Use Copper Oxychloride (COC 2.5g/L) or Mancozeb 75 WP (2g/L) if disease spreads"
    ]
  },
  "Tomato___Late_blight": {
    "className": "Tomato___Late_blight",
    "crop": "Tomato",
    "disease": "Late Blight",
    "scientificName": "Phytophthora infestans",
    "isHealthy": false,
    "simpleDescription": "An aggressive, highly destructive water-mold disease that causes large dark brown, water-soaked lesions and rapid rotting of foliage and fruit.",
    "visibleSymptoms": [
      "Large, irregular, greasy water-soaked brown-to-black patches that spread rapidly across leaves",
      "White cottony fungal fuzz visible on the undersides of leaves around lesions in damp, cool mornings",
      "Large, firm, greasy golden-brown to dark lesions on green fruit that turn soft and rot"
    ],
    "generalPrevention": [
      "Destroy any volunteer tomato or potato plants in and around the field",
      "Space plants generously and prune suckers to encourage rapid drying of foliage",
      "Plant resistant tomato varieties (e.g. varieties with Ph-2 or Ph-3 genes)"
    ],
    "recommendedNextSteps": [
      "Immediately remove and bag severely infected plants; do NOT compost them",
      "Apply targeted systemic and protective fungicides (e.g., cymoxanil, metalaxyl-M, or dimethomorph)",
      "Stop sprinkler irrigation immediately during periods of high humidity and cool nights (15-20°C)"
    ],
    "expertHelpWarning": "URGENT: Late blight can destroy an entire tomato field in 3-5 days and spread across neighboring farms. Report immediately to your local agriculture officer or Kisan Call Center.",
    "organicRemedies": [
      "Spray Cymoxanil 8% + Mancozeb 64% WP (2.5 g/L) immediately on early warning",
      "Alternate with Metalaxyl-M + Mancozeb (2.5 g/L) during persistent cool, wet conditions",
      "Immediately rogue and bag severely blighted plants; do NOT compost them"
    ]
  },
  "Tomato___Leaf_Mold": {
    "className": "Tomato___Leaf_Mold",
    "crop": "Tomato",
    "disease": "Leaf Mold",
    "scientificName": "Passalora fulva / Cladosporium fulvum",
    "isHealthy": false,
    "simpleDescription": "A fungal disease common in high-humidity polyhouses and greenhouses, producing pale green-yellow spots on upper leaves and olive-brown mold beneath.",
    "visibleSymptoms": [
      "Pale green to yellowish spots with indefinite margins on the upper leaf surface",
      "Plush, velvety olive-green to brown fungal mold on the underside of leaves directly beneath the spots",
      "Leaves curl, turn completely yellow, wither, and drop prematurely"
    ],
    "generalPrevention": [
      "Increase greenhouse/polyhouse ventilation using exhaust fans and roof vents",
      "Keep relative humidity below 85% inside sheltered farming structures",
      "Space plants adequately and maintain drip irrigation"
    ],
    "recommendedNextSteps": [
      "Prune lower affected leaves to increase air movement through the plant rows",
      "Apply registered bio-fungicides (Bacillus subtilis) or copper sprays",
      "Sanitize greenhouse framing and trellising twine between crop cycles"
    ],
    "expertHelpWarning": "Consult polyhouse experts if leaf mold persists despite ventilation improvements.",
    "organicRemedies": [
      "Apply bio-fungicide Bacillus subtilis or Trichoderma viride foliar spray (5g/L)",
      "Spray Copper Oxychloride 50 WP (2.5 g/L) or Azoxystrobin (1 ml/L) if mold spreads",
      "Sanitize polyhouse trellising ropes and metal structure between crop seasons"
    ]
  },
  "Tomato___Septoria_leaf_spot": {
    "className": "Tomato___Septoria_leaf_spot",
    "crop": "Tomato",
    "disease": "Septoria Leaf Spot",
    "scientificName": "Septoria lycopersici",
    "isHealthy": false,
    "simpleDescription": "A severe fungal leaf disease causing numerous small, circular spots with dark brown margins and gray or tan centers speckled with black dots.",
    "visibleSymptoms": [
      "Dozens of small (2-3 mm) circular spots with dark brown margins and light gray/tan centers",
      "Tiny black specks (fungal fruiting bodies) visible inside the center of mature spots with a hand lens",
      "Lower leaves turn yellow, wither, and fall off, exposing developing fruit to sunscald"
    ],
    "generalPrevention": [
      "Apply organic mulch (straw or plastic) around plants to stop soil-borne fungal spores from splashing upward",
      "Rotate crops for at least 2 years without solanaceous crops",
      "Control solanaceous weeds (such as black nightshade or horse nettle) near the field"
    ],
    "recommendedNextSteps": [
      "Remove lower infected leaves showing spots as soon as they appear",
      "Apply protective fungicides (copper, chlorothalonil, or mancozeb) every 7-14 days in rainy weather",
      "Water strictly at the soil base and avoid overhead irrigation"
    ],
    "expertHelpWarning": "Seek expert assistance if defoliation reaches mid-canopy during early fruit development.",
    "organicRemedies": [
      "Remove lower infected foliage as soon as spots are noticed",
      "Spray Chlorothalonil 75 WP (2 g/L) or Mancozeb (2.5 g/L) every 7-10 days in rainy weather",
      "Avoid overhead sprinkler watering; irrigate strictly at the root zone"
    ]
  },
  "Tomato___Spider_mites Two-spotted_spider_mite": {
    "className": "Tomato___Spider_mites Two-spotted_spider_mite",
    "crop": "Tomato",
    "disease": "Spider Mites (Two-Spotted)",
    "scientificName": "Tetranychus urticae",
    "isHealthy": false,
    "simpleDescription": "Microscopic sap-sucking pests that cause fine yellow stippling (tiny dots), bronzing, and fine silky webbing on tomato leaves in hot, dry weather.",
    "visibleSymptoms": [
      "Fine yellow or white stippling (speckling) across the upper leaf surface",
      "Delicate silky webbing covering the underside of leaves, stems, and flower buds",
      "Leaves turn bronzed or dirty-yellow, dry up, and drop prematurely in hot weather"
    ],
    "generalPrevention": [
      "Avoid drought stress; keep tomato plants consistently irrigated",
      "Wash dust off farm perimeter roads, as dust promotes heavy spider mite outbreaks",
      "Encourage natural predatory mites and ladybird beetles; avoid broad-spectrum pyrethroid insecticides"
    ],
    "recommendedNextSteps": [
      "Spray leaf undersides with a strong stream of clean water to knock down mite populations",
      "Apply organic insecticidal soap, neem oil (1-2%), or horticultural mineral oil thoroughly under leaves",
      "In heavy infestations, apply specific registered miticides (e.g., abamectin or spiromesifen) as recommended by experts"
    ],
    "expertHelpWarning": "Consult an entomologist if webbing covers entire growing tips and flower clusters.",
    "organicRemedies": [
      "Spray strong stream of clean water under leaves to knock down mite colonies",
      "Apply 1500 ppm Neem oil (3-5 ml/L) or potassium salt insecticidal soap thoroughly under leaves",
      "In heavy infestations, apply Spiromesifen 22.9 SC (1 ml/L) or Abamectin 1.9 EC (0.7 ml/L)"
    ]
  },
  "Tomato___Target_Spot": {
    "className": "Tomato___Target_Spot",
    "crop": "Tomato",
    "disease": "Target Spot",
    "scientificName": "Corynespora cassiicola",
    "isHealthy": false,
    "simpleDescription": "A fungal disease producing brown, circular lesions that resemble targets on leaves, stems, and tomato fruit in warm, humid regions.",
    "visibleSymptoms": [
      "Small brown water-soaked spots that expand into circular lesions with light brown centers and dark concentric rings",
      "Unlike early blight, target spots are smaller, more numerous, and lack a pronounced yellow halo",
      "Deep, pitted circular lesions on ripe and green tomato fruit"
    ],
    "generalPrevention": [
      "Ensure wide plant spacing (at least 60 cm apart in rows) for maximum air drying",
      "Prune suckers and lower leaves to reduce canopy density",
      "Avoid overhead irrigation; use drip lines"
    ],
    "recommendedNextSteps": [
      "Prune and destroy infected leaves from lower stems",
      "Apply preventative fungicides (strobilurins or copper formulations) at early blossom",
      "Rotate crops with non-susceptible hosts (corn, sorghum)"
    ],
    "expertHelpWarning": "Consult local agricultural extension if fruit spotting develops in commercial production.",
    "organicRemedies": [
      "Apply protective fungicides (Azoxystrobin or Difenoconazole 1ml/L) at early flower set",
      "Spray Copper Hydroxide (2.5 g/L) mixed with Mancozeb (2 g/L)",
      "Prune and safely discard all infected leaves during dry weather"
    ]
  },
  "Tomato___Tomato_Yellow_Leaf_Curl_Virus": {
    "className": "Tomato___Tomato_Yellow_Leaf_Curl_Virus",
    "crop": "Tomato",
    "disease": "Yellow Leaf Curl Virus",
    "scientificName": "Tomato yellow leaf curl virus (TYLCV, vectored by Whitefly Bemisia tabaci)",
    "isHealthy": false,
    "simpleDescription": "A devastating viral disease spread by whiteflies, causing dramatic stunting, upward leaf curling, and yellow leaf margins.",
    "visibleSymptoms": [
      "Leaves cup or curl upward into bowl-like shapes with bright yellow margins",
      "Drastic plant stunting with shortened internodes, creating a bushy, dwarfed appearance",
      "Severe flower abortion; plants produce almost no marketable tomatoes if infected early"
    ],
    "generalPrevention": [
      "Plant TYLCV-resistant or tolerant hybrid tomato varieties (e.g. varieties with Ty genes)",
      "Erect yellow sticky traps (10-15 per acre) to monitor and catch whiteflies",
      "Cover seedlings with 40-50 mesh insect netting in nursery beds to prevent whitefly contact"
    ],
    "recommendedNextSteps": [
      "Immediately pull out and bag infected plants to prevent whiteflies from acquiring virus and spreading it to healthy plants",
      "Control whitefly vectors using neem oil, imidacloprid, or recommended systemic insecticides under expert guidance",
      "Keep field perimeter free of alternative weed hosts"
    ],
    "expertHelpWarning": "Contact your district horticulture officer immediately if multiple plants show yellow leaf curling early in the season.",
    "organicRemedies": [
      "Immediately rogue and bag diseased plants to prevent whiteflies spreading virus to healthy plants",
      "Spray Neem oil 1500 ppm (3-5 ml/L) or systemic insecticide Imidacloprid 17.8 SL (0.5 ml/L) for vector control",
      "Keep fields strictly free of weed hosts around borders"
    ]
  },
  "Tomato___Tomato_mosaic_virus": {
    "className": "Tomato___Tomato_mosaic_virus",
    "crop": "Tomato",
    "disease": "Mosaic Virus",
    "scientificName": "Tomato mosaic virus (ToMV)",
    "isHealthy": false,
    "simpleDescription": "A persistent virus transmitted by contact, hands, and tools, causing mottled light-and-dark green mosaic patterns and distorted leaves.",
    "visibleSymptoms": [
      "Mottling of leaves with alternating light-green and dark-green patches (mosaic pattern)",
      "Leaves may become distorted, blistered, crinkled, or narrow (\"shoestring\" or \"fern-leaf\" look)",
      "Stunted growth, delayed maturity, and internal brown rings inside fruit"
    ],
    "generalPrevention": [
      "Wash hands thoroughly with soap and water (or 20% nonfat dry milk solution) before handling tomato plants",
      "Do NOT use tobacco products (cigarettes, bidi) near tomato crops, as tobacco can carry mosaic virus",
      "Disinfect pruning knives, stakes, and greenhouse tools in 10% bleach solution"
    ],
    "recommendedNextSteps": [
      "Rogue (pull out) and destroy infected plants immediately; do NOT compost them",
      "Plant mosaic virus-resistant seed cultivars (marked with \"Tm\" or \"ToMV\" resistance)",
      "Avoid brushing against healthy plants after touching suspect foliage"
    ],
    "expertHelpWarning": "Consult agricultural authorities if mosaic patterns appear across nursery seedlings.",
    "organicRemedies": [
      "Rogue and burn infected plants immediately; never leave them in the field or compost",
      "Plant certified mosaic-resistant seed cultivars (marked with \"ToMV\" or \"Tm\" resistance)",
      "Dip hands in skimmed milk solution while pruning to deactivate viral particles on contact"
    ]
  },
  "Tomato___healthy": {
    "className": "Tomato___healthy",
    "crop": "Tomato",
    "disease": "Healthy",
    "isHealthy": true,
    "simpleDescription": "The tomato leaf shows vibrant, uniform green coloration, strong compound leaflets, and no fungal spots, viral mosaic, or insect damage.",
    "visibleSymptoms": [
      "Uniform deep-green compound foliage with well-defined serrated margins",
      "No dark target spots, water-soaked rot, yellow curling, or white mold",
      "Sturdy petiole, healthy stem, and vigorous blossom clusters"
    ],
    "generalPrevention": [
      "Maintain balanced fertigation with calcium to prevent blossom end rot",
      "Stake or trellis vines to keep foliage clean and off wet soil",
      "Prune lower suckers to maintain canopy airflow and light interception"
    ],
    "recommendedNextSteps": [
      "Continue current good agricultural practices and scouting schedule",
      "Inspect leaf undersides weekly for early signs of whiteflies or mites",
      "Maintain even moisture with drip irrigation"
    ],
    "expertHelpWarning": "No disease detected. This result is based on the uploaded image and does not guarantee that the entire tomato plant or field is disease-free.",
    "organicRemedies": [
      "No treatment necessary; plant is in prime physiological health",
      "Maintain regular drip irrigation schedule based on soil moisture",
      "Record scouting observation in AgriVision log for seasonal monitoring"
    ]
  },
  "Rice___Bacterial_leaf_blight": {
    "className": "Rice___Bacterial_leaf_blight",
    "crop": "Rice (Paddy)",
    "disease": "Bacterial Leaf Blight",
    "scientificName": "Xanthomonas oryzae pv. oryzae",
    "pathogenType": "Bacterial",
    "isHealthy": false,
    "simpleDescription": "A devastating bacterial disease of rice causing water-soaked to yellowish-white wavy stripes along leaf margins leading to leaf wilting (\"kresek\").",
    "visibleSymptoms": [
      "Water-soaked to yellowish-green wavy lesions starting at leaf tips and margins",
      "Lesions turn straw-yellow or white with wavy margins as they expand down the leaf blade",
      "Milky bacterial ooze droplets visible on leaf surfaces in early morning dew",
      "Severe seedling wilting known as \"kresek\" phase"
    ],
    "generalPrevention": [
      "Use certified disease-free seeds and plant resistant cultivars (e.g., Improved Samba Mahsuri, Swarna Sub1)",
      "Avoid excessive split doses of nitrogenous fertilizers which increase crop succulence",
      "Ensure proper field drainage and avoid stagnant floodwater in nurseries"
    ],
    "recommendedNextSteps": [
      "Drain stagnant water from the field for 3-4 days to arrest bacterial multiplication",
      "Apply Copper Oxychloride 50% WP @ 2.5 g/L plus Streptocycline @ 0.1 g/L as foliar spray upon initial symptom onset",
      "Spray cow dung slurry supernatant (20%) or neem cake aqueous extract as an organic bactericide"
    ],
    "expertHelpWarning": "Consult your district agricultural officer immediately if bacterial blight strikes during the tillering or panicle initiation stage.",
    "organicRemedies": [
      "Drain standing field water for 48-72 hours to break high-moisture canopy microclimate",
      "Apply Copper Oxychloride 50 WP (2.5 g/L) + Streptocycline (100 mg/L) foliar spray",
      "Apply Plantomycin or validamycin foliar sprays on early symptom manifestation"
    ]
  },
  "Rice___Brown_spot": {
    "className": "Rice___Brown_spot",
    "crop": "Rice (Paddy)",
    "disease": "Brown Spot",
    "scientificName": "Bipolaris oryzae (Cochliobolus miyabeanus)",
    "pathogenType": "Fungal",
    "isHealthy": false,
    "simpleDescription": "A widespread fungal disease causing oval or sesame-seed shaped brown spots with yellow halos across rice leaf blades and glumes.",
    "visibleSymptoms": [
      "Small, circular to oval sesame-seed shaped brown spots on leaf blades and leaf sheaths",
      "Mature spots have grey or whitish centers surrounded by dark brown margins and yellow halos",
      "Infected grains show blackish discoloration or dark velvety brown spots",
      "Seedling blight in dry nurseries causing poor germination stands"
    ],
    "generalPrevention": [
      "Treat seeds with Thiram or Carbendazim @ 2 g/kg of seed before sowing",
      "Correct soil nutritional deficiencies especially potassium, silica, and zinc",
      "Maintain balanced organic manure and soil moisture to avoid nutrient stress"
    ],
    "recommendedNextSteps": [
      "Foliar spray of Mancozeb 75% WP @ 2 g/L or Propiconazole 25% EC @ 1 ml/L at first spot appearance",
      "Spray Pseudomonas fluorescens @ 5 g/L or Trichoderma harzianum as eco-friendly bio-fungicide",
      "Apply potassium top-dressing (MOP) to improve silica deposition in leaf epidermal walls"
    ],
    "expertHelpWarning": "Brown spot is strongly correlated with nutrient-poor or stressed soils; request a soil health card test from your local KVK.",
    "organicRemedies": [
      "Spray Propiconazole 25 EC @ 1 ml/L or Mancozeb 75 WP @ 2 g/L upon initial lesion detection",
      "Organic biocontrol: spray Pseudomonas fluorescens (Pf-1) @ 5 g/L or Trichoderma @ 5 g/L",
      "Foliar top-dressing of 1% Potassium Nitrate (13:0:45) to strengthen plant epidermal cell walls"
    ]
  },
  "Rice___Leaf_Blast": {
    "className": "Rice___Leaf_Blast",
    "crop": "Rice (Paddy)",
    "disease": "Leaf Blast",
    "scientificName": "Magnaporthe oryzae (Pyricularia oryzae)",
    "pathogenType": "Fungal",
    "isHealthy": false,
    "simpleDescription": "One of the most destructive rice diseases worldwide, causing spindle-shaped or diamond-shaped lesions with grey centers and brown borders.",
    "visibleSymptoms": [
      "Diamond-shaped or spindle-shaped lesions with pointed ends on leaf blades",
      "Lesion centers are ash-grey or whitish with distinct reddish-brown to dark brown margins",
      "Several lesions coalesce causing extensive foliar blighting and burning appearance",
      "Neck blast symptom where panicle nodes turn black and break, resulting in chaffy grains"
    ],
    "generalPrevention": [
      "Grow blast-tolerant varieties recommended for your agro-climatic zone",
      "Avoid high doses of nitrogenous fertilizers, especially in overcast rainy weather",
      "Avoid delayed transplanting and maintain adequate water depth in paddy fields"
    ],
    "recommendedNextSteps": [
      "Spray Tricyclazole 75% WP @ 0.6 g/L or Isoprothiolane 40% EC @ 1.5 ml/L at symptom appearance",
      "Foliar spray with Pseudomonas fluorescens talc formulation @ 10 g/L",
      "Ensure field water is maintained at 2-5 cm depth during treatment periods"
    ],
    "expertHelpWarning": "Neck blast infection causes 100% loss of grain filling; notify your extension worker immediately if panicle stems darken.",
    "organicRemedies": [
      "Spray Tricyclazole 75 WP @ 0.6 g/L water (Beam / Baan) at early lesion detection",
      "Alternative: Spray Kasugamycin 3% SL (1.5 mL/L) or Isoprothiolane 40 EC (1.5 mL/L)",
      "Repeat spray after 10-12 days at boot leaf stage to prevent neck blast"
    ]
  },
  "Rice___healthy": {
    "className": "Rice___healthy",
    "crop": "Rice (Paddy)",
    "disease": "Healthy",
    "scientificName": "Oryza sativa",
    "pathogenType": "Healthy",
    "isHealthy": true,
    "simpleDescription": "The paddy leaf exhibits uniform vibrant green linear blade growth with clean ligules and no blast spindles, brown spots, or bacterial blight stripes.",
    "visibleSymptoms": [
      "Uniform dark green linear foliage with clean erect blade posture",
      "No spindle-shaped blast lesions, sesame-seed brown spots, or bacterial ooze",
      "Healthy tiller formation and robust root anchorage in paddy mud"
    ],
    "generalPrevention": [
      "Maintain standard alternate wetting and drying (AWD) water management",
      "Apply balanced NPK according to soil health test with split nitrogen applications",
      "Keep paddy bunds clear of wild host grasses (Echinochloa colona)"
    ],
    "recommendedNextSteps": [
      "Continue regular in-field scouting every 5-7 days during tillering and panicle emergence",
      "Monitor for stem borer dead hearts and leaf folder activity",
      "Maintain optimal water level during flowering and milk stages"
    ],
    "expertHelpWarning": "No disease detected. This result applies to the scanned paddy leaf; continue periodic whole-plot inspections.",
    "organicRemedies": [
      "No chemical fungicide needed for healthy rice crop",
      "Prophylactic bio-spray: apply Pseudomonas fluorescens @ 5 g/L at maximum tillering",
      "Apply zinc sulfate (25 kg/ha basal or 0.5% foliar spray) to maintain vigorous green chlorophyll"
    ]
  },
  "Wheat___Brown_rust": {
    "className": "Wheat___Brown_rust",
    "crop": "Wheat",
    "disease": "Brown Rust (Leaf Rust)",
    "scientificName": "Puccinia triticina (Puccinia recondita)",
    "pathogenType": "Fungal",
    "isHealthy": false,
    "simpleDescription": "The most widespread rust disease of wheat in India, producing scattered circular orange-brown pustules on upper leaf surfaces.",
    "visibleSymptoms": [
      "Small, round to oval, bright orange-brown to cinnamon-colored pustules (uredinia) scattered randomly across leaves",
      "Pustules erupt through the leaf epidermis, dusting hands with orange spores when rubbed",
      "Leaves turn chlorotic yellow and desiccate prematurely under severe rust pressure",
      "Pustules later turn dark brown to black (telia) as crop matures towards harvest"
    ],
    "generalPrevention": [
      "Sow rust-resistant varieties recommended by ICAR-IIWBR Karnal (e.g., HD 2967, DBW 187, DBW 222)",
      "Sow at optimal window (first fortnight of November in Indo-Gangetic Plains) to avoid late-season heat and rust buildup",
      "Avoid excessive irrigation and heavy nitrogen application in late winter"
    ],
    "recommendedNextSteps": [
      "Spray Propiconazole 25% EC (Tilt) @ 1 ml/L or Tebuconazole 25.9% EC @ 1 ml/L upon initial rust detection",
      "Ensure thorough spray coverage of the flag leaf and upper canopy foliage",
      "Repeat spray after 15 days if cool humid conditions persist"
    ],
    "expertHelpWarning": "Report brown rust sightings immediately to your nearest state wheat monitoring portal or KVK to map regional race dynamics.",
    "organicRemedies": [
      "Spray Propiconazole 25 EC (Tilt) @ 1 ml/L or Tebuconazole 25.9 EC @ 1 ml/L immediately at first rust pustule appearance",
      "Bio-fungicide: apply Trichoderma harzianum @ 4 g/L or Bacillus subtilis @ 5 g/L foliar spray",
      "Ensure thorough spray coverage of the flag leaf and top canopy; repeat after 15 days if humid weather persists"
    ]
  },
  "Wheat___Yellow_rust": {
    "className": "Wheat___Yellow_rust",
    "crop": "Wheat",
    "disease": "Yellow Rust (Stripe Rust)",
    "scientificName": "Puccinia striiformis f. sp. tritici",
    "pathogenType": "Fungal",
    "isHealthy": false,
    "simpleDescription": "A destructive cool-season wheat disease characterized by yellow-orange pustules arranged in narrow linear stripes along leaf veins.",
    "visibleSymptoms": [
      "Bright lemon-yellow powdery pustules arranged in distinct parallel stripes along the leaf blade veins",
      "Leaves take on a distinct yellow-striped appearance, followed by foliar necrosis",
      "Yellow spore dust readily rubs off onto clothing and fingers when walking through fields",
      "Severe shriveling of wheat grains and stunted earheads"
    ],
    "generalPrevention": [
      "Cultivate stripe-rust resistant wheat varieties suited for Northern Hills and Plains zones",
      "Avoid early sowing in sub-montane foothill regions where stripe rust oversummers",
      "Conduct regular surveillance in January-February during fog and overcast damp spells"
    ],
    "recommendedNextSteps": [
      "Immediately spray Propiconazole 25% EC @ 1 ml/L or Azoxystrobin + Difenoconazole @ 1 ml/L",
      "Prioritize protecting the flag leaf which contributes over 50% to grain filling",
      "Form community spray rings across adjacent wheat holdings to arrest aerial spore drift"
    ],
    "expertHelpWarning": "Yellow rust is an emergency pathogen in Northern India; inform district agriculture authorities immediately on first confirmation.",
    "organicRemedies": [
      "Immediately on seeing first yellow stripe, spray Propiconazole 25 EC (Tilt) @ 1 ml/L (200 ml in 200 L water/acre)",
      "Alternative: Spray Tebuconazole 25.9 EC @ 1 ml/L or Azoxystrobin + Difenoconazole",
      "Repeat spray after 15 days if cool weather and morning fogs persist"
    ]
  },
  "Wheat___Powdery_mildew": {
    "className": "Wheat___Powdery_mildew",
    "crop": "Wheat",
    "disease": "Powdery Mildew",
    "scientificName": "Blumeria graminis f. sp. tritici",
    "pathogenType": "Fungal",
    "isHealthy": false,
    "simpleDescription": "A fungal disease producing white to greyish fluffy cotton-like fungal mats on lower leaves and stems of wheat in cool humid microclimates.",
    "visibleSymptoms": [
      "Superficial white to light-grey cottony fungal patches on leaf surfaces, sheaths, and stems",
      "Patches enlarge, merge, and turn dull greyish-brown with tiny black pinhead fruiting bodies (cleistothecia)",
      "Underlying leaf tissue becomes chlorotic yellow, withers, and dries up",
      "Reduced photosynthesis leads to poor tillering and light, shriveled grain"
    ],
    "generalPrevention": [
      "Avoid dense seed rates to ensure adequate sunlight penetration into the lower wheat canopy",
      "Avoid excessive nitrogen fertilization which creates thick lush microclimates",
      "Adopt proper crop rotation with non-cereal crops"
    ],
    "recommendedNextSteps": [
      "Spray wettable sulfur 80% WP @ 2.5 g/L or Propiconazole 25% EC @ 1 ml/L upon early symptom onset",
      "Spray Trichoderma viride bio-fungicide in early vegetative stages as preventative bio-barrier",
      "Ensure proper furrow irrigation without ponding humidity around stem bases"
    ],
    "expertHelpWarning": "If powdery mildew ascends to the flag leaf and wheat earheads, chemical intervention is critical to prevent yield collapse.",
    "organicRemedies": [
      "Spray Wettable Sulfur 80 WP @ 2.5 g/L or Propiconazole 25 EC @ 1 ml/L at early powdery patch onset",
      "Bio-fungicide: spray Trichoderma viride @ 5 g/L or Potassium Bicarbonate @ 5 g/L foliar wash",
      "Repeat fungicide spray after 12-14 days if cool cloudy weather persists"
    ]
  },
  "Wheat___healthy": {
    "className": "Wheat___healthy",
    "crop": "Wheat",
    "disease": "Healthy",
    "scientificName": "Triticum aestivum",
    "pathogenType": "Healthy",
    "isHealthy": true,
    "simpleDescription": "The wheat leaf displays uniform healthy green coloration with robust parallel veins, upright posture, and total absence of rust pustules or powdery patches.",
    "visibleSymptoms": [
      "Clean, vibrant emerald-green linear blade with intact tips and smooth margins",
      "No yellow stripe patterns, orange powdery rust pustules, or powdery mildew patches",
      "Sturdy stem culms and healthy flag leaf development for optimal grain filling"
    ],
    "generalPrevention": [
      "Maintain recommended irrigation schedule at critical crown root initiation (CRI) and boot stages",
      "Apply balanced NPK (120:60:40 kg/ha) with micronutrient zinc sulfate top-dressing",
      "Keep field borders free from wild phalaris and weed grasses"
    ],
    "recommendedNextSteps": [
      "Continue standard crop scouting through heading and milking stages",
      "Ensure terminal irrigation at grain development to maximize test weight",
      "Monitor for aphid colonies on earheads"
    ],
    "expertHelpWarning": "No disease detected. This scan confirms healthy wheat foliage; maintain weekly field inspections.",
    "organicRemedies": [
      "No chemical fungicide required for healthy wheat foliage",
      "Foliar spray with 1% Urea + 0.5% Zinc Sulfate at heading to maximize grain fill",
      "Apply bio-agent Pseudomonas fluorescens as prophylactic spray during cloudy weather"
    ]
  },
  "Cotton___Bacterial_blight": {
    "className": "Cotton___Bacterial_blight",
    "crop": "Cotton",
    "disease": "Bacterial Blight (Angular Leaf Spot)",
    "scientificName": "Xanthomonas citri pv. malvacearum",
    "pathogenType": "Bacterial",
    "isHealthy": false,
    "simpleDescription": "Also known as angular leaf spot or black arm, this bacterial disease produces angular water-soaked leaf spots bounded by veins.",
    "visibleSymptoms": [
      "Small, angular, water-soaked translucent lesions on leaf undersides bounded by leaf veinlets",
      "Lesions turn reddish-brown to dark brown and become necrotic with age",
      "Infection spreads along main leaf veins (\"vein blight\") and stems (\"black arm\" phase)",
      "Water-soaked circular sunken spots on cotton bolls causing boll rot and lint staining"
    ],
    "generalPrevention": [
      "Delint seeds with concentrated sulfuric acid (100 ml/kg of seed) and treat with Streptocycline @ 1 g/10 kg seed",
      "Grow resistant cotton hybrids certified by Central Institute for Cotton Research (ICAR-CICR)",
      "Destroy crop residue and plow cotton stalks deep into the soil after harvest"
    ],
    "recommendedNextSteps": [
      "Foliar spray with Copper Oxychloride 50% WP @ 2.5 g/L + Streptocycline @ 0.1 g/L at initial symptom sighting",
      "Spray Pseudomonas fluorescens @ 10 g/L as biological control",
      "Avoid overhead irrigation that splashes bacterial cells onto healthy upper canopy"
    ],
    "expertHelpWarning": "If black arm lesions girdle vegetative branches or main stems, plants can snap under wind pressure; seek immediate KVK advice.",
    "organicRemedies": [
      "Spray Copper Oxychloride 50 WP (3 g/L) tank-mixed with Streptocycline (1 g per 10 L water)",
      "Organic Bio-Spray: Pseudomonas fluorescens (10 g/L) or Neem Seed Kernel Extract (NSKE 5%)",
      "Repeat foliar protective application at 10-14 day intervals if rainy weather persists"
    ]
  },
  "Cotton___Leaf_curl_virus": {
    "className": "Cotton___Leaf_curl_virus",
    "crop": "Cotton",
    "disease": "Leaf Curl Virus (CLCuV)",
    "scientificName": "Cotton leaf curl virus (CLCuV) & Betasatellite",
    "pathogenType": "Viral",
    "isHealthy": false,
    "simpleDescription": "A severe whitefly-transmitted begomovirus causing upward or downward leaf curling, vein thickening, and leaf-like enations on undersides.",
    "visibleSymptoms": [
      "Upward or downward cupping and curling of leaf margins",
      "Distinct thickening and dark green coloration of small and large leaf veins",
      "Cup-shaped or leaf-like outgrowths (\"enations\") on the lower surface of leaf veins",
      "Severely stunted plant growth with shortened internodes and few harvestable bolls"
    ],
    "generalPrevention": [
      "Sow CLCuV-resistant or tolerant Bt cotton hybrids recommended for North and Central zones",
      "Install yellow sticky traps @ 15-20 traps/acre to trap whitefly vectors (Bemisia tabaci)",
      "Remove weed hosts such as Abutilon indicum and Parthenium hysterophorus around field borders"
    ],
    "recommendedNextSteps": [
      "Manage whitefly vector with insecticidal sprays like Diafenthiuron 50% WP @ 1.25 g/L or Pyriproxyfen 10% EC @ 2 ml/L",
      "Spray 5% neem seed kernel extract (NSKE) or neem oil @ 3-5 ml/L to deter whitefly feeding",
      "Rogue out and bury severely infected stunted saplings early in the season to stop spread"
    ],
    "expertHelpWarning": "Cotton Leaf Curl Virus can cause up to 80% loss in susceptible crops; coordinate vector control across neighboring farms.",
    "organicRemedies": [
      "Control vector: Spray Diafenthiuron 50 WP (1.2 g/L) or Pyriproxyfen 10 EC (2 ml/L)",
      "For sucking pest complex: Spray Flonicamid 50 WG (0.3 g/L) or Spiromesifen 22.9 SC (1 ml/L)",
      "Rogue out severely infected early seedlings to prevent field-wide vector spread"
    ]
  },
  "Cotton___healthy": {
    "className": "Cotton___healthy",
    "crop": "Cotton",
    "disease": "Healthy",
    "scientificName": "Gossypium hirsutum",
    "pathogenType": "Healthy",
    "isHealthy": true,
    "simpleDescription": "The cotton leaf shows vibrant broad palmate-lobed foliage with clean network veins, crisp margins, and zero angular water-soaked spots or viral enations.",
    "visibleSymptoms": [
      "Uniform deep-green palmate-lobed leaf blade with clean veins and margins",
      "No angular dark spots, leaf-curl cupping, or purplish leaf-reddening symptoms",
      "Robust square (bud) development and healthy vegetative branching"
    ],
    "generalPrevention": [
      "Maintain balanced fertilizer schedule with split nitrogen and potassium applications",
      "Monitor sucking pests (aphids, jassids, thrips, whiteflies) weekly using ETL guidelines",
      "Ensure proper drainage to avoid standing water during heavy monsoon spells"
    ],
    "recommendedNextSteps": [
      "Continue routine integrated pest and disease monitoring in the field",
      "Foliar spray with 2% DAP or 19:19:19 during peak boll development stage",
      "Maintain weed-free conditions along inter-row furrows"
    ],
    "expertHelpWarning": "No disease detected. This leaf is healthy; continue regular pest and crop scouting.",
    "organicRemedies": [
      "No chemical fungicide or bactericide required for healthy cotton foliage",
      "Apply 5% Neem Seed Kernel Extract (NSKE) or Neem Oil 1500 ppm @ 5 ml/L as prophylactic bio-barrier",
      "Foliar spray of 2% DAP or 1% 19:19:19 + 0.5% Boron during peak flowering to prevent square drop"
    ]
  },
  "Sugarcane___Red_rot": {
    "className": "Sugarcane___Red_rot",
    "crop": "Sugarcane",
    "disease": "Red Rot",
    "scientificName": "Colletotrichum falcatum (Glomerella tucumanensis)",
    "pathogenType": "Fungal",
    "isHealthy": false,
    "simpleDescription": "Referred to as the \"cancer of sugarcane\", causing red discoloration with characteristic white transverse patches inside the stalk and midrib lesions.",
    "visibleSymptoms": [
      "Yellowing, withering, and drying of upper leaves (starting from 3rd or 4th leaf down)",
      "Reddish lesions on the leaf midrib with dark centers that produce black fuzzy spores",
      "Splitting the stalk reveals longitudinal red discoloration interrupted by distinctive white transverse bands",
      "Affected canes emit an alcoholic sour odor and hollow out with greyish mycelium"
    ],
    "generalPrevention": [
      "Select seed setts strictly from certified disease-free nurseries; never take setts from infected fields",
      "Soak seed setts in Carbendazim 50% WP @ 1 g/L solution for 15 minutes before planting",
      "Practice crop rotation with rice or green manure crops (dhaincha / sunnhemp) for at least 2 seasons"
    ],
    "recommendedNextSteps": [
      "Uproot and burn infected clumps along with their underground root systems to prevent ratoon carryover",
      "Do not take ratoon crops from red rot affected sugarcane fields",
      "Apply Trichoderma viride enriched bio-compost @ 10 kg/acre to the furrow soil"
    ],
    "expertHelpWarning": "Red rot is an ICAR quarantine-grade fungal threat capable of devastating entire mill catchment zones; notify your sugar factory cane development office.",
    "organicRemedies": [
      "Sett dip before planting: Carbendazim 50 WP @ 1 g/L or Thiophanate Methyl 70 WP (1 g/L) for 15 minutes",
      "Immediately uproot and incinerate wilted clumps with roots and soil intact to stop subterranean mycelial spread",
      "Rotate heavily infected fields with paddy or sunnhemp green manure for at least 1-2 seasons"
    ]
  },
  "Sugarcane___Smut": {
    "className": "Sugarcane___Smut",
    "crop": "Sugarcane",
    "disease": "Sugarcane Smut",
    "scientificName": "Sporisorium scitamineum (Ustilago scitaminea)",
    "pathogenType": "Fungal",
    "isHealthy": false,
    "simpleDescription": "A systemic fungal infection producing a distinctive curved, black, whip-like structure from the growing tip of the cane shoot.",
    "visibleSymptoms": [
      "Production of a prominent curved or coiled whip-like structure (up to 1 meter long) from the terminal shoot",
      "Whip is covered with a thin silvery membrane that ruptures, releasing millions of sooty black teliospores",
      "Infected canes have slender, thin, erect tillers (\"grassy shoot\" appearance) with elongated internodes",
      "Stunted growth, lack of millable cane formation, and premature cane drying"
    ],
    "generalPrevention": [
      "Treat seed setts with hot water treatment (52°C for 30 minutes) or moist hot air before planting",
      "Grow smut-resistant varieties (e.g., Co 86032, Co 0238 in suitable zones)",
      "Avoid taking ratoon crops from smut-infected fields"
    ],
    "recommendedNextSteps": [
      "Carefully cut and enclose the black whip structure in a cloth or polythene bag before removal to prevent spore dispersion",
      "Rogue out the entire infected clump and burn or deeply bury it off the field",
      "Spray Carbendazim @ 1 g/L or Propiconazole @ 1 ml/L on surrounding healthy stools"
    ],
    "expertHelpWarning": "Rupturing smut whips spreads billions of wind-borne spores across kilometers; always bag the whip gently before cutting.",
    "organicRemedies": [
      "Enclose black whip in cloth or polythene bag before cutting stool to prevent spore drift; rogue and burn outside field",
      "Sett dip before planting: Carbendazim 50 WP @ 1 g/L or Propiconazole 25 EC @ 1 ml/L for 15 minutes",
      "Biological sett treatment: dip in Trichoderma harzianum @ 10 g/L slurry for 30 minutes"
    ]
  },
  "Sugarcane___healthy": {
    "className": "Sugarcane___healthy",
    "crop": "Sugarcane",
    "disease": "Healthy",
    "scientificName": "Saccharum officinarum",
    "pathogenType": "Healthy",
    "isHealthy": true,
    "simpleDescription": "The sugarcane leaf displays broad, deep green elongated linear blade foliage with a clean prominent white midrib and no red lesions or smut whips.",
    "visibleSymptoms": [
      "Vibrant green elongated leaf blade with smooth serrated margins and robust white midrib",
      "No red midrib lesions, black whip structures, rust pustules, or grassy tiller stunting",
      "Thick, sturdy cane stalks with healthy node rings and active tillering"
    ],
    "generalPrevention": [
      "Apply recommended NPK fertilizers in split applications (e.g., 250:115:115 kg/ha) with adequate earthing-up",
      "Provide regular irrigation at 10-12 day intervals during peak tillering and formative phases",
      "Trash mulching in inter-row spaces to conserve soil moisture and suppress weeds"
    ],
    "recommendedNextSteps": [
      "Continue scheduled irrigation and fertilizer management according to crop age",
      "Conduct regular earthing-up to prevent lodging under strong winds",
      "Scout for early shoot borer and top shoot borer attacks"
    ],
    "expertHelpWarning": "No disease detected. This leaf shows optimal health; continue standard agronomic practices.",
    "organicRemedies": [
      "No chemical fungicide required for healthy sugarcane crop",
      "Foliar spray with 1% Ferrous Sulfate + 0.5% Zinc Sulfate if mild chlorosis is observed in calcareous alkaline soils",
      "Trash shredding and in-situ composting with Trichoderma to enrich soil organic carbon"
    ]
  }
};
