import React from 'react';
import { IndianUnit, MortarRatio, WallThickness } from '../types';
import { QuickPresets } from './QuickPresets';

interface BrickworkFormProps {
  wallLength: number;
  setWallLength: (v: number) => void;
  wallHeight: number;
  setWallHeight: (v: number) => void;
  thickness: WallThickness;
  setThickness: (t: WallThickness) => void;
  doorCount: number;
  setDoorCount: (v: number) => void;
  windowCount: number;
  setWindowCount: (v: number) => void;
  mortarRatio: MortarRatio;
  setMortarRatio: (r: MortarRatio) => void;
  unit: IndianUnit;
}

export const BrickworkForm: React.FC<BrickworkFormProps> = ({
  wallLength,
  setWallLength,
  wallHeight,
  setWallHeight,
  thickness,
  setThickness,
  doorCount,
  setDoorCount,
  windowCount,
  setWindowCount,
  mortarRatio,
  setMortarRatio,
  unit,
}) => {
  const applyPreset = (l: number, h: number, th: WallThickness) => {
    if (unit === 'feet') {
      setWallLength(l);
      setWallHeight(h);
    } else {
      setWallLength(Number((l * 0.3048).toFixed(1)));
      setWallHeight(Number((h * 0.3048).toFixed(1)));
    }
    setThickness(th);
  };

  return (
    <div className="space-y-3">
      {/* Ready Size Buttons */}
      <QuickPresets
        presets={[
          { label: '1 दीवार (10×10 ft)', onClick: () => applyPreset(10, 10, '9inch') },
          { label: '1 कमरा 4 दीवार (40×10 ft)', onClick: () => applyPreset(40, 10, '9inch') },
          { label: 'बाउंड्री (50×6 ft, 4.5″)', onClick: () => applyPreset(50, 6, '4.5inch') },
        ]}
      />

      {/* Wall Thickness Selector (9" vs 4.5") */}
      <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200">
        <label className="text-[11px] font-bold text-stone-600 block mb-1.5">
          दीवार की मोटाई (Wall Thickness)
        </label>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            type="button"
            onClick={() => setThickness('9inch')}
            className={`p-2 rounded-xl border text-left transition-all ${
              thickness === '9inch'
                ? 'bg-amber-500 text-stone-950 border-amber-600 font-extrabold shadow-2xs'
                : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
            }`}
          >
            <div className="text-sm">9 इंच (9″) दीवार</div>
            <div className="text-[10px] opacity-80 mt-0.5">बाहरी / मुख्य दीवार (1 ईंट)</div>
          </button>

          <button
            type="button"
            onClick={() => setThickness('4.5inch')}
            className={`p-2 rounded-xl border text-left transition-all ${
              thickness === '4.5inch'
                ? 'bg-amber-500 text-stone-950 border-amber-600 font-extrabold shadow-2xs'
                : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
            }`}
          >
            <div className="text-sm">4.5 इंच (4.5″) दीवार</div>
            <div className="text-[10px] opacity-80 mt-0.5">अंदर की पार्टीशन दीवार (आधा ईंट)</div>
          </button>
        </div>
      </div>

      {/* Wall Dimensions */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200">
          <label className="text-[11px] font-bold text-stone-600 block mb-1">
            कुल लंबाई ({unit === 'feet' ? 'Ft' : 'M'})
          </label>
          <div className="flex items-center gap-1.5">
            <input
              type="number"
              step="any"
              min="0"
              value={wallLength || ''}
              onChange={(e) => setWallLength(parseFloat(e.target.value) || 0)}
              className="w-full text-base sm:text-lg font-black text-stone-900 bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-amber-500 outline-hidden"
              placeholder="0"
            />
            <span className="text-xs font-bold text-stone-400">
              {unit === 'feet' ? 'ft' : 'm'}
            </span>
          </div>
        </div>

        <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200">
          <label className="text-[11px] font-bold text-stone-600 block mb-1">
            ऊंचाई ({unit === 'feet' ? 'Ft' : 'M'})
          </label>
          <div className="flex items-center gap-1.5">
            <input
              type="number"
              step="any"
              min="0"
              value={wallHeight || ''}
              onChange={(e) => setWallHeight(parseFloat(e.target.value) || 0)}
              className="w-full text-base sm:text-lg font-black text-stone-900 bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-amber-500 outline-hidden"
              placeholder="0"
            />
            <span className="text-xs font-bold text-stone-400">
              {unit === 'feet' ? 'ft' : 'm'}
            </span>
          </div>
        </div>
      </div>

      {/* Openings (Doors & Windows) - Simplified Counter */}
      <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200 flex items-center justify-between gap-2 text-xs">
        {/* Doors */}
        <div className="flex-1 flex items-center justify-between bg-white px-2.5 py-1.5 rounded-lg border border-stone-200">
          <span className="font-bold text-stone-700">दरवाजा (Door):</span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setDoorCount(Math.max(0, doorCount - 1))}
              className="w-6 h-6 rounded-md bg-stone-100 hover:bg-stone-200 font-black text-stone-800 flex items-center justify-center"
            >
              -
            </button>
            <span className="w-5 text-center font-bold text-sm text-stone-900">
              {doorCount}
            </span>
            <button
              type="button"
              onClick={() => setDoorCount(doorCount + 1)}
              className="w-6 h-6 rounded-md bg-stone-100 hover:bg-stone-200 font-black text-stone-800 flex items-center justify-center"
            >
              +
            </button>
          </div>
        </div>

        {/* Windows */}
        <div className="flex-1 flex items-center justify-between bg-white px-2.5 py-1.5 rounded-lg border border-stone-200">
          <span className="font-bold text-stone-700">खिड़की (Win):</span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setWindowCount(Math.max(0, windowCount - 1))}
              className="w-6 h-6 rounded-md bg-stone-100 hover:bg-stone-200 font-black text-stone-800 flex items-center justify-center"
            >
              -
            </button>
            <span className="w-5 text-center font-bold text-sm text-stone-900">
              {windowCount}
            </span>
            <button
              type="button"
              onClick={() => setWindowCount(windowCount + 1)}
              className="w-6 h-6 rounded-md bg-stone-100 hover:bg-stone-200 font-black text-stone-800 flex items-center justify-center"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Mortar Mix Ratio */}
      <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200">
        <div className="flex justify-between items-center mb-1.5 text-xs">
          <span className="font-bold text-stone-700">मसाला अनुपात (Mortar Ratio)</span>
          <span className="text-[11px] text-stone-500">सीमेंट : रेती</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 text-xs">
          {(['1:6', '1:5', '1:4'] as MortarRatio[]).map((ratio) => (
            <button
              key={ratio}
              type="button"
              onClick={() => setMortarRatio(ratio)}
              className={`py-1.5 rounded-lg border text-center transition-all ${
                mortarRatio === ratio
                  ? 'bg-amber-500 text-stone-950 border-amber-600 font-extrabold shadow-2xs'
                  : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
            >
              <div className="font-bold text-xs">{ratio}</div>
              <div className="text-[9px] opacity-80">
                {ratio === '1:6' ? 'मानक (Standard)' : ratio === '1:5' ? 'मजबूत' : 'अति मजबूत'}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
