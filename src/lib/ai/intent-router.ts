import fs from 'fs';
import path from 'path';
import { isBusinessDomainsInquiry } from './business-domains';
import { extractCustomerPhone, isPricingOrMoneyInquiry } from './pricing-policy';
import { generateEmbedding } from './embeddings';

export type ChatIntentType =
  | 'pricing_handoff'
  | 'pricing_phone_received'
  | 'identity'
  | 'company_intro'
  | 'business_domains'
  | 'contact_info'
  | 'service_overview'
  | 'service_consultation'
  | 'project_inspired_consultation'
  | 'project_examples'
  | 'rag_answer';

export interface ConversationIntentContext {
  status?: string;
  title?: string;
  summary?: string;
  memorySummary?: string;
  recentMessages?: Array<{ role: 'USER' | 'ASSISTANT'; content: string }>;
}

export interface ClassifiedChatIntent {
  type: ChatIntentType;
  confidence: 'high' | 'medium' | 'low';
  phone?: string;
  reason: string;
}

function normalizeIntentText(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function isPricingConversation(context?: ConversationIntentContext): boolean {
  if (context?.status !== 'WAITING_FOR_AGENT') {
    return false;
  }

  const normalizedContext = normalizeIntentText(`${context.title || ''} ${context.summary || ''}`);
  return /\b(bao\s*gia|pricing)\b/.test(normalizedContext);
}

function isContactInfoInquiry(normalizedMessage: string): boolean {
  return /\b(lien\s*he|hotline|so\s*dien\s*thoai|sdt|email|dia\s*chi|van\s*phong|o\s*dau)\b/.test(normalizedMessage);
}

function isIdentityInquiry(normalizedMessage: string): boolean {
  const asksForProjects = /\bdu\s*an|project|mau|portfolio|case\s*study|tieu\s*bieu|tham\s*khao\b/.test(normalizedMessage);
  const asksForServices = /\b(dich\s*vu|giai\s*phap|lam\s*duoc\s*gi|cung\s*cap\s*gi|web|website|trang\s*web|app|mobile|phan\s*mem|he\s*thong|thiet\s*ke|xay\s*dung|lam|muon\s*lam|can\s*lam|tu\s*van)\b/.test(normalizedMessage);
  const asksAboutDudi = /\bdudi|cong\s*ty\b/.test(normalizedMessage);
  const mentionsSpecificDomain = /\b(bat\s*dong\s*san|nha\s*dat|doanh\s*nghiep|ban\s*hang|e\s*commerce|ecommerce|truyen|truyen\s*tranh|o\s*to|xe|du\s*lich|tour|khach\s*san|thoi\s*trang|quan\s*ao|thuc\s*pham|f\s*b|do\s*gia\s*dung|gia\s*dung|nha\s*bep|my\s*pham|noi\s*that|crm|erp|booking|chatbot|rag|ui\s*ux|luat|luat\s*su|phap\s*luat|nha\s*khoa|xay\s*dung|logistics|tuyen\s*dung|pet|thu\s*cung)\b/.test(normalizedMessage);

  const shortIntroductionRequest =
    /\b(gioi\s*thieu|noi\s*qua|tom\s*tat)\b/.test(normalizedMessage) &&
    normalizedMessage.length <= 80 &&
    !asksForProjects &&
    !asksForServices &&
    !asksAboutDudi &&
    !mentionsSpecificDomain;

  return (
    /\b((ban|m|minh)\s*la\s*ai|(ban|m|minh)\s*ten\s*gi|ai\s*do|tro\s*ly\s*nao|who\s*are\s*you|what\s*are\s*you)\b/.test(normalizedMessage) ||
    shortIntroductionRequest
  );
}

function isCompanyIntroInquiry(normalizedMessage: string): boolean {
  const mentionsDudi = /\bdudi\b|cong\s*ty\s+(ban|minh)\b|ben\s+(ban|minh)\b/.test(normalizedMessage);
  const asksCompanyIntro =
    /\b(gioi\s*thieu|noi\s*qua|tom\s*tat|la\s*ai|co\s*gi|lam\s*gi|lam\s*ve\s*gi|cung\s*cap\s*gi|co\s*nhung\s*gi)\b/.test(
      normalizedMessage
    );
  const asksForProjects = /\bdu\s*an|project|mau|portfolio|case\s*study|tieu\s*bieu|tham\s*khao|link\b/.test(normalizedMessage);

  return mentionsDudi && asksCompanyIntro && !asksForProjects;
}

function isGeneralWebOrServiceQuestion(normalizedMessage: string): boolean {
  return (
    /\b(nhung|cac|loai|kieu|dang)\s*(web|website|trang\s*web|app|phan\s*mem)\b/.test(normalizedMessage) ||
    /\b(web|website|trang\s*web|app|phan\s*mem)\s*(kieu|loai|dang)\s*(gi|nao)\b/.test(normalizedMessage) ||
    /\b(lam|co|cung\s*cap)\s*(nhung|cac)?\s*(web|website|trang\s*web|app|phan\s*mem)\s*(kieu|loai|dang|gi|nao)\b/.test(normalizedMessage) ||
    /\b(m|ban|minh|ben\s*ban)\s*lam\s*(nhung|cac)?\s*(web|website|trang\s*web|app|phan\s*mem)\b/.test(normalizedMessage)
  );
}

function isServiceOverviewInquiry(normalizedMessage: string, context?: ConversationIntentContext): boolean {
  const mentionsSpecificCategory =
    /\b(doanh\s*nghiep|thuong\s*hieu|bat\s*dong\s*san|nha\s*dat|o\s*to|xe|du\s*lich|tour|khach\s*san|thoi\s*trang|quan\s*ao|thuc\s*pham|f\s*b|do\s*gia\s*dung|gia\s*dung|nha\s*bep|my\s*pham|noi\s*that|app|mobile|ios|android|crm|erp|booking|chatbot|rag|ui\s*ux|luat|luat\s*su|phap\s*luat|nha\s*khoa|xay\s*dung|logistics|tuyen\s*dung|pet|thu\s*cung)\b/.test(
      normalizedMessage
    );

  const cleanText = normalizedMessage.replace(/[,.]/g, '').trim();
  const isDirectOverviewRequest = 
    /^(tu\s*van|toi\s*muon\s*tu\s*van|can\s*tu\s*van|tu\s*van\s*giup(\s*em)?|tu\s*van\s*em|muon\s*tu\s*van|tu\s*van\s*ho(\s*em)?)$/i.test(cleanText);
  const isGeneralQuestion = isGeneralWebOrServiceQuestion(normalizedMessage);

  // If AI is already in a consultation branch (recentMessages contains service guidance),
  // do NOT show overview again — keep the user in the current branch
  if ((isDirectOverviewRequest || isGeneralQuestion) && context?.recentMessages) {
    const lastAssistantMsg = [...(context.recentMessages)].reverse().find(m => m.role === 'ASSISTANT')?.content || '';
    const hasOngoingConsultation = /\b(app|mobile|crm|erp|booking|phan\s*mem|landing\s*page|doanh\s*nghiep|ban\s*hang|e.commerce|chatbot|rag|ui\s*ux|cloud|devops|bat\s*dong\s*san|nha\s*dat|o\s*to|du\s*lich|thoi\s*trang|thuc\s*pham|giao\s*duc|xay\s*dung|logistics|nha\s*khoa|thi\s*truong|luat|tuyen\s*dung|pet)\b/i.test(lastAssistantMsg);
    if (hasOngoingConsultation) {
      return false; // Stay in consultation context, not overview
    }
  }

  return (
    (isDirectOverviewRequest || isGeneralQuestion || /\b(dich\s*vu|giai\s*phap|lam\s*duoc\s*gi|cung\s*cap\s*gi|co\s*lam|co\s*gi|co\s*nhung\s*gi|gioi\s*thieu\s*dich\s*vu|gioi\s*thieu\s*giai\s*phap)\b/.test(normalizedMessage)) &&
    !/\bdu\s*an|project|mau|portfolio|tieu\s*bieu\b/.test(normalizedMessage) &&
    !mentionsSpecificCategory
  );
}

function isServiceConsultationInquiry(normalizedMessage: string): boolean {
  if (isGeneralWebOrServiceQuestion(normalizedMessage)) {
    return false;
  }

  const hasNeedVerb = /\b(muon|can|du\s*dinh|dinh|nhu\s*cau)\b/.test(normalizedMessage);
  const hasConsultVerb = /\b(tu\s*van|can\s*tu\s*van|muon\s*tu\s*van)\b/.test(normalizedMessage);
  const hasBuildVerb = /\b(lam|thiet\s*ke|xay\s*dung|phat\s*trien|trien\s*khai|xay|tao)\b/.test(normalizedMessage);
  const hasService =
    /\b(web|website|landing\s*page|ban\s*hang|thuong\s*mai\s*dien\s*tu|e\s*commerce|app|mobile|ios|android|phan\s*mem|he\s*thong|crm|erp|booking|chatbot|ai|rag|ui\s*ux|luat|luat\s*su|phap\s*luat|nha\s*khoa|thoi\s*trang|my\s*pham|lam\s*dep|spa|thuc\s*pham|f&b|do\s*an|nha\s*hang|cafe|giao\s*duc|e\s*learning|khoa\s*hoc|noi\s*that|decor|logistics|van\s*chuyen|ship|tai\s*chinh|ngan\s*hang|bao\s*hiem|tuyen\s*dung|viec\s*lam|pet|thu\s*cung)\b/.test(normalizedMessage);
  const asksForExamples = /\bdu\s*an|project|mau|portfolio|case\s*study|tieu\s*bieu|tham\s*khao\b/.test(normalizedMessage);
  const asksForPricing = isPricingOrMoneyInquiry(normalizedMessage);

  // Pure service-keyword selection (user copying from a list, no verb needed)
  // e.g. "Website doanh nghiep, landing page, website gioi thieu thuong hieu."
  // Exclude: comparison/reference patterns like "giống Shopify", "tương tự như Haravan"
  const hasReferencePattern = /\b(giong|kieu|tuong\s*tu|nhu\s*(the|vay|nay)|theo\s*mau|mau\s*nay|shopify|haravan|pancake|abitmes|tendoo|upos|tiki|shopee|shopi|lazada|tiktok\s*shop|tik\s*tok\s*shop)\b/.test(normalizedMessage);
  const isPureServiceSelection = hasService && normalizedMessage.length <= 120 && !hasNeedVerb && !hasBuildVerb && !hasConsultVerb && !hasReferencePattern;

  return hasService && !asksForExamples && !asksForPricing && (
    hasNeedVerb || 
    hasBuildVerb || 
    hasConsultVerb || 
    normalizedMessage.length <= 25 ||
    isPureServiceSelection ||
    /\b(giao\s*dien|danh\s*muc|san\s*pham|thanh\s*toan\s*online|dat\s*hang|gio\s*hang|quan\s*tri\s*don\s*hang|van\s*chuyen|khuyen\s*mai|thuong\s*mai\s*dien\s*tu|ban\s*hang\s*da\s*kenh)\b/.test(normalizedMessage)
  );
}


function isServiceConsultationFollowUp(
  normalizedMessage: string,
  context?: ConversationIntentContext
): boolean {
  const normalizedContext = normalizeIntentText(
    `${context?.title || ''} ${context?.summary || ''} ${context?.memorySummary || ''}`
  );
  const lastAssistantMsg = context?.recentMessages
    ? [...context.recentMessages].reverse().find(m => m.role === 'ASSISTANT')?.content || ''
    : '';
  const normalizedLastAssistantMsg = normalizeIntentText(lastAssistantMsg);

  const hasConsultationContext =
    /\b(website\s*ban\s*hang|e\s*commerce|thuong\s*mai\s*dien\s*tu|ban\s*hang|mobile\s*app|crm|erp|booking|chatbot|rag|tu\s*van|doanh\s*nghiep|gioi\s*thieu\s*thuong\s*hieu|website\s*doanh\s*nghiep)\b/.test(
      `${normalizedContext} ${normalizedLastAssistantMsg}`
    );

  const isWebCorporateAnswer =
    /\b(doanh\s*nghiep|gioi\s*thieu|gioi\s*thieu\s*cong\s*ty|gioi\s*thieu\s*dich\s*vu|moi|lam\s*moi|tu\s*dau|nang\s*cap|lam\s*lai|redesign)\b/.test(
      normalizedMessage
    ) && normalizedMessage.length <= 80;

  const mentionsFeature =
    /\b(giao\s*dien|ui\s*ux|danh\s*muc|san\s*pham|gio\s*hang|dat\s*hang|checkout|thanh\s*toan\s*online|quan\s*tri|don\s*hang|van\s*chuyen|giao\s*hang|ship|khuyen\s*mai|voucher|ma\s*giam\s*gia|seo|ban\s*le|da\s*kenh|cua\s*hang|chi\s*nhanh|kho\s*hang|san\s*nhieu\s*nha\s*ban|marketplace)\b/.test(
      normalizedMessage
    );
  const looksLikeEcommerceProductAnswer =
    normalizedMessage.length <= 120 &&
    /\b(ban|shop|cua\s*hang|quan\s*ao|thoi\s*trang|my\s*pham|do\s*gia\s*dung|noi\s*that|thuc\s*pham|do\s*an|nha\s*bep|dien\s*thoai|phu\s*kien|me\s*va\s*be|sach|hoa|cay\s*canh|san\s*pham)\b/.test(
      normalizedMessage
    );
  const asksForExamples =
    /\b(du\s*an|project|mau|portfolio|case\s*study|tieu\s*bieu|tham\s*khao|link)\b/.test(normalizedMessage);
  const asksForPricing =
    /\b(gia|bao\s*gia|bang\s*gia|don\s*gia|chi\s*phi|phi|tien|bao\s*nhieu|cost|price|pricing|quote|budget)\b/.test(normalizedMessage);

  return hasConsultationContext && (mentionsFeature || looksLikeEcommerceProductAnswer || isWebCorporateAnswer) && !asksForExamples && !asksForPricing;
}

function isStandaloneCommerceConsultation(normalizedMessage: string): boolean {
  const asksForExamples =
    /\b(du\s*an|project|mau|portfolio|case\s*study|tieu\s*bieu|tham\s*khao|link)\b/.test(normalizedMessage);
  const asksForPricing =
    /\b(gia|bao\s*gia|bang\s*gia|don\s*gia|chi\s*phi|phi|tien|bao\s*nhieu|cost|price|pricing|quote|budget)\b/.test(normalizedMessage);
  const mentionsCommerceModule =
    /\b(giao\s*dien|ui\s*ux|danh\s*muc|san\s*pham|gio\s*hang|dat\s*hang|checkout|thanh\s*toan\s*online|quan\s*tri|don\s*hang|van\s*chuyen|giao\s*hang|ship|khuyen\s*mai|voucher|ma\s*giam\s*gia|seo|ban\s*le|da\s*kenh|cua\s*hang|chi\s*nhanh|kho\s*hang|san\s*nhieu\s*nha\s*ban|marketplace)\b/.test(
      normalizedMessage
    );
  const mentionsProductLine =
    normalizedMessage.length <= 80 &&
    /\b(quan\s*ao|thoi\s*trang|my\s*pham|do\s*gia\s*dung|noi\s*that|thuc\s*pham|do\s*an|nha\s*bep|dien\s*thoai|phu\s*kien|me\s*va\s*be|sach|hoa|cay\s*canh)\b/.test(
      normalizedMessage
    );

  return !asksForExamples && !asksForPricing && (mentionsCommerceModule || mentionsProductLine);
}

function isProjectInspiredConsultationInquiry(normalizedMessage: string): boolean {
  const wantsConsultation = /\b(tu\s*van|muon|can|lam|thiet\s*ke|xay\s*dung|phat\s*trien|web|website|app|mobile|phan\s*mem|he\s*thong)\b/.test(normalizedMessage);
  const referencesSpecificTemplate =
    /\b(giong|kieu|tuong\s*tu|nhu\s*the\s*nay|nhu\s*vay|y\s*nhu|theo\s*mau|mau\s*nay|link|https?|www|abitmes|upos|tendoo|pancake|shopify|haravan|tiki|shopee|shopi|lazada|tiktok\s*shop|tik\s*tok\s*shop)\b/.test(
      normalizedMessage
    );
  const asksForExamples = isProjectExamplesInquiry(normalizedMessage);
  const asksForPricing = isPricingOrMoneyInquiry(normalizedMessage);

  return wantsConsultation && referencesSpecificTemplate && !asksForExamples && !asksForPricing;
}

function isProductAttributeInquiry(normalizedMessage: string): boolean {
  return (
    /\b(san\s*pham|danh\s*muc|bo\s*loc|tim\s*kiem|loc)\b/.test(normalizedMessage) &&
    /\b(size|kich\s*co|mau\s*sac|loc\s*size|loc(?:\s+[a-z0-9]+){0,4}\s+mau)\b/.test(normalizedMessage)
  );
}

function isProjectExamplesInquiry(normalizedMessage: string): boolean {
  // 1. Exclude questions asking how to do something, technical details, adding features, admin, api, or pricing
  if (
    /\b(nhu\s*the\s*nao|the\s*nao|ra\s*sao|lam\s*sao|cach\s*nao|cach\s*thuc|huong\s*dan|tinh\s*nang|chuc\s*nang|them\s*chuc\s*nang|quan\s*ly\s*admin|trang\s*admin|admin|goi\s*api|api|tich\s*hop|hoat\s*dong\s*ra\s*sao)\b/.test(
      normalizedMessage
    )
  ) {
    return false;
  }

  if (isPricingOrMoneyInquiry(normalizedMessage)) {
    return false;
  }

  if (
    /\b(quy\s*trinh|cac\s*buoc|gio\s*lam\s*viec|bao\s*hanh|bao\s*tri|tu\s*van|can\s*tu\s*van|muon\s*tu\s*van)\b/.test(normalizedMessage) &&
    !/\b(mau|du\s*an|project|portfolio|case\s*study|tieu\s*bieu)\b/.test(normalizedMessage)
  ) {
    return false;
  }

  // 2. Direct follow-up asking for different/more examples: "cái khác đi", "khác đi", "dự án khác", "mẫu khác", "xem thêm"
  const isOtherOrMore =
    /\b(khac|them|doi)\b/.test(normalizedMessage) &&
    /\b(mau|du\s*an|project|website|web|link|vi\s*du|cai|tiem\s*nang|showroom|phong\s*kham)\b/.test(normalizedMessage);
  
  const isShortOther = /^(cai\s+)?khac(\s+di)?$/.test(normalizedMessage) || /^(xem\s+)?them(\s+nua)?$/.test(normalizedMessage);

  if (isOtherOrMore || isShortOther) {
    return true;
  }

  // 3. Clear request for project examples / demo links / portfolios
  const asksForProjectSamples =
    /\b(cho\s*xem\s*(mau|du\s*an|link|web|website)|co\s*(mau|du\s*an|link|demo)|xem\s*(mau|du\s*an|link|demo)|gui\s*(mau|du\s*an|link)|du\s*an\s*(mau|tieu\s*bieu|da\s*lam|thuc\s*te)|mau\s*(web|website|tham\s*khao)|case\s*study|portfolio|link\s*demo)\b/.test(
      normalizedMessage
    );

  if (asksForProjectSamples) {
    return true;
  }

  const mentionsWebOrProject =
    /\b(du\s*an|project|mau|portfolio|case\s*study|link\s*web|link\s*demo)\b/.test(normalizedMessage);
  const mentionsSpecificDomain =
    /\b(bat\s*dong\s*san|nha\s*dat|ban\s*nha|mua\s*nha|cho\s*thue\s*nha|can\s*ho|chung\s*cu|dat\s*nen|bds|o\s*to|xe|du\s*lich|giao\s*duc|e\s*learning|tuyen\s*dung|tai\s*chinh|khach\s*san|homestay|suc\s*khoe|nha\s*khoa|phong\s*kham|thuc\s*pham|thoi\s*trang|dien\s*may|noi\s*that|booking|ban\s*hang|f\s*b|logistics|xay\s*dung|media|studio|chup\s*anh|doanh\s*nghiep|luat|luat\s*su|phap\s*luat|pet|thu\s*cung)\b/.test(
      normalizedMessage
    );
  const asksAvailability = /\b(co|cho|xem|gui|xin)\b/.test(normalizedMessage);

  if (mentionsWebOrProject && mentionsSpecificDomain && asksAvailability) {
    return true;
  }

  if (isProductAttributeInquiry(normalizedMessage)) {
    return false;
  }

  // Explicit keywords (exclude color queries like "màu gì", "màu sắc", "màu nền")
  if (
    /\b(project|portfolio|case\s*study|tieu\s*bieu)\b/.test(normalizedMessage) ||
    (/\bmau\b/.test(normalizedMessage) && !/\bmau\s*(gi|sac|chu|nen|da|mat|toc)\b/.test(normalizedMessage) && /\b(xem|cho|gui|co|web|du\s*an)\b/.test(normalizedMessage))
  ) {
    return true;
  }

  // Short follow-up asking for website examples: "có web không", "cho xem web đi"
  if (/\b(cho\s*xem\s*(web|website)|co\s*(web|website|link|du\s*an|mau)\s*(khong|ko)|co\s*link\s*(khong|ko))\b/.test(normalizedMessage)) {
    return true;
  }

  return false;
}

// Helper for similarity calculation
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (!vecA || !vecB || vecA.length !== vecB.length) return 0;
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

const INTENT_TEMPLATES: Record<string, string[]> = {
  pricing_handoff: [
    'báo giá dịch vụ phần mềm thiết kế website',
    'chi phí xây dựng hệ thống crm erp app di động là bao nhiêu',
    'giá làm trang web bán hàng e-commerce',
    'hết bao nhiêu tiền thiết kế app',
    'bảng giá chi tiết dịch vụ viết app',
    'kinh phí triển khai dự án',
    'tốn bao nhiêu ngân sách làm web',
    'chi phí thiết kế ui ux và bảo trì',
  ],
  identity: [
    'bạn là ai thế',
    'trợ lý ảo tên gì',
    'ai đang nói chuyện thế',
    'who are you',
    'bạn tên gì',
    'giới thiệu về bản thân bạn',
  ],
  company_intro: [
    'giới thiệu về dudi software',
    'dudi software là công ty gì',
    'thông tin về công ty dudi',
    'nói qua về dudi software',
    'dudi làm về lĩnh vực gì',
    'sứ mệnh và tầm nhìn dudi software',
  ],
  contact_info: [
    'thông tin liên hệ',
    'số điện thoại hotline',
    'email liên lạc công ty dudi',
    'địa chỉ văn phòng ở đâu',
    'trụ sở dudi software',
    'kênh tư vấn và giờ làm việc',
  ],
  service_overview: [
    'dudi có những dịch vụ gì',
    'bên bạn cung cấp giải pháp gì',
    'các dịch vụ chính của công ty',
    'tư vấn dịch vụ cho tôi',
    'gồm những nhóm dịch vụ nào',
  ],
  project_examples: [
    'cho xem dự án mẫu',
    'các dự án tiêu biểu đã làm',
    'website thực tế đã triển khai',
    'portfolio hoặc case study',
    'gửi link demo website',
    'có dự án ô tô du lịch bất động sản nào không',
    'cho tham khảo mẫu website bán hàng',
  ],
  business_domains: [
    'công ty làm cho những ngành nào',
    'lĩnh vực hoạt động chính',
    'các ngành nghề dudi hỗ trợ',
    'làm những ngành hàng nào',
  ],
};

let cachedIntentEmbeddings: Record<string, number[][]> | null = null;

async function getTemplateEmbeddings(): Promise<Record<string, number[][]>> {
  if (cachedIntentEmbeddings) {
    return cachedIntentEmbeddings;
  }

  const cacheFile = path.join(process.cwd(), 'src/lib/ai/intent-embeddings-cache.json');
  let diskCache: Record<string, number[][]> = {};
  if (fs.existsSync(cacheFile)) {
    try {
      diskCache = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
    } catch (err) {
      console.warn('Failed to parse intent embeddings cache file:', err);
    }
  }

  const cached: Record<string, number[][]> = {};
  let cacheUpdated = false;

  for (const [intent, phrases] of Object.entries(INTENT_TEMPLATES)) {
    cached[intent] = [];
    const diskPhrasesVecs = diskCache[intent] || [];
    for (let i = 0; i < phrases.length; i++) {
      const phrase = phrases[i];
      if (diskPhrasesVecs[i] && diskPhrasesVecs[i].length > 0) {
        cached[intent].push(diskPhrasesVecs[i]);
      } else {
        try {
          await new Promise(resolve => setTimeout(resolve, 100)); // slight delay to prevent 429
          const vec = await generateEmbedding(phrase);
          cached[intent].push(vec);
          cacheUpdated = true;
        } catch (err) {
          console.error(`Failed to embed template phrase "${phrase}":`, err);
        }
      }
    }
  }

  if (cacheUpdated) {
    try {
      fs.writeFileSync(cacheFile, JSON.stringify(cached, null, 2), 'utf8');
    } catch (err) {
      console.warn('Failed to write intent embeddings cache file:', err);
    }
  }

  cachedIntentEmbeddings = cached;
  return cached;
}

export async function classifyChatIntent(
  message: string,
  context?: ConversationIntentContext,
  queryVector?: number[]
): Promise<ClassifiedChatIntent> {
  const normalizedMessage = normalizeIntentText(message);
  const phone = extractCustomerPhone(message);

  const cleanSelectText = normalizedMessage.replace(/[,.]/g, '').trim();

  // Match single-keyword selection (e.g. "landing page", "crm erp")
  const isSingleKeywordSelect =
    /^(web|website|web\s+site)?\s*(landing\s*page|doanh\s*nghiep|gioi\s*thieu\s*thuong\s*hieu|thuong\s*hieu|ban\s*hang|e\s*commerce|ecommerce|thuong\s*mai\s*dien\s*tu|mobile\s*app|app\s*mobile|ios|android|crm|erp|booking|chatbot|ai|rag|ui\s*ux|cloud|devops)$/i.test(cleanSelectText) ||
    /^(tu\s*van\s+)(web|website|web\s+site)?\s*(landing\s*page|doanh\s*nghiep|gioi\s*thieu\s*thuong\s*hieu|thuong\s*hieu|ban\s*hang|e\s*commerce|ecommerce|thuong\s*mai\s*dien\s*tu|mobile\s*app|app\s*mobile|ios|android|crm|erp|booking|chatbot|ai|rag|ui\s*ux|cloud|devops)$/i.test(cleanSelectText);

  // Match when user copies a full group label verbatim from the 7-group overview list
  // e.g. "Website doanh nghiệp, landing page, website giới thiệu thương hiệu."
  const isGroupLabelSelect =
    /\b(website\s*doanh\s*nghiep|landing\s*page|website\s*gioi\s*thieu|website\s*ban\s*hang|ban\s*hang\s*e\s*commerce|mobile\s*app|phan\s*mem\s*quan\s*ly|crm\s*erp|ui\s*ux\s*design|ai\s*chatbot|rag|cloud\s*devops|bao\s*tri)\b/i.test(cleanSelectText) &&
    cleanSelectText.length <= 120 &&
    !/\b(du\s*an|project|mau|portfolio|xem|co\s*web|link|vi\s*du|bao\s*nhieu|chi\s*phi|gia)\b/.test(cleanSelectText) &&
    !/\b(giong|kieu|tuong\s*tu|nhu\s*(the|vay|nay)|y\s*nhu|theo\s*mau|shopify|haravan|pancake|abitmes|tendoo|upos|tiki|shopee|shopi|lazada|tiktok\s*shop|tik\s*tok\s*shop)\b/.test(cleanSelectText);

  const isDirectServiceSelect = isSingleKeywordSelect || isGroupLabelSelect;

  if (isDirectServiceSelect && !/\b(du\s*an|project|mau|portfolio|xem|co\s*web|link|vi\s*du)\b/.test(cleanSelectText)) {
    return {
      type: 'service_consultation',
      confidence: 'high',
      reason: 'Customer directly selected a service category for consultation.',
    };
  }

  if (phone && (isPricingConversation(context) || /\b(sdt|so\s*dien\s*thoai|bao\s*gia|gia|chi\s*phi|lien\s*he)\b/.test(normalizedMessage) || normalizedMessage.length <= 30)) {
    return {
      type: 'pricing_phone_received',
      confidence: 'high',
      phone,
      reason: 'Customer provided a phone number for consultation or pricing.',
    };
  }

  if (/\b(gio\s*lam\s*viec|thoi\s*gian\s*lam\s*viec|khung\s*gio|mo\s*cua)\b/.test(normalizedMessage)) {
    return {
      type: 'service_consultation',
      confidence: 'high',
      reason: 'Customer asked about company work hours.',
    };
  }

  if (/\b(bao\s*nhieu\s*du\s*an|may\s*nam\s*kinh\s*nghiem|kinh\s*nghiem|nang\s*luc)\b/.test(normalizedMessage)) {
    return {
      type: 'service_consultation',
      confidence: 'high',
      reason: 'Customer asked about company stats and experience.',
    };
  }

  if (/\b(quy\s*trinh|cac\s*buoc|bao\s*hanh|bao\s*tri)\b/.test(normalizedMessage)) {
    return {
      type: 'service_consultation',
      confidence: 'high',
      reason: 'Customer asked about process or warranty policy.',
    };
  }

  // 3. Fallbacks / Rule-based checks for other intents
  if (isServiceOverviewInquiry(normalizedMessage, context)) {
    return {
      type: 'service_overview',
      confidence: 'high',
      reason: 'Customer asked what services DUDI provides or requested consultation.',
    };
  }

  if (isBusinessDomainsInquiry(message)) {
    return {
      type: 'business_domains',
      confidence: 'high',
      reason: 'Customer asked about industries, domains, or product categories.',
    };
  }

  if (isCompanyIntroInquiry(normalizedMessage)) {
    return {
      type: 'company_intro',
      confidence: 'high',
      reason: 'Customer asked what DUDI Software is or what DUDI provides.',
    };
  }

  if (isIdentityInquiry(normalizedMessage)) {
    return {
      type: 'identity',
      confidence: 'high',
      reason: 'Customer asked who the assistant is.',
    };
  }

  if (isContactInfoInquiry(normalizedMessage)) {
    return {
      type: 'contact_info',
      confidence: 'high',
      reason: 'Customer asked for contact information.',
    };
  }

  if (isPricingOrMoneyInquiry(message)) {
    return {
      type: 'pricing_handoff',
      confidence: 'high',
      phone: phone ?? undefined,
      reason: 'Customer asked about price, cost, fee, quote, payment, or money.',
    };
  }

  if (isProductAttributeInquiry(normalizedMessage)) {
    return {
      type: 'service_consultation',
      confidence: 'high',
      reason: 'Customer asked about product catalog attributes, filters, or search within an ecommerce website.',
    };
  }

  if (isProjectInspiredConsultationInquiry(normalizedMessage)) {
    return {
      type: 'project_inspired_consultation',
      confidence: 'high',
      reason: 'Customer wants consultation based on a specific project or reference example.',
    };
  }

  if (isProjectExamplesInquiry(normalizedMessage) && !isDirectServiceSelect) {
    return {
      type: 'project_examples',
      confidence: 'medium',
      reason: 'Customer asked for project examples or portfolio references.',
    };
  }

  if (
    isServiceConsultationInquiry(normalizedMessage) ||
    isServiceConsultationFollowUp(normalizedMessage, context) ||
    isStandaloneCommerceConsultation(normalizedMessage)
  ) {
    return {
      type: 'service_consultation',
      confidence: 'high',
      reason: 'Customer described a concrete service need and should be guided before project examples.',
    };
  }

  // If there's an ongoing consultation context in recent messages, treat short follow-ups as service_consultation
  if (context?.recentMessages && normalizedMessage.length <= 60) {
    const lastAssistantMsg = [...(context.recentMessages)].reverse().find(m => m.role === 'ASSISTANT')?.content || '';
    const hasOngoingConsultation = /\b(app|mobile|crm|erp|booking|phan\s*mem|landing\s*page|doanh\s*nghiep|ban\s*hang|e.commerce|chatbot|rag|ui\s*ux|cloud|devops|bat\s*dong\s*san|nha\s*dat|o\s*to|du\s*lich|thoi\s*trang|thuc\s*pham|giao\s*duc|xay\s*dung|logistics|nha\s*khoa|thi\s*truong|luat|tuyen\s*dung|pet|nhom|nganh|linh\s*vuc)\b/i.test(lastAssistantMsg);
    const isShortAffirmativeOrFollow = /^(ok|okay|duoc|oke|vang|da|co|muon|can|u|uhm|uh|ừ|u\s*the\s*nao|duoc\s*(do|chu)?|được\s*(đó|chứ)?|yes|yep|the\s*di|thế\s*đi|lam\s*di|làm\s*đi|vay\s*di|vậy\s*đi|ban\s*hang|quan\s*ly|noi\s*bo|booking|dat\s*lich|cham\s*soc|khach\s*hang|bao\s*cao|tiep|tiep\s*tuc|theo|them|them\s*nua|thu\s*nhat|hai|ba|bon|nam)$/i.test(normalizedMessage.replace(/[,.]/g, '').trim());
    if (hasOngoingConsultation && (isShortAffirmativeOrFollow || isServiceOverviewInquiry(normalizedMessage))) {
      return {
        type: 'service_consultation',
        confidence: 'high',
        reason: 'Short follow-up in an ongoing consultation context — keep user in current branch.',
      };
    }
  }


  if (isProjectExamplesInquiry(normalizedMessage)) {
    return {
      type: 'project_examples',
      confidence: 'medium',
      reason: 'Customer asked for project examples or portfolio references.',
    };
  }

  // 4. Semantic router fallback (using cosine similarity of queryVector)
  const vec = queryVector || (await generateEmbedding(message));
  const templates = await getTemplateEmbeddings();

  let bestIntent: string | null = null;
  let bestScore = 0;

  for (const [intentType, vectors] of Object.entries(templates)) {
    for (const tempVec of vectors) {
      const score = cosineSimilarity(vec, tempVec);
      if (score > bestScore) {
        bestScore = score;
        bestIntent = intentType;
      }
    }
  }

  // Threshold for semantic routing
  const SEMANTIC_THRESHOLD = 0.70;

  if (bestIntent && bestScore >= SEMANTIC_THRESHOLD) {
    if (bestIntent === 'identity') {
      const asksForServices =
        /\bdich\s*vu|giai\s*phap|lam\s*duoc\s*gi|cung\s*cap\s*gi\b/.test(normalizedMessage) ||
        /\b(web|website|landing|app|mobile|crm|erp|booking|chatbot|ai|rag|ui\s*ux|cloud|devops|phan\s*mem|he\s*thong)\b/.test(normalizedMessage);
      if (asksForServices) {
        bestIntent = 'service_consultation';
      }
    }

    if (bestIntent === 'project_examples') {
      const isHowToOrFeature =
        /\b(nhu\s*the\s*nao|the\s*nao|ra\s*sao|lam\s*sao|cach|huong\s*dan|tinh\s*nang|chuc\s*nang|them|admin|api|chi\s*phi|gia)\b/.test(
          normalizedMessage
        );
      if (isHowToOrFeature) {
        bestIntent = 'rag_answer';
      }
    }

    return {
      type: bestIntent as ChatIntentType,
      confidence: 'high',
      reason: `Semantic match with intent "${bestIntent}" (score: ${bestScore.toFixed(4)}).`,
    };
  }

  return {
    type: 'rag_answer',
    confidence: 'low',
    reason: 'No deterministic intent matched; use RAG/model answer.',
  };
}
