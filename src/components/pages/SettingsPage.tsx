import React, { useRef, useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { SUPPORTED_LANGUAGES } from '../../locales';
import { clearAllScanHistory, getStoredPreferences, saveStoredPreferences } from '../../services/storage';
import { inferenceEngine } from '../../services/model/inference';
import { speechService } from '../../services/speechService';
import { ErrorLogsManager } from '../ErrorLogsManager';
import {
  Settings,
  Globe,
  MapPin,
  Cpu,
  Upload,
  Trash2,
  Award,
  CheckCircle2,
  RefreshCw,
  HardDrive,
  Smartphone,
  Share2,
  Volume2,
  Play,
  Square,
} from 'lucide-react';

interface SettingsPageProps {
  onOpenStateModal: () => void;
  onOpenLanguageModal: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  onOpenStateModal,
  onOpenLanguageModal,
}) => {
  const {
    t,
    language,
    selectedState,
    modelStatus,
    refreshModelStatus,
    refreshHistory,
    history,
    isStandalone,
    isIOS,
  } = useApp();

  const [isUploadingModel, setIsUploadingModel] = useState(false);
  const [modelUploadMessage, setModelUploadMessage] = useState<string | null>(null);

  const jsonInputRef = useRef<HTMLInputElement | null>(null);
  const binInputRef = useRef<HTMLInputElement | null>(null);
  const [jsonFile, setJsonFile] = useState<File | null>(null);

  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  const [speechPitch, setSpeechPitch] = useState<number>(() => {
    const prefs = getStoredPreferences();
    return prefs.speechPitch || 0.76;
  });
  const [speechRate, setSpeechRate] = useState<number>(() => {
    const prefs = getStoredPreferences();
    return prefs.speechRate || 0.88;
  });
  const [autoSpeakEnabled, setAutoSpeakEnabled] = useState<boolean>(() => {
    const prefs = getStoredPreferences();
    return prefs.autoReadDiagnosis || false;
  });
  const [isPlayingTestVoice, setIsPlayingTestVoice] = useState(false);

  useEffect(() => {
    const unsub = speechService.subscribe((state) => {
      setIsPlayingTestVoice(state.isPlaying);
      if (state.speechPitch) {
        setSpeechPitch(state.speechPitch);
      }
    });
    return unsub;
  }, []);

  const handlePitchChange = (pitch: number) => {
    setSpeechPitch(pitch);
    speechService.setPitch(pitch);
    saveStoredPreferences({ speechPitch: pitch });
  };

  const handleRateChange = (rate: number) => {
    setSpeechRate(rate);
    speechService.setRate(rate);
    saveStoredPreferences({ speechRate: rate });
  };

  const handleToggleAutoSpeak = (enabled: boolean) => {
    setAutoSpeakEnabled(enabled);
    saveStoredPreferences({ autoReadDiagnosis: enabled });
  };

  const handleTestVoice = () => {
    if (isPlayingTestVoice) {
      speechService.stop();
      return;
    }
    const sampleSentences: Record<string, string> = {
      gu: 'નમસ્તે ખેડૂત મિત્ર! હું આપનો કૃષિ મિત્ર બોલી રહ્યો છું. આ આપણો કુદરતી ગંભીર અવાજ છે. તમારી તમામ પાક તપાસ આ ચોક્કસ અને સ્પષ્ટ અવાજમાં સંભળાશે.',
      hi: 'राम-राम किसान भाई! मैं आपका कृषि मित्र बोल रहा हूँ। यह आपका गहरा और स्पष्ट स्वर है। आपकी फसलों की सभी जांच इसी मधुर स्वर में सुनाई देगी।',
      mr: 'राम-राम शेतकरी बंधूंनो! मी आपला कृषी मित्र बोलत आहे. हा आपला गंभीर आणि स्पष्ट आवाज आहे. आपल्या पिकांची तपासणी या आवाजात ऐकू येईल.',
      bn: 'নমস্কার কৃষক ভাই! আমি আপনার কৃষি মিত্র বলছি। এটি আপনার গভীর ও স্পষ্ট কণ্ঠস্বর। আপনার ফসলের সকল পরামর্শ এই কণ্ঠে শোনা যাবে।',
      te: 'నమస్కారం రైతు సోదరులారా! నేను మీ వ్యవసాయ మిత్రుడిని మాట్లాడుతున్నాను. ఇది మీ గంభీర స్వరం. మీ పంటల సమాచారం స్పష్టంగా వినబడుతుంది.',
      ta: 'வணக்கம் விவசாய தோழரே! நான் உங்கள் வேளாண் நண்பர் பேசுகிறேன். இது கம்பீரமான குரல். உங்கள் பயிர் தகவல்கள் துல்லியமாக கேட்கும்.',
      kn: 'ನಮಸ್ಕಾರ ರೈತ ಬಾಂಧವರೇ! ನಾನು ನಿಮ್ಮ ಕೃಷಿ ಮಿತ್ರ ಮಾತನಾಡುತ್ತಿದ್ದೇನೆ. ಇದು ನಿಮ್ಮ ಗಂಭೀರ ಧ್ವನಿ. ನಿಮ್ಮ ಬೆಳೆಯ ಮಾಹಿತಿ ಸ್ಪಷ್ಟವಾಗಿ ಕೇಳಿಸುತ್ತದೆ.',
      ml: 'നമസ്കാരം കർഷക സുഹൃത്തേ! ഞാൻ നിങ്ങളുടെ കാർഷിക സുഹൃത്താണ് സംസാരിക്കുന്നത്. ഇത് നിങ്ങളുടെ ഗംഭീര ശബ്ദമാണ്.',
      pa: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਕਿਸਾਨ ਵੀਰੋ! ਮੈਂ ਤੁਹਾਡਾ ਖੇਤੀ ਮਿੱਤਰ ਬੋਲ ਰਿਹਾ ਹਾਂ। ਇਹ ਤੁਹਾਡੀ ਗੰਭੀਰ ਅਵਾਜ਼ ਹੈ।',
      or: 'ନମସ୍କାର କୃଷକ ଭାଇ! ମୁଁ ଆପଣଙ୍କ କୃଷି ମିତ୍ର କହୁଛି। ଏହା ଆପଣଙ୍କ ଗମ୍ଭୀର ସ୍ୱର।',
      as: 'নমস্কাৰ কৃষক ভাই! মই আপোনাৰ কৃষি মিত্ৰই কৈছোঁ। এইটো আপোনাৰ গম্ভীৰ মাত।',
      en: 'Hello farmer friend! This is your agricultural advisor speaking in a deep, authoritative baritone voice.',
    };
    const testText = sampleSentences[language] || sampleSentences.en;
    speechService.speakScript(testText, language, 'all', speechRate, sampleSentences.en);
  };

  const handleCustomModelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileList: File[] = Array.from(files);
    const json = fileList.find((f) => f.name.endsWith('.json')) || null;
    const bin = fileList.find((f) => f.name.endsWith('.bin'));

    if (bin) {
      setIsUploadingModel(true);
      setModelUploadMessage('Installing weights.bin to /public/model/weights.bin and loading into TensorFlow.js...');
      try {
        await inferenceEngine.loadCustomModelFiles(json, bin);
        refreshModelStatus();
        setModelUploadMessage('Trained weights.bin installed to /public/model/weights.bin and verified!');
      } catch (err) {
        console.error('Custom model load error:', err);
        setModelUploadMessage('Failed to load weights.bin. Ensure it matches the 60-class MobileNetV2 model.json.');
      } finally {
        setIsUploadingModel(false);
      }
    } else {
      setModelUploadMessage('Please select your weights.bin file (model.json is already installed).');
    }
  };

  const handleResetModel = async () => {
    setIsUploadingModel(true);
    try {
      await inferenceEngine.resetToDefaultModel();
      refreshModelStatus();
      setModelUploadMessage('Reset to default model configuration.');
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploadingModel(false);
    }
  };

  const handleClearHistory = () => {
    clearAllScanHistory();
    refreshHistory();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-black text-slate-900">{t.settings.title}</h1>
        <p className="text-sm text-slate-500 mt-1">{t.settings.subtitle}</p>
      </div>

      {/* Localization & Region */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
          <Globe className="w-4 h-4 text-emerald-600" />
          <span>Language & Regional Preferences</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Language Selector */}
          <div
            onClick={onOpenLanguageModal}
            className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-emerald-400 cursor-pointer transition-all flex items-center justify-between"
          >
            <div>
              <span className="text-xs text-slate-400 font-semibold block">{t.settings.language}</span>
              <span className="text-base font-bold text-slate-900 mt-0.5 block">
                {currentLang.nativeName} ({currentLang.name})
              </span>
              <span className="text-[11px] text-emerald-700">12 Languages Available Offline</span>
            </div>
            <button className="text-xs font-semibold text-emerald-700 bg-emerald-100/80 px-3 py-1.5 rounded-lg">
              Change
            </button>
          </div>

          {/* State Selector */}
          <div
            onClick={onOpenStateModal}
            className="p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-amber-400 cursor-pointer transition-all flex items-center justify-between"
          >
            <div>
              <span className="text-xs text-slate-400 font-semibold block">{t.settings.state}</span>
              <span className="text-base font-bold text-slate-900 mt-0.5 block truncate max-w-[180px]">
                {selectedState.name}
              </span>
              <span className="text-[11px] text-amber-700">{selectedState.agroClimaticZone}</span>
            </div>
            <button className="text-xs font-semibold text-amber-800 bg-amber-100/80 px-3 py-1.5 rounded-lg">
              Change
            </button>
          </div>
        </div>
      </div>

      {/* Farmer Voice & Audio Speech Settings */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                {language === 'gu'
                  ? 'કિસાન અવાજ અને બોલવાની વ્યવસ્થા'
                  : language === 'hi'
                  ? 'किसान आवाज एवं ऑडियो सेटिंग्स'
                  : 'Farmer Voice & Audio Settings'}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'gu'
                  ? 'ખેડૂતો માટે સ્પષ્ટ, કુદરતી અને ગંભીર અવાજમાં પાક તપાસ સાંભળો'
                  : language === 'hi'
                  ? 'ग्रामीण किसान भाइयों के लिए गहरा और स्पष्ट प्राकृतिक स्वर'
                  : 'Calibrated mature male advisor voice for illiterate and elderly farmers'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleTestVoice}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              isPlayingTestVoice
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
            }`}
          >
            {isPlayingTestVoice ? <Square className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>
              {isPlayingTestVoice
                ? (language === 'gu' ? 'અવાજ બંધ કરો' : 'Stop Test')
                : (language === 'gu' ? '🎙️ અવાજ તપાસો (Test Voice)' : '🎙️ Test Audio Voice')}
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Voice Tone: Deep vs Standard */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
            <span className="text-xs text-slate-500 font-semibold block">
              {language === 'gu' ? 'અવાજનો પ્રકાર (Voice Tone)' : 'Voice Tone (ગંભીર vs સામાન્ય)'}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handlePitchChange(0.76)}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  speechPitch <= 0.88
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>🎙️</span>
                <span>{language === 'gu' ? 'ગંભીર અવાજ (Deep)' : 'Deep Baritone'}</span>
              </button>
              <button
                type="button"
                onClick={() => handlePitchChange(0.95)}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  speechPitch > 0.88
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>{language === 'gu' ? 'સામાન્ય (Standard)' : 'Standard'}</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              {language === 'gu'
                ? 'ગંભીર અવાજ શાંત, અનુભવી કૃષિ સલાહકાર જેવો અનુભવ કરાવે છે.'
                : 'Deep baritone produces a mature, grounded agricultural specialist timbre.'}
            </p>
          </div>

          {/* Voice Speed */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
            <span className="text-xs text-slate-500 font-semibold block">
              {language === 'gu' ? 'બોલવાની ઝડપ (Speech Pace)' : 'Speech Pace / Speed'}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleRateChange(0.8)}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                  speechRate < 0.9
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {language === 'gu' ? 'ધીમી / સ્પષ્ટ (0.8x)' : 'Slow & Clear (0.8x)'}
              </button>
              <button
                type="button"
                onClick={() => handleRateChange(1.0)}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                  speechRate >= 0.9
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {language === 'gu' ? 'સામાન્ય ગતિ (1.0x)' : 'Normal Pace (1.0x)'}
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              {language === 'gu'
                ? 'ધીમી ગતિ દવાઓના માપ અને પગલાં યાદ રાખવામાં સરળ બનાવે છે.'
                : 'Measured pace ensures complex chemical dosage ratios are understood.'}
            </p>
          </div>
        </div>

        {/* Auto-read Toggle */}
        <label className="flex items-center justify-between p-3.5 rounded-2xl border border-emerald-100 bg-emerald-50/50 cursor-pointer">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-slate-900 block">
              {language === 'gu' ? 'તપાસ પૂર્ણ થતાં આપોઆપ બોલો' : 'Auto-Read Diagnosis Upon Scan'}
            </span>
            <span className="text-[11px] text-slate-500 block">
              {language === 'gu'
                ? 'કોઈપણ ફોટો તપાસ્યા પછી આપમેળે પરિણામ ગુજરાતીમાં બોલી સંભળાવશે.'
                : 'Automatically plays voiceover instructions as soon as leaf analysis completes.'}
            </span>
          </div>
          <input
            type="checkbox"
            checked={autoSpeakEnabled}
            onChange={(e) => handleToggleAutoSpeak(e.target.checked)}
            className="w-5 h-5 accent-emerald-600 rounded cursor-pointer shrink-0 ml-3"
          />
        </label>
      </div>

      {/* Edge AI Engine Details */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-600" />
            <span>On-Device AI Engine Status</span>
          </h3>
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full border flex items-center gap-1 ${
              modelStatus.hasTrainedWeights
                ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                : 'text-amber-800 bg-amber-50 border-amber-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>
              {modelStatus.hasTrainedWeights
                ? `Trained Weights Active (${modelStatus.weightsSource})`
                : 'Trained Offline Weights Not Installed'}
            </span>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 block text-[10px]">Architecture</span>
            <span className="font-bold text-slate-800">{modelStatus.architecture}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 block text-[10px]">TF.js Backend</span>
            <span className="font-bold text-emerald-700 uppercase font-mono">{modelStatus.backend}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 block text-[10px]">Input Tensor</span>
            <span className="font-bold text-slate-800">[1, 224, 224, 3]</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-slate-400 block text-[10px]">Pathology Classes</span>
            <span className="font-bold text-slate-800">{modelStatus.totalClasses} Classes</span>
          </div>
        </div>

        {/* Honest Model Weights & Pipeline Status */}
        <div
          className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs ${
            modelStatus.hasTrainedWeights
              ? 'bg-emerald-50/70 border-emerald-100 text-emerald-950'
              : 'bg-amber-50 border-amber-200 text-amber-950'
          }`}
        >
          <div className="flex items-center gap-2 font-semibold">
            <span
              className={`w-2 h-2 rounded-full ${
                modelStatus.hasTrainedWeights ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
            />
            <span>
              {modelStatus.hasTrainedWeights
                ? `Verified TF.js LayersModel Loaded (${modelStatus.weightsSource})`
                : modelStatus.missingWeightsReason ||
                  'No public/model/model.json + .bin weights found. Online diagnosis uses Gemini API; offline inference requires uploading trained TF.js weights below.'}
            </span>
          </div>
          <span className="text-[11px] bg-white px-2 py-0.5 rounded border border-slate-200 shrink-0 font-mono">
            Stage 1 Quality Pre-Check: Active
          </span>
        </div>

        {/* Custom Model Upload for CBSE Judges / Evaluators */}
        <div className="pt-2 border-t border-slate-100 space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-xs text-slate-800">Teacher & Judge Custom Model Inspector</h4>
              <p className="text-[11px] text-slate-500">
                Supply external <code>model.json</code> and <code>weights.bin</code> files to evaluate custom weights.
              </p>
            </div>
            <button
              onClick={handleResetModel}
              disabled={isUploadingModel}
              className="text-[11px] font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              Reset Default Model
            </button>
          </div>

          <label className="flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-slate-300 hover:border-emerald-500 cursor-pointer bg-slate-50 text-xs font-semibold text-slate-700 transition-colors">
            <Upload className="w-4 h-4 text-emerald-600" />
            <span>Select weights.bin (model.json is already installed)</span>
            <input
              type="file"
              multiple
              accept=".json,.bin"
              className="hidden"
              onChange={handleCustomModelUpload}
            />
          </label>

          {modelUploadMessage && (
            <p className="text-xs text-emerald-700 font-medium">{modelUploadMessage}</p>
          )}
        </div>
      </div>

      {/* Storage & Privacy Controls */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
          <HardDrive className="w-4 h-4 text-slate-700" />
          <span>Local Storage & Cache</span>
        </h3>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div>
            <p className="font-semibold text-slate-800">Diagnostic History Records</p>
            <p className="text-slate-500">{history.length} scans stored exclusively in browser localStorage.</p>
          </div>
          <button
            onClick={handleClearHistory}
            className="px-4 py-2 rounded-xl text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Local History</span>
          </button>
        </div>
      </div>

      {/* System Error Logs & Diagnostic Recorder (Persistent Offline & Online Error Capture) */}
      <ErrorLogsManager />

      {/* Mobile Device & Offline Installation */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-emerald-600" />
            <span>Mobile App & Offline Field Installation</span>
          </h3>
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full border flex items-center gap-1 ${
              isStandalone
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-slate-100 text-slate-600 border-slate-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isStandalone ? 'Installed as App' : 'Browser Web App'}</span>
          </span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          AgriVision is designed to run seamlessly on Android, iOS, tablets, and desktop computers. You can install it directly onto your home screen for an instant fullscreen mobile app experience that works even with zero cellular connectivity in remote farm fields.
        </p>

        {!isStandalone && (
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden shadow-xs border border-emerald-500/20 bg-emerald-950 shrink-0">
              <img
                src="/icon.svg"
                alt="AgriVision App Icon"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h4 className="font-bold text-emerald-900 text-sm">Progressive Web Application (PWA)</h4>
              <p className="text-xs text-emerald-700 mt-0.5">
                Runs reliably in modern mobile and desktop browsers with offline neural network caching.
              </p>
            </div>
          </div>
        )}

        {isIOS && !isStandalone && (
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <Share2 className="w-4 h-4 text-sky-600" />
              <span>How to Install on iPhone / iPad (iOS Safari):</span>
            </div>
            <ol className="text-xs text-slate-600 list-decimal list-inside space-y-1 pl-1">
              <li>Tap the <strong>Share</strong> button (box with an upward arrow) at the bottom of Safari.</li>
              <li>Scroll down and tap <strong>Add to Home Screen</strong>.</li>
              <li>Tap <strong>Add</strong> in the top-right corner to launch AgriVision directly from your home screen.</li>
            </ol>
          </div>
        )}
      </div>

      {/* Exhibition & Project Credits */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-3 shadow-md">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
          <Award className="w-4 h-4" />
          <span>AgriVision • Class 11 CBSE Science Exhibition</span>
        </div>
        <h4 className="text-lg font-bold">Edge AI Computer Vision for Food Security</h4>
        <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
          Designed and engineered by a Class 11 student for the CBSE Science Exhibition. Demonstrates practical application of depthwise separable convolutional neural networks, transfer learning, and offline Progressive Web Apps to solve real agricultural extension deficits across rural India.
        </p>
      </div>
    </div>
  );
};
