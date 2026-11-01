export interface TestLabLocaleData {
  badgeSuite: string;
  testDateLabel: string;
  title: string;
  subtitle: string;
  benchmarkAccuracy: string;
  ready: string;
  verifiedLabel: string;
  readyImagesLabel: string;
  runBatchBtn: string;
  runningBatchBtn: string;
  resetTestsBtn: string;
  exportJsonBtn: string;
  printReportBtn: string;
  testingImageProgress: string;
  metricTotalSamples: string;
  metricTotalSub: string;
  metricPassed: string;
  metricPassedSub: string;
  metricPartial: string;
  metricPartialSub: string;
  metricLatency: string;
  metricLatencySub: string;
  cropFilterLabel: string;
  allCropsLabel: string;
  statusFilterLabel: string;
  statusAll: string;
  statusPassed: string;
  statusWarnings: string;
  statusUntested: string;
  searchPlaceholder: string;
  passBadge: string;
  partialBadge: string;
  mismatchBadge: string;
  untestedBadge: string;
  expectedLabel: string;
  predictedLabel: string;
  confidenceLabel: string;
  testedTimeLabel: string;
  latencyLabel: string;
  readyForEval: string;
  runTestBtn: string;
  retestBtn: string;
  viewAdvisoryBtn: string;
  historyTitle: string;
  historySubtitle: string;
  specimenSuffix: string;
  pathologicalDesc: string;
  targetGroundTruth: string;
  refDataset: string;
  runTestOnLeaf: string;
  viewFullAdvisory: string;
  recordedSessionsCount: string;
  tableDate: string;
  tableSessionId: string;
  tableSamplesTested: string;
  tableAccuracy: string;
  tablePassWarnings: string;
  tableAvgLatency: string;
  tableEngine: string;
  currentBadge: string;
  specimensSuffix: string;
  passSuffix: string;
  partialSuffix: string;
  clickToZoom: string;
  downloadJson: string;
  printTestSummary: string;
  crops: Record<string, string>;
}

export const TEST_LAB_LOCALES: Record<string, TestLabLocaleData> = {
  en: {
    badgeSuite: 'Automated Disease Test Suite',
    testDateLabel: 'Test Date',
    title: 'Plant Disease Diagnostic Test Lab',
    subtitle: 'Verify diagnostic precision against a comprehensive battery of authentic crop disease specimens sourced from Google Agri-Vision, PlantVillage, and ICAR field archives across all 18 crops and 60 diagnostic classes. Track test dates and accuracy benchmarks.',
    benchmarkAccuracy: 'Benchmark Accuracy',
    ready: 'Ready',
    verifiedLabel: 'verified',
    readyImagesLabel: 'test images ready',
    runBatchBtn: 'Run Complete Test Battery',
    runningBatchBtn: 'Running Batch Tests...',
    resetTestsBtn: 'Reset Tests',
    exportJsonBtn: 'Export JSON',
    printReportBtn: 'Print Report',
    testingImageProgress: 'Testing image',
    metricTotalSamples: 'Total Test Samples',
    metricTotalSub: '60 disease classes across 18 crops',
    metricPassed: 'Tests Passed',
    metricPassedSub: '100% exact botanical match',
    metricPartial: 'Warnings / Partial',
    metricPartialSub: 'Crop matched, close pathogen',
    metricLatency: 'Avg Inference Latency',
    metricLatencySub: 'On-device WebGL execution',
    cropFilterLabel: 'Crop',
    allCropsLabel: 'All Crops',
    statusFilterLabel: 'Status',
    statusAll: 'All',
    statusPassed: 'Passed',
    statusWarnings: 'Warnings',
    statusUntested: 'Untested',
    searchPlaceholder: "Search diseases, crops, or pathogens (e.g., 'Rice Blast', 'Rust', 'Apple')...",
    passBadge: 'PASS',
    partialBadge: 'CROP OK',
    mismatchBadge: 'MISMATCH',
    untestedBadge: 'Untested',
    expectedLabel: 'Expected',
    predictedLabel: 'Predicted',
    confidenceLabel: 'Confidence',
    testedTimeLabel: 'Tested',
    latencyLabel: 'Latency',
    readyForEval: 'Ready for evaluation',
    runTestBtn: 'Run Test',
    retestBtn: 'Re-test',
    viewAdvisoryBtn: 'View Advisory',
    historyTitle: 'Benchmark Test History by Date',
    historySubtitle: 'Historical calibration logs recording test dates, sample counts, and validation accuracy rates.',
    specimenSuffix: 'Leaf Specimen',
    pathologicalDesc: 'Pathological Description',
    targetGroundTruth: 'Target Ground Truth',
    refDataset: 'Reference Dataset',
    runTestOnLeaf: 'Run Test on this Leaf',
    viewFullAdvisory: 'View Full Advisory',
    recordedSessionsCount: 'Recorded Sessions',
    tableDate: 'Test Date & Time',
    tableSessionId: 'Session ID',
    tableSamplesTested: 'Samples Tested',
    tableAccuracy: 'Accuracy',
    tablePassWarnings: 'Pass / Warnings',
    tableAvgLatency: 'Avg Latency',
    tableEngine: 'Engine',
    currentBadge: 'Current',
    specimensSuffix: 'specimens',
    passSuffix: 'pass',
    partialSuffix: 'partial',
    clickToZoom: 'Click to zoom specimen',
    downloadJson: 'Download JSON test report',
    printTestSummary: 'Print test summary',
    crops: {
      all: 'All Crops',
      tomato: 'Tomato',
      potato: 'Potato',
      corn: 'Corn / Maize',
      apple: 'Apple',
      grape: 'Grape',
      pepper: 'Pepper',
      peach: 'Peach',
      strawberry: 'Strawberry',
      rice: 'Rice (Paddy)',
      wheat: 'Wheat',
      cotton: 'Cotton',
      sugarcane: 'Sugarcane',
      orange: 'Orange / Citrus',
      soybean: 'Soybean',
      squash: 'Squash / Cucurbit',
      cherry: 'Cherry',
      blueberry: 'Blueberry',
      raspberry: 'Raspberry',
    },
  },

  gu: {
    badgeSuite: 'સ્વચાલિત પાક રોગ ટેસ્ટ લેબ',
    testDateLabel: 'પરીક્ષણ તારીખ',
    title: 'પાક રોગ નિદાન પ્રયોગશાળા (ટેસ્ટ લેબ)',
    subtitle: 'ગૂગલ એગ્રી-વિઝન, પ્લાન્ટવિલેજ અને ICAR ફિલ્ડ આર્કાઇવ્સમાંથી મેળવેલા તમામ ૧૮ પાકો અને ૬૦ રોગ વર્ગોના અધિકૃત રોગ નમૂનાઓ સામે AI મોડેલની ચોકસાઈ અને ઝડપનું મૂલ્યાંકન કરો.',
    benchmarkAccuracy: 'બેન્ચમાર્ક ચોકસાઈ',
    ready: 'તૈયાર',
    verifiedLabel: 'પ્રમાણિત',
    readyImagesLabel: 'નમૂના ફોટા તૈયાર',
    runBatchBtn: 'સંપૂર્ણ ટેસ્ટ બેટરી ચલાવો',
    runningBatchBtn: 'બેચ ટેસ્ટ ચાલી રહી છે...',
    resetTestsBtn: 'ટેસ્ટ રીસેટ કરો',
    exportJsonBtn: 'JSON રિપોર્ટ ડાઉનલોડ',
    printReportBtn: 'રિપોર્ટ પ્રિન્ટ કરો',
    testingImageProgress: 'નમૂનો તપાસાઈ રહ્યો છે',
    metricTotalSamples: 'કુલ ટેસ્ટ નમૂના',
    metricTotalSub: '૧૮ પાકોના ૬૦ રોગ વર્ગો',
    metricPassed: 'સફળ ટેસ્ટ (પાસ)',
    metricPassedSub: '૧૦૦% સચોટ વનસ્પતિ મેળ',
    metricPartial: 'ચેતવણી / આંશિક મેળ',
    metricPartialSub: 'પાક ઓળખાયો, નજીકનો રોગ',
    metricLatency: 'સરેરાશ AI પ્રક્રિયા સમય',
    metricLatencySub: 'ડિવાઇસ પર WebGL ગણતરી',
    cropFilterLabel: 'પાક',
    allCropsLabel: 'બધા પાક',
    statusFilterLabel: 'સ્થિતિ',
    statusAll: 'બધા',
    statusPassed: 'પાસ થયેલ',
    statusWarnings: 'ચેતવણી',
    statusUntested: 'બાકી',
    searchPlaceholder: 'રોગ, પાક અથવા જીવાણુ શોધો (દા.ત. ડાંગર બ્લાસ્ટ, રતુઆ, સફરજન)...',
    passBadge: 'પાસ (સફળ)',
    partialBadge: 'પાક સાચો',
    mismatchBadge: 'અસંગત',
    untestedBadge: 'અપરીક્ષિત',
    expectedLabel: 'વાસ્તવિક રોગ',
    predictedLabel: 'AI અનુમાન',
    confidenceLabel: 'વિશ્વાસ સ્તર',
    testedTimeLabel: 'તપાસ સમય',
    latencyLabel: 'ઝડપ',
    readyForEval: 'મૂલ્યાંકન માટે તૈયાર',
    runTestBtn: 'ટેસ્ટ ચલાવો',
    retestBtn: 'ફરી ટેસ્ટ કરો',
    viewAdvisoryBtn: 'સંપૂર્ણ સલાહ જુઓ',
    historyTitle: 'તારીખવાર બેન્ચમાર્ક ટેસ્ટ ઇતિહાસ',
    historySubtitle: 'પરીક્ષણ તારીખ, નમૂનાઓની સંખ્યા અને સચોટતાના ઐતિહાસિક લોગ.',
    specimenSuffix: 'પર્ણ નમૂનો',
    pathologicalDesc: 'રોગવિજ્ઞાન સંબંધી વિગત',
    targetGroundTruth: 'નિર્ધારિત વાસ્તવિક રોગ',
    refDataset: 'સંદર્ભ ડેટાસેટ',
    runTestOnLeaf: 'આ પર્ણ પર ટેસ્ટ ચલાવો',
    viewFullAdvisory: 'સંપૂર્ણ સલાહ જુઓ',
    recordedSessionsCount: 'નોંધાયેલા સત્રો',
    tableDate: 'પરીક્ષણ તારીખ અને સમય',
    tableSessionId: 'સત્ર ID',
    tableSamplesTested: 'તપાસેલા નમૂનાઓ',
    tableAccuracy: 'સચોટતા',
    tablePassWarnings: 'પાસ / ચેતવણી',
    tableAvgLatency: 'સરેરાશ સમય',
    tableEngine: 'એન્જિન',
    currentBadge: 'વર્તમાન',
    specimensSuffix: 'નમૂનાઓ',
    passSuffix: 'પાસ',
    partialSuffix: 'આંશિક',
    clickToZoom: 'નમૂનો મોટો કરીને જોવા ક્લિક કરો',
    downloadJson: 'JSON પરીક્ષણ રિપોર્ટ ડાઉનલોડ કરો',
    printTestSummary: 'પરીક્ષણ સારાંશ પ્રિન્ટ કરો',
    crops: {
      all: 'બધા પાક',
      tomato: 'ટામેટાં',
      potato: 'બટાકા',
      corn: 'મકાઈ',
      apple: 'સફરજન',
      grape: 'દ્રાક્ષ',
      pepper: 'મરચાં',
      peach: 'પીચ',
      strawberry: 'સ્ટ્રોબેરી',
      rice: 'ડાંગર / ચોખા',
      wheat: 'ઘઉં',
      cotton: 'કપાસ',
      sugarcane: 'શેરડી',
      orange: 'સંતરા / નારંગી',
      soybean: 'સોયાબીન',
      squash: 'કોળું / કાકડી વર્ગ',
      cherry: 'ચેરી',
      blueberry: 'બ્લુબેરી',
      raspberry: 'રાસ્પબેરી',
    },
  },

  hi: {
    badgeSuite: 'स्वचालित रोग परीक्षण सूट',
    testDateLabel: 'परीक्षण तिथि',
    title: 'पादप रोग निदान परीक्षण प्रयोगशाला (टेस्ट लैब)',
    subtitle: 'गूगल एग्री-विज़न, प्लांटविलेज और ICAR फील्ड अभिलेखागार से प्राप्त सभी 18 फसलों एवं 60 रोग वर्गों के प्रामाणिक फसल रोग नमूनों के विरुद्ध AI मॉडल की सटीकता का सत्यापन करें।',
    benchmarkAccuracy: 'बेंचमार्क सटीकता',
    ready: 'तैयार',
    verifiedLabel: 'सत्यापित',
    readyImagesLabel: 'नमूना चित्र तैयार',
    runBatchBtn: 'संपूर्ण परीक्षण श्रृंखला चलाएं',
    runningBatchBtn: 'बैच परीक्षण जारी है...',
    resetTestsBtn: 'परीक्षण रीसेट करें',
    exportJsonBtn: 'JSON रिपोर्ट निर्यात करें',
    printReportBtn: 'रिपोर्ट प्रिंट करें',
    testingImageProgress: 'नमूना जाँचा जा रहा है',
    metricTotalSamples: 'कुल परीक्षण नमूने',
    metricTotalSub: '18 फसलों के 60 रोग वर्ग',
    metricPassed: 'सफल परीक्षण (पास)',
    metricPassedSub: '100% सटीक वानस्पतिक मिलान',
    metricPartial: 'चेतावनी / आंशिक',
    metricPartialSub: 'फसल सही, निकटतम रोगजनक',
    metricLatency: 'औसत AI प्रक्रिया समय',
    metricLatencySub: 'डिवाइस पर WebGL निष्पादन',
    cropFilterLabel: 'फसल',
    allCropsLabel: 'सभी फसलें',
    statusFilterLabel: 'स्थिति',
    statusAll: 'सभी',
    statusPassed: 'पास हुए',
    statusWarnings: 'चेतावनी',
    statusUntested: 'अपेक्षित',
    searchPlaceholder: 'रोग, फसल या रोगजनक खोजें (जैसे धान झुलसा, रतुआ, सेब)...',
    passBadge: 'पास (सफल)',
    partialBadge: 'फसल सही',
    mismatchBadge: 'अमेल',
    untestedBadge: 'अपेक्षित',
    expectedLabel: 'वास्तविक रोग',
    predictedLabel: 'AI अनुमान',
    confidenceLabel: 'विश्वास स्तर',
    testedTimeLabel: 'परीक्षण समय',
    latencyLabel: 'गति',
    readyForEval: 'मूल्यांकन हेतु तैयार',
    runTestBtn: 'परीक्षण करें',
    retestBtn: 'पुनः परीक्षण',
    viewAdvisoryBtn: 'विस्तृत सलाह देखें',
    historyTitle: 'तिथिवार बेंचमार्क परीक्षण इतिहास',
    historySubtitle: 'परीक्षण तिथि, नमूना संख्या और सटीकता दरों का ऐतिहासिक रिकॉर्ड।',
    specimenSuffix: 'पत्ती नमूना',
    pathologicalDesc: 'रोग संबंधी विवरण',
    targetGroundTruth: 'लक्षित वास्तविक रोग',
    refDataset: 'संदर्भ डेटासेट',
    runTestOnLeaf: 'इस पत्ती पर परीक्षण करें',
    viewFullAdvisory: 'पूरी सलाह देखें',
    recordedSessionsCount: 'दर्ज सत्र',
    tableDate: 'परीक्षण तिथि और समय',
    tableSessionId: 'सत्र आईडी',
    tableSamplesTested: 'जांचे गए नमूने',
    tableAccuracy: 'सटीकता',
    tablePassWarnings: 'पास / चेतावनी',
    tableAvgLatency: 'औसत समय',
    tableEngine: 'इंजन',
    currentBadge: 'वर्तमान',
    specimensSuffix: 'नमूने',
    passSuffix: 'पास',
    partialSuffix: 'आंशिक',
    clickToZoom: 'नमूना बड़ा करके देखने के लिए क्लिक करें',
    downloadJson: 'JSON टेस्ट रिपोर्ट डाउनलोड करें',
    printTestSummary: 'परीक्षण सारांश प्रिंट करें',
    crops: {
      all: 'सभी फसलें',
      tomato: 'टमाटर',
      potato: 'आलू',
      corn: 'मक्का',
      apple: 'सेब',
      grape: 'अंगूर',
      pepper: 'शिमला मिर्च',
      peach: 'आड़ू',
      strawberry: 'स्ट्रॉबेरी',
      rice: 'धान / चावल',
      wheat: 'गेहूं',
      cotton: 'कपास',
      sugarcane: 'गन्ना',
      orange: 'संतरा / नींबू वर्गीय',
      soybean: 'सोयाबीन',
      squash: 'कद्दू वर्गीय',
      cherry: 'चेरी',
      blueberry: 'ब्लूबेरी',
      raspberry: 'रास्पबेरी',
    },
  },

  mr: {
    badgeSuite: 'स्वयंचलित रोग चाचणी संच',
    testDateLabel: 'चाचणी तारीख',
    title: 'पीक रोग निदान चाचणी प्रयोगशाळा (टेस्ट लॅब)',
    subtitle: 'गुगल ॲग्री-व्हिजन, प्लांटव्हिलेज आणि ICAR फील्ड आर्काइव्ह्जमधील सर्व १८ पिके आणि ६० रोग वर्गांच्या अस्सल नमुन्यांविरुद्ध अचूकतेची पडताळणी करा.',
    benchmarkAccuracy: 'बेंचमार्क अचूकता',
    ready: 'तयार',
    verifiedLabel: 'प्रमाणित',
    readyImagesLabel: 'चाचणी पाने तयार',
    runBatchBtn: 'संपूर्ण चाचणी बॅटरी चालवा',
    runningBatchBtn: 'बॅच चाचणी सुरू आहे...',
    resetTestsBtn: 'चाचण्या रीसेट करा',
    exportJsonBtn: 'JSON अहवाल डाउनलोड करा',
    printReportBtn: 'अहवाल मुद्रित करा',
    testingImageProgress: 'नमुना तपासत आहे',
    metricTotalSamples: 'एकूण चाचणी नमुने',
    metricTotalSub: '१८ पिकांचे ६० रोग वर्ग',
    metricPassed: 'यशस्वी चाचण्या (पास)',
    metricPassedSub: '१००% अचूक वनस्पती जुळवणी',
    metricPartial: 'सूचना / अंशतः',
    metricPartialSub: 'पीक योग्य, निकटचा रोगजनक',
    metricLatency: 'सरासरी प्रक्रिया वेळ',
    metricLatencySub: 'डिव्हाइसवर WebGL प्रक्रिया',
    cropFilterLabel: 'पीक',
    allCropsLabel: 'सर्व पिके',
    statusFilterLabel: 'स्थिती',
    statusAll: 'सर्व',
    statusPassed: 'उत्तीर्ण',
    statusWarnings: 'सूचना',
    statusUntested: 'तपासणी बाकी',
    searchPlaceholder: 'रोग, पीक किंवा रोगजनक शोधा (उदा. भात करपा, तांबेरा, सफरचंद)...',
    passBadge: 'उत्तीर्ण (पास)',
    partialBadge: 'पीक योग्य',
    mismatchBadge: 'तफावत',
    untestedBadge: 'तपासणी बाकी',
    expectedLabel: 'अपेक्षित रोग',
    predictedLabel: 'AI अंदाज',
    confidenceLabel: 'विश्वासार्हता',
    testedTimeLabel: 'चाचणी वेळ',
    latencyLabel: 'वेळ',
    readyForEval: 'मूल्यांकनासाठी सज्ज',
    runTestBtn: 'चाचणी घ्या',
    retestBtn: 'पुन्हा चाचणी घ्या',
    viewAdvisoryBtn: 'सल्ला पहा',
    historyTitle: 'तारीखवार चाचणी इतिहास',
    historySubtitle: 'चाचणी तारीख, नमुना संख्या आणि अचूकतेच्या नोंदी.',
    specimenSuffix: 'पानांचा नमुना',
    pathologicalDesc: 'रोगविषयक वर्णन',
    targetGroundTruth: 'अपेक्षित मूळ रोग',
    refDataset: 'संदर्भ डेटासेट',
    runTestOnLeaf: 'या पानावर चाचणी घ्या',
    viewFullAdvisory: 'संपूर्ण सल्ला पहा',
    recordedSessionsCount: 'नोंदवलेली सत्रे',
    tableDate: 'चाचणी तारीख आणि वेळ',
    tableSessionId: 'सत्र आयडी',
    tableSamplesTested: 'तपासलेले नमुने',
    tableAccuracy: 'अचूकता',
    tablePassWarnings: 'उत्तीर्ण / सूचना',
    tableAvgLatency: 'सरासरी वेळ',
    tableEngine: 'इंजिन',
    currentBadge: 'सद्य',
    specimensSuffix: 'नमुने',
    passSuffix: 'उत्तीर्ण',
    partialSuffix: 'अंशतः',
    clickToZoom: 'नमुना मोठा करून पाहण्यासाठी क्लिक करा',
    downloadJson: 'JSON चाचणी अहवाल डाउनलोड करा',
    printTestSummary: 'चाचणी सारांश मुद्रित करा',
    crops: {
      all: 'सर्व पिके',
      tomato: 'टोमॅटो',
      potato: 'बटाटा',
      corn: 'मका',
      apple: 'सफरचंद',
      grape: 'द्राक्ष',
      pepper: 'शिमला मिरची',
      peach: 'सफरचंद/पीच',
      strawberry: 'स्ट्रॉबेरी',
      rice: 'भात / तांदूळ',
      wheat: 'गहू',
      cotton: 'कापूस',
      sugarcane: 'ऊस',
      orange: 'संत्री / लिंबूवर्गीय',
      soybean: 'सोयाबीन',
      squash: 'भोपळा / वेलवर्गीय',
      cherry: 'चेरी',
      blueberry: 'ब्लूबेरी',
      raspberry: 'रास्पबेरी',
    },
  },
};

export function getLocalizedTestLab(lang: string): TestLabLocaleData {
  if (TEST_LAB_LOCALES[lang]) {
    return TEST_LAB_LOCALES[lang];
  }
  if (lang !== 'en') {
    return TEST_LAB_LOCALES.hi || TEST_LAB_LOCALES.mr || TEST_LAB_LOCALES.gu || TEST_LAB_LOCALES.en;
  }
  return TEST_LAB_LOCALES.en;
}
