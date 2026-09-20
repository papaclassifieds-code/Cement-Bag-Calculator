import React from 'react';
import { X, Truck, Package, HelpCircle } from 'lucide-react';

interface TrolleyGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrolleyGuideModal: React.FC<TrolleyGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-amber-500 text-stone-950 rounded-lg">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-stone-100">
                ब्रास, ट्रॉली व सीएफटी गाइड
              </h2>
              <p className="text-[11px] text-stone-400">
                साइट पर सामग्री नापने की आम इकाइयां (Site Units)
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

        {/* Content */}
        <div className="p-4 space-y-3 text-xs text-stone-700 leading-relaxed">
          {/* 1 Brass Card */}
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
            <h3 className="font-extrabold text-amber-950 text-sm mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-600 inline-block" />
              1 ब्रास (Brass) कितना होता है?
            </h3>
            <ul className="list-disc list-inside space-y-1 text-stone-800 mt-1">
              <li><strong>1 ब्रास = 100 CFT</strong> (घन फीट)</li>
              <li>1 ब्रास = <strong>2.83 घन मीटर (m³)</strong></li>
              <li>महाराष्ट्र, गुजरात, राजस्थान, एमपी में रेत-गिट्टी ब्रास में बिकती है।</li>
            </ul>
          </div>

          {/* Trolley Card */}
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
            <h3 className="font-extrabold text-stone-900 text-sm mb-1 flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-stone-600" />
              ट्रैक्टर ट्रॉली और डम्पर का माप
            </h3>
            <ul className="list-disc list-inside space-y-1 text-stone-700 mt-1">
              <li><strong>1 साधारण ट्रैक्टर ट्रॉली</strong> ≈ 90 से 110 CFT (लगभग <strong>1 ब्रास</strong>)</li>
              <li><strong>1 डम्पर (6-चक्का)</strong> ≈ 300 से 400 CFT (लगभग <strong>3 से 4 ब्रास</strong>)</li>
              <li><strong>1 बड़ा डम्पर (10-चक्का)</strong> ≈ 600 से 800 CFT (लगभग <strong>6 से 8 ब्रास</strong>)</li>
            </ul>
          </div>

          {/* Cement Bag Card */}
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
            <h3 className="font-extrabold text-stone-900 text-sm mb-1 flex items-center gap-1.5">
              <Package className="w-4 h-4 text-stone-600" />
              सीमेंट की 1 बोरी (50 kg Bag)
            </h3>
            <ul className="list-disc list-inside space-y-1 text-stone-700 mt-1">
              <li>1 बोरी का वजन = <strong>50 किलोग्राम</strong></li>
              <li>1 बोरी का आयतन = <strong>1.226 CFT (0.0347 m³)</strong></li>
              <li>1 घन मीटर (m³) में = <strong>28.8 बोरी</strong> सीमेंट होता है</li>
              <li>1 बोरी के लिए पानी = लगभग <strong>25 से 28 लीटर (1.5 बाल्टी)</strong></li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-xl transition-colors"
          >
            समझ गया (Got It)
          </button>
        </div>
      </div>
    </div>
  );
};
