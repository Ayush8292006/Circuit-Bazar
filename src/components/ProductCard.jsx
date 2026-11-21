import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, Plus, Minus, Star, ArrowUpRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { SafeImage } from './SafeImage';

export const ProductCard = ({ product }) => {
  const {
    navigateTo,
    cart,
    addToCart,
    updateQuantity,
    toggleWishlist,
    isInWishlist
  } = useShop();

  const isLiked = isInWishlist(product.id);
  const cartItem = cart.find((item) => item.product.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const [heartAnim, setHeartAnim] = useState(false);

  const handleHeartClick = (e) => {
    e.stopPropagation();
    setHeartAnim(true);
    toggleWishlist(product.id);
    setTimeout(() => setHeartAnim(false), 500);
  };

  const handleCardClick = () => {
    navigateTo('detail', product.id);
  };

  const handleAddClick = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleIncrement = (e) => {
    e.stopPropagation();
    updateQuantity(product.id, quantityInCart + 1);
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    updateQuantity(product.id, quantityInCart - 1);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col justify-between bg-[#141412] hover:bg-[#191916] rounded-2xl p-3 sm:p-4 border border-[#262622] hover:border-[#6B7A2A]/60 transition-all duration-300 shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] cursor-pointer"
    >
      {/* Top Media Container: Beige card background with soft shadow & mix-blend-multiply */}
      <div className="relative w-full aspect-square bg-[#EDE3CF] rounded-xl overflow-hidden mb-3.5 p-3 flex items-center justify-center shadow-card-beige">
        {/* Discount Badge */}
        {product.discount && (
          <span className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded-md bg-[#F5C400] text-[#0B0B0A] font-mono font-bold text-[10px] tracking-wide shadow-sm">
            {product.discount}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleHeartClick}
          className="absolute top-2.5 right-2.5 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm text-[#0B0B0A] hover:text-[#6B7A2A] shadow-sm transition-transform active:scale-90"
          aria-label="Add to wishlist"
        >
          <motion.div
            animate={heartAnim ? { scale: [1, 1.45, 1] } : {}}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <Heart
              size={15}
              className={isLiked ? 'fill-[#6B7A2A] text-[#6B7A2A]' : 'text-[#0B0B0A]/70'}
            />
          </motion.div>
        </button>

        {/* Real Product Image with Hover Crossfade & Blend */}
        <SafeImage
          src={product.image}
          secondarySrc={product.gallery && product.gallery.length > 1 ? product.gallery[1] : null}
          alt={product.alt || product.name}
          mixBlend={true}
          showHoverCrossfade={true}
          aspectRatio="aspect-square"
          className="w-full h-full object-contain"
        />

        {/* Fast Dispatch Tag */}
        {product.dealStockLeft && (
          <div className="absolute bottom-2 left-2 right-2 bg-[#0B0B0A]/85 backdrop-blur-sm rounded-md px-2 py-1 flex items-center justify-between text-[9px] font-mono text-[#EDE3CF]">
            <span className="text-[#F5C400] font-semibold">⚡ ONLY {product.dealStockLeft} LEFT</span>
            <span className="text-white/60">DISPATCH 24H</span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* SKU in mono font & Category */}
          <div className="flex items-center justify-between gap-1 mb-1.5 text-[10px] font-mono text-[#EDE3CF]/60">
            <span className="truncate tracking-wider">{product.sku}</span>
            <div className="flex items-center gap-1 text-[#F5C400]">
              <Star size={11} className="fill-[#F5C400]" />
              <span className="font-bold text-white text-[11px]">{product.rating}</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-heading font-semibold text-sm sm:text-base text-white group-hover:text-[#F5C400] transition-colors line-clamp-2 leading-snug mb-2">
            {product.name}
          </h3>
        </div>

        {/* Price & Cart Stepper Button */}
        <div className="pt-2 border-t border-[#262622]/80 mt-2">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-base sm:text-lg font-heading font-extrabold text-[#F5C400]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-xs font-mono text-[#EDE3CF]/50 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Morphing "Add to Cart" / Quantity Stepper */}
          <div className="w-full">
            {quantityInCart === 0 ? (
              <button
                onClick={handleAddClick}
                className="w-full py-2 px-3 rounded-xl bg-[#EDE3CF] hover:bg-[#F5C400] text-[#0B0B0A] font-heading font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-98"
              >
                <ShoppingCart size={14} />
                <span>Add to Cart</span>
              </button>
            ) : (
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-full flex items-center justify-between bg-[#1E1E1B] border border-[#6B7A2A] rounded-xl px-2 py-1.5"
              >
                <button
                  onClick={handleDecrement}
                  className="w-6 h-6 rounded-lg bg-[#2A2A26] hover:bg-[#363630] text-[#EDE3CF] flex items-center justify-center transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={13} />
                </button>
                <span className="text-xs font-mono font-bold text-[#F5C400] px-2">
                  {quantityInCart} in Cart
                </span>
                <button
                  onClick={handleIncrement}
                  className="w-6 h-6 rounded-lg bg-[#6B7A2A] hover:bg-[#7D8F32] text-white flex items-center justify-center transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={13} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
