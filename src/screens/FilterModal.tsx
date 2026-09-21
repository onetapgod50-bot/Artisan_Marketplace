import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FilterModal: React.FC = () => {
  const { isFilterOpen, setIsFilterOpen, sortBy, setSortBy, priceRange, setPriceRange } =
    useApp();

  const [tempSort, setTempSort] = useState(sortBy);
  const [tempPrice, setTempPrice] = useState(priceRange);

  if (!isFilterOpen) return null;

  const sortOptions = [
    'Relevance',
    'Price: Low to High',
    'Price: High to Low',
    'Top Rated',
    'Newest First',
  ];

  const handleApply = () => {
    setSortBy(tempSort);
    setPriceRange(tempPrice);
    setIsFilterOpen(false);
  };

  const handleReset = () => {
    setTempSort('Relevance');
    setTempPrice(3000);
    setSortBy('Relevance');
    setPriceRange(3000);
    setIsFilterOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs"
        onClick={() => setIsFilterOpen(false)}
      />

      {/* Sheet Content */}
      <div className="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl z-10 animate-in slide-in-from-bottom duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-[#E4E8E6] mb-4">
          <h3 className="font-black text-base text-[#1E2723]">Sort & Filter Products</h3>
          <button
            type="button"
            onClick={() => setIsFilterOpen(false)}
            className="p-1 rounded-full text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sort Options */}
        <div className="mb-5">
          <label className="block text-xs font-black uppercase tracking-wider text-[#1E2723] mb-2.5">
            Sort By
          </label>
          <div className="space-y-1.5">
            {sortOptions.map((opt) => (
              <label
                key={opt}
                className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                  tempSort === opt
                    ? 'border-[#0B8F56] bg-[#E9F7F0]/40 text-[#006B43] font-bold'
                    : 'border-[#E4E8E6] text-[#1E2723] font-medium hover:bg-gray-50'
                }`}
              >
                <span className="text-xs">{opt}</span>
                <input
                  type="radio"
                  name="sortOption"
                  checked={tempSort === opt}
                  onChange={() => setTempSort(opt)}
                  className="accent-[#0B8F56]"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Price Slider */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-black uppercase tracking-wider text-[#1E2723]">
              Max Price Range
            </label>
            <span className="font-extrabold text-sm text-[#0B8F56]">
              Up to ₹{tempPrice.toLocaleString('en-IN')}
            </span>
          </div>

          <input
            type="range"
            min={300}
            max={3000}
            step={50}
            value={tempPrice}
            onChange={(e) => setTempPrice(Number(e.target.value))}
            className="w-full accent-[#0B8F56] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[#66736D] font-bold mt-1">
            <span>₹300</span>
            <span>₹1,500</span>
            <span>₹3,000</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2.5 pt-2 border-t border-[#E4E8E6]">
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 py-2.5 border border-[#E4E8E6] text-[#66736D] hover:bg-gray-50 text-xs font-bold rounded-xl"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="flex-1 py-2.5 bg-[#0B8F56] hover:bg-[#006B43] text-white text-xs font-bold rounded-xl shadow-xs"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};
