import React, { useState } from 'react';
import {
  Navigation,
  Smartphone,
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  Send,
  ChevronUp,
  ExternalLink
} from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { FooterModals, FooterModalType } from './FooterModals';
import { NigahLogo } from './NigahLogo';

export const Footer: React.FC = () => {
  const { navigate } = useNavigation();
  const [activeModal, setActiveModal] = useState<FooterModalType>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-[#0A0A0A] text-[#D4D4D8] border-t border-[#1C1C1C] relative pt-16 pb-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Main 5-Column Grid matching Nigah Clothings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-[#1F1F1F]">
          {/* Column 1: Brand Info & Contact (4 Cols on lg) */}
          <div className="lg:col-span-4 flex flex-col items-start space-y-4">
            {/* Nigah Clothes Store Botanical N Logo */}
            <button
              onClick={() => navigate('/')}
              className="text-left cursor-pointer focus:outline-none flex items-center"
              aria-label="Nigah Clothes Store Home"
            >
              <NigahLogo className="w-12 h-12 sm:w-14 sm:h-14" textSize="lg" />
            </button>

            {/* Introductory Statement */}
            <p className="text-xs sm:text-[13px] text-[#A1A1AA] font-light leading-relaxed max-w-sm">
              We Provide You Our Best Dresses Collection & World Best Winter Collection Dresses Available On Our Store Buy Now.
            </p>

            {/* Address */}
            <div className="flex items-start space-x-3 pt-1 text-xs text-[#A1A1AA]">
              <button
                onClick={() => setActiveModal('store')}
                className="flex items-start space-x-3 text-left hover:text-[#C9A24D] transition-colors cursor-pointer group"
              >
                <Navigation className="w-4 h-4 text-[#C9A24D] shrink-0 mt-0.5 fill-[#C9A24D]/20 transform group-hover:scale-110 transition-transform" />
                <span className="leading-snug">
                  Shop no.4 building no.36c saba avenue badar commercial phase 5 DHA, Karachi, Pakistan
                </span>
              </button>
            </div>

            {/* Phone */}
            <div className="flex items-center space-x-3 text-xs">
              <Smartphone className="w-4 h-4 text-[#C9A24D] shrink-0" />
              <a
                href="tel:03217655369"
                className="text-[#D4D4D8] hover:text-[#C9A24D] transition-colors font-mono tracking-wider"
              >
                0321-7655369
              </a>
            </div>

            {/* Email */}
            <div className="flex items-center space-x-3 text-xs">
              <Mail className="w-4 h-4 text-[#C9A24D] shrink-0" />
              <a
                href="mailto:Info@nigahclothing.com"
                className="text-[#D4D4D8] hover:text-[#C9A24D] transition-colors"
              >
                Info@nigahclothing.com
              </a>
            </div>

            {/* Social Icons (5 Circles: FB, Twitter, Pinterest, LinkedIn, Telegram) */}
            <div className="flex items-center space-x-2 pt-2">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Nigah Clothing Facebook"
                className="w-8 h-8 rounded-full border border-[#333] bg-[#141414] text-[#A1A1AA] hover:text-[#0A0A0A] hover:bg-[#C9A24D] hover:border-[#C9A24D] flex items-center justify-center transition-all duration-300"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>

              {/* Twitter */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Nigah Clothing Twitter"
                className="w-8 h-8 rounded-full border border-[#333] bg-[#141414] text-[#A1A1AA] hover:text-[#0A0A0A] hover:bg-[#C9A24D] hover:border-[#C9A24D] flex items-center justify-center transition-all duration-300"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>

              {/* Pinterest */}
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Nigah Clothing Pinterest"
                className="w-8 h-8 rounded-full border border-[#333] bg-[#141414] text-[#A1A1AA] hover:text-[#0A0A0A] hover:bg-[#C9A24D] hover:border-[#C9A24D] flex items-center justify-center transition-all duration-300 font-serif font-bold text-xs"
              >
                P
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Nigah Clothing LinkedIn"
                className="w-8 h-8 rounded-full border border-[#333] bg-[#141414] text-[#A1A1AA] hover:text-[#0A0A0A] hover:bg-[#C9A24D] hover:border-[#C9A24D] flex items-center justify-center transition-all duration-300"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>

              {/* Telegram */}
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noreferrer"
                aria-label="Nigah Clothing Telegram"
                className="w-8 h-8 rounded-full border border-[#333] bg-[#141414] text-[#A1A1AA] hover:text-[#0A0A0A] hover:bg-[#C9A24D] hover:border-[#C9A24D] flex items-center justify-center transition-all duration-300"
              >
                <Send className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* SHOP NOW Golden Button */}
            <div className="pt-2">
              <button
                id="footer-shop-now-btn"
                onClick={() => navigate('/shop')}
                className="px-6 py-2.5 bg-[#C9A24D] text-[#0A0A0A] font-semibold text-xs tracking-[0.2em] uppercase hover:bg-[#E0C27A] transition-colors shadow-md shadow-[#C9A24D]/20 cursor-pointer"
              >
                SHOP NOW
              </button>
            </div>
          </div>

          {/* Column 2: RECENT POSTS (3 Cols on lg) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-[#F5F2EA] mb-5 font-serif">
              RECENT POSTS
            </h4>

            {/* Clickable Card for "WELCOME TO NIGAH CLOTHES STORE" */}
            <div
              onClick={() => setActiveModal('recentPost')}
              className="flex space-x-3.5 group cursor-pointer p-2 -ml-2 rounded transition-colors hover:bg-white/2"
            >
              {/* Thumbnail of Pakistani suits matching image */}
              <div className="w-20 sm:w-24 aspect-4/5 overflow-hidden bg-[#161616] shrink-0 border border-[#262626]">
                <img
                  src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=400&q=80"
                  alt="Nigah Dresses Collection Models"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <h5 className="font-medium text-xs sm:text-[13px] text-[#F5F2EA] group-hover:text-[#C9A24D] transition-colors uppercase leading-snug line-clamp-2">
                    WELCOME TO NIGAH CLOTHES STORE
                  </h5>
                  <p className="text-[11px] text-[#71717A] mt-2">
                    December 28, 2025
                  </p>
                  <p className="text-[11px] text-[#71717A]">
                    No Comments
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: MAIN MENU (2 Cols on lg) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-[#F5F2EA] mb-5 font-serif">
              MAIN MENU
            </h4>
            <ul className="space-y-3 text-xs text-[#A1A1AA] font-light">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#C9A24D] transition-colors flex items-center space-x-1"
                >
                  <span>Instagram profile</span>
                  <ExternalLink className="w-3 h-3 text-[#777]" />
                </a>
              </li>
              <li>
                <button
                  onClick={() => navigate('/shop', 'NEW ARRIVALS')}
                  className="hover:text-[#C9A24D] transition-colors text-left cursor-pointer"
                >
                  New Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/shop', 'WOMEN')}
                  className="hover:text-[#C9A24D] transition-colors text-left cursor-pointer"
                >
                  Woman Dress
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/contact')}
                  className="hover:text-[#C9A24D] transition-colors text-left cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/blog')}
                  className="hover:text-[#C9A24D] transition-colors text-left cursor-pointer"
                >
                  Latest News
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('purchaseTheme')}
                  className="hover:text-[#C9A24D] transition-colors text-left cursor-pointer"
                >
                  Purchase Theme
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: USEFUL LINK (2 Cols on lg) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-[#F5F2EA] mb-5 font-serif">
              USEFUL LINK
            </h4>
            <ul className="space-y-3 text-xs text-[#A1A1AA] font-light">
              <li>
                <button
                  onClick={() => setActiveModal('privacy')}
                  className="hover:text-[#C9A24D] transition-colors text-left cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('returns')}
                  className="hover:text-[#C9A24D] transition-colors text-left cursor-pointer"
                >
                  Returns
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('terms')}
                  className="hover:text-[#C9A24D] transition-colors text-left cursor-pointer"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/contact')}
                  className="hover:text-[#C9A24D] transition-colors text-left cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/blog')}
                  className="hover:text-[#C9A24D] transition-colors text-left cursor-pointer"
                >
                  Latest News
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('sitemap')}
                  className="hover:text-[#C9A24D] transition-colors text-left cursor-pointer"
                >
                  Our Sitemap
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: OUR STORES (1 Col on lg) */}
          <div className="lg:col-span-1">
            <h4 className="text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-[#F5F2EA] mb-5 font-serif whitespace-nowrap">
              OUR STORES
            </h4>
            <ul className="space-y-3 text-xs text-[#A1A1AA] font-light">
              <li>
                <button
                  onClick={() => setActiveModal('store')}
                  className="hover:text-[#C9A24D] transition-colors text-left cursor-pointer whitespace-nowrap block"
                >
                  Pakistan Karachi
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright and Payment Row */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-5">
          {/* Left: Exact Copyright Text from image with '-NC-' in Red */}
          <div className="text-xs text-[#8E8E93] font-light text-center md:text-left tracking-wide">
            <span className="font-medium text-[#D4D4D8]">NIGAH-CLOTHING</span> Copyright © 2026 Created By NIGAH-CLOTHES{' '}
            <span className="text-[#EF4444] font-semibold">-NC-</span>
            <span className="font-medium text-[#D4D4D8]">NIGAHCLOTHES</span>. All Rights Reserved.
          </div>

          {/* Center: Back to Top & Replay Intro links */}
          <div className="flex items-center space-x-4 text-xs text-[#888888]">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#E0C27A] transition-colors cursor-pointer flex items-center space-x-1"
            >
              <span>Back to Top</span>
              <span>↑</span>
            </button>
            <span className="text-[#333]">•</span>
            <button
              onClick={() => {
                sessionStorage.removeItem('nigah_intro_seen');
                window.location.reload();
              }}
              className="hover:text-[#E0C27A] transition-colors cursor-pointer"
            >
              Replay Intro
            </button>
          </div>

          {/* Right: Payment Cards from Image */}
          <div className="flex items-center space-x-2">
            {/* VISA */}
            <div className="h-6 px-2 bg-[#1A1F71] rounded-xs flex items-center justify-center border border-[#333] shadow-xs">
              <span className="text-[10px] font-extrabold italic text-white tracking-wider">VISA</span>
            </div>

            {/* MasterCard */}
            <div className="h-6 px-1.5 bg-[#222222] rounded-xs flex items-center justify-center -space-x-1 border border-[#333] shadow-xs">
              <div className="w-3.5 h-3.5 rounded-full bg-[#EB001B] opacity-90" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#F79E1B] opacity-90" />
            </div>

            {/* PayPal */}
            <div className="h-6 px-2 bg-[#003087] rounded-xs flex items-center justify-center border border-[#333] shadow-xs">
              <span className="text-[10px] font-bold text-white italic">PayPal</span>
            </div>

            {/* American Express */}
            <div className="h-6 px-1.5 bg-[#002663] rounded-xs flex items-center justify-center border border-[#333] shadow-xs">
              <span className="text-[8px] font-black text-white tracking-tight uppercase">AMEX</span>
            </div>

            {/* Visa Electron */}
            <div className="h-6 px-1.5 bg-[#1434CB] rounded-xs flex items-center justify-center border border-[#333] shadow-xs">
              <span className="text-[8px] font-bold text-white uppercase italic">Electron</span>
            </div>

            {/* Maestro */}
            <div className="h-6 px-1.5 bg-[#1C1C1C] rounded-xs flex items-center justify-center -space-x-1 border border-[#333] shadow-xs">
              <div className="w-3.5 h-3.5 rounded-full bg-[#CC0000] opacity-90" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#0066CC] opacity-90" />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Modals for Footer links */}
      <FooterModals
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
      />
    </footer>
  );
};
