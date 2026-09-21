import React, { useEffect } from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';

interface SplashScreenProps {
  onDismiss: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 2200);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col justify-between items-center select-none">
      <div />

      {/* Center Branding */}
      <div className="flex flex-col items-center text-center px-6">
        <div className="w-28 h-28 rounded-full bg-[#E9F7F0] flex items-center justify-center mb-6 shadow-xs animate-pulse">
          <ShoppingBag className="w-16 h-16 text-[#0B8F56] stroke-[1.8]" />
        </div>
        <h1 className="text-3xl font-black text-[#006B43] tracking-tight mb-2">
          Artisan Connect
        </h1>
        <p className="text-sm font-semibold text-[#66736D] tracking-wide">
          Handmade. Heartmade.
        </p>

        <button
          onClick={onDismiss}
          type="button"
          className="mt-8 flex items-center gap-2 px-5 py-2.5 bg-[#0B8F56] text-white text-xs font-bold rounded-full hover:bg-[#006B43] transition-all shadow-sm"
        >
          <span>Get Started</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Mission Card */}
      <div className="w-full bg-[#E9F7F0] py-6 px-4 text-center">
        <p className="font-bold text-[#006B43] text-sm mb-1">
          Support Artisans
        </p>
        <p className="text-xs text-[#66736D]">
          Build a Better Tomorrow
        </p>
      </div>
    </div>
  );
};
