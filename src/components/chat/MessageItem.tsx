'use client';

import React, { useState } from 'react';
import { User, ThumbsUp, ThumbsDown, Headset, BookOpen, AlertTriangle } from 'lucide-react';
import { MarkdownRenderer } from './MarkdownRenderer';
import { IMessageDocument } from '@/types';
import { DudiLogo } from '@/components/common/DudiLogo';

interface MessageItemProps {
  message: Partial<IMessageDocument>;
  isStreaming?: boolean;
  onOpenTicketModal?: () => void;
  onFeedback?: (messageId: string, rating: 'UP' | 'DOWN') => void;
}

export const MessageItem: React.FC<MessageItemProps> = ({
  message,
  isStreaming = false,
  onOpenTicketModal,
  onFeedback,
}) => {
  const isUser = message.role === 'USER';
  const [rated, setRated] = useState<'UP' | 'DOWN' | null>(null);

  const handleRating = (rating: 'UP' | 'DOWN') => {
    if (rated || !message._id) return;
    setRated(rating);
    if (onFeedback) {
      onFeedback(message._id.toString(), rating);
    }
  };

  return (
    <div
      className={`flex gap-3 mb-4 animate-fade-in ${
        isUser ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      {/* Avatar Icon */}
      {isUser ? (
        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm bg-brand-600 text-white">
          <User className="w-4.5 h-4.5" />
        </div>
      ) : (
        <DudiLogo className="w-8 h-8 rounded-full shadow-sm" />
      )}

      {/* Message Bubble */}
      <div className="flex flex-col max-w-[85%] sm:max-w-[78%]">
        <div
          className={`p-3.5 rounded-2xl text-sm ${
            isUser
              ? 'bg-brand-600 text-white rounded-tr-none shadow-sm'
              : 'bg-white border border-zinc-200 text-zinc-800 rounded-tl-none shadow-sm'
          }`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
          ) : (
            <div className={isStreaming ? 'typing-cursor' : ''}>
              <MarkdownRenderer content={message.content || ''} />
            </div>
          )}

          {/* Render Error Banner if error exists */}
          {message.status === 'ERROR' && (
            <div className="mt-2 p-2 rounded bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{message.error || 'Gặp sự cố khi kết nối với AI.'}</span>
            </div>
          )}
        </div>

        {/* References Citations (If RAG active) */}
        {!isUser && message.references && message.references.length > 0 && (
          <div className="mt-2 p-2 rounded-lg bg-zinc-100 border border-zinc-200 text-xs text-zinc-500">
            <div className="flex items-center gap-1.5 font-medium text-brand-500 mb-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Nguồn tham khảo:</span>
            </div>
            <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
              {message.references.map((ref, idx) => (
                <li key={idx} className="truncate">
                  {ref.title} (Độ khớp: {Math.round(ref.score * 100)}%)
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons for AI Responses */}
        {!isUser && !isStreaming && message.content && (
          <div className="flex items-center gap-2 mt-1.5 px-1 text-zinc-400 text-xs">
            {/* Feedback Buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleRating('UP')}
                disabled={!!rated}
                className={`p-1 hover:text-green-500 transition-colors rounded ${
                  rated === 'UP' ? 'text-green-500 font-bold' : ''
                }`}
                title="Hữu ích"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleRating('DOWN')}
                disabled={!!rated}
                className={`p-1 hover:text-red-500 transition-colors rounded ${
                  rated === 'DOWN' ? 'text-red-500 font-bold' : ''
                }`}
                title="Chưa đúng"
              >
                <ThumbsDown className="w-3.5 h-3.5" />
              </button>
            </div>

            <span className="text-zinc-300">|</span>

            {/* Handoff Support Ticket Button */}
            {onOpenTicketModal && (
              <button
                onClick={onOpenTicketModal}
                className="inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-brand-500 transition-colors"
              >
                <Headset className="w-3.5 h-3.5" />
                <span>Cần hỗ trợ trực tiếp</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
