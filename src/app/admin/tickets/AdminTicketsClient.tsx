'use client';

import React, { useState } from 'react';
import {
  Headset,
  Mail,
  Phone,
  Clock,
  MessageSquare,
  User,
  Bot,
  BookOpen,
  FileText,
  X,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export interface TicketMessage {
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

export interface AdminTicket {
  _id: string;
  conversationId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string | null;
  subject: string;
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED' | 'CHUA_BAO_GIA' | 'DA_BAO_GIA';
  createdAt: string;
  conversation?: {
    title: string;
    summary?: string | null;
    status: string;
  } | null;
  messages: TicketMessage[];
}

interface Props {
  initialTickets: AdminTicket[];
}

/** Standardize status key */
function getNormalizedStatus(status: string): 'CHUA_BAO_GIA' | 'DA_BAO_GIA' | 'IN_PROGRESS' | 'CLOSED' {
  if (status === 'OPEN' || status === 'CHUA_BAO_GIA') return 'CHUA_BAO_GIA';
  if (status === 'RESOLVED' || status === 'DA_BAO_GIA') return 'DA_BAO_GIA';
  if (status === 'IN_PROGRESS') return 'IN_PROGRESS';
  return 'CLOSED';
}

export default function AdminTicketsClient({ initialTickets }: Props) {
  const [tickets, setTickets] = useState<AdminTicket[]>(initialTickets);
  const [selectedTicket, setSelectedTicket] = useState<AdminTicket | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [expandedDescIds, setExpandedDescIds] = useState<Record<string, boolean>>({});

  const toggleExpandDesc = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedDescIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter tickets
  const filteredTickets = tickets.filter((t) => {
    const s = getNormalizedStatus(t.status);
    if (statusFilter === 'ALL') return true;
    if (statusFilter === 'CHUA_BAO_GIA') return s === 'CHUA_BAO_GIA';
    if (statusFilter === 'DA_BAO_GIA') return s === 'DA_BAO_GIA';
    if (statusFilter === 'IN_PROGRESS') return s === 'IN_PROGRESS';
    return s === statusFilter;
  });

  /** Fast Optimistic Status Update */
  const handleUpdateStatus = async (ticketId: string, newStatus: AdminTicket['status']) => {
    setTickets((prev) =>
      prev.map((t) => (t._id === ticketId ? { ...t, status: newStatus } : t))
    );

    if (selectedTicket && selectedTicket._id === ticketId) {
      setSelectedTicket((prev) => (prev ? { ...prev, status: newStatus } : null));
    }

    try {
      const res = await fetch(`/api/admin/tickets/${ticketId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        console.error('Lỗi khi lưu trạng thái:', data.error);
      }
    } catch (err) {
      console.error('Lỗi cập nhật trạng thái:', err);
    }
  };

  // Count stats
  const chuaBaoGiaCount = tickets.filter(
    (t) => getNormalizedStatus(t.status) === 'CHUA_BAO_GIA'
  ).length;
  const daBaoGiaCount = tickets.filter(
    (t) => getNormalizedStatus(t.status) === 'DA_BAO_GIA'
  ).length;

  return (
    <div className="space-y-6">
      {/* Header & Filter Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <div className="p-2.5 bg-red-600 rounded-xl text-white shadow-md shadow-red-600/20">
              <Headset className="w-5 h-5" />
            </div>
            Quản lý Support Tickets & Báo giá
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Chuyển nhanh trạng thái **Chưa báo giá** / **Đã báo giá**, bấm vào hàng để xem cả cuộc hội thoại.
          </p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-red-100 shadow-xs text-xs font-bold flex-wrap">
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              statusFilter === 'ALL'
                ? 'bg-red-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-red-600 hover:bg-red-50'
            }`}
          >
            Tất cả ({tickets.length})
          </button>
          <button
            onClick={() => setStatusFilter('CHUA_BAO_GIA')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              statusFilter === 'CHUA_BAO_GIA'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-amber-700 hover:bg-amber-50'
            }`}
          >
            Chưa báo giá ({chuaBaoGiaCount})
          </button>
          <button
            onClick={() => setStatusFilter('DA_BAO_GIA')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              statusFilter === 'DA_BAO_GIA'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-emerald-700 hover:bg-emerald-50'
            }`}
          >
            Đã báo giá ({daBaoGiaCount})
          </button>
          <button
            onClick={() => setStatusFilter('IN_PROGRESS')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              statusFilter === 'IN_PROGRESS'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            Đang tư vấn
          </button>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white border border-red-100 rounded-2xl overflow-hidden shadow-sm">
        {filteredTickets.length === 0 ? (
          <div className="p-12 text-center text-slate-500 space-y-2">
            <Headset className="w-12 h-12 mx-auto text-red-300" />
            <p className="text-base font-bold text-slate-800">Không có Yêu cầu Hỗ trợ nào phù hợp.</p>
            <p className="text-xs text-slate-400">Vui lòng chọn bộ lọc khác để xem thêm.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-red-50/60 text-xs font-bold text-slate-700 uppercase border-b border-red-100 tracking-wider">
                <tr>
                  <th className="p-4">Khách hàng</th>
                  <th className="p-4">Nội dung mô tả</th>
                  <th className="p-4">Độ ưu tiên</th>
                  <th className="p-4">Trạng thái báo giá</th>
                  <th className="p-4">Thời gian</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTickets.map((t) => {
                  const normStatus = getNormalizedStatus(t.status);
                  const isExpanded = !!expandedDescIds[t._id];
                  const isLongText = t.description.length > 100;

                  return (
                    <tr
                      key={t._id}
                      onClick={() => setSelectedTicket(t)}
                      className="hover:bg-red-50/40 transition-colors cursor-pointer group"
                    >
                      {/* Customer info */}
                      <td className="p-4">
                        <div className="font-bold text-slate-900 group-hover:text-red-600 transition-colors flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-black text-xs shrink-0">
                            {t.customerName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div>{t.customerName}</div>
                            {t.customerPhone && (
                              <div className="text-xs text-red-600 font-extrabold flex items-center gap-1 mt-0.5">
                                <Phone className="w-3 h-3 text-red-500" /> {t.customerPhone}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-1 pl-9">
                          <Mail className="w-3 h-3 text-slate-400" /> {t.customerEmail}
                        </div>
                      </td>

                      {/* Collapsible Description Column */}
                      <td className="p-4 text-xs text-slate-700 max-w-lg break-words leading-relaxed font-medium">
                        <div className={!isExpanded && isLongText ? 'line-clamp-2' : ''}>
                          {t.description}
                        </div>
                        {isLongText && (
                          <button
                            onClick={(e) => toggleExpandDesc(t._id, e)}
                            className="mt-1 text-[11px] font-bold text-red-600 hover:underline inline-flex items-center gap-0.5"
                          >
                            {isExpanded ? (
                              <>
                                Thu gọn <ChevronUp className="w-3 h-3" />
                              </>
                            ) : (
                              <>
                                Xem thêm... <ChevronDown className="w-3 h-3" />
                              </>
                            )}
                          </button>
                        )}
                      </td>

                      {/* Priority */}
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-[11px] font-extrabold ${
                            t.priority === 'URGENT' || t.priority === 'HIGH'
                              ? 'bg-red-100 text-red-700 border border-red-200/80'
                              : 'bg-slate-100 text-slate-700 border border-slate-200'
                          }`}
                        >
                          {t.priority}
                        </span>
                      </td>

                      {/* SINGLE STATUS DROPDOWN BUTTON */}
                      <td
                        className="p-4"
                        onClick={(e) => e.stopPropagation()}
                        onMouseDown={(e) => e.stopPropagation()}
                      >
                        <div className="relative inline-block">
                          <select
                            value={normStatus}
                            onChange={(e) =>
                              handleUpdateStatus(t._id, e.target.value as AdminTicket['status'])
                            }
                            className={`appearance-none cursor-pointer text-xs font-black rounded-xl px-3.5 py-1.5 border transition-all shadow-2xs outline-none pr-8 ${
                              normStatus === 'DA_BAO_GIA'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                                : normStatus === 'CHUA_BAO_GIA'
                                ? 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
                                : normStatus === 'IN_PROGRESS'
                                ? 'bg-blue-50 text-blue-800 border-blue-300 hover:bg-blue-100'
                                : 'bg-slate-100 text-slate-700 border-slate-200'
                            }`}
                          >
                            <option value="CHUA_BAO_GIA">Chưa báo giá</option>
                            <option value="DA_BAO_GIA">Đã báo giá</option>
                            <option value="IN_PROGRESS">Đang tư vấn</option>
                            <option value="CLOSED">Đã đóng</option>
                          </select>
                          <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-600" />
                        </div>
                      </td>

                      {/* Time */}
                      <td className="p-4 text-xs text-slate-500 font-medium whitespace-nowrap">
                        {t.createdAt ? new Date(t.createdAt).toLocaleString('vi-VN') : 'N/A'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* FULL CONVERSATION MODAL DIALOG */}
      {selectedTicket && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedTicket(null)}
        >
          <div
            className="w-full max-w-4xl max-h-[90vh] bg-white border border-red-100 rounded-3xl shadow-2xl flex flex-col text-slate-800 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 border-b border-red-100 bg-gradient-to-r from-red-50/80 via-white to-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-red-600 rounded-xl text-white shadow-md shadow-red-600/20">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <h4 className="text-lg font-extrabold text-slate-900">
                      {selectedTicket.subject}
                    </h4>
                    <span
                      className={`px-3 py-0.5 rounded-full text-xs font-extrabold ${
                        selectedTicket.priority === 'URGENT' || selectedTicket.priority === 'HIGH'
                          ? 'bg-red-100 text-red-700 border border-red-200'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {selectedTicket.priority}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">
                    Khách hàng: <strong className="text-slate-900">{selectedTicket.customerName}</strong>
                    {selectedTicket.customerPhone && (
                      <span className="ml-2 text-red-600 font-extrabold">({selectedTicket.customerPhone})</span>
                    )}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedTicket(null)}
                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 flex-1 overflow-y-auto space-y-5 custom-scrollbar">
              {/* Customer Contact & Status Switcher */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Thông tin Liên hệ Khách hàng:
                  </span>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-700">
                    <a
                      href={`mailto:${selectedTicket.customerEmail}`}
                      className="hover:text-red-600 flex items-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      {selectedTicket.customerEmail}
                    </a>
                    {selectedTicket.customerPhone && (
                      <a
                        href={`tel:${selectedTicket.customerPhone}`}
                        className="hover:text-red-600 flex items-center gap-1.5 text-red-600 font-extrabold"
                      >
                        <Phone className="w-3.5 h-3.5 text-red-600" />
                        {selectedTicket.customerPhone}
                      </a>
                    )}
                  </div>
                </div>

                {/* Status Switcher Buttons in Modal */}
                <div className="flex flex-col gap-1.5 items-end">
                  <span className="text-xs font-bold text-slate-600">Trạng thái báo giá:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleUpdateStatus(selectedTicket._id, 'CHUA_BAO_GIA')}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all border ${
                        getNormalizedStatus(selectedTicket.status) === 'CHUA_BAO_GIA'
                          ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                          : 'bg-white text-amber-800 border-amber-300 hover:bg-amber-50'
                      }`}
                    >
                      Chưa báo giá
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(selectedTicket._id, 'DA_BAO_GIA')}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all border ${
                        getNormalizedStatus(selectedTicket.status) === 'DA_BAO_GIA'
                          ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                          : 'bg-white text-emerald-800 border-emerald-300 hover:bg-emerald-50'
                      }`}
                    >
                      Đã báo giá
                    </button>
                  </div>
                </div>
              </div>

              {/* Requirement Description */}
              <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 text-xs text-amber-950 space-y-1">
                <div className="flex items-center gap-1.5 font-extrabold text-amber-800">
                  <FileText className="w-4 h-4 text-amber-700" />
                  Nội dung khách hàng trao đổi:
                </div>
                <p className="whitespace-pre-wrap leading-relaxed text-amber-950 font-medium pl-5">
                  {selectedTicket.description}
                </p>
              </div>

              {/* CONVERSATION HISTORY LOG (CẢ CUỘC HỘI THOẠI) */}
              <div className="space-y-3 pt-2">
                <h5 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-red-600" />
                  Toàn bộ cuộc trò chuyện ({selectedTicket.messages.length} tin nhắn)
                </h5>

                {selectedTicket.messages.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-500 bg-slate-50 rounded-xl">
                    Chưa ghi nhận tin nhắn nào trong cuộc hội thoại này.
                  </div>
                ) : (
                  <div className="space-y-3 text-xs">
                    {selectedTicket.messages.map((msg, idx) => (
                      <div
                        key={msg._id || idx}
                        className={`p-4 rounded-2xl border ${
                          msg.role === 'USER'
                            ? 'bg-rose-50/70 border-rose-200/80 text-slate-900 ml-6 sm:ml-12 shadow-2xs'
                            : 'bg-slate-50 border-slate-200 text-slate-800 mr-6 sm:mr-12 shadow-2xs'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold mb-1.5 text-[11px]">
                          <div className="flex items-center gap-1.5">
                            {msg.role === 'USER' ? (
                              <>
                                <User className="w-3.5 h-3.5 text-red-600" />
                                <span className="text-red-700 font-extrabold">Khách hàng</span>
                              </>
                            ) : (
                              <>
                                <Bot className="w-3.5 h-3.5 text-slate-700" />
                                <span className="text-slate-800 font-extrabold">
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

                        {/* References cited */}
                        {msg.references && msg.references.length > 0 && (
                          <div className="mt-2.5 pt-2 border-t border-slate-200 text-[10px] text-slate-600 space-y-1">
                            <span className="text-red-700 font-bold flex items-center gap-1">
                              <BookOpen className="w-3 h-3 text-red-600" /> Tài liệu trích dẫn:
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
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">
                Tự động đồng bộ từ MongoDB Atlas.
              </span>
              <button
                onClick={() => setSelectedTicket(null)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl transition-all"
              >
                Đóng cửa sổ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
