import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 bg-[#1E2723] text-white text-xs font-semibold rounded-full shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
      <CheckCircle className="w-4 h-4 text-[#0B8F56]" />
      <span>{toastMessage}</span>
    </div>
  );
};
