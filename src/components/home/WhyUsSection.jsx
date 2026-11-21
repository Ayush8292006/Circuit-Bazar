import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Layers, Truck, Headphones, CheckCircle2 } from 'lucide-react';

const USPS = [
  {
    icon: ShieldCheck,
    title: "100% Genuine Components",
    desc: "Every IC, sensor, and microcontroller passes automated pinout and lot-code tests. Zero clone counterfeits or recycled components.",
    tag: "VERIFIED SILICON"
  },
  {
    icon: Layers,
    title: "Institutional Bulk Pricing",
    desc: "Tiered pricing for universities, hardware startups, and assembly runs. Instant automated quote generator with GST invoices.",
    tag: "TIERED DISCOUNTS"
  },
  {
    icon: Truck,
    title: "24-Hour Express Dispatch",
    desc: "Orders placed by 2 PM ship the same day in ESD anti-static shielded envelopes with shock-absorbent multi-layer air cushioning.",
    tag: "ANTI-STATIC PACKING"
  },
  {
    icon: Headphones,
    title: "Maker & Tech Support",
    desc: "Stuck on an I2C address conflict or bootloader error? Our in-house electronics engineers review schematics and answer queries.",
    tag: "ENGINEER ASSISTANCE"
  }
];

export const WhyUsSection = () => {
  return (
    <section className="py-20 bg-[#EDE3CF] relative border-t-2 border-[#DFD4BD] text-[#171D0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold text-[#4A5520] uppercase tracking-wider">
            RELIABLE HARDWARE FOUNDATION
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#171D0A] mt-1">
            Why Makers Choose CircuitBazzar
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {USPS.map((usp, idx) => {
            const Icon = usp.icon;
            return (
              <motion.div
                key={usp.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-[#FAF6ED] p-6 rounded-2xl border-2 border-[#4A5520]/20 hover:border-[#4A5520] transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-elevated"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#EDE3CF] group-hover:bg-[#4A5520] border border-[#4A5520]/30 flex items-center justify-center text-[#4A5520] group-hover:text-[#F7F2E7] transition-all duration-300 mb-5">
                    <Icon size={24} />
                  </div>

                  <span className="text-[10px] font-mono font-bold text-[#4A5520] tracking-wider block mb-1">
                    {usp.tag}
                  </span>

                  <h3 className="font-heading font-bold text-lg text-[#171D0A] mb-2.5">
                    {usp.title}
                  </h3>

                  <p className="font-body text-xs sm:text-sm text-[#3E4924] leading-relaxed font-medium">
                    {usp.desc}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-[#DFD4BD] flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#4A5520]">
                  <CheckCircle2 size={13} />
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
