import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import ViewSwitcher from './ViewSwitcher';
import { Menu, X, Sparkles, FileText, Download, MessageSquare, Bot } from 'lucide-react';
import { useVisitorMode } from '../context/VisitorModeContext';

export const Header = ({ 
  onToggleSidebar, 
  onNewChat,
  onOpenChat,
  isChatOpen,
  isBackendConnected, 
  isCheckingBackend,
  onRecheckBackend,
  theme,
  onToggleTheme,
  onNavigate
}) => {
  const { visitorMode } = useVisitorMode();
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
    <header className="h-16 bg-[#FFF8F0]/95 dark:bg-[#241A17]/95 backdrop-blur-md border-b border-[#E8D5C7] dark:border-[#59433A] px-3 sm:px-6 flex items-center justify-between z-30 sticky top-0 shadow-xs transition-colors duration-250">
      
      {/* Brand: Tilak Shrivastava & AI Badge */}
      <div className="flex items-center space-x-3">
        <button 
          onClick={() => handleNavClick('hero')}
          className="flex items-center space-x-2.5 text-left group cursor-pointer focus:outline-hidden"
          title="Scroll to top"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#C65D3A] to-[#E9A23B] dark:from-[#D96B45] dark:to-[#F0B35A] text-white font-bold flex items-center justify-center text-sm shadow-xs group-hover:scale-105 transition-transform">
            TS
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-bold text-[#2D211D] dark:text-[#FFF4EA] leading-tight tracking-tight flex items-center gap-1.5">
              <span>Tilak Shrivastava</span>
              <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.2 rounded-md bg-[#F7EDE3] dark:bg-[#30221E] text-[#C65D3A] dark:text-[#D96B45] text-[10px] font-semibold border border-[#E8D5C7] dark:border-[#59433A]">
                <Bot className="w-2.5 h-2.5" /> AI Powered
              </span>
            </h1>
            <p className="text-[11px] text-[#6F5B52] dark:text-[#D5C0B5] font-medium hidden md:block">
              Software Developer • Systems & AI
            </p>
          </div>
        </button>
      </div>

      {/* Center Navigation Links (Desktop) */}
      <nav className="hidden lg:flex items-center space-x-1 text-xs font-medium text-[#6F5B52] dark:text-[#D5C0B5]">
        <button
          onClick={() => handleNavClick('projects')}
          className="px-2.5 py-1.5 rounded-lg hover:text-[#C65D3A] dark:hover:text-[#FFF4EA] hover:bg-[#F7EDE3] dark:hover:bg-[#30221E] transition-colors cursor-pointer"
        >
          Projects
        </button>
        <button
          onClick={() => handleNavClick('skills')}
          className="px-2.5 py-1.5 rounded-lg hover:text-[#C65D3A] dark:hover:text-[#FFF4EA] hover:bg-[#F7EDE3] dark:hover:bg-[#30221E] transition-colors cursor-pointer"
        >
          Skills
        </button>
        <button
          onClick={() => handleNavClick('experience')}
          className="px-2.5 py-1.5 rounded-lg hover:text-[#C65D3A] dark:hover:text-[#FFF4EA] hover:bg-[#F7EDE3] dark:hover:bg-[#30221E] transition-colors cursor-pointer"
        >
          About & Experience
        </button>
        <button
          onClick={() => handleNavClick('achievements')}
          className="px-2.5 py-1.5 rounded-lg hover:text-[#C65D3A] dark:hover:text-[#FFF4EA] hover:bg-[#F7EDE3] dark:hover:bg-[#30221E] transition-colors cursor-pointer"
        >
          LeetCode
        </button>
        <button
          onClick={() => handleNavClick('contact')}
          className="px-2.5 py-1.5 rounded-lg hover:text-[#C65D3A] dark:hover:text-[#FFF4EA] hover:bg-[#F7EDE3] dark:hover:bg-[#30221E] transition-colors cursor-pointer"
        >
          Contact
        </button>
      </nav>

      {/* Right Controls: View Switcher, AI Chatbot button, Resume, Theme Toggle, Mobile Menu */}
      <div className="flex items-center space-x-2 sm:space-x-2.5">
        
        {/* Compact View Switcher */}
        <ViewSwitcher compact={true} />

        {/* AI Chatbot Launcher Button */}
        <button
          onClick={onOpenChat}
          className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer active:scale-95 ${
            isChatOpen
              ? 'bg-[#C65D3A] dark:bg-[#D96B45] text-white ring-2 ring-[#E9A23B]/40'
              : 'bg-[#C65D3A] hover:bg-[#A94A2E] dark:bg-[#D96B45] dark:hover:bg-[#E47B52] text-white shadow-sm'
          }`}
          title="Open AI Chat Assistant"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FFF4EA]" />
          <span className="hidden sm:inline">Ask AI Bot</span>
          <span className="sm:hidden">AI</span>
        </button>

        {/* Resume Download (Tablet & Desktop) */}
        <a
          href="/my_resume.pdf"
          download="my_resume.pdf"
          className="hidden sm:inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl border border-[#E8D5C7] dark:border-[#59433A] bg-[#FFF1E6] dark:bg-[#30221E] hover:bg-[#F7EDE3] dark:hover:bg-[#3A2924] text-[#2D211D] dark:text-[#FFF4EA] text-xs font-semibold shadow-2xs transition-colors select-none"
          title="Download Tilak's Resume (PDF)"
        >
          <FileText className="w-3.5 h-3.5 text-[#C65D3A] dark:text-[#D96B45]" />
          <span>Resume</span>
          <Download className="w-3 h-3 text-[#6F5B52] dark:text-[#D5C0B5]" />
        </a>

        {/* Theme Toggle Button */}
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl text-[#2D211D] dark:text-[#FFF4EA] hover:bg-[#F7EDE3] dark:hover:bg-[#30221E] transition-colors cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 bg-[#FFF8F0] dark:bg-[#241A17] border-b border-[#E8D5C7] dark:border-[#59433A] p-4 shadow-xl z-40 animate-fade-in space-y-3">
          <div className="grid grid-cols-2 gap-2 text-xs font-medium">
            <button
              onClick={() => handleNavClick('projects')}
              className="p-2.5 rounded-xl bg-[#FFF1E6] dark:bg-[#30221E] text-[#2D211D] dark:text-[#FFF4EA] text-left hover:bg-[#F7EDE3] dark:hover:bg-[#3A2924]"
            >
              💼 Projects
            </button>
            <button
              onClick={() => handleNavClick('skills')}
              className="p-2.5 rounded-xl bg-[#FFF1E6] dark:bg-[#30221E] text-[#2D211D] dark:text-[#FFF4EA] text-left hover:bg-[#F7EDE3] dark:hover:bg-[#3A2924]"
            >
              ⚡ Skills
            </button>
            <button
              onClick={() => handleNavClick('experience')}
              className="p-2.5 rounded-xl bg-[#FFF1E6] dark:bg-[#30221E] text-[#2D211D] dark:text-[#FFF4EA] text-left hover:bg-[#F7EDE3] dark:hover:bg-[#3A2924]"
            >
              📄 About & Resume
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="p-2.5 rounded-xl bg-[#FFF1E6] dark:bg-[#30221E] text-[#2D211D] dark:text-[#FFF4EA] text-left hover:bg-[#F7EDE3] dark:hover:bg-[#3A2924]"
            >
              📫 Contact
            </button>
          </div>

          <div className="pt-2 border-t border-[#E8D5C7] dark:border-[#59433A] flex items-center justify-between gap-2">
            <a
              href="/my_resume.pdf"
              download="my_resume.pdf"
              className="flex-1 py-2 px-3 rounded-xl bg-[#C65D3A] hover:bg-[#A94A2E] dark:bg-[#D96B45] dark:hover:bg-[#E47B52] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Resume PDF</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onToggleSidebar) onToggleSidebar();
              }}
              className="py-2 px-3 rounded-xl border border-[#E8D5C7] dark:border-[#59433A] text-[#2D211D] dark:text-[#FFF4EA] text-xs font-semibold flex items-center justify-center gap-1"
              title="Chat History"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#C65D3A] dark:text-[#D96B45]" />
              <span>History</span>
            </button>
          </div>
        </div>
      )}

    </header>
  );
};

export default Header;
