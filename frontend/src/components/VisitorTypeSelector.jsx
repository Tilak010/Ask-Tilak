import React, { useState } from 'react';
import { Briefcase, Code, GraduationCap, Users, Sparkles, ArrowRight, X, Compass, CheckCircle2 } from 'lucide-react';
import { MODE_CONFIGS } from '../data/portfolioData';
import { useVisitorMode } from '../context/VisitorModeContext';

export const VisitorTypeSelector = ({ isModal = false, onClose }) => {
  const { visitorMode, setVisitorMode, resetToDefault } = useVisitorMode();
  const [selectedId, setSelectedId] = useState(visitorMode || null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const roles = [
    {
      id: 'recruiter',
      emoji: '💼',
      title: 'Recruiter',
      tagline: "I'm here to explore your profile for hiring.",
      icon: Briefcase,
      accent: 'from-blue-600/20 to-sky-500/20 border-blue-500/40 hover:border-blue-400',
      badgeBg: 'bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300 dark:border-blue-800/60',
      glow: 'group-hover:shadow-blue-500/20',
      highlights: 'Projects → Skills → Experience → Resume',
    },
    {
      id: 'developer',
      emoji: '👨‍💻',
      title: 'Developer',
      tagline: "I'm interested in your technical work and projects.",
      icon: Code,
      accent: 'from-emerald-600/20 to-teal-500/20 border-emerald-500/40 hover:border-emerald-400',
      badgeBg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-800/60',
      glow: 'group-hover:shadow-emerald-500/20',
      highlights: 'Architecture → C++ Systems → Tech Stack → GitHub',
    },
    {
      id: 'student',
      emoji: '🎓',
      title: 'Student',
      tagline: 'I want to learn from your projects and experience.',
      icon: GraduationCap,
      accent: 'from-purple-600/20 to-indigo-500/20 border-purple-500/40 hover:border-purple-400',
      badgeBg: 'bg-purple-100 text-purple-800 dark:bg-purple-950/70 dark:text-purple-300 dark:border-purple-800/60',
      glow: 'group-hover:shadow-purple-500/20',
      highlights: 'Learning Path → MCA Journey → DSA & Starter Projects',
    },
    {
      id: 'collaborator',
      emoji: '🤝',
      title: 'Collaborator',
      tagline: "I'm interested in working together.",
      icon: Users,
      accent: 'from-amber-600/20 to-orange-500/20 border-amber-500/40 hover:border-amber-400',
      badgeBg: 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-800/60',
      glow: 'group-hover:shadow-amber-500/20',
      highlights: 'Tech Interests → Direct Contact → Active Builds',
    },
  ];

  const handleSelectRole = (roleId) => {
    setSelectedId(roleId);
    setIsTransitioning(true);

    setTimeout(() => {
      setVisitorMode(roleId);
      setIsTransitioning(false);
      if (onClose) onClose();
    }, 280);
  };

  const handleDefaultMode = () => {
    resetToDefault();
    if (onClose) onClose();
  };

  const content = (
    <div className="w-full max-w-2xl mx-auto text-center animate-fade-in">
      {/* Bot Greeting Header */}
      <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-sky-100/90 dark:bg-[#071a2f] border border-sky-200/80 dark:border-[#023e8a]/70 text-sky-800 dark:text-sky-300 text-xs font-semibold mb-3.5 shadow-2xs">
        <Sparkles className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 animate-pulse" />
        <span>Personalized Portfolio Experience</span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
        "Hi! What brings you here?"
      </h2>

      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-5 sm:mb-6 leading-relaxed">
        Select a view below to personalize the sections, chatbot questions, and portfolio focus to match what matters to you most.
      </p>

      {/* 2x2 Grid on Desktop / Natural Stack on Mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 text-left mb-5">
        {roles.map((role) => {
          const isSelected = selectedId === role.id;
          const isCurrentActive = visitorMode === role.id;
          const Icon = role.icon;

          return (
            <button
              key={role.id}
              onClick={() => handleSelectRole(role.id)}
              disabled={isTransitioning}
              className={`group relative p-4 rounded-2xl border transition-all duration-200 cursor-pointer text-left flex flex-col justify-between ${
                isSelected
                  ? 'scale-[1.02] bg-white dark:bg-[#071a2f] border-sky-500 dark:border-sky-400 shadow-lg ring-2 ring-sky-400/40'
                  : 'bg-white/90 dark:bg-[#071a2f]/80 hover:bg-white dark:hover:bg-[#0b2545] border-slate-200 dark:border-[#023e8a]/50 hover:border-sky-300 dark:hover:border-[#0077b6] shadow-2xs hover:shadow-md'
              } ${role.glow}`}
            >
              {/* Header inside card: Emoji + Title + Active Tag */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2.5">
                  <span className="text-2xl" role="img" aria-label={role.title}>
                    {role.emoji}
                  </span>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors flex items-center gap-1.5">
                      {role.title}
                    </h3>
                    <span className="text-[10px] text-slate-400 dark:text-slate-400 font-medium">
                      {role.highlights}
                    </span>
                  </div>
                </div>

                {isCurrentActive && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-700/60">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    Active
                  </span>
                )}
              </div>

              {/* Tagline quote */}
              <p className="text-xs text-slate-600 dark:text-slate-300 italic mb-3 font-normal leading-relaxed">
                "{role.tagline}"
              </p>

              {/* Bottom bar with action prompt */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-[#023e8a]/30 text-[11px] font-semibold text-sky-600 dark:text-sky-400 group-hover:text-sky-700 dark:group-hover:text-sky-300">
                <span>Activate {role.title} View</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Default / Explore Mode Option */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-1">
        <button
          onClick={handleDefaultMode}
          className="text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 underline decoration-slate-300 dark:decoration-slate-600 underline-offset-4 py-1.5 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-[#071a2f] transition-all cursor-pointer inline-flex items-center gap-1.5"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Explore in Default / General Mode</span>
        </button>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/75 backdrop-blur-sm animate-fade-in">
        <div className="relative w-full max-w-2xl bg-white dark:bg-[#041327] rounded-3xl p-5 sm:p-7 shadow-2xl border border-sky-100 dark:border-[#023e8a]/70 max-h-[90vh] overflow-y-auto">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#071a2f] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {content}
        </div>
      </div>
    );
  }

  return content;
};

export default VisitorTypeSelector;
