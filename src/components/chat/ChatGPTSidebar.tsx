'use client';

import React, { useState } from 'react';
import {
  SquarePen,
  Search,
  PanelLeftClose,
  MessageSquare,
  LogIn,
  User,
  Plus
} from 'lucide-react';
import { DudiLogo } from '@/components/common/DudiLogo';
import Link from 'next/link';

export interface ChatHistoryItem {
  _id: string;
  title: string;
  lastMessageAt?: string | Date;
}

interface ChatGPTSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  conversations: ChatHistoryItem[];
  activeId: string | null;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
}

export const ChatGPTSidebar: React.FC<ChatGPTSidebarProps> = ({
  isOpen,
  onToggle,
  conversations,
  activeId,
  onSelectConversation,
  onNewChat,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);

  const historyList = conversations.map((c) => ({
    id: c._id,
    title: c.title || 'Cuộc trò chuyện mới',
  }));

  const filteredHistory = historyList.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Overlay backdrop for small screens when sidebar is open */}
      {isOpen && (
        <div
          onClick={onToggle}
          className="md:hidden fixed inset-0 bg-black/60 z-30 backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 flex flex-col bg-[#171717] border-r border-[#2f2f2f] text-[#ececec] transition-all duration-300 ease-in-out ${
          isOpen ? 'w-[260px] translate-x-0' : 'w-0 -translate-x-full md:translate-x-0 md:w-0 overflow-hidden border-none'
        }`}
      >
        <div className="w-[260px] flex flex-col h-full">
          {/* Sidebar Top Controls */}
          <div className="flex items-center justify-between p-3 border-b border-[#262626]/50">
            <div className="flex items-center gap-2">
              <button
                onClick={onNewChat}
                className="p-1.5 hover:bg-[#2f2f2f] rounded-lg text-[#b4b4b4] hover:text-white transition-colors flex items-center gap-2"
                title="DUDI SOFTWARE AI"
              >
                <DudiLogo className="w-6 h-6 rounded-md" />
                <span className="font-bold text-xs tracking-tight text-white">DUDI AI</span>
              </button>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowSearchInput((prev) => !prev)}
                className="p-2 hover:bg-[#2f2f2f] rounded-lg text-[#b4b4b4] hover:text-white transition-colors"
                title="Tìm kiếm đoạn chat"
              >
                <Search className="w-4 h-4" />
              </button>
              <button
                onClick={onToggle}
                className="p-2 hover:bg-[#2f2f2f] rounded-lg text-[#b4b4b4] hover:text-white transition-colors"
                title="Thu gọn sidebar"
              >
                <PanelLeftClose className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Search Bar Input (if toggled) */}
          {showSearchInput && (
            <div className="px-3 pt-2">
              <input
                type="text"
                placeholder="Tìm kiếm lịch sử..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#212121] border border-[#2f2f2f] rounded-lg px-3 py-1.5 text-xs text-[#ececec] placeholder-[#8e8e8e] focus:outline-none focus:border-[#424242]"
              />
            </div>
          )}

          {/* Main Action Menu */}
          <div className="p-3">
            <button
              onClick={onNewChat}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-semibold rounded-xl text-white bg-brand-600 hover:bg-brand-500 transition-all shadow-md shadow-brand-600/20"
            >
              <Plus className="w-4 h-4" />
              <span>Đoạn chat mới</span>
            </button>
          </div>

          <div className="h-px bg-[#262626] mx-3 mb-2" />

          {/* Chat History Section */}
          <div className="flex-1 overflow-y-auto custom-scrollbar px-2 space-y-2">
            <div className="px-3 py-1 text-xs font-semibold text-[#8e8e8e] flex items-center justify-between">
              <span>Lịch sử trò chuyện</span>
              <span className="text-[10px] bg-[#212121] px-1.5 py-0.5 rounded text-[#8e8e8e]">
                {historyList.length}
              </span>
            </div>

            {filteredHistory.length === 0 ? (
              <div className="px-3 py-6 text-center text-xs text-[#8e8e8e]">
                Chưa có cuộc trò chuyện nào. Bắt đầu chat để lưu lịch sử!
              </div>
            ) : (
              <div className="space-y-0.5">
                {filteredHistory.map((item) => {
                  const isSelected = activeId === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onSelectConversation(item.id)}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-xs rounded-lg transition-colors text-left truncate ${
                        isSelected
                          ? 'bg-[#2f2f2f] text-white font-medium border border-[#383838]'
                          : 'text-[#b4b4b4] hover:text-white hover:bg-[#212121]'
                      }`}
                      title={item.title}
                    >
                      <MessageSquare className="w-3.5 h-3.5 shrink-0 text-brand-400" />
                      <span className="truncate">{item.title}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Guest / Anonymous User Footer Card */}
          <div className="p-3 border-t border-[#262626] bg-[#171717]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-[#2f2f2f] border border-[#383838] flex items-center justify-center text-[#ececec] shrink-0">
                  <User className="w-4 h-4 text-[#8e8e8e]" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-[#ececec] truncate">Khách (Ẩn danh)</div>
                  <div className="text-[10px] text-[#8e8e8e]">DUDI Free Session</div>
                </div>
              </div>

              <Link
                href="/login"
                className="px-2.5 py-1.5 bg-[#2f2f2f] hover:bg-[#383838] text-white rounded-lg text-xs font-medium transition-colors border border-[#424242]/50 flex items-center gap-1.5 shrink-0"
              >
                <LogIn className="w-3.5 h-3.5 text-brand-400" />
                <span>Đăng nhập</span>
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
