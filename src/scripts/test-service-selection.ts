 import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3001';
const anonymousSessionId = `service-selection-session-${Date.now()}`;

async function runServiceSelectionTest() {
  console.log('====================================================');
  console.log('🧪 BẮT ĐẦU KIỂM THỬ CHỌN PHÂN LOẠI DỊCH VỤ (SERVICE SELECTIONS)');
  console.log('====================================================\n');

  // Step 1: Create a new conversation session
  const initRes = await fetch(`${BASE_URL}/api/chat/conversations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ anonymousSessionId }),
  });
  const initData = await initRes.json() as any;
  const conversationId = initData.data._id;
  console.log(`Initialized Session ID: ${conversationId}\n`);

  const testCases = [
    {
      query: 'landing page,',
      assertText: 'Đây là nhóm Website Landing Page / Giới thiệu sản phẩm.',
      tag: 'landing page,'
    },
    {
      query: 'Web landing page',
      assertText: 'Đây là nhóm Website Landing Page / Giới thiệu sản phẩm.',
      tag: 'Web landing page'
    },
    {
      query: 'Website doanh nghiệp,',
      assertText: 'Đây là nhóm Website Doanh Nghiệp / Giới thiệu thương hiệu.',
      tag: 'Website doanh nghiệp,'
    },
    {
      query: 'website giới thiệu thương hiệu.',
      assertText: 'Đây là nhóm Website Doanh Nghiệp / Giới thiệu thương hiệu.',
      tag: 'website giới thiệu thương hiệu.'
    }
  ];

  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i];
    console.log(`💬 Lượt ${i + 1}: "${tc.query}"`);

    const res = await fetch(`${BASE_URL}/api/chat/conversations/${conversationId}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: tc.query,
        anonymousSessionId,
      }),
    });

    const text = await res.text();
    console.log(`📝 Response:\n${text}\n`);

    if (text.includes(tc.assertText)) {
      console.log(`✅ KẾT QUẢ "${tc.tag}": PASSED\n`);
    } else {
      console.log(`❌ KẾT QUẢ "${tc.tag}": FAILED\n`);
    }
  }
}

runServiceSelectionTest().catch(console.error);
