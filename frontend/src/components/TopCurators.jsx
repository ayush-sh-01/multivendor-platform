import React from 'react';
import { TOP_CURATORS } from '../data/mockData';
import { useProducts } from '../context/ProductContext';

export default function TopCurators() {
  const { setSearchQuery } = useProducts();

  return (
    <section id="top-curators" className="py-20 px-6 md:px-12 max-w-[1440px] mx-auto border-t border-white/10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 scroll-reveal">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-[1px] bg-gold"></span>
            <span className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-gold">
              Campus Tastemakers
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white tracking-tight">
            Top Campus Curators
          </h2>
        </div>
        <p className="text-sm font-sans text-text-muted max-w-sm mt-3 md:mt-0 leading-relaxed">
          Ranked by peer verification score, authentic garment provenance, and student satisfaction.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {TOP_CURATORS.map((curator, idx) => (
          <div
            key={curator.id}
            className="p-6 rounded-sm bg-[#141414] border border-white/10 hover:border-gold/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-gold flex flex-col justify-between scroll-reveal group"
            style={{ transitionDelay: `${idx * 0.1}s` }}
          >
            <div>
              {/* Header Avatar & Verified Badge */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border border-gold/40 flex-shrink-0">
                  <img
                    src={curator.avatar}
                    alt={curator.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {curator.verified && (
                    <span className="absolute bottom-0 right-0 bg-gold text-[#0A0A0A] w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold">
                      ✓
                    </span>
                  )}
                </div>

                <div className="min-w-0">
                  <h3 className="font-serif text-lg font-bold text-white leading-tight truncate group-hover:text-gold transition-colors">
                    {curator.name}
                  </h3>
                  <p className="text-xs font-sans text-text-muted">{curator.handle}</p>
                </div>
              </div>

              {/* Campus Badge */}
              <div className="mb-4">
                <span className="text-[10px] font-sans font-semibold uppercase tracking-wider px-2.5 py-1 bg-[#1A1A1A] text-gold border border-gold/20 rounded-sm block truncate">
                  📍 {curator.campus}
                </span>
              </div>

              {/* Specialty */}
              <p className="text-xs font-sans text-text-muted line-clamp-2 mb-6 italic leading-relaxed">
                "{curator.specialty}"
              </p>
            </div>

            <div>
              {/* Stats Bar */}
              <div className="grid grid-cols-2 gap-2 py-3 border-y border-white/10 text-center mb-5 text-xs font-sans">
                <div>
                  <span className="text-[10px] text-text-muted block uppercase tracking-wider">Rating</span>
                  <span className="font-bold text-gold text-sm">★ {curator.rating}</span>
                </div>
                <div>
                  <span className="text-[10px] text-text-muted block uppercase tracking-wider">Curated Drops</span>
                  <span className="font-bold text-white text-sm">{curator.sales}</span>
                </div>
              </div>

              {/* Filter Curator Collection Button */}
              <button
                onClick={() => {
                  setSearchQuery(curator.name);
                  const el = document.getElementById('curated-finds');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full premium-btn-outline py-2.5 text-[11px]"
              >
                <span>View Closet</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
