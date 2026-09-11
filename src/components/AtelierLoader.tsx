import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, X } from 'lucide-react';
import { NigahLogo } from './NigahLogo';

interface AtelierLoaderProps {
  onComplete?: () => void;
  forceShow?: boolean;
}

const ATELIER_MESSAGES = [
  'Selecting 80g Mulberry Raw Silk & Gold Zari...',
  'Hand-Engraving Signature Botanical Motifs...',
  'Curating Winter Velvet & Festive Pret Edits...',
  'Calibrating Bespoke Silhouette Measurements...',
  'Welcome to the House of Nigah',
];

export const AtelierLoader: React.FC<AtelierLoaderProps> = ({ onComplete, forceShow = false }) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

// frontend/src/components/Intro.tsx

useEffect(() => {
  // Check if intro has already been shown in this browser session
  const hasSeenIntro = sessionStorage.getItem('nigah_intro_seen');

  if (hasSeenIntro === 'true') {
    setIsDismissed(true);
    onComplete?.();
    return;
  }

  const startTime = Date.now();
  const duration = 2200;

  const interval = setInterval(() => {
    const elapsed = Date.now() - startTime;

    const currentProgress = Math.min(
      100,
      Math.round((elapsed / duration) * 100)
    );

    setProgress(currentProgress);

    if (currentProgress < 25) {
      setMessageIndex(0);
    } else if (currentProgress < 50) {
      setMessageIndex(1);
    } else if (currentProgress < 75) {
      setMessageIndex(2);
    } else if (currentProgress < 98) {
      setMessageIndex(3);
    } else {
      setMessageIndex(4);
    }

    if (currentProgress >= 100) {
      clearInterval(interval);

      setIsReady(true);

      setTimeout(() => {
        handleEnter();
      }, 650);
    }
  }, 28);

  return () => clearInterval(interval);
}, []);

  const handleEnter = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('nigah_intro_seen', 'true');
    }
    setIsDismissed(true);
    if (onComplete) {
      setTimeout(onComplete, 450);
    }
  };

  if (isDismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      {!isDismissed && (
        <motion.div
          id="atelier-loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03, filter: 'blur(10px)' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-99999 bg-[#0A0A0A] text-[#F5F2EA] flex flex-col justify-between p-6 sm:p-12 select-none overflow-hidden"
        >
          {/* Ambient Gold Radial Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 sm:w-175 h-125 sm:h-175 bg-[radial-gradient(ellipse_at_center,rgba(201,162,77,0.12)_0%,rgba(10,10,10,0)_70%)] pointer-events-none" />
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-[radial-gradient(ellipse_at_center,rgba(224,194,122,0.06)_0%,rgba(10,10,10,0)_70%)] pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-[radial-gradient(ellipse_at_center,rgba(201,162,77,0.06)_0%,rgba(10,10,10,0)_70%)] pointer-events-none" />

          {/* Architectural Corner Framing Accents */}
          <div className="absolute top-6 left-6 w-10 h-10 border-t border-l border-[#C9A24D]/30 pointer-events-none" />
          <div className="absolute top-6 right-6 w-10 h-10 border-t border-r border-[#C9A24D]/30 pointer-events-none" />
          <div className="absolute bottom-6 left-6 w-10 h-10 border-b border-l border-[#C9A24D]/30 pointer-events-none" />
          <div className="absolute bottom-6 right-6 w-10 h-10 border-b border-r border-[#C9A24D]/30 pointer-events-none" />

          {/* Top Bar: Subtitle & Skip Button */}
          <div className="relative z-10 flex items-center justify-between w-full max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 text-[10px] tracking-[0.3em] uppercase text-[#C9A24D] font-light">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24D] animate-ping inline-block" />
              <span>PRIVATE SALON ENTRANCE</span>
            </div>

            <button
              onClick={handleEnter}
              className="group flex items-center space-x-1.5 text-[10px] sm:text-xs tracking-[0.25em] text-[#888888] hover:text-[#E0C27A] transition-colors uppercase font-light cursor-pointer px-3 py-1.5 rounded-full hover:bg-white/5 border border-transparent hover:border-[#C9A24D]/25"
            >
              <span>Skip Intro</span>
              <X className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>

          {/* Central Luxury Emblem Showcase */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto py-8">
            {/* Pulsing Halo & Botanical Logo Emblem */}
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-6 sm:mb-8"
            >
              {/* Outer Golden Glow Ring */}
              <div className="absolute -inset-4 sm:-inset-6 rounded-full border border-[#C9A24D]/20 animate-[spin_30s_linear_infinite]" />
              <div className="absolute -inset-1 sm:-inset-2 rounded-full border border-[#C9A24D]/40 animate-pulse" />

              {/* Logo Emblem Container */}
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-[#111111]/90 border border-[#C9A24D]/40 shadow-[0_0_50px_rgba(201,162,77,0.22)] flex items-center justify-center p-3 backdrop-blur-md">
                <NigahLogo className="w-16 h-16 sm:w-20 sm:h-20" showText={false} />
              </div>
            </motion.div>

            {/* Brand Titles */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7 }}
              className="space-y-2"
            >
              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F5F2EA] font-normal tracking-[0.25em] sm:tracking-[0.3em] uppercase leading-tight">
                NIGAH
              </h1>
              <div className="flex items-center justify-center space-x-3 text-xs sm:text-sm tracking-[0.4em] sm:tracking-[0.45em] text-[#C9A24D] uppercase font-light">
                <span>CLOTHES STORE</span>
                <span className="text-[#666]">•</span>
                <span>HAUTE ATELIER</span>
              </div>
            </motion.div>

            {/* Interactive Enter Button when Ready or dynamic progress trigger */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-8 sm:mt-10"
            >
              {isReady ? (
                <button
                  onClick={handleEnter}
                  className="group px-8 py-3.5 bg-linear-to-r from-[#C9A24D] to-[#E0C27A] text-[#0A0A0A] font-sans text-xs tracking-[0.25em] uppercase font-medium hover:brightness-110 shadow-[0_0_25px_rgba(201,162,77,0.4)] flex items-center space-x-3 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer rounded-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#0A0A0A]" />
                  <span>STEP INTO THE ATELIER</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              ) : (
                <p className="text-[11px] sm:text-xs text-[#A1A1AA] font-light tracking-[0.25em] uppercase h-5 transition-all duration-300">
                  {ATELIER_MESSAGES[messageIndex]}
                </p>
              )}
            </motion.div>
          </div>

          {/* Bottom Bar: Ultra-Thin Progress Bar & Percentage */}
          <div className="relative z-10 w-full max-w-xl mx-auto space-y-3">
            <div className="flex items-center justify-between text-[10px] sm:text-[11px] tracking-[0.25em] text-[#888888] font-mono">
              <span className="uppercase text-[#C9A24D]">EXPERIENCE INITIALIZATION</span>
              <span className="text-[#E0C27A] font-medium">{progress}%</span>
            </div>

            {/* Progress Track */}
            <div className="w-full h-0.5 bg-[#222222] relative overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-linear-to-r from-[#C9A24D] via-[#DFBA50] to-[#F5F2EA] relative"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.1 }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#FFFFFF] shadow-[0_0_10px_#C9A24D]" />
              </motion.div>
            </div>

            <div className="flex justify-between items-center text-[9px] tracking-[0.3em] text-[#555555] uppercase pt-1 font-light">
              <span>LAHORE • LONDON • DUBAI</span>
              <span>AUTUMN / WINTER 2025–2026</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
