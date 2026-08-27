import React, { useRef } from 'react';
import { useTilt } from '../hooks/useTilt';

export default function HeroSection() {
  const heroCardRef = useTilt({ max: 8, scale: 1.015, speed: 400 });

  return (
    <section className="relative min-h-[88vh] flex flex-col items-center justify-center pt-8 md:pt-12 px-6 md:px-12 max-w-[1440px] mx-auto overflow-hidden">
      {/* Background Watermark in subtle luxury gold */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
        <h1 className="text-[15vw] font-serif font-black whitespace-nowrap tracking-tighter text-gold">
          THRIFT CAMPUS
        </h1>
      </div>

      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Column Editorial Typography */}
        <div className="col-span-1 lg:col-span-6 flex flex-col justify-center order-2 lg:order-1 scroll-reveal">
          <div className="mb-8">
            <div className="flex items-center gap-2.5 mb-5">
              <span className="w-8 h-[1px] bg-gold"></span>
              <span className="text-[11px] uppercase font-sans font-semibold tracking-[0.25em] text-gold">
                Archival & Sustainable
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold leading-[1.12] mb-6 text-white tracking-tight">
              CLOTHES WITHOUT EXCESS. <br />
              <span className="text-gold italic font-normal">
                ONLY STYLE.
              </span>
            </h2>

            <p className="text-base font-sans text-[#E0E0E0]/80 max-w-lg leading-relaxed mb-6">
              Modern silhouettes, natural fabrics, and honest design. For those who choose simplicity
              and quality. Thrift isn't just a choice; it's a movement toward conscious consumption
              and curated individuality.
            </p>

            {/* Curated Category Tag Spec */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-sans text-text-muted mb-8 py-3 border-y border-white/10 max-w-lg">
              <span className="text-gold font-medium">Raw Selvedge Denim</span>
              <span>•</span>
              <span>Heavy Utility Jackets</span>
              <span>•</span>
              <span className="text-[#E0E0E0]">Old Money Oxfords</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <a
              href="#curated-finds"
              className="premium-btn"
            >
              Shop Collection
              <span className="material-symbols-outlined text-base font-bold">arrow_downward</span>
            </a>
            <a
              href="#how-it-works"
              className="premium-btn-outline"
            >
              How It Works
            </a>
          </div>
        </div>

        {/* Right Column: High-Fashion Framed Editorial Box (No Dummy) */}
        <div className="col-span-1 lg:col-span-6 relative w-full order-1 lg:order-2 flex items-center justify-center">
          <div
            ref={heroCardRef}
            className="product-card w-full max-w-lg aspect-[4/5] relative rounded-sm border border-white/15 bg-[#141414] overflow-hidden shadow-2xl group cursor-pointer"
          >
            {/* Editorial Image */}
            <img
              src="https://image.hm.com/assets/hm/5a/dd/5add7d43120cb847f2161bb4062acfcd9fbd4094.jpg?imwidth=1200"
              alt="Archival Drop Editorial"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-95"
            />

            {/* Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent"></div>

            {/* Top Floating Badge */}
            <div className="absolute top-5 left-5 z-10 flex items-center gap-2">
              <span className="bg-[#0A0A0A]/90 text-gold text-[10px] font-sans font-bold uppercase tracking-wider px-3 py-1 border border-gold/30 rounded-full backdrop-blur-md">
                Drop #04 • Curated Archival
              </span>
            </div>

            {/* Bottom Callout Overlay */}
            <div className="absolute bottom-0 left-0 w-full p-6 text-white z-10">
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-[10px] uppercase font-sans tracking-widest text-text-muted block mb-1">
                    Featured Grail
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white group-hover:text-gold transition-colors">
                    Heavy Tactical Utility Parka
                  </h3>
                  <p className="text-xs text-text-muted font-sans mt-0.5">
                    Curated by Maya Chen • NYU Tisch
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-sans font-bold text-xl text-gold block">$165</span>
                  <span className="text-[10px] text-text-muted uppercase">Size L • Deadstock</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
