'use client';

import React, { useState, useMemo } from 'react';
import {
  MessageSquare,
  Clock,
  User,
  Bot,
  BookOpen,
  FileText,
  Calendar,
  Filter,
  Search,
  X,
  Sparkles,
  Inbox,
  AlertCircle,
} from 'lucide-react';

export interface AdminMessage {
  _id: string;
  role: 'USER' | 'ASSISTANT' | 'SYSTEM' | 'AGENT' | 'TOOL';
  content: string;
  model?: string | null;
  status: string;
  createdAt: string;
  references?: Array<{
    title: string;
    score: number;
  }>;
}

export interface AdminConversation {
  _id: string;
  title: string;
  status: string;
  summary?: string | null;
  memorySummary?: string | null;
  lastMessageAt: string;
  createdAt: string;
  messagesCount: number;
  messages: AdminMessage[];
}

interface Props {
  conversations: AdminConversation[];
}

/**
 * Format a Date or ISO string into local YYYY-MM-DD for date matching
 */
function getLocalDateKey(dateStr: string): string {
  const d = new Date(dateStr);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Format ISO string to DD/MM/YYYY for Vietnamese display
 */
function formatDisplayDate(dateStr: string): string {
  const d = new Date(dateStr);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

export default function AdminConversationsClient({ conversations }: Props) {
  // Filter states
  const [selectedDate, setSelectedDate] = useState<string>(''); // YYYY-MM-DD or empty for ALL
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  // Compute today's and yesterday's YYYY-MM-DD strings
  const todayKey = useMemo(() => getLocalDateKey(new Date().toISOString()), []);
  const yesterdayKey = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return getLocalDateKey(d.toISOString());
  }, []);

  // Guarantee all conversations passed in have > 0 messages
  const validConversations = useMemo(() => {
    return conversations.filter((c) => c.messages && c.messages.length > 0);
  }, [conversations]);

  // Aggregate available dates and message count per date
  const availableDatesMap = useMemo(() => {
    const map = new Map<string, { count: number; displayDate: string }>();
    validConversations.forEach((conv) => {
      const dateKey = getLocalDateKey(conv.lastMessageAt);
      const existing = map.get(dateKey) || {
        count: 0,
        displayDate: formatDisplayDate(conv.lastMessageAt),
      };
      existing.count += 1;
      map.set(dateKey, existing);
    });

    return Array.from(map.entries()).sort((a, b) => b[0].localeCompare(a[0]));
  }, [validConversations]);

  // Filtered conversations based on selected criteria
  const filteredConversations = useMemo(() => {
    return validConversations.filter((conv) => {
      if (!conv.messages || conv.messages.length === 0) return false;

      // Date filter
      if (selectedDate) {
        const convDateKey = getLocalDateKey(conv.lastMessageAt);
        const hasMessageOnDate = conv.messages.some(
          (m) => getLocalDateKey(m.createdAt) === selectedDate
        );
        if (convDateKey !== selectedDate && !hasMessageOnDate) {
          return false;
        }
      }

      // Status filter
      if (selectedStatus !== 'ALL' && conv.status !== selectedStatus) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const titleMatch = conv.title.toLowerCase().includes(q);
        const summaryMatch = conv.summary?.toLowerCase().includes(q);
        const messageMatch = conv.messages.some((m) =>
          m.content.toLowerCase().includes(q)
        );
        if (!titleMatch && !summaryMatch && !messageMatch) {
          return false;
        }
      }

      return true;
    });
  }, [validConversations, selectedDate, selectedStatus, searchQuery]);

  // Quick stats
  const totalMessagesCount = useMemo(() => {
    return filteredConversations.reduce((acc, c) => acc + c.messages.length, 0);
  }, [filteredConversations]);

  const waitingAgentCount = useMemo(() => {
    return validConversations.filter((c) => c.status === 'WAITING_FOR_AGENT').length;
  }, [validConversations]);

  return (
    <div className="space-y-6">
      {/* Header & Description */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <div className="p-2 bg-red-600 rounded-xl text-white shadow-md shadow-red-600/20">
              <MessageSquare className="w-5 h-5" />
            </div>
            Quản lý Lịch sử Hội thoại
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Xem nội dung trao đổi theo ngày, trích dẫn tài liệu RAG và trạng thái cần hỗ trợ.
          </p>
        </div>

        {/* Action alert badge */}
        <div className="flex items-center gap-2">
          {waitingAgentCount > 0 && (
            <div className="px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold flex items-center gap-2 shadow-xs">
              <AlertCircle className="w-4 h-4 text-amber-600 animate-bounce" />
              <span>{waitingAgentCount} cuộc trò chuyện cần tư vấn</span>
            </div>
          )}
        </div>
      </div>

      {/* Date & Filter Toolbar (White & Red Theme) */}
      <div className="bg-white border border-red-100 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-red-100 pb-4">
          {/* Date Picker Input */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-slate-700 text-xs font-bold">
              <Calendar className="w-4 h-4 text-red-600" />
              <span>Chọn ngày xem:</span>
            </div>

            <div className="relative">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-white border border-red-200 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-xl px-3 py-1.5 text-xs text-slate-900 font-medium outline-none cursor-pointer shadow-2xs"
              />
              {selectedDate && (
                <button
                  onClick={() => setSelectedDate('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-red-600"
                  title="Xóa chọn ngày"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Date Preset Buttons */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => setSelectedDate('')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedDate === ''
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                    : 'bg-slate-100 text-slate-600 hover:text-red-600 hover:bg-red-50'
                }`}
              >
                Tất cả ngày ({validConversations.length})
              </button>

              <button
                onClick={() => setSelectedDate(todayKey)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedDate === todayKey
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                    : 'bg-slate-100 text-slate-600 hover:text-red-600 hover:bg-red-50'
                }`}
              >
                Hôm nay
              </button>

              <button
                onClick={() => setSelectedDate(yesterdayKey)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedDate === yesterdayKey
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                    : 'bg-slate-100 text-slate-600 hover:text-red-600 hover:bg-red-50'
                }`}
              >
                Hôm qua
              </button>
            </div>
          </div>

          {/* Search Box & Status Filter */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm tiêu đề, nội dung chat..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 outline-none shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Status Selector */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
              <button
                onClick={() => setSelectedStatus('ALL')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  selectedStatus === 'ALL'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-red-600'
                }`}
              >
                Tất cả
              </button>
              <button
                onClick={() => setSelectedStatus('WAITING_FOR_AGENT')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  selectedStatus === 'WAITING_FOR_AGENT'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-slate-600 hover:text-amber-700'
                }`}
              >
                Cần tư vấn
              </button>
              <button
                onClick={() => setSelectedStatus('AI_ACTIVE')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  selectedStatus === 'AI_ACTIVE'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-red-600'
                }`}
              >
                AI Active
              </button>
            </div>
          </div>
        </div>

        {/* Quick Date Pills (Available dates with history) */}
        {availableDatesMap.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs custom-scrollbar">
            <span className="text-slate-500 text-[11px] whitespace-nowrap font-bold">
              Ngày có lịch sử:
            </span>
            {availableDatesMap.map(([dKey, info]) => {
              const isSelected = selectedDate === dKey;
              return (
                <button
                  key={dKey}
                  onClick={() => setSelectedDate(dKey)}
                  className={`px-2.5 py-1 rounded-lg whitespace-nowrap text-[11px] font-semibold transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-red-600 text-white shadow-sm shadow-red-600/20'
                      : 'bg-white text-slate-700 hover:text-red-600 hover:bg-red-50 border border-slate-200'
                  }`}
                >
                  <Calendar className="w-3 h-3" />
                  <span>{info.displayDate}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      isSelected
                        ? 'bg-red-700 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {info.count}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Filter Status Summary Bar */}
      <div className="flex items-center justify-between px-1 text-xs text-slate-600">
        <div>
          Đang hiển thị{' '}
          <strong className="text-slate-900 font-bold">{filteredConversations.length}</strong> cuộc trò chuyện (tổng{' '}
          <strong className="text-red-600 font-bold">{totalMessagesCount}</strong> tin nhắn)
          {selectedDate && (
            <span>
              {' '}
              vào ngày <strong className="text-red-600 font-bold">{formatDisplayDate(selectedDate)}</strong>
            </span>
          )}
        </div>
        {selectedDate && (
          <button
            onClick={() => setSelectedDate('')}
            className="text-red-600 hover:underline flex items-center gap-1 font-bold text-xs"
          >
            <X className="w-3.5 h-3.5" /> Xem tất cả các ngày
          </button>
        )}
      </div>

      {/* Conversation List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredConversations.length === 0 ? (
          <div className="p-12 bg-white border border-red-100 rounded-2xl text-center text-slate-500 space-y-3 shadow-sm">
            <Inbox className="w-12 h-12 mx-auto text-red-300" />
            <p className="text-sm font-bold text-slate-800">
              Không tìm thấy cuộc trò chuyện nào có tin nhắn!
            </p>
            <p className="text-xs text-slate-500">
              {selectedDate
                ? `Không có hội thoại phát sinh tin nhắn vào ngày ${formatDisplayDate(selectedDate)}.`
                : 'Hiện chưa có cuộc trò chuyện có chứa tin nhắn trong hệ thống.'}
            </p>
            {selectedDate && (
              <button
                onClick={() => setSelectedDate('')}
                className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-red-600/20"
              >
                Bỏ chọn lọc ngày
              </button>
            )}
          </div>
        ) : (
          filteredConversations.map((conv) => (
            <div
              key={conv._id}
              className="bg-white border border-red-100 rounded-2xl p-5 space-y-4 shadow-sm hover:shadow-md hover:border-red-200 transition-all"
            >
              {/* Conversation Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3.5 gap-2">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-900 text-base tracking-tight">
                    {conv.title}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      conv.status === 'WAITING_FOR_AGENT'
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : conv.status === 'AI_ACTIVE'
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    {conv.status === 'WAITING_FOR_AGENT'
                      ? 'CẦN TƯ VẤN BÁO GIÁ'
                      : conv.status === 'AI_ACTIVE'
                      ? 'AI TỰ ĐỘNG'
                      : conv.status}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                    {conv.messagesCount} tin nhắn
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{new Date(conv.lastMessageAt).toLocaleString('vi-VN')}</span>
                </div>
              </div>

              {/* Demand Handoff Box */}
              {conv.summary && (
                <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-3.5 text-xs text-amber-900 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-amber-800">
                    <FileText className="h-4 w-4 text-amber-700" />
                    Tóm tắt nhu cầu khách hàng:
                  </div>
                  <p className="whitespace-pre-wrap leading-relaxed text-amber-900/90 pl-5 font-medium">
                    {conv.summary}
                  </p>
                </div>
              )}

              {/* Message Log Timeline */}
              <div className="space-y-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar text-xs">
                {conv.messages.map((msg, idx) => (
                  <div
                    key={msg._id || idx}
                    className={`p-3.5 rounded-xl border ${
                      msg.role === 'USER'
                        ? 'bg-red-50/60 border-red-200/80 text-slate-900 ml-6 sm:ml-12 shadow-2xs'
                        : 'bg-slate-50 border-slate-200/80 text-slate-800 mr-6 sm:mr-12 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold mb-1.5 text-[11px]">
                      <div className="flex items-center gap-1.5">
                        {msg.role === 'USER' ? (
                          <>
                            <User className="w-3.5 h-3.5 text-red-600" />
                            <span className="text-red-700 font-bold">Khách hàng</span>
                          </>
                        ) : (
                          <>
                            <Bot className="w-3.5 h-3.5 text-slate-700" />
                            <span className="text-slate-800 font-bold">
                              AI Assistant {msg.model ? `(${msg.model})` : ''}
                            </span>
                          </>
                        )}
                      </div>

                      <span className="text-[10px] font-medium text-slate-400">
                        {new Date(msg.createdAt).toLocaleTimeString('vi-VN', {
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                        })}
                      </span>
                    </div>

                    <p className="whitespace-pre-wrap leading-relaxed font-normal">{msg.content}</p>

                    {/* Cited References */}
                    {msg.references && msg.references.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-slate-200 text-[10px] text-slate-600 space-y-1">
                        <span className="text-red-700 font-bold flex items-center gap-1">
                          <BookOpen className="w-3 h-3 text-red-600" /> Tài liệu đã trích dẫn:
                        </span>
                        <div className="pl-4 space-y-0.5">
                          {msg.references.map((r, rIdx) => (
                            <div key={rIdx} className="truncate text-slate-700 font-medium">
                              • {r.title} (Độ khớp: {Math.round(r.score * 100)}%)
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
