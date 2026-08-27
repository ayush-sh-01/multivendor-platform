import React from 'react';

export default function MarqueeBanner() {
  const items = [
    'ZERO-CARBON CAMPUS HAND-OFFS',
    'ARCHIVAL JAPANESE DENIM',
    'PEER-AUTHENTICATED DROPS',
    '100% STUDENT PROCEEDS',
    'NO PLASTIC PACKAGING',
    'DEADSTOCK VINTAGE FINDS'
  ];

  return (
    <div className="w-full bg-[#203227] border-y border-[#F4EFE6]/10 py-3 overflow-hidden select-none">
      <div className="animate-marquee whitespace-nowrap flex items-center">
        {items.concat(items).map((item, idx) => (
          <div key={idx} className="flex items-center mx-6">
            <span className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-[#F4EFE6]">
              {item}
            </span>
            <span className="text-[#BA9F7A] text-xs ml-6">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
