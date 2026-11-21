import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileSpreadsheet, Send, CheckCircle2, Building2, Phone, User, FileText } from 'lucide-react';
import { IMAGES } from '../../data/images';
import { useShop } from '../../context/ShopContext';
import { SafeImage } from '../SafeImage';

export const B2BBanner = () => {
  const { showToast } = useShop();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    organization: '',
    requirement: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.requirement) {
      showToast('Please fill all required quotation fields', 'error');
      return;
    }

    setSubmitted(true);
    showToast('Quote request submitted! Our B2B desk will contact you within 2 hours.');
  };

  return (
    <section id="b2b-section" className="py-24 bg-[#0B0B0A] relative overflow-hidden border-t border-[#262622]">
      {/* Real Electronics Workshop / Laboratory Background */}
      <div className="absolute inset-0 z-0 opacity-25">
        <SafeImage
          src={IMAGES.b2b.bannerBg}
          alt="Electronics lab and hardware manufacturing"
          aspectRatio="aspect-auto"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0A] via-[#0B0B0A]/90 to-[#0B0B0A]/70" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Context & Perks */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1A17] border border-[#6B7A2A]/40 text-xs font-mono text-[#F5C400] mb-4">
              <Building2 size={14} />
              <span>INSTITUTIONAL PROCUREMENT & OEM</span>
            </div>

            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-4">
              Bulk Components for Labs, Startups & Universities
            </h2>

            <p className="font-body text-sm sm:text-base text-[#EDE3CF]/80 mb-8 max-w-lg leading-relaxed">
              Need 100+ Raspberry Pis, reel packaging of precision SMD capacitors, or custom BOM fulfillment? Upload your parts list and receive an itemized quotation with GST compliance.
            </p>

            <div className="grid grid-cols-2 gap-4 border-t border-[#262622] pt-6">
              <div>
                <p className="font-heading font-bold text-lg text-white">Up to 35% Off</p>
                <p className="font-body text-xs text-[#EDE3CF]/60">Tiered volume pricing</p>
              </div>
              <div>
                <p className="font-heading font-bold text-lg text-white">&lt; 2hr Turnaround</p>
                <p className="font-body text-xs text-[#EDE3CF]/60">Dedicated account engineer</p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Quotation Form */}
          <div className="lg:col-span-6">
            <div className="bg-[#141412]/95 backdrop-blur-xl border border-[#6B7A2A]/40 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#262622]">
                <h3 className="font-heading font-bold text-lg text-white">
                  Request an Instant BOM Quotation
                </h3>
                <span className="text-[10px] font-mono text-[#A3B04B] bg-[#1E1E1B] px-2 py-0.5 rounded-full border border-[#6B7A2A]/30">
                  GST INVOICE READY
                </span>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-[#6B7A2A]/20 border border-[#6B7A2A] flex items-center justify-center text-[#F5C400]">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="font-heading font-bold text-xl text-white">
                    Quote Request Received!
                  </h4>
                  <p className="text-xs sm:text-sm text-[#EDE3CF]/80 max-w-sm font-body">
                    Thank you <strong>{formData.name}</strong>. Our enterprise team will send an itemized quote to your contact number within 2 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', phone: '', organization: '', requirement: '' });
                    }}
                    className="text-xs font-mono text-[#F5C400] hover:underline pt-2"
                  >
                    SUBMIT ANOTHER BOM INQUIRY
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-[#EDE3CF]/70 mb-1.5">
                      YOUR NAME *
                    </label>
                    <div className="relative flex items-center">
                      <User size={15} className="absolute left-3 text-[#EDE3CF]/50" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Dr. Ramesh Gupta"
                        className="w-full bg-[#1A1A17] border border-[#262622] focus:border-[#F5C400] rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder-[#EDE3CF]/30 outline-none font-body"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[#EDE3CF]/70 mb-1.5">
                        PHONE / WHATSAPP *
                      </label>
                      <div className="relative flex items-center">
                        <Phone size={15} className="absolute left-3 text-[#EDE3CF]/50" />
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full bg-[#1A1A17] border border-[#262622] focus:border-[#F5C400] rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder-[#EDE3CF]/30 outline-none font-body"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#EDE3CF]/70 mb-1.5">
                        COLLEGE / COMPANY
                      </label>
                      <div className="relative flex items-center">
                        <Building2 size={15} className="absolute left-3 text-[#EDE3CF]/50" />
                        <input
                          type="text"
                          value={formData.organization}
                          onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                          placeholder="e.g. IIT Delhi / Robotech"
                          className="w-full bg-[#1A1A17] border border-[#262622] focus:border-[#F5C400] rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder-[#EDE3CF]/30 outline-none font-body"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#EDE3CF]/70 mb-1.5">
                      BOM REQUIREMENTS / COMPONENT LIST *
                    </label>
                    <div className="relative">
                      <textarea
                        required
                        rows={3}
                        value={formData.requirement}
                        onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                        placeholder="e.g. 50x ESP32 NodeMCU, 20x 60W Soldering Stations, 200x HC-SR04 ultrasonic sensors with target delivery date..."
                        className="w-full bg-[#1A1A17] border border-[#262622] focus:border-[#F5C400] rounded-xl p-3 text-sm text-white placeholder-[#EDE3CF]/30 outline-none font-body resize-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl bg-[#F5C400] hover:bg-[#E5B700] text-[#0B0B0A] font-heading font-bold text-sm transition-all flex items-center justify-center gap-2 active:scale-98 shadow-lg"
                  >
                    <Send size={15} />
                    <span>Generate Official Quotation</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
