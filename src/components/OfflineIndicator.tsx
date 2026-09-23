import React from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { WifiOff } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full bg-stone-900/95 text-amber-400 border border-amber-500/30 px-3.5 py-1.5 text-xs font-semibold shadow-lg backdrop-blur-xs">
      <WifiOff className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
      <span>ऑफलाइन मोड (Offline Mode) — कैश्ड ऐप उपलब्ध है</span>
    </div>
  );
};
