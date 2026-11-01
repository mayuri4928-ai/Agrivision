import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Radio,
  Gauge,
  Check,
  AlertCircle,
} from 'lucide-react';
import { DiagnosisResult, DiseaseDetail, IndianState, LanguageCode } from '../types';
import {
  speechService,
  SpeechPlayerState,
  SpeechSectionId,
  buildFarmerFullSpeech,
  buildSectionSpeech,
} from '../services/speechService';
import { getLocalizedResults } from '../data/localizedResultsData';
import { getStoredPreferences, saveStoredPreferences } from '../services/storage';

interface AudioDiagnosisPlayerProps {
  diagnosis: DiagnosisResult;
  diseaseDetail: DiseaseDetail;
  selectedState: IndianState;
  language: LanguageCode;
  autoPlayTrigger?: boolean;
}

export const AudioDiagnosisPlayer: React.FC<AudioDiagnosisPlayerProps> = ({
  diagnosis,
  diseaseDetail,
  selectedState,
  language,
  autoPlayTrigger = false,
}) => {
  const [playerState, setPlayerState] = useState<SpeechPlayerState>(speechService.getState());
  const [selectedSpeed, setSelectedSpeed] = useState<number>(() => {
    const prefs = getStoredPreferences();
    return prefs.speechRate || 1.0;
  });
  const [selectedPitch, setSelectedPitch] = useState<number>(() => {
    const prefs = getStoredPreferences();
    return prefs.speechPitch || 1.0;
  });
  const [autoSpeakEnabled, setAutoSpeakEnabled] = useState<boolean>(() => {
    const prefs = getStoredPreferences();
    return prefs.autoReadDiagnosis || false;
  });

  const resLocale = getLocalizedResults(language);
  const ttsText = resLocale.tts;

  // Subscribe to speech service state changes
  useEffect(() => {
    const unsubscribe = speechService.subscribe((state) => {
      setPlayerState(state);
      if (state.speechPitch) {
        setSelectedPitch(state.speechPitch);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Handle auto-speak on initial mount if enabled or requested
  useEffect(() => {
    if (autoPlayTrigger || autoSpeakEnabled) {
      const timer = setTimeout(() => {
        handlePlaySection('all');
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [diagnosis.className, autoPlayTrigger]);

  // Clean up audio if user leaves page
  useEffect(() => {
    return () => {
      speechService.stop();
    };
  }, []);

  const handlePlaySection = (section: SpeechSectionId) => {
    const text = buildSectionSpeech(section, diagnosis, language, diseaseDetail, selectedState);
    const englishFallback =
      language !== 'en'
        ? buildSectionSpeech(section, diagnosis, 'en', diseaseDetail, selectedState)
        : undefined;
    speechService.speakScript(text, language, section, selectedSpeed, englishFallback);
  };

  const handlePauseResume = () => {
    if (playerState.isPaused) {
      speechService.resume();
    } else if (playerState.isPlaying) {
      speechService.pause();
    } else {
      handlePlaySection('all');
    }
  };

  const handleStop = () => {
    speechService.stop();
  };

  const handleSpeedChange = (rate: number) => {
    setSelectedSpeed(rate);
    speechService.setRate(rate);
    saveStoredPreferences({ speechRate: rate });
  };

  const handlePitchChange = (pitch: number) => {
    setSelectedPitch(pitch);
    speechService.setPitch(pitch);
    saveStoredPreferences({ speechPitch: pitch });
  };

  const handleToggleAutoSpeak = (enabled: boolean) => {
    setAutoSpeakEnabled(enabled);
    saveStoredPreferences({ autoReadDiagnosis: enabled });
  };

  if (!playerState.isSupported) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-3 text-amber-800 text-xs">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
        <span>{ttsText.voiceUnsupported}</span>
      </div>
    );
  }

  const isCurrentActive = playerState.isPlaying || playerState.isPaused;

  return (
    <section
      id="farmer-voice-assist-player"
      aria-label="Farmer Voice Assistance"
      className={`relative overflow-hidden rounded-3xl border transition-all duration-300 ${
        isCurrentActive
          ? 'bg-gradient-to-br from-emerald-900 via-emerald-950 to-slate-950 text-white border-emerald-500/60 shadow-xl ring-2 ring-emerald-500/30'
          : 'bg-gradient-to-br from-emerald-50/90 via-white to-amber-50/40 text-slate-900 border-emerald-200/80 shadow-md hover:border-emerald-300'
      }`}
    >
      {/* Decorative ambient glowing circles */}
      {isCurrentActive && (
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
      )}

      <div className="p-5 sm:p-7 space-y-5">
        {/* Top Header Row with High Contrast Icon Badge */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-transform ${
                isCurrentActive
                  ? 'bg-emerald-500 text-slate-950 scale-105 ring-4 ring-emerald-400/30 animate-pulse'
                  : 'bg-emerald-600 text-white shadow-emerald-600/20'
              }`}
            >
              {isCurrentActive ? (
                <Radio className="w-6 h-6 animate-pulse" />
              ) : (
                <Volume2 className="w-6 h-6" />
              )}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3
                  className={`text-base sm:text-lg font-black tracking-tight ${
                    isCurrentActive ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {ttsText.bannerTitle}
                </h3>
                {isCurrentActive ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-400 text-slate-950 uppercase tracking-wider animate-pulse">
                    Live Audio Sync
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300/80">
                    🎙️ {language === 'gu' ? 'ઉત્તમ કુદરતી અવાજ' : language === 'hi' ? 'सर्वोत्तम प्राकृतिक स्वर' : 'Best Natural Voice'}
                  </span>
                )}
              </div>
              <p
                className={`text-xs sm:text-sm mt-0.5 ${
                  isCurrentActive ? 'text-emerald-200/90' : 'text-slate-600'
                }`}
              >
                {ttsText.bannerSubtitle}
              </p>
            </div>
          </div>

          {/* Tone & Speed Selectors */}
          <div className="flex flex-wrap items-center gap-2 self-start lg:self-center">
            {/* Voice Tone Selector */}
            <div
              className={`inline-flex items-center p-1 rounded-xl border text-xs font-semibold shrink-0 ${
                isCurrentActive
                  ? 'bg-emerald-950/60 border-emerald-700/60 text-emerald-200'
                  : 'bg-white border-slate-200 text-slate-700 shadow-2xs'
              }`}
            >
              <button
                id="tts-tone-natural"
                type="button"
                onClick={() => handlePitchChange(1.0)}
                title="Natural Clear Voice"
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  selectedPitch >= 0.96
                    ? isCurrentActive
                      ? 'bg-emerald-500 text-slate-950 font-black shadow-xs'
                      : 'bg-emerald-600 text-white font-black shadow-xs'
                    : 'hover:opacity-80'
                }`}
              >
                <span>🎙️</span>
                <span>
                  {language === 'gu'
                    ? 'કુદરતી અવાજ'
                    : language === 'hi'
                    ? 'प्राकृतिक स्वर'
                    : language === 'mr'
                    ? 'नैसर्गिक आवाज'
                    : language === 'bn'
                    ? 'স্বাভাবিক কণ্ঠ'
                    : language === 'te'
                    ? 'సహజ స్వరం'
                    : language === 'ta'
                    ? 'இயற்கை குரல்'
                    : language === 'kn'
                    ? 'ನೈಸರ್ಗಿಕ ಧ್ವನಿ'
                    : language === 'ml'
                    ? 'സ്വാഭാവിക ശബ്ദം'
                    : language === 'pa'
                    ? 'ਕੁਦਰਤੀ ਅਵਾਜ਼'
                    : language === 'or'
                    ? 'ପ୍ରାକୃତିକ ସ୍ୱର'
                    : language === 'as'
                    ? 'প্ৰাকৃতিক মাত'
                    : 'Natural Voice'}
                </span>
              </button>
              <button
                id="tts-tone-deep"
                type="button"
                onClick={() => handlePitchChange(0.92)}
                title="Warm Voice"
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  selectedPitch < 0.96
                    ? isCurrentActive
                      ? 'bg-emerald-500 text-slate-950 font-black shadow-xs'
                      : 'bg-emerald-600 text-white font-black shadow-xs'
                    : 'hover:opacity-80'
                }`}
              >
                <span>
                  {language === 'gu'
                    ? 'ગંભીર'
                    : language === 'hi'
                    ? 'गहरा'
                    : language === 'mr'
                    ? 'गंभीर'
                    : language === 'bn'
                    ? 'গম্ভীর'
                    : language === 'te'
                    ? 'గంభీర'
                    : language === 'ta'
                    ? 'கம்பீர'
                    : language === 'kn'
                    ? 'ಗಂಭೀರ'
                    : language === 'ml'
                    ? 'ഗംഭീരം'
                    : language === 'pa'
                    ? 'ਗੰਭੀਰ'
                    : language === 'or'
                    ? 'ଗମ୍ଭୀର'
                    : language === 'as'
                    ? 'গম্ভীৰ'
                    : 'Warm Voice'}
                </span>
              </button>
            </div>

            {/* Speed Selector (Normal / Clear) */}
            <div
              className={`inline-flex items-center p-1 rounded-xl border text-xs font-semibold shrink-0 ${
                isCurrentActive
                  ? 'bg-emerald-950/60 border-emerald-700/60 text-emerald-200'
                  : 'bg-white border-slate-200 text-slate-700 shadow-2xs'
              }`}
            >
              <button
                id="tts-speed-slow"
                type="button"
                onClick={() => handleSpeedChange(0.9)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedSpeed < 0.95
                    ? isCurrentActive
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-xs'
                      : 'bg-emerald-600 text-white font-bold shadow-xs'
                    : 'hover:opacity-80'
                }`}
              >
                {ttsText.speedSlow}
              </button>
              <button
                id="tts-speed-normal"
                type="button"
                onClick={() => handleSpeedChange(1.0)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedSpeed >= 0.95
                    ? isCurrentActive
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-xs'
                      : 'bg-emerald-600 text-white font-bold shadow-xs'
                    : 'hover:opacity-80'
                }`}
              >
                {ttsText.speedNormal}
              </button>
            </div>
          </div>
        </div>

        {/* Live Audio Visualizer Wave & Synchronized Subtitle when playing */}
        {isCurrentActive && (
          <div className="bg-emerald-950/80 border border-emerald-500/40 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-inner">
            <div className="flex items-start gap-3.5 w-full">
              {/* Animated audio equalizer wave */}
              <div className="flex items-end gap-1 h-7 px-1 shrink-0 mt-1">
                <span className="w-1.5 bg-emerald-400 rounded-full animate-[bounce_0.6s_infinite_100ms] h-6" />
                <span className="w-1.5 bg-emerald-400 rounded-full animate-[bounce_0.8s_infinite_200ms] h-4" />
                <span className="w-1.5 bg-emerald-400 rounded-full animate-[bounce_0.5s_infinite_150ms] h-7" />
                <span className="w-1.5 bg-emerald-400 rounded-full animate-[bounce_0.7s_infinite_250ms] h-5" />
                <span className="w-1.5 bg-emerald-400 rounded-full animate-[bounce_0.9s_infinite_180ms] h-6" />
              </div>

              <div className="min-w-0 flex-1 space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-emerald-300">
                    {playerState.isPaused ? ttsText.pause : ttsText.listening}
                  </span>

                  {/* Synchronized Step Number Badge */}
                  {playerState.activeStepIndex >= 0 && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-emerald-400 text-slate-950 tracking-wider shadow-sm animate-pulse">
                      <span>✓</span>
                      <span>
                        {language === 'gu'
                          ? `પદ્ધતિ ${playerState.activeStepIndex + 1}`
                          : language === 'hi'
                          ? `विधि ${playerState.activeStepIndex + 1}`
                          : `Method ${playerState.activeStepIndex + 1}`}
                      </span>
                    </span>
                  )}

                  {playerState.totalQueueItems > 1 && (
                    <span className="text-[11px] font-mono text-emerald-400/80 bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-700/50">
                      {playerState.currentQueueIndex + 1} / {playerState.totalQueueItems}
                    </span>
                  )}
                </div>

                {/* Exact Synced Subtitle Sentence */}
                {playerState.activeSnippet && (
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-emerald-500/30 text-emerald-50">
                    <p className="text-sm sm:text-base font-semibold leading-relaxed">
                      &ldquo;{playerState.activeSnippet}&rdquo;
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="text-[11px] text-emerald-300/80 font-mono self-end md:self-center shrink-0 flex items-center gap-2">
              <span className="px-2 py-1 rounded bg-emerald-900/50 border border-emerald-700/40">
                🎙️ {playerState.voiceName || ttsText.readingLanguage}
              </span>
            </div>
          </div>
        )}

        {/* Main Playback Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Big Green Primary Listen Button */}
          {!playerState.isPlaying ? (
            <button
              id="tts-play-main"
              type="button"
              onClick={() =>
                playerState.isPaused
                  ? handlePauseResume()
                  : handlePlaySection(playerState.currentSection || 'all')
              }
              className={`flex-1 sm:flex-none px-6 py-3.5 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-md active:scale-95 transition-all cursor-pointer ${
                isCurrentActive
                  ? 'bg-emerald-400 hover:bg-emerald-300 text-slate-950 ring-2 ring-emerald-300'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30'
              }`}
            >
              <Play className="w-5 h-5 fill-current" />
              <span>
                {playerState.isPaused ? ttsText.resume : ttsText.listenFull}
              </span>
            </button>
          ) : (
            <button
              id="tts-pause-main"
              type="button"
              onClick={handlePauseResume}
              className="flex-1 sm:flex-none px-6 py-3.5 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md active:scale-95 transition-all"
            >
              <Pause className="w-5 h-5 fill-current" />
              <span>{ttsText.pause}</span>
            </button>
          )}

          {/* Stop Button */}
          {isCurrentActive && (
            <button
              id="tts-stop-main"
              type="button"
              onClick={handleStop}
              className={`px-4 py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all ${
                isCurrentActive
                  ? 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              <span>{ttsText.stop}</span>
            </button>
          )}

          {/* Auto-play Checkbox Toggle */}
          <label className="flex items-center gap-2.5 ml-auto cursor-pointer py-1.5 px-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors select-none text-xs">
            <input
              type="checkbox"
              id="tts-auto-read-toggle"
              checked={autoSpeakEnabled}
              onChange={(e) => handleToggleAutoSpeak(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
            />
            <span className={isCurrentActive ? 'text-emerald-200' : 'text-slate-600 font-medium'}>
              {ttsText.autoPlayPrompt}
            </span>
          </label>
        </div>

        {/* Section Quick-Listen Buttons: Farmers can hear just actions, symptoms, or helpline */}
        <div className="pt-2 border-t border-slate-200/50 dark:border-emerald-800/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
            <span
              className={`text-xs font-bold uppercase tracking-wider ${
                isCurrentActive ? 'text-emerald-300' : 'text-slate-500'
              }`}
            >
              {ttsText.quickListenSection}
            </span>
            <span
              className={`text-[11px] ${
                isCurrentActive ? 'text-emerald-400' : 'text-emerald-700 font-medium'
              }`}
            >
              {ttsText.readingLanguage}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {/* Section: Full */}
            <button
              id="tts-chip-all"
              type="button"
              onClick={() => handlePlaySection('all')}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all text-center ${
                playerState.isPlaying && playerState.currentSection === 'all'
                  ? 'bg-emerald-400 text-slate-950 ring-2 ring-emerald-300 font-black'
                  : isCurrentActive
                  ? 'bg-emerald-950/70 border border-emerald-700/60 text-emerald-200 hover:bg-emerald-900/80'
                  : 'bg-white border border-slate-200/90 text-slate-700 hover:border-emerald-300 hover:bg-emerald-50/50 shadow-2xs'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{ttsText.sectionAll}</span>
            </button>

            {/* Section: Actions */}
            <button
              id="tts-chip-actions"
              type="button"
              onClick={() => handlePlaySection('actions')}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all text-center ${
                playerState.isPlaying && playerState.currentSection === 'actions'
                  ? 'bg-emerald-400 text-slate-950 ring-2 ring-emerald-300 font-black'
                  : isCurrentActive
                  ? 'bg-emerald-950/70 border border-emerald-700/60 text-emerald-200 hover:bg-emerald-900/80'
                  : 'bg-white border border-slate-200/90 text-slate-700 hover:border-emerald-300 hover:bg-emerald-50/50 shadow-2xs'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{ttsText.sectionActions}</span>
            </button>

            {/* Section: Symptoms */}
            <button
              id="tts-chip-symptoms"
              type="button"
              onClick={() => handlePlaySection('symptoms')}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all text-center ${
                playerState.isPlaying && playerState.currentSection === 'symptoms'
                  ? 'bg-emerald-400 text-slate-950 ring-2 ring-emerald-300 font-black'
                  : isCurrentActive
                  ? 'bg-emerald-950/70 border border-emerald-700/60 text-emerald-200 hover:bg-emerald-900/80'
                  : 'bg-white border border-slate-200/90 text-slate-700 hover:border-emerald-300 hover:bg-emerald-50/50 shadow-2xs'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{ttsText.sectionSymptoms}</span>
            </button>

            {/* Section: Helpline */}
            <button
              id="tts-chip-helpline"
              type="button"
              onClick={() => handlePlaySection('helpline')}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all text-center ${
                playerState.isPlaying && playerState.currentSection === 'helpline'
                  ? 'bg-emerald-400 text-slate-950 ring-2 ring-emerald-300 font-black'
                  : isCurrentActive
                  ? 'bg-emerald-950/70 border border-emerald-700/60 text-emerald-200 hover:bg-emerald-900/80'
                  : 'bg-white border border-slate-200/90 text-slate-700 hover:border-emerald-300 hover:bg-emerald-50/50 shadow-2xs'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{ttsText.sectionHelpline}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Inline mini speaker button that can be dropped beside any section header
 */
export const InlineSpeakButton: React.FC<{
  section: SpeechSectionId;
  diagnosis: DiagnosisResult;
  diseaseDetail: DiseaseDetail;
  selectedState: IndianState;
  language: LanguageCode;
  title?: string;
  className?: string;
}> = ({ section, diagnosis, diseaseDetail, selectedState, language, title, className = '' }) => {
  const [playerState, setPlayerState] = useState<SpeechPlayerState>(speechService.getState());

  useEffect(() => {
    return speechService.subscribe((state) => setPlayerState(state));
  }, []);

  const isCurrentSection = playerState.isPlaying && playerState.currentSection === section;

  const inlineLabels: Record<LanguageCode, { listening: string; listen: string }> = {
    hi: { listening: 'बोल रहे हैं...', listen: 'सुनें' },
    mr: { listening: 'सांगत आहे...', listen: 'ऐका' },
    gu: { listening: 'બોલી રહ્યા છે...', listen: 'સાંભળો' },
    bn: { listening: 'শুনানো হচ্ছে...', listen: 'শুনুন' },
    te: { listening: 'చెబుతున్నారు...', listen: 'వినండి' },
    ta: { listening: 'ஒலிக்கிறது...', listen: 'கேளுங்கள்' },
    kn: { listening: 'ಹೇಳಲಾಗುತ್ತಿದೆ...', listen: 'ಆಲಿಸಿ' },
    ml: { listening: 'വായിക്കുന്നു...', listen: 'കേൾക്കൂ' },
    pa: { listening: 'ਬੋਲ ਰਹੇ ਹਨ...', listen: 'ਸੁਣੋ' },
    or: { listening: 'ଶୁଣାଯାଉଛି...', listen: 'ଶୁଣନ୍ତୁ' },
    as: { listening: 'শুনোৱা হৈছে...', listen: 'শুনক' },
    en: { listening: 'Speaking...', listen: 'Listen' },
  };

  const currentLabel = inlineLabels[language] || inlineLabels.en;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCurrentSection) {
      speechService.stop();
    } else {
      const text = buildSectionSpeech(section, diagnosis, language, diseaseDetail, selectedState);
      const englishFallback =
        language !== 'en'
          ? buildSectionSpeech(section, diagnosis, 'en', diseaseDetail, selectedState)
          : undefined;
      speechService.speakScript(text, language, section, playerState.speechRate, englishFallback);
    }
  };

  if (!playerState.isSupported) return null;

  return (
    <button
      id={`inline-tts-btn-${section}`}
      type="button"
      onClick={handleClick}
      title={title || 'Listen to this section'}
      aria-label={`Listen to ${section}`}
      className={`inline-flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
        isCurrentSection
          ? 'bg-emerald-500 text-slate-950 ring-2 ring-emerald-400 animate-pulse shadow-sm'
          : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/70 active:scale-95'
      } ${className}`}
    >
      <Volume2 className={`w-3.5 h-3.5 ${isCurrentSection ? 'animate-bounce' : 'text-emerald-700'}`} />
      <span className="text-[11px] font-semibold">
        {isCurrentSection ? currentLabel.listening : currentLabel.listen}
      </span>
    </button>
  );
};
