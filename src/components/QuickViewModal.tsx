import React, { useState } from 'react';
import { X, Heart, ShoppingBag, ShieldCheck, Sparkles } from 'lucide-react';
import { useAtelier } from '../context/AtelierContext';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isInWishlist } = useAtelier();
  const [selectedSize, setSelectedSize] = useState('M');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!quickViewProduct) return null;

  const isWishlisted = isInWishlist(quickViewProduct.id);
  const images = [quickViewProduct.image, quickViewProduct.hoverImage || quickViewProduct.image];

  const handleAdd = () => {
    addToCart(quickViewProduct, selectedSize, 1);
    setQuickViewProduct(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={() => setQuickViewProduct(null)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#0D0D0D] border border-[#C9A24D]/40 p-6 sm:p-10 shadow-2xl overflow-hidden my-auto"
      >
        {/* Close button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 p-2 text-[#888] hover:text-[#C9A24D] transition-colors z-20 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Product Images with thumbnails */}
          <div className="space-y-4">
            <div className="relative aspect-3/4 w-full overflow-hidden bg-[#161616] border border-[#222]">
              <img
                src={images[activeImageIndex]}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover object-top transition-all duration-500"
              />
              {quickViewProduct.badge && (
                <div className="absolute top-4 left-4 bg-[#0A0A0A]/90 border border-[#C9A24D]/40 text-[#C9A24D] text-[9px] tracking-[0.25em] uppercase font-medium px-2.5 py-1">
                  {quickViewProduct.badge}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex space-x-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 aspect-3/4 overflow-hidden border transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-[#C9A24D] opacity-100'
                      : 'border-[#262626] opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Narrative & Actions */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center space-x-2 text-[10px] tracking-[0.3em] uppercase text-[#C9A24D] font-medium mb-1.5">
                <span>{quickViewProduct.category}</span>
                <span>•</span>
                <span>{quickViewProduct.collection}</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl text-[#F5F2EA] font-normal tracking-wide">
                {quickViewProduct.name}
              </h2>

              <div className="mt-3 flex items-baseline space-x-3">
                <span className="text-xl sm:text-2xl font-serif text-[#E0C27A]">
                  Rs. {quickViewProduct.price.toLocaleString()}
                </span>
                {quickViewProduct.originalPrice && (
                  <span className="text-xs text-[#666] line-through font-light">
                    Rs. {quickViewProduct.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              <div className="w-12 h-px bg-[#C9A24D] my-5" />

              <p className="text-xs sm:text-sm text-[#A1A1AA] font-light leading-relaxed tracking-wider">
                {quickViewProduct.description}
              </p>

              {/* Fabric Details */}
              <div className="mt-5 p-4 bg-[#121212] border border-[#222] space-y-2">
                <div className="text-[10px] tracking-[0.25em] text-[#C9A24D] uppercase font-medium flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>MATERIAL & CRAFTSMANSHIP</span>
                </div>
                <p className="text-xs text-[#E5E5E5] font-light">
                  {quickViewProduct.fabric}
                </p>
                <ul className="text-[11px] text-[#888] space-y-1 pt-1 list-disc list-inside">
                  {quickViewProduct.details.map((det, i) => (
                    <li key={i}>{det}</li>
                  ))}
                </ul>
              </div>

              {/* Size Selector */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs tracking-wider mb-3">
                  <span className="text-[#F5F2EA] uppercase font-medium">SELECT SIZE</span>
                  <span className="text-[#C9A24D] text-[11px] hover:underline cursor-pointer">
                    Bespoke Size Guide
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`min-w-12 py-2.5 px-3 text-xs font-mono border transition-all cursor-pointer ${
                        selectedSize === sz
                          ? 'bg-[#C9A24D] text-[#0A0A0A] border-[#C9A24D] font-semibold'
                          : 'bg-[#141414] text-[#A1A1AA] border-[#2A2A2A] hover:border-[#444] hover:text-[#F5F2EA]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[#222] space-y-3">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleAdd}
                  className="flex-1 py-4 bg-[#C9A24D] hover:bg-[#E0C27A] text-[#0A0A0A] text-xs tracking-[0.25em] font-medium uppercase flex items-center justify-center space-x-2 transition-all shadow-lg active:scale-98 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ACQUIRE PIECE ({selectedSize})</span>
                </button>
                <button
                  onClick={() => toggleWishlist(quickViewProduct)}
                  aria-label="Wishlist toggle"
                  className={`p-4 border transition-colors cursor-pointer ${
                    isWishlisted
                      ? 'bg-[#C9A24D] text-[#0A0A0A] border-[#C9A24D]'
                      : 'bg-[#141414] text-[#F5F2EA] border-[#333] hover:border-[#C9A24D] hover:text-[#C9A24D]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="flex items-center justify-center space-x-2 text-[10px] tracking-widest text-[#777] uppercase pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C9A24D]" />
                <span>INCLUDES ARCHIVAL LUXURY GIFT PACKAGING & AUTHENTICITY SEAL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
