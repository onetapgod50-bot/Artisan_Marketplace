import React from 'react';
import { categories } from '../data/catalog';
import { ProductCard } from '../components/ProductCard';
import { useApp } from '../context/AppContext';
import { Sparkles, ArrowRight } from 'lucide-react';

export const HomeScreen: React.FC = () => {
  const {
    products,
    setSelectedCategoryFilter,
    setActiveTab,
    setIsAddProductOpen,
    user,
  } = useApp();

  const featured = products.filter((p) => p.featured).slice(0, 10);

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategoryFilter(categoryName);
    setActiveTab(1); // Switch to Categories tab
  };

  return (
    <div className="pb-24 pt-3 px-4 max-w-md mx-auto">
      {/* Hero Banner */}
      <div className="bg-[#0B8F56] rounded-2xl p-5 text-white shadow-sm mb-5 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-xl font-black tracking-tight leading-tight">
            Discover Handmade Happiness
          </h2>
          <p className="text-white/80 text-xs mt-1 font-medium leading-relaxed">
            Shop local. Support artisans. Make a difference.
          </p>
        </div>
        {/* Subtle decorative circles */}
        <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute top-0 right-12 w-16 h-16 rounded-full bg-white/5 pointer-events-none" />
      </div>

      {/* Artisan Prompt Card if user is artisan */}
      {user.role === 'artisan' && (
        <div
          onClick={() => setIsAddProductOpen(true)}
          className="mb-5 p-3.5 bg-[#E9F7F0] border border-[#0B8F56]/30 rounded-2xl flex items-center justify-between cursor-pointer hover:bg-[#d9f2e4] transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0B8F56] flex items-center justify-center text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-[#006B43]">AI Smart Cataloging</h4>
              <p className="text-[11px] text-[#66736D]">Upload photo to auto-generate product listing</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-[#0B8F56]" />
        </div>
      )}

      {/* Categories Row */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-black text-lg text-[#1E2723]">Categories</h3>
          <button
            type="button"
            onClick={() => {
              setSelectedCategoryFilter(null);
              setActiveTab(1);
            }}
            className="text-xs font-bold text-[#0B8F56] hover:underline"
          >
            View All
          </button>
        </div>

        {/* Horizontal scroll */}
        <div className="flex gap-2.5 overflow-x-auto pb-2 -mx-4 px-4 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.name}
              type="button"
              id={`cat-tile-${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => handleCategoryClick(cat.name)}
              className="shrink-0 w-[78px] flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="w-[66px] h-[66px] rounded-2xl bg-[#E9F7F0] group-hover:bg-[#d4f2e2] flex items-center justify-center text-3xl mb-1.5 transition-colors border border-[#0B8F56]/15 shadow-xs">
                {cat.icon}
              </div>
              <span className="text-[11px] font-bold text-[#1E2723] line-clamp-2 leading-tight">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-black text-lg text-[#1E2723]">Featured Products</h3>
          <button
            type="button"
            onClick={() => {
              setSelectedCategoryFilter(null);
              setActiveTab(1);
            }}
            className="text-xs font-bold text-[#0B8F56] hover:underline"
          >
            View All ({products.length})
          </button>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-2 gap-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
