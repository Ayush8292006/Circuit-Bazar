import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  Cpu,
  Layers,
  Zap,
  ArrowRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/categories';
import { BRANDS } from '../data/kits';

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

  // Scroll detection for sticky header transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typing animation for search input placeholder
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
    navigateTo('listing');
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0B0B0A]/90 backdrop-blur-md border-b border-[#6B7A2A]/30 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'bg-gradient-to-b from-[#0B0B0A]/95 via-[#0B0B0A]/70 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div
              onClick={() => navigateTo('home')}
              className="flex items-center gap-2.5 cursor-pointer select-none group"
            >
              <div className="relative h-10 w-auto flex items-center">
                <img
                  src="/logo.png"
                  alt="CircuitBazzar Logo"
                  className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to text logo if image fails
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 font-body text-sm font-medium">
              <button
                onClick={() => navigateTo('home')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  currentView === 'home'
                    ? 'text-[#F5C400] bg-[#141412]'
                    : 'text-[#EDE3CF] hover:text-[#F5C400]'
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
                  className="px-3 py-1.5 rounded-lg text-[#EDE3CF] hover:text-[#F5C400] flex items-center gap-1.5 transition-colors"
                >
                  <span>Categories</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      isMegaMenuOpen ? 'rotate-180 text-[#F5C400]' : ''
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
                      className="absolute top-full left-1/2 -translate-x-1/2 w-[780px] bg-[#141412] border border-[#6B7A2A]/40 rounded-2xl p-6 shadow-2xl backdrop-blur-xl z-50 grid grid-cols-3 gap-6"
                    >
                      <div className="col-span-2">
                        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#262622]">
                          <span className="text-xs font-mono uppercase tracking-wider text-[#A3B04B]">
                            Component Taxonomies
                          </span>
                          <button
                            onClick={() => {
                              setIsMegaMenuOpen(false);
                              navigateTo('listing');
                            }}
                            className="text-xs font-mono text-[#F5C400] flex items-center gap-1 hover:underline"
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
                              className="group/item flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#1E1E1B] transition-all cursor-pointer border border-transparent hover:border-[#6B7A2A]/30"
                            >
                              <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-[#EDE3CF] border border-[#6B7A2A]/20">
                                <img
                                  src={cat.image}
                                  alt={cat.name}
                                  className="w-full h-full object-cover mix-blend-multiply group-hover/item:scale-110 transition-transform duration-300"
                                />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-heading font-semibold text-white group-hover/item:text-[#F5C400] truncate">
                                  {cat.name}
                                </p>
                                <p className="text-[11px] font-mono text-[#EDE3CF]/60">
                                  {cat.itemCount}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Featured Promo in Mega Menu */}
                      <div className="bg-[#1E1E1B] border border-[#6B7A2A]/30 rounded-xl p-4 flex flex-col justify-between">
                        <div>
                          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#6B7A2A]/30 text-[#A3B04B] text-[10px] font-mono mb-2">
                            <Sparkles size={10} /> Maker Kits 2026
                          </div>
                          <h4 className="font-heading font-bold text-sm text-white mb-1">
                            Student & Lab Bundles
                          </h4>
                          <p className="text-xs text-[#EDE3CF]/70 font-body mb-4">
                            Save up to 35% on complete robotics & IoT starters verified for universities.
                          </p>
                        </div>

                        <button
                          onClick={() => {
                            setIsMegaMenuOpen(false);
                            navigateTo('listing', null, 'dev-boards');
                          }}
                          className="w-full py-2 px-3 rounded-lg bg-[#F5C400] text-[#0B0B0A] font-heading font-bold text-xs hover:bg-[#E5B700] transition-colors flex items-center justify-center gap-1.5"
                        >
                          Explore Kits <ArrowRight size={14} />
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
                    ? 'text-[#F5C400] bg-[#141412]'
                    : 'text-[#EDE3CF] hover:text-[#F5C400]'
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
                className="px-3 py-1.5 rounded-lg text-[#EDE3CF] hover:text-[#F5C400] transition-colors"
              >
                B2B Bulk Orders
              </button>
            </nav>

            {/* Live Search Bar with Category Select */}
            <form
              onSubmit={handleSearchSubmit}
              className="hidden md:flex flex-1 max-w-md items-center bg-[#171715] border border-[#262622] focus-within:border-[#F5C400] rounded-xl overflow-hidden transition-all duration-200"
            >
              {/* Category Dropdown */}
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  navigateTo('listing', null, e.target.value);
                }}
                className="bg-transparent text-xs font-mono text-[#EDE3CF]/80 px-2.5 py-2.5 outline-none border-r border-[#262622] hover:text-white cursor-pointer"
              >
                <option value="all" className="bg-[#141412] text-white">All Items</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id} className="bg-[#141412] text-white">
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
                  className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder-[#EDE3CF]/40 outline-none font-body"
                />
              </div>

              <button
                type="submit"
                className="px-3.5 py-2.5 text-[#EDE3CF]/70 hover:text-[#F5C400] transition-colors"
                aria-label="Submit Search"
              >
                <Search size={16} />
              </button>
            </form>

            {/* Right Action Icons: Account, Wishlist, Cart */}
            <div className="flex items-center gap-1.5 sm:gap-3">
              {/* Wishlist Button */}
              <button
                onClick={() => navigateTo('listing')}
                className="relative p-2 rounded-xl text-[#EDE3CF] hover:text-[#F5C400] hover:bg-[#171715] transition-colors"
                title="Wishlist"
              >
                <Heart size={20} className={wishlist.length > 0 ? 'fill-[#F5C400] text-[#F5C400]' : ''} />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#F5C400]" />
                )}
              </button>

              {/* Cart Drawer Trigger with animated count badge */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-xl bg-[#171715] hover:bg-[#20201c] border border-[#262622] hover:border-[#6B7A2A] text-white hover:text-[#F5C400] transition-all flex items-center gap-2 group"
                aria-label="Open Cart"
              >
                <ShoppingCart size={20} />
                <span className="hidden sm:inline text-xs font-mono font-semibold text-[#EDE3CF] group-hover:text-[#F5C400]">
                  Cart
                </span>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0.6 }}
                    animate={{ scale: 1 }}
                    className="flex items-center justify-center min-w-5 h-5 px-1.5 text-[11px] font-mono font-bold bg-[#F5C400] text-[#0B0B0A] rounded-full"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-[#EDE3CF] hover:text-[#F5C400] hover:bg-[#171715] transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar in Header */}
          <div className="mt-3 md:hidden">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center bg-[#171715] border border-[#262622] rounded-xl overflow-hidden px-3 py-2"
            >
              <Search size={16} className="text-[#EDE3CF]/60 mr-2 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={displayedPlaceholder}
                className="w-full bg-transparent text-sm text-white placeholder-[#EDE3CF]/40 outline-none font-body"
              />
            </form>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Staggered Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-[#0B0B0A] pt-24 pb-20 px-6 flex flex-col justify-between overflow-y-auto"
          >
            <div className="space-y-6">
              <div className="border-b border-[#262622] pb-4">
                <span className="text-xs font-mono text-[#A3B04B] uppercase tracking-wider">
                  Menu & Categories
                </span>
              </div>

              <div className="flex flex-col space-y-4">
                {[
                  { label: "Home", action: () => navigateTo('home') },
                  { label: "All Products & Filters", action: () => navigateTo('listing') },
                  { label: "Development Boards", action: () => navigateTo('listing', null, 'dev-boards') },
                  { label: "Sensors & Detectors", action: () => navigateTo('listing', null, 'sensors-modules') },
                  { label: "Passives & ICs", action: () => navigateTo('listing', null, 'passives-ics') },
                  { label: "Robotics & Motors", action: () => navigateTo('listing', null, 'robotics-motors') },
                  { label: "Soldering & Tools", action: () => navigateTo('listing', null, 'tools-soldering') },
                  { label: "B2B Bulk Orders", action: () => {
                    navigateTo('home');
                    setTimeout(() => {
                      document.getElementById('b2b-section')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }},
                ].map((item, idx) => (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      item.action();
                    }}
                    className="text-left font-heading font-semibold text-lg text-white hover:text-[#F5C400] flex items-center justify-between py-1"
                  >
                    <span>{item.label}</span>
                    <ArrowRight size={16} className="text-[#6B7A2A]" />
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#262622] text-xs font-mono text-[#EDE3CF]/60">
              <p>CIRCUITBAZZAR CORP. BANGALORE</p>
              <p className="text-[#A3B04B] mt-1">24H DISPATCH • VERIFIED SILICON</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
