function normalizeOffTopicText(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/Ä‘/g, 'd')
    .replace(/Ä/g, 'D')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function mentionsServiceWork(normalizedMessage: string): boolean {
  if (/\bgia\s*(vang|chung\s*khoan|coin|do\s*la|usd|ngoai\s*te|xang|dau|dien|nuoc)\b/.test(normalizedMessage)) {
    return false;
  }

  if (/\bmau\s*(gi|sac|chu|nen|da|mat|toc)\b/.test(normalizedMessage)) {
    return false;
  }

  return /\b(web|website|app|mobile|ios|android|du\s*an|project|mau|portfolio|thiet\s*ke|lap\s*trinh|xay\s*dung|phat\s*trien|tu\s*van|dich\s*vu|bao\s*gia|chi\s*phi|gia|nha\s*hang|f\s*b|cafe|quan\s*nhau)\b/.test(
    normalizedMessage
  );
}

function isViolenceOrHostilePrompt(normalizedMessage: string): boolean {
  return /\b(dam|danh|dap|choang|chui)\s*nhau\b|\bdanh\s*lon\b|\bcombat\b|\bfight\b|\bdo\s*may\b|\bchui\s*nhau\b/.test(
    normalizedMessage
  );
}

function isDrinkingInvite(normalizedMessage: string): boolean {
  return /\bdi\s*nhau\b|\bnhau\s*(khong|ko|k)\b|\buong\s*bia\b|\buong\s*ruou\b|\blam\s*(vai|may)\s*(ly|lon|chai)\b/.test(
    normalizedMessage
  );
}

function isProfanityOnly(normalizedMessage: string): boolean {
  if (normalizedMessage.length > 80) return false;

  const safeText = normalizedMessage
    .replace(/\bdoi\s+ngu\b/g, 'doi_ngu')
    .replace(/\bngu\s+coc\b/g, 'ngu_coc')
    .replace(/\bngu\s+hanh\b/g, 'ngu_hanh')
    .replace(/\bngu\s+quan\b/g, 'ngu_quan')
    .replace(/\bngu\s+giac\b/g, 'ngu_giac')
    .replace(/\bngoai\s+ngu\b/g, 'ngoai_ngu')
    .replace(/\bngon\s+ngu\b/g, 'ngon_ngu')
    .replace(/\bnguon\s+luc\b/g, 'nguon_luc')
    .replace(/\bnguon\s+nhan\s+luc\b/g, 'nguon_nhan_luc');

  return /\b(dm|dmm|dit|djt|cc|clm|vl|vcl|vai\s*lon|mat\s*day|oc\s*cho|ngu|cuc\s*cut|con\s*me)\b/.test(
    safeText
  );
}

export function isUnsupportedDomainInquiry(message: string): boolean {
  const normalizedMessage = normalizeOffTopicText(message);
  if (!normalizedMessage) return false;

  const isGambling =
    /\b(ca\s*do|ca\s*cuoc|dat\s*cuoc|co\s*bac|danh\s*bac|lo\s*de|danh\s*lo|danh\s*de|so\s*de|tai\s*xiu|nha\s*cai|casino|danh\s*bai|choi\s*bai|xoc\s*dia|xo\s*so|bong\s*88|kubet|shbet|789bet|888b|game\s*bai|game\s*doi\s*thuong|ban\s*ca\s*doi\s*thuong|da\s*ga)\b/.test(
      normalizedMessage
    ) ||
    (/\bco\s+do\b/.test(normalizedMessage) && !/\b(cong\s*ty|cong|ty|doanh\s*nghiep|dich\s*vu)\b/.test(normalizedMessage));
  
  // Adult / Sexually explicit
  const isAdult = /\b(web\s*den|phim\s*nguoi\s*lon|khieu\s*dam|mai\s*dam|gai\s*goi|do\s*choi\s*tinh\s*duc|sex|porn|18\s*\+)\b/.test(normalizedMessage);
  
  // Cybercrime / Hacking / Malware / DDoS / Phishing / Spam
  const isHacking = /\b(hack\s*tool|tool\s*hack|hack\s*facebook|hack\s*fb|hack\s*tai\s*khoan|ddos|botnet|ma\s*doc|keylogger|phishing|virus|trojan|ransomware|spam|script\s*ddos|tai\s*khoan\s*hack)\b/.test(normalizedMessage);

  // Illegal Drugs & Controlled Substances
  const isDrugs = /\b(ma\s*tuy|can\s*sa|thuoc\s*lac|choi\s*ke|khay\s*ke|bong\s*cuoi|heroine|meth|cannam|narcotics)\b/.test(normalizedMessage);

  // Weapons & Explosives
  const isWeapons = /\b(vu\s*khi|sung\s*dan|thuoc\s*no|dao\s*kiem|vu\s*khi\s*quan\s*dung)\b/.test(normalizedMessage) ||
    (/\bsung\b/.test(normalizedMessage) && !/\b(sung\s*tuc|sung\s*manh)\b/.test(normalizedMessage));

  // Scams / Pyramids / Counterfeit / Loan Sharks / Illegal Contraband / Copyright Piracy
  const isScams = /\b(tien\s*gia|giay\s*to\s*gia|bang\s*cap\s*gia|da\s*cap\s*bien\s*tuong|lua\s*dao|ponzi|thuoc\s*la\s*dien\s*tu|vape|pod|phim\s*lau|vi\s*pham\s*ban\s*quyen|tin\s*dung\s*den|cho\s*vay\s*nang\s*lai)\b/.test(normalizedMessage);

  return isGambling || isAdult || isHacking || isDrugs || isWeapons || isScams;
}

export function getUnsupportedDomainResponse(): string {
  return [
    'Dạ, DU - DUDI Software hiện tại chỉ cung cấp giải pháp thiết kế website và phần mềm thuộc các nhóm chủ đề chính thức của công ty:',
    '',
    '1. **Website Doanh Nghiệp / Giới thiệu thương hiệu**: Chuẩn nhận diện thương hiệu, UI/UX hiện đại, gia tăng uy tín.',
    '2. **Website Bán hàng / Thương mại điện tử**: Tích hợp giỏ hàng, thanh toán online, quản lý đơn hàng.',
    '3. **Phần mềm Quản lý Doanh nghiệp**: CRM, ERP, quản lý bán hàng, booking platform.',
    '4. **Mobile App iOS/Android**: App bán hàng, app nội bộ, app loyalty, booking.',
    '5. **AI Chatbot & RAG**: Tự động hóa chăm sóc khách hàng và quản trị tri thức.',
    '6. **Cloud & Hạ tầng DevOps**: Tối ưu vận hành, bảo mật và mở rộng hệ thống.',
    '',
    'DUDI Software không hỗ trợ thiết kế hoặc triển khai các website/phần mềm thuộc các chủ đề nhạy cảm, vi phạm pháp luật hoặc ngoài phạm vi trên (như cá độ/cá cược, cờ bạc, nội dung người lớn, hack/mã độc, chất cấm, vũ khí, lừa đảo...).',
    '',
    'Nếu anh/chị có nhu cầu làm website/phần mềm thuộc các chủ đề chính thức của DUDI Software, vui lòng để lại số điện thoại hoặc liên hệ trực tiếp nhân viên tư vấn để được hỗ trợ ạ.',
  ].join('\n');
}

export function isOffTopicInquiry(message: string): boolean {
  const normalizedMessage = normalizeOffTopicText(message);
  if (!normalizedMessage) return false;

  if (isUnsupportedDomainInquiry(message)) {
    return true;
  }

  if (isViolenceOrHostilePrompt(normalizedMessage)) {
    return true;
  }

  if (isProfanityOnly(normalizedMessage)) {
    return true;
  }

  if (mentionsServiceWork(normalizedMessage)) return false;

  if (isDrinkingInvite(normalizedMessage)) {
    return true;
  }

  const isSocialInvite =
    /\b(di\s*xem\s*phim|xem\s*phim\s*khong|choi\s*game|di\s*choi|di\s*an|an\s*gi\s*toi\s*nay|an\s*gi|di\s*uong\s*tra\s*sua|tra\s*sua\s*khong)\b/.test(
      normalizedMessage
    );
  if (isSocialInvite) {
    return true;
  }

  const isPersonalSmallTalk =
    /\b(co\s*nguoi\s*yeu\s*chua|me\s*ban\s*la\s*ai|vo\s*ban|ban\s*la\s*nam\s*hay\s*nu|ban\s*thich\s*an|ban\s*thich\s*xem|ban\s*thich\s*mau\s*gi|co\s*biet\s*hat|hat\s*cho|hat\s*1\s*bai|nghe\s*1\s*bai|sing\s*a\s*song|choi\s*dan|guitar|gym|co\s*nguc|may\s*la\s*con\s*nguoi)\b/.test(
      normalizedMessage
    );
  if (isPersonalSmallTalk) {
    return true;
  }

  const isWeatherOrGeneralTrivia =
    /\b(thoi\s*tiet|nhiet\s*do|troi\s*mua|troi\s*nang|du\s*bao\s*thoi\s*tiet|am\s*lich|ngay\s*may|gia\s*vang|tu\s*vi|boi\s*que|com\s*tam|cho\s*nao\s*ngon)\b/.test(normalizedMessage);
  if (isWeatherOrGeneralTrivia) {
    return true;
  }

  return false;
}

export function getOffTopicResponse(message: string): string {
  const normalizedMessage = normalizeOffTopicText(message);

  if (isUnsupportedDomainInquiry(message)) {
    return getUnsupportedDomainResponse();
  }

  if (isViolenceOrHostilePrompt(normalizedMessage)) {
    return [
      'D\u1ea1, ph\u1ea7n n\u00e0y h\u01a1i c\u0103ng r\u1ed3i \u1ea1. DU kh\u00f4ng th\u1ec3 tham gia hay c\u1ed5 v\u0169 \u0111\u00e1nh nhau \u0111\u01b0\u1ee3c.',
      '',
      'Em c\u00f3 th\u1ec3 h\u1ed7 tr\u1ee3 anh/ch\u1ecb v\u1ec1 website, app, ph\u1ea7n m\u1ec1m qu\u1ea3n l\u00fd, UI/UX ho\u1eb7c AI chatbot/RAG n\u1ebfu anh/ch\u1ecb mu\u1ed1n trao \u0111\u1ed5i ti\u1ebfp v\u1ec1 d\u1ef1 \u00e1n.',
    ].join('\n');
  }

  if (isProfanityOnly(normalizedMessage)) {
    return [
      'D\u1ea1, DU xin ph\u00e9p gi\u1eef cu\u1ed9c tr\u00f2 chuy\u1ec7n l\u1ecbch s\u1ef1 v\u00e0 \u0111\u00fang ph\u1ea1m vi t\u01b0 v\u1ea5n \u1ea1.',
      '',
      'Em c\u00f3 th\u1ec3 h\u1ed7 tr\u1ee3 anh/ch\u1ecb v\u1ec1 website, app, ph\u1ea7n m\u1ec1m qu\u1ea3n l\u00fd, UI/UX, AI chatbot/RAG ho\u1eb7c c\u00e1c d\u1ef1 \u00e1n DUDI Software \u0111\u00e3 tri\u1ec3n khai.',
    ].join('\n');
  }

  if (isDrinkingInvite(normalizedMessage)) {
    return [
      'D\u1ea1 em l\u00e0 DU - tr\u1ee3 l\u00fd AI c\u1ee7a DUDI Software n\u00ean kh\u00f4ng \u0111i nh\u1eadu \u0111\u01b0\u1ee3c \u0111\u00e2u \u1ea1.',
      '',
      'Em \u1edf \u0111\u00e2y \u0111\u1ec3 h\u1ed7 tr\u1ee3 anh/ch\u1ecb t\u01b0 v\u1ea5n website, app, ph\u1ea7n m\u1ec1m qu\u1ea3n l\u00fd, UI/UX ho\u1eb7c AI chatbot. N\u1ebfu anh/ch\u1ecb c\u1ea7n h\u1ecfi ti\u1ebfp v\u1ec1 d\u1ef1 \u00e1n th\u00ec c\u1ee9 nh\u1eafn em nh\u00e9.',
    ].join('\n');
  }

  return [
    'D\u1ea1 c\u00e2u n\u00e0y h\u01a1i ngo\u00e0i ph\u1ea1m vi t\u01b0 v\u1ea5n c\u1ee7a DU r\u1ed3i \u1ea1.',
    '',
    'Em c\u00f3 th\u1ec3 h\u1ed7 tr\u1ee3 anh/ch\u1ecb v\u1ec1 website, app, ph\u1ea7n m\u1ec1m qu\u1ea3n l\u00fd, UI/UX, AI chatbot/RAG ho\u1eb7c c\u00e1c d\u1ef1 \u00e1n DUDI Software \u0111\u00e3 tri\u1ec3n khai.',
  ].join('\n');
}
