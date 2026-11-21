import React from 'react';
import { useShop } from './context/ShopContext';
import { useLenis } from './hooks/useLenis';
import { WelcomeScreen } from './components/WelcomeScreen';
import { CustomCursor } from './components/CustomCursor';
import { Header } from './components/Header';
import { MobileBottomNav } from './components/MobileBottomNav';
import { CartDrawer } from './components/CartDrawer';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';

import { HomePage } from './pages/HomePage';
import { ProductListingPage } from './pages/ProductListingPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';

export const App = () => {
  const { currentView, showIntro, setShowIntro } = useShop();

  // Initialize Lenis smooth scroll for desktop
  useLenis();

  return (
    <div className="relative min-h-screen bg-[#EDE3CF] text-[#171D0A] selection:bg-[#F5C400] selection:text-[#0B0B0A] overflow-x-hidden">
      {/* Animated PCB Trace Welcome Screen */}
      {showIntro && <WelcomeScreen onComplete={() => setShowIntro(false)} />}

      {/* Desktop Custom Follower Cursor */}
      <CustomCursor />

      {/* Sticky Header with Mega Menu & Search */}
      <Header />

      {/* Dynamic View Router */}
      {currentView === 'home' && <HomePage />}
      {currentView === 'listing' && <ProductListingPage />}
      {currentView === 'detail' && <ProductDetailPage />}
      {currentView === 'cart' && <CartPage />}

      {/* Slide-in Cart Drawer */}
      <CartDrawer />

      {/* Global Interactive Notification Toast */}
      <Toast />

      {/* Sticky Bottom Nav for Mobile Screens */}
      <MobileBottomNav />

      {/* Comprehensive Footer */}
      <Footer />
    </div>
  );
};
