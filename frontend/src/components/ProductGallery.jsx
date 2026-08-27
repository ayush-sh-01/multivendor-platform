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
    <section id="curated-finds" className="py-20 px-6 md:px-12 max-w-[1440px] mx-auto bg-[#2C4234] text-[#F4EFE6]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 pb-6 border-b border-[#F4EFE6]/15">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-[1px] bg-[#BA9F7A]"></span>
            <span className="text-[11px] uppercase font-sans font-bold tracking-[0.25em] text-[#BA9F7A]">
              Live Archive
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#F4EFE6] tracking-tight">
            Curated Garments
          </h2>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-sans font-semibold uppercase tracking-wider transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-[#F4EFE6] text-[#B56653] shadow-md scale-105'
                  : 'bg-[#203227] text-[#F4EFE6]/75 hover:text-[#F4EFE6] hover:bg-[#24362A] border border-[#F4EFE6]/15'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Product Cards */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-[3/4] bg-[#203227] rounded-lg animate-pulse"></div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-24 bg-[#203227] rounded-lg border border-[#F4EFE6]/10 p-8">
          <span className="material-symbols-outlined text-5xl text-[#BA9F7A]/50 mb-3 block">
            inventory_2
          </span>
          <h3 className="font-serif text-2xl text-[#F4EFE6] mb-2">No garments found</h3>
          <p className="text-xs font-sans text-[#F4EFE6]/70 max-w-sm mx-auto mb-6">
            Try adjusting your search query or reset filters to browse all campus archives.
          </p>
          <button
            onClick={() => setSelectedCategory('All')}
            className="premium-btn py-2.5 px-6 text-xs"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
