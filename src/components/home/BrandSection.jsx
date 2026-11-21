import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Award } from 'lucide-react';
import { BRANDS } from '../../data/kits';

export const BrandSection = () => {
  return (
    <section className="py-14 sm:py-20 bg-[#EDE3CF] relative border-t-2 border-[#DFD4BD] text-[#171D0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6ED] border border-[#4A5520]/30 text-xs font-mono font-bold text-[#4A5520] mb-2 shadow-sm">
            <Award size={13} /> AUTHORIZED DISTRIBUTION
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#171D0A]">
            Direct Semiconductor Partners
          </h2>
        </div>

        {/* 2-Row Horizontal Scroll on Mobile / 4-Col Grid on Desktop */}
        <div className="grid grid-rows-2 grid-flow-col auto-cols-[135px] sm:auto-cols-[165px] md:grid-rows-none md:grid-flow-row md:grid-cols-4 gap-2.5 sm:gap-4 overflow-x-auto md:overflow-visible pb-3 md:pb-0 scroll-snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {BRANDS.map((brand, idx) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.03 }}
              className="group p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-[#FAF6ED] border-2 border-[#4A5520]/20 hover:border-[#4A5520] hover:bg-[#FFFDF9] transition-all duration-300 flex flex-col items-center text-center cursor-default shadow-sm hover:shadow-elevated snap-start"
            >
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#EDE3CF] group-hover:bg-[#4A5520] border border-[#4A5520]/30 flex items-center justify-center text-[#4A5520] group-hover:text-[#F5C400] transition-colors mb-2 sm:mb-3">
                <Cpu size={18} />
              </div>

              <h4 className="font-mono font-bold text-xs sm:text-sm tracking-wider text-[#171D0A] group-hover:text-[#4A5520] transition-colors truncate w-full">
                {brand.logoText}
              </h4>

              <p className="font-body text-[10px] sm:text-xs text-[#4F5938] mt-0.5 font-medium truncate w-full">
                {brand.role}
              </p>

              <span className="mt-1.5 text-[8px] sm:text-[10px] font-mono font-bold text-[#4A5520] bg-[#EDE3CF] px-1.5 py-0.5 rounded-full border border-[#4A5520]/20">
                {brand.country}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
