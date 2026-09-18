const domainInquiryPatterns = [
  /\b(cac|nhung|co\s*nhung|lam\s*nhung|ho\s*tro)\s*(nganh|linh\s*vuc|mang)\b/,
  /\b(nganh|linh\s*vuc|mang)\s*(nao|gi|chinh)\b/,
  /\bnganh\s*nghe\s*(nao|gi|ho\s*tro|lam)\b/,
  /\bdanh\s*muc\s*(nganh|linh\s*vuc|dich\s*vu)\b/,
  /\bsan\s*pham\b.*\b(nao|gi|linh\s*vuc|nganh)\b/,
  /\bben\s*(ban|minh)\b.*\b(lam|co|cung\s*cap)\b.*\b(gi|nao)\b/,
  /\bwhat\s*(industries|domains|services|products)\b/,
];

function normalizeForDomainIntent(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function isBusinessDomainsInquiry(message: string): boolean {
  const normalizedMessage = normalizeForDomainIntent(message);

  if (!normalizedMessage) {
    return false;
  }

  return domainInquiryPatterns.some((pattern) => pattern.test(normalizedMessage));
}

export function getBusinessDomainsResponse(): string {
  return [
    'DUDI Software đang tư vấn và triển khai các nhóm giải pháp chính sau:',
    '',
    '1. Website doanh nghiệp, landing page, website giới thiệu thương hiệu.',
    '2. Website bán hàng, thương mại điện tử, bán hàng đa kênh.',
    '3. Phần mềm quản lý doanh nghiệp: CRM, ERP, quản lý bán hàng, booking platform.',
    '4. Ứng dụng mobile iOS/Android.',
    '5. AI chatbot, RAG chatbot, tự động hóa chăm sóc khách hàng.',
    '6. Cloud, DevOps, hạ tầng hệ thống và bảo trì vận hành.',
    '',
    'Ngoài nhóm giải pháp, DUDI cũng có kinh nghiệm theo nhiều ngành: ô tô, bất động sản, du lịch, giáo dục/e-learning, tuyển dụng, tài chính, khách sạn/homestay, sức khỏe, thực phẩm, thời trang, điện máy, sản xuất và công nghiệp.',
    '',
    'Anh/chị muốn xem mẫu ở ngành nào, cứ nhắn tên ngành; em sẽ gửi đúng nhóm dự án để tham khảo.',
  ].join('\n');
}
