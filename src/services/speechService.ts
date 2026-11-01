import { LanguageCode, DiagnosisResult, DiseaseDetail, IndianState } from '../types';
import { getLocalizedCropName } from '../data/localizedCropsAndDiseases';
import { getLocalizedDiseaseDetail, getLocalizedDiseaseName } from '../data/localizedDiseasesData';
import { getStoredPreferences, saveStoredPreferences, saveErrorRecord } from './storage';

export type SpeechSectionId = 'all' | 'summary' | 'actions' | 'symptoms' | 'helpline';

export interface SpeechPlayerState {
  isPlaying: boolean;
  isPaused: boolean;
  currentSection: SpeechSectionId | null;
  activeSnippet: string;
  activeStepIndex: number; // 0, 1, 2 if speaking action/removal method, -1 otherwise
  currentQueueIndex: number;
  totalQueueItems: number;
  speechRate: number;
  speechPitch: number;
  voiceName: string;
  isSupported: boolean;
  error?: string;
}

export interface SpeechQueueItem {
  text: string;
  stepIndex: number;
}

/**
 * Detect which sequential method/step (0 for Method 1, 1 for Method 2, 2 for Method 3)
 * is currently being articulated in the speech utterance across all supported languages.
 */
export function detectStepIndexFromSnippet(snippet: string): number {
  if (!snippet) return -1;
  const s = snippet.trim().replace(/^["“'‘\s\(\[\{]+/, '');

  // Check Step 4 / Fourth method
  if (
    /^(?:ચોથું|चौथा|चौथे|চতুর্থ|నాలుగవది|நான்காவதாக|ನಾಲ್ಕನೆಯದು|നാലാമതായി|ਚੌਥਾ|ਚਤੁର୍ଥ|Fourth|(?:Step|Method|પદ્ધતિ|પગલું|विधि|उपाय)\s*4|4[\.\:\-\)]|૪[\.\:\-\)])(?:\s+|,|:|$)/i.test(
      s
    )
  ) {
    return 3;
  }

  // Check Step 3 / Third method
  if (
    /^(?:ત્રીજું|तीसरा|तिसरे|তৃতীয়|మూడవది|மூன்றாவதாக|ಮೂರನೆಯದು|മൂന്നാമതായി|ਤੀਜਾ|ତୃତୀୟ|Third|(?:Step|Method|પદ્ધતિ|પગલું|विधि|उपाय)\s*3|3[\.\:\-\)]|૩[\.\:\-\)])(?:\s+|,|:|$)/i.test(
      s
    )
  ) {
    return 2;
  }

  // Check Step 2 / Second method
  if (
    /^(?:બીજું|दूसरा|दुसरे|দ্বিতীয়|రెండవది|இரண்டாவதாக|ಎರಡನೆಯದು|രണ്ടാമതായി|ਦੂਜਾ|ଦ୍ୱିତୀୟ|Second|(?:Step|Method|પદ્ધતિ|પગલું|विधि|उपाय)\s*2|2[\.\:\-\)]|૨[\.\:\-\)])(?:\s+|,|:|$)/i.test(
      s
    )
  ) {
    return 1;
  }

  // Check Step 1 / First method
  if (
    /^(?:પહેલું|पहला|पहिले|প্রথম|మొదటిది|முதலாவதாக|ಮೊದಲನೆಯದು|ഒന്നാമതായി|ਪਹਿਲਾ|ਪ୍ରଥਮ|প্ৰথম|First|(?:Step|Method|પદ્ધતિ|પગલું|विधि|उपाय)\s*1|1[\.\:\-\)]|૧[\.\:\-\)])(?:\s+|,|:|$)/i.test(
      s
    )
  ) {
    return 0;
  }

  return -1;
}
// BCP-47 Language mapping for authentic regional pronunciation
const LANGUAGE_BCP47_MAPPINGS: Record<LanguageCode, string[]> = {
  hi: ['hi-IN', 'hi_IN', 'hi'],
  mr: ['mr-IN', 'mr_IN', 'mr'],
  gu: ['gu-IN', 'gu_IN', 'gu'],
  bn: ['bn-IN', 'bn_IN', 'bn-BD', 'bn'],
  te: ['te-IN', 'te_IN', 'te'],
  ta: ['ta-IN', 'ta_IN', 'ta'],
  kn: ['kn-IN', 'kn_IN', 'kn'],
  ml: ['ml-IN', 'ml_IN', 'ml'],
  pa: ['pa-IN', 'pa_IN', 'pa'],
  or: ['or-IN', 'or_IN', 'or', 'od-IN', 'od'],
  as: ['as-IN', 'as_IN', 'as', 'bn-IN'],
  en: ['en-IN', 'en-GB', 'en-US', 'en'],
};

const LANGUAGE_NAME_KEYWORDS: Record<LanguageCode, string[]> = {
  hi: ['hindi', 'हिन्दी', 'devanagari', 'hi-in', 'hi_in'],
  mr: ['marathi', 'मराठी', 'mr-in', 'mr_in'],
  gu: ['gujarati', 'ગુજરાતી', 'gu-in', 'gu_in'],
  bn: ['bengali', 'bangla', 'বাংলা', 'bn-in', 'bn_in', 'bn-bd'],
  te: ['telugu', 'తెలుగు', 'te-in', 'te_in'],
  ta: ['tamil', 'தமிழ்', 'ta-in', 'ta_in', 'ta-lk'],
  kn: ['kannada', 'ಕನ್ನಡ', 'kn-in', 'kn_in'],
  ml: ['malayalam', 'മലയാളം', 'ml-in', 'ml_in'],
  pa: ['punjabi', 'ਪੰਜਾਬੀ', 'pa-in', 'pa_in'],
  or: ['odia', 'oriya', 'ଓଡ଼ିଆ', 'or-in', 'or_in'],
  as: ['assamese', 'অসমীয়া', 'as-in', 'as_in'],
  en: ['indian english', 'english (india)', 'en-in', 'en_in'],
};

// Gentle Kisan Radio style chime for auditory feedback
export function playKisanChime(): void {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(523.25, now); // C5
    osc1.frequency.exponentialRampToValueAtTime(659.25, now + 0.12); // E5

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(659.25, now + 0.14); // E5
    osc2.frequency.exponentialRampToValueAtTime(783.99, now + 0.28); // G5

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.16, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.2);
    osc2.start(now + 0.14);
    osc2.stop(now + 0.42);

    setTimeout(() => {
      ctx.close().catch(() => {});
    }, 550);
  } catch {
    // AudioContext blocked or not allowed prior to interaction
  }
}

/**
 * Format numbers and decimals into natural spoken words in regional languages.
 * (e.g. 0.5 -> અડધો / आधा, 1.5 -> દોઢ / डेढ़, 2.5 -> અઢી / ढाई)
 */
export function formatNumberForSpeech(numStr: string, lang: LanguageCode): string {
  const cleanNum = numStr.replace(/,/g, '.').trim();
  const val = parseFloat(cleanNum);
  if (isNaN(val)) return numStr;

  if (cleanNum === '0.5' || val === 0.5) {
    const half: Partial<Record<LanguageCode, string>> = {
      gu: 'અડધો',
      hi: 'आधा',
      mr: 'अर्धा',
      bn: 'আধ',
      pa: 'ਅੱਧਾ',
      te: 'సగం',
      ta: 'அரை',
      kn: 'ಅರ್ಧ',
      ml: 'അര',
      or: 'ଅଧା',
      as: 'আধা',
    };
    return half[lang] || '0.5';
  }

  if (cleanNum === '1.5' || val === 1.5) {
    const oneAndHalf: Partial<Record<LanguageCode, string>> = {
      gu: 'દોઢ',
      hi: 'डेढ़',
      mr: 'दीड',
      bn: 'দেড়',
      pa: 'ਡੇਢ',
      te: 'ఒకటిన్నర',
      ta: 'ஒன்றரை',
      kn: 'ಒಂದೂವರೆ',
      ml: 'ഒന്നര',
      or: 'ଦେଢ଼',
      as: 'দেৰ',
    };
    return oneAndHalf[lang] || '1.5';
  }

  if (cleanNum === '2.5' || val === 2.5) {
    const twoAndHalf: Partial<Record<LanguageCode, string>> = {
      gu: 'અઢી',
      hi: 'ढाई',
      mr: 'अडीच',
      bn: 'আড়াই',
      pa: 'ਢਾਈ',
      te: 'రెండున్నర',
      ta: 'இரண்டரை',
      kn: 'ಎರಡೂವರೆ',
      ml: 'രണ്ടര',
      or: 'ଅଢ଼େଇ',
      as: 'আঢ়ৈ',
    };
    return twoAndHalf[lang] || '2.5';
  }

  if (cleanNum.includes('.')) {
    const parts = cleanNum.split('.');
    const decimalPointWords: Partial<Record<LanguageCode, string>> = {
      gu: ' પોઇન્ટ ',
      hi: ' दशमलव ',
      mr: ' पॉईंट ',
      bn: ' দশমিক ',
      pa: ' ਦਸ਼ਮਲਵ ',
      te: ' పాయింట్ ',
      ta: ' புள்ளி ',
      kn: ' ಪಾಯಿಂಟ್ ',
      ml: ' പോയിന്റ് ',
      or: ' ଦଶମିକ ',
      as: ' দশমিক ',
      en: ' point ',
    };
    const pointWord = decimalPointWords[lang];
    if (pointWord) {
      return `${parts[0]}${pointWord}${parts[1]}`;
    }
  }

  return cleanNum;
}

/**
 * Phonetic text cleaner for farmer audio clarity across all Indian languages.
 * Strips English parenthetical transliterations, cleans technical codes,
 * translates dosages and units into 100% pure spoken vernacular script (never spelling out m-l, g-m, etc.),
 * and removes all stray Latin characters so the regional TTS engine produces pure native speech.
 */
export function cleanTextForFarmerSpeech(text: string, lang: LanguageCode): string {
  if (!text) return '';
  let s = text;

  // 0. Normalize all Indic numerals to standard ASCII digits (0-9)
  // Ensures all dosages (e.g. ૦.૫, २.५, ১.৫), percentages, and telephone numbers match regexes perfectly
  const indicDigits: Record<string, string> = {
    '०': '0', '१': '1', '२': '2', '३': '3', '४': '4', '५': '5', '६': '6', '७': '7', '८': '8', '९': '9',
    '૦': '0', '૧': '1', '૨': '2', '૩': '3', '૪': '4', '૫': '5', '૬': '6', '૭': '7', '૮': '8', '૯': '9',
    '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4', '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9',
    '੦': '0', '੧': '1', '੨': '2', '੩': '3', '੪': '4', '੫': '5', '੬': '6', '੭': '7', '੮': '8', '੯': '9',
    '୦': '0', '୧': '1', '୨': '2', '୩': '3', '୪': '4', '୫': '5', '୬': '6', '୭': '7', '୮': '8', '୯': '9',
    '౦': '0', '౧': '1', '౨': '2', '౩': '3', '౪': '4', '౵': '5', '౬': '6', '౭': '7', '౮': '8', '౯': '9',
    '೦': '0', '೧': '1', '೨': '2', '೩': '3', '೪': '4', '೫': '5', '೬': '6', '೭': '7', '೮': '8', '೯': '9',
    '௦': '0', '௧': '1', '௨': '2', '௩': '3', '௪': '4', '௫': '5', '௬': '6', '௭': '7', '௮': '8', '௯': '9',
    '൦': '0', '൧': '1', '൨': '2', '൩': '3', '൪': '4', '൫': '5', '൬': '6', '൭': '7', '൮': '8', '൯': '9',
  };
  s = s.replace(/[०-९૦-૯০-৯੦-੯୦-୯౦-౯೦-೯௦-௯൦-൯]/g, (char) => indicDigits[char] || char);

  // 1. Remove parenthetical English terms in non-English languages
  // e.g. "અંગૂર કાળો સડો (Black Rot)" -> "અંગૂર કાળો સડો"
  // e.g. "(Target-board)" -> ""
  if (lang !== 'en') {
    s = s.replace(/\([a-zA-Z0-9_\s,./-]+\)/g, ' ');
    s = s.replace(/\[[a-zA-Z0-9_\s,./-]+\]/g, ' ');
  }

  // 2. Remove raw brackets, quotes, stars, bullet points
  s = s.replace(/[()[\]{}"'“”‘’`*_~#•]/g, ' ');

  // Spoken replacement for plus (+) sign in chemical combinations (e.g. COC + Streptocycline)
  const andWord: Record<LanguageCode, string> = {
    gu: ' અને ',
    hi: ' तथा ',
    mr: ' आणि ',
    bn: ' এবং ',
    te: ' మరియు ',
    ta: ' மற்றும் ',
    kn: ' ಮತ್ತು ',
    ml: ' കൂടാതെ ',
    pa: ' ਅਤੇ ',
    or: ' ଏବଂ ',
    as: ' আৰু ',
    en: ' and ',
  };
  s = s.replace(/\s*\+\s*/g, andWord[lang] || ' and ');

  // 3. Clear percentages into native spoken words
  s = s.replace(/(\d+(?:[.,]\d+)?)\s*%/g, (_m, num) => {
    const spokenNum = formatNumberForSpeech(num, lang);
    const percentWords: Record<LanguageCode, string> = {
      hi: `${spokenNum} प्रतिशत`,
      mr: `${spokenNum} टक्के`,
      gu: `${spokenNum} ટકા`,
      bn: `${spokenNum} শতাংশ`,
      te: `${spokenNum} శాతం`,
      ta: `${spokenNum} சதவீதம்`,
      kn: `${spokenNum} ಶೇಕಡಾ`,
      ml: `${spokenNum} ശതമാനം`,
      pa: `${spokenNum} ਫ਼ੀਸਦੀ`,
      or: `${spokenNum} ପ୍ରତିଶତ`,
      as: `${spokenNum} শতাংশ`,
      en: `${spokenNum} percent`,
    };
    return percentWords[lang] || `${spokenNum} percent`;
  });

  // 4. Remove Latin pathogen and botanical names that confuse farmers and distort audio
  s = s.replace(/\b(?:Guignardia|bidwellii|Phytophthora|infestans|Alternaria|solani|Puccinia|sorghi|Isariopsis|clavispora|Xanthomonas|campestris|Colletotrichum|fusarium|pseudoperonospora|erysiphe|cercospora|curvularia|Podosphaera|xanthii|clandestina|Botryosphaeria|obtusa|Gymnosporangium|juniperi-virginianae|Venturia|inaequalis|Cucurbita|pepo|Vitis|vinifera)\b/gi, '');

  // 5. Formulation codes into natural spoken words (prevent spelling out "W P" or "E C")
  if (lang !== 'en') {
    const formulationReplacements: Record<LanguageCode, string> = {
      gu: 'દવા',
      hi: 'दवा',
      mr: 'औषध',
      bn: 'ওষুধ',
      te: 'మందు',
      ta: 'மருந்து',
      kn: 'ಔಷಧಿ',
      ml: 'മരുന്ന്',
      pa: 'ਦਵਾਈ',
      or: 'ଔଷଧ',
      as: 'ঔষধ',
      en: 'fungicide',
    };
    const formWord = formulationReplacements[lang] || 'દવા';
    s = s.replace(/\b\d+\s*(?:WP|EC|SC|SL|WDG|SP|FS|WS)\b/gi, ` ${formWord} `);
    s = s.replace(/\b(?:WP|EC|SC|SL|WDG|SP|FS|WS|ppm|PPM)\b/g, ` ${formWord} `);
  }

  // 6. Transliterate common agrochemicals & diseases into regional scripts
  const chemicalDictionary: Record<string, Partial<Record<LanguageCode, string>>> = {
    'mancozeb': { gu: 'મેન્કોઝેબ', hi: 'मैनकोजेब', mr: 'मॅन्कोझेब', bn: 'ম্যানকোজেব', te: 'మాంకోజెబ్', ta: 'மேன்கோசெப்', kn: 'ಮ್ಯಾಂಕೋಜೆಬ್', ml: 'മാങ്കോസെബ്', pa: 'ਮੈਨਕੋਜ਼ੇਬ', or: 'ମାଙ୍କୋଜେବ୍', as: 'মেনকোজেব' },
    'azoxystrobin': { gu: 'એઝોક્સીસ્ટ્રોબિન', hi: 'एज़ोक्सीस्ट्रोबिन', mr: 'ॲझोक्सीस्ट्रोबिन', bn: 'অ্যাজোক্সিস্ট্রোবিন', te: 'అజోక్సీస్ట్రోబిన్', ta: 'அஸோக்ஸிஸ்ட்ரோபின்', kn: 'ಅಜೋಕ್ಸಿಸ್ಟ್ರೋಬಿನ್', ml: 'അസോക്സിസ്ട്രോബിൻ', pa: 'ਐਜ਼ੋਕਸੀਸਟ੍ਰੋਬਿਨ', or: 'ଆଜୋକ୍ସିଷ୍ଟ୍ରୋବିନ୍', as: 'এজক্সিষ্ট্ৰবিন' },
    'myclobutanil': { gu: 'માયક્લોબ્યુટાનિલ', hi: 'माइक्लोबुटानिल', mr: 'मायक्लोब्युटॅनिल', bn: 'মাইক্লোবুটানিল', te: 'మైక్లోబుటానిల్', ta: 'மைக்ளோபுட்டானில்', kn: 'ಮೈಕ್ಲೋಬುಟಾನಿಲ್', ml: 'മൈക്ലോബ്യുട്ടാനിൽ', pa: 'ਮਾਈਕਲੋਬੂਟਾਨਿਲ', or: 'ମାଇକ୍ଲୋବୁଟାନିଲ୍', as: 'মাইক্ল’বুটানিল' },
    'bordeaux mixture': { gu: 'બોર્ડો મિશ્રણ', hi: 'बोर्डो मिश्रण', mr: 'बोर्डो मिश्रण', bn: 'বোর্দো মিশ্রণ', te: 'బోర్డో మిశ్రమం', ta: 'போர்டோ கலவை', kn: 'ಬೋರ್ಡೋ ಮಿಶ್ರಣ', ml: 'ബോർഡോ മിശ്രിതം', pa: 'ਬੋਰਡੋ ਮਿਸ਼ਰਣ', or: 'ବୋର୍ଡୋ ମିଶ୍ରଣ', as: 'ব’ৰ্ডো মিশ্ৰণ' },
    'bordeaux': { gu: 'બોર્ડો', hi: 'बोर्डो', mr: 'बोर्डो', bn: 'বোর্দো', te: 'బోర్ડો', ta: 'போர்டோ', kn: 'ಬೋರ್ಡೋ', ml: 'ബോർഡോ', pa: 'ਬੋਰਡੋ', or: 'ବୋର୍ଡୋ', as: 'ব’ৰ্ডো' },
    'copper oxychloride': { gu: 'કોપર ઓક્સિક્લોરાઇડ', hi: 'कॉपर ऑक्सीक्लोराइड', mr: 'कॉपर ऑक्सिक्लोराइड', bn: 'কপার অক্সিক্লোরাইড', te: 'కాపర్ ఆక్సిక్లోరైడ్', ta: 'காப்பர் ஆக்ஸிகுளோரைடு', kn: 'ಕಾಪರ್ ಆಕ್ಸಿಕ್ಲೋರೈಡ್', ml: 'കോപ്പർ ഓക്സിക്ലോറൈഡ്', pa: 'ਕਾਪਰ ਆਕਸੀਕਲੋਰਾਈਡ', or: 'କପର ଅକ୍ସିକ୍ଲୋରାଇଡ୍', as: 'কপাৰ অক্সিক্ল’ৰাইড' },
    'trichoderma': { gu: 'ટ્રાઇકોડર્મા', hi: 'ट्राइकोडर्मा', mr: 'ट्रायकोडर्मा', bn: 'ট্রাইকোডার্মা', te: 'ట్రైకోడెర్మా', ta: 'ட்ரைக்கோடெர்மா', kn: 'ಟ್ರೈಕೋಡರ್ಮಾ', ml: 'ട്രൈക്കോഡെർമ', pa: 'ਟ੍ਰਾਈਕੋਡਰਮਾ', or: 'ଟ୍ରାଇକୋଡର୍ମା', as: 'ট্ৰাইক’ডাৰ্মা' },
    'carbendazim': { gu: 'કાર્બેન્ડાઝિમ', hi: 'कार्बेंडाजिम', mr: 'कार्बेन्डाझिम', bn: 'কার্বেনডাজিম', te: 'కార్బెండజిమ్', ta: 'கார்பென்டாசிம்', kn: 'ಕಾರ್ಬೆಂಡಾಜಿಮ್', ml: 'കാർബെൻഡാസിം', pa: 'ਕਾਰਬੈਂਡਾਜ਼ਿਮ', or: 'କାର୍ବେଣ୍ଡାଜିମ୍', as: 'কাৰ্বেনডাজিম' },
    'hexaconazole': { gu: 'હેક્ઝાકોનાઝોલ', hi: 'हेक्साकोनाजोल', mr: 'हेक्झाकोनाझोल', bn: 'হেক্সাকোনাজল', te: 'హెక్సాకొనజోಲ್', ta: 'ஹெக்சாகோனசோல்', kn: 'ಹೆಕ್ಸಾಕೊನಜೋಲ್', ml: 'ഹെക്സാകോണസോൾ', pa: 'ਹੈਕਸਾਕੋਨਾਜ਼ੋਲ', or: 'ହେକ୍ସାକୋନାଜୋଲ୍', as: 'হেক্সাকোনাজল' },
    'propiconazole': { gu: 'પ્રોપિકોનાઝોલ', hi: 'प्रोपिकोनाजोल', mr: 'प्रोपिकोनाझोल', bn: 'প্রপিকোনাজল', te: 'ప్రొపికోనజోల్', ta: 'புரோபிகோனசோல்', kn: 'ಪ್ರೊಪಿಕೋನಜೋಲ್', ml: 'പ്രൊപ്പികോണസോൾ', pa: 'ਪ੍ਰੋਪੀਕੋਨਾਜ਼ੋਲ', or: 'ପ୍ରୋପିକୋନାଜୋଲ୍', as: 'প্ৰপিকোনাজল' },
    'tebuconazole': { gu: 'ટેબુકોનાઝોલ', hi: 'टेबुकोनाजोल', mr: 'टेबुकोनाझोल', bn: 'টেবুকোনাজল', te: 'టెబుకొనజోల్', ta: 'டெபுகோனசோல்', kn: 'ಟೆಬುಕೊನಜೋಲ್', ml: 'ടെബുകോണസോൾ', pa: 'ਟੈਬੂਕੋਨਾਜ਼ੋਲ', or: 'ଟେବୁକୋନାଜୋଲ୍', as: 'টেবুকোনাজল' },
    'chlorothalonil': { gu: 'ક્લોરોથેલોનિલ', hi: 'क्लोरोथैलोनिल', mr: 'क्लोरोथॅलोनिल', bn: 'ক্লোরোথ্যালোনিল', te: 'క్లోరోథలోనిల్', ta: 'குளோரோதலோனில்', kn: 'ಕ್ಲೋರೋಥಲೋನಿಲ್', ml: 'ക്ലോറോതലോനിൽ', pa: 'ਕਲੋਰੋਥੈਲੋਨਿਲ', or: 'କ୍ଲୋରୋଥାଲୋନିଲ୍', as: 'ক্ল’ৰ’থেল’নিল' },
    'neem oil': { gu: 'લીમડાનું તેલ', hi: 'नीम का तेल', mr: 'कडुनिंबाचे तेल', bn: 'নিম তেল', te: 'వేప నూనె', ta: 'வேப்ப எண்ணெய்', kn: 'ಬೇವಿನ ಎಣ್ಣೆ', ml: 'വേപ്പെണ്ണ', pa: 'ਨਿੰਮ ਦਾ ਤੇਲ', or: 'ନିମ ତେଲ', as: 'নিম তেল' },
    'captan': { gu: 'કેપ્ટાન', hi: 'कैप्टान', mr: 'कॅप्टन', bn: 'ক্যাপটান', te: 'కాప్టాన్', ta: 'கேப்டான்', kn: 'ಕ್ಯಾಪ್ಟಾನ್', ml: 'ക്യാപ്റ്റൻ', pa: 'ਕੈਪਟਨ', or: 'କ୍ୟାପ୍ଟାନ୍', as: 'কেপ্টান' },
    'sulfur': { gu: 'ગંધક', hi: 'गंधक', mr: 'गंधक', bn: 'সালফার', te: 'గంధకం', ta: 'கந்தகம்', kn: 'ಗಂಧಕ', ml: 'ഗന്ധകം', pa: 'ਗੰਧਕ', or: 'ଗନ୍ଧକ', as: 'গন্ধক' },
    'sulphur': { gu: 'ગંધક', hi: 'गंधક', mr: 'गंधક', bn: 'সালফার', te: 'గంధకం', ta: 'கந்தகம்', kn: 'ಗಂಧಕ', ml: 'ഗന്ധകം', pa: 'ਗੰਧਕ', or: 'ଗନ୍ଧକ', as: 'গন্ধক' },
    'streptocycline': { gu: 'સ્ટ્રેપ્ટોસાઇક્લિન', hi: 'स्ट्रेप्टोसाइक्लिन', mr: 'स्ट्रेप्टोसायक्लिन', bn: 'স্ট্রেপ্টোসাইক্লিন', te: 'స్ట్రెప్టోసైక్లిన్', ta: 'ஸ்ட்ரெப்டோசைக்ளின்', kn: 'ಸ್ಟ್ರೆಪ್ಟೊಸೈಕ್ಲಿನ್', ml: 'സ്ട്രെപ്റ്റോസൈക്ലിൻ', pa: 'ਸਟ੍ਰੈਪਟੋਸਾਈਕਲਿਨ', or: 'ଷ୍ଟ୍ରେପ୍ଟୋସାଇକ୍ଲିନ୍', as: 'ষ্ট্ৰেপ্ট’ছাইক্লিন' },
    'difenoconazole': { gu: 'ડાયફેનોકોનાઝોલ', hi: 'डाइफेनोकोनाजोल', mr: 'डायफेनोकोनाझोल', bn: 'ডাইফেনোকোনাজোল', te: 'డైఫెనోకోనజోల్', ta: 'டைபெனோகோனசோல்', kn: 'ಡೈಫೆನೊಕೊನಾಜೋಲ್', ml: 'ഡൈഫെനോകോനാസോൾ', pa: 'ਡਾਈਫੈਨੋਕੋਨਾਜ਼ੋਲ', or: 'ଡାଇଫେନୋକୋନାଜୋଲ୍', as: 'ডাইফেন’কনাজল' },
    'imidacloprid': { gu: 'ઇમિડાક્લોપ્રિડ', hi: 'इमिडाक्लोप्रिड', mr: 'इमिडाक्लोप्रिड', bn: 'ইমিডাক্লোপ্রিড', te: 'ఇమిడాక్లోప్రిడ్', ta: 'இமிடாக்ளோபிரிட்', kn: 'ಇಮಿಡಾಕ್ಲೋಪ್ರಿಡ್', ml: 'ഇമിഡാക്ലോപ്രിഡ്', pa: 'ਇਮਿਡਾਕਲੋਪ੍ਰਿਡ', or: 'ଇମିଡାକ୍ଲୋପ୍ରିଡ୍', as: 'ইমিডাক্ল’প্ৰিড' },
    'acetamiprid': { gu: 'એસિટામિપ્રિડ', hi: 'एसिटामिप्रिड', mr: 'ॲसिटामिप्रिड', bn: 'অ্যাসিটামিপ্রিড', te: 'ఎసిటామిప్రిడ్', ta: 'அசிடாமிக்பிரிட்', kn: 'ಅಸಿಟಾಮಿಪ್ರಿಡ್', ml: 'അസറ്റാമിപ്രിഡ്', pa: 'ਐਸੀਟਾਮੀਪ੍ਰਿਡ', or: 'ଆସେଟାମିପ୍ରିଡ୍', as: 'এচিটামিপ্রিড' },
    'propargite': { gu: 'પ્રોપારગાઇટ', hi: 'प्रोपारगाइट', mr: 'प्रोपारगाइट', bn: 'প্রোপারগাইট', te: 'ప్రొపარგైట్', ta: 'புரோபர்கைட்', kn: 'ಪ್ರೊಪಾರ್ಗೈಟ್', ml: 'പ്രൊപ്പാർഗൈറ്റ്', pa: 'ਪ੍ਰੋਪਾਰਗਾਈਟ', or: 'ପ୍ରୋପାରଗାଇଟ୍', as: 'প্ৰপাৰগাইট' },
    'spiromesifen': { gu: 'સ્પાયરોમેસિફેન', hi: 'સ્પાયરોમેસિફેન', mr: 'स्पायरोमेसिफेन', bn: 'স্পাইরোমেসিফেন', te: 'స్పైరోమెసిఫెన్', ta: 'ஸ்பைரோமெசிஃபென்', kn: 'ಸ್ಪೈರೋಮೆಸಿಫೆನ್', ml: 'സ്പൈറോമെസിഫെൻ', pa: 'ਸਪਾਈਰੋਮੇਸੀਫੇਨ', or: 'ସ୍ପାଇରୋମେସିଫେନ୍', as: 'স্পাইৰ’মেচিফেন' },
    'tomato': { gu: 'ટામેટા', hi: 'टमाटर', mr: 'टोमॅटो', bn: 'টমেটো', te: 'టమాటా', ta: 'தக்காளி', kn: 'ಟೊಮೆಟೊ', ml: 'തക്കാളി', pa: 'ਟਮਾਟਰ', or: 'ଟମାଟୋ', as: 'টমেটো' },
    'potato': { gu: 'બટાટા', hi: 'आलू', mr: 'बટાટા', bn: 'আলু', te: 'బంగాళాదుంప', ta: 'உருளைக்கிழங்கு', kn: 'ಆಲೂಗಡ್ಡೆ', ml: 'ഉരുളക്കിഴങ്ങ്', pa: 'ਆਲੂ', or: 'ଆଳୁ', as: 'আলু' },
    'corn': { gu: 'મકાઈ', hi: 'मक्का', mr: 'मका', bn: 'ভুট্টা', te: 'మొక్కజొన్న', ta: 'மக்காச்சோளம்', kn: 'ಮೆಕ್ಕೆಜೋಳ', ml: 'ചോളം', pa: 'ਮੱਕੀ', or: 'ମକା', as: 'মাকৈ' },
    'maize': { gu: 'મકાઈ', hi: 'मक्का', mr: 'मका', bn: 'ভুট্টা', te: 'మొక్కజొన్న', ta: 'மக்காச்சோளம்', kn: 'ಮೆಕ್ಕೆಜೋಳ', ml: 'ചോളം', pa: 'ਮੱਕੀ', or: 'ମକା', as: 'মাকৈ' },
    'apple': { gu: 'સફરજન', hi: 'सेब', mr: 'सफरचंद', bn: 'আপেল', te: 'యాపిల్', ta: 'ஆப்பிள்', kn: 'ಸೇಬು', ml: 'ಆപ്പിൾ', pa: 'ਸੇਬ', or: 'ସେଓ', as: 'আপেল' },
    'grape': { gu: 'દ્રાક્ષ', hi: 'अंगूर', mr: 'द्राक्षे', bn: 'আঙুর', te: 'ద్రాక్ష', ta: 'திராட்சை', kn: 'ದ್ರಾಕ್ಷಿ', ml: 'മുന്തിരി', pa: 'ਅੰਗੂਰ', or: 'ଅଙ୍ଗୁର', as: 'আঙুৰ' },
    'grapes': { gu: 'દ્રાક્ષ', hi: 'अंगूर', mr: 'द्राक्षे', bn: 'আঙুর', te: 'ద్రాక్ష', ta: 'திராட்சை', kn: 'ದ್ರಾಕ್ಷಿ', ml: 'മുന്തിരി', pa: 'ਅੰਗੂਰ', or: 'ଅଙ୍ଗୁର', as: 'আঙুৰ' },
    'orange': { gu: 'સંતરા', hi: 'संतरा', mr: 'संत्रे', bn: 'কমলালেবু', te: 'నారింజ', ta: 'ஆரஞ்சு', kn: 'ಕಿತ್ತಳೆ', ml: 'ഓറഞ്ച്', pa: 'ਸੰਤਰਾ', or: 'କମଳା', as: 'কমলা' },
    'citrus': { gu: 'સાઇટ્રસ લીંબુ વર્ગ', hi: 'नींबू वर्गीय', mr: 'लिंबूवर्गीय', bn: 'লেবুজাতীয়', te: 'నిమ్మ జాతి', ta: 'எலுமிச்சை வகை', kn: 'ನಿಂಬೆ ಜಾತೀಯ', ml: 'നാരങ്ങ വർഗ്ഗം', pa: 'ਨਿੰਬੂ ਜਾਤੀ', or: 'ଲେମ୍ବୁ ଜାତୀୟ', as: 'নেমুজাতীয়' },
    'peach': { gu: 'પીચ', hi: 'आड़ू', mr: 'पीच', bn: 'পীচ', te: 'పీచ్', ta: 'பீச்', kn: 'ಪೀಚ್', ml: 'പീച്ച്', pa: 'ਆੜੂ', or: 'ପିଚ୍', as: 'পীচ' },
    'pepper': { gu: 'મરચાં', hi: 'मिर्च', mr: 'मिरची', bn: 'মরিচ', te: 'మిరప', ta: 'மிளகாய்', kn: 'ಮೆಣಸಿನಕಾಯಿ', ml: 'മുളക്', pa: 'ਮਿਰਚ', or: 'ଲଙ୍କା', as: 'জলকীয়া' },
    'bell pepper': { gu: 'કેપ્સિકમ શિમલા મરચાં', hi: 'शिमला मिर्च', mr: 'ढोबळी मिरची', bn: 'ক্যাপসিকাম মিষ্টি মরিচ', te: 'సిమ్లా మిర్చి', ta: 'குடைமிளகாய்', kn: 'ದಪ್ಪ ಮೆಣಸಿನಕಾಯಿ', ml: 'ക്യാപ്സിക്കം', pa: 'ਸ਼ਿਮਲਾ ਮਿਰਚ', or: 'ଶିମଲା ଲଙ୍କା', as: 'কেপচিকাম' },
    'capsicum': { gu: 'કેપ્સિકમ શિમલા મરચાં', hi: 'शिमला मिर्च', mr: 'ढोबळी मिरची', bn: 'ক্যাপসিকাম', te: 'సిమ్లా మిర్చి', ta: 'குடைமிளகாய்', kn: 'ದಪ್ಪ ಮೆಣಸಿನಕಾಯಿ', ml: 'ക്യാಪ್ಸിക്കം', pa: 'ਸ਼ਿਮਲਾ ਮਿਰਚ', or: 'ଶିਮଲା ଲଙ୍କା', as: 'কেপচিকাম' },
    'cherry': { gu: 'ચેરી', hi: 'चेरी', mr: 'चेरी', bn: 'চেরি', te: 'చెర్రీ', ta: 'செர்ரி', kn: 'ಚೆರ್ರಿ', ml: 'ചെറി', pa: 'ਚੈਰੀ', or: 'ଚେରୀ', as: 'চেৰী' },
    'blueberry': { gu: 'બ્લુબેરી', hi: 'ब्लूबेरी', mr: 'ब्लूबेरी', bn: 'ব্লুবেরি', te: 'బ్లూబెర్రీ', ta: 'புளூபெர்ரி', kn: 'ಬ್ಲೂಬೆರ್ರಿ', ml: 'ബ്ലൂബെറി', pa: 'ਬਲੂਬੇਰੀ', or: 'ବ୍ଲୁବେରୀ', as: 'ব্লুবেৰী' },
    'raspberry': { gu: 'રાસ્પબેરી', hi: 'रास्पबेरी', mr: 'रासबेरी', bn: 'রাস্পবেরি', te: 'రాస్ప్బెర్రీ', ta: 'ராஸ்பெர்ரி', kn: 'ರಾಸ್ಪ್ಬೆರ್ರಿ', ml: 'റാസ്പ്ബെറി', pa: 'ਰਸਬਰੀ', or: 'ରାସବେରୀ', as: 'ৰাছবেৰী' },
    'soybean': { gu: 'સોયાબીન', hi: 'सोयाबीन', mr: 'सोयाबीन', bn: 'সয়াবিন', te: 'సోయాచిక్కుడు', ta: 'சோயாபீன்', kn: 'ಸೋಯಾಬೀನ್', ml: 'സോയാബീൻ', pa: 'ਸੋਇਆਬੀਨ', or: 'ସୋୟାବିନ୍', as: 'চয়াবিন' },
    'squash': { gu: 'કોળું', hi: 'कद्दू', mr: 'भोपळा', bn: 'কুমড়ো', te: 'గుమ్మడి', ta: 'பூசணி', kn: 'ಕುಂಬಳಕಾಯಿ', ml: 'മത്തങ്ങ', pa: 'ਕੱਦੂ', or: 'ବୋଇତି କଖାରୁ', as: 'ৰঙালাউ' },
    'strawberry': { gu: 'સ્ટ્રોબેરી', hi: 'स्ट्रॉबेरी', mr: 'स्ट्रॉबेरी', bn: 'স্ট্রবেরি', te: 'స్ట్రాబెర్రీ', ta: 'ஸ்ட்ராபெரி', kn: 'ಸ್ಟ್ರಾಬೆರಿ', ml: 'സ്ട്രോബെറി', pa: 'ਸਟ੍ਰਾਬੇਰੀ', or: 'ଷ୍ଟ୍ରବେରୀ', as: 'ষ্ট্ৰবেৰী' },
    'rice': { gu: 'ડાંગર ચોખા', hi: 'धान चावल', mr: 'भात तांदूळ', bn: 'ধান চাল', te: 'వరి', ta: 'நெல் அரிசி', kn: 'ಭತ್ತ', ml: 'നെല്ല് അരി', pa: 'ਝੋਨਾ ਚੌਲ', or: 'ଧାନ ଚାଉଳ', as: 'ধান' },
    'wheat': { gu: 'ઘઉં', hi: 'गेहूं', mr: 'गहू', bn: 'গম', te: 'గోధుమలు', ta: 'கோதுமை', kn: 'ಗೋಧಿ', ml: 'ഗോതമ്പ്', pa: 'ਕਣਕ', or: 'ଗହਮ', as: 'ঘেঁহু' },
    'cotton': { gu: 'કપાસ', hi: 'कपास', mr: 'कापूस', bn: 'তুলা', te: 'పత్తి', ta: 'பருத்தி', kn: 'ಹತ್ತಿ', ml: 'പരുത്തി', pa: 'ਨਰਮਾ ਕਪਾਹ', or: 'କପା', as: 'কপাহ' },
    'sugarcane': { gu: 'શેરડી', hi: 'गन्ना', mr: 'ऊस', bn: 'আখ', te: 'చెరకు', ta: 'கரும்பு', kn: 'ಕಬ್ಬು', ml: 'കരിമ്പ്', pa: 'ਗੰਨਾ', or: 'ଆଖୁ', as: 'কুঁহিয়াৰ' },
    'early blight': { gu: 'આગોતરો સુકારો', hi: 'अगेती झुलसा', mr: 'करपा अर्ली ब्लाइट', bn: 'আগেভাগে ধ্বসা রোগ', te: 'ముందస్తు తెగులు', ta: 'ஆரம்ப கருகல் நோய்', kn: 'ಆರಂಭಿಕ ಮುರಟು ರೋಗ', ml: 'ഏർലി ബ്ലൈറ്റ്', pa: 'ਅਗੇਤਾ ਝੁਲਸ ਰੋਗ', or: 'ଆଗୁଆ ଝାଉଁଳା ରୋଗ', as: 'আগতীয়া মৰহি যোৱা বেমাৰ' },
    'late blight': { gu: 'પાછોતરો સુકારો', hi: 'पछेती झुलसा', mr: 'उशिरा येणारा करपा', bn: 'দেরিতে আসা ধ্বসা রোগ', te: 'ఆలస్యపు తెగులు', ta: 'பிற்கால கருகல் நோய்', kn: 'ತಡವಾದ ಮುರಟು ರೋಗ', ml: 'ലേറ്റ് ബ്ലൈറ്റ്', pa: 'ਪਛੇਤਾ ਝੁਲਸ ਰੋਗ', or: 'ପଛୁଆ ଝାଉଁଳା ରୋଗ', as: 'পাচতীয়া মৰহি যোৱা বেমাৰ' },
    'yellow leaf curl virus': { gu: 'કોકડવા વાયરસ', hi: 'पत्ती मरोड़ विषाणु', mr: 'चुरडा मुरडा विषाणू रोग', bn: 'পাতা কোঁকড়ানো ভাইরাস', te: 'ఆకు ముడుత వైరస్', ta: 'இலை சுருட்டு வைரஸ்', kn: 'ಎಲೆ ಮುದುರು ವೈರಸ್', ml: 'ഇല ചുരുളൽ വൈറസ്', pa: 'ਪੱਤਾ ਮਰੋੜ ਵਿਸ਼ਾਣੂ', or: 'ପତ୍ର କୁଞ୍ଚନ ଭୂତାଣୁ', as: 'পাত কোঁচোৱা ভাইৰাছ' },
    'leaf curl': { gu: 'કોકડવા રોગ', hi: 'पत्ती मरोड़ रोग', mr: 'चुरडा मुरडा', bn: 'পাতা কোঁকড়ানো', te: 'ఆకు ముడుత', ta: 'இலை சுருட்டு', kn: 'ಎಲೆ ಮುದುರು', ml: 'ഇല ചുരുളൽ', pa: 'ਪੱਤਾ ਮਰੋੜ', or: 'ପତ୍ର କୁଞ୍ଚନ', as: 'পাত কোঁচোৱা' },
    'mosaic virus': { gu: 'મોઝેક વાયરસ', hi: 'मोज़ेक विषाणु', mr: 'मोझॅक विषाणू', bn: 'মোজাইক ভাইরাস', te: 'మొజాయిక్ వైరస్', ta: 'மொசைக் வைரஸ்', kn: 'ಮೊಸಾಯಿಕ್ ವೈರಸ್', ml: 'മൊസൈക് വൈറസ്', pa: 'ਮੋਜ਼ੇਕ ਵਿਸ਼ਾਣੂ', or: 'ମୋଜାଇକ୍ ଭୂତାଣୁ', as: 'ম’জাইক ভাইৰাছ' },
    'powdery mildew': { gu: 'છાશિયો રોગ', hi: 'चूर्णिल आसिता', mr: 'भुरी रोग', bn: 'পাউডারি মিলডিউ', te: 'బూడిద తెగులు', ta: 'சாம்பல் நோய்', kn: 'ಬೂದಿ ರೋಗ', ml: 'പൗഡറി മിൽഡ്യൂ', pa: 'ਚਿੱਟਾ ਰੋਗ', or: 'ପାଉଡରି ମିଲଡିଉ', as: 'পাউডাৰী মিলডিউ' },
    'downy mildew': { gu: 'તળછારો રોગ', hi: 'मृदुरोमिल आसिता', mr: 'केवडा रोग', bn: 'ডাউনি মিলডিউ', te: 'డౌనీ తెగులు', ta: 'அடிச்சாம்பல் நோய்', kn: 'ಡೌನಿ ಮಿಲ್ಡ್ಯೂ', ml: 'ഡൗണി മിൽഡ്യൂ', pa: 'ਡਾਊਨੀ ਮਿਲਡਿਊ', or: 'ଡାଉନି ମିଲଡିଉ', as: 'ডাউনী মিলডিউ' },
    'apple scab': { gu: 'સફરજન સ્કેબ રોગ', hi: 'सेब का स्केब रोग', mr: 'सफरचंद खपली रोग', bn: 'আপেল স্ক্যাব', te: 'యాపిల్ స్కాబ్ తెగులు', ta: 'ஆப்பிள் சொறி நோய்', kn: 'ಸೇಬು ಸ್ಕ್ಯಾಬ್ ರೋಗ', ml: 'ആപ്പിൾ സ്കാബ്', pa: 'ਸੇਬ ਸਕੈਬ', or: 'ସେଓ ସ୍କାବ୍', as: 'আপেল স্কেব' },
    'black rot': { gu: 'કાળો સડો', hi: 'काली सड़न', mr: 'काळी कुज', bn: 'কালো পচন', te: 'నల్ల కుళ్లు తెగులు', ta: 'கருப்பு அழுகல் நோய்', kn: 'ಕಪ್ಪು ಕೊಳೆ ರೋಗ', ml: 'കറുത്ത ചീയൽ', pa: 'ਕਾਲਾ ਗਲਣ', or: 'କଳା ପଚା ରୋଗ', as: 'ক’লা পচন' },
    'cedar apple rust': { gu: 'સીડર સફરજન રતુઆ ગેરુ રોગ', hi: 'सीडर एप्पल रतुआ रोग', mr: 'सीडर सफरचंद तांबेरा', bn: 'সিডার আপেল মরিচা রোগ', te: 'సీడర్ యాపిల్ తుప్పు తెగులు', ta: 'சீடார் ஆப்பிள் துரு நோய்', kn: 'ಸೀಡರ್ ಸೇಬು ತುಕ್ಕು ರೋಗ', ml: 'സീഡാർ ആപ്പിൾ തുരുമ്പ്', pa: 'ਸੀਡਰ ਸੇਬ ਕੁੰਗੀ', or: 'ସିଡାର୍ ସେଓ କଳଙ୍କୀ', as: 'চিডাৰ আপেল গেৰুৱা' },
    'common rust': { gu: 'સામાન્ય ગેરુ રોગ', hi: 'सामान्य रतुआ रोग', mr: 'साधारण तांबेरा', bn: 'সাধারণ মরিচা রোগ', te: 'సాధారణ తుప్పు తెగులు', ta: 'பொதுவான துரு நோய்', kn: 'ಸಾಮಾನ್ಯ ತುಕ್ಕು ರೋಗ', ml: 'തുരുമ്പ് രോഗം', pa: 'ਆਮ ਕੁੰਗੀ ਰੋਗ', or: 'ସାଧାରଣ କଳଙ୍କୀ', as: 'সাধাৰଣ গেৰুৱা' },
    'northern leaf blight': { gu: 'ઉત્તરીય પાન સુકારો', hi: 'उत्तरी पत्ती झुलसा', mr: 'उत्तरी पानांचा करपा', bn: 'উত্তরাঞ্চলীয় পাতা ধ্বসা', te: 'ఉత్తర ఆకు తెగులు', ta: 'வடக்கு இலை கருகல் நோய்', kn: 'ಉತ್ತರದ ಎಲೆ ಮುರಟು', ml: 'നോർത്തೇൺ ലീಫ್ બ્ଲైಟ್', pa: 'ਉੱਤਰੀ ਪੱਤਾ ਝੁਲਸ', or: 'ଉତ୍ତର ପତ୍ର ଝାଉଁଳା', as: 'উত্তৰাঞ্চলীয় পাত মৰহি যোৱা' },
    'gray leaf spot': { gu: 'રાખોડી પાન ટપકાં', hi: 'ग्रे लीफ स्पॉट धब्बा', mr: 'राखाडी ठिपके', bn: 'ধূসর পাতার দাগ', te: 'బూడిద రంగు ఆకు మచ్చల తెగులు', ta: 'சாம்பல் இலை புள்ளி', kn: 'ಬೂದು ಎಲೆ ಚುಕ್ಕೆ', ml: 'ഗ്രേ ലീഫ് സ്പോട്ട്', pa: 'ਸਲੇਟੀ ਪੱਤਾ ਧੱਬਾ', or: 'ଧୂସର ପତ୍ର ଦାଗ', as: 'ধূসৰ পাতৰ দাগ' },
    'bacterial spot': { gu: 'બેક્ટેરિયલ ટપકાંનો રોગ', hi: 'जीवाणु धब्बा रोग', mr: 'जिवाणू ठिपके रोग', bn: 'ব্যাকটেরিয়াজনিত দাগ', te: 'బాక్టీరియల్ మచ్చల తెగులు', ta: 'பாக்டீரியா புள்ளி நோய்', kn: 'ಬ್ಯಾಕ್ಟೀರಿಯಾ ಚುಕ್ಕೆ ರೋಗ', ml: 'ബാക്ടീരിയൽ സ്പോട്ട്', pa: 'ਜੀਵਾਣੂ ਧੱਬਾ ਰੋਗ', or: 'ଜୀବାଣୁ ଦାଗ ରୋଗ', as: 'বেক্টেৰিয়াজনিত দাগ' },
    'leaf mold': { gu: 'પાનની ફૂગ', hi: 'पत्ती फफूंद मोल्ड', mr: 'पानावरील बुरशी', bn: 'পাতার ছত্রাক মোল্ড', te: 'ఆకు బూజు తెగులు', ta: 'இலை பூஞ்சை', kn: 'ಎಲೆ ಶಿಲೀಂಧ್ರ', ml: 'ഇലപ്പൂപ്പൽ', pa: 'ਪੱਤਾ ਉੱਲੀ', or: 'ପତ୍ର କବକ', as: 'পাতৰ ভেঁকুৰ' },
    'septoria leaf spot': { gu: 'સેપ્ટોરિયા ટપકાંનો રોગ', hi: 'सेप्टोरिया पत्ती धब्बा', mr: 'सेप्टोरिया ठिपके', bn: 'সেপ্টোরিয়া পাতার দাগ', te: 'సెప్టోరియా ఆకు మచ్చల తెగులు', ta: 'செப்டோரியா இலை புள்ளி', kn: 'ಸೆಪ್ಟೋರಿಯಾ ಎಲೆ ಚುಕ್ಕೆ', ml: 'സെപ്റ്റോറിയ ഇലപ്പുള്ളി', pa: 'ਸੈਪਟੋਰੀਆ ਪੱਤਾ ਧੱਬਾ', or: 'ସେପ୍ଟୋରିଆ ପତ୍ର ଦାଗ', as: 'চেপ্ট’ৰিয়া পাতৰ দাগ' },
    'target spot': { gu: 'ટાર્ગેટ સ્પોટ ટપકાં', hi: 'टारगेट स्पॉट गोल छल्लेदार धब्बा', mr: 'टार्गेट स्पॉट ठिपके', bn: 'টার্গেট স্পট দাগ', te: 'టార్గెట్ స్పాట్ మచ్చలు', ta: 'டார்கெட் ஸ்பாட் புள்ளி', kn: 'ಟಾರ್ಗೆಟ್ ಸ್ಪಾಟ್ ಚುಕ್ಕೆ', ml: 'ടാർഗെറ്റ് സ്പോട്ട്', pa: 'ਟਾਰਗੇਟ ਸਪਾਟ ਧੱਬਾ', or: 'ଟାର୍ଗେଟ୍ ସ୍ପଟ୍ ଦାଗ', as: 'টাৰ্গেট স্পট দাগ' },
    'spider mites': { gu: 'લાલ કથીરી જીવાત', hi: 'लाल मकड़ी कीट', mr: 'लाल कोळी कीड', bn: 'লাল মাকড় কীট', te: 'ఎర్ర నల్లి పురుగు', ta: 'செம்பேன் சிலந்திப் பூச்சி', kn: 'ಕೆಂಪು ನುಸಿ ಕೀಟ', ml: 'ചുവന്ന മണ്ഡരി കീടം', pa: 'ਲਾਲ ਮੱਕੜੀ ਕੀੜਾ', or: 'ନାଲି ବୁଢ଼ିଆଣୀ କୀଟ', as: 'ৰঙা মকৰা কীট' },
    'leaf scorch': { gu: 'પાન દાઝવાનો રોગ', hi: 'पत्ती झुलस रोग', mr: 'पान करपणे', bn: 'পাতা পোড়া রোগ', te: 'ఆకు మాడటం', ta: 'இலை கருகல்', kn: 'ಎಲೆ ಸುಡುವಿಕೆ', ml: 'ഇല കരിയൽ', pa: 'ਪੱਤਾ ਝੁਲਸ', or: 'ପତ୍ର ପୋଡ଼ା ରୋଗ', as: 'পাত পোৰা বেমাৰ' },
    'citrus greening': { gu: 'સાઇટ્રસ ગ્રીનિંગ રોગ', hi: 'सिट्रस ग्रीनिंग रोग', mr: 'सिट्रस ग्रीनिंग रोग', bn: 'সাইট্রাস গ্রিনিং', te: 'సిట్రస్ గ్రీనింగ్ తెగులు', ta: 'சிட்ரஸ் கிரீனிங் நோய்', kn: 'ಸಿಟ್ರಸ್ ಗ್ರೀನಿಂಗ್ ರೋಗ', ml: 'സിട്രസ് ഗ്രീനിംഗ്', pa: 'ਸਿਟਰਸ ਗ੍ਰੀਨਿੰਗ', or: 'ସିଟ୍ରସ୍ ଗ୍ରୀନିଂ', as: 'ছাইট্ৰাছ গ্ৰীনিং' },
    'esca': { gu: 'એસ્કા કાળો સડો', hi: 'एस्का रोग', mr: 'एस्का रोग', bn: 'এস্কা রোগ', te: 'ఎస్కా తెగులు', ta: 'எஸ்கா நோய்', kn: 'ಎಸ್ಕಾ ರೋಗ', ml: 'എസ്ക രോഗം', pa: 'ਐਸਕਾ ਰੋਗ', or: 'ଏସ୍କା ରୋଗ', as: 'এস্কা ৰোগ' },
    'healthy': { gu: 'સંપૂર્ણ તંદુરસ્ત', hi: 'पूर्णतः स्वस्थ', mr: 'पूर्णपणे निरोगी', bn: 'সম্পূর্ণ সুস্থ', te: 'సంపూర్ణ ఆరోగ్యకరమైన', ta: 'முற்றிலும் ஆரோக்கியமான', kn: 'ಸಂಪೂರ್ಣ ಆರೋಗ್ಯಕರ', ml: 'തികച്ചും ആരോഗ്യകരമായ', pa: 'ਪੂਰੀ ਤਰ੍ਹਾਂ ਤੰਦਰੁਸਤ', or: 'ସମ୍ପୂର୍ଣ୍ଣ ସୁସ୍ଥ', as: 'সম্পূৰ্ণৰূপে সুস্থ' },
    'fungus': { gu: 'ફૂગ', hi: 'कवक', mr: 'बुरशी', bn: 'ছত্রাক', te: 'శిలీంధ్రం', ta: 'பூஞ்சை', kn: 'ಶಿಲೀಂಧ್ರ', ml: 'ഫംഗസ്', pa: 'ਉੱਲੀ', or: 'କବକ', as: 'ভেঁকুৰ' },
    'bacteria': { gu: 'બેક્ટેરિયા', hi: 'जीवाणु', mr: 'जिवाणू', bn: 'ব্যাকটেরিয়া', te: 'బాక్టీరియా', ta: 'பாக்டீரியா', kn: 'ಬ್ಯಾಕ್ಟೀರಿಯಾ', ml: 'ബാക്ടീരിയ', pa: 'ਜੀਵਾਣੂ', or: 'ଜୀବାଣୁ', as: 'বেক্টেৰিয়া' },
    'virus': { gu: 'વાયરસ', hi: 'विषाणु', mr: 'विषाणू', bn: 'ভাইরাস', te: 'వైరస్', ta: 'வைரஸ்', kn: 'ವೈರಸ್', ml: 'വൈറസ്', pa: 'ਵਿਸ਼ਾਣੂ', or: 'ଭୂତାଣୁ', as: 'ভাইৰাছ' },
    'kisan call center': { gu: 'કિસાન કોલ સેન્ટર', hi: 'किसान कॉल सेंटर', mr: 'किसान कॉल सेंटर', bn: 'কিষাণ কল সেন্টার', te: 'కిసాన్ కాల్ సెంటర్', ta: 'கிசான் கால் சென்டர்', kn: 'ಕಿಸಾನ್ ಕಾಲ್ ಸೆಂಟರ್', ml: 'കിസാൻ കോൾ സെന്റർ', pa: 'ਕਿਸਾਨ ਕਾਲ ਸੈਂਟਰ', or: 'କିଷାନ କଲ୍ ସେଣ୍ଟର', as: 'কিষাণ কল চেণ্টাৰ' },
  };

  if (lang !== 'en') {
    for (const [engWord, transMap] of Object.entries(chemicalDictionary)) {
      const targetTrans = transMap[lang];
      if (targetTrans) {
        const reg = new RegExp(`\\b${engWord}\\b`, 'gi');
        s = s.replace(reg, targetTrans);
      }
    }
  }

  // 7. Dosage: Millilitres per liter of water
  const mlPerLiterRegex = /(\d+(?:[.,]\d+)?)\s*(?:મિલી|મિ\.લી|मिली|मि\.ली|মিলি|మిల్లీ|மில்லி|ಮಿಲಿ|മില്ലി|ਮਿਲੀ|ਮਿଲି|ml|m\.l\.|millilitre|milliliter|millilitres|milliliters)\s*(?:[/]|પ્રતિ|प्रति|প্রতি|ప్రతి|ஒரு|ಒಂದು|ഒരു|ਪ੍ਰਤੀ|ପ୍ରତି|per)\s*(?:લિટર|લિ|લી|लीटर|ली|लिटर|লিটার|లీటరు|లీ|லிட்டர்|லி|ಲೀಟರ್|ಲಿ|ലിറ്റർ|ലി|ਲਿਟਰ|ଲିଟର|l|litre|liter|litres|liters)\b/gi;
  s = s.replace(mlPerLiterRegex, (_m, num) => {
    const spoken = formatNumberForSpeech(num, lang);
    const phrases: Record<LanguageCode, string> = {
      gu: `${spoken} મિલી પ્રતિ લિટર પાણીમાં`,
      hi: `${spoken} मिलीलीटर प्रति लीटर पानी में`,
      mr: `${spoken} मिली प्रति लिटर पाण्यात`,
      bn: `${spoken} মিলি প্রতি লিটার জলে`,
      te: `${spoken} మిల్లీలీటర్లు లీటరు నీటికి`,
      ta: `${spoken} மில்லிலிட்டர் ஒரு லிட்டர் தண்ணீருக்கு`,
      kn: `${spoken} ಮಿಲಿ ಪ್ರತಿ ಲೀಟರ್ ನೀರಿಗೆ`,
      ml: `${spoken} മില്ലിലിറ്റർ ഒരു ലിറ്റർ വെള്ളത്തിന്`,
      pa: `${spoken} ਮਿਲੀ ਪ੍ਰਤੀ ਲਿਟਰ ਪਾਣੀ ਵਿੱਚ`,
      or: `${spoken} ମିଲି ପ୍ରତି ଲିଟର ପାଣିରେ`,
      as: `${spoken} মিলিলিটাৰ প্ৰতি লিটাৰ পানীত`,
      en: `${spoken} milliliters per liter of water`,
    };
    return phrases[lang] || `${spoken} milliliters per liter of water`;
  });

  // 8. Dosage: Grams per liter of water
  const gPerLiterRegex = /(\d+(?:[.,]\d+)?)\s*(?:ગ્રામ|ગ્રા|ગ|ग्राम|ग्रा|গ্রাম|గ్రాములు|గ్రా|கிராம்|ഗ്രാം|ਗ੍ਰਾਮ|ଗ୍ରାମ|g|gm|gms|gram|grams)\s*(?:[/]|પ્રતિ|प्रति|প্রতি|ప్రతి|ஒரு|ಒಂದು|ഒരു|ਪ੍ਰਤੀ|ପ୍ରତି|per)\s*(?:લિટર|લિ|લી|लीटर|ली|लिटर|লিটার|లీటరు|లీ|லிட்டர்|லி|ಲೀಟರ್|ಲಿ|ലിറ്റർ|ലി|ਲਿਟਰ|ଲିଟର|l|litre|liter|litres|liters)\b/gi;
  s = s.replace(gPerLiterRegex, (_m, num) => {
    const spoken = formatNumberForSpeech(num, lang);
    const phrases: Record<LanguageCode, string> = {
      gu: `${spoken} ગ્રામ પ્રતિ લિટર પાણીમાં`,
      hi: `${spoken} ग्राम प्रति लीटर पानी में`,
      mr: `${spoken} ग्रॅम प्रति लिटर पाण्यात`,
      bn: `${spoken} গ্রাম প্রতি লিটার জলে`,
      te: `${spoken} గ్రాములు లీటరు నీటికి`,
      ta: `${spoken} கிராம் ஒரு லிட்டர் தண்ணீருக்கு`,
      kn: `${spoken} ಗ್ರಾಂ ಪ್ರತಿ ಲೀಟರ್ ನೀರಿಗೆ`,
      ml: `${spoken} ഗ്രാം ഒരു ലിറ്റർ വെള്ളത്തിന്`,
      pa: `${spoken} ਗ੍ਰਾਮ ਪ੍ਰਤੀ ਲਿਟਰ ਪਾਣੀ ਵਿੱਚ`,
      or: `${spoken} ଗ୍ରାମ ପ୍ରତି ଲିଟର ପାଣିରେ`,
      as: `${spoken} গ্ৰাম প্ৰতি লিটাৰ পানীত`,
      en: `${spoken} grams per liter of water`,
    };
    return phrases[lang] || `${spoken} grams per liter of water`;
  });

  // 9. Standalone Millilitres (not followed by / liter)
  const standaloneMlRegex = /(\d+(?:[.,]\d+)?)\s*(?:ml|m\.l\.|millilitre|milliliter|millilitres|milliliters)\b/gi;
  s = s.replace(standaloneMlRegex, (_m, num) => {
    const spoken = formatNumberForSpeech(num, lang);
    const phrases: Record<LanguageCode, string> = {
      gu: `${spoken} મિલીલીટર`,
      hi: `${spoken} मिलीलीटर`,
      mr: `${spoken} मिलीलिटर`,
      bn: `${spoken} মিলিলিটার`,
      te: `${spoken} మిల్లీలీటర్లు`,
      ta: `${spoken} மில்லிலிட்டர்`,
      kn: `${spoken} ಮಿಲಿಲೀಟರ್`,
      ml: `${spoken} മില്ലിലിറ്റർ`,
      pa: `${spoken} ਮਿਲੀਲੀਟਰ`,
      or: `${spoken} ମିଲିଲିଟର`,
      as: `${spoken} মিলিলিটাৰ`,
      en: `${spoken} milliliters`,
    };
    return phrases[lang] || `${spoken} milliliters`;
  });

  // 10. Standalone Grams (not followed by / liter)
  const standaloneGRegex = /(\d+(?:[.,]\d+)?)\s*(?:gm|gms|gram|grams)\b/gi;
  s = s.replace(standaloneGRegex, (_m, num) => {
    const spoken = formatNumberForSpeech(num, lang);
    const phrases: Record<LanguageCode, string> = {
      gu: `${spoken} ગ્રામ`,
      hi: `${spoken} ग्राम`,
      mr: `${spoken} ग्रॅम`,
      bn: `${spoken} গ্রাম`,
      te: `${spoken} గ్రాములు`,
      ta: `${spoken} கிராம்`,
      kn: `${spoken} ಗ್ರಾಂ`,
      ml: `${spoken} ഗ്രാം`,
      pa: `${spoken} ਗ੍ਰਾਮ`,
      or: `${spoken} ଗ୍ରାମ`,
      as: `${spoken} গ্ৰাম`,
      en: `${spoken} grams`,
    };
    return phrases[lang] || `${spoken} grams`;
  });

  // Standalone g word boundary
  s = s.replace(/(\d+(?:[.,]\d+)?)\s*g\b/gi, (_m, num) => {
    const spoken = formatNumberForSpeech(num, lang);
    if (lang === 'gu') return `${spoken} ગ્રામ`;
    if (lang === 'hi') return `${spoken} ग्राम`;
    if (lang === 'mr') return `${spoken} ग्रॅम`;
    if (lang === 'bn') return `${spoken} গ্রাম`;
    if (lang === 'te') return `${spoken} గ్రాములు`;
    if (lang === 'ta') return `${spoken} கிராம்`;
    if (lang === 'kn') return `${spoken} ಗ್ರಾಂ`;
    if (lang === 'ml') return `${spoken} ഗ്രാം`;
    if (lang === 'pa') return `${spoken} ਗ੍ਰਾਮ`;
    if (lang === 'or') return `${spoken} ଗ୍ରାମ`;
    if (lang === 'as') return `${spoken} গ্ৰাম`;
    return `${spoken} grams`;
  });

  // 11. Standalone Litres
  const standaloneLRegex = /(\d+(?:[.,]\d+)?)\s*(?:l|ltr|litre|liter|litres|liters)\b/gi;
  s = s.replace(standaloneLRegex, (_m, num) => {
    const spoken = formatNumberForSpeech(num, lang);
    const phrases: Record<LanguageCode, string> = {
      gu: `${spoken} લિટર`,
      hi: `${spoken} लीटर`,
      mr: `${spoken} लिटर`,
      bn: `${spoken} লিটার`,
      te: `${spoken} లీటర్లు`,
      ta: `${spoken} லிட்டர்`,
      kn: `${spoken} ಲೀಟರ್`,
      ml: `${spoken} ലിറ്റർ`,
      pa: `${spoken} ਲਿਟਰ`,
      or: `${spoken} ଲିଟର`,
      as: `${spoken} লিটাৰ`,
      en: `${spoken} liters`,
    };
    return phrases[lang] || `${spoken} liters`;
  });

  // 12. Standalone Kilograms
  const standaloneKgRegex = /(\d+(?:[.,]\d+)?)\s*(?:kg|kgs|kilo|kilogram|kilograms)\b/gi;
  s = s.replace(standaloneKgRegex, (_m, num) => {
    const spoken = formatNumberForSpeech(num, lang);
    const phrases: Record<LanguageCode, string> = {
      gu: `${spoken} કિલો`,
      hi: `${spoken} किलोग्राम`,
      mr: `${spoken} किलो`,
      bn: `${spoken} কেজি`,
      te: `${spoken} కిలోలు`,
      ta: `${spoken} கிலோ`,
      kn: `${spoken} ಕೆಜಿ`,
      ml: `${spoken} കിലോഗ്രാം`,
      pa: `${spoken} ਕਿਲੋ`,
      or: `${spoken} କିଲୋ`,
      as: `${spoken} কিলোগ্ৰাম`,
      en: `${spoken} kilograms`,
    };
    return phrases[lang] || `${spoken} kilograms`;
  });

  // 13. Rate symbol @
  if (lang === 'gu') s = s.replace(/@\s*/g, 'પ્રમાણ ');
  else if (lang === 'hi') s = s.replace(/@\s*/g, 'दर ');
  else if (lang === 'mr') s = s.replace(/@\s*/g, 'प्रमाण ');
  else if (lang === 'en') s = s.replace(/@\s*/g, 'at ');

  // 14. Helpline pacing (prevents TTS pronouncing 18001801551 as a ten billion number)
  if (lang === 'en') {
    s = s.replace(/1800[- ,]?180[- ,]?1551/g, '1 8 0 0, 1 8 0, 1 5 5 1');
  } else {
    s = s.replace(/1800[- ,]?180[- ,]?1551/g, '1800 180 1551');
  }

  // 15. Slash replacement
  const orWord: Record<LanguageCode, string> = {
    hi: ' या ',
    mr: ' किंवा ',
    gu: ' અથવા ',
    bn: ' বা ',
    te: ' లేదా ',
    ta: ' அல்லது ',
    kn: ' અથવા ',
    ml: ' അല്ലെങ്കിൽ ',
    pa: ' ਜਾਂ ',
    or: ' କିମ୍ବା ',
    as: ' বা ',
    en: ' or ',
  };
  s = s.replace(/\s+[/]\s+/g, orWord[lang] || ' or ');

  // 16. Technical abbreviation cleanup (prevent unnatural letter-by-letter spelling)
  if (lang !== 'en') {
    s = s.replace(/\b(?:WP|EC|SC|SL|WDG|SP|FS|WS)\b/gi, '');
  }

  // 17. Clean redundant spaces and punctuation
  s = s.replace(/\s+/g, ' ');
  s = s.replace(/\s+([.,!?।])/g, '$1').trim();

  return s;
}

class SpeechService {
  private voices: SpeechSynthesisVoice[] = [];
  private isInitialized = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private currentAudio: HTMLAudioElement | null = null;
  private sentenceQueue: SpeechQueueItem[] = [];
  private englishFallbackQueue: SpeechQueueItem[] = [];
  private currentQueueIndex = 0;
  private currentSection: SpeechSectionId | null = null;
  private currentRate = 1.0; // Fluent, natural conversational speed
  private currentPitch = 1.0; // Standard natural human voice pitch
  private isActivelyPlaying = false;
  private isActivelyPaused = false;
  private isStopped = false;
  private currentSessionId = 0;
  private activeLanguage: LanguageCode = 'hi';
  private activeEngine: 'cloud' | 'browser' = 'cloud';
  private cloudTtsFailedInSession = false;
  private listeners: Set<(state: SpeechPlayerState) => void> = new Set();
  private keepAliveTimer: any = null;
  private startWatchdogTimer: any = null;
  private nextSentenceTimer: any = null;

  constructor() {
    if (typeof window !== 'undefined') {
      const prefs = getStoredPreferences();
      if (prefs.speechRate) {
        this.currentRate = Math.max(0.8, Math.min(1.25, prefs.speechRate));
      }
      if (prefs.speechPitch) {
        this.currentPitch = Math.max(0.85, Math.min(1.15, prefs.speechPitch));
      }
      if (!(window as any).__agriVisionUtterances) {
        (window as any).__agriVisionUtterances = [];
      }
    }
    this.initVoices();
  }

  private initVoices(): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }
    const updateVoices = () => {
      try {
        this.voices = window.speechSynthesis.getVoices() || [];
        if (this.voices.length > 0) {
          this.isInitialized = true;
          this.emitState();
        }
      } catch {
        // Ignore voice enumeration errors
      }
    };
    updateVoices();
    try {
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = updateVoices;
      }
    } catch {
      // Ignore
    }
  }

  public isSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return 'speechSynthesis' in window || typeof Audio !== 'undefined';
  }

  public subscribe(listener: (state: SpeechPlayerState) => void): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private emitState(): void {
    const state = this.getState();
    this.listeners.forEach((listener) => {
      try {
        listener(state);
      } catch (err) {
        console.warn('Speech listener error:', err);
      }
    });
  }

  public getState(): SpeechPlayerState {
    const isSupported = this.isSupported();
    if (!isSupported) {
      return {
        isPlaying: false,
        isPaused: false,
        currentSection: null,
        activeSnippet: '',
        activeStepIndex: -1,
        currentQueueIndex: 0,
        totalQueueItems: 0,
        speechRate: this.currentRate,
        speechPitch: this.currentPitch,
        voiceName: '',
        isSupported: false,
      };
    }

    const isPlaying = this.isActivelyPlaying && !this.isActivelyPaused && !this.isStopped;
    const isPaused = this.isActivelyPaused && !this.isStopped;
    const currentItem = this.sentenceQueue[this.currentQueueIndex];
    const activeSnippet =
      (isPlaying || isPaused) && currentItem
        ? currentItem.text
        : isPlaying
        ? 'बोल रहे हैं...'
        : '';
    const activeStepIndex = (isPlaying || isPaused) && currentItem ? currentItem.stepIndex : -1;

    const resolved = this.resolveBestMaleVoice(this.activeLanguage);
    const voiceLabel =
      this.activeEngine === 'cloud' && !this.cloudTtsFailedInSession
        ? `Neural HD (${this.activeLanguage.toUpperCase()})`
        : resolved.displayName;

    return {
      isPlaying,
      isPaused,
      currentSection: this.currentSection,
      activeSnippet,
      activeStepIndex,
      currentQueueIndex: this.currentQueueIndex,
      totalQueueItems: this.sentenceQueue.length,
      speechRate: this.currentRate,
      speechPitch: this.currentPitch,
      voiceName: voiceLabel,
      isSupported: true,
    };
  }

  public setPitch(pitch: number): void {
    this.currentPitch = Math.max(0.75, Math.min(1.15, pitch));
    saveStoredPreferences({ speechPitch: this.currentPitch });
    if (this.currentUtterance) {
      this.currentUtterance.pitch = this.currentPitch;
    }
    this.emitState();
  }

  public getPitch(): number {
    return this.currentPitch;
  }

  /**
   * Check if a voice is an authentic mature male voice based on keywords
   */
  private isMaleVoice(voice: SpeechSynthesisVoice): boolean {
    const name = (voice.name || '').toLowerCase();
    const femaleKeywords = [
      'female', 'woman', 'girl', 'swara', 'kalpana', 'lekha', 'veena', 'neerja', 'zira',
      'samantha', 'victoria', 'karen', 'kalyani', 'geeta', 'aditi', 'priya', 'pooja',
      'fiona', 'moira', 'tessa', 'helena', 'catherine', 'hazel', 'susan', 'alice',
      'dhwani', 'ananya', 'shruti', 'pallavi', 'vani', 'sangeeta', 'deepa', 'meera',
      'chidi', 'junior', 'child', 'kid', 'youth', 'young', 'teen'
    ];
    if (femaleKeywords.some((k) => name.includes(k))) return false;

    const maleKeywords = [
      'deep', 'baritone', 'male', 'man', 'madhur', 'hemant', 'ravi', 'prabhat', 'david', 'mark',
      'george', 'rishi', 'alex', 'daniel', 'fred', 'ajay', 'rahul', 'guy', 'adult',
      'niranjan', 'manohar', 'valluvar', 'mohan', 'gagan', 'midhun', 'bashkar', 'gurpreet',
      'sukant', 'tarun', 'karan', 'deepak', 'suresh', 'ramesh',
      'wavenet-b', 'wavenet-d', 'neural2-b', 'neural2-d', 'standard-b', 'standard-d'
    ];
    if (maleKeywords.some((k) => name.includes(k))) return true;

    return true;
  }

  private isExplicitlyMale(voice: SpeechSynthesisVoice): boolean {
    const name = (voice.name || '').toLowerCase();
    const maleKeywords = [
      'deep', 'baritone', 'male', 'man', 'madhur', 'hemant', 'ravi', 'prabhat', 'david', 'mark',
      'george', 'rishi', 'alex', 'daniel', 'fred', 'ajay', 'rahul', 'guy', 'adult',
      'niranjan', 'manohar', 'valluvar', 'mohan', 'gagan', 'midhun', 'bashkar', 'gurpreet',
      'sukant', 'tarun', 'karan', 'deepak', 'suresh', 'ramesh',
      'wavenet-b', 'wavenet-d', 'neural2-b', 'neural2-d', 'standard-b', 'standard-d'
    ];
    return maleKeywords.some((k) => name.includes(k));
  }

  private isExplicitlyFemale(voice: SpeechSynthesisVoice): boolean {
    const name = (voice.name || '').toLowerCase();
    const femaleKeywords = [
      'female', 'woman', 'girl', 'swara', 'kalpana', 'lekha', 'veena', 'neerja', 'zira',
      'samantha', 'victoria', 'karen', 'kalyani', 'geeta', 'aditi', 'priya', 'pooja',
      'fiona', 'moira', 'tessa', 'helena', 'catherine', 'hazel', 'susan', 'alice',
      'dhwani', 'ananya', 'shruti', 'pallavi', 'vani', 'sangeeta', 'deepa', 'meera',
      'chidi', 'junior', 'child', 'kid', 'youth', 'young', 'teen'
    ];
    return femaleKeywords.some((k) => name.includes(k));
  }

  private scoreVoiceQuality(voice: SpeechSynthesisVoice, lang: LanguageCode): number {
    let score = 0;
    const name = (voice.name || '').toLowerCase();
    const vLang = (voice.lang || '').toLowerCase().replace(/_/g, '-');
    const targetCodes = LANGUAGE_BCP47_MAPPINGS[lang] || ['en-IN', 'en'];

    if (name.includes('natural') || name.includes('online (natural)')) score += 120;
    if (name.includes('neural') || name.includes('neural2')) score += 110;
    if (name.includes('wavenet')) score += 100;
    if (name.includes('enhanced') || name.includes('siri')) score += 90;
    if (name.includes('google')) score += 75;
    if (name.includes('microsoft')) score += 65;
    if (name.includes('apple')) score += 55;

    const primaryCode = targetCodes[0].toLowerCase().replace(/_/g, '-');
    if (vLang === primaryCode) score += 70;
    else if (vLang.startsWith(primaryCode.split('-')[0])) score += 35;

    if (lang === 'en') {
      if (vLang === 'en-in' || name.includes('india') || name.includes('indian')) score += 60;
      if (name.includes('ravi') || name.includes('prabhat') || name.includes('rishi')) score += 35;
    }

    if (this.isExplicitlyMale(voice)) {
      score += 180;
    } else if (this.isExplicitlyFemale(voice)) {
      score -= 220;
    }

    const badKeywords = ['child', 'kid', 'girl', 'junior', 'youth', 'young', 'teen', 'chidi', 'espeak', 'compact'];
    if (badKeywords.some((k) => name.includes(k))) score -= 150;

    return score;
  }

  private getNativeVoicesForLanguage(lang: LanguageCode): SpeechSynthesisVoice[] {
    if (!this.voices || this.voices.length === 0) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          this.voices = window.speechSynthesis.getVoices() || [];
        } catch {
          this.voices = [];
        }
      }
    }
    if (!this.voices || this.voices.length === 0) return [];

    const candidateCodes = LANGUAGE_BCP47_MAPPINGS[lang] || ['en-IN', 'en'];
    const primaryPrefix = candidateCodes[0].split('-')[0].toLowerCase();
    const nameKeywords = LANGUAGE_NAME_KEYWORDS[lang] || [];

    const matched = this.voices.filter((v) => {
      const vLang = (v.lang || '').toLowerCase().replace(/_/g, '-');
      const vName = (v.name || '').toLowerCase();
      return (
        candidateCodes.some((code) => {
          const lower = code.toLowerCase().replace(/_/g, '-');
          return vLang === lower || vLang.startsWith(lower) || lower.startsWith(vLang);
        }) ||
        vLang.startsWith(primaryPrefix) ||
        nameKeywords.some((kw) => vName.includes(kw))
      );
    });

    if (matched.length > 0) {
      return matched.sort((a, b) => this.scoreVoiceQuality(b, lang) - this.scoreVoiceQuality(a, lang));
    }

    if (lang === 'mr') {
      const hindiVoices = this.voices.filter((v) => {
        const vl = (v.lang || '').toLowerCase();
        const vn = (v.name || '').toLowerCase();
        return vl.startsWith('hi') || vn.includes('hindi') || vn.includes('हिन्दी');
      });
      if (hindiVoices.length > 0) return hindiVoices;
    }

    if (lang === 'as' || lang === 'or') {
      const bengaliOrHindiVoices = this.voices.filter((v) => {
        const vl = (v.lang || '').toLowerCase();
        const vn = (v.name || '').toLowerCase();
        return vl.startsWith('bn') || vn.includes('bengali') || vl.startsWith('hi') || vn.includes('hindi');
      });
      if (bengaliOrHindiVoices.length > 0) return bengaliOrHindiVoices;
    }

    if (lang === 'en') {
      const indianEng = this.voices.filter((v) => {
        const vLang = (v.lang || '').toLowerCase().replace(/_/g, '-');
        const vName = (v.name || '').toLowerCase();
        return (
          vLang === 'en-in' ||
          (vLang.startsWith('en') &&
            (vName.includes('india') ||
              vName.includes('ravi') ||
              vName.includes('prabhat') ||
              vName.includes('rishi')))
        );
      });
      if (indianEng.length > 0) return indianEng;
      const anyEng = this.voices.filter((v) => (v.lang || '').toLowerCase().startsWith('en'));
      if (anyEng.length > 0) return anyEng;
    }

    return [];
  }

  private resolveBestMaleVoice(lang: LanguageCode): {
    voice: SpeechSynthesisVoice | null;
    pitch: number;
    rate: number;
    displayName: string;
    bcp47Tag: string;
    isEnglishFallback: boolean;
  } {
    const candidates = this.getNativeVoicesForLanguage(lang);
    const bcp47Tag = LANGUAGE_BCP47_MAPPINGS[lang]?.[0] || 'en-IN';
    const calibratedPitch = Math.max(0.85, Math.min(1.15, this.currentPitch));
    const calibratedRate = Math.max(0.8, Math.min(1.25, this.currentRate));

    if (candidates.length > 0) {
      const best = candidates[0];
      const isNetworkOrGoogle =
        !best.localService || (best.name || '').toLowerCase().includes('google');

      return {
        voice: best,
        // Network/Google voices in Chrome fail if pitch is altered away from 1.0
        pitch: isNetworkOrGoogle ? 1.0 : calibratedPitch,
        rate: calibratedRate,
        displayName: best.name,
        bcp47Tag: best.lang || bcp47Tag,
        isEnglishFallback: false,
      };
    }

    if (lang === 'en') {
      const indianEngCandidates = this.getNativeVoicesForLanguage('en');
      const indianEngMale = indianEngCandidates.find((v) => this.isMaleVoice(v)) || indianEngCandidates[0];
      if (indianEngMale) {
        return {
          voice: indianEngMale,
          pitch: 1.0,
          rate: calibratedRate,
          displayName: indianEngMale.name,
          bcp47Tag: indianEngMale.lang || 'en-IN',
          isEnglishFallback: false,
        };
      }
    }

    // Check if there is at least a Hindi or English voice on the system for offline fallback
    const hindiCandidates = lang !== 'hi' ? this.getNativeVoicesForLanguage('hi') : [];
    if (hindiCandidates.length > 0 && ['gu', 'mr', 'pa', 'bn', 'or', 'as'].includes(lang)) {
      const hVoice = hindiCandidates[0];
      return {
        voice: hVoice,
        pitch: 1.0,
        rate: calibratedRate,
        displayName: hVoice.name,
        bcp47Tag: hVoice.lang || 'hi-IN',
        isEnglishFallback: false,
      };
    }

    const engCandidates = this.getNativeVoicesForLanguage('en');
    if (engCandidates.length > 0) {
      const eVoice = engCandidates[0];
      return {
        voice: eVoice,
        pitch: 1.0,
        rate: calibratedRate,
        displayName: `${eVoice.name} (Fallback)`,
        bcp47Tag: eVoice.lang || 'en-IN',
        isEnglishFallback: lang !== 'en',
      };
    }

    return {
      voice: null,
      pitch: 1.0,
      rate: calibratedRate,
      displayName: 'System Voice',
      bcp47Tag,
      isEnglishFallback: false,
    };
  }

  /**
   * Split text into clean, discrete sentence and action-step units without regex lookbehind issues.
   */
  private splitIntoSentences(text: string): SpeechQueueItem[] {
    if (!text) return [];

    // Safe cross-browser sentence splitting on dandas (।), periods (.), !, ?, or newlines
    const normalized = text
      .replace(/([।!?]+|\.(?=\s|$))/g, '$1|||SPLIT|||')
      .split('|||SPLIT|||')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const discreteSentences: string[] = [];
    let currentBuffer = '';

    for (const token of normalized) {
      if (!token) continue;
      if (currentBuffer.length === 0) {
        currentBuffer = token;
      } else if (currentBuffer.length + token.length < 135 && !/(?:[1-9]\.|कदम|उपाय|step|પહેલું|બીજું|ત્રીજું|पहला|दूसरा|तीसरा)/i.test(token)) {
        currentBuffer = `${currentBuffer} ${token}`;
      } else {
        discreteSentences.push(currentBuffer);
        currentBuffer = token;
      }
    }
    if (currentBuffer.length > 0) {
      discreteSentences.push(currentBuffer);
    }

    const finalSentences = discreteSentences.length > 0 ? discreteSentences : [text.trim()];
    let runningStep = -1;
    return finalSentences.map((sentText) => {
      const detected = detectStepIndexFromSnippet(sentText);
      if (detected !== -1) {
        runningStep = detected;
      } else if (
        /(?:helpline|call centre|સંપર્ક|હેલ્પલાઇન|कॉल सेंटर|सलाह|चेतावनी|warning|disclaimer|1800[- ]?180[- ]?1551)/i.test(
          sentText
        )
      ) {
        runningStep = -1;
      }
      return {
        text: sentText,
        stepIndex: runningStep,
      };
    });
  }

  /**
   * Play speech for a given text script and section using the hybrid Cloud Neural + Browser TTS engine
   */
  public speakScript(
    text: string,
    lang: LanguageCode,
    section: SpeechSectionId = 'all',
    rate?: number,
    englishFallbackText?: string
  ): void {
    if (!this.isSupported() || !text) return;

    this.currentSessionId++;
    const thisSession = this.currentSessionId;
    this.cleanupActiveMedia();

    this.isStopped = false;
    this.isActivelyPlaying = true;
    this.isActivelyPaused = false;
    this.activeLanguage = lang;
    this.currentSection = section;
    this.cloudTtsFailedInSession = false;

    if (typeof rate === 'number' && !Number.isNaN(rate)) {
      this.currentRate = Math.max(0.8, Math.min(1.25, rate));
    }

    // Play gentle Kisan radio start chime for immediate auditory confirmation
    playKisanChime();

    const cleaned = cleanTextForFarmerSpeech(text, lang);
    this.sentenceQueue = this.splitIntoSentences(cleaned);
    this.englishFallbackQueue = englishFallbackText
      ? this.splitIntoSentences(cleanTextForFarmerSpeech(englishFallbackText, 'en'))
      : [];
    this.currentQueueIndex = 0;

    // Choose preferred engine:
    // Use Cloud Neural TTS (/api/tts) whenever online so all 12 Indian languages speak with 100% fidelity
    // even on devices without local Indic TTS voices installed. Automatically falls back to Web Speech API if offline.
    const isOnline = typeof navigator !== 'undefined' ? navigator.onLine !== false : true;
    this.activeEngine = isOnline ? 'cloud' : 'browser';

    this.emitState();

    // Small 50ms delay after cleanup ensures clean audio channel initialization
    this.nextSentenceTimer = setTimeout(() => {
      if (this.currentSessionId === thisSession && !this.isStopped) {
        this.playNextInQueue(thisSession);
      }
    }, 50);
  }

  private cleanupActiveMedia(): void {
    this.stopKeepAlive();
    if (this.startWatchdogTimer) {
      clearTimeout(this.startWatchdogTimer);
      this.startWatchdogTimer = null;
    }
    if (this.nextSentenceTimer) {
      clearTimeout(this.nextSentenceTimer);
      this.nextSentenceTimer = null;
    }
    if (this.currentAudio) {
      try {
        this.currentAudio.onended = null;
        this.currentAudio.onerror = null;
        this.currentAudio.oncanplay = null;
        this.currentAudio.pause();
        this.currentAudio.removeAttribute('src');
        this.currentAudio.load();
      } catch {
        // Ignore audio cleanup errors
      }
      this.currentAudio = null;
    }
    if (this.currentUtterance) {
      this.currentUtterance.onstart = null;
      this.currentUtterance.onend = null;
      this.currentUtterance.onerror = null;
      this.currentUtterance = null;
    }
    if (typeof window !== 'undefined') {
      (window as any).__agriVisionUtterances = [];
      if ('speechSynthesis' in window) {
        try {
          if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
            window.speechSynthesis.cancel();
          }
        } catch {
          // Ignore cancel error
        }
      }
    }
  }

  private playNextInQueue(sessionToken?: number): void {
    if (!this.isSupported() || this.isStopped) return;
    const thisSession = sessionToken ?? this.currentSessionId;
    if (this.currentSessionId !== thisSession) return;

    if (this.currentQueueIndex >= this.sentenceQueue.length) {
      this.stop();
      return;
    }

    const currentItem = this.sentenceQueue[this.currentQueueIndex];
    if (!currentItem || !currentItem.text) {
      this.currentQueueIndex++;
      this.playNextInQueue(thisSession);
      return;
    }

    this.emitState();

    const isOnline = typeof navigator !== 'undefined' ? navigator.onLine !== false : true;
    if (isOnline && !this.cloudTtsFailedInSession && typeof Audio !== 'undefined') {
      this.playSentenceWithCloudTTS(currentItem, thisSession);
    } else {
      this.activeEngine = 'browser';
      this.playSentenceWithBrowserTTS(currentItem, thisSession);
    }
  }

  private playSentenceWithCloudTTS(currentItem: SpeechQueueItem, thisSession: number): void {
    if (this.isStopped || this.currentSessionId !== thisSession) return;

    try {
      const ttsUrl = `/api/tts?lang=${encodeURIComponent(this.activeLanguage)}&text=${encodeURIComponent(
        currentItem.text
      )}`;
      const audio = new Audio(ttsUrl);
      audio.preload = 'auto';
      audio.playbackRate = Math.max(0.75, Math.min(1.5, this.currentRate));
      this.currentAudio = audio;
      this.activeEngine = 'cloud';

      let hasStartedOrFailed = false;
      if (this.startWatchdogTimer) clearTimeout(this.startWatchdogTimer);
      this.startWatchdogTimer = setTimeout(() => {
        if (!hasStartedOrFailed && !this.isStopped && this.currentSessionId === thisSession) {
          hasStartedOrFailed = true;
          this.fallbackFromCloudToBrowser(currentItem, thisSession);
        }
      }, 6500);

      audio.onplay = () => {
        hasStartedOrFailed = true;
        if (this.startWatchdogTimer) {
          clearTimeout(this.startWatchdogTimer);
          this.startWatchdogTimer = null;
        }
        if (this.currentSessionId !== thisSession || this.isStopped) return;
        this.emitState();
      };

      audio.onended = () => {
        hasStartedOrFailed = true;
        if (this.startWatchdogTimer) {
          clearTimeout(this.startWatchdogTimer);
          this.startWatchdogTimer = null;
        }
        if (this.isStopped || this.currentSessionId !== thisSession) return;
        this.currentQueueIndex++;
        this.emitState();
        this.nextSentenceTimer = setTimeout(() => {
          if (!this.isStopped && this.currentSessionId === thisSession) {
            this.playNextInQueue(thisSession);
          }
        }, 40);
      };

      audio.onerror = () => {
        if (hasStartedOrFailed) return;
        hasStartedOrFailed = true;
        if (this.startWatchdogTimer) {
          clearTimeout(this.startWatchdogTimer);
          this.startWatchdogTimer = null;
        }
        if (this.isStopped || this.currentSessionId !== thisSession) return;
        this.fallbackFromCloudToBrowser(currentItem, thisSession);
      };

      const playPromise = audio.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
          if (hasStartedOrFailed) return;
          hasStartedOrFailed = true;
          if (this.startWatchdogTimer) {
            clearTimeout(this.startWatchdogTimer);
            this.startWatchdogTimer = null;
          }
          if (this.isStopped || this.currentSessionId !== thisSession) return;
          this.fallbackFromCloudToBrowser(currentItem, thisSession);
        });
      }
    } catch {
      this.fallbackFromCloudToBrowser(currentItem, thisSession);
    }
  }

  private fallbackFromCloudToBrowser(currentItem: SpeechQueueItem, thisSession: number): void {
    if (this.isStopped || this.currentSessionId !== thisSession) return;
    if (this.currentAudio) {
      try {
        this.currentAudio.onended = null;
        this.currentAudio.onerror = null;
        this.currentAudio.pause();
      } catch {
        // Ignore
      }
      this.currentAudio = null;
    }
    this.cloudTtsFailedInSession = true;
    this.activeEngine = 'browser';
    this.emitState();
    this.playSentenceWithBrowserTTS(currentItem, thisSession);
  }

  private playSentenceWithBrowserTTS(currentItem: SpeechQueueItem, thisSession: number): void {
    if (this.isStopped || this.currentSessionId !== thisSession) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      this.stop();
      return;
    }

    const resolved = this.resolveBestMaleVoice(this.activeLanguage);
    // If offline and the OS has no voice for the selected Indian language, use the English fallback text
    // so an English OS voice doesn't skip Indic Unicode characters silently
    const fallbackItem = this.englishFallbackQueue[this.currentQueueIndex];
    const spokenText =
      resolved.isEnglishFallback && fallbackItem && fallbackItem.text
        ? fallbackItem.text
        : currentItem.text;

    const utterance = new SpeechSynthesisUtterance(spokenText);
    this.currentUtterance = utterance;

    // Prevent Chromium V8 garbage collection of active SpeechSynthesisUtterance
    if ((window as any).__agriVisionUtterances) {
      (window as any).__agriVisionUtterances.push(utterance);
    }

    if (resolved.voice) {
      utterance.voice = resolved.voice;
      utterance.lang = resolved.bcp47Tag;
    } else {
      utterance.lang = resolved.bcp47Tag;
    }

    utterance.pitch = resolved.pitch;
    utterance.rate = resolved.rate;

    let started = false;
    if (this.startWatchdogTimer) clearTimeout(this.startWatchdogTimer);
    this.startWatchdogTimer = setTimeout(() => {
      if (!started && !this.isStopped && this.currentSessionId === thisSession) {
        // Browser speech synthesis hung without firing onstart; advance safely
        this.currentQueueIndex++;
        this.emitState();
        this.playNextInQueue(thisSession);
      }
    }, 4000);

    utterance.onstart = () => {
      started = true;
      if (this.startWatchdogTimer) {
        clearTimeout(this.startWatchdogTimer);
        this.startWatchdogTimer = null;
      }
      if (this.currentSessionId !== thisSession || this.isStopped) return;
      this.startKeepAlive();
      this.emitState();
    };

    utterance.onend = () => {
      started = true;
      if (this.startWatchdogTimer) {
        clearTimeout(this.startWatchdogTimer);
        this.startWatchdogTimer = null;
      }
      if (this.isStopped || this.currentSessionId !== thisSession) return;
      this.currentQueueIndex++;
      this.emitState();
      this.nextSentenceTimer = setTimeout(() => {
        if (!this.isStopped && this.currentSessionId === thisSession) {
          this.playNextInQueue(thisSession);
        }
      }, 40);
    };

    utterance.onerror = (e) => {
      started = true;
      if (this.startWatchdogTimer) {
        clearTimeout(this.startWatchdogTimer);
        this.startWatchdogTimer = null;
      }
      if (this.isStopped || this.currentSessionId !== thisSession) return;
      const errType = (e.error || '').toLowerCase();

      if (errType === 'canceled') {
        return;
      }

      if (!this.isStopped && this.currentSessionId === thisSession) {
        this.currentQueueIndex++;
        this.emitState();
        this.nextSentenceTimer = setTimeout(() => {
          if (!this.isStopped && this.currentSessionId === thisSession) {
            this.playNextInQueue(thisSession);
          }
        }, 60);
      }
    };

    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
      window.speechSynthesis.speak(utterance);
      this.emitState();
    } catch {
      this.stop();
    }
  }

  private startKeepAlive(): void {
    this.stopKeepAlive();
    this.keepAliveTimer = setInterval(() => {
      if (!this.isStopped && this.isActivelyPlaying) {
        this.emitState();
      }
    }, 5000);
  }

  private stopKeepAlive(): void {
    if (this.keepAliveTimer) {
      clearInterval(this.keepAliveTimer);
      this.keepAliveTimer = null;
    }
  }

  public pause(): void {
    if (!this.isSupported() || !this.isActivelyPlaying) return;
    this.isActivelyPaused = true;
    try {
      if (this.currentAudio) {
        this.currentAudio.pause();
      } else if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.pause();
      }
    } catch (e) {
      console.warn('Speech pause error:', e);
    }
    this.emitState();
  }

  public resume(): void {
    if (!this.isSupported() || !this.isActivelyPlaying) return;
    this.isActivelyPaused = false;
    try {
      if (this.currentAudio) {
        this.currentAudio.play().catch(() => {});
      } else if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.resume();
      }
    } catch (e) {
      console.warn('Speech resume error:', e);
    }
    this.emitState();
  }

  public stop(): void {
    this.currentSessionId++;
    this.isStopped = true;
    this.isActivelyPlaying = false;
    this.isActivelyPaused = false;
    this.cleanupActiveMedia();
    this.sentenceQueue = [];
    this.englishFallbackQueue = [];
    this.currentQueueIndex = 0;
    this.currentSection = null;
    this.emitState();
  }

  public setRate(rate: number): void {
    this.currentRate = Math.max(0.8, Math.min(1.25, rate));
    if (this.currentAudio) {
      try {
        this.currentAudio.playbackRate = this.currentRate;
      } catch {
        // Ignore
      }
    }
    this.emitState();
  }
}

export const speechService = new SpeechService();

/**
 * Format action steps with spoken numbering ("પહેલું, ... બીજું, ...") so farmers hear clear sequential instructions.
 */
export function formatSpokenSteps(sourceSteps: string[], lang: LanguageCode): string {
  const steps = sourceSteps
    .slice(0, 3)
    .map((s) => cleanTextForFarmerSpeech(s, lang))
    .filter(Boolean);
  if (steps.length === 0) return '';

  const stepLabels: Record<LanguageCode, string[]> = {
    gu: ['પહેલું,', 'બીજું,', 'ત્રીજું,'],
    hi: ['पहला,', 'दूसरा,', 'तीसरा,'],
    mr: ['पहिले,', 'दुसरे,', 'तिसरे,'],
    bn: ['প্রথম,', 'দ্বিতীয়,', 'তৃতীয়,'],
    te: ['మొదటిది,', 'రెండవది,', 'మూడవది,'],
    ta: ['முதலாவதாக,', 'இரண்டாவதாக,', 'மூன்றாவதாக,'],
    kn: ['ಮೊದಲನೆಯದು,', 'ಎರಡನೆಯದು,', 'ಮೂರನೆಯದು,'],
    ml: ['ഒന്നാമതായി,', 'രണ്ടാമതായി,', 'മൂന്നാമതായി,'],
    pa: ['ਪਹਿਲਾ,', 'ਦੂਜਾ,', 'ਤੀਜਾ,'],
    or: ['ପ୍ରଥମ,', 'ଦ୍ୱିତୀୟ,', 'ତୃତୀୟ,'],
    as: ['প্ৰথম,', 'দ্বিতীয়,', 'তৃতীয়,'],
    en: ['First,', 'Second,', 'Third,'],
  };

  const labels = stepLabels[lang] || stepLabels.en;
  const stopChar = ['hi', 'bn', 'pa', 'or', 'as'].includes(lang) ? '। ' : '. ';

  return steps.map((s, idx) => `${labels[idx] || `${idx + 1},`} ${s}`).join(stopChar) + stopChar;
}

/**
 * Farmer-Friendly Speech Script Generators across all 12 supported Indian Languages.
 * Phrased respectfully in the authentic male persona (Kisan Mitra / Agriculture Advisor)
 * with precise grammar, pure accents, and easy-to-understand guidance.
 */
export function buildFarmerFullSpeech(
  diagnosis: DiagnosisResult,
  language: LanguageCode,
  diseaseDetail: DiseaseDetail,
  selectedState: IndianState
): string {
  const verified = getLocalizedDiseaseDetail(diagnosis.className, language);

  const rawCropName = verified?.crop || getLocalizedCropName(diagnosis.crop, language);
  const cropName = cleanTextForFarmerSpeech(rawCropName, language);

  const rawDiseaseName =
    verified?.name ||
    verified?.disease ||
    getLocalizedDiseaseName(diagnosis.className, language) ||
    diseaseDetail.name ||
    diagnosis.disease;
  const cleanDiseaseName = cleanTextForFarmerSpeech(rawDiseaseName, language);

  const isHealthy = diagnosis.isHealthy || diagnosis.className.toLowerCase().includes('healthy');
  const confPercent = Math.round(diagnosis.confidence);

  const rawDesc = verified?.simpleDescription || diseaseDetail.simpleDescription || '';
  let cleanDesc = cleanTextForFarmerSpeech(rawDesc, language);
  if (cleanDesc) {
    const descParts = cleanDesc.split(/(?<=[।!?\n.])/g).map((s) => s.trim()).filter(Boolean);
    cleanDesc = descParts.slice(0, 2).join(' ');
  }

  const sourceSteps =
    verified?.recommendedNextSteps && verified.recommendedNextSteps.length > 0
      ? verified.recommendedNextSteps
      : diseaseDetail.recommendedNextSteps || [];

  const stepsSpoken = formatSpokenSteps(sourceSteps, language);
  const helplineNum = '1800, 180, 1551';

  // State-specific suitability advisory
  const suitability = diagnosis.cropSuitability;
  const isUnsuitable = suitability && suitability.status === 'UNSUITABLE';
  const unsuitableSpeechEn = isUnsuitable && suitability
    ? ` Special Advisory for ${selectedState.name}: ${suitability.primaryRecommendation} ${suitability.reason} Recommended substitutes to plant instead include: ${suitability.recommendedCropsToPlant.map((c) => c.cropName).join(', ')}.`
    : '';
  const unsuitableSpeechHi = isUnsuitable && suitability
    ? ` विशेष फसल चेतावनी: ${selectedState.name} के लिए यह फसल उपयुक्त नहीं है। ${suitability.primaryRecommendation} इसके स्थान पर आप ${suitability.recommendedCropsToPlant.map((c) => c.cropName).join(', ')} की बुवाई करें।`
    : '';

  switch (language) {
    case 'hi': {
      if (isHealthy) {
        return `फसल स्वास्थ्य परामर्श: आपकी ${cropName} की पत्ती की जाँच में फसल पूरी तरह स्वस्थ पाई गई है, विश्वास स्तर ${confPercent} प्रतिशत। पत्ती पर किसी भी रोग, फफूंद या कीट के लक्षण नहीं हैं।${unsuitableSpeechHi} खेत की नियमित निगरानी रखें तथा संतुलित खाद और पानी प्रबंधन जारी रखें। सरकारी कृषि सहायता के लिए किसान कॉल सेंटर नंबर 1800 180 1551 पर संपर्क करें।`;
      }
      return `फसल रोग निदान परामर्श: आपकी ${cropName} की पत्ती में ${cleanDiseaseName} रोग की पहचान हुई है, संभावना ${confPercent} प्रतिशत। ${cleanDesc ? cleanDesc + ' ' : ''}तुरंत प्रबंधन के उपाय: ${stepsSpoken}${unsuitableSpeechHi} ${selectedState.name} में सरकारी कृषि सहायता के लिए किसान कॉल सेंटर नंबर 1800 180 1551 पर कॉल करें।`;
    }

    case 'mr': {
      if (isHealthy) {
        return `पीक आरोग्य सल्ला: आपल्या ${cropName} पिकाचे पान पूर्णपणे निरोगी आहे, खात्री ${confPercent} टक्के. पानावर कोणताही रोग किंवा बुरशी आढळलेली नाही. पिकाची नियमित पाहणी करा आणि संतुलित खत व पाणी व्यवस्थापन ठेवा. मदतीसाठी किसान कॉल सेंटर 1800 180 1551 वर संपर्क साधा.`;
      }
      return `पीक रोग निदान सल्ला: आपल्या ${cropName} पिकाच्या पानावर ${cleanDiseaseName} रोग आढळला आहे, खात्री ${confPercent} टक्के. ${cleanDesc ? cleanDesc + ' ' : ''}तातडीचे नियंत्रण उपाय: ${stepsSpoken} ${selectedState.name} मधील मोफत कृषी सल्ल्यासाठी किसान कॉल सेंटर नंबर 1800 180 1551 वर संपर्क साधा.`;
    }

    case 'gu': {
      if (isHealthy) {
        return `પાક આરોગ્ય સલાહ: તમારા ${cropName} પાકનું પાન સંપૂર્ણ સ્વસ્થ છે, ચોકસાઈ ${confPercent} ટકા. પાન પર કોઈ રોગ, ફૂગ કે જીવાતના લક્ષણ નથી. નિયમિત દેખરેખ રાખો અને યોગ્ય ખાતર-પાણી આપો. સરકારી કૃષિ માર્ગદર્શન માટે કિસાન કોલ સેન્ટર 1800 180 1551 પર સંપર્ક કરો.`;
      }
      return `પાક રોગ નિદાન સલાહ: તમારા ${cropName} પાકમાં ${cleanDiseaseName} રોગ જણાયો છે, ચોકસાઈ ${confPercent} ટકા. ${cleanDesc ? cleanDesc + ' ' : ''}તાત્કાલિક નિયંત્રણના પગલાં: ${stepsSpoken} કૃષિ નિષ્ણાતની મફત સલાહ માટે કિસાન કોલ સેન્ટર નંબર 1800 180 1551 પર ફોન કરો.`;
    }

    case 'bn': {
      if (isHealthy) {
        return `ফসল স্বাস্থ্য পরামর্শ: আপনার ${cropName} ফসলের পাতা সম্পূর্ণ সুস্থ ও রোগমুক্ত, সঠিকতা ${confPercent} শতাংশ। কোনো রোগ বা ছত্রাকের আক্রমণ নেই। নিয়মিত পর্যবেক্ষণ করুন এবং পরিমিত সেচ ও সার দিন। কৃষি সহায়তার জন্য কিষাণ কল সেন্টার 1800 180 1551 নম্বরে যোগাযোগ করুন।`;
      }
      return `ফসল রোগ নির্ণয় পরামর্শ: আপনার ${cropName} পাতার পরীক্ষায় ${cleanDiseaseName} রোগ শনাক্ত হয়েছে, সম্ভাবনা ${confPercent} শতাংশ। ${cleanDesc ? cleanDesc + ' ' : ''}জরুরি প্রতিকারমূলক পদক্ষেপ: ${stepsSpoken} বিনামূল্যে কৃষি পরামর্শের জন্য কিষাণ কল সেন্টার 1800 180 1551 নম্বরে যোগাযোগ করুন।`;
    }

    case 'te': {
      if (isHealthy) {
        return `పంట ఆరోగ్య సలహా: మీ ${cropName} పంట ఆకు పూర్తిగా ఆరోగ్యంగా ఉంది, ఖచ్చితత్వం ${confPercent} శాతం. ఎలాంటి తెగులు లేదా పురుగుల లక్షణాలు లేవు. సమతుల్య నీటిపారుదల మరియు పోషక నిర్వహణ కొనసాగించండి. ఉచిత సలహా కోసం కిసాన్ కాల్ సెంటర్ 1800 180 1551 కు కాల్ చేయండి.`;
      }
      return `పంట తెగులు నిర్ధారణ సలహా: మీ ${cropName} పంట ఆకులో ${cleanDiseaseName} తెగులు గుర్తించబడింది, ఖచ్చితత్వం ${confPercent} శాతం. ${cleanDesc ? cleanDesc + ' ' : ''}వెంటనే చేపట్టవలసిన నివారణ చర్యలు: ${stepsSpoken} ఉచిత వ్యవసాయ సలహా కోసం కిసాన్ కాల్ సెంటర్ 1800 180 1551 కు కాల్ చేయండి.`;
    }

    case 'ta': {
      if (isHealthy) {
        return `பயிர் நல ஆலோசனை: உங்கள் ${cropName} பயிர் இலை முற்றிலும் ஆரோக்கியமாக உள்ளது, துல்லியம் ${confPercent} சதவீதம். எந்த நோயும் தாக்கவில்லை. சீரான நீர்ப்பாசனம் மற்றும் உர நிர்வாகத்தைத் தொடரவும். இலவச வேளாண் உதவிக்கு கிசான் கால் சென்டர் 1800 180 1551 எண்ணை அழைக்கவும்.`;
      }
      return `பயிர் நோய் கண்டறிதல் ஆலோசனை: உங்கள் ${cropName} பயிரில் ${cleanDiseaseName} நோய் கண்டறியப்பட்டுள்ளது, துல்லியம் ${confPercent} சதவீதம். ${cleanDesc ? cleanDesc + ' ' : ''}உடனடி மேலாண்மை நடவடிக்கைகள்: ${stepsSpoken} இலவச ஆலோசனைக்கு கிசான் கால் சென்டர் 1800 180 1551 எண்ணைத் தொடர்பு கொள்ளவும்.`;
    }

    case 'kn': {
      if (isHealthy) {
        return `ಬೆಳೆ ಆರೋಗ್ಯ ಸಲಹೆ: ನಿಮ್ಮ ${cropName} ಬೆಳೆಯ ಎಲೆ ಸಂಪೂರ್ಣವಾಗಿ ಆರೋಗ್ಯಕರವಾಗಿದೆ, ನಿಖರತೆ ${confPercent} ಶೇಕಡಾ. ಯಾವುದೇ ರೋಗದ ಲಕ್ಷಣಗಳಿಲ್ಲ. ನಿಯಮಿತ ನೀರಾವರಿ ಮತ್ತು ಪೋಷಕಾಂಶ ನಿರ್ವಹಣೆ ಮುಂದುವರಿಸಿ. ಉಚಿತ ಕೃಷಿ ಸಲಹೆಗಾಗಿ ಕಿಸಾನ್ ಕಾಲ್ ಸೆಂಟರ್ 1800 180 1551 ಗೆ ಕರೆ ಮಾಡಿ.`;
      }
      return `ಬೆಳೆ ರೋಗ ಪತ್ತೆ ಸಲಹೆ: ನಿಮ್ಮ ${cropName} ಬೆಳೆಯಲ್ಲಿ ${cleanDiseaseName} ರೋಗ ಪತ್ತೆಯಾಗಿದೆ, ನಿಖರತೆ ${confPercent} ಶೇಕಡಾ. ${cleanDesc ? cleanDesc + ' ' : ''}ತಕ್ಷಣದ ರಕ್ಷಣಾ ಕ್ರಮಗಳು: ${stepsSpoken} ಕೃಷಿ ಇಲಾಖೆಯ ಉಚಿತ ನೆರವಿಗಾಗಿ ಕಿಸಾನ್ ಕಾಲ್ ಸೆಂಟರ್ 1800 180 1551 ಗೆ ಕರೆ ಮಾಡಿ.`;
    }

    case 'ml': {
      if (isHealthy) {
        return `വിള ആരോഗ്യ ഉപദേശം: നിങ്ങളുടെ ${cropName} വിളയുടെ ഇല പൂർണ്ണമായും ആരോഗ്യകരമാണ്, കൃത്യത ${confPercent} ശതമാനം. രോഗലക്ഷണങ്ങളോ കീടബാധയോ കണ്ടെത്തിയിട്ടില്ല. ക്രമമായ പരിചരണവും സമീകൃത വളപ്രയോഗവും തുടരുക. സൗജന്യ ഉപദേശത്തിന് കിസാൻ കോൾ സെന്റർ 1800 180 1551 നമ്പറിൽ വിളിക്കുക.`;
      }
      return `വിള രോഗനിർണ്ണയ ഉപദേശം: നിങ്ങളുടെ ${cropName} വിളയിൽ ${cleanDiseaseName} രോഗം സ്ഥിരീകരിച്ചു, കൃത്യത ${confPercent} ശതമാനം. ${cleanDesc ? cleanDesc + ' ' : ''}ഉടൻ സ്വീകരിക്കേണ്ട പ്രതിരോധ നടപടികൾ: ${stepsSpoken} സൗജന്യ കാർഷിക സഹായത്തിന് കിസാൻ കോൾ സെന്റർ 1800 180 1551 നമ്പറിൽ ബന്ധപ്പെടുക.`;
    }

    case 'pa': {
      if (isHealthy) {
        return `ਫ਼ਸਲ ਸਿਹਤ ਸਲਾਹ: ਤੁਹਾਡੀ ${cropName} ਫ਼ਸਲ ਦਾ ਪੱਤਾ ਬਿਲਕੁਲ ਤੰਦਰੁਸਤ ਹੈ, ਸੰਭਾਵਨਾ ${confPercent} ਫ਼ੀਸਦੀ। ਕਿਸੇ ਬਿਮਾਰੀ ਜਾਂ ਕੀੜੇ ਦੇ ਲੱਛਣ ਨਹੀਂ ਮਿਲੇ ਹਨ। ਸੰਤੁਲਿਤ ਖਾਦ-ਪਾਣੀ ਅਤੇ ਦੇਖਭਾਲ ਜਾਰੀ ਰੱਖੋ। ਸਰਕਾਰੀ ਮਦਦ ਲਈ ਕਿਸਾਨ ਕਾਲ ਸੈਂਟਰ 1800 180 1551 'ਤੇ ਕਾਲ ਕਰੋ।`;
      }
      return `ਫ਼ਸਲ ਬਿਮਾਰੀ ਜਾਂਚ ਸਲਾਹ: ਤੁਹਾਡੀ ${cropName} ਫ਼ਸਲ ਵਿੱਚ ${cleanDiseaseName} ਬਿਮਾਰੀ ਪਾਈ ਗਈ ਹੈ, ਸੰਭਾਵਨਾ ${confPercent} ਫ਼ੀਸਦੀ। ${cleanDesc ? cleanDesc + ' ' : ''}ਤੁਰੰਤ ਰੋਕਥਾਮ ਦੇ ਉਪਾਅ: ${stepsSpoken} ਮੁਫ਼ਤ ਖੇਤੀ ਸਲਾਹ ਲਈ ਕਿਸਾਨ ਕਾਲ ਸੈਂਟਰ 1800 180 1551 'ਤੇ ਸੰਪਰਕ ਕਰੋ।`;
    }

    case 'or': {
      if (isHealthy) {
        return `ଫସଲ ସ୍ୱାସ୍ଥ୍ୟ ପରାମର୍ଶ: ଆପଣଙ୍କ ${cropName} ଫସଲର ପତ୍ର ସମ୍ପୂର୍ଣ୍ଣ ସୁସ୍ଥ, ସମ୍ଭାବନା ${confPercent} ପ୍ରତିଶତ। କୌଣସି ରୋଗ କିମ୍ବା କୀଟ ଲକ୍ଷଣ ନାହିଁ। ନିୟମିତ ଯତ୍ନ ଏବଂ ସନ୍ତୁଳିତ ପୋଷକ ତତ୍ତ୍ୱ ପ୍ରୟୋଗ ଜାରି ରଖନ୍ତୁ। କୃଷି ସହାୟତା ପାଇଁ କିଷାନ କଲ୍ ସେଣ୍ଟର 1800 180 1551 ରେ ଯୋଗାଯୋଗ କରନ୍ତୁ।`;
      }
      return `ଫସଲ ରୋଗ ଚିହ୍ନଟ ପରାମର୍ଶ: ଆପଣଙ୍କ ${cropName} ଫସଲରେ ${cleanDiseaseName} ରୋଗ ଚିହ୍ନଟ ହୋଇଛି, ସମ୍ଭାବନା ${confPercent} ପ୍ରତିଶତ। ${cleanDesc ? cleanDesc + ' ' : ''}ତୁରନ୍ତ ନିୟନ୍ତ୍ରଣ ପଦକ୍ଷେପ: ${stepsSpoken} ମାଗଣା ପରାମର୍ଶ ପାଇଁ କିଷାନ କଲ୍ ସେଣ୍ଟର 1800 180 1551 ରେ କଲ୍ କରନ୍ତୁ।`;
    }

    case 'as': {
      if (isHealthy) {
        return `শস্য স্বাস্থ্য পৰামৰ্শ: আপোনাৰ ${cropName} খেতিৰ পাত সম্পূৰ্ণ সুস্থ আৰু নিৰোগী, সঠিকতা ${confPercent} শতাংশ। কোনো ৰোগ বা পোকৰ লক্ষণ নাই। নিয়মীয়া পৰিচৰ্যা আৰু সুষম সাৰ প্ৰয়োগ অব্যাহত ৰাখক। সহায়ৰ বাবে কিষাণ কল চেণ্টাৰ 1800 180 1551 নম্বৰত যোগাযোগ কৰক।`;
      }
      return `শস্য ৰোগ চিনাক্তকৰণ পৰামৰ্শ: আপোনাৰ ${cropName} খেতিত ${cleanDiseaseName} ৰোগ চিনাক্ত কৰা হৈছে, সঠিকতা ${confPercent} শতাংশ। ${cleanDesc ? cleanDesc + ' ' : ''}তৎকালীন প্ৰতিকাৰমূলক পদক্ষেপ: ${stepsSpoken} বিনামূলীয়া কৃষি পৰামৰ্শৰ বাবে কিষাণ কল চেণ্টাৰ নম্বৰ 1800 180 1551 নম্বৰত কল কৰক।`;
    }

    case 'en':
    default: {
      if (isHealthy) {
        return `Hello farmer friend. Your ${cropName} leaf analysis shows healthy foliage with ${confPercent} percent confidence. No pathogen lesions, fungal decay, or pest damage were found.${unsuitableSpeechEn} Continue regular field scouting, balanced irrigation, and recommended crop nutrition. For free agricultural support in ${selectedState.name}, call the toll-free Kisan Call Center at 1800 180 1551.`;
      }
      return `Hello farmer friend. Your ${cropName} leaf analysis indicates ${cleanDiseaseName} with ${confPercent} percent diagnostic confidence. ${cleanDesc ? cleanDesc + ' ' : ''}Recommended management actions: ${stepsSpoken}${unsuitableSpeechEn} For verified agricultural guidance in ${selectedState.name}, call the toll-free Kisan Call Center at 1800 180 1551.`;
    }
  }
}

export function buildSectionSpeech(
  section: SpeechSectionId,
  diagnosis: DiagnosisResult,
  language: LanguageCode,
  diseaseDetail: DiseaseDetail,
  selectedState: IndianState
): string {
  const verified = getLocalizedDiseaseDetail(diagnosis.className, language);

  const rawCropName = verified?.crop || getLocalizedCropName(diagnosis.crop, language);
  const cropName = cleanTextForFarmerSpeech(rawCropName, language);

  const rawDiseaseName =
    verified?.name ||
    verified?.disease ||
    getLocalizedDiseaseName(diagnosis.className, language) ||
    diseaseDetail.name ||
    diagnosis.disease;
  const cleanDiseaseName = cleanTextForFarmerSpeech(rawDiseaseName, language);

  const isHealthy = diagnosis.isHealthy || diagnosis.className.toLowerCase().includes('healthy');
  const confPercent = Math.round(diagnosis.confidence);

  const rawDesc = verified?.simpleDescription || diseaseDetail.simpleDescription || '';
  const descriptionText = cleanTextForFarmerSpeech(rawDesc, language);

  const sourceSymptoms =
    verified?.visibleSymptoms && verified.visibleSymptoms.length > 0
      ? verified.visibleSymptoms
      : diseaseDetail.visibleSymptoms || [];

  const cleanSymptoms = sourceSymptoms
    .slice(0, 3)
    .map((s) => cleanTextForFarmerSpeech(s, language))
    .filter(Boolean);

  const sourceSteps =
    verified?.recommendedNextSteps && verified.recommendedNextSteps.length > 0
      ? verified.recommendedNextSteps
      : diseaseDetail.recommendedNextSteps || [];

  const stepsSpoken = formatSpokenSteps(sourceSteps, language);

  if (section === 'all') {
    return buildFarmerFullSpeech(diagnosis, language, diseaseDetail, selectedState);
  }

  if (section === 'summary') {
    switch (language) {
      case 'hi':
        return isHealthy
          ? `फसल: ${cropName}। परिणाम: बिल्कुल स्वस्थ पत्ती। कोई रोग नहीं है।`
          : `फसल: ${cropName}। पाया गया रोग: ${cleanDiseaseName}। संभावना: ${confPercent} प्रतिशत। ${descriptionText}`;
      case 'mr':
        return isHealthy
          ? `पीक: ${cropName}. निकाल: पूर्णपणे निरोगी पान. कोणताही रोग नाही.`
          : `पीक: ${cropName}. आढळलेला रोग: ${cleanDiseaseName}. खात्री: ${confPercent} टक्के. ${descriptionText}`;
      case 'gu':
        return isHealthy
          ? `પાક: ${cropName}. પરિણામ: સંપૂર્ણ તંદુરસ્ત પાન. કોઈ રોગ નથી.`
          : `પાક: ${cropName}. જોવા મળેલ રોગ: ${cleanDiseaseName}. ચોકસાઈ: ${confPercent} ટકા. ${descriptionText}`;
      case 'bn':
        return isHealthy
          ? `ফসল: ${cropName}। ফলাফল: সম্পূর্ণ সুস্থ পাতা। কোনো রোগ নেই।`
          : `ফসল: ${cropName}। সনাক্ত রোগ: ${cleanDiseaseName}। সঠিকতা: ${confPercent} শতাংশ। ${descriptionText}`;
      case 'te':
        return isHealthy
          ? `పంట: ${cropName}. ఫలితం: పూర్తిగా ఆరోగ్యకరమైన ఆకు. వ్యాధి లేదు.`
          : `పంట: ${cropName}. గుర్తించిన వ్యాధి: ${cleanDiseaseName}. ఖచ్చితత్వం: ${confPercent} శాతం. ${descriptionText}`;
      case 'ta':
        return isHealthy
          ? `பயிர்: ${cropName}. முடிவு: முற்றிலும் ஆரோக்கியமான இலை. நோய் இல்லை.`
          : `பயிர்: ${cropName}. கண்டறியப்பட்ட நோய்: ${cleanDiseaseName}. துல்லியம்: ${confPercent} சதவீதம். ${descriptionText}`;
      case 'kn':
        return isHealthy
          ? `ಬೆಳೆ: ${cropName}. ಫಲಿತಾಂಶ: ಸಂಪೂರ್ಣ ಆರೋಗ್ಯಕರ ಎಲೆ. ಯಾವುದೇ ರೋಗವಿಲ್ಲ.`
          : `ಬೆಳೆ: ${cropName}. ಪತ್ತೆಯಾದ ರೋಗ: ${cleanDiseaseName}. ನಿಖರತೆ: ${confPercent} ಶೇಕಡಾ. ${descriptionText}`;
      case 'ml':
        return isHealthy
          ? `വിള: ${cropName}. ഫലം: പൂർണ്ണമായും ആരോഗ്യകരമായ ഇല. രോഗമില്ല.`
          : `വിള: ${cropName}. കണ്ടെത്തിയ രോഗം: ${cleanDiseaseName}. കൃത്യത: ${confPercent} ശതമാനം. ${descriptionText}`;
      case 'pa':
        return isHealthy
          ? `ਫ਼ਸਲ: ${cropName}। ਨਤੀਜਾ: ਬਿਲਕੁਲ ਤੰਦਰੁਸਤ ਪੱਤਾ। ਕੋਈ ਬਿਮਾਰੀ ਨਹੀਂ ਹੈ।`
          : `ਫ਼ਸਲ: ${cropName}। ਪਾਈ ਗਈ ਬਿਮਾਰੀ: ${cleanDiseaseName}। ਸੰਭਾਵਨਾ: ${confPercent} ਫ਼ੀਸਦੀ। ${descriptionText}`;
      case 'or':
        return isHealthy
          ? `ଫସଲ: ${cropName}। ଫଳାଫଳ: ସମ୍ପୂର୍ଣ୍ଣ ସୁସ୍ଥ ପତ୍ର। କୌଣସି ରୋଗ ନାହିଁ।`
          : `ଫସଲ: ${cropName}। ଚିହ୍ନଟ ରୋଗ: ${cleanDiseaseName}। ସମ୍ଭାବନା: ${confPercent} ପ୍ରତିଶତ। ${descriptionText}`;
      case 'as':
        return isHealthy
          ? `শস্য: ${cropName}। ফলাফল: সম্পূৰ্ণ সুস্থ পাত। কোনো ৰোগ নাই।`
          : `শস্য: ${cropName}। চিনাক্ত ৰোগ: ${cleanDiseaseName}। সঠিকতা: ${confPercent} শতাংশ। ${descriptionText}`;
      case 'en':
      default:
        return isHealthy
          ? `Crop: ${cropName}. Status: Healthy foliage. No disease detected.`
          : `Crop: ${cropName}. Identified condition: ${cleanDiseaseName}, with ${confPercent} percent certainty. ${descriptionText}`;
    }
  }

  if (section === 'actions') {
    switch (language) {
      case 'hi':
        return isHealthy
          ? 'नियमित रूप से खेत का निरीक्षण करें और संतुलित सिंचाई व खाद दें।'
          : `किसान भाई तुरंत ये कदम उठाएं: ${stepsSpoken}`;
      case 'mr':
        return isHealthy
          ? 'पिकाची नियमित पाहणी करा आणि योग्य पाणी व खत व्यवस्थापन ठेवा.'
          : `शेतकऱ्यांसाठी तातडीचे उपाय: ${stepsSpoken}`;
      case 'gu':
        return isHealthy
          ? 'ખેતરની નિયમિત દેખરેખ રાખો અને સંતુલિત ખાતર-પાણી આપો.'
          : `ખેડૂતો માટે તાત્કાલિક પગલાં: ${stepsSpoken}`;
      case 'bn':
        return isHealthy
          ? 'নিয়মিত জমি পর্যবেক্ষণ করুন এবং পরিমিত সেচ ও সার দিন।'
          : `কৃষকদের জন্য জরুরি পদক্ষেপ: ${stepsSpoken}`;
      case 'te':
        return isHealthy
          ? 'పంటను క్రమం తప్పకుండా పర్యవేక్షించండి, సమతుల్య పోషకాలు అందించండి.'
          : `రైతులు వెంటనే చేయవలసిన పనులు: ${stepsSpoken}`;
      case 'ta':
        return isHealthy
          ? 'வயலைத் தொடர்ந்து கண்காணிக்கவும், சீரான நீர்ப்பாசனம் மற்றும் உரம் இடவும்.'
          : `விவசாயிகள் உடனே செய்ய வேண்டியவை: ${stepsSpoken}`;
      case 'kn':
        return isHealthy
          ? 'ತೋಟವನ್ನು ನಿರಂತರವಾಗಿ ಪರಿಶೀಲಿಸಿ, ಸಮತೋಲಿತ ಗೊಬ್ಬರ ನೀಡಿ.'
          : `ರೈತರು ತಕ್ಷಣ ಕೈಗೊಳ್ಳಬೇಕಾದ ಕ್ರಮಗಳು: ${stepsSpoken}`;
      case 'ml':
        return isHealthy
          ? 'വിളകൾ പതിവായി നിരീക്ഷിക്കുകയും കൃത്യമായ വളപ്രയോഗം നടത്തുകയും ചെയ്യുക.'
          : `കർഷകർ ഉടൻ ചെയ്യേണ്ട കാര്യങ്ങൾ: ${stepsSpoken}`;
      case 'pa':
        return isHealthy
          ? 'ਫ਼ਸਲ ਦੀ ਲਗਾਤਾਰ ਦੇਖਭਾਲ ਕਰੋ ਅਤੇ ਸੰਤੁਲਿਤ ਖਾਦ-ਪਾਣੀ ਦਿਓ।'
          : `ਕਿਸਾਨਾਂ ਲਈ ਜ਼ਰੂਰੀ ਕਦਮ: ${stepsSpoken}`;
      case 'or':
        return isHealthy
          ? 'ନିୟମିତ ଭାବେ କ୍ଷେତର ଯାଞ୍ଚ କରନ୍ତୁ ଏବଂ ସନ୍ତୁଳିତ ସାର ଓ ଜଳ ପ୍ରୟୋଗ କରନ୍ତୁ।'
          : `କୃଷକମାନେ ତୁରନ୍ତ ଏହି ପଦକ୍ଷେପ ନିଅନ୍ତୁ: ${stepsSpoken}`;
      case 'as':
        return isHealthy
          ? 'নিয়মীয়াকৈ পথাৰ নিৰীক্ষণ কৰক আৰু সুষম সাৰ-পানী ব্যৱহাৰ কৰক।'
          : `কৃষকসকলে তৎক্ষণাৎ এই পদক্ষেপসমূহ লওক: ${stepsSpoken}`;
      case 'en':
      default:
        return isHealthy
          ? 'Continue standard agronomic scouting and balanced nutrition.'
          : `Recommended actions for farmers: ${stepsSpoken}`;
    }
  }

  if (section === 'symptoms') {
    const symptoms = cleanSymptoms;
    switch (language) {
      case 'hi':
        return isHealthy
          ? 'पत्ती पर कोई धब्बा, सिकुड़न या फफूंद नहीं है।'
          : `खेत में दिखने वाले मुख्य लक्षण: ${symptoms.join('। ')}।`;
      case 'mr':
        return isHealthy
          ? 'पानावर कोणताही डाग किंवा बुरशी आढळलेली नाही.'
          : `पानावरील मुख्य लक्षणे: ${symptoms.join('. ')}.`;
      case 'gu':
        return isHealthy
          ? 'પાન પર કોઈ ડાઘ કે ફૂગના લક્ષણ નથી.'
          : `પાન પર દેખાતા મુખ્ય લક્ષણો: ${symptoms.join('. ')}.`;
      case 'bn':
        return isHealthy
          ? 'পাতায় কোনো দাগ বা ছত্রাকের লক্ষণ নেই।'
          : `পাতার প্রধান লক্ষণসমূহ: ${symptoms.join('। ')}।`;
      case 'te':
        return isHealthy
          ? 'ఆకుపై ఎలాంటి మచ్చలు లేదా తెగులు లేవు.'
          : `ఆకుపై కనిపించే ముఖ్య లక్షణాలు: ${symptoms.join('. ')}.`;
      case 'ta':
        return isHealthy
          ? 'இலையில் புள்ளிகளோ அல்லது பூஞ்சைக் கறைகளோ இல்லை.'
          : `இலையில் தென்படும் முக்கிய அறிகுறிகள்: ${symptoms.join('. ')}.`;
      case 'kn':
        return isHealthy
          ? 'ಎಲೆಯ ಮೇಲೆ ಯಾವುದೇ ಕಲೆಗಳು ಅಥವಾ ಶಿಲೀಂಧ್ರವಿಲ್ಲ.'
          : `ಎಲೆಯ ಮೇಲೆ ಕಂಡುಬರುವ ಮುಖ್ಯ ಲಕ್ಷಣಗಳು: ${symptoms.join('. ')}.`;
      case 'ml':
        return isHealthy
          ? 'ഇലകളിൽ പാടുകളോ കുമിൾബാധയോ ഇല്ല.'
          : `ഇലകളിൽ കാണുന്ന പ്രധാന ലക്ഷണങ്ങൾ: ${symptoms.join('. ')}.`;
      case 'pa':
        return isHealthy
          ? 'ਪੱਤੇ ਉੱਤੇ ਕੋਈ ਧੱਬਾ ਜਾਂ ਉੱਲੀ ਨਹੀਂ ਹੈ।'
          : `ਪੱਤੇ ਉੱਤੇ ਦਿਸਣ ਵਾਲੇ ਮੁੱਖ ਲੱਛਣ: ${symptoms.join('। ')}।`;
      case 'or':
        return isHealthy
          ? 'ପତ୍ରରେ କୌଣସି ଦାଗ କିମ୍ବା କବକ ଲକ୍ଷଣ ନାହିଁ।'
          : `ପତ୍ରରେ ଦେଖାଯାଉଥିବା ମୁଖ୍ୟ ଲକ୍ଷଣ: ${symptoms.join('। ')}।`;
      case 'as':
        return isHealthy
          ? 'পাতত কোনো দাগ বা ভেঁকুৰৰ লক্ষণ নাই।'
          : `পাতত দেখা দিয়া প্ৰধান লক্ষণসমূহ: ${symptoms.join('। ')}।`;
      case 'en':
      default:
        return isHealthy
          ? 'Foliage shows uniform healthy color with no lesions or spots.'
          : `Visible symptoms in the field: ${symptoms.join('. ')}.`;
    }
  }

  if (section === 'helpline') {
    switch (language) {
      case 'hi':
        return `कृषि विशेषज्ञ से मुफ्त बात करने के लिए किसान कॉल सेंटर नंबर 1800, 180, 1551 पर कॉल करें। स्थानीय राज्य हेल्पलाइन: ${selectedState.kisanHelpline}।`;
      case 'mr':
        return `कृषी तज्ञांशी बोलण्यासाठी किसान कॉल सेंटर नंबर 1800, 180, 1551 वर कॉल करा. स्थानिक राज्य हेल्पलाइन: ${selectedState.kisanHelpline}.`;
      case 'gu':
        return `કૃષિ નિષ્ણાત સાથે વાત કરવા કિસાન કોલ સેન્ટર નંબર 1800, 180, 1551 પર કૉલ કરો. રાજ્ય હેલ્પલાઇન: ${selectedState.kisanHelpline}.`;
      case 'bn':
        return `কৃষি বিশেষজ্ঞের সাথে কথা বলতে কিষাণ কল সেন্টার 1800, 180, 1551 নম্বরে কল করুন। স্থানীয় রাজ্য হেল্পলাইন: ${selectedState.kisanHelpline}।`;
      case 'te':
        return `వ్యవసాయ నిపుణులతో మాట్లాడటానికి కిసాన్ కాల్ సెంటర్ 1800, 180, 1551 కు కాల్ చేయండి. రాష్ట్ర హెల్ప్‌లైన్: ${selectedState.kisanHelpline}.`;
      case 'ta':
        return `விவசாய வல்லுநர்களுடன் பேச கிசான் கால் சென்டர் 1800, 180, 1551 எண்ணை அழைக்கவும். மாநில உதவி எண்: ${selectedState.kisanHelpline}.`;
      case 'kn':
        return `ಕೃಷಿ ತಜ್ಞರೊಂದಿಗೆ ಮಾತನಾಡಲು ಕಿಸಾನ್ ಕಾಲ್ ಸೆಂಟರ್ 1800, 180, 1551 ಗೆ ಕರೆ ಮಾಡಿ. ರಾಜ್ಯ ಸಹಾಯವಾಣಿ: ${selectedState.kisanHelpline}.`;
      case 'ml':
        return `കാർഷിക വിദഗ്ദ്ധരുമായി സംസാരിക്കാൻ കിസാൻ കോൾ സെന്റർ 1800, 180, 1551 നമ്പറിൽ വിളിക്കുക. സംസ്ഥാന ഹെൽപ്പ് ലൈൻ: ${selectedState.kisanHelpline}.`;
      case 'pa':
        return `ਖੇਤੀ ਮਾਹਰਾਂ ਨਾਲ ਗੱਲ ਕਰਨ ਲਈ ਕਿਸਾਨ ਕਾਲ ਸੈਂਟਰ 1800, 180, 1551 'ਤੇ ਕਾਲ ਕਰੋ। ਸੂਬਾ ਹੈਲਪਲਾਈਨ: ${selectedState.kisanHelpline}।`;
      case 'or':
        return `କୃଷି ବିଶେଷଜ୍ଞଙ୍କ ସହ କଥା ହେବା ପାଇଁ କିଷାନ କଲ୍ ସେଣ୍ଟର 1800, 180, 1551 ରେ କଲ୍ କରନ୍ତୁ। ରାଜ୍ୟ ହେଲ୍ପଲାଇନ୍: ${selectedState.kisanHelpline}।`;
      case 'as':
        return `কৃষি বিশেষজ্ঞৰ সৈতে কথা পাতিবলৈ কিষাণ কল চেণ্টাৰ 1800, 180, 1551 নম্বৰত কল কৰক। ৰাজ্যিক হেল্পলাইন: ${selectedState.kisanHelpline}।`;
      case 'en':
      default:
        return `For government agricultural extension assistance, call the toll-free Kisan Call Center at 1 8 0 0, 1 8 0, 1 5 5 1, or contact the ${selectedState.name} helpline at ${selectedState.kisanHelpline}.`;
    }
  }

  return buildFarmerFullSpeech(diagnosis, language, diseaseDetail, selectedState);
}
