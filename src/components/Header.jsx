import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ShoppingCart,
  Heart,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Layers,
  Box,
  Building2,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/categories';

const SEARCH_PLACEHOLDERS = [
  "Search 'Arduino Uno R3'...",
  "Search 'ESP32 Wi-Fi NodeMCU'...",
  "Search 'HC-SR04 Ultrasonic'...",
  "Search '60W Soldering Station'...",
  "Search '0.96 OLED Display'...",
  "Search 'SG90 Micro Servos'...",
  "Search 'Li-Po 3.7V Batteries'...",
];

export const Header = () => {
  const {
    currentView,
    navigateTo,
    cartCount,
    setIsCartOpen,
    wishlist,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [displayedPlaceholder, setDisplayedPlaceholder] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const currentWord = SEARCH_PLACEHOLDERS[placeholderIndex];
    let typingSpeed = isDeleting ? 30 : 60;

    const timer = setTimeout(() => {
      if (!isDeleting && displayedPlaceholder === currentWord) {
        setTimeout(() => setIsDeleting(true), 1800);
      } else if (isDeleting && displayedPlaceholder === "") {
        setIsDeleting(false);
        setPlaceholderIndex((prev) => (prev + 1) % SEARCH_PLACEHOLDERS.length);
      } else {
        setDisplayedPlaceholder((prev) =>
          isDeleting
            ? currentWord.substring(0, prev.length - 1)
            : currentWord.substring(0, prev.length + 1)
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedPlaceholder, isDeleting, placeholderIndex]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    navigateTo('listing');
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#EDE3CF]/95 backdrop-blur-md border-b border-[#4A5520]/25 py-3 shadow-[0_4px_25px_rgba(74,85,32,0.08)]'
            : 'bg-gradient-to-b from-[#EDE3CF] via-[#EDE3CF]/80 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div
              onClick={() => navigateTo('home')}
              className="flex items-center gap-2.5 cursor-pointer select-none group"
            >
              <div className="relative h-10 w-auto flex items-center bg-[#0B0B0A] px-2.5 py-1 rounded-xl shadow-sm border border-[#4A5520]/30 transition-transform duration-300 group-hover:scale-105">
                <img
                  src="/logo.png"
                  alt="CircuitBazzar Logo"
                  className="h-7 w-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 font-body text-sm font-semibold">
              <button
                onClick={() => navigateTo('home')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  currentView === 'home'
                    ? 'text-[#4A5520] bg-[#DFD4BD]/60 font-bold'
                    : 'text-[#171D0A] hover:text-[#4A5520]'
                }`}
              >
                Home
              </button>

              {/* Mega Menu Trigger */}
              <div
                className="relative"
                onMouseEnter={() => setIsMegaMenuOpen(true)}
                onMouseLeave={() => setIsMegaMenuOpen(false)}
              >
                <button
                  onClick={() => navigateTo('listing')}
                  className="px-3 py-1.5 rounded-lg text-[#171D0A] hover:text-[#4A5520] flex items-center gap-1.5 transition-colors"
                >
                  <span>Categories</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      isMegaMenuOpen ? 'rotate-180 text-[#4A5520]' : ''
                    }`}
                  />
                </button>

                {/* Desktop Mega Menu Dropdown */}
                <AnimatePresence>
                  {isMegaMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                      className="absolute top-full left-1/2 -translate-x-1/2 w-[780px] bg-[#FAF6ED] border-2 border-[#4A5520]/30 rounded-2xl p-6 shadow-2xl backdrop-blur-xl z-50 grid grid-cols-3 gap-6 text-[#171D0A]"
                    >
                      <div className="col-span-2">
                        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#DFD4BD]">
                          <span className="text-xs font-mono uppercase tracking-wider text-[#4A5520] font-bold">
                            Component Taxonomies
                          </span>
                          <button
                            onClick={() => {
                              setIsMegaMenuOpen(false);
                              navigateTo('listing');
                            }}
                            className="text-xs font-mono text-[#4A5520] font-bold flex items-center gap-1 hover:text-[#6B7A2A] hover:underline"
                          >
                            View All Catalog ({CATEGORIES.length}) <ArrowRight size={12} />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {CATEGORIES.map((cat) => (
                            <div
                              key={cat.id}
                              onClick={() => {
                                setIsMegaMenuOpen(false);
                                navigateTo('listing', null, cat.id);
                              }}
                              className="group/item flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#EDE3CF] transition-all cursor-pointer border border-transparent hover:border-[#4A5520]/30"
                            >
                              <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-[#EDE3CF] border border-[#4A5520]/20">
                                <img
                                  src={cat.image}
                                  alt={cat.name}
                                  className="w-full h-full object-cover mix-blend-multiply group-hover/item:scale-110 transition-transform duration-300"
                                />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-heading font-bold text-[#171D0A] group-hover/item:text-[#4A5520] truncate">
                                  {cat.name}
                                </p>
                                <p className="text-[11px] font-mono text-[#4F5938]">
                                  {cat.itemCount}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Featured Promo in Mega Menu */}
                      <div className="bg-[#EDE3CF] border border-[#4A5520]/30 rounded-xl p-4 flex flex-col justify-between">
                        <div>
                          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#4A5520]/15 text-[#4A5520] text-[10px] font-mono font-bold mb-2">
                            <Sparkles size={10} /> Maker Kits 2026
                          </div>
                          <h4 className="font-heading font-bold text-sm text-[#171D0A] mb-1">
                            Student & Lab Bundles
                          </h4>
                          <p className="text-xs text-[#4F5938] font-body mb-4">
                            Save up to 35% on complete robotics & IoT starters verified for universities.
                          </p>
                        </div>

                        <button
                          onClick={() => {
                            setIsMegaMenuOpen(false);
                            navigateTo('listing', null, 'dev-boards');
                          }}
                          className="w-full py-2 px-3 rounded-lg bg-[#4A5520] hover:bg-[#384318] text-[#F7F2E7] font-heading font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                        >
                          Explore Kits <ArrowRight size={14} className="text-[#F5C400]" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={() => navigateTo('listing')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  currentView === 'listing'
                    ? 'text-[#4A5520] bg-[#DFD4BD]/60 font-bold'
                    : 'text-[#171D0A] hover:text-[#4A5520]'
                }`}
              >
                All Components
              </button>

              <button
                onClick={() => {
                  const b2bSection = document.getElementById('b2b-section');
                  if (b2bSection) b2bSection.scrollIntoView({ behavior: 'smooth' });
                  else navigateTo('home');
                }}
                className="px-3 py-1.5 rounded-lg text-[#171D0A] hover:text-[#4A5520] transition-colors"
              >
                B2B Bulk Orders
              </button>
            </nav>

            {/* Live Search Bar with Category Select (Desktop) */}
            <form
              onSubmit={handleSearchSubmit}
              className="hidden md:flex flex-1 max-w-md items-center bg-[#FAF6ED] border-2 border-[#4A5520]/25 focus-within:border-[#4A5520] rounded-xl overflow-hidden transition-all duration-200 shadow-sm"
            >
              {/* Category Dropdown */}
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  navigateTo('listing', null, e.target.value);
                }}
                className="bg-transparent text-xs font-mono font-medium text-[#4F5938] px-2.5 py-2.5 outline-none border-r border-[#4A5520]/20 hover:text-[#171D0A] cursor-pointer"
              >
                <option value="all" className="bg-[#FAF6ED] text-[#171D0A]">All Items</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id} className="bg-[#FAF6ED] text-[#171D0A]">
                    {cat.name}
                  </option>
                ))}
              </select>

              {/* Input with live placeholder */}
              <div className="relative flex-1 flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={displayedPlaceholder}
                  className="w-full bg-transparent px-3 py-2 text-sm text-[#171D0A] placeholder-[#4F5938]/60 outline-none font-body font-medium"
                />
              </div>

              <button
                type="submit"
                className="px-3.5 py-2.5 text-[#4F5938] hover:text-[#4A5520] transition-colors"
                aria-label="Submit Search"
              >
                <Search size={16} />
              </button>
            </form>

            {/* Right Action Icons: Wishlist, Cart, Hamburger */}
            <div className="flex items-center gap-1.5 sm:gap-3">
              {/* Wishlist Button */}
              <button
                onClick={() => navigateTo('listing')}
                className="relative p-2 rounded-xl text-[#171D0A] hover:text-[#4A5520] hover:bg-[#DFD4BD]/60 transition-colors"
                title="Wishlist"
              >
                <Heart size={20} className={wishlist.length > 0 ? 'fill-[#6B7A2A] text-[#6B7A2A]' : ''} />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#6B7A2A]" />
                )}
              </button>

              {/* Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 px-3 rounded-xl bg-[#4A5520] hover:bg-[#384318] text-white transition-all flex items-center gap-2 group shadow-sm active:scale-95"
                aria-label="Open Cart"
              >
                <ShoppingCart size={18} className="text-[#F5C400]" />
                <span className="hidden sm:inline text-xs font-mono font-bold tracking-wide">
                  Cart
                </span>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0.6 }}
                    animate={{ scale: 1 }}
                    className="flex items-center justify-center min-w-5 h-5 px-1 text-[11px] font-mono font-bold bg-[#F5C400] text-[#0B0B0A] rounded-full"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-xl text-[#171D0A] hover:text-[#4A5520] hover:bg-[#DFD4BD]/60 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>

          {/* Mobile Search Bar in Header */}
          <div className="mt-3 md:hidden">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center bg-[#FAF6ED] border-2 border-[#4A5520]/25 rounded-xl overflow-hidden px-3 py-2 shadow-sm"
            >
              <Search size={16} className="text-[#4F5938] mr-2 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={displayedPlaceholder}
                className="w-full bg-transparent text-sm text-[#171D0A] placeholder-[#4F5938]/60 outline-none font-body font-medium"
              />
            </form>
          </div>
        </div>
      </header>

      {/* Dedicated Clean Off-Canvas Mobile Sidebar Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[100] overflow-hidden lg:hidden">
            {/* Dark Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-[#171D0A]/60 backdrop-blur-sm"
            />

            {/* Slide-in Drawer Container */}
            <div className="fixed inset-y-0 right-0 max-w-full flex pl-8">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                className="w-screen max-w-[320px] bg-[#FAF6ED] border-l-2 border-[#4A5520] shadow-2xl flex flex-col justify-between overflow-y-auto"
              >
                {/* Drawer Dedicated Top Bar */}
                <div>
                  <div className="p-4 border-b border-[#DFD4BD] flex items-center justify-between bg-[#EDE3CF]">
                    <div className="bg-[#0B0B0A] px-2.5 py-1 rounded-xl shadow-sm border border-[#4A5520]/30">
                      <img
                        src="/logo.png"
                        alt="CircuitBazzar"
                        className="h-6 w-auto object-contain"
                      />
                    </div>
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-8 h-8 rounded-xl bg-[#FAF6ED] border border-[#4A5520]/30 text-[#171D0A] hover:bg-[#DFD4BD] flex items-center justify-center transition-colors shadow-sm"
                      aria-label="Close menu"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Navigation Links inside Drawer */}
                  <div className="p-4 space-y-4">
                    {/* Primary Navigation */}
                    <div className="space-y-1">
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          navigateTo('home');
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-sm font-heading font-bold text-[#171D0A] hover:bg-[#EDE3CF] flex items-center justify-between transition-colors"
                      >
                        <span>Home</span>
                        <ArrowRight size={14} className="text-[#4A5520]" />
                      </button>

                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          navigateTo('listing');
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-sm font-heading font-bold text-[#4A5520] bg-[#EDE3CF] flex items-center justify-between shadow-sm"
                      >
                        <span>All Products & Catalog</span>
                        <ArrowRight size={14} className="text-[#4A5520]" />
                      </button>

                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          navigateTo('cart');
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-sm font-heading font-bold text-[#171D0A] hover:bg-[#EDE3CF] flex items-center justify-between transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <ShoppingCart size={15} className="text-[#4A5520]" />
                          <span>Shopping Cart ({cartCount})</span>
                        </span>
                        <ArrowRight size={14} className="text-[#4A5520]" />
                      </button>
                    </div>

                    {/* Categories Taxonomies */}
                    <div className="pt-2 border-t border-[#DFD4BD]">
                      <span className="text-[10px] font-mono text-[#4A5520] font-bold uppercase tracking-wider block mb-2 px-1">
                        Categories
                      </span>
                      <div className="space-y-1">
                        {CATEGORIES.map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              navigateTo('listing', null, cat.id);
                            }}
                            className="w-full text-left px-3 py-2 rounded-xl text-xs font-heading font-bold text-[#171D0A] hover:bg-[#EDE3CF] flex items-center justify-between transition-colors"
                          >
                            <span className="truncate">{cat.name}</span>
                            <span className="text-[9px] font-mono text-[#4F5938] bg-[#EDE3CF] px-1.5 py-0.5 rounded border border-[#DFD4BD]">
                              {cat.itemCount.split(' ')[0]}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Special Sections */}
                    <div className="pt-2 border-t border-[#DFD4BD] space-y-1">
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          navigateTo('home');
                          setTimeout(() => {
                            document.getElementById('project-kits')?.scrollIntoView({ behavior: 'smooth' });
                          }, 150);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-heading font-bold text-[#171D0A] hover:bg-[#EDE3CF] flex items-center justify-between"
                      >
                        <span className="flex items-center gap-1.5">
                          <Box size={14} className="text-[#4A5520]" />
                          <span>Student & Project Kits</span>
                        </span>
                        <ArrowRight size={13} className="text-[#4A5520]" />
                      </button>

                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          navigateTo('home');
                          setTimeout(() => {
                            document.getElementById('b2b-section')?.scrollIntoView({ behavior: 'smooth' });
                          }, 150);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-heading font-bold text-[#171D0A] hover:bg-[#EDE3CF] flex items-center justify-between"
                      >
                        <span className="flex items-center gap-1.5">
                          <Building2 size={14} className="text-[#4A5520]" />
                          <span>B2B Bulk Order Quote</span>
                        </span>
                        <ArrowRight size={13} className="text-[#4A5520]" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Drawer Dedicated Footer */}
                <div className="p-4 border-t border-[#DFD4BD] bg-[#EDE3CF]/70 text-[10px] font-mono text-[#4F5938] space-y-1">
                  <div className="flex items-center gap-1.5 text-[#4A5520] font-bold">
                    <CheckCircle2 size={12} />
                    <span>24H DISPATCH • VERIFIED SILICON</span>
                  </div>
                  <p>BANGALORE TECH HUB: +91 80 4920-BAZZAR</p>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
