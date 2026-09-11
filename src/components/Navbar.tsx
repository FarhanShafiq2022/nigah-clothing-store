import React, { useEffect, useMemo, useRef, useState } from "react";
import { Search, User, ShoppingBag, Heart, Menu, X } from "lucide-react";
import gsap from "gsap";

import { useAtelier } from "../context/AtelierContext";
import { useNavigation } from "../context/NavigationContext";
import { NigahLogo } from "./NigahLogo";
import { MobileMenu } from "./MobileMenu";
import { authService } from "../firebase/auth";
import { useAuth } from "../hooks/useAuth";
import type { CategoryFilter } from "../types";

/**
 * Main navigation
 */
export const NAV_ITEMS = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Shop", path: "/shop" },
  { label: "Contact Us", path: "/contact" },
];

/**
 * These values come directly from the CategoryFilter type
 * defined in ../types/index.ts.
 *
 * Do not derive categories from PRODUCTS.
 * Do not duplicate product categories here.
 */
const CATEGORY_FILTERS: CategoryFilter[] = [
  "NEW ARRIVALS",
  "EASTERN",
  "WESTERN",
  "BEST SELLERS",
  "EAST MEETS WEST",
  "FOOTWEAR",
  "FRAGRANCES",
  "ACCESSORIES",
];

type Gender = "WOMEN" | "MEN";

export const Navbar: React.FC = () => {
  const {
    cartCount,
    wishlistCount,
    isCartOpen,
    isWishlistOpen,
    setIsCartOpen,
    setIsWishlistOpen,
    setSearchOpen,
    showToast,
  } = useAtelier();

  const { navigate } = useNavigation();
  const { user, isAdmin } = useAuth();

  const navRef = useRef<HTMLElement | null>(null);

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [activeGender, setActiveGender] = useState<Gender>("WOMEN");

  /*
   * DRAWER CONTROLS
   * One drawer at a time. Cart/Wishlist state remains in context.
   */
  const closeAllDrawers = () => {
    setIsCartOpen(false);
    setIsWishlistOpen(false);
    setMenuOpen(false);
    setMobileMenuOpen(false);
    setAccountOpen(false);
  };

  const openCart = () => {
    setAccountOpen(false);
    setMenuOpen(false);
    setMobileMenuOpen(false);
    setIsWishlistOpen(false);
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const openWishlist = () => {
    setAccountOpen(false);
    setMenuOpen(false);
    setMobileMenuOpen(false);
    setIsCartOpen(false);
    setIsWishlistOpen(true);
  };

  const closeWishlist = () => {
    setIsWishlistOpen(false);
  };

  const toggleCart = () => {
    if (isCartOpen) {
      closeCart();
    } else {
      openCart();
    }
  };

  const toggleWishlist = () => {
    if (isWishlistOpen) {
      closeWishlist();
    } else {
      openWishlist();
    }
  };

  /**
   * ------------------------------------------------------------
   * NAVBAR SCROLL
   * ------------------------------------------------------------
   */
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrolled = window.scrollY > 40;

  //     setIsScrolled((previous) => {
  //       if (previous === scrolled) return previous;
  //       return scrolled;
  //     });

  //     if (!navRef.current) return;

  //     gsap.to(navRef.current, {
  //       backgroundColor: scrolled
  //         ? "rgba(10, 10, 10, 0.90)"
  //         : "rgba(0, 0, 0, 0)",
  //       backdropFilter: scrolled ? "blur(16px)" : "blur(0px)",
  //       borderBottomColor: scrolled
  //         ? "rgba(255, 255, 255, 0.12)"
  //         : "rgba(0, 0, 0, 0)",
  //       duration: 0.35,
  //       ease: "power2.out",
  //     });
  //   };

  //   window.addEventListener("scroll", handleScroll, {
  //     passive: true,
  //   });

  //   handleScroll();

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  /**
   * ------------------------------------------------------------
   * BODY SCROLL LOCK
   * ------------------------------------------------------------
   */
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    const shouldLockScroll =
      menuOpen || mobileMenuOpen || isCartOpen || isWishlistOpen;

    document.body.style.overflow = shouldLockScroll ? "hidden" : "";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen, mobileMenuOpen, isCartOpen, isWishlistOpen]);

  /**
   * ------------------------------------------------------------
   * ESCAPE KEY
   * ------------------------------------------------------------
   */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      setMenuOpen(false);
      setMobileMenuOpen(false);
      setAccountOpen(false);
      setIsCartOpen(false);
      setIsWishlistOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  /**
   * ------------------------------------------------------------
   * CATEGORY FILTER
   *
   * CategoryFilter is the project's source of valid filter values.
   *
   * WOMEN / MEN are navigation states.
   * The actual filter values remain exactly the values defined
   * by CategoryFilter.
   *
   * Nothing is generated from PRODUCTS.
   * ------------------------------------------------------------
   */
  const categories = useMemo(() => {
    return CATEGORY_FILTERS.filter(
      (category) => category !== "WOMEN" && category !== "MEN",
    );
  }, []);

  /**
   * ------------------------------------------------------------
   * OPEN MENU
   * ------------------------------------------------------------
   */
  const openMenu = (gender: Gender = activeGender) => {
    setActiveGender(gender);
    setAccountOpen(false);
    setMobileMenuOpen(false);
    setIsCartOpen(false);
    setIsWishlistOpen(false);
    setMenuOpen(true);
  };

  /**
   * ------------------------------------------------------------
   * CLOSE MENU
   * ------------------------------------------------------------
   */
  const closeMenu = () => {
    setMenuOpen(false);
  };

  /**
   * ------------------------------------------------------------
   * HOME
   * ------------------------------------------------------------
   */
  const goHome = () => {
    closeMenu();
    setMobileMenuOpen(false);
    navigate("/");
  };

  /**
   * ------------------------------------------------------------
   * CONTACT
   * ------------------------------------------------------------
   */
  const goToContact = () => {
    closeMenu();
    setMobileMenuOpen(false);
    navigate("/contact");
  };

  /**
   * ------------------------------------------------------------
   * SHOP / CATEGORY
   *
   * Preserve the project's existing shop query format.
   * ------------------------------------------------------------
   */
  const goToCategory = (category: CategoryFilter) => {
    closeMenu();

    navigate(`/shop?category=${encodeURIComponent(category)}`);
  };

  /**
   * ------------------------------------------------------------
   * GOOGLE LOGIN
   * ------------------------------------------------------------
   */
  const handleGoogleSignIn = async () => {
    try {
      await authService.signInWithGoogle();

      setAccountOpen(false);

      showToast("Welcome to Nigah Clothes Store");
    } catch (error) {
      console.error("Google sign-in failed:", error);

      showToast("Google sign-in was cancelled or unavailable");
    }
  };

  /**
   * ------------------------------------------------------------
   * SIGN OUT
   * ------------------------------------------------------------
   */
  const handleSignOut = async () => {
    try {
      await authService.signOut();

      setAccountOpen(false);

      showToast("You have been signed out");
    } catch (error) {
      console.error("Sign-out failed:", error);

      showToast("Could not sign out right now");
    }
  };

  return (
    <>
      {/* ========================================================
          MAIN NAVBAR
      ======================================================== */}
      <header
        ref={navRef}
        className="
          fixed
          left-0
          top-0
          z-[100]
          w-full
          border-b
          border-transparent
          bg-transparent
          text-white
        "
      >
        <div
          className="
            relative
            flex
            h-[76px]
            w-full
            items-center
            px-4
            sm:h-[82px]
            sm:px-6
            lg:h-[92px]
            lg:px-8
            xl:px-12
          "
        >
          {/* ==================================================
              LEFT SIDE
          ================================================== */}
          <div
            className="
              absolute
              left-4
              top-0
              z-20
              flex
              h-full
              items-center
              gap-5
              sm:left-6
              lg:left-8
              lg:gap-7
              xl:left-12
            "
          >
            {/* HAMBURGER */}
            <button
              type="button"
              onClick={() => {
                if (menuOpen) {
                  closeMenu();
                } else {
                  openMenu();
                }
              }}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="
                group
                hidden
                h-8
                w-8
                cursor-pointer
                flex-col
                justify-center
                gap-[6px]
                lg:flex
              "
            >
              <span
                className="
                  block
                  h-[1px]
                  w-[20px]
                  bg-white
                  transition-all
                  duration-300
                  group-hover:w-[25px]
                "
              />

              <span
                className="
                  block
                  h-[1px]
                  w-[15px]
                  bg-white
                  transition-all
                  duration-300
                  group-hover:w-[25px]
                "
              />

              <span
                className="
                  block
                  h-[1px]
                  w-[20px]
                  bg-white
                  transition-all
                  duration-300
                  group-hover:w-[25px]
                "
              />
            </button>

            {/* WOMEN / MEN */}
            <nav
              aria-label="Gender navigation"
              className="
                hidden
                items-center
                gap-7
                lg:flex
              "
            >
              <button
                type="button"
                onClick={() => openMenu("WOMEN")}
                className="
                  cursor-pointer
                  text-[11px]
                  font-medium
                  uppercase
                  tracking-[0.08em]
                  text-white/90
                  transition-colors
                  duration-300
                  hover:text-white
                  xl:text-[12px]
                "
              >
                WOMEN
              </button>

              <button
                type="button"
                onClick={() => openMenu("MEN")}
                className="
                  cursor-pointer
                  text-[11px]
                  font-medium
                  uppercase
                  tracking-[0.08em]
                  text-white/90
                  transition-colors
                  duration-300
                  hover:text-white
                  xl:text-[12px]
                "
              >
                MEN
              </button>
            </nav>
          </div>

          {/* ==================================================
              CENTER LOGO
          ================================================== */}
          <div
            className="
    absolute
    left-4
    top-1/2
    z-10
    -translate-y-1/2
    flex
    items-center
    justify-start
    sm:left-5
    lg:left-1/2
    lg:-translate-x-1/2
  "
          >
            <button
              type="button"
              onClick={goHome}
              aria-label="Nigah Clothes Store Home"
              className="
      flex
      cursor-pointer
      items-center
      justify-center
      focus:outline-none
    "
            >
              <NigahLogo
                className="
        h-9
        w-9
        shrink-0
        sm:h-10
        sm:w-10
        lg:h-11
        lg:w-11
      "
              />
            </button>
          </div>

          {/* ==================================================
              RIGHT SIDE
          ================================================== */}
          <div
            className="
              absolute
              right-3
              top-0
              z-20
              flex
              h-full
              items-center
              gap-3
              sm:right-6
              sm:gap-5
              lg:right-8
              lg:gap-7
              xl:right-12
            "
          >
            {/* SEARCH */}
            <button
              type="button"
              onClick={() => {
                setAccountOpen(false);
                setSearchOpen(true);
              }}
              aria-label="Search"
              className="
                flex
                cursor-pointer
                items-center
                gap-2
                text-white/90
                transition-colors
                duration-300
                hover:text-white
              "
            >
              <Search
                className="
                  h-[15px]
                  w-[15px]
                  stroke-[1.3]
                "
              />

              <span
                className="
                  hidden
                  text-[11px]
                  uppercase
                  tracking-[0.06em]
                  lg:block
                "
              >
                SEARCH
              </span>
            </button>

            {/* ACCOUNT */}
            <div
              className="
                relative
                hidden
                sm:block
              "
            >
              <button
                type="button"
                onClick={() => {
                  if (!user) {
                    void handleGoogleSignIn();
                    return;
                  }

                  setAccountOpen((previous) => !previous);
                }}
                aria-label={user ? "Account" : "Login"}
                aria-expanded={user ? accountOpen : undefined}
                className="
                  flex
                  cursor-pointer
                  items-center
                  gap-2
                  text-white/90
                  transition-colors
                  duration-300
                  hover:text-white
                "
              >
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt=""
                    className="
                      h-5
                      w-5
                      rounded-full
                      object-cover
                    "
                  />
                ) : (
                  <User
                    className="
                      h-[15px]
                      w-[15px]
                      stroke-[1.3]
                      lg:hidden
                    "
                  />
                )}

                <span
                  className="
                    hidden
                    text-[11px]
                    uppercase
                    tracking-[0.06em]
                    lg:block
                  "
                >
                  {user ? "ACCOUNT" : "LOGIN"}
                </span>
              </button>

              {/* ACCOUNT DROPDOWN */}
              {user && accountOpen && (
                <div
                  className="
                    absolute
                    right-0
                    top-[calc(100%+18px)]
                    w-[240px]
                    border
                    border-white/10
                    bg-[#111]
                    p-5
                    shadow-2xl
                  "
                >
                  <p
                    className="
                      mb-2
                      text-[10px]
                      uppercase
                      tracking-[0.15em]
                      text-white/50
                    "
                  >
                    ACCOUNT
                  </p>

                  <p className="text-sm text-white">
                    {user.displayName || "Customer"}
                  </p>

                  <p
                    className="
                      mt-1
                      truncate
                      text-[11px]
                      text-white/40
                    "
                  >
                    {user.email}
                  </p>

                  <div
                    className="
                      mt-5
                      flex
                      flex-col
                      gap-3
                      border-t
                      border-white/10
                      pt-4
                    "
                  >
                    {isAdmin ? (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            setAccountOpen(false);
                            navigate("/admin");
                          }}
                          className="
                            cursor-pointer
                            text-left
                            text-xs
                            text-white
                            hover:text-white/60
                          "
                        >
                          ADMIN DASHBOARD
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setAccountOpen(false);
                            navigate("/admin/products");
                          }}
                          className="
                            cursor-pointer
                            text-left
                            text-xs
                            text-white/60
                            hover:text-white
                          "
                        >
                          MANAGE PRODUCTS
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setAccountOpen(false);
                            navigate("/admin/orders");
                          }}
                          className="
                            cursor-pointer
                            text-left
                            text-xs
                            text-white/60
                            hover:text-white
                          "
                        >
                          MANAGE ORDERS
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setAccountOpen(false);
                          navigate("/orders");
                        }}
                        className="
                          cursor-pointer
                          text-left
                          text-xs
                          text-white
                          hover:text-white/60
                        "
                      >
                        MY ORDERS
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => void handleSignOut()}
                      className="
                        cursor-pointer
                        text-left
                        text-xs
                        text-white/50
                        hover:text-white
                      "
                    >
                      SIGN OUT
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* WISHLIST */}
            <button
              id="nav-wishlist-button"
              type="button"
              onClick={toggleWishlist}
              aria-label="Saved Items"
              className="p-2 sm:p-2.5 text-[#F5F2EA]/85 hover:text-[#C9A24D] transition-colors relative group cursor-pointer"
            >
              <Heart className="h-4 w-4 sm:h-4.5 sm:w-4.5 stroke-[1.5]" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#C9A24D] text-[#0A0A0A] font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* BASKET */}
            <button
              id="nav-cart-button"
              onClick={toggleCart}
              aria-label="Shopping Bag"
              className="p-2 sm:p-2.5 text-[#F5F2EA]/85 hover:text-[#C9A24D] transition-colors relative group cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[1.5]" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#C9A24D] text-[#0A0A0A] font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </button>

            {/* MOBILE MENU */}
            <button
              id="nav-mobile-hamburger"
              type="button"
              onClick={() => {
                if (mobileMenuOpen) {
                  setMobileMenuOpen(false);
                  return;
                }

                setAccountOpen(false);
                setMenuOpen(false);
                setIsCartOpen(false);
                setIsWishlistOpen(false);
                setMobileMenuOpen(true);
              }}
              aria-label="Open Mobile Menu"
              aria-expanded={mobileMenuOpen}
              className="lg:hidden p-2 sm:p-2.5 text-[#F5F2EA] hover:text-[#C9A24D] transition-colors cursor-pointer"
            >
              <Menu className="h-5 w-5 sm:h-6 sm:w-6 stroke-[1.5]" />
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================
          MOBILE / CATEGORY DRAWER
      ======================================================== */}
      <div
        className={`
          fixed
          inset-0
          z-[1000]
          ${
            menuOpen
              ? "pointer-events-auto visible"
              : "pointer-events-none invisible"
          }
        `}
      >
        {/* OVERLAY */}
        <button
          type="button"
          aria-label="Close menu"
          onClick={closeMenu}
          className={`
            absolute
            inset-0
            z-0
            cursor-default
            bg-black/30
            transition-opacity
            duration-500
            ${menuOpen ? "opacity-100" : "opacity-0"}
          `}
        />

        {/* DRAWER */}
        <aside
          aria-label="Shop navigation"
          className={`
  absolute
  left-0
  top-0
  z-10
  flex
  h-full
  w-[300px]
  flex-col
  bg-[#000]
  text-white
  shadow-2xl
  border-r
  border-[#C9A24D]/20
  transition-transform
  duration-500
  ease-[cubic-bezier(0.22,1,0.36,1)]
  sm:w-[350px]
  ${menuOpen ? "translate-x-0" : "-translate-x-full"}
`}
        >
          {/* DRAWER HEADER */}
          <div
            className="
              flex
              h-[100px]
              shrink-0
              items-center
              justify-between
              border-b
              border-yellow
              px-7
            "
          >
            {/* ORIGINAL NIGAH LOGO */}
            <button
              type="button"
              onClick={goHome}
              aria-label="Home"
              className="cursor-pointer"
            >
              <NigahLogo className="h-10 w-10" />
            </button>

            {/* CLOSE */}
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
              className="
                flex
                h-8
                w-8
                cursor-pointer
                items-center
                justify-center
                transition-opacity
                duration-300
                hover:opacity-50
              "
            >
              <X
                className="
                  h-5
                  w-5
                  stroke-[1]
                "
              />
            </button>
          </div>

          {/* WOMEN / MEN */}
          <div
            className="
              flex
              h-[62px]
              shrink-0
              border-b
              border-black
            "
          >
            <button
              type="button"
              onClick={() => setActiveGender("WOMEN")}
              className={`
                relative
                flex-1
                cursor-pointer
                text-[11px]
                uppercase
                tracking-[0.08em]
                transition-colors
                duration-300
                ${activeGender === "WOMEN" ? "text-white" : "text-white/35"}
              `}
            >
              WOMEN
              {activeGender === "WOMEN" && (
                <span
                  className="
                    absolute
                    bottom-0
                    left-1/2
                    h-[3px]
                    w-[3px]
                    -translate-x-1/2
                    bg-yellow-500
                  "
                />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveGender("MEN")}
              className={`
                relative
                flex-1
                cursor-pointer
                text-[11px]
                uppercase
                tracking-[0.08em]
                transition-colors
                duration-300
                ${activeGender === "MEN" ? "text-white" : "text-white/35"}
              `}
            >
              MEN
              {activeGender === "MEN" && (
                <span
                  className="
                    absolute
                    bottom-0
                    left-1/2
                    h-[3px]
                    w-[3px]
                    -translate-x-1/2
                    bg-yellow-500
                  "
                />
              )}
            </button>
          </div>

          {/* CATEGORY LIST */}
          <div
            className="
              flex-1
              overflow-y-auto
              px-7
              py-6
            "
          >
            {categories.length > 0 ? (
              categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => goToCategory(category)}
                  className="
                    group
                    flex
                    w-full
                    cursor-pointer
                    items-center
                    justify-between
                    py-3
                    text-left
                    text-[10px]
                    uppercase
                    tracking-[0.08em]
                    text-white/55
                    transition-colors
                    duration-300
                    hover:text-white
                    sm:text-[11px]
                  "
                >
                  <span>{category}</span>

                  <span
                    className="
                      h-[3px]
                      w-[3px]
                      bg-yellow
                      opacity-0
                      transition-opacity
                      duration-300
                      group-hover:opacity-100
                    "
                  />
                </button>
              ))
            ) : (
              <p
                className="
                  py-3
                  text-[10px]
                  uppercase
                  tracking-[0.08em]
                  text-black/40
                "
              >
                No categories available
              </p>
            )}
          </div>

          {/* CONTACT */}
          <div
            className="
              shrink-0
              border-t
              border-black
              px-7
              py-5
            "
          >
            <button
              type="button"
              onClick={goToContact}
              className="
                cursor-pointer
                text-[10px]
                uppercase
                tracking-[0.08em]
                text-white/70
                transition-colors
                duration-300
                hover:text-yellow
              "
            >
              CONTACT US
            </button>
          </div>
        </aside>
      </div>

      {/* CART / WISHLIST DRAWER CLOSE CONTROLS
          These controls intentionally live above the global drawers so the
          Navbar can always close them, without changing cart/wishlist data. */}
      {/* {isCartOpen && (
        <button
          type="button"
          onClick={closeCart}
          aria-label="Close shopping bag"
          className="fixed right-4 top-5 z-[10000] flex h-10 w-10 items-center justify-center bg-[#111] text-white shadow-xl transition-opacity duration-300 hover:opacity-70 sm:right-6 sm:top-6"
        >
          <X className="h-5 w-5 stroke-[1.2]" />
        </button>
      )} */}

      {/* {isWishlistOpen && (
        <button
          type="button"
          onClick={closeWishlist}
          aria-label="Close wishlist"
          className="fixed right-4 top-5 z-[10000] flex h-10 w-10 items-center justify-center bg-[#111] text-white shadow-xl transition-opacity duration-300 hover:opacity-70 sm:right-6 sm:top-6"
        >
          <X className="h-5 w-5 stroke-[1.2]" />
        </button>
      )} */}

      {/* ORIGINAL MOBILE MENU */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
};

export default Navbar;
