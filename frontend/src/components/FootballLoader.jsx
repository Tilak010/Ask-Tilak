import React from 'react';

export const FootballLoader = ({ message = 'Retrieving details & generating response...' }) => {
  return (
    <div className="flex items-start space-x-3 my-3 max-w-xl animate-fade-in">
      {/* AI Avatar */}
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C65D3A] to-[#E9A23B] dark:from-[#D96B45] dark:to-[#F0B35A] text-white flex items-center justify-center shadow-sm flex-shrink-0 mt-1">
        {/* Small Football SVG */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <polygon points="12,8 14.5,10 13.5,13 10.5,13 9.5,10" fill="currentColor" fillOpacity="0.3" />
        </svg>
      </div>

      {/* Bubble */}
      <div className="bg-[#FFF1E6] dark:bg-[#3A2924] border border-[#E8D5C7] dark:border-[#59433A] rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm text-[#2D211D] dark:text-[#FFF4EA] transition-colors">
        <div className="flex items-center space-x-3">
          {/* Bouncing Football Icon */}
          <div className="animate-football-bounce flex items-center justify-center w-6 h-6 rounded-full bg-[#F7EDE3] dark:bg-[#241A17] text-[#C65D3A] dark:text-[#F0B35A] shadow-inner">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v10M7 12h10" strokeDasharray="2 2" />
            </svg>
          </div>

          {/* Thinking text & pulsing dots */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold tracking-wide text-[#C65D3A] dark:text-[#F0B35A] uppercase">KickOff AI Thinking</span>
            <div className="flex space-x-1">
              <div className="w-1.5 h-1.5 bg-[#C65D3A] dark:bg-[#D96B45] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-1.5 h-1.5 bg-[#E9A23B] dark:bg-[#F0B35A] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-1.5 h-1.5 bg-[#A94A2E] dark:bg-[#E47B52] rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>

        <p className="text-xs text-[#6F5B52] dark:text-[#D5C0B5] mt-1.5 font-medium flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          {message}
        </p>
      </div>
    </div>
  );
};

export default FootballLoader;
