import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface IdentityFormatCardProps {
  id: 'frame' | 'solo';
  titlePrefix: string;
  titleSuffix: string;
  dimensions: string;
  badgeTag: string;
  description: string;
  isSelected?: boolean;
  onSelect: () => void;
}

export const IdentityFormatCard: React.FC<IdentityFormatCardProps> = ({
  id,
  titlePrefix,
  titleSuffix,
  dimensions,
  badgeTag,
  description,
  isSelected = false,
  onSelect,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect();
    }
  };

  const isPfp = id === 'frame';

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
      aria-label={`Select ${titlePrefix} ${titleSuffix} format (${dimensions})`}
      className={`group relative bg-[#023820] hover:bg-[#023D23] rounded-3xl p-6 sm:p-8 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-[#FFE600] border-2 border-[#FFE600] shadow-xl flex flex-col justify-between h-full ${
        isSelected ? 'ring-4 ring-[#FF007A]' : ''
      }`}
    >
      <div className="flex flex-col justify-between h-full space-y-6">
        {/* Main Content Layout: Artwork Left + Text Details Right */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 flex-1">
          {/* Preview Artwork Container - Rectangular with Rounded Corners for BOTH cards */}
          <div className="w-36 h-44 sm:w-44 sm:h-52 shrink-0 flex items-center justify-center bg-[#012615] rounded-2xl border-2 border-[#FF007A] p-2.5 shadow-inner transition-transform duration-300 group-hover:scale-105">
            {isPfp ? (
              <img
                src="/pfp.png"
                alt="PFP Frame Template"
                className="w-full h-full object-contain rounded-xl"
              />
            ) : (
              <img
                src="/builder.png"
                alt="Builder ID Card Template"
                className="w-full h-full object-contain rounded-xl"
              />
            )}
          </div>

          {/* Right Text Column */}
          <div className="space-y-3.5 text-center sm:text-left flex-1 flex flex-col justify-start">
            {/* Top Hot Pink Ribbon Badge Tag */}
            <div>
              <span className="inline-block bg-[#FF007A] text-white text-[10px] sm:text-xs font-mono font-black uppercase px-3 py-1 rounded-sm tracking-widest shadow-sm">
                {badgeTag}
              </span>
            </div>

            {/* Header Title (White Prefix + Yellow Suffix) */}
            <h3 className="text-3xl sm:text-4xl font-black font-serif uppercase tracking-tight leading-none pt-1">
              <span className="text-white block sm:inline mr-2">{titlePrefix}</span>
              <span className="text-[#FFE600]">{titleSuffix}</span>
            </h3>

            {/* Aspect Ratio Badge Pill */}
            <div>
              <span className="inline-block border border-[#FFE600]/80 text-[#FFE600] font-mono text-xs font-bold px-3.5 py-1 rounded-md bg-[#023D23]/80">
                {dimensions}
              </span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm font-mono text-emerald-100/90 leading-relaxed pt-1">
              {description}
            </p>
          </div>
        </div>

        {/* Divider with Star */}
        <div className="relative flex items-center justify-center pt-2">
          <div className="w-full border-t border-emerald-700/50" />
          <span className="absolute bg-[#023820] group-hover:bg-[#023D23] px-2 text-[#FFE600] text-xs font-mono transition-colors">✦</span>
        </div>

        {/* Bottom CTA Row */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2 text-[#FFE600] group-hover:text-white font-mono text-sm font-black tracking-widest uppercase transition-colors">
            <span>SELECT</span>
            <ArrowRight className="w-5 h-5 text-[#FFE600] group-hover:text-white transition-transform group-hover:translate-x-2" />
          </div>

          {isSelected && (
            <div className="flex items-center gap-1.5 text-[#FFE600] font-mono text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-[#FF007A]" />
              <span>SELECTED</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

