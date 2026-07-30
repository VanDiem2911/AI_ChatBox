import { connectToDatabase } from '@/lib/mongodb/mongoose';
import SupportTicket from '@/models/SupportTicket';
import Conversation from '@/models/Conversation';
import { TicketStatus, TicketPriority } from '@/types';

export class TicketService {
  /**
   * Tạo Support Ticket mới từ Khách hàng và đổi trạng thái hội thoại thành WAITING_FOR_AGENT
   */
  static async createTicket(data: {
    conversationId: string;
    userId?: string;
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
    subject: string;
    description: string;
    priority?: TicketPriority;
  }) {
    await connectToDatabase();

    const ticket = await SupportTicket.create({
      ...data,
      status: 'OPEN',
      priority: data.priority || 'MEDIUM',
    });

    // Chuyển trạng thái hội thoại sang WAITING_FOR_AGENT
    await Conversation.findByIdAndUpdate(data.conversationId, {
      status: 'WAITING_FOR_AGENT',
    });

    return ticket;
  }

  static async createOrUpdatePricingTicket(data: {
    conversationId: string;
    customerPhone: string;
    summary?: string;
  }) {
    await connectToDatabase();

    const subject = 'Yêu cầu báo giá';
    const fallbackEmail = `chat-${data.conversationId}@dudisoftware.local`;
    const description = [
      data.summary || 'Khách đã để lại số điện thoại để được tư vấn báo giá.',
      `Số điện thoại khách cung cấp: ${data.customerPhone}`,
    ].join('\n');

    const existingTicket = await SupportTicket.findOne({
      conversationId: data.conversationId,
      subject,
      status: { $in: ['OPEN', 'IN_PROGRESS'] },
    });

    if (existingTicket) {
      existingTicket.customerPhone = data.customerPhone;
      existingTicket.description = description;
      existingTicket.priority = 'HIGH';
      await existingTicket.save();
      return existingTicket;
    }

    const ticket = await SupportTicket.create({
      conversationId: data.conversationId,
      customerName: 'Khách hàng từ chat',
      customerEmail: fallbackEmail,
      customerPhone: data.customerPhone,
      subject,
      description,
      status: 'OPEN',
      priority: 'HIGH',
    });

    await Conversation.findByIdAndUpdate(data.conversationId, {
      status: 'WAITING_FOR_AGENT',
      lastMessageAt: new Date(),
    });

    return ticket;
  }

  /**
   * Lấy danh sách Support Tickets kèm phân trang và bộ lọc
   */
  static async getTickets(query: {
    page?: number;
    limit?: number;
    status?: TicketStatus;
    priority?: TicketPriority;
  }) {
    await connectToDatabase();
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (query.status) filter.status = query.status;
    if (query.priority) filter.priority = query.priority;

    const [tickets, total] = await Promise.all([
      SupportTicket.find(filter)
        .populate('assignedTo', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      SupportTicket.countDocuments(filter),
    ]);

    return {
      tickets,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Cập nhật trạng thái Ticket hoặc phân công nhân viên
   */
  static async updateTicket(
    ticketId: string,
    updates: {
      status?: TicketStatus;
      priority?: TicketPriority;
      assignedTo?: string;
    }
  ) {
    await connectToDatabase();
    return SupportTicket.findByIdAndUpdate(ticketId, updates, { new: true });
  }
}
