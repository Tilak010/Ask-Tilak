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
      <section className="w-full pt-6 sm:pt-10 pb-8 px-4 sm:px-6 text-center flex flex-col items-center border-b border-[#E8D5C7] dark:border-[#59433A]">
        
        {/* Availability Badge & Role Tag */}
        <div className="flex items-center justify-center gap-2 mb-4 flex-wrap">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#FFF1E6] dark:bg-[#30221E] border border-[#E8D5C7] dark:border-[#59433A] text-[#C65D3A] dark:text-[#D96B45] text-xs font-semibold shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#E9A23B] dark:bg-[#F0B35A] animate-pulse"></span>
            <span>Available for Immediate Hire</span>
          </div>

          <button
            onClick={openSelector}
            className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#F7EDE3] hover:bg-[#FFF1E6] dark:bg-[#30221E] dark:hover:bg-[#3A2924] border border-[#E8D5C7] dark:border-[#59433A] text-[#2D211D] dark:text-[#FFF4EA] text-xs font-medium transition-colors cursor-pointer"
            title="Personalize portfolio view for your background"
          >
            <span>Viewing: <strong className="font-semibold text-[#C65D3A] dark:text-[#D96B45]">{currentConfig ? currentConfig.title : 'General'}</strong></span>
            <ChevronDown className="w-3 h-3 text-[#6F5B52] dark:text-[#D5C0B5]" />
          </button>
        </div>

        {/* Candidate Name & Title */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#2D211D] dark:text-[#FFF4EA] tracking-tight mb-3">
          Tilak Shrivastava
        </h1>

        <p className="text-base sm:text-lg font-semibold text-[#C65D3A] dark:text-[#D96B45] mb-3 max-w-2xl">
          Software Developer • Systems Programming in C++ & AI Backend Engineering
        </p>

        {/* Concise Recruiter-friendly Bio */}
        <p className="text-xs sm:text-sm text-[#6F5B52] dark:text-[#D5C0B5] max-w-2xl mb-6 leading-relaxed">
          Master of Computer Applications (MCA) graduate specializing in high-performance Layer-7 network packet inspection engines in C++, asynchronous Python/FastAPI backend architectures with LLM integration, and full-stack React systems. 200+ algorithmic problems solved on LeetCode.
        </p>

        {/* Primary and Secondary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8 w-full">
          {/* Primary CTA: Resume */}
          <a
            href="/my_resume.pdf"
            download="my_resume.pdf"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#C65D3A] hover:bg-[#A94A2E] dark:bg-[#D96B45] dark:hover:bg-[#E47B52] text-white font-semibold text-xs sm:text-sm shadow-md shadow-[#C65D3A]/20 hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-95 select-none"
            aria-label="Download Tilak's Resume in PDF format"
          >
            <FileText className="w-4 h-4 text-white" />
            <span>Download Resume</span>
            <Download className="w-3.5 h-3.5 text-white" />
          </a>

          {/* Secondary CTA: Projects */}
          <button
            onClick={() => scrollToSection('projects')}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#FFF1E6] dark:bg-[#30221E] hover:bg-[#F7EDE3] dark:hover:bg-[#3A2924] border border-[#E8D5C7] dark:border-[#59433A] text-[#2D211D] dark:text-[#FFF4EA] font-semibold text-xs sm:text-sm shadow-2xs transition-all cursor-pointer"
          >
            <Briefcase className="w-4 h-4 text-[#C65D3A] dark:text-[#D96B45]" />
            <span>Explore Projects</span>
          </button>

          {/* Tertiary CTA: Ask AI Assistant */}
          <button
            onClick={() => onOpenChat ? onOpenChat() : onSelectPrompt('Give me an overview of Tilak’s background and skills')}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#F7EDE3] dark:bg-[#241A17] hover:bg-[#FFF1E6] dark:hover:bg-[#30221E] border border-[#E8D5C7] dark:border-[#59433A] text-[#C65D3A] dark:text-[#D96B45] font-semibold text-xs sm:text-sm transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#E9A23B] dark:text-[#F0B35A]" />
            <span>Ask AI Assistant</span>
          </button>
        </div>

        {/* Mode Notification Banner if personalized */}
        {currentConfig && (
          <div className="w-full max-w-2xl px-3.5 py-2 rounded-xl bg-[#FFF1E6] dark:bg-[#30221E] border border-[#E8D5C7] dark:border-[#59433A] text-xs text-[#2D211D] dark:text-[#FFF4EA] flex items-center justify-between gap-2 mb-6">
            <span className="flex items-center gap-1.5 truncate text-left">
              <Sparkles className="w-3.5 h-3.5 text-[#E9A23B] dark:text-[#F0B35A] flex-shrink-0" />
              <span>{currentConfig.bannerText}</span>
            </span>
            <button
              onClick={openSelector}
              className="text-[#C65D3A] dark:text-[#D96B45] font-semibold hover:underline flex-shrink-0 cursor-pointer"
            >
              Switch
            </button>
          </div>
        )}

        {/* Clean Interactive Prompt Suggestions Bar */}
        <div className="w-full max-w-3xl text-left">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-xs font-semibold text-[#6F5B52] dark:text-[#D5C0B5] flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-[#C65D3A] dark:text-[#D96B45]" />
              Ask Tilak's AI Representative directly:
            </span>
            <span className="text-[11px] text-[#6F5B52] dark:text-[#D5C0B5] hidden sm:inline">Click any prompt to ask</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {suggestedQuestions.map((promptText, index) => (
              <button
                key={index}
                onClick={() => onSelectPrompt(promptText)}
                className="group p-2.5 rounded-xl bg-[#FFF1E6] dark:bg-[#3A2924] hover:bg-[#F7EDE3] dark:hover:bg-[#30221E] border border-[#E8D5C7] dark:border-[#59433A] hover:border-[#C65D3A] dark:hover:border-[#D96B45] shadow-2xs transition-all text-left flex items-center justify-between gap-2 cursor-pointer"
              >
                <span className="text-xs font-medium text-[#2D211D] dark:text-[#FFF4EA] group-hover:text-[#C65D3A] dark:group-hover:text-[#D96B45] line-clamp-1">
                  "{promptText}"
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-[#6F5B52] group-hover:text-[#C65D3A] dark:text-[#D5C0B5] dark:group-hover:text-[#D96B45] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
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
      <footer className="mt-12 pt-6 border-t border-[#E8D5C7] dark:border-[#59433A] w-full text-center text-xs text-[#6F5B52] dark:text-[#D5C0B5] space-y-1">
        <p>© {new Date().getFullYear()} Tilak Shrivastava. AI portfolio assistant powered by FastAPI & Groq LLM.</p>
        <p className="text-[11px]">Indore, Madhya Pradesh, India • Ready to join immediately</p>
      </footer>

    </div>
  );
};

export default WelcomeScreen;
