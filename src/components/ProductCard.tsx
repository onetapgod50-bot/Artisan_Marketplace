import React, { useState } from 'react';
import { Heart, ShoppingBag, Image as ImageIcon } from 'lucide-react';
import { Product } from '../types';
import { PriceRating } from './PriceRating';
import { useApp } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
  onTap?: () => void;
  dense?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onTap, dense = false }) => {
  const { addToCart, toggleWishlist, isInWishlist, setSelectedProduct } = useApp();
  const [imageError, setImageError] = useState(false);
  const isFavorited = isInWishlist(product.id);

  const handleCardClick = () => {
    if (onTap) {
      onTap();
    } else {
      setSelectedProduct(product);
    }
  };

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={handleCardClick}
      className="group bg-white rounded-2xl border border-[#E4E8E6] p-2.5 flex flex-col justify-between cursor-pointer transition-all duration-200 hover:shadow-md hover:border-[#0B8F56]/40 relative"
    >
      <div>
        {/* Image Container */}
        <div className="relative w-full rounded-xl overflow-hidden bg-[#F0F4F2] aspect-square mb-2.5">
          {imageError ? (
            <div className="w-full h-full flex flex-col items-center justify-center text-[#8A9790] gap-1">
              <ImageIcon className="w-8 h-8 stroke-[1.5]" />
              <span className="text-[10px] font-medium">Handmade Craft</span>
            </div>
          ) : (
            <img
              src={product.imageUrl}
              alt={product.name}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          )}

          {/* Wishlist Heart button */}
          <button
            id={`wishlist-btn-${product.id}`}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-xs transition-colors hover:bg-white"
            title={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isFavorited
                  ? 'fill-[#D32F2F] text-[#D32F2F]'
                  : 'text-[#66736D] hover:text-[#D32F2F]'
              }`}
            />
          </button>
        </div>

        {/* Product Details */}
        <h3
          title={product.name}
          className="font-bold text-[13.5px] text-[#1E2723] leading-snug truncate"
        >
          {product.name}
        </h3>
        <p className="text-[11px] text-[#66736D] truncate mt-0.5 mb-1.5">
          By {product.artisan}
        </p>

        {/* Price & Rating */}
        <div className="mb-2">
          <PriceRating price={product.price} rating={product.rating} compact={dense} />
        </div>
      </div>

      {/* Add to Cart button */}
      {!dense && (
        <button
          id={`add-cart-btn-${product.id}`}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
          className="w-full py-1.5 px-2 bg-[#0B8F56] hover:bg-[#006B43] active:scale-[0.98] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Add to Cart</span>
        </button>
      )}
    </div>
  );
};
