import { useState } from "react";
import {
  Search,
  X,
  RotateCcw,
  SlidersHorizontal,
  Check,
  Star,
  ArrowUpDown,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { CategoryFilter, FilterState, Product, SortOption } from "../types";
import { COLOR_PALETTE } from "../data/products";

interface ShopSidebarProps {
  filterState: FilterState;
  onFilterChange: <K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) => void;
  onResetFilters: () => void;
  minPossiblePrice: number;
  maxPossiblePrice: number;
  totalProducts: number;
  filteredCount: number;
  products: Product[];
  isMobileDrawer?: boolean;
  onCloseMobileDrawer?: () => void;
}

const PRIMARY_CATEGORIES: { label: string; value: CategoryFilter }[] = [
  { label: "All Pieces", value: "ALL" },
  { label: "New Arrivals", value: "NEW ARRIVALS" },
  { label: "Women", value: "WOMEN" },
  { label: "Men", value: "MEN" },
  { label: "Best Sellers", value: "BEST SELLERS" },
];

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "Curated Order (Default)", value: "default" },
  { label: "Popularity (Most Coveted)", value: "popularity" },
  { label: "Highest Rated", value: "rating" },
  { label: "Latest Arrivals", value: "latest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

export const ShopSidebar: React.FC<ShopSidebarProps> = ({
  filterState,
  onFilterChange,
  onResetFilters,
  minPossiblePrice,
  maxPossiblePrice,
  totalProducts,
  filteredCount,
  products,
  isMobileDrawer = false,
  onCloseMobileDrawer,
}) => {
  // Count active non-default filters
  const activeFilterCount =
    (filterState.category !== "ALL" ? 1 : 0) +
    (filterState.priceRange[0] > minPossiblePrice ||
    filterState.priceRange[1] < maxPossiblePrice
      ? 1
      : 0) +
    filterState.selectedColors.length +
    (!filterState.stockAvailability.inStock ||
    !filterState.stockAvailability.outOfStock
      ? 1
      : 0) +
    (filterState.topRatedOnly ? 1 : 0) +
    (filterState.searchQuery.trim() !== "" ? 1 : 0) +
    (filterState.sortBy !== "default" ? 1 : 0);

  const toggleColor = (colorName: string) => {
    const exists = filterState.selectedColors.includes(colorName);
    const updated = exists
      ? filterState.selectedColors.filter((c) => c !== colorName)
      : [...filterState.selectedColors, colorName];
    onFilterChange("selectedColors", updated);
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(
      minPossiblePrice,
      Math.min(Number(e.target.value) || 0, filterState.priceRange[1]),
    );
    onFilterChange("priceRange", [val, filterState.priceRange[1]]);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.min(
      maxPossiblePrice,
      Math.max(Number(e.target.value) || 0, filterState.priceRange[0]),
    );
    onFilterChange("priceRange", [filterState.priceRange[0], val]);
  };

  const setPriceBracket = (min: number, max: number) => {
    onFilterChange("priceRange", [min, max]);
  };

  const priceSpan = Math.max(0, maxPossiblePrice - minPossiblePrice);
  const firstBandMax = Math.min(
    maxPossiblePrice,
    Math.max(
      minPossiblePrice,
      Math.ceil((minPossiblePrice + priceSpan / 3) / 1000) * 1000,
    ),
  );
  const secondBandMin = firstBandMax;
  const secondBandMax = Math.min(
    maxPossiblePrice,
    Math.max(
      secondBandMin,
      Math.ceil((minPossiblePrice + (priceSpan * 2) / 3) / 1000) * 1000,
    ),
  );
  const catalogCategories = Array.from(
    new Set(
      products.flatMap((product) => [product.category, product.collection]),
    ),
  ).filter(Boolean);
  const availableColors = Array.from(
    new Map(
      products
        .flatMap((product) => product.colors ?? [])
        .map((color) => [color.name, color]),
    ).values(),
  );
  const hasRatings = products.some((product) => product.rating > 0);
  const [activeGender, setActiveGender] = useState<"WOMEN" | "MEN">("WOMEN");
  const getCategoryCount = (catValue: string) => {
    // All products
    if (catValue === "ALL") {
      return products.length;
    }

    // New arrivals
    if (catValue === "NEW ARRIVALS") {
      return products.filter((p) => p.isNewArrival).length;
    }

    // Women
    if (catValue === "WOMEN") {
      return products.filter((p) => p.gender?.toLowerCase() === "women").length;
    }

    // Men
    if (catValue === "MEN") {
      return products.filter((p) => p.gender?.toLowerCase() === "men").length;
    }

    // Best sellers
    if (catValue === "BEST SELLERS") {
      return products.filter((p) => p.isBestSeller).length;
    }

    // Winter Collection
    if (catValue === "WINTER COLLECTION") {
      return products.filter(
        (p) =>
          p.fabric?.toLowerCase().includes("velvet") ||
          p.collection?.toLowerCase().includes("nocturne") ||
          p.name?.toLowerCase().includes("velvet"),
      ).length;
    }

    // Gender-aware subcategory count
    return products.filter((p) => {
      const productGender = p.gender?.toLowerCase();

      const matchesGender =
        activeGender === "WOMEN"
          ? productGender === "women"
          : productGender === "men";

      const category = p.category?.toUpperCase();
      const collection = p.collection?.toUpperCase();
      const selectedCategory = catValue.toUpperCase();

      const matchesCategory =
        category === selectedCategory || collection === selectedCategory;

      return matchesGender && matchesCategory;
    }).length;
  };
  return (
    <aside
      className={`w-full text-[#F5F2EA] flex flex-col ${
        isMobileDrawer
          ? "h-full"
          : "bg-[#0E0E0E]/90 border border-[#222] p-5 sm:p-6 backdrop-blur-sm"
      }`}
      id="shop-filters-sidebar"
      aria-label="Shop Filter and Sort Sidebar"
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#222]">
        <div className="flex items-center space-x-2.5">
          <SlidersHorizontal className="w-4 h-4 text-[#C9A24D]" />
          <h2 className="font-serif text-lg tracking-[0.15em] text-[#F5F2EA] uppercase font-medium">
            Filter & Sort
          </h2>
          {activeFilterCount > 0 && (
            <span className="bg-[#C9A24D] text-[#0A0A0A] text-[11px] font-bold px-2 py-0.5 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {activeFilterCount > 0 && (
            <button
              onClick={onResetFilters}
              id="sidebar-reset-btn"
              className="text-[11px] text-[#A1A1AA] hover:text-[#C9A24D] flex items-center space-x-1 uppercase tracking-wider transition-colors cursor-pointer"
              title="Reset all filters"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}

          {isMobileDrawer && onCloseMobileDrawer && (
            <button
              onClick={onCloseMobileDrawer}
              className="p-1.5 text-[#888] hover:text-[#F5F2EA] transition-colors cursor-pointer"
              aria-label="Close filters drawer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Scrollable Filter Form Controls */}
      <div
        className={`space-y-6 ${isMobileDrawer ? "flex-1 overflow-y-auto pr-1" : ""}`}
      >
        {/* 1. Keyword Search */}
        <div className="space-y-2">
          <label
            htmlFor="sidebar-search-input"
            className="text-[11px] tracking-[0.22em] text-[#C9A24D] uppercase font-medium block"
          >
            Search Catalog
          </label>
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#777]" />
            <input
              id="sidebar-search-input"
              type="text"
              value={filterState.searchQuery}
              onChange={(e) => onFilterChange("searchQuery", e.target.value)}
              placeholder="Search silk, velvet, kurta..."
              className="w-full pl-9 pr-8 py-2 bg-[#181818] border border-[#2A2A2A] text-xs text-[#F5F2EA] placeholder-[#666] focus:outline-none focus:border-[#C9A24D] tracking-wider transition-colors"
            />
            {filterState.searchQuery && (
              <button
                onClick={() => onFilterChange("searchQuery", "")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#777] hover:text-[#F5F2EA] cursor-pointer"
                aria-label="Clear search text"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* 2. Sorting Options */}
        <div className="space-y-2.5 pt-2 border-t border-[#1C1C1C]">
          <div className="flex items-center justify-between">
            <label
              htmlFor="sidebar-sort-select"
              className="text-[11px] tracking-[0.22em] text-[#C9A24D] uppercase font-medium flex items-center space-x-1.5"
            >
              <ArrowUpDown className="w-3 h-3 text-[#C9A24D]" />
              <span>Sort Products</span>
            </label>
            {filterState.sortBy !== "default" && (
              <span className="text-[10px] text-[#C9A24D] font-mono uppercase">
                Active
              </span>
            )}
          </div>

          <div className="relative">
            <select
              id="sidebar-sort-select"
              value={filterState.sortBy}
              onChange={(e) =>
                onFilterChange("sortBy", e.target.value as SortOption)
              }
              className="w-full appearance-none bg-[#181818] border border-[#2A2A2A] text-xs text-[#F5F2EA] py-2.5 pl-3 pr-8 tracking-wider focus:outline-none focus:border-[#C9A24D] cursor-pointer transition-colors"
            >
              {SORT_OPTIONS.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                  className="bg-[#111] text-[#F5F2EA]"
                >
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-[#888] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* 3. Primary Categories & Collections */}
        <div className="pt-2 border-t border-[#1C1C1C]">
          {/* Women / Men Primary Navigation */}
          {/* Women / Men Primary Navigation */}
          <div className="grid grid-cols-2 border-b border-[#1C1C1C]">
            {/* Women */}
            <button
              type="button"
              onClick={() => {
                setActiveGender("WOMEN");
                onFilterChange("category", "WOMEN");
              }}
              className={`relative flex h-14 items-center justify-center text-[13px] font-normal tracking-[0.08em] transition-colors duration-200 ${
                activeGender === "WOMEN"
                  ? "text-[#C9A24D]"
                  : "text-[#F5F2EA] hover:text-[#C9A24D]"
              }`}
            >
              <span>WOMEN</span>

              {activeGender === "WOMEN" && (
                <span className="absolute bottom-[10px] h-[5px] w-[5px] bg-[#C9A24D]" />
              )}
            </button>

            {/* Men */}
            <button
              type="button"
              onClick={() => {
                setActiveGender("MEN");
                onFilterChange("category", "MEN");
              }}
              className={`relative flex h-14 items-center justify-center text-[13px] font-normal tracking-[0.08em] transition-colors duration-200 ${
                activeGender === "MEN"
                  ? "text-[#C9A24D]"
                  : "text-[#F5F2EA] hover:text-[#C9A24D]"
              }`}
            >
              <span>MEN</span>

              {activeGender === "MEN" && (
                <span className="absolute bottom-[10px] h-[5px] w-[5px] bg-[#C9A24D]" />
              )}
            </button>
          </div>

          {/* Women Collections */}
          {activeGender === "WOMEN" && (
            <div className="space-y-1 px-3 py-5">
              {/* <button
        type="button"
        onClick={() => onFilterChange('category', 'WOMEN')}
        className="block w-full py-2 text-left text-[11px] uppercase tracking-[0.12em] text-[#666] transition-colors hover:text-[#1C1C1C]"
      >
        FURTHER REDUCTIONS – FLAT 50% OFF
      </button> */}

              <button
                type="button"
                onClick={() => onFilterChange("category", "NEW ARRIVALS")}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-all cursor-pointer text-left ${
                  filterState.category === "NEW ARRIVALS"
                    ? "bg-[#C9A24D]/15 text-[#E0C27A] border-l-2 border-[#C9A24D] font-medium"
                    : "text-[#A1A1AA] hover:text-[#F5F2EA] hover:bg-[#161616]"
                }`}
              >
                NEW ARRIVALS
              </button>

              <button
                type="button"
                onClick={() => onFilterChange("category", "EASTERN")}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-all cursor-pointer text-left ${
                  filterState.category === "EASTERN"
                    ? "bg-[#C9A24D]/15 text-[#E0C27A] border-l-2 border-[#C9A24D] font-medium"
                    : "text-[#A1A1AA] hover:text-[#F5F2EA] hover:bg-[#161616]"
                }`}
              >
                EASTERN
              </button>

              <button
                type="button"
                onClick={() => onFilterChange("category", "WESTERN")}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-all cursor-pointer text-left ${
                  filterState.category === "WESTERN"
                    ? "bg-[#C9A24D]/15 text-[#E0C27A] border-l-2 border-[#C9A24D] font-medium"
                    : "text-[#A1A1AA] hover:text-[#F5F2EA] hover:bg-[#161616]"
                }`}
              >
                WESTERN
              </button>

              <button
                type="button"
                onClick={() => onFilterChange("category", "EAST MEETS WEST")}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-all cursor-pointer text-left ${
                  filterState.category === "EAST MEETS WEST"
                    ? "bg-[#C9A24D]/15 text-[#E0C27A] border-l-2 border-[#C9A24D] font-medium"
                    : "text-[#A1A1AA] hover:text-[#F5F2EA] hover:bg-[#161616]"
                }`}
              >
                EAST MEETS WEST
              </button>

              <button
                type="button"
                onClick={() => onFilterChange("category", "FOOTWEAR")}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-all cursor-pointer text-left ${
                  filterState.category === "FOOTWEAR"
                    ? "bg-[#C9A24D]/15 text-[#E0C27A] border-l-2 border-[#C9A24D] font-medium"
                    : "text-[#A1A1AA] hover:text-[#F5F2EA] hover:bg-[#161616]"
                }`}
              >
                FOOTWEAR
              </button>

              <button
                type="button"
                onClick={() => onFilterChange("category", "FRAGRANCES")}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-all cursor-pointer text-left ${
                  filterState.category === "FRAGRANCES"
                    ? "bg-[#C9A24D]/15 text-[#E0C27A] border-l-2 border-[#C9A24D] font-medium"
                    : "text-[#A1A1AA] hover:text-[#F5F2EA] hover:bg-[#161616]"
                }`}
              >
                FRAGRANCES
              </button>

              <button
                type="button"
                onClick={() => onFilterChange("category", "ACCESSORIES")}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-all cursor-pointer text-left ${
                  filterState.category === "ACCESSORIES"
                    ? "bg-[#C9A24D]/15 text-[#E0C27A] border-l-2 border-[#C9A24D] font-medium"
                    : "text-[#A1A1AA] hover:text-[#F5F2EA] hover:bg-[#161616]"
                }`}
              >
                ACCESSORIES
              </button>
            </div>
          )}

          {/* Men Collections */}
          {activeGender === "MEN" && (
            <div className="space-y-1 px-3 py-5">
              {/* <button
        type="button"
        onClick={() => onFilterChange('category', 'MEN')}
        className="block w-full py-2 text-left text-[11px] uppercase tracking-[0.12em] text-[#666] transition-colors hover:text-[#1C1C1C]"
      >
        FURTHER REDUCTIONS – FLAT 50% OFF
      </button> */}

              <button
                type="button"
                onClick={() => onFilterChange("category", "NEW ARRIVALS")}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-all cursor-pointer text-left ${
                  filterState.category === "NEW ARRIVALS"
                    ? "bg-[#C9A24D]/15 text-[#E0C27A] border-l-2 border-[#C9A24D] font-medium"
                    : "text-[#A1A1AA] hover:text-[#F5F2EA] hover:bg-[#161616]"
                }`}
              >
                NEW ARRIVALS
              </button>

              <button
                type="button"
                onClick={() => onFilterChange("category", "EASTERN")}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-all cursor-pointer text-left ${
                  filterState.category === "EASTERN"
                    ? "bg-[#C9A24D]/15 text-[#E0C27A] border-l-2 border-[#C9A24D] font-medium"
                    : "text-[#A1A1AA] hover:text-[#F5F2EA] hover:bg-[#161616]"
                }`}
              >
                EASTERN
              </button>

              <button
                type="button"
                onClick={() => onFilterChange("category", "WESTERN")}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-all cursor-pointer text-left ${
                  filterState.category === "WESTERN"
                    ? "bg-[#C9A24D]/15 text-[#E0C27A] border-l-2 border-[#C9A24D] font-medium"
                    : "text-[#A1A1AA] hover:text-[#F5F2EA] hover:bg-[#161616]"
                }`}
              >
                WESTERN
              </button>

              <button
                type="button"
                onClick={() => onFilterChange("category", "EAST MEETS WEST")}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-all cursor-pointer text-left ${
                  filterState.category === "EAST MEETS WEST"
                    ? "bg-[#C9A24D]/15 text-[#E0C27A] border-l-2 border-[#C9A24D] font-medium"
                    : "text-[#A1A1AA] hover:text-[#F5F2EA] hover:bg-[#161616]"
                }`}
              >
                EAST MEETS WEST
              </button>

              <button
                type="button"
                onClick={() => onFilterChange("category", "FOOTWEAR")}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-all cursor-pointer text-left ${
                  filterState.category === "FOOTWEAR"
                    ? "bg-[#C9A24D]/15 text-[#E0C27A] border-l-2 border-[#C9A24D] font-medium"
                    : "text-[#A1A1AA] hover:text-[#F5F2EA] hover:bg-[#161616]"
                }`}
              >
                FOOTWEAR
              </button>

              <button
                type="button"
                onClick={() => onFilterChange("category", "FRAGRANCES")}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-all cursor-pointer text-left ${
                  filterState.category === "FRAGRANCES"
                    ? "bg-[#C9A24D]/15 text-[#E0C27A] border-l-2 border-[#C9A24D] font-medium"
                    : "text-[#A1A1AA] hover:text-[#F5F2EA] hover:bg-[#161616]"
                }`}
              >
                FRAGRANCES
              </button>

              <button
                type="button"
                onClick={() => onFilterChange("category", "ACCESSORIES")}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-all cursor-pointer text-left ${
                  filterState.category === "ACCESSORIES"
                    ? "bg-[#C9A24D]/15 text-[#E0C27A] border-l-2 border-[#C9A24D] font-medium"
                    : "text-[#A1A1AA] hover:text-[#F5F2EA] hover:bg-[#161616]"
                }`}
              >
                ACCESSORIES
              </button>
            </div>
          )}
        </div>

        {/* 4. Catalog Categories */}
        <div className="space-y-2.5 pt-2 border-t border-[#1C1C1C]">
          <label className="text-[11px] tracking-[0.22em] text-[#C9A24D] uppercase font-medium block">
            Catalog Categories
          </label>
          <div className="space-y-1">
            {catalogCategories.map((category) => {
              const isSelected = filterState.category === category;
              const count = getCategoryCount(category);
              return (
                <button
                  key={category}
                  id={`catalog-category-btn-${category.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => onFilterChange("category", category)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-all cursor-pointer text-left ${
                    isSelected
                      ? "bg-[#C9A24D]/15 text-[#E0C27A] border-l-2 border-[#C9A24D] font-medium"
                      : "text-[#A1A1AA] hover:text-[#F5F2EA] hover:bg-[#161616]"
                  }`}
                >
                  <span className="tracking-wider">{category}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      isSelected
                        ? "bg-[#C9A24D] text-[#0A0A0A] font-bold"
                        : "text-[#666] bg-[#161616]"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. Price Range (PKR) */}
        <div className="space-y-3 pt-2 border-t border-[#1C1C1C]">
          <div className="flex items-center justify-between">
            <label className="text-[11px] tracking-[0.22em] text-[#C9A24D] uppercase font-medium block">
              Price Range (PKR)
            </label>
            {(filterState.priceRange[0] > minPossiblePrice ||
              filterState.priceRange[1] < maxPossiblePrice) && (
              <button
                onClick={() =>
                  onFilterChange("priceRange", [
                    minPossiblePrice,
                    maxPossiblePrice,
                  ])
                }
                className="text-[10px] text-[#A1A1AA] hover:text-[#C9A24D] uppercase tracking-wider cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>

          {/* Quick Price Brackets */}
          <div className="grid grid-cols-3 gap-1.5 pt-1">
            <button
              onClick={() => setPriceBracket(minPossiblePrice, firstBandMax)}
              className={`px-1.5 py-1 text-[10px] tracking-wider border transition-colors cursor-pointer text-center ${
                filterState.priceRange[1] === firstBandMax &&
                filterState.priceRange[0] === minPossiblePrice
                  ? "border-[#C9A24D] text-[#E0C27A] bg-[#C9A24D]/10"
                  : "border-[#262626] text-[#888] hover:text-[#F5F2EA] hover:border-[#444]"
              }`}
            >
              &lt; {firstBandMax.toLocaleString()}
            </button>
            <button
              onClick={() => setPriceBracket(secondBandMin, secondBandMax)}
              className={`px-1.5 py-1 text-[10px] tracking-wider border transition-colors cursor-pointer text-center ${
                filterState.priceRange[0] === secondBandMin &&
                filterState.priceRange[1] === secondBandMax
                  ? "border-[#C9A24D] text-[#E0C27A] bg-[#C9A24D]/10"
                  : "border-[#262626] text-[#888] hover:text-[#F5F2EA] hover:border-[#444]"
              }`}
            >
              {secondBandMin.toLocaleString()} -{" "}
              {secondBandMax.toLocaleString()}
            </button>
            <button
              onClick={() => setPriceBracket(secondBandMax, maxPossiblePrice)}
              className={`px-1.5 py-1 text-[10px] tracking-wider border transition-colors cursor-pointer text-center ${
                filterState.priceRange[0] === secondBandMax &&
                filterState.priceRange[1] === maxPossiblePrice
                  ? "border-[#C9A24D] text-[#E0C27A] bg-[#C9A24D]/10"
                  : "border-[#262626] text-[#888] hover:text-[#F5F2EA] hover:border-[#444]"
              }`}
            >
              &gt; {secondBandMax.toLocaleString()}
            </button>
          </div>

          {/* Numeric Inputs */}
          <div className="flex items-center space-x-2 pt-1">
            <div className="flex-1">
              <span className="text-[9px] text-[#777] uppercase block mb-1">
                Min (Rs.)
              </span>
              <input
                type="number"
                id="sidebar-price-min"
                value={filterState.priceRange[0]}
                onChange={handleMinPriceChange}
                min={minPossiblePrice}
                max={filterState.priceRange[1]}
                step={1000}
                className="w-full bg-[#181818] border border-[#2A2A2A] px-2 py-1.5 text-xs text-[#F5F2EA] font-mono focus:outline-none focus:border-[#C9A24D]"
              />
            </div>
            <span className="text-[#666] pt-4">—</span>
            <div className="flex-1">
              <span className="text-[9px] text-[#777] uppercase block mb-1">
                Max (Rs.)
              </span>
              <input
                type="number"
                id="sidebar-price-max"
                value={filterState.priceRange[1]}
                onChange={handleMaxPriceChange}
                min={filterState.priceRange[0]}
                max={maxPossiblePrice}
                step={1000}
                className="w-full bg-[#181818] border border-[#2A2A2A] px-2 py-1.5 text-xs text-[#F5F2EA] font-mono focus:outline-none focus:border-[#C9A24D]"
              />
            </div>
          </div>

          {/* Range Slider for Maximum Price */}
          <div className="pt-1">
            <input
              type="range"
              id="sidebar-price-slider"
              min={minPossiblePrice}
              max={maxPossiblePrice}
              step={1000}
              value={filterState.priceRange[1]}
              onChange={(e) =>
                onFilterChange("priceRange", [
                  filterState.priceRange[0],
                  Number(e.target.value),
                ])
              }
              className="w-full accent-[#C9A24D] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#666] font-mono mt-0.5">
              <span>Rs. {minPossiblePrice.toLocaleString()}</span>
              <span>Rs. {filterState.priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* 6. Color Swatches Palette */}
        <div className="space-y-2.5 pt-2 border-t border-[#1C1C1C]">
          <div className="flex items-center justify-between">
            <label className="text-[11px] tracking-[0.22em] text-[#C9A24D] uppercase font-medium block">
              Color Palette
            </label>
            {filterState.selectedColors.length > 0 && (
              <button
                onClick={() => onFilterChange("selectedColors", [])}
                className="text-[10px] text-[#A1A1AA] hover:text-[#C9A24D] uppercase tracking-wider cursor-pointer"
              >
                Clear ({filterState.selectedColors.length})
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {COLOR_PALETTE.map((color) => {
              const isSelected = filterState.selectedColors.includes(
                color.name,
              );
              return (
                <button
                  key={color.name}
                  id={`sidebar-color-${color.name.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => toggleColor(color.name)}
                  title={color.name}
                  className={`relative w-7 h-7 rounded-full transition-transform duration-200 cursor-pointer flex items-center justify-center ${
                    isSelected
                      ? "ring-2 ring-[#C9A24D] ring-offset-2 ring-offset-[#0E0E0E] scale-110"
                      : "hover:scale-105 border border-white/20"
                  }`}
                  style={{ backgroundColor: color.hex }}
                >
                  {isSelected && (
                    <Check
                      className={`w-3.5 h-3.5 ${
                        color.hex === "#F5F2EA" || color.hex === "#C99B8E"
                          ? "text-[#0A0A0A]"
                          : "text-white"
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
          {filterState.selectedColors.length > 0 && (
            <p className="text-[10px] text-[#C9A24D] font-light">
              Selected: {filterState.selectedColors.join(", ")}
            </p>
          )}
        </div>

        {/* 7. Stock Availability */}
        <div className="space-y-2.5 pt-2 border-t border-[#1C1C1C]">
          <label className="text-[11px] tracking-[0.22em] text-[#C9A24D] uppercase font-medium block">
            Stock Availability
          </label>
          <div className="space-y-2 pt-0.5">
            <label className="flex items-center space-x-2.5 cursor-pointer group">
              <input
                type="checkbox"
                id="sidebar-stock-in"
                checked={filterState.stockAvailability.inStock}
                onChange={(e) =>
                  onFilterChange("stockAvailability", {
                    ...filterState.stockAvailability,
                    inStock: e.target.checked,
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
                id="sidebar-stock-out"
                checked={filterState.stockAvailability.outOfStock}
                onChange={(e) =>
                  onFilterChange("stockAvailability", {
                    ...filterState.stockAvailability,
                    outOfStock: e.target.checked,
                  })
                }
                className="accent-[#C9A24D] w-4 h-4 cursor-pointer"
              />
              <span className="text-xs text-[#CCC] group-hover:text-[#F5F2EA] transition-colors">
                Made to Order / Pre-Order
              </span>
            </label>
          </div>
        </div>

        {/* 8. Top Rated Filter (4.5+ Stars) */}
        <div className="space-y-2.5 pt-2 border-t border-[#1C1C1C]">
          <label className="text-[11px] tracking-[0.22em] text-[#C9A24D] uppercase font-medium block">
            Curator Rating
          </label>
          <label className="flex items-center justify-between p-2.5 bg-[#161616] border border-[#262626] hover:border-[#C9A24D]/50 transition-colors cursor-pointer group">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="sidebar-top-rated"
                checked={filterState.topRatedOnly}
                onChange={(e) =>
                  onFilterChange("topRatedOnly", e.target.checked)
                }
                disabled={!hasRatings}
                className="accent-[#C9A24D] w-4 h-4 cursor-pointer"
              />
              <span className="text-xs text-[#CCC] group-hover:text-[#F5F2EA] transition-colors">
                {hasRatings ? "Top Rated (4.5+)" : "Ratings unavailable"}
              </span>
            </div>
            <div className="flex items-center space-x-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-3 h-3 text-[#C9A24D] fill-[#C9A24D]"
                />
              ))}
            </div>
          </label>
        </div>
      </div>

      {/* Mobile Drawer Bottom Action Bar */}
      {isMobileDrawer && (
        <div className="pt-4 mt-4 border-t border-[#222] flex items-center space-x-3">
          <button
            onClick={onResetFilters}
            className="flex-1 py-3 px-4 border border-[#333] text-xs uppercase tracking-wider text-[#A1A1AA] hover:text-[#F5F2EA] transition-colors cursor-pointer text-center"
          >
            Clear All
          </button>
          <button
            onClick={onCloseMobileDrawer}
            className="flex-2 py-3 px-4 bg-[#C9A24D] text-[#0A0A0A] text-xs font-semibold uppercase tracking-wider hover:bg-[#E0C27A] transition-colors cursor-pointer text-center"
          >
            View {filteredCount} Results
          </button>
        </div>
      )}
    </aside>
  );
};
