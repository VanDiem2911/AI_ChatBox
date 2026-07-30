import { connectToDatabase } from '@/lib/mongodb/mongoose';
import Conversation from '@/models/Conversation';
import Message from '@/models/Message';
import SupportTicket from '@/models/SupportTicket';
import Feedback from '@/models/Feedback';
import AiUsageLog from '@/models/AiUsageLog';
import { MessageSquare, Headset, ThumbsUp, DollarSign, Users, Sparkles, TrendingUp } from 'lucide-react';

export const revalidate = 0; // Dynamic server page

export default async function AdminDashboardOverviewPage() {
  await connectToDatabase();

  const [
    totalConversations,
    totalMessages,
    totalTickets,
    waitingAgentConversations,
    positiveFeedbacks,
    negativeFeedbacks,
    usageLogs,
  ] = await Promise.all([
    Conversation.countDocuments(),
    Message.countDocuments(),
    SupportTicket.countDocuments(),
    Conversation.countDocuments({ status: 'WAITING_FOR_AGENT' }),
    Feedback.countDocuments({ rating: 'UP' }),
    Feedback.countDocuments({ rating: 'DOWN' }),
    AiUsageLog.aggregate([
      {
        $group: {
          _id: null,
          totalInputTokens: { $sum: '$inputTokens' },
          totalOutputTokens: { $sum: '$outputTokens' },
          totalTokens: { $sum: '$totalTokens' },
        },
      },
    ]),
  ]);

  const tokenStats = usageLogs[0] || { totalInputTokens: 0, totalOutputTokens: 0, totalTokens: 0 };
  const estimatedCost = (
    (tokenStats.totalInputTokens / 1_000_000) * 0.15 +
    (tokenStats.totalOutputTokens / 1_000_000) * 0.60
  ).toFixed(4);

  const totalFeedbackCount = positiveFeedbacks + negativeFeedbacks;
  const satisfactionRate =
    totalFeedbackCount > 0 ? Math.round((positiveFeedbacks / totalFeedbackCount) * 100) : 100;

  const handoffRate =
    totalConversations > 0
      ? ((waitingAgentConversations / totalConversations) * 100).toFixed(1)
      : '0.0';

  return (
    <div className="space-y-8">
      {/* Top Red & White Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-red-600 via-red-600 to-rose-700 text-white shadow-lg shadow-red-600/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-200" /> Tổng quan Hiệu năng SmartConsult AI
          </h3>
          <p className="text-sm text-red-100 mt-1 font-medium">
            Báo cáo thời gian thực về lưu lượng truy cập chat, ước tính chi phí API và mức độ hài lòng khách hàng.
          </p>
        </div>
        <div className="px-4 py-2 bg-white/10 backdrop-blur rounded-xl text-xs font-semibold flex items-center gap-2 border border-white/20 shrink-0">
          <TrendingUp className="w-4 h-4 text-emerald-300" /> Hệ thống đang hoạt động tối ưu
        </div>
      </div>

      {/* Analytics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 bg-white border border-red-100 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Tổng Cuộc Trò Chuyện</span>
            <div className="p-2.5 bg-red-50 text-red-600 rounded-xl">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-900">{totalConversations.toLocaleString()}</p>
          <p className="text-xs text-slate-500 font-medium mt-2">
            Tổng số <strong className="text-slate-800">{totalMessages.toLocaleString()}</strong> tin nhắn
          </p>
        </div>

        <div className="p-5 bg-white border border-red-100 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Support Tickets</span>
            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
              <Headset className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-900">{totalTickets.toLocaleString()}</p>
          <p className="text-xs text-amber-700 font-bold mt-2">
            Tỷ lệ cần nhân viên: <span className="font-extrabold">{handoffRate}%</span>
          </p>
        </div>

        <div className="p-5 bg-white border border-red-100 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Mức Độ Hài Lòng</span>
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
              <ThumbsUp className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-900">{satisfactionRate}%</p>
          <p className="text-xs text-slate-500 font-medium mt-2">
            <span className="text-emerald-600 font-bold">+{positiveFeedbacks} Thích</span> /{' '}
            <span className="text-red-600 font-bold">{negativeFeedbacks} Không thích</span>
          </p>
        </div>

        <div className="p-5 bg-white border border-red-100 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Ước tính Chi phí AI</span>
            <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-900">${estimatedCost}</p>
          <p className="text-xs text-slate-500 font-medium mt-2">
            Tổng <strong className="text-slate-800">{tokenStats.totalTokens.toLocaleString()}</strong> tokens
          </p>
        </div>
      </div>

      {/* Active Features Section */}
      <div className="p-6 bg-white border border-red-100 rounded-2xl shadow-sm">
        <h4 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-600" /> Các tính năng đang hoạt động
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <p className="font-bold text-red-600 mb-1">RAG Engine Vector Search</p>
            <p className="text-xs text-slate-600">Trích xuất câu trả lời chuẩn xác từ Atlas Vector Search.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <p className="font-bold text-slate-800 mb-1">Real-time SSE Streaming</p>
            <p className="text-xs text-slate-600">Truyền câu trả lời tức thì dạng typing indicator từng chữ.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <p className="font-bold text-emerald-600 mb-1">Support Ticket Handoff</p>
            <p className="text-xs text-slate-600">Chuyển tiếp tự động sang nhân viên hỗ trợ khi thiếu thông tin.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
