import { LanguageCode } from '../types';
import { LocaleStrings } from './types';
import { en } from './en';
import { hi } from './hi';
import { gu } from './gu';
import { mr } from './mr';
import { bn } from './bn';
import { te } from './te';
import { ta } from './ta';
import { kn } from './kn';
import { ml } from './ml';
import { pa } from './pa';
import { or } from './or';
import { as } from './as';

export interface LanguageMeta {
  code: LanguageCode;
  name: string;
  nativeName: string;
  script: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageMeta[] = [
  { code: 'en', name: 'English', nativeName: 'English', script: 'Latin', flag: '🇮🇳/🇬🇧' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', script: 'Devanagari', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', script: 'Gujarati', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', script: 'Devanagari', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', script: 'Bengali', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', script: 'Telugu', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', script: 'Tamil', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', script: 'Kannada', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', script: 'Malayalam', flag: '🇮🇳' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', script: 'Gurmukhi', flag: '🇮🇳' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', script: 'Odia', flag: '🇮🇳' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', script: 'Bengali-Assamese', flag: '🇮🇳' },
];

const LOCALES: Record<LanguageCode, LocaleStrings> = {
  en,
  hi,
  gu,
  mr,
  bn,
  te,
  ta,
  kn,
  ml,
  pa,
  or,
  as,
};

export function getTranslations(lang: LanguageCode): LocaleStrings {
  return LOCALES[lang] || LOCALES.en;
}

export function getLanguageMeta(code: LanguageCode): LanguageMeta {
  return SUPPORTED_LANGUAGES.find((l) => l.code === code) || SUPPORTED_LANGUAGES[0];
}

export * from './types';
