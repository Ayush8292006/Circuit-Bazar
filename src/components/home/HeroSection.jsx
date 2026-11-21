import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Cpu, Zap, Shield, Sparkles, Box, Check, ShoppingCart, Crosshair, Terminal } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';
import { SafeImage } from '../SafeImage';

const HERO_COMPONENTS = [
  {
    id: "cb-mcu-uno3",
    code: "MCU-UNO-R3",
    name: "Arduino Uno R3",
    fullName: "Arduino Uno R3 ATmega328P",
    category: "Microcontroller Board",
    price: 1850,
    originalPrice: 2200,
    stock: 48,
    image: PRODUCTS[0].image,
    telemetry: {
      voltage: "5.0V DC",
      clock: "16.0 MHz",
      memory: "32 KB Flash",
      gpio: "14 Digital / 6 PWM",
      bus: "UART / I2C / SPI",
      socket: "DIP-28 Socket"
    },
    probes: [
      { id: "mcu", x: 64, y: 65, name: "ATmega328P MCU", note: "8-bit AVR RISC processor, 16 MIPS" },
      { id: "reg", x: 23, y: 78, name: "Voltage Regulator", note: "Dual 5V / 3.3V linear LDO system" },
      { id: "com", x: 20, y: 25, name: "USB Serial Bridge", note: "ATmega16U2 for high-speed DFU upload" },
      { id: "io", x: 68, y: 14, name: "Digital PWM Rails", note: "14 TTL headers with 20mA sinking" }
    ]
  },
  {
    id: "cb-mcu-esp32",
    code: "ESP32-WROOM",
    name: "ESP32 NodeMCU",
    fullName: "ESP32 NodeMCU Wi-Fi + BLE",
    category: "IoT Microcontroller",
    price: 499,
    originalPrice: 650,
    stock: 120,
    image: PRODUCTS[1].image,
    telemetry: {
      voltage: "3.3V Logic",
      clock: "240 MHz",
      memory: "4 MB SPI Flash",
      gpio: "36 Multi-Function",
      bus: "Wi-Fi + BLE 4.2",
      socket: "NodeMCU Breadboard"
    },
    probes: [
      { id: "core", x: 50, y: 44, name: "Xtensa Dual-Core", note: "32-bit LX6 microprocessor @ 240MHz" },
      { id: "ant", x: 50, y: 15, name: "2.4GHz Antenna", note: "Built-in PCB inverted-F Wi-Fi & BLE" },
      { id: "usb", x: 50, y: 84, name: "CP2102 Bridge", note: "Auto-reset flash circuitry & Micro-USB" }
    ]
  },
  {
    id: "cb-sbc-rpi4",
    code: "RPI4-MOD-4GB",
    name: "Raspberry Pi 4",
    fullName: "Raspberry Pi 4 Model B (4GB)",
    category: "Single Board Computer",
    price: 5890,
    originalPrice: 6500,
    stock: 16,
    image: PRODUCTS[2].image,
    telemetry: {
      voltage: "5.0V / 3A Type-C",
      clock: "1.5 GHz Quad",
      memory: "4GB LPDDR4",
      gpio: "40-Pin Header",
      bus: "Dual 4K Micro-HDMI",
      socket: "Single Board Computer"
    },
    probes: [
      { id: "soc", x: 48, y: 48, name: "Broadcom BCM2711", note: "Quad-core Cortex-A72 (ARM v8) 64-bit" },
      { id: "ram", x: 68, y: 48, name: "4GB LPDDR4 SDRAM", note: "3200 MT/s high-speed memory" },
      { id: "hdmi", x: 38, y: 86, name: "Dual Micro-HDMI", note: "4Kp60 hardware video decode & dual display" }
    ]
  },
  {
    id: "cb-sen-sr04",
    code: "HC-SR04-SONAR",
    name: "HC-SR04 Sonar",
    fullName: "Ultrasonic Distance Sensor",
    category: "Sensory Transceiver",
    price: 110,
    originalPrice: 160,
    stock: 240,
    image: PRODUCTS[3].image,
    telemetry: {
      voltage: "5.0V DC",
      clock: "40 kHz Sound",
      memory: "Analog Signal",
      gpio: "Trig + Echo",
      bus: "TTL 10us Pulse",
      socket: "4-Pin 2.54mm Pitch"
    },
    probes: [
      { id: "tx", x: 32, y: 45, name: "Transmitter Pod", note: "Emits 40kHz ultrasonic wave burst" },
      { id: "rx", x: 68, y: 45, name: "Receiver Pod", note: "Detects reflected acoustic pulse return" },
      { id: "pins", x: 50, y: 88, name: "4-Pin Header", note: "VCC, Trig, Echo, GND connections" }
    ]
  }
];

export const HeroSection = () => {
  const { navigateTo, addToCart } = useShop();

  const [activeTab, setActiveTab] = useState(0);
  const [activeProbe, setActiveProbe] = useState(null);

  // Live Stats Counter
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
  const currentItem = HERO_COMPONENTS[activeTab];
  const matchedProduct = PRODUCTS.find((p) => p.id === currentItem.id) || PRODUCTS[0];

  const handleQuickAdd = () => {
    addToCart(matchedProduct, 1);
  };

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 flex flex-col justify-center overflow-hidden bg-[#EDE3CF] text-[#171D0A]">
      {/* Precision Industrial Grid Background on Beige */}
      <div className="absolute inset-0 pointer-events-none opacity-25 bg-[linear-gradient(to_right,#4A552020_1px,transparent_1px),linear-gradient(to_bottom,#4A552020_1px,transparent_1px)] bg-[size:2.5rem_2.5rem]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#EDE3CF] via-transparent to-[#EDE3CF]" />
      </div>

      {/* Subtle Olive Ambient Glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#6B7A2A]/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#4A5520]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
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

          {/* Right Column: Hardware Workbench Terminal in Warm Ivory & Olive */}
          <div className="lg:col-span-6 w-full">
            <div className="bg-[#FAF6ED] border-2 border-[#4A5520]/30 hover:border-[#4A5520] rounded-3xl overflow-hidden shadow-elevated transition-all duration-300">
              {/* Terminal Title Bar */}
              <div className="px-4 py-3 bg-[#EDE3CF] border-b border-[#4A5520]/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#4A5520]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#6B7A2A]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#A3B04B]" />
                  </div>
                  <span className="text-[11px] font-mono text-[#384318] font-bold ml-2">
                    CIRCUITBAZZAR // BENCH TESTER
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#4A5520] bg-[#DFD4BD] px-2 py-0.5 rounded border border-[#4A5520]/30">
                  <Terminal size={11} />
                  <span>PROBE_ACTIVE</span>
                </div>
              </div>

              {/* Hardware Selector Switcher Tabs */}
              <div className="grid grid-cols-4 gap-1 p-2 bg-[#F3EBD9] border-b border-[#4A5520]/20">
                {HERO_COMPONENTS.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(idx);
                      setActiveProbe(null);
                    }}
                    className={`py-2 px-1 text-center rounded-xl transition-all ${
                      activeTab === idx
                        ? 'bg-[#4A5520] text-[#F7F2E7] shadow-sm font-bold'
                        : 'text-[#4F5938] hover:text-[#171D0A] hover:bg-[#EDE3CF] border border-transparent'
                    }`}
                  >
                    <span className="text-[9px] font-mono block opacity-75">0{idx + 1}</span>
                    <span className="text-xs font-mono font-bold truncate block">{item.name}</span>
                  </button>
                ))}
              </div>

              {/* Main Stage: High-Resolution Real Board with Interactive Probes */}
              <div className="relative p-6 bg-[#FAF6ED] flex flex-col items-center">
                {/* Circuit Grid Crosshairs */}
                <div className="absolute inset-0 bg-[radial-gradient(#4A552015_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

                {/* Component Presentation Card */}
                <div className="relative w-full aspect-[4/3] rounded-2xl bg-[#EDE3CF] p-4 flex items-center justify-center overflow-hidden shadow-inner border border-[#4A5520]/20">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentItem.id}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.04 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="relative w-full h-full flex items-center justify-center"
                    >
                      <SafeImage
                        src={currentItem.image}
                        alt={currentItem.fullName}
                        mixBlend={true}
                        aspectRatio="aspect-auto"
                        className="w-full h-full object-contain"
                      />

                      {/* Interactive Probe Target Pins */}
                      {currentItem.probes.map((probe) => {
                        const isSelected = activeProbe?.id === probe.id;
                        return (
                          <div
                            key={probe.id}
                            style={{ left: `${probe.x}%`, top: `${probe.y}%` }}
                            className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group/probe cursor-pointer"
                            onClick={() => setActiveProbe(isSelected ? null : probe)}
                            onMouseEnter={() => setActiveProbe(probe)}
                          >
                            <div className="relative flex items-center justify-center">
                              <span className={`absolute w-6 h-6 rounded-full transition-all duration-300 ${
                                isSelected ? 'bg-[#4A5520]/40 scale-125 animate-ping' : 'bg-[#6B7A2A]/40'
                              }`} />
                              <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors shadow-sm ${
                                isSelected
                                  ? 'bg-[#4A5520] border-[#FAF6ED] text-[#FAF6ED]'
                                  : 'bg-[#FAF6ED] border-[#4A5520] text-[#4A5520]'
                              }`}>
                                <Crosshair size={10} strokeWidth={2.5} />
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </motion.div>
                  </AnimatePresence>

                  {/* Top-Right HUD Tag */}
                  <div className="absolute top-3 right-3 bg-[#FAF6ED]/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono font-bold text-[#4A5520] border border-[#4A5520]/30 shadow-sm">
                    SKU: {currentItem.code}
                  </div>
                </div>

                {/* Interactive Probe HUD Telemetry Callout */}
                <div className="w-full mt-4 min-h-[58px]">
                  {activeProbe ? (
                    <motion.div
                      key={activeProbe.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="w-full p-2.5 rounded-xl bg-[#EDE3CF] border-2 border-[#4A5520] flex items-center justify-between shadow-sm"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-[#4A5520] text-[#F5C400] flex items-center justify-center flex-shrink-0">
                          <Cpu size={14} />
                        </div>
                        <div>
                          <p className="font-mono font-bold text-xs text-[#171D0A]">
                            {activeProbe.name}
                          </p>
                          <p className="font-body text-[11px] text-[#4F5938] font-medium">
                            {activeProbe.note}
                          </p>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono text-[#4A5520] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#DFD4BD] border border-[#4A5520]/30">
                        PROBED
                      </span>
                    </motion.div>
                  ) : (
                    <div className="w-full p-2.5 rounded-xl bg-[#EDE3CF]/70 border border-[#4A5520]/20 flex items-center justify-between text-xs font-mono text-[#4F5938]">
                      <span className="flex items-center gap-2">
                        <Crosshair size={13} className="text-[#4A5520]" />
                        <span>Hover or tap crosshairs to probe silicon pins</span>
                      </span>
                      <span className="text-[10px] font-bold text-[#4A5520]">4 PROBE POINTS</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Technical Telemetry Grid (Voltage, Clock, Flash) */}
              <div className="grid grid-cols-3 divide-x divide-[#4A5520]/20 border-t border-[#4A5520]/20 bg-[#EDE3CF] p-3 text-[11px] font-mono">
                <div className="px-2">
                  <span className="text-[#4F5938] block text-[9px] font-medium">V_OPERATING</span>
                  <span className="text-[#171D0A] font-bold">{currentItem.telemetry.voltage}</span>
                </div>
                <div className="px-2">
                  <span className="text-[#4F5938] block text-[9px] font-medium">CLOCK_SPEED</span>
                  <span className="text-[#4A5520] font-bold">{currentItem.telemetry.clock}</span>
                </div>
                <div className="px-2">
                  <span className="text-[#4F5938] block text-[9px] font-medium">FLASH_MEMORY</span>
                  <span className="text-[#171D0A] font-bold">{currentItem.telemetry.memory}</span>
                </div>
              </div>

              {/* Console Action Bar with Price & Quick Add */}
              <div className="p-4 bg-[#FAF6ED] border-t border-[#4A5520]/20 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading font-extrabold text-2xl text-[#171D0A]">
                      ₹{currentItem.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-mono text-[#4F5938] line-through">
                      ₹{currentItem.originalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#4A5520] font-bold flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4A5520]" />
                    {currentItem.stock} units ready for dispatch
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigateTo('detail', currentItem.id)}
                    className="px-3 py-2 rounded-xl border border-[#4A5520]/30 hover:border-[#4A5520] text-xs font-mono font-bold text-[#4A5520] hover:bg-[#EDE3CF] transition-colors"
                  >
                    Datasheet
                  </button>

                  <button
                    onClick={handleQuickAdd}
                    className="py-2.5 px-4 rounded-xl bg-[#4A5520] hover:bg-[#384318] text-[#F7F2E7] font-heading font-bold text-xs transition-all flex items-center gap-1.5 shadow-md active:scale-95"
                  >
                    <ShoppingCart size={13} className="text-[#F5C400]" />
                    <span>Quick Add</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
