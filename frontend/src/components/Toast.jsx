import React from 'react';
import { useCart } from '../context/CartContext';

export default function Toast() {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  const isError = toastMessage.type === 'error';
  const isInfo = toastMessage.type === 'info';

  return (
    <div className="fixed bottom-24 right-6 z-50 animate-slideUp">
      <div
        className={`px-5 py-3 rounded-full border shadow-2xl flex items-center gap-3 text-xs font-sans font-bold uppercase tracking-[0.14em] backdrop-blur-xl ${
          isError
            ? 'bg-[#2A0E14] text-rose-300 border-rose-500/40'
            : isInfo
            ? 'bg-[#161616] text-[#DCDCDC] border-[#D49A7A]/30'
            : 'bg-[#F2EBE5] text-[#1F1713] border-[#3D2E24]'
        }`}
      >
        <span className="material-symbols-outlined text-base">
          {isError ? 'error' : isInfo ? 'info' : 'verified'}
        </span>
        <span>{toastMessage.message}</span>
      </div>
    </div>
  );
}
