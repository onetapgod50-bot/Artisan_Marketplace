import React, { useState, useMemo } from 'react';
import { Search, X, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, products } = useApp();
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.artisan.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q)
    );
  }, [query, products]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Search Header */}
      <div className="border-b border-[#E4E8E6] p-3 flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            setIsSearchOpen(false);
            setQuery('');
          }}
          className="p-1.5 text-[#1E2723] hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-[#66736D] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, artisans, categories..."
            className="w-full pl-9 pr-8 py-2 bg-[#F7F9F8] border border-[#E4E8E6] rounded-xl text-xs font-medium focus:border-[#0B8F56] focus:outline-hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Results / Empty state */}
      <div className="flex-1 overflow-y-auto p-4 max-w-md mx-auto w-full">
        {!query.trim() ? (
          <div className="pt-10 text-center">
            <p className="text-xs font-bold text-[#66736D] uppercase tracking-wider mb-3">
              Popular Searches
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {['Terracotta', 'Handloom Saree', 'Brass Diya', 'Wooden Crafts', 'Madhubani', 'Jute Bag'].map(
                (term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setQuery(term)}
                    className="px-3 py-1 bg-[#E9F7F0] text-[#006B43] text-xs font-bold rounded-full hover:bg-[#daf2e4]"
                  >
                    {term}
                  </button>
                )
              )}
            </div>
          </div>
        ) : searchResults.length === 0 ? (
          <div className="pt-16 text-center text-[#66736D]">
            <p className="text-sm font-bold">No results found for "{query}"</p>
            <p className="text-xs mt-1">Try searching for other craft forms or artisan names.</p>
          </div>
        ) : (
          <div>
            <p className="text-xs font-semibold text-[#66736D] mb-3">
              Found {searchResults.length} matching product{searchResults.length === 1 ? '' : 's'}
            </p>
            <div className="grid grid-cols-2 gap-3">
              {searchResults.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
