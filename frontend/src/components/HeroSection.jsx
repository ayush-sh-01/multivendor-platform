import React from 'react';
import { useTilt } from '../hooks/useTilt';

export default function HeroSection() {
  const cardTiltRef = useTilt({ max: 6, scale: 1.015, speed: 400 });

  return (
    <section className="relative w-full bg-[#2C4234] text-[#F4EFE6] overflow-hidden">
      {/* 50/50 Split Grid on Desktop, Fitting Viewport Gracefully */}
      <div className="grid grid-cols-1 lg:grid-cols-12 lg:h-[calc(100vh-49px-33px)] min-h-[580px] w-full">
        {/* ================= LEFT COLUMN (Forest Green Content) ================= */}
        <div className="col-span-1 lg:col-span-6 bg-[#2C4234] p-6 sm:p-8 lg:p-10 xl:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#F4EFE6]/10">
          <div>
            {/* Main Headline (High-Contrast Serif, Pale Cream, Clean & Proportional) */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-[3.25rem] font-bold leading-[1.04] text-[#F4EFE6] tracking-tight mb-4 whitespace-pre-line">
              RETAIL{"\n"}
              IS DEAD.{"\n"}
              WEAR{"\n"}
              <span className="italic font-normal text-[#BA9F7A]">ARCHIVE.</span>
            </h1>

            {/* Sub-headline (Sans-serif, Muted Brass, Uppercase, Clean) */}
            <p className="font-sans text-xs sm:text-[12px] font-semibold uppercase tracking-[0.14em] text-[#BA9F7A] max-w-xl leading-relaxed mb-6">
              PREMIUM PRE-OWNED FASHION, AUTHENTICATED AND PRICED FOR THE STUDENT BUDGET...
            </p>

            {/* Trust Badges (3-Column Mini Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 pt-1">
              {/* Badge 1: Verification */}
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#BA9F7A] text-xl shrink-0 mt-0.5">
                  verified_user
                </span>
                <div>
                  <h4 className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#F4EFE6]">
                    Peer Verified
                  </h4>
                  <p className="font-sans text-[10px] text-[#F4EFE6]/70 leading-tight mt-0.5">
                    Authenticity inspected on campus.
                  </p>
                </div>
              </div>

              {/* Badge 2: Zero Waste */}
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#BA9F7A] text-xl shrink-0 mt-0.5">
                  recycling
                </span>
                <div>
                  <h4 className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#F4EFE6]">
                    Circular Flow
                  </h4>
                  <p className="font-sans text-[10px] text-[#F4EFE6]/70 leading-tight mt-0.5">
                    Zero carbon campus hand-offs.
                  </p>
                </div>
              </div>

              {/* Badge 3: Student Powered */}
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#BA9F7A] text-xl shrink-0 mt-0.5">
                  school
                </span>
                <div>
                  <h4 className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#F4EFE6]">
                    Zero Fee
                  </h4>
                  <p className="font-sans text-[10px] text-[#F4EFE6]/70 leading-tight mt-0.5">
                    100% earnings to students.
                  </p>
                </div>
              </div>
            </div>

            {/* Category Tags with Divider */}
            <div className="pt-3 pb-6 border-t border-[#F4EFE6]/15">
              <p className="font-sans text-[11px] sm:text-xs text-[#BA9F7A] leading-relaxed flex flex-wrap gap-y-1 items-center">
                <span>Raw Selvedge Denim</span>
                <span className="mx-1.5 text-[#BA9F7A]/60">•</span>
                <span>Heavy Utility Jackets</span>
                <span className="mx-1.5 text-[#BA9F7A]/60">•</span>
                <span>Old Money Oxfords</span>
                <span className="mx-1.5 text-[#BA9F7A]/60">•</span>
                <span>Authenticated Streetwear</span>
              </p>
            </div>
          </div>

          {/* Call To Action Row */}
          <div className="flex flex-wrap items-center gap-5 pt-1">
            {/* Primary Button */}
            <a
              href="#curated-finds"
              className="premium-btn py-2.5 px-6 text-xs"
            >
              <span>SHOP COLLECTION</span>
              <span className="material-symbols-outlined text-sm font-bold">arrow_downward</span>
            </a>

            {/* Secondary Link */}
            <a
              href="#how-it-works"
              className="font-sans text-xs uppercase tracking-[0.14em] font-semibold text-[#BA9F7A] hover:text-[#F4EFE6] transition-colors flex items-center gap-1"
            >
              <span>See How It Works</span>
              <span className="text-xs">→</span>
            </a>
          </div>
        </div>

        {/* ================= RIGHT COLUMN (Photographic Background + Floating Card) ================= */}
        <div className="col-span-1 lg:col-span-6 relative min-h-[420px] sm:min-h-[480px] lg:min-h-full bg-[#203227] overflow-hidden flex items-end justify-end p-6 sm:p-8 lg:p-10">
          {/* Photographic Background */}
          <img
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1600&q=85"
            alt="Warm styled dorm space with clothing rack and canvas backpack"
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.05]"
          />

          {/* Subtle Warm Vignette Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#203227]/90 via-[#203227]/25 to-transparent pointer-events-none"></div>

          {/* Top Tag Pill on Photographic Visual */}
          <div className="absolute top-5 left-5 z-10">
            <span className="bg-[#2C4234]/90 text-[#BA9F7A] text-[9px] font-sans font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-[#BA9F7A]/30 backdrop-blur-md">
              Drop #04 • Curated Archival
            </span>
          </div>

          {/* ================= FLOATING ACCENT CARD (Terracotta #B56653) ================= */}
          <div
            ref={cardTiltRef}
            className="relative z-20 w-full max-w-[320px] sm:max-w-sm bg-[#B56653] text-[#F4EFE6] p-5 sm:p-6 rounded-lg shadow-2xl border border-white/20 backdrop-blur-sm transform transition-all duration-300"
          >
            {/* Title: Serif Bold */}
            <h3 className="font-serif text-base sm:text-lg font-bold uppercase text-white tracking-wide mb-2.5 leading-snug">
              HEAVY TACTICAL UTILITY PARKA
            </h3>

            {/* Price Box */}
            <div className="mb-2.5">
              <span className="text-[9px] uppercase font-sans font-semibold tracking-widest text-[#F4EFE6]/80 block">
                PRICE
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="font-serif text-2xl font-bold text-white">$165</span>
                <span className="text-xs font-sans text-[#F4EFE6]/90 font-medium">• Size: L</span>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-[#F4EFE6]/20 my-2"></div>

            {/* Condition Box */}
            <div className="mb-2.5">
              <span className="text-[9px] uppercase font-sans font-semibold tracking-widest text-[#F4EFE6]/80 block">
                CONDITION
              </span>
              <p className="font-sans text-xs font-semibold text-white mt-0.5 flex items-center gap-1">
                <span>Deadstock</span>
                <span className="text-[#F4EFE6] text-xs">✓</span>
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-[#F4EFE6]/20 my-2"></div>

            {/* Curator Box */}
            <div>
              <span className="text-[9px] uppercase font-sans font-semibold tracking-widest text-[#F4EFE6]/80 block">
                CURATOR INFO
              </span>
              <p className="font-sans text-[11px] font-medium text-[#F4EFE6] mt-0.5 flex items-center gap-1">
                <span>Curated by Maya Chen • NYU Tisch</span>
                <span className="text-white text-xs font-bold">✓</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM FOOTER BAR ================= */}
      <div className="w-full bg-[#203227] border-t border-[#F4EFE6]/10 py-2 px-6 text-center">
        <p className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-semibold text-[#F4EFE6]">
          OVER 10,000+ CURATED PIECES IN STUDENT WARDROBES • VERIFIED CAMPUS COMMUNITY
        </p>
      </div>
    </section>
  );
}
