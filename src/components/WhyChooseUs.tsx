import React, { useEffect, useRef } from 'react';
import { Sparkles, Clock, Crown, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { SectionHeading } from './SectionHeading';
import whyclip from "../assets/ff.mp4"

export const WhyChooseUs: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

/**
   * ------------------------------------------------------------
   * VIDEO AUTOPLAY
   * ------------------------------------------------------------
   * Keeps the background video muted and attempts autoplay
   * across desktop and mobile browsers.
   */
  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const unlockPlay = () => {
      video.play().catch(() => {});
    };

    const playVideo = () => {
      const promise = video.play();

      if (promise !== undefined) {
        promise.catch(() => {
          window.addEventListener("touchstart", unlockPlay, {
            passive: true,
            once: true,
          });

          window.addEventListener("click", unlockPlay, {
            passive: true,
            once: true,
          });

          window.addEventListener("scroll", unlockPlay, {
            passive: true,
            once: true,
          });
        });
      }
    };

    playVideo();

    return () => {
      window.removeEventListener("touchstart", unlockPlay);
      window.removeEventListener("click", unlockPlay);
      window.removeEventListener("scroll", unlockPlay);
    };
  }, []);



  useEffect(() => {
    if (!containerRef.current || !cardsRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current!.children,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const benefits = [
    {
      icon: Sparkles,
      title: 'PREMIUM CRAFTSMANSHIP',
      desc: 'Carefully selected materials and refined finishing. Every raw silk yarn, metallic zari strand, and mother-of-pearl fastener is inspected with couture rigor.'
    },
    {
      icon: Clock,
      title: 'TIMELESS DESIGN',
      desc: 'Designed to remain relevant beyond seasons. We prioritize architectural restraint, clean silhouettes, and enduring beauty over fleeting trends.'
    },
    {
      icon: Crown,
      title: 'AUTHENTIC IDENTITY',
      desc: 'Fashion inspired by rich Subcontinental heritage and modern expression. Celebrating centuries of needlework through contemporary cuts.'
    },
    {
      icon: ShieldCheck,
      title: 'PREMIUM EXPERIENCE',
      desc: 'A seamless shopping experience from discovery to delivery. Complimentary luxury archival box packaging and express concierge tracking.'
    }
  ];

  return (
    <section
      id="why-us"
      ref={containerRef}
      className="
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
      ">
      
      
      {/* ======================================================
          BACKGROUND VIDEO
      ====================================================== */}
      <div className="absolute inset-0 h-full w-full">
        <video
          ref={videoRef}
          src={whyclip}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-hidden="true"
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
          "
        />
      </div>
      
      
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        {/* Section Heading */}
        <SectionHeading
          label="THE NIGAH DISTINCTION"
          title="WHY US"
          subtitle="An uncompromising standard of Pakistani luxury, delivered with international refinement."
          align="center"
        />

        {/* 4 Pillars Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group p-8 sm:p-10 bg-[#0E0E0E] border border-[#1F1F1F] hover:border-[#C9A24D]/60 transition-all duration-500 relative flex flex-col justify-between"
              >
                {/* Top subtle corner accent */}
                <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-transparent group-hover:border-[#C9A24D]/40 transition-colors duration-300" />

                <div>
                  <div className="w-12 h-12 flex items-center justify-center border border-[#C9A24D]/30 bg-[#161616] text-[#C9A24D] mb-8 group-hover:bg-[#C9A24D] group-hover:text-[#0A0A0A] transition-colors duration-500">
                    <Icon className="w-5 h-5 stroke-[1.5]" />
                  </div>

                  <span className="text-[10px] tracking-[0.3em] text-[#C9A24D]/60 font-mono block mb-2">
                    0{idx + 1}
                  </span>

                  <h3 className="font-serif text-lg sm:text-xl text-[#F5F2EA] font-normal tracking-wide group-hover:text-[#E0C27A] transition-colors duration-300">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-xs sm:text-sm text-[#8E8E8E] font-light leading-relaxed tracking-wider group-hover:text-[#A1A1AA] transition-colors duration-300">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#1C1C1C]">
                  <div className="h-px w-0 bg-[#C9A24D] group-hover:w-full transition-all duration-500" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
