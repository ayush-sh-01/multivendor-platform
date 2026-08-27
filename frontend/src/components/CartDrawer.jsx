import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

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
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsDrawerOpen(false)}
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-[#203227] text-[#F4EFE6] border-l border-[#F4EFE6]/15 shadow-2xl flex flex-col justify-between p-6 md:p-8 animate-slideLeft">
          {/* Top Header */}
          <div>
            <div className="flex items-center justify-between pb-5 border-b border-[#F4EFE6]/15">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-2xl text-[#BA9F7A]">
                  shopping_bag
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#F4EFE6]">
                  Shopping Bag ({totalCount})
                </h3>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="w-8 h-8 bg-[#2C4234] border border-[#F4EFE6]/20 text-[#F4EFE6] hover:text-[#BA9F7A] hover:border-[#BA9F7A] rounded-full flex items-center justify-center text-xs font-bold transition-all"
              >
                ✕
              </button>
            </div>

            {/* Zero-Carbon Banner */}
            <div className="my-5 p-3.5 bg-[#24362A] border border-[#BA9F7A]/30 rounded-lg text-xs font-sans text-[#F4EFE6] flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#BA9F7A] text-lg">eco</span>
              <span>Zero-Carbon Campus Hand-off Active</span>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto my-4 space-y-3.5 pr-1">
            {items.length === 0 ? (
              <div className="text-center py-20 text-[#F4EFE6]/60">
                <span className="material-symbols-outlined text-5xl text-[#BA9F7A]/40 mb-3 block">
                  shopping_bag
                </span>
                <p className="font-serif text-xl text-[#F4EFE6]">Your bag is empty</p>
                <p className="text-xs font-sans mt-1.5 text-[#F4EFE6]/60">
                  Explore curated pieces from top student archives.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 p-3.5 bg-[#24362A] border border-[#F4EFE6]/10 rounded-lg items-center justify-between"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md border border-[#F4EFE6]/10"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-serif font-bold text-[#F4EFE6] truncate">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-[#BA9F7A] font-sans mt-0.5">
                      ${item.price} • {item.size}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-5 h-5 bg-[#2C4234] border border-[#F4EFE6]/20 text-[#F4EFE6] rounded flex items-center justify-center text-xs hover:border-[#BA9F7A]"
                      >
                        -
                      </button>
                      <span className="text-xs font-sans font-bold text-white px-1">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-5 h-5 bg-[#2C4234] border border-[#F4EFE6]/20 text-[#F4EFE6] rounded flex items-center justify-center text-xs hover:border-[#BA9F7A]"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-sans font-bold text-white">
                      ${item.price * item.quantity}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[#F4EFE6]/60 hover:text-red-400 text-xs mt-2.5 transition-colors"
                      title="Remove"
                    >
                      <span className="material-symbols-outlined text-base">delete</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout */}
          {items.length > 0 && (
            <div className="pt-5 border-t border-[#F4EFE6]/15">
              {/* Pickup Option */}
              <div className="mb-4">
                <label className="block text-[11px] font-sans uppercase tracking-wider text-[#F4EFE6]/80 mb-1.5 font-semibold">
                  Campus Hand-off Location:
                </label>
                <select
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full bg-[#24362A] border border-[#F4EFE6]/20 p-2.5 text-xs font-sans text-[#F4EFE6] outline-none focus:border-[#BA9F7A] rounded-lg"
                >
                  <option value="student-center">Kimmel Student Center (NYU)</option>
                  <option value="parsons-lobby">Parsons Design Lobby (66 5th Ave)</option>
                  <option value="direct-shipping">Direct Tracked Shipping (+$5)</option>
                </select>
              </div>

              {/* Price Breakdown */}
              <div className="flex justify-between items-center text-xs font-sans mb-1 text-[#F4EFE6]/70">
                <span>Subtotal ({totalCount} items):</span>
                <span className="text-white">${totalPrice}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-sans mb-4 text-[#F4EFE6]/70">
                <span>Campus Carbon Offset Fee:</span>
                <span className="text-[#BA9F7A] font-bold">FREE ($0.00)</span>
              </div>

              <div className="flex justify-between items-center text-base font-serif font-bold mb-5 pb-3 border-b border-[#F4EFE6]/15">
                <span className="text-[#F4EFE6]">Total:</span>
                <span className="text-white text-2xl font-sans">${totalPrice}</span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={clearCart}
                  className="w-1/3 py-3 border border-[#F4EFE6]/25 bg-transparent text-xs font-sans uppercase tracking-wider text-[#F4EFE6] hover:border-[#F4EFE6] rounded-full transition-colors"
                >
                  Clear
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={checkingOut}
                  className="w-2/3 premium-btn py-3 text-xs"
                >
                  <span className="material-symbols-outlined text-base font-bold">check_circle</span>
                  <span>{checkingOut ? 'Placing Order...' : 'Place Order'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
