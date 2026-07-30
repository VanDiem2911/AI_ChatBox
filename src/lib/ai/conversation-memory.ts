import { ChatIntentType } from './intent-router';

export interface BuildConversationMemoryParams {
  currentSummary?: string;
  userMessage: string;
  intentType?: ChatIntentType;
}

function normalizeMemoryText(input: string): string {
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

function appendUnique(items: string[], item: string) {
  if (!items.includes(item)) {
    items.push(item);
  }
}

function extractExistingItems(summary: string, label: string): string[] {
  const line = summary
    .split('\n')
    .find((item) => item.toLowerCase().startsWith(label.toLowerCase()));

  if (!line) {
    return [];
  }

  return line
    .replace(new RegExp(`^${label}\\s*`, 'i'), '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function truncateSummary(summary: string): string {
  return summary.length > 900 ? `${summary.slice(0, 897)}...` : summary;
}

export function buildConversationMemorySummary({
  currentSummary = '',
  userMessage,
  intentType,
}: BuildConversationMemoryParams): string {
  const normalizedMessage = normalizeMemoryText(userMessage);
  const serviceNeeds = extractExistingItems(currentSummary, 'Nhu cầu:');
  const details = extractExistingItems(currentSummary, 'Chi tiết:');
  const handoff = extractExistingItems(currentSummary, 'Trạng thái:');

  if (/\bwebsite\s*ban\s*hang\b|\bweb\s*ban\s*hang\b|\be\s*commerce\b|\bthuong\s*mai\s*dien\s*tu\b|\bban\s*hang\b|\becommerce\b|\bgio\s*hang\b|\bthanh\s*toan\s*online\b|\bdat\s*hang\b/.test(normalizedMessage)) {
    appendUnique(serviceNeeds, 'website bán hàng/e-commerce');
  } else if (/\bwebsite\b|\bweb\b|\blanding\s*page\b/.test(normalizedMessage)) {
    appendUnique(serviceNeeds, 'website/landing page');
  }

  if (/\babitmes|quan\s*ly\s*ban\s*hang|ban\s*hang\s*da\s*kenh|chat\s*da\s*kenh|don\s*hang|cham\s*soc\s*khach\s*hang\b/.test(normalizedMessage)) {
    appendUnique(serviceNeeds, 'hệ thống quản lý bán hàng đa kênh tương tự Abitmes');
    appendUnique(details, 'cần quản lý chat đa kênh, đơn hàng và chăm sóc khách hàng');
  }

  if (/\bapp\b|\bmobile\b|\bios\b|\bandroid\b/.test(normalizedMessage)) {
    appendUnique(serviceNeeds, 'mobile app iOS/Android');
  }

  if (/\bcrm\b|\berp\b|\bbooking\b|\bphan\s*mem\b|\bhe\s*thong\b/.test(normalizedMessage)) {
    appendUnique(serviceNeeds, 'phần mềm quản lý/CRM/ERP/booking platform');
  }

  if (/\bchatbot\b|\bai\b|\brag\b/.test(normalizedMessage)) {
    appendUnique(serviceNeeds, 'AI chatbot/RAG');
  }

  if (/\bgio\s*hang\b/.test(normalizedMessage)) appendUnique(details, 'cần giỏ hàng');
  if (/\bgiao\s*dien\b|\bui\s*ux\b/.test(normalizedMessage)) appendUnique(details, 'quan tâm giao diện bán hàng/UI');
  if (/\bthanh\s*toan\s*online\b|\bpayment\b/.test(normalizedMessage)) appendUnique(details, 'cần thanh toán online');
  if (/\bseo\b/.test(normalizedMessage)) appendUnique(details, 'quan tâm SEO');
  if (/\bda\s*kenh\b|\bomni\s*channel\b/.test(normalizedMessage)) appendUnique(details, 'bán hàng đa kênh');

  if (/\bdanh\s*muc\b|\bsan\s*pham\b|\bbo\s*loc\b|\btim\s*kiem\b/.test(normalizedMessage)) appendUnique(details, 'quan tâm danh mục/sản phẩm');
  if (/\bdat\s*hang\b|\bcheckout\b/.test(normalizedMessage)) appendUnique(details, 'cần giỏ hàng/đặt hàng');
  if (/\bquan\s*tri\s*don\s*hang\b|\bquan\s*ly\s*don\s*hang\b|\bdon\s*hang\b/.test(normalizedMessage)) appendUnique(details, 'cần quản trị đơn hàng');
  if (/\bvan\s*chuyen\b|\bgiao\s*hang\b|\bshipping\b/.test(normalizedMessage)) appendUnique(details, 'cần vận chuyển/giao hàng');
  if (/\bkhuyen\s*mai\b|\bvoucher\b|\bcoupon\b|\bma\s*giam\s*gia\b|\bsale\b/.test(normalizedMessage)) appendUnique(details, 'cần khuyến mãi/voucher');
  if (/\bquan\s*ao\b|\bthoi\s*trang\b/.test(normalizedMessage)) appendUnique(details, 'bán sản phẩm thời trang/quần áo');
  if (/\bmy\s*pham\b|\blam\s*dep\b/.test(normalizedMessage)) appendUnique(details, 'bán sản phẩm mỹ phẩm/làm đẹp');
  if (/\bdo\s*gia\s*dung\b|\bnha\s*bep\b/.test(normalizedMessage)) appendUnique(details, 'bán sản phẩm đồ gia dụng/nhà bếp');
  if (/\bthuc\s*pham\b|\bdo\s*an\b|\bf\s*b\b/.test(normalizedMessage)) appendUnique(details, 'bán sản phẩm thực phẩm/F&B');

  if (/\bban\s*le\b|\bcua\s*hang\b|\bshop\b/.test(normalizedMessage)) appendUnique(details, 'mô hình cửa hàng bán lẻ');
  if (/\bban\s*hang\s*da\s*kenh\b|\bda\s*kenh\b|\bfacebook\b|\bzalo\b|\bshopee\b|\blazada\b|\btiktok\s*shop\b/.test(normalizedMessage)) appendUnique(details, 'mô hình bán hàng đa kênh');
  if (/\bnhieu\s*chi\s*nhanh\b|\bchi\s*nhanh\b|\bkho\s*hang\b|\bnhieu\s*kho\b|\bton\s*kho\b/.test(normalizedMessage)) appendUnique(details, 'cần quản lý chi nhánh/kho hàng');
  if (/\bsan\s*nhieu\s*nha\s*ban\b|\bmarketplace\b|\bnhieu\s*shop\b|\bnha\s*ban\b|\bvendor\b/.test(normalizedMessage)) appendUnique(details, 'mô hình sàn nhiều nhà bán');

  if (intentType === 'pricing_handoff') {
    appendUnique(handoff, 'đã hỏi báo giá, cần nhân viên liên hệ');
  }

  if (intentType === 'pricing_phone_received') {
    appendUnique(handoff, 'đã để lại số điện thoại');
  }

  const lines = [
    serviceNeeds.length ? `Nhu cầu: ${serviceNeeds.join(', ')}` : '',
    details.length ? `Chi tiết: ${details.join(', ')}` : '',
    handoff.length ? `Trạng thái: ${handoff.join(', ')}` : '',
  ].filter(Boolean);

  const nextSummary = lines.length ? lines.join('\n') : currentSummary.trim();
  return truncateSummary(nextSummary);
}

export function getContextualMemoryResponse(message: string, memorySummary?: string): string | null {
  if (!memorySummary?.trim()) {
    return null;
  }

  const normalizedMessage = normalizeMemoryText(message);
  const normalizedSummary = normalizeMemoryText(memorySummary);
  const hasContextReference =
    /\bcai\s*(do|nay)\b|\bwebsite\s*nay\b|\bnhu\s*cau\s*(tren|nay)\b|\bphan\s*do\b/.test(normalizedMessage);

  if (!hasContextReference) {
    return null;
  }

  const isEcommerceNeed = normalizedSummary.includes('website ban hang') || normalizedSummary.includes('e commerce');

  if (isEcommerceNeed && /\bthanh\s*toan\s*online\b|\bpayment\b/.test(normalizedMessage)) {
    return [
      'Dạ có. Với nhu cầu website bán hàng/e-commerce của anh/chị, DUDI Software có thể tư vấn phần đặt hàng và thanh toán online.',
      'Tùy nhu cầu thực tế, hệ thống có thể tích hợp các phương thức như chuyển khoản, cổng thanh toán hoặc quy trình xác nhận đơn hàng.',
      '',
      'Nếu anh/chị cần báo giá phần này, vui lòng để lại số điện thoại để nhân viên tư vấn chi tiết ạ.',
    ].join('\n');
  }

  if (isEcommerceNeed && /\bgio\s*hang\b|\bdat\s*hang\b/.test(normalizedMessage)) {
    return [
      'Dạ có. Với website bán hàng/e-commerce, DUDI Software có thể tư vấn các phần như danh mục sản phẩm, giỏ hàng, đặt hàng và quản trị đơn hàng.',
      'Anh/chị muốn website bán hàng đơn giản hay cần thêm bán hàng đa kênh, quản lý kho và khuyến mãi ạ?',
    ].join('\n');
  }

  return null;
}
