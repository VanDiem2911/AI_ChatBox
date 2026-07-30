import { NextResponse } from 'next/server';
import { createConversationSchema } from '@/lib/validation/schemas';
import { ConversationService } from '@/features/conversations/conversation.service';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = createConversationSchema.parse(body);

    const conversation = await ConversationService.getOrCreateConversation(
      validated.anonymousSessionId
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
