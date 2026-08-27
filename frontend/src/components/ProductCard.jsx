import React from 'react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { useTilt } from '../hooks/useTilt';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { setQuickViewProduct } = useProducts();
  const cardRef = useTilt({ max: 6, scale: 1.015, speed: 400 });

  return (
    <div
      ref={cardRef}
      className="product-card group relative bg-[#24362A] border border-[#F4EFE6]/12 rounded-lg overflow-hidden flex flex-col justify-between transition-all duration-300"
    >
      {/* Editorial Garment Image */}
      <div className="relative aspect-[4/5] bg-[#1E2E24] overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.92]"
          loading="lazy"
        />

        {/* Floating Condition Badge */}
        <div className="absolute top-3 left-3 bg-[#2C4234]/90 border border-[#BA9F7A]/30 text-[#BA9F7A] text-[10px] font-sans font-bold px-2.5 py-1 rounded-full backdrop-blur-md">
          {product.condition || '9.5/10 Pristine'}
        </div>

        {/* Quick View Floating Action */}
        <button
          onClick={() => setQuickViewProduct(product)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#2C4234]/90 border border-[#F4EFE6]/20 text-[#F4EFE6] hover:bg-[#B56653] hover:text-[#F4EFE6] hover:border-[#B56653] flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-md"
          title="Quick Look"
        >
          <span className="material-symbols-outlined text-base">visibility</span>
        </button>

        {/* Campus Location Tag */}
        <div className="absolute bottom-3 left-3 bg-[#203227]/85 border border-[#F4EFE6]/10 px-2.5 py-0.5 rounded text-[10px] font-sans text-[#F4EFE6]/80 backdrop-blur-sm">
          📍 {product.campus || 'Campus Network'}
        </div>
      </div>

      {/* Garment Details */}
      <div className="p-5 flex flex-col justify-between flex-1 bg-[#24362A]">
        <div>
          <div className="flex justify-between items-baseline mb-1">
            <span className="text-[10px] uppercase font-sans font-semibold tracking-wider text-[#BA9F7A]">
              {product.category}
            </span>
            <span className="text-xs font-sans text-[#F4EFE6]/70">
              {product.size}
            </span>
          </div>

          <h3
            onClick={() => setQuickViewProduct(product)}
            className="font-serif text-lg font-bold text-[#F4EFE6] group-hover:text-[#BA9F7A] transition-colors line-clamp-1 cursor-pointer"
          >
            {product.name}
          </h3>

          <p className="text-xs font-sans text-[#F4EFE6]/60 mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pricing & Add Action */}
        <div className="flex justify-between items-center mt-5 pt-3 border-t border-[#F4EFE6]/10">
          <div>
            <span className="text-[10px] uppercase font-sans text-[#F4EFE6]/60 block">Price</span>
            <span className="font-serif text-xl font-bold text-[#F4EFE6]">${product.price}</span>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="terracotta-btn py-2 px-4 text-[11px]"
          >
            <span className="material-symbols-outlined text-sm">shopping_bag</span>
            <span>Add to Bag</span>
          </button>
        </div>
      </div>
    </div>
  );
}
