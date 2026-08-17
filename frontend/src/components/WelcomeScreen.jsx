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
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-3xl mx-auto z-10 animate-fade-in my-auto">
      {/* Sleek Minimal Badge */}
      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-100/80 border border-sky-200/80 text-sky-800 text-xs font-semibold mb-6 shadow-2xs">
        <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
        <span className="flex items-center gap-1.5 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          Tilak's AI Representative
        </span>
      </div>

      {/* Main Hero Emblem */}
      <div className="mb-5 relative group">
        <div className="absolute -inset-1.5 bg-gradient-to-r from-sky-400 to-blue-500 rounded-2xl blur-md opacity-25 group-hover:opacity-40 transition duration-500"></div>
        <div className="relative bg-white p-3.5 rounded-2xl shadow-sm border border-sky-100 flex items-center justify-center">
          <FootballLogo size="lg" />
        </div>
      </div>

      {/* Title & Subtitle */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2.5">
        Your AI Assistant
      </h1>
      <p className="text-base sm:text-lg text-slate-600 max-w-lg mb-8 leading-relaxed font-normal">
        Ask anything. <span className="font-semibold text-sky-600">Let's kick off the conversation</span> about Tilak's background, skills, and projects.
      </p>

      {/* Suggestion Prompt Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl text-left">
        {promptSuggestions.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              onClick={() => onSelectPrompt(item.prompt)}
              className="group p-4 bg-white hover:bg-sky-50/70 border border-sky-100 hover:border-sky-300 rounded-2xl shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded-xl bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors duration-200">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 group-hover:bg-sky-200 group-hover:text-sky-900 transition-colors">
                  {item.badge}
                </span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-800 group-hover:text-sky-900 transition-colors flex items-center justify-between">
                  {item.title}
                  <ArrowRight className="w-3.5 h-3.5 text-sky-400 group-hover:translate-x-1 transition-transform opacity-0 group-hover:opacity-100" />
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1 font-normal">
                  "{item.prompt}"
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Subtle Football Field Pitch Accent Footer */}
      <div className="mt-8 flex items-center justify-center space-x-2 text-xs text-slate-400">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3v18" />
        </svg>
        <span>Verified responses based on Tilak's resume & background</span>
      </div>
    </div>
  );
};

export default WelcomeScreen;
