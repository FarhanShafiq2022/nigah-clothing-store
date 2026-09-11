import { Product, Collection } from '../types';
import { PRODUCTS } from '../data/products';
import { COLLECTIONS } from '../data/collections';
import { isFirebaseConfigured } from './config';
import { db } from './firebase';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

export const PRODUCTS_COLLECTION = 'products';

const normalizeProduct = (id: string, value: Record<string, unknown>): Product => ({
  id: String(value.id ?? id),
  name: String(value.name ?? 'Unnamed Product'),
  category: String(value.category ?? 'ATELIER'),
  collection: String(value.collection ?? 'SIGNATURE'),
  price: Number(value.price ?? 0),
  originalPrice: value.originalPrice == null ? undefined : Number(value.originalPrice),
  currency: String(value.currency ?? 'PKR'),
  image: String(value.image ?? ''),
  hoverImage: String(value.hoverImage ?? value.image ?? ''),
  badge: value.badge == null ? undefined : String(value.badge),
  description: String(value.description ?? ''),
  fabric: String(value.fabric ?? ''),
  details: Array.isArray(value.details) ? value.details.map(String) : [],
  sizes: Array.isArray(value.sizes) ? value.sizes.map(String) : ['M'],
  isBestSeller: Boolean(value.isBestSeller),
  isNewArrival: Boolean(value.isNewArrival),
  gender: value.gender === 'men' || value.gender === 'unisex' ? value.gender : 'women',
  rating: Number(value.rating ?? 0),
  reviewCount: Number(value.reviewCount ?? 0),
  inStock: value.inStock !== false,
  popularity: Number(value.popularity ?? 0),
  colors: Array.isArray(value.colors)
    ? value.colors.map((color) => ({
        name: String((color as { name?: unknown }).name ?? 'Default'),
        hex: String((color as { hex?: unknown }).hex ?? '#111111')
      }))
    : [],
  createdAt: value.createdAt instanceof Date
    ? value.createdAt.toISOString()
    : typeof (value.createdAt as { toDate?: unknown } | undefined)?.toDate === 'function'
      ? (value.createdAt as { toDate: () => Date }).toDate().toISOString()
      : String(value.createdAt ?? new Date().toISOString())
});

const filterProducts = (products: Product[], filterCategory?: string) => {
  if (!filterCategory || filterCategory === 'ALL') return products;
  if (filterCategory === 'NEW ARRIVALS') return products.filter((product) => product.isNewArrival);
  if (filterCategory === 'BEST SELLERS') return products.filter((product) => product.isBestSeller);
  if (filterCategory === 'WOMEN') return products.filter((product) => product.gender === 'women');
  if (filterCategory === 'MEN') return products.filter((product) => product.gender === 'men');
  return products.filter(
    (product) =>
      product.category.toUpperCase() === filterCategory.toUpperCase() ||
      product.collection.toUpperCase() === filterCategory.toUpperCase()
  );
};

const getFirestoreProducts = async (): Promise<Product[]> => {
  const snapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
  return snapshot.docs.map((productDocument) =>
    normalizeProduct(productDocument.id, productDocument.data() as Record<string, unknown>)
  );
};


export const productsService = {
  async getProducts(filterCategory?: string): Promise<Product[]> {
    if (isFirebaseConfigured) {
      try {
        const firestoreProducts = await getFirestoreProducts();
        if (firestoreProducts.length > 0) {
          return filterProducts(firestoreProducts, filterCategory);
        }
      } catch (error) {
        console.error(
          `Firestore read failed for collection "${PRODUCTS_COLLECTION}". Using local catalog instead.`,
          error
        );
      }
    }
    return filterProducts(PRODUCTS, filterCategory);
  },
  async getProductById(id: string): Promise<Product | undefined> {
    if (isFirebaseConfigured) {
      try {
        const productDocument = await getDoc(doc(db, PRODUCTS_COLLECTION, id));
        if (productDocument.exists()) {
          return normalizeProduct(productDocument.id, productDocument.data() as Record<string, unknown>);
        }
      } catch (error) {
        console.error('Firestore product read failed; using local catalog instead.', error);
      }
    }
    return PRODUCTS.find(p => p.id === id);
  },
  async getCollections(): Promise<Collection[]> {
    return COLLECTIONS;
  }
};
