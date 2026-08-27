import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function UploadModal() {
  const { isUploadModalOpen, setIsUploadModalOpen, addProduct } = useProducts();
  const { user, token } = useAuth();
  const { showToast } = useCart();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('Denim');
  const [size, setSize] = useState('Size M');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isUploadModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      await addProduct(
        {
          name,
          category,
          size,
          price: parseFloat(price),
          description,
          imageUrl: imageUrl || 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=700&q=80',
          condition: '9.5/10 Inspected by Curator',
          curator: user?.name || 'Campus Student',
          campus: 'Campus Network'
        },
        token
      );
      showToast(`Piece "${name}" uploaded to live feed!`, 'success');
      setName('');
      setPrice('');
      setDescription('');
      setImageUrl('');
    } catch {
      showToast('Failed to upload garment.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={() => setIsUploadModalOpen(false)}
    >
      <div
        className="relative bg-[#141414] border border-gold/40 w-full max-w-lg shadow-goldLg p-6 md:p-8 rounded-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsUploadModalOpen(false)}
          className="absolute top-4 right-4 w-7 h-7 bg-[#0A0A0A] border border-white/20 text-[#E0E0E0] hover:text-gold hover:border-gold rounded-sm flex items-center justify-center text-xs transition-colors"
        >
          ✕
        </button>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-5 h-[1px] bg-gold"></span>
            <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-gold">
              Campus Drop Portal
            </span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-white">Upload a Curated Piece</h3>
          <p className="text-xs text-text-muted font-sans mt-1">
            List clothing from your closet. Verified student accounts receive zero-commission payouts.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
          <div>
            <label className="block text-text-muted uppercase tracking-wider mb-1.5 font-semibold text-[11px]">
              Piece Title *
            </label>
            <input
              type="text"
              placeholder="e.g. 90s Carhartt Detroit Jacket"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#1A1A1A] border border-white/15 p-3 rounded-sm outline-none text-[#E0E0E0] focus:border-gold transition-colors placeholder-text-dim"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-text-muted uppercase tracking-wider mb-1.5 font-semibold text-[11px]">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-white/15 p-3 rounded-sm outline-none text-[#E0E0E0] focus:border-gold transition-colors"
              >
                <option value="Denim">Archival Denim</option>
                <option value="Outerwear">Heavy Outerwear</option>
                <option value="Knitwear">Textured Knits</option>
                <option value="Avant-Garde">Avant-Garde Pieces</option>
                <option value="Bottoms">Trousers & Bottoms</option>
              </select>
            </div>

            <div>
              <label className="block text-text-muted uppercase tracking-wider mb-1.5 font-semibold text-[11px]">
                Size
              </label>
              <input
                type="text"
                placeholder="e.g. Size M or 32"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-white/15 p-3 rounded-sm outline-none text-[#E0E0E0] focus:border-gold transition-colors placeholder-text-dim"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-text-muted uppercase tracking-wider mb-1.5 font-semibold text-[11px]">
                Price ($ USD) *
              </label>
              <input
                type="number"
                placeholder="e.g. 85"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-white/15 p-3 rounded-sm outline-none text-[#E0E0E0] focus:border-gold transition-colors placeholder-text-dim"
                required
              />
            </div>

            <div>
              <label className="block text-text-muted uppercase tracking-wider mb-1.5 font-semibold text-[11px]">
                Image URL
              </label>
              <input
                type="url"
                placeholder="https://..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-white/15 p-3 rounded-sm outline-none text-[#E0E0E0] focus:border-gold transition-colors placeholder-text-dim"
              />
            </div>
          </div>

          <div>
            <label className="block text-text-muted uppercase tracking-wider mb-1.5 font-semibold text-[11px]">
              Description & Provenance
            </label>
            <textarea
              rows="3"
              placeholder="Fabric weight, natural fading, flaws, or aesthetic details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#1A1A1A] border border-white/15 p-3 rounded-sm outline-none text-[#E0E0E0] focus:border-gold transition-colors placeholder-text-dim resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full premium-btn py-3.5 mt-2"
          >
            {submitting ? 'Publishing...' : 'Publish to Live Campus Feed'}
          </button>
        </form>
      </div>
    </div>
  );
}
