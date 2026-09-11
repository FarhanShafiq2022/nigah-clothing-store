import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useAtelier } from '../context/AtelierContext';
import { Product } from '../types';
import { useProducts } from '../hooks/useProducts';

export const SearchModal: React.FC = () => {
  const { searchOpen, setSearchOpen, setQuickViewProduct } = useAtelier();
  const { allProducts } = useProducts();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.collection.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q)
    );
  }, [allProducts, query]);

  if (!searchOpen) return null;

  const handleSelect = (product: Product) => {
    setSearchOpen(false);
    setQuickViewProduct(product);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center p-6 sm:p-12 overflow-y-auto"
      onClick={() => setSearchOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl flex flex-col items-center mt-8 sm:mt-12"
      >
        {/* Close Button */}
        <div className="w-full flex justify-end mb-6">
          <button
            onClick={() => setSearchOpen(false)}
            className="p-2 text-[#888] hover:text-[#C9A24D] transition-colors cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search Input */}
        <div className="w-full relative border-b-2 border-[#C9A24D] pb-3 flex items-center">
          <Search className="w-6 h-6 text-[#C9A24D] mr-4 shrink-0" />
          <input
            type="text"
            id="modal-search-input"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search silhouettes, raw silk, velvet, bandhgala..."
            className="w-full bg-transparent text-xl sm:text-2xl font-serif text-[#F5F2EA] placeholder-[#555] focus:outline-none tracking-wide"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-[#888] hover:text-[#C9A24D] uppercase tracking-wider ml-2 cursor-pointer"
            >
              CLEAR
            </button>
          )}
        </div>

        {/* Popular searches pills */}
        <div className="w-full mt-6 flex items-center flex-wrap gap-2">
          <span className="text-[10px] tracking-[0.25em] text-[#888] uppercase mr-2">
            FREQUENT QUERIES:
          </span>
          {['RAW SILK', 'VELVET', 'BANDHGALA', 'CO-ORDS', 'BLACK LABEL', 'MENSWEAR'].map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="px-3 py-1 text-[10px] tracking-wider uppercase border border-[#222] text-[#A1A1AA] hover:border-[#C9A24D] hover:text-[#C9A24D] transition-colors bg-[#111] cursor-pointer"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Search Results */}
        <div className="w-full mt-10">
          {query.trim() && filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="font-serif text-xl text-[#777]">
                No silhouettes found matching “{query}”
              </p>
              <p className="text-xs text-[#555] tracking-widest mt-2 uppercase">
                Explore our full Silk or Nocturne collections.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className="flex items-center space-x-4 p-3 bg-[#111111] border border-[#222] hover:border-[#C9A24D]/60 cursor-pointer transition-all group"
                >
                  <div className="w-16 aspect-3/4 overflow-hidden bg-[#161616] shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="text-[9px] tracking-widest text-[#C9A24D] uppercase block">
                      {item.category}
                    </span>
                    <h4 className="font-serif text-sm text-[#F5F2EA] group-hover:text-[#E0C27A] transition-colors">
                      {item.name}
                    </h4>
                    <span className="text-xs text-[#A1A1AA] font-mono mt-1 block">
                      Rs. {item.price.toLocaleString()}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#C9A24D] opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
