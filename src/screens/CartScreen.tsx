import React from 'react';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CartScreen: React.FC = () => {
  const {
    cartProducts,
    addToCart,
    removeOneFromCart,
    removeFromCart,
    subtotal,
    shipping,
    total,
    setActiveTab,
    setCheckoutStep,
    clearCart,
  } = useApp();

  if (cartProducts.length === 0) {
    return (
      <div className="pb-24 pt-12 px-6 max-w-md mx-auto flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 rounded-full bg-[#E9F7F0] flex items-center justify-center mb-4">
          <ShoppingBag className="w-12 h-12 text-[#0B8F56] stroke-[1.5]" />
        </div>
        <h2 className="text-xl font-black text-[#1E2723]">Your cart is empty</h2>
        <p className="text-xs text-[#66736D] mt-1 max-w-xs leading-relaxed">
          Add unique handmade products directly from local artisans to get started.
        </p>
        <button
          type="button"
          onClick={() => setActiveTab(0)}
          className="mt-6 px-6 py-2.5 bg-[#0B8F56] hover:bg-[#006B43] text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
        >
          Explore Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="pb-28 pt-3 px-4 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-black text-xl text-[#1E2723]">My Shopping Cart</h2>
          <p className="text-xs text-[#66736D]">{cartProducts.length} item kinds</p>
        </div>
        <button
          type="button"
          onClick={clearCart}
          className="text-xs font-bold text-[#D32F2F] hover:underline"
        >
          Clear All
        </button>
      </div>

      {/* Cart Items List */}
      <div className="space-y-3 mb-6">
        {cartProducts.map(({ product, quantity }) => (
          <div
            key={product.id}
            className="bg-white border border-[#E4E8E6] rounded-2xl p-3 flex gap-3 shadow-2xs relative"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-20 h-20 rounded-xl object-cover bg-[#F0F4F2] shrink-0"
            />
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-xs text-[#1E2723] leading-snug line-clamp-2">
                    {product.name}
                  </h3>
                  <button
                    type="button"
                    onClick={() => removeFromCart(product.id)}
                    className="text-[#66736D] hover:text-[#D32F2F] p-1 -mr-1"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[11px] text-[#66736D] mt-0.5">By {product.artisan}</p>
              </div>

              <div className="flex items-center justify-between mt-2">
                <span className="font-extrabold text-sm text-[#0B8F56]">
                  ₹{(product.price * quantity).toLocaleString('en-IN')}
                </span>

                {/* Stepper */}
                <div className="flex items-center gap-2 border border-[#E4E8E6] rounded-lg p-0.5 bg-[#F7F9F8]">
                  <button
                    type="button"
                    onClick={() => removeOneFromCart(product)}
                    className="w-6 h-6 rounded flex items-center justify-center text-[#1E2723] hover:bg-white"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-extrabold px-1 min-w-[16px] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => addToCart(product, 1)}
                    className="w-6 h-6 rounded flex items-center justify-center text-[#1E2723] hover:bg-white"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Free shipping banner if under 1500 */}
      {subtotal < 1500 && (
        <div className="mb-4 p-2.5 bg-[#E9F7F0] rounded-xl text-center border border-[#0B8F56]/20">
          <p className="text-xs font-bold text-[#006B43]">
            Add ₹{(1500 - subtotal).toLocaleString('en-IN')} more to get FREE Delivery!
          </p>
        </div>
      )}

      {/* Order Summary */}
      <div className="bg-white border border-[#E4E8E6] rounded-2xl p-4 shadow-2xs mb-6">
        <h3 className="font-extrabold text-xs uppercase tracking-wider text-[#1E2723] mb-3">
          Order Summary
        </h3>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between text-[#66736D]">
            <span>Items Subtotal</span>
            <span className="font-semibold text-[#1E2723]">₹{subtotal.toLocaleString('en-IN')}</span>
          </div>

          <div className="flex justify-between text-[#66736D]">
            <span>Shipping & Delivery</span>
            <span className="font-semibold text-[#1E2723]">
              {shipping === 0 ? <span className="text-[#0B8F56] font-bold">FREE</span> : `₹${shipping}`}
            </span>
          </div>

          <div className="border-t border-[#E4E8E6] pt-2 mt-2 flex justify-between text-sm font-extrabold text-[#1E2723]">
            <span>Total Payable</span>
            <span className="text-[#0B8F56] text-base">₹{total.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* Proceed Button */}
      <button
        type="button"
        onClick={() => setCheckoutStep('checkout')}
        className="w-full py-3.5 bg-[#0B8F56] hover:bg-[#006B43] text-white font-black text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
      >
        <span>Proceed to Checkout</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-[#66736D]">
        <ShieldCheck className="w-4 h-4 text-[#0B8F56]" />
        <span>100% Secure Checkout with Artisan Guarantee</span>
      </div>
    </div>
  );
};
