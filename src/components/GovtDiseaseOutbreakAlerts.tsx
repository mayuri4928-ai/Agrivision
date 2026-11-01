import React, { useState, useMemo } from 'react';
import { GovtEmergencyOutbreakAlert } from '../types/regionalAlerts';
import { DEFAULT_GOVT_EMERGENCY_ALERTS } from '../data/govtEmergencyAlertsData';
import { OFFICIAL_KISAN_HELPLINE } from '../data/indiaMapGeometry';
import { LanguageCode } from '../types';
import { speechService } from '../services/speechService';
import { useApp } from '../context/AppContext';
import { getLocalizedCropName } from '../data/localizedCropsAndDiseases';
import { getLocalizedOutbreakUI, getLocalizedGovtAlertText } from '../data/localizedOutbreakAndAlerts';
import {
  AlertTriangle,
  Radio,
  Volume2,
  VolumeX,
  PhoneCall,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Flame,
  Building2,
  Calendar,
  Layers,
  Sparkles,
  Info,
} from 'lucide-react';

interface GovtDiseaseOutbreakAlertsProps {
  selectedStateName?: string;
  language?: LanguageCode;
  className?: string;
  onNavigateToDisease?: (className: string) => void;
  compact?: boolean;
}

export const GovtDiseaseOutbreakAlerts: React.FC<GovtDiseaseOutbreakAlertsProps> = ({
  selectedStateName = 'Gujarat',
  language,
  className = '',
  onNavigateToDisease,
  compact = false,
}) => {
  const { language: contextLang, isOnline } = useApp();
  const currentLang: LanguageCode = language || contextLang || 'en';
  const ui = useMemo(() => getLocalizedOutbreakUI(currentLang), [currentLang]);

  const [activeTab, setActiveTab] = useState<'LOCAL_STATE' | 'ALL_INDIA'>('LOCAL_STATE');
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [activeSpeechAlertId, setActiveSpeechAlertId] = useState<string | null>(null);

  // Filter alerts for local state vs nationwide
  const stateAlerts = useMemo(() => {
    return DEFAULT_GOVT_EMERGENCY_ALERTS.filter(
      (a) =>
        a.stateName.toLowerCase() === selectedStateName.toLowerCase() ||
        a.stateName.toLowerCase().includes(selectedStateName.toLowerCase())
    );
  }, [selectedStateName]);

  const displayedAlerts = useMemo(() => {
    if (activeTab === 'LOCAL_STATE') {
      return stateAlerts.length > 0 ? stateAlerts : DEFAULT_GOVT_EMERGENCY_ALERTS;
    }
    return DEFAULT_GOVT_EMERGENCY_ALERTS;
  }, [activeTab, stateAlerts]);

  // Primary active alert to display in detail
  const activeAlert = useMemo(() => {
    if (selectedAlertId) {
      const found = displayedAlerts.find((a) => a.id === selectedAlertId);
      if (found) return found;
    }
    return displayedAlerts[0] || DEFAULT_GOVT_EMERGENCY_ALERTS[0];
  }, [selectedAlertId, displayedAlerts]);

  // Localized alert text (headline, directive, actions, supplies)
  const locAlert = useMemo(() => {
    return getLocalizedGovtAlertText(activeAlert, currentLang);
  }, [activeAlert, currentLang]);

  // Listen to speech player state
  React.useEffect(() => {
    const unsubscribe = speechService.subscribe((state) => {
      const active = state.isPlaying || state.isPaused;
      setIsPlayingAudio(active);
      if (!active) {
        setActiveSpeechAlertId(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Handle Voice Readout of the Government Directive
  const handleToggleVoiceReadout = (alert: GovtEmergencyOutbreakAlert) => {
    if (isPlayingAudio && activeSpeechAlertId === alert.id) {
      speechService.stop();
      setIsPlayingAudio(false);
      setActiveSpeechAlertId(null);
      return;
    }

    const localizedCrop = getLocalizedCropName(alert.crop, currentLang);
    const alertText = getLocalizedGovtAlertText(alert, currentLang);
    const englishFallback = `Official Disease Outbreak Directive from the Government of India and ${alert.issuingAuthority}. State: ${alert.stateName}. Affected Crop: ${alert.crop}. Pathology: ${alert.diseaseName}. Official Directive: ${alert.officialDirective}. Mandatory Farmer Actions: ${alert.mandatoryActions.join('. ')}. For emergency guidance, contact the free Kisan Call Centre at 1800-180-1551.`;

    // Formulate authoritative, respectful agricultural speech script
    let speechScript = '';
    if (currentLang === 'hi') {
      speechScript = `भारत सरकार और ${alert.issuingAuthority} द्वारा आपातकालीन फसल चेतावनी। राज्य: ${alert.stateName}। प्रभावित फसल: ${localizedCrop}। बीमारी: ${alertText.headline}। आधिकारिक निर्देश: ${alertText.officialDirective}। किसान भाइयों के लिए अनिवार्य उपाय: ${alertText.mandatoryActions.join('। ')}। निःशुल्क सरकारी किसान हेल्पलाइन नंबर 1800-180-1551 पर तुरंत संपर्क करें।`;
    } else if (currentLang === 'gu') {
      speechScript = `ભારત સરકાર અને ${alert.issuingAuthority} તરફથી કટોકટી રોગ ચેતવણી। રાજ્ય: ${alert.stateName}। અસરગ્રસ્ત પાક: ${localizedCrop}। રોગ: ${alertText.headline}। સરકારી આદેશ: ${alertText.officialDirective}। ખેડૂત મિત્રો માટે ફરજિયાત પગલાં: ${alertText.mandatoryActions.join('। ')}। વિનામૂલ્યે સરકારી કિસાન હેલ્પલાઇન 1800-180-1551 પર સંપર્ક કરો।`;
    } else if (currentLang !== 'en') {
      speechScript = `${alertText.headline}। ${localizedCrop}। ${alertText.officialDirective}। ${alertText.mandatoryActions.join('। ')}। 1800-180-1551।`;
    } else {
      speechScript = englishFallback;
    }

    setActiveSpeechAlertId(alert.id);
    setIsPlayingAudio(true);
    speechService.speakScript(speechScript, currentLang, 'all', 0.95, englishFallback);
  };

  const getUrgencyBadge = (level: string) => {
    switch (level) {
      case 'RED_ALERT':
        return {
          bg: 'bg-rose-600 text-white',
          border: 'border-rose-500',
          dot: 'bg-rose-500',
          label: ui.emergencyDirectiveBadge,
          bannerBg: 'from-rose-600 via-red-600 to-amber-700',
        };
      case 'ORANGE_ADVISORY':
        return {
          bg: 'bg-amber-600 text-white',
          border: 'border-amber-500',
          dot: 'bg-amber-500',
          label: ui.warningAdvisoryBadge,
          bannerBg: 'from-amber-600 via-orange-600 to-amber-800',
        };
      default:
        return {
          bg: 'bg-yellow-600 text-white',
          border: 'border-yellow-500',
          dot: 'bg-yellow-500',
          label: ui.epidemiologicalNoticeBadge,
          bannerBg: 'from-yellow-600 via-amber-600 to-emerald-800',
        };
    }
  };

  const urgency = getUrgencyBadge(activeAlert.urgencyLevel);

  return (
    <div
      className={`bg-white border-2 border-rose-300/80 rounded-3xl overflow-hidden shadow-md transition-all ${className}`}
    >
      {/* 1. Official Emergency Header Banner */}
      <div className={`p-4 sm:p-5 bg-gradient-to-r ${urgency.bannerBg} text-white relative`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/30 shadow-inner">
              <Radio className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase bg-white text-rose-800 shadow-xs">
                  {urgency.label}
                </span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-black/25 text-white/90 backdrop-blur-xs">
                  {activeAlert.bulletinId}
                </span>
                {!isOnline && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500 text-white shadow-xs">
                    {ui.offlineModeActiveBadge}
                  </span>
                )}
              </div>
              <h3 className="text-base sm:text-lg font-black text-white mt-1 leading-snug">
                {ui.liveEmergencyDirectivesTitle}
              </h3>
            </div>
          </div>

          {/* Scope Filters: Local State vs All India */}
          <div className="flex items-center gap-1.5 bg-black/25 p-1 rounded-2xl backdrop-blur-md self-start sm:self-auto border border-white/10">
            <button
              type="button"
              onClick={() => {
                setActiveTab('LOCAL_STATE');
                setSelectedAlertId(null);
              }}
              className={`px-3 py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === 'LOCAL_STATE'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              📍 {selectedStateName} ({stateAlerts.length})
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('ALL_INDIA');
                setSelectedAlertId(null);
              }}
              className={`px-3 py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === 'ALL_INDIA'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {ui.allIndiaOverview} ({DEFAULT_GOVT_EMERGENCY_ALERTS.length})
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Body: Active Government Directive */}
      <div className="p-5 sm:p-6 space-y-5">
        {/* Outbreak Headline & Issuing Authority */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-bold">
              <span className="flex items-center gap-1 text-slate-700">
                <Building2 className="w-3.5 h-3.5 text-rose-600" />
                <span>{activeAlert.issuingAuthority}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{ui.publishedPrefix} {activeAlert.issuingDate}</span>
              </span>
              <span>•</span>
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                {ui.validUntilPrefix} {activeAlert.validThrough}
              </span>
            </div>

            <h4 className="text-base sm:text-xl font-black text-slate-900 leading-snug">
              {locAlert.headline}
            </h4>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="font-extrabold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-xl border border-slate-200">
                🌱 {getLocalizedCropName(activeAlert.crop, currentLang)}: {activeAlert.diseaseName}
              </span>
              <span className="font-bold text-rose-800 bg-rose-50 px-2.5 py-1 rounded-xl border border-rose-200">
                📍 {ui.affectedDistrictsPrefix} {activeAlert.affectedDistricts.join(', ')} ({activeAlert.stateName})
              </span>
            </div>
          </div>

          {/* Action Buttons: Voice Readout & Helpline */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => handleToggleVoiceReadout(activeAlert)}
              className={`px-3.5 py-2 rounded-2xl font-black text-xs flex items-center gap-2 transition-all cursor-pointer shadow-xs ${
                isPlayingAudio && activeSpeechAlertId === activeAlert.id
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300'
              }`}
              title="Listen to official government advisory"
            >
              {isPlayingAudio && activeSpeechAlertId === activeAlert.id ? (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span>{ui.stopGovtAlert}</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-700" />
                  <span>{ui.listenToGovtAlert}</span>
                </>
              )}
            </button>

            <a
              href={`tel:${activeAlert.kisanCallCenterNumber.replace(/[^0-9]/g, '')}`}
              className="px-3.5 py-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span>{ui.kisanHelplineTitle}</span>
            </a>
          </div>
        </div>

        {/* Official Directive Text */}
        <div className="bg-rose-50/60 rounded-2xl p-4 border border-rose-200/80 text-xs sm:text-sm text-slate-800 leading-relaxed space-y-2">
          <div className="font-black text-rose-950 flex items-center gap-2 text-xs uppercase tracking-wider">
            <Flame className="w-4 h-4 text-rose-600" />
            <span>{ui.officialGovtDirectiveHeader}</span>
          </div>
          <p className="font-medium text-slate-800 leading-relaxed">{locAlert.officialDirective}</p>
        </div>

        {/* Mandatory Farmer Containment Actions */}
        <div className="space-y-2.5">
          <h5 className="text-xs font-black text-slate-900 flex items-center gap-2 uppercase tracking-wide">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{ui.mandatoryFieldActionsHeader}</span>
          </h5>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {locAlert.mandatoryActions.map((action, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs font-medium text-slate-800 flex items-start gap-2.5"
              >
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-black flex items-center justify-center shrink-0 text-[10px] mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-snug">{action}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Subsidized Government Supplies */}
        <div className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-black text-amber-900">{ui.subsidizedSuppliesHeader} </span>
            <span className="font-medium">{locAlert.subsidizedSupplies}</span>
          </div>
        </div>

        {/* Other Active Outbreaks in This Category */}
        {displayedAlerts.length > 1 && (
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <span className="text-xs font-black text-slate-500 block">
              {ui.otherActiveDirectivesHeader} ({displayedAlerts.length - 1}):
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {displayedAlerts.map((item) => {
                const isCurrent = item.id === activeAlert.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedAlertId(item.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isCurrent
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <span>{item.stateName}</span>
                    <span>•</span>
                    <span>{getLocalizedCropName(item.crop, currentLang)}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 3. Official Source Footer Verification */}
      <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>
            {ui.verifiedPortalNote}: <strong>{activeAlert.issuingPortalUrl}</strong>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-slate-400">{ui.offlineModeActiveBadge}</span>
          <a
            href={activeAlert.issuingPortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1"
          >
            <span>{ui.visitPortalLink}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default GovtDiseaseOutbreakAlerts;
