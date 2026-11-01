import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { AppErrorRecord, exportErrorRecordsAsJson } from '../services/storage';
import { getLocalizedOutbreakUI } from '../data/localizedOutbreakAndAlerts';
import {
  AlertTriangle,
  Trash2,
  Download,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Search,
  ShieldAlert,
  Clock,
  Terminal,
  Activity,
  Layers,
  Sparkles,
} from 'lucide-react';

interface ErrorLogsManagerProps {
  className?: string;
  compact?: boolean;
}

export const ErrorLogsManager: React.FC<ErrorLogsManagerProps> = ({
  className = '',
  compact = false,
}) => {
  const { errorRecords, clearErrorRecords, refreshErrorRecords, language } = useApp();
  const ui = useMemo(() => getLocalizedOutbreakUI(language), [language]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [expandedErrorId, setExpandedErrorId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    errorRecords.forEach((e) => set.add(e.category));
    return ['ALL', ...Array.from(set)];
  }, [errorRecords]);

  const filteredErrors = useMemo(() => {
    return errorRecords.filter((err) => {
      if (selectedCategory !== 'ALL' && err.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesMsg = err.message.toLowerCase().includes(q);
        const matchesDetails = err.details?.toLowerCase().includes(q);
        const matchesCat = err.category.toLowerCase().includes(q);
        if (!matchesMsg && !matchesDetails && !matchesCat) return false;
      }
      return true;
    });
  }, [errorRecords, selectedCategory, searchQuery]);

  const handleCopy = (record: AppErrorRecord) => {
    try {
      navigator.clipboard.writeText(JSON.stringify(record, null, 2));
      setCopiedId(record.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Ignore
    }
  };

  const handleExport = () => {
    try {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(exportErrorRecordsAsJson());
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `agrivision_error_logs_${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      setExportNotice('Exported!');
      setTimeout(() => setExportNotice(null), 2000);
    } catch (e) {
      console.warn('Export failed:', e);
    }
  };

  const formatTimestamp = (ts: number) => {
    try {
      const date = new Date(ts);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) +
        ' • ' + date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    } catch {
      return String(ts);
    }
  };

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'VISION_MODEL':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'CAMERA':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'SPEECH':
        return 'bg-sky-100 text-sky-800 border-sky-200';
      case 'DIAGNOSIS':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'NETWORK':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className={`bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100 shrink-0">
            <ShieldAlert className="w-5 h-5 text-rose-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-black text-slate-900 text-base">
                {ui.systemErrorLogsTitle}
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-slate-100 text-slate-700 border border-slate-200">
                {ui.errorCountPill(errorRecords.length)}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {ui.systemErrorLogsSubtitle}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {errorRecords.length > 0 && (
            <>
              <button
                type="button"
                onClick={handleExport}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Export JSON"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{exportNotice || ui.exportErrorLogsBtn}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  clearErrorRecords();
                }}
                className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Clear Logs"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{ui.clearErrorLogsBtn}</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      {errorRecords.length > 0 && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search error messages or codes..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-emerald-500"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Logs List */}
      {errorRecords.length === 0 ? (
        <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-2">
          <Activity className="w-8 h-8 text-emerald-600 mx-auto" />
          <h4 className="text-sm font-bold text-slate-800">
            {ui.noErrorsLogged}
          </h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            All vision inferences, offline edge ensembles, and browser devices have completed cleanly with zero persistent faults.
          </p>
        </div>
      ) : filteredErrors.length === 0 ? (
        <div className="p-6 text-center bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-500">
          No error records match your search filter.
        </div>
      ) : (
        <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
          {filteredErrors.map((err) => {
            const isExpanded = expandedErrorId === err.id;
            const isCopied = copiedId === err.id;

            return (
              <div
                key={err.id}
                className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-colors space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase border ${getCategoryBadge(err.category)}`}>
                      {err.category}
                    </span>
                    <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{formatTimestamp(err.timestamp)}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleCopy(err)}
                      className="px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                      title={ui.copyErrorDetails}
                    >
                      {isCopied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{isCopied ? ui.errorCopied : ui.copyErrorDetails}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setExpandedErrorId(isExpanded ? null : err.id)}
                      className="p-1 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                      title={isExpanded ? 'Collapse' : 'Expand'}
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="text-xs font-bold text-slate-900 break-words leading-relaxed">
                  {err.message}
                </div>

                {err.details && (
                  <div className="text-[11.5px] font-medium text-slate-600 break-words bg-white/70 p-2 rounded-xl border border-slate-200/80">
                    {err.details}
                  </div>
                )}

                {/* Collapsible Details (Stack & Context) */}
                {isExpanded && (
                  <div className="pt-2 border-t border-slate-200 text-[10.5px] font-mono space-y-2 bg-slate-900 text-slate-200 p-3 rounded-xl overflow-x-auto">
                    {err.url && (
                      <div>
                        <span className="text-slate-400">URL: </span>
                        <span>{err.url}</span>
                      </div>
                    )}
                    {err.context && (
                      <div>
                        <span className="text-slate-400">Context: </span>
                        <pre className="whitespace-pre-wrap">{JSON.stringify(err.context, null, 2)}</pre>
                      </div>
                    )}
                    {err.stack && (
                      <div>
                        <span className="text-slate-400">Stack Trace: </span>
                        <pre className="whitespace-pre-wrap text-rose-300">{err.stack}</pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
