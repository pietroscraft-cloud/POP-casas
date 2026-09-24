import React from 'react';
import logoImg from '../assets/images/pop_casas_logo_1790210130469.jpg';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
  useImage?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = '',
  useImage = false,
}) => {
  const iconDimensions = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  }[size];

  const brandTextSize = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  }[size];

  const subtitleSize = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-xs',
  }[size];

  return (
    <div className={`flex items-center gap-2.5 group cursor-pointer ${className}`}>
      {/* Logo Icon Mark */}
      <div className="relative">
        {useImage ? (
          <img
            src={logoImg}
            alt="Pop Casas"
            className={`${iconDimensions} rounded-lg object-cover border border-amber-400/30 group-hover:border-amber-400/70 transition-colors shadow-md shadow-amber-950/30`}
          />
        ) : (
          <div
            className={`${iconDimensions} rounded-lg bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 border border-amber-400/30 group-hover:border-amber-400/70 p-1.5 flex items-center justify-center transition-all duration-200 shadow-md shadow-amber-950/40`}
          >
            {/* Architectural Geometric Roof/Pillar SVG Emblem */}
            <svg
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full transform group-hover:scale-105 transition-transform duration-200"
            >
              <defs>
                <linearGradient id="popGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#d97706" />
                </linearGradient>
              </defs>

              {/* Contemporary Geometric Roof & Horizon Lines */}
              <path
                d="M16 4L28 14L25.5 16L16 8L6.5 16L4 14L16 4Z"
                fill="url(#popGold)"
              />
              {/* Inner Architectural Keystone / Pillar */}
              <path
                d="M11 15H14V26H11V15Z"
                fill="url(#popGold)"
                fillOpacity="0.85"
              />
              <path
                d="M18 15H21V26H18V15Z"
                fill="url(#popGold)"
                fillOpacity="0.85"
              />
              {/* Central Diamond Accent */}
              <path
                d="M16 11L18 13.5L16 16L14 13.5L16 11Z"
                fill="#ffffff"
              />
              {/* Horizon Foundation Bar */}
              <rect
                x="6"
                y="27"
                width="20"
                height="2"
                rx="1"
                fill="url(#popGold)"
              />
            </svg>
          </div>
        )}

        {/* Subtle golden ambient glow behind the icon */}
        <div className="absolute -inset-1 rounded-lg bg-amber-500/10 blur-sm -z-10 group-hover:bg-amber-500/25 transition-colors" />
      </div>

      {/* Typography */}
      <div className="flex flex-col leading-tight select-none">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-display ${brandTextSize} font-bold tracking-tight text-neutral-100 group-hover:text-amber-200 transition-colors uppercase`}
          >
            Pop
          </span>
          <span
            className={`font-display ${brandTextSize} font-light tracking-widest text-amber-400 group-hover:text-amber-300 transition-colors uppercase`}
          >
            Casas
          </span>
        </div>

        {showSubtitle && (
          <span
            className={`font-sans ${subtitleSize} uppercase tracking-[0.22em] text-neutral-400 font-semibold mt-0.5 group-hover:text-neutral-300 transition-colors`}
          >
            Imóveis Exclusivos
          </span>
        )}
      </div>
    </div>
  );
};

export default Logo;
