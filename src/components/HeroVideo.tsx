import React, { useEffect, useRef } from 'react';
import { animateHeroEntrance } from '../utils/animations';
import heroVideo from '../assets/aa.mp4';
interface HeroVideoProps {
  onExploreClick: () => void;
  onShopClick: () => void;
}
export const HeroVideo: React.FC<HeroVideoProps> = ({ onExploreClick, onShopClick }) => {
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  // Bulletproof video autoplay initialization across all mobile and desktop browsers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Direct property assignments for iOS Safari and Android Chrome compliance
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    const playVideo = () => {
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {
          // If browser policy delays autoplay, start immediately on first interaction
          const unlockPlay = () => {
            video.play().catch(() => {});
            window.removeEventListener('touchstart', unlockPlay);
            window.removeEventListener('click', unlockPlay);
            window.removeEventListener('scroll', unlockPlay);
          };

          window.addEventListener('touchstart', unlockPlay, { passive: true, once: true });
          window.addEventListener('click', unlockPlay, { passive: true, once: true });
          window.addEventListener('scroll', unlockPlay, { passive: true, once: true });
        });
      }
    };

    playVideo();

    // Subtle entrance animation for typography and buttons
    const tl = animateHeroEntrance({
      label: null,
      heading: headingRef.current,
      description: descRef.current,
      buttons: buttonsRef.current,
      goldLine: null,
      scrollIndicator: null,
      videoBg: null,
    });

    return () => {
      tl.kill();
    };
  }, []);


  return (
    <section
  id="hero"
  className="relative w-full min-h-svh flex items-center justify-center overflow-hidden select-none px-4 sm:px-6 lg:px-12 pt-20 pb-12"
>
  {/* Background Video */}
  <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
    <video
      ref={videoRef}
      src={heroVideo}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      disablePictureInPicture
      className="absolute inset-0 w-full h-full object-cover object-center"
    />
  </div>
</section>
  );
};
