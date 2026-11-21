import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, Clock, ShieldCheck, ArrowRight, ShoppingCart } from 'lucide-react';
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
    <section className="py-20 bg-[#252E10] text-white relative border-y-2 border-[#4A5520]">
      {/* Subtle Background Glow in Olive */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-64 bg-[#F5C400]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Deal Header with Live Countdown */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-[#4A5520]/60">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181F0A] border border-[#F5C400]/40 text-xs font-mono text-[#F5C400] mb-2.5">
              <Flame size={14} className="fill-[#F5C400]" />
              <span>FLASH SILICON INVENTORY</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
              Deals of the Day
            </h2>
          </div>

          {/* Countdown Clock Display */}
          <div className="flex items-center gap-3 bg-[#181F0A] border border-[#6B7A2A] px-4 py-2.5 rounded-2xl shadow-inner">
            <Clock size={18} className="text-[#F5C400]" />
            <div className="flex items-center gap-1.5 font-mono text-sm sm:text-base">
              <span className="text-xs text-[#EDE3CF]/70 mr-1">OFFER ENDS IN</span>
              <span className="px-2 py-1 rounded-lg bg-[#2A3414] border border-[#4A5520] font-bold text-[#F5C400]">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[#EDE3CF]/50">:</span>
              <span className="px-2 py-1 rounded-lg bg-[#2A3414] border border-[#4A5520] font-bold text-[#F5C400]">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[#EDE3CF]/50">:</span>
              <span className="px-2 py-1 rounded-lg bg-[#2A3414] border border-[#4A5520] font-bold text-[#F5C400]">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* Deals Grid with Stock Left Progress Bars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dealProducts.slice(0, 4).map((product) => {
            const stockPercent = Math.round(
              ((product.dealTotalStock - product.dealStockLeft) / product.dealTotalStock) * 100
            );

            return (
              <div key={product.id} className="flex flex-col">
                <ProductCard product={product} />

                {/* Stock Left Progress Indicator below card */}
                <div className="mt-2.5 px-3 py-2 bg-[#181F0A] rounded-xl border border-[#4A5520]/60">
                  <div className="flex justify-between items-center text-[11px] font-mono mb-1.5">
                    <span className="text-[#EDE3CF]/80">
                      Claimed: <strong className="text-white">{stockPercent}%</strong>
                    </span>
                    <span className="text-[#F5C400] font-bold">
                      {product.dealStockLeft} Left in Stock
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[#2A3414] rounded-full overflow-hidden">
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
