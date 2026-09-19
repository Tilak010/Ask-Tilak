import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Briefcase, Code, GraduationCap, Users, RefreshCw, Sparkles, Check } from 'lucide-react';
import { useVisitorMode } from '../context/VisitorModeContext';

export const ViewSwitcher = ({ compact = false, showLabel = true }) => {
  const { visitorMode, setVisitorMode, resetToDefault, openSelector } = useVisitorMode();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    {
      id: 'recruiter',
      title: 'Recruiter View',
      shortTitle: 'Recruiter',
      emoji: '💼',
      icon: Briefcase,
      desc: 'Projects, skills, resume & experience',
    },
    {
      id: 'developer',
      title: 'Developer View',
      shortTitle: 'Developer',
      emoji: '👨‍💻',
      icon: Code,
      desc: 'Architecture, C++ systems, tech stack & code',
    },
    {
      id: 'student',
      title: 'Student View',
      shortTitle: 'Student',
      emoji: '🎓',
      icon: GraduationCap,
      desc: 'Learning path, MCA journey & DSA',
    },
    {
      id: 'collaborator',
      title: 'Collaborator View',
      shortTitle: 'Collaborator',
      emoji: '🤝',
      icon: Users,
      desc: 'Tech stack, active builds & direct contact',
    },
  ];

  // Close dropdown on outside click or escape
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const activeOption = options.find((opt) => opt.id === visitorMode);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border transition-all duration-200 cursor-pointer active:scale-95 focus:outline-hidden focus:ring-2 focus:ring-[#C65D3A]/30 ${
          activeOption
            ? 'bg-[#F7EDE3] dark:bg-[#3A2924] border-[#C65D3A]/40 dark:border-[#D96B45]/50 text-[#C65D3A] dark:text-[#F0B35A] shadow-2xs font-semibold'
            : 'bg-[#FFF8F0] dark:bg-[#30221E]/90 border-[#E8D5C7] dark:border-[#59433A] text-[#2D211D] dark:text-[#FFF4EA] hover:bg-[#F7EDE3] dark:hover:bg-[#3A2924]'
        }`}
        title="Change portfolio view mode"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="text-sm">
          {activeOption ? activeOption.emoji : '👤'}
        </span>
        {showLabel && (
          <span className="text-xs font-semibold truncate max-w-[90px] sm:max-w-none">
            {activeOption ? (compact ? activeOption.shortTitle : activeOption.title) : 'Change View'}
          </span>
        )}
        <ChevronDown className={`w-3.5 h-3.5 text-[#6F5B52] dark:text-[#D5C0B5] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Floating Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 sm:w-72 origin-top-right rounded-2xl bg-[#FFF8F0] dark:bg-[#30221E] border border-[#E8D5C7] dark:border-[#59433A] shadow-xl shadow-black/10 dark:shadow-black/60 z-50 p-1.5 focus:outline-hidden animate-fade-in divide-y divide-[#E8D5C7] dark:divide-[#59433A]">
          {/* Header Title inside Dropdown */}
          <div className="px-3 py-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6F5B52] dark:text-[#D5C0B5] block">
              Personalized View
            </span>
            <span className="text-xs text-[#2D211D] dark:text-[#FFF4EA]">
              Viewing portfolio tailored for:
            </span>
          </div>

          {/* 4 Roles List */}
          <div className="py-1 space-y-0.5">
            {options.map((option) => {
              const isSelected = visitorMode === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => {
                    setVisitorMode(option.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-start space-x-2.5 px-3 py-2 rounded-xl text-left text-xs transition-colors cursor-pointer group ${
                    isSelected
                      ? 'bg-[#FFF1E6] dark:bg-[#3A2924] text-[#C65D3A] dark:text-[#F0B35A] font-semibold'
                      : 'text-[#2D211D] dark:text-[#FFF4EA] hover:bg-[#F7EDE3] dark:hover:bg-[#3A2924]'
                  }`}
                >
                  <span className="text-base flex-shrink-0 mt-0.5">{option.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold group-hover:text-[#C65D3A] dark:group-hover:text-[#F0B35A]">
                        {option.title}
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#C65D3A] dark:text-[#F0B35A] flex-shrink-0" />}
                    </div>
                    <p className="text-[11px] text-[#6F5B52] dark:text-[#D5C0B5] truncate mt-0.5">
                      {option.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Actions: Default Mode & Full Selector */}
          <div className="pt-1.5 pb-1 space-y-1">
            <button
              onClick={() => {
                resetToDefault();
                setIsOpen(false);
              }}
              className={`w-full flex items-center space-x-2 px-3 py-1.5 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                visitorMode === 'default' || visitorMode === null
                  ? 'bg-[#F7EDE3] dark:bg-[#241A17] text-[#2D211D] dark:text-[#FFF4EA] font-semibold'
                  : 'text-[#6F5B52] dark:text-[#D5C0B5] hover:bg-[#F7EDE3] dark:hover:bg-[#3A2924] hover:text-[#2D211D] dark:hover:text-white'
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Reset to Default / Explore Mode</span>
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                openSelector();
              }}
              className="w-full flex items-center space-x-2 px-3 py-1.5 rounded-xl text-left text-xs text-[#C65D3A] dark:text-[#F0B35A] hover:bg-[#F7EDE3] dark:hover:bg-[#3A2924] transition-colors cursor-pointer font-medium"
            >
              <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Open Role Selection Screen</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewSwitcher;
