import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product, GridColumns } from '../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onQuickView?: (product: Product) => void;
  gridColumns?: GridColumns;
  onResetFilters?: () => void;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onQuickView,
  gridColumns = 4,
  onResetFilters,
  currentPage = 1,
  totalPages = 1,
  onPageChange
}) => {
  // Empty State fallback when no items match criteria
  if (products.length === 0) {
    return (
      <div
        id="product-grid-empty-state"
        className="py-24 px-6 text-center bg-[#0E0E0E] border border-[#222] my-8 max-w-2xl mx-auto"
      >
        <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-[#181818] border border-[#C9A24D]/30 flex items-center justify-center text-[#C9A24D]">
          <Sparkles className="w-6 h-6 stroke-[1.5]" />
        </div>
        <h3 className="font-serif text-2xl text-[#F5F2EA] tracking-wide mb-2">
          No Silhouettes Match Your Criteria
        </h3>
        <p className="text-xs sm:text-sm text-[#888] font-light max-w-md mx-auto mb-6 leading-relaxed">
          We could not find any atelier pieces matching your current combination of price, color, or stock filters.
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            id="empty-state-reset-btn"
            className="inline-flex items-center space-x-2 py-3 px-6 bg-[#C9A24D] text-[#0A0A0A] font-medium text-xs tracking-[0.25em] uppercase hover:bg-[#E0C27A] transition-all cursor-pointer shadow-lg"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>
    );
  }

  // Column class determination
  const getGridClasses = () => {
    switch (gridColumns) {
      case 2:
        return 'grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-10';
      case 3:
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8';
      case 4:
      default:
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8';
    }
  };

  return (
    <div className="w-full" id="product-grid-wrapper">
      {/* Animated Motion Grid with Layout Preservation */}
      <motion.div
        layout
        className={getGridClasses()}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
      >
        <AnimatePresence mode="popLayout">
          {products.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <ProductCard
                product={product}
                onQuickView={onQuickView}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Pagination Controls */}
      {totalPages > 1 && onPageChange && (
        <div className="mt-14 pt-8 border-t border-[#1C1C1C] flex items-center justify-between flex-wrap gap-4">
          <div className="text-xs text-[#777] font-mono">
            PAGE {currentPage} OF {totalPages}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3.5 py-2 border border-[#2A2A2A] text-xs text-[#CCC] hover:text-[#F5F2EA] hover:border-[#C9A24D] disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center space-x-1 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>PREVIOUS</span>
            </button>

            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNum = idx + 1;
              const isActive = pageNum === currentPage;
              return (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={`w-9 h-9 text-xs font-mono transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#C9A24D] text-[#0A0A0A] font-bold'
                      : 'border border-[#2A2A2A] text-[#888] hover:text-[#F5F2EA] hover:border-[#555]'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3.5 py-2 border border-[#2A2A2A] text-xs text-[#CCC] hover:text-[#F5F2EA] hover:border-[#C9A24D] disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center space-x-1 cursor-pointer"
            >
              <span>NEXT</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
