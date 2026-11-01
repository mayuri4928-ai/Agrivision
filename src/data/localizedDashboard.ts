import { LanguageCode } from '../types';

export interface DashboardTranslations {
  title: string;
  badge: string;
  desc: string;
  changeState: string;
  modelReady: string;
  modelInit: string;
  newScan: string;
  testLab: string;
  // Tabs
  tabOverview: string;
  tabScans: string;
  tabRisk: string;
  tabCrops: string;
  tabEngine: string;
  tabHelpline: string;
  // KPI
  kpiScansLogged: string;
  kpiStoredLocally: string;
  kpiNoScansYet: string;
  kpiHealthIndex: string;
  kpiHealthyInfected: (h: number, d: number) => string;
  kpiTopCrop: string;
  kpiPrimaryCrop: string;
  kpiNone: string;
  kpiIdentifiedCondition: string;
  kpiFrequentPathogen: string;
  // Outbreak Advisory
  advisoryTitle: (state: string) => string;
  activeAlert: string;
  majorCropsMonitored: (state: string) => string;
  dialKvk: string;
  viewRadar: string;
  // Recent Diagnoses
  recentTitle: string;
  recentSubtitle: string;
  viewAll: (count: number) => string;
  noScansTitle: string;
  noScansDesc: string;
  scanNowBtn: string;
  sampleLeavesBtn: string;
  statusHealthy: string;
  statusDiseased: string;
  confidence: string;
  reviewBtn: string;
  // Helplines & Edge
  kisanHelplineTitle: string;
  kisanConsultTime: string;
  tollFreeIndia: string;
  availableLanguages: string;
  stateLine: (state: string) => string;
  edgeBadge: string;
  edgeDesc: string;
  networkOnline: string;
  networkOffline: string;
  localFirst: string;
  // My Scans Tab
  myScansTitle: string;
  myScansSubtitle: (count: number) => string;
  exportCsv: string;
  exportJson: string;
  searchScansPlaceholder: string;
  filterAll: string;
  filterHealthy: string;
  filterDiseased: string;
  noMatchingScans: string;
  noMatchingDesc: string;
  healthyLeaf: string;
  pathogenDetected: string;
  deleteTitle: string;
  deleteConfirm: string;
  noExportData: string;
  viewFullReport: string;
  // Risk Radar Tab
  riskTitle: string;
  riskSubtitle: (state: string) => string;
  switchStateBtn: string;
  fungalRisk: string;
  fungalDesc: string;
  fungalPrev: string;
  bacterialRisk: string;
  bacterialDesc: string;
  bacterialPrev: string;
  viralRisk: string;
  viralDesc: string;
  viralPrev: string;
  highRisk: string;
  moderateRisk: string;
  monitoredRisk: string;
  icarTableTitle: (state: string) => string;
  thCrop: string;
  thDisease: string;
  thWindow: string;
  thPractice: string;
  windowKharif: string;
  defaultPractice: string;
  // Catalog Tab
  catalogTitle: string;
  catalogSubtitle: string;
  fullEncyclopediaBtn: string;
  searchCatalogPlaceholder: string;
  allCropsOption: string;
  allPathogensOption: string;
  optFungal: string;
  optBacterial: string;
  optViral: string;
  optHealthy: string;
  classLabel: string;
  studySymptoms: string;
  // Engine Tab
  engineTitle: string;
  engineSubtitle: string;
  latencyLabel: string;
  latencyDesc: string;
  footprintLabel: string;
  footprintDesc: string;
  tensorLabel: string;
  tensorDesc: string;
  benchmarkLabel: string;
  benchmarkDesc: string;
  flowTitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  step4Title: string;
  step4Desc: string;
  offlineZeroBytes: string;
  edgeVerified: string;
  // Kisan Support Tab
  supportTitle: string;
  supportSubtitle: string;
  kccTitle: string;
  kccDept: string;
  kccNumberLabel: string;
  kccHours: string;
  kccDesc: string;
  kvkUniversity: (state: string) => string;
  kvkDept: string;
  kvkHelplinesLabel: string;
  agroZoneLabel: string;
  emergencyTitle: string;
  emergencyDesc: string;
}

const enDashboard: DashboardTranslations = {
    title: 'AgriVision Crop Intelligence Dashboard',
    badge: 'Kisan Command',
    desc: 'Real-time crop pathology telemetry, field scan records, on-device AI diagnostic statistics, and regional disease outbreak radar tailored to Indian agriculture.',
    changeState: 'Change State',
    modelReady: 'MobileNetV2 On-Device (WebGL Active)',
    modelInit: 'Model Initializing',
    newScan: 'Launch New Scan',
    testLab: 'Test Lab (60 Leaves)',
    tabOverview: 'Overview & Health KPI',
    tabScans: 'My Field Scans',
    tabRisk: 'Regional Risk Radar',
    tabCrops: 'Disease Catalog (60 Classes)',
    tabEngine: 'AI Neural Engine',
    tabHelpline: 'Kisan Support & KVK',
    kpiScansLogged: 'Field Scans Logged',
    kpiStoredLocally: 'Stored locally in device memory',
    kpiNoScansYet: 'No scans performed yet',
    kpiHealthIndex: 'Field Health Index',
    kpiHealthyInfected: (h, d) => `${h} healthy • ${d} infected`,
    kpiTopCrop: 'Top Field Crop',
    kpiPrimaryCrop: 'Primary monitored crop',
    kpiNone: 'None',
    kpiIdentifiedCondition: 'Identified Condition',
    kpiFrequentPathogen: 'Most frequent pathogen',
    advisoryTitle: (state) => `Regional Outbreak Advisory — ${state}`,
    activeAlert: 'Active Season Alert',
    majorCropsMonitored: (state) => `Major Crops Monitored in ${state}:`,
    dialKvk: 'Dial KVK Desk',
    viewRadar: 'View Radar',
    recentTitle: 'Recent Field Diagnoses',
    recentSubtitle: 'Your latest on-device leaf evaluations',
    viewAll: (count) => `View all (${count})`,
    noScansTitle: 'No field scans recorded yet',
    noScansDesc: 'Scan a leaf using your camera or pick a verified leaf from the Test Lab to start tracking crop health on this device.',
    scanNowBtn: 'Take a Photo / Scan',
    sampleLeavesBtn: 'Try Sample Leaves',
    statusHealthy: 'Healthy',
    statusDiseased: 'Diseased',
    confidence: 'confidence',
    reviewBtn: 'Review',
    kisanHelplineTitle: 'National Kisan Helpline',
    kisanConsultTime: 'Free Agronomist Consult (6 AM - 10 PM)',
    tollFreeIndia: 'Toll-Free All India:',
    availableLanguages: 'Available in 22 regional Indian languages.',
    stateLine: (state) => `${state} State Line:`,
    edgeBadge: '100% Private Edge Computing',
    edgeDesc: 'Your farm images and crop location stay exclusively on this device. No data is ever uploaded to remote servers or third-party trackers.',
    networkOnline: 'Online (Cached)',
    networkOffline: 'Offline (Full AI Active)',
    localFirst: 'Local-First',
    myScansTitle: 'My Field Scans & Diagnostics',
    myScansSubtitle: (count) => `Complete record of crop leaf images diagnosed on this phone (${count} total)`,
    exportCsv: 'Export CSV',
    exportJson: 'Export JSON',
    searchScansPlaceholder: 'Search by crop, disease, or state...',
    filterAll: 'All',
    filterHealthy: 'Healthy',
    filterDiseased: 'Diseased',
    noMatchingScans: 'No matching scans found',
    noMatchingDesc: 'Try changing your search terms or filter selection.',
    healthyLeaf: 'Healthy Leaf',
    pathogenDetected: 'Pathogen Detected',
    deleteTitle: 'Delete this record',
    deleteConfirm: 'Delete this diagnosis record from device storage?',
    noExportData: 'No scan history to export yet. Perform a scan first!',
    viewFullReport: 'View Full Report & Audio',
    riskTitle: 'Regional Agro-Climatic Risk Radar',
    riskSubtitle: (state) => `Seasonal plant pathology threat forecast calibrated for ${state}`,
    switchStateBtn: 'Switch State / Zone',
    fungalRisk: 'Fungal Pathogens',
    fungalDesc: 'Elevated vulnerability for Late Blight, Powdery Mildew, and Rust due to morning condensation, high relative humidity (>80%), and cloudy spells.',
    fungalPrev: 'Preventive Action: Prophylactic spray of Mancozeb (2.5g/L) or Trichoderma viride bio-fungicide (5g/L). Avoid overhead sprinkler wetting.',
    bacterialRisk: 'Bacterial Pathogens',
    bacterialDesc: 'Moderate risk for Bacterial Spot and Wilt across Solanaceous crops (Tomato, Pepper, Potato) triggered by rainfall splash and field pooling.',
    bacterialPrev: 'Preventive Action: Copper Oxychloride (3g/L) combined with Streptocycline (1g per 10L). Disinfect cutting tools after pruning.',
    viralRisk: 'Viral Vectors',
    viralDesc: 'Vectors (Whiteflies, Thrips, Aphids) spreading Yellow Leaf Curl & Mosaic Virus. Regular field scouting recommended during warmer dry afternoons.',
    viralPrev: 'Preventive Action: Install 15 yellow sticky traps per acre; apply cold-pressed Neem oil (1500 ppm, 5ml/L) early morning.',
    highRisk: 'HIGH RISK',
    moderateRisk: 'MODERATE',
    monitoredRisk: 'MONITORED',
    icarTableTitle: (state) => `ICAR Recommended Seasonal Management for ${state}`,
    thCrop: 'Monitored Crop',
    thDisease: 'Primary Target Disease',
    thWindow: 'Key Vulnerability Window',
    thPractice: 'Recommended Field Practice',
    windowKharif: 'Kharif / Post-Monsoon Humid Spells',
    defaultPractice: 'Inspect leaf undersides weekly; rogue infected plants; maintain ridge drainage',
    catalogTitle: 'Agronomic Pathology Matrix (60 Classes)',
    catalogSubtitle: '18 agricultural crops and 60 detectable pathology conditions trained on MobileNetV2',
    fullEncyclopediaBtn: 'Full Crop Encyclopedia',
    searchCatalogPlaceholder: 'Search diseases or scientific names...',
    allCropsOption: 'All Crops (18 Species)',
    allPathogensOption: 'All Pathogen Types',
    optFungal: 'Fungal Infections',
    optBacterial: 'Bacterial Blights',
    optViral: 'Viral Diseases',
    optHealthy: 'Healthy Foliage',
    classLabel: 'Class',
    studySymptoms: 'Study symptoms',
    engineTitle: 'On-Device MobileNetV2 Neural Engine',
    engineSubtitle: 'Technical execution pipeline, tensor normalization, and client-side hardware acceleration',
    latencyLabel: 'Inference Latency',
    latencyDesc: 'WebGL 2.0 Accelerated',
    footprintLabel: 'Model Footprint',
    footprintDesc: 'Quantized INT8 weights',
    tensorLabel: 'Tensor Input Shape',
    tensorDesc: 'OffscreenCanvas RGB',
    benchmarkLabel: 'Model Benchmark',
    benchmarkDesc: 'PlantVillage Test Set',
    flowTitle: '[Client-Side Neural Inference Flow]',
    step1Title: '1. Acquisition',
    step1Desc: 'Camera / File input captured. Aspect-ratio preserved and downsampled via OffscreenCanvas.',
    step2Title: '2. Normalization',
    step2Desc: 'Normalized to [-1, 1] range: (pixel / 127.5) - 1.0 across RGB channels.',
    step3Title: '3. Inverted Residuals',
    step3Desc: 'Depthwise separable convolutions & linear bottlenecks execute on phone GPU shaders.',
    step4Title: '4. Softmax Triage',
    step4Desc: '60 logits converted to probabilities. Confidence threshold & noise filtering applied.',
    offlineZeroBytes: 'Zero bytes transmitted to cloud servers. Completely offline operational in remote Indian fields.',
    edgeVerified: 'Edge Verified',
    supportTitle: 'Agricultural Extension & Helpline Directory',
    supportSubtitle: 'Direct toll-free telephonic and extension assistance across Indian agricultural authorities',
    kccTitle: 'Kisan Call Center (KCC)',
    kccDept: 'Ministry of Agriculture & Farmers Welfare',
    kccNumberLabel: 'Toll-Free Phone Number:',
    kccHours: 'Operational 6:00 AM to 10:00 PM, 365 days a year',
    kccDesc: 'Connects directly to agricultural university graduates in your regional language. For severe crop damage, field officers will initiate a ticket for district agronomist field visits.',
    kvkUniversity: (state) => `${state} Agricultural University`,
    kvkDept: 'State Krishi Vigyan Kendra Extension',
    kvkHelplinesLabel: 'State Helpline Contacts:',
    agroZoneLabel: 'Agro-Climatic Zone:',
    emergencyTitle: 'When to Escalate to Field Authorities Immediately',
    emergencyDesc: 'If visual symptoms match quarantine pests (e.g. Tomato Leaf Miner Tuta absoluta, Fall Armyworm, or sudden unexplained vine collapse affecting >20% of the plot within 48 hours), collect 3 affected leaves in a dry paper bag and bring them immediately to your nearest Taluka Agriculture Officer (TAO) or KVK laboratory.',
};

const hiDashboard: DashboardTranslations = {
    title: 'एग्रीविज़न फसल निगरानी डैशबोर्ड',
    badge: 'किसान कमान',
    desc: 'वास्तविक समय में फसल रोग टेलीमेट्री, खेत स्कैन रिकॉर्ड, ऑन-डिवाइस एआई निदान आंकड़े और भारतीय कृषि हेतु अनुकूलित क्षेत्रीय रोग प्रकोप रडार।',
    changeState: 'राज्य बदलें',
    modelReady: 'मोबाइलनेट-वी2 ऑन-डिवाइस (सक्रिय)',
    modelInit: 'मॉडल लोड हो रहा है...',
    newScan: 'नया पत्ती स्कैन करें',
    testLab: 'परीक्षण प्रयोगशाला (60 पत्तियां)',
    tabOverview: 'अवलोकन एवं स्वास्थ्य संकेतक',
    tabScans: 'मेरे खेत के स्कैन',
    tabRisk: 'क्षेत्रीय जोखिम रडार',
    tabCrops: 'रोग सूची (60 श्रेणियां)',
    tabEngine: 'एआई न्यूरल इंजन',
    tabHelpline: 'किसान सहायता एवं केवीके',
    kpiScansLogged: 'दर्ज किए गए स्कैन',
    kpiStoredLocally: 'डिवाइस मेमोरी में सुरक्षित',
    kpiNoScansYet: 'अभी तक कोई स्कैन नहीं हुआ',
    kpiHealthIndex: 'खेत स्वास्थ्य सूचकांक',
    kpiHealthyInfected: (h, d) => `${h} स्वस्थ • ${d} रोगग्रस्त`,
    kpiTopCrop: 'शीर्ष फसल',
    kpiPrimaryCrop: 'मुख्य जांची गई फसल',
    kpiNone: 'कोई नहीं',
    kpiIdentifiedCondition: 'पहचाना गया रोग / स्थिति',
    kpiFrequentPathogen: 'सर्वाधिक मिला रोगजनक',
    advisoryTitle: (state) => `क्षेत्रीय प्रकोप परामर्श — ${state}`,
    activeAlert: 'सक्रिय मौसमी चेतावनी',
    majorCropsMonitored: (state) => `${state} में मुख्य निगरानी वाली फसलें:`,
    dialKvk: 'केवीके को कॉल करें',
    viewRadar: 'रडार देखें',
    recentTitle: 'हाल की फसल जांच',
    recentSubtitle: 'आपके फोन पर की गई नवीनतम पत्ती जांच',
    viewAll: (count) => `सभी देखें (${count})`,
    noScansTitle: 'अभी तक कोई स्कैन दर्ज नहीं है',
    noScansDesc: 'अपने कैमरे से पत्ती की तस्वीर लें या परीक्षण प्रयोगशाला से किसी पत्ती का चयन करके फसल स्वास्थ्य की निगरानी शुरू करें।',
    scanNowBtn: 'फोटो लें / स्कैन करें',
    sampleLeavesBtn: 'नमूना पत्तियां परखें',
    statusHealthy: 'स्वस्थ',
    statusDiseased: 'रोगग्रस्त',
    confidence: 'सटीकता',
    reviewBtn: 'रिपोर्ट देखें',
    kisanHelplineTitle: 'राष्ट्रीय किसान कॉल सेंटर',
    kisanConsultTime: 'मुफ्त कृषि विशेषज्ञ सलाह (सुबह 6 से रात 10 बजे)',
    tollFreeIndia: 'टोल-फ्री अखिल भारतीय नंबर:',
    availableLanguages: '22 भारतीय भाषाओं में उपलब्ध।',
    stateLine: (state) => `${state} राज्य हेल्पलाइन:`,
    edgeBadge: '100% निजी एवं सुरक्षित ऑन-डिवाइस तकनीक',
    edgeDesc: 'आपकी फसल की तस्वीरें और जानकारी पूरी तरह से आपके फोन पर रहती हैं। कोई भी डेटा बाहरी सर्वर पर नहीं भेजा जाता।',
    networkOnline: 'ऑनलाइन (कैश सुरक्षित)',
    networkOffline: 'ऑफलाइन (पूर्ण एआई सक्रिय)',
    localFirst: 'ऑन-डिवाइस',
    myScansTitle: 'मेरे खेत की जांच व इतिहास',
    myScansSubtitle: (count) => `इस फोन पर जांची गई पत्तियों का संपूर्ण विवरण (कुल ${count})`,
    exportCsv: 'सीएसवी निर्यात',
    exportJson: 'जेसन निर्यात',
    searchScansPlaceholder: 'फसल, रोग या राज्य से खोजें...',
    filterAll: 'सभी',
    filterHealthy: 'स्वस्थ',
    filterDiseased: 'रोगग्रस्त',
    noMatchingScans: 'कोई स्कैन नहीं मिला',
    noMatchingDesc: 'खोज शब्द या फ़िल्टर बदल कर देखें।',
    healthyLeaf: 'स्वस्थ पत्ती',
    pathogenDetected: 'रोगजनक मिला',
    deleteTitle: 'यह रिकॉर्ड हटाएं',
    deleteConfirm: 'क्या आप इस निदान रिकॉर्ड को डिवाइस से हटाना चाहते हैं?',
    noExportData: 'निर्यात के लिए कोई डेटा नहीं है। पहले एक स्कैन करें!',
    viewFullReport: 'पूरी रिपोर्ट व आवाज सुनें',
    riskTitle: 'क्षेत्रीय कृषि-जलवायु जोखिम रडार',
    riskSubtitle: (state) => `${state} के लिए मौसमी पादप रोग प्रकोप का पूर्वानुमान`,
    switchStateBtn: 'राज्य / क्षेत्र बदलें',
    fungalRisk: 'फफूंद जनित रोग (कवक)',
    fungalDesc: 'सुबह की ओस, उच्च आर्द्रता (>80%) और बादलों के मौसम के कारण अगेती व पछेती झुलसा, पाउडरी मिल्ड्यू और रतुआ का बढ़ा हुआ जोखिम।',
    fungalPrev: 'बचाव उपाय: मैंकोजेब (2.5 ग्राम/लीटर) या ट्राइकोडर्मा विरिडी (5 ग्राम/लीटर) का छिड़काव करें। पत्तियों पर फव्वारे से पानी देने से बचें।',
    bacterialRisk: 'जीवाणु जनित रोग',
    bacterialDesc: 'बारिश के छीटों और खेत में जलभराव के कारण टमाटर, मिर्च और आलू में जीवाणु धब्बा व उकठा रोग का मध्यम जोखिम।',
    bacterialPrev: 'बचाव उपाय: कॉपर ऑक्सीक्लोराइड (3 ग्राम/लीटर) के साथ स्ट्रेप्टोसाइक्लिन (1 ग्राम प्रति 10 लीटर) का छिड़काव। कटाई के औजारों को साफ रखें।',
    viralRisk: 'विषाणु जनित रोग',
    viralDesc: 'सफेद मक्खी, थ्रिप्स और एफिड्स द्वारा लीफ कर्ल और मोजेक वायरस का प्रसार। दोपहर के शुष्क समय में खेत का मुआयना करें।',
    viralPrev: 'बचाव उपाय: प्रति एकड़ 15 पीले चिपचिपे ट्रैप लगाएं; सुबह के समय नीम तेल (1500 पीपीएम, 5 मिली/लीटर) का छिड़काव करें।',
    highRisk: 'उच्च जोखिम',
    moderateRisk: 'मध्यम',
    monitoredRisk: 'निगरानी में',
    icarTableTitle: (state) => `${state} हेतु आईसीएआर (ICAR) अनुशंसित मौसमी प्रबंधन`,
    thCrop: 'निगरानी वाली फसल',
    thDisease: 'प्रमुख संभावित रोग',
    thWindow: 'अतिसंवेदनशील समय',
    thPractice: 'अनुशंसित कृषि पद्धति',
    windowKharif: 'खरीफ / मानसून उपरांत आर्द्र मौसम',
    defaultPractice: 'सप्ताह में एक बार पत्तियों के निचले हिस्से की जांच करें; संक्रमित पौधों को अलग करें; खेत में जल निकासी सुनिश्चित करें।',
    catalogTitle: 'कृषि रोग सूची (60 श्रेणियां)',
    catalogSubtitle: '18 प्रमुख फसलें और 60 पहचान योग्य रोग स्थितियां',
    fullEncyclopediaBtn: 'संपूर्ण फसल ज्ञानकोश',
    searchCatalogPlaceholder: 'रोग या वैज्ञानिक नाम खोजें...',
    allCropsOption: 'सभी फसलें (18 प्रजातियां)',
    allPathogensOption: 'सभी रोगजनक प्रकार',
    optFungal: 'फफूंद जनित रोग',
    optBacterial: 'जीवाणु जनित रोग',
    optViral: 'विषाणु जनित रोग',
    optHealthy: 'स्वस्थ पत्तियां',
    classLabel: 'श्रेणी',
    studySymptoms: 'लक्षण व उपचार देखें',
    engineTitle: 'ऑन-डिवाइस मोबाइलनेट-वी2 न्यूरल इंजन',
    engineSubtitle: 'तकनीकी निष्पादन पाइपलाइन, टेंसर सामान्यीकरण और हार्डवेयर त्वरण',
    latencyLabel: 'निदान समय',
    latencyDesc: 'वेबजीएल 2.0 त्वरित',
    footprintLabel: 'मॉडल आकार',
    footprintDesc: 'क्वांटाइज्ड INT8 भार',
    tensorLabel: 'इनपुट टेंसर आकार',
    tensorDesc: 'ऑफस्क्रीन कैनवास RGB',
    benchmarkLabel: 'परीक्षण सटीकता',
    benchmarkDesc: 'प्लांटविलेज परीक्षण सेट',
    flowTitle: '[ऑन-डिवाइस न्यूरल निष्पादन प्रवाह]',
    step1Title: '1. छवि अधिग्रहण',
    step1Desc: 'कैमरा या फाइल से इनपुट लिया जाता है। पहलू अनुपात बनाए रखते हुए आकार कम किया जाता है।',
    step2Title: '2. सामान्यीकरण',
    step2Desc: 'RGB चैनलों में [-1, 1] सीमा में सामान्यीकृत: (पिक्सेल / 127.5) - 1.0।',
    step3Title: '3. इनवर्टेड रेजिडुअल्स',
    step3Desc: 'गहराई-वार अलग करने योग्य कनवल्शन और लीनियर बॉटलनेक फोन के जीपीयू पर चलते हैं।',
    step4Title: '4. सॉफ्टमैक्स वर्गीकरण',
    step4Desc: '60 संभावनाओं में रूपांतरण। विश्वास सीमा और शोर फ़िल्टरिंग लागू होती है।',
    offlineZeroBytes: 'क्लाउड सर्वर पर शून्य बाइट भेजी जाती है। दूरदराज के भारतीय खेतों में पूरी तरह ऑफलाइन सक्षम।',
    edgeVerified: 'ऑन-डिवाइस प्रमाणित',
    supportTitle: 'कृषि विस्तार एवं हेल्पलाइन निर्देशिका',
    supportSubtitle: 'भारतीय कृषि प्राधिकरणों से सीधे निःशुल्क टेलीफोनिक और विस्तार सहायता',
    kccTitle: 'किसान कॉल सेंटर (KCC)',
    kccDept: 'कृषि एवं किसान कल्याण मंत्रालय, भारत सरकार',
    kccNumberLabel: 'टोल-फ्री फोन नंबर:',
    kccHours: 'सुबह 6:00 से रात 10:00 बजे, वर्ष के 365 दिन',
    kccDesc: 'आपकी क्षेत्रीय भाषा में कृषि स्नातकों से सीधा संपर्क। गंभीर रोग की स्थिति में जिला कृषि अधिकारी के खेत निरीक्षण हेतु टिकट दर्ज होता है।',
    kvkUniversity: (state) => `${state} कृषि विश्वविद्यालय`,
    kvkDept: 'राज्य कृषि विज्ञान केंद्र (KVK) विस्तार',
    kvkHelplinesLabel: 'राज्य हेल्पलाइन संपर्क:',
    agroZoneLabel: 'कृषि-जलवायु क्षेत्र:',
    emergencyTitle: 'खेत अधिकारियों से तत्काल कब संपर्क करें',
    emergencyDesc: 'यदि लक्षण क्वारंटाइन कीटों (जैसे फॉल आर्मीवर्म, टुटा एब्सोल्युटा या 48 घंटों के भीतर 20% से अधिक फसल का मुरझाना) से मिलते हैं, तो 3 प्रभावित पत्तियां सूखे कागज में लपेटकर तुरंत नजदीकी तालुका कृषि अधिकारी या केवीके प्रयोगशाला में ले जाएं।',
};

const mrDashboard: DashboardTranslations = {
    title: 'अ‍ॅग्रीव्हिजन पीक बुद्धिमत्ता डॅशबोर्ड',
    badge: 'शेतकरी नियंत्रण कक्ष',
    desc: 'थेट पीक रोग निरीक्षण, शेतातील स्कॅन नोंदी, मोबाईलवरील एआय निदान आकडेवारी आणि महाराष्ट्रासह भारतीय शेतीसाठी क्षेत्रीय रोग प्रादुर्भाव रडार.',
    changeState: 'राज्य बदला',
    modelReady: 'मोबाईलनेट-V2 ऑन-डिव्हाइस (सक्रिय)',
    modelInit: 'मॉडेल सुरू होत आहे...',
    newScan: 'नवीन पान स्कॅन करा',
    testLab: 'चाचणी प्रयोगशाळा (६० पाने)',
    tabOverview: 'आढावा व आरोग्य निर्देशांक',
    tabScans: 'माझे शेत स्कॅन',
    tabRisk: 'क्षेत्रीय धोका रडार',
    tabCrops: 'रोग सूची (६० प्रकार)',
    tabEngine: 'एआय न्यूरल इंजिन',
    tabHelpline: 'शेतकरी मदत व केव्हीके',
    kpiScansLogged: 'नोंदवलेले स्कॅन',
    kpiStoredLocally: 'मोबाईल मेमरीमध्ये सुरक्षित',
    kpiNoScansYet: 'अद्याप स्कॅन केलेले नाही',
    kpiHealthIndex: 'पीक आरोग्य निर्देशांक',
    kpiHealthyInfected: (h, d) => `${h} निरोगी • ${d} रोगट`,
    kpiTopCrop: 'प्रमुख पीक',
    kpiPrimaryCrop: 'सर्वाधिक तपासलेले पीक',
    kpiNone: 'काहीही नाही',
    kpiIdentifiedCondition: 'आढळलेला रोग / स्थिती',
    kpiFrequentPathogen: 'वारंवार आढळणारा रोग',
    advisoryTitle: (state) => `क्षेत्रीय रोग सल्ला — ${state}`,
    activeAlert: 'सक्रिय हंगामी इशारा',
    majorCropsMonitored: (state) => `${state} मधील मुख्य पिके:`,
    dialKvk: 'केव्हीकेशी संपर्क साधा',
    viewRadar: 'रडार पहा',
    recentTitle: 'अलीकडील पीक तपासण्या',
    recentSubtitle: 'आपल्या फोनवरील ताजी पाने तपासणी',
    viewAll: (count) => `सर्व पहा (${count})`,
    noScansTitle: 'अद्याप कोणतेही स्कॅन नोंदवलेले नाही',
    noScansDesc: 'कॅमेऱ्याने पानाचा फोटो घ्या किंवा चाचणी प्रयोगशाळेतील नमुना पान निवडून पिकाच्या आरोग्याची नोंद सुरू करा.',
    scanNowBtn: 'फोटो घ्या / स्कॅन करा',
    sampleLeavesBtn: 'नमुने तपासा',
    statusHealthy: 'निरोगी',
    statusDiseased: 'रोगट',
    confidence: 'अचूकता',
    reviewBtn: 'तपासा',
    kisanHelplineTitle: 'राष्ट्रीय किसान कॉल सेंटर',
    kisanConsultTime: 'मोफत कृषी तज्ज्ञ सल्ला (सकाळी 6 ते रात्री 10)',
    tollFreeIndia: 'टोल-फ्री देशव्यापी क्रमांक:',
    availableLanguages: '22 भारतीय प्रादेशिक भाषांमध्ये उपलब्ध.',
    stateLine: (state) => `${state} राज्य हेल्पलाइन:`,
    edgeBadge: '100% खाजगी ऑन-डिव्हाइस विश्लेषण',
    edgeDesc: 'आपल्या पिकांचे फोटो आणि माहिती केवळ आपल्या फोनवरच राहते. कोणताही डेटा सर्व्हरवर पाठवला जात नाही.',
    networkOnline: 'ऑनलाइन (कॅश सुरक्षित)',
    networkOffline: 'ऑफलाइन (पूर्ण एआय सुरू)',
    localFirst: 'स्थानिक-प्रथम',
    myScansTitle: 'माझे शेत स्कॅन व इतिहास',
    myScansSubtitle: (count) => `या फोनवर तपासलेल्या पानांचा संपूर्ण संग्रह (एकूण ${count})`,
    exportCsv: 'CSV निर्यात',
    exportJson: 'JSON निर्यात',
    searchScansPlaceholder: 'पीक, रोग किंवा राज्यानुसार शोधा...',
    filterAll: 'सर्व',
    filterHealthy: 'निरोगी',
    filterDiseased: 'रोगट',
    noMatchingScans: 'जुळणारे स्कॅन सापडले नाहीत',
    noMatchingDesc: 'शोध शब्द किंवा फिल्टर बदलून पहा.',
    healthyLeaf: 'निरोगी पान',
    pathogenDetected: 'रोग आढळला',
    deleteTitle: 'ही नोंद हटवा',
    deleteConfirm: 'ही तपासणी नोंद फोनमधून काढून टाकायची का?',
    noExportData: 'निर्यात करण्यासाठी डेटा नाही. प्रथम स्कॅन करा!',
    viewFullReport: 'सविस्तर अहवाल व आवाज',
    riskTitle: 'क्षेत्रीय कृषी-हवामान धोका रडार',
    riskSubtitle: (state) => `${state} साठी पीक रोग प्रादुर्भावाचा अंदाज`,
    switchStateBtn: 'राज्य / विभाग बदला',
    fungalRisk: 'बुरशीजन्य रोग (कवक)',
    fungalDesc: 'सकाळचे दव, हवेतील जास्त आर्द्रता (>80%) आणि ढगाळ हवामानामुळे करपा, भुरी आणि तांबेरा रोगाचा धोका जास्त.',
    fungalPrev: 'प्रतिबंधात्मक उपाय: मॅन्कोझेब (2.5 ग्रॅम/लिटर) किंवा ट्रायकोडर्मा व्हिरिडी (5 ग्रॅम/लिटर) फवारा. तुषार सिंचनाने पाने भिजवणे टाळा.',
    bacterialRisk: 'जिवाणूजन्य रोग',
    bacterialDesc: 'पावसाचे तुषार व पाणी साचल्यामुळे टोमॅटो, मिरची, बटाटा या पिकांवर जिवाणूजन्य ठिपके व मर रोगाचा मध्यम धोका.',
    bacterialPrev: 'प्रतिबंधात्मक उपाय: कॉपर ऑक्सिक्लोराईड (3 ग्रॅम/लिटर) अधिक स्ट्रेप्टोसायक्लिन (1 ग्रॅम प्रति 10 लिटर). छाटणीची अवजारे निर्जंतुक करा.',
    viralRisk: 'विषाणूजन्य रोग',
    viralDesc: 'पांढरी माशी, थ्रिप्स आणि मावा यांच्यामार्फत पर्णगुच्छ (Leaf Curl) व मोझॅक विषाणूचा प्रसार. दुपारच्या वेळी शेताची पाहणी करा.',
    viralPrev: 'प्रतिबंधात्मक उपाय: एकरी 15 पिवळे चिकट सापळे लावा; सकाळी कडुनिंब तेल (1500 ppm, 5 मिली/लिटर) फवारा.',
    highRisk: 'उच्च धोका',
    moderateRisk: 'मध्यम',
    monitoredRisk: 'निरीक्षणाखाली',
    icarTableTitle: (state) => `${state} साठी आयसीएआर (ICAR) शिफारस केलेले व्यवस्थापन`,
    thCrop: 'निरीक्षणातील पीक',
    thDisease: 'प्रमुख संभाव्य रोग',
    thWindow: 'संवेदनशील काळ',
    thPractice: 'शिफारस केलेली कृषी पद्धती',
    windowKharif: 'खरीप / मान्सूनोत्तर दमट हवामान',
    defaultPractice: 'आठवड्यातून एकदा पानांची खालची बाजू तपासा; बाधित झाडे उपटून नष्ट करा; शेतात चर काढून निचरा ठेवा.',
    catalogTitle: 'कृषी रोग सूची (६० वर्ग)',
    catalogSubtitle: '18 कृषी पिके आणि मोबाईलनेट-V2 द्वारे प्रशिक्षित ६० रोग प्रकार',
    fullEncyclopediaBtn: 'संपूर्ण पीक ज्ञानकोश',
    searchCatalogPlaceholder: 'रोग किंवा शास्त्रीय नाव शोधा...',
    allCropsOption: 'सर्व पिके (18 प्रजाती)',
    allPathogensOption: 'सर्व रोग प्रकार',
    optFungal: 'बुरशीजन्य रोग',
    optBacterial: 'जिवाणूजन्य रोग',
    optViral: 'विषाणूजन्य रोग',
    optHealthy: 'निरोगी पाने',
    classLabel: 'वर्ग',
    studySymptoms: 'लक्षणे व उपाय पहा',
    engineTitle: 'ऑन-डिव्हाइस मोबाईलनेट-V2 न्यूरल इंजिन',
    engineSubtitle: 'तांत्रिक प्रक्रिया, टेन्सर सामान्यीकरण आणि हार्डवेअर गती',
    latencyLabel: 'निदान वेळ',
    latencyDesc: 'WebGL 2.0 गतिवर्धित',
    footprintLabel: 'मॉडेल आकार',
    footprintDesc: 'क्वांटाइज्ड INT8 वजन',
    tensorLabel: 'इनपुट टेन्सर',
    tensorDesc: 'ऑफस्क्रीन कॅनव्हास RGB',
    benchmarkLabel: 'चाचणी अचूकता',
    benchmarkDesc: 'प्लांटव्हिलेज चाचणी संच',
    flowTitle: '[ऑन-डिव्हाइस न्यूरल प्रक्रिया प्रवाह]',
    step1Title: '1. प्रतिमा ग्रहण',
    step1Desc: 'कॅमेरा किंवा फाइलमधून इनपुट घेतले जाते. गुणोत्तर राखून आकार लहान केला जातो.',
    step2Title: '2. सामान्यीकरण',
    step2Desc: 'RGB चॅनेलवर [-1, 1] श्रेणीत सामान्यीकृत केले जाते.',
    step3Title: '3. इन्व्हर्टेड रेसिड्युअल्स',
    step3Desc: 'डेप्थवाइज कन्व्होल्युशन थेट फोनच्या जीपीयूपर चालतात.',
    step4Title: '4. सॉफ्टमॅक्स वर्गीकरण',
    step4Desc: '६० संभाव्यतांमध्ये रूपांतर. विश्वास मर्यादा लागू केली जाते.',
    offlineZeroBytes: 'सर्व्हरवर एकही बाईट पाठवला जात नाही. दुर्गम शेतात पूर्णपणे ऑफलाइन कार्यरत.',
    edgeVerified: 'ऑन-डिव्हाइस प्रमाणित',
    supportTitle: 'कृषी विस्तार व हेल्पलाइन निर्देशिका',
    supportSubtitle: 'भारतीय कृषी संस्थांकडून थेट मोफत दूरध्वनी व मार्गदर्शन सहाय्य',
    kccTitle: 'किसान कॉल सेंटर (KCC)',
    kccDept: 'कृषी व शेतकरी कल्याण मंत्रालय, भारत सरकार',
    kccNumberLabel: 'टोल-फ्री फोन नंबर:',
    kccHours: 'सकाळी 6:00 ते रात्री 10:00, वर्षाचे 365 दिवस',
    kccDesc: 'आपल्या मातृभाषेत कृषी पदवीधरांशी थेट संवाद. गंभीर प्रादुर्भावाच्या वेळी तालुका कृषी अधिकाऱ्यांच्या प्रत्यक्ष भेटीसाठी तक्रार नोंदवली जाते.',
    kvkUniversity: (state) => `${state} कृषी विद्यापीठ`,
    kvkDept: 'राज्य कृषी विज्ञान केंद्र (KVK) विस्तार',
    kvkHelplinesLabel: 'राज्य हेल्पलाइन संपर्क:',
    agroZoneLabel: 'कृषी-हवामान विभाग:',
    emergencyTitle: 'क्षेत्रीय अधिकाऱ्यांशी तात्काळ कधी संपर्क साधावा',
    emergencyDesc: 'जर रोगाची लक्षणे क्वारंटाइन कीटकांसारखी (उदा. टोमॅटो पिनवॉर्म, लष्करी अळी किंवा 48 तासांत 20% पेक्षा जास्त पीक सुकणे) वाटल्यास, 3 बाधित पाने कोरड्या कागदात गुंडाळून तात्काळ जवळच्या तालुका कृषी अधिकारी (TAO) किंवा केव्हीके प्रयोगशाळेत न्या.',
};

const guDashboard: DashboardTranslations = {
    title: 'એગ્રીવિઝન પાક સુરક્ષા ડેશબોર્ડ',
    badge: 'કિસાન કમાન્ડ',
    desc: 'રીયલ-ટાઇમ પાક રોગ નિરીક્ષણ, ખેતર સ્કેન રેકોર્ડ્સ, ફોન પર AI નિદાન અને ગુજરાત તથા ભારતીય ખેતી માટે પ્રાદેશિક રોગ રડાર.',
    changeState: 'રાજ્ય બદલો',
    modelReady: 'મોબાઈલનેટ-V2 સક્રિય (ઓન-ડિવાઇસ)',
    modelInit: 'મોડેલ શરૂ થઈ રહ્યું છે...',
    newScan: 'નવું પાન સ્કેન કરો',
    testLab: 'ટેસ્ટ લેબ (૬૦ પાંદડાં)',
    tabOverview: 'ઝાંખી અને સ્વાસ્થ્ય સૂચકાંક',
    tabScans: 'મારા ખેતરના સ્કેન',
    tabRisk: 'પ્રાદેશિક જોખમ રડાર',
    tabCrops: 'રોગ સૂચિ (૬૦ શ્રેણી)',
    tabEngine: 'AI ન્યુરલ એન્જિન',
    tabHelpline: 'કિસાન સહાય અને KVK',
    kpiScansLogged: 'નોંધાયેલા સ્કેન',
    kpiStoredLocally: 'ડિવાઇસ મેમરીમાં સુરક્ષિત',
    kpiNoScansYet: 'હજુ કોઈ સ્કેન થયેલ નથી',
    kpiHealthIndex: 'પાક સ્વાસ્થ્ય સૂચકાંક',
    kpiHealthyInfected: (h, d) => `${h} તંદુરસ્ત • ${d} રોગગ્રસ્ત`,
    kpiTopCrop: 'મુખ્ય પાક',
    kpiPrimaryCrop: 'સૌથી વધુ ચકાસાયેલ પાક',
    kpiNone: 'કોઈ નથી',
    kpiIdentifiedCondition: 'ઓળખાયેલ રોગ / સ્થિતિ',
    kpiFrequentPathogen: 'વારંવાર જોવા મળતો રોગ',
    advisoryTitle: (state) => `પ્રાદેશિક રોગ સલાહ — ${state}`,
    activeAlert: 'સક્રિય મોસમી ચેતવણી',
    majorCropsMonitored: (state) => `${state} માં મુખ્ય પાક:`,
    dialKvk: 'KVK ને કોલ કરો',
    viewRadar: 'રડાર જુઓ',
    recentTitle: 'તાજેતરની પાક તપાસ',
    recentSubtitle: 'તમારા ફોન પર થયેલી તાજી પાંદડાની તપાસ',
    viewAll: (count) => `બધા જુઓ (${count})`,
    noScansTitle: 'હજુ સુધી કોઈ સ્કેન નોંધાયેલ નથી',
    noScansDesc: 'કેમેરાથી પાંદડાનો ફોટો લો અથવા ટેસ્ટ લેબમાંથી નમૂનો પસંદ કરીને પાકના સ્વાસ્થ્યની નોંધ શરૂ કરો.',
    scanNowBtn: 'ફોટો લો / સ્કેન કરો',
    sampleLeavesBtn: 'નમૂના તપાસો',
    statusHealthy: 'તંદુરસ્ત',
    statusDiseased: 'રોગગ્રસ્ત',
    confidence: 'ચોકસાઈ',
    reviewBtn: 'તપાસો',
    kisanHelplineTitle: 'રાષ્ટ્રીય કિસાન કોલ સેન્ટર',
    kisanConsultTime: 'મફત કૃષિ નિષ્ણાત સલાહ (સવારે 6 થી રાત્રે 10)',
    tollFreeIndia: 'ટોલ-ફ્રી સમગ્ર દેશ નંબર:',
    availableLanguages: '22 ભારતીય પ્રાદેશિક ભાષાઓમાં ઉપલબ્ધ.',
    stateLine: (state) => `${state} રાજ્ય હેલ્પલાઇન:`,
    edgeBadge: '100% ખાનગી ઓન-ડિવાઇસ એનાલિટિક્સ',
    edgeDesc: 'તમારા પાકના ફોટા અને માહિતી માત્ર તમારા ફોનમાં જ રહે છે. કોઈ ડેટા સર્વર પર મોકલવામાં આવતો નથી.',
    networkOnline: 'ઓનલાઇન (કેશ સક્રિય)',
    networkOffline: 'ઓફલાઇન (સંપૂર્ણ AI સક્રિય)',
    localFirst: 'ઓન-ડિવાઇસ',
    myScansTitle: 'મારા ખેતરના સ્કેન અને ઇતિહાસ',
    myScansSubtitle: (count) => `આ ફોન પર તપાસેલા પાંદડાંનો સંપૂર્ણ સંગ્રહ (કુલ ${count})`,
    exportCsv: 'CSV એક્સપોર્ટ',
    exportJson: 'JSON એક્સપોર્ટ',
    searchScansPlaceholder: 'પાક, રોગ અથવા રાજ્ય દ્વારા શોધો...',
    filterAll: 'બધા',
    filterHealthy: 'તંદુરસ્ત',
    filterDiseased: 'રોગગ્રસ્ત',
    noMatchingScans: 'કોઈ સ્કેન મળ્યા નથી',
    noMatchingDesc: 'શોધ શબ્દો અથવા ફિલ્ટર બદલીને પ્રયાસ કરો.',
    healthyLeaf: 'તંદુરસ્ત પાન',
    pathogenDetected: 'રોગ જણાયો',
    deleteTitle: 'આ રેકોર્ડ કાઢી નાખો',
    deleteConfirm: 'શું તમે આ નિદાન રેકોર્ડ ડિવાઇસમાંથી કાઢી નાખવા માંગો છો?',
    noExportData: 'એક્સપોર્ટ કરવા માટે કોઈ ડેટા નથી. પહેલા સ્કેન કરો!',
    viewFullReport: 'સંપૂર્ણ અહેવાલ અને અવાજ',
    riskTitle: 'પ્રાદેશિક કૃષિ-આબોહવા જોખમ રડાર',
    riskSubtitle: (state) => `${state} માટે મોસમી પાક રોગનો અંદાજ`,
    switchStateBtn: 'રાજ્ય / ઝોન બદલો',
    fungalRisk: 'ફૂગજન્ય રોગો (કવક)',
    fungalDesc: 'સવારના ઝાકળ, ઊંચી ભેજવાળી હવા (>80%) અને વાદળછાયા વાતાવરણને કારણે ચરમી, ભૂકી છારો અને ગેરુ રોગનું ઊંચું જોખમ.',
    fungalPrev: 'નિવારક પગલાં: મેન્કોઝેબ (2.5 ગ્રામ/લીટર) અથવા ટ્રાઇકોડર્મા વિરીડી (5 ગ્રામ/લીટર) નો છંટકાવ કરો.',
    bacterialRisk: 'બેક્ટેરિયલ રોગો',
    bacterialDesc: 'વરસાદી છાંટા અને પાણી ભરાવાને લીધે ટામેટા, મરચાં અને બટાટામાં કાળી ટપકી અને સુકારો રોગનું મધ્યમ જોખમ.',
    bacterialPrev: 'નિવારક પગલાં: કોપર ઓક્સીક્લોરાઇડ (3 ગ્રામ/લીટર) સાથે સ્ટ્રેપ્ટોસાયક્લિન (1 ગ્રામ પ્રતિ 10 લીટર) નો છંટકાવ.',
    viralRisk: 'વાઇરલ રોગો',
    viralDesc: 'સફેદ માખી, થ્રિપ્સ અને મોલોમશી દ્વારા કોકડવા (લીફ કર્લ) અને મોઝેક વાઇરસનો ફેલાવો.',
    viralPrev: 'નિવારક પગલાં: એકર દીઠ 15 પીળા ચીકણા ટ્રેપ લગાવો; લીમડાનું તેલ (1500 ppm, 5 મિલી/લીટર) સવારે છાંટો.',
    highRisk: 'ઊંચું જોખમ',
    moderateRisk: 'મધ્યમ',
    monitoredRisk: 'નિરીક્ષણ હેઠળ',
    icarTableTitle: (state) => `${state} માટે ICAR ભલામણ કરેલ વ્યવસ્થાપન`,
    thCrop: 'નિરીક્ષણ હેઠળ પાક',
    thDisease: 'મુખ્ય સંભવિત રોગ',
    thWindow: 'સંવેદનશીલ સમયગાળો',
    thPractice: 'ભલામણ કરેલ પદ્ધતિ',
    windowKharif: 'ખરીફ / ચોમાસા પછીનો ભેજવાળો ગાળો',
    defaultPractice: 'અઠવાડિયે એક વાર પાનની નીચેની બાજુ તપાસો; રોગગ્રસ્ત છોડ દૂર કરો; ખેતરમાં નિતાર વ્યવસ્થા રાખો.',
    catalogTitle: 'કૃષિ રોગ સૂચિ (૬૦ શ્રેણી)',
    catalogSubtitle: '18 મુખ્ય પાક અને ૬૦ રોગ પરિસ્થિતિઓ',
    fullEncyclopediaBtn: 'સંપૂર્ણ પાક જ્ઞાનકોશ',
    searchCatalogPlaceholder: 'રોગ અથવા વૈજ્ઞાનિક નામ શોધો...',
    allCropsOption: 'બધા પાક (18 પ્રજાતિઓ)',
    allPathogensOption: 'બધા રોગ પ્રકાર',
    optFungal: 'ફૂગજન્ય રોગો',
    optBacterial: 'બેક્ટેરિયલ રોગો',
    optViral: 'વાઇરલ રોગો',
    optHealthy: 'તંદુરસ્ત પાંદડાં',
    classLabel: 'શ્રેણી',
    studySymptoms: 'લક્ષણો અને ઉપાય જુઓ',
    engineTitle: 'ઓન-ડિવાઇસ મોબાઈલનેટ-V2 ન્યુરલ એન્જિન',
    engineSubtitle: 'તકનીકી પાઇપલાઇન, ટેન્સર સામાન્યકરણ અને હાર્ડવેર ગતિ',
    latencyLabel: 'નિદાન સમય',
    latencyDesc: 'WebGL 2.0 પ્રવેગિત',
    footprintLabel: 'મોડેલ કદ',
    footprintDesc: 'ક્વોન્ટાઇઝ્ડ INT8 વજન',
    tensorLabel: 'ઇનપુટ ટેન્સર',
    tensorDesc: 'ઓફસ્ક્રીન કેનવાસ RGB',
    benchmarkLabel: 'ચકાસણી ચોકસાઈ',
    benchmarkDesc: 'પ્લાન્ટવિલેજ ટેસ્ટ સેટ',
    flowTitle: '[ઓન-ડિવાઇસ ન્યુરલ ઇન્ફરન્સ ફ્લો]',
    step1Title: '1. છબી પ્રાપ્તિ',
    step1Desc: 'કેમેરા અથવા ફાઇલમાંથી ઇનપુટ લેવાય છે. પાસા ગુણોત્તર જાળવીને કદ નાનું કરાય છે.',
    step2Title: '2. સામાન્યકરણ',
    step2Desc: 'RGB ચેનલો પર [-1, 1] શ્રેણીમાં સામાન્યીકરણ.',
    step3Title: '3. ઇન્વર્ટેડ રેસિડ્યુઅલ્સ',
    step3Desc: 'ડેપ્થવાઇઝ કન્વોલ્યુશન સીધા ફોનના GPU પર ચાલે છે.',
    step4Title: '4. સોફ્ટમેક્સ વર્ગીકરણ',
    step4Desc: '૬૦ સંભાવનાઓમાં રૂપાંતરણ. વિશ્વાસ મર્યાદા લાગુ કરાય છે.',
    offlineZeroBytes: 'ક્લાઉડ સર્વર પર એક પણ બાઇટ જતો નથી. સંપૂર્ણપણે ઓફલાઇન કાર્યરત.',
    edgeVerified: 'ઓન-ડિવાઇસ પ્રમાણિત',
    supportTitle: 'કૃષિ વિસ્તરણ અને હેલ્પલાઇન ડાયરેક્ટરી',
    supportSubtitle: 'ભારતીય કૃષિ સંસ્થાઓ તરફથી સીધી મફત ટેલિફોનિક સહાય',
    kccTitle: 'કિસાન કોલ સેન્ટર (KCC)',
    kccDept: 'કૃષિ અને ખેડૂત કલ્યાણ મંત્રાલય, ભારત સરકાર',
    kccNumberLabel: 'ટોલ-ફ્રી ફોન નંબર:',
    kccHours: 'સવારે 6:00 થી રાત્રે 10:00, વર્ષના 365 દિવસ',
    kccDesc: 'તમારી પ્રાદેશિક ભાષામાં કૃષિ સ્નાતકો સાથે સીધો સંપર્ક. ગંભીર રોગની સ્થિતિમાં સ્થળ તપાસ માટે ફરિયાદ નોંધાય છે.',
    kvkUniversity: (state) => `${state} કૃષિ યુનિવર્સિટી`,
    kvkDept: 'રાજ્ય કૃષિ વિજ્ઞાન કેન્દ્ર (KVK) વિસ્તરણ',
    kvkHelplinesLabel: 'રાજ્ય હેલ્પલાઇન સંપર્ક:',
    agroZoneLabel: 'કૃષિ-આબોહવા ઝોન:',
    emergencyTitle: 'ક્યારે ખેતી અધિકારીઓનો તાત્કાલિક સંપર્ક કરવો',
    emergencyDesc: 'જો રોગના લક્ષણો ક્વોરેન્ટાઇન જીવાતો (જેમ કે ટામેટા પિનવોર્મ, ફોલ આર્મીવોર્મ અથવા 48 કલાકમાં 20% થી વધુ પાક સુકાઈ જવો) જેવા જણાય, તો 3 અસરગ્રસ્ત પાંદડાં સૂકા કાગળમાં લપેટીને તાત્કાલિક તાલુકા કૃષિ અધિકારી (TAO) અથવા KVK લેબમાં લઈ જાઓ.',
};

function createDashboardFallback(
  base: DashboardTranslations,
  title: string,
  badge: string,
  tabScans: string,
  tabRisk: string,
  tabCrops: string,
  tabHelpline: string,
  customTestLab?: string
): DashboardTranslations {
  return {
    ...base,
    title,
    badge,
    tabScans,
    tabRisk,
    tabCrops,
    tabHelpline,
    changeState: base.changeState,
    newScan: base.newScan,
    testLab: customTestLab || base.testLab,
    recentTitle: base.recentTitle,
    recentSubtitle: base.recentSubtitle,
    exportCsv: 'CSV',
    exportJson: 'JSON',
  };
}

export const LOCALIZED_DASHBOARD: Record<LanguageCode, DashboardTranslations> = {
  en: enDashboard,
  hi: hiDashboard,
  mr: mrDashboard,
  gu: guDashboard,
  bn: createDashboardFallback(hiDashboard, 'এগ্রিভিশন শস্য পর্যবেক্ষণ ড্যাশবোর্ড', 'কৃষক কমান্ড', 'আমার মাঠের স্ক্যান', 'আঞ্চলিক ঝুঁকি রাডার', 'রোগ তালিকা (৬০ শ্রেণী)', 'কৃষক সহায়তা ও কেভিকে', 'পরীক্ষা ল্যাব (৬০টি পাতা)'),
  te: createDashboardFallback(hiDashboard, 'అగ్రివిజన్ పంట పర్యవేక్షణ డ్యాష్‌బోర్డ్', 'రైతు కమాండ్', 'నా పొలం స్కాన్‌లు', 'ప్రాంతీయ ప్రమాద రాডার', 'వ్యాధుల జాబితా (60 రకాలు)', 'రైతు సహాయం & KVK', 'టెస్ట్ ల్యాబ్ (60 ఆకులు)'),
  ta: createDashboardFallback(hiDashboard, 'அக்ரிவிஷன் பயிர் நுண்ணறிவு தகவல் பலகை', 'விவசாயி கட்டளை', 'எனது வயல் ஸ்கேன்கள்', 'பிராந்திய இடர் ரேடார்', 'நோய் பட்டியல் (60 வகைகள்)', 'விவசாயி உதவி & KVK', 'சோதனை ஆய்வகம் (60 இலைகள்)'),
  kn: createDashboardFallback(hiDashboard, 'ಅಗ್ರಿವಿಷನ್ ಬೆಳೆ ಗುಪ್ತಚರ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್', 'ರೈತ ಕಮಾಂಡ್', 'ನನ್ನ ಹೊಲದ ಸ್ಕ್ಯಾನ್‌ಗಳು', 'ಪ್ರಾದೇಶಿಕ ಅಪಾಯದ ರಾಡಾರ್', 'ರೋಗಗಳ ಪಟ್ಟಿ (60 ವರ್ಗಗಳು)', 'ರೈತ ಸಹಾಯ & KVK', 'ಪರೀಕ್ಷಾ ಲ್ಯಾಬ್ (60 ಎಲೆಗಳು)'),
  ml: createDashboardFallback(hiDashboard, 'അഗ്രിവിഷൻ വിള നിരീക്ഷണ ഡാഷ്‌ബോർഡ്', 'കർഷക കമാൻഡ്', 'എന്റെ ഫീൽഡ് സ്കാനുകൾ', 'പ്രാദേശിക അപകട റഡാർ', 'രോഗ വിവരപ്പട്ടിക (60 ഇനങ്ങൾ)', 'കർഷക സഹായം & KVK', 'ടെസ്റ്റ് ലാബ് (60 ഇലകൾ)'),
  pa: createDashboardFallback(hiDashboard, 'ਐਗਰੀਵਿਜ਼ਨ ਫ਼ਸਲ ਨਿਗਰਾਨੀ ਡੈਸ਼ਬੋਰਡ', 'ਕਿਸਾਨ ਕਮਾਂਡ', 'ਮੇਰੇ ਖੇਤ ਦੇ ਸਕੈਨ', 'ਖੇਤਰੀ ਜੋਖਮ ਰਾਡਾਰ', 'ਬਿਮਾਰੀ ਸੂਚੀ (60 ਸ਼੍ਰੇਣੀਆਂ)', 'ਕਿਸਾਨ ਸਹਾਇਤਾ ਅਤੇ KVK', 'ਟੈਸਟ ਲੈਬ (60 ਪੱਤੇ)'),
  or: createDashboardFallback(hiDashboard, 'ଏଗ୍ରିଭିଜନ ଫସଲ ନିରୀକ୍ଷଣ ଡ୍ୟାସବୋର୍ଡ', 'କୃଷକ କମାଣ୍ଡ', 'ମୋ କ୍ଷେତ୍ରର ସ୍କାନ', 'ଆଞ୍ଚଳିକ ବିପଦ ରାଡାର', 'ରୋଗ ତାଲିକା (୬୦ ଶ୍ରେଣୀ)', 'କୃଷକ ସହାୟତା ଏବଂ KVK', 'ଟେଷ୍ଟ ଲ୍ୟାବ୍ (୬୦ ପତ୍ର)'),
  as: createDashboardFallback(hiDashboard, 'এগ্ৰিভিজন শস্য নিৰীক্ষণ ডেশ্বব’ৰ্ড', 'কৃষক কমাণ্ড', 'মোৰ পথাৰৰ স্কেন', 'আঞ্চলিক বিপদাশংকা ৰাডাৰ', 'ৰোগ তালিকা (৬০ শ্ৰেণী)', 'কৃষক সহায় আৰু KVK', 'পৰীক্ষাগাৰ (৬০ টা পাত)'),
};

export function getLocalizedDashboard(lang: LanguageCode): DashboardTranslations {
  return LOCALIZED_DASHBOARD[lang] || LOCALIZED_DASHBOARD.hi || LOCALIZED_DASHBOARD.en;
}
