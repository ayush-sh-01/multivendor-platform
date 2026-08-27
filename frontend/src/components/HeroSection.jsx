import React from 'react';
import { useTilt } from '../hooks/useTilt';

export default function HeroSection() {
  const cardTiltRef = useTilt({ max: 6, scale: 1.02, speed: 400 });

  return (
    <section className="relative w-full bg-[#2C4234] text-[#F4EFE6] overflow-hidden">
      {/* 50/50 Split Grid on Desktop, Stack on Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-65px)] w-full">
        {/* ================= LEFT COLUMN (Forest Green Content) ================= */}
        <div className="col-span-1 lg:col-span-6 bg-[#2C4234] p-8 sm:p-12 lg:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#F4EFE6]/10">
          <div>
            {/* Main Headline (High-Contrast Serif, Pale Cream, Very Large, Bold) */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.08] text-[#F4EFE6] tracking-tight mb-5 whitespace-pre-line">
              CURATED CAMPUS.{"\n"}
              SUSTAINABLE STYLE.{"\n"}
              <span className="italic font-normal text-[#BA9F7A]">YOURS.</span>
            </h1>

            {/* Sub-headline (Sans-serif, Muted Brass, Uppercase, Medium Size) */}
            <p className="font-sans text-sm sm:text-base font-semibold uppercase tracking-[0.18em] text-[#BA9F7A] max-w-xl leading-relaxed mb-8">
              AUTHENTICATED ARCHIVAL PIECES FOR THE CONSCIOUS STUDENT WARDROBE.
            </p>

            {/* Trust Badges (3-Column Mini Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8 pt-2">
              {/* Badge 1: Verification */}
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#BA9F7A] text-2xl shrink-0 mt-0.5">
                  verified_user
                </span>
                <div>
                  <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-[#F4EFE6]">
                    Peer Verified
                  </h4>
                  <p className="font-sans text-[11px] text-[#F4EFE6]/70 leading-normal mt-0.5">
                    Authenticity inspected by campus curators.
                  </p>
                </div>
              </div>

              {/* Badge 2: Zero Waste */}
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#BA9F7A] text-2xl shrink-0 mt-0.5">
                  recycling
                </span>
                <div>
                  <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-[#F4EFE6]">
                    Circular Flow
                  </h4>
                  <p className="font-sans text-[11px] text-[#F4EFE6]/70 leading-normal mt-0.5">
                    Zero carbon campus hand-offs.
                  </p>
                </div>
              </div>

              {/* Badge 3: Student Powered */}
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#BA9F7A] text-2xl shrink-0 mt-0.5">
                  school
                </span>
                <div>
                  <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-[#F4EFE6]">
                    Zero Fee
                  </h4>
                  <p className="font-sans text-[11px] text-[#F4EFE6]/70 leading-normal mt-0.5">
                    100% profit returned directly to students.
                  </p>
                </div>
              </div>
            </div>

            {/* Category Tags with Divider */}
            <div className="pt-4 pb-8 border-t border-[#F4EFE6]/15">
              <p className="font-sans text-xs sm:text-[13px] text-[#BA9F7A] leading-relaxed flex flex-wrap gap-y-1 items-center">
                <span>Raw Selvedge Denim</span>
                <span className="mx-2 text-[#BA9F7A]/60">•</span>
                <span>Heavy Utility Jackets</span>
                <span className="mx-2 text-[#BA9F7A]/60">•</span>
                <span>Old Money Oxfords</span>
                <span className="mx-2 text-[#BA9F7A]/60">•</span>
                <span>Authenticated Streetwear</span>
              </p>
            </div>
          </div>

          {/* Call To Action Row */}
          <div className="flex flex-wrap items-center gap-6 pt-2">
            {/* Primary Button: Rounded pill shape, Pale Cream bg, Terracotta text, bold */}
            <a
              href="#curated-finds"
              className="premium-btn"
            >
              <span>SHOP COLLECTION</span>
              <span className="material-symbols-outlined text-base font-bold">arrow_downward</span>
            </a>

            {/* Secondary Link: Plain text next to button, Muted Brass */}
            <a
              href="#how-it-works"
              className="font-sans text-xs uppercase tracking-[0.15em] font-semibold text-[#BA9F7A] hover:text-[#F4EFE6] transition-colors flex items-center gap-1"
            >
              <span>See How It Works</span>
              <span className="text-sm">→</span>
            </a>
          </div>
        </div>

        {/* ================= RIGHT COLUMN (Photographic Dorm / Rack Background + Floating Card) ================= */}
        <div className="col-span-1 lg:col-span-6 relative min-h-[480px] sm:min-h-[580px] lg:min-h-full bg-[#203227] overflow-hidden flex items-end justify-end p-6 sm:p-10 lg:p-12">
          {/* Photographic Background: Styled warm-toned dorm room / common area clothing rack */}
          <img
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1600&q=85"
            alt="Warm styled dorm space with clothing rack and canvas backpack"
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.05]"
          />

          {/* Subtle Warm Vignette Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#203227]/90 via-[#203227]/25 to-transparent pointer-events-none"></div>

          {/* Top Tag Pill on Photographic Visual */}
          <div className="absolute top-6 left-6 z-10">
            <span className="bg-[#2C4234]/90 text-[#BA9F7A] text-[10px] font-sans font-bold uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full border border-[#BA9F7A]/30 backdrop-blur-md">
              Drop #04 • Curated Archival
            </span>
          </div>

          {/* ================= FLOATING ACCENT CARD (Terracotta #B56653) ================= */}
          <div
            ref={cardTiltRef}
            className="relative z-20 w-full max-w-sm bg-[#B56653] text-[#F4EFE6] p-7 md:p-8 rounded-lg shadow-2xl border border-white/20 backdrop-blur-sm transform transition-all duration-300"
          >
            {/* Title: Serif Bold */}
            <h3 className="font-serif text-xl sm:text-2xl font-bold uppercase text-white tracking-wide mb-4 leading-snug">
              HEAVY TACTICAL UTILITY PARKA
            </h3>

            {/* Price Box */}
            <div className="mb-4">
              <span className="text-[10px] uppercase font-sans font-semibold tracking-widest text-[#F4EFE6]/80 block">
                PRICE
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="font-serif text-3xl font-bold text-white">$165</span>
                <span className="text-xs font-sans text-[#F4EFE6]/90 font-medium">• Size: L</span>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-[#F4EFE6]/20 my-3"></div>

            {/* Condition Box */}
            <div className="mb-4">
              <span className="text-[10px] uppercase font-sans font-semibold tracking-widest text-[#F4EFE6]/80 block">
                CONDITION
              </span>
              <p className="font-sans text-sm font-semibold text-white mt-0.5 flex items-center gap-1.5">
                <span>Deadstock</span>
                <span className="text-[#F4EFE6] text-xs">✓</span>
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-[#F4EFE6]/20 my-3"></div>

            {/* Curator Box */}
            <div>
              <span className="text-[10px] uppercase font-sans font-semibold tracking-widest text-[#F4EFE6]/80 block">
                CURATOR INFO
              </span>
              <p className="font-sans text-xs sm:text-[13px] font-medium text-[#F4EFE6] mt-0.5 flex items-center gap-1">
                <span>Curated by Maya Chen • NYU Tisch</span>
                <span className="text-white text-xs font-bold">✓</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM FOOTER BAR ================= */}
      <div className="w-full bg-[#203227] border-t border-[#F4EFE6]/10 py-3.5 px-6 text-center">
        <p className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-[#F4EFE6]">
          OVER 10,000+ CURATED PIECES IN STUDENT WARDROBES • VERIFIED CAMPUS COMMUNITY
        </p>
      </div>
    </section>
  );
}
