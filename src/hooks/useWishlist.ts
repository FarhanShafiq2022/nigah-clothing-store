import { useAtelier } from '../context/AtelierContext';

export const useWishlist = () => {
  const { wishlist, toggleWishlist, isInWishlist, wishlistCount, isWishlistOpen, setIsWishlistOpen } = useAtelier();
  return {
    wishlist,
    toggleWishlist,
    isInWishlist,
    wishlistCount,
    isWishlistOpen,
    setIsWishlistOpen
  };
};
