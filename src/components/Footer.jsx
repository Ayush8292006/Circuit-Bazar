import React, { useState } from 'react';
import { Send, ArrowUp, ShieldCheck, Cpu, Heart, CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/categories';

export const Footer = () => {
  const { navigateTo, showToast } = useShop();
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
    <footer className="bg-[#0B0B0A] text-white border-t border-[#262622] pt-20 pb-28 md:pb-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="bg-[#141412] border border-[#6B7A2A]/40 rounded-3xl p-8 sm:p-12 mb-16 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7">
              <span className="text-xs font-mono text-[#F5C400] uppercase tracking-wider block mb-2">
                WEEKLY SILICON DIGEST
              </span>
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-2">
                Get New Component Drops & Datasheets
              </h3>
              <p className="font-body text-xs sm:text-sm text-[#EDE3CF]/70 max-w-lg">
                Exclusive flash sale coupons, new sensor arrivals, teardown articles and robotics project schematics delivered to your inbox every Thursday.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="flex items-center gap-2 text-[#A3B04B] font-mono text-sm bg-[#1A1A17] p-3.5 rounded-xl border border-[#6B7A2A]">
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
                    className="flex-1 bg-[#1A1A17] border border-[#262622] focus:border-[#F5C400] rounded-xl px-4 py-3 text-sm text-white placeholder-[#EDE3CF]/40 outline-none font-body"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 rounded-xl bg-[#F5C400] hover:bg-[#E5B700] text-[#0B0B0A] font-heading font-bold text-xs tracking-wider transition-all flex items-center gap-1.5 shadow-md flex-shrink-0 active:scale-95"
                  >
                    <span>Subscribe</span>
                    <Send size={13} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Links Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pb-16 border-b border-[#262622]">
          {/* Brand Column */}
          <div className="col-span-2">
            <div
              onClick={() => navigateTo('home')}
              className="flex items-center gap-2 cursor-pointer mb-4"
            >
              <img
                src="/logo.png"
                alt="CircuitBazzar"
                className="h-9 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <p className="font-body text-xs text-[#EDE3CF]/70 max-w-sm mb-6 leading-relaxed">
              India's premier marketplace for authentic microcontrollers, sensors, passive components, robotics accessories, and maker lab gear.
            </p>
            <div className="text-xs font-mono text-[#A3B04B] space-y-1">
              <p>📍 Koramangala 4th Block, Bangalore 560034</p>
              <p>📞 +91 (80) 4920-BAZZAR • 24h Support</p>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="font-mono text-xs text-[#A3B04B] uppercase tracking-wider mb-4 font-semibold">
              Components
            </h4>
            <ul className="space-y-2.5 text-xs font-body text-[#EDE3CF]/70">
              {CATEGORIES.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => navigateTo('listing', null, cat.id)}
                    className="hover:text-[#F5C400] transition-colors"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Maker Resources */}
          <div>
            <h4 className="font-mono text-xs text-[#A3B04B] uppercase tracking-wider mb-4 font-semibold">
              Maker Hub
            </h4>
            <ul className="space-y-2.5 text-xs font-body text-[#EDE3CF]/70">
              <li>
                <button
                  onClick={() => {
                    const kits = document.getElementById('project-kits');
                    if (kits) kits.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#F5C400] transition-colors"
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
                  className="hover:text-[#F5C400] transition-colors"
                >
                  B2B Bulk BOM Quote
                </button>
              </li>
              <li>
                <a href="#datasheets" className="hover:text-[#F5C400] transition-colors">
                  PDF Datasheets Archive
                </a>
              </li>
              <li>
                <a href="#pinouts" className="hover:text-[#F5C400] transition-colors">
                  Pinout Interactive Viewer
                </a>
              </li>
            </ul>
          </div>

          {/* Policies & Compliance */}
          <div>
            <h4 className="font-mono text-xs text-[#A3B04B] uppercase tracking-wider mb-4 font-semibold">
              Guarantees
            </h4>
            <ul className="space-y-2.5 text-xs font-body text-[#EDE3CF]/70">
              <li>7-Day Replacement</li>
              <li>Lot Quality Barcoding</li>
              <li>GST Compliant Invoicing</li>
              <li>Anti-Static Packaging</li>
              <li>24h SLA Dispatch</li>
            </ul>
          </div>
        </div>

        {/* Oversized CircuitBazzar Wordmark */}
        <div className="py-12 select-none border-b border-[#262622] flex items-center justify-center overflow-hidden">
          <span className="font-heading font-black text-5xl sm:text-7xl md:text-9xl tracking-tighter text-[#141412] hover:text-[#181814] transition-colors text-center whitespace-nowrap">
            CIRCUITBAZZAR
          </span>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#EDE3CF]/50 gap-4">
          <p>© 2026 CircuitBazzar Technologies Pvt Ltd. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <span>SECURE PAYMENT: UPI • CARDS • NETBANKING</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-[#EDE3CF] hover:text-[#F5C400] transition-colors"
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
