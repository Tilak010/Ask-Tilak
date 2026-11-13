import React, { useState } from 'react';
import { Briefcase, Code, GraduationCap, Users, Sparkles, ArrowRight, X, Compass, CheckCircle2 } from 'lucide-react';
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
      accent: 'from-[#B4532A]/20 to-[#E9A23B]/20 border-[#B4532A]/40 hover:border-[#B4532A]',
      badgeBg: 'bg-[#F5EBDD] text-[#B4532A] dark:bg-[#382A21] dark:text-[#E9AD55] dark:border-[#574234]',
      highlights: 'Projects → Skills → Experience → Resume',
    },
    {
      id: 'developer',
      emoji: '👨‍💻',
      title: 'Developer',
      tagline: "I'm interested in your technical work and projects.",
      icon: Code,
      accent: 'from-[#B4532A]/20 to-[#E9AD55]/20 border-[#B4532A]/40 hover:border-[#D97745]',
      badgeBg: 'bg-[#F5EBDD] text-[#B4532A] dark:bg-[#382A21] dark:text-[#E9AD55] dark:border-[#574234]',
      highlights: 'Architecture → C++ Systems → Tech Stack → GitHub',
    },
    {
      id: 'student',
      emoji: '🎓',
      title: 'Student',
      tagline: 'I want to learn from your projects and experience.',
      icon: GraduationCap,
      accent: 'from-[#E9A23B]/20 to-[#B4532A]/20 border-[#E7D5BE] hover:border-[#B4532A]',
      badgeBg: 'bg-[#F5EBDD] text-[#B4532A] dark:bg-[#382A21] dark:text-[#E9AD55] dark:border-[#574234]',
      highlights: 'Learning Path → MCA Journey → DSA & Starter Projects',
    },
    {
      id: 'collaborator',
      emoji: '🤝',
      title: 'Collaborator',
      tagline: "I'm interested in working together.",
      icon: Users,
      accent: 'from-[#B4532A]/20 to-[#E9A23B]/20 border-[#B4532A]/40 hover:border-[#B4532A]',
      badgeBg: 'bg-[#F5EBDD] text-[#B4532A] dark:bg-[#382A21] dark:text-[#E9AD55] dark:border-[#574234]',
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
      <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#F5EBDD] dark:bg-[#2D231D] border border-[#E7D5BE] dark:border-[#574234] text-[#B4532A] dark:text-[#E9AD55] text-xs font-semibold mb-3.5 shadow-2xs">
        <Sparkles className="w-3.5 h-3.5 text-[#B4532A] dark:text-[#E9AD55] animate-pulse" />
        <span>Personalized Portfolio Experience</span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#35251C] dark:text-[#FFF5E8] tracking-tight mb-2">
        "Hi! What brings you here?"
      </h2>

      <p className="text-xs sm:text-sm text-[#796557] dark:text-[#D3BEAA] max-w-md mx-auto mb-5 sm:mb-6 leading-relaxed">
        Select a view below to personalize the sections, chatbot questions, and portfolio focus to match what matters to you most.
      </p>

      {/* 2x2 Grid on Desktop / Natural Stack on Mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 text-left mb-5">
        {roles.map((role) => {
          const isSelected = selectedId === role.id;
          const isCurrentActive = visitorMode === role.id;

          return (
            <button
              key={role.id}
              onClick={() => handleSelectRole(role.id)}
              disabled={isTransitioning}
              className={`group relative p-4 rounded-2xl border transition-all duration-200 cursor-pointer text-left flex flex-col justify-between ${
                isSelected
                  ? 'scale-[1.02] bg-[#FFFCF5] dark:bg-[#382A21] border-[#B4532A] dark:border-[#D97745] shadow-lg ring-2 ring-[#B4532A]/30'
                  : 'bg-[#FFFCF5]/80 dark:bg-[#382A21]/80 hover:bg-[#FFFCF5] dark:hover:bg-[#382A21] border-[#E7D5BE] dark:border-[#574234] hover:border-[#B4532A]/60 dark:hover:border-[#D97745]/60 shadow-2xs hover:shadow-md'
              }`}
            >
              {/* Header inside card: Emoji + Title + Active Tag */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2.5">
                  <span className="text-2xl" role="img" aria-label={role.title}>
                    {role.emoji}
                  </span>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#35251C] dark:text-[#FFF5E8] group-hover:text-[#B4532A] dark:group-hover:text-[#E9AD55] transition-colors flex items-center gap-1.5">
                      {role.title}
                    </h3>
                    <span className="text-[10px] text-[#796557] dark:text-[#D3BEAA] font-medium">
                      {role.highlights}
                    </span>
                  </div>
                </div>

                {isCurrentActive && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#F5EBDD] dark:bg-[#211A16] text-[#B4532A] dark:text-[#E9AD55] border border-[#E7D5BE] dark:border-[#574234]">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    Active
                  </span>
                )}
              </div>

              {/* Tagline quote */}
              <p className="text-xs text-[#796557] dark:text-[#D3BEAA] italic mb-3 font-normal leading-relaxed">
                "{role.tagline}"
              </p>

              {/* Bottom bar with action prompt */}
              <div className="flex items-center justify-between pt-2 border-t border-[#E7D5BE] dark:border-[#574234] text-[11px] font-semibold text-[#B4532A] dark:text-[#E9AD55] group-hover:text-[#963F1E] dark:group-hover:text-[#E48858]">
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
          className="text-xs text-[#796557] hover:text-[#35251C] dark:text-[#D3BEAA] dark:hover:text-white underline decoration-[#E7D5BE] dark:decoration-[#574234] underline-offset-4 py-1.5 px-3 rounded-lg hover:bg-[#F5EBDD] dark:hover:bg-[#2D231D] transition-all cursor-pointer inline-flex items-center gap-1.5"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Explore in Default / General Mode</span>
        </button>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
        <div className="relative w-full max-w-2xl bg-[#FFF8ED] dark:bg-[#211A16] rounded-3xl p-5 sm:p-7 shadow-2xl border border-[#E7D5BE] dark:border-[#574234] max-h-[90vh] overflow-y-auto">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl text-[#796557] hover:text-[#35251C] dark:text-[#D3BEAA] dark:hover:text-white hover:bg-[#F5EBDD] dark:hover:bg-[#2D231D] transition-colors cursor-pointer"
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
