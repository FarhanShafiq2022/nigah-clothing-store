import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

      // Show when scrolled beyond 220px
      if (currentScrollY > 220) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Calculate progress percentage
      if (scrollHeight > 0) {
        const progress = Math.min(100, Math.max(0, (currentScrollY / scrollHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial scroll position
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    try {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      if (document.documentElement) {
        document.documentElement.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    } catch {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  };

  // Circular progress calculations (Radius = 18, circumference = 2 * PI * 18 ≈ 113.1)
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-5 sm:bottom-8 sm:right-8 z-40"
        >
          <button
            onClick={handleScrollToTop}
            id="go-to-top-button"
            aria-label="Scroll to top of page"
            className="group relative w-12 h-12 rounded-full bg-[#111111]/95 text-[#F5F2EA] hover:text-[#0A0A0A] backdrop-blur-md border border-[#C9A24D]/35 hover:border-[#E0C27A] shadow-[0_4px_24px_rgba(0,0,0,0.6),0_0_12px_rgba(201,162,77,0.2)] flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer overflow-hidden"
          >
            {/* Ambient gold hover background fill */}
            <div className="absolute inset-0 bg-linear-to-tr from-[#C9A24D] via-[#DFBA50] to-[#E5C77A] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />

            {/* Circular Scroll Progress Bar */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5"
              viewBox="0 0 44 44"
            >
              {/* Background Track */}
              <circle
                cx="22"
                cy="22"
                r={radius}
                className="stroke-[#222222] group-hover:stroke-black/20"
                strokeWidth="2"
                fill="none"
              />
              {/* Animated Progress Indicator */}
              <circle
                cx="22"
                cy="22"
                r={radius}
                className="stroke-[#C9A24D] group-hover:stroke-[#0A0A0A] transition-all duration-150"
                strokeWidth="2.5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            {/* Centered Chevron Icon */}
            <ChevronUp className="relative z-10 w-5 h-5 stroke-[2.2] transition-transform duration-300 group-hover:-translate-y-0.5" />

            {/* Tooltip on hover (desktop only) */}
            <span className="hidden sm:block absolute -top-8 px-2 py-0.5 rounded bg-[#0A0A0A]/90 border border-[#C9A24D]/30 text-[9px] font-sans tracking-widest text-[#E0C27A] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg">
              Top
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
