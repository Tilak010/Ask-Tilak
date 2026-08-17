import React from 'react';

export const FootballLogo = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const iconSizes = {
    sm: 18,
    md: 22,
    lg: 28,
    xl: 38,
  };

  return (
    <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 via-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/25 ${sizeClasses[size]} ${className}`}>
      {/* Subtle football stitching overlay in SVG */}
      <svg
        width={iconSizes[size]}
        height={iconSizes[size]}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transform transition-transform hover:rotate-45 duration-500"
      >
        {/* Ball outer circle */}
        <circle cx="12" cy="12" r="9" className="opacity-90" />
        {/* Pentagonal center motif */}
        <polygon points="12,7 15,9.5 14,13 10,13 9,9.5" fill="currentColor" fillOpacity="0.25" />
        {/* Ball seams radiating to edge */}
        <path d="M12 7V3" />
        <path d="M15 9.5L19 8" />
        <path d="M14 13L17 17" />
        <path d="M10 13L7 17" />
        <path d="M9 9.5L5 8" />
      </svg>
      
      {/* AI Sparkle badge accent on top right */}
      <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-sky-200 border-2 border-slate-900 rounded-full flex items-center justify-center animate-pulse">
        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
      </div>
    </div>
  );
};

export default FootballLogo;
