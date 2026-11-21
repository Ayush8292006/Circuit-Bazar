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
  const [selectedTab, setSelectedTab] = useState('specs');
  const [bundleSelected, setBundleSelected] = useState([true, true]);

  const galleryImages = product.gallery && product.gallery.length > 0
    ? product.gallery
    : [product.image];

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
    <div className="pt-28 pb-24 min-h-screen bg-[#EDE3CF] text-[#171D0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#4F5938] mb-8 overflow-x-auto whitespace-nowrap font-bold">
          <button onClick={() => navigateTo('home')} className="hover:text-[#4A5520]">
            HOME
          </button>
          <span>/</span>
          <button
            onClick={() => navigateTo('listing', null, product.category)}
            className="hover:text-[#4A5520]"
          >
            {product.categoryName.toUpperCase()}
          </button>
          <span>/</span>
          <span className="text-[#4A5520] truncate">{product.sku}</span>
        </div>

        {/* Main Product Showcase Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-20">
          {/* Left Column: Image Gallery with Zoom & Thumbnails (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Stage Image in Beige Card with soft shadow & multiply */}
            <div className="relative aspect-square rounded-3xl bg-[#FAF6ED] p-8 overflow-hidden shadow-elevated flex items-center justify-center border-2 border-[#4A5520]/25">
              {product.discount && (
                <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-[#4A5520] text-[#F7F2E7] font-mono font-bold text-xs shadow-md">
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
                  className={`aspect-square rounded-xl bg-[#FAF6ED] p-2 overflow-hidden border-2 transition-all ${
                    activeImageIndex === idx
                      ? 'border-[#4A5520] ring-2 ring-[#4A5520]/30 scale-105 shadow-sm'
                      : 'border-[#DFD4BD] hover:border-[#4A5520] opacity-80 hover:opacity-100'
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

          {/* Right Column: Details, Specs, Pricing & Actions (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              {/* Brand and SKU in Mono */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-[#4A5520] font-bold tracking-wider uppercase">
                  {product.brand}
                </span>
                <span className="text-xs font-mono text-[#4F5938] font-bold">
                  {product.sku}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#171D0A] leading-tight mb-3">
                {product.name}
              </h1>

              {/* Rating & Stock Status */}
              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="flex items-center gap-1.5 text-[#4A5520]">
                  <Star size={14} className="fill-[#F5C400] text-[#F5C400]" />
                  <span className="font-bold text-[#171D0A] text-sm">{product.rating}</span>
                  <span className="text-[#4F5938]">({product.reviewCount} maker reviews)</span>
                </div>
                <span className="text-[#DFD4BD]">|</span>
                <span className="text-[#4A5520] font-bold flex items-center gap-1">
                  <CheckCircle2 size={13} /> {product.stockCount} Units in Stock (24h Dispatch)
                </span>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="p-4 rounded-2xl bg-[#FAF6ED] border-2 border-[#4A5520]/25 flex items-baseline justify-between shadow-sm">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="font-heading font-extrabold text-3xl text-[#171D0A]">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm font-mono text-[#4F5938] line-through font-bold">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-mono text-[#4F5938] block mt-0.5 font-medium">
                  Inclusive of 18% GST • Official Tax Invoice
                </span>
              </div>

              {product.discount && (
                <span className="text-xs font-mono font-bold text-[#F7F2E7] bg-[#4A5520] px-3 py-1 rounded-md shadow-sm">
                  SAVE {product.discount}
                </span>
              )}
            </div>

            {/* Short Description */}
            <p className="text-sm font-body text-[#3E4924] leading-relaxed font-medium">
              {product.shortDesc}
            </p>

            {/* Quantity Selector & Action CTAs */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-4">
                {/* Stepper */}
                <div className="flex items-center bg-[#FAF6ED] border-2 border-[#4A5520]/30 rounded-xl p-1.5">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg bg-[#EDE3CF] hover:bg-[#DFD4BD] flex items-center justify-center text-[#171D0A]"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-12 text-center font-mono font-bold text-sm text-[#171D0A]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-[#EDE3CF] hover:bg-[#DFD4BD] flex items-center justify-center text-[#171D0A]"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Add to Cart CTA */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-[#FAF6ED] hover:bg-[#F3EBD9] border-2 border-[#4A5520] text-[#171D0A] font-heading font-bold text-sm transition-all flex items-center justify-center gap-2 active:scale-98 shadow-sm"
                >
                  <ShoppingCart size={16} className="text-[#4A5520]" />
                  <span>Add to Cart (₹{(product.price * quantity).toLocaleString('en-IN')})</span>
                </button>
              </div>

              {/* Buy Now CTA */}
              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 px-6 rounded-xl bg-[#4A5520] hover:bg-[#384318] text-[#F7F2E7] font-heading font-extrabold text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 active:scale-98"
              >
                <Zap size={16} className="text-[#F5C400]" />
                <span>Buy Now with Instant Express Checkout</span>
              </button>
            </div>

            {/* Guarantees Strip */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t-2 border-[#DFD4BD] text-[11px] font-mono text-[#3E4924] font-bold">
              <div className="flex items-center gap-2">
                <Truck size={16} className="text-[#4A5520]" />
                <span>24h Dispatch</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#4A5520]" />
                <span>100% Genuine</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw size={16} className="text-[#4A5520]" />
                <span>7-Day Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Datasheet & Specs Table (Full Width) */}
        <div className="bg-[#FAF6ED] border-2 border-[#4A5520]/25 rounded-3xl p-6 sm:p-10 mb-20 shadow-elevated">
          <div className="flex items-center gap-6 border-b-2 border-[#DFD4BD] pb-4 mb-6">
            <button
              onClick={() => setSelectedTab('specs')}
              className={`font-mono text-xs sm:text-sm uppercase tracking-wider pb-2 border-b-2 transition-all font-bold ${
                selectedTab === 'specs'
                  ? 'border-[#4A5520] text-[#4A5520]'
                  : 'border-transparent text-[#4F5938] hover:text-[#171D0A]'
              }`}
            >
              Datasheet Specifications
            </button>
            <button
              onClick={() => setSelectedTab('description')}
              className={`font-mono text-xs sm:text-sm uppercase tracking-wider pb-2 border-b-2 transition-all font-bold ${
                selectedTab === 'description'
                  ? 'border-[#4A5520] text-[#4A5520]'
                  : 'border-transparent text-[#4F5938] hover:text-[#171D0A]'
              }`}
            >
              Detailed Overview
            </button>
          </div>

          {selectedTab === 'specs' ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs sm:text-sm">
                <tbody className="divide-y divide-[#DFD4BD]">
                  {Object.entries(product.specs || {}).map(([key, value], idx) => (
                    <tr key={key} className={idx % 2 === 0 ? 'bg-[#EDE3CF]/40' : 'bg-transparent'}>
                      <td className="py-3 px-4 text-[#4A5520] font-bold w-1/3 sm:w-1/4">
                        {key}
                      </td>
                      <td className="py-3 px-4 text-[#171D0A] font-body font-medium">
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="font-body text-sm text-[#3E4924] leading-relaxed space-y-4 font-medium">
              <p>{product.description}</p>
              <div className="p-4 rounded-xl bg-[#EDE3CF] border border-[#4A5520]/30">
                <h4 className="font-heading font-bold text-[#171D0A] mb-2">Recommended Wiring & Pinouts</h4>
                <p className="text-xs text-[#4F5938]">
                  Operates within specified tolerances. For I2C connectivity, ensure pull-up resistors (4.7kΩ) are tied to VCC if multiple peripheral devices are sharing the bus.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* "Frequently Bought Together" Bundle Module */}
        {relatedProducts.length > 0 && (
          <div className="bg-[#FAF6ED] border-2 border-[#4A5520] rounded-3xl p-6 sm:p-10 mb-20 shadow-elevated">
            <div className="mb-6">
              <span className="text-xs font-mono text-[#4A5520] font-bold uppercase tracking-wider">
                COMPATIBLE HARDWARE
              </span>
              <h3 className="font-heading font-extrabold text-2xl text-[#171D0A] mt-1">
                Frequently Bought Together
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Bundle items list */}
              <div className="lg:col-span-8 flex flex-col sm:flex-row items-center gap-4">
                {/* Main Product */}
                <div className="flex-1 bg-[#EDE3CF] border border-[#4A5520]/30 rounded-2xl p-4 flex items-center gap-3 w-full sm:w-auto shadow-sm">
                  <div className="w-16 h-16 rounded-xl bg-white p-1 flex-shrink-0">
                    <SafeImage
                      src={product.image}
                      alt={product.name}
                      mixBlend={true}
                      aspectRatio="aspect-square"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-[#4A5520] font-bold">THIS ITEM</span>
                    <p className="font-heading font-bold text-xs text-[#171D0A] truncate">
                      {product.name}
                    </p>
                    <p className="font-heading font-extrabold text-sm text-[#4A5520]">
                      ₹{product.price}
                    </p>
                  </div>
                </div>

                <span className="text-[#4A5520] font-extrabold text-xl">+</span>

                {/* Accessory 1 */}
                {relatedProducts[0] && (
                  <div className="flex-1 bg-[#EDE3CF] border border-[#4A5520]/30 rounded-2xl p-4 flex items-center gap-3 w-full sm:w-auto shadow-sm">
                    <input
                      type="checkbox"
                      checked={bundleSelected[0]}
                      onChange={(e) => setBundleSelected([e.target.checked, bundleSelected[1]])}
                      className="w-4 h-4 rounded text-[#4A5520] bg-white"
                    />
                    <div className="w-16 h-16 rounded-xl bg-white p-1 flex-shrink-0">
                      <SafeImage
                        src={relatedProducts[0].image}
                        alt={relatedProducts[0].name}
                        mixBlend={true}
                        aspectRatio="aspect-square"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-heading font-bold text-xs text-[#171D0A] truncate">
                        {relatedProducts[0].name}
                      </p>
                      <p className="font-heading font-extrabold text-sm text-[#4A5520]">
                        ₹{relatedProducts[0].price}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Total & Action */}
              <div className="lg:col-span-4 bg-[#EDE3CF] border border-[#4A5520]/30 rounded-2xl p-6 text-center lg:text-left shadow-sm">
                <span className="text-xs font-mono text-[#4F5938] font-bold block mb-1">
                  BUNDLE COMBO PRICE:
                </span>
                <span className="font-heading font-extrabold text-3xl text-[#171D0A] block mb-4">
                  ₹{bundleTotal.toLocaleString('en-IN')}
                </span>

                <button
                  onClick={handleAddBundle}
                  className="w-full py-3 px-4 rounded-xl bg-[#4A5520] hover:bg-[#384318] text-[#F7F2E7] font-heading font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
                >
                  <ShoppingCart size={15} className="text-[#F5C400]" />
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
