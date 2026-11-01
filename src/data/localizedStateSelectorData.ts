import { LanguageCode } from '../types';

export interface StateSelectorLocaleData {
  allRegions: string;
  states: string;
  unionTerritories: string;
  stateBadge: string;
  utBadge: string;
  noMatch: string;
}

export const STATE_SELECTOR_LOCALES: Record<LanguageCode, StateSelectorLocaleData> = {
  en: {
    allRegions: 'All Regions (36)',
    states: 'States (28)',
    unionTerritories: 'Union Territories (8)',
    stateBadge: 'State',
    utBadge: 'UT',
    noMatch: 'No state or Union Territory matches',
  },
  hi: {
    allRegions: 'सभी क्षेत्र (36)',
    states: 'राज्य (28)',
    unionTerritories: 'केंद्र शासित प्रदेश (8)',
    stateBadge: 'राज्य',
    utBadge: 'यूटी',
    noMatch: 'कोई राज्य या केंद्र शासित प्रदेश नहीं मिला',
  },
  gu: {
    allRegions: 'તમામ પ્રદેશો (36)',
    states: 'રાજ્યો (28)',
    unionTerritories: 'કેન્દ્રશાસિત પ્રદેશો (8)',
    stateBadge: 'રાજ્ય',
    utBadge: 'UT',
    noMatch: 'કોઈ રાજ્ય કે કેન્દ્રશાસિત પ્રદેશ મળ્યો નથી',
  },
  mr: {
    allRegions: 'सर्व प्रदेश (36)',
    states: 'राज्ये (28)',
    unionTerritories: 'केंद्रशासित प्रदेश (8)',
    stateBadge: 'राज्य',
    utBadge: 'केंद्रशासित',
    noMatch: 'कोणतेही राज्य किंवा केंद्रशासित प्रदेश सापडला नाही',
  },
  bn: {
    allRegions: 'সকল অঞ্চল (৩৬)',
    states: 'রাজ্যসমূহ (২৮)',
    unionTerritories: 'কেন্দ্রশাসিত অঞ্চল (৮)',
    stateBadge: 'রাজ্য',
    utBadge: 'কে.অ.',
    noMatch: 'কোনো রাজ্য বা কেন্দ্রশাসিত অঞ্চল পাওয়া যায়নি',
  },
  te: {
    allRegions: 'అన్ని ప్రాంతాలు (36)',
    states: 'రాష్ట్రాలు (28)',
    unionTerritories: 'కేంద్రపాలిత ప్రాంతాలు (8)',
    stateBadge: 'రాష్ట్రం',
    utBadge: 'UT',
    noMatch: 'ఎటువంటి రాష్ట్రం లేదా ప్రాంతం సరిపోలలేదు',
  },
  ta: {
    allRegions: 'அனைத்து பகுதிகள் (36)',
    states: 'மாநிலங்கள் (28)',
    unionTerritories: 'யூனியன் பிரதேசங்கள் (8)',
    stateBadge: 'மாநிலம்',
    utBadge: 'UT',
    noMatch: 'பொருந்தும் மாநிலம் எதுவும் கிடைக்கவில்லை',
  },
  kn: {
    allRegions: 'ಎಲ್ಲಾ ಪ್ರದೇಶಗಳು (36)',
    states: 'ರಾಜ್ಯಗಳು (28)',
    unionTerritories: 'ಕೇಂದ್ರಾಡಳಿತ ಪ್ರದೇಶಗಳು (8)',
    stateBadge: 'ರಾಜ್ಯ',
    utBadge: 'UT',
    noMatch: 'ಯಾವುದೇ ರಾಜ್ಯ ಅಥವಾ ಕೇಂದ್ರಾಡಳಿತ ಪ್ರದೇಶ ಕಂಡುಬಂದಿಲ್ಲ',
  },
  ml: {
    allRegions: 'എല്ലാ പ്രദേശങ്ങളും (36)',
    states: 'സംസ്ഥാനങ്ങൾ (28)',
    unionTerritories: 'കേന്ദ്രഭരണ പ്രദേശങ്ങൾ (8)',
    stateBadge: 'സംസ്ഥാനം',
    utBadge: 'UT',
    noMatch: 'സംസ്ഥാനമോ കേന്ദ്രഭരണ പ്രദേശമോ കണ്ടെത്താനായില്ല',
  },
  pa: {
    allRegions: 'ਸਾਰੇ ਖੇਤਰ (36)',
    states: 'ਰਾਜ (28)',
    unionTerritories: 'ਕੇਂਦਰ ਸ਼ਾਸਿਤ ਪ੍ਰਦੇਸ਼ (8)',
    stateBadge: 'ਰਾਜ',
    utBadge: 'ਯੂ.ਟੀ',
    noMatch: 'ਕੋਈ ਰਾਜ ਜਾਂ ਕੇਂਦਰ ਸ਼ਾਸਿਤ ਪ੍ਰਦੇਸ਼ ਨਹੀਂ ਮਿਲਿਆ',
  },
  or: {
    allRegions: 'ସମସ୍ତ କ୍ଷେତ୍ର (36)',
    states: 'ରାଜ୍ୟ (28)',
    unionTerritories: 'କେନ୍ଦ୍ରଶାସିତ ଅଞ୍ଚଳ (8)',
    stateBadge: 'ରାଜ୍ୟ',
    utBadge: 'UT',
    noMatch: 'କୌଣସି ରାଜ୍ୟ କିମ୍ବା କେନ୍ଦ୍ରଶାସିତ ଅଞ୍ଚଳ ମିଳିଲା ନାହିଁ',
  },
  as: {
    allRegions: 'সকলো অঞ্চল (৩৬)',
    states: 'ৰাজ্যসমূহ (২৮)',
    unionTerritories: 'কেন্দ্ৰীয় শাসিত অঞ্চল (৮)',
    stateBadge: 'ৰাজ্য',
    utBadge: 'UT',
    noMatch: 'কোনো ৰাজ্য বা কেন্দ্ৰীয় শাসিত অঞ্চল পোৱা নগ’ল',
  },
};

export function getLocalizedStateSelector(lang: string): StateSelectorLocaleData {
  if (STATE_SELECTOR_LOCALES[lang as LanguageCode]) {
    return STATE_SELECTOR_LOCALES[lang as LanguageCode];
  }
  if (lang !== 'en') {
    return STATE_SELECTOR_LOCALES.hi || STATE_SELECTOR_LOCALES.gu || STATE_SELECTOR_LOCALES.mr || STATE_SELECTOR_LOCALES.en;
  }
  return STATE_SELECTOR_LOCALES.en;
}
