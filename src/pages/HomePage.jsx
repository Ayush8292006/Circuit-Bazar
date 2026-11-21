import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { MarqueeStrip } from '../components/home/MarqueeStrip';
import { CategorySection } from '../components/home/CategorySection';
import { HowItWorksPinned } from '../components/home/HowItWorksPinned';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { DealsSection } from '../components/home/DealsSection';
import { KitsSection } from '../components/home/KitsSection';
import { BrandSection } from '../components/home/BrandSection';
import { WhyUsSection } from '../components/home/WhyUsSection';
import { B2BBanner } from '../components/home/B2BBanner';
import { TestimonialsSection } from '../components/home/TestimonialsSection';

export const HomePage = () => {
  return (
    <main className="min-h-screen bg-[#0B0B0A] text-white">
      {/* a) Hero */}
      <HeroSection />

      {/* b) Marquee Strip */}
      <MarqueeStrip />

      {/* c) Shop by Category */}
      <CategorySection />

      {/* d) Pinned "How it works" */}
      <HowItWorksPinned />

      {/* e) Featured Products Carousel */}
      <FeaturedProducts />

      {/* f) Deals of the Day with Countdown */}
      <DealsSection />

      {/* g) Project Kits / Student Corner (Beige Section) */}
      <KitsSection />

      {/* h) Shop by Brand */}
      <BrandSection />

      {/* i) Why CircuitBazzar */}
      <WhyUsSection />

      {/* j) Bulk / B2B Order Banner with Quote Form */}
      <B2BBanner />

      {/* k) Testimonials */}
      <TestimonialsSection />
    </main>
  );
};
