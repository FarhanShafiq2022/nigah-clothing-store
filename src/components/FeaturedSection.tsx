import React, { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Product } from "../types";
import clip1 from "../assets/cc.mp4";
import { SectionHeading } from "../components/SectionHeading";
import { ProductGrid } from "../components/ProductGrid";
import { useProducts } from "../hooks/useProducts";
import { useAtelier } from "../context/AtelierContext";

interface FeaturedSectionProps {
   products: Product[];
  onQuickView: (product: Product) => void;
  onShopClick: () => void;
}

export const FeaturedSection: React.FC<
  FeaturedSectionProps
> = ({
  products,
  onQuickView,
  onShopClick,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { allProducts } = useProducts();
  /**
   * ------------------------------------------------------------
   * VIDEO AUTOPLAY
   * ------------------------------------------------------------
   * Handles autoplay compatibility for:
   * - iOS Safari
   * - Android Chrome
   * - Desktop browsers
   */
const { setQuickViewProduct } = useAtelier();
  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };
  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const playVideo = () => {
      const promise = video.play();

      if (promise !== undefined) {
        promise.catch(() => {
          const unlockPlay = () => {
            video.play().catch(() => {});

            window.removeEventListener(
              "touchstart",
              unlockPlay
            );

            window.removeEventListener(
              "click",
              unlockPlay
            );

            window.removeEventListener(
              "scroll",
              unlockPlay
            );
          };

          window.addEventListener(
            "touchstart",
            unlockPlay,
            {
              passive: true,
              once: true,
            }
          );

          window.addEventListener(
            "click",
            unlockPlay,
            {
              passive: true,
              once: true,
            }
          );

          window.addEventListener(
            "scroll",
            unlockPlay,
            {
              passive: true,
              once: true,
            }
          );
        });
      }
    };

    playVideo();

    return () => {
      window.removeEventListener(
        "touchstart",
        playVideo
      );

      window.removeEventListener(
        "click",
        playVideo
      );

      window.removeEventListener(
        "scroll",
        playVideo
      );
    };
  }, []);

  const featuredProducts = products.slice(0, 8);

  return (
    <section
      id="featured"
      className="
        home-panels
        relative
        isolate
        w-full
        min-h-svh
        overflow-hidden
        border-b
        border-[#1C1C1C]
        py-10
        sm:py-24
        lg:py-10
        xl:py-10
      "
    >
      {/* ======================================================
          BACKGROUND VIDEO
      ====================================================== */}
      <div className="absolute inset-0 h-full w-full">
        <video
          ref={videoRef}
          src={clip1}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
          "
        />
      </div>

      {/* ======================================================
          OPTIONAL DARK OVERLAY
          Keeps text/products readable over the video.
      ====================================================== */}
      <div
        className="
          absolute
          inset-0
          z-10
          bg-black/20
        "
        aria-hidden="true"
      />

      {/* ======================================================
          CONTENT
      ====================================================== */}
      <div
        className="
          relative
          z-20
          mx-auto
          max-w-7xl
          px-6
          sm:px-10
          lg:px-14
        "
      >
        {/* SECTION HEADING */}
        <SectionHeading
          label="LATEST NIGAH EDIT"
          title="CURATED FOR YOU"
          subtitle="Explore the newest silhouettes, printed eastern sets, and signature pieces from our collection."
          align="center"
        />

        {/* PRODUCT GRID */}
        <ProductGrid
          products={featuredProducts}
          onQuickView={onQuickView}
          gridColumns={4}
        />

        {/* ====================================================
            SHOP CTA
        ==================================================== */}
        <div className="mt-14 text-center">
          <button
            type="button"
            onClick={onShopClick}
            className="
              inline-flex
              cursor-pointer
              items-center
              space-x-3
              border
              border-[#C9A24D]/40
              bg-[#111]
              px-8
              py-3.5
              text-xs
              font-medium
              uppercase
              tracking-[0.25em]
              text-[#C9A24D]
              shadow-xl
              transition-all
              duration-300
              hover:border-[#C9A24D]
              hover:bg-[#C9A24D]
              hover:text-[#0A0A0A]
            "
          >
            <span>
              EXPLORE COMPLETE ATELIER SHOP (
              {products.length} PIECES)
            </span>

            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;