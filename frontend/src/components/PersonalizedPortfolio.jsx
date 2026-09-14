import React, { useState } from 'react';
import { 
  Briefcase, 
  Code, 
  GraduationCap, 
  Users, 
  Terminal, 
  Server, 
  ExternalLink, 
  FileText, 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  Cpu, 
  Layers, 
  Award, 
  MessageSquare, 
  ChevronRight, 
  Sparkles,
  ArrowUpRight,
  GitBranch,
  ShieldCheck
} from 'lucide-react';
import { 
  PROJECTS_DATA, 
  SKILLS_DATA, 
  ARCHITECTURE_HIGHLIGHTS, 
  EDUCATION_DATA, 
  LEETCODE_ACHIEVEMENT, 
  CONTACT_INFO,
  MODE_CONFIGS 
} from '../data/portfolioData';
import { useVisitorMode } from '../context/VisitorModeContext';

export const PersonalizedPortfolio = ({ onAskQuestion }) => {
  const { visitorMode } = useVisitorMode();
  const [activeTab, setActiveTab] = useState('all');

  // Determine section order based on mode
  const getSectionOrder = () => {
    switch (visitorMode) {
      case 'recruiter':
        return ['projects', 'skills', 'experience', 'resume', 'achievements', 'contact'];
      case 'developer':
        return ['projects', 'architecture', 'skills', 'github', 'experience'];
      case 'student':
        return ['projects', 'skills', 'learning', 'education', 'achievements'];
      case 'collaborator':
        return ['contact', 'projects', 'skills', 'experience'];
      default:
        return ['projects', 'skills', 'architecture', 'education', 'achievements', 'contact'];
    }
  };

  const sectionOrder = getSectionOrder();

  // Reorder projects based on mode priority
  const getOrderedProjects = () => {
    const config = visitorMode && MODE_CONFIGS[visitorMode];
    if (!config || !config.featuredProjectIds) return PROJECTS_DATA;

    const featured = PROJECTS_DATA.filter((p) => config.featuredProjectIds.includes(p.id));
    const others = PROJECTS_DATA.filter((p) => !config.featuredProjectIds.includes(p.id));
    return [...featured, ...others];
  };

  const orderedProjects = getOrderedProjects();

  const scrollToSection = (id) => {
    const el = document.getElementById(`portfolio-section-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-6 text-left space-y-8 animate-fade-in transition-all">
      
      {/* Dynamic Navigation Pills / Quick Jump based on mode priority */}
      <div className="sticky top-2 z-20 bg-white/90 dark:bg-[#071a2f]/90 backdrop-blur-md p-2 rounded-2xl border border-sky-100 dark:border-[#023e8a]/50 shadow-xs flex items-center justify-between gap-1.5 overflow-x-auto text-xs">
        <div className="flex items-center gap-1.5 min-w-max">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 px-2">
            Priority Flow:
          </span>
          {sectionOrder.map((sectionKey, idx) => {
            const sectionNames = {
              projects: 'Projects',
              skills: 'Skills',
              experience: 'Experience',
              resume: 'Resume',
              achievements: 'LeetCode & DSA',
              contact: 'Contact',
              architecture: 'Architecture',
              learning: 'Learning Path',
              education: 'Education',
              github: 'Code & Systems',
            };
            return (
              <button
                key={sectionKey}
                onClick={() => scrollToSection(sectionKey)}
                className={`px-3 py-1 rounded-xl font-medium transition-all cursor-pointer flex items-center gap-1 ${
                  idx === 0
                    ? 'bg-sky-600 dark:bg-[#023e8a] text-white shadow-xs font-semibold'
                    : 'bg-slate-100 dark:bg-[#020b18] text-slate-600 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-[#0b2545]'
                }`}
              >
                <span>{sectionNames[sectionKey] || sectionKey}</span>
                {idx === 0 && <span className="text-[10px] opacity-80 font-normal">• Top Priority</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Sections in Dynamic Order */}
      {sectionOrder.map((sectionKey) => {
        switch (sectionKey) {
          case 'projects':
            return (
              <section
                key="projects"
                id="portfolio-section-projects"
                className="scroll-mt-16 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#023e8a]/40 pb-2.5">
                  <div className="flex items-center space-x-2">
                    <span className="p-1.5 rounded-lg bg-sky-100 dark:bg-[#023e8a]/40 text-sky-600 dark:text-sky-300">
                      <Briefcase className="w-4 h-4" />
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Featured Engineering Projects
                    </h3>
                  </div>
                  <span className="text-xs text-sky-600 dark:text-sky-400 font-semibold">
                    {visitorMode ? `${MODE_CONFIGS[visitorMode]?.title || 'Custom'} Order` : 'All Projects'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {orderedProjects.map((project, idx) => {
                    const isTopPriority = idx === 0;
                    return (
                      <div
                        key={project.id}
                        className={`group relative p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#071a2f] border transition-all duration-200 flex flex-col justify-between ${
                          isTopPriority
                            ? 'border-sky-400 dark:border-[#0077b6] shadow-md shadow-sky-500/10 dark:shadow-[#023e8a]/30 ring-1 ring-sky-400/20'
                            : 'border-slate-200 dark:border-[#023e8a]/40 hover:border-sky-300 dark:hover:border-[#0077b6]'
                        }`}
                      >
                        <div>
                          {/* Category Tag & Badges */}
                          <div className="flex items-center justify-between mb-2 flex-wrap gap-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-sky-50 dark:bg-[#020b18] text-sky-700 dark:text-sky-300 border border-sky-200/60 dark:border-[#023e8a]/50">
                              {project.category}
                            </span>
                            <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                              {project.highlightTag}
                            </span>
                          </div>

                          <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors">
                            {project.title}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mb-2.5 font-medium">
                            {project.subtitle}
                          </p>

                          <p className="text-xs text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
                            {project.description}
                          </p>

                          {/* Mode-Tailored Relevance Callout */}
                          {visitorMode && project.relevance[visitorMode] && (
                            <div className="p-2.5 rounded-xl bg-sky-50/70 dark:bg-[#020b18]/70 border border-sky-100 dark:border-[#023e8a]/40 text-xs mb-3">
                              <span className="font-semibold text-sky-800 dark:text-sky-300 block text-[11px] mb-0.5">
                                💡 Why this matters for {MODE_CONFIGS[visitorMode]?.title}:
                              </span>
                              <span className="text-slate-600 dark:text-slate-300 text-[11px]">
                                {project.relevance[visitorMode]}
                              </span>
                            </div>
                          )}

                          {/* Architecture Note if in Developer view */}
                          {visitorMode === 'developer' && project.architectureDetails && (
                            <div className="p-2.5 rounded-xl bg-slate-900 text-emerald-300 font-mono text-[11px] mb-3 border border-emerald-900/40">
                              <span className="text-emerald-400 font-bold block mb-1">Architecture Details:</span>
                              {project.architectureDetails}
                            </div>
                          )}

                          {/* Tech Stack Badges */}
                          <div className="flex flex-wrap gap-1 mb-3">
                            {project.techStack.map((tech) => (
                              <span
                                key={tech}
                                className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#020b18] text-slate-600 dark:text-slate-300 font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Card Footer: Ask AI Chip */}
                        <div className="pt-2 border-t border-slate-100 dark:border-[#023e8a]/30 flex items-center justify-between">
                          <button
                            onClick={() => onAskQuestion(`Tell me about your ${project.title} and technical challenges.`)}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors cursor-pointer"
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>Ask AI about this project</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );

          case 'architecture':
            return (
              <section
                key="architecture"
                id="portfolio-section-architecture"
                className="scroll-mt-16 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#023e8a]/40 pb-2.5">
                  <div className="flex items-center space-x-2">
                    <span className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-300">
                      <Cpu className="w-4 h-4" />
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      System Architecture & Technical Pipelines
                    </h3>
                  </div>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                    Developer Deep-Dive
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ARCHITECTURE_HIGHLIGHTS.map((arch, idx) => (
                    <div
                      key={idx}
                      className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#071a2f] border border-emerald-500/30 dark:border-emerald-500/20 shadow-xs"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40">
                          {arch.type}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
                        {arch.title}
                      </h4>

                      <div className="space-y-2.5">
                        {arch.steps.map((st, sIdx) => (
                          <div key={sIdx} className="flex items-start space-x-2 text-xs">
                            <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                              {st.step}:
                            </span>
                            <span className="text-slate-600 dark:text-slate-300">
                              {st.desc}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 pt-2.5 border-t border-slate-100 dark:border-[#023e8a]/30">
                        <button
                          onClick={() => onAskQuestion(`Explain how you designed the ${arch.title}`)}
                          className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>Ask AI how this was designed</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );

          case 'skills':
            return (
              <section
                key="skills"
                id="portfolio-section-skills"
                className="scroll-mt-16 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#023e8a]/40 pb-2.5">
                  <div className="flex items-center space-x-2">
                    <span className="p-1.5 rounded-lg bg-sky-100 dark:bg-[#023e8a]/40 text-sky-600 dark:text-sky-300">
                      <Code className="w-4 h-4" />
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Technical Skills & Expertise
                    </h3>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">Core Stack</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {/* Languages Card */}
                  <div className="p-4 rounded-2xl bg-white dark:bg-[#071a2f] border border-slate-200 dark:border-[#023e8a]/40 shadow-xs">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-2.5">
                      Languages
                    </h4>
                    <div className="space-y-1.5">
                      {SKILLS_DATA.languages.map((lang) => (
                        <div key={lang.name} className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-slate-800 dark:text-slate-200">{lang.name}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-100 dark:bg-[#023e8a]/60 text-sky-800 dark:text-sky-300 font-medium">
                            {lang.level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Backend & Systems Card */}
                  <div className="p-4 rounded-2xl bg-white dark:bg-[#071a2f] border border-slate-200 dark:border-[#023e8a]/40 shadow-xs">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-2.5">
                      Backend & Systems
                    </h4>
                    <div className="space-y-1.5">
                      {SKILLS_DATA.backend.map((item) => (
                        <div key={item.name} className="text-xs">
                          <span className="font-semibold text-slate-800 dark:text-slate-200 block">{item.name}</span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">{item.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Systems & Networking Card */}
                  <div className="p-4 rounded-2xl bg-white dark:bg-[#071a2f] border border-slate-200 dark:border-[#023e8a]/40 shadow-xs sm:col-span-2 md:col-span-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-2.5">
                      Systems & Networking
                    </h4>
                    <div className="space-y-1.5">
                      {SKILLS_DATA.systems.map((item) => (
                        <div key={item.name} className="text-xs">
                          <span className="font-semibold text-slate-800 dark:text-slate-200 block">{item.name}</span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">{item.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            );

          case 'experience':
          case 'resume':
            return (
              <section
                key={sectionKey}
                id={`portfolio-section-${sectionKey}`}
                className="scroll-mt-16 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#023e8a]/40 pb-2.5">
                  <div className="flex items-center space-x-2">
                    <span className="p-1.5 rounded-lg bg-sky-100 dark:bg-[#023e8a]/40 text-sky-600 dark:text-sky-300">
                      <FileText className="w-4 h-4" />
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Resume & Professional Experience
                    </h3>
                  </div>
                  <span className="text-xs text-sky-600 dark:text-sky-400 font-semibold">
                    Verified Profile
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-gradient-to-r from-sky-50 to-blue-50 dark:from-[#071a2f] dark:to-[#041327] border border-sky-200/80 dark:border-[#023e8a]/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span>Tilak Shrivastava</span>
                      <span className="text-[11px] font-normal px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                        Ready to Hire
                      </span>
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xl">
                      Master of Computer Applications graduate with hands-on systems programming in C++, asynchronous Python/FastAPI backend engineering, and modern full-stack application development.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto">
                    <a
                      href="/my_resume.pdf"
                      download="my_resume.pdf"
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 dark:bg-[#023e8a] dark:hover:bg-[#0077b6] text-white text-xs font-semibold shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer select-none"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Resume (PDF)</span>
                    </a>
                  </div>
                </div>
              </section>
            );

          case 'achievements':
          case 'learning':
            return (
              <section
                key={sectionKey}
                id={`portfolio-section-${sectionKey}`}
                className="scroll-mt-16 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#023e8a]/40 pb-2.5">
                  <div className="flex items-center space-x-2">
                    <span className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                      <Award className="w-4 h-4" />
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      LeetCode & Algorithmic Problem Solving
                    </h3>
                  </div>
                  <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold">
                    200+ Problems Solved
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-[#071a2f] border border-slate-200 dark:border-[#023e8a]/40 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span>LeetCode Profile:</span>
                        <code className="px-2 py-0.5 bg-slate-100 dark:bg-[#020b18] text-sky-600 dark:text-sky-400 font-mono rounded text-xs font-semibold">
                          {LEETCODE_ACHIEVEMENT.username}
                        </code>
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                        {LEETCODE_ACHIEVEMENT.summary}
                      </p>
                    </div>

                    <button
                      onClick={() => onAskQuestion('What is your problem-solving approach and LeetCode experience?')}
                      className="px-3 py-1.5 rounded-xl border border-sky-200 dark:border-[#023e8a] text-sky-600 dark:text-sky-400 text-xs font-medium hover:bg-sky-50 dark:hover:bg-[#023e8a]/30 transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-center"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>Ask AI about DSA</span>
                    </button>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-[#023e8a]/30">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Practiced Data Structures & Algorithms Topics:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {LEETCODE_ACHIEVEMENT.topics.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-[#020b18] text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-[#023e8a]/40"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            );

          case 'education':
            return (
              <section
                key="education"
                id="portfolio-section-education"
                className="scroll-mt-16 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#023e8a]/40 pb-2.5">
                  <div className="flex items-center space-x-2">
                    <span className="p-1.5 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300">
                      <GraduationCap className="w-4 h-4" />
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Education & Academic Background
                    </h3>
                  </div>
                  <span className="text-xs text-purple-600 dark:text-purple-400 font-semibold">
                    {EDUCATION_DATA.cgpa}
                  </span>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#071a2f] border border-slate-200 dark:border-[#023e8a]/40">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {EDUCATION_DATA.degree}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                    {EDUCATION_DATA.institution}
                  </p>

                  <div className="mt-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Key Coursework:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {EDUCATION_DATA.coursework.map((c) => (
                        <span
                          key={c}
                          className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-[#020b18] text-slate-600 dark:text-slate-300"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            );

          case 'contact':
            return (
              <section
                key="contact"
                id="portfolio-section-contact"
                className={`scroll-mt-16 space-y-4 ${
                  visitorMode === 'collaborator'
                    ? 'p-5 rounded-3xl bg-amber-500/10 dark:bg-amber-500/5 border-2 border-amber-500/50 shadow-lg'
                    : ''
                }`}
              >
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#023e8a]/40 pb-2.5">
                  <div className="flex items-center space-x-2">
                    <span className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                      <Mail className="w-4 h-4" />
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Direct Contact & Collaboration
                    </h3>
                  </div>
                  {visitorMode === 'collaborator' && (
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                      ★ Top Priority for Collaborators
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="p-4 rounded-2xl bg-white dark:bg-[#071a2f] border border-slate-200 dark:border-[#023e8a]/40 hover:border-sky-400 dark:hover:border-[#0077b6] transition-all flex items-center space-x-3 group cursor-pointer"
                  >
                    <div className="p-2 rounded-xl bg-sky-50 dark:bg-[#023e8a]/40 text-sky-600 dark:text-sky-300 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Email</span>
                      <span className="text-xs font-semibold text-slate-900 dark:text-white truncate block">
                        {CONTACT_INFO.email}
                      </span>
                    </div>
                  </a>

                  <a
                    href={`tel:${CONTACT_INFO.phone}`}
                    className="p-4 rounded-2xl bg-white dark:bg-[#071a2f] border border-slate-200 dark:border-[#023e8a]/40 hover:border-sky-400 dark:hover:border-[#0077b6] transition-all flex items-center space-x-3 group cursor-pointer"
                  >
                    <div className="p-2 rounded-xl bg-sky-50 dark:bg-[#023e8a]/40 text-sky-600 dark:text-sky-300 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Phone</span>
                      <span className="text-xs font-semibold text-slate-900 dark:text-white truncate block">
                        {CONTACT_INFO.phone}
                      </span>
                    </div>
                  </a>

                  <div className="p-4 rounded-2xl bg-white dark:bg-[#071a2f] border border-slate-200 dark:border-[#023e8a]/40 flex items-center space-x-3">
                    <div className="p-2 rounded-xl bg-sky-50 dark:bg-[#023e8a]/40 text-sky-600 dark:text-sky-300">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Location</span>
                      <span className="text-xs font-semibold text-slate-900 dark:text-white truncate block">
                        {CONTACT_INFO.location}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-100 dark:bg-[#020b18] text-xs text-slate-600 dark:text-slate-300 flex items-center justify-between">
                  <span>Looking for: <strong>{CONTACT_INFO.openTo}</strong></span>
                  <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    {CONTACT_INFO.availability}
                  </span>
                </div>
              </section>
            );

          default:
            return null;
        }
      })}

    </div>
  );
};

export default PersonalizedPortfolio;
