export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  collection: string;
  price: number;
  originalPrice?: number;
  currency: string;
  image: string;
  hoverImage: string;
  badge?: string;
  description: string;
  fabric: string;
  details: string[];
  sizes: string[];
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  gender: 'women' | 'men' | 'unisex';
  rating: number;
  reviewCount: number;
  inStock: boolean;
  popularity: number;
  colors: ProductColor[];
  createdAt: string;
}

export interface Collection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface CartItem {
  id: string; // product.id + '-' + size
  product: Product;
  size: string;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  comment: string;
  rating: number;
  itemPurchased: string;
}

export type CategoryFilter =
  | 'ALL'
  | 'NEW ARRIVALS'
  | 'WOMEN'
  | 'MEN'
  // NEW
  | 'EASTERN'
  | 'WESTERN'
  | 'BEST SELLERS'
  | 'EAST MEETS WEST'
  | 'FOOTWEAR'
  | 'FRAGRANCES'
  | 'ACCESSORIES'
  | string;

export type SortOption =
  | 'default'
  | 'popularity'
  | 'rating'
  | 'latest'
  | 'price-asc'
  | 'price-desc';

export type GridColumns = 2 | 3 | 4;
export type ItemsPerPage = 9 | 12 | 18 | 24;

export interface FilterState {
  category: CategoryFilter;
  priceRange: [number, number];
  selectedColors: string[];
  stockAvailability: {
    inStock: boolean;
    outOfStock: boolean;
  };
  topRatedOnly: boolean;
  searchQuery: string;
  sortBy: SortOption;
  itemsPerPage: ItemsPerPage;
  gridColumns: GridColumns;
  currentPage: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  coverImage: string;
  tags: string[];
}
