import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowRight, Cpu, Zap, Shield, Sparkles, Box } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { IMAGES } from '../../data/images';
import { SafeImage } from '../SafeImage';

export const HeroSection = () => {
  const { navigateTo } = useShop();

  // Mouse Parallax for desktop composition
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [8, -8]);
  const rotateY = useTransform(mouseX, [-300, 300], [-8, 8]);
  const floatY = useTransform(mouseY, [-300, 300], [-12, 12]);
  const floatX = useTransform(mouseX, [-300, 300], [-12, 12]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Stats Count-up simulation
  const [stats, setStats] = useState({ products: 0, makers: 0, dispatch: 0 });

  useEffect(() => {
    const duration = 1800;
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

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-[90vh] lg:min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 flex flex-col justify-center overflow-hidden bg-[#0B0B0A]"
    >
      {/* Subtle Animated Circuit Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#6B7A2A15_1px,transparent_1px),linear-gradient(to_bottom,#6B7A2A15_1px,transparent_1px)] bg-[size:3rem_3rem]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0A] via-transparent to-[#0B0B0A]" />
      </div>

      {/* Ambient Lighting Orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#6B7A2A]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#F5C400]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Live Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171715] border border-[#6B7A2A]/40 mb-6 shadow-sm"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F5C400] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F5C400]"></span>
              </span>
              <span className="text-xs font-mono font-medium text-[#EDE3CF] tracking-wide">
                AUTHENTIC SILICON • FAST DISPATCH IN INDIA
              </span>
            </motion.div>

            {/* Word-by-Word Headline Reveal */}
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.1] mb-6 flex flex-wrap gap-x-3.5 gap-y-1">
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
                        ? 'text-[#F5C400]'
                        : 'text-white'
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
              className="font-body text-base sm:text-lg text-[#EDE3CF]/80 max-w-xl leading-relaxed mb-8"
            >
              Direct factory-sourced microcontrollers, ultrasonic sensors, ICs, precision soldering stations, and curated maker kits. Verified datasheets, zero counterfeit clones.
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
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#F5C400] hover:bg-[#E5B700] text-[#0B0B0A] font-heading font-bold text-sm tracking-wide transition-all shadow-[0_4px_25px_rgba(245,196,0,0.25)] flex items-center justify-center gap-2 group active:scale-98"
              >
                <span>Shop Components</span>
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>

              <button
                onClick={() => {
                  const kitsSection = document.getElementById('project-kits');
                  if (kitsSection) kitsSection.scrollIntoView({ behavior: 'smooth' });
                  else navigateTo('listing');
                }}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl border border-[#EDE3CF]/30 hover:border-[#6B7A2A] bg-[#141412] hover:bg-[#1C1C19] text-white font-heading font-semibold text-sm transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <Box size={16} className="text-[#A3B04B]" />
                <span>Explore Kits</span>
              </button>
            </motion.div>

            {/* Live Animated Count-Up Stats Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-3 gap-6 sm:gap-10 pt-10 mt-10 border-t border-[#262622] w-full max-w-xl"
            >
              <div>
                <p className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
                  {stats.products.toLocaleString('en-IN')}+
                </p>
                <p className="font-mono text-xs text-[#A3B04B] tracking-wider mt-0.5">
                  VERIFIED PARTS
                </p>
              </div>
              <div>
                <p className="font-heading font-extrabold text-2xl sm:text-3xl text-[#F5C400]">
                  {(stats.makers / 1000).toFixed(0)}K+
                </p>
                <p className="font-mono text-xs text-[#A3B04B] tracking-wider mt-0.5">
                  MAKERS & LABS
                </p>
              </div>
              <div>
                <p className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
                  {stats.dispatch}h
                </p>
                <p className="font-mono text-xs text-[#A3B04B] tracking-wider mt-0.5">
                  DISPATCH SLA
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Real Photo Composition with Mouse Parallax & Float */}
          <div className="lg:col-span-5 relative perspective-1000 flex items-center justify-center">
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }}
              className="relative w-full max-w-md sm:max-w-lg aspect-square flex items-center justify-center"
            >
              {/* Background Circular PCB Halo */}
              <div className="absolute inset-4 rounded-3xl border border-[#6B7A2A]/30 bg-gradient-to-br from-[#171715] to-[#0B0B0A] shadow-2xl" />

              {/* Main Board Hero Real Photo */}
              <motion.div
                style={{ y: floatY, x: floatX }}
                className="relative z-10 w-4/5 aspect-square rounded-2xl overflow-hidden bg-[#EDE3CF] p-4 shadow-2xl border border-[#6B7A2A]/40"
              >
                <SafeImage
                  src={IMAGES.hero.mainBoard}
                  alt="Arduino & Microcontroller Development Board"
                  mixBlend={true}
                  aspectRatio="aspect-square"
                  className="w-full h-full object-cover"
                />

                <div className="absolute top-3 left-3 bg-[#0B0B0A]/85 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-[#F5C400] border border-[#6B7A2A]/30 flex items-center gap-1.5">
                  <Cpu size={12} />
                  <span>ATMEL ATMEGA328P</span>
                </div>
              </motion.div>

              {/* Floating Sensor Card Top Right */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{
                  y: useTransform(mouseY, [-300, 300], [15, -15]),
                  x: useTransform(mouseX, [-300, 300], [15, -15]),
                }}
                className="absolute -top-4 -right-2 sm:-right-4 z-20 w-36 sm:w-44 bg-[#1A1A17] border border-[#6B7A2A] rounded-xl p-2.5 shadow-2xl backdrop-blur-md"
              >
                <div className="w-full h-20 bg-[#EDE3CF] rounded-lg overflow-hidden mb-2 p-1">
                  <SafeImage
                    src={IMAGES.hero.sensorModule}
                    alt="Sensor Module"
                    mixBlend={true}
                    aspectRatio="aspect-auto"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-[#EDE3CF]">HC-SR04</span>
                  <span className="text-[#F5C400] font-bold">₹110</span>
                </div>
              </motion.div>

              {/* Floating Chip Badge Bottom Left */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{
                  y: useTransform(mouseY, [-300, 300], [-15, 15]),
                  x: useTransform(mouseX, [-300, 300], [-15, 15]),
                }}
                className="absolute -bottom-4 -left-2 sm:-left-4 z-20 bg-[#141412] border border-[#F5C400]/40 rounded-xl p-3 shadow-2xl backdrop-blur-md flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-lg bg-[#6B7A2A]/20 border border-[#6B7A2A] flex items-center justify-center text-[#A3B04B]">
                  <Zap size={18} />
                </div>
                <div>
                  <p className="text-xs font-heading font-bold text-white">Genuine Silicon</p>
                  <p className="text-[10px] font-mono text-[#A3B04B]">100% Datasheet Tested</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
