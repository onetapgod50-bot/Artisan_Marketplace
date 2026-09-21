import React from 'react';
import {
  Home,
  Grid,
  ShoppingBag,
  Receipt,
  Heart,
  User,
  Settings,
  HelpCircle,
  Info,
  LogOut,
  Sparkles,
  PlusCircle,
  UserCheck,
  ChevronRight,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Drawer: React.FC = () => {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    setActiveTab,
    setIsWishlistOpen,
    setIsRecommendationsOpen,
    setIsAddProductOpen,
    setIsArtisanStudioOpen,
    setIsSettingsOpen,
    setIsHelpOpen,
    setIsAboutOpen,
    user,
    switchRole,
    logout,
  } = useApp();

  if (!isDrawerOpen) return null;

  const navigateTo = (action: () => void) => {
    setIsDrawerOpen(false);
    action();
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* Drawer content */}
      <div className="relative w-72 max-w-[85vw] bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
        {/* Header */}
        <div className="bg-[#0B8F56] text-white p-5 pt-7">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold border border-white/30">
              {user.name.charAt(0)}
            </div>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <h2 className="font-extrabold text-lg leading-snug">{user.name}</h2>
          <p className="text-xs text-white/80">{user.email}</p>

          {/* Current Mode Badge & Switch */}
          <div className="mt-3 flex items-center justify-between pt-2.5 border-t border-white/20">
            <span className="text-[11px] font-semibold text-white/90">
              Current Mode: <span className="font-bold underline">{user.role === 'artisan' ? 'Artisan' : 'Buyer'}</span>
            </span>
            <button
              type="button"
              onClick={() => switchRole(user.role === 'artisan' ? 'buyer' : 'artisan')}
              className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-[#0B8F56] hover:bg-white/90"
            >
              Switch
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto py-2">
          <div className="px-2 space-y-0.5">
            <button
              type="button"
              onClick={() => navigateTo(() => setActiveTab(0))}
              className="w-full flex items-center gap-3.5 px-3 py-2.5 text-sm font-semibold text-[#1E2723] hover:bg-[#E9F7F0] rounded-xl transition-colors text-left"
            >
              <Home className="w-4 h-4 text-[#0B8F56]" />
              <span>Home</span>
            </button>

            <button
              type="button"
              onClick={() => navigateTo(() => setActiveTab(1))}
              className="w-full flex items-center gap-3.5 px-3 py-2.5 text-sm font-semibold text-[#1E2723] hover:bg-[#E9F7F0] rounded-xl transition-colors text-left"
            >
              <Grid className="w-4 h-4 text-[#0B8F56]" />
              <span>Categories</span>
            </button>

            <button
              type="button"
              onClick={() => navigateTo(() => setActiveTab(2))}
              className="w-full flex items-center gap-3.5 px-3 py-2.5 text-sm font-semibold text-[#1E2723] hover:bg-[#E9F7F0] rounded-xl transition-colors text-left"
            >
              <ShoppingBag className="w-4 h-4 text-[#0B8F56]" />
              <span>My Cart</span>
            </button>

            <button
              type="button"
              onClick={() => navigateTo(() => setActiveTab(3))}
              className="w-full flex items-center gap-3.5 px-3 py-2.5 text-sm font-semibold text-[#1E2723] hover:bg-[#E9F7F0] rounded-xl transition-colors text-left"
            >
              <Receipt className="w-4 h-4 text-[#0B8F56]" />
              <span>My Orders</span>
            </button>

            <button
              type="button"
              onClick={() => navigateTo(() => setIsWishlistOpen(true))}
              className="w-full flex items-center gap-3.5 px-3 py-2.5 text-sm font-semibold text-[#1E2723] hover:bg-[#E9F7F0] rounded-xl transition-colors text-left"
            >
              <Heart className="w-4 h-4 text-[#0B8F56]" />
              <span>My Wishlist</span>
            </button>

            <button
              type="button"
              onClick={() => navigateTo(() => setIsRecommendationsOpen(true))}
              className="w-full flex items-center gap-3.5 px-3 py-2.5 text-sm font-semibold text-[#1E2723] hover:bg-[#E9F7F0] rounded-xl transition-colors text-left"
            >
              <Sparkles className="w-4 h-4 text-[#F0A600]" />
              <span>Recommended for You</span>
            </button>

            <button
              type="button"
              onClick={() => navigateTo(() => setActiveTab(4))}
              className="w-full flex items-center gap-3.5 px-3 py-2.5 text-sm font-semibold text-[#1E2723] hover:bg-[#E9F7F0] rounded-xl transition-colors text-left"
            >
              <User className="w-4 h-4 text-[#0B8F56]" />
              <span>My Profile</span>
            </button>

            <div className="my-2 border-t border-[#E4E8E6]" />

            {/* Artisan Features: Studio & Cataloging */}
            <button
              type="button"
              onClick={() => navigateTo(() => setIsArtisanStudioOpen(true))}
              className="w-full flex items-center gap-3.5 px-3 py-2.5 text-sm font-semibold text-[#0B8F56] bg-[#E9F7F0]/80 hover:bg-[#E9F7F0] rounded-xl transition-colors text-left"
            >
              <Sparkles className="w-4 h-4 text-[#F5A623]" />
              <span>Artisan Studio & Tools</span>
            </button>

            <button
              type="button"
              onClick={() => navigateTo(() => setIsAddProductOpen(true))}
              className="w-full flex items-center gap-3.5 px-3 py-2.5 text-sm font-semibold text-[#0B8F56] hover:bg-[#E9F7F0] rounded-xl transition-colors text-left"
            >
              <PlusCircle className="w-4 h-4 text-[#0B8F56]" />
              <span>Add Product (AI Assistant)</span>
            </button>

            <div className="my-2 border-t border-[#E4E8E6]" />

            <button
              type="button"
              onClick={() => navigateTo(() => setIsSettingsOpen(true))}
              className="w-full flex items-center gap-3.5 px-3 py-2.5 text-sm font-semibold text-[#1E2723] hover:bg-[#E9F7F0] rounded-xl transition-colors text-left"
            >
              <Settings className="w-4 h-4 text-[#0B8F56]" />
              <span>Settings</span>
            </button>

            <button
              type="button"
              id="drawer-help-support-btn"
              onClick={() => navigateTo(() => setIsHelpOpen(true))}
              className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-[#1E2723] hover:bg-[#E9F7F0] rounded-xl transition-all text-left group cursor-pointer active:scale-[0.99]"
            >
              <div className="flex items-center gap-3.5">
                <HelpCircle className="w-4 h-4 text-[#0B8F56] transition-transform group-hover:scale-110" />
                <span>Help & Support</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#0B8F56] transition-colors" />
            </button>

            <button
              type="button"
              id="drawer-about-us-btn"
              onClick={() => navigateTo(() => setIsAboutOpen(true))}
              className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-[#1E2723] hover:bg-[#E9F7F0] rounded-xl transition-all text-left group cursor-pointer active:scale-[0.99]"
            >
              <div className="flex items-center gap-3.5">
                <Info className="w-4 h-4 text-[#0B8F56] transition-transform group-hover:scale-110" />
                <span>About Us</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#0B8F56] transition-colors" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E4E8E6] bg-gray-50">
          <button
            type="button"
            onClick={() => navigateTo(logout)}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-bold text-[#D32F2F] hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
          <p className="text-center text-[11px] text-[#66736D] mt-2 font-medium">
            Artisan Connect v1.0.0
          </p>
        </div>
      </div>
    </div>
  );
};
