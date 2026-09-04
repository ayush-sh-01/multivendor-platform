import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function AuthModal() {
  const { isAuthModalOpen, authMode, setAuthMode, closeAuth, login, register } = useAuth();
  const { showToast } = useCart();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('CUSTOMER'); // 'CUSTOMER' | 'VENDOR'
  const [submitting, setSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (authMode === 'login') {
        const u = await login(email, password);
        showToast(`Welcome back, ${u.name}!`, 'success');
      } else {
        const u = await register(name, email, password, role);
        showToast(`Collector account created for ${u.name}!`, 'success');
      }
    } catch {
      showToast('Authentication failed. Check credentials.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleQuickLogin = async (userType) => {
    if (userType === 'customer') {
      await login('customer@dezel.com', 'customer123');
      showToast('Signed in as Demo Student Collector', 'success');
    } else {
      await login('artisan@dezel.com', 'vendor123');
      showToast('Signed in as Demo Campus Tastemaker', 'success');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={closeAuth}
    >
      <div
        className="relative bg-[#161616] border border-[#D49A7A]/35 w-full max-w-md shadow-2xl p-6 md:p-8 rounded-3xl text-[#DCDCDC]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeAuth}
          className="absolute top-4 right-4 w-8 h-8 bg-[#1F1F1F] border border-[#D49A7A]/30 text-[#DCDCDC] hover:text-[#D49A7A] hover:border-[#D49A7A] rounded-full flex items-center justify-center text-xs transition-colors cursor-pointer"
        >
          ✕
        </button>

        {/* Tab Toggle */}
        <div className="flex border-b border-[#D49A7A]/20 mb-6">
          <button
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-2.5 text-xs font-sans uppercase tracking-[0.16em] transition-colors font-bold ${
              authMode === 'login'
                ? 'border-b-2 border-[#D49A7A] text-[#D49A7A] -mb-[1px]'
                : 'text-[#A8A8A8] hover:text-[#DCDCDC]'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setAuthMode('register')}
            className={`flex-1 py-2.5 text-xs font-sans uppercase tracking-[0.16em] transition-colors font-bold ${
              authMode === 'register'
                ? 'border-b-2 border-[#D49A7A] text-[#D49A7A] -mb-[1px]'
                : 'text-[#A8A8A8] hover:text-[#DCDCDC]'
            }`}
          >
            Join Vault
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {authMode === 'register' && (
            <div>
              <label className="text-[10px] uppercase font-sans font-bold tracking-wider text-[#D49A7A] block mb-1">
                Full Name / Handle:
              </label>
              <input
                type="text"
                placeholder="e.g. Maya Chen"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#121212] border border-[#D49A7A]/30 text-xs text-[#DCDCDC] p-3 rounded-full outline-none focus:border-[#D49A7A]"
                required
              />
            </div>
          )}

          <div>
            <label className="text-[10px] uppercase font-sans font-bold tracking-wider text-[#D49A7A] block mb-1">
              University Email (.edu):
            </label>
            <input
              type="email"
              placeholder="collector@university.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#121212] border border-[#D49A7A]/30 text-xs text-[#DCDCDC] p-3 rounded-full outline-none focus:border-[#D49A7A]"
              required
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-sans font-bold tracking-wider text-[#D49A7A] block mb-1">
              Password:
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#121212] border border-[#D49A7A]/30 text-xs text-[#DCDCDC] p-3 rounded-full outline-none focus:border-[#D49A7A]"
              required
            />
          </div>

          {authMode === 'register' && (
            <div>
              <label className="text-[10px] uppercase font-sans font-bold tracking-wider text-[#D49A7A] block mb-1.5">
                Role on Campus:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('CUSTOMER')}
                  className={`py-2 px-3 rounded-full text-xs font-sans font-semibold border transition-all ${
                    role === 'CUSTOMER'
                      ? 'border-[#D49A7A] bg-[#D49A7A] text-[#121212] font-bold'
                      : 'border-[#D49A7A]/25 bg-[#121212] text-[#DCDCDC]'
                  }`}
                >
                  Collector
                </button>
                <button
                  type="button"
                  onClick={() => setRole('VENDOR')}
                  className={`py-2 px-3 rounded-full text-xs font-sans font-semibold border transition-all ${
                    role === 'VENDOR'
                      ? 'border-[#D49A7A] bg-[#D49A7A] text-[#121212] font-bold'
                      : 'border-[#D49A7A]/25 bg-[#121212] text-[#DCDCDC]'
                  }`}
                >
                  Curator / Seller
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full btn-rosegold-pill py-3 mt-4 disabled:opacity-50"
          >
            {submitting ? 'Authenticating...' : authMode === 'login' ? 'Sign In to Vault' : 'Create Collector Profile'}
          </button>
        </form>

        {/* Quick Demo Access Pills */}
        <div className="mt-6 pt-5 border-t border-[#D49A7A]/20">
          <span className="text-[10px] uppercase font-sans text-[#A8A8A8] block text-center mb-2.5">
            Instant Demo Authentication:
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('customer')}
              className="btn-outline-pill text-[10px] py-2 px-2 text-center justify-center"
            >
              Demo Collector
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('artisan')}
              className="btn-outline-pill text-[10px] py-2 px-2 text-center justify-center"
            >
              Demo Curator
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
