import React from 'react';
import { Menu, Search, ShoppingCart, Heart, Sparkles, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Header: React.FC = () => {
  const {
    setIsDrawerOpen,
    setIsSearchOpen,
    setIsWishlistOpen,
    itemCount,
    wishlist,
    setActiveTab,
    user,
    setIsAddProductOpen,
    setIsArtisanStudioOpen,
  } = useApp();

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-[#E4E8E6] px-4 py-2.5 flex items-center justify-between">
      {/* Left: Drawer hamburger & Title */}
      <div className="flex items-center gap-2.5">
        <button
          id="drawer-toggle-btn"
          type="button"
          onClick={() => setIsDrawerOpen(true)}
          className="p-1.5 -ml-1 text-[#1E2723] hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => setActiveTab(0)}>
          <div className="w-6 h-6 rounded-full bg-[#0B8F56] flex items-center justify-center text-white text-xs font-black">
            🧵
          </div>
          <h1 className="text-lg font-black text-[#1E2723] tracking-tight">Artisan Connect</h1>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Artisan Studio Portal Button if in Artisan mode */}
        {user.role === 'artisan' && (
          <button
            id="header-artisan-studio-btn"
            type="button"
            onClick={() => setIsArtisanStudioOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1 bg-[#E9F7F0] text-[#0B8F56] hover:bg-[#d5f0e3] text-xs font-bold rounded-full transition-colors border border-[#0B8F56]/20"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F5A623]" />
            <span className="inline">Studio</span>
          </button>
        )}

        {/* Search button */}
        <button
          id="header-search-btn"
          type="button"
          onClick={() => setIsSearchOpen(true)}
          className="p-2 text-[#1E2723] hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Search products"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Wishlist button with count */}
        <button
          id="header-wishlist-btn"
          type="button"
          onClick={() => setIsWishlistOpen(true)}
          className="p-2 text-[#1E2723] hover:bg-gray-100 rounded-full transition-colors relative"
          aria-label="View wishlist"
        >
          <Heart className="w-5 h-5" />
          {wishlist.length > 0 && (
            <span className="absolute top-1 right-1 min-w-[17px] h-[17px] px-1 bg-[#D32F2F] text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
              {wishlist.length}
            </span>
          )}
        </button>

        {/* Cart button with Badge */}
        <button
          id="header-cart-btn"
          type="button"
          onClick={() => setActiveTab(2)}
          className="p-2 text-[#1E2723] hover:bg-gray-100 rounded-full transition-colors relative"
          aria-label="View shopping cart"
        >
          <ShoppingCart className="w-5 h-5" />
          {itemCount > 0 && (
            <span className="absolute top-1 right-1 min-w-[17px] h-[17px] px-1 bg-[#0B8F56] text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
