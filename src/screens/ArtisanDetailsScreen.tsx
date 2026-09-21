import React from 'react';
import { ArrowLeft, Star, MapPin, User, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';

export const ArtisanDetailsScreen: React.FC = () => {
  const { selectedArtisan, setSelectedArtisan, products } = useApp();

  if (!selectedArtisan) return null;

  const artisanProducts = products.filter((p) => p.artisan === selectedArtisan);
  const city = artisanProducts[0]?.city || 'Thanjavur, Tamil Nadu';

  return (
    <div className="fixed inset-0 z-40 bg-white overflow-y-auto">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-xs border-b border-[#E4E8E6] px-4 py-2.5 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setSelectedArtisan(null)}
          className="p-1.5 -ml-1 text-[#1E2723] hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="font-bold text-sm text-[#1E2723]">Artisan Profile</span>
        <div className="w-8" />
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto p-4 pb-12">
        {/* Artisan Header */}
        <div className="flex flex-col items-center text-center mt-2 mb-6">
          <div className="w-24 h-24 rounded-full bg-[#E9F7F0] border-2 border-[#0B8F56] flex items-center justify-center text-[#0B8F56] mb-3 shadow-xs">
            <User className="w-12 h-12 stroke-[1.7]" />
          </div>
          <h1 className="text-2xl font-black text-[#1E2723]">{selectedArtisan}</h1>
          <p className="text-xs font-semibold text-[#66736D] mt-0.5">
            Traditional Master Craftsman
          </p>

          <div className="flex items-center gap-3 mt-2 text-xs font-bold text-[#F0A600]">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-[#F0A600]" />
              <span>4.8 (120 reviews)</span>
            </div>
            <span className="text-gray-300">•</span>
            <div className="flex items-center gap-1 text-[#66736D]">
              <MapPin className="w-3.5 h-3.5" />
              <span>{city}</span>
            </div>
          </div>
        </div>

        {/* Heritage Story Box */}
        <div className="bg-[#E9F7F0] rounded-2xl p-4 border border-[#0B8F56]/20 mb-6">
          <div className="flex items-center gap-2 mb-2 text-[#006B43]">
            <Award className="w-4 h-4" />
            <h3 className="font-extrabold text-xs uppercase tracking-wider">Artisan Heritage</h3>
          </div>
          <p className="text-xs text-[#1E2723]/90 leading-relaxed font-medium">
            We are a multigenerational family of artisans dedicated to creating authentic handmade
            goods. Every product is shaped with patience, preserving ancestral techniques while
            supporting local self-reliance and community heritage.
          </p>
        </div>

        {/* Our Products Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-black text-lg text-[#1E2723]">Our Handcrafted Catalog</h3>
            <span className="text-xs font-bold text-[#66736D]">
              {artisanProducts.length} items
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {artisanProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
