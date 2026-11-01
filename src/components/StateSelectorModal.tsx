import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { INDIAN_STATES } from '../data/states';
import { IndianState } from '../types';
import { getLocalizedStateSelector } from '../data/localizedStateSelectorData';
import { MapPin, Search, X, Check, Phone, Info } from 'lucide-react';

interface StateSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StateSelectorModal: React.FC<StateSelectorModalProps> = ({ isOpen, onClose }) => {
  const { selectedState, setSelectedState, t, language } = useApp();
  const stLoc = getLocalizedStateSelector(language);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'STATE' | 'UT'>('ALL');

  const filteredStates = useMemo(() => {
    return INDIAN_STATES.filter((st) => {
      const matchesSearch =
        st.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        st.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        st.agroClimaticZone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        st.majorCrops.some((c) => c.toLowerCase().includes(searchTerm.toLowerCase()));

      if (!matchesSearch) return false;

      if (selectedFilter === 'STATE') return st.type === 'State';
      if (selectedFilter === 'UT') return st.type === 'Union Territory';
      return true;
    });
  }, [searchTerm, selectedFilter]);

  if (!isOpen) return null;

  const handleSelect = (st: IndianState) => {
    setSelectedState(st);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">{t.common.selectState}</h3>
              <p className="text-xs text-slate-500">{t.settings.stateDesc}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search bar & Type filter */}
        <div className="p-4 border-b border-slate-100 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`${t.common.selectState}...`}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-none rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 transition-all"
              autoFocus
            />
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            <button
              onClick={() => setSelectedFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                selectedFilter === 'ALL'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {stLoc.allRegions}
            </button>
            <button
              onClick={() => setSelectedFilter('STATE')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                selectedFilter === 'STATE'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {stLoc.states}
            </button>
            <button
              onClick={() => setSelectedFilter('UT')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                selectedFilter === 'UT'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {stLoc.unionTerritories}
            </button>
          </div>
        </div>

        {/* States list */}
        <div className="overflow-y-auto flex-1 p-4 space-y-2 divide-y divide-slate-100">
          {filteredStates.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-sm">
              {stLoc.noMatch} "{searchTerm}"
            </div>
          ) : (
            filteredStates.map((st) => {
              const isCurrent = selectedState.code === st.code;
              return (
                <div
                  key={st.code}
                  onClick={() => handleSelect(st)}
                  className={`pt-2.5 pb-2.5 px-3 rounded-xl cursor-pointer transition-all flex items-start justify-between gap-3 ${
                    isCurrent
                      ? 'bg-emerald-50/90 border border-emerald-300 ring-1 ring-emerald-500/20'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-slate-900">{st.name}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-slate-100 text-slate-600">
                        {st.type === 'State' ? stLoc.stateBadge : stLoc.utBadge}
                      </span>
                      {isCurrent && (
                        <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                          <Check className="w-3 h-3" /> ✓
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-500 flex items-center gap-1.5">
                      {st.agroClimaticZone}
                    </p>

                    <div className="flex flex-wrap gap-1 mt-1">
                      {st.majorCrops.map((crop) => (
                        <span
                          key={crop}
                          className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 text-slate-700 border border-slate-200/60"
                        >
                          {crop}
                        </span>
                      ))}
                    </div>

                    <div className="text-[11px] text-amber-700 flex items-center gap-1 mt-1">
                      <Phone className="w-3 h-3 text-amber-600 shrink-0" />
                      <span>{st.kisanHelpline}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-slate-400" />
            <span>{t.common.offline}</span>
          </div>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg transition-colors"
          >
            {t.common.close}
          </button>
        </div>
      </div>
    </div>
  );
};
