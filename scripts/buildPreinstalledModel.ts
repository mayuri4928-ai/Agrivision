import * as tf from '@tensorflow/tfjs';
import fs from 'fs';
import path from 'path';
import { PLANT_CLASSES } from '../src/data/classes';
import { OFFLINE_PATHOLOGY_SIGNATURES } from '../src/data/offlinePathologySignatures';

/**
 * Generates and calibrates the pre-installed TensorFlow.js LayersModel
 * saved permanently at `/public/model/model.json` + `/public/model/weights.bin`.
 *
 * Input: [null, 224, 224, 3] (MobileNetV2 normalized: x / 127.5 - 1.0)
 * Architecture:
 *  - Conv2D(16, 3x3, strides=2, padding='same', activation='relu', name='Conv1')
 *  - DepthwiseConv2D(3x3, strides=2, padding='same', activation='relu', name='expanded_conv_depthwise')
 *  - Conv2D(32, 1x1, strides=1, padding='same', activation='relu', name='expanded_conv_project')
 *  - GlobalAveragePooling2D(name='global_avg_pool')
 *  - Dense(60, activation='softmax', name='pathology_softmax')
 */
async function buildAndSaveBundledModel() {
  await tf.ready();
  const numClasses = PLANT_CLASSES.length; // 60

  const input = tf.input({ shape: [224, 224, 3], name: 'input_1' });
  const conv1 = tf.layers
    .conv2d({
      filters: 16,
      kernelSize: 3,
      strides: 2,
      padding: 'same',
      activation: 'relu',
      useBias: true,
      name: 'Conv1',
    })
    .apply(input) as tf.SymbolicTensor;

  const dwConv = tf.layers
    .depthwiseConv2d({
      kernelSize: 3,
      strides: 2,
      padding: 'same',
      activation: 'relu',
      useBias: true,
      name: 'expanded_conv_depthwise',
    })
    .apply(conv1) as tf.SymbolicTensor;

  const pwConv = tf.layers
    .conv2d({
      filters: 32,
      kernelSize: 1,
      strides: 1,
      padding: 'same',
      activation: 'relu',
      useBias: true,
      name: 'expanded_conv_project',
    })
    .apply(dwConv) as tf.SymbolicTensor;

  const gap = tf.layers
    .globalAveragePooling2d({ name: 'global_avg_pool' })
    .apply(pwConv) as tf.SymbolicTensor;

  const output = tf.layers
    .dense({
      units: numClasses,
      activation: 'softmax',
      useBias: true,
      name: 'pathology_softmax',
    })
    .apply(gap) as tf.SymbolicTensor;

  const model = tf.model({
    inputs: input,
    outputs: output,
    name: 'AgriVision_MobileNetV2_60',
  });

  // 1. Calibrate Conv1 (shape [3, 3, 3, 16]) to extract 16 chromatic & spatial gradient channels from normalized RGB [-1, 1]
  // Channels:
  // 0: Healthy Green (G - 0.5*R - 0.5*B)
  // 1: Brown Necrosis (R + 0.3*G - 0.8*B)
  // 2: Dark Necrotic / Black Rot (-R - G - B)
  // 3: Water-Soaked Blight (-0.4*R + 0.2*G + 0.3*B)
  // 4: Rust Pustule Orange (1.2*R + 0.2*G - 1.0*B)
  // 5: Chlorotic Yellow (0.8*R + 0.8*G - 1.2*B)
  // 6: White Powdery Mildew (0.6*R + 0.6*G + 0.6*B)
  // 7: Olive Scab (-0.3*R + 0.2*G - 0.5*B)
  // 8: Burgundy / Red-Wine Anthocyanin (1.3*R - 0.8*G - 0.3*B) -> key for Grape Esca & Leaf Blight
  // 9..15: Spatial center-surround & directional edge detectors (concentric rings, interveinal stripes, stippling)
  const conv1Kernel = new Float32Array(3 * 3 * 3 * 16);
  const conv1Bias = new Float32Array(16);

  const colorPrototypes: Array<[number, number, number, number]> = [
    [-0.45, 0.95, -0.45, 0.15],  // 0: green
    [0.65, 0.15, -0.75, 0.10],   // 1: brown
    [-0.60, -0.60, -0.60, -0.10],// 2: darkNecrotic
    [-0.35, 0.25, 0.30, 0.05],   // 3: waterSoaked
    [0.95, 0.10, -0.90, 0.05],   // 4: rust
    [0.75, 0.75, -0.95, 0.05],   // 5: yellow
    [0.55, 0.55, 0.55, 0.0],     // 6: whiteMildew
    [-0.35, 0.20, -0.45, 0.05],  // 7: scab
    [1.10, -0.75, -0.25, 0.05],  // 8: redWine (Grape Esca / Anthocyanin)
    [0.50, -0.50, 0.0, 0.05],    // 9: concentricRings (radial contrast)
    [0.45, -0.35, -0.25, 0.05],  // 10: marginalBias
    [0.80, -0.60, -0.20, 0.05],  // 11: interveinalBias (stripe contrast)
    [0.60, 0.50, -0.60, 0.05],   // 12: stippling
    [0.30, 0.70, -0.50, 0.05],   // 13: mosaicContrast
    [-0.25, 0.80, -0.35, 0.10],  // 14: deep chlorophyll
    [0.40, 0.20, -0.40, 0.05],   // 15: general lesion contrast
  ];

  for (let f = 0; f < 16; f++) {
    const [rw, gw, bw, biasVal] = colorPrototypes[f];
    conv1Bias[f] = biasVal;
    for (let ky = 0; ky < 3; ky++) {
      for (let kx = 0; kx < 3; kx++) {
        const isCenter = ky === 1 && kx === 1;
        // Spatial sharpening for texture channels (9..13)
        const spatialFactor =
          f >= 9 && f <= 13 ? (isCenter ? 1.5 : -0.15) : isCenter ? 0.36 : 0.08;
        const baseIdx = ((ky * 3 + kx) * 3) * 16 + f;
        conv1Kernel[baseIdx + 0 * 16] = rw * spatialFactor;
        conv1Kernel[baseIdx + 1 * 16] = gw * spatialFactor;
        conv1Kernel[baseIdx + 2 * 16] = bw * spatialFactor;
      }
    }
  }
  model.getLayer('Conv1').setWeights([
    tf.tensor4d(conv1Kernel, [3, 3, 3, 16]),
    tf.tensor1d(conv1Bias),
  ]);

  // 2. Calibrate DepthwiseConv2D (shape [3, 3, 16, 1]) to preserve and smooth spatial feature maps
  const dwKernel = new Float32Array(3 * 3 * 16 * 1);
  const dwBias = new Float32Array(16);
  for (let c = 0; c < 16; c++) {
    dwBias[c] = 0.02;
    for (let ky = 0; ky < 3; ky++) {
      for (let kx = 0; kx < 3; kx++) {
        const w = ky === 1 && kx === 1 ? 0.44 : 0.07;
        dwKernel[(ky * 3 + kx) * 16 + c] = w;
      }
    }
  }
  model.getLayer('expanded_conv_depthwise').setWeights([
    tf.tensor4d(dwKernel, [3, 3, 16, 1]),
    tf.tensor1d(dwBias),
  ]);

  // 3. Calibrate Pointwise Conv2D (shape [1, 1, 16, 32])
  // Maps the 16 primary channels into 32 rich feature channels (16 direct + 16 non-linear interaction channels)
  const pwKernel = new Float32Array(1 * 1 * 16 * 32);
  const pwBias = new Float32Array(32);
  for (let c = 0; c < 16; c++) {
    pwKernel[c * 32 + c] = 1.2;
    pwKernel[c * 32 + (c + 16)] = 0.85;
    pwKernel[((c + 1) % 16) * 32 + (c + 16)] = 0.45;
  }
  model.getLayer('expanded_conv_project').setWeights([
    tf.tensor4d(pwKernel, [1, 1, 16, 32]),
    tf.tensor1d(pwBias),
  ]);

  // 4. Calibrate Dense Softmax Head (shape [32, 60] + bias [60]) from OFFLINE_PATHOLOGY_SIGNATURES
  const denseKernel = new Float32Array(32 * numClasses);
  const denseBias = new Float32Array(numClasses);

  for (let i = 0; i < numClasses; i++) {
    const cls = PLANT_CLASSES[i];
    const sig = OFFLINE_PATHOLOGY_SIGNATURES[cls.className];
    const w = sig?.featureWeights || {
      green: cls.isHealthy ? 1.0 : 0.3,
      brown: 0,
      darkNecrotic: 0,
      waterSoaked: 0,
      rust: 0,
      yellow: 0,
      whiteMildew: 0,
      scab: 0,
      redWine: 0,
      concentricRings: 0,
      marginalBias: 0,
      interveinalBias: 0,
      stippling: 0,
      mosaicContrast: 0,
    };

    const vec16 = [
      w.green,
      w.brown,
      w.darkNecrotic,
      w.waterSoaked,
      w.rust,
      w.yellow,
      w.whiteMildew,
      w.scab,
      w.redWine,
      w.concentricRings,
      w.marginalBias,
      w.interveinalBias,
      w.stippling,
      w.mosaicContrast,
      cls.isHealthy ? 0.9 : -0.3,
      cls.isHealthy ? -0.6 : 0.7,
    ];

    let norm = 0;
    for (const v of vec16) norm += v * v;
    norm = Math.max(1e-4, Math.sqrt(norm));

    for (let f = 0; f < 16; f++) {
      const scaled = (vec16[f] / norm) * 3.2;
      denseKernel[f * numClasses + i] = scaled;
      denseKernel[(f + 16) * numClasses + i] = scaled * 0.65;
    }
    denseBias[i] = cls.isHealthy ? 0.05 : 0.10;
  }

  model.getLayer('pathology_softmax').setWeights([
    tf.tensor2d(denseKernel, [32, numClasses]),
    tf.tensor1d(denseBias),
  ]);

  // 5. Serialize to /public/model/model.json and /public/model/weights.bin
  const outDir = path.join(process.cwd(), 'public', 'model');
  fs.mkdirSync(outDir, { recursive: true });

  await model.save(
    tf.io.withSaveHandler(async (artifacts) => {
      const weightData = artifacts.weightData as ArrayBuffer;
      const weightsBinPath = path.join(outDir, 'weights.bin');
      fs.writeFileSync(weightsBinPath, Buffer.from(weightData));

      const modelJson = {
        format: 'layers-model',
        generatedBy: 'TensorFlow.js tfjs-layers v4.22.0',
        convertedBy: 'AgriVision Bundled Model Builder',
        modelTopology: artifacts.modelTopology,
        weightsManifest: [
          {
            paths: ['weights.bin'],
            weights: artifacts.weightSpecs,
          },
        ],
      };

      const modelJsonPath = path.join(outDir, 'model.json');
      fs.writeFileSync(modelJsonPath, JSON.stringify(modelJson, null, 2), 'utf-8');
      console.log(
        `Saved pre-installed offline model: ${modelJsonPath} + ${weightsBinPath} (${weightData.byteLength} bytes)`
      );
      return {
        modelArtifactsInfo: {
          dateSaved: new Date(),
          modelTopologyType: 'JSON',
          weightDataBytes: weightData.byteLength,
        },
      };
    })
  );
}

buildAndSaveBundledModel().catch((err) => {
  console.error(err);
  process.exit(1);
});
