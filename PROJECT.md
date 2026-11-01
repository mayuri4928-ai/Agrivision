# Project: AgriVision Diagnostic Accuracy & Automated Web Image Testing Harness

## Architecture
AgriVision is an agricultural diagnostic web application providing dual-mode plant pathology diagnosis:
1. **Online Mode (Multimodal Gemini AI)**:
   - Client sends base64-encoded leaf image to `POST /api/diagnose`.
   - Express server (`server.ts`) formats system instruction & multimodal payload to Google Gemini API (`@google/genai`).
   - Parses structured response, validates against canonical catalog (`src/utils/cropMatcher.ts`), returns diagnosis.
   - Client (`src/services/diagnosticService.ts`) runs multi-stage quality checks, caching, and on-device consensus verification.
2. **Offline Mode (On-Device TensorFlow.js)**:
   - On-device inference engine (`src/services/model/inference.ts`) uses TensorFlow.js model (`public/model/model.json`) and heuristic visual feature extraction (39 color/morphological signals).
   - Fuses neural output and botanical pathology signatures (`src/data/offlinePathologySignatures.ts`) into a 60-class probability distribution.
3. **Automated Web Image Retrieval & Testing Suite**:
   - Programmatic search & download of leaf photos from Wikimedia Commons / open sources across all 60 canonical classes.
   - Automated evaluation harness testing both online and offline diagnostic endpoints, generating structured accuracy and confusion reports.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Server Environment Configuration | Load `.env` in `server.ts` via `dotenv/config` so `GEMINI_API_KEY` is active | M1 | Survey |
| 2 | Online Differential Prompt Engineering | Add explicit morphology & pathology differential rules in `server.ts` distinguishing Strawberry (trifoliate/serrated) from Grape (palmate cordate tiger-stripes) and Apple | M1 | R1 |
| 3 | Strawberry Class Aliases & Resolution | Add Strawberry class mappings in `cropMatcher.ts` so all name variants resolve to `Strawberry___Leaf_scorch` and `Strawberry___healthy` | M1 | R1 |
| 4 | Online Consensus Logic Fix | Correct `diagnosticService.ts` on-device agreement check so it does not falsely mark valid online predictions as `DISAGREES` | M1 | R1 |
| 5 | Offline Esca Gating & Signal Decoupling | Require `signals.isPalmateLobed` and `signals.tigerStripeScore` for Grape Esca in `inference.ts`; decouple `scorchRedCount` from `grapeEscaScore` | M2 | R2 |
| 6 | Offline Strawberry Affinity & Serration Boost | Add Strawberry Leaf Scorch affinity boosting for serrated margin + scorch red, penalize Grape Esca on non-palmate leaves | M2 | R2 |
| 7 | Botanical Family Filtering Activation | Wire `filterLowProbabilityFalsePositives` from `postProcessing.ts` into `inference.ts` to prevent cross-family false positives (e.g., Rosaceae vs Vitaceae) | M2 | R2 |
| 8 | Healthy Baseline Gating & Morphology | Recalibrate healthy lesion threshold in `inference.ts` from 2.5% to 5.0% and incorporate leaf shape discriminators to prevent false disease diagnosis on clean leaves | M2 | R2 |
| 9 | Offline Model Lifecycle & Status Integrity | Accurately report model installation status and set `isOfflineFallbackWithoutWeights = true` when weights are missing/uninitialized | M2 | R2 |
| 10 | Automated Web Image Retrieval Script | Search & download representative leaf images across all 60 supported classes using Wikimedia Commons API | M3 / E2E Track | R3 |
| 11 | Automated Evaluation Test Harness | CLI test runner (`scripts/runWebImageTestSuite.ts`) testing online `/api/diagnose` and offline `inferenceEngine` | M3 / E2E Track | R3 |
| 12 | Objective Verification & Reporting | Generate `EVALUATION_REPORT.md` and JSON detailing class-by-class predictions, match rates, and confirmation of 0 Strawberry Leaf Scorch -> Grape Esca errors | M3 / E2E Track | R3 |
| 13 | Final E2E Suite & Adversarial Hardening | Execute full test suite across Tiers 1-4 with 100% pass rate, followed by Tier 5 adversarial stress testing | Final Milestone | Acceptance Criteria |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| E2E | E2E Testing Track | Design test infra, test cases, and publish TEST_READY.md | Survey | IN_PROGRESS |
| M1 | Online Mode Diagnostic Accuracy | Fix server.ts, cropMatcher.ts, diagnosticService.ts, prompt engineering, Strawberry Leaf Scorch vs Grape Esca | Survey | IN_PROGRESS |
| M2 | Offline Mode Diagnostic Accuracy | Fix inference.ts, postProcessing.ts, offlinePathologySignatures.ts, healthy baselines, model status | Survey | IN_PROGRESS |
| M3 | Web Image Retrieval & Test Harness Integration | Implement downloadWebTestImages.ts, runWebImageTestSuite.ts, test execution against online & offline modes | M1, M2, E2E | PLANNED |
| M4 | Final Milestone: E2E Verification & Hardening | Phase 1: 100% pass on Tiers 1-4; Phase 2: Tier 5 adversarial hardening | M1, M2, M3 | PLANNED |

## Code Layout & Write Boundaries
- **Milestone 1 (Online Mode)**:
  - Exclusive write ownership: `server.ts`, `src/utils/cropMatcher.ts`, `src/services/diagnosticService.ts`, `.env`
- **Milestone 2 (Offline Mode)**:
  - Exclusive write ownership: `src/services/model/inference.ts`, `src/services/model/postProcessing.ts`, `src/data/offlinePathologySignatures.ts`
- **Milestone 3 & E2E Testing Track**:
  - Exclusive write ownership: `scripts/downloadWebTestImages.ts`, `scripts/runWebImageTestSuite.ts`, `TEST_INFRA.md`, `TEST_READY.md`, `test_images/`
- **No Worker may write to files owned by another Milestone**.

## Interface Contracts
### Client ↔ Server Online Diagnosis (`server.ts` ↔ `diagnosticService.ts`)
- **Endpoint**: `POST /api/diagnose`
- **Payload**:
  ```json
  {
    "imageBase64": "data:image/jpeg;base64,...",
    "contentHash": "string",
    "userCropHint": "auto" | "strawberry" | "grape" | "apple" | ...,
    "language": "en" | "hi" | ...
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "className": "Strawberry___Leaf_scorch",
    "crop": "Strawberry",
    "disease": "Leaf Scorch",
    "confidencePercentage": 92,
    "visualObservation": "string",
    "topAlternatives": [...]
  }
  ```
- **Fallback response** (on error or unconfigured key):
  ```json
  {
    "success": false,
    "fallbackToEdge": true,
    "reason": "string"
  }
  ```

### Offline Inference Engine (`inference.ts`)
- **Method**: `classifyLeaf(imageElement, tensor, userCropHint, language)`
- **Returns**: `Promise<DiagnosisResult>`
  - `className`: Canonical class from `PLANT_CLASSES` (e.g. `Strawberry___Leaf_scorch`)
  - `confidence`: number 0..100
  - `isOfflineFallbackWithoutWeights`: boolean
  - `topAlternatives`: Array<{ className, confidence }>

### Automated Evaluation Harness (`scripts/runWebImageTestSuite.ts`)
- **CLI Invocations**:
  - `npx tsx scripts/downloadWebTestImages.ts [--max-per-class=2] [--classes=...]`
  - `npx tsx scripts/runWebImageTestSuite.ts [--mode=online|offline|both] [--out=EVALUATION_REPORT.md]`
- **Report Outputs**:
  - `test_results/evaluation_report.json`
  - `EVALUATION_REPORT.md` (Markdown summary with class accuracy, crop match rate, and Strawberry Leaf Scorch verification)
