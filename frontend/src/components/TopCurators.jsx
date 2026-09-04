import React from 'react';
import { TOP_CURATORS } from '../data/mockData';
import { useProducts } from '../context/ProductContext';

export default function TopCurators() {
  const { setSelectedCategory } = useProducts();

  return (
    <section id="top-curators" className="py-24 px-6 md:px-12 max-w-[1440px] mx-auto bg-[#121212] text-[#DCDCDC]">
      
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 pb-6 border-b border-[#D49A7A]/20">
        <div>
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-6 h-[1px] bg-[#D49A7A]"></span>
            <span className="text-[11px] uppercase font-sans font-bold tracking-[0.25em] text-[#D49A7A]">
              Tastemaker Collective
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#D49A7A] tracking-tight uppercase">
            Campus Tastemakers
          </h2>
        </div>
        <p className="text-xs sm:text-sm font-sans text-[#DCDCDC]/75 max-w-sm mt-3 md:mt-0 leading-relaxed">
          Follow verified student collectors whose personal closets match your specific aesthetic archetype.
        </p>
      </div>

      {/* Curator Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {TOP_CURATORS.map((curator) => (
          <div
            key={curator.id}
            className="p-6 rounded-2xl bg-[#181818] border border-[#D49A7A]/25 hover:border-[#D49A7A] transition-all duration-300 flex flex-col justify-between shadow-lg hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={curator.avatar}
                  alt={curator.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#D49A7A]"
                />
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#FAF7F2] flex items-center gap-1.5">
                    <span>{curator.name}</span>
                    <span className="text-[#D49A7A] text-xs">✓</span>
                  </h3>
                  <p className="text-xs font-sans text-[#D49A7A] font-medium">{curator.handle}</p>
                </div>
              </div>

              <div className="text-xs font-sans text-[#A8A8A8] space-y-1.5 mb-6">
                <p className="flex items-center gap-2">
                  <span>📍</span>
                  <span className="text-[#DCDCDC]">{curator.campus}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span>🏷️</span>
                  <span className="text-[#DCDCDC]">{curator.specialty}</span>
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#D49A7A]/15 flex items-center justify-between">
              <div className="text-xs font-sans">
                <span className="text-[#D49A7A] font-bold">★ {curator.rating}</span>
                <span className="text-[#A8A8A8] ml-1.5">({curator.sales} drops)</span>
              </div>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  const el = document.getElementById('curated-finds');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-[10px] font-sans font-bold uppercase tracking-[0.14em] text-[#D49A7A] hover:text-[#FAF7F2] transition-colors cursor-pointer"
              >
                Inspect Vault →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
