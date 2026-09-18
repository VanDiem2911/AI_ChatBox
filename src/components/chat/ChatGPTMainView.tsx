'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  PanelLeft,
  ChevronDown,
  Plus,
  Mic,
  MessageSquare,
  Globe,
  FileText,
  Square,
  Shield,
  ArrowUp,
  LogIn
} from 'lucide-react';
import { ChatGPTMessageItem } from './ChatGPTMessageItem';
import { IMessageDocument } from '@/types';
import Link from 'next/link';

interface ChatGPTMainViewProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  messages: Partial<IMessageDocument>[];
  input: string;
  setInput: (val: string) => void;
  isStreaming: boolean;
  onSendMessage: (text?: string) => void;
  onStopStream: () => void;
  onNewChat: () => void;
}

export const ChatGPTMainView: React.FC<ChatGPTMainViewProps> = ({
  sidebarOpen,
  onToggleSidebar,
  messages,
  input,
  setInput,
  isStreaming,
  onSendMessage,
  onStopStream,
  onNewChat,
}) => {
  const [selectedModel, setSelectedModel] = useState('DUDI-RAG');
  const [showModelDropdown, setShowModelDropdown] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  // Handle textarea auto-resize
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  const handleActionClick = (promptText: string) => {
    setInput(promptText);
    onSendMessage(promptText);
  };

  const models = [
    { id: 'DUDI-RAG', name: 'DUDI Software AI', badge: 'Vector RAG' },
    { id: 'ChatGPT-4o', name: 'ChatGPT', badge: 'GPT-4o' },
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-[#212121] text-[#ececec] relative overflow-hidden font-sans">
      {/* Top Header Navigation */}
      <header className="h-14 border-b border-[#2f2f2f]/60 flex items-center justify-between px-4 z-20 bg-[#212121]/90 backdrop-blur-md sticky top-0">
        <div className="flex items-center gap-3">
          {/* Toggle sidebar icon if sidebar closed */}
          {!sidebarOpen && (
            <button
              onClick={onToggleSidebar}
              className="p-2 hover:bg-[#2f2f2f] rounded-lg text-[#b4b4b4] hover:text-white transition-colors"
              title="Mở sidebar"
            >
              <PanelLeft className="w-5 h-5" />
            </button>
          )}

          {/* Model Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowModelDropdown((prev) => !prev)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-[#2f2f2f] text-[#ececec] font-bold text-lg tracking-tight transition-colors"
            >
              <span>{models.find((m) => m.id === selectedModel)?.name || 'DUDI Software AI'}</span>
              <ChevronDown className="w-4 h-4 text-[#8e8e8e]" />
            </button>

            {/* Dropdown Menu */}
            {showModelDropdown && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-[#2f2f2f] border border-[#383838] rounded-2xl shadow-2xl p-1.5 z-50 animate-fade-in">
                {models.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      setSelectedModel(m.id);
                      setShowModelDropdown(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                      selectedModel === m.id
                        ? 'bg-[#383838] text-white font-semibold'
                        : 'text-[#b4b4b4] hover:text-white hover:bg-[#212121]'
                    }`}
                  >
                    <span>{m.name}</span>
                    <span className="text-[10px] bg-[#212121] text-[#8e8e8e] px-2 py-0.5 rounded-md border border-[#424242]">
                      {m.badge}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Header Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#b4b4b4] hover:text-white hover:bg-[#2f2f2f] rounded-lg transition-colors"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Quản trị Admin</span>
          </Link>

          <Link
            href="/login"
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold rounded-full shadow-sm transition-all hover:scale-105 active:scale-95"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Đăng nhập</span>
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
        {messages.length === 0 ? (
          /* EMPTY STATE - Clean & Focused for DUDI AI */
          <div className="flex-1 flex flex-col items-center justify-center px-4 max-w-3xl mx-auto w-full text-center py-8">
            {/* Center Heading */}
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#ececec] mb-8 tracking-tight">
              Hôm nay tôi có thể giúp gì cho bạn?
            </h1>

            {/* Central Main Input Container */}
            <div className="w-full bg-[#2f2f2f] border border-[#383838] rounded-3xl p-3 shadow-2xl focus-within:border-[#4f4f4f] transition-all">
              <div className="flex items-center gap-2 px-2">
                <button
                  className="p-2 hover:bg-[#383838] rounded-full text-[#b4b4b4] hover:text-white transition-colors"
                  title="Thêm tệp"
                >
                  <Plus className="w-5 h-5" />
                </button>

                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={1}
                  placeholder="Hỏi về dịch vụ, phần mềm, báo giá thiết kế website DUDI Software..."
                  className="w-full bg-transparent text-[#ececec] placeholder-[#8e8e8e] text-sm focus:outline-none resize-none min-h-[44px] max-h-48 py-2.5 custom-scrollbar"
                />

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    className="p-2 hover:bg-[#383838] rounded-full text-[#b4b4b4] hover:text-white transition-colors"
                    title="Nhập bằng giọng nói"
                  >
                    <Mic className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => onSendMessage()}
                    disabled={!input.trim()}
                    className={`p-2 rounded-full transition-all ${
                      input.trim()
                        ? 'bg-brand-600 text-white hover:bg-brand-500 shadow-md'
                        : 'bg-[#171717] text-[#5e5e5e] border border-[#383838]'
                    }`}
                    title="Gửi tin nhắn"
                  >
                    <ArrowUp className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Real Useful Suggestion Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6 w-full max-w-2xl">
              <button
                onClick={() => handleActionClick('Tư vấn cho tôi các dịch vụ làm website và app di động tại DUDI Software')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#212121] border border-[#2f2f2f] hover:bg-[#2f2f2f] text-xs font-medium text-[#ececec] transition-all"
              >
                <MessageSquare className="w-4 h-4 text-brand-400" />
                <span>Tư vấn dịch vụ website & app</span>
              </button>

              <button
                onClick={() => handleActionClick('Cho tôi xem thông tin và danh sách các dự án thực tế DUDI đã thực hiện')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#212121] border border-[#2f2f2f] hover:bg-[#2f2f2f] text-xs font-medium text-[#ececec] transition-all"
              >
                <Globe className="w-4 h-4 text-blue-400" />
                <span>Truy xuất 400+ dự án thực tế</span>
              </button>

              <button
                onClick={() => handleActionClick('Tôi muốn nhận báo giá thiết kế ứng dụng quản lý doanh nghiệp')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#212121] border border-[#2f2f2f] hover:bg-[#2f2f2f] text-xs font-medium text-[#ececec] transition-all"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Yêu cầu báo giá phần mềm</span>
              </button>
            </div>
          </div>
        ) : (
          /* ACTIVE CHAT STATE - Full Message Thread */
          <div className="flex-1 py-6 space-y-6">
            {messages.map((msg, index) => (
              <ChatGPTMessageItem
                key={index}
                message={msg}
                isStreaming={isStreaming && index === messages.length - 1 && msg.role === 'ASSISTANT'}
                onRetry={index === messages.length - 1 ? () => onSendMessage() : undefined}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Active Chat Bottom Input Dock (when chatting) */}
      {messages.length > 0 && (
        <div className="p-4 bg-[#212121] border-t border-[#2f2f2f]/50">
          <div className="max-w-3xl mx-auto w-full">
            <div className="bg-[#2f2f2f] border border-[#383838] rounded-3xl p-2.5 shadow-xl focus-within:border-[#4f4f4f] transition-all">
              <div className="flex items-center gap-2 px-1">
                <button
                  className="p-2 hover:bg-[#383838] rounded-full text-[#b4b4b4] hover:text-white transition-colors"
                  title="Thêm tệp"
                >
                  <Plus className="w-5 h-5" />
                </button>

                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isStreaming}
                  rows={1}
                  placeholder="Hỏi thêm chi tiết về DUDI SOFTWARE AI..."
                  className="w-full bg-transparent text-[#ececec] placeholder-[#8e8e8e] text-sm focus:outline-none resize-none min-h-[38px] max-h-36 py-2 custom-scrollbar"
                />

                <div className="flex items-center gap-1 shrink-0">
                  {isStreaming ? (
                    <button
                      onClick={onStopStream}
                      className="p-2 bg-[#ececec] hover:bg-white text-black rounded-full transition-colors"
                      title="Dừng phản hồi"
                    >
                      <Square className="w-4 h-4 fill-current" />
                    </button>
                  ) : (
                    <button
                      onClick={() => onSendMessage()}
                      disabled={!input.trim()}
                      className={`p-2 rounded-full transition-all ${
                        input.trim()
                          ? 'bg-brand-600 text-white hover:bg-brand-500 shadow-md'
                          : 'bg-[#171717] text-[#5e5e5e] border border-[#383838]'
                      }`}
                      title="Gửi"
                    >
                      <ArrowUp className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="text-center mt-2 text-[11px] text-[#8e8e8e]">
              DUDI SOFTWARE AI hỗ trợ tự động tư vấn 24/7.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
