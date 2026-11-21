import React from 'react';
import { Home, Grid, Search, ShoppingCart, User } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const MobileBottomNav = () => {
  const { currentView, navigateTo, cartCount, setIsCartOpen } = useShop();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B0B0A]/95 backdrop-blur-lg border-t border-[#262622] py-2 px-4 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-around">
        {/* Home */}
        <button
          onClick={() => navigateTo('home')}
          className={`flex flex-col items-center gap-1 p-1 min-w-[48px] min-h-[44px] justify-center transition-colors ${
            currentView === 'home' ? 'text-[#F5C400]' : 'text-[#EDE3CF]/70'
          }`}
        >
          <Home size={18} />
          <span className="text-[10px] font-mono">Home</span>
        </button>

        {/* Categories / Listing */}
        <button
          onClick={() => navigateTo('listing')}
          className={`flex flex-col items-center gap-1 p-1 min-w-[48px] min-h-[44px] justify-center transition-colors ${
            currentView === 'listing' ? 'text-[#F5C400]' : 'text-[#EDE3CF]/70'
          }`}
        >
          <Grid size={18} />
          <span className="text-[10px] font-mono">Catalog</span>
        </button>

        {/* Search */}
        <button
          onClick={() => {
            navigateTo('listing');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-1 p-1 min-w-[48px] min-h-[44px] justify-center text-[#EDE3CF]/70 hover:text-[#F5C400] transition-colors"
        >
          <Search size={18} />
          <span className="text-[10px] font-mono">Search</span>
        </button>

        {/* Cart */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center gap-1 p-1 min-w-[48px] min-h-[44px] justify-center text-[#EDE3CF]/70 hover:text-[#F5C400] transition-colors"
        >
          <div className="relative">
            <ShoppingCart size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-[#F5C400] text-[#0B0B0A] rounded-full text-[9px] font-mono font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-mono">Cart</span>
        </button>

        {/* Account / Support */}
        <button
          onClick={() => {
            const b2b = document.getElementById('b2b-section');
            if (b2b) b2b.scrollIntoView({ behavior: 'smooth' });
            else navigateTo('home');
          }}
          className="flex flex-col items-center gap-1 p-1 min-w-[48px] min-h-[44px] justify-center text-[#EDE3CF]/70 hover:text-[#F5C400] transition-colors"
        >
          <User size={18} />
          <span className="text-[10px] font-mono">B2B</span>
        </button>
      </div>
    </nav>
  );
};
