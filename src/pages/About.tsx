import React, {useEffect, useRef} from 'react';
import { Sparkles, Scissors, Feather, ShieldCheck, ArrowRight, HeartHandshake, Compass } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
export const About: React.FC = () => {
  const { navigate } = useNavigation();




  return (
    <div className="py-28 sm:py-36 px-4 sm:px-8 lg:px-14 max-w-7xl mx-auto text-[#F5F2EA]">
      
      
      
      
      
      
      
      {/* Breadcrumb */}
      <div className="flex items-center justify-center sm:justify-start space-x-2 text-[10px] tracking-[0.25em] text-[#888] uppercase mb-8 font-light">
        <button onClick={() => navigate('/')} className="hover:text-[#C9A24D] transition-colors cursor-pointer">
          Home
        </button>
        <span>/</span>
        <span className="text-[#C9A24D]">About Us</span>
      </div>

      {/* Hero Headline */}
      <div className="text-center max-w-4xl mx-auto mb-20">
        <span className="text-[10px] sm:text-[11px] tracking-[0.35em] text-[#C9A24D] uppercase block mb-3 font-medium">
          THE HOUSE OF NIGAH
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F5F2EA] tracking-wide font-normal leading-tight mb-6">
          Architectural Haute Couture Rooted in Living Heritage
        </h1>
        <p className="text-sm sm:text-base text-[#A1A1AA] font-light leading-relaxed max-w-2xl mx-auto">
          Founded on the conviction that traditional subcontinental craftsmanship possesses timeless modern power,
          Nigah Clothes Store marries centuries-old metallic embroidery with razor-sharp contemporary geometry.
        </p>
      </div>

      {/* Split Hero Visual */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-28">
        <div className="lg:col-span-7 relative group">
          <div className="aspect-4/3 sm:aspect-16/10 overflow-hidden bg-[#161616] border border-[#222]">
            <img
              src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85"
              alt="Atelier Craftsman working with raw silk and metallic zari"
              className="w-full h-full object-cover object-center grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden sm:block p-6 bg-[#111111] border border-[#C9A24D]/40 max-w-xs shadow-2xl backdrop-blur-md">
            <span className="text-[9px] tracking-[0.3em] text-[#C9A24D] uppercase block mb-1">
              ESTABLISHED 1998
            </span>
            <p className="text-xs text-[#CCC] font-light">
              Over 28 years of master karigar preservation across Lahore and Kashmir guilds.
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <span className="text-[10px] tracking-[0.3em] text-[#C9A24D] uppercase font-medium">
            OUR PHILOSOPHY
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#F5F2EA] font-normal leading-snug">
            Defying the ephemeral rush of fast fashion through radical slowness.
          </h2>
          <p className="text-xs sm:text-sm text-[#8E8E8E] leading-relaxed font-light">
            In our Lahore atelier, a single garment frequently resides on the wooden embroidery frame for weeks.
            We do not manufacture for seasonal markdowns or disposable closets. We sculpt heirlooms intended to be worn,
            treasured, and passed down across generations.
          </p>
          <div className="pt-4 border-t border-[#222] grid grid-cols-2 gap-4">
            <div>
              <span className="font-serif text-3xl text-[#E0C27A] block font-light">120+</span>
              <span className="text-[10px] tracking-widest text-[#777] uppercase">Master Artisans</span>
            </div>
            <div>
              <span className="font-serif text-3xl text-[#E0C27A] block font-light">100%</span>
              <span className="text-[10px] tracking-widest text-[#777] uppercase">Pure Natural Fibers</span>
            </div>
          </div>
        </div>
      </div>

      {/* The 3 Pillars of ZARQASH */}
      <div className="mb-28">
        <div className="text-center mb-14">
          <span className="text-[10px] tracking-[0.3em] text-[#C9A24D] uppercase font-medium block mb-2">
            CORE FOUNDATION
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-[#F5F2EA]">The Three Pillars of Atelier Craft</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="p-8 bg-[#0E0E0E] border border-[#222] hover:border-[#C9A24D]/50 transition-all duration-300">
            <div className="w-12 h-12 mb-6 bg-[#161616] border border-[#C9A24D]/30 flex items-center justify-center text-[#C9A24D]">
              <Scissors className="w-5 h-5 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-lg text-[#F5F2EA] mb-3 tracking-wider">
              Architectural Silhouette
            </h3>
            <p className="text-xs text-[#8E8E8E] leading-relaxed font-light">
              We deconstruct classical Mughal cuts—substituting rigid bulk with origami folds, fluid pleating,
              and sculpted shoulders engineered for movement and authority.
            </p>
          </div>

          <div className="p-8 bg-[#0E0E0E] border border-[#222] hover:border-[#C9A24D]/50 transition-all duration-300">
            <div className="w-12 h-12 mb-6 bg-[#161616] border border-[#C9A24D]/30 flex items-center justify-center text-[#C9A24D]">
              <Feather className="w-5 h-5 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-lg text-[#F5F2EA] mb-3 tracking-wider">
              Mulberry Raw Silk & Velvet
            </h3>
            <p className="text-xs text-[#8E8E8E] leading-relaxed font-light">
              Only organic natural fibers touch the skin. We reject synthetics in favor of 80g raw silk, Belgian linen,
              and micro-velvet dyed with botanical extracts.
            </p>
          </div>

          <div className="p-8 bg-[#0E0E0E] border border-[#222] hover:border-[#C9A24D]/50 transition-all duration-300">
            <div className="w-12 h-12 mb-6 bg-[#161616] border border-[#C9A24D]/30 flex items-center justify-center text-[#C9A24D]">
              <HeartHandshake className="w-5 h-5 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-lg text-[#F5F2EA] mb-3 tracking-wider">
              Ethical Guild Ecosystem
            </h3>
            <p className="text-xs text-[#8E8E8E] leading-relaxed font-light">
              Every karigar is salaried above fair-wage benchmarks with full family healthcare, pension dividends,
              and apprenticeship stipends to train the next generation.
            </p>
          </div>
        </div>
      </div>

      {/* Atelier Milestones Timeline */}
      <div className="mb-28 p-8 sm:p-12 bg-[#0E0E0E] border border-[#222]">
        <div className="text-center mb-12">
          <span className="text-[10px] tracking-[0.3em] text-[#C9A24D] uppercase font-medium block mb-2">
            CHRONICLES
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#F5F2EA]">Atelier Journey (1998 — 2026)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="border-t border-[#C9A24D]/50 pt-4">
            <span className="font-mono text-xs text-[#C9A24D] block mb-1">1998</span>
            <h4 className="font-serif text-base text-[#F5F2EA] mb-2">The Old City Loom</h4>
            <p className="text-xs text-[#888] font-light">
              Initiated with two handlooms in the heritage quarter of Old Lahore, dedicated to reviving beaten gold marori.
            </p>
          </div>
          <div className="border-t border-[#C9A24D]/50 pt-4">
            <span className="font-mono text-xs text-[#C9A24D] block mb-1">2010</span>
            <h4 className="font-serif text-base text-[#F5F2EA] mb-2">Black Label Menswear</h4>
            <p className="text-xs text-[#888] font-light">
              Unveiled the deconstructed bandhgala and prince coat collection, establishing our signature tailored silhouette.
            </p>
          </div>
          <div className="border-t border-[#C9A24D]/50 pt-4">
            <span className="font-mono text-xs text-[#C9A24D] block mb-1">2019</span>
            <h4 className="font-serif text-base text-[#F5F2EA] mb-2">Global Flagship Expansion</h4>
            <p className="text-xs text-[#888] font-light">
              Opened private fitting lounges in Dubai Design District and Karachi Clifton to serve international patrons.
            </p>
          </div>
          <div className="border-t border-[#C9A24D]/50 pt-4">
            <span className="font-mono text-xs text-[#C9A24D] block mb-1">2026</span>
            <h4 className="font-serif text-base text-[#F5F2EA] mb-2">Circular Atelier Zero-Waste</h4>
            <p className="text-xs text-[#888] font-light">
              Achieved under 3.2% cutting room scrap with 100% leftover selvages repurposed into hand-woven accessory ribbons.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Box: Experience Atelier */}
      <div className="text-center p-12 sm:p-16 bg-[#111111] border border-[#C9A24D]/30 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="text-[10px] tracking-[0.3em] text-[#C9A24D] uppercase font-medium block mb-3">
            PRIVATE ENGAGEMENT
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#F5F2EA] mb-4">
            Experience the Atelier Firsthand
          </h2>
          <p className="text-xs sm:text-sm text-[#A1A1AA] font-light mb-8 leading-relaxed">
            Schedule a private consultation at our flagship Lahore or Karachi studios, or browse the current collection online.
          </p>
          <div className="flex items-center justify-center flex-wrap gap-4">
            <button
              onClick={() => navigate('/contact')}
              className="py-3 px-8 bg-[#C9A24D] text-[#0A0A0A] font-medium text-xs tracking-[0.25em] uppercase hover:bg-[#E0C27A] transition-all cursor-pointer shadow-lg"
            >
              Book Bespoke Consultation
            </button>
            <button
              onClick={() => navigate('/shop')}
              className="py-3 px-8 border border-[#444] hover:border-[#C9A24D] text-[#F5F2EA] hover:text-[#C9A24D] text-xs tracking-[0.25em] uppercase transition-all cursor-pointer"
            >
              Explore Ready-To-Wear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
