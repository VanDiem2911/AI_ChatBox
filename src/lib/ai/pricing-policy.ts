const pricingInquiryPatterns = [
  /\bbao\s*gia\b/,
  /\bbang\s*gia\b/,
  /\bdon\s*gia\b/,
  /\bmuc\s*gia\b/,
  /(?<!danh\s)\bgia\b(?:\s+[a-z0-9]+){0,8}\s+bao\s*nhieu\b/,
  /(?<!danh\s)\bgia\s*(tien|ca|bao\s*nhieu|web|website|app|mobile|phan\s*mem|thiet\s*ke|lap\s*trinh|goi|re|cao)\b/,
  /\b(co|xin|cho|gui|nhan|can)\s*(toi\s*)?(gia|bao\s*gia)\b/,
  /\bbao\s*nhieu\s*(tien|vnd|dong|trieu|nghin|k)\b/,
  /\b(mat|ton)\s*bao\s*nhieu\b/,
  /\bchi\s*phi\b/,
  /\bkinh\s*phi\b/,
  /\bngan\s*sach\b/,
  /\bphi\b/,
  /\btien\s*(bac|dich\s*vu|thiet\s*ke|lap\s*trinh|bao\s*tri|du\s*an)?\b/,
  /\b(thanh\s*toan|dat\s*coc|tra\s*gop|hoa\s*don)\b/,
  /\b(price|pricing|quote|quotation|cost|budget|payment|invoice)\b/,
];

const currencyPattern = /([$₫€])|(\d[\d.,]*\s*(vnd|vnđ|đ|dong|trieu|nghin|k)\b)/i;

const directMoneyTokens = new Set([
  'tien',
  'phi',
  'cost',
  'price',
  'pricing',
  'quote',
  'quotation',
  'budget',
  'payment',
  'invoice',
]);

const phonePattern = /(?:\+?84|0)(?:[\s.-]*\d){8,10}\b/;

function normalizeForPolicy(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}$₫€]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function summarizeRequestedService(normalizedMessage: string): string {
  if (/\bwebsite\s*ban\s*hang\b|\bweb\s*ban\s*hang\b|\be\s*commerce\b|\bgio\s*hang\b|\bthanh\s*toan\s*online\b/.test(normalizedMessage)) {
    return 'website bán hàng';
  }

  if (/\bwebsite\b|\bweb\b|\blanding\s*page\b/.test(normalizedMessage)) {
    return 'website';
  }

  if (/\bapp\b|\bmobile\b|\bios\b|\bandroid\b/.test(normalizedMessage)) {
    return 'mobile app';
  }

  if (/\bchatbot\b|\bai\b|\brag\b/.test(normalizedMessage)) {
    return 'giải pháp AI/chatbot';
  }

  if (/\bphan\s*mem\b|\berp\b|\bcrm\b|\bhe\s*thong\b/.test(normalizedMessage)) {
    return 'phần mềm/hệ thống';
  }

  if (/\bbao\s*tri\b|\bvan\s*hanh\b|\bnang\s*cap\b/.test(normalizedMessage)) {
    return 'bảo trì hoặc nâng cấp hệ thống';
  }

  return 'dịch vụ DUDI Software';
}

function truncateForSummary(message: string): string {
  const compactMessage = message.replace(/\s+/g, ' ').trim();
  return compactMessage.length > 180 ? `${compactMessage.slice(0, 177)}...` : compactMessage;
}

function hasDirectPricingMention(normalizedMessage: string): boolean {
  const tokens = normalizedMessage.split(' ').filter(Boolean);

  return tokens.some((token, index) => {
    if (directMoneyTokens.has(token)) {
      return true;
    }

    if (token !== 'gia') {
      return false;
    }

    const previousToken = tokens[index - 1];
    const nextToken = tokens[index + 1];
    const lookahead = tokens.slice(index + 1, index + 10).join(' ');

    const isNonPriceWord =
      previousToken === 'danh' ||
      previousToken === 'giam' ||
      previousToken === 'tham' ||
      previousToken === 'an' ||
      nextToken === 'tri' ||
      nextToken === 'dung' ||
      nextToken === 'dinh' ||
      nextToken === 'cong' ||
      nextToken === 'tang';

    if (isNonPriceWord) {
      return false;
    }

    const hasPricingContext =
      ['bao', 'xin', 'cho', 'gui', 'hoi', 'can', 'muon', 'muc', 'don', 'bang', 'tam'].includes(previousToken || '') ||
      /^(tien|ca|web|website|app|mobile|phan|thiet|lap|goi|re|cao|khoang|tam)$/.test(nextToken || '') ||
      /\bbao\s*nhieu\b/.test(lookahead) ||
      /\bnhieu\s*tien\b/.test(lookahead);

    return hasPricingContext;
  });
}

function isPaymentFeatureQuestion(normalizedMessage: string): boolean {
  const asksPaymentFeature =
    /\b(thanh\s*toan\s*online|payment\s*online)\b/.test(normalizedMessage) ||
    /\b(co|ho\s*tro|tich\s*hop|can)\b(?:\s+[a-z0-9]+){0,5}\s+\b(thanh\s*toan\s*online|payment)\b/.test(normalizedMessage) ||
    /\b(thanh\s*toan\s*online|payment)\b(?:\s+[a-z0-9]+){0,5}\s+\b(khong|duoc\s*khong|duoc\s*ko)\b/.test(normalizedMessage);

  const asksMoney =
    /\b(gia|bao\s*gia|bang\s*gia|don\s*gia|chi\s*phi|phi|tien|bao\s*nhieu|dat\s*coc|tra\s*gop|hoa\s*don|cost|price|pricing|quote|budget|invoice)\b/.test(
      normalizedMessage
    );

  return asksPaymentFeature && !asksMoney;
}

function isRejectingPricingInterpretation(normalizedMessage: string): boolean {
  return (
    /\b(khong|co)\s*(hoi|noi|bao|can|muon)\b.{0,40}\b(gia|bao\s*gia|chi\s*phi)\b/.test(normalizedMessage) ||
    /\b(gia|bao\s*gia|chi\s*phi)\b.{0,30}\b(dau|ma|khong|ko)\b/.test(normalizedMessage) ||
    /\b(t\s*)?noi\s*cai\s*nay\b/.test(normalizedMessage)
  );
}

export function extractCustomerPhone(message: string): string | null {
  const match = message.match(phonePattern);

  if (!match) {
    return null;
  }

  return match[0].replace(/[^\d+]/g, '');
}

export function isPricingOrMoneyInquiry(message: string): boolean {
  const normalizedMessage = normalizeForPolicy(message);

  if (!normalizedMessage) {
    return false;
  }

  // Exclude market trivia (gold price, stock price, crypto price, exchange rates, fuel price)
  if (/\bgia\s*(vang|chung\s*khoan|coin|do\s*la|usd|ngoai\s*te|xang|dau|dien|nuoc)\b/.test(normalizedMessage)) {
    return false;
  }

  if (isPaymentFeatureQuestion(normalizedMessage)) {
    return false;
  }

  if (isRejectingPricingInterpretation(normalizedMessage)) {
    return false;
  }

  return (
    currencyPattern.test(message) ||
    hasDirectPricingMention(normalizedMessage) ||
    pricingInquiryPatterns.some((pattern) => pattern.test(normalizedMessage))
  );
}

export function getPricingHandoffResponse(): string {
  return [
    'Dạ, DUDI Software xin gửi anh/chị bảng giá dịch vụ tham khảo:',
    '- **Landing Page**: Gói Cơ bản từ **1.000.000đ**, Gói Tiêu chuẩn **4.000.000đ**.',
    '- **Website Giới thiệu Doanh nghiệp**: Gói Cơ bản từ **3.000.000đ**, Gói Tiêu chuẩn **7.000.000đ**.',
    '- **Website Bán hàng/E-commerce**: Gói Cơ bản từ **5.000.000đ**, Gói Tiêu chuẩn **10.000.000đ**.',
    '- **Cập nhật & Chăm sóc Website**: Từ **500.000đ/tháng**.',
    '',
    'Mức giá trên là giá tham khảo tiêu chuẩn trước khảo sát. Giá chính xác sẽ phụ thuộc vào yêu cầu tính năng cụ thể.',
    'Anh/chị vui lòng để lại số điện thoại hoặc liên hệ Hotline **(+84) 909 163 821** để nhân viên DUDI Software tư vấn và báo giá chính thức theo nhu cầu ạ.',
  ].join('\n');
}

export function getPhoneReceivedHandoffResponse(phone: string): string {
  return [
    `Cảm ơn anh/chị, DUDI Software đã ghi nhận số điện thoại ${phone}.`,
    'Nhân viên tư vấn sẽ liên hệ anh/chị trong thời gian sớm nhất để trao đổi nhu cầu và báo giá phù hợp.',
    '',
    'Trong lúc chờ phản hồi, anh/chị có thể tham khảo một số giải pháp tiêu biểu của DUDI Software:',
    '1. Website doanh nghiệp, landing page giới thiệu thương hiệu.',
    '2. Website bán hàng, thương mại điện tử, đặt hàng và thanh toán online.',
    '3. Ứng dụng mobile iOS/Android.',
    '4. Phần mềm quản lý doanh nghiệp, CRM/ERP, booking platform.',
    '5. AI chatbot/RAG hỗ trợ tư vấn và chăm sóc khách hàng.',
  ].join('\n');
}

export function getPricingHandoffSummary(message: string): string {
  const normalizedMessage = normalizeForPolicy(message);
  const requestedService = summarizeRequestedService(normalizedMessage);
  const customerMessage = truncateForSummary(message);

  return [
    `Khách muốn báo giá ${requestedService}.`,
    `Nội dung khách hỏi: "${customerMessage}".`,
    'Cần nhân viên liên hệ để tư vấn chi tiết, xác nhận nhu cầu và báo giá phù hợp.',
  ].join(' ');
}
