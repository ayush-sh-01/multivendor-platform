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
          imageUrl: imageUrl || 'https://image.hm.com/assets/hm/5a/dd/5add7d43120cb847f2161bb4062acfcd9fbd4094.jpg?imwidth=1200',
          condition: '9.5/10 Inspected',
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn"
      onClick={() => setIsUploadModalOpen(false)}
    >
      <div
        className="relative bg-[#203227] border border-[#F4EFE6]/20 w-full max-w-lg shadow-2xl p-6 md:p-8 rounded-xl text-[#F4EFE6]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsUploadModalOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 bg-[#2C4234] border border-[#F4EFE6]/20 text-[#F4EFE6] hover:text-[#BA9F7A] hover:border-[#BA9F7A] rounded-full flex items-center justify-center text-xs transition-colors"
        >
          ✕
        </button>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-5 h-[1px] bg-[#BA9F7A]"></span>
            <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#BA9F7A]">
              Drop Portal
            </span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#F4EFE6]">Upload a Curated Piece</h3>
          <p className="text-xs text-[#F4EFE6]/70 font-sans mt-1">
            List clothing from your closet. Verified student accounts receive zero-commission payouts.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
          <div>
            <label className="block text-[#F4EFE6]/80 uppercase tracking-wider mb-1.5 font-semibold text-[11px]">
              Piece Title *
            </label>
            <input
              type="text"
              placeholder="e.g. 90s Vintage Washed Denim Jacket"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#2C4234] border border-[#F4EFE6]/20 p-3 rounded-lg outline-none text-[#F4EFE6] focus:border-[#BA9F7A] transition-colors placeholder-[#F4EFE6]/40"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#F4EFE6]/80 uppercase tracking-wider mb-1.5 font-semibold text-[11px]">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#2C4234] border border-[#F4EFE6]/20 p-3 rounded-lg outline-none text-[#F4EFE6] focus:border-[#BA9F7A] transition-colors"
              >
                <option value="Denim">Jeans & Denim</option>
                <option value="Jackets">Jackets & Outerwear</option>
                <option value="Shirts">Shirts & Tops</option>
                <option value="Archival">Archival Finds</option>
              </select>
            </div>

            <div>
              <label className="block text-[#F4EFE6]/80 uppercase tracking-wider mb-1.5 font-semibold text-[11px]">
                Size
              </label>
              <input
                type="text"
                placeholder="e.g. Size M or 32"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full bg-[#2C4234] border border-[#F4EFE6]/20 p-3 rounded-lg outline-none text-[#F4EFE6] focus:border-[#BA9F7A] transition-colors placeholder-[#F4EFE6]/40"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#F4EFE6]/80 uppercase tracking-wider mb-1.5 font-semibold text-[11px]">
                Price ($ USD) *
              </label>
              <input
                type="number"
                placeholder="e.g. 85"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-[#2C4234] border border-[#F4EFE6]/20 p-3 rounded-lg outline-none text-[#F4EFE6] focus:border-[#BA9F7A] transition-colors placeholder-[#F4EFE6]/40"
                required
              />
            </div>

            <div>
              <label className="block text-[#F4EFE6]/80 uppercase tracking-wider mb-1.5 font-semibold text-[11px]">
                Image URL
              </label>
              <input
                type="url"
                placeholder="https://..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full bg-[#2C4234] border border-[#F4EFE6]/20 p-3 rounded-lg outline-none text-[#F4EFE6] focus:border-[#BA9F7A] transition-colors placeholder-[#F4EFE6]/40"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#F4EFE6]/80 uppercase tracking-wider mb-1.5 font-semibold text-[11px]">
              Description & Provenance
            </label>
            <textarea
              rows="3"
              placeholder="Fabric weight, natural fading, condition, aesthetic archetype..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#2C4234] border border-[#F4EFE6]/20 p-3 rounded-lg outline-none text-[#F4EFE6] focus:border-[#BA9F7A] transition-colors placeholder-[#F4EFE6]/40 resize-none"
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
