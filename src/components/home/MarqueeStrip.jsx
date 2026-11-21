import React from 'react';
import { MARQUEE_ITEMS } from '../../data/kits';

export const MarqueeStrip = () => {
  return (
    <div className="relative w-full overflow-hidden bg-[#6B7A2A] py-3.5 select-none border-y border-[#A3B04B]/30 shadow-inner">
      <div className="flex w-max animate-marquee">
        {/* First repetition */}
        <div className="flex items-center space-x-8 px-4">
          {MARQUEE_ITEMS.map((item, idx) => (
            <span
              key={`m1-${idx}`}
              className="text-xs sm:text-sm font-mono font-bold tracking-widest text-[#0B0B0A] whitespace-nowrap"
            >
              {item}
            </span>
          ))}
        </div>
        {/* Second repetition for seamless continuous loop */}
        <div className="flex items-center space-x-8 px-4" aria-hidden="true">
          {MARQUEE_ITEMS.map((item, idx) => (
            <span
              key={`m2-${idx}`}
              className="text-xs sm:text-sm font-mono font-bold tracking-widest text-[#0B0B0A] whitespace-nowrap"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
