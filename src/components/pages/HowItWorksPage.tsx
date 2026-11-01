import React from 'react';
import { useApp } from '../../context/AppContext';
import { getLocalizedHowItWorks } from '../../data/localizedHowItWorksData';
import {
  Camera,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  MapPin,
  ShieldCheck,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';

const STEP_ICONS = [
  { icon: Camera, color: 'bg-emerald-100 text-emerald-700' },
  { icon: CheckCircle2, color: 'bg-blue-100 text-blue-700' },
  { icon: Layers, color: 'bg-purple-100 text-purple-700' },
  { icon: Cpu, color: 'bg-amber-100 text-amber-700' },
  { icon: Sparkles, color: 'bg-indigo-100 text-indigo-700' },
  { icon: MapPin, color: 'bg-red-100 text-red-700' },
  { icon: ShieldCheck, color: 'bg-teal-100 text-teal-700' },
];

export const HowItWorksPage: React.FC = () => {
  const { language, setActiveTab } = useApp();
  const howData = getLocalizedHowItWorks(language);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Title Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{howData.badge}</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900">{howData.title}</h1>
        <p className="text-sm text-slate-500 max-w-lg mx-auto">{howData.subtitle}</p>
      </div>

      {/* Interactive Step-by-Step Flow */}
      <div className="space-y-4">
        {howData.steps.map((step, idx) => {
          const iconConfig = STEP_ICONS[idx % STEP_ICONS.length];
          const Icon = iconConfig.icon;
          return (
            <div
              key={step.num}
              className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-emerald-300 transition-colors flex flex-col sm:flex-row items-start gap-4"
            >
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-2xl font-black text-slate-300 font-mono">{step.num}</span>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconConfig.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>

              <div className="space-y-1 flex-1">
                <h3 className="font-bold text-slate-900 text-base">{step.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Call to Action */}
      <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
        <h3 className="font-bold text-slate-900 text-lg">{howData.cta.title}</h3>
        <p className="text-xs text-slate-600 max-w-md mx-auto">
          {howData.cta.desc}
        </p>
        <button
          onClick={() => setActiveTab('analyze')}
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs inline-flex items-center gap-2 transition-colors"
        >
          <span>{howData.cta.button}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
