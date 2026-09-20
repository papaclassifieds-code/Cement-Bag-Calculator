import React from 'react';
import { IndianUnit, MortarRatio, PlasterThickness } from '../types';
import { QuickPresets } from './QuickPresets';

interface PlasterFormProps {
  length: number;
  setLength: (v: number) => void;
  height: number;
  setHeight: (v: number) => void;
  thickness: PlasterThickness;
  setThickness: (t: PlasterThickness) => void;
  mortarRatio: MortarRatio;
  setMortarRatio: (r: MortarRatio) => void;
  sidesCount: number;
  setSidesCount: (s: number) => void;
  unit: IndianUnit;
}

export const PlasterForm: React.FC<PlasterFormProps> = ({
  length,
  setLength,
  height,
  setHeight,
  thickness,
  setThickness,
  mortarRatio,
  setMortarRatio,
  sidesCount,
  setSidesCount,
  unit,
}) => {
  const applyPreset = (l: number, h: number, th: PlasterThickness, sides: number) => {
    if (unit === 'feet') {
      setLength(l);
      setHeight(h);
    } else {
      setLength(Number((l * 0.3048).toFixed(1)));
      setHeight(Number((h * 0.3048).toFixed(1)));
    }
    setThickness(th);
    setSidesCount(sides);
  };

  const totalArea =
    (unit === 'feet' ? length * height : length * height * 10.7639) * sidesCount;

  return (
    <div className="space-y-3">
      {/* Ready Size Buttons */}
      <QuickPresets
        presets={[
          { label: '1 दीवार (10×10 ft)', onClick: () => applyPreset(10, 10, '12mm', 1) },
          { label: '1 कमरा (40×10 ft)', onClick: () => applyPreset(40, 10, '12mm', 1) },
          { label: 'बाहरी दीवार (50×20 ft)', onClick: () => applyPreset(50, 20, '20mm', 1) },
        ]}
      />

      {/* Dimensions Input */}
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
              value={length || ''}
              onChange={(e) => setLength(parseFloat(e.target.value) || 0)}
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
              value={height || ''}
              onChange={(e) => setHeight(parseFloat(e.target.value) || 0)}
              className="w-full text-base sm:text-lg font-black text-stone-900 bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-amber-500 outline-hidden"
              placeholder="0"
            />
            <span className="text-xs font-bold text-stone-400">
              {unit === 'feet' ? 'ft' : 'm'}
            </span>
          </div>
        </div>
      </div>

      {/* Sides Selection & Total Area */}
      <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200 flex items-center justify-between gap-3 text-xs">
        <span className="font-bold text-stone-700">प्लास्टर की तरफ:</span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSidesCount(1)}
            className={`px-3 py-1.5 rounded-lg border font-bold transition-all ${
              sidesCount === 1
                ? 'bg-amber-500 text-stone-950 border-amber-600 shadow-2xs'
                : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
            }`}
          >
            एक तरफ (1 Side)
          </button>
          <button
            type="button"
            onClick={() => setSidesCount(2)}
            className={`px-3 py-1.5 rounded-lg border font-bold transition-all ${
              sidesCount === 2
                ? 'bg-amber-500 text-stone-950 border-amber-600 shadow-2xs'
                : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
            }`}
          >
            दोनों तरफ (2 Sides)
          </button>
        </div>
      </div>

      {/* Plaster Thickness */}
      <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200">
        <div className="flex justify-between items-center mb-1.5 text-xs">
          <span className="font-bold text-stone-700">प्लास्टर की मोटाई (Thickness)</span>
          <span className="text-stone-500 font-medium">कुल एरिया: {Math.round(totalArea)} sq.ft</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 text-xs">
          <button
            type="button"
            onClick={() => setThickness('12mm')}
            className={`py-1.5 rounded-lg border text-center transition-all ${
              thickness === '12mm'
                ? 'bg-amber-500 text-stone-950 border-amber-600 font-extrabold shadow-2xs'
                : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
            }`}
          >
            <div className="font-bold text-xs">12 mm</div>
            <div className="text-[9px] opacity-80">अंदरूनी (Internal)</div>
          </button>
          <button
            type="button"
            onClick={() => setThickness('15mm')}
            className={`py-1.5 rounded-lg border text-center transition-all ${
              thickness === '15mm'
                ? 'bg-amber-500 text-stone-950 border-amber-600 font-extrabold shadow-2xs'
                : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
            }`}
          >
            <div className="font-bold text-xs">15 mm</div>
            <div className="text-[9px] opacity-80">छत / रफ दीवार</div>
          </button>
          <button
            type="button"
            onClick={() => setThickness('20mm')}
            className={`py-1.5 rounded-lg border text-center transition-all ${
              thickness === '20mm'
                ? 'bg-amber-500 text-stone-950 border-amber-600 font-extrabold shadow-2xs'
                : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
            }`}
          >
            <div className="font-bold text-xs">20 mm</div>
            <div className="text-[9px] opacity-80">बाहरी (External)</div>
          </button>
        </div>
      </div>

      {/* Mortar Ratio */}
      <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200">
        <span className="text-[11px] font-bold text-stone-700 block mb-1.5">
          मसाला अनुपात (Mortar Ratio - सीमेंट : रेती)
        </span>
        <div className="grid grid-cols-3 gap-1.5 text-xs">
          {(['1:6', '1:5', '1:4'] as MortarRatio[]).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setMortarRatio(r)}
              className={`py-1.5 rounded-lg border text-center transition-all ${
                mortarRatio === r
                  ? 'bg-amber-500 text-stone-950 border-amber-600 font-extrabold shadow-2xs'
                  : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
            >
              <div className="font-bold text-xs">{r}</div>
              <div className="text-[9px] opacity-80">
                {r === '1:6' ? 'सामान्य' : r === '1:5' ? 'मानक' : 'मजबूत'}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
