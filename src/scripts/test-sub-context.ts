import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3001';
const anonymousSessionId = `sub-context-session-${Date.now()}`;

async function runSubContextTest() {
  console.log('====================================================');
  console.log('🧪 BẮT ĐẦU CHẠY KIỂM THỬ SUB-CONTEXT (ĐẦU VÀO ĐỊNH HƯỚNG)');
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

  const turns = [
    {
      query: 'Tư vấn',
      assertText: 'DUDI Software thường tư vấn theo 7 nhóm chính:',
    },
    {
      query: 'Mobile app iOS/Android.',
      assertText: 'Đây là nhóm mobile app iOS/Android.',
    },
    {
      query: 'bán hàng,',
      assertText: 'Đây là nhóm Mobile App Bán hàng & E-commerce.',
    }
  ];

  for (let i = 0; i < turns.length; i++) {
    const turn = turns[i];
    console.log(`💬 Lượt ${i + 1}: "${turn.query}"`);

    const res = await fetch(`${BASE_URL}/api/chat/conversations/${conversationId}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: turn.query,
        anonymousSessionId,
      }),
    });

    const text = await res.text();
    console.log(`📝 Response:\n${text}\n`);

    if (text.includes(turn.assertText)) {
      console.log(`✅ KẾT QUẢ: PASSED\n`);
    } else {
      console.log(`❌ KẾT QUẢ: FAILED (Mong đợi chứa: "${turn.assertText}")\n`);
    }
  }
}

runSubContextTest().catch(console.error);
