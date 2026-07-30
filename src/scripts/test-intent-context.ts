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

const { classifyChatIntent } = require('../lib/ai/intent-router');
const { getProjectInspiredConsultationResponse, getServiceConsultationResponse } = require('../lib/ai/company-responses');
import type { ConversationIntentContext } from '../lib/ai/intent-router';

type TestItem = {
  desc: string;
  message: string;
  context?: ConversationIntentContext;
  expectType: string;
  expectNotType?: string;
};

const tests: TestItem[] = [
  // === Không có context => vẫn hoạt động bình thường ===
  {
    desc: '[BASELINE] "Tư vấn" không có context => service_overview',
    message: 'Tư vấn',
    expectType: 'service_overview',
  },
  {
    desc: '[BASELINE] "Mobile app" không có context => service_consultation',
    message: 'Mobile app iOS/Android.',
    expectType: 'service_consultation',
  },

  // === Có context đang trong nhánh app ===
  {
    desc: '[CONTEXT] Đang tư vấn app, khách nói "bán hàng" => service_consultation',
    message: 'bán hàng',
    context: {
      recentMessages: [
        {
          role: 'ASSISTANT',
          content:
            'Đây là nhóm mobile app iOS/Android. Khi tư vấn app, DUDI sẽ làm rõ luồng người dùng, UI/UX, đăng nhập...\nAnh/chị muốn làm app cho bán hàng, booking, quản lý nội bộ hay chăm sóc khách hàng ạ?',
        },
      ],
    },
    expectType: 'service_consultation',
    expectNotType: 'service_overview',
  },
  {
    desc: '[CONTEXT] Đang tư vấn app, khách nói "tư vấn" => service_consultation (không phải service_overview)',
    message: 'Tư vấn',
    context: {
      recentMessages: [
        {
          role: 'ASSISTANT',
          content: 'Đây là nhóm mobile app iOS/Android. Anh/chị muốn làm app cho bán hàng, booking hay quản lý nội bộ?',
        },
      ],
    },
    expectType: 'service_consultation',
    expectNotType: 'service_overview',
  },
  {
    desc: '[CONTEXT] Đang tư vấn CRM, khách nói "ok" => service_consultation',
    message: 'ok',
    context: {
      recentMessages: [
        {
          role: 'ASSISTANT',
          content:
            'Đây là nhóm phần mềm quản lý doanh nghiệp/CRM/ERP/booking platform. Anh/chị muốn hệ thống phục vụ bộ phận nào trước?',
        },
      ],
    },
    expectType: 'service_consultation',
  },
  {
    desc: '[CONTEXT] Đang tư vấn landing page, khách nói "muốn tư vấn" => service_consultation',
    message: 'Muốn tư vấn',
    context: {
      recentMessages: [
        {
          role: 'ASSISTANT',
          content: 'Đây là nhóm Website Landing Page / Giới thiệu sản phẩm. Anh/chị muốn làm landing page cho chiến dịch nào?',
        },
      ],
    },
    expectType: 'service_consultation',
    expectNotType: 'service_overview',
  },
  {
    desc: '[CONTEXT] Không có context nhánh, khách nói "tư vấn" => service_overview',
    message: 'Tư vấn',
    context: {
      recentMessages: [
        {
          role: 'ASSISTANT',
          content: 'Xin chào! Tôi là DU - Trợ lý AI của DUDI Software. Tôi có thể hỗ trợ gì cho anh/chị?',
        },
      ],
    },
    expectType: 'service_overview',
  },

  // === Pricing intent không bị ảnh hưởng ===
  {
    desc: '[PRICING] Hỏi giá khi đang trong nhánh app => pricing_handoff',
    message: 'Bao nhiêu tiền vậy?',
    context: {
      recentMessages: [
        {
          role: 'ASSISTANT',
          content: 'Đây là nhóm mobile app iOS/Android. Anh/chị muốn làm app cho bán hàng, booking hay quản lý nội bộ?',
        },
      ],
    },
    expectType: 'pricing_handoff',
  },
  {
    desc: '[SLANG] lam app y nhu Tiki => project_inspired_consultation',
    message: 'lam app y nhu Tiki',
    expectType: 'project_inspired_consultation',
  },
  {
    desc: '[SLANG] web kieu shopi => project_inspired_consultation',
    message: 'web kieu shopi ban do gia dung',
    expectType: 'project_inspired_consultation',
  },
];

// === Chạy tests ===
async function main() {
  let passed = 0;
  let failed = 0;

  console.log('\n=========================================');
  console.log('🧪 UNIT TEST: Intent Router với recentMessages');
  console.log('=========================================\n');

  for (const t of tests) {
    const result = await classifyChatIntent(t.message, t.context);
    const typeOk = result.type === t.expectType;
    const notTypeOk = !t.expectNotType || result.type !== t.expectNotType;
    const ok = typeOk && notTypeOk;

    if (ok) {
      passed++;
      console.log(`✅ PASS | ${t.desc}`);
      console.log(`       => type: "${result.type}" | reason: ${result.reason}`);
    } else {
      failed++;
      console.log(`❌ FAIL | ${t.desc}`);
      console.log(`       => Expected type: "${t.expectType}"${t.expectNotType ? ` (not "${t.expectNotType}")` : ''}`);
      console.log(`       => Got type: "${result.type}" | reason: ${result.reason}`);
    }
  }

  console.log('\n=========================================');
  console.log(`📊 Kết quả: ${passed} passed / ${passed + failed} total`);
  console.log('=========================================\n');

  console.log('\n=========================================');
  console.log('UNIT TEST: project-inspired response aliases');
  console.log('=========================================\n');

  const projectInspiredTests: Array<{ desc: string; msg: string; expectContains: string }> = [
    {
      desc: 'Tiki reference uses Tiki in response',
      msg: 'lam app y nhu Tiki',
      expectContains: 'Tiki',
    },
    {
      desc: 'shopi typo maps to Shopee in response',
      msg: 'web kieu shopi ban do gia dung',
      expectContains: 'Shopee',
    },
  ];

  let projectPassed = 0;
  let projectFailed = 0;

  for (const t of projectInspiredTests) {
    const response = getProjectInspiredConsultationResponse(t.msg);
    if (response.includes(t.expectContains)) {
      projectPassed++;
      console.log(`PASS | ${t.desc}`);
    } else {
      projectFailed++;
      console.log(`FAIL | ${t.desc}`);
      console.log(`       => Expected response to contain: "${t.expectContains}"`);
      console.log(`       => Got snippet: "${response.slice(0, 120).replace(/\n/g, ' ')}..."`);
    }
  }

  console.log('\n=========================================');
  console.log(`Project-inspired Response Tests: ${projectPassed} passed / ${projectPassed + projectFailed} total`);
  console.log('=========================================\n');

  // === Test getServiceConsultationResponse với recentMessages context ===
  console.log('\n=========================================');
  console.log('🧪 UNIT TEST: getServiceConsultationResponse với context');
  console.log('=========================================\n');

  const contextTests: Array<{ desc: string; msg: string; recentMsgs: Array<{ role: 'USER' | 'ASSISTANT'; content: string }>; expectContains: string }> = [
    {
      desc: 'Đang tư vấn app, khách nói câu mơ hồ => tiếp tục về app',
      msg: 'tiếp',
      recentMsgs: [
        {
          role: 'ASSISTANT',
          content: 'Đây là nhóm mobile app iOS/Android. Anh/chị muốn làm app cho bán hàng, booking hay quản lý nội bộ?',
        },
      ],
      expectContains: 'Mobile App',
    },
    {
      desc: 'Đang tư vấn CRM, nhập mơ hồ => tiếp tục về CRM/phần mềm',
      msg: 'oke',
      recentMsgs: [
        {
          role: 'ASSISTANT',
          content: 'Đây là nhóm phần mềm quản lý doanh nghiệp/CRM/ERP/booking platform. Anh/chị muốn hệ thống phục vụ bộ phận nào?',
        },
      ],
      expectContains: 'phần mềm quản lý',
    },
    {
      desc: 'Đang tư vấn Chatbot/RAG, nhập mơ hồ => tiếp tục về chatbot',
      msg: 'muốn tư vấn',
      recentMsgs: [
        {
          role: 'ASSISTANT',
          content: 'Đây là nhóm AI chatbot/RAG. Hướng triển khai thường gồm: dùng dữ liệu riêng của doanh nghiệp, trả lời khách hàng...',
        },
      ],
      expectContains: 'chatbot',
    },
  ];

  let ctxPassed = 0;
  let ctxFailed = 0;

  for (const t of contextTests) {
    const response = await getServiceConsultationResponse(t.msg, '', t.recentMsgs);
    const containsExpected = response.toLowerCase().includes(t.expectContains.toLowerCase());
    
    if (containsExpected) {
      ctxPassed++;
      console.log(`✅ PASS | ${t.desc}`);
      console.log(`       => Response contains: "${t.expectContains}"`);
      console.log(`       => Snippet: "${response.slice(0, 100).replace(/\n/g, ' ')}..."`);
    } else {
      ctxFailed++;
      console.log(`❌ FAIL | ${t.desc}`);
      console.log(`       => Expected response to contain: "${t.expectContains}"`);
      console.log(`       => Got snippet: "${response.slice(0, 120).replace(/\n/g, ' ')}..."`);
    }
  }

  console.log('\n=========================================');
  console.log(`📊 Context Response Tests: ${ctxPassed} passed / ${ctxPassed + ctxFailed} total`);
  console.log('=========================================\n');

  if (failed + ctxFailed + projectFailed === 0) {
    console.log('🎉 TẤT CẢ TEST ĐỀU PASSED!');
  } else {
    console.log(`⚠️ Còn ${failed + ctxFailed + projectFailed} test chưa pass.`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
