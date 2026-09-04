import React from 'react';
import { HOW_IT_WORKS_STEPS } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { ScalesIcon, InfinityIcon, ShieldIcon } from './LineIcons';

export default function HowItWorks() {
  const { isAuthenticated, openAuth } = useAuth();
  const { setIsUploadModalOpen } = useProducts();

  const stepIcons = [
    <ScalesIcon key="1" className="w-6 h-6" color="#D49A7A" />,
    <InfinityIcon key="2" className="w-6 h-6" color="#D49A7A" />,
    <ShieldIcon key="3" className="w-6 h-6" color="#D49A7A" />
  ];

  return (
    <section id="how-it-works" className="py-24 px-6 md:px-12 max-w-[1440px] mx-auto bg-[#121212] text-[#DCDCDC]">
      
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="flex items-center justify-center gap-2 mb-2.5">
          <span className="w-6 h-[1px] bg-[#D49A7A]"></span>
          <span className="text-[11px] uppercase font-sans font-bold tracking-[0.25em] text-[#D49A7A]">
            Campus Circulation Protocol
          </span>
          <span className="w-6 h-[1px] bg-[#D49A7A]"></span>
        </div>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#D49A7A] tracking-tight uppercase">
          How ThriftCampus Operates
        </h2>
        <p className="text-xs sm:text-sm font-sans text-[#DCDCDC]/75 mt-3 leading-relaxed">
          Zero middleman extortion. Zero plastic packaging. Direct peer-to-peer circulation between verified university fashion collectors.
        </p>
      </div>

      {/* 3 Step Process Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
        {HOW_IT_WORKS_STEPS.map((step, idx) => (
          <div
            key={step.number}
            className="p-8 rounded-2xl bg-[#181818] border border-[#D49A7A]/25 hover:border-[#D49A7A] transition-all duration-300 flex flex-col justify-between shadow-lg hover:-translate-y-1"
          >
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="font-serif text-3xl font-bold text-[#D49A7A]">
                  0{step.number}
                </span>
                <div className="p-2.5 rounded-full bg-[#121212] border border-[#D49A7A]/30">
                  {stepIcons[idx] || stepIcons[0]}
                </div>
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#FAF7F2] mb-3 uppercase tracking-wide">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm font-sans text-[#A8A8A8] leading-relaxed">
                {step.desc}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-[#D49A7A]/15 flex items-center gap-2 text-xs font-sans text-[#D49A7A]">
              <span>Verified Campus Step</span>
              <span className="font-bold">✓</span>
            </div>
          </div>
        ))}
      </div>

      {/* Seller Callout Box */}
      <div className="p-8 md:p-12 rounded-2xl bg-charcoal-pattern border border-[#D49A7A]/35 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#D49A7A] mb-1.5 uppercase">
            Have Rare Garments Dormant In Your Closet?
          </h3>
          <p className="text-xs sm:text-sm font-sans text-[#DCDCDC]/75 max-w-xl">
            List in under 60 seconds. Keep 100% of your earnings. Hand off safely on your campus quad or design studio.
          </p>
        </div>
        <button
          onClick={() => {
            if (!isAuthenticated) {
              openAuth('register');
            } else {
              setIsUploadModalOpen(true);
            }
          }}
          className="btn-rosegold-pill py-3.5 px-8 text-xs whitespace-nowrap shrink-0 group"
        >
          <span>List Archival Piece</span>
          <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-1">
            arrow_forward
          </span>
        </button>
      </div>

    </section>
  );
}
