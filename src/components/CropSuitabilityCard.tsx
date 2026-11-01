import React from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  Sprout,
  ArrowRight,
  Shovel,
  BookOpen,
  MapPin,
  Calendar,
  Sparkles,
  Info,
  Volume2,
} from 'lucide-react';
import { CropSuitabilityReport, LanguageCode } from '../types';
import { getLocalizedSuitabilityTexts } from '../data/localizedCropWarnings';
import { getFullyLocalizedSuitability } from '../data/localizedCropSuitability';
import { speechService, SpeechPlayerState, formatSpokenSteps } from '../services/speechService';

interface CropSuitabilityCardProps {
  report: CropSuitabilityReport;
  language: LanguageCode;
  onSelectReplacementCrop?: (cropName: string) => void;
}

export const CropSuitabilityCard: React.FC<CropSuitabilityCardProps> = ({
  report: rawReport,
  language,
}) => {
  // Fully translate all paragraphs, removal steps, and alternative crop advantages for the selected language
  const report = React.useMemo(
    () => getFullyLocalizedSuitability(rawReport, language),
    [rawReport, language]
  );

  const isUnsuitable = report.status === 'UNSUITABLE';
  const isMarginal = report.status === 'MARGINAL';
  const isSuitable = report.status === 'SUITABLE';

  const [playerState, setPlayerState] = React.useState<SpeechPlayerState>(() => speechService.getState());

  React.useEffect(() => {
    return speechService.subscribe((state) => setPlayerState(state));
  }, []);

  const removalStepsList = React.useMemo(() => {
    if (!report.removalAndSoilPreparationAdvice) return [];
    return report.removalAndSoilPreparationAdvice
      .split(/(?<=[।!?\n.])/g)
      .map((s) => s.trim())
      .filter(Boolean);
  }, [report.removalAndSoilPreparationAdvice]);

  const isSpeakingRemoval = playerState.isPlaying && playerState.currentSection === 'actions';

  const removalSpeakLabels: Record<LanguageCode, { listening: string; listen: string }> = {
    hi: { listening: 'बोल रहे हैं...', listen: 'हटाने के तरीके सुनें' },
    mr: { listening: 'सांगत आहे...', listen: 'काढण्याच्या पद्धती ऐका' },
    gu: { listening: 'બોલી રહ્યા છે...', listen: 'દૂર કરવાની પદ્ધતિઓ સાંભળો' },
    bn: { listening: 'শুনানো হচ্ছে...', listen: 'অপসারণ পদ্ধতি শুনুন' },
    te: { listening: 'చెబుతున్నారు...', listen: 'తొలగింపు పద్ధతులు వినండి' },
    ta: { listening: 'ஒலிக்கிறது...', listen: 'அகற்றும் முறைகளைக் கேளுங்கள்' },
    kn: { listening: 'ಹೇಳಲಾಗುತ್ತಿದೆ...', listen: 'ತೆಗೆದುಹಾಕುವ ವಿಧಾನಗಳನ್ನು ಆಲಿಸಿ' },
    ml: { listening: 'വായിക്കുന്നു...', listen: 'നീക്കം ചെയ്യൽ രീതികൾ കേൾക്കൂ' },
    pa: { listening: 'ਬੋਲ ਰਹੇ ਹਨ...', listen: 'ਹਟਾਉਣ ਦੇ ਤਰੀਕੇ ਸੁਣੋ' },
    or: { listening: 'ଶୁଣାଯାଉଛି...', listen: 'ବାହାର କରିବା ପଦ୍ଧତି ଶୁଣନ୍ତୁ' },
    as: { listening: 'শুনোৱা হৈছে...', listen: 'অপসাৰণ পদ্ধতি শুনক' },
    en: { listening: 'Speaking...', listen: 'Listen to Removal Steps' },
  };

  const currentRemovalLabel = removalSpeakLabels[language] || removalSpeakLabels.en;

  const handlePlayRemovalSteps = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSpeakingRemoval) {
      speechService.stop();
    } else {
      const intro =
        language === 'gu'
          ? 'ખેડૂત મિત્રો માટે પાક દૂર કરવાની પદ્ધતિઓ: '
          : language === 'hi'
          ? 'किसान भाइयों के लिए फसल हटाने के तरीके: '
          : 'Recommended crop removal protocol: ';
      const spokenSteps = formatSpokenSteps(removalStepsList, language);
      speechService.speakScript(intro + spokenSteps, language, 'actions');
    }
  };

  // Multi-lingual translations for all 12 Indian languages
  const sTexts = getLocalizedSuitabilityTexts(language);

  const badgeText = isUnsuitable
    ? sTexts.cropWarningBadge
    : isMarginal
    ? sTexts.cautionBadge
    : sTexts.suitableBadge;

  const actionTitle = isUnsuitable
    ? sTexts.unsuitableActionTitle
    : isMarginal
    ? sTexts.marginalActionTitle
    : sTexts.suitableActionTitle;

  const recommendedTitle = sTexts.recommendedSubstitutes(report.stateName);
  const removalTitle = sTexts.removalProtocol;

  return (
    <div
      id="crop-suitability-advisory-card"
      className={`rounded-3xl border p-6 sm:p-8 shadow-sm transition-all ${
        isUnsuitable
          ? 'bg-gradient-to-br from-rose-50/90 via-red-50/60 to-orange-50/50 border-rose-300 ring-1 ring-rose-200'
          : isMarginal
          ? 'bg-gradient-to-br from-amber-50/90 via-yellow-50/50 to-orange-50/40 border-amber-300 ring-1 ring-amber-200'
          : 'bg-gradient-to-br from-emerald-50/90 via-teal-50/50 to-green-50/40 border-emerald-300 ring-1 ring-emerald-200'
      }`}
    >
      {/* Header Badge & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 mb-4 border-slate-200/80">
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-xs ${
              isUnsuitable
                ? 'bg-rose-600 text-white shadow-rose-600/30'
                : isMarginal
                ? 'bg-amber-600 text-white shadow-amber-600/30'
                : 'bg-emerald-600 text-white shadow-emerald-600/30'
            }`}
          >
            {isUnsuitable ? (
              <AlertOctagon className="w-6 h-6" />
            ) : isMarginal ? (
              <AlertTriangle className="w-6 h-6" />
            ) : (
              <CheckCircle2 className="w-6 h-6" />
            )}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                  isUnsuitable
                    ? 'bg-rose-100 text-rose-900 border-rose-300'
                    : isMarginal
                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                    : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                }`}
              >
                {badgeText}
              </span>
              <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{report.stateName}</span>
                <span className="text-slate-400">({report.agroClimaticZone})</span>
              </span>
            </div>
            <h3
              className={`text-lg sm:text-xl font-black mt-1 ${
                isUnsuitable ? 'text-rose-950' : isMarginal ? 'text-amber-950' : 'text-emerald-950'
              }`}
            >
              {actionTitle}
            </h3>
          </div>
        </div>
      </div>

      {/* Main Reasoning & Direct Warning */}
      <div className="space-y-4">
        <div
          className={`p-4 sm:p-5 rounded-2xl text-xs sm:text-sm leading-relaxed border ${
            isUnsuitable
              ? 'bg-white/80 text-rose-950 border-rose-200'
              : isMarginal
              ? 'bg-white/80 text-amber-950 border-amber-200'
              : 'bg-white/80 text-emerald-950 border-emerald-200'
          }`}
        >
          <div className="font-bold flex items-center gap-2 mb-1.5">
            <Info
              className={`w-4 h-4 shrink-0 ${
                isUnsuitable ? 'text-rose-600' : isMarginal ? 'text-amber-600' : 'text-emerald-600'
              }`}
            />
            <span>{report.primaryRecommendation}</span>
          </div>
          <p className="mt-2 text-slate-700 leading-relaxed font-normal">{report.reason}</p>
        </div>

        {/* If Unsuitable or Marginal: Step-by-step removal and soil prep */}
        {isUnsuitable && report.removalAndSoilPreparationAdvice && (
          <div className={`p-4 sm:p-5 rounded-2xl bg-white/90 border space-y-3 transition-all ${
            isSpeakingRemoval
              ? 'border-rose-300 ring-2 ring-rose-300/40'
              : 'border-rose-200'
          }`}>
            <div className="flex items-center justify-between border-b border-rose-100/80 pb-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-rose-950">
                <Shovel className="w-4 h-4 text-amber-700" />
                <h4>{removalTitle}</h4>
              </div>

              {/* Synchronized Listen Button for Removal Protocol */}
              <button
                type="button"
                onClick={handlePlayRemovalSteps}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isSpeakingRemoval
                    ? 'bg-rose-600 text-white animate-pulse shadow-sm ring-2 ring-rose-400'
                    : 'bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-200/80 active:scale-95'
                }`}
              >
                <Volume2 className={`w-3.5 h-3.5 ${isSpeakingRemoval ? 'animate-bounce' : 'text-rose-700'}`} />
                <span>{isSpeakingRemoval ? currentRemovalLabel.listening : currentRemovalLabel.listen}</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {removalStepsList.map((stepSentence, sIdx) => {
                const isCurrentlyActive =
                  playerState.isPlaying &&
                  (playerState.currentSection === 'actions' || playerState.currentSection === 'all') &&
                  playerState.activeStepIndex === sIdx;

                return (
                  <div
                    key={sIdx}
                    className={`flex items-start gap-3 text-xs sm:text-sm leading-relaxed p-3 rounded-xl transition-all duration-300 ${
                      isCurrentlyActive
                        ? 'bg-amber-50 text-rose-950 font-bold border border-rose-400 ring-2 ring-rose-400/40 shadow-sm'
                        : 'bg-rose-50/50 border border-rose-100/70 text-slate-700'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-lg font-black text-xs flex items-center justify-center shrink-0 mt-0.5 transition-transform ${
                        isCurrentlyActive
                          ? 'bg-rose-600 text-white scale-110 animate-pulse shadow-xs'
                          : 'bg-rose-200 text-rose-900'
                      }`}
                    >
                      {isCurrentlyActive ? '🔊' : sIdx + 1}
                    </span>
                    <div className="flex-1">
                      <span className={isCurrentlyActive ? 'text-rose-950 font-bold' : 'text-slate-700'}>
                        {stepSentence}
                      </span>
                      {isCurrentlyActive && (
                        <span className="block text-[11px] text-rose-700 font-semibold mt-1">
                          {language === 'gu'
                            ? `પદ્ધતિ ${sIdx + 1} હમણાં બોલાઈ રહી છે...`
                            : language === 'hi'
                            ? `विधि ${sIdx + 1} अभी बोली जा रही है...`
                            : `Method ${sIdx + 1} speaking now...`}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Recommended Replacement Crops Section */}
        {report.recommendedCropsToPlant && report.recommendedCropsToPlant.length > 0 && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-slate-900">
                <Sprout className="w-4 h-4 text-emerald-600" />
                <h4>{recommendedTitle}</h4>
              </div>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/70 border border-emerald-200 px-2 py-0.5 rounded-full">
                {sTexts.icarTested}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {report.recommendedCropsToPlant.map((crop, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{crop.season}</span>
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">{sTexts.choiceOption(idx + 1)}</span>
                    </div>
                    <h5 className="font-black text-sm text-slate-900 flex items-center gap-1">
                      <span>{crop.cropName}</span>
                    </h5>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-3">
                      {crop.suitabilityReason}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <div className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>{crop.expectedAdvantage}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ICAR / KVK Helpline Note */}
        <div className="pt-2 border-t border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{report.icarAdvisoryNote}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
