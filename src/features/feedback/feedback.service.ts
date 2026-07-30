import { connectToDatabase } from '@/lib/mongodb/mongoose';
import Feedback from '@/models/Feedback';
import { FeedbackRating } from '@/types';

export class FeedbackService {
  /**
   * Đánh giá phản hồi Thích / Không thích cho câu trả lời của AI
   */
  static async createFeedback(data: {
    messageId: string;
    conversationId: string;
    userId?: string;
    rating: FeedbackRating;
    reason?: string;
  }) {
    await connectToDatabase();

    const existing = await Feedback.findOne({
      messageId: data.messageId,
    });

    if (existing) {
      existing.rating = data.rating;
      if (data.reason) existing.reason = data.reason;
      await existing.save();
      return existing;
    }

    return Feedback.create(data);
  }

  /**
   * Thống kê tỷ lệ Feedback của hệ thống
   */
  static async getFeedbackStats() {
    await connectToDatabase();
    const [upCount, downCount] = await Promise.all([
      Feedback.countDocuments({ rating: 'UP' }),
      Feedback.countDocuments({ rating: 'DOWN' }),
    ]);

    const total = upCount + downCount;
    return {
      upCount,
      downCount,
      total,
      satisfactionRate: total > 0 ? Math.round((upCount / total) * 100) : 100,
    };
  }
}
