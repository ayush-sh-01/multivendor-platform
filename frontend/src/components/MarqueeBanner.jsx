import React from 'react';

export default function MarqueeBanner() {
  const items = [
    'CURATED ARCHIVAL LUXURY',
    'VERIFIED STUDENT PROVENANCE',
    'ZERO DELIVERY FOOTPRINT',
    'JAPANESE SELVEDGE & HEAVY LEATHER',
    'AUTHENTICATED CAMPUS VAULTS',
    '100% EARNINGS TO STUDENT CURATORS',
    'CIRCULAR WARDROBE CULTURE',
    'DEADSTOCK ARCHIVE DROPS'
  ];

  return (
    <div className="w-full bg-[#121212] border-y border-[#D49A7A]/20 py-2.5 overflow-hidden select-none relative z-20">
      <div className="animate-marquee whitespace-nowrap flex items-center">
        {items.concat(items).map((item, idx) => (
          <div key={idx} className="flex items-center mx-6 sm:mx-8">
            <span className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-[#DCDCDC]/90 hover:text-[#D49A7A] transition-colors">
              {item}
            </span>
            <span className="text-[#D49A7A] text-[10px] ml-6 sm:ml-8 select-none">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
