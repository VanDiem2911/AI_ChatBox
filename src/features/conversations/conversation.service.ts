import { connectToDatabase } from '@/lib/mongodb/mongoose';
import Conversation from '@/models/Conversation';
import Message from '@/models/Message';
import { getPricingHandoffSummary } from '@/lib/ai/pricing-policy';
import { MessageRole, IMessageReference } from '@/types';

export class ConversationService {
  /**
   * Khởi tạo hoặc tìm Conversation đang hoạt động của Session
   */
  static async getOrCreateConversation(
    anonymousSessionId: string,
    userId?: string,
    createNew = false
  ) {
    await connectToDatabase();

    let conversation = null;

    if (!createNew) {
      // Tìm conversation AI_ACTIVE gần nhất của session
      conversation = await Conversation.findOne({
        anonymousSessionId,
        status: 'AI_ACTIVE',
      }).sort({ lastMessageAt: -1 });
    }

    if (!conversation) {
      conversation = await Conversation.create({
        anonymousSessionId,
        userId: userId || undefined,
        title: 'Cuộc trò chuyện mới',
        status: 'AI_ACTIVE',
        lastMessageAt: new Date(),
      });
    }

    return conversation;
  }

  /**
   * Lấy danh sách các cuộc trò chuyện thuộc về Session
   */
  static async getConversationsBySession(anonymousSessionId: string, limit = 30) {
    await connectToDatabase();
    return Conversation.find({ anonymousSessionId })
      .sort({ lastMessageAt: -1 })
      .limit(limit)
      .lean();
  }

  /**
   * Lấy lịch sử messages của Conversation (trả về limit tin nhắn gần nhất theo thứ tự thời gian)
   */
  static async getMessages(conversationId: string, limit = 20) {
    await connectToDatabase();
    const messages = await Message.find({ conversationId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return messages.reverse();
  }

  static async getConversation(conversationId: string) {
    await connectToDatabase();
    return Conversation.findById(conversationId).lean();
  }

  static async updateMemorySummary(conversationId: string, memorySummary: string) {
    await connectToDatabase();

    return Conversation.findByIdAndUpdate(
      conversationId,
      {
        memorySummary,
        lastMessageAt: new Date(),
      },
      { new: true }
    );
  }

  /**
   * Lưu tin nhắn mới vào MongoDB
   */
  static async createMessage(data: {
    conversationId: string;
    role: MessageRole;
    content: string;
    model?: string;
    tokenUsage?: { inputTokens: number; outputTokens: number; totalTokens: number };
    references?: IMessageReference[];
    toolCalls?: any[];
    error?: string;
  }) {
    await connectToDatabase();

    const message = await Message.create(data);

    const updateData: any = { lastMessageAt: new Date() };

    // Nếu là tin nhắn đầu tiên của user, tự động đặt tiêu đề cho cuộc hội thoại dựa theo nội dung
    if (data.role === 'USER') {
      const conv = await Conversation.findById(data.conversationId).select('title').lean();
      if (!conv || conv.title === 'Cuộc trò chuyện mới' || !conv.title) {
        const cleanText = data.content.trim().replace(/\n+/g, ' ');
        updateData.title = cleanText.slice(0, 35) + (cleanText.length > 35 ? '...' : '');
      }
    }

    await Conversation.findByIdAndUpdate(data.conversationId, updateData);

    return message;
  }

  /**
   * ÄÃ¡nh dáº¥u cuá»™c trÃ² chuyá»‡n cáº§n nhÃ¢n viÃªn tÆ° váº¥n bÃ¡o giÃ¡.
   */
  static async markPricingHandoff(conversationId: string, customerMessage: string) {
    await connectToDatabase();

    return Conversation.findByIdAndUpdate(
      conversationId,
      {
        title: 'Yêu cầu báo giá',
        status: 'WAITING_FOR_AGENT',
        summary: getPricingHandoffSummary(customerMessage),
        lastMessageAt: new Date(),
      },
      { new: true }
    );
  }
}
