import React from 'react';
import FootballLogo from './FootballLogo';
import ThemeToggle from './ThemeToggle';
import { Menu, Plus, RefreshCw, AlertTriangle, FileText, Download } from 'lucide-react';

export const Header = ({ 
  onToggleSidebar, 
  onNewChat, 
  isBackendConnected, 
  isCheckingBackend,
  onRecheckBackend,
  theme,
  onToggleTheme
}) => {
  return (
    <header className="h-16 bg-white/90 dark:bg-[#071a2f]/90 backdrop-blur-md border-b border-sky-100 dark:border-[#023e8a]/40 px-4 sm:px-6 flex items-center justify-between z-20 sticky top-0 shadow-2xs dark:shadow-[#020b18]/50 transition-colors duration-300">
      
      {/* Left side: Mobile Hamburger + Logo + Title */}
      <div className="flex items-center space-x-3">
        {/* Mobile Hamburger */}
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-[#023e8a]/30 hover:text-sky-700 dark:hover:text-sky-300 md:hidden transition-colors cursor-pointer"
          title="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Logo & Brand */}
        <div className="flex items-center space-x-2.5">
          <FootballLogo size="sm" />
          <div>
            <h1 className="text-base font-bold text-slate-900 dark:text-white leading-tight tracking-tight flex items-center gap-1.5">
              KickOff AI <span className="text-[10px] font-semibold uppercase px-1.5 py-0.2 rounded-md bg-sky-100 dark:bg-[#023e8a]/50 text-sky-700 dark:text-sky-300 border border-transparent dark:border-[#0077b6]/30">Chatbot</span>
            </h1>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
              Tilak Representative
            </p>
          </div>
        </div>
      </div>

      {/* Right side: Theme Toggle + Resume + Backend Health + New Chat */}
      <div className="flex items-center space-x-2 sm:space-x-2.5">
        
        {/* Theme Toggle Button */}
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />

        {/* Download Resume (Tablet & Desktop) */}
        <a
          href="/my_resume.pdf"
          download="my_resume.pdf"
          className="hidden md:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-sky-200/90 dark:border-[#023e8a] bg-sky-50/70 dark:bg-[#071a2f] hover:bg-sky-100 dark:hover:bg-[#0b2545] text-sky-700 dark:text-sky-300 text-xs font-semibold shadow-2xs transition-all duration-200 active:scale-95 group cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-sky-400/40"
          aria-label="Download Tilak's Resume in PDF format"
          title="Download Resume (PDF)"
        >
          <FileText className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 group-hover:scale-105 transition-transform" />
          <span>Resume</span>
          <Download className="w-3 h-3 text-sky-500 dark:text-sky-400 transition-transform duration-200 group-hover:translate-y-0.5" />
        </a>

        {/* Backend Status Badge */}
        <button
          onClick={onRecheckBackend}
          className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center space-x-1.5 border transition-all cursor-pointer ${
            isCheckingBackend
              ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/40'
              : isBackendConnected
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50'
              : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800/40 hover:bg-rose-100 dark:hover:bg-rose-900/50'
          }`}
          title="Click to re-verify backend connectivity"
        >
          {isCheckingBackend ? (
            <>
              <RefreshCw className="w-3 h-3 animate-spin text-amber-600 dark:text-amber-400" />
              <span className="hidden sm:inline">Checking...</span>
            </>
          ) : isBackendConnected ? (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="hidden sm:inline">FastAPI Online</span>
              <span className="sm:hidden">Online</span>
            </>
          ) : (
            <>
              <AlertTriangle className="w-3 h-3 text-rose-500 dark:text-rose-400" />
              <span className="hidden sm:inline">FastAPI Offline</span>
              <span className="sm:hidden">Offline</span>
            </>
          )}
        </button>

        {/* New Chat Button */}
        <button
          onClick={onNewChat}
          className="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 dark:bg-[#023e8a] dark:hover:bg-[#0077b6] text-white text-xs font-semibold shadow-sm shadow-sky-600/20 dark:shadow-[#023e8a]/40 flex items-center space-x-1 transition-all cursor-pointer active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">New Chat</span>
        </button>

      </div>
    </header>
  );
};

export default Header;
