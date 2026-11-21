import React, { useState } from 'react';
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

export const App = () => {
  const { currentView } = useShop();

  // Initialize Lenis smooth scroll for desktop
  useLenis();

  // Check if user visited in this session (skip on mobile to prevent any black screen lag)
  const [showIntro, setShowIntro] = useState(() => {
    try {
      const isMobile = window.innerWidth < 768 || ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
      if (isMobile) return false;
      return !sessionStorage.getItem('circuitbazzar_visited');
    } catch (e) {
      return false;
    }
  });

  return (
    <div className="relative min-h-screen bg-[#EDE3CF] text-[#171D0A] selection:bg-[#F5C400] selection:text-[#0B0B0A] overflow-x-hidden">
      {/* Intro Welcome Screen (Desktop first visit only) */}
      {showIntro && <WelcomeScreen onComplete={() => setShowIntro(false)} />}

      {/* Desktop Custom Follower Cursor */}
      <CustomCursor />

      {/* Sticky Header with Mega Menu & Search */}
      <Header />

      {/* Dynamic View Router */}
      {currentView === 'home' && <HomePage />}
      {currentView === 'listing' && <ProductListingPage />}
      {currentView === 'detail' && <ProductDetailPage />}

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
