# AgriVision Google Colab Training & Export Kit (`/colab`)

This folder contains everything needed to train the 60-class **MobileNetV2** model in Google Colab (Free T4 GPU) and export it to TensorFlow.js (`model.json` + `weights.bin`) for AgriVision's offline mode.

## Files Prepared in `/colab` & `/scripts`

1. **`colab/AgriVision_Colab_Trainer.ipynb`**
   - A turnkey Jupyter Notebook ready to upload directly to [Google Colab](https://colab.research.google.com).
   - Installs dependencies, creates the 60 canonical class folders in the exact order of `src/data/classes.json`, downloads PlantVillage images from HuggingFace, fine-tunes `MobileNetV2` (`224×224`, `x / 127.5 - 1`), converts the trained model into `model.json` + `weights.bin`, and downloads both files to your computer.

2. **`colab/prepare_dataset.py`**
   - Standalone dataset preparation script that initializes all 60 canonical folders (`./dataset/<className>/`), downloads PlantVillage from HuggingFace (`--download_hf`), and maps local folders from PlantDoc, Rice, Wheat, Cotton, Sugarcane, Blueberry, Raspberry, and Soybean datasets into the exact 60 canonical folder names.

3. **`scripts/train_offline_model.py`**
   - Full CLI training, held-out evaluation (`classification_report`), and `tensorflowjs_converter` export script (`--weight_shard_size_bytes=50000000` producing `model.json` + `weights.bin`).

4. **`colab/requirements.txt`**
   - Exact Python package versions for Colab or local GPU training.

---

## Quick Start in Google Colab

1. Open [colab.research.google.com](https://colab.research.google.com) → **File → Upload notebook** → select **`colab/AgriVision_Colab_Trainer.ipynb`**.
2. Set hardware accelerator: **Runtime → Change runtime type → T4 GPU**.
3. Click **Runtime → Run all**.
4. When the final cell finishes, your browser will download:
   - `model.json`
   - `weights.bin`
5. Load the trained model into AgriVision using either method:
   - **Bundle in Project**: Place `model.json` and `weights.bin` inside `/public/model/`.
   - **Upload in UI**: Open AgriVision → **Settings** → **Teacher & Judge Custom Model Inspector** → select `model.json` and `weights.bin` together.
