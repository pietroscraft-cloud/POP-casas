import React from 'react';
import { heroBg } from '../data/campaigns';

export const SiteBackground: React.FC = () => {
  return (
    <div
      className="fixed inset-0 -z-50 pointer-events-none select-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Twilight Architectural Background Image with measured scrim */}
      <img
        src={heroBg}
        alt=""
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover object-center scale-105 opacity-25 filter blur-[1px] transform-gpu"
      />

      {/* Dark luxury linear gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/90 via-neutral-950/95 to-neutral-950" />

      {/* Subtle warm amber/champagne radial glow at top right */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-amber-600/10 blur-[140px]" />

      {/* Subtle cool slate glow on bottom left */}
      <div className="absolute bottom-10 -left-40 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[150px]" />

      {/* Ultra-fine architectural hairline grid for spatial depth */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  );
};
