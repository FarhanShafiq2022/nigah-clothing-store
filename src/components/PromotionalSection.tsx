import React, { useEffect, useRef } from 'react';
import { ArrowRight, Gem } from 'lucide-react';
import gsap from 'gsap';

interface PromotionalSectionProps {
  onShopBlackLabel?: () => void;
}

export const PromotionalSection: React.FC<PromotionalSectionProps> = ({ onShopBlackLabel }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.18,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-20 sm:py-28 bg-[#0E0E0E] relative overflow-hidden border-b border-[#1C1C1C]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-[#262626] bg-[#0A0A0A]">
          {/* One Side: Luxury Fashion Image */}
          <div
            ref={imageRef}
            className="lg:col-span-6 relative aspect-4/5 sm:aspect-square lg:aspect-auto min-h-105 sm:min-h-125 overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85"
              alt="Zarqash Black Label"
              className="w-full h-full object-cover object-center transform transition-transform duration-1000 hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#0A0A0A] via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-6 left-6 border border-[#C9A24D]/40 bg-[#0A0A0A]/85 backdrop-blur-md px-4 py-2">
              <span className="text-[10px] tracking-[0.3em] text-[#C9A24D] uppercase font-medium">
                THE SARTORIAL SUITE
              </span>
            </div>
          </div>

          {/* Other Side: Black Label Editorial Block */}
          <div
            ref={contentRef}
            className="lg:col-span-6 p-8 sm:p-12 lg:p-16 flex flex-col justify-center items-start space-y-6"
          >
            <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.35em] text-[#C9A24D] uppercase font-semibold">
              <Gem className="w-3.5 h-3.5" />
              <span>PRIVATE CAPSULE</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#F5F2EA] font-normal tracking-wide leading-tight">
              BLACK LABEL
            </h2>

            <div className="w-16 h-px bg-[#C9A24D]" />

            <blockquote className="font-serif text-xl sm:text-2xl text-[#E0C27A] italic font-light">
              “Elevated essentials for everyday confidence.”
            </blockquote>

            <p className="text-xs sm:text-sm text-[#A1A1AA] font-light leading-relaxed tracking-wider max-w-md">
              A private collection crafted for discerning patrons. We combined tropical lightweight cashmere, hand-twisted silk linings, and matte gold hardware to create bespoke bandhgalas and structured capes that bridge heritage ceremonies and cosmopolitan evenings.
            </p>

            <div className="pt-2 flex items-center space-x-6">
              <button
                id="shop-black-label-cta"
                onClick={onShopBlackLabel}
                className="group inline-flex items-center space-x-3 px-8 py-4 bg-[#C9A24D] text-[#0A0A0A] text-xs tracking-[0.25em] font-medium uppercase hover:bg-[#E0C27A] hover:shadow-[0_0_25px_rgba(201,162,77,0.3)] transition-all duration-300 cursor-pointer"
              >
                <span>SHOP BLACK LABEL</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
