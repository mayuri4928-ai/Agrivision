import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { deleteScanRecord, clearAllScanHistory, getHistoryAnalytics } from '../../services/storage';
import { ScanRecord, DiagnosisResult } from '../../types';
import { DISEASES_DATABASE } from '../../data/diseases';
import {
  History,
  Trash2,
  Calendar,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Search,
  ScanLine,
  ArrowRight,
  X,
} from 'lucide-react';

export const HistoryPage: React.FC = () => {
  const {
    t,
    history,
    refreshHistory,
    setCurrentResult,
    setCurrentImage,
    setActiveTab,
    language,
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'ALL' | 'HEALTHY' | 'DISEASED'>('ALL');
  const [itemToDelete, setItemToDelete] = useState<ScanRecord | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const analytics = useMemo(() => getHistoryAnalytics(), [history]);

  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
      const matchesSearch =
        item.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.disease.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.stateName.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      if (filterType === 'HEALTHY') return item.isHealthy;
      if (filterType === 'DISEASED') return !item.isHealthy;
      return true;
    });
  }, [history, searchTerm, filterType]);

  const handleOpenDetail = (record: ScanRecord) => {
    // Reconstruct diagnostic result from record
    const diseaseDetail = DISEASES_DATABASE[record.className] || {
      className: record.className,
      crop: record.crop,
      disease: record.disease,
      isHealthy: record.isHealthy,
      simpleDescription: `Condition affecting ${record.crop}: ${record.disease}.`,
      visibleSymptoms: ['Visible discoloration or spots on leaf.'],
      generalPrevention: ['Ensure proper crop spacing and balanced irrigation.'],
      recommendedNextSteps: ['Monitor leaf progression and consult local agricultural officer.'],
      expertHelpWarning: 'Consult agricultural extension services if symptoms worsen.',
    };

    const reconResult: DiagnosisResult = {
      id: record.id,
      timestamp: record.timestamp,
      crop: record.crop,
      disease: record.disease,
      className: record.className,
      isHealthy: record.isHealthy,
      confidence: record.confidence,
      confidenceCategory: record.confidence >= 90 ? 'HIGH' : record.confidence >= 70 ? 'MODERATE' : 'LOW',
      topAlternatives: [],
      diseaseDetail,
      inferenceTimeMs: record.inferenceTimeMs || 45,
      modelArchitecture: 'MobileNetV2 (Inverted Residuals)',
    };

    setCurrentResult(reconResult);
    setCurrentImage(record.thumbnailUrl);
    setActiveTab('results');
  };

  const handleConfirmDeleteItem = () => {
    if (!itemToDelete) return;
    deleteScanRecord(itemToDelete.id);
    refreshHistory();
    setItemToDelete(null);
  };

  const handleConfirmClearAll = () => {
    clearAllScanHistory();
    refreshHistory();
    setShowClearConfirm(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16 relative">
      {/* Title & Clear Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">{t.history.title}</h1>
          <p className="text-sm text-slate-500 mt-1">{t.history.subtitle}</p>
        </div>

        {history.length > 0 && (
          <button
            onClick={() => setShowClearConfirm(true)}
            className="self-start sm:self-auto px-3.5 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 border border-red-200 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{t.history.clearAll}</span>
          </button>
        )}
      </div>

      {/* Analytics Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs font-semibold text-slate-400">{t.history.totalAnalyses}</span>
          <div className="text-3xl font-black text-slate-900">{analytics.total}</div>
          <span className="text-[11px] text-slate-500">
            {analytics.healthyCount} Healthy • {analytics.diseasedCount} Diseases detected
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs font-semibold text-slate-400">{t.history.mostAnalyzedCrop}</span>
          <div className="text-2xl font-black text-emerald-700 truncate">{analytics.mostScannedCrop}</div>
          <span className="text-[11px] text-slate-500">Highest scan frequency</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs font-semibold text-slate-400">{t.history.frequentlyDetected}</span>
          <div className="text-2xl font-black text-amber-700 truncate">{analytics.frequentDisease}</div>
          <span className="text-[11px] text-slate-500">Stored on device</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      {history.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search previous scans (crop, disease, or state)..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex gap-1.5 self-start sm:self-auto">
            <button
              onClick={() => setFilterType('ALL')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                filterType === 'ALL'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType('HEALTHY')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                filterType === 'HEALTHY'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Healthy
            </button>
            <button
              onClick={() => setFilterType('DISEASED')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                filterType === 'DISEASED'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Diseases
            </button>
          </div>
        </div>
      )}

      {/* Scans List or Empty State */}
      {filteredHistory.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
            <History className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-slate-900 text-lg">{t.history.emptyTitle}</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">{t.history.emptyDesc}</p>
          </div>
          <button
            onClick={() => setActiveTab('analyze')}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-xs inline-flex items-center gap-2 transition-colors"
          >
            <ScanLine className="w-4 h-4" />
            <span>{t.history.startScan}</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredHistory.map((record) => {
            const dateStr = new Date(record.timestamp).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <div
                key={record.id}
                onClick={() => handleOpenDetail(record)}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs hover:border-emerald-400 hover:shadow-xs transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200/80">
                    <img
                      src={record.thumbnailUrl}
                      alt={record.crop}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {record.crop} — {record.disease}
                      </h4>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          record.isHealthy
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                            : 'bg-red-100 text-red-800 border-red-200'
                        }`}
                      >
                        {record.isHealthy ? 'Healthy' : 'Disease'}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{dateStr}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-500" />
                        <span>{record.stateName}</span>
                      </span>
                      <span>•</span>
                      <span className="font-semibold text-slate-600">
                        {record.confidence}% confidence
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <span className="text-xs font-semibold text-emerald-700 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    <span>{t.history.viewDetails}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setItemToDelete(record);
                    }}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="Delete record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Privacy Guarantee Note */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500 flex items-center justify-between">
        <span>{t.history.historyNote}</span>
      </div>

      {/* Delete Single Item Modal */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-100 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center border border-rose-200">
                <Trash2 className="w-6 h-6" />
              </div>
              <button
                onClick={() => setItemToDelete(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-black text-slate-900">
                {language === 'hi'
                  ? 'यह स्कैन परिणाम हटाएं?'
                  : language === 'gu'
                  ? 'આ સ્કેન પરિણામ કાઢી નાખવું છે?'
                  : language === 'mr'
                  ? 'हे निदान हटवायचे आहे का?'
                  : 'Delete scan record?'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'hi'
                  ? `क्या आप वाकई "${itemToDelete.crop} - ${itemToDelete.disease}" के इस रिकॉर्ड को अपने डिवाइस से हटाना चाहते हैं?`
                  : language === 'gu'
                  ? `શું તમે ખરેખર "${itemToDelete.crop} - ${itemToDelete.disease}" ના આ રેકોર્ડને ડિવાઇસમાંથી કાઢી નાખવા માંગો છો?`
                  : `Are you sure you want to delete this diagnosis record (${itemToDelete.crop} - ${itemToDelete.disease}) from your device?`}
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setItemToDelete(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
              >
                {t.common?.cancel || 'Cancel'}
              </button>
              <button
                onClick={handleConfirmDeleteItem}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-600/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{t.history?.delete || 'Confirm Delete'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clear All History Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-100 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center border border-rose-200">
                <Trash2 className="w-6 h-6" />
              </div>
              <button
                onClick={() => setShowClearConfirm(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-black text-slate-900">
                {language === 'hi'
                  ? 'सभी स्कैन इतिहास साफ़ करें?'
                  : language === 'gu'
                  ? 'બધો સ્કેન ઇતિહાસ સાફ કરવો છે?'
                  : language === 'mr'
                  ? 'सर्व इतिहास हटवायचा आहे का?'
                  : 'Clear all scan history?'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.history.confirmClear}
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
              >
                {t.common?.cancel || 'Cancel'}
              </button>
              <button
                onClick={handleConfirmClearAll}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-600/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{t.history.clearAll}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
