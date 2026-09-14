import { Briefcase, Code, GraduationCap, Users, Sparkles, Server, Terminal, Shield, FolderGit2, Mail, ExternalLink, Cpu, Database, Award, BookOpen } from 'lucide-react';

export const VISITOR_MODES = {
  RECRUITER: 'recruiter',
  DEVELOPER: 'developer',
  STUDENT: 'student',
  COLLABORATOR: 'collaborator',
};

export const MODE_CONFIGS = {
  recruiter: {
    id: 'recruiter',
    title: 'Recruiter',
    roleLabel: 'Recruiter View',
    badge: '💼 Recruiter Mode',
    accentColor: 'from-blue-600 to-sky-500',
    borderColor: 'border-blue-500/40 dark:border-blue-400/30',
    bannerText: 'Recruiter Mode activated — Prioritizing key projects, enterprise skills, work history, and resume access.',
    tagline: "I'm here to explore your profile for hiring.",
    icon: Briefcase,
    suggestedQuestions: [
      'Tell me about your strongest project.',
      'What are your strongest technical skills?',
      'What kind of roles are you looking for?',
      'Why would Tilak be a good fit for a software development role?',
      'Show me your resume.',
      'What technologies have you worked with?',
    ],
    sectionOrder: ['projects', 'skills', 'experience', 'resume', 'achievements', 'contact'],
    primaryCta: {
      text: 'Download Resume (PDF)',
      href: '/my_resume.pdf',
      download: 'my_resume.pdf',
      isDownload: true,
    },
    featuredProjectIds: ['dpi-engine', 'grocery-platform', 'ask-tilak'],
  },
  developer: {
    id: 'developer',
    title: 'Developer',
    roleLabel: 'Developer View',
    badge: '👨‍💻 Developer Mode',
    accentColor: 'from-emerald-600 to-teal-500',
    borderColor: 'border-emerald-500/40 dark:border-emerald-400/30',
    bannerText: 'Developer Mode activated — Highlighting system architecture, low-level C++, backend concurrency, and GitHub code.',
    tagline: "I'm interested in your technical work and projects.",
    icon: Code,
    suggestedQuestions: [
      'Explain your most technically challenging project.',
      'What technologies do you use?',
      'How did you design your project architecture?',
      'What were the biggest technical challenges?',
      'Show me your GitHub projects.',
      'How would you scale this project?',
    ],
    sectionOrder: ['projects', 'architecture', 'skills', 'github', 'experience'],
    primaryCta: {
      text: 'Explore System Architecture',
      targetSection: 'architecture',
      isScroll: true,
    },
    featuredProjectIds: ['dpi-engine', 'ask-tilak', 'grocery-platform'],
  },
  student: {
    id: 'student',
    title: 'Student',
    roleLabel: 'Student View',
    badge: '🎓 Student Mode',
    accentColor: 'from-purple-600 to-indigo-500',
    borderColor: 'border-purple-500/40 dark:border-purple-400/30',
    bannerText: 'Student Mode activated — Highlighting learning path, problem-solving journey, MCA education, and starter projects.',
    tagline: 'I want to learn from your projects and experience.',
    icon: GraduationCap,
    suggestedQuestions: [
      'How did you learn these technologies?',
      'Which project should I explore first?',
      'What technologies should I learn?',
      'What was the most difficult project you built?',
      'What advice would you give to someone starting programming?',
    ],
    sectionOrder: ['projects', 'skills', 'learning', 'education', 'achievements'],
    primaryCta: {
      text: 'Explore Learning Journey',
      targetSection: 'learning',
      isScroll: true,
    },
    featuredProjectIds: ['ai-builder', 'grocery-platform', 'ask-tilak'],
  },
  collaborator: {
    id: 'collaborator',
    title: 'Collaborator',
    roleLabel: 'Collaborator View',
    badge: '🤝 Collaborator Mode',
    accentColor: 'from-amber-600 to-orange-500',
    borderColor: 'border-amber-500/40 dark:border-amber-400/30',
    bannerText: 'Collaborator Mode activated — Highlighting active interests, technical stack, recent builds, and direct contact.',
    tagline: "I'm interested in working together.",
    icon: Users,
    suggestedQuestions: [
      'What kind of projects are you interested in?',
      'What technologies do you work with?',
      'Tell me about your recent projects.',
      'Would you be interested in collaborating?',
      'How can I contact you?',
    ],
    sectionOrder: ['contact', 'projects', 'skills', 'experience'],
    primaryCta: {
      text: 'Get In Touch to Collaborate',
      targetSection: 'contact',
      isScroll: true,
    },
    featuredProjectIds: ['ask-tilak', 'ai-builder', 'grocery-platform'],
  },
};

export const DEFAULT_SUGGESTIONS = [
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

export const PROJECTS_DATA = [
  {
    id: 'dpi-engine',
    title: 'High-Performance Deep Packet Inspection (DPI) Engine',
    subtitle: 'Layer-7 Network Protocol Dissector & Flow Classification',
    category: 'Systems & Networking',
    highlightTag: 'High Performance C++',
    description:
      'A multi-threaded Deep Packet Inspection engine engineered to capture, dissect, and classify Layer-7 application protocols from live network traffic or PCAP captures.',
    architectureDetails:
      'Features a custom TLS Client Hello SNI parser to classify encrypted domain traffic (YouTube, Netflix) without SSL decryption. High-throughput pipeline with software Load Balancer, 5-tuple Connection Tracker, and Fast-Path caching.',
    techStack: ['C++', 'Multithreading', 'PCAP Analysis', 'TCP/IP', 'TLS SNI', 'Wireshark'],
    metrics: ['Sub-microsecond flow classification', 'Zero-copy packet buffers', '5-Tuple Connection State'],
    difficulty: 'Advanced / Systems',
    relevance: {
      recruiter: 'Demonstrates deep systems engineering, C++ multithreading, and algorithmic optimization.',
      developer: 'Custom TLS SNI parsing without decrypting SSL, software load balancer, and lock-free rings.',
      student: 'Advanced example of how networking protocols (OSI Layer 4 to Layer 7) work in real-world code.',
      collaborator: 'Ideal foundation for network observability, firewall rules, and high-throughput systems.',
    },
  },
  {
    id: 'ask-tilak',
    title: 'Ask Tilak AI Chatbot (Interactive Portfolio)',
    subtitle: 'Full-Stack GenAI Portfolio Assistant with RAG Pipeline',
    category: 'AI & Full-Stack',
    highlightTag: 'FastAPI + Groq LLM',
    description:
      "An AI-powered interactive portfolio assistant answering recruiter and developer inquiries about Tilak's background, engineering decisions, and skills in real time.",
    architectureDetails:
      'Asynchronous FastAPI backend with Groq Cloud (openai/gpt-oss-120b), Pydantic v2 structured parsing, in-memory caching for sub-second responses, and React Vite frontend.',
    techStack: ['Python', 'FastAPI', 'Groq API', 'Pydantic v2', 'React.js', 'Tailwind CSS', 'Vite'],
    metrics: ['Sub-second latency', 'Dual resume + KB grounding', '100% Client Personalization'],
    difficulty: 'Intermediate / Production GenAI',
    relevance: {
      recruiter: 'Highlights ability to ship end-to-end AI applications with production-grade backend architecture.',
      developer: 'Strict grounding prompts, low-latency in-memory cache, and CORS-hardened serverless deployment.',
      student: 'Great reference for integrating LLMs into modern web apps using FastAPI and React.',
      collaborator: 'Ready to build custom AI assistants, internal copilot tools, or interactive web apps.',
    },
  },
  {
    id: 'grocery-platform',
    title: 'Grocery Shopping & Multi-Role Delivery Platform',
    subtitle: 'Event-Driven E-Commerce with Real-Time Tracking',
    category: 'Full-Stack & Distributed',
    highlightTag: 'MERN + Inngest',
    description:
      'A comprehensive full-stack e-commerce platform connecting customers, store administrators, and delivery partners with role-based dashboards.',
    architectureDetails:
      'Event-driven background workflows powered by Inngest for automated dispatch, order notifications, and partner assignment. PostgreSQL database with JWT auth and live location tracking.',
    techStack: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'PostgreSQL', 'Inngest', 'JWT'],
    metrics: ['3 Dedicated Dashboards (Admin/Customer/Rider)', 'Automated background dispatch', 'Relational DB schema'],
    difficulty: 'Intermediate / Full-Stack',
    relevance: {
      recruiter: 'Proves full-stack proficiency with complex relational schemas, RBAC, and background jobs.',
      developer: 'Clean separation of concerns with Inngest event queues and PostgreSQL transaction management.',
      student: 'Shows how real e-commerce systems handle carts, authentication, and state management.',
      collaborator: 'Extensible architecture for on-demand delivery, SaaS marketplaces, and booking portals.',
    },
  },
  {
    id: 'ai-builder',
    title: 'AI Website Builder (SaaS Platform)',
    subtitle: 'Natural Language Prompt-to-Code Generator',
    category: 'SaaS & Web Engineering',
    highlightTag: 'SaaS + Code Gen',
    description:
      'A full-stack SaaS platform enabling users to generate fully functional website landing pages and web apps from natural language prompts.',
    architectureDetails:
      'Prompt-to-code compiler with in-browser live code editor, syntax-highlighted sandboxed preview, one-click ZIP project export, and cloud workspace persistence.',
    techStack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'OpenRouter AI API', 'REST APIs'],
    metrics: ['One-click ZIP export', 'Live in-browser preview', 'Zero-config generation'],
    difficulty: 'Intermediate / SaaS',
    relevance: {
      recruiter: 'Demonstrates end-to-end product thinking, monetization structure, and user workflow design.',
      developer: 'In-browser code isolation, dynamic iframe sandboxing, and prompt engineering.',
      student: 'Inspiring starter project to learn full-stack MERN and prompt-to-UI techniques.',
      collaborator: 'Looking to partner on developer tooling, code generators, and AI SaaS products.',
    },
  },
];

export const SKILLS_DATA = {
  languages: [
    { name: 'Python', level: 'Advanced', tags: ['FastAPI', 'Groq', 'AsyncIO'] },
    { name: 'C++', level: 'Advanced', tags: ['Multithreading', 'PCAP', 'Systems'] },
    { name: 'JavaScript (ES6+)', level: 'Advanced', tags: ['React', 'Node.js', 'Vite'] },
    { name: 'SQL', level: 'Proficient', tags: ['PostgreSQL', 'MySQL', 'Queries'] },
    { name: 'C', level: 'Intermediate', tags: ['Pointers', 'Memory', 'POSIX'] },
  ],
  backend: [
    { name: 'FastAPI', description: 'Async endpoints, Pydantic v2 schemas, OpenAPI docs' },
    { name: 'Node.js / Express', description: 'REST APIs, Middleware, JWT Auth' },
    { name: 'Asynchronous Programming', description: 'Event loops, worker pools, concurrency' },
    { name: 'RESTful Architecture', description: 'Clean resource modeling, CORS, error handling' },
  ],
  systems: [
    { name: 'TCP/IP & OSI Layers', description: 'Packet sniffing, protocol dissection, flow tracking' },
    { name: 'TLS/SSL SNI Parsing', description: 'Server Name Indication extraction without decryption' },
    { name: 'Multithreading & Concurrency', description: 'Thread pools, race-condition prevention, locks' },
    { name: 'Wireshark & PCAP Analysis', description: 'Traffic capture inspection and network debugging' },
  ],
  frontend: [
    { name: 'React.js', description: 'Hooks, Context API, reusable components, Vite builds' },
    { name: 'Tailwind CSS', description: 'Modern responsive design, dark mode, micro-interactions' },
    { name: 'Responsive Web UI', description: 'Mobile-first, touch-friendly layouts, accessibility' },
  ],
  databasesAndDevops: [
    { name: 'PostgreSQL & MongoDB', description: 'Relational & document data modeling' },
    { name: 'Git & GitHub Workflows', description: 'Branching, PRs, semantic versioning' },
    { name: 'Vercel Deployment', description: 'Serverless functions, frontend hosting, CI/CD' },
    { name: 'Inngest', description: 'Event-driven background tasks and workflow orchestration' },
  ],
};

export const ARCHITECTURE_HIGHLIGHTS = [
  {
    title: 'High-Throughput Packet Processing Pipeline (C++)',
    type: 'Systems Architecture',
    steps: [
      { step: '1. Ingestion', desc: 'Raw PCAP / Live Interface capture via zero-copy buffer' },
      { step: '2. Layer-3/4 Parsing', desc: 'Ethernet header stripping, IPv4/IPv6 extraction, TCP/UDP 5-tuple key creation' },
      { step: '3. Connection Tracking', desc: 'Hash-table based active flow states with aging timers' },
      { step: '4. Layer-7 Inspection', desc: 'Custom TLS Client Hello parser inspects SNI extension without crypto overhead' },
      { step: '5. Policy & Output', desc: 'Real-time rule engine execution and filtered PCAP generation' },
    ],
  },
  {
    title: 'Sub-Second AI Chatbot Grounding (Python / FastAPI)',
    type: 'AI / Backend Pipeline',
    steps: [
      { step: '1. Client Input', desc: 'Vite frontend sends request with active session id' },
      { step: '2. FastAPI Server', desc: 'Pydantic validation + in-memory cached resume & knowledgebase lookup' },
      { step: '3. Grounded Prompt', desc: 'Strict anti-hallucination system prompt bound to resume JSON & KB docs' },
      { step: '4. Groq LLM Inference', desc: 'Ultra-low latency token generation using openai/gpt-oss-120b' },
      { step: '5. Client Stream/Response', desc: 'Instant UI markdown rendering with copy & feedback controls' },
    ],
  },
];

export const EDUCATION_DATA = {
  degree: 'Master of Computer Applications (MCA)',
  institution: 'Shri Vaishnav Vidyapeeth Vishwavidyalaya, Indore (M.P.)',
  cgpa: '7.67 CGPA',
  coursework: [
    'Advanced Data Structures & Algorithms',
    'Computer Networks & Protocols',
    'Database Management Systems',
    'Software Engineering & Architecture',
    'Operating Systems & Distributed Computing',
  ],
};

export const LEETCODE_ACHIEVEMENT = {
  username: 'meowww17',
  problemsSolved: '200+',
  topics: ['Arrays', 'Two Pointers', 'Sliding Window', 'Binary Search', 'Trees & BST', 'Graphs', 'Dynamic Programming', 'Recursion & Backtracking'],
  summary: 'Active algorithmic problem solver on LeetCode with 200+ problems solved focusing on optimal time and space complexity.',
};

export const CONTACT_INFO = {
  name: 'Tilak Shrivastava',
  role: 'Software Developer | Full-Stack & Systems Programmer | AI Backend Engineer',
  email: 'shrivastavatilak@gmail.com',
  phone: '+91 9977056144',
  location: 'Indore, Madhya Pradesh, India (452009)',
  openTo: 'Software Engineer, Backend Developer, Full-Stack Developer, AI/LLM Engineer (Remote, Hybrid, On-site)',
  availability: 'Ready to join immediately',
};
