import React from 'react';
import { HOW_IT_WORKS_STEPS } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';

export default function HowItWorks() {
  const { isAuthenticated, openAuth } = useAuth();
  const { setIsUploadModalOpen } = useProducts();

  return (
    <section id="how-it-works" className="py-20 px-6 md:px-12 max-w-[1440px] mx-auto bg-[#2C4234] text-[#F4EFE6]">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="w-6 h-[1px] bg-[#BA9F7A]"></span>
          <span className="text-[11px] uppercase font-sans font-bold tracking-[0.25em] text-[#BA9F7A]">
            Campus Circulation
          </span>
          <span className="w-6 h-[1px] bg-[#BA9F7A]"></span>
        </div>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#F4EFE6] tracking-tight">
          How ThriftCampus+ Operates
        </h2>
        <p className="text-xs sm:text-sm font-sans text-[#F4EFE6]/70 mt-3 leading-relaxed">
          Zero delivery pollution. Zero middleman fees. Direct peer-to-peer circulation between verified students.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
        {HOW_IT_WORKS_STEPS.map((step) => (
          <div
            key={step.number}
            className="p-8 rounded-lg bg-[#203227] border border-[#F4EFE6]/15 hover:border-[#BA9F7A] transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <span className="font-serif text-4xl font-bold text-[#BA9F7A] block mb-5">
                {step.number}
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#F4EFE6] mb-3">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm font-sans text-[#F4EFE6]/70 leading-relaxed">
                {step.desc}
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#F4EFE6]/10 flex items-center gap-2 text-xs font-sans text-[#BA9F7A]">
              <span>Verified Campus Step</span>
              <span>✓</span>
            </div>
          </div>
        ))}
      </div>

      {/* Seller CTA Box */}
      <div className="p-8 md:p-10 rounded-xl bg-[#24362A] border border-[#BA9F7A]/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-serif text-2xl font-bold text-[#F4EFE6] mb-1">
            Have Curated Clothes Sitting in Your Dorm?
          </h3>
          <p className="text-xs sm:text-sm font-sans text-[#F4EFE6]/70">
            List in 60 seconds. Keep 100% of your earnings. Hand off at your student center.
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
          className="premium-btn py-3.5 px-8 text-xs whitespace-nowrap shrink-0"
        >
          <span>Start Selling on Campus</span>
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </button>
      </div>
    </section>
  );
}
