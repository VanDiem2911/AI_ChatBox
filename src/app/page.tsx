import Link from 'next/link';
import { ShieldCheck, Database, MessageSquare, Sparkles, Headset } from 'lucide-react';
import { ChatWidget } from '@/components/chat/ChatWidget';
import { DudiLogo } from '@/components/common/DudiLogo';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-red-50/20 text-zinc-900 flex flex-col font-sans">
      {/* Navigation Header */}
      <header className="border-b border-zinc-200/80 bg-white/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <DudiLogo className="w-9 h-9" />
            <span className="font-extrabold text-xl tracking-tight text-zinc-900">
              DUDI SOFTWARE <span className="text-brand-600">AI</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="text-sm font-semibold text-zinc-600 hover:text-brand-600 transition-colors"
            >
              Quản trị Admin
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-semibold bg-brand-600 hover:bg-brand-700 text-white rounded-xl transition-all shadow-md shadow-brand-600/25 hover:shadow-brand-600/40 transform hover:-translate-y-0.5"
            >
              Đăng nhập
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center justify-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-600 text-sm font-semibold mb-6 shadow-sm">
          <Sparkles className="w-4 h-4 text-brand-500" />
          <span>Thế hệ AI Chatbot RAG DUDI SOFTWARE</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight max-w-4xl leading-tight text-zinc-900">
          Giải pháp Tư vấn Khách hàng AI <br />
          <span className="bg-gradient-to-r from-brand-600 via-red-600 to-rose-500 bg-clip-text text-transparent">
            Chuẩn xác & Tự động 24/7
          </span>
        </h1>

        <p className="mt-6 text-lg text-zinc-600 max-w-2xl leading-relaxed font-normal">
          Tích hợp dữ liệu doanh nghiệp thông qua MongoDB Atlas Vector Search và OpenAI Streaming. Trả lời tiếng Việt tự nhiên, chính xác 100% dữ liệu DUDI Software và tự động hỗ trợ tư vấn 24/7.
        </p>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left w-full max-w-5xl">
          <div className="group p-6 rounded-2xl bg-white border border-zinc-200/90 shadow-sm hover:shadow-xl hover:border-brand-300 transition-all transform hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-600 mb-4 group-hover:bg-brand-600 group-hover:text-white transition-all shadow-sm">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 mb-2">Truy xuất RAG Thông minh</h3>
            <p className="text-zinc-600 text-sm leading-relaxed">
              Sử dụng Vector Search trích xuất tài liệu chính xác từ 400+ dự án DUDI Software trước khi phản hồi khách hàng.
            </p>
          </div>

          <div className="group p-6 rounded-2xl bg-white border border-zinc-200/90 shadow-sm hover:shadow-xl hover:border-brand-300 transition-all transform hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 mb-4 group-hover:bg-rose-600 group-hover:text-white transition-all shadow-sm">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 mb-2">Streaming Phản hồi Real-time</h3>
            <p className="text-zinc-600 text-sm leading-relaxed">
              Trải nghiệm phản hồi từng từ như ChatGPT, hỗ trợ định dạng Markdown, đường link dự án thực tế và giao diện trực quan.
            </p>
          </div>

          <div className="group p-6 rounded-2xl bg-white border border-zinc-200/90 shadow-sm hover:shadow-xl hover:border-brand-300 transition-all transform hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600 mb-4 group-hover:bg-red-600 group-hover:text-white transition-all shadow-sm">
              <Headset className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 mb-2">Chuyển đổi Support Ticket</h3>
            <p className="text-zinc-600 text-sm leading-relaxed">
              Tự động tạo ticket hỗ trợ cho nhân viên chăm sóc khách hàng khi AI chưa có đủ thông tin xử lý.
            </p>
          </div>
        </div>

        {/* Demo Hint Banner */}
        <div className="mt-16 p-4 rounded-2xl bg-white border border-zinc-200 text-zinc-700 text-sm inline-flex items-center gap-3 shadow-md">
          <ShieldCheck className="w-5 h-5 text-brand-600 shrink-0" />
          <span>Thử nghiệm Chatbot AI tư vấn trực tiếp ở góc dưới bên phải màn hình.</span>
        </div>
      </main>

      {/* Floating Chatbot Widget */}
      <ChatWidget />

      {/* Footer */}
      <footer className="border-t border-zinc-200 py-8 text-center text-xs text-zinc-500 bg-white">
        &copy; {new Date().getFullYear()} DUDI SOFTWARE AI. Tất cả quyền được bảo lưu.
      </footer>
    </div>
  );
}
