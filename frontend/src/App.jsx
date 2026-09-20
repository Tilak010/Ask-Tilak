import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import WelcomeScreen from './components/WelcomeScreen';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import FootballLoader from './components/FootballLoader';
import VisitorTypeSelector from './components/VisitorTypeSelector';
import { VisitorModeProvider, useVisitorMode } from './context/VisitorModeContext';
import { MODE_CONFIGS } from './data/portfolioData';
import { sendChatMessage, checkBackendHealth } from './services/api';
import { 
  AlertCircle, 
  RefreshCw, 
  Sparkles, 
  ArrowLeft, 
  X, 
  Plus, 
  Bot 
} from 'lucide-react';

const STORAGE_KEY = 'ask_tilak_chatbot_sessions_v1';
const THEME_KEY = 'ask_tilak_theme_preference';

function AppContent() {
  // Theme state: defaults to saved preference or system dark mode
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_KEY);
      if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
      }
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    } catch (e) {}
    return 'light';
  });

  // Apply dark class to document.documentElement and trigger smooth transition
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('theme-transition');
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {}

    const timer = setTimeout(() => {
      root.classList.remove('theme-transition');
    }, 280);

    return () => clearTimeout(timer);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Visitor mode from Context
  const { visitorMode, isSelectorOpen, closeSelector, openSelector } = useVisitorMode();
  const currentConfig = visitorMode && MODE_CONFIGS[visitorMode];

  // Navigation & session state
  const [sessions, setSessions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [activeSessionId, setActiveSessionId] = useState(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const paramChatId = urlParams.get('c');
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (paramChatId && parsed.some((s) => s.id === paramChatId)) {
          return paramChatId;
        }
        if (parsed.length > 0) return parsed[0].id;
      }
    } catch (e) {}
    return null;
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [focusTrigger, setFocusTrigger] = useState(0);

  // Backend connection status
  const [isBackendConnected, setIsBackendConnected] = useState(true);
  const [isCheckingBackend, setIsCheckingBackend] = useState(false);

  const messagesEndRef = useRef(null);

  // Persist sessions to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    } catch (e) {
      console.error('Failed to save sessions to localStorage:', e);
    }
  }, [sessions]);

  // Sync URL query param ?c=sessionId when activeSessionId changes
  useEffect(() => {
    try {
      const url = new URL(window.location);
      if (activeSessionId) {
        url.searchParams.set('c', activeSessionId);
      } else {
        url.searchParams.delete('c');
      }
      window.history.pushState({}, '', url);
    } catch (e) {}
  }, [activeSessionId]);

  // Initial & periodic backend health check
  const handleCheckBackend = async () => {
    setIsCheckingBackend(true);
    const healthy = await checkBackendHealth();
    setIsBackendConnected(healthy);
    setIsCheckingBackend(false);
  };

  useEffect(() => {
    handleCheckBackend();
  }, []);

  // Get active session and messages
  const activeSession = sessions.find((s) => s.id === activeSessionId);
  const messages = activeSession ? activeSession.messages : [];

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isChatOpen) {
      scrollToBottom();
    }
  }, [messages, isLoading, isChatOpen]);

  /**
   * Create or navigate to a new empty conversation session immediately
   */
  const handleNewChat = () => {
    if (isLoading) return;

    // Check if the current active session is already an empty conversation
    const currentSession = sessions.find((s) => s.id === activeSessionId);
    if (currentSession && currentSession.messages.length === 0) {
      setErrorMessage(null);
      setFocusTrigger((prev) => prev + 1);
      setIsChatOpen(true);
      return currentSession.id;
    }

    // Generate new conversation session
    const newSessionId = 'session_' + Date.now();
    const newSession = {
      id: newSessionId,
      title: 'New Conversation',
      createdAt: new Date().toISOString(),
      messages: [],
    };

    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newSessionId);
    setErrorMessage(null);
    setFocusTrigger((prev) => prev + 1);
    setIsChatOpen(true);

    return newSessionId;
  };

  // Switch chat session
  const handleSelectSession = (id) => {
    setActiveSessionId(id);
    setErrorMessage(null);
    setFocusTrigger((prev) => prev + 1);
    setIsChatOpen(true);
  };

  // Delete a specific session
  const handleDeleteSession = (sessionId) => {
    if (window.confirm('Are you sure you want to delete this conversation?')) {
      setSessions((prev) => {
        const filtered = prev.filter((s) => s.id !== sessionId);
        if (activeSessionId === sessionId) {
          const nextActive = filtered.length > 0 ? filtered[0].id : null;
          setActiveSessionId(nextActive);
        }
        return filtered;
      });
      setErrorMessage(null);
    }
  };

  // Clear all history
  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all conversation history?')) {
      setSessions([]);
      setActiveSessionId(null);
      setErrorMessage(null);
    }
  };

  /**
   * Unified Chat Handler
   * Works for landing page suggestion prompts and active chat inputs.
   */
  const startChatWithMessage = async (text) => {
    const trimmed = text ? text.trim() : '';
    if (!trimmed || isLoading) return;

    setErrorMessage(null);
    setIsChatOpen(true);

    let currentSession = sessions.find((s) => s.id === activeSessionId);
    let targetSessionId = activeSessionId;

    const userMessage = {
      id: 'msg_user_' + Date.now(),
      sender: 'user',
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    if (!targetSessionId || !currentSession) {
      targetSessionId = 'session_' + Date.now();
      const newSession = {
        id: targetSessionId,
        title: trimmed.length > 28 ? trimmed.substring(0, 28) + '...' : trimmed,
        createdAt: new Date().toISOString(),
        messages: [userMessage],
      };

      setSessions((prev) => [newSession, ...prev.filter((s) => s.messages.length > 0)]);
      setActiveSessionId(targetSessionId);
    } else {
      setSessions((prev) =>
        prev.map((session) => {
          if (session.id === targetSessionId) {
            const isFirstMessage = session.messages.length === 0;
            return {
              ...session,
              title: isFirstMessage && trimmed.length > 28 ? trimmed.substring(0, 28) + '...' : session.title,
              messages: [...session.messages, userMessage],
            };
          }
          return session;
        })
      );
    }

    setIsLoading(true);

    try {
      const data = await sendChatMessage(trimmed);

      const aiMessage = {
        id: 'msg_ai_' + Date.now(),
        sender: 'ai',
        text: data.answer || 'No answer received from Tilak AI.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setSessions((prev) =>
        prev.map((session) => {
          if (session.id === targetSessionId) {
            return {
              ...session,
              messages: [...session.messages, aiMessage],
            };
          }
          return session;
        })
      );

      setIsBackendConnected(true);
    } catch (error) {
      console.error('Error sending message:', error);
      setErrorMessage(error.message || 'Failed to communicate with Python backend.');
      setIsBackendConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigate = (sectionId) => {
    setIsChatOpen(false);
    setTimeout(() => {
      const el = document.getElementById(`portfolio-section-${sectionId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  return (
    <div className="flex h-screen w-screen bg-[#FFF8F0] dark:bg-[#241A17] text-[#2D211D] dark:text-[#FFF4EA] overflow-hidden font-sans transition-colors duration-250">
      {/* Sidebar Drawer */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelectSession={handleSelectSession}
        onDeleteSession={handleDeleteSession}
        onNewChat={handleNewChat}
        onClearHistory={handleClearHistory}
      />

      {/* Main App Container */}
      <div className="flex-1 flex flex-col h-full w-full relative bg-[#FFF8F0] dark:bg-[#241A17] overflow-hidden transition-colors duration-250">
        
        {/* Top Navbar */}
        <Header
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          isSidebarOpen={sidebarOpen}
          onOpenChat={() => setIsChatOpen(!isChatOpen)}
          isChatOpen={isChatOpen}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          onNavigate={handleNavigate}
        />

        {/* Connection Warning Toast Banner */}
        {errorMessage && (
          <div className="mx-4 mt-2 p-2.5 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/60 rounded-xl text-rose-800 dark:text-rose-200 text-xs flex items-center justify-between z-30 shadow-xs animate-fade-in">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={handleCheckBackend}
              className="px-2 py-0.5 bg-rose-100 hover:bg-rose-200 dark:bg-rose-900/70 text-rose-900 dark:text-rose-100 rounded-md font-medium text-[11px] transition-colors flex items-center gap-1 cursor-pointer flex-shrink-0"
            >
              <RefreshCw className="w-3 h-3" /> Retry
            </button>
          </div>
        )}

        {/* Portfolio Scroll Container */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col z-10">
          <WelcomeScreen 
            onSelectPrompt={startChatWithMessage} 
            onOpenChat={() => setIsChatOpen(true)}
          />
        </div>

        {/* Floating Quick Ask AI Trigger (Visible when chat is closed) */}
        {!isChatOpen && (
          <div className="fixed bottom-5 right-5 z-20">
            <button
              onClick={() => setIsChatOpen(true)}
              className="px-4 py-2.5 rounded-full bg-[#C65D3A] hover:bg-[#A94A2E] dark:bg-[#D96B45] dark:hover:bg-[#E47B52] text-white text-xs font-semibold shadow-lg shadow-[#C65D3A]/25 flex items-center gap-2 transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              title="Chat with Tilak's AI Representative"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F0B35A]" />
              <span>Ask AI Assistant</span>
              {messages.length > 0 && (
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              )}
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MOBILE CHAT VIEW (Responsive Full-Screen Overlay with Back Button)        */}
        {/* ========================================================================= */}
        {isChatOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex flex-col bg-[#FFF8F0] dark:bg-[#241A17] animate-fade-in">
            
            {/* Mobile Chat Header with Back Button */}
            <div className="h-16 px-3 sm:px-4 border-b border-[#E8D5C7] dark:border-[#59433A] bg-[#FFF8F0] dark:bg-[#30221E] flex items-center justify-between flex-shrink-0 shadow-xs">
              
              {/* Back button (Closes mobile chat view, preserves state) */}
              <button 
                onClick={() => setIsChatOpen(false)}
                className="flex items-center gap-1 text-xs font-semibold text-[#C65D3A] dark:text-[#F0B35A] py-2 px-2.5 -ml-1 rounded-xl hover:bg-[#F7EDE3] dark:hover:bg-[#3A2924] active:scale-95 transition-all cursor-pointer"
                aria-label="Back to Portfolio"
                title="Return to portfolio view"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              
              {/* Chat Title & Status */}
              <div className="text-center">
                <h2 className="text-sm font-bold text-[#2D211D] dark:text-[#FFF4EA] flex items-center justify-center gap-1.5">
                  <Bot className="w-4 h-4 text-[#C65D3A] dark:text-[#D96B45]" />
                  <span>Tilak AI Assistant</span>
                </h2>
                <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#6F5B52] dark:text-[#D5C0B5]">
                  <span className={`w-1.5 h-1.5 rounded-full ${isBackendConnected ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></span>
                  <span>{isBackendConnected ? 'FastAPI Online' : 'Offline'}</span>
                </div>
              </div>

              {/* Top Right Controls: New Chat + Close */}
              <div className="flex items-center space-x-1">
                <button
                  onClick={handleNewChat}
                  className="p-2 rounded-xl text-[#6F5B52] dark:text-[#D5C0B5] hover:text-[#C65D3A] dark:hover:text-[#F0B35A] hover:bg-[#F7EDE3] dark:hover:bg-[#3A2924] transition-colors cursor-pointer"
                  title="New conversation"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="p-2 rounded-xl text-[#6F5B52] dark:text-[#D5C0B5] hover:text-[#2D211D] dark:hover:text-[#FFF4EA] hover:bg-[#F7EDE3] dark:hover:bg-[#3A2924] transition-colors cursor-pointer"
                  title="Close chat"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Mobile Messages Area */}
            <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-2">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#6F5B52] dark:text-[#D5C0B5]">
                  <div className="w-12 h-12 rounded-2xl bg-[#FFF1E6] dark:bg-[#3A2924] border border-[#E8D5C7] dark:border-[#59433A] flex items-center justify-center mb-3">
                    <Sparkles className="w-6 h-6 text-[#C65D3A] dark:text-[#F0B35A]" />
                  </div>
                  <h3 className="text-sm font-bold text-[#2D211D] dark:text-[#FFF4EA] mb-1">
                    Ask Tilak's AI Representative
                  </h3>
                  <p className="text-xs text-[#6F5B52] dark:text-[#D5C0B5] max-w-xs mb-4">
                    Inquire about Tilak's systems programming in C++, FastAPI backends, LeetCode problem solving, or availability.
                  </p>

                  <div className="w-full max-w-xs space-y-1.5 text-left">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#6F5B52]/80 dark:text-[#D5C0B5]/80 block px-1">
                      Quick Prompts:
                    </span>
                    {(currentConfig?.suggestedQuestions || [
                      'Tell me about your strongest project.',
                      'What are your strongest technical skills?',
                      'Why hire Tilak?'
                    ]).slice(0, 3).map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => startChatWithMessage(q)}
                        className="w-full p-2 rounded-xl bg-[#FFF1E6] dark:bg-[#3A2924] border border-[#E8D5C7] dark:border-[#59433A] text-xs text-[#2D211D] dark:text-[#FFF4EA] hover:border-[#C65D3A] dark:hover:border-[#F0B35A] text-left line-clamp-1 transition-colors"
                      >
                        "{q}"
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="w-full space-y-1">
                  {messages.map((msg) => (
                    <ChatMessage key={msg.id} message={msg} />
                  ))}
                  {isLoading && <FootballLoader />}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Mobile Chat Input Bar */}
            <div className="border-t border-[#E8D5C7] dark:border-[#59433A] bg-[#FFF8F0]/95 dark:bg-[#30221E]/95 backdrop-blur-md pt-2">
              <ChatInput 
                onSendMessage={startChatWithMessage} 
                isLoading={isLoading} 
                activeSessionId={activeSessionId}
                focusTrigger={focusTrigger}
                placeholder="Ask Tilak's AI anything..."
              />
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* DESKTOP CHAT DRAWER / PANEL (Focused Side Assistant)                       */}
        {/* ========================================================================= */}
        {isChatOpen && (
          <aside className="hidden md:flex fixed right-0 top-16 bottom-0 w-[420px] lg:w-[460px] z-40 flex-col bg-[#FFF8F0] dark:bg-[#30221E] border-l border-[#E8D5C7] dark:border-[#59433A] shadow-2xl animate-fade-in">
            
            {/* Desktop Panel Header */}
            <div className="h-14 px-4 border-b border-[#E8D5C7] dark:border-[#59433A] flex items-center justify-between flex-shrink-0 bg-[#F7EDE3]/80 dark:bg-[#241A17]/80">
              <div className="flex items-center space-x-2">
                <Bot className="w-4 h-4 text-[#C65D3A] dark:text-[#D96B45]" />
                <h2 className="text-sm font-bold text-[#2D211D] dark:text-[#FFF4EA]">
                  Tilak AI Assistant
                </h2>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              </div>

              <div className="flex items-center space-x-1">
                <button
                  onClick={handleNewChat}
                  className="p-1.5 rounded-lg text-[#6F5B52] hover:text-[#C65D3A] dark:text-[#D5C0B5] dark:hover:text-[#F0B35A] hover:bg-[#F7EDE3] dark:hover:bg-[#3A2924] transition-colors cursor-pointer"
                  title="New Conversation"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="p-1.5 rounded-lg text-[#6F5B52] hover:text-[#2D211D] dark:text-[#D5C0B5] dark:hover:text-[#FFF4EA] hover:bg-[#F7EDE3] dark:hover:bg-[#3A2924] transition-colors cursor-pointer"
                  title="Close Assistant"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Desktop Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 bg-[#FFF8F0]/50 dark:bg-[#241A17]/40">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#6F5B52] dark:text-[#D5C0B5]">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF1E6] dark:bg-[#3A2924] border border-[#E8D5C7] dark:border-[#59433A] flex items-center justify-center mb-2.5">
                    <Sparkles className="w-5 h-5 text-[#C65D3A] dark:text-[#F0B35A]" />
                  </div>
                  <h3 className="text-sm font-bold text-[#2D211D] dark:text-[#FFF4EA] mb-1">
                    Ask Tilak's AI Representative
                  </h3>
                  <p className="text-xs text-[#6F5B52] dark:text-[#D5C0B5] max-w-xs mb-4">
                    Inquire about Tilak's systems programming in C++, FastAPI backends, LeetCode problem solving, or availability.
                  </p>

                  <div className="w-full max-w-xs space-y-1.5 text-left">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#6F5B52]/80 dark:text-[#D5C0B5]/80 block px-1">
                      Quick Prompts:
                    </span>
                    {(currentConfig?.suggestedQuestions || [
                      'Tell me about your strongest project.',
                      'What are your strongest technical skills?',
                      'Why hire Tilak?'
                    ]).slice(0, 3).map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => startChatWithMessage(q)}
                        className="w-full p-2 rounded-xl bg-[#FFF1E6] dark:bg-[#3A2924] border border-[#E8D5C7] dark:border-[#59433A] text-xs text-[#2D211D] dark:text-[#FFF4EA] hover:border-[#C65D3A] dark:hover:border-[#F0B35A] text-left line-clamp-1 transition-colors cursor-pointer"
                      >
                        "{q}"
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="w-full space-y-1">
                  {messages.map((msg) => (
                    <ChatMessage key={msg.id} message={msg} />
                  ))}
                  {isLoading && <FootballLoader />}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Desktop Input Area */}
            <div className="border-t border-[#E8D5C7] dark:border-[#59433A] bg-[#FFF8F0] dark:bg-[#30221E] pt-2">
              <ChatInput 
                onSendMessage={startChatWithMessage} 
                isLoading={isLoading} 
                activeSessionId={activeSessionId}
                focusTrigger={focusTrigger}
                placeholder="Ask Tilak's AI anything..."
              />
            </div>

          </aside>
        )}

      </div>

      {/* Global Role Switcher Modal */}
      {isSelectorOpen && (
        <VisitorTypeSelector isModal={true} onClose={closeSelector} />
      )}
    </div>
  );
}

export function App() {
  return (
    <VisitorModeProvider>
      <AppContent />
    </VisitorModeProvider>
  );
}

export default App;
