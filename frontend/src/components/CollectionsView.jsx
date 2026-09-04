import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { DiamondIcon, TagIcon } from './LineIcons';

const ARCHIVAL_DROPS = [
  {
    id: 801,
    dropNumber: 'DROP 09',
    title: 'Tokyo Avant-Garde & Raw Selvedge Study',
    curator: 'Kenji S. • Rhode Island School of Design',
    era: 'Late 1990s',
    piecesCount: 14,
    coverImage: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=80',
    description: 'A disciplined exploration of dark indigo dyes, Shuttle-loomed 16oz denim, and asymmetrical deconstructed tailoring sourced from Tokyo secondary vaults.',
    featuredItems: [
      { name: '1997 Deconstructed Indigo Selvedge Jacket', price: 295, condition: 'Deadstock 9.9/10', size: 'L' },
      { name: 'Double-Pleated Raw Selvedge Trousers', price: 185, condition: 'Pristine 9.5/10', size: '32/34' }
    ]
  },
  {
    id: 802,
    dropNumber: 'DROP 10',
    title: 'Tuscan Saddle Leather & Sculptural Outerwear',
    curator: 'Elena Rossi • Parsons School of Design',
    era: 'Early 2000s',
    piecesCount: 9,
    coverImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
    description: 'Heavyweight hand-buffed calfskin, raw brass hardware, and unstructured drop-shoulder silhouettes reflecting organic sculptural minimalism.',
    featuredItems: [
      { name: 'Heavy Distressed Saddle Leather Flight Coat', price: 340, condition: 'Collector Grade 9.7/10', size: '42' },
      { name: 'Brushed Mohair & Wool Asymmetrical Overcoat', price: 260, condition: 'Archival 9.6/10', size: 'M' }
    ]
  },
  {
    id: 803,
    dropNumber: 'DROP 11',
    title: 'Belgian Radical Tailoring & Uniformity',
    curator: 'Marcus Vance • Royal Academy / Columbia',
    era: '2001 - 2004',
    piecesCount: 11,
    coverImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
    description: 'Sharp razor lapels, washed canvas utilitarian field vests, and architectural trench coats inspected and certified by Antwerp alumni.',
    featuredItems: [
      { name: 'Structured Wool Multi-Pocket Safari Blazer', price: 230, condition: 'Pristine 9.5/10', size: '40R' },
      { name: 'Overdyed Waxed Canvas Field Overcoat', price: 275, condition: 'Vintage 9.4/10', size: 'XL' }
    ]
  }
];

export default function CollectionsView() {
  const { addToCart, showToast } = useCart();
  const { setQuickViewProduct } = useProducts();
  const [selectedEra, setSelectedEra] = useState('All');

  const eras = ['All', 'Late 1990s', 'Early 2000s', '2001 - 2004'];

  const filteredDrops = selectedEra === 'All'
    ? ARCHIVAL_DROPS
    : ARCHIVAL_DROPS.filter(drop => drop.era === selectedEra);

  const handleAcquire = (item, drop) => {
    const productItem = {
      id: Math.floor(Math.random() * 8000) + 1000,
      name: item.name,
      price: item.price,
      size: item.size,
      category: 'Archival Vault Drop',
      imageUrl: drop.coverImage,
      description: `Curated drop piece from ${drop.title}. Inspected and authenticated.`,
      condition: item.condition,
      curator: drop.curator,
      campus: 'Vault Collection'
    };
    addToCart(productItem);
    showToast(`Added ${item.name} to Archival Bag`, 'success');
  };

  return (
    <div className="w-full bg-[#121212] text-[#DCDCDC] min-h-screen">
      
      {/* Header Banner */}
      <section className="bg-dark-luxury-pattern py-20 px-6 md:px-12 border-b border-[#D49A7A]/20">
        <div className="max-w-[1440px] mx-auto">
          
          <div className="flex items-center gap-2 mb-3">
            <DiamondIcon className="w-4 h-4" color="#D49A7A" />
            <span className="text-[11px] uppercase font-sans font-bold tracking-[0.25em] text-[#D49A7A]">
              Exclusive Vault Capsules
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#D49A7A] uppercase tracking-tight mb-4">
            Archival Collections
          </h1>

          <p className="font-sans text-sm sm:text-base text-[#DCDCDC]/80 max-w-2xl leading-relaxed mb-8">
            Themed archival capsules curated by senior fashion scholars and verified collectors. Each piece represents an era-defining moment in textile innovation and silhouette design.
          </p>

          {/* Era Filter Pills */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs uppercase font-sans font-bold tracking-wider text-[#D49A7A] mr-2">
              Filter by Era:
            </span>
            {eras.map((era) => (
              <button
                key={era}
                onClick={() => setSelectedEra(era)}
                className={`px-5 py-2 rounded-full text-xs font-sans font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  selectedEra === era
                    ? 'bg-[#D49A7A] text-[#121212] font-bold shadow-md'
                    : 'bg-[#1A1A1A] text-[#DCDCDC]/75 hover:text-[#D49A7A] border border-[#D49A7A]/25'
                }`}
              >
                {era}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Archival Drops Editorial Grid */}
      <section className="py-20 px-6 md:px-12 max-w-[1440px] mx-auto space-y-20">
        {filteredDrops.map((drop, idx) => (
          <div
            key={drop.id}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center bg-[#161616] rounded-3xl p-8 sm:p-12 border border-[#D49A7A]/20 shadow-2xl ${
              idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Split Media Column */}
            <div className="col-span-1 lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#D49A7A]/25 shadow-lg group">
              <img
                src={drop.coverImage}
                alt={drop.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.85] contrast-[1.08]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/90 via-transparent to-black/20 pointer-events-none" />

              {/* Floating Tag Pill (Parchment bg) */}
              <div className="absolute top-4 left-4 z-10">
                <span className="floating-pill-tag">
                  {drop.dropNumber} • {drop.era}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 z-10">
                <span className="bg-[#121212]/85 border border-[#D49A7A]/30 text-[#D49A7A] text-[10px] font-sans font-bold px-3 py-1 rounded-full backdrop-blur-md">
                  {drop.piecesCount} Authenticated Vault Pieces
                </span>
              </div>
            </div>

            {/* Split Content Column */}
            <div className="col-span-1 lg:col-span-6 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-[#D49A7A]">
                  Curator: {drop.curator}
                </span>

                <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#FAF7F2] uppercase tracking-tight mt-1.5 mb-3 leading-snug">
                  {drop.title}
                </h2>

                <p className="font-sans text-xs sm:text-sm text-[#DCDCDC]/75 leading-relaxed mb-6">
                  {drop.description}
                </p>

                {/* Featured Garment Modules styled as Vintage Swing-Tag Cards */}
                <div className="space-y-3 pt-2">
                  <span className="text-[10px] uppercase font-sans font-bold tracking-widest text-[#D49A7A] block">
                    Spotlight Vault Garments:
                  </span>
                  {drop.featuredItems.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="p-4 rounded-xl bg-[#F2EBE5] text-[#1F1713] border border-[#3D2E24]/30 shadow-md flex items-center justify-between gap-4"
                    >
                      <div>
                        <h4 className="font-serif font-bold text-sm text-[#1F1713]">
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-3 text-[11px] font-sans text-[#3D2E24]/80 mt-0.5">
                          <span>Size: <strong>{item.size}</strong></span>
                          <span>•</span>
                          <span>Condition: <strong>{item.condition}</strong></span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-serif text-xl font-bold text-[#1F1713]">₹{item.price}</span>
                        <button
                          onClick={() => handleAcquire(item, drop)}
                          className="px-4 py-2 rounded-full bg-[#1F1713] text-[#F2EBE5] hover:bg-[#3D2E24] hover:text-white text-[10px] font-sans font-bold uppercase tracking-wider transition-all active:scale-95 cursor-pointer shadow-sm"
                        >
                          + Acquire
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

              {/* Provenance Footer Indicator */}
              <div className="pt-4 border-t border-[#D49A7A]/15 flex items-center justify-between text-xs font-sans text-[#D49A7A]">
                <span className="flex items-center gap-1.5">
                  <TagIcon className="w-4 h-4" color="#D49A7A" />
                  <span>Physical Archival Swing-Tag Included</span>
                </span>
                <span className="font-bold">Peer Inspected ✓</span>
              </div>

            </div>

          </div>
        ))}
      </section>

    </div>
  );
}
