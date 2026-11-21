import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, ShoppingCart, Zap, X } from 'lucide-react';

export const WelcomeScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('trace'); // 'trace' | 'chip' | 'cart' | 'logo' | 'complete'
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // 0 to 100% counter
    const startTime = Date.now();
    const duration = 2400; // ms

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const current = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(current);

      if (current > 25 && current < 55) setPhase('chip');
      else if (current >= 55 && current < 78) setPhase('cart');
      else if (current >= 78) setPhase('logo');

      if (elapsed >= duration) {
        clearInterval(interval);
        setTimeout(() => {
          handleFinish();
        }, 350);
      }
    }, 25);

    // ESC key listener to skip
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleFinish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleFinish = () => {
    if (isExiting) return;
    setIsExiting(true);
    try {
      sessionStorage.setItem('circuitbazzar_visited', 'true');
    } catch (e) {}
    setTimeout(() => {
      onComplete?.();
    }, 650);
  };

  return (
    <div className="fixed inset-0 z-[99999] pointer-events-auto flex items-center justify-center overflow-hidden">
      {/* Top Curtain Half - Beige */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: isExiting ? '-100%' : 0 }}
        transition={{ duration: 0.65, ease: [0.77, 0, 0.175, 1] }}
        className="absolute top-0 left-0 w-full h-1/2 bg-[#EDE3CF] border-b-2 border-[#4A5520]/25 z-10"
      />

      {/* Bottom Curtain Half - Beige */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: isExiting ? '100%' : 0 }}
        transition={{ duration: 0.65, ease: [0.77, 0, 0.175, 1] }}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#EDE3CF] border-t-2 border-[#4A5520]/25 z-10"
      />

      {/* Skip Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: isExiting ? 0 : 1 }}
        transition={{ delay: 0.2 }}
        onClick={handleFinish}
        className="absolute top-6 right-6 z-30 px-3.5 py-1.5 rounded-full border-2 border-[#4A5520]/30 text-xs font-mono font-bold text-[#4A5520] bg-[#FAF6ED] hover:bg-[#DFD4BD] transition-colors shadow-sm flex items-center gap-1 active:scale-95"
      >
        <span>SKIP</span>
        <X size={13} />
      </motion.button>

      {/* Center Animated Stage */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: isExiting ? 0 : 1, scale: isExiting ? 1.05 : 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-20 flex flex-col items-center justify-center px-4 max-w-lg text-center text-[#171D0A]"
      >
        {/* SVG Circuit Traces & Microchip Animation */}
        <div className="relative w-44 h-44 mb-6 flex items-center justify-center">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M 10 100 L 45 100 L 70 75 L 100 75"
              stroke="#4A5520"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
            <motion.path
              d="M 190 100 L 155 100 L 130 125 L 100 125"
              stroke="#4A5520"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
            <motion.path
              d="M 100 10 L 100 45 L 75 70"
              stroke="#F5C400"
              strokeWidth="2.2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, delay: 0.2, ease: "easeInOut" }}
            />
            <motion.path
              d="M 100 190 L 100 155 L 125 130"
              stroke="#F5C400"
              strokeWidth="2.2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, delay: 0.2, ease: "easeInOut" }}
            />

            <circle cx="10" cy="100" r="3.5" fill="#F5C400" />
            <circle cx="190" cy="100" r="3.5" fill="#F5C400" />
            <circle cx="100" cy="10" r="3.5" fill="#4A5520" />
            <circle cx="100" cy="190" r="3.5" fill="#4A5520" />
          </svg>

          {/* Central Morphing Icon in Ivory Card */}
          <div className="relative w-24 h-24 rounded-2xl bg-[#FAF6ED] border-2 border-[#4A5520] flex items-center justify-center shadow-elevated">
            {phase === 'cart' || phase === 'logo' ? (
              <motion.div
                key="cart"
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', damping: 15 }}
                className="text-[#4A5520] relative"
              >
                <ShoppingCart size={40} strokeWidth={2.2} />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F5C400] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#4A5520]"></span>
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="chip"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="text-[#4A5520]"
              >
                <Cpu size={42} strokeWidth={1.8} />
              </motion.div>
            )}
          </div>
        </div>

        {/* Logo Reveal & Brand Typography */}
        <div className="overflow-hidden mb-2">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: phase === 'logo' || phase === 'cart' ? 0 : 50, opacity: phase === 'logo' || phase === 'cart' ? 1 : 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center gap-1 font-heading font-extrabold text-3xl sm:text-4xl tracking-tight text-[#171D0A]"
          >
            <span>Circuit</span>
            <span className="text-[#4A5520]">Bazzar</span>
          </motion.div>
        </div>

        {/* Green Swoosh Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: phase === 'logo' ? 1 : 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-28 h-1 bg-[#4A5520] rounded-full mb-3"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: phase === 'logo' ? 1 : 0, y: phase === 'logo' ? 0 : 10 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-xs sm:text-sm font-body text-[#3E4924] font-semibold tracking-wide mb-5"
        >
          Every component. One bazaar.
        </motion.p>

        {/* Loading Counter & Progress Bar */}
        <div className="w-52 flex flex-col items-center">
          <div className="w-full flex justify-between items-center text-[10px] font-mono font-bold text-[#4F5938] mb-1.5">
            <span>LOADING_HARDWARE</span>
            <span className="text-[#4A5520] font-bold">{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#DFD4BD] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#6B7A2A] to-[#4A5520]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
