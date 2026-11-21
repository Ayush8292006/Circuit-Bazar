import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Layers, Truck, Headphones, CheckCircle2 } from 'lucide-react';

const USPS = [
  {
    icon: ShieldCheck,
    title: "100% Genuine Silicon",
    desc: "Every IC, sensor, and MCU passes automated pinout and lot-code tests. Zero counterfeit clones.",
    tag: "VERIFIED SILICON"
  },
  {
    icon: Layers,
    title: "Institutional Bulk Pricing",
    desc: "Tiered volume discounts for universities, hardware startups, and assembly runs with GST invoices.",
    tag: "TIERED DISCOUNTS"
  },
  {
    icon: Truck,
    title: "24h Express Dispatch",
    desc: "Orders placed by 2 PM ship the same day in ESD anti-static shielded envelopes with air cushioning.",
    tag: "ANTI-STATIC PACKING"
  },
  {
    icon: Headphones,
    title: "Maker & Tech Support",
    desc: "Stuck on an I2C address conflict or bootloader error? Our in-house hardware engineers answer queries.",
    tag: "ENGINEER ASSISTANCE"
  }
];

export const WhyUsSection = () => {
  return (
    <section className="py-14 sm:py-20 bg-[#EDE3CF] relative border-t-2 border-[#DFD4BD] text-[#171D0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-mono font-bold text-[#4A5520] uppercase tracking-wider">
            RELIABLE HARDWARE FOUNDATION
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#171D0A] mt-1">
            Why Makers Choose CircuitBazzar
          </h2>
        </div>

        {/* 2-Row Horizontal Scroll on Mobile / 4-Col Grid on Desktop */}
        <div className="grid grid-rows-2 grid-flow-col auto-cols-[200px] sm:auto-cols-[240px] lg:grid-rows-none lg:grid-flow-row lg:grid-cols-4 gap-3 sm:gap-6 overflow-x-auto lg:overflow-visible pb-3 lg:pb-0 scroll-snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {USPS.map((usp, idx) => {
            const Icon = usp.icon;
            return (
              <motion.div
                key={usp.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-[#FAF6ED] p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 border-[#4A5520]/20 hover:border-[#4A5520] transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-elevated snap-start"
              >
                <div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#EDE3CF] group-hover:bg-[#4A5520] border border-[#4A5520]/30 flex items-center justify-center text-[#4A5520] group-hover:text-[#F7F2E7] transition-all duration-300 mb-3 sm:mb-4">
                    <Icon size={20} />
                  </div>

                  <span className="text-[9px] sm:text-[10px] font-mono font-bold text-[#4A5520] tracking-wider block mb-1">
                    {usp.tag}
                  </span>

                  <h3 className="font-heading font-bold text-sm sm:text-base text-[#171D0A] mb-1.5">
                    {usp.title}
                  </h3>

                  <p className="font-body text-xs text-[#3E4924] leading-relaxed font-medium line-clamp-3">
                    {usp.desc}
                  </p>
                </div>

                <div className="pt-3 mt-4 border-t border-[#DFD4BD] flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono font-bold text-[#4A5520]">
                  <CheckCircle2 size={12} />
                  <span>SLA Guarantee</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
