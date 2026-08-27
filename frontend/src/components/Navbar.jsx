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
    <nav className="sticky top-0 z-50 bg-[#0A0A0A] transition-all duration-300">
      <div className="flex justify-between items-center w-full px-6 md:px-12 h-16 max-w-[1440px] mx-auto">
        {/* Brand */}
        <div className="flex items-center gap-8">
          <a
            href="#"
            className="font-serif text-xl md:text-2xl font-bold tracking-tight text-white hover:text-gold transition-colors duration-300 flex items-center gap-2"
          >
            <span>ThriftCampus</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block"></span>
          </a>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-8">
          <a
            href="#curated-finds"
            className="text-xs uppercase tracking-widest font-sans font-medium text-[#E0E0E0]/70 hover:text-gold transition-colors duration-300"
          >
            Discover
          </a>
          <a
            href="#categories"
            className="text-xs uppercase tracking-widest font-sans font-medium text-[#E0E0E0]/70 hover:text-gold transition-colors duration-300"
          >
            Categories
          </a>
          <a
            href="#how-it-works"
            className="text-xs uppercase tracking-widest font-sans font-medium text-[#E0E0E0]/70 hover:text-gold transition-colors duration-300"
          >
            How It Works
          </a>
          <a
            href="#top-curators"
            className="text-xs uppercase tracking-widest font-sans font-medium text-[#E0E0E0]/70 hover:text-gold transition-colors duration-300"
          >
            Curators
          </a>
          <a
            href="#mystery-bundle"
            className="text-xs uppercase tracking-widest font-sans font-medium text-[#E0E0E0]/70 hover:text-gold transition-colors duration-300"
          >
            Mystery Bundle
          </a>
        </div>

        {/* Actions & Search */}
        <div className="flex items-center gap-4 md:gap-5">
          {/* Search Input Toggle */}
          <div className="relative flex items-center">
            {isSearchOpen ? (
              <div className="flex items-center bg-[#141414] border border-gold/30 px-3 py-1 rounded-full transition-all">
                <input
                  type="text"
                  placeholder="Search pieces..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-xs font-sans outline-none text-[#E0E0E0] w-36 md:w-52 placeholder-text-dim px-1"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="text-text-muted hover:text-gold ml-1 text-xs"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center text-[#E0E0E0] hover:text-gold transition-colors duration-300 p-1"
                title="Search Collection"
              >
                <span className="material-symbols-outlined text-2xl">search</span>
              </button>
            )}
          </div>

          {/* Upload Button */}
          <button
            onClick={() => {
              if (!isAuthenticated) {
                openAuth('login');
              } else {
                setIsUploadModalOpen(true);
              }
            }}
            className="hidden sm:inline-flex premium-btn py-2 px-5 text-[11px]"
          >
            <span className="material-symbols-outlined text-base">add_circle</span>
            Upload
          </button>

          {/* Cart Icon */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="relative flex items-center text-[#E0E0E0] hover:text-gold transition-colors duration-300 p-1"
            title="Shopping Bag"
          >
            <span className="material-symbols-outlined text-2xl">shopping_bag</span>
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gold text-[#0A0A0A] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </button>

          {/* Auth Button */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <button
                onClick={logout}
                className="flex items-center gap-1.5 text-xs font-sans text-gold border border-gold/30 px-3 py-1 bg-[#141414] hover:bg-gold/10 hover:border-gold rounded-full transition-all duration-300"
                title="Click to Sign Out"
              >
                <span className="material-symbols-outlined text-base">account_circle</span>
                <span className="hidden md:inline">{user?.name?.split(' ')[0]}</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => openAuth('login')}
              className="flex items-center gap-1 text-xs uppercase tracking-widest font-sans font-medium text-[#E0E0E0] hover:text-gold transition-colors duration-300"
            >
              <span className="material-symbols-outlined text-lg">person</span>
              <span className="hidden md:inline">Sign In</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
