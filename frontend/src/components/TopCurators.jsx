import React from 'react';
import { TOP_CURATORS } from '../data/mockData';
import { useProducts } from '../context/ProductContext';

export default function TopCurators() {
  const { setSelectedCategory } = useProducts();

  return (
    <section id="top-curators" className="py-20 px-6 md:px-12 max-w-[1440px] mx-auto bg-[#2C4234] text-[#F4EFE6]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 pb-6 border-b border-[#F4EFE6]/15">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-[1px] bg-[#BA9F7A]"></span>
            <span className="text-[11px] uppercase font-sans font-bold tracking-[0.25em] text-[#BA9F7A]">
              Tastemaker Collective
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#F4EFE6] tracking-tight">
            Top Campus Curators
          </h2>
        </div>
        <p className="text-xs sm:text-sm font-sans text-[#F4EFE6]/70 max-w-sm mt-3 md:mt-0 leading-relaxed">
          Follow students whose wardrobes match your aesthetic archetype.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {TOP_CURATORS.map((curator) => (
          <div
            key={curator.id}
            className="p-6 rounded-lg bg-[#203227] border border-[#F4EFE6]/15 hover:border-[#BA9F7A] transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={curator.avatar}
                  alt={curator.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#BA9F7A]"
                />
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#F4EFE6] flex items-center gap-1">
                    <span>{curator.name}</span>
                    <span className="text-[#BA9F7A] text-xs">✓</span>
                  </h3>
                  <p className="text-xs font-sans text-[#BA9F7A]">{curator.handle}</p>
                </div>
              </div>

              <div className="text-xs font-sans text-[#F4EFE6]/70 space-y-1.5 mb-6">
                <p className="flex items-center gap-1.5">
                  <span>📍</span>
                  <span>{curator.campus}</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <span>🏷️</span>
                  <span>{curator.specialty}</span>
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#F4EFE6]/10 flex items-center justify-between">
              <div className="text-xs font-sans">
                <span className="text-[#BA9F7A] font-bold">★ {curator.rating}</span>
                <span className="text-[#F4EFE6]/50 ml-1.5">({curator.sales} drops)</span>
              </div>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  const el = document.getElementById('curated-finds');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#BA9F7A] hover:text-[#F4EFE6] transition-colors"
              >
                View Closet →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
