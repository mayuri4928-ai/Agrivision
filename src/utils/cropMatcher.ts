import { PLANT_CLASSES } from '../data/classes';

/**
 * Strips all non-alphanumeric characters and lowercases for canonical class matching (Items 9, 10)
 */
export function normalizeClassKey(raw: string): string {
  return (raw || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Alias map for common PlantVillage / PlantDoc / Gemini class name spellings (Items 9, 10)
 */
const NORMALIZED_CLASS_ALIAS_MAP: Record<string, string> = {
  // Strawberry (Critical differential)
  strawberryleafscorch: 'Strawberry___Leaf_scorch',
  strawberryscorch: 'Strawberry___Leaf_scorch',
  strawberryleafspot: 'Strawberry___Leaf_scorch',
  strawberryleafblight: 'Strawberry___Leaf_scorch',
  strawberryleafscorched: 'Strawberry___Leaf_scorch',
  strawberryscorchdisease: 'Strawberry___Leaf_scorch',
  strawberryhealthy: 'Strawberry___healthy',
  healthystrawberry: 'Strawberry___healthy',

  // Apple
  appleapplescab: 'Apple___Apple_scab',
  applescab: 'Apple___Apple_scab',
  appleblackrot: 'Apple___Black_rot',
  applecedarapplerust: 'Apple___Cedar_apple_rust',
  applecedarrust: 'Apple___Cedar_apple_rust',
  cedarapplerust: 'Apple___Cedar_apple_rust',
  applehealthy: 'Apple___healthy',
  healthyapple: 'Apple___healthy',

  // Blueberry
  blueberryanthracnose: 'Blueberry___Anthracnose',
  blueberryanthracnoseriperot: 'Blueberry___Anthracnose',
  blueberryriperot: 'Blueberry___Anthracnose',
  blueberrystemblight: 'Blueberry___Stem_blight',
  blueberryblight: 'Blueberry___Stem_blight',
  blueberryhealthy: 'Blueberry___healthy',
  healthyblueberry: 'Blueberry___healthy',

  // Cherry
  cherryincludingsourpowderymildew: 'Cherry_(including_sour)___Powdery_mildew',
  cherrypowderymildew: 'Cherry_(including_sour)___Powdery_mildew',
  sourcherrypowderymildew: 'Cherry_(including_sour)___Powdery_mildew',
  cherrymildew: 'Cherry_(including_sour)___Powdery_mildew',
  cherryincludingsourhealthy: 'Cherry_(including_sour)___healthy',
  cherryhealthy: 'Cherry_(including_sour)___healthy',
  sourcherryhealthy: 'Cherry_(including_sour)___healthy',
  healthycherry: 'Cherry_(including_sour)___healthy',

  // Corn / Maize
  cornmaizecommonrust: 'Corn_(maize)___Common_rust',
  corncommonrust: 'Corn_(maize)___Common_rust',
  maizecommonrust: 'Corn_(maize)___Common_rust',
  cornrust: 'Corn_(maize)___Common_rust',
  maizerust: 'Corn_(maize)___Common_rust',
  cornmaizecercosporaleafspotgrayleafspot: 'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot',
  cornmaizegrayleafspot: 'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot',
  cornmaizecercosporaleafspot: 'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot',
  corngrayleafspot: 'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot',
  corncercosporaleafspot: 'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot',
  maizegrayleafspot: 'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot',
  maizecercosporaleafspot: 'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot',
  corncercospora: 'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot',
  cornmaizenorthernleafblight: 'Corn_(maize)___Northern_Leaf_Blight',
  cornnorthernleafblight: 'Corn_(maize)___Northern_Leaf_Blight',
  maizenorthernleafblight: 'Corn_(maize)___Northern_Leaf_Blight',
  cornmaizehealthy: 'Corn_(maize)___healthy',
  cornhealthy: 'Corn_(maize)___healthy',
  maizehealthy: 'Corn_(maize)___healthy',
  healthycorn: 'Corn_(maize)___healthy',

  // Grape
  grapeescablackmeasles: 'Grape___Esca_(Black_Measles)',
  grapeesca: 'Grape___Esca_(Black_Measles)',
  grapeblackmeasles: 'Grape___Esca_(Black_Measles)',
  grapesescablackmeasles: 'Grape___Esca_(Black_Measles)',
  grapesesca: 'Grape___Esca_(Black_Measles)',
  grapesblackmeasles: 'Grape___Esca_(Black_Measles)',
  grapeblackrot: 'Grape___Black_rot',
  grapesblackrot: 'Grape___Black_rot',
  graperot: 'Grape___Black_rot',
  grapeleafblightisariopsisleafspot: 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)',
  grapeleafblight: 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)',
  grapeisariopsisleafspot: 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)',
  grapeisariopsis: 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)',
  grapesleafblight: 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)',
  grapehealthy: 'Grape___healthy',
  grapeshealthy: 'Grape___healthy',
  healthygrape: 'Grape___healthy',

  // Orange / Citrus
  orangehaunglongbingcitrusgreening: 'Orange___Haunglongbing_(Citrus_greening)',
  orangehuanglongbingcitrusgreening: 'Orange___Haunglongbing_(Citrus_greening)',
  orangehuanglongbing: 'Orange___Haunglongbing_(Citrus_greening)',
  orangehaunglongbing: 'Orange___Haunglongbing_(Citrus_greening)',
  orangecitrusgreening: 'Orange___Haunglongbing_(Citrus_greening)',
  citrusgreening: 'Orange___Haunglongbing_(Citrus_greening)',
  orangehlb: 'Orange___Haunglongbing_(Citrus_greening)',
  citrushlb: 'Orange___Haunglongbing_(Citrus_greening)',
  orangehealthy: 'Orange___healthy',
  citrushealthy: 'Orange___healthy',
  healthyorange: 'Orange___healthy',

  // Peach
  peachbacterialspot: 'Peach___Bacterial_spot',
  peachhealthy: 'Peach___healthy',
  healthypeach: 'Peach___healthy',

  // Pepper Bell
  pepperbellbacterialspot: 'Pepper,_bell___Bacterial_spot',
  bellpepperbacterialspot: 'Pepper,_bell___Bacterial_spot',
  pepperbacterialspot: 'Pepper,_bell___Bacterial_spot',
  capsicumbacterialspot: 'Pepper,_bell___Bacterial_spot',
  pepperbellhealthy: 'Pepper,_bell___healthy',
  bellpepperhealthy: 'Pepper,_bell___healthy',
  pepperhealthy: 'Pepper,_bell___healthy',
  capsicumhealthy: 'Pepper,_bell___healthy',
  healthybellpepper: 'Pepper,_bell___healthy',

  // Potato
  potatoearlyblight: 'Potato___Early_blight',
  potatolateblight: 'Potato___Late_blight',
  potatohealthy: 'Potato___healthy',
  healthypotato: 'Potato___healthy',

  // Raspberry
  raspberrycaneblight: 'Raspberry___Cane_blight',
  raspberryyellowrust: 'Raspberry___Yellow_rust',
  raspberryrust: 'Raspberry___Yellow_rust',
  raspberryhealthy: 'Raspberry___healthy',
  healthyraspberry: 'Raspberry___healthy',

  // Soybean
  soybeanrust: 'Soybean___Rust',
  soybeancercosporaleafspot: 'Soybean___Cercospora_leaf_spot',
  soybeancercospora: 'Soybean___Cercospora_leaf_spot',
  soybeanhealthy: 'Soybean___healthy',
  healthysoybean: 'Soybean___healthy',

  // Squash
  squashpowderymildew: 'Squash___Powdery_mildew',
  squashmildew: 'Squash___Powdery_mildew',
  squashhealthy: 'Squash___healthy',
  healthysquash: 'Squash___healthy',

  // Tomato
  tomatobacterialspot: 'Tomato___Bacterial_spot',
  tomatoearlyblight: 'Tomato___Early_blight',
  tomatolateblight: 'Tomato___Late_blight',
  tomatoleafmold: 'Tomato___Leaf_Mold',
  tomatoleafmould: 'Tomato___Leaf_Mold',
  tomatoseptorialeafspot: 'Tomato___Septoria_leaf_spot',
  tomatoseptoria: 'Tomato___Septoria_leaf_spot',
  tomatospidermitestwospottedspidermite: 'Tomato___Spider_mites Two-spotted_spider_mite',
  tomatospidermites: 'Tomato___Spider_mites Two-spotted_spider_mite',
  tomatotwospottedspidermite: 'Tomato___Spider_mites Two-spotted_spider_mite',
  tomatotargetspot: 'Tomato___Target_Spot',
  tomatoyellowleafcurlvirus: 'Tomato___Tomato_Yellow_Leaf_Curl_Virus',
  tomatotomatoesyellowleafcurlvirus: 'Tomato___Tomato_Yellow_Leaf_Curl_Virus',
  tomatotylcv: 'Tomato___Tomato_Yellow_Leaf_Curl_Virus',
  tomatomosaicvirus: 'Tomato___Tomato_mosaic_virus',
  tomatotmv: 'Tomato___Tomato_mosaic_virus',
  tomatohealthy: 'Tomato___healthy',
  healthytomato: 'Tomato___healthy',

  // Rice (Paddy)
  ricebacterialleafblight: 'Rice___Bacterial_leaf_blight',
  ricepaddybacterialleafblight: 'Rice___Bacterial_leaf_blight',
  paddybacterialleafblight: 'Rice___Bacterial_leaf_blight',
  ricebrownspot: 'Rice___Brown_spot',
  ricepaddybrownspot: 'Rice___Brown_spot',
  paddybrownspot: 'Rice___Brown_spot',
  riceleafblast: 'Rice___Leaf_Blast',
  riceblast: 'Rice___Leaf_Blast',
  ricepaddyleafblast: 'Rice___Leaf_Blast',
  paddyleafblast: 'Rice___Leaf_Blast',
  ricehealthy: 'Rice___healthy',
  ricepaddyhealthy: 'Rice___healthy',
  paddyhealthy: 'Rice___healthy',
  healthyrice: 'Rice___healthy',

  // Wheat
  wheatbrownrust: 'Wheat___Brown_rust',
  wheatleafrust: 'Wheat___Brown_rust',
  wheatyellowrust: 'Wheat___Yellow_rust',
  wheatstriperust: 'Wheat___Yellow_rust',
  wheatpowderymildew: 'Wheat___Powdery_mildew',
  wheatmildew: 'Wheat___Powdery_mildew',
  wheathealthy: 'Wheat___healthy',
  healthywheat: 'Wheat___healthy',

  // Cotton
  cottonbacterialblight: 'Cotton___Bacterial_blight',
  cottonangularleafspot: 'Cotton___Bacterial_blight',
  cottonleafcurlvirus: 'Cotton___Leaf_curl_virus',
  cottoncurlvirus: 'Cotton___Leaf_curl_virus',
  cottonclcuv: 'Cotton___Leaf_curl_virus',
  cottonhealthy: 'Cotton___healthy',
  healthycotton: 'Cotton___healthy',

  // Sugarcane
  sugarcaneredrot: 'Sugarcane___Red_rot',
  sugarcanesmut: 'Sugarcane___Smut',
  sugarcanehealthy: 'Sugarcane___healthy',
  healthysugarcane: 'Sugarcane___healthy',
};

// Build lookup table from classes.json at module initialization
const CANONICAL_CLASS_LOOKUP = new Map<string, string>();
for (const cls of PLANT_CLASSES) {
  CANONICAL_CLASS_LOOKUP.set(normalizeClassKey(cls.className), cls.className);
  CANONICAL_CLASS_LOOKUP.set(normalizeClassKey(`${cls.crop}_${cls.disease}`), cls.className);
  CANONICAL_CLASS_LOOKUP.set(normalizeClassKey(`${cls.cropId}_${cls.disease}`), cls.className);
}
for (const [aliasKey, canonicalName] of Object.entries(NORMALIZED_CLASS_ALIAS_MAP)) {
  CANONICAL_CLASS_LOOKUP.set(normalizeClassKey(aliasKey), canonicalName);
}

/**
 * Resolves any class name string to its exact canonical className in classes.json,
 * or returns null if unknown (never defaults to Tomato___healthy! - Items 9 & 10)
 */
export function resolveCanonicalClassName(rawClassName?: string | null): string | null {
  if (!rawClassName || typeof rawClassName !== 'string') return null;
  const trimmed = rawClassName.trim();
  if (!trimmed) return null;

  // Direct exact match
  const exact = PLANT_CLASSES.find((c) => c.className === trimmed);
  if (exact) return exact.className;

  // Normalized lookup (lowercase, strip every non-alphanumeric char)
  const norm = normalizeClassKey(trimmed);
  if (!norm) return null;

  const fromMap = CANONICAL_CLASS_LOOKUP.get(norm);
  if (fromMap) return fromMap;

  // Substring / suffix fallback: e.g. "strawberryleafscorchdisease" -> "Strawberry___Leaf_scorch"
  for (const [aliasNorm, canonical] of CANONICAL_CLASS_LOOKUP.entries()) {
    if (aliasNorm.length >= 10 && norm.includes(aliasNorm)) {
      return canonical;
    }
  }

  return null;
}

/**
 * Shared cross-crop alias matcher imported by both server.ts and client (Item 11).
 * Handles maize, capsicum, citrus, paddy, dhan, cucurbit, gehun, kapas, ganna, etc.
 */
const CROP_SYNONYM_GROUPS: string[][] = [
  ['apple', 'seb'],
  ['blueberry'],
  ['cherry', 'sour'],
  ['corn', 'maize', 'makka', 'bhutta'],
  ['grape', 'grapes', 'angoor'],
  ['orange', 'citrus', 'santra', 'mosambi'],
  ['peach', 'aadu'],
  ['pepper', 'bell', 'capsicum', 'shimla', 'mirch', 'chili', 'chilli'],
  ['potato', 'aloo'],
  ['raspberry'],
  ['soybean', 'soya', 'soy'],
  ['squash', 'cucurbit', 'kaddu', 'gourd', 'pumpkin'],
  ['strawberry'],
  ['tomato', 'tamatar'],
  ['rice', 'paddy', 'dhan'],
  ['wheat', 'gehun', 'kanak'],
  ['cotton', 'kapas'],
  ['sugarcane', 'ganna', 'ikh'],
];

export function matchesCrop(classCrop: string, cropHint?: string): boolean {
  if (!cropHint || cropHint === 'auto' || cropHint === 'all') return true;
  const clean = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, ' ');
  const cStr = clean(classCrop).trim();
  const hStr = clean(cropHint).trim();
  if (!hStr) return true;
  if (cStr.includes(hStr) || hStr.includes(cStr)) return true;

  const hTokens = hStr.split(/\s+/).filter((t) => t.length > 1);
  const cTokens = cStr.split(/\s+/).filter((t) => t.length > 1);

  for (const group of CROP_SYNONYM_GROUPS) {
    const hintInGroup = hTokens.some((t) => group.includes(t)) || group.some((g) => hStr.includes(g));
    const classInGroup = cTokens.some((t) => group.includes(t)) || group.some((g) => cStr.includes(g));
    if (hintInGroup && classInGroup) {
      return true;
    }
  }

  return hTokens.some((t) => t.length >= 3 && cTokens.includes(t));
}

/**
 * Full-resolution SHA-256 content hash for cache keying (Item 14).
 * Uses Web Crypto API when available, with a deterministic pure-JS SHA-256 fallback.
 */
export async function computeSha256Hex(content: string): Promise<string> {
  if (typeof globalThis !== 'undefined' && globalThis.crypto && globalThis.crypto.subtle) {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(content);
      const digest = await globalThis.crypto.subtle.digest('SHA-256', data);
      const byteArray = Array.from(new Uint8Array(digest));
      return byteArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    } catch {
      // Fallback below
    }
  }
  return sha256FallbackHex(content);
}

function sha256FallbackHex(ascii: string): string {
  function rightRotate(value: number, amount: number) {
    return (value >>> amount) | (value << (32 - amount));
  }
  const mathPow = Math.pow;
  const maxWord = mathPow(2, 32);
  let result = '';
  const words: number[] = [];
  const asciiBitLength = ascii.length * 8;
  let hash = [
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
    0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
  ];
  const k = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
  ];
  let padded = ascii + '\x80';
  while ((padded.length % 64) - 56) padded += '\x00';
  for (let i = 0; i < padded.length; i++) {
    const j = padded.charCodeAt(i);
    words[i >> 2] |= j << (((3 - i) % 4) * 8);
  }
  words[words.length] = (asciiBitLength / maxWord) | 0;
  words[words.length] = asciiBitLength;
  for (let j = 0; j < words.length; ) {
    const w = words.slice(j, (j += 16));
    const oldHash = hash.slice(0);
    for (let i = 0; i < 64; i++) {
      const w15 = w[i - 15], w2 = w[i - 2];
      const a = hash[0], e = hash[4];
      const temp1 =
        hash[7] +
        (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) +
        ((e & hash[5]) ^ (~e & hash[6])) +
        k[i] +
        (w[i] =
          i < 16
            ? w[i]
            : (w[i - 16] +
                (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) +
                w[i - 7] +
                (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))) |
              0);
      const temp2 =
        (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) +
        ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));
      hash = [(temp1 + temp2) | 0].concat(hash);
      hash[4] = (hash[4] + temp1) | 0;
      hash.length = 8;
    }
    for (let i = 0; i < 8; i++) {
      hash[i] = (hash[i] + oldHash[i]) | 0;
    }
  }
  for (let i = 0; i < 8; i++) {
    for (let j = 3; j + 1; j--) {
      const b = (hash[i] >> (j * 8)) & 255;
      result += (b < 16 ? '0' : '') + b.toString(16);
    }
  }
  return result;
}
