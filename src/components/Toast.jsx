import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Info } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Toast = () => {
  const { toast } = useShop();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast.id}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-20 sm:bottom-8 right-4 sm:right-8 z-50 flex items-center gap-2.5 bg-[#171715] border border-[#6B7A2A] text-white px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md max-w-sm"
        >
          <CheckCircle2 size={18} className="text-[#F5C400] flex-shrink-0" />
          <p className="text-xs sm:text-sm font-body text-[#EDE3CF] leading-snug">
            {toast.message}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
