import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { SUPPORTED_LANGUAGES, LanguageMeta } from '../locales';
import { Globe, X, CheckCircle2, Search } from 'lucide-react';
import { LanguageCode } from '../types';

interface LanguageSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LanguageSelectorModal: React.FC<LanguageSelectorModalProps> = ({ isOpen, onClose }) => {
  const { language, setLanguage, t } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLanguages = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return SUPPORTED_LANGUAGES;
    return SUPPORTED_LANGUAGES.filter(
      (lang) =>
        lang.name.toLowerCase().includes(q) ||
        lang.nativeName.toLowerCase().includes(q) ||
        lang.script.toLowerCase().includes(q) ||
        lang.code.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  if (!isOpen) return null;

  const handleSelect = (code: LanguageCode) => {
    setLanguage(code);
    onClose();
  };

  const selectedMeta = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 bg-gradient-to-r from-emerald-50/70 to-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-xs shadow-emerald-600/20">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg sm:text-xl">{t.common.selectLanguage}</h3>
              <p className="text-xs text-slate-500">
                {t.settings.languageDesc}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Filter Bar */}
        <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/60">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`${t.common.selectLanguage}...`}
              className="w-full pl-9.5 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Language Grid: 1 col on mobile, 2 on sm, 3 on lg */}
        <div className="p-4 sm:p-5 overflow-y-auto max-h-[55vh] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {filteredLanguages.map((langItem: LanguageMeta) => {
            const isSelected = language === langItem.code;
            return (
              <button
                key={langItem.code}
                onClick={() => handleSelect(langItem.code)}
                className={`p-3.5 rounded-2xl text-left border transition-all flex items-center justify-between gap-2.5 group ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50/90 ring-2 ring-emerald-500/20 shadow-xs'
                    : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50 bg-white'
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-base text-slate-900 truncate leading-snug">
                    {langItem.nativeName}
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5 truncate">
                    <span className="font-medium text-slate-700">{langItem.name}</span>
                    <span className="text-[11px] text-slate-400">• {langItem.script}</span>
                  </div>
                </div>

                <div className="shrink-0">
                  {isSelected ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-slate-300 group-hover:border-emerald-400" />
                  )}
                </div>
              </button>
            );
          })}

          {filteredLanguages.length === 0 && (
            <div className="col-span-full py-8 text-center text-slate-400 text-xs">
              {t.common.selectLanguage}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-md">
              {selectedMeta.nativeName} ({selectedMeta.name})
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-xl transition-colors shadow-2xs"
          >
            {t.common.close}
          </button>
        </div>
      </div>
    </div>
  );
};
