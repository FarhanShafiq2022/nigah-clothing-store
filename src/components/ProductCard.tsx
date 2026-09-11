import React, { useState } from "react";
import { Heart, Eye, ShoppingBag, Check, Star } from "lucide-react";
import { Product } from "../types";
import { useAtelier } from "../context/AtelierContext";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
}) => {
  const { addToCart, toggleWishlist, isInWishlist } = useAtelier();
  const isWishlisted = isInWishlist(product.id);
  const [isAdded, setIsAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "M");

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedSize, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onQuickView) onQuickView(product);
  };

  const formatPrice = (amount: number) => {
    return `Rs. ${amount.toLocaleString()}`;
  };

  return (
    <div
      className="group relative flex flex-col bg-[#0E0E0E] border border-[#1E1E1E] hover:border-[#C9A24D]/50 transition-all duration-500 h-full"
      id={`product-${product.id}`}
    >
      {/* Product Image Container */}
      <div
        onClick={() => onQuickView && onQuickView(product)}
        className="relative aspect-3/4 w-full overflow-hidden bg-[#161616] cursor-pointer"
      >
        {/* Primary Image */}
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-0"
          loading="lazy"
        />
        {/* Secondary Hover Image */}
        <img
          src={product.hoverImage || product.image}
          alt={`${product.name} alternate angle`}
          className="absolute inset-0 w-full h-full object-cover object-top opacity-0 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
          loading="lazy"
        />

        {/* Badge / Out of stock indicator */}
        <div className="absolute top-3 left-3 z-10 flex flex-col space-y-1.5">
          {product.badge && (
            <span className="bg-[#0A0A0A]/90 border border-[#C9A24D]/40 text-[#C9A24D] text-[9px] tracking-[0.25em] uppercase font-medium px-2 py-1 backdrop-blur-sm">
              {product.badge}
            </span>
          )}
          {!product.inStock && (
            <span className="bg-[#1A1A1A]/95 border border-[#555] text-[#AAA] text-[8px] tracking-[0.2em] uppercase font-medium px-2 py-0.5 backdrop-blur-sm">
              MADE TO ORDER
            </span>
          )}
        </div>

        {/* Wishlist and Quick View Floating Buttons */}
        <div className="absolute top-3 right-3 z-10 flex flex-col space-y-2 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 transform sm:translate-x-2 sm:group-hover:translate-x-0">
          <button
            onClick={handleWishlist}
            aria-label={
              isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"
            }
            className={`w-8 h-8 flex items-center justify-center backdrop-blur-md border transition-all cursor-pointer ${
              isWishlisted
                ? "bg-[#C9A24D] text-[#0A0A0A] border-[#C9A24D]"
                : "bg-[#0A0A0A]/80 text-[#F5F2EA] border-[#333] hover:border-[#C9A24D] hover:text-[#C9A24D]"
            }`}
          >
            <Heart
              className={`w-3.5 h-3.5 ${isWishlisted ? "fill-current" : ""}`}
            />
          </button>
          <button
            onClick={handleQuickView}
            aria-label="Quick View Atelier Piece"
            className="w-8 h-8 flex items-center justify-center bg-[#0A0A0A]/80 text-[#F5F2EA] border border-[#333] hover:border-[#C9A24D] hover:text-[#C9A24D] backdrop-blur-md transition-all cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Add to Bag Button (Sliding in from bottom on hover) */}
        <div className="absolute bottom-0 left-0 right-0 p-3 z-10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <button
            onClick={handleAddToCart}
            className={`w-full py-2.5 px-4 text-[10px] tracking-[0.22em] uppercase font-medium flex items-center justify-center space-x-2 transition-all duration-300 cursor-pointer ${
              isAdded
                ? "bg-[#2E7D32] text-white"
                : "bg-[#C9A24D] text-[#0A0A0A] hover:bg-[#E0C27A] shadow-lg"
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>ADDED TO BAG</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>QUICK ADD ({selectedSize})</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[9px] tracking-[0.25em] text-[#8E8E8E] uppercase mb-1.5 font-light">
            <span>{product?.category || "ATELIER"}</span>
            {product?.rating && (
              <div className="flex items-center space-x-1 text-[#E0C27A]">
                <Star className="w-2.5 h-2.5 fill-current" />
                <span className="font-mono text-[10px]">
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-[#666]">({product.reviewCount})</span>
              </div>
            )}
          </div>

          {/* Product Name */}
          <h3
            onClick={() => onQuickView && onQuickView(product)}
            className="font-serif text-sm sm:text-base text-[#F5F2EA] group-hover:text-[#E0C27A] transition-colors cursor-pointer tracking-wider font-normal line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Color Swatch Dots */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center space-x-1.5 mt-2">
              {product.colors.map((c) => (
                <span
                  key={c.name}
                  title={c.name}
                  className="w-2.5 h-2.5 rounded-full border border-white/20 inline-block"
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Price & Quick Size Selector */}
        <div className="mt-3 pt-3 border-t border-[#1C1C1C] flex items-center justify-between">
          <div className="flex items-baseline space-x-2">
            <span className="text-xs sm:text-sm font-medium tracking-wide text-[#E0C27A]">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-[11px] text-[#666] line-through font-light">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Available Sizes Pills */}
          <div className="flex items-center space-x-1">
            {product.sizes.slice(0, 3).map((size) => (
              <button
                key={size}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize(size);
                }}
                className={`text-[8px] px-1.5 py-0.5 border font-mono transition-colors cursor-pointer ${
                  selectedSize === size
                    ? "border-[#C9A24D] text-[#C9A24D] bg-[#C9A24D]/10"
                    : "border-[#262626] text-[#777] hover:border-[#444] hover:text-[#999]"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
