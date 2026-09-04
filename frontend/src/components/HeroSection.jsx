import React from 'react';
import { useTilt } from '../hooks/useTilt';
import { ScalesIcon, InfinityIcon, DiamondIcon } from './LineIcons';

export default function HeroSection() {
  const cardTiltRef = useTilt({ max: 6, scale: 1.02, speed: 400 });

  return (
    <section className="relative w-full bg-[#121212] text-[#DCDCDC] overflow-hidden border-b border-[#D49A7A]/20">
      
      {/* 50/50 Split Screen Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[620px] lg:h-[calc(100vh-68px)] w-full">
        
        {/* ================= LEFT COLUMN: Dark Patterned Luxury Section ================= */}
        <div className="col-span-1 lg:col-span-6 bg-dark-luxury-pattern p-8 sm:p-12 lg:p-14 xl:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#D49A7A]/15 relative">
          
          <div>
            {/* Editorial Capsule Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1A1A1A] border border-[#D49A7A]/30 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D49A7A] animate-pulse"></span>
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.22em] text-[#D49A7A]">
                Curated Archival Edition • Drop #08
              </span>
            </div>

            {/* Impact Headline: Elegant Editorial Serif, strictly All-Caps Rose Gold */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-[3.4rem] font-bold leading-[1.05] text-[#D49A7A] tracking-tight mb-5">
              ARCHIVAL LUXURY.<br />
              DISCIPLINED TASTE.<br />
              <span className="italic font-normal text-[#E4B399]">WEAR THE VAULT.</span>
            </h1>

            {/* Sub-header in Soft Ash Off-White */}
            <p className="font-sans text-xs sm:text-[13px] font-medium tracking-[0.06em] text-[#DCDCDC]/85 max-w-lg leading-relaxed mb-8">
              An exclusive, peer-authenticated marketplace for collegiate fashion collectors. Trade rare Japanese selvedge, vintage leather, and conceptual garments directly with verified campus tastemakers.
            </p>

            {/* Value Highlights with Custom Rose Gold Thin-Line Vector Icons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8 pt-2">
              
              {/* Feature 1: Scales of Justice (Peer Verified) */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-[#1A1A1A] border border-[#D49A7A]/30 shrink-0">
                  <ScalesIcon className="w-4 h-4" color="#D49A7A" />
                </div>
                <div>
                  <h4 className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#D49A7A]">
                    Peer Verified
                  </h4>
                  <p className="font-sans text-[10px] text-[#A8A8A8] leading-normal mt-0.5">
                    Inspected and graded in person on campus.
                  </p>
                </div>
              </div>

              {/* Feature 2: Infinity Symbol (Circular Economy) */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-[#1A1A1A] border border-[#D49A7A]/30 shrink-0">
                  <InfinityIcon className="w-4 h-4" color="#D49A7A" />
                </div>
                <div>
                  <h4 className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#D49A7A]">
                    Circular Flow
                  </h4>
                  <p className="font-sans text-[10px] text-[#A8A8A8] leading-normal mt-0.5">
                    Zero transit emissions with campus hand-offs.
                  </p>
                </div>
              </div>

              {/* Feature 3: Geometric Diamond (Museum Grade) */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-[#1A1A1A] border border-[#D49A7A]/30 shrink-0">
                  <DiamondIcon className="w-4 h-4" color="#D49A7A" />
                </div>
                <div>
                  <h4 className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#D49A7A]">
                    Vault Grade
                  </h4>
                  <p className="font-sans text-[10px] text-[#A8A8A8] leading-normal mt-0.5">
                    Curated rare grails and deadstock archive pieces.
                  </p>
                </div>
              </div>

            </div>

            {/* Archival Material Index Divider */}
            <div className="pt-4 pb-6 border-t border-[#D49A7A]/15">
              <p className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-[#D49A7A]/90 flex flex-wrap gap-y-1.5 items-center">
                <span>Heavy Washed Leather</span>
                <span className="mx-2 text-[#D49A7A]/40">•</span>
                <span>14oz Japanese Selvedge</span>
                <span className="mx-2 text-[#D49A7A]/40">•</span>
                <span>Antwerp Tailoring</span>
                <span className="mx-2 text-[#D49A7A]/40">•</span>
                <span>Sculptural Wool</span>
              </p>
            </div>
          </div>

          {/* Call-to-Action Buttons (Strictly Pill-Shaped) */}
          <div className="flex flex-wrap items-center gap-5 pt-2">
            
            {/* Primary Pill Button in Rose Gold */}
            <a
              href="#curated-finds"
              className="btn-rosegold-pill group"
            >
              <span>EXPLORE THE VAULT</span>
              <span className="material-symbols-outlined text-sm font-bold transition-transform group-hover:translate-y-0.5">
                arrow_downward
              </span>
            </a>

            {/* Secondary Pill Button (Outline) */}
            <a
              href="#how-it-works"
              className="btn-outline-pill group"
            >
              <span>THE MANIFESTO</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1 font-bold">→</span>
            </a>

          </div>

        </div>

        {/* ================= RIGHT COLUMN: Full-Bleed High-Res Moody Product Photography ================= */}
        <div className="col-span-1 lg:col-span-6 relative min-h-[460px] lg:min-h-full bg-[#0D0D0D] overflow-hidden flex items-end justify-end p-6 sm:p-10">
          
          {/* Moody Studio Clothing Rack & Driftwood Organic Sculpture Imagery */}
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=85"
            alt="Moody editorial high-fashion clothing rack with artisanal textures and warm lighting"
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.12]"
          />

          {/* Warm Vignette Scrim & Rose Gold Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/95 via-[#121212]/35 to-black/30 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#121212]/60 via-transparent to-transparent pointer-events-none"></div>

          {/* Floating Pill Tag on Photographic Background */}
          <div className="absolute top-6 left-6 z-10">
            <span className="floating-pill-tag shadow-lg">
              NATURE-CORE FLEX • VAULT VERIFIED
            </span>
          </div>

          {/* ================= PHYSICAL VINTAGE SWING-TAG SPOTLIGHT CARD ================= */}
          <div
            ref={cardTiltRef}
            className="relative z-20 w-full max-w-[340px] sm:max-w-sm swing-tag-card p-6 pt-9 border border-[#3D2E24] shadow-2xl backdrop-blur-sm transform transition-all duration-300"
          >
            {/* Brass Grommet Eyelet & Whimsical Hanging String */}
            <div className="swing-tag-string"></div>
            <div className="swing-tag-eyelet"></div>

            {/* Vintage Archival Header */}
            <div className="flex justify-between items-start mb-3 border-b border-[#3D2E24]/20 pb-2.5">
              <div>
                <span className="text-[9px] uppercase font-sans font-extrabold tracking-[0.2em] text-[#3D2E24]/80 block">
                  ARCHIVAL TAG NO. 0948-JP
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold uppercase text-[#1F1713] tracking-tight leading-snug mt-0.5">
                  1998 ARCHIVAL HEAVY FLIGHT JACKET
                </h3>
              </div>
            </div>

            {/* Price & Specs Matrix */}
            <div className="grid grid-cols-2 gap-3 mb-3 bg-[#EAE2DC] p-3 rounded-lg border border-[#3D2E24]/15">
              <div>
                <span className="text-[9px] uppercase font-sans font-bold tracking-widest text-[#3D2E24]/70 block">
                  APPRAISAL
                </span>
                <span className="font-serif text-2xl font-bold text-[#1F1713]">₹280</span>
              </div>
              <div>
                <span className="text-[9px] uppercase font-sans font-bold tracking-widest text-[#3D2E24]/70 block">
                  SIZE / FIT
                </span>
                <span className="font-sans text-xs font-bold text-[#1F1713] mt-1 block">
                  Size 42 (L) • Boxy Cut
                </span>
              </div>
            </div>

            {/* Provenance & Curator Row */}
            <div className="space-y-1.5 text-[#1F1713] mb-4">
              <div className="flex items-center justify-between text-xs font-sans">
                <span className="text-[10px] uppercase font-bold text-[#3D2E24]/70">CONDITION:</span>
                <span className="font-semibold flex items-center gap-1 text-[#1F1713]">
                  <span>9.8/10 Collector Grade</span>
                  <span className="text-[#8C5F45]">✓</span>
                </span>
              </div>
              <div className="flex items-center justify-between text-xs font-sans">
                <span className="text-[10px] uppercase font-bold text-[#3D2E24]/70">CURATOR:</span>
                <span className="font-medium text-[#1F1713]">
                  Julian V. • RISD Fashion
                </span>
              </div>
            </div>

            {/* Action Pill Button inside the Swing Tag */}
            <a
              href="#curated-finds"
              className="w-full btn-parchment-pill text-center justify-center py-2.5 bg-[#1F1713] text-[#F2EBE5] hover:bg-[#3D2E24] hover:text-white border-none shadow-md"
            >
              <span>INSPECT IN LIVE VAULT</span>
              <span className="text-xs">→</span>
            </a>

          </div>

        </div>

      </div>

    </section>
  );
}
