import React from 'react';
import { IndianUnit } from '../types';
import { Sparkles, SlidersHorizontal, HelpCircle } from 'lucide-react';

interface HeaderProps {
  unit: IndianUnit;
  onUnitChange: (unit: IndianUnit) => void;
  onOpenRates: () => void;
  onOpenGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  unit,
  onUnitChange,
  onOpenRates,
  onOpenGuide,
}) => {
  return (
    <header className="bg-stone-900 text-white sticky top-0 z-30 shadow-md border-b border-stone-800">
      <div className="max-w-xl mx-auto px-4 py-2.5 flex items-center justify-between">
        {/* Simple Clean Title */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500 text-stone-950 flex items-center justify-center font-black text-sm shadow-xs">
            सी
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base font-extrabold text-white tracking-tight leading-none">
                सीमेंट कैलकुलेटर
              </h1>
            </div>
            <p className="text-[10px] text-stone-400 font-medium">
              Cement Bag & Material Calculator
            </p>
          </div>
        </div>

        {/* Action Controls: Unit Toggle & Settings */}
        <div className="flex items-center gap-1.5">
          {/* Feet / Meter Toggle */}
          <div className="bg-stone-800 p-0.5 rounded-lg border border-stone-700 flex items-center text-xs font-bold">
            <button
              type="button"
              onClick={() => onUnitChange('feet')}
              className={`px-2 py-1 rounded-md transition-all text-xs ${
                unit === 'feet'
                  ? 'bg-amber-500 text-stone-950 font-extrabold shadow-xs'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              फीट (Ft)
            </button>
            <button
              type="button"
              onClick={() => onUnitChange('meter')}
              className={`px-2 py-1 rounded-md transition-all text-xs ${
                unit === 'meter'
                  ? 'bg-amber-500 text-stone-950 font-extrabold shadow-xs'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              मीटर (M)
            </button>
          </div>

          {/* Rate Settings */}
          <button
            type="button"
            onClick={onOpenRates}
            className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-400 border border-stone-700 transition-colors"
            title="रेट बदलें (Change Market Rates)"
            aria-label="Change Market Rates"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>

          {/* Trolley Guide */}
          <button
            type="button"
            onClick={onOpenGuide}
            className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700 transition-colors"
            title="ब्रास व ट्रॉली गाइड (Brass Guide)"
            aria-label="Trolley and Brass Guide"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
