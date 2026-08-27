import React from 'react';
import { HOW_IT_WORKS_STEPS } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';

export default function HowItWorks() {
  const { isAuthenticated, openAuth } = useAuth();
  const { setIsUploadModalOpen } = useProducts();

  return (
    <section id="how-it-works" className="py-20 px-6 md:px-12 max-w-[1440px] mx-auto border-t border-white/10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 scroll-reveal">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-[1px] bg-gold"></span>
            <span className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-gold">
              Circular Economy
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white tracking-tight">
            How Campus Curation Works
          </h2>
        </div>
        <p className="text-sm font-sans text-text-muted max-w-md mt-3 md:mt-0 leading-relaxed">
          We built ThriftCampus to eliminate landfill fashion waste and empower university creators to trade archival style directly without middleman markups.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {HOW_IT_WORKS_STEPS.map((step, idx) => (
          <div
            key={step.number}
            className="p-8 rounded-sm bg-[#141414] border border-white/10 hover:border-gold/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-gold flex flex-col justify-between scroll-reveal group"
            style={{ transitionDelay: `${idx * 0.1}s` }}
          >
            <div>
              <span className="font-serif text-5xl font-bold text-gold/30 block mb-4 group-hover:text-gold transition-colors duration-300">
                {step.number}
              </span>
              <h3 className="font-serif text-2xl font-bold mb-3 text-white">
                {step.title}
              </h3>
              <p className="text-sm font-sans text-text-muted leading-relaxed">
                {step.desc}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-sans text-text-muted">
              <span className="uppercase tracking-wider">Step {step.number} of 03</span>
              <span className="material-symbols-outlined text-base text-gold">verified</span>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Box in Dark Gold Glassmorphism */}
      <div className="mt-14 p-8 md:p-10 rounded-sm bg-gradient-to-r from-[#181818] via-[#141414] to-[#181818] border border-gold/30 flex flex-col md:flex-row justify-between items-center gap-6 shadow-darkLg scroll-reveal">
        <div>
          <h4 className="font-serif text-2xl md:text-3xl font-bold text-white mb-2">
            Have clothes in your dorm closet?
          </h4>
          <p className="text-xs md:text-sm font-sans text-text-muted">
            Upload in under 2 minutes. Get paid directly or trade for campus archival grails.
          </p>
        </div>
        <button
          onClick={() => {
            if (!isAuthenticated) openAuth('login');
            else setIsUploadModalOpen(true);
          }}
          className="premium-btn py-3.5 px-8 whitespace-nowrap"
        >
          Start Curating Now
        </button>
      </div>
    </section>
  );
}
