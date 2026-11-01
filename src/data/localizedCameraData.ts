import { LanguageCode } from '../types';

export interface CameraLocaleData {
  title: string;
  subtitle: string;
  directCameraTitle: string;
  openPhoneShutter: string;
  retryLiveViewfinder: string;
  centerLeafInside: string;
  glareNotice: string;
  shutterAppBtn: string;
  shutterLabel: string;
  liveViewUnavailable: string;
}

export const CAMERA_LOCALES: Record<LanguageCode, CameraLocaleData> = {
  en: {
    title: 'Field Camera',
    subtitle: 'Single leaf diagnosis',
    directCameraTitle: 'Direct Camera Available',
    openPhoneShutter: 'Open Phone Camera Shutter',
    retryLiveViewfinder: 'Retry Live Viewfinder',
    centerLeafInside: 'Center affected leaf inside box',
    glareNotice: 'Avoid extreme glare • Focus on spots',
    shutterAppBtn: 'Snap using phone camera app',
    shutterLabel: 'Shutter',
    liveViewUnavailable: 'Live viewfinder is unavailable. Tap below to snap a picture with your phone camera.',
  },
  hi: {
    title: 'खेत कैमरा',
    subtitle: 'एकल पत्ती का रोग निदान',
    directCameraTitle: 'सीधा फोन कैमरा उपलब्ध',
    openPhoneShutter: 'फोन का मुख्य कैमरा खोलें',
    retryLiveViewfinder: 'लाइव कैमरा पुनः प्रयास करें',
    centerLeafInside: 'प्रभावित पत्ती को बॉक्स के बीच में रखें',
    glareNotice: 'तेज़ धूप की चमक से बचें • रोग के धब्बों पर फोकस करें',
    shutterAppBtn: 'फोन कैमरा शटर से फोटो लें',
    shutterLabel: 'शटर',
    liveViewUnavailable: 'लाइव दृश्य उपलब्ध नहीं है। सीधे फोन कैमरे से पत्ती की फोटो खींचने हेतु नीचे दबाएं।',
  },
  gu: {
    title: 'ખેતર કેમેરો',
    subtitle: 'એક પાનનું રોગ નિદાન',
    directCameraTitle: 'ફોન કેમેરો ઉપલબ્ધ છે',
    openPhoneShutter: 'ફોનનો મુખ્ય કેમેરો ખોલો',
    retryLiveViewfinder: 'લાઈવ કેમેરો ફરી શરૂ કરો',
    centerLeafInside: 'રોગગ્રસ્ત પાનને બોક્સની વચ્ચે રાખો',
    glareNotice: 'વધુ પડતો તડકો ટાળો • પાનના ડાઘ પર ધ્યાન કેન્દ્રિત કરો',
    shutterAppBtn: 'ફોન કેમેરાથી ફોટો પાડો',
    shutterLabel: 'શટર',
    liveViewUnavailable: 'લાઇવ વ્યૂ ઉપલબ્ધ નથી. તમારા ફોન કેમેરાથી ફોટો લેવા માટે નીચે ટેપ કરો.',
  },
  mr: {
    title: 'शेत कॅमेरा',
    subtitle: 'एका पानाचे रोग निदान',
    directCameraTitle: 'थेट फोन कॅमेरा उपलब्ध',
    openPhoneShutter: 'फोनचा मुख्य कॅमेरा उघडा',
    retryLiveViewfinder: 'लाईव्ह व्ह्यू पुन्हा सुरू करा',
    centerLeafInside: 'रोगट पान चौकटीच्या मध्यभागी ठेवा',
    glareNotice: 'जास्त चकाकी टाळा • डागांवर कॅमेरा केंद्रित करा',
    shutterAppBtn: 'फोन कॅमेऱ्याने फोटो काढा',
    shutterLabel: 'शटर',
    liveViewUnavailable: 'थेट दृश्य उपलब्ध नाही. फोन कॅमेऱ्याने फोटो काढण्यासाठी खाली दाबा.',
  },
  bn: {
    title: 'মাঠের ক্যামেরা',
    subtitle: 'আক্রান্ত পাতার রোগ নির্ণয়',
    directCameraTitle: 'সরাসরি ফোন ক্যামেরা প্রস্তুত',
    openPhoneShutter: 'ফোনের আসল ক্যামেরা খুলুন',
    retryLiveViewfinder: 'লাইভ ক্যামেরা পুনরায় চেষ্টা করুন',
    centerLeafInside: 'আক্রান্ত পাতাটি বক্সের মাঝে রাখুন',
    glareNotice: 'অতিরিক্ত আলো এড়িয়ে চলুন • দাগের ওপর ফোকাস করুন',
    shutterAppBtn: 'ফোনের ক্যামেরা দিয়ে তুলুন',
    shutterLabel: 'শাটার',
    liveViewUnavailable: 'লাইভ ভিউ অনুপলব্ধ। সরাসরি ছবি তুলতে নিচের বোতামে চাপ দিন।',
  },
  te: {
    title: 'ఫీల్డ్ కెమెరా',
    subtitle: 'ఆకు వ్యాధి నిర్ధారణ',
    directCameraTitle: 'ఫోన్ కెమెరా అందుబాటులో ఉంది',
    openPhoneShutter: 'ఫోన్ కెమెరా తెరవండి',
    retryLiveViewfinder: 'లైవ్ వ్యూఫైండర్ మళ్లీ ప్రయత్నించండి',
    centerLeafInside: 'వ్యాధి సోకిన ఆకును బాక్స్ మధ్యలో ఉంచండి',
    glareNotice: 'ఎండ మెరుపును నివారించండి • మచ్చలపై దృష్టి పెట్టండి',
    shutterAppBtn: 'ఫోన్ కెమెరాతో ఫోటో తీయండి',
    shutterLabel: 'షట్టర్',
    liveViewUnavailable: 'లైవ్ వ్యూ అందుబాటులో లేదు. ఫోన్ కెమెరాతో ఫోటో తీయడానికి కింద నొక్కండి.',
  },
  ta: {
    title: 'கள கேமரா',
    subtitle: 'இலை நோய் கண்டறிதல்',
    directCameraTitle: 'நேரடி கேமரா தயார்',
    openPhoneShutter: 'போன் கேமராவை திறக்கவும்',
    retryLiveViewfinder: 'நேரடி கேமராவை மீண்டும் முயற்சிக்கவும்',
    centerLeafInside: 'பாதிக்கப்பட்ட இலையை நடுவில் வைக்கவும்',
    glareNotice: 'அதிக வெளிச்சத்தை தவிர்க்கவும் • புள்ளிகளில் கவனம் வைக்கவும்',
    shutterAppBtn: 'போன் கேமரா மூலம் படம் எடுக்கவும்',
    shutterLabel: 'ஷட்டர்',
    liveViewUnavailable: 'நேரடி காட்சி கிடைக்கவில்லை. படம் எடுக்க கீழே அழுத்தவும்.',
  },
  kn: {
    title: 'ಫೀಲ್ಡ್ ಕ್ಯಾಮೆರಾ',
    subtitle: 'ಎಲೆ ರೋಗ ಪತ್ತೆ',
    directCameraTitle: 'ಫೋನ್ ಕ್ಯಾಮೆರಾ ಲಭ್ಯವಿದೆ',
    openPhoneShutter: 'ಫೋನ್ ಕ್ಯಾಮೆರಾ ತೆರೆಯಿರಿ',
    retryLiveViewfinder: 'ಲೈವ್ ಕ್ಯಾಮೆರಾ ಮರುಪ್ರಯತ್ನಿಸಿ',
    centerLeafInside: 'ಬಾಧಿತ ಎಲೆಯನ್ನು ಚೌಕಟ್ಟಿನ ಮಧ್ಯದಲ್ಲಿ ಇರಿಸಿ',
    glareNotice: 'ಹೆಚ್ಚು ಬೆಳಕನ್ನು ತಪ್ಪಿಸಿ • ಚುಕ್ಕೆಗಳ ಮೇಲೆ ಕೇಂದ್ರೀಕರಿಸಿ',
    shutterAppBtn: 'ಫೋನ್ ಕ್ಯಾಮೆರಾದಿಂದ ಫೋಟೋ ತೆಗೆಯಿರಿ',
    shutterLabel: 'ಶಟರ್',
    liveViewUnavailable: 'ಲೈವ್ ವೀಕ್ಷಣೆ ಲಭ್ಯವಿಲ್ಲ. ಫೋನ್ ಕ್ಯಾಮೆರಾದಿಂದ ಚಿತ್ರ ತೆಗೆಯಲು ಕೆಳಗೆ ಒತ್ತಿರಿ.',
  },
  ml: {
    title: 'ഫീൽഡ് ക്യാമറ',
    subtitle: 'ഇല രോഗ നിർണ്ണയം',
    directCameraTitle: 'ഫോൺ ക്യാമറ ലഭ്യമാണ്',
    openPhoneShutter: 'ഫോൺ ക്യാമറ തുറക്കുക',
    retryLiveViewfinder: 'ലൈവ് ക്യാമറ വീണ്ടും ശ്രമിക്കുക',
    centerLeafInside: 'രോഗബാധിതമായ ഇല ബോക്സിന്റെ മധ്യത്തിൽ വയ്ക്കുക',
    glareNotice: 'കൂടുതൽ വെളിച്ചം ഒഴിവാക്കുക • പുള്ളികളിൽ ഫോക്കസ് ചെയ്യുക',
    shutterAppBtn: 'ഫോൺ ക്യാമറയിൽ ഫോട്ടോ എടുക്കുക',
    shutterLabel: 'ഷട്ടർ',
    liveViewUnavailable: 'ലൈവ് വ്യൂ ലഭ്യമല്ല. ഫോട്ടോ എടുക്കാൻ താഴെ അമർത്തുക.',
  },
  pa: {
    title: 'ਖੇਤ ਕੈਮਰਾ',
    subtitle: 'ਪੱਤੇ ਦੀ ਬਿਮਾਰੀ ਜਾਂਚ',
    directCameraTitle: 'ਫੋਨ ਕੈਮਰਾ ਉਪਲਬਧ ਹੈ',
    openPhoneShutter: 'ਫੋਨ ਦਾ ਮੁੱਖ ਕੈਮਰਾ ਖੋਲ੍ਹੋ',
    retryLiveViewfinder: 'ਲਾਈਵ ਕੈਮਰਾ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ',
    centerLeafInside: 'ਪ੍ਰਭਾਵਿਤ ਪੱਤੇ ਨੂੰ ਬਾਕਸ ਦੇ ਵਿਚਕਾਰ ਰੱਖੋ',
    glareNotice: 'ਤੇਜ਼ ਚਮਕ ਤੋਂ ਬਚੋ • ਧੱਬਿਆਂ ਤੇ ਫੋਕਸ ਕਰੋ',
    shutterAppBtn: 'ਫੋਨ ਕੈਮਰੇ ਨਾਲ ਫੋਟੋ ਲਵੋ',
    shutterLabel: 'ਸ਼ਟਰ',
    liveViewUnavailable: 'ਲਾਈਵ ਕੈਮਰਾ ਉਪਲਬਧ ਨਹੀਂ ਹੈ। ਫੋਟੋ ਖਿੱਚਣ ਲਈ ਹੇਠਾਂ ਦਬਾਓ।',
  },
  or: {
    title: 'କ୍ଷେତ୍ର କ୍ୟାମେରା',
    subtitle: 'ପତ୍ର ରୋଗ ନିର୍ଣ୍ଣୟ',
    directCameraTitle: 'ଫୋନ୍ କ୍ୟାମେରା ଉପଲବ୍ଧ ଅଛି',
    openPhoneShutter: 'ଫୋନ୍ କ୍ୟାମେରା ଖୋଲନ୍ତୁ',
    retryLiveViewfinder: 'ଲାଇଭ୍ କ୍ୟାମେରା ପୁନଃ ଚେଷ୍ଟା କରନ୍ତୁ',
    centerLeafInside: 'ରୋଗାକ୍ରାନ୍ତ ପତ୍ରକୁ ବାକ୍ସ ମଝିରେ ରଖନ୍ତୁ',
    glareNotice: 'ଅତ୍ୟଧିକ ଆଲୋକ ଏଡ଼ାନ୍ତୁ • ଦାଗ ଉପରେ ଫୋକସ୍ କରନ୍ତୁ',
    shutterAppBtn: 'ଫୋନ୍ କ୍ୟାମେରାରେ ଫଟୋ ଉଠାନ୍ତୁ',
    shutterLabel: 'ସଟର୍',
    liveViewUnavailable: 'ଲାଇଭ୍ ଭ୍ୟୁ ଉପଲବ୍ଧ ନାହିଁ। ଫଟୋ ଉଠାଇବା ପାଇଁ ତଳେ ଦବାନ୍ତୁ।',
  },
  as: {
    title: 'পথাৰৰ কেমেৰা',
    subtitle: 'পাতৰ ৰোগ নিৰ্ণয়',
    directCameraTitle: 'ফোন কেমেৰা উপলব্ধ',
    openPhoneShutter: 'ফোন কেমেৰা খোলক',
    retryLiveViewfinder: 'লাইভ কেমেৰা পুনৰ চেষ্টা কৰক',
    centerLeafInside: 'ৰোগাক্ৰান্ত পাতটো বাকচৰ মাজত ৰাখক',
    glareNotice: 'অতিৰিক্ত পোহৰ পৰিহাৰ কৰক • দাগসমূহত দৃষ্টি দিয়ক',
    shutterAppBtn: 'ফোন কেমেৰাৰে ফটো তোলক',
    shutterLabel: 'শ্বাটাৰ',
    liveViewUnavailable: 'লাইভ দৃশ্য উপলব্ধ নহয়। ফটো তুলিবলৈ তলত টিপক।',
  },
};

export function getLocalizedCamera(lang: string): CameraLocaleData {
  if (CAMERA_LOCALES[lang as LanguageCode]) {
    return CAMERA_LOCALES[lang as LanguageCode];
  }
  if (lang !== 'en') {
    return CAMERA_LOCALES.hi || CAMERA_LOCALES.gu || CAMERA_LOCALES.mr || CAMERA_LOCALES.en;
  }
  return CAMERA_LOCALES.en;
}
