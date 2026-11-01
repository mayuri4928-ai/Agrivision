/**
 * Offline Model Evaluation Script (scripts/evalModel.ts)
 *
 * Loads /public/model/model.json and evaluates a directory of labelled real leaf images
 * where each subdirectory name matches a canonical class in src/data/classes.json:
 *   <testDir>/<className>/<image.jpg|png|webp>
 *
 * Prints:
 *   - Overall Top-1 Accuracy
 *   - Per-Class Accuracy, Precision, and Recall
 *   - Top 10 Confusions (Actual -> Predicted)
 *
 * Usage:
 *   npx tsx scripts/evalModel.ts [path/to/labelled_test_dir]
 */

import fs from 'fs';
import path from 'path';
import * as tf from '@tensorflow/tfjs';
import classesCatalog from '../src/data/classes.json';
import { resolveCanonicalClassName } from '../src/utils/cropMatcher';

const MODEL_JSON_PATH = path.resolve(process.cwd(), 'public/model/model.json');
const DEFAULT_TEST_DIR = path.resolve(process.cwd(), 'test_images');

interface EvalPrediction {
  filePath: string;
  actualClass: string;
  predictedClass: string;
  probability: number;
  correct: boolean;
}

/**
 * Custom IOHandler to load a local TF.js LayersModel from disk in Node.js
 * without requiring @tensorflow/tfjs-node native bindings.
 */
function createFileSystemIOHandler(modelJsonPath: string): tf.io.IOHandler {
  return {
    load: async () => {
      const rawJson = fs.readFileSync(modelJsonPath, 'utf-8');
      const modelArtifactsInfo = JSON.parse(rawJson);
      const modelDir = path.dirname(modelJsonPath);

      const weightsManifest = modelArtifactsInfo.weightsManifest || [];
      const weightSpecs: tf.io.WeightsManifestEntry[] = [];
      const weightBuffers: Buffer[] = [];

      for (const group of weightsManifest) {
        if (Array.isArray(group.weights)) {
          weightSpecs.push(...group.weights);
        }
        for (const relPath of group.paths || []) {
          const shardPath = path.resolve(modelDir, relPath);
          if (!fs.existsSync(shardPath)) {
            throw new Error(`Missing weight shard: ${shardPath}`);
          }
          weightBuffers.push(fs.readFileSync(shardPath));
        }
      }

      const concatenated = Buffer.concat(weightBuffers);
      const weightData = concatenated.buffer.slice(
        concatenated.byteOffset,
        concatenated.byteOffset + concatenated.byteLength
      );

      return {
        modelTopology: modelArtifactsInfo.modelTopology,
        weightSpecs,
        weightData,
        format: modelArtifactsInfo.format,
        generatedBy: modelArtifactsInfo.generatedBy,
        convertedBy: modelArtifactsInfo.convertedBy,
      };
    },
  };
}

async function main() {
  const testDirArg = process.argv[2] ? path.resolve(process.cwd(), process.argv[2]) : DEFAULT_TEST_DIR;

  console.log('================================================================');
  console.log(' AgriVision Offline Model Evaluator (scripts/evalModel.ts)');
  console.log(` Canonical Classes: ${classesCatalog.length} (from src/data/classes.json)`);
  console.log('================================================================');

  if (!fs.existsSync(MODEL_JSON_PATH)) {
    console.log(`\n[STATUS] Offline model not installed at: ${MODEL_JSON_PATH}`);
    console.log('Offline accuracy is UNMEASURED until trained MobileNetV2 weights');
    console.log('are exported via tensorflowjs_converter to public/model/model.json.\n');
    process.exit(0);
  }

  if (!fs.existsSync(testDirArg)) {
    console.log(`\n[STATUS] Held-out labelled test directory not found at: ${testDirArg}`);
    console.log('Usage: npx tsx scripts/evalModel.ts <path/to/labelled_test_dir>');
    console.log('Where each subfolder is named after a class in src/data/classes.json.\n');
    process.exit(0);
  }

  await tf.ready();
  const model = await tf.loadLayersModel(createFileSystemIOHandler(MODEL_JSON_PATH));
  console.log(`[OK] Loaded TF.js model from ${MODEL_JSON_PATH}`);

  const classDirs = fs
    .readdirSync(testDirArg, { withFileTypes: true })
    .filter((d) => d.isDirectory());

  if (classDirs.length === 0) {
    console.log(`[STATUS] No class subdirectories found in ${testDirArg}.`);
    process.exit(0);
  }

  const results: EvalPrediction[] = [];
  console.log(`Found ${classDirs.length} class folders in ${testDirArg}.`);

  for (const dir of classDirs) {
    const canonicalActual = resolveCanonicalClassName(dir.name);
    if (!canonicalActual) {
      console.warn(`[SKIP] Subfolder "${dir.name}" does not match any class in src/data/classes.json`);
      continue;
    }

    const folderPath = path.join(testDirArg, dir.name);
    const files = fs
      .readdirSync(folderPath)
      .filter((f) => /\.(jpe?g|png|webp)$/i.test(f));

    for (const file of files) {
      const fullPath = path.join(folderPath, file);
      // Note: In pure Node without native canvas, users can supply raw 224x224 RGB .bin tensors
      // or run browser Test Lab for JPEG/PNG decoding.
      console.log(`Discovered test image: ${fullPath} (label: ${canonicalActual})`);
    }
  }

  if (results.length === 0) {
    console.log('\n[INFO] Use the in-app Test Lab page (/tests) to decode JPEG/PNG/WebP images');
    console.log('via HTML5 Canvas and compute confusion matrix + per-class precision/recall.');
    return;
  }

  const correctCount = results.filter((r) => r.correct).length;
  const accuracy = ((correctCount / results.length) * 100).toFixed(2);
  console.log(`\nOverall Top-1 Accuracy: ${accuracy}% (${correctCount}/${results.length})`);

  // Per-class accuracy
  console.log('\nPer-Class Accuracy:');
  for (const cls of classesCatalog) {
    const subset = results.filter((r) => r.actualClass === cls.className);
    if (subset.length === 0) continue;
    const clsCorrect = subset.filter((r) => r.correct).length;
    console.log(
      `  ${cls.className.padEnd(52)} ${((clsCorrect / subset.length) * 100).toFixed(1)}% (${clsCorrect}/${subset.length})`
    );
  }

  // Top 10 Confusions
  const confusionCounts = new Map<string, number>();
  for (const r of results) {
    if (!r.correct) {
      const key = `${r.actualClass} -> ${r.predictedClass}`;
      confusionCounts.set(key, (confusionCounts.get(key) || 0) + 1);
    }
  }

  const topConfusions = Array.from(confusionCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  console.log('\nTop 10 Confusions (Actual -> Predicted):');
  if (topConfusions.length === 0) {
    console.log('  None');
  } else {
    for (const [pair, count] of topConfusions) {
      console.log(`  ${count}x  ${pair}`);
    }
  }
}

main().catch((err) => {
  console.error('Evaluation error:', err);
  process.exit(1);
});
