import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function UploadModal() {
  const { isUploadModalOpen, setIsUploadModalOpen, addProduct } = useProducts();
  const { user, token } = useAuth();
  const { showToast } = useCart();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('Jeans');
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
          imageUrl: imageUrl || 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80',
          condition: '9.8/10 Inspected',
          curator: user?.name || 'Campus Student',
          campus: 'Campus Network'
        },
        token
      );
      showToast(`Archival piece "${name}" listed in live vault!`, 'success');
      setName('');
      setPrice('');
      setDescription('');
      setImageUrl('');
      setIsUploadModalOpen(false);
    } catch {
      showToast('Failed to list garment.', 'error');
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
        className="relative bg-[#161616] border border-[#D49A7A]/35 w-full max-w-lg shadow-2xl p-6 md:p-8 rounded-3xl text-[#DCDCDC] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsUploadModalOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 bg-[#1F1F1F] border border-[#D49A7A]/30 text-[#DCDCDC] hover:text-[#D49A7A] hover:border-[#D49A7A] rounded-full flex items-center justify-center text-xs transition-colors cursor-pointer"
        >
          ✕
        </button>

        <div className="mb-6">
          <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-[#D49A7A] block mb-1">
            Collegiate Curation
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#FAF7F2] uppercase">
            List Archival Garment
          </h3>
          <p className="text-xs font-sans text-[#A8A8A8] mt-1">
            Zero commission. Keep 100% of proceeds. Hand off on your campus quad.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] uppercase font-sans font-bold tracking-wider text-[#D49A7A] block mb-1">
              Garment Title & Brand:
            </label>
            <input
              type="text"
              placeholder="e.g. 1999 Japanese Indigo Selvedge Denim"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#121212] border border-[#D49A7A]/30 text-xs text-[#DCDCDC] p-3 rounded-full outline-none focus:border-[#D49A7A]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] uppercase font-sans font-bold tracking-wider text-[#D49A7A] block mb-1">
                Category:
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#121212] border border-[#D49A7A]/30 text-xs text-[#DCDCDC] p-3 rounded-full outline-none focus:border-[#D49A7A]"
              >
                <option value="Jeans">Jeans (Selvedge)</option>
                <option value="Jackets">Jackets & Coats</option>
                <option value="Shirts">Shirts & Knits</option>
                <option value="Archival">Rare Archival Piece</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] uppercase font-sans font-bold tracking-wider text-[#D49A7A] block mb-1">
                Size & Cut:
              </label>
              <input
                type="text"
                placeholder="e.g. Size 32 / Boxy M"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full bg-[#121212] border border-[#D49A7A]/30 text-xs text-[#DCDCDC] p-3 rounded-full outline-none focus:border-[#D49A7A]"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase font-sans font-bold tracking-wider text-[#D49A7A] block mb-1">
              Price (INR ₹):
            </label>
            <input
              type="number"
              placeholder="e.g. 1499"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-[#121212] border border-[#D49A7A]/30 text-xs text-[#DCDCDC] p-3 rounded-full outline-none focus:border-[#D49A7A]"
              required
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-sans font-bold tracking-wider text-[#D49A7A] block mb-1">
              High-Res Image URL:
            </label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full bg-[#121212] border border-[#D49A7A]/30 text-xs text-[#DCDCDC] p-3 rounded-full outline-none focus:border-[#D49A7A]"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-sans font-bold tracking-wider text-[#D49A7A] block mb-1">
              Provenance & Condition Details:
            </label>
            <textarea
              rows={3}
              placeholder="Fabric weight, shuttle loom details, distressing, hardware patina..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#121212] border border-[#D49A7A]/30 text-xs text-[#DCDCDC] p-3 rounded-2xl outline-none focus:border-[#D49A7A]"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full btn-rosegold-pill py-3.5 mt-2 shadow-xl disabled:opacity-50"
          >
            {submitting ? 'Generating Physical Swing-Tag...' : 'Publish to Vault Feed'}
          </button>
        </form>
      </div>
    </div>
  );
}
