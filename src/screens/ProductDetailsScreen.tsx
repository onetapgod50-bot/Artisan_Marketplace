import React, { useState } from 'react';
import {
  ArrowLeft,
  Heart,
  Share2,
  ShieldCheck,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  MapPin,
  CheckCircle2,
  Star,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PriceRating } from '../components/PriceRating';

export const ProductDetailsScreen: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    setSelectedArtisan,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setCheckoutStep,
    showToast,
    getReviewsForProduct,
    addReview,
    user,
  } = useApp();

  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewerName, setReviewerName] = useState(user?.name || 'Artisan Supporter');
  const [reviewComment, setReviewComment] = useState('');

  if (!selectedProduct) return null;

  const isFavorited = isInWishlist(selectedProduct.id);
  const productReviews = getReviewsForProduct(selectedProduct.id);

  const handleSubmitReview = () => {
    if (!reviewComment.trim()) return;
    addReview({
      productId: selectedProduct.id,
      userName: reviewerName.trim() || 'Verified Buyer',
      rating: reviewRating,
      comment: reviewComment.trim(),
      verifiedBuyer: true,
      userCity: selectedProduct.city || 'India',
    });
    setReviewComment('');
    setShowReviewForm(false);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: selectedProduct.name,
          text: `Check out ${selectedProduct.name} by ${selectedProduct.artisan} on Artisan Connect!`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      showToast('Product link copied to clipboard');
    }
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity);
    setSelectedProduct(null);
    setCheckoutStep('checkout');
  };

  return (
    <div className="fixed inset-0 z-40 bg-white overflow-y-auto">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-xs border-b border-[#E4E8E6] px-4 py-2.5 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setSelectedProduct(null)}
          className="p-1.5 -ml-1 text-[#1E2723] hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="font-bold text-sm text-[#1E2723]">Product Details</span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => toggleWishlist(selectedProduct.id)}
            className="p-2 text-[#1E2723] hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Wishlist"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorited ? 'fill-[#D32F2F] text-[#D32F2F]' : 'text-[#1E2723]'
              }`}
            />
          </button>
          <button
            type="button"
            onClick={handleShare}
            className="p-2 text-[#1E2723] hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Share"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="max-w-md mx-auto p-4 pb-28">
        {/* Product Image */}
        <div className="w-full aspect-square sm:aspect-4/3 rounded-2xl overflow-hidden bg-[#F0F4F2] border border-[#E4E8E6] mb-4 relative shadow-xs">
          {imageError ? (
            <div className="w-full h-full flex flex-col items-center justify-center text-[#8A9790] gap-2">
              <Sparkles className="w-12 h-12 stroke-[1.5]" />
              <span className="text-xs font-semibold">Artisan Handcrafted Masterpiece</span>
            </div>
          ) : (
            <img
              src={selectedProduct.imageUrl}
              alt={selectedProduct.name}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover"
            />
          )}
          <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold rounded-full">
            {selectedProduct.category}
          </span>
        </div>

        {/* Product Title */}
        <h1 className="text-2xl font-black text-[#1E2723] leading-snug tracking-tight mb-1">
          {selectedProduct.name}
        </h1>

        {/* Artisan Link */}
        <button
          type="button"
          onClick={() => {
            setSelectedArtisan(selectedProduct.artisan);
            setSelectedProduct(null);
          }}
          className="flex items-center gap-1.5 text-xs font-bold text-[#0B8F56] hover:underline mb-3"
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>
            By {selectedProduct.artisan} · {selectedProduct.city}
          </span>
        </button>

        {/* Price & Rating */}
        <div className="bg-[#F7F9F8] rounded-xl p-3 border border-[#E4E8E6] mb-4">
          <PriceRating price={selectedProduct.price} rating={selectedProduct.rating} />
          <p className="text-[11px] text-[#66736D] mt-1 font-medium">
            {selectedProduct.reviews} customer reviews · Verified artisan guarantee
          </p>
        </div>

        {/* Description */}
        <div className="mb-4">
          <h3 className="text-xs font-extrabold text-[#1E2723] uppercase tracking-wider mb-1.5">
            About this Craft
          </h3>
          <p className="text-sm text-[#1E2723]/90 leading-relaxed font-normal">
            {selectedProduct.description}
          </p>
        </div>

        {/* Tags */}
        <div className="mb-5 flex flex-wrap gap-1.5">
          {selectedProduct.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 bg-[#E9F7F0] text-[#006B43] text-xs font-semibold rounded-lg"
            >
              #{tag}
            </span>
          ))}
          {selectedProduct.materials && selectedProduct.materials.length > 0 && (
            <span className="px-2.5 py-1 bg-gray-100 text-[#66736D] text-xs font-semibold rounded-lg">
              🌱 {selectedProduct.materials.join(', ')}
            </span>
          )}
        </div>

        {/* Quality Guarantee Box */}
        <div className="p-3.5 bg-[#E9F7F0] border border-[#0B8F56]/20 rounded-2xl flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-[#0B8F56] flex items-center justify-center text-white shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <p className="text-xs font-bold text-[#006B43] leading-snug">
            Handmade • Supports local marginalized artisans • Quality checked
          </p>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between p-3 border border-[#E4E8E6] rounded-xl mb-6">
          <span className="text-xs font-extrabold text-[#1E2723]">Quantity</span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
              className="w-7 h-7 rounded-lg border border-[#E4E8E6] flex items-center justify-center text-[#1E2723] hover:bg-gray-100"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="font-extrabold text-sm w-5 text-center">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="w-7 h-7 rounded-lg border border-[#E4E8E6] flex items-center justify-center text-[#1E2723] hover:bg-gray-100"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Customer Reviews & Feedback Section */}
        <div className="border-t border-[#E4E8E6] pt-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-extrabold text-[#1E2723] flex items-center gap-1.5">
              <span>Customer Reviews</span>
              <span className="px-2 py-0.5 bg-[#F0F4F2] text-[#0B8F56] text-[10px] font-bold rounded-full">
                {productReviews.length}
              </span>
            </h3>
            <button
              type="button"
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="text-xs font-bold text-[#0B8F56] hover:underline"
            >
              {showReviewForm ? 'Cancel' : '+ Write a Review'}
            </button>
          </div>

          {/* Write a Review Form */}
          {showReviewForm && (
            <div className="bg-[#F7F9F8] border border-[#E4E8E6] rounded-2xl p-4 mb-4">
              <h4 className="text-xs font-extrabold text-[#1E2723] mb-2">Share Your Experience</h4>
              <div className="mb-3">
                <label className="block text-[11px] font-bold text-[#66736D] mb-1">Your Rating</label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="p-1 focus:outline-hidden"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= reviewRating
                            ? 'text-[#F5A623] fill-[#F5A623]'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-[#1E2723] ml-2">{reviewRating} out of 5</span>
                </div>
              </div>
              <div className="mb-3">
                <label className="block text-[11px] font-bold text-[#66736D] mb-1">Your Name</label>
                <input
                  type="text"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="w-full px-3 py-2 text-xs bg-white border border-[#E4E8E6] rounded-xl focus:outline-hidden focus:border-[#0B8F56]"
                />
              </div>
              <div className="mb-3">
                <label className="block text-[11px] font-bold text-[#66736D] mb-1">Your Review</label>
                <textarea
                  rows={3}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Describe the craft quality, packaging, and artisan authenticity..."
                  className="w-full px-3 py-2 text-xs bg-white border border-[#E4E8E6] rounded-xl focus:outline-hidden focus:border-[#0B8F56]"
                />
              </div>
              <button
                type="button"
                onClick={handleSubmitReview}
                disabled={!reviewComment.trim()}
                className="w-full py-2.5 bg-[#0B8F56] hover:bg-[#006B43] disabled:opacity-50 text-white font-bold text-xs rounded-xl transition-colors shadow-xs"
              >
                Submit Verified Review
              </button>
            </div>
          )}

          {/* Reviews List */}
          {productReviews.length === 0 ? (
            <div className="text-center py-6 bg-[#F7F9F8] rounded-xl border border-[#E4E8E6]">
              <p className="text-xs text-[#66736D]">No reviews yet for this craft.</p>
              <p className="text-[11px] text-[#0B8F56] font-bold mt-1">Be the first to review!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {productReviews.map((rev) => (
                <div key={rev.id} className="p-3 bg-white border border-[#E4E8E6] rounded-xl">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-extrabold text-[#1E2723]">{rev.userName}</span>
                      {rev.verifiedBuyer && (
                        <span className="px-1.5 py-0.2 bg-[#E9F7F0] text-[#006B43] text-[9px] font-bold rounded-sm">
                          Verified Buyer
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-[#8A9790]">{rev.date}</span>
                  </div>
                  <div className="flex items-center gap-1 mb-1.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < rev.rating
                            ? 'text-[#F5A623] fill-[#F5A623]'
                            : 'text-gray-200'
                        }`}
                      />
                    ))}
                    {rev.userCity && (
                      <span className="text-[10px] text-[#8A9790] ml-1">from {rev.userCity}</span>
                    )}
                  </div>
                  <p className="text-xs text-[#1E2723]/90 leading-relaxed font-normal">
                    {rev.comment}
                  </p>
                  {rev.artisanReply && (
                    <div className="mt-2.5 p-2 bg-[#F0F7F4] border-l-2 border-[#0B8F56] rounded-r-lg">
                      <span className="text-[10px] font-bold text-[#006B43] block mb-0.5">
                        Artisan Response:
                      </span>
                      <p className="text-[11px] text-[#1E2723]/80 italic">
                        "{rev.artisanReply}"
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-[#E4E8E6] p-3 safe-area-inset-bottom">
        <div className="max-w-md mx-auto flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              addToCart(selectedProduct, quantity);
              setSelectedProduct(null);
            }}
            className="flex-1 py-3 border-2 border-[#0B8F56] text-[#0B8F56] hover:bg-[#E9F7F0] font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
          <button
            type="button"
            onClick={handleBuyNow}
            className="flex-1 py-3 bg-[#0B8F56] hover:bg-[#006B43] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
