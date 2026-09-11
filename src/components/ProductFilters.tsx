import React, { useState } from 'react';
import {
  SlidersHorizontal,
  RotateCcw,
  Check,
  Star,
  Grid2X2,
  Grid3X3,
  LayoutGrid,
  ChevronDown,
  X,
  Search
} from 'lucide-react';
import {
  CategoryFilter,
  FilterState,
  GridColumns,
  ItemsPerPage,
  SortOption
} from '../types';
import { COLOR_PALETTE } from '../data/products';

interface ProductFiltersProps {
  filterState: FilterState;
  onFilterChange: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onResetFilters: () => void;
  totalProducts: number;
  filteredCount: number;
  minPossiblePrice: number;
  maxPossiblePrice: number;
}

const CATEGORIES: CategoryFilter[] = [
  'ALL',
  'NEW ARRIVALS',
  'WOMEN',
  'MEN',
  'BEST SELLERS'
];

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: 'Default sorting', value: 'default' },
  { label: 'Sort by popularity', value: 'popularity' },
  { label: 'Sort by average rating', value: 'rating' },
  { label: 'Sort by latest', value: 'latest' },
  { label: 'Sort by price: low to high', value: 'price-asc' },
  { label: 'Sort by price: high to low', value: 'price-desc' }
];

const ITEMS_PER_VIEW_OPTIONS: ItemsPerPage[] = [9, 12, 18, 24];

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filterState,
  onFilterChange,
  onResetFilters,
  totalProducts,
  filteredCount,
  minPossiblePrice,
  maxPossiblePrice
}) => {
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(true);

  if (!filterState) {
    return null;
  }

  // Count active non-default filters
  const activeFilterCount =
    (filterState.category !== 'ALL' ? 1 : 0) +
    (filterState.priceRange[0] > minPossiblePrice || filterState.priceRange[1] < maxPossiblePrice ? 1 : 0) +
    filterState.selectedColors.length +
    (!filterState.stockAvailability.inStock || !filterState.stockAvailability.outOfStock ? 1 : 0) +
    (filterState.topRatedOnly ? 1 : 0) +
    (filterState.searchQuery.trim() !== '' ? 1 : 0);

  const toggleColor = (colorName: string) => {
    const exists = filterState.selectedColors.includes(colorName);
    const updated = exists
      ? filterState.selectedColors.filter((c) => c !== colorName)
      : [...filterState.selectedColors, colorName];
    onFilterChange('selectedColors', updated);
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    onFilterChange('priceRange', [Math.min(val, filterState.priceRange[1]), filterState.priceRange[1]]);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    onFilterChange('priceRange', [filterState.priceRange[0], Math.max(val, filterState.priceRange[0])]);
  };

  return (
    <div className="w-full mb-10 text-[#F5F2EA]" id="product-filters-component">
      {/* 1. Category Tabs Bar */}
      <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-8">
        {CATEGORIES.map((category) => {
          const isActive = filterState.category === category;
          return (
            <button
              key={category}
              id={`cat-filter-${category.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => onFilterChange('category', category)}
              className={`px-4 sm:px-6 py-2.5 text-[11px] sm:text-xs tracking-[0.22em] uppercase font-medium transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'text-[#0A0A0A] bg-[#C9A24D] shadow-[0_0_12px_rgba(201,162,77,0.3)]'
                  : 'text-[#A1A1AA] hover:text-[#F5F2EA] border border-[#262626] bg-[#111111]/80 hover:border-[#444]'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* 2. Top Controls Ribbon: Filter Toggle, Search, Sorting, Items per view, Grid Mode */}
      <div className="bg-[#111111] border border-[#222] p-4 sm:p-5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Left: Filter Panel Toggle & Active Badge */}
        <div className="flex items-center flex-wrap gap-3">
          <button
            id="toggle-filter-panel-btn"
            onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
            className={`px-4 py-2 text-xs tracking-[0.2em] uppercase font-medium flex items-center space-x-2 border transition-colors cursor-pointer ${
              isFilterPanelOpen
                ? 'border-[#C9A24D] text-[#C9A24D] bg-[#C9A24D]/10'
                : 'border-[#333] text-[#CCC] hover:border-[#666]'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>{isFilterPanelOpen ? 'Hide Filters' : 'Show Filters'}</span>
            {activeFilterCount > 0 && (
              <span className="bg-[#C9A24D] text-[#0A0A0A] text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold ml-1">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Quick Keyword Search */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#777]" />
            <input
              type="text"
              id="filter-search-input"
              value={filterState.searchQuery}
              onChange={(e) => onFilterChange('searchQuery', e.target.value)}
              placeholder="Search piece, fabric, edit..."
              className="w-full pl-9 pr-8 py-2 bg-[#181818] border border-[#2A2A2A] text-xs text-[#F5F2EA] placeholder-[#666] focus:outline-none focus:border-[#C9A24D] tracking-wider transition-colors"
            />
            {filterState.searchQuery && (
              <button
                onClick={() => onFilterChange('searchQuery', '')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#777] hover:text-[#F5F2EA] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Result Count */}
          <span className="text-xs text-[#888] tracking-widest hidden sm:inline-block">
            Showing <strong className="text-[#E0C27A] font-medium">{filteredCount}</strong> of {totalProducts}
          </span>
        </div>

        {/* Right: Display Controls (Sort Dropdown, Items Per View, Grid Layout Switcher) */}
        <div className="flex items-center flex-wrap gap-4 sm:gap-6 justify-between lg:justify-end">
          {/* Sorting Dropdown */}
          <div className="relative">
            <select
              id="sort-dropdown"
              value={filterState.sortBy}
              onChange={(e) => onFilterChange('sortBy', e.target.value as SortOption)}
              className="appearance-none bg-[#181818] border border-[#2A2A2A] text-xs text-[#F5F2EA] py-2 pl-3.5 pr-8 tracking-wider focus:outline-none focus:border-[#C9A24D] cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-[#111] text-[#F5F2EA]">
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#888] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Items Per View Toggle (9, 12, 18, 24) */}
          <div className="flex items-center space-x-1.5 border border-[#2A2A2A] p-1 bg-[#181818]">
            <span className="text-[10px] tracking-wider text-[#777] px-1 hidden md:inline">SHOW:</span>
            {ITEMS_PER_VIEW_OPTIONS.map((limit) => {
              const isSelected = filterState.itemsPerPage === limit;
              return (
                <button
                  key={limit}
                  id={`items-per-view-${limit}`}
                  onClick={() => onFilterChange('itemsPerPage', limit)}
                  className={`px-2 py-1 text-[11px] font-mono transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#C9A24D] text-[#0A0A0A] font-semibold'
                      : 'text-[#888] hover:text-[#F5F2EA]'
                  }`}
                  title={`Show ${limit} items per view`}
                >
                  {limit}
                </button>
              );
            })}
          </div>

          {/* Grid Layout Switcher (2, 3, 4 columns) */}


        </div>
      </div>

      {/* 3. Detailed Filter Controls Panel (Collapsible) */}
      {isFilterPanelOpen && (
        <div className="bg-[#0E0E0E] border-x border-b border-[#222] p-5 sm:p-6 transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* A. Price Range Filter (Dual Min/Max & Dual Thumb Range) */}
            <div className="space-y-3">
              <label className="text-[11px] tracking-[0.25em] text-[#C9A24D] uppercase font-medium block">
                PRICE RANGE (PKR)
              </label>
              <div className="flex items-center space-x-2">
                <div className="flex-1">
                  <span className="text-[9px] text-[#777] uppercase block mb-1">Min (Rs.)</span>
                  <input
                    type="number"
                    id="price-min-input"
                    value={filterState.priceRange[0]}
                    onChange={handleMinPriceChange}
                    min={minPossiblePrice}
                    max={filterState.priceRange[1]}
                    step={1000}
                    className="w-full bg-[#181818] border border-[#2A2A2A] px-2.5 py-1.5 text-xs text-[#F5F2EA] focus:outline-none focus:border-[#C9A24D] font-mono"
                  />
                </div>
                <span className="text-[#666] pt-4">—</span>
                <div className="flex-1">
                  <span className="text-[9px] text-[#777] uppercase block mb-1">Max (Rs.)</span>
                  <input
                    type="number"
                    id="price-max-input"
                    value={filterState.priceRange[1]}
                    onChange={handleMaxPriceChange}
                    min={filterState.priceRange[0]}
                    max={maxPossiblePrice}
                    step={1000}
                    className="w-full bg-[#181818] border border-[#2A2A2A] px-2.5 py-1.5 text-xs text-[#F5F2EA] focus:outline-none focus:border-[#C9A24D] font-mono"
                  />
                </div>
              </div>

              {/* Range Slider Track */}
              <div className="pt-2">
                <input
                  type="range"
                  id="price-range-slider"
                  min={minPossiblePrice}
                  max={maxPossiblePrice}
                  step={1000}
                  value={filterState.priceRange[1]}
                  onChange={(e) =>
                    onFilterChange('priceRange', [filterState.priceRange[0], Number(e.target.value)])
                  }
                  className="w-full accent-[#C9A24D] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#666] font-mono mt-1">
                  <span>Rs. {minPossiblePrice.toLocaleString()}</span>
                  <span>Rs. {maxPossiblePrice.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* B. Color Palette Swatches (Multi-Select) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-[11px] tracking-[0.25em] text-[#C9A24D] uppercase font-medium block">
                  COLOR PALETTE
                </label>
                {filterState.selectedColors.length > 0 && (
                  <button
                    onClick={() => onFilterChange('selectedColors', [])}
                    className="text-[9px] text-[#888] hover:text-[#C9A24D] uppercase tracking-wider cursor-pointer"
                  >
                    Clear ({filterState.selectedColors.length})
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {COLOR_PALETTE.map((color) => {
                  const isSelected = filterState.selectedColors.includes(color.name);
                  return (
                    <button
                      key={color.name}
                      id={`color-swatch-${color.name.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => toggleColor(color.name)}
                      title={color.name}
                      className={`relative w-7 h-7 rounded-full transition-transform duration-200 cursor-pointer flex items-center justify-center ${
                        isSelected
                          ? 'ring-2 ring-[#C9A24D] ring-offset-2 ring-offset-[#0E0E0E] scale-110'
                          : 'hover:scale-105 border border-white/20'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {isSelected && (
                        <Check
                          className={`w-3.5 h-3.5 ${
                            color.hex === '#F5F2EA' || color.hex === '#C99B8E'
                              ? 'text-[#0A0A0A]'
                              : 'text-white'
                          }`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
              <p className="text-[10px] text-[#777] font-light">
                {filterState.selectedColors.length > 0
                  ? filterState.selectedColors.join(', ')
                  : 'All atelier shades'}
              </p>
            </div>

            {/* C. Stock Availability (In Stock vs Out of Stock) */}
            <div className="space-y-3">
              <label className="text-[11px] tracking-[0.25em] text-[#C9A24D] uppercase font-medium block">
                STOCK AVAILABILITY
              </label>
              <div className="space-y-2 pt-1">
                <label className="flex items-center space-x-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    id="stock-in-stock-checkbox"
                    checked={filterState.stockAvailability.inStock}
                    onChange={(e) =>
                      onFilterChange('stockAvailability', {
                        ...filterState.stockAvailability,
                        inStock: e.target.checked
                      })
                    }
                    className="accent-[#C9A24D] w-4 h-4 cursor-pointer"
                  />
                  <span className="text-xs text-[#CCC] group-hover:text-[#F5F2EA] transition-colors">
                    In Stock (Ready to Dispatch)
                  </span>
                </label>

                <label className="flex items-center space-x-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    id="stock-out-of-stock-checkbox"
                    checked={filterState.stockAvailability.outOfStock}
                    onChange={(e) =>
                      onFilterChange('stockAvailability', {
                        ...filterState.stockAvailability,
                        outOfStock: e.target.checked
                      })
                    }
                    className="accent-[#C9A24D] w-4 h-4 cursor-pointer"
                  />
                  <span className="text-xs text-[#CCC] group-hover:text-[#F5F2EA] transition-colors">
                    Made to Order / Sold Out
                  </span>
                </label>
              </div>
            </div>

            {/* D. Ratings Filter & Clear All Action */}
            <div className="space-y-3 flex flex-col justify-between">
              <div>
                <label className="text-[11px] tracking-[0.25em] text-[#C9A24D] uppercase font-medium block mb-2">
                  RATINGS FILTER
                </label>
                <label className="flex items-center space-x-2.5 cursor-pointer group p-2.5 bg-[#161616] border border-[#262626] hover:border-[#C9A24D]/40 transition-colors">
                  <input
                    type="checkbox"
                    id="rating-top-rated-checkbox"
                    checked={filterState.topRatedOnly}
                    onChange={(e) => onFilterChange('topRatedOnly', e.target.checked)}
                    className="accent-[#C9A24D] w-4 h-4 cursor-pointer"
                  />
                  <div className="flex items-center space-x-1.5">
                    <Star className="w-3.5 h-3.5 text-[#C9A24D] fill-current" />
                    <span className="text-xs text-[#F5F2EA]">Top Rated (4.5+ ★)</span>
                  </div>
                </label>
              </div>

              {/* Reset All Filters Button */}
              {activeFilterCount > 0 && (
                <button
                  id="reset-all-filters-btn"
                  onClick={onResetFilters}
                  className="w-full py-2 px-3 border border-[#C9A24D]/40 text-[#C9A24D] hover:bg-[#C9A24D] hover:text-[#0A0A0A] transition-all text-xs tracking-[0.2em] uppercase font-medium flex items-center justify-center space-x-2 cursor-pointer mt-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Filters ({activeFilterCount})</span>
                </button>
              )}
            </div>
          </div>

          {/* Active Filter Chips Bar */}
          {activeFilterCount > 0 && (
            <div className="mt-5 pt-4 border-t border-[#222] flex items-center flex-wrap gap-2">
              <span className="text-[10px] tracking-wider text-[#777] uppercase mr-1">Active Criteria:</span>
              {filterState.category !== 'ALL' && (
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-[#1A1A1A] border border-[#333] text-[10px] text-[#E0C27A]">
                  <span>Category: {filterState.category}</span>
                  <button onClick={() => onFilterChange('category', 'ALL')} className="hover:text-white cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {(filterState.priceRange[0] > minPossiblePrice || filterState.priceRange[1] < maxPossiblePrice) && (
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-[#1A1A1A] border border-[#333] text-[10px] text-[#E0C27A]">
                  <span>Price: Rs. {filterState.priceRange[0].toLocaleString()} - Rs. {filterState.priceRange[1].toLocaleString()}</span>
                  <button onClick={() => onFilterChange('priceRange', [minPossiblePrice, maxPossiblePrice])} className="hover:text-white cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filterState.selectedColors.map((color) => (
                <span key={color} className="inline-flex items-center space-x-1 px-2.5 py-1 bg-[#1A1A1A] border border-[#333] text-[10px] text-[#E0C27A]">
                  <span>Color: {color}</span>
                  <button onClick={() => toggleColor(color)} className="hover:text-white cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {filterState.topRatedOnly && (
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-[#1A1A1A] border border-[#333] text-[10px] text-[#E0C27A]">
                  <span>Rating: 4.5+ ★</span>
                  <button onClick={() => onFilterChange('topRatedOnly', false)} className="hover:text-white cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {(!filterState.stockAvailability.inStock || !filterState.stockAvailability.outOfStock) && (
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-[#1A1A1A] border border-[#333] text-[10px] text-[#E0C27A]">
                  <span>Stock: {filterState.stockAvailability.inStock ? 'In Stock Only' : 'Made to Order Only'}</span>
                  <button
                    onClick={() => onFilterChange('stockAvailability', { inStock: true, outOfStock: true })}
                    className="hover:text-white cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filterState.searchQuery && (
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-[#1A1A1A] border border-[#333] text-[10px] text-[#E0C27A]">
                  <span>Search: "{filterState.searchQuery}"</span>
                  <button onClick={() => onFilterChange('searchQuery', '')} className="hover:text-white cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
