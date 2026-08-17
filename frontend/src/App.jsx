import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import WelcomeScreen from './components/WelcomeScreen';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import FootballLoader from './components/FootballLoader';
import FootballBackground from './components/FootballBackground';
import { sendChatMessage, checkBackendHealth } from './services/api';
import { AlertCircle, RefreshCw } from 'lucide-react';

const STORAGE_KEY = 'ask_tilak_chatbot_sessions_v1';

export function App() {
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
    scrollToBottom();
  }, [messages, isLoading]);

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

    // Prepend newSession to history immediately
    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newSessionId);
    setErrorMessage(null);
    setFocusTrigger((prev) => prev + 1);

    return newSessionId;
  };

  // Switch chat session
  const handleSelectSession = (id) => {
    setActiveSessionId(id);
    setErrorMessage(null);
    setFocusTrigger((prev) => prev + 1);
  };

  // Delete a specific session
  const handleDeleteSession = (sessionId) => {
    if (window.confirm('Are you sure you want to delete this conversation?')) {
      setSessions((prev) => {
        const filtered = prev.filter((s) => s.id !== sessionId);
        
        // If deleting the active session, switch to next available session or landing page (null)
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

    // Check if we already have an active session
    let currentSession = sessions.find((s) => s.id === activeSessionId);
    let targetSessionId = activeSessionId;

    const userMessage = {
      id: 'msg_user_' + Date.now(),
      sender: 'user',
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    if (!targetSessionId || !currentSession) {
      // Create new session if none is selected
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
      // Append message to existing active session
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
      // Call FastAPI endpoint POST /chat -> { answer }
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

  return (
    <div className="flex h-screen w-screen bg-slate-100 text-slate-900 overflow-hidden font-sans">
      {/* Sidebar */}
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

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full w-full relative bg-slate-50 overflow-hidden">
        
        {/* Subtle Pitch Vector Background Overlay */}
        <FootballBackground />

        {/* Top Navbar */}
        <Header
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onNewChat={handleNewChat}
          isBackendConnected={isBackendConnected}
          isCheckingBackend={isCheckingBackend}
          onRecheckBackend={handleCheckBackend}
        />

        {/* Connection Warning Toast Banner */}
        {errorMessage && (
          <div className="mx-4 mt-3 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-start justify-between z-30 shadow-xs animate-fade-in">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block">Backend Connection Error</span>
                <span>{errorMessage}</span>
              </div>
            </div>
            <button
              onClick={handleCheckBackend}
              className="px-2 py-1 bg-rose-100 hover:bg-rose-200 text-rose-900 rounded-lg font-medium text-[11px] transition-colors flex items-center gap-1 cursor-pointer flex-shrink-0"
            >
              <RefreshCw className="w-3 h-3" /> Retry
            </button>
          </div>
        )}

        {/* Chat Area Scroll Container */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 flex flex-col z-10">
          {!activeSessionId || messages.length === 0 ? (
            <WelcomeScreen onSelectPrompt={startChatWithMessage} />
          ) : (
            <div className="max-w-4xl mx-auto w-full space-y-1">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}

              {/* Bouncing Football Thinking Indicator */}
              {isLoading && <FootballLoader />}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Chat Input Bar */}
        <ChatInput 
          onSendMessage={startChatWithMessage} 
          isLoading={isLoading} 
          activeSessionId={activeSessionId}
          focusTrigger={focusTrigger}
        />
      </div>
    </div>
  );
}

export default App;
