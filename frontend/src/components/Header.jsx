import React from 'react';
import FootballLogo from './FootballLogo';
import { Menu, Plus, RefreshCw, Radio, CheckCircle, AlertTriangle } from 'lucide-react';

export const Header = ({ 
  onToggleSidebar, 
  onNewChat, 
  isBackendConnected, 
  isCheckingBackend,
  onRecheckBackend 
}) => {
  return (
    <header className="h-16 bg-white/90 backdrop-blur-md border-b border-sky-100 px-4 sm:px-6 flex items-center justify-between z-20 sticky top-0 shadow-2xs">
      
      {/* Left side: Mobile Hamburger + Logo + Title */}
      <div className="flex items-center space-x-3">
        {/* Mobile Hamburger */}
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg text-slate-600 hover:bg-sky-50 hover:text-sky-700 md:hidden transition-colors cursor-pointer"
          title="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Logo & Brand */}
        <div className="flex items-center space-x-2.5">
          <FootballLogo size="sm" />
          <div>
            <h1 className="text-base font-bold text-slate-900 leading-tight tracking-tight flex items-center gap-1.5">
              KickOff AI <span className="text-[10px] font-semibold uppercase px-1.5 py-0.2 rounded-md bg-sky-100 text-sky-700">Chatbot</span>
            </h1>
            <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
              Tilak Representative
            </p>
          </div>
        </div>
      </div>

      {/* Right side: Backend Health Indicator + New Chat Action */}
      <div className="flex items-center space-x-2.5">
        
        {/* Backend Status Badge */}
        <button
          onClick={onRecheckBackend}
          className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center space-x-1.5 border transition-all cursor-pointer ${
            isCheckingBackend
              ? 'bg-amber-50 text-amber-700 border-amber-200'
              : isBackendConnected
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
              : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
          }`}
          title="Click to re-verify backend connectivity"
        >
          {isCheckingBackend ? (
            <>
              <RefreshCw className="w-3 h-3 animate-spin text-amber-600" />
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
              <AlertTriangle className="w-3 h-3 text-rose-500" />
              <span className="hidden sm:inline">FastAPI Offline</span>
              <span className="sm:hidden">Offline</span>
            </>
          )}
        </button>

        {/* New Chat Button */}
        <button
          onClick={onNewChat}
          className="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold shadow-sm shadow-sky-600/20 flex items-center space-x-1 transition-all cursor-pointer active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">New Chat</span>
        </button>

      </div>
    </header>
  );
};

export default Header;
