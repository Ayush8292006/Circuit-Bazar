import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, Clock } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../ProductCard';

export const DealsSection = () => {
  const { navigateTo } = useShop();

  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const dealProducts = PRODUCTS.filter((p) => p.isDeal);

  return (
    <section className="py-14 sm:py-20 bg-[#252E10] text-white relative border-y-2 border-[#4A5520]">
      {/* Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-64 bg-[#F5C400]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Deal Header with Live Countdown */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#4A5520]/60">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#181F0A] border border-[#F5C400]/40 text-[10px] sm:text-xs font-mono text-[#F5C400] mb-1">
              <Flame size={12} className="fill-[#F5C400]" />
              <span>FLASH INVENTORY</span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              Deals of the Day
            </h2>
          </div>

          {/* Countdown Clock Display */}
          <div className="flex items-center gap-2 bg-[#181F0A] border border-[#6B7A2A] px-3 py-1.5 rounded-xl shadow-inner self-start sm:self-auto">
            <Clock size={15} className="text-[#F5C400]" />
            <div className="flex items-center gap-1 font-mono text-xs sm:text-sm">
              <span className="text-[10px] text-[#EDE3CF]/70 mr-1">ENDS IN</span>
              <span className="px-1.5 py-0.5 rounded bg-[#2A3414] border border-[#4A5520] font-bold text-[#F5C400]">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[#EDE3CF]/50">:</span>
              <span className="px-1.5 py-0.5 rounded bg-[#2A3414] border border-[#4A5520] font-bold text-[#F5C400]">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[#EDE3CF]/50">:</span>
              <span className="px-1.5 py-0.5 rounded bg-[#2A3414] border border-[#4A5520] font-bold text-[#F5C400]">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* 2-Row Horizontal Scroll on Mobile / 4-Col Grid on Desktop */}
        <div className="grid grid-rows-2 grid-flow-col auto-cols-[160px] sm:auto-cols-[190px] lg:grid-rows-none lg:grid-flow-row lg:grid-cols-4 gap-3 sm:gap-6 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scroll-snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {dealProducts.map((product) => {
            const stockPercent = Math.round(
              ((product.dealTotalStock - product.dealStockLeft) / product.dealTotalStock) * 100
            );

            return (
              <div key={product.id} className="flex flex-col snap-start h-full">
                <ProductCard product={product} />

                {/* Stock Left Progress Indicator below card */}
                <div className="mt-1.5 px-2 py-1.5 bg-[#181F0A] rounded-lg border border-[#4A5520]/60">
                  <div className="flex justify-between items-center text-[9px] font-mono mb-1">
                    <span className="text-[#EDE3CF]/80">
                      Claimed: <strong className="text-white">{stockPercent}%</strong>
                    </span>
                    <span className="text-[#F5C400] font-bold">
                      {product.dealStockLeft} Left
                    </span>
                  </div>
                  <div className="w-full h-1 bg-[#2A3414] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#6B7A2A] to-[#F5C400] rounded-full"
                      style={{ width: `${stockPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
