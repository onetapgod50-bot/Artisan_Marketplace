import React from 'react';
import { Heart, X, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';

export const WishlistModal: React.FC = () => {
  const { isWishlistOpen, setIsWishlistOpen, wishlist, products, toggleWishlist, addToCart } =
    useApp();

  if (!isWishlistOpen) return null;

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Header */}
      <div className="border-b border-[#E4E8E6] p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsWishlistOpen(false)}
            className="p-1.5 text-[#1E2723] hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="font-bold text-base text-[#1E2723]">My Wishlist</h2>
            <p className="text-[11px] text-[#66736D]">{wishlistProducts.length} saved crafts</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsWishlistOpen(false)}
          className="p-1.5 rounded-full text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 max-w-md mx-auto w-full">
        {wishlistProducts.length === 0 ? (
          <div className="pt-20 text-center flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-3">
              <Heart className="w-10 h-10 text-[#D32F2F] stroke-[1.5]" />
            </div>
            <h3 className="font-bold text-base text-[#1E2723]">Your Wishlist is Empty</h3>
            <p className="text-xs text-[#66736D] mt-1 max-w-xs">
              Tap the heart icon on any craft to save items you love for later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {wishlistProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
