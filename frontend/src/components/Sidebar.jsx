import React from 'react';
import { Plus, MessageSquare, Trash2, X, ChevronRight, Bot } from 'lucide-react';

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
          className="fixed inset-0 bg-slate-900/50 dark:bg-black/70 backdrop-blur-xs z-40 md:hidden transition-opacity"
        />
      )}

      {/* Sidebar Panel */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40
        w-72 h-full flex-shrink-0 bg-[#241A17] text-[#FFF4EA]
        border-r border-[#59433A] shadow-xl
        flex flex-col justify-between
        transform transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:hidden'}
      `}>
        
        {/* Top Header */}
        <div className="p-4 border-b border-[#59433A]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#D96B45] flex items-center justify-center text-xs font-bold text-white">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold tracking-tight text-[#FFF4EA]">
                  Conversations
                </h2>
                <p className="text-[11px] text-[#D5C0B5]">Tilak AI Assistant</p>
              </div>
            </div>

            {/* Mobile close button */}
            <button 
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#D5C0B5] hover:text-white hover:bg-[#30221E] transition-colors cursor-pointer"
              title="Close sidebar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* New Chat Button */}
          <button
            onClick={() => {
              onNewChat();
              onClose();
            }}
            className="w-full py-2 px-3 rounded-xl bg-[#D96B45] hover:bg-[#E47B52] text-white font-semibold text-xs shadow-sm flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Conversation</span>
          </button>
        </div>

        {/* Middle: Conversation Sessions History */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#D5C0B5] flex items-center justify-between">
            <span>Saved History</span>
            <span className="text-[10px] bg-[#30221E] border border-[#59433A] px-1.5 py-0.2 rounded text-[#D5C0B5]">
              {sessions.length}
            </span>
          </div>

          {sessions.length === 0 ? (
            <div className="p-4 text-center text-[#D5C0B5] text-xs my-4 border border-dashed border-[#59433A] rounded-xl">
              <MessageSquare className="w-5 h-5 mx-auto mb-2 opacity-40 text-[#D5C0B5]" />
              <p>No chat history yet.</p>
              <p className="text-[10px] text-[#D5C0B5]/70 mt-1">Start a conversation to ask questions!</p>
            </div>
          ) : (
            sessions.map((session) => {
              const isActive = session.id === activeSessionId;
              return (
                <div
                  key={session.id}
                  onClick={() => {
                    onSelectSession(session.id);
                    onClose();
                  }}
                  className={`w-full p-2.5 rounded-xl text-left text-xs transition-all flex items-center justify-between group cursor-pointer ${
                    isActive
                      ? 'bg-[#3A2924] border border-[#D96B45]/40 text-[#FFF4EA] font-semibold shadow-inner'
                      : 'text-[#D5C0B5] hover:bg-[#30221E] hover:text-[#FFF4EA]'
                  }`}
                >
                  <div className="flex items-center space-x-2 truncate min-w-0 flex-1 pr-1">
                    <MessageSquare className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-[#F0B35A]' : 'text-[#D5C0B5]/60'}`} />
                    <span className="truncate">{session.title || 'Conversation'}</span>
                  </div>

                  <div className="flex items-center space-x-1 flex-shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        onDeleteSession(session.id);
                      }}
                      className="p-1 rounded-md text-[#D5C0B5] hover:text-rose-300 hover:bg-[#3A2924] transition-colors cursor-pointer"
                      title="Delete conversation"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                    <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-[#F0B35A]' : 'text-[#D5C0B5]/50'}`} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Actions */}
        {sessions.length > 0 && (
          <div className="p-3 border-t border-[#59433A] bg-[#1c1412]">
            <button
              onClick={onClearHistory}
              className="w-full py-1.5 px-3 rounded-lg text-[#D5C0B5] hover:text-rose-300 hover:bg-rose-950/30 text-xs font-medium flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          </div>
        )}

      </aside>
    </>
  );
};

export default Sidebar;
