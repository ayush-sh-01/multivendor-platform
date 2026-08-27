import React from 'react';
import { CATEGORIES } from '../data/mockData';
import { useProducts } from '../context/ProductContext';

export default function TrendingCategories() {
  const { selectedCategory, setSelectedCategory } = useProducts();

  return (
    <section id="categories" className="py-16 px-6 md:px-12 max-w-[1440px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 pb-5 border-b border-white/10 scroll-reveal">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-[1px] bg-gold"></span>
            <span className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-gold">
              Curated Archives
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white tracking-tight">
            Trending Categories
          </h2>
        </div>
        <p className="text-sm font-sans text-text-muted max-w-sm mt-3 md:mt-0 leading-relaxed">
          Hand-vetted student archives categorized by aesthetic movement, fabric weight, and provenance.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {CATEGORIES.map((cat, idx) => {
          const isActive = selectedCategory === cat.name;

          return (
            <div
              key={cat.id}
              onClick={() => {
                setSelectedCategory(isActive ? null : cat.name);
                const el = document.getElementById('curated-finds');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`product-card group relative aspect-[3/4] cursor-pointer ${
                isActive ? '!border-gold shadow-goldLg ring-1 ring-gold' : ''
              } scroll-reveal`}
              style={{ transitionDelay: `${idx * 0.1}s` }}
            >
              {/* Image with zoom effect */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out brightness-90 group-hover:brightness-100"
              />

              {/* Dark Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent"></div>

              {/* Tag Badge */}
              <div className="absolute top-4 left-4">
                <span className="text-[10px] uppercase font-sans font-bold px-2.5 py-1 bg-[#0A0A0A]/90 text-gold border border-gold/40 rounded-sm shadow-sm backdrop-blur-md">
                  {cat.count} Pieces
                </span>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                <h3 className="font-serif text-2xl font-bold mb-1.5 leading-tight group-hover:text-gold transition-colors duration-300">
                  {cat.name}
                </h3>
                <p className="text-xs text-text-muted font-sans line-clamp-2 mb-4 leading-relaxed">
                  {cat.desc}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] font-sans font-semibold uppercase tracking-wider text-gold group-hover:translate-x-1 transition-transform">
                  <span>Explore Archive</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
