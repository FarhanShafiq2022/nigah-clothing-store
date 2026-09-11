import React from 'react';
import { X, MapPin, Phone, Mail, Clock, ShieldCheck, RefreshCw, FileText, Compass, ExternalLink } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

export type FooterModalType =
  | 'privacy'
  | 'returns'
  | 'terms'
  | 'sitemap'
  | 'store'
  | 'purchaseTheme'
  | 'recentPost'
  | null;

interface FooterModalsProps {
  activeModal: FooterModalType;
  onClose: () => void;
}

export const FooterModals: React.FC<FooterModalsProps> = ({ activeModal, onClose }) => {
  const { navigate } = useNavigation();

  if (!activeModal) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#111111] border border-[#C9A24D]/35 p-6 sm:p-8 shadow-2xl text-[#D4D4D8] max-h-[88vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#888] hover:text-[#C9A24D] transition-colors p-1 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal: Privacy Policy */}
        {activeModal === 'privacy' && (
          <div className="space-y-4 text-left">
            <div className="flex items-center space-x-2 text-[#C9A24D]">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-[10px] tracking-[0.3em] uppercase font-medium">NIGAH CLOTHING LEGAL</span>
            </div>
            <h3 className="font-serif text-2xl text-[#F5F2EA]">Privacy Policy</h3>
            <p className="text-xs text-[#A1A1AA] leading-relaxed">
              At NIGAH Clothing, protecting your personal data and upholding your trust is of paramount importance. This Privacy Policy details how we collect, store, and safeguard client information across our digital boutique and physical stores.
            </p>
            <div className="space-y-3 pt-2 text-xs text-[#A1A1AA]">
              <h4 className="text-sm font-medium text-[#F5F2EA]">1. Information We Collect</h4>
              <p>
                When you place an order or schedule a bespoke appointment, we gather your name, contact phone number (including WhatsApp), shipping address, and garment measurements. Payment card numbers are processed through PCI-DSS certified gateway partners and never stored on our servers.
              </p>
              <h4 className="text-sm font-medium text-[#F5F2EA]">2. How We Use Your Data</h4>
              <p>
                Information is exclusively utilized to fulfill orders, provide shipment tracking via courier partners, coordinate bespoke fittings, and deliver customer service notifications.
              </p>
              <h4 className="text-sm font-medium text-[#F5F2EA]">3. Data Security & Discretion</h4>
              <p>
                We never monetize, rent, or distribute client data to external third parties. All communication channels utilize 256-bit SSL encryption.
              </p>
            </div>
          </div>
        )}

        {/* Modal: Returns & Exchanges */}
        {activeModal === 'returns' && (
          <div className="space-y-4 text-left">
            <div className="flex items-center space-x-2 text-[#C9A24D]">
              <RefreshCw className="w-5 h-5" />
              <span className="text-[10px] tracking-[0.3em] uppercase font-medium">CLIENT ASSURANCE</span>
            </div>
            <h3 className="font-serif text-2xl text-[#F5F2EA]">Returns & Exchange Policy</h3>
            <p className="text-xs text-[#A1A1AA] leading-relaxed">
              Every garment created at NIGAH Clothing reflects rigorous standards of fabric quality and embroidery inspection.
            </p>
            <div className="space-y-3 pt-2 text-xs text-[#A1A1AA]">
              <h4 className="text-sm font-medium text-[#F5F2EA]">Standard 7-Day Exchange</h4>
              <p>
                Unstitched and standard pret-a-porter garments may be exchanged within 7 days of delivery, provided the item remains unworn, unwashed, with original security tags and designer packaging intact.
              </p>
              <h4 className="text-sm font-medium text-[#F5F2EA]">Bespoke & Custom Sizes</h4>
              <p>
                Items made to custom client measurements are non-refundable. However, we provide complimentary fitting adjustments at our Karachi atelier to ensure an impeccable fit.
              </p>
              <h4 className="text-sm font-medium text-[#F5F2EA]">Exchange Process</h4>
              <p>
                To initiate an exchange, contact our concierge at <span className="text-[#C9A24D]">0321-7655369</span> or email <span className="text-[#C9A24D]">Info@nigahclothing.com</span> with your order number.
              </p>
            </div>
          </div>
        )}

        {/* Modal: Terms & Conditions */}
        {activeModal === 'terms' && (
          <div className="space-y-4 text-left">
            <div className="flex items-center space-x-2 text-[#C9A24D]">
              <FileText className="w-5 h-5" />
              <span className="text-[10px] tracking-[0.3em] uppercase font-medium">TERMS OF SERVICE</span>
            </div>
            <h3 className="font-serif text-2xl text-[#F5F2EA]">Terms & Conditions</h3>
            <p className="text-xs text-[#A1A1AA] leading-relaxed">
              By accessing NIGAH Clothing online or visiting our stores, you agree to comply with our store policies and order terms.
            </p>
            <div className="space-y-3 pt-2 text-xs text-[#A1A1AA]">
              <h4 className="text-sm font-medium text-[#F5F2EA]">Handcrafted Characteristics</h4>
              <p>
                Due to the artisanal hand-embroidery (zardozi, tilla, resham) and botanical dyeing techniques employed in our winter and festive collections, minor variations in color tone and threadwork are hallmarks of genuine craft, not flaws.
              </p>
              <h4 className="text-sm font-medium text-[#F5F2EA]">Pricing & Order Confirmation</h4>
              <p>
                All prices are stated in PKR. Orders are confirmed once payment verification is completed or upon confirmation for Cash-on-Delivery in Pakistan.
              </p>
            </div>
          </div>
        )}

        {/* Modal: Sitemap */}
        {activeModal === 'sitemap' && (
          <div className="space-y-4 text-left">
            <div className="flex items-center space-x-2 text-[#C9A24D]">
              <Compass className="w-5 h-5" />
              <span className="text-[10px] tracking-[0.3em] uppercase font-medium">NAVIGATION DIRECTORY</span>
            </div>
            <h3 className="font-serif text-2xl text-[#F5F2EA]">Our Sitemap</h3>
            <p className="text-xs text-[#A1A1AA]">
              Quickly navigate to any area of the NIGAH Clothing digital flagship:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 text-xs">
              <div className="p-4 bg-[#161616] border border-[#222] space-y-2">
                <span className="text-[#C9A24D] font-medium tracking-wider uppercase text-[10px] block">STORE PAGES</span>
                <ul className="space-y-1.5 text-[#D4D4D8]">
                  <li>
                    <button onClick={() => { onClose(); navigate('/'); }} className="hover:text-[#C9A24D] cursor-pointer">
                      • Home - Editorial Showcase
                    </button>
                  </li>
                  <li>
                    <button onClick={() => { onClose(); navigate('/shop'); }} className="hover:text-[#C9A24D] cursor-pointer">
                      • Shop - All Collections & Winter Edit
                    </button>
                  </li>
                  <li>
                    <button onClick={() => { onClose(); navigate('/shop', 'NEW ARRIVALS'); }} className="hover:text-[#C9A24D] cursor-pointer">
                      • New Collection
                    </button>
                  </li>
                  <li>
                    <button onClick={() => { onClose(); navigate('/shop', 'WOMEN'); }} className="hover:text-[#C9A24D] cursor-pointer">
                      • Woman Dresses & Pret
                    </button>
                  </li>
                  <li>
                    <button onClick={() => { onClose(); navigate('/about'); }} className="hover:text-[#C9A24D] cursor-pointer">
                      • About Us - Atelier Heritage
                    </button>
                  </li>
                </ul>
              </div>
              <div className="p-4 bg-[#161616] border border-[#222] space-y-2">
                <span className="text-[#C9A24D] font-medium tracking-wider uppercase text-[10px] block">MEDIA & CONCIERGE</span>
                <ul className="space-y-1.5 text-[#D4D4D8]">
                  <li>
                    <button onClick={() => { onClose(); navigate('/blog'); }} className="hover:text-[#C9A24D] cursor-pointer">
                      • Blog & Latest Fashion News
                    </button>
                  </li>
                  <li>
                    <button onClick={() => { onClose(); navigate('/contact'); }} className="hover:text-[#C9A24D] cursor-pointer">
                      • Contact Us & Karachi Store Locator
                    </button>
                  </li>
                  <li>
                    <a href="tel:03217655369" className="hover:text-[#C9A24D] block">
                      • Phone Concierge: 0321-7655369
                    </a>
                  </li>
                  <li>
                    <a href="mailto:Info@nigahclothing.com" className="hover:text-[#C9A24D] block">
                      • Email Inquiries: Info@nigahclothing.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Store Locator (Pakistan Karachi) */}
        {activeModal === 'store' && (
          <div className="space-y-5 text-left">
            <div className="flex items-center space-x-2 text-[#C9A24D]">
              <MapPin className="w-5 h-5" />
              <span className="text-[10px] tracking-[0.3em] uppercase font-medium">BOUTIQUE LOCATOR</span>
            </div>
            <div>
              <h3 className="font-serif text-2xl text-[#F5F2EA]">NIGAH CLOTHING - KARACHI</h3>
              <p className="text-xs text-[#C9A24D] tracking-widest uppercase mt-1">
                FLAGSHIP RETAIL & BRIDAL LOUNGE
              </p>
            </div>

            <div className="p-4 sm:p-5 bg-[#161616] border border-[#262626] space-y-3.5 text-xs text-[#D4D4D8]">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-[#C9A24D] shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-[#F5F2EA] block">Address</span>
                  <span className="text-[#A1A1AA]">
                    Shop no.4 building no.36c saba avenue badar commercial phase 5 DHA, Karachi, Pakistan
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-[#C9A24D] shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-[#F5F2EA] block">Store Phone / WhatsApp</span>
                  <a href="tel:03217655369" className="text-[#C9A24D] hover:underline">
                    0321-7655369
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-[#C9A24D] shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-[#F5F2EA] block">Official Email</span>
                  <a href="mailto:Info@nigahclothing.com" className="text-[#A1A1AA] hover:text-[#C9A24D]">
                    Info@nigahclothing.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-[#C9A24D] shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-[#F5F2EA] block">Opening Hours</span>
                  <span className="text-[#A1A1AA]">Monday – Sunday: 11:00 AM – 10:30 PM (PKT)</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="https://maps.google.com/?q=Saba+Avenue+Badar+Commercial+Phase+5+DHA+Karachi"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 bg-[#C9A24D] text-[#0A0A0A] text-xs tracking-wider uppercase font-semibold text-center hover:bg-[#E0C27A] transition-colors flex items-center justify-center space-x-2"
              >
                <span>GET DIRECTIONS</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="tel:03217655369"
                className="flex-1 py-3 border border-[#333] text-[#F5F2EA] text-xs tracking-wider uppercase font-medium text-center hover:border-[#C9A24D] hover:text-[#C9A24D] transition-colors flex items-center justify-center space-x-2"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>CALL STORE</span>
              </a>
            </div>
          </div>
        )}

        {/* Modal: Purchase Theme */}
        {activeModal === 'purchaseTheme' && (
          <div className="space-y-4 text-left">
            <div className="flex items-center space-x-2 text-[#C9A24D]">
              <span className="text-[10px] tracking-[0.3em] uppercase font-medium">DESIGN & THEME LICENSE</span>
            </div>
            <h3 className="font-serif text-2xl text-[#F5F2EA]">Purchase Theme & Custom Build</h3>
            <p className="text-xs text-[#A1A1AA] leading-relaxed">
              This bespoke luxury e-commerce theme is engineered with React, Tailwind CSS, fluid motion physics, and high-performance design principles tailored for elite fashion houses and couture labels.
            </p>
            <div className="p-4 bg-[#161616] border border-[#262626] space-y-2 text-xs">
              <div className="flex justify-between border-b border-[#222] pb-2">
                <span className="text-[#888]">Architecture:</span>
                <span className="text-[#F5F2EA]">React 19 + Tailwind CSS + GSAP</span>
              </div>
              <div className="flex justify-between border-b border-[#222] pb-2">
                <span className="text-[#888]">Compatibility:</span>
                <span className="text-[#F5F2EA]">100% Mobile, Tablet & Desktop Responsive</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888]">Direct Inquiries:</span>
                <a href="mailto:Info@nigahclothing.com" className="text-[#C9A24D] hover:underline">
                  Info@nigahclothing.com
                </a>
              </div>
            </div>
            <button
              onClick={() => {
                onClose();
                navigate('/contact');
              }}
              className="w-full py-3 bg-[#C9A24D] text-[#0A0A0A] text-xs tracking-wider uppercase font-semibold hover:bg-[#E0C27A] transition-colors cursor-pointer"
            >
              CONTACT ATELIER DEVELOPMENT
            </button>
          </div>
        )}

        {/* Modal: Recent Post ("WELCOME TO NIGAH CLOTHES STORE") */}
        {activeModal === 'recentPost' && (
          <div className="space-y-4 text-left">
            <div className="w-full h-52 sm:h-64 overflow-hidden bg-[#161616] border border-[#222]">
              <img
                src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85"
                alt="Welcome to Nigah Clothes Store"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="text-[10px] tracking-widest text-[#C9A24D] uppercase flex items-center space-x-3">
              <span>December 28, 2025</span>
              <span>•</span>
              <span>No Comments</span>
            </div>
            <h3 className="font-serif text-2xl text-[#F5F2EA]">WELCOME TO NIGAH CLOTHES STORE</h3>
            <p className="text-xs text-[#A1A1AA] leading-relaxed">
              We provide you our best dresses collection & world best winter collection dresses available on our store. Buy now with exquisite embroideries, premium fabrics, and timeless silhouettes crafted for elegance.
            </p>
            <p className="text-xs text-[#888] leading-relaxed">
              Visit our flagship retail store at Shop no.4 building no.36c saba avenue badar commercial phase 5 DHA, Karachi, Pakistan or order online for fast home delivery across Pakistan and worldwide.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  onClose();
                  navigate('/shop');
                }}
                className="flex-1 py-3 bg-[#C9A24D] text-[#0A0A0A] text-xs tracking-wider uppercase font-semibold hover:bg-[#E0C27A] transition-colors cursor-pointer"
              >
                SHOP COLLECTION NOW
              </button>
              <button
                onClick={() => {
                  onClose();
                  navigate('/blog');
                }}
                className="flex-1 py-3 border border-[#333] text-[#F5F2EA] text-xs tracking-wider uppercase font-medium hover:border-[#C9A24D] hover:text-[#C9A24D] transition-colors cursor-pointer"
              >
                VISIT BLOG
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
