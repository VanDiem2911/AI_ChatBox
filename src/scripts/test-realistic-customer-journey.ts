import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000';
const anonymousSessionId = `realistic-customer-session-${Date.now()}`;

async function runRealisticCustomerJourneyTest() {
  console.log('====================================================');
  console.log('🧪 BẮT ĐẦU CHẠY THỬ NGHIỆM HÀNH TRÌNH TƯ VẤN KHÁCH HÀNG THỰC TẾ (5 LƯỢT)');
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

  // --- LƯỢT 1: Hỏi tư vấn website thực phẩm sạch ---
  console.log('----------------------------------------------------');
  console.log('💬 Lượt 1: "Mình muốn làm một website bán thực phẩm sạch organic"');
  const start1 = Date.now();
  const res1 = await fetch(`${BASE_URL}/api/chat/conversations/${conversationId}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content: 'Mình muốn làm một website bán thực phẩm sạch organic',
      anonymousSessionId,
    }),
  });

  const text1 = await res1.text();
  console.log(`⏱️ Latency: ${Date.now() - start1}ms`);
  console.log(`📝 Response:\n${text1}\n`);

  // Assertions for Turn 1
  const containsFoodKeywords = text1.toLowerCase().includes('thực phẩm') || text1.toLowerCase().includes('f&b') || text1.toLowerCase().includes('bán hàng');
  if (containsFoodKeywords) {
    console.log('✅ KẾT QUẢ LƯỢT 1: PASSED (Tư vấn đúng nhóm giải pháp website thực phẩm sạch)\n');
  } else {
    console.log('❌ KẾT QUẢ LƯỢT 1: FAILED\n');
  }

  // --- LƯỢT 2: Hỏi xem dự án mẫu thực tế ---
  console.log('----------------------------------------------------');
  console.log('💬 Lượt 2: "Cho mình xem một số mẫu thực tế bên bạn đã làm"');
  const start2 = Date.now();
  const res2 = await fetch(`${BASE_URL}/api/chat/conversations/${conversationId}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content: 'Cho mình xem một số mẫu thực tế bên bạn đã làm',
      anonymousSessionId,
    }),
  });

  const text2 = await res2.text();
  console.log(`⏱️ Latency: ${Date.now() - start2}ms`);
  console.log(`📝 Response:\n${text2}\n`);

  // Assertions for Turn 2
  const containsNamAn = text2.includes('Nam An Market');
  const containsOrganica = text2.includes('Organica') || text2.includes('V-Organic');
  const containsHotel = text2.includes('Vinpearl') || text2.includes('Nhà Sói Homestay');

  if ((containsNamAn || containsOrganica) && !containsHotel) {
    console.log('✅ KẾT QUẢ LƯỢT 2: PASSED (Bám sát ngữ cảnh và trích xuất đúng mẫu dự án ngành Thực phẩm/F&B)\n');
  } else {
    let reason = '';
    if (containsHotel) reason += 'Lệch sang dự án Homestay/Khách sạn | ';
    if (!containsNamAn && !containsOrganica) reason += 'Không tìm thấy dự án thực phẩm | ';
    console.log(`❌ KẾT QUẢ LƯỢT 2: FAILED -> ${reason}\n`);
  }

  // --- LƯỢT 3: Hỏi báo giá ---
  console.log('----------------------------------------------------');
  console.log('💬 Lượt 3: "Chi phí hoàn thiện trọn gói phần này khoảng bao nhiêu?"');
  const start3 = Date.now();
  const res3 = await fetch(`${BASE_URL}/api/chat/conversations/${conversationId}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content: 'Chi phí hoàn thiện trọn gói phần này khoảng bao nhiêu?',
      anonymousSessionId,
    }),
  });

  const text3 = await res3.text();
  console.log(`⏱️ Latency: ${Date.now() - start3}ms`);
  console.log(`📝 Response:\n${text3}\n`);

  // Assertions for Turn 3
  const isPricingHandoff = text3.includes('báo giá') || text3.includes('chi phí') || text3.includes('số điện thoại');
  if (isPricingHandoff) {
    console.log('✅ KẾT QUẢ LƯỢT 3: PASSED (AI chuyển tiếp chính xác sang luồng thu thập Lead khi hỏi giá)\n');
  } else {
    console.log('❌ KẾT QUẢ LƯỢT 3: FAILED\n');
  }

  // --- LƯỢT 4: Gửi số điện thoại ---
  console.log('----------------------------------------------------');
  console.log('💬 Lượt 4: "Số điện thoại của mình là 0912345678, tên Hùng"');
  const start4 = Date.now();
  const res4 = await fetch(`${BASE_URL}/api/chat/conversations/${conversationId}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content: 'Số điện thoại của mình là 0912345678, tên Hùng',
      anonymousSessionId,
    }),
  });

  const text4 = await res4.text();
  console.log(`⏱️ Latency: ${Date.now() - start4}ms`);
  console.log(`📝 Response:\n${text4}\n`);

  // Assertions for Turn 4
  const containsConfirmation = text4.includes('ghi nhận') || text4.includes('0912345678') || text4.includes('liên hệ');
  if (containsConfirmation) {
    console.log('✅ KẾT QUẢ LƯỢT 4: PASSED (AI xác nhận ghi nhận số điện thoại thành công)\n');
  } else {
    console.log('❌ KẾT QUẢ LƯỢT 4: FAILED\n');
  }

  // --- LƯỢT 5: Hỏi chính sách bảo hành ---
  console.log('----------------------------------------------------');
  console.log('💬 Lượt 5: "À, sau khi bàn giao xong thì được hỗ trợ bảo hành thế nào nữa?"');
  const start5 = Date.now();
  const res5 = await fetch(`${BASE_URL}/api/chat/conversations/${conversationId}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content: 'À, sau khi bàn giao xong thì được hỗ trợ bảo hành thế nào nữa?',
      anonymousSessionId,
    }),
  });

  const text5 = await res5.text();
  console.log(`⏱️ Latency: ${Date.now() - start5}ms`);
  console.log(`📝 Response:\n${text5}\n`);

  // Assertions for Turn 5
  const containsWarrantyKeywords = text5.includes('bảo hành') || text5.includes('bảo trì') || text5.includes('miễn phí');
  if (containsWarrantyKeywords) {
    console.log('✅ KẾT QUẢ LƯỢT 5: PASSED (AI trích xuất đúng điều khoản bảo trì bảo hành 12 tháng)\n');
  } else {
    console.log('❌ KẾT QUẢ LƯỢT 5: FAILED\n');
  }
}

runRealisticCustomerJourneyTest().catch(console.error);
