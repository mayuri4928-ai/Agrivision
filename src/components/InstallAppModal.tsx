import React from 'react';
import { Download, X, Smartphone, Globe, Share2, CheckCircle2, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, installApp, isIOS, isStandalone } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div
        className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-sm border border-emerald-500/20 bg-emerald-950 shrink-0">
              <img
                src="/icon.svg"
                alt="AgriVision App Logo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg sm:text-xl">
                Download AgriVision App
              </h3>
              <p className="text-xs text-slate-500">
                Install as a mobile or desktop application
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current App State */}
        {isStandalone ? (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-emerald-900 text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <p className="font-medium text-xs">
              <strong>AgriVision is already installed!</strong> You are running the standalone application with full camera and offline features.
            </p>
          </div>
        ) : (
          <div className="space-y-4 text-xs text-slate-700">
            {/* Quick 1-Click Install Button if browser supports beforeinstallprompt */}
            {isInstallable && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
                <div className="flex items-center gap-2 font-bold text-emerald-900 text-sm">
                  <Smartphone className="w-4 h-4 text-emerald-700" />
                  <span>Direct 1-Click Installation</span>
                </div>
                <p className="text-emerald-800 leading-relaxed">
                  Your browser supports direct installation. Click below to download and install AgriVision directly onto your device.
                </p>
                <button
                  onClick={() => {
                    installApp();
                    onClose();
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download & Install AgriVision Now</span>
                </button>
              </div>
            )}

            {/* Android / Chrome Manual Steps */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-xs">
                <Smartphone className="w-4 h-4 text-emerald-600" />
                <span>On Android (Google Chrome / Edge):</span>
              </div>
              <ol className="list-decimal list-inside space-y-1 text-slate-600 pl-1 leading-relaxed">
                <li>Tap the <strong>three dots (⋮)</strong> in the top-right corner of Chrome.</li>
                <li>Select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.</li>
                <li>Confirm by tapping <strong>Install</strong>. The AgriVision icon will appear on your home screen.</li>
              </ol>
            </div>

            {/* iOS Safari Steps */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-xs">
                <Share2 className="w-4 h-4 text-sky-600" />
                <span>On iPhone / iPad (Safari):</span>
              </div>
              <ol className="list-decimal list-inside space-y-1 text-slate-600 pl-1 leading-relaxed">
                <li>Tap the <strong>Share</strong> button (box with an arrow pointing up) at the bottom.</li>
                <li>Scroll down and tap <strong>"Add to Home Screen"</strong>.</li>
                <li>Tap <strong>Add</strong> in the top-right corner.</li>
              </ol>
            </div>

            {/* Desktop Steps */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-xs">
                <Globe className="w-4 h-4 text-indigo-600" />
                <span>On PC / Mac / Chromebook:</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Look for the <strong>Install icon (desktop screen with arrow)</strong> on the right side of your browser URL bar, or click your browser menu &gt; <strong>Save and share &gt; Install AgriVision</strong>.
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
