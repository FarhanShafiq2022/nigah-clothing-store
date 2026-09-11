import { useEffect, useMemo, useState } from 'react';
import { PRODUCTS } from '../data/products';
import { CategoryFilter } from '../types';
import { productsService } from '../firebase/products';

let productsRequest: Promise<typeof PRODUCTS> | null = null;

export const useProducts = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('ALL');
  const [allProducts, setAllProducts] = useState(PRODUCTS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    productsRequest ??= productsService.getProducts();
    productsRequest.then((loadedProducts) => {
      if (isMounted) {
        setAllProducts(loadedProducts);
        setIsLoading(false);
      }
    }).catch((error) => {
      console.error('Product loading failed.', error);
      if (isMounted) setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'ALL') return allProducts;
    if (activeCategory === 'NEW ARRIVALS') return allProducts.filter(p => p.isNewArrival);
    if (activeCategory === 'BEST SELLERS') return allProducts.filter(p => p.isBestSeller);
    if (activeCategory === 'WOMEN') return allProducts.filter(p => p.gender === 'women');
    if (activeCategory === 'MEN') return allProducts.filter(p => p.gender === 'men');
    return allProducts.filter(
      (product) =>
        product.category.toUpperCase() === activeCategory.toUpperCase() ||
        product.collection.toUpperCase() === activeCategory.toUpperCase()
    );
  }, [activeCategory, allProducts]);

  return {
    products: filteredProducts,
    allProducts,
    isLoading,
    activeCategory,
    setActiveCategory
  };
};
