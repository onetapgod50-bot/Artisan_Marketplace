import React from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  Truck,
  Package,
  Clock,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TrackingScreen: React.FC = () => {
  const { activeTrackingOrderId, setActiveTrackingOrderId, orders } = useApp();

  if (!activeTrackingOrderId) return null;

  const order = orders.find((o) => o.id === activeTrackingOrderId);
  if (!order) return null;

  // Determine active step index based on status
  let currentStep = 1;
  if (order.status === 'Processing') currentStep = 1;
  else if (order.status === 'Shipped') currentStep = 2;
  else if (order.status === 'Delivered') currentStep = 4;
  else if (order.status === 'Cancelled') currentStep = -1;

  const steps = [
    { title: 'Order Placed', time: 'Received by Artisan Connect' },
    { title: 'Processing & Handcrafting', time: 'Artisans packaging carefully' },
    { title: 'Shipped & In Transit', time: 'Handed over to courier partner' },
    { title: 'Out for Delivery', time: 'Arriving with local courier agent' },
    { title: 'Delivered', time: 'Package handed to recipient' },
  ];

  return (
    <div className="fixed inset-0 z-40 bg-white overflow-y-auto">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-xs border-b border-[#E4E8E6] px-4 py-2.5 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setActiveTrackingOrderId(null)}
          className="p-1.5 -ml-1 text-[#1E2723] hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="text-center">
          <h2 className="font-bold text-sm text-[#1E2723]">Track Order</h2>
          <p className="text-[10px] text-[#66736D] font-mono">#{order.id}</p>
        </div>
        <div className="w-8" />
      </div>

      <div className="max-w-md mx-auto p-4 pb-16 space-y-4">
        {/* Estimated Delivery Card */}
        <div className="bg-[#E9F7F0] border border-[#0B8F56]/20 rounded-2xl p-4">
          <div className="flex items-center gap-2 text-[#006B43] mb-1">
            <Clock className="w-4 h-4" />
            <span className="text-xs font-black uppercase tracking-wide">
              Estimated Delivery
            </span>
          </div>
          <p className="text-lg font-black text-[#1E2723]">
            {order.status === 'Delivered'
              ? 'Delivered on ' + order.date
              : order.status === 'Cancelled'
              ? 'Order was cancelled'
              : 'Expected within 3-4 Business Days'}
          </p>
          <p className="text-xs text-[#66736D] mt-0.5">
            Courier: India Post Artisan Express (Tracking AWB: IND9872630)
          </p>
        </div>

        {/* Timeline */}
        <div className="bg-white border border-[#E4E8E6] rounded-2xl p-4">
          <h3 className="font-extrabold text-xs uppercase tracking-wider text-[#1E2723] mb-4">
            Order Status Journey
          </h3>

          <div className="relative pl-6 space-y-6">
            {/* Vertical connector line */}
            <div className="absolute top-2 bottom-2 left-2.5 w-0.5 bg-gray-200" />

            {steps.map((step, idx) => {
              const isCompleted = currentStep >= idx;
              const isCurrent = currentStep === idx;

              return (
                <div key={step.title} className="relative flex items-start gap-3">
                  {/* Step dot */}
                  <div
                    className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center ${
                      isCompleted
                        ? 'bg-[#0B8F56] text-white'
                        : 'bg-white border-2 border-gray-300 text-transparent'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <Circle className="w-2 h-2" />
                    )}
                  </div>

                  <div>
                    <h4
                      className={`text-xs font-bold leading-tight ${
                        isCompleted ? 'text-[#1E2723]' : 'text-gray-400'
                      }`}
                    >
                      {step.title}
                    </h4>
                    <p className="text-[11px] text-[#66736D] mt-0.5">{step.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white border border-[#E4E8E6] rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2 text-[#1E2723]">
            <MapPin className="w-4 h-4 text-[#0B8F56]" />
            <h3 className="font-extrabold text-xs uppercase tracking-wider">Delivery Address</h3>
          </div>
          <p className="text-xs text-[#66736D] whitespace-pre-line leading-relaxed">
            {order.shippingAddress || 'John Doe\n123, Anna Nagar\nChennai – 600040, Tamil Nadu'}
          </p>
        </div>

        {/* Ordered Items List */}
        <div className="bg-white border border-[#E4E8E6] rounded-2xl p-4">
          <h3 className="font-extrabold text-xs uppercase tracking-wider text-[#1E2723] mb-3">
            Handcrafted Items
          </h3>
          <div className="space-y-2.5">
            {order.products.map((p) => {
              const qty = order.quantities[p.id] || 1;
              return (
                <div key={p.id} className="flex items-center gap-3">
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-xl object-cover bg-gray-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-[#1E2723] truncate">{p.name}</p>
                    <p className="text-[11px] text-[#66736D]">
                      By {p.artisan} • Qty: {qty}
                    </p>
                  </div>
                  <span className="text-xs font-extrabold text-[#0B8F56]">
                    ₹{(p.price * qty).toLocaleString('en-IN')}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
