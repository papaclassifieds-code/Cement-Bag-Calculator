import React from 'react';
import { IndianUnit } from '../types';
import { Sparkles } from 'lucide-react';

interface QuickPresetsProps {
  presets: { label: string; onClick: () => void; isSelected?: boolean }[];
}

export const QuickPresets: React.FC<QuickPresetsProps> = ({ presets }) => {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
      <span className="text-stone-500 text-[11px] font-semibold flex items-center gap-1 shrink-0">
        <Sparkles className="w-3 h-3 text-amber-500" />
        रेडी साइज:
      </span>
      {presets.map((p, idx) => (
        <button
          key={idx}
          type="button"
          onClick={p.onClick}
          className={`px-2.5 py-1 rounded-lg shrink-0 font-medium transition-all ${
            p.isSelected
              ? 'bg-amber-500 text-stone-950 font-bold shadow-2xs'
              : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
          }`}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
};
