import React from 'react';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = ({ theme, onToggle, className = '' }) => {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode (#023e8a)'}
      className={`
        relative inline-flex items-center h-8 w-16 rounded-full p-1
        transition-all duration-300 ease-out cursor-pointer select-none
        focus:outline-hidden focus:ring-2 focus:ring-sky-400/50
        group
        ${isDark
          ? 'bg-[#071a2f] border border-[#023e8a] shadow-inner shadow-[#020b18]/60 hover:border-[#0077b6]'
          : 'bg-sky-100 border border-sky-200 shadow-inner shadow-sky-200/50 hover:border-sky-300'
        }
        ${className}
      `}
    >
      {/* Background tracks with subtle ambient glow icons */}
      <span className="sr-only">Toggle Dark Mode</span>
      
      {/* Sun icon background placeholder on the left */}
      <span className={`absolute left-1.5 flex items-center justify-center transition-all duration-300 ${
        isDark ? 'opacity-30 scale-75 text-sky-400' : 'opacity-0 scale-50'
      }`}>
        <Sun className="w-3.5 h-3.5" />
      </span>

      {/* Moon icon background placeholder on the right */}
      <span className={`absolute right-1.5 flex items-center justify-center transition-all duration-300 ${
        isDark ? 'opacity-0 scale-50' : 'opacity-40 scale-75 text-slate-500'
      }`}>
        <Moon className="w-3.5 h-3.5" />
      </span>

      {/* Sliding Knob */}
      <span
        className={`
          flex items-center justify-center w-6 h-6 rounded-full shadow-md
          transform transition-all duration-300
          ${isDark
            ? 'translate-x-8 bg-gradient-to-tr from-[#023e8a] to-[#0077b6] text-amber-200 shadow-[#023e8a]/50 ring-1 ring-[#0077b6]/60'
            : 'translate-x-0 bg-white text-amber-500 shadow-slate-300 ring-1 ring-sky-100'
          }
        `}
      >
        {isDark ? (
          <Moon className="w-3.5 h-3.5 transform transition-transform duration-300 rotate-0 group-hover:-rotate-12 fill-amber-200/20" />
        ) : (
          <Sun className="w-3.5 h-3.5 transform transition-transform duration-300 rotate-0 group-hover:rotate-45 fill-amber-400/30" />
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;
