import React, { useState } from 'react';
import { IndianCalculationResult } from '../types';
import {
  Share2,
  Copy,
  Check,
  Package,
  Truck,
  IndianRupee,
  Droplets,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface IndianResultCardProps {
  result: IndianCalculationResult;
  onOpenRates: () => void;
}

export const IndianResultCard: React.FC<IndianResultCardProps> = ({
  result,
  onOpenRates,
}) => {
  const [copied, setCopied] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);

  // WhatsApp formatted text
  const generateShareText = () => {
    return `📋 *सामग्री का हिसाब (Material Estimate)*
📌 *कार्य:* ${result.title}
📐 *साइज:* ${result.dimensionsSummary}
----------------------------------------
🧱 *सीमेंट (Cement):* ${result.cementBags} बोरी (50 kg Bags)
⏳ *रेती (Sand):* ${result.sandCft} CFT (${result.sandBrass} ब्रास / ~${result.sandTrolleys} ट्रॉली)
${
  result.aggregateCft > 0
    ? `🪨 *गिट्टी (Aggregate):* ${result.aggregateCft} CFT (${result.aggregateBrass} ब्रास / ~${result.aggregateTrolleys} ट्रॉली)\n`
    : ''
}${
      result.brickCount && result.brickCount > 0
        ? `🧱 *ईंट (Bricks):* ${result.brickCount.toLocaleString('en-IN')} ईंट\n`
        : ''
    }💧 *पानी (Water):* ~${result.waterLiters} लीटर (~${result.waterBuckets} बाल्टी)
----------------------------------------
💰 *अनुमानित खर्च:* ₹${result.totalCost.toLocaleString('en-IN')}
----------------------------------------
_सीमेंट कैलकुलेटर (Indian Construction)_`;
  };

  const handleCopy = () => {
    const text = generateShareText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(generateShareText());
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const fmt = (num: number) => num.toLocaleString('en-IN');

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
      {/* 1. Primary Highlight: Cement Bags Needed */}
      <div className="p-4 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-white border-b border-amber-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-black shadow-xs shrink-0">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wide text-amber-900 block">
              सीमेंट की जरूरत
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl sm:text-4xl font-black text-stone-950">
                {result.cementBags}
              </span>
              <span className="text-sm sm:text-base font-bold text-amber-950">
                बोरी (Bags)
              </span>
            </div>
          </div>
        </div>

        <div className="text-right text-xs">
          <div className="font-bold text-stone-700">
            {fmt(result.cementWeightKg)} kg
          </div>
          <div className="text-[11px] text-stone-500">
            ({(result.cementWeightKg / 100).toFixed(1)} क्विंटल)
          </div>
        </div>
      </div>

      {/* 2. Core Materials Grid (Sand, Gitti / Bricks) */}
      <div className="p-3.5 space-y-2.5">
        <div className="grid grid-cols-2 gap-2.5">
          {/* Sand Card */}
          <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-stone-700">रेती / बालू</span>
              <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-bold">
                {result.sandBrass} ब्रास
              </span>
            </div>
            <div className="text-xl font-black text-stone-900 mt-1">
              {fmt(result.sandCft)} <span className="text-xs font-bold text-stone-500">CFT</span>
            </div>
            <div className="text-[11px] text-stone-500 mt-0.5 flex items-center gap-1">
              <Truck className="w-3 h-3 text-stone-400" />
              <span>≈ {result.sandTrolleys} ट्रैक्टर ट्रॉली</span>
            </div>
          </div>

          {/* Aggregate or Bricks Card */}
          {result.aggregateCft > 0 ? (
            <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-stone-700">गिट्टी</span>
                <span className="text-[10px] bg-stone-200 text-stone-800 px-1.5 py-0.5 rounded font-bold">
                  {result.aggregateBrass} ब्रास
                </span>
              </div>
              <div className="text-xl font-black text-stone-900 mt-1">
                {fmt(result.aggregateCft)} <span className="text-xs font-bold text-stone-500">CFT</span>
              </div>
              <div className="text-[11px] text-stone-500 mt-0.5 flex items-center gap-1">
                <Truck className="w-3 h-3 text-stone-400" />
                <span>≈ {result.aggregateTrolleys} ट्रैक्टर ट्रॉली</span>
              </div>
            </div>
          ) : result.brickCount ? (
            <div className="bg-rose-50/70 p-3 rounded-xl border border-rose-200">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-rose-900">ईंट (Bricks)</span>
                <span className="text-[10px] bg-rose-200/80 text-rose-950 px-1.5 py-0.5 rounded font-bold">
                  +5% वेस्ट
                </span>
              </div>
              <div className="text-xl font-black text-rose-950 mt-1">
                {fmt(result.brickCount)} <span className="text-xs font-bold text-rose-800">नग</span>
              </div>
              <div className="text-[11px] text-rose-700 mt-0.5">
                लागत: ₹{fmt(result.brickCost)}
              </div>
            </div>
          ) : (
            <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 flex flex-col justify-center">
              <span className="text-xs font-bold text-stone-500">गिट्टी (Aggregate)</span>
              <span className="text-xs text-stone-400 mt-1">जरूरत नहीं</span>
            </div>
          )}
        </div>

        {/* Water Requirement (Compact) */}
        <div className="bg-stone-50 px-3 py-2 rounded-xl border border-stone-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Droplets className="w-3.5 h-3.5 text-sky-600" />
            <span className="text-stone-600">पानी:</span>
            <strong className="text-stone-900">
              ~{fmt(result.waterLiters)} L ({result.waterBuckets} बाल्टी)
            </strong>
          </div>
          <button
            type="button"
            onClick={onOpenRates}
            className="text-[11px] text-amber-700 hover:text-amber-800 font-bold flex items-center gap-0.5"
          >
            <IndianRupee className="w-3 h-3" />
            रेट बदलें
          </button>
        </div>

        {/* Estimated Cost Summary Bar */}
        <div className="bg-stone-900 text-white p-3 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 block">
                अनुमानित खर्च (Approx. Cost)
              </span>
              <div className="text-2xl font-black text-amber-400 mt-0.5">
                ₹ {fmt(result.totalCost)}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowBreakdown(!showBreakdown)}
              className="text-xs bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold px-2.5 py-1.5 rounded-lg border border-stone-700 flex items-center gap-1 transition-colors"
            >
              <span>{showBreakdown ? 'विवरण छिपाएं' : 'खर्च का विवरण'}</span>
              {showBreakdown ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Expandable Breakdown */}
          {showBreakdown && (
            <div className="mt-2.5 pt-2.5 border-t border-stone-800 text-xs space-y-1 text-stone-300">
              <div className="flex justify-between">
                <span>सीमेंट ({result.cementBags} बोरी):</span>
                <span className="font-bold">₹{fmt(result.cementCost)}</span>
              </div>
              <div className="flex justify-between">
                <span>रेती ({result.sandCft} CFT):</span>
                <span className="font-bold">₹{fmt(result.sandCost)}</span>
              </div>
              {result.aggregateCost > 0 && (
                <div className="flex justify-between">
                  <span>गिट्टी ({result.aggregateCft} CFT):</span>
                  <span className="font-bold">₹{fmt(result.aggregateCost)}</span>
                </div>
              )}
              {result.brickCost > 0 && (
                <div className="flex justify-between">
                  <span>ईंटें:</span>
                  <span className="font-bold">₹{fmt(result.brickCost)}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons: WhatsApp & Copy */}
        <div className="grid grid-cols-2 gap-2 pt-0.5">
          <button
            type="button"
            onClick={handleWhatsApp}
            className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-2xs transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>व्हाट्सएप पर भेजें</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="w-full py-2.5 px-3 bg-stone-100 hover:bg-stone-200 active:bg-stone-300 text-stone-800 rounded-xl font-bold text-xs flex items-center justify-center gap-2 border border-stone-300 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-bold">कॉपी हो गया!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-stone-600" />
                <span>कॉपी करें</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
