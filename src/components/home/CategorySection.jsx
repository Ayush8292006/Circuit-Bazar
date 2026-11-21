import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Layers } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { CATEGORIES } from '../../data/categories';
import { SafeImage } from '../SafeImage';

export const CategorySection = () => {
  const { navigateTo } = useShop();

  return (
    <section className="py-20 bg-[#EDE3CF] relative text-[#171D0A] border-t border-[#DFD4BD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b-2 border-[#DFD4BD]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#4A5520] uppercase tracking-wider mb-2">
              <Layers size={14} /> Catalog Architecture
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#171D0A]">
              Shop by Category
            </h2>
          </div>
          <button
            onClick={() => navigateTo('listing')}
            className="mt-4 sm:mt-0 text-xs font-mono font-bold text-[#4A5520] hover:text-[#252D0F] flex items-center gap-1 group self-start"
          >
            <span>EXPLORE ALL CATEGORIES</span>
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Categories: Desktop 4-col Grid | Mobile Horizontal Scroll with Snap */}
        <div className="flex md:grid md:grid-cols-4 gap-4 overflow-x-auto md:overflow-visible pb-4 md:pb-0 scroll-snap-x snap-mandatory scrollbar-none -mx-4 px-4 md:mx-0 md:px-0">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              onClick={() => navigateTo('listing', null, cat.id)}
              className="group relative flex-shrink-0 w-64 sm:w-72 md:w-auto aspect-[4/5] rounded-2xl overflow-hidden bg-[#FAF6ED] border-2 border-[#4A5520]/25 hover:border-[#4A5520] transition-all duration-300 cursor-pointer snap-start flex flex-col justify-end p-5 shadow-sm hover:shadow-elevated"
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#171D0A] via-[#171D0A]/75 to-[#4A5520]/30 group-hover:via-[#262E10]/80 transition-colors duration-500" />
              </div>

              {/* Card Meta Content */}
              <div className="relative z-10 text-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono text-[#F5C400] font-bold tracking-wider">
                    {cat.itemCount}
                  </span>
                  {/* Arrow reveal on hover */}
                  <div className="w-8 h-8 rounded-full bg-[#EDE3CF] group-hover:bg-[#F5C400] text-[#0B0B0A] flex items-center justify-center transition-all duration-300 opacity-90 group-hover:opacity-100 group-hover:rotate-45 shadow-sm">
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                <h3 className="font-heading font-extrabold text-lg sm:text-xl text-white group-hover:text-[#F5C400] transition-colors leading-tight mb-1.5">
                  {cat.name}
                </h3>
                <p className="text-xs font-body text-[#EDE3CF]/85 line-clamp-2">
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
