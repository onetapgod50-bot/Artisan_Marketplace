import React, { useState } from 'react';
import {
  ArrowLeft,
  Package,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Truck,
  CheckCircle2,
  Clock,
  Mic,
  DollarSign,
  Layers,
  Wand2,
  Scissors,
  Award,
  Store,
  ExternalLink,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product, Order } from '../types';

export const ArtisanStudioScreen: React.FC = () => {
  const {
    isArtisanStudioOpen,
    setIsArtisanStudioOpen,
    products,
    deleteProduct,
    orders,
    updateOrderStatus,
    setIsAddProductOpen,
    setEditingProduct,
    user,
    switchRole,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'ai_tools'>('products');
  const [shippingModalOrder, setShippingModalOrder] = useState<Order | null>(null);
  const [courierName, setCourierName] = useState('India Post Artisan Express');
  const [trackingNumber, setTrackingNumber] = useState('IND9872630');

  // AI Fair-Trade Pricing state
  const [materialCost, setMaterialCost] = useState(250);
  const [laborHours, setLaborHours] = useState(4);
  const [hourlyWage, setHourlyWage] = useState(180);
  const [craftIntricacy, setCraftIntricacy] = useState<'standard' | 'intricate' | 'masterpiece'>('intricate');

  // AI Heritage Story generator state
  const [selectedTradition, setSelectedTradition] = useState('Terracotta Pottery');
  const [keywords, setKeywords] = useState('natural clay, kiln fired, traditional cutouts');
  const [generatedStory, setGeneratedStory] = useState<{
    title: string;
    story: string;
    materials: string[];
    suggestedPrice: number;
  } | null>(null);
  const [isGeneratingStory, setIsGeneratingStory] = useState(false);

  // Background removal preview state
  const [bgMode, setBgMode] = useState<'original' | 'white' | 'warm' | 'workshop'>('white');
  const [isDictating, setIsDictating] = useState(false);
  const [dictatedText, setDictatedText] = useState('');

  if (!isArtisanStudioOpen) return null;

  // Filter products belonging to this artisan or show all for platform management
  const artisanProducts = products.filter(
    (p) => p.artisan.toLowerCase().includes(user.name.toLowerCase()) || p.artisan.includes('Ramesh') || p.id <= 5
  );

  // Filter orders containing artisan products
  const artisanOrders = orders;

  // Calculate stats
  const totalEarnings = artisanOrders
    .filter((o) => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + o.total, 0);

  const pendingOrdersCount = artisanOrders.filter((o) => o.status === 'Processing').length;

  // Fair-trade formula: Materials + (Hours * Wage) * Intricacy multiplier
  const intricacyMultiplier = craftIntricacy === 'standard' ? 1.15 : craftIntricacy === 'intricate' ? 1.35 : 1.6;
  const recommendedPrice = Math.round((materialCost + (laborHours * hourlyWage)) * intricacyMultiplier);
  const artisanFairProfit = Math.round(recommendedPrice - materialCost - (laborHours * hourlyWage));

  const handleGenerateStory = () => {
    setIsGeneratingStory(true);
    setTimeout(() => {
      if (selectedTradition.includes('Terracotta')) {
        setGeneratedStory({
          title: 'Handcrafted Heritage Terracotta Diya with Sacred Jali Carvings',
          story: 'Molded from organic riverbed clay by hereditary artisans, this piece undergoes slow sun-curing followed by wood-fired kiln baking. The intricate geometric cutouts allow gentle lamplight to diffuse in sacred patterns, celebrating centuries of village craftsmanship.',
          materials: ['Fine Riverbed Terracotta Clay', 'Natural Mineral Ochre', 'Plant Polish'],
          suggestedPrice: 480,
        });
      } else if (selectedTradition.includes('Brass')) {
        setGeneratedStory({
          title: 'Sacred Lost-Wax Bell-Metal Cast Temple Diya',
          story: 'Crafted using the 4,000-year-old Dhokra lost-wax casting technique. Each bell is individually sculpted in beeswax, encased in clay molds, and cast in resonant alloy, producing a pure harmonic tone.',
          materials: ['Bell Metal Bronze', 'Beeswax Mold', 'Natural Patina'],
          suggestedPrice: 1250,
        });
      } else {
        setGeneratedStory({
          title: 'GI-Certified Handloom Silk & Zari Weave Shawl',
          story: 'Woven on traditional pit looms over 18 days of patient handcraft. Pure Mulberry silk threads interlaced with metallic zari borders depicting temple architectural motifs.',
          materials: ['Pure Mulberry Silk', 'Silver Gilded Zari', 'Natural Vegetable Dyes'],
          suggestedPrice: 2800,
        });
      }
      setIsGeneratingStory(false);
      showToast('AI Heritage Story and Specs Generated!');
    }, 800);
  };

  const handleStartDictation = () => {
    setIsDictating(true);
    setTimeout(() => {
      setDictatedText(
        'This craft is made from 100% natural red river clay sourced from the banks of Cauvery. Each perforation was individually hand-carved with a bamboo stylus before 72 hours of open-hearth kiln firing.'
      );
      setIsDictating(false);
      showToast('Voice transcribed into text successfully!');
    }, 1200);
  };

  const handleDispatchOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingModalOrder) return;
    updateOrderStatus(shippingModalOrder.id, 'Shipped', trackingNumber, courierName);
    setShippingModalOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#F7F9F8] overflow-y-auto">
      {/* Top Navigation */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-xs border-b border-[#E4E8E6] px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsArtisanStudioOpen(false)}
              className="p-1.5 -ml-1 text-[#1E2723] hover:bg-gray-100 rounded-full transition-colors"
              title="Return"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-base text-[#1E2723]">Artisan Studio</span>
                <span className="px-2 py-0.5 bg-[#E9F7F0] text-[#006B43] text-[10px] font-extrabold rounded-full">
                  Craftsperson Portal
                </span>
              </div>
              <p className="text-[11px] text-[#66736D]">
                Manage listings, fulfill orders & apply AI cataloging
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => switchRole('buyer')}
              className="px-2.5 py-1.5 border border-[#E4E8E6] hover:bg-gray-50 text-[11px] font-bold text-[#1E2723] rounded-lg transition-colors flex items-center gap-1"
            >
              <Store className="w-3.5 h-3.5 text-[#0B8F56]" />
              <span>Buyer View</span>
            </button>
            <button
              type="button"
              onClick={() => setIsAddProductOpen(true)}
              className="px-3 py-1.5 bg-[#0B8F56] hover:bg-[#006B43] text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Craft</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 pb-20">
        {/* Artisan Profile & Summary Banner */}
        <div className="bg-white border border-[#E4E8E6] rounded-2xl p-4 mb-4 shadow-xs">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#E9F7F0] border border-[#0B8F56]/20 flex items-center justify-center text-[#0B8F56] font-black text-lg">
                {user.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="text-base font-extrabold text-[#1E2723]">{user.name}</h2>
                  <Award className="w-4 h-4 text-[#F5A623]" />
                </div>
                <p className="text-xs text-[#66736D]">
                  Master Artisan · Thanjavur Heritage Guild · Certified Fair Trade
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 bg-[#F0F4F2] text-[#1E2723] text-xs font-bold rounded-lg">
              ★ 4.9 Rating
            </span>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-4 gap-2 pt-3 border-t border-[#F0F4F2]">
            <div className="bg-[#F7F9F8] p-2.5 rounded-xl text-center">
              <span className="text-[10px] text-[#66736D] font-bold block uppercase tracking-wider">
                Earnings
              </span>
              <span className="text-sm font-black text-[#0B8F56]">
                ₹{totalEarnings.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="bg-[#F7F9F8] p-2.5 rounded-xl text-center">
              <span className="text-[10px] text-[#66736D] font-bold block uppercase tracking-wider">
                My Crafts
              </span>
              <span className="text-sm font-black text-[#1E2723]">{artisanProducts.length}</span>
            </div>
            <div className="bg-[#F7F9F8] p-2.5 rounded-xl text-center">
              <span className="text-[10px] text-[#66736D] font-bold block uppercase tracking-wider">
                To Pack
              </span>
              <span className="text-sm font-black text-[#E65100]">{pendingOrdersCount}</span>
            </div>
            <div className="bg-[#F7F9F8] p-2.5 rounded-xl text-center">
              <span className="text-[10px] text-[#66736D] font-bold block uppercase tracking-wider">
                Total Orders
              </span>
              <span className="text-sm font-black text-[#1E2723]">{artisanOrders.length}</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-white p-1 rounded-xl border border-[#E4E8E6] mb-4 shadow-xs">
          <button
            type="button"
            onClick={() => setActiveTab('products')}
            className={`flex-1 py-2 text-xs font-extrabold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'products'
                ? 'bg-[#0B8F56] text-white shadow-xs'
                : 'text-[#66736D] hover:text-[#1E2723]'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>My Crafts ({artisanProducts.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-2 text-xs font-extrabold rounded-lg transition-all flex items-center justify-center gap-1.5 relative ${
              activeTab === 'orders'
                ? 'bg-[#0B8F56] text-white shadow-xs'
                : 'text-[#66736D] hover:text-[#1E2723]'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Orders ({artisanOrders.length})</span>
            {pendingOrdersCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-red-500 absolute top-2 right-4" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ai_tools')}
            className={`flex-1 py-2 text-xs font-extrabold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'ai_tools'
                ? 'bg-[#0B8F56] text-white shadow-xs'
                : 'text-[#66736D] hover:text-[#1E2723]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F5A623]" />
            <span>AI Studio Tools</span>
          </button>
        </div>

        {/* Tab 1: Product Catalog Management */}
        {activeTab === 'products' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#66736D]">
                Active Catalog Items
              </h3>
              <button
                type="button"
                onClick={() => setIsAddProductOpen(true)}
                className="text-xs font-bold text-[#0B8F56] hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New Craft</span>
              </button>
            </div>

            {artisanProducts.length === 0 ? (
              <div className="bg-white border border-[#E4E8E6] rounded-2xl p-8 text-center">
                <Package className="w-12 h-12 text-[#8A9790] mx-auto mb-2 stroke-[1.5]" />
                <p className="text-sm font-bold text-[#1E2723]">No products listed yet</p>
                <p className="text-xs text-[#66736D] mt-1 mb-4">
                  Use our AI cataloging tool to publish your first craft in under 2 minutes.
                </p>
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(true)}
                  className="px-4 py-2 bg-[#0B8F56] text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  Create Your First Listing
                </button>
              </div>
            ) : (
              <div className="space-y-2.5">
                {artisanProducts.map((p) => (
                  <div
                    key={p.id}
                    className="bg-white border border-[#E4E8E6] rounded-2xl p-3 flex items-center gap-3 shadow-xs hover:border-[#0B8F56]/40 transition-colors"
                  >
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-xl object-cover bg-gray-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="px-2 py-0.5 bg-[#F0F4F2] text-[#006B43] text-[9px] font-bold rounded-md">
                          {p.category}
                        </span>
                        <span className="text-[10px] text-[#66736D]">
                          Stock: {p.stock || 12} units
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-[#1E2723] truncate mb-1">{p.name}</h4>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-black text-[#0B8F56]">₹{p.price}</span>
                        <span className="text-[10px] text-[#8A9790]">★ {p.rating} ({p.reviews})</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingProduct(p);
                          setIsAddProductOpen(true);
                        }}
                        className="p-2 text-[#66736D] hover:text-[#0B8F56] hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit Craft"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Remove "${p.name}" from catalog?`)) {
                            deleteProduct(p.id);
                          }
                        }}
                        className="p-2 text-[#66736D] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Craft"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Orders & Dispatches */}
        {activeTab === 'orders' && (
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#66736D]">
              Customer Orders to Fulfill
            </h3>

            {artisanOrders.length === 0 ? (
              <div className="bg-white border border-[#E4E8E6] rounded-2xl p-8 text-center">
                <ShoppingBag className="w-12 h-12 text-[#8A9790] mx-auto mb-2 stroke-[1.5]" />
                <p className="text-sm font-bold text-[#1E2723]">No orders yet</p>
                <p className="text-xs text-[#66736D] mt-1">
                  When customers buy your crafts, orders will appear here for packaging and dispatch.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {artisanOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="bg-white border border-[#E4E8E6] rounded-2xl p-4 shadow-xs"
                  >
                    <div className="flex items-start justify-between mb-3 border-b border-[#F0F4F2] pb-2.5">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-[#1E2723]">#{ord.id}</span>
                          <span
                            className={`px-2 py-0.5 text-[10px] font-bold rounded-md ${
                              ord.status === 'Processing'
                                ? 'bg-amber-100 text-amber-800'
                                : ord.status === 'Shipped'
                                ? 'bg-blue-100 text-blue-800'
                                : ord.status === 'Delivered'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {ord.status}
                          </span>
                        </div>
                        <span className="text-[10px] text-[#8A9790]">{ord.date}</span>
                      </div>
                      <span className="text-xs font-black text-[#0B8F56]">₹{ord.total}</span>
                    </div>

                    {/* Ordered Crafts list */}
                    <div className="space-y-2 mb-3">
                      {ord.products.map((item) => (
                        <div key={item.id} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2 min-w-0">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              referrerPolicy="no-referrer"
                              className="w-8 h-8 rounded-md object-cover bg-gray-100"
                            />
                            <span className="truncate font-medium text-[#1E2723]">{item.name}</span>
                          </div>
                          <span className="text-[#66736D] font-bold shrink-0 ml-2">
                            x{ord.quantities?.[item.id] || 1}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Shipping Address */}
                    {ord.shippingAddress && (
                      <div className="bg-[#F7F9F8] p-2.5 rounded-xl mb-3 text-[11px] text-[#66736D]">
                        <span className="font-bold text-[#1E2723] block mb-0.5">Shipping Destination:</span>
                        <p className="whitespace-pre-line leading-relaxed">{ord.shippingAddress}</p>
                      </div>
                    )}

                    {/* Courier Tracking info if shipped */}
                    {ord.trackingNumber && (
                      <div className="p-2 bg-[#E9F7F0] rounded-xl mb-3 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 text-[#006B43]">
                          <Truck className="w-4 h-4" />
                          <span>
                            {ord.courierName || 'Courier'}: <strong>{ord.trackingNumber}</strong>
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-[#0B8F56]">In Transit</span>
                      </div>
                    )}

                    {/* Artisan Order Action Buttons */}
                    <div className="flex items-center gap-2 pt-1">
                      {ord.status === 'Processing' && (
                        <button
                          type="button"
                          onClick={() => setShippingModalOrder(ord)}
                          className="flex-1 py-2 bg-[#0B8F56] hover:bg-[#006B43] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                        >
                          <Truck className="w-3.5 h-3.5" />
                          <span>Dispatch & Add Tracking</span>
                        </button>
                      )}
                      {ord.status === 'Shipped' && (
                        <button
                          type="button"
                          onClick={() => updateOrderStatus(ord.id, 'Delivered')}
                          className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Mark as Delivered</span>
                        </button>
                      )}
                      {ord.status === 'Delivered' && (
                        <div className="flex-1 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold text-center rounded-xl">
                          ✓ Delivery Completed & Payout Credited
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: AI Studio Suite */}
        {activeTab === 'ai_tools' && (
          <div className="space-y-4">
            {/* Tool 1: Fair-Trade Smart Pricing Calculator */}
            <div className="bg-white border border-[#E4E8E6] rounded-2xl p-4 shadow-xs">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="w-5 h-5 text-[#0B8F56]" />
                <h3 className="text-sm font-extrabold text-[#1E2723]">
                  AI Fair-Trade Smart Pricing Calculator
                </h3>
              </div>
              <p className="text-xs text-[#66736D] mb-4">
                Protects artisans from under-pricing by factoring in raw materials, dedicated labor hours, and artisan guild wage standards.
              </p>

              <div className="space-y-3 mb-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-[#1E2723] mb-1">
                    <span>Raw Material Costs (Clay, Brass, Silk, Dyes):</span>
                    <span className="text-[#0B8F56]">₹{materialCost}</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="2000"
                    step="50"
                    value={materialCost}
                    onChange={(e) => setMaterialCost(Number(e.target.value))}
                    className="w-full accent-[#0B8F56]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-[#1E2723] mb-1">
                    <span>Labor Dedicated:</span>
                    <span className="text-[#0B8F56]">{laborHours} Hours</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="24"
                    step="1"
                    value={laborHours}
                    onChange={(e) => setLaborHours(Number(e.target.value))}
                    className="w-full accent-[#0B8F56]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-[#1E2723] mb-1">
                    <span>Fair Hourly Wage Target:</span>
                    <span className="text-[#0B8F56]">₹{hourlyWage}/hr</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="400"
                    step="20"
                    value={hourlyWage}
                    onChange={(e) => setHourlyWage(Number(e.target.value))}
                    className="w-full accent-[#0B8F56]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E2723] mb-1.5">
                    Craftsmanship Intricacy Factor:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['standard', 'intricate', 'masterpiece'] as const).map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setCraftIntricacy(level)}
                        className={`py-1.5 text-xs font-bold rounded-lg border capitalize transition-all ${
                          craftIntricacy === level
                            ? 'bg-[#0B8F56] text-white border-[#0B8F56]'
                            : 'bg-white text-[#66736D] border-[#E4E8E6]'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pricing Output */}
              <div className="bg-[#E9F7F0] border border-[#0B8F56]/20 rounded-xl p-3.5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-extrabold text-[#006B43]">
                    Recommended Fair Retail Price:
                  </span>
                  <span className="text-lg font-black text-[#0B8F56]">₹{recommendedPrice}</span>
                </div>
                <div className="text-[11px] text-[#006B43]/90 space-y-0.5">
                  <p>• Raw Materials: ₹{materialCost}</p>
                  <p>• Fair Artisan Labor (₹{hourlyWage} x {laborHours}h): ₹{laborHours * hourlyWage}</p>
                  <p>• Sustainable Artisan Margin: ₹{artisanFairProfit}</p>
                </div>
              </div>
            </div>

            {/* Tool 2: AI Heritage Storyteller & Catalog Generator */}
            <div className="bg-white border border-[#E4E8E6] rounded-2xl p-4 shadow-xs">
              <div className="flex items-center gap-2 mb-1">
                <Wand2 className="w-5 h-5 text-[#F5A623]" />
                <h3 className="text-sm font-extrabold text-[#1E2723]">
                  AI Heritage Storyteller & Spec Generator
                </h3>
              </div>
              <p className="text-xs text-[#66736D] mb-3">
                Translates traditional artisanal techniques into persuasive marketplace listings with GI tags and cultural provenance.
              </p>

              <div className="space-y-3 mb-3">
                <div>
                  <label className="block text-xs font-bold text-[#1E2723] mb-1">
                    Select Craft Tradition
                  </label>
                  <select
                    value={selectedTradition}
                    onChange={(e) => setSelectedTradition(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#E4E8E6] rounded-xl focus:outline-hidden focus:border-[#0B8F56]"
                  >
                    <option value="Terracotta Pottery">Terracotta Pottery & Diya Art</option>
                    <option value="Brass Lost-Wax Casting">Brass & Bell-Metal Lost Wax Casting</option>
                    <option value="Handloom Silk">Handloom Silk & Zari Weaving</option>
                    <option value="Sheesham Woodcraft">Sheesham Wood Jali Carving</option>
                    <option value="Madhubani Folk Art">Madhubani & Warli Folk Painting</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E2723] mb-1">
                    Key Features / Notes
                  </label>
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                      placeholder="e.g. natural river clay, kiln fired, perforated"
                      className="flex-1 px-3 py-2 text-xs bg-white border border-[#E4E8E6] rounded-xl focus:outline-hidden focus:border-[#0B8F56]"
                    />
                    <button
                      type="button"
                      onClick={handleGenerateStory}
                      disabled={isGeneratingStory}
                      className="px-3 py-2 bg-[#0B8F56] hover:bg-[#006B43] text-white text-xs font-bold rounded-xl transition-colors shrink-0 flex items-center gap-1 shadow-xs"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isGeneratingStory ? 'Writing...' : 'Generate Story'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {generatedStory && (
                <div className="bg-[#F7F9F8] border border-[#E4E8E6] rounded-xl p-3.5 text-xs space-y-2">
                  <div>
                    <span className="font-extrabold text-[#1E2723] block mb-0.5">
                      Suggested Title:
                    </span>
                    <p className="font-bold text-[#0B8F56]">{generatedStory.title}</p>
                  </div>
                  <div>
                    <span className="font-extrabold text-[#1E2723] block mb-0.5">
                      Heritage Story:
                    </span>
                    <p className="text-[#1E2723]/90 leading-relaxed">{generatedStory.story}</p>
                  </div>
                  <div>
                    <span className="font-extrabold text-[#1E2723] block mb-0.5">
                      Identified Materials:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {generatedStory.materials.map((m) => (
                        <span
                          key={m}
                          className="px-2 py-0.5 bg-white border border-[#E4E8E6] text-[10px] font-semibold rounded-md"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddProductOpen(true);
                      showToast('Applied AI Generated Story to New Product Form!');
                    }}
                    className="w-full mt-2 py-2 bg-[#0B8F56] text-white font-bold text-xs rounded-xl shadow-xs hover:bg-[#006B43] transition-colors"
                  >
                    Use in New Product Listing →
                  </button>
                </div>
              )}
            </div>

            {/* Tool 3: Background Removal & Studio Lighting Simulator */}
            <div className="bg-white border border-[#E4E8E6] rounded-2xl p-4 shadow-xs">
              <div className="flex items-center gap-2 mb-1">
                <Scissors className="w-5 h-5 text-indigo-600" />
                <h3 className="text-sm font-extrabold text-[#1E2723]">
                  AI Background Clean-up & Studio Lighting
                </h3>
              </div>
              <p className="text-xs text-[#66736D] mb-3">
                Removes workshop clutter from handmade photos to boost buyer conversion.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="aspect-square rounded-xl overflow-hidden border border-[#E4E8E6] relative bg-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?auto=format&fit=crop&w=400&q=80"
                    alt="Original"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/70 text-white text-[9px] font-bold rounded-md">
                    Original Artisan Photo
                  </span>
                </div>

                <div
                  className={`aspect-square rounded-xl overflow-hidden border border-[#0B8F56] relative flex items-center justify-center p-2 transition-all ${
                    bgMode === 'white'
                      ? 'bg-white'
                      : bgMode === 'warm'
                      ? 'bg-[#FAF6F0]'
                      : bgMode === 'workshop'
                      ? 'bg-amber-950/10'
                      : 'bg-transparent'
                  }`}
                >
                  <img
                    src="https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?auto=format&fit=crop&w=400&q=80"
                    alt="AI Processed"
                    className="w-full h-full object-contain filter drop-shadow-md"
                  />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-[#0B8F56] text-white text-[9px] font-bold rounded-md">
                    AI Studio Backdrop ({bgMode})
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#1E2723]">Backdrop Preset:</span>
                <div className="flex gap-1">
                  {(['white', 'warm', 'workshop'] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setBgMode(mode)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold capitalize border transition-all ${
                        bgMode === mode
                          ? 'bg-[#0B8F56] text-white border-[#0B8F56]'
                          : 'bg-white text-[#66736D] border-[#E4E8E6]'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tool 4: Voice Speech-to-Text Support */}
            <div className="bg-white border border-[#E4E8E6] rounded-2xl p-4 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Mic className="w-5 h-5 text-red-500" />
                  <h3 className="text-sm font-extrabold text-[#1E2723]">
                    Voice Speech-to-Text Dictation
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handleStartDictation}
                  disabled={isDictating}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isDictating
                      ? 'bg-red-500 text-white animate-pulse'
                      : 'bg-[#F0F4F2] hover:bg-[#E4E8E6] text-[#1E2723]'
                  }`}
                >
                  <Mic className="w-3.5 h-3.5 text-red-500" />
                  <span>{isDictating ? 'Listening...' : 'Record Voice'}</span>
                </button>
              </div>
              <p className="text-xs text-[#66736D] mb-3">
                Speak in Hindi, Tamil, or English to compose your craft specs naturally.
              </p>

              {dictatedText ? (
                <div className="p-3 bg-[#F7F9F8] border border-[#E4E8E6] rounded-xl text-xs text-[#1E2723] leading-relaxed">
                  <span className="font-extrabold text-[#0B8F56] block mb-1">
                    ✓ Transcribed Speech:
                  </span>
                  "{dictatedText}"
                </div>
              ) : (
                <div className="p-3 border border-dashed border-[#E4E8E6] rounded-xl text-center text-xs text-[#8A9790]">
                  Tap "Record Voice" to dictate craft details or describe your technique.
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Shipping / Dispatch Modal */}
      {shippingModalOrder && (
        <div className="fixed inset-0 z-60 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-4 shadow-xl border border-[#E4E8E6]">
            <h3 className="text-sm font-extrabold text-[#1E2723] mb-1">
              Dispatch Order #{shippingModalOrder.id}
            </h3>
            <p className="text-xs text-[#66736D] mb-3">
              Enter the shipment tracking details so the customer can track their handcrafted package.
            </p>

            <form onSubmit={handleDispatchOrder} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-[#66736D] mb-1">
                  Courier Partner
                </label>
                <select
                  value={courierName}
                  onChange={(e) => setCourierName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#E4E8E6] rounded-xl focus:outline-hidden focus:border-[#0B8F56]"
                >
                  <option value="India Post Artisan Express">India Post Artisan Express</option>
                  <option value="Blue Dart Crafts Division">Blue Dart Crafts Division</option>
                  <option value="Delhivery Surface Express">Delhivery Surface Express</option>
                  <option value="DTDC Heritage Logistics">DTDC Heritage Logistics</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#66736D] mb-1">
                  Tracking AWB / Consignment Number
                </label>
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  required
                  placeholder="e.g. IND9872630"
                  className="w-full px-3 py-2 text-xs bg-white border border-[#E4E8E6] rounded-xl focus:outline-hidden focus:border-[#0B8F56]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShippingModalOrder(null)}
                  className="flex-1 py-2.5 border border-[#E4E8E6] text-xs font-bold text-[#66736D] rounded-xl hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#0B8F56] hover:bg-[#006B43] text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
                >
                  Confirm Dispatch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
