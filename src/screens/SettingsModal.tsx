import React, { useState } from 'react';
import {
  X,
  User,
  Database,
  Globe,
  Truck,
  Bell,
  Trash2,
  RefreshCw,
  CheckCircle2,
  ShieldAlert,
  ChevronRight,
  Download,
  Info,
  HelpCircle,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SettingsModal: React.FC = () => {
  const {
    isSettingsOpen,
    setIsSettingsOpen,
    user,
    switchRole,
    products,
    orders,
    wishlist,
    reviews,
    resetCatalog,
    showToast,
    login,
  } = useApp();

  const [activeSection, setActiveSection] = useState<
    'profile' | 'database' | 'preferences' | 'logistics' | 'notifications' | 'storage'
  >('profile');

  // Form states for profile
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [guildName, setGuildName] = useState('South India Artisan & Craftspersons Guild');
  const [currency, setCurrency] = useState('INR (₹)');
  const [language, setLanguage] = useState('English');
  const [defaultCourier, setDefaultCourier] = useState('India Post Artisan Express');
  const [pickupAddress, setPickupAddress] = useState('123, Anna Nagar, Chennai – 600040, Tamil Nadu');

  // Notifications
  const [orderAlerts, setOrderAlerts] = useState(true);
  const [studioAlerts, setStudioAlerts] = useState(true);
  const [reviewAlerts, setReviewAlerts] = useState(true);
  const [newsletterAlerts, setNewsletterAlerts] = useState(false);

  if (!isSettingsOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, name);
    showToast('Settings & profile preferences saved!');
  };

  const handleExportData = () => {
    const backupData = {
      exportedAt: new Date().toISOString(),
      user,
      productsCount: products.length,
      ordersCount: orders.length,
      products,
      orders,
      reviews,
      wishlist,
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `artisan_connect_backup_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Catalog & artisan data exported as JSON!');
  };

  return (
    <div className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#E4E8E6] flex items-center justify-between bg-gradient-to-r from-[#F7F9F8] to-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#0B8F56]/10 text-[#0B8F56] flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-[#1E2723]">Settings & Preferences</h2>
              <p className="text-[11px] text-[#66736D]">Manage account, cloud database & artisan defaults</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsSettingsOpen(false)}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Section Tabs */}
        <div className="flex border-b border-[#E4E8E6] bg-[#F7F9F8] px-3 overflow-x-auto no-scrollbar gap-1 py-1.5">
          {[
            { id: 'profile', label: 'Profile & Role', icon: User },
            { id: 'database', label: 'Cloud Database', icon: Database },
            { id: 'preferences', label: 'Preferences', icon: Globe },
            { id: 'logistics', label: 'Artisan Shipping', icon: Truck },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'storage', label: 'Data & Storage', icon: Trash2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveSection(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-white text-[#0B8F56] shadow-xs'
                    : 'text-[#66736D] hover:text-[#1E2723] hover:bg-white/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          {/* SECTION 1: PROFILE & ROLE */}
          {activeSection === 'profile' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#E9F7F0] border border-[#0B8F56]/20 rounded-2xl flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-black text-[#006B43] uppercase tracking-wider">
                      Current App Mode
                    </span>
                    <span className="px-2 py-0.5 bg-[#0B8F56] text-white text-[10px] font-black rounded-full uppercase">
                      {user.role === 'artisan' ? 'Artisan Seller' : 'Buyer / Supporter'}
                    </span>
                  </div>
                  <p className="text-xs text-[#1E2723]">
                    {user.role === 'artisan'
                      ? 'You have access to Artisan Studio, order fulfillment, and AI pricing.'
                      : 'You are browsing handcrafted goods as a customer and supporter.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => switchRole(user.role === 'artisan' ? 'buyer' : 'artisan')}
                  className="px-3.5 py-2 bg-white hover:bg-gray-50 border border-[#0B8F56] text-[#006B43] text-xs font-black rounded-xl shadow-xs transition-colors shrink-0"
                >
                  Switch to {user.role === 'artisan' ? 'Buyer' : 'Artisan'}
                </button>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-[#1E2723] mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 bg-[#F7F9F8] border border-[#E4E8E6] rounded-xl text-xs font-medium focus:border-[#0B8F56] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E2723] mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 bg-[#F7F9F8] border border-[#E4E8E6] rounded-xl text-xs font-medium focus:border-[#0B8F56] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E2723] mb-1">
                    Artisan Guild / Federation
                  </label>
                  <input
                    type="text"
                    value={guildName}
                    onChange={(e) => setGuildName(e.target.value)}
                    placeholder="e.g. All-India Handicrafts Board"
                    className="w-full px-3.5 py-2.5 bg-[#F7F9F8] border border-[#E4E8E6] rounded-xl text-xs font-medium focus:border-[#0B8F56] focus:outline-hidden"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#0B8F56] hover:bg-[#006B43] text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                  >
                    Save Profile Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* SECTION 2: DATABASE & CLOUD SYNC */}
          {activeSection === 'database' && (
            <div className="space-y-4">
              {/* Current Local Status */}
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
                <div className="flex items-center gap-2 text-emerald-800 mb-1.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <h4 className="text-xs font-black uppercase tracking-wider">
                    Local Storage Engine Active
                  </h4>
                </div>
                <p className="text-xs text-emerald-900/90 leading-relaxed font-medium">
                  All your catalog additions, orders, reviews, and artisan studio dispatches are
                  safely persisted in browser storage. Your data survives page refreshes and browser restarts.
                </p>
                <div className="mt-3 flex items-center gap-4 text-[11px] text-emerald-800 font-semibold border-t border-emerald-200/60 pt-2.5">
                  <span>📦 {products.length} Products</span>
                  <span>🧾 {orders.length} Orders</span>
                  <span>💬 {reviews.length} Reviews</span>
                  <span>❤️ {wishlist.length} Wishlist</span>
                </div>
              </div>

              {/* Cloud Database (Firebase) Proposal / Status */}
              <div className="p-4 bg-[#F7F9F8] border border-[#E4E8E6] rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                      <Database className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-[#1E2723]">
                        Cloud Database (Firebase Firestore)
                      </h4>
                      <p className="text-[11px] text-[#66736D]">
                        Multi-device sync, real-time orders & cloud authentication
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-amber-100 text-amber-800 text-[10px] font-extrabold rounded-full">
                    Awaiting Permission
                  </span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-amber-200 text-xs text-[#1E2723] space-y-2">
                  <div className="flex items-center gap-1.5 text-amber-800 font-bold text-[11px]">
                    <ShieldAlert className="w-4 h-4 shrink-0 text-amber-600" />
                    <span>Database Connection Protocol</span>
                  </div>
                  <p className="text-[11px] text-[#66736D] leading-relaxed">
                    Connecting to an external cloud database provisions Firebase Firestore and requires
                    your approval. To connect, simply reply to me in the chat:
                  </p>
                  <div className="p-2 bg-gray-50 rounded-lg font-mono text-[11px] text-[#006B43] border border-gray-200 font-bold">
                    "Connect the database"
                  </div>
                  <p className="text-[10px] text-[#66736D]">
                    The AI agent will immediately initiate the Firebase setup modal for your approval.
                  </p>
                </div>

                <div className="pt-1 flex gap-2">
                  <button
                    type="button"
                    onClick={handleExportData}
                    className="flex-1 py-2 px-3 bg-white border border-[#E4E8E6] hover:bg-gray-50 text-[#1E2723] text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-[#0B8F56]" />
                    <span>Export JSON Backup</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      showToast('To connect Firebase, send "Connect the database" in chat!');
                    }}
                    className="py-2 px-3 bg-[#0B8F56] hover:bg-[#006B43] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Request Cloud Sync</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 3: PREFERENCES */}
          {activeSection === 'preferences' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1E2723] mb-1">Currency Display</label>
                <select
                  value={currency}
                  onChange={(e) => {
                    setCurrency(e.target.value);
                    showToast(`Currency updated to ${e.target.value}`);
                  }}
                  className="w-full px-3.5 py-2.5 bg-[#F7F9F8] border border-[#E4E8E6] rounded-xl text-xs font-medium focus:border-[#0B8F56] focus:outline-hidden"
                >
                  <option value="INR (₹)">Indian Rupee (₹ INR)</option>
                  <option value="USD ($)">US Dollar ($ USD)</option>
                  <option value="EUR (€)">Euro (€ EUR)</option>
                  <option value="GBP (£)">British Pound (£ GBP)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E2723] mb-1">Marketplace Language</label>
                <select
                  value={language}
                  onChange={(e) => {
                    setLanguage(e.target.value);
                    showToast(`Language set to ${e.target.value}`);
                  }}
                  className="w-full px-3.5 py-2.5 bg-[#F7F9F8] border border-[#E4E8E6] rounded-xl text-xs font-medium focus:border-[#0B8F56] focus:outline-hidden"
                >
                  <option value="English">English (Default)</option>
                  <option value="Hindi">हिन्दी (Hindi)</option>
                  <option value="Tamil">தமிழ் (Tamil)</option>
                  <option value="Telugu">తెలుగు (Telugu)</option>
                  <option value="Bengali">বাংলা (Bengali)</option>
                </select>
              </div>

              <div className="p-3.5 bg-gray-50 border border-[#E4E8E6] rounded-2xl space-y-2">
                <span className="text-xs font-bold text-[#1E2723] block">Heritage Preservation Pledge</span>
                <p className="text-[11px] text-[#66736D] leading-relaxed">
                  Artisan Connect guarantees 100% direct remuneration to craftspeople, zero middleman
                  commissions, and certified geographical origin tracking for Indian handicrafts.
                </p>
              </div>
            </div>
          )}

          {/* SECTION 4: ARTISAN SHIPPING & LOGISTICS */}
          {activeSection === 'logistics' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1E2723] mb-1">
                  Default Courier Partner for Dispatch
                </label>
                <select
                  value={defaultCourier}
                  onChange={(e) => {
                    setDefaultCourier(e.target.value);
                    showToast(`Default courier updated to ${e.target.value}`);
                  }}
                  className="w-full px-3.5 py-2.5 bg-[#F7F9F8] border border-[#E4E8E6] rounded-xl text-xs font-medium focus:border-[#0B8F56] focus:outline-hidden"
                >
                  <option value="India Post Artisan Express">India Post Artisan Express (Recommended)</option>
                  <option value="Blue Dart Crafts">Blue Dart Express</option>
                  <option value="Delhivery Surface">Delhivery Surface Craft</option>
                  <option value="DTDC Artisan Air">DTDC Express Courier</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E2723] mb-1">
                  Artisan Workshop Pickup Address
                </label>
                <textarea
                  rows={3}
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F7F9F8] border border-[#E4E8E6] rounded-xl text-xs font-medium focus:border-[#0B8F56] focus:outline-hidden"
                />
              </div>

              <div className="p-3.5 bg-[#E9F7F0] border border-[#0B8F56]/30 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#006B43] block">Fair-Trade Wage Minimum</span>
                  <span className="text-[11px] text-[#66736D]">Standardized artisan hourly floor: ₹180/hr</span>
                </div>
                <span className="px-2.5 py-1 bg-[#0B8F56] text-white text-[10px] font-black rounded-lg">
                  Guaranteed
                </span>
              </div>
            </div>
          )}

          {/* SECTION 5: NOTIFICATIONS */}
          {activeSection === 'notifications' && (
            <div className="space-y-3">
              {[
                {
                  label: 'Customer Order Alerts',
                  desc: 'Receive alerts when a buyer orders from your craft catalog',
                  val: orderAlerts,
                  set: setOrderAlerts,
                },
                {
                  label: 'Artisan Studio Dispatch Reminders',
                  desc: 'Prompts to print shipping labels and fulfill pending items',
                  val: studioAlerts,
                  set: setStudioAlerts,
                },
                {
                  label: 'Customer Reviews & Feedback',
                  desc: 'Notifications when buyers review your craft or ask questions',
                  val: reviewAlerts,
                  set: setReviewAlerts,
                },
                {
                  label: 'Artisan Guild Digest',
                  desc: 'Weekly stories, craft exhibitions and fair-trade market updates',
                  val: newsletterAlerts,
                  set: setNewsletterAlerts,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-[#F7F9F8] border border-[#E4E8E6] rounded-xl flex items-center justify-between"
                >
                  <div className="pr-3">
                    <span className="text-xs font-bold text-[#1E2723] block">{item.label}</span>
                    <span className="text-[10px] text-[#66736D]">{item.desc}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      item.set(!item.val);
                      showToast(`${item.label} ${!item.val ? 'enabled' : 'disabled'}`);
                    }}
                    className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                      item.val ? 'bg-[#0B8F56]' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white transition-transform ${
                        item.val ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* SECTION 6: DATA & STORAGE */}
          {activeSection === 'storage' && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 border border-[#E4E8E6] rounded-2xl space-y-2">
                <span className="text-xs font-black text-[#1E2723] block">Storage Metrics</span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-white rounded-xl border border-gray-200">
                    <span className="text-[10px] text-[#66736D] block">Craft Catalog</span>
                    <span className="text-sm font-black text-[#0B8F56]">{products.length} items</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-gray-200">
                    <span className="text-[10px] text-[#66736D] block">Orders Managed</span>
                    <span className="text-sm font-black text-[#1E2723]">{orders.length} orders</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={() => {
                    resetCatalog();
                    showToast('Catalog refreshed with 200 realistic artisan crafts!');
                  }}
                  className="w-full p-3 bg-white border border-[#0B8F56] text-[#006B43] hover:bg-[#E9F7F0] text-xs font-bold rounded-xl flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-[#0B8F56]" />
                    <div className="text-left">
                      <span className="block font-black">Reload 200 Realistic Authentic Crafts</span>
                      <span className="text-[10px] text-[#66736D]">
                        Fixes duplicate images and restores the realistic handmade photography
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#0B8F56]" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Reset all demo data, orders, and cache to initial state?')) {
                      localStorage.clear();
                      resetCatalog();
                      showToast('Local storage cache reset to initial state!');
                    }
                  }}
                  className="w-full p-3 bg-white border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold rounded-xl flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Trash2 className="w-4 h-4 text-red-500" />
                    <div className="text-left">
                      <span className="block font-black">Clear Cache & Local Storage</span>
                      <span className="text-[10px] text-gray-500">
                        Removes temporary cache and restores factory defaults
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E4E8E6] bg-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-1 text-[11px] text-[#66736D]">
            <Info className="w-3.5 h-3.5 text-gray-400" />
            <span>Artisan Connect v1.2.0 • Made with Indian Craftspeople</span>
          </div>
          <button
            type="button"
            onClick={() => setIsSettingsOpen(false)}
            className="px-4 py-2 bg-[#1E2723] hover:bg-black text-white text-xs font-bold rounded-xl transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
