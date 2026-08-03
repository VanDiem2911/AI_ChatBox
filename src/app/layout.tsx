import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'vietnamese'] });

export const metadata: Metadata = {
  title: 'DUDI SOFTWARE AI - Hệ thống Chatbot Tư vấn Khách hàng Doanh nghiệp',
  description: 'Trợ lý AI tư vấn dịch vụ phần mềm, thiết kế website, ứng dụng di động và dự án của DUDI SOFTWARE.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="h-full scroll-smooth">
      <body className={`${inter.className} flex min-h-full flex-col`}>
        {children}
      </body>
    </html>
  );
}
