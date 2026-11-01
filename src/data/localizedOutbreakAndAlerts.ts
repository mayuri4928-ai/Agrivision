/**
 * Comprehensive Multi-Lingual Localizations for Regional Outbreak Radar,
 * Government Directives, and Diagnostic Error Logs.
 * 
 * Supports all 12 official languages:
 * en: English, hi: Hindi, gu: Gujarati, mr: Marathi, bn: Bengali,
 * te: Telugu, ta: Tamil, kn: Kannada, ml: Malayalam, pa: Punjabi,
 * or: Odia, as: Assamese
 */

import { LanguageCode } from '../types';
import { GovtEmergencyOutbreakAlert } from '../types/regionalAlerts';

export interface OutbreakUIStrings {
  radarTitle: string;
  govtDatasetBadge: string;
  offlineModeActiveBadge: string;
  onlineModeActiveBadge: string;
  govtCitation: string;
  lastUpdatedPrefix: string;
  liveRecheckBtn: string;
  recheckingRadar: string;
  selectStatePrefix: string;
  otherStatesPrefix: string;
  allIndiaOverview: string;
  liveEmergencyDirectivesTitle: string;
  viewDirectivesBtn: string;
  hideDirectivesBtn: string;
  vectorRadarBtn: string;
  offlineVectorRadarActive: string;
  imdAgrometWeatherTrigger: string;
  callHelplineWithNum: string;
  listenToAdvisory: string;
  stopVoice: string;
  listenToGovtAlert: string;
  stopGovtAlert: string;
  allDiseasesInStateTitle: (state: string, count: number) => string;
  verifiedEpidemiologicalSub: string;
  govtDatasetCitationBadge: string;
  affectedDistrictsPrefix: string;
  inspectPrompt: string;
  criticalOutbreakBadge: string;
  highThreatBadge: string;
  watchAdvisoryBadge: string;
  monitoredBadge: string;
  officialGovtDirectiveHeader: string;
  mandatoryFieldActionsHeader: string;
  subsidizedSuppliesHeader: string;
  otherActiveDirectivesHeader: string;
  verifiedPortalNote: string;
  visitPortalLink: string;
  emergencyDirectiveBadge: string;
  warningAdvisoryBadge: string;
  epidemiologicalNoticeBadge: string;
  kisanHelplineTitle: string;
  validUntilPrefix: string;
  publishedPrefix: string;
  systemErrorLogsTitle: string;
  systemErrorLogsSubtitle: string;
  clearErrorLogsBtn: string;
  exportErrorLogsBtn: string;
  noErrorsLogged: string;
  errorCountPill: (count: number) => string;
  copyErrorDetails: string;
  errorCopied: string;
  searchPlaceholder: string;
  allCropsBtn: string;
  cropFilterLabel: string;
  noAlertsFound: string;
  resetFilterBtn: string;
}

export const OUTBREAK_UI_LOCALES: Record<LanguageCode, OutbreakUIStrings> = {
  en: {
    radarTitle: 'Regional Crop Disease Outbreak Radar',
    govtDatasetBadge: 'GOVT. DATASET GROUNDED (DPPQS & ICAR)',
    offlineModeActiveBadge: '100% Offline Mode Active',
    onlineModeActiveBadge: 'Live Online Sync',
    govtCitation: 'Source: Directorate of Plant Protection, Quarantine & Storage (dppqs.gov.in) & ICAR Outbreak Network',
    lastUpdatedPrefix: 'Last Updated',
    liveRecheckBtn: '⚡ Live Re-Check / Sync',
    recheckingRadar: 'Re-Checking Radar...',
    selectStatePrefix: 'Select State:',
    otherStatesPrefix: 'Other States:',
    allIndiaOverview: '🇮🇳 All-India Overview',
    liveEmergencyDirectivesTitle: 'Live Emergency Directives Issued by Government During Outbreak',
    viewDirectivesBtn: '▼ View Emergency Directives',
    hideDirectivesBtn: '▲ Hide Directives',
    vectorRadarBtn: 'Vector Radar',
    offlineVectorRadarActive: '100% Offline Vector SVG Radar Active',
    imdAgrometWeatherTrigger: 'IMD Agromet Weather Trigger:',
    callHelplineWithNum: 'Call Toll-Free Kisan Helpline (1800-180-1551)',
    listenToAdvisory: 'Listen to Advisory',
    stopVoice: 'Stop Voice',
    listenToGovtAlert: 'Listen to Govt Alert',
    stopGovtAlert: 'Stop Speech',
    allDiseasesInStateTitle: (state, count) => `All Diseases Going Live in ${state} (${count} Outbreaks in Govt Dataset)`,
    verifiedEpidemiologicalSub: 'Verified epidemiological surveillance points directly from ICAR and DPPQS field monitoring stations',
    govtDatasetCitationBadge: 'Govt Dataset Citation: DPPQS/2026 • ICAR Outbreak Registry',
    affectedDistrictsPrefix: 'Districts:',
    inspectPrompt: 'Inspect →',
    criticalOutbreakBadge: 'CRITICAL OUTBREAK',
    highThreatBadge: 'HIGH THREAT',
    watchAdvisoryBadge: 'WATCH ADVISORY',
    monitoredBadge: 'MONITORED',
    officialGovtDirectiveHeader: 'Official Government Directive & Quarantine Order',
    mandatoryFieldActionsHeader: 'Mandatory Field Containment Actions (Approved Protocols)',
    subsidizedSuppliesHeader: 'Government Support & Subsidized Supplies:',
    otherActiveDirectivesHeader: 'Other Active Outbreak Directives:',
    verifiedPortalNote: 'Verified from DPPQS & ICAR Emergency Surveillance Network',
    visitPortalLink: 'Visit DPPQS Portal',
    emergencyDirectiveBadge: 'RED ALERT • EMERGENCY DIRECTIVE',
    warningAdvisoryBadge: 'HIGH ALERT • MANDATORY ADVISORY',
    epidemiologicalNoticeBadge: 'WATCH • EPIDEMIOLOGICAL NOTICE',
    kisanHelplineTitle: 'Kisan Call Center: 1800-180-1551',
    validUntilPrefix: 'Valid until',
    publishedPrefix: 'Published:',
    systemErrorLogsTitle: 'Saved System & Diagnostic Error Logs',
    systemErrorLogsSubtitle: 'Persistent on-device audit logs of model timeouts, network fails and system events',
    clearErrorLogsBtn: 'Clear Error Logs',
    exportErrorLogsBtn: 'Export Logs (JSON)',
    noErrorsLogged: 'No errors recorded. All diagnostic and vision systems operating smoothly.',
    errorCountPill: (count) => `${count} Error${count === 1 ? '' : 's'} Recorded`,
    copyErrorDetails: 'Copy Error',
    errorCopied: 'Copied!',
    searchPlaceholder: 'Search districts, cities or diseases...',
    allCropsBtn: 'All Crops',
    cropFilterLabel: 'Crop:',
    noAlertsFound: 'No active outbreaks matching filter in this state.',
    resetFilterBtn: 'Reset Filters',
  },
  hi: {
    radarTitle: 'क्षेत्रीय फसल रोग प्रकोप रडार',
    govtDatasetBadge: 'सरकारी डेटासेट प्रमाणित (DPPQS व ICAR)',
    offlineModeActiveBadge: '100% ऑफलाइन मोड सक्रिय',
    onlineModeActiveBadge: 'लाइव ऑनलाइन सिंक',
    govtCitation: 'स्रोत: वनस्पति संरक्षण, संगरोध एवं संग्रह निदेशालय (dppqs.gov.in) व ICAR प्रकोप नेटवर्क',
    lastUpdatedPrefix: 'अंतिम अपडेट',
    liveRecheckBtn: '⚡ लाइव पुनः जांच / सिंक',
    recheckingRadar: 'रडार की जांच जारी है...',
    selectStatePrefix: 'राज्य चुनें:',
    otherStatesPrefix: 'अन्य राज्य:',
    allIndiaOverview: '🇮🇳 सम्पूर्ण भारत अवलोकन',
    liveEmergencyDirectivesTitle: 'रोग प्रकोप के दौरान सरकार द्वारा जारी लाइव आपातकालीन निर्देश',
    viewDirectivesBtn: '▼ आपातकालीन निर्देश देखें',
    hideDirectivesBtn: '▲ निर्देश छिपाएं',
    vectorRadarBtn: 'वेक्टर रडार',
    offlineVectorRadarActive: '100% ऑफलाइन वेक्टर SVG रडार सक्रिय',
    imdAgrometWeatherTrigger: 'मौसम विज्ञान विभाग (IMD) प्रकोप अनुकूलता:',
    callHelplineWithNum: 'टोल-फ्री किसान हेल्पलाइन (1800-180-1551) पर कॉल करें',
    listenToAdvisory: 'सलाह सुनें',
    stopVoice: 'आवाज रोकें',
    listenToGovtAlert: 'सरकारी चेतावनी सुनें',
    stopGovtAlert: 'आवाज बंद करें',
    allDiseasesInStateTitle: (state, count) => `${state} में सक्रिय सभी फसल रोग (सरकारी डेटासेट में ${count} प्रकोप)`,
    verifiedEpidemiologicalSub: 'ICAR और DPPQS निगरानी केंद्रों से सीधे सत्यापित रोग प्रसार आंकड़े',
    govtDatasetCitationBadge: 'सरकारी संदर्भ: DPPQS/2026 • ICAR रोग प्रकोप रजिस्ट्री',
    affectedDistrictsPrefix: 'प्रभावित जिले:',
    inspectPrompt: 'विस्तार देखें →',
    criticalOutbreakBadge: 'गंभीर प्रकोप',
    highThreatBadge: 'उच्च जोखिम',
    watchAdvisoryBadge: 'निगरानी सलाह',
    monitoredBadge: 'सामान्य निगरानी',
    officialGovtDirectiveHeader: 'आधिकारिक सरकारी निर्देश एवं संगरोध (क्वारंटीन) आदेश',
    mandatoryFieldActionsHeader: 'खेत में अनिवार्य रोकथाम उपाय (सरकारी स्वीकृत)',
    subsidizedSuppliesHeader: 'सरकारी सहायता व रियायती सामग्री:',
    otherActiveDirectivesHeader: 'अन्य सक्रिय सरकारी प्रकोप निर्देश:',
    verifiedPortalNote: 'DPPQS एवं ICAR आपातकालीन निगरानी नेटवर्क द्वारा सत्यापित',
    visitPortalLink: 'DPPQS पोर्टल देखें',
    emergencyDirectiveBadge: 'रेड अलर्ट • आपातकालीन सरकारी निर्देश',
    warningAdvisoryBadge: 'ऑरेंज अलर्ट • अनिवार्य परामर्श',
    epidemiologicalNoticeBadge: 'येलो वॉच • निगरानी सूचना',
    kisanHelplineTitle: 'किसान कॉल सेंटर: 1800-180-1551',
    validUntilPrefix: 'वैधता तिथि',
    publishedPrefix: 'जारी दिनांक:',
    systemErrorLogsTitle: 'सहेजे गए सिस्टम व डायग्नोस्टिक एरर लॉग्स',
    systemErrorLogsSubtitle: 'मॉडल टाइमआउट, नेटवर्क एवं सिस्टम त्रुटियों का ऑन-डिवाइस सुरक्षित रिकॉर्ड',
    clearErrorLogsBtn: 'एरर लॉग साफ करें',
    exportErrorLogsBtn: 'लॉग डाउनलोड करें (JSON)',
    noErrorsLogged: 'कोई त्रुटि दर्ज नहीं है। सभी सिस्टम सामान्य रूप से चल रहे हैं।',
    errorCountPill: (count) => `${count} एरर सहेजे गए`,
    copyErrorDetails: 'एरर कॉपी करें',
    errorCopied: 'कॉपी हो गया!',
    searchPlaceholder: 'जिले, शहर या फसल रोग खोजें...',
    allCropsBtn: 'सभी फसलें',
    cropFilterLabel: 'फसल:',
    noAlertsFound: 'इस राज्य में इस फिल्टर के अनुसार कोई सक्रिय रोग नहीं है।',
    resetFilterBtn: 'फिल्टर हटाएं',
  },
  gu: {
    radarTitle: 'પ્રાદેશિક પાક રોગચાળો રડાર',
    govtDatasetBadge: 'સરકારી ડેટાસેટ પ્રમાણિત (DPPQS & ICAR)',
    offlineModeActiveBadge: '૧૦૦% ઓફલાઇન મોડ સક્રિય',
    onlineModeActiveBadge: 'લાઇવ ઓનલાઇન સમન્વયન',
    govtCitation: 'સ્ત્રોત: વનસ્પતિ સંરક્ષણ, ક્વોરેન્ટાઇન અને સંગ્રહ નિયામક કચેરી (dppqs.gov.in) અને ICAR નેટવર્ક',
    lastUpdatedPrefix: 'છેલ્લી અપડેટ',
    liveRecheckBtn: '⚡ લાઇવ પુનઃ ચકાસણી / સમન્વયન',
    recheckingRadar: 'રડાર ચકાસણી ચાલુ છે...',
    selectStatePrefix: 'રાજ્ય પસંદ કરો:',
    otherStatesPrefix: 'અન્ય રાજ્યો:',
    allIndiaOverview: '🇮🇳 સમગ્ર ભારત ઝાંખી',
    liveEmergencyDirectivesTitle: 'રોગચાળા દરમિયાન સરકાર દ્વારા જારી કરાયેલ કટોકટી આદેશો',
    viewDirectivesBtn: '▼ કટોકટી આદેશો જુઓ',
    hideDirectivesBtn: '▲ આદેશો છુપાવો',
    vectorRadarBtn: 'વેક્ટર રડાર',
    offlineVectorRadarActive: '૧૦૦% ઓફલાઇન વેક્ટર SVG રડાર સક્રિય',
    imdAgrometWeatherTrigger: 'હવામાન વિભાગ (IMD) રોગ અનુકૂળતા:',
    callHelplineWithNum: 'ટોલ-ફ્રી કિસાન હેલ્પલાઇન (1800-180-1551) સંપર્ક કરો',
    listenToAdvisory: 'સલાહ સાંભળો',
    stopVoice: 'અવાજ બંધ કરો',
    listenToGovtAlert: 'સરકારી ચેતવણી સાંભળો',
    stopGovtAlert: 'અવાજ રોકો',
    allDiseasesInStateTitle: (state, count) => `${state} માં સક્રિય તમામ પાક રોગો (સરકારી ડેટાસેટમાં ${count} રોગચાળા)`,
    verifiedEpidemiologicalSub: 'ICAR અને DPPQS ફિલ્ડ સ્ટેશનો દ્વારા સીધા પ્રમાણિત રોગચાળાના આંકડા',
    govtDatasetCitationBadge: 'સરકારી સંદર્ભ: DPPQS/2026 • ICAR રોગચાળો રજિસ્ટ્રી',
    affectedDistrictsPrefix: 'અસરગ્રસ્ત જિલ્લાઓ:',
    inspectPrompt: 'વિગતો જુઓ →',
    criticalOutbreakBadge: 'ગંભીર રોગચાળો',
    highThreatBadge: 'ઉચ્ચ જોખમ',
    watchAdvisoryBadge: 'સાવચેતી સલાહ',
    monitoredBadge: 'સામાન્ય દેખરેખ',
    officialGovtDirectiveHeader: 'સત્તાવાર સરકારી આદેશ અને ક્વોરેન્ટાઇન નિયમ',
    mandatoryFieldActionsHeader: 'ખેતરમાં ફરજિયાત રોગ નિયંત્રણ પગલાં (સરકાર માન્ય)',
    subsidizedSuppliesHeader: 'સરકારી સહાય અને સબસિડીવાળી દવાઓ:',
    otherActiveDirectivesHeader: 'અન્ય સક્રિય સરકારી આદેશો:',
    verifiedPortalNote: 'DPPQS અને ICAR ઈમરજન્સી સર્વેલન્સ નેટવર્ક દ્વારા પ્રમાણિત',
    visitPortalLink: 'DPPQS પોર્ટલ જુઓ',
    emergencyDirectiveBadge: 'રેડ એલર્ટ • કટોકટી સરકારી આદેશ',
    warningAdvisoryBadge: 'ઓરેન્જ એલર્ટ • ફરજિયાત માર્ગદર્શિકા',
    epidemiologicalNoticeBadge: 'યલો વોચ • સાવચેતી નોટિસ',
    kisanHelplineTitle: 'કિસાન કોલ સેન્ટર: 1800-180-1551',
    validUntilPrefix: 'માન્યતા તારીખ',
    publishedPrefix: 'પ્રકાશિત તારીખ:',
    systemErrorLogsTitle: 'સાચવેલ સિસ્ટમ અને ડાયગ્નોસ્ટિક એરર લોગ્સ',
    systemErrorLogsSubtitle: 'મોડેલ ટાઈમઆઉટ, નેટવર્ક અને સિસ્ટમ ભૂલોનો સુરક્ષિત રેકોર્ડ',
    clearErrorLogsBtn: 'એરર લોગ્સ સાફ કરો',
    exportErrorLogsBtn: 'લોગ ડાઉનલોડ કરો (JSON)',
    noErrorsLogged: 'કોઈ ભૂલ નોંધાયેલ નથી. તમામ સિસ્ટમ યોગ્ય રીતે કાર્યરત છે.',
    errorCountPill: (count) => `${count} એરર સાચવેલ`,
    copyErrorDetails: 'એરર કોપી કરો',
    errorCopied: 'કોપી થઈ ગયું!',
    searchPlaceholder: 'જિલ્લા, શહેર કે પાક રોગ શોધો...',
    allCropsBtn: 'તમામ પાક',
    cropFilterLabel: 'પાક:',
    noAlertsFound: 'આ રાજ્યમાં પસંદ કરેલ ફિલ્ટર મુજબ કોઈ સક્રિય રોગ નથી.',
    resetFilterBtn: 'ફિલ્ટર રીસેટ કરો',
  },
  mr: {
    radarTitle: 'प्रादेशिक पीक रोग प्रादुर्भाव रडार',
    govtDatasetBadge: 'शासकीय डेटासेट प्रमाणित (DPPQS व ICAR)',
    offlineModeActiveBadge: '100% ऑफलाइन मोड सक्रिय',
    onlineModeActiveBadge: 'थेट ऑनलाइन सिंक',
    govtCitation: 'स्रोत: वनस्पती संरक्षण, संगरोध आणि संग्रह संचालनालय (dppqs.gov.in) व ICAR',
    lastUpdatedPrefix: 'अंतिम अद्यतन',
    liveRecheckBtn: '⚡ थेट फेरतपासणी / सिंक',
    recheckingRadar: 'रडार तपासणी सुरू आहे...',
    selectStatePrefix: 'राज्य निवडा:',
    otherStatesPrefix: 'इतर राज्ये:',
    allIndiaOverview: '🇮🇳 संपूर्ण भारत आढावा',
    liveEmergencyDirectivesTitle: 'रोग प्रादुर्भावादरम्यान शासनाने जारी केलेले थेट आणीबाणी आदेश',
    viewDirectivesBtn: '▼ आणीबाणी आदेश पहा',
    hideDirectivesBtn: '▲ आदेश लपवा',
    vectorRadarBtn: 'व्हेक्टर रडार',
    offlineVectorRadarActive: '100% ऑफलाइन व्हेक्टर SVG रडार सक्रिय',
    imdAgrometWeatherTrigger: 'हवामान विभाग (IMD) रोग अनुकूलता:',
    callHelplineWithNum: 'टोल-फ्री किसान हेल्पलाइन (1800-180-1551) वर कॉल करा',
    listenToAdvisory: 'सल्ला ऐका',
    stopVoice: 'आवाज थांबवा',
    listenToGovtAlert: 'शासकीय चेतावणी ऐका',
    stopGovtAlert: 'आवाज बंद करा',
    allDiseasesInStateTitle: (state, count) => `${state} मधील सर्व सक्रिय पीक रोग (शासकीय नोंदीत ${count} प्रादुर्भाव)`,
    verifiedEpidemiologicalSub: 'ICAR आणि DPPQS क्षेत्रीय केंद्रांद्वारे थेट प्रमाणित रोग आकडेवारी',
    govtDatasetCitationBadge: 'शासकीय संदर्भ: DPPQS/2026 • ICAR रोग प्रादुर्भाव नोंदणी',
    affectedDistrictsPrefix: 'बाधित जिल्हे:',
    inspectPrompt: 'तपशील पहा →',
    criticalOutbreakBadge: 'गंभीर प्रादुर्भाव',
    highThreatBadge: 'उच्च धोका',
    watchAdvisoryBadge: 'दक्षता सल्ला',
    monitoredBadge: 'सामान्य निरीक्षण',
    officialGovtDirectiveHeader: 'अधिकृत शासकीय आदेश आणि क्वारंटाइन नियम',
    mandatoryFieldActionsHeader: 'शेतातील अनिवार्य नियंत्रण उपाय (शासनमान्य)',
    subsidizedSuppliesHeader: 'शासकीय सहाय्य व अनुदानित औषधे:',
    otherActiveDirectivesHeader: 'इतर सक्रिय शासकीय आदेश:',
    verifiedPortalNote: 'DPPQS आणि ICAR आपत्कालीन देखरेख नेटवर्कद्वारे प्रमाणित',
    visitPortalLink: 'DPPQS पोर्टल पहा',
    emergencyDirectiveBadge: 'रेड अलर्ट • आणीबाणी शासकीय आदेश',
    warningAdvisoryBadge: 'ऑरेंज अलर्ट • अनिवार्य मार्गदर्शक तत्त्वे',
    epidemiologicalNoticeBadge: 'यलो वॉच • दक्षता सूचना',
    kisanHelplineTitle: 'किसान कॉल सेंटर: 1800-180-1551',
    validUntilPrefix: 'वैधता दिनांक',
    publishedPrefix: 'प्रसिद्ध दिनांक:',
    systemErrorLogsTitle: 'जतन केलेले सिस्टम व एरर लॉग्स',
    systemErrorLogsSubtitle: 'मॉडेल आणि नेटवर्क त्रुटींची ऑन-डिव्हाइस सुरक्षित नोंद',
    clearErrorLogsBtn: 'लॉग साफ करा',
    exportErrorLogsBtn: 'लॉग डाउनलोड करा (JSON)',
    noErrorsLogged: 'कोणतीही त्रुटी आढळली नाही. सर्व सिस्टीम सुरळीत सुरू आहेत.',
    errorCountPill: (count) => `${count} एरर जतन`,
    copyErrorDetails: 'एरर कॉपी करा',
    errorCopied: 'कॉपी झाले!',
    searchPlaceholder: 'जिल्हा किंवा पीक रोग शोधा...',
    allCropsBtn: 'सर्व पिके',
    cropFilterLabel: 'पीक:',
    noAlertsFound: 'या राज्यात कोणताही सक्रिय रोग आढळला नाही.',
    resetFilterBtn: 'फिल्टर रीसेट करा',
  },
  bn: {
    radarTitle: 'আঞ্চলিক ফসল রোগ প্রাদুর্ভাব রাডার',
    govtDatasetBadge: 'সরকারি ডেটাসেট প্রমাণিত (DPPQS ও ICAR)',
    offlineModeActiveBadge: '১০০% অফলাইন মোড সক্রিয়',
    onlineModeActiveBadge: 'লাইভ অনলাইন সিঙ্ক',
    govtCitation: 'উৎস: উদ্ভিদ সংরক্ষণ, সংগনিরোধ ও সংরক্ষণ অধিদপ্তর (dppqs.gov.in) এবং ICAR',
    lastUpdatedPrefix: 'সর্বশেষ আপডেট',
    liveRecheckBtn: '⚡ লাইভ পুনঃপরীক্ষা / সিঙ্ক',
    recheckingRadar: 'রাডার পরীক্ষা করা হচ্ছে...',
    selectStatePrefix: 'রাজ্য নির্বাচন করুন:',
    otherStatesPrefix: 'অন্যান্য রাজ্য:',
    allIndiaOverview: '🇮🇳 সমগ্র ভারত পর্যালোচনা',
    liveEmergencyDirectivesTitle: 'রোগ প্রাদুর্ভাব চলাকালীন সরকার কর্তৃক জারি করা লাইভ জরুরি নির্দেশিকা',
    viewDirectivesBtn: '▼ জরুরি নির্দেশিকা দেখুন',
    hideDirectivesBtn: '▲ নির্দেশিকা লুকান',
    vectorRadarBtn: 'ভেক্টর রাডার',
    offlineVectorRadarActive: '১০০% অফলাইন ভেক্টর SVG রাডার সক্রিয়',
    imdAgrometWeatherTrigger: 'আবহাওয়া অনুকূলতা (IMD):',
    callHelplineWithNum: 'টোল-ফ্রি কিষাণ হেল্পলাইন (1800-180-1551) কল করুন',
    listenToAdvisory: 'পরামর্শ শুনুন',
    stopVoice: 'ভয়েস বন্ধ করুন',
    listenToGovtAlert: 'সরকারি সতর্কতা শুনুন',
    stopGovtAlert: 'ভয়েস থামান',
    allDiseasesInStateTitle: (state, count) => `${state}-এ সক্রিয় সমস্ত ফসলের রোগ (সরকারি রেকর্ডে ${count}টি প্রাদুর্ভাব)`,
    verifiedEpidemiologicalSub: 'ICAR এবং DPPQS মাঠ পর্যবেক্ষণ স্টেশন থেকে সরাসরি যাচাইকৃত তথ্য',
    govtDatasetCitationBadge: 'সরকারি সূত্র: DPPQS/2026 • ICAR রোগ রেজিস্ট্রি',
    affectedDistrictsPrefix: 'আক্রান্ত জেলা:',
    inspectPrompt: 'বিস্তারিত দেখুন →',
    criticalOutbreakBadge: 'মারাত্মক প্রাদুর্ভাব',
    highThreatBadge: 'উচ্চ ঝুঁকি',
    watchAdvisoryBadge: 'সতর্কতা পরামর্শ',
    monitoredBadge: 'নিয়মিত পর্যবেক্ষণ',
    officialGovtDirectiveHeader: 'অফিসিয়াল সরকারি নির্দেশ ও কোয়ারেন্টাইন আদেশ',
    mandatoryFieldActionsHeader: 'জমিতে বাধ্যতামূলক প্রতিরোধমূলক ব্যবস্থা',
    subsidizedSuppliesHeader: 'সরকারি সহায়তা ও ভর্তুকিযুক্ত উপকরণ:',
    otherActiveDirectivesHeader: 'অন্যান্য সক্রিয় সরকারি নির্দেশিকা:',
    verifiedPortalNote: 'DPPQS এবং ICAR জরুরি পর্যবেক্ষণ নেটওয়ার্ক দ্বারা যাচাইকৃত',
    visitPortalLink: 'DPPQS পোর্টাল দেখুন',
    emergencyDirectiveBadge: 'রেড অ্যালার্ট • জরুরি সরকারি নির্দেশিকা',
    warningAdvisoryBadge: 'অরেঞ্জ অ্যালার্ট • বাধ্যতামূলক পরামর্শ',
    epidemiologicalNoticeBadge: 'ইয়েলো ওয়াচ • নজরদারি বিজ্ঞপ্তি',
    kisanHelplineTitle: 'কিষাণ কল সেন্টার: 1800-180-1551',
    validUntilPrefix: 'মেয়াদ শেষ',
    publishedPrefix: 'প্রকাশের তারিখ:',
    systemErrorLogsTitle: 'সংরক্ষিত সিস্টেম ও ডায়াগনস্টিক ত্রুটি লগ',
    systemErrorLogsSubtitle: 'মডেল টাইমআউট ও সিস্টেম ত্রুটির অন-ডিভাইস রেকর্ড',
    clearErrorLogsBtn: 'লগ মুছে ফেলুন',
    exportErrorLogsBtn: 'লগ ডাউনলোড করুন (JSON)',
    noErrorsLogged: 'কোনো ত্রুটি নেই। সমস্ত সিস্টেম স্বাভাবিকভাবে চলছে।',
    errorCountPill: (count) => `${count}টি ত্রুটি সংরক্ষিত`,
    copyErrorDetails: 'ত্রুটি কপি করুন',
    errorCopied: 'কপি হয়েছে!',
    searchPlaceholder: 'জেলা বা রোগ খুঁজুন...',
    allCropsBtn: 'সব ফসল',
    cropFilterLabel: 'ফসল:',
    noAlertsFound: 'এই রাজ্যে কোনো সক্রিয় রোগ পাওয়া যায়নি।',
    resetFilterBtn: 'ফিল্টার রিসেট করুন',
  },
  te: {
    radarTitle: 'ప్రాంతీయ పంట తెగుళ్ల వ్యాప్తి రాడార్',
    govtDatasetBadge: 'ప్రభుత్వ సమాచార ధృవీకరణ (DPPQS & ICAR)',
    offlineModeActiveBadge: '100% ఆఫ్‌లైన్ మోడ్ యాక్టివ్',
    onlineModeActiveBadge: 'లైవ్ ఆన్‌లైన్ సింక్',
    govtCitation: 'మూలం: డైరెక్టరేట్ ఆఫ్ ప్లాంట్ ప్రొటెక్షన్ (dppqs.gov.in) & ICAR నెట్‌వర్క్',
    lastUpdatedPrefix: 'చివరి అప్‌డేట్',
    liveRecheckBtn: '⚡ లైవ్ పునఃపరిశీలన / సింక్',
    recheckingRadar: 'రాడార్ తనిఖీ జరుగుతోంది...',
    selectStatePrefix: 'రాష్ట్రాన్ని ఎంచుకోండి:',
    otherStatesPrefix: 'ఇతర రాష్ట్రాలు:',
    allIndiaOverview: '🇮🇳 భారతదేశ సమగ్ర పరిశీలన',
    liveEmergencyDirectivesTitle: 'తెగుళ్ల వ్యాప్తి సమయంలో ప్రభుత్వం జారీ చేసిన ప్రత్యక్ష అత్యవసర ఆదేశాలు',
    viewDirectivesBtn: '▼ అత్యవసర ఆదేశాలను చూడండి',
    hideDirectivesBtn: '▲ ఆదేశాలను దాచండి',
    vectorRadarBtn: 'వెక్టర్ రాడార్',
    offlineVectorRadarActive: '100% ఆఫ్‌లైన్ వెక్టర్ SVG రాడార్ యాక్టివ్',
    imdAgrometWeatherTrigger: 'వాతావరణ శాఖ (IMD) వ్యాప్తి కారణాలు:',
    callHelplineWithNum: 'టోల్-ఫ్రీ కిసాన్ హెల్ప్‌లైన్ (1800-180-1551) కాల్ చేయండి',
    listenToAdvisory: 'సలహా వినండి',
    stopVoice: 'వాయిస్ ఆపండి',
    listenToGovtAlert: 'ప్రభుత్వ హెచ్చరిక వినండి',
    stopGovtAlert: 'వాయిస్ ఆపండి',
    allDiseasesInStateTitle: (state, count) => `${state} లో వ్యాప్తిలో ఉన్న అన్ని పంట తెగుళ్లు (ప్రభుత్వ రికార్డులో ${count})`,
    verifiedEpidemiologicalSub: 'ICAR మరియు DPPQS కేంద్రాల నుండి నేరుగా సేకరించిన అధికారిక నివేదిక',
    govtDatasetCitationBadge: 'ప్రభుత్వ సూచన: DPPQS/2026 • ICAR తెగుళ్ల రిజిస్ట్రీ',
    affectedDistrictsPrefix: 'ప్రభావిత జిల్లాలు:',
    inspectPrompt: 'వివరాలు చూడండి →',
    criticalOutbreakBadge: 'తీవ్రమైన వ్యాప్తి',
    highThreatBadge: 'అధిక ప్రమాదం',
    watchAdvisoryBadge: 'జాగ్రత్త సలహా',
    monitoredBadge: 'సాధారణ పర్యవేక్షణ',
    officialGovtDirectiveHeader: 'అధికారిక ప్రభుత్వ ఆదేశాలు మరియు క్వారంటైన్ నిబంధనలు',
    mandatoryFieldActionsHeader: 'పొలంలో తప్పనిసరిగా తీసుకోవలసిన చర్యలు',
    subsidizedSuppliesHeader: 'ప్రభుత్వ సహాయం మరియు రాయితీ మందులు:',
    otherActiveDirectivesHeader: 'ఇతర ప్రభుత్వ ఆదేశాలు:',
    verifiedPortalNote: 'DPPQS & ICAR ఎమర్జెన్సీ నెట్‌వర్క్ ద్వారా ధృవీకరించబడింది',
    visitPortalLink: 'DPPQS పోర్టల్ చూడండి',
    emergencyDirectiveBadge: 'రెడ్ అలర్ట్ • అత్యవసర ప్రభుత్వ ఆదేశం',
    warningAdvisoryBadge: 'ఆరెంజ్ అలర్ట్ • తప్పనిసరి సూచన',
    epidemiologicalNoticeBadge: 'ఎల్లో వాచ్ • పర్యవేక్షణ సమాచారం',
    kisanHelplineTitle: 'కిసాన్ కాల్ సెంటర్: 1800-180-1551',
    validUntilPrefix: 'చెల్లుబాటు తేదీ',
    publishedPrefix: 'ప్రచురించిన తేదీ:',
    systemErrorLogsTitle: 'భద్రపరిచిన సిస్టమ్ ఎర్రర్ లాగ్‌లు',
    systemErrorLogsSubtitle: 'ఆన్-డివైస్ రికార్డ్ చేయబడిన మోడల్ మరియు సిస్టమ్ లోపాలు',
    clearErrorLogsBtn: 'లాగ్‌లను క్లియర్ చేయండి',
    exportErrorLogsBtn: 'లాగ్‌లను డౌన్‌లోడ్ చేయండి (JSON)',
    noErrorsLogged: 'ఎలాంటి లోపాలు నమోదు కాలేదు. అన్ని సిస్టమ్‌లు సాధారణంగా పనిచేస్తున్నాయి.',
    errorCountPill: (count) => `${count} లోపాలు నమోదయ్యాయి`,
    copyErrorDetails: 'ఎర్రర్ కాపీ చేయండి',
    errorCopied: 'కాపీ అయ్యింది!',
    searchPlaceholder: 'జిల్లా లేదా తెగులును శోధించండి...',
    allCropsBtn: 'అన్ని పంటలు',
    cropFilterLabel: 'పంట:',
    noAlertsFound: 'ఈ రాష్ట్రంలో ఎటువంటి తీవ్రమైన తెగుళ్లు లేవు.',
    resetFilterBtn: 'ఫిల్టర్ రీసెట్ చేయండి',
  },
  ta: {
    radarTitle: 'பிராந்திய பயிர் நோய் பரவல் ரேடார்',
    govtDatasetBadge: 'அரசு தரவுத்தள சரிபார்ப்பு (DPPQS & ICAR)',
    offlineModeActiveBadge: '100% ஆஃப்லைன் பயன்முறை செயலில் உள்ளது',
    onlineModeActiveBadge: 'நேரடி ஆன்லைன் இணைப்பு',
    govtCitation: 'ஆதாரம்: தாவர பாதுகாப்பு மற்றும் தனிமைப்படுத்தல் இயக்குநரகம் (dppqs.gov.in) & ICAR',
    lastUpdatedPrefix: 'கடைசி புதுப்பிப்பு',
    liveRecheckBtn: '⚡ நேரடி மறுசரிபார்ப்பு / ஒத்திசைவு',
    recheckingRadar: 'ரேடார் சரிபார்க்கப்படுகிறது...',
    selectStatePrefix: 'மாநிலத்தைத் தேர்ந்தெடுக்கவும்:',
    otherStatesPrefix: 'பிற மாநிலங்கள்:',
    allIndiaOverview: '🇮🇳 அகில இந்திய பார்வை',
    liveEmergencyDirectivesTitle: 'நோய் பரவலின் போது அரசு வெளியிட்ட நேரடி அவசர வழிகாட்டுதல்கள்',
    viewDirectivesBtn: '▼ அவசர உத்தரவுகளைப் பார்க்கவும்',
    hideDirectivesBtn: '▲ உத்தரவுகளை மறைக்கவும்',
    vectorRadarBtn: 'வெக்டார் ரேடார்',
    offlineVectorRadarActive: '100% ஆஃப்லைன் வெக்டார் SVG ரேடார் செயலில் உள்ளது',
    imdAgrometWeatherTrigger: 'வானிலை ஆய்வு மைய (IMD) பரவல் சாதகங்கள்:',
    callHelplineWithNum: 'கட்டணமில்லா கிசான் உதவி எண் (1800-180-1551) அழைக்கவும்',
    listenToAdvisory: 'ஆலோசனையைக் கேளுங்கள்',
    stopVoice: 'குரலை நிறுத்தவும்',
    listenToGovtAlert: 'அரசு எச்சரிக்கையைக் கேளுங்கள்',
    stopGovtAlert: 'குரலை நிறுத்தவும்',
    allDiseasesInStateTitle: (state, count) => `${state}-ல் பரவி வரும் அனைத்து பயிர் நோய்கள் (அரசு பதிவில் ${count})`,
    verifiedEpidemiologicalSub: 'ICAR மற்றும் DPPQS மையங்களிலிருந்து நேரடியாக சரிபார்க்கப்பட்ட தகவல்',
    govtDatasetCitationBadge: 'அரசு குறிப்பு: DPPQS/2026 • ICAR நோய் பரவல் பதிவேடு',
    affectedDistrictsPrefix: 'பாதிக்கப்பட்ட மாவட்டங்கள்:',
    inspectPrompt: 'விவரங்களைப் பார்க்கவும் →',
    criticalOutbreakBadge: 'தீவிர நோய் பரவல்',
    highThreatBadge: 'அதிக ஆபத்து',
    watchAdvisoryBadge: 'கண்காணிப்பு ஆலோசனை',
    monitoredBadge: 'இயல்பான கண்காணிப்பு',
    officialGovtDirectiveHeader: 'அதிகாரப்பூர்வ அரசு ஆணை மற்றும் தனிமைப்படுத்தல் நெறிமுறைகள்',
    mandatoryFieldActionsHeader: 'வயலில் கட்டாயமாக எடுக்க வேண்டிய தடுப்பு நடவடிக்கைகள்',
    subsidizedSuppliesHeader: 'அரசு உதவி மற்றும் மானிய மருந்துகள்:',
    otherActiveDirectivesHeader: 'பிற அரசு ஆணைகள்:',
    verifiedPortalNote: 'DPPQS மற்றும் ICAR அவசர நெட்வொர்க் மூலம் சரிபார்க்கப்பட்டது',
    visitPortalLink: 'DPPQS தளத்தைப் பார்க்கவும்',
    emergencyDirectiveBadge: 'ரெட் அலர்ட் • அவசர அரசு ஆணை',
    warningAdvisoryBadge: 'ஆரஞ்ச் அலர்ட் • கட்டாய ஆலோசனை',
    epidemiologicalNoticeBadge: 'மஞ்சள் எச்சரிக்கை • கண்காணிப்பு தகவல்',
    kisanHelplineTitle: 'கிசான் கால் சென்டர்: 1800-180-1551',
    validUntilPrefix: 'செல்லுபடியாகும் தேதி',
    publishedPrefix: 'வெளியிடப்பட்ட தேதி:',
    systemErrorLogsTitle: 'சேமிக்கப்பட்ட கணினி பிழைப் பதிவுகள்',
    systemErrorLogsSubtitle: 'சாதனத்தில் பதிவு செய்யப்பட்ட மாதிரி மற்றும் அமைப்பு பிழைகள்',
    clearErrorLogsBtn: 'பதிவுகளை அழிக்கவும்',
    exportErrorLogsBtn: 'பதிவிறக்கவும் (JSON)',
    noErrorsLogged: 'பிழைகள் எதுவும் இல்லை. அனைத்து அமைப்புகளும் சரியாக இயங்குகின்றன.',
    errorCountPill: (count) => `${count} பிழைகள் பதிவு செய்யப்பட்டுள்ளன`,
    copyErrorDetails: 'பிழையை நகலெடுக்கவும்',
    errorCopied: 'நகலெடுக்கப்பட்டது!',
    searchPlaceholder: 'மாவட்டம் அல்லது நோயைத் தேடுங்கள்...',
    allCropsBtn: 'அனைத்துப் பயிர்கள்',
    cropFilterLabel: 'பயிர்:',
    noAlertsFound: 'இந்த மாநிலத்தில் நோய்கள் எதுவும் இல்லை.',
    resetFilterBtn: 'வடிப்பானை மீட்டமைக்கவும்',
  },
  kn: {
    radarTitle: 'ಪ್ರಾದೇಶಿಕ ಬೆಳೆ ರೋಗ ಹರಡುವಿಕೆ ರಾಡಾರ್',
    govtDatasetBadge: 'ಸರ್ಕಾರಿ ದತ್ತಾಂಶ ಆಧಾರಿತ (DPPQS & ICAR)',
    offlineModeActiveBadge: '100% ಆಫ್‌ಲೈನ್ ಮೋಡ್ ಸಕ್ರಿಯವಾಗಿದೆ',
    onlineModeActiveBadge: 'ಲೈವ್ ಆನ್‌ಲೈನ್ ಸಿಂಕ್',
    govtCitation: 'ಮೂಲ: ಸಸ್ಯ ಸಂರಕ್ಷಣೆ ಮತ್ತು ಸಂಗ್ರಹಣಾ ನಿರ್ದೇಶನಾಲಯ (dppqs.gov.in) & ICAR',
    lastUpdatedPrefix: 'ಕೊನೆಯ ನವೀಕರಣ',
    liveRecheckBtn: '⚡ ಲೈವ್ ಮರುಪರಿಶೀಲನೆ / ಸಿಂಕ್',
    recheckingRadar: 'ರಾಡಾರ್ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...',
    selectStatePrefix: 'ರಾಜ್ಯ ಆಯ್ಕೆಮಾಡಿ:',
    otherStatesPrefix: 'ಇತರ ರಾಜ್ಯಗಳು:',
    allIndiaOverview: '🇮🇳 ಅಖಿಲ ಭಾರತ ವೀಕ್ಷಣೆ',
    liveEmergencyDirectivesTitle: 'ರೋಗ ಹರಡುವಿಕೆ ವೇಳೆ ಸರ್ಕಾರ ಹೊರಡಿಸಿದ ಲೈವ್ ತುರ್ತು ನಿರ್ದೇಶನಗಳು',
    viewDirectivesBtn: '▼ ತುರ್ತು ನಿರ್ದೇಶನಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
    hideDirectivesBtn: '▲ ನಿರ್ದೇಶನಗಳನ್ನು ಮರೆಮಾಡಿ',
    vectorRadarBtn: 'ವೆಕ್ಟರ್ ರಾಡಾರ್',
    offlineVectorRadarActive: '100% ಆಫ್‌ಲೈನ್ ವೆಕ್ಟರ್ SVG ರಾಡಾರ್ ಸಕ್ರಿಯವಾಗಿದೆ',
    imdAgrometWeatherTrigger: 'ಹವಾಮಾನ ಇಲಾಖೆ (IMD) ರೋಗ ಪರಿಸ್ಥಿತಿ:',
    callHelplineWithNum: 'ಉಚಿತ ಕಿಸಾನ್ ಸಹಾಯವಾಣಿ (1800-180-1551) ಕರೆ ಮಾಡಿ',
    listenToAdvisory: 'ಸಲಹೆ ಆಲಿಸಿ',
    stopVoice: 'ಧ್ವನಿ ನಿಲ್ಲಿಸಿ',
    listenToGovtAlert: 'ಸರ್ಕಾರಿ ಎಚ್ಚರಿಕೆ ಆಲಿಸಿ',
    stopGovtAlert: 'ಧ್ವನಿ ನಿಲ್ಲಿಸಿ',
    allDiseasesInStateTitle: (state, count) => `${state} ನಲ್ಲಿ ಹರಡುತ್ತಿರುವ ಎಲ್ಲಾ ಬೆಳೆ ರೋಗಗಳು (ಸರ್ಕಾರಿ ದಾಖಲೆಯಲ್ಲಿ ${count})`,
    verifiedEpidemiologicalSub: 'ICAR ಮತ್ತು DPPQS ಕೇಂದ್ರಗಳಿಂದ ನೇರವಾಗಿ ಪರಿಶೀಲಿಸಿದ ಅಂಕಿಅಂಶಗಳು',
    govtDatasetCitationBadge: 'ಸರ್ಕಾರಿ ಉಲ್ಲೇಖ: DPPQS/2026 • ICAR ರೋಗ ನೋಂದಣಿ',
    affectedDistrictsPrefix: 'ಬಾಧಿತ ಜಿಲ್ಲೆಗಳು:',
    inspectPrompt: 'ವಿವರ ನೋಡಿ →',
    criticalOutbreakBadge: 'ತೀವ್ರ ಹರಡುವಿಕೆ',
    highThreatBadge: 'ಹೆಚ್ಚಿನ ಅಪಾಯ',
    watchAdvisoryBadge: 'ಎಚ್ಚರಿಕೆಯ ಸಲಹೆ',
    monitoredBadge: 'ಸಾಮಾನ್ಯ ನಿಗಾ',
    officialGovtDirectiveHeader: 'ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಆದೇಶ ಮತ್ತು ಕ್ವಾರಂಟೈನ್ ನಿಯಮಗಳು',
    mandatoryFieldActionsHeader: 'ಹೊಲದಲ್ಲಿ ಕಡ್ಡಾಯವಾಗಿ ತೆಗೆದುಕೊಳ್ಳಬೇಕಾದ ಕ್ರಮಗಳು',
    subsidizedSuppliesHeader: 'ಸರ್ಕಾರಿ ನೆರವು ಮತ್ತು ಸಬ್ಸಿಡಿ ಔಷಧಿಗಳು:',
    otherActiveDirectivesHeader: 'ಇತರ ಸರ್ಕಾರಿ ಆದೇಶಗಳು:',
    verifiedPortalNote: 'DPPQS ಮತ್ತು ICAR ತುರ್ತು ನೆಟ್‌ವರ್ಕ್ ಮೂಲಕ ಪರಿಶೀಲಿಸಲಾಗಿದೆ',
    visitPortalLink: 'DPPQS ಪೋರ್ಟಲ್ ವೀಕ್ಷಿಸಿ',
    emergencyDirectiveBadge: 'ರೆಡ್ ಅಲರ್ಟ್ • ತುರ್ತು ಸರ್ಕಾರಿ ಆದೇಶ',
    warningAdvisoryBadge: 'ಆರೆಂಜ್ ಅಲರ್ಟ್ • ಕಡ್ಡಾಯ ಸಲಹಾ ಪತ್ರ',
    epidemiologicalNoticeBadge: 'ಹಳದಿ ಎಚ್ಚರಿಕೆ • ನಿಗಾ ಸೂಚನೆ',
    kisanHelplineTitle: 'ಕಿಸಾನ್ ಕಾಲ್ ಸೆಂಟರ್: 1800-180-1551',
    validUntilPrefix: 'ಮಾನ್ಯತೆ ದಿನಾಂಕ',
    publishedPrefix: 'ಪ್ರಕಟಿಸಿದ ದಿನಾಂಕ:',
    systemErrorLogsTitle: 'ಉಳಿಸಲಾದ ಸಿಸ್ಟಮ್ ದೋಷ ಲಾಗ್‌ಗಳು',
    systemErrorLogsSubtitle: 'ಸಾಧನದಲ್ಲಿ ದಾಖಲಾದ ಮಾದರಿ ಮತ್ತು ನೆಟ್‌ವರ್ಕ್ ದೋಷಗಳು',
    clearErrorLogsBtn: 'ಲಾಗ್‌ಗಳನ್ನು ತೆರವುಗೊಳಿಸಿ',
    exportErrorLogsBtn: 'ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ (JSON)',
    noErrorsLogged: 'ಯಾವುದೇ ದೋಷಗಳಿಲ್ಲ. ಎಲ್ಲಾ ವ್ಯವಸ್ಥೆಗಳು ಸರಿಯಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿವೆ.',
    errorCountPill: (count) => `${count} ದೋಷಗಳು ದಾಖಲಾಗಿವೆ`,
    copyErrorDetails: 'ದೋಷ ನಕಲಿಸಿ',
    errorCopied: 'ನಕಲಿಸಲಾಗಿದೆ!',
    searchPlaceholder: 'ಜಿಲ್ಲೆ ಅಥವಾ ರೋಗ ಹುಡುಕಿ...',
    allCropsBtn: 'ಎಲ್ಲಾ ಬೆಳೆಗಳು',
    cropFilterLabel: 'ಬೆಳೆ:',
    noAlertsFound: 'ಈ ರಾಜ್ಯದಲ್ಲಿ ಯಾವುದೇ ಗಂಭೀರ ರೋಗಗಳಿಲ್ಲ.',
    resetFilterBtn: 'ಫಿಲ್ಟರ್ ಮರುಹೊಂದಿಸಿ',
  },
  ml: {
    radarTitle: 'പ്രാദേശിക വിള രോഗബാധ റഡാർ',
    govtDatasetBadge: 'സർക്കാർ ഡാറ്റാസെറ്റ് അടിസ്ഥാനമാക്കിയത് (DPPQS & ICAR)',
    offlineModeActiveBadge: '100% ഓഫ്‌ലൈൻ മോഡ് സജീവം',
    onlineModeActiveBadge: 'തത്സമയ ഓൺലൈൻ സിങ്ക്',
    govtCitation: 'ഉറവിടം: സസ്യ സംരക്ഷണ ഡയറക്ടറേറ്റ് (dppqs.gov.in) & ICAR',
    lastUpdatedPrefix: 'അവസാനം പുതുക്കിയത്',
    liveRecheckBtn: '⚡ പുനഃപരിശോധന / സിങ്ക്',
    recheckingRadar: 'റഡാർ പരിശോധിക്കുന്നു...',
    selectStatePrefix: 'സംസ്ഥാനം തിരഞ്ഞെടുക്കുക:',
    otherStatesPrefix: 'മറ്റ് സംസ്ഥാനങ്ങൾ:',
    allIndiaOverview: '🇮🇳 അഖിലേന്ത്യാ അവലോകനം',
    liveEmergencyDirectivesTitle: 'രോഗബാധ വേളയിൽ സർക്കാർ പുറപ്പെടുവിച്ച അടിയന്തര ഉത്തരവുകൾ',
    viewDirectivesBtn: '▼ അടിയന്തര ഉത്തരവുകൾ കാണുക',
    hideDirectivesBtn: '▲ ഉത്തരവുകൾ മറയ്ക്കുക',
    vectorRadarBtn: 'വെക്ടർ റഡാർ',
    offlineVectorRadarActive: '100% ഓഫ്‌ലൈൻ വെക്ടർ SVG റഡാർ സജീവം',
    imdAgrometWeatherTrigger: 'കാലാവസ്ഥാ നിരീക്ഷണ കേന്ദ്രം (IMD) പ്രവചനം:',
    callHelplineWithNum: 'സൗജന്യ കിസാൻ ഹെൽപ്പ്‌ലൈൻ (1800-180-1551) വിളിക്കുക',
    listenToAdvisory: 'നിർദ്ദേശം കേൾക്കുക',
    stopVoice: 'ശബ്ദം നിർത്തുക',
    listenToGovtAlert: 'സർക്കാർ മുന്നറിയിപ്പ് കേൾക്കുക',
    stopGovtAlert: 'ശബ്ദം നിർത്തുക',
    allDiseasesInStateTitle: (state, count) => `${state}-ൽ റിപ്പോർട്ട് ചെയ്ത വിള രോഗങ്ങൾ (സർക്കാർ രേഖയിൽ ${count})`,
    verifiedEpidemiologicalSub: 'ICAR, DPPQS കേന്ദ്രങ്ങൾ വഴി നേരിട്ട് സ്ഥിരീകരിച്ച വിവരങ്ങൾ',
    govtDatasetCitationBadge: 'സർക്കാർ റഫറൻസ്: DPPQS/2026 • ICAR രോഗ രജിസ്ട്രി',
    affectedDistrictsPrefix: 'ബാധിച്ച ജില്ലകൾ:',
    inspectPrompt: 'വിശദാംശങ്ങൾ കാണുക →',
    criticalOutbreakBadge: 'ഗുരുതരമായ രോഗബാധ',
    highThreatBadge: 'ഉയർന്ന അപകടസാധ്യത',
    watchAdvisoryBadge: 'ജാഗ്രതാ നിർദ്ദേശം',
    monitoredBadge: 'സാധാരണ നിരീക്ഷണം',
    officialGovtDirectiveHeader: 'ഔദ്യോഗിക സർക്കാർ ഉത്തരവും ക്വാറന്റൈൻ നിയന്ത്രണങ്ങളും',
    mandatoryFieldActionsHeader: 'പാടങ്ങളിൽ നിർബന്ധമായും ചെയ്യേണ്ട പ്രതിരോധ നടപടികൾ',
    subsidizedSuppliesHeader: 'സർക്കാർ സഹായവും സബ്‌സിഡി മരുന്നുകളും:',
    otherActiveDirectivesHeader: 'മറ്റ് സർക്കാർ ഉത്തരവുകൾ:',
    verifiedPortalNote: 'DPPQS, ICAR നെറ്റ്‌വർക്ക് വഴി സാക്ഷ്യപ്പെടുത്തിയത്',
    visitPortalLink: 'DPPQS പോർട്ടൽ സന്ദർശിക്കുക',
    emergencyDirectiveBadge: 'റെഡ് അലർട്ട് • അടിയന്തര സർക്കാർ ഉത്തരവ്',
    warningAdvisoryBadge: 'ഓറഞ്ച് അലർട്ട് • നിർബന്ധിത നിർദ്ദേശം',
    epidemiologicalNoticeBadge: 'മഞ്ഞ ജാഗ്രത • നിരീക്ഷണ മുന്നറിയിപ്പ്',
    kisanHelplineTitle: 'കിസാൻ കോൾ സെന്റർ: 1800-180-1551',
    validUntilPrefix: 'സാധുത തീയതി',
    publishedPrefix: 'പ്രസിദ്ധീകരിച്ച തീയതി:',
    systemErrorLogsTitle: 'സംരക്ഷിച്ച സിസ്റ്റം പിശക് ലോഗുകൾ',
    systemErrorLogsSubtitle: 'ഡിവൈസിൽ രേഖപ്പെടുത്തിയ മോഡൽ, സിസ്റ്റം പിശകുകൾ',
    clearErrorLogsBtn: 'ലോഗുകൾ മായ്ക്കുക',
    exportErrorLogsBtn: 'ഡൗൺലോഡ് ചെയ്യുക (JSON)',
    noErrorsLogged: 'പിശകുകളൊന്നുമില്ല. എല്ലാ സംവിധാനങ്ങളും ശരിയായി പ്രവർത്തിക്കുന്നു.',
    errorCountPill: (count) => `${count} പിശകുകൾ രേഖപ്പെടുത്തി`,
    copyErrorDetails: 'പകർപ്പാവകാശം',
    errorCopied: 'പകർത്തി!',
    searchPlaceholder: 'ജില്ലയോ രോഗമോ തിരയുക...',
    allCropsBtn: 'എല്ലാ വിളകളും',
    cropFilterLabel: 'വിള:',
    noAlertsFound: 'ഈ സംസ്ഥാനത്ത് ഗുരുതരമായ രോഗങ്ങളൊന്നുമില്ല.',
    resetFilterBtn: 'ഫിൽട്ടർ പുനഃക്രമീകരിക്കുക',
  },
  pa: {
    radarTitle: 'ਖੇਤਰੀ ਫਸਲ ਰੋਗ ਪ੍ਰਕੋਪ ਰਡਾਰ',
    govtDatasetBadge: 'ਸਰਕਾਰੀ ਡੈਟਾਸੈੱਟ ਪ੍ਰਮਾਣਿਤ (DPPQS & ICAR)',
    offlineModeActiveBadge: '100% ਆਫ਼ਲਾਈਨ ਮੋਡ ਸਰਗਰਮ',
    onlineModeActiveBadge: 'ਲਾਈਵ ਔਨਲਾਈਨ ਸਿੰਕ',
    govtCitation: 'ਸਰੋਤ: ਪੌਦਾ ਸੁਰੱਖਿਆ ਅਤੇ ਸੰਗਰੋਧ ਡਾਇਰੈਕਟੋਰੇਟ (dppqs.gov.in) ਅਤੇ ICAR',
    lastUpdatedPrefix: 'ਆਖਰੀ ਅੱਪਡੇਟ',
    liveRecheckBtn: '⚡ ਲਾਈਵ ਮੁੜ-ਜਾਂਚ / ਸਿੰਕ',
    recheckingRadar: 'ਰਡਾਰ ਦੀ ਜਾਂਚ ਜਾਰੀ ਹੈ...',
    selectStatePrefix: 'ਸੂਬਾ ਚੁਣੋ:',
    otherStatesPrefix: 'ਹੋਰ ਸੂਬੇ:',
    allIndiaOverview: '🇮🇳 ਪੂਰੇ ਭਾਰਤ ਦਾ ਜਾਇਜ਼ਾ',
    liveEmergencyDirectivesTitle: 'ਬਿਮਾਰੀ ਦੇ ਫੈਲਾਅ ਦੌਰਾਨ ਸਰਕਾਰ ਵੱਲੋਂ ਜਾਰੀ ਲਾਈਵ ਹੰਗਾਮੀ ਹਦਾਇਤਾਂ',
    viewDirectivesBtn: '▼ ਹੰਗਾਮੀ ਹਦਾਇਤਾਂ ਦੇਖੋ',
    hideDirectivesBtn: '▲ ਹਦਾਇਤਾਂ ਛੁਪਾਓ',
    vectorRadarBtn: 'ਵੈਕਟਰ ਰਡਾਰ',
    offlineVectorRadarActive: '100% ਆਫ਼ਲਾਈਨ ਵੈਕਟਰ SVG ਰਡਾਰ ਸਰਗਰਮ',
    imdAgrometWeatherTrigger: 'ਮੌਸਮ ਵਿਭਾਗ (IMD) ਅਨੁਕੂਲਤਾ:',
    callHelplineWithNum: 'ਟੋਲ-ਫ੍ਰੀ ਕਿਸਾਨ ਹੈਲਪਲਾਈਨ (1800-180-1551) ਕਾਲ ਕਰੋ',
    listenToAdvisory: 'ਸਲਾਹ ਸੁਣੋ',
    stopVoice: 'ਆਵਾਜ਼ ਬੰਦ ਕਰੋ',
    listenToGovtAlert: 'ਸਰਕਾਰੀ ਚੇਤਾਵਨੀ ਸੁਣੋ',
    stopGovtAlert: 'ਆਵਾਜ਼ ਰੋਕੋ',
    allDiseasesInStateTitle: (state, count) => `${state} ਵਿੱਚ ਫੈਲ ਰਹੀਆਂ ਸਾਰੀਆਂ ਬਿਮਾਰੀਆਂ (ਸਰਕਾਰੀ ਰਿਕਾਰਡ ਵਿੱਚ ${count})`,
    verifiedEpidemiologicalSub: 'ICAR ਅਤੇ DPPQS ਨਿਗਰਾਨੀ ਕੇਂਦਰਾਂ ਤੋਂ ਸਿੱਧੇ ਤਸਦੀਕਸ਼ੁਦਾ ਅੰਕੜੇ',
    govtDatasetCitationBadge: 'ਸਰਕਾਰੀ ਹਵਾਲਾ: DPPQS/2026 • ICAR ਰੋਗ ਰਜਿਸਟਰੀ',
    affectedDistrictsPrefix: 'ਪ੍ਰਭਾਵਿਤ ਜ਼ਿਲ੍ਹੇ:',
    inspectPrompt: 'ਵੇਰਵੇ ਦੇਖੋ →',
    criticalOutbreakBadge: 'ਗੰਭੀਰ ਪ੍ਰਕੋਪ',
    highThreatBadge: 'ਉੱਚ ਖਤਰਾ',
    watchAdvisoryBadge: 'ਨਿਗਰਾਨੀ ਸਲਾਹ',
    monitoredBadge: 'ਆਮ ਨਿਗਰਾਨੀ',
    officialGovtDirectiveHeader: 'ਅਧਿਕਾਰਤ ਸਰਕਾਰੀ ਹੁਕਮ ਅਤੇ ਕੁਆਰੰਟੀਨ ਨਿਯਮ',
    mandatoryFieldActionsHeader: 'ਖੇਤ ਵਿੱਚ ਲਾਜ਼ਮੀ ਰੋਕਥਾਮ ਉਪਾਅ (ਸਰਕਾਰ ਮਨਜ਼ੂਰਸ਼ੁਦਾ)',
    subsidizedSuppliesHeader: 'ਸਰਕਾਰੀ ਸਹਾਇਤਾ ਅਤੇ ਸਬਸਿਡੀ ਵਾਲੀਆਂ ਦਵਾਈਆਂ:',
    otherActiveDirectivesHeader: 'ਹੋਰ ਸਰਕਾਰੀ ਹਦਾਇਤਾਂ:',
    verifiedPortalNote: 'DPPQS ਅਤੇ ICAR ਨੈੱਟਵਰਕ ਦੁਆਰਾ ਤਸਦੀਕਸ਼ੁਦਾ',
    visitPortalLink: 'DPPQS ਪੋਰਟਲ ਦੇਖੋ',
    emergencyDirectiveBadge: 'ਰੈੱਡ ਅਲਰਟ • ਹੰਗਾਮੀ ਸਰਕਾਰੀ ਹੁਕਮ',
    warningAdvisoryBadge: 'ਓਰੇਂਜ ਅਲਰਟ • ਲਾਜ਼ਮੀ ਸਲਾਹ',
    epidemiologicalNoticeBadge: 'ਯੈਲੋ ਵਾਚ • ਨਿਗਰਾਨੀ ਨੋਟਿਸ',
    kisanHelplineTitle: 'ਕਿਸਾਨ ਕਾਲ ਸੈਂਟਰ: 1800-180-1551',
    validUntilPrefix: 'ਮਿਆਦ ਪੁੱਗਣ ਦੀ ਮਿਤੀ',
    publishedPrefix: 'ਜਾਰੀ ਮਿਤੀ:',
    systemErrorLogsTitle: 'ਸੰਭਾਲੇ ਗਏ ਸਿਸਟਮ ਐਰਰ ਲੌਗਜ਼',
    systemErrorLogsSubtitle: 'ਡਿਵਾਈਸ ਤੇ ਸੁਰੱਖਿਅਤ ਮਾਡਲ ਅਤੇ ਸਿਸਟਮ ਗਲਤੀਆਂ ਦਾ ਰਿਕਾਰਡ',
    clearErrorLogsBtn: 'ਲੌਗ ਸਾਫ਼ ਕਰੋ',
    exportErrorLogsBtn: 'ਡਾਊਨਲੋਡ ਕਰੋ (JSON)',
    noErrorsLogged: 'ਕੋਈ ਗਲਤੀ ਦਰਜ ਨਹੀਂ। ਸਾਰੇ ਸਿਸਟਮ ਠੀਕ ਚੱਲ ਰਹੇ ਹਨ।',
    errorCountPill: (count) => `${count} ਗਲਤੀਆਂ ਦਰਜ`,
    copyErrorDetails: 'ਕਾਪੀ ਕਰੋ',
    errorCopied: 'ਕਾਪੀ ਹੋ ਗਿਆ!',
    searchPlaceholder: 'ਜ਼ਿਲ੍ਹਾ ਜਾਂ ਬਿਮਾਰੀ ਖੋਜੋ...',
    allCropsBtn: 'ਸਾਰੀਆਂ ਫਸਲਾਂ',
    cropFilterLabel: 'ਫਸਲ:',
    noAlertsFound: 'ਇਸ ਸੂਬੇ ਵਿੱਚ ਕੋਈ ਸਰਗਰਮ ਬਿਮਾਰੀ ਨਹੀਂ ਹੈ।',
    resetFilterBtn: 'ਫਿਲਟਰ ਰੀਸੈੱਟ ਕਰੋ',
  },
  or: {
    radarTitle: 'ଆଞ୍ଚଳିକ ଫସଲ ରୋଗ ପ୍ରକୋପ ରାଡାର',
    govtDatasetBadge: 'ସରକାରୀ ତଥ୍ୟାବଳୀ ପ୍ରମାଣିତ (DPPQS & ICAR)',
    offlineModeActiveBadge: '100% ଅଫଲାଇନ୍ ମୋଡ୍ ସକ୍ରିୟ',
    onlineModeActiveBadge: 'ଲାଇଭ୍ ଅନଲାଇନ୍ ସିଙ୍କ୍',
    govtCitation: 'ଉତ୍ସ: ଉଦ୍ଭିଦ ସଂରକ୍ଷଣ ନିର୍ଦ୍ଦେଶାଳୟ (dppqs.gov.in) ଓ ICAR',
    lastUpdatedPrefix: 'ଶେଷ ଅପଡେଟ୍',
    liveRecheckBtn: '⚡ ଲାଇଭ୍ ପୁନଃ ଯାଞ୍ଚ / ସିଙ୍କ୍',
    recheckingRadar: 'ରାଡାର ଯାଞ୍ଚ ଚାଲିଛି...',
    selectStatePrefix: 'ରାଜ୍ୟ ଚୟନ କରନ୍ତୁ:',
    otherStatesPrefix: 'ଅନ୍ୟ ରାଜ୍ୟ:',
    allIndiaOverview: '🇮🇳 ସମଗ୍ର ଭାରତ ଅବଲୋକନ',
    liveEmergencyDirectivesTitle: 'ରୋଗ ପ୍ରକୋପ ସମୟରେ ସରକାରଙ୍କ ଜରୁରୀକାଳୀନ ନିର୍ଦ୍ଦେଶାବଳୀ',
    viewDirectivesBtn: '▼ ଜରୁରୀ ନିର୍ଦ୍ଦେଶ ଦେଖନ୍ତୁ',
    hideDirectivesBtn: '▲ ନିର୍ଦ୍ଦେଶ ଲୁଚାନ୍ତୁ',
    vectorRadarBtn: 'ଭେକ୍ଟର ରାଡାର',
    offlineVectorRadarActive: '100% ଅଫଲାଇନ୍ ଭେକ୍ଟର SVG ରାଡାର ସକ୍ରିୟ',
    imdAgrometWeatherTrigger: 'ପାଣିପାଗ ବିଭାଗ (IMD) ରୋଗ ଅନୁକୂଳତା:',
    callHelplineWithNum: 'ଟୋଲ୍-ଫ୍ରି କିଷାନ୍ ହେଲ୍ପଲାଇନ୍ (1800-180-1551) କଲ୍ କରନ୍ତୁ',
    listenToAdvisory: 'ପରାମର୍ଶ ଶୁଣନ୍ତୁ',
    stopVoice: 'ଶବ୍ଦ ବନ୍ଦ କରନ୍ତୁ',
    listenToGovtAlert: 'ସରକାରୀ ଚେତାବନୀ ଶୁଣନ୍ତୁ',
    stopGovtAlert: 'ଶବ୍ଦ ବନ୍ଦ କରନ୍ତୁ',
    allDiseasesInStateTitle: (state, count) => `${state} ରେ ସକ୍ରିୟ ସମସ୍ତ ଫସଲ ରୋଗ (ସରକାରୀ ତାଲିକାରେ ${count} ଟି ପ୍ରକୋପ)`,
    verifiedEpidemiologicalSub: 'ICAR ଏବଂ DPPQS କେନ୍ଦ୍ରରୁ ସିଧାସଳଖ ପ୍ରମାଣିତ ତଥ୍ୟ',
    govtDatasetCitationBadge: 'ସରକାରୀ ରେଫରେନ୍ସ: DPPQS/2026 • ICAR ରୋଗ ରେଜିଷ୍ଟ୍ରି',
    affectedDistrictsPrefix: 'ପ୍ରଭାବିତ ଜିଲ୍ଲା:',
    inspectPrompt: 'ବିବରଣୀ ଦେଖନ୍ତୁ →',
    criticalOutbreakBadge: 'ଗମ୍ଭୀର ପ୍ରକୋପ',
    highThreatBadge: 'ଉଚ୍ଚ ବିପଦ',
    watchAdvisoryBadge: 'ଦୃଷ୍ଟି ରଖିବା ପରାମର୍ଶ',
    monitoredBadge: 'ନିୟମିତ ନିରୀକ୍ଷଣ',
    officialGovtDirectiveHeader: 'ସରକାରୀ ନିର୍ଦ୍ଦେଶ ଏବଂ କ୍ୱାରେଣ୍ଟାଇନ୍ ନିୟମାବଳୀ',
    mandatoryFieldActionsHeader: 'ଜମିରେ ବାଧ୍ୟତାମୂଳକ ନିୟନ୍ତ୍ରଣ ପଦକ୍ଷେପ',
    subsidizedSuppliesHeader: 'ସରକାରୀ ସହାୟତା ଏବଂ ରିହାତି ଔଷଧ:',
    otherActiveDirectivesHeader: 'ଅନ୍ୟାନ୍ୟ ସରକାରୀ ନିର୍ଦ୍ଦେଶ:',
    verifiedPortalNote: 'DPPQS ଏବଂ ICAR ନେଟୱାର୍କ ଦ୍ୱାରା ପ୍ରମାଣିତ',
    visitPortalLink: 'DPPQS ପୋର୍ଟାଲ୍ ଦେଖନ୍ତୁ',
    emergencyDirectiveBadge: 'ରେଡ୍ ଆଲର୍ଟ • ଜରୁରୀ ସରକାରୀ ନିର୍ଦ୍ଦେଶ',
    warningAdvisoryBadge: 'ଅରେଞ୍ଜ୍ ଆଲର୍ଟ • ବାଧ୍ୟତାମୂଳକ ପରାମର୍ଶ',
    epidemiologicalNoticeBadge: 'ହଳଦିଆ ସତର୍କତା • ନଜର ରଖିବା ସୂଚନା',
    kisanHelplineTitle: 'କିଷାନ୍ କଲ୍ ସେଣ୍ଟର୍: 1800-180-1551',
    validUntilPrefix: 'ବୈଧତା ତାରିଖ',
    publishedPrefix: 'ପ୍ରକାଶନ ତାରିଖ:',
    systemErrorLogsTitle: 'ସଂରକ୍ଷିତ ସିଷ୍ଟମ୍ ତ୍ରୁଟି ଲଗ୍',
    systemErrorLogsSubtitle: 'ଡିଭାଇସରେ ରେକର୍ଡ ହୋଇଥିବା ମଡେଲ୍ ଏବଂ ସିଷ୍ଟମ୍ ତ୍ରୁଟି',
    clearErrorLogsBtn: 'ଲଗ୍ ସଫା କରନ୍ତୁ',
    exportErrorLogsBtn: 'ଡାଉନଲୋଡ୍ କରନ୍ତୁ (JSON)',
    noErrorsLogged: 'କୌଣସି ତ୍ରୁଟି ନାହିଁ। ସମସ୍ତ ସିଷ୍ଟମ୍ ସଠିକ୍ ଭାବରେ ଚାଲୁଛି।',
    errorCountPill: (count) => `${count} ଟି ତ୍ରୁଟି ସଂରକ୍ଷିତ`,
    copyErrorDetails: 'କପି କରନ୍ତୁ',
    errorCopied: 'କପି ହୋଇଗଲା!',
    searchPlaceholder: 'ଜିଲ୍ଲା କିମ୍ବା ରୋଗ ଖୋଜନ୍ତୁ...',
    allCropsBtn: 'ସମସ୍ତ ଫସଲ',
    cropFilterLabel: 'ଫସଲ:',
    noAlertsFound: 'ଏହି ରାଜ୍ୟରେ କୌଣସି ସକ୍ରିୟ ରୋଗ ନାହିଁ।',
    resetFilterBtn: 'ଫିଲ୍ଟର୍ ରିସେଟ୍ କରନ୍ତୁ',
  },
  as: {
    radarTitle: 'আঞ্চলিক শস্য ৰোগ প্ৰকোপ ৰাডাৰ',
    govtDatasetBadge: 'চৰকাৰী তথ্যভিত্তিক (DPPQS & ICAR)',
    offlineModeActiveBadge: '১০০% অফলাইন মোড সক্ৰিয়',
    onlineModeActiveBadge: 'লাইভ অনলাইন সমকালীনকৰণ',
    govtCitation: 'উৎস: উদ্ভিদ সংৰক্ষণ সঞ্চালকালয় (dppqs.gov.in) আৰু ICAR',
    lastUpdatedPrefix: 'শেহতীয়া আপডেট',
    liveRecheckBtn: '⚡ লাইভ পুনৰ নিৰীক্ষণ / সংমিশ্ৰণ',
    recheckingRadar: 'ৰাডাৰ পৰীক্ষা চলি আছে...',
    selectStatePrefix: 'ৰাজ্য বাছক:',
    otherStatesPrefix: 'অন্যান্য ৰাজ্য:',
    allIndiaOverview: '🇮🇳 সমগ্ৰ ভাৰত পৰ্যালোচনা',
    liveEmergencyDirectivesTitle: 'ৰোগ প্ৰকোপৰ সময়ত চৰকাৰে জাৰি কৰা জৰুৰী নিৰ্দেশনা',
    viewDirectivesBtn: '▼ জৰুৰী নিৰ্দেশনা চাওক',
    hideDirectivesBtn: '▲ নিৰ্দেশনা লুকুৱাওক',
    vectorRadarBtn: 'ভেক্টৰ ৰাডাৰ',
    offlineVectorRadarActive: '১০০% অফলাইন ভেক্টৰ SVG ৰাডাৰ সক্ৰিয়',
    imdAgrometWeatherTrigger: 'বতৰ বিজ্ঞান কেন্দ্ৰ (IMD) ৰোগ অনুকূলতা:',
    callHelplineWithNum: 'টোল-ফ্ৰী কিষাণ হেল্পলাইন (1800-180-1551) কল কৰক',
    listenToAdvisory: 'পৰামৰ্শ শুনক',
    stopVoice: 'কণ্ঠ বন্ধ কৰক',
    listenToGovtAlert: 'চৰকাৰী সতৰ্কবাণী শুনক',
    stopGovtAlert: 'কণ্ঠ বন্ধ কৰক',
    allDiseasesInStateTitle: (state, count) => `${state}-ত সক্ৰিয় সকলো শস্য ৰোগ (চৰকাৰী তালিকাত ${count}টা প্ৰকোপ)`,
    verifiedEpidemiologicalSub: 'ICAR আৰু DPPQS কেন্দ্ৰৰ পৰা পোনপটীয়াকৈ প্ৰমাণিত তথ্য',
    govtDatasetCitationBadge: 'চৰকাৰী তথ্যসূত্ৰ: DPPQS/2026 • ICAR ৰোগ পঞ্জীয়ন',
    affectedDistrictsPrefix: 'আক্ৰান্ত জিলা:',
    inspectPrompt: 'বিৱৰণ চাওক →',
    criticalOutbreakBadge: 'গুৰুতৰ প্ৰকোপ',
    highThreatBadge: 'উচ্চ আশংকা',
    watchAdvisoryBadge: 'নজৰ ৰখা পৰামৰ্শ',
    monitoredBadge: 'সাধাৰণ নিৰীক্ষণ',
    officialGovtDirectiveHeader: 'চৰকাৰী নিৰ্দেশ আৰু কোৱাৰেণ্টাইন বিধি',
    mandatoryFieldActionsHeader: 'পথাৰত বাধ্যতামূলক প্ৰতিৰোধমূলক ব্যৱস্থা',
    subsidizedSuppliesHeader: 'চৰকাৰী সাহায্য আৰু ৰেহাইযুক্ত ঔষধ:',
    otherActiveDirectivesHeader: 'অন্যান্য চৰকাৰী নিৰ্দেশনা:',
    verifiedPortalNote: 'DPPQS আৰু ICAR জৰুৰী নেটৱৰ্কৰ দ্বাৰা প্ৰমাণিত',
    visitPortalLink: 'DPPQS পৰ্টেল চাওক',
    emergencyDirectiveBadge: 'ৰেড এলাৰ্ট • জৰুৰী চৰকাৰী নিৰ্দেশ',
    warningAdvisoryBadge: 'অৰেঞ্জ এলাৰ্ট • বাধ্যতামূলক পৰামৰ্শ',
    epidemiologicalNoticeBadge: 'হালধীয়া সতৰ্কতা • নিৰীক্ষণ জাননী',
    kisanHelplineTitle: 'কিষাণ কল চেণ্টাৰ: 1800-180-1551',
    validUntilPrefix: 'ম্যাদ শেষ',
    publishedPrefix: 'প্ৰকাশৰ তাৰিখ:',
    systemErrorLogsTitle: 'সংৰক্ষিত চিষ্টেম আৰু নিদান ত্ৰুটি লগ',
    systemErrorLogsSubtitle: 'মডেল টাইমআউট আৰু নেটৱৰ্ক ত্ৰুটিৰ অন-ডিভাইচ তথ্য',
    clearErrorLogsBtn: 'লগ মচক',
    exportErrorLogsBtn: 'ডাউনলোড কৰক (JSON)',
    noErrorsLogged: 'কোনো ত্ৰুটি পোৱা নগ’ল। সকলো চিষ্টেম সঠিকভাৱে চলি আছে।',
    errorCountPill: (count) => `${count}টা ত্ৰুটি সংৰক্ষিত`,
    copyErrorDetails: 'ত্ৰুটি কপি কৰক',
    errorCopied: 'কপি হ’ল!',
    searchPlaceholder: 'জিলা বা ৰোগ সন্ধান কৰক...',
    allCropsBtn: 'সকলো শস্য',
    cropFilterLabel: 'শস্য:',
    noAlertsFound: 'এই ৰাজ্যত কোনো সক্ৰিয় ৰোগ নাই।',
    resetFilterBtn: 'ফিল্টাৰ ৰিচেট কৰক',
  },
};

export function getLocalizedOutbreakUI(lang: LanguageCode = 'en'): OutbreakUIStrings {
  return OUTBREAK_UI_LOCALES[lang] || OUTBREAK_UI_LOCALES.en;
}

/**
 * Multi-lingual translations for Government Emergency Outbreak Directives
 */
export function getLocalizedGovtAlertText(
  alert: GovtEmergencyOutbreakAlert,
  lang: LanguageCode = 'en'
): {
  headline: string;
  officialDirective: string;
  mandatoryActions: string[];
  subsidizedSupplies: string;
} {
  if (lang === 'en') {
    return {
      headline: alert.headline,
      officialDirective: alert.officialDirective,
      mandatoryActions: alert.mandatoryActions,
      subsidizedSupplies: alert.subsidizedSupplies,
    };
  }

  // Hindi Translations
  if (lang === 'hi') {
    if (alert.id === 'govt-alert-gj-01') {
      return {
        headline: 'आपातकालीन रोकथाम निर्देश: सौराष्ट्र में सफेद मक्खी की उच्च सक्रियता एवं कपास लीफ कर्ल वायरस का प्रसार',
        officialDirective: 'वनस्पति संरक्षण, संगरोध एवं संग्रह निदेशालय (DPPQS) तथा ICAR-CICR ने सौराष्ट्र क्षेत्र के लिए लेवल-1 आपातकालीन निर्देश जारी किया है। सफेद मक्खी के तीव्र प्रसार को रोकने हेतु तत्काल सामूहिक नियंत्रण अनिवार्य है।',
        mandatoryActions: [
          'सभी प्रभावित कपास खेतों में फसल की ऊंचाई पर पीले चिपचिपे ट्रैप (10-12 ट्रैप प्रति एकड़) तुरंत लगाएं।',
          'नर्सरी पौधों या पत्तियों के अवशेषों को अन्य तालुकों/जिलों में ले जाने पर पूर्ण प्रतिबंध रहेगा।',
          'सफेद मक्खी नियंत्रण हेतु सुबह या शाम के शांत समय में डायफेंथियूरॉन 50% WP (1 ग्राम/लीटर) का छिड़काव करें।',
          'मेड़ों और नहरों के किनारे मौजूद खरपतवारों (कंधी बूटी/एब्यूटिलॉन) को जड़ से उखाड़कर नष्ट करें।',
        ],
        subsidizedSupplies: 'जूनागढ़ और राजकोट कृषि विज्ञान केंद्र (KVK) द्वारा पीले स्टिकी ट्रैप का निःशुल्क वितरण एवं नीम आधारित कीटनाशकों पर 50% सरकारी अनुदान।',
      };
    }
    if (alert.id === 'govt-alert-pb-01') {
      return {
        headline: 'फाइटोफ्थोरा बीजाणु विस्फोट चेतावनी: दोआबा आलू बेल्ट में घना कोहरा एवं उच्च आर्द्रता',
        officialDirective: 'ICAR-CPRI निगरानी टावरों के अनुसार वायुमंडलीय परिस्थितियां रोग प्रकोप सीमा (>90% आर्द्रता) को पार कर चुकी हैं। सभी आलू उत्पादकों को तुरंत सुरक्षात्मक फफूंदनाशक छिड़काव करने का निर्देश दिया जाता है।',
        mandatoryActions: [
          'स्वस्थ पौधों पर मैंकोजेब 75% WP (2.5 किग्रा/हेक्टेयर) का सुरक्षात्मक पर्णीय छिड़काव करें।',
          'शुरुआती लक्षण दिखने पर तुरंत प्रणालीगत फफूंदनाशक: साइमोक्सानिल + मैंकोजेब (1.5 किग्रा/हेक्टेयर) का प्रयोग करें।',
          'फव्वारा (स्प्रिंकलर) सिंचाई तुरंत बंद करें; अत्यधिक जलभराव तना गलन को बढ़ावा देता है।',
          'संक्रमित पौधों को कंदों सहित उखाड़कर चूने के गड्ढे में गहराई से दबाएं।',
        ],
        subsidizedSupplies: 'पंजाब कृषि विश्वविद्यालय (PAU) और KVK जालंधर डिपो के माध्यम से रियायती प्रमाणित फफूंदनाशक किट उपलब्ध।',
      };
    }
    if (alert.id === 'govt-alert-mh-01') {
      return {
        headline: 'उच्च प्रकोप निर्देश: नासिक और सांगली के अंगूर बागों में घने बादल एवं सुबह की ओस',
        officialDirective: 'ICAR-NRCG के अनुसार छंटाई किए गए अंगूर के बगीचों में डाउनी मिल्ड्यू संक्रमण का गंभीर जोखिम है। उचित वायु संचार एवं समय पर प्रणालीगत सुरक्षा आवश्यक है।',
        mandatoryActions: [
          'हवा के बहाव के लिए बेलों की अतिरिक्त पत्तियों और शाखाओं की छंटाई करें।',
          'फूल खिलने से पहले पोटेशियम फॉस्फोनेट (3 ग्राम/लीटर) या डाइमेथोमोर्फ (1 ग्राम/लीटर) का छिड़काव करें।',
          'पत्तियों की निचली सतह पर दवा का छिड़काव सुनिश्चित करें जहां फफूंद पनपती है।',
        ],
        subsidizedSupplies: 'KVK नासिक द्वारा ट्राइकोडर्मा और स्यूडोमोनास बायो-कंट्रोल कल्चर पर 40% राज्य अनुदान।',
      };
    }
  }

  // Gujarati Translations
  if (lang === 'gu') {
    if (alert.id === 'govt-alert-gj-01') {
      return {
        headline: 'કટોકટી નિયંત્રણ આદેશ: સૌરાષ્ટ્ર કપાસ પટ્ટામાં સફેદ માખી અને લીફ કર્લ વાયરસનો ઉચ્ચ ઉપદ્રવ',
        officialDirective: 'વનસ્પતિ સંરક્ષણ નિયામક કચેરી (DPPQS) અને ICAR-CICR દ્વારા સૌરાષ્ટ્ર માટે લેવલ-૧ કટોકટી આદેશ જારી કરાયો છે. સફેદ માખીના ફેલાવાને રોકવા માટે તાત્કાલિક સામુહિક પગલાં ફરજિયાત છે.',
        mandatoryActions: [
          'કપાસના તમામ ખેતરોમાં પીળા ચીકણા ટ્રેપ (૧૦-૧૨ ટ્રેપ પ્રતિ એકર) તાત્કાલિક લગાવો.',
          'નર્સરીના રોપાઓ કે લીલા પાંદડાઓનો અન્ય તાલુકા કે જિલ્લામાં પરિવહન પર સંપૂર્ણ પ્રતિબંધ.',
          'સફેદ માખી નિયંત્રણ માટે સવારના કે સાંજના સમયે ડાયફેન્થિયુરોન 50% WP (૧ ગ્રામ/લિટર) નો છંટકાવ કરો.',
          'શેઢા-પાળા પરથી ખપટી (કાંસકી) અને અન્ય નીંદણ મૂળમાંથી ઉખેડીને નાશ કરો.',
        ],
        subsidizedSupplies: 'જૂનાગઢ અને રાજકોટ કેવીકે (KVK) કેન્દ્રો પર પીળા સ્ટીકી ટ્રેપનું વિનામૂલ્યે વિતરણ અને લીમડા યુક્ત જંતુનાશકો પર 50% સરકારી સબસિડી.',
      };
    }
    if (alert.id === 'govt-alert-pb-01') {
      return {
        headline: 'બટાકા પાછોતરા સુકારા ચેતવણી: દોઆબા ક્ષેત્રમાં ગાઢ ધુમ્મસ અને રાત્રિ ભેજ',
        officialDirective: 'ICAR-CPRI ના અહેવાલ મુજબ વાતાવરણમાં રોગચાળો ફેલાવાની સ્થિતિ સર્જાઈ છે. તમામ બટાકા પકવતા ખેડૂતોને રક્ષણાત્મક ફૂગનાશકનો છંટકાવ કરવાની સૂચના આપવામાં આવે છે.',
        mandatoryActions: [
          'તંદુરસ્ત છોડ પર મેન્કોઝેબ 75% WP (૨.૫ કિગ્રા/હેક્ટર) નો રક્ષણાત્મક છંટકાવ કરો.',
          'લક્ષણો દેખાય કે તરત જ સાયમોક્સેનિલ + મેન્કોઝેબ (૧.૫ કિગ્રા/હેક્ટર) નો ઉપયોગ કરો.',
          'ફુવારા પદ્ધતિથી પિયત તાત્કાલિક બંધ કરો; વધુ પડતો ભેજ રોગ વધારે છે.',
          'ચેપગ્રસ્ત છોડને મૂળ અને બટાકા સહિત ઉખાડીને ચૂનાના ખાડામાં દાટો.',
        ],
        subsidizedSupplies: 'પંજાબ એગ્રીકલ્ચર યુનિવર્સિટી અને KVK કેન્દ્રો પર સબસિડીવાળી પ્રમાણિત ફૂગનાશક કિટ ઉપલબ્ધ.',
      };
    }
    if (alert.id === 'govt-alert-mh-01') {
      return {
        headline: 'દ્રાક્ષ છારો અને તળછારો કટોકટી આદેશ: નાસિક અને સાંગલીમાં વાદળછાયું વાતાવરણ',
        officialDirective: 'ICAR-NRCG ના વૈજ્ઞાનિકો મુજબ દ્રાક્ષની વાડીઓમાં ડાઉની મિલ્ડ્યુનો ભારે ખતરો છે. વાવેતરમાં હવા-ઉજાસ જાળવવો અત્યંત જરૂરી છે.',
        mandatoryActions: [
          'વાડીમાં હવાના પરિભ્રમણ માટે વધારાની ફૂટો અને પાંદડાં દૂર કરો.',
          'પોટેશિયમ ફોસ્ફોનેટ (૩ ગ્રામ/લિટર) અથવા ડાયમેથોમોર્ફ (૧ ગ્રામ/લિટર) નો છંટકાવ કરો.',
          'પાંદડાની નીચેની બાજુએ પૂરતો છંટકાવ થાય તેની ખાસ કાળજી રાખો.',
        ],
        subsidizedSupplies: 'KVK નાસિક દ્વારા ટ્રાઇકોડર્મા જૈવિક કલ્ચર પર 40% રાજ્ય સબસિડી.',
      };
    }
  }

  // Marathi Translations
  if (lang === 'mr') {
    if (alert.id === 'govt-alert-mh-01') {
      return {
        headline: 'तातडीचा उद्रेक आदेश: नाशिक व सांगली द्राक्ष पट्ट्यात ढगाळ हवामान व केवडा प्रादुर्भाव',
        officialDirective: 'ICAR-NRCG आणि महाराष्ट्र कृषी विभागाकडून तातडीचे निर्देश जारी. द्राक्ष बागांमध्ये हवेचे योग्य खेळते वातावरण राखणे व प्रतिबंधात्मक फवारणी करणे अनिवार्य आहे.',
        mandatoryActions: [
          'द्राक्ष बागेतील अतिरिक्त फुटवे व पाने काढून हवा खेळती ठेवा.',
          'पोटॅशियम फॉस्फोनेट (३ ग्रॅम/लिटर) किंवा डायमेथोमॉर्फ (१ ग्रॅम/लिटर) ची प्रतिबंधात्मक फवारणी करा.',
          'पानांच्या मागच्या बाजूला फवारणी पोहोचेल याची खबरदारी घ्या.',
        ],
        subsidizedSupplies: 'KVK नाशिकमार्फत ट्रायकोडर्मा जैविक बुरशीनाशकावर ४०% राज्य शासकीय अनुदान.',
      };
    }
    if (alert.id === 'govt-alert-gj-01') {
      return {
        headline: 'आपातकालीन नियंत्रण आदेश: सौराष्ट्र कापूस पट्ट्यात पांढरी माशी व लीफ कर्ल विषाणूचा प्रसार',
        officialDirective: 'DPPQS आणि ICAR-CICR कडून कापूस पिकासाठी पातळी-१ आणीबाणी निर्देश जारी.',
        mandatoryActions: [
          'सर्व शेतांमध्ये पिवळे चिकट सापळे (१०-१२ प्रति एकर) त्वरित लावा.',
          'रोपवाटिका रोपांची एका तालुक्यातून दुसऱ्या तालुक्यात वाहतूक पूर्णपणे बंद ठेवा.',
          'डायफेंथियूरॉन ५०% WP ची सकाळच्या शांत वातावरणात फवारणी करा.',
        ],
        subsidizedSupplies: 'कृषी विज्ञान केंद्रांकडून मोफत चिकट सापळे व कडुनिंब कीटकनाशकांवर ५०% अनुदान.',
      };
    }
  }

  // Bengali Translations
  if (lang === 'bn') {
    if (alert.id === 'govt-alert-wb-01' || alert.id === 'govt-alert-gj-01') {
      return {
        headline: 'জরুরি সরকারি সতর্কবার্তা: ধান ও তুলোয় ব্লাস্ট এবং পোকার সংক্রমণ নিয়ন্ত্রণ নির্দেশিকা',
        officialDirective: 'DPPQS এবং ICAR কৃষি নজরদারি কেন্দ্র কর্তৃক জরুরি উচ্চ সতর্কবার্তা জারি করা হয়েছে। অবিলম্বে রোগাক্রান্ত এলাকায় যৌথ নিয়ন্ত্রণ ব্যবস্থা গ্রহণ করুন।',
        mandatoryActions: [
          'আক্রান্ত জমিতে ট্রাইসাইক্লাজোল ৭৫% WP (০.৬ গ্রাম/লিটার) ছিটান।',
          'জমিতে ইউরিয়া সারের মাত্রাতিরিক্ত ব্যবহার অবিলম্বে বন্ধ করুন।',
          'হলুদ স্টিকি ট্র্যাপ প্রতি বিঘায় অন্তত ৪টি স্থাপন করুন।',
        ],
        subsidizedSupplies: 'স্থানীয় কৃষি বিজ্ঞান কেন্দ্র (KVK) থেকে বিনামূল্যে ট্রাইকোডার্মা ও ভরতুকিযুক্ত ওষুধ সংগ্রহ করুন।',
      };
    }
  }

  // Telugu Translations
  if (lang === 'te') {
    return {
      headline: `అత్యవసర ప్రభుత్వ ఆదేశాలు: ${alert.stateName} లో ${alert.crop} పంటకు ${alert.diseaseName} వ్యాప్తి నివారణ`,
      officialDirective: `${alert.issuingAuthority} ద్వారా అత్యవసర వ్యవసాయ ఆదేశాలు జారీ చేయబడ్డాయి. రైతులు వెంటనే నివారణ చర్యలు చేపట్టవలసిందిగా కోరడమైనది.`,
      mandatoryActions: alert.mandatoryActions,
      subsidizedSupplies: `రైతు భరోసా కేంద్రాలు మరియు KVK ల ద్వారా రాయితీ మందులు మరియు ఉచిత ఎల్లో స్టిక్కీ ట్రాప్స్ అందుబాటులో ఉన్నాయి.`,
    };
  }

  // Tamil Translations
  if (lang === 'ta') {
    return {
      headline: `அரசு அவசர உத்தரவு: ${alert.stateName} பகுதியில் ${alert.crop} பயிரில் ${alert.diseaseName} நோய் தடுப்பு நடவடிக்கை`,
      officialDirective: `${alert.issuingAuthority} மூலம் அவசர வேளாண்மை எச்சரிக்கை விடுக்கப்பட்டுள்ளது. விவசாயிகள் உடனடியாக பரிந்துரைக்கப்பட்ட பாதுகாப்பு நடவடிக்கைகளை மேற்கொள்ளவும்.`,
      mandatoryActions: alert.mandatoryActions,
      subsidizedSupplies: `வேளாண் அறிவியல் மையம் (KVK) மூலம் மானிய விலையில் உயிர் பூஞ்சாண மருந்துகள் வழங்கப்படுகின்றன.`,
    };
  }

  // Kannada Translations
  if (lang === 'kn') {
    return {
      headline: `ತುರ್ತು ಸರ್ಕಾರಿ ನಿರ್ದೇಶನ: ${alert.stateName} ದಲ್ಲಿ ${alert.crop} ಬೆಳೆಗೆ ${alert.diseaseName} ರೋಗ ಹರಡುವಿಕೆ ನಿಯಂತ್ರಣ`,
      officialDirective: `${alert.issuingAuthority} ವತಿಯಿಂದ ತುರ್ತು ಎಚ್ಚರಿಕೆ ಆದೇಶ ಹೊರಡಿಸಲಾಗಿದೆ. ರೈತರು ತಕ್ಷಣವೇ ಸಾಮೂಹಿಕ ನಿಯಂತ್ರಣ ಕ್ರಮಗಳನ್ನು ಕೈಗೊಳ್ಳಬೇಕು.`,
      mandatoryActions: alert.mandatoryActions,
      subsidizedSupplies: `ಸ್ಥಳೀಯ ಕೃಷಿ ವಿಜ್ಞಾನ ಕೇಂದ್ರ (KVK) ದಲ್ಲಿ ರಿಯಾಯಿತಿ ದರದಲ್ಲಿ ಜೈವಿಕ ಕೀಟನಾಶಕಗಳು ಲಭ್ಯವಿದೆ.`,
    };
  }

  // Malayalam Translations
  if (lang === 'ml') {
    return {
      headline: `അടിയന്തര സർക്കാർ നിർദ്ദേശം: ${alert.stateName} സംസ്ഥാനത്ത് ${alert.crop} വിളയിൽ ${alert.diseaseName} രോഗവ്യാപന നിയന്ത്രണം`,
      officialDirective: `${alert.issuingAuthority} വഴി അടിയന്തര കാർഷിക ജാഗ്രതാ നിർദ്ദേശം പുറപ്പെടുവിച്ചു. കർഷകർ ഉടനടി സംരക്ഷണ പ്രവർത്തനങ്ങൾ ആരംഭിക്കുക.`,
      mandatoryActions: alert.mandatoryActions,
      subsidizedSupplies: `കൃഷി വിജ്ഞാൻ കേന്ദ്രങ്ങൾ (KVK) വഴി സബ്‌സിഡി നിരക്കിലുള്ള മരുന്നുകൾ ലഭ്യമാണ്.`,
    };
  }

  // Punjabi Translations
  if (lang === 'pa') {
    if (alert.id === 'govt-alert-pb-01') {
      return {
        headline: 'ਸਰਕਾਰੀ ਐਮਰਜੈਂਸੀ ਹੁਕਮ: ਦੋਆਬਾ ਆਲੂ ਪੱਟੀ ਵਿੱਚ ਪਛੇਤੇ ਝੁਲਸ ਰੋਗ ਦਾ ਵੱਡਾ ਖ਼ਤਰਾ',
        officialDirective: 'ICAR-CPRI ਅਤੇ ਪੰਜਾਬ ਖੇਤੀਬਾੜੀ ਯੂਨੀਵਰਸਿਟੀ ਵੱਲੋਂ ਲੈਵਲ-੧ ਐਮਰਜੈਂਸੀ ਹਦਾਇਤ ਜਾਰੀ ਕੀਤੀ ਗਈ ਹੈ। ਕਿਸਾਨ ਤੁਰੰਤ ਬਚਾਅ ਕਾਰਜ ਸ਼ੁਰੂ ਕਰਨ।',
        mandatoryActions: [
          'ਤੰਦਰੁਸਤ ਫਸਲ ਉੱਤੇ ਮੈਨਕੋਜ਼ੈਬ 75% WP (੨.੫ ਕਿਲੋ/ਹੈਕਟੇਅਰ) ਦਾ ਛਿੜਕਾਅ ਕਰੋ।',
          'ਲੱਛਣ ਦਿਖਾਈ ਦੇਣ ਤੇ ਸਾਈਮੋਕਸਾਨਿਲ + ਮੈਨਕੋਜ਼ੈਬ ਦਾ ਤੁਰੰਤ ਇਸਤੇਮਾਲ ਕਰੋ।',
          'ਫੁਹਾਰਾ ਸਿੰਚਾਈ ਤੁਰੰਤ ਬੰਦ ਕਰੋ; ਵਾਧੂ ਨਮੀ ਬਿਮਾਰੀ ਵਧਾਉਂਦੀ ਹੈ।',
        ],
        subsidizedSupplies: 'ਪੀ.ਏ.ਯੂ. ਅਤੇ ਕੇ.ਵੀ.ਕੇ. ਜਲੰਧਰ ਡਿਪੂ ਰਾਹੀਂ ਸਬਸਿਡੀ ਵਾਲੀ ਪ੍ਰਮਾਣਿਤ ਉੱਲੀਨਾਸ਼ਕ ਕਿੱਟ ਉਪਲਬਧ।',
      };
    }
    return {
      headline: `ਐਮਰਜੈਂਸੀ ਹੁਕਮ: ${alert.stateName} ਵਿੱਚ ${alert.crop} ਦੀ ਬਿਮਾਰੀ ${alert.diseaseName} ਦੀ ਰੋਕਥਾਮ`,
      officialDirective: `${alert.issuingAuthority} ਵੱਲੋਂ ਜਾਰੀ ਐਮਰਜੈਂਸੀ ਨਿਰਦੇਸ਼।`,
      mandatoryActions: alert.mandatoryActions,
      subsidizedSupplies: 'ਖੇਤੀਬਾੜੀ ਵਿਗਿਆਨ ਕੇਂਦਰਾਂ ਰਾਹੀਂ ਸਬਸਿਡੀ ਵਾਲੀ ਸਮੱਗਰੀ ਉਪਲਬਧ।',
    };
  }

  // Odia Translations
  if (lang === 'or') {
    return {
      headline: `ଜରୁରୀ ସରକାରୀ ନିର୍ଦ୍ଦେଶନାମା: ${alert.stateName} ରେ ${alert.crop} ଫସଲର ${alert.diseaseName} ନିୟନ୍ତ୍ରଣ`,
      officialDirective: `${alert.issuingAuthority} ଦ୍ୱାରା ଜରୁରୀକାଳୀନ କୃଷି ସତର୍କତା ଜାରି କରାଯାଇଛି। କୃଷକମାନେ ତୁରନ୍ତ ପ୍ରତିଷେଧକ ବ୍ୟବସ୍ଥା ଗ୍ରହଣ କରନ୍ତୁ।`,
      mandatoryActions: alert.mandatoryActions,
      subsidizedSupplies: 'କୃଷି ବିଜ୍ଞାନ କେନ୍ଦ୍ର (KVK) ଦ୍ୱାରା ରିହାତି ମୂଲ୍ୟରେ ଔଷଧ ଉପଲବ୍ଧ।',
    };
  }

  // Assamese Translations
  if (lang === 'as') {
    return {
      headline: `জৰুৰী চৰকাৰী নিৰ্দেশনা: ${alert.stateName} ত ${alert.crop} খেতিৰ ${alert.diseaseName} প্ৰতিৰোধ`,
      officialDirective: `${alert.issuingAuthority} ৰ দ্বাৰা জৰুৰী কৃষি সতৰ্কতা জাৰি কৰা হৈছে।`,
      mandatoryActions: alert.mandatoryActions,
      subsidizedSupplies: 'কৃষি বিজ্ঞান কেন্দ্ৰ (KVK) ৰ জৰিয়তে ৰেহাই মূল্যত ঔষধ উপলব্ধ।',
    };
  }

  // Default fallback to English with localized heading cues
  return {
    headline: alert.headline,
    officialDirective: alert.officialDirective,
    mandatoryActions: alert.mandatoryActions,
    subsidizedSupplies: alert.subsidizedSupplies,
  };
}
