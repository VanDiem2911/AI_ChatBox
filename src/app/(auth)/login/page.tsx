'use client';

import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Bot, Lock, Mail, AlertCircle, ArrowLeft, Zap, ShieldCheck } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawCallback = searchParams.get('callbackUrl') || '/admin';
  let callbackUrl = rawCallback;
  try {
    callbackUrl = decodeURIComponent(rawCallback);
  } catch (e) {
    callbackUrl = '/admin';
  }
  if (!callbackUrl.startsWith('/')) {
    callbackUrl = '/admin';
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [quickLoading, setQuickLoading] = useState(false);
  const [error, setError] = useState('');

  const executeLogin = async (loginEmail: string, loginPass: string, isQuick: boolean = false) => {
    if (isQuick) setQuickLoading(true);
    else setLoading(true);
    setError('');

    try {
      const res = await signIn('credentials', {
        email: loginEmail,
        password: loginPass,
        redirect: false,
      });

      if (res?.error) {
        if (res.error === 'Configuration' || res.error === 'ConfigurationError') {
          setError('Lỗi cấu hình hệ thống (NextAuth). Hãy kiểm tra lại biến môi trường AUTH_SECRET, AUTH_TRUST_HOST và MONGODB_URI trên Vercel.');
        } else if (res.error === 'CredentialsSignin' || res.error === 'CredentialsSigninError') {
          setError('Email hoặc Mật khẩu không chính xác.');
        } else if (res.error === 'AccessDenied') {
          setError('Tài khoản bị từ chối truy cập.');
        } else {
          setError(res.error || 'Email hoặc Mật khẩu không chính xác.');
        }
      } else {
        window.location.href = callbackUrl;
      }
    } catch (err: any) {
      setError('Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.');
    } finally {
      setLoading(false);
      setQuickLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeLogin(email, password, false);
  };

  const handleQuickAdminLogin = () => {
    const adminEmail = 'admin@dudisoftware.com';
    const adminPass = 'AdminSecurePass123!';
    setEmail(adminEmail);
    setPassword(adminPass);
    executeLogin(adminEmail, adminPass, true);
  };

  return (
    <div className="w-full max-w-md bg-white border border-zinc-200 rounded-3xl p-8 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-6">
        <div className="p-3 bg-brand-600 rounded-2xl text-white mb-3 shadow-lg shadow-brand-600/30">
          <Bot className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-zinc-900 tracking-tight">
          Đăng Nhập Quản Trị
        </h1>
        <p className="text-zinc-500 text-sm mt-1">
          Hệ thống DUDI SOFTWARE AI
        </p>
      </div>

      {/* Quick Admin Login Button */}
      <div className="mb-6">
        <button
          type="button"
          onClick={handleQuickAdminLogin}
          disabled={loading || quickLoading}
          className="w-full py-3.5 px-4 bg-gradient-to-r from-brand-600 to-red-600 hover:from-brand-700 hover:to-red-700 disabled:opacity-50 text-white font-bold text-sm rounded-2xl transition-all shadow-md shadow-brand-600/30 hover:shadow-lg hover:shadow-brand-600/40 flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
        >
          {quickLoading ? (
            <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300 animate-pulse" />
              <span>⚡ Đăng Nhập Nhanh Bằng Quyền Admin</span>
            </>
          )}
        </button>
      </div>

      <div className="relative flex py-2 items-center mb-6">
        <div className="flex-grow border-t border-zinc-200"></div>
        <span className="flex-shrink mx-4 text-xs font-semibold text-zinc-400 uppercase">Hoặc nhập tài khoản</span>
        <div className="flex-grow border-t border-zinc-200"></div>
      </div>

      {error && (
        <div className="mb-6 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-sm flex items-start gap-2.5">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase text-zinc-600 mb-1.5">
            Email Quản trị
          </label>
          <div className="relative">
            <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@dudisoftware.com"
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-11 pr-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-zinc-600 mb-1.5">
            Mật khẩu
          </label>
          <div className="relative">
            <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-11 pr-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || quickLoading}
          className="w-full mt-2 py-3 px-4 bg-zinc-900 hover:bg-zinc-800 disabled:opacity-50 text-white font-semibold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
        >
          {loading ? (
            <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            'Đăng nhập Thủ công'
          )}
        </button>
      </form>

      {/* Account Info Hint Badge */}
      <div className="mt-6 p-3 rounded-2xl bg-zinc-50 border border-zinc-200 text-zinc-600 text-xs flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-brand-600 shrink-0" />
        <div>
          <strong>Tài khoản Demo:</strong> <code className="text-brand-600 font-mono">admin@dudisoftware.com</code> | <code className="text-brand-600 font-mono">AdminSecurePass123!</code>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 relative font-sans">
      <Link
        href="/"
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 hover:text-brand-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Quay lại Trang chủ
      </Link>

      <Suspense
        fallback={
          <div className="w-full max-w-md bg-white border border-zinc-200 rounded-3xl p-8 shadow-2xl text-center text-zinc-500">
            Đang tải trang đăng nhập...
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
