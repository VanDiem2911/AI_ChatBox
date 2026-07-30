import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3001';
const anonymousSessionId = `test-multiturn-session-${Date.now()}`;

async function runMultiTurnTest() {
  console.log('====================================================');
  console.log('🧪 BẮT ĐẦU CHẠY KIỂM THỬ HỘI THOẠI ĐA LƯỢT (MULTI-TURN)');
  console.log('====================================================\n');

  // Step 1: Create a new conversation session
  console.log('1. Khởi tạo phiên hội thoại mới...');
  const initRes = await fetch(`${BASE_URL}/api/chat/conversations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ anonymousSessionId }),
  });
  
  if (!initRes.ok) {
    throw new Error(`Không thể tạo cuộc hội thoại: ${initRes.statusText}`);
  }
  
  const initData = await initRes.json() as any;
  const conversationId = initData.data._id;
  console.log(`   -> Created Session ID: ${conversationId}\n`);

  // --- LƯỢT 1: Hỏi website bán hàng mẫu ---
  console.log('----------------------------------------------------');
  console.log('💬 Lượt 1: "Cho mình xem một số website bán hàng mẫu đã làm"');
  const start1 = Date.now();
  const res1 = await fetch(`${BASE_URL}/api/chat/conversations/${conversationId}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content: 'Cho mình xem một số website bán hàng mẫu đã làm',
      anonymousSessionId,
    }),
  });

  const text1 = await res1.text();
  console.log(`⏱️ Latency: ${Date.now() - start1}ms`);
  console.log(`📝 Response:\n${text1}\n`);

  // Assertions for Turn 1
  const containsNamAn = text1.includes('Nam An Market');
  const containsOrganica = text1.includes('Organica');
  const containsBrightland = text1.includes('Brightland');
  const containsVinpearl = text1.includes('Vinpearl');

  if ((containsNamAn || containsOrganica || containsBrightland) && !containsVinpearl) {
    console.log('✅ KẾT QUẢ LƯỢT 1: PASSED (Hiển thị đúng các mẫu website bán hàng/e-commerce)\n');
  } else {
    console.log('❌ KẾT QUẢ LƯỢT 1: FAILED\n');
  }

  // --- LƯỢT 2: Hỏi "Cái khác đi" ---
  console.log('----------------------------------------------------');
  console.log('💬 Lượt 2: "Cái khác đi"');
  const start2 = Date.now();
  const res2 = await fetch(`${BASE_URL}/api/chat/conversations/${conversationId}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content: 'Cái khác đi',
      anonymousSessionId,
    }),
  });

  const text2 = await res2.text();
  console.log(`⏱️ Latency: ${Date.now() - start2}ms`);
  console.log(`📝 Response:\n${text2}\n`);

  // Assertions for Turn 2
  const containsHotelInTurn2 = text2.includes('Vinpearl') || text2.includes('Nhà Sói Homestay') || text2.includes('The Odys Boutique Hotel');
  const isCorrectEcommerce = text2.includes('Website') || text2.includes('bán lẻ') || text2.includes('E-commerce');
  
  // Make sure already shown projects from turn 1 are not repeated in turn 2
  const turn1Projects = ['Nam An Market', 'Brightland', 'Organica'].filter(p => text1.includes(p));
  const hasDuplicates = turn1Projects.some(p => text2.includes(p));

  if (!containsHotelInTurn2 && isCorrectEcommerce && !hasDuplicates) {
    console.log('✅ KẾT QUẢ LƯỢT 2: PASSED (Đã đổi sang các mẫu website bán hàng khác, không lặp lại mẫu cũ, không lệch sang khách sạn/homestay)\n');
  } else {
    let reason = '';
    if (containsHotelInTurn2) reason += 'Lệch chủ đề sang Khách sạn/Homestay | ';
    if (hasDuplicates) reason += 'Trùng mẫu cũ đã hiển thị | ';
    if (!isCorrectEcommerce) reason += 'Không chứa thông tin e-commerce | ';
    console.log(`❌ KẾT QUẢ LƯỢT 2: FAILED -> ${reason}\n`);
  }

  // --- LƯỢT 3: Hỏi "của website bán hàng cơ mà" ---
  console.log('----------------------------------------------------');
  console.log('💬 Lượt 3: "của website bán hàng cơ mà"');
  const start3 = Date.now();
  const res3 = await fetch(`${BASE_URL}/api/chat/conversations/${conversationId}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content: 'của website bán hàng cơ mà',
      anonymousSessionId,
    }),
  });

  const text3 = await res3.text();
  console.log(`⏱️ Latency: ${Date.now() - start3}ms`);
  console.log(`📝 Response:\n${text3}\n`);

  // Assertions for Turn 3
  const containsEcomInTurn3 = text3.includes('website bán hàng') || text3.includes('e-commerce') || text3.includes('Nam An Market') || text3.includes('LG Việt Nam');
  const containsHotelInTurn3 = text3.includes('Vinpearl') || text3.includes('Nhà Sói Homestay');

  if (containsEcomInTurn3 && !containsHotelInTurn3) {
    console.log('✅ KẾT QUẢ LƯỢT 3: PASSED (AI hiểu rõ chủ đề đang chỉnh sửa và giữ đúng ngữ cảnh website bán hàng)\n');
  } else {
    console.log('❌ KẾT QUẢ LƯỢT 3: FAILED\n');
  }
}

runMultiTurnTest().catch(console.error);
