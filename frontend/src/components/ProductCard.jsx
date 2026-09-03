import React from 'react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { useTilt } from '../hooks/useTilt';

const FALLBACK_CLOTHING_IMG = 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { setQuickViewProduct } = useProducts();
  const cardRef = useTilt({ max: 6, scale: 1.015, speed: 400 });

  const handleCardClick = (e) => {
    // If user clicked a button (e.g. Add to Bag), don't trigger quickview
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

  return (
    <div
      ref={cardRef}
      onClick={handleCardClick}
      className="product-card group relative bg-[#24362A] border border-[#F4EFE6]/12 rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl"
    >
      {/* Editorial Garment Image with Uniform Portrait Aspect Ratio & DSLR Scrim */}
      <div className="relative aspect-[3/4] w-full bg-[#1E2E24] overflow-hidden">
        <img
          src={displayImageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter contrast-[1.12] brightness-[0.92] saturate-[0.95]"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = FALLBACK_CLOTHING_IMG;
          }}
        />

        {/* Subtle Editorial DSLR Lighting Overlay & Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#18261E]/80 via-transparent to-black/20 pointer-events-none transition-opacity duration-300 group-hover:opacity-90" />
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />

        {/* Floating Condition Badge */}
        <div className="absolute top-3 left-3 bg-[#203227]/90 border border-[#BA9F7A]/40 text-[#BA9F7A] text-[10px] font-sans font-bold px-3 py-1 rounded-full backdrop-blur-md shadow-sm z-10">
          {product.condition || '9.5/10 Pristine'}
        </div>

        {/* Quick View Floating Action Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setQuickViewProduct(product);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#203227]/90 border border-[#F4EFE6]/20 text-[#F4EFE6] hover:bg-[#B56653] hover:text-[#FAF7F2] hover:border-[#B56653] flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-md z-10 active:scale-90"
          title="Quick Look"
        >
          <span className="material-symbols-outlined text-base">visibility</span>
        </button>

        {/* Campus Location Tag */}
        <div className="absolute bottom-3 left-3 bg-[#203227]/90 border border-[#F4EFE6]/15 px-2.5 py-1 rounded-full text-[10px] font-sans font-medium text-[#F4EFE6]/90 backdrop-blur-sm z-10">
          📍 {product.campus || 'Campus Network'}
        </div>
      </div>

      {/* Garment Details */}
      <div className="p-5 flex flex-col justify-between flex-1 bg-[#24362A]">
        <div>
          <div className="flex justify-between items-baseline mb-1.5">
            <span className="text-[10px] uppercase font-sans font-bold tracking-wider text-[#BA9F7A]">
              {product.category}
            </span>
            <span className="text-xs font-sans font-medium text-[#F4EFE6]/70">
              {product.size}
            </span>
          </div>

          <h3 className="font-serif text-lg font-bold text-[#F4EFE6] group-hover:text-[#BA9F7A] transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs font-sans text-[#F4EFE6]/70 mt-1.5 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pricing & Add Action */}
        <div className="flex justify-between items-center mt-5 pt-3.5 border-t border-[#F4EFE6]/10">
          <div>
            <span className="text-[10px] uppercase font-sans text-[#F4EFE6]/60 block font-medium">Price</span>
            <span className="font-serif text-xl font-bold text-[#FAF7F2]">${product.price}</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="terracotta-btn px-5 py-2.5 rounded-full text-[11px] font-bold tracking-wider shadow-sm active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-sm">shopping_bag</span>
            <span>Add to Bag</span>
          </button>
        </div>
      </div>
    </div>
  );
}

