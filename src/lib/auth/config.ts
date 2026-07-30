import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/mongodb/mongoose';
import User from '@/models/User';

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Mật khẩu', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Vui lòng nhập đầy đủ Email và Mật khẩu.');
        }

        await connectToDatabase();

        const user = await User.findOne({
          email: (credentials.email as string).toLowerCase(),
        }).select('+passwordHash');

        if (!user || !user.passwordHash) {
          throw new Error('Email hoặc Mật khẩu không chính xác.');
        }

        if (user.status !== 'ACTIVE') {
          throw new Error('Tài khoản đã bị tạm khóa. Vui lòng liên hệ quản trị viên.');
        }

        const isPasswordMatch = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash
        );

        if (!isPasswordMatch) {
          throw new Error('Email hoặc Mật khẩu không chính xác.');
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || 'CUSTOMER';
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.AUTH_SECRET || 'fallback-super-secret-key-32-chars-minimum',
};
