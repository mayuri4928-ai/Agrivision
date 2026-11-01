import React, { useRef, useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { getLocalizedCamera } from '../data/localizedCameraData';
import { saveErrorRecord } from '../services/storage';
import { Camera, X, RefreshCw, AlertCircle, Sparkles, Zap, ZapOff, Image as ImageIcon } from 'lucide-react';

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (dataUrl: string) => void;
}

export const CameraModal: React.FC<CameraModalProps> = ({ isOpen, onClose, onCapture }) => {
  const { t, language } = useApp();
  const cam = getLocalizedCamera(language);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const nativeCameraInputRef = useRef<HTMLInputElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [error, setError] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [hasTorch, setHasTorch] = useState(false);
  const [torchOn, setTorchOn] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      return;
    }

    startCamera();

    return () => {
      stopCamera();
    };
  }, [isOpen, facingMode]);

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch (e) {
          // ignore
        }
      });
      setStream(null);
      setHasTorch(false);
      setTorchOn(false);
    }
  };

  const startCamera = async () => {
    stopCamera();
    setError(null);

    if (typeof navigator === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError(t.camera.notAvailable || cam.liveViewUnavailable);
      return;
    }

    // Try multiple constraint levels for maximum cross-device compatibility
    const constraintAttempts: MediaStreamConstraints[] = [
      {
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      },
      {
        video: {
          facingMode: { ideal: facingMode },
        },
        audio: false,
      },
      {
        video: true,
        audio: false,
      },
    ];

    let mediaStream: MediaStream | null = null;
    let lastError: any = null;

    for (const constraints of constraintAttempts) {
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
        if (mediaStream) break;
      } catch (err) {
        lastError = err;
      }
    }

    if (!mediaStream) {
      console.warn('Camera getUserMedia all attempts failed:', lastError);
      try {
        saveErrorRecord({
          category: 'CAMERA',
          message: lastError?.message || 'Camera permission denied or camera stream unavailable',
          details: lastError?.name || 'GetUserMediaFailed',
          stack: lastError?.stack,
          context: {
            facingMode,
          },
        });
      } catch {
        // Ignore
      }
      setError(
        lastError?.name === 'NotAllowedError' || lastError?.name === 'PermissionDeniedError'
          ? t.camera.permissionDenied || cam.liveViewUnavailable
          : cam.liveViewUnavailable
      );
      return;
    }

    setStream(mediaStream);
    if (videoRef.current) {
      videoRef.current.srcObject = mediaStream;
      videoRef.current.play().catch(() => {});
    }

    // Check torch support
    const videoTrack = mediaStream.getVideoTracks()[0];
    if (videoTrack) {
      const capabilities = (videoTrack.getCapabilities && videoTrack.getCapabilities()) || {};
      if ((capabilities as any).torch) {
        setHasTorch(true);
      }
    }
  };

  const toggleTorch = async () => {
    if (!stream) return;
    const videoTrack = stream.getVideoTracks()[0];
    if (!videoTrack) return;

    try {
      const nextTorch = !torchOn;
      await (videoTrack as any).applyConstraints({
        advanced: [{ torch: nextTorch }],
      });
      setTorchOn(nextTorch);
    } catch (err) {
      console.error('Torch toggle failed:', err);
    }
  };

  const handleCapture = () => {
    if (!videoRef.current) return;
    setIsCapturing(true);

    try {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
        stopCamera();
        onCapture(dataUrl);
        onClose();
      }
    } catch (err) {
      console.error('Failed to capture frame:', err);
    } finally {
      setIsCapturing(false);
    }
  };

  const handleFlip = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  const handleNativeShutterFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        if (dataUrl) {
          stopCamera();
          onCapture(dataUrl);
          onClose();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-150">
      {/* Hidden native device shutter input - works 100% reliably on all iOS/Android phones */}
      <input
        ref={nativeCameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleNativeShutterFile}
      />

      <div className="relative w-full h-full sm:h-auto sm:max-w-lg bg-slate-950 sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col justify-between">
        {/* Top Control Bar with safe area */}
        <div
          className="p-4 flex items-center justify-between text-white bg-slate-900/90 backdrop-blur-md z-10 pt-safe"
          style={{ paddingTop: 'calc(0.75rem + env(safe-area-inset-top, 0px))' }}
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600/30 text-emerald-400 flex items-center justify-center">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-sm block">{t.camera.title || cam.title}</span>
              <span className="text-[10px] text-slate-400 block">{cam.subtitle}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {hasTorch && (
              <button
                onClick={toggleTorch}
                className={`p-2.5 rounded-full transition-colors ${
                  torchOn ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
                title="Toggle Torch/Flash"
              >
                {torchOn ? <Zap className="w-4 h-4" /> : <ZapOff className="w-4 h-4" />}
              </button>
            )}

            <button
              onClick={() => {
                stopCamera();
                onClose();
              }}
              className="p-2.5 text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-full transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
              aria-label="Close Camera"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Viewfinder Area */}
        <div className="relative flex-1 sm:aspect-square bg-black overflow-hidden flex items-center justify-center">
          {error ? (
            <div className="p-6 text-center text-slate-300 max-w-sm space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center">
                <AlertCircle className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">{cam.directCameraTitle}</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{error}</p>
              </div>

              <div className="flex flex-col gap-2.5 pt-2">
                <button
                  onClick={() => nativeCameraInputRef.current?.click()}
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white text-sm font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all min-h-[44px]"
                >
                  <Camera className="w-4 h-4" />
                  <span>{cam.openPhoneShutter}</span>
                </button>

                <button
                  onClick={startCamera}
                  className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition-colors min-h-[40px]"
                >
                  {cam.retryLiveViewfinder}
                </button>
              </div>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />

              {/* Leaf alignment reticle overlay */}
              <div className="absolute inset-6 sm:inset-10 pointer-events-none border-2 border-dashed border-emerald-400/70 rounded-3xl flex flex-col items-center justify-between p-4 shadow-inner">
                <div className="text-[11px] font-medium text-white/90 bg-black/60 px-3 py-1 rounded-full backdrop-blur-xs flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{cam.centerLeafInside}</span>
                </div>
                <div className="text-[10px] text-white/80 bg-black/60 px-3 py-1 rounded-full backdrop-blur-xs text-center">
                  {cam.glareNotice}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Bottom Control Bar with Safe Area */}
        <div
          className="p-5 bg-slate-950/95 border-t border-slate-800/80 flex items-center justify-around pb-safe"
          style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))' }}
        >
          {/* Flip / Front-Back Toggle */}
          <button
            onClick={handleFlip}
            disabled={!!error}
            className="p-3 text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-30 rounded-2xl transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center"
            title={t.camera.switchCamera}
          >
            <RefreshCw className="w-5 h-5" />
          </button>

          {/* Shutter Capture Button */}
          <button
            onClick={handleCapture}
            disabled={!!error || isCapturing}
            className="w-18 h-18 rounded-full bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/40 disabled:opacity-40 transition-transform ring-4 ring-white/20 min-w-[56px] min-h-[56px]"
            title={t.camera.capture}
            aria-label="Capture Leaf Photo"
          >
            <div className="w-14 h-14 rounded-full border-2 border-slate-900 flex items-center justify-center">
              <Camera className="w-7 h-7 text-slate-950" />
            </div>
          </button>

          {/* Fallback Native Camera App Button */}
          <button
            onClick={() => nativeCameraInputRef.current?.click()}
            className="p-3 text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-2xl transition-colors min-w-[48px] min-h-[48px] flex flex-col items-center justify-center"
            title={cam.shutterAppBtn}
          >
            <ImageIcon className="w-5 h-5 text-emerald-400" />
            <span className="text-[9px] mt-0.5 text-slate-400">{cam.shutterLabel}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
