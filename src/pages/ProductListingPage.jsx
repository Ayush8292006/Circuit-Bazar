import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, SlidersHorizontal, ArrowUpDown, X, Check, Search, RotateCcw } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { BRANDS } from '../data/kits';
import { ProductCard } from '../components/ProductCard';

export const ProductListingPage = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    navigateTo
  } = useShop();

  const [priceRange, setPriceRange] = useState(6000);
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filtered & Sorted products computation
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (
        searchQuery &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.sku.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.shortDesc.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      // Price filter
      if (product.price > priceRange) {
        return false;
      }
      // Brand filter
      if (selectedBrand !== 'all' && !product.brand.toLowerCase().includes(selectedBrand.toLowerCase())) {
        return false;
      }
      // In stock filter
      if (inStockOnly && !product.inStock) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [selectedCategory, searchQuery, priceRange, selectedBrand, inStockOnly, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setPriceRange(6000);
    setSelectedBrand('all');
    setInStockOnly(false);
    setSortBy('featured');
  };

  const activeCategoryName =
    selectedCategory === 'all'
      ? 'All Components'
      : CATEGORIES.find((c) => c.id === selectedCategory)?.name || 'Components';

  return (
    <div className="pt-28 pb-24 min-h-screen bg-[#EDE3CF] text-[#171D0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Header */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#4F5938] mb-4 font-semibold">
          <button onClick={() => navigateTo('home')} className="hover:text-[#4A5520]">
            HOME
          </button>
          <span>/</span>
          <span className="text-[#4A5520]">{activeCategoryName.toUpperCase()}</span>
        </div>

        {/* Title & Mobile Filter Trigger */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-8 border-b-2 border-[#DFD4BD]">
          <div>
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#171D0A]">
              {activeCategoryName}
            </h1>
            <p className="font-body text-xs sm:text-sm text-[#3E4924] mt-1 font-medium">
              Showing {filteredProducts.length} verified electronic parts & dev boards
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 bg-[#FAF6ED] border-2 border-[#4A5520]/25 rounded-xl px-3 py-2 text-xs font-mono font-bold shadow-sm">
              <ArrowUpDown size={14} className="text-[#4A5520]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-[#171D0A] outline-none cursor-pointer"
              >
                <option value="featured" className="bg-[#FAF6ED]">Sort: Featured</option>
                <option value="price-low" className="bg-[#FAF6ED]">Price: Low to High</option>
                <option value="price-high" className="bg-[#FAF6ED]">Price: High to Low</option>
                <option value="rating" className="bg-[#FAF6ED]">Highest Rated</option>
              </select>
            </div>

            {/* Mobile Filter Sheet Trigger */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FAF6ED] border-2 border-[#4A5520]/25 text-[#171D0A] text-xs font-mono font-bold shadow-sm"
            >
              <SlidersHorizontal size={14} />
              <span>Filters</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar (Left Column) */}
          <aside className="hidden lg:block lg:col-span-3 bg-[#FAF6ED] border-2 border-[#4A5520]/25 rounded-2xl p-6 sticky top-28 space-y-6 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#DFD4BD]">
              <span className="font-mono text-xs text-[#4A5520] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <SlidersHorizontal size={14} /> Refine Results
              </span>
              <button
                onClick={handleResetFilters}
                className="text-[11px] font-mono text-[#4F5938] hover:text-[#4A5520] font-bold flex items-center gap-1"
              >
                <RotateCcw size={11} /> Reset
              </button>
            </div>

            {/* Category Filter */}
            <div>
              <h4 className="font-mono text-xs text-[#171D0A] font-bold mb-3 uppercase tracking-wider">
                Category
              </h4>
              <div className="space-y-1.5 text-xs font-body font-medium">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-2.5 py-2 rounded-lg transition-colors flex items-center justify-between ${
                    selectedCategory === 'all'
                      ? 'bg-[#4A5520] text-[#F7F2E7] font-bold shadow-sm'
                      : 'text-[#3E4924] hover:bg-[#EDE3CF]'
                  }`}
                >
                  <span>All Categories</span>
                  <span className="text-[10px] font-mono opacity-80">{PRODUCTS.length}</span>
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-2.5 py-2 rounded-lg transition-colors flex items-center justify-between ${
                      selectedCategory === cat.id
                        ? 'bg-[#4A5520] text-[#F7F2E7] font-bold shadow-sm'
                        : 'text-[#3E4924] hover:bg-[#EDE3CF]'
                    }`}
                  >
                    <span className="truncate">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="pt-4 border-t border-[#DFD4BD]">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-mono text-xs text-[#171D0A] font-bold uppercase tracking-wider">
                  Max Price
                </h4>
                <span className="font-mono text-xs text-[#4A5520] font-bold">
                  ₹{priceRange.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="6000"
                step="100"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-[#4A5520] bg-[#DFD4BD] rounded-lg h-2 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#4F5938] font-bold mt-1">
                <span>₹100</span>
                <span>₹6,000</span>
              </div>
            </div>

            {/* In-Stock Only Toggle */}
            <div className="pt-4 border-t border-[#DFD4BD]">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-body font-medium text-[#171D0A]">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-[#4A5520] bg-[#EDE3CF] text-[#4A5520] focus:ring-0 w-4 h-4"
                />
                <span>In Stock & Ready for 24h Dispatch</span>
              </label>
            </div>
          </aside>

          {/* Product Grid (Right Column) */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-[#FAF6ED] border-2 border-[#4A5520]/25 rounded-2xl p-12 text-center shadow-sm">
                <p className="font-heading font-bold text-lg text-[#171D0A] mb-2">No matching parts found</p>
                <p className="text-xs text-[#4F5938] font-body mb-6 font-medium">
                  Try adjusting your price range or clearing category filters.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 rounded-xl bg-[#4A5520] hover:bg-[#384318] text-[#F7F2E7] font-heading font-bold text-xs"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Bottom Sheet */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="absolute inset-0 bg-[#171D0A]/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative z-10 bg-[#FAF6ED] border-t-2 border-[#4A5520] rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto text-[#171D0A] space-y-6"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#DFD4BD]">
                <h3 className="font-heading font-extrabold text-lg">Filter Components</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 rounded-lg text-[#4F5938]"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Mobile Category List */}
              <div>
                <h4 className="font-mono text-xs text-[#4A5520] font-bold mb-2 uppercase">Category</h4>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`p-2 rounded-xl text-xs font-mono text-left border-2 ${
                      selectedCategory === 'all'
                        ? 'bg-[#4A5520] border-[#384318] text-[#F7F2E7] font-bold'
                        : 'bg-[#EDE3CF] border-[#DFD4BD] text-[#171D0A]'
                    }`}
                  >
                    All Items
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`p-2 rounded-xl text-xs font-mono text-left truncate border-2 ${
                        selectedCategory === cat.id
                          ? 'bg-[#4A5520] border-[#384318] text-[#F7F2E7] font-bold'
                          : 'bg-[#EDE3CF] border-[#DFD4BD] text-[#171D0A]'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Price Slider */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-2 font-bold">
                  <span>MAX PRICE</span>
                  <span className="text-[#4A5520]">₹{priceRange}</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="6000"
                  step="100"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-[#4A5520] bg-[#DFD4BD] rounded-lg h-2"
                />
              </div>

              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3.5 rounded-xl bg-[#4A5520] hover:bg-[#384318] text-[#F7F2E7] font-heading font-bold text-sm"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
