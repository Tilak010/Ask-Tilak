import React from 'react';
import FootballLogo from './FootballLogo';
import VisitorTypeSelector from './VisitorTypeSelector';
import PersonalizedPortfolio from './PersonalizedPortfolio';
import { 
  Sparkles, 
  Briefcase, 
  Code, 
  GraduationCap, 
  Users, 
  ArrowRight, 
  FileText, 
  Download, 
  MessageSquare, 
  RefreshCw, 
  CheckCircle2, 
  ChevronDown,
  ExternalLink,
  Cpu,
  Mail
} from 'lucide-react';
import { MODE_CONFIGS, DEFAULT_SUGGESTIONS } from '../data/portfolioData';
import { useVisitorMode } from '../context/VisitorModeContext';

export const WelcomeScreen = ({ onSelectPrompt }) => {
  const { visitorMode, openSelector, resetToDefault, isFirstVisit } = useVisitorMode();
  const currentConfig = visitorMode && MODE_CONFIGS[visitorMode];

  // If first visit and no mode selected yet, present the "Hi! What brings you here?" card screen
  if (isFirstVisit) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-3.5 sm:p-6 text-center max-w-3xl mx-auto z-10 animate-fade-in my-auto w-full transition-colors duration-300">
        {/* Tilak Emblem */}
        <div className="mb-4 sm:mb-5 relative group">
          <div className="absolute -inset-1.5 bg-gradient-to-r from-sky-400 to-blue-500 dark:from-[#023e8a] dark:to-[#0077b6] rounded-2xl blur-md opacity-25 dark:opacity-50 group-hover:opacity-40 transition duration-500"></div>
          <div className="relative bg-white dark:bg-[#071a2f] p-3 sm:p-3.5 rounded-2xl shadow-sm dark:shadow-[#020b18]/60 border border-sky-100 dark:border-[#023e8a]/60 flex items-center justify-center">
            <FootballLogo size="lg" />
          </div>
        </div>

        {/* Visitor Type Selector Component */}
        <VisitorTypeSelector isModal={false} />
      </div>
    );
  }

  // Get active suggested questions
  const suggestedQuestions = currentConfig
    ? currentConfig.suggestedQuestions
    : DEFAULT_SUGGESTIONS.map((d) => d.prompt);

  const getPrimaryCta = () => {
    if (!currentConfig) {
      return (
        <a
          href="/my_resume.pdf"
          download="my_resume.pdf"
          className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 dark:from-[#023e8a] dark:to-[#0077b6] dark:hover:from-[#0353a4] dark:hover:to-[#0096c7] text-white font-semibold text-xs sm:text-sm shadow-md shadow-sky-600/20 dark:shadow-[#023e8a]/40 hover:shadow-lg border border-sky-400/20 dark:border-sky-400/30 transition-all duration-200 cursor-pointer active:scale-95 select-none"
        >
          <FileText className="w-4 h-4 text-sky-200 group-hover:text-white" />
          <span>Download Resume</span>
          <Download className="w-3.5 h-3.5 text-sky-200 group-hover:translate-y-0.5 transition-transform" />
        </a>
      );
    }

    switch (visitorMode) {
      case 'recruiter':
        return (
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="/my_resume.pdf"
              download="my_resume.pdf"
              className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-blue-500/25 border border-blue-400/30 transition-all duration-200 cursor-pointer active:scale-95 select-none"
            >
              <FileText className="w-4 h-4 text-white" />
              <span>Download Resume (PDF)</span>
              <Download className="w-3.5 h-3.5 text-white group-hover:translate-y-0.5 transition-transform" />
            </a>
            <button
              onClick={() => onSelectPrompt('Why would Tilak be a good fit for a software development role?')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl sm:rounded-2xl bg-white dark:bg-[#071a2f] border border-blue-300 dark:border-[#023e8a] text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-semibold hover:bg-blue-50 dark:hover:bg-[#0b2545] transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span>Why Tilak is a Great Fit</span>
            </button>
          </div>
        );

      case 'developer':
        return (
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                const el = document.getElementById('portfolio-section-architecture');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-emerald-500/25 border border-emerald-400/30 transition-all duration-200 cursor-pointer active:scale-95"
            >
              <Cpu className="w-4 h-4 text-white" />
              <span>Explore System Architecture</span>
              <ArrowRight className="w-3.5 h-3.5 text-white group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onSelectPrompt('Explain your most technically challenging project and architecture.')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl sm:rounded-2xl bg-white dark:bg-[#071a2f] border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-semibold hover:bg-emerald-50 dark:hover:bg-[#0b2545] transition-all cursor-pointer"
            >
              <Code className="w-4 h-4 text-emerald-500" />
              <span>Deep-Dive Technical Challenge</span>
            </button>
          </div>
        );

      case 'student':
        return (
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onSelectPrompt('What advice would you give to someone starting programming and learning DSA?')}
              className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-purple-500/25 border border-purple-400/30 transition-all duration-200 cursor-pointer active:scale-95"
            >
              <GraduationCap className="w-4 h-4 text-white" />
              <span>Learning Advice & Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5 text-white group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onSelectPrompt('Which project should I explore first to learn?')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl sm:rounded-2xl bg-white dark:bg-[#071a2f] border border-purple-300 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs sm:text-sm font-semibold hover:bg-purple-50 dark:hover:bg-[#0b2545] transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span>Starter Projects to Study</span>
            </button>
          </div>
        );

      case 'collaborator':
        return (
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="mailto:shrivastavatilak@gmail.com"
              className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-amber-500/25 border border-amber-400/30 transition-all duration-200 cursor-pointer active:scale-95"
            >
              <Mail className="w-4 h-4 text-white" />
              <span>Get In Touch to Collaborate</span>
              <ExternalLink className="w-3.5 h-3.5 text-white" />
            </a>
            <button
              onClick={() => onSelectPrompt('Would you be interested in collaborating on a project?')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl sm:rounded-2xl bg-white dark:bg-[#071a2f] border border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs sm:text-sm font-semibold hover:bg-amber-50 dark:hover:bg-[#0b2545] transition-all cursor-pointer"
            >
              <Users className="w-4 h-4 text-amber-500" />
              <span>Ask AI About Collaborations</span>
            </button>
          </div>
        );

      default:
        return (
          <a
            href="/my_resume.pdf"
            download="my_resume.pdf"
            className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 dark:from-[#023e8a] dark:to-[#0077b6] dark:hover:from-[#0353a4] dark:hover:to-[#0096c7] text-white font-semibold text-xs sm:text-sm shadow-md transition-all cursor-pointer active:scale-95 select-none"
          >
            <FileText className="w-4 h-4 text-sky-200" />
            <span>Download Resume</span>
            <Download className="w-3.5 h-3.5 text-sky-200 group-hover:translate-y-0.5 transition-transform" />
          </a>
        );
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-start p-3 sm:p-5 text-center max-w-4xl mx-auto z-10 animate-fade-in w-full transition-colors duration-300 pb-16">
      
      {/* Top Mode Badge & Switcher */}
      <div className="flex items-center justify-center gap-2 mb-4 flex-wrap">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-100/80 dark:bg-[#071a2f] border border-sky-200/80 dark:border-[#023e8a]/70 text-sky-800 dark:text-sky-300 text-[11px] sm:text-xs font-semibold shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-sky-500 dark:bg-sky-400 animate-pulse"></span>
          <span className="flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            Tilak's AI Representative
          </span>
        </div>

        {currentConfig ? (
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white dark:bg-[#041327] border border-slate-200 dark:border-[#023e8a]/60 text-slate-700 dark:text-slate-200 text-[11px] sm:text-xs font-semibold shadow-2xs">
            <span>{currentConfig.badge} Active</span>
            <button
              onClick={openSelector}
              className="text-sky-600 dark:text-sky-400 hover:underline cursor-pointer pl-1"
            >
              (Change View)
            </button>
          </div>
        ) : (
          <button
            onClick={openSelector}
            className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white dark:bg-[#041327] border border-sky-200 dark:border-[#023e8a]/60 text-sky-700 dark:text-sky-300 text-[11px] sm:text-xs font-semibold shadow-2xs hover:bg-sky-50 dark:hover:bg-[#0b2545] transition-colors cursor-pointer"
          >
            <span>Personalize Experience</span>
            <ChevronDown className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Hero Emblem */}
      <div className="mb-3 sm:mb-4 relative group">
        <div className="absolute -inset-1.5 bg-gradient-to-r from-sky-400 to-blue-500 dark:from-[#023e8a] dark:to-[#0077b6] rounded-2xl blur-md opacity-25 dark:opacity-50 group-hover:opacity-40 transition duration-500"></div>
        <div className="relative bg-white dark:bg-[#071a2f] p-3 rounded-2xl shadow-sm dark:shadow-[#020b18]/60 border border-sky-100 dark:border-[#023e8a]/60 flex items-center justify-center transition-colors">
          <FootballLogo size="md" />
        </div>
      </div>

      {/* Title & Personalized Tagline */}
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2 transition-colors">
        {currentConfig ? `${currentConfig.title} Experience` : 'Your AI Portfolio Assistant'}
      </h1>

      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-lg mb-4 leading-relaxed font-normal px-2">
        {currentConfig
          ? currentConfig.bannerText
          : "Ask anything about Tilak's background, high-performance systems in C++, FastAPI backends, and full-stack projects."}
      </p>

      {/* Dynamic Primary CTA Section */}
      <div className="mb-6 w-full px-2 flex items-center justify-center">
        {getPrimaryCta()}
      </div>

      {/* Suggested Questions Header */}
      <div className="w-full max-w-3xl text-left mb-2 px-1 flex items-center justify-between">
        <div className="flex items-center space-x-1.5">
          <MessageSquare className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {currentConfig ? `${currentConfig.title} Suggested Questions` : 'Suggested Questions'}
          </h2>
        </div>
        <span className="text-[10px] text-slate-400 dark:text-slate-400">
          Click any prompt to ask
        </span>
      </div>

      {/* Tailored Suggested Questions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 w-full max-w-3xl text-left mb-6">
        {suggestedQuestions.map((promptText, index) => (
          <button
            key={index}
            onClick={() => onSelectPrompt(promptText)}
            className="group p-3 bg-white dark:bg-[#071a2f]/90 hover:bg-sky-50/70 dark:hover:bg-[#0b2545] border border-sky-100 dark:border-[#023e8a]/50 hover:border-sky-300 dark:hover:border-[#0077b6] rounded-xl shadow-2xs hover:shadow-xs transition-all duration-200 flex flex-col justify-between cursor-pointer text-left"
          >
            <div className="flex items-start justify-between gap-1 mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 px-1.5 py-0.5 rounded bg-sky-50 dark:bg-[#023e8a]/40">
                Q{index + 1}
              </span>
              <ArrowRight className="w-3 h-3 text-sky-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </div>
            <p className="text-xs font-medium text-slate-700 dark:text-slate-200 group-hover:text-sky-900 dark:group-hover:text-white line-clamp-2">
              "{promptText}"
            </p>
          </button>
        ))}
      </div>

      {/* Personalized Portfolio Content Showcase */}
      <PersonalizedPortfolio onAskQuestion={onSelectPrompt} />

      {/* Footer Accent */}
      <div className="mt-8 flex items-center justify-center space-x-2 text-[11px] sm:text-xs text-slate-400 dark:text-slate-400">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3v18" />
        </svg>
        <span className="truncate">Responses generated live using grounded knowledgebase & resume</span>
      </div>

    </div>
  );
};

export default WelcomeScreen;
