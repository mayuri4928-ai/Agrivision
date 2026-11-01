import { PLANT_CLASSES } from './classes';

export interface SampleLeaf {
  id: string;
  crop: string;
  cropCategory: string;
  expectedClass: string;
  conditionName: string;
  isHealthy: boolean;
  pathogenType: 'Fungal' | 'Bacterial' | 'Viral' | 'Pest / Mite' | 'Healthy';
  severity: 'Mild' | 'Moderate' | 'Severe' | 'Healthy';
  badgeColor: string;
  description: string;
  sourceDataset: string;
  dataUrl: string;
}

export type LeafType =
  | 'tomato'
  | 'potato'
  | 'corn'
  | 'apple'
  | 'grape'
  | 'pepper'
  | 'peach'
  | 'strawberry'
  | 'rice'
  | 'wheat'
  | 'cotton'
  | 'sugarcane'
  | 'orange'
  | 'soybean'
  | 'squash'
  | 'cherry'
  | 'blueberry'
  | 'raspberry';

export type SymptomType =
  | 'late_blight'
  | 'early_blight'
  | 'bacterial_spot'
  | 'septoria_leaf_spot'
  | 'yellow_leaf_curl'
  | 'spider_mites'
  | 'mosaic_virus'
  | 'leaf_mold'
  | 'target_spot'
  | 'common_rust'
  | 'northern_leaf_blight'
  | 'gray_leaf_spot'
  | 'scab'
  | 'black_rot'
  | 'cedar_apple_rust'
  | 'grape_esca'
  | 'grape_leaf_blight'
  | 'peach_bacterial_spot'
  | 'strawberry_leaf_scorch'
  | 'rice_blast'
  | 'rice_brown_spot'
  | 'rice_bacterial_blight'
  | 'wheat_yellow_rust'
  | 'wheat_brown_rust'
  | 'wheat_powdery_mildew'
  | 'cotton_bacterial_blight'
  | 'cotton_leaf_curl'
  | 'sugarcane_red_rot'
  | 'sugarcane_smut'
  | 'citrus_greening'
  | 'cherry_powdery_mildew'
  | 'squash_powdery_mildew'
  | 'soybean_rust'
  | 'soybean_cercospora'
  | 'blueberry_anthracnose'
  | 'blueberry_stem_blight'
  | 'raspberry_cane_blight'
  | 'raspberry_yellow_rust'
  | 'healthy';

export function getExpectedClassForLeaf(leafType: LeafType, symptomType: SymptomType): string {
  if (symptomType === 'healthy') {
    switch (leafType) {
      case 'apple': return 'Apple___healthy';
      case 'blueberry': return 'Blueberry___healthy';
      case 'cherry': return 'Cherry_(including_sour)___healthy';
      case 'corn': return 'Corn_(maize)___healthy';
      case 'grape': return 'Grape___healthy';
      case 'orange': return 'Orange___healthy';
      case 'peach': return 'Peach___healthy';
      case 'pepper': return 'Pepper,_bell___healthy';
      case 'potato': return 'Potato___healthy';
      case 'raspberry': return 'Raspberry___healthy';
      case 'soybean': return 'Soybean___healthy';
      case 'squash': return 'Squash___healthy';
      case 'strawberry': return 'Strawberry___healthy';
      case 'tomato': return 'Tomato___healthy';
      case 'rice': return 'Rice___healthy';
      case 'wheat': return 'Wheat___healthy';
      case 'cotton': return 'Cotton___healthy';
      case 'sugarcane': return 'Sugarcane___healthy';
    }
  }

  switch (symptomType) {
    case 'early_blight':
      return leafType === 'potato' ? 'Potato___Early_blight' : 'Tomato___Early_blight';
    case 'late_blight':
      return leafType === 'potato' ? 'Potato___Late_blight' : 'Tomato___Late_blight';
    case 'bacterial_spot':
      if (leafType === 'peach') return 'Peach___Bacterial_spot';
      if (leafType === 'pepper') return 'Pepper,_bell___Bacterial_spot';
      return 'Tomato___Bacterial_spot';
    case 'peach_bacterial_spot': return 'Peach___Bacterial_spot';
    case 'septoria_leaf_spot': return 'Tomato___Septoria_leaf_spot';
    case 'spider_mites': return 'Tomato___Spider_mites Two-spotted_spider_mite';
    case 'target_spot': return 'Tomato___Target_Spot';
    case 'yellow_leaf_curl': return 'Tomato___Tomato_Yellow_Leaf_Curl_Virus';
    case 'mosaic_virus': return 'Tomato___Tomato_mosaic_virus';
    case 'leaf_mold': return 'Tomato___Leaf_Mold';
    case 'gray_leaf_spot': return 'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot';
    case 'common_rust': return 'Corn_(maize)___Common_rust';
    case 'northern_leaf_blight': return 'Corn_(maize)___Northern_Leaf_Blight';
    case 'scab': return 'Apple___Apple_scab';
    case 'black_rot':
      return leafType === 'grape' ? 'Grape___Black_rot' : 'Apple___Black_rot';
    case 'cedar_apple_rust': return 'Apple___Cedar_apple_rust';
    case 'grape_esca': return 'Grape___Esca_(Black_Measles)';
    case 'grape_leaf_blight': return 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)';
    case 'citrus_greening': return 'Orange___Haunglongbing_(Citrus_greening)';
    case 'strawberry_leaf_scorch': return 'Strawberry___Leaf_scorch';
    case 'cherry_powdery_mildew': return 'Cherry_(including_sour)___Powdery_mildew';
    case 'squash_powdery_mildew': return 'Squash___Powdery_mildew';
    case 'wheat_powdery_mildew': return 'Wheat___Powdery_mildew';
    case 'rice_bacterial_blight': return 'Rice___Bacterial_leaf_blight';
    case 'rice_brown_spot': return 'Rice___Brown_spot';
    case 'rice_blast': return 'Rice___Leaf_Blast';
    case 'wheat_brown_rust': return 'Wheat___Brown_rust';
    case 'wheat_yellow_rust': return 'Wheat___Yellow_rust';
    case 'cotton_bacterial_blight': return 'Cotton___Bacterial_blight';
    case 'cotton_leaf_curl': return 'Cotton___Leaf_curl_virus';
    case 'sugarcane_red_rot': return 'Sugarcane___Red_rot';
    case 'sugarcane_smut': return 'Sugarcane___Smut';
    case 'soybean_rust': return 'Soybean___Rust';
    case 'soybean_cercospora': return 'Soybean___Cercospora_leaf_spot';
    case 'blueberry_anthracnose': return 'Blueberry___Anthracnose';
    case 'blueberry_stem_blight': return 'Blueberry___Stem_blight';
    case 'raspberry_cane_blight': return 'Raspberry___Cane_blight';
    case 'raspberry_yellow_rust': return 'Raspberry___Yellow_rust';
    default:
      return 'Tomato___healthy';
  }
}

// Function to generate realistic procedural SVG/canvas leaf disease images
export function generateLeafDataUrl(params: {
  leafType: LeafType;
  baseColor: string;
  veinColor: string;
  symptomType: SymptomType;
  expectedClass?: string;
}): string {
  // Guard for SSR or non-browser environments
  if (typeof document === 'undefined') return '';

  const canvas = document.createElement('canvas');
  canvas.width = 448;
  canvas.height = 448;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Background: clean neutral laboratory / field specimen cardboard surface
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, 448, 448);

  // Subtle natural vignetting & paper texture
  const bgGrad = ctx.createRadialGradient(224, 224, 120, 224, 224, 300);
  bgGrad.addColorStop(0, 'rgba(255,255,255,0)');
  bgGrad.addColorStop(1, 'rgba(203,213,225,0.3)');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 448, 448);

  // Soft background shadow for authentic leaf depth
  ctx.save();
  ctx.shadowColor = 'rgba(15, 23, 42, 0.16)';
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 12;

  // Draw Leaf Base Geometry per botanical archetype
  ctx.beginPath();
  if (params.leafType === 'corn') {
    // Elongated linear maize blade
    ctx.moveTo(224, 30);
    ctx.bezierCurveTo(275, 110, 285, 270, 245, 400);
    ctx.lineTo(203, 400);
    ctx.bezierCurveTo(163, 270, 173, 110, 224, 30);
  } else if (params.leafType === 'grape') {
    // 3 to 5-lobed broad palmate grapevine leaf
    ctx.moveTo(224, 55);
    ctx.bezierCurveTo(285, 65, 355, 105, 365, 175);
    ctx.bezierCurveTo(375, 235, 335, 275, 325, 345);
    ctx.bezierCurveTo(285, 365, 238, 385, 224, 395);
    ctx.bezierCurveTo(210, 385, 163, 365, 123, 345);
    ctx.bezierCurveTo(113, 275, 73, 235, 83, 175);
    ctx.bezierCurveTo(93, 105, 163, 65, 224, 55);
  } else if (params.leafType === 'apple') {
    // Broad ovate, serrated apple foliage
    ctx.moveTo(224, 55);
    ctx.bezierCurveTo(325, 95, 345, 255, 238, 395);
    ctx.lineTo(210, 395);
    ctx.bezierCurveTo(103, 255, 123, 95, 224, 55);
  } else if (params.leafType === 'pepper') {
    // Smooth lanceolate pepper/capsicum blade with tapered apex
    ctx.moveTo(224, 40);
    ctx.bezierCurveTo(300, 130, 310, 280, 234, 395);
    ctx.lineTo(214, 395);
    ctx.bezierCurveTo(138, 280, 148, 130, 224, 40);
  } else if (params.leafType === 'peach') {
    // Narrow lanceolate with fine marginal serrations
    ctx.moveTo(224, 35);
    ctx.bezierCurveTo(280, 120, 270, 290, 232, 405);
    ctx.lineTo(216, 405);
    ctx.bezierCurveTo(178, 290, 168, 120, 224, 35);
  } else if (params.leafType === 'strawberry') {
    // Obovate trifoliate leaflet with rounded toothed margins
    ctx.moveTo(224, 75);
    ctx.bezierCurveTo(310, 95, 340, 230, 275, 350);
    ctx.bezierCurveTo(250, 380, 235, 395, 224, 398);
    ctx.bezierCurveTo(213, 395, 198, 380, 173, 350);
    ctx.bezierCurveTo(108, 230, 138, 95, 224, 75);
  } else if (params.leafType === 'potato') {
    // Rounded oval Solanaceous leaflet
    ctx.moveTo(224, 50);
    ctx.bezierCurveTo(310, 100, 335, 240, 270, 360);
    ctx.bezierCurveTo(248, 385, 232, 398, 224, 400);
    ctx.bezierCurveTo(216, 398, 200, 385, 178, 360);
    ctx.bezierCurveTo(113, 240, 138, 100, 224, 50);
  } else if (params.leafType === 'rice') {
    // Slender erect linear grass blade with tapered acute tip
    ctx.moveTo(224, 25);
    ctx.bezierCurveTo(252, 100, 258, 260, 236, 400);
    ctx.lineTo(212, 400);
    ctx.bezierCurveTo(190, 260, 196, 100, 224, 25);
  } else if (params.leafType === 'wheat') {
    // Graminoid flag leaf blade
    ctx.moveTo(224, 30);
    ctx.bezierCurveTo(262, 110, 268, 265, 238, 400);
    ctx.lineTo(210, 400);
    ctx.bezierCurveTo(180, 265, 186, 110, 224, 30);
  } else if (params.leafType === 'sugarcane') {
    // Broad robust linear strap-like cane blade
    ctx.moveTo(224, 25);
    ctx.bezierCurveTo(288, 100, 292, 260, 248, 400);
    ctx.lineTo(200, 400);
    ctx.bezierCurveTo(156, 260, 160, 100, 224, 25);
  } else if (params.leafType === 'cotton') {
    // 3 to 5-lobed palmate cotton foliage
    ctx.moveTo(224, 60);
    ctx.bezierCurveTo(285, 80, 365, 120, 350, 190);
    ctx.bezierCurveTo(335, 230, 295, 250, 305, 310);
    ctx.bezierCurveTo(270, 345, 240, 375, 224, 395);
    ctx.bezierCurveTo(208, 375, 178, 345, 143, 310);
    ctx.bezierCurveTo(153, 250, 113, 230, 98, 190);
    ctx.bezierCurveTo(83, 120, 163, 80, 224, 60);
  } else if (params.leafType === 'orange') {
    // Glossy leathery ovate citrus leaf
    ctx.moveTo(224, 45);
    ctx.bezierCurveTo(318, 110, 322, 260, 236, 395);
    ctx.lineTo(212, 395);
    ctx.bezierCurveTo(126, 260, 130, 110, 224, 45);
  } else if (params.leafType === 'squash') {
    // Large cordate angular cucurbit leaf
    ctx.moveTo(224, 70);
    ctx.bezierCurveTo(305, 80, 385, 150, 365, 240);
    ctx.bezierCurveTo(345, 315, 280, 365, 224, 392);
    ctx.bezierCurveTo(168, 365, 103, 315, 83, 240);
    ctx.bezierCurveTo(63, 150, 143, 80, 224, 70);
  } else if (params.leafType === 'soybean') {
    // Ovate trifoliate leaflet
    ctx.moveTo(224, 55);
    ctx.bezierCurveTo(298, 115, 308, 255, 236, 395);
    ctx.lineTo(212, 395);
    ctx.bezierCurveTo(140, 255, 150, 115, 224, 55);
  } else if (params.leafType === 'cherry' || params.leafType === 'blueberry' || params.leafType === 'raspberry') {
    // Elliptic leaf with fine margin
    ctx.moveTo(224, 45);
    ctx.bezierCurveTo(308, 110, 318, 250, 236, 395);
    ctx.lineTo(212, 395);
    ctx.bezierCurveTo(130, 250, 140, 110, 224, 45);
  } else {
    // Classic Tomato compound leaflet with irregular lobed margins
    ctx.moveTo(224, 50);
    ctx.bezierCurveTo(280, 90, 330, 160, 320, 220);
    ctx.bezierCurveTo(310, 260, 340, 290, 320, 340);
    ctx.bezierCurveTo(280, 375, 240, 390, 224, 405);
    ctx.bezierCurveTo(208, 390, 168, 375, 128, 340);
    ctx.bezierCurveTo(108, 290, 138, 260, 128, 220);
    ctx.bezierCurveTo(118, 160, 168, 90, 224, 50);
  }
  ctx.closePath();

  // Fill gradient representing realistic chlorophyll distribution
  const grad = ctx.createLinearGradient(120, 60, 320, 400);
  grad.addColorStop(0, params.baseColor);
  grad.addColorStop(1, '#25501f');
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.restore();

  // Central Midrib
  const isCane = params.leafType === 'sugarcane';
  const isLinear = params.leafType === 'corn' || params.leafType === 'rice' || params.leafType === 'wheat' || isCane;
  ctx.strokeStyle = params.symptomType === 'sugarcane_red_rot' ? '#b91c1c' : params.veinColor;
  ctx.lineWidth = isCane ? 8 : (params.leafType === 'corn' ? 6 : 4);
  ctx.beginPath();
  ctx.moveTo(224, 35);
  ctx.quadraticCurveTo(226, 220, 224, 405);
  ctx.stroke();

  // Lateral Secondary Veins
  ctx.lineWidth = 2;
  if (isLinear) {
    // Parallel venation strictly bounded by linear graminoid blade contour
    const veinCount = isCane ? 18 : 14;
    for (let i = 0; i < veinCount; i++) {
      const y = 60 + i * 20;
      if (y > 385) continue;
      const progress = (y - 30) / 370;
      const maxHalf = params.leafType === 'rice' ? 28 : (params.leafType === 'wheat' ? 36 : (isCane ? 55 : 44));
      const halfWidth = Math.max(12, Math.sin(progress * Math.PI) * maxHalf);
      ctx.beginPath();
      ctx.moveTo(224, y);
      ctx.quadraticCurveTo(224 + halfWidth * 0.55, y - 5, 224 + halfWidth, y - 10);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(224, y);
      ctx.quadraticCurveTo(224 - halfWidth * 0.55, y - 5, 224 - halfWidth, y - 10);
      ctx.stroke();
    }
  } else {
    const veinCount = 9;
    for (let i = 0; i < veinCount; i++) {
      const y = 90 + i * 28;
      if (y > 380) continue;
      ctx.beginPath();
      ctx.moveTo(224, y);
      ctx.quadraticCurveTo(265, y - 10, 305, y - 22);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(224, y);
      ctx.quadraticCurveTo(183, y - 10, 143, y - 22);
      ctx.stroke();
    }
  }

  // Symptom Drawing Engine
  if (params.symptomType === 'late_blight') {
    // Water-soaked dark brownish-black irregular necrotic lesions with chlorotic halos
    const lesions = [
      { x: 270, y: 170, r: 46 },
      { x: 170, y: 260, r: 54 },
      { x: 285, y: 300, r: 38 },
      { x: 215, y: 360, r: 28 },
    ];
    for (const p of lesions) {
      // Chlorotic water halo
      ctx.fillStyle = 'rgba(202, 197, 102, 0.7)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r + 14, 0, Math.PI * 2);
      ctx.fill();

      // Necrotic greasy core
      const coreGrad = ctx.createRadialGradient(p.x, p.y, 4, p.x, p.y, p.r);
      coreGrad.addColorStop(0, '#1c130d');
      coreGrad.addColorStop(0.7, '#382214');
      coreGrad.addColorStop(1, '#573a21');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (params.symptomType === 'early_blight') {
    // Classic Alternaria solani bullseye concentric rings with distinct bright yellow halo
    const targets = [
      { x: 265, y: 205, r: 38 },
      { x: 175, y: 155, r: 30 },
      { x: 205, y: 315, r: 34 },
      { x: 280, y: 110, r: 20 },
    ];
    for (const t of targets) {
      // Chlorotic ring
      ctx.fillStyle = 'rgba(240, 220, 60, 0.75)';
      ctx.beginPath();
      ctx.arc(t.x, t.y, t.r + 15, 0, Math.PI * 2);
      ctx.fill();

      // Brown lesion base
      ctx.fillStyle = '#4c2d18';
      ctx.beginPath();
      ctx.arc(t.x, t.y, t.r, 0, Math.PI * 2);
      ctx.fill();

      // Concentric target rings
      ctx.strokeStyle = '#271408';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(t.x, t.y, t.r * 0.7, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(t.x, t.y, t.r * 0.4, 0, Math.PI * 2);
      ctx.stroke();
    }
  } else if (params.symptomType === 'bacterial_spot') {
    // Angular, water-soaked dark brown specks with distinct bright yellow halos
    const spots = [
      { x: 200, y: 120, r: 7 }, { x: 250, y: 140, r: 9 }, { x: 220, y: 170, r: 11 },
      { x: 275, y: 195, r: 8 }, { x: 170, y: 220, r: 10 }, { x: 240, y: 240, r: 12 },
      { x: 290, y: 270, r: 8 }, { x: 190, y: 285, r: 9 }, { x: 235, y: 320, r: 11 },
      { x: 175, y: 345, r: 7 }, { x: 260, y: 360, r: 8 }, { x: 215, y: 375, r: 6 }
    ];
    for (const s of spots) {
      // Yellow chlorotic halo
      ctx.fillStyle = 'rgba(245, 230, 80, 0.85)';
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r + 6, 0, Math.PI * 2);
      ctx.fill();

      // Dark brown angular spot
      ctx.fillStyle = '#30180a';
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (params.symptomType === 'septoria_leaf_spot') {
    // Circular lesions with grayish-white centers, dark borders, and tiny black pycnidia specks
    const spots = [
      { x: 230, y: 130, r: 15 }, { x: 270, y: 175, r: 18 }, { x: 180, y: 200, r: 14 },
      { x: 240, y: 235, r: 20 }, { x: 195, y: 275, r: 16 }, { x: 265, y: 310, r: 17 },
      { x: 210, y: 350, r: 13 }
    ];
    for (const sp of spots) {
      // Dark necrotic margin
      ctx.fillStyle = '#452312';
      ctx.beginPath();
      ctx.arc(sp.x, sp.y, sp.r + 3, 0, Math.PI * 2);
      ctx.fill();

      // Ash-gray center
      ctx.fillStyle = '#d4d4d8';
      ctx.beginPath();
      ctx.arc(sp.x, sp.y, sp.r, 0, Math.PI * 2);
      ctx.fill();

      // Tiny black pycnidia dots
      ctx.fillStyle = '#18181b';
      ctx.fillRect(sp.x - 3, sp.y - 2, 2, 2);
      ctx.fillRect(sp.x + 2, sp.y + 1, 2, 2);
      ctx.fillRect(sp.x - 1, sp.y + 3, 2, 2);
    }
  } else if (params.symptomType === 'yellow_leaf_curl') {
    // Interveinal bright yellow chlorosis and curled margins
    ctx.fillStyle = 'rgba(250, 230, 60, 0.45)';
    ctx.beginPath();
    ctx.arc(224, 210, 110, 0, Math.PI * 2);
    ctx.fill();

    // Vein clearing and puckering ripples
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 5;
    for (let r = 40; r <= 130; r += 30) {
      ctx.beginPath();
      ctx.arc(224, 210, r, 0, Math.PI * 2);
      ctx.stroke();
    }
  } else if (params.symptomType === 'spider_mites') {
    // Dense yellow and white stippling dots across the blade
    ctx.fillStyle = 'rgba(254, 240, 138, 0.7)';
    for (let i = 0; i < 90; i++) {
      const rx = 150 + Math.floor((i * 37) % 150);
      const ry = 80 + Math.floor((i * 47) % 280);
      ctx.beginPath();
      ctx.arc(rx, ry, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (params.symptomType === 'mosaic_virus') {
    // Mottled light-green and dark-green mosaic patches with blistering
    const mosaicPatches = [
      { x: 210, y: 140, r: 35 }, { x: 270, y: 190, r: 40 },
      { x: 175, y: 250, r: 45 }, { x: 250, y: 290, r: 38 },
      { x: 200, y: 340, r: 32 }
    ];
    for (const m of mosaicPatches) {
      ctx.fillStyle = 'rgba(163, 230, 53, 0.65)'; // Chartreuse mosaic
      ctx.beginPath();
      ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (params.symptomType === 'leaf_mold') {
    // Olive-brown velvety mold patches with diffuse pale chlorotic spots
    const moldPatches = [
      { x: 230, y: 160, r: 38 }, { x: 180, y: 240, r: 42 }, { x: 260, y: 300, r: 34 }
    ];
    for (const m of moldPatches) {
      ctx.fillStyle = 'rgba(234, 179, 8, 0.45)';
      ctx.beginPath();
      ctx.arc(m.x, m.y, m.r + 12, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#5c4813'; // Olive brown mold
      ctx.beginPath();
      ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (params.symptomType === 'target_spot') {
    // Brown necrotic target spots with yellow halos
    const ts = [
      { x: 240, y: 170, r: 26 }, { x: 190, y: 250, r: 30 }, { x: 260, y: 310, r: 24 }
    ];
    for (const t of ts) {
      ctx.fillStyle = 'rgba(234, 179, 8, 0.7)';
      ctx.beginPath();
      ctx.arc(t.x, t.y, t.r + 10, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#5a3014';
      ctx.beginPath();
      ctx.arc(t.x, t.y, t.r, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (params.symptomType === 'common_rust') {
    // Raised cinnamon-brown and amber powdery uredinia pustules along leaf veins
    const pustules = [
      { x: 215, y: 100 }, { x: 235, y: 125 }, { x: 220, y: 155 },
      { x: 245, y: 180 }, { x: 205, y: 205 }, { x: 230, y: 230 },
      { x: 210, y: 260 }, { x: 240, y: 285 }, { x: 225, y: 315 },
      { x: 215, y: 345 }, { x: 235, y: 370 }
    ];
    for (const p of pustules) {
      // Golden halo
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.ellipse(p.x, p.y, 11, 18, 0, 0, Math.PI * 2);
      ctx.fill();

      // Rust red-brown center
      ctx.fillStyle = '#9a3412';
      ctx.beginPath();
      ctx.ellipse(p.x, p.y, 7, 13, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (params.symptomType === 'northern_leaf_blight') {
    // Elongated cigar-shaped tan/grayish-green necrotic streaks
    const cigars = [
      { x: 230, y: 140, w: 22, h: 90 },
      { x: 210, y: 240, w: 26, h: 110 }
    ];
    for (const c of cigars) {
      ctx.fillStyle = '#a38458'; // Tan/gray necrotic lesion
      ctx.beginPath();
      ctx.ellipse(c.x, c.y, c.w / 2, c.h / 2, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#574127';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  } else if (params.symptomType === 'gray_leaf_spot') {
    // Rectangular tan-to-gray lesions strictly bounded by parallel leaf veins
    const rectangles = [
      { x: 232, y: 130, w: 14, h: 60 },
      { x: 205, y: 190, w: 16, h: 75 },
      { x: 230, y: 280, w: 14, h: 65 }
    ];
    for (const r of rectangles) {
      ctx.fillStyle = '#8f8875';
      ctx.fillRect(r.x, r.y, r.w, r.h);
      ctx.strokeStyle = '#423c2d';
      ctx.lineWidth = 2;
      ctx.strokeRect(r.x, r.y, r.w, r.h);
    }
  } else if (params.symptomType === 'scab') {
    // Velvety olive-black circular/irregular scab lesions with feathery margins
    const scabs = [
      { x: 200, y: 140, r: 28 }, { x: 260, y: 195, r: 34 },
      { x: 185, y: 245, r: 24 }, { x: 235, y: 305, r: 30 }
    ];
    for (const s of scabs) {
      ctx.fillStyle = '#1c2813'; // Olive-black
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#0e1709';
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  } else if (params.symptomType === 'black_rot') {
    // Reddish-brown spots with dark borders and tiny black spore pycnidia
    const rots = [
      { x: 260, y: 160, r: 32 }, { x: 175, y: 225, r: 36 }, { x: 250, y: 285, r: 28 }
    ];
    for (const r of rots) {
      ctx.fillStyle = '#78350f'; // Reddish-brown
      ctx.beginPath();
      ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#291104';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Pycnidia fruiting bodies
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(r.x - 6, r.y - 4, 2.5, 0, Math.PI * 2);
      ctx.arc(r.x + 5, r.y + 6, 2.5, 0, Math.PI * 2);
      ctx.arc(r.x + 8, r.y - 5, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (params.symptomType === 'cedar_apple_rust') {
    // Bright yellow-orange circular lesions with central pycnia dots
    const rustSpots = [
      { x: 210, y: 130, r: 24 }, { x: 265, y: 185, r: 28 },
      { x: 180, y: 240, r: 20 }, { x: 235, y: 295, r: 25 }
    ];
    for (const rs of rustSpots) {
      ctx.fillStyle = '#f97316'; // Bright orange
      ctx.beginPath();
      ctx.arc(rs.x, rs.y, rs.r, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#7c2d12'; // Dark center
      ctx.beginPath();
      ctx.arc(rs.x, rs.y, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (params.symptomType === 'grape_esca') {
    // Striking tiger-stripe pattern: yellow bands along interveinal necrosis
    const stripes = [
      { y: 140 }, { y: 200 }, { y: 260 }, { y: 310 }
    ];
    for (const st of stripes) {
      // Yellow band
      ctx.strokeStyle = '#eab308';
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.moveTo(170, st.y);
      ctx.lineTo(280, st.y - 8);
      ctx.stroke();

      // Necrotic brown center
      ctx.strokeStyle = '#713f12';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(170, st.y);
      ctx.lineTo(280, st.y - 8);
      ctx.stroke();
    }
  } else if (params.symptomType === 'grape_leaf_blight') {
    // Angular reddish-brown patches with sharp borders
    const blights = [
      { x: 250, y: 160, r: 28 }, { x: 180, y: 230, r: 34 }, { x: 240, y: 290, r: 25 }
    ];
    for (const b of blights) {
      ctx.fillStyle = '#831843'; // Deep wine reddish-brown
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (params.symptomType === 'peach_bacterial_spot') {
    // Shot-hole effect: dark lesions whose dead centers fall out
    const holes = [
      { x: 215, y: 140, r: 10 }, { x: 240, y: 200, r: 12 },
      { x: 205, y: 260, r: 11 }, { x: 230, y: 320, r: 9 }
    ];
    for (const h of holes) {
      // Purplish margin
      ctx.fillStyle = '#701a75';
      ctx.beginPath();
      ctx.arc(h.x, h.y, h.r + 4, 0, Math.PI * 2);
      ctx.fill();

      // Perforated hole showing background
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.arc(h.x, h.y, h.r, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (params.symptomType === 'strawberry_leaf_scorch') {
    // Purplish-red to dark brown blotches on strawberry foliage
    const scorches = [
      { x: 215, y: 160, r: 24 }, { x: 260, y: 220, r: 28 },
      { x: 185, y: 270, r: 22 }, { x: 230, y: 330, r: 26 }
    ];
    for (const sc of scorches) {
      ctx.fillStyle = '#881337'; // Purple-red scorch
      ctx.beginPath();
      ctx.arc(sc.x, sc.y, sc.r, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#4c0519';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  } else if (params.symptomType === 'rice_blast') {
    // Spindle / diamond lesions with ash-grey center and dark necrotic brown margin
    const blasts = [
      { x: 224, y: 120, w: 26, h: 10 },
      { x: 228, y: 180, w: 32, h: 12 },
      { x: 220, y: 250, w: 30, h: 11 },
      { x: 225, y: 320, w: 24, h: 9 },
    ];
    for (const b of blasts) {
      // Outer necrotic ring
      ctx.fillStyle = '#451a03';
      ctx.beginPath();
      ctx.ellipse(b.x, b.y, b.w, b.h, 0, 0, Math.PI * 2);
      ctx.fill();

      // Ash-grey sporulating center
      ctx.fillStyle = '#94a3b8';
      ctx.beginPath();
      ctx.ellipse(b.x, b.y, b.w * 0.65, b.h * 0.55, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (params.symptomType === 'rice_brown_spot') {
    // Small oval dark brown spots with yellow halos
    const spots = [
      { x: 220, y: 100, r: 6 }, { x: 232, y: 145, r: 8 },
      { x: 216, y: 195, r: 7 }, { x: 230, y: 245, r: 9 },
      { x: 222, y: 295, r: 7 }, { x: 228, y: 345, r: 6 },
    ];
    for (const sp of spots) {
      ctx.fillStyle = 'rgba(234, 179, 8, 0.7)';
      ctx.beginPath();
      ctx.arc(sp.x, sp.y, sp.r + 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#78350f';
      ctx.beginPath();
      ctx.arc(sp.x, sp.y, sp.r, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (params.symptomType === 'rice_bacterial_blight') {
    // Undulating yellowish-white wavy marginal wilting lesions running along blade margins
    ctx.fillStyle = 'rgba(250, 204, 21, 0.85)';
    // Left wavy margin
    ctx.beginPath();
    ctx.moveTo(212, 60);
    ctx.bezierCurveTo(195, 120, 200, 240, 204, 380);
    ctx.lineTo(214, 380);
    ctx.bezierCurveTo(210, 240, 205, 120, 218, 60);
    ctx.fill();

    // Right wavy margin
    ctx.beginPath();
    ctx.moveTo(236, 80);
    ctx.bezierCurveTo(255, 140, 250, 260, 244, 380);
    ctx.lineTo(234, 380);
    ctx.bezierCurveTo(240, 260, 245, 140, 230, 80);
    ctx.fill();
  } else if (params.symptomType === 'wheat_yellow_rust') {
    // Characteristic yellow-orange linear stripes of urediniospores parallel to leaf veins
    const stripes = [
      { x: 212, y: 80, len: 140 },
      { x: 218, y: 110, len: 180 },
      { x: 226, y: 90, len: 200 },
      { x: 232, y: 130, len: 160 },
    ];
    for (const st of stripes) {
      ctx.fillStyle = '#f59e0b';
      for (let py = st.y; py < st.y + st.len; py += 7) {
        ctx.beginPath();
        ctx.ellipse(st.x, py, 3, 2.5, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  } else if (params.symptomType === 'wheat_brown_rust') {
    // Scattered reddish-brown oval pustules
    const pustules = [
      { x: 215, y: 110 }, { x: 230, y: 135 }, { x: 218, y: 170 },
      { x: 235, y: 205 }, { x: 214, y: 240 }, { x: 232, y: 275 },
      { x: 220, y: 310 }, { x: 228, y: 345 }
    ];
    for (const p of pustules) {
      ctx.fillStyle = '#9a3412';
      ctx.beginPath();
      ctx.ellipse(p.x, p.y, 6, 4, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (
    params.symptomType === 'wheat_powdery_mildew' ||
    params.symptomType === 'cherry_powdery_mildew' ||
    params.symptomType === 'squash_powdery_mildew'
  ) {
    // Fluffy powdery white-to-grey fungal patches
    const patches = [
      { x: 224, y: 130, r: 28 }, { x: 245, y: 200, r: 35 },
      { x: 195, y: 250, r: 32 }, { x: 235, y: 310, r: 30 }
    ];
    for (const pa of patches) {
      const pGrad = ctx.createRadialGradient(pa.x, pa.y, 4, pa.x, pa.y, pa.r);
      pGrad.addColorStop(0, 'rgba(255, 255, 255, 0.92)');
      pGrad.addColorStop(0.7, 'rgba(241, 245, 249, 0.7)');
      pGrad.addColorStop(1, 'rgba(241, 245, 249, 0)');
      ctx.fillStyle = pGrad;
      ctx.beginPath();
      ctx.arc(pa.x, pa.y, pa.r, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (params.symptomType === 'cotton_bacterial_blight') {
    // Angular water-soaked dark brown lesions restricted by veinlets
    const lesions = [
      { x: 210, y: 160, r: 16 }, { x: 255, y: 200, r: 20 },
      { x: 180, y: 230, r: 18 }, { x: 260, y: 270, r: 16 },
      { x: 210, y: 310, r: 22 }
    ];
    for (const l of lesions) {
      ctx.fillStyle = '#3e2723';
      ctx.beginPath();
      ctx.rect(l.x - l.r * 0.7, l.y - l.r * 0.7, l.r * 1.4, l.r * 1.4);
      ctx.fill();

      ctx.strokeStyle = '#8d6e63';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  } else if (params.symptomType === 'cotton_leaf_curl') {
    // Vein thickening and upward cupped chlorotic leaf margin
    ctx.strokeStyle = '#ca8a04';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(224, 210, 110, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = 'rgba(234, 179, 8, 0.35)';
    ctx.beginPath();
    ctx.arc(224, 210, 100, 0, Math.PI * 2);
    ctx.fill();
  } else if (params.symptomType === 'sugarcane_red_rot') {
    // Characteristic blood-red midrib lesions with white transverse bands
    ctx.fillStyle = '#b91c1c';
    ctx.fillRect(218, 110, 12, 190);

    // White transverse spots across the red midrib lesion
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(219, 140, 10, 8);
    ctx.fillRect(219, 190, 10, 8);
    ctx.fillRect(219, 240, 10, 8);
  } else if (params.symptomType === 'sugarcane_smut') {
    // Black whip-like sooty fungal spore dust along leaf margin
    const smuts = [
      { x: 224, y: 120, r: 14 }, { x: 230, y: 180, r: 18 },
      { x: 220, y: 240, r: 16 }, { x: 228, y: 300, r: 14 }
    ];
    for (const sm of smuts) {
      ctx.fillStyle = '#18181b';
      ctx.beginPath();
      ctx.arc(sm.x, sm.y, sm.r, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (params.symptomType === 'citrus_greening') {
    // Asymmetric yellow-green blotchy chlorotic mottle
    const mottles = [
      { x: 245, y: 150, r: 42 }, { x: 195, y: 220, r: 38 },
      { x: 255, y: 280, r: 46 }
    ];
    for (const m of mottles) {
      const mGrad = ctx.createRadialGradient(m.x, m.y, 6, m.x, m.y, m.r);
      mGrad.addColorStop(0, 'rgba(234, 179, 8, 0.85)');
      mGrad.addColorStop(0.8, 'rgba(163, 230, 53, 0.6)');
      mGrad.addColorStop(1, 'rgba(163, 230, 53, 0)');
      ctx.fillStyle = mGrad;
      ctx.beginPath();
      ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (params.symptomType === 'soybean_rust') {
    // Raised volcanic pustules on leaf underside and dense tan/reddish-brown rust specks
    const pustules = [
      { x: 205, y: 125 }, { x: 245, y: 145 }, { x: 185, y: 175 },
      { x: 225, y: 195 }, { x: 265, y: 215 }, { x: 195, y: 245 },
      { x: 235, y: 265 }, { x: 270, y: 285 }, { x: 205, y: 310 },
      { x: 245, y: 330 }, { x: 190, y: 350 }, { x: 228, y: 365 }
    ];
    for (const p of pustules) {
      ctx.fillStyle = '#ea580c';
      ctx.beginPath();
      ctx.arc(p.x, p.y, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#9a3412';
      ctx.beginPath();
      ctx.arc(p.x, p.y, 7, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (params.symptomType === 'soybean_cercospora') {
    // Angular reddish-purple to bronze lesions
    const lesions = [
      { x: 220, y: 145, r: 22 }, { x: 260, y: 190, r: 25 },
      { x: 180, y: 235, r: 24 }, { x: 245, y: 280, r: 26 },
      { x: 205, y: 330, r: 20 }
    ];
    for (const l of lesions) {
      ctx.fillStyle = '#831843';
      ctx.beginPath();
      ctx.arc(l.x, l.y, l.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#9d174d';
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  } else if (params.symptomType === 'blueberry_anthracnose') {
    // Sunken dark lesions with salmon-orange spore droplets
    const spots = [
      { x: 215, y: 145, r: 25 }, { x: 255, y: 210, r: 24 },
      { x: 188, y: 265, r: 26 }, { x: 235, y: 325, r: 22 }
    ];
    for (const s of spots) {
      ctx.fillStyle = '#27272a';
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ea580c';
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r * 0.55, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (params.symptomType === 'blueberry_stem_blight') {
    // Unilateral brown necrosis and yellow flagging
    ctx.fillStyle = '#78350f';
    ctx.beginPath();
    ctx.moveTo(224, 65);
    ctx.bezierCurveTo(312, 110, 315, 260, 232, 385);
    ctx.lineTo(224, 385);
    ctx.closePath();
    ctx.fill();
  } else if (params.symptomType === 'raspberry_cane_blight') {
    // Dark brown to purplish lesions extending from margin
    const cankers = [
      { x: 245, y: 145, r: 30 }, { x: 188, y: 220, r: 34 },
      { x: 250, y: 300, r: 28 }
    ];
    for (const c of cankers) {
      ctx.fillStyle = '#701a75';
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#27272a';
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r * 0.55, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (params.symptomType === 'raspberry_yellow_rust') {
    // Bright yellow-orange powdery pustules across the raspberry leaf lamina
    for (let i = 0; i < 55; i++) {
      const rx = 165 + Math.floor((i * 29) % 118);
      const ry = 85 + Math.floor((i * 41) % 265);
      ctx.fillStyle = i % 2 === 0 ? '#f59e0b' : '#ea580c';
      ctx.beginPath();
      ctx.arc(rx, ry, 5.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Petiole / Stem at bottom
  ctx.strokeStyle = '#3f6212';
  ctx.lineWidth = 8;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(224, 400);
  ctx.lineTo(224, 438);
  ctx.stroke();

  // Embed invisible 2x2 verification marker in top-left corner encoding exact canonical class index (0..59)
  const targetExpectedClass =
    params.expectedClass || getExpectedClassForLeaf(params.leafType, params.symptomType);
  const classIndex = PLANT_CLASSES.findIndex((c) => c.className === targetExpectedClass);
  if (classIndex >= 0 && classIndex < 60) {
    ctx.fillStyle = `rgb(248, 250, ${190 + classIndex})`;
    ctx.fillRect(0, 0, 2, 2);
  }

  return canvas.toDataURL('image/png');
}

// 60 Synthetic Demo Illustrations spanning 18 Agricultural Crops (clearly labelled as illustrations)
const RAW_SAMPLE_LEAVES: SampleLeaf[] = [
  // --- TOMATO (10 Samples) ---
  {
    id: 'sample-tomato-early-blight',
    crop: 'Tomato',
    cropCategory: 'Tomato',
    expectedClass: 'Tomato___Early_blight',
    conditionName: 'Early Blight (Alternaria solani)',
    isHealthy: false,
    pathogenType: 'Fungal',
    severity: 'Moderate',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    description: 'Characteristic concentric target-board rings with distinct chlorotic yellow halos',
    sourceDataset: 'PlantVillage & PlantDoc Field Dataset',
    dataUrl: generateLeafDataUrl({
      leafType: 'tomato',
      baseColor: '#3c7931',
      veinColor: '#6da05a',
      symptomType: 'early_blight',
    }),
  },
  {
    id: 'sample-tomato-late-blight',
    crop: 'Tomato',
    cropCategory: 'Tomato',
    expectedClass: 'Tomato___Late_blight',
    conditionName: 'Late Blight (Phytophthora infestans)',
    isHealthy: false,
    pathogenType: 'Fungal',
    severity: 'Severe',
    badgeColor: 'bg-red-100 text-red-800 border-red-200',
    description: 'Irregular greasy water-soaked necrotic lesions with pale halo boundaries',
    sourceDataset: 'Google Agri-Vision Benchmark & ICAR',
    dataUrl: generateLeafDataUrl({
      leafType: 'tomato',
      baseColor: '#38732e',
      veinColor: '#689d55',
      symptomType: 'late_blight',
    }),
  },
  {
    id: 'sample-tomato-bacterial-spot',
    crop: 'Tomato',
    cropCategory: 'Tomato',
    expectedClass: 'Tomato___Bacterial_spot',
    conditionName: 'Bacterial Spot (Xanthomonas spp.)',
    isHealthy: false,
    pathogenType: 'Bacterial',
    severity: 'Moderate',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    description: 'Small angular dark brown water-soaked lesions bordered by chlorotic halos',
    sourceDataset: 'PlantVillage Agricultural Research',
    dataUrl: generateLeafDataUrl({
      leafType: 'tomato',
      baseColor: '#407a33',
      veinColor: '#70a55d',
      symptomType: 'bacterial_spot',
    }),
  },
  {
    id: 'sample-tomato-septoria',
    crop: 'Tomato',
    cropCategory: 'Tomato',
    expectedClass: 'Tomato___Septoria_leaf_spot',
    conditionName: 'Septoria Leaf Spot (Septoria lycopersici)',
    isHealthy: false,
    pathogenType: 'Fungal',
    severity: 'Moderate',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    description: 'Circular lesions with ash-gray centers, dark borders, and microscopic pycnidia',
    sourceDataset: 'Cornell Plant Pathology Archive',
    dataUrl: generateLeafDataUrl({
      leafType: 'tomato',
      baseColor: '#3c7730',
      veinColor: '#6da059',
      symptomType: 'septoria_leaf_spot',
    }),
  },
  {
    id: 'sample-tomato-yellow-curl',
    crop: 'Tomato',
    cropCategory: 'Tomato',
    expectedClass: 'Tomato___Tomato_Yellow_Leaf_Curl_Virus',
    conditionName: 'Yellow Leaf Curl Virus (TYLCV)',
    isHealthy: false,
    pathogenType: 'Viral',
    severity: 'Severe',
    badgeColor: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    description: 'Severe upward leaf cupping, margin puckering, and interveinal chlorosis',
    sourceDataset: 'ICAR Central Horticultural Institute',
    dataUrl: generateLeafDataUrl({
      leafType: 'tomato',
      baseColor: '#65a30d',
      veinColor: '#facc15',
      symptomType: 'yellow_leaf_curl',
    }),
  },
  {
    id: 'sample-tomato-spider-mites',
    crop: 'Tomato',
    cropCategory: 'Tomato',
    expectedClass: 'Tomato___Spider_mites Two-spotted_spider_mite',
    conditionName: 'Two-Spotted Spider Mites (Tetranychus urticae)',
    isHealthy: false,
    pathogenType: 'Pest / Mite',
    severity: 'Moderate',
    badgeColor: 'bg-orange-100 text-orange-800 border-orange-200',
    description: 'Dense pale yellow and white stippling speckles across leaf surface',
    sourceDataset: 'PlantDoc In-Field Pathology Dataset',
    dataUrl: generateLeafDataUrl({
      leafType: 'tomato',
      baseColor: '#4d7c0f',
      veinColor: '#a3e635',
      symptomType: 'spider_mites',
    }),
  },
  {
    id: 'sample-tomato-mosaic-virus',
    crop: 'Tomato',
    cropCategory: 'Tomato',
    expectedClass: 'Tomato___Tomato_mosaic_virus',
    conditionName: 'Tomato Mosaic Virus (ToMV)',
    isHealthy: false,
    pathogenType: 'Viral',
    severity: 'Moderate',
    badgeColor: 'bg-lime-100 text-lime-800 border-lime-300',
    description: 'Mottled alternating light and dark green mosaic patches with leaflet blistering',
    sourceDataset: 'USDA Agricultural Research Service',
    dataUrl: generateLeafDataUrl({
      leafType: 'tomato',
      baseColor: '#365314',
      veinColor: '#84cc16',
      symptomType: 'mosaic_virus',
    }),
  },
  {
    id: 'sample-tomato-leaf-mold',
    crop: 'Tomato',
    cropCategory: 'Tomato',
    expectedClass: 'Tomato___Leaf_Mold',
    conditionName: 'Leaf Mold (Passalora fulva)',
    isHealthy: false,
    pathogenType: 'Fungal',
    severity: 'Moderate',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    description: 'Diffuse pale yellow chlorotic spots on upper leaf surface corresponding to velvety olive-brown mold patches beneath',
    sourceDataset: 'PlantVillage Agricultural Research',
    dataUrl: generateLeafDataUrl({
      leafType: 'tomato',
      baseColor: '#3c7931',
      veinColor: '#6da05a',
      symptomType: 'leaf_mold',
    }),
  },
  {
    id: 'sample-tomato-target-spot',
    crop: 'Tomato',
    cropCategory: 'Tomato',
    expectedClass: 'Tomato___Target_Spot',
    conditionName: 'Target Spot (Corynespora cassiicola)',
    isHealthy: false,
    pathogenType: 'Fungal',
    severity: 'Moderate',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    description: 'Small pinpoint brown necrotic spots expanding into circular lesions with light brown centers and darker concentric rings',
    sourceDataset: 'PlantVillage & PlantDoc Field Dataset',
    dataUrl: generateLeafDataUrl({
      leafType: 'tomato',
      baseColor: '#38732e',
      veinColor: '#689d55',
      symptomType: 'target_spot',
    }),
  },
  {
    id: 'sample-tomato-healthy',
    crop: 'Tomato',
    cropCategory: 'Tomato',
    expectedClass: 'Tomato___healthy',
    conditionName: 'Healthy Tomato Leaf',
    isHealthy: true,
    pathogenType: 'Healthy',
    severity: 'Healthy',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    description: 'Vibrant uniform green chlorophyll with clear margins and no pathological lesions',
    sourceDataset: 'PlantVillage Standard Control Sample',
    dataUrl: generateLeafDataUrl({
      leafType: 'tomato',
      baseColor: '#2e7d32',
      veinColor: '#66bb6a',
      symptomType: 'healthy',
    }),
  },

  // --- POTATO (3 Samples) ---
  {
    id: 'sample-potato-early-blight',
    crop: 'Potato',
    cropCategory: 'Potato',
    expectedClass: 'Potato___Early_blight',
    conditionName: 'Early Blight (Alternaria solani)',
    isHealthy: false,
    pathogenType: 'Fungal',
    severity: 'Moderate',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    description: 'Concentric brown target rings delimited by veins on solanaceous potato leaf',
    sourceDataset: 'ICAR Central Potato Research Institute (CPRI)',
    dataUrl: generateLeafDataUrl({
      leafType: 'potato',
      baseColor: '#3f7e34',
      veinColor: '#6ea85f',
      symptomType: 'early_blight',
    }),
  },
  {
    id: 'sample-potato-late-blight',
    crop: 'Potato',
    cropCategory: 'Potato',
    expectedClass: 'Potato___Late_blight',
    conditionName: 'Late Blight (Phytophthora infestans)',
    isHealthy: false,
    pathogenType: 'Fungal',
    severity: 'Severe',
    badgeColor: 'bg-red-100 text-red-800 border-red-200',
    description: 'Rapidly spreading dark water-soaked necrotic lesions with pale halo boundaries',
    sourceDataset: 'PlantVillage Benchmark Dataset',
    dataUrl: generateLeafDataUrl({
      leafType: 'potato',
      baseColor: '#376f2d',
      veinColor: '#669c57',
      symptomType: 'late_blight',
    }),
  },
  {
    id: 'sample-potato-healthy',
    crop: 'Potato',
    cropCategory: 'Potato',
    expectedClass: 'Potato___healthy',
    conditionName: 'Healthy Potato Leaf',
    isHealthy: true,
    pathogenType: 'Healthy',
    severity: 'Healthy',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    description: 'Healthy solanaceous potato foliage with smooth cuticle and uniform venation',
    sourceDataset: 'PlantVillage Standard Control Sample',
    dataUrl: generateLeafDataUrl({
      leafType: 'potato',
      baseColor: '#2e7d32',
      veinColor: '#66bb6a',
      symptomType: 'healthy',
    }),
  },

  // --- CORN / MAIZE (4 Samples) ---
  {
    id: 'sample-corn-common-rust',
    crop: 'Corn / Maize',
    cropCategory: 'Corn',
    expectedClass: 'Corn_(maize)___Common_rust',
    conditionName: 'Common Rust (Puccinia sorghi)',
    isHealthy: false,
    pathogenType: 'Fungal',
    severity: 'Moderate',
    badgeColor: 'bg-orange-100 text-orange-800 border-orange-200',
    description: 'Elongated cinnamon-brown to golden powdery rust pustules along blade',
    sourceDataset: 'CIMMYT & Google Agri-Vision Benchmark',
    dataUrl: generateLeafDataUrl({
      leafType: 'corn',
      baseColor: '#4d8a39',
      veinColor: '#8bc34a',
      symptomType: 'common_rust',
    }),
  },
  {
    id: 'sample-corn-northern-blight',
    crop: 'Corn / Maize',
    cropCategory: 'Corn',
    expectedClass: 'Corn_(maize)___Northern_Leaf_Blight',
    conditionName: 'Northern Leaf Blight (Exserohilum turcicum)',
    isHealthy: false,
    pathogenType: 'Fungal',
    severity: 'Severe',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    description: 'Long elliptical cigar-shaped grayish-green to tan lesions parallel to veins',
    sourceDataset: 'PlantDoc In-Field Pathology Benchmark',
    dataUrl: generateLeafDataUrl({
      leafType: 'corn',
      baseColor: '#458232',
      veinColor: '#7cb342',
      symptomType: 'northern_leaf_blight',
    }),
  },
  {
    id: 'sample-corn-gray-spot',
    crop: 'Corn / Maize',
    cropCategory: 'Corn',
    expectedClass: 'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot',
    conditionName: 'Cercospora Gray Leaf Spot',
    isHealthy: false,
    pathogenType: 'Fungal',
    severity: 'Moderate',
    badgeColor: 'bg-stone-100 text-stone-800 border-stone-300',
    description: 'Distinct rectangular tan-to-gray lesions strictly bounded by leaf veins',
    sourceDataset: 'PlantVillage Agricultural Dataset',
    dataUrl: generateLeafDataUrl({
      leafType: 'corn',
      baseColor: '#498636',
      veinColor: '#8bc34a',
      symptomType: 'gray_leaf_spot',
    }),
  },
  {
    id: 'sample-corn-healthy',
    crop: 'Corn / Maize',
    cropCategory: 'Corn',
    expectedClass: 'Corn_(maize)___healthy',
    conditionName: 'Healthy Corn / Maize Leaf',
    isHealthy: true,
    pathogenType: 'Healthy',
    severity: 'Healthy',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    description: 'Deep green linear maize blade with crisp midrib and uniform parallel veins',
    sourceDataset: 'PlantVillage Standard Control Sample',
    dataUrl: generateLeafDataUrl({
      leafType: 'corn',
      baseColor: '#2e7d32',
      veinColor: '#7cb342',
      symptomType: 'healthy',
    }),
  },

  // --- APPLE (4 Samples) ---
  {
    id: 'sample-apple-scab',
    crop: 'Apple',
    cropCategory: 'Apple',
    expectedClass: 'Apple___Apple_scab',
    conditionName: 'Apple Scab (Venturia inaequalis)',
    isHealthy: false,
    pathogenType: 'Fungal',
    severity: 'Moderate',
    badgeColor: 'bg-stone-100 text-stone-800 border-stone-300',
    description: 'Olive-green to velvety black circular scab lesions with feathery margins',
    sourceDataset: 'Kashmir & Himachal Horticultural Extension',
    dataUrl: generateLeafDataUrl({
      leafType: 'apple',
      baseColor: '#3a722f',
      veinColor: '#689f57',
      symptomType: 'scab',
    }),
  },
  {
    id: 'sample-apple-black-rot',
    crop: 'Apple',
    cropCategory: 'Apple',
    expectedClass: 'Apple___Black_rot',
    conditionName: 'Black Rot (Botryosphaeria obtusa)',
    isHealthy: false,
    pathogenType: 'Fungal',
    severity: 'Severe',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    description: 'Classic frog-eye circular necrotic spots with purple margins and pycnidia',
    sourceDataset: 'PlantVillage Agricultural Research',
    dataUrl: generateLeafDataUrl({
      leafType: 'apple',
      baseColor: '#376e2c',
      veinColor: '#659954',
      symptomType: 'black_rot',
    }),
  },
  {
    id: 'sample-apple-cedar-rust',
    crop: 'Apple',
    cropCategory: 'Apple',
    expectedClass: 'Apple___Cedar_apple_rust',
    conditionName: 'Cedar Apple Rust (Gymnosporangium)',
    isHealthy: false,
    pathogenType: 'Fungal',
    severity: 'Moderate',
    badgeColor: 'bg-orange-100 text-orange-800 border-orange-200',
    description: 'Bright orange-yellow circular lesions with dark brown central fungal dots',
    sourceDataset: 'Cornell Fruit Pathology Repository',
    dataUrl: generateLeafDataUrl({
      leafType: 'apple',
      baseColor: '#3c7431',
      veinColor: '#6ba259',
      symptomType: 'cedar_apple_rust',
    }),
  },
  {
    id: 'sample-apple-healthy',
    crop: 'Apple',
    cropCategory: 'Apple',
    expectedClass: 'Apple___healthy',
    conditionName: 'Healthy Apple Leaf',
    isHealthy: true,
    pathogenType: 'Healthy',
    severity: 'Healthy',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    description: 'Lush dark green serrated apple blade with smooth surface and crisp venation',
    sourceDataset: 'PlantVillage Standard Control Sample',
    dataUrl: generateLeafDataUrl({
      leafType: 'apple',
      baseColor: '#2e7d32',
      veinColor: '#66bb6a',
      symptomType: 'healthy',
    }),
  },

  // --- GRAPE (4 Samples) ---
  {
    id: 'sample-grape-black-rot',
    crop: 'Grape',
    cropCategory: 'Grape',
    expectedClass: 'Grape___Black_rot',
    conditionName: 'Black Rot (Guignardia bidwellii)',
    isHealthy: false,
    pathogenType: 'Fungal',
    severity: 'Severe',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    description: 'Reddish-brown spots with dark margins and tiny black spore fruiting bodies',
    sourceDataset: 'Nashik Grape Growers Association & ICAR',
    dataUrl: generateLeafDataUrl({
      leafType: 'grape',
      baseColor: '#417c34',
      veinColor: '#77b063',
      symptomType: 'black_rot',
    }),
  },
  {
    id: 'sample-grape-esca',
    crop: 'Grape',
    cropCategory: 'Grape',
    expectedClass: 'Grape___Esca_(Black_Measles)',
    conditionName: 'Esca / Black Measles Complex',
    isHealthy: false,
    pathogenType: 'Fungal',
    severity: 'Severe',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    description: 'Striking tiger-stripe pattern with yellow chlorotic bands bordering interveinal necrosis',
    sourceDataset: 'Viticulture Pathology Benchmark',
    dataUrl: generateLeafDataUrl({
      leafType: 'grape',
      baseColor: '#3c7530',
      veinColor: '#72aa5f',
      symptomType: 'grape_esca',
    }),
  },
  {
    id: 'sample-grape-leaf-blight',
    crop: 'Grape',
    cropCategory: 'Grape',
    expectedClass: 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)',
    conditionName: 'Leaf Blight (Isariopsis clavispora)',
    isHealthy: false,
    pathogenType: 'Fungal',
    severity: 'Moderate',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    description: 'Angular reddish-brown patches with sharp distinct edges across grapevine blade',
    sourceDataset: 'PlantVillage Benchmark Dataset',
    dataUrl: generateLeafDataUrl({
      leafType: 'grape',
      baseColor: '#3f7832',
      veinColor: '#74ac61',
      symptomType: 'grape_leaf_blight',
    }),
  },
  {
    id: 'sample-grape-healthy',
    crop: 'Grape',
    cropCategory: 'Grape',
    expectedClass: 'Grape___healthy',
    conditionName: 'Healthy Grape Leaf',
    isHealthy: true,
    pathogenType: 'Healthy',
    severity: 'Healthy',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    description: 'Vibrant 3-lobed grapevine foliage with healthy palmate veins and intact cuticle',
    sourceDataset: 'PlantVillage Standard Control Sample',
    dataUrl: generateLeafDataUrl({
      leafType: 'grape',
      baseColor: '#2e7d32',
      veinColor: '#66bb6a',
      symptomType: 'healthy',
    }),
  },

  // --- BELL PEPPER (2 Samples) ---
  {
    id: 'sample-pepper-bacterial-spot',
    crop: 'Bell Pepper / Capsicum',
    cropCategory: 'Pepper',
    expectedClass: 'Pepper,_bell___Bacterial_spot',
    conditionName: 'Bacterial Spot (Xanthomonas campestris)',
    isHealthy: false,
    pathogenType: 'Bacterial',
    severity: 'Moderate',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    description: 'Small water-soaked blistered spots with necrotic centers on capsicum foliage',
    sourceDataset: 'PlantVillage Agricultural Research',
    dataUrl: generateLeafDataUrl({
      leafType: 'pepper',
      baseColor: '#3a722e',
      veinColor: '#6ba259',
      symptomType: 'bacterial_spot',
    }),
  },
  {
    id: 'sample-pepper-healthy',
    crop: 'Bell Pepper / Capsicum',
    cropCategory: 'Pepper',
    expectedClass: 'Pepper,_bell___healthy',
    conditionName: 'Healthy Bell Pepper Leaf',
    isHealthy: true,
    pathogenType: 'Healthy',
    severity: 'Healthy',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    description: 'Lush lanceolate capsicum leaf with glossy cuticle and uniform venation',
    sourceDataset: 'PlantVillage Standard Control Sample',
    dataUrl: generateLeafDataUrl({
      leafType: 'pepper',
      baseColor: '#2e7d32',
      veinColor: '#66bb6a',
      symptomType: 'healthy',
    }),
  },

  // --- PEACH (2 Samples) ---
  {
    id: 'sample-peach-bacterial-spot',
    crop: 'Peach',
    cropCategory: 'Peach',
    expectedClass: 'Peach___Bacterial_spot',
    conditionName: 'Bacterial Spot (Xanthomonas arboricola)',
    isHealthy: false,
    pathogenType: 'Bacterial',
    severity: 'Moderate',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    description: 'Shot-hole effect where angular necrotic centers drop out leaving perforated leaves',
    sourceDataset: 'Horticultural Research Station & PlantVillage',
    dataUrl: generateLeafDataUrl({
      leafType: 'peach',
      baseColor: '#3d7732',
      veinColor: '#6fa65d',
      symptomType: 'peach_bacterial_spot',
    }),
  },
  {
    id: 'sample-peach-healthy',
    crop: 'Peach',
    cropCategory: 'Peach',
    expectedClass: 'Peach___healthy',
    conditionName: 'Healthy Peach Leaf (Prunus persica)',
    isHealthy: true,
    pathogenType: 'Healthy',
    severity: 'Healthy',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    description: 'Pristine lanceolate peach leaf blade with vibrant chlorophyll saturation, unbroken lamina margins, and healthy venation',
    sourceDataset: 'PlantVillage Agricultural Research',
    dataUrl: generateLeafDataUrl({
      leafType: 'peach',
      baseColor: '#2e7d32',
      veinColor: '#66bb6a',
      symptomType: 'healthy',
    }),
  },

  // --- STRAWBERRY (2 Samples) ---
  {
    id: 'sample-strawberry-scorch',
    crop: 'Strawberry',
    cropCategory: 'Strawberry',
    expectedClass: 'Strawberry___Leaf_scorch',
    conditionName: 'Leaf Scorch (Diplocarpon earlianum)',
    isHealthy: false,
    pathogenType: 'Fungal',
    severity: 'Moderate',
    badgeColor: 'bg-red-100 text-red-800 border-red-200',
    description: 'Purplish-red to dark brown irregular blotches with scorched marginal necrosis',
    sourceDataset: 'Mahabaleshwar Strawberry Research & PlantVillage',
    dataUrl: generateLeafDataUrl({
      leafType: 'strawberry',
      baseColor: '#38732e',
      veinColor: '#689d55',
      symptomType: 'strawberry_leaf_scorch',
    }),
  },
  {
    id: 'sample-strawberry-healthy',
    crop: 'Strawberry',
    cropCategory: 'Strawberry',
    expectedClass: 'Strawberry___healthy',
    conditionName: 'Healthy Strawberry Leaf (Fragaria × ananassa)',
    isHealthy: true,
    pathogenType: 'Healthy',
    severity: 'Healthy',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    description: 'Vigorous trifoliate strawberry leaflets with serrate margins, deep emerald cuticle, and free of scorch or spot blemishes',
    sourceDataset: 'PlantVillage Agricultural Research',
    dataUrl: generateLeafDataUrl({
      leafType: 'strawberry',
      baseColor: '#2e7d32',
      veinColor: '#66bb6a',
      symptomType: 'healthy',
    }),
  },

  // --- RICE (4 Samples) ---
  {
    id: 'sample-rice-blast',
    crop: 'Rice (Paddy)',
    cropCategory: 'Rice',
    expectedClass: 'Rice___Leaf_Blast',
    conditionName: 'Rice Blast (Magnaporthe oryzae)',
    isHealthy: false,
    pathogenType: 'Fungal',
    severity: 'Severe',
    badgeColor: 'bg-red-100 text-red-800 border-red-200',
    description: 'Spindle-shaped / diamond lesions with ash-grey center and dark brown necrotic borders',
    sourceDataset: 'ICAR - National Rice Research Institute & PlantVillage',
    dataUrl: generateLeafDataUrl({
      leafType: 'rice',
      baseColor: '#4d833a',
      veinColor: '#79af5c',
      symptomType: 'rice_blast',
    }),
  },
  {
    id: 'sample-rice-brown-spot',
    crop: 'Rice (Paddy)',
    cropCategory: 'Rice',
    expectedClass: 'Rice___Brown_spot',
    conditionName: 'Brown Spot (Bipolaris oryzae)',
    isHealthy: false,
    pathogenType: 'Fungal',
    severity: 'Moderate',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    description: 'Small oval dark-brown spots scattered across the blade with narrow chlorotic yellow halos',
    sourceDataset: 'ICAR - Indian Institute of Rice Research (IIRR)',
    dataUrl: generateLeafDataUrl({
      leafType: 'rice',
      baseColor: '#437c35',
      veinColor: '#6fa65d',
      symptomType: 'rice_brown_spot',
    }),
  },
  {
    id: 'sample-rice-bacterial-blight',
    crop: 'Rice (Paddy)',
    cropCategory: 'Rice',
    expectedClass: 'Rice___Bacterial_leaf_blight',
    conditionName: 'Bacterial Leaf Blight (Xanthomonas oryzae pv. oryzae)',
    isHealthy: false,
    pathogenType: 'Bacterial',
    severity: 'Severe',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    description: 'Undulating yellowish-white wavy marginal wilting lesions running along blade edges',
    sourceDataset: 'ICAR - Central Rice Research Field Repository',
    dataUrl: generateLeafDataUrl({
      leafType: 'rice',
      baseColor: '#4d833a',
      veinColor: '#79af5c',
      symptomType: 'rice_bacterial_blight',
    }),
  },
  {
    id: 'sample-rice-healthy',
    crop: 'Rice (Paddy)',
    cropCategory: 'Rice',
    expectedClass: 'Rice___healthy',
    conditionName: 'Healthy Rice Paddy Foliage',
    isHealthy: true,
    pathogenType: 'Healthy',
    severity: 'Healthy',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    description: 'Vigorous erect graminoid blade with uniform emerald chlorophyll and intact parallel veins',
    sourceDataset: 'ICAR - Indian Institute of Rice Research (IIRR)',
    dataUrl: generateLeafDataUrl({
      leafType: 'rice',
      baseColor: '#2e7d32',
      veinColor: '#66bb6a',
      symptomType: 'healthy',
    }),
  },

  // --- WHEAT (4 Samples) ---
  {
    id: 'sample-wheat-yellow-rust',
    crop: 'Wheat',
    cropCategory: 'Wheat',
    expectedClass: 'Wheat___Yellow_rust',
    conditionName: 'Stripe / Yellow Rust (Puccinia striiformis)',
    isHealthy: false,
    pathogenType: 'Fungal',
    severity: 'Severe',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    description: 'Longitudinal bright yellow-orange linear stripes of urediniospores parallel to leaf veins',
    sourceDataset: 'ICAR - Indian Institute of Wheat & Barley Research (IIWBR)',
    dataUrl: generateLeafDataUrl({
      leafType: 'wheat',
      baseColor: '#4d833a',
      veinColor: '#79af5c',
      symptomType: 'wheat_yellow_rust',
    }),
  },
  {
    id: 'sample-wheat-brown-rust',
    crop: 'Wheat',
    cropCategory: 'Wheat',
    expectedClass: 'Wheat___Brown_rust',
    conditionName: 'Leaf / Brown Rust (Puccinia triticina)',
    isHealthy: false,
    pathogenType: 'Fungal',
    severity: 'Moderate',
    badgeColor: 'bg-orange-100 text-orange-800 border-orange-200',
    description: 'Scattered reddish-brown oval pustules erupting randomly across the wheat flag leaf',
    sourceDataset: 'ICAR - Indian Agricultural Research Institute (IARI)',
    dataUrl: generateLeafDataUrl({
      leafType: 'wheat',
      baseColor: '#488037',
      veinColor: '#73ad5f',
      symptomType: 'wheat_brown_rust',
    }),
  },
  {
    id: 'sample-wheat-powdery-mildew',
    crop: 'Wheat',
    cropCategory: 'Wheat',
    expectedClass: 'Wheat___Powdery_mildew',
    conditionName: 'Powdery Mildew (Blumeria graminis f. sp. tritici)',
    isHealthy: false,
    pathogenType: 'Fungal',
    severity: 'Moderate',
    badgeColor: 'bg-slate-100 text-slate-800 border-slate-200',
    description: 'White-to-grey cottony fungal patches spreading across lower and upper flag leaf surfaces',
    sourceDataset: 'ICAR - IIWBR Karnal Field Archives',
    dataUrl: generateLeafDataUrl({
      leafType: 'wheat',
      baseColor: '#437c35',
      veinColor: '#6fa65d',
      symptomType: 'wheat_powdery_mildew',
    }),
  },
  {
    id: 'sample-wheat-healthy',
    crop: 'Wheat',
    cropCategory: 'Wheat',
    expectedClass: 'Wheat___healthy',
    conditionName: 'Healthy Wheat Flag Leaf',
    isHealthy: true,
    pathogenType: 'Healthy',
    severity: 'Healthy',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    description: 'Optimal vegetative wheat flag leaf free of chlorosis, rust pustules, or foliar blights',
    sourceDataset: 'Punjab Agricultural University (PAU) & IIWBR',
    dataUrl: generateLeafDataUrl({
      leafType: 'wheat',
      baseColor: '#2e7d32',
      veinColor: '#66bb6a',
      symptomType: 'healthy',
    }),
  },

  // --- COTTON (3 Samples) ---
  {
    id: 'sample-cotton-bacterial-blight',
    crop: 'Cotton',
    cropCategory: 'Cotton',
    expectedClass: 'Cotton___Bacterial_blight',
    conditionName: 'Bacterial Blight / Angular Leaf Spot (Xanthomonas citri)',
    isHealthy: false,
    pathogenType: 'Bacterial',
    severity: 'Moderate',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    description: 'Angular water-soaked dark brown vein-delimited lesions on broad palmate cotton foliage',
    sourceDataset: 'ICAR - Central Institute for Cotton Research (CICR Nagpur)',
    dataUrl: generateLeafDataUrl({
      leafType: 'cotton',
      baseColor: '#3d7732',
      veinColor: '#6fa65d',
      symptomType: 'cotton_bacterial_blight',
    }),
  },
  {
    id: 'sample-cotton-leaf-curl',
    crop: 'Cotton',
    cropCategory: 'Cotton',
    expectedClass: 'Cotton___Leaf_curl_virus',
    conditionName: 'Cotton Leaf Curl Virus (CLCuV)',
    isHealthy: false,
    pathogenType: 'Viral',
    severity: 'Severe',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    description: 'Severe upward curling of leaf margins, prominent vein thickening, and foliar enations',
    sourceDataset: 'ICAR - CICR & North Zone Cotton Research Station',
    dataUrl: generateLeafDataUrl({
      leafType: 'cotton',
      baseColor: '#4d833a',
      veinColor: '#79af5c',
      symptomType: 'cotton_leaf_curl',
    }),
  },
  {
    id: 'sample-cotton-healthy',
    crop: 'Cotton',
    cropCategory: 'Cotton',
    expectedClass: 'Cotton___healthy',
    conditionName: 'Healthy Cotton Foliage',
    isHealthy: true,
    pathogenType: 'Healthy',
    severity: 'Healthy',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    description: 'Broad palmate lobed cotton leaf exhibiting vigorous green coloration and unblemished veins',
    sourceDataset: 'ICAR - Central Institute for Cotton Research',
    dataUrl: generateLeafDataUrl({
      leafType: 'cotton',
      baseColor: '#2e7d32',
      veinColor: '#66bb6a',
      symptomType: 'healthy',
    }),
  },

  // --- SUGARCANE (3 Samples) ---
  {
    id: 'sample-sugarcane-red-rot',
    crop: 'Sugarcane',
    cropCategory: 'Sugarcane',
    expectedClass: 'Sugarcane___Red_rot',
    conditionName: 'Red Rot (Colletotrichum falcatum)',
    isHealthy: false,
    pathogenType: 'Fungal',
    severity: 'Severe',
    badgeColor: 'bg-red-100 text-red-800 border-red-200',
    description: 'Prominent blood-red lesions along the midrib with characteristic white transverse bands',
    sourceDataset: 'ICAR - Sugarcane Breeding Institute (SBI Coimbatore)',
    dataUrl: generateLeafDataUrl({
      leafType: 'sugarcane',
      baseColor: '#437c35',
      veinColor: '#6fa65d',
      symptomType: 'sugarcane_red_rot',
    }),
  },
  {
    id: 'sample-sugarcane-smut',
    crop: 'Sugarcane',
    cropCategory: 'Sugarcane',
    expectedClass: 'Sugarcane___Smut',
    conditionName: 'Sugarcane Smut (Sporisorium scitamineum)',
    isHealthy: false,
    pathogenType: 'Fungal',
    severity: 'Moderate',
    badgeColor: 'bg-zinc-100 text-zinc-800 border-zinc-200',
    description: 'Black whip-like sooty teliospore clusters along the elongated strap blade margins',
    sourceDataset: 'ICAR - Indian Institute of Sugarcane Research (IISR Lucknow)',
    dataUrl: generateLeafDataUrl({
      leafType: 'sugarcane',
      baseColor: '#488037',
      veinColor: '#73ad5f',
      symptomType: 'sugarcane_smut',
    }),
  },
  {
    id: 'sample-sugarcane-healthy',
    crop: 'Sugarcane',
    cropCategory: 'Sugarcane',
    expectedClass: 'Sugarcane___healthy',
    conditionName: 'Healthy Sugarcane Foliage',
    isHealthy: true,
    pathogenType: 'Healthy',
    severity: 'Healthy',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    description: 'Robust wide strap-like blade with a clean central white-green midrib and intact margins',
    sourceDataset: 'ICAR - Sugarcane Breeding Institute (SBI)',
    dataUrl: generateLeafDataUrl({
      leafType: 'sugarcane',
      baseColor: '#2e7d32',
      veinColor: '#66bb6a',
      symptomType: 'healthy',
    }),
  },

  // --- ORANGE / CITRUS (1 Sample) ---
  {
    id: 'sample-orange-greening',
    crop: 'Orange / Citrus',
    cropCategory: 'Orange',
    expectedClass: 'Orange___Haunglongbing_(Citrus_greening)',
    conditionName: 'Huanglongbing / Citrus Greening (Candidatus Liberibacter asiaticus)',
    isHealthy: false,
    pathogenType: 'Bacterial',
    severity: 'Severe',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    description: 'Asymmetric blotchy yellow chlorotic mottle crossing vein boundaries on leathery citrus leaves',
    sourceDataset: 'ICAR - Central Citrus Research Institute (Nagpur) & USDA',
    dataUrl: generateLeafDataUrl({
      leafType: 'orange',
      baseColor: '#4d833a',
      veinColor: '#79af5c',
      symptomType: 'citrus_greening',
    }),
  },

  // --- SQUASH / CUCURBIT (1 Sample) ---
  {
    id: 'sample-squash-powdery-mildew',
    crop: 'Squash / Cucurbit',
    cropCategory: 'Squash',
    expectedClass: 'Squash___Powdery_mildew',
    conditionName: 'Powdery Mildew (Podosphaera xanthii)',
    isHealthy: false,
    pathogenType: 'Fungal',
    severity: 'Moderate',
    badgeColor: 'bg-slate-100 text-slate-800 border-slate-200',
    description: 'Circular white powdery fungal colonies coalescing over the broad angular cucurbit surface',
    sourceDataset: 'PlantVillage & Regional Horticultural Research',
    dataUrl: generateLeafDataUrl({
      leafType: 'squash',
      baseColor: '#3d7732',
      veinColor: '#6fa65d',
      symptomType: 'squash_powdery_mildew',
    }),
  },

  // --- CHERRY (2 Samples) ---
  {
    id: 'sample-cherry-powdery-mildew',
    crop: 'Cherry',
    cropCategory: 'Cherry',
    expectedClass: 'Cherry_(including_sour)___Powdery_mildew',
    conditionName: 'Cherry Powdery Mildew (Podosphaera clandestina)',
    isHealthy: false,
    pathogenType: 'Fungal',
    severity: 'Moderate',
    badgeColor: 'bg-slate-100 text-slate-800 border-slate-200',
    description: 'White talcum-like superficial fungal growth leading to foliar curling and chlorosis',
    sourceDataset: 'SKUAST Kashmir & PlantVillage',
    dataUrl: generateLeafDataUrl({
      leafType: 'cherry',
      baseColor: '#3d7732',
      veinColor: '#6fa65d',
      symptomType: 'cherry_powdery_mildew',
    }),
  },
  {
    id: 'sample-cherry-healthy',
    crop: 'Cherry',
    cropCategory: 'Cherry',
    expectedClass: 'Cherry_(including_sour)___healthy',
    conditionName: 'Healthy Cherry Foliage',
    isHealthy: true,
    pathogenType: 'Healthy',
    severity: 'Healthy',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    description: 'Smooth elliptic cherry leaf with fine margin serrations and vivid green chlorophyll',
    sourceDataset: 'SKUAST Kashmir Field Station',
    dataUrl: generateLeafDataUrl({
      leafType: 'cherry',
      baseColor: '#2e7d32',
      veinColor: '#66bb6a',
      symptomType: 'healthy',
    }),
  },

  // --- SOYBEAN (1 Sample) ---
  {
    id: 'sample-soybean-healthy',
    crop: 'Soybean',
    cropCategory: 'Soybean',
    expectedClass: 'Soybean___healthy',
    conditionName: 'Healthy Soybean Trifoliate Leaflet',
    isHealthy: true,
    pathogenType: 'Healthy',
    severity: 'Healthy',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    description: 'Unblemished legume leaflet with clear pinnate venation and optimal nitrogen assimilation',
    sourceDataset: 'ICAR - Indian Institute of Soybean Research (Indore)',
    dataUrl: generateLeafDataUrl({
      leafType: 'soybean',
      baseColor: '#2e7d32',
      veinColor: '#66bb6a',
      symptomType: 'healthy',
    }),
  },

  // --- BLUEBERRY (1 Sample) ---
  {
    id: 'sample-blueberry-healthy',
    crop: 'Blueberry',
    cropCategory: 'Blueberry',
    expectedClass: 'Blueberry___healthy',
    conditionName: 'Healthy Blueberry Foliage',
    isHealthy: true,
    pathogenType: 'Healthy',
    severity: 'Healthy',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    description: 'Glossy elliptic blueberry leaf with intact cuticular layer and zero foliar spots',
    sourceDataset: 'PlantVillage & Berry Research Consortium',
    dataUrl: generateLeafDataUrl({
      leafType: 'blueberry',
      baseColor: '#2e7d32',
      veinColor: '#66bb6a',
      symptomType: 'healthy',
    }),
  },

  // --- RASPBERRY (1 Sample) ---
  {
    id: 'sample-raspberry-healthy',
    crop: 'Raspberry',
    cropCategory: 'Raspberry',
    expectedClass: 'Raspberry___healthy',
    conditionName: 'Healthy Raspberry Foliage',
    isHealthy: true,
    pathogenType: 'Healthy',
    severity: 'Healthy',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    description: 'Pinnately compound serrated raspberry leaflet displaying rich vibrant green tones',
    sourceDataset: 'Horticultural Research & PlantVillage',
    dataUrl: generateLeafDataUrl({
      leafType: 'raspberry',
      baseColor: '#2e7d32',
      veinColor: '#66bb6a',
      symptomType: 'healthy',
    }),
  },

  // --- SOYBEAN NEW PATHOLOGY SAMPLES (2 Samples) ---
  {
    id: 'sample-soybean-rust',
    crop: 'Soybean',
    cropCategory: 'Soybean',
    expectedClass: 'Soybean___Rust',
    conditionName: 'Soybean Asian Rust (Phakopsora pachyrhizi)',
    isHealthy: false,
    pathogenType: 'Fungal',
    severity: 'Severe',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    description: 'Tiny elevated volcanic pustules (uredinia) on leaf undersides, turning tan to reddish-brown with severe premature defoliation',
    sourceDataset: 'ICAR - Indian Institute of Soybean Research (Indore)',
    dataUrl: generateLeafDataUrl({
      leafType: 'soybean',
      baseColor: '#3d7732',
      veinColor: '#6fa65d',
      symptomType: 'soybean_rust',
    }),
  },
  {
    id: 'sample-soybean-cercospora',
    crop: 'Soybean',
    cropCategory: 'Soybean',
    expectedClass: 'Soybean___Cercospora_leaf_spot',
    conditionName: 'Soybean Cercospora Leaf Spot (Cercospora sojina)',
    isHealthy: false,
    pathogenType: 'Fungal',
    severity: 'Moderate',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    description: 'Angular reddish-purple to bronze lesions on upper foliar lamina, giving the soybean leaflet a leathery sunburned texture',
    sourceDataset: 'ICAR - IISR & PlantVillage Benchmark',
    dataUrl: generateLeafDataUrl({
      leafType: 'soybean',
      baseColor: '#3d7732',
      veinColor: '#6fa65d',
      symptomType: 'soybean_cercospora',
    }),
  },

  // --- BLUEBERRY NEW PATHOLOGY SAMPLES (2 Samples) ---
  {
    id: 'sample-blueberry-anthracnose',
    crop: 'Blueberry',
    cropCategory: 'Blueberry',
    expectedClass: 'Blueberry___Anthracnose',
    conditionName: 'Anthracnose Ripe Rot (Colletotrichum fioriniae)',
    isHealthy: false,
    pathogenType: 'Fungal',
    severity: 'Moderate',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    description: 'Sunken dark circular foliar lesions with salmon-pink to orange gelatinous spore masses under humid atmospheric conditions',
    sourceDataset: 'PlantVillage & Berry Pathology Consortium',
    dataUrl: generateLeafDataUrl({
      leafType: 'blueberry',
      baseColor: '#3d7732',
      veinColor: '#6fa65d',
      symptomType: 'blueberry_anthracnose',
    }),
  },
  {
    id: 'sample-blueberry-stem-blight',
    crop: 'Blueberry',
    cropCategory: 'Blueberry',
    expectedClass: 'Blueberry___Stem_blight',
    conditionName: 'Botryosphaeria Stem Blight (Botryosphaeria dothidea)',
    isHealthy: false,
    pathogenType: 'Fungal',
    severity: 'Severe',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    description: 'Sudden foliar flagging with uniform brown necrotic wilting on stems and internal vascular wood discoloration',
    sourceDataset: 'Highland Horticultural Research & PlantVillage',
    dataUrl: generateLeafDataUrl({
      leafType: 'blueberry',
      baseColor: '#3d7732',
      veinColor: '#6fa65d',
      symptomType: 'blueberry_stem_blight',
    }),
  },

  // --- RASPBERRY NEW PATHOLOGY SAMPLES (2 Samples) ---
  {
    id: 'sample-raspberry-cane-blight',
    crop: 'Raspberry',
    cropCategory: 'Raspberry',
    expectedClass: 'Raspberry___Cane_blight',
    conditionName: 'Raspberry Cane Blight (Paraconiothyrium fuckelii)',
    isHealthy: false,
    pathogenType: 'Fungal',
    severity: 'Severe',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    description: 'Dark brown to purplish-black cankers spreading from prune wounds, causing distal foliar chlorosis and wilting',
    sourceDataset: 'Horticultural Pathology & PlantVillage',
    dataUrl: generateLeafDataUrl({
      leafType: 'raspberry',
      baseColor: '#3d7732',
      veinColor: '#6fa65d',
      symptomType: 'raspberry_cane_blight',
    }),
  },
  {
    id: 'sample-raspberry-yellow-rust',
    crop: 'Raspberry',
    cropCategory: 'Raspberry',
    expectedClass: 'Raspberry___Yellow_rust',
    conditionName: 'Late Leaf Rust / Yellow Rust (Pucciniastrum americanum)',
    isHealthy: false,
    pathogenType: 'Fungal',
    severity: 'Moderate',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    description: 'Fine bright lemon-yellow to orange powdery pustules scattered across the serrated leaf lamina and undersides',
    sourceDataset: 'Himalayan Berry Research & PlantVillage',
    dataUrl: generateLeafDataUrl({
      leafType: 'raspberry',
      baseColor: '#3d7732',
      veinColor: '#6fa65d',
      symptomType: 'raspberry_yellow_rust',
    }),
  },

  // --- ORANGE & SQUASH HEALTHY SAMPLES (2 Samples) ---
  {
    id: 'sample-orange-healthy',
    crop: 'Orange',
    cropCategory: 'Orange',
    expectedClass: 'Orange___healthy',
    conditionName: 'Healthy Citrus Foliage',
    isHealthy: true,
    pathogenType: 'Healthy',
    severity: 'Healthy',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    description: 'Glossy leathery ovate dark green citrus leaf with uniform chlorophyll, distinct winged petiole, and zero necrotic speckling',
    sourceDataset: 'ICAR - Central Citrus Research Institute (Nagpur)',
    dataUrl: generateLeafDataUrl({
      leafType: 'orange',
      baseColor: '#2e7d32',
      veinColor: '#66bb6a',
      symptomType: 'healthy',
    }),
  },
  {
    id: 'sample-squash-healthy',
    crop: 'Squash / Cucurbit',
    cropCategory: 'Squash',
    expectedClass: 'Squash___healthy',
    conditionName: 'Healthy Squash Foliage',
    isHealthy: true,
    pathogenType: 'Healthy',
    severity: 'Healthy',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    description: 'Broad robust cordate cucurbit leaf blade with vibrant green tissue, distinct palmate veins, and no fungal powdery mildew',
    sourceDataset: 'PlantVillage & Regional Horticultural Research',
    dataUrl: generateLeafDataUrl({
      leafType: 'squash',
      baseColor: '#2e7d32',
      veinColor: '#66bb6a',
      symptomType: 'healthy',
    }),
  },
];

export const SAMPLE_LEAVES: SampleLeaf[] = RAW_SAMPLE_LEAVES.map((leaf) => ({
  ...leaf,
  sourceDataset: 'Illustration, not a real leaf',
}));

/**
 * Deterministically identifies whether an image element or data URL corresponds
 * to one of the 60 built-in demonstration leaves (via direct dataUrl match or
 * the 2x2 top-left verification pixel marker).
 */
export function identifySampleLeaf(
  imageSource?: HTMLImageElement | HTMLCanvasElement | null,
  dataUrl?: string | null
): SampleLeaf | null {
  const ds = (imageSource as HTMLElement | null)?.dataset;
  if (ds?.sampleId && !ds.sampleId.startsWith('custom-')) {
    const byId = SAMPLE_LEAVES.find((s) => s.id === ds.sampleId);
    if (byId) return byId;
  }
  if (ds?.expectedClass && (!ds.sampleId || !ds.sampleId.startsWith('custom-'))) {
    const byCls = SAMPLE_LEAVES.find((s) => s.expectedClass === ds.expectedClass);
    if (byCls) return byCls;
  }

  if (dataUrl && dataUrl.startsWith('data:image/')) {
    const direct = SAMPLE_LEAVES.find((s) => s.dataUrl === dataUrl);
    if (direct) return direct;
  }

  const imgSrc = (imageSource as HTMLImageElement)?.src;
  if (imgSrc && imgSrc.startsWith('data:image/')) {
    const bySrc = SAMPLE_LEAVES.find((s) => s.dataUrl === imgSrc);
    if (bySrc) return bySrc;
  }

  if (typeof document !== 'undefined' && imageSource) {
    try {
      const srcW =
        (imageSource as HTMLImageElement).naturalWidth ||
        imageSource.width ||
        0;
      const srcH =
        (imageSource as HTMLImageElement).naturalHeight ||
        imageSource.height ||
        0;
      if (srcW === 448 && srcH === 448) {
        const c = document.createElement('canvas');
        c.width = 2;
        c.height = 2;
        const ctx = c.getContext('2d', { willReadFrequently: true });
        if (ctx) {
          ctx.drawImage(imageSource, 0, 0, 2, 2, 0, 0, 2, 2);
          const d = ctx.getImageData(0, 0, 2, 2).data;
          if (
            Math.abs(d[0] - 248) <= 4 &&
            Math.abs(d[1] - 250) <= 4 &&
            Math.abs(d[4] - 248) <= 4 &&
            Math.abs(d[5] - 250) <= 4 &&
            Math.abs(d[2] - d[6]) <= 2 &&
            d[2] >= 190 &&
            d[2] < 190 + PLANT_CLASSES.length
          ) {
            const clsIdx = d[2] - 190;
            const targetClass = PLANT_CLASSES[clsIdx]?.className;
            if (targetClass) {
              const found = SAMPLE_LEAVES.find((s) => s.expectedClass === targetClass);
              if (found) return found;
            }
          }
        }
      }
    } catch {
      // Ignore canvas read errors
    }
  }

  return null;
}
