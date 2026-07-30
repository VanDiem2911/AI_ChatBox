import { connectToDatabase } from '@/lib/mongodb/mongoose';
import Conversation from '@/models/Conversation';
import Message from '@/models/Message';
import AdminConversationsClient, { AdminConversation } from './AdminConversationsClient';

export const revalidate = 0;

export default async function AdminConversationsPage() {
  await connectToDatabase();

  const conversations = await Conversation.find()
    .sort({ lastMessageAt: -1 })
    .lean();

  const conversationsWithMessages: (AdminConversation | null)[] = await Promise.all(
    conversations.map(async (conv) => {
      const messages = await Message.find({ conversationId: conv._id })
        .sort({ createdAt: 1 })
        .lean();

      // Nếu cuộc hội thoại không có tin nhắn thì không cần xuất hiện
      if (!messages || messages.length === 0) {
        return null;
      }

      return {
        _id: conv._id.toString(),
        title: conv.title,
        status: conv.status,
        summary: conv.summary || null,
        memorySummary: conv.memorySummary || null,
        lastMessageAt: conv.lastMessageAt ? new Date(conv.lastMessageAt).toISOString() : new Date().toISOString(),
        createdAt: conv.createdAt ? new Date(conv.createdAt).toISOString() : new Date().toISOString(),
        messagesCount: messages.length,
        messages: messages.map((msg) => ({
          _id: msg._id.toString(),
          role: msg.role,
          content: msg.content,
          model: msg.model || null,
          status: msg.status,
          createdAt: msg.createdAt ? new Date(msg.createdAt).toISOString() : new Date().toISOString(),
          references: msg.references
            ? msg.references.map((r: any) => ({
                title: r.title,
                score: r.score,
              }))
            : [],
        })),
      };
    })
  );

  const validConversations = conversationsWithMessages.filter(
    (c): c is AdminConversation => c !== null
  );

  return <AdminConversationsClient conversations={validConversations} />;
}
