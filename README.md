# AgriVision — AI-Powered Crop Disease Diagnostics

AgriVision is a full-stack crop disease diagnostic web application built with **React + Vite + TensorFlow.js + Express/Gemini (`server.ts`)**. It supports **60 botanical classes** (**42 disease classes** and **18 healthy crop baselines** across **18 crops**) defined in `src/data/classes.json`.

---

## Offline Model Training & Export (`public/model/model.json`)

Offline inference loads a single converted TensorFlow.js LayersModel from `/model/model.json` (placed in `public/model/model.json` along with its `.bin` weight shards) via `tf.loadLayersModel('/model/model.json')` and caches it in IndexedDB (`indexeddb://agrivision-tfjs-model`).

If `public/model/model.json` is not present and no custom weights have been uploaded in **Settings**, AgriVision reports **`"Offline model not installed"`** (`hasTrainedWeights: false`, `weightsSource: 'none'`) and refuses to guess a disease from pixel rules.

### Required Model Specification
1. **Base Architecture**: `tf.keras.applications.MobileNetV2(input_shape=(224, 224, 3), include_top=False, weights='imagenet')`
2. **Input Preprocessing**: `224 × 224 × 3` RGB tensor normalized to `[-1, 1]` via `(x / 127.5) - 1.0`.
3. **Output Head**: `GlobalAveragePooling2D()` → `Dropout(0.2)` → `Dense(60, activation='softmax')` in the **exact 60-class order** of `src/data/classes.json`.
4. **Training Datasets**:
   - **PlantVillage** (38 classes across Apple, Blueberry, Cherry, Corn/Maize, Grape, Orange, Peach, Pepper bell, Potato, Raspberry, Soybean, Squash, Strawberry, Tomato)
   - **PlantDoc (IIT Bombay)** (real in-field images with natural backgrounds and lighting)
   - **Public Crop Pathology Datasets** for the remaining classes in `src/data/classes.json`:
     - **Rice** (`Rice___Brown_Spot`, `Rice___Leaf_Blast`, `Rice___Bacterial_leaf_blight`, `Rice___Sheath_Blight`, `Rice___Tungro_Virus`, `Rice___healthy`)
     - **Wheat** (`Wheat___Yellow_rust`, `Wheat___Brown_rust`, `Wheat___Powdery_mildew`, `Wheat___healthy`)
     - **Cotton** (`Cotton___Bacterial_blight`, `Cotton___Curl_virus`, `Cotton___healthy`)
     - **Sugarcane** (`Sugarcane___Red_rot`, `Sugarcane___Smut`, `Sugarcane___healthy`)
     - **Additional Blueberry / Raspberry / Soybean pathologies** (`Blueberry___Scorch`, `Blueberry___Mummy_berry`, `Raspberry___Leaf_spot`, `Raspberry___Rust`, `Soybean___Bacterial_blight`, `Soybean___Frogeye_leaf_spot`)

### Exporting with `tensorflowjs_converter`
After training and saving your Keras model (`agrivision_mobilenetv2_60.h5` or SavedModel):

```bash
pip install tensorflowjs
tensorflowjs_converter \
  --input_format=keras \
  --quantize_uint8 \
  agrivision_mobilenetv2_60.h5 \
  public/model/
```

Verify that `public/model/model.json` and `public/model/group1-shard*.bin` exist.

---

## Evaluating the Offline Model (`scripts/evalModel.ts`)

To measure honest top-1 accuracy, per-class precision/recall, and top confusions on a held-out directory of labelled real leaf images (where each subfolder is named after a class in `src/data/classes.json`, e.g. `test_images/Apple___Apple_scab/*.jpg`):

```bash
npx tsx scripts/evalModel.ts ./test_images
```

---

## Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set `GEMINI_API_KEY` in `.env` for online multimodal diagnosis.
3. Start development server (Express + Vite on port 3000):
   ```bash
   npm run dev
   ```
4. Type-check:
   ```bash
   npx tsc --noEmit
   ```
