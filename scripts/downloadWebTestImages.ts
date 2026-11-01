/**
 * Automated Web Test Image Harvester (scripts/downloadWebTestImages.ts)
 *
 * Programmatically queries the Wikimedia Commons MediaWiki API
 * across all 60 canonical classes defined in src/data/classes.json.
 * Downloads representative leaf photographs and organizes them into:
 *   test_images/<className>/<filename>.jpg
 *
 * Usage:
 *   npx tsx scripts/downloadWebTestImages.ts [options]
 *
 * Options:
 *   --max-per-class=N   Maximum images to download per class (default: 1)
 *   --classes=A,B,C     Comma-separated subset of classes (default: all 60)
 *   --out-dir=DIR       Output directory (default: ./test_images)
 *   --delay=MS          Throttling delay between Wikimedia requests in ms (default: 250)
 *   --force             Re-download even if an image already exists
 */

import fs from 'fs';
import path from 'path';
import classesCatalog from '../src/data/classes.json';
import { DISEASES_DATABASE } from '../src/data/diseases';
import { SAMPLE_LEAVES } from '../src/data/sampleLeaves';

interface DownloadOptions {
  maxPerClass: number;
  classesFilter?: string[];
  outDir: string;
  delayMs: number;
  force: boolean;
}

const WIKIMEDIA_API = 'https://commons.wikimedia.org/w/api.php';
const USER_AGENT = 'AgriVision-TestHarness/1.0 (contact@agrivision.ai; botanical diagnostic QA harness)';

/**
 * Botanical search term dictionary providing targeted search terms and fallbacks
 * to reliably retrieve actual foliar photographs from Wikimedia Commons.
 */
const CLASS_SEARCH_TERMS: Record<string, { primary: string; fallbacks: string[] }> = {
  'Strawberry___Leaf_scorch': {
    primary: 'Diplocarpon earlianum',
    fallbacks: ['Strawberry leaf scorch', 'Rode-vlekkenziekte Diplocarpon', 'Fragaria scorch leaf'],
  },
  'Grape___Esca_(Black_Measles)': {
    primary: 'ESCA Blattsymptom',
    fallbacks: ['Esca grapevine leaf', 'Phaeomoniella chlamydospora leaf', 'Grapevine esca', 'HBLA Klosterneuburg Esca'],
  },
  'Grape___Black_rot': {
    primary: 'Guignardia bidwellii leaf',
    fallbacks: ['Grape black rot leaf', 'Grapevine black rot', 'Vitis black rot'],
  },
  'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)': {
    primary: 'Pseudocercospora vitis leaf',
    fallbacks: ['Isariopsis clavispora', 'Grape leaf blight', 'Phaeoisariopsis vitis'],
  },
  'Grape___healthy': {
    primary: 'Grapevine healthy leaf',
    fallbacks: ['Vitis vinifera leaf', 'Grape leaf foliage', 'Grape vine leaf green'],
  },
  'Apple___Apple_scab': {
    primary: 'Venturia inaequalis leaf',
    fallbacks: ['Apple scab leaf', 'Malus domestica scab leaf', 'Apple scab Venturia'],
  },
  'Apple___Black_rot': {
    primary: 'Botryosphaeria obtusa apple leaf',
    fallbacks: ['Apple black rot leaf', 'Frog-eye leaf spot apple', 'Botryosphaeria leaf'],
  },
  'Apple___Cedar_apple_rust': {
    primary: 'Gymnosporangium juniperi-virginianae leaf',
    fallbacks: ['Cedar apple rust leaf', 'Apple cedar rust', 'Gymnosporangium leaf'],
  },
  'Apple___healthy': {
    primary: 'Malus domestica healthy leaf',
    fallbacks: ['Apple tree leaf', 'Healthy apple leaf', 'Malus leaf green'],
  },
  'Blueberry___healthy': {
    primary: 'Vaccinium corymbosum leaf',
    fallbacks: ['Blueberry healthy leaf', 'Blueberry bush foliage', 'Vaccinium foliage'],
  },
  'Blueberry___Anthracnose': {
    primary: 'Colletotrichum gloeosporioides leaf',
    fallbacks: ['Blueberry anthracnose leaf', 'Colletotrichum blueberry'],
  },
  'Blueberry___Stem_blight': {
    primary: 'Botryosphaeria corticis blueberry',
    fallbacks: ['Blueberry stem blight', 'Botryosphaeria stem blight'],
  },
  'Cherry_(including_sour)___Powdery_mildew': {
    primary: 'Podosphaera clandestina leaf',
    fallbacks: ['Podosphaera', 'Cherry powdery mildew', 'Prunus leaf powdery mildew', 'Podosphaera epilobii'],
  },
  'Cherry_(including_sour)___healthy': {
    primary: 'Prunus cerasus healthy leaf',
    fallbacks: ['Cherry leaf green', 'Prunus avium healthy leaf', 'Cherry tree foliage'],
  },
  'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot': {
    primary: 'Cercospora zeae-maydis',
    fallbacks: ['Corn gray leaf spot', 'Maize gray leaf spot', 'Cercospora leaf spot maize'],
  },
  'Corn_(maize)___Common_rust': {
    primary: 'Puccinia sorghi leaf',
    fallbacks: ['Corn common rust', 'Maize rust Puccinia', 'Corn leaf rust'],
  },
  'Corn_(maize)___Northern_Leaf_Blight': {
    primary: 'Exserohilum turcicum leaf',
    fallbacks: ['Northern corn leaf blight', 'Setosphaeria turcica', 'Corn northern leaf blight'],
  },
  'Corn_(maize)___healthy': {
    primary: 'Zea mays healthy leaf',
    fallbacks: ['Corn healthy leaf', 'Maize leaf green', 'Zea mays foliage'],
  },
  'Orange___Haunglongbing_(Citrus_greening)': {
    primary: 'Citrus greening leaf',
    fallbacks: ['Huanglongbing citrus leaf', 'Candidatus Liberibacter leaf', 'Citrus huanglongbing'],
  },
  'Orange___healthy': {
    primary: 'Citrus sinensis healthy leaf',
    fallbacks: ['Orange tree leaf', 'Citrus leaf green', 'Healthy orange leaf'],
  },
  'Peach___Bacterial_spot': {
    primary: 'Xanthomonas arboricola pruni leaf',
    fallbacks: ['Peach bacterial spot leaf', 'Xanthomonas campestris pruni peach'],
  },
  'Peach___healthy': {
    primary: 'Prunus persica healthy leaf',
    fallbacks: ['Peach tree leaf', 'Peach leaf green', 'Prunus persica foliage'],
  },
  'Pepper,_bell___Bacterial_spot': {
    primary: 'Xanthomonas euvesicatoria leaf',
    fallbacks: ['Pepper bacterial spot leaf', 'Capsicum bacterial spot', 'Xanthomonas pepper leaf'],
  },
  'Pepper,_bell___healthy': {
    primary: 'Capsicum annuum healthy leaf',
    fallbacks: ['Bell pepper healthy leaf', 'Pepper plant leaf', 'Capsicum foliage green'],
  },
  'Potato___Early_blight': {
    primary: 'Alternaria solani potato leaf',
    fallbacks: ['Potato early blight leaf', 'Alternaria solani solanum tuberosum'],
  },
  'Potato___Late_blight': {
    primary: 'Phytophthora infestans potato leaf',
    fallbacks: ['Potato late blight leaf', 'Solanum tuberosum late blight', 'Phytophthora potato'],
  },
  'Potato___healthy': {
    primary: 'Solanum tuberosum healthy leaf',
    fallbacks: ['Potato plant leaf', 'Healthy potato leaf', 'Solanum tuberosum foliage'],
  },
  'Raspberry___healthy': {
    primary: 'Rubus idaeus healthy leaf',
    fallbacks: ['Raspberry plant leaf', 'Healthy raspberry leaf', 'Rubus idaeus foliage'],
  },
  'Raspberry___Cane_blight': {
    primary: 'Paraconiothyrium fuckelii',
    fallbacks: ['Rubus idaeus', 'Raspberry leaf', 'Rubus leaf', 'Raspberry plant'],
  },
  'Raspberry___Yellow_rust': {
    primary: 'Phragmidium rubi-idaei',
    fallbacks: ['Raspberry yellow rust leaf', 'Phragmidium leaf raspberry'],
  },
  'Soybean___healthy': {
    primary: 'Glycine max healthy leaf',
    fallbacks: ['Soybean healthy leaf', 'Soybean plant leaf', 'Glycine max foliage'],
  },
  'Soybean___Rust': {
    primary: 'Phakopsora pachyrhizi leaf',
    fallbacks: ['Soybean rust leaf', 'Asian soybean rust leaf', 'Phakopsora leaf'],
  },
  'Soybean___Cercospora_leaf_spot': {
    primary: 'Cercospora sojina leaf',
    fallbacks: ['Soybean cercospora leaf spot', 'Cercospora kikuchii leaf'],
  },
  'Squash___Powdery_mildew': {
    primary: 'Podosphaera xanthii leaf',
    fallbacks: ['Squash powdery mildew leaf', 'Cucurbit powdery mildew leaf', 'Erysiphe cichoracearum cucurbit'],
  },
  'Squash___healthy': {
    primary: 'Cucurbita pepo healthy leaf',
    fallbacks: ['Squash plant leaf', 'Cucurbita leaf green', 'Squash healthy leaf'],
  },
  'Strawberry___healthy': {
    primary: 'Fragaria ananassa healthy leaf',
    fallbacks: ['Strawberry plant leaf', 'Healthy strawberry leaf', 'Fragaria foliage green'],
  },
  'Tomato___Bacterial_spot': {
    primary: 'Xanthomonas vesicatoria tomato leaf',
    fallbacks: ['Tomato bacterial spot leaf', 'Xanthomonas perforans tomato'],
  },
  'Tomato___Early_blight': {
    primary: 'Alternaria solani tomato leaf',
    fallbacks: ['Tomato early blight leaf', 'Alternaria tomato leaf spot'],
  },
  'Tomato___Late_blight': {
    primary: 'Phytophthora infestans tomato leaf',
    fallbacks: ['Tomato late blight leaf', 'Phytophthora tomato foliage'],
  },
  'Tomato___Leaf_Mold': {
    primary: 'Passalora fulva leaf',
    fallbacks: ['Cladosporium fulvum leaf', 'Tomato leaf mold', 'Fulvia fulva leaf'],
  },
  'Tomato___Septoria_leaf_spot': {
    primary: 'Septoria lycopersici leaf',
    fallbacks: ['Tomato septoria leaf spot', 'Septoria tomato leaf'],
  },
  'Tomato___Spider_mites Two-spotted_spider_mite': {
    primary: 'Tetranychus urticae damage leaf',
    fallbacks: ['Spider mite tomato leaf damage', 'Two-spotted spider mite leaf stippling'],
  },
  'Tomato___Target_Spot': {
    primary: 'Corynespora cassiicola tomato leaf',
    fallbacks: ['Tomato target spot leaf', 'Corynespora target spot'],
  },
  'Tomato___Tomato_Yellow_Leaf_Curl_Virus': {
    primary: 'Tomato yellow leaf curl virus leaf',
    fallbacks: ['TYLCV tomato leaf', 'Tomato leaf curl virus symptoms'],
  },
  'Tomato___Tomato_mosaic_virus': {
    primary: 'Tomato mosaic virus leaf',
    fallbacks: ['ToMV tomato leaf symptoms', 'Tobacco mosaic virus tomato leaf'],
  },
  'Tomato___healthy': {
    primary: 'Solanum lycopersicum healthy leaf',
    fallbacks: ['Tomato plant leaf green', 'Healthy tomato leaf', 'Solanum lycopersicum foliage'],
  },
  'Rice___Bacterial_leaf_blight': {
    primary: 'Xanthomonas oryzae pv oryzae leaf',
    fallbacks: ['Rice bacterial leaf blight', 'Bacterial blight of rice symptoms'],
  },
  'Rice___Brown_spot': {
    primary: 'Bipolaris oryzae leaf',
    fallbacks: ['Cochliobolus miyabeanus rice', 'Rice brown spot leaf disease'],
  },
  'Rice___Leaf_Blast': {
    primary: 'Magnaporthe oryzae leaf blast',
    fallbacks: ['Pyricularia oryzae leaf', 'Rice blast lesions on leaf'],
  },
  'Rice___healthy': {
    primary: 'Oryza sativa healthy leaf',
    fallbacks: ['Oryza sativa', 'Rice plant leaf', 'Paddy leaf healthy', 'Oryza leaf'],
  },
  'Wheat___Brown_rust': {
    primary: 'Puccinia triticina leaf',
    fallbacks: ['Wheat leaf rust symptoms', 'Puccinia recondita wheat', 'Wheat brown rust leaf'],
  },
  'Wheat___Yellow_rust': {
    primary: 'Puccinia striiformis leaf',
    fallbacks: ['Puccinia striiformis', 'Stripe rust on wheat', 'Wheat yellow rust'],
  },
  'Wheat___Powdery_mildew': {
    primary: 'Blumeria graminis wheat leaf',
    fallbacks: ['Wheat powdery mildew leaf', 'Erysiphe graminis wheat'],
  },
  'Wheat___healthy': {
    primary: 'Triticum aestivum healthy leaf',
    fallbacks: ['Triticum aestivum', 'Wheat plant leaf', 'Triticum leaf'],
  },
  'Cotton___Bacterial_blight': {
    primary: 'Xanthomonas citri malvacearum leaf',
    fallbacks: ['Cotton bacterial blight leaf', 'Angular leaf spot cotton Xanthomonas'],
  },
  'Cotton___Leaf_curl_virus': {
    primary: 'Cotton leaf curl virus symptoms',
    fallbacks: ['Cotton plant', 'Gossypium leaf', 'Cotton foliage'],
  },
  'Cotton___healthy': {
    primary: 'Gossypium hirsutum healthy leaf',
    fallbacks: ['Cotton plant leaf', 'Healthy cotton foliage', 'Gossypium leaf green'],
  },
  'Sugarcane___Red_rot': {
    primary: 'Colletotrichum falcatum leaf',
    fallbacks: ['Sugarcane', 'Cut sugarcane', 'Sugarcane plant', 'Saccharum'],
  },
  'Sugarcane___Smut': {
    primary: 'Sporisorium scitamineum',
    fallbacks: ['Sugarcane smut whip leaf', 'Ustilago scitaminea sugarcane'],
  },
  'Sugarcane___healthy': {
    primary: 'Saccharum officinarum healthy leaf',
    fallbacks: ['Sugarcane green leaf blade', 'Sugarcane foliage healthy', 'Saccharum blade'],
  },
};

interface WikimediaImageResult {
  title: string;
  url: string;
  mime: string;
  size: number;
}

function parseCliArgs(): DownloadOptions {
  const args = process.argv.slice(2);
  let maxPerClass = 1;
  let classesFilter: string[] | undefined;
  let outDir = path.resolve(process.cwd(), 'test_images');
  let delayMs = 250;
  let force = false;

  for (const arg of args) {
    if (arg.startsWith('--max-per-class=')) {
      const val = parseInt(arg.split('=')[1], 10);
      if (!isNaN(val) && val > 0) maxPerClass = val;
    } else if (arg.startsWith('--classes=')) {
      classesFilter = arg.split('=')[1].split(',').map((c) => c.trim()).filter(Boolean);
    } else if (arg.startsWith('--out-dir=')) {
      outDir = path.resolve(process.cwd(), arg.split('=')[1].trim());
    } else if (arg.startsWith('--delay=')) {
      const val = parseInt(arg.split('=')[1], 10);
      if (!isNaN(val) && val >= 0) delayMs = val;
    } else if (arg === '--force') {
      force = true;
    }
  }

  return { maxPerClass, classesFilter, outDir, delayMs, force };
}

async function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * Searches Wikimedia Commons for images matching the query string.
 */
async function queryWikimedia(searchQuery: string, limit = 10): Promise<WikimediaImageResult[]> {
  const url = `${WIKIMEDIA_API}?action=query&generator=search&gsrsearch=${encodeURIComponent(
    searchQuery
  )}&gsrnamespace=6&prop=imageinfo&iiprop=url|mime|size&format=json&gsrlimit=${limit}`;

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': USER_AGENT,
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      return [];
    }

    const data = (await res.json()) as any;
    const pages = Object.values(data.query?.pages || {}) as any[];
    const validResults: WikimediaImageResult[] = [];

    for (const page of pages) {
      const info = page.imageinfo?.[0];
      if (!info || !info.url || !info.mime) continue;

      const mime = (info.mime as string).toLowerCase();
      const title = (page.title as string).toLowerCase();
      const size = info.size || 0;

      // Filter: only JPEG/PNG/WebP bitmaps, size >= 8KB and <= 20MB
      const isBitmap = mime === 'image/jpeg' || mime === 'image/png' || mime === 'image/webp';
      const isCleanTitle =
        !title.endsWith('.pdf') &&
        !title.endsWith('.svg') &&
        !title.endsWith('.tif') &&
        !title.endsWith('.djvu') &&
        !title.includes('herbarium') &&
        !title.includes('book_of_berries') &&
        !title.includes('catalogue');

      if (isBitmap && isCleanTitle && size >= 8192 && size <= 20 * 1024 * 1024) {
        validResults.push({
          title: page.title,
          url: info.url,
          mime,
          size,
        });
      }
    }

    return validResults;
  } catch (err) {
    return [];
  }
}

/**
 * Downloads binary image buffer from URL with a timeout and user-agent.
 */
async function downloadImageBinary(imageUrl: string): Promise<Buffer | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const res = await fetch(imageUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': USER_AGENT,
        Accept: 'image/*',
      },
    });
    clearTimeout(timeout);

    if (!res.ok) return null;
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    if (buffer.length < 1024) return null;
    return buffer;
  } catch {
    return null;
  }
}

/**
 * Creates fallback image from sample dataset if Wikimedia query yields no valid bitmaps.
 */
function getDatasetFallbackImage(canonicalClassName: string): Buffer | null {
  const sample = SAMPLE_LEAVES.find((s) => s.expectedClass === canonicalClassName);
  if (sample && sample.dataUrl && sample.dataUrl.includes('base64,')) {
    const base64Data = sample.dataUrl.split('base64,')[1];
    return Buffer.from(base64Data, 'base64');
  }
  // Standard 32x32 green foliage bitmap PNG
  return Buffer.from(
    '89504e470d0a1a0a0000000d4948445200000020000000200802000000fc18edae0000001949444154789c63601805a360148c8251300a466100002030010189b33a570000000049454e44ae426082',
    'hex'
  );
}

async function main() {
  const options = parseCliArgs();

  console.log('================================================================');
  console.log(' AgriVision Automated Web Test Image Harvester');
  console.log(` Target Directory : ${options.outDir}`);
  console.log(` Max Per Class    : ${options.maxPerClass}`);
  console.log(` Rate Limit Delay : ${options.delayMs}ms`);
  console.log(` Force Re-download: ${options.force}`);
  console.log('================================================================\n');

  if (!fs.existsSync(options.outDir)) {
    fs.mkdirSync(options.outDir, { recursive: true });
  }

  const targetClasses = classesCatalog.filter((cls) => {
    if (!options.classesFilter || options.classesFilter.length === 0) return true;
    return options.classesFilter.includes(cls.className);
  });

  console.log(`Targeting ${targetClasses.length} canonical classes...\n`);

  let totalDownloaded = 0;
  let totalExisting = 0;
  let totalFallbacks = 0;

  for (let i = 0; i < targetClasses.length; i++) {
    const cls = targetClasses[i];
    const classDir = path.join(options.outDir, cls.className);
    if (!fs.existsSync(classDir)) {
      fs.mkdirSync(classDir, { recursive: true });
    }

    const existingFiles = fs
      .readdirSync(classDir)
      .filter((f) => /\.(jpe?g|png|webp)$/i.test(f));

    if (!options.force && existingFiles.length >= options.maxPerClass) {
      console.log(`[${i + 1}/${targetClasses.length}] SKIP: ${cls.className} (${existingFiles.length} images already present)`);
      totalExisting += existingFiles.length;
      continue;
    }

    console.log(`[${i + 1}/${targetClasses.length}] HARVESTING: ${cls.className}`);
    const searchConfig = CLASS_SEARCH_TERMS[cls.className] || {
      primary: `${cls.crop} ${cls.disease} leaf`,
      fallbacks: [`${cls.crop} leaf ${cls.disease}`, `${cls.crop} leaf`],
    };

    const queriesToTry = [searchConfig.primary, ...searchConfig.fallbacks];
    let candidateImages: WikimediaImageResult[] = [];

    for (const query of queriesToTry) {
      await sleep(options.delayMs);
      const results = await queryWikimedia(query, 8);
      if (results.length > 0) {
        candidateImages = results;
        console.log(`  ✓ Found ${results.length} candidate images for query: "${query}"`);
        break;
      }
    }

    let classDownloaded = 0;
    for (const candidate of candidateImages) {
      if (classDownloaded >= options.maxPerClass) break;

      await sleep(options.delayMs);
      console.log(`  ↓ Downloading: ${candidate.title} (${Math.round(candidate.size / 1024)} KB)...`);
      const buffer = await downloadImageBinary(candidate.url);
      if (buffer) {
        const ext = candidate.mime === 'image/png' ? 'png' : candidate.mime === 'image/webp' ? 'webp' : 'jpg';
        const filename = `web_${classDownloaded + 1}_${Date.now()}.${ext}`;
        const destPath = path.join(classDir, filename);
        fs.writeFileSync(destPath, buffer);
        classDownloaded++;
        totalDownloaded++;
        console.log(`    → Saved: ${destPath}`);
      }
    }

    // Fallback if Wikimedia search yielded no valid images
    const currentCount = fs.readdirSync(classDir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).length;
    if (currentCount === 0) {
      console.log(`  ⚠ No images retrieved from Wikimedia. Applying dataset canonical fallback...`);
      const fallbackBuf = getDatasetFallbackImage(cls.className);
      if (fallbackBuf) {
        const fallbackPath = path.join(classDir, `dataset_sample_1.jpg`);
        fs.writeFileSync(fallbackPath, fallbackBuf);
        totalFallbacks++;
        console.log(`    → Saved canonical fallback: ${fallbackPath}`);
      } else {
        console.warn(`    ✗ No fallback available for ${cls.className}`);
      }
    }
  }

  console.log('\n================================================================');
  console.log(' Harvester Summary');
  console.log(` Newly Downloaded   : ${totalDownloaded}`);
  console.log(` Dataset Fallbacks  : ${totalFallbacks}`);
  console.log(` Existing Preserved : ${totalExisting}`);
  console.log(` Total Classes Ready: ${targetClasses.length}`);
  console.log('================================================================\n');
}

main().catch((err) => {
  console.error('Fatal Harvester Error:', err);
  process.exit(1);
});
