const BASE_URL = 'http://localhost:3000';

export interface TestCase {
  id: string;
  category: string;
  name: string;
  userMessage: string;
  expectedKeywords: string[];
  unexpectedKeywords?: string[];
  checkTicket?: boolean;
}

export const TEST_CASES: TestCase[] = [
  // --- NHÓM 1: GIỚI THIỆU & THÔNG TIN CÔNG TY (TC 01 - 05) ---
  {
    id: 'TC-01',
    category: 'Giới thiệu Doanh nghiệp',
    name: 'Giới thiệu tổng quan về DUDI Software',
    userMessage: 'Giới thiệu về công ty DUDI Software cho mình biết với',
    expectedKeywords: ['DUDI Software', 'phát triển phần mềm', 'giải pháp'],
    unexpectedKeywords: ['Afamily', ' Every Half'],
  },
  {
    id: 'TC-02',
    category: 'Thông tin Liên hệ Direct',
    name: 'Hỏi địa chỉ văn phòng & hotline trực tiếp',
    userMessage: 'Cho xin địa chỉ văn phòng và số điện thoại hotline liên hệ công ty',
    expectedKeywords: ['232 Đường Nguyễn Thị Minh Khai', '49/2 Đường 14', '909 163 821'],
  },
  {
    id: 'TC-03',
    category: 'Danh mục Dịch vụ',
    name: 'Hỏi danh mục các dịch vụ công nghệ chính',
    userMessage: 'DUDI Software đang cung cấp những nhóm dịch vụ công nghệ nào?',
    expectedKeywords: ['Website doanh nghiệp', 'e-commerce', 'Mobile app', 'CRM/ERP'],
  },
  {
    id: 'TC-04',
    category: 'Giờ làm việc & Hỗ trợ',
    name: 'Hỏi giờ làm việc & kênh hỗ trợ tư vấn',
    userMessage: 'Công ty làm việc vào những khung giờ nào và hỗ trợ qua kênh nào?',
    expectedKeywords: ['Thứ Hai đến Thứ Sáu', '9:00 AM', '6:00 PM', '909 163 821'],
  },
  {
    id: 'TC-05',
    category: 'Năng lực & Kinh nghiệm',
    name: 'Hỏi thống kê năng lực & kinh nghiệm của DUDI Software',
    userMessage: 'DUDI Software đã hoàn thành bao nhiêu dự án và có mấy năm kinh nghiệm?',
    expectedKeywords: ['150+', '50+', '30+', '5+'],
  },

  // --- NHÓM 2: TƯ VẤN NGUYÊN NGÀNH HÀNG & GIẢI PHÁP (TC 06 - 17) ---
  {
    id: 'TC-06',
    category: 'Tư vấn Chuyên ngành',
    name: 'Tư vấn website Bất động sản / Nhà đất',
    userMessage: 'Tư vấn cho tôi web site bất động sản',
    expectedKeywords: ['Bất động sản', 'dự án', 'nhà đất', '360'],
    unexpectedKeywords: ['mẫu tham khảo vừa gửi'],
  },
  {
    id: 'TC-07',
    category: 'Tư vấn Chuyên ngành',
    name: 'Tư vấn website / hệ thống Showroom Ô tô',
    userMessage: 'Tư vấn cho mình thiết kế website cho showroom ô tô',
    expectedKeywords: ['Ô tô', 'Showroom', 'lăn bánh', 'lái thử'],
  },
  {
    id: 'TC-08',
    category: 'Tư vấn Chuyên ngành',
    name: 'Tư vấn website Du lịch, Tour & Booking',
    userMessage: 'Mình cần tư vấn làm website đặt tour du lịch và khách sạn',
    expectedKeywords: ['Du lịch', 'Tour', 'Booking', 'lịch trình'],
  },
  {
    id: 'TC-09',
    category: 'Tư vấn E-commerce',
    name: 'Tư vấn website Bán hàng / E-commerce tổng quan',
    userMessage: 'Website bán hàng/e-commerce, đặt hàng và thanh toán online.',
    expectedKeywords: ['bán hàng', 'giỏ hàng', 'thanh toán online'],
  },
  {
    id: 'TC-10',
    category: 'Tư vấn E-commerce',
    name: 'Tư vấn website thời trang / quần áo',
    userMessage: 'Tư vấn làm website bán quần áo thời trang nữ',
    expectedKeywords: ['thời trang', 'sản phẩm', 'đặt hàng'],
  },
  {
    id: 'TC-11',
    category: 'Tư vấn E-commerce',
    name: 'Tư vấn website thực phẩm sạch / organic / F&B',
    userMessage: 'Tư vấn thiết kế web bán thực phẩm sạch organic',
    expectedKeywords: ['thực phẩm', 'sản phẩm', 'đặt hàng'],
  },
  {
    id: 'TC-12',
    category: 'Tư vấn E-commerce',
    name: 'Tư vấn website đồ gia dụng / thiết bị nhà bếp',
    userMessage: 'Tư vấn website kinh doanh đồ gia dụng thiết bị nhà bếp nhập khẩu',
    expectedKeywords: ['gia dụng', 'sản phẩm', 'đặt hàng'],
  },
  {
    id: 'TC-13',
    category: 'Tư vấn Giải pháp',
    name: 'Tư vấn phát triển Mobile App iOS & Android',
    userMessage: 'Tư vấn phát triển ứng dụng di động mobile app trên iOS và Android',
    expectedKeywords: ['mobile app', 'iOS', 'Android', 'UI/UX'],
  },
  {
    id: 'TC-14',
    category: 'Tư vấn Giải pháp',
    name: 'Tư vấn Phần mềm quản lý CRM / ERP Doanh nghiệp',
    userMessage: 'Tư vấn xây dựng hệ thống phần mềm quản lý CRM ERP cho doanh nghiệp',
    expectedKeywords: ['CRM/ERP', 'quản lý', 'khách hàng', 'đơn hàng'],
  },
  {
    id: 'TC-15',
    category: 'Tư vấn Giải pháp',
    name: 'Tư vấn Giải pháp AI Chatbot & RAG tự động',
    userMessage: 'Tư vấn ứng dụng AI Chatbot RAG tự động chăm sóc khách hàng',
    expectedKeywords: ['AI chatbot', 'RAG', 'chăm sóc khách hàng'],
  },
  {
    id: 'TC-16',
    category: 'Tư vấn Hạ tầng',
    name: 'Tư vấn Hạ tầng Điện toán Đám mây Cloud & DevOps',
    userMessage: 'Tư vấn hạ tầng cloud devops aws docker cho hệ thống',
    expectedKeywords: ['Cloud', 'DevOps', 'AWS', 'Docker'],
  },
  {
    id: 'TC-17',
    category: 'Tư vấn Thiết kế',
    name: 'Tư vấn Dịch vụ Thiết kế UI/UX Chuyên nghiệp',
    userMessage: 'Tư vấn dịch vụ thiết kế UI UX cho sản phẩm số',
    expectedKeywords: ['UI/UX', 'giao diện', 'trải nghiệm'],
  },

  // --- NHÓM 3: XEM MẪU DỰ ÁN / PORTFOLIO THEO NGÀNH (TC 18 - 23) ---
  {
    id: 'TC-18',
    category: 'Portfolio Mẫu Dự án',
    name: 'Hỏi xem dự án mẫu Website Bán hàng / E-commerce',
    userMessage: 'Cho mình xem một số website bán hàng mẫu đã làm',
    expectedKeywords: ['Dự án', 'Website', 'chi tiết'],
    unexpectedKeywords: ['mẫu tham khảo vừa gửi'],
  },
  {
    id: 'TC-19',
    category: 'Portfolio Mẫu Dự án',
    name: 'Hỏi xem dự án mẫu Ngành Ô tô',
    userMessage: 'Cho tôi xem các dự án website ô tô đã làm',
    expectedKeywords: ['Dự án', 'ô tô', 'Website'],
  },
  {
    id: 'TC-20',
    category: 'Portfolio Mẫu Dự án',
    name: 'Hỏi xem dự án mẫu Ngành Bất động sản',
    userMessage: 'Cho xem một số mẫu dự án website bất động sản nhà đất đã thực hiện',
    expectedKeywords: ['Dự án', 'bất động sản', 'Website'],
  },
  {
    id: 'TC-21',
    category: 'Portfolio Mẫu Dự án',
    name: 'Hỏi xem dự án mẫu Ngành F&B / Nhà hàng / Quán café',
    userMessage: 'Cho tôi xem các dự án website quán café trà sữa nhà hàng F&B',
    expectedKeywords: ['Dự án', 'Website'],
  },
  {
    id: 'TC-22',
    category: 'Portfolio Mẫu Dự án',
    name: 'Hỏi xem dự án mẫu Ngành Media Studio / Chụp ảnh',
    userMessage: 'Gửi mình xem các dự án thiết kế cho media studio chụp ảnh',
    expectedKeywords: ['Dự án', 'Website'],
  },
  {
    id: 'TC-23',
    category: 'Portfolio Mẫu Dự án',
    name: 'Hỏi xem dự án mẫu Ngành Blog / Tin tức / Lifestyle',
    userMessage: 'Cho xem mẫu các website tin tức blog trang tin đã làm',
    expectedKeywords: ['Dự án', 'Website'],
  },

  // --- NHÓM 4: TƯ VẤN THEO MẪU HỆ THỐNG CÓ SẴN (TC 24 - 25) ---
  {
    id: 'TC-24',
    category: 'Tư vấn theo Mẫu',
    name: 'Tư vấn làm web quản lý bán hàng giống Abitmes / Pancake',
    userMessage: 'Tư vấn cho mình làm web quản lý bán hàng giống Abitmes với',
    expectedKeywords: ['Abitmes', 'DUDI Software'],
  },
  {
    id: 'TC-25',
    category: 'Tư vấn theo Mẫu',
    name: 'Tư vấn làm web bán hàng đa kênh giống Shopify / Haravan',
    userMessage: 'Tư vấn làm website bán hàng đa kênh tương tự như Shopify',
    expectedKeywords: ['Shopify', 'đa kênh', 'DUDI Software'],
  },

  // --- NHÓM 5: BÁO GIÁ, CHI PHÍ & THU THẬP LEAD (TC 26 - 28) ---
  {
    id: 'TC-26',
    category: 'Chính sách Báo giá',
    name: 'Hỏi giá thiết kế website bán hàng (Báo giá + Ticket)',
    userMessage: 'Báo giá thiết kế website bán hàng trọn gói bao nhiêu tiền vậy?',
    expectedKeywords: ['báo giá', 'số điện thoại', 'liên hệ'],
    checkTicket: true,
  },
  {
    id: 'TC-27',
    category: 'Chính sách Báo giá',
    name: 'Hỏi chi phí phát triển Mobile App (Báo giá + Ticket)',
    userMessage: 'Chi phí làm ứng dụng mobile app iOS Android là bao nhiêu tiền?',
    expectedKeywords: ['báo giá', 'số điện thoại', 'liên hệ'],
    checkTicket: true,
  },
  {
    id: 'TC-28',
    category: 'Gửi Số điện thoại Lead',
    name: 'Khách hàng gửi SĐT sau khi hỏi báo giá (Luồng 2 bước)',
    userMessage: 'SĐT của mình là 0988776655, nhờ tư vấn giúp',
    expectedKeywords: ['0988776655', 'ghi nhận', 'liên hệ'],
    checkTicket: true,
  },

  // --- NHÓM 6: BẢO HÀNH & QUY TRÌNH DỰ ÁN (TC 29 - 30) ---
  {
    id: 'TC-29',
    category: 'Chính sách Bảo hành',
    name: 'Hỏi chính sách bảo hành & bảo trì sau bàn giao',
    userMessage: 'Chính sách bảo hành và bảo trì hỗ trợ kỹ thuật sau khi bàn giao thế nào?',
    expectedKeywords: ['Bảo hành', '24/7', 'bảo trì'],
  },
  {
    id: 'TC-30',
    category: 'Quy trình Triển khai',
    name: 'Hỏi quy trình 6 bước làm việc tại DUDI Software',
    userMessage: 'Quy trình triển khai thiết kế một dự án website tại DUDI gồm các bước nào?',
    expectedKeywords: ['Quy trình', 'bước', 'Tư vấn'],
  },
];

export interface TestResultItem {
  id: string;
  category: string;
  name: string;
  userMessage: string;
  responseTimeMs: number;
  status: 'PASSED' | 'FAILED' | 'ERROR';
  failureReasons: string[];
  responseSnippet: string;
}

async function runTestSuite() {
  console.log('====================================================');
  console.log('🚀 BẮT ĐẦU CHẠY BỘ TEST 30 KỊCH BẢN CHATBOT DUDI SOFTWARE');
  console.log('====================================================\n');

  const results: TestResultItem[] = [];

  for (const tc of TEST_CASES) {
    const start = Date.now();
    console.log(`----------------------------------------------------`);
    console.log(`🧪 [${tc.id}] (${tc.category}) ${tc.name}`);
    console.log(`💬 User: "${tc.userMessage}"`);

    // Create a FRESH conversation for EACH test case
    const sessionRes = await fetch(`${BASE_URL}/api/chat/conversations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        anonymousSessionId: `test-session-${tc.id}-${Date.now()}`,
        title: `Test Case ${tc.id}`,
      }),
    });
    const sessionData = (await sessionRes.json()) as any;
    const conversationId = sessionData.data?._id;
    const sessionId = sessionData.data?.anonymousSessionId;

    // For TC-28, send pricing inquiry first so conversation enters pricing handoff mode
    if (tc.id === 'TC-28') {
      await fetch(`${BASE_URL}/api/chat/conversations/${conversationId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: 'Cho xin báo giá thiết kế website bán hàng với',
          anonymousSessionId: sessionId,
        }),
      });
      await new Promise((r) => setTimeout(r, 300));
    }

    try {
      const res = await fetch(`${BASE_URL}/api/chat/conversations/${conversationId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: tc.userMessage,
          anonymousSessionId: sessionId,
        }),
      });

      const responseTime = Date.now() - start;
      const text = await res.text();

      let passed = true;
      const failureReasons: string[] = [];

      if (!res.ok) {
        passed = false;
        failureReasons.push(`HTTP Status ${res.status}`);
      }

      // Check expected keywords
      for (const kw of tc.expectedKeywords) {
        if (!text.toLowerCase().includes(kw.toLowerCase())) {
          passed = false;
          failureReasons.push(`Thiếu từ khóa kỳ vọng: "${kw}"`);
        }
      }

      // Check unexpected keywords
      if (tc.unexpectedKeywords) {
        for (const unkw of tc.unexpectedKeywords) {
          if (text.toLowerCase().includes(unkw.toLowerCase())) {
            passed = false;
            failureReasons.push(`Chứa từ khóa KHÔNG mong muốn: "${unkw}"`);
          }
        }
      }

      console.log(`⏱️ Latency: ${responseTime}ms`);
      console.log(`📝 Response: ${text.slice(0, 140).replace(/\n/g, ' ')}...`);

      if (passed) {
        console.log(`✅ KẾT QUẢ: PASSED`);
      } else {
        console.log(`❌ KẾT QUẢ: FAILED -> ${failureReasons.join(' | ')}`);
      }

      results.push({
        id: tc.id,
        category: tc.category,
        name: tc.name,
        userMessage: tc.userMessage,
        responseTimeMs: responseTime,
        status: passed ? 'PASSED' : 'FAILED',
        failureReasons,
        responseSnippet: text.slice(0, 300),
      });

    } catch (err: any) {
      console.log(`❌ KẾT QUẢ: ERROR -> ${err.message}`);
      results.push({
        id: tc.id,
        category: tc.category,
        name: tc.name,
        userMessage: tc.userMessage,
        responseTimeMs: Date.now() - start,
        status: 'ERROR',
        failureReasons: [err.message],
        responseSnippet: '',
      });
    }

    await new Promise((r) => setTimeout(r, 250));
  }

  console.log('\n====================================================');
  console.log('📊 TÓM TẮT KẾT QUẢ CHẠY TEST 30 KỊCH BẢN');
  console.log('====================================================');
  const total = results.length;
  const passed = results.filter((r) => r.status === 'PASSED').length;
  const failed = total - passed;
  console.log(`Total: ${total} | Passed: ${passed} | Failed: ${failed} | Pass Rate: ${((passed / total) * 100).toFixed(1)}%\n`);

  return results;
}

runTestSuite().catch(console.error);
