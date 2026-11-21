import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, ShieldCheck, ExternalLink } from 'lucide-react';
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
    showToast("🎉 Order placed successfully! Tracking link sent to your mobile.", "success");
    clearCart();
  };

  const handleViewFullCart = () => {
    setIsCartOpen(false);
    navigateTo('cart');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden text-[#171D0A]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-[#171D0A]/60 backdrop-blur-sm"
          />

          {/* Drawer Container: 100% width on mobile, max-w-md on desktop */}
          <div className="fixed inset-y-0 right-0 w-full sm:max-w-md flex sm:pl-10 pointer-events-none">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-full h-full h-[100dvh] bg-[#FAF6ED] border-l-2 border-[#4A5520] flex flex-col shadow-2xl pointer-events-auto"
            >
              {/* Header */}
              <div className="px-4 py-3.5 sm:px-6 sm:py-4 border-b border-[#DFD4BD] flex items-center justify-between bg-[#EDE3CF] flex-shrink-0">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={18} className="text-[#4A5520]" />
                  <h2 className="font-heading font-extrabold text-base sm:text-lg text-[#171D0A]">
                    Cart
                  </h2>
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#FAF6ED] text-[#4A5520] border border-[#4A5520]/30">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {cart.length > 0 && (
                    <button
                      onClick={handleViewFullCart}
                      className="text-[11px] font-mono font-bold text-[#4A5520] hover:text-[#252D0F] flex items-center gap-1 px-2 py-1 rounded bg-[#FAF6ED] border border-[#4A5520]/20"
                      title="Open full page"
                    >
                      <span>Full Page</span>
                      <ExternalLink size={11} />
                    </button>
                  )}
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-1.5 sm:p-2 rounded-xl text-[#4F5938] hover:text-[#171D0A] hover:bg-[#DFD4BD] transition-colors"
                    aria-label="Close cart"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Free Shipping Progress Bar */}
              <div className="px-4 py-2.5 sm:px-6 sm:py-3 bg-[#F3EBD9] border-b border-[#DFD4BD] flex-shrink-0">
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <div className="flex items-center gap-1.5 text-[#171D0A] truncate">
                    <Truck size={13} className="text-[#4A5520] flex-shrink-0" />
                    {remainingForFreeShipping === 0 ? (
                      <span className="text-[#4A5520] font-bold text-[11px] sm:text-xs">
                        🎉 FREE Express Shipping Unlocked!
                      </span>
                    ) : (
                      <span className="text-[11px] sm:text-xs truncate">
                        Add <strong className="text-[#4A5520]">₹{remainingForFreeShipping}</strong> more for Free Shipping
                      </span>
                    )}
                  </div>
                  <span className="text-[#4F5938] font-bold text-[11px] flex-shrink-0 ml-2">
                    {freeShippingProgress}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#DFD4BD] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#6B7A2A] to-[#4A5520]"
                    initial={{ width: 0 }}
                    animate={{ width: `${freeShippingProgress}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto px-4 py-3 sm:px-6 sm:py-4 space-y-3 divide-y divide-[#DFD4BD] -webkit-overflow-scrolling-touch">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
                    <div className="w-16 h-16 rounded-2xl bg-[#EDE3CF] border-2 border-[#4A5520]/25 flex items-center justify-center text-[#4A5520] mb-4 shadow-inner">
                      <ShoppingBag size={28} />
                    </div>
                    <h3 className="font-heading font-bold text-base sm:text-lg text-[#171D0A] mb-1">
                      Your cart is empty
                    </h3>
                    <p className="text-xs text-[#4F5938] max-w-xs mb-6 font-body">
                      Explore development boards, sensors, relay modules, and robotics kits in our verified catalog.
                    </p>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        navigateTo('listing');
                      }}
                      className="px-6 py-2.5 rounded-xl bg-[#4A5520] hover:bg-[#384318] text-[#F7F2E7] font-heading font-bold text-xs transition-colors shadow-sm flex items-center gap-1.5"
                    >
                      <span>Browse Components</span>
                      <ArrowRight size={13} className="text-[#F5C400]" />
                    </button>
                  </div>
                ) : (
                  cart.map(({ product, quantity }) => (
                    <div key={product.id} className="pt-3 first:pt-0 flex gap-3 items-center">
                      {/* Product Thumbnail */}
                      <div
                        onClick={() => {
                          setIsCartOpen(false);
                          navigateTo('detail', product.id);
                        }}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#EDE3CF] p-1.5 flex-shrink-0 flex items-center justify-center border border-[#4A5520]/20 cursor-pointer shadow-inner"
                      >
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
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-[9px] font-mono text-[#4A5520] font-bold uppercase tracking-wider truncate">
                            {product.sku}
                          </span>
                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="text-[#4F5938] hover:text-red-600 p-1 transition-colors"
                            title="Remove product"
                            aria-label="Remove product"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>

                        <h4
                          onClick={() => {
                            setIsCartOpen(false);
                            navigateTo('detail', product.id);
                          }}
                          className="font-heading font-bold text-xs text-[#171D0A] hover:text-[#4A5520] transition-colors truncate cursor-pointer"
                        >
                          {product.name}
                        </h4>

                        <div className="flex items-center justify-between mt-1.5">
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-xs sm:text-sm font-heading font-extrabold text-[#171D0A]">
                              ₹{(product.price * quantity).toLocaleString('en-IN')}
                            </span>
                            {product.originalPrice && (
                              <span className="text-[10px] font-mono text-[#4F5938] line-through">
                                ₹{product.originalPrice * quantity}
                              </span>
                            )}
                          </div>

                          {/* Ergonomic Touch Stepper */}
                          <div className="flex items-center bg-[#EDE3CF] border border-[#4A5520]/30 rounded-lg p-0.5 shadow-inner">
                            <button
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                              className="w-6 h-6 rounded flex items-center justify-center text-[#171D0A] hover:bg-[#FAF6ED] active:scale-90 transition-all"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={11} />
                            </button>
                            <span className="text-xs font-mono font-bold px-2 text-[#171D0A]">
                              {quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                              className="w-6 h-6 rounded flex items-center justify-center text-[#171D0A] hover:bg-[#FAF6ED] active:scale-90 transition-all"
                              aria-label="Increase quantity"
                            >
                              <Plus size={11} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Checkout Summary: Pinned to bottom cleanly */}
              {cart.length > 0 && (
                <div className="p-4 sm:p-5 border-t border-[#DFD4BD] bg-[#EDE3CF] space-y-2.5 flex-shrink-0">
                  <div className="space-y-1 text-xs font-body text-[#3E4924] font-medium">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-mono text-[#171D0A] font-bold">
                        ₹{cartSubtotal.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Express Shipping</span>
                      <span className="font-mono text-[#171D0A] font-bold">
                        {remainingForFreeShipping === 0 ? (
                          <span className="text-[#4A5520]">FREE</span>
                        ) : (
                          '₹80'
                        )}
                      </span>
                    </div>
                    <div className="pt-1.5 border-t border-[#DFD4BD] flex justify-between items-baseline font-heading font-extrabold text-sm sm:text-base text-[#171D0A]">
                      <span>Estimated Total</span>
                      <span className="text-lg sm:text-xl text-[#171D0A]">
                        ₹{(cartSubtotal + (remainingForFreeShipping === 0 ? 0 : 80)).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Primary Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    className="w-full py-3 px-4 rounded-xl bg-[#4A5520] hover:bg-[#384318] text-[#F7F2E7] font-heading font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 active:scale-98"
                  >
                    <span>Instant Checkout</span>
                    <ArrowRight size={14} className="text-[#F5C400]" />
                  </button>

                  <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-[#4F5938]">
                    <button
                      onClick={handleViewFullCart}
                      className="text-[#4A5520] hover:underline font-bold"
                    >
                      View Full Cart & Coupons →
                    </button>
                    <div className="flex items-center gap-1">
                      <ShieldCheck size={11} className="text-[#4A5520]" />
                      <span>256-Bit SSL</span>
                    </div>
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
