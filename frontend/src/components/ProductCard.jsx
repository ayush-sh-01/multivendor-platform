import React from 'react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { useTilt } from '../hooks/useTilt';

const FALLBACK_CLOTHING_IMG = 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80';

// Curated floating tag pills as requested
const FLOATING_TAGS = [
  'NATURE-CORE FLEX',
  'FIT CHECK APPROVED',
  'ARCHIVAL PIECE',
  'PRISTINE GRADE A',
  'TOKYO MINIMALIST',
  'DEADSTOCK GRAIL'
];

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { setQuickViewProduct } = useProducts();
  const cardRef = useTilt({ max: 5, scale: 1.015, speed: 400 });

  const handleCardClick = (e) => {
    // Prevent triggering quickview when clicking add button
    if (e.target.closest('button')) return;
    setQuickViewProduct(product);
  };

  const displayImageUrl =
    product.imageUrl &&
    !product.imageUrl.includes('aida-public') &&
    !product.imageUrl.includes('googleusercontent') &&
    !product.imageUrl.toLowerCase().includes('perfume')
      ? product.imageUrl
      : FALLBACK_CLOTHING_IMG;

  // Determine an editorial floating tag pill for this item
  const tagIndex = (product.id || 1) % FLOATING_TAGS.length;
  const floatingTag = FLOATING_TAGS[tagIndex];

  return (
    <div className="relative pt-5">
      {/* Whimsical string/tie extending above the vintage swing-tag */}
      <div className="swing-tag-string"></div>

      <div
        ref={cardRef}
        onClick={handleCardClick}
        className="swing-tag-card group relative overflow-hidden flex flex-col justify-between cursor-pointer border border-[#3D2E24]/40"
      >
        {/* Realistic Brass Eyelet Grommet at top of swing tag */}
        <div className="swing-tag-eyelet"></div>

        {/* ================= EDITORIAL GARMENT PHOTOGRAPHY ================= */}
        <div className="relative aspect-[3/4] w-full bg-[#1A1A1A] overflow-hidden mt-6 mx-auto w-[calc(100%-20px)] rounded-xl border border-[#3D2E24]/20 shadow-inner">
          <img
            src={displayImageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter contrast-[1.08] brightness-[0.92]"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = FALLBACK_CLOTHING_IMG;
            }}
          />

          {/* Warm Studio Vignette Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

          {/* Floating Pill Tag 1: Editorial Pill Tag (Cream bg + Dark text) */}
          <div className="absolute top-3 left-3 z-10">
            <span className="floating-pill-tag">
              {floatingTag}
            </span>
          </div>

          {/* Floating Quick Look Button (Pill-shaped hover) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#F2EBE5]/90 border border-[#3D2E24]/30 text-[#1F1713] hover:bg-[#D49A7A] hover:text-[#121212] flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-md z-10 active:scale-90"
            title="Inspect Piece"
          >
            <span className="material-symbols-outlined text-base">visibility</span>
          </button>

          {/* Floating Campus Location Pill Tag */}
          <div className="absolute bottom-3 left-3 bg-[#121212]/80 border border-[#D49A7A]/30 px-2.5 py-1 rounded-full text-[9px] font-sans font-medium text-[#DCDCDC] backdrop-blur-sm z-10 flex items-center gap-1">
            <span>📍 {product.campus || 'Campus Network'}</span>
          </div>

          {/* Condition Pill Badge */}
          <div className="absolute bottom-3 right-3 floating-pill-tag text-[9px] py-0.5 px-2">
            {product.condition || '9.5/10'}
          </div>
        </div>

        {/* ================= VINTAGE SWING-TAG SPEC SHEET ================= */}
        <div className="p-5 flex flex-col justify-between flex-1 bg-[#F2EBE5] text-[#1F1713]">
          
          <div>
            {/* Tag Identification Header */}
            <div className="flex justify-between items-baseline mb-1 text-[#3D2E24]/70 border-b border-[#3D2E24]/15 pb-1">
              <span className="text-[9px] uppercase font-sans font-bold tracking-widest">
                ARCHIVE № TC-00{product.id || '9'}
              </span>
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#D49A7A] bg-[#1F1713] px-2 py-0.5 rounded-full">
                {product.size || 'M'}
              </span>
            </div>

            {/* Garment Category */}
            <span className="text-[10px] uppercase font-sans font-bold tracking-widest text-[#8C5F45] block mt-1">
              {product.category || 'Archive Grail'}
            </span>

            {/* Garment Title in Editorial Serif */}
            <h3 className="font-serif text-lg font-bold text-[#1F1713] group-hover:text-[#8C5F45] transition-colors line-clamp-1 mt-0.5">
              {product.name}
            </h3>

            {/* Micro-description */}
            <p className="text-xs font-sans text-[#3D2E24]/80 mt-1 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Price & Pill CTA Action */}
          <div className="flex justify-between items-center mt-5 pt-3.5 border-t border-[#3D2E24]/15">
            <div>
              <span className="text-[9px] uppercase font-sans text-[#3D2E24]/60 block font-bold tracking-wider">
                APPRAISAL
              </span>
              <span className="font-serif text-2xl font-bold text-[#1F1713]">₹{product.price}</span>
            </div>

            {/* Pill-shaped Add to Bag Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className="px-5 py-2.5 rounded-full bg-[#1F1713] text-[#F2EBE5] hover:bg-[#3D2E24] hover:text-white text-[10px] font-sans font-bold uppercase tracking-[0.14em] shadow-md transition-all active:scale-95 flex items-center gap-1.5"
            >
              <span>+ Bag</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
