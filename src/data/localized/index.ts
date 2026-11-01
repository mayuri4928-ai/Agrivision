import { LocalizedDiseaseEntry } from '../localizedDiseasesData';
import { TOMATO_LOCALIZED_DISEASES } from './tomatoData';
import { POTATO_CORN_APPLE_LOCALIZED_DISEASES } from './potatoCornAppleData';
import { FRUITS_CROPS_LOCALIZED_DISEASES } from './fruitsAndCropsData';
import { REMAINING_CROPS_LOCALIZED_DISEASES } from './remainingCropsData';
import { INDIAN_STAPLE_CROPS_LOCALIZED_DISEASES } from './indianStapleCropsData';

export const ALL_LOCALIZED_DISEASES: Record<string, LocalizedDiseaseEntry> = {
  ...TOMATO_LOCALIZED_DISEASES,
  ...POTATO_CORN_APPLE_LOCALIZED_DISEASES,
  ...FRUITS_CROPS_LOCALIZED_DISEASES,
  ...REMAINING_CROPS_LOCALIZED_DISEASES,
  ...INDIAN_STAPLE_CROPS_LOCALIZED_DISEASES,
};

export function getLocalizedEntryByClass(className: string): LocalizedDiseaseEntry | undefined {
  if (!className) return undefined;
  
  if (ALL_LOCALIZED_DISEASES[className]) {
    return ALL_LOCALIZED_DISEASES[className];
  }

  // Handle trailing underscores or aliases
  const trimmed = className.replace(/_+$/, '');
  for (const [key, entry] of Object.entries(ALL_LOCALIZED_DISEASES)) {
    if (key === trimmed || key.replace(/_+$/, '') === trimmed) {
      return entry;
    }
  }

  // Handle Corn Common rust variants
  if (className.toLowerCase().includes('common_rust')) {
    return (
      ALL_LOCALIZED_DISEASES['Corn_(maize)___Common_rust'] ||
      ALL_LOCALIZED_DISEASES['Corn_(maize)__Common_rust'] ||
      ALL_LOCALIZED_DISEASES['Corn_(maize)___Common_rust_']
    );
  }

  // Case-insensitive fallback
  const lower = className.toLowerCase();
  for (const [key, entry] of Object.entries(ALL_LOCALIZED_DISEASES)) {
    if (key.toLowerCase() === lower || key.toLowerCase().replace(/_+$/, '') === lower.replace(/_+$/, '')) {
      return entry;
    }
  }

  return undefined;
}
