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
        className={`px-5 py-3.5 rounded-full border shadow-2xl flex items-center gap-3 text-xs font-sans font-semibold uppercase tracking-wider backdrop-blur-xl ${
          isError
            ? 'bg-[#3A1E1E] text-red-200 border-red-400/40'
            : isInfo
            ? 'bg-[#203227] text-[#F4EFE6] border-[#F4EFE6]/20'
            : 'bg-[#B56653] text-[#F4EFE6] border-white/20'
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
