import React, { useState } from 'react';
import { Send, ArrowUp, ShieldCheck, Cpu, Heart, CheckCircle2, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/categories';

export const Footer = () => {
  const { navigateTo, showToast, replayIntro } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    showToast('Subscribed to CircuitBazzar Hardware Dispatch! Check your inbox.');
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#242D10] text-[#EDE3CF] border-t-2 border-[#4A5520] pt-20 pb-28 md:pb-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section in Warm Ivory */}
        <div className="bg-[#FAF6ED] text-[#171D0A] border-2 border-[#4A5520] rounded-3xl p-8 sm:p-12 mb-16 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7">
              <span className="text-xs font-mono font-bold text-[#4A5520] uppercase tracking-wider block mb-2">
                WEEKLY SILICON DIGEST
              </span>
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#171D0A] mb-2">
                Get New Component Drops & Datasheets
              </h3>
              <p className="font-body text-xs sm:text-sm text-[#3E4924] max-w-lg font-medium">
                Exclusive flash sale coupons, new sensor arrivals, teardown articles and robotics project schematics delivered to your inbox every Thursday.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="flex items-center gap-2 text-[#4A5520] font-mono text-sm bg-[#EDE3CF] p-3.5 rounded-xl border border-[#4A5520] font-bold">
                  <CheckCircle2 size={18} />
                  <span>You're in! Check your inbox for 10% welcome coupon.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter maker email..."
                    className="flex-1 bg-[#EDE3CF] border border-[#4A5520]/40 focus:border-[#4A5520] rounded-xl px-4 py-3 text-sm text-[#171D0A] placeholder-[#4F5938]/60 outline-none font-body font-medium"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 rounded-xl bg-[#4A5520] hover:bg-[#384318] text-[#F7F2E7] font-heading font-bold text-xs tracking-wider transition-all flex items-center gap-1.5 shadow-md flex-shrink-0 active:scale-95"
                  >
                    <span>Subscribe</span>
                    <Send size={13} className="text-[#F5C400]" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Links Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pb-16 border-b border-[#4A5520]/60">
          {/* Brand Column */}
          <div className="col-span-2">
            <div
              onClick={() => navigateTo('home')}
              className="flex items-center gap-2 cursor-pointer mb-4"
            >
              <div className="bg-[#0B0B0A] px-3 py-1.5 rounded-xl border border-[#4A5520]/40 shadow-sm">
                <img
                  src="/logo.png"
                  alt="CircuitBazzar"
                  className="h-8 w-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>
            <p className="font-body text-xs text-[#EDE3CF]/80 max-w-sm mb-6 leading-relaxed font-medium">
              India's premier marketplace for authentic microcontrollers, sensors, passive components, robotics accessories, and maker lab gear.
            </p>
            <div className="text-xs font-mono text-[#A3B04B] space-y-1">
              <p>📍 Koramangala 4th Block, Bangalore 560034</p>
              <p>📞 +91 (80) 4920-BAZZAR • 24h Support</p>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="font-mono text-xs text-[#F5C400] uppercase tracking-wider mb-4 font-bold">
              Components
            </h4>
            <ul className="space-y-2.5 text-xs font-body text-[#EDE3CF]/80 font-medium">
              {CATEGORIES.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => navigateTo('listing', null, cat.id)}
                    className="hover:text-white transition-colors"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Maker Resources */}
          <div>
            <h4 className="font-mono text-xs text-[#F5C400] uppercase tracking-wider mb-4 font-bold">
              Maker Hub
            </h4>
            <ul className="space-y-2.5 text-xs font-body text-[#EDE3CF]/80 font-medium">
              <li>
                <button
                  onClick={() => {
                    const kits = document.getElementById('project-kits');
                    if (kits) kits.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Student Starter Kits
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const b2b = document.getElementById('b2b-section');
                    if (b2b) b2b.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  B2B Bulk BOM Quote
                </button>
              </li>
              <li>
                <button
                  onClick={replayIntro}
                  className="hover:text-[#F5C400] transition-colors flex items-center gap-1 text-[#F5C400]"
                >
                  <Sparkles size={12} />
                  <span>Replay Intro Animation</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Policies & Compliance */}
          <div>
            <h4 className="font-mono text-xs text-[#F5C400] uppercase tracking-wider mb-4 font-bold">
              Guarantees
            </h4>
            <ul className="space-y-2.5 text-xs font-body text-[#EDE3CF]/80 font-medium">
              <li>7-Day Replacement</li>
              <li>Lot Quality Barcoding</li>
              <li>GST Compliant Invoicing</li>
              <li>Anti-Static Packaging</li>
              <li>24h SLA Dispatch</li>
            </ul>
          </div>
        </div>

        {/* Oversized CircuitBazzar Wordmark */}
        <div className="py-12 select-none border-b border-[#4A5520]/60 flex items-center justify-center overflow-hidden">
          <span className="font-heading font-black text-5xl sm:text-7xl md:text-9xl tracking-tighter text-[#1C230C] hover:text-[#181F0A] transition-colors text-center whitespace-nowrap">
            CIRCUITBAZZAR
          </span>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#EDE3CF]/60 gap-4">
          <p>© 2026 CircuitBazzar Technologies Pvt Ltd. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <button
              onClick={replayIntro}
              className="text-[#EDE3CF] hover:text-[#F5C400] transition-colors font-bold flex items-center gap-1"
            >
              <Sparkles size={13} />
              <span>REPLAY INTRO</span>
            </button>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-[#EDE3CF] hover:text-[#F5C400] transition-colors font-bold"
            >
              <span>TOP</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
