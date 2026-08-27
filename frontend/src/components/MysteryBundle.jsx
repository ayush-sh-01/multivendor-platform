import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function MysteryBundle() {
  const { addToCart } = useCart();
  const [selectedStyle, setSelectedStyle] = useState('avant-garde');
  const [bundleTier, setBundleTier] = useState('standard'); // 'standard' ($95) | 'archival' ($165)

  const archetypes = [
    { id: 'avant-garde', name: 'Avant-Garde & Draped', curator: 'Soren K. (Parsons)' },
    { id: 'streetwear', name: 'Tokyo 90s Streetwear', curator: 'Maya C. (NYU Tisch)' },
    { id: 'grunge', name: 'Distressed Heavy Grunge', curator: 'Julian V. (CSM)' }
  ];

  const handleAddBundle = () => {
    const activeArch = archetypes.find(a => a.id === selectedStyle);
    const isArchival = bundleTier === 'archival';

    const bundleItem = {
      id: `bundle-${Date.now()}`,
      name: `Mystery 3-Piece Bundle (${activeArch.name})`,
      price: isArchival ? 165 : 95,
      size: "Custom Profile Size",
      category: "Mystery Bundle",
      condition: isArchival ? "10/10 Rare Archival" : "9.5/10 Curated Vintage",
      curator: activeArch.curator,
      campus: "Curator Network",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCckuXRBryDAxhhcSITgQ5kTIJoGXyd2MVEOPr4HyNL8JocCj6WMFgkHu_ReuZhriAJChjch2fJs5apXibAPi_OBWQfU1O4leDQlggZdlA0YIR9-6FtaUTOZwqwBrfiAg95Ic8dTvTnJ0-6QLHAW4_vTMlDl75fmaUvIvreo92LjESMTdIAapYlxsW4Nt_OnwH8em7R9Lwl_Ck0d4pm2wK8QNVmEy2bqXV1ovZwTiOpg6uwKOeHonuazw",
      inStock: true
    };

    addToCart(bundleItem);
  };

  return (
    <section
      id="mystery-bundle"
      className="relative min-h-[85vh] flex items-center py-24 overflow-hidden bg-[#0D0D0D] border-y border-white/10 my-16"
    >
      {/* Background Image with dramatic spotlight and mix-blend */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCckuXRBryDAxhhcSITgQ5kTIJoGXyd2MVEOPr4HyNL8JocCj6WMFgkHu_ReuZhriAJChjch2fJs5apXibAPi_OBWQfU1O4leDQlggZdlA0YIR9-6FtaUTOZwqwBrfiAg95Ic8dTvTnJ0-6QLHAW4_vTMlDl75fmaUvIvreo92LjESMTdIAapYlxsW4Nt_OnwH8em7R9Lwl_Ck0d4pm2wK8QNVmEy2bqXV1ovZwTiOpg6uwKOeHonuazw"
          alt="Mystery Bundle Dark Editorial"
          className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-[#0D0D0D]/90 to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center">
        <div className="col-span-1 md:col-span-8 scroll-reveal">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-gold"></span>
            <span className="text-gold font-sans text-xs uppercase tracking-[0.25em] font-semibold">
              The Hunt • Zero Risk Guarantee
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-serif font-bold leading-none mb-6 text-white tracking-tight">
            MYSTERY <br />
            <span className="text-gold italic font-normal">BUNDLE</span>
          </h2>

          <p className="text-base font-sans text-[#E0E0E0]/80 max-w-lg mb-8 leading-relaxed">
            Let our verified campus curators hand-select a personalized 3-piece aesthetic bundle based on your style profile. High risk, high reward. Embrace the unexpected.
          </p>

          {/* Style Archetype Selector */}
          <div className="mb-8">
            <span className="text-xs font-sans uppercase tracking-wider text-text-muted block mb-3 font-semibold">
              1. Select Style Archetype:
            </span>
            <div className="flex flex-wrap gap-3">
              {archetypes.map((arch) => (
                <button
                  key={arch.id}
                  onClick={() => setSelectedStyle(arch.id)}
                  className={`px-4 py-2.5 text-xs font-sans uppercase tracking-wider rounded-sm transition-all duration-300 ${
                    selectedStyle === arch.id
                      ? 'bg-gold text-[#0A0A0A] font-bold shadow-gold'
                      : 'bg-[#141414] text-[#E0E0E0]/80 border border-white/10 hover:border-gold/40'
                  }`}
                >
                  {arch.name}
                </button>
              ))}
            </div>
          </div>

          {/* Tier Selector */}
          <div className="mb-10">
            <span className="text-xs font-sans uppercase tracking-wider text-text-muted block mb-3 font-semibold">
              2. Select Curation Tier:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
              <button
                onClick={() => setBundleTier('standard')}
                className={`p-4 rounded-sm text-left transition-all duration-300 ${
                  bundleTier === 'standard'
                    ? 'border border-gold bg-[#141414] shadow-gold'
                    : 'border border-white/10 bg-[#141414]/60 hover:border-white/25'
                }`}
              >
                <div className="font-serif font-bold text-base text-white">Standard Curation</div>
                <div className="text-xs text-gold font-sans font-bold mt-1">$95 • 3 Curated Pieces</div>
              </button>

              <button
                onClick={() => setBundleTier('archival')}
                className={`p-4 rounded-sm text-left transition-all duration-300 ${
                  bundleTier === 'archival'
                    ? 'border border-gold bg-[#141414] shadow-gold'
                    : 'border border-white/10 bg-[#141414]/60 hover:border-white/25'
                }`}
              >
                <div className="font-serif font-bold text-base text-white">Rare Archival Tier</div>
                <div className="text-xs text-gold font-sans font-bold mt-1">$165 • 3 Rare Grails</div>
              </button>
            </div>
          </div>

          {/* Add Bundle Button */}
          <button
            onClick={handleAddBundle}
            className="premium-btn py-4 px-10"
          >
            <span>Claim Mystery Bundle ({bundleTier === 'archival' ? '$165' : '$95'})</span>
            <span className="material-symbols-outlined text-base font-bold">shopping_bag</span>
          </button>
        </div>
      </div>
    </section>
  );
}
