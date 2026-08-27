import React from 'react';
import { useProducts } from '../context/ProductContext';
import ProductCard from './ProductCard';

export default function ProductGallery() {
  const { products, selectedCategory, setSelectedCategory, loading, searchQuery, setSearchQuery } = useProducts();

  const filterTabs = [
    { label: 'All Archives', value: null },
    { label: 'Denim', value: 'Denim' },
    { label: 'Outerwear', value: 'Outerwear' },
    { label: 'Knitwear', value: 'Knitwear' },
    { label: 'Avant-Garde', value: 'Avant-Garde' },
    { label: 'Bottoms', value: 'Bottoms' }
  ];

  return (
    <section id="curated-finds" className="py-16 px-6 md:px-12 max-w-[1440px] mx-auto">
      {/* Header & Filter Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 pb-5 border-b border-white/10 scroll-reveal">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-[1px] bg-gold"></span>
            <span className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-gold">
              Live Feed
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white tracking-tight">
            Curated Finds
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2.5">
          {filterTabs.map((tab) => {
            const isActive = selectedCategory === tab.value;
            return (
              <button
                key={tab.label}
                onClick={() => setSelectedCategory(tab.value)}
                className={`text-xs font-sans font-semibold uppercase tracking-wider px-4 py-2 rounded-sm transition-all duration-300 ${
                  isActive
                    ? 'bg-gold text-[#0A0A0A] shadow-gold font-bold'
                    : 'bg-[#141414] text-[#E0E0E0]/80 border border-white/10 hover:border-gold/50 hover:text-gold'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Search / Category Indicator */}
      {(searchQuery || selectedCategory) && (
        <div className="flex items-center gap-2 mb-8 text-xs font-sans">
          <span className="text-text-muted">Filtering by:</span>
          {selectedCategory && (
            <span className="bg-[#141414] text-gold border border-gold/40 px-3 py-1 rounded-sm flex items-center gap-1.5 shadow-sm">
              Category: {selectedCategory}
              <button onClick={() => setSelectedCategory(null)} className="hover:text-white ml-1 font-bold">
                ✕
              </button>
            </span>
          )}
          {searchQuery && (
            <span className="bg-[#141414] text-[#E0E0E0] border border-white/20 px-3 py-1 rounded-sm flex items-center gap-1.5">
              Search: "{searchQuery}"
              <button onClick={() => setSearchQuery('')} className="hover:text-gold ml-1 font-bold">
                ✕
              </button>
            </span>
          )}
        </div>
      )}

      {/* Loading state */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
          {[1, 2, 3].map((n) => (
            <div key={n} className="aspect-[3/4] rounded-sm border border-white/10 bg-[#141414] animate-pulse flex items-center justify-center">
              <span className="text-xs font-sans text-text-muted uppercase tracking-wider">Loading piece...</span>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        /* Empty State */
        <div className="py-20 text-center border border-white/10 bg-[#141414] shadow-darkLg max-w-lg mx-auto p-8 rounded-sm">
          <span className="material-symbols-outlined text-5xl text-gold/60 mb-2">search_off</span>
          <h3 className="font-serif text-2xl font-bold mb-2 text-white">No matching pieces found</h3>
          <p className="text-xs text-text-muted font-sans mb-6">
            Try adjusting your search terms or clearing category filters.
          </p>
          <button
            onClick={() => {
              setSelectedCategory(null);
              setSearchQuery('');
            }}
            className="premium-btn py-2.5 px-6"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        /* Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((prod, idx) => (
            <ProductCard key={prod.id} product={prod} delay={idx * 0.08} />
          ))}
        </div>
      )}
    </section>
  );
}
