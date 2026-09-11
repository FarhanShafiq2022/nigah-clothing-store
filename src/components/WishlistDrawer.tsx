import React, { useEffect, useRef } from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import gsap from 'gsap';
import { useAtelier } from '../context/AtelierContext';

export const WishlistDrawer: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart, wishlistCount, isWishlistOpen, setIsWishlistOpen } = useAtelier();
  const overlayRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!drawerRef.current || !overlayRef.current) return;

    if (isWishlistOpen) {
      document.body.style.overflow = 'hidden';
      gsap.to(overlayRef.current, {
        opacity: 1,
        visibility: 'visible',
        duration: 0.35,
        ease: 'power2.out'
      });
      gsap.fromTo(
        drawerRef.current,
        { x: '100%' },
        { x: '0%', duration: 0.5, ease: 'power3.out' }
      );
    } else {
      document.body.style.overflow = '';
      gsap.to(drawerRef.current, {
        x: '100%',
        duration: 0.4,
        ease: 'power3.in'
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          if (overlayRef.current) overlayRef.current.style.visibility = 'hidden';
        }
      });
    }
  }, [isWishlistOpen]);

  return (
    <div
      ref={overlayRef}
      onClick={() => setIsWishlistOpen(false)}
      className="fixed inset-0 z-1000 bg-black/80 backdrop-blur-sm opacity-0 invisible transition-[visibility] duration-300"
    >
      <div
        ref={drawerRef}
        onClick={(e) => e.stopPropagation()}
        className="absolute top-0 right-0 w-full max-w-md h-full bg-[#0D0D0D] border-l border-[#C9A24D]/30 flex flex-col justify-between shadow-2xl"
      >
        {/* Header */}
        <div className="p-6 border-b border-[#222] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-[#C9A24D] fill-current" />
            <h3 className="font-serif text-xl text-[#F5F2EA] tracking-wide">
              SAVED PIECES ({wishlistCount})
            </h3>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-1 text-[#888] hover:text-[#C9A24D] transition-colors cursor-pointer"
            aria-label="Close Wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {wishlist.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <Heart className="w-12 h-12 text-[#333] stroke-1 mb-4" />
              <p className="font-serif text-2xl text-[#888]">No saved silhouettes.</p>
              <p className="text-xs text-[#555] tracking-widest uppercase mt-2">
                Click the heart on any atelier piece to save it for your private consult.
              </p>
            </div>
          ) : (
            wishlist.filter(product => product && product.id).map((product) => (
              <div
                key={product.id}
                className="flex space-x-4 p-4 bg-[#111111] border border-[#222]"
              >
                <div className="w-20 aspect-3/4 overflow-hidden bg-[#161616] shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <h4 className="font-serif text-sm text-[#F5F2EA] tracking-wide font-normal line-clamp-1">
                        {product?.name || 'Garment Piece'}
                      </h4>
                      <button
                        onClick={() => toggleWishlist(product)}
                        className="text-[#666] hover:text-[#C9A24D] transition-colors ml-2 cursor-pointer"
                        aria-label="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-[10px] tracking-widest text-[#888] uppercase mt-1">
                      {product?.category || 'ATELIER'}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs font-medium text-[#E0C27A]">
                      Rs. {product?.price?.toLocaleString() || 0}
                    </span>
                    <button
                      onClick={() => {
                        if (product) {
                          addToCart(product, product.sizes?.[0] || 'M', 1);
                          toggleWishlist(product);
                        }
                      }}
                      className="px-3 py-1.5 bg-[#C9A24D] text-[#0A0A0A] text-[10px] tracking-wider uppercase font-medium hover:bg-[#E0C27A] flex items-center space-x-1 cursor-pointer"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>MOVE TO BAG</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
