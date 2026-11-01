import React, { useState, Suspense, lazy } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { StateSelectorModal } from './components/StateSelectorModal';
import { LanguageSelectorModal } from './components/LanguageSelectorModal';
import { DisclaimerModal } from './components/DisclaimerModal';
import { CameraModal } from './components/CameraModal';

// Eagerly load HomePage for instant first paint; lazy-load secondary tabs to avoid request bursts
import { HomePage } from './components/pages/HomePage';

const AnalyzePage = lazy(() =>
  import('./components/pages/AnalyzePage').then((m) => ({ default: m.AnalyzePage }))
);
const ResultsPage = lazy(() =>
  import('./components/pages/ResultsPage').then((m) => ({ default: m.ResultsPage }))
);
const HistoryPage = lazy(() =>
  import('./components/pages/HistoryPage').then((m) => ({ default: m.HistoryPage }))
);
const SciencePage = lazy(() =>
  import('./components/pages/SciencePage').then((m) => ({ default: m.SciencePage }))
);
const HowItWorksPage = lazy(() =>
  import('./components/pages/HowItWorksPage').then((m) => ({ default: m.HowItWorksPage }))
);
const SettingsPage = lazy(() =>
  import('./components/pages/SettingsPage').then((m) => ({ default: m.SettingsPage }))
);
const PrivacyPage = lazy(() =>
  import('./components/pages/PrivacyPage').then((m) => ({ default: m.PrivacyPage }))
);
const CropEncyclopediaPage = lazy(() =>
  import('./components/pages/CropEncyclopediaPage').then((m) => ({ default: m.CropEncyclopediaPage }))
);
const TestLabPage = lazy(() =>
  import('./components/pages/TestLabPage').then((m) => ({ default: m.TestLabPage }))
);
const DashboardPage = lazy(() =>
  import('./components/pages/DashboardPage').then((m) => ({ default: m.DashboardPage }))
);

const AppContent: React.FC = () => {
  const { activeTab, setActiveTab, setCurrentImage } = useApp();

  // Modal visibility states
  const [isStateModalOpen, setIsStateModalOpen] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isDisclaimerModalOpen, setIsDisclaimerModalOpen] = useState(false);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);

  const handleCameraCapture = (dataUrl: string) => {
    setCurrentImage(dataUrl);
    setActiveTab('analyze');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F8F5] bg-botanical-grid font-sans text-slate-900 antialiased selection:bg-emerald-200 selection:text-emerald-950 w-full max-w-full overflow-x-hidden">
      {/* Top Navbar */}
      <Navbar
        onOpenStateModal={() => setIsStateModalOpen(true)}
        onOpenLanguageModal={() => setIsLanguageModalOpen(true)}
        onOpenDisclaimerModal={() => setIsDisclaimerModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3.5 sm:px-6 lg:px-8 pt-5 sm:pt-8 pb-28 lg:pb-14 min-w-0">
        <Suspense
          fallback={
            <div className="py-16 flex items-center justify-center text-emerald-800 font-semibold text-sm">
              Loading AgriVision module...
            </div>
          }
        >
          {activeTab === 'home' && (
            <HomePage
              onOpenStateModal={() => setIsStateModalOpen(true)}
            />
          )}
          {activeTab === 'analyze' && (
            <AnalyzePage onOpenCamera={() => setIsCameraModalOpen(true)} />
          )}
          {activeTab === 'results' && <ResultsPage />}
          {activeTab === 'crops' && <CropEncyclopediaPage />}
          {activeTab === 'tests' && <TestLabPage />}
          {activeTab === 'history' && <HistoryPage />}
          {activeTab === 'science' && <SciencePage />}
          {activeTab === 'howItWorks' && <HowItWorksPage />}
          {activeTab === 'settings' && (
            <SettingsPage
              onOpenStateModal={() => setIsStateModalOpen(true)}
              onOpenLanguageModal={() => setIsLanguageModalOpen(true)}
            />
          )}
          {activeTab === 'privacy' && <PrivacyPage />}
          {activeTab === 'dashboard' && (
            <DashboardPage onOpenStateModal={() => setIsStateModalOpen(true)} />
          )}
        </Suspense>
      </main>

      {/* Footer */}
      <Footer onOpenDisclaimerModal={() => setIsDisclaimerModalOpen(true)} />

      {/* Global Modals */}
      <StateSelectorModal
        isOpen={isStateModalOpen}
        onClose={() => setIsStateModalOpen(false)}
      />

      <LanguageSelectorModal
        isOpen={isLanguageModalOpen}
        onClose={() => setIsLanguageModalOpen(false)}
      />

      <DisclaimerModal
        isOpen={isDisclaimerModalOpen}
        onClose={() => setIsDisclaimerModalOpen(false)}
      />

      <CameraModal
        isOpen={isCameraModalOpen}
        onClose={() => setIsCameraModalOpen(false)}
        onCapture={handleCameraCapture}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
