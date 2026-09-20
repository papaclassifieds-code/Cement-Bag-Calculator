import React from 'react';
import { IndianRates } from '../types';
import { DEFAULT_INDIAN_RATES } from '../utils/indianCalculator';
import { X, RotateCcw, Check, IndianRupee } from 'lucide-react';

interface RatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  rates: IndianRates;
  onChangeRates: (rates: IndianRates) => void;
}

export const RatesModal: React.FC<RatesModalProps> = ({
  isOpen,
  onClose,
  rates,
  onChangeRates,
}) => {
  if (!isOpen) return null;

  const handleReset = () => {
    onChangeRates(DEFAULT_INDIAN_RATES);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-amber-500 text-stone-950 rounded-lg">
              <IndianRupee className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-stone-100">
                बाजार भाव बदलें (Material Rates)
              </h2>
              <p className="text-[11px] text-stone-400">
                अपने क्षेत्र के अनुसार सामग्री का रेट सेट करें
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Inputs Body */}
        <div className="p-4 space-y-3.5 text-xs">
          {/* Cement Rate */}
          <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
            <label className="font-bold text-stone-800 block mb-1">
              सीमेंट प्रति बोरी (Cement / 50kg Bag)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 font-bold text-stone-400">
                ₹
              </span>
              <input
                type="number"
                min="0"
                value={rates.cementPerBag}
                onChange={(e) =>
                  onChangeRates({
                    ...rates,
                    cementPerBag: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full pl-7 pr-3 py-1.5 bg-white border border-stone-300 rounded-lg text-sm font-bold text-stone-900 focus:ring-2 focus:ring-amber-500 outline-hidden"
              />
            </div>
          </div>

          {/* Sand Rate */}
          <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
            <div className="flex justify-between items-center mb-1">
              <label className="font-bold text-stone-800">
                रेती प्रति CFT (Sand / CFT)
              </label>
              <span className="text-[11px] text-stone-500">
                (₹{rates.sandPerCft * 100} / 1 ब्रास)
              </span>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-2 font-bold text-stone-400">
                ₹
              </span>
              <input
                type="number"
                min="0"
                value={rates.sandPerCft}
                onChange={(e) =>
                  onChangeRates({
                    ...rates,
                    sandPerCft: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full pl-7 pr-3 py-1.5 bg-white border border-stone-300 rounded-lg text-sm font-bold text-stone-900 focus:ring-2 focus:ring-amber-500 outline-hidden"
              />
            </div>
          </div>

          {/* Aggregate Rate */}
          <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
            <div className="flex justify-between items-center mb-1">
              <label className="font-bold text-stone-800">
                गिट्टी प्रति CFT (Aggregate / CFT)
              </label>
              <span className="text-[11px] text-stone-500">
                (₹{rates.aggregatePerCft * 100} / 1 ब्रास)
              </span>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-2 font-bold text-stone-400">
                ₹
              </span>
              <input
                type="number"
                min="0"
                value={rates.aggregatePerCft}
                onChange={(e) =>
                  onChangeRates({
                    ...rates,
                    aggregatePerCft: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full pl-7 pr-3 py-1.5 bg-white border border-stone-300 rounded-lg text-sm font-bold text-stone-900 focus:ring-2 focus:ring-amber-500 outline-hidden"
              />
            </div>
          </div>

          {/* Brick Rate */}
          <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
            <div className="flex justify-between items-center mb-1">
              <label className="font-bold text-stone-800">
                ईंट प्रति नग (Brick / Piece)
              </label>
              <span className="text-[11px] text-stone-500">
                (₹{rates.brickPerUnit * 1000} / 1,000 ईंट)
              </span>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-2 font-bold text-stone-400">
                ₹
              </span>
              <input
                type="number"
                min="0"
                step="0.5"
                value={rates.brickPerUnit}
                onChange={(e) =>
                  onChangeRates({
                    ...rates,
                    brickPerUnit: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full pl-7 pr-3 py-1.5 bg-white border border-stone-300 rounded-lg text-sm font-bold text-stone-900 focus:ring-2 focus:ring-amber-500 outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-3 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="text-xs text-stone-600 hover:text-stone-900 font-semibold flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            मानक रेट रीसेट करें
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-stone-950 font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            सेव करें (Save)
          </button>
        </div>
      </div>
    </div>
  );
};
