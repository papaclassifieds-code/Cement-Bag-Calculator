import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Smartphone, X } from 'lucide-react';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already installed or running as standalone TWA, suppress UI
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={install}
        className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-xs transition-transform active:scale-95"
        title="ऐप इंस्टॉल करें (Install App)"
      >
        <Download className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">ऐप इंस्टॉल</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-400 border border-stone-700 font-bold text-xs transition-colors"
          title="होम स्क्रीन पर जोड़ें"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Install</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
            <div className="w-full max-w-sm rounded-2xl bg-stone-900 border border-stone-800 text-white p-5 shadow-2xl relative">
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="absolute top-4 right-4 text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-base font-bold text-amber-400 mb-2">
                iPhone / iPad पर इंस्टॉल करें
              </h3>
              <p className="text-xs text-stone-300 space-y-2 leading-relaxed">
                1. सफारी (Safari) में नीचे दिए गए <strong className="text-white">Share</strong> बटन पर टैप करें।<br />
                2. स्क्रॉल करके <strong className="text-amber-400">Add to Home Screen (होम स्क्रीन में जोड़ें)</strong> चुनें।
              </p>
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="mt-4 w-full py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl transition-colors"
              >
                समझ गया (Close)
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
