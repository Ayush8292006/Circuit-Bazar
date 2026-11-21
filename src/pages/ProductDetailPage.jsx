import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  ShoppingCart,
  Zap,
  Plus,
  Minus,
  Check,
  CheckCircle2,
  Share2,
  FileText,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { SafeImage } from '../components/SafeImage';

export const ProductDetailPage = () => {
  const {
    selectedProductId,
    navigateTo,
    addToCart,
    setIsCartOpen,
    showToast
  } = useShop();

  const product = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState('specs'); // 'specs' | 'description' | 'pinouts'
  const [bundleSelected, setBundleSelected] = useState([true, true]); // for frequently bought together

  const galleryImages = product.gallery && product.gallery.length > 0
    ? product.gallery
    : [product.image];

  // Frequently bought together accessories
  const relatedProducts = (product.frequentlyBoughtTogether || [])
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean);

  const bundleTotal = product.price + relatedProducts.reduce((sum, item, idx) => {
    return bundleSelected[idx] ? sum + item.price : sum;
  }, 0);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setIsCartOpen(true);
  };

  const handleAddBundle = () => {
    addToCart(product, 1);
    relatedProducts.forEach((item, idx) => {
      if (bundleSelected[idx]) addToCart(item, 1);
    });
    showToast("Bundle added to your cart!");
    setIsCartOpen(true);
  };

  return (
    <div className="pt-28 pb-24 min-h-screen bg-[#0B0B0A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#EDE3CF]/60 mb-8 overflow-x-auto whitespace-nowrap">
          <button onClick={() => navigateTo('home')} className="hover:text-[#F5C400]">
            HOME
          </button>
          <span>/</span>
          <button
            onClick={() => navigateTo('listing', null, product.category)}
            className="hover:text-[#F5C400]"
          >
            {product.categoryName.toUpperCase()}
          </button>
          <span>/</span>
          <span className="text-[#A3B04B] truncate">{product.sku}</span>
        </div>

        {/* Main Product Showcase Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-20">
          {/* Left Column: Image Gallery with Zoom & Thumbnails (5 cols) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Stage Image in Beige Card with soft shadow & multiply */}
            <div className="relative aspect-square rounded-3xl bg-[#EDE3CF] p-8 overflow-hidden shadow-card-beige flex items-center justify-center border border-[#6B7A2A]/20">
              {product.discount && (
                <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-[#F5C400] text-[#0B0B0A] font-mono font-bold text-xs shadow-md">
                  {product.discount}
                </span>
              )}

              <SafeImage
                src={galleryImages[activeImageIndex]}
                alt={product.name}
                mixBlend={true}
                aspectRatio="aspect-square"
                className="w-full h-full object-contain transition-transform duration-500 hover:scale-110 cursor-zoom-in"
              />
            </div>

            {/* Thumbnail Strip */}
            <div className="grid grid-cols-4 gap-3">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`aspect-square rounded-xl bg-[#EDE3CF] p-2 overflow-hidden border-2 transition-all ${
                    activeImageIndex === idx
                      ? 'border-[#F5C400] ring-2 ring-[#F5C400]/30 scale-105'
                      : 'border-[#262622] hover:border-[#6B7A2A] opacity-75 hover:opacity-100'
                  }`}
                >
                  <SafeImage
                    src={img}
                    alt={`${product.name} view ${idx + 1}`}
                    mixBlend={true}
                    aspectRatio="aspect-square"
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Details, Specs, Pricing & Actions (7 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              {/* Brand and SKU in Mono */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-[#A3B04B] tracking-wider uppercase">
                  {product.brand}
                </span>
                <span className="text-xs font-mono text-[#EDE3CF]/60">
                  {product.sku}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white leading-tight mb-3">
                {product.name}
              </h1>

              {/* Rating & Stock Status */}
              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="flex items-center gap-1.5 text-[#F5C400]">
                  <Star size={14} className="fill-[#F5C400]" />
                  <span className="font-bold text-white text-sm">{product.rating}</span>
                  <span className="text-[#EDE3CF]/50">({product.reviewCount} maker reviews)</span>
                </div>
                <span className="text-[#262622]">|</span>
                <span className="text-[#A3B04B] flex items-center gap-1">
                  <CheckCircle2 size={13} /> {product.stockCount} Units in Stock (24h Dispatch)
                </span>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="p-4 rounded-2xl bg-[#141412] border border-[#262622] flex items-baseline justify-between">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="font-heading font-extrabold text-3xl text-[#F5C400]">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm font-mono text-[#EDE3CF]/50 line-through">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-mono text-[#EDE3CF]/60 block mt-0.5">
                  Inclusive of 18% GST • Official Invoice Generated
                </span>
              </div>

              {product.discount && (
                <span className="text-xs font-mono font-bold text-[#A3B04B] bg-[#6B7A2A]/20 px-2.5 py-1 rounded-md border border-[#6B7A2A]/40">
                  SAVE {product.discount}
                </span>
              )}
            </div>

            {/* Short Description */}
            <p className="text-sm font-body text-[#EDE3CF]/80 leading-relaxed">
              {product.shortDesc}
            </p>

            {/* Quantity Selector & Action CTAs */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-4">
                {/* Stepper */}
                <div className="flex items-center bg-[#141412] border border-[#262622] rounded-xl p-1.5">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg bg-[#1E1E1B] hover:bg-[#2A2A26] flex items-center justify-center text-white"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-12 text-center font-mono font-bold text-sm text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-[#1E1E1B] hover:bg-[#2A2A26] flex items-center justify-center text-white"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Add to Cart CTA */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-[#EDE3CF] hover:bg-[#F5C400] text-[#0B0B0A] font-heading font-bold text-sm transition-all flex items-center justify-center gap-2 active:scale-98 shadow-md"
                >
                  <ShoppingCart size={16} />
                  <span>Add to Cart (₹{(product.price * quantity).toLocaleString('en-IN')})</span>
                </button>
              </div>

              {/* Buy Now CTA */}
              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 px-6 rounded-xl bg-[#F5C400] hover:bg-[#E5B700] text-[#0B0B0A] font-heading font-extrabold text-sm tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 active:scale-98"
              >
                <Zap size={16} />
                <span>Buy Now with Instant Express Checkout</span>
              </button>
            </div>

            {/* Guarantees Strip */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#262622] text-[11px] font-mono text-[#EDE3CF]/70">
              <div className="flex items-center gap-2">
                <Truck size={16} className="text-[#A3B04B]" />
                <span>24h Dispatch</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#A3B04B]" />
                <span>100% Genuine</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw size={16} className="text-[#A3B04B]" />
                <span>7-Day Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Datasheet & Specs Table (Full Width) */}
        <div className="bg-[#141412] border border-[#262622] rounded-3xl p-6 sm:p-10 mb-20 shadow-xl">
          <div className="flex items-center gap-6 border-b border-[#262622] pb-4 mb-6">
            <button
              onClick={() => setSelectedTab('specs')}
              className={`font-mono text-xs sm:text-sm uppercase tracking-wider pb-2 border-b-2 transition-all ${
                selectedTab === 'specs'
                  ? 'border-[#F5C400] text-[#F5C400] font-bold'
                  : 'border-transparent text-[#EDE3CF]/60 hover:text-white'
              }`}
            >
              Datasheet Specifications
            </button>
            <button
              onClick={() => setSelectedTab('description')}
              className={`font-mono text-xs sm:text-sm uppercase tracking-wider pb-2 border-b-2 transition-all ${
                selectedTab === 'description'
                  ? 'border-[#F5C400] text-[#F5C400] font-bold'
                  : 'border-transparent text-[#EDE3CF]/60 hover:text-white'
              }`}
            >
              Detailed Overview
            </button>
          </div>

          {selectedTab === 'specs' ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs sm:text-sm">
                <tbody className="divide-y divide-[#262622]">
                  {Object.entries(product.specs || {}).map(([key, value], idx) => (
                    <tr key={key} className={idx % 2 === 0 ? 'bg-[#181815]' : 'bg-transparent'}>
                      <td className="py-3 px-4 text-[#A3B04B] font-semibold w-1/3 sm:w-1/4">
                        {key}
                      </td>
                      <td className="py-3 px-4 text-[#EDE3CF] font-body">
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="font-body text-sm text-[#EDE3CF]/80 leading-relaxed space-y-4">
              <p>{product.description}</p>
              <div className="p-4 rounded-xl bg-[#1A1A17] border border-[#6B7A2A]/30">
                <h4 className="font-heading font-bold text-white mb-2">Recommended Wiring & Pinouts</h4>
                <p className="text-xs text-[#EDE3CF]/70">
                  Operates within specified tolerances. For I2C connectivity, ensure pull-up resistors (4.7kΩ) are tied to VCC if multiple peripheral devices are sharing the bus.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* "Frequently Bought Together" Bundle Module */}
        {relatedProducts.length > 0 && (
          <div className="bg-[#141412] border border-[#6B7A2A]/40 rounded-3xl p-6 sm:p-10 mb-20 shadow-2xl">
            <div className="mb-6">
              <span className="text-xs font-mono text-[#F5C400] uppercase tracking-wider">
                COMPATIBLE HARDWARE
              </span>
              <h3 className="font-heading font-extrabold text-2xl text-white mt-1">
                Frequently Bought Together
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Bundle items list */}
              <div className="lg:col-span-8 flex flex-col sm:flex-row items-center gap-4">
                {/* Main Product */}
                <div className="flex-1 bg-[#1A1A17] border border-[#262622] rounded-2xl p-4 flex items-center gap-3 w-full sm:w-auto">
                  <div className="w-16 h-16 rounded-xl bg-[#EDE3CF] p-1 flex-shrink-0">
                    <SafeImage
                      src={product.image}
                      alt={product.name}
                      mixBlend={true}
                      aspectRatio="aspect-square"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-[#A3B04B]">THIS ITEM</span>
                    <p className="font-heading font-semibold text-xs text-white truncate">
                      {product.name}
                    </p>
                    <p className="font-heading font-bold text-sm text-[#F5C400]">
                      ₹{product.price}
                    </p>
                  </div>
                </div>

                <span className="text-[#F5C400] font-extrabold text-xl">+</span>

                {/* Accessory 1 */}
                {relatedProducts[0] && (
                  <div className="flex-1 bg-[#1A1A17] border border-[#262622] rounded-2xl p-4 flex items-center gap-3 w-full sm:w-auto">
                    <input
                      type="checkbox"
                      checked={bundleSelected[0]}
                      onChange={(e) => setBundleSelected([e.target.checked, bundleSelected[1]])}
                      className="w-4 h-4 rounded text-[#6B7A2A] bg-[#262622]"
                    />
                    <div className="w-16 h-16 rounded-xl bg-[#EDE3CF] p-1 flex-shrink-0">
                      <SafeImage
                        src={relatedProducts[0].image}
                        alt={relatedProducts[0].name}
                        mixBlend={true}
                        aspectRatio="aspect-square"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-heading font-semibold text-xs text-white truncate">
                        {relatedProducts[0].name}
                      </p>
                      <p className="font-heading font-bold text-sm text-[#F5C400]">
                        ₹{relatedProducts[0].price}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Total & Action */}
              <div className="lg:col-span-4 bg-[#1A1A17] border border-[#262622] rounded-2xl p-6 text-center lg:text-left">
                <span className="text-xs font-mono text-[#EDE3CF]/60 block mb-1">
                  BUNDLE COMBO PRICE:
                </span>
                <span className="font-heading font-extrabold text-3xl text-[#F5C400] block mb-4">
                  ₹{bundleTotal.toLocaleString('en-IN')}
                </span>

                <button
                  onClick={handleAddBundle}
                  className="w-full py-3 px-4 rounded-xl bg-[#F5C400] hover:bg-[#E5B700] text-[#0B0B0A] font-heading font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
                >
                  <ShoppingCart size={15} />
                  <span>Add Bundle to Cart</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
