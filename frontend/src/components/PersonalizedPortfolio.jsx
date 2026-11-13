import React from 'react';
import { 
  Briefcase, 
  Code, 
  GraduationCap, 
  Cpu, 
  Award, 
  MessageSquare, 
  ArrowUpRight,
  FileText, 
  Download, 
  Mail, 
  Phone, 
  MapPin
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

  // Determine section order based on mode
  const getSectionOrder = () => {
    switch (visitorMode) {
      case 'recruiter':
        return ['projects', 'skills', 'experience', 'achievements', 'contact'];
      case 'developer':
        return ['projects', 'architecture', 'skills', 'experience', 'achievements'];
      case 'student':
        return ['projects', 'skills', 'education', 'achievements', 'contact'];
      case 'collaborator':
        return ['contact', 'projects', 'skills', 'experience'];
      default:
        return ['projects', 'skills', 'architecture', 'experience', 'achievements', 'education', 'contact'];
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

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 text-left space-y-12 animate-fade-in transition-all">
      {/* Render Sections in Dynamic Order */}
      {sectionOrder.map((sectionKey) => {
        switch (sectionKey) {
          case 'projects':
            return (
              <section
                key="projects"
                id="portfolio-section-projects"
                className="scroll-mt-24 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-[#E7D5BE] dark:border-[#574234] pb-2.5">
                  <div className="flex items-center space-x-2">
                    <span className="p-1.5 rounded-lg bg-[#FFFCF5] dark:bg-[#382A21] text-[#B4532A] dark:text-[#D97745]">
                      <Briefcase className="w-4 h-4" />
                    </span>
                    <h2 className="text-lg font-bold text-[#35251C] dark:text-[#FFF5E8]">
                      Featured Engineering Projects
                    </h2>
                  </div>
                  <span className="text-xs text-[#B4532A] dark:text-[#E9AD55] font-semibold">
                    {visitorMode ? `${MODE_CONFIGS[visitorMode]?.title || 'Custom'} Order` : 'All Projects'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {orderedProjects.map((project, idx) => {
                    const isTopPriority = idx === 0 && !!visitorMode;
                    return (
                      <div
                        key={project.id}
                        className={`p-5 rounded-2xl bg-[#FFFCF5] dark:bg-[#382A21] border transition-all duration-200 flex flex-col justify-between ${
                          isTopPriority
                            ? 'border-[#B4532A] dark:border-[#D97745] shadow-md shadow-[#B4532A]/10'
                            : 'border-[#E7D5BE] dark:border-[#574234] hover:border-[#B4532A]/60 dark:hover:border-[#D97745]/60 shadow-xs'
                        }`}
                      >
                        <div>
                          {/* Header: Category + Tag */}
                          <div className="flex items-center justify-between mb-2.5 flex-wrap gap-1">
                            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#F5EBDD] dark:bg-[#211A16] text-[#796557] dark:text-[#D3BEAA] border border-[#E7D5BE] dark:border-[#574234]">
                              {project.category}
                            </span>
                            <span className="text-[10px] font-semibold text-[#B4532A] dark:text-[#E9AD55]">
                              {project.highlightTag}
                            </span>
                          </div>

                          <h3 className="text-base font-bold text-[#35251C] dark:text-[#FFF5E8] mb-1 leading-snug">
                            {project.title}
                          </h3>
                          <p className="text-xs text-[#796557] dark:text-[#D3BEAA] mb-3 font-medium">
                            {project.subtitle}
                          </p>

                          <p className="text-xs text-[#35251C]/85 dark:text-[#FFF5E8]/85 mb-3.5 leading-relaxed">
                            {project.description}
                          </p>

                          {/* Mode-Tailored Callout */}
                          {visitorMode && project.relevance[visitorMode] && (
                            <div className="p-2.5 rounded-xl bg-[#F5EBDD]/80 dark:bg-[#211A16]/80 border border-[#E7D5BE] dark:border-[#574234] text-xs mb-3.5">
                              <span className="font-semibold text-[#B4532A] dark:text-[#E9AD55] block text-[11px] mb-0.5">
                                💡 Why this matters for {MODE_CONFIGS[visitorMode]?.title}:
                              </span>
                              <span className="text-[#796557] dark:text-[#D3BEAA] text-[11px]">
                                {project.relevance[visitorMode]}
                              </span>
                            </div>
                          )}

                          {/* Architecture Note if developer mode */}
                          {visitorMode === 'developer' && project.architectureDetails && (
                            <div className="p-2.5 rounded-xl bg-[#211A16] text-[#E9AD55] font-mono text-[11px] mb-3.5 border border-[#574234]">
                              <span className="text-[#E9A23B] font-bold block mb-1">Architecture Details:</span>
                              {project.architectureDetails}
                            </div>
                          )}

                          {/* Tech Stack Badges */}
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {project.techStack.map((tech) => (
                              <span
                                key={tech}
                                className="text-[10px] px-2 py-0.5 rounded-md bg-[#F5EBDD] dark:bg-[#211A16] text-[#796557] dark:text-[#D3BEAA] font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Card Footer: Ask AI about this project */}
                        <div className="pt-2.5 border-t border-[#E7D5BE] dark:border-[#574234] flex items-center justify-between">
                          <button
                            onClick={() => onAskQuestion(`Tell me about your ${project.title} and technical challenges.`)}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B4532A] dark:text-[#E9AD55] hover:text-[#963F1E] dark:hover:text-[#E48858] transition-colors cursor-pointer"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
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
                className="scroll-mt-24 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-[#E7D5BE] dark:border-[#574234] pb-2.5">
                  <div className="flex items-center space-x-2">
                    <span className="p-1.5 rounded-lg bg-[#FFFCF5] dark:bg-[#382A21] text-[#B4532A] dark:text-[#D97745]">
                      <Cpu className="w-4 h-4" />
                    </span>
                    <h2 className="text-lg font-bold text-[#35251C] dark:text-[#FFF5E8]">
                      System Architecture & Technical Pipelines
                    </h2>
                  </div>
                  <span className="text-xs text-[#B4532A] dark:text-[#E9AD55] font-semibold">
                    Developer Deep-Dive
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ARCHITECTURE_HIGHLIGHTS.map((arch, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-[#FFFCF5] dark:bg-[#382A21] border border-[#E7D5BE] dark:border-[#574234] shadow-xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#B4532A] dark:text-[#E9AD55] px-2 py-0.5 rounded-md bg-[#F5EBDD] dark:bg-[#211A16] border border-[#E7D5BE] dark:border-[#574234]">
                            {arch.type}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-[#35251C] dark:text-[#FFF5E8] mb-3">
                          {arch.title}
                        </h3>

                        <div className="space-y-2">
                          {arch.steps.map((st, sIdx) => (
                            <div key={sIdx} className="flex items-start space-x-2 text-xs">
                              <span className="font-mono font-semibold text-[#B4532A] dark:text-[#E9AD55] flex-shrink-0">
                                {st.step}:
                              </span>
                              <span className="text-[#796557] dark:text-[#D3BEAA] leading-relaxed">
                                {st.desc}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 pt-2.5 border-t border-[#E7D5BE] dark:border-[#574234]">
                        <button
                          onClick={() => onAskQuestion(`Explain how you designed the ${arch.title}`)}
                          className="text-xs font-semibold text-[#B4532A] dark:text-[#E9AD55] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
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
                className="scroll-mt-24 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-[#E7D5BE] dark:border-[#574234] pb-2.5">
                  <div className="flex items-center space-x-2">
                    <span className="p-1.5 rounded-lg bg-[#FFFCF5] dark:bg-[#382A21] text-[#B4532A] dark:text-[#D97745]">
                      <Code className="w-4 h-4" />
                    </span>
                    <h2 className="text-lg font-bold text-[#35251C] dark:text-[#FFF5E8]">
                      Technical Skills & Expertise
                    </h2>
                  </div>
                  <span className="text-xs text-[#796557] dark:text-[#D3BEAA] font-medium">Core Stack</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                  {/* Languages Card */}
                  <div className="p-4 rounded-2xl bg-[#FFFCF5] dark:bg-[#382A21] border border-[#E7D5BE] dark:border-[#574234] shadow-xs">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#796557] dark:text-[#D3BEAA] mb-3">
                      Programming Languages
                    </h3>
                    <div className="space-y-2">
                      {SKILLS_DATA.languages.map((lang) => (
                        <div key={lang.name} className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-[#35251C] dark:text-[#FFF5E8]">{lang.name}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-[#F5EBDD] dark:bg-[#211A16] text-[#B4532A] dark:text-[#E9AD55] font-medium">
                            {lang.level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Backend & Systems Card */}
                  <div className="p-4 rounded-2xl bg-[#FFFCF5] dark:bg-[#382A21] border border-[#E7D5BE] dark:border-[#574234] shadow-xs">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#796557] dark:text-[#D3BEAA] mb-3">
                      Backend & Architecture
                    </h3>
                    <div className="space-y-2">
                      {SKILLS_DATA.backend.map((item) => (
                        <div key={item.name} className="text-xs">
                          <span className="font-semibold text-[#35251C] dark:text-[#FFF5E8] block">{item.name}</span>
                          <span className="text-[11px] text-[#796557] dark:text-[#D3BEAA]">{item.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Systems & Networking Card */}
                  <div className="p-4 rounded-2xl bg-[#FFFCF5] dark:bg-[#382A21] border border-[#E7D5BE] dark:border-[#574234] shadow-xs sm:col-span-2 md:col-span-1">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#796557] dark:text-[#D3BEAA] mb-3">
                      Systems & Networking
                    </h3>
                    <div className="space-y-2">
                      {SKILLS_DATA.systems.map((item) => (
                        <div key={item.name} className="text-xs">
                          <span className="font-semibold text-[#35251C] dark:text-[#FFF5E8] block">{item.name}</span>
                          <span className="text-[11px] text-[#796557] dark:text-[#D3BEAA]">{item.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            );

          case 'experience':
            return (
              <section
                key="experience"
                id="portfolio-section-experience"
                className="scroll-mt-24 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-[#E7D5BE] dark:border-[#574234] pb-2.5">
                  <div className="flex items-center space-x-2">
                    <span className="p-1.5 rounded-lg bg-[#FFFCF5] dark:bg-[#382A21] text-[#B4532A] dark:text-[#D97745]">
                      <FileText className="w-4 h-4" />
                    </span>
                    <h2 className="text-lg font-bold text-[#35251C] dark:text-[#FFF5E8]">
                      About & Professional Profile
                    </h2>
                  </div>
                  <span className="text-xs text-[#B4532A] dark:text-[#E9AD55] font-semibold">
                    Verified Candidate
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-[#FFFCF5] dark:bg-[#382A21] border border-[#E7D5BE] dark:border-[#574234] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-[#35251C] dark:text-[#FFF5E8] flex items-center gap-2">
                      <span>Tilak Shrivastava</span>
                      <span className="text-[11px] font-normal px-2 py-0.5 rounded-full bg-[#F5EBDD] dark:bg-[#211A16] text-[#B4532A] dark:text-[#E9AD55] border border-[#E7D5BE] dark:border-[#574234]">
                        Immediate Availability
                      </span>
                    </h3>
                    <p className="text-xs text-[#796557] dark:text-[#D3BEAA] max-w-xl leading-relaxed">
                      Master of Computer Applications graduate with hands-on systems programming in C++, asynchronous Python/FastAPI backend engineering, and modern full-stack application development.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto">
                    <a
                      href="/my_resume.pdf"
                      download="my_resume.pdf"
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#B4532A] hover:bg-[#963F1E] dark:bg-[#D97745] dark:hover:bg-[#E48858] text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-2 transition-colors cursor-pointer select-none"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Resume (PDF)</span>
                    </a>
                  </div>
                </div>
              </section>
            );

          case 'achievements':
            return (
              <section
                key="achievements"
                id="portfolio-section-achievements"
                className="scroll-mt-24 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-[#E7D5BE] dark:border-[#574234] pb-2.5">
                  <div className="flex items-center space-x-2">
                    <span className="p-1.5 rounded-lg bg-[#FFFCF5] dark:bg-[#382A21] text-[#B4532A] dark:text-[#D97745]">
                      <Award className="w-4 h-4" />
                    </span>
                    <h2 className="text-lg font-bold text-[#35251C] dark:text-[#FFF5E8]">
                      LeetCode & Algorithmic Problem Solving
                    </h2>
                  </div>
                  <span className="text-xs text-[#B4532A] dark:text-[#E9AD55] font-semibold">
                    200+ Problems Solved
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-[#FFFCF5] dark:bg-[#382A21] border border-[#E7D5BE] dark:border-[#574234] shadow-xs space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-[#35251C] dark:text-[#FFF5E8] flex items-center gap-2">
                        <span>LeetCode Profile:</span>
                        <code className="px-2 py-0.5 bg-[#F5EBDD] dark:bg-[#211A16] text-[#B4532A] dark:text-[#E9AD55] font-mono rounded text-xs font-semibold">
                          {LEETCODE_ACHIEVEMENT.username}
                        </code>
                      </h3>
                      <p className="text-xs text-[#796557] dark:text-[#D3BEAA] mt-1 leading-relaxed">
                        {LEETCODE_ACHIEVEMENT.summary}
                      </p>
                    </div>

                    <button
                      onClick={() => onAskQuestion('What is your problem-solving approach and LeetCode experience?')}
                      className="px-3 py-1.5 rounded-xl border border-[#E7D5BE] dark:border-[#574234] text-[#B4532A] dark:text-[#E9AD55] text-xs font-medium hover:bg-[#F5EBDD] dark:hover:bg-[#2D231D] transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-center"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Ask AI about DSA</span>
                    </button>
                  </div>

                  <div className="pt-2 border-t border-[#E7D5BE] dark:border-[#574234]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#796557] dark:text-[#D3BEAA] block mb-1.5">
                      Practiced Algorithmic Topics:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {LEETCODE_ACHIEVEMENT.topics.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#F5EBDD] dark:bg-[#211A16] text-[#796557] dark:text-[#D3BEAA] border border-[#E7D5BE] dark:border-[#574234]"
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
                className="scroll-mt-24 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-[#E7D5BE] dark:border-[#574234] pb-2.5">
                  <div className="flex items-center space-x-2">
                    <span className="p-1.5 rounded-lg bg-[#FFFCF5] dark:bg-[#382A21] text-[#B4532A] dark:text-[#D97745]">
                      <GraduationCap className="w-4 h-4" />
                    </span>
                    <h2 className="text-lg font-bold text-[#35251C] dark:text-[#FFF5E8]">
                      Education & Academic Background
                    </h2>
                  </div>
                  <span className="text-xs text-[#B4532A] dark:text-[#E9AD55] font-semibold">
                    {EDUCATION_DATA.cgpa}
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-[#FFFCF5] dark:bg-[#382A21] border border-[#E7D5BE] dark:border-[#574234] shadow-xs">
                  <h3 className="text-sm font-bold text-[#35251C] dark:text-[#FFF5E8]">
                    {EDUCATION_DATA.degree}
                  </h3>
                  <p className="text-xs text-[#796557] dark:text-[#D3BEAA] mb-2.5">
                    {EDUCATION_DATA.institution}
                  </p>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#796557] dark:text-[#D3BEAA] block mb-1.5">
                      Key Coursework:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {EDUCATION_DATA.coursework.map((c) => (
                        <span
                          key={c}
                          className="text-[11px] px-2 py-0.5 rounded bg-[#F5EBDD] dark:bg-[#211A16] text-[#796557] dark:text-[#D3BEAA]"
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
                className="scroll-mt-24 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-[#E7D5BE] dark:border-[#574234] pb-2.5">
                  <div className="flex items-center space-x-2">
                    <span className="p-1.5 rounded-lg bg-[#FFFCF5] dark:bg-[#382A21] text-[#B4532A] dark:text-[#D97745]">
                      <Mail className="w-4 h-4" />
                    </span>
                    <h2 className="text-lg font-bold text-[#35251C] dark:text-[#FFF5E8]">
                      Direct Contact Information
                    </h2>
                  </div>
                  <span className="text-xs text-[#B4532A] dark:text-[#E9AD55] font-semibold">
                    {CONTACT_INFO.availability}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="p-4 rounded-2xl bg-[#FFFCF5] dark:bg-[#382A21] border border-[#E7D5BE] dark:border-[#574234] hover:border-[#B4532A] dark:hover:border-[#E9AD55] transition-colors flex items-center space-x-3 group cursor-pointer shadow-xs"
                  >
                    <div className="p-2 rounded-xl bg-[#F5EBDD] dark:bg-[#211A16] text-[#B4532A] dark:text-[#E9AD55] group-hover:bg-[#B4532A] group-hover:text-white dark:group-hover:bg-[#D97745] transition-colors">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] uppercase font-bold text-[#796557] dark:text-[#D3BEAA] block">Email</span>
                      <span className="text-xs font-semibold text-[#35251C] dark:text-[#FFF5E8] truncate block">
                        {CONTACT_INFO.email}
                      </span>
                    </div>
                  </a>

                  <a
                    href={`tel:${CONTACT_INFO.phone}`}
                    className="p-4 rounded-2xl bg-[#FFFCF5] dark:bg-[#382A21] border border-[#E7D5BE] dark:border-[#574234] hover:border-[#B4532A] dark:hover:border-[#E9AD55] transition-colors flex items-center space-x-3 group cursor-pointer shadow-xs"
                  >
                    <div className="p-2 rounded-xl bg-[#F5EBDD] dark:bg-[#211A16] text-[#B4532A] dark:text-[#E9AD55] group-hover:bg-[#B4532A] group-hover:text-white dark:group-hover:bg-[#D97745] transition-colors">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] uppercase font-bold text-[#796557] dark:text-[#D3BEAA] block">Phone</span>
                      <span className="text-xs font-semibold text-[#35251C] dark:text-[#FFF5E8] truncate block">
                        {CONTACT_INFO.phone}
                      </span>
                    </div>
                  </a>

                  <div className="p-4 rounded-2xl bg-[#FFFCF5] dark:bg-[#382A21] border border-[#E7D5BE] dark:border-[#574234] flex items-center space-x-3 shadow-xs">
                    <div className="p-2 rounded-xl bg-[#F5EBDD] dark:bg-[#211A16] text-[#B4532A] dark:text-[#E9AD55]">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] uppercase font-bold text-[#796557] dark:text-[#D3BEAA] block">Location</span>
                      <span className="text-xs font-semibold text-[#35251C] dark:text-[#FFF5E8] truncate block">
                        {CONTACT_INFO.location}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F5EBDD] dark:bg-[#2D231D] text-xs text-[#796557] dark:text-[#D3BEAA] flex items-center justify-between border border-[#E7D5BE] dark:border-[#574234]">
                  <span>Open to: <strong>{CONTACT_INFO.openTo}</strong></span>
                  <span className="text-[11px] font-semibold text-[#B4532A] dark:text-[#E9AD55]">
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
