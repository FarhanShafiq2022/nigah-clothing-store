import React, { useEffect, useRef } from 'react';
import { X, ArrowRight, Heart, ShoppingBag, Search, Sparkles, User, LogOut } from 'lucide-react';
import gsap from 'gsap';
import { useAtelier } from '../context/AtelierContext';
import { useNavigation, AppRoute } from '../context/NavigationContext';
import { NigahLogo } from './NigahLogo';
import { authService } from '../firebase/auth';
import { useAuth } from '../hooks/useAuth';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MENU_ITEMS: { name: string; path: AppRoute; subtitle: string }[] = [
  { name: 'HOME', path: '/', subtitle: 'Cinematic Grandeur & Story' },
  { name: 'ABOUT US', path: '/about', subtitle: 'Atelier Heritage & Karigars' },
  { name: 'BLOG', path: '/blog', subtitle: 'Editorial Notes & Craft Journal' },
  { name: 'SHOP', path: '/shop', subtitle: 'Full Collection & Bespoke Filters' },
  { name: 'CONTACT US', path: '/contact', subtitle: 'Private Appointments & Concierge' }
];

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { cartCount, wishlistCount, setIsCartOpen, setIsWishlistOpen, setSearchOpen } = useAtelier();
  const { currentRoute, navigate } = useNavigation();
  const { user, isAdmin } = useAuth();
  const { showToast } = useAtelier();
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!panelRef.current || !overlayRef.current) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.to(overlayRef.current, {
        opacity: 1,
        visibility: 'visible',
        duration: 0.35,
        ease: 'power2.out'
      });
      gsap.fromTo(
        panelRef.current,
        { x: '100%' },
        { x: '0%', duration: 0.5, ease: 'power3.out' }
      );
      if (linksRef.current) {
        gsap.fromTo(
          linksRef.current.children,
          { opacity: 0, x: 25 },
          { opacity: 1, x: 0, duration: 0.45, stagger: 0.07, delay: 0.15, ease: 'power2.out' }
        );
      }
    } else {
      document.body.style.overflow = '';
      gsap.to(panelRef.current, {
        x: '100%',
        duration: 0.35,
        ease: 'power3.in'
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          if (overlayRef.current) {
            overlayRef.current.style.visibility = 'hidden';
          }
        }
      });
    }
  }, [isOpen]);

  const handleNavClick = (path: AppRoute) => {
    onClose();
    setTimeout(() => {
      navigate(path);
    }, 250);
  };

  const handleAccountClick = async () => {
    try {
      if (user) {
        await authService.signOut();
        showToast('You have been signed out');
      } else {
        await authService.signInWithGoogle();
        showToast('Welcome to Nigah Clothes Store');
      }
    } catch (error) {
      console.error('Google account action failed.', error);
      showToast('Google sign-in was cancelled or unavailable');
    }
  };

  return (
    <div
      ref={overlayRef}
      id="mobile-nav-overlay"
      className="fixed inset-0 z-100 bg-black/85 backdrop-blur-md opacity-0 pointer-events-auto invisible transition-[visibility] duration-300"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        id="mobile-nav-drawer"
        className="absolute top-0 right-0 w-full max-w-sm sm:max-w-md h-full bg-[#0E0E0E] border-l border-[#C9A24D]/30 p-6 sm:p-8 flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-5 border-b border-[#222]">
          <button
            onClick={() => {
              onClose();
              navigate('/');
            }}
            className="text-left cursor-pointer focus:outline-none flex items-center"
            aria-label="Nigah Clothes Store Home"
          >
            <NigahLogo className="w-8 h-8" textSize="sm" />
          </button>
          <button
            id="close-mobile-menu"
            onClick={onClose}
            className="p-2 text-[#A1A1AA] hover:text-[#C9A24D] transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="py-6 flex-1 overflow-y-auto">
          <ul ref={linksRef} className="space-y-3">
            {MENU_ITEMS.map((item) => {
              const isActive = currentRoute === item.path;
              return (
                <li key={item.path}>
                  <button
                    onClick={() => handleNavClick(item.path)}
                    className={`group flex items-center justify-between w-full text-left p-3.5 rounded-none border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#C9A24D]/10 border-[#C9A24D] text-[#E0C27A]'
                        : 'border-transparent text-[#F5F2EA] hover:border-[#333] hover:bg-white/2'
                    }`}
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        {isActive && <Sparkles className="w-3.5 h-3.5 text-[#C9A24D]" />}
                        <span className="font-serif text-base sm:text-lg tracking-[0.2em] uppercase font-normal">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-[10px] tracking-wider text-[#888] font-light block mt-0.5">
                        {item.subtitle}
                      </span>
                    </div>
                    <ArrowRight
                      className={`w-4 h-4 transition-all duration-300 ${
                        isActive
                          ? 'text-[#C9A24D] transform translate-x-0'
                          : 'text-[#666] group-hover:text-[#C9A24D] transform -translate-x-2 group-hover:translate-x-0'
                      }`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Bottom Drawer Quick Actions */}
        <div className="pt-5 border-t border-[#222] space-y-4">
          {user && (
            <div className="grid grid-cols-1 gap-2">
              {isAdmin ? (
                <>
                  <button onClick={() => handleNavClick('/admin')} className="w-full py-2.5 px-3 bg-[#C9A24D]/10 border border-[#C9A24D]/50 text-[#E0C27A] text-[10px] tracking-[0.2em] uppercase text-left cursor-pointer">Admin Dashboard</button>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => handleNavClick('/admin/products')} className="py-2 px-2 border border-[#262626] text-[#A1A1AA] text-[9px] tracking-wider uppercase cursor-pointer">Products</button>
                    <button onClick={() => handleNavClick('/admin/orders')} className="py-2 px-2 border border-[#262626] text-[#A1A1AA] text-[9px] tracking-wider uppercase cursor-pointer">Orders</button>
                  </div>
                </>
              ) : (
                <button onClick={() => handleNavClick('/orders')} className="w-full py-2.5 px-3 bg-[#C9A24D]/10 border border-[#C9A24D]/50 text-[#E0C27A] text-[10px] tracking-[0.2em] uppercase text-left cursor-pointer">My Orders</button>
              )}
            </div>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <button
              onClick={() => void handleAccountClick()}
              className="py-2.5 px-2 bg-[#161616] border border-[#262626] text-xs text-[#A1A1AA] hover:text-[#C9A24D] hover:border-[#C9A24D]/40 flex flex-col items-center justify-center space-y-1 transition-colors cursor-pointer"
            >
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={`${user.displayName} profile`}
                  className="w-5 h-5 rounded-full object-cover border border-[#C9A24D]/70"
                />
              ) : user ? (
                <span className="w-5 h-5 rounded-full bg-[#C9A24D] text-[#0A0A0A] flex items-center justify-center text-[9px] font-semibold uppercase">
                  {user.displayName.slice(0, 1)}
                </span>
              ) : (
                <User className="w-4 h-4" />
              )}
              <span className="text-[9px] tracking-widest uppercase">{user ? 'Sign out' : 'Google'}</span>
            </button>
            <button
              onClick={() => {
                onClose();
                setSearchOpen(true);
              }}
              className="py-2.5 px-2 bg-[#161616] border border-[#262626] text-xs text-[#A1A1AA] hover:text-[#C9A24D] hover:border-[#C9A24D]/40 flex flex-col items-center justify-center space-y-1 transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span className="text-[9px] tracking-widest uppercase">Search</span>
            </button>
            <button
              onClick={() => {
                onClose();
                setIsWishlistOpen(true);
              }}
              className="py-2.5 px-2 bg-[#161616] border border-[#262626] text-xs text-[#A1A1AA] hover:text-[#C9A24D] hover:border-[#C9A24D]/40 flex flex-col items-center justify-center space-y-1 transition-colors relative cursor-pointer"
            >
              <Heart className="w-4 h-4" />
              <span className="text-[9px] tracking-widest uppercase">Saved ({wishlistCount})</span>
            </button>
            <button
              onClick={() => {
                onClose();
                setIsCartOpen(true);
              }}
              className="py-2.5 px-2 bg-[#161616] border border-[#262626] text-xs text-[#A1A1AA] hover:text-[#C9A24D] hover:border-[#C9A24D]/40 flex flex-col items-center justify-center space-y-1 transition-colors relative cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-[9px] tracking-widest uppercase">Bag ({cartCount})</span>
            </button>
          </div>

          <div className="text-center text-[10px] tracking-[0.25em] text-[#666] uppercase">
            Private Concierge: +92 (42) 3571-0988
          </div>
        </div>
      </div>
    </div>
  );
};
