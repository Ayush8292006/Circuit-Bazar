import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { SafeImage } from './SafeImage';

export const CartDrawer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    freeShippingThreshold,
    freeShippingProgress,
    navigateTo,
    showToast,
    clearCart
  } = useShop();

  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleCheckout = () => {
    setIsCartOpen(false);
    showToast("🎉 Order placed successfully! Tracking link sent to your registered mobile.");
    clearCart();
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Drawer Container */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="w-screen max-w-md bg-[#141412] border-l border-[#6B7A2A]/40 flex flex-col shadow-2xl text-white"
            >
              {/* Header */}
              <div className="p-4 sm:p-6 border-b border-[#262622] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag size={20} className="text-[#F5C400]" />
                  <h2 className="font-heading font-bold text-lg text-white">Your Component Cart</h2>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[#1E1E1B] text-[#A3B04B] border border-[#6B7A2A]/30">
                    {cart.length} unique items
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-xl text-[#EDE3CF]/70 hover:text-white hover:bg-[#1E1E1B] transition-colors"
                  aria-label="Close cart"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Free Shipping Progress Bar */}
              <div className="px-4 sm:px-6 py-3 bg-[#1A1A17] border-b border-[#262622]">
                <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                  <div className="flex items-center gap-1.5 text-[#EDE3CF]">
                    <Truck size={14} className="text-[#F5C400]" />
                    {remainingForFreeShipping === 0 ? (
                      <span className="text-[#A3B04B] font-bold">🎉 FREE Express Shipping Unlocked!</span>
                    ) : (
                      <span>Add <strong className="text-[#F5C400]">₹{remainingForFreeShipping}</strong> more for Free Shipping</span>
                    )}
                  </div>
                  <span className="text-[#EDE3CF]/60">{freeShippingProgress}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#262622] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#6B7A2A] to-[#F5C400]"
                    initial={{ width: 0 }}
                    animate={{ width: `${freeShippingProgress}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 divide-y divide-[#262622]">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-16">
                    <div className="w-16 h-16 rounded-full bg-[#1A1A17] border border-[#6B7A2A]/30 flex items-center justify-center text-[#EDE3CF]/40 mb-4">
                      <ShoppingBag size={28} />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-white mb-1">Your cart is empty</h3>
                    <p className="text-xs text-[#EDE3CF]/60 max-w-xs mb-6 font-body">
                      Find microcontrollers, ultrasonic sensors, relay modules and maker kits in our catalog.
                    </p>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        navigateTo('listing');
                      }}
                      className="px-6 py-2.5 rounded-xl bg-[#F5C400] text-[#0B0B0A] font-heading font-bold text-xs hover:bg-[#E5B700] transition-colors"
                    >
                      Browse Components
                    </button>
                  </div>
                ) : (
                  cart.map(({ product, quantity }) => (
                    <div key={product.id} className="pt-4 first:pt-0 flex gap-3 sm:gap-4 items-center">
                      {/* Product Thumbnail */}
                      <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl bg-[#EDE3CF] p-1.5 flex-shrink-0 flex items-center justify-center border border-[#6B7A2A]/20">
                        <SafeImage
                          src={product.image}
                          alt={product.name}
                          mixBlend={true}
                          aspectRatio="aspect-square"
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Info & Quantity */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-mono text-[#A3B04B] uppercase tracking-wider truncate">
                          {product.sku}
                        </p>
                        <h4
                          onClick={() => {
                            setIsCartOpen(false);
                            navigateTo('detail', product.id);
                          }}
                          className="font-heading font-semibold text-xs sm:text-sm text-white hover:text-[#F5C400] transition-colors truncate cursor-pointer"
                        >
                          {product.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1 mb-2">
                          <span className="text-sm font-heading font-bold text-[#F5C400]">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                          {product.originalPrice && (
                            <span className="text-[11px] font-mono text-[#EDE3CF]/50 line-through">
                              ₹{product.originalPrice}
                            </span>
                          )}
                        </div>

                        {/* Quantity Stepper */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 bg-[#1A1A17] border border-[#262622] rounded-lg p-1">
                            <button
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                              className="w-5 h-5 rounded flex items-center justify-center text-[#EDE3CF] hover:text-white hover:bg-[#262622]"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-xs font-mono font-bold px-1.5 text-white">
                              {quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                              className="w-5 h-5 rounded flex items-center justify-center text-[#EDE3CF] hover:text-white hover:bg-[#262622]"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="text-[#EDE3CF]/50 hover:text-red-400 p-1.5 transition-colors"
                            title="Remove product"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Checkout Summary */}
              {cart.length > 0 && (
                <div className="p-4 sm:p-6 border-t border-[#262622] bg-[#161614] space-y-3">
                  <div className="space-y-1.5 text-xs font-body text-[#EDE3CF]/80">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-mono text-white">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Express Shipping</span>
                      <span className="font-mono text-white">
                        {remainingForFreeShipping === 0 ? (
                          <span className="text-[#A3B04B]">FREE</span>
                        ) : (
                          '₹80'
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>GST (18% Included)</span>
                      <span className="font-mono text-[#EDE3CF]/60">Included</span>
                    </div>
                    <div className="pt-2 border-t border-[#262622] flex justify-between items-baseline font-heading font-extrabold text-base text-white">
                      <span>Estimated Total</span>
                      <span className="text-lg text-[#F5C400]">
                        ₹{(cartSubtotal + (remainingForFreeShipping === 0 ? 0 : 80)).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#F5C400] hover:bg-[#E5B700] text-[#0B0B0A] font-heading font-bold text-sm tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 active:scale-98"
                  >
                    <span>Proceed to Instant Checkout</span>
                    <ArrowRight size={16} />
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-[#EDE3CF]/60 text-center pt-1">
                    <ShieldCheck size={12} className="text-[#6B7A2A]" />
                    <span>256-BIT ENCRYPTED • 7-DAY REPLACEMENT GUARANTEE</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
