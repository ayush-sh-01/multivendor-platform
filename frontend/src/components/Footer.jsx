import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function Footer() {
  const { showToast } = useCart();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      showToast('Subscribed to Campus Drop Alerts!', 'success');
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#203227] text-[#F4EFE6] border-t border-[#F4EFE6]/10 w-full py-16 px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 max-w-[1440px] mx-auto pb-12 border-b border-[#F4EFE6]/15">
        {/* Brand & Mission */}
        <div className="col-span-1 md:col-span-5">
          <div className="flex items-center gap-2 mb-3">
            <h2 className="font-serif text-3xl font-bold text-[#F4EFE6] tracking-tight">
              ThriftCampus+
            </h2>
            <span className="text-[#BA9F7A] text-lg select-none">✦</span>
          </div>
          <p className="text-[#F4EFE6]/70 text-sm font-sans max-w-sm leading-relaxed mb-6">
            The Student-Led Fashion Movement. Elevating peer-to-peer commerce with editorial curation, zero carbon impact, and authentic campus culture.
          </p>

          {/* Impact Stats */}
          <div className="flex gap-8 text-xs font-sans">
            <div>
              <span className="font-serif text-2xl font-bold text-[#BA9F7A] block">
                12,400+
              </span>
              <span className="text-[#F4EFE6]/60 uppercase text-[10px] tracking-wider">Garments Saved</span>
            </div>
            <div>
              <span className="font-serif text-2xl font-bold text-[#BA9F7A] block">
                $180K+
              </span>
              <span className="text-[#F4EFE6]/60 uppercase text-[10px] tracking-wider">Paid to Students</span>
            </div>
            <div>
              <span className="font-serif text-2xl font-bold text-[#BA9F7A] block">
                0 kg
              </span>
              <span className="text-[#F4EFE6]/60 uppercase text-[10px] tracking-wider">Campus Transit CO₂</span>
            </div>
          </div>
        </div>

        {/* Platform Links */}
        <div className="col-span-1 md:col-span-2 flex flex-col gap-3">
          <h3 className="text-xs font-sans uppercase tracking-[0.2em] text-[#F4EFE6] font-bold mb-1">
            Platform
          </h3>
          <a href="#curated-finds" className="text-xs font-sans text-[#F4EFE6]/70 hover:text-[#BA9F7A] transition-colors">
            Curated Archives
          </a>
          <a href="#categories" className="text-xs font-sans text-[#F4EFE6]/70 hover:text-[#BA9F7A] transition-colors">
            Trending Categories
          </a>
          <a href="#mystery-bundle" className="text-xs font-sans text-[#F4EFE6]/70 hover:text-[#BA9F7A] transition-colors">
            Mystery Bundle
          </a>
          <a href="#top-curators" className="text-xs font-sans text-[#F4EFE6]/70 hover:text-[#BA9F7A] transition-colors">
            Campus Tastemakers
          </a>
        </div>

        {/* Support Links */}
        <div className="col-span-1 md:col-span-2 flex flex-col gap-3">
          <h3 className="text-xs font-sans uppercase tracking-[0.2em] text-[#F4EFE6] font-bold mb-1">
            Trust & Support
          </h3>
          <a href="#" className="text-xs font-sans text-[#F4EFE6]/70 hover:text-[#BA9F7A] transition-colors">
            Peer Authentication
          </a>
          <a href="#" className="text-xs font-sans text-[#F4EFE6]/70 hover:text-[#BA9F7A] transition-colors">
            Campus Drop Zones
          </a>
          <a href="#" className="text-xs font-sans text-[#F4EFE6]/70 hover:text-[#BA9F7A] transition-colors">
            Sustainability Audit
          </a>
          <a href="#" className="text-xs font-sans text-[#F4EFE6]/70 hover:text-[#BA9F7A] transition-colors">
            Community Guidelines
          </a>
        </div>

        {/* Newsletter Signup */}
        <div className="col-span-1 md:col-span-3">
          <h3 className="text-xs font-sans uppercase tracking-[0.2em] text-[#F4EFE6] font-bold mb-2">
            Secret Drop Alerts
          </h3>
          <p className="text-xs text-[#F4EFE6]/70 font-sans mb-4 leading-relaxed">
            Receive notifications when archival Japanese denim or designer pieces drop on your campus.
          </p>
          <form onSubmit={handleSubscribe} className="flex border border-[#F4EFE6]/20 rounded-full overflow-hidden focus-within:border-[#BA9F7A] transition-colors p-1 bg-[#24362A]">
            <input
              type="email"
              placeholder="campus.email@edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent text-xs px-4 py-2 outline-none flex-1 text-[#F4EFE6] placeholder-[#F4EFE6]/40"
              required
            />
            <button
              type="submit"
              className="bg-[#BA9F7A] text-[#203227] px-6 py-2 text-xs font-sans font-bold uppercase tracking-wider hover:bg-[#CDB696] rounded-full transition-colors"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1440px] mx-auto mt-8 flex flex-col md:flex-row justify-between items-center text-xs font-sans text-[#F4EFE6]/60 gap-4">
        <p>© 2026 ThriftCampus+ — Modern Artisan & Heritage Collegiate Marketplace.</p>
        <div className="flex gap-5">
          <a href="#" className="hover:text-[#BA9F7A] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#BA9F7A] transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-[#BA9F7A] transition-colors">Security</a>
        </div>
      </div>
    </footer>
  );
}
