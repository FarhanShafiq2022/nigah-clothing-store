import React, { useState } from 'react';
import { Mail, ArrowRight, Check } from 'lucide-react';
import { useAtelier } from '../context/AtelierContext';

export const Newsletter: React.FC = () => {
  const { showToast } = useAtelier();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address');
      return;
    }
    setIsSubmitted(true);
    showToast('Privilege subscription confirmed. Welcome to Nigah Clothes Store.');
    setTimeout(() => {
      setEmail('');
      setIsSubmitted(false);
    }, 4000);
  };

  return (
    <section className="py-24 sm:py-32 bg-[#0A0A0A] relative border-b border-[#1C1C1C] overflow-hidden">
      {/* Subtle gold ambient glow in center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#C9A24D]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 sm:px-10 text-center relative z-10">
        <span className="text-xs tracking-[0.35em] text-[#C9A24D] uppercase font-medium block mb-3">
          PRIVATE ATELIER DISPATCH
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#F5F2EA] font-normal tracking-wide">
          ENTER THE WORLD OF NIGAH
        </h2>
        <p className="mt-4 text-xs sm:text-sm md:text-base text-[#A1A1AA] font-light max-w-xl mx-auto tracking-wider leading-relaxed">
          Be the first to discover new collections, private salon showings, exclusive seasonal drops, and bespoke couture releases.
        </p>

        {/* Email form */}
        <form
          onSubmit={handleSubmit}
          className="mt-10 max-w-lg mx-auto flex flex-col sm:flex-row items-stretch gap-3 sm:gap-0 border border-[#C9A24D]/40 bg-[#111111] p-1.5 focus-within:border-[#C9A24D] focus-within:shadow-[0_0_20px_rgba(201,162,77,0.15)] transition-all duration-300"
        >
          <div className="relative flex-1 flex items-center pl-4">
            <Mail className="w-4 h-4 text-[#888] mr-3 shrink-0" />
            <input
              type="email"
              id="newsletter-email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full bg-transparent text-xs sm:text-sm text-[#F5F2EA] placeholder-[#666] focus:outline-none tracking-wider font-light py-2"
              required
            />
          </div>
          <button
            type="submit"
            id="newsletter-submit-btn"
            disabled={isSubmitted}
            className="px-6 py-3.5 bg-[#C9A24D] hover:bg-[#E0C27A] text-[#0A0A0A] text-xs tracking-[0.25em] font-medium uppercase transition-all duration-300 flex items-center justify-center space-x-2 shrink-0 active:scale-98 cursor-pointer"
          >
            {isSubmitted ? (
              <>
                <Check className="w-4 h-4" />
                <span>CONFIRMED</span>
              </>
            ) : (
              <>
                <span>SUBSCRIBE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        <p className="text-[10px] text-[#666] tracking-widest uppercase mt-4">
          Strict confidentiality. Unsubscribe at any salon dispatch.
        </p>
      </div>
    </section>
  );
};
