import fs from 'fs';
import path from 'path';

// Parse .env.local manually
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8');
  for (const line of envConfig.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const [key, ...values] = trimmed.split('=');
      process.env[key.trim()] = values.join('=').trim();
    }
  }
}

const { buildSystemPrompt } = require('../lib/ai/prompts');
const { getBusinessDomainsResponse, isBusinessDomainsInquiry } = require('../lib/ai/business-domains');
const {
  getContactInfoResponse,
  getProjectInspiredConsultationResponse,
  getServiceConsultationResponse,
  getServiceOverviewResponse,
} = require('../lib/ai/company-responses');
const {
  buildConversationMemorySummary,
  getContextualMemoryResponse,
} = require('../lib/ai/conversation-memory');
const { classifyChatIntent } = require('../lib/ai/intent-router');
const {
  extractCustomerPhone,
  getPhoneReceivedHandoffResponse,
  getPricingHandoffResponse,
  getPricingHandoffSummary,
  isPricingOrMoneyInquiry,
} = require('../lib/ai/pricing-policy');
const { extractProjectsFromKnowledge } = require('../lib/ai/project-parser');
const { cleanContent, splitTextIntoChunks } = require('../features/knowledge/chunker');
const { VectorService } = require('../features/knowledge/vector.service');

/**
 * Bộ Test Suite tự động cho DUDI SOFTWARE AI
 */
export async function runTestSuite() {
  console.log('====================================================');
  console.log('🧪 RUNNING DUDI SOFTWARE AI AUTOMATED TEST SUITE');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  // Test Case 1: Text Chunker & Cleaner
  try {
    const rawText = '   Dòng 1.\n\n\n\nDòng 2 đoạn văn mới.   ';
    const cleaned = cleanContent(rawText);
    const chunks = splitTextIntoChunks(cleaned, { maxChunkSize: 50 });

    if (cleaned === 'Dòng 1.\n\nDòng 2 đoạn văn mới.' && chunks.length > 0) {
      console.log('✅ TEST 1 PASSED: Text Chunker & Sanitization working correctly.');
      passed++;
    } else {
      throw new Error('Chunker output mismatch');
    }
  } catch (err: any) {
    console.error('❌ TEST 1 FAILED:', err.message);
    failed++;
  }

  // Test Case 2: System Prompt Construction & Context Isolation
  try {
    const prompt = buildSystemPrompt({
      retrievedContext: '[Tài liệu 1: DUDI Software]\nDUDI Software cung cấp dịch vụ web và app.',
    });

    if (
      prompt.includes('Tuyệt đối KHÔNG bịa đặt thông tin') &&
      prompt.includes('DUDI SOFTWARE') &&
      prompt.includes('QUY TẮC PHẢN HỒI')
    ) {
      console.log('✅ TEST 2 PASSED: System Prompt Hardening & Context Injection isolated.');
      passed++;
    } else {
      throw new Error('System prompt rules missing');
    }
  } catch (err: any) {
    console.error('❌ TEST 2 FAILED:', err.message);
    failed++;
  }

  // Test Case 3: Business domains inquiry routing
  try {
    const domainQueries = [
      'Sản phẩm của các bạn có các lĩnh vực nào',
      'DUDI làm những ngành nào?',
      'Bên mình cung cấp sản phẩm gì?',
    ];
    const response = getBusinessDomainsResponse().toLowerCase();

    if (
      domainQueries.every(isBusinessDomainsInquiry) &&
      response.includes('crm') &&
      response.includes('erp') &&
      response.includes('booking platform') &&
      response.includes('ô tô') &&
      response.includes('bất động sản')
    ) {
      console.log('✅ TEST 3 PASSED: Business domain questions return domain overview.');
      passed++;
    } else {
      throw new Error('Business domain routing mismatch');
    }
  } catch (err: any) {
    console.error('❌ TEST 3 FAILED:', err.message);
    failed++;
  }

  // Test Case 4: Pricing & Money Inquiry Handoff Policy
  try {
    const pricingQueries = [
      'Giá một web là bao nhiêu?',
      'Gia mot web la bao nhieu?',
      'Cho xin giá',
      'Tien sao em?',
      'Phi nhu the nao?',
      'Website ban hang gia bao nhieu?',
      'Cho toi xin bao gia app mobile',
      'Chi phi thiet ke web khoang bao nhieu?',
      'Ben minh thanh toan nhu the nao?',
    ];
    const regularQueries = [
      'DUDI co dich vu thiet ke website khong?',
      'Cho toi xem cac du an o to da lam',
      'Danh gia du an nay giup toi',
      'Danh gia mot web la bao nhieu diem?',
      'Gia tri cot loi cua DUDI la gi?',
      'Cai do co thanh toan online khong?',
      'khuyen mai',
      'co khuyen mai khong?',
    ];

    const allPricingDetected = pricingQueries.every(isPricingOrMoneyInquiry);
    const noRegularFalsePositive = regularQueries.every((query) => !isPricingOrMoneyInquiry(query));
    const handoffResponse = getPricingHandoffResponse()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .toLowerCase();
    const handoffSummary = getPricingHandoffSummary(
      'Toi muon bao gia website ban hang co gio hang va thanh toan online'
    )
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .toLowerCase();

    const extractedPhone = extractCustomerPhone('Sdt cua toi la 0398752911');
    const phoneReceivedResponse = getPhoneReceivedHandoffResponse('0398752911')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .toLowerCase();

    if (
      allPricingDetected &&
      noRegularFalsePositive &&
      handoffResponse.toLowerCase().includes('so dien thoai') &&
      handoffSummary.includes('website ban hang') &&
      handoffSummary.includes('can nhan vien lien he') &&
      extractedPhone === '0398752911' &&
      phoneReceivedResponse.includes('da ghi nhan so dien thoai') &&
      phoneReceivedResponse.includes('lien he')
    ) {
      console.log('✅ TEST 3 PASSED: Pricing inquiries are routed to staff phone collection.');
      passed++;
    } else {
      throw new Error('Pricing handoff policy mismatch');
    }
  } catch (err: any) {
    console.error('❌ TEST 3 FAILED:', err.message);
    failed++;
  }

  // Test Case 4: Project Parser skips malformed project fragments
  try {
    const projects = extractProjectsFromKnowledge(
      [
        {
          content: [
            'DANH SACH DU AN DUDI SOFTWARE',
            '',
            '3. o gio/truc tuyen.',
            '- URL / Link: https://www.dudisoftware.com/projects',
            '- Mo ta chi tiet: o gio/truc tuyen.',
            '',
            '4. Dự án Website Justfly:',
            '- URL / Link: https://justfly.vn/',
            '- Mô tả chi tiết: Website đặt vé máy bay và dịch vụ du lịch trực tuyến.',
            '',
            '5. Dự án Website nền tảng MyKOL:',
            '- URL / Link: https://mykol.vn/',
            '- Mô tả chi tiết: Website nền tảng MyKOL.',
          ].join('\n'),
          category: 'Booking platform',
        },
      ],
      'website booking platform'
    );

    const hasMalformedProject = projects.some((project: any) =>
      project.title.toLowerCase().includes('truc tuyen')
    );

    if (
      projects.length === 2 &&
      projects.some((project: any) => project.title === 'Website Justfly') &&
      projects.some((project: any) => project.title === 'Website nền tảng MyKOL') &&
      !hasMalformedProject
    ) {
      console.log('✅ TEST 4 PASSED: Project parser skips malformed fragments.');
      passed++;
    } else {
      throw new Error(`Project parser mismatch: ${JSON.stringify(projects)}`);
    }
  } catch (err: any) {
    console.error('❌ TEST 4 FAILED:', err.message);
    failed++;
  }

  // Test Case 5: Intent router classification
  try {
    const pricingContext = {
      status: 'WAITING_FOR_AGENT',
      title: 'Yêu cầu báo giá',
      summary: 'Khách muốn báo giá website.',
    };

    const checks = [
      (await classifyChatIntent('Giá một web là bao nhiêu?')).type === 'pricing_handoff',
      (await classifyChatIntent('0398752911', pricingContext)).type === 'pricing_phone_received',
      (await classifyChatIntent('toi muon tu van')).type === 'service_overview',
      (await classifyChatIntent('Ben ban co dich vu gi?')).type === 'service_overview',
      (await classifyChatIntent('Toi muon lam website ban hang')).type === 'service_consultation',
      (await classifyChatIntent('Tu van web ban hang')).type === 'service_consultation',
      (await classifyChatIntent('Website ban hang/e-commerce, dat hang va thanh toan online.')).type === 'service_consultation',
      (await classifyChatIntent('Website ban hang, thuong mai dien tu, ban hang da kenh.')).type === 'service_consultation',
      (await classifyChatIntent('giao dien ban hang')).type === 'service_consultation',
      (await classifyChatIntent('giao dien', { memorySummary: 'Nhu cau: website ban hang/e-commerce' })).type === 'service_consultation',
      (await classifyChatIntent('quan tri don hang, van chuyen, khuyen mai', { memorySummary: 'Nhu cau: website ban hang/e-commerce' })).type === 'service_consultation',
      (await classifyChatIntent('toi ban quan ao', { memorySummary: 'Nhu cau: website ban hang/e-commerce' })).type === 'service_consultation',
      (await classifyChatIntent('khuyen mai')).type === 'service_consultation',
      (await classifyChatIntent('quan ao')).type === 'service_consultation',
      (await classifyChatIntent('ship hang')).type === 'service_consultation',
      (await classifyChatIntent('co thanh toan online khong')).type === 'service_consultation',
      (await classifyChatIntent('Toi muon tu van web nhu the nay Du an Quan ly ban hang Abitmes')).type === 'project_inspired_consultation',
      (await classifyChatIntent('Sản phẩm của các bạn có các lĩnh vực nào')).type === 'business_domains',
      (await classifyChatIntent('Cho tôi xin hotline DUDI')).type === 'contact_info',
      (await classifyChatIntent('Bên bạn có dịch vụ gì?')).type === 'service_overview',
      (await classifyChatIntent('Cho tôi xem dự án bất động sản')).type === 'project_examples',
      getContactInfoResponse().includes('(+84) 909 163 821'),
      getServiceOverviewResponse().toLowerCase().includes('crm/erp'),
      (await getServiceConsultationResponse('Toi muon lam website ban hang')).toLowerCase().includes('e-commerce'),
      (await getServiceConsultationResponse('giao dien ban hang')).toLowerCase().includes('giao diện bán hàng'),
      (await getServiceConsultationResponse('Website ban hang/e-commerce, dat hang va thanh toan online.')).toLowerCase().includes('website bán hàng'),
      (await getServiceConsultationResponse('quan tri don hang, van chuyen, khuyen mai', 'Nhu cau: website ban hang/e-commerce')).includes('quản trị đơn hàng'),
      (await getServiceConsultationResponse('quan tri don hang, van chuyen, khuyen mai', 'Nhu cau: website ban hang/e-commerce')).includes('vận chuyển'),
      (await getServiceConsultationResponse('quan tri don hang, van chuyen, khuyen mai', 'Nhu cau: website ban hang/e-commerce')).includes('khuyến mãi'),
      (await getServiceConsultationResponse('toi ban quan ao', 'Nhu cau: website ban hang/e-commerce')).includes('thời trang/quần áo'),
      (await getServiceConsultationResponse('khuyen mai')).includes('khuyến mãi'),
      (await getServiceConsultationResponse('quan ao')).includes('thời trang/quần áo'),
      getProjectInspiredConsultationResponse('Toi muon tu van web nhu Abitmes').includes('Abitmes'),
      !isPricingOrMoneyInquiry('Website ban hang/e-commerce, dat hang va thanh toan online.'),
      isPricingOrMoneyInquiry('Ben minh thanh toan nhu the nao?'),
      (await classifyChatIntent('Co web bat dong san ko')).type === 'project_examples',
    ];

    let allOk = true;
    for (let i = 0; i < checks.length; i++) {
      if (!checks[i]) {
        console.error(`❌ Check index ${i} failed!`);
        allOk = false;
      }
    }

    if (allOk) {
      console.log('✅ TEST 5 PASSED: Intent router handles key customer intents.');
      passed++;
    } else {
      throw new Error('Intent router classification mismatch');
    }
  } catch (err: any) {
    console.error('❌ TEST 5 FAILED:', err.message);
    failed++;
  }

  // Test Case 6: Project parser keeps domain-specific project results on topic
  try {
    const projects = extractProjectsFromKnowledge(
      [
        {
          content: [
            '1. Du an Nha Khoa Kim:',
            '- URL / Link: https://nhakhoakim.com/',
            '- Mo ta chi tiet: Website nha khoa cung cap dich vu cham soc rang mieng.',
          ].join('\n'),
          category: 'Kho Du An - Nha khoa',
        },
        {
          content: [
            '1. Du an Gamuda Land Viet Nam:',
            '- URL / Link: https://gamudaland.com.vn/',
            '- Mo ta chi tiet: Website gioi thieu cac du an bat dong san va khu do thi.',
            '',
            '2. Du an Bat dong san Rever:',
            '- URL / Link: https://rever.vn/',
            '- Mo ta chi tiet: Nen tang mua ban, cho thue va ky gui bat dong san.',
          ].join('\n'),
          category: 'Kho Du An - Bat dong san',
        },
      ],
      'Co web bat dong san ko'
    );

    const includesDental = projects.some((project: any) =>
      project.title.toLowerCase().includes('nha khoa')
    );

    if (
      projects.length === 2 &&
      projects.some((project: any) => project.title === 'Gamuda Land Viet Nam') &&
      projects.some((project: any) => project.title === 'Bat dong san Rever') &&
      !includesDental
    ) {
      console.log('âœ… TEST 6 PASSED: Project parser filters examples by requested industry.');
      passed++;
    } else {
      throw new Error(`Domain project parser mismatch: ${JSON.stringify(projects)}`);
    }
  } catch (err: any) {
    console.error('âŒ TEST 6 FAILED:', err.message);
    failed++;
  }

  // Test Case 6: Conversation memory summary
  try {
    const firstSummary = buildConversationMemorySummary({
      userMessage: 'Toi muon lam website ban hang co gio hang va thanh toan online',
      intentType: 'service_consultation',
    });
    const nextSummary = buildConversationMemorySummary({
      currentSummary: firstSummary,
      userMessage: 'Gia website nay bao nhieu?',
      intentType: 'pricing_handoff',
    });
    const finalSummary = buildConversationMemorySummary({
      currentSummary: nextSummary,
      userMessage: '0398752911',
      intentType: 'pricing_phone_received',
    });
    const followUpResponse = getContextualMemoryResponse(
      'Cai do co thanh toan online khong?',
      finalSummary
    );
    const uiSummary = buildConversationMemorySummary({
      currentSummary: finalSummary,
      userMessage: 'giao dien ban hang',
      intentType: 'service_consultation',
    });

    if (
      finalSummary.includes('website bán hàng/e-commerce') &&
      finalSummary.includes('cần giỏ hàng') &&
      finalSummary.includes('cần thanh toán online') &&
      finalSummary.includes('đã hỏi báo giá') &&
      finalSummary.includes('đã để lại số điện thoại') &&
      uiSummary.includes('giao diện bán hàng/UI') &&
      !!followUpResponse &&
      followUpResponse.includes('website bán hàng/e-commerce') &&
      followUpResponse.includes('thanh toán online')
    ) {
      console.log('✅ TEST 6 PASSED: Conversation memory keeps customer needs across turns.');
      passed++;
    } else {
      throw new Error(`Conversation memory mismatch: ${finalSummary}`);
    }
  } catch (err: any) {
    console.error('❌ TEST 6 FAILED:', err.message);
    failed++;
  }

  // Test Case 7: Cosine Similarity Metric Test
  try {
    const vecA = [1, 0, 0];
    const vecB = [1, 0, 0];
    const vecC = [0, 1, 0];

    const simExact = VectorService.cosineSimilarity(vecA, vecB);
    const simOrtho = VectorService.cosineSimilarity(vecA, vecC);

    if (simExact === 1 && simOrtho === 0) {
      console.log('✅ TEST 5 PASSED: Cosine Similarity Vector Calculation accurate.');
      passed++;
    } else {
      throw new Error(`Similarity output error: exact=${simExact}, ortho=${simOrtho}`);
    }
  } catch (err: any) {
    console.error('❌ TEST 5 FAILED:', err.message);
    failed++;
  }

  // Test Case 6: Vector RAG Search on DUDI Software Knowledge Base
  try {
    const addressResult = await VectorService.searchSimilarChunks('DUDI Software địa chỉ liên hệ ở đâu và hotline là gì');
    const projectResult = await VectorService.searchSimilarChunks('các dự án mảng ô tô và du lịch của DUDI Software');

    const addressPass = addressResult.some((r: any) => r.content.includes('232') || r.content.includes('Minh Khai') || r.content.includes('0909'));
    const projectPass = projectResult.some((r: any) => r.title.includes('Ô tô') || r.title.includes('Du lịch') || r.content.includes('GEELY') || r.content.includes('Saigontourist'));

    if (addressPass && projectPass) {
      console.log(`✅ TEST 4 PASSED: Vector Search accurately retrieved both DUDI Software contact info & projects (Ô tô / Du lịch).`);
      passed++;
    } else {
      throw new Error(`Vector Search check failed: addressPass=${addressPass}, projectPass=${projectPass}`);
    }
  } catch (err: any) {
    console.error('❌ TEST 4 FAILED:', err.message);
    failed++;
  }

  console.log('\n====================================================');
  console.log(`📊 TEST SUITE SUMMARY: ${passed} PASSED | ${failed} FAILED`);
  console.log('====================================================\n');
}

if (require.main === module) {
  runTestSuite();
}
