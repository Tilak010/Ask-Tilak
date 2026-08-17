import React from 'react';
import FootballLogo from './FootballLogo';
import { Plus, MessageSquare, Trash2, X, Trophy, ChevronRight } from 'lucide-react';

export const Sidebar = ({ 
  isOpen, 
  onClose, 
  sessions, 
  activeSessionId, 
  onSelectSession, 
  onDeleteSession,
  onNewChat, 
  onClearHistory 
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-30 md:hidden transition-opacity"
        />
      )}

      {/* Sidebar Panel */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40
        w-72 bg-gradient-to-b from-slate-900 via-slate-900 to-sky-950 text-white
        border-r border-sky-900/50 shadow-xl
        flex flex-col justify-between
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        
        {/* Top Header */}
        <div className="p-4 border-b border-slate-800/80">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2.5">
              <FootballLogo size="md" />
              <div>
                <h2 className="text-base font-extrabold tracking-tight text-white flex items-center gap-1.5">
                  KickOff AI
                </h2>
                <p className="text-[11px] text-sky-300/80 font-medium">Tilak Representative</p>
              </div>
            </div>

            {/* Mobile close button */}
            <button 
              onClick={onClose}
              className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* New Chat Button */}
          <button
            onClick={() => {
              onNewChat();
              if (window.innerWidth < 768) onClose();
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold text-xs shadow-md shadow-sky-500/25 flex items-center justify-center space-x-2 transition-all duration-200 group cursor-pointer"
          >
            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
            <span>New Chat</span>
          </button>
        </div>

        {/* Middle: Conversation Sessions History */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-sky-400/70 flex items-center justify-between">
            <span>Recent Conversations</span>
            <span className="text-[9px] bg-sky-950 px-1.5 py-0.5 rounded-sm border border-sky-800/40 text-sky-300">
              {sessions.length}
            </span>
          </div>

          {sessions.length === 0 ? (
            <div className="p-4 text-center text-slate-500 text-xs my-4 border border-dashed border-slate-800 rounded-xl">
              <MessageSquare className="w-6 h-6 mx-auto mb-2 opacity-40 text-sky-400" />
              <p>No chat history yet.</p>
              <p className="text-[10px] text-slate-600 mt-1">Start a new chat to kick off!</p>
            </div>
          ) : (
            sessions.map((session) => {
              const isActive = session.id === activeSessionId;
              return (
                <div
                  key={session.id}
                  onClick={() => {
                    onSelectSession(session.id);
                    if (window.innerWidth < 768) onClose();
                  }}
                  className={`w-full p-2.5 rounded-xl text-left text-xs transition-all flex items-center justify-between group cursor-pointer ${
                    isActive
                      ? 'bg-sky-600/30 text-sky-100 border border-sky-500/40 font-semibold shadow-inner'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 truncate min-w-0 flex-1 pr-1">
                    <MessageSquare className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-sky-400' : 'text-slate-500 group-hover:text-sky-300'}`} />
                    <span className="truncate">{session.title || 'Conversation'}</span>
                  </div>

                  {/* Actions: Delete icon per conversation */}
                  <div className="flex items-center space-x-1 flex-shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        onDeleteSession(session.id);
                      }}
                      className="p-1 rounded-md text-slate-400 hover:text-rose-400 hover:bg-slate-700/60 opacity-70 sm:opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                      title="Delete conversation"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <ChevronRight className={`w-3.5 h-3.5 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? 'opacity-100 text-sky-400' : ''}`} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer: Subtle Football Vector Accent & Actions */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/60">
          {sessions.length > 0 && (
            <button
              onClick={onClearHistory}
              className="w-full py-2 px-3 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 text-xs font-medium flex items-center justify-center space-x-1.5 transition-colors mb-2 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All History</span>
            </button>
          )}

          {/* Tactical Pitch Lines Graphic Accent */}
          <div className="p-2.5 rounded-xl bg-sky-950/50 border border-sky-800/30 flex items-center justify-between text-[11px] text-sky-300/80">
            <div className="flex items-center space-x-2">
              <Trophy className="w-4 h-4 text-sky-400 flex-shrink-0" />
              <div>
                <span className="font-semibold text-white block leading-none">Tilak AI Hub</span>
                <span className="text-[9px] text-slate-400">Tilak's AI Representative</span>
              </div>
            </div>

            {/* Small football motif */}
            <div className="w-5 h-5 rounded-full bg-sky-900/80 flex items-center justify-center text-sky-300">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 3v18" />
              </svg>
            </div>
          </div>
        </div>

      </aside>
    </>
  );
};

export default Sidebar;
