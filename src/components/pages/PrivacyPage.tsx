import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Lock, EyeOff, HardDrive, CheckCircle2 } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  const { t } = useApp();

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      <div className="text-center space-y-2">
        <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <h1 className="text-3xl font-black text-slate-900">{t.privacy.title}</h1>
        <p className="text-sm text-slate-500">{t.privacy.subtitle}</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
          <h3 className="font-bold text-slate-900 text-base">Our Core Privacy Commitments</h3>

          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <Lock className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">{t.privacy.localProcessingTitle}</strong>
                <span className="text-xs text-slate-600">{t.privacy.localProcessingDesc}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <EyeOff className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">{t.privacy.zeroDataUploadTitle}</strong>
                <span className="text-xs text-slate-600">{t.privacy.zeroDataUploadDesc}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <HardDrive className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">{t.privacy.storageTitle}</strong>
                <span className="text-xs text-slate-600">{t.privacy.storageDesc}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-500">
            <h4 className="font-bold text-slate-800 text-sm">Offline Verification:</h4>
            <p>
              You can verify AgriVision's complete privacy guarantees at any time: turn on Airplane Mode or disconnect your device from WiFi/cellular data. The application will continue to capture, process, and diagnose crop diseases seamlessly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
