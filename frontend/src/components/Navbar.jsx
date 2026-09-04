import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { MagnifierIcon } from './LineIcons';

export default function Navbar({ activeView = 'discover', setActiveView = () => {} }) {
  const { user, isAuthenticated, openAuth, logout } = useAuth();
  const { totalCount, setIsDrawerOpen } = useCart();
  const { searchQuery, setSearchQuery, setIsUploadModalOpen } = useProducts();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#121212]/85 backdrop-blur-md border-b border-[#D49A7A]/15 transition-all duration-300">
      <div className="flex justify-between items-center w-full px-6 md:px-10 py-3.5 max-w-[1440px] mx-auto">
        
        {/* Left: Brand Wordmark in Editorial Serif */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setActiveView('discover')}
            className="text-left font-serif text-xl md:text-2xl font-bold tracking-tight text-[#D49A7A] hover:text-[#E4B399] transition-colors flex items-center gap-1.5 group cursor-pointer"
          >
            <span>ThriftCampus</span>
            <span className="text-[#D49A7A] text-xs transition-transform duration-300 group-hover:rotate-45 select-none">✦</span>
          </button>
        </div>

        {/* Center: Minimalist Centered Navigation Links (DISCOVER, COLLECTIONS, THE JOURNAL) */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-12">
          <button
            onClick={() => setActiveView('discover')}
            className={`text-[11px] uppercase tracking-[0.2em] font-sans font-medium transition-all relative py-1 cursor-pointer ${
              activeView === 'discover'
                ? 'text-[#D49A7A] font-semibold'
                : 'text-[#DCDCDC]/75 hover:text-[#D49A7A]'
            }`}
          >
            DISCOVER
            {activeView === 'discover' && (
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D49A7A]" />
            )}
          </button>

          <button
            onClick={() => setActiveView('collections')}
            className={`text-[11px] uppercase tracking-[0.2em] font-sans font-medium transition-all relative py-1 cursor-pointer ${
              activeView === 'collections'
                ? 'text-[#D49A7A] font-semibold'
                : 'text-[#DCDCDC]/75 hover:text-[#D49A7A]'
            }`}
          >
            COLLECTIONS
            {activeView === 'collections' && (
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D49A7A]" />
            )}
          </button>

          <button
            onClick={() => setActiveView('journal')}
            className={`text-[11px] uppercase tracking-[0.2em] font-sans font-medium transition-all relative py-1 cursor-pointer ${
              activeView === 'journal'
                ? 'text-[#D49A7A] font-semibold'
                : 'text-[#DCDCDC]/75 hover:text-[#D49A7A]'
            }`}
          >
            THE JOURNAL
            {activeView === 'journal' && (
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D49A7A]" />
            )}
          </button>
        </nav>

        {/* Right: Search, Cart, Sell, and Pill Profile Button */}
        <div className="flex items-center gap-3 md:gap-4">
          
          {/* Search Toggle with Rose Gold Line Icon */}
          <div className="relative flex items-center">
            {isSearchOpen ? (
              <div className="flex items-center bg-[#1A1A1A] border border-[#D49A7A]/40 px-3 py-1.5 rounded-full transition-all shadow-inner">
                <input
                  type="text"
                  placeholder="Search archival pieces..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-xs font-sans outline-none text-[#DCDCDC] w-28 sm:w-44 placeholder-[#A8A8A8] px-1"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="text-[#D49A7A] hover:text-[#FAF7F2] ml-1 text-xs"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-1.5 text-[#DCDCDC] hover:text-[#D49A7A] transition-colors rounded-full hover:bg-white/5"
                title="Search Archives"
                aria-label="Search"
              >
                <MagnifierIcon className="w-5 h-5" color="#D49A7A" />
              </button>
            )}
          </div>

          {/* Cart Bag Icon */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="relative p-1.5 text-[#DCDCDC] hover:text-[#D49A7A] transition-colors rounded-full hover:bg-white/5"
            title="Archival Bag"
            aria-label="View Shopping Bag"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="#D49A7A" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {totalCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#D49A7A] text-[#121212] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                {totalCount}
              </span>
            )}
          </button>

          {/* Sell a Piece Button (Pill-shaped) */}
          <button
            onClick={() => {
              if (!isAuthenticated) {
                openAuth('login');
              } else {
                setIsUploadModalOpen(true);
              }
            }}
            className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-sans font-bold uppercase tracking-[0.16em] bg-[#1A1A1A] text-[#D49A7A] border border-[#D49A7A]/40 hover:border-[#D49A7A] hover:bg-[#D49A7A]/10 px-4 py-2 rounded-full transition-all duration-200 active:scale-95"
          >
            <span>+ List Piece</span>
          </button>

          {/* User Profile Pill-shaped Button with Avatar & Checkmark */}
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="flex items-center gap-2 text-xs font-sans text-[#DCDCDC] bg-[#1A1A1A] border border-[#D49A7A]/40 px-3.5 py-1.5 rounded-full hover:border-[#D49A7A] hover:text-white transition-all shadow-sm"
              title="Signed in • Click to Sign Out"
            >
              {/* Profile Avatar */}
              <div className="w-5 h-5 rounded-full bg-[#D49A7A]/20 border border-[#D49A7A] flex items-center justify-center text-[10px] font-bold text-[#D49A7A]">
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <span className="font-medium text-[11px] tracking-wide">{user?.name?.split(' ')[0] || 'Collector'}</span>
              <span className="text-[#D49A7A] text-[11px] font-bold">✓</span>
            </button>
          ) : (
            <button
              onClick={() => openAuth('login')}
              className="flex items-center gap-2 text-xs font-sans text-[#121212] bg-[#F2EBE5] hover:bg-[#FAF7F2] border border-[#3D2E24] px-4 py-1.5 rounded-full font-bold uppercase tracking-[0.12em] text-[10px] transition-all duration-200 shadow-md active:scale-95"
            >
              {/* Profile Avatar Icon */}
              <div className="w-4 h-4 rounded-full bg-[#121212] flex items-center justify-center text-[9px] text-[#F2EBE5]">
                ✓
              </div>
              <span>Join / Sign In</span>
            </button>
          )}

        </div>

      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="flex md:hidden justify-center items-center gap-6 py-2 border-t border-[#D49A7A]/10 bg-[#121212]">
        <button
          onClick={() => setActiveView('discover')}
          className={`text-[10px] uppercase tracking-[0.16em] font-sans transition-colors ${
            activeView === 'discover' ? 'text-[#D49A7A] font-bold' : 'text-[#DCDCDC]/60'
          }`}
        >
          DISCOVER
        </button>
        <button
          onClick={() => setActiveView('collections')}
          className={`text-[10px] uppercase tracking-[0.16em] font-sans transition-colors ${
            activeView === 'collections' ? 'text-[#D49A7A] font-bold' : 'text-[#DCDCDC]/60'
          }`}
        >
          COLLECTIONS
        </button>
        <button
          onClick={() => setActiveView('journal')}
          className={`text-[10px] uppercase tracking-[0.16em] font-sans transition-colors ${
            activeView === 'journal' ? 'text-[#D49A7A] font-bold' : 'text-[#DCDCDC]/60'
          }`}
        >
          THE JOURNAL
        </button>
      </div>
    </header>
  );
}
