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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={closeAuth}
    >
      <div
        className="relative bg-[#141414] border border-gold/40 w-full max-w-md shadow-goldLg p-6 md:p-8 rounded-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeAuth}
          className="absolute top-4 right-4 w-7 h-7 bg-[#0A0A0A] border border-white/20 text-[#E0E0E0] hover:text-gold hover:border-gold rounded-sm flex items-center justify-center text-xs transition-colors"
        >
          ✕
        </button>

        {/* Tab Toggle */}
        <div className="flex border-b border-white/10 mb-6">
          <button
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-2.5 text-xs font-sans uppercase tracking-wider transition-colors font-semibold ${
              authMode === 'login'
                ? 'border-b-2 border-gold text-gold -mb-[1px]'
                : 'text-text-muted hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setAuthMode('register')}
            className={`flex-1 py-2.5 text-xs font-sans uppercase tracking-wider transition-colors font-semibold ${
              authMode === 'register'
                ? 'border-b-2 border-gold text-gold -mb-[1px]'
                : 'text-text-muted hover:text-white'
            }`}
          >
            Join Network
          </button>
        </div>

        <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-1.5">
          {authMode === 'login' ? 'Student Sign In' : 'Join ThriftCampus'}
        </h3>
        <p className="text-xs text-text-muted font-sans mb-6">
          Access curated student drops, zero-commission selling, and peer authentications.
        </p>

        {/* 1-Click Quick Demo Login */}
        <div className="mb-6 p-3.5 bg-[#1A1A1A] border border-gold/20 rounded-sm">
          <span className="text-[10px] uppercase font-sans font-bold text-gold block mb-2 tracking-wider">
            ⚡ 1-Click Instant Demo Login:
          </span>
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={() => handleQuickLogin('customer')}
              className="flex-1 py-2 bg-[#141414] text-[#E0E0E0] text-[11px] font-sans font-semibold uppercase tracking-wider border border-white/15 hover:border-gold hover:text-gold rounded-sm transition-colors"
            >
              Demo Student
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('curator')}
              className="flex-1 py-2 bg-gold/15 text-gold text-[11px] font-sans font-bold uppercase tracking-wider border border-gold/40 hover:bg-gold hover:text-[#0A0A0A] rounded-sm transition-colors"
            >
              Demo Curator
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
          {authMode === 'register' && (
            <div>
              <label className="block text-text-muted uppercase tracking-wider mb-1.5 font-semibold text-[11px]">
                Your Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. Maya Chen"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-white/15 p-3 rounded-sm outline-none text-[#E0E0E0] focus:border-gold transition-colors placeholder-text-dim"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-text-muted uppercase tracking-wider mb-1.5 font-semibold text-[11px]">
              Campus / Personal Email
            </label>
            <input
              type="email"
              placeholder="e.g. student@nyu.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#1A1A1A] border border-white/15 p-3 rounded-sm outline-none text-[#E0E0E0] focus:border-gold transition-colors placeholder-text-dim"
              required
            />
          </div>

          <div>
            <label className="block text-text-muted uppercase tracking-wider mb-1.5 font-semibold text-[11px]">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#1A1A1A] border border-white/15 p-3 rounded-sm outline-none text-[#E0E0E0] focus:border-gold transition-colors placeholder-text-dim"
              required
            />
          </div>

          {authMode === 'register' && (
            <div>
              <label className="block text-text-muted uppercase tracking-wider mb-1.5 font-semibold text-[11px]">
                Account Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-white/15 p-3 rounded-sm outline-none text-[#E0E0E0] focus:border-gold transition-colors"
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
