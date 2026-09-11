import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/**
 * Reusable entrance animation for Hero section elements
 */
export const animateHeroEntrance = (targets: {
  label: HTMLElement | null;
  heading: HTMLElement | null;
  description: HTMLElement | null;
  buttons: HTMLElement | null;
  goldLine: HTMLElement | null;
  scrollIndicator: HTMLElement | null;
  videoBg: HTMLElement | null;
}) => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  if (targets.videoBg) {
    gsap.fromTo(
      targets.videoBg,
      { scale: 1.15, opacity: 0.8 },
      { scale: 1, opacity: 1, duration: 2.4, ease: 'power2.out' }
    );
  }

  if (targets.label) {
    tl.fromTo(
      targets.label,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.9 },
      0.3
    );
  }

  if (targets.heading) {
    tl.fromTo(
      targets.heading,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2 },
      0.5
    );
  }

  if (targets.description) {
    tl.fromTo(
      targets.description,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 1 },
      0.8
    );
  }

  if (targets.buttons) {
    tl.fromTo(
      targets.buttons,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.9 },
      1.0
    );
  }

  if (targets.goldLine) {
    tl.fromTo(
      targets.goldLine,
      { scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 1, duration: 1.1, ease: 'power2.inOut' },
      1.1
    );
  }

  if (targets.scrollIndicator) {
    tl.fromTo(
      targets.scrollIndicator,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.8 },
      1.3
    );
  }

  return tl;
};

/**
 * ScrollTrigger based Hero transition on scroll
 */
export const initHeroScrollTrigger = (heroContainer: HTMLElement, heroContent: HTMLElement, heroBg: HTMLElement) => {
  return ScrollTrigger.create({
    trigger: heroContainer,
    start: 'top top',
    end: 'bottom top',
    scrub: 0.6,
    onUpdate: (self) => {
      const progress = self.progress;
      if (heroContent) {
        gsap.set(heroContent, {
          y: -120 * progress,
          opacity: 1 - progress * 1.2
        });
      }
      if (heroBg) {
        gsap.set(heroBg, {
          scale: 1 + progress * 0.12,
          filter: `brightness(${Math.max(0.4, 1 - progress * 0.6)})`
        });
      }
    }
  });
};

/**
 * Reveal animation for luxury sections on scroll
 */
export const initSectionReveal = (section: HTMLElement, childrenSelector?: string) => {
  const elements = childrenSelector ? section.querySelectorAll(childrenSelector) : [section];
  return gsap.fromTo(
    elements,
    { opacity: 0, y: 45 },
    {
      opacity: 1,
      y: 0,
      duration: 1.1,
      stagger: 0.18,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 82%',
        toggleActions: 'play none none none'
      }
    }
  );
};

/**
 * Luxury drawing line effect for gold dividers
 */
export const initGoldLineDraw = (lineElement: HTMLElement) => {
  return gsap.fromTo(
    lineElement,
    { scaleX: 0, transformOrigin: 'left center' },
    {
      scaleX: 1,
      duration: 1.4,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: lineElement,
        start: 'top 88%',
        toggleActions: 'play none none none'
      }
    }
  );
};
