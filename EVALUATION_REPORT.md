# AgriVision Web Image Diagnostic Evaluation Report

**Timestamp**: 2026-11-01T10:42:06.847Z  
**Evaluation Mode**: `BOTH`  
**Images Evaluated**: 60 across 60 canonical classes  
**Dataset Directory**: `C:\Users\dhruvik\Downloads\agrivision-oct-30-2026-11-10-31-pm\test_images`

## 1. Key Invariant: Strawberry Leaf Scorch vs Grape Esca

| Invariant Metric | Requirement | Observed Result | Status |
|---|---|---|---|
| **Strawberry Scorch Samples Evaluated** | ≥ 1 | 1 | INFO |
| **Strawberry Scorch → Grape Esca Misidentifications** | **0 instances** | **0** | ✅ **PASSED (ZERO ERRORS)** |

## 2. Executive Performance Summary

| Engine / Mode | Evaluated | Top-1 Class Accuracy | Crop Match Rate | Avg Confidence | Avg Latency | Fallback Rate |
|---|---|---|---|---|---|---|
| **Offline (On-Device TF.js)** | 60 | 3.3% (2/60) | 20% (12/60) | 100% | 217ms | 60 |
| **Online (Gemini Cloud)** | 60 | 61.7% (37/60) | 83.3% (50/60) | 78.7% | 3640ms | 6 |

## 3. Class-by-Class Performance Breakdown

| Canonical Class | Crop | Samples | Offline Class Acc | Offline Crop Acc | Online Class Acc | Online Crop Acc | Status |
|---|---|---|---|---|---|---|---|
| `Apple___Apple_scab` | Apple | 1 | 0% | 0% | 100% | 100% | ❌ FAIL |
| `Apple___Black_rot` | Apple | 1 | 0% | 0% | 100% | 100% | ❌ FAIL |
| `Apple___Cedar_apple_rust` | Apple | 1 | 0% | 0% | 100% | 100% | ❌ FAIL |
| `Apple___healthy` | Apple | 1 | 0% | 0% | 100% | 100% | ❌ FAIL |
| `Blueberry___Anthracnose` | Blueberry | 1 | 0% | 0% | 0% | 100% | ❌ FAIL |
| `Blueberry___healthy` | Blueberry | 1 | 0% | 0% | 100% | 100% | ❌ FAIL |
| `Blueberry___Stem_blight` | Blueberry | 1 | 0% | 0% | 0% | 0% | ❌ FAIL |
| `Cherry_(including_sour)___healthy` | Cherry | 1 | 0% | 0% | 100% | 100% | ❌ FAIL |
| `Cherry_(including_sour)___Powdery_mildew` | Cherry | 1 | 0% | 0% | 0% | 0% | ❌ FAIL |
| `Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot` | Corn / Maize | 1 | 0% | 0% | 100% | 100% | ❌ FAIL |
| `Corn_(maize)___Common_rust` | Corn / Maize | 1 | 0% | 0% | 100% | 100% | ❌ FAIL |
| `Corn_(maize)___healthy` | Corn / Maize | 1 | 0% | 0% | 100% | 100% | ❌ FAIL |
| `Corn_(maize)___Northern_Leaf_Blight` | Corn / Maize | 1 | 0% | 0% | 0% | 100% | ❌ FAIL |
| `Cotton___Bacterial_blight` | Cotton | 1 | 0% | 0% | 100% | 100% | ❌ FAIL |
| `Cotton___healthy` | Cotton | 1 | 0% | 0% | 100% | 100% | ❌ FAIL |
| `Cotton___Leaf_curl_virus` | Cotton | 1 | 0% | 0% | 0% | 100% | ❌ FAIL |
| `Grape___Black_rot` | Grape | 1 | 0% | 0% | 100% | 100% | ❌ FAIL |
| `Grape___Esca_(Black_Measles)` | Grape | 1 | 0% | 0% | 100% | 100% | ❌ FAIL |
| `Grape___healthy` | Grape | 1 | 0% | 0% | 100% | 100% | ❌ FAIL |
| `Grape___Leaf_blight_(Isariopsis_Leaf_Spot)` | Grape | 1 | 0% | 0% | 100% | 100% | ❌ FAIL |
| `Orange___Haunglongbing_(Citrus_greening)` | Orange | 1 | 0% | 0% | 0% | 100% | ❌ FAIL |
| `Orange___healthy` | Orange | 1 | 0% | 0% | 100% | 100% | ❌ FAIL |
| `Peach___Bacterial_spot` | Peach | 1 | 0% | 0% | 100% | 100% | ❌ FAIL |
| `Peach___healthy` | Peach | 1 | 0% | 0% | 0% | 0% | ❌ FAIL |
| `Pepper,_bell___Bacterial_spot` | Bell Pepper | 1 | 0% | 0% | 100% | 100% | ❌ FAIL |
| `Pepper,_bell___healthy` | Bell Pepper | 1 | 0% | 0% | 100% | 100% | ❌ FAIL |
| `Potato___Early_blight` | Potato | 1 | 0% | 0% | 100% | 100% | ❌ FAIL |
| `Potato___healthy` | Potato | 1 | 0% | 0% | 100% | 100% | ❌ FAIL |
| `Potato___Late_blight` | Potato | 1 | 0% | 0% | 100% | 100% | ❌ FAIL |
| `Raspberry___Cane_blight` | Raspberry | 1 | 0% | 0% | 0% | 100% | ❌ FAIL |
| `Raspberry___healthy` | Raspberry | 1 | 0% | 0% | 0% | 0% | ❌ FAIL |
| `Raspberry___Yellow_rust` | Raspberry | 1 | 0% | 0% | 100% | 100% | ❌ FAIL |
| `Rice___Bacterial_leaf_blight` | Rice (Paddy) | 1 | 0% | 0% | 0% | 100% | ❌ FAIL |
| `Rice___Brown_spot` | Rice (Paddy) | 1 | 0% | 0% | 100% | 100% | ❌ FAIL |
| `Rice___healthy` | Rice (Paddy) | 1 | 0% | 0% | 0% | 0% | ❌ FAIL |
| `Rice___Leaf_Blast` | Rice (Paddy) | 1 | 0% | 0% | 100% | 100% | ❌ FAIL |
| `Soybean___Cercospora_leaf_spot` | Soybean | 1 | 0% | 0% | 100% | 100% | ❌ FAIL |
| `Soybean___healthy` | Soybean | 1 | 0% | 0% | 0% | 100% | ❌ FAIL |
| `Soybean___Rust` | Soybean | 1 | 0% | 0% | 0% | 100% | ❌ FAIL |
| `Squash___healthy` | Squash | 1 | 0% | 0% | 100% | 100% | ❌ FAIL |
| `Squash___Powdery_mildew` | Squash | 1 | 0% | 0% | 100% | 100% | ❌ FAIL |
| `Strawberry___healthy` | Strawberry | 1 | 100% | 100% | 0% | 0% | ✅ PASS |
| `Strawberry___Leaf_scorch` | Strawberry | 1 | 0% | 100% | 100% | 100% | ✅ PASS |
| `Sugarcane___healthy` | Sugarcane | 1 | 0% | 0% | 0% | 0% | ❌ FAIL |
| `Sugarcane___Red_rot` | Sugarcane | 1 | 0% | 0% | 0% | 100% | ❌ FAIL |
| `Sugarcane___Smut` | Sugarcane | 1 | 0% | 0% | 100% | 100% | ❌ FAIL |
| `Tomato___Bacterial_spot` | Tomato | 1 | 0% | 100% | 0% | 0% | ✅ PASS |
| `Tomato___Early_blight` | Tomato | 1 | 0% | 100% | 100% | 100% | ✅ PASS |
| `Tomato___healthy` | Tomato | 1 | 100% | 100% | 100% | 100% | ✅ PASS |
| `Tomato___Late_blight` | Tomato | 1 | 0% | 100% | 0% | 100% | ✅ PASS |
| `Tomato___Leaf_Mold` | Tomato | 1 | 0% | 100% | 0% | 100% | ✅ PASS |
| `Tomato___Septoria_leaf_spot` | Tomato | 1 | 0% | 100% | 0% | 100% | ✅ PASS |
| `Tomato___Spider_mites Two-spotted_spider_mite` | Tomato | 1 | 0% | 100% | 100% | 100% | ✅ PASS |
| `Tomato___Target_Spot` | Tomato | 1 | 0% | 100% | 100% | 100% | ✅ PASS |
| `Tomato___Tomato_mosaic_virus` | Tomato | 1 | 0% | 100% | 100% | 100% | ✅ PASS |
| `Tomato___Tomato_Yellow_Leaf_Curl_Virus` | Tomato | 1 | 0% | 100% | 0% | 0% | ✅ PASS |
| `Wheat___Brown_rust` | Wheat | 1 | 0% | 0% | 100% | 100% | ❌ FAIL |
| `Wheat___healthy` | Wheat | 1 | 0% | 0% | 0% | 0% | ❌ FAIL |
| `Wheat___Powdery_mildew` | Wheat | 1 | 0% | 0% | 0% | 100% | ❌ FAIL |
| `Wheat___Yellow_rust` | Wheat | 1 | 0% | 0% | 100% | 100% | ❌ FAIL |

## 4. Top Confusions (Actual -> Predicted)

### Offline Top Confusions
| Actual Class | Predicted Class | Count |
|---|---|---|
| `Apple___Apple_scab` | `Tomato___healthy` | 1x |
| `Apple___Black_rot` | `Tomato___healthy` | 1x |
| `Apple___Cedar_apple_rust` | `Tomato___healthy` | 1x |
| `Apple___healthy` | `Tomato___healthy` | 1x |
| `Blueberry___Anthracnose` | `Tomato___healthy` | 1x |
| `Blueberry___healthy` | `Tomato___healthy` | 1x |
| `Blueberry___Stem_blight` | `Tomato___healthy` | 1x |
| `Cherry_(including_sour)___healthy` | `Tomato___healthy` | 1x |
| `Cherry_(including_sour)___Powdery_mildew` | `Tomato___healthy` | 1x |
| `Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot` | `Tomato___healthy` | 1x |

### Online Top Confusions
| Actual Class | Predicted Class | Count |
|---|---|---|
| `Blueberry___Anthracnose` | `Blueberry___Stem_blight` | 1x |
| `Cherry_(including_sour)___Powdery_mildew` | `Squash___Powdery_mildew` | 1x |
| `Corn_(maize)___Northern_Leaf_Blight` | `Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot` | 1x |
| `Cotton___Leaf_curl_virus` | `Cotton___healthy` | 1x |
| `Orange___Haunglongbing_(Citrus_greening)` | `Orange___healthy` | 1x |
| `Raspberry___Cane_blight` | `Raspberry___healthy` | 1x |
| `Rice___Bacterial_leaf_blight` | `Rice___Leaf_Blast` | 1x |
| `Soybean___healthy` | `Soybean___Cercospora_leaf_spot` | 1x |
| `Soybean___Rust` | `Soybean___Cercospora_leaf_spot` | 1x |
| `Sugarcane___healthy` | `UNSUPPORTED` | 1x |

## 5. Verification Sign-Off

- **Test Harness Execution**: Completed successfully via `scripts/runWebImageTestSuite.ts`.
- **Invariant Status**: Strawberry Leaf Scorch → Grape Esca errors = **0**.
- **Machine-readable artifact generated**: `C:\Users\dhruvik\Downloads\agrivision-oct-30-2026-11-10-31-pm\test_results\evaluation_report.json`.
