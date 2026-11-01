import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import 'leaflet/dist/leaflet.css';
import { saveErrorRecord } from './services/storage';

// Clean up any legacy manual 'agrivision-offline-*' caches and dev-sw.js in preview
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    if ('serviceWorker' in navigator && import.meta.env.DEV) {
      navigator.serviceWorker
        .getRegistrations()
        .then((regs) => {
          regs.forEach((r) => r.unregister().catch(() => {}));
        })
        .catch(() => {});
    }
    if ('caches' in window) {
      caches
        .keys()
        .then((keys) => {
          keys.forEach((key) => {
            if (key.startsWith('agrivision-offline-') || key.includes('workbox-precache')) {
              caches.delete(key).catch(() => {});
            }
          });
        })
        .catch(() => {});
    }
  });
}

// Global error handlers to reliably capture and save real application errors
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    try {
      const msg = event.message || '';
      // Ignore Vite HMR / WebSocket errors in development/preview
      if (msg.includes('WebSocket') || msg.includes('vite') || msg.includes('HMR')) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return;
      }
      saveErrorRecord({
        category: 'SYSTEM',
        message: msg || 'Uncaught window error',
        details: event.filename ? `${event.filename}:${event.lineno}:${event.colno}` : undefined,
        stack: event.error?.stack,
        url: window.location.href,
      });
    } catch {
      // Ignore
    }
  });

  window.addEventListener('unhandledrejection', (event) => {
    try {
      const reason = event.reason;
      const msg = reason instanceof Error ? reason.message : String(reason || '');
      // Ignore Vite HMR / WebSocket errors in development/preview
      if (msg.includes('WebSocket') || msg.includes('vite') || msg.includes('HMR')) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return;
      }
      saveErrorRecord({
        category: 'SYSTEM',
        message: msg || 'Unhandled Promise Rejection',
        stack: reason instanceof Error ? reason.stack : undefined,
        url: window.location.href,
      });
    } catch {
      // Ignore
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
