import React from 'react';

export const FootballBackground = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.035] select-none z-0">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="pitchGrid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#0284c7" strokeWidth="1" />
          </pattern>
        </defs>

        {/* Pitch grid */}
        <rect width="100%" height="100%" fill="url(#pitchGrid)" />

        {/* Center Pitch Circle */}
        <circle cx="50%" cy="50%" r="140" fill="none" stroke="#0284c7" strokeWidth="2" strokeDasharray="6 6" />
        <circle cx="50%" cy="50%" r="4" fill="#0284c7" />
        
        {/* Halfway line */}
        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#0284c7" strokeWidth="2" />

        {/* Penalty box top */}
        <rect x="30%" y="0" width="40%" height="100" fill="none" stroke="#0284c7" strokeWidth="2" />
        {/* Penalty box bottom */}
        <rect x="30%" y="calc(100% - 100px)" width="40%" height="100" fill="none" stroke="#0284c7" strokeWidth="2" />

        {/* Corner Arcs */}
        <path d="M 0,30 A 30,30 0 0,0 30,0" fill="none" stroke="#0284c7" strokeWidth="2" />
        <path d="M 100%,30 A 30,30 0 0,1 calc(100% - 30px),0" fill="none" stroke="#0284c7" strokeWidth="2" />
      </svg>
    </div>
  );
};

export default FootballBackground;
