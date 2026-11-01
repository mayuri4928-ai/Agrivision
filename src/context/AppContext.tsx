import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { LanguageCode, IndianState, ScanRecord, UserPreferences, DiagnosisResult, ModelStatus } from '../types';
import { LocaleStrings } from '../locales/types';
import { getTranslations } from '../locales';
import { DEFAULT_STATE } from '../data/states';
import {
  getStoredPreferences,
  saveStoredPreferences,
  getScanHistory,
  getErrorRecords,
  clearAllErrorRecords,
  AppErrorRecord,
} from '../services/storage';
import { inferenceEngine } from '../services/model/inference';

export type ActiveTab = 'home' | 'analyze' | 'results' | 'history' | 'crops' | 'tests' | 'science' | 'howItWorks' | 'settings' | 'privacy' | 'dashboard';

interface AppContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: LocaleStrings;
  selectedState: IndianState;
  setSelectedState: (state: IndianState) => void;
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  isOnline: boolean;
  modelStatus: ModelStatus;
  refreshModelStatus: () => void;
  history: ScanRecord[];
  refreshHistory: () => void;
  errorRecords: AppErrorRecord[];
  refreshErrorRecords: () => void;
  clearErrorRecords: () => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  currentResult: DiagnosisResult | null;
  setCurrentResult: (res: DiagnosisResult | null) => void;
  currentImage: string | null;
  setCurrentImage: (img: string | null) => void;
  isInstallable: boolean;
  isStandalone: boolean;
  isIOS: boolean;
  installApp: () => Promise<void>;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<UserPreferences>(() => getStoredPreferences());
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [currentResult, setCurrentResult] = useState<DiagnosisResult | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [history, setHistory] = useState<ScanRecord[]>(() => getScanHistory());
  const [errorRecords, setErrorRecords] = useState<AppErrorRecord[]>(() => getErrorRecords());
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [modelStatus, setModelStatus] = useState<ModelStatus>(inferenceEngine.getStatus());
  const [deferredInstallPrompt, setDeferredInstallPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState<boolean>(false);
  const [isStandalone, setIsStandalone] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true
    );
  });
  const [isIOS, setIsIOS] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
  });

  // Translations corresponding to selected language
  const t = getTranslations(preferences.language);

  // Online / Offline tracking
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Listen to custom error recorded events
  useEffect(() => {
    const handleRecordedError = () => {
      setErrorRecords(getErrorRecords());
    };
    window.addEventListener('agrivision:error_recorded', handleRecordedError);
    return () => {
      window.removeEventListener('agrivision:error_recorded', handleRecordedError);
    };
  }, []);

  // PWA Install prompt listener
  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredInstallPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  // Pre-warm the offline AI model after initial UI paint to prevent network burst
  useEffect(() => {
    const timer = setTimeout(() => {
      inferenceEngine
        .initialize()
        .then((status) => setModelStatus(status))
        .catch((err) => console.error('Model init error:', err));
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const refreshModelStatus = useCallback(() => {
    setModelStatus(inferenceEngine.getStatus());
  }, []);

  const refreshHistory = useCallback(() => {
    setHistory(getScanHistory());
  }, []);

  const refreshErrorRecords = useCallback(() => {
    setErrorRecords(getErrorRecords());
  }, []);

  const clearErrorRecords = useCallback(() => {
    clearAllErrorRecords();
    setErrorRecords([]);
  }, []);

  const setLanguage = (newLang: LanguageCode) => {
    const updated = saveStoredPreferences({ language: newLang });
    setPreferences(updated);
  };

  const setSelectedState = (newState: IndianState) => {
    const updated = saveStoredPreferences({ selectedState: newState });
    setPreferences(updated);
  };

  const setTheme = (newTheme: 'light' | 'dark' | 'system') => {
    const updated = saveStoredPreferences({ theme: newTheme });
    setPreferences(updated);
  };

  const installApp = async () => {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    const { outcome } = await deferredInstallPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstallable(false);
      setDeferredInstallPrompt(null);
    }
  };

  return (
    <AppContext.Provider
      value={{
        language: preferences.language,
        setLanguage,
        t,
        selectedState: preferences.selectedState || DEFAULT_STATE,
        setSelectedState,
        theme: preferences.theme,
        setTheme,
        isOnline,
        modelStatus,
        refreshModelStatus,
        history,
        refreshHistory,
        errorRecords,
        refreshErrorRecords,
        clearErrorRecords,
        activeTab,
        setActiveTab,
        currentResult,
        setCurrentResult,
        currentImage,
        setCurrentImage,
        isInstallable,
        isStandalone,
        isIOS,
        installApp,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
