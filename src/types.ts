/**
 * AgriVision TypeScript Types & Interfaces
 */

export type LanguageCode =
  | 'en' // English
  | 'hi' // Hindi (हिन्दी)
  | 'gu' // Gujarati (ગુજરાતી)
  | 'mr' // Marathi (मराठी)
  | 'bn' // Bengali (বাংলা)
  | 'te' // Telugu (తెలుగు)
  | 'ta' // Tamil (தமிழ்)
  | 'kn' // Kannada (ಕನ್ನಡ)
  | 'ml' // Malayalam (മലയാളം)
  | 'pa' // Punjabi (ਪੰਜਾਬੀ)
  | 'or' // Odia (ଓଡ଼ିଆ)
  | 'as'; // Assamese (অসমীয়া)

export type ConfidenceLevel = 'HIGH' | 'MODERATE' | 'LOW';

export interface ClassDefinition {
  id: number;
  className: string;
  crop: string;
  cropId: string;
  disease: string;
  isHealthy: boolean;
}

export interface DiseaseDetail {
  className: string;
  crop: string;
  disease: string;
  name?: string;
  diseaseName?: string;
  isHealthy: boolean;
  scientificName?: string;
  pathogenType?: 'Fungal' | 'Bacterial' | 'Viral' | 'Physiological' | 'Healthy' | string;
  simpleDescription: string;
  visibleSymptoms: string[];
  generalPrevention: string[];
  recommendedNextSteps: string[];
  expertHelpWarning: string;
  favorableConditions?: string;
  affectedPlantParts?: string[];
  eppoCode?: string;
  icarAdvisory?: string;
  organicRemedies?: string[];
  chemicalTreatments?: string[];
  benchmarkDatasets?: string[];
}

export type CertaintyTier = 'HIGH_CERTAINTY' | 'MODERATE_CERTAINTY' | 'LOW_CERTAINTY';
export type ConsensusLevel = 'UNANIMOUS' | 'MAJORITY' | 'DIVERGENT';

export interface AlternativePrediction {
  index?: number;
  className: string;
  crop: string;
  disease: string;
  isHealthy: boolean;
  probability: number;
  percentage?: number;
  isNoiseFilteredOut?: boolean;
  relativeMarginToTop?: number;
  taxonomicFamily?: string;
  filterReason?: string;
}

export interface EnsembleVariantPrediction {
  variantId: string;
  name: string;
  specialization: string;
  topClass: string;
  topCrop: string;
  topDisease: string;
  confidence: number;
  weight: number;
  entropy: number;
}

export interface EnsembleDiagnostics {
  isEnsembleActive: boolean;
  totalVariants: number;
  consensusAgreement: boolean;
  consensusLevel?: ConsensusLevel;
  certaintyTier?: CertaintyTier;
  certaintyScore?: number;
  certaintyReasoning?: string;
  variants: EnsembleVariantPrediction[];
  filteredFalsePositivesCount: number;
  filteredClasses: string[];
  noiseThreshold: number;
  filterReason?: string;
  thresholdsApplied?: {
    noiseFloor: number;
    marginRatio: number;
    taxonomicConstraint: boolean;
    highConfidenceThreshold: number;
    moderateConfidenceThreshold: number;
  };
}

export interface CropSuitabilityReport {
  isSuitableInState: boolean;
  status: 'SUITABLE' | 'UNSUITABLE' | 'MARGINAL';
  detectedCrop: string;
  detectedCropInEnglish: string;
  stateName: string;
  stateCode?: string;
  agroClimaticZone: string;
  reason: string;
  actionRequired: 'REMOVE_AND_REPLACE' | 'CONTINUE' | 'CAUTION_PROTECTED_CULTIVATION';
  primaryRecommendation: string;
  recommendedCropsToPlant: Array<{
    cropName: string;
    cropNameLocalized?: string;
    season: 'Kharif' | 'Rabi' | 'Zaid' | 'Perennial / Orchard' | string;
    suitabilityReason: string;
    expectedAdvantage: string;
  }>;
  removalAndSoilPreparationAdvice: string;
  icarAdvisoryNote: string;
}

export interface DiagnosisResult {
  id?: string;
  className: string;
  crop: string;
  disease: string;
  isHealthy: boolean;
  confidence: number;
  confidenceCategory: ConfidenceLevel;
  confidenceLevel?: ConfidenceLevel;
  confidencePercentage?: number;
  topAlternatives: AlternativePrediction[];
  alternatives?: AlternativePrediction[];
  diseaseDetail: DiseaseDetail;
  inferenceTimeMs: number;
  modelArchitecture: string;
  engine?: string;
  pathogenType?: string;
  scientificName?: string;
  plantDocBenchmarkNotes?: string;
  chainOfThoughtReasoning?: string;
  stateSpecificAdvisory?: string;
  cropSuitability?: CropSuitabilityReport;
  timestamp: number | string;
  imageQuality?: ImageQualityReport;
  ensembleDiagnostics?: EnsembleDiagnostics;
  certaintyTier?: CertaintyTier;
  certaintyReasoning?: string;
  diagnosisLanguage?: LanguageCode;
  isUncalibratedScore?: boolean;
  calibrationNote?: string;
  isOfflineFallbackWithoutWeights?: boolean;
  isUnsupportedOrUncertain?: boolean;
  isValidLeaf?: boolean;
  isBlockedLowConfidence?: boolean;
  blockReason?: string;
  tokensSavedEstimate?: number;
  cachedHit?: boolean;
  cropHintWarning?: string;
  switchedToOfflineNotice?: string;
  confidenceLabel?: string;
  modelAgreementStatus?: 'AGREES' | 'DISAGREES';
  modelAgreementMessage?: string;
}

export interface ScanRecord {
  id: string;
  timestamp: number | string;
  thumbnailUrl: string;
  imageThumbnail?: string;
  className: string;
  crop: string;
  disease: string;
  isHealthy: boolean;
  confidence: number;
  confidencePercentage?: number;
  stateName: string;
  state?: string;
  inferenceTimeMs?: number;
}

export interface IndianState {
  code: string;
  name: string;
  type: 'State' | 'Union Territory';
  regionalLanguage: string;
  agroClimaticZone: string;
  majorCrops: string[];
  kisanHelpline: string;
  stateAdvisoryNotes: string;
}

export interface ImageQualityReport {
  isAcceptable: boolean;
  width: number;
  height: number;
  aspectRatio: number;
  brightnessScore: number;
  blurScore: number;
  leafGreenIndex: number;
  isDark?: boolean;
  isOverexposed?: boolean;
  isBlurry?: boolean;
  isLeafLikely?: boolean;
  perceptualHash?: string;
  score: number;
  warnings: string[];
}

export interface ModelStatus {
  isReady: boolean;
  isLoading: boolean;
  architecture: string;
  inputShape: number[];
  totalClasses: number;
  backend: string;
  backendReady?: boolean;
  ensembleVariants?: number;
  ensembleActive?: boolean;
  hasTrainedWeights?: boolean;
  weightsSource?: 'bundled' | 'indexeddb-custom' | 'none';
  missingWeightsReason?: string;
  error?: string;
}

export interface UserPreferences {
  language: LanguageCode;
  selectedState: IndianState;
  theme: 'light' | 'dark' | 'system';
  isOfflineReady: boolean;
  hasCompletedOnboarding: boolean;
  autoReadDiagnosis?: boolean;
  speechRate?: number;
  speechPitch?: number;
  selectedVoiceId?: string;
  selectedVoicePersona?: 'sakhi' | 'mitra' | 'radio' | 'system';
}
