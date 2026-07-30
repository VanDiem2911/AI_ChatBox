import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3001';
const anonymousSessionId = `offtopic-test-session-${Date.now()}`;

const OFFTOPIC_QUERIES = [
  "Hôm nay thời tiết Hà Nội thế nào?",
  "Nhậu không bạn ơi?",
  "Bạn có người yêu chưa?",
  "Trái đất hình tròn hay dẹt?",
  "Có biết viết code Python không?",
  "Bạn thích ăn món gì nhất?",
  "Kể một câu chuyện cười đi",
  "Làm sao để giàu nhanh?",
  "Trông tôi hôm nay thế nào?",
  "Mẹ bạn là ai?",
  "Đi xem phim với mình không?",
  "Bitcoin hôm nay giá bao nhiêu?",
  "Ai là tổng thống Mỹ?",
  "Bạn thích xem bóng đá không?",
  "Làm thế nào để giảm cân?",
  "Hôm nay là ngày mấy?",
  "Bạn có biết hát không?",
  "Chơi game với mình đi",
  "Nước Việt Nam có bao nhiêu tỉnh thành?",
  "Bạn là nam hay nữ?",
  "Tâm sự tuổi hồng đi bạn",
  "Trời mưa thì mặc trời mưa chứ nhỉ",
  "Bao giờ thì thế giới diệt vong?",
  "Bạn có tin vào người ngoài hành tinh không?",
  "Ăn gì tối nay?",
  "Có biết nói tiếng Anh không?",
  "Chatbot này thông minh thế",
  "Mơ thấy trúng số là điềm gì?",
  "Thức khuya có tốt không?",
  "Ngủ ngon nhé bạn yêu"
];

async function runOfftopicTest() {
  console.log('====================================================');
  console.log('🧪 CHẠY THỬ NGHIỆM 30 KỊCH BẢN KHÁCH NÓI TÀO LAO (OFF-TOPIC)');
  console.log('====================================================\n');

  let passCount = 0;

  for (let i = 0; i < OFFTOPIC_QUERIES.length; i++) {
    const query = OFFTOPIC_QUERIES[i];
    const session = `offtopic-test-session-${Date.now()}-${i}`;
    
    // Init session
    const initRes = await fetch(`${BASE_URL}/api/chat/conversations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ anonymousSessionId: session }),
    });
    const initData = await initRes.json() as any;
    const conversationId = initData.data._id;

    console.log(`💬 Lượt ${i + 1}/${OFFTOPIC_QUERIES.length}: "${query}"`);

    const res = await fetch(`${BASE_URL}/api/chat/conversations/${conversationId}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: query,
        anonymousSessionId: session,
      }),
    });

    const text = await res.text();
    
    // Check constraints:
    // 1. Must not contain structured projects formatting or incorrect URLs (e.g. Quán Nhậu Tự Do or unrelated links)
    const containsUnexpectedProject = text.includes('quannhautudo.com') || text.includes('careerviet.vn') || text.includes('vieclam24h.vn') || text.includes('123job.vn');
    
    // 2. Must identify as DU or direct properly
    const mentionsDuName = text.includes('DU');
    const isFriendlyResponse = text.includes('em là DU') || text.includes('Trợ lý AI') || text.includes('DUDI Software') || text.includes('hẹn anh/chị') || text.includes('chưa hiểu rõ');

    if (!containsUnexpectedProject && (mentionsDuName || isFriendlyResponse)) {
      console.log(`✅ Kết quả: PASSED`);
      console.log(`   📝 AI (DU): ${text.replace(/\n/g, ' ')}\n`);
      passCount++;
    } else {
      console.log(`❌ Kết quả: FAILED`);
      console.log(`   📝 AI (DU): ${text}\n`);
    }
  }

  console.log('====================================================');
  console.log(`📊 TỔNG KẾT: ĐẠT ${passCount}/${OFFTOPIC_QUERIES.length} (${(passCount / OFFTOPIC_QUERIES.length * 100).toFixed(0)}%)`);
  console.log('====================================================');
}

runOfftopicTest().catch(console.error);
