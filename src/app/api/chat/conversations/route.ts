import { NextResponse } from 'next/server';
import { createConversationSchema } from '@/lib/validation/schemas';
import { ConversationService } from '@/features/conversations/conversation.service';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const anonymousSessionId = searchParams.get('anonymousSessionId');

    if (!anonymousSessionId) {
      return NextResponse.json(
        { success: false, error: 'Thiếu anonymousSessionId' },
        { status: 400 }
      );
    }

    const conversations = await ConversationService.getConversationsBySession(anonymousSessionId);

    return NextResponse.json({
      success: true,
      data: conversations,
    });
  } catch (error: any) {
    console.error('[API GET /api/chat/conversations] Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Lỗi lấy danh sách cuộc trò chuyện' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = createConversationSchema.parse(body);

    const conversation = await ConversationService.getOrCreateConversation(
      validated.anonymousSessionId,
      undefined,
      validated.createNew
    );

    return NextResponse.json({
      success: true,
      data: conversation,
    });
  } catch (error: any) {
    console.error('[API /api/chat/conversations] Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Không thể tạo cuộc trò chuyện mới' },
      { status: 400 }
    );
  }
}
