import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '../../data/kits';
import { SafeImage } from '../SafeImage';

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="py-24 bg-[#EDE3CF] relative border-t-2 border-[#DFD4BD] overflow-hidden text-[#171D0A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6ED] border border-[#4A5520]/30 text-xs font-mono font-bold text-[#4A5520] mb-4 shadow-sm">
          <Quote size={13} />
          <span>VERIFIED MAKER REVIEWS</span>
        </div>

        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#171D0A] mb-12">
          Trusted by 50,000+ Hardware Builders
        </h2>

        {/* Testimonial Card Display */}
        <div className="relative min-h-[280px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-[#FAF6ED] border-2 border-[#4A5520]/30 rounded-3xl p-6 sm:p-10 shadow-elevated relative w-full text-left"
            >
              <div className="flex items-center gap-1 text-[#F5C400] mb-5">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-[#F5C400]" />
                ))}
              </div>

              <p className="font-body text-base sm:text-lg text-[#171D0A] leading-relaxed mb-6 italic font-medium">
                "{current.text}"
              </p>

              <div className="flex items-center justify-between border-t border-[#DFD4BD] pt-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#4A5520]">
                    <SafeImage
                      src={current.avatar}
                      alt={current.name}
                      aspectRatio="aspect-square"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm sm:text-base text-[#171D0A]">
                      {current.name}
                    </h4>
                    <p className="font-body text-xs text-[#4F5938] font-medium">
                      {current.role}
                    </p>
                  </div>
                </div>

                <div className="hidden sm:block text-right">
                  <span className="text-[10px] font-mono text-[#4A5520] font-bold block">PROJECT</span>
                  <span className="text-xs font-mono font-bold text-[#171D0A]">
                    {current.project}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Pagination Controls */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-[#FAF6ED] hover:bg-[#F3EBD9] border-2 border-[#4A5520]/30 text-[#171D0A] flex items-center justify-center transition-colors shadow-sm"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'w-8 bg-[#4A5520]' : 'w-2 bg-[#DFD4BD]'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full bg-[#FAF6ED] hover:bg-[#F3EBD9] border-2 border-[#4A5520]/30 text-[#171D0A] flex items-center justify-center transition-colors shadow-sm"
            aria-label="Next testimonial"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};
