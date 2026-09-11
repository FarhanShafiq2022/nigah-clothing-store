import React, { useState, useMemo, useEffect } from 'react';
import {
  Sparkles,
  SlidersHorizontal,
  Grid2X2,
  Grid3X3,
  LayoutGrid,
  X,
  RotateCcw,
  ArrowUpDown
} from 'lucide-react';
import { Product, FilterState, CategoryFilter, SortOption, GridColumns, ItemsPerPage } from '../types';
import { ShopSidebar } from '../components/ShopSidebar';
import { ProductGrid } from '../components/ProductGrid';
import { useAtelier } from '../context/AtelierContext';
import { useNavigation } from '../context/NavigationContext';
import { useProducts } from '../hooks/useProducts';

const ITEMS_PER_VIEW_OPTIONS: ItemsPerPage[] = [9, 12, 18, 24];
export const Shop: React.FC = () => {
  const { setQuickViewProduct } = useAtelier();
  const { navigate, categoryFilter, setCategoryFilter } = useNavigation();
  const { allProducts } = useProducts();
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Find min and max price across all products
  const minPossiblePrice = useMemo(
    () => Math.floor(Math.min(...allProducts.map((p) => p.price)) / 1000) * 1000,
    [allProducts]
  );
  const maxPossiblePrice = useMemo(
    () => Math.ceil(Math.max(...allProducts.map((p) => p.price)) / 1000) * 1000,
    [allProducts]
  );

  // Centralized Filter State
  const [filterState, setFilterState] = useState<FilterState>({
    category: (categoryFilter as CategoryFilter) || 'ALL',
    priceRange: [minPossiblePrice, maxPossiblePrice],
    selectedColors: [],
    stockAvailability: {
      inStock: true,
      outOfStock: true
    },
    topRatedOnly: false,
    searchQuery: '',
    sortBy: 'default',
    itemsPerPage: 24,
    gridColumns: 3,
    currentPage: 1
  });

  // Sync category filter from external navigation (e.g., footer or navbar)

  
    useEffect(() => {
    const category = new URLSearchParams(window.location.search).get('category');

    if (category === 'MEN' || category === 'WOMEN') {
      setFilterState((prev) => ({
        ...prev,
        category: category as CategoryFilter,
        currentPage: 1,
      }));
    }
  }, []);

  useEffect(() => {
    setFilterState((prev) => ({
      ...prev,
      priceRange: [minPossiblePrice, maxPossiblePrice],
      currentPage: 1
    }));
  }, [minPossiblePrice, maxPossiblePrice]);



  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileDrawerOpen]);

  const handleFilterChange = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilterState((prev) => ({
      ...prev,
      [key]: value,
      currentPage: key === 'currentPage' ? (value as number) : key === 'gridColumns' ? prev.currentPage : 1
    }));
  };

  const handleResetFilters = () => {
    setFilterState((prev) => ({
      ...prev,
      category: 'ALL',
      priceRange: [minPossiblePrice, maxPossiblePrice],
      selectedColors: [],
      stockAvailability: {
        inStock: true,
        outOfStock: true
      },
      topRatedOnly: false,
      searchQuery: '',
      sortBy: 'default',
      currentPage: 1
    }));
  };

  // Filter & Sort Logic
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...allProducts];

    // 1. Category Filter
    if (filterState.category !== 'ALL') {
      switch (filterState.category) {
        case 'NEW ARRIVALS':
          result = result.filter((p) => p.isNewArrival);
          break;
        case 'WOMEN':
          result = result.filter((p) => p.gender === 'women');
          break;
        case 'MEN':
          result = result.filter((p) => p.gender === 'men');
          break;
        case 'BEST SELLERS':
          result = result.filter((p) => p.isBestSeller);
          break;
        case 'WINTER COLLECTION':
          result = result.filter(
            (p) =>
              p.fabric.toLowerCase().includes('velvet') ||
              p.collection.toLowerCase().includes('nocturne') ||
              p.name.toLowerCase().includes('velvet') ||
              p.description.toLowerCase().includes('winter')
          );
          break;
        default:
          result = result.filter(
            (p) =>
              p.category.toUpperCase() === filterState.category.toUpperCase() ||
              p.collection.toUpperCase() === filterState.category.toUpperCase()
          );
          break;
      }
    }

    // 2. Price Range
    result = result.filter(
      (p) => p.price >= filterState.priceRange[0] && p.price <= filterState.priceRange[1]
    );

    // 3. Color Multi-Selection
    if (filterState.selectedColors.length > 0) {
      result = result.filter((p) =>
        p.colors?.some((c) => filterState.selectedColors.includes(c.name))
      );
    }

    // 4. Stock Availability
    result = result.filter((p) => {
      if (p.inStock && filterState.stockAvailability.inStock) return true;
      if (!p.inStock && filterState.stockAvailability.outOfStock) return true;
      return false;
    });

    // 5. Ratings Filter
    if (filterState.topRatedOnly) {
      result = result.filter((p) => p.rating >= 4.5);
    }

    // 6. Search Query
    if (filterState.searchQuery.trim()) {
      const q = filterState.searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.collection.toLowerCase().includes(q)
      );
    }

    // 7. Sorting Logic
    switch (filterState.sortBy) {
      case 'popularity':
        result.sort((a, b) => b.popularity - a.popularity);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'latest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'default':
      default:
        break;
    }

    return result;
  }, [allProducts, filterState]);

  // Active filter count
  const activeFilterCount =
    (filterState.category !== 'ALL' ? 1 : 0) +
    (filterState.priceRange[0] > minPossiblePrice || filterState.priceRange[1] < maxPossiblePrice ? 1 : 0) +
    filterState.selectedColors.length +
    (!filterState.stockAvailability.inStock || !filterState.stockAvailability.outOfStock ? 1 : 0) +
    (filterState.topRatedOnly ? 1 : 0) +
    (filterState.searchQuery.trim() !== '' ? 1 : 0) +
    (filterState.sortBy !== 'default' ? 1 : 0);

  // Pagination calculation
  const totalItems = filteredAndSortedProducts.length;
  const totalPages = Math.ceil(totalItems / filterState.itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (filterState.currentPage - 1) * filterState.itemsPerPage;
    return filteredAndSortedProducts.slice(start, start + filterState.itemsPerPage);
  }, [filteredAndSortedProducts, filterState.currentPage, filterState.itemsPerPage]);

  return (
    <div className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto text-[#F5F2EA]">
      {/* Breadcrumb & Header */}
      <div className="mb-8 border-b border-[#1C1C1C] pb-6">
        <div className="flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#888] uppercase mb-3 font-light">
          <button
            onClick={() => navigate('/')}
            className="hover:text-[#C9A24D] transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-[#C9A24D]">Shop Catalog</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F5F2EA] tracking-wide font-normal">
              NIGAH CLOTHES STORE
            </h1>
            <p className="text-xs sm:text-sm text-[#A1A1AA] tracking-wider mt-2 font-light max-w-2xl">
              Discover our signature haute couture, winter collections, luxury pret, and hand-embroidered formals.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs text-[#888] tracking-widest font-mono shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A24D]" />
            <span>ORIGINAL HANDCRAFT ASSURED</span>
          </div>
        </div>
      </div>

      {/* Main Responsive Layout: Sidebar on Desktop + Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Sidebar (Left Column - lg:col-span-4 xl:col-span-3) */}
        <div className="hidden lg:block lg:col-span-4 xl:col-span-3 ">
          <ShopSidebar
            filterState={filterState}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            minPossiblePrice={minPossiblePrice}
            maxPossiblePrice={maxPossiblePrice}
            totalProducts={allProducts.length}
            filteredCount={filteredAndSortedProducts.length}
            products={allProducts}
          />
        </div>

        {/* Main Content Area (Right Column - lg:col-span-8 xl:col-span-9) */}
        <div className="lg:col-span-8 xl:col-span-9 flex flex-col space-y-6">
          {/* Top Controls Ribbon */}
          <div className="bg-[#111111] border border-[#222] p-3.5 sm:p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5">
            {/* Mobile Filter & Sort Drawer Trigger */}
            <div className="flex items-center justify-between sm:justify-start gap-3 flex-wrap">
              <button
                id="mobile-filter-drawer-btn"
                onClick={() => setIsMobileDrawerOpen(true)}
                className="lg:hidden flex items-center space-x-2 px-3.5 py-2 bg-[#181818] border border-[#333] hover:border-[#C9A24D] text-xs uppercase tracking-wider text-[#F5F2EA] cursor-pointer transition-colors"
                aria-label="Open filter and sorting sidebar"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#C9A24D]" />
                <span>Filter & Sort</span>
                {activeFilterCount > 0 && (
                  <span className="bg-[#C9A24D] text-[#0A0A0A] text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Showing Result Counter */}
              <span className="text-xs text-[#888] tracking-wider min-w-0">
                Showing{' '}
                <strong className="text-[#E0C27A] font-medium">{filteredAndSortedProducts.length}</strong>{' '}
                of {allProducts.length} pieces
              </span>
            </div>

            {/* Display & Layout Controls: Items Per Page + Grid Switcher */}
            <div className="flex items-center justify-between sm:justify-end space-x-3 sm:space-x-4 flex-wrap gap-y-2">
              {/* Items Per Page */}
              <div className="flex items-center space-x-1 border border-[#2A2A2A] p-1 bg-[#181818]">
                <span className="text-[10px] tracking-wider text-[#777] px-1 hidden md:inline">
                  SHOW:
                </span>
                {ITEMS_PER_VIEW_OPTIONS.map((limit) => (
                  <button
                    key={limit}
                    id={`items-per-page-${limit}`}
                    onClick={() => handleFilterChange('itemsPerPage', limit)}
                    className={`px-2 py-0.5 text-[11px] font-mono transition-colors cursor-pointer ${
                      filterState.itemsPerPage === limit
                        ? 'bg-[#C9A24D] text-[#0A0A0A] font-semibold'
                        : 'text-[#888] hover:text-[#F5F2EA]'
                    }`}
                  >
                    {limit}
                  </button>
                ))}
              </div>

              {/* Grid Column Switcher */}
              <div className="flex items-center space-x-1 border border-[#2A2A2A] p-1 bg-[#181818]">
                <button
                  id="grid-btn-2"
                  onClick={() => handleFilterChange('gridColumns', 2 as GridColumns)}
                  className={`p-1.5 transition-colors cursor-pointer ${
                    filterState.gridColumns === 2
                      ? 'bg-[#C9A24D] text-[#0A0A0A]'
                      : 'text-[#888] hover:text-[#F5F2EA]'
                  }`}
                  title="2 Columns"
                  aria-label="2 Columns View"
                >
                  <Grid2X2 className="w-4 h-4" />
                </button>
                <button
                  id="grid-btn-3"
                  onClick={() => handleFilterChange('gridColumns', 3 as GridColumns)}
                  className={`p-1.5 transition-colors cursor-pointer ${
                    filterState.gridColumns === 3
                      ? 'bg-[#C9A24D] text-[#0A0A0A]'
                      : 'text-[#888] hover:text-[#F5F2EA]'
                  }`}
                  title="3 Columns"
                  aria-label="3 Columns View"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  id="grid-btn-4"
                  onClick={() => handleFilterChange('gridColumns', 4 as GridColumns)}
                  className={`hidden xl:block p-1.5 transition-colors cursor-pointer ${
                    filterState.gridColumns === 4
                      ? 'bg-[#C9A24D] text-[#0A0A0A]'
                      : 'text-[#888] hover:text-[#F5F2EA]'
                  }`}
                  title="4 Columns"
                  aria-label="4 Columns View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filter Tags Bar (Chips) */}
          {activeFilterCount > 0 && (
            <div className="flex items-center flex-wrap gap-2 pb-2">
              <span className="text-[11px] text-[#777] uppercase tracking-wider mr-1">
                Active Filters:
              </span>

              {/* Category chip */}
              {filterState.category !== 'ALL' && (
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-[#1C1C1C] border border-[#C9A24D]/40 text-[#E0C27A] text-[11px] tracking-wider">
                  <span>{filterState.category}</span>
                  <button
                    onClick={() => handleFilterChange('category', 'ALL')}
                    className="hover:text-white cursor-pointer ml-1"
                    aria-label="Remove category filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {/* Price range chip */}
              {(filterState.priceRange[0] > minPossiblePrice ||
                filterState.priceRange[1] < maxPossiblePrice) && (
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-[#1C1C1C] border border-[#C9A24D]/40 text-[#E0C27A] text-[11px] tracking-wider">
                  <span>
                    Rs. {filterState.priceRange[0].toLocaleString()} - Rs.{' '}
                    {filterState.priceRange[1].toLocaleString()}
                  </span>
                  <button
                    onClick={() =>
                      handleFilterChange('priceRange', [minPossiblePrice, maxPossiblePrice])
                    }
                    className="hover:text-white cursor-pointer ml-1"
                    aria-label="Reset price filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {/* Color chips */}
              {filterState.selectedColors.map((color) => (
                <span
                  key={color}
                  className="inline-flex items-center space-x-1 px-2.5 py-1 bg-[#1C1C1C] border border-[#C9A24D]/40 text-[#E0C27A] text-[11px] tracking-wider"
                >
                  <span>{color}</span>
                  <button
                    onClick={() =>
                      handleFilterChange(
                        'selectedColors',
                        filterState.selectedColors.filter((c) => c !== color)
                      )
                    }
                    className="hover:text-white cursor-pointer ml-1"
                    aria-label={`Remove color ${color}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {/* Rating chip */}
              {filterState.topRatedOnly && (
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-[#1C1C1C] border border-[#C9A24D]/40 text-[#E0C27A] text-[11px] tracking-wider">
                  <span>Rated 4.5+ ★</span>
                  <button
                    onClick={() => handleFilterChange('topRatedOnly', false)}
                    className="hover:text-white cursor-pointer ml-1"
                    aria-label="Remove rating filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {/* Search query chip */}
              {filterState.searchQuery && (
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-[#1C1C1C] border border-[#C9A24D]/40 text-[#E0C27A] text-[11px] tracking-wider">
                  <span>&quot;{filterState.searchQuery}&quot;</span>
                  <button
                    onClick={() => handleFilterChange('searchQuery', '')}
                    className="hover:text-white cursor-pointer ml-1"
                    aria-label="Clear search"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {/* Clear All Button */}
              <button
                onClick={handleResetFilters}
                className="text-[11px] text-[#A1A1AA] hover:text-[#C9A24D] underline cursor-pointer ml-2"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Product Grid or Empty State */}
          {paginatedProducts.length > 0 ? (
            <ProductGrid
              products={paginatedProducts}
              onQuickView={(p) => setQuickViewProduct(p)}
              gridColumns={filterState.gridColumns}
              onResetFilters={handleResetFilters}
              currentPage={filterState.currentPage}
              totalPages={totalPages}
              onPageChange={(page) => handleFilterChange('currentPage', page)}
            />
          ) : (
            <div className="py-20 px-6 text-center bg-[#0E0E0E] border border-[#222] flex flex-col items-center justify-center space-y-4">
              <SlidersHorizontal className="w-10 h-10 text-[#C9A24D]/60" />
              <h3 className="font-serif text-2xl text-[#F5F2EA] tracking-wide">
                No matching garments found
              </h3>
              <p className="text-sm text-[#A1A1AA] max-w-md">
                We couldn&apos;t find any pieces matching your specific filter criteria. Try adjusting your
                filters or search query.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-2 px-6 py-2.5 bg-[#C9A24D] text-[#0A0A0A] text-xs uppercase tracking-widest font-semibold hover:bg-[#E0C27A] transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Off-Canvas Filter & Sort Drawer */}
      {isMobileDrawerOpen && (
        <div
          id="mobile-filter-drawer-backdrop"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm lg:hidden flex justify-start"
          onClick={() => setIsMobileDrawerOpen(false)}
        >
          <div
            className="w-full max-w-xs sm:max-w-sm h-full bg-[#0E0E0E] border-r border-[#C9A24D]/30 p-5 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <ShopSidebar
              filterState={filterState}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              minPossiblePrice={minPossiblePrice}
              maxPossiblePrice={maxPossiblePrice}
              totalProducts={allProducts.length}
              filteredCount={filteredAndSortedProducts.length}
              products={allProducts}
              isMobileDrawer={true}
              onCloseMobileDrawer={() => setIsMobileDrawerOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
