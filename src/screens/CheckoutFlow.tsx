import React, { useState } from 'react';
import {
  ArrowLeft,
  MapPin,
  Truck,
  CreditCard,
  CheckCircle,
  ShieldCheck,
  Check,
  ShoppingBag,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CheckoutFlow: React.FC = () => {
  const {
    checkoutStep,
    setCheckoutStep,
    cartProducts,
    subtotal,
    shipping,
    total,
    placeOrder,
    latestOrderId,
    setActiveTab,
    setActiveTrackingOrderId,
  } = useApp();

  const [address, setAddress] = useState(
    'John Doe\n123, Anna Nagar\nChennai – 600040, Tamil Nadu\nPhone: +91 98765 43210'
  );
  const [deliveryMethod, setDeliveryMethod] = useState('Standard Delivery (3-5 days)');
  const [deliveryExtra, setDeliveryExtra] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('UPI (Google Pay, PhonePe, Paytm)');

  if (checkoutStep === 'idle') return null;

  // Step 4: Success Screen
  if (checkoutStep === 'success') {
    return (
      <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-[#E9F7F0] border-2 border-[#0B8F56] flex items-center justify-center mb-5 animate-bounce">
          <Check className="w-10 h-10 text-[#0B8F56] stroke-[3]" />
        </div>

        <h2 className="text-2xl font-black text-[#1E2723] tracking-tight mb-1">
          Order Placed Successfully!
        </h2>
        <p className="text-xs font-semibold text-[#0B8F56] bg-[#E9F7F0] px-3 py-1 rounded-full mb-3 inline-block">
          Order ID: #{latestOrderId}
        </p>

        <p className="text-xs text-[#66736D] max-w-xs leading-relaxed mb-6">
          Thank you for supporting our traditional artisans! Your handmade order has been received
          and the craftsmen are preparing your products.
        </p>

        <div className="w-full max-w-xs space-y-2.5">
          <button
            type="button"
            onClick={() => {
              setCheckoutStep('idle');
              setActiveTrackingOrderId(latestOrderId);
              setActiveTab(3); // Switch to Orders tab
            }}
            className="w-full py-3 bg-[#0B8F56] hover:bg-[#006B43] text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
          >
            Track My Order
          </button>

          <button
            type="button"
            onClick={() => {
              setCheckoutStep('idle');
              setActiveTab(0); // Switch to Home
            }}
            className="w-full py-3 border border-[#E4E8E6] text-[#1E2723] hover:bg-gray-50 font-bold text-xs rounded-xl transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const finalShipping = shipping + deliveryExtra;
  const finalTotal = subtotal + finalShipping;

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
      {/* Top Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-[#E4E8E6] px-4 py-2.5 flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            if (checkoutStep === 'checkout') setCheckoutStep('idle');
            else if (checkoutStep === 'payment') setCheckoutStep('checkout');
            else if (checkoutStep === 'review') setCheckoutStep('payment');
          }}
          className="p-1.5 -ml-1 text-[#1E2723] hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="font-bold text-sm text-[#1E2723]">
          {checkoutStep === 'checkout'
            ? 'Checkout: Shipping'
            : checkoutStep === 'payment'
            ? 'Checkout: Payment'
            : 'Checkout: Order Review'}
        </span>
        <div className="w-8" />
      </div>

      {/* Stepper indicator */}
      <div className="bg-[#F7F9F8] border-b border-[#E4E8E6] py-3 px-6">
        <div className="max-w-xs mx-auto flex items-center justify-between relative">
          <div
            className={`flex flex-col items-center gap-1 z-10 ${
              checkoutStep === 'checkout' || checkoutStep === 'payment' || checkoutStep === 'review'
                ? 'text-[#0B8F56]'
                : 'text-gray-400'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                checkoutStep === 'checkout' || checkoutStep === 'payment' || checkoutStep === 'review'
                  ? 'bg-[#0B8F56] text-white'
                  : 'bg-gray-200'
              }`}
            >
              1
            </div>
            <span className="text-[10px] font-bold">Address</span>
          </div>

          <div
            className={`h-0.5 flex-1 mx-2 ${
              checkoutStep === 'payment' || checkoutStep === 'review'
                ? 'bg-[#0B8F56]'
                : 'bg-gray-200'
            }`}
          />

          <div
            className={`flex flex-col items-center gap-1 z-10 ${
              checkoutStep === 'payment' || checkoutStep === 'review'
                ? 'text-[#0B8F56]'
                : 'text-gray-400'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                checkoutStep === 'payment' || checkoutStep === 'review'
                  ? 'bg-[#0B8F56] text-white'
                  : 'bg-gray-200'
              }`}
            >
              2
            </div>
            <span className="text-[10px] font-bold">Payment</span>
          </div>

          <div
            className={`h-0.5 flex-1 mx-2 ${
              checkoutStep === 'review' ? 'bg-[#0B8F56]' : 'bg-gray-200'
            }`}
          />

          <div
            className={`flex flex-col items-center gap-1 z-10 ${
              checkoutStep === 'review' ? 'text-[#0B8F56]' : 'text-gray-400'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                checkoutStep === 'review' ? 'bg-[#0B8F56] text-white' : 'bg-gray-200'
              }`}
            >
              3
            </div>
            <span className="text-[10px] font-bold">Review</span>
          </div>
        </div>
      </div>

      {/* Step Contents */}
      <div className="max-w-md mx-auto p-4 pb-28">
        {/* STEP 1: Address & Delivery */}
        {checkoutStep === 'checkout' && (
          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-sm text-[#1E2723] flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#0B8F56]" />
                  <span>Delivery Address</span>
                </h3>
              </div>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={4}
                className="w-full p-3 bg-[#F7F9F8] border border-[#E4E8E6] rounded-xl text-xs font-medium focus:border-[#0B8F56] focus:outline-hidden"
              />
            </div>

            <div>
              <h3 className="font-bold text-sm text-[#1E2723] flex items-center gap-1.5 mb-2.5">
                <Truck className="w-4 h-4 text-[#0B8F56]" />
                <span>Delivery Method</span>
              </h3>

              <div className="space-y-2">
                {[
                  { title: 'Standard Delivery (3-5 days)', cost: 0, desc: 'Free standard delivery' },
                  { title: 'Express Delivery (1-2 days)', cost: 100, desc: 'Priority artisan dispatch' },
                  { title: 'Same Day Delivery (Chennai only)', cost: 200, desc: 'Guaranteed evening delivery' },
                ].map((m) => (
                  <label
                    key={m.title}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      deliveryMethod === m.title
                        ? 'border-[#0B8F56] bg-[#E9F7F0]/40'
                        : 'border-[#E4E8E6] bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        checked={deliveryMethod === m.title}
                        onChange={() => {
                          setDeliveryMethod(m.title);
                          setDeliveryExtra(m.cost);
                        }}
                        className="accent-[#0B8F56]"
                      />
                      <div>
                        <p className="text-xs font-bold text-[#1E2723]">{m.title}</p>
                        <p className="text-[11px] text-[#66736D]">{m.desc}</p>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold text-[#0B8F56]">
                      {m.cost === 0 ? 'FREE' : `+₹${m.cost}`}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setCheckoutStep('payment')}
              className="w-full mt-4 py-3 bg-[#0B8F56] hover:bg-[#006B43] text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
            >
              Continue to Payment
            </button>
          </div>
        )}

        {/* STEP 2: Payment */}
        {checkoutStep === 'payment' && (
          <div className="space-y-5">
            <div>
              <h3 className="font-bold text-sm text-[#1E2723] flex items-center gap-1.5 mb-3">
                <CreditCard className="w-4 h-4 text-[#0B8F56]" />
                <span>Select Payment Method</span>
              </h3>

              <div className="space-y-2.5">
                {[
                  { id: 'UPI (Google Pay, PhonePe, Paytm)', label: 'UPI / QR Code', icon: '📱', desc: 'Fast & Instant UPI payments' },
                  { id: 'Credit / Debit Card', label: 'Credit or Debit Card', icon: '💳', desc: 'Visa, MasterCard, RuPay' },
                  { id: 'Net Banking', label: 'Net Banking', icon: '🏦', desc: 'All major Indian banks' },
                  { id: 'Cash on Delivery', label: 'Cash on Delivery', icon: '💵', desc: 'Pay with cash upon receipt' },
                ].map((p) => (
                  <label
                    key={p.id}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === p.id
                        ? 'border-[#0B8F56] bg-[#E9F7F0]/40'
                        : 'border-[#E4E8E6] bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === p.id}
                        onChange={() => setPaymentMethod(p.id)}
                        className="accent-[#0B8F56]"
                      />
                      <span className="text-lg">{p.icon}</span>
                      <div>
                        <p className="text-xs font-bold text-[#1E2723]">{p.label}</p>
                        <p className="text-[11px] text-[#66736D]">{p.desc}</p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="p-3 bg-[#E9F7F0] rounded-xl flex items-center gap-2.5 border border-[#0B8F56]/20">
              <ShieldCheck className="w-5 h-5 text-[#0B8F56] shrink-0" />
              <p className="text-xs font-semibold text-[#006B43]">
                Your transactions are encrypted with 256-bit bank grade security.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setCheckoutStep('review')}
              className="w-full mt-4 py-3 bg-[#0B8F56] hover:bg-[#006B43] text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
            >
              Continue to Review
            </button>
          </div>
        )}

        {/* STEP 3: Order Review */}
        {checkoutStep === 'review' && (
          <div className="space-y-4">
            {/* Delivery address summary */}
            <div className="bg-[#F7F9F8] border border-[#E4E8E6] rounded-xl p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-extrabold text-[#1E2723]">Shipping Details</span>
                <button
                  type="button"
                  onClick={() => setCheckoutStep('checkout')}
                  className="text-[11px] font-bold text-[#0B8F56] hover:underline"
                >
                  Edit
                </button>
              </div>
              <p className="text-xs text-[#66736D] whitespace-pre-line leading-relaxed">{address}</p>
              <p className="text-xs font-semibold text-[#0B8F56] mt-1.5">Method: {deliveryMethod}</p>
            </div>

            {/* Payment method summary */}
            <div className="bg-[#F7F9F8] border border-[#E4E8E6] rounded-xl p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-extrabold text-[#1E2723]">Payment Method</span>
                <button
                  type="button"
                  onClick={() => setCheckoutStep('payment')}
                  className="text-[11px] font-bold text-[#0B8F56] hover:underline"
                >
                  Edit
                </button>
              </div>
              <p className="text-xs text-[#66736D]">{paymentMethod}</p>
            </div>

            {/* Items summary */}
            <div className="bg-white border border-[#E4E8E6] rounded-xl p-3">
              <span className="text-xs font-extrabold text-[#1E2723] block mb-2">
                Order Items ({cartProducts.length})
              </span>
              <div className="space-y-2">
                {cartProducts.map(({ product, quantity }) => (
                  <div key={product.id} className="flex justify-between text-xs">
                    <span className="text-[#66736D] truncate max-w-[210px]">
                      {product.name} × {quantity}
                    </span>
                    <span className="font-bold text-[#1E2723]">
                      ₹{(product.price * quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price breakdown */}
            <div className="bg-white border border-[#E4E8E6] rounded-xl p-3 space-y-1.5 text-xs">
              <div className="flex justify-between text-[#66736D]">
                <span>Items Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[#66736D]">
                <span>Shipping & Delivery</span>
                <span>{finalShipping === 0 ? 'FREE' : `₹${finalShipping}`}</span>
              </div>
              <div className="border-t border-[#E4E8E6] pt-1.5 mt-1 flex justify-between font-extrabold text-sm text-[#1E2723]">
                <span>Final Total</span>
                <span className="text-[#0B8F56]">₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => placeOrder(deliveryMethod, address, paymentMethod)}
              className="w-full mt-2 py-3.5 bg-[#0B8F56] hover:bg-[#006B43] text-white font-black text-sm rounded-xl shadow-sm transition-all"
            >
              Place Order (₹{finalTotal.toLocaleString('en-IN')})
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
