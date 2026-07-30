import { NextResponse } from 'next/server';
import { feedbackSchema } from '@/lib/validation/schemas';
import { FeedbackService } from '@/features/feedback/feedback.service';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = feedbackSchema.parse(body);

    const feedback = await FeedbackService.createFeedback(validated);

    return NextResponse.json({ success: true, data: feedback });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Lỗi khi gửi đánh giá' },
      { status: 400 }
    );
  }
}
