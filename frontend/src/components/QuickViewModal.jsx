import React from 'react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { TagIcon, ScalesIcon } from './LineIcons';

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={() => setQuickViewProduct(null)}
    >
      <div
        className="relative bg-[#161616] border border-[#D49A7A]/35 w-full max-w-4xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden grid grid-cols-1 md:grid-cols-2 rounded-3xl text-[#DCDCDC] max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-30 w-9 h-9 bg-[#121212]/90 border border-[#D49A7A]/30 text-[#DCDCDC] hover:text-[#D49A7A] hover:border-[#D49A7A] rounded-full flex items-center justify-center transition-all duration-200 shadow-md active:scale-95 text-sm cursor-pointer"
          title="Close Modal"
        >
          ✕
        </button>

        {/* Left Side: Product Editorial Photography */}
        <div className="relative w-full h-72 md:h-full min-h-[320px] md:min-h-[520px] bg-[#121212] overflow-hidden border-b md:border-b-0 md:border-r border-[#D49A7A]/20 flex items-center justify-center">
          <img
            src={displayImageUrl}
            alt={quickViewProduct.name}
            className="w-full h-full object-cover filter contrast-[1.08] brightness-[0.9]"
            onError={(e) => {
              e.currentTarget.src = FALLBACK_CLOTHING_IMG;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/90 via-transparent to-black/25 pointer-events-none" />

          {/* Floating Campus Pill Tag */}
          <div className="absolute bottom-4 left-4 z-10">
            <span className="bg-[#121212]/90 border border-[#D49A7A]/40 px-3.5 py-1 text-[10px] font-sans font-bold text-[#D49A7A] backdrop-blur-md rounded-full shadow-md">
              📍 {quickViewProduct.campus || 'Campus Network'}
            </span>
          </div>

          <div className="absolute top-4 left-4 z-10">
            <span className="floating-pill-tag">
              FIT CHECK APPROVED
            </span>
          </div>
        </div>

        {/* Right Side: Archival Spec Sheet */}
        <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-between overflow-y-auto bg-[#181818]">
          <div>
            {/* Category & Size Top Bar */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] bg-[#121212] text-[#D49A7A] px-3.5 py-1 border border-[#D49A7A]/30 rounded-full">
                {quickViewProduct.category || 'Archive Grail'}
              </span>
              <div className="flex items-center gap-1.5 bg-[#121212] border border-[#D49A7A]/20 px-3.5 py-1 rounded-full text-xs">
                <span className="text-[#A8A8A8]">Size:</span>
                <span className="font-bold text-[#FAF7F2]">{quickViewProduct.size || 'Standard'}</span>
              </div>
            </div>

            {/* Product Name in Editorial Serif */}
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF7F2] mb-3 leading-tight tracking-tight uppercase">
              {quickViewProduct.name}
            </h2>

            {/* Pricing Section */}
            <div className="flex flex-wrap items-baseline gap-3 mb-5 pb-4 border-b border-[#D49A7A]/20">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#D49A7A] tracking-tight">
                ₹{quickViewProduct.price}
              </span>
              <span className="text-[10px] uppercase tracking-wider font-sans text-emerald-400 font-semibold bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-500/30">
                0% Commission • Verified Campus Hand-off
              </span>
            </div>

            {/* Condition Rating Box */}
            <div className="mb-5 bg-[#121212] border border-[#D49A7A]/25 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <span className="text-[9px] uppercase font-sans font-bold tracking-widest text-[#D49A7A] block mb-0.5">
                  Condition Appraisal
                </span>
                <span className="text-sm font-sans font-bold text-[#FAF7F2]">
                  {quickViewProduct.condition || '9.8/10 Collector Grade'}
                </span>
              </div>
              <ScalesIcon className="w-5 h-5" color="#D49A7A" />
            </div>

            {/* Archival Description */}
            <div className="mb-5">
              <span className="text-[10px] uppercase font-sans font-bold tracking-widest text-[#D49A7A] block mb-1">
                Curator Provenance Notes
              </span>
              <p className="text-xs sm:text-sm font-sans text-[#DCDCDC]/80 leading-relaxed">
                {quickViewProduct.description}
              </p>
            </div>

            {/* Curator Guarantee */}
            <div className="p-3.5 border-l-2 border-[#D49A7A] bg-[#121212] rounded-r-xl mb-6">
              <p className="text-xs font-sans italic text-[#DCDCDC]/90">
                "Direct campus drop-off available. Inspected for authenticity and zero synthetic wear."
              </p>
              <p className="text-[10px] font-sans font-bold text-[#D49A7A] mt-1.5 flex items-center gap-1">
                <span>— Curated by {quickViewProduct.curator || 'Campus Tastemaker'}</span>
                <span>✓</span>
              </p>
            </div>
          </div>

          {/* Action Button (Pill-shaped in Rose Gold) */}
          <div className="pt-2">
            <button
              onClick={() => {
                addToCart(quickViewProduct);
                setQuickViewProduct(null);
              }}
              className="w-full btn-rosegold-pill py-3.5 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
            >
              <span>Add to Archival Bag • ₹{quickViewProduct.price}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
