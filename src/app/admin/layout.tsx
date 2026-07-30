'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  LayoutDashboard,
  BookOpen,
  MessageSquare,
  Headset,
  LogOut,
  Bot,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { label: 'Tổng quan Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Quản lý Kiến thức (RAG)', href: '/admin/knowledge', icon: BookOpen },
    { label: 'Lịch sử Hội thoại', href: '/admin/conversations', icon: MessageSquare },
    { label: 'Support Tickets', href: '/admin/tickets', icon: Headset },
  ];

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-50 text-slate-800 flex font-sans">
      {/* Sidebar - Relative for Floating Toggle Button */}
      <aside
        className={`h-full bg-white border-r border-red-100 flex flex-col shrink-0 shadow-sm relative transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Floating Toggle Button on Sidebar Right Border at 1/3 Height */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3.5 top-1/3 -translate-y-1/2 z-40 w-7 h-7 rounded-full bg-white border border-red-200 text-slate-600 hover:text-red-600 hover:bg-red-50 shadow-md flex items-center justify-center transition-all cursor-pointer"
          title={isCollapsed ? 'Mở rộng Sidebar (>)' : 'Thu gọn Sidebar (<)'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-red-600" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-slate-600" />
          )}
        </button>

        {/* Brand Header */}
        <div
          className={`p-4 border-b border-red-100 flex items-center ${
            isCollapsed ? 'justify-center' : 'justify-start'
          } bg-gradient-to-r from-red-50/50 via-white to-white shrink-0`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-red-600 rounded-xl text-white shadow-md shadow-red-600/25 shrink-0">
              <Bot className="w-6 h-6" />
            </div>
            {!isCollapsed && (
              <div className="whitespace-nowrap">
                <h1 className="font-bold text-base text-slate-900 tracking-tight">
                  SmartConsult <span className="text-red-600">AI</span>
                </h1>
                <p className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Trang Quản trị
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-3 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                title={isCollapsed ? item.label : undefined}
                className={`flex items-center ${
                  isCollapsed ? 'justify-center w-12 h-12 mx-auto p-0' : 'justify-between px-3.5 py-2.5'
                } rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                    : 'text-slate-600 hover:text-red-600 hover:bg-red-50/70'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 shrink-0" />
                  {!isCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
                </div>
                {!isCollapsed && isActive && <ChevronRight className="w-4 h-4 opacity-80 shrink-0" />}
              </Link>
            );
          })}
        </nav>

        {/* User Profile & Logout - Fixed at bottom */}
        <div
          className={`p-4 border-t border-red-100 flex items-center ${
            isCollapsed ? 'justify-center' : 'justify-between'
          } bg-red-50/30 shrink-0`}
        >
          {!isCollapsed && (
            <div className="flex flex-col whitespace-nowrap overflow-hidden">
              <span className="text-xs font-bold text-slate-900 truncate">Administrator</span>
              <span className="text-[11px] text-slate-500 truncate">admin@smartconsult.ai</span>
            </div>
          )}
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className={`p-2 text-slate-500 hover:text-red-600 hover:bg-red-100/60 rounded-xl transition-colors ${
              isCollapsed ? 'w-10 h-10 flex items-center justify-center bg-white border border-red-100 shadow-2xs' : ''
            }`}
            title="Đăng xuất"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-full flex flex-col overflow-y-auto min-w-0 bg-slate-50">
        <header className="h-16 border-b border-red-100 bg-white/90 backdrop-blur px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs shrink-0">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
            {navItems.find((n) =>
              n.href === '/admin' ? pathname === '/admin' : pathname.startsWith(n.href)
            )?.label || 'Quản trị Admin'}
          </h2>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              System Status: Active
            </span>
          </div>
        </header>

        <div className="p-8 flex-1">{children}</div>
      </main>
    </div>
  );
}
