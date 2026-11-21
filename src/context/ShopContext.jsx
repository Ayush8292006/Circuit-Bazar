import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  // Navigation & View State
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'listing' | 'detail'
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Welcome Intro Animation State
  const [showIntro, setShowIntro] = useState(() => {
    try {
      return !sessionStorage.getItem('circuitbazzar_visited');
    } catch (e) {
      return true;
    }
  });

  const replayIntro = () => {
    try {
      sessionStorage.removeItem('circuitbazzar_visited');
    } catch (e) {}
    setShowIntro(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart State (stored in localStorage)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('circuitbazzar_cart');
      return saved ? JSON.parse(saved) : [
        { product: PRODUCTS[0], quantity: 1 },
        { product: PRODUCTS[3], quantity: 2 }
      ];
    } catch (e) {
      return [{ product: PRODUCTS[0], quantity: 1 }];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('circuitbazzar_wishlist');
      return saved ? JSON.parse(saved) : [PRODUCTS[1].id, PRODUCTS[2].id];
    } catch (e) {
      return [];
    }
  });

  // Notification Toast
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  useEffect(() => {
    try {
      localStorage.setItem('circuitbazzar_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('circuitbazzar_wishlist', JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist]);

  // Cart operations
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });
    showToast(`Added ${quantity} × ${product.name.slice(0, 24)}... to cart!`);
  };

  const updateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your wishlist!');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  // Totals
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const freeShippingThreshold = 999;
  const freeShippingProgress = Math.min(
    100,
    Math.round((cartSubtotal / freeShippingThreshold) * 100)
  );

  // Navigation Helper
  const navigateTo = (view, productId = null, category = null) => {
    if (category) setSelectedCategory(category);
    if (productId) setSelectedProductId(productId);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ShopContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedProductId,
        setSelectedProductId,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        showIntro,
        setShowIntro,
        replayIntro,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        freeShippingThreshold,
        freeShippingProgress,
        navigateTo,
        toast,
        showToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
