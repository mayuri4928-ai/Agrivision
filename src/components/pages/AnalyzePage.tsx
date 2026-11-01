import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { SAMPLE_LEAVES, SampleLeaf } from '../../data/sampleLeaves';
import { TOTAL_CLASSES, TOTAL_CROPS } from '../../data/classes';
import { assessImageQuality } from '../../services/imageQuality';
import { runAgriVisionDiagnosis } from '../../services/diagnosticService';
import { saveScanRecord } from '../../services/storage';
import { ImageQualityReport } from '../../types';
import { getLocalizedCropName } from '../../data/localizedCropsAndDiseases';
import { getLocalizedAnalyze } from '../../data/localizedAnalyzeData';
import { matchesCrop } from '../../utils/cropMatcher';
import {
  Upload,
  Camera,
  Cpu,
  AlertTriangle,
  CheckCircle2,
  X,
  FlaskConical,
  ArrowRight,
  RefreshCw,
  Zap,
  Sprout,
  Search,
  Info,
} from 'lucide-react';

interface AnalyzePageProps {
  onOpenCamera: () => void;
}

const QUICK_CROP_OPTIONS = [
  { value: 'auto', labelKey: 'auto', fallback: `Auto-Detect (All ${TOTAL_CROPS} Crops)` },
  { value: 'Grape', labelKey: 'grape', fallback: 'Grape' },
  { value: 'Tomato', labelKey: 'tomato', fallback: 'Tomato' },
  { value: 'Apple', labelKey: 'apple', fallback: 'Apple' },
  { value: 'Potato', labelKey: 'potato', fallback: 'Potato' },
  { value: 'Rice (Paddy)', labelKey: 'rice', fallback: 'Rice / Paddy' },
  { value: 'Wheat', labelKey: 'wheat', fallback: 'Wheat' },
  { value: 'Corn (maize)', labelKey: 'corn', fallback: 'Corn / Maize' },
  { value: 'Cotton', labelKey: 'cotton', fallback: 'Cotton' },
  { value: 'Sugarcane', labelKey: 'sugarcane', fallback: 'Sugarcane' },
  { value: 'Soybean', labelKey: 'soybean', fallback: 'Soybean' },
  { value: 'Pepper, bell', labelKey: 'pepper_bell', fallback: 'Bell Pepper' },
  { value: 'Squash', labelKey: 'squash', fallback: 'Squash' },
  { value: 'Peach', labelKey: 'peach', fallback: 'Peach' },
  { value: 'Strawberry', labelKey: 'strawberry', fallback: 'Strawberry' },
  { value: 'Orange', labelKey: 'orange', fallback: 'Orange' },
  { value: 'Cherry (including sour)', labelKey: 'cherry', fallback: 'Cherry' },
  { value: 'Blueberry', labelKey: 'blueberry', fallback: 'Blueberry' },
  { value: 'Raspberry', labelKey: 'raspberry', fallback: 'Raspberry' },
];

export const AnalyzePage: React.FC<AnalyzePageProps> = ({ onOpenCamera }) => {
  const {
    t,
    currentImage,
    setCurrentImage,
    setCurrentResult,
    setActiveTab,
    selectedState,
    language,
    refreshHistory,
    isOnline,
    modelStatus,
  } = useApp();

  const aLoc = getLocalizedAnalyze(language);

  const [selectedImage, setSelectedImage] = useState<string | null>(currentImage);
  const [qualityReport, setQualityReport] = useState<ImageQualityReport | null>(null);
  const [activeDemoLabel, setActiveDemoLabel] = useState<string | undefined>(undefined);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState<string>('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [engineMode, setEngineMode] = useState<'auto' | 'plantdoc' | 'edge'>('auto');
  const [selectedCropHint, setSelectedCropHint] = useState<string>('auto');
  const [sampleCropFilter, setSampleCropFilter] = useState<string>('all');
  const [sampleSearchQuery, setSampleSearchQuery] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [offlineSwitchNotice, setOfflineSwitchNotice] = useState<string | null>(null);

  const [blockedInfo, setBlockedInfo] = useState<{
    title: string;
    reason: string;
    confidence: number;
    isValidLeaf: boolean;
    cropHintWarning?: string;
    warnings: string[];
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    if (currentImage) {
      const matched = SAMPLE_LEAVES.find((s) => s.dataUrl === currentImage);
      handleImageLoaded(
        currentImage,
        matched ? `${matched.crop} — ${matched.conditionName}` : undefined
      );
    }
  }, [currentImage]);

  const processImageFile = (file: File) => {
    setErrorMessage(null);
    setBlockedInfo(null);
    setOfflineSwitchNotice(null);
    if (!file.type.startsWith('image/')) {
      setErrorMessage(aLoc.invalidFile || 'Please upload a valid leaf image file (JPEG, PNG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      handleImageLoaded(dataUrl, undefined);
    };
    reader.readAsDataURL(file);
  };

  const handleImageLoaded = (dataUrl: string, demoLabel?: string) => {
    setErrorMessage(null);
    setBlockedInfo(null);
    setOfflineSwitchNotice(null);
    setSelectedImage(dataUrl);
    setActiveDemoLabel(demoLabel);

    const img = new Image();
    img.src = dataUrl;
    img.onload = async () => {
      try {
        const report = await assessImageQuality(img);
        if (demoLabel) {
          setQualityReport({
            ...report,
            isLeafLikely: true,
            isAcceptable: true,
            score: Math.round(report.score),
          });
        } else {
          setQualityReport(report);
        }
      } catch (e) {
        console.warn('Quality assessment warning:', e);
      }
    };
  };

  const clearSelection = () => {
    setSelectedImage(null);
    setQualityReport(null);
    setActiveDemoLabel(undefined);
    setErrorMessage(null);
    setBlockedInfo(null);
    setOfflineSwitchNotice(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const runAnalysis = async () => {
    if (!selectedImage || !modelStatus.backendReady) return;
    setIsAnalyzing(true);
    setErrorMessage(null);
    setBlockedInfo(null);
    setOfflineSwitchNotice(null);

    try {
      setAnalysisStep(aLoc.stepPreprocessing);
      await new Promise((r) => setTimeout(r, 60));

      const img = new Image();
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Failed to load leaf image in memory'));
        img.src = selectedImage;
        if (img.complete && img.naturalWidth > 0) {
          resolve();
        }
      });

      const effectiveForceEdge = engineMode === 'edge' || !isOnline;

      if (!effectiveForceEdge) {
        setAnalysisStep(aLoc.stepPlantDoc);
      } else {
        setAnalysisStep(aLoc.stepEdge);
      }

      const result = await runAgriVisionDiagnosis({
        imageElement: img,
        imageDataUrl: selectedImage,
        selectedState,
        language,
        forceEdge: effectiveForceEdge,
        userCropHint: selectedCropHint !== 'auto' ? selectedCropHint : undefined,
      });

      if (result.switchedToOfflineNotice) {
        setOfflineSwitchNotice(result.switchedToOfflineNotice);
      }

      setAnalysisStep(aLoc.stepFinalizing);
      await new Promise((r) => setTimeout(r, 60));

      const isBlocked =
        result.className === 'UNSUPPORTED' ||
        result.isBlockedLowConfidence === true ||
        result.isValidLeaf === false ||
        result.confidence < 68;

      if (isBlocked) {
        setBlockedInfo({
          title:
            result.className === 'UNSUPPORTED' || !result.isValidLeaf
              ? 'Unable to diagnose — Retake Photo'
              : 'New Photo Required — Low Confidence Blocked',
          reason:
            result.blockReason ||
            (!result.isValidLeaf || (qualityReport && !qualityReport.isLeafLikely)
              ? 'No clear crop leaf was detected in this photo. Please retake a clear leaf photo.'
              : `Prediction confidence (${result.confidence}%) is below the 68% accuracy threshold. Please retake the photo.`),
          confidence: result.confidence,
          isValidLeaf: result.isValidLeaf !== false && (qualityReport ? Boolean(qualityReport.isLeafLikely) : true),
          cropHintWarning: result.cropHintWarning,
          warnings: qualityReport?.warnings?.length
            ? qualityReport.warnings
            : [
                'Place a single crop leaf in natural daylight filling at least 60% of the camera frame.',
                'Hold the camera steady 15–25 cm from the leaf surface so veins and lesions are sharp.',
              ],
        });
        return;
      }

      const enrichedResult = {
        ...result,
        imageDataUrl: selectedImage,
        imageQuality: qualityReport || result.imageQuality || undefined,
      };

      setCurrentImage(selectedImage);
      setCurrentResult(enrichedResult);

      saveScanRecord({
        thumbnailUrl: selectedImage,
        imageThumbnail: selectedImage,
        className: enrichedResult.className,
        crop: enrichedResult.crop,
        disease: enrichedResult.disease,
        isHealthy: enrichedResult.isHealthy,
        confidence: enrichedResult.confidence,
        confidencePercentage: enrichedResult.confidencePercentage,
        stateName: selectedState.name,
        state: selectedState.name,
        inferenceTimeMs: enrichedResult.inferenceTimeMs,
      });
      refreshHistory();

      setActiveTab('results');
    } catch (err) {
      console.error('Analysis error:', err);
      setErrorMessage(aLoc.errorTip);
    } finally {
      setIsAnalyzing(false);
      setAnalysisStep('');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleSampleClick = (sample: SampleLeaf) => {
    if (selectedCropHint !== 'auto' && !matchesCrop(sample.crop, selectedCropHint)) {
      setSelectedCropHint('auto');
    }
    handleImageLoaded(sample.dataUrl, `${sample.crop} — ${sample.conditionName}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredSamples = React.useMemo(() => {
    const rawQuery = sampleSearchQuery.trim().toLowerCase();
    const normalizedQuery = rawQuery.replace(/aska/g, 'esca').replace(/scap/g, 'scab');

    return SAMPLE_LEAVES.filter((s) => {
      const matchesCropFilter =
        sampleCropFilter === 'all' || s.crop.toLowerCase().includes(sampleCropFilter.toLowerCase());
      if (!matchesCropFilter) return false;
      if (!normalizedQuery) return true;

      const haystack = `${s.crop} ${s.conditionName} ${s.expectedClass} ${s.description}`.toLowerCase();
      const tokens = normalizedQuery.split(/\s+/).filter(Boolean);
      return tokens.every((tk) => haystack.includes(tk));
    });
  }, [sampleCropFilter, sampleSearchQuery]);

  const isScanReady = Boolean(modelStatus.backendReady && !isAnalyzing);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Page Title & Engine Mode Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>{aLoc.pageBadge}</span>
          </span>
          <h1 className="text-3xl font-black text-slate-900">{t.analyze.pageTitle}</h1>
          <p className="text-sm text-slate-500 mt-1">{t.analyze.pageSubtitle}</p>
        </div>

        {/* Mode Switcher */}
        <div className="inline-flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 shrink-0">
          <button
            onClick={() => setEngineMode('auto')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              engineMode === 'auto'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {aLoc.modeAuto}
          </button>
          <button
            onClick={() => setEngineMode('plantdoc')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              engineMode === 'plantdoc'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {aLoc.modePlantDoc}
          </button>
          <button
            onClick={() => setEngineMode('edge')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              engineMode === 'edge'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {aLoc.modeEdge}
          </button>
        </div>
      </div>

      {/* Crop Category Selector Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <Sprout className="w-4 h-4" />
            </div>
            <div>
              <label htmlFor="crop-hint-select" className="text-xs sm:text-sm font-bold text-slate-900 cursor-pointer block">
                {aLoc.cropCategoryLabel}
              </label>
              <p className="text-[11px] text-slate-500">{aLoc.cropCategoryDesc}</p>
            </div>
          </div>

          <select
            id="crop-hint-select"
            value={selectedCropHint}
            onChange={(e) => setSelectedCropHint(e.target.value)}
            className="w-full sm:w-auto px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold bg-slate-50 hover:bg-white text-slate-800 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden shrink-0 cursor-pointer"
          >
            <option value="auto">{aLoc.autoDetectOption}</option>
            <option value="Grape">{getLocalizedCropName('grape', language)} (Grape)</option>
            <option value="Apple">{getLocalizedCropName('apple', language)} (Apple)</option>
            <option value="Tomato">{getLocalizedCropName('tomato', language)} (Tomato)</option>
            <option value="Potato">{getLocalizedCropName('potato', language)} (Potato)</option>
            <option value="Corn (maize)">{getLocalizedCropName('corn', language)} (Corn / Maize)</option>
            <option value="Rice (Paddy)">{getLocalizedCropName('rice', language)} (Rice / Paddy)</option>
            <option value="Wheat">{getLocalizedCropName('wheat', language)} (Wheat)</option>
            <option value="Cotton">{getLocalizedCropName('cotton', language)} (Cotton)</option>
            <option value="Sugarcane">{getLocalizedCropName('sugarcane', language)} (Sugarcane)</option>
            <option value="Soybean">{getLocalizedCropName('soybean', language)} (Soybean)</option>
            <option value="Pepper, bell">{getLocalizedCropName('pepper_bell', language)} (Bell Pepper)</option>
            <option value="Orange">{getLocalizedCropName('orange', language)} (Orange / Citrus)</option>
            <option value="Strawberry">{getLocalizedCropName('strawberry', language)} (Strawberry)</option>
            <option value="Cherry (including sour)">{getLocalizedCropName('cherry', language)} (Cherry)</option>
            <option value="Peach">{getLocalizedCropName('peach', language)} (Peach)</option>
            <option value="Squash">{getLocalizedCropName('squash', language)} (Squash)</option>
            <option value="Blueberry">{getLocalizedCropName('blueberry', language)} (Blueberry)</option>
            <option value="Raspberry">{getLocalizedCropName('raspberry', language)} (Raspberry)</option>
          </select>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {QUICK_CROP_OPTIONS.slice(0, 11).map((c) => {
            const isSelected = selectedCropHint === c.value;
            const displayLabel =
              c.value === 'auto'
                ? `Auto-Detect (${TOTAL_CROPS})`
                : getLocalizedCropName(c.labelKey, language) || c.fallback;
            return (
              <button
                key={c.value}
                type="button"
                onClick={() => setSelectedCropHint(c.value)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-emerald-400'
                }`}
              >
                {displayLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Upload & Preview Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
        {offlineSwitchNotice && (
          <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
              <Info className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{offlineSwitchNotice}</span>
            </div>
            <button
              onClick={() => setOfflineSwitchNotice(null)}
              className="text-blue-500 hover:text-blue-800 p-1 cursor-pointer"
              aria-label="Dismiss notice"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {errorMessage && (
          <div className="relative p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="flex-1 pr-2">
              <p className="text-sm font-semibold">{errorMessage}</p>
              <p className="text-xs text-amber-700 mt-1">{aLoc.tipOfflineEdge}</p>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-amber-500 hover:text-amber-700 p-1 shrink-0 cursor-pointer"
              aria-label="Dismiss error"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {!selectedImage ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all cursor-pointer ${
              isDragOver
                ? 'border-emerald-600 bg-emerald-50/70'
                : 'border-emerald-300 hover:border-emerald-500 bg-emerald-50/20'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  processImageFile(e.target.files[0]);
                }
              }}
            />

            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  processImageFile(e.target.files[0]);
                }
              }}
            />

            <div className="max-w-md mx-auto space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-xs">
                <Upload className="w-8 h-8" />
              </div>

              <div className="space-y-1.5">
                <h3 className="font-bold text-slate-900 text-lg sm:text-xl">{t.analyze.dropAreaText}</h3>
                <p className="text-xs sm:text-sm text-slate-500">{t.analyze.dropAreaSubtext}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={onOpenCamera}
                  className="w-full px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Camera className="w-4 h-4" />
                  <span>{t.analyze.cameraButton}</span>
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-sm shadow-2xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Upload className="w-4 h-4 text-emerald-600" />
                  <span>{t.analyze.uploadButton}</span>
                </button>
              </div>

              <div className="sm:hidden pt-1">
                <button
                  onClick={() => cameraInputRef.current?.click()}
                  className="text-xs text-emerald-700 font-semibold underline underline-offset-2"
                >
                  {aLoc.mobileCameraDirect}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Clean Image Preview */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 max-h-[380px] flex items-center justify-center border border-slate-200">
              <img
                src={selectedImage}
                alt="Selected Leaf"
                className="max-h-[380px] w-auto object-contain"
              />

              <button
                onClick={clearSelection}
                className="absolute top-3 right-3 p-2 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white transition-colors cursor-pointer"
                title={t.analyze.removeImage}
              >
                <X className="w-5 h-5" />
              </button>

              {activeDemoLabel && (
                <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-slate-900/85 text-white rounded-xl text-xs font-semibold backdrop-blur-xs">
                  {activeDemoLabel}
                </div>
              )}
            </div>

            {/* Image Quality Check */}
            {qualityReport && (
              <div
                className={`p-4 rounded-2xl border space-y-3 ${
                  qualityReport.isLeafLikely
                    ? 'bg-slate-50 border-slate-200'
                    : 'bg-red-50/70 border-red-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    {qualityReport.isLeafLikely ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                    )}
                    <span>{aLoc.qualityCheckTitle}</span>
                  </div>
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      qualityReport.isLeafLikely
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {aLoc.scoreLabel} {qualityReport.score}/100
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                    <span className="block text-slate-400 text-[10px] font-semibold">
                      {aLoc.brightnessLabel}
                    </span>
                    <span className="font-bold text-slate-800 text-xs mt-0.5 block">
                      {qualityReport.isDark
                        ? aLoc.qualityDark
                        : qualityReport.isOverexposed
                        ? aLoc.qualityGlare
                        : aLoc.qualityOptimal}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                    <span className="block text-slate-400 text-[10px] font-semibold">
                      {aLoc.sharpnessLabel}
                    </span>
                    <span className="font-bold text-slate-800 text-xs mt-0.5 block">
                      {qualityReport.isBlurry ? aLoc.qualityBlurry : aLoc.qualityCrisp}
                    </span>
                  </div>
                  <div
                    className={`p-2.5 rounded-xl bg-white border ${
                      qualityReport.isLeafLikely ? 'border-slate-200' : 'border-red-300'
                    }`}
                  >
                    <span className="block text-slate-400 text-[10px] font-semibold">
                      {aLoc.vegetationLabel}
                    </span>
                    <span
                      className={`font-bold text-xs mt-0.5 block ${
                        qualityReport.isLeafLikely ? 'text-emerald-700' : 'text-red-600'
                      }`}
                    >
                      {qualityReport.isLeafLikely ? aLoc.qualityLeafDetected : 'No Leaf Detected'}
                    </span>
                  </div>
                </div>

                {!qualityReport.isLeafLikely && qualityReport.warnings.length > 0 && (
                  <p className="text-xs font-medium text-red-700 bg-white/80 border border-red-200 rounded-xl px-3 py-2">
                    {qualityReport.warnings[0]}
                  </p>
                )}
              </div>
            )}

            {/* Blocker Alert if Non-Leaf or Low Confidence */}
            {blockedInfo && (
              <div className="p-5 rounded-2xl bg-red-50 border border-red-200 text-red-950 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm text-red-900">{blockedInfo.title}</h4>
                      <p className="text-xs text-red-800 mt-1">{blockedInfo.reason}</p>
                      {blockedInfo.cropHintWarning && (
                        <p className="text-xs font-bold text-amber-900 bg-amber-100 border border-amber-300 px-2.5 py-1 rounded-lg mt-2 inline-block">
                          {blockedInfo.cropHintWarning}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => setBlockedInfo(null)}
                    className="p-1 text-red-500 hover:text-red-800 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  <button
                    onClick={() => {
                      clearSelection();
                      onOpenCamera();
                    }}
                    className="px-4 py-2 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Retake Leaf Photo</span>
                  </button>
                  <button
                    onClick={() => {
                      clearSelection();
                      fileInputRef.current?.click();
                    }}
                    className="px-4 py-2 rounded-xl bg-white border border-red-300 text-red-900 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload Different Photo</span>
                  </button>
                </div>
              </div>
            )}

            {/* Analyze Action Button */}
            {isAnalyzing ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white mx-auto flex items-center justify-center animate-spin">
                  <RefreshCw className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">{t.analyze.analyzingButton}</h4>
                  <p className="text-xs text-emerald-700 font-semibold mt-1">{analysisStep}</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={runAnalysis}
                  disabled={!isScanReady}
                  className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-extrabold text-base shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Cpu className="w-5 h-5" />
                  <span>{t.analyze.analyzeLeafButton}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <button
                  onClick={clearSelection}
                  className="w-full sm:w-auto py-4 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors cursor-pointer"
                >
                  {t.analyze.changeImage}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sample Demonstration Leaves Section */}
      <section className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">{t.analyze.sampleLeavesTitle}</h3>
              <p className="text-xs text-slate-500">{t.analyze.sampleLeavesDesc}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={sampleSearchQuery}
                onChange={(e) => setSampleSearchQuery(e.target.value)}
                placeholder="Search e.g. Grape Esca, Apple Scab..."
                className="w-full sm:w-56 pl-9 pr-8 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
              />
              {sampleSearchQuery && (
                <button
                  onClick={() => setSampleSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              onClick={() => setActiveTab('tests')}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors shrink-0 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{aLoc.openTestLabBtn}</span>
            </button>
          </div>
        </div>

        {/* All 18 Crops Filter Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'all', label: aLoc.allCropsFilter },
            { id: 'Grape', label: getLocalizedCropName('grape', language) },
            { id: 'Apple', label: getLocalizedCropName('apple', language) },
            { id: 'Tomato', label: getLocalizedCropName('tomato', language) },
            { id: 'Potato', label: getLocalizedCropName('potato', language) },
            { id: 'Corn', label: getLocalizedCropName('corn', language) },
            { id: 'Rice', label: getLocalizedCropName('rice', language) },
            { id: 'Wheat', label: getLocalizedCropName('wheat', language) },
            { id: 'Cotton', label: getLocalizedCropName('cotton', language) },
            { id: 'Sugarcane', label: getLocalizedCropName('sugarcane', language) },
            { id: 'Soybean', label: getLocalizedCropName('soybean', language) },
            { id: 'Pepper', label: getLocalizedCropName('pepper_bell', language) },
            { id: 'Squash', label: getLocalizedCropName('squash', language) },
            { id: 'Peach', label: getLocalizedCropName('peach', language) },
            { id: 'Strawberry', label: getLocalizedCropName('strawberry', language) },
            { id: 'Orange', label: getLocalizedCropName('orange', language) },
            { id: 'Cherry', label: getLocalizedCropName('cherry', language) },
            { id: 'Blueberry', label: getLocalizedCropName('blueberry', language) },
            { id: 'Raspberry', label: getLocalizedCropName('raspberry', language) },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSampleCropFilter(item.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                sampleCropFilter === item.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Sample Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[540px] overflow-y-auto pr-1">
          {filteredSamples.map((sample) => (
            <div
              key={sample.id}
              onClick={() => handleSampleClick(sample)}
              className="group p-3.5 rounded-2xl border border-slate-200 hover:border-emerald-500 bg-slate-50/50 hover:bg-white transition-all cursor-pointer flex items-center gap-3.5 shadow-2xs"
            >
              <img
                src={sample.dataUrl}
                alt={sample.conditionName}
                className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200 bg-slate-900"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 truncate">
                    {sample.crop}
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ${sample.badgeColor}`}
                  >
                    {sample.isHealthy ? 'Healthy' : sample.severity}
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm truncate mt-0.5">
                  {sample.conditionName}
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{sample.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
