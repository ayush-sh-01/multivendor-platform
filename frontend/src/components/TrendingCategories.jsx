import React from 'react';
import { CATEGORIES } from '../data/mockData';
import { useProducts } from '../context/ProductContext';

export default function TrendingCategories() {
  const { setSelectedCategory } = useProducts();

  return (
    <section id="categories" className="py-20 px-6 md:px-12 max-w-[1440px] mx-auto bg-[#2C4234] text-[#F4EFE6]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 pb-6 border-b border-[#F4EFE6]/15">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-[1px] bg-[#BA9F7A]"></span>
            <span className="text-[11px] uppercase font-sans font-bold tracking-[0.25em] text-[#BA9F7A]">
              Archive Categories
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#F4EFE6] tracking-tight">
            Curated Collections
          </h2>
        </div>
        <p className="text-xs sm:text-sm font-sans text-[#F4EFE6]/70 max-w-sm mt-3 md:mt-0 leading-relaxed">
          Explore garments sourced directly from art, design, and architecture student closets.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
            className="product-card group cursor-pointer relative aspect-[3/4] rounded-lg overflow-hidden bg-[#203227] border border-[#F4EFE6]/15 hover:border-[#BA9F7A] transition-all duration-300"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.88]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#18261E] via-[#18261E]/30 to-transparent"></div>

            <div className="absolute top-4 right-4 bg-[#2C4234]/90 border border-[#BA9F7A]/30 text-[#BA9F7A] text-[10px] font-sans font-bold px-2.5 py-1 rounded-full backdrop-blur-md">
              {cat.count} Pieces
            </div>

            <div className="absolute bottom-0 left-0 p-6 w-full text-[#F4EFE6]">
              <h3 className="font-serif text-xl font-bold mb-1 text-white group-hover:text-[#BA9F7A] transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs font-sans text-[#F4EFE6]/70 leading-relaxed line-clamp-2">
                {cat.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
