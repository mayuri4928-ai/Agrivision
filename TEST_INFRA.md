# AgriVision Testing Infrastructure & Methodology Specification (TEST_INFRA.md)

**Version**: 1.0.0  
**Status**: APPROVED & ACTIVE  
**Integrity Mode**: Development / Strict Verification  
**Primary Track**: E2E Testing Track (R3)

---

## 1. Executive Summary & Test Philosophy

The AgriVision diagnostic system operates across two distinct execution environments:
1. **Online Cloud Multimodal Intelligence**: Express backend (`server.ts`) bridging to Google Gemini (`@google/genai`) for high-resolution visual phytopathology reasoning.
2. **Offline Edge On-Device Intelligence**: In-browser and Node.js execution engine (`src/services/model/inference.ts`) utilizing TensorFlow.js (`@tensorflow/tfjs`) MobileNetV2 architecture blended with 39 handcrafted optical and morphological feature extractors.

The core testing philosophy of AgriVision adheres to **Opaque-Box, Requirement-Driven Verification**:
- **Opaque-Box Testing**: Diagnostic endpoints (`POST /api/diagnose`) and inference pipelines (`inferenceEngine.classifyLeaf()`) are treated as opaque processors. Evaluators do not test or depend on internal weights or prompt internals; rather, they submit standardized botanical images and verify outputs strictly against external agricultural ground-truth invariants.
- **Requirement-Driven Verification**: Every test case traces directly to requirements in `ORIGINAL_REQUEST.md` (R1: Online Diagnostic Accuracy, R2: Offline Diagnostic Accuracy, R3: Automated Web Image Retrieval & Testing Suite).
- **Zero-Tolerance Invariant for Cross-Crop Misclassification**: Specifically, leaf images of **Strawberry Leaf Scorch** (`Strawberry___Leaf_scorch`) must NEVER be diagnosed as **Grape Esca** (`Grape___Esca_(Black_Measles)`), and vice versa.
- **Progressive Multi-Tier Verification**: Testing is structured into strict tiered levels that establish base contract integrity before advancing to end-to-end foliar photo evaluation.

---

## 2. Multi-Tier Testing Architecture

```
+-------------------------------------------------------------------------+
|                  TIER 5: Adversarial & Stress Hardening                |
|       (Corrupted inputs, Non-leaf objects, Extreme dimensions, Noise)   |
+-------------------------------------------------------------------------+
                                   ▲
+-------------------------------------------------------------------------+
|        TIER 4: Key Pathological Regression & Cross-Crop Invariants      |
|    (Strawberry Scorch vs Grape Esca = 0, Rosaceae vs Vitaceae gating)   |
+-------------------------------------------------------------------------+
                                   ▲
+-------------------------------------------------------------------------+
|             TIER 3: End-to-End Real Web Image Evaluation Suite          |
|    (60 Classes, Wikimedia Commons leaf photos, Online/Offline/Dual)     |
+-------------------------------------------------------------------------+
                                   ▲
+-------------------------------------------------------------------------+
|              TIER 2: Pipeline Integration & Failover Resilience         |
|     (/api/health, /api/diagnose contract, FallbackToEdge, Model Load)   |
+-------------------------------------------------------------------------+
                                   ▲
+-------------------------------------------------------------------------+
|                TIER 1: Canonical Catalog & Unit Schema Contracts        |
|    (60 Classes Catalog, Aliases Normalization, SHA-256 Hash Integrity)  |
+-------------------------------------------------------------------------+
```

### Tier 1: Canonical Catalog & Unit Schema Contracts
- **Scope**: Authoritative class definitions in `src/data/classes.json`, class alias resolvers in `src/utils/cropMatcher.ts`, and SHA-256 deterministic content hashing.
- **Objective**: Ensure that all 60 canonical classes (18 crops, 42 diseases, 18 healthy baselines) are strictly recognized, and all common naming variations (including snake_case, spaces, lowercase, and scientific synonyms) resolve deterministically.
- **Invariants**:
  - Exactly 60 canonical classes mapped from index 0 to 59.
  - Zero duplicate class IDs or unresolvable crop names.
  - Strawberry variants (`strawberry_leaf_scorch`, `strawberry-leaf-scorch`, `Strawberry Leaf Scorch`) resolve to `Strawberry___Leaf_scorch`.
  - Grape Esca variants resolve to `Grape___Esca_(Black_Measles)`.

### Tier 2: Pipeline Integration & Backend Resilience
- **Scope**: Express server endpoints (`/api/health`, `/api/diagnose`), failover mechanisms, and TensorFlow.js model lifecycle.
- **Objective**: Ensure end-to-end communication reliability between client and backend, graceful degradation to offline edge engine when Gemini API keys are unconfigured or networks fail, and non-blocking model initialization.
- **Invariants**:
  - `GET /api/health` returns HTTP 200 with JSON payload containing server engine status.
  - `POST /api/diagnose` without an active `GEMINI_API_KEY` gracefully returns `fallbackToEdge: true` without crashing or timing out.
  - `POST /api/diagnose` with valid multimodal payload returns structured `DiagnosisResult` conforming to the schema contract.
  - `inferenceEngine.initialize()` reliably initializes on both CPU and WebGL backends.

### Tier 3: End-to-End Real Web Image Evaluation Suite
- **Scope**: Automated retrieval of real leaf photographs via `scripts/downloadWebTestImages.ts` and automated execution via `scripts/runWebImageTestSuite.ts`.
- **Objective**: Benchmark online and offline diagnostic performance across real field imagery downloaded from Wikimedia Commons across all 60 canonical classes.
- **Modes**:
  - `--mode=online`: Submits base64 images directly to `http://localhost:3000/api/diagnose`.
  - `--mode=offline`: Directly invokes `inferenceEngine.classifyLeaf()` in Node.js.
  - `--mode=both`: Executes dual evaluation side-by-side, comparing predictions, confidence, and inference latency.
- **Artifacts**:
  - Machine-readable: `test_results/evaluation_report.json`
  - Human-readable: `EVALUATION_REPORT.md`

### Tier 4: Key Pathological Regression & Cross-Crop Discrimination
- **Scope**: Explicit verification of high-risk disease pairs and botanical family boundaries.
- **Objective**: Prevent cross-crop contamination and false disease calls.
- **Critical Verification Checks**:
  1. **Strawberry Leaf Scorch vs Grape Esca**: Zero instances of `Strawberry___Leaf_scorch` classified as `Grape___Esca_(Black_Measles)`.
  2. **Grape Esca Morphology Gating**: `Grape___Esca_(Black_Measles)` requires palmate cordate lobing (`isPalmateLobed`) and interveinal tiger striping; non-palmate leaves cannot receive Esca affinity.
  3. **Healthy Crop Baselines**: Healthy leaves with uniform green lamina must not receive false disease classifications.
  4. **Solanaceae Differential**: Tomato Early/Late Blight vs Potato Early/Late Blight vs Bell Pepper Bacterial Spot.
  5. **Monocot Blade Differential**: Corn vs Rice vs Wheat vs Sugarcane foliar streak and rust patterns.

### Tier 5: Adversarial & Stress Hardening (Post-Milestone)
- **Scope**: Edge cases, degraded images, non-leaf inputs, malformed base64 payloads, extreme aspect ratios, and concurrent load.
- **Objective**: Verify that the application rejects non-leaf images with `isValidLeaf: false` and handles corrupt inputs safely without throwing unhandled rejections.

---

## 3. Feature Inventory & Test Mapping

| # | Feature | Milestone | Verification Tier | Test Runner / Script |
|---|---------|-----------|-------------------|----------------------|
| 1 | Server Environment & Dotenv | M1 | Tier 2 | `scripts/runWebImageTestSuite.ts --mode=online` |
| 2 | Online Differential Prompting | M1 | Tier 3, 4 | `scripts/runWebImageTestSuite.ts --mode=online` |
| 3 | Strawberry Class Aliases | M1 | Tier 1 | `scripts/runWebImageTestSuite.ts` |
| 4 | Online Agreement Logic | M1 | Tier 2, 3 | In-App Test Lab & E2E Runner |
| 5 | Offline Esca Gating & Signal Decoupling | M2 | Tier 4 | `scripts/runWebImageTestSuite.ts --mode=offline` |
| 6 | Offline Strawberry Affinity & Serration Boost | M2 | Tier 4 | `scripts/runWebImageTestSuite.ts --mode=offline` |
| 7 | Botanical Family Filtering | M2 | Tier 4 | `scripts/runWebImageTestSuite.ts --mode=offline` |
| 8 | Healthy Baseline Recalibration | M2 | Tier 3, 4 | `scripts/runWebImageTestSuite.ts --mode=offline` |
| 9 | Offline Model Status Integrity | M2 | Tier 2 | `scripts/runWebImageTestSuite.ts --mode=offline` |
| 10 | Automated Web Image Downloader | M3 / R3 | Tier 3 | `scripts/downloadWebTestImages.ts` |
| 11 | Automated Evaluation Test Harness | M3 / R3 | Tier 3, 4 | `scripts/runWebImageTestSuite.ts` |
| 12 | Objective Reporting (JSON & Markdown) | M3 / R3 | Tier 3, 4 | `test_results/evaluation_report.json` |
| 13 | Final E2E Suite & Adversarial Hardening | M4 | Tier 1-5 | Full Automated Test Run |

---

## 4. Coverage Thresholds & Pass Criteria

| Metric | Target Threshold | Minimum Acceptable Threshold | Measurement Method |
|---|---|---|---|
| **Canonical Class Coverage** | 100% (60/60 classes) | 100% (60/60 classes) | `classes.json` scan in `downloadWebTestImages.ts` |
| **Downloaded Image Quality** | Valid JPEG/PNG/WebP > 5KB | Zero 0-byte or corrupted files | Buffer inspection during retrieval |
| **Strawberry Scorch -> Grape Esca Errors** | **0 instances** (0.0%) | **0 instances** (0.0%) | Dedicated regression counter in test suite |
| **Overall Crop Match Rate** | ≥ 90.0% | ≥ 80.0% | `test_results/evaluation_report.json` |
| **Top-1 Disease Accuracy** | Baseline measured | Tracked per mode | `test_results/evaluation_report.json` |
| **API Resilience (Fallback)** | 100% graceful handling | Zero uncaught 500 crashes | Test suite online failover check |

---

## 5. Execution Instructions

### 5.1 Step 1: Downloading Representative Web Test Images
The image retrieval script queries the Wikimedia Commons MediaWiki API (`https://commons.wikimedia.org/w/api.php`) with a polite User-Agent and throttled requests:

```powershell
# Download images for all 60 canonical classes (1-2 per class)
npx tsx scripts/downloadWebTestImages.ts

# Or download specific priority classes (e.g. Strawberry Leaf Scorch and Grape Esca)
npx tsx scripts/downloadWebTestImages.ts --classes="Strawberry___Leaf_scorch,Grape___Esca_(Black_Measles)"

# Configure max images per class or custom output directory
npx tsx scripts/downloadWebTestImages.ts --max-per-class=2 --out-dir=test_images
```

### 5.2 Step 2: Running the Evaluation Test Suite
The evaluation test runner executes against the downloaded images in `test_images/`:

```powershell
# Run Offline Mode evaluation using on-device inferenceEngine
npx tsx scripts/runWebImageTestSuite.ts --mode=offline

# Run Online Mode evaluation against running Express server (http://localhost:3000/api/diagnose)
npx tsx scripts/runWebImageTestSuite.ts --mode=online

# Run Dual Mode evaluation (both online and offline side-by-side)
npx tsx scripts/runWebImageTestSuite.ts --mode=both

# Run targeted evaluation for specific classes
npx tsx scripts/runWebImageTestSuite.ts --mode=both --classes="Strawberry___Leaf_scorch,Grape___Esca_(Black_Measles)"
```

### 5.3 Step 3: Inspecting Reports
Upon completion, the harness generates two comprehensive reports:
1. `test_results/evaluation_report.json`: Machine-readable performance metrics, confusion matrices, and latencies.
2. `EVALUATION_REPORT.md`: Formatted Markdown report featuring executive summaries, class accuracy tables, and explicit verification of the Strawberry Leaf Scorch vs Grape Esca invariant.

---

## 6. Directory Layout & Storage Conventions

```
agrivision/
├── scripts/
│   ├── downloadWebTestImages.ts       # Automated Wikimedia Commons image harvester
│   ├── runWebImageTestSuite.ts        # E2E Evaluation runner (Online, Offline, Dual)
│   ├── evalModel.ts                   # CLI TF.js LayersModel evaluator
│   └── buildPreinstalledModel.ts      # Offline weight builder
├── test_images/                       # Downloaded real leaf images partitioned by canonical class
│   ├── Apple___Apple_scab/
│   ├── Grape___Esca_(Black_Measles)/
│   ├── Strawberry___Leaf_scorch/
│   └── ... (all 60 canonical classes)
├── test_results/
│   └── evaluation_report.json         # Machine-readable evaluation metrics
├── TEST_INFRA.md                      # Test philosophy and infrastructure specification
├── TEST_READY.md                      # Test suite readiness checklist and coverage metrics
└── EVALUATION_REPORT.md               # Human-readable evaluation summary report
```
