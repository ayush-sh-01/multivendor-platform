import React from 'react';
import ProductCard from './ProductCard';
import { useProducts } from '../context/ProductContext';

export default function ProductGallery() {
  const {
    filteredProducts,
    selectedCategory,
    setSelectedCategory,
    loading
  } = useProducts();

  const categories = ['All', 'Jeans', 'Jackets', 'Shirts', 'Archival'];

  return (
    <section id="curated-finds" className="py-24 px-6 md:px-12 max-w-[1440px] mx-auto bg-[#121212] text-[#DCDCDC]">
      {/* Section Header with Rose Gold Accent */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 pb-6 border-b border-[#D49A7A]/20">
        <div>
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-6 h-[1px] bg-[#D49A7A]"></span>
            <span className="text-[11px] uppercase font-sans font-bold tracking-[0.25em] text-[#D49A7A]">
              Authenticated Collegiate Drops
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#D49A7A] tracking-tight uppercase">
            Curated Vault Pieces
          </h2>
        </div>

        {/* Category Filter Pills (Strictly Pill-Shaped) */}
        <div className="flex flex-wrap gap-2.5 mt-5 md:mt-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-[11px] font-sans font-bold uppercase tracking-[0.16em] transition-all duration-300 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#D49A7A] text-[#121212] shadow-md scale-105'
                  : 'bg-[#1A1A1A] text-[#DCDCDC]/75 hover:text-[#D49A7A] hover:bg-[#202020] border border-[#D49A7A]/25'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Vintage Swing-Tag Product Cards */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-[3/4] bg-[#1A1A1A] rounded-2xl animate-pulse border border-[#D49A7A]/10"></div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-24 bg-[#1A1A1A] rounded-2xl border border-[#D49A7A]/20 p-10">
          <span className="material-symbols-outlined text-5xl text-[#D49A7A]/60 mb-3 block">
            inventory_2
          </span>
          <h3 className="font-serif text-2xl text-[#D49A7A] mb-2 uppercase">No Archival Garments Found</h3>
          <p className="text-xs font-sans text-[#A8A8A8] max-w-sm mx-auto mb-6">
            Try adjusting your search query or reset filters to browse all campus vault archives.
          </p>
          <button
            onClick={() => setSelectedCategory('All')}
            className="btn-rosegold-pill"
          >
            <span>Reset Vault Filters</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
