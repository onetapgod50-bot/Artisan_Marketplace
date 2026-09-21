import React, { useMemo } from 'react';
import { categories } from '../data/catalog';
import { ProductCard } from '../components/ProductCard';
import { useApp } from '../context/AppContext';
import { Search, SlidersHorizontal, ArrowLeft } from 'lucide-react';

export const CategoryScreen: React.FC = () => {
  const {
    products,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    setIsSearchOpen,
    setIsFilterOpen,
    sortBy,
    priceRange,
  } = useApp();

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let list = products;
    if (selectedCategoryFilter) {
      list = list.filter((p) => p.category === selectedCategoryFilter);
    }
    // Price range
    list = list.filter((p) => p.price <= priceRange);

    // Sorting
    const sorted = [...list];
    if (sortBy === 'Price: Low to High') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price: High to Low') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'Top Rated') {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'Newest First') {
      sorted.sort((a, b) => b.id - a.id);
    }
    return sorted;
  }, [products, selectedCategoryFilter, sortBy, priceRange]);

  // If viewing all categories grid (no category selected)
  if (!selectedCategoryFilter) {
    return (
      <div className="pb-24 pt-3 px-4 max-w-md mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-black text-xl text-[#1E2723]">Explore Categories</h2>
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-[#66736D] hover:text-[#1E2723] rounded-full hover:bg-gray-100"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-3 gap-2.5">
          {/* All Products Tile */}
          <div
            id="cat-tile-all"
            onClick={() => setSelectedCategoryFilter('ALL_PRODUCTS')}
            className="bg-white border border-[#E4E8E6] hover:border-[#0B8F56]/50 rounded-2xl p-2 flex flex-col items-center justify-center cursor-pointer transition-all hover:shadow-xs group"
          >
            <div className="w-full aspect-square rounded-xl bg-[#E9F7F0] group-hover:bg-[#d5f0e2] flex items-center justify-center text-3xl mb-1.5 transition-colors">
              🛍️
            </div>
            <span className="font-bold text-xs text-[#1E2723] text-center truncate w-full">
              All Products
            </span>
            <span className="text-[11px] text-[#66736D]">({products.length})</span>
          </div>

          {/* Categories Tiles */}
          {categories.map((cat) => {
            const count = products.filter((p) => p.category === cat.name).length;
            return (
              <div
                key={cat.name}
                id={`cat-tile-${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setSelectedCategoryFilter(cat.name)}
                className="bg-white border border-[#E4E8E6] hover:border-[#0B8F56]/50 rounded-2xl p-2 flex flex-col items-center justify-center cursor-pointer transition-all hover:shadow-xs group"
              >
                <div className="w-full aspect-square rounded-xl bg-[#E9F7F0] group-hover:bg-[#d5f0e2] flex items-center justify-center text-3xl mb-1.5 transition-colors">
                  {cat.icon}
                </div>
                <span className="font-bold text-[11px] text-[#1E2723] text-center line-clamp-2 leading-tight w-full">
                  {cat.name}
                </span>
                <span className="text-[10px] text-[#66736D] mt-0.5">({count})</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Selected Category / Product Listing view
  const categoryTitle =
    selectedCategoryFilter === 'ALL_PRODUCTS' ? 'All Products' : selectedCategoryFilter;

  return (
    <div className="pb-24 pt-3 px-4 max-w-md mx-auto">
      {/* Listing Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategoryFilter(null)}
            className="p-1 -ml-1 text-[#1E2723] hover:bg-gray-100 rounded-full"
            aria-label="Back to categories"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="font-black text-lg text-[#1E2723] leading-tight">{categoryTitle}</h2>
            <p className="text-[11px] text-[#66736D] font-medium">
              {filteredProducts.length} handmade item{filteredProducts.length === 1 ? '' : 's'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-[#1E2723] hover:bg-gray-100 rounded-full"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-[#E9F7F0] text-[#0B8F56] text-xs font-bold rounded-lg border border-[#0B8F56]/20 hover:bg-[#d7f1e4]"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Horizontal Category Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 -mx-4 px-4 no-scrollbar">
        <button
          type="button"
          onClick={() => setSelectedCategoryFilter('ALL_PRODUCTS')}
          className={`shrink-0 px-3 py-1 rounded-full text-xs font-bold transition-all ${
            selectedCategoryFilter === 'ALL_PRODUCTS'
              ? 'bg-[#0B8F56] text-white shadow-xs'
              : 'bg-[#F2F5F3] text-[#1E2723] hover:bg-gray-200'
          }`}
        >
          All ({products.length})
        </button>
        {categories.map((c) => {
          const isSelected = selectedCategoryFilter === c.name;
          const count = products.filter((p) => p.category === c.name).length;
          return (
            <button
              key={c.name}
              type="button"
              onClick={() => setSelectedCategoryFilter(c.name)}
              className={`shrink-0 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                isSelected
                  ? 'bg-[#0B8F56] text-white shadow-xs'
                  : 'bg-[#F2F5F3] text-[#1E2723] hover:bg-gray-200'
              }`}
            >
              {c.name} ({count})
            </button>
          );
        })}
      </div>

      {/* Product Grid or Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-gray-400 text-sm font-semibold">No products found matching filters</p>
          <button
            type="button"
            onClick={() => setSelectedCategoryFilter('ALL_PRODUCTS')}
            className="mt-3 text-xs font-bold text-[#0B8F56] underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
