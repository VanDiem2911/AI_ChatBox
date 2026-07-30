import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3001';
const anonymousSessionId = `standalone-overview-session-${Date.now()}`;

async function runStandaloneOverviewTest() {
  console.log('====================================================');
  console.log('🧪 BẮT ĐẦU CHẠY KIỂM THỬ STANDALONE TƯ VẤN');
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
      query: 'Tư vấn',
      assertText: 'DUDI Software thường tư vấn theo 7 nhóm chính:',
    },
    {
      query: 'Tôi muốn tư vấn',
      assertText: 'DUDI Software thường tư vấn theo 7 nhóm chính:',
    },
    {
      query: 'Tư vấn giúp em',
      assertText: 'DUDI Software thường tư vấn theo 7 nhóm chính:',
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

runStandaloneOverviewTest().catch(console.error);
