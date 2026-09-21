import React from 'react';
import {
  User,
  MapPin,
  Receipt,
  Heart,
  CreditCard,
  Bell,
  HelpCircle,
  Info,
  LogOut,
  ChevronRight,
  PlusCircle,
  Briefcase,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProfileScreen: React.FC = () => {
  const {
    user,
    switchRole,
    logout,
    setActiveTab,
    setIsWishlistOpen,
    setIsAddProductOpen,
    setIsArtisanStudioOpen,
    orders,
    wishlist,
    showToast,
  } = useApp();

  return (
    <div className="pb-28 pt-3 px-4 max-w-md mx-auto">
      {/* Profile Header Card */}
      <div className="bg-white border border-[#E4E8E6] rounded-2xl p-4 shadow-2xs mb-4">
        <div className="flex items-center gap-3.5 mb-3">
          <div className="w-14 h-14 rounded-full bg-[#E9F7F0] border-2 border-[#0B8F56] flex items-center justify-center text-[#0B8F56] font-bold text-xl">
            {user.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-lg font-black text-[#1E2723] leading-tight">{user.name}</h2>
            <p className="text-xs text-[#66736D] mt-0.5">{user.email}</p>
            <span className="inline-block mt-1.5 px-2 py-0.5 bg-[#E9F7F0] text-[#006B43] text-[10px] font-bold rounded-md">
              {user.role === 'artisan' ? 'Verified Artisan Creator' : 'Authentic Craft Buyer'}
            </span>
          </div>
        </div>

        {/* Mode Switch Bar */}
        <div className="pt-3 border-t border-[#E4E8E6] flex items-center justify-between">
          <span className="text-xs font-bold text-[#1E2723]">Account Type Mode</span>
          <div className="flex bg-[#F2F5F3] p-0.5 rounded-lg">
            <button
              type="button"
              onClick={() => switchRole('buyer')}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-all ${
                user.role === 'buyer' ? 'bg-[#0B8F56] text-white shadow-xs' : 'text-[#66736D]'
              }`}
            >
              Buyer
            </button>
            <button
              type="button"
              onClick={() => switchRole('artisan')}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-all ${
                user.role === 'artisan' ? 'bg-[#0B8F56] text-white shadow-xs' : 'text-[#66736D]'
              }`}
            >
              Artisan
            </button>
          </div>
        </div>
      </div>

      {/* Artisan Action Tile if Artisan */}
      {user.role === 'artisan' && (
        <div className="space-y-2 mb-4">
          <div
            onClick={() => setIsArtisanStudioOpen(true)}
            className="bg-[#E9F7F0] border border-[#0B8F56]/30 rounded-2xl p-3.5 flex items-center justify-between cursor-pointer hover:bg-[#d9f3e4] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0B8F56] text-white flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-black text-[#006B43]">Artisan Creator Studio</h4>
                <p className="text-[11px] text-[#66736D]">Orders, inventory, fair-trade pricing & dispatch</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#0B8F56]" />
          </div>

          <div
            onClick={() => setIsAddProductOpen(true)}
            className="bg-white border border-[#E4E8E6] rounded-2xl p-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <PlusCircle className="w-4 h-4 text-[#0B8F56]" />
              <span className="text-xs font-bold text-[#1E2723]">Add New Craft (AI Cataloging)</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      )}

      {/* Menu Options */}
      <div className="bg-white border border-[#E4E8E6] rounded-2xl divide-y divide-[#E4E8E6] shadow-2xs overflow-hidden mb-4">
        <button
          type="button"
          onClick={() => setActiveTab(3)}
          className="w-full p-3.5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Receipt className="w-4 h-4 text-[#0B8F56]" />
            <span className="text-xs font-bold text-[#1E2723]">My Orders</span>
          </div>
          <span className="text-xs text-[#66736D] font-semibold">{orders.length} orders</span>
        </button>

        <button
          type="button"
          onClick={() => setIsWishlistOpen(true)}
          className="w-full p-3.5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Heart className="w-4 h-4 text-[#0B8F56]" />
            <span className="text-xs font-bold text-[#1E2723]">My Wishlist</span>
          </div>
          <span className="text-xs text-[#66736D] font-semibold">{wishlist.length} saved</span>
        </button>

        <button
          type="button"
          onClick={() => showToast('Saved address: 123 Anna Nagar, Chennai')}
          className="w-full p-3.5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-[#0B8F56]" />
            <span className="text-xs font-bold text-[#1E2723]">Manage Delivery Addresses</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>

        <button
          type="button"
          onClick={() => showToast('Payment methods: UPI and RuPay saved')}
          className="w-full p-3.5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <CreditCard className="w-4 h-4 text-[#0B8F56]" />
            <span className="text-xs font-bold text-[#1E2723]">Payment Settings</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>

        <button
          type="button"
          onClick={() => showToast('Notifications are active')}
          className="w-full p-3.5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Bell className="w-4 h-4 text-[#0B8F56]" />
            <span className="text-xs font-bold text-[#1E2723]">Notifications</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>

        <button
          type="button"
          onClick={() => showToast('Customer support: support@artisanconnect.org')}
          className="w-full p-3.5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <HelpCircle className="w-4 h-4 text-[#0B8F56]" />
            <span className="text-xs font-bold text-[#1E2723]">Help & Support</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>

        <button
          type="button"
          onClick={() => showToast('Artisan Connect v1.0.0 – Empowering Indian craftspeople')}
          className="w-full p-3.5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Info className="w-4 h-4 text-[#0B8F56]" />
            <span className="text-xs font-bold text-[#1E2723]">About Artisan Connect</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Logout button */}
      <button
        type="button"
        onClick={logout}
        className="w-full py-3 border border-red-200 text-[#D32F2F] hover:bg-red-50 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
      >
        <LogOut className="w-4 h-4" />
        <span>Log Out</span>
      </button>
    </div>
  );
};
