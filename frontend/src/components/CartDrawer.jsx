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
        <div className="w-screen max-w-md bg-[#0E0E0E] border-l border-white/10 shadow-darkLg flex flex-col justify-between p-6 md:p-8 animate-slideLeft">
          {/* Top Header */}
          <div>
            <div className="flex items-center justify-between pb-5 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-2xl text-gold">
                  shopping_bag
                </span>
                <h3 className="font-serif text-2xl font-bold text-white">
                  Shopping Bag ({totalCount})
                </h3>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="w-8 h-8 bg-[#181818] border border-white/15 text-[#E0E0E0] hover:text-gold hover:border-gold rounded-sm flex items-center justify-center text-xs font-bold transition-all"
              >
                ✕
              </button>
            </div>

            {/* Zero-Carbon Indicator */}
            <div className="my-5 p-3.5 bg-[#141414] border border-gold/30 rounded-sm text-xs font-sans text-[#E0E0E0] flex items-center gap-2.5">
              <span className="material-symbols-outlined text-gold text-lg">eco</span>
              <span>Zero-Carbon Campus Hand-off Active</span>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto my-4 space-y-3.5 pr-1">
            {items.length === 0 ? (
              <div className="text-center py-20 text-text-muted">
                <span className="material-symbols-outlined text-5xl text-gold/40 mb-3 block">
                  shopping_bag
                </span>
                <p className="font-serif text-xl text-white">Your bag is empty</p>
                <p className="text-xs font-sans mt-1.5 text-text-muted">
                  Explore curated pieces from top student archives.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 p-3.5 bg-[#141414] border border-white/10 rounded-sm items-center justify-between"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-sm border border-white/10"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-serif font-bold text-white truncate">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-text-muted font-sans mt-0.5">
                      ${item.price} • {item.size}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-5 h-5 bg-[#1E1E1E] border border-white/20 text-white rounded-sm flex items-center justify-center text-xs hover:border-gold"
                      >
                        -
                      </button>
                      <span className="text-xs font-sans font-bold text-white px-1">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-5 h-5 bg-[#1E1E1E] border border-white/20 text-white rounded-sm flex items-center justify-center text-xs hover:border-gold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-sans font-bold text-gold">
                      ${item.price * item.quantity}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-text-muted hover:text-error text-xs mt-2.5 transition-colors"
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
            <div className="pt-5 border-t border-white/10">
              {/* Pickup Option */}
              <div className="mb-4">
                <label className="block text-[11px] font-sans uppercase tracking-wider text-text-muted mb-1.5 font-semibold">
                  Campus Hand-off Location:
                </label>
                <select
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full bg-[#141414] border border-white/15 p-2.5 text-xs font-sans text-[#E0E0E0] outline-none focus:border-gold rounded-sm"
                >
                  <option value="student-center">Kimmel Student Center (NYU)</option>
                  <option value="parsons-lobby">Parsons Design Lobby (66 5th Ave)</option>
                  <option value="direct-shipping">Direct Tracked Shipping (+$5)</option>
                </select>
              </div>

              {/* Price Breakdown */}
              <div className="flex justify-between items-center text-xs font-sans mb-1 text-text-muted">
                <span>Subtotal ({totalCount} items):</span>
                <span className="text-white">${totalPrice}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-sans mb-4 text-text-muted">
                <span>Campus Carbon Offset Fee:</span>
                <span className="text-gold font-bold">FREE ($0.00)</span>
              </div>

              <div className="flex justify-between items-center text-base font-serif font-bold mb-5 pb-3 border-b border-white/10">
                <span className="text-white">Total:</span>
                <span className="text-gold text-2xl font-sans">${totalPrice}</span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={clearCart}
                  className="w-1/3 py-3 border border-white/20 bg-transparent text-xs font-sans uppercase tracking-wider text-[#E0E0E0] hover:border-white/50 rounded-full transition-colors"
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
