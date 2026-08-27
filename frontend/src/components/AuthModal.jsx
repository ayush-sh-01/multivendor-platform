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
        showToast(`Account created for ${u.name}!`, 'success');
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
      showToast('Signed in as Demo Student', 'success');
    } else {
      await login('artisan@dezel.com', 'vendor123');
      showToast('Signed in as Demo Campus Curator', 'success');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn"
      onClick={closeAuth}
    >
      <div
        className="relative bg-[#203227] border border-[#F4EFE6]/20 w-full max-w-md shadow-2xl p-6 md:p-8 rounded-xl text-[#F4EFE6]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeAuth}
          className="absolute top-4 right-4 w-8 h-8 bg-[#2C4234] border border-[#F4EFE6]/20 text-[#F4EFE6] hover:text-[#BA9F7A] hover:border-[#BA9F7A] rounded-full flex items-center justify-center text-xs transition-colors"
        >
          ✕
        </button>

        {/* Tab Toggle */}
        <div className="flex border-b border-[#F4EFE6]/15 mb-6">
          <button
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-2.5 text-xs font-sans uppercase tracking-wider transition-colors font-semibold ${
              authMode === 'login'
                ? 'border-b-2 border-[#BA9F7A] text-[#BA9F7A] -mb-[1px]'
                : 'text-[#F4EFE6]/60 hover:text-[#F4EFE6]'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setAuthMode('register')}
            className={`flex-1 py-2.5 text-xs font-sans uppercase tracking-wider transition-colors font-semibold ${
              authMode === 'register'
                ? 'border-b-2 border-[#BA9F7A] text-[#BA9F7A] -mb-[1px]'
                : 'text-[#F4EFE6]/60 hover:text-[#F4EFE6]'
            }`}
          >
            Join Network
          </button>
        </div>

        <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#F4EFE6] mb-1.5">
          {authMode === 'login' ? 'Student Sign In' : 'Join ThriftCampus+'}
        </h3>
        <p className="text-xs text-[#F4EFE6]/70 font-sans mb-6">
          Access curated student drops, zero-commission selling, and peer authentications.
        </p>

        {/* 1-Click Quick Demo Login */}
        <div className="mb-6 p-3.5 bg-[#24362A] border border-[#BA9F7A]/30 rounded-lg">
          <span className="text-[10px] uppercase font-sans font-bold text-[#BA9F7A] block mb-2 tracking-wider">
            ⚡ 1-Click Instant Demo Login:
          </span>
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={() => handleQuickLogin('customer')}
              className="flex-1 py-2 bg-[#2C4234] text-[#F4EFE6] text-[11px] font-sans font-semibold uppercase tracking-wider border border-[#F4EFE6]/20 hover:border-[#BA9F7A] rounded-full transition-colors"
            >
              Demo Student
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('curator')}
              className="flex-1 py-2 bg-[#B56653] text-[#F4EFE6] text-[11px] font-sans font-bold uppercase tracking-wider hover:bg-[#9E5442] rounded-full transition-colors"
            >
              Demo Curator
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
          {authMode === 'register' && (
            <div>
              <label className="block text-[#F4EFE6]/80 uppercase tracking-wider mb-1.5 font-semibold text-[11px]">
                Your Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. Maya Chen"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#2C4234] border border-[#F4EFE6]/20 p-3 rounded-lg outline-none text-[#F4EFE6] focus:border-[#BA9F7A] transition-colors placeholder-[#F4EFE6]/40"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-[#F4EFE6]/80 uppercase tracking-wider mb-1.5 font-semibold text-[11px]">
              Campus / Personal Email
            </label>
            <input
              type="email"
              placeholder="e.g. student@nyu.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#2C4234] border border-[#F4EFE6]/20 p-3 rounded-lg outline-none text-[#F4EFE6] focus:border-[#BA9F7A] transition-colors placeholder-[#F4EFE6]/40"
              required
            />
          </div>

          <div>
            <label className="block text-[#F4EFE6]/80 uppercase tracking-wider mb-1.5 font-semibold text-[11px]">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#2C4234] border border-[#F4EFE6]/20 p-3 rounded-lg outline-none text-[#F4EFE6] focus:border-[#BA9F7A] transition-colors placeholder-[#F4EFE6]/40"
              required
            />
          </div>

          {authMode === 'register' && (
            <div>
              <label className="block text-[#F4EFE6]/80 uppercase tracking-wider mb-1.5 font-semibold text-[11px]">
                Account Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-[#2C4234] border border-[#F4EFE6]/20 p-3 rounded-lg outline-none text-[#F4EFE6] focus:border-[#BA9F7A] transition-colors"
              >
                <option value="CUSTOMER">Student Buyer</option>
                <option value="VENDOR">Campus Curator / Seller</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full premium-btn py-3.5 mt-4"
          >
            {submitting
              ? 'Processing...'
              : authMode === 'login'
              ? 'Sign In to Account'
              : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
}
