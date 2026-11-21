import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Plus, Minus, Star } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { SafeImage } from './SafeImage';

export const ProductCard = ({ product, compact = false }) => {
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
      className="group relative flex flex-col justify-between bg-[#FAF6ED] hover:bg-[#FFFDF9] rounded-xl sm:rounded-2xl p-2 sm:p-3.5 border-2 border-[#4A5520]/20 hover:border-[#4A5520] transition-all duration-300 shadow-sm hover:shadow-elevated cursor-pointer h-full"
    >
      {/* Top Media Container: Beige background with blend */}
      <div className="relative w-full aspect-square bg-[#EDE3CF] rounded-lg sm:rounded-xl overflow-hidden mb-2 sm:mb-3 p-1.5 sm:p-2.5 flex items-center justify-center shadow-inner border border-[#4A5520]/15">
        {/* Discount Badge */}
        {product.discount && (
          <span className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 z-10 px-1.5 py-0.5 rounded bg-[#4A5520] text-[#F7F2E7] font-mono font-bold text-[8px] sm:text-[10px] tracking-wide shadow-sm">
            {product.discount}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleHeartClick}
          className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 z-10 p-1 sm:p-1.5 rounded-full bg-white/90 backdrop-blur-sm text-[#171D0A] hover:text-[#4A5520] shadow-sm transition-transform active:scale-90 border border-[#4A5520]/20"
          aria-label="Add to wishlist"
        >
          <motion.div
            animate={heartAnim ? { scale: [1, 1.4, 1] } : {}}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <Heart
              size={13}
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
          <div className="absolute bottom-1.5 left-1.5 right-1.5 bg-[#FAF6ED]/95 backdrop-blur-sm rounded px-1.5 py-0.5 flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-[#171D0A] border border-[#4A5520]/20 shadow-sm">
            <span className="text-[#4A5520] font-bold">⚡ {product.dealStockLeft} LEFT</span>
            <span className="hidden sm:inline text-[#4F5938]">24H</span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* SKU & Rating */}
          <div className="flex items-center justify-between gap-1 mb-1 text-[9px] sm:text-[10px] font-mono text-[#4F5938]">
            <span className="truncate tracking-wider font-semibold">{product.sku}</span>
            <div className="flex items-center gap-0.5 text-[#4A5520]">
              <Star size={10} className="fill-[#F5C400] text-[#F5C400]" />
              <span className="font-bold text-[#171D0A] text-[10px]">{product.rating}</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-heading font-bold text-xs sm:text-sm text-[#171D0A] group-hover:text-[#4A5520] transition-colors line-clamp-2 leading-snug mb-1.5">
            {product.name}
          </h3>
        </div>

        {/* Price & Cart Button */}
        <div className="pt-1.5 border-t border-[#DFD4BD] mt-1">
          <div className="flex items-baseline gap-1.5 mb-2">
            <span className="text-xs sm:text-base font-heading font-extrabold text-[#171D0A]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] font-mono text-[#4F5938] line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {/* Morphing "Add to Cart" / Stepper */}
          <div className="w-full">
            {quantityInCart === 0 ? (
              <button
                onClick={handleAddClick}
                className="w-full py-1.5 sm:py-2 px-2 rounded-lg sm:rounded-xl bg-[#4A5520] hover:bg-[#384318] text-[#F7F2E7] font-heading font-bold text-[11px] sm:text-xs transition-all flex items-center justify-center gap-1 shadow-sm active:scale-95"
              >
                <ShoppingCart size={12} className="text-[#F5C400]" />
                <span>Add</span>
              </button>
            ) : (
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-full flex items-center justify-between bg-[#EDE3CF] border-2 border-[#4A5520] rounded-lg sm:rounded-xl px-1.5 py-1 shadow-inner"
              >
                <button
                  onClick={handleDecrement}
                  className="w-5 h-5 rounded bg-[#DFD4BD] hover:bg-[#D4C7AC] text-[#171D0A] flex items-center justify-center transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={11} />
                </button>
                <span className="text-[10px] sm:text-xs font-mono font-bold text-[#4A5520] px-1">
                  {quantityInCart}
                </span>
                <button
                  onClick={handleIncrement}
                  className="w-5 h-5 rounded bg-[#4A5520] hover:bg-[#384318] text-white flex items-center justify-center transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={11} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
