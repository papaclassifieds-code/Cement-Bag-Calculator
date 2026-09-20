import React from 'react';
import { ConcreteGrade } from '../types';

interface ColumnFormProps {
  widthInches: number;
  setWidthInches: (v: number) => void;
  depthInches: number;
  setDepthInches: (v: number) => void;
  heightFeet: number;
  setHeightFeet: (v: number) => void;
  count: number;
  setCount: (v: number) => void;
  grade: ConcreteGrade;
  setGrade: (g: ConcreteGrade) => void;
}

export const ColumnForm: React.FC<ColumnFormProps> = ({
  widthInches,
  setWidthInches,
  depthInches,
  setDepthInches,
  heightFeet,
  setHeightFeet,
  count,
  setCount,
  grade,
  setGrade,
}) => {
  const setPresetSize = (w: number, d: number) => {
    setWidthInches(w);
    setDepthInches(d);
  };

  return (
    <div className="space-y-3">
      {/* Standard Column Sizes */}
      <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200">
        <label className="text-[11px] font-bold text-stone-600 block mb-1.5">
          मानक कॉलम साइज (Standard Sizes)
        </label>
        <div className="grid grid-cols-3 gap-1.5 text-xs">
          <button
            type="button"
            onClick={() => setPresetSize(9, 9)}
            className={`p-2 rounded-lg border text-center transition-all ${
              widthInches === 9 && depthInches === 9
                ? 'bg-amber-500 text-stone-950 font-extrabold border-amber-600 shadow-2xs'
                : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
            }`}
          >
            <div className="font-bold text-xs">9″ × 9″</div>
            <div className="text-[9px] opacity-80">1 मंजिल</div>
          </button>
          <button
            type="button"
            onClick={() => setPresetSize(9, 12)}
            className={`p-2 rounded-lg border text-center transition-all ${
              widthInches === 9 && depthInches === 12
                ? 'bg-amber-500 text-stone-950 font-extrabold border-amber-600 shadow-2xs'
                : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
            }`}
          >
            <div className="font-bold text-xs">9″ × 12″</div>
            <div className="text-[9px] opacity-80">2 मंजिल</div>
          </button>
          <button
            type="button"
            onClick={() => setPresetSize(12, 12)}
            className={`p-2 rounded-lg border text-center transition-all ${
              widthInches === 12 && depthInches === 12
                ? 'bg-amber-500 text-stone-950 font-extrabold border-amber-600 shadow-2xs'
                : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
            }`}
          >
            <div className="font-bold text-xs">12″ × 12″</div>
            <div className="text-[9px] opacity-80">हैवी पिलर</div>
          </button>
        </div>
      </div>

      {/* Manual Dimensions */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200">
          <label className="text-[11px] font-bold text-stone-600 block mb-1">
            चौड़ाई × गहराई (इंच / Inch)
          </label>
          <div className="flex items-center gap-1">
            <input
              type="number"
              min="1"
              value={widthInches || ''}
              onChange={(e) => setWidthInches(parseFloat(e.target.value) || 0)}
              className="w-full text-base sm:text-lg font-black text-stone-900 bg-white border border-stone-300 rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-amber-500 outline-hidden text-center"
              placeholder="9"
            />
            <span className="font-bold text-stone-400">×</span>
            <input
              type="number"
              min="1"
              value={depthInches || ''}
              onChange={(e) => setDepthInches(parseFloat(e.target.value) || 0)}
              className="w-full text-base sm:text-lg font-black text-stone-900 bg-white border border-stone-300 rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-amber-500 outline-hidden text-center"
              placeholder="12"
            />
          </div>
        </div>

        <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200">
          <label className="text-[11px] font-bold text-stone-600 block mb-1">
            ऊंचाई (Feet)
          </label>
          <div className="flex items-center gap-1.5">
            <input
              type="number"
              min="1"
              value={heightFeet || ''}
              onChange={(e) => setHeightFeet(parseFloat(e.target.value) || 0)}
              className="w-full text-base sm:text-lg font-black text-stone-900 bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-amber-500 outline-hidden"
              placeholder="10"
            />
            <span className="text-xs font-bold text-stone-400">ft</span>
          </div>
        </div>
      </div>

      {/* Column Count & Concrete Grade */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200 flex flex-col justify-between">
          <label className="text-[11px] font-bold text-stone-600 block mb-1">
            कॉलमों की संख्या (Count)
          </label>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setCount(Math.max(1, count - 1))}
              className="w-8 h-8 rounded-lg bg-white border border-stone-300 hover:bg-stone-100 font-black text-stone-800 flex items-center justify-center text-sm"
            >
              -
            </button>
            <input
              type="number"
              min="1"
              value={count || ''}
              onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full text-base sm:text-lg font-black text-stone-900 bg-white border border-stone-300 rounded-lg py-1 text-center outline-hidden"
            />
            <button
              type="button"
              onClick={() => setCount(count + 1)}
              className="w-8 h-8 rounded-lg bg-white border border-stone-300 hover:bg-stone-100 font-black text-stone-800 flex items-center justify-center text-sm"
            >
              +
            </button>
          </div>
        </div>

        <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200">
          <label className="text-[11px] font-bold text-stone-600 block mb-1">
            कंक्रीट ग्रेड (Mix)
          </label>
          <div className="grid grid-cols-2 gap-1 text-xs">
            <button
              type="button"
              onClick={() => setGrade('M20')}
              className={`py-2 px-1 rounded-lg border text-center transition-all ${
                grade === 'M20'
                  ? 'bg-amber-500 text-stone-950 font-extrabold border-amber-600 shadow-2xs'
                  : 'bg-white border-stone-200 text-stone-700'
              }`}
            >
              <div className="font-bold">M20</div>
              <div className="text-[9px] opacity-80">1:1.5:3</div>
            </button>
            <button
              type="button"
              onClick={() => setGrade('M25')}
              className={`py-2 px-1 rounded-lg border text-center transition-all ${
                grade === 'M25'
                  ? 'bg-amber-500 text-stone-950 font-extrabold border-amber-600 shadow-2xs'
                  : 'bg-white border-stone-200 text-stone-700'
              }`}
            >
              <div className="font-bold">M25</div>
              <div className="text-[9px] opacity-80">1:1:2</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
