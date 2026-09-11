// frontend/src/components/InstagramGallery.tsx

import React, { useEffect, useState } from "react";
import { Instagram, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { INSTAGRAM_POSTS } from "../data/collections";

export const InstagramGallery: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);

  // Responsive number of visible images
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(4);
      } else if (window.innerWidth >= 640) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };

    updateItemsPerView();

    window.addEventListener("resize", updateItemsPerView);

    return () => {
      window.removeEventListener("resize", updateItemsPerView);
    };
  }, []);

  const maxSlide = Math.max(0, INSTAGRAM_POSTS.length - itemsPerView);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
  };

  const previousSlide = () => {
    setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1));
  };

  // Keep current slide valid when viewport changes
  useEffect(() => {
    if (currentSlide > maxSlide) {
      setCurrentSlide(maxSlide);
    }
  }, [currentSlide, maxSlide]);

  // Auto slide
  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
    }, 4500);

    return () => {
      window.clearInterval(interval);
    };
  }, [maxSlide]);

  const slidePercentage = 100 / itemsPerView;

  return (
    <section className="py-20 sm:py-28 bg-[#0A0A0A] relative border-b border-[#1C1C1C] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        <SectionHeading
          label="SOCIAL ATELIER"
          title="FOLLOW THE JOURNEY"
          subtitle="Behind the scenes, runway captures, and couture fittings. Follow @nigah.official"
          align="center"
        />

        {/* Slider Wrapper */}
        <div className="relative">
          {/* Previous Button */}
          <button
            type="button"
            onClick={previousSlide}
            aria-label="Previous Instagram posts"
            className="
              absolute
              left-0
              sm:-left-6
              lg:-left-10
              top-1/2
              -translate-y-1/2
              z-20
              w-9
              h-9
              sm:w-10
              sm:h-10
              flex
              items-center
              justify-center
              text-[#A1A1AA]
              hover:text-[#C9A24D]
              transition-all
              duration-300
              hover:scale-110
              active:scale-90
              bg-[#0A0A0A]/70
              backdrop-blur-sm
              rounded-full
            "
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={1.2} />
          </button>

          {/* Slider */}
          <div className="overflow-hidden">
            <div
              className="
                flex
                transition-transform
                duration-700
                ease-[cubic-bezier(0.22,1,0.36,1)]
                will-change-transform
              "
              style={{
                transform: `translateX(-${currentSlide * slidePercentage}%)`,
              }}
            >
              {INSTAGRAM_POSTS.map((post) => (
                <div
                  key={post.id}
                  className="
                    shrink-0
                    px-1.5
                    sm:px-2
                  "
                  style={{
                    width: `${slidePercentage}%`,
                  }}
                >
                  <div
                    className="
                      group
                      relative
                      aspect-square
                      overflow-hidden
                      border
                      border-[#222]
                      bg-[#141414]
                      cursor-pointer
                    "
                  >
                    <img
                      src={post.image}
                      alt={post.caption}
                      className="
                        w-full
                        h-full
                        object-cover
                        object-center
                        transform
                        transition-transform
                        duration-700
                        ease-out
                        group-hover:scale-110
                      "
                      loading="lazy"
                    />

                    {/* Dark Overlay on Hover */}
                    <div
                      className="
                        absolute
                        inset-0
                        bg-[#0A0A0A]/75
                        opacity-0
                        group-hover:opacity-100
                        transition-opacity
                        duration-300
                        flex
                        flex-col
                        items-center
                        justify-center
                        p-4
                        text-center
                      "
                    >
                      <div
                        className="
                          w-9
                          h-9
                          rounded-full
                          border
                          border-[#C9A24D]
                          flex
                          items-center
                          justify-center
                          text-[#C9A24D]
                          mb-2
                          transform
                          scale-75
                          group-hover:scale-100
                          transition-transform
                          duration-300
                        "
                      >
                        <Instagram className="w-4 h-4 stroke-[1.5]" />
                      </div>

                      <span
                        className="
                          text-[10px]
                          tracking-[0.2em]
                          text-[#F5F2EA]
                          font-medium
                          block
                        "
                      >
                        {post.tag}
                      </span>

                      <p
                        className="
                          text-[9px]
                          text-[#A1A1AA]
                          font-light
                          line-clamp-2
                          mt-1
                          tracking-wider
                        "
                      >
                        {post.caption}
                      </p>
                    </div>

                    {/* Subtle Gold Edge on Hover */}
                    <div
                      className="
                        absolute
                        inset-0
                        border
                        border-[#C9A24D]/0
                        group-hover:border-[#C9A24D]/60
                        transition-colors
                        pointer-events-none
                      "
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next Instagram posts"
            className="
              absolute
              right-0
              sm:-right-6
              lg:-right-10
              top-1/2
              -translate-y-1/2
              z-20
              w-9
              h-9
              sm:w-10
              sm:h-10
              flex
              items-center
              justify-center
              text-[#A1A1AA]
              hover:text-[#C9A24D]
              transition-all
              duration-300
              hover:scale-110
              active:scale-90
              bg-[#0A0A0A]/70
              backdrop-blur-sm
              rounded-full
            "
          >
            <ChevronRight className="w-5 h-5" strokeWidth={1.2} />
          </button>
        </div>

        {/* Slider Indicators */}
        <div className="flex justify-center items-center gap-2 mt-6">
          {Array.from({ length: maxSlide + 1 }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`
                  rounded-full
                  transition-all
                  duration-500
                  ${
                    currentSlide === index
                      ? "w-2 h-2 bg-[#C9A24D] scale-100"
                      : "w-1.5 h-1.5 bg-[#555] hover:bg-[#888]"
                  }
                `}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
