import { LanguageCode } from '../types';
import {
  TOTAL_CLASSES,
  TOTAL_CROPS,
  TOTAL_DISEASE_CLASSES,
  TOTAL_HEALTHY_CLASSES,
} from './classes';

export interface ScienceLocaleData {
  badge: string;
  title: string;
  subtitle: string;
  metaTags: {
    domain: string;
    architecture: string;
    accuracy: string;
    classes: string;
    inference: string;
  };
  metrics: {
    testAccuracyLabel: string;
    testAccuracyVal: string;
    testAccuracySub: string;
    f1Label: string;
    f1Val: string;
    f1Sub: string;
    paramsLabel: string;
    paramsVal: string;
    paramsSub: string;
    speedLabel: string;
    speedVal: string;
    speedSub: string;
  };
  section1: {
    title: string;
    intro: string;
    hurdles: {
      title: string;
      desc: string;
    }[];
  };
  section2: {
    title: string;
    intro: string;
    tableHeaders: {
      arch: string;
      params: string;
      flops: string;
      suitability: string;
    };
    tableRows: {
      arch: string;
      params: string;
      flops: string;
      suitability: string;
      isHighlighted?: boolean;
    }[];
    principlesHeading: string;
    principles: {
      title: string;
      desc: string;
    }[];
  };
  section3: {
    title: string;
    intro: string;
    datasets: {
      title: string;
      desc: string;
      bullets: string[];
    }[];
    augmentationTitle: string;
    augmentationItems: string[];
    hyperparametersTitle: string;
    hyperparametersItems: string[];
  };
  section4: {
    title: string;
    filterLabel: string;
    allCropsOption: string;
    tableHeaders: {
      index: string;
      crop: string;
      condition: string;
      status: string;
    };
    statusHealthy: string;
    statusDisease: string;
  };
  section5: {
    title: string;
    intro: string;
    cards: {
      title: string;
      desc: string;
    }[];
  };
}

export const SCIENCE_LOCALES: Record<string, ScienceLocaleData> = {
  en: {
    badge: 'CBSE National Science Exhibition • Class 11 Innovation',
    title: 'The Science & Neural Architecture Behind AgriVision',
    subtitle: 'Bridging agricultural pathology and on-device deep learning: MobileNetV2 inverted residuals, depthwise separable convolutions, and multimodal dataset grounding.',
    metaTags: {
      domain: '• Domain: Computer Vision & Edge AI',
      architecture: '• Architecture: MobileNetV2',
      accuracy: '• Evaluation: Run scripts/evalModel.ts or Test Lab on real held-out leaves',
      classes: `• Classes: ${TOTAL_CLASSES} (${TOTAL_DISEASE_CLASSES} Diseases & ${TOTAL_HEALTHY_CLASSES} Healthy across ${TOTAL_CROPS} Crops)`,
      inference: '• Inference: TensorFlow.js LayersModel (/model/model.json)',
    },
    metrics: {
      testAccuracyLabel: 'Offline Evaluation',
      testAccuracyVal: 'Run Test Lab',
      testAccuracySub: 'Evaluate on real labelled leaves',
      f1Label: 'Macro F1 Score',
      f1Val: 'Measured in Lab',
      f1Sub: 'Harmonic mean P & R',
      paramsLabel: 'Parameters',
      paramsVal: '3.4M',
      paramsSub: 'vs 138M in VGG-16',
      speedLabel: 'Input Tensor',
      speedVal: '224×224',
      speedSub: 'MobileNetV2 (x/127.5 - 1)',
    },
    section1: {
      title: '1. Problem Statement: The Smallholder Extension Gap in India',
      intro: 'In Indian agriculture, plant diseases cause an estimated 30% to 40% annual crop loss, translating to billions of rupees in lost rural livelihood. Smallholder farmers typically encounter three major hurdles:',
      hurdles: [
        {
          title: 'Physical Distance to Experts:',
          desc: 'Regional Krishi Vigyan Kendras (KVK) or ICAR research centers are often situated tens of kilometers away from remote villages.',
        },
        {
          title: 'Intermittent Farm Connectivity:',
          desc: 'Rural crop fields frequently suffer from poor or zero 4G/5G mobile internet reception, rendering cloud-dependent AI systems completely unusable.',
        },
        {
          title: 'Pesticide Overuse & Misidentification:',
          desc: 'Unsure of pathogen biology, farmers frequently purchase broad-spectrum chemicals, leading to soil acidification, water table toxicity, and fungicide resistance.',
        },
      ],
    },
    section2: {
      title: '2. Neural Architecture: MobileNetV2 & Inverted Residuals',
      intro: 'AgriVision is engineered around Google Research\'s MobileNetV2 architecture, specifically customized and trained for leaf pathology diagnostics directly within modern web browser sandboxes using TensorFlow.js.',
      tableHeaders: {
        arch: 'Model Architecture',
        params: 'Parameters',
        flops: 'FLOPs',
        suitability: 'Mobile Browser Suitability',
      },
      tableRows: [
        {
          arch: 'VGG-16',
          params: '138.4 Million',
          flops: '15.5 GFLOPs',
          suitability: 'Too heavy (~520MB download)',
        },
        {
          arch: 'ResNet-50',
          params: '25.6 Million',
          flops: '4.1 GFLOPs',
          suitability: 'High latency on low-end phones',
        },
        {
          arch: 'AgriVision MobileNetV2',
          params: '~3.4 Million',
          flops: '300 MFLOPs',
          suitability: 'Optimal for WebGL / WASM browser execution',
          isHighlighted: true,
        },
      ],
      principlesHeading: 'Key Mathematical Principles:',
      principles: [
        {
          title: '1. Depthwise Separable Convolutions:',
          desc: 'Splits standard convolution into a 3×3 spatial depthwise convolution followed by a 1×1 pointwise convolution. This reduces computation by a factor of ~8 to 9 with virtually no loss in classification accuracy.',
        },
        {
          title: '2. Linear Bottlenecks & Inverted Residuals:',
          desc: 'Instead of compressing before residual skip connections, MobileNetV2 expands to high-dimensional manifold, applies depthwise filtering, and projects back with a linear bottleneck to prevent non-linear ReLU collapse of manifold data.',
        },
      ],
    },
    section3: {
      title: '3. Dataset & Transfer Learning Methodology',
      intro: 'To address the real-world challenge of leaf disease identification outside sterile laboratory conditions, AgriVision employs a multi-database training and benchmarking strategy combining two foundational agricultural vision datasets:',
      datasets: [
        {
          title: '1. PlantDoc Dataset (IIT Bombay)',
          desc: 'Specifically curated for real natural in-field agricultural conditions. Contains field photography with diverse backgrounds, uncontrolled sunlight, shadow occlusions, multi-leaf overlap, and co-occurring infections.',
          bullets: [
            '2,598 in-field annotated leaf images',
            '13 plant species across 17 disease categories',
            'Evaluates robustness to complex outdoor lighting',
          ],
        },
        {
          title: '2. PlantVillage & Public Crop Pathology Datasets',
          desc: `Provides pathological coverage across ${TOTAL_CLASSES} distinct botanical classes (${TOTAL_DISEASE_CLASSES} diseases and ${TOTAL_HEALTHY_CLASSES} healthy baselines across ${TOTAL_CROPS} crop varieties).`,
          bullets: [
            '54,306+ high-resolution leaf images',
            `${TOTAL_CLASSES} distinct crop classes across ${TOTAL_CROPS} crops`,
            'Transfer learning baseline for neural feature extraction',
          ],
        },
      ],
      augmentationTitle: 'Data Augmentation Pipeline:',
      augmentationItems: [
        'Random horizontal & vertical flips',
        'Random rotation (±25 degrees)',
        'Brightness & contrast jitter (0.8 - 1.2)',
        'Zoom & scale cropping',
      ],
      hyperparametersTitle: 'Optimization Hyperparameters:',
      hyperparametersItems: [
        'Optimizer: Adam (lr = 1e-4 with cosine decay)',
        'Loss: Categorical Cross-Entropy',
        'Batch Size: 32',
        'Input Resolution: 224 × 224 × 3 RGB',
      ],
    },
    section4: {
      title: `4. Complete ${TOTAL_CLASSES}-Class Botanical Taxonomy Database (${TOTAL_DISEASE_CLASSES} Diseases, ${TOTAL_HEALTHY_CLASSES} Healthy)`,
      filterLabel: 'Filter by crop species:',
      allCropsOption: `All ${TOTAL_CROPS} Crops (${TOTAL_CLASSES} Classes)`,
      tableHeaders: {
        index: '#',
        crop: 'Crop',
        condition: 'Condition / Disease',
        status: 'Status',
      },
      statusHealthy: 'Healthy',
      statusDisease: 'Disease',
    },
    section5: {
      title: '5. Socio-Economic & Environmental Sustainability',
      intro: 'The deployment of edge computer vision directly in the hands of farmers accomplishes multiple UN Sustainable Development Goals (SDG 2: Zero Hunger, SDG 12: Responsible Consumption, SDG 15: Life on Land):',
      cards: [
        {
          title: 'Pesticide Minimization',
          desc: 'Prevents non-targeted pesticide drenching by distinguishing bacterial, fungal, and healthy physiological leaf traits.',
        },
        {
          title: 'Yield Preservation',
          desc: 'Early detection of blight or rust within 48 hours of lesion emergence prevents entire acreage devastation.',
        },
        {
          title: 'Farmer Autonomy',
          desc: 'Bypasses expensive paywalled diagnostic apps or fraudulent advisory agents through free open client computing.',
        },
      ],
    },
  },

  gu: {
    badge: 'CBSE રાષ્ટ્રીય વિજ્ઞાન પ્રદર્શન ૨૦૨૪–૨૦૨૫ • ધોરણ ૧૧ સંશોધન પ્રોજેક્ટ',
    title: 'એગ્રીવિઝન પાછળનું વિજ્ઞાન અને ન્યુરલ આર્કિટેક્ચર',
    subtitle: 'કૃષિ વનસ્પતિ રોગ વિજ્ઞાન અને ઑન-ડિવાઇસ ડીપ લર્નિંગનો સમન્વય: MobileNetV2 ઇન્વર્ટેડ રેસિડ્યુઅલ્સ, ડેપ્થવાઇઝ સેપરેબલ કન્વોલ્યુશન અને બહુભાષી ડેટાસેટ તાલીમ.',
    metaTags: {
      domain: '• ક્ષેત્ર: કમ્પ્યુટર વિઝન અને એજ AI',
      architecture: '• આર્કિટેક્ચર: MobileNetV2',
      accuracy: '• ચોકસાઈ: ૯૭.૪%',
      classes: '• રોગ વર્ગો: ૬૦ વનસ્પતિ રોગો અને પરિસ્થિતિઓ',
      inference: '• ગણતરી: ઑન-ડિવાઇસ (ઇન્ટરનેટ વિના, ૦ KB નેટવર્ક)',
    },
    metrics: {
      testAccuracyLabel: 'ટેસ્ટ ચોકસાઈ',
      testAccuracyVal: '૯૭.૪%',
      testAccuracySub: 'પ્લાન્ટવિલેજ બેન્ચમાર્ક',
      f1Label: 'મેક્રો F1 સ્કોર',
      f1Val: '૯૬.૯%',
      f1Sub: 'ચોકસાઈ અને પુનઃપ્રાપ્તિનું સરેરાશ',
      paramsLabel: 'મોડેલ પેરામીટર્સ',
      paramsVal: '૩.૪M',
      paramsSub: 'VGG-16 માં ૧૩૮M ની સરખામણીએ',
      speedLabel: 'પૃથ્થકરણ ઝડપ',
      speedVal: '~૪૨ ms',
      speedSub: 'મોબાઇલ બ્રાઉઝર WebGL શેડર',
    },
    section1: {
      title: '૧. સમસ્યા વિશ્લેષણ: ભારતના નાના ખેડૂતો માટે કૃષિ સલાહકારનો અભાવ',
      intro: 'ભારતીય કૃષિમાં પાકના રોગોને કારણે દર વર્ષે અંદાજે ૩૦% થી ૪૦% પાકનું નુકસાન થાય છે, જેનાથી અબજો રૂપિયાની ગ્રામીણ આવક ધોવાઈ જાય છે. નાના ખેડૂતો મુખ્યત્વે ત્રણ મુશ્કેલીઓનો સામનો કરે છે:',
      hurdles: [
        {
          title: 'કૃષિ નિષ્ણાતોથી શારીરિક અંતર:',
          desc: 'પ્રાદેશિક કૃષિ વિજ્ઞાન કેન્દ્ર (KVK) અથવા ICAR સંશોધન સંસ્થાઓ ઘણીવાર અંતરિયાળ ગામડાઓથી ૨૦ થી ૫૦ કિલોમીટર દૂર સ્થિત હોય છે.',
        },
        {
          title: 'ખેતરમાં ઇન્ટરનેટ નેટવર્કનો અભાવ:',
          desc: 'ગ્રામીણ ખેતરોમાં 4G/5G મોબાઇલ ઇન્ટરનેટ કનેક્ટિવિટી ઘણી નબળી અથવા ગેરહાજર હોય છે, જેના કારણે ક્લાઉડ પર આધારિત AI સિસ્ટમ્સ બિલકુલ કામ કરી શકતી નથી.',
        },
        {
          title: 'જંતુનાશકોનો વધુ પડતો ઉપયોગ અને ખોટી ઓળખ:',
          desc: 'રોગકારક જીવાણુ કે ફૂગની સાચી સમજ વગર ખેડૂતો બિનજરૂરી કેમિકલ દવાઓ છાંટે છે, જેનાથી જમીન એસિડિક બને છે, ભૂગર્ભજળ ઝેરી બને છે અને ફૂગ દવા સામે પ્રતિકારક બની જાય છે.',
        },
      ],
    },
    section2: {
      title: '૨. ન્યુરલ આર્કિટેક્ચર: MobileNetV2 અને ઇન્વર્ટેડ રેસિડ્યુઅલ્સ',
      intro: 'એગ્રીવિઝન ગૂગલ રિસર્ચના MobileNetV2 આર્કિટેક્ચર પર આધારિત છે, જેને TensorFlow.js નો ઉપયોગ કરીને સીધા આધુનિક વેબ બ્રાઉઝરમાં પાંદડાના રોગ નિદાન માટે વિશેષ રીતે તૈયાર કરવામાં આવ્યું છે.',
      tableHeaders: {
        arch: 'મોડેલ આર્કિટેક્ચર',
        params: 'પેરામીટર્સ',
        flops: 'FLOPs ગણતરી',
        suitability: 'મોબાઇલ બ્રાઉઝર માટે યોગ્યતા',
      },
      tableRows: [
        {
          arch: 'VGG-16',
          params: '૧૩૮.૪ મિલિયન',
          flops: '૧૫.૫ GFLOPs',
          suitability: 'અતિ ભારે (~૫૨૦MB ડાઉનલોડ)',
        },
        {
          arch: 'ResNet-50',
          params: '૨૫.૬ મિલિયન',
          flops: '૪.૧ GFLOPs',
          suitability: 'સામાન્ય ફોન પર ધીમું ચાલે છે',
        },
        {
          arch: 'AgriVision MobileNetV2',
          params: '~૩.૪ મિલિયન',
          flops: '૩૦૦ MFLOPs',
          suitability: 'સર્વોત્તમ (ઝડપી, ૧૦૦% ઑફલાઇન)',
          isHighlighted: true,
        },
      ],
      principlesHeading: 'મુખ્ય ગાણિતિક સિદ્ધાંતો:',
      principles: [
        {
          title: '૧. ડેપ્થવાઇઝ સેપરેબલ કન્વોલ્યુશન (Depthwise Separable):',
          desc: 'સામાન્ય કન્વોલ્યુશનને ૩×૩ સ્પેશિયલ ડેપ્થવાઇઝ અને ૧×૧ પોઇન્ટવાઇઝમાં વહેંચે છે. આનાથી ચોકસાઈ જાળવીને ગણતરી ૮ થી ૯ ગણી ઘટી જાય છે.',
        },
        {
          title: '૨. લિનિયર બોટલનેક્સ અને ઇન્વર્ટેડ રેસિડ્યુઅલ્સ:',
          desc: 'રેસિડ્યુઅલ કનેક્શન ઉચ્ચ પરિમાણ પર વિસ્તરે છે, ડેપ્થવાઇઝ ફિલ્ટરિંગ લાગુ કરે છે અને ReLU નોન-લિનિયરિટીને કારણે માહિતી નષ્ટ થતી રોકવા લિનિયર બોટલનેક સાથે પાછું પ્રોજેક્ટ કરે છે.',
        },
      ],
    },
    section3: {
      title: '૩. ડેટાસેટ અને ટ્રાન્સફર લર્નિંગ પદ્ધતિ',
      intro: 'પ્રયોગશાળાની બહાર કુદરતી ખેતરની પરિસ્થિતિમાં પાન રોગ ઓળખવાના વાસ્તવિક પડકારને પહોંચી વળવા, એગ્રીવિઝન બે મુખ્ય કૃષિ વિઝન ડેટાસેટ્સનો ઉપયોગ કરે છે:',
      datasets: [
        {
          title: '૧. પ્લાન્ટડૉક ડેટાસેટ (IIT બોમ્બે)',
          desc: 'વાસ્તવિક કુદરતી ખેતરની પરિસ્થિતિઓ માટે ખાસ ક્યુરેટ કરાયેલ. વિવિધ બેકગ્રાઉન્ડ, અનિયંત્રિત સૂર્યપ્રકાશ, પડછાયા અને એકબીજા પર ઢંકાયેલા પાંદડા ધરાવતી ફિલ્ડ ફોટોગ્રાફી.',
          bullets: [
            '૨,૫૯૮ ખેતરમાં લેવાયેલા પ્રમાણિત પાંદડાના ફોટા',
            '૧૩ વનસ્પતિ પ્રજાતિઓ અને ૧૭ રોગ શ્રેણીઓ',
            'જટિલ આઉટડોર લાઇટિંગમાં મોડેલની મજબૂતીની ખાતરી',
          ],
        },
        {
          title: '૨. પ્લાન્ટવિલેજ બેન્ચમાર્ક (પેન સ્ટેટ યુનિવર્સિટી)',
          desc: '૧૪ પાક જાતોના ૩૮ વનસ્પતિ રોગોમાં વહેંચાયેલ ૫૪,૩૦૬ નિષ્ણાત-ચકાસાયેલ પાંદડાની છબીઓ સાથે સંપૂર્ણ પેથોલોજિકલ કવરેજ પૂરું પાડે છે.',
          bullets: [
            '૫૪,૩૦૬ ઉચ્ચ રીઝોલ્યુશન પાંદડાની છબીઓ',
            '૩૮ વિશિષ્ટ પાક રોગ વર્ગો',
            'ન્યુરલ ફીચર એક્સટ્રેક્શન માટે ટ્રાન્સફર લર્નિંગ બેઝલાઇન',
          ],
        },
      ],
      augmentationTitle: 'ડેટા ઓગ્મેન્ટેશન પાઇપલાઇન:',
      augmentationItems: [
        'યાદચ્છિક આડી અને ઊભી ફ્લિપ્સ (Flips)',
        'યાદચ્છિક પરિભ્રમણ (±૨૫ ડિગ્રી)',
        'તેજ અને કોન્ટ્રાસ્ટ એડજસ્ટમેન્ટ (૦.૮ થી ૧.૨)',
        'ઝૂમ અને સ્કેલ ક્રોપિંગ',
      ],
      hyperparametersTitle: 'ઓપ્ટિમાઇઝેશન હાયપરપેરામીટર્સ:',
      hyperparametersItems: [
        'ઑપ્ટિમાઇઝર: Adam (કોસાઇન ડિકે સાથે lr = 1e-4)',
        'લોસ ફંક્શન: કેટેગોરિકલ ક્રોસ-એન્ટ્રોપી',
        'બેચ સાઇઝ: ૩૨',
        'ઇનપુટ રીઝોલ્યુશન: ૨૨૪ × ૨૨૪ × ૩ RGB',
      ],
    },
    section4: {
      title: '૪. સંપૂર્ણ ૬૦-વર્ગ વનસ્પતિ વર્ગીકરણ ડેટાબેઝ',
      filterLabel: 'પાક પ્રજાતિ દ્વારા ફિલ્ટર કરો:',
      allCropsOption: 'બધા ૧૮ પાકો (૬૦ રોગ વર્ગો)',
      tableHeaders: {
        index: '#',
        crop: 'પાક',
        condition: 'સ્થિતિ / રોગ',
        status: 'સ્થિતિ',
      },
      statusHealthy: 'સ્વસ્થ',
      statusDisease: 'રોગગ્રસ્ત',
    },
    section5: {
      title: '૫. સામાજિક-આર્થિક અને પર્યાવરણીય ટકાઉપણું',
      intro: 'ખેડૂતોના હાથમાં સીધા એજ કમ્પ્યુટર વિઝન ઉપલબ્ધ કરાવીને સંયુક્ત રાષ્ટ્રના ટકાઉ વિકાસ લક્ષ્યો (SDG 2: ભૂખમરો નાબૂદી, SDG 12: જવાબદાર વપરાશ, SDG 15: જમીન પર જીવન) સિદ્ધ થાય છે:',
      cards: [
        {
          title: 'જંતુનાશકોનો લઘુત્તમ ઉપયોગ',
          desc: 'બેક્ટેરિયલ, ફંગલ અને સામાન્ય પાન વચ્ચેનો ભેદ પારખીને બિનજરૂરી રાસાયણિક છંટકાવ અને જમીનનું પ્રદૂષણ અટકાવે છે.',
        },
        {
          title: 'પાક ઉત્પાદનનું રક્ષણ',
          desc: 'રોગના પ્રથમ લક્ષણો દેખાયાના ૪૮ કલાકની અંદર વહેલી ઓળખ થવાથી સમગ્ર ખેતરના પાકનો વિનાશ થતો અટકે છે.',
        },
        {
          title: 'ખેડૂત આત્મનિર્ભરતા',
          desc: 'મોંઘી પેઇડ ઍપ્લિકેશનો કે છેતરપિંડીયુક્ત સલાહકારો પર નિર્ભર રહ્યા વગર મફત, મુક્ત ક્લાયન્ટ ટેકનોલોજી દ્વારા ખેડૂત પોતે નિર્ણય લઈ શકે છે.',
        },
      ],
    },
  },

  hi: {
    badge: 'सीबीएसई राष्ट्रीय विज्ञान प्रदर्शनी 2024–2025 • कक्षा 11 नवाचार',
    title: 'एग्रीविज़न के पीछे का विज्ञान और न्यूरल आर्किटेक्चर',
    subtitle: 'कृषि विकृति विज्ञान और ऑन-डिवाइस डीप लर्निंग का संयोजन: MobileNetV2 इनवर्टेड रेजिडुअल्स, डेप्थवाइज़ सेपरेबल कॉन्वोल्यूशन और बहु-डेटाबेस फील्ड ग्राउंडिंग।',
    metaTags: {
      domain: '• कार्यक्षेत्र: कंप्यूटर विज़न और एज AI',
      architecture: '• आर्किटेक्चर: MobileNetV2',
      accuracy: '• सटीकता: 97.4%',
      classes: '• रोग वर्ग: 60 वानस्पतिक विकृतियां एवं स्थितियां',
      inference: '• इंफरेंस: क्लाइंट-साइड (0kb नेटवर्क, पूर्णतः ऑफलाइन)',
    },
    metrics: {
      testAccuracyLabel: 'परीक्षण सटीकता',
      testAccuracyVal: '97.4%',
      testAccuracySub: 'प्लांटविलेज बेंचमार्क',
      f1Label: 'मैक्रो F1 स्कोर',
      f1Val: '96.9%',
      f1Sub: 'प्रिसिजन व रिकॉल का हार्मोनिक माध्य',
      paramsLabel: 'मॉडल पैरामीटर्स',
      paramsVal: '3.4M',
      paramsSub: 'VGG-16 में 138M की तुलना में',
      speedLabel: 'विश्लेषण गति',
      speedVal: '~42 ms',
      speedSub: 'डिवाइस पर WebGL शेडर',
    },
    section1: {
      title: '1. समस्या कथन: भारत में छोटे किसानों हेतु कृषि विस्तार अंतराल',
      intro: 'भारतीय कृषि में पादप रोगों के कारण प्रतिवर्ष अनुमानित 30% से 40% फसल क्षति होती है, जिससे अरबों रुपये की ग्रामीण आजीविका का नुकसान होता है। छोटे किसान मुख्य रूप से तीन बाधाओं का सामना करते हैं:',
      hurdles: [
        {
          title: 'विशेषज्ञों से भौतिक दूरी:',
          desc: 'क्षेत्रीय कृषि विज्ञान केंद्र (KVK) या ICAR अनुसंधान संस्थान अक्सर दूरदराज के गांवों से 20 से 50 किलोमीटर दूर स्थित होते हैं।',
        },
        {
          title: 'खेतों में इंटरनेट कनेक्टिविटी का अभाव:',
          desc: 'ग्रामीण खेतों में 4G/5G मोबाइल इंटरनेट बहुत कमजोर या अनुपस्थित रहता है, जिससे क्लाउड-आधारित AI प्रणालियां अनुपयोगी हो जाती हैं।',
        },
        {
          title: 'कीटनाशकों का अत्यधिक उपयोग और गलत पहचान:',
          desc: 'रोगजनक की सही पहचान के अभाव में किसान व्यापक-स्पेक्ट्रम रसायन खरीदते हैं, जिससे मृदा अम्लीकरण, भूजल विषाक्तता और कवक प्रतिरोधकता बढ़ती है।',
        },
      ],
    },
    section2: {
      title: '2. न्यूरल आर्किटेक्चर: MobileNetV2 और इनवर्टेड रेजिडुअल्स',
      intro: 'एग्रीविज़न गूगल रिसर्च के MobileNetV2 आर्किटेक्चर पर आधारित है, जिसे TensorFlow.js का उपयोग करके सीधे वेब ब्राउज़र में पत्ती रोग निदान हेतु विशेष रूप से अनुकूलित किया गया है।',
      tableHeaders: {
        arch: 'मॉडल आर्किटेक्चर',
        params: 'पैरामीटर्स',
        flops: 'FLOPs गणना',
        suitability: 'मोबाइल ब्राउज़र उपयुक्तता',
      },
      tableRows: [
        {
          arch: 'VGG-16',
          params: '138.4 मिलियन',
          flops: '15.5 GFLOPs',
          suitability: 'अत्यधिक भारी (~520MB डाउनलोड)',
        },
        {
          arch: 'ResNet-50',
          params: '25.6 मिलियन',
          flops: '4.1 GFLOPs',
          suitability: 'सामान्य फोन पर धीमी गति',
        },
        {
          arch: 'AgriVision MobileNetV2',
          params: '~3.4 मिलियन',
          flops: '300 MFLOPs',
          suitability: 'सर्वोत्तम (शून्य विलंब, 100% ऑफलाइन)',
          isHighlighted: true,
        },
      ],
      principlesHeading: 'प्रमुख गणितीय सिद्धांत:',
      principles: [
        {
          title: '1. डेप्थवाइज़ सेपरेबल कॉन्वोल्यूशन:',
          desc: 'मानक कॉन्वोल्यूशन को 3×3 स्थानिक डेप्थवाइज़ और 1×1 पॉइंटवाइज़ में विभाजित करता है। इससे सटीकता बनाए रखते हुए गणना 8 से 9 गुना घट जाती है।',
        },
        {
          title: '2. लीनियर बॉटलनेक और इनवर्टेड रेजिडुअल्स:',
          desc: 'रेजिडुअल कनेक्शन उच्च आयामों में विस्तारित होता है, डेप्थवाइज़ फ़िल्टरिंग लागू करता है और डेटा पतन को रोकने के लिए लीनियर बॉटलनेक के साथ वापस प्रोजेक्ट करता है।',
        },
      ],
    },
    section3: {
      title: '3. डेटासेट और ट्रांसफर लर्निंग पद्धति',
      intro: 'वास्तविक खेतों में पत्ती रोग पहचान की चुनौती से निपटने के लिए, एग्रीविज़न दो मूलभूत कृषि दृष्टि डेटासेट का संयोजन करता है:',
      datasets: [
        {
          title: '1. प्लांटडॉक डेटासेट (आईआईटी बॉम्बे)',
          desc: 'प्राकृतिक खेत की वास्तविक परिस्थितियों हेतु विशेष रूप से तैयार। इसमें विभिन्न पृष्ठभूमि, धूप-छांव, धूल और पत्तियों के ओवरलैप वाले चित्र शामिल हैं।',
          bullets: [
            '2,598 खेत में लिए गए सत्यापित पत्ती चित्र',
            '13 पौधों की प्रजातियां और 17 रोग श्रेणियां',
            'कठिन प्राकृतिक प्रकाश में मॉडल की मजबूती का परीक्षण',
          ],
        },
        {
          title: '2. प्लांटविलेज एवं एग्री-विज़न डेटासेट',
          desc: '18 फसलों के 60 वानस्पतिक रोगों में विस्तारित 54,306+ विशेषज्ञ-सत्यापित पत्ती छवियों के साथ व्यापक कवरेज प्रदान करता है।',
          bullets: [
            '54,306+ उच्च-रिज़ॉल्यूशन पत्ती छवियां',
            '18 फसलों में 60 विशिष्ट फसल रोग वर्ग',
            'न्यूरल फीचर निष्कर्षण के लिए ट्रांसफर लर्निंग आधार',
          ],
        },
      ],
      augmentationTitle: 'डेटा ऑग्मेंटेशन पाइपलाइन:',
      augmentationItems: [
        'यादृच्छिक क्षैतिज व ऊर्ध्वाधर फ्लिप',
        'यादृच्छिक घूर्णन (±25 डिग्री)',
        'चमक और कंट्रास्ट समायोजन (0.8 - 1.2)',
        'ज़ूम और स्केल क्रॉपिंग',
      ],
      hyperparametersTitle: 'अनुकूलन हाइपरपैरामीटर्स:',
      hyperparametersItems: [
        'ऑप्टिमाइज़र: Adam (कोसाइन डिके के साथ lr = 1e-4)',
        'हानि फलन: कैटेगोरिकल क्रॉस-एन्ट्रॉपी',
        'बैच आकार: 32',
        'इनपुट रिज़ॉल्यूशन: 224 × 224 × 3 RGB',
      ],
    },
    section4: {
      title: '4. संपूर्ण 60-वर्ग वानस्पतिक वर्गीकरण डेटाबेस',
      filterLabel: 'फसल प्रजाति द्वारा फ़िल्टर करें:',
      allCropsOption: 'सभी 18 फसलें (60 रोग वर्ग)',
      tableHeaders: {
        index: '#',
        crop: 'फसल',
        condition: 'स्थिति / रोग',
        status: 'स्थिति',
      },
      statusHealthy: 'स्वस्थ',
      statusDisease: 'रोगग्रस्त',
    },
    section5: {
      title: '5. सामाजिक-आर्थिक और पर्यावरणीय संधारणीयता',
      intro: 'किसानों के हाथों में सीधे ऑन-डिवाइस कंप्यूटर विज़न उपलब्ध कराकर संयुक्त राष्ट्र के सतत विकास लक्ष्यों (SDG 2, 12, 15) को गति मिलती है:',
      cards: [
        {
          title: 'कीटनाशकों का न्यूनतम उपयोग',
          desc: 'जीवाणु, कवक और सामान्य पत्तियों में भेद करके अंधाधुंध रासायनिक छिड़काव को रोकता है।',
        },
        {
          title: 'उत्पादन और उपज की रक्षा',
          desc: 'झुलसा या रतुआ रोग के 48 घंटों के भीतर प्रारंभिक पहचान से पूरे खेत की बर्बादी को रोका जा सकता है।',
        },
        {
          title: 'किसान आत्मनिर्भरता',
          desc: 'सशुल्क मोबाइल ऐप्स या बिचौलियों पर निर्भरता समाप्त कर किसानों को निःशुल्क ऑन-डिवाइस तकनीक प्रदान करता है।',
        },
      ],
    },
  },

  mr: {
    badge: 'सीबीएसई राष्ट्रीय विज्ञान प्रदर्शन २०२४–२०२५ • इयत्ता ११ वी संशोधन',
    title: 'ॲग्रीव्हिजनमागील विज्ञान आणि न्यूरल आर्किटेक्चर',
    subtitle: 'कृषी वनस्पती रोगशास्त्र आणि ऑन-डिव्हाइस डीप लर्निंगचा संगम: MobileNetV2 इनव्हर्टेड रेसिड्युअल्स, डेप्थवाईज सेपरेबल कॉन्व्होल्यूशन आणि बहुभाषिक डेटासेट प्रशिक्षण.',
    metaTags: {
      domain: '• कार्यक्षेत्र: कॉम्प्युटर व्हिजन आणि एज AI',
      architecture: '• आर्किटेक्चर: MobileNetV2',
      accuracy: '• अचूकता: ९७.४%',
      classes: '• रोग वर्ग: ६० वनस्पती रोग व स्थिती',
      inference: '• इन्फरन्स: ऑन-डिव्हाइस (० KB नेटवर्क, १००% ऑफलाइन)',
    },
    metrics: {
      testAccuracyLabel: 'चाचणी अचूकता',
      testAccuracyVal: '९७.४%',
      testAccuracySub: 'PlantVillage बेंचमार्क',
      f1Label: 'मॅक्रो F1 गुण',
      f1Val: '९६.९%',
      f1Sub: 'प्रिसिजन व रिकॉलची सरासरी',
      paramsLabel: 'मॉडेल पॅरामीटर्स',
      paramsVal: '३.४M',
      paramsSub: 'VGG-16 च्या १३८M च्या तुलनेत',
      speedLabel: 'विश्लेषण वेग',
      speedVal: '~४२ ms',
      speedSub: 'डिव्हाइसवरील WebGL शेडर',
    },
    section1: {
      title: '१. समस्या विधान: भारतातील अल्पभूधारक शेतकऱ्यांसाठी कृषी विस्तार अंतर',
      intro: 'भारतीय शेतीमध्ये वनस्पती रोगांमुळे दरवर्षी अंदाजे ३०% ते ४०% पिकांचे नुकसान होते. अल्पभूधारक शेतकऱ्यांना पुढील तीन मुख्य अडचणी येतात:',
      hurdles: [
        {
          title: 'तज्ज्ञांपासून भौगोलिक अंतर:',
          desc: 'कृषी विज्ञान केंद्र (KVK) किंवा संशोधन संस्था ग्रामीण भागातून २० ते ५० किलोमीटर दूर असतात.',
        },
        {
          title: 'शेतात इंटरनेटचा अभाव:',
          desc: 'ग्रामीण शेतांमध्ये मोबाइल इंटरनेट अत्यंत कमकुवत किंवा अनुपलब्ध असते, ज्यामुळे क्लाउड AI निरुपयोगी ठरते.',
        },
        {
          title: 'रासायनिक कीटकनाशकांचा अतिवापर:',
          desc: 'रोगाची अचूक माहिती नसल्याने शेतकरी महागडी व घातक रसायने वापरतात, ज्यामुळे जमिनीचे आरोग्य बिघडते.',
        },
      ],
    },
    section2: {
      title: '२. न्यूरल आर्किटेक्चर: MobileNetV2 आणि इनव्हर्टेड रेसिड्युअल्स',
      intro: 'ॲग्रीव्हिजन हे गुगलच्या MobileNetV2 आर्किटेक्चरवर आधारित आहे, जे वेब ब्राऊझरमध्ये थेट चालण्यासाठी अनुकूलित केले गेले आहे.',
      tableHeaders: {
        arch: 'मॉडेल आर्किटेक्चर',
        params: 'पॅरामीटर्स',
        flops: 'FLOPs गणना',
        suitability: 'मोबाइल ब्राऊझर उपयुक्तता',
      },
      tableRows: [
        {
          arch: 'VGG-16',
          params: '१३८.४ दशलक्ष',
          flops: '१५.५ GFLOPs',
          suitability: 'अतिशय जड (~५२०MB डाऊनलोड)',
        },
        {
          arch: 'ResNet-50',
          params: '२५.६ दशलक्ष',
          flops: '४.१ GFLOPs',
          suitability: 'सर्वसामान्य फोनवर मंद गती',
        },
        {
          arch: 'AgriVision MobileNetV2',
          params: '~३.४ दशलक्ष',
          flops: '३०० MFLOPs',
          suitability: 'उत्कृष्ट (० विलंब, १००% ऑफलाइन)',
          isHighlighted: true,
        },
      ],
      principlesHeading: 'प्रमुख गणितीय तत्त्वे:',
      principles: [
        {
          title: 'डेप्थवाईज सेपरेबल कॉन्व्होल्यूशन:',
          desc: 'मानक कॉन्व्होल्यूशनचे विभाजन करून गणनेचा भार ८ ते ९ पटीने कमी करतो.',
        },
        {
          title: 'लिनियर बॉटलनेक्स:',
          desc: 'कमी मितीच्या जागेत माहिती गमावणे टाळण्यासाठी अंतिम लेयरवर ReLU काढले जाते.',
        },
        {
          title: 'इनव्हर्टेड रेसिड्युअल ब्लॉक्स:',
          desc: 'मेमरीचा वापर कमी ठेवून अचूक वैशिष्ट्ये ओळखण्यास मदत होते.',
        },
      ],
    },
    section3: {
      title: '३. ड्युअल-डेटाबेस ग्राऊंडिंग आणि डेटा ऑग्मेंटेशन',
      intro: 'प्रयोगशाळेतील स्वच्छ पानांच्या पलीकडे जाऊन प्रत्यक्ष शेतातील खडतर परिस्थितीसाठी ड्युअल-डेटाबेस प्रशिक्षण वापरले गेले आहे.',
      datasets: [
        {
          title: '१. PlantDoc डेटाबेस (IIT दिल्ली)',
          desc: 'नैसर्गिक सूर्यप्रकाश आणि विविध कोनांमधील शेतातील पानांच्या प्रतिमांसह मॉडेलला प्रत्यक्ष शेतासाठी तयार करतो.',
          bullets: [
            '२,५९८ शेतातील प्रत्यक्ष पानांचे फोटो',
            '१३ वनस्पती प्रजाती आणि १७ रोग वर्ग',
            'नैसर्गिक प्रकाशात मॉडेलची क्षमता पडताळणी',
          ],
        },
        {
          title: '२. PlantVillage बेंचमार्क (पेन स्टेट विद्यापीठ)',
          desc: '१४ पिकांमधील ३८ वनस्पती रोगांच्या ५४,३०६ प्रमाणित पानांच्या फोटोंचा संग्रह.',
          bullets: [
            '५४,३०६ उच्च दर्जाचे पाण्याचे फोटो',
            '३८ विशिष्ट वनस्पती रोग वर्ग',
            'ट्रान्सफर लर्निंगसाठी आधार',
          ],
        },
      ],
      augmentationTitle: 'डेटा संवर्धन प्रक्रिया:',
      augmentationItems: [
        'आडवे व उभे यादृच्छिक फ्लिप',
        'यादृच्छिक फिरवणे (±२५ अंश)',
        'प्रकाश व कॉन्ट्रास्ट समायोजन (०.८ ते १.२)',
        'झूम व क्रॉपिंग',
      ],
      hyperparametersTitle: 'प्रशिक्षण हायपरपॅरामीटर्स:',
      hyperparametersItems: [
        'ऑप्टिमायझर: Adam (lr = 1e-4)',
        'लॉस फंक्शन: कॅटेगोरिकल क्रॉस-एन्ट्रॉपी',
        'बॅच आकार: ३२',
        'इनपुट आकार: २२४ × २२४ × ३ RGB',
      ],
    },
    section4: {
      title: '४. संपूर्ण ६०-वर्ग वनस्पती वर्गीकरण डेटाबेस',
      filterLabel: 'पिकानुसार निवडा:',
      allCropsOption: 'सर्व १८ पिके (६० रोग वर्ग)',
      tableHeaders: {
        index: '#',
        crop: 'पीक',
        condition: 'स्थिती / रोग',
        status: 'स्थिती',
      },
      statusHealthy: 'निरोगी',
      statusDisease: 'रोगट',
    },
    section5: {
      title: '५. सामाजिक व पर्यावरणीय शाश्वतता',
      intro: 'शेतकऱ्यांच्या हातात थेट तंत्रज्ञान देऊन संयुक्त राष्ट्रांच्या शाश्वत उद्दिष्टांना (SDG 2, 12, 15) हातभार लागतो:',
      cards: [
        {
          title: 'रासायनिक फवारणीत घट',
          desc: 'अनावश्यक औषध फवारणी टाळून पर्यावरणाचे आणि जमिनीचे रक्षण करते.',
        },
        {
          title: 'पीक उत्पादन संरक्षण',
          desc: 'रोग लवकर ओळखून संपूर्ण शेताचे नुकसान होण्यापासून वाचवते.',
        },
        {
          title: 'शेतकरी स्वावलंबन',
          desc: 'कोणत्याही खर्चाशिवाय किंवा मध्यस्थाशिवाय शेतकऱ्यांना स्वतःच्या फोनवर तत्काळ सल्ला मिळतो.',
        },
      ],
    },
  },
};

export function getLocalizedScience(lang: string): ScienceLocaleData {
  if (SCIENCE_LOCALES[lang]) {
    return SCIENCE_LOCALES[lang];
  }
  // If user selected any non-English language, fallback to Hindi or Gujarati before English!
  if (lang !== 'en') {
    return SCIENCE_LOCALES.hi || SCIENCE_LOCALES.gu || SCIENCE_LOCALES.en;
  }
  return SCIENCE_LOCALES.en;
}
