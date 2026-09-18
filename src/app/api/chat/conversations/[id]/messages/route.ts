import { NextResponse } from 'next/server';
import { sendMessageSchema } from '@/lib/validation/schemas';
import { checkRateLimit } from '@/lib/security/rate-limit';
import { ConversationService } from '@/features/conversations/conversation.service';
import { VectorService } from '@/features/knowledge/vector.service';
import {
  openai,
  OPENAI_CHAT_MODEL,
  genAI,
  GEMINI_CHAT_MODEL,
  GEMINI_FALLBACK_MODELS,
  AI_PROVIDER,
  GEMINI_API_KEY,
  ollamaClient,
  OLLAMA_CHAT_MODEL,
} from '@/lib/ai/client';
import { generateEmbedding } from '@/lib/ai/embeddings';

import { buildSystemPrompt } from '@/lib/ai/prompts';
import { getBusinessDomainsResponse, isBusinessDomainsInquiry } from '@/lib/ai/business-domains';
import {
  getCompanyIntroResponse,
  getContactInfoResponse,
  getIdentityResponse,
  getProjectInspiredConsultationResponse,
  getServiceConsultationResponse,
  getServiceOverviewResponse,
} from '@/lib/ai/company-responses';
import {
  buildConversationMemorySummary,
  getContextualMemoryResponse,
} from '@/lib/ai/conversation-memory';
import { getOffTopicResponse, isOffTopicInquiry } from '@/lib/ai/off-topic';
import { classifyChatIntent } from '@/lib/ai/intent-router';
import {
  extractCustomerPhone,
  getPhoneReceivedHandoffResponse,
  getPricingHandoffResponse,
  isPricingOrMoneyInquiry,
} from '@/lib/ai/pricing-policy';
import { extractProjectsFromKnowledge, ProjectSummary } from '@/lib/ai/project-parser';
import { TicketService } from '@/features/support/ticket.service';
import { IMessageReference } from '@/types';
import AiUsageLog from '@/models/AiUsageLog';
import { connectToDatabase } from '@/lib/mongodb/mongoose';

export const dynamic = 'force-dynamic';

type ProjectExampleScope = {
  label: string;
  query: string;
  categories?: string[];
};

async function createPolicyResponse(params: {
  conversationId: string;
  content: string;
  model: string;
  startTime: number;
}) {
  const responseTimeMs = Date.now() - params.startTime;
  const assistantMsg = await ConversationService.createMessage({
    conversationId: params.conversationId,
    role: 'ASSISTANT',
    content: params.content,
    model: `policy:${params.model}`,
    references: [],
  });

  await connectToDatabase();
  await AiUsageLog.create({
    conversationId: params.conversationId,
    messageId: assistantMsg._id,
    provider: 'policy',
    model: params.model,
    inputTokens: 0,
    outputTokens: 0,
    totalTokens: 0,
    responseTimeMs,
    success: true,
  });

  return new Response(params.content, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}

function normalizeViForRouting(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getProjectExampleScope(message: string): ProjectExampleScope | null {
  const normalized = normalizeViForRouting(message);
  const hasTerm = (pattern: RegExp) => pattern.test(normalized);

  if (hasTerm(/\babitmes\b|\bquan\s*ly\s*ban\s*hang\b|\bban\s*hang\s*da\s*kenh\b/)) {
    return {
      label: 'hệ thống quản lý bán hàng đa kênh',
      query: 'dự án quản lý bán hàng đa kênh chat đơn hàng chăm sóc khách hàng',
      categories: ['Kho Dự Án - Bán hàng đa kênh'],
    };
  }

  if (hasTerm(/\bthuc\s*pham\b|\bthuc\s*pham\s*sach\b|\bdo\s*an\b|\bf\s*b\b|\bnha\s*hang\b/)) {
    return {
      label: 'website thực phẩm/F&B',
      query: 'dự án website thực phẩm sạch hữu cơ rau củ trái cây hải sản đồ ăn nhà hàng F&B đặt hàng online',
      categories: ['Kho Dự Án - Thực phẩm', 'Kho Dự Án - F&B', 'Kho Dự Án - Nhà hàng & Tiệc cưới'],
    };
  }

  if (hasTerm(/\bloyalty\b|\btich\s*diem\b|\bdoi\s*qua\b|\bthanh\s*vien\b|\brewards\b/)) {
    return {
      label: 'app loyalty/tích điểm',
      query: 'dự án app loyalty tích điểm đổi quà thành viên rewards MyLG chăm sóc khách hàng',
      categories: ['Kho Dự Án - Khách sạn & Homestay', 'Kho Dự Án - Điện lạnh', 'Kho Dự Án - Bán hàng đa kênh'],
    };
  }

  if (hasTerm(/\bban\s*hang\b|\be\s*commerce\b|\bthuong\s*mai\s*dien\s*tu\b/)) {
    return {
      label: 'website bán hàng/e-commerce',
      query: 'dự án website bán hàng thương mại điện tử mua sắm online sản phẩm đặt hàng thanh toán',
      categories: [
        'Kho Dự Án - Thời trang',
        'Kho Dự Án - Thực phẩm',
        'Kho Dự Án - Đồ gia dụng',
        'Kho Dự Án - Điện lạnh',
        'Kho Dự Án - Sức khỏe',
        'Kho Dự Án - Làm đẹp',
        'Kho Dự Án - Nội thất & Decord',
        'Kho Dự Án - F&B',
        'Kho Dự Án - Đồ gia dụng',
        'Kho Dự Án - Cây cảnh & Hoa tươi',
        'Kho Dự Án - Bán hàng đa kênh',
        'Kho Dự Án - Booking',
      ],
    };
  }

  if (hasTerm(/\blanding\s*page|landing\b/)) {
    return {
      label: 'website landing page/giới thiệu sản phẩm',
      query: 'dự án website landing page giới thiệu sản phẩm tối ưu chuyển đổi thu lead chạy quảng cáo',
      categories: ['Kho Dự Án - Landing Page'],
    };
  }

  if (hasTerm(/\bwebsite\s*doanh\s*nghiep\b|\bweb\s*doanh\s*nghiep\b|\bgioi\s*thieu\s*doanh\s*nghiep\b/)) {
    return {
      label: 'website giới thiệu doanh nghiệp',
      query: 'dự án website giới thiệu doanh nghiệp công ty giới thiệu năng lực',
      categories: [
        'Kho Dự Án - Tư vấn Pháp luật',
        'Kho Dự Án - Xây dựng',
        'Kho Dự Án - Gia công & Sản xuất',
        'Kho Dự Án - Dịch vụ',
        'Kho Dự Án - Logistics',
        'Kho Dự Án - Tài chính',
        'Kho Dự Án - Công nghệ',
        'Giới thiệu & Liên hệ',
      ],
    };
  }

  if (hasTerm(/\bbat\s*dong\s*san\b/)) {
    return {
      label: 'website bất động sản',
      query: 'dự án website bất động sản căn hộ khu đô thị nhà phố đất nền mua bán cho thuê môi giới',
      categories: ['Kho Dự Án - Bất động sản'],
    };
  }

  if (hasTerm(/\btham\s*my\b|\blam\s*dep\b|\bspa\b|\bmy\s*pham\b|\bcham\s*soc\s*da\b/)) {
    return {
      label: 'website phòng khám/thẩm mỹ/làm đẹp',
      query: 'dự án website thẩm mỹ viện spa làm đẹp phòng khám thẩm mỹ chăm sóc sắc đẹp đặt lịch tư vấn',
      categories: ['Kho Dự Án - Làm đẹp', 'Kho Dự Án - Sức khỏe', 'Kho Dự Án - Nha khoa'],
    };
  }

  if (hasTerm(/\bnha\s*khoa\b/)) {
    return {
      label: 'website nha khoa',
      query: 'dự án website nha khoa phòng khám răng miệng đặt lịch tư vấn',
      categories: ['Kho Dự Án - Nha khoa'],
    };
  }

  if (hasTerm(/\bgiao\s*duc\b|\bngoai\s*ngu\b|\btieng\s*anh\b|\be\s*learning\b|\belearning\b|\blms\b|\bhoc\s*truc\s*tuyen\b/)) {
    return {
      label: 'website giáo dục/ngoại ngữ/e-learning',
      query: 'dự án website giáo dục trung tâm ngoại ngữ tiếng Anh e-learning LMS học trực tuyến khóa học đào tạo',
      categories: ['Kho Dự Án - E-Learning', 'Kho Dự Án - Giáo dục', 'Kho Dự Án - Blog'],
    };
  }

  if (hasTerm(/\bdu\s*lich\b|\btour\b/)) {
    return {
      label: 'website du lịch/booking',
      query: 'dự án website du lịch tour đặt vé khách sạn booking trực tuyến',
      categories: ['Kho Dự Án - Du lịch', 'Kho Dự Án - Booking', 'Kho Dự Án - Khách sạn & Homestay'],
    };
  }

  if (hasTerm(/\bthoi\s*trang\b|\bquan\s*ao\b/)) {
    return {
      label: 'website thời trang',
      query: 'dự án website thời trang quần áo phụ kiện mua sắm online',
      categories: ['Kho Dự Án - Thời trang'],
    };
  }

  if (hasTerm(/\bthuc\s*pham\b|\bdo\s*an\b|\bf\s*b\b/)) {
    return {
      label: 'website thực phẩm/F&B',
      query: 'dự án website thực phẩm đồ ăn nhà hàng F&B đặt hàng online',
      categories: ['Kho Dự Án - Thực phẩm', 'Kho Dự Án - F&B', 'Kho Dự Án - Nhà hàng & Tiệc cưới'],
    };
  }

  if (hasTerm(/\bo\s*to\b|\boto\b|\bxe\b/)) {
    return {
      label: 'website ô tô',
      query: 'dự án website ô tô showroom xe đăng ký lái thử đại lý',
      categories: ['Kho Dự Án - Ô tô'],
    };
  }

  if (hasTerm(/\bsuc\s*khoe\b|\bphong\s*kham\b/)) {
    return {
      label: 'website sức khỏe/phòng khám',
      query: 'dự án website sức khỏe phòng khám đặt lịch tư vấn',
      categories: ['Kho Dự Án - Sức khỏe', 'Kho Dự Án - Nha khoa'],
    };
  }

  if (hasTerm(/\bloyalty\b|\btich\s*diem\b|\bdoi\s*qua\b|\bthanh\s*vien\b|\brewards\b/)) {
    return {
      label: 'app loyalty/tích điểm',
      query: 'dự án app loyalty tích điểm đổi quà thành viên rewards ưu đãi voucher khuyến mãi chăm sóc khách hàng',
      categories: ['Kho Dự Án - Bán hàng đa kênh', 'Kho Dự Án - Khách sạn & Homestay', 'Kho Dự Án - Điện lạnh'],
    };
  }

  if (hasTerm(/\bban\s*hang\s*da\s*kenh\b/)) {
    return {
      label: 'website bán hàng đa kênh',
      query: 'dự án quản lý bán hàng đa kênh chat đơn hàng chăm sóc khách hàng',
      categories: ['Kho Dự Án - Bán hàng đa kênh'],
    };
  }

  if (hasTerm(/\bmedia\b|\bstudio\b|\bchup\s*anh\b/)) {
    return {
      label: 'media studio/chụp ảnh',
      query: 'dự án website media studio chụp ảnh sản phẩm beauty skincare branding',
      categories: ['Kho Dự Án - Media studio'],
    };
  }

  if (hasTerm(/\bluat\b|\bluat\s*su\b|\bphap\s*luat\b/)) {
    return {
      label: 'website văn phòng luật / tư vấn pháp luật',
      query: 'dự án website văn phòng luật tư vấn pháp luật luật sư',
      categories: ['Kho Dự Án - Tư vấn Pháp luật'],
    };
  }

  if (hasTerm(/\bxay\s*dung\b|\bnoi\s*that\b|\bdecor\b|\bkien\s*truc\b/)) {
    return {
      label: 'website xây dựng / thiết kế nội thất',
      query: 'dự án website xây dựng công trình thiết kế nội thất kiến trúc',
      categories: ['Kho Dự Án - Xây dựng', 'Kho Dự Án - Nội thất & Decord'],
    };
  }

  if (hasTerm(/\blogistics\b|\bvan\s*chuyen\b|\bvan\s*tai\b/)) {
    return {
      label: 'website logistics / vận tải',
      query: 'dự án website logistics vận tải giao hàng kho bãi tra cứu vận đơn',
      categories: ['Kho Dự Án - Logistics'],
    };
  }

  if (hasTerm(/\btai\s*chinh\b|\bngan\s*hang\b|\bbao\s*hiem\b/)) {
    return {
      label: 'website tài chính / bảo hiểm',
      query: 'dự án website tài chính bảo hiểm đầu tư chứng khoán ngân hàng',
      categories: ['Kho Dự Án - Tài chính'],
    };
  }

  if (hasTerm(/\btuyen\s*dung\b|\bviec\s*lam\b/)) {
    return {
      label: 'website tuyển dụng / việc làm',
      query: 'dự án website tuyển dụng việc làm người tìm việc nhà tuyển dụng',
      categories: ['Kho Dự Án - Dịch vụ'],
    };
  }

  if (hasTerm(/\bpet\b|\bthu\s*cung\b/)) {
    return {
      label: 'website thú cưng / pet shop',
      query: 'dự án website thú cưng pet shop chăm sóc chó mèo',
      categories: ['Kho Dự Án - Sức khỏe', 'Kho Dự Án - Thời trang'],
    };
  }

  return null;
}

function getMemoryProjectExampleScope(memorySummary: string): ProjectExampleScope | null {
  const needsLine = memorySummary
    .split('\n')
    .find((line) => normalizeViForRouting(line).startsWith('nhu cau'));
  if (!needsLine) return null;

  const scopes = needsLine
    .replace(/^.*?:/, '')
    .split(',')
    .map((item) => getProjectExampleScope(item))
    .filter((scope): scope is ProjectExampleScope => Boolean(scope));

  const uniqueScopes = scopes.filter(
    (scope, index) => scopes.findIndex((candidate) => candidate.label === scope.label) === index
  );

  return uniqueScopes.length === 1 ? uniqueScopes[0] : null;
}

function getRecentProjectExampleScope(
  recentMessages: Array<{ role: 'USER' | 'ASSISTANT'; content: string }>
): ProjectExampleScope | null {
  for (const msg of [...recentMessages].reverse()) {
    if (msg.role !== 'ASSISTANT') continue;

    const normalizedContent = normalizeViForRouting(msg.content);
    if (
      /\bwebsite\s*doanh\s*nghiep\b|\bwebsite\s*gioi\s*thieu\s*doanh\s*nghiep\b|\bnhom\s*website\s*doanh\s*nghiep\b/.test(
        normalizedContent
      )
    ) {
      return getProjectExampleScope('website doanh nghiep');
    }

    const scope = getProjectExampleScope(msg.content);
    if (scope) return scope;
  }

  return null;
}

function formatProjectExamplesResponse(projects: ProjectSummary[], topicLabel: string): string {
  const formatted = projects.slice(0, 5).map((project, idx) => (
    `🔹 ${idx + 1}. Dự án ${project.title}\n` +
    `🌐 Website: ${project.url}\n` +
    `📝 Mô tả chi tiết: ${project.description}`
  )).join('\n\n');

  const header = topicLabel
    ? `Có ạ. Đây là một số dự án **${topicLabel}** phù hợp để anh/chị tham khảo:`
    : 'Có ạ. Đây là một số dự án tiêu biểu phù hợp để anh/chị tham khảo:';

  return `${header}\n\n${formatted}\n\nAnh/chị thích mẫu nào nhất, hoặc muốn lấy phần nào làm hướng tham khảo: giao diện, luồng đặt hàng, quản trị hay tích hợp hệ thống ạ?`;
}

function normalizeProjectKey(value: string): string {
  return normalizeViForRouting(value).replace(/^https?:\/\//, '').replace(/\/$/, '');
}

function getShownProjectKeys(messages: Array<{ role: string; content: string }>): Set<string> {
  const shownKeys = new Set<string>();

  for (const msg of messages) {
    if (msg.role !== 'ASSISTANT') continue;

    const titleMatches = msg.content.matchAll(/Dự án\s+([^\n]+)/g);
    for (const match of titleMatches) {
      shownKeys.add(normalizeProjectKey(match[1] || ''));
    }

    const urlMatches = msg.content.matchAll(/https?:\/\/[^\s)\]]+/g);
    for (const match of urlMatches) {
      shownKeys.add(normalizeProjectKey(match[0] || ''));
    }
  }

  return shownKeys;
}

function getNoMoreProjectExamplesResponse(topicLabel: string): string {
  const topic = topicLabel || 'nhóm dự án này';

  return [
    `Dạ, các mẫu **${topic}** hiện có trong kho tham khảo em vừa gửi ở trên rồi ạ.`,
    '',
    'Hiện em chưa có thêm mẫu khác cùng nhóm để gửi tiếp, nên em xin phép không lặp lại danh sách cũ.',
    '',
    'Anh/chị muốn em chuyển sang nhóm mẫu gần giống hơn như website đăng tin, marketplace, landing page dự án, hay mình đi tiếp phần tính năng/quản trị cho website này ạ?',
  ].join('\n');
}

function getNoProjectDataResponse(topicLabel: string): string {
  const topic = topicLabel || 'nhóm dự án này';

  return [
    `Dạ, hiện em chưa có dữ liệu mẫu/link dự án đủ sát với **${topic}** trong kho tham khảo.`,
    '',
    'Em xin phép không gửi mẫu ngành khác để tránh làm anh/chị tham khảo sai hướng.',
    '',
    'Anh/chị có thể cho em một nhóm gần hơn để lọc lại, hoặc mình chuyển sang phần tư vấn tính năng/giao diện cho nhu cầu này ạ?',
  ].join('\n');
}

function getProjectExampleClarificationResponse(): string {
  return [
    'Được ạ. Anh/chị muốn xem mẫu theo lĩnh vực nào?',
    'Một số nhóm phổ biến: website bán hàng/e-commerce, bất động sản, du lịch/booking, giáo dục/e-learning, nha khoa/sức khỏe, thời trang, thực phẩm, phần mềm CRM/ERP hoặc booking platform.',
    '',
    'Anh/chị chỉ cần nhắn ngành hàng hoặc loại hệ thống, em sẽ lọc mẫu đúng nhóm hơn.',
  ].join('\n');
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const messages = await ConversationService.getMessages(params.id);
    return NextResponse.json({ success: true, data: messages });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Không thể lấy lịch sử tin nhắn' },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const startTime = Date.now();
  const conversationId = params.id;

  try {
    const body = await req.json();
    const validated = sendMessageSchema.parse(body);

    // 1. Check Rate Limit (Max 15 msgs / minute per session)
    const rateCheck = checkRateLimit(validated.anonymousSessionId, { limit: 15 });
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Bạn đang gửi tin nhắn quá nhanh. Vui lòng thử lại sau ít phút.',
        },
        { status: 429 }
      );
    }

    // 2. Save User Message to MongoDB
    await ConversationService.createMessage({
      conversationId,
      role: 'USER',
      content: validated.content,
    });

    const conversation = await ConversationService.getConversation(conversationId);
    const recentMessages = await ConversationService.getMessages(conversationId, 10);
    const recentMsgsPlain = recentMessages.map(m => ({ role: m.role as 'USER' | 'ASSISTANT', content: m.content }));

    if (isOffTopicInquiry(validated.content)) {
      return createPolicyResponse({
        conversationId,
        content: getOffTopicResponse(validated.content),
        model: 'off-topic',
        startTime,
      });
    }

    const queryVector = await generateEmbedding(validated.content);

    const intent = await classifyChatIntent(validated.content, {
      status: conversation?.status,
      title: conversation?.title,
      summary: conversation?.summary,
      memorySummary: conversation?.memorySummary,
      recentMessages: recentMsgsPlain,
    }, queryVector);
    const memorySummary = buildConversationMemorySummary({
      currentSummary: conversation?.memorySummary,
      userMessage: validated.content,
      intentType: intent.type,
    });

    if (memorySummary && memorySummary !== conversation?.memorySummary) {
      await ConversationService.updateMemorySummary(conversationId, memorySummary);
    }

    if (intent.type === 'pricing_phone_received' && intent.phone) {
      await TicketService.createOrUpdatePricingTicket({
        conversationId,
        customerPhone: intent.phone,
        summary: conversation?.summary,
      });

      return createPolicyResponse({
        conversationId,
        content: getPhoneReceivedHandoffResponse(intent.phone),
        model: 'pricing-phone-received',
        startTime,
      });
    }

    if (intent.type === 'business_domains') {
      return createPolicyResponse({
        conversationId,
        content: getBusinessDomainsResponse(),
        model: 'business-domains',
        startTime,
      });
    }

    if (intent.type === 'contact_info') {
      return createPolicyResponse({
        conversationId,
        content: getContactInfoResponse(),
        model: 'contact-info',
        startTime,
      });
    }

    if (intent.type === 'identity') {
      return createPolicyResponse({
        conversationId,
        content: getIdentityResponse(),
        model: 'identity',
        startTime,
      });
    }

    if (intent.type === 'company_intro') {
      return createPolicyResponse({
        conversationId,
        content: getCompanyIntroResponse(),
        model: 'company-intro',
        startTime,
      });
    }

    if (intent.type === 'service_overview') {
      return createPolicyResponse({
        conversationId,
        content: getServiceOverviewResponse(),
        model: 'service-overview',
        startTime,
      });
    }

    if (intent.type === 'pricing_handoff' || isPricingOrMoneyInquiry(validated.content)) {
      await ConversationService.markPricingHandoff(conversationId, validated.content);
    }

    if (
      intent.type === 'project_examples' &&
      !memorySummary &&
      !getProjectExampleScope(validated.content) &&
      !getRecentProjectExampleScope(recentMsgsPlain)
    ) {
      return createPolicyResponse({
        conversationId,
        content: getProjectExampleClarificationResponse(),
        model: 'project-example-clarification',
        startTime,
      });
    }

    const customerPhone = extractCustomerPhone(validated.content);
    if (customerPhone) {
      const conversation = await ConversationService.getConversation(conversationId);
      const isPricingHandoffConversation =
        conversation?.status === 'WAITING_FOR_AGENT' &&
        /báo giá|bao gia|pricing/i.test(`${conversation.title || ''} ${conversation.summary || ''}`);

      if (isPricingHandoffConversation) {
        await TicketService.createOrUpdatePricingTicket({
          conversationId,
          customerPhone,
          summary: conversation?.summary,
        });

        const phoneReceivedContent = getPhoneReceivedHandoffResponse(customerPhone);
        return createPolicyResponse({
          conversationId,
          content: phoneReceivedContent,
          model: 'pricing-phone-received',
          startTime,
        });
      }
    }

    if (isBusinessDomainsInquiry(validated.content)) {
      const domainsContent = getBusinessDomainsResponse();
      return createPolicyResponse({
        conversationId,
        content: domainsContent,
        model: 'business-domains',
        startTime,
      });
    }

    // 3. Search Relevant Knowledge Chunks via MongoDB Vector Search
    // When user asks for project examples, enrich query with conversation context
    // so vector search targets the correct industry (e.g. "website bán hàng" not just "có web tham khảo không")
    let searchQuery = validated.content;
    let projectTopicLabel = ''; // used for response header: "dự án website bán hàng/e-commerce tiêu biểu"
    let searchCategories: string[] | undefined;

    const directProjectScope = intent.type === 'project_examples' ? getProjectExampleScope(validated.content) : null;
    const recentProjectScope = intent.type === 'project_examples' ? getRecentProjectExampleScope(recentMsgsPlain) : null;
    const memoryProjectScope = intent.type === 'project_examples' ? getMemoryProjectExampleScope(memorySummary) : null;
    const projectScope = directProjectScope || recentProjectScope || memoryProjectScope;

    if (isPricingOrMoneyInquiry(validated.content) || intent.type === 'pricing_handoff') {
      searchQuery = `${validated.content} nguyên tắc tư vấn bảng giá chi phí dịch vụ DUDI Software`;
      searchCategories = undefined;
    } else if (projectScope) {
      searchQuery = projectScope.query;
      projectTopicLabel = projectScope.label;
      searchCategories = projectScope.categories;
    } else if (intent.type === 'project_examples' && memorySummary) {
      const serviceMatch = memorySummary.match(/Nhu cầu:\s*([^\n]+)/i);
      const detailsMatch = memorySummary.match(/Chi tiết:\s*([^\n]+)/i);
      const serviceContext = serviceMatch ? serviceMatch[1].trim() : '';
      const detailsContext = detailsMatch ? detailsMatch[1].trim() : '';

      if (serviceContext && serviceContext.split(',').length <= 1) {
        projectTopicLabel = serviceContext;
        const ctxLower = `${serviceContext} ${detailsContext}`.toLowerCase();

        if (/thuc pham|f&b|organic|do an|an uong/.test(ctxLower)) {
          searchQuery = 'dự án website thực phẩm đồ ăn nhà hàng F&B đặt hàng online';
          searchCategories = ['Kho Dự Án - Thực phẩm', 'Kho Dự Án - F&B', 'Kho Dự Án - Nhà hàng & Tiệc cưới'];
          projectTopicLabel = 'website thực phẩm/F&B';
        } else if (/thoi trang|quan ao|sneaker|giay/.test(ctxLower)) {
          searchQuery = 'dự án website thời trang quần áo phụ kiện mua sắm online';
          searchCategories = ['Kho Dự Án - Thời trang'];
          projectTopicLabel = 'website thời trang';
        } else if (/bat dong san|nha dat|can ho/.test(ctxLower)) {
          searchQuery = 'dự án website bất động sản căn hộ khu đô thị nhà phố đất nền mua bán cho thuê môi giới';
          searchCategories = ['Kho Dự Án - Bất động sản'];
          projectTopicLabel = 'website bất động sản';
        } else if (/o to|xe|showroom/.test(ctxLower)) {
          searchQuery = 'dự án website ô tô showroom xe đăng ký lái thử đại lý';
          searchCategories = ['Kho Dự Án - Ô tô'];
          projectTopicLabel = 'website ô tô';
        } else if (/ban hang|e-commerce|ecommerce|thuong mai dien tu/.test(ctxLower)) {
          searchQuery = 'website bán hàng thương mại điện tử mua sắm online sản phẩm đặt hàng thanh toán';
          searchCategories = [
            'Kho Dự Án - Thời trang',
            'Kho Dự Án - Thực phẩm',
            'Kho Dự Án - Đồ gia dụng',
            'Kho Dự Án - Điện lạnh',
            'Kho Dự Án - Sức khỏe',
            'Kho Dự Án - Làm đẹp',
            'Kho Dự Án - Nội thất & Decord',
            'Kho Dự Án - F&B',
            'Kho Dự Án - Đồ gia dụng',
            'Kho Dự Án - Cây cảnh & Hoa tươi',
            'Kho Dự Án - Bán hàng đa kênh',
            'Kho Dự Án - Booking',
          ];
        } else if (/mobile app|ios|android/.test(ctxLower)) {
          searchQuery = 'mobile app iOS Android ứng dụng di động';
        } else if (/chatbot|ai|rag/.test(ctxLower)) {
          searchQuery = 'AI chatbot RAG tự động hóa tư vấn khách hàng';
        } else if (/crm|erp|phan mem|booking/.test(ctxLower)) {
          searchQuery = 'phần mềm quản lý doanh nghiệp CRM ERP booking platform';
        } else {
          searchQuery = `dự án ${serviceContext} DUDI Software mẫu tham khảo`;
        }
      }
    }

    if (intent.type === 'project_examples' && !projectTopicLabel) {
      return createPolicyResponse({
        conversationId,
        content: getProjectExampleClarificationResponse(),
        model: 'project-example-clarification',
        startTime,
      });
    }

    const relevantChunks = await VectorService.searchSimilarChunks(searchQuery, {
      topK: intent.type === 'project_examples' ? 10 : 6,
      similarityThreshold: 0.15,
      queryVector,
      ...(searchCategories ? { categories: searchCategories } : {}),
    });

    const retrievedContext = relevantChunks
      .map((item, idx) => `[Tài liệu ${idx + 1}: ${item.title}]\n${item.content}`)
      .join('\n\n');

    const references: IMessageReference[] = relevantChunks.map((item) => ({
      chunkId: item.chunkId,
      documentId: item.documentId,
      title: item.title,
      score: item.score,
    }));

    // Load recent history early (last 15 messages)
    const history = await ConversationService.getMessages(conversationId, 15);

    if (intent.type === 'project_examples') {
      const projectsList = extractProjectsFromKnowledge(relevantChunks, searchQuery, 15);
      const shownProjectKeys = getShownProjectKeys(history);
      const remainingProjects = projectsList.filter((proj) => {
        const titleKey = normalizeProjectKey(proj.title);
        const urlKey = normalizeProjectKey(proj.url);
        return !shownProjectKeys.has(titleKey) && !shownProjectKeys.has(urlKey);
      });

      if (remainingProjects.length > 0) {
        return createPolicyResponse({
          conversationId,
          content: formatProjectExamplesResponse(remainingProjects, projectTopicLabel),
          model: 'project-examples',
          startTime,
        });
      }

      if (projectsList.length > 0) {
        return createPolicyResponse({
          conversationId,
          content: getNoMoreProjectExamplesResponse(projectTopicLabel),
          model: 'project-examples-exhausted',
          startTime,
        });
      }

      return createPolicyResponse({
        conversationId,
        content: getNoProjectDataResponse(projectTopicLabel),
        model: 'project-examples-no-data',
        startTime,
      });
    }


    // If showing project examples, hint the AI about the specific topic so it doesn't say "nhu cầu của bạn"
    const projectTopicHint = projectTopicLabel
      ? `\n### YÊU CẦU HIỆN TẠI: Khách đang hỏi dự án mẫu cho lĩnh vực "${projectTopicLabel}". Hãy giới thiệu các dự án phù hợp với lĩnh vực này từ THÔNG TIN KIẾN THỨC bên dưới. Mở đầu phải nêu rõ chủ đề "${projectTopicLabel}", KHÔNG viết chung chung "đáp ứng nhu cầu của bạn".`
      : '';

    const systemPrompt = buildSystemPrompt({
      retrievedContext,
      conversationSummary: memorySummary,
    }) + projectTopicHint;

    // 5. Determine active provider
    const isOllamaLocal = AI_PROVIDER === 'ollama' || AI_PROVIDER === 'local';
    const useGemini = !isOllamaLocal && (AI_PROVIDER === 'gemini' || !!GEMINI_API_KEY);
    const activeModelName = isOllamaLocal
      ? OLLAMA_CHAT_MODEL
      : useGemini
        ? GEMINI_CHAT_MODEL
        : OPENAI_CHAT_MODEL;
    const activeProvider = isOllamaLocal ? 'ollama' : useGemini ? 'gemini' : 'openai';

    let responseStream: ReadableStream;
    let fullAssistantContent = '';
    const encoder = new TextEncoder();

    if (isOllamaLocal) {
      // -------------------------------------------------------------
      // OLLAMA LOCAL AI STREAMING & LOCAL RAG ENGINE
      // -------------------------------------------------------------
      const ollamaMessages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
        { role: 'system', content: systemPrompt },
      ];
      for (const msg of history) {
        if (msg.role === 'USER' || msg.role === 'ASSISTANT') {
          ollamaMessages.push({
            role: msg.role === 'USER' ? 'user' : 'assistant',
            content: msg.content,
          });
        }
      }

      responseStream = new ReadableStream({
        async start(controller) {
          try {
            const ollamaStream = await ollamaClient.chat({
              model: OLLAMA_CHAT_MODEL,
              messages: ollamaMessages,
              stream: true,
            });

            for await (const chunk of ollamaStream) {
              const text = chunk.message?.content || '';
              if (text) {
                fullAssistantContent += text;
                controller.enqueue(encoder.encode(text));
              }
            }
          } catch (ollamaErr: any) {
            console.warn('[Ollama Service Offline - Using Local Knowledge Engine Fallback]:', ollamaErr.message || ollamaErr);
            const getLocalFallbackText = () => {
              const userMsgLower = validated.content.toLowerCase().trim();

              const isIdentityQuery = /bạn là ai|ban la ai|bạn tên gì|ban ten gi|ai đó|ai do|who are you/i.test(userMsgLower);

              const isContactOrServiceQuery = /dịch vụ|dich vu|địa chỉ|dia chi|văn phòng|van phong|số điện thoại|so dien thoai|hotline|sđt|sdt|email|liên hệ|lien he|ở đâu|o dau|trụ sở|tru so|liên lạc|lien lac/i.test(userMsgLower);

              const isProjectQuery = /dự án|du an|mẫu|mau|danh mục|danh muc|xem|ô tô|o to|du lịch|du lich|bất động sản|bat dong san|bán hàng|ban hang|studio/i.test(userMsgLower);

              // 1. Return Contact & Services Info for address/phone/services questions
              if (isContactOrServiceQuery || (!isProjectQuery && (userMsgLower.includes('dudi') || userMsgLower.includes('công ty')))) {
                return `**CÔNG TY DUDI SOFTWARE** chuyên cung cấp các giải pháp công nghệ và thiết kế website / mobile app chuyên nghiệp:

### 🚀 Các Dịch Vụ Chính Tại DUDI SOFTWARE:
1. **Phát triển Web & Phần mềm Doanh nghiệp**: Website chuẩn SEO, E-Commerce, Portal, hệ thống ERP/CRM.
2. **Phát triển Ứng dụng Di động (Mobile App)**: Ứng dụng iOS & Android đa nền tảng (React Native, Flutter).
3. **Thiết kế UI/UX Chuyên nghiệp**: Giao diện tinh tế, hiện đại, tối ưu trải nghiệm người dùng.
4. **Giải pháp Điện toán Đám mây & DevOps**: Hạ tầng AWS, Docker, Microservices vận hành ổn định.
5. **AI & Chatbot RAG Thông minh**: Tự động hóa tư vấn & chăm sóc khách hàng 24/7.
6. **Bảo trì & Hỗ trợ Kỹ thuật 24/7**: Đội ngũ trực khẩn cấp 24/7, bảo trì hệ thống định kỳ.

---

### 📍 Thông Tin Liên Hệ Văn Phòng DUDI SOFTWARE:
- 🏢 **Địa chỉ 1**: 232 Đường Nguyễn Thị Minh Khai, Phường Xuân Hòa, TP. Hồ Chí Minh
- 🏢 **Địa chỉ 2**: 49/2 Đường 14, Phường Thủ Đức, TP. Hồ Chí Minh
- 📞 **Hotline / SĐT**: **(+84) 909 163 821**
- ✉️ **Email tiếp nhận**: **contact@dudisoftware.com**
- 🌐 **Website chính thức**: [https://www.dudisoftware.com/](https://www.dudisoftware.com/)

Bạn cần tôi tư vấn chi tiết hơn về gói dịch vụ nào hay muốn tham khảo kho 400+ dự án thực tế của DUDI Software không ạ?`;
              }

              // 2. Return AI Identity
              if (isIdentityQuery) {
                return `Xin chào! Tôi là Trợ lý AI tư vấn khách hàng chính thức của **DUDI SOFTWARE**.

Tôi ở đây để hỗ trợ tư vấn cho bạn các dịch vụ của DUDI Software bao gồm:
- **Phát triển Web & Phần mềm Doanh nghiệp** (Website chuẩn SEO, E-Commerce, ERP/CRM)
- **Ứng dụng Di động (Mobile App)** trên iOS & Android (React Native, Flutter)
- **Thiết kế UI/UX** tinh tế, tối ưu trải nghiệm người dùng
- **Giải pháp Điện toán Đám mây & DevOps** (AWS, Docker, Microservices)
- **AI & Chatbot RAG** tự động hóa chăm sóc khách hàng 24/7
- **Bảo trì & Hỗ trợ kỹ thuật 24/7**

Thông tin liên hệ DUDI SOFTWARE:
- **Địa chỉ 1**: 232 Đường Nguyễn Thị Minh Khai, Phường Xuân Hòa, TP. Hồ Chí Minh
- **Địa chỉ 2**: 49/2 Đường 14, Phường Thủ Đức, TP. Hồ Chí Minh
- **Hotline**: (+84) 909 163 821
- **Email**: contact@dudisoftware.com

Bạn cần tôi hỗ trợ tư vấn thêm thông tin gì không ạ?`;
              }

              // 3. Process Projects Query if matching relevantChunks
              if (relevantChunks.length > 0 && (intent.type === 'project_examples' || /dự án|du an|mẫu|mau|link|ví dụ|vi du|sản phẩm|san pham/i.test(userMsgLower) || /\b(xem\s+mau|xem\s+du\s*an|xem\s+website|xem\s+them|xem\s+portfolio|xem\s+case\s*study)\b/i.test(userMsgLower))) {
                // Use context-enriched searchQuery so project filter targets the right industry
                const projectsList = extractProjectsFromKnowledge(relevantChunks, searchQuery);

                if (projectsList.length > 0) {
                  const formatted = projectsList.slice(0, 5).map((p, idx) => {
                    return `### 🔹 ${idx + 1}. Dự án ${p.title}\n- 🌐 **Website**: [${p.url}](${p.url})\n- 📝 **Mô tả chi tiết**: ${p.description}`;
                  }).join('\n\n');

                  // Build a specific header mentioning the topic (not just "nhu cầu của bạn")
                  const topicHeader = projectTopicLabel
                    ? `Dưới đây là một số dự án **${projectTopicLabel}** tiêu biểu mà DUDI SOFTWARE đã triển khai:`
                    : `Dưới đây là các dự án tiêu biểu từ **DUDI SOFTWARE** phù hợp với nhu cầu của anh/chị:`;

                  return `${topicHeader}\n\n` + formatted + `\n\n---\nAnh/chị muốn tham khảo thêm dự án khác hoặc tư vấn chi tiết, vui lòng cho em biết ạ.`;
                }
              }

              // 4. Conversational Fallbacks for off-topic/casual inputs
              if (/nhau|uong bia|uong ruou/i.test(userMsgLower.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))) {
                return 'Dạ, em tên là DU - Trợ lý AI tư vấn dịch vụ của DUDI Software nên không đi nhậu được đâu ạ! Hẹn anh/chị dịp khác sau giờ làm việc nhé. Em có thể hỗ trợ tư vấn gì cho anh/chị về thiết kế website hay app di động không ạ?';
              }

              if (/chao|hello|hi|xin chao|hey/i.test(userMsgLower.normalize('NFD').replace(/[\u0300-\u036f]/g, '')) && userMsgLower.length < 15) {
                return 'Xin chào! Em tên là DU - Trợ lý AI tư vấn dịch vụ của DUDI Software. Em có thể giúp gì cho anh/chị hôm nay về thiết kế website và phần mềm ạ?';
              }

              if (/cam on|thanks|thank you/i.test(userMsgLower.normalize('NFD').replace(/[\u0300-\u036f]/g, '')) && userMsgLower.length < 15) {
                return 'Dạ không có gì ạ! DU rất vui được hỗ trợ anh/chị. Nếu cần tư vấn thêm về dịch vụ công nghệ, anh/chị cứ nhắn em nhé!';
              }

              if (/tam biet|bye/i.test(userMsgLower.normalize('NFD').replace(/[\u0300-\u036f]/g, '')) && userMsgLower.length < 15) {
                return 'Tạm biệt anh/chị! Chúc anh/chị một ngày làm việc hiệu quả. Hẹn gặp lại!';
              }

              return 'Dạ, em là DU - Trợ lý AI của DUDI Software. Em chưa hiểu rõ câu hỏi của anh/chị. Anh/chị cần em tư vấn thêm thông tin gì về dịch vụ thiết kế web/app hay liên hệ hotline (+84) 909 163 821 để nhân viên hỗ trợ trực tiếp ạ?';
            };

            let fallbackSuccess = false;

            // Try Google Gemini online fallback first if API key is present
            if (process.env.GEMINI_API_KEY) {
              try {
                const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];
                for (const msg of history) {
                  if (msg.role === 'USER' || msg.role === 'ASSISTANT') {
                    const role = msg.role === 'USER' ? 'user' : 'model';
                    if (contents.length > 0 && contents[contents.length - 1].role === role) {
                      contents[contents.length - 1].parts[0].text += '\n' + msg.content;
                    } else {
                      contents.push({
                        role,
                        parts: [{ text: msg.content }],
                      });
                    }
                  }
                }

                if (contents.length > 0 && contents[0].role === 'model') {
                  contents.shift();
                }

                if (contents.length === 0) {
                  contents.push({
                    role: 'user',
                    parts: [{ text: validated.content }],
                  });
                }

                for (const modelName of GEMINI_FALLBACK_MODELS) {
                  try {
                    const geminiModel = genAI.getGenerativeModel({
                      model: modelName,
                      systemInstruction: systemPrompt,
                    });
                    const result = await geminiModel.generateContent({ contents });
                    const responseText = result.response.text();
                    if (responseText) {
                      fullAssistantContent = responseText;
                      fallbackSuccess = true;
                      break;
                    }
                  } catch (geminiModelErr: any) {
                    console.warn(`[Gemini Online Fallback Model ${modelName} Error]:`, geminiModelErr.message || geminiModelErr);
                  }
                }
              } catch (geminiFallbackErr: any) {
                console.warn('[Gemini Online Fallback Error]:', geminiFallbackErr.message || geminiFallbackErr);
              }
            }

            // Try OpenAI Fallback next
            if (!fallbackSuccess && process.env.OPENAI_API_KEY) {
              try {
                const openAiResponse = await openai.chat.completions.create({
                  model: OPENAI_CHAT_MODEL,
                  messages: [
                    { role: 'system', content: systemPrompt },
                    ...ollamaMessages.filter((m) => m.role !== 'system'),
                  ],
                  temperature: 0.3,
                });
                const responseText = openAiResponse.choices[0]?.message?.content || '';
                if (responseText) {
                  fullAssistantContent = responseText;
                  fallbackSuccess = true;
                }
              } catch (openAiFallbackErr: any) {
                console.warn('[OpenAI Fallback Error]:', openAiFallbackErr.message || openAiFallbackErr);
              }
            }

            // Ultimate fallback to local hardcoded engine
            if (!fallbackSuccess) {
              fullAssistantContent = getLocalFallbackText();
            }

            // Stream local fallback text chunk by chunk for smooth animation
            const words = fullAssistantContent.split(' ');
            for (let i = 0; i < words.length; i++) {
              const piece = (i === 0 ? '' : ' ') + words[i];
              controller.enqueue(encoder.encode(piece));
              await new Promise((res) => setTimeout(res, 15));
            }
          }

          controller.close();

          const responseTimeMs = Date.now() - startTime;
          const assistantMsg = await ConversationService.createMessage({
            conversationId,
            role: 'ASSISTANT',
            content: fullAssistantContent,
            model: activeModelName,
            references,
          });

          await connectToDatabase();
          await AiUsageLog.create({
            conversationId,
            messageId: assistantMsg._id,
            provider: activeProvider,
            model: activeModelName,
            inputTokens: 0,
            outputTokens: 0,
            totalTokens: 0,
            responseTimeMs,
            success: true,
          });
        },
      });
    } else if (useGemini) {
      // -------------------------------------------------------------
      // GOOGLE GEMINI STREAMING
      // -------------------------------------------------------------
      const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];
      for (const msg of history) {
        if (msg.role === 'USER' || msg.role === 'ASSISTANT') {
          const role = msg.role === 'USER' ? 'user' : 'model';
          if (contents.length > 0 && contents[contents.length - 1].role === role) {
            contents[contents.length - 1].parts[0].text += '\n' + msg.content;
          } else {
            contents.push({
              role,
              parts: [{ text: msg.content }],
            });
          }
        }
      }

      if (contents.length > 0 && contents[0].role === 'model') {
        contents.shift();
      }

      if (contents.length === 0) {
        contents.push({
          role: 'user',
          parts: [{ text: validated.content }],
        });
      }

      let geminiResult;
      let selectedGeminiModel = GEMINI_CHAT_MODEL;
      for (const modelName of GEMINI_FALLBACK_MODELS) {
        for (let attempt = 0; attempt < 3; attempt++) {
          try {
            const geminiModel = genAI.getGenerativeModel({
              model: modelName,
              systemInstruction: systemPrompt,
            });
            geminiResult = await geminiModel.generateContentStream({ contents });
            selectedGeminiModel = modelName;
            break;
          } catch (err: any) {
            console.warn(`[Gemini Model ${modelName} Attempt ${attempt + 1} Failed]:`, err.message || err);
            if (attempt < 2) {
              const delay = (/429/.test(err.message || '') || /503/.test(err.message || '')) ? 1500 * (attempt + 1) : 800 * (attempt + 1);
              await new Promise((resolve) => setTimeout(resolve, delay));
            }
          }
        }
        if (geminiResult) break;
      }

      if (!geminiResult) {
        console.warn('[Gemini Online Stream Failed - Using Local Knowledge Engine Fallback]');
        const getLocalFallbackText = () => {
          const userMsgLower = validated.content.toLowerCase().trim();
          const isIdentityQuery = /bạn là ai|ban la ai|bạn tên gì|ban ten gi|ai đó|ai do|who are you/i.test(userMsgLower);
          const isContactOrServiceQuery = /dịch vụ|dich vu|địa chỉ|dia chi|văn phòng|van phong|số điện thoại|so dien thoai|hotline|sđt|sdt|email|liên hệ|lien he|ở đâu|o dau|trụ sở|tru so|liên lạc|lien lac/i.test(userMsgLower);
          const isProjectQuery = /dự án|du an|mẫu|mau|danh mục|danh muc|xem|ô tô|o to|du lịch|du lich|bất động sản|bat dong san|bán hàng|ban hang|studio/i.test(userMsgLower);

          if (isPricingOrMoneyInquiry(validated.content)) {
            return getPricingHandoffResponse();
          }

          if (isContactOrServiceQuery || (!isProjectQuery && (userMsgLower.includes('dudi') || userMsgLower.includes('công ty')))) {
            return `**CÔNG TY DUDI SOFTWARE** chuyên cung cấp các giải pháp công nghệ và thiết kế website / mobile app chuyên nghiệp:\n\n### 🚀 Các Dịch Vụ Chính Tại DUDI SOFTWARE:\n1. **Phát triển Web & Phần mềm Doanh nghiệp**: Website chuẩn SEO, E-Commerce, Portal, hệ thống ERP/CRM.\n2. **Phát triển Ứng dụng Di động (Mobile App)**: Ứng dụng iOS & Android đa nền tảng.\n3. **Thiết kế UI/UX Chuyên nghiệp**: Giao diện tinh tế, hiện đại, tối ưu trải nghiệm người dùng.\n4. **AI & Chatbot RAG Thông minh**: Tự động hóa tư vấn & chăm sóc khách hàng 24/7.\n5. **Bảo trì & Hỗ trợ Kỹ thuật 24/7**: Đội ngũ trực khẩn cấp 24/7, bảo trì hệ thống định kỳ.\n\n---\n### 📍 Thông Tin Liên Hệ Văn Phòng DUDI SOFTWARE:\n- 🏢 **Địa chỉ 1**: 232 Đường Nguyễn Thị Minh Khai, Phường Xuân Hòa, TP. Hồ Chí Minh\n- 🏢 **Địa chỉ 2**: 49/2 Đường 14, Phường Thủ Đức, TP. Hồ Chí Minh\n- 📞 **Hotline / SĐT**: **(+84) 909 163 821**\n- ✉️ **Email tiếp nhận**: **contact@dudisoftware.com**\n- 🌐 **Website chính thức**: [https://www.dudisoftware.com/](https://www.dudisoftware.com/)\n\nBạn cần tôi tư vấn chi tiết hơn về gói dịch vụ nào hay muốn tham khảo kho 400+ dự án thực tế của DUDI Software không ạ?`;
          }

          if (isIdentityQuery) {
            return `Xin chào! Tôi là DU - Trợ lý AI tư vấn khách hàng chính thức của **DUDI SOFTWARE**.\n\nTôi ở đây để hỗ trợ tư vấn cho bạn các dịch vụ của DUDI Software bao gồm:\n- **Thiết kế Website & Landing Page tối ưu chuyển đổi**\n- **Ứng dụng Di động (Mobile App)** trên iOS & Android\n- **Phần mềm quản lý doanh nghiệp (CRM / ERP / Booking)**\n- **Tích hợp API & AI Chatbot RAG 24/7**\n- **Bảng giá tham khảo các gói dịch vụ chuẩn**\n\nHotline hỗ trợ: (+84) 909 163 821. Bạn cần tôi hỗ trợ thêm thông tin gì không ạ?`;
          }

          if (relevantChunks.length > 0 && (intent.type === 'project_examples' || /dự án|du an|mẫu|mau|link|ví dụ|vi du|sản phẩm|san pham/i.test(userMsgLower))) {
            const projectsList = extractProjectsFromKnowledge(relevantChunks, searchQuery);
            if (projectsList.length > 0) {
              const formatted = projectsList.slice(0, 5).map((p, idx) => `### 🔹 ${idx + 1}. Dự án ${p.title}\n- 🌐 **Website**: [${p.url}](${p.url})\n- 📝 **Mô tả chi tiết**: ${p.description}`).join('\n\n');
              const topicHeader = projectTopicLabel ? `Dưới đây là một số dự án **${projectTopicLabel}** tiêu biểu mà DUDI SOFTWARE đã triển khai:` : `Dưới đây là các dự án tiêu biểu từ **DUDI SOFTWARE** phù hợp với nhu cầu của anh/chị:`;
              return `${topicHeader}\n\n${formatted}\n\n---\nAnh/chị muốn tham khảo thêm dự án khác hoặc tư vấn chi tiết, vui lòng cho em biết ạ.`;
            }
          }

          if (relevantChunks.length > 0) {
            const topChunk = relevantChunks[0];
            const cleanSnippet = topChunk.content.replace(/^#+\s+/gm, '').slice(0, 500);
            return [
              `Dạ, về câu hỏi của anh/chị, DUDI Software xin chia sẻ thông tin từ tài liệu **${topChunk.title}**:`,
              '',
              cleanSnippet,
              '',
              'Anh/chị cần tư vấn giải pháp chi tiết hoặc báo giá dự án, vui lòng để lại số điện thoại hoặc liên hệ Hotline **(+84) 909 163 821** để chuyên viên hỗ trợ ngay ạ!',
            ].join('\n');
          }

          return 'Dạ, em là DU - Trợ lý AI của DUDI Software. Em có thể hỗ trợ anh/chị tư vấn về giải pháp kỹ thuật, thiết kế website, ứng dụng di động, tích hợp API hoặc cung cấp bảng giá tham khảo chi tiết ạ!';
        };

        const fallbackText = getLocalFallbackText();
        responseStream = new ReadableStream({
          async start(controller) {
            const words = fallbackText.split(' ');
            for (let i = 0; i < words.length; i++) {
              const piece = (i === 0 ? '' : ' ') + words[i];
              controller.enqueue(encoder.encode(piece));
              await new Promise((res) => setTimeout(res, 15));
            }
            controller.close();

            const responseTimeMs = Date.now() - startTime;
            const assistantMsg = await ConversationService.createMessage({
              conversationId,
              role: 'ASSISTANT',
              content: fallbackText,
              model: 'gemini-fallback',
              references,
            });

            await connectToDatabase();
            await AiUsageLog.create({
              conversationId,
              messageId: assistantMsg._id,
              provider: activeProvider,
              model: 'gemini-fallback',
              inputTokens: 0,
              outputTokens: 0,
              totalTokens: 0,
              responseTimeMs,
              success: true,
            });
          },
        });
      } else {
        responseStream = new ReadableStream({
          async start(controller) {
            try {
              for await (const chunk of geminiResult.stream) {
                const text = chunk.text();
                if (text) {
                  fullAssistantContent += text;
                  controller.enqueue(encoder.encode(text));
                }
              }
              controller.close();

              const responseTimeMs = Date.now() - startTime;
              const assistantMsg = await ConversationService.createMessage({
                conversationId,
                role: 'ASSISTANT',
                content: fullAssistantContent,
                model: selectedGeminiModel,
                references,
              });

              await connectToDatabase();
              await AiUsageLog.create({
                conversationId,
                messageId: assistantMsg._id,
                provider: activeProvider,
                model: selectedGeminiModel,
                inputTokens: 0,
                outputTokens: 0,
                totalTokens: 0,
                responseTimeMs,
                success: true,
              });
            } catch (streamError: any) {
              console.error('[Gemini Stream Processing Error]:', streamError);
              controller.error(streamError);
            }
          },
        });
      }
    } else {
      // -------------------------------------------------------------
      // OPENAI STREAMING
      // -------------------------------------------------------------
      const openAiMessages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
        { role: 'system', content: systemPrompt },
      ];

      for (const msg of history) {
        if (msg.role === 'USER' || msg.role === 'ASSISTANT') {
          openAiMessages.push({
            role: msg.role === 'USER' ? 'user' : 'assistant',
            content: msg.content,
          });
        }
      }

      const openAiResponse = await openai.chat.completions.create({
        model: OPENAI_CHAT_MODEL,
        messages: openAiMessages,
        stream: true,
        temperature: 0.3,
      });

      responseStream = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of openAiResponse) {
              const content = chunk.choices[0]?.delta?.content || '';
              if (content) {
                fullAssistantContent += content;
                controller.enqueue(encoder.encode(content));
              }
            }
            controller.close();

            const responseTimeMs = Date.now() - startTime;
            const assistantMsg = await ConversationService.createMessage({
              conversationId,
              role: 'ASSISTANT',
              content: fullAssistantContent,
              model: activeModelName,
              references,
            });

            await connectToDatabase();
            await AiUsageLog.create({
              conversationId,
              messageId: assistantMsg._id,
              provider: activeProvider,
              model: activeModelName,
              inputTokens: 0,
              outputTokens: 0,
              totalTokens: 0,
              responseTimeMs,
              success: true,
            });
          } catch (streamError: any) {
            console.error('[OpenAI Stream Processing Error]:', streamError);
            controller.error(streamError);
          }
        },
      });
    }


    return new Response(responseStream, {
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
      },
    });
  } catch (error: any) {
    console.error('[API Message POST Error]:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Lỗi xử lý tin nhắn' },
      { status: 400 }
    );
  }
}
