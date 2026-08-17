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
            <ul key={pIdx} className="list-disc list-inside space-y-1.5 pl-1 my-2 text-slate-700">
              {lines.map((line, lIdx) => {
                const cleanLine = line.trim().replace(/^[-*]\s+/, '');
                return (
                  <li key={lIdx} className="text-slate-700 font-normal break-words">
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
      return <strong key={i} className="font-semibold text-slate-900 break-words">{part.slice(2, -2)}</strong>;
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
    <div className={`flex w-full my-3 z-10 ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}>
      <div className={`flex items-start gap-2 sm:gap-2.5 max-w-[92%] sm:max-w-[82%] md:max-w-[75%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar */}
        <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center shadow-xs flex-shrink-0 mt-0.5 ${
          isUser 
            ? 'bg-sky-600 text-white shadow-sky-600/30' 
            : 'bg-gradient-to-br from-sky-400 via-sky-500 to-blue-600 text-white shadow-sky-400/30'
        }`}>
          {isUser ? (
            <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          ) : (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="sm:w-4 sm:h-4">
              <circle cx="12" cy="12" r="9" />
              <polygon points="12,8 14.5,10 13.5,13 10.5,13 9.5,10" fill="currentColor" fillOpacity="0.3" />
            </svg>
          )}
        </div>

        {/* Message Bubble Container */}
        <div className="group relative flex flex-col min-w-0">
          {/* Header label for AI */}
          {!isUser && (
            <div className="flex items-center space-x-1.5 mb-1 px-1">
              <span className="text-[11px] font-bold text-sky-800 tracking-wide uppercase">KickOff AI</span>
              <span className="text-[10px] text-slate-400 font-medium">• Tilak AI</span>
            </div>
          )}

          {/* Bubble content */}
          <div className={`rounded-2xl px-3.5 sm:px-4 py-2.5 sm:py-3 shadow-xs transition-all ${
            isUser
              ? 'bg-sky-600 text-white rounded-tr-xs shadow-sky-500/20'
              : 'bg-white border border-sky-100/90 text-slate-800 rounded-tl-xs shadow-slate-200/50 hover:shadow-sky-100'
          }`}>
            <FormattedText content={message.text} />
          </div>

          {/* Footer bar (Timestamp & Copy button) */}
          <div className={`flex items-center gap-2 mt-1 px-1 text-[10px] text-slate-400 ${isUser ? 'justify-end' : 'justify-between'}`}>
            <span>{message.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            
            {!isUser && (
              <button
                onClick={handleCopy}
                className="opacity-70 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:text-sky-600 flex items-center gap-1 cursor-pointer p-0.5"
                title="Copy response"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span className="text-emerald-600 font-medium">Copied</span>
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
