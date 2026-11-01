import { LanguageCode } from '../types';

export interface FooterLocaleData {
  tagline: string;
  cbseBadge: string;
  zeroCloudBadge: string;
  quickLinksTitle: string;
  kisanHelplineTitle: string;
  tollFreeGovt: string;
  selectedZoneLabel: string;
  readDisclaimerBtn: string;
  copyrightNotice: string;
  poweredBy: string;
}

export const FOOTER_LOCALES: Record<LanguageCode, FooterLocaleData> = {
  en: {
    tagline: 'AI-powered on-device crop disease diagnostics for rural Indian farmers. Built for a Class 11 CBSE Science Exhibition with offline TensorFlow.js and MobileNetV2.',
    cbseBadge: 'CBSE Science Project',
    zeroCloudBadge: 'Zero Cloud Uploads',
    quickLinksTitle: 'Quick Links',
    kisanHelplineTitle: 'Kisan Helpline',
    tollFreeGovt: 'Government of India National Toll-Free Support:',
    selectedZoneLabel: 'Selected Zone:',
    readDisclaimerBtn: 'Read Safety & AI Disclaimer',
    copyrightNotice: '© 2025 AgriVision • Class 11 CBSE Science Exhibition • Made for Indian Agriculture',
    poweredBy: 'Powered by Edge AI & MobileNetV2',
  },
  hi: {
    tagline: 'भारतीय किसान भाइयों के लिए ऑन-डिवाइस एआई आधारित फसल रोग निदान प्रणाली। कक्षा 11 सीबीएसई राष्ट्रीय विज्ञान प्रदर्शनी हेतु निर्मित (पूर्णतः ऑफलाइन MobileNetV2)।',
    cbseBadge: 'सीबीएसई विज्ञान परियोजना',
    zeroCloudBadge: 'शून्य क्लाउड अपलोड (पूर्ण गोपनीयता)',
    quickLinksTitle: 'त्वरित लिंक',
    kisanHelplineTitle: 'किसान हेल्पलाइन',
    tollFreeGovt: 'भारत सरकार राष्ट्रीय टोल-फ्री किसान सहायता:',
    selectedZoneLabel: 'चयनित राज्य / क्षेत्र:',
    readDisclaimerBtn: 'सुरक्षा एवं एआई अस्वीकरण पढ़ें',
    copyrightNotice: '© 2025 एग्रीविज़न • कक्षा 11 सीबीएसई विज्ञान प्रदर्शनी • भारतीय कृषि को समर्पित',
    poweredBy: 'एज एआई एवं MobileNetV2 द्वारा संचालित',
  },
  gu: {
    tagline: 'ગ્રામીણ ખેડૂતો માટે ઓન-ડિવાઇસ AI પાક રોગ નિદાન પ્રણાલી. ધોરણ ૧૧ સીબીએસઈ રાષ્ટ્રીય વિજ્ઞાન પ્રદર્શન માટે તૈયાર કરાયેલ (ઓફલાઇન MobileNetV2).',
    cbseBadge: 'સીબીએસઈ વિજ્ઞાન પ્રોજેક્ટ',
    zeroCloudBadge: 'ઝીરો ક્લાઉડ અપલોડ',
    quickLinksTitle: 'ઝડપી લિંક્સ',
    kisanHelplineTitle: 'કિસાન હેલ્પલાઇન',
    tollFreeGovt: 'ભારત સરકાર રાષ્ટ્રીય ટોલ-ફ્રી કિસાન સહાય:',
    selectedZoneLabel: 'પસંદ કરેલ ઝોન:',
    readDisclaimerBtn: 'સુરક્ષા અને AI ડિસ્ક્લેમર વાંચો',
    copyrightNotice: '© 2025 એગ્રીવિઝન • ધોરણ ૧૧ સીબીએસઈ વિજ્ઞાન પ્રદર્શન • ભારતીય કૃષિ માટે સમર્પિત',
    poweredBy: 'એજ AI અને MobileNetV2 દ્વારા સંચાલિત',
  },
  mr: {
    tagline: 'शेतकरी बांधवांसाठी ऑन-डिव्हाइस एआय पीक रोग निदान प्रणाली. इयत्ता ११ वी सीबीएसई राष्ट्रीय विज्ञान प्रदर्शनासाठी विकसित (पूर्णतः ऑफलाइन MobileNetV2).',
    cbseBadge: 'सीबीएसई विज्ञान प्रकल्प',
    zeroCloudBadge: 'झिरो क्लाउड अपलोड',
    quickLinksTitle: 'महत्त्वाच्या लिंक्स',
    kisanHelplineTitle: 'किसान हेल्पलाइन',
    tollFreeGovt: 'भारत सरकार राष्ट्रीय टोल-फ्री शेतकरी सहाय्यता:',
    selectedZoneLabel: 'निवडलेला विभाग:',
    readDisclaimerBtn: 'सुरक्षा व एआय सूचना वाचा',
    copyrightNotice: '© 2025 ॲग्रीव्हिजन • इयत्ता ११ वी सीबीएसई विज्ञान प्रदर्शन • भारतीय शेतीसाठी समर्पित',
    poweredBy: 'एज एआय आणि MobileNetV2 द्वारे संचालित',
  },
  bn: {
    tagline: 'ভারতের প্রান্তিক কৃষকদের জন্য অন-ডিভাইস এআই ভিত্তিক শস্য রোগ নির্ণয় ব্যবস্থা। একাদশ শ্রেণির সিবিএসই বিজ্ঞান প্রদর্শনীর জন্য নির্মিত (অফলাইন MobileNetV2)।',
    cbseBadge: 'সিবিএসই বিজ্ঞান প্রকল্প',
    zeroCloudBadge: 'জিরো ক্লাউড আপলোড',
    quickLinksTitle: 'দ্রুত লিংকসমূহ',
    kisanHelplineTitle: 'কৃষক হেল্পলাইন',
    tollFreeGovt: 'ভারত সরকার জাতীয় টোল-ফ্রি কৃষক সহায়তা:',
    selectedZoneLabel: 'নির্বাচিত অঞ্চল:',
    readDisclaimerBtn: 'নিরাপত্তা ও এআই সতর্কতা পড়ুন',
    copyrightNotice: '© 2025 অ্যাগ্রিভিশন • সিবিএসই বিজ্ঞান প্রদর্শনী • ভারতীয় কৃষির জন্য নিবেদিত',
    poweredBy: 'এজ এআই এবং MobileNetV2 দ্বারা চালিত',
  },
  te: {
    tagline: 'రైతుల కోసం ఆన్-డివైస్ AI ఆధారిత పంట వ్యాధి నిర్ధారణ వ్యవస్థ. క్లాస్ 11 సీబీఎస్ఈ సైన్స్ ఎగ్జిబిషన్ కోసం రూపొందించబడింది (ఆఫ్‌లైన్ MobileNetV2).',
    cbseBadge: 'సీబీఎస్ఈ సైన్స్ ప్రాజెక్ట్',
    zeroCloudBadge: 'జీరో క్లౌడ్ అప్‌లోడ్స్',
    quickLinksTitle: 'త్వరిత లింకులు',
    kisanHelplineTitle: 'కిసాన్ హెల్ప్‌లైన్',
    tollFreeGovt: 'భారత ప్రభుత్వం జాతీయ టోల్-ఫ్రీ రైతు సహాయం:',
    selectedZoneLabel: 'ఎంచుకున్న ప్రాంతం:',
    readDisclaimerBtn: 'భద్రత & AI డిస్క్లైమర్ చదవండి',
    copyrightNotice: '© 2025 అగ్రివిజన్ • సీబీఎస్ఈ సైన్స్ ఎగ్జిబిషన్ • భారతీయ వ్యవసాయం కోసం',
    poweredBy: 'ఎడ్జ్ AI మరియు MobileNetV2 ఆధారితం',
  },
  ta: {
    tagline: 'விவசாயிகளுக்கான சாதனத்திலேயே இயங்கும் AI பயிர் நோய் கண்டறியும் தளம். வகுப்பு 11 சிபிஎஸ்இ அறிவியல் கண்காட்சிக்காக உருவாக்கப்பட்டது (ஆஃப்லைன் MobileNetV2).',
    cbseBadge: 'சிபிஎஸ்இ அறிவியல் திட்டம்',
    zeroCloudBadge: 'பூஜ்ஜிய கிளவுட் பதிவேற்றம்',
    quickLinksTitle: 'விரைவு இணைப்புகள்',
    kisanHelplineTitle: 'உழவர் உதவி மையம்',
    tollFreeGovt: 'இந்திய அரசு தேசிய கட்டணமில்லா உதவி எண்:',
    selectedZoneLabel: 'தேர்ந்தெடுக்கப்பட்ட மண்டலம்:',
    readDisclaimerBtn: 'பாதுகாப்பு & AI அறிவிப்பை படிக்கவும்',
    copyrightNotice: '© 2025 அக்ரிவிஷன் • சிபிஎஸ்இ அறிவியல் கண்காட்சி • இந்திய வேளாண்மைக்காக',
    poweredBy: 'எட்ஜ் AI & MobileNetV2 மூலம் இயங்குகிறது',
  },
  kn: {
    tagline: 'ರೈತರಿಗಾಗಿ ಸಾಧನದಲ್ಲೇ ಕಾರ್ಯನಿರ್ವಹಿಸುವ AI ಬೆಳೆ ರೋಗ ಪತ್ತೆ ವ್ಯವಸ್ಥೆ. 11 ನೇ ತರಗತಿ ಸಿಬಿಎಸ್ಇ ವಿಜ್ಞಾನ ಪ್ರದರ್ಶನಕ್ಕಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ (ಆಫ್‌ಲೈನ್ MobileNetV2).',
    cbseBadge: 'ಸಿಬಿಎಸ್ಇ ವಿಜ್ಞಾನ ಯೋಜನೆ',
    zeroCloudBadge: 'ಶೂನ್ಯ ಕ್ಲೌಡ್ ಅಪ್‌ಲೋಡ್',
    quickLinksTitle: 'ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು',
    kisanHelplineTitle: 'ಕಿಸಾನ್ ಸಹಾಯವಾಣಿ',
    tollFreeGovt: 'ಭಾರತ ಸರ್ಕಾರದ ರಾಷ್ಟ್ರೀಯ ಉಚಿತ ಸಹಾಯವಾಣಿ:',
    selectedZoneLabel: 'ಆಯ್ಕೆಮಾಡಿದ ವಲಯ:',
    readDisclaimerBtn: 'ಸುರಕ್ಷತೆ ಮತ್ತು AI ಹಕ್ಕುತ್ಯಾಗ ಓದಿ',
    copyrightNotice: '© 2025 ಅಗ್ರಿವಿಷನ್ • ಸಿಬಿಎಸ್ಇ ವಿಜ್ಞಾನ ಪ್ರದರ್ಶನ • ಭಾರತೀಯ ಕೃಷಿಗಾಗಿ ಸಮರ್ಪಿತ',
    poweredBy: 'ಎಡ್ಜ್ AI ಮತ್ತು MobileNetV2 ನಿಂದ ಚಾಲಿತ',
  },
  ml: {
    tagline: 'കർഷകർക്കായി ഉപകരണത്തിൽ തന്നെ പ്രവർത്തിക്കുന്ന AI വിള രോഗ നിർണ്ണയ സംവിധാനം. ക്ലാസ് 11 സിബിഎസ്ഇ ശാസ്ത്ര പ്രദർശനത്തിനായി നിർമ്മിച്ചത് (ഓഫ്‌ലൈൻ MobileNetV2).',
    cbseBadge: 'സിബിഎസ്ഇ ശാസ്ത്ര പ്രോജക്ട്',
    zeroCloudBadge: 'സീറോ ക്ലൗഡ് അപ്‌ലോഡ്',
    quickLinksTitle: 'ദ്രുത ലിങ്കുകൾ',
    kisanHelplineTitle: 'കിസാൻ ഹെൽപ്പ്‌ലൈൻ',
    tollFreeGovt: 'ഭാരത സർക്കാർ ദേശീയ സൗജന്യ കർഷക സഹായം:',
    selectedZoneLabel: 'തിരഞ്ഞെടുത്ത മേഖല:',
    readDisclaimerBtn: 'സുരക്ഷാ & AI നിരാകരണം വായിക്കുക',
    copyrightNotice: '© 2025 അഗ്രിവിഷൻ • സിബിഎസ്ഇ ശാസ്ത്ര പ്രദർശനം • ഇന്ത്യൻ കൃഷിക്കായി സമർപ്പിച്ചത്',
    poweredBy: 'എഡ്ജ് AI & MobileNetV2 സാങ്കേതികവിദ്യ',
  },
  pa: {
    tagline: 'ਕਿਸਾਨਾਂ ਲਈ ਫੋਨ ਤੇ ਹੀ ਕੰਮ ਕਰਨ ਵਾਲਾ AI ਫ਼ਸਲ ਬਿਮਾਰੀ ਨਿਦਾਨ ਪ੍ਰਣਾਲੀ। ਜਮਾਤ 11 ਸੀਬੀਐਸਈ ਵਿਗਿਆਨ ਪ੍ਰਦਰਸ਼ਨੀ ਲਈ ਤਿਆਰ (ਆਫਲਾਈਨ MobileNetV2).',
    cbseBadge: 'ਸੀਬੀਐਸਈ ਵਿਗਿਆਨ ਪ੍ਰੋਜੈਕਟ',
    zeroCloudBadge: 'ਜ਼ੀਰੋ ਕਲਾਊਡ ਅੱਪਲੋਡ',
    quickLinksTitle: 'ਜ਼ਰੂਰੀ ਲਿੰਕ',
    kisanHelplineTitle: 'ਕਿਸਾਨ ਹੈਲਪਲਾਈਨ',
    tollFreeGovt: 'ਭਾਰਤ ਸਰਕਾਰ ਰਾਸ਼ਟਰੀ ਟੋਲ-ਫ੍ਰੀ ਕਿਸਾਨ ਸਹਾਇਤਾ:',
    selectedZoneLabel: 'ਚੁਣਿਆ ਗਿਆ ਖੇਤਰ:',
    readDisclaimerBtn: 'ਸੁਰੱਖਿਆ ਅਤੇ AI ਬੇਦਾਅਵਾ ਪੜ੍ਹੋ',
    copyrightNotice: '© 2025 ਐਗਰੀਵਿਜ਼ਨ • ਸੀਬੀਐਸਈ ਵਿਗਿਆਨ ਪ੍ਰਦਰਸ਼ਨੀ • ਭਾਰਤੀ ਖੇਤੀ ਲਈ ਸਮਰਪਿਤ',
    poweredBy: 'ਐਜ AI ਅਤੇ MobileNetV2 ਦੁਆਰਾ ਸੰਚਾਲਿਤ',
  },
  or: {
    tagline: 'କୃଷକମାନଙ୍କ ପାଇଁ ଅନ୍-ଡିଭାଇସ୍ AI ଆଧାରିତ ଫସଲ ରୋଗ ନିର୍ଣ୍ଣୟ ପ୍ରଣାଳୀ। ଏକାଦଶ ଶ୍ରେଣୀ ସିବିଏସ୍ଇ ବିଜ୍ଞାନ ପ୍ରଦର୍ଶନୀ ପାଇଁ ନିର୍ମିତ (ଅଫଲାଇନ୍ MobileNetV2)।',
    cbseBadge: 'ସିବିଏସ୍ଇ ବିଜ୍ଞାନ ପ୍ରକଳ୍ପ',
    zeroCloudBadge: 'ଜିରୋ କ୍ଲାଉଡ୍ ଅପଲୋଡ୍',
    quickLinksTitle: 'ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ଲିଙ୍କ୍',
    kisanHelplineTitle: 'କିଷାନ ହେଲ୍ପଲାଇନ୍',
    tollFreeGovt: 'ଭାରତ ସରକାର ଜାତୀୟ ଟୋଲ୍-ଫ୍ରି କୃଷକ ସହାୟତା:',
    selectedZoneLabel: 'ଚୟନିତ କ୍ଷେତ୍ର:',
    readDisclaimerBtn: 'ସୁରକ୍ଷା ଏବଂ AI ଅସ୍ୱୀକୃତି ପଢ଼ନ୍ତୁ',
    copyrightNotice: '© 2025 ଏଗ୍ରିଭିଜନ୍ • ସିବିଏସ୍ଇ ବିଜ୍ଞାନ ପ୍ରଦର୍ଶନୀ • ଭାରତୀୟ କୃଷି ପାଇଁ ସମର୍ପିତ',
    poweredBy: 'ଏଜ୍ AI ଏବଂ MobileNetV2 ଦ୍ୱାରା ପରିଚାଳିତ',
  },
  as: {
    tagline: 'কৃষকসকলৰ বাবে অফলাইন AI ভিত্তিক শস্য ৰোগ নিৰ্ণয় ব্যৱস্থা। একাদশ শ্ৰেণী চিবিএছই বিজ্ঞান প্ৰদৰ্শনীৰ বাবে নিৰ্মিত (MobileNetV2)।',
    cbseBadge: 'চিবিএছই বিজ্ঞান প্ৰকল্প',
    zeroCloudBadge: 'জিৰো ক্লাউড আপলোড',
    quickLinksTitle: 'প্ৰয়োজনীয় লিংকসমূহ',
    kisanHelplineTitle: 'কৃষক হেল্পলাইন',
    tollFreeGovt: 'ভাৰত চৰকাৰৰ ৰাষ্ট্ৰীয় বিনামূলীয়া কৃষক সহায়:',
    selectedZoneLabel: 'বাছনি কৰা মণ্ডল:',
    readDisclaimerBtn: 'নিৰাপত্তা আৰু AI সতৰ্কবাৰ্তা পঢ়ক',
    copyrightNotice: '© 2025 এগ্ৰিভিজন • চিবিএছই বিজ্ঞান প্ৰদৰ্শনী • ভাৰতীয় কৃষিৰ বাবে উৎসৰ্গিত',
    poweredBy: 'এজ AI আৰু MobileNetV2 দ্বাৰা চালিত',
  },
};

export function getLocalizedFooter(lang: string): FooterLocaleData {
  if (FOOTER_LOCALES[lang as LanguageCode]) {
    return FOOTER_LOCALES[lang as LanguageCode];
  }
  if (lang !== 'en') {
    return FOOTER_LOCALES.hi || FOOTER_LOCALES.gu || FOOTER_LOCALES.mr || FOOTER_LOCALES.en;
  }
  return FOOTER_LOCALES.en;
}
