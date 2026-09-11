import React, { useLayoutEffect, useRef } from "react";
import { HeroVideo } from "../components/HeroVideo";
import { BrandStory } from "../components/BrandStory";
import { FeaturedSection } from "../components/FeaturedSection";
import { Collections } from "../components/Collections";
import { EditorialMosaic } from "../components/EditorialMosaic";
import { WhyChooseUs } from "../components/WhyChooseUs";
import { BestSellersSection } from "../components/BestSellersSection";
import { InstagramGallery } from "../components/InstagramGallery";
import { Testimonials } from "../components/Testimonials";
import { Newsletter } from "../components/Newsletter";
import { useAtelier } from "../context/AtelierContext";
import { useNavigation } from "../context/NavigationContext";
import { Product } from "../types";
import { useProducts } from "../hooks/useProducts";


export const Home: React.FC = () => {
  const { setQuickViewProduct } = useAtelier();
  const { navigate } = useNavigation();
  const { allProducts } = useProducts();
  /**
   * ------------------------------------------------------------
   * QUICK VIEW
   * ------------------------------------------------------------
   */
  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };


  return (
    <div className="w-full">
      {/* ======================================================
          1. FULL-SCREEN CINEMATIC HERO
      ====================================================== */}
      <HeroVideo
        onExploreClick={() => navigate("/shop?category=WOMEN")}
        onShopClick={() => navigate("/shop?category=MEN")}
      />

      {/* ======================================================
          2. BRAND INTRODUCTION / OUR STORY
      ====================================================== */}
      <BrandStory
        onDiscoverClick={() => navigate("/about")}
      />

      {/* ======================================================
          3. FEATURED PRODUCTS
      ====================================================== */}
      <FeaturedSection
        products={allProducts}
        onQuickView={handleQuickView}
        onShopClick={() => navigate("/shop")}
      />

      {/* ======================================================
          4. COLLECTIONS
      ====================================================== */}
      <Collections
        onSelectCollection={() => navigate("/shop")}
      />

      {/* ======================================================
          5. EDITORIAL MOSAIC
      ====================================================== */}
      <EditorialMosaic
        onExploreMosaic={() => navigate("/shop")}
      />

      {/* ======================================================
          6. WHY CHOOSE US
      ====================================================== */}
      <WhyChooseUs />

      {/* ======================================================
          7. BEST SELLERS
      ====================================================== */}
      <BestSellersSection
        onQuickView={handleQuickView}
      />

      {/* ======================================================
          8. INSTAGRAM / SOCIAL
      ====================================================== */}
      <InstagramGallery />

      {/* ======================================================
          9. TESTIMONIALS
      ====================================================== */}
      <Testimonials />

      {/* ======================================================
          10. NEWSLETTER
      ====================================================== */}
      <Newsletter />
    </div>
  );
};

export default Home;