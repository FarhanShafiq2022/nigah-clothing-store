import React, { useState } from 'react';
import { SectionHeading } from './SectionHeading';
import { ProductGrid } from './ProductGrid';
import { CategoryFilter, Product } from '../types';
import { useProducts } from '../hooks/useProducts';

interface BestSellersSectionProps {
  onQuickView?: (product: Product) => void;
}

const CATEGORIES: CategoryFilter[] = [
  'ALL',
  'BEST SELLERS',
  'NEW ARRIVALS',
  'WOMEN',
  'MEN'
];

export const BestSellersSection: React.FC<BestSellersSectionProps> = ({ onQuickView }) => {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('ALL');
  const { allProducts } = useProducts();

  const filteredProducts = allProducts.filter((product) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'NEW ARRIVALS') return product.isNewArrival;
    if (activeFilter === 'BEST SELLERS') return product.isBestSeller;
    if (activeFilter === 'WOMEN') return product.gender === 'women';
    if (activeFilter === 'MEN') return product.gender === 'men';
    return true;
  });

  return (
    <section id="bestsellers" className="py-24 sm:py-32 bg-[#0E0E0E] relative border-b border-[#1C1C1C]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        {/* Section Heading */}
        <SectionHeading
          label="SIGNATURE CURATION"
          title="BEST SELLERS"
          subtitle="The most coveted silhouettes, celebrated by our international patrons for flawless tailoring."
          align="center"
        />

        {/* Category Horizontal Filter Bar */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-12 sm:mb-16">
          {CATEGORIES.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 text-[10px] sm:text-[11px] tracking-[0.25em] uppercase font-medium transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-[#C9A24D] text-[#0A0A0A] shadow-md shadow-[#C9A24D]/20'
                    : 'bg-[#141414] border border-[#262626] text-[#A1A1AA] hover:text-[#F5F2EA] hover:border-[#444]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        <ProductGrid
          products={filteredProducts.slice(0, 8)}
          onQuickView={onQuickView}
          gridColumns={4}
        />
      </div>
    </section>
  );
};
