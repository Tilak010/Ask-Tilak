import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import ViewSwitcher from './ViewSwitcher';
import { LeavesToggle } from './AutumnLeaves';
import { Menu, X, Sparkles, FileText, Download, MessageSquare, Bot } from 'lucide-react';

export const Header = ({ 
  onToggleSidebar,
  isSidebarOpen, 
  onOpenChat,
  isChatOpen, 
  theme,
  onToggleTheme,
  onNavigate
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId) => {
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      const el = document.getElementById(`portfolio-section-${sectionId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="h-16 bg-[#FFF8ED]/95 dark:bg-[#211A16]/95 backdrop-blur-md border-b border-[#E7D5BE] dark:border-[#574234] px-3 sm:px-6 flex items-center justify-between z-30 sticky top-0 shadow-xs transition-colors duration-250">
      
      {/* Brand: Tilak Shrivastava & AI Badge */}
      <div className="flex items-center space-x-3">
        <button 
          onClick={() => handleNavClick('hero')}
          className="flex items-center space-x-2.5 text-left group cursor-pointer focus:outline-hidden"
          title="Scroll to top"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#B4532A] to-[#E9A23B] dark:from-[#D97745] dark:to-[#E9AD55] text-white font-bold flex items-center justify-center text-sm shadow-xs group-hover:scale-105 transition-transform">
            TS
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-bold text-[#35251C] dark:text-[#FFF5E8] leading-tight tracking-tight flex items-center gap-1.5">
              <span>Tilak Shrivastava</span>
              <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.2 rounded-md bg-[#F5EBDD] dark:bg-[#2D231D] text-[#B4532A] dark:text-[#D97745] text-[10px] font-semibold border border-[#E7D5BE] dark:border-[#574234]">
                <Bot className="w-2.5 h-2.5" /> AI Powered
              </span>
            </h1>
            <p className="text-[11px] text-[#796557] dark:text-[#D3BEAA] font-medium hidden md:block">
              Software Developer • Systems & AI
            </p>
          </div>
        </button>
      </div>

      {/* Center Navigation Links (Desktop) */}
      <nav className="hidden lg:flex items-center space-x-1 text-xs font-medium text-[#796557] dark:text-[#D3BEAA]">
        <button
          onClick={() => handleNavClick('projects')}
          className="px-2.5 py-1.5 rounded-lg hover:text-[#B4532A] dark:hover:text-[#FFF5E8] hover:bg-[#F5EBDD] dark:hover:bg-[#2D231D] transition-colors cursor-pointer"
        >
          Projects
        </button>
        <button
          onClick={() => handleNavClick('skills')}
          className="px-2.5 py-1.5 rounded-lg hover:text-[#B4532A] dark:hover:text-[#FFF5E8] hover:bg-[#F5EBDD] dark:hover:bg-[#2D231D] transition-colors cursor-pointer"
        >
          Skills
        </button>
        <button
          onClick={() => handleNavClick('experience')}
          className="px-2.5 py-1.5 rounded-lg hover:text-[#B4532A] dark:hover:text-[#FFF5E8] hover:bg-[#F5EBDD] dark:hover:bg-[#2D231D] transition-colors cursor-pointer"
        >
          About & Experience
        </button>
        <button
          onClick={() => handleNavClick('achievements')}
          className="px-2.5 py-1.5 rounded-lg hover:text-[#B4532A] dark:hover:text-[#FFF5E8] hover:bg-[#F5EBDD] dark:hover:bg-[#2D231D] transition-colors cursor-pointer"
        >
          LeetCode
        </button>
        <button
          onClick={() => handleNavClick('contact')}
          className="px-2.5 py-1.5 rounded-lg hover:text-[#B4532A] dark:hover:text-[#FFF5E8] hover:bg-[#F5EBDD] dark:hover:bg-[#2D231D] transition-colors cursor-pointer"
        >
          Contact
        </button>
      </nav>

      {/* Right Controls */}
      <div className="flex items-center space-x-2 sm:space-x-2.5">
        
        {/* Compact View Switcher */}
        <ViewSwitcher compact={true} />

        {/* Chat History Button (Desktop & Tablet) */}
        <button
          onClick={onToggleSidebar}
          className={`hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold shadow-2xs transition-colors cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#B4532A]/30 select-none ${
            isSidebarOpen
              ? 'bg-[#F5EBDD] dark:bg-[#382A21] border-[#B4532A] dark:border-[#D97745] text-[#B4532A] dark:text-[#E9AD55]'
              : 'border-[#E7D5BE] dark:border-[#574234] bg-[#FFFCF5] dark:bg-[#2D231D] hover:bg-[#F5EBDD] dark:hover:bg-[#382A21] text-[#35251C] dark:text-[#FFF5E8]'
          }`}
          title="Chat History"
          aria-label="Toggle chat history"
        >
          <MessageSquare className="w-3.5 h-3.5 text-[#B4532A] dark:text-[#D97745]" />
          <span>History</span>
        </button>

        {/* AI Chatbot Launcher Button */}
        <button
          onClick={onOpenChat}
          className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer active:scale-95 ${
            isChatOpen
              ? 'bg-[#B4532A] dark:bg-[#D97745] text-white ring-2 ring-[#E9A23B]/40'
              : 'bg-[#B4532A] hover:bg-[#963F1E] dark:bg-[#D97745] dark:hover:bg-[#E48858] text-white shadow-sm'
          }`}
          title="Open AI Chat Assistant"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FFF5E8]" />
          <span className="hidden sm:inline">Ask AI Bot</span>
          <span className="sm:hidden">AI</span>
        </button>

        {/* Resume Download (Tablet & Desktop) */}
        <a
          href="/my_resume.pdf"
          download="my_resume.pdf"
          className="hidden sm:inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl border border-[#E7D5BE] dark:border-[#574234] bg-[#FFFCF5] dark:bg-[#2D231D] hover:bg-[#F5EBDD] dark:hover:bg-[#382A21] text-[#35251C] dark:text-[#FFF5E8] text-xs font-semibold shadow-2xs transition-colors select-none"
          title="Download Tilak's Resume (PDF)"
        >
          <FileText className="w-3.5 h-3.5 text-[#B4532A] dark:text-[#D97745]" />
          <span>Resume</span>
          <Download className="w-3 h-3 text-[#796557] dark:text-[#D3BEAA]" />
        </a>

        {/* Falling Leaves Toggle */}
        <LeavesToggle />

        {/* Theme Toggle Button */}
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl text-[#35251C] dark:text-[#FFF5E8] hover:bg-[#F5EBDD] dark:hover:bg-[#2D231D] transition-colors cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 bg-[#FFF8ED] dark:bg-[#211A16] border-b border-[#E7D5BE] dark:border-[#574234] p-4 shadow-xl z-40 animate-fade-in space-y-3">
          <div className="grid grid-cols-2 gap-2 text-xs font-medium">
            <button
              onClick={() => handleNavClick('projects')}
              className="p-2.5 rounded-xl bg-[#FFFCF5] dark:bg-[#2D231D] text-[#35251C] dark:text-[#FFF5E8] text-left hover:bg-[#F5EBDD] dark:hover:bg-[#382A21]"
            >
              💼 Projects
            </button>
            <button
              onClick={() => handleNavClick('skills')}
              className="p-2.5 rounded-xl bg-[#FFFCF5] dark:bg-[#2D231D] text-[#35251C] dark:text-[#FFF5E8] text-left hover:bg-[#F5EBDD] dark:hover:bg-[#382A21]"
            >
              ⚡ Skills
            </button>
            <button
              onClick={() => handleNavClick('experience')}
              className="p-2.5 rounded-xl bg-[#FFFCF5] dark:bg-[#2D231D] text-[#35251C] dark:text-[#FFF5E8] text-left hover:bg-[#F5EBDD] dark:hover:bg-[#382A21]"
            >
              📄 About & Resume
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="p-2.5 rounded-xl bg-[#FFFCF5] dark:bg-[#2D231D] text-[#35251C] dark:text-[#FFF5E8] text-left hover:bg-[#F5EBDD] dark:hover:bg-[#382A21]"
            >
              📫 Contact
            </button>
          </div>

          <div className="pt-2 border-t border-[#E7D5BE] dark:border-[#574234] flex items-center justify-between gap-2">
            <a
              href="/my_resume.pdf"
              download="my_resume.pdf"
              className="flex-1 py-2 px-3 rounded-xl bg-[#B4532A] hover:bg-[#963F1E] dark:bg-[#D97745] dark:hover:bg-[#E48858] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Resume PDF</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onToggleSidebar) onToggleSidebar();
              }}
              className="py-2 px-3 rounded-xl border border-[#E7D5BE] dark:border-[#574234] text-[#35251C] dark:text-[#FFF5E8] text-xs font-semibold flex items-center justify-center gap-1"
              title="Chat History"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#B4532A] dark:text-[#D97745]" />
              <span>History</span>
            </button>
          </div>
        </div>
      )}

    </header>
  );
};

export default Header;
