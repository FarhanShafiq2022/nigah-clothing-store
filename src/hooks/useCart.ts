import { useAtelier } from '../context/AtelierContext';

export const useCart = () => {
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartSubtotal, isCartOpen, setIsCartOpen } = useAtelier();
  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartSubtotal,
    isCartOpen,
    setIsCartOpen
  };
};
