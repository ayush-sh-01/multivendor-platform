import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { InfinityIcon } from './LineIcons';

export default function CartDrawer() {
  const {
    items,
    totalPrice,
    totalCount,
    isDrawerOpen,
    setIsDrawerOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    checkout
  } = useCart();

  const [pickupLocation, setPickupLocation] = useState('student-center');
  const [checkingOut, setCheckingOut] = useState(false);

  if (!isDrawerOpen) return null;

  const handlePlaceOrder = async () => {
    setCheckingOut(true);
    await checkout();
    setCheckingOut(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsDrawerOpen(false)}
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-[#161616] text-[#DCDCDC] border-l border-[#D49A7A]/25 shadow-2xl flex flex-col justify-between p-6 md:p-8 animate-slideLeft">
          
          {/* Top Header */}
          <div>
            <div className="flex items-center justify-between pb-5 border-b border-[#D49A7A]/20">
              <div className="flex items-center gap-2.5">
                <span className="font-serif text-2xl font-bold text-[#D49A7A] uppercase">
                  Archival Bag ({totalCount})
                </span>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="w-8 h-8 bg-[#1F1F1F] border border-[#D49A7A]/30 text-[#DCDCDC] hover:text-[#D49A7A] hover:border-[#D49A7A] rounded-full flex items-center justify-center text-xs font-bold transition-all cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Zero-Carbon Banner */}
            <div className="my-5 p-3.5 bg-[#1F1F1F] border border-[#D49A7A]/30 rounded-2xl text-xs font-sans text-[#DCDCDC] flex items-center gap-2.5">
              <InfinityIcon className="w-4 h-4 shrink-0" color="#D49A7A" />
              <span>Zero-Carbon Peer Campus Hand-off Active</span>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto my-4 space-y-3.5 pr-1">
            {items.length === 0 ? (
              <div className="text-center py-20 text-[#A8A8A8]">
                <span className="material-symbols-outlined text-5xl text-[#D49A7A]/40 mb-3 block">
                  shopping_bag
                </span>
                <p className="font-serif text-lg text-[#DCDCDC] mb-1">Your bag is empty</p>
                <p className="text-xs">Browse the vault for authenticated student pieces.</p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 bg-[#F2EBE5] text-[#1F1713] rounded-2xl border border-[#3D2E24]/30 shadow-md flex gap-3.5 items-center"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-16 h-20 object-cover rounded-xl border border-[#3D2E24]/20 bg-[#121212]"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-xs sm:text-sm font-bold truncate text-[#1F1713]">
                      {item.name}
                    </h4>
                    <p className="text-[10px] text-[#3D2E24]/80 mt-0.5">
                      {item.size || 'M'} • {item.condition || 'Inspected'}
                    </p>
                    <span className="font-serif text-sm font-bold text-[#1F1713] block mt-1">
                      ₹{item.price}
                    </span>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[10px] text-rose-800 hover:text-rose-950 font-bold uppercase transition-colors"
                    >
                      Remove
                    </button>
                    <div className="flex items-center gap-1.5 bg-[#E2D8CE] px-2 py-0.5 rounded-full text-xs">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-1 text-[#1F1713] hover:text-black font-bold"
                      >
                        -
                      </button>
                      <span className="font-bold text-[#1F1713] text-xs px-1">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-1 text-[#1F1713] hover:text-black font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Bottom Checkout Controls */}
          {items.length > 0 && (
            <div className="pt-4 border-t border-[#D49A7A]/20 space-y-4">
              <div>
                <label className="text-[10px] uppercase font-sans font-bold tracking-wider text-[#D49A7A] block mb-1.5">
                  Campus Hand-Off Point:
                </label>
                <select
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full bg-[#1F1F1F] border border-[#D49A7A]/30 text-[#DCDCDC] text-xs py-2.5 px-3 rounded-full outline-none focus:border-[#D49A7A]"
                >
                  <option value="student-center">Main Student Union (Atrium Hub)</option>
                  <option value="library">University Library (North Entrance)</option>
                  <option value="design-studio">Architecture & Design Hall</option>
                </select>
              </div>

              <div className="flex justify-between items-baseline pt-2">
                <span className="text-xs uppercase font-sans font-medium text-[#A8A8A8]">Vault Total</span>
                <span className="font-serif text-3xl font-bold text-[#D49A7A]">₹{totalPrice}</span>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={checkingOut}
                className="w-full btn-rosegold-pill py-3.5 shadow-xl disabled:opacity-50"
              >
                {checkingOut ? 'Authenticating Order...' : `Reserve for Pickup • ₹${totalPrice}`}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
