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
      className="group relative flex flex-col justify-between bg-[#FAF6ED] hover:bg-[#FFFDF9] rounded-2xl p-3.5 sm:p-4 border-2 border-[#4A5520]/20 hover:border-[#4A5520] transition-all duration-300 shadow-sm hover:shadow-elevated cursor-pointer"
    >
      {/* Top Media Container: Beige card background with soft shadow & mix-blend-multiply */}
      <div className="relative w-full aspect-square bg-[#EDE3CF] rounded-xl overflow-hidden mb-3.5 p-3 flex items-center justify-center shadow-inner border border-[#4A5520]/15">
        {/* Discount Badge */}
        {product.discount && (
          <span className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded-md bg-[#4A5520] text-[#F7F2E7] font-mono font-bold text-[10px] tracking-wide shadow-sm">
            {product.discount}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleHeartClick}
          className="absolute top-2.5 right-2.5 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm text-[#171D0A] hover:text-[#4A5520] shadow-sm transition-transform active:scale-90 border border-[#4A5520]/20"
          aria-label="Add to wishlist"
        >
          <motion.div
            animate={heartAnim ? { scale: [1, 1.45, 1] } : {}}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <Heart
              size={15}
              className={isLiked ? 'fill-[#4A5520] text-[#4A5520]' : 'text-[#4A5520]/60'}
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
          <div className="absolute bottom-2 left-2 right-2 bg-[#FAF6ED]/95 backdrop-blur-sm rounded-md px-2 py-1 flex items-center justify-between text-[9px] font-mono text-[#171D0A] border border-[#4A5520]/20 shadow-sm">
            <span className="text-[#4A5520] font-bold">⚡ ONLY {product.dealStockLeft} LEFT</span>
            <span className="text-[#4F5938]">24H DISPATCH</span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* SKU in mono font & Category */}
          <div className="flex items-center justify-between gap-1 mb-1.5 text-[10px] font-mono text-[#4F5938]">
            <span className="truncate tracking-wider font-semibold">{product.sku}</span>
            <div className="flex items-center gap-1 text-[#4A5520]">
              <Star size={11} className="fill-[#F5C400] text-[#F5C400]" />
              <span className="font-bold text-[#171D0A] text-[11px]">{product.rating}</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-heading font-bold text-sm sm:text-base text-[#171D0A] group-hover:text-[#4A5520] transition-colors line-clamp-2 leading-snug mb-2">
            {product.name}
          </h3>
        </div>

        {/* Price & Cart Stepper Button */}
        <div className="pt-2 border-t border-[#DFD4BD] mt-2">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-base sm:text-lg font-heading font-extrabold text-[#171D0A]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-xs font-mono text-[#4F5938] line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Morphing "Add to Cart" / Quantity Stepper */}
          <div className="w-full">
            {quantityInCart === 0 ? (
              <button
                onClick={handleAddClick}
                className="w-full py-2.5 px-3 rounded-xl bg-[#4A5520] hover:bg-[#384318] text-[#F7F2E7] font-heading font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-98"
              >
                <ShoppingCart size={14} className="text-[#F5C400]" />
                <span>Add to Cart</span>
              </button>
            ) : (
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-full flex items-center justify-between bg-[#EDE3CF] border-2 border-[#4A5520] rounded-xl px-2 py-1.5 shadow-inner"
              >
                <button
                  onClick={handleDecrement}
                  className="w-6 h-6 rounded-lg bg-[#DFD4BD] hover:bg-[#D4C7AC] text-[#171D0A] flex items-center justify-center transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={13} />
                </button>
                <span className="text-xs font-mono font-bold text-[#4A5520] px-2">
                  {quantityInCart} in Cart
                </span>
                <button
                  onClick={handleIncrement}
                  className="w-6 h-6 rounded-lg bg-[#4A5520] hover:bg-[#384318] text-white flex items-center justify-center transition-colors"
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
