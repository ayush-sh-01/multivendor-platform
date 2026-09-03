import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function MysteryBundle() {
  const { addToCart, showToast } = useCart();
  const [selectedVibe, setSelectedVibe] = useState('Japanese Minimalist');
  const [selectedTier, setSelectedTier] = useState('essential'); // 'essential' | 'grail'

  const vibes = [
    'Japanese Minimalist',
    'Old Money Prep',
    '90s Skater / Grunge',
    'Tactical Gorpcore'
  ];

  const handleClaimBundle = () => {
    const bundleProduct = {
      id: selectedTier === 'essential' ? 991 : 992,
      name: `Curated Mystery Bundle (${selectedVibe})`,
      price: selectedTier === 'essential' ? 95 : 165,
      size: 'Custom Sized by Curator',
      category: 'Mystery Bundle',
      imageUrl: selectedTier === 'essential'
        ? 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80'
        : 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80',
      description: `3 hand-curated pieces in the ${selectedVibe} aesthetic, inspected by verified campus tastemakers.`,
      condition: '9.5/10 Inspected',
      curator: 'Curator Collective',
      campus: 'All Campuses'
    };

    addToCart(bundleProduct);
    showToast(`Claimed ${selectedVibe} Bundle! Added to bag.`, 'success');
  };

  return (
    <section id="mystery-bundle" className="py-20 px-6 md:px-12 max-w-[1440px] mx-auto bg-[#2C4234] text-[#F4EFE6]">
      <div className="bg-[#203227] border border-[#F4EFE6]/15 rounded-xl p-8 md:p-14 shadow-2xl relative overflow-hidden">
        {/* Subtle Background Badge */}
        <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none select-none font-serif text-[180px] font-bold text-[#F4EFE6]">
          ✦
        </div>

        <div className="max-w-3xl relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-[#BA9F7A]"></span>
            <span className="text-[11px] uppercase font-sans font-bold tracking-[0.25em] text-[#BA9F7A]">
              Curator Mystery Box
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#F4EFE6] tracking-tight mb-4">
            Curated Wardrobe Box
          </h2>

          <p className="text-sm font-sans text-[#F4EFE6]/80 leading-relaxed mb-8">
            Tell us your aesthetic archetype. Top design school tastemakers will assemble
            a bespoke box of 3 garments tailored to your measurements.
          </p>

          {/* Vibe Selection Pills */}
          <div className="mb-8">
            <span className="text-xs uppercase font-sans font-bold tracking-wider text-[#BA9F7A] block mb-3">
              1. Select Style Archetype:
            </span>
            <div className="flex flex-wrap gap-2.5">
              {vibes.map((vibe) => (
                <button
                  key={vibe}
                  onClick={() => setSelectedVibe(vibe)}
                  className={`px-4 py-2 rounded-full text-xs font-sans font-medium transition-all ${
                    selectedVibe === vibe
                      ? 'bg-[#BA9F7A] text-[#203227] font-bold shadow-md'
                      : 'bg-[#24362A] text-[#F4EFE6]/80 hover:bg-[#2C4234] border border-[#F4EFE6]/15'
                  }`}
                >
                  {vibe}
                </button>
              ))}
            </div>
          </div>

          {/* Tier Selection */}
          <div className="mb-10">
            <span className="text-xs uppercase font-sans font-bold tracking-wider text-[#BA9F7A] block mb-3">
              2. Select Curation Tier:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
              <div
                onClick={() => setSelectedTier('essential')}
                className={`p-5 rounded-lg border cursor-pointer transition-all ${
                  selectedTier === 'essential'
                    ? 'border-[#BA9F7A] bg-[#24362A] shadow-md'
                    : 'border-[#F4EFE6]/10 bg-[#1E2E24] hover:border-[#F4EFE6]/30'
                }`}
              >
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-serif font-bold text-lg text-[#F4EFE6]">Essential Box</h4>
                  <span className="font-serif text-2xl font-bold text-[#F4EFE6]">$95</span>
                </div>
                <p className="text-xs font-sans text-[#F4EFE6]/70">
                  3 Curated Daily Staples (Denim, Shirts, Heavy Tee)
                </p>
              </div>

              <div
                onClick={() => setSelectedTier('grail')}
                className={`p-5 rounded-lg border cursor-pointer transition-all ${
                  selectedTier === 'grail'
                    ? 'border-[#BA9F7A] bg-[#24362A] shadow-md'
                    : 'border-[#F4EFE6]/10 bg-[#1E2E24] hover:border-[#F4EFE6]/30'
                }`}
              >
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-serif font-bold text-lg text-[#F4EFE6]">Archival Grail</h4>
                  <span className="font-serif text-2xl font-bold text-[#F4EFE6]">$165</span>
                </div>
                <p className="text-xs font-sans text-[#F4EFE6]/70">
                  Includes 1 Heavy Jacket / Rare Piece + 2 Essentials
                </p>
              </div>
            </div>
          </div>

          {/* CTA Action */}
          <div>
            <button
              onClick={handleClaimBundle}
              className="px-8 py-3.5 rounded-full bg-[#F4EFE6] text-[#18261E] hover:bg-[#FAF7F2] font-sans font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 inline-flex items-center gap-2 border border-[#F4EFE6]"
            >
              <span>CLAIM BUNDLE • ${selectedTier === 'essential' ? '95' : '165'}</span>
              <span className="material-symbols-outlined text-base font-bold">arrow_forward</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
