/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AtelierProvider } from './context/AtelierContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { SearchModal } from './components/SearchModal';
import { Toast } from './components/Toast';
import { BackToTop } from './components/BackToTop';
import { AtelierLoader } from './components/AtelierLoader';

// Page Views
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Blog } from './pages/Blog';
import { Shop } from './pages/Shop';
import { Contact } from './pages/Contact';
import { OrdersDashboard } from './pages/OrdersDashboard';
import { AdminDashboard } from './pages/AdminDashboard';

const AppContent: React.FC = () => {
  const { currentRoute } = useNavigation();

  // Ensure scroll position is reliably reset to top whenever route changes
  useEffect(() => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    } catch {
      window.scrollTo(0, 0);
    }

    // Secondary timer to handle any delayed height layout shifts or animations
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 60);

    return () => clearTimeout(timer);
  }, [currentRoute]);

  const renderPage = () => {
    switch (currentRoute) {
      case '/':
        return <Home />;
      case '/about':
        return <About />;
      // case '/blog':
      //   return <Blog />;
      case '/shop':
        return <Shop />;
      case '/contact':
        return <Contact />;
      case '/orders':
        return <OrdersDashboard />;
      case '/admin':
        return <AdminDashboard section="overview" />;
      case '/admin/products':
        return <AdminDashboard section="products" />;
      case '/admin/orders':
        return <AdminDashboard section="orders" />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F2EA] flex flex-col selection:bg-[#C9A24D] selection:text-[#0A0A0A]">
      {/* Luxury Pre-loader / Entrance Screen with Same Aesthetic */}
      <AtelierLoader />

      {/* Centered Navigation Bar with Hover & Indicator UX */}
      <Navbar />

      {/* Main Page Area with Fluid Entry/Exit Transitions */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRoute}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Luxury Footer with Seamless Page Routing */}
      <Footer />

      {/* Modern Floating Go To Top Button with Circular Scroll Progress */}
      <BackToTop />

      {/* Global Interactive Drawers & Overlays */}
      <CartDrawer />
      <WishlistDrawer />
      <QuickViewModal />
      <SearchModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AtelierProvider>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </AtelierProvider>
  );
}
