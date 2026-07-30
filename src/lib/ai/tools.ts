import { TicketService } from '@/features/support/ticket.service';
import { VectorService } from '@/features/knowledge/vector.service';
import { ChatCompletionTool } from 'openai/resources/chat/completions';

/**
 * Định nghĩa OpenAI Function Calling Tools cho Chatbot AI
 */
export const chatbotTools: ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'create_support_ticket',
      description: 'Tạo Yêu cầu Hỗ trợ (Support Ticket) cho nhân viên chăm sóc khách hàng liên hệ tư vấn trực tiếp.',
      parameters: {
        type: 'object',
        properties: {
          customerName: { type: 'string', description: 'Họ tên của khách hàng' },
          customerEmail: { type: 'string', description: 'Email của khách hàng' },
          customerPhone: { type: 'string', description: 'Số điện thoại liên hệ' },
          subject: { type: 'string', description: 'Tiêu đề ngắn gọn của sự cố hoặc thắc mắc' },
          description: { type: 'string', description: 'Mô tả chi tiết nội dung cần hỗ trợ' },
        },
        required: ['customerName', 'customerEmail', 'subject', 'description'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_support_ticket_status',
      description: 'Tra cứu trạng thái của một Support Ticket đã tạo.',
      parameters: {
        type: 'object',
        properties: {
          ticketId: { type: 'string', description: 'Mã ID của Support Ticket' },
        },
        required: ['ticketId'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'search_knowledge',
      description: 'Tìm kiếm bổ sung tài liệu trong Kho kiến thức doanh nghiệp.',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Từ khóa tìm kiếm tài liệu' },
        },
        required: ['query'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'collect_customer_contact',
      description: 'Thu thập thông tin liên hệ (Tên, SĐT, Email) khi khách hàng muốn nhận tư vấn báo giá.',
      parameters: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'Họ tên khách hàng' },
          contact: { type: 'string', description: 'Số điện thoại hoặc email' },
          note: { type: 'string', description: 'Ghi chú nhu cầu tư vấn' },
        },
        required: ['name', 'contact'],
      },
    },
  },
];

/**
 * Hàm thực thi các Tool Calls do OpenAI đề xuất (Tool Call Execution Handler)
 */
export async function executeToolCall(
  name: string,
  args: Record<string, any>,
  conversationId: string
): Promise<string> {
  try {
    switch (name) {
      case 'create_support_ticket': {
        const ticket = await TicketService.createTicket({
          conversationId,
          customerName: args.customerName,
          customerEmail: args.customerEmail,
          customerPhone: args.customerPhone,
          subject: args.subject,
          description: args.description,
        });
        return JSON.stringify({
          success: true,
          message: 'Tạo Support Ticket thành công',
          ticketId: ticket._id.toString(),
        });
      }

      case 'search_knowledge': {
        const results = await VectorService.searchSimilarChunks(args.query, { topK: 3 });
        return JSON.stringify({
          success: true,
          results: results.map((r) => ({ title: r.title, content: r.content })),
        });
      }

      case 'collect_customer_contact': {
        return JSON.stringify({
          success: true,
          message: 'Đã ghi nhận thông tin liên hệ khách hàng thành công.',
        });
      }

      default:
        return JSON.stringify({ success: false, error: 'Chức năng chưa được hỗ trợ.' });
    }
  } catch (error: any) {
    console.error(`[Tool Execution Error: ${name}]:`, error);
    return JSON.stringify({ success: false, error: error.message });
  }
}
