import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SectionHeading } from './SectionHeading';
import { CollectionCard } from './CollectionCard';
import { COLLECTIONS } from '../data/collections';
import collectionclip from "../assets/dd.mp4"
interface CollectionsProps {
  onSelectCollection: (id: string) => void;
}

export const Collections: React.FC<CollectionsProps> = ({ onSelectCollection }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
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
    if (!containerRef.current || !gridRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current!.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="collections"
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
      " >
{/* ======================================================
          BACKGROUND VIDEO
      ====================================================== */}
      <div className="absolute inset-0 h-full w-full">
        <video
          ref={videoRef}
          src={collectionclip}
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
          label="CURATED EDITIONS"
          title="EXPLORE COLLECTIONS"
          subtitle="Timeless silhouettes for every expression, crafted in purest silks and hand-worked metallics."
          align="center"
        />

        {/* Collections Grid: Responsive 4-card layout */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {COLLECTIONS.map((col, idx) => (
            <CollectionCard
              key={col.id}
              collection={col}
              index={idx}
              onExplore={onSelectCollection}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
