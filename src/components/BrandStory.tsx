import React, { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import clip2 from "../assets/bb.mp4";
import Ourstoryimage from "../assets/images/story.webp";
interface BrandStoryProps {
  onDiscoverClick?: () => void;
}

export const BrandStory: React.FC<BrandStoryProps> = ({ onDiscoverClick }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Direct property assignments for iOS Safari and Android Chrome compliance
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const playVideo = () => {
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {
          // If browser policy delays autoplay, start immediately on first interaction
          const unlockPlay = () => {
            video.play().catch(() => {});
            window.removeEventListener("touchstart", unlockPlay);
            window.removeEventListener("click", unlockPlay);
            window.removeEventListener("scroll", unlockPlay);
          };

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
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // ScrollTrigger for image reveal
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      // ScrollTrigger for text content
      if (textRef.current) {
        gsap.fromTo(
          textRef.current.children,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      // ScrollTrigger for gold line drawing
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: lineRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="
    relative
    w-full
    min-h-svh
    overflow-hidden
    border-b border-[#1C1C1C]
    py-10
    sm:py-24
    lg:py-10
    xl:py-10
  "
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          src={clip2}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          className="
        absolute
        left-1/2
        top-1/2
        h-full
        w-full
        min-h-full
        min-w-full
        -translate-x-1/2
        -translate-y-1/2
        object-cover
        object-center
        scale-[1.02]
        sm:scale-[1.01]
        lg:scale-100
      "
        />
      </div>

      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#C9A24D]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left: Asymmetric Fashion Image */}
          <div ref={imageRef} className="lg:col-span-6 relative">
            <div className="relative group overflow-hidden border border-[#222]">
              {/* Outer gold decorative corner brackets */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#C9A24D]/50 z-20 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#C9A24D]/50 z-20 pointer-events-none" />

              <div className="relative aspect-3/4 w-full overflow-hidden bg-[#141414]">
                <img
                  src={Ourstoryimage}
                  alt="Zarqash Atelier Tailoring"
                  className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0A0A0A] via-transparent to-transparent opacity-60" />
              </div>

              {/* Floating micro editorial badge */}
              <div className="absolute bottom-6 left-6 z-20 bg-[#0E0E0E]/90 backdrop-blur-md border border-[#C9A24D]/30 py-2.5 px-4">
                <span className="text-[10px] tracking-[0.25em] text-[#C9A24D] uppercase font-medium">
                  LAHORE ATELIER — EST. 2024
                </span>
              </div>
            </div>
          </div>

          {/* Right: Luxury Editorial Narrative */}
          <div
            ref={textRef}
            className="lg:col-span-6 flex flex-col items-start space-y-6"
          >
            <div className="flex items-center space-x-3">
              <span className="h-px w-8 bg-[#C9A24D]" />
              <span className="text-xs tracking-[0.35em] text-[#C9A24D] font-medium uppercase">
                OUR STORY
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#F5F2EA] font-normal leading-[1.12] tracking-wide">
              Designed for those who define their own style.
            </h2>

            {/* Self-drawing gold line */}
            <div
              ref={lineRef}
              className="w-full h-px bg-linear-to-r from-[#C9A24D] via-[#C9A24D]/30 to-transparent my-2"
            />

            <p className="text-sm sm:text-base text-[#D4D4D8] font-light leading-relaxed tracking-wide">
              At Nigah Clothes Store, clothing transcends the transient rhythm
              of fast fashion. We believe couture is identity, heritage, and
              uncompromising poise. Inspired by the royal courts of Lahore and
              contemporary global architecture, our artisans handcraft garments
              that balance generational tilla and marori needlework with
              razor-sharp modern tailoring.
            </p>

            <p className="text-xs sm:text-sm text-[#8E8E8E] font-light leading-relaxed tracking-wide">
              Each garment begins in our private atelier — sculpted in limited
              runs using pure mulberries, raw silk weaves, and bespoke metallic
              crests to ensure each patron commands an unmistakable silhouette.
            </p>

            <div className="pt-4 flex items-center space-x-6">
              <button
                id="discover-story-cta"
                onClick={onDiscoverClick}
                className="group inline-flex items-center space-x-3 px-8 py-4 bg-[#C9A24D] text-[#0A0A0A] text-xs tracking-[0.25em] font-medium uppercase hover:bg-[#E0C27A] hover:shadow-[0_0_25px_rgba(201,162,77,0.3)] transition-all duration-300 cursor-pointer"
              >
                <span>DISCOVER OUR STORY</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
