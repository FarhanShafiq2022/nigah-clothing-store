import React from 'react';
import { Sparkles } from 'lucide-react';
import { useAtelier } from '../context/AtelierContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useAtelier();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in pointer-events-none">
      <div className="flex items-center space-x-3 px-5 py-3.5 bg-[#121212] border border-[#C9A24D] shadow-[0_0_25px_rgba(201,162,77,0.25)] text-[#F5F2EA]">
        <Sparkles className="w-4 h-4 text-[#C9A24D] shrink-0" />
        <span className="text-xs tracking-wider font-light">{toastMessage}</span>
      </div>
    </div>
  );
};
