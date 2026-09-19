'use client';

import React, { useEffect, useState } from 'react';
import { ThumbsUp, ThumbsDown, Copy, Check, RotateCcw, BookOpen, AlertTriangle } from 'lucide-react';
import { MarkdownRenderer } from './MarkdownRenderer';
import { IMessageDocument } from '@/types';
import { DudiLogo } from '@/components/common/DudiLogo';

interface ChatGPTMessageItemProps {
  message: Partial<IMessageDocument>;
  isStreaming?: boolean;
  onRetry?: () => void;
}

const WAITING_MESSAGES = [
  'Đang suy nghĩ',
  'Đang tìm thông tin phù hợp',
  'Đang soạn câu trả lời, đợi mình chút nhé',
] as const;

export const ChatGPTMessageItem: React.FC<ChatGPTMessageItemProps> = ({
  message,
  isStreaming = false,
  onRetry,
}) => {
  const isUser = message.role === 'USER';
  const [copied, setCopied] = useState(false);
  const [rated, setRated] = useState<'UP' | 'DOWN' | null>(null);
  const [waitingMessageIndex, setWaitingMessageIndex] = useState(0);

  useEffect(() => {
    if (!isStreaming || message.content) {
      setWaitingMessageIndex(0);
      return;
    }

    const searchTimer = window.setTimeout(() => setWaitingMessageIndex(1), 2200);
    const composeTimer = window.setTimeout(() => setWaitingMessageIndex(2), 5000);

    return () => {
      window.clearTimeout(searchTimer);
      window.clearTimeout(composeTimer);
    };
  }, [isStreaming, message.content]);

  const handleCopy = () => {
    if (message.content) {
      navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full py-3 px-4 md:px-0 max-w-3xl mx-auto flex flex-col gap-2">
      {isUser ? (
        /* User Message - Align Right Bubble */
        <div className="flex justify-end w-full">
          <div className="bg-[#2f2f2f] text-white font-medium px-4 py-2.5 rounded-3xl max-w-[85%] text-sm leading-relaxed whitespace-pre-wrap break-words border border-[#383838] shadow-xs">
            {message.content}
          </div>
        </div>
      ) : (
        /* Assistant Message - ChatGPT standard layout */
        <div className="flex gap-3.5 w-full items-start">
          {/* Avatar Icon */}
          <div className="w-7 h-7 rounded-full bg-[#10a37f] flex items-center justify-center shrink-0 border border-white/20 mt-0.5 shadow-sm">
            <DudiLogo className="w-5 h-5 rounded-full" />
          </div>

          {/* Content Body */}
          <div className="flex-1 min-w-0 text-[#ececec] text-sm leading-relaxed space-y-3">
            {isStreaming && !message.content ? (
              <div
                role="status"
                aria-live="polite"
                className="inline-flex items-center gap-2 py-1 text-[#b4b4b4]"
              >
                <span>{WAITING_MESSAGES[waitingMessageIndex]}</span>
                <span className="flex items-center gap-1" aria-hidden="true">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-400 animate-bounce [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-400 animate-bounce [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-400 animate-bounce" />
                </span>
              </div>
            ) : (
              <div className={isStreaming ? 'typing-cursor' : ''}>
                <MarkdownRenderer content={message.content || ''} />
              </div>
            )}

            {/* Render Error State if any */}
            {message.status === 'ERROR' && (
              <div className="p-3 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{message.error || 'Đã xảy ra lỗi khi tạo phản hồi.'}</span>
                </div>
                {onRetry && (
                  <button
                    onClick={onRetry}
                    className="px-2.5 py-1 bg-red-900/60 hover:bg-red-800 text-red-200 rounded-lg font-medium text-xs flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Thử lại
                  </button>
                )}
              </div>
            )}

            {/* RAG References / Citations */}
            {message.references && message.references.length > 0 && (
              <div className="mt-2 p-2.5 rounded-xl bg-[#2a2a2a] border border-[#383838] text-xs text-[#b4b4b4]">
                <div className="flex items-center gap-1.5 font-medium text-brand-400 mb-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Nguồn thông tin tham khảo:</span>
                </div>
                <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                  {message.references.map((ref, idx) => (
                    <li key={idx} className="truncate">
                      {ref.title} (Độ chính xác: {Math.round(ref.score * 100)}%)
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Bar (Copy, Like, Dislike, Retry) */}
            {!isStreaming && message.content && (
              <div className="flex items-center gap-1.5 pt-1 text-[#8e8e8e]">
                <button
                  onClick={handleCopy}
                  className="p-1.5 hover:text-white hover:bg-[#2f2f2f] rounded-md transition-colors"
                  title="Sao chép tin nhắn"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => setRated('UP')}
                  className={`p-1.5 hover:text-white hover:bg-[#2f2f2f] rounded-md transition-colors ${
                    rated === 'UP' ? 'text-green-400' : ''
                  }`}
                  title="Phản hồi tốt"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setRated('DOWN')}
                  className={`p-1.5 hover:text-white hover:bg-[#2f2f2f] rounded-md transition-colors ${
                    rated === 'DOWN' ? 'text-red-400' : ''
                  }`}
                  title="Phản hồi chưa tốt"
                >
                  <ThumbsDown className="w-3.5 h-3.5" />
                </button>
                {onRetry && (
                  <button
                    onClick={onRetry}
                    className="p-1.5 hover:text-white hover:bg-[#2f2f2f] rounded-md transition-colors"
                    title="Tạo lại phản hồi"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
