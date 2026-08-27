import React from 'react';

export default function MarqueeBanner() {
  const items = [
    "SUSTAINABLE ARCHIVE",
    "CAMPUS DROP",
    "ZERO-CARBON HANDOFF",
    "PEER AUTHENTICATED",
    "CURATED EDITORIALS",
    "RAW JAPANESE DENIM",
    "AVANT-GARDE SILHOUETTES"
  ];

  return (
    <div className="w-full bg-[#0E0E0E] text-gold py-4 overflow-hidden border-y border-gold/20 my-16 select-none">
      <div className="animate-marquee whitespace-nowrap flex items-center gap-12 font-sans font-medium text-xs uppercase tracking-[0.25em]">
        {items.concat(items).map((text, idx) => (
          <div key={idx} className="flex items-center gap-12">
            <span className="text-[#E0E0E0]/90 hover:text-gold transition-colors cursor-default">
              {text}
            </span>
            <span className="inline-block w-1.5 h-1.5 bg-gold rotate-45"></span>
          </div>
        ))}
      </div>
    </div>
  );
}
