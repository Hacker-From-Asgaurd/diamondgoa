import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface HeaderProps {
  onOpenIdentityGenerator?: () => void;
  onGoHome?: () => void;
  hideCta?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onOpenIdentityGenerator, onGoHome, hideCta = false }) => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    if (onGoHome) {
      onGoHome();
    } else {
      navigate('/');
    }
  };

  const handleCtaClick = () => {
    if (onOpenIdentityGenerator) {
      onOpenIdentityGenerator();
    } else {
      navigate('/create-identity');
    }
  };

  return (
    <header className="w-full pt-3 sm:pt-5 pb-1 px-4 sm:px-8 lg:px-12 relative select-none z-20">
      
      {/* Top Bar Navigation & Metadata */}
      <div className="max-w-7xl mx-auto flex items-start justify-between relative">
        
        {/* Top Left: 2:47 PM STUDIO + Coordinates */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleHomeClick}
            className="font-mono text-[#FFE000] font-extrabold text-base sm:text-lg tracking-wider leading-tight text-left hover:text-[#FF006B] transition-colors focus:outline-none rounded p-0.5"
          >
            2:47 <span className="text-xs font-bold -ml-0.5">PM</span><br />
            <span className="text-xs tracking-widest block -mt-0.5">STUDIO</span>
          </button>

          {/* Vertical Separator & Coordinates */}
          <div className="hidden sm:flex items-center gap-3 border-l border-[#FFE000]/50 pl-3 font-mono text-[10px] sm:text-[11px] text-[#FFE000] tracking-widest leading-snug uppercase font-bold">
            <div>
              <div>15°29'54"N</div>
              <div>73°49'47"E</div>
              <div className="text-[#FFE000]">GOA, INDIA</div>
            </div>
          </div>
        </div>

        {/* Top Right: HACKER HOUSE GOA 2026 + Circular Stamp */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="font-mono text-[11px] sm:text-xs text-[#FFE000] font-extrabold tracking-widest uppercase text-right">
            HACKER HOUSE GOA 2026
          </div>

          {/* Circular Retro Stamp Emblem */}
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#FF006B] bg-[#063D27] flex items-center justify-center relative shadow-sm shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full p-0.5">
              <path id="stampCircle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
              <text fontSize="8.2" fontFamily="monospace" fontWeight="bold" fill="#FFE000" letterSpacing="1.8">
                <textPath href="#stampCircle">CONNECT • CODE • CREATE •</textPath>
              </text>
            </svg>
            <div className="absolute flex flex-col items-center justify-center leading-none text-[#FF006B]">
              <span className="text-[7px] leading-none mb-[-2px] text-[#FFE000]">+</span>
              <span className="font-serif font-black text-xs sm:text-sm tracking-tight text-[#FF006B]">HH</span>
              <span className="text-[7px] leading-none mt-[-2px] text-[#FFE000]">+</span>
            </div>
          </div>
        </div>

      </div>

      {/* Main Title Centerpiece */}
      <div className="max-w-6xl mx-auto text-center pt-2 sm:pt-3 pb-1 relative z-10">
        
        {/* Top Tagline with pink underline */}
        <div className="inline-block relative mb-1 sm:mb-2">
          <span className="font-mono text-xs sm:text-sm text-[#FFE000] font-bold tracking-[0.25em] uppercase">
            CONNECT &nbsp;•&nbsp; CODE &nbsp;•&nbsp; CREATE
          </span>
          <svg className="w-full h-2 absolute -bottom-1.5 left-0" viewBox="0 0 200 8" fill="none">
            <path d="M 60 4 Q 100 7 140 3" stroke="#FF006B" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>

        {/* Poster Main Title: HACK [गोवा] HOUSE */}
        <div className="flex items-center justify-center flex-wrap font-condensed-title text-[#FFE000] text-5xl sm:text-7xl md:text-8xl lg:text-[112px] leading-none tracking-tight font-black uppercase drop-shadow-xl">
          <span className="inline-block transform scale-x-[0.84]">HACK</span>
          
          {/* Devanagari Hindi Text "गोवा" */}
          <span className="hindi-overlay-inline text-4xl sm:text-6xl md:text-7xl lg:text-[90px] px-1 sm:px-2 mx-1 sm:mx-2 leading-none inline-block transform -rotate-2">
            गोवा
          </span>

          <span className="inline-block transform scale-x-[0.84]">HOUSE</span>
        </div>

        {/* Subtitle Date & Location */}
        <div className="mt-2 sm:mt-2.5 flex items-center justify-center gap-3 font-mono text-xs sm:text-sm text-[#FFE000] font-extrabold tracking-[0.2em] uppercase">
          <span className="inline-block w-8 sm:w-16 h-[1.5px] bg-[#FFE000]" />
          <span>GOA, INDIA &nbsp;•&nbsp; 28 - 31 OCT 2026</span>
          <span className="inline-block w-8 sm:w-16 h-[1.5px] bg-[#FFE000]" />
        </div>

        {/* Primary CTA Button (Preserving exact functionality) */}
        {!hideCta && (
          <div className="flex justify-center pt-4 sm:pt-5 pb-1">
            <button
              onClick={handleCtaClick}
              className="group relative inline-flex items-center gap-2.5 bg-[#FF006B] hover:bg-[#E0005C] text-[#FFF8E7] font-mono font-extrabold text-sm sm:text-base uppercase tracking-wider px-8 sm:px-10 py-3.5 sm:py-4 rounded-full border-2 border-[#FFE000] shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>CREATE MY IDENTITY</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFE000] transition-transform duration-300 group-hover:translate-x-1.5" />
            </button>
          </div>
        )}

      </div>

    </header>
  );
};



