import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Award } from 'lucide-react';
import { BRANDS } from '../../data/kits';

export const BrandSection = () => {
  return (
    <section className="py-20 bg-[#0B0B0A] relative border-t border-[#262622]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#141412] border border-[#6B7A2A]/40 text-xs font-mono text-[#A3B04B] mb-2.5">
            <Award size={14} /> AUTHORIZED DISTRIBUTION
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
            Direct Semiconductor Partners
          </h2>
          <p className="font-body text-xs sm:text-sm text-[#EDE3CF]/70 max-w-md mt-2">
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
              className="group p-5 rounded-2xl bg-[#141412] border border-[#262622] hover:border-[#6B7A2A] hover:bg-[#1A1A17] transition-all duration-300 flex flex-col items-center text-center cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-[#1A1A17] group-hover:bg-[#6B7A2A]/20 border border-[#262622] group-hover:border-[#6B7A2A] flex items-center justify-center text-[#EDE3CF]/40 group-hover:text-[#F5C400] transition-colors mb-3">
                <Cpu size={24} />
              </div>

              <h4 className="font-mono font-bold text-sm tracking-wider text-[#EDE3CF]/60 group-hover:text-[#F5C400] transition-colors">
                {brand.logoText}
              </h4>

              <p className="font-body text-xs text-[#EDE3CF]/60 mt-1">
                {brand.role}
              </p>

              <span className="mt-2 text-[10px] font-mono text-[#A3B04B] bg-[#171715] px-2 py-0.5 rounded-full border border-[#262622]">
                {brand.country}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
