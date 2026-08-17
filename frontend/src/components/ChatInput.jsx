import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

export const ChatInput = ({ onSendMessage, isLoading, activeSessionId, focusTrigger }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);

  // Auto-resize textarea as user types
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 140)}px`;
    }
  }, [input]);

  // Auto-focus textarea when active session changes or focus trigger is updated
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [activeSessionId, focusTrigger]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input.trim());
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-2.5 sm:px-4 pb-3 sm:pb-4 pt-1.5 z-20">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center bg-white rounded-2xl border border-sky-200/90 shadow-lg shadow-sky-500/10 focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-300/40 transition-all">
          
          {/* Football Kickoff Icon inside left input */}
          <div className="pl-3 sm:pl-3.5 pr-1 text-sky-500 flex items-center justify-center flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-5 sm:h-5">
              <circle cx="12" cy="12" r="9" className="opacity-80" />
              <path d="M12 7v10M7 12h10" strokeDasharray="3 3" />
            </svg>
          </div>

          {/* Textarea (text-base on mobile prevents iOS Safari auto-zoom on focus) */}
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about Tilak's skills, experience, or projects..."
            rows={1}
            disabled={isLoading}
            className="w-full py-3 px-2 sm:px-3 text-base sm:text-sm text-slate-800 placeholder-slate-400 bg-transparent resize-none focus:outline-hidden disabled:opacity-50 max-h-36 overflow-y-auto font-sans"
          />

          {/* Submit Button */}
          <div className="pr-2 sm:pr-2.5 flex items-center space-x-1.5 flex-shrink-0">
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className={`p-2.5 rounded-xl flex items-center justify-center transition-all duration-200 min-w-[40px] min-h-[40px] ${
                input.trim() && !isLoading
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/30 hover:scale-105 active:scale-95 cursor-pointer'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
              title="Kickoff question"
            >
              <Send className="w-4 h-4 transform rotate-45" />
            </button>
          </div>
        </div>

        {/* Keyboard shortcut hint */}
        <div className="flex items-center justify-between px-3 mt-1 text-[10px] sm:text-[11px] text-slate-400 font-medium">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
            Press <kbd className="px-1 py-0.5 bg-slate-100 border border-slate-200 rounded-sm font-mono text-[9px] sm:text-[10px] text-slate-600">Enter ↵</kbd> to send
          </span>
          <span className="hidden sm:inline-block">Ask Tilak AI Representative</span>
        </div>

      </form>
    </div>
  );
};

export default ChatInput;
