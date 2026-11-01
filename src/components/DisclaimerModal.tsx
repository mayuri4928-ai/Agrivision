import React from 'react';
import { useApp } from '../context/AppContext';
import { getLocalizedDisclaimer } from '../data/localizedDisclaimerData';
import { AlertTriangle, Phone, Check, X } from 'lucide-react';

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ isOpen, onClose }) => {
  const { t, selectedState, language } = useApp();
  const disc = getLocalizedDisclaimer(language);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="p-5 bg-amber-500/10 border-b border-amber-200/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">{disc.modalTitle}</h3>
              <p className="text-xs text-amber-900 font-medium">{disc.modalSubtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-amber-200/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-sm text-slate-700 leading-relaxed">
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-medium text-xs leading-relaxed">
            «{t.results.safetyDisclaimerText}»
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-slate-900 text-sm">{disc.keyCommitmentsTitle}</h4>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>{disc.point1Title}</strong> {disc.point1Desc}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>{disc.point2Title}</strong> {disc.point2Desc}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>{disc.point3Title}</strong> {disc.point3Desc}
              </span>
            </div>
          </div>

          {/* Kisan Call Center Box */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>{disc.helplineLabel}</span>
            </div>
            <p className="text-base font-bold text-emerald-700 tracking-wide">
              1800-180-1551 <span className="text-xs font-normal text-slate-500">{disc.tollFreeTiming}</span>
            </p>
            <p className="text-[11px] text-slate-500">
              {selectedState.name}: {selectedState.kisanHelpline}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
          >
            {disc.acceptBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
