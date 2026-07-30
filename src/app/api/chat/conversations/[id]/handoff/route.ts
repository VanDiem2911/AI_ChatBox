import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb/mongoose';
import Conversation from '@/models/Conversation';

export const dynamic = 'force-dynamic';

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    const conversation = await Conversation.findByIdAndUpdate(
      params.id,
      { status: 'WAITING_FOR_AGENT' },
      { new: true }
    );

    if (!conversation) {
      return NextResponse.json(
        { success: false, error: 'Không tìm thấy cuộc trò chuyện' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: conversation,
      message: 'Đã chuyển cuộc trò chuyện sang trạng thái chờ nhân viên hỗ trợ',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Lỗi khi yêu cầu gặp nhân viên' },
      { status: 500 }
    );
  }
}
