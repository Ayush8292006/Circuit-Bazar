import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Award } from 'lucide-react';
import { BRANDS } from '../../data/kits';

export const BrandSection = () => {
  return (
    <section className="py-20 bg-[#EDE3CF] relative border-t-2 border-[#DFD4BD] text-[#171D0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6ED] border border-[#4A5520]/30 text-xs font-mono font-bold text-[#4A5520] mb-2.5 shadow-sm">
            <Award size={14} /> AUTHORIZED DISTRIBUTION
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#171D0A]">
            Direct Semiconductor Partners
          </h2>
          <p className="font-body text-xs sm:text-sm text-[#3E4924] max-w-md mt-2 font-medium">
            Factory verified components sourced directly from official semiconductor foundries and design houses.
          </p>
        </div>

        {/* Brand Grid: Grayscale to Color on hover */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {BRANDS.map((brand, idx) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.04 }}
              className="group p-5 rounded-2xl bg-[#FAF6ED] border-2 border-[#4A5520]/20 hover:border-[#4A5520] hover:bg-[#FFFDF9] transition-all duration-300 flex flex-col items-center text-center cursor-default shadow-sm hover:shadow-elevated"
            >
              <div className="w-12 h-12 rounded-xl bg-[#EDE3CF] group-hover:bg-[#4A5520] border border-[#4A5520]/30 flex items-center justify-center text-[#4A5520] group-hover:text-[#F5C400] transition-colors mb-3">
                <Cpu size={24} />
              </div>

              <h4 className="font-mono font-bold text-sm tracking-wider text-[#171D0A] group-hover:text-[#4A5520] transition-colors">
                {brand.logoText}
              </h4>

              <p className="font-body text-xs text-[#4F5938] mt-1 font-medium">
                {brand.role}
              </p>

              <span className="mt-2 text-[10px] font-mono font-bold text-[#4A5520] bg-[#EDE3CF] px-2 py-0.5 rounded-full border border-[#4A5520]/20">
                {brand.country}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
