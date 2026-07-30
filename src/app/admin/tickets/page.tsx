import { connectToDatabase } from '@/lib/mongodb/mongoose';
import SupportTicket from '@/models/SupportTicket';
import Message from '@/models/Message';
import Conversation from '@/models/Conversation';
import AdminTicketsClient, { AdminTicket } from './AdminTicketsClient';

export const revalidate = 0;

export default async function AdminTicketsPage() {
  await connectToDatabase();

  const tickets = await SupportTicket.find()
    .sort({ createdAt: -1 })
    .lean();

  const ticketsWithMessages: AdminTicket[] = await Promise.all(
    tickets.map(async (t) => {
      const conversation = await Conversation.findById(t.conversationId).lean();
      const messages = await Message.find({ conversationId: t.conversationId })
        .sort({ createdAt: 1 })
        .lean();

      return {
        _id: t._id.toString(),
        conversationId: t.conversationId.toString(),
        customerName: t.customerName,
        customerEmail: t.customerEmail,
        customerPhone: t.customerPhone || null,
        subject: t.subject,
        description: t.description,
        priority: t.priority as AdminTicket['priority'],
        status: t.status as AdminTicket['status'],
        createdAt: t.createdAt ? new Date(t.createdAt).toISOString() : new Date().toISOString(),
        conversation: conversation
          ? {
              title: conversation.title,
              summary: conversation.summary || null,
              status: conversation.status,
            }
          : null,
        messages: messages.map((m) => ({
          _id: m._id.toString(),
          role: m.role,
          content: m.content,
          model: m.model || null,
          status: m.status,
          createdAt: m.createdAt ? new Date(m.createdAt).toISOString() : new Date().toISOString(),
          references: m.references
            ? m.references.map((r: any) => ({
                title: r.title,
                score: r.score,
              }))
            : [],
        })),
      };
    })
  );

  return <AdminTicketsClient initialTickets={ticketsWithMessages} />;
}
