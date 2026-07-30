# 🤖 SmartConsult AI - Hệ Thống AI Chatbot Tư Vấn Doanh Nghiệp (RAG Engine)

**SmartConsult AI** là giải pháp Chatbot AI tư vấn và chăm sóc khách hàng thông minh dành cho doanh nghiệp (DUDI Software). Hệ thống sử dụng kỹ thuật **RAG (Retrieval-Augmented Generation)** kết hợp với **Vector Embeddings** để tra cứu và trả lời câu hỏi chuẩn xác từ bộ kiến thức doanh nghiệp (37+ danh mục lĩnh vực dự án & dịch vụ).

---

## 🌟 Tính Năng Nổi Bật

### 1. Phía Khách Hàng (Customer Chat Widget)
- 💬 **Widget Chat Thông Minh**: Nút bong bóng chat nổi bật ở góc màn hình, tự động thích ứng trên Desktop & Mobile.
- ⚡ **Real-time SSE Streaming**: Phản hồi từng từ tức thì dạng gõ văn bản mượt mà.
- 🎯 **Trích Xuất Dữ Liệu Chuẩn Xác (RAG)**: AI trả lời đúng thông tin dịch vụ, báo giá và kho dự án tiêu biểu theo tài liệu doanh nghiệp.
- 🛡️ **Render Markdown An Toàn**: Hiển thị bảng giá, danh sách, liên kết an toàn (chống tấn công XSS với `rehype-sanitize`).
- 🔄 **Tính Năng Tương Tác**: Nút thử lại (Retry), dừng sinh văn bản (Stop streaming), gửi đánh giá Like/Dislike.
- 🎫 **Chuyển Giao Hỗ Trợ Người Thật (Support Ticket)**: Cho phép khách hàng tạo ticket khi AI không đủ thông tin hoặc khi muốn liên hệ tư vấn viên.

### 2. Phía Quản Trị (Admin Dashboard)
- 📊 **Dashboard Tổng Quan**: Thống kê số lượng cuộc hội thoại, tin nhắn, ticket và trạng thái hệ thống.
- 📚 **Quản Lý Kho Kiến Thức (RAG Base)**: 
  - Xem, thêm, sửa nội dung và xóa tài liệu.
  - Tự động sinh lại **Vector Embeddings** khi chỉnh sửa nội dung tài liệu.
  - Hỗ trợ nhập liệu từ 37+ file Markdown chuẩn hóa (`knowledge_md/`).
- 💬 **Quản Lý Lịch Sử Hội Thoại**: Theo dõi toàn bộ lịch sử tư vấn của AI với khách hàng.
- 🎫 **Quản Lý Support Tickets**: Tiếp nhận yêu cầu hỗ trợ, phân loại trạng thái (`OPEN`, `IN_PROGRESS`, `RESOLVED`, `CLOSED`).

---

## 🛠️ Công Nghệ Sử Dụng

- **Frontend & Backend**: [Next.js 14 (App Router)](https://nextjs.org/), TypeScript, React 18.
- **Styling**: Tailwind CSS, Lucide Icons.
- **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose ODM).
- **AI Engine (Đa nhà cung cấp)**:
  - **Google Gemini**: `gemini-3.6-flash`, `gemini-3.5-flash`, `gemini-embedding-2`.
  - **OpenAI**: `gpt-4o-mini`, `text-embedding-3-small`.
  - **Ollama (Local AI)**: `llama3.2`, `nomic-embed-text`.
- **Authentication**: Auth.js (NextAuth v5 Beta) bảo vệ route Admin.
- **Vector Search Engine**: MongoDB Atlas Vector Search + In-memory Cosine Similarity Fallback.

---

## 📁 Cấu Trúc Thư Mục Dự Án

```text
AI_ChatBox/
├── knowledge_md/             # Thư mục chứa 37+ file Markdown kiến thức mẫu
├── src/
│   ├── app/                  # Next.js App Router (Pages & API Routes)
│   │   ├── admin/            # Trang Quản trị (Dashboard, Knowledge, Tickets, Conversations)
│   │   ├── api/              # API Endpoints (Chat, Admin, Auth)
│   │   └── login/            # Trang đăng nhập Admin
│   ├── components/           # UI Components (ChatWidget, Admin UI, Shared components)
│   ├── features/             # Business Logic (RAG Vector Service, Knowledge Service)
│   ├── lib/                  # Helpers (MongoDB Mongoose connection, AI Client configs)
│   ├── models/               # MongoDB Schemas (User, KnowledgeDocument, KnowledgeChunk...)
│   └── scripts/              # Scripts nạp dữ liệu (Load Markdown, Seed Admin, Test Suite)
├── .env.example              # Mẫu khai báo biến môi trường
└── README.md                 # Tài liệu hướng dẫn sử dụng dự án
```

---

## 🚀 Hướng Dẫn Cài Đặt & Phát Triển (Local Setup)

### 1. Khai Báo Biến Môi Trường (`.env.local`)

Tạo file `.env.local` tại thư mục gốc của dự án:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/ai_chatbox
# Hoặc MongoDB Atlas: mongodb+srv://<user>:<password>@cluster0.xxx.mongodb.net/ai_chatbox

# AI Provider Selection: 'gemini' | 'openai' | 'ollama'
AI_PROVIDER=gemini

# Google Gemini Configuration
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_CHAT_MODEL=gemini-3.6-flash
GEMINI_EMBEDDING_MODEL=gemini-embedding-2

# OpenAI Configuration (Tùy chọn)
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_CHAT_MODEL=gpt-4o-mini
OPENAI_EMBEDDING_MODEL=text-embedding-3-small

# NextAuth Authentication
AUTH_SECRET=local-dev-secret-key-32-characters-minimum
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Admin Account Default Credentials
ADMIN_EMAIL=admin@smartconsult.ai
ADMIN_PASSWORD=AdminSecurePass123!
```

### 2. Cài Đặt Packages & Chạy Môi Trường Dev

```bash
# Cài đặt thư viện
npm install

# Chạy ứng dụng ở chế độ Development
npm run dev
```
Mở trình duyệt tại: **`http://localhost:3000`**

---

## 📥 Khởi Tạo Dữ Liệu Mẫu & Tài Khoản Admin

### 1. Khởi Tạo Tài Khoản Admin & Dữ Liệu Cơ Bản
```bash
curl -X POST http://localhost:3000/api/admin/seed
```
*Tài khoản Admin mặc định:*
- **Email**: `admin@smartconsult.ai`
- **Mật khẩu**: `AdminSecurePass123!`
- **Đăng nhập tại**: `http://localhost:3000/login`

### 2. Nạp 37+ File Kiến Thức Markdown Vào RAG Engine
Chạy script nạp toàn bộ 37 kho dự án & dịch vụ từ thư mục `knowledge_md/` vào MongoDB:

```bash
npx ts-node --compiler-options "{\"module\":\"CommonJS\"}" src/scripts/load-md-knowledge.ts
```

---

## ☁️ Hướng Dẫn Deploy Lên Production (Vercel)

1. Đẩy dự án lên **GitHub**.
2. Đăng nhập [Vercel](https://vercel.com) -> Import Repository.
3. Trong mục **Environment Variables**, điền đầy đủ các biến môi trường từ `.env.local` (Đặc biệt là `MONGODB_URI` trỏ tới MongoDB Atlas và `GEMINI_API_KEY` / `OPENAI_API_KEY`).
4. Nhấn **Deploy**.

---

## 📄 Giấy Phép & Bản Quyền

Dự án phát triển bởi **DUDI SOFTWARE** © 2026. All rights reserved.
