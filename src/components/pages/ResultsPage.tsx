import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { DiseaseDetail } from '../../types';
import { getLocalizedPathogenType, getLocalizedCropName, getLocalizedDiseaseDetail } from '../../data/localizedCropsAndDiseases';
import { getLocalizedResults } from '../../data/localizedResultsData';
import { deleteScanRecord } from '../../services/storage';
import { speechService, SpeechPlayerState } from '../../services/speechService';
import { AudioDiagnosisPlayer, InlineSpeakButton } from '../AudioDiagnosisPlayer';
import { CropSuitabilityCard } from '../CropSuitabilityCard';
import {
  CheckCircle2,
  AlertTriangle,
  Info,
  Phone,
  ArrowLeft,
  Printer,
  Sparkles,
  MapPin,
  Cpu,
  Clock,
  ShieldCheck,
  Zap,
  Gauge,
  ShieldAlert,
  SlidersHorizontal,
  Trash2,
  X,
  Camera,
} from 'lucide-react';

export const ResultsPage: React.FC = () => {
  const {
    t,
    currentResult,
    setCurrentResult,
    currentImage,
    setCurrentImage,
    selectedState,
    setActiveTab,
    language,
    history,
    refreshHistory,
  } = useApp();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [playerState, setPlayerState] = useState<SpeechPlayerState>(() => speechService.getState());

  React.useEffect(() => {
    return speechService.subscribe((state) => {
      setPlayerState(state);
    });
  }, []);

  const resLocale = getLocalizedResults(language);

  if (!currentResult) {
    return (
      <div className="text-center py-20 space-y-4">
        <h3 className="text-xl font-bold text-slate-800">
          {resLocale.noActiveDiagnosis}
        </h3>
        <p className="text-sm text-slate-500">
          {resLocale.noActiveDiagnosisDesc}
        </p>
        <button
          onClick={() => setActiveTab('analyze')}
          className="px-6 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-xl"
        >
          {resLocale.goToAnalyzer}
        </button>
      </div>
    );
  }

  // Item 15: Dedicated UNSUPPORTED non-leaf result — show ONLY the retake-photo message
  if (currentResult.className === 'UNSUPPORTED') {
    return (
      <div className="w-full max-w-2xl mx-auto py-12 space-y-6">
        <div className="bg-rose-50 rounded-3xl border border-rose-200 p-8 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center mx-auto border border-rose-200">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-rose-950">
            Unsupported Image — Please Retake Photo
          </h2>
          <p className="text-sm text-rose-900 leading-relaxed max-w-lg mx-auto">
            {currentResult.lowConfidenceReason ||
              'This image does not appear to contain a clear agricultural crop leaf. Please capture a single crop leaf in natural daylight against a plain background.'}
          </p>
          <div className="pt-2">
            <button
              onClick={() => setActiveTab('analyze')}
              className="px-6 py-3 bg-rose-700 hover:bg-rose-800 text-white text-sm font-bold rounded-xl inline-flex items-center gap-2 cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              <span>Retake Leaf Photo</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Item 1: Offline model not installed — do NOT guess a disease
  if (currentResult.isOfflineFallbackWithoutWeights) {
    return (
      <div className="w-full max-w-2xl mx-auto py-12 space-y-6">
        {currentResult.switchedToOfflineNotice && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold flex items-center gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{currentResult.switchedToOfflineNotice}</span>
          </div>
        )}
        <div className="bg-amber-50 rounded-3xl border border-amber-200 p-8 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto border border-amber-300">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-amber-950">
            Offline model not installed
          </h2>
          <p className="text-sm text-amber-900 leading-relaxed max-w-lg mx-auto">
            {currentResult.lowConfidenceReason ||
              'Offline model not installed (/public/model/model.json not found). Install trained TensorFlow.js weights in /public/model/ or upload them in Settings to run offline inference.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('settings')}
              className="px-5 py-2.5 bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              Upload Weights in Settings
            </button>
            <button
              onClick={() => setActiveTab('analyze')}
              className="px-5 py-2.5 bg-white border border-amber-300 hover:bg-amber-100 text-amber-950 text-xs font-bold rounded-xl cursor-pointer"
            >
              Back to Analyzer
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Item 4 & 7: Low confidence (<68%) block — require retake photo
  if (currentResult.isBlockedLowConfidence || currentResult.confidence < 68) {
    return (
      <div className="w-full max-w-2xl mx-auto py-12 space-y-6">
        {currentResult.switchedToOfflineNotice && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold flex items-center gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{currentResult.switchedToOfflineNotice}</span>
          </div>
        )}
        <div className="bg-amber-50 rounded-3xl border border-amber-200 p-8 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto border border-amber-200">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-amber-950">
            Unable to Diagnose — Please Retake Photo ({currentResult.confidence}%)
          </h2>
          <p className="text-sm text-amber-900 leading-relaxed max-w-lg mx-auto">
            {currentResult.lowConfidenceReason ||
              `Model confidence (${currentResult.confidence}%) is below the 68% minimum threshold required for a safe diagnosis. Please retake a well-lit close-up photo of a single leaf.`}
          </p>
          {currentResult.cropHintWarning && (
            <p className="text-xs font-bold text-rose-800 bg-rose-100/80 border border-rose-200 px-3 py-2 rounded-xl inline-block">
              {currentResult.cropHintWarning}
            </p>
          )}
          <div className="pt-2">
            <button
              onClick={() => setActiveTab('analyze')}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl inline-flex items-center gap-2 cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              <span>Retake Photo</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const {
    crop,
    disease,
    className,
    isHealthy,
    confidence,
    confidenceCategory,
    topAlternatives,
    diseaseDetail,
    inferenceTimeMs,
    modelArchitecture,
    engine,
    pathogenType,
    plantDocBenchmarkNotes,
    chainOfThoughtReasoning,
    stateSpecificAdvisory,
  } = currentResult;

  // Dynamically resolve localized crop and disease detail in case language changed
  const dynamicLocalizedDetail = getLocalizedDiseaseDetail(className, language);
  const activeDiseaseDetail: DiseaseDetail = {
    ...diseaseDetail,
    ...dynamicLocalizedDetail,
    name: dynamicLocalizedDetail?.name || diseaseDetail?.name || disease,
    disease: dynamicLocalizedDetail?.disease || diseaseDetail?.disease || disease,
    simpleDescription: dynamicLocalizedDetail?.simpleDescription || diseaseDetail?.simpleDescription || '',
    visibleSymptoms: dynamicLocalizedDetail?.visibleSymptoms || diseaseDetail?.visibleSymptoms || [],
    recommendedNextSteps: dynamicLocalizedDetail?.recommendedNextSteps || diseaseDetail?.recommendedNextSteps || [],
    generalPrevention: dynamicLocalizedDetail?.generalPrevention || diseaseDetail?.generalPrevention || [],
    organicRemedies: dynamicLocalizedDetail?.organicRemedies || diseaseDetail?.organicRemedies || [],
  } as DiseaseDetail;
  const displayCropName = getLocalizedCropName(crop, language);
  const displayDiseaseName =
    activeDiseaseDetail.disease ||
    activeDiseaseDetail.diseaseName ||
    activeDiseaseDetail.name ||
    disease ||
    (isHealthy ? t.results.statusHealthy : 'Detected Condition');

  const isLowConfidence = confidenceCategory === 'LOW' || confidence < 68;

  const confidenceBarColor =
    confidence >= 85
      ? 'bg-emerald-500'
      : confidence >= 68
      ? 'bg-amber-500'
      : 'bg-red-500';

  const confidenceBadgeColor =
    confidence >= 85
      ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
      : confidence >= 68
      ? 'bg-amber-100 text-amber-800 border-amber-200'
      : 'bg-red-100 text-red-800 border-red-200';

  const certaintyTier = currentResult.certaintyTier || (
    confidence >= 85
      ? 'HIGH_CERTAINTY'
      : confidence >= 68
      ? 'MODERATE_CERTAINTY'
      : 'LOW_CERTAINTY'
  );

  const certaintyConfig = {
    HIGH_CERTAINTY: {
      tier: 'HIGH',
      title: resLocale.certainty.high.title,
      shortBadge: resLocale.certainty.high.shortBadge,
      badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      pillClass: 'bg-emerald-500 text-white font-bold',
      borderClass: 'border-emerald-200',
      bgLight: 'bg-emerald-50/70',
      barColor: 'bg-emerald-500',
      icon: ShieldCheck,
      advisoryNote: resLocale.certainty.high.advisoryNote,
    },
    MODERATE_CERTAINTY: {
      tier: 'MODERATE',
      title: resLocale.certainty.moderate.title,
      shortBadge: resLocale.certainty.moderate.shortBadge,
      badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
      pillClass: 'bg-amber-500 text-slate-950 font-bold',
      borderClass: 'border-amber-200',
      bgLight: 'bg-amber-50/70',
      barColor: 'bg-amber-500',
      icon: AlertTriangle,
      advisoryNote: resLocale.certainty.moderate.advisoryNote,
    },
    LOW_CERTAINTY: {
      tier: 'LOW',
      title: resLocale.certainty.low.title,
      shortBadge: resLocale.certainty.low.shortBadge,
      badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
      pillClass: 'bg-rose-500 text-white font-bold',
      borderClass: 'border-rose-200',
      bgLight: 'bg-rose-50/70',
      barColor: 'bg-rose-500',
      icon: ShieldAlert,
      advisoryNote: resLocale.certainty.low.advisoryNote,
    },
  }[certaintyTier];

  const handlePrint = () => {
    window.print();
  };

  // Find corresponding scan record in history to delete
  const matchedRecord = useMemo(() => {
    if (!currentResult) return null;
    if (currentResult.id) {
      const match = history.find((h) => h.id === currentResult.id);
      if (match) return match;
    }
    const match = history.find((h) => {
      if (currentImage && h.thumbnailUrl === currentImage) return true;
      if (h.className === currentResult.className && h.crop === currentResult.crop) {
        if (currentResult.timestamp && Math.abs(h.timestamp - currentResult.timestamp) < 60000) {
          return true;
        }
      }
      return false;
    });
    return match || null;
  }, [currentResult, currentImage, history]);

  const handleDeleteScan = () => {
    setIsDeleting(true);
    try {
      if (matchedRecord?.id) {
        deleteScanRecord(matchedRecord.id);
      } else if (currentResult?.id) {
        deleteScanRecord(currentResult.id);
      }
      refreshHistory();
      setShowDeleteModal(false);
      setCurrentResult(null);
      setCurrentImage(null);
      setActiveTab('history');
    } catch (err) {
      console.error('Error deleting scan record:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  const printLabel = resLocale.printReport;
  const confidenceWordLabel = currentResult.confidenceLabel || resLocale.confidence;
  const causalOrganismLabel = resLocale.causalOrganism;
  const generalPreventionTitle = resLocale.generalPreventionTitle;
  const stateSpecificBadge = resLocale.stateSpecificBadge;
  const localHelplineLabel = resLocale.localHelpline;
  const centralTollFreeLabel = resLocale.centralTollFree;
  const callCenterBtn = resLocale.callCenterBtn;
  const pastScansBtn = resLocale.pastScansBtn;
  const advisoryHeading = resLocale.advisoryHeading;
  const reasoningHeading = resLocale.reasoningHeading;
  const benchmarkHeading = resLocale.benchmarkHeading;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 pb-20 print:p-4 print:pb-0 min-w-0 relative">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between print:hidden">
        <button
          onClick={() => setActiveTab('analyze')}
          className="px-3.5 py-2 rounded-xl text-slate-600 hover:text-slate-950 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.common.back}</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Delete Past Scan Button */}
          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-3.5 py-2 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
            title="Delete this scan from history"
          >
            <Trash2 className="w-4 h-4 text-rose-600" />
            <span>{t.history?.delete || 'Delete Scan'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>{printLabel}</span>
          </button>
        </div>
      </div>

      {/* Item 12: Switching to offline mode notice */}
      {currentResult.switchedToOfflineNotice && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold flex items-center gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{currentResult.switchedToOfflineNotice}</span>
        </div>
      )}

      {/* Item 5: Crop hint mismatch warning ("This leaf may not be <hint>") */}
      {currentResult.cropHintWarning && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-bold flex items-center gap-2.5">
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{currentResult.cropHintWarning}</span>
        </div>
      )}

      {/* Farmer Voice Assistance TTS Player */}
      <div className="print:hidden">
        <AudioDiagnosisPlayer
          diagnosis={currentResult}
          diseaseDetail={activeDiseaseDetail}
          selectedState={selectedState}
          language={language}
        />
      </div>

      {/* AI Crop Suitability Advisory */}
      {currentResult.cropSuitability && (
        <CropSuitabilityCard
          report={currentResult.cropSuitability}
          language={language}
        />
      )}

      {/* Main Diagnostic Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 sm:gap-8 border-b border-slate-100">
          {/* Leaf Thumbnail */}
          {currentImage && (
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 shadow-xs relative">
              <img
                src={currentImage}
                alt="Analyzed Crop Leaf"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-1.5 right-1.5 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-xs font-mono">
                224×224 RGB
              </div>
            </div>
          )}

          {/* Diagnosis Headline */}
          <div className="flex-1 space-y-3 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${
                  isHealthy
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : 'bg-red-100 text-red-800 border-red-300'
                }`}
              >
                {isHealthy ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                )}
                <span>{isHealthy ? t.results.statusHealthy : t.results.statusDiseaseDetected}</span>
              </span>

              <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${confidenceBadgeColor}`}>
                {confidence}% ({confidenceWordLabel})
              </span>

              {pathogenType && (
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                  {getLocalizedPathogenType(pathogenType, language)}
                </span>
              )}
            </div>

            <div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  {displayCropName} — {displayDiseaseName}
                </h1>
                <InlineSpeakButton
                  section="summary"
                  diagnosis={currentResult}
                  diseaseDetail={activeDiseaseDetail}
                  selectedState={selectedState}
                  language={language}
                  title={resLocale.tts.sectionSummary}
                />
              </div>
              {activeDiseaseDetail.scientificName && (
                <p className="text-xs italic text-slate-500 mt-0.5">
                  {causalOrganismLabel} {activeDiseaseDetail.scientificName}
                </p>
              )}
            </div>

            {/* Confidence Progress Bar */}
            <div className="pt-2 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
                <span className="flex items-center gap-1.5 font-bold text-slate-800">
                  <Gauge className="w-4 h-4 text-emerald-600" />
                  <span>{t.results.confidenceLabel} ({confidenceWordLabel})</span>
                </span>
                <span className="font-extrabold text-sm text-slate-900 font-mono">
                  {confidence}%
                </span>
              </div>

              <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden p-0.5 shadow-inner">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${confidenceBarColor}`}
                  style={{ width: `${Math.min(100, Math.max(3, confidence))}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium pt-0.5">
                <span>0%</span>
                <span className="font-bold text-slate-700">
                  {confidence >= 85
                    ? resLocale.confidenceScale.high
                    : confidence >= 68
                    ? resLocale.confidenceScale.moderate
                    : resLocale.confidenceScale.low}
                </span>
                <span>100%</span>
              </div>

              {/* Item 13: On-device agreement indicator when online mode also ran offline model */}
              {currentResult.modelAgreementMessage && (
                <div
                  className={`mt-2 px-3 py-2 rounded-xl border text-xs font-bold flex items-center gap-2 ${
                    currentResult.modelAgreementStatus === 'agrees'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-amber-50 border-amber-300 text-amber-950'
                  }`}
                >
                  {currentResult.modelAgreementStatus === 'agrees' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  )}
                  <span>{currentResult.modelAgreementMessage}</span>
                </div>
              )}

              {/* Informative Certainty Advisory Banner */}
              <div className={`mt-2 p-3 rounded-xl border text-xs leading-relaxed space-y-1 ${certaintyConfig.bgLight} ${certaintyConfig.borderClass}`}>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <certaintyConfig.icon className="w-4 h-4 text-slate-800 shrink-0" />
                    <span>{certaintyConfig.title}</span>
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 font-semibold">
                    {confidenceWordLabel}
                  </span>
                </div>
                <p className="text-slate-700">
                  {currentResult.certaintyReasoning || certaintyConfig.advisoryNote}
                </p>
                <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                  {currentResult.calibrationNote ||
                    'Note: Always verify physical symptoms on multiple leaves in the field before chemical intervention.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stage 1 Image-Quality Pre-Check */}
        {currentResult.imageQuality && (
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-600" />
                <span>Stage 1 Image-Quality Pre-Check (Separate from Disease Classification)</span>
              </p>
              {currentResult.imageQuality.warnings.length > 0 ? (
                <ul className="text-xs text-amber-800 list-disc list-inside space-y-0.5">
                  {currentResult.imageQuality.warnings.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-slate-600">
                  Image passed focus, exposure, and vegetation chromaticity pre-checks.
                </p>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono tabular-nums shrink-0">
              <span className="px-2 py-1 rounded bg-white border border-slate-200 text-slate-700">
                Quality: {currentResult.imageQuality.score}/100
              </span>
              <span className="px-2 py-1 rounded bg-white border border-slate-200 text-slate-700">
                Foliage Ratio: {Math.round((currentResult.imageQuality.leafGreenIndex || 0) * 100)}%
              </span>
              <span className="px-2 py-1 rounded bg-white border border-slate-200 text-slate-700">
                Sharpness: {currentResult.imageQuality.blurScore}
              </span>
            </div>
          </div>
        )}

        {/* PlantDoc In-Field Benchmark Callout */}
        {plantDocBenchmarkNotes && (
          <div className="p-4 bg-emerald-50/70 border-b border-emerald-100 flex items-start gap-3 text-emerald-950">
            <Zap className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed space-y-0.5">
              <p className="font-bold text-xs text-emerald-900 flex items-center gap-1.5">
                <span>{benchmarkHeading}</span>
              </p>
              <p className="text-slate-700">{plantDocBenchmarkNotes}</p>
            </div>
          </div>
        )}

        {/* AI Differential Chain-of-Thought & Lookalike Inspection */}
        {chainOfThoughtReasoning && (
          <div className="p-4 bg-teal-50/80 border-b border-teal-100 flex items-start gap-3 text-teal-950">
            <Sparkles className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed space-y-1">
              <p className="font-bold text-xs text-teal-900 flex items-center gap-1.5">
                <span>{reasoningHeading}</span>
              </p>
              <p className="text-slate-700 whitespace-pre-line leading-relaxed font-sans">{chainOfThoughtReasoning}</p>
            </div>
          </div>
        )}

        {/* Low Confidence Warning (if applicable) */}
        {isLowConfidence && (
          <div className="p-4 bg-amber-500/10 border-b border-amber-200 flex items-start gap-3 text-amber-900">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed">
              <p className="font-bold text-sm text-amber-950">
                {resLocale.lowConfidenceAssessment}
              </p>
              <p className="mt-0.5">{t.results.lowConfidenceWarning}</p>
            </div>
          </div>
        )}

        {/* Healthy Plant Notice (if healthy) */}
        {isHealthy && (
          <div className="p-4 bg-emerald-50 border-b border-emerald-100 flex items-start gap-3 text-emerald-900">
            <Info className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed">
              <p className="font-semibold text-emerald-950">
                {resLocale.fieldScoutingRec}
              </p>
              <p className="mt-0.5">{t.results.healthyNotice}</p>
            </div>
          </div>
        )}

        {/* Inference Metadata Bar — single real model name, no invented token savings */}
        <div className="px-6 py-3 bg-slate-50 text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
          <span className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-emerald-600" />
            <span>{resLocale.metadata.aiEngine} <strong>{modelArchitecture || engine}</strong></span>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{resLocale.metadata.latency} {inferenceTimeMs} ms</span>
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
            <span>{resLocale.metadata.datasetTrained}</span>
          </span>
        </div>
      </div>

      {/* Structured Farmer Advisory Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section 1: What Does This Mean? */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
              <Info className="w-4 h-4 text-emerald-600" />
              <h3>{t.results.whatDoesThisMean}</h3>
            </div>
            <InlineSpeakButton
              section="summary"
              diagnosis={currentResult}
              diseaseDetail={activeDiseaseDetail}
              selectedState={selectedState}
              language={language}
              title={resLocale.tts.sectionSummary}
            />
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            {activeDiseaseDetail.simpleDescription}
          </p>
        </div>

        {/* Section 2: Common Visible Signs */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <h3>{t.results.commonSigns}</h3>
            </div>
            <InlineSpeakButton
              section="symptoms"
              diagnosis={currentResult}
              diseaseDetail={activeDiseaseDetail}
              selectedState={selectedState}
              language={language}
              title={resLocale.tts.sectionSymptoms}
            />
          </div>
          <ul className="space-y-2 text-sm text-slate-600">
            {activeDiseaseDetail.visibleSymptoms.map((symptom, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                <span>{symptom}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 3: Recommended Farmer Next Steps */}
        <div className={`bg-white rounded-2xl border p-6 shadow-xs space-y-3 transition-all ${
          playerState.isPlaying && (playerState.currentSection === 'actions' || playerState.currentSection === 'all') && playerState.activeStepIndex >= 0
            ? 'border-emerald-300 ring-2 ring-emerald-300/30'
            : 'border-slate-200'
        }`}>
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <h3>{t.results.whatShouldIDo}</h3>
            </div>
            <InlineSpeakButton
              section="actions"
              diagnosis={currentResult}
              diseaseDetail={activeDiseaseDetail}
              selectedState={selectedState}
              language={language}
              title={resLocale.tts.sectionActions}
            />
          </div>
          <ul className="space-y-2.5 text-sm text-slate-600">
            {activeDiseaseDetail.recommendedNextSteps.map((step, idx) => {
              const isCurrentlyActiveStep =
                playerState.isPlaying &&
                (playerState.currentSection === 'actions' || playerState.currentSection === 'all') &&
                playerState.activeStepIndex === idx;

              return (
                <li
                  key={idx}
                  className={`flex items-start gap-3 p-3 rounded-xl transition-all duration-300 ${
                    isCurrentlyActiveStep
                      ? 'bg-emerald-50 text-emerald-950 font-bold border border-emerald-400 ring-2 ring-emerald-400/40 shadow-sm'
                      : 'hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black shrink-0 transition-transform ${
                      isCurrentlyActiveStep
                        ? 'bg-emerald-600 text-white scale-110 animate-pulse shadow-xs'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {isCurrentlyActiveStep ? '🔊' : idx + 1}
                  </span>
                  <div className="flex-1 leading-relaxed">
                    <span className={isCurrentlyActiveStep ? 'text-emerald-950 font-bold' : 'text-slate-700'}>
                      {step}
                    </span>
                    {isCurrentlyActiveStep && (
                      <span className="block text-[11px] text-emerald-700 font-semibold mt-1">
                        {language === 'gu'
                          ? `પદ્ધતિ ${idx + 1} હમણાં બોલાઈ રહી છે...`
                          : language === 'hi'
                          ? `विधि ${idx + 1} अभी बोली जा रही है...`
                          : `Method ${idx + 1} speaking now...`}
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Section 4: General Prevention */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base border-b border-slate-100 pb-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <h3>{generalPreventionTitle}</h3>
          </div>
          <ul className="space-y-2 text-sm text-slate-600">
            {activeDiseaseDetail.generalPrevention.map((prev, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></span>
                <span>{prev}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* State-Aware Personalized Advisory */}
      <div className="bg-gradient-to-br from-amber-50/70 to-orange-50/40 rounded-3xl border border-amber-200/80 p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-amber-200/60 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                {t.results.stateAdvisoryTitle}: {selectedState.name}
              </h3>
              <p className="text-xs text-amber-900 font-medium">{selectedState.agroClimaticZone}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <InlineSpeakButton
              section="helpline"
              diagnosis={currentResult}
              diseaseDetail={activeDiseaseDetail}
              selectedState={selectedState}
              language={language}
              title={resLocale.tts.sectionHelpline}
            />
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-white text-amber-900 border border-amber-200">
              {stateSpecificBadge}
            </span>
          </div>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed">
          {stateSpecificAdvisory || selectedState.stateAdvisoryNotes}
        </p>

        <div className="p-3.5 rounded-xl bg-white border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-slate-800 font-medium">
            <Phone className="w-4 h-4 text-amber-600" />
            <span>{localHelplineLabel} <strong>{selectedState.kisanHelpline}</strong></span>
          </div>
          <span className="text-slate-500 text-[11px]">{centralTollFreeLabel}</span>
        </div>
      </div>

      {/* Item 3: Real Top-5 Softmax Probabilities from the Single Model */}
      {topAlternatives && topAlternatives.length > 0 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-base">{t.results.topAlternatives}</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {modelArchitecture || 'MobileNetV2'}
                </span>
              </div>
              <p className="text-xs text-slate-500">{t.results.otherPossibilities}</p>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Top-{topAlternatives.length} probabilities
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {topAlternatives.map((alt, idx) => {
              const displayProb = typeof alt.percentage === 'number' ? alt.percentage : alt.probability;
              const altCropName = getLocalizedCropName(alt.crop, language);
              const altDiseaseDetail = getLocalizedDiseaseDetail(alt.className, language);
              const altDiseaseName = altDiseaseDetail ? altDiseaseDetail.name : alt.disease;

              return (
                <div
                  key={`${alt.className}-${idx}`}
                  className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/70 hover:bg-slate-50 transition-colors space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-bold text-xs text-slate-900">
                        #{idx + 1}: {altCropName} — {altDiseaseName}
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5 mt-1">
                        {alt.taxonomicFamily && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200/70 text-slate-700">
                            {alt.taxonomicFamily}
                          </span>
                        )}
                        <span className="text-[10px] text-slate-500">
                          {alt.isHealthy ? resLocale.alternatives.healthyLeaf : resLocale.alternatives.diseaseInfection}
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-slate-800 font-mono">{displayProb}%</span>
                      <div className="w-16 h-1.5 bg-slate-200 rounded-full mt-1 overflow-hidden">
                        <div
                          className="bg-emerald-600 h-full rounded-full"
                          style={{ width: `${Math.min(100, displayProb)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Safety / Expert Help Callout */}
      <div className="p-5 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-bold text-sm text-emerald-400">{advisoryHeading}</h4>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            {activeDiseaseDetail.expertHelpWarning}
          </p>
        </div>
        <a
          href="tel:18001801551"
          className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shrink-0 flex items-center gap-2 transition-colors"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>{callCenterBtn}</span>
        </a>
      </div>

      {/* Bottom CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 print:hidden">
        <button
          onClick={() => setActiveTab('analyze')}
          className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition-colors cursor-pointer"
        >
          {t.results.analyzeAnother}
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-sm rounded-xl shadow-2xs transition-colors cursor-pointer"
        >
          {pastScansBtn}
        </button>

        <button
          onClick={() => setShowDeleteModal(true)}
          className="w-full sm:w-auto px-6 py-3.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-bold text-sm rounded-xl shadow-2xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <Trash2 className="w-4 h-4 text-rose-600" />
          <span>{t.history?.delete || 'Delete Past Scan'}</span>
        </button>
      </div>

      {/* Delete Confirmation In-App Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-100 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center border border-rose-200">
                <Trash2 className="w-6 h-6" />
              </div>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-black text-slate-900">
                {language === 'hi'
                  ? 'यह स्कैन परिणाम हटाएं?'
                  : language === 'gu'
                  ? 'આ સ્કેન પરિણામ કાઢી નાખવું છે?'
                  : language === 'mr'
                  ? 'हे निदान हटवायचे आहे का?'
                  : 'Delete this scan record?'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'hi'
                  ? `क्या आप वाकई "${displayCropName} - ${displayDiseaseName}" के इस निदान रिकॉर्ड को अपने डिवाइस से हमेशा के लिए हटाना चाहते हैं?`
                  : language === 'gu'
                  ? `શું તમે ખરેખર "${displayCropName} - ${displayDiseaseName}" નું આ નિદાન તમારા ડિવાઇસમાંથી હંમેશા માટે કાઢી નાખવા માંગો છો?`
                  : language === 'mr'
                  ? `तुम्हाला खात्री आहे का की "${displayCropName} - ${displayDiseaseName}" चे हे निदान डिव्हाइसवरून कायमचे हटवायचे आहे?`
                  : `Are you sure you want to permanently remove this diagnosis record (${displayCropName} - ${displayDiseaseName}) from your on-device scan history?`}
              </p>
            </div>

            {currentImage && (
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <img
                  src={currentImage}
                  alt="Scan thumbnail"
                  className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                />
                <div className="min-w-0 text-xs">
                  <div className="font-bold text-slate-800 truncate">{displayCropName}</div>
                  <div className="text-slate-500 truncate">{displayDiseaseName}</div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
              >
                {t.common?.cancel || 'Cancel'}
              </button>
              <button
                onClick={handleDeleteScan}
                disabled={isDeleting}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-600/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{isDeleting ? 'Deleting...' : (t.history?.delete || 'Confirm Delete')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
