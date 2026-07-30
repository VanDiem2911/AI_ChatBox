import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3001';
const anonymousSessionId = `edge-cases-session-${Date.now()}`;

async function runEdgeCasesTest() {
  console.log('====================================================');
  console.log('🧪 BẮT ĐẦU CHẠY KIỂM THỬ CÁC TRƯỜNG HỢP BIÊN MỚI');
  console.log('====================================================\n');

  // Step 1: Create a new conversation session
  const initRes = await fetch(`${BASE_URL}/api/chat/conversations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ anonymousSessionId }),
  });
  const initData = await initRes.json() as any;
  const conversationId = initData.data._id;

  // --- LƯỢT 1: Hỏi "website doanh nghiệp" ---
  console.log('💬 Lượt 1: "website doanh nghiệp"');
  const res1 = await fetch(`${BASE_URL}/api/chat/conversations/${conversationId}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content: 'website doanh nghiệp',
      anonymousSessionId,
    }),
  });
  const text1 = await res1.text();
  console.log(`📝 Response:\n${text1}\n`);

  const containsCorporateWeb = text1.toLowerCase().includes('dự án') || text1.toLowerCase().includes('website giới thiệu doanh nghiệp') || text1.toLowerCase().includes('dudi software');
  const containsFallback1 = text1.includes('Rất tiếc');

  if (containsCorporateWeb && !containsFallback1) {
    console.log('✅ KẾT QUẢ LƯỢT 1: PASSED (Hiển thị đúng các mẫu website giới thiệu doanh nghiệp/công ty)\n');
  } else {
    console.log('❌ KẾT QUẢ LƯỢT 1: FAILED\n');
  }

  // --- LƯỢT 2: Hỏi ngoài lề "Nhậu ko" ---
  console.log('----------------------------------------------------');
  console.log('💬 Lượt 2: "Nhậu ko"');
  const res2 = await fetch(`${BASE_URL}/api/chat/conversations/${conversationId}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content: 'Nhậu ko',
      anonymousSessionId,
    }),
  });
  const text2 = await res2.text();
  console.log(`📝 Response:\n${text2}\n`);

  const containsQuanNhauProject = text2.includes('Quán Nhậu Tự Do') || text2.includes('quannhautudo.com');
  const containsFriendlyDrinkingResponse = text2.includes('không đi nhậu được đâu');
  const containsDuName = text2.includes('DU');

  if (!containsQuanNhauProject && containsFriendlyDrinkingResponse && containsDuName) {
    console.log('✅ KẾT QUẢ LƯỢT 2: PASSED (Trả lời cực kỳ thông minh, tự nhiên về câu hỏi đi nhậu với tên DU, không trả về nhầm dự án Quán Nhậu Tự Do)\n');
  } else {
    console.log('❌ KẾT QUẢ LƯỢT 2: FAILED (Trả lời chưa tự nhiên, thiếu tên DU hoặc bị nhầm dự án)\n');
  }
}

runEdgeCasesTest().catch(console.error);
