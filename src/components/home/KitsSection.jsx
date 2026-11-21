import React from 'react';
import { motion } from 'framer-motion';
import { Box, Check, ArrowRight, ShoppingCart, GraduationCap, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { KITS } from '../../data/kits';
import { SafeImage } from '../SafeImage';

export const KitsSection = () => {
  const { addToCart } = useShop();

  const handleAddKit = (kit) => {
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
    <section id="project-kits" className="py-14 sm:py-24 bg-[#EDE3CF] text-[#171D0A] relative overflow-hidden border-t-2 border-[#DFD4BD]">
      {/* Geometric background */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#4A5520_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 pb-4 border-b border-[#4A5520]/20">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4A5520]/15 text-[#4A5520] text-xs font-mono font-bold uppercase tracking-wider mb-2">
              <GraduationCap size={14} />
              <span>COLLEGE LABS & MAKERS</span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[#171D0A]">
              Project Starter Kits
            </h2>
          </div>

          <div className="mt-2 md:mt-0 flex items-center gap-1.5 text-xs font-mono font-bold text-[#4A5520]">
            <Sparkles size={14} />
            <span>DISCOUNTED INSTITUTIONAL BUNDLES</span>
          </div>
        </div>

        {/* Horizontal Scroll on Mobile / 2-Col Grid on Desktop */}
        <div className="flex md:grid md:grid-cols-2 gap-4 sm:gap-8 overflow-x-auto md:overflow-visible pb-4 md:pb-0 scroll-snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {KITS.map((kit) => (
            <div
              key={kit.id}
              className="group flex-shrink-0 w-[270px] sm:w-[320px] md:w-auto bg-[#FAF6ED] rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-[#4A5520]/20 hover:border-[#4A5520] shadow-card-beige hover:shadow-2xl transition-all duration-300 flex flex-col justify-between snap-start"
            >
              {/* Kit Photo Banner */}
              <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#0B0B0A]">
                <SafeImage
                  src={kit.image}
                  alt={kit.name}
                  aspectRatio="aspect-auto"
                  className="w-full h-full object-cover transition-transform duration-700 ease-brand group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Badge */}
                <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4">
                  <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#4A5520] text-[#F7F2E7] font-mono font-bold text-[10px] sm:text-xs shadow-md">
                    {kit.badge}
                  </span>
                </div>

                <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-white font-mono text-[9px] sm:text-[11px]">
                  {kit.itemsIncluded} Parts
                </div>

                <div className="absolute bottom-2.5 left-3 right-3 sm:bottom-3 sm:left-4 sm:right-4 text-white">
                  <h3 className="font-heading font-extrabold text-sm sm:text-xl">
                    {kit.name}
                  </h3>
                </div>
              </div>

              {/* Kit Details & Checklist */}
              <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="font-body text-xs sm:text-sm text-[#4A5520] mb-3 sm:mb-4 font-bold">
                    {kit.subtitle}
                  </p>

                  {/* Included Items Checklist */}
                  <div className="space-y-1.5 mb-4 sm:mb-6">
                    {kit.features.slice(0, 4).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-1.5 text-xs font-body text-[#171D0A] font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4A5520] mt-1.5 flex-shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price & Add to Cart */}
                <div className="pt-3 sm:pt-4 border-t border-[#DFD4BD] flex items-center justify-between">
                  <div>
                    <span className="font-heading font-extrabold text-base sm:text-2xl text-[#171D0A]">
                      ₹{kit.price.toLocaleString('en-IN')}
                    </span>
                    <span className="block text-[9px] sm:text-[11px] font-mono font-bold text-[#4A5520]">
                      SAVE {kit.discount}
                    </span>
                  </div>

                  <button
                    onClick={() => handleAddKit(kit)}
                    className="py-2 px-3 sm:py-2.5 sm:px-4 rounded-xl bg-[#4A5520] hover:bg-[#384318] text-[#F7F2E7] font-heading font-bold text-xs transition-all flex items-center gap-1.5 active:scale-95 shadow-sm"
                  >
                    <ShoppingCart size={13} className="text-[#F5C400]" />
                    <span>Add Kit</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
