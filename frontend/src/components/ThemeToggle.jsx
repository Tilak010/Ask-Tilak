import React from 'react';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = ({ theme, onToggle, className = '' }) => {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={`
        relative inline-flex items-center h-8 w-16 rounded-full p-1
        transition-all duration-300 ease-out cursor-pointer select-none
        focus:outline-hidden focus:ring-2 focus:ring-[#C65D3A]/40
        group
        ${isDark
          ? 'bg-[#30221E] border border-[#59433A] shadow-inner hover:border-[#D96B45]'
          : 'bg-[#F7EDE3] border border-[#E8D5C7] shadow-inner hover:border-[#E9A23B]'
        }
        ${className}
      `}
    >
      <span className="sr-only">Toggle Dark Mode</span>
      
      {/* Sun icon placeholder on left */}
      <span className={`absolute left-1.5 flex items-center justify-center transition-all duration-300 ${
        isDark ? 'opacity-30 scale-75 text-[#F0B35A]' : 'opacity-0 scale-50'
      }`}>
        <Sun className="w-3.5 h-3.5" />
      </span>

      {/* Moon icon placeholder on right */}
      <span className={`absolute right-1.5 flex items-center justify-center transition-all duration-300 ${
        isDark ? 'opacity-0 scale-50' : 'opacity-40 scale-75 text-[#6F5B52]'
      }`}>
        <Moon className="w-3.5 h-3.5" />
      </span>

      {/* Sliding Knob */}
      <span
        className={`
          flex items-center justify-center w-6 h-6 rounded-full shadow-md
          transform transition-all duration-300
          ${isDark
            ? 'translate-x-8 bg-gradient-to-tr from-[#D96B45] to-[#F0B35A] text-[#FFF4EA] shadow-black/40 ring-1 ring-[#D96B45]/50'
            : 'translate-x-0 bg-white text-[#E9A23B] shadow-sm ring-1 ring-[#E8D5C7]'
          }
        `}
      >
        {isDark ? (
          <Moon className="w-3.5 h-3.5 transform transition-transform duration-300 rotate-0 group-hover:-rotate-12 fill-amber-100/20" />
        ) : (
          <Sun className="w-3.5 h-3.5 transform transition-transform duration-300 rotate-0 group-hover:rotate-45 fill-[#E9A23B]/30" />
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;
