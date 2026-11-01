/**
 * Automated Web Image Test Suite Runner (scripts/runWebImageTestSuite.ts)
 *
 * Evaluates real-world leaf photographs downloaded to test_images/ across
 * the 60 canonical classes against:
 *   1. Online Mode: Express endpoint (POST /api/diagnose) backed by Google Gemini
 *   2. Offline Mode: On-Device inference engine (inferenceEngine.classifyLeaf)
 *   3. Dual Mode: Side-by-side comparison of both engines
 *
 * Verifies key phytopathology invariants:
 *   - Zero Strawberry Leaf Scorch -> Grape Esca misidentifications
 *   - Class-by-class accuracy and crop match rates
 *   - Average confidence and latency
 *
 * Outputs:
 *   - Machine-readable: test_results/evaluation_report.json
 *   - Human-readable:   EVALUATION_REPORT.md
 *
 * Usage:
 *   npx tsx scripts/runWebImageTestSuite.ts [options]
 *
 * Options:
 *   --mode=online|offline|both   Evaluation mode (default: both)
 *   --test-dir=DIR               Test images directory (default: ./test_images)
 *   --classes=A,B,C              Comma-separated list of classes to evaluate
 *   --out=FILE                   Markdown report path (default: ./EVALUATION_REPORT.md)
 *   --json-out=FILE              JSON report path (default: ./test_results/evaluation_report.json)
 *   --server-url=URL             Online server URL (default: http://localhost:3000)
 *   --max-per-class=N            Max images to evaluate per class (default: 5)
 */

import fs from 'fs';
import path from 'path';
import classesCatalog from '../src/data/classes.json';
import { resolveCanonicalClassName, matchesCrop } from '../src/utils/cropMatcher';
import { inferenceEngine } from '../src/services/model/inference';

type EvalMode = 'online' | 'offline' | 'both';

interface CliOptions {
  mode: EvalMode;
  testDir: string;
  classesFilter?: string[];
  outMd: string;
  outJson: string;
  serverUrl: string;
  maxPerClass: number;
}

interface SinglePrediction {
  engine: 'online' | 'offline';
  className: string;
  crop: string;
  disease: string;
  confidence: number;
  latencyMs: number;
  isClassMatch: boolean;
  isCropMatch: boolean;
  isFallback?: boolean;
  errorMessage?: string;
}

interface ImageEvalResult {
  imagePath: string;
  filename: string;
  expectedClass: string;
  expectedCrop: string;
  expectedDisease: string;
  offline?: SinglePrediction;
  online?: SinglePrediction;
  isStrawberryEscaConfusion: boolean;
}

interface ModeSummary {
  mode: 'online' | 'offline';
  totalEvaluated: number;
  correctClasses: number;
  classAccuracyPercent: number;
  correctCrops: number;
  cropAccuracyPercent: number;
  avgConfidence: number;
  avgLatencyMs: number;
  fallbackCount: number;
  topConfusions: { actual: string; predicted: string; count: number }[];
}

interface SuiteReport {
  timestamp: string;
  evalMode: EvalMode;
  testDirectory: string;
  totalImagesEvaluated: number;
  totalClassesEvaluated: number;
  strawberryScorchEvaluated: number;
  strawberryToGrapeEscaMisidentifications: number;
  strawberryEscaInvariantPassed: boolean;
  offlineSummary?: ModeSummary;
  onlineSummary?: ModeSummary;
  perClassBreakdown: {
    canonicalClass: string;
    expectedCrop: string;
    sampleCount: number;
    offlineClassAccuracy?: number;
    offlineCropAccuracy?: number;
    onlineClassAccuracy?: number;
    onlineCropAccuracy?: number;
    status: 'PASS' | 'WARN' | 'FAIL';
  }[];
  outJson?: string;
  detailedResults: ImageEvalResult[];
}

function parseCliArgs(): CliOptions {
  const args = process.argv.slice(2);
  let mode: EvalMode = 'both';
  let testDir = path.resolve(process.cwd(), 'test_images');
  let classesFilter: string[] | undefined;
  let outMd = path.resolve(process.cwd(), 'EVALUATION_REPORT.md');
  let outJson = path.resolve(process.cwd(), 'test_results/evaluation_report.json');
  let serverUrl = 'http://localhost:3000';
  let maxPerClass = 5;

  for (const arg of args) {
    if (arg.startsWith('--mode=')) {
      const m = arg.split('=')[1].toLowerCase();
      if (m === 'online' || m === 'offline' || m === 'both') mode = m;
    } else if (arg.startsWith('--test-dir=')) {
      testDir = path.resolve(process.cwd(), arg.split('=')[1].trim());
    } else if (arg.startsWith('--classes=')) {
      classesFilter = arg.split('=')[1].split(',').map((c) => c.trim()).filter(Boolean);
    } else if (arg.startsWith('--out=')) {
      outMd = path.resolve(process.cwd(), arg.split('=')[1].trim());
    } else if (arg.startsWith('--json-out=')) {
      outJson = path.resolve(process.cwd(), arg.split('=')[1].trim());
    } else if (arg.startsWith('--server-url=')) {
      serverUrl = arg.split('=')[1].trim().replace(/\/$/, '');
    } else if (arg.startsWith('--max-per-class=')) {
      const val = parseInt(arg.split('=')[1], 10);
      if (!isNaN(val) && val > 0) maxPerClass = val;
    }
  }

  return { mode, testDir, classesFilter, outMd, outJson, serverUrl, maxPerClass };
}

function fileToDataUrl(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  const mime = ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : 'image/jpeg';
  const buffer = fs.readFileSync(filePath);
  return `data:${mime};base64,${buffer.toString('base64')}`;
}

async function checkServerHealth(serverUrl: string): Promise<{ available: boolean; hasGeminiKey: boolean }> {
  try {
    const res = await fetch(`${serverUrl}/api/health`, { method: 'GET' });
    if (!res.ok) return { available: false, hasGeminiKey: false };
    const json = (await res.json()) as any;
    return { available: true, hasGeminiKey: Boolean(json.hasGeminiKey) };
  } catch {
    return { available: false, hasGeminiKey: false };
  }
}

async function evaluateOnline(
  serverUrl: string,
  dataUrl: string,
  expectedCrop: string
): Promise<SinglePrediction> {
  const startTime = Date.now();
  try {
    const res = await fetch(`${serverUrl}/api/diagnose`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        imageBase64: dataUrl,
        userCropHint: expectedCrop || 'auto',
      }),
    });

    const latencyMs = Date.now() - startTime;
    if (!res.ok) {
      return {
        engine: 'online',
        className: 'UNKNOWN',
        crop: 'Unknown',
        disease: 'Error',
        confidence: 0,
        latencyMs,
        isClassMatch: false,
        isCropMatch: false,
        errorMessage: `HTTP ${res.status}: ${res.statusText}`,
      };
    }

    const data = (await res.json()) as any;
    if (data.fallbackToEdge) {
      return {
        engine: 'online',
        className: data.className || 'FALLBACK_TO_EDGE',
        crop: data.crop || 'Unknown',
        disease: data.disease || 'Fallback',
        confidence: data.confidencePercentage || 0,
        latencyMs,
        isClassMatch: false,
        isCropMatch: false,
        isFallback: true,
        errorMessage: data.message || 'Server fell back to edge engine',
      };
    }

    const predictedClass = resolveCanonicalClassName(data.className) || data.className || 'UNKNOWN';
    return {
      engine: 'online',
      className: predictedClass,
      crop: data.crop || 'Unknown',
      disease: data.disease || 'Unknown',
      confidence: data.confidencePercentage || 0,
      latencyMs,
      isClassMatch: false,
      isCropMatch: false,
      isFallback: false,
    };
  } catch (err: any) {
    return {
      engine: 'online',
      className: 'ERROR',
      crop: 'Unknown',
      disease: 'Error',
      confidence: 0,
      latencyMs: Date.now() - startTime,
      isClassMatch: false,
      isCropMatch: false,
      errorMessage: err?.message || 'Connection failed',
    };
  }
}

async function evaluateOffline(dataUrl: string, expectedCrop: string): Promise<SinglePrediction> {
  const startTime = Date.now();
  try {
    const diag = await inferenceEngine.classifyLeaf(null as any, dataUrl, expectedCrop || 'auto', 'en');
    const latencyMs = Date.now() - startTime;
    const predictedClass = resolveCanonicalClassName(diag.className) || diag.className || 'UNKNOWN';

    return {
      engine: 'offline',
      className: predictedClass,
      crop: diag.crop || 'Unknown',
      disease: diag.disease || 'Unknown',
      confidence: Math.round(diag.confidence || 0),
      latencyMs,
      isClassMatch: false,
      isCropMatch: false,
      isFallback: Boolean(diag.isOfflineFallbackWithoutWeights),
    };
  } catch (err: any) {
    return {
      engine: 'offline',
      className: 'ERROR',
      crop: 'Unknown',
      disease: 'Error',
      confidence: 0,
      latencyMs: Date.now() - startTime,
      isClassMatch: false,
      isCropMatch: false,
      errorMessage: err?.message || 'Inference error',
    };
  }
}

function computeModeSummary(
  mode: 'online' | 'offline',
  results: ImageEvalResult[]
): ModeSummary {
  const activePredictions = results
    .map((r) => ({ item: r, pred: mode === 'online' ? r.online : r.offline }))
    .filter((x): x is { item: ImageEvalResult; pred: SinglePrediction } => Boolean(x.pred));

  const totalEvaluated = activePredictions.length;
  if (totalEvaluated === 0) {
    return {
      mode,
      totalEvaluated: 0,
      correctClasses: 0,
      classAccuracyPercent: 0,
      correctCrops: 0,
      cropAccuracyPercent: 0,
      avgConfidence: 0,
      avgLatencyMs: 0,
      fallbackCount: 0,
      topConfusions: [],
    };
  }

  let correctClasses = 0;
  let correctCrops = 0;
  let sumConfidence = 0;
  let sumLatency = 0;
  let fallbackCount = 0;

  const confusionMap = new Map<string, number>();

  for (const { item, pred } of activePredictions) {
    if (pred.isClassMatch) correctClasses++;
    if (pred.isCropMatch) correctCrops++;
    if (pred.isFallback) fallbackCount++;
    sumConfidence += pred.confidence;
    sumLatency += pred.latencyMs;

    if (!pred.isClassMatch && pred.className !== 'ERROR' && pred.className !== 'FALLBACK_TO_EDGE') {
      const key = `${item.expectedClass} -> ${pred.className}`;
      confusionMap.set(key, (confusionMap.get(key) || 0) + 1);
    }
  }

  const topConfusions = Array.from(confusionMap.entries())
    .map(([pair, count]) => {
      const [actual, predicted] = pair.split(' -> ');
      return { actual, predicted, count };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return {
    mode,
    totalEvaluated,
    correctClasses,
    classAccuracyPercent: Math.round((correctClasses / totalEvaluated) * 1000) / 10,
    correctCrops,
    cropAccuracyPercent: Math.round((correctCrops / totalEvaluated) * 1000) / 10,
    avgConfidence: Math.round((sumConfidence / totalEvaluated) * 10) / 10,
    avgLatencyMs: Math.round(sumLatency / totalEvaluated),
    fallbackCount,
    topConfusions,
  };
}

function generateMarkdownReport(report: SuiteReport): string {
  const lines: string[] = [];
  lines.push('# AgriVision Web Image Diagnostic Evaluation Report');
  lines.push(`\n**Timestamp**: ${report.timestamp}  `);
  lines.push(`**Evaluation Mode**: \`${report.evalMode.toUpperCase()}\`  `);
  lines.push(`**Images Evaluated**: ${report.totalImagesEvaluated} across ${report.totalClassesEvaluated} canonical classes  `);
  lines.push(`**Dataset Directory**: \`${report.testDirectory}\`\n`);

  lines.push('## 1. Key Invariant: Strawberry Leaf Scorch vs Grape Esca');
  lines.push('');
  lines.push('| Invariant Metric | Requirement | Observed Result | Status |');
  lines.push('|---|---|---|---|');
  lines.push(`| **Strawberry Scorch Samples Evaluated** | ≥ 1 | ${report.strawberryScorchEvaluated} | INFO |`);
  lines.push(
    `| **Strawberry Scorch → Grape Esca Misidentifications** | **0 instances** | **${report.strawberryToGrapeEscaMisidentifications}** | ${
      report.strawberryEscaInvariantPassed ? '✅ **PASSED (ZERO ERRORS)**' : '❌ **FAILED**'
    } |`
  );
  lines.push('');

  lines.push('## 2. Executive Performance Summary');
  lines.push('');
  lines.push('| Engine / Mode | Evaluated | Top-1 Class Accuracy | Crop Match Rate | Avg Confidence | Avg Latency | Fallback Rate |');
  lines.push('|---|---|---|---|---|---|---|');

  if (report.offlineSummary && report.offlineSummary.totalEvaluated > 0) {
    const s = report.offlineSummary;
    lines.push(
      `| **Offline (On-Device TF.js)** | ${s.totalEvaluated} | ${s.classAccuracyPercent}% (${s.correctClasses}/${s.totalEvaluated}) | ${s.cropAccuracyPercent}% (${s.correctCrops}/${s.totalEvaluated}) | ${s.avgConfidence}% | ${s.avgLatencyMs}ms | ${s.fallbackCount} |`
    );
  }

  if (report.onlineSummary && report.onlineSummary.totalEvaluated > 0) {
    const s = report.onlineSummary;
    lines.push(
      `| **Online (Gemini Cloud)** | ${s.totalEvaluated} | ${s.classAccuracyPercent}% (${s.correctClasses}/${s.totalEvaluated}) | ${s.cropAccuracyPercent}% (${s.correctCrops}/${s.totalEvaluated}) | ${s.avgConfidence}% | ${s.avgLatencyMs}ms | ${s.fallbackCount} |`
    );
  }
  lines.push('');

  lines.push('## 3. Class-by-Class Performance Breakdown');
  lines.push('');
  lines.push('| Canonical Class | Crop | Samples | Offline Class Acc | Offline Crop Acc | Online Class Acc | Online Crop Acc | Status |');
  lines.push('|---|---|---|---|---|---|---|---|');

  for (const row of report.perClassBreakdown) {
    const offCls = row.offlineClassAccuracy !== undefined ? `${row.offlineClassAccuracy}%` : 'N/A';
    const offCrop = row.offlineCropAccuracy !== undefined ? `${row.offlineCropAccuracy}%` : 'N/A';
    const onCls = row.onlineClassAccuracy !== undefined ? `${row.onlineClassAccuracy}%` : 'N/A';
    const onCrop = row.onlineCropAccuracy !== undefined ? `${row.onlineCropAccuracy}%` : 'N/A';
    const badge = row.status === 'PASS' ? '✅ PASS' : row.status === 'WARN' ? '⚠️ WARN' : '❌ FAIL';
    lines.push(
      `| \`${row.canonicalClass}\` | ${row.expectedCrop} | ${row.sampleCount} | ${offCls} | ${offCrop} | ${onCls} | ${onCrop} | ${badge} |`
    );
  }
  lines.push('');

  if (report.offlineSummary?.topConfusions.length || report.onlineSummary?.topConfusions.length) {
    lines.push('## 4. Top Confusions (Actual -> Predicted)');
    lines.push('');
    if (report.offlineSummary?.topConfusions.length) {
      lines.push('### Offline Top Confusions');
      lines.push('| Actual Class | Predicted Class | Count |');
      lines.push('|---|---|---|');
      for (const c of report.offlineSummary.topConfusions) {
        lines.push(`| \`${c.actual}\` | \`${c.predicted}\` | ${c.count}x |`);
      }
      lines.push('');
    }
    if (report.onlineSummary?.topConfusions.length) {
      lines.push('### Online Top Confusions');
      lines.push('| Actual Class | Predicted Class | Count |');
      lines.push('|---|---|---|');
      for (const c of report.onlineSummary.topConfusions) {
        lines.push(`| \`${c.actual}\` | \`${c.predicted}\` | ${c.count}x |`);
      }
      lines.push('');
    }
  }

  lines.push('## 5. Verification Sign-Off');
  lines.push('');
  lines.push('- **Test Harness Execution**: Completed successfully via `scripts/runWebImageTestSuite.ts`.');
  lines.push(`- **Invariant Status**: Strawberry Leaf Scorch → Grape Esca errors = **${report.strawberryToGrapeEscaMisidentifications}**.`);
  lines.push(`- **Machine-readable artifact generated**: \`${report.outJson || 'test_results/evaluation_report.json'}\`.`);
  lines.push('');

  return lines.join('\n');
}

async function main() {
  const options = parseCliArgs();

  console.log('================================================================');
  console.log(' AgriVision Web Image Test Suite Runner');
  console.log(` Mode         : ${options.mode.toUpperCase()}`);
  console.log(` Test Dir     : ${options.testDir}`);
  console.log(` Server URL   : ${options.serverUrl}`);
  console.log(` Max/Class    : ${options.maxPerClass}`);
  console.log(` Markdown Out : ${options.outMd}`);
  console.log(` JSON Out     : ${options.outJson}`);
  console.log('================================================================\n');

  if (!fs.existsSync(options.testDir)) {
    console.error(`[ERROR] Test directory not found: ${options.testDir}`);
    console.error('Run "npx tsx scripts/downloadWebTestImages.ts" first to harvest images.');
    process.exit(1);
  }

  // Check online server if needed
  let serverHealthy = false;
  let serverHasGeminiKey = false;
  if (options.mode === 'online' || options.mode === 'both') {
    const health = await checkServerHealth(options.serverUrl);
    serverHealthy = health.available;
    serverHasGeminiKey = health.hasGeminiKey;
    if (!serverHealthy) {
      console.warn(`[WARN] Online server at ${options.serverUrl} is not responding.`);
      if (options.mode === 'online') {
        console.error('[ERROR] Cannot run in online mode without active server.');
        process.exit(1);
      } else {
        console.log('[INFO] Proceeding with offline evaluation only.');
      }
    } else {
      console.log(`[OK] Server reachable at ${options.serverUrl} (hasGeminiKey: ${serverHasGeminiKey})`);
    }
  }

  // Initialize offline engine if needed
  if (options.mode === 'offline' || options.mode === 'both' || !serverHealthy) {
    console.log('[INIT] Initializing on-device inferenceEngine...');
    await inferenceEngine.initialize();
    const status = inferenceEngine.getStatus();
    console.log(`[OK] On-device inference engine ready (Backend: ${status.backend}, Weights: ${status.weightsSource})`);
  }

  // Scan class folders
  const allEntries = fs.readdirSync(options.testDir, { withFileTypes: true });
  const classDirs = allEntries
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter((name) => {
      if (!options.classesFilter || options.classesFilter.length === 0) return true;
      return options.classesFilter.includes(name);
    });

  if (classDirs.length === 0) {
    console.error(`[ERROR] No matching class directories found in ${options.testDir}`);
    process.exit(1);
  }

  console.log(`\nDiscovered ${classDirs.length} class directories for evaluation.\n`);

  const results: ImageEvalResult[] = [];
  let strawberryScorchEvaluated = 0;
  let strawberryToGrapeEscaMisidentifications = 0;

  for (let idx = 0; idx < classDirs.length; idx++) {
    const dirName = classDirs[idx];
    const canonicalExpected = resolveCanonicalClassName(dirName) || dirName;
    const classDef = classesCatalog.find((c) => c.className === canonicalExpected);
    const expectedCrop = classDef?.crop || dirName.split('___')[0].replace(/_/g, ' ');
    const expectedDisease = classDef?.disease || dirName.split('___')[1]?.replace(/_/g, ' ') || 'Unknown';

    const folderPath = path.join(options.testDir, dirName);
    const imageFiles = fs
      .readdirSync(folderPath)
      .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
      .slice(0, options.maxPerClass);

    if (imageFiles.length === 0) continue;

    console.log(`[${idx + 1}/${classDirs.length}] EVALUATING: ${canonicalExpected} (${imageFiles.length} images)`);

    for (const file of imageFiles) {
      const fullPath = path.join(folderPath, file);
      const dataUrl = fileToDataUrl(fullPath);

      const itemResult: ImageEvalResult = {
        imagePath: fullPath,
        filename: file,
        expectedClass: canonicalExpected,
        expectedCrop,
        expectedDisease,
        isStrawberryEscaConfusion: false,
      };

      // 1. Offline Mode Evaluation
      if (options.mode === 'offline' || options.mode === 'both') {
        const offPred = await evaluateOffline(dataUrl, expectedCrop);
        offPred.isClassMatch = offPred.className === canonicalExpected;
        offPred.isCropMatch = matchesCrop(offPred.crop, expectedCrop);
        itemResult.offline = offPred;

        if (canonicalExpected === 'Strawberry___Leaf_scorch') {
          strawberryScorchEvaluated++;
          if (offPred.className === 'Grape___Esca_(Black_Measles)') {
            strawberryToGrapeEscaMisidentifications++;
            itemResult.isStrawberryEscaConfusion = true;
            console.error(`  ❌ [CRITICAL MISIDENTIFICATION] Strawberry Leaf Scorch diagnosed as Grape Esca by Offline engine!`);
          }
        }
      }

      // 2. Online Mode Evaluation
      if ((options.mode === 'online' || options.mode === 'both') && serverHealthy) {
        const onPred = await evaluateOnline(options.serverUrl, dataUrl, expectedCrop);
        onPred.isClassMatch = onPred.className === canonicalExpected;
        onPred.isCropMatch = matchesCrop(onPred.crop, expectedCrop);
        itemResult.online = onPred;

        if (canonicalExpected === 'Strawberry___Leaf_scorch') {
          if (onPred.className === 'Grape___Esca_(Black_Measles)') {
            strawberryToGrapeEscaMisidentifications++;
            itemResult.isStrawberryEscaConfusion = true;
            console.error(`  ❌ [CRITICAL MISIDENTIFICATION] Strawberry Leaf Scorch diagnosed as Grape Esca by Online engine!`);
          }
        }
      }

      const offSummary = itemResult.offline
        ? `Off: ${itemResult.offline.className} (${itemResult.offline.confidence}%, ${itemResult.offline.latencyMs}ms)`
        : '';
      const onSummary = itemResult.online
        ? `On: ${itemResult.online.className} (${itemResult.online.confidence}%, ${itemResult.online.latencyMs}ms)`
        : '';
      console.log(`  - ${file.padEnd(28)} ${offSummary} ${onSummary}`);

      results.push(itemResult);
    }
  }

  // Compute summaries
  const offlineSummary =
    options.mode === 'offline' || options.mode === 'both'
      ? computeModeSummary('offline', results)
      : undefined;
  const onlineSummary =
    (options.mode === 'online' || options.mode === 'both') && serverHealthy
      ? computeModeSummary('online', results)
      : undefined;

  // Compute per-class breakdown
  const perClassBreakdown: SuiteReport['perClassBreakdown'] = [];
  const uniqueClasses = Array.from(new Set(results.map((r) => r.expectedClass)));

  for (const clsName of uniqueClasses) {
    const classResults = results.filter((r) => r.expectedClass === clsName);
    const sampleCount = classResults.length;
    const expectedCrop = classResults[0].expectedCrop;

    let offClsAcc: number | undefined;
    let offCropAcc: number | undefined;
    if (offlineSummary) {
      const offCorrectCls = classResults.filter((r) => r.offline?.isClassMatch).length;
      const offCorrectCrop = classResults.filter((r) => r.offline?.isCropMatch).length;
      offClsAcc = Math.round((offCorrectCls / sampleCount) * 100);
      offCropAcc = Math.round((offCorrectCrop / sampleCount) * 100);
    }

    let onClsAcc: number | undefined;
    let onCropAcc: number | undefined;
    if (onlineSummary) {
      const onCorrectCls = classResults.filter((r) => r.online?.isClassMatch).length;
      const onCorrectCrop = classResults.filter((r) => r.online?.isCropMatch).length;
      onClsAcc = Math.round((onCorrectCls / sampleCount) * 100);
      onCropAcc = Math.round((onCorrectCrop / sampleCount) * 100);
    }

    const effectiveCropAcc = offCropAcc !== undefined ? offCropAcc : onCropAcc || 0;
    const status: 'PASS' | 'WARN' | 'FAIL' =
      effectiveCropAcc >= 80 ? 'PASS' : effectiveCropAcc >= 50 ? 'WARN' : 'FAIL';

    perClassBreakdown.push({
      canonicalClass: clsName,
      expectedCrop,
      sampleCount,
      offlineClassAccuracy: offClsAcc,
      offlineCropAccuracy: offCropAcc,
      onlineClassAccuracy: onClsAcc,
      onlineCropAccuracy: onCropAcc,
      status,
    });
  }

  const report: SuiteReport = {
    timestamp: new Date().toISOString(),
    evalMode: options.mode,
    testDirectory: options.testDir,
    totalImagesEvaluated: results.length,
    totalClassesEvaluated: uniqueClasses.length,
    strawberryScorchEvaluated,
    strawberryToGrapeEscaMisidentifications,
    strawberryEscaInvariantPassed: strawberryToGrapeEscaMisidentifications === 0,
    offlineSummary,
    onlineSummary,
    perClassBreakdown,
    outJson: options.outJson,
    detailedResults: results,
  };

  // Write JSON output
  const jsonDir = path.dirname(options.outJson);
  if (!fs.existsSync(jsonDir)) {
    fs.mkdirSync(jsonDir, { recursive: true });
  }
  fs.writeFileSync(options.outJson, JSON.stringify(report, null, 2), 'utf-8');
  console.log(`\n[OK] Wrote JSON evaluation report: ${options.outJson}`);

  // Write Markdown output
  const mdReport = generateMarkdownReport(report);
  fs.writeFileSync(options.outMd, mdReport, 'utf-8');
  console.log(`[OK] Wrote Markdown evaluation report: ${options.outMd}\n`);

  // Print Terminal Summary
  console.log('================================================================');
  console.log(' EVALUATION SUITE EXECUTION SUMMARY');
  console.log('================================================================');
  console.log(` Total Images Evaluated     : ${report.totalImagesEvaluated}`);
  console.log(` Total Classes Evaluated    : ${report.totalClassesEvaluated}`);
  console.log(` Strawberry Scorch Tested   : ${report.strawberryScorchEvaluated}`);
  console.log(` Strawberry -> Esca Errors  : ${report.strawberryToGrapeEscaMisidentifications}`);
  console.log(` Invariant Passed           : ${report.strawberryEscaInvariantPassed ? 'YES (0 Errors)' : 'NO'}`);

  if (offlineSummary) {
    console.log(` Offline Class Accuracy     : ${offlineSummary.classAccuracyPercent}% (${offlineSummary.correctClasses}/${offlineSummary.totalEvaluated})`);
    console.log(` Offline Crop Match Rate    : ${offlineSummary.cropAccuracyPercent}% (${offlineSummary.correctCrops}/${offlineSummary.totalEvaluated})`);
    console.log(` Offline Avg Latency        : ${offlineSummary.avgLatencyMs}ms`);
  }

  if (onlineSummary) {
    console.log(` Online Class Accuracy      : ${onlineSummary.classAccuracyPercent}% (${onlineSummary.correctClasses}/${onlineSummary.totalEvaluated})`);
    console.log(` Online Crop Match Rate     : ${onlineSummary.cropAccuracyPercent}% (${onlineSummary.correctCrops}/${onlineSummary.totalEvaluated})`);
    console.log(` Online Avg Latency         : ${onlineSummary.avgLatencyMs}ms`);
  }
  console.log('================================================================\n');

  if (!report.strawberryEscaInvariantPassed) {
    console.error('CRITICAL REGRESSION: Strawberry Leaf Scorch was misidentified as Grape Esca!');
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Fatal Evaluation Suite Error:', err);
  process.exit(1);
});
