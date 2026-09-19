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
      accent: 'from-[#C65D3A]/20 to-[#E9A23B]/20 border-[#C65D3A]/40 hover:border-[#C65D3A]',
      badgeBg: 'bg-[#F7EDE3] text-[#C65D3A] dark:bg-[#3A2924] dark:text-[#F0B35A] dark:border-[#59433A]',
      highlights: 'Projects → Skills → Experience → Resume',
    },
    {
      id: 'developer',
      emoji: '👨‍💻',
      title: 'Developer',
      tagline: "I'm interested in your technical work and projects.",
      icon: Code,
      accent: 'from-[#C65D3A]/20 to-[#F0B35A]/20 border-[#C65D3A]/40 hover:border-[#D96B45]',
      badgeBg: 'bg-[#F7EDE3] text-[#C65D3A] dark:bg-[#3A2924] dark:text-[#F0B35A] dark:border-[#59433A]',
      highlights: 'Architecture → C++ Systems → Tech Stack → GitHub',
    },
    {
      id: 'student',
      emoji: '🎓',
      title: 'Student',
      tagline: 'I want to learn from your projects and experience.',
      icon: GraduationCap,
      accent: 'from-[#E9A23B]/20 to-[#C65D3A]/20 border-[#E8D5C7] hover:border-[#C65D3A]',
      badgeBg: 'bg-[#F7EDE3] text-[#C65D3A] dark:bg-[#3A2924] dark:text-[#F0B35A] dark:border-[#59433A]',
      highlights: 'Learning Path → MCA Journey → DSA & Starter Projects',
    },
    {
      id: 'collaborator',
      emoji: '🤝',
      title: 'Collaborator',
      tagline: "I'm interested in working together.",
      icon: Users,
      accent: 'from-[#C65D3A]/20 to-[#E9A23B]/20 border-[#C65D3A]/40 hover:border-[#C65D3A]',
      badgeBg: 'bg-[#F7EDE3] text-[#C65D3A] dark:bg-[#3A2924] dark:text-[#F0B35A] dark:border-[#59433A]',
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
      <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#F7EDE3] dark:bg-[#30221E] border border-[#E8D5C7] dark:border-[#59433A] text-[#C65D3A] dark:text-[#F0B35A] text-xs font-semibold mb-3.5 shadow-2xs">
        <Sparkles className="w-3.5 h-3.5 text-[#C65D3A] dark:text-[#F0B35A] animate-pulse" />
        <span>Personalized Portfolio Experience</span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D211D] dark:text-[#FFF4EA] tracking-tight mb-2">
        "Hi! What brings you here?"
      </h2>

      <p className="text-xs sm:text-sm text-[#6F5B52] dark:text-[#D5C0B5] max-w-md mx-auto mb-5 sm:mb-6 leading-relaxed">
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
                  ? 'scale-[1.02] bg-[#FFF1E6] dark:bg-[#3A2924] border-[#C65D3A] dark:border-[#D96B45] shadow-lg ring-2 ring-[#C65D3A]/30'
                  : 'bg-[#FFF1E6]/80 dark:bg-[#3A2924]/80 hover:bg-[#FFF1E6] dark:hover:bg-[#3A2924] border-[#E8D5C7] dark:border-[#59433A] hover:border-[#C65D3A]/60 dark:hover:border-[#D96B45]/60 shadow-2xs hover:shadow-md'
              }`}
            >
              {/* Header inside card: Emoji + Title + Active Tag */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2.5">
                  <span className="text-2xl" role="img" aria-label={role.title}>
                    {role.emoji}
                  </span>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#2D211D] dark:text-[#FFF4EA] group-hover:text-[#C65D3A] dark:group-hover:text-[#F0B35A] transition-colors flex items-center gap-1.5">
                      {role.title}
                    </h3>
                    <span className="text-[10px] text-[#6F5B52] dark:text-[#D5C0B5] font-medium">
                      {role.highlights}
                    </span>
                  </div>
                </div>

                {isCurrentActive && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#F7EDE3] dark:bg-[#241A17] text-[#C65D3A] dark:text-[#F0B35A] border border-[#E8D5C7] dark:border-[#59433A]">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    Active
                  </span>
                )}
              </div>

              {/* Tagline quote */}
              <p className="text-xs text-[#6F5B52] dark:text-[#D5C0B5] italic mb-3 font-normal leading-relaxed">
                "{role.tagline}"
              </p>

              {/* Bottom bar with action prompt */}
              <div className="flex items-center justify-between pt-2 border-t border-[#E8D5C7] dark:border-[#59433A] text-[11px] font-semibold text-[#C65D3A] dark:text-[#F0B35A] group-hover:text-[#A94A2E] dark:group-hover:text-[#E47B52]">
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
          className="text-xs text-[#6F5B52] hover:text-[#2D211D] dark:text-[#D5C0B5] dark:hover:text-white underline decoration-[#E8D5C7] dark:decoration-[#59433A] underline-offset-4 py-1.5 px-3 rounded-lg hover:bg-[#F7EDE3] dark:hover:bg-[#30221E] transition-all cursor-pointer inline-flex items-center gap-1.5"
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
        <div className="relative w-full max-w-2xl bg-[#FFF8F0] dark:bg-[#241A17] rounded-3xl p-5 sm:p-7 shadow-2xl border border-[#E8D5C7] dark:border-[#59433A] max-h-[90vh] overflow-y-auto">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl text-[#6F5B52] hover:text-[#2D211D] dark:text-[#D5C0B5] dark:hover:text-white hover:bg-[#F7EDE3] dark:hover:bg-[#30221E] transition-colors cursor-pointer"
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
