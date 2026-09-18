import fs from 'fs';
import path from 'path';
import { generateEmbedding } from './embeddings';
import { isUnsupportedDomainInquiry, getUnsupportedDomainResponse } from './off-topic';
import { extractCustomerPhone, getPhoneReceivedHandoffResponse, isPricingOrMoneyInquiry } from './pricing-policy';

export function getContactInfoResponse(): string {
  return [
    'Thông tin liên hệ DUDI Software:',
    '- Hotline: (+84) 909 163 821',
    '- Email: contact@dudisoftware.com',
    '- Website: https://www.dudisoftware.com/',
    '- Địa chỉ 1: 232 Đường Nguyễn Thị Minh Khai, Phường Xuân Hòa, TP. Hồ Chí Minh',
    '- Địa chỉ 2: 49/2 Đường 14, Phường Thủ Đức, TP. Hồ Chí Minh',
    '',
    'Anh/chị cần tư vấn dịch vụ nào, em có thể hỗ trợ cung cấp thêm thông tin phù hợp ạ.',
  ].join('\n');
}

export function getIdentityResponse(): string {
  return [
    'Xin chào! Tôi là DU - Trợ lý AI tư vấn khách hàng chuyên nghiệp của DUDI Software.',
    '',
    'Tôi có thể hỗ trợ anh/chị tìm hiểu các dịch vụ (Landing Page, Website, Mobile App, CRM/ERP, AI Chatbot...), cung cấp bảng giá tham khảo chi tiết theo tài liệu của công ty và giải đáp mọi thắc mắc kỹ thuật.',
    '',
    'Anh/chị đang cần tư vấn giải pháp hoặc tham khảo chi phí cho dự án nào ạ?',
  ].join('\n');
}

export function getCompanyIntroResponse(): string {
  return [
    'DUDI Software là công ty phát triển phần mềm và giải pháp số cho doanh nghiệp.',
    '',
    'Các nhóm DUDI thường tư vấn gồm: website doanh nghiệp, website bán hàng/e-commerce, mobile app, phần mềm quản lý CRM/ERP/booking, UI/UX, AI chatbot/RAG, cloud/devops và bảo trì vận hành hệ thống.',
    '',
    'Nếu anh/chị đang tìm hiểu để làm dự án mới, em có thể đi theo 2 hướng: giới thiệu các nhóm dịch vụ trước, hoặc hỏi nhanh nhu cầu để tư vấn đúng lĩnh vực hơn.',
  ].join('\n');
}

export function getWorkHoursResponse(): string {
  return [
    '⏰ Thông tin thời gian làm việc & Kênh tư vấn DUDI Software:',
    '- 📅 Thời gian làm việc: Thứ Hai đến Thứ Sáu, từ 9:00 AM - 6:00 PM.',
    '- 📞 Hotline hỗ trợ khẩn cấp: (+84) 909 163 821 (Hỗ trợ 24/7).',
    '- ✉️ Email tiếp nhận: contact@dudisoftware.com',
    '- 💬 Tư vấn nhanh: Trực tiếp qua Chatbot AI 24/7 hoặc quét mã QR Zalo trên website chính thức.',
  ].join('\n');
}

export function getExperienceResponse(): string {
  return [
    '📊 Thống kê Năng lực & Kinh nghiệm của DUDI Software:',
    '- 🏆 150+ Dự án đã hoàn thành xuất sắc.',
    '- 🤝 50+ Khách hàng doanh nghiệp tin tưởng và hài lòng.',
    '- 👨‍💻 30+ Kỹ sư & Chuyên gia công nghệ giàu kinh nghiệm.',
    '- ⏳ 5+ Năm kinh nghiệm thực chiến phát triển giải pháp phần mềm.',
    '',
    'Anh/chị cần tham khảo hồ sơ năng lực hoặc các dự án trong lĩnh vực nào ạ?',
  ].join('\n');
}

export function getProcessResponse(): string {
  return [
    '⚙️ Quy trình làm việc 6 bước chuẩn tại DUDI Software:',
    '1. 📞 Tiếp nhận yêu cầu & Tư vấn giải pháp ban đầu.',
    '2. 📋 Phân tích chi tiết nhu cầu, khảo sát & Lập báo giá/Hợp đồng.',
    '3. 🎨 Thiết kế giao diện UI/UX chuẩn trải nghiệm người dùng.',
    '4. 💻 Lập trình & Triển khai phát triển hệ thống (Web/App/Software).',
    '5. 🧪 Kiểm thử chất lượng (QA/QC), bàn giao & Đào tạo sử dụng.',
    '6. 🛠️ Bảo trì, bảo hành & Hỗ trợ kỹ thuật 24/7 sau bàn giao.',
  ].join('\n');
}

export function getWarrantyResponse(): string {
  return [
    '🛡️ Chính sách Bảo hành & Hỗ trợ Kỹ thuật tại DUDI Software:',
    '- 🛠️ Bảo hành & bảo trì miễn phí hệ thống, khắc phục sự cố kỹ thuật 24/7.',
    '- 🔄 Đội ngũ kỹ thuật viên bảo trì hỗ trợ trực 24/7 cho các trường hợp khẩn cấp.',
    '- 📦 Miễn phí cập nhật các bản vá lỗi và tối ưu hiệu năng định kỳ.',
    '- 📖 Hướng dẫn đào tạo quản trị và bàn giao đầy đủ mã nguồn (Source code) cho doanh nghiệp.',
  ].join('\n');
}

export function getUiUxResponse(): string {
  return [
    '🎨 Dịch vụ Thiết kế UI/UX Chuyên nghiệp tại DUDI Software:',
    '- 🖼️ Thiết kế giao diện tinh tế, hiện đại, chuẩn nhận diện thương hiệu.',
    '- 📱 Tối ưu trải nghiệm người dùng (UX) trên mobile và desktop.',
    '- 🚀 Tăng tỷ lệ chuyển đổi (Conversion Rate) cho website bán hàng & ứng dụng số.',
    '- 📐 Đầy đủ Wireframe, Prototype tương tác và Design System trước khi lập trình.',
    '',
    'Anh/chị muốn thiết kế UI/UX cho website mới, app mobile hay làm mới giao diện hệ thống hiện tại ạ?',
  ].join('\n');
}

export function getCloudDevopsResponse(): string {
  return [
    '☁️ Dịch vụ Điện toán Đám mây & DevOps tại DUDI Software:',
    '- 🚀 Triển khai hạ tầng Cloud (AWS, Google Cloud, Docker, Microservices).',
    '- 🔒 Đảm bảo hệ thống vận hành ổn định, mở rộng linh hoạt và bảo mật cao.',
    '- ⚙️ Cấu hình CI/CD tự động hóa quy trình đóng gói và triển khai phần mềm.',
    '- 🛡️ Giám sát hệ thống (Monitoring) & bảo trì 24/7.',
    '',
    'Anh/chị đang cần tư vấn hạ tầng Cloud cho hệ thống mới hay nâng cấp hệ thống hiện tại ạ?',
  ].join('\n');
}

export function getServiceOverviewResponse(): string {
  return [
    'Được ạ. DUDI Software thường tư vấn theo 7 nhóm chính:',
    '1. Website doanh nghiệp, landing page, website giới thiệu thương hiệu.',
    '2. Website bán hàng/e-commerce, đặt hàng và thanh toán online.',
    '3. Mobile app iOS/Android.',
    '4. Phần mềm quản lý doanh nghiệp, CRM/ERP, booking platform.',
    '5. UI/UX design cho website, app và hệ thống số.',
    '6. AI chatbot/RAG, tự động hóa tư vấn và chăm sóc khách hàng.',
    '7. Cloud/devops, bảo trì, nâng cấp và vận hành hệ thống.',
    '',
    'Anh/chị đang quan tâm nhóm nào? Chỉ cần nhắn ngắn như “web bán hàng”, “CRM/ERP”, “app mobile” hoặc mô tả nhu cầu hiện tại là được ạ.',
  ].join('\n');
}

function normalizeServiceText(input: string): string {
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

interface MatcherItem {
  label: string;
  keywords: RegExp[];
  guidance: string;
}

const ECOMMERCE_MODULES: MatcherItem[] = [
  {
    label: 'giao diện bán hàng',
    keywords: [/\bgiao\s*dien\b/, /\bui\s*ux\b/, /\btrang\s*chu\b/, /\bbanner\b/, /\blanding\b/],
    guidance: 'Thiết kế trang chủ, danh mục, chi tiết sản phẩm, tìm kiếm/lọc, giỏ hàng, checkout, giao diện mobile và banner khuyến mãi để khách dễ xem sản phẩm và đặt hàng.',
  },
  {
    label: 'danh mục/sản phẩm',
    keywords: [/\bdanh\s*muc\b/, /\bsan\s*pham\b/, /\bbo\s*loc\b/, /\btim\s*kiem\b/, /\bsize\b/, /\bmau\s*sac\b/, /\bbien\s*the\b/],
    guidance: 'Tổ chức danh mục, thuộc tính sản phẩm, biến thể, tồn kho, hình ảnh, mô tả, bộ lọc và tìm kiếm để khách tìm đúng sản phẩm nhanh hơn.',
  },
  {
    label: 'giỏ hàng/đặt hàng',
    keywords: [/\bgio\s*hang\b/, /\bdat\s*hang\b/, /\bcheckout\b/, /\bmua\s*hang\b/, /\bxac\s*nhan\s*don\b/],
    guidance: 'Xây luồng thêm giỏ hàng, kiểm tra đơn, nhập thông tin nhận hàng, xác nhận đơn và thông báo trạng thái để giảm rớt đơn.',
  },
  {
    label: 'thanh toán online',
    keywords: [/\bthanh\s*toan\s*online\b/, /\bpayment\b/, /\bcong\s*thanh\s*toan\b/, /\bchuyen\s*khoan\b/, /\bcod\b/, /\bvi\s*dien\s*tu\b/],
    guidance: 'Tư vấn phương thức thanh toán phù hợp như chuyển khoản, COD, ví điện tử hoặc cổng thanh toán, kèm quy trình xác nhận thanh toán và đối soát.',
  },
  {
    label: 'quản trị đơn hàng',
    keywords: [/\bquan\s*tri\s*don\s*hang\b/, /\bquan\s*ly\s*don\s*hang\b/, /\bdon\s*hang\b/, /\btrang\s*thai\s*don\b/, /\bbao\s*cao\s*don\b/],
    guidance: 'Thiết kế màn hình quản trị đơn, trạng thái xử lý, phân công nhân viên, ghi chú nội bộ, lịch sử thao tác và xuất báo cáo đơn hàng.',
  },
  {
    label: 'vận chuyển',
    keywords: [/\bvan\s*chuyen\b/, /\bgiao\s*hang\b/, /\bship\b/, /\bshipping\b/, /\bdon\s*vi\s*van\s*chuyen\b/, /\bma\s*van\s*don\b/, /\btracking\b/],
    guidance: 'Tư vấn phí vận chuyển, khu vực giao hàng, tích hợp đơn vị vận chuyển, mã vận đơn, tracking và cập nhật trạng thái giao hàng cho khách.',
  },
  {
    label: 'khuyến mãi',
    keywords: [/\bkhuyen\s*mai\b/, /\bvoucher\b/, /\bcoupon\b/, /\bma\s*giam\s*gia\b/, /\bfreeship\b/, /\bsale\b/, /\bcombo\b/, /\buu\s*dai\b/],
    guidance: 'Xây module mã giảm giá, chương trình sale, combo, freeship, điều kiện áp dụng, thời gian chạy khuyến mãi và báo cáo hiệu quả.',
  },
  {
    label: 'SEO',
    keywords: [/\bseo\b/, /\bgoogle\b/, /\btu\s*khoa\b/, /\bmeta\b/, /\bschema\b/, /\btoc\s*do\s*tai\s*trang\b/],
    guidance: 'Tối ưu URL, meta title/description, schema, tốc độ tải trang, nội dung danh mục/sản phẩm và cấu trúc index để hỗ trợ tìm kiếm tự nhiên.',
  },
  {
    label: 'tích hợp CRM/ERP',
    keywords: [/\bcrm\b/, /\berp\b/, /\btich\s*hop\s*(crm|erp|api|ke\s*toan|phan\s*mem)\b/, /\bapi\b/, /\bphan\s*mem\s*ban\s*hang\b/, /\bke\s*toan\b/],
    guidance: 'Kết nối dữ liệu khách hàng, đơn hàng, kho, kế toán hoặc hệ thống nội bộ qua API để vận hành tập trung hơn.',
  },
];

const PRODUCT_LINES: MatcherItem[] = [
  { label: 'thời trang/quần áo', keywords: [/\bquan\s*ao\b/, /\bthoi\s*trang\b/, /\bgiay\s*dep\b/, /\bphu\s*kien\s*thoi\s*trang\b/], guidance: '' },
  { label: 'mỹ phẩm/làm đẹp', keywords: [/\bmy\s*pham\b/, /\blam\s*dep\b/, /\bspa\b/, /\bskincare\b/], guidance: '' },
  { label: 'đồ gia dụng/nhà bếp', keywords: [/\bdo\s*gia\s*dung\b/, /\bnha\s*bep\b/, /\bdien\s*may\b/], guidance: '' },
  { label: 'thực phẩm/F&B', keywords: [/\bthuc\s*pham\b/, /\bdo\s*an\b/, /\bf\s*b\b/, /\bnha\s*hang\b/, /\bdo\s*uong\b/], guidance: '' },
  { label: 'điện thoại/phụ kiện', keywords: [/\bdien\s*thoai\b/, /\bphu\s*kien\b/, /\blaptop\b/, /\bdien\s*tu\b/], guidance: '' },
  { label: 'nội thất', keywords: [/\bnoi\s*that\b/, /\btrang\s*tri\b/], guidance: '' },
  { label: 'mẹ và bé', keywords: [/\bme\s*va\s*be\b/, /\bdo\s*choi\b/, /\bbe\s*yeu\b/], guidance: '' },
  { label: 'hoa/cây cảnh', keywords: [/\bhoa\b/, /\bcay\s*canh\b/], guidance: '' },
];

const BUSINESS_MODELS: MatcherItem[] = [
  {
    label: 'cửa hàng bán lẻ',
    keywords: [/\bban\s*le\b/, /\bcua\s*hang\s*(don\s*gian|ban\s*le)?\b/, /\bshop\s*(don\s*gian)?\b/, /\bmot\s*cua\s*hang\b/],
    guidance: 'Tập trung trải nghiệm mua nhanh, danh mục rõ, trang chi tiết sản phẩm đủ thông tin, giỏ hàng/checkout ngắn, khuyến mãi cơ bản, phí vận chuyển minh bạch và quản trị đơn dễ dùng.',
  },
  {
    label: 'bán hàng đa kênh',
    keywords: [/\bban\s*hang\s*da\s*kenh\b/, /\bda\s*kenh\b/, /\bomni\s*channel\b/, /\bfacebook\b/, /\bzalo\b/, /\bshopee\b/, /\blazada\b/, /\btiktok\s*shop\b/],
    guidance: 'Cần gom sản phẩm, khách hàng và đơn từ nhiều kênh; theo dõi tồn kho, trạng thái vận chuyển, chăm sóc khách và doanh thu theo từng kênh.',
  },
  {
    label: 'nhiều chi nhánh/kho hàng',
    keywords: [/\bnhieu\s*chi\s*nhanh\b/, /\bchi\s*nhanh\b/, /\bkho\s*hang\b/, /\bnhieu\s*kho\b/, /\bton\s*kho\b/],
    guidance: 'Nên có tồn kho theo kho/chi nhánh, phân quyền nhân viên, điều chuyển hàng, chọn kho xử lý đơn, báo cáo từng chi nhánh và kết nối vận chuyển.',
  },
  {
    label: 'sàn nhiều nhà bán',
    keywords: [/\bsan\s*nhieu\s*nha\s*ban\b/, /\bmarketplace\b/, /\bnhieu\s*shop\b/, /\bnha\s*ban\b/, /\bvendor\b/],
    guidance: 'Cần tài khoản nhà bán, duyệt sản phẩm, hoa hồng, quản lý đơn theo từng shop, ví/đối soát, khiếu nại, vận chuyển và phân quyền quản trị.',
  },
];

function findMatches(items: MatcherItem[], normalizedText: string): MatcherItem[] {
  return items.filter((item) => item.keywords.some((keyword) => keyword.test(normalizedText)));
}

function isBroadEcommerceSelection(normalizedCurrent: string): boolean {
  return /\bwebsite\s*ban\s*hang\b|\bweb\s*ban\s*hang\b|\bthuong\s*mai\s*dien\s*tu\b|\be\s*commerce\b|\becommerce\b/.test(normalizedCurrent) ||
    /^(ban\s*hang|e\s*commerce|ecommerce|thuong\s*mai\s*dien\s*tu)$/i.test(normalizedCurrent.trim());
}

function getProductHint(normalizedCurrent: string, normalizedContext = ''): string {
  const matchedProduct = findMatches(PRODUCT_LINES, `${normalizedCurrent} ${normalizedContext}`)[0];
  return matchedProduct?.label || 'sản phẩm của anh/chị';
}

function getKnownProductHint(normalizedContext: string): string | null {
  return findMatches(PRODUCT_LINES, normalizedContext)[0]?.label || null;
}

function getKnownBusinessModel(normalizedContext: string): MatcherItem | null {
  return findMatches(BUSINESS_MODELS, normalizedContext)[0] || null;
}

function getContextPhrase(normalizedContext: string): string {
  const product = getKnownProductHint(normalizedContext);
  const model = getKnownBusinessModel(normalizedContext);
  const parts = [
    product ? `bán **${product}**` : '',
    model ? `theo mô hình **${model.label}**` : '',
  ].filter(Boolean);

  return parts.length ? ` cho website ${parts.join(', ')}` : ' cho website bán hàng/e-commerce';
}

function getNextQuestionForModules(modules: MatcherItem[], normalizedContext: string): string {
  const hasProduct = !!getKnownProductHint(normalizedContext);
  const hasModel = !!getKnownBusinessModel(normalizedContext);
  const moduleLabels = modules.map((module) => normalizeServiceText(module.label)).join(' ');

  if (/\bkhuyen\s*mai\b/.test(moduleLabels)) {
    return 'Phần khuyến mãi anh/chị muốn ưu tiên dạng nào: mã giảm giá/voucher, combo, freeship hay sale theo thời gian ạ?';
  }

  if (/\bvan\s*chuyen\b/.test(moduleLabels)) {
    return 'Về vận chuyển, anh/chị muốn tự xử lý giao hàng, tích hợp đơn vị vận chuyển hay cần cả mã vận đơn/tracking cho khách ạ?';
  }

  if (/\bquan\s*tri\s*don\s*hang\b/.test(moduleLabels)) {
    return 'Với quản trị đơn hàng, anh/chị cần theo dõi các trạng thái cơ bản hay có phân quyền nhân viên, ghi chú nội bộ và báo cáo doanh thu ạ?';
  }

  if (/\bthanh\s*toan\b/.test(moduleLabels)) {
    return 'Về thanh toán, anh/chị muốn dùng COD/chuyển khoản trước hay cần tích hợp cổng thanh toán online ngay từ đầu ạ?';
  }

  if (hasProduct && hasModel) {
    return 'Bước tiếp theo, anh/chị muốn chốt luồng mua hàng trước hay phần quản trị cho nhân viên trước ạ?';
  }

  if (hasProduct) {
    return 'Anh/chị muốn website theo hướng cửa hàng bán lẻ, bán hàng đa kênh, nhiều chi nhánh/kho hay sàn nhiều nhà bán ạ?';
  }

  return 'Để tư vấn sát hơn, anh/chị cho em biết sản phẩm mình bán là gì và hiện đang bán chủ yếu trên kênh nào ạ?';
}

function looksLikeEcommerceProductAnswer(normalizedCurrent: string): boolean {
  return normalizedCurrent.length <= 120 && findMatches(PRODUCT_LINES, normalizedCurrent).length > 0;
}

function hasKnownEcommerceContext(normalizedContext: string, normalizedLastAssistant = ''): boolean {
  const lastAssistantIsOtherIndustry = /\b(f\s*b|nha\s*hang|quoc\s*te|quoc\s*gia|cafe|quan\s*an|luat|luat\s*su|phap\s*luat|bat\s*dong\s*san|nha\s*dat|o\s*to|xe\s*hoi|du\s*lich|tour|khach\s*san|homestay|nha\s*khoa|phong\s*kham|pet|thu\s*cung|xay\s*dung|kien\s*truc|noi\s*that|logistics|tai\s*chinh|ngan\s*hang|tuyen\s*dung)\b/.test(
    normalizedLastAssistant
  );
  if (lastAssistantIsOtherIndustry) return false;

  const contextHasEcommerce = /\bwebsite\s*ban\s*hang\b|\bweb\s*ban\s*hang\b|\be\s*commerce\b|\becommerce\b|\bthuong\s*mai\s*dien\s*tu\b/.test(
    normalizedContext
  );
  const lastAssistantIsEcommerceOnly =
    /\bwebsite\s*ban\s*hang\b|\be\s*commerce\b|\becommerce\b|\bthuong\s*mai\s*dien\s*tu\b/.test(normalizedLastAssistant) &&
    !/\b7\s*nhom\s*chinh|tu\s*van\s*theo\s*7\s*nhom\b/.test(normalizedLastAssistant);

  return contextHasEcommerce || lastAssistantIsEcommerceOnly;
}

function looksLikeEcommerceFollowUp(normalizedCurrent: string): boolean {
  return /\b(web|website|san\s*pham|danh\s*muc|bo\s*loc|tim\s*kiem|size|mau|gio\s*hang|dat\s*hang|checkout|thanh\s*toan\s*online|cod|don\s*hang|quan\s*tri|van\s*chuyen|giao\s*hang|ma\s*van\s*don|tracking|khuyen\s*mai|voucher|coupon|freeship|seo|toc\s*do|chi\s*nhanh|kho\s*hang|ton\s*kho|da\s*kenh|facebook|zalo|shopee|lazada|tiktok|phan\s*quyen|nhan\s*vien|bao\s*cao|doanh\s*thu|giao\s*dien|ui\s*ux|responsive|mobile|bao\s*tri|bao\s*hanh|quy\s*trinh|trien\s*khai)\b/.test(
    normalizedCurrent
  );
}

function getEcommerceContextFollowUpResponse(normalizedCurrent: string, normalizedContext = ''): string {
  if (/\bseo\b|\btoi\s*uu\s*seo\b|\bseo\s*chuan\s*google\b/.test(normalizedCurrent)) {
    return [
      'Dạ có. Mọi website do DUDI Software triển khai đều được tối ưu SEO chuẩn Google ngay từ khâu lập trình:',
      '1. **Cấu trúc dữ liệu & Schema**: Thiết lập cấu trúc dữ liệu chuẩn hóa (Schema.org), thẻ Meta Title/Description động và thẻ Open Graph (OG) hỗ trợ chia sẻ mạng xã hội.',
      '2. **Tối ưu tốc độ tải trang (Core Web Vitals)**: Nén hình ảnh tự động, tối ưu mã nguồn (HTML/CSS/JS) và phản hồi máy chủ nhanh để đạt điểm cao trên Google PageSpeed Insights.',
      '3. **Thân thiện di động (Mobile-Friendly)**: Thiết kế giao diện responsive chuẩn 100% trên các thiết bị di động, yếu tố ưu tiên số 1 của thuật toán Google.',
      '4. **Chuẩn hóa URL & Sitemap/Robots**: URL ngắn gọn thân thiện, tự động tạo Sitemap XML và file Robots.txt hỗ trợ Google Bot index nhanh chóng.',
      '5. **Cấu hình chứng chỉ bảo mật SSL**: Tích hợp mã hóa HTTPS/SSL đảm bảo an toàn và gia tăng điểm uy tín SEO.',
      '',
      'Anh/chị đang làm website cho ngành nghề nào và mình đã có sẵn danh sách từ khóa cần đẩy lên top Google chưa ạ?',
    ].join('\n');
  }

  if (/\bphan\s*quyen\b|\bnhan\s*vien\b|\bvai\s*tro\b|\badmin\b/.test(normalizedCurrent)) {
    return [
      'Dạ có. Với **phần quản trị website bán hàng/e-commerce**, DUDI Software có thể thiết kế phân quyền theo **vai trò** để nhân viên chỉ thấy và thao tác đúng phần được giao.',
      'Ví dụ: chủ shop/admin toàn quyền, nhân viên xử lý đơn chỉ xem đơn hàng, kho chỉ cập nhật tồn kho, marketing chỉ quản lý mã giảm giá/banner, kế toán chỉ xem doanh thu và đối soát thanh toán.',
      '',
      'Phần này nên có thêm lịch sử thao tác để biết ai đã sửa sản phẩm, đổi trạng thái đơn, cập nhật tồn kho hoặc tạo chương trình khuyến mãi.',
    ].join('\n');
  }

  if (/\bbao\s*cao\b|\bdoanh\s*thu\b|\btheo\s*ngay\b|\bthong\s*ke\b/.test(normalizedCurrent)) {
    return [
      'Dạ có. Với **website bán hàng/e-commerce**, phần báo cáo có thể theo dõi **doanh thu theo ngày**, số đơn hàng, tỷ lệ đơn thành công/hủy, sản phẩm bán chạy và doanh thu theo từng kênh bán.',
      'Nếu mình bán đa kênh, báo cáo nên tách được theo Website, Facebook/Zalo, Shopee hoặc từng chi nhánh/kho để chủ shop biết kênh nào đang hiệu quả.',
      '',
      'Anh/chị muốn báo cáo ở mức cơ bản theo ngày/tháng hay cần dashboard chi tiết theo sản phẩm, kênh bán và nhân viên xử lý đơn ạ?',
    ].join('\n');
  }

  if (/\b(giao\s*dien|ui\s*ux|responsive|mobile|dien\s*thoai|tablet)\b/.test(normalizedCurrent)) {
    return [
      'Dạ có. Giao diện **website bán hàng/e-commerce** nên thiết kế responsive ngay từ đầu để hiển thị tốt trên desktop, tablet và **mobile**.',
      'Các màn hình cần tối ưu kỹ gồm: trang chủ, danh mục sản phẩm, bộ lọc, chi tiết sản phẩm, giỏ hàng, checkout và trang theo dõi đơn. Trên mobile nên ưu tiên nút mua hàng rõ, ảnh sản phẩm dễ xem, bộ lọc gọn và thao tác thanh toán ít bước.',
      '',
      'Nếu anh/chị muốn, DUDI có thể làm wireframe/UI trước để chốt trải nghiệm mua hàng trước khi lập trình.',
    ].join('\n');
  }

  if (/\bbao\s*hanh\b|\bbao\s*tri\b/.test(normalizedCurrent)) {
    return [
      'Dạ có. Với **website bán hàng/e-commerce**, DUDI Software thường tư vấn phần bảo hành và bảo trì sau bàn giao để hệ thống vận hành ổn định.',
      'Các phần nên có gồm: sửa lỗi kỹ thuật, cập nhật nhỏ, kiểm tra tốc độ tải trang, hỗ trợ quản trị sản phẩm/đơn hàng và xử lý sự cố phát sinh trong quá trình vận hành.',
      '',
      'Anh/chị muốn website chỉ cần gói bảo trì cơ bản hay cần hỗ trợ vận hành thường xuyên theo tháng ạ?',
    ].join('\n');
  }

  if (/\bquy\s*trinh\b|\bcac\s*buoc\b|\btrien\s*khai\b/.test(normalizedCurrent)) {
    return [
      'Dạ, với **website bán hàng/e-commerce**, quy trình triển khai thường đi theo các bước chính:',
      '1. Làm rõ sản phẩm, mô hình bán hàng, luồng đặt hàng và yêu cầu quản trị.',
      '2. Thiết kế UI/UX các màn hình chính: trang chủ, danh mục, chi tiết sản phẩm, giỏ hàng, checkout và quản trị.',
      '3. Lập trình website, CMS/quản trị, đơn hàng, thanh toán, vận chuyển và các tích hợp cần thiết.',
      '4. Kiểm thử trên desktop/mobile, tối ưu tốc độ, SEO cơ bản và bảo mật.',
      '5. Bàn giao, hướng dẫn quản trị và bảo trì sau khi chạy thật.',
      '',
      'Nếu cần chốt phạm vi để báo giá, anh/chị có thể để lại số điện thoại để nhân viên DUDI liên hệ tư vấn trực tiếp ạ.',
    ].join('\n');
  }

  const ecommerceModules = findMatches(ECOMMERCE_MODULES, normalizedCurrent);
  if (ecommerceModules.length > 0) {
    return getEcommerceModulesResponse(ecommerceModules, normalizedContext);
  }

  const businessModel = findMatches(BUSINESS_MODELS, normalizedCurrent)[0];
  if (businessModel) {
    return getEcommerceBusinessModelResponse(businessModel, normalizedCurrent, normalizedContext);
  }

  if (looksLikeEcommerceProductAnswer(normalizedCurrent)) {
    return getEcommerceProductResponse(normalizedCurrent, normalizedContext);
  }

  return [
    'Dạ, phần này vẫn thuộc phạm vi **website bán hàng/e-commerce** của mình.',
    'DUDI Software có thể tư vấn theo các cụm chức năng: giao diện sản phẩm, danh mục/tìm kiếm/lọc, giỏ hàng/checkout, thanh toán, quản trị đơn hàng, vận chuyển, khuyến mãi, SEO, phân quyền nhân viên và báo cáo doanh thu.',
    '',
    'Anh/chị muốn ưu tiên cụm nào trước để em đi sâu hơn: trải nghiệm mua hàng bên ngoài hay phần quản trị vận hành bên trong ạ?',
  ].join('\n');
}

function getEcommerceModulesResponse(modules: MatcherItem[], normalizedContext = ''): string {
  const moduleNames = modules.map((module) => module.label).join(', ');
  const guidance = modules
    .map((module, index) => `${index + 1}. **${module.label}**: ${module.guidance}`)
    .join('\n');
  const contextPhrase = getContextPhrase(normalizedContext);

  return [
    `Mình sẽ đi thẳng vào phần **${moduleNames}**${contextPhrase}.`,
    guidance,
    '',
    getNextQuestionForModules(modules, normalizedContext),
  ].join('\n');
}

function getEcommerceProductResponse(normalizedCurrent: string, normalizedContext = ''): string {
  const productHint = getProductHint(normalizedCurrent, normalizedContext);

  return [
    `Với website bán **${productHint}**, phần quan trọng nhất là làm cho khách xem sản phẩm nhanh, hiểu rõ thông tin và đặt hàng ít bước.`,
    'Nên ưu tiên: giao diện hình ảnh rõ, danh mục dễ lọc, trang chi tiết sản phẩm đầy đủ, giỏ hàng/checkout gọn, khuyến mãi phù hợp, vận chuyển minh bạch và quản trị đơn hàng dễ theo dõi.',
    '',
    'Anh/chị muốn website theo hướng cửa hàng bán lẻ đơn giản, bán hàng đa kênh, nhiều chi nhánh/kho hàng hay sàn nhiều nhà bán ạ?',
  ].join('\n');
}

function getEcommerceBusinessModelResponse(model: MatcherItem, normalizedCurrent: string, normalizedContext = ''): string {
  const productHint = getProductHint(normalizedCurrent, normalizedContext);
  const normalizedModel = normalizeServiceText(model.label);
  const nextQuestion = /\bda\s*kenh\b/.test(normalizedModel)
    ? 'Với bán hàng đa kênh, anh/chị muốn ưu tiên đồng bộ phần nào trước: sản phẩm, đơn hàng, tồn kho hay chăm sóc khách hàng từ Facebook/Zalo/Shopee ạ?'
    : 'Bước tiếp theo, anh/chị muốn ưu tiên phần nào trước: giao diện sản phẩm, giỏ hàng/thanh toán, quản trị đơn hàng, vận chuyển hay khuyến mãi ạ?';

  return [
    `Rõ rồi ạ. Với mô hình **${model.label}** cho nhóm **${productHint}**, DUDI Software sẽ tư vấn theo hướng vận hành thực tế chứ không chỉ dừng ở giao diện.`,
    model.guidance,
    '',
    nextQuestion,
  ].join('\n');
}

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

const SERVICE_TEMPLATES: Record<string, string[]> = {
  doanh_nghiep: [
    'website giới thiệu doanh nghiệp',
    'web giới thiệu thương hiệu',
    'website giới thiệu công ty',
    'làm trang web giới thiệu đơn vị',
    'web giới thiệu hãng',
    'website profile công ty',
    'làm web thương hiệu',
    'thiết kế trang giới thiệu công ty',
  ],
  ecommerce: [
    'website bán hàng e-commerce',
    'web e-commerce shopee lazada',
    'trang web bán hàng trực tuyến online',
    'web đặt hàng và thanh toán online',
    'website thương mại điện tử',
    'giỏ hàng thanh toán sản phẩm',
  ],
  app: [
    'làm app di động ios android',
    'thiết kế ứng dụng mobile',
    'phát triển app điện thoại',
    'lập trình mobile app',
  ],
  crm: [
    'phần mềm quản lý doanh nghiệp crm erp',
    'hệ thống crm erp',
    'phần mềm quản lý nội bộ',
    'hệ thống quản trị vận hành',
    'phân hệ quản lý bán hàng nhân sự kho',
  ],
  landing: [
    'thiết kế landing page chạy quảng cáo',
    'làm trang landing giới thiệu sản phẩm',
    'landing page đơn giản thu lead',
  ],
  chatbot: [
    'tích hợp ai chatbot rag',
    'giải pháp chatbot chăm sóc khách hàng',
    'chatbot tự động trả lời tư vấn',
  ],
  cloud: [
    'triển khai hạ tầng cloud devops',
    'tối ưu đám mây aws docker',
    'vận hành hệ thống cloud',
    'cấu hình ci cd và microservices',
  ],
};

let cachedServiceEmbeddings: Record<string, number[][]> | null = null;

async function getServiceEmbeddings(): Promise<Record<string, number[][]>> {
  if (cachedServiceEmbeddings) {
    return cachedServiceEmbeddings;
  }

  const cacheFile = path.join(process.cwd(), 'src/lib/ai/service-embeddings-cache.json');
  let diskCache: Record<string, number[][]> = {};
  if (fs.existsSync(cacheFile)) {
    try {
      diskCache = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
    } catch (err) {
      console.warn('Failed to parse service embeddings cache file:', err);
    }
  }

  const cached: Record<string, number[][]> = {};
  let cacheUpdated = false;

  for (const [service, phrases] of Object.entries(SERVICE_TEMPLATES)) {
    cached[service] = [];
    const diskPhrasesVecs = diskCache[service] || [];
    for (let i = 0; i < phrases.length; i++) {
      const phrase = phrases[i];
      if (diskPhrasesVecs[i] && diskPhrasesVecs[i].length > 0) {
        cached[service].push(diskPhrasesVecs[i]);
      } else {
        try {
          await new Promise(resolve => setTimeout(resolve, 100)); // slight delay to prevent 429
          const vec = await generateEmbedding(phrase);
          cached[service].push(vec);
          cacheUpdated = true;
        } catch (err) {
          console.error(`Failed to embed service phrase "${phrase}":`, err);
        }
      }
    }
  }

  if (cacheUpdated) {
    try {
      fs.writeFileSync(cacheFile, JSON.stringify(cached, null, 2), 'utf8');
    } catch (err) {
      console.warn('Failed to write service embeddings cache file:', err);
    }
  }

  cachedServiceEmbeddings = cached;
  return cached;
}

export async function getServiceConsultationResponse(
  message: string, 
  memorySummary = '',
  recentMessages: Array<{ role: 'USER' | 'ASSISTANT'; content: string }> = [],
  queryVector?: number[]
): Promise<string> {
  const normalizedCurrentMessage = normalizeServiceText(message);
  const normalizedContext = normalizeServiceText(memorySummary);
  const normalizedMessage = normalizeServiceText(`${memorySummary} ${message}`);
  if (isUnsupportedDomainInquiry(message)) {
    return getUnsupportedDomainResponse();
  }

  // Handle phone submission / pricing phone received
  const phoneCandidate = extractCustomerPhone(message);
  if (phoneCandidate && (isPricingOrMoneyInquiry(memorySummary) || /\b(sdt|so\s*dien\s*thoai|bao\s*gia|gia|chi\s*phi|lien\s*he)\b/.test(normalizedCurrentMessage) || message.length <= 35)) {
    return getPhoneReceivedHandoffResponse(phoneCandidate);
  }

  // Handle identity inquiries (e.g. "Bạn là ai vậy", "bot là ai")
  if (/\b(ban|bot)\s*la\s*ai\b|\bai\s*tra\s*loi\b|\bdudi\s*la\s*ai\b/.test(normalizedCurrentMessage)) {
    return getIdentityResponse();
  }

  // 1. Specific sub-context combo checks (using enriched message with memory summary and last 10 messages)
  const lastAssistantMsg = [...recentMessages].reverse().find(m => m.role === 'ASSISTANT')?.content || '';
  const normalizedLastAssistantMsg = normalizeServiceText(lastAssistantMsg);

  const hasExplicitWeb = /\b(web|website)\b/.test(normalizedCurrentMessage);
  const hasExplicitApp = /\b(app|mobile|ios|android)\b/.test(normalizedCurrentMessage);
  const isCorrectingBackToWeb =
    hasExplicitWeb &&
    /\b(app|mobile)\b/.test(normalizedCurrentMessage) &&
    /\b(da\s*bao|bao\s*web|web\s*ma|khong\s*phai|sao\s*ra|nham|sai)\b/.test(normalizedCurrentMessage);

  // Check explicit current category in current user prompt to prevent stale past branch stickiness
  const explicitHasChatbot = /\b(chatbot|ai|rag)\b/.test(normalizedCurrentMessage);
  const explicitHasCloud = /\b(cloud|devops|aws|gcp|docker|kubernetes|k8s|ha\s*tang)\b/.test(normalizedCurrentMessage);
  const explicitHasLanding = /\blanding\s*page|landing\b/.test(normalizedCurrentMessage);
  const explicitHasWebCorporate =
    (/\b(doanh\s*nghiep|cong\s*ty)\b/.test(normalizedCurrentMessage) ||
      (/\bgioi\s*thieu\b/.test(normalizedCurrentMessage) && !/\b(san\s*pham|danh\s*muc|ban\s*hang|shop)\b/.test(normalizedCurrentMessage))) &&
    !/\b(ban\s*hang|e\s*commerce|ecommerce|shop|mobile|app|crm|erp|chatbot|rag|cloud|devops)\b/.test(normalizedCurrentMessage);
  const explicitHasCrm = /\b(crm|erp)\b/.test(normalizedCurrentMessage);
  const explicitHasProcessOrWarranty = /\b(quy\s*trinh|cac\s*buoc|bao\s*hanh|bao\s*tri)\b/.test(normalizedCurrentMessage);
  const explicitHasSeo = /\bseo\b|\btoi\s*uu\s*seo\b|\bseo\s*chuan\s*google\b/.test(normalizedCurrentMessage);

  if (explicitHasSeo) {
    return [
      'Dạ có. Mọi website do DUDI Software triển khai đều được tối ưu SEO chuẩn Google ngay từ khâu lập trình:',
      '1. **Cấu trúc dữ liệu & Schema**: Thiết lập cấu trúc dữ liệu chuẩn hóa (Schema.org), thẻ Meta Title/Description động và thẻ Open Graph (OG) hỗ trợ chia sẻ mạng xã hội.',
      '2. **Tối ưu tốc độ tải trang (Core Web Vitals)**: Nén hình ảnh tự động, tối ưu mã nguồn (HTML/CSS/JS) và phản hồi máy chủ nhanh để đạt điểm cao trên Google PageSpeed Insights.',
      '3. **Thân thiện di động (Mobile-Friendly)**: Thiết kế giao diện responsive chuẩn 100% trên các thiết bị di động, yếu tố ưu tiên số 1 của thuật toán Google.',
      '4. **Chuẩn hóa URL & Sitemap/Robots**: URL ngắn gọn thân thiện, tự động tạo Sitemap XML và file Robots.txt hỗ trợ Google Bot index nhanh chóng.',
      '5. **Cấu hình chứng chỉ bảo mật SSL**: Tích hợp mã hóa HTTPS/SSL đảm bảo an toàn và gia tăng điểm uy tín SEO.',
      '',
      'Anh/chị đang cần triển khai SEO cho website thuộc lĩnh vực/ngành nghề nào ạ?',
    ].join('\n');
  }

  // Process & Warranty direct handler
  if (explicitHasProcessOrWarranty) {
    if (/\b(quy\s*trinh|cac\s*buoc)\b/.test(normalizedCurrentMessage)) {
      return [
        'Dạ, quy trình triển khai website / phần mềm tại DUDI Software được thực hiện theo 5 bước bài bản:',
        '1. **Khai thác nhu cầu & Sơ đồ trang web (Sitemap)**: Làm rõ mục tiêu, tính năng, đối tượng khách hàng và thống nhất cấu trúc các trang.',
        '2. **Thiết kế UI/UX độc quyền**: Thiết kế giao diện chi tiết (Wireframe & Visual Design) theo nhận diện thương hiệu.',
        '3. **Lập trình Front-end & CMS**: Phát triển giao diện người dùng mượt mà và xây dựng trang quản trị CMS trực quan, dễ thao tác.',
        '4. **Kiểm thử (Testing) & Tối ưu SEO/Speed**: Kiểm tra lỗi hiển thị di động, cấu hình SEO chuẩn Google và tối ưu tốc độ tải trang.',
        '5. **Bàn giao & Hướng dẫn sử dụng**: Đóng gói mã nguồn, hướng dẫn nhân viên quản trị và chuyển sang chế độ bảo hành bảo trì.',
        '',
        'Anh/chị cần triển khai dự án theo tiến độ gấp hay theo quy trình tiêu chuẩn ạ?',
      ].join('\n');
    }

    if (/\b(bao\s*hanh|bao\s*tri)\b/.test(normalizedCurrentMessage)) {
      return [
        'Dạ có. DUDI Software luôn cam kết chính sách bảo hành và bảo trì lâu dài sau khi bàn giao sản phẩm:',
        '1. **Bảo hành kỹ thuật miễn phí**: Xử lý 24/7 mọi sự cố phát sinh, lỗi phát sinh do hệ thống hoặc lỗi hiển thị.',
        '2. **Tối ưu & Sao lưu định kỳ**: Thường xuyên kiểm tra tốc độ tải trang, nâng cấp bảo mật và backup dữ liệu tự động.',
        '3. **Hỗ trợ quản trị & Đào tạo**: Hướng dẫn nhân viên mới của doanh nghiệp cách đăng bài viết, cập nhật sản phẩm và xem báo cáo.',
        '4. **Gói bảo trì mở rộng**: Cung cấp gói hỗ trợ vận hành thường xuyên theo tháng nếu doanh nghiệp cần đội ngũ IT đồng hành.',
        '',
        'Anh/chị cần tư vấn thêm về gói bảo trì cơ bản hay gói vận hành chuyên sâu theo tháng ạ?',
      ].join('\n');
    }
  }

  // Explicit AI Chatbot handler
  if (explicitHasChatbot) {
    return [
      'Dạ, giải pháp **AI Chatbot & RAG (Tri thức doanh nghiệp)** tại DUDI Software giúp tự động hóa tư vấn và chăm sóc khách hàng:',
      '1. **Học dữ liệu riêng của công ty**: Chatbot được huấn luyện trên tài liệu PDF, DOCX, website và bảng FAQ nội bộ của doanh nghiệp.',
      '2. **Tích hợp đa kênh**: Triển khai đồng bộ trên Zalo OA, Facebook Messenger và Website Livechat.',
      '3. **Tự động thu thập Lead & Sync CRM**: Nhận diện nhu cầu khách hàng, lấy số điện thoại và tự động đẩy dữ liệu về CRM.',
      '4. **Chuyển giao cho nhân viên**: Khi gặp câu hỏi phức tạp ngoài phạm vi, Chatbot tự động chuyển cuộc hội thoại cho tư vấn viên.',
      '',
      'Anh/chị muốn triển khai AI Chatbot cho Website, Zalo OA hay dùng nội bộ doanh nghiệp ạ?',
    ].join('\n');
  }

  // Explicit Landing Page handler
  if (explicitHasLanding) {
    return [
      'Dạ, thiết kế **Landing Page tối ưu chuyển đổi** tại DUDI Software tập trung vào hiệu quả thu lead và chạy quảng cáo:',
      '1. **Giao diện hiện đại & Tốc độ siêu tốc**: Tốc độ tải trang dưới 2 giây, hiển thị mượt mà 100% trên thiết bị di động.',
      '2. **Tối ưu nút Kêu gọi hành động (CTA)**: Bố cục nút đăng ký, hotline, chat Zalo nổi bật thúc đẩy mua hàng.',
      '3. **Thu thập Lead tự động**: Tích hợp form thu thập thông tin đổ dữ liệu trực tiếp về Google Sheets hoặc hệ thống CRM.',
      '4. **Đo lường chiến dịch**: Cấu hình đầy đủ Google Analytics, Facebook Pixel, TikTok Pixel để theo dõi tỷ lệ chuyển đổi.',
      '',
      'Anh/chị muốn làm Landing Page giới thiệu thương hiệu, chạy quảng cáo sản phẩm hay thu hút đăng ký sự kiện ạ?',
    ].join('\n');
  }

  // Explicit Corporate Web handler
  if (explicitHasWebCorporate && !/\b(ban\s*hang|e\s*commerce|ecommerce|shop)\b/.test(normalizedCurrentMessage)) {
    return [
      'Dạ, đối với **thiết kế website doanh nghiệp làm mới hoàn toàn**, DUDI Software sẽ tư vấn quy trình bài bản giúp xây dựng thương hiệu trực tuyến mạnh mẽ:',
      '1. **Xác định Sitemap & Cấu trúc**: Xây dựng sơ đồ trang web chuẩn hóa gồm: Trang chủ, Giới thiệu, Dịch vụ/Sản phẩm, Tin tức, Dự án đã làm và Liên hệ.',
      '2. **Thiết kế UI/UX độc quyền**: Giao diện được thiết kế riêng theo nhận diện thương hiệu của anh/chị, tạo sự khác biệt hoàn toàn với đối thủ.',
      '3. **Cơ chế CMS dễ sử dụng**: Sử dụng trang quản trị trực quan giúp nhân viên dễ dàng viết bài viết mới, cập nhật sản phẩm mà không cần biết code.',
      '4. **Bảo mật và Tối ưu SEO**: Cấu hình chứng chỉ SSL, cấu trúc dữ liệu Schema chuẩn Google để dễ dàng lên top tìm kiếm.',
      '',
      'Doanh nghiệp của mình hoạt động trong lĩnh vực nào và anh/chị đã chuẩn bị sẵn bộ nhận diện thương hiệu (logo, màu sắc chủ đạo) chưa ạ?',
    ].join('\n');
  }

  // Explicit Cloud / DevOps handler
  if (explicitHasCloud) {
    return [
      '☁️ Dịch vụ Điện toán Đám mây & Hạ tầng DevOps tại DUDI Software:',
      '1. **Triển khai kiến trúc Cloud**: Xây dựng hệ thống trên AWS, Google Cloud hoặc hạ tầng riêng với độ sẵn sàng cao (High Availability).',
      '2. **Container hóa bằng Docker**: Đóng gói mã nguồn ứng dụng chạy ổn định, nhất quán trên mọi môi trường.',
      '3. **Cấu hình CI/CD tự động**: Tự động hóa quy trình kiểm thử và cập nhật phiên bản mới không làm gián đoạn hệ thống.',
      '4. **Giám sát & Tự động co giãn (Auto Scaling)**: Tự động mở rộng tài nguyên khi truy cập tăng đột biến và cảnh báo sự cố 24/7.',
      '',
      'Anh/chị đang cần tư vấn hạ tầng Cloud cho hệ thống mới hay nâng cấp hệ thống hiện tại ạ?',
    ].join('\n');
  }

  // 2. Semantic matching for service categories
  const vec = queryVector || (await generateEmbedding(message));
  const serviceEmbeds = await getServiceEmbeddings();

  let bestService: string | null = null;
  let bestScore = 0;

  for (const [serviceName, vectors] of Object.entries(serviceEmbeds)) {
    for (const tempVec of vectors) {
      const score = cosineSimilarity(vec, tempVec);
      if (score > bestScore) {
        bestScore = score;
        bestService = serviceName;
      }
    }
  }

  const SERVICE_SEMANTIC_THRESHOLD = 0.70;

  const hasExplicitTopicChange = explicitHasChatbot || explicitHasCloud || explicitHasLanding || explicitHasWebCorporate || explicitHasCrm || explicitHasProcessOrWarranty;

  const lastAssistantIsMobileBranch =
    !hasExplicitTopicChange &&
    /\b(nhom\s*mobile\s*app|mobile\s*app\s*ios\s*android|ve\s*mobile\s*app|tu\s*van\s*app)\b/.test(normalizedLastAssistantMsg) &&
    !/\b7\s*nhom\s*chinh|tu\s*van\s*theo\s*7\s*nhom\b/.test(normalizedLastAssistantMsg);
  const lastAssistantIsCrmBranch =
    !hasExplicitTopicChange &&
    /\b(nhom\s*phan\s*mem\s*quan\s*ly|crm\s*erp|booking\s*platform|ve\s*phan\s*mem\s*quan\s*ly)\b/.test(normalizedLastAssistantMsg) &&
    !/\b7\s*nhom\s*chinh|tu\s*van\s*theo\s*7\s*nhom\b/.test(normalizedLastAssistantMsg);
  const lastAssistantIsEcommerceBranch =
    !hasExplicitTopicChange &&
    /\b(website\s*ban\s*hang|e\s*commerce|ecommerce|thuong\s*mai\s*dien\s*tu)\b/.test(normalizedLastAssistantMsg) &&
    !/\b7\s*nhom\s*chinh|tu\s*van\s*theo\s*7\s*nhom\b/.test(normalizedLastAssistantMsg);
  const lastAssistantIsWebCorporateBranch =
    !hasExplicitTopicChange &&
    /\b(website\s*doanh\s*nghiep|gioi\s*thieu\s*thuong\s*hieu|thiet\s*ke\s*website\s*doanh\s*nghiep)\b/.test(normalizedLastAssistantMsg) &&
    !/\b7\s*nhom\s*chinh|tu\s*van\s*theo\s*7\s*nhom\b/.test(normalizedLastAssistantMsg);
  const lastAssistantIsLandingPageBranch =
    !hasExplicitTopicChange &&
    /\b(website\s*landing\s*page|landing\s*page\s*gioi\s*thieu)\b/.test(normalizedLastAssistantMsg) &&
    !/\b7\s*nhom\s*chinh|tu\s*van\s*theo\s*7\s*nhom\b/.test(normalizedLastAssistantMsg);
  const lastAssistantIsChatbotBranch =
    !hasExplicitTopicChange &&
    /\b(ai\s*chatbot|rag|chatbot\s*dung\s*cho)\b/.test(normalizedLastAssistantMsg) &&
    !/\b7\s*nhom\s*chinh|tu\s*van\s*theo\s*7\s*nhom\b/.test(normalizedLastAssistantMsg);
  const lastAssistantIsUiUxBranch =
    !hasExplicitTopicChange &&
    /\b(nhom\s*ui\s*ux|ui\s*ux\s*design|ve\s*ui\s*ux|tu\s*van\s*giao\s*dien)\b/.test(normalizedLastAssistantMsg) &&
    !/\b7\s*nhom\s*chinh|tu\s*van\s*theo\s*7\s*nhom\b/.test(normalizedLastAssistantMsg);
  const lastAssistantIsCloudBranch =
    !hasExplicitTopicChange &&
    /\b(nhom\s*cloud|devops|aws|docker|ha\s*tang)\b/.test(normalizedLastAssistantMsg) &&
    !/\b7\s*nhom\s*chinh|tu\s*van\s*theo\s*7\s*nhom\b/.test(normalizedLastAssistantMsg);

  const hasSpecificIndustryKeyword = /\b(luat|luat\s*su|phap\s*luat|bat\s*dong\s*san|nha\s*dat|ban\s*nha|mua\s*nha|cho\s*thue\s*nha|nha\s*pho|can\s*ho|chung\s*cu|dat\s*nen|bds|san\s*bds|moi\s*gioi\s*bds|o\s*to|xe\s*hoi|du\s*lich|tour|khach\s*san|homestay|nha\s*khoa|phong\s*kham|pet|thu\s*cung|xay\s*dung|kien\s*truc|noi\s*that|logistics|studio|chup\s*anh|nhiep\s*anh|tai\s*chinh|ngan\s*hang|bao\s*hiem|tuyen\s*dung|viec\s*lam)\b/.test(normalizedCurrentMessage);

  const hasApp = (hasExplicitApp || (lastAssistantIsMobileBranch && !hasExplicitWeb)) && !hasSpecificIndustryKeyword;
  const hasCrm = /\b(crm|erp|booking|phan\s*mem|he\s*thong|quan\s*ly)\b/.test(normalizedMessage) || (lastAssistantIsCrmBranch && !hasExplicitWeb);
  const hasEcommerce = (isBroadEcommerceSelection(normalizedCurrentMessage) ||
    /\b(ban\s*hang|e\s*commerce|ecommerce|thuong\s*mai\s*dien\s*tu)\b/.test(normalizedCurrentMessage) ||
    (lastAssistantIsEcommerceBranch && !hasExplicitApp && !hasCrm)) && !hasSpecificIndustryKeyword && !hasExplicitTopicChange;
  const hasLanding = /\blanding\s*page|landing\b/.test(normalizedCurrentMessage) || (lastAssistantIsLandingPageBranch && !hasExplicitWeb && !hasExplicitApp);
  const hasWebCorporate = (/\b(doanh\s*nghiep|thuong\s*hieu)\b/.test(normalizedCurrentMessage) || (/\b(web|website|trang\s*web)\b/.test(normalizedCurrentMessage) && /\bgioi\s*thieu\b/.test(normalizedCurrentMessage)) || (lastAssistantIsWebCorporateBranch && !hasExplicitWeb && !hasExplicitApp)) && !/\b(o\s*to|bat\s*dong\s*san|du\s*lich|khach\s*san|crm|erp|phan\s*mem|booking|ban\s*hang|e\s*commerce|ecommerce)\b/.test(normalizedCurrentMessage);
  const hasChatbot = /\bchatbot\b|\bai\b|\brag\b/.test(normalizedCurrentMessage) || (lastAssistantIsChatbotBranch && !hasExplicitWeb && !hasExplicitApp);
  const hasUiUx = /\b(ui|ux|giao\s*dien|trai\s*nghiem)\b/.test(normalizedCurrentMessage) || (lastAssistantIsUiUxBranch && !hasExplicitWeb && !hasExplicitApp);
  const hasCloudDevops = /\b(cloud|devops|aws|gcp|docker|ha\s*tang|kubernetes|k8s|trien\s*khai)\b/.test(normalizedCurrentMessage) || (lastAssistantIsCloudBranch && !hasExplicitWeb && !hasExplicitApp);
  const isEcommerceContextFollowUp =
    !hasSpecificIndustryKeyword &&
    !hasExplicitTopicChange &&
    hasKnownEcommerceContext(normalizedContext, normalizedLastAssistantMsg) &&
    !/\b(app|ios|android|mobile\s*app)\b/.test(normalizedCurrentMessage) &&
    looksLikeEcommerceFollowUp(normalizedCurrentMessage);
  if (isEcommerceContextFollowUp) {
    return getEcommerceContextFollowUpResponse(normalizedCurrentMessage, normalizedContext);
  }

  if (isCorrectingBackToWeb || (hasExplicitWeb && hasEcommerce) || (hasEcommerce && !hasApp && !hasCrm)) {
    const ecommerceModules = findMatches(ECOMMERCE_MODULES, normalizedCurrentMessage);
    if (ecommerceModules.length > 0) {
      return getEcommerceModulesResponse(ecommerceModules, normalizedContext);
    }
    const businessModel = findMatches(BUSINESS_MODELS, normalizedCurrentMessage)[0];
    if (businessModel) {
      return getEcommerceBusinessModelResponse(businessModel, normalizedCurrentMessage, normalizedContext);
    }
    if (looksLikeEcommerceProductAnswer(normalizedCurrentMessage)) {
      return getEcommerceProductResponse(normalizedCurrentMessage, normalizedContext);
    }

    return [
      isCorrectingBackToWeb
        ? 'Dạ đúng rồi ạ, mình đang nói **website**, không phải app. Em xin sửa lại hướng tư vấn cho đúng nhu cầu.'
        : 'Nhóm này là **website bán hàng/e-commerce**.',
      'Với website bán hàng, các phần thường cần làm gồm: giao diện bán hàng, danh mục sản phẩm, giỏ hàng, đặt hàng, thanh toán online, quản trị đơn hàng, vận chuyển, khuyến mãi, SEO và tích hợp CRM/ERP nếu cần.',
      '',
      'Anh/chị cho em biết sản phẩm cần bán và mô hình mong muốn: cửa hàng bán lẻ, bán hàng đa kênh, nhiều chi nhánh/kho hay sàn nhiều nhà bán ạ?',
    ].join('\n');
  }

  if (hasApp) {
    const hasEcommerce = /\b(ban\s*hang|e\s*commerce|ecommerce|mua\s*sam|cua\s*hang|shop)\b/.test(normalizedCurrentMessage);
    const hasBooking = /\b(booking|dat\s*lich|dat\s*ban|dat\s*cho|lich\s*hen)\b/.test(normalizedCurrentMessage);
    const hasManagement = /\b(noi\s*bo|quan\s*ly|crm|erp|van\s*hanh|nhan\s*su|kho)\b/.test(normalizedCurrentMessage);
    const hasLoyalty = /\b(cham\s*soc|khach\s*hang|cskh|loyalty|tich\s*diem|thanh\s*vien)\b/.test(normalizedCurrentMessage);

    if (hasEcommerce) {
      return [
        'Đây là nhóm Mobile App Bán hàng & E-commerce.',
        'Với dự án App Bán hàng, DU - DUDI Software tư vấn các module cần thiết:',
        '1. **Trưng bày sản phẩm**: Giao diện tối ưu mobile, vuốt chuyển mượt mà, gợi ý sản phẩm thông minh.',
        '2. **Mua hàng & Thanh toán**: Giỏ hàng nhanh, cổng thanh toán tích hợp (Momo, ZaloPay, ngân hàng), quét mã QR.',
        '3. **Thông báo đẩy (Push Notification)**: Gửi tin khuyến mãi, ưu đãi cá nhân hóa trực tiếp đến điện thoại khách hàng.',
        '4. **Tích hợp cổng quản trị**: Quản lý đơn hàng, kho hàng đồng bộ thời gian thực với website hoặc CRM nội bộ.',
        '',
        'Anh/chị muốn phát triển app bán hàng cho một thương hiệu riêng, hay app dạng sàn thương mại điện tử nhiều nhà bán ạ?',
      ].join('\n');
    }

    if (hasBooking) {
      return [
        'Đây là nhóm Mobile App Đặt lịch / Booking Platform.',
        'DU - DUDI Software cung cấp giải pháp thiết kế app booking chuyên nghiệp:',
        '1. **Chọn dịch vụ & thời gian**: Khách hàng chủ động chọn ca khám/lịch dịch vụ, nhân viên hỗ trợ, chi nhánh.',
        '2. **Thanh toán đặt cọc**: Tích hợp cổng thanh toán giữ chỗ, tự động hoàn trả/hủy lịch theo quy định.',
        '3. **Nhắc lịch tự động**: Push notification nhắc nhở khách hàng trước giờ hẹn 1 tiếng / 1 ngày.',
        '4. **Quản lý lịch làm việc**: Cổng quản trị phân chia ca làm việc cho nhân viên, tránh trùng lịch.',
        '',
        'Anh/chị cần làm app đặt lịch cho lĩnh vực nào (như làm đẹp, spa, phòng khám, đặt sân thể thao, vé sự kiện...) ạ?',
      ].join('\n');
    }

    if (hasLoyalty) {
      return [
        'Đây là nhóm Mobile App Chăm sóc khách hàng (Loyalty App).',
        'Giải pháp giúp tăng tỷ lệ quay lại của khách hàng trung thành một cách hiệu quả:',
        '1. **Tích điểm thành viên**: Tự động tích điểm khi mua hàng, nâng hạng thẻ (Đồng, Bạc, Vàng, Kim cương).',
        '2. **Đổi quà & Voucher**: Kho quà tặng hấp dẫn, mã giảm giá độc quyền cho người dùng app.',
        '3. **Thông báo ưu đãi**: Chủ động push tin chúc mừng sinh nhật kèm quà tặng, thông tin ưu đãi đặc biệt.',
        '4. **Hỗ trợ trực tuyến**: Tích hợp chat hỗ trợ, gửi đánh giá phản hồi chất lượng dịch vụ.',
        '',
        'Anh/chị muốn làm app loyalty độc lập hay tích hợp kết nối đồng bộ với hệ thống POS/ERP sẵn có ạ?',
      ].join('\n');
    }

    if (hasManagement) {
      return [
        'Đây là nhóm Mobile App Quản lý nội bộ / Doanh nghiệp.',
        'DUDI Software hỗ trợ tối ưu hóa quy trình làm việc trên di động cho đội ngũ của anh/chị:',
        '1. **Chấm công & Phê duyệt**: Chấm công định vị GPS/Wifi, gửi yêu cầu xin nghỉ phép, duyệt đề xuất ngay trên app.',
        '2. **Quản lý công việc**: Giao việc, cập nhật tiến độ, báo cáo hoàn thành kèm hình ảnh hiện trường thực tế.',
        '3. **Tra cứu thông tin**: Xem nhanh báo cáo doanh thu, tồn kho, thông tin khách hàng mọi lúc mọi nơi.',
        '4. **Phân quyền bảo mật**: Phân quyền chi tiết theo cấp bậc nhân sự, bảo mật dữ liệu công ty.',
        '',
        'Anh/chị muốn làm app quản lý cho nhân viên thị trường, giao nhận, hay app vận hành nội bộ chung cho công ty ạ?',
      ].join('\n');
    }

    return [
      'Đây là nhóm mobile app iOS/Android. Khi tư vấn app, DUDI sẽ làm rõ luồng người dùng, UI/UX, đăng nhập, quản lý dữ liệu, thông báo, thanh toán, tích hợp API và phần quản trị đi kèm.',
      '',
      'Anh/chị muốn làm app cho bán hàng, booking, quản lý nội bộ hay chăm sóc khách hàng ạ?',
    ].join('\n');
  }

  if (hasCrm) {
    const hasSales = /\b(ban\s*hang|sales|kinh\s*doanh|don\s*hang)\b/.test(normalizedCurrentMessage);
    const hasHr = /\b(nhan\s*su|tuyen\s*dung|luong|hr|cham\s*cong)\b/.test(normalizedCurrentMessage);
    const hasWarehouse = /\b(kho|ton\s*kho|warehouse|nhap\s*xuat|vattu)\b/.test(normalizedCurrentMessage);
    const hasBookingPlatform = /\b(booking|dat\s*lich|dat\s*phong|dat\s*cho|hen\s*lich|lich\s*hen)\b/.test(normalizedCurrentMessage);

    if (hasSales) {
      const hasOnlineSales = /\b(online|mang|mạng)\b/.test(normalizedCurrentMessage);
      const hasFieldSales = /\b(thi\s*truong|b2b)\b/.test(normalizedCurrentMessage);
      const hasOmnichannel = /\b(da\s*kenh|omnichannel|tich\s*hop|cong|cskh)\b/.test(normalizedCurrentMessage);

      if (hasOnlineSales) {
        return [
          'Dạ, đối với **quản lý đội ngũ sale bán hàng online**, giải pháp CRM của DUDI tập trung vào tối ưu hóa tốc độ và tỷ lệ chốt đơn:',
          '1. **Tự động chia Lead (Khách hàng)**: Chia đều khách hàng từ Website/Fanpage cho các bạn sale theo cơ chế xoay vòng (Round Robin) hoặc theo hiệu suất chốt đơn.',
          '2. **Tích hợp hội thoại đa kênh**: Gom toàn bộ tin nhắn từ Facebook, Zalo, Tiktok và Livechat Website về một màn hình để sale phản hồi ngay lập tức.',
          '3. **Quản lý hiệu suất sale (KPIs)**: Đo lường thời gian phản hồi đầu tiên, tỷ lệ chốt đơn của từng bạn và doanh thu mang lại thực tế.',
          '4. **Tạo đơn hàng nhanh**: Tích hợp các đơn vị vận chuyển (GHTK, GHN, Viettel Post) để sale tạo đơn và đẩy đi chỉ với vài cú click.',
          '',
          'Đội ngũ sale online của mình hiện tại có khoảng bao nhiêu nhân sự và mình đang phân bổ khách từ những kênh quảng cáo nào chủ yếu ạ?',
        ].join('\n');
      }

      if (hasFieldSales) {
        return [
          'Dạ, đối với **quản lý đội ngũ sale thị trường (B2B)**, hệ thống sẽ hỗ trợ quản lý giám sát và tối ưu hóa tuyến bán hàng:',
          '1. **Định vị & Check-in địa điểm**: Sale thực hiện check-in/check-out qua GPS khi đến viếng thăm các đại lý, cửa hàng trên bản đồ.',
          '2. **Quản lý tuyến bán hàng (Route)**: Lên lịch trình di chuyển tối ưu hàng ngày cho từng sale, theo dõi lộ trình di chuyển thực tế.',
          '3. **Đặt hàng tại điểm**: Cho phép nhân viên đặt đơn trực tiếp trên điện thoại/máy tính bảng ngay khi ngồi với chủ đại lý, tự động trừ tồn kho thời gian thực.',
          '4. **Giám sát chỉ tiêu viếng thăm**: Thống kê số lượng cửa hàng đã viếng thăm, tỷ lệ phát sinh đơn hàng trên tổng số cuộc viếng thăm.',
          '',
          'Sản phẩm phân phối của bên mình thuộc ngành hàng nào (như FMCG, dược phẩm, vật liệu xây dựng...) và có bao nhiêu nhân sự chạy ngoài thị trường ạ?',
        ].join('\n');
      }

      if (hasOmnichannel) {
        return [
          'Dạ, giải pháp **tích hợp cổng chăm sóc khách hàng đa kênh** giúp doanh nghiệp quản lý dịch vụ khách hàng đồng bộ và chuyên nghiệp:',
          '1. **Gom kênh giao tiếp (Omnichannel)**: Hợp nhất các kênh Hotline, Email, Zalo OA, Facebook Fanpage, Website Live Chat vào một hệ thống Ticket duy nhất.',
          '2. **Tự động hóa Ticket**: Chuyển đổi cuộc gọi nhỡ hoặc tin nhắn ngoài giờ làm việc thành ticket chờ xử lý, gán tự động cho đúng nhân sự chuyên trách.',
          '3. **Lịch sử 360 độ của khách hàng**: Khi khách gọi đến, hiển thị toàn bộ lịch sử mua hàng, các vấn đề/yêu cầu cũ để nhân viên tư vấn chính xác.',
          '4. **Đánh giá mức độ hài lòng (CSAT)**: Gửi tin nhắn tự động khảo sát ý kiến khách hàng sau khi ticket được đóng.',
          '',
          'Anh/chị muốn tập trung đồng bộ phần chat chăm sóc trước hay cần tích hợp cả hệ thống tổng đài cuộc gọi (IP Phone) nữa ạ?',
        ].join('\n');
      }

      return [
        'Đây là phân hệ Quản lý bán hàng & CRM.',
        'DUDI Software xây dựng tính năng giúp tối ưu hóa doanh thu và quy trình bán hàng:',
        '1. **Quản lý phễu khách hàng (Lead Pipeline)**: Theo dõi trạng thái khách hàng từ lúc tiếp cận đến chốt đơn.',
        '2. **Lịch sử tương tác**: Lưu trữ mọi cuộc gọi, tin nhắn, email trao đổi với khách hàng trên 1 màn hình.',
        '3. **Báo cáo doanh số**: Thống kê doanh thu theo thời gian, theo từng nhân viên hoặc từng nhóm sản phẩm.',
        '4. **Tự động hóa chăm sóc**: Tự động gửi tin nhắn cảm ơn sau mua hàng, nhắc hẹn lịch gọi lại.',
        '',
        'Anh/chị muốn quản lý đội ngũ sale bán hàng online, sale thị trường (B2B) hay tích hợp cổng chăm sóc khách hàng đa kênh ạ?',
      ].join('\n');
    }

    if (hasHr) {
      const hasPayroll = /\b(luong|cham\s*cong|tinh\s*luong|bang\s*luong)\b/.test(normalizedCurrentMessage);
      const hasKpi = /\b(kpi|dao\s*tao|danh\s*gia|hieu\s*suat)\b/.test(normalizedCurrentMessage);

      if (hasPayroll) {
        return [
          'Dạ, phân hệ **Chấm công & Tính lương tự động** giúp giảm thiểu sai sót và tối ưu hóa thời gian xử lý cuối tháng:',
          '1. **Tích hợp máy chấm công**: Kết nối tự động dữ liệu từ máy vân tay, máy FaceID hoặc chấm công định vị GPS qua app di động.',
          '2. **Tính lương tự động**: Tự động tổng hợp ngày công, tính lương theo ca, tính toán bảo hiểm (BHXH), thuế TNCN và các khoản phụ cấp.',
          '3. **Phiếu lương điện tử (Payslip)**: Tự động gửi phiếu lương chi tiết cho từng nhân viên qua email hoặc ứng dụng di động để đối chiếu bảo mật.',
          '4. **Quản lý phép & đi muộn**: Tự động trừ phép năm, tính phạt đi muộn/về sớm dựa trên cấu hình nội quy công ty.',
          '',
          'Bên mình chấm công theo hình thức nào chủ yếu (vân tay, FaceID hay chấm công định vị khi đi thị trường) ạ?',
        ].join('\n');
      }

      if (hasKpi) {
        return [
          'Dạ, phân hệ **Đánh giá hiệu suất KPI & Đào tạo nhân sự** hỗ trợ xây dựng năng lực đội ngũ vững mạnh:',
          '1. **Thiết lập mục tiêu**: Cấu hình chỉ tiêu KPI chi tiết cho từng cá nhân, phòng ban theo định kỳ (tháng/quý/năm).',
          '2. **Đánh giá đa chiều (360 độ)**: Hỗ trợ quy trình nhân viên tự đánh giá, đồng nghiệp đánh giá và quản lý trực tiếp duyệt kết quả.',
          '3. **Quản lý lộ trình đào tạo**: Thiết lập các khóa học nội bộ, bài kiểm tra năng lực và theo dõi tiến độ học tập của nhân viên.',
          '4. **Báo cáo hiệu suất**: Biểu đồ hóa kết quả đánh giá để phục vụ công tác xét duyệt tăng lương, thăng tiến hoặc khen thưởng.',
          '',
          'Anh/chị muốn áp dụng đánh giá theo tiêu chí KPI thông số định lượng hay phương pháp OKR định hướng ạ?',
        ].join('\n');
      }

      return [
        'Đây là phân hệ Quản lý nhân sự & Tiền lương (HRM).',
        'Hỗ trợ chuyển đổi số công tác nhân sự chuyên nghiệp:',
        '1. **Hồ sơ nhân sự**: Lưu trữ thông tin cá nhân, hợp đồng lao động, bằng cấp của nhân viên.',
        '2. **Chấm công & Tính lương**: Tính lương tự động dựa trên ngày công thực tế, tăng ca, bảo hiểm và thuế.',
        '3. **Đánh giá KPI**: Thiết lập và theo dõi chỉ tiêu hiệu suất làm việc của từng nhân sự.',
        '4. **Quản lý phép năm**: Tự động trừ phép khi nhân viên xin nghỉ và hiển thị số ngày phép còn lại.',
        '',
        'Anh/chị muốn tập trung vào phần chấm công tính lương trước, hay hệ thống quản lý KPI và đào tạo nhân sự ạ?',
      ].join('\n');
    }

    if (hasWarehouse) {
      const hasSingle = /\b(don\s*le|1\s*kho|mot\s*kho)\b/.test(normalizedCurrentMessage);
      const hasMulti = /\b(chuoi|nhieu\s*kho|da\s*chi\s*nhanh|da\s*dia\s*diem)\b/.test(normalizedCurrentMessage);

      if (hasSingle) {
        return [
          'Dạ, giải pháp **Quản lý một kho hàng đơn lẻ** giúp kiểm soát hàng hóa chặt chẽ và sắp xếp khoa học:',
          '1. **Quản lý vị trí (Bin Location)**: Định vị chính xác hàng hóa nằm ở kệ nào, lô nào để nhân viên lấy hàng nhanh chóng.',
          '2. **Cảnh báo tồn kho tối thiểu**: Tự động thông báo khi số lượng mặt hàng xuống dưới mức an toàn để kịp thời nhập thêm.',
          '3. **Quét mã vạch/QR Code**: Hỗ trợ quét mã bằng điện thoại để thực hiện nhanh các giao dịch nhập kho, xuất kho hoặc kiểm kho.',
          '4. **Báo cáo nhập xuất tồn**: Thống kê chi tiết lượng hàng nhập, xuất và giá trị tồn kho theo thời gian.',
          '',
          'Sản phẩm trong kho của mình có cần quản lý chi tiết theo số lô và hạn sử dụng (date) không ạ?',
        ].join('\n');
      }

      if (hasMulti) {
        return [
          'Dạ, giải pháp **Quản lý chuỗi kho hàng đa chi nhánh** giúp tối ưu hóa luân chuyển hàng giữa các địa điểm:',
          '1. **Luân chuyển kho (Stock Transfer)**: Quản lý luồng chuyển hàng từ kho này sang kho khác, yêu cầu duyệt từ các bên liên quan.',
          '2. **Đồng bộ tồn kho thời gian thực**: Cập nhật số lượng tồn của toàn bộ hệ thống lên trang bán hàng online, tránh tình trạng hết hàng ảo.',
          '3. **Kiểm kho phân tán**: Hỗ trợ nhiều nhân viên kiểm kho cùng lúc tại các chi nhánh khác nhau và tự động đối chiếu chênh lệch.',
          '4. **Báo cáo hợp nhất**: Báo cáo doanh thu, chi phí, hàng tồn của toàn bộ hệ thống hoặc chi tiết từng chi nhánh.',
          '',
          'Mình có cần kết nối dữ liệu kho này trực tiếp với các sàn TMĐT (Shopee, Lazada...) hay website bán hàng sẵn có không ạ?',
        ].join('\n');
      }

      return [
        'Đây là phân hệ Quản lý kho hàng & Vật tư.',
        'Kiểm soát dòng hàng hóa chính xác, giảm thiểu sai sót tối đa:',
        '1. **Quản lý nhập xuất**: Tạo phiếu nhập kho, xuất kho nhanh chóng, theo dõi lịch sử luân chuyển hàng.',
        '2. **Tồn kho tối thiểu**: Tự động cảnh báo khi mặt hàng trong kho xuống dưới mức tối thiểu cần thiết.',
        '3. **Quản lý vị trí kho**: Sắp xếp hàng hóa theo kệ, lô, date để dễ dàng tìm kiếm và bốc dỡ.',
        '4. **Kiểm kho thông minh**: Hỗ trợ quét mã vạch/QR code bằng điện thoại để đối chiếu số lượng thực tế.',
        '',
        'Anh/chị cần quản lý một kho hàng đơn lẻ hay chuỗi kho hàng đa chi nhánh/đa địa điểm ạ?',
      ].join('\n');
    }

    if (hasBookingPlatform) {
      const hasService = /\b(spa|phong\s*kham|lam\s*dep|nha\s*khoa|dich\s*vu)\b/.test(normalizedCurrentMessage);
      const hasRental = /\b(phong|homestay|xe|khach\s*san|thue|cho\s*thue)\b/.test(normalizedCurrentMessage);

      if (hasService) {
        return [
          'Dạ, giải pháp **Phần mềm đặt lịch dịch vụ (Service Booking)** được tối ưu hóa cho quản lý lịch trình dịch vụ (như Spa, Clinic, Nha khoa, Salon):',
          '1. **Chọn Kỹ thuật viên / Bác sĩ**: Cho phép khách chọn người thực hiện dịch vụ mong muốn dựa trên đánh giá hoặc lịch trống.',
          '2. **Quản lý ca làm việc**: Tự động phân phối lịch hẹn cho nhân viên, tránh tình trạng trùng lặp hoặc quá tải.',
          '3. **Nhắc lịch tự động**: Tích hợp Zalo ZNS hoặc SMS Brandname tự động gửi tin nhắn nhắc nhở khách hàng trước giờ hẹn.',
          '4. **Lịch sử trị liệu**: Quản lý chi tiết hồ sơ khách hàng, hình ảnh trước/sau và lịch sử các ca dịch vụ đã làm.',
          '',
          'Mô hình dịch vụ của anh/chị có bao nhiêu chi nhánh và hiện tại mình đang quản lý lịch hẹn bằng cách nào ạ?',
        ].join('\n');
      }

      if (hasRental) {
        return [
          'Dạ, giải pháp **Phần mềm đặt chỗ lưu trú / cho thuê (Rental Booking)** giúp tự động hóa khâu vận hành phòng ốc hoặc tài sản cho thuê:',
          '1. **Quản lý trạng thái thời gian thực**: Theo dõi phòng/xe trống, phòng đang sử dụng, phòng cần dọn dẹp trực quan trên sơ đồ calendar.',
          '2. **Đồng bộ kênh bán (OTA Sync)**: Kết nối và đồng bộ tự động trạng thái phòng với các kênh như Airbnb, Agoda, Booking.com để tránh overbooking.',
          '3. **Thanh toán đặt cọc online**: Tích hợp cổng thanh toán để khách đặt cọc giữ chỗ trước, tự động áp dụng chính sách hủy phòng.',
          '4. **Quản lý phụ thu & Dịch vụ đi kèm**: Tự động tính phí giặt là, xe đưa đón, minibar trực tiếp vào hóa đơn của khách.',
          '',
          'Tài sản cho thuê của anh/chị là homestay, khách sạn hay cho thuê xe tự lái và mình có bao nhiêu phòng/xe cần quản lý ạ?',
        ].join('\n');
      }

      return [
        'Đây là phân hệ Phần mềm đặt lịch / Booking Platform chuyên nghiệp.',
        'Hệ thống giúp số hóa toàn bộ khâu đặt chỗ, đặt lịch dịch vụ và quản trị vận hành:',
        '1. **Cổng đặt lịch thân thiện**: Cho phép khách hàng tự chọn dịch vụ, nhân viên hỗ trợ, địa điểm và giờ trống.',
        '2. **Quản lý tài nguyên**: Tự động hóa việc phân bổ lịch làm việc, tránh trùng lịch ca làm việc.',
        '3. **Tự động nhắc lịch**: Push SMS/Zalo tự động gửi thông báo xác nhận và nhắc nhở lịch hẹn.',
        '4. **Báo cáo hiệu suất**: Thống kê tỷ lệ hoàn thành ca hẹn, doanh thu dịch vụ và chấm điểm phục vụ của nhân viên.',
        '',
        'Anh/chị muốn làm hệ thống đặt lịch dịch vụ (Spa, Nha khoa, Clinic...) hay đặt chỗ thuê tài sản (Homestay, Khách sạn, Thuê xe...) ạ?',
      ].join('\n');
    }

    return [
      'Đây là nhóm phần mềm quản lý doanh nghiệp/CRM/ERP/booking platform.',
      'Phần cần làm rõ thường là: quản lý khách hàng, đơn hàng, nhân sự, kho, lịch hẹn, báo cáo, phân quyền, workflow và tích hợp hệ thống sẵn có.',
      '',
      'Anh/chị muốn hệ thống phục vụ bộ phận nào trước: bán hàng, vận hành, nhân sự, kho hay chăm sóc khách hàng ạ?',
    ].join('\n');
  }

  if (hasLanding) {
    const hasBrand = /\b(thuong\s*hieu|doanh\s*nghiep|gioi\s*thieu)\b/.test(normalizedCurrentMessage);
    const hasAds = /\b(quang\s*cao|chien\s*dich|san\s*pham|ban\s*hang|lead|thu\s*lead)\b/.test(normalizedCurrentMessage);
    const hasEvent = /\b(su\s*kien|event|hoi\s*thao|mini\s*game|dang\s*ky)\b/.test(normalizedCurrentMessage);

    if (hasBrand) {
      return [
        'Dạ, thiết kế **Landing Page giới thiệu thương hiệu doanh nghiệp** sẽ tập trung vào sự chuyên nghiệp và uy tín:',
        '1. **Nhất quán thương hiệu**: Sử dụng bộ màu sắc, font chữ và logo chuẩn nhận diện thương hiệu.',
        '2. **Nội dung súc tích**: Giới thiệu ngắn gọn tầm nhìn, sứ mệnh, giá trị cốt lõi và các điểm mạnh vượt trội (USP) của doanh nghiệp.',
        '3. **Kêu gọi hành động (CTA)**: Nút liên hệ trực tiếp qua Hotline, Zalo, hoặc gửi form yêu cầu tư vấn.',
        '',
        'Anh/chị muốn tích hợp nút liên hệ trực tiếp qua Zalo/Hotline hay form điền thông tin tư vấn ạ?',
      ].join('\n');
    }

    if (hasAds) {
      return [
        'Tuyệt vời ạ. **Landing Page chạy chiến dịch quảng cáo sản phẩm** sẽ được tối ưu để thúc đẩy hành vi mua hàng hoặc để lại thông tin (thu lead):',
        '1. **Tiêu đề giật gân (Headline)**: Nêu bật lợi ích lớn nhất của sản phẩm ngay từ đầu trang.',
        '2. **Bằng chứng xã hội (Social Proof)**: Hiển thị các đánh giá (review), cảm nhận của khách hàng cũ để tăng uy tín.',
        '3. **Ưu đãi giới hạn**: Tạo cảm giác cấp bách bằng đồng hồ đếm ngược (countdown clock) hoặc quà tặng giới hạn.',
        '4. **Form điền thông tin tối giản**: Chỉ yêu cầu Tên và Số điện thoại để tăng tỷ lệ chuyển đổi.',
        '',
        'Anh/chị định chạy quảng cáo cho sản phẩm này trên kênh nào chủ yếu: Facebook Ads, Google Ads hay TikTok Ads ạ?',
      ].join('\n');
    }

    if (hasEvent) {
      return [
        'Dạ, **Landing Page sự kiện / event** sẽ tập trung vào việc thu hút lượt đăng ký tham gia:',
        '1. **Thông tin sự kiện rõ ràng**: Thời gian, địa điểm, agenda chương trình và danh sách diễn giả nổi tiếng.',
        '2. **Đồng hồ đếm ngược (Countdown)**: Nhấn mạnh thời gian đăng ký vé sớm (Early Bird) sắp kết thúc.',
        '3. **Form đăng ký nhanh**: Kết nối trực tiếp hệ thống gửi email xác nhận vé hoặc QR code tham dự tự động.',
        '',
        'Sự kiện của anh/chị là sự kiện trực tuyến (online webinar) hay trực tiếp (offline event) ạ?',
      ].join('\n');
    }

    return [
      'Đây là nhóm Website Landing Page / Giới thiệu sản phẩm.',
      'Với dự án Landing Page, DU - DUDI Software thường tư vấn thiết kế tối ưu chuyển đổi:',
      '1. **Giao diện hiện đại**: Hình ảnh cuốn hút, tập trung vào 1 thông điệp/kêu gọi hành động (CTA) duy nhất.',
      '2. **Tốc độ tải trang siêu tốc**: Dưới 2 giây, chuẩn responsive hiển thị mượt mà trên di động.',
      '3. **Tích hợp form đăng ký**: Tự động thu thập thông tin và đổ dữ liệu về Google Sheets hoặc CRM nội bộ.',
      '4. **Cấu hình tracking**: Tích hợp các công cụ đo lường hành vi khách hàng như Google Analytics, Facebook Pixel.',
      '',
      'Anh/chị muốn làm landing page để giới thiệu thương hiệu doanh nghiệp, chạy chiến dịch quảng cáo sản phẩm hay sự kiện ạ?',
    ].join('\n');
  }

  if (hasWebCorporate) {
    const hasNew = /\b(moi|lam\s*moi|tu\s*dau|khoi\s*chay|gioi\s*thieu|gioi\s*thieu\s*cong\s*ty|gioi\s*thieu\s*dich\s*vu)\b/.test(normalizedCurrentMessage);
    const hasUpgrade = /\b(nang\s*cap|lam\s*lai|cu|hien\s*tai|redesign)\b/.test(normalizedCurrentMessage);

    if (hasNew) {
      return [
        'Dạ, đối với **thiết kế website doanh nghiệp làm mới hoàn toàn**, DUDI Software sẽ tư vấn quy trình bài bản giúp xây dựng thương hiệu trực tuyến mạnh mẽ:',
        '1. **Xác định Sitemap & Cấu trúc**: Xây dựng sơ đồ trang web chuẩn hóa gồm: Trang chủ, Giới thiệu, Dịch vụ/Sản phẩm, Tin tức, Dự án đã làm và Liên hệ.',
        '2. **Thiết kế UI/UX độc quyền**: Giao diện được thiết kế riêng theo nhận diện thương hiệu của anh/chị, tạo sự khác biệt hoàn toàn với đối thủ.',
        '3. **Cơ chế CMS dễ sử dụng**: Sử dụng trang quản trị trực quan giúp nhân viên dễ dàng viết bài viết mới, cập nhật sản phẩm mà không cần biết code.',
        '4. **Bảo mật và Tối ưu SEO**: Cấu hình chứng chỉ SSL, cấu trúc dữ liệu Schema chuẩn Google để dễ dàng lên top tìm kiếm.',
        '',
        'Doanh nghiệp của mình hoạt động trong lĩnh vực nào và anh/chị đã chuẩn bị sẵn bộ nhận diện thương hiệu (logo, màu sắc chủ đạo) chưa ạ?',
      ].join('\n');
    }

    if (hasUpgrade) {
      return [
        'Dạ, đối với **nâng cấp / làm lại website doanh nghiệp hiện tại**, DUDI sẽ tập trung giải quyết các hạn chế của web cũ và cải thiện hiệu năng:',
        '1. **Đổi mới giao diện (Redesign)**: Thay thế layouts lỗi thời bằng giao diện hiện đại, chuyên nghiệp, tương thích 100% trên các thiết bị di động.',
        '2. **Tối ưu tốc độ tải trang**: Tối ưu hóa mã nguồn, nén ảnh, tăng tốc độ phản hồi máy chủ (đạt điểm xanh trên Google PageSpeed Insights).',
        '3. **Bảo toàn dữ liệu SEO**: Tạo các liên kết chuyển hướng (301 Redirect) để giữ nguyên thứ hạng từ khóa cũ trên Google, tránh bị mất index.',
        '4. **Nâng cấp tính năng quản trị**: Chuyển đổi sang hệ thống CMS hiện đại, bảo mật hơn và dễ dàng mở rộng thêm tính năng sau này.',
        '',
        'Anh/chị có thể chia sẻ link website hiện tại và điểm nào anh/chị chưa hài lòng nhất ở trang web cũ được không ạ?',
      ].join('\n');
    }

    return [
      'Đây là nhóm Website Doanh Nghiệp / Giới thiệu thương hiệu.',
      'DU - DUDI Software cung cấp giải pháp thiết kế website doanh nghiệp chuẩn SEO và chuyên nghiệp:',
      '1. **Giao diện độc quyền**: Chuẩn nhận diện thương hiệu, UI/UX hiện đại, gia tăng uy tín doanh nghiệp.',
      '2. **Nội dung đầy đủ**: Giới thiệu hồ sơ năng lực, lịch sử phát triển, đội ngũ nhân sự và danh mục sản phẩm/dịch vụ.',
      '3. **Tối ưu SEO**: Thiết kế chuẩn cấu trúc dữ liệu giúp trang web tăng trưởng thứ hạng trên Google tự nhiên.',
      '4. **Hệ thống CMS tiện lợi**: Dễ dàng quản trị tin tức, bài viết dịch vụ và bảo mật thông tin tuyệt đối.',
      '',
      'Anh/chị muốn làm website giới thiệu công ty/dịch vụ mới hay nâng cấp, làm lại trang web doanh nghiệp hiện tại ạ?',
    ].join('\n');
  }

  if (/\bthoi\s*trang|my\s*pham|lam\s*dep|spa|trang\s*suc\b/.test(normalizedCurrentMessage)) {
    const hasDesignBrand = /\b(thiet\s*ke|brand|nhan\s*hieu|rieng)\b/.test(normalizedCurrentMessage);
    const hasMultiBrand = /\b(da\s*thuong\s*hieu|phan\s*phoi|nhieu\s*thuong\s*hieu)\b/.test(normalizedCurrentMessage);
    const hasSpaClinic = /\b(spa|tham\s*my|salon|phong\s*kham)\b/.test(normalizedCurrentMessage);

    if (hasDesignBrand) {
      return [
        'Dạ, đối với **website thời trang thương hiệu thiết kế (Local Brand)**, DUDI tập trung vào truyền tải câu chuyện thương hiệu và nâng tầm giá trị sản phẩm:',
        '1. **Trải nghiệm hình ảnh cao cấp**: Tích hợp tính năng zoom cận cảnh chất liệu vải, video BST (Lookbook) sinh động, bảng quy đổi size thông minh.',
        '2. **Thiết kế đậm chất riêng**: Giao diện tối giản, tập trung vào hình ảnh sản phẩm lớn và chuẩn nhận diện thương hiệu.',
        '3. **Đặt hàng tinh giản**: Quy trình checkout 1 trang duy nhất, tự động điền địa chỉ thông minh.',
        '',
        'Anh/chị đã có sẵn ý tưởng thiết kế giao diện (style tối giản, cổ điển, hay năng động...) chưa ạ?',
      ].join('\n');
    }

    if (hasMultiBrand) {
      return [
        'Dạ, đối với **website/hệ thống phân phối đa thương hiệu**, DUDI Software sẽ giải quyết bài toán quản trị kho và bộ lọc sản phẩm phức tạp:',
        '1. **Bộ lọc đa thuộc tính nâng cao**: Khách dễ dàng lọc sản phẩm theo Thương hiệu, Size, Màu sắc, Chất liệu và Khoảng giá cùng lúc.',
        '2. **Đồng bộ kho hàng tự động**: Kết nối dữ liệu tồn kho thời gian thực với các sàn TMĐT (Shopee, Lazada) hoặc phần mềm quản lý kho (KiotViet, Sapo).',
        '3. **Quản lý nhà cung cấp**: Tích hợp cổng quản trị phân quyền cho từng thương hiệu theo dõi doanh số bán hàng.',
        '',
        'Hệ thống của mình dự kiến phân phối khoảng bao nhiêu thương hiệu và có cần đồng bộ kho hàng với phần mềm quản lý sẵn có không ạ?',
      ].join('\n');
    }

    if (hasSpaClinic) {
      return [
        'Dạ, đối với **website giới thiệu Spa / Thẩm mỹ viện**, giải pháp tập trung vào chuyển đổi cuộc gọi và lịch hẹn của khách hàng:',
        '1. **Đặt lịch hẹn dịch vụ**: Cổng đặt lịch thân thiện, cho phép khách chọn cơ sở, chọn gói dịch vụ và kỹ thuật viên ưa thích.',
        '2. **Trưng bày dịch vụ & Bảng giá**: Giới thiệu chi tiết lộ trình trị liệu, bảng giá minh bạch và hình ảnh trước/sau khi làm dịch vụ.',
        '3. **Tự động nhắc lịch**: Kết nối hệ thống tự động gửi tin nhắn nhắc nhở lịch hẹn qua Zalo/SMS để tránh rớt lịch.',
        '',
        'Cơ sở Spa/Thẩm mỹ viện của mình hiện tại có khoảng bao nhiêu giường/phòng dịch vụ và mình muốn đặt lịch trực tiếp trên web hay qua chat Zalo ạ?',
      ].join('\n');
    }

    return [
      'Đây là nhóm Website/Ứng dụng ngành Thời trang & Làm đẹp.',
      'Với ngành này, DU - DUDI Software thường thiết kế giao diện có tính thẩm mỹ rất cao và tối ưu trải nghiệm mua sắm:',
      '1. **Hình ảnh/Video cuốn hút**: Trưng bày lookbook, BST mới, zoom chi tiết chất liệu, video sản phẩm 360 độ.',
      '2. **Bộ lọc sản phẩm thông minh**: Khách dễ dàng lọc theo size, màu sắc, khoảng giá và chất liệu.',
      '3. **Giỏ hàng & Checkout mượt mà**: Luồng đặt hàng tối giản kết hợp thanh toán online tự động (ZaloPay, Momo, chuyển khoản qua QR).',
      '4. **Tích hợp review**: Đánh giá sản phẩm kèm ảnh/video thực tế từ người mua cũ.',
      '',
      'Anh/chị muốn xây dựng website bán hàng thời trang thiết kế, hệ thống phân phối đa thương hiệu hay web giới thiệu Spa/Thẩm mỹ viện ạ?',
    ].join('\n');
  }

  if (/\bthuc\s*pham\b|\bdo\s*an\b|\bnha\s*hang\b|\bcafe\b|\bf\s*b\b/.test(normalizedCurrentMessage) && !/\bdo\s*gia\s*dung|nha\s*bep|gia\s*dung\b/.test(normalizedCurrentMessage) && !/\b(crm|erp|phan\s*mem|he\s*thong|quan\s*ly|chatbot|rag)\b/.test(normalizedCurrentMessage)) {
    const hasOrganic = /\b(organic|sach|sạch|rau|cu|qua|thit|ca|thuc\s*pham)\b/.test(normalizedCurrentMessage);
    const hasOrder = /\b(dat\s*ban|dat\s*mon|nha\s*hang|cafe|quan|menu|mon\s*an|uong)\b/.test(normalizedCurrentMessage);

    if (hasOrganic) {
      return [
        'Dạ, đối với **website bán thực phẩm sạch / organic**, giải pháp sẽ tập trung vào quản lý độ tươi ngon và giao hàng nhanh chóng:',
        '1. **Quản lý Hạn sử dụng (Date)**: Cảnh báo tồn kho theo lô/date, tự động giảm giá các mặt hàng cận date.',
        '2. **Chọn thời gian giao hàng**: Khách chủ động chọn khung giờ nhận hàng (ví dụ: giao buổi sáng trước 10h) để đảm bảo độ tươi của thực phẩm.',
        '3. **Tích hợp Ship siêu tốc**: Tự động kết nối với Ahamove, GrabExpress để tính phí ship theo khoảng cách thực tế và đẩy đơn đi ngay.',
        '',
        'Anh/chị kinh doanh thực phẩm tươi sống (thịt, cá, rau) hay thực phẩm khô đóng hộp là chủ yếu ạ?',
      ].join('\n');
    }

    if (hasOrder) {
      return [
        'Dạ, đối với **website đặt bàn / đặt món cho nhà hàng, quán café**, hệ thống giúp tối ưu hóa khâu phục vụ và tăng trải nghiệm khách hàng:',
        '1. **Menu điện tử (E-menu/QR Order)**: Khách xem thực đơn sinh động, lọc món theo danh mục (khai vị, món chính, đồ uống).',
        '2. **Đặt bàn trực tuyến**: Chọn số lượng khách, sơ đồ vị trí bàn mong muốn và ngày giờ đặt trước.',
        '3. **Thanh toán đặt cọc**: Tích hợp thanh toán đặt cọc trước để giữ chỗ vào các ngày lễ Tết hoặc khi đặt món trước.',
        '',
        'Nhà hàng/quán café của bên mình có bao nhiêu bàn và anh/chị muốn khách tự gọi món quét QR tại bàn hay chỉ cần đặt bàn trước từ xa thôi ạ?',
      ].join('\n');
    }

    return [
      'Đây là nhóm Website/Hệ thống F&B và Thực phẩm.',
      'Đặc trưng của ngành này là quản lý sản phẩm tươi sống hoặc giao hàng ngay, do đó DU - DUDI Software sẽ tư vấn:',
      '1. **Quản lý tồn kho theo lô/date**: Hạn chế thất thoát, hiển thị số lượng tồn kho thực tế.',
      '2. **Luồng đặt hàng nhanh**: Chọn món, thêm vào giỏ và đặt hàng ngay lập tức.',
      '3. **Tích hợp vận chuyển nhanh**: Tự động tính phí vận chuyển theo khoảng cách hoặc khu vực (Ahamove, Lalamove).',
      '4. **Quản lý đơn hàng thời gian thực**: Nhân viên tại cửa hàng/bếp nhận đơn và chế biến/đóng gói tức thì.',
      '',
      'Anh/chị muốn xây dựng trang web bán thực phẩm organic sạch, hay website đặt bàn/đặt món cho nhà hàng/quán café ạ?',
    ].join('\n');
  }

  if (/\bdo\s*gia\s*dung|nha\s*bep|gia\s*dung\b/.test(normalizedCurrentMessage)) {
    const hasChain = /\b(chuoi|dien\s*may|he\s*thong|nhieu\s*cua\s*hang|chi\s*nhanh)\b/.test(normalizedCurrentMessage);
    const hasSpecialized = /\b(chuyen|mot\s*dong|dòng|chuyen\s*biet|hang\s*rieng)\b/.test(normalizedCurrentMessage);

    if (hasChain) {
      return [
        'Dạ, đối với **website cho chuỗi cửa hàng điện máy / gia dụng**, hệ thống sẽ xử lý bài toán kho hàng phân tán và tối ưu luồng mua hàng phức tạp:',
        '1. **Tìm kiếm cửa hàng gần nhất**: Tự động gợi ý cửa hàng còn hàng dựa trên vị trí GPS của khách để họ đến mua trực tiếp hoặc nhận hàng tại điểm (Click & Collect).',
        '2. **So sánh sản phẩm nâng cao**: Cho phép khách chọn 2-3 mẫu bếp/tủ lạnh để so sánh chi tiết các thông số kỹ thuật (công suất, kích thước, điện năng tiêu thụ).',
        '3. **Tích hợp trả góp online**: Kết nối cổng thanh toán hỗ trợ trả góp 0% qua thẻ tín dụng hoặc công ty tài chính.',
        '',
        'Hệ thống chuỗi của mình hiện tại có khoảng bao nhiêu cửa hàng và anh/chị đang quản lý tồn kho tập trung bằng phần mềm ERP nào chưa ạ?',
      ].join('\n');
    }

    if (hasSpecialized) {
      return [
        'Dạ, đối với **website chuyên một dòng sản phẩm gia dụng (hoặc hãng sản xuất riêng)**, DUDI sẽ tập trung tối đa vào trải nghiệm thương hiệu và làm nổi bật tính năng sản phẩm:',
        '1. **Trang chi tiết sản phẩm 3D/Video**: Trưng bày cấu tạo bên trong, video hướng dẫn sử dụng chi tiết và các chứng chỉ chất lượng.',
        '2. **Đăng ký bảo hành điện tử**: Khách kích hoạt bảo hành bằng số Serial/IMEI trực tiếp trên website, theo dõi lịch sử bảo hành nhanh chóng.',
        '3. **Cửa hàng phụ kiện đi kèm**: Gợi ý các phụ kiện thay thế tương thích (ví dụ: màng lọc cho máy lọc không khí) ngay dưới sản phẩm chính.',
        '',
        'Dòng sản phẩm gia dụng chủ lực của bên mình là gì và anh/chị đã có sẵn các tài liệu kỹ thuật, video hướng dẫn của sản phẩm chưa ạ?',
      ].join('\n');
    }

    return [
      'Đây là nhóm Website/Hệ thống ngành Đồ gia dụng & Thiết bị Nhà bếp.',
      'DU - DUDI Software tư vấn giải pháp tối ưu cho ngành hàng gia dụng:',
      '1. **Danh mục sản phẩm chi tiết**: Phân loại theo chủng loại (bếp, tủ lạnh, máy giặt...), thương hiệu, khoảng giá, thông số kỹ thuật.',
      '2. **So sánh sản phẩm**: Tính năng so sánh thông số kỹ thuật giữa các model giúp khách quyết định mua nhanh hơn.',
      '3. **Giỏ hàng & Đặt hàng online**: Luồng đặt hàng rõ ràng, hỗ trợ giao hàng tận nơi hoặc nhận tại cửa hàng.',
      '4. **Bảo hành & Dịch vụ sau bán**: Đăng ký bảo hành, tra cứu trạng thái bảo hành và đặt lịch sửa chữa online.',
      '',
      'Anh/chị muốn làm website cho chuỗi cửa hàng điện máy/gia dụng, hay cửa hàng chuyên một dòng sản phẩm nhất định ạ?',
    ].join('\n');
  }

  if (/\bxay\s*dung|kien\s*truc|noi\s*that|decor\b/.test(normalizedCurrentMessage) && !/\b(crm|erp|phan\s*mem|he\s*thong|quan\s*ly|app|mobile|chatbot|rag|cloud)\b/.test(normalizedCurrentMessage)) {
    const hasConstruction = /\b(xay\s*dung|kien\s*truc|thau|cong\s*trinh|du\s*an)\b/.test(normalizedCurrentMessage);
    const hasFurniture = /\b(noi\s*cat|noi\s*that|decor|ban|ghe|giuong|tu|trang\s*tri)\b/.test(normalizedCurrentMessage);

    if (hasConstruction) {
      return [
        'Dạ, đối với **website giới thiệu công ty xây dựng / kiến trúc**, trọng tâm là xây dựng uy tín qua hồ sơ năng lực và các công trình thực tế:',
        '1. **Kho dự án Portfolio chất lượng**: Trưng bày hình ảnh độ nét cao trước/sau thi công, thông tin vật liệu, quy mô và đánh giá của chủ đầu tư.',
        '2. **Bảng tính dự toán chi phí xây dựng**: Công cụ tự động tính toán chi phí sơ bộ dựa trên diện tích sàn, số tầng và gói vật tư khách chọn.',
        '3. **Giới thiệu đội ngũ kiến trúc sư**: Hồ sơ kinh nghiệm, bằng cấp của đội ngũ kỹ sư/kiến trúc sư để gia tăng niềm tin.',
        '',
        'Công ty mình chuyên về xây dựng nhà phố biệt thự dân dụng hay thi công các công trình công nghiệp/dự án lớn ạ?',
      ].join('\n');
    }

    if (hasFurniture) {
      return [
        'Dạ, đối với **website bán đồ nội thất & trang trí nhà cửa**, giao diện cần mang lại cảm giác ấm cúng, sang trọng và kích thích mua sắm:',
        '1. **Hình ảnh phối cảnh phòng (Room Builder)**: Cho phép khách mua trọn bộ nội thất theo phong cách phòng mẫu (phòng khách, phòng ngủ) chỉ với 1 cú click.',
        '2. **Bộ lọc chất liệu & kích thước**: Lọc sản phẩm chi tiết theo loại gỗ, chất liệu da/vải, kích thước chiều rộng/chiều dài phù hợp với không gian nhà.',
        '3. **Tích hợp vận chuyển & lắp đặt**: Cấu hình phí ship đặc thù (hàng cồng kềnh), tùy chọn dịch vụ bê vác lên tầng hoặc lắp đặt tận nơi.',
        '',
        'Anh/chị bán các sản phẩm nội thất đóng sẵn hay nhận thiết kế và thi công nội thất may đo theo yêu cầu ạ?',
      ].join('\n');
    }

    return [
      'Đây là nhóm Website ngành Xây dựng, Kiến trúc & Nội thất.',
      'Đặc thù ngành này là bán uy tín qua các công trình thực tế, DU - DUDI Software sẽ tập trung:',
      '1. **Hồ sơ công trình (Portfolio)**: Trưng bày dự án hoàn thiện chất lượng cao kèm ảnh thực tế trước/sau thi công.',
      '2. **Bảng tính dự toán chi phí**: Công cụ tự động tính toán chi phí xây dựng/thiết kế sơ bộ dựa trên diện tích.',
      '3. **Quy trình làm việc chuyên nghiệp**: Giới thiệu các giai đoạn từ khảo sát, thiết kế đến giám sát thi công.',
      '4. **Form đăng ký tư vấn/khảo sát**: Thu thập thông tin diện tích, nhu cầu và ngân sách để tư vấn viên liên hệ báo giá.',
      '',
      'Anh/chị muốn thiết kế website giới thiệu công ty xây dựng, hay trang bán đồ nội thất & trang trí nhà cửa ạ?',
    ].join('\n');
  }

  if (/\blogistics|van\s*chuyen|giao\s*hang|ship\b/.test(normalizedCurrentMessage) && !/\b(ban\s*hang|e\s*commerce|ecommerce|shop|cua\s*hang|web\s*ban\s*hang)\b/.test(normalizedMessage)) {
    const hasIntro = /\b(gioi\s*thieu|dich\s*vu|lien\s*tinh|quoc\s*te|chuyen\s*phat)\b/.test(normalizedCurrentMessage);
    const hasInternalSystem = /\b(he\s*thong|quan\s*tri|noi\s*bo|van\s*hanh|kho|logistics)\b/.test(normalizedCurrentMessage);

    if (hasIntro) {
      return [
        'Dạ, đối với **website giới thiệu dịch vụ vận chuyển (Chuyển phát nhanh / Forwarding)**, giải pháp sẽ tập trung vào sự tiện lợi cho khách hàng gửi tin tưởng:',
        '1. **Tra cứu mã vận đơn (Tracking)**: Khách nhập mã vận đơn để kiểm tra ngay trạng thái và hành trình thực tế của gói hàng.',
        '2. **Công cụ ước tính cước phí**: Khách nhập trọng lượng, kích thước, địa chỉ gửi/nhận để tính toán nhanh cước phí dự kiến.',
        '3. **Tìm kiếm bưu cục gần nhất**: Bản đồ tương tác hiển thị danh sách các điểm bưu cục nhận hàng kèm giờ mở cửa.',
        '',
        'Dịch vụ vận chuyển của mình chuyên về vận tải hàng không/đường biển quốc tế hay chuyển phát nhanh nội địa ạ?',
      ].join('\n');
    }

    if (hasInternalSystem) {
      return [
        'Dạ, đối với **hệ thống quản trị kho & vận hành logistics nội bộ (WMS / TMS)**, DUDI Software sẽ xây dựng giải pháp số hóa toàn bộ luồng vận hành:',
        '1. **Quản lý đội xe & Tuyến giao hàng**: Lên lộ trình giao nhận tối ưu cho tài xế, theo dõi lượng tiêu thụ nhiên liệu và tiến độ giao hàng.',
        '2. **Quản lý kho phân loại (Sorting Warehouse)**: Số hóa quy trình nhập kho bãi, quét mã phân loại hàng theo khu vực quận/huyện bằng máy quét cầm tay.',
        '3. **Cổng đối soát COD tự động**: Hệ thống tính toán đối soát tài chính COD định kỳ cho khách hàng gửi hàng, tự động đối soát với tài khoản ngân hàng.',
        '',
        'Đội xe vận chuyển của bên mình hiện tại có khoảng bao nhiêu tài xế và mình có cần tích hợp API kết nối với các sàn TMĐT lớn không ạ?',
      ].join('\n');
    }

    return [
      'Đây là nhóm Website/Hệ thống Vận chuyển & Logistics.',
      'DU - DUDI Software xây dựng giải pháp hỗ trợ tối đa quy trình gửi hàng và tra cứu đơn hàng:',
      '1. **Tra cứu vận đơn (Tracking)**: Khách hàng nhập mã vận đơn để theo dõi thời gian thực hành trình gói hàng.',
      '2. **Ước tính cước phí tự động**: Tính toán phí giao hàng dựa trên trọng lượng, kích thước và địa điểm gửi/nhận.',
      '3. **Quản lý bưu cục/kho bãi**: Bản đồ hiển thị danh sách các điểm gửi hàng gần nhất.',
      '4. **Cổng thông tin khách hàng**: Đăng đơn gửi hàng hàng loạt, quản lý COD và đối soát tài chính đối với các shop bán hàng.',
      '',
      'Anh/chị cần làm website giới thiệu dịch vụ vận chuyển liên tỉnh/quốc tế hay hệ thống quản trị kho & vận hành logistics nội bộ ạ?',
    ].join('\n');
  }

  if (/\btai\s*chinh|ngan\s*hang|bao\s*hiem|chung\s*khoan\b/.test(normalizedCurrentMessage)) {
    const hasIntro = /\b(gioi\s*thieu|dich\s*vu|cong\s*thong\s*tin)\b/.test(normalizedCurrentMessage);
    const hasLoanApp = /\b(vay|khoan\s*vay|dang\s*ky|app|ung\s*dung|truc\s*tuyen)\b/.test(normalizedCurrentMessage);

    if (hasIntro) {
      return [
        'Dạ, đối với **cổng thông tin giới thiệu dịch vụ tài chính / ngân hàng / bảo hiểm**, DUDI Software tập trung vào độ tin cậy và bảo mật thông tin tối đa:',
        '1. **Bảo mật mã hóa dữ liệu**: Cấu hình chứng chỉ bảo mật cao cấp (SSL/TLS), bảo vệ dữ liệu điền form của khách hàng.',
        '2. **Bảng tính lãi suất / Gói vay**: Công cụ cho phép khách hàng ước tính khoản trả góp hàng tháng dựa trên số tiền vay, kỳ hạn và lãi suất.',
        '3. **Hệ thống tin tức phân tích**: Chia sẻ kiến thức đầu tư, biến động thị trường hoặc cẩm nang tài chính để tối ưu điểm chất lượng SEO.',
        '',
        'Hệ thống của bên mình chuyên về dịch vụ tài chính tiêu dùng, đại lý phân phối bảo hiểm hay tư vấn đầu tư chứng khoán ạ?',
      ].join('\n');
    }

    if (hasLoanApp) {
      return [
        'Dạ, đối với **ứng dụng đăng ký khoản vay trực tuyến (Loan Application System)**, quy trình sẽ được tự động hóa từ đăng ký đến phê duyệt sơ bộ:',
        '1. **Định danh điện tử (eKYC)**: Tích hợp công nghệ nhận diện khuôn mặt, chụp ảnh CCCD để xác minh danh tính ứng viên tự động.',
        '2. **Chấm điểm tín dụng sơ bộ**: Hệ thống tự động phân tích dữ liệu thu nhập, lịch sử công việc để chấm điểm tín dụng ban đầu.',
        '3. **Cổng phê duyệt nội bộ**: Dashboard dành cho kiểm soát viên phê duyệt hồ sơ vay, lưu trữ tài liệu hợp đồng số hóa.',
        '',
        'Hệ thống đăng ký vay của bên mình dự kiến phục vụ phân khúc khách hàng cá nhân hay doanh nghiệp nhỏ và vừa ạ?',
      ].join('\n');
    }

    return [
      'Đây là nhóm Website ngành Tài chính, Ngân hàng & Bảo hiểm.',
      'Giải pháp từ DU - DUDI Software luôn tuân thủ các chuẩn mực về độ tin cậy và tính bảo mật thông tin tối đa:',
      '1. **Giới thiệu giải pháp**: Chi tiết các gói vay tiêu dùng, vay thế chấp, bảo hiểm nhân thọ/sức khỏe.',
      '2. **Công cụ tính lãi suất**: Giúp khách hàng ước tính số tiền trả góp hàng tháng theo dư nợ giảm dần.',
      '3. **Đăng ký tư vấn trực tuyến**: Form thu thập nhu cầu tài chính an toàn để nhân viên liên hệ tư vấn.',
      '4. **Hệ thống bảo mật SSL/TLS**: Mã hóa toàn bộ dữ liệu trao đổi giữa khách hàng và máy chủ.',
      '',
      'Anh/chị cần xây dựng cổng thông tin giới thiệu dịch vụ tài chính hay ứng dụng đăng ký khoản vay trực tuyến ạ?',
    ].join('\n');
  }

  if (/\btuyen\s*dung|viec\s*lam|tuyen\s*nhan\s*su\b/.test(normalizedCurrentMessage)) {
    const hasInternal = /\b(noi\s*bo|tap\s*doan|doanh\s*nghiep)\b/.test(normalizedCurrentMessage);
    const hasJobBoard = /\b(ket\s*noi|job|board|san|da\s*nganh|nhieu\s*cong\s*ty)\b/.test(normalizedCurrentMessage);

    if (hasInternal) {
      return [
        'Dạ, đối với **website tuyển dụng nội bộ cho doanh nghiệp/tập đoàn (ATS - Applicant Tracking System)**, giải pháp giúp chuyên nghiệp hóa công tác săn nhân tài:',
        '1. **Quản lý tin tuyển dụng**: Đăng tuyển tin nhanh, phân loại vị trí trống theo phòng ban, chi nhánh.',
        '2. **Hệ thống lọc hồ sơ (ATS)**: Lưu trữ và tự động chấm điểm CV nộp vào dựa trên từ khóa kỹ năng, kinh nghiệm.',
        '3. **Quy trình duyệt hồ sơ (Workflow)**: Phân quyền cho Trưởng bộ phận duyệt CV, lên lịch phỏng vấn và gửi email mời phỏng vấn tự động.',
        '',
        'Doanh nghiệp của bên mình hiện tại có nhu cầu tuyển dụng khoảng bao nhiêu vị trí mỗi tháng và có cần kết nối với hệ thống phần mềm nhân sự HRM nội bộ không ạ?',
      ].join('\n');
    }

    if (hasJobBoard) {
      return [
        'Dạ, đối với **cổng thông tin kết nối việc làm (Job Board)**, DUDI sẽ xây dựng một sàn giao dịch việc làm chuyên nghiệp:',
        '1. **Cổng nhà tuyển dụng (Employer Portal)**: Doanh nghiệp ngoài tự đăng ký tài khoản, đăng tin tuyển dụng (miễn phí hoặc thu phí), quản lý CV ứng cử.',
        '2. **Cổng ứng viên (Candidate Portal)**: Ứng viên đăng ký, tạo hồ sơ trực tuyến, upload CV file PDF và nhấn nộp đơn trực tiếp.',
        '3. **Bộ lọc & Tìm kiếm nâng cao**: Tìm kiếm công việc theo Ngành nghề, Mức lương, Địa điểm, Cấp bậc và Hình thức làm việc.',
        '4. **Tự động gợi ý việc làm**: Bot tự động phân tích sở thích ứng viên để gửi email gợi ý các vị trí phù hợp hàng tuần.',
        '',
        'Anh/chị muốn làm trang web kết nối việc làm tập trung vào một phân khúc đặc thù (ví dụ: IT, lao động phổ thông) hay trang đa ngành nghề ạ?',
      ].join('\n');
    }

    return [
      'Đây là nhóm Website Tuyển dụng & Kết nối việc làm.',
      'DU - DUDI Software cung cấp nền t trì kết nối ứng viên và nhà tuyển dụng chuyên nghiệp:',
      '1. **Bộ lọc công việc thông minh**: Khách tìm kiếm theo ngành nghề, địa điểm, mức lương và hình thức làm việc.',
      '2. **Quản lý CV ứng viên**: Ứng viên tự tạo hồ sơ, tải lên CV cá nhân và nhấn ứng tuyển trực tiếp.',
      '3. **Cổng thông tin nhà tuyển dụng**: Đăng tin tuyển dụng mới, quản lý danh sách hồ sơ nộp vào và tương tác với ứng viên.',
      '4. **Gợi ý công việc tự động**: Hệ thống tự động gửi các công việc phù hợp qua email hoặc thông báo dựa trên hồ sơ của ứng viên.',
      '',
      'Anh/chị muốn làm trang web tuyển dụng nội bộ cho tập đoàn hay cổng thông tin kết nối việc làm đa ngành nghề ạ?',
    ].join('\n');
  }

  if (/\bluat|phap\s*luat|luat\s*su|tu\s*van\s*luat\b/.test(normalizedCurrentMessage)) {
    const hasIntro = /\b(gioi\s*thieu|van\s*phong|luat\s*su|hang\s*luat)\b/.test(normalizedCurrentMessage);
    const hasOnlineQnA = /\b(truc\s*tuyen|online|hoi\s*dap|diendan|dien\s*dan|tu\s*van)\b/.test(normalizedCurrentMessage);

    if (hasIntro) {
      return [
        'Dạ, đối với **website giới thiệu văn phòng luật sư / hãng luật**, mục tiêu là xây dựng hình ảnh chuyên nghiệp và tạo sự tin tưởng tuyệt đối cho khách hàng:',
        '1. **Hồ sơ Luật sư chi tiết**: Giới thiệu kinh nghiệm, lĩnh vực chuyên sâu, các vụ án nổi bật đã bào chữa thành công của từng luật sư.',
        '2. **Lĩnh vực hành nghề**: Trình bày rõ ràng các dịch vụ pháp lý (Luật doanh nghiệp, Hình sự, Dân sự, Sở hữu trí tuệ, Đất đai...).',
        '3. **Đặt lịch hẹn tư vấn**: Khách chủ động chọn luật sư tư vấn, ngày giờ hẹn và hình thức gặp mặt (tại văn phòng luật hoặc qua video call).',
        '',
        'Văn phòng luật của bên mình hiện tại có khoảng bao nhiêu luật sư thành viên và mình chuyên về mảng tư vấn doanh nghiệp hay tranh tụng cá nhân ạ?',
      ].join('\n');
    }

    if (hasOnlineQnA) {
      return [
        'Dạ, đối với **cổng thông tin hỏi đáp pháp luật trực tuyến**, hệ thống sẽ hỗ trợ kết nối khách hàng với các luật sư hỗ trợ giải đáp nhanh chóng:',
        '1. **Gửi câu hỏi ẩn danh**: Khách hàng đăng câu hỏi pháp lý lên diễn đàn hỏi đáp mà không bị lộ thông tin cá nhân.',
        '2. **Hệ thống duyệt & Trả lời**: Luật sư duyệt câu hỏi và viết câu trả lời chính thức, tự động hiển thị trên trang chủ để tăng SEO.',
        '3. **Trả phí tư vấn nhanh**: Tích hợp thanh toán trực tuyến để khách trả phí khi yêu cầu luật sư trả lời khẩn cấp trong vòng 2 giờ.',
        '',
        'Anh/chị muốn làm trang hỏi đáp mở cho cộng đồng tự thảo luận hay chỉ cho phép các luật sư được phê duyệt trả lời chính thức thôi ạ?',
      ].join('\n');
    }

    return [
      'Đây là nhóm Website Văn phòng Luật & Tư vấn Pháp luật.',
      'Website chuyên nghiệp giúp xây dựng niềm tin vững chắc đối với thân chủ, DU - DUDI Software sẽ tư vấn:',
      '1. **Giới thiệu đội ngũ Luật sư**: Hồ sơ chi tiết, học hàm học vị và các vụ án nổi bật đã xử lý của từng luật sư.',
      '2. **Các lĩnh vực tư vấn pháp lý**: Phân loại rõ ràng (Luật dân sự, Hình sự, Doanh nghiệp, Đầu tư, Sở hữu trí tuệ...).',
      '3. **Đặt lịch hẹn tư vấn**: Đăng ký ngày giờ, chọn hình thức tư vấn (trực tiếp tại văn phòng hoặc online).',
      '4. **Thư viện văn bản & tin tức**: Chia sẻ các kiến thức luật pháp mới nhất, tăng điểm chất lượng SEO.',
      '',
      'Anh/chị muốn làm website giới thiệu văn phòng luật sư hay cổng thông tin hỏi đáp tư vấn pháp luật trực tuyến ạ?',
    ].join('\n');
  }

  if (/\bthu\s*cung|pet|cho\s*meo|vet\b/.test(normalizedCurrentMessage)) {
    const hasShop = /\b(shop|ban|phu\s*kien|thuc\s*an|cat\s*sand|catnip|do\s*choi)\b/.test(normalizedCurrentMessage);
    const hasBooking = /\b(dat\s*lich|spa|khach\s*san|grooming|hotel|dich\s*vu)\b/.test(normalizedCurrentMessage);

    if (hasShop) {
      return [
        'Dạ, đối với **website pet shop bán phụ kiện / thức ăn thú cưng**, giao diện sẽ rất đáng yêu, nhiều màu sắc và tối ưu luồng mua sắm:',
        '1. **Lọc theo chủng loại Pet**: Khách hàng chọn xem nhanh đồ cho Chó, Mèo, Chim hay Chuột Hamster chỉ bằng 1 click.',
        '2. **Quản lý biến thể đa dạng**: Phân loại sản phẩm dễ dàng theo trọng lượng (bao 1kg, 5kg), hương vị (vị cá hồi, vị thịt gà) hoặc kích thước quần áo pet.',
        '3. **Gợi ý sản phẩm kèm theo**: Gợi ý các sản phẩm bổ trợ (như mua hạt tặng kèm bát ăn) ngay tại trang giỏ hàng.',
        '',
        'Cửa hàng pet shop của mình hiện có khoảng bao nhiêu mã sản phẩm và có cần đồng bộ kho với POS tại cửa hàng không ạ?',
      ].join('\n');
    }

    if (hasBooking) {
      return [
        'Dạ, đối với **website tích hợp hệ thống đặt lịch dịch vụ thú cưng (Pet Spa / Grooming / Pet Hotel)**, DUDI Software thiết kế cổng đặt chỗ tiện lợi:',
        '1. **Chọn dịch vụ & Cân nặng Pet**: Khách chọn dịch vụ (tắm, tỉa lông, giữ theo ngày) và nhập cân nặng của pet để hệ thống tự động tính giá chính xác.',
        '2. **Quản lý ca làm việc**: Giám sát số lượng pet tại bưu cục/cửa hàng theo từng khung giờ để tránh quá tải ca dịch vụ.',
        '3. **Nhật ký chăm sóc**: Cho phép nhân viên cập nhật hình ảnh pet đang ăn/tắm lên hệ thống để chủ nuôi theo dõi từ xa.',
        '',
        'Cửa hàng của mình có bao nhiêu chi nhánh cung cấp dịch vụ spa thú cưng và mình muốn khách thanh toán cọc online hay trả tại quầy ạ?',
      ].join('\n');
    }

    return [
      'Đây là nhóm Website Pet Shop & Dịch vụ Thú cưng.',
      'Giao diện đáng yêu, trực quan kết hợp các tính năng mua sắm và chăm sóc thú cưng tiện lợi:',
      '1. **Cửa hàng phụ kiện/thức ăn**: Giỏ hàng, bộ lọc sản phẩm theo chủng loại pet (chó, mèo, vẹt, hamster).',
      '2. **Đặt lịch dịch vụ (Pet Spa/Pet Hotel)**: Đăng ký dịch vụ tắm rửa, tỉa lông hoặc gửi thú cưng theo ngày.',
      '3. **Blog cẩm nang chăm sóc**: Chia sẻ kiến thức nuôi dạy thú cưng, thu hút lượng lớn khách hàng tiềm năng.',
      '4. **Quản lý lịch hẹn**: Nhân viên nhận lịch hẹn chăm sóc, sắp xếp ca làm việc và gửi thông báo nhắc lịch cho khách.',
      '',
      'Anh/chị muốn xây dựng trang web bán phụ kiện/thức ăn thú cưng hay tích hợp thêm hệ thống đặt lịch Spa/Khách sạn thú cúng ạ?',
    ].join('\n');
  }

  if (/\bnha\s*khoa|phong\s*kham|suc\s*khoe|y\s*te\b/.test(normalizedCurrentMessage)) {
    const hasIntro = /\b(gioi\s*thieu|thong\s*tin|dich\s*vu|bang\s*gia|ho\s*so)\b/.test(normalizedCurrentMessage);
    const hasCrmBooking = /\b(crm|quan\s*ly|he\s*thong|dat\s*lich|lich\s*hen|benh\s*nhan)\b/.test(normalizedCurrentMessage);

    if (hasIntro) {
      return [
        'Dạ, đối với **website giới thiệu phòng khám / nha khoa**, DUDI tập trung tối ưu hình ảnh chuyên nghiệp và minh bạch thông tin để thu hút bệnh nhân mới:',
        '1. **Hồ sơ đội ngũ bác sĩ**: Trưng bày chi tiết kinh nghiệm công tác, bằng cấp chuyên môn và các chứng chỉ y khoa uy tín.',
        '2. **Chi tiết dịch vụ & Bảng giá**: Giới thiệu cụ thể quy trình điều trị (ví dụ: bọc răng sứ, niềng răng, khám tổng quát) kèm bảng giá công khai.',
        '3. **Đánh giá thực tế (Reviews)**: Chia sẻ các câu chuyện điều trị thành công (hình ảnh trước/sau điều trị) để gia tăng niềm tin.',
        '',
        'Phòng khám của bên mình chuyên về lĩnh vực nào (nha khoa thẩm mỹ, phòng khám đa khoa, nhi khoa...) và anh/chị đã có sẵn tư liệu hình ảnh chưa ạ?',
      ].join('\n');
    }

    if (hasCrmBooking) {
      return [
        'Dạ, đối với **hệ thống quản lý lịch hẹn khám tích hợp CRM (Dental/Clinic CRM)**, quy trình đặt lịch và chăm sóc bệnh nhân sẽ được số hóa khép kín:',
        '1. **Đặt lịch hẹn theo Bác sĩ & Khung giờ**: Bệnh nhân chủ động đặt lịch khám, chọn bác sĩ chuyên khoa và giờ trống phù hợp trực tiếp trên web.',
        '2. **Nhắc lịch tái khám tự động**: Hệ thống tự động gửi tin nhắn nhắc nhở (Zalo/SMS) trước giờ khám 1 ngày, hoặc nhắc lịch hẹn tái khám định kỳ (6 tháng/lần).',
        '3. **Quản lý Hồ sơ Bệnh án điện tử (EMR)**: Lưu trữ lịch sử khám bệnh, đơn thuốc, phim chụp X-quang của bệnh nhân an toàn trên hệ thống cloud.',
        '',
        'Phòng khám của bên mình hiện tại có khoảng bao nhiêu bác sĩ trực ca và mình có cần đồng bộ lịch hẹn với phần mềm HIS sẵn có không ạ?',
      ].join('\n');
    }

    return [
      'Đây là nhóm Website Nha Khoa / Phòng Khám / Sức Khỏe.',
      'Với dự án Nha khoa & Y tế, DU - DUDI Software thường tư vấn các tính năng chuyên ngành:',
      '1. **Đặt lịch hẹn trực tuyến**: Chọn bác sĩ chuyên khoa, chọn dịch vụ và thời gian khám tiện lợi.',
      '2. **Hồ sơ bác sĩ**: Giới thiệu kinh nghiệm, chứng chỉ chuyên môn của đội ngũ y bác sĩ.',
      '3. **Danh mục dịch vụ & bảng giá**: Trưng bày rõ ràng các gói dịch vụ (như nhổ răng, bọc sứ, khám tổng quát...).',
      '4. **Đánh giá & Review**: Phản hồi thực tế từ những khách hàng đã khám và điều trị.',
      '',
      'Anh/chị muốn làm website giới thiệu phòng khám/nha khoa, hay cần hệ thống quản lý lịch hẹn khám tích hợp CRM ạ?',
    ].join('\n');
  }



  if (hasUiUx) {
    const hasNewWeb = /\b(web|website)\b/.test(normalizedCurrentMessage);
    const hasNewApp = /\b(app|mobile)\b/.test(normalizedCurrentMessage);
    const hasRedesign = /\b(lam\s*moi|nang\s*cap|cu|hien\s*tai|redesign)\b/.test(normalizedCurrentMessage);

    if (hasNewWeb) {
      return [
        'Dạ, thiết kế **UI/UX cho Website mới** tập trung vào cấu trúc thông tin khoa học và giao diện ấn tượng:',
        '1. **Nghiên cứu hành vi (UX Research)**: Vẽ bản đồ hành trình người dùng (User Journey Map) để đảm bảo khách dễ dàng tìm thấy thông tin cần thiết.',
        '2. **Thiết kế giao diện hiện đại (UI)**: Sử dụng các xu hướng thiết kế cao cấp, phối màu và typography hài hòa, làm nổi bật bản sắc thương hiệu.',
        '3. **Xây dựng Wireframe & Prototype**: Tạo bản mô phỏng tương tác giúp anh/chị trải nghiệm thử website trước khi tiến hành lập trình.',
        '',
        'Anh/chị muốn thiết kế website giới thiệu doanh nghiệp hay website bán hàng/e-commerce có luồng thanh toán phức tạp ạ?',
      ].join('\n');
    }

    if (hasNewApp) {
      return [
        'Dạ, thiết kế **UI/UX cho Mobile App** tối ưu hóa các tương tác chạm, vuốt trên màn hình di động nhỏ gọn:',
        '1. **Mobile-First Design**: Đảm bảo tất cả các nút bấm, menu, form điền thông tin đều nằm trong vùng tương tác thoải mái của ngón tay.',
        '2. **Thiết kế Design System**: Xây dựng bộ quy chuẩn giao diện (Buttons, Inputs, Icons) đồng bộ để các lập trình viên phát triển app nhanh chóng và nhất quán.',
        '3. **Prototype động**: Bản chạy thử mô phỏng toàn bộ luồng chuyển màn hình mượt mà như app thật.',
        '',
        'App của mình là app chạy trên cả iOS & Android và hướng tới đối tượng người dùng đại chúng hay nội bộ doanh nghiệp ạ?',
      ].join('\n');
    }

    if (hasRedesign) {
      return [
        'Dạ, **làm mới / Redesign giao diện hệ thống hiện tại** tập trung cải thiện trải nghiệm người dùng và gia tăng tỷ lệ chuyển đổi:',
        '1. **Đánh giá hiện trạng (UX Audit)**: Phân tích các điểm nghẽn (pain points) trên giao diện cũ khiến người dùng rời bỏ trang.',
        '2. **Hiện đại hóa giao diện**: Thay đổi phong cách thiết kế tối giản, sạch sẽ, cập nhật các xu hướng giao diện thịnh hành.',
        '3. **Tối ưu hóa luồng tương tác**: Giảm bớt các bước rườm rà trong quá trình đặt hàng, đăng ký hoặc điền form để khách thao tác nhanh hơn.',
        '',
        'Anh/chị có thể chia sẻ link hệ thống hiện tại và chia sẻ thêm về những phản hồi tiêu cực của người dùng (nếu có) về giao diện cũ không ạ?',
      ].join('\n');
    }

    return [
      '🎨 Dịch vụ Thiết kế UI/UX Chuyên nghiệp tại DUDI Software:',
      '1. **Thiết kế giao diện tinh tế, hiện đại**: Đảm bảo chuẩn nhận diện thương hiệu của doanh nghiệp.',
      '2. **Tối ưu trải nghiệm người dùng (UX)**: Tối ưu trên cả giao diện di động và máy tính.',
      '3. **Xây dựng Prototype tương tác**: Cho phép trải nghiệm thử giao diện trước khi lập trình code.',
      '',
      'Anh/chị muốn thiết kế UI/UX cho website mới, app mobile hay làm mới giao diện hệ thống hiện tại ạ?',
    ].join('\n');
  }

  if (hasCloudDevops) {
    const hasNew = /\b(moi|he\s*thong\s*moi|trien\s*khai)\b/.test(normalizedCurrentMessage);
    const hasUpgrade = /\b(nang\s*cap|he\s*thong\s*cu|hien\s*tai|toi\s*uu|bao\s*tri)\b/.test(normalizedCurrentMessage);

    if (hasNew) {
      return [
        'Dạ, giải pháp **thiết kế hạ tầng Cloud cho hệ thống mới** hướng đến tính ổn định, bảo mật và khả năng mở rộng cao:',
        '1. **Thiết kế kiến trúc hệ thống (Architecture Design)**: Lựa chọn nhà cung cấp phù hợp (AWS, Google Cloud, Azure) và thiết kế hệ thống có tính sẵn sàng cao (High Availability).',
        '2. **Container hóa bằng Docker**: Đóng gói mã nguồn ứng dụng vào Docker container để chạy ổn định trên mọi môi trường.',
        '3. **Xây dựng đường ống CI/CD tự động**: Thiết lập quy trình tự động kiểm tra (test) và triển khai (deploy) ứng dụng khi lập trình viên cập nhật code mới.',
        '4. **Thiết lập giám sát (Monitoring & Alerting)**: Cấu hình Grafana, Prometheus để theo dõi sức khỏe máy chủ và tự động cảnh báo qua Telegram/Slack khi gặp sự cố.',
        '',
        'Hệ thống mới của mình là ứng dụng web, app mobile hay hệ thống xử lý dữ liệu lớn, và anh/chị dự kiến lượng người dùng truy cập đồng thời là khoảng bao nhiêu ạ?',
      ].join('\n');
    }

    if (hasUpgrade) {
      return [
        'Dạ, đối với **nâng cấp / tối ưu hóa hệ thống hiện tại**, DUDI Software sẽ giải quyết triệt để các vấn đề về hiệu năng và chi phí:',
        '1. **Tối ưu chi phí Cloud (Cost Optimization)**: Rà soát tài nguyên nhàn rỗi, cấu hình cơ chế tự động co giãn (Auto Scaling) để chỉ trả tiền cho lượng tài nguyên thực sự sử dụng.',
        '2. **Nâng cấp độ ổn định**: Chuyển đổi từ mô hình máy chủ đơn lẻ sang kiến trúc chịu lỗi (Fault-Tolerant), thiết lập cân bằng tải (Load Balancer).',
        '3. **Tăng tốc độ phản hồi**: Tích hợp các cổng CDN (như Cloudflare), bộ nhớ đệm Cache (Redis/Memcached) để tăng tốc tải trang đáng kể.',
        '4. **Harden bảo mật**: Thiết lập tường lửa (WAF), cấu hình phân quyền bảo mật IAM chi tiết và thiết lập sao lưu dữ liệu tự động (Auto Backup).',
        '',
        'Hạ tầng hiện tại của anh/chị đang gặp vấn đề gì lớn nhất (như chi phí quá cao, hệ thống hay bị sập khi đông người truy cập...) ạ?',
      ].join('\n');
    }

    return [
      '☁️ Dịch vụ Điện toán Đám mây & DevOps tại DUDI Software:',
      '1. **Triển khai hạ tầng Cloud**: Xây dựng kiến trúc AWS, Google Cloud, Docker ổn định.',
      '2. **Đảm bảo bảo mật & tự động co giãn**: Hệ thống tự động co giãn khi lượng truy cập tăng đột biến.',
      '3. **Cấu hình CI/CD**: Tự động hóa quy trình đóng gói và triển khai ứng dụng phần mềm.',
      '',
      'Anh/chị đang cần tư vấn hạ tầng Cloud cho hệ thống mới hay nâng cấp hệ thống hiện tại ạ?',
    ].join('\n');
  }

  if (hasChatbot) {
    const hasWeb = /\b(website|web)\b/.test(normalizedCurrentMessage);
    const hasSocial = /\b(fanpage|messenger|zalo|facebook|social)\b/.test(normalizedCurrentMessage);
    const hasInternal = /\b(noi\s*bo|nhan\s*vien|tai\s*lieu|slack|teams|wiki)\b/.test(normalizedCurrentMessage);
    const hasOmni = /\b(da\s*kenh|cskh|khach\s*hang)\b/.test(normalizedCurrentMessage);

    if (hasWeb) {
      return [
        'Dạ, tích hợp **AI Chatbot lên Website** giúp tối ưu hóa chuyển đổi và hỗ trợ khách hàng ngay tức thì:',
        '1. **Nhúng Widget chat thông minh**: Khách hàng nhấn vào bong bóng chat ở góc màn hình để hỏi đáp nhanh.',
        '2. **Đọc dữ liệu trang (Page Context)**: Chatbot tự động hiểu trang khách đang xem là sản phẩm nào để tư vấn phù hợp.',
        '3. **Tìm kiếm & Gợi ý sản phẩm**: AI truy vấn trực tiếp kho sản phẩm để trả về hình ảnh, thông số và link mua hàng tương ứng.',
        '4. **Form thu lead tự động**: Tự động xin số điện thoại, email của khách rồi đẩy về CRM hoặc Google Sheets cho đội sale.',
        '',
        'Trang web hiện tại của mình được xây dựng trên nền tảng nào (WordPress, React, Laravel...) và mình có muốn chatbot tự động mở khung chat chào khách không ạ?',
      ].join('\n');
    }

    if (hasSocial) {
      return [
        'Dạ, giải pháp **AI Chatbot đa kênh Social (Messenger, Zalo OA)** giúp tự động hóa phản hồi và nâng cao doanh số bán hàng:',
        '1. **Tự động trả lời Inbox & Comment**: Trả lời ngay lập tức các thắc mắc của khách, ẩn comment chứa số điện thoại để tránh bị đối thủ cướp khách.',
        '2. **Kịch bản chốt đơn tự động**: Dẫn dắt khách đi qua luồng chọn size, chọn màu, xin thông tin giao hàng và tạo đơn tự động.',
        '3. **Gửi tin nhắn hàng loạt (Broadcast)**: Gửi tin nhắn chương trình khuyến mãi đến hàng loạt khách hàng cũ đã từng inbox Fanpage (đúng quy định của Meta/Zalo).',
        '4. **Chuyển nhân viên tư vấn (Handover)**: Tự động chuyển giao cuộc hội thoại cho nhân viên trực fanpage khi khách yêu cầu tư vấn chuyên sâu.',
        '',
        'Mình muốn triển khai chatbot trên Facebook Fanpage hay trang Zalo OA trước, và trung bình một ngày fanpage của mình nhận được khoảng bao nhiêu inbox ạ?',
      ].join('\n');
    }

    if (hasInternal) {
      return [
        'Dạ, **AI Chatbot quản trị nội bộ** là trợ lý đắc lực hỗ trợ nhân viên tra cứu nhanh thông tin công việc:',
        '1. **Tra cứu tài liệu quy trình**: AI trả lời nhanh các câu hỏi về chính sách nhân sự, quy định nghỉ phép, tài liệu kỹ thuật hoặc quy trình vận hành.',
        '2. **Tích hợp Slack / MS Teams**: Nhân viên trò chuyện trực tiếp với bot ngay trên nền tảng làm việc hàng ngày của công ty.',
        '3. **Tự động tìm kiếm dự án**: Bot kết nối với Wiki nội bộ hoặc kho dự án cũ để trả lời các câu hỏi chuyên môn.',
        '4. **Tạo Ticket hỗ trợ**: Tự động tạo ticket IT/HR khi nhân viên báo lỗi máy tính hoặc cần cấp phát thiết bị.',
        '',
        'Hệ thống tài liệu nội bộ của bên mình hiện đang được lưu trữ ở đâu chủ yếu (Google Drive, Notion, Confluence hay file PDF/Word) ạ?',
      ].join('\n');
    }

    if (hasOmni) {
      return [
        'Dạ, giải pháp **AI Chatbot chăm sóc khách hàng đa kênh (Omnichannel RAG)** hợp nhất kiến thức của doanh nghiệp để phản hồi đồng bộ:',
        '1. **Cơ sở kiến thức tập trung (RAG)**: Chatbot học dữ liệu từ file tài liệu, website và kho FAQ chung của công ty để đảm bảo câu trả lời nhất quán trên mọi kênh.',
        '2. **Đồng bộ hóa Zalo, Facebook, Web**: Một câu trả lời chuẩn xác được áp dụng cho cả chat Zalo OA, Messenger và Website Livechat.',
        '3. **Ghi nhận thông tin vào CRM**: Tự động nhận diện nhu cầu khách hàng, phân loại mức độ tiềm năng và tạo lead trên CRM.',
        '',
        'Anh/chị muốn chatbot chỉ tự động trả lời các câu hỏi FAQ thường gặp hay cần tích hợp sâu để tra cứu trạng thái đơn hàng của khách hàng nữa ạ?',
      ].join('\n');
    }

    return [
      'Đây là nhóm AI chatbot/RAG.',
      'Hướng triển khai thường gồm: dùng dữ liệu riêng của doanh nghiệp, trả lời khách hàng, gợi ý dịch vụ, thu thập thông tin liên hệ, tạo ticket và chuyển nhân viên khi cần.',
      '',
      'Anh/chị muốn chatbot dùng cho website, fanpage, nội bộ doanh nghiệp hay chăm sóc khách hàng đa kênh ạ?',
    ].join('\n');
  }

  if (/\bbat\s*dong\s*san|nha\s*dat|ban\s*nha|mua\s*nha|cho\s*thue\s*nha|nha\s*pho|can\s*ho|chung\s*cu|dat\s*nen|bds\b/.test(normalizedCurrentMessage)) {
    const hasProject = /\b(du\s*an|project|chung\s*cu|can\s*ho)\b/.test(normalizedCurrentMessage);
    const hasListing = /\b(tin\s*dang|dang\s*tin|cho\s*thue|ban\s*nha|nha\s*rieng|dat\s*nen)\b/.test(normalizedCurrentMessage);
    const hasPortal = /\b(san\s*giao\s*dich|san|moi\s*gioi|broker|chu\s*dau\s*tu)\b/.test(normalizedCurrentMessage);

    if (hasProject) {
      return [
        'Dạ, đối với **website giới thiệu dự án Bất động sản (Landing Page dự án)**, DUDI Software tập trung tối đa vào trải nghiệm thị giác và thu hút khách hàng đăng ký:',
        '1. **Hình ảnh & Video 360 độ**: Tích hợp các tour thực tế ảo VR 360, sơ đồ mặt bằng tương tác giúp khách cảm nhận rõ nét về căn hộ/khu đô thị.',
        '2. **Thông tin dự án đầy đủ**: Vị trí bản đồ Google Maps, tiến độ thi công, tiện ích nội ngoại khu và chính sách bán hàng.',
        '3. **Form nhận bảng giá & tài liệu**: Nút kêu gọi hành động (CTA) nổi bật để khách để lại thông tin nhận tài liệu chi tiết.',
        '',
        'Dự án BĐS của bên mình đang mở bán là phân khúc căn hộ chung cư, đất nền hay biệt thự nghỉ dưỡng ạ?',
      ].join('\n');
    }

    if (hasListing) {
      return [
        'Dạ, đối với **website đăng tin bán / cho thuê nhà đất**, hệ thống sẽ hỗ trợ tính năng đăng tin nhanh và bộ lọc tìm kiếm tối ưu:',
        '1. **Bộ lọc vị trí & thuộc tính**: Khách hàng dễ dàng tìm kiếm nhà đất theo Tỉnh/Thành phố, Quận/Huyện, Mức giá, Diện tích, Hướng nhà và Số phòng ngủ.',
        '2. **Đăng tin trực quan**: Cho phép người dùng (hoặc môi giới nội bộ) tải lên hình ảnh, nhập mô tả chi tiết, định vị vị trí nhà đất trên bản đồ.',
        '3. **Duyệt tin tự động**: Trang quản trị (CMS) hỗ trợ duyệt tin đăng, cấu hình thời gian hiển thị tin và đẩy tin VIP lên đầu trang.',
        '',
        'Trang đăng tin của anh/chị dành riêng cho nhân viên công ty đăng bán, hay cho phép người dùng bên ngoài đăng tin tự do ạ?',
      ].join('\n');
    }

    if (hasPortal) {
      return [
        'Dạ, đối với **website sàn giao dịch môi giới Bất động sản**, hệ thống sẽ tích hợp các công cụ quản lý giỏ hàng và cộng tác viên mạnh mẽ:',
        '1. **Quản lý giỏ hàng tập trung (Inventory)**: Cập nhật trạng thái căn hộ (đã cọc, còn trống, đang giữ chỗ) thời gian thực cho toàn bộ đội ngũ kinh doanh.',
        '2. **Phân quyền Môi giới (Broker Account)**: Cấp tài khoản riêng cho từng môi giới, quản lý khách hàng tiềm năng và tính toán hoa hồng tự động.',
        '3. **Báo cáo hiệu suất**: Thống kê doanh số bán hàng của từng đội nhóm, tỷ lệ chốt cọc và hiệu quả các kênh marketing.',
        '',
        'Sàn môi giới của mình hiện tại có khoảng bao nhiêu nhân sự/cộng tác viên và mình đã có quy trình giữ chỗ cọc online chưa ạ?',
      ].join('\n');
    }

    return [
      'Đây là nhóm website/hệ thống Bất động sản.',
      'Với dự án Bất động sản, DUDI Software thường tư vấn các tính năng cốt lõi:',
      '1. Giao diện hiển thị dự án, danh sách nhà đất, lọc theo khu vực, mức giá, diện tích và vị trí.',
      '2. Trang chi tiết dự án: hình ảnh/video 360, vị trí bản đồ Google Maps, mặt bằng, tiện ích.',
      '3. Form đăng ký nhận bảng giá, đặt lịch xem nhà và tư vấn phong thủy.',
      '4. Hệ thống CMS quản lý tin đăng, phân quyền nhân viên kinh doanh / môi giới.',
      '',
      'Anh/chị muốn làm website giới thiệu dự án BĐS, trang tin đăng bán/cho thuê nhà đất hay sàn môi giới BĐS ạ?',
    ].join('\n');
  }

  if (/\bo\s*to|xe\s*hoi\b/.test(normalizedCurrentMessage)) {
    const hasShowroom = /\b(showroom|hang|hãng|gioi\s*thieu|dai\s*ly)\b/.test(normalizedCurrentMessage);
    const hasMarketplace = /\b(san|mua\s*ban|cu|moi|xe\s*cu|xe\s*moi)\b/.test(normalizedCurrentMessage);

    if (hasShowroom) {
      return [
        'Dạ, đối với **website giới thiệu hãng / showroom ô tô**, DUDI Software tập trung vào trải nghiệm thương hiệu đẳng cấp và công cụ hỗ trợ chọn xe:',
        '1. **Hình ảnh 360 độ & So sánh thông số**: Khách hàng tương tác xoay xe xem ngoại thất, so sánh chi tiết thông số kỹ thuật giữa các phiên bản xe.',
        '2. **Công cụ ước tính giá lăn bánh**: Tự động tính toán chi phí đăng ký, đăng kiểm, thuế trước bạ theo từng tỉnh thành để ra giá lăn bánh thực tế.',
        '3. **Đặt lịch lái thử & Bảo dưỡng**: Form đăng ký lái thử mẫu xe mong muốn hoặc đặt lịch hẹn bảo dưỡng/sửa chữa xe trực tuyến.',
        '',
        'Showroom của mình phân phối dòng xe của một hãng cụ thể hay phân phối đa thương hiệu ạ?',
      ].join('\n');
    }

    if (hasMarketplace) {
      return [
        'Dạ, đối với **website sàn mua bán ô tô cũ / mới**, hệ thống sẽ hỗ trợ tính năng đăng tin mua bán và kiểm định xe chuyên nghiệp:',
        '1. **Bộ lọc tìm kiếm ô tô chuyên sâu**: Khách dễ dàng lọc xe theo Hãng xe, Model, Năm sản xuất, Số Km đã đi (Odo), Kiểu dáng, Hộp số và Mức giá.',
        '2. **Đăng tin bán xe trực quan**: Cho phép chủ xe hoặc salon đăng tin bán xe kèm ảnh chụp chi tiết các góc ngoại nội thất và giấy tờ xe.',
        '3. **Công cụ định giá xe cũ**: Gợi ý mức giá bán phù hợp dựa trên dữ liệu thị trường và tình trạng xe thực tế.',
        '',
        'Sàn mua bán xe của mình dự kiến có tích hợp tính năng kiểm định xe hoặc hỗ trợ vay mua xe trả góp trực tuyến không ạ?',
      ].join('\n');
    }

    return [
      'Đây là nhóm website/hệ thống Showroom & Mua bán Ô tô.',
      'Với website Ô tô, DUDI Software thường tư vấn các module chính:',
      '1. Danh mục thông số kỹ thuật xe, hình ảnh 360, so sánh giá & phiên bản.',
      '2. Công cụ tính giá lăn bánh, ước tính trả góp ngân hàng hàng tháng.',
      '3. Form đăng ký lái thử, đặt lịch bảo dưỡng & nhận báo giá ưu đãi.',
      '4. Quản lý danh mục xe cũ/mới, kho phụ tùng và quản trị đại lý/showroom.',
      '',
      'Anh/chị muốn làm website giới thiệu hãng/showroom ô tô hay sàn mua bán ô tô cũ/mới ạ?',
    ].join('\n');
  }

  if (/\bdu\s*lich|tour|khach\s*san|homestay\b/.test(normalizedCurrentMessage)) {
    const hasTour = /\b(tour|ban\s*tour|lich\s*trinh|khoi\s*hanh)\b/.test(normalizedCurrentMessage);
    const hasStay = /\b(phong|khach\s*san|homestay|resort|dat\s*phong)\b/.test(normalizedCurrentMessage);
    const hasPortal = /\b(tong\s*hop|combo|ve\s*may\s*bay|vinh|combo\s*du\s*lich)\b/.test(normalizedCurrentMessage);

    if (hasTour) {
      return [
        'Dạ, đối với **website đặt Tour du lịch**, hệ thống sẽ tối ưu hóa lộ trình chi tiết và luồng đặt chỗ theo ngày khởi hành:',
        '1. **Lịch trình chi tiết (Itinerary)**: Trình bày sơ đồ chuyến đi theo từng ngày sinh động kèm hình ảnh, thông tin bữa ăn, khách sạn lưu trú.',
        '2. **Đặt tour theo ngày & số lượng**: Chọn ngày khởi hành cụ thể, tính giá tự động theo số lượng người lớn, trẻ em và trẻ sơ sinh.',
        '3. **Thanh toán giữ chỗ**: Hỗ trợ đặt cọc hoặc thanh toán 100% qua cổng trực tuyến, tự động gửi vé điện tử (E-ticket) qua Zalo/Email.',
        '',
        'Bên mình chuyên tổ chức các tour du lịch trong nước (inbound/outbound) hay các tour thiết kế riêng cho đoàn doanh nghiệp ạ?',
      ].join('\n');
    }

    if (hasStay) {
      return [
        'Dạ, đối với **website đặt phòng khách sạn / homestay / resort**, hệ thống giúp tối ưu hóa công suất phòng và tự động đặt phòng:',
        '1. **Kiểm tra phòng trống thời gian thực**: Khách nhập ngày nhận (Check-in) và ngày trả (Check-out) để xem danh sách phòng còn trống và bảng giá tương ứng.',
        '2. **Bộ lọc tiện ích phòng**: Lọc nhanh phòng theo loại giường (Single, Double), hướng nhìn (view biển, view thành phố) và các tiện ích (bể bơi, buffet sáng).',
        '3. **Đồng bộ kênh bán (Channel Manager)**: Kết nối dữ liệu phòng trống với Booking.com, Agoda, Airbnb để tránh overbooking.',
        '',
        'Hệ thống của mình là khách sạn đơn lẻ, chuỗi nhiều chi nhánh hay cổng kết nối nhiều homestay khác nhau ạ?',
      ].join('\n');
    }

    if (hasPortal) {
      return [
        'Dạ, đối với **hệ thống tổng hợp dịch vụ du lịch (Vé máy bay, Khách sạn, Tour, Combo)**, giải pháp sẽ kết nối API đa nguồn:',
        '1. **Tích hợp API Vé máy bay**: Kết nối trực tiếp hệ thống giữ chỗ của các hãng hàng không (Vietnam Airlines, Vietjet, Bamboo) để tra cứu vé rẻ nhất.',
        '2. **Gói Combo thông minh**: Tự động ghép vé máy bay và phòng khách sạn để tạo ra các gói combo du lịch giá ưu đãi cho khách.',
        '3. **Báo cáo doanh số và hoa hồng**: Theo dõi doanh thu từ các nguồn dịch vụ khác nhau, tính hoa hồng cho các đại lý liên kết.',
        '',
        'Anh/chị muốn xây dựng trang tổng hợp để làm đại lý bán vé/phòng của bên khác (Affiliate) hay trực tiếp phân phối sản phẩm của chính mình ạ?',
      ].join('\n');
    }

    return [
      'Đây là nhóm website Du lịch, Tour & Booking.',
      'DUDI Software thường tư vấn các module trọng tâm:',
      '1. Danh mục Tour, điểm đến, lịch trình chi tiết và bảng giá theo ngày.',
      '2. Hệ thống đặt Tour / đặt phòng online, kiểm tra số chỗ trống thực tế.',
      '3. Tích hợp thanh toán online, giữ chỗ và tự động gửi vé/xác nhận qua email/SMS.',
      '4. Quản lý lịch trình, hướng dẫn viên, báo cáo doanh thu và chăm sóc khách.',
      '',
      'Anh/chị muốn ưu tiên phần đặt Tour du lịch, booking phòng hay hệ thống tổng hợp du lịch ạ?',
    ].join('\n');
  }

  if (/\b(studio|chup\s*anh|nhiep\s*anh|anh\s*cuoi|quay\s*phim|media)\b/.test(normalizedCurrentMessage)) {
    return [
      'Dạ, đối với **website Studio / Chụp ảnh & Truyền thông (Media)**, DUDI Software thiết kế tập trung vào trải nghiệm hình ảnh nghệ thuật đỉnh cao:',
      '1. **Bộ sưu tập Album (Portfolio)**: Trình bày hình ảnh chất lượng cao (high-res) theo các chủ đề: Ảnh cưới, Ảnh gia đình, Baby, Concept thời trang mượt mà không làm chậm trang.',
      '2. **Bảng giá dịch vụ & Gói chụp**: Hiển thị rõ ràng các gói chụp (tiệc cưới, ngoại cảnh, studio) kèm quà tặng/album đi kèm.',
      '3. **Đặt lịch chụp & Tư vấn online**: Form đăng ký giữ ngày chụp, chọn ekip/nhiếp ảnh gia và tích hợp chat tư vấn trực tiếp.',
      '',
      'Studio của mình chuyên về chụp ảnh cưới, ảnh gia đình, thời trang hay quay phim sự kiện doanh nghiệp ạ?',
    ].join('\n');
  }

  if (/\b(logistics|van\s*chuyen|kho\s*bai|kho\s*hang|van\s*don|giao\s*hang)\b/.test(normalizedCurrentMessage)) {
    return [
      'Dạ, đối với **hệ thống Quản lý Vận chuyển & Logistics / Kho bãi**, DUDI Software cung cấp giải pháp tối ưu vận hành chuyên sâu:',
      '1. **Tra cứu vận đơn (Tracking)**: Khách hàng nhập mã vận đơn để theo dõi hành trình đơn hàng theo thời gian thực.',
      '2. **Quản lý Kho & Xuất nhập tồn**: Theo dõi vị trí hàng hóa trong kho, tự động cảnh báo tồn kho tối thiểu và tạo phiếu xuất nhập.',
      '3. **Tính phí vận chuyển tự động**: Cấu hình công thức tính cước phí theo khoảng cách (km), trọng lượng (kg) và loại phương tiện vận chuyển.',
      '4. **Phân quyền Tài xế & Nhân viên kho**: App/Web dành riêng cho tài xế cập nhật trạng thái giao hàng thành công.',
      '',
      'Hệ thống của mình phục vụ cho dịch vụ vận tải hàng hóa, giao nhận chặng cuối (last-mile delivery) hay quản lý kho nội bộ ạ?',
    ].join('\n');
  }

  if (/\b(thoi\s*trang|local\s*brand|quan\s*ao|tui\s*xach|giay\s*dep)\b/.test(normalizedCurrentMessage)) {
    return [
      'Dạ, đối với **website Thời trang & Local Brand**, DUDI Software chú trọng vào phong cách nhận diện riêng và trải nghiệm mua sắm mượt mà:',
      '1. **Trưng bày Lookbook & Bộ sưu tập**: Trình bày Lookbook sinh động, giúp khách hàng mua trọn bộ outfit (Shop the look) chỉ với 1 click.',
      '2. **Bảng quy đổi Size (Size Chart)**: Gợi ý chọn size chuẩn xác theo chiều cao, cân nặng để giảm tỷ lệ đổi trả hàng.',
      '3. **Mua hàng & Thanh toán đa kênh**: Giỏ hàng thông minh, hỗ trợ thanh toán online (Momo, VNPAY) hoặc COD, đồng bộ tồn kho với cửa hàng.',
      '',
      'Thương hiệu thời trang của mình định hình theo phong cách tối giản, cá tính local brand hay thời trang công sở ạ?',
    ].join('\n');
  }

  if (/\b(tuyen\s*dung|nhan\s*su|cv|nop\s*cv|viec\s*lam)\b/.test(normalizedCurrentMessage)) {
    return [
      'Dạ, đối với **website / Landing Page Tuyển dụng & Quản lý nhân sự**, DUDI Software xây dựng thương hiệu tuyển dụng chuyên nghiệp:',
      '1. **Đăng tin vị trí tuyển dụng**: Trưng bày danh sách vị trí đang tuyển (Job Listing), mô tả công việc (JD), mức lương và phúc lợi hấp dẫn.',
      '2. **Nộp CV trực tuyến**: Cho phép ứng viên tải lên file CV (PDF/Word), tự động bóc tách thông tin và đổ về hệ thống quản trị HR.',
      '3. **Quy trình phỏng vấn & Phản hồi**: Trang quản trị giúp phòng HR lọc CV, hẹn lịch phỏng vấn và gửi email tự động cho ứng viên.',
      '',
      'Anh/chị đang cần xây dựng trang tuyển dụng cho công ty hay cổng kết nối việc làm đa doanh nghiệp ạ?',
    ].join('\n');
  }

  if (/\bapp\b|\bmobile\b|\bios\b|\bandroid\b/.test(normalizedCurrentMessage)) {
    return [
      'Đây là nhóm mobile app iOS/Android.',
      'Khi tư vấn app, DUDI sẽ làm rõ luồng người dùng, UI/UX, đăng nhập, quản lý dữ liệu, thông báo, thanh toán, tích hợp API và phần quản trị đi kèm.',
      '',
      'Anh/chị muốn làm app cho bán hàng, booking, quản lý nội bộ hay chăm sóc khách hàng ạ?',
    ].join('\n');
  }

  if (/\bcrm\b|\berp\b|\bbooking\b|\bphan\s*mem\b/.test(normalizedCurrentMessage)) {
    return [
      'Đây là nhóm phần mềm quản lý doanh nghiệp/CRM/ERP/booking platform.',
      'Phần cần làm rõ thường là: quản lý khách hàng, đơn hàng, nhân sự, kho, lịch hẹn, báo cáo, phân quyền, workflow và tích hợp hệ thống sẵn có.',
      '',
      'Anh/chị muốn hệ thống phục vụ bộ phận nào trước: bán hàng, vận hành, nhân sự, kho hay chăm sóc khách hàng ạ?',
    ].join('\n');
  }

  if (isBroadEcommerceSelection(normalizedCurrentMessage)) {
    return [
      'Nhóm này là website bán hàng/e-commerce.',
      'Các phần thường cần làm gồm: giao diện bán hàng, danh mục sản phẩm, giỏ hàng, đặt hàng, thanh toán online, quản trị đơn hàng, vận chuyển, khuyến mãi, SEO và tích hợp CRM/ERP nếu cần.',
      '',
      'Anh/chị cho em biết sản phẩm cần bán và mô hình mong muốn: cửa hàng bán lẻ, bán hàng đa kênh, nhiều chi nhánh/kho hay sàn nhiều nhà bán ạ?',
    ].join('\n');
  }

  const ecommerceModules = findMatches(ECOMMERCE_MODULES, normalizedCurrentMessage);
  if (ecommerceModules.length > 0) {
    return getEcommerceModulesResponse(ecommerceModules, normalizedContext);
  }

  const businessModel = findMatches(BUSINESS_MODELS, normalizedCurrentMessage)[0];
  if (businessModel) {
    return getEcommerceBusinessModelResponse(businessModel, normalizedCurrentMessage, normalizedContext);
  }

  if (looksLikeEcommerceProductAnswer(normalizedCurrentMessage)) {
    return getEcommerceProductResponse(normalizedCurrentMessage, normalizedContext);
  }

  if (/\bbao\s*hanh\b|\bbao\s*tri\b|\bkiethuat\b/.test(normalizedMessage)) {
    return getWarrantyResponse();
  }

  if (/\bquy\s*trinh\b|\bcac\s*buoc\b|\btrien\s*khai\b/.test(normalizedMessage)) {
    return getProcessResponse();
  }

  if (/\bgio\s*lam\s*viec\b|\bthoi\s*gian\s*lam\s*viec\b|\bkhung\s*gio\b|\bmo\s*cua\b/.test(normalizedMessage)) {
    return getWorkHoursResponse();
  }

  if (/\bkinh\s*nghiem\b|\bnang\s*luc\b|\bbao\s*nhieu\s*du\s*an\b|\bmay\s*nam\b/.test(normalizedMessage)) {
    return getExperienceResponse();
  }

  // 3. Semantic matching for service categories as a fallback layer
  if (bestService && bestScore >= SERVICE_SEMANTIC_THRESHOLD) {
    if (bestService === 'doanh_nghiep' && (hasWebCorporate || /\b(doanh\s*nghiep|thuong\s*hieu|gioi\s*thieu\s*cong\s*ty|gioi\s*thieu\s*dich\s*vu)\b/.test(normalizedCurrentMessage))) {
      return [
        'Đây là nhóm Website Doanh Nghiệp / Giới thiệu thương hiệu.',
        'DU - DUDI Software cung cấp giải pháp thiết kế website doanh nghiệp chuẩn SEO và chuyên nghiệp:',
        '1. **Giao diện độc quyền**: Chuẩn nhận diện thương hiệu, UI/UX hiện đại, gia tăng uy tín doanh nghiệp.',
        '2. **Nội dung đầy đủ**: Giới thiệu hồ sơ năng lực, lịch sử phát triển, đội ngũ nhân sự và danh mục sản phẩm/dịch vụ.',
        '3. **Tối ưu SEO**: Thiết kế chuẩn cấu trúc dữ liệu giúp trang web tăng trưởng thứ hạng trên Google tự nhiên.',
        '4. **Hệ thống CMS tiện lợi**: Dễ dàng quản trị tin tức, bài viết dịch vụ và bảo mật thông tin tuyệt đối.',
        '',
        'Anh/chị muốn làm website giới thiệu công ty/dịch vụ mới hay nâng cấp, làm lại trang web doanh nghiệp hiện tại ạ?',
      ].join('\n');
    }
    if (bestService === 'ecommerce') {
      return [
        'Nhóm này là website bán hàng/e-commerce.',
        'Các phần thường cần làm gồm: giao diện bán hàng, danh mục sản phẩm, giỏ hàng, đặt hàng, thanh toán online, quản trị đơn hàng, vận chuyển, khuyến mãi, SEO và tích hợp CRM/ERP nếu cần.',
        '',
        'Anh/chị cho em biết sản phẩm cần bán và mô hình mong muốn: cửa hàng bán lẻ, bán hàng đa kênh, nhiều chi nhánh/kho hay sàn nhiều nhà bán ạ?',
      ].join('\n');
    }
    if (bestService === 'app') {
      return [
        'Đây là nhóm mobile app iOS/Android.',
        'Khi tư vấn app, DUDI sẽ làm rõ luồng người dùng, UI/UX, đăng nhập, quản lý dữ liệu, thông báo, thanh toán, tích hợp API và phần quản trị đi kèm.',
        '',
        'Anh/chị muốn làm app cho bán hàng, booking, quản lý nội bộ hay chăm sóc khách hàng ạ?',
      ].join('\n');
    }
    if (bestService === 'crm') {
      return [
        'Đây là nhóm phần mềm quản lý doanh nghiệp/CRM/ERP/booking platform.',
        'Phần cần làm rõ thường là: quản lý khách hàng, đơn hàng, nhân sự, kho, lịch hẹn, báo cáo, phân quyền, workflow và tích hợp hệ thống sẵn có.',
        '',
        'Anh/chị muốn hệ thống phục vụ bộ phận nào trước: bán hàng, vận hành, nhân sự, kho hay chăm sóc khách hàng ạ?',
      ].join('\n');
    }
    if (bestService === 'landing') {
      return [
        'Đây là nhóm Website Landing Page / Giới thiệu sản phẩm.',
        'Với dự án Landing Page, DU - DUDI Software thường tư vấn thiết kế tối ưu chuyển đổi:',
        '1. **Giao diện hiện đại**: Hình ảnh cuốn hút, tập trung vào 1 thông điệp/kêu gọi hành động (CTA) duy nhất.',
        '2. **Tốc độ tải trang siêu tốc**: Dưới 2 giây, chuẩn responsive hiển thị mượt mà trên di động.',
        '3. **Tích hợp form đăng ký**: Tự động thu thập thông tin và đổ dữ liệu về Google Sheets hoặc CRM nội bộ.',
        '4. **Cấu hình tracking**: Tích hợp các công cụ đo lường hành vi khách hàng như Google Analytics, Facebook Pixel.',
        '',
        'Anh/chị muốn làm landing page để giới thiệu thương hiệu doanh nghiệp, chạy chiến dịch quảng cáo sản phẩm hay sự kiện ạ?',
      ].join('\n');
    }
    if (bestService === 'chatbot') {
      return [
        'Đây là nhóm AI chatbot/RAG.',
        'Hướng triển khai thường gồm: dùng dữ liệu riêng của doanh nghiệp, trả lời khách hàng, gợi ý dịch vụ, thu thập thông tin liên hệ, tạo ticket và chuyển nhân viên khi cần.',
        '',
        'Anh/chị muốn chatbot dùng cho website, fanpage, nội bộ doanh nghiệp hay chăm sóc khách hàng đa kênh ạ?',
      ].join('\n');
    }
    if (bestService === 'cloud') {
      return getCloudDevopsResponse();
    }
  }

  if (hasExplicitWeb) {
    return [
      'Dạ, về **website** thì DUDI Software có thể tư vấn theo nhiều hướng tùy mục tiêu của anh/chị.',
      'Một số nhóm phổ biến gồm: website doanh nghiệp/giới thiệu thương hiệu, website bán hàng/e-commerce, landing page, website bất động sản, du lịch/booking, giáo dục hoặc các hệ thống web có quản trị riêng.',
      '',
      'Anh/chị muốn làm website cho lĩnh vực nào và mục tiêu chính là giới thiệu thương hiệu, bán hàng, thu lead hay quản lý vận hành ạ?',
    ].join('\n');
  }

  // Smart context fallback: if recent assistant message hints at an ongoing branch,
  // continue in that branch instead of showing the full overview again
  if (recentMessages.length > 0) {
    const lastAssistantContent = [...recentMessages].reverse().find(m => m.role === 'ASSISTANT')?.content || '';
    const lastLower = lastAssistantContent.toLowerCase();

    // Detect which branch we're in from the last assistant message
    if (/\b(app|mobile|ios|android)\b/.test(lastLower) && !hasApp && !hasExplicitWeb) {
      return [
        'Dạ, về Mobile App — anh/chị cho em biết thêm mục đích chính của app:',
        '- **Bán hàng / E-commerce**: Trưng bày, đặt hàng, thanh toán.',
        '- **Booking / Đặt lịch**: Chọn dịch vụ, chọn thời gian, nhắc lịch.',
        '- **Quản lý nội bộ**: Chấm công, công việc, báo cáo.',
        '- **Loyalty / Chăm sóc khách hàng**: Tích điểm, thông báo ưu đãi.',
        '',
        'Anh/chị muốn app phục vụ ai trước: khách hàng bên ngoài hay nhân viên nội bộ ạ?',
      ].join('\n');
    }

    if (/\b(crm|erp|phan\s*mem|quan\s*ly|booking\s*platform|he\s*thong)\b/.test(lastLower) && !hasCrm) {
      return [
        'Dạ, về phần mềm quản lý — anh/chị cần hệ thống tập trung vào bộ phận nào?',
        '- **Bán hàng / CRM**: Quản lý khách hàng, đơn hàng, phễu sales.',
        '- **Nhân sự / HRM**: Chấm công, lương, KPI.',
        '- **Kho hàng**: Nhập xuất, tồn kho, vị trí kho.',
        '- **Booking**: Lịch hẹn, nhân viên, chi nhánh.',
        '',
        'Anh/chị ưu tiên bộ phận nào cần quản lý trước ạ?',
      ].join('\n');
    }

    if (/\blanding\s*page\b/.test(lastLower)) {
      return [
        'Dạ, về Landing Page — anh/chị muốn landing page phục vụ mục tiêu nào?',
        '- Quảng cáo sản phẩm / chiến dịch marketing.',
        '- Giới thiệu thương hiệu / dịch vụ.',
        '- Thu thập lead / đăng ký tư vấn.',
        '- Giới thiệu sự kiện / ra mắt sản phẩm.',
        '',
        'Anh/chị cho em biết thêm để tư vấn chi tiết hơn ạ.',
      ].join('\n');
    }

    if (/\bchatbot|\brag\b|\bai\s*(tu\s*van|cham\s*soc)/.test(lastLower)) {
      return [
        'Dạ, về AI Chatbot/RAG — anh/chị muốn triển khai chatbot cho kênh nào?',
        '- **Website / Widget**: Tư vấn khách truy cập trực tiếp trên trang.',
        '- **Fanpage / Messenger**: Trả lời tự động comment và inbox Facebook.',
        '- **Zalo OA**: Tư vấn, gửi thông báo, chăm sóc qua Zalo.',
        '- **Nội bộ doanh nghiệp**: Hỗ trợ nhân viên tra cứu quy trình, chính sách.',
        '',
        'Anh/chị muốn chatbot tư vấn theo dữ liệu riêng của doanh nghiệp không ạ?',
      ].join('\n');
    }
  }

  return getServiceOverviewResponse();
}

export function getProjectInspiredConsultationResponse(message: string): string {
  const normalizedMessage = normalizeServiceText(message);
  const isShopifyRef = /\bshopify|haravan\b/.test(normalizedMessage);
  const isAbitmesRef = /\babitmes|upos|tendoo|pancake\b/.test(normalizedMessage);
  const isMarketplaceRef = /\btiki|shopee|shopi|lazada|tiktok\s*shop|tik\s*tok\s*shop\b/.test(normalizedMessage);
  const isSalesManagementReference = isShopifyRef || isAbitmesRef || isMarketplaceRef || /\bquan\s*ly\s*ban\s*hang|ban\s*hang\s*da\s*kenh|chat\s*da\s*kenh\b/.test(normalizedMessage);

  if (isSalesManagementReference) {
    const platformName = isShopifyRef
      ? (normalizedMessage.includes('shopify') ? 'Shopify' : 'Haravan')
      : isMarketplaceRef
        ? (normalizedMessage.includes('tiki') ? 'Tiki' : normalizedMessage.includes('lazada') ? 'Lazada' : normalizedMessage.includes('tiktok') || normalizedMessage.includes('tik tok') ? 'TikTok Shop' : 'Shopee')
        : (normalizedMessage.includes('pancake') ? 'Pancake' : 'Abitmes');
    return [
      `Dạ, em hiểu anh/chị muốn tư vấn một hệ thống bán hàng đa kênh tương tự nền tảng ${platformName}.`,
      'Với hướng này, DUDI Software có thể tư vấn các nhóm chức năng chính:',
      '1. Giao diện gian hàng online, tối ưu trải nghiệm xem sản phẩm và đặt hàng.',
      '2. Quản lý đồng bộ đơn hàng, tồn kho và sản phẩm đa kênh tập trung.',
      '3. Tích hợp cổng thanh toán online, đơn vị vận chuyển và tự động tính phí ship.',
      '4. Quản lý khách hàng (CRM), tích hợp mã giảm giá, voucher và chăm sóc tự động.',
      '5. Phân quyền nhân viên, báo cáo doanh thu chi tiết và mở rộng qua API.',
      '',
      `Anh/chị muốn xây dựng website bán hàng độc lập chuẩn như ${platformName} hay hệ thống quản lý bán hàng đa kênh tập trung ạ?`,
    ].join('\n');
  }

  return [
    'Dạ, em hiểu anh/chị muốn tư vấn một website/hệ thống theo mẫu tham khảo vừa gửi.',
    'DUDI Software có thể phân tích mẫu đó thành các phần như giao diện, luồng người dùng, chức năng quản trị, tích hợp dữ liệu và các module cần phát triển.',
    '',
    'Anh/chị cho em biết phần nào của mẫu là quan trọng nhất: giao diện, chức năng bán hàng, quản lý khách hàng, đặt hàng/thanh toán hay phần quản trị nội bộ ạ?',
  ].join('\n');
}
