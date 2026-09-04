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
      name: `Curated Archival Mystery Capsule (${selectedVibe})`,
      price: selectedTier === 'essential' ? 95 : 165,
      size: 'Custom Fitted by Curator',
      category: 'Mystery Capsule',
      imageUrl: selectedTier === 'essential'
        ? 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80'
        : 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80',
      description: `3 hand-curated pieces in the ${selectedVibe} aesthetic, inspected by verified campus tastemakers.`,
      condition: '9.8/10 Inspected',
      curator: 'Curator Collective',
      campus: 'All Campuses'
    };

    addToCart(bundleProduct);
    showToast(`Claimed ${selectedVibe} Vault Capsule! Added to bag.`, 'success');
  };

  return (
    <section id="mystery-bundle" className="py-24 px-6 md:px-12 max-w-[1440px] mx-auto bg-[#121212] text-[#DCDCDC]">
      <div className="bg-charcoal-pattern border border-[#D49A7A]/30 rounded-3xl p-8 md:p-16 shadow-2xl relative overflow-hidden">
        
        {/* Subtle Watermark Rose Gold Star */}
        <div className="absolute -right-12 -bottom-12 opacity-5 pointer-events-none select-none font-serif text-[220px] font-bold text-[#D49A7A]">
          ✦
        </div>

        <div className="max-w-3xl relative z-10">
          
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-[#D49A7A]"></span>
            <span className="text-[11px] uppercase font-sans font-bold tracking-[0.25em] text-[#D49A7A]">
              Bespoke Archival Curation
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#D49A7A] tracking-tight uppercase mb-4">
            Curated Wardrobe Capsule
          </h2>

          <p className="text-sm font-sans text-[#DCDCDC]/80 leading-relaxed mb-8">
            Define your personal aesthetic archetype. Top collegiate tastemakers and fashion students will assemble
            a bespoke collection of 3 authenticated archival garments tailored precisely to your measurements.
          </p>

          {/* Vibe Selection Pills */}
          <div className="mb-8">
            <span className="text-[11px] uppercase font-sans font-bold tracking-[0.18em] text-[#D49A7A] block mb-3.5">
              1. Select Style Archetype:
            </span>
            <div className="flex flex-wrap gap-3">
              {vibes.map((vibe) => (
                <button
                  key={vibe}
                  onClick={() => setSelectedVibe(vibe)}
                  className={`px-5 py-2.5 rounded-full text-xs font-sans font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    selectedVibe === vibe
                      ? 'bg-[#D49A7A] text-[#121212] shadow-md font-bold'
                      : 'bg-[#1A1A1A] text-[#DCDCDC]/80 hover:bg-[#222222] border border-[#D49A7A]/25'
                  }`}
                >
                  {vibe}
                </button>
              ))}
            </div>
          </div>

          {/* Curation Tier Selection */}
          <div className="mb-10">
            <span className="text-[11px] uppercase font-sans font-bold tracking-[0.18em] text-[#D49A7A] block mb-3.5">
              2. Select Curation Tier:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-xl">
              
              <div
                onClick={() => setSelectedTier('essential')}
                className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                  selectedTier === 'essential'
                    ? 'border-[#D49A7A] bg-[#1F1F1F] shadow-lg ring-1 ring-[#D49A7A]'
                    : 'border-[#D49A7A]/20 bg-[#161616] hover:border-[#D49A7A]/40'
                }`}
              >
                <div className="flex justify-between items-baseline mb-2">
                  <h4 className="font-serif font-bold text-lg text-[#FAF7F2] uppercase">Essential Vault</h4>
                  <span className="font-serif text-2xl font-bold text-[#D49A7A]">₹95</span>
                </div>
                <p className="text-xs font-sans text-[#A8A8A8] leading-relaxed">
                  3 Hand-Selected Daily Staples (Japanese Selvedge, Heavy Tee, Oversized Knit)
                </p>
              </div>

              <div
                onClick={() => setSelectedTier('grail')}
                className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                  selectedTier === 'grail'
                    ? 'border-[#D49A7A] bg-[#1F1F1F] shadow-lg ring-1 ring-[#D49A7A]'
                    : 'border-[#D49A7A]/20 bg-[#161616] hover:border-[#D49A7A]/40'
                }`}
              >
                <div className="flex justify-between items-baseline mb-2">
                  <h4 className="font-serif font-bold text-lg text-[#FAF7F2] uppercase">Archival Grail</h4>
                  <span className="font-serif text-2xl font-bold text-[#D49A7A]">₹165</span>
                </div>
                <p className="text-xs font-sans text-[#A8A8A8] leading-relaxed">
                  Includes 1 Heavy Leather / Rare Designer Piece + 2 Core Archive Essentials
                </p>
              </div>

            </div>
          </div>

          {/* Action CTA Pill Button */}
          <div>
            <button
              onClick={handleClaimBundle}
              className="btn-rosegold-pill group"
            >
              <span>CLAIM CAPSULE • ₹{selectedTier === 'essential' ? '95' : '165'}</span>
              <span className="material-symbols-outlined text-base font-bold transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
