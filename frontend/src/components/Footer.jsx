import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { DiamondIcon } from './LineIcons';

export default function Footer() {
  const { showToast } = useCart();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      showToast('Subscribed to Campus Secret Vault Drops!', 'success');
      setEmail('');
    }
  };

  return (
    <footer className="bg-charcoal-pattern text-[#DCDCDC] border-t border-[#D49A7A]/20 w-full pt-16 pb-12 px-6 md:px-12 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 max-w-[1440px] mx-auto pb-12 border-b border-[#D49A7A]/20">
        
        {/* Brand & Ethos */}
        <div className="col-span-1 md:col-span-5">
          <div className="flex items-center gap-2 mb-3">
            <h2 className="font-serif text-3xl font-bold text-[#D49A7A] tracking-tight">
              ThriftCampus
            </h2>
            <DiamondIcon className="w-5 h-5" color="#D49A7A" />
          </div>
          <p className="text-[#A8A8A8] text-xs sm:text-sm font-sans max-w-sm leading-relaxed mb-6">
            The Exclusive Curated Luxury & Archival Marketplace. Elevating collegiate fashion culture with rigorous peer authentication, zero carbon transit, and authentic provenance.
          </p>

          {/* Impact Stats */}
          <div className="flex gap-8 text-xs font-sans">
            <div>
              <span className="font-serif text-2xl font-bold text-[#D49A7A] block">
                14,200+
              </span>
              <span className="text-[#A8A8A8] uppercase text-[9px] tracking-wider">Garments Archived</span>
            </div>
            <div>
              <span className="font-serif text-2xl font-bold text-[#D49A7A] block">
                ₹210K+
              </span>
              <span className="text-[#A8A8A8] uppercase text-[9px] tracking-wider">Paid to Students</span>
            </div>
            <div>
              <span className="font-serif text-2xl font-bold text-[#D49A7A] block">
                0 kg
              </span>
              <span className="text-[#A8A8A8] uppercase text-[9px] tracking-wider">Campus Transit CO₂</span>
            </div>
          </div>
        </div>

        {/* Platform Links */}
        <div className="col-span-1 md:col-span-2 flex flex-col gap-3">
          <h3 className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#D49A7A] font-bold mb-1">
            Vault Archives
          </h3>
          <a href="#curated-finds" className="text-xs font-sans text-[#A8A8A8] hover:text-[#D49A7A] transition-colors">
            Curated Garments
          </a>
          <a href="#categories" className="text-xs font-sans text-[#A8A8A8] hover:text-[#D49A7A] transition-colors">
            Archival Disciplines
          </a>
          <a href="#mystery-bundle" className="text-xs font-sans text-[#A8A8A8] hover:text-[#D49A7A] transition-colors">
            Bespoke Wardrobe Capsule
          </a>
          <a href="#top-curators" className="text-xs font-sans text-[#A8A8A8] hover:text-[#D49A7A] transition-colors">
            Campus Tastemakers
          </a>
        </div>

        {/* Support Links */}
        <div className="col-span-1 md:col-span-2 flex flex-col gap-3">
          <h3 className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#D49A7A] font-bold mb-1">
            Provenance
          </h3>
          <a href="#how-it-works" className="text-xs font-sans text-[#A8A8A8] hover:text-[#D49A7A] transition-colors">
            Peer Authentication
          </a>
          <a href="#how-it-works" className="text-xs font-sans text-[#A8A8A8] hover:text-[#D49A7A] transition-colors">
            Campus Drop Zones
          </a>
          <a href="#how-it-works" className="text-xs font-sans text-[#A8A8A8] hover:text-[#D49A7A] transition-colors">
            Zero-Carbon Audit
          </a>
          <a href="#how-it-works" className="text-xs font-sans text-[#A8A8A8] hover:text-[#D49A7A] transition-colors">
            Collector Standards
          </a>
        </div>

        {/* Newsletter Signup */}
        <div className="col-span-1 md:col-span-3">
          <h3 className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#D49A7A] font-bold mb-2">
            Secret Vault Dispatches
          </h3>
          <p className="text-xs text-[#A8A8A8] font-sans mb-4 leading-relaxed">
            Receive encrypted alerts whenever deadstock Japanese selvedge or rare outerwear drops on your campus.
          </p>
          <form onSubmit={handleSubscribe} className="flex border border-[#D49A7A]/30 rounded-full overflow-hidden focus-within:border-[#D49A7A] transition-colors p-1 bg-[#121212]">
            <input
              type="email"
              placeholder="campus.email@edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent text-xs px-4 py-2 outline-none flex-1 text-[#DCDCDC] placeholder-[#A8A8A8]/60"
              required
            />
            <button
              type="submit"
              className="bg-[#D49A7A] text-[#121212] px-6 py-2 text-[10px] font-sans font-bold uppercase tracking-wider hover:bg-[#E4B399] rounded-full transition-colors cursor-pointer"
            >
              Join
            </button>
          </form>
        </div>

      </div>

      {/* Bottom Legal Bar */}
      <div className="max-w-[1440px] mx-auto mt-8 flex flex-col md:flex-row justify-between items-center text-xs font-sans text-[#A8A8A8] gap-4">
        <p>© 2026 ThriftCampus — Curated Luxury & Archival Marketplace. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-[#D49A7A] transition-colors">Archival Provenance</a>
          <a href="#" className="hover:text-[#D49A7A] transition-colors">Terms of Circulation</a>
          <a href="#" className="hover:text-[#D49A7A] transition-colors">Privacy</a>
        </div>
      </div>
    </footer>
  );
}
