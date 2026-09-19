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
        <div className="relative flex items-center bg-white dark:bg-[#3A2924] rounded-2xl border border-[#E8D5C7] dark:border-[#59433A] shadow-md shadow-[#C65D3A]/5 dark:shadow-black/40 focus-within:border-[#C65D3A] dark:focus-within:border-[#D96B45] focus-within:ring-2 focus-within:ring-[#C65D3A]/20 transition-all">
          
          {/* Textarea (16px text-base on mobile avoids iOS zoom) */}
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder || "Ask Tilak's AI anything about his skills, projects, or background..."}
            rows={1}
            disabled={isLoading}
            className="w-full py-3 px-3.5 sm:px-4 text-base sm:text-sm text-[#2D211D] dark:text-[#FFF4EA] placeholder-[#6F5B52]/60 dark:placeholder-[#D5C0B5]/60 bg-transparent resize-none focus:outline-hidden disabled:opacity-50 max-h-32 overflow-y-auto font-sans leading-relaxed"
          />

          {/* Send Button */}
          <div className="pr-2 flex items-center flex-shrink-0">
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className={`p-2.5 rounded-xl flex items-center justify-center transition-all duration-200 w-10 h-10 ${
                input.trim() && !isLoading
                  ? 'bg-[#C65D3A] hover:bg-[#A94A2E] dark:bg-[#D96B45] dark:hover:bg-[#E47B52] text-white shadow-sm hover:scale-105 active:scale-95 cursor-pointer'
                  : 'bg-[#F7EDE3] dark:bg-[#30221E] text-[#6F5B52]/50 dark:text-[#D5C0B5]/40 cursor-not-allowed'
              }`}
              title="Send message"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Keyboard shortcut hint */}
        <div className="flex items-center justify-between px-2 mt-1 text-[11px] text-[#6F5B52] dark:text-[#D5C0B5]">
          <span className="flex items-center gap-1">
            Press <kbd className="px-1 py-0.2 bg-[#F7EDE3] dark:bg-[#241A17] border border-[#E8D5C7] dark:border-[#59433A] rounded text-[10px] font-mono text-[#6F5B52] dark:text-[#D5C0B5]">Enter ↵</kbd> to send
          </span>
          <span className="hidden sm:inline">Grounded on Resume & Projects</span>
        </div>

      </form>
    </div>
  );
};

export default ChatInput;
