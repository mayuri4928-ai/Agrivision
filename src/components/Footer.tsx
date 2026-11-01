import React from 'react';
import { useApp } from '../context/AppContext';
import { getLocalizedFooter } from '../data/localizedFooterData';
import { Sprout, ShieldCheck, Award, Heart, Phone } from 'lucide-react';

export const Footer: React.FC<{ onOpenDisclaimerModal: () => void }> = ({
  onOpenDisclaimerModal,
}) => {
  const { t, selectedState, setActiveTab, language } = useApp();
  const foot = getLocalizedFooter(language);

  return (
    <footer className="bg-white border-t border-slate-200 mt-auto pt-12 pb-20 md:pb-12 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Purpose */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5 text-slate-900 font-bold text-base">
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-emerald-500/20 bg-emerald-950 flex items-center justify-center shrink-0">
                <img
                  src="/icon.svg"
                  alt="AgriVision Logo"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span>AgriVision</span>
            </div>
            <p className="text-slate-500 leading-relaxed max-w-sm">
              {foot.tagline}
            </p>
            <div className="flex items-center gap-3 pt-1">
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold">
                <Award className="w-3 h-3 text-emerald-600" />
                <span>{foot.cbseBadge}</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] text-blue-800 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full font-semibold">
                <ShieldCheck className="w-3 h-3 text-blue-600" />
                <span>{foot.zeroCloudBadge}</span>
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">{foot.quickLinksTitle}</h4>
            <ul className="space-y-1.5 text-slate-500">
              <li>
                <button
                  onClick={() => setActiveTab('home')}
                  className="hover:text-emerald-700 transition-colors"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('analyze')}
                  className="hover:text-emerald-700 transition-colors"
                >
                  {t.nav.analyze}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('science')}
                  className="hover:text-emerald-700 transition-colors"
                >
                  {t.nav.science}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('howItWorks')}
                  className="hover:text-emerald-700 transition-colors"
                >
                  {t.nav.howItWorks}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('privacy')}
                  className="hover:text-emerald-700 transition-colors"
                >
                  {t.nav.privacy}
                </button>
              </li>
            </ul>
          </div>

          {/* Agricultural Emergency */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">{foot.kisanHelplineTitle}</h4>
            <p className="text-slate-500">
              {foot.tollFreeGovt}
            </p>
            <p className="text-emerald-700 font-bold text-sm tracking-wide flex items-center gap-1.5">
              <Phone className="w-4 h-4" />
              <span>1800-180-1551</span>
            </p>
            <p className="text-[11px] text-slate-400">
              {foot.selectedZoneLabel} {selectedState.name} ({selectedState.kisanHelpline})
            </p>
            <div className="pt-1">
              <button
                onClick={onOpenDisclaimerModal}
                className="text-[11px] text-amber-700 hover:text-amber-900 underline font-medium"
              >
                {foot.readDisclaimerBtn}
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400 text-[11px]">
          <div>
            {foot.copyrightNotice}
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>{foot.poweredBy}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
