import React from 'react';
import { ConcreteGrade, IndianUnit } from '../types';
import { QuickPresets } from './QuickPresets';

interface SlabFormProps {
  length: number;
  setLength: (v: number) => void;
  width: number;
  setWidth: (v: number) => void;
  thicknessInches: number;
  setThicknessInches: (v: number) => void;
  thicknessCm: number;
  setThicknessCm: (v: number) => void;
  grade: ConcreteGrade;
  setGrade: (g: ConcreteGrade) => void;
  unit: IndianUnit;
}

export const SlabForm: React.FC<SlabFormProps> = ({
  length,
  setLength,
  width,
  setWidth,
  thicknessInches,
  setThicknessInches,
  thicknessCm,
  setThicknessCm,
  grade,
  setGrade,
  unit,
}) => {
  const applyPreset = (l: number, w: number, th: number) => {
    if (unit === 'feet') {
      setLength(l);
      setWidth(w);
      setThicknessInches(th);
    } else {
      setLength(Number((l * 0.3048).toFixed(1)));
      setWidth(Number((w * 0.3048).toFixed(1)));
      setThicknessCm(Number((th * 2.54).toFixed(1)));
    }
  };

  const area = unit === 'feet' ? length * width : length * width * 10.7639;

  return (
    <div className="space-y-3">
      {/* Ready Size Buttons */}
      <QuickPresets
        presets={[
          { label: '10×10 ft (कमरा)', onClick: () => applyPreset(10, 10, 5) },
          { label: '20×30 ft (600 sq.ft)', onClick: () => applyPreset(20, 30, 5) },
          { label: '25×40 ft (1,000 sq.ft)', onClick: () => applyPreset(25, 40, 5) },
        ]}
      />

      {/* Dimensions Input */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200">
          <label className="text-[11px] font-bold text-stone-600 block mb-1">
            लंबाई ({unit === 'feet' ? 'Feet' : 'Meter'})
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
            चौड़ाई ({unit === 'feet' ? 'Feet' : 'Meter'})
          </label>
          <div className="flex items-center gap-1.5">
            <input
              type="number"
              step="any"
              min="0"
              value={width || ''}
              onChange={(e) => setWidth(parseFloat(e.target.value) || 0)}
              className="w-full text-base sm:text-lg font-black text-stone-900 bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-amber-500 outline-hidden"
              placeholder="0"
            />
            <span className="text-xs font-bold text-stone-400">
              {unit === 'feet' ? 'ft' : 'm'}
            </span>
          </div>
        </div>
      </div>

      {/* Area Line */}
      <div className="text-xs text-stone-500 px-1 flex justify-between items-center font-medium">
        <span>छत क्षेत्रफल: <strong className="text-stone-900">{Math.round(area)} Sq.Ft</strong></span>
        <span>{Number((area * 0.0929).toFixed(1))} m²</span>
      </div>

      {/* Thickness Selection - Clean Segmented control */}
      <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200">
        <div className="flex justify-between items-center mb-1.5 text-xs">
          <span className="font-bold text-stone-700">छत की मोटाई (Thickness)</span>
          <span className="text-amber-800 font-bold">
            {unit === 'feet' ? `${thicknessInches} इंच` : `${thicknessCm} cm`}
          </span>
        </div>

        {unit === 'feet' ? (
          <div className="grid grid-cols-4 gap-1.5">
            {[4, 4.5, 5, 6].map((th) => (
              <button
                key={th}
                type="button"
                onClick={() => setThicknessInches(th)}
                className={`py-1.5 text-xs font-bold rounded-lg border transition-all ${
                  thicknessInches === th
                    ? 'bg-amber-500 text-stone-950 border-amber-600 shadow-2xs font-extrabold'
                    : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
                }`}
              >
                {th}″ {th === 5 && '(मानक)'}
              </button>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-1.5">
            {[10, 12, 13, 15].map((th) => (
              <button
                key={th}
                type="button"
                onClick={() => setThicknessCm(th)}
                className={`py-1.5 text-xs font-bold rounded-lg border transition-all ${
                  thicknessCm === th
                    ? 'bg-amber-500 text-stone-950 border-amber-600 shadow-2xs font-extrabold'
                    : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
                }`}
              >
                {th} cm
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Concrete Mix Grade */}
      <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200">
        <span className="text-[11px] font-bold text-stone-700 block mb-1.5">
          कंक्रीट मसाला (Concrete Mix)
        </span>
        <div className="grid grid-cols-3 gap-1.5 text-xs">
          <button
            type="button"
            onClick={() => setGrade('M20')}
            className={`py-2 px-1.5 rounded-lg border text-center transition-all ${
              grade === 'M20'
                ? 'bg-amber-500 text-stone-950 border-amber-600 font-extrabold shadow-2xs'
                : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
            }`}
          >
            <div className="text-xs">M20 (1:1.5:3)</div>
            <div className="text-[9px] opacity-85">छत के लिए उत्तम</div>
          </button>
          <button
            type="button"
            onClick={() => setGrade('M15')}
            className={`py-2 px-1.5 rounded-lg border text-center transition-all ${
              grade === 'M15'
                ? 'bg-amber-500 text-stone-950 border-amber-600 font-extrabold shadow-2xs'
                : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
            }`}
          >
            <div className="text-xs">M15 (1:2:4)</div>
            <div className="text-[9px] opacity-85">सामान्य ढलाई</div>
          </button>
          <button
            type="button"
            onClick={() => setGrade('M25')}
            className={`py-2 px-1.5 rounded-lg border text-center transition-all ${
              grade === 'M25'
                ? 'bg-amber-500 text-stone-950 border-amber-600 font-extrabold shadow-2xs'
                : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
            }`}
          >
            <div className="text-xs">M25 (1:1:2)</div>
            <div className="text-[9px] opacity-85">हैवी लोड</div>
          </button>
        </div>
      </div>
    </div>
  );
};
