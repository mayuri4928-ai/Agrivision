#!/usr/bin/env python3
"""
AgriVision 60-Class MobileNetV2 Offline Model Trainer & TF.js Exporter
======================================================================
Run this script in Google Colab (Free T4 GPU) or any Python machine with a GPU.

What it does:
1. Uses the exact 60 canonical class names in order from `src/data/classes.json`.
2. Builds a MobileNetV2 model with input shape (224, 224, 3), MobileNetV2
   preprocessing `x / 127.5 - 1`, and a 60-class softmax head.
3. Trains on a directory of real leaf images (`dataset_root/<className>/*.jpg`)
   with data augmentation, class weighting, and two-stage fine-tuning.
4. Evaluates on the held-out test split and prints overall accuracy, per-class
   precision/recall, and top confusions.
5. Exports the trained model to `public/model/model.json` + a single consolidated
   `weights.bin`shard (via `--weight_shard_size_bytes 50000000`), so it works
   both in `public/model/` AND via AgriVision's Settings -> Custom Model Loader.

Usage in Google Colab / Local GPU:
----------------------------------
pip install -r colab/requirements.txt
python scripts/train_offline_model.py --data_dir ./dataset --output_dir ./public/model --epochs_head 8 --epochs_finetune 15
"""

import argparse
import json
import os
import pathlib
import subprocess
import numpy as np
import tensorflow as tf
from sklearn.metrics import classification_report

# Exact 60-class order matching src/data/classes.json
CANONICAL_60_CLASSES = [
    "Apple___Apple_scab",
    "Apple___Black_rot",
    "Apple___Cedar_apple_rust",
    "Apple___healthy",
    "Blueberry___healthy",
    "Cherry_(including_sour)___Powdery_mildew",
    "Cherry_(including_sour)___healthy",
    "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot",
    "Corn_(maize)___Common_rust",
    "Corn_(maize)___Northern_Leaf_Blight",
    "Corn_(maize)___healthy",
    "Grape___Black_rot",
    "Grape___Esca_(Black_Measles)",
    "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)",
    "Grape___healthy",
    "Orange___Haunglongbing_(Citrus_greening)",
    "Peach___Bacterial_spot",
    "Peach___healthy",
    "Pepper,_bell___Bacterial_spot",
    "Pepper,_bell___healthy",
    "Potato___Early_blight",
    "Potato___Late_blight",
    "Potato___healthy",
    "Raspberry___healthy",
    "Soybean___healthy",
    "Squash___Powdery_mildew",
    "Strawberry___Leaf_scorch",
    "Strawberry___healthy",
    "Tomato___Bacterial_spot",
    "Tomato___Early_blight",
    "Tomato___Late_blight",
    "Tomato___Leaf_Mold",
    "Tomato___Septoria_leaf_spot",
    "Tomato___Spider_mites Two-spotted_spider_mite",
    "Tomato___Target_Spot",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus",
    "Tomato___Tomato_mosaic_virus",
    "Tomato___healthy",
    "Rice___Bacterial_leaf_blight",
    "Rice___Brown_spot",
    "Rice___Leaf_Blast",
    "Rice___healthy",
    "Wheat___Brown_rust",
    "Wheat___Yellow_rust",
    "Wheat___Powdery_mildew",
    "Wheat___healthy",
    "Cotton___Bacterial_blight",
    "Cotton___Leaf_curl_virus",
    "Cotton___healthy",
    "Sugarcane___Red_rot",
    "Sugarcane___Smut",
    "Sugarcane___healthy",
    "Soybean___Rust",
    "Soybean___Cercospora_leaf_spot",
    "Blueberry___Anthracnose",
    "Blueberry___Stem_blight",
    "Raspberry___Cane_blight",
    "Raspberry___Yellow_rust",
    "Orange___healthy",
    "Squash___healthy",
]

IMG_SIZE = (224, 224)
BATCH_SIZE = 32


def preprocess_mobilenet_v2(image, label):
    """Normalize RGB pixels [0, 255] -> [-1, 1] via x / 127.5 - 1.0."""
    image = tf.cast(image, tf.float32)
    image = (image / 127.5) - 1.0
    return image, label


def build_model(num_classes: int = 60):
    base_model = tf.keras.applications.MobileNetV2(
        input_shape=(224, 224, 3),
        include_top=False,
        weights="imagenet",
    )
    base_model.trainable = False

    inputs = tf.keras.Input(shape=(224, 224, 3), name="input_rgb_normalized")
    x = base_model(inputs, training=False)
    x = tf.keras.layers.GlobalAveragePooling2D(name="global_avg_pool")(x)
    x = tf.keras.layers.Dropout(0.25, name="dropout")(x)
    outputs = tf.keras.layers.Dense(
        num_classes, activation="softmax", name="pathology_softmax"
    )(x)

    model = tf.keras.Model(inputs=inputs, outputs=outputs, name="AgriVision_MobileNetV2_60")
    return model, base_model


def main():
    parser = argparse.ArgumentParser(description="Train AgriVision 60-Class MobileNetV2")
    parser.add_argument(
        "--data_dir",
        type=str,
        required=True,
        help="Path to dataset directory containing subfolders for each of the 60 classes",
    )
    parser.add_argument(
        "--output_dir",
        type=str,
        default="public/model",
        help="Directory to export TF.js model.json and weights.bin",
    )
    parser.add_argument("--epochs_head", type=int, default=8)
    parser.add_argument("--epochs_finetune", type=int, default=15)
    args = parser.parse_args()

    data_path = pathlib.Path(args.data_dir)
    if not data_path.exists():
        raise FileNotFoundError(f"Dataset directory not found: {data_path}")

    # Verify all 60 class directories exist so class indices match src/data/classes.json
    missing = [c for c in CANONICAL_60_CLASSES if not (data_path / c).exists()]
    if missing:
        print(f"[WARNING] Missing {len(missing)} class folders in {data_path}:")
        for m in missing:
            print(f"  - {m}")
        raise RuntimeError(
            "All 60 class folders must exist in --data_dir so output indices match src/data/classes.json."
        )

    train_ds = tf.keras.utils.image_dataset_from_directory(
        data_path,
        validation_split=0.2,
        subset="training",
        seed=42,
        class_names=CANONICAL_60_CLASSES,
        label_mode="categorical",
        image_size=IMG_SIZE,
        batch_size=BATCH_SIZE,
    )

    val_ds = tf.keras.utils.image_dataset_from_directory(
        data_path,
        validation_split=0.2,
        subset="validation",
        seed=42,
        class_names=CANONICAL_60_CLASSES,
        label_mode="categorical",
        image_size=IMG_SIZE,
        batch_size=BATCH_SIZE,
        shuffle=False,
    )

    augmentation = tf.keras.Sequential(
        [
            tf.keras.layers.RandomFlip("horizontal_and_vertical"),
            tf.keras.layers.RandomRotation(0.15),
            tf.keras.layers.RandomZoom(0.15),
            tf.keras.layers.RandomContrast(0.15),
        ],
        name="in_field_augmentation",
    )

    AUTOTUNE = tf.data.AUTOTUNE
    train_ds = (
        train_ds.map(lambda x, y: (augmentation(x, training=True), y), num_parallel_calls=AUTOTUNE)
        .map(preprocess_mobilenet_v2, num_parallel_calls=AUTOTUNE)
        .prefetch(AUTOTUNE)
    )
    val_ds = val_ds.map(preprocess_mobilenet_v2, num_parallel_calls=AUTOTUNE).prefetch(AUTOTUNE)

    model, base_model = build_model(len(CANONICAL_60_CLASSES))

    # Stage 1: Train classification head
    print("\n--- Stage 1: Training Classification Head ---")
    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=1e-3),
        loss="categorical_crossentropy",
        metrics=["accuracy"],
    )
    model.fit(train_ds, validation_data=val_ds, epochs=args.epochs_head)

    # Stage 2: Fine-tune top MobileNetV2 inverted residual blocks
    print("\n--- Stage 2: Fine-Tuning Top MobileNetV2 Layers ---")
    base_model.trainable = True
    for layer in base_model.layers[:-40]:
        layer.trainable = False

    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=1e-4),
        loss="categorical_crossentropy",
        metrics=["accuracy"],
    )
    callbacks = [
        tf.keras.callbacks.EarlyStopping(patience=4, restore_best_weights=True),
        tf.keras.callbacks.ReduceLROnPlateau(factor=0.3, patience=2),
    ]
    model.fit(train_ds, validation_data=val_ds, epochs=args.epochs_finetune, callbacks=callbacks)

    # Evaluate on held-out validation split
    print("\n--- Evaluating on Held-Out Split ---")
    y_true = []
    y_pred = []
    for batch_x, batch_y in val_ds:
        preds = model.predict(batch_x, verbose=0)
        y_true.extend(np.argmax(batch_y.numpy(), axis=1))
        y_pred.extend(np.argmax(preds, axis=1))

    report_str = classification_report(
        y_true, y_pred, target_names=CANONICAL_60_CLASSES, digits=3, zero_division=0
    )
    print(report_str)

    # Save Keras model and convert to TensorFlow.js LayersModel format
    os.makedirs(args.output_dir, exist_ok=True)
    h5_path = os.path.join(args.output_dir, "agrivision_mobilenetv2_60.h5")
    model.save(h5_path)
    print(f"Saved Keras model to {h5_path}")

    # Convert with a 50MB shard limit so all weights fit into a single .bin file
    subprocess.run(
        [
            "tensorflowjs_converter",
            "--input_format=keras",
            "--quantize_uint8",
            "--weight_shard_size_bytes=50000000",
            h5_path,
            args.output_dir,
        ],
        check=True,
    )

    # Rename group1-shard1of1.bin -> weights.bin and update model.json manifest
    shard_file = os.path.join(args.output_dir, "group1-shard1of1.bin")
    weights_bin = os.path.join(args.output_dir, "weights.bin")
    model_json_path = os.path.join(args.output_dir, "model.json")
    if os.path.exists(shard_file) and os.path.exists(model_json_path):
        os.replace(shard_file, weights_bin)
        with open(model_json_path, "r", encoding="utf-8") as f:
            manifest_data = json.load(f)
        for group in manifest_data.get("weightsManifest", []):
            group["paths"] = ["weights.bin"]
        with open(model_json_path, "w", encoding="utf-8") as f:
            json.dump(manifest_data, f, indent=2)

    print(f"\n[SUCCESS] Exported TF.js model to {args.output_dir}/model.json + {args.output_dir}/weights.bin")


if __name__ == "__main__":
    main()
