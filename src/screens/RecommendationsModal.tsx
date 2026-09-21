import React from 'react';
import { Sparkles, ArrowLeft, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';

export const RecommendationsModal: React.FC = () => {
  const { isRecommendationsOpen, setIsRecommendationsOpen, products } = useApp();

  if (!isRecommendationsOpen) return null;

  // Curated items with rating >= 4.6 and high reviews
  const recommended = products
    .filter((p) => p.rating >= 4.6)
    .slice(0, 12);

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Header */}
      <div className="border-b border-[#E4E8E6] p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsRecommendationsOpen(false)}
            className="p-1.5 text-[#1E2723] hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#F0A600]" />
              <h2 className="font-bold text-base text-[#1E2723]">Recommended For You</h2>
            </div>
            <p className="text-[11px] text-[#66736D]">Personalized handcrafted discoveries</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsRecommendationsOpen(false)}
          className="p-1.5 rounded-full text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 max-w-md mx-auto w-full">
        <div className="grid grid-cols-2 gap-3">
          {recommended.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
