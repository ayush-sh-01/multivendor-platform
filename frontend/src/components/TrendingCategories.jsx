import React from 'react';
import { CATEGORIES } from '../data/mockData';
import { useProducts } from '../context/ProductContext';

export default function TrendingCategories() {
  const { setSelectedCategory } = useProducts();

  return (
    <section id="categories" className="py-24 px-6 md:px-12 max-w-[1440px] mx-auto bg-[#121212] text-[#DCDCDC]">
      
      {/* Editorial Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 pb-6 border-b border-[#D49A7A]/20">
        <div>
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-6 h-[1px] bg-[#D49A7A]"></span>
            <span className="text-[11px] uppercase font-sans font-bold tracking-[0.25em] text-[#D49A7A]">
              Curated Disciplines
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#D49A7A] tracking-tight uppercase">
            Archival Collections
          </h2>
        </div>
        <p className="text-xs sm:text-sm font-sans text-[#DCDCDC]/75 max-w-sm mt-3 md:mt-0 leading-relaxed">
          Garments sourced from fashion design, architecture, and fine arts student wardrobes across premier campuses.
        </p>
      </div>

      {/* 4-Column Category Grid with High-Contrast Editorial Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            onClick={() => {
              setSelectedCategory(
                cat.id === 'jeans' ? 'Jeans' :
                cat.id === 'jackets' ? 'Jackets' :
                cat.id === 'shirts' ? 'Shirts' : 'All'
              );
              const el = document.getElementById('curated-finds');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group cursor-pointer relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#1A1A1A] border border-[#D49A7A]/20 hover:border-[#D49A7A] transition-all duration-500 shadow-lg hover:shadow-2xl hover:-translate-y-1.5"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.78] contrast-[1.1]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/40 to-transparent"></div>

            {/* Floating Pill Tag (Parchment background with dark text) */}
            <div className="absolute top-4 right-4 floating-pill-tag shadow-md">
              {cat.count} PIECES
            </div>

            <div className="absolute bottom-0 left-0 p-6 w-full">
              <h3 className="font-serif text-xl font-bold mb-1.5 text-[#FAF7F2] group-hover:text-[#D49A7A] transition-colors uppercase tracking-wide">
                {cat.name}
              </h3>
              <p className="text-xs font-sans text-[#DCDCDC]/70 leading-relaxed line-clamp-2">
                {cat.desc}
              </p>
              <div className="mt-3 flex items-center gap-1 text-[11px] font-sans font-bold uppercase tracking-wider text-[#D49A7A]">
                <span>Browse Archive</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
