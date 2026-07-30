import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3001';
const anonymousSessionId = `all-industries-session-${Date.now()}`;

async function runAllIndustriesTest() {
  console.log('====================================================');
  console.log('🧪 BẮT ĐẦU CHẠY KIỂM THỬ TƯ VẤN CHO TẤT CẢ CÁC NGÀNH');
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
      query: 'tư vấn website nha khoa',
      assertText: 'Đây là nhóm Website Nha Khoa / Phòng Khám / Sức Khỏe.',
    },
    {
      query: 'làm website thời trang',
      assertText: 'Đây là nhóm Website/Ứng dụng ngành Thời trang & Làm đẹp.',
    },
    {
      query: 'tư vấn website xây dựng',
      assertText: 'Đây là nhóm Website ngành Xây dựng, Kiến trúc & Nội thất.',
    },
    {
      query: 'làm website tuyển dụng',
      assertText: 'Đây là nhóm Website Tuyển dụng & Kết nối việc làm.',
    },
    {
      query: 'website thú cưng',
      assertText: 'Đây là nhóm Website Pet Shop & Dịch vụ Thú cưng.',
    },
    {
      query: 'tư vấn luật sư',
      assertText: 'Đây là nhóm Website Văn phòng Luật & Tư vấn Pháp luật.',
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
      console.log(`✅ KẾT QUẢ "${tc.query}": PASSED\n`);
    } else {
      console.log(`❌ KẾT QUẢ "${tc.query}": FAILED\n`);
    }
  }
}

runAllIndustriesTest().catch(console.error);
