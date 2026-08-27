import React from 'react';
import { useCart } from '../context/CartContext';

export default function Toast() {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  const isError = toastMessage.type === 'error';
  const isInfo = toastMessage.type === 'info';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slideUp">
      <div
        className={`px-5 py-3.5 rounded-sm border shadow-goldLg flex items-center gap-3 text-xs font-sans font-semibold uppercase tracking-wider backdrop-blur-xl ${
          isError
            ? 'bg-[#181010] text-[#ffb4ab] border-red-500/40'
            : isInfo
            ? 'bg-[#141414] text-[#E0E0E0] border-white/20'
            : 'bg-[#141414] text-gold border-gold/50 shadow-gold'
        }`}
      >
        <span className="material-symbols-outlined text-lg">
          {isError ? 'error' : isInfo ? 'info' : 'check_circle'}
        </span>
        <span>{toastMessage.message}</span>
      </div>
    </div>
  );
}
