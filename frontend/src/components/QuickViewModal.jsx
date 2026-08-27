import React from 'react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct } = useProducts();
  const { addToCart } = useCart();

  if (!quickViewProduct) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn"
      onClick={() => setQuickViewProduct(null)}
    >
      <div
        className="relative bg-[#203227] border border-[#F4EFE6]/20 w-full max-w-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 rounded-xl text-[#F4EFE6]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 w-8 h-8 bg-[#2C4234] border border-[#F4EFE6]/20 text-[#F4EFE6] hover:text-[#BA9F7A] hover:border-[#BA9F7A] rounded-full flex items-center justify-center transition-all duration-300"
        >
          ✕
        </button>

        {/* Left Side: Product Editorial Image */}
        <div className="relative aspect-[3/4] md:aspect-auto border-b md:border-b-0 md:border-r border-[#F4EFE6]/15 bg-[#18261E]">
          <img
            src={quickViewProduct.imageUrl}
            alt={quickViewProduct.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-3 left-3 bg-[#2C4234]/90 border border-[#BA9F7A]/40 px-3 py-1 text-[10px] font-sans font-bold text-[#BA9F7A] backdrop-blur-md rounded-full">
            Condition: {quickViewProduct.condition || '9.5/10 Excellent'}
          </div>
        </div>

        {/* Right Side: Breakdown */}
        <div className="p-6 md:p-8 flex flex-col justify-between bg-[#203227]">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider bg-[#BA9F7A]/20 text-[#BA9F7A] px-2.5 py-0.5 border border-[#BA9F7A]/40 rounded-full">
                {quickViewProduct.category}
              </span>
              <span className="text-[11px] font-sans text-[#F4EFE6]/70">
                📍 {quickViewProduct.campus}
              </span>
            </div>

            <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#F4EFE6] mb-2 leading-tight">
              {quickViewProduct.name}
            </h3>

            <div className="flex items-center gap-2 mb-4">
              <span className="font-serif text-3xl font-bold text-white">
                ${quickViewProduct.price}
              </span>
              <span className="text-xs font-sans text-[#BA9F7A] font-medium">
                • {quickViewProduct.size}
              </span>
            </div>

            <p className="text-xs md:text-sm font-sans text-[#F4EFE6]/80 leading-relaxed mb-6">
              {quickViewProduct.description}
            </p>

            {/* Curator Box */}
            <div className="p-3.5 border-l-2 border-[#BA9F7A] bg-[#24362A] rounded-r-lg mb-6">
              <p className="text-[11px] font-sans italic text-[#F4EFE6]/90">
                "Authentic piece inspected for wear. Stored in temperature-regulated wardrobe."
              </p>
              <p className="text-[10px] font-sans font-semibold text-[#BA9F7A] mt-1.5">
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
