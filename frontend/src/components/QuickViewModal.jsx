import React from 'react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct } = useProducts();
  const { addToCart } = useCart();

  if (!quickViewProduct) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={() => setQuickViewProduct(null)}
    >
      <div
        className="relative bg-[#141414] border border-gold/40 w-full max-w-3xl shadow-goldLg overflow-hidden grid grid-cols-1 md:grid-cols-2 rounded-sm"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 w-8 h-8 bg-[#0A0A0A] border border-white/20 text-[#E0E0E0] hover:text-gold hover:border-gold rounded-sm flex items-center justify-center transition-all duration-300"
        >
          ✕
        </button>

        {/* Left Side: Product Editorial Image */}
        <div className="relative aspect-[3/4] md:aspect-auto border-b md:border-b-0 md:border-r border-white/10 bg-[#0A0A0A]">
          <img
            src={quickViewProduct.imageUrl}
            alt={quickViewProduct.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-3 left-3 bg-[#0A0A0A]/90 border border-gold/40 px-2.5 py-1 text-[10px] font-sans font-bold text-gold backdrop-blur-md rounded-sm">
            Condition: {quickViewProduct.condition || '9.4/10 Excellent'}
          </div>
        </div>

        {/* Right Side: Editorial Breakdown */}
        <div className="p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider bg-gold/15 text-gold px-2.5 py-0.5 border border-gold/30 rounded-sm">
                {quickViewProduct.category}
              </span>
              <span className="text-[10px] font-sans text-text-muted">
                📍 {quickViewProduct.campus}
              </span>
            </div>

            <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
              {quickViewProduct.name}
            </h3>

            <div className="flex items-center gap-2 mb-4">
              <span className="font-sans text-2xl font-bold text-gold">
                ${quickViewProduct.price}
              </span>
              <span className="text-xs font-sans text-text-muted">
                • {quickViewProduct.size}
              </span>
            </div>

            <p className="text-xs md:text-sm font-sans text-[#E0E0E0]/80 leading-relaxed mb-6">
              {quickViewProduct.description}
            </p>

            {/* Curator Quote */}
            <div className="p-3.5 border-l-2 border-gold bg-[#1A1A1A] rounded-r-sm mb-6">
              <p className="text-[11px] font-sans italic text-[#E0E0E0]">
                "Authentic piece inspected for wear. Stored in temperature-regulated dorm wardrobe."
              </p>
              <p className="text-[10px] font-sans font-semibold text-gold mt-1.5">
                — {quickViewProduct.curator}
              </p>
            </div>
          </div>

          <div>
            <button
              onClick={() => {
                addToCart(quickViewProduct);
                setQuickViewProduct(null);
              }}
              className="w-full premium-btn py-3.5"
            >
              <span>Add to Bag • ${quickViewProduct.price}</span>
              <span className="material-symbols-outlined text-base font-bold">shopping_bag</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
