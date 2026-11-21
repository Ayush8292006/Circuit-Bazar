import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  Truck,
  ShieldCheck,
  Tag,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  ChevronRight
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { SafeImage } from '../components/SafeImage';

export const CartPage = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    freeShippingThreshold,
    freeShippingProgress,
    navigateTo,
    showToast,
    addToCart
  } = useShop();

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [pincode, setPincode] = useState('560001');
  const [pincodeVerified, setPincodeVerified] = useState(true);

  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  // Discount calculation
  const discountAmount = appliedCoupon
    ? Math.round(cartSubtotal * appliedCoupon.discount)
    : 0;

  const shippingCost = remainingForFreeShipping === 0 || cart.length === 0 ? 0 : 80;
  const grandTotal = Math.max(0, cartSubtotal - discountAmount + shippingCost);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();

    if (!code) {
      setCouponError('Please enter a coupon code');
      return;
    }

    if (code === 'MAKER10' || code === 'CIRCUIT10') {
      setAppliedCoupon({ code, discount: 0.1, label: '10% Maker Discount' });
      showToast('🎉 Coupon MAKER10 applied: 10% OFF!');
    } else if (code === 'FIRSTBUY' || code === 'WELCOME') {
      setAppliedCoupon({ code, discount: 0.15, label: '15% First Order Discount' });
      showToast('🎉 Coupon FIRSTBUY applied: 15% OFF!');
    } else {
      setCouponError('Invalid code. Try "MAKER10" or "FIRSTBUY"');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    showToast('Coupon removed');
  };

  const handleCheckout = () => {
    showToast('🎉 Order placed successfully! Tracking link sent to your mobile.', 'success');
    clearCart();
    navigateTo('home');
  };

  // Recommended accessories (not already in cart)
  const cartIds = cart.map((item) => item.product.id);
  const recommendedAddons = PRODUCTS.filter((p) => !cartIds.includes(p.id)).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#EDE3CF] text-[#171D0A] pt-24 pb-28 sm:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#4F5938] mb-4 sm:mb-6">
          <button
            onClick={() => navigateTo('home')}
            className="hover:text-[#171D0A] transition-colors"
          >
            Home
          </button>
          <ChevronRight size={12} />
          <button
            onClick={() => navigateTo('listing')}
            className="hover:text-[#171D0A] transition-colors"
          >
            Catalog
          </button>
          <ChevronRight size={12} />
          <span className="text-[#4A5520] font-bold">Shopping Cart</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b-2 border-[#DFD4BD] gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#4A5520] uppercase tracking-wider mb-1">
              <ShoppingBag size={14} /> Silicon & Hardware Cart
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-[#171D0A]">
              Your Components ({cart.reduce((sum, item) => sum + item.quantity, 0)} Items)
            </h1>
          </div>

          {cart.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigateTo('listing')}
                className="text-xs font-mono font-bold text-[#4A5520] hover:text-[#262E10] flex items-center gap-1.5"
              >
                <ArrowLeft size={14} />
                <span>CONTINUE SHOPPING</span>
              </button>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to clear your cart?')) {
                    clearCart();
                  }
                }}
                className="text-xs font-mono text-[#4F5938] hover:text-red-600 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>

        {/* Free Shipping Tracker Bar */}
        {cart.length > 0 && (
          <div className="mb-6 bg-[#FAF6ED] border-2 border-[#4A5520]/25 rounded-2xl p-3 sm:p-4 shadow-sm">
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <div className="flex items-center gap-2 text-[#171D0A]">
                <div className="w-6 h-6 rounded-lg bg-[#4A5520]/15 flex items-center justify-center text-[#4A5520]">
                  <Truck size={14} />
                </div>
                {remainingForFreeShipping === 0 ? (
                  <span className="text-[#4A5520] font-bold text-xs sm:text-sm">
                    🎉 Express Free Shipping unlocked for this order!
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-[#4A5520] font-bold">₹{remainingForFreeShipping}</strong> more to unlock Free Express Delivery
                  </span>
                )}
              </div>
              <span className="text-[#4A5520] font-bold font-mono">{freeShippingProgress}%</span>
            </div>
            <div className="w-full h-2 bg-[#DFD4BD] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#6B7A2A] to-[#4A5520]"
                initial={{ width: 0 }}
                animate={{ width: `${freeShippingProgress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        )}

        {/* Main Content: Empty State vs 2-Col Cart Layout */}
        {cart.length === 0 ? (
          <div className="bg-[#FAF6ED] border-2 border-[#4A5520]/20 rounded-3xl p-8 sm:p-16 text-center max-w-2xl mx-auto my-6 shadow-sm">
            <div className="w-20 h-20 rounded-2xl bg-[#EDE3CF] border-2 border-[#4A5520]/30 flex items-center justify-center mx-auto text-[#4A5520] mb-5 shadow-inner">
              <ShoppingBag size={36} />
            </div>
            <h2 className="font-heading font-extrabold text-2xl text-[#171D0A] mb-2">
              Your cart is completely empty
            </h2>
            <p className="font-body text-sm text-[#4F5938] max-w-md mx-auto mb-8 font-medium">
              You haven't added any microcontrollers, sensors, or developer kits yet. Explore our verified silicon inventory to start building.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => navigateTo('listing')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#4A5520] hover:bg-[#384318] text-[#F7F2E7] font-heading font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Browse All Components</span>
                <ArrowRight size={16} className="text-[#F5C400]" />
              </button>
              <button
                onClick={() => navigateTo('home')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl border-2 border-[#4A5520]/30 hover:border-[#4A5520] bg-[#EDE3CF] text-[#171D0A] font-heading font-bold text-sm transition-all"
              >
                Back to Home
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
            {/* Left 8 Cols: Cart Items List & Add-ons */}
            <div className="lg:col-span-8 space-y-4">
              {/* Items Card Container */}
              <div className="bg-[#FAF6ED] border-2 border-[#4A5520]/25 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm divide-y divide-[#DFD4BD]">
                {cart.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="pt-4 first:pt-0 pb-4 last:pb-0 flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center justify-between"
                  >
                    {/* Media & Details Group */}
                    <div className="flex gap-3 sm:gap-4 items-center flex-1 min-w-0 w-full sm:w-auto">
                      {/* Product Thumbnail */}
                      <div
                        onClick={() => navigateTo('detail', product.id)}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-[#EDE3CF] p-2 flex-shrink-0 flex items-center justify-center border border-[#4A5520]/20 cursor-pointer shadow-inner"
                      >
                        <SafeImage
                          src={product.image}
                          alt={product.name}
                          mixBlend={true}
                          aspectRatio="aspect-square"
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[10px] font-mono text-[#4A5520] font-bold uppercase tracking-wider bg-[#EDE3CF] px-2 py-0.5 rounded border border-[#4A5520]/20">
                            {product.sku}
                          </span>
                          <span className="text-[10px] font-mono text-[#4F5938] font-semibold">
                            {product.brand}
                          </span>
                        </div>

                        <h3
                          onClick={() => navigateTo('detail', product.id)}
                          className="font-heading font-bold text-sm sm:text-base text-[#171D0A] hover:text-[#4A5520] cursor-pointer transition-colors line-clamp-2 leading-snug"
                        >
                          {product.name}
                        </h3>

                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="font-heading font-extrabold text-sm sm:text-base text-[#171D0A]">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs font-mono text-[#4F5938] line-through">
                              ₹{product.originalPrice}
                            </span>
                          )}
                          <span className="text-[10px] font-mono font-bold text-[#4A5520]">
                            ⚡ In Stock
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Stepper & Subtotal Action Group */}
                    <div className="flex items-center justify-between w-full sm:w-auto sm:gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#DFD4BD]/60">
                      {/* Touch-Friendly Stepper */}
                      <div className="flex items-center bg-[#EDE3CF] border-2 border-[#4A5520]/30 rounded-xl p-1 shadow-inner">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-[#171D0A] hover:bg-[#FAF6ED] active:scale-95 transition-all"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-10 text-center font-mono font-bold text-sm text-[#171D0A]">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-[#171D0A] hover:bg-[#FAF6ED] active:scale-95 transition-all"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Row Total & Trash Button */}
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="block text-[10px] font-mono text-[#4F5938] uppercase">
                            Total
                          </span>
                          <span className="font-heading font-extrabold text-base sm:text-lg text-[#171D0A]">
                            ₹{(product.price * quantity).toLocaleString('en-IN')}
                          </span>
                        </div>

                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="p-2 sm:p-2.5 rounded-xl text-[#4F5938] hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-all active:scale-95"
                          title="Remove item"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Estimation Card */}
              <div className="bg-[#FAF6ED] border-2 border-[#4A5520]/20 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#EDE3CF] border border-[#4A5520]/30 flex items-center justify-center text-[#4A5520]">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-xs sm:text-sm text-[#171D0A]">
                      Guaranteed 24-Hour Express Dispatch
                    </h4>
                    <p className="font-body text-xs text-[#4F5938]">
                      Orders placed before 2:00 PM ship same day in anti-static ESD bags.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-[#EDE3CF] px-3 py-1.5 rounded-xl border border-[#4A5520]/20 text-xs font-mono text-[#4A5520] font-bold self-start sm:self-auto">
                  <MapPin size={13} />
                  <span>PIN: {pincode}</span>
                </div>
              </div>

              {/* Recommended Maker Add-ons Section */}
              {recommendedAddons.length > 0 && (
                <div className="bg-[#FAF6ED] border-2 border-[#4A5520]/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles size={16} className="text-[#4A5520]" />
                    <h3 className="font-heading font-extrabold text-sm sm:text-base text-[#171D0A]">
                      Frequently Paired Maker Components
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {recommendedAddons.map((addon) => (
                      <div
                        key={addon.id}
                        className="p-3 rounded-xl bg-[#EDE3CF]/70 border border-[#4A5520]/20 flex sm:flex-col justify-between items-center sm:items-start gap-3"
                      >
                        <div className="flex sm:flex-col items-center sm:items-start gap-2.5 min-w-0">
                          <div className="w-12 h-12 rounded-lg bg-[#FAF6ED] p-1 flex-shrink-0 flex items-center justify-center">
                            <SafeImage
                              src={addon.image}
                              alt={addon.name}
                              mixBlend={true}
                              aspectRatio="aspect-square"
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="min-w-0">
                            <h5 className="font-heading font-bold text-xs text-[#171D0A] truncate">
                              {addon.name}
                            </h5>
                            <span className="font-mono font-bold text-xs text-[#4A5520]">
                              ₹{addon.price}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => addToCart(addon, 1)}
                          className="w-full py-1.5 px-3 rounded-lg bg-[#4A5520] hover:bg-[#384318] text-[#F7F2E7] font-mono text-[11px] font-bold transition-all shadow-sm active:scale-95 flex items-center justify-center gap-1"
                        >
                          <Plus size={12} />
                          <span>Add</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right 4 Cols: Sticky Order Summary & Checkout */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-4">
              <div className="bg-[#FAF6ED] border-2 border-[#4A5520] rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-elevated">
                <h3 className="font-heading font-extrabold text-lg text-[#171D0A] pb-3 border-b border-[#DFD4BD] mb-4">
                  Order Summary
                </h3>

                {/* Coupon Code Input */}
                <form onSubmit={handleApplyCoupon} className="mb-4">
                  <label className="block text-[11px] font-mono font-bold text-[#4A5520] uppercase tracking-wider mb-1.5">
                    Promo / Institutional Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. MAKER10"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      disabled={!!appliedCoupon}
                      className="flex-1 bg-[#EDE3CF] border-2 border-[#4A5520]/25 rounded-xl px-3 py-2 text-xs font-mono uppercase text-[#171D0A] placeholder-[#4F5938]/60 focus:outline-none focus:border-[#4A5520]"
                    />
                    {appliedCoupon ? (
                      <button
                        type="button"
                        onClick={handleRemoveCoupon}
                        className="px-3 py-2 rounded-xl bg-red-100 text-red-700 hover:bg-red-200 text-xs font-mono font-bold"
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-[#4A5520] hover:bg-[#384318] text-[#F7F2E7] text-xs font-mono font-bold transition-colors active:scale-95"
                      >
                        Apply
                      </button>
                    )}
                  </div>
                  {couponError && (
                    <p className="text-[11px] text-red-600 mt-1 font-mono font-medium">
                      {couponError}
                    </p>
                  )}
                  {appliedCoupon && (
                    <div className="flex items-center gap-1.5 text-xs text-[#4A5520] font-mono font-bold mt-1.5">
                      <CheckCircle2 size={13} />
                      <span>{appliedCoupon.label} Applied!</span>
                    </div>
                  )}
                </form>

                {/* Price Breakdown */}
                <div className="space-y-2 text-xs font-body text-[#3E4924] font-medium border-t border-[#DFD4BD] pt-4">
                  <div className="flex justify-between items-center">
                    <span>Components Subtotal</span>
                    <span className="font-mono text-[#171D0A] font-bold">
                      ₹{cartSubtotal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {appliedCoupon && (
                    <div className="flex justify-between items-center text-[#4A5520]">
                      <span>Discount ({appliedCoupon.code})</span>
                      <span className="font-mono font-bold">-₹{discountAmount}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span>Express Dispatch & Packing</span>
                    <span className="font-mono font-bold">
                      {shippingCost === 0 ? (
                        <span className="text-[#4A5520]">FREE</span>
                      ) : (
                        `₹${shippingCost}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-[11px] text-[#4F5938]">
                    <span>GST (18% B2B Invoice Compliant)</span>
                    <span className="font-mono font-semibold">Included</span>
                  </div>

                  {/* Grand Total */}
                  <div className="pt-3 mt-2 border-t-2 border-[#DFD4BD] flex justify-between items-baseline">
                    <div>
                      <span className="font-heading font-extrabold text-base text-[#171D0A] block">
                        Estimated Total
                      </span>
                      <span className="text-[10px] font-mono text-[#4F5938]">
                        Includes all taxes & duties
                      </span>
                    </div>
                    <span className="font-heading font-extrabold text-2xl text-[#171D0A]">
                      ₹{grandTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Main Desktop Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full mt-6 py-4 px-4 rounded-xl bg-[#4A5520] hover:bg-[#384318] text-[#F7F2E7] font-heading font-bold text-sm tracking-wide transition-all shadow-[0_4px_20px_rgba(74,85,32,0.25)] flex items-center justify-center gap-2 active:scale-98"
                >
                  <span>Proceed to Instant Checkout</span>
                  <ArrowRight size={16} className="text-[#F5C400]" />
                </button>

                {/* Trust Badges */}
                <div className="mt-5 pt-4 border-t border-[#DFD4BD] space-y-2">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-[#4F5938]">
                    <ShieldCheck size={14} className="text-[#4A5520] flex-shrink-0" />
                    <span>100% Genuine Silicon Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-[#4F5938]">
                    <CheckCircle2 size={14} className="text-[#4A5520] flex-shrink-0" />
                    <span>7-Day Replacement for DOA Parts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* STICKY BOTTOM CHECKOUT BAR FOR MOBILE SCREENS (< 1024px) */}
      {cart.length > 0 && (
        <div className="lg:hidden fixed bottom-14 left-0 right-0 z-30 bg-[#FAF6ED]/95 backdrop-blur-lg border-t-2 border-[#4A5520]/40 p-3 shadow-2xl">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono text-[#4F5938] uppercase block">
                Total ({cart.reduce((sum, item) => sum + item.quantity, 0)} Items)
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-heading font-extrabold text-lg text-[#171D0A]">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
                {shippingCost === 0 && (
                  <span className="text-[10px] font-mono font-bold text-[#4A5520]">
                    Free Delivery
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="flex-1 max-w-[200px] py-3 px-4 rounded-xl bg-[#4A5520] hover:bg-[#384318] text-[#F7F2E7] font-heading font-bold text-xs tracking-wide transition-all shadow-md flex items-center justify-center gap-1.5 active:scale-95"
            >
              <span>Checkout</span>
              <ArrowRight size={14} className="text-[#F5C400]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
