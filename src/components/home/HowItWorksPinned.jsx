import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Truck, Cpu, ArrowRight } from 'lucide-react';
import { IMAGES } from '../../data/images';
import { SafeImage } from '../SafeImage';

const STEPS = [
  {
    id: 1,
    number: "01",
    title: "Instant Search & Datasheet Specs",
    subtitle: "Precise Silicon Discovery",
    desc: "Filter through 10,000+ development boards, sensors, passives and ICs with operating voltages, pinouts, and verified inventory counts.",
    icon: Search,
    image: IMAGES.howItWorks[0].image,
    highlight: "10,000+ Verified Components"
  },
  {
    id: 2,
    number: "02",
    title: "Direct Verified Sourcing",
    subtitle: "Zero Clones or Counterfeits",
    desc: "Every component is factory sourced directly from authorized semiconductor fabricators with lot traceability and batch quality testing.",
    icon: ShoppingBag,
    image: IMAGES.howItWorks[1].image,
    highlight: "100% Genuine Guarantee"
  },
  {
    id: 3,
    number: "03",
    title: "24-Hour Anti-Static Dispatch",
    subtitle: "ESD Moisture Sealed Protection",
    desc: "Sensitive chips and modules are sealed in conductive anti-static foil bags with desiccant packs and shock-dampening foam packaging.",
    icon: Truck,
    image: IMAGES.howItWorks[2].image,
    highlight: "24h SLA Courier Dispatch"
  },
  {
    id: 4,
    number: "04",
    title: "Plug, Code & Bring Ideas To Life",
    subtitle: "From Breadboard to Production",
    desc: "Drop onto breadboards, hook up jumper wires, flash with Arduino IDE or MicroPython, and ship your next hardware breakthrough.",
    icon: Cpu,
    image: IMAGES.howItWorks[3].image,
    highlight: "Maker & Lab Certified"
  }
];

export const HowItWorksPinned = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-24 bg-[#EDE3CF] border-t border-[#DFD4BD] relative overflow-hidden text-[#171D0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Tag */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6ED] border border-[#4A5520]/30 text-xs font-mono font-bold text-[#4A5520] mb-3 shadow-sm">
            <span>ENGINEERED FULFILLMENT CYCLE</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#171D0A]">
            How CircuitBazzar Works
          </h2>
          <p className="font-body text-sm sm:text-base text-[#3E4924] max-w-lg mt-2 font-medium">
            From silicon fab to your maker workbench in 4 transparent, verified steps.
          </p>
        </div>

        {/* Pinned / Split View Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Interactive Steps List */}
          <div className="lg:col-span-6 space-y-4">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;

              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  className={`p-5 sm:p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer text-left ${
                    isActive
                      ? 'bg-[#FAF6ED] border-[#4A5520] shadow-elevated scale-[1.01]'
                      : 'bg-[#FAF6ED]/60 border-[#DFD4BD] hover:border-[#4A5520]/50 opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Step Number Badge */}
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-sm flex-shrink-0 transition-colors shadow-sm ${
                        isActive
                          ? 'bg-[#4A5520] text-[#F7F2E7]'
                          : 'bg-[#EDE3CF] text-[#4F5938] border border-[#4A5520]/20'
                      }`}
                    >
                      {step.number}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-mono text-[#4A5520] font-bold uppercase tracking-wider">
                          {step.subtitle}
                        </span>
                        {isActive && (
                          <span className="text-[10px] font-mono font-bold text-[#4A5520] bg-[#4A5520]/10 px-2 py-0.5 rounded-full border border-[#4A5520]/20">
                            {step.highlight}
                          </span>
                        )}
                      </div>

                      <h3 className="font-heading font-bold text-base sm:text-lg text-[#171D0A] mb-2">
                        {step.title}
                      </h3>

                      <p className="font-body text-xs sm:text-sm text-[#3E4924] leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Photo View matching Active Step */}
          <div className="lg:col-span-6 relative aspect-[16/10] sm:aspect-[4/3] rounded-3xl overflow-hidden bg-[#FAF6ED] border-2 border-[#4A5520] shadow-elevated">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="absolute inset-0"
              >
                <SafeImage
                  src={STEPS[activeStep].image}
                  alt={STEPS[activeStep].title}
                  aspectRatio="aspect-auto"
                  className="w-full h-full object-cover"
                />

                {/* Overlaid Step HUD Details */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#171D0A] via-transparent to-transparent flex flex-col justify-end p-6">
                  <div className="bg-[#FAF6ED]/95 backdrop-blur-md rounded-2xl p-4 border border-[#4A5520]/30 max-w-md shadow-lg text-[#171D0A]">
                    <div className="flex items-center justify-between mb-1 text-[11px] font-mono font-bold text-[#4A5520]">
                      <span>STAGE {STEPS[activeStep].number} OF 04</span>
                      <span className="text-[#384318]">HARDWARE VERIFIED</span>
                    </div>
                    <p className="font-heading font-bold text-sm sm:text-base text-[#171D0A]">
                      {STEPS[activeStep].title}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
