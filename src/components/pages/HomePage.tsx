import React from 'react';
import { useApp } from '../../context/AppContext';
import { CROPS_LIST, TOTAL_CLASSES, TOTAL_CROPS } from '../../data/classes';
import { getLocalizedCropName } from '../../data/localizedCropsAndDiseases';
import { getLocalizedHome } from '../../data/localizedHomeData';
import {
  ScanLine,
  ShieldCheck,
  Cpu,
  Globe2,
  ArrowRight,
  FlaskConical,
  HelpCircle,
  MapPin,
  CheckCircle2,
  BookOpen,
  Sparkles,
  Zap,
} from 'lucide-react';

export const HomePage: React.FC<{
  onOpenStateModal: () => void;
}> = ({ onOpenStateModal }) => {
  const { t, setActiveTab, selectedState, modelStatus, language } = useApp();
  const homeLoc = getLocalizedHome(language);

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white p-6 sm:p-10 lg:p-14 shadow-xl border border-emerald-700/50">
        <div className="relative z-10 max-w-3xl space-y-6">
          {/* Top Badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onOpenStateModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-400/15 hover:bg-amber-400/25 border border-amber-300/30 text-amber-100 text-xs font-semibold transition-all cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span>
                {homeLoc.zoneLabel} <strong className="text-white">{selectedState.name}</strong> ({selectedState.type})
              </span>
              <span className="underline font-bold text-amber-300 ml-0.5">{homeLoc.change}</span>
            </button>
          </div>

          {/* Hero Title & Subtitle */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              {t.home.heroTitle}
              <span className="block text-xl sm:text-2xl lg:text-3xl font-bold text-emerald-300 mt-2">
                {t.home.heroSubtitle}
              </span>
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-emerald-100/90 leading-relaxed max-w-2xl">
              {t.home.heroDescription}
            </p>
          </div>

          {/* Primary CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('analyze')}
              className="px-7 py-4 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-950/40 flex items-center gap-2.5 active:scale-95 transition-all cursor-pointer"
            >
              <ScanLine className="w-5 h-5" />
              <span>{t.home.analyzeBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('tests')}
              className="px-5 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              <FlaskConical className="w-4 h-4 text-emerald-300" />
              <span>{homeLoc.testLabBtn}</span>
            </button>

            <button
              onClick={() => setActiveTab('crops')}
              className="px-5 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-emerald-300" />
              <span>{homeLoc.cropDirectoryBtn}</span>
            </button>

            <button
              onClick={() => setActiveTab('science')}
              className="px-4 py-3.5 rounded-2xl bg-emerald-950/50 hover:bg-emerald-950/80 border border-emerald-700/60 text-emerald-200 font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span>{t.home.scienceBtn}</span>
            </button>

            <button
              onClick={() => setActiveTab('howItWorks')}
              className="px-4 py-3.5 rounded-2xl bg-emerald-950/50 hover:bg-emerald-950/80 border border-emerald-700/60 text-emerald-200 font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-emerald-400" />
              <span>{t.home.howItWorksBtn}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3 Core Feature Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">{t.home.offlineCardTitle}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{t.home.offlineCardDesc}</p>
          </div>
          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{modelStatus.isReady ? homeLoc.modelStatusActive : homeLoc.modelStatusLoading}</span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">{homeLoc.privacyTitle}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{homeLoc.privacyDesc}</p>
          </div>
          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-teal-700">
            <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
            <span>{homeLoc.privacySub}</span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">{homeLoc.languagesTitle}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{homeLoc.languagesDesc}</p>
          </div>
          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-amber-800">
            <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{homeLoc.helplineSub}</span>
          </div>
        </div>
      </section>

      {/* Automated Disease Testing Lab Banner */}
      <section className="rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white p-6 sm:p-8 border border-emerald-800/50 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            <Zap className="w-3.5 h-3.5" />
            <span>{homeLoc.testLabBannerBadge}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">{homeLoc.testLabBannerTitle}</h2>
          <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">{homeLoc.testLabBannerDesc}</p>
        </div>

        <button
          onClick={() => setActiveTab('tests')}
          className="px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs sm:text-sm shrink-0 shadow-md transition-all cursor-pointer flex items-center gap-2"
        >
          <FlaskConical className="w-4 h-4" />
          <span>{homeLoc.testLabBannerBtn}</span>
        </button>
      </section>

      {/* Supported Crops Section */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <span className="inline-block text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full mb-2">
              {TOTAL_CROPS} Crops • {TOTAL_CLASSES} Classes
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900">{t.home.cropsTitle}</h2>
            <p className="text-sm text-slate-500 mt-1">{t.home.cropsSubtitle}</p>
          </div>

          <button
            onClick={() => setActiveTab('crops')}
            className="px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>{homeLoc.exploreDirectory}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
          {CROPS_LIST.map((crop) => (
            <div
              key={crop.id}
              onClick={() => setActiveTab('crops')}
              className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-emerald-500 hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="text-2xl mb-2">{crop.icon}</div>
                <h4 className="font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors truncate">
                  {getLocalizedCropName(crop.id, language)}
                </h4>
                <p className="text-[11px] italic text-slate-400 truncate">{crop.scientific}</p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] font-semibold text-emerald-700">
                {crop.totalClasses} {homeLoc.conditionsSuffix}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CBSE Science Exhibition Banner */}
      <section className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
        <div className="space-y-1.5 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>{homeLoc.cbseBadge}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">{homeLoc.cbseTitle}</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">{homeLoc.cbseDesc}</p>
        </div>

        <button
          onClick={() => setActiveTab('science')}
          className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs sm:text-sm shrink-0 transition-colors shadow-md cursor-pointer flex items-center gap-2"
        >
          <span>{homeLoc.cbseReportBtn}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};
