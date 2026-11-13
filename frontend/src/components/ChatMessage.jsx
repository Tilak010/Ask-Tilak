import React, { useState } from 'react';
import { Copy, Check, User } from 'lucide-react';

/**
 * Format markdown-like syntax into clean HTML structures (bolding, lists, line breaks)
 */
const FormattedText = ({ content }) => {
  if (!content) return null;

  // Split by double line breaks into paragraphs
  const paragraphs = content.split(/\n\n+/);

  return (
    <div className="space-y-2 text-sm leading-relaxed break-words [overflow-wrap:anywhere]">
      {paragraphs.map((paragraph, pIdx) => {
        // Handle list lines starting with - or *
        const lines = paragraph.split('\n');
        const isList = lines.every(l => l.trim().startsWith('- ') || l.trim().startsWith('* '));

        if (isList) {
          return (
            <ul key={pIdx} className="list-disc list-inside space-y-1.5 pl-1 my-2 text-inherit">
              {lines.map((line, lIdx) => {
                const cleanLine = line.trim().replace(/^[-*]\s+/, '');
                return (
                  <li key={lIdx} className="font-normal break-words">
                    {parseInlineBold(cleanLine)}
                  </li>
                );
              })}
            </ul>
          );
        }

        return (
          <p key={pIdx} className="whitespace-pre-wrap break-words">
            {lines.map((line, lineIdx) => (
              <React.Fragment key={lineIdx}>
                {parseInlineBold(line)}
                {lineIdx < lines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
};

const parseInlineBold = (text) => {
  // Simple bold parser for **text**
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold break-words">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

export const ChatMessage = ({ message }) => {
  const isUser = message.sender === 'user';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!message.text) return;
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex w-full my-2.5 z-10 ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}>
      <div className={`flex items-start gap-2 max-w-[92%] sm:max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar */}
        <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-semibold shadow-xs flex-shrink-0 mt-0.5 ${
          isUser 
            ? 'bg-[#B4532A] dark:bg-[#D97745] text-white' 
            : 'bg-gradient-to-tr from-[#B4532A] to-[#E9A23B] dark:from-[#D97745] dark:to-[#E9AD55] text-white'
        }`}>
          {isUser ? (
            <User className="w-3.5 h-3.5" />
          ) : (
            <span className="text-[10px] font-bold">AI</span>
          )}
        </div>

        {/* Message Bubble Container */}
        <div className="group relative flex flex-col min-w-0 max-w-full">
          {/* Header label for AI */}
          {!isUser && (
            <div className="flex items-center space-x-1.5 mb-1 px-1">
              <span className="text-[11px] font-bold text-[#B4532A] dark:text-[#E9AD55]">Tilak AI</span>
              <span className="text-[10px] text-[#796557]/70 dark:text-[#D3BEAA]/70 font-medium">• Assistant</span>
            </div>
          )}

          {/* Bubble content */}
          <div className={`rounded-2xl px-3.5 sm:px-4 py-2.5 sm:py-3 shadow-xs text-sm transition-all ${
            isUser
              ? 'bg-[#B4532A] dark:bg-[#D97745] text-white rounded-tr-xs'
              : 'bg-[#FFFCF5] dark:bg-[#382A21] border border-[#E7D5BE] dark:border-[#574234] text-[#35251C] dark:text-[#FFF5E8] rounded-tl-xs'
          }`}>
            <FormattedText content={message.text} />
          </div>

          {/* Footer bar (Timestamp & Copy button) */}
          <div className={`flex items-center gap-2 mt-1 px-1 text-[10px] text-[#796557]/80 dark:text-[#D3BEAA]/80 ${isUser ? 'justify-end' : 'justify-between'}`}>
            <span>{message.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            
            {!isUser && (
              <button
                onClick={handleCopy}
                className="opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity hover:text-[#B4532A] dark:hover:text-[#E9AD55] flex items-center gap-1 cursor-pointer p-0.5"
                title="Copy response"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ChatMessage;
