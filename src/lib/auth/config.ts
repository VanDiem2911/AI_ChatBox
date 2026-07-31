import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/mongodb/mongoose';
import User from '@/models/User';

export const authConfig: NextAuthConfig = {
  trustHost: true,
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

        try {
          await connectToDatabase();
        } catch (dbErr: any) {
          console.error('Database connection error during login:', dbErr);
          throw new Error('Không thể kết nối đến cơ sở dữ liệu MongoDB. Vui lòng kiểm tra MONGODB_URI.');
        }

        const inputEmail = (credentials.email as string).toLowerCase();

        let user = await User.findOne({
          email: inputEmail,
        }).select('+passwordHash');

        // Auto-seed default admin if trying to log in as admin and user doesn't exist yet
        if (!user && (inputEmail === 'admin@dudisoftware.com' || inputEmail === 'admin@smartconsult.ai')) {
          try {
            const adminPass = process.env.ADMIN_PASSWORD || 'AdminSecurePass123!';
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(adminPass, salt);
            user = await User.create({
              name: 'DUDI Administrator',
              email: inputEmail,
              passwordHash,
              role: 'ADMIN',
              status: 'ACTIVE',
            });
            console.log(`[Auth] Auto-created default admin user: ${inputEmail}`);
          } catch (seedErr) {
            console.error('Failed to auto-create default admin user:', seedErr);
          }
        }

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
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || 'fallback-super-secret-key-32-chars-minimum',
};

