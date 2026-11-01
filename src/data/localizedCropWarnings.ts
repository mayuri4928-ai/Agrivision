/**
 * Multi-Lingual Translations for Crop Disease Warnings & Outbreak Radar
 * Covers all 12 Indian languages:
 * English (en), Hindi (hi), Gujarati (gu), Marathi (mr), Bengali (bn),
 * Telugu (te), Tamil (ta), Kannada (kn), Malayalam (ml), Punjabi (pa),
 * Odia (or), Assamese (as)
 */

import { LanguageCode } from '../types';
import { LOCALIZED_DISEASES } from './localizedDiseasesData';
import { LOCALIZED_CROP_NAMES } from './localizedCropsAndDiseases';
import { ALL_LOCALIZED_DISEASES, getLocalizedEntryByClass } from './localized/index';

export interface CropWarningUIStrings {
  radarTitle: string;
  radarSubtitle: string;
  verifiedBadge: string;
  selectStateLabel: string;
  allIndiaBtn: string;
  otherStatesLabel: string;
  searchPlaceholder: string;
  allCropsBtn: string;
  cropFilterLabel: string;
  politicalMapBtn: string;
  satelliteMapBtn: string;
  topoMapBtn: string;
  highAlertLabel: string;
  warningLabel: string;
  monitoredLabel: string;
  threatIndexLabel: string;
  microclimateTitle: string;
  tempLabel: string;
  humidityLabel: string;
  symptomsTitle: string;
  immediateActionTitle: string;
  organicSprayLabel: string;
  chemicalMedicineLabel: string;
  callHelplineBtn: string;
  diseaseGuideBtn: string;
  allMonitoredDistrictsTitle: string;
  tapToInspect: string;
  noAlertsFound: string;
  resetFilterBtn: string;
  updatedLabel: string;
  syncAlertsBtn: string;
}

export const CROP_WARNING_UI_LOCALES: Record<LanguageCode, CropWarningUIStrings> = {
  en: {
    radarTitle: 'Political Outbreak Radar & State Boundaries',
    radarSubtitle: 'Authentic political map with real state borders, verified districts & cities, and disease alerts',
    verifiedBadge: 'Real Political Boundaries',
    selectStateLabel: 'Select State:',
    allIndiaBtn: '🇮🇳 All India',
    otherStatesLabel: 'Other States:',
    searchPlaceholder: 'Search districts, cities or diseases...',
    allCropsBtn: 'All Crops',
    cropFilterLabel: 'Crop:',
    politicalMapBtn: 'Political',
    satelliteMapBtn: 'Satellite',
    topoMapBtn: 'Topographic',
    highAlertLabel: 'High Alert',
    warningLabel: 'Warning',
    monitoredLabel: 'Low Risk',
    threatIndexLabel: 'Threat Index',
    microclimateTitle: 'Micro-Climate Outbreak Trigger:',
    tempLabel: 'Temp',
    humidityLabel: 'Humidity',
    symptomsTitle: 'What to look for on your crop (Symptoms):',
    immediateActionTitle: 'Farmer Advisory & Immediate Action:',
    organicSprayLabel: '🌿 Organic / Bio Spray:',
    chemicalMedicineLabel: '🧪 Chemical Medicine:',
    callHelplineBtn: 'Call Free Kisan Helpline',
    diseaseGuideBtn: 'Disease Guide',
    allMonitoredDistrictsTitle: 'All Monitored Districts & Cities:',
    tapToInspect: 'Tap to inspect & focus',
    noAlertsFound: 'No active outbreaks matching filter in this state.',
    resetFilterBtn: 'Reset Filters',
    updatedLabel: 'Updated',
    syncAlertsBtn: 'Sync Alerts',
  },
  hi: {
    radarTitle: 'फसल रोग प्रकोप रडार एवं राज्य सीमाएं',
    radarSubtitle: 'वास्तविक राज्य सीमाओं, जिलों, शहरों और फसल रोग चेतावनियों के साथ राजनीतिक मानचित्र',
    verifiedBadge: 'सत्यापित राजनीतिक मानचित्र',
    selectStateLabel: 'राज्य चुनें:',
    allIndiaBtn: '🇮🇳 सम्पूर्ण भारत',
    otherStatesLabel: 'अन्य राज्य:',
    searchPlaceholder: 'जिले, शहर या फसल रोग खोजें...',
    allCropsBtn: 'सभी फसलें',
    cropFilterLabel: 'फसल:',
    politicalMapBtn: 'राजनीतिक',
    satelliteMapBtn: 'सैटेलाइट',
    topoMapBtn: 'भौगोलिक',
    highAlertLabel: 'गंभीर चेतावनी',
    warningLabel: 'जोखिम चेतावनी',
    monitoredLabel: 'सुरक्षित / सामान्य',
    threatIndexLabel: 'प्रकोप सूचकांक',
    microclimateTitle: 'मौसम व जलवायु अनुकूलता (प्रकोप कारण):',
    tempLabel: 'तापमान',
    humidityLabel: 'आर्द्रता',
    symptomsTitle: 'फसल पर दिखने वाले मुख्य लक्षण (Symptoms):',
    immediateActionTitle: 'किसान सलाह व तत्काल रोकथाम उपाय:',
    organicSprayLabel: '🌿 जैविक / प्राकृतिक छिड़काव:',
    chemicalMedicineLabel: '🧪 रासायनिक दवा व मात्रा:',
    callHelplineBtn: 'टोल-फ्री किसान कॉल सेंटर से बात करें',
    diseaseGuideBtn: 'रोग निर्देशिका',
    allMonitoredDistrictsTitle: 'निगरानी में सभी जिले व शहर:',
    tapToInspect: 'विवरण देखने के लिए टैप करें',
    noAlertsFound: 'इस राज्य में इस फिल्टर के अनुसार कोई गंभीर रोग नहीं है।',
    resetFilterBtn: 'फिल्टर हटाएं',
    updatedLabel: 'अपडेटेड',
    syncAlertsBtn: 'अपडेट करें',
  },
  gu: {
    radarTitle: 'પાક રોગચાળો રડાર અને રાજ્ય સીમાઓ',
    radarSubtitle: 'વાસ્તવિક રાજ્ય સીમાઓ, જિલ્લાઓ, શહેરો અને પાક રોગ ચેતવણીઓ સાથે રાજકીય નકશો',
    verifiedBadge: 'ચકાસાયેલ રાજકીય નકશો',
    selectStateLabel: 'રાજ્ય પસંદ કરો:',
    allIndiaBtn: '🇮🇳 સમગ્ર ભારત',
    otherStatesLabel: 'અન્ય રાજ્યો:',
    searchPlaceholder: 'જિલ્લા, શહેર અથવા રોગ શોધો...',
    allCropsBtn: 'બધા પાકો',
    cropFilterLabel: 'પાક:',
    politicalMapBtn: 'રાજકીય',
    satelliteMapBtn: 'સેટેલાઇટ',
    topoMapBtn: 'ભૌગોલિક',
    highAlertLabel: 'ગંભીર ચેતવણી',
    warningLabel: 'ચેતવણી',
    monitoredLabel: 'ઓછું જોખમ',
    threatIndexLabel: 'જોખમ સૂચકાંક',
    microclimateTitle: 'હવામાન અનુકૂળતા (રોગચાળો કારણ):',
    tempLabel: 'તાપમાન',
    humidityLabel: 'ભેજ',
    symptomsTitle: 'પાક પર દેખાતા મુખ્ય લક્ષણો (Symptoms):',
    immediateActionTitle: 'ખેડૂત સલાહ અને તાત્કાલિક પગલાં:',
    organicSprayLabel: '🌿 જૈવિક / દેશી છંટકાવ:',
    chemicalMedicineLabel: '🧪 રાસાયણિક દવા અને માત્રા:',
    callHelplineBtn: 'કિસાન હેલ્પલાઇન પર મફત કૉલ કરો',
    diseaseGuideBtn: 'રોગ માર્ગદર્શિકા',
    allMonitoredDistrictsTitle: 'દેખરેખ હેઠળના તમામ જિલ્લાઓ અને શહેરો:',
    tapToInspect: 'વિગત જોવા માટે ટૅપ કરો',
    noAlertsFound: 'આ રાજ્યમાં આ ફિલ્ટર અનુસાર કોઈ રોગચાળો નથી.',
    resetFilterBtn: 'ફિલ્ટર રીસેટ કરો',
    updatedLabel: 'અપડેટ',
    syncAlertsBtn: 'અપડેટ કરો',
  },
  mr: {
    radarTitle: 'पीक रोग प्रादुर्भाव रडार व राज्य सीमा',
    radarSubtitle: 'अचूक राजकीय सीमा, जिल्हे, शहरे आणि पीक रोगांच्या सतर्कतेसह वास्तविक नकाशा',
    verifiedBadge: 'राजकीय सीमा नकाशा',
    selectStateLabel: 'राज्य निवडा:',
    allIndiaBtn: '🇮🇳 संपूर्ण भारत',
    otherStatesLabel: 'इतर राज्ये:',
    searchPlaceholder: 'जिल्हा, शहर किंवा रोग शोधा...',
    allCropsBtn: 'सर्व पिके',
    cropFilterLabel: 'पीक:',
    politicalMapBtn: 'राजकीय',
    satelliteMapBtn: 'सॅटेलाइट',
    topoMapBtn: 'भौगोलिक',
    highAlertLabel: 'गंभीर इशारा',
    warningLabel: 'धोका इशारा',
    monitoredLabel: 'कमी धोका',
    threatIndexLabel: 'धोका निर्देशांक',
    microclimateTitle: 'हवामान अनुकूलता (प्रादुर्भाव कारण):',
    tempLabel: 'तापमान',
    humidityLabel: 'आद्रता',
    symptomsTitle: 'पिकावर दिसणारी ठळक लक्षणे (Symptoms):',
    immediateActionTitle: 'शेतकरी सल्ला व त्वरित उपाययोजना:',
    organicSprayLabel: '🌿 सेंद्रिय / जैविक फवारणी:',
    chemicalMedicineLabel: '🧪 रासायनिक औषध व प्रमाण:',
    callHelplineBtn: 'टोल-फ्री किसान हेल्पलाईनवर संपर्क करा',
    diseaseGuideBtn: 'रोग मार्गदर्शिका',
    allMonitoredDistrictsTitle: 'निरीक्षणाखालील सर्व जिल्हे व शहरे:',
    tapToInspect: 'तपशील पाहण्यासाठी टॅप करा',
    noAlertsFound: 'या राज्यात या फिल्टरनुसार कोणताही सक्रिय उद्रेक नाही.',
    resetFilterBtn: 'फिल्टर रीसेट करा',
    updatedLabel: 'अद्यतनित',
    syncAlertsBtn: 'अपडेट करा',
  },
  bn: {
    radarTitle: 'ফসল রোগ প্রাদুর্ভাব রাডার ও সীমানা',
    radarSubtitle: 'বাস্তব রাজনৈতিক সীমানা, জেলা, শহর এবং ফসল রোগের সতর্কবার্তা সহ মানচিত্র',
    verifiedBadge: 'রাজনৈতিক সীমানা',
    selectStateLabel: 'রাজ্য নির্বাচন করুন:',
    allIndiaBtn: '🇮🇳 সমগ্র ভারত',
    otherStatesLabel: 'অন্যান্য রাজ্য:',
    searchPlaceholder: 'জেলা, শহর বা রোগ অনুসন্ধান করুন...',
    allCropsBtn: 'সকল ফসল',
    cropFilterLabel: 'ফসল:',
    politicalMapBtn: 'রাজনৈতিক',
    satelliteMapBtn: 'স্যাটেলাইট',
    topoMapBtn: 'ভূ-প্রকৃতি',
    highAlertLabel: 'মারাত্মক সতর্কতা',
    warningLabel: 'সতর্কতা',
    monitoredLabel: 'কম ঝুঁকি',
    threatIndexLabel: 'ঝুঁকি সূচক',
    microclimateTitle: 'আবহাওয়া জনিত প্রাদুর্ভাব কারণ:',
    tempLabel: 'তাপমাত্রা',
    humidityLabel: 'আর্দ্রতা',
    symptomsTitle: 'ফসলে দৃশ্যমান প্রধান লক্ষণসমূহ:',
    immediateActionTitle: 'কৃষক পরামর্শ ও জরুরি পদক্ষেপ:',
    organicSprayLabel: '🌿 জৈব স্প্রে:',
    chemicalMedicineLabel: '🧪 রাসায়নিক ওষুধ ও মাত্রা:',
    callHelplineBtn: 'বিনামূল্যে কিষাণ হেল্পলাইনে কল করুন',
    diseaseGuideBtn: 'রোগ নির্দেশিকা',
    allMonitoredDistrictsTitle: 'নজরদারির আওতাধীন সকল জেলা ও শহর:',
    tapToInspect: 'বিস্তারিত দেখতে ট্যাপ করুন',
    noAlertsFound: 'এই রাজ্যে এই ফিল্টারে কোন রোগ নেই।',
    resetFilterBtn: 'ফিল্টার মুছুন',
    updatedLabel: 'আপডেট করা হয়েছে',
    syncAlertsBtn: 'সিঙ্ক করুন',
  },
  te: {
    radarTitle: 'పంట తెగుళ్ల వ్యాప్తి రాడార్ & రాష్ట్ర సరిహద్దులు',
    radarSubtitle: 'ఖచ్చితమైన సరిహద్దులు, జిల్లాలు మరియు తెగుళ్ల హెచ్చరికలతో కూడిన నిజమైన రాజకీయ మ్యాప్',
    verifiedBadge: 'రాజకీయ సరిహద్దులు',
    selectStateLabel: 'రాష్ట్రాన్ని ఎంచుకోండి:',
    allIndiaBtn: '🇮🇳 భారతదేశం మొత్తం',
    otherStatesLabel: 'ఇతర రాష్ట్రాలు:',
    searchPlaceholder: 'జిల్లా, నగరం లేదా తెగులును వెతకండి...',
    allCropsBtn: 'అన్ని పంటలు',
    cropFilterLabel: 'పంట:',
    politicalMapBtn: 'రాజకీయ',
    satelliteMapBtn: 'శాటిలైట్',
    topoMapBtn: 'భౌగోళిక',
    highAlertLabel: 'తీవ్రమైన హెచ్చరిక',
    warningLabel: 'హెచ్చరిక',
    monitoredLabel: 'తక్కువ ప్రమాదం',
    threatIndexLabel: 'ముప్పు సూచిక',
    microclimateTitle: 'వాతావరణ పరిస్థితుల ప్రభావం:',
    tempLabel: 'ఉష్ణోగ్రత',
    humidityLabel: 'తేమ',
    symptomsTitle: 'పంటపై కనిపించే ప్రధాన లక్షణాలు:',
    immediateActionTitle: 'రైతు సలహా & తక్షణ నివారణ చర్యలు:',
    organicSprayLabel: '🌿 సేంద్రీయ పిచికారీ:',
    chemicalMedicineLabel: '🧪 రసాయన మందు & మోతాదు:',
    callHelplineBtn: 'ఉచిత కిసాన్ హెల్ప్‌లైన్‌కు కాల్ చేయండి',
    diseaseGuideBtn: 'తెగుళ్ల గైడ్',
    allMonitoredDistrictsTitle: 'పరిశీలనలో ఉన్న అన్ని జిల్లాలు & నగరాలు:',
    tapToInspect: 'చూడటానికి నొక్కండి',
    noAlertsFound: 'ఈ రాష్ట్రంలో తెగుళ్ల వ్యాప్తి నివేదించబడలేదు.',
    resetFilterBtn: 'రీసెట్ చేయండి',
    updatedLabel: 'తాజాకరించబడింది',
    syncAlertsBtn: 'సింక్ చేయండి',
  },
  ta: {
    radarTitle: 'பயிர் நோய் பரவல் ரேடார் & மாநில எல்லைகள்',
    radarSubtitle: 'உண்மையான அரசியல் எல்லைகள், மாவட்டங்கள் மற்றும் நோய் எச்சரிக்கைகளுடன் கூடிய வரைபடம்',
    verifiedBadge: 'அரசியல் வரைபடம்',
    selectStateLabel: 'மாநிலத்தைத் தேர்ந்தெடுக்கவும்:',
    allIndiaBtn: '🇮🇳 அகில இந்தியா',
    otherStatesLabel: 'பிற மாநிலங்கள்:',
    searchPlaceholder: 'மாவட்டம், நகரம் அல்லது நோயைத் தேடுங்கள்...',
    allCropsBtn: 'அனைத்து பயிர்கள்',
    cropFilterLabel: 'பயிர்:',
    politicalMapBtn: 'அரசியல்',
    satelliteMapBtn: 'செயற்கைக்கோள்',
    topoMapBtn: 'புவியியல்',
    highAlertLabel: 'தீவிர எச்சரிக்கை',
    warningLabel: 'எச்சரிக்கை',
    monitoredLabel: 'குறைந்த ஆபத்து',
    threatIndexLabel: 'அச்சுறுத்தல் குறியீடு',
    microclimateTitle: 'வானிலை நோய் தூண்டுதல் காரணம்:',
    tempLabel: 'வெப்பநிலை',
    humidityLabel: 'ஈரப்பதம்',
    symptomsTitle: 'பயிரில் காணப்படும் முக்கிய அறிகுறிகள்:',
    immediateActionTitle: 'விவசாயி ஆலோசனை மற்றும் உடனடி நடவடிக்கைகள்:',
    organicSprayLabel: '🌿 இயற்கை தெளிப்பான்:',
    chemicalMedicineLabel: '🧪 ரசாயன மருந்து & அளவு:',
    callHelplineBtn: 'இலவச கிசான் உதவி மையத்தை அழைக்கவும்',
    diseaseGuideBtn: 'நோய் கையேடு',
    allMonitoredDistrictsTitle: 'கண்காணிக்கப்படும் மாவட்டங்கள் & நகரங்கள்:',
    tapToInspect: 'பார்க்க தட்டவும்',
    noAlertsFound: 'இந்த மாநிலத்தில் தீவிர நோய் பாதிப்பு இல்லை.',
    resetFilterBtn: 'வடிகட்டியை மீட்டமை',
    updatedLabel: 'புதுப்பிக்கப்பட்டது',
    syncAlertsBtn: 'புதுப்பிக்கவும்',
  },
  kn: {
    radarTitle: 'ಬೆಳೆ ರೋಗ ಹರಡುವಿಕೆ ರಾಡಾರ್ & ಗಡಿಗಳು',
    radarSubtitle: 'ನಿಜವಾದ ಗಡಿಗಳು, ಜಿಲ್ಲೆಗಳು ಮತ್ತು ಬೆಳೆ ರೋಗ ಎಚ್ಚರಿಕೆಗಳೊಂದಿಗೆ ನೈಜ ರಾಜಕೀಯ ನಕ್ಷೆ',
    verifiedBadge: 'ರಾಜಕೀಯ ನಕ್ಷೆ',
    selectStateLabel: 'ರಾಜ್ಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ:',
    allIndiaBtn: '🇮🇳 ಸಮಗ್ರ ಭಾರತ',
    otherStatesLabel: 'ಇತರ ರಾಜ್ಯಗಳು:',
    searchPlaceholder: 'ಜಿಲ್ಲೆ, ನಗರ ಅಥವಾ ರೋಗವನ್ನು ಹುಡುಕಿ...',
    allCropsBtn: 'ಎಲ್ಲಾ ಬೆಳೆಗಳು',
    cropFilterLabel: 'ಬೆಳೆ:',
    politicalMapBtn: 'ರಾಜಕೀಯ',
    satelliteMapBtn: 'ಉಪಗ್ರಹ',
    topoMapBtn: 'ಭೌಗೋಳಿಕ',
    highAlertLabel: 'ತೀವ್ರ ಎಚ್ಚರಿಕೆ',
    warningLabel: 'ಎಚ್ಚರಿಕೆ',
    monitoredLabel: 'ಕಡಿಮೆ ಅಪಾಯ',
    threatIndexLabel: 'ಅಪಾಯ ಸೂಚ್ಯಂಕ',
    microclimateTitle: 'ಹವಾಮಾನ ರೋಗ ಪ್ರಚೋದನೆ:',
    tempLabel: 'ತಾಪಮಾನ',
    humidityLabel: 'ಆರ್ದ್ರತೆ',
    symptomsTitle: 'ಬೆಳೆಯ ಮೇಲೆ ಕಂಡುಬರುವ ಮುಖ್ಯ ಲಕ್ಷಣಗಳು:',
    immediateActionTitle: 'ರೈತರ ಸಲಹೆ ಮತ್ತು ತಕ್ಷಣದ ಕ್ರಮಗಳು:',
    organicSprayLabel: '🌿 ಸಾವಯವ ಸಿಂಪಡಣೆ:',
    chemicalMedicineLabel: '🧪 ರಾಸಾಯನಿಕ ಔಷಧಿ ಮತ್ತು ಪ್ರಮಾಣ:',
    callHelplineBtn: 'ಉಚಿತ ಕಿಸಾನ್ ಸಹಾಯವಾಣಿಗೆ ಕರೆ ಮಾಡಿ',
    diseaseGuideBtn: 'ರೋಗ ಮಾರ್ಗದರ್ಶಿ',
    allMonitoredDistrictsTitle: 'ಮೇಲ್ವಿಚಾರಣೆಯಲ್ಲಿರುವ ಎಲ್ಲಾ ಜಿಲ್ಲೆಗಳು:',
    tapToInspect: 'ನೋಡಲು ಟ್ಯಾಪ್ ಮಾಡಿ',
    noAlertsFound: 'ಈ ರಾಜ್ಯದಲ್ಲಿ ಯಾವುದೇ ತೀವ್ರ ರೋಗಗಳಿಲ್ಲ.',
    resetFilterBtn: 'ಮರುಹೊಂದಿಸಿ',
    updatedLabel: 'ನವೀಕರಿಸಲಾಗಿದೆ',
    syncAlertsBtn: 'ನವೀಕರಿಸಿ',
  },
  ml: {
    radarTitle: 'വിള രോഗബാധ റഡാറും സംസ്ഥാന അതിർത്തികളും',
    radarSubtitle: 'യഥാർത്ഥ അതിർത്തികളും ജില്ലകളും രോഗ മുന്നറിയിപ്പുകളും അടങ്ങിയ ഭൂപടം',
    verifiedBadge: 'രാഷ്ട്രീയ ഭൂപടം',
    selectStateLabel: 'സംസ്ഥാനം തിരഞ്ഞെടുക്കുക:',
    allIndiaBtn: '🇮🇳 അഖിലേന്ത്യാ തലം',
    otherStatesLabel: 'മറ്റു സംസ്ഥാനങ്ങൾ:',
    searchPlaceholder: 'ജില്ല, നഗരം അല്ലെങ്കിൽ രോഗം തിരയുക...',
    allCropsBtn: 'എല്ലാ വിളകളും',
    cropFilterLabel: 'വിള:',
    politicalMapBtn: 'രാഷ്ട്രീയം',
    satelliteMapBtn: 'ഉപഗ്രഹം',
    topoMapBtn: 'ഭൗമശാസ്ത്രം',
    highAlertLabel: 'ഗുരുതര ജാഗ്രത',
    warningLabel: 'മുന്നറിയിപ്പ്',
    monitoredLabel: 'കുറഞ്ഞ സാധ്യത',
    threatIndexLabel: 'ഭീഷണി സൂചിക',
    microclimateTitle: 'കാലാവസ്ഥാ രോഗസാധ്യത:',
    tempLabel: 'താപനില',
    humidityLabel: 'ഈർപ്പം',
    symptomsTitle: 'വിളയിൽ കാണപ്പെടുന്ന പ്രധാന ലക്ഷണങ്ങൾ:',
    immediateActionTitle: 'കർഷക നിർദ്ദേശവും അടിയന്തര നടപടികളും:',
    organicSprayLabel: '🌿 ജൈവ സ്പ്രേ:',
    chemicalMedicineLabel: '🧪 രാസകീടനാശിനിയും അളവും:',
    callHelplineBtn: 'സൗജന്യ കിസാൻ ഹെൽപ്പ്‌ലൈനിൽ വിളിക്കുക',
    diseaseGuideBtn: 'രോഗ ഗൈഡ്',
    allMonitoredDistrictsTitle: 'നിരീക്ഷണത്തിലുള്ള ജില്ലകളും നഗരങ്ങളും:',
    tapToInspect: 'വിശദാംശങ്ങൾക്ക് ക്ലിക്ക് ചെയ്യുക',
    noAlertsFound: 'ഈ സംസ്ഥാനത്ത് രോഗബാധ റിപ്പോർട്ട് ചെയ്തിട്ടില്ല.',
    resetFilterBtn: 'ഫിൽട്ടർ പുനഃക്രമീകരിക്കുക',
    updatedLabel: 'അപ്ഡേറ്റ് ചെയ്തത്',
    syncAlertsBtn: 'അപ്ഡേറ്റ് ചെയ്യുക',
  },
  pa: {
    radarTitle: 'ਫਸਲ ਬਿਮਾਰੀ ਰਾਡਾਰ ਅਤੇ ਸੂਬਾਈ ਹੱਦਾਂ',
    radarSubtitle: 'ਅਸਲ ਸੂਬਾਈ ਹੱਦਾਂ, ਜ਼ਿਲ੍ਹਿਆਂ, ਸ਼ਹਿਰਾਂ ਅਤੇ ਫਸਲ ਰੋਗ ਚਿਤਾਵਨੀਆਂ ਵਾਲਾ ਅਸਲੀ ਨਕਸ਼ਾ',
    verifiedBadge: 'ਅਸਲ ਸਿਆਸੀ ਨਕਸ਼ਾ',
    selectStateLabel: 'ਸੂਬਾ ਚੁਣੋ:',
    allIndiaBtn: '🇮🇳 ਸਾਰਾ ਭਾਰਤ',
    otherStatesLabel: 'ਹੋਰ ਸੂਬੇ:',
    searchPlaceholder: 'ਜ਼ਿਲ੍ਹਾ, ਸ਼ਹਿਰ ਜਾਂ ਬਿਮਾਰੀ ਲੱਭੋ...',
    allCropsBtn: 'ਸਾਰੀਆਂ ਫਸਲਾਂ',
    cropFilterLabel: 'ਫਸਲ:',
    politicalMapBtn: 'ਸਿਆਸੀ',
    satelliteMapBtn: 'ਸੈਟੇਲਾਈਟ',
    topoMapBtn: 'ਭੂਗੋਲਿਕ',
    highAlertLabel: 'ਗੰਭੀਰ ਚਿਤਾਵਨੀ',
    warningLabel: 'ਚਿਤਾਵਨੀ',
    monitoredLabel: 'ਘੱਟ ਖ਼ਤਰਾ',
    threatIndexLabel: 'ਖ਼ਤਰਾ ਸੂਚਕਾਂਕ',
    microclimateTitle: 'ਮੌਸਮੀ ਬਿਮਾਰੀ ਕਾਰਨ:',
    tempLabel: 'ਤਾਪਮਾਨ',
    humidityLabel: 'ਨਮੀ',
    symptomsTitle: 'ਫਸਲ ਉੱਤੇ ਦਿਖਣ ਵਾਲੇ ਮੁੱਖ ਲੱਛਣ:',
    immediateActionTitle: 'ਕਿਸਾਨ ਸਲਾਹ ਅਤੇ ਤੁਰੰਤ ਰੋਕਥਾਮ ਦੇ ਕਦਮ:',
    organicSprayLabel: '🌿 ਜੈਵਿਕ ਛਿੜਕਾਅ:',
    chemicalMedicineLabel: '🧪 ਰਸਾਇਣਕ ਦਵਾਈ ਅਤੇ ਮਾਤਰਾ:',
    callHelplineBtn: 'ਮੁਫ਼ਤ ਕਿਸਾਨ ਹੈਲਪਲਾਈਨ ਤੇ ਕਾਲ ਕਰੋ',
    diseaseGuideBtn: 'ਬਿਮਾਰੀ ਗਾਈਡ',
    allMonitoredDistrictsTitle: 'ਨਿਗਰਾਨੀ ਅਧੀਨ ਸਾਰੇ ਜ਼ਿਲ੍ਹੇ ਅਤੇ ਸ਼ਹਿਰ:',
    tapToInspect: 'ਵੇਰਵਾ ਵੇਖਣ ਲਈ ਟੈਪ ਕਰੋ',
    noAlertsFound: 'ਇਸ ਸੂਬੇ ਵਿੱਚ ਕੋਈ ਸਰਗਰਮ ਬਿਮਾਰੀ ਨਹੀਂ ਹੈ।',
    resetFilterBtn: 'ਫਿਲਟਰ ਹਟਾਓ',
    updatedLabel: 'ਅੱਪਡੇਟ ਕੀਤਾ',
    syncAlertsBtn: 'ਅੱਪਡੇਟ ਕਰੋ',
  },
  or: {
    radarTitle: 'ଫସଲ ରୋଗ ପ୍ରକୋପ ରାଡାର୍ ଏବଂ ରାଜ୍ୟ ସୀମା',
    radarSubtitle: 'ସଠିକ୍ ରାଜନୈତିକ ସୀମା, ଜିଲ୍ଲା, ସହର ଏବଂ ରୋଗ ଚେତାବନୀ ସହିତ ପ୍ରକୃତ ମାନଚିତ୍ର',
    verifiedBadge: 'ପ୍ରମାଣିତ ରାଜନୈତିକ ମାନଚିତ୍ର',
    selectStateLabel: 'ରାଜ୍ୟ ଚୟନ କରନ୍ତୁ:',
    allIndiaBtn: '🇮🇳 ସମଗ୍ର ଭାରତ',
    otherStatesLabel: 'ଅନ୍ୟାନ୍ୟ ରାଜ୍ୟ:',
    searchPlaceholder: 'ଜିଲ୍ଲା, ସହର କିମ୍ବା ରୋଗ ଖୋଜନ୍ତୁ...',
    allCropsBtn: 'ସମସ୍ତ ଫସଲ',
    cropFilterLabel: 'ଫସଲ:',
    politicalMapBtn: 'ରାଜନୈତିକ',
    satelliteMapBtn: 'ଉପଗ୍ରହ',
    topoMapBtn: 'ଭୌଗୋଳିକ',
    highAlertLabel: 'ଗମ୍ଭୀର ଚେତାବନୀ',
    warningLabel: 'ବିପଦ ଚେତାବନୀ',
    monitoredLabel: 'କମ୍ ବିପଦ',
    threatIndexLabel: 'ବିପଦ ସୂଚକାଙ୍କ',
    microclimateTitle: 'ପାଗ ଅନୁକୂଳତା ଓ ରୋଗ କାରଣ:',
    tempLabel: 'ତାପମାତ୍ରା',
    humidityLabel: 'ଆର୍ଦ୍ରତା',
    symptomsTitle: 'ଫସଲରେ ଦେଖାଯାଉଥିବା ପ୍ରମୁଖ ଲକ୍ଷଣ:',
    immediateActionTitle: 'କୃଷକ ପରାମର୍ଶ ଓ ତୁରନ୍ତ ପ୍ରତିକାର:',
    organicSprayLabel: '🌿 ଜୈବିକ ସ୍ପ୍ରେ:',
    chemicalMedicineLabel: '🧪 ରାସାୟନିକ ଔଷଧ ଓ ମାତ୍ରା:',
    callHelplineBtn: 'କିଷାନ ହେଲ୍ପଲାଇନକୁ ମାଗଣାରେ କଲ କରନ୍ତୁ',
    diseaseGuideBtn: 'ରୋଗ ମାର୍ଗଦର୍ଶିକା',
    allMonitoredDistrictsTitle: 'ନଜରଦାରୀରେ ଥିବା ସମସ୍ତ ଜିଲ୍ଲା ଓ ସହର:',
    tapToInspect: 'ଦେଖିବାକୁ ଟ୍ୟାପ୍ କରନ୍ତୁ',
    noAlertsFound: 'ଏହି ରାଜ୍ୟରେ କୌଣସି ସକ୍ରିୟ ରୋଗ ନାହିଁ।',
    resetFilterBtn: 'ଫିଲ୍ଟର୍ ରିସେଟ୍ କରନ୍ତୁ',
    updatedLabel: 'ଅପଡେଟ୍ ହୋଇଛି',
    syncAlertsBtn: 'ଅପଡେଟ୍ କରନ୍ତୁ',
  },
  as: {
    radarTitle: 'শস্য ৰোগ প্ৰকোপ ৰাডাৰ আৰু ৰাজ্যিক সীমা',
    radarSubtitle: 'প্ৰকৃত ৰাজনৈতিক সীমা, জিলা, চহৰ আৰু ৰোগ সতৰ্কবাণী সম্বলিত মানচিত্ৰ',
    verifiedBadge: 'ৰাজনৈতিক মানচিত্ৰ',
    selectStateLabel: 'ৰাজ্য বাছক:',
    allIndiaBtn: '🇮🇳 সমগ্ৰ ভাৰত',
    otherStatesLabel: 'অন্যান্য ৰাজ্য:',
    searchPlaceholder: 'জিলা, চহৰ বা ৰোগ সন্ধান কৰক...',
    allCropsBtn: 'সকলো শস্য',
    cropFilterLabel: 'শস্য:',
    politicalMapBtn: 'ৰাজনৈতিক',
    satelliteMapBtn: 'উপগ্ৰহ',
    topoMapBtn: 'ভৌগোলিক',
    highAlertLabel: 'মাৰাত্মক সতৰ্কবাণী',
    warningLabel: 'বিপদৰ সতৰ্কবাণী',
    monitoredLabel: 'কম বিপদ',
    threatIndexLabel: 'বিপদৰ সূচকাংক',
    microclimateTitle: 'বতৰ জনিত ৰোগ সংক্ৰমণ কাৰণ:',
    tempLabel: 'উষ্ণতা',
    humidityLabel: 'আৰ্দ্ৰতা',
    symptomsTitle: 'শস্যত দেখা দিয়া মুখ্য লক্ষণসমূহ:',
    immediateActionTitle: 'কৃষক পৰামৰ্শ আৰু তৎপৰ ব্যৱস্থা:',
    organicSprayLabel: '🌿 জৈৱিক স্প্ৰে:',
    chemicalMedicineLabel: '🧪 ৰাসায়নিক ঔষধ আৰু মাত্ৰা:',
    callHelplineBtn: 'বিনামূলীয়া কিষাণ হেল্পলাইনত ফোন কৰক',
    diseaseGuideBtn: 'ৰোগ নিৰ্দেশিকা',
    allMonitoredDistrictsTitle: 'নজৰদাৰীৰ আওতাত থকা জিলা আৰু চহৰ:',
    tapToInspect: 'বিৱৰণ চাবলৈ টিપক',
    noAlertsFound: 'এই ৰাজ্যত কোনো সক্ৰিয় ৰোগ নাই।',
    resetFilterBtn: 'ফিল্টাৰ ৰিচেট কৰক',
    updatedLabel: 'আপডেট কৰা হ’ল',
    syncAlertsBtn: 'আপডেট কৰক',
  },
};

/**
 * Returns localized UI strings for crop warning radar
 */
export function getCropWarningUI(lang: LanguageCode = 'en'): CropWarningUIStrings {
  return CROP_WARNING_UI_LOCALES[lang] || CROP_WARNING_UI_LOCALES.en;
}

/**
 * Fallback mapping for common disease names to canonical class keys
 */
function findCanonicalClassByDiseaseName(diseaseName: string): string | null {
  if (!diseaseName) return null;
  const lower = diseaseName.toLowerCase();
  if (lower.includes('leaf curl') && lower.includes('cotton')) return 'Cotton___Leaf_curl_virus';
  if (lower.includes('bacterial blight') && lower.includes('cotton')) return 'Cotton___Bacterial_blight';
  if (lower.includes('boll rot') && lower.includes('cotton')) return 'Cotton___Bacterial_blight';
  if (lower.includes('whip smut') || (lower.includes('smut') && lower.includes('sugar'))) return 'Sugarcane___Whip_smut';
  if (lower.includes('red rot')) return 'Sugarcane___Red_rot';
  if (lower.includes('rust') && lower.includes('soybean')) return 'Soybean___Rust';
  if (lower.includes('black rot') && lower.includes('grape')) return 'Grape___Black_rot';
  if (lower.includes('downy mildew') || lower.includes('isariopsis') || (lower.includes('leaf blight') && lower.includes('grape'))) return 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)';
  if (lower.includes('northern leaf blight') || (lower.includes('blight') && lower.includes('maize'))) return 'Corn_(maize)___Northern_Leaf_Blight';
  if (lower.includes('yellow rust') || lower.includes('stripe rust')) return 'Wheat___Yellow_rust';
  if (lower.includes('leaf blast') || (lower.includes('blast') && lower.includes('rice'))) return 'Rice___Leaf_Blast';
  if (lower.includes('bacterial leaf blight') && lower.includes('rice')) return 'Rice___Bacterial_leaf_blight';
  if (lower.includes('late blight') && lower.includes('potato')) return 'Potato___Late_blight';
  if (lower.includes('early blight') && lower.includes('potato')) return 'Potato___Early_blight';
  if (lower.includes('early blight') && lower.includes('tomato')) return 'Tomato___Early_blight';
  if (lower.includes('late blight') && lower.includes('tomato')) return 'Tomato___Late_blight';
  if (lower.includes('yellow leaf curl') || (lower.includes('tylcv') && lower.includes('tomato'))) return 'Tomato___Tomato_Yellow_Leaf_Curl_Virus';
  if (lower.includes('bacterial spot') && lower.includes('tomato')) return 'Tomato___Bacterial_spot';
  if (lower.includes('scab') && lower.includes('apple')) return 'Apple___Apple_scab';
  return null;
}

/**
 * Returns localized disease warning information (name, symptoms, actions, remedies, weather)
 * in the requested Indian language.
 */
export function getLocalizedDiseaseWarning(
  data: {
    className?: string;
    crop?: string;
    diseaseName?: string;
    symptoms?: string;
    recommendedAction?: string;
    organicTreatment?: string;
    chemicalTreatment?: string;
    weatherTrigger?: {
      tempRange?: string;
      humidity?: string;
      rainfallStatus?: string;
      triggerSummary?: string;
    };
  },
  lang: LanguageCode = 'en'
): {
  cropName: string;
  diseaseName: string;
  symptoms: string;
  recommendedAction: string;
  organicTreatment: string;
  chemicalTreatment: string;
  weatherTriggerSummary?: string;
} {
  const rawClass = data.className || '';
  const inferredClass = findCanonicalClassByDiseaseName(data.diseaseName || '') || rawClass;
  const cropKey = (data.crop || '').toLowerCase().replace(/[^a-z]/g, '');

  // 1. Localized Crop Name
  const cropMap = LOCALIZED_CROP_NAMES[cropKey];
  const cropName = (cropMap && cropMap[lang]) || data.crop || '';

  // 2. Localized Disease Name from comprehensive database
  const entry =
    getLocalizedEntryByClass(inferredClass) ||
    getLocalizedEntryByClass(rawClass) ||
    ALL_LOCALIZED_DISEASES[inferredClass] ||
    ALL_LOCALIZED_DISEASES[rawClass] ||
    LOCALIZED_DISEASES[inferredClass] ||
    LOCALIZED_DISEASES[rawClass];

  let diseaseName = data.diseaseName || '';
  if (entry && entry.names && entry.names[lang]) {
    diseaseName = entry.names[lang];
  }

  // 3. Localized Symptoms
  let symptoms = data.symptoms || '';
  if (entry && entry.symptoms && entry.symptoms[lang] && entry.symptoms[lang].length > 0) {
    symptoms = entry.symptoms[lang].join('. ');
  } else if (entry && entry.descriptions && entry.descriptions[lang]) {
    symptoms = entry.descriptions[lang];
  }

  // 4. Localized Remedies
  let recommendedAction = data.recommendedAction || '';
  let organicTreatment = data.organicTreatment || '';
  let chemicalTreatment = data.chemicalTreatment || '';

  if (lang !== 'en') {
    if (entry && entry.prevention && entry.prevention[lang] && entry.prevention[lang].length > 0) {
      recommendedAction = entry.prevention[lang].join('. ');
    }
    if (entry && entry.remedies && entry.remedies[lang] && entry.remedies[lang].length > 0) {
      organicTreatment = entry.remedies[lang][0] || organicTreatment;
      if (entry.remedies[lang].length > 1) {
        chemicalTreatment = entry.remedies[lang].slice(1).join('. ') || chemicalTreatment;
      }
    }
  } else {
    // In English, preserve specific alert containment advice, or fallback to entry
    if (!recommendedAction && entry && entry.prevention && entry.prevention.en && entry.prevention.en.length > 0) {
      recommendedAction = entry.prevention.en.join('. ');
    }
    if (!organicTreatment && entry && entry.remedies && entry.remedies.en && entry.remedies.en.length > 0) {
      organicTreatment = entry.remedies.en[0] || '';
    }
    if (!chemicalTreatment && entry && entry.remedies && entry.remedies.en && entry.remedies.en.length > 1) {
      chemicalTreatment = entry.remedies.en.slice(1).join('. ') || '';
    }
  }

  // 5. Localized Weather Trigger Summary
  const rawTrigger = data.weatherTrigger?.triggerSummary || '';
  const weatherTriggerSummary = rawTrigger ? getLocalizedWeatherTrigger(rawTrigger, lang) : undefined;

  return {
    cropName,
    diseaseName,
    symptoms,
    recommendedAction,
    organicTreatment,
    chemicalTreatment,
    weatherTriggerSummary,
  };
}

/**
 * Multi-lingual weather trigger condition translations for all 12 Indian languages
 */
export function getLocalizedWeatherTrigger(trigger: string, lang: LanguageCode = 'en'): string {
  if (!trigger || lang === 'en') return trigger;

  const t = trigger.toLowerCase();

  // 1. Whitefly / viral vector trigger
  if (t.includes('whitefly') || t.includes('bemisia') || t.includes('vector')) {
    const map: Record<LanguageCode, string> = {
      en: trigger,
      hi: 'सफेद मक्खी (Whitefly) के तेजी से पनपने के कारण फसल में लीफ कर्ल वायरस का व्यापक फैलाव।',
      gu: 'સફેદ માખીના ઝડપી ઉપદ્રવને કારણે પાનમાં પાન વળવાનો વાયરસ ઝડપથી ફેલાય છે.',
      mr: 'पांढऱ्या माशीच्या मोठ्या प्रादुर्भावामुळे पानांचा चुरडा-मुरडा (लीफ कर्ल) विषाणूचा वेगाने प्रसार.',
      bn: 'সাদা মাছির দ্রুত বৃদ্ধির ফলে পাতায় ভাইরাসজনিত কুঁকড়ে যাওয়া রোগ ছড়াচ্ছে।',
      te: 'తెల్లదోమ అధికంగా వ్యాపించడం వల్ల ఆకు ముడత వైరస్ వేగంగా వ్యాపిస్తుంది.',
      ta: 'வெள்ளை ஈக்களின் தீவிர பெருக்கத்தால் இலை சுருள் வைரஸ் வேகமாக பரவுகிறது.',
      kn: 'ಬಿಳಿ ನೊಣಗಳ ಹಾವಳಿಯಿಂದ ಎಲೆ ಮುರುಟು ವೈರಸ್ ರೋಗ ತೀವ್ರವಾಗಿ ಹರಡುತ್ತಿದೆ.',
      ml: 'വെള്ളീച്ചകളുടെ പെരുപ്പം കാരണം വൈറസ് ബാധ വേഗത്തിൽ പടരുന്നു.',
      pa: 'ਚਿੱਟੀ ਮੱਖੀ ਦੇ ਵਾਧੇ ਕਾਰਨ ਪੱਤਾ ਮਰੋੜ ਵਿਸ਼ਾਣੂ ਬੜੀ ਤੇਜ਼ੀ ਨਾਲ ਫੈਲ ਰਿਹਾ ਹੈ।',
      or: 'ଧଳା ମାଛି ବୃଦ୍ଧି ଯୋଗୁଁ ପତ୍ର ମୋଡ଼ା ଭୂତାଣୁ ଦ୍ରୁତ ଗତିରେ ବ୍ୟାପୁଛି।',
      as: 'বগা মাখিৰ উপদ্ৰৱৰ ফলত পাত কোঁচ খোৱা ভাইৰাছ দ্ৰুতগতিত বিয়পিছে।',
    };
    return map[lang] || trigger;
  }

  // 2. Wind-driven rain / bacterial leaf blight
  if (t.includes('wind') || t.includes('rain') || t.includes('xanthomonas') || t.includes('bacterial')) {
    const map: Record<LanguageCode, string> = {
      en: trigger,
      hi: 'तेज हवाओं और बारिश की बूंदों से पत्तियों में बने सूक्ष्म घावों से जीवाणु संक्रमण तेजी से बढ़ा।',
      gu: 'પવન સાથેના વરસાદને કારણે પાંદડા પર થયેલા સૂક્ષ્મ ઘામાંથી બેક્ટેરિયાનો ચેપ વધ્યો.',
      mr: 'वादळी वाऱ्यासह पावसामुळे पानांवर सूक्ष्म जखमा होऊन जिवाणूंचा संसर्ग वेगाने वाढला.',
      bn: 'ঝড়ো বৃষ্টির কারণে পাতার ক্ষুদ্র ক্ষতে ব্যাকটেরিয়ার সংক্রমণ দ্রুত বাড়ছে।',
      te: 'గాలులతో కూడిన వర్షం వల్ల ఆకులపై గాయాల ద్వారా బాక్టీరియా తీవ్రంగా వ్యాపిస్తుంది.',
      ta: 'காற்றோடு கூடிய மழையால் இலைகளில் ஏற்படும் நுண் காயங்கள் வழியே பாக்டீரியா பரவுகிறது.',
      kn: 'ಗಾಳಿ ಸಹಿತ ಮಳೆಯಿಂದ ಎಲೆಗಳ ಮೇಲಿನ ಗಾಯಗಳ ಮೂಲಕ ಬ್ಯಾಕ್ಟೀರಿಯಾ ಸೋಂಕು ಹರಡುತ್ತದೆ.',
      ml: 'കാറ്റും മഴയും മൂലം ഇലകളിലെ സൂക്ഷ്മ മുറിവുകളിലൂടെ ബാക്ടീരിയ ബാധ വർദ്ധിക്കുന്നു.',
      pa: 'ਤੇਜ਼ ਹਵਾਵਾਂ ਤੇ ਬਾਰਿਸ਼ ਕਾਰਨ ਪੱਤਿਆਂ ਦੇ ਜ਼ਖ਼ਮਾਂ ਰਾਹੀਂ ਜੀਵਾਣੂਆਂ ਦਾ ਹਮਲਾ ਵਧਿਆ।',
      or: 'ପବନ ସହ ବର୍ଷା ଯୋଗୁଁ ପତ୍ରରେ କ୍ଷତ ସୃଷ୍ଟି ହୋଇ ଜୀବାଣୁ ସଂକ୍ରମଣ ବ୍ୟାପୁଛି।',
      as: 'বতাহ-বৰষুণৰ ফলত পাতত আঘাত লাগি বেক্টেৰিয়াৰ সংক্ৰমণ বৃদ্ধি পাইছে।',
    };
    return map[lang] || trigger;
  }

  // 3. Extended leaf wetness / Alternaria / fungus
  if (t.includes('wetness') || t.includes('alternaria') || t.includes('spore')) {
    const map: Record<LanguageCode, string> = {
      en: trigger,
      hi: 'पत्तियों पर लगातार 7+ घंटे तक नमी रहने से फफूंद बीजाणुओं का तेजी से अंकुरण हुआ।',
      gu: 'પાંદડા પર સતત ૭ કલાકથી વધુ ભેજ રહેવાથી ફૂગના બીજાણુઓ ઝડપથી અંકુરિત થયા.',
      mr: 'पानांवर सातत्याने ७ तासांपेक्षा जास्त ओलावा राहिल्याने बुरशीचे बीजाणू वेगाने वाढले.',
      bn: 'পাতায় দীর্ঘক্ষণ (৭+ ঘণ্টা) আর্দ্রতা থাকার ফলে ছত্রাকের জীবাণু দ্রুত বাড়ছে।',
      te: 'ఆకులపై నిరంతరం 7 గంటలకు పైగా తేమ ఉండటం వల్ల శిలీంధ్ర బీజాలు వేగంగా మొలకెత్తుతాయి.',
      ta: 'இலைகளில் 7 மணி நேரத்திற்கு மேல் ஈரப்பதம் நீடிப்பதால் பூஞ்சை வித்துக்கள் பரவுகின்றன.',
      kn: 'ಎಲೆಗಳ ಮೇಲೆ 7 ಗಂಟೆಗೂ ಹೆಚ್ಚು ಕಾಲ ತೇವಾಂಶ ಇರುವುದರಿಂದ ಶಿಲೀಂಧ್ರ ತೀವ್ರವಾಗಿ ಬೆಳೆಯುತ್ತದೆ.',
      ml: 'ഇലകളിൽ ഈർപ്പം തങ്ങിനിൽക്കുന്നത് കുമിൾ രോഗം വേഗത്തിൽ പടരാൻ കാരണമാകുന്നു.',
      pa: 'ਪੱਤਿਆਂ ਉੱਤੇ ਲਗਾਤਾਰ ਸਿੱਲ੍ਹ ਰਹਿਣ ਕਾਰਨ ਉੱਲੀ ਦੇ ਬੀਜਾਣੂ ਤੇਜ਼ੀ ਨਾਲ ਫੈਲ ਰਹੇ ਹਨ।',
      or: 'ପତ୍ରରେ ଦୀର୍ଘ ସମୟ ଓଦା ରହିବା ଯୋଗୁଁ କବକ ବୀଜାଣୁ ଶୀଘ୍ର ବୃଦ୍ଧି ପାଉଛି।',
      as: 'পাতত অধিক সময় তিতি থকাৰ বাবে ভেঁকুৰৰ সংক্ৰমণ ক্ষিপ্ৰ হৈ পৰিছে।',
    };
    return map[lang] || trigger;
  }

  // 4. Standing water / waterlogged / root rot / smut
  if (t.includes('standing water') || t.includes('waterlog') || t.includes('drainage') || t.includes('tunnel')) {
    const map: Record<LanguageCode, string> = {
      en: trigger,
      hi: 'खेत में पानी जमा रहने से जड़ों और तनों के माध्यम से फफूंद रोग का प्रकोप बढ़ा।',
      gu: 'ખેતરમાં પાણી ભરાઈ રહેવાથી મૂળ અને થડ દ્વારા ફૂગનો ઉપદ્રવ ઝડપથી વધ્યો.',
      mr: 'शेतात पाणी साचल्यामुळे मुळांमधून आणि खोडातून बुरशीजन्य रोगांचा प्रादुर्भाव वाढला.',
      bn: 'জমিতে জল জমে থাকার কারণে শিকড় দিয়ে ছত্রাকের রোগ দ্রুত ছড়িয়ে পড়ছে।',
      te: 'పొలంలో నీరు నిలిచిపోవడం వల్ల వేర్ల ద్వారా తెగులు వేగంగా వ్యాపిస్తుంది.',
      ta: 'வயலில் தண்ணீர் தேங்குவதால் வேர் வழியே பூஞ்சை நோய் பரவுகிறது.',
      kn: 'ಗದ್ದೆಯಲ್ಲಿ ನೀರು ನಿಲ್ಲುವುದರಿಂದ ಬೇರುಗಳ ಮೂಲಕ ಶಿಲೀಂಧ್ರ ರೋಗ ಹರಡುತ್ತದೆ.',
      ml: 'പാടത്ത് വെള്ളക്കെട്ട് ഉണ്ടാകുന്നത് രോഗം പടരാൻ ഇടയാക്കുന്നു.',
      pa: 'ਖੇਤ ਵਿੱਚ ਪਾਣੀ ਖੜ੍ਹਾ ਰਹਿਣ ਕਾਰਨ ਜੜ੍ਹਾਂ ਰਾਹੀਂ ਉੱਲੀ ਦੇ ਰੋਗ ਫੈਲ ਰਹੇ ਹਨ।',
      or: 'ଜମିରେ ପାଣି ଜମି ରହିବା ଯୋଗୁଁ ଚେର ଦେଇ କବକ ରୋଗ ବ୍ୟାପୁଛି।',
      as: 'পথাৰত পানী জমা হৈ থকাৰ ফলত শিপাৰ জৰিয়তে ভেঁকুৰ বিয়পি পৰিছে।',
    };
    return map[lang] || trigger;
  }

  // 5. High humidity & morning dew / Phytophthora / Late blight
  if (t.includes('humidity') || t.includes('dew') || t.includes('fog') || t.includes('phytophthora')) {
    const map: Record<LanguageCode, string> = {
      en: trigger,
      hi: '80-90% उच्च आर्द्रता और सुबह की ओस के कारण फफूंद का विस्फोटक संक्रमण हुआ।',
      gu: '૮૦-૯૦% વધુ ભેજ અને સવારના ઝાકળને કારણે ફૂગનો ચેપ ખૂબ ઝડપથી ફેલાયો.',
      mr: '८०-९०% जास्त आर्द्रता आणि सकाळच्या दवामुळे बुरशीचा तीव्र प्रादुर्भाव निर्माण झाला.',
      bn: 'উচ্চ আর্দ্রতা (৮০-৯০%) ও ভোরের শিশিরের কারণে ছত্রাকের আক্রমণ মারাত্মক রূপ নিয়েছে।',
      te: '80-90% అధిక తేమ మరియు ఉదయపు మంచు కారణంగా శిలీంధ్ర తెగులు ఉధృతమైంది.',
      ta: 'அதிக ஈரப்பதம் மற்றும் காலை பனி காரணமாக பூஞ்சை தீவிரமாக பரவுகிறது.',
      kn: 'ಹೆಚ್ಚಿನ ಆರ್ದ್ರತೆ ಮತ್ತು ಮುಂಜಾನೆಯ ಇಬ್ಬನಿಯಿಂದ ಶಿಲೀಂಧ್ರ ರೋಗ ಸ್ಫೋಟಕವಾಗಿ ಹರಡಿದೆ.',
      ml: 'കൂടിയ അന്തരീക്ഷ ഈർപ്പവും പുലർകാല മഞ്ഞും കുമിൾ ബാധ തീവ്രമാക്കുന്നു.',
      pa: '80-90% ਵੱਧ ਨਮੀ ਅਤੇ ਸਵੇਰ ਦੀ ਤ੍ਰੇਲ ਕਾਰਨ ਉੱਲੀ ਦਾ ਭਾਰੀ ਹਮਲਾ ਹੋਇਆ ਹੈ।',
      or: 'ଅତ୍ୟଧିକ ଆର୍ଦ୍ରତା ଏବଂ ସକାଳ କାକର ଯୋଗୁଁ କବକ ସଂକ୍ରମଣ ତୀବ୍ର ହୋଇଛି।',
      as: 'অধিক আৰ্দ্ৰতা আৰু পুৱাৰ নিয়ৰৰ কাৰণে ভেঁকুৰৰ সংক্ৰমণ মাৰাত্মক হৈ পৰিছে।',
    };
    return map[lang] || trigger;
  }

  // 6. Temperature fluctuations / stress
  if (t.includes('temperature') || t.includes('fluctuation') || t.includes('stress')) {
    const map: Record<LanguageCode, string> = {
      en: trigger,
      hi: 'दिन और रात के तापमान में भारी अंतर के कारण पौधों पर तनाव और रोग संवेदनशीलता बढ़ी।',
      gu: 'દિવસ અને રાત્રિના તાપમાનમાં મોટા તફાવતને કારણે પાકમાં રોગનું જોખમ વધ્યું.',
      mr: 'दिवस आणि रात्रीच्या तापमानातील मोठ्या फरकामुळे पिकांवर ताण येऊन रोगास अनुकूलता वाढली.',
      bn: 'দিন ও রাতের তাপমাত্রার তীব্র তারতম্যের কারণে ফসলে রোগ সংবেদনশীলতা বেড়েছে।',
      te: 'పగలు, రాత్రి ఉష్ణోగ్రతలలో తీవ్ర వ్యత్యాసం వల్ల పంటపై తెగుళ్ల ప్రభావం పెరిగింది.',
      ta: 'பகல் மற்றும் இரவு வெப்பநிலையின் கடுமையான மாறுபாட்டால் பயிரில் நோய் தாக்குதல் கூடியுள்ளது.',
      kn: 'ಹಗಲು-ರಾತ್ರಿಯ ತಾಪಮಾನದ ವ್ಯತ್ಯಾಸದಿಂದ ಬೆಳೆಯ ಮೇಲೆ ರೋಗದ ಅಪಾಯ ಹೆಚ್ಚಾಗಿದೆ.',
      ml: 'പകലും രാത്രിയിലുമുള്ള താപനിലയിലെ വ്യത്യാസം രോഗസാധ്യത കൂട്ടുന്നു.',
      pa: 'ਦਿਨ ਅਤੇ ਰਾਤ ਦੇ ਤਾਪਮਾਨ ਦੇ ਫ਼ਰਕ ਕਾਰਨ ਫਸਲ ਉੱਤੇ ਬਿਮਾਰੀ ਦਾ ਖ਼ਤਰਾ ਵਧਿਆ ਹੈ।',
      or: 'ଦିନ ଓ ରାତି ତାପମାତ୍ରା ତାରତମ୍ୟ ଯୋଗୁଁ ଫସଲରେ ରୋଗ ଆଶଙ୍କା ବୃଦ୍ଧି ପାଇଛି।',
      as: 'দিন আৰু ৰাতিৰ উষ্ণতাৰ তাৰতম্যৰ কাৰণে শস্যত ৰোগৰ সংক্ৰমণ বৃদ্ধি পাইছে।',
    };
    return map[lang] || trigger;
  }

  return trigger;
}

/**
 * Multi-lingual state agricultural advisory note translations for all 12 Indian languages
 */
export function getLocalizedStateAdvisory(
  stateName: string,
  defaultNotes: string,
  lang: LanguageCode = 'en'
): string {
  if (lang === 'en') return defaultNotes;

  const s = stateName.toLowerCase();

  if (s.includes('gujarat')) {
    const notes: Record<LanguageCode, string> = {
      en: defaultNotes,
      hi: 'सौराष्ट्र और कच्छ में कपास और मूंगफली का प्रमुख क्षेत्र है। वर्षा उपरांत उच्च आर्द्रता में लीफ कर्ल वायरस और टिक्का रोग की सघन निगरानी रखें।',
      gu: 'સૌરાષ્ટ્ર અને કચ્છ કપાસ તેમજ મગફળીનું મુખ્ય કેન્દ્ર છે. વરસાદ પછીના ઊંચા ભેજમાં પાન વળવાનો વાયરસ અને ટીક્કા રોગ સામે નિયમિત તપાસ રાખો.',
      mr: 'सौराष्ट्र व कच्छ हे कापूस आणि भुईमुगाचे मुख्य पट्टे आहेत. पावसाळ्यानंतर जास्त आर्द्रतेत लीफ कर्ल व्हायरस आणि टिक्का रोगावर नजर ठेवा.',
      bn: 'গুজরাটের সৌরাষ্ট্র অঞ্চলে তুলা ও চীনাবাদামে আর্দ্রতাজনিত রোগ ও ভাইরাস নজরদারিতে রাখুন।',
      te: 'గుజరాత్ లో పత్తి మరియు వేరుశనగ పంటలలో తేమ వల్ల వచ్చే తెగుళ్లను క్రమం తప్పకుండా గమనించండి.',
      ta: 'குஜராத்தில் பருத்தி மற்றும் நிலக்கடலை பயிர்களில் இலை சுருள் வைரஸ் பரவலை கண்காணிக்கவும்.',
      kn: 'ಗುಜರಾತ್‌ನಲ್ಲಿ ಹತ್ತಿ ಮತ್ತು ಕಡಲೆಕಾಯಿ ಬೆಳೆಗಳಲ್ಲಿ ಎಲೆ ಮುರುಟು ರೋಗದ ಮೇಲೆ ನಿಗಾ ಇರಿಸಿ.',
      ml: 'ഗുജറാത്തിൽ പരുത്തി, നിലക്കടല വിളകളിൽ വൈറസ് ബാധ നിരീക്ഷിക്കുക.',
      pa: 'ਗੁਜਰਾਤ ਵਿੱਚ ਨਰਮੇ ਅਤੇ ਮੂੰਗਫਲੀ ਉੱਤੇ ਪੱਤਾ ਮਰੋੜ ਰੋਗ ਦੀ ਨਿਗਰਾਨੀ ਰੱਖੋ।',
      or: 'ଗୁଜରାଟରେ କପା ଏବଂ ଚିନାବାଦାମରେ ପତ୍ର ମୋଡ଼ା ରୋଗ ଉପରେ ନଜର ରଖନ୍ତୁ।',
      as: 'গুজৰাটত কপাহ আৰু বাদামৰ খেতিত ভাইৰাছ সংক্ৰমণ লক্ষ্য কৰক।',
    };
    return notes[lang] || defaultNotes;
  }

  if (s.includes('maharashtra')) {
    const notes: Record<LanguageCode, string> = {
      en: defaultNotes,
      hi: 'महाराष्ट्र देश का सबसे बड़ा अंगूर, गन्ना, सोयाबीन और कपास उत्पादक है। नासिक, सांगली और विदर्भ में फफूंद व बोंडसड से बचाव हेतु समय पर छिड़काव करें।',
      gu: 'મહારાષ્ટ્ર દ્રાક્ષ, શેરડી, સોયાબીન અને કપાસનું અગ્રણી ઉત્પાદક છે. નાસિક, સાંગલી અને વિદર્ભમાં ફૂગ તેમજ ઈયળો સામે તાકીદના પગલાં લો.',
      mr: 'महाराष्ट्र देशातील प्रमुख द्राक्ष, ऊस, सोयाबीन व कापूस उत्पादक राज्य आहे. नाशिक, सांगली आणि विदर्भात करपा, डाऊनी आणि बोंडसड नियंत्रणासाठी वेळेवर उपाय करा.',
      bn: 'মহারাষ্ট্রে আঙ্গুর, আখ, সয়াবিন ও তুলায় ছত্রাকজনিত রোগের প্রতিরোধে সময়মতো ব্যবস্থা নিন।',
      te: 'మహారాష్ట్రలో ద్రాక్ష, చెరకు, సోయాబీన్ మరియు పత్తి పంటలలో తెగుళ్ల నివారణకు సమయానికి పిచికారీ చేయండి.',
      ta: 'மகாராஷ்டிராவில் திராட்சை, கரும்பு, சோயாபீன் மற்றும் பருத்தி பயிர்களுக்கு உரிய பூஞ்சைக்கொல்லி தெளிக்கவும்.',
      kn: 'ಮಹಾರಾಷ್ಟ್ರದಲ್ಲಿ ದ್ರಾಕ್ಷಿ, ಕಬ್ಬು, ಸೋಯಾಬೀನ್ ಮತ್ತು ಹತ್ತಿ ಬೆಳೆಗಳಲ್ಲಿ ಶಿಲೀಂಧ್ರ ರೋಗಗಳ ನಿಯಂತ್ರಣಕ್ಕೆ ಕ್ರಮ ಕೈಗೊಳ್ಳಿ.',
      ml: 'മഹാരാഷ്ട്രയിൽ മുന്തിരി, കരിമ്പ്, സോയാബീൻ വിളകളിൽ കൃത്യസമയത്ത് കീടനാശിനി പ്രയോഗിക്കുക.',
      pa: 'ਮਹਾਰਾਸ਼ਟਰ ਵਿੱਚ ਅੰਗੂਰ, ਗੰਨਾ, ਸੋਇਆਬੀਨ ਅਤੇ ਨਰਮੇ ਉੱਤੇ ਉੱਲੀ ਰੋਗਾਂ ਦੀ ਰੋਕਥਾਮ ਕਰੋ।',
      or: 'ମହାରାଷ୍ଟ୍ରରେ ଅଙ୍ଗୁର, ଆଖୁ, ସୋୟାବିନ୍ ଏବଂ କପାରେ ଫିମ୍ପି ନିୟନ୍ତ୍ରଣ ପାଇଁ ସ୍ପ୍ରେ କରନ୍ତୁ।',
      as: 'মহাৰাষ্ট্ৰত আঙুৰ, কুঁহিয়াৰ, চয়াবিন আৰু কপাহত সময়মতে ভেঁকুৰনাশক ব্যৱহাৰ কৰক।',
    };
    return notes[lang] || defaultNotes;
  }

  if (s.includes('punjab')) {
    const notes: Record<LanguageCode, string> = {
      en: defaultNotes,
      hi: 'पंजाब में आलू बीज और गेहूं उत्पादन महत्वपूर्ण है। जालंधर व दोआबा में अगेती/पछेती झुलसा और पीला रतुआ के प्रति सतर्क रहें।',
      gu: 'પંજાબમાં બટાટા અને ઘઉંનું ઉત્પાદન મુખ્ય છે. જલંધર વિસ્તારમાં સુકારો અને પીળો ગેરુ સામે સતર્ક રહો.',
      mr: 'पंजाबमध्ये बटाटा आणि गहू पीक मुख्य आहे. जालंधर भागात लेट ब्लाइट आणि पिवळा तांबेरा यावर लक्ष ठेवा.',
      bn: 'পাঞ্জাবে আলু ও গমের চাষে লেট ব্লাইট এবং হলুদ মরিচা রোগের সতর্কতা অবলম্বন করুন।',
      te: 'పంజాబ్ లో బంగాళాదుంప ಮತ್ತು ಗೋధుమ పంటలలో తెగుళ్లపై అప్రమత్తంగా ఉండండి.',
      ta: 'பஞ்சாபில் உருளைக்கிழங்கு மற்றும் கோதுமை பயிர்களில் மஞ்சள் துரு நோயை கண்காணிக்கவும்.',
      kn: 'ಪಂಜಾಬ್‌ನಲ್ಲಿ ಆಲೂಗಡ್ಡೆ ಮತ್ತು ಗೋಧಿ ಬೆಳೆಗಳಲ್ಲಿ ಹಳದಿ ತುಕ್ಕು ರೋಗದ ವಿರುದ್ಧ ಜಾಗರೂಕರಾಗಿರಿ.',
      ml: 'പഞ്ചാബിൽ ഉരുളക്കിഴങ്ങ്, ഗോതമ്പ് വിളകളിൽ കുമിൾ രോഗങ്ങൾക്കെതിരെ ജാഗ്രത പാലിക്കുക.',
      pa: 'ਪੰਜਾਬ ਵਿੱਚ ਆਲੂ ਅਤੇ ਕਣਕ ਦੇ ਪੀਲੇ ਕੁੰਗੀ ਰੋਗ ਅਤੇ ਝੁਲਸ ਰੋਗ ਤੋਂ ਸਾਵਧਾਨ ਰਹੋ।',
      or: 'ପଞ୍ଜାବରେ ଆଳୁ ଏବଂ ଗହମରେ ହଳଦିଆ କଳଙ୍କି ରୋଗ ପ୍ରତି ସଚେତନ ରୁହନ୍ତୁ।',
      as: 'পঞ্জাৱত আলু আৰু ঘেঁহুৰ হালধীয়া মৰিচা ৰোগৰ পৰা সাৱধান হওক।',
    };
    return notes[lang] || defaultNotes;
  }

  if (s.includes('uttar pradesh')) {
    const notes: Record<LanguageCode, string> = {
      en: defaultNotes,
      hi: 'उत्तर प्रदेश देश का शीर्ष आलू व गन्ना उत्पादक है। आगरा-कन्नौज में आलू झुलसा और पश्चिमी यूपी में गन्ने का लाल सड़न रोकने हेतु प्रमाणित बीज अपनाएं।',
      gu: 'ઉત્તર પ્રદેશ અગ્રણી બટાટા અને શેરડી ઉત્પાદક છે. આગ્રામાં બટાટા સુકારો અને શેરડીના લાલ સડા સામે પ્રમાણિત બિયારણ વાપરો.',
      mr: 'उत्तर प्रदेश बटाटा आणि ऊस उत्पादनात आघाडीवर आहे. बटाट्यावरील करपा आणि उसावरील लाल सड नियंत्रण आवश्यक आहे.',
      bn: 'উত্তর প্রদেশে আলু ও আখের লাল পচা রোগ প্রতিরোধে শোধিত বীজ ব্যবহার করুন।',
      te: 'ఉత్తరప్రదేశ్ లో బంగాళాదుంప మరియు చెరకు పంటలలో ఎర్ర కుళ్ళు తెగులు రాకుండా విత్తన శుద్ధి చేయండి.',
      ta: 'உத்தரபிரதேசத்தில் உருளைக்கிழங்கு மற்றும் கரும்பு பயிர்களில் சிவப்பு அழுகல் நோயை கட்டுப்படுத்துங்கள்.',
      kn: 'ಉತ್ತರ ಪ್ರದೇಶದಲ್ಲಿ ಆಲೂಗಡ್ಡೆ ಮತ್ತು ಕಬ್ಬಿನ ಕೆಂಪು ಕೊಳೆತ ರೋಗ ನಿಯಂತ್ರಣಕ್ಕೆ ಕ್ರಮ ಕೈಗೊಳ್ಳಿ.',
      ml: 'ഉത്തർപ്രദേശിൽ ഉരുളക്കിഴങ്ങ്, കരിമ്പ് വിളകളിൽ കുമിൾ രോഗങ്ങൾ നിയന്ത്രിക്കുക.',
      pa: 'ਉੱਤਰ ਪ੍ਰਦੇਸ਼ ਵਿੱਚ ਆਲੂ ਅਤੇ ਗੰਨੇ ਦੇ ਲਾਲ ਸੜਨ ਰੋਗ ਤੋਂ ਬਚਾਅ ਲਈ ਸੋਧਿਆ ਬੀਜ ਵਰਤੋ।',
      or: 'ଉତ୍ତର ପ୍ରଦେଶରେ ଆଳୁ ଏବଂ ଆଖୁର ଲାଲ୍ ସଢ଼ା ରୋଗ ରୋକିବା ପାଇଁ ବିହନ ବିଶୋଧନ କରନ୍ତୁ।',
      as: 'উত্তৰ প্ৰদেশত আলু আৰু কুঁহিয়াৰৰ ৰঙা পচা ৰোগ নিয়ন্ত্ৰণৰ বাবে শোধন কৰা বীজ ব্যৱহাৰ কৰক।',
    };
    return notes[lang] || defaultNotes;
  }

  // General fallback for all other states
  const generic: Record<LanguageCode, string> = {
    en: defaultNotes,
    hi: `${stateName} के लिए कृषि सलाह: उच्च आर्द्रता व मौसमी बदलाव में फसलों की नियमित निगरानी रखें। प्रमाणित बीज व जैविक उपायों को प्राथमिकता दें।`,
    gu: `${stateName} માટે કૃષિ સલાહ: વધુ ભેજ અને ઋતુ પરિવર્તનમાં પાકની નિયમિત ચકાસણી કરો. સર્ટિફાઇડ બિયારણ અને જૈવિક પગલાં અપનાવો.`,
    mr: `${stateName} साठी कृषी सल्ला: बदलत्या हवामानात व जास्त आर्द्रतेत पिकांची नियमित पाहणी करा. जैविक व एकात्मिक कीड व्यवस्थापन करा.`,
    bn: `${stateName} এর জন্য কৃষি পরামর্শ: নিয়মিত ফসল পর্যবেক্ষণ করুন এবং জৈব বালাইনাশক ব্যবহার করুন।`,
    te: `${stateName} కొరకు రైతు సలహా: వాతావరణ మార్పులను గమనిస్తూ పంటలను క్రమం తప్పకుండా పరిశీలించండి.`,
    ta: `${stateName} விவசாய ஆலோசனை: தட்பவெப்ப மாற்றங்களின் போது பயிர்களை தவறாமல் கண்காணிக்கவும்.`,
    kn: `${stateName} ರೈತರಿಗೆ ಸಲಹೆ: ಹವಾಮಾನ ವೈಪರೀತ್ಯದ ಸಮಯದಲ್ಲಿ ಬೆಳೆಗಳ ಮೇಲೆ ನಿರಂತರ ನಿಗಾ ಇರಿಸಿ.`,
    ml: `${stateName} കർഷക നിർദ്ദേശം: കാലാവസ്ഥാ മാറ്റങ്ങൾക്കനുസരിച്ച് വിളകളിൽ ആവശ്യമായ മുൻകരുതലുകൾ എടുക്കുക.`,
    pa: `${stateName} ਲਈ ਕਿਸਾਨ ਸਲਾਹ: ਮੌਸਮ ਵਿੱਚ ਤਬਦੀਲੀ ਵੇਲੇ ਫਸਲਾਂ ਦਾ ਲਗਾਤਾਰ ਮੁਆਇਨਾ ਕਰੋ।`,
    or: `${stateName} ପାଇଁ କୃଷି ପରାମର୍ଶ: ପାଗ ପରିବର୍ତ୍ତନ ସମୟରେ ଫସଲ ଉପରେ ନିୟମିତ ନଜର ରଖନ୍ତୁ।`,
    as: `${stateName} ৰ কৃষক পৰামৰ্শ: বতৰৰ পৰিৱৰ্তনৰ সময়ত শস্যৰ ওপৰত নিয়মীয়া নজৰ ৰাখক।`,
  };

  return generic[lang] || defaultNotes;
}

/**
 * Multi-lingual strings for Crop Suitability Warning Cards across all 12 Indian languages
 */
export function getLocalizedSuitabilityTexts(lang: LanguageCode = 'en') {
  const texts: Record<LanguageCode, {
    cropWarningBadge: string;
    cautionBadge: string;
    suitableBadge: string;
    unsuitableActionTitle: string;
    marginalActionTitle: string;
    suitableActionTitle: string;
    recommendedSubstitutes: (state: string) => string;
    removalProtocol: string;
    icarTested: string;
    choiceOption: (n: number) => string;
  }> = {
    en: {
      cropWarningBadge: 'Crop Warning: Not Suitable in this State',
      cautionBadge: 'Climatic Caution: Marginal Suitability',
      suitableBadge: 'Agro-Climatically Suitable Crop',
      unsuitableActionTitle: 'Required Action: Remove Crop and Plant Recommended Alternative',
      marginalActionTitle: 'Advisory: Use Protected Cultivation or Transition to Regional Crop',
      suitableActionTitle: 'Optimum Growth: Continue Standard Package of Practices',
      recommendedSubstitutes: (s) => `Highly Suitable & High-Yielding Crop Substitutes for ${s}:`,
      removalProtocol: 'Safe Removal, Root Clearance & Soil Remediation Protocol:',
      icarTested: 'ICAR Tested',
      choiceOption: (n) => `#${n} Choice`,
    },
    hi: {
      cropWarningBadge: 'फसल चेतावनी: इस राज्य के लिए अनुपयुक्त',
      cautionBadge: 'जलवायु जोखिम: सीमित अनुकूलता',
      suitableBadge: 'जलवायु अनुकूल: इस राज्य के लिए उपयुक्त',
      unsuitableActionTitle: 'तुरंत क्या करें: इस फसल को हटाएं और अनुशंसित फसल लगाएं',
      marginalActionTitle: 'सलाह: संरक्षित खेती करें या स्थानीय विकल्प चुनें',
      suitableActionTitle: 'सफल उत्पादन: अनुमोदित कृषि पद्धतियां जारी रखें',
      recommendedSubstitutes: (s) => `${s} के लिए अत्यधिक लाभदायक एवं उपयुक्त विकल्प:`,
      removalProtocol: 'पौधों को सुरक्षित हटाने व भूमि सुधार की विधि:',
      icarTested: 'ICAR प्रमाणित',
      choiceOption: (n) => `#${n} श्रेष्ठ विकल्प`,
    },
    gu: {
      cropWarningBadge: 'પાક ચેતવણી: આ રાજ્ય માટે બિન-અનુકૂળ',
      cautionBadge: 'હવામાન જોખમ: મર્યાદિત અનુકૂળતા',
      suitableBadge: 'હવામાન અનુકૂળ: આ રાજ્ય માટે ઉત્તમ',
      unsuitableActionTitle: 'તાત્કાલિક પગલું: આ પાક બદલીને ભલામણ કરેલ પાક વાવો',
      marginalActionTitle: 'સલાહ: પ્રોટેક્ટેડ ફાર્મિંગ કરો અથવા સ્થાનિક પાક અપનાવો',
      suitableActionTitle: 'શ્રેષ્ઠ ઉત્પાદન: પ્રમાણિત ખેતી પદ્ધતિઓ ચાલુ રાખો',
      recommendedSubstitutes: (s) => `${s} માટે વધુ નફાકારક અને અનુકૂળ પાકો:`,
      removalProtocol: 'છોડને સુરક્ષિત હટાવવા અને જમીન સુધારણા પદ્ધતિ:',
      icarTested: 'ICAR પ્રમાણિત',
      choiceOption: (n) => `#${n} ઉત્તમ વિકલ્પ`,
    },
    mr: {
      cropWarningBadge: 'पीक चेतावणी: या राज्यासाठी अयोग्य',
      cautionBadge: 'हवामान जोखीम: मर्यादित अनुकूलता',
      suitableBadge: 'हवामान अनुकूल: या राज्यासाठी योग्य',
      unsuitableActionTitle: 'तातडीने काय करावे: हे पीक काढून टाका आणि शिफारस केलेले पीक लावा',
      marginalActionTitle: 'सल्ला: संरक्षित शेती करा किंवा स्थानिक पर्याय निवडा',
      suitableActionTitle: 'यशस्वी उत्पादन: अनुमोदित शेती पद्धती चालू ठेवा',
      recommendedSubstitutes: (s) => `${s} साठी सर्वाधिक फायदेशीर आणि योग्य पर्याय:`,
      removalProtocol: 'झाडे सुरक्षित काढण्याची आणि जमीन सुधारण्याची पद्धत:',
      icarTested: 'ICAR प्रमाणित',
      choiceOption: (n) => `#${n} उत्तम पर्याय`,
    },
    bn: {
      cropWarningBadge: 'ফসল সতর্কতা: এই রাজ্যের জন্য অনুপযুক্ত',
      cautionBadge: 'জলবায়ু ঝুঁকি: সীমিত উপযোগিতা',
      suitableBadge: 'জলবায়ু উপযোগী: এই রাজ্যের জন্য উপযুক্ত',
      unsuitableActionTitle: 'জরুরি পদক্ষেপ: ফসলটি সরিয়ে অনুমোদিত বিকল্প ফসল রোপণ করুন',
      marginalActionTitle: 'পরামর্শ: সংরক্ষিত চাষাবাদ করুন বা আঞ্চলিক ফসল বেছে নিন',
      suitableActionTitle: 'অনুকূল ফলন: প্রমিত কৃষি পদ্ধতি অনুসরণ করুন',
      recommendedSubstitutes: (s) => `${s}-এর জন্য অত্যন্ত লাভজনক ও উপযুক্ত বিকল্প:`,
      removalProtocol: 'নিরাপদ অপসারণ ও মাটি শোধন পদ্ধতি:',
      icarTested: 'ICAR পরীক্ষিত',
      choiceOption: (n) => `#${n} সেরা পছন্দ`,
    },
    te: {
      cropWarningBadge: 'పంట హెచ్చరిక: ఈ రాష్ట్రానికి సరిపోదు',
      cautionBadge: 'వాతావరణ ముప్పు: పరిమిత అనుకూలత',
      suitableBadge: 'వాతావరణానికి అనుకూలమైన పంట',
      unsuitableActionTitle: 'తక్షణ చర్య: ఈ పంటను తీసివేసి సిఫార్సు చేసిన ప్రత్యామ్నాయ పంటను వేయండి',
      marginalActionTitle: 'సలహా: రక్షిత సాగు చేయండి లేదా స్థానిక పంటలకు మారండి',
      suitableActionTitle: 'ఉత్తమ దిగుబడి: ప్రామాణిక సాగు పద్ధతులను కొనసాగించండి',
      recommendedSubstitutes: (s) => `${s} కోసం అత్యధిక లాభదాయక ప్రత్యామ్నాయ పంటలు:`,
      removalProtocol: 'మొక్కలను తొలగించడం & భూమి శుద్ధి ప్రక్రియ:',
      icarTested: 'ICAR ధృవీకరించబడింది',
      choiceOption: (n) => `#${n} ఉత్తమ ఎంపిక`,
    },
    ta: {
      cropWarningBadge: 'பயிர் எச்சரிக்கை: இந்த மாநிலத்திற்கு உகந்ததல்ல',
      cautionBadge: 'காலநிலை ஆபத்து: குறைந்த பொருத்தம்',
      suitableBadge: 'காலநிலைக்கு ஏற்ற உகந்த பயிர்',
      unsuitableActionTitle: 'உடனடி நடவடிக்கை: இப்பயிரை அகற்றி பரிந்துரைக்கப்பட்ட மாற்றுப்பயிரை நடுங்கள்',
      marginalActionTitle: 'ஆலோசனை: பசுமைக்குடில் சாகுபடி அல்லது உள்ளூர் பயிருக்கு மாறுங்கள்',
      suitableActionTitle: 'சிறந்த மகசூல்: வழக்கமான சாகுபடி முறைகளை தொடரவும்',
      recommendedSubstitutes: (s) => `${s} மாநிலத்திற்கு ஏற்ற அதிக லாபகரமான மாற்றுப்பயிர்கள்:`,
      removalProtocol: 'பயிரை அகற்றுதல் மற்றும் மண் பராமரிப்பு முறை:',
      icarTested: 'ICAR சோதிக்கப்பட்டது',
      choiceOption: (n) => `#${n} சிறந்த தேர்வு`,
    },
    kn: {
      cropWarningBadge: 'ಬೆಳೆ ಎಚ್ಚರಿಕೆ: ಈ ರಾಜ್ಯಕ್ಕೆ ಸೂಕ್ತವಲ್ಲ',
      cautionBadge: 'ಹವಾಮಾನ ಅಪಾಯ: ಸೀಮಿತ ಸೂಕ್ತತೆ',
      suitableBadge: 'ಹವಾಮಾನಕ್ಕೆ ಸೂಕ್ತವಾದ ಉತ್ತಮ ಬೆಳೆ',
      unsuitableActionTitle: 'ತಕ್ಷಣದ ಕ್ರಮ: ಈ ಬೆಳೆಯನ್ನು ಬದಲಿಸಿ ಶಿಫಾರಸು ಮಾಡಿದ ಪರ್ಯಾಯ ಬೆಳೆ ಬೆಳೆಯಿರಿ',
      marginalActionTitle: 'ಸಲಹೆ: ರಕ್ಷಿತ ಬೇಸಾಯ ಮಾಡಿ ಅಥವಾ ಪ್ರಾದೇಶಿಕ ಬೆಳೆಗೆ ಬದಲಾಗಿ',
      suitableActionTitle: 'ಉತ್ತಮ ಬೆಳವಣಿಗೆ: ಪ್ರಮಾಣಿತ ಕೃಷಿ ಪದ್ಧತಿಗಳನ್ನು ಮುಂದುವರಿಸಿ',
      recommendedSubstitutes: (s) => `${s} ರಾಜ್ಯಕ್ಕೆ ಹೆಚ್ಚು ಲಾಭದಾಯಕ ಪರ್ಯಾಯ ಬೆಳೆಗಳು:`,
      removalProtocol: 'ಗಿಡಗಳನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ತೆಗೆಯುವುದು ಮತ್ತು ಮಣ್ಣು ಸಂಸ್ಕರಣೆ ವಿಧಾನ:',
      icarTested: 'ICAR ಪರೀಕ್ಷಿತ',
      choiceOption: (n) => `#${n} ಆಯ್ಕೆ`,
    },
    ml: {
      cropWarningBadge: 'വിള മുന്നറിയിപ്പ്: ഈ സംസ്ഥാനത്തിന് അനുയോജ്യമല്ല',
      cautionBadge: 'കാലാവസ്ഥാ വെല്ലുവിളി: പരിമിതമായ അനുയോജ്യത',
      suitableBadge: 'കാലാവസ്ഥയ്ക്ക് അനുയോജ്യമായ വിള',
      unsuitableActionTitle: 'അടിയന്തര നടപടി: ഈ വിള മാറ്റി നിർദ്ദേശിച്ച ഇതര വിള നടുക',
      marginalActionTitle: 'നിർദ്ദേശം: സംരക്ഷിത കൃഷി ചെയ്യുക അല്ലെങ്കിൽ പ്രാദേശിക വിളകൾ തിരഞ്ഞെടുക്കുക',
      suitableActionTitle: 'മികച്ച വിളവ്: കൃഷി രീതികൾ തുടരുക',
      recommendedSubstitutes: (s) => `${s} സംസ്ഥാനത്തിന് അനുയോജ്യമായ ലാഭകരമായ ഇതര വിളകൾ:`,
      removalProtocol: 'വിള മാറ്റലും മണ്ണ് ഒരുക്കലും:',
      icarTested: 'ICAR അംഗീകൃതം',
      choiceOption: (n) => `#${n} മികച്ചത്`,
    },
    pa: {
      cropWarningBadge: 'ਫਸਲ ਚਿਤਾਵਨੀ: ਇਸ ਸੂਬੇ ਲਈ ਅਣਉਚਿਤ',
      cautionBadge: 'ਮੌਸਮੀ ਜੋਖਮ: ਸੀਮਤ ਅਨੁਕੂਲਤਾ',
      suitableBadge: 'ਮੌਸਮ ਦੇ ਅਨੁਕੂਲ: ਢੁਕਵੀਂ ਫਸਲ',
      unsuitableActionTitle: 'ਤੁਰੰਤ ਕੀ ਕਰੋ: ਇਸ ਫਸਲ ਨੂੰ ਹਟਾਓ ਅਤੇ ਸਿਫਾਰਸ਼ ਕੀਤੀ ਫਸਲ ਬੀਜੋ',
      marginalActionTitle: 'ਸਲਾਹ: ਸੁਰੱਖਿਅਤ ਖੇਤੀ ਕਰੋ ਜਾਂ ਖੇਤਰੀ ਬਦਲ ਚੁਣੋ',
      suitableActionTitle: 'ਵਧੀਆ ਝਾੜ: ਪ੍ਰਮਾਣਿਤ ਖੇਤੀ ਢੰਗ ਜਾਰੀ ਰੱਖੋ',
      recommendedSubstitutes: (s) => `${s} ਲਈ ਸਭ ਤੋਂ ਵੱਧ ਲਾਭਕਾਰੀ ਬਦਲਵੀਆਂ ਫਸਲਾਂ:`,
      removalProtocol: 'ਬੂਟਿਆਂ ਨੂੰ ਹਟਾਉਣ ਅਤੇ ਜ਼ਮੀਨ ਦੀ ਤਿਆਰੀ ਦਾ ਤਰੀਕਾ:',
      icarTested: 'ICAR ਪ੍ਰਮਾਣਿਤ',
      choiceOption: (n) => `#${n} ਪਹਿਲੀ ਪਸੰਦ`,
    },
    or: {
      cropWarningBadge: 'ଫସଲ ଚେତାବନୀ: ଏହି ରାଜ୍ୟ ପାଇଁ ଅନୁପଯୁକ୍ତ',
      cautionBadge: 'ଜଳବାୟୁ ବିପଦ: ସୀମିତ ଅନୁକୂଳତା',
      suitableBadge: 'ଜଳବାୟୁ ଅନୁକୂଳ: ଏହି ରାଜ୍ୟ ପାଇଁ ଉପଯୁକ୍ତ',
      unsuitableActionTitle: 'ତୁରନ୍ତ ପଦକ୍ଷେପ: ଏହି ଫସଲ ବଦଳାଇ ସୁପାରିଶ କରାଯାଇଥିବା ଫସଲ ଚାଷ କରନ୍ତୁ',
      marginalActionTitle: 'ପରାମର୍ଶ: ସଂରକ୍ଷିତ ଚାଷ କରନ୍ତୁ ବା ଆଞ୍ଚଳିକ ବିକଳ୍ପ ବାଛନ୍ତୁ',
      suitableActionTitle: 'ଉତ୍ତମ ଉତ୍ପାଦନ: ମାନକ ଚାଷ ପଦ୍ଧତି ଜାରି ରଖନ୍ତୁ',
      recommendedSubstitutes: (s) => `${s} ପାଇଁ ଅତ୍ୟଧିକ ଲାଭଦାୟକ ବିକଳ୍ପ ଫସଲ:`,
      removalProtocol: 'ଗଛ ହଟାଇବା ଏବଂ ମୃତ୍ତିକା ବିଶୋଧନ ପ୍ରଣାଳୀ:',
      icarTested: 'ICAR ପରୀକ୍ଷିତ',
      choiceOption: (n) => `#${n} ଶ୍ରେଷ୍ଠ ବିକଳ୍ପ`,
    },
    as: {
      cropWarningBadge: 'শস্য সতৰ্কবাণী: এই ৰাজ্যৰ বাবে অনুপযুক্ত',
      cautionBadge: 'বতৰৰ আশংকা: সীমিত উপযোগিতা',
      suitableBadge: 'বতৰ উপযোগী: এই ৰাজ্যৰ বাবে উপযুক্ত',
      unsuitableActionTitle: 'তাত্ক্ষণিক ব্যৱস্থা: এই শস্য আঁতৰাই অনুমোদিত বিকল্প শস্য ৰোপণ কৰক',
      marginalActionTitle: 'পৰামৰ্শ: সুৰক্ষিত খেতি কৰক বা আঞ্চলিক বিকল্প বাছক',
      suitableActionTitle: 'উত্তম উৎপাদন: প্ৰমাণিত পদ্ধতি অব্যাহত ৰাখক',
      recommendedSubstitutes: (s) => `${s} ৰ বাবে লাভজনক বিকল্প শস্য:`,
      removalProtocol: 'শস্য আঁতৰোৱা আৰু মাটি প্ৰস্তুতিৰ নিয়ম:',
      icarTested: 'ICAR পৰীক্ষিত',
      choiceOption: (n) => `#${n} শ্ৰেষ্ঠ পছন্দ`,
    },
  };

  return texts[lang] || texts.en;
}

