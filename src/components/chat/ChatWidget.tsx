'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Sparkles } from 'lucide-react';
import { ChatWindow } from './ChatWindow';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [anonymousSessionId, setAnonymousSessionId] = useState<string>('');

  const handleToggleOpen = () => {
    const nextOpen = !isOpen;
    if (nextOpen) {
      // Create a brand new session every time the user opens/enters the conversation
      const newSessionId = `sess_${Math.random().toString(36).substring(2, 11)}_${Date.now()}`;
      setAnonymousSessionId(newSessionId);
    }
    setIsOpen(nextOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window Popup */}
      {isOpen && anonymousSessionId && (
        <div className="mb-4 animate-slide-up">
          <ChatWindow
            anonymousSessionId={anonymousSessionId}
            onClose={() => setIsOpen(false)}
          />
        </div>
      )}

      {/* Floating Action Trigger Button - Red DUDI style */}
      <button
        onClick={handleToggleOpen}
        className="group relative flex items-center justify-center w-14 h-14 bg-gradient-to-br from-brand-500 to-brand-700 hover:from-brand-400 hover:to-brand-600 text-white rounded-full glow-red transform hover:scale-105 active:scale-95 transition-all duration-200"
        aria-label="Mở Chatbot Tư vấn"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageSquare className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-white items-center justify-center text-[9px] font-bold text-brand-600">
                <Sparkles className="w-2.5 h-2.5" />
              </span>
            </span>
          </>
        )}
      </button>
    </div>
  );
};
