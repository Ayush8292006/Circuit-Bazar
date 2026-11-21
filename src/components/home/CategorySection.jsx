import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Layers } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { CATEGORIES } from '../../data/categories';
import { SafeImage } from '../SafeImage';

export const CategorySection = () => {
  const { navigateTo } = useShop();

  return (
    <section className="py-14 sm:py-20 bg-[#EDE3CF] relative text-[#171D0A] border-t border-[#DFD4BD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-6 pb-3 border-b-2 border-[#DFD4BD]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-mono font-bold text-[#4A5520] uppercase tracking-wider mb-1">
              <Layers size={13} /> Categories
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#171D0A]">
              Shop by Category
            </h2>
          </div>
          <button
            onClick={() => navigateTo('listing')}
            className="text-xs font-mono font-bold text-[#4A5520] hover:text-[#252D0F] flex items-center gap-1 group self-center"
          >
            <span className="hidden sm:inline">EXPLORE ALL</span>
            <span className="sm:hidden">ALL</span>
            <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* 2-Row Horizontal Scroll on Mobile / 4-Col Grid on Desktop */}
        <div className="grid grid-rows-2 grid-flow-col auto-cols-[145px] sm:auto-cols-[180px] lg:grid-rows-none lg:grid-flow-row lg:grid-cols-4 gap-3 sm:gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scroll-snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.4, delay: idx * 0.04 }}
              onClick={() => navigateTo('listing', null, cat.id)}
              className="group relative flex-shrink-0 w-full aspect-[4/3] sm:aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden bg-[#FAF6ED] border-2 border-[#4A5520]/25 hover:border-[#4A5520] transition-all duration-300 cursor-pointer snap-start flex flex-col justify-end p-3 sm:p-5 shadow-sm hover:shadow-elevated"
            >
              {/* Real Category Photograph */}
              <div className="absolute inset-0 z-0">
                <SafeImage
                  src={cat.image}
                  alt={cat.name}
                  aspectRatio="aspect-auto"
                  className="w-full h-full object-cover transition-transform duration-700 ease-brand group-hover:scale-110"
                />
                {/* Dark Olive Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#171D0A] via-[#171D0A]/75 to-[#4A5520]/25 group-hover:via-[#262E10]/80 transition-colors duration-500" />
              </div>

              {/* Card Meta Content */}
              <div className="relative z-10 text-white">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] sm:text-[11px] font-mono text-[#F5C400] font-bold tracking-wider">
                    {cat.itemCount}
                  </span>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#EDE3CF] group-hover:bg-[#F5C400] text-[#0B0B0A] flex items-center justify-center transition-all duration-300 opacity-90 group-hover:opacity-100 group-hover:rotate-45 shadow-sm">
                    <ArrowUpRight size={13} />
                  </div>
                </div>

                <h3 className="font-heading font-extrabold text-xs sm:text-base text-white group-hover:text-[#F5C400] transition-colors leading-tight line-clamp-1">
                  {cat.name}
                </h3>
                <p className="hidden sm:block text-xs font-body text-[#EDE3CF]/85 line-clamp-1 mt-0.5">
                  {cat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
