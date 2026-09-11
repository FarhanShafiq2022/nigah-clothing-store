import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { TESTIMONIALS } from '../data/collections';

export const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[activeIndex];

  return (
    <section className="py-24 sm:py-32 bg-[#0E0E0E] relative border-b border-[#1C1C1C]">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-14">
        <SectionHeading
          label="PATRON PRAISE"
          title="WHAT THEY SAY"
          subtitle="Reflections from our international clientele on the tactile feel of our atelier pieces."
          align="center"
        />

        {/* Editorial Testimonial Showcase */}
        <div className="relative mt-8 p-8 sm:p-14 bg-[#0A0A0A] border border-[#242424] overflow-hidden">
          {/* Decorative faint background quote watermark */}
          <Quote className="absolute -bottom-10 -right-6 w-48 h-48 text-[#161616] stroke-[0.8] pointer-events-none opacity-40" />

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* 5-Star Gold Rating */}
            <div className="flex items-center space-x-1.5 mb-8 text-[#C9A24D]">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current stroke-none" />
              ))}
            </div>

            {/* Testimonial Quote */}
            <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F5F2EA] font-normal leading-relaxed sm:leading-snug max-w-3xl italic tracking-wide">
              “{current.comment}”
            </blockquote>

            {/* Gold Divider */}
            <div className="w-12 h-px bg-[#C9A24D] my-8" />

            {/* Patron Credentials */}
            <div className="flex flex-col items-center">
              <span className="font-serif text-lg text-[#E0C27A] font-medium tracking-wider">
                {current.name}
              </span>
              <span className="text-[11px] text-[#888] tracking-[0.25em] uppercase font-light mt-1">
                {current.location}
              </span>
              <span className="mt-3 text-[10px] tracking-[0.2em] uppercase text-[#C9A24D] px-3 py-1 border border-[#C9A24D]/30 bg-[#141414]">
                ACQUIRED: {current.itemPurchased}
              </span>
            </div>

            {/* Editorial Navigation Arrows & Indicator Dots */}
            <div className="mt-10 flex items-center space-x-6">
              <button
                id="testimonial-prev-btn"
                onClick={handlePrev}
                aria-label="Previous Review"
                className="w-10 h-10 flex items-center justify-center border border-[#2E2E2E] text-[#A1A1AA] hover:text-[#C9A24D] hover:border-[#C9A24D] transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 stroke-[1.5]" />
              </button>
              <div className="flex items-center space-x-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-0.5 transition-all duration-300 cursor-pointer ${
                      activeIndex === i ? 'w-8 bg-[#C9A24D]' : 'w-4 bg-[#333]'
                    }`}
                  />
                ))}
              </div>
              <button
                id="testimonial-next-btn"
                onClick={handleNext}
                aria-label="Next Review"
                className="w-10 h-10 flex items-center justify-center border border-[#2E2E2E] text-[#A1A1AA] hover:text-[#C9A24D] hover:border-[#C9A24D] transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
