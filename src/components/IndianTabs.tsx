import React from 'react';
import { IndianWorkType } from '../types';

interface IndianTabsProps {
  activeTab: IndianWorkType;
  onChange: (tab: IndianWorkType) => void;
}

export const IndianTabs: React.FC<IndianTabsProps> = ({ activeTab, onChange }) => {
  const tabs: { id: IndianWorkType; label: string }[] = [
    { id: 'slab', label: 'छत (Slab)' },
    { id: 'brickwork', label: 'दीवार (Brick)' },
    { id: 'plaster', label: 'प्लास्टर' },
    { id: 'column', label: 'कॉलम / पिलर' },
    { id: 'flooring', label: 'फर्श (Floor)' },
  ];

  return (
    <div className="bg-white border-b border-stone-200 sticky top-12.5 z-20">
      <div className="max-w-xl mx-auto px-2 py-1.5 flex items-center justify-between gap-1 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={`flex-1 min-w-[65px] py-1.5 px-2 rounded-lg text-xs text-center transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-amber-500 text-stone-950 font-extrabold shadow-2xs'
                  : 'text-stone-600 hover:text-stone-950 hover:bg-stone-100 font-medium'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
