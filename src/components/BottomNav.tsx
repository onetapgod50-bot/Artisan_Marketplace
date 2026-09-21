import React from 'react';
import { Home, Grid, ShoppingBag, Receipt, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, itemCount } = useApp();

  const items = [
    { id: 0, label: 'Home', icon: Home },
    { id: 1, label: 'Categories', icon: Grid },
    { id: 2, label: 'Cart', icon: ShoppingBag, badge: itemCount },
    { id: 3, label: 'Orders', icon: Receipt },
    { id: 4, label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-[#E4E8E6] py-1 px-2 safe-area-inset-bottom">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const isSelected = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-tab-${item.label.toLowerCase()}`}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all relative ${
                isSelected ? 'text-[#0B8F56]' : 'text-[#66736D] hover:text-[#1E2723]'
              }`}
            >
              <div
                className={`p-1 rounded-xl transition-colors relative ${
                  isSelected ? 'bg-[#E9F7F0]' : 'bg-transparent'
                }`}
              >
                <Icon className={`w-5 h-5 ${isSelected ? 'stroke-[2.3]' : 'stroke-[1.8]'}`} />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 bg-[#0B8F56] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-0.5 ${isSelected ? 'font-extrabold' : 'font-semibold'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
