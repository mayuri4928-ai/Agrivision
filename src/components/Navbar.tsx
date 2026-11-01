import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SUPPORTED_LANGUAGES } from '../locales';
import { SAMPLE_LEAVES } from '../data/sampleLeaves';
import {
  Sprout,
  ScanLine,
  History,
  FlaskConical,
  HelpCircle,
  Settings,
  ShieldCheck,
  Globe,
  MapPin,
  Wifi,
  WifiOff,
  Menu,
  X,
  AlertTriangle,
  BookOpen,
  Layers,
  Eye,
} from 'lucide-react';

interface NavbarProps {
  onOpenStateModal: () => void;
  onOpenLanguageModal: () => void;
  onOpenDisclaimerModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenStateModal,
  onOpenLanguageModal,
  onOpenDisclaimerModal,
}) => {
  const {
    t,
    language,
    selectedState,
    isOnline,
    activeTab,
    setActiveTab,
    modelStatus,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentLangMeta = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  const navItems = [
    { id: 'home', label: t.nav.home, icon: Sprout },
    { id: 'analyze', label: t.nav.analyze, icon: ScanLine, highlight: true },
    { id: 'tests', label: t.nav.tests, icon: FlaskConical, badge: `${SAMPLE_LEAVES.length}` },
    { id: 'crops', label: t.nav.crops, icon: BookOpen },
    { id: 'dashboard', label: t.nav.dashboard, icon: Layers },
    { id: 'history', label: t.nav.history, icon: History },
    { id: 'science', label: t.nav.science, icon: BookOpen },
    { id: 'howItWorks', label: t.nav.howItWorks, icon: HelpCircle },
    { id: 'settings', label: t.nav.settings, icon: Settings },
  ];

  const [showIosInstallModal, setShowIosInstallModal] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-2xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-2 sm:gap-3 min-w-0">
            {/* Logo and Brand */}
            <div
              className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0 min-w-0"
              onClick={() => {
                setActiveTab('home');
                setMobileMenuOpen(false);
              }}
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden shadow-xs group-hover:scale-105 transition-transform shrink-0 border border-emerald-600/20 bg-emerald-950 flex items-center justify-center">
                <img
                  src="/icon.svg"
                  alt="AgriVision AI Logo"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 truncate">
                    AgriVision
                  </span>
                  <span className="hidden sm:inline-block text-[10px] font-mono font-semibold uppercase tracking-wider text-emerald-700 border-l border-slate-200 pl-2 shrink-0">
                    MobileNetV2
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-slate-500 font-medium">
                  <span className="inline-flex items-center gap-1 min-w-0">
                    <span
                      className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                        modelStatus.isReady ? 'bg-emerald-600' : 'bg-amber-500'
                      }`}
                    />
                    <span className="truncate max-w-[85px] xs:max-w-[110px] sm:max-w-[140px]">
                      {modelStatus.isReady ? t.common.aiReadyOffline : t.common.loading}
                    </span>
                  </span>
                  <span className="text-slate-300 shrink-0">/</span>
                  <span className="inline-flex items-center gap-1 shrink-0 font-mono text-[10px]">
                    {isOnline ? (
                      <Wifi className="w-3 h-3 text-emerald-600 shrink-0" />
                    ) : (
                      <WifiOff className="w-3 h-3 text-amber-600 shrink-0" />
                    )}
                    <span>{isOnline ? t.common.online : t.common.offline}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Medium screens (768px - 1279px) Quick Analyze CTA */}
            <div className="hidden md:flex xl:hidden items-center shrink-0">
              <button
                onClick={() => setActiveTab('analyze')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer ${
                  activeTab === 'analyze'
                    ? 'bg-emerald-800 text-white'
                    : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                }`}
                title={t.nav.analyze}
              >
                <ScanLine className="w-4 h-4 shrink-0" />
                <span className="truncate max-w-[110px]">{t.nav.analyze}</span>
              </button>
            </div>

            {/* Desktop Full Navigation links (2xl: all 9 items) */}
            <nav className="hidden 2xl:flex items-center gap-1 p-1 rounded-xl bg-slate-100/80 border border-slate-200/70 shrink min-w-0 overflow-hidden">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    title={item.label}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-white text-emerald-900 shadow-2xs border border-slate-200/80'
                        : item.highlight
                        ? 'text-emerald-800 hover:bg-white/70'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive || item.highlight ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span className="truncate max-w-[105px]">{item.label}</span>
                    {(item as any).badge && (
                      <span className="font-mono text-[10px] font-bold text-emerald-700 ml-0.5 shrink-0">
                        {(item as any).badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Large Screens Compact Nav (xl: 5 core tabs) */}
            <nav className="hidden xl:flex 2xl:hidden items-center gap-1 p-1 rounded-xl bg-slate-100/80 border border-slate-200/70 shrink min-w-0 overflow-hidden">
              {[
                { id: 'home', label: t.nav.home, icon: Sprout },
                { id: 'analyze', label: t.nav.analyze, icon: ScanLine, highlight: true },
                { id: 'dashboard', label: t.nav.dashboard, icon: Layers },
                { id: 'tests', label: t.nav.tests, icon: FlaskConical, badge: `${SAMPLE_LEAVES.length}` },
                { id: 'crops', label: t.nav.crops, icon: BookOpen },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    title={item.label}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-white text-emerald-900 shadow-2xs border border-slate-200/80'
                        : item.highlight
                        ? 'text-emerald-800 hover:bg-white/70'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive || item.highlight ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span className="truncate max-w-[95px]">{item.label}</span>
                    {(item as any).badge && (
                      <span className="font-mono text-[10px] font-bold text-emerald-700 ml-0.5 shrink-0">
                        {(item as any).badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Top Right Actions: Language, State, Disclaimer, Menu */}
            <div className="flex items-center gap-1.5 shrink-0 flex-nowrap">
              {/* Language Selector Button */}
              <button
                onClick={onOpenLanguageModal}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-all min-h-[36px] shrink-0 cursor-pointer"
                title={`${t.common.selectLanguage} (${currentLangMeta.nativeName})`}
              >
                <Globe className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="font-mono font-bold text-xs">{currentLangMeta.code.toUpperCase()}</span>
              </button>

              {/* State Selector Button */}
              <button
                onClick={onOpenStateModal}
                className="hidden sm:flex px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700 text-xs font-semibold items-center gap-1.5 shadow-2xs transition-all min-h-[36px] shrink-0 cursor-pointer"
                title={`${t.common.selectState} (${selectedState.name})`}
              >
                <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span className="truncate max-w-[75px] md:max-w-[95px]">{selectedState.name}</span>
              </button>

              {/* Disclaimer quick toggle */}
              <button
                onClick={onOpenDisclaimerModal}
                className="p-2 rounded-lg text-amber-700 bg-amber-50/80 hover:bg-amber-100 border border-amber-200/80 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center shrink-0 cursor-pointer"
                title="Safety Disclaimer & Medical Crop Notice"
              >
                <AlertTriangle className="w-4 h-4 text-amber-600" />
              </button>

              {/* Menu toggle button for sub-xl viewports */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 min-w-[36px] min-h-[36px] flex items-center justify-center transition-colors shrink-0 border border-slate-200 cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Slide-down Menu with Full Viewport Resilience */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl max-h-[calc(100vh-4.5rem)] overflow-y-auto">
            {/* Quick State & Language bar on mobile */}
            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100">
              <button
                onClick={() => {
                  onOpenStateModal();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-1.5 text-xs text-slate-800 font-medium bg-slate-50 hover:bg-slate-100 p-2 rounded-xl border border-slate-200 min-h-[44px]"
              >
                <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                <div className="text-left truncate">
                  <span className="text-[10px] text-slate-500 block leading-tight">{t.common.selectState}</span>
                  <span className="font-semibold truncate block">{selectedState.name}</span>
                </div>
              </button>

              <button
                onClick={() => {
                  onOpenLanguageModal();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-1.5 text-xs text-slate-800 font-medium bg-slate-50 hover:bg-slate-100 p-2 rounded-xl border border-slate-200 min-h-[44px]"
              >
                <Globe className="w-4 h-4 text-emerald-600 shrink-0" />
                <div className="text-left truncate">
                  <span className="text-[10px] text-slate-500 block leading-tight">{t.common.selectLanguage}</span>
                  <span className="font-semibold truncate block">{currentLangMeta.nativeName}</span>
                </div>
              </button>
            </div>

            {/* Navigation items */}
            <div className="space-y-1 pt-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id as any);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors min-h-[44px] ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-800 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {(item as any).badge && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        {(item as any).badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Mobile Footer Links */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <button
                onClick={() => {
                  setActiveTab('privacy');
                  setMobileMenuOpen(false);
                }}
                className="hover:text-slate-900 flex items-center gap-1 py-1"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{t.nav.privacy}</span>
              </button>
              <button
                onClick={() => {
                  onOpenDisclaimerModal();
                  setMobileMenuOpen(false);
                }}
                className="text-amber-600 font-medium flex items-center gap-1 py-1"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{t.common.offline}</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile & Tablet Bottom Quick Navigation Bar (Optimized for field use on phones & tablets) */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 pt-1 shadow-lg pb-safe"
        style={{ paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom, 0px))' }}
      >
        <div className="grid grid-cols-5 items-end justify-items-center max-w-lg mx-auto">
          {/* 1. Home */}
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center w-full py-1.5 rounded-xl transition-colors min-h-[44px] ${
              activeTab === 'home' ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sprout className="w-5 h-5" />
            <span className="text-[10px] mt-0.5 leading-tight truncate max-w-[60px] text-center">{t.nav.home}</span>
          </button>

          {/* 2. Crop Directory */}
          <button
            onClick={() => setActiveTab('crops')}
            className={`flex flex-col items-center justify-center w-full py-1.5 rounded-xl transition-colors min-h-[44px] ${
              activeTab === 'crops' ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-[10px] mt-0.5 leading-tight truncate max-w-[60px] text-center">
              {t.nav.crops}
            </span>
          </button>

          {/* 3. Center Elevated Shutter Button */}
          <button
            onClick={() => setActiveTab('analyze')}
            className="flex flex-col items-center -mt-5 group"
            aria-label="Scan Plant Leaf"
          >
            <div className={`w-13 h-13 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 ring-4 ring-white ${
              activeTab === 'analyze'
                ? 'bg-gradient-to-tr from-emerald-600 to-green-500 text-white shadow-emerald-600/40'
                : 'bg-emerald-600 text-white shadow-emerald-600/30 group-hover:scale-105'
            }`}>
              <ScanLine className="w-6 h-6" />
            </div>
            <span className={`text-[10px] font-bold mt-0.5 truncate max-w-[68px] text-center ${
              activeTab === 'analyze' ? 'text-emerald-700' : 'text-slate-600'
            }`}>
              {t.nav.analyze}
            </span>
          </button>

          {/* 4. Dashboard */}
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center justify-center w-full py-1.5 rounded-xl transition-colors min-h-[44px] ${
              activeTab === 'dashboard' ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-5 h-5" />
            <span className="text-[10px] mt-0.5 leading-tight truncate max-w-[60px] text-center">
              {t.nav.dashboard}
            </span>
          </button>

          {/* 5. More / Menu Drawer */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`flex flex-col items-center justify-center w-full py-1.5 rounded-xl transition-colors min-h-[44px] ${
              mobileMenuOpen ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            <span className="text-[10px] mt-0.5 leading-tight truncate max-w-[60px] text-center">
              {t.nav.settings}
            </span>
          </button>
        </div>
      </div>
    </>
  );
};
