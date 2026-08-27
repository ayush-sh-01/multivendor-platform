import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';

export default function Navbar() {
  const { user, isAuthenticated, openAuth, logout } = useAuth();
  const { totalCount, setIsDrawerOpen } = useCart();
  const { searchQuery, setSearchQuery, setIsUploadModalOpen } = useProducts();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#2C4234] text-[#F4EFE6] transition-all duration-300 border-b border-[#F4EFE6]/10">
      <div className="flex justify-between items-center w-full px-6 md:px-8 py-4 max-w-[1440px] mx-auto">
        {/* Left: Brand Logo in Serif with Star Icon */}
        <div className="flex items-center gap-8">
          <a
            href="#"
            className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-[#F4EFE6] hover:text-[#BA9F7A] transition-colors flex items-center gap-1.5"
          >
            <span>ThriftCampus+</span>
            <span className="text-[#BA9F7A] text-lg select-none">✦</span>
          </a>
        </div>

        {/* Center: Desktop Navigation Links (Sans-serif, all-caps, small font) */}
        <div className="hidden lg:flex items-center gap-8">
          <a
            href="#curated-finds"
            className="text-xs uppercase tracking-[0.15em] font-sans font-medium text-[#F4EFE6]/80 hover:text-[#BA9F7A] transition-colors"
          >
            Discover
          </a>
          <a
            href="#categories"
            className="text-xs uppercase tracking-[0.15em] font-sans font-medium text-[#F4EFE6]/80 hover:text-[#BA9F7A] transition-colors"
          >
            Categories
          </a>
          <a
            href="#how-it-works"
            className="text-xs uppercase tracking-[0.15em] font-sans font-medium text-[#F4EFE6]/80 hover:text-[#BA9F7A] transition-colors"
          >
            How It Works
          </a>
          <a
            href="#top-curators"
            className="text-xs uppercase tracking-[0.15em] font-sans font-medium text-[#F4EFE6]/80 hover:text-[#BA9F7A] transition-colors"
          >
            Curators
          </a>
          <a
            href="#mystery-bundle"
            className="text-xs uppercase tracking-[0.15em] font-sans font-medium text-[#F4EFE6]/80 hover:text-[#BA9F7A] transition-colors"
          >
            Mystery Bundle
          </a>
        </div>

        {/* Right: Search, Cart & Student Profile Button */}
        <div className="flex items-center gap-3.5 md:gap-5">
          {/* Search Toggle */}
          <div className="relative flex items-center">
            {isSearchOpen ? (
              <div className="flex items-center bg-[#203227] border border-[#BA9F7A]/40 px-3.5 py-1.5 rounded-full transition-all">
                <input
                  type="text"
                  placeholder="Search pieces..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-xs font-sans outline-none text-[#F4EFE6] w-32 sm:w-44 placeholder-[#F4EFE6]/40 px-1"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="text-[#BA9F7A] hover:text-[#F4EFE6] ml-1 text-xs"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center text-[#F4EFE6] hover:text-[#BA9F7A] transition-colors p-1"
                title="Search Collection"
              >
                <span className="material-symbols-outlined text-2xl">search</span>
              </button>
            )}
          </div>

          {/* Cart Icon */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="relative flex items-center text-[#F4EFE6] hover:text-[#BA9F7A] transition-colors p-1"
            title="Shopping Bag"
          >
            <span className="material-symbols-outlined text-2xl">shopping_bag</span>
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#B56653] text-[#F4EFE6] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </button>

          {/* Upload Button */}
          <button
            onClick={() => {
              if (!isAuthenticated) {
                openAuth('login');
              } else {
                setIsUploadModalOpen(true);
              }
            }}
            className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-sans font-bold uppercase tracking-wider bg-[#B56653] text-[#F4EFE6] px-4 py-2 rounded-full hover:bg-[#9E5442] transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-sm">add_circle</span>
            Upload
          </button>

          {/* Student Profile Pill Button */}
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="flex items-center gap-1.5 text-[11px] font-sans text-[#F4EFE6] border border-[#F4EFE6]/30 px-3.5 py-1.5 rounded-full hover:border-[#BA9F7A] hover:text-[#BA9F7A] transition-all bg-[#203227]"
              title="Click to Sign Out"
            >
              <span>👤 {user?.name?.split(' ')[0] || 'Profile'}</span>
              <span className="text-[#BA9F7A] text-[10px] font-bold">(✓ Verified)</span>
            </button>
          ) : (
            <button
              onClick={() => openAuth('login')}
              className="flex items-center gap-1.5 text-[11px] font-sans text-[#F4EFE6] border border-[#F4EFE6]/30 px-3.5 py-1.5 rounded-full hover:border-[#BA9F7A] hover:text-[#BA9F7A] transition-all bg-[#203227]"
            >
              <span>👤 Student Profile</span>
              <span className="text-[#BA9F7A] text-[10px] font-bold">(✓ Verified)</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
