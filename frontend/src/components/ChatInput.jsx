import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

export const ChatInput = ({ onSendMessage, isLoading, activeSessionId, focusTrigger, placeholder }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);

  // Auto-resize textarea as user types
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  // Auto-focus textarea when active session changes or focus trigger is updated
  useEffect(() => {
    if (textareaRef.current && window.innerWidth >= 768) {
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
    <div className="w-full max-w-3xl mx-auto px-3 pb-3 sm:pb-4 pt-1 z-20">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center bg-white dark:bg-[#382A21] rounded-2xl border border-[#E7D5BE] dark:border-[#574234] shadow-md shadow-[#B4532A]/5 dark:shadow-black/40 focus-within:border-[#B4532A] dark:focus-within:border-[#D97745] focus-within:ring-2 focus-within:ring-[#B4532A]/20 transition-all">
          
          {/* Textarea (16px text-base on mobile avoids iOS zoom) */}
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder || "Ask Tilak's AI anything about his skills, projects, or background..."}
            rows={1}
            disabled={isLoading}
            className="w-full py-3 px-3.5 sm:px-4 text-base sm:text-sm text-[#35251C] dark:text-[#FFF5E8] placeholder-[#796557]/60 dark:placeholder-[#D3BEAA]/60 bg-transparent resize-none focus:outline-hidden disabled:opacity-50 max-h-32 overflow-y-auto font-sans leading-relaxed"
          />

          {/* Send Button */}
          <div className="pr-2 flex items-center flex-shrink-0">
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className={`p-2.5 rounded-xl flex items-center justify-center transition-all duration-200 w-10 h-10 ${
                input.trim() && !isLoading
                  ? 'bg-[#B4532A] hover:bg-[#963F1E] dark:bg-[#D97745] dark:hover:bg-[#E48858] text-white shadow-sm hover:scale-105 active:scale-95 cursor-pointer'
                  : 'bg-[#F5EBDD] dark:bg-[#2D231D] text-[#796557]/50 dark:text-[#D3BEAA]/40 cursor-not-allowed'
              }`}
              title="Send message"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Keyboard shortcut hint */}
        <div className="flex items-center justify-between px-2 mt-1 text-[11px] text-[#796557] dark:text-[#D3BEAA]">
          <span className="flex items-center gap-1">
            Press <kbd className="px-1 py-0.2 bg-[#F5EBDD] dark:bg-[#211A16] border border-[#E7D5BE] dark:border-[#574234] rounded text-[10px] font-mono text-[#796557] dark:text-[#D3BEAA]">Enter ↵</kbd> to send
          </span>
          <span className="hidden sm:inline">Grounded on Resume & Projects</span>
        </div>

      </form>
    </div>
  );
};

export default ChatInput;
