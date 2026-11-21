import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Zap, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../ProductCard';

export const FeaturedProducts = () => {
  const { navigateTo } = useShop();
  const scrollRef = useRef(null);

  const featured = PRODUCTS.filter((p) => p.isFeatured);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-[#0B0B0A] relative border-t border-[#262622]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#262622]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#F5C400] uppercase tracking-wider mb-2">
              <Zap size={14} className="fill-[#F5C400]" /> High Demand Components
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
              Featured Silicon & Hardware
            </h2>
          </div>

          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            {/* Scroll Navigation Buttons for Desktop */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => handleScroll('left')}
                className="w-10 h-10 rounded-xl bg-[#141412] hover:bg-[#1E1E1B] border border-[#262622] hover:border-[#6B7A2A] text-white flex items-center justify-center transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => handleScroll('right')}
                className="w-10 h-10 rounded-xl bg-[#141412] hover:bg-[#1E1E1B] border border-[#262622] hover:border-[#6B7A2A] text-white flex items-center justify-center transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <button
              onClick={() => navigateTo('listing')}
              className="text-xs font-mono text-[#A3B04B] hover:text-[#F5C400] flex items-center gap-1 transition-colors"
            >
              <span>VIEW FULL INVENTORY</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Carousel / Card List with drag and mobile snap */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 scroll-snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {featured.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-[260px] sm:w-[280px] md:w-[300px] snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
