import React from 'react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';

const FALLBACK_CLOTHING_IMG = 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80';

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct } = useProducts();
  const { addToCart } = useCart();

  if (!quickViewProduct) return null;

  const displayImageUrl =
    quickViewProduct.imageUrl &&
    !quickViewProduct.imageUrl.includes('aida-public') &&
    !quickViewProduct.imageUrl.includes('googleusercontent') &&
    !quickViewProduct.imageUrl.toLowerCase().includes('perfume')
      ? quickViewProduct.imageUrl
      : FALLBACK_CLOTHING_IMG;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={() => setQuickViewProduct(null)}
    >
      <div
        className="relative bg-[#203227] border border-[#BA9F7A]/30 w-full max-w-4xl shadow-[0_25px_60px_rgba(0,0,0,0.7)] overflow-hidden grid grid-cols-1 md:grid-cols-2 rounded-2xl text-[#F4EFE6] max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-30 w-9 h-9 bg-[#18261E]/90 border border-[#F4EFE6]/25 text-[#F4EFE6] hover:text-[#BA9F7A] hover:border-[#BA9F7A] rounded-full flex items-center justify-center transition-all duration-200 shadow-md active:scale-95 text-sm"
          title="Close"
        >
          ✕
        </button>

        {/* Left Side: Dedicated Entirely to Product Image */}
        <div className="relative w-full h-72 md:h-full min-h-[300px] md:min-h-[520px] bg-[#18261E] overflow-hidden border-b md:border-b-0 md:border-r border-[#F4EFE6]/15 flex items-center justify-center">
          <img
            src={displayImageUrl}
            alt={quickViewProduct.name}
            className="w-full h-full object-cover filter contrast-[1.12] brightness-[0.92] saturate-[0.95]"
            onError={(e) => {
              e.currentTarget.src = FALLBACK_CLOTHING_IMG;
            }}
          />
          {/* Subtle Editorial DSLR Lighting Overlay & Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#18261E]/80 via-transparent to-black/25 pointer-events-none" />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />

          {/* Floating Campus Badge */}
          <div className="absolute bottom-4 left-4 z-10">
            <span className="bg-[#203227]/90 border border-[#BA9F7A]/40 px-3 py-1 text-[11px] font-sans font-bold text-[#BA9F7A] backdrop-blur-md rounded-full shadow-md">
              📍 {quickViewProduct.campus || 'Campus Network'}
            </span>
          </div>
        </div>

        {/* Right Side: Product Details & Massive Full-Width Button */}
        <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-between overflow-y-auto bg-[#203227]">
          <div>
            {/* Category & Size Top Bar */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="text-[11px] font-sans font-bold uppercase tracking-widest bg-[#BA9F7A]/20 text-[#BA9F7A] px-3.5 py-1 border border-[#BA9F7A]/40 rounded-full">
                {quickViewProduct.category || 'Archive Garment'}
              </span>
              <div className="flex items-center gap-1.5 bg-[#18261E] border border-[#F4EFE6]/15 px-3.5 py-1 rounded-full text-xs">
                <span className="text-[#F4EFE6]/70">Size:</span>
                <span className="font-bold text-[#FAF7F2]">{quickViewProduct.size || 'Standard'}</span>
              </div>
            </div>

            {/* Product Name */}
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#F4EFE6] mb-3 leading-tight tracking-tight">
              {quickViewProduct.name}
            </h2>

            {/* Pricing Section */}
            <div className="flex flex-wrap items-baseline gap-3 mb-5 pb-4 border-b border-[#F4EFE6]/15">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
                ${quickViewProduct.price}
              </span>
              <span className="text-xs uppercase tracking-wider font-sans text-emerald-400 font-semibold bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/30">
                0% Commission • Campus Hand-off
              </span>
            </div>

            {/* Condition Rating */}
            <div className="mb-5 bg-[#24362A] border border-[#BA9F7A]/30 rounded-xl p-3.5 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-sans font-bold tracking-wider text-[#BA9F7A] block mb-0.5">
                  Condition Rating
                </span>
                <span className="text-sm font-sans font-bold text-[#FAF7F2]">
                  {quickViewProduct.condition || '9.5/10 Pristine Vintage'}
                </span>
              </div>
              <span className="material-symbols-outlined text-2xl text-[#BA9F7A]">
                verified
              </span>
            </div>

            {/* Archival Description */}
            <div className="mb-5">
              <span className="text-[10px] uppercase font-sans font-bold tracking-wider text-[#F4EFE6]/60 block mb-1">
                Curator Notes & Specs
              </span>
              <p className="text-xs sm:text-sm font-sans text-[#F4EFE6]/80 leading-relaxed">
                {quickViewProduct.description}
              </p>
            </div>

            {/* Curator Guarantee */}
            <div className="p-3 border-l-2 border-[#BA9F7A] bg-[#18261E] rounded-r-lg mb-6">
              <p className="text-[11px] font-sans italic text-[#F4EFE6]/90">
                "Direct campus drop-off available. Inspected for authenticity and zero synthetic wear."
              </p>
              <p className="text-[10px] font-sans font-bold text-[#BA9F7A] mt-1">
                — Curated by {quickViewProduct.curator || 'Campus Tastemaker'}
              </p>
            </div>
          </div>

          {/* Massive Full-Width Add to Bag Button */}
          <div className="pt-2">
            <button
              onClick={() => {
                addToCart(quickViewProduct);
                setQuickViewProduct(null);
              }}
              className="w-full px-8 py-4 rounded-full bg-[#F4EFE6] text-[#18261E] hover:bg-[#FAF7F2] hover:text-[#0F1A14] font-sans font-bold text-sm uppercase tracking-[0.14em] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3 border border-[#F4EFE6]"
            >
              <span>Add to Bag • ${quickViewProduct.price}</span>
              <span className="material-symbols-outlined text-lg font-bold">shopping_bag</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

