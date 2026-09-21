import React from 'react';
import { Package, ChevronRight, Clock, Truck, CheckCircle2, XCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Order } from '../types';

export const OrdersScreen: React.FC = () => {
  const { orders, setActiveTrackingOrderId, setActiveTab } = useApp();

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'Processing':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>Processing</span>
          </span>
        );
      case 'Shipped':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-800 flex items-center gap-1">
            <Truck className="w-3 h-3" />
            <span>Shipped</span>
          </span>
        );
      case 'Delivered':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-green-100 text-green-800 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Delivered</span>
          </span>
        );
      case 'Cancelled':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-red-100 text-red-800 flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            <span>Cancelled</span>
          </span>
        );
    }
  };

  if (orders.length === 0) {
    return (
      <div className="pb-24 pt-16 px-6 max-w-md mx-auto text-center flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-[#E9F7F0] flex items-center justify-center mb-4">
          <Package className="w-10 h-10 text-[#0B8F56]" />
        </div>
        <h3 className="font-bold text-lg text-[#1E2723]">No orders placed yet</h3>
        <p className="text-xs text-[#66736D] mt-1">Discover handcrafted goods from local artisans.</p>
        <button
          type="button"
          onClick={() => setActiveTab(0)}
          className="mt-5 px-5 py-2.5 bg-[#0B8F56] text-white text-xs font-bold rounded-xl"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="pb-24 pt-3 px-4 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-black text-xl text-[#1E2723]">My Orders</h2>
          <p className="text-xs text-[#66736D]">{orders.length} order history entries</p>
        </div>
      </div>

      <div className="space-y-3">
        {orders.map((order) => {
          const totalItems = Object.values(order.quantities).reduce((s, q) => s + q, 0);

          return (
            <div
              key={order.id}
              onClick={() => setActiveTrackingOrderId(order.id)}
              className="bg-white border border-[#E4E8E6] rounded-2xl p-3.5 shadow-2xs hover:border-[#0B8F56]/40 cursor-pointer transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-extrabold text-xs text-[#1E2723]">
                  Order #{order.id}
                </span>
                {getStatusBadge(order.status)}
              </div>

              <p className="text-[11px] text-[#66736D] mb-3">
                Placed on {order.date}
              </p>

              {/* Items preview */}
              <div className="flex items-center gap-2 mb-3">
                {order.products.slice(0, 3).map((p) => (
                  <img
                    key={p.id}
                    src={p.imageUrl}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-lg object-cover bg-gray-100 border border-[#E4E8E6]"
                  />
                ))}
                {order.products.length > 3 && (
                  <div className="w-12 h-12 rounded-lg bg-[#E9F7F0] border border-[#0B8F56]/20 flex items-center justify-center text-[10px] font-bold text-[#006B43]">
                    +{order.products.length - 3}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#E4E8E6] text-xs">
                <span className="text-[#66736D]">
                  {totalItems} item{totalItems > 1 ? 's' : ''} •{' '}
                  <span className="font-extrabold text-[#0B8F56]">
                    ₹{order.total.toLocaleString('en-IN')}
                  </span>
                </span>
                <span className="font-bold text-[#0B8F56] flex items-center text-[11px]">
                  Track Details <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
