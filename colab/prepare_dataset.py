#!/usr/bin/env python3
"""
AgriVision 60-Class Dataset Downloader & Canonical Folder Mapper
================================================================
Prepares the `./dataset/<className>/` directory structure in the exact 60-class
order required by `src/data/classes.json`.

What it does:
1. Creates all 60 canonical class folders under `--output_dir` (default: `./dataset`).
2. Downloads public datasets (PlantVillage + PlantDoc + Rice/Wheat/Cotton/Sugarcane)
   via KaggleHub / HuggingFace datasets or merges any local source folders you pass
   via `--source_dirs`.
3. Normalizes folder names (handling spaces vs underscores, double vs triple
   underscores, and crop/disease aliases) into the 60 canonical AgriVision classes.

Usage in Google Colab:
----------------------
python colab/prepare_dataset.py --output_dir ./dataset --download_hf
"""

import argparse
import os
import pathlib
import re
import shutil
from PIL import Image

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


def normalize_key(text: str) -> str:
    return re.sub(r"[^a-z0-9]", "", text.lower())


# Map normalized keys & common dataset folder names to canonical 60-class names
NORM_TO_CANONICAL = {normalize_key(c): c for c in CANONICAL_60_CLASSES}

FOLDER_ALIASES = {
    # PlantVillage & PlantDoc common folder names
    "cornmaizecommonrust": "Corn_(maize)___Common_rust",
    "corncommonrust": "Corn_(maize)___Common_rust",
    "maizecommonrust": "Corn_(maize)___Common_rust",
    "cornmaizecercosporaleafspotgrayleafspot": "Corn_(maize)___Cercospora_leaf_spot_Gray_leaf_spot",
    "corngrayleafspot": "Corn_(maize)___Cercospora_leaf_spot_Gray_leaf_spot",
    "cornmaizenorthernleafblight": "Corn_(maize)___Northern_Leaf_Blight",
    "cornnorthernleafblight": "Corn_(maize)___Northern_Leaf_Blight",
    "cornmaizehealthy": "Corn_(maize)___healthy",
    "cornhealthy": "Corn_(maize)___healthy",
    "pepperbellbacterialspot": "Pepper,_bell___Bacterial_spot",
    "pepperbellhealthy": "Pepper,_bell___healthy",
    "bellpepperbacterialspot": "Pepper,_bell___Bacterial_spot",
    "bellpepperhealthy": "Pepper,_bell___healthy",
    "tomatospidermitestwospottedspidermite": "Tomato___Spider_mites_Two-spotted_spider_mite",
    "tomatotwospottedspidermite": "Tomato___Spider_mites_Two-spotted_spider_mite",
    "tomatoyellowleafcurlvirus": "Tomato___Tomato_Yellow_Leaf_Curl_Virus",
    "tomatomosaicvirus": "Tomato___Tomato_mosaic_virus",
    "cherryincludingsourpowderymildew": "Cherry_(including_sour)___Powdery_mildew",
    "cherryincludingsourhealthy": "Cherry_(including_sour)___healthy",
    "cherrypowderymildew": "Cherry_(including_sour)___Powdery_mildew",
    "cherryhealthy": "Cherry_(including_sour)___healthy",
    "grapeesca": "Grape___Esca_(Black_Measles)",
    "grapeblackmeasles": "Grape___Esca_(Black_Measles)",
    "grapeescablackmeasles": "Grape___Esca_(Black_Measles)",
    "grapeleafblightisariopsisleafspot": "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)",
    "grapeisariopsisleafspot": "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)",
    "orangehaunglongbingcitrusgreening": "Orange___Haunglongbing_(Citrus_greening)",
    "orangecitrusgreening": "Orange___Haunglongbing_(Citrus_greening)",
    # Rice aliases
    "ricebrownspot": "Rice___Brown_Spot",
    "riceleafblast": "Rice___Leaf_Blast",
    "riceblast": "Rice___Leaf_Blast",
    "ricebacterialleafblight": "Rice___Bacterial_leaf_blight",
    "ricebacterialblight": "Rice___Bacterial_leaf_blight",
    "ricesheathblight": "Rice___Sheath_Blight",
    "ricetungro": "Rice___Tungro_Virus",
    "ricetungrovirus": "Rice___Tungro_Virus",
    "ricehealthy": "Rice___healthy",
    # Wheat aliases
    "wheatyellowrust": "Wheat___Yellow_rust",
    "wheatstriperust": "Wheat___Yellow_rust",
    "wheatbrownrust": "Wheat___Brown_rust",
    "wheatleafrust": "Wheat___Brown_rust",
    "wheatpowderymildew": "Wheat___Powdery_mildew",
    "wheathealthy": "Wheat___healthy",
    # Cotton aliases
    "cottonbacterialblight": "Cotton___Bacterial_blight",
    "cottoncurlvirus": "Cotton___Curl_virus",
    "cottonleafcurlvirus": "Cotton___Curl_virus",
    "cottonhealthy": "Cotton___healthy",
    # Sugarcane aliases
    "sugarcaneredrot": "Sugarcane___Red_rot",
    "sugarcanesmut": "Sugarcane___Smut",
    "sugarcanehealthy": "Sugarcane___healthy",
    # Blueberry / Raspberry / Soybean extras
    "blueberryscorch": "Blueberry___Scorch",
    "blueberrymummyberry": "Blueberry___Mummy_berry",
    "raspberryleafspot": "Raspberry___Leaf_spot",
    "raspberryrust": "Raspberry___Rust",
    "soybeanbacterialblight": "Soybean___Bacterial_blight",
    "soybeanfrogeyeleafspot": "Soybean___Frogeye_leaf_spot",
}


def resolve_canonical_class(raw_name: str):
    key = normalize_key(raw_name)
    if key in NORM_TO_CANONICAL:
        return NORM_TO_CANONICAL[key]
    if key in FOLDER_ALIASES:
        return FOLDER_ALIASES[key]
    return None


def ensure_60_directories(output_dir: pathlib.Path):
    output_dir.mkdir(parents=True, exist_ok=True)
    for cls_name in CANONICAL_60_CLASSES:
        (output_dir / cls_name).mkdir(parents=True, exist_ok=True)


def ingest_local_directory(source_dir: pathlib.Path, output_dir: pathlib.Path) -> int:
    copied = 0
    for root, dirs, files in os.walk(source_dir):
        folder_name = os.path.basename(root)
        canonical = resolve_canonical_class(folder_name)
        if not canonical:
            continue
        dest_folder = output_dir / canonical
        for f in files:
            if f.lower().endswith((".jpg", ".jpeg", ".png", ".webp")):
                src_file = pathlib.Path(root) / f
                dst_file = dest_folder / f"{source_dir.name}_{copied}_{f}"
                shutil.copy2(src_file, dst_file)
                copied += 1
    return copied


def download_huggingface_plantvillage(output_dir: pathlib.Path) -> int:
    """Downloads PlantVillage from HuggingFace (`gvashishtha/PlantVillage_Dataset` or `BrandonFors/Plant-Diseases-PlantVillage-Dataset`)."""
    try:
        from datasets import load_dataset
    except ImportError:
        print("[WARN] `datasets` library not installed. Run: pip install datasets")
        return 0

    saved = 0
    print("[INFO] Downloading PlantVillage dataset from HuggingFace...")
    ds = load_dataset("BrandonFors/Plant-Diseases-PlantVillage-Dataset", split="train")
    label_names = ds.features["label"].names if hasattr(ds.features.get("label"), "names") else []

    for idx, item in enumerate(ds):
        raw_label = label_names[item["label"]] if label_names else str(item.get("label", ""))
        canonical = resolve_canonical_class(raw_label)
        if not canonical:
            continue
        img = item["image"]
        if not isinstance(img, Image.Image):
            continue
        dst_path = output_dir / canonical / f"pv_{idx:06d}.jpg"
        img.convert("RGB").save(dst_path, quality=92)
        saved += 1
        if saved % 2500 == 0:
            print(f"  Saved {saved} images...")
    return saved


def print_dataset_summary(output_dir: pathlib.Path):
    print("\n================================================================")
    print(" AgriVision 60-Class Dataset Readiness Report")
    print("================================================================")
    empty_classes = []
    total_images = 0
    for idx, cls_name in enumerate(CANONICAL_60_CLASSES):
        cls_dir = output_dir / cls_name
        count = len(
            [
                f
                for f in cls_dir.iterdir()
                if f.is_file() and f.suffix.lower() in (".jpg", ".jpeg", ".png", ".webp")
            ]
        ) if cls_dir.exists() else 0
        total_images += count
        status = "OK" if count > 0 else "EMPTY"
        print(f"[{idx:02d}] {cls_name.ljust(52)} : {count:5d} images ({status})")
        if count == 0:
            empty_classes.append(cls_name)

    print("----------------------------------------------------------------")
    print(f"Total Images Across 60 Classes: {total_images}")
    if empty_classes:
        print(f"[NOTE] {len(empty_classes)} class folders currently have 0 images.")
        print("Add real leaf photos to those folders before running train_offline_model.py.")
    else:
        print("[READY] All 60 canonical classes are populated and ready for training!")


def main():
    parser = argparse.ArgumentParser(description="Prepare 60-Class AgriVision Dataset")
    parser.add_argument("--output_dir", type=str, default="./dataset")
    parser.add_argument(
        "--source_dirs",
        nargs="*",
        default=[],
        help="Optional local dataset folders (PlantVillage, PlantDoc, Rice, Wheat, Cotton, Sugarcane) to merge",
    )
    parser.add_argument(
        "--download_hf",
        action="store_true",
        help="Automatically download PlantVillage base dataset from HuggingFace",
    )
    args = parser.parse_args()

    out_path = pathlib.Path(args.output_dir)
    ensure_60_directories(out_path)

    if args.download_hf:
        count = download_huggingface_plantvillage(out_path)
        print(f"[OK] Saved {count} images from HuggingFace PlantVillage.")

    for src in args.source_dirs:
        src_path = pathlib.Path(src)
        if src_path.exists():
            copied = ingest_local_directory(src_path, out_path)
            print(f"[OK] Merged {copied} images from {src_path}")
        else:
            print(f"[WARN] Source directory not found: {src_path}")

    print_dataset_summary(out_path)


if __name__ == "__main__":
    main()
