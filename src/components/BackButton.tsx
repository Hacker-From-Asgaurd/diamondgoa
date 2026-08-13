import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  onClick: () => void;
  label?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ onClick, label = 'BACK' }) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#FFE600] hover:text-[#FF007A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFE600] rounded-lg px-2 py-1 -ml-2 group"
      aria-label={label}
    >
      <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
      <span className="tracking-widest uppercase">{label}</span>
    </button>
  );
};
