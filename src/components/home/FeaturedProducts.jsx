import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Zap, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../ProductCard';

export const FeaturedProducts = () => {
  const { navigateTo } = useShop();
  const scrollRef = useRef(null);

  const featured = PRODUCTS;

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-14 sm:py-20 bg-[#EDE3CF] relative border-t-2 border-[#DFD4BD] text-[#171D0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Navigation Controls */}
        <div className="flex items-end justify-between mb-6 pb-3 border-b-2 border-[#DFD4BD]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-mono font-bold text-[#4A5520] uppercase tracking-wider mb-1">
              <Zap size={13} className="fill-[#F5C400] text-[#4A5520]" /> High Demand
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#171D0A]">
              Featured Components
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Scroll Navigation Buttons for Desktop */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => handleScroll('left')}
                className="w-9 h-9 rounded-xl bg-[#FAF6ED] hover:bg-[#F3EBD9] border-2 border-[#4A5520]/25 hover:border-[#4A5520] text-[#171D0A] flex items-center justify-center transition-colors shadow-sm"
                aria-label="Scroll left"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => handleScroll('right')}
                className="w-9 h-9 rounded-xl bg-[#FAF6ED] hover:bg-[#F3EBD9] border-2 border-[#4A5520]/25 hover:border-[#4A5520] text-[#171D0A] flex items-center justify-center transition-colors shadow-sm"
                aria-label="Scroll right"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            <button
              onClick={() => navigateTo('listing')}
              className="text-xs font-mono font-bold text-[#4A5520] hover:text-[#252D0F] flex items-center gap-1 transition-colors"
            >
              <span className="hidden sm:inline">VIEW FULL INVENTORY</span>
              <span className="sm:hidden">ALL</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* 2-Row Horizontal Scroll Grid on Mobile & Tablet */}
        <div
          ref={scrollRef}
          className="grid grid-rows-2 grid-flow-col auto-cols-[160px] sm:auto-cols-[190px] md:auto-cols-[220px] lg:auto-cols-[240px] gap-3 sm:gap-4 overflow-x-auto pb-4 scroll-snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {featured.map((product) => (
            <div
              key={product.id}
              className="snap-start h-full"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
