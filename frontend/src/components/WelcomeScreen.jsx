import React from 'react';
import PersonalizedPortfolio from './PersonalizedPortfolio';
import { 
  Sparkles, 
  ArrowRight, 
  FileText, 
  Download, 
  MessageSquare, 
  ChevronDown,
  Briefcase
} from 'lucide-react';
import { MODE_CONFIGS, DEFAULT_SUGGESTIONS } from '../data/portfolioData';
import { useVisitorMode } from '../context/VisitorModeContext';

export const WelcomeScreen = ({ onSelectPrompt, onOpenChat }) => {
  const { visitorMode, openSelector } = useVisitorMode();
  const currentConfig = visitorMode && MODE_CONFIGS[visitorMode];

  // Active suggested questions (curated to top 3-4 for clarity)
  const suggestedQuestions = currentConfig
    ? currentConfig.suggestedQuestions.slice(0, 4)
    : DEFAULT_SUGGESTIONS.map((d) => d.prompt).slice(0, 4);

  const scrollToSection = (id) => {
    const el = document.getElementById(`portfolio-section-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div id="portfolio-section-hero" className="flex-1 flex flex-col items-center justify-start max-w-5xl mx-auto w-full z-10 animate-fade-in transition-colors duration-200 pb-16">
      
      {/* Hero Section */}
      <section className="w-full pt-6 sm:pt-10 pb-8 px-4 sm:px-6 text-center flex flex-col items-center border-b border-[#E7D5BE] dark:border-[#574234]">
        
        {/* Availability Badge & Role Tag */}
        <div className="flex items-center justify-center gap-2 mb-4 flex-wrap">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#FFFCF5] dark:bg-[#2D231D] border border-[#E7D5BE] dark:border-[#574234] text-[#B4532A] dark:text-[#D97745] text-xs font-semibold shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#E9A23B] dark:bg-[#E9AD55] animate-pulse"></span>
            <span>Available for Immediate Hire</span>
          </div>

          <button
            onClick={openSelector}
            className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#F5EBDD] hover:bg-[#FFFCF5] dark:bg-[#2D231D] dark:hover:bg-[#382A21] border border-[#E7D5BE] dark:border-[#574234] text-[#35251C] dark:text-[#FFF5E8] text-xs font-medium transition-colors cursor-pointer"
            title="Personalize portfolio view for your background"
          >
            <span>Viewing: <strong className="font-semibold text-[#B4532A] dark:text-[#D97745]">{currentConfig ? currentConfig.title : 'General'}</strong></span>
            <ChevronDown className="w-3 h-3 text-[#796557] dark:text-[#D3BEAA]" />
          </button>
        </div>

        {/* Candidate Name & Title */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#35251C] dark:text-[#FFF5E8] tracking-tight mb-3">
          Tilak Shrivastava
        </h1>

        <p className="text-base sm:text-lg font-semibold text-[#B4532A] dark:text-[#D97745] mb-3 max-w-2xl">
          Software Developer • Systems Programming in C++ & AI Backend Engineering
        </p>

        {/* Concise Recruiter-friendly Bio */}
        <p className="text-xs sm:text-sm text-[#796557] dark:text-[#D3BEAA] max-w-2xl mb-6 leading-relaxed">
          Master of Computer Applications (MCA) graduate specializing in high-performance Layer-7 network packet inspection engines in C++, asynchronous Python/FastAPI backend architectures with LLM integration, and full-stack React systems. 200+ algorithmic problems solved on LeetCode.
        </p>

        {/* Primary and Secondary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8 w-full">
          {/* Primary CTA: Resume */}
          <a
            href="/my_resume.pdf"
            download="my_resume.pdf"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#B4532A] hover:bg-[#963F1E] dark:bg-[#D97745] dark:hover:bg-[#E48858] text-white font-semibold text-xs sm:text-sm shadow-md shadow-[#B4532A]/20 hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-95 select-none"
            aria-label="Download Tilak's Resume in PDF format"
          >
            <FileText className="w-4 h-4 text-white" />
            <span>Download Resume</span>
            <Download className="w-3.5 h-3.5 text-white" />
          </a>

          {/* Secondary CTA: Projects */}
          <button
            onClick={() => scrollToSection('projects')}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#FFFCF5] dark:bg-[#2D231D] hover:bg-[#F5EBDD] dark:hover:bg-[#382A21] border border-[#E7D5BE] dark:border-[#574234] text-[#35251C] dark:text-[#FFF5E8] font-semibold text-xs sm:text-sm shadow-2xs transition-all cursor-pointer"
          >
            <Briefcase className="w-4 h-4 text-[#B4532A] dark:text-[#D97745]" />
            <span>Explore Projects</span>
          </button>

          {/* Tertiary CTA: Ask AI Assistant */}
          <button
            onClick={() => onOpenChat ? onOpenChat() : onSelectPrompt('Give me an overview of Tilak\u0027s background and skills')}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#F5EBDD] dark:bg-[#211A16] hover:bg-[#FFFCF5] dark:hover:bg-[#2D231D] border border-[#E7D5BE] dark:border-[#574234] text-[#B4532A] dark:text-[#D97745] font-semibold text-xs sm:text-sm transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#E9A23B] dark:text-[#E9AD55]" />
            <span>Ask AI Assistant</span>
          </button>
        </div>

        {/* Mode Notification Banner if personalized */}
        {currentConfig && (
          <div className="w-full max-w-2xl px-3.5 py-2 rounded-xl bg-[#FFFCF5] dark:bg-[#2D231D] border border-[#E7D5BE] dark:border-[#574234] text-xs text-[#35251C] dark:text-[#FFF5E8] flex items-center justify-between gap-2 mb-6">
            <span className="flex items-center gap-1.5 truncate text-left">
              <Sparkles className="w-3.5 h-3.5 text-[#E9A23B] dark:text-[#E9AD55] flex-shrink-0" />
              <span>{currentConfig.bannerText}</span>
            </span>
            <button
              onClick={openSelector}
              className="text-[#B4532A] dark:text-[#D97745] font-semibold hover:underline flex-shrink-0 cursor-pointer"
            >
              Switch
            </button>
          </div>
        )}

        {/* Clean Interactive Prompt Suggestions Bar */}
        <div className="w-full max-w-3xl text-left">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-xs font-semibold text-[#796557] dark:text-[#D3BEAA] flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-[#B4532A] dark:text-[#D97745]" />
              Ask Tilak's AI Representative directly:
            </span>
            <span className="text-[11px] text-[#796557] dark:text-[#D3BEAA] hidden sm:inline">Click any prompt to ask</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {suggestedQuestions.map((promptText, index) => (
              <button
                key={index}
                onClick={() => onSelectPrompt(promptText)}
                className="group p-2.5 rounded-xl bg-[#FFFCF5] dark:bg-[#382A21] hover:bg-[#F5EBDD] dark:hover:bg-[#2D231D] border border-[#E7D5BE] dark:border-[#574234] hover:border-[#B4532A] dark:hover:border-[#D97745] shadow-2xs transition-all text-left flex items-center justify-between gap-2 cursor-pointer"
              >
                <span className="text-xs font-medium text-[#35251C] dark:text-[#FFF5E8] group-hover:text-[#B4532A] dark:group-hover:text-[#D97745] line-clamp-1">
                  "{promptText}"
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-[#796557] group-hover:text-[#B4532A] dark:text-[#D3BEAA] dark:group-hover:text-[#D97745] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>

      </section>

      {/* Main Portfolio Sections */}
      <div className="w-full px-4 sm:px-6">
        <PersonalizedPortfolio onAskQuestion={onSelectPrompt} />
      </div>

      {/* Clean Footer Note */}
      <footer className="mt-12 pt-6 border-t border-[#E7D5BE] dark:border-[#574234] w-full text-center text-xs text-[#796557] dark:text-[#D3BEAA] space-y-1">
        <p>© {new Date().getFullYear()} Tilak Shrivastava. AI portfolio assistant powered by FastAPI & Groq LLM.</p>
        <p className="text-[11px]">Indore, Madhya Pradesh, India • Ready to join immediately</p>
      </footer>

    </div>
  );
};

export default WelcomeScreen;
