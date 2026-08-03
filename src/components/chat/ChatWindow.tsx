'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, Square, RotateCcw, PlusCircle, X, AlertCircle } from 'lucide-react';
import { MessageItem } from './MessageItem';
import { IMessageDocument } from '@/types';
import { DudiLogo } from '@/components/common/DudiLogo';

interface ChatWindowProps {
  onClose?: () => void;
  onNewChat?: () => void;
  anonymousSessionId: string;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ onClose, onNewChat, anonymousSessionId }) => {
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Partial<IMessageDocument>[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isStreaming]);

  // Init Conversation on load
  useEffect(() => {
    async function initChat() {
      try {
        const res = await fetch('/api/chat/conversations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ anonymousSessionId }),
        });
        const data = await res.json();
        if (data.success && data.data) {
          setConversationId(data.data._id);
          // Load previous messages
          const msgRes = await fetch(`/api/chat/conversations/${data.data._id}/messages`);
          const msgData = await msgRes.json();
          if (msgData.success && msgData.data) {
            setMessages(msgData.data);
          }
        }
      } catch (err) {
        console.error('[Chat Init Error]:', err);
        setError('Không thể kết nối máy chủ chat.');
      }
    }

    if (anonymousSessionId) {
      initChat();
    }
  }, [anonymousSessionId]);

  // Stop Stream Generation
  const handleStopStream = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsStreaming(false);
  };

  // New Chat Conversation
  const handleNewChat = async () => {
    handleStopStream();
    setMessages([]);
    setError(null);
    if (onNewChat) {
      onNewChat();
    } else {
      try {
        const res = await fetch('/api/chat/conversations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            anonymousSessionId: `${anonymousSessionId}_${Date.now()}`,
          }),
        });
        const data = await res.json();
        if (data.success && data.data) {
          setConversationId(data.data._id);
        }
      } catch (err) {
        setError('Lỗi khi tạo cuộc hội thoại mới.');
      }
    }
  };

  // Send Message & Process Stream
  const handleSendMessage = async (customContent?: string) => {
    const textToSend = customContent || input;
    if (!textToSend.trim() || isStreaming || !conversationId) return;

    setError(null);
    setInput('');

    // Append User Message to UI
    const tempUserMsg: Partial<IMessageDocument> = {
      role: 'USER',
      content: textToSend.trim(),
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, tempUserMsg]);

    // Append Assistant Placeholder
    const tempAssistantMsg: Partial<IMessageDocument> = {
      role: 'ASSISTANT',
      content: '',
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, tempAssistantMsg]);
    setIsStreaming(true);

    // Create AbortController for stream cancellation
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await fetch(`/api/chat/conversations/${conversationId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: textToSend.trim(),
          anonymousSessionId,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorJson = await response.json().catch(() => ({}));
        throw new Error(errorJson.error || 'Request gửi tin nhắn thất bại');
      }

      if (!response.body) {
        throw new Error('Dữ liệu stream không khả dụng');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let streamedText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunkText = decoder.decode(value, { stream: true });
        streamedText += chunkText;

        setMessages((prev) => {
          const updated = [...prev];
          const lastIdx = updated.length - 1;
          if (lastIdx >= 0 && updated[lastIdx].role === 'ASSISTANT') {
            updated[lastIdx] = {
              ...updated[lastIdx],
              content: streamedText,
            };
          }
          return updated;
        });
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.log('[Stream Aborted by User]');
      } else {
        console.error('[Send Message Error]:', err);
        setError(err.message || 'Lỗi kết nối với AI');
        // Mark last assistant msg with error status
        setMessages((prev) => {
          const updated = [...prev];
          const lastIdx = updated.length - 1;
          if (lastIdx >= 0 && updated[lastIdx].role === 'ASSISTANT') {
            updated[lastIdx] = {
              ...updated[lastIdx],
              status: 'ERROR',
              error: err.message || 'Lỗi tạo phản hồi',
            };
          }
          return updated;
        });
      }
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[560px] max-h-[85vh] w-full sm:w-[420px] bg-white border border-zinc-200 rounded-2xl shadow-2xl overflow-hidden font-sans">
      {/* Header - Red gradient */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-brand-600 to-brand-700 border-b border-brand-700">
        <div className="flex items-center gap-2.5">
          <DudiLogo className="w-8 h-8 rounded-lg shadow-sm border border-white/20" />
          <div>
            <h3 className="font-semibold text-sm text-white tracking-tight">DUDI SOFTWARE AI</h3>
            <p className="text-[11px] text-white/80 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Sẵn sàng tư vấn
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-white/70">
          <button
            onClick={handleNewChat}
            className="p-1.5 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            title="Tạo cuộc hội thoại mới"
          >
            <PlusCircle className="w-4 h-4" />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              title="Đóng cửa sổ chat"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          )}
        </div>
      </div>

      {/* Messages Container - Light background */}
      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar bg-zinc-50 space-y-2">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-500 space-y-3">
            <DudiLogo className="w-14 h-14 rounded-2xl shadow-md border border-brand-200" />
            <p className="text-sm font-semibold text-zinc-800">
              Xin chào! Tôi là Trợ lý AI DUDI SOFTWARE.
            </p>
            <p className="text-xs text-zinc-500 max-w-xs leading-relaxed">
              Tôi có thể giúp bạn giải đáp mọi thắc mắc về dịch vụ phần mềm, thiết kế website, ứng dụng di động và 400+ dự án của DUDI Software.
            </p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <MessageItem
              key={index}
              message={msg}
              isStreaming={isStreaming && index === messages.length - 1 && msg.role === 'ASSISTANT'}
            />
          ))
        )}

        {/* Global Error Banner */}
        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => handleSendMessage()}
              className="px-2 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded font-medium text-[11px] flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Thử lại
            </button>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form - Clean white */}
      <div className="p-3 bg-white border-t border-zinc-200">
        <div className="relative flex items-center bg-zinc-100 border border-zinc-200 rounded-xl focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20 transition-all">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            maxLength={2000}
            rows={1}
            disabled={isStreaming}
            placeholder="Nhập câu hỏi của bạn (Tối đa 2000 ký tự)..."
            className="w-full bg-transparent text-sm text-zinc-800 placeholder-zinc-400 px-3.5 py-2.5 focus:outline-none resize-none max-h-24 custom-scrollbar"
          />

          <div className="pr-2 flex items-center">
            {isStreaming ? (
              <button
                onClick={handleStopStream}
                className="p-1.5 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors"
                title="Dừng phản hồi"
              >
                <Square className="w-4 h-4 fill-current" />
              </button>
            ) : (
              <button
                onClick={() => handleSendMessage()}
                disabled={!input.trim()}
                className="p-1.5 bg-brand-600 hover:bg-brand-500 disabled:opacity-40 disabled:hover:bg-brand-600 text-white rounded-lg transition-all shadow-sm shadow-brand-600/20"
                title="Gửi tin nhắn"
              >
                <Send className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-2 px-1 text-[11px] text-zinc-400">
          <span>DUDI SOFTWARE AI v1.0</span>
          <span>{input.length}/2000 ký tự</span>
        </div>
      </div>
    </div>
  );
};
