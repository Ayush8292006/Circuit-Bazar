import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShoppingCart, Check, ShieldCheck, Box } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';
import { SafeImage } from '../SafeImage';

export const HeroSection = () => {
  const { navigateTo, addToCart } = useShop();

  // Flagship component for clean showcase
  const [selectedHeroIndex, setSelectedHeroIndex] = useState(0);

  const heroShowcaseItems = [
    {
      product: PRODUCTS[0], // Arduino Uno
      badge: "ORIGINAL ATMEGA328P",
      specs: "16 MHz • 5V Logic • 14 Digital I/O",
      tag: "Best Seller"
    },
    {
      product: PRODUCTS[1], // ESP32
      badge: "DUAL-CORE WI-FI + BLE",
      specs: "240 MHz • 4MB Flash • 36 GPIOs",
      tag: "IoT Pick"
    },
    {
      product: PRODUCTS[2], // Raspberry Pi 4
      badge: "QUAD-CORE 64-BIT SBC",
      specs: "4GB RAM • Dual 4K HDMI • Gigabit LAN",
      tag: "High Power"
    }
  ];

  const currentItem = heroShowcaseItems[selectedHeroIndex];

  // Stats Count-up simulation
  const [stats, setStats] = useState({ products: 0, makers: 0, dispatch: 0 });

  useEffect(() => {
    const duration = 1600;
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / duration);
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      setStats({
        products: Math.floor(easeProgress * 10000),
        makers: Math.floor(easeProgress * 50000),
        dispatch: Math.floor(easeProgress * 24),
      });

      if (progress >= 1) clearInterval(timer);
    }, 30);

    return () => clearInterval(timer);
  }, []);

  const headlineWords = ["Build", "what's", "next.", "Component", "by", "component."];

  const handleQuickAdd = () => {
    addToCart(currentItem.product, 1);
  };

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 flex flex-col justify-center overflow-hidden bg-[#EDE3CF] text-[#171D0A]">
      {/* Precision Industrial Grid Background on Beige */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#4A552020_1px,transparent_1px),linear-gradient(to_bottom,#4A552020_1px,transparent_1px)] bg-[size:2.5rem_2.5rem]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#EDE3CF] via-transparent to-[#EDE3CF]" />
      </div>

      {/* Subtle Olive Ambient Glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#6B7A2A]/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#4A5520]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Headlines & Typography */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Live Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF6ED] border border-[#4A5520]/30 mb-6 shadow-soft"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6B7A2A] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4A5520]"></span>
              </span>
              <span className="text-xs font-mono font-bold text-[#4A5520] tracking-wide">
                AUTHENTIC SILICON • 24H EXPRESS DISPATCH
              </span>
            </motion.div>

            {/* Word-by-Word Headline Reveal */}
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#171D0A] leading-[1.08] mb-6 flex flex-wrap gap-x-3.5 gap-y-1">
              {headlineWords.map((word, idx) => (
                <span key={idx} className="overflow-hidden inline-block">
                  <motion.span
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.7,
                      delay: idx * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`inline-block ${
                      word === 'next.' || word === 'component.'
                        ? 'text-[#4A5520]'
                        : 'text-[#171D0A]'
                    }`}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Sub-paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="font-body text-base sm:text-lg text-[#3E4924] max-w-xl leading-relaxed mb-8 font-medium"
            >
              Factory-sourced microcontrollers, ultrasonic transceivers, optocoupled relays, and precision soldering gear. Tested datasheets, zero clone counterfeits.
            </motion.p>

            {/* Dual CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              <button
                onClick={() => navigateTo('listing')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#4A5520] hover:bg-[#384318] text-[#F7F2E7] font-heading font-bold text-sm tracking-wide transition-all shadow-[0_4px_25px_rgba(74,85,32,0.25)] flex items-center justify-center gap-2 group active:scale-98"
              >
                <span>Shop Components</span>
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1 text-[#F5C400]"
                />
              </button>

              <button
                onClick={() => {
                  const kitsSection = document.getElementById('project-kits');
                  if (kitsSection) kitsSection.scrollIntoView({ behavior: 'smooth' });
                  else navigateTo('listing');
                }}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl border-2 border-[#4A5520]/40 hover:border-[#4A5520] bg-[#FAF6ED] hover:bg-[#F3EBD9] text-[#171D0A] font-heading font-bold text-sm transition-all flex items-center justify-center gap-2 active:scale-98 shadow-sm"
              >
                <Box size={16} className="text-[#4A5520]" />
                <span>Explore Kits</span>
              </button>
            </motion.div>

            {/* Live Animated Count-Up Stats Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-3 gap-6 sm:gap-10 pt-8 mt-8 border-t-2 border-[#DFD4BD] w-full max-w-xl"
            >
              <div>
                <p className="font-heading font-extrabold text-2xl sm:text-3xl text-[#171D0A]">
                  {stats.products.toLocaleString('en-IN')}+
                </p>
                <p className="font-mono text-xs text-[#4A5520] font-bold tracking-wider mt-0.5">
                  VERIFIED PARTS
                </p>
              </div>
              <div>
                <p className="font-heading font-extrabold text-2xl sm:text-3xl text-[#4A5520]">
                  {(stats.makers / 1000).toFixed(0)}K+
                </p>
                <p className="font-mono text-xs text-[#4A5520] font-bold tracking-wider mt-0.5">
                  MAKERS & LABS
                </p>
              </div>
              <div>
                <p className="font-heading font-extrabold text-2xl sm:text-3xl text-[#171D0A]">
                  {stats.dispatch}h
                </p>
                <p className="font-mono text-xs text-[#4A5520] font-bold tracking-wider mt-0.5">
                  DISPATCH SLA
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Clean, Elegant, High-End Hardware Showcase */}
          <div className="lg:col-span-6 w-full">
            <div className="bg-[#FAF6ED] border-2 border-[#4A5520]/25 rounded-3xl p-5 sm:p-6 shadow-elevated">
              {/* Top Meta Header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#DFD4BD]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#4A5520]" />
                  <span className="text-xs font-mono font-bold text-[#4A5520] uppercase tracking-wider">
                    {currentItem.badge}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#4F5938] font-bold bg-[#EDE3CF] px-2.5 py-0.5 rounded-full border border-[#4A5520]/20">
                  {currentItem.tag}
                </span>
              </div>

              {/* Main Product Image Stage - Clean, Sharp, No Clutter */}
              <div
                onClick={() => navigateTo('detail', currentItem.product.id)}
                className="relative w-full aspect-[4/3] rounded-2xl bg-[#EDE3CF] p-6 overflow-hidden flex items-center justify-center border border-[#4A5520]/20 cursor-pointer group"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentItem.product.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <SafeImage
                      src={currentItem.product.image}
                      alt={currentItem.product.name}
                      mixBlend={true}
                      aspectRatio="aspect-auto"
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Subtle Hover Hint */}
                <div className="absolute bottom-3 right-3 bg-[#FAF6ED]/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono font-bold text-[#4A5520] border border-[#4A5520]/30 opacity-0 group-hover:opacity-100 transition-opacity">
                  VIEW FULL SPECS →
                </div>
              </div>

              {/* Product Info & Quick Action Bar */}
              <div className="mt-4 pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3
                    onClick={() => navigateTo('detail', currentItem.product.id)}
                    className="font-heading font-bold text-base text-[#171D0A] hover:text-[#4A5520] cursor-pointer transition-colors"
                  >
                    {currentItem.product.name}
                  </h3>
                  <p className="text-xs font-mono text-[#4F5938] mt-0.5">
                    {currentItem.specs}
                  </p>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span className="font-heading font-extrabold text-xl text-[#171D0A]">
                    ₹{currentItem.product.price.toLocaleString('en-IN')}
                  </span>
                  <button
                    onClick={handleQuickAdd}
                    className="py-2.5 px-4 rounded-xl bg-[#4A5520] hover:bg-[#384318] text-[#F7F2E7] font-heading font-bold text-xs transition-all flex items-center gap-1.5 shadow-md active:scale-95"
                  >
                    <ShoppingCart size={13} className="text-[#F5C400]" />
                    <span>Quick Add</span>
                  </button>
                </div>
              </div>

              {/* Minimal Clean Switcher Tabs at Bottom */}
              <div className="mt-4 pt-3 border-t border-[#DFD4BD] flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#4F5938] font-semibold">
                  FEATURED HARDWARE:
                </span>
                <div className="flex items-center gap-1.5">
                  {heroShowcaseItems.map((item, idx) => (
                    <button
                      key={item.product.id}
                      onClick={() => setSelectedHeroIndex(idx)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                        selectedHeroIndex === idx
                          ? 'bg-[#4A5520] text-[#F7F2E7] shadow-sm'
                          : 'bg-[#EDE3CF] text-[#4F5938] hover:text-[#171D0A] border border-[#4A5520]/20'
                      }`}
                    >
                      {item.product.name.split(' ')[0]} {item.product.name.split(' ')[1]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
