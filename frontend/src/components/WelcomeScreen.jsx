import React from 'react';
import FootballLogo from './FootballLogo';
import { Sparkles, Briefcase, Code, GraduationCap, ArrowRight } from 'lucide-react';

export const WelcomeScreen = ({ onSelectPrompt }) => {
  const promptSuggestions = [
    {
      icon: Code,
      title: 'Technical Skills',
      prompt: 'What are your core programming languages, frameworks, and technical skills?',
      badge: 'Skills',
    },
    {
      icon: Briefcase,
      title: 'Work & Experience',
      prompt: 'Can you summarize your past professional work experience and roles?',
      badge: 'Experience',
    },
    {
      icon: Sparkles,
      title: 'Featured Projects',
      prompt: 'Tell me about the key projects you have built and your contributions.',
      badge: 'Portfolio',
    },
    {
      icon: GraduationCap,
      title: 'Education & Background',
      prompt: 'What is your educational background and technical certifications?',
      badge: 'Background',
    },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-3.5 sm:p-6 text-center max-w-3xl mx-auto z-10 animate-fade-in my-auto w-full transition-colors duration-300">
      {/* Sleek Minimal Badge */}
      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-100/80 dark:bg-[#071a2f] border border-sky-200/80 dark:border-[#023e8a]/70 text-sky-800 dark:text-sky-300 text-[11px] sm:text-xs font-semibold mb-4 sm:mb-6 shadow-2xs dark:shadow-[#020b18]/40">
        <span className="w-2 h-2 rounded-full bg-sky-500 dark:bg-sky-400 animate-pulse"></span>
        <span className="flex items-center gap-1.5 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
          Tilak's AI Representative
        </span>
      </div>

      {/* Main Hero Emblem */}
      <div className="mb-4 sm:mb-5 relative group">
        <div className="absolute -inset-1.5 bg-gradient-to-r from-sky-400 to-blue-500 dark:from-[#023e8a] dark:to-[#0077b6] rounded-2xl blur-md opacity-25 dark:opacity-50 group-hover:opacity-40 dark:group-hover:opacity-75 transition duration-500"></div>
        <div className="relative bg-white dark:bg-[#071a2f] p-3 sm:p-3.5 rounded-2xl shadow-sm dark:shadow-[#020b18]/60 border border-sky-100 dark:border-[#023e8a]/60 flex items-center justify-center transition-colors">
          <FootballLogo size="lg" />
        </div>
      </div>

      {/* Title & Subtitle */}
      <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2 sm:mb-2.5 transition-colors">
        Your AI Assistant
      </h1>
      <p className="text-xs sm:text-lg text-slate-600 dark:text-slate-300 max-w-lg mb-5 sm:mb-8 leading-relaxed font-normal px-2 transition-colors">
        Ask anything. <span className="font-semibold text-sky-600 dark:text-sky-400">Let's kick off the conversation</span> about Tilak's background, skills, and projects.
      </p>

      {/* Suggestion Prompt Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 w-full max-w-2xl text-left">
        {promptSuggestions.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              onClick={() => onSelectPrompt(item.prompt)}
              className="group p-3.5 sm:p-4 bg-white dark:bg-[#071a2f]/90 hover:bg-sky-50/70 dark:hover:bg-[#0b2545] border border-sky-100 dark:border-[#023e8a]/50 hover:border-sky-300 dark:hover:border-[#0077b6] rounded-2xl shadow-2xs dark:shadow-[#020b18]/50 hover:shadow-md dark:hover:shadow-[#023e8a]/20 transition-all duration-200 flex flex-col justify-between cursor-pointer text-left"
            >
              <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                <div className="p-1.5 sm:p-2 rounded-xl bg-sky-50 dark:bg-[#023e8a]/40 text-sky-600 dark:text-sky-300 group-hover:bg-sky-600 dark:group-hover:bg-[#0077b6] group-hover:text-white transition-colors duration-200">
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#020b18] text-slate-500 dark:text-slate-300 border border-transparent dark:border-[#023e8a]/40 group-hover:bg-sky-200 dark:group-hover:bg-[#023e8a] group-hover:text-sky-900 dark:group-hover:text-white transition-colors">
                  {item.badge}
                </span>
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-white group-hover:text-sky-900 dark:group-hover:text-sky-300 transition-colors flex items-center justify-between">
                  {item.title}
                  <ArrowRight className="w-3.5 h-3.5 text-sky-400 dark:text-sky-300 opacity-70 sm:opacity-0 sm:group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-300 line-clamp-2 mt-0.5 sm:mt-1 font-normal transition-colors">
                  "{item.prompt}"
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Subtle Football Field Pitch Accent Footer */}
      <div className="mt-6 sm:mt-8 flex items-center justify-center space-x-2 text-[11px] sm:text-xs text-slate-400 dark:text-slate-400">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3v18" />
        </svg>
        <span className="truncate">Verified responses based on Tilak's resume & background</span>
      </div>
    </div>
  );
};

export default WelcomeScreen;
