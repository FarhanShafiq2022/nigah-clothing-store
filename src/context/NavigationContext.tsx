import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type AppRoute =
  | '/'
  | '/about'
  | '/blog'
  | '/shop'
  | '/contact'
  | '/orders'
  | '/admin'
  | '/admin/products'
  | '/admin/orders';

interface NavigationContextType {
  currentRoute: AppRoute;
  categoryFilter: string | null;
  setCategoryFilter: (cat: string | null) => void;
  navigate: (route: AppRoute | string, category?: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

function normalizeRoute(path: string): AppRoute {
  const clean = path.toLowerCase().split('?')[0].split('#')[0];
  if (clean === '' || clean === '/') return '/';
  if (clean.startsWith('/about')) return '/about';
  if (clean.startsWith('/blog')) return '/blog';
  if (clean.startsWith('/shop')) return '/shop';
  if (clean.startsWith('/contact')) return '/contact';
  if (clean.startsWith('/orders')) return '/orders';
  if (clean.startsWith('/admin/products')) return '/admin/products';
  if (clean.startsWith('/admin/orders')) return '/admin/orders';
  if (clean.startsWith('/admin')) return '/admin';
  return '/';
}

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(() => {
    if (typeof window !== 'undefined') {
      return normalizeRoute(window.location.pathname);
    }
    return '/';
  });
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const navigate = useCallback((route: AppRoute | string, category?: string) => {
    const target = normalizeRoute(route);
    if (category) {
      setCategoryFilter(category);
    }
    if (typeof window !== 'undefined') {
      if (window.location.pathname !== target) {
        window.history.pushState({}, '', target);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setCurrentRoute(target);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(normalizeRoute(window.location.pathname));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <NavigationContext.Provider value={{ currentRoute, categoryFilter, setCategoryFilter, navigate }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
