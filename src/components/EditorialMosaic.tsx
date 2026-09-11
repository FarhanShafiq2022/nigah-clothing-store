import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { SectionHeading } from "./SectionHeading";
import { ArrowUpRight } from "lucide-react";

// ============================================================
// IMAGE IMPORTS
// ============================================================
import editorialclip from "../assets/ee.mp4";
import editorial1 from "../assets/images/1000211349.jpg";
import editorial2 from "../assets/images/1000211359.jpg";
import editorial3 from "../assets/images/1000211350.jpg";

interface EditorialMosaicProps {
  onExploreMosaic?: () => void;
}

export const EditorialMosaic: React.FC<EditorialMosaicProps> = ({
  onExploreMosaic,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mosaicRef = useRef<HTMLDivElement>(null);
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
    if (!containerRef.current || !mosaicRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        mosaicRef.current!.children,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: mosaicRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="mosaic"
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
      "
    >
      <div className="absolute inset-0 h-full w-full">
        <video
          ref={videoRef}
          src={editorialclip}
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
        {/* ============================================================
            SECTION HEADING
        ============================================================ */}

        <SectionHeading
          label="EDITORIAL JOURNAL"
          title="THE ATELIER MOSAIC"
          subtitle="A study in architectural form, tactile drape, and centuries-old metallic craftsmanship."
          align="center"
        />

        {/* ============================================================
            EDITORIAL GRID
        ============================================================ */}

        <div
          ref={mosaicRef}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start"
        >
          {/* ============================================================
              ITEM 1 — TALL VERTICAL FEATURE
          ============================================================ */}

          <div className="md:col-span-5 relative group overflow-hidden border border-[#262626] bg-[#111]">
            <div className="relative aspect-3/4 md:aspect-2/3 w-full overflow-hidden">
              <img
                src={editorial1}
                alt="Editorial Campaign Feature"
                className="w-full h-full object-cover object-center transform transition-transform duration-1000 group-hover:scale-105"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-linear-to-t from-[#0A0A0A] via-black/20 to-transparent" />
            </div>

            {/* Editorial Caption */}
            <div className="absolute bottom-6 left-6 right-6 p-5 bg-[#0A0A0A]/90 backdrop-blur-md border border-[#C9A24D]/30">
              <span className="text-[9px] tracking-[0.3em] uppercase text-[#C9A24D] font-medium block mb-1">
                FIG. 01 — SCULPTED FORM
              </span>

              <h3 className="font-serif text-xl sm:text-2xl text-[#F5F2EA] font-normal">
                Nocturne Drape &amp; Gold Zari
              </h3>

              <p className="text-xs text-[#A1A1AA] font-light mt-1.5 leading-relaxed tracking-wider">
                Raw silk trousers tailored with structural front pleats and
                hand-knotted gold tassels.
              </p>
            </div>
          </div>

          {/* ============================================================
              RIGHT COLUMN
          ============================================================ */}

          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {/* ============================================================
                ITEM 2 — MEDIUM PORTRAIT
            ============================================================ */}

            <div className="relative group overflow-hidden border border-[#262626] bg-[#111]">
              <div className="relative aspect-4/5 w-full overflow-hidden">
                <img
                  src={editorial2}
                  alt="Micro-velvet Details"
                  className="w-full h-full object-cover object-center transform transition-transform duration-1000 group-hover:scale-105"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-linear-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80" />
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[9px] tracking-[0.25em] text-[#C9A24D] uppercase">
                  FIG. 02 — THE ANTIQUE TILLA
                </span>

                <p className="font-serif text-lg text-[#F5F2EA] font-normal">
                  Micro-Velvet Neckline
                </p>
              </div>
            </div>

            {/* ============================================================
                ITEM 3 — ATELIER PHILOSOPHY
            ============================================================ */}

            <div className="flex flex-col justify-between p-8 bg-[#111111] border border-[#C9A24D]/40 relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#C9A24D]/10 rounded-full blur-xl" />

              <div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#C9A24D] font-medium">
                  ATELIER PHILOSOPHY
                </span>

                <div className="font-serif text-2xl sm:text-3xl text-[#F5F2EA] font-light italic mt-4 leading-snug">
                  “Couture is not the accumulation of ornament, but the fierce
                  confidence of restraint.”
                </div>
              </div>

              <div className="pt-8 mt-6 border-t border-[#222]">
                <p className="text-[11px] tracking-[0.2em] text-[#A1A1AA] uppercase">
                  NIGAH DESIGN DIRECTIVE
                </p>

                <p className="text-[10px] text-[#666] tracking-widest mt-1">
                  EDITION 2025/2026
                </p>
              </div>
            </div>

            {/* ============================================================
                ITEM 4 — WIDE LANDSCAPE
            ============================================================ */}

            <div className="sm:col-span-2 relative group overflow-hidden border border-[#262626] bg-[#111]">
              <div className="relative aspect-video w-full overflow-hidden">
                <img
                  src={editorial3}
                  alt="Textile Movement"
                  className="w-full h-full object-cover object-center transform transition-transform duration-1000 group-hover:scale-105"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-linear-to-t from-[#0A0A0A] via-[#0A0A0A]/30 to-transparent opacity-85" />
              </div>

              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[9px] tracking-[0.3em] text-[#C9A24D] uppercase font-medium">
                      FIG. 03 — TACTILE EXPRESSION
                    </span>

                    <h4 className="font-serif text-xl sm:text-2xl text-[#F5F2EA]">
                      Mulberry Silk in Motion
                    </h4>
                  </div>

                  <button
                    onClick={onExploreMosaic}
                    className="hidden sm:inline-flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#C9A24D] uppercase font-medium hover:text-[#E0C27A] transition-colors cursor-pointer"
                  >
                    <span>VIEW ARCHIVE</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialMosaic;
