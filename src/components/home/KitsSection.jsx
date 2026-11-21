import React from 'react';
import { motion } from 'framer-motion';
import { Box, Check, ArrowRight, ShoppingCart, GraduationCap, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { KITS } from '../../data/kits';
import { SafeImage } from '../SafeImage';

export const KitsSection = () => {
  const { addToCart } = useShop();

  const handleAddKit = (kit) => {
    // Map kit to cart product format
    addToCart({
      id: kit.id,
      name: kit.name,
      price: kit.price,
      originalPrice: kit.originalPrice,
      sku: `KIT-${kit.id.toUpperCase()}`,
      image: kit.image,
      category: 'kits',
    }, 1);
  };

  return (
    <section id="project-kits" className="py-24 bg-[#EDE3CF] text-[#0B0B0A] relative overflow-hidden">
      {/* Subtle geometric pattern on beige background */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#4A5520_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-6 border-b border-[#4A5520]/20">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4A5520]/15 text-[#4A5520] text-xs font-mono font-semibold uppercase tracking-wider mb-3">
              <GraduationCap size={15} />
              <span>COLLEGE LABS & MAKERS CORNER</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0B0B0A]">
              Engineered Project Kits
            </h2>
            <p className="font-body text-sm sm:text-base text-[#4A5520] max-w-xl mt-2 font-medium">
              Turnkey electronics packages with curated microcontrollers, matched sensors, step-by-step schematics, and code repositories.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-2 text-xs font-mono font-bold text-[#4A5520]">
            <Sparkles size={16} />
            <span>DISCOUNTED INSTITUTIONAL BUNDLES</span>
          </div>
        </div>

        {/* 4 Large Photo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {KITS.map((kit, idx) => (
            <motion.div
              key={kit.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group bg-[#F7F2E7] rounded-3xl overflow-hidden border border-[#4A5520]/20 hover:border-[#6B7A2A] shadow-card-beige hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Kit Photo Banner with Image Reveal */}
              <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#0B0B0A]">
                <SafeImage
                  src={kit.image}
                  alt={kit.name}
                  aspectRatio="aspect-auto"
                  className="w-full h-full object-cover transition-transform duration-700 ease-brand group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-[#F5C400] text-[#0B0B0A] font-mono font-bold text-xs shadow-md">
                    {kit.badge}
                  </span>
                </div>

                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-white font-mono text-[11px]">
                  {kit.itemsIncluded} Components Included
                </div>

                <div className="absolute bottom-3 left-4 right-4">
                  <p className="text-white/80 font-mono text-xs uppercase tracking-wider">
                    {kit.level}
                  </p>
                  <h3 className="font-heading font-extrabold text-xl text-white">
                    {kit.name}
                  </h3>
                </div>
              </div>

              {/* Kit Details & Checklist */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <p className="font-body text-xs sm:text-sm text-[#4A5520] mb-5 font-semibold">
                    {kit.subtitle}
                  </p>

                  {/* Included Items Checklist with Solder Dot Bullets */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                    {kit.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs font-body text-[#0B0B0A]/90">
                        <span className="w-2 h-2 rounded-full bg-[#6B7A2A] mt-1.5 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price & Add to Cart Action */}
                <div className="pt-6 border-t border-[#4A5520]/20 flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-heading font-extrabold text-2xl text-[#0B0B0A]">
                        ₹{kit.price.toLocaleString('en-IN')}
                      </span>
                      {kit.originalPrice && (
                        <span className="text-xs font-mono text-[#0B0B0A]/50 line-through">
                          ₹{kit.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-mono font-bold text-[#6B7A2A]">
                      SAVE {kit.discount}
                    </span>
                  </div>

                  <button
                    onClick={() => handleAddKit(kit)}
                    className="py-3 px-5 rounded-xl bg-[#0B0B0A] hover:bg-[#6B7A2A] text-white font-heading font-bold text-xs transition-all flex items-center gap-2 active:scale-95 shadow-md"
                  >
                    <ShoppingCart size={15} className="text-[#F5C400]" />
                    <span>Add Kit to Cart</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
