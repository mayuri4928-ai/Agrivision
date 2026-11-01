import classesData from './classes.json';
import { ClassDefinition } from '../types';

export interface PlantClass extends ClassDefinition {
  id: number;
  cropId: string;
}

export interface CropSummaryItem {
  id: string;
  name: string;
  scientific: string;
  icon: string;
  totalClasses: number;
}

export const PLANT_CLASSES: PlantClass[] = classesData as PlantClass[];

const SCIENTIFIC_NAMES_BY_CROP_ID: Record<string, string> = {
  apple: 'Malus domestica',
  blueberry: 'Vaccinium corymbosum',
  cherry: 'Prunus avium',
  corn: 'Zea mays',
  grape: 'Vitis vinifera',
  orange: 'Citrus sinensis',
  peach: 'Prunus persica',
  pepper: 'Capsicum annuum',
  potato: 'Solanum tuberosum',
  raspberry: 'Rubus idaeus',
  soybean: 'Glycine max',
  squash: 'Cucurbita pepo',
  strawberry: 'Fragaria × ananassa',
  tomato: 'Solanum lycopersicum',
  rice: 'Oryza sativa',
  wheat: 'Triticum aestivum',
  cotton: 'Gossypium hirsutum',
  sugarcane: 'Saccharum officinarum',
};

const ICONS_BY_CROP_ID: Record<string, string> = {
  apple: '🍎',
  blueberry: '🫐',
  cherry: '🍒',
  corn: '🌽',
  grape: '🍇',
  orange: '🍊',
  peach: '🍑',
  pepper: '🫑',
  potato: '🥔',
  raspberry: '🍓',
  soybean: '🫘',
  squash: '🎃',
  strawberry: '🍓',
  tomato: '🍅',
  rice: '🌾',
  wheat: '🌾',
  cotton: '🌿',
  sugarcane: '🎋',
};

export const CROPS_LIST: CropSummaryItem[] = Array.from(
  PLANT_CLASSES.reduce((map, cls) => {
    const existing = map.get(cls.cropId);
    if (existing) {
      existing.totalClasses += 1;
    } else {
      map.set(cls.cropId, {
        id: cls.cropId,
        name: cls.crop,
        scientific: SCIENTIFIC_NAMES_BY_CROP_ID[cls.cropId] || cls.crop,
        icon: ICONS_BY_CROP_ID[cls.cropId] || '🌱',
        totalClasses: 1,
      });
    }
    return map;
  }, new Map<string, CropSummaryItem>()).values()
);

// Single source of truth computed directly from classes.json
export const TOTAL_CLASSES: number = PLANT_CLASSES.length; // 60
export const TOTAL_CROPS: number = CROPS_LIST.length; // 18
export const TOTAL_HEALTHY_CLASSES: number = PLANT_CLASSES.filter((c) => c.isHealthy).length; // 18
export const TOTAL_DISEASE_CLASSES: number = PLANT_CLASSES.filter((c) => !c.isHealthy).length; // 42
