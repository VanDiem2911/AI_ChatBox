const fs = require('fs');
const path = require('path');

const content = fs.readFileSync('C:/Users/NGO TRAN VAN DIEM/.gemini/antigravity-ide/brain/8f2e5fa3-9e9d-4344-9b32-01c42e872278/.system_generated/steps/24/content.md', 'utf8');
const jsonStr = content.split('---\n\n')[1];
const projects = JSON.parse(jsonStr);

console.log(`Extracted ${projects.length} raw projects from API.`);

const categoriesMap = {};
projects.forEach((p) => {
  const catName = (p.category && p.category.vi) || (p.categories && p.categories[0] && p.categories[0].vi) || 'Khác';
  if (!categoriesMap[catName]) categoriesMap[catName] = [];
  categoriesMap[catName].push(p);
});

let docs = [
  {
    title: 'Tổng Quan & Thông Tin Liên Hệ Công Ty DUDI SOFTWARE',
    category: 'Giới thiệu & Liên hệ',
    tags: ['giới thiệu', 'dudi software', 'liên hệ', 'địa chỉ', 'hotline', 'tầm nhìn', 'sứ mệnh'],
    sourceType: 'URL',
    sourceName: 'https://www.dudisoftware.com/#about',
    content: `CÔNG TY TNHH PHẦN MỀM DUDI SOFTWARE (DUDI SOFTWARE)
- Khẩu hiệu / Slogan: Giải pháp Phần mềm Thông minh - "Chúng tôi biến ý tưởng thành phần mềm mạnh mẽ, tạo nên sự đột phá."
- Giới thiệu chung: DUDI Software được thành lập với sứ mệnh mang lại những giải pháp công nghệ hiện đại nhất cho doanh nghiệp Việt Nam và vươn tầm quốc tế.
- Sứ mệnh: Giúp doanh nghiệp phát triển và vận hành một cách hiệu quả với chi phí tối ưu nhất.
- Tầm nhìn: Trở thành công ty công nghệ hàng đầu tại Việt Nam, vươn tầm quốc tế.
- Giá trị cốt lõi: Chính trực, sáng tạo và luôn đặt khách hàng làm trung tâm trong mọi quyết định.
- Định hướng phát triển: Chuyên nghiệp, Hiệu quả, Đáng tin cậy.

THÔNG TIN LIÊN HỆ DUDI SOFTWARE:
- Địa chỉ 1: 232 Đường Nguyễn Thị Minh Khai, Phường Xuân Hòa, TP. Hồ Chí Minh
- Địa chỉ 2: 49/2 Đường 14, Phường Thủ Đức, TP. Hồ Chí Minh
- Hotline / Điện thoại: (+84) 909 163 821
- Email tiếp nhận liên hệ: contact@dudisoftware.com
- Giờ làm việc: Thứ Hai đến Thứ Sáu, từ 9:00 AM - 6:00 PM.
- Kênh tư vấn nhanh: Quét mã QR Zalo trên trang chủ hoặc gửi form liên hệ trực tiếp trên hệ thống.`
  },
  {
    title: 'Danh Mục Dịch Vụ Công Nghệ & Năng Lực Của DUDI SOFTWARE',
    category: 'Dịch vụ & Công nghệ',
    tags: ['dịch vụ', 'phát triển web', 'mobile app', 'ui ux', 'cloud', 'ai', 'chatbot', 'bảo trì'],
    sourceType: 'URL',
    sourceName: 'https://www.dudisoftware.com/#services',
    content: `CÁC DỊCH VỤ CÔNG NGHỆ TRỌNG TÂM CỦA DUDI SOFTWARE:

1. Phát triển ứng dụng Web & Phần mềm Doanh nghiệp:
   - Xây dựng giải pháp phần mềm, hệ thống website doanh nghiệp, e-commerce, hệ thống quản trị ERP/CRM theo yêu cầu riêng.
   - Phù hợp với mọi quy mô từ startup đến tập đoàn lớn.

2. Phát triển Ứng dụng Di động (Mobile App):
   - Phát triển ứng dụng di động đa nền tảng (iOS & Android) bằng React Native, Flutter.
   - Tập trung vào mượt mà, hiệu năng cao và trải nghiệm người dùng (UX) xuất sắc.

3. Thiết kế UI/UX Chuyên nghiệp:
   - Thiết kế giao diện tinh tế, hiện đại, chuẩn UI/UX tối ưu hóa tỷ lệ chuyển đổi cho sản phẩm số.

4. Giải pháp Điện toán Đám mây (Cloud & DevOps):
   - Tư vấn và triển khai hạ tầng đám mây (AWS, Docker, Microservices), đảm bảo hệ thống vận hành ổn định, mở rộng linh hoạt và bảo mật cao.

5. AI & Học Máy (AI & Machine Learning / Chatbot RAG):
   - Ứng dụng Trí tuệ Nhân tạo (AI), xử lý ngôn ngữ tự nhiên (NLP) và RAG Chatbot thông minh giúp tự động hóa chăm sóc khách hàng 24/7 và tối ưu quy trình kinh doanh.

6. Dịch vụ Hỗ trợ Kỹ thuật & Bảo trì 24/7:
   - Đội ngũ kỹ thuật viên giàu kinh nghiệm trực 24/7, khắc phục sự cố nhanh chóng, bảo trì hệ thống định kỳ.

CÔNG NGHỆ VÀ CÔNG CỤ SỬ DỤNG:
- Frontend / Frameworks: React, Next.js, Vue, Angular, TypeScript.
- Backend: Node.js, Python, Laravel (PHP), Java.
- Mobile: React Native, Flutter.
- Cơ sở dữ liệu: MongoDB, MySQL, PostgreSQL.
- Cloud & Infrastructure: AWS, Docker, Kubernetes, Git, CI/CD.

THỐNG KÊ NĂNG LỰC:
- 150+ Dự án hoàn thành xuất sắc.
- 50+ Khách hàng doanh nghiệp hài lòng.
- 30+ Kỹ sư & Chuyên gia công nghệ giàu kinh nghiệm.
- 5+ Năm kinh nghiệm thực chiến trong ngành phần mềm.`
  },
  {
    title: 'Quy Trình Làm Việc & Báo Giá Dịch Vụ Tại DUDI SOFTWARE',
    category: 'Quy trình & Báo giá',
    tags: ['quy trình', 'báo giá', 'bảo hành', 'tư vấn'],
    sourceType: 'TEXT',
    sourceName: 'DUDI Software Internal Workflow',
    content: `QUY TRÌNH HỢP TÁC VÀ TƯ VẤN DỰ ÁN TẠI DUDI SOFTWARE:

Bước 1: Tiếp nhận thông tin & Khảo sát nhu cầu:
- Đội ngũ tư vấn DUDI Software phân tích bài toán kinh doanh và yêu cầu chức năng của khách hàng.

Bước 2: Tư vấn giải pháp & Báo giá chi tiết:
- Đề xuất kiến trúc công nghệ phù hợp nhất (Web/App/AI/Cloud), lập kế hoạch triển khai và gửi báo giá minh bạch.

Bước 3: Thiết kế UI/UX & Lập trình phần mềm:
- Phát triển giao diện mẫu (Prototype), tiến hành lập trình theo quy trình Agile/Scrum ngắn hạn.

Bước 4: Kiểm thử chất lượng (QA/QC) & Bàn giao:
- Kiểm thử bảo mật, hiệu năng, kiểm thử trên nhiều thiết bị trước khi triển khai chính thức.

Bước 5: Bảo hành & Hỗ trợ vận hành 24/7:
- Cam kết bảo hành, khắc phục sự cố khẩn cấp dưới 30 phút, sao lưu dữ liệu và bảo trì định kỳ.

HỖ TRỢ BÁO GIÁ & TƯ VẤN KỸ THUẬT:
Khách hàng có thể để lại thông tin tên, email, sđt và yêu cầu tại website dudisoftware.com hoặc gọi hotline (+84) 909 163 821 để được chuyên gia tư vấn miễn phí.`
  }
];

Object.keys(categoriesMap).forEach((catName) => {
  const catProjects = categoriesMap[catName];
  const projectTitles = catProjects.map((p) => p.title_vi || p.title_en);
  
  let contentText = `DANH SÁCH DỰ ÁN DUDI SOFTWARE THỰC HIỆN TRONG LĨNH VỰC ${catName.toUpperCase()} (${catProjects.length} Dự án):\n\n`;
  
  catProjects.forEach((p, idx) => {
    const title = p.title_vi || p.title_en;
    const subtitle = (p.subtitle_vi || p.subtitle_en || 'Không có mô tả').replace(/\r/g, '').trim();
    const url = p.url || 'https://dudisoftware.com/projects';
    contentText += `${idx + 1}. Dự án ${title}:\n- URL / Link: ${url}\n- Mô tả chi tiết: ${subtitle}\n\n`;
  });

  docs.push({
    title: `Kho Dự Án Tiêu Biểu Lĩnh Vực ${catName} Của DUDI SOFTWARE`,
    category: `Kho Dự Án - ${catName}`,
    tags: ['dự án', catName.toLowerCase(), ...projectTitles.slice(0, 10)],
    sourceType: 'URL',
    sourceName: 'https://www.dudisoftware.com/projects',
    content: contentText.trim()
  });
});

const tsFileContent = `export interface IDudiKnowledgeDoc {
  title: string;
  category: string;
  tags: string[];
  sourceType: 'TEXT' | 'URL';
  sourceName: string;
  content: string;
}

export const DUDI_KNOWLEDGE_DOCUMENTS: IDudiKnowledgeDoc[] = ${JSON.stringify(docs, null, 2)};
`;

const outputPath = path.join(__dirname, '../data/dudi-knowledge.ts');
fs.writeFileSync(outputPath, tsFileContent, 'utf8');

console.log(`Successfully generated src/data/dudi-knowledge.ts with ${docs.length} total documents covering ALL ${projects.length} projects!`);
