import { LanguageCode, IndianState, ScanRecord, UserPreferences } from '../types';
import { DEFAULT_STATE, STATES_MAP } from '../data/states';

const STORAGE_KEYS = {
  PREFERENCES: 'agrivision_user_preferences',
  HISTORY: 'agrivision_diagnosis_history',
  ERRORS: 'agrivision_error_logs_v1',
};

export interface AppErrorRecord {
  id: string;
  timestamp: number;
  category: 'VISION_MODEL' | 'DIAGNOSIS' | 'NETWORK' | 'SPEECH' | 'STORAGE' | 'CAMERA' | 'SYSTEM';
  message: string;
  details?: string;
  stack?: string;
  context?: Record<string, any>;
  url?: string;
  resolved?: boolean;
}

const DEFAULT_PREFERENCES: UserPreferences = {
  language: 'en',
  selectedState: DEFAULT_STATE,
  theme: 'light',
  isOfflineReady: true,
  hasCompletedOnboarding: true,
  speechPitch: 1.0, // Natural human voice pitch
  speechRate: 1.0, // Fluent conversational speech cadence
};

export function getStoredPreferences(): UserPreferences {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
    if (!raw) return DEFAULT_PREFERENCES;
    const parsed = JSON.parse(raw);
    // Re-link state object if needed
    const matchedState = parsed.selectedState?.name ? STATES_MAP.get(parsed.selectedState.name) || DEFAULT_STATE : DEFAULT_STATE;
    return {
      ...DEFAULT_PREFERENCES,
      ...parsed,
      selectedState: matchedState,
    };
  } catch (e) {
    console.warn('Failed to parse stored preferences, using defaults:', e);
    return DEFAULT_PREFERENCES;
  }
}

export function saveStoredPreferences(prefs: Partial<UserPreferences>): UserPreferences {
  try {
    const current = getStoredPreferences();
    const updated = { ...current, ...prefs };
    localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.warn('Failed to save preferences to localStorage:', e);
    return { ...DEFAULT_PREFERENCES, ...prefs };
  }
}

export function getScanHistory(): ScanRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (!raw) return [];
    const list: ScanRecord[] = JSON.parse(raw);
    return Array.isArray(list) ? list : [];
  } catch (e) {
    console.warn('Failed to load diagnosis history:', e);
    return [];
  }
}

export function saveScanRecord(recordData: Omit<ScanRecord, 'id' | 'timestamp'>): ScanRecord {
  const history = getScanHistory();
  const newRecord: ScanRecord = {
    ...recordData,
    id: 'scan-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
    timestamp: Date.now(),
  };

  // Keep maximum 50 records in storage to avoid quota limits
  const updatedHistory = [newRecord, ...history].slice(0, 50);

  try {
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updatedHistory));
  } catch (e) {
    console.warn('Failed to save scan record to localStorage (storage quota):', e);
  }

  return newRecord;
}

export function deleteScanRecord(id: string): void {
  const history = getScanHistory();
  const updated = history.filter((item) => item.id !== id);
  try {
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
  } catch (e) {
    console.warn('Failed to update scan history after deletion:', e);
  }
}

export function clearAllScanHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
  } catch (e) {
    console.warn('Failed to clear scan history:', e);
  }
}

export function getHistoryAnalytics() {
  const history = getScanHistory();
  if (history.length === 0) {
    return {
      total: 0,
      healthyCount: 0,
      diseasedCount: 0,
      mostScannedCrop: 'None yet',
      frequentDisease: 'None yet',
    };
  }

  const cropCounts: Record<string, number> = {};
  const diseaseCounts: Record<string, number> = {};
  let healthyCount = 0;

  for (const item of history) {
    cropCounts[item.crop] = (cropCounts[item.crop] || 0) + 1;
    if (item.isHealthy) {
      healthyCount++;
    } else {
      diseaseCounts[item.disease] = (diseaseCounts[item.disease] || 0) + 1;
    }
  }

  const mostScannedCrop = Object.entries(cropCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None';
  const frequentDisease = Object.entries(diseaseCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || (healthyCount > 0 ? 'Healthy' : 'None');

  return {
    total: history.length,
    healthyCount,
    diseasedCount: history.length - healthyCount,
    mostScannedCrop,
    frequentDisease,
  };
}

export function getErrorRecords(): AppErrorRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ERRORS);
    if (!raw) return [];
    const list: AppErrorRecord[] = JSON.parse(raw);
    if (!Array.isArray(list)) return [];
    // Filter out benign interrupted speech events, webgl fallback notices, and offline transitions
    return list.filter((item) => {
      const msg = (item.message || '').toLowerCase();
      if (item.category === 'SPEECH' && (msg.includes('interrupted') || msg.includes('canceled'))) return false;
      if (msg.includes('webgl') || msg.includes('failed to fetch') || msg.includes('aborted') || msg.includes('websocket')) return false;
      return true;
    });
  } catch (e) {
    console.warn('Failed to load error logs from localStorage:', e);
    return [];
  }
}

export function saveErrorRecord(
  errorData: Omit<AppErrorRecord, 'id' | 'timestamp'> & { id?: string; timestamp?: number }
): AppErrorRecord {
  const msgLower = (errorData.message || '').toLowerCase();
  // Discard benign speech interruption or cancellation, webgl notices, or offline edge transitions
  if (
    (errorData.category === 'SPEECH' && (msgLower.includes('interrupted') || msgLower.includes('canceled'))) ||
    msgLower.includes('webgl') ||
    msgLower.includes('failed to fetch') ||
    msgLower.includes('aborted') ||
    msgLower.includes('websocket')
  ) {
    return {
      id: 'benign-log-' + Date.now(),
      timestamp: Date.now(),
      category: errorData.category || 'SYSTEM',
      message: errorData.message,
    };
  }

  const currentLogs = getErrorRecords();
  const newRecord: AppErrorRecord = {
    id: errorData.id || 'err-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
    timestamp: errorData.timestamp || Date.now(),
    category: errorData.category || 'SYSTEM',
    message: errorData.message || 'Unknown application error',
    details: errorData.details,
    stack: errorData.stack,
    context: errorData.context,
    url: errorData.url || (typeof window !== 'undefined' ? window.location.href : undefined),
    resolved: errorData.resolved ?? false,
  };

  // Keep maximum 100 error records in local storage to prevent quota overflow
  const updatedLogs = [newRecord, ...currentLogs].slice(0, 100);

  try {
    localStorage.setItem(STORAGE_KEYS.ERRORS, JSON.stringify(updatedLogs));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('agrivision:error_recorded', { detail: newRecord }));
    }
  } catch (e) {
    console.warn('Failed to persist error record to localStorage:', e);
  }

  // Also log to console for debugging
  console.error(`[AgriVision Error Saved] [${newRecord.category}] ${newRecord.message}`, newRecord.context || '');

  // Asynchronously attempt to sync to backend error log if online
  if (typeof window !== 'undefined' && navigator.onLine) {
    try {
      fetch('/api/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecord),
      }).catch(() => {});
    } catch {
      // Ignore background sync errors
    }
  }

  return newRecord;
}

export function deleteErrorRecord(id: string): void {
  const currentLogs = getErrorRecords();
  const updated = currentLogs.filter((item) => item.id !== id);
  try {
    localStorage.setItem(STORAGE_KEYS.ERRORS, JSON.stringify(updated));
  } catch (e) {
    console.warn('Failed to update error logs after deletion:', e);
  }
}

export function clearAllErrorRecords(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.ERRORS);
  } catch (e) {
    console.warn('Failed to clear error logs:', e);
  }
}

export function exportErrorRecordsAsJson(): string {
  const records = getErrorRecords();
  return JSON.stringify(records, null, 2);
}

