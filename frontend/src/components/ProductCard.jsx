import React from 'react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { useTilt } from '../hooks/useTilt';

export default function ProductCard({ product, delay = 0 }) {
  const { addToCart } = useCart();
  const { setQuickViewProduct } = useProducts();
  const cardRef = useTilt({ max: 8, scale: 1.02, speed: 400 });

  return (
    <div
      ref={cardRef}
      className="product-card group relative aspect-[3/4] cursor-pointer scroll-reveal shadow-darkLg"
      style={{ transitionDelay: `${delay}s` }}
    >
      {/* Product Image */}
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-95 group-hover:brightness-100"
        loading="lazy"
      />

      {/* Curator & Campus Tag */}
      <div className="absolute top-3.5 left-3.5 z-10 flex flex-col gap-1">
        <span className="text-[10px] font-sans font-bold tracking-wider px-2.5 py-0.5 bg-[#0A0A0A]/90 text-gold border border-gold/30 rounded-sm backdrop-blur-md">
          {product.campus || "NYU Tisch"}
        </span>
      </div>

      {/* Quick View Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setQuickViewProduct(product);
        }}
        className="absolute top-3.5 right-3.5 z-10 w-8 h-8 bg-[#0A0A0A]/90 border border-gold/40 text-gold rounded-sm flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-gold hover:text-[#0A0A0A] transition-all duration-300 shadow-md"
        title="Quick Look"
      >
        <span className="material-symbols-outlined text-sm">visibility</span>
      </button>

      {/* Hover Scrim Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"></div>

      {/* Bottom Information Overlay */}
      <div className="absolute bottom-0 left-0 w-full p-5 flex justify-between items-end translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 z-10">
        <div className="text-white flex-1 pr-3">
          <p className="font-serif text-lg font-bold tracking-tight leading-snug line-clamp-1 group-hover:text-gold transition-colors">
            {product.name}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-gold font-sans font-bold text-sm">
              ${product.price}
            </span>
            <span className="text-[11px] font-sans text-text-muted">
              • {product.size}
            </span>
          </div>
          <p className="text-[10px] text-text-muted mt-1 font-sans truncate">
            Curated by <span className="text-white">{product.curator}</span>
          </p>
        </div>

        {/* Quick Add Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
          className="w-10 h-10 bg-gold text-[#0A0A0A] rounded-sm flex items-center justify-center hover:bg-gold-hover hover:scale-105 transition-all shadow-gold flex-shrink-0"
          title="Add to Shopping Bag"
        >
          <span className="material-symbols-outlined text-lg font-bold">add</span>
        </button>
      </div>
    </div>
  );
}
