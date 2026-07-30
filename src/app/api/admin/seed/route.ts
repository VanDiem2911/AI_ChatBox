import { NextResponse } from 'next/server';
import { seedAdminUser } from '@/scripts/seed';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    const result = await seedAdminUser();
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Seed Admin Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Lỗi khi khởi tạo tài khoản Admin' },
      { status: 500 }
    );
  }
}
