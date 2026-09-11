import React, { useEffect, useRef } from "react";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Link,
} from "lucide-react";
import gsap from "gsap";
import { useAtelier } from "../context/AtelierContext";
import { useNavigation } from "../context/NavigationContext";
export const CartDrawer: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartCount,
    cartSubtotal,
    isCartOpen,
    setIsCartOpen,
    showToast,
  } = useAtelier();
  const overlayRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!drawerRef.current || !overlayRef.current) return;

    if (isCartOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(overlayRef.current, {
        opacity: 1,
        visibility: "visible",
        duration: 0.35,
        ease: "power2.out",
      });
      gsap.fromTo(
        drawerRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.5, ease: "power3.out" },
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(drawerRef.current, {
        x: "100%",
        duration: 0.4,
        ease: "power3.in",
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          if (overlayRef.current)
            overlayRef.current.style.visibility = "hidden";
        },
      });
    }
  }, [isCartOpen]);

  const handleCheckout = () => {
    setIsCartOpen(false);
    showToast("Redirecting to Private Atelier Concierge Checkout...");
  };
  const { navigate } = useNavigation();
  return (
    <div
      ref={overlayRef}
      onClick={() => setIsCartOpen(false)}
      className="fixed inset-0 z-1000 bg-black/80 backdrop-blur-sm opacity-0 invisible transition-[visibility] duration-300"
    >
      <div
        ref={drawerRef}
        onClick={(e) => e.stopPropagation()}
        className="absolute top-0 right-0 w-full max-w-md h-full bg-[#0D0D0D] border-l border-[#C9A24D]/30 flex flex-col justify-between shadow-2xl"
      >
        {/* Header */}
        <div className="p-6 border-b border-[#222] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-[#C9A24D]" />
            <h3 className="font-serif text-xl text-[#F5F2EA] tracking-wide">
              SHOPPING BAG ({cartCount})
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1 text-[#888] hover:text-[#C9A24D] transition-colors cursor-pointer"
            aria-label="Close Bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <ShoppingBag className="w-12 h-12 text-[#333] stroke-1 mb-4" />
              <p className="font-serif text-2xl text-[#888]">
                Your bag is empty.
              </p>
              <p className="text-xs text-[#555] tracking-widest uppercase mt-2">
                Discover pieces from our latest runway edit.
              </p>
              <button
                type="button"
                className="px-3 py-1.5 bg-[#C9A24D] text-[#0A0A0A] text-[10px] tracking-wider uppercase font-medium hover:bg-[#E0C27A] flex items-center space-x-1 cursor-pointer"
                onClick={() => {
                  setIsCartOpen(false);
                  navigate("/shop");
                }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cart
              .filter((item) => item && item.product)
              .map((item) => (
                <div
                  key={item.id}
                  className="flex space-x-4 p-4 bg-[#111111] border border-[#222]"
                >
                  <div className="w-20 aspect-3/4 overflow-hidden bg-[#161616] shrink-0">
                    <img
                      src={item.product?.image || ""}
                      alt={item.product?.name || "Garment"}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="font-serif text-sm text-[#F5F2EA] tracking-wide font-normal line-clamp-1">
                          {item.product?.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#666] hover:text-[#C9A24D] transition-colors ml-2 cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center space-x-3 text-[10px] tracking-widest text-[#888] uppercase mt-1">
                        <span>SIZE: {item.size}</span>
                        <span>•</span>
                        <span>{item.product?.category}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#1C1C1C]">
                      <span className="text-xs font-medium text-[#E0C27A]">
                        Rs.{" "}
                        {(
                          (item.product?.price || 0) * item.quantity
                        ).toLocaleString()}
                      </span>
                      <div className="flex items-center space-x-2 border border-[#282828] bg-[#141414] px-2 py-0.5">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="text-[#888] hover:text-[#C9A24D] text-xs px-1 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs text-[#F5F2EA] px-1 font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="text-[#888] hover:text-[#C9A24D] text-xs px-1 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>

        {/* Footer Subtotal & Checkout */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-[#222] bg-[#111111] space-y-4">
            <div className="space-y-2 text-xs tracking-wider">
              <div className="flex items-center justify-between text-[#888]">
                <span>BAG SUBTOTAL</span>
                <span className="font-medium text-[#F5F2EA]">
                  Rs. {cartSubtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between text-[#888]">
                <span>INSURED ATELIER COURIER</span>
                <span className="text-[#C9A24D] uppercase font-medium">
                  COMPLIMENTARY
                </span>
              </div>
              <div className="pt-2 border-t border-[#222] flex items-center justify-between text-sm text-[#F5F2EA] font-serif">
                <span>ESTIMATED TOTAL</span>
                <span className="text-[#E0C27A] font-sans font-medium">
                  Rs. {cartSubtotal.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              id="cart-checkout-btn"
              className="w-full py-4 bg-[#C9A24D] text-[#0A0A0A] text-xs tracking-[0.25em] font-medium uppercase hover:bg-[#E0C27A] flex items-center justify-center space-x-2 transition-all duration-300 cursor-pointer shadow-lg"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center space-x-2 text-[10px] text-[#666] tracking-widest uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C9A24D]" />
              <span>SECURE ENCRYPTED TRANSACTION</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
