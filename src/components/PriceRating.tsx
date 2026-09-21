import React from 'react';
import { Star } from 'lucide-react';

interface PriceRatingProps {
  price: number;
  rating: number;
  compact?: boolean;
}

export const PriceRating: React.FC<PriceRatingProps> = ({ price, rating, compact = false }) => {
  return (
    <div className="flex items-center justify-between w-full">
      <span
        className={`font-extrabold text-[#0B8F56] ${
          compact ? 'text-sm' : 'text-base'
        }`}
      >
        ₹{price.toLocaleString('en-IN')}
      </span>
      <div className="flex items-center gap-1">
        <Star className="w-3.5 h-3.5 fill-[#F0A600] text-[#F0A600]" />
        <span
          className={`font-semibold text-[#1E2723] ${
            compact ? 'text-xs' : 'text-xs sm:text-sm'
          }`}
        >
          {rating.toFixed(1)}
        </span>
      </div>
    </div>
  );
};
