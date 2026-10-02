import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  variant?: 'inline' | 'stacked' | 'badge';
}

export const LobbyLogo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showSubtitle = true,
  variant = 'inline' 
}) => {
  const titleSizes = {
    sm: 'text-xl tracking-[0.14em]',
    md: 'text-2xl sm:text-3xl tracking-[0.18em]',
    lg: 'text-4xl sm:text-5xl tracking-[0.2em]',
    xl: 'text-6xl sm:text-7xl tracking-[0.22em]'
  };

  const subtitleSizes = {
    sm: 'text-[9px] tracking-[0.25em]',
    md: 'text-[11px] sm:text-xs tracking-[0.28em]',
    lg: 'text-xs sm:text-sm tracking-[0.3em]',
    xl: 'text-sm sm:text-base tracking-[0.32em]'
  };

  if (variant === 'stacked') {
    return (
      <div className="flex flex-col items-center justify-center text-center select-none py-1">
        {/* Exact typography from user's image: High-contrast Didone / Bodoni Serif */}
        <span className={`font-lobby font-black uppercase text-white hover:text-[#FFE600] transition-colors duration-300 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] ${titleSizes[size]}`}>
          LOBBY
        </span>
        {showSubtitle && (
          <span className={`font-sans uppercase text-zinc-300 font-medium mt-0.5 ${subtitleSizes[size]}`}>
            Hi-Fi sound <span className="text-[#FFE600] mx-0.5">•</span> Brasília, DF
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 select-none">
      {/* Editorial Monogram Badge with glowing border */}
      <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-zinc-900 via-black to-zinc-950 border border-zinc-800 hover:border-[#FFE600]/60 flex items-center justify-center transition-all duration-300 group shadow-lg">
        <div className="absolute inset-0 rounded-xl bg-[#FFE600]/10 opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
        <span className="font-lobby font-black text-xl sm:text-2xl text-[#FFE600] tracking-wider drop-shadow-[0_0_8px_rgba(255,230,0,0.5)]">
          L
        </span>
      </div>

      {/* Typography representation matching the provided image */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className={`font-lobby font-black uppercase text-white hover:text-[#FFE600] transition-colors leading-none ${titleSizes[size]}`}>
            LOBBY
          </span>
          <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#FFE600] text-black text-[9px] font-black" title="Verificado Oficial">
            ✓
          </span>
        </div>
        {showSubtitle && (
          <span className={`font-sans uppercase text-zinc-400 font-medium mt-1 leading-none ${subtitleSizes[size]}`}>
            Hi-Fi sound <span className="text-[#FFE600]">•</span> Brasília, DF
          </span>
        )}
      </div>
    </div>
  );
};
