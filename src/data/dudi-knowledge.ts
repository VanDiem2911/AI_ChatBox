export interface IDudiKnowledgeDoc {
  title: string;
  category: string;
  tags: string[];
  sourceType: 'TEXT' | 'URL';
  sourceName: string;
  content: string;
}

export const DUDI_KNOWLEDGE_DOCUMENTS: IDudiKnowledgeDoc[] = [
  {
    "title": "Tổng Quan & Thông Tin Liên Hệ Công Ty DUDI SOFTWARE",
    "category": "Giới thiệu & Liên hệ",
    "tags": [
      "giới thiệu",
      "dudi software",
      "liên hệ",
      "địa chỉ",
      "hotline",
      "tầm nhìn",
      "sứ mệnh"
    ],
    "sourceType": "URL",
    "sourceName": "https://www.dudisoftware.com/#about",
    "content": "CÔNG TY TNHH PHẦN MỀM DUDI SOFTWARE (DUDI SOFTWARE)\n- Khẩu hiệu / Slogan: Giải pháp Phần mềm Thông minh - \"Chúng tôi biến ý tưởng thành phần mềm mạnh mẽ, tạo nên sự đột phá.\"\n- Giới thiệu chung: DUDI Software được thành lập với sứ mệnh mang lại những giải pháp công nghệ hiện đại nhất cho doanh nghiệp Việt Nam và vươn tầm quốc tế.\n- Sứ mệnh: Giúp doanh nghiệp phát triển và vận hành một cách hiệu quả với chi phí tối ưu nhất.\n- Tầm nhìn: Trở thành công ty công nghệ hàng đầu tại Việt Nam, vươn tầm quốc tế.\n- Giá trị cốt lõi: Chính trực, sáng tạo và luôn đặt khách hàng làm trung tâm trong mọi quyết định.\n- Định hướng phát triển: Chuyên nghiệp, Hiệu quả, Đáng tin cậy.\n\nTHÔNG TIN LIÊN HỆ DUDI SOFTWARE:\n- Địa chỉ 1: 232 Đường Nguyễn Thị Minh Khai, Phường Xuân Hòa, TP. Hồ Chí Minh\n- Địa chỉ 2: 49/2 Đường 14, Phường Thủ Đức, TP. Hồ Chí Minh\n- Hotline / Điện thoại: (+84) 909 163 821\n- Email tiếp nhận liên hệ: contact@dudisoftware.com\n- Giờ làm việc: Thứ Hai đến Thứ Sáu, từ 9:00 AM - 6:00 PM.\n- Kênh tư vấn nhanh: Quét mã QR Zalo trên trang chủ hoặc gửi form liên hệ trực tiếp trên hệ thống."
  },
  {
    "title": "Danh Mục Dịch Vụ Công Nghệ & Năng Lực Của DUDI SOFTWARE",
    "category": "Dịch vụ & Công nghệ",
    "tags": [
      "dịch vụ",
      "phát triển web",
      "mobile app",
      "ui ux",
      "cloud",
      "ai",
      "chatbot",
      "bảo trì"
    ],
    "sourceType": "URL",
    "sourceName": "https://www.dudisoftware.com/#services",
    "content": "CÁC DỊCH VỤ CÔNG NGHỆ TRỌNG TÂM CỦA DUDI SOFTWARE:\n\n1. Phát triển ứng dụng Web & Phần mềm Doanh nghiệp:\n   - Xây dựng giải pháp phần mềm, hệ thống website doanh nghiệp, e-commerce, hệ thống quản trị ERP/CRM theo yêu cầu riêng.\n   - Phù hợp với mọi quy mô từ startup đến tập đoàn lớn.\n\n2. Phát triển Ứng dụng Di động (Mobile App):\n   - Phát triển ứng dụng di động đa nền tảng (iOS & Android) bằng React Native, Flutter.\n   - Tập trung vào mượt mà, hiệu năng cao và trải nghiệm người dùng (UX) xuất sắc.\n\n3. Thiết kế UI/UX Chuyên nghiệp:\n   - Thiết kế giao diện tinh tế, hiện đại, chuẩn UI/UX tối ưu hóa tỷ lệ chuyển đổi cho sản phẩm số.\n\n4. Giải pháp Điện toán Đám mây (Cloud & DevOps):\n   - Tư vấn và triển khai hạ tầng đám mây (AWS, Docker, Microservices), đảm bảo hệ thống vận hành ổn định, mở rộng linh hoạt và bảo mật cao.\n\n5. AI & Học Máy (AI & Machine Learning / Chatbot RAG):\n   - Ứng dụng Trí tuệ Nhân tạo (AI), xử lý ngôn ngữ tự nhiên (NLP) và RAG Chatbot thông minh giúp tự động hóa chăm sóc khách hàng 24/7 và tối ưu quy trình kinh doanh.\n\n6. Dịch vụ Hỗ trợ Kỹ thuật & Bảo trì 24/7:\n   - Đội ngũ kỹ thuật viên giàu kinh nghiệm trực 24/7, khắc phục sự cố nhanh chóng, bảo trì hệ thống định kỳ.\n\nCÔNG NGHỆ VÀ CÔNG CỤ SỬ DỤNG:\n- Frontend / Frameworks: React, Next.js, Vue, Angular, TypeScript.\n- Backend: Node.js, Python, Laravel (PHP), Java.\n- Mobile: React Native, Flutter.\n- Cơ sở dữ liệu: MongoDB, MySQL, PostgreSQL.\n- Cloud & Infrastructure: AWS, Docker, Kubernetes, Git, CI/CD.\n\nTHỐNG KÊ NĂNG LỰC:\n- 150+ Dự án hoàn thành xuất sắc.\n- 50+ Khách hàng doanh nghiệp hài lòng.\n- 30+ Kỹ sư & Chuyên gia công nghệ giàu kinh nghiệm.\n- 5+ Năm kinh nghiệm thực chiến trong ngành phần mềm."
  },
  {
    "title": "Quy Trình Làm Việc & Báo Giá Dịch Vụ Tại DUDI SOFTWARE",
    "category": "Quy trình & Báo giá",
    "tags": [
      "quy trình",
      "báo giá",
      "bảo hành",
      "tư vấn"
    ],
    "sourceType": "TEXT",
    "sourceName": "DUDI Software Internal Workflow",
    "content": "QUY TRÌNH HỢP TÁC VÀ TƯ VẤN DỰ ÁN TẠI DUDI SOFTWARE:\n\nBước 1: Tiếp nhận thông tin & Khảo sát nhu cầu:\n- Đội ngũ tư vấn DUDI Software phân tích bài toán kinh doanh và yêu cầu chức năng của khách hàng.\n\nBước 2: Tư vấn giải pháp & Báo giá chi tiết:\n- Đề xuất kiến trúc công nghệ phù hợp nhất (Web/App/AI/Cloud), lập kế hoạch triển khai và gửi báo giá minh bạch.\n\nBước 3: Thiết kế UI/UX & Lập trình phần mềm:\n- Phát triển giao diện mẫu (Prototype), tiến hành lập trình theo quy trình Agile/Scrum ngắn hạn.\n\nBước 4: Kiểm thử chất lượng (QA/QC) & Bàn giao:\n- Kiểm thử bảo mật, hiệu năng, kiểm thử trên nhiều thiết bị trước khi triển khai chính thức.\n\nBước 5: Bảo hành & Hỗ trợ vận hành 24/7:\n- Cam kết bảo hành, khắc phục sự cố khẩn cấp dưới 30 phút, sao lưu dữ liệu và bảo trì định kỳ.\n\nHỖ TRỢ BÁO GIÁ & TƯ VẤN KỸ THUẬT:\nKhách hàng có thể để lại thông tin tên, email, sđt và yêu cầu tại website dudisoftware.com hoặc gọi hotline (+84) 909 163 821 để được chuyên gia tư vấn miễn phí."
  },
  {
    "title": "Kho Dự Án Tiêu Biểu Lĩnh Vực Ô tô Của DUDI SOFTWARE",
    "category": "Kho Dự Án - Ô tô",
    "tags": [
      "dự án",
      "ô tô",
      "GEELY",
      "THE GIOI XE O TO",
      "TOAN TRUNG",
      "HẢI ÂU",
      "VUCAR",
      "Toyota Ly Thuong Kiet",
      "TAN THUAN FORD",
      "Carmudi Website",
      "DailyXe Website",
      "Oto Website"
    ],
    "sourceType": "URL",
    "sourceName": "https://www.dudisoftware.com/projects",
    "content": "DANH SÁCH DỰ ÁN DUDI SOFTWARE THỰC HIỆN TRONG LĨNH VỰC Ô TÔ (17 Dự án):\n\n1. Dự án GEELY:\n- URL / Link: https://geely.vn/\n- Mô tả chi tiết: Website cung cấp:\nThông tin về các dòng xe Geely, bao gồm thiết kế, công nghệ, thông số kỹ thuật và trang bị.\nCông cụ đăng ký lái thử, yêu cầu báo giá và kết nối với hệ thống đại lý chính hãng trên toàn quốc.\nThông tin về các chương trình ưu đãi, khuyến mãi, tin tức và sự kiện của thương hiệu Geely.\nDịch vụ hậu mãi như bảo hành, bảo dưỡng, phụ tùng chính hãng và hỗ trợ khách hàng.\nHướng dẫn mua xe, chính sách dịch vụ, thông tin tài chính và các kênh liên hệ hỗ trợ khách hàng.\n\n2. Dự án THE GIOI XE O TO:\n- URL / Link: https://thegioixeoto.vn/\n- Mô tả chi tiết: Thế Giới Xe Ô Tô là website chuyên mua bán ô tô mới, ô tô đã qua sử dụng và phụ kiện, đồ chơi ô tô. Trang web cung cấp thông tin chi tiết về các dòng xe, hỗ trợ tính giá lăn bánh, tư vấn tài chính mua xe và kết nối khách hàng với các đại lý, showroom uy tín. Ngoài ra, website còn cập nhật tin tức, đánh giá và kiến thức về thị trường ô tô.\n\n3. Dự án TOAN TRUNG:\n- URL / Link: https://xeluottoantrung.com/\n- Mô tả chi tiết: Toàn Trung là website chuyên mua bán ô tô đã qua sử dụng (xe lướt). Trang web cung cấp danh sách xe với thông tin chi tiết, giá bán, hỗ trợ tính trả góp, đăng ký tư vấn và các dịch vụ như thu mua xe cũ, lên đời xe, bảo hiểm và vay mua xe. Giao diện hiện đại, dễ tra cứu và liên hệ với showroom.\n\n4. Dự án HẢI ÂU:\n- URL / Link: https://otohaiau.vn/\n- Mô tả chi tiết: Đây là website chính thức của Ô tô Hải Âu, đơn vị phân phối chính thức xe tải và xe đầu kéo Chenglong tại Việt Nam, chuyên cung cấp các dòng xe thương mại cùng hệ thống dịch vụ 4S và hậu mãi chính hãng. Website giới thiệu danh mục sản phẩm, hệ thống showroom, dịch vụ bảo dưỡng – sửa chữa, phụ tùng chính hãng, chính sách bảo hành, hỗ trợ tài chính, tin tức và thông tin liên hệ các trung tâm trên toàn quốc.\n\n5. Dự án VUCAR:\n- URL / Link: https://vucar.vn/\n- Mô tả chi tiết: Website cung cấp:\n\nDịch vụ đăng ký bán xe, định giá và kiểm định xe miễn phí.\nNền tảng đấu giá xe cũ với mạng lưới hàng nghìn người mua đã xác thực để giúp chủ xe bán được giá tốt.\nDanh sách xe đã kiểm định dành cho người mua cùng báo cáo tình trạng xe chi tiết.\nHỗ trợ thủ tục mua bán, sang tên, tài chính và bảo hành sau giao dịch.\nThông tin về quy trình mua bán, chính sách dịch vụ, câu hỏi thường gặp và các chương trình dành cho khách hàng.\n\n6. Dự án Toyota Ly Thuong Kiet:\n- URL / Link: https://toyotalythuongkiet.vn/\n- Mô tả chi tiết: Website cung cấp:\n\nDanh mục các mẫu xe Toyota như Vios, Corolla Cross, Yaris Cross, Innova Cross, Fortuner, Camry, Hilux, Land Cruiser.\nThông tin giá xe, chương trình khuyến mãi, đăng ký nhận báo giá và lái thử.\nDịch vụ bảo dưỡng, sửa chữa, bảo hiểm, phụ tùng và phụ kiện chính hãng.\nTin tức, sự kiện, kiến thức sử dụng xe và các chương trình ưu đãi dành cho khách hàng.\nThông tin liên hệ showroom, xưởng dịch vụ, hotline và hỗ trợ tư vấn mua xe, đặt lịch bảo dưỡng trực tuyến.\n\n7. Dự án TAN THUAN FORD:\n- URL / Link: https://tanthuanford.com.vn/\n- Mô tả chi tiết: Website cung cấp:\nDanh mục các mẫu xe Ford như Ranger, Everest, Territory, Explorer, Transit, Mustang Mach-E.\nThông tin giá, ưu đãi, khuyến mãi, đăng ký nhận báo giá và lái thử.\nDịch vụ bảo dưỡng, sửa chữa, phụ tùng chính hãng và hỗ trợ chăm sóc khách hàng.\nTin tức, sự kiện, chương trình khuyến mại và hướng dẫn sử dụng xe Ford.\nThông tin liên hệ showroom tại Khu chế xuất Tân Thuận, TP.HCM, cùng các hotline kinh doanh và dịch vụ.\n\n8. Dự án Carmudi Website:\n- URL / Link: https://www.carmudi.vn/\n- Mô tả chi tiết: Nền tảng trực tuyến kết nối người mua và người bán ô tô, cung cấp thông tin xe và hỗ trợ giao dịch mua bán.\n\n9. Dự án DailyXe Website:\n- URL / Link: http://dailyxe.com.vn/\n- Mô tả chi tiết: Website cung cấp thông tin, tin tức và nền tảng kết nối mua bán ô tô, hỗ trợ người dùng tìm kiếm và giao dịch xe.\n\n10. Dự án Oto Website:\n- URL / Link: https://oto.com.vn/\n- Mô tả chi tiết: Nền tảng trực tuyến cung cấp thông tin, đánh giá và kết nối mua bán ô tô, hỗ trợ người dùng tìm kiếm và giao dịch xe.\n\n11. Dự án Hyundai Vietnam Website:\n- URL / Link: https://hyundai-vietnam.com.vn/\n- Mô tả chi tiết: Website chính thức của Hyundai Việt Nam, cung cấp thông tin sản phẩm, giá xe, đại lý và dịch vụ liên quan.\n\n12. Dự án Audi HCMC Website:\n- URL / Link: https://audi-hcmc.vn/en\n- Mô tả chi tiết: Website của Audi HCMC, cung cấp thông tin các dòng xe Audi, dịch vụ và hệ thống đại lý tại TP.HCM.\n\n13. Dự án Website Toyota Việt Nam:\n- URL / Link: https://www.toyota.com.vn/\n- Mô tả chi tiết: Website giới thiệu sản phẩm ô tô và dịch vụ của Toyota tại Việt Nam.\n\n14. Dự án Website VinFast Việt Nam:\n- URL / Link: https://vinfastauto.com/vn_vi\n- Mô tả chi tiết: Website giới thiệu sản phẩm xe điện và dịch vụ của VinFast.\n\n15. Dự án Website Otocity:\n- URL / Link: https://www.otocity.vn/\n- Mô tả chi tiết: Nền tảng mua bán ô tô trực tuyến, cung cấp thông tin xe, giá cả và hỗ trợ kết nối người mua – người bán.\n\n16. Dự án Website Vucar:\n- URL / Link: https://vucar.vn/\n- Mô tả chi tiết: Nền tảng mua bán ô tô cũ trực tuyến, cung cấp thông tin xe minh bạch và hỗ trợ giao dịch nhanh chóng, an toàn.\n\n17. Dự án Website Carpla:\n- URL / Link: https://carpla.vn/\n- Mô tả chi tiết: Nền tảng mua bán ô tô trực tuyến, cung cấp thông tin xe, so sánh giá và hỗ trợ kết nối người mua – người bán."
  },
  {
    "title": "Kho Dự Án Tiêu Biểu Lĩnh Vực Blog Của DUDI SOFTWARE",
    "category": "Kho Dự Án - Blog",
    "tags": [
      "dự án",
      "blog",
      "Blog The Present Writer",
      "Blog Minimalissimo",
      "Blog A Beautiful Mess",
      "Blog Apartment Therapy",
      "Blog The Everygirl",
      "Blog Design Milk",
      "ELLE Việt Nam",
      "Blog Du Lịch Việt Nam",
      "VnEconomy – Trang tin tức kinh tế & tài chính",
      "Tiin.vn – Trang tin giải trí & xu hướng giới trẻ"
    ],
    "sourceType": "URL",
    "sourceName": "https://www.dudisoftware.com/projects",
    "content": "DANH SÁCH DỰ ÁN DUDI SOFTWARE THỰC HIỆN TRONG LĨNH VỰC BLOG (17 Dự án):\n\n1. Dự án Blog The Present Writer:\n- URL / Link: https://dudisoftware.com/\n- Mô tả chi tiết: Website chia sẻ các bài viết về chủ nghĩa tối giản, phát triển bản thân, giáo dục, năng suất và những bài học trong cuộc sống.\n\n2. Dự án Blog Minimalissimo:\n- URL / Link: https://minimalissimo.com/\n- Mô tả chi tiết: Website chia sẻ nội dung tuyển chọn về kiến trúc, nội thất, thời trang, công nghệ, nghệ thuật và các sản phẩm mang phong cách tối giản.\n\n3. Dự án Blog A Beautiful Mess:\n- URL / Link: https://abeautifulmess.com/\n- Mô tả chi tiết: Website chia sẻ nội dung về trang trí nhà cửa, DIY, công thức nấu ăn, thủ công, nhiếp ảnh và các ý tưởng sống sáng tạo.\n\n4. Dự án Blog Apartment Therapy:\n- URL / Link: https://www.apartmenttherapy.com/\n- Mô tả chi tiết: Website chia sẻ ý tưởng trang trí nhà cửa, thiết kế nội thất, sắp xếp không gian, vệ sinh, cải tạo nhà và kinh nghiệm sống trong căn hộ.\n\n5. Dự án Blog The Everygirl:\n- URL / Link: https://theeverygirl.com/\n- Mô tả chi tiết: Website chia sẻ bài viết về thời trang, làm đẹp, sự nghiệp, tài chính, sức khỏe, tình cảm, giải trí và phong cách sống hiện đại.\n\n6. Dự án Blog Design Milk:\n- URL / Link: https://design-milk.com/\n- Mô tả chi tiết: Website chia sẻ các bài viết về kiến trúc, thiết kế nội thất, nghệ thuật, đồ gia dụng, công nghệ và phong cách sống hiện đại.\n\n7. Dự án ELLE Việt Nam:\n- URL / Link: https://www.elle.vn/\n- Mô tả chi tiết: Website chia sẻ bài viết về thời trang, làm đẹp, văn hóa, giải trí và xu hướng sống dành cho độc giả hiện đại.\n\n8. Dự án Blog Du Lịch Việt Nam:\n- URL / Link: https://blogdulich.vn\n- Mô tả chi tiết: Chia sẻ điểm đến, lịch trình, review và kinh nghiệm du lịch thực tế.\n\n9. Dự án VnEconomy – Trang tin tức kinh tế & tài chính:\n- URL / Link: https://vneconomy.vn/\n- Mô tả chi tiết: Website cung cấp thông tin chuyên sâu về kinh tế, tài chính, doanh nghiệp và thị trường tại Việt Nam. Nội dung được cập nhật liên tục với các bài phân tích, nhận định và tin tức vĩ mô, giúp người đọc nắm bắt xu hướng kinh tế và đưa ra quyết định kinh doanh hiệu quả.\n\n10. Dự án Tiin.vn – Trang tin giải trí & xu hướng giới trẻ:\n- URL / Link: https://tiin.vn/\n- Mô tả chi tiết: Website cung cấp các tin tức giải trí, xu hướng mạng xã hội và câu chuyện đời sống dành cho giới trẻ. Nội dung được cập nhật nhanh chóng, bám sát các trend nổi bật, kết hợp hình ảnh sinh động nhằm thu hút và giữ chân người đọc.\n\n11. Dự án Afamily.vn – Trang thông tin lifestyle & gia đình:\n- URL / Link: https://afamily.vn/\n- Mô tả chi tiết: Website cung cấp nội dung xoay quanh đời sống gia đình, tâm lý, làm đẹp và phong cách sống hiện đại. Nội dung được xây dựng theo hướng chia sẻ thực tế, giàu cảm xúc, kết hợp hình ảnh trực quan nhằm mang lại giá trị tham khảo và kết nối với người đọc.\n\n12. Dự án Brands Vietnam – Nền tảng kiến thức Marketing & Branding:\n- URL / Link: https://www.brandsvietnam.com/\n- Mô tả chi tiết: Website cung cấp kiến thức marketing, branding và phân tích chiến dịch thực tế, giúp người đọc cập nhật xu hướng và nâng cao tư duy chiến lược.\n\n13. Dự án iVIVU Blog – Blog du lịch & trải nghiệm:\n- URL / Link: https://www.ivivu.com/blog\n- Mô tả chi tiết: Website chia sẻ kinh nghiệm du lịch, review điểm đến và gợi ý lịch trình, giúp người đọc dễ dàng lên kế hoạch cho chuyến đi.\n\n14. Dự án ChanhTuoi – Blog review & chia sẻ kinh nghiệm:\n- URL / Link: https://chanhtuoi.com/\n- Mô tả chi tiết: Website chia sẻ đánh giá sản phẩm, kinh nghiệm mua sắm và mẹo tiêu dùng, giúp người đọc lựa chọn sản phẩm phù hợp và tiết kiệm chi phí.\n\n15. Dự án Foody – Nền tảng review ẩm thực:\n- URL / Link: https://www.foody.vn/ha-noi\n- Mô tả chi tiết: Website cung cấp thông tin và đánh giá về quán ăn, nhà hàng và địa điểm ăn uống, giúp người dùng dễ dàng tìm kiếm và lựa chọn phù hợp.\n\n16. Dự án Riviu – Nền tảng review ăn uống & trải nghiệm:\n- URL / Link: https://riviu.vn/\n- Mô tả chi tiết: Website chia sẻ đánh giá về quán ăn, địa điểm và trải nghiệm thực tế từ người dùng, giúp người đọc khám phá và lựa chọn phù hợp.\n\n17. Dự án Website Phong Thái Doanh Nhân:\n- URL / Link: https://phongthaidoanhnhan.com/\n- Mô tả chi tiết: Trang chia sẻ nội dung về phong cách sống, doanh nhân, làm đẹp, sức khỏe và phong thủy."
  },
  {
    "title": "Kho Dự Án Tiêu Biểu Lĩnh Vực Thời trang Của DUDI SOFTWARE",
    "category": "Kho Dự Án - Thời trang",
    "tags": [
      "dự án",
      "thời trang",
      "The Everygirl Shop",
      "Website Thời Trang SomeHow",
      "Website Thời Trang ELISE",
      "Website Thời Trang Chic-Land",
      "Website Thời Trang Việt Thắng",
      "La Mer Fashion Website",
      "Website Yumi Hana",
      "Website Thời Trang Minh Châu",
      "Website Hà Linh Shop",
      "Website TM The Linen"
    ],
    "sourceType": "URL",
    "sourceName": "https://www.dudisoftware.com/projects",
    "content": "DANH SÁCH DỰ ÁN DUDI SOFTWARE THỰC HIỆN TRONG LĨNH VỰC THỜI TRANG (21 Dự án):\n\n1. Dự án The Everygirl Shop:\n- URL / Link: https://theeverygirlshop.com/\n- Mô tả chi tiết: Website thương mại điện tử kinh doanh quần áo, túi xách, nón, ly, văn phòng phẩm và phụ kiện công nghệ với phong cách trẻ trung, hiện đại.\n\n2. Dự án Website Thời Trang SomeHow:\n- URL / Link: https://somehow.vn/\n- Mô tả chi tiết: Website giới thiệu và kinh doanh thời trang ứng dụng dành cho nam và nữ với đa dạng sản phẩm, phong cách và bộ sưu tập.\n\n3. Dự án Website Thời Trang ELISE:\n- URL / Link: https://elise.vn/\n- Mô tả chi tiết: Website giới thiệu và kinh doanh thời trang nữ cao cấp với các sản phẩm như đầm, áo, quần, chân váy và phụ kiện.\n\n4. Dự án Website Thời Trang Chic-Land:\n- URL / Link: https://chicland.vn/\n- Mô tả chi tiết: Website giới thiệu và kinh doanh thời trang công sở nữ cao cấp, nổi bật với các sản phẩm như đầm, áo sơ mi, vest, quần, áo dài và nhiều bộ sưu tập thời trang.\n\n5. Dự án Website Thời Trang Việt Thắng:\n- URL / Link: https://thoitrangvietthang.vn/\n- Mô tả chi tiết: Website giới thiệu và kinh doanh các sản phẩm thời trang gia đình như đồ nữ, nam, trung niên và trẻ em, tích hợp danh mục sản phẩm, đặt hàng và chương trình khuyến mãi.\n\n6. Dự án La Mer Fashion Website:\n- URL / Link: https://lamerfashion.com/\n- Mô tả chi tiết: Website thương mại điện tử của La Mer Fashion, cung cấp các sản phẩm thời trang và hỗ trợ mua sắm trực tuyến.\n\n7. Dự án Website Yumi Hana:\n- URL / Link: https://yumihana.com.vn/\n- Mô tả chi tiết: Website bán sản phẩm thời trang nữ thiết kế từ chất liệu linen\n\n8. Dự án Website Thời Trang Minh Châu:\n- URL / Link: https://thoitrangminhchau.com.vn/\n- Mô tả chi tiết: Website giới thiệu dịch vụ may đo vest, đồng phục và trang phục công sở\n\n9. Dự án Website Hà Linh Shop:\n- URL / Link: https://halinhshop.com.vn/\n- Mô tả chi tiết: Website bán quần áo và sản phẩm thời trang cho trẻ em.\n\n10. Dự án Website TM The Linen:\n- URL / Link: https://tmthelinen.com/\n- Mô tả chi tiết: Website bán sản phẩm thời trang từ chất liệu linen\n\n11. Dự án Website Chinan CY:\n- URL / Link: https://chinancy.vn/\n- Mô tả chi tiết: Website bán bikini và đồ bơi thời trang dành cho nữ.\n\n12. Dự án Website Etro.Gang:\n- URL / Link: https://etrogang.vn/\n- Mô tả chi tiết: Website bán sản phẩm thời trang và phụ kiện dành cho nữ.\n\n13. Dự án Website HeadsUp:\n- URL / Link: https://headsup.vn/\n- Mô tả chi tiết: Website bán sản phẩm thời trang nam công sở theo phong cách tối giản.\n\n14. Dự án Website giới thiệu ACFC:\n- URL / Link: https://www.acfc.com.vn/?srsltid=AfmBOoqPkU6uiyNclKttnzHJZNjFoBwDIJUaYa5DagTS0TW5AWP9_ANn\n- Mô tả chi tiết: Website giới thiệu hệ thống phân phối và bán lẻ các thương hiệu thời trang quốc tế.\n\n15. Dự án Website thương mại điện tử Owen:\n- URL / Link: https://owen.vn/\n- Mô tả chi tiết: Website bán quần áo và phụ kiện thời trang nam trực tuyến.\n\n16. Dự án Website thương mại điện tử Coolmate:\n- URL / Link: https://www.coolmate.me/collection/ao-thun-nam\n- Mô tả chi tiết: Website bán áo thun và sản phẩm thời trang nam trực tuyến.\n\n17. Dự án Website Coolmate:\n- URL / Link: https://www.coolmate.me/\n- Mô tả chi tiết: Website bán hàng thời trang nam trực tuyến, cung cấp sản phẩm cơ bản, chính sách đổi trả linh hoạt và trải nghiệm mua sắm tiện lợi.\n\n18. Dự án The C.I.U Website :\n- URL / Link: https://theciu.vn/\n- Mô tả chi tiết: Website giới thiệu The C.I.U – nền tảng về sáng tạo và đổi mới, cung cấp thông tin chương trình đào tạo, sự kiện và kết nối cộng đồng.\n\n19. Dự án Couple TX Website:\n- URL / Link: https://coupletx.com/\n- Mô tả chi tiết: Website thương mại điện tử của Couple TX, chuyên cung cấp sản phẩm thời trang và cho phép khách hàng mua sắm trực tuyến.\n\n20. Dự án HADES Website:\n- URL / Link: https://hades.vn/\n- Mô tả chi tiết: Website thương mại điện tử của HADES, cung cấp các sản phẩm thời trang streetwear và hỗ trợ mua sắm trực tuyến.\n\n21. Dự án Website Luck & Luck:\n- URL / Link: https://www.lucknluck.vn/\n- Mô tả chi tiết: Website bán sản phẩm thời trang như đầm, áo và phụ kiện"
  },
  {
    "title": "Kho Dự Án Tiêu Biểu Lĩnh Vực Thực phẩm Của DUDI SOFTWARE",
    "category": "Kho Dự Án - Thực phẩm",
    "tags": [
      "dự án",
      "thực phẩm",
      "V-Organic",
      "Nam An Market",
      "Brightland",
      "Fishwife",
      "Nuts.com",
      "Daily Harvest",
      "Partake Foods",
      "Graza",
      "La Mant Cafe",
      "Website bán thực phẩm hữu cơ Organica"
    ],
    "sourceType": "URL",
    "sourceName": "https://www.dudisoftware.com/projects",
    "content": "DANH SÁCH DỰ ÁN DUDI SOFTWARE THỰC HIỆN TRONG LĨNH VỰC THỰC PHẨM (19 Dự án):\n\n1. Dự án V-Organic:\n- URL / Link: https://v-organic.vn/\n- Mô tả chi tiết: Website thương mại điện tử cung cấp rau củ, thịt, hải sản, trứng, trái cây, các loại hạt và thực phẩm hữu cơ, hỗ trợ khách hàng xem sản phẩm, thêm vào giỏ hàng và đặt mua trực tuyến.\n\n2. Dự án Nam An Market:\n- URL / Link: https://namanmarket.com/\n- Mô tả chi tiết: Website thương mại điện tử cung cấp thực phẩm tươi sống, rau củ, trái cây, thịt, hải sản, đồ uống và các sản phẩm gia dụng, hỗ trợ khách hàng tìm kiếm và mua sắm trực tuyến.\n\n3. Dự án Brightland:\n- URL / Link: https://brightland.co/\n- Mô tả chi tiết: Website thương mại điện tử kinh doanh dầu ô liu, giấm, mật ong, gia vị và các bộ quà tặng, nổi bật với thiết kế hiện đại và hỗ trợ mua hàng trực tuyến.\n\n4. Dự án Fishwife:\n- URL / Link: https://eatfishwife.com/?view=sl-9CD352DE\n- Mô tả chi tiết: Website thương mại điện tử kinh doanh cá hồi, cá ngừ, cá mòi, cá thu và các sản phẩm hải sản đóng hộp, hỗ trợ khách hàng xem sản phẩm, lựa chọn combo và đặt mua trực tuyến.\n\n5. Dự án Nuts.com:\n- URL / Link: https://nuts.com/\n- Mô tả chi tiết: Website thương mại điện tử kinh doanh các loại hạt, trái cây sấy, bánh kẹo, ngũ cốc và thực phẩm lành mạnh, hỗ trợ khách hàng tìm kiếm sản phẩm và đặt mua trực tuyến.\n\n6. Dự án Daily Harvest:\n- URL / Link: https://daily-harvest.com/\n- Mô tả chi tiết: Website kinh doanh các sản phẩm tiện lợi từ rau củ và trái cây như sinh tố, yến mạch, ngũ cốc và các phần ăn chế biến nhanh, hỗ trợ khách hàng lựa chọn sản phẩm và đặt giao hàng trực tuyến.\n\n7. Dự án Partake Foods:\n- URL / Link: https://partakefoods.com/\n- Mô tả chi tiết: Website kinh doanh các loại bánh quy, bánh xốp và đồ ăn nhẹ, tập trung vào sản phẩm thân thiện với người dị ứng và phù hợp với nhiều chế độ ăn uống.\n\n8. Dự án Graza:\n- URL / Link: https://www.graza.co/\n- Mô tả chi tiết: Website kinh doanh dầu ô liu nguyên chất dùng để nấu ăn, chiên và trộn món, cùng một số sản phẩm thực phẩm được chế biến từ dầu ô liu, nổi bật với phong cách thương hiệu trẻ trung và hiện đại.\n\n9. Dự án La Mant Cafe:\n- URL / Link: https://lamantcafe.vn/\n- Mô tả chi tiết: Website giới thiệu quán cafe La Mant, cung cấp thông tin về không gian, menu, hình ảnh thực tế và liên hệ. Giao diện thiết kế hiện đại, sử dụng hình ảnh trực quan giúp khách hàng dễ dàng tìm hiểu và trải nghiệm trước khi đến quán.\n\n10. Dự án Website bán thực phẩm hữu cơ Organica:\n- URL / Link: https://organica.vn/\n- Mô tả chi tiết: Website bán thực phẩm hữu cơ, hỗ trợ giới thiệu sản phẩm và mua sắm online các mặt hàng sạch, organic, an toàn cho sức khỏe.\n\n11. Dự án Homefarm:\n- URL / Link: https://homefarm.vn/\n- Mô tả chi tiết: Website chuyên cung cấp thực phẩm nhập khẩu cao cấp như thịt bò, cá hồi, hải sản, trái cây và thực phẩm chế biến, hỗ trợ mua sắm online và đặt hàng tiện lợi.\n\n12. Dự án FoodHub:\n- URL / Link: https://www.foodhub.vn/\n- Mô tả chi tiết: Website cung cấp thực phẩm sạch, món ăn sơ chế và thực phẩm tươi sống, hỗ trợ đặt hàng online nhanh chóng và tiện lợi.\n\n13. Dự án Thực phẩm sạch Thực Phẩm Việt:\n- URL / Link: https://thucphamviet.com.vn/\n- Mô tả chi tiết: Cung cấp thực phẩm, nguyên liệu và giải pháp phân phối thực phẩm cho cá nhân, doanh nghiệp.\n\n14. Dự án Thực phẩm Vào Bếp:\n- URL / Link: https://www.vaobep.com.vn/\n- Mô tả chi tiết: Cung cấp thực phẩm, nguyên liệu chế biến và giải pháp mua sắm thực phẩm tiện lợi cho gia đình.\n\n15. Dự án Nhận nuôi thú cưng Hà Nội:\n- URL / Link: https://www.hanoipetadoption.com/\n- Mô tả chi tiết: Nền tảng hỗ trợ cứu hộ, nhận nuôi chó mèo và kết nối cộng đồng yêu thú cưng.\n\n16. Dự án Website thương mại điện tử Annam Gourmet:\n- URL / Link: https://shop.annam-gourmet.com/hcm-est/vi/\n- Mô tả chi tiết: Website bán thực phẩm cao cấp và sản phẩm nhập khẩu trực tuyến.\n\n17. Dự án Website thương mại điện tử MMPro:\n- URL / Link: https://mmpro.vn/\n- Mô tả chi tiết: Website bán hàng trực tuyến cung cấp thực phẩm, hàng tiêu dùng và sản phẩm doanh nghiệp.\n\n18. Dự án Website thương mại điện tử Farmers Market:\n- URL / Link: https://farmersmarket.vn/collections/dac-san-viet-nam?srsltid=AfmBOooLn5PpkWGO7D9kb0bRFfkJ8tm0QpKiUe_lti0urn4rRizxoS2Q\n- Mô tả chi tiết: Website bán thực phẩm, nông sản và đặc sản trực tuyến.\n\n19. Dự án Website công ty Cholimex:\n- URL / Link: https://www.cholimex.vn/\n- Mô tả chi tiết: Website giới thiệu sản phẩm gia vị, thực phẩm và hoạt động doanh nghiệp."
  },
  {
    "title": "Kho Dự Án Tiêu Biểu Lĩnh Vực Landing Page Của DUDI SOFTWARE",
    "category": "Kho Dự Án - Landing Page",
    "tags": [
      "dự án",
      "landing page",
      "Omsom",
      "Thiên Nhiên Website",
      "Website Thương hiệu Cà phê & Lifestyle",
      "Landing Page KOI Thé",
      "Landing Page Bông Biêng",
      "Landing Page The Alley",
      "RESWAY – Website Du Lịch & Nghỉ Dưỡng",
      "Website Kyna English",
      "Website Apollo English",
      "Website Ticketbox"
    ],
    "sourceType": "URL",
    "sourceName": "https://www.dudisoftware.com/projects",
    "content": "DANH SÁCH DỰ ÁN DUDI SOFTWARE THỰC HIỆN TRONG LĨNH VỰC LANDING PAGE (12 Dự án):\n\n1. Dự án Omsom:\n- URL / Link: https://omsom.com/\n- Mô tả chi tiết: Landing Page giới thiệu thương hiệu và các sản phẩm thực phẩm mang hương vị châu Á, nổi bật với thiết kế trẻ trung, màu sắc bắt mắt và nội dung tập trung vào sản phẩm.\n\n2. Dự án Thiên Nhiên Website:\n- URL / Link: https://thiennhien.org/\n- Mô tả chi tiết: Website cung cấp thông tin về hoạt động bảo vệ môi trường, nâng cao nhận thức cộng đồng và các dự án liên quan đến thiên nhiên.\n\n3. Dự án Website Thương hiệu Cà phê & Lifestyle:\n- URL / Link: https://www.everyhalf.vn/\n- Mô tả chi tiết: Website giới thiệu thương hiệu cà phê Every Half, tập trung vào concept không gian, trải nghiệm và sản phẩm, hỗ trợ khách hàng tìm hiểu và kết nối với thương hiệu.\n\n4. Dự án Landing Page KOI Thé:\n- URL / Link: https://www.koithe.com/en/home.php\n- Mô tả chi tiết: Landing page dùng để giới thiệu thương hiệu trà sữa KOI Thé, hiển thị các dòng sản phẩm nổi bật, câu chuyện thương hiệu và hệ thống cửa hàng. Trang giúp khách hàng nhanh chóng nắm thông tin về thương hiệu, tham khảo menu và tra cứu địa điểm cửa hàng.\n\n5. Dự án Landing Page Bông Biêng:\n- URL / Link: https://bongbieng.com/\n- Mô tả chi tiết: Landing page dùng để giới thiệu thương hiệu trà sữa Bồng Biêng, hiển thị các sản phẩm nổi bật, concept hình ảnh và thông tin cửa hàng. Trang giúp khách hàng tìm hiểu về thương hiệu, tham khảo menu và liên hệ hoặc tìm địa điểm.\n\n6. Dự án Landing Page The Alley:\n- URL / Link: https://www.the-alley.vn/\n- Mô tả chi tiết: Landing page dùng để giới thiệu thương hiệu trà sữa The Alley, hiển thị menu sản phẩm, thông tin nguyên liệu và concept thương hiệu.\n\n7. Dự án RESWAY – Website Du Lịch & Nghỉ Dưỡng:\n- URL / Link: https://resway.vn/\n- Mô tả chi tiết: Website giới thiệu dịch vụ du lịch và nghỉ dưỡng\n\n8. Dự án Website Kyna English:\n- URL / Link: https://kynaenglish.vn/\n- Mô tả chi tiết: Nền tảng học tiếng Anh trực tuyến, cung cấp khóa học, lộ trình học và hỗ trợ đăng ký học cho người dùng.\n\n9. Dự án Website Apollo English:\n- URL / Link: https://apollo.edu.vn/\n- Mô tả chi tiết: Website giới thiệu trung tâm Anh ngữ Apollo, cung cấp thông tin khóa học, chương trình đào tạo và hỗ trợ đăng ký tư vấn cho học viên.\n\n10. Dự án Website Ticketbox:\n- URL / Link: https://ticketbox.vn/\n- Mô tả chi tiết: Nền tảng đặt vé sự kiện trực tuyến, cung cấp thông tin chương trình, bán vé và hỗ trợ quản lý sự kiện cho người dùng.\n\n11. Dự án Website Workshop Saigon:\n- URL / Link: https://workshopsaigon.com/\n- Mô tả chi tiết: Website cung cấp thông tin các workshop và sự kiện sáng tạo, hỗ trợ đăng ký tham gia và kết nối cộng đồng.\n\n12. Dự án Lumière Riverside – Masterise Homes:\n- URL / Link: https://masterisehomes.com/lumiere-riverside/\n- Mô tả chi tiết: Trang landing page giới thiệu dự án căn hộ Lumière Riverside, cung cấp thông tin chi tiết và thu thập khách hàng đăng ký tư vấn."
  },
  {
    "title": "Kho Dự Án Tiêu Biểu Lĩnh Vực Thú cưng Của DUDI SOFTWARE",
    "category": "Kho Dự Án - Thú cưng",
    "tags": [
      "dự án",
      "thú cưng",
      "Lambwolf Collective",
      "Open Farm",
      "MiaCara",
      "Pet’s Home",
      "Maxbone",
      "The Farmer’s Dog",
      "Zee.Dog",
      "Tuft + Paw",
      "Fable Pets",
      "Website bán hàng thú cưng PawPaw Pet Shop"
    ],
    "sourceType": "URL",
    "sourceName": "https://www.dudisoftware.com/projects",
    "content": "DANH SÁCH DỰ ÁN DUDI SOFTWARE THỰC HIỆN TRONG LĨNH VỰC THÚ CƯNG (20 Dự án):\n\n1. Dự án Lambwolf Collective:\n- URL / Link: https://www.lambwolf.co/\n- Mô tả chi tiết: Website kinh doanh đồ chơi tương tác, dây dắt, vòng cổ, giường ngủ và phụ kiện dành cho chó mèo, nổi bật với phong cách tối giản, hiện đại và tiện dụng.\n\n2. Dự án Open Farm:\n- URL / Link: https://openfarmpet.com/\n- Mô tả chi tiết: Website kinh doanh thức ăn dành cho chó và mèo như thức ăn khô, thức ăn tươi, đồ ăn sấy và bánh thưởng, tập trung vào nguồn nguyên liệu có thể truy xuất và chế độ dinh dưỡng phù hợp cho thú cưng.\n\n3. Dự án MiaCara:\n- URL / Link: https://miacara.com/en\n- Mô tả chi tiết: Website kinh doanh giường ngủ, đồ chơi, bát ăn, phụ kiện du lịch và nội thất dành cho chó mèo, nổi bật với thiết kế tối giản, hiện đại và tiện dụng.\n\n4. Dự án Pet’s Home:\n- URL / Link: https://www.petshome.vn/\n- Mô tả chi tiết: Website kinh doanh thức ăn, phụ kiện, đồ chơi và sản phẩm chăm sóc dành cho chó mèo, đồng thời cung cấp dịch vụ spa, grooming và khách sạn thú cưng.\n\n5. Dự án Maxbone:\n- URL / Link: https://www.maxbone.com/\n- Mô tả chi tiết: Website kinh doanh thức ăn, quần áo, giường ngủ, đồ chơi, túi vận chuyển và phụ kiện dành cho chó với phong cách hiện đại, thời trang và tiện dụng.\n\n6. Dự án The Farmer’s Dog:\n- URL / Link: https://www.thefarmersdog.com/\n- Mô tả chi tiết: Website cung cấp thức ăn tươi dành cho chó theo chế độ dinh dưỡng cá nhân hóa, hỗ trợ khách hàng xây dựng khẩu phần phù hợp và đăng ký giao hàng định kỳ tận nhà.\n\n7. Dự án Zee.Dog:\n- URL / Link: https://www.zeedog.com/\n- Mô tả chi tiết: Website kinh doanh phụ kiện dành cho chó và mèo như dây dắt, vòng cổ, đai đeo, giường, đồ chơi và dụng cụ ăn uống với thiết kế trẻ trung, hiện đại.\n\n8. Dự án Tuft + Paw:\n- URL / Link: https://www.tuftandpaw.com/\n- Mô tả chi tiết: Website kinh doanh các sản phẩm dành cho mèo như thức ăn, cát vệ sinh, nhà vệ sinh, giường, trụ cào và đồ nội thất với thiết kế hiện đại, tiện dụng.\n\n9. Dự án Fable Pets:\n- URL / Link: https://fablepets.com/\n- Mô tả chi tiết: Website kinh doanh các sản phẩm dành cho thú cưng như giường, chuồng, đồ chơi, dây dắt, vòng cổ và dụng cụ ăn uống, nổi bật với thiết kế hiện đại, tiện dụng và phù hợp với không gian sống.\n\n10. Dự án Website bán hàng thú cưng PawPaw Pet Shop:\n- URL / Link: https://pawpawpetshop.vn/\n- Mô tả chi tiết: Website thương mại điện tử chuyên cung cấp thức ăn, phụ kiện và dịch vụ chăm sóc thú cưng, hỗ trợ khách hàng mua sắm trực tuyến, đặt dịch vụ và quản lý đơn hàng thuận tiện.\n\n11. Dự án Dog Paradise – Shop thú cưng & dịch vụ chăm sóc thú cưng:\n- URL / Link: https://dogparadise.vn/\n- Mô tả chi tiết: Website giới thiệu và kinh doanh sản phẩm, dịch vụ thú cưng như thức ăn, phụ kiện, grooming và khách sạn thú cưng.\n\n12. Dự án Hẻm Thú Cưng:\n- URL / Link: https://hemthucung.com/\n- Mô tả chi tiết: Website Hẻm Thú Cưng chuyên cung cấp sản phẩm và dịch vụ chăm sóc thú cưng như thức ăn, phụ kiện cho chó mèo, spa, grooming và pet hotel.\n\n13. Dự án Siêu Pet:\n- URL / Link: https://sieupet.com/\n- Mô tả chi tiết: Website Siêu Pet chuyên kinh doanh thú cưng, cung cấp các giống chó mèo, phụ kiện và dịch vụ chăm sóc thú cưng.\n\n14. Dự án Cathouse Petshop:\n- URL / Link: https://cathouse.vn/\n- Mô tả chi tiết: Website Cathouse Petshop chuyên cung cấp mèo cảnh, phụ kiện và dịch vụ chăm sóc thú cưng.\n\n15. Dự án Pet Yêu:\n- URL / Link: https://petyeu.com.vn/\n- Mô tả chi tiết: Website Pet Yêu chuyên cung cấp sản phẩm chăm sóc thú cưng như thức ăn, phụ kiện và đồ dùng cho chó mèo, đồng thời chia sẻ kiến thức và kinh nghiệm nuôi thú cưng.\n\n16. Dự án Cửa hàng thú cưng Mật Pet:\n- URL / Link: https://matpet.vn/\n- Mô tả chi tiết: Cung cấp thú cưng, phụ kiện và dịch vụ chăm sóc thú cưng cho khách hàng.\n\n17. Dự án Cửa hàng thú cưng Paddy:\n- URL / Link: https://paddy.vn/\n- Mô tả chi tiết: Cung cấp thức ăn, phụ kiện, sản phẩm chăm sóc và dịch vụ dành cho thú cưng.\n\n18. Dự án Cửa hàng thú cưng Nông Trại Thú Cưng:\n- URL / Link: https://www.nongtraithucung.com/\n- Mô tả chi tiết: Cung cấp thức ăn, phụ kiện, sản phẩm chăm sóc và dịch vụ dành cho thú cưng.\n\n19. Dự án Thức ăn thú cưng KEOS:\n- URL / Link: https://keos.com.vn/\n- Mô tả chi tiết: Cung cấp thức ăn dinh dưỡng, sản phẩm chăm sóc và giải pháp dành cho thú cưng.\n\n20. Dự án Phụ kiện chó mèo:\n- URL / Link: https://phukienchomeo.com/\n- Mô tả chi tiết: Cung cấp phụ kiện, đồ chơi, thức ăn và sản phẩm chăm sóc dành cho chó mèo."
  },
  {
    "title": "Kho Dự Án Tiêu Biểu Lĩnh Vực Tư vấn Pháp luật Của DUDI SOFTWARE",
    "category": "Kho Dự Án - Tư vấn Pháp luật",
    "tags": [
      "dự án",
      "tư vấn pháp luật",
      "Tư vấn Pháp lý 1LAW",
      "Luật LAWPRO",
      "Cổng thông tin Tư vấn Luật Trực tuyến",
      "Học viện Phát triển Năng lực Lãnh đạo CLEAD",
      "Website Công ty Luật ANP",
      "Website CityLawyer",
      "Website I AM Law Firm",
      "Website Luật Kỷ & Cộng sự",
      "Website Luật Toàn Cầu",
      "Website Công ty Luật New & New"
    ],
    "sourceType": "URL",
    "sourceName": "https://www.dudisoftware.com/projects",
    "content": "DANH SÁCH DỰ ÁN DUDI SOFTWARE THỰC HIỆN TRONG LĨNH VỰC TƯ VẤN PHÁP LUẬT (10 Dự án):\n\n1. Dự án Tư vấn Pháp lý 1LAW:\n- URL / Link: https://1law.vn/\n- Mô tả chi tiết: Website giới thiệu các dịch vụ tư vấn pháp luật dành cho cá nhân và doanh nghiệp, hỗ trợ giải quyết thủ tục, hợp đồng và hạn chế rủi ro pháp lý trong hoạt động kinh doanh.\n\n2. Dự án Luật LAWPRO:\n- URL / Link: https://lawpro.com.vn/\n- Mô tả chi tiết: Cung cấp dịch vụ tư vấn pháp luật và giải pháp rủi ro cho doanh nghiệp. Trang web hỗ trợ các công ty giải quyết các vấn đề về hợp đồng kinh tế, thủ tục mua bán sáp nhập, xin giấy phép đầu tư, đăng ký bản quyền thương hiệu và cập nhật các chính sách thuế, văn bản luật mới nhất.\n\n3. Dự án Cổng thông tin Tư vấn Luật Trực tuyến:\n- URL / Link: https://luatsutructuyen.vn/\n- Mô tả chi tiết: Cung cấp dịch vụ tư vấn pháp luật từ xa qua tổng đài điện thoại và email. Trang web giúp người dân kết nối nhanh với luật sư để giải đáp thắc mắc về mọi lĩnh vực (như đất đai, hôn nhân gia đình, thừa kế, dân sự, hình sự...), đồng thời hỗ trợ các dịch vụ soạn thảo đơn từ, hợp đồng và cung cấp các bài viết phân tích tình huống luật thực tế.\n\n4. Dự án Học viện Phát triển Năng lực Lãnh đạo CLEAD:\n- URL / Link: https://clead.vn/\n- Mô tả chi tiết: Cung cấp các chương trình đào tạo, khóa học và dịch vụ tư vấn về năng lực quản lý, lãnh đạo dành cho các cấp quản lý và chủ doanh nghiệp. Trang web là nơi học viên có thể tìm hiểu về các khóa học kỹ năng, lịch khai giảng, hồ sơ của các chuyên gia giảng dạy, và đăng ký tham gia các buổi hội thảo quản trị\n\n5. Dự án Website Công ty Luật ANP:\n- URL / Link: https://congtyluatanp.com/\n- Mô tả chi tiết: Website giới thiệu dịch vụ tư vấn pháp luật và luật sư.\n\n6. Dự án Website CityLawyer:\n- URL / Link: https://citylawyer.vn/\n- Mô tả chi tiết: Cổng thông tin tư vấn pháp luật trực tuyến, cung cấp dịch vụ luật sư chuyên sâu về doanh nghiệp, dân sự và tố tụng pháp lý\n\n7. Dự án Website I AM Law Firm:\n- URL / Link: https://www.iamlawfirm.com/\n- Mô tả chi tiết: Nền tảng tư vấn pháp luật chuyên nghiệp, cung cấp giải pháp pháp lý toàn diện cho cá nhân và doanh nghiệp trong nước, quốc tế.\n\n8. Dự án Website Luật Kỷ & Cộng sự:\n- URL / Link: https://luatky-congsu.com/\n- Mô tả chi tiết: Cổng thông tin cung cấp dịch vụ luật sư tư vấn, đại diện tranh tụng và giải quyết các vấn đề pháp lý doanh nghiệp, dân sự.\n\n9. Dự án Website Luật Toàn Cầu:\n- URL / Link: https://luattoancau.com/\n- Mô tả chi tiết: Nền tảng tư vấn pháp luật chuyên sâu về sở hữu trí tuệ, doanh nghiệp, đầu tư và các dịch vụ đại diện pháp lý.\n\n10. Dự án Website Công ty Luật New & New:\n- URL / Link: https://newlawfirm.com.vn/\n- Mô tả chi tiết: Hệ thống tư vấn luật chuyên nghiệp (Đầu tư, Doanh nghiệp, Đất đai), kết nối khách hàng với giải pháp pháp lý."
  },
  {
    "title": "Kho Dự Án Tiêu Biểu Lĩnh Vực Du lịch Của DUDI SOFTWARE",
    "category": "Kho Dự Án - Du lịch",
    "tags": [
      "dự án",
      "du lịch",
      "Du lịch FIT Tour",
      "Du lịch Saigontourist Travel",
      "Du lịch Elite Tour",
      "Du lịch Hải Đăng Travel",
      "Du lịch iVIVU",
      "Du lịch TransViet Travel",
      "Du lịch TST Tourist",
      "WoCAL ReTREAT Kê Gà",
      "SÀI GÒN ĐI",
      "Website Vietravel (Vietrantour)"
    ],
    "sourceType": "URL",
    "sourceName": "https://www.dudisoftware.com/projects",
    "content": "DANH SÁCH DỰ ÁN DUDI SOFTWARE THỰC HIỆN TRONG LĨNH VỰC DU LỊCH (18 Dự án):\n\n1. Dự án Du lịch FIT Tour:\n- URL / Link: https://fittour.vn/\n- Mô tả chi tiết: Website giới thiệu các hành trình khám phá quốc tế được thiết kế riêng, tour thám hiểm, du lịch doanh nghiệp và MICE, giúp khách hàng tham khảo điểm đến, lịch khởi hành và đăng ký tư vấn.\n\n2. Dự án Du lịch Saigontourist Travel:\n- URL / Link: https://saigontourist.net/\n- Mô tả chi tiết: Website cung cấp các tour du lịch trong nước, quốc tế, combo nghỉ dưỡng, vé máy bay và dịch vụ thuê xe, giúp khách hàng tìm kiếm hành trình, xem lịch khởi hành và đặt tour trực tuyến.\n\n3. Dự án Du lịch Elite Tour:\n- URL / Link: https://elitetour.com.vn/\n- Mô tả chi tiết: Website cung cấp tour du lịch trong nước, quốc tế, combo nghỉ dưỡng, khách sạn và du thuyền, giúp khách hàng tìm kiếm hành trình, tham khảo lịch khởi hành và đặt dịch vụ trực tuyến.\n\n4. Dự án Du lịch Hải Đăng Travel:\n- URL / Link: https://haidangtravel.com/\n- Mô tả chi tiết: Website cung cấp tour du lịch trong nước, quốc tế, teambuilding, tổ chức sự kiện, dịch vụ visa, vé máy bay và thuê xe, giúp khách hàng dễ dàng tham khảo hành trình và đăng ký tư vấn.\n\n5. Dự án Du lịch iVIVU:\n- URL / Link: https://www.ivivu.com/\n- Mô tả chi tiết: Nền tảng hỗ trợ khách hàng đặt phòng khách sạn, tour du lịch, vé máy bay, vé vui chơi và vé tàu, đồng thời cung cấp các combo nghỉ dưỡng trong nước và quốc tế.\n\n6. Dự án Du lịch TransViet Travel:\n- URL / Link: https://transviet.com.vn/\n- Mô tả chi tiết: Website giới thiệu và cung cấp các tour du lịch trong nước, quốc tế, tour theo mùa, tour thiết kế riêng và dịch vụ visa, giúp khách hàng tìm kiếm hành trình, xem lịch trình, giá tour và đăng ký trực tuyến.\n\n7. Dự án Du lịch TST Tourist:\n- URL / Link: https://www.tsttourist.com/\n- Mô tả chi tiết: Website giới thiệu và cung cấp các tour du lịch trong nước, quốc tế, tour cao cấp, du thuyền và dịch vụ MICE, giúp khách hàng tìm kiếm hành trình, xem lịch trình và tham khảo giá tour trực tuyến.\n\n8. Dự án WoCAL ReTREAT Kê Gà:\n- URL / Link: https://www.wocal.camp/vi/#\n- Mô tả chi tiết: Website giới thiệu khu nghỉ dưỡng glamping ven biển, cung cấp dịch vụ lưu trú, trải nghiệm thiên nhiên, và nghỉ dưỡng cao cấp gần gũi môi trường.\n\n9. Dự án SÀI GÒN ĐI:\n- URL / Link: https://sai-gon-di-web-nu.vercel.app/user/home\n- Mô tả chi tiết: Nền tảng du lịch và khám phá các đỉa điểm thú vị tại Sài\n\n10. Dự án Website Vietravel (Vietrantour):\n- URL / Link: https://www.vietrantour.com.vn/\n- Mô tả chi tiết: Website cung cấp tour du lịch trong và ngoài nước, thông tin lịch trình, đặt tour và dịch vụ hỗ trợ khách hàng.\n\n11. Dự án Website HappyBook Travel:\n- URL / Link: https://happybooktravel.com/\n- Mô tả chi tiết: Website cung cấp dịch vụ du lịch, đặt tour và chia sẻ thông tin điểm đến, hỗ trợ khách hàng lên kế hoạch chuyến đi.\n\n12. Dự án Website Bến Thành Tourist:\n- URL / Link: https://benthanhtourist.com/\n- Mô tả chi tiết: Website cung cấp tour du lịch trong và ngoài nước, dịch vụ lữ hành và thông tin điểm đến cho khách hàng.\n\n13. Dự án Website Lửa Việt Tours:\n- URL / Link: https://www.luavietours.com/\n- Mô tả chi tiết: Website cung cấp dịch vụ tour du lịch, tổ chức sự kiện và hoạt động team building cho cá nhân và doanh nghiệp.\n\n14. Dự án Website Triệu Hảo Travel:\n- URL / Link: https://trieuhaotravel.vn/\n- Mô tả chi tiết: Website cung cấp tour du lịch, dịch vụ đặt vé và thông tin hành trình, hỗ trợ khách hàng lựa chọn chuyến đi phù hợp.\n\n15. Dự án Website công ty Vietran Tour:\n- URL / Link: https://vietrantour.com.vn/\n- Mô tả chi tiết: Website giới thiệu tour du lịch và dịch vụ lữ hành.\n\n16. Dự án Website du lịch thiên nhiên:\n- URL / Link: https://dulichthiennhien.vn/\n- Mô tả chi tiết: Giới thiệu điểm đến thiên nhiên và kinh nghiệm du lịch.\n\n17. Dự án Website khám phá du lịch Việt:\n- URL / Link: https://khamphadulichviet.com.vn/\n- Mô tả chi tiết: Chia sẻ điểm đến và kinh nghiệm du lịch Việt Nam.\n\n18. Dự án Website khám phá du lịch Việt:\n- URL / Link: https://dulichviet.com.vn/\n- Mô tả chi tiết: Chia sẻ điểm đến và kinh nghiệm du lịch Việt Nam."
  },
  {
    "title": "Kho Dự Án Tiêu Biểu Lĩnh Vực Bất động sản Của DUDI SOFTWARE",
    "category": "Kho Dự Án - Bất động sản",
    "tags": [
      "dự án",
      "bất động sản",
      "Bất động sản An Gia",
      "Masterise Homes",
      "Gamuda Land Việt Nam",
      "Bất động sản Rever",
      "Website Nhà Tốt",
      "Saigon BD Website",
      "Nền tảng Giao dịch Bất động sản Trực tuyến",
      "Website Tin tức & Thông tin Bất động sản",
      "Nền tảng Công nghệ & Dịch vụ Bất động sản",
      "Website Dudi BDS"
    ],
    "sourceType": "URL",
    "sourceName": "https://www.dudisoftware.com/projects",
    "content": "DANH SÁCH DỰ ÁN DUDI SOFTWARE THỰC HIỆN TRONG LĨNH VỰC BẤT ĐỘNG SẢN (20 Dự án):\n\n1. Dự án Bất động sản An Gia:\n- URL / Link: https://angia.com.vn/\n- Mô tả chi tiết: Website giới thiệu thương hiệu An Gia cùng các dự án căn hộ và khu đô thị, cung cấp thông tin về vị trí, tiện ích, tiến độ dự án và dịch vụ dành cho khách hàng.\n\n2. Dự án Masterise Homes:\n- URL / Link: https://masterisehomes.com/\n- Mô tả chi tiết: Website giới thiệu thương hiệu Masterise Homes cùng các dự án căn hộ cao cấp, bất động sản hàng hiệu, khu đô thị và bất động sản thương mại, giúp khách hàng dễ dàng khám phá thông tin, vị trí và phong cách sống của từng dự án.\n\n3. Dự án Gamuda Land Việt Nam:\n- URL / Link: https://gamudaland.com.vn/\n- Mô tả chi tiết: Website giới thiệu thương hiệu và các dự án bất động sản của Gamuda Land tại Việt Nam, giúp khách hàng tìm hiểu thông tin dự án, vị trí, loại hình sản phẩm và không gian sống.\n\n4. Dự án Bất động sản Rever:\n- URL / Link: https://rever.vn/\n- Mô tả chi tiết: Nền tảng hỗ trợ mua bán, cho thuê và ký gửi bất động sản, giúp khách hàng tìm kiếm căn hộ, nhà phố, đất nền, văn phòng và tham khảo các dự án theo khu vực.\n\n5. Dự án Website Nhà Tốt:\n- URL / Link: https://www.nhatot.com/\n- Mô tả chi tiết: Nền tảng đăng tin mua bán và cho thuê bất động sản, giúp người dùng tìm kiếm nhà ở, căn hộ, đất, phòng trọ, văn phòng và mặt bằng kinh doanh theo khu vực.\n\n6. Dự án Saigon BD Website:\n- URL / Link: https://saigonbd.vn/\n- Mô tả chi tiết: Website giới thiệu Saigon BD, cung cấp thông tin về các dự án bất động sản, dịch vụ môi giới và tư vấn đầu tư.\n\n7. Dự án Nền tảng Giao dịch Bất động sản Trực tuyến:\n- URL / Link: https://batdongsan.com.vn/\n- Mô tả chi tiết: Website nền tảng đăng tin và tìm kiếm bất động sản, hỗ trợ người dùng mua bán, cho thuê nhà đất, căn hộ, đất nền và kết nối với môi giới hoặc chủ sở hữu.\n\n8. Dự án Website Tin tức & Thông tin Bất động sản:\n- URL / Link: https://cafeland.vn/\n- Mô tả chi tiết: Website cung cấp tin tức, phân tích thị trường và thông tin bất động sản, giúp người dùng cập nhật xu hướng, giá cả và cơ hội đầu tư.\n\n9. Dự án Nền tảng Công nghệ & Dịch vụ Bất động sản:\n- URL / Link: https://rever.vn/\n- Mô tả chi tiết: Website nền tảng công nghệ bất động sản cung cấp dịch vụ môi giới, hỗ trợ tìm kiếm, mua bán và thuê nhà đất, kết hợp dữ liệu thị trường và công cụ hỗ trợ giao dịch.\n\n10. Dự án Website Dudi BDS:\n- URL / Link: https://dudi-bdsan-sigma.vercel.app/\n- Mô tả chi tiết: Website giới thiệu và đăng tin bất động sản.\n\n11. Dự án Website môi giới bất động sản SV3:\n- URL / Link: https://visaho.vn/moi-gioi-bat-dong-san-sv3.html\n- Mô tả chi tiết: Website cung cấp dịch vụ môi giới bất động sản, giới thiệu dự án, hỗ trợ tư vấn và kết nối khách hàng với sản phẩm phù hợp.\n\n12. Dự án Nhà môi giới bất động sản:\n- URL / Link: https://batdongsan.com.vn/nha-moi-gioi-quan-1\n- Mô tả chi tiết: Trang tổng hợp danh sách nhà môi giới bất động sản, cung cấp thông tin liên hệ, dự án và hỗ trợ kết nối người mua – người bán.\n\n13. Dự án Website Nhà Đất Vui:\n- URL / Link: https://www.nhadatvui.vn/\n- Mô tả chi tiết: Nền tảng đăng tin và tìm kiếm bất động sản, hỗ trợ kết nối người mua, người bán và môi giới với thông tin dự án đa dạng.\n\n14. Dự án Website Meey Land:\n- URL / Link: https://meeyland.com/\n- Mô tả chi tiết: Nền tảng công nghệ bất động sản, cung cấp hệ sinh thái tra cứu thông tin, đăng tin và hỗ trợ giao dịch cho người dùng.\n\n15. Dự án Website Homedy:\n- URL / Link: https://homedy.com/\n- Mô tả chi tiết: Nền tảng tìm kiếm và đăng tin bất động sản, cung cấp thông tin dự án, giá cả và hỗ trợ kết nối người mua – người bán.\n\n16. Dự án Website Mona Land:\n- URL / Link: https://mona-land.monamedia.net/ \n- Mô tả chi tiết: Website giới thiệu dự án và dịch vụ bất động sản, tích hợp chức năng đăng tin, tìm kiếm và tư vấn cho khách hàng.\n\n17. Dự án Website Hưng Hưng Thịnh:\n- URL / Link: https://hunghungthinh.com/\n- Mô tả chi tiết: Website giới thiệu doanh nghiệp bất động sản, cung cấp thông tin dự án, dịch vụ và hỗ trợ tư vấn cho khách hàng.\n\n18. Dự án Sàn giao dịch bất động sản Phú Mỹ Hưng:\n- URL / Link: https://phumyhung.vn/gioi-thieu/san-giao-dich-bat-dong-san-phu-my-hung\n- Mô tả chi tiết: Website giới thiệu sàn giao dịch bất động sản Phú Mỹ Hưng, cung cấp thông tin dự án và hỗ trợ tư vấn, giao dịch cho khách hàng.\n\n19. Dự án Website nền tảng quản lý chung cư KhaService:\n- URL / Link: https://khaservice.com.vn/\n- Mô tả chi tiết: Website cung cấp giải pháp quản lý và vận hành chung cư, tòa nhà.\n\n20. Dự án Website Thủ Đức Group.:\n- URL / Link: https://thuducgroup.vn/\n- Mô tả chi tiết: Nền tảng giới thiệu các dự án bất động sản, căn hộ và dịch vụ môi giới uy tín tại khu vực TP. Thủ Đức và lân cận."
  },
  {
    "title": "Kho Dự Án Tiêu Biểu Lĩnh Vực Đồ gia dụng Của DUDI SOFTWARE",
    "category": "Kho Dự Án - Đồ gia dụng",
    "tags": [
      "dự án",
      "đồ gia dụng",
      "Comet Gia Dụng",
      "Điện Máy Quang Hạnh",
      "Website bán hàng Gia Dụng Plus",
      "Website bán hàng Elmich Việt Nam",
      "Gia Dụng Nhanh",
      "Web Gia Dụng",
      "Gia Dụng Giá Net",
      "Gia Dụng 47",
      "Linh Việt",
      "Shop Hàng Đức"
    ],
    "sourceType": "URL",
    "sourceName": "https://www.dudisoftware.com/projects",
    "content": "DANH SÁCH DỰ ÁN DUDI SOFTWARE THỰC HIỆN TRONG LĨNH VỰC ĐỒ GIA DỤNG (20 Dự án):\n\n1. Dự án Comet Gia Dụng:\n- URL / Link: https://cometgiadung.vn/\n- Mô tả chi tiết: Website giới thiệu và kinh doanh các sản phẩm điện gia dụng, thiết bị nhà bếp và đồ dùng gia đình thương hiệu Comet, hỗ trợ khách hàng xem sản phẩm, mua sắm và tra cứu chính sách bảo hành trực tuyến.\n\n2. Dự án Điện Máy Quang Hạnh:\n- URL / Link: https://dienmayquanghanh.com/\n- Mô tả chi tiết: Website phân phối và bán lẻ các sản phẩm điện máy, điện lạnh, thiết bị nhà bếp và đồ gia dụng, giúp khách hàng dễ dàng tìm kiếm, tham khảo thông tin và mua sắm trực tuyến.\n\n3. Dự án Website bán hàng Gia Dụng Plus:\n- URL / Link: https://giadungplus.com/\n- Mô tả chi tiết: Website kinh doanh đồ gia dụng thông minh, sản phẩm nhà bếp, phòng tắm, đồ thủy tinh và các giải pháp sắp xếp nhà cửa, hỗ trợ khách hàng mua sắm, tra cứu đơn hàng và bảo hành trực tuyến.\n\n4. Dự án Website bán hàng Elmich Việt Nam:\n- URL / Link: https://elmich.vn/\n- Mô tả chi tiết: Website giới thiệu và kinh doanh các sản phẩm gia dụng Elmich như nồi chảo, thiết bị nhà bếp, bình giữ nhiệt và đồ dùng gia đình, hỗ trợ khách hàng tìm kiếm, mua sắm và theo dõi chương trình ưu đãi trực tuyến.\n\n5. Dự án Gia Dụng Nhanh:\n- URL / Link: https://giadungnhanh.com/\n- Mô tả chi tiết: Website chuyên cung cấp sỉ và lẻ các sản phẩm đồ gia dụng, đồ dùng thông minh và tiện ích cho gia đình với đa dạng ngành hàng như đồ bếp, mẹ & bé, nội thất và thiết bị gia đình.\n\n6. Dự án Web Gia Dụng:\n- URL / Link: https://webgiadung.com/\n- Mô tả chi tiết: Website bán hàng trực tuyến chuyên cung cấp các sản phẩm gia dụng, thiết bị nhà bếp, phụ kiện ô tô, đồ công nghệ và sản phẩm tiện ích cho gia đình với hình thức mua sắm online toàn quốc.\n\n7. Dự án Gia Dụng Giá Net:\n- URL / Link: https://www.giadunggianet.com/\n- Mô tả chi tiết: Website chuyên kinh doanh các sản phẩm gia dụng và thiết bị nhà bếp như nồi cơm điện, bếp từ, máy hút bụi, quạt điện cùng nhiều đồ dùng tiện ích cho gia đình, hỗ trợ mua sắm online toàn quốc.\n\n8. Dự án Gia Dụng 47:\n- URL / Link: https://giadung47.com/\n- Mô tả chi tiết: Website chuyên sỉ và lẻ các sản phẩm đồ gia dụng, đồ dùng tiện ích và phụ kiện gia đình với đa dạng mặt hàng như đồ bếp, vệ sinh nhà cửa, phụ kiện sinh hoạt và sản phẩm tiêu dùng hằng ngày.\n\n9. Dự án Linh Việt:\n- URL / Link: https://linhviet.vn/\n- Mô tả chi tiết: Website chuyên phân phối các thiết bị nhà bếp và đồ gia dụng cao cấp nhập khẩu với đa dạng sản phẩm gồm máy rửa bát, bếp từ, máy hút bụi, robot hút bụi và thiết bị gia đình thông minh.\n\n10. Dự án Shop Hàng Đức:\n- URL / Link: https://shophangduc.com.vn/\n- Mô tả chi tiết: Website chuyên cung cấp đồ gia dụng, thiết bị nhà bếp và sản phẩm tiện ích nhập khẩu châu Âu hỗ trợ mua sắm trực tuyến và giao hàng toàn quốc.\n\n11. Dự án Điện Máy META:\n- URL / Link: https://meta.vn/\n- Mô tả chi tiết: website siêu thị điện máy online chuyên bán lẻ trực tuyến các thiết bị điện tử, điện lạnh (tivi, tủ lạnh, máy giặt, điều hòa) và đồ gia dụng gia đình. Ứng dụng duy nhất của website này là giúp bạn ngồi nhà đặt mua hàng qua mạng và được giao hàng, trả tiền tận nơi trên toàn quốc.\n\n12. Dự án Đồ gia dụng:\n- URL / Link: https://xn--giadng-lq8b.vn/\n- Mô tả chi tiết: Đây là một trang web tổng hợp và cung cấp thông tin về giá cả, hình ảnh cũng như mô tả chi tiết của các sản phẩm đồ gia dụng (dụng cụ nhà bếp, đồ phòng ăn, phòng ngủ, sân vườn, đồ phong thủy...).\n\n13. Dự án Bear Việt Nam:\n- URL / Link: https://bearvietnam.com.vn/\n- Mô tả chi tiết: kinh doanh và phân phối các thiết bị đồ gia dụng, đồ dùng nhà bếp thông minh và sản phẩm dành cho mẹ và bé mang thương hiệu Bear. Các dòng sản phẩm nổi bật bao gồm nồi nấu chậm, nồi chiên không dầu, máy xay thịt, máy làm sữa hạt và máy nhồi bột.\n\n14. Dự án Sapa Kitchen:\n- URL / Link: https://sapakitchen.vn/\n- Mô tả chi tiết: chuyên nhập khẩu và phân phối chính hãng các dòng sản phẩm đồ gia dụng, thủy tinh cao cấp từ các thương hiệu nổi tiếng thế giới (như Bormioli Rocco của Ý, Korkmaz của Thổ Nhĩ Kỳ, Stoneline của Đức, Diva Laopala của Ấn Độ,...)\n\n15. Dự án Kids Plaza:\n- URL / Link: https://www.kidsplaza.vn/\n- Mô tả chi tiết: Đây là trang mua sắm trực tuyến (E-commerce) chuyên sỉ và lẻ các sản phẩm dành riêng cho Mẹ bầu và Em bé (như sữa, bỉm tã, đồ sơ sinh, máy hút sữa, vitamin...).\n\n16. Dự án Gia Dụng Smart Home Enic:\n- URL / Link: https://enic.vn/\n- Mô tả chi tiết: Website Enic là trang thương mại điện tử chính thức chuyên cung cấp các sản phẩm công nghệ nhà thông minh (Smart Home), thiết bị vệ sinh cao cấp (bồn cầu thông minh, tủ gương, sen tắm) và thiết bị nhà bếp hiện đại (bồn rửa chén, bếp từ, máy rửa bát) giúp nâng tầm không gian sống cho gia đình.\n\n17. Dự án Thế Giới Đồ Gia Dụng:\n- URL / Link: https://thegioidogiadung.com.vn/\n- Mô tả chi tiết: chuyên cung cấp, phân phối bán lẻ và sỉ các sản phẩm đồ gia dụng, điện máy chính hãng và hàng nhập khẩu (từ Đức, Nhật Bản, Hàn Quốc...) với mức giá cạnh tranh.\n\n18. Dự án Elmich Việt Nam:\n- URL / Link: https://shop.elmich.vn/\n- Mô tả chi tiết: Mua sắm trực tuyến chính thức của thương hiệu đồ gia dụng cao cấp đến từ Cộng hòa Séc. Nơi đây chuyên cung cấp các sản phẩm nhà bếp chuẩn Châu Âu như bộ nồi inox, chảo chống dính và bình giữ nhiệt an toàn cho sức khỏe.\n\n19. Dự án Website Giga Digital:\n- URL / Link: https://gigadigital.vn/\n- Mô tả chi tiết: Website cung cấp giải pháp marketing và quảng cáo số cho doanh nghiệp.\n\n20. Dự án Website thương mại điện tử Store Thiết Bị:\n- URL / Link: https://storethietbi.com/\n- Mô tả chi tiết: Website bán thiết bị, dụng cụ và máy móc trực tuyến."
  },
  {
    "title": "Kho Dự Án Tiêu Biểu Lĩnh Vực Cây cảnh & Hoa tươi Của DUDI SOFTWARE",
    "category": "Kho Dự Án - Cây cảnh & Hoa tươi",
    "tags": [
      "dự án",
      "cây cảnh & hoa tươi",
      "Vựa Kiểng Sài Gòn"
    ],
    "sourceType": "URL",
    "sourceName": "https://www.dudisoftware.com/projects",
    "content": "DANH SÁCH DỰ ÁN DUDI SOFTWARE THỰC HIỆN TRONG LĨNH VỰC CÂY CẢNH & HOA TƯƠI (1 Dự án):\n\n1. Dự án Vựa Kiểng Sài Gòn:\n- URL / Link: https://vuakiengsaigon.com.vn/\n- Mô tả chi tiết: Website giới thiệu và kinh doanh cây cảnh, chậu cây cùng dịch vụ thiết kế, thi công cảnh quan sân vườn. Giao diện được xây dựng nhằm giúp khách hàng dễ dàng tìm kiếm sản phẩm, tham khảo dịch vụ và liên hệ tư vấn, góp phần mang đến giải pháp không gian xanh cho nhà ở, văn phòng và công trình."
  },
  {
    "title": "Kho Dự Án Tiêu Biểu Lĩnh Vực Dịch vụ Của DUDI SOFTWARE",
    "category": "Kho Dự Án - Dịch vụ",
    "tags": [
      "dự án",
      "dịch vụ",
      "Website Kiến Lửa",
      "Website WebIdeas",
      "Website dịch vụ thiết kế web",
      "Website Clean House",
      "Cung cấp dịch vụ vệ sinh và làm sạch công nghiệp.",
      "Deloitte Southeast Asia Corporate Website",
      "PwC Vietnam Corporate Website",
      "Viet Australia Auditing Website",
      "Website dịch vụ vệ sinh Anitime",
      "Website STWatch"
    ],
    "sourceType": "URL",
    "sourceName": "https://www.dudisoftware.com/projects",
    "content": "DANH SÁCH DỰ ÁN DUDI SOFTWARE THỰC HIỆN TRONG LĨNH VỰC DỊCH VỤ (10 Dự án):\n\n1. Dự án Website Kiến Lửa:\n- URL / Link: https://kienlua.vn/?gad_source=1&gad_campaignid=23474531700&gbraid=0AAAAADSF_DDQYepvM0QWqLpWwPfLlpIvH&gclid=Cj0KCQjwkrzPBhCqARIsAJN460maOP76LHpcMO3Jk01XfT2ziyvA1DcUPEYXsQJk5Eg07H6FZHU2228aAnVtEALw_wcB\n- Mô tả chi tiết: Cung cấp dịch vụ thiết kế website và giải pháp digital.\n\n2. Dự án Website WebIdeas:\n- URL / Link: https://webideas.vn/\n- Mô tả chi tiết: Cung cấp dịch vụ thiết kế website và giải pháp digital.\n\n3. Dự án Website dịch vụ thiết kế web:\n- URL / Link: https://www.thietkeweb.com/dich-vu-web/index.html\n- Mô tả chi tiết: Cung cấp dịch vụ thiết kế và phát triển website.\n\n4. Dự án Website Clean House:\n- URL / Link: https://cleanhouse.com.vn/\n- Mô tả chi tiết: Cung cấp dịch vụ vệ sinh nhà ở và văn phòng.\n\n5. Dự án Cung cấp dịch vụ vệ sinh và làm sạch công nghiệp.:\n- URL / Link: https://hunganhphat.vn/?gad_source=1&gad_campaignid=15509627015&gbraid=0AAAAADFo1-4l5IpQqDGahuSTM_GtQFsod&gclid=Cj0KCQjwkrzPBhCqARIsAJN460niOBDojAhSOEYUFqFpPqNV6ldds2MHh_F2iJsJyP1gkc2eC4-862oaAgyWEALw_wcB\n- Mô tả chi tiết: Cung cấp dịch vụ vệ sinh và làm sạch công nghiệp.\n\n6. Dự án Deloitte Southeast Asia Corporate Website:\n- URL / Link: https://www.deloitte.com/southeast-asia/en.html\n- Mô tả chi tiết: Website chính thức của Deloitte Southeast Asia – mạng lưới dịch vụ tư vấn, kiểm toán, thuế, chiến lược và công nghệ thuộc Deloitte toàn cầu. Website cung cấp thông tin về giải pháp doanh nghiệp, chuyển đổi số, tài chính, quản trị rủi ro, AI, cloud, ESG, tuyển dụng và các báo cáo chuyên ngành tại khu vực Đông Nam Á. Giao diện website mang phong cách chuyên nghiệp, hiện đại và tập trung trải nghiệm doanh nghiệp.\n\n7. Dự án PwC Vietnam Corporate Website:\n- URL / Link: https://www.pwc.com/vn/vn\n- Mô tả chi tiết: Website chính thức của PwC Việt Nam – thành viên thuộc mạng lưới PricewaterhouseCoopers toàn cầu, chuyên cung cấp dịch vụ kiểm toán, tư vấn doanh nghiệp, thuế, pháp lý và chuyển đổi số. Website cung cấp thông tin về giải pháp doanh nghiệp, ESG, AI, quản trị rủi ro, tài chính, pháp lý, tuyển dụng và các báo cáo chuyên ngành tại Việt Nam. PwC Việt Nam hoạt động từ năm 1994 với văn phòng tại TP.HCM và Hà Nội.\n\n8. Dự án Viet Australia Auditing Website:\n- URL / Link: https://vietaustralia.com/\n- Mô tả chi tiết: Website chính thức của Công ty Kiểm toán Việt Úc (Viet Australia Auditing – VAAL), chuyên cung cấp dịch vụ kiểm toán, kế toán, tư vấn thuế, tư vấn doanh nghiệp và dịch vụ tài chính tại Việt Nam và Australia. Website giới thiệu thông tin doanh nghiệp, dịch vụ chuyên môn, hoạt động công ty, khách hàng tiêu biểu, tuyển dụng và hệ thống văn phòng trên toàn quốc. Đội ngũ của Viet Australia gồm các CPA Việt Nam, CPA Úc và nhân sự từng làm việc tại Big4 như PwC và Deloitte.\n\n9. Dự án Website dịch vụ vệ sinh Anitime:\n- URL / Link: https://anitime.vn/dich-vu/ve-sinh-hang-ngay.html\n- Mô tả chi tiết: Website giới thiệu dịch vụ vệ sinh hàng ngày cho cá nhân và doanh nghiệp.\n\n10. Dự án Website STWatch:\n- URL / Link: https://www.stwatch.vn/\n- Mô tả chi tiết: Website giới thiệu dịch vụ sửa chữa, bảo dưỡng và thu mua đồng hồ"
  },
  {
    "title": "Kho Dự Án Tiêu Biểu Lĩnh Vực Giao hàng Của DUDI SOFTWARE",
    "category": "Kho Dự Án - Giao hàng",
    "tags": [
      "dự án",
      "giao hàng",
      "Website GHN",
      "Website Ahamove",
      "Website Giao Hàng Nặng",
      "Dịch vụ logistics PCS",
      "Dịch vụ logistics Nhất Tín",
      "Vận chuyển hàng hóa Tô Châu",
      "Giao hàng toàn quốc nhanh",
      "Giao hàng Lotus Delivery",
      "Chuyển phát nhanh EMS",
      "FedEx Vietnam Corporate Website"
    ],
    "sourceType": "URL",
    "sourceName": "https://www.dudisoftware.com/projects",
    "content": "DANH SÁCH DỰ ÁN DUDI SOFTWARE THỰC HIỆN TRONG LĨNH VỰC GIAO HÀNG (10 Dự án):\n\n1. Dự án Website GHN:\n- URL / Link: https://ghn.vn/pages/dich-vu-giao-hang\n- Mô tả chi tiết: Cung cấp dịch vụ giao hàng nhanh toàn quốc.\n\n2. Dự án Website Ahamove:\n- URL / Link: https://ahamove.com/\n- Mô tả chi tiết: Dịch vụ giao hàng nhanh theo yêu cầu.\n\n3. Dự án Website Giao Hàng Nặng:\n- URL / Link: https://giaohangnang.com/\n- Mô tả chi tiết: Cung cấp dịch vụ vận chuyển hàng hóa nặng.\n\n4. Dự án Dịch vụ logistics PCS:\n- URL / Link: https://pcs.vn/vi\n- Mô tả chi tiết: Cung cấp dịch vụ vận chuyển, kho vận và giải pháp logistics cho doanh nghiệp.\n\n5. Dự án Dịch vụ logistics Nhất Tín:\n- URL / Link: https://ntlogistics.vn/\n- Mô tả chi tiết: Cung cấp dịch vụ chuyển phát nhanh, vận chuyển hàng hóa và giải pháp logistics cho doanh nghiệp.\n\n6. Dự án Vận chuyển hàng hóa Tô Châu:\n- URL / Link: https://tochau.com.vn/\n- Mô tả chi tiết: Cung cấp dịch vụ vận chuyển hàng hóa, chuyển phát và giải pháp logistics cho doanh nghiệp.\n\n7. Dự án Giao hàng toàn quốc nhanh:\n- URL / Link: https://toanquocnhanh.vn/\n- Mô tả chi tiết: Cung cấp dịch vụ giao hàng, vận chuyển hàng hóa và hỗ trợ giao nhận trên toàn quốc.\n\n8. Dự án Giao hàng Lotus Delivery:\n- URL / Link: https://lotusdelivery.vn/\n- Mô tả chi tiết: Cung cấp dịch vụ giao hàng, vận chuyển hàng hóa và giải pháp giao nhận cho doanh nghiệp.\n\n9. Dự án Chuyển phát nhanh EMS:\n- URL / Link: https://ems.com.vn/\n- Mô tả chi tiết: Cung cấp dịch vụ chuyển phát nhanh trong nước và quốc tế, hỗ trợ giao nhận hàng hóa và bưu phẩm.\n\n10. Dự án FedEx Vietnam Corporate Website:\n- URL / Link: https://www.fedex.com/vi-vn/home.html\n- Mô tả chi tiết: Website chính thức của FedEx Việt Nam – một trong những tập đoàn chuyển phát nhanh và logistics lớn nhất thế giới. Website cung cấp các dịch vụ vận chuyển quốc tế, tracking đơn hàng, logistics, thương mại điện tử, khai báo hải quan và giải pháp chuỗi cung ứng cho doanh nghiệp và cá nhân. FedEx hiện phục vụ hơn 220 quốc gia và vùng lãnh thổ, với hệ thống vận hành tại Việt Nam từ năm 1994. Website tập trung vào trải nghiệm vận chuyển nhanh, quản lý đơn hàng trực tuyến và kết nối thương mại toàn cầu."
  },
  {
    "title": "Kho Dự Án Tiêu Biểu Lĩnh Vực Làm đẹp Của DUDI SOFTWARE",
    "category": "Kho Dự Án - Làm đẹp",
    "tags": [
      "dự án",
      "làm đẹp",
      "Spa Việt",
      "EMCAS",
      "Bệnh viện Thẩm mỹ Sài Gòn Young",
      "Website Sắc Đẹp Spa",
      "Website Bông Spa",
      "Website An Nam Spa",
      "Sen Spa Website",
      "Website Dreamy Lash Aesthetics",
      "Website thương mại điện tử SammiShop",
      "Website thương hiệu chăm sóc da Laboho"
    ],
    "sourceType": "URL",
    "sourceName": "https://www.dudisoftware.com/projects",
    "content": "DANH SÁCH DỰ ÁN DUDI SOFTWARE THỰC HIỆN TRONG LĨNH VỰC LÀM ĐẸP (13 Dự án):\n\n1. Dự án Spa Việt:\n- URL / Link: https://spaviet.com.vn/vi/\n- Mô tả chi tiết: Website giới thiệu dịch vụ spa, chăm sóc da và thẩm mỹ, cung cấp thông tin dịch vụ, bảng giá và hỗ trợ khách hàng đặt lịch nhanh chóng.\n\n2. Dự án EMCAS:\n- URL / Link: https://www.emcas.vn/\n- Mô tả chi tiết: Website thẩm mỹ viện EMCAS cung cấp thông tin dịch vụ phẫu thuật thẩm mỹ, chăm sóc sắc đẹp và hỗ trợ khách hàng tư vấn, đặt lịch.\n\n3. Dự án Bệnh viện Thẩm mỹ Sài Gòn Young:\n- URL / Link: https://benhvienthammysaigonyoung.vn/\n- Mô tả chi tiết: Website bệnh viện thẩm mỹ cung cấp thông tin dịch vụ làm đẹp, phẫu thuật thẩm mỹ và hỗ trợ khách hàng tư vấn, đặt lịch.\n\n4. Dự án Website Sắc Đẹp Spa:\n- URL / Link: https://sacdepspa.com/\n- Mô tả chi tiết: Giới thiệu dịch vụ spa và chăm sóc sắc đẹp.\n\n5. Dự án Website Bông Spa:\n- URL / Link: https://www.bongspa.com/\n- Mô tả chi tiết: Cung cấp dịch vụ spa và chăm sóc sắc đẹp.\n\n6. Dự án Website An Nam Spa:\n- URL / Link: https://annamspa.vn/?gad_source=1&gad_campaignid=22595611324&gbraid=0AAAAA-5zgviZp0czYen94e_lpB-ja0RT7&gclid=Cj0KCQjwkrzPBhCqARIsAJN460lGH2AM3LPttmOkfzCpyi9cmHkdNfoGrlx3mn7poeSZgd1I9L_29bUaAkEaEALw_wcB\n- Mô tả chi tiết: Giới thiệu dịch vụ spa và chăm sóc sắc đẹp.\n\n7. Dự án Sen Spa Website:\n- URL / Link: https://senspa.com.vn/\n- Mô tả chi tiết: Website giới thiệu Sen Spa, cung cấp thông tin dịch vụ, không gian và hỗ trợ khách hàng đặt lịch trải nghiệm.\n\n8. Dự án Website Dreamy Lash Aesthetics:\n- URL / Link: https://dreamylashaesthetics.com.au/\n- Mô tả chi tiết: Website giới thiệu dịch vụ nối mi và chăm sóc thẩm mỹ.\n\n9. Dự án Website thương mại điện tử SammiShop:\n- URL / Link: https://sammishop.com/\n- Mô tả chi tiết: Website bán mỹ phẩm và sản phẩm chăm sóc sắc đẹp trực tuyến.\n\n10. Dự án Website thương hiệu chăm sóc da Laboho:\n- URL / Link: https://www.laboho.vn/\n- Mô tả chi tiết: Website giới thiệu sản phẩm chăm sóc da, cung cấp thông tin chi tiết và hỗ trợ người dùng mua hàng trực tuyến.\n\n11. Dự án Website Bệnh viện Thẩm mỹ Việt Mỹ:\n- URL / Link: https://benhvienvietmy.com/vie/\n- Mô tả chi tiết: Website giới thiệu dịch vụ phẫu thuật và thẩm mỹ, cung cấp thông tin dịch vụ, bảng giá và hỗ trợ tư vấn trực tuyến.\n\n12. Dự án Lam Thảo Cosmetics Website:\n- URL / Link: https://lamthaocosmetics.vn/\n- Mô tả chi tiết: Website thương mại điện tử của Lam Thảo Cosmetics, cung cấp các sản phẩm mỹ phẩm và hỗ trợ khách hàng mua sắm trực tuyến.\n\n13. Dự án DN Cosmetics Website:\n- URL / Link: https://dncosmetics.vn/\n- Mô tả chi tiết: Website thương mại điện tử của DN Cosmetics, cung cấp các sản phẩm mỹ phẩm và hỗ trợ khách hàng mua sắm trực tuyến."
  },
  {
    "title": "Kho Dự Án Tiêu Biểu Lĩnh Vực E-learning Của DUDI SOFTWARE",
    "category": "Kho Dự Án - E-learning",
    "tags": [
      "dự án",
      "e-learning",
      "TTGDTX Quận 11 Website",
      "Talent Gate Vietnam Website",
      "Noova E-Learning & HR Platform Website",
      "GK Corporation Website",
      "DES – Digital Education Solution Website",
      "Website 10X English",
      "Website Kyna English Adult.",
      "Website học trực tuyến Unica",
      "Website học viện VYA",
      "Website DOL English"
    ],
    "sourceType": "URL",
    "sourceName": "https://www.dudisoftware.com/projects",
    "content": "DANH SÁCH DỰ ÁN DUDI SOFTWARE THỰC HIỆN TRONG LĨNH VỰC E-LEARNING (10 Dự án):\n\n1. Dự án TTGDTX Quận 11 Website:\n- URL / Link: https://ttgdtxq11.hcm.edu.vn/homegd135#\n- Mô tả chi tiết: Website cung cấp thông tin về Trung tâm Giáo dục Thường xuyên Quận 11, bao gồm chương trình đào tạo, thông báo và hoạt động giáo dục.\n\n2. Dự án Talent Gate Vietnam Website:\n- URL / Link: https://talentgate.vn/\n- Mô tả chi tiết: Website chính thức của Talent Gate Việt Nam – doanh nghiệp hoạt động trong lĩnh vực tuyển dụng, headhunting, tư vấn nhân sự và phát triển nguồn nhân lực cho doanh nghiệp tại Việt Nam. Website cung cấp thông tin về dịch vụ tuyển dụng, giải pháp HR, đào tạo nhân sự, cơ hội việc làm và định hướng phát triển nghề nghiệp cho ứng viên. Giao diện website theo phong cách hiện đại, chuyên nghiệp, tập trung trải nghiệm doanh nghiệp và ứng viên.\n\n3. Dự án Noova E-Learning & HR Platform Website:\n- URL / Link: https://noova.vn/\n- Mô tả chi tiết: Website giới thiệu nền tảng Noova – hệ thống E-Learning, LMS và quản lý nhân sự toàn diện dành cho doanh nghiệp. Noova cung cấp các giải pháp đào tạo nội bộ, quản lý năng lực, đánh giá hiệu suất, tuyển dụng, onboarding, quản lý tài liệu và workflow doanh nghiệp trên một nền tảng duy nhất. Hệ thống được phát triển bởi Công ty Cổ phần Giải pháp Công nghệ VN-ELEARNING, hỗ trợ AI, SSO, LMS, HRM và nhiều tính năng dành cho doanh nghiệp hiện đại.\n\n4. Dự án GK Corporation Website:\n- URL / Link: https://gkcorp.com.vn/\n- Mô tả chi tiết: Website chính thức của GK Corporation – doanh nghiệp tiên phong trong lĩnh vực E-learning và giải pháp đào tạo trực tuyến tại Việt Nam. Website cung cấp thông tin về hệ thống LMS, khóa học trực tuyến, giải pháp đào tạo doanh nghiệp, kỹ năng mềm, đào tạo nhân sự và chuyển đổi số trong giáo dục doanh nghiệp. GK Corporation phát triển thương hiệu VietnamLearning và từng triển khai giải pháp đào tạo cho nhiều doanh nghiệp lớn tại Việt Nam.\n\n5. Dự án DES – Digital Education Solution Website:\n- URL / Link: https://des.vn/\n- Mô tả chi tiết: Website chính thức của DES (Digital Education Solution) – doanh nghiệp cung cấp giải pháp eLearning, LMS và số hóa đào tạo cho doanh nghiệp. Website giới thiệu các dịch vụ như xây dựng hệ thống đào tạo trực tuyến, quản lý học tập (LMS), số hóa nội dung đào tạo, video learning, animation, SCORM/xAPI và tư vấn phát triển nguồn nhân lực trong thời đại số. Giao diện website theo phong cách hiện đại, tập trung vào chuyển đổi số đào tạo doanh nghiệp và EdTech.\n\n6. Dự án Website 10X English:\n- URL / Link: https://khoahoc.10xenglish.edu.vn/\n- Mô tả chi tiết: Website giới thiệu khóa học tiếng Anh giao tiếp và đào tạo Anh ngữ.\n\n7. Dự án Website Kyna English Adult.:\n- URL / Link: https://adult.kynaenglish.com/\n- Mô tả chi tiết: Website giới thiệu khóa học tiếng Anh cho người đi làm và người trưởng thành.\n\n8. Dự án Website học trực tuyến Unica:\n- URL / Link: https://unica.vn/\n- Mô tả chi tiết: Website cung cấp các khóa học trực tuyến đa lĩnh vực.\n\n9. Dự án Website học viện VYA:\n- URL / Link: https://vya.edu.vn/\n- Mô tả chi tiết: Website cung cấp chương trình đào tạo và khóa học.\n\n10. Dự án Website DOL English:\n- URL / Link: https://www.dolenglish.vn/\n- Mô tả chi tiết: Website giới thiệu khóa học và chương trình đào tạo tiếng Anh."
  },
  {
    "title": "Kho Dự Án Tiêu Biểu Lĩnh Vực Logistics Của DUDI SOFTWARE",
    "category": "Kho Dự Án - Logistics",
    "tags": [
      "dự án",
      "logistics",
      "Website Melody Logistics",
      "Website Vinalink Logistics",
      "Website cước vận chuyển",
      "DHL Vietnam Website",
      "Logistics H&A Website",
      "Saigon Newport Website",
      "Website Trường Nam Logistics.",
      "Website LTC Logistics",
      "Website Knight Logistics",
      "Website Vietnam Export"
    ],
    "sourceType": "URL",
    "sourceName": "https://www.dudisoftware.com/projects",
    "content": "DANH SÁCH DỰ ÁN DUDI SOFTWARE THỰC HIỆN TRONG LĨNH VỰC LOGISTICS (12 Dự án):\n\n1. Dự án Website Melody Logistics:\n- URL / Link: https://www.melodylogistics.com/\n- Mô tả chi tiết: Cung cấp dịch vụ vận chuyển và logistics.\n\n2. Dự án Website Vinalink Logistics:\n- URL / Link: https://vinalinklogistics.com/\n- Mô tả chi tiết: Cung cấp dịch vụ vận chuyển và logistics.\n\n3. Dự án Website cước vận chuyển:\n- URL / Link: https://cuocvanchuyen.vn/gia-cuoc-van-chuyen.html?gad_source=1&gad_campaignid=21368049019&gbraid=0AAAAApToRWownf0cUcR6EkNXdIaa2gvAO&gclid=Cj0KCQjwkrzPBhCqARIsAJN460llZin3-YFjxXvSKtZtaXhRVgTJqv3_H7etizXaLBIBtTOPtLgrkKgaAr7rEALw_wcB\n- Mô tả chi tiết: Tra cứu và tính giá cước vận chuyển hàng hóa.\n\n4. Dự án DHL Vietnam Website:\n- URL / Link: https://www.dhl.com/vn-vi/home.html\n- Mô tả chi tiết: Website chính thức của DHL tại Việt Nam, cung cấp thông tin về dịch vụ vận chuyển quốc tế, logistics và giải pháp chuỗi cung ứng.\n\n5. Dự án Logistics H&A Website:\n- URL / Link: https://www.logisticsh-a.com/\n- Mô tả chi tiết: Website giới thiệu công ty Logistics H&A, cung cấp thông tin về dịch vụ vận chuyển, kho bãi và giải pháp logistics cho doanh nghiệp.\n\n6. Dự án Saigon Newport Website:\n- URL / Link: https://saigonnewport.com.vn/\n- Mô tả chi tiết: Website giới thiệu Saigon Newport, cung cấp thông tin về hoạt động cảng, dịch vụ logistics và quản lý chuỗi cung ứng.\n\n7. Dự án Website Trường Nam Logistics.:\n- URL / Link: https://hanghoa.truongnamlogistics.com/\n- Mô tả chi tiết: Website giới thiệu dịch vụ vận chuyển và logistics hàng hóa.\n\n8. Dự án Website LTC Logistics:\n- URL / Link: https://ltclogistics.vn/\n- Mô tả chi tiết: Website giới thiệu dịch vụ vận chuyển và logistics cho doanh nghiệp.\n\n9. Dự án Website Knight Logistics:\n- URL / Link: https://knight.com.vn/\n- Mô tả chi tiết: Website giới thiệu dịch vụ vận chuyển và logistics quốc tế.\n\n10. Dự án Website Vietnam Export:\n- URL / Link: https://vietnamexport.com/\n- Mô tả chi tiết: Website cung cấp thông tin và kết nối hoạt động xuất khẩu Việt Nam.\n\n11. Dự án Website công ty Vinaseed:\n- URL / Link: https://vinaseed.com.vn/\n- Mô tả chi tiết: Website giới thiệu sản phẩm giống cây trồng và hoạt động nông nghiệp.\n\n12. Dự án Website công ty ITL:\n- URL / Link: https://itlvn.com/vi/\n- Mô tả chi tiết: Website giới thiệu dịch vụ vận chuyển và giải pháp logistics cho doanh nghiệp."
  },
  {
    "title": "Kho Dự Án Tiêu Biểu Lĩnh Vực Xây dựng Của DUDI SOFTWARE",
    "category": "Kho Dự Án - Xây dựng",
    "tags": [
      "dự án",
      "xây dựng",
      "Xây Dựng Chính Nam Website",
      "Xây Dựng Quang Minh Website",
      "Viteccons",
      "SA Corp",
      "Công Nghiệp Bảo Sơn",
      "Xây dựng THIET THACH",
      "Hóa Chất Việt Quang",
      "Xây dựng và Tư vấn Đầu tư Kiến Phát",
      "Website công ty HBCG",
      "Website công ty FECON"
    ],
    "sourceType": "URL",
    "sourceName": "https://www.dudisoftware.com/projects",
    "content": "DANH SÁCH DỰ ÁN DUDI SOFTWARE THỰC HIỆN TRONG LĨNH VỰC XÂY DỰNG (11 Dự án):\n\n1. Dự án Xây Dựng Chính Nam Website:\n- URL / Link: https://www.xaydungchinhnam.vn/\n- Mô tả chi tiết: Website giới thiệu công ty xây dựng Chính Nam, cung cấp thông tin về dịch vụ, dự án và năng lực thi công.\n\n2. Dự án Xây Dựng Quang Minh Website:\n- URL / Link: https://xaydungquangminh.com/\n- Mô tả chi tiết: Website giới thiệu công ty Xây Dựng Quang Minh, cung cấp thông tin về dịch vụ, dự án đã thực hiện và năng lực thi công.\n\n3. Dự án Viteccons:\n- URL / Link: https://www.viteccons.vn/vi\n- Mô tả chi tiết: Website giới thiệu doanh nghiệp hoạt động trong lĩnh vực tổng thầu thiết kế, thi công xây dựng và tư vấn đầu tư với nhiều dự án về công nghiệp, thương mại, khách sạn, văn phòng và hạ tầng trên toàn quốc.\n\n4. Dự án SA Corp:\n- URL / Link: https://www.sa-corp.vn/\n- Mô tả chi tiết: Website giới thiệu doanh nghiệp hoạt động trong lĩnh vực tư vấn thiết kế kiến trúc, kết cấu, cơ điện (MEP), thẩm tra và tối ưu hóa thiết kế công trình. Doanh nghiệp ứng dụng công nghệ BIM trong triển khai các dự án dân dụng, cao tầng, resort và hạ tầng kỹ thuật.\n\n5. Dự án Công Nghiệp Bảo Sơn:\n- URL / Link: https://baoson.net.vn/\n- Mô tả chi tiết: Web giới thiệu và cung cấp các sản phẩm vật liệu chịu nhiệt, cách nhiệt và bảo ôn (như gạch chịu lửa, bê tông chịu nhiệt, xi măng chịu lửa, bông thủy tinh, bông khoáng...) phục vụ cho các công trình công nghiệp như lò nung, lò hơi, lò đốt. Ngoài ra, web cũng là nơi đăng tải các bài viết hướng dẫn kỹ thuật thi công và thông tin tuyển dụng của công ty.\n\n6. Dự án Xây dựng THIET THACH:\n- URL / Link: https://thietthach.vn/\n- Mô tả chi tiết: Chuyên giới thiệu các dịch vụ tư vấn thiết kế kiến trúc, thiết kế nội thất và thi công xây dựng các công trình nhà phố, biệt thự. Trên web, người xem có thể tham khảo các mẫu nhà đẹp, bảng báo giá chi phí xây dựng, quy trình làm việc và các công trình thực tế mà công ty đã hoàn thiện.\n\n7. Dự án Hóa Chất Việt Quang:\n- URL / Link: https://vietquang.vn/\n- Mô tả chi tiết: Giới thiệu, trưng bày và cung cấp các loại hóa chất phục vụ cho ngành công nghiệp (như hóa chất xi mạ, xử lý bề mặt kim loại, hóa chất xử lý nước/môi trường, dung môi hữu cơ và thiết bị phòng thí nghiệm). Khách hàng có thể lên đây để tra cứu thông tin kỹ thuật sản phẩm, xem chứng nhận chất lượng và liên hệ đặt mua hàng.\n\n8. Dự án Xây dựng và Tư vấn Đầu tư Kiến Phát:\n- URL / Link: https://kienphatcons.com/\n- Mô tả chi tiết: Chuyên về dịch vụ tư vấn thiết kế kiến trúc và thi công xây dựng các công trình dân dụng như nhà phố, biệt thự, nhà xưởng, khách sạn và văn phòng. Trên trang web, người xem có thể tìm thấy các mẫu thiết kế bản vẽ, bảng đơn giá xây dựng phần thô/trọn gói, cùng với hình ảnh các công trình thực tế mà công ty đã thực hiện tại TP.HCM và các tỉnh lân cận\n\n9. Dự án Website công ty HBCG:\n- URL / Link: https://hbcg.vn/\n- Mô tả chi tiết: Website giới thiệu dịch vụ và hoạt động trong lĩnh vực xây dựng.\n\n10. Dự án Website công ty FECON:\n- URL / Link: https://fecon.com.vn/\n- Mô tả chi tiết: Website giới thiệu hoạt động thi công và giải pháp kỹ thuật xây dựng.\n\n11. Dự án Website công ty Viglacera:\n- URL / Link: https://viglacera.com.vn/\n- Mô tả chi tiết: Website giới thiệu sản phẩm vật liệu xây dựng và hoạt động sản xuất của doanh nghiệp."
  },
  {
    "title": "Kho Dự Án Tiêu Biểu Lĩnh Vực Nha khoa Của DUDI SOFTWARE",
    "category": "Kho Dự Án - Nha khoa",
    "tags": [
      "dự án",
      "nha khoa",
      "Nha khoa Nhân Tâm",
      "Nha khoa Đất Việt",
      "Nha khoa MedDental",
      "Nha Khoa Kim",
      "Nha Khoa Việt Nga",
      "Nha khoa 68",
      "Nha Khoa Nhật Minh",
      "Website phòng khám nha khoa Lan Anh",
      "Website trung tâm nha khoa Đại Nam",
      "Website hệ thống nha khoa Smile Dental"
    ],
    "sourceType": "URL",
    "sourceName": "https://www.dudisoftware.com/projects",
    "content": "DANH SÁCH DỰ ÁN DUDI SOFTWARE THỰC HIỆN TRONG LĨNH VỰC NHA KHOA (10 Dự án):\n\n1. Dự án Nha khoa Nhân Tâm:\n- URL / Link: https://nhakhoanhantam.com/\n- Mô tả chi tiết: Website nha khoa cung cấp thông tin dịch vụ chăm sóc răng miệng, thẩm mỹ nha khoa và hỗ trợ khách hàng tư vấn, đặt lịch.\n\n2. Dự án Nha khoa Đất Việt:\n- URL / Link: https://nhakhoadatviet.com/\n- Mô tả chi tiết: Website nha khoa cung cấp thông tin dịch vụ chăm sóc răng miệng, thẩm mỹ nha khoa và hỗ trợ khách hàng tư vấn, đặt lịch.\n\n3. Dự án Nha khoa MedDental:\n- URL / Link: https://meddental.vn/\n- Mô tả chi tiết: Website thuộc hệ thống Medlatec, cung cấp dịch vụ nha khoa như trồng răng, niềng răng, bọc sứ và chăm sóc răng miệng, hỗ trợ đặt lịch khám và tư vấn trực tuyến.\n\n4. Dự án Nha Khoa Kim:\n- URL / Link: https://nhakhoakim.com/\n- Mô tả chi tiết: Website thuộc hệ thống nha khoa quy mô lớn tại Việt Nam, cung cấp dịch vụ khám và điều trị răng miệng như niềng răng, trồng răng implant, bọc răng sứ và chăm sóc nha khoa tổng quát.\n\n5. Dự án Nha Khoa Việt Nga:\n- URL / Link: https://nhakhoavietnga.vn/\n- Mô tả chi tiết: Giới thiệu các dịch vụ chăm sóc răng miệng chất lượng cao như trồng răng Implant, niềng răng, răng sứ thẩm mỹ, đồng thời cung cấp bảng giá công khai và hỗ trợ khách hàng đặt lịch hẹn trước trực tuyến.\n\n6. Dự án Nha khoa 68:\n- URL / Link: https://nhakhoa68.vn/\n- Mô tả chi tiết: Cung cấp dịch vụ khám, điều trị nha khoa, niềng răng, implant và chăm sóc sức khỏe răng miệng.\n\n7. Dự án Nha Khoa Nhật Minh:\n- URL / Link: https://www.nhakhoanhatminh.com.vn/\n- Mô tả chi tiết: Chuyên về điều trị, phục hình và thẩm mỹ răng hàm mặt với các chi nhánh tại TP.HCM và miền Tây (Tiền Giang, Bến Tre). Website cung cấp thông tin chi tiết về đội ngũ bác sĩ chuyên khoa, các dịch vụ điều trị công nghệ cao, bảng giá niêm yết rõ ràng và cập nhật các chương trình khuyến mãi cho khách hàng.\n\n8. Dự án Website phòng khám nha khoa Lan Anh:\n- URL / Link: https://nhakhoalananh.com/\n- Mô tả chi tiết: Website giới thiệu nha khoa chuyên sâu răng sứ và implant, cung cấp thông tin bác sĩ, công nghệ điều trị và hỗ trợ tư vấn, đặt lịch khám.\n\n9. Dự án Website trung tâm nha khoa Đại Nam:\n- URL / Link: https://www.trungtamnhakhoadainam.com/nha-khoa-dai-nam?=tukhoa&vitri=&thietbi=c&mang=g&doisanh=p&diali=9198864&gad_source=1&gad_campaignid=23508326338&gbraid=0AAAAADQ1ufHES_v2HaPT6KervxC3ViwWB&gclid=CjwKCAjw7vzOBhBxEiwAc7WNr16hRJ5JLo9ntgPRyu74UIVVFPb9RosU7rArpFxyh3D1fAz-B2YGAhoCZzgQAvD_BwE\n- Mô tả chi tiết: Website tập trung xây dựng hình ảnh nha khoa uy tín lâu năm, giới thiệu đội ngũ bác sĩ, quy trình điều trị và tích hợp đặt lịch hẹn trực tuyến.\n\n10. Dự án Website hệ thống nha khoa Smile Dental:\n- URL / Link: https://nhakhoasmile.vn/\n- Mô tả chi tiết: Website giới thiệu hệ thống nha khoa thẩm mỹ, nhấn mạnh chất lượng dịch vụ, trải nghiệm khách hàng và hỗ trợ tư vấn, đặt lịch khám trực tuyến."
  },
  {
    "title": "Kho Dự Án Tiêu Biểu Lĩnh Vực Nhà hàng & Tiệc cưới Của DUDI SOFTWARE",
    "category": "Kho Dự Án - Nhà hàng & Tiệc cưới",
    "tags": [
      "dự án",
      "nhà hàng & tiệc cưới",
      "Website PasGo",
      "Website Nhà Hàng Nắng",
      "Website Nhà Hàng Bê Vàng",
      "Website Glorious",
      "Website Metropole",
      "Website Tiệc Cưới Phú Nhuận",
      "Website Nhà hàng & Ẩm thực Côn Sơn",
      "Website Nhà hàng Ý Cao cấp Truffle & Co",
      "Website Nhà hàng Ẩm thực Việt – Ngon Garden",
      "Website Dudi Restaurant"
    ],
    "sourceType": "URL",
    "sourceName": "https://www.dudisoftware.com/projects",
    "content": "DANH SÁCH DỰ ÁN DUDI SOFTWARE THỰC HIỆN TRONG LĨNH VỰC NHÀ HÀNG & TIỆC CƯỚI (12 Dự án):\n\n1. Dự án Website PasGo:\n- URL / Link: https://pasgo.vn/ho-chi-minh\n- Mô tả chi tiết: Tìm kiếm và đặt bàn nhà hàng nhanh chóng.\n\n2. Dự án Website Nhà Hàng Nắng:\n- URL / Link: https://nhahangnang.com/\n- Mô tả chi tiết: Giới thiệu nhà hàng và thực đơn.\n\n3. Dự án Website Nhà Hàng Bê Vàng:\n- URL / Link: https://nhahangbevang.com/\n- Mô tả chi tiết: Giới thiệu nhà hàng và thực đơn.\n\n4. Dự án Website Glorious:\n- URL / Link: https://www.glorious.vn/\n- Mô tả chi tiết: Giới thiệu và bán sản phẩm thời trang.\n\n5. Dự án Website Metropole:\n- URL / Link: https://metropole.com.vn/uu-dai/khai-xuan-thinh-vuong-but-pha-thanh-cong-gala-doanh-nghiep-chi-tu-358000-vndkhach?utm_source=Search&utm_campaign=Gala-doanh-nghiep&utm_medium=CPC&utm_term=uu-dai&utm_content=sitelink&gad_source=1&gad_campaignid=23631108207&gbraid=0AAAAADg0dgoabnAoUdPqG7L7w0ZNfRKAf&gclid=Cj0KCQjw77bPBhC_ARIsAGAjjV9QLfDZqCSmGOJlp47rE_NyNL079aH6o-UPh6f6kkKdel3zdil8-UoaAvG0EALw_wcB\n- Mô tả chi tiết: Giới thiệu dịch vụ nhà hàng và tổ chức sự kiện, ưu đãi.\n\n6. Dự án Website Tiệc Cưới Phú Nhuận:\n- URL / Link: https://www.tieccuoiphunhuan.com.vn/\n- Mô tả chi tiết: Cung cấp dịch vụ tổ chức tiệc cưới và sự kiện.\n\n7. Dự án Website Nhà hàng & Ẩm thực Côn Sơn:\n- URL / Link: https://restaurant.conson.vn/nhahangconson?gad_source=1&gad_campaignid=20358641490&gbraid=0AAAAApFHJF9-fOTyu7niisImVEP9s9QiU&gclid=Cj0KCQjw77bPBhC_ARIsAGAjjV964CXpKDM7zlS1q7OT9EZTWhDg7ax5fkMz6an2djYoLeAbfSwk-WAaAid0EALw_wcB\n- Mô tả chi tiết: Website giới thiệu nhà hàng, thực đơn và không gian ẩm thực tại Côn Đảo, hỗ trợ khách hàng tham khảo dịch vụ và liên hệ đặt bàn.\n\n8. Dự án Website Nhà hàng Ý Cao cấp Truffle & Co:\n- URL / Link: https://www.truffleco.vn/\n- Mô tả chi tiết: Website giới thiệu nhà hàng Ý cao cấp chuyên về pizza, pasta, steak và món ăn từ truffle, hỗ trợ khách xem menu và đặt bàn trực tuyến.\n\n9. Dự án Website Nhà hàng Ẩm thực Việt – Ngon Garden:\n- URL / Link: http://ngongarden.com/\n- Mô tả chi tiết: Website giới thiệu nhà hàng ẩm thực Việt với thực đơn đa dạng, không gian sân vườn và hỗ trợ khách hàng tham khảo món ăn, dịch vụ và liên hệ đặt bàn.\n\n10. Dự án Website Dudi Restaurant:\n- URL / Link: https://dudi-restaurant.vercel.app/\n- Mô tả chi tiết: Website giới thiệu thực đơn và dịch vụ nhà hàng.\n\n11. Dự án Website Hàng Dương Quán:\n- URL / Link: https://hangduongquan.com/trang-chu.html\n- Mô tả chi tiết: Website giới thiệu nhà hàng và các món ăn phục vụ khách hàng.\n\n12. Dự án Website dịch vụ tiệc cưới Metropole:\n- URL / Link: https://metropole.com.vn/tiec-cuoi\n- Mô tả chi tiết: Website giới thiệu dịch vụ tổ chức tiệc cưới và sự kiện."
  },
  {
    "title": "Kho Dự Án Tiêu Biểu Lĩnh Vực Nội thất & Decord Của DUDI SOFTWARE",
    "category": "Kho Dự Án - Nội thất & Decord",
    "tags": [
      "dự án",
      "nội thất & decord",
      "Website Luxvie",
      "Website JYSK Việt Nam",
      "Website MOHO",
      "Nội thất Deco Việt",
      "Nội thất Hồng Lạc",
      "Thiết kế nội thất Decox",
      "Website EcoCraft",
      "Thiết kế nội thất văn phòng",
      "Website nội thất 256",
      "Website sản phẩm Vicostone"
    ],
    "sourceType": "URL",
    "sourceName": "https://www.dudisoftware.com/projects",
    "content": "DANH SÁCH DỰ ÁN DUDI SOFTWARE THỰC HIỆN TRONG LĨNH VỰC NỘI THẤT & DECORD (10 Dự án):\n\n1. Dự án Website Luxvie:\n- URL / Link: https://luxvie.vn/?srsltid=AfmBOoo8504TJisl6KWr_FjVL4nnxno5xDBbfO_ksbHffgFabMR1GLWE\n- Mô tả chi tiết: Cung cấp và giới thiệu sản phẩm nội thất.\n\n2. Dự án Website JYSK Việt Nam:\n- URL / Link: https://jysk.vn/?srsltid=AfmBOoqoDo8p5mZf_HlwUkJB-AhtJe-XkMgCqrcyEDe3SBabMTL-tXfR\n- Mô tả chi tiết: Bán sản phẩm nội thất và trang trí nhà cửa.\n\n3. Dự án Website MOHO:\n- URL / Link: https://moho.com.vn/?srsltid=AfmBOopVGLEeJhi6VP-c_GqEo8A10ifRJEExiIjagwX1b2TMUN6EWtPz\n- Mô tả chi tiết: Cung cấp và bán sản phẩm nội thất hiện đại.\n\n4. Dự án Nội thất Deco Việt:\n- URL / Link: https://decoviet.com/\n- Mô tả chi tiết: Cung cấp dịch vụ thiết kế, thi công nội thất và phân phối sản phẩm nội thất cho nhà ở, căn hộ, văn phòng.\n\n5. Dự án Nội thất Hồng Lạc:\n- URL / Link: https://honglac.vn/\n- Mô tả chi tiết: Cung cấp dịch vụ thiết kế, thi công nội thất và giải pháp nội thất cho nhà ở, văn phòng, công trình.\n\n6. Dự án Thiết kế nội thất Decox:\n- URL / Link: https://decoxdesign.com/\n- Mô tả chi tiết: Cung cấp dịch vụ thiết kế, thi công nội thất và giải pháp không gian sống cho nhà ở, biệt thự, căn hộ.\n\n7. Dự án Website EcoCraft:\n- URL / Link: https://ecocraft.vn/\n- Mô tả chi tiết: Website bán sản phẩm thủ công từ tre, mây dùng cho trang trí và gia dụng.\n\n8. Dự án Thiết kế nội thất văn phòng:\n- URL / Link: https://fedic.vn/office-interior/?gad_source=1&gad_campaignid=23630539849&gbraid=0AAAABCfTLUkbnIN6lNdXJ3Dbk1ByWuihL&gclid=CjwKCAjw7vzOBhBxEiwAc7WNr2j6TUgseYyIiHXuvCmQLnTkxetbMftlIB8X5KoMcb1yRv0LX9oZJxoC5CEQAvD_BwE\n- Mô tả chi tiết: Website giới thiệu dịch vụ thiết kế và thi công nội thất văn phòng.\n\n9. Dự án Website nội thất 256:\n- URL / Link: https://noithat256.com/\n- Mô tả chi tiết: Website giới thiệu và cung cấp sản phẩm, dịch vụ nội thất.\n\n10. Dự án Website sản phẩm Vicostone:\n- URL / Link: https://vicostone.com/vi-vn/product\n- Mô tả chi tiết: Website giới thiệu sản phẩm đá thạch anh và vật liệu xây dựng cao cấp."
  },
  {
    "title": "Kho Dự Án Tiêu Biểu Lĩnh Vực Portfolio Của DUDI SOFTWARE",
    "category": "Kho Dự Án - Portfolio",
    "tags": [
      "dự án",
      "portfolio",
      "Website Portfolio Backend Developer",
      "Website Portfolio Fullstack Developer",
      "Nền tảng Tuyển dụng & Kết nối Freelancer",
      "Phát triển website JAMstack Vietnam",
      "Agency sáng tạo Beau",
      "DUDI Software Corporate Website",
      "Website Designer Việt",
      "Nupakachi Wedding – Dịch vụ chụp ảnh và quay phim cưới",
      "HNAG Nurt Me – Portfolio Developer",
      "Huyen Chip – Personal Blog"
    ],
    "sourceType": "URL",
    "sourceName": "https://www.dudisoftware.com/projects",
    "content": "DANH SÁCH DỰ ÁN DUDI SOFTWARE THỰC HIỆN TRONG LĨNH VỰC PORTFOLIO (10 Dự án):\n\n1. Dự án Website Portfolio Backend Developer:\n- URL / Link: https://buiquanghieu.com/\n- Mô tả chi tiết: Website portfolio cá nhân kết hợp blog công nghệ, chia sẻ kiến thức lập trình và hệ thống.\n\n2. Dự án Website Portfolio Fullstack Developer:\n- URL / Link: https://www.hoangpham.dev/\n- Mô tả chi tiết: Website portfolio cá nhân của lập trình viên freelance, giới thiệu kinh nghiệm, kỹ năng Fullstack và chia sẻ các bài viết chuyên môn về lập trình và hệ thống.\n\n3. Dự án Nền tảng Tuyển dụng & Kết nối Freelancer:\n- URL / Link: https://freelancerviet.vn/\n- Mô tả chi tiết: Website nền tảng kết nối doanh nghiệp với nhân sự freelance và full-time, hỗ trợ đăng tuyển, tìm kiếm và tuyển dụng nhanh chóng.\n\n4. Dự án Phát triển website JAMstack Vietnam:\n- URL / Link: https://jamstackvietnam.com/\n- Mô tả chi tiết: Cung cấp dịch vụ thiết kế website, phát triển phần mềm và giải pháp số cho doanh nghiệp.\n\n5. Dự án Agency sáng tạo Beau:\n- URL / Link: https://beau.vn/vi\n- Mô tả chi tiết: Cung cấp dịch vụ thiết kế website, branding, UI/UX và phát triển trải nghiệm số cho doanh nghiệp.\n\n6. Dự án DUDI Software Corporate Website:\n- URL / Link: https://dudisoftware.com/\n- Mô tả chi tiết: Website chính thức của DUDI Software – doanh nghiệp hoạt động trong lĩnh vực phát triển phần mềm, thiết kế website, landing page, ứng dụng mobile và hệ thống quản trị doanh nghiệp tại Việt Nam. Website giới thiệu các dịch vụ thiết kế website doanh nghiệp, website bán hàng, booking platform, phần mềm quản lý, UI/UX design, SEO và chuyển đổi số cho doanh nghiệp. Giao diện website hiện đại, tập trung vào trải nghiệm người dùng, hình ảnh dự án thực tế và giải pháp công nghệ dành cho nhiều ngành nghề khác nhau.\n\n7. Dự án Website Designer Việt:\n- URL / Link: https://designerviet.com/\n- Mô tả chi tiết: Website cung cấp bài viết hướng dẫn, chia sẻ tài nguyên thiết kế và tổng hợp sản phẩm sáng tạo cho designer.\n\n8. Dự án Nupakachi Wedding – Dịch vụ chụp ảnh và quay phim cưới:\n- URL / Link: https://nupakachi.com/\n- Mô tả chi tiết: Website giới thiệu dịch vụ chụp ảnh, quay phim cưới và trưng bày các bộ ảnh, video đã thực hiện.\n\n9. Dự án HNAG Nurt Me – Portfolio Developer:\n- URL / Link: https://hnagnurtme.id.vn/\n- Mô tả chi tiết: Website giới thiệu thông tin cá nhân, kỹ năng và các dự án đã thực hiện của lập trình viên.\n\n10. Dự án Huyen Chip – Personal Blog:\n- URL / Link: https://huyenchip.com/\n- Mô tả chi tiết: Website cá nhân chia sẻ kiến thức về lập trình, khoa học dữ liệu, cùng kinh nghiệm học tập và làm việc trong lĩnh vực công nghệ."
  },
  {
    "title": "Kho Dự Án Tiêu Biểu Lĩnh Vực Thể thao & Yoga Của DUDI SOFTWARE",
    "category": "Kho Dự Án - Thể thao & Yoga",
    "tags": [
      "dự án",
      "thể thao & yoga",
      "Website EO Sport",
      "Website World Gym",
      "Bán sản phẩm và dụng cụ thể thao.",
      "Soul Yoga Saigon",
      "Eve Yoga",
      "Siêu Thị Dụng Cụ Thể Thao",
      "Starfit Fitness & Yoga",
      "Omi Yoga",
      "SportPro",
      "Website Dudi Yoga"
    ],
    "sourceType": "URL",
    "sourceName": "https://www.dudisoftware.com/projects",
    "content": "DANH SÁCH DỰ ÁN DUDI SOFTWARE THỰC HIỆN TRONG LĨNH VỰC THỂ THAO & YOGA (11 Dự án):\n\n1. Dự án Website EO Sport:\n- URL / Link: https://eosport.vn/\n- Mô tả chi tiết: Bán sản phẩm và phụ kiện thể thao.\n\n2. Dự án Website World Gym:\n- URL / Link: https://www.worldgymtaiwan.com/vi/aerobics-class/static-stretching/wellness-fitness/yogalates\n- Mô tả chi tiết: Giới thiệu lớp tập gym, yoga và dịch vụ fitness.\n\n3. Dự án Bán sản phẩm và dụng cụ thể thao.:\n- URL / Link: https://sport1.vn/?srsltid=AfmBOoq2SaHBSQmTL_mB88WOkjITcWltjNdHqQxIhIEuKjuSEp28MVsJ\n- Mô tả chi tiết: Bán sản phẩm và dụng cụ thể thao.\n\n4. Dự án Soul Yoga Saigon:\n- URL / Link: https://soulyogasaigon.com/\n- Mô tả chi tiết: Website giới thiệu trung tâm yoga, các lớp học và khóa đào tạo huấn luyện viên, hỗ trợ đặt lịch tập và cập nhật workshop yoga.\n\n5. Dự án Eve Yoga:\n- URL / Link: https://www.eve-yoga.com/\n- Mô tả chi tiết: Website giới thiệu các lớp yoga, khóa học và hoạt động chăm sóc sức khỏe, hỗ trợ đăng ký tập luyện và theo dõi lịch học online.\n\n6. Dự án Siêu Thị Dụng Cụ Thể Thao:\n- URL / Link: https://www.sieuthidungcuthethao.com/\n- Mô tả chi tiết: Website chuyên cung cấp dụng cụ thể thao, gym, yoga và phụ kiện tập luyện, hỗ trợ mua sắm online với nhiều sản phẩm như thảm yoga, tạ tay, ghế tập gym và phụ kiện thể thao.\n\n7. Dự án Starfit Fitness & Yoga:\n- URL / Link: https://starfit.vn/\n- Mô tả chi tiết: Website giới thiệu hệ thống phòng tập gym và yoga, cung cấp thông tin lớp học, dịch vụ tập luyện và hỗ trợ đăng ký hội viên online.\n\n8. Dự án Omi Yoga:\n- URL / Link: https://omiyoga.vn/\n- Mô tả chi tiết: Website cung cấp các khóa học yoga online, lớp học trực tuyến và đào tạo huấn luyện viên yoga, hỗ trợ đăng ký học và luyện tập tại nhà.\n\n9. Dự án SportPro:\n- URL / Link: https://sportpro.vn/\n- Mô tả chi tiết: Website chuyên cung cấp thiết bị và dụng cụ thể thao như máy tập gym, phụ kiện fitness và thiết bị luyện tập tại nhà, hỗ trợ mua sắm online tiện lợi.\n\n10. Dự án Website Dudi Yoga:\n- URL / Link: https://dudi-yoga.vercel.app/\n- Mô tả chi tiết: Website giới thiệu dịch vụ và lớp học yoga\n\n11. Dự án Website Elipsport – Máy chạy bộ:\n- URL / Link: https://elipsport.vn/may-chay-bo/\n- Mô tả chi tiết: Trang bán sản phẩm máy chạy bộ trực tuyến, cung cấp thông tin chi tiết, giá bán và hỗ trợ đặt hàng cho khách hàng."
  },
  {
    "title": "Kho Dự Án Tiêu Biểu Lĩnh Vực F&B Của DUDI SOFTWARE",
    "category": "Kho Dự Án - F&B",
    "tags": [
      "dự án",
      "f&b",
      "Website Ẩm Thực Quê Nhà",
      "Website Thương hiệu Chuỗi Cà phê Cộng",
      "Saigon Ơi Cafe Website",
      "GUTA Cafe Website",
      "WeGo Coffee Website",
      "Building Coffee Website",
      "Chidori",
      "Quán Nhậu Tự Do",
      "Ba Gác",
      "Website Hot Beans Coffee"
    ],
    "sourceType": "URL",
    "sourceName": "https://www.dudisoftware.com/projects",
    "content": "DANH SÁCH DỰ ÁN DUDI SOFTWARE THỰC HIỆN TRONG LĨNH VỰC F&B (12 Dự án):\n\n1. Dự án Website Ẩm Thực Quê Nhà:\n- URL / Link: https://amthucquenha.vn/\n- Mô tả chi tiết: Giới thiệu món ăn và dịch vụ ẩm thực.\n\n2. Dự án Website Thương hiệu Chuỗi Cà phê Cộng:\n- URL / Link: https://congcaphe.com/\n- Mô tả chi tiết: Website giới thiệu thương hiệu chuỗi cà phê Cộng, cung cấp thông tin về menu, không gian, câu chuyện thương hiệu và hệ thống cửa hàng.\n\n3. Dự án Saigon Ơi Cafe Website:\n- URL / Link: https://saigonoicafe.com/\n- Mô tả chi tiết: Website giới thiệu Saigon Ơi Cafe, cung cấp thông tin về menu, không gian quán và hệ thống chi nhánh.\n\n4. Dự án GUTA Cafe Website:\n- URL / Link: https://gutacafe.com/\n- Mô tả chi tiết: Website giới thiệu GUTA Cafe, cung cấp thông tin thương hiệu, menu, hệ thống cửa hàng và hoạt động kinh doanh.\n\n5. Dự án WeGo Coffee Website:\n- URL / Link: https://wegocoffee.com/\n- Mô tả chi tiết: Website giới thiệu WeGo Coffee, cung cấp thông tin menu, không gian quán và hệ thống cửa hàng.\n\n6. Dự án Building Coffee Website:\n- URL / Link: https://building.coffee/\n- Mô tả chi tiết: Website giới thiệu Building Coffee, cung cấp thông tin về menu, không gian quán và trải nghiệm khách hàng.\n\n7. Dự án Chidori:\n- URL / Link: https://chidori.vn/\n- Mô tả chi tiết: Website giới thiệu Chidori, cung cấp thông tin về không gian, menu và hệ thống cửa hàng.\n\n8. Dự án Quán Nhậu Tự Do:\n- URL / Link: https://quannhautudo.com/\n- Mô tả chi tiết: Website giới thiệu Quán Nhậu Tự Do, cung cấp thông tin menu, không gian quán và hệ thống chi nhánh.\n\n9. Dự án Ba Gác:\n- URL / Link: https://www.bagac.vn/\n- Mô tả chi tiết: Website giới thiệu chuỗi nhà hàng Ba Gác, cung cấp thông tin về thực đơn nướng đặc sắc, các loại bia tươi và hệ thống chi nhánh với không gian mở thoáng đãng tại TP.HCM.\n\n10. Dự án Website Hot Beans Coffee:\n- URL / Link: https://www.hotbeans.coffee/\n- Mô tả chi tiết: Website giới thiệu thương hiệu và sản phẩm cà phê.\n\n11. Dự án Website tập đoàn Nestlé:\n- URL / Link: https://www.nestle.com/\n- Mô tả chi tiết: Website giới thiệu tập đoàn và các sản phẩm thực phẩm, đồ uống.\n\n12. Dự án La Maison – Website ẩm thực / nhà hàng:\n- URL / Link: https://lamaison.vn/\n- Mô tả chi tiết: Website giới thiệu nhà hàng La Maison với thực đơn, không gian và dịch vụ, giúp khách hàng tìm hiểu và trải nghiệm ẩm thực một cách trực quan."
  },
  {
    "title": "Kho Dự Án Tiêu Biểu Lĩnh Vực Booking Của DUDI SOFTWARE",
    "category": "Kho Dự Án - Booking",
    "tags": [
      "dự án",
      "booking",
      "Bamboo Airways Website",
      "Website đặt homestay Booking.com",
      "Website đặt phòng Go2Joy",
      "Website Justfly",
      "Website nền tảng MyKOL",
      "Revu Việt Nam – Nền tảng Influencer Marketing",
      "Website nền tảng Onfluencer",
      "Website TicketGo",
      "Website du lịch Đà Lạt",
      "Website đặt khách sạn"
    ],
    "sourceType": "URL",
    "sourceName": "https://www.dudisoftware.com/projects",
    "content": "DANH SÁCH DỰ ÁN DUDI SOFTWARE THỰC HIỆN TRONG LĨNH VỰC BOOKING (11 Dự án):\n\n1. Dự án Bamboo Airways Website:\n- URL / Link: https://www.bambooairways.com/vn/vi\n- Mô tả chi tiết: Website chính thức của Bamboo Airways, cung cấp thông tin chuyến bay, đặt vé trực tuyến và các dịch vụ hàng không.\n\n2. Dự án Website đặt homestay Booking.com:\n- URL / Link: https://www.booking.com/homestay/city/vn/ho-chi-minh-city.vi.html\n- Mô tả chi tiết: Website đặt homestay và lưu trú trực tuyến.\n\n3. Dự án Website đặt phòng Go2Joy:\n- URL / Link: https://go2joy.vn/vi-vn\n- Mô tả chi tiết: Website đặt khách sạn và lưu trú theo giờ/trực tuyến.\n\n4. Dự án Website Justfly:\n- URL / Link: https://justfly.vn/\n- Mô tả chi tiết: Website đặt vé máy bay và dịch vụ du lịch trực tuyến.\n\n5. Dự án Website nền tảng MyKOL:\n- URL / Link: https://mykol.vn/\n- Mô tả chi tiết: Website nền tảng MyKOL\n\n6. Dự án Revu Việt Nam – Nền tảng Influencer Marketing:\n- URL / Link: https://vn.revu.net/\n- Mô tả chi tiết: Website kết nối doanh nghiệp với KOL/Influencer, hỗ trợ triển khai chiến dịch marketing, quản lý nội dung và đo lường hiệu quả quảng bá.\n\n7. Dự án Website nền tảng Onfluencer:\n- URL / Link: https://onfluencer.net/\n- Mô tả chi tiết: Website kết nối thương hiệu với KOL/KOC và quản lý chiến dịch marketing.\n\n8. Dự án Website TicketGo:\n- URL / Link: https://www.ticketgo.vn/\n- Mô tả chi tiết: Nền tảng bán vé sự kiện trực tuyến, cung cấp thông tin chương trình và hỗ trợ đặt vé nhanh chóng cho người dùng.\n\n9. Dự án Website du lịch Đà Lạt:\n- URL / Link: https://www.vietnambooking.com/du-lich/blog-du-lich/gioi-thieu-du-lich-da-lat.html\n- Mô tả chi tiết: Cung cấp thông tin địa điểm, ẩm thực và kinh nghiệm du lịch Đà Lạt.\n\n10. Dự án Website đặt khách sạn:\n- URL / Link: https://vn.trip.com/hotels/\n- Mô tả chi tiết: Tìm kiếm và đặt phòng khách sạn nhanh chóng, tiện lợi.\n\n11. Dự án Website đặt phòng Chudu24:\n- URL / Link: https://www.chudu24.com/?pt_source=adwords&pt_campaign=&pt_adgroupid=180083816536&pt_device=c&pt_devicemodel=&gad_source=1&gad_campaignid=22565718466&gbraid=0AAAAA-5bG0VgaPvTQIpQMGgcQYRoG8Rw4&gclid=Cj0KCQjw77bPBhC_ARIsAGAjjV8j5Vjs-dpPsp-1pUYvNr-3yFq3rkulCr9-zEYoW_Wh2W-jEBL3sq0aAohvEALw_wcB\n- Mô tả chi tiết: Đặt phòng khách sạn và resort với nhiều lựa chọn, giá ưu đãi."
  },
  {
    "title": "Kho Dự Án Tiêu Biểu Lĩnh Vực Bán hàng đa kênh Của DUDI SOFTWARE",
    "category": "Kho Dự Án - Bán hàng đa kênh",
    "tags": [
      "dự án",
      "bán hàng đa kênh",
      "Shopify Website",
      "Phần mềm quản lý bán hàng UPOS",
      "Quản lý bán hàng Abitmes",
      "Quản lý bán hàng Tendoo",
      "Quản lý bán hàng Pancake",
      "Quản lý mạng xã hội SO9",
      "Thiết kế website Web30s",
      "Quản lý bán hàng TPOS",
      "Website nền tảng Haravan",
      "Website bán hàng đa kênh MISA eShop"
    ],
    "sourceType": "URL",
    "sourceName": "https://www.dudisoftware.com/projects",
    "content": "DANH SÁCH DỰ ÁN DUDI SOFTWARE THỰC HIỆN TRONG LĨNH VỰC BÁN HÀNG ĐA KÊNH (10 Dự án):\n\n1. Dự án Shopify Website:\n- URL / Link: https://www.shopify.com/vn\n- Mô tả chi tiết: Website cung cấp nền tảng tạo và quản lý cửa hàng trực tuyến, hỗ trợ doanh nghiệp bán hàng và vận hành thương mại điện tử.\n\n2. Dự án Phần mềm quản lý bán hàng UPOS:\n- URL / Link: https://upos.vn/\n- Mô tả chi tiết: Bán hàng đa kênh\n\n3. Dự án Quản lý bán hàng Abitmes:\n- URL / Link: https://abitmes.vn/vi-VN\n- Mô tả chi tiết: Nền tảng quản lý chat đa kênh, đơn hàng và chăm sóc khách hàng tập trung.\n\n4. Dự án Quản lý bán hàng Tendoo:\n- URL / Link: https://tendoo.vn/\n- Mô tả chi tiết: Nền tảng quản lý bán hàng đa kênh, hỗ trợ đơn hàng, kho hàng, thanh toán và báo cáo kinh doanh.\n\n5. Dự án Quản lý bán hàng Pancake:\n- URL / Link: https://pos.pancake.vn/\n- Mô tả chi tiết: Giải pháp quản lý bán hàng đa kênh, hỗ trợ đơn hàng, kho hàng, chat khách hàng và báo cáo kinh doanh.\n\n6. Dự án Quản lý mạng xã hội SO9:\n- URL / Link: https://so9.vn/pricing\n- Mô tả chi tiết: Nền tảng quản lý nội dung, khách hàng và tương tác đa kênh cho doanh nghiệp.\n\n7. Dự án Thiết kế website Web30s:\n- URL / Link: https://www.web30s.vn/\n- Mô tả chi tiết: Giải pháp tạo website nhanh với nhiều mẫu giao diện, hỗ trợ bán hàng và quản lý doanh nghiệp.\n\n8. Dự án Quản lý bán hàng TPOS:\n- URL / Link: https://tpos.vn/\n- Mô tả chi tiết: Giải pháp quản lý bán hàng cho cửa hàng, hỗ trợ đơn hàng, kho hàng, thanh toán và báo cáo kinh doanh.\n\n9. Dự án Website nền tảng Haravan:\n- URL / Link: https://www.haravan.com/\n- Mô tả chi tiết: Website cung cấp nền tảng quản lý và bán hàng đa kênh cho doanh nghiệp.\n\n10. Dự án Website bán hàng đa kênh MISA eShop:\n- URL / Link: https://www.misaeshop.vn/ban-hang-da-kenh/\n- Mô tả chi tiết: Website cung cấp giải pháp quản lý và bán hàng đa kênh cho doanh nghiệp."
  },
  {
    "title": "Kho Dự Án Tiêu Biểu Lĩnh Vực Giặt ủi Của DUDI SOFTWARE",
    "category": "Kho Dự Án - Giặt ủi",
    "tags": [
      "dự án",
      "giặt ủi",
      "Giặt Sấy Thông Minh Website",
      "HT Laundry",
      "Website dịch vụ giặt là Thu Hương",
      "Dịch vụ giặt sấy CozyWash",
      "Dịch vụ giặt sấy Wash In Town",
      "Dịch vụ giặt sấy Tik Tak 247",
      "EcoWash HCMC Industrial Laundry Website",
      "Flash Laundry Industrial Laundry Website",
      "Giặt Ủi Đà Lạt Website",
      "Wash Clean Laundry Website"
    ],
    "sourceType": "URL",
    "sourceName": "https://www.dudisoftware.com/projects",
    "content": "DANH SÁCH DỰ ÁN DUDI SOFTWARE THỰC HIỆN TRONG LĨNH VỰC GIẶT ỦI (10 Dự án):\n\n1. Dự án Giặt Sấy Thông Minh Website:\n- URL / Link: https://giatsaythongminh.vn/\n- Mô tả chi tiết: Website giới thiệu dịch vụ giặt sấy, cung cấp thông tin dịch vụ, bảng giá và hỗ trợ khách hàng đặt lịch.\n\n2. Dự án HT Laundry:\n- URL / Link: https://htlaundry.com/\n- Mô tả chi tiết: Website giới thiệu dịch vụ giặt sấy, giặt hấp và vệ sinh quần áo cao cấp, hỗ trợ đặt dịch vụ và giao nhận tận nơi nhanh chóng.\n\n3. Dự án Website dịch vụ giặt là Thu Hương:\n- URL / Link: https://www.giatlathuhuong.vn/\n- Mô tả chi tiết: Website giới thiệu dịch vụ giặt ủi, giặt là công nghiệp và xử lý vải chuyên nghiệp cho cá nhân, khách sạn, nhà hàng và doanh nghiệp.\n\n4. Dự án Dịch vụ giặt sấy CozyWash:\n- URL / Link: https://www.cozywash.vn/\n- Mô tả chi tiết: Cung cấp dịch vụ giặt sấy, giặt hấp và giao nhận tận nơi tiện lợi.\n\n5. Dự án Dịch vụ giặt sấy Wash In Town:\n- URL / Link: https://washintown.vn/\n- Mô tả chi tiết: Cung cấp dịch vụ giặt sấy, giặt hấp và giao nhận tận nơi nhanh chóng, tiện lợi.\n\n6. Dự án Dịch vụ giặt sấy Tik Tak 247:\n- URL / Link: https://giatsaytiktak247.com/\n- Mô tả chi tiết: Cung cấp dịch vụ giặt sấy, giặt hấp và giao nhận tận nơi nhanh chóng, tiện lợi.\n\n7. Dự án EcoWash HCMC Industrial Laundry Website:\n- URL / Link: https://www.ecowash.net.vn/\n- Mô tả chi tiết: Website chính thức của EcoWash HCMC – doanh nghiệp cung cấp giải pháp giặt ủi công nghiệp và cung ứng hàng vải cho khách sạn, resort, nhà hàng, spa và doanh nghiệp tại Việt Nam. Website giới thiệu hệ thống nhà máy giặt công nghiệp hiện đại tại KCN Hiệp Phước, TP.HCM với công suất lên đến 53 tấn/ngày, ứng dụng công nghệ giặt đường hầm, quy trình vận hành 4.0 và hóa chất thân thiện môi trường từ Ecolab. Ngoài dịch vụ giặt ủi, EcoWash còn cung cấp giải pháp cho thuê hàng vải, giặt nhanh, giặt đồng phục và logistics chuyên nghiệp cho doanh nghiệp.\n\n8. Dự án Flash Laundry Industrial Laundry Website:\n- URL / Link: https://www.flashlaundry.vn/\n- Mô tả chi tiết: Website chính thức của Flash Laundry – đơn vị cung cấp dịch vụ giặt ủi công nghiệp tại TP.HCM dành cho khách sạn, spa, nhà hàng, gym, trường học và doanh nghiệp. Website giới thiệu các dịch vụ như giặt khăn spa, giặt khăn khách sạn, giặt đồng phục, giặt công nghiệp và tẩy trắng chuyên sâu. Flash Laundry vận hành theo mô hình giặt công nghiệp với hệ thống máy móc hiện đại, quy trình tiêu chuẩn và dịch vụ giao nhận tận nơi cho doanh nghiệp.\n\n9. Dự án Giặt Ủi Đà Lạt Website:\n- URL / Link: Giặt Ủi Đà Lạt Website\n- Mô tả chi tiết: Website chính thức của Giặt Ủi Đà Lạt – đơn vị cung cấp dịch vụ giặt ủi dân dụng và công nghiệp tại Đà Lạt. Website giới thiệu các dịch vụ như giặt sấy quần áo, giặt chăn ga gối nệm, giặt rèm cửa, giặt sofa, giặt thú bông và giặt đồ khách sạn – homestay. Giao diện website tập trung vào trải nghiệm đặt dịch vụ nhanh, thông tin rõ ràng và hỗ trợ khách hàng cá nhân lẫn doanh nghiệp lưu trú tại Đà Lạt.\n\n10. Dự án Wash Clean Laundry Website:\n- URL / Link: https://washclean.vn/\n- Mô tả chi tiết: Website chính thức của Wash Clean – doanh nghiệp cung cấp dịch vụ giặt ủi công nghiệp và vệ sinh chuyên nghiệp cho khách sạn, spa, nhà hàng, homestay và doanh nghiệp tại Việt Nam. Website giới thiệu các dịch vụ giặt sấy, giặt khăn – drap – đồng phục, vệ sinh công nghiệp và quy trình vận hành hiện đại nhằm đảm bảo chất lượng, vệ sinh và tối ưu chi phí cho khách hàng doanh nghiệp. Giao diện website tập trung vào trải nghiệm dịch vụ, thông tin rõ ràng và hỗ trợ liên hệ nhanh."
  },
  {
    "title": "Kho Dự Án Tiêu Biểu Lĩnh Vực Media studio Của DUDI SOFTWARE",
    "category": "Kho Dự Án - Media studio",
    "tags": [
      "dự án",
      "media studio",
      "Website Light Studio",
      "Website ATLN Production",
      "Website MAKI Studio",
      "Website Chụp Hình Sản Phẩm",
      "Website Cộng Studio",
      "Website Colory Animation Studio",
      "Mango Media Studio Website",
      "WeddingBook Vietnam Website",
      "Đẹpp Studio Wedding Website",
      "Kami Anna Studio Website"
    ],
    "sourceType": "URL",
    "sourceName": "https://www.dudisoftware.com/projects",
    "content": "DANH SÁCH DỰ ÁN DUDI SOFTWARE THỰC HIỆN TRONG LĨNH VỰC MEDIA STUDIO (11 Dự án):\n\n1. Dự án Website Light Studio:\n- URL / Link: https://www.lightproduction.vn/projectclient\n- Mô tả chi tiết: Website dùng để giới thiệu dịch vụ chụp ảnh sản phẩm, đặc biệt trong lĩnh vực mỹ phẩm và thương hiệu. Website hiển thị các dự án đã thực hiện theo từng concept như beauty, skincare, branding, giúp khách hàng dễ dàng tham khảo phong cách hình ảnh, lựa chọn concept phù hợp và liên hệ đặt dịch vụ.\n\n2. Dự án Website ATLN Production:\n- URL / Link: https://atinproduction.com/\n- Mô tả chi tiết: Website dùng để giới thiệu dịch vụ chụp ảnh và quay video cho cá nhân và doanh nghiệp, bao gồm ảnh chân dung, sự kiện, sản phẩm và truyền thông thương hiệu. Website hiển thị portfolio các dự án đã thực hiện theo nhiều lĩnh vực, cung cấp thông tin dịch vụ, quy trình làm việc và hỗ trợ khách hàng liên hệ hoặc yêu cầu tư vấn.\n\n3. Dự án Website MAKI Studio:\n- URL / Link: https://www.maki.vn/new\n- Mô tả chi tiết: Website dùng để giới thiệu dịch vụ chụp ảnh sản phẩm quảng cáo và xây dựng hình ảnh thương hiệu. Website hiển thị portfolio các dự án theo từng concept sáng tạo, giúp khách hàng tham khảo phong cách hình ảnh và lựa chọn dịch vụ phù hợp.\n\n4. Dự án Website Chụp Hình Sản Phẩm:\n- URL / Link: https://www.chuphinhsanpham.com/\n- Mô tả chi tiết: Website dùng để cung cấp dịch vụ chụp hình sản phẩm cho nhiều lĩnh vực như quảng cáo, ẩm thực và thương mại. Ngoài ra, website còn cung cấp dịch vụ thiết kế đồ họa và in ấn như menu, brochure, catalogue.\n\n5. Dự án Website Cộng Studio:\n- URL / Link: https://congstudio.vn/\n- Mô tả chi tiết: Website cung cấp dịch vụ chụp ảnh kỷ yếu, chụp ảnh áo dài, chụp ảnh cá nhân, chụp ảnh hồ sơ và cho thuê studio. Ngoài ra, website còn giới thiệu dịch vụ thuê trang phục như áo dài, áo vest, áo cử nhân và phụ kiện chụp ảnh.\n\n6. Dự án Website Colory Animation Studio:\n- URL / Link: https://colory.vn/\n- Mô tả chi tiết: Website dùng để giới thiệu studio sản xuất phim hoạt hình 3D, bao gồm các dự án phim, TVC và nội dung animation.\n\n7. Dự án Mango Media Studio Website:\n- URL / Link: https://www.mangomediastudio.net/\n- Mô tả chi tiết: Website chính thức của Mango Media Studio – agency chuyên về social media content, branding, digital marketing và media production. Website giới thiệu các dịch vụ như xây dựng chiến lược thương hiệu, content strategy, social media management, video production, photography, motion graphics và web development. Mango Media Studio tập trung vào storytelling và phát triển nội dung giúp doanh nghiệp xây dựng thương hiệu và tăng kết nối với khách hàng trên nền tảng số.\n\n8. Dự án WeddingBook Vietnam Website:\n- URL / Link: https://www.weddingbook.vn/\n- Mô tả chi tiết: Website chính thức của WeddingBook Việt Nam – nền tảng kết nối dịch vụ cưới hỏi chuyên nghiệp dành cho các cặp đôi. Website cung cấp thông tin về studio chụp ảnh cưới, váy cưới, makeup artist, wedding planner, nhà hàng tiệc cưới và các dịch vụ liên quan đến ngành cưới. Ngoài ra, WeddingBook còn hỗ trợ đặt lịch tư vấn, xem portfolio, bảng giá và xu hướng cưới hiện đại tại Việt Nam. Giao diện website được thiết kế sang trọng, hiện đại và tập trung vào trải nghiệm hình ảnh.\n\n9. Dự án Đẹpp Studio Wedding Website:\n- URL / Link: http://deppstudio.vn/\n- Mô tả chi tiết: Website giới thiệu Đẹpp Studio – studio chuyên chụp ảnh cưới, makeup cô dâu, quay phim cưới và cho thuê váy cưới tại Củ Chi, TP.HCM. Website tập trung vào các dịch vụ pre-wedding, album cưới, chụp ngoại cảnh, phóng sự cưới và tổ chức sự kiện cưới hỏi. Giao diện website theo phong cách lãng mạn, hiện đại, sử dụng nhiều hình ảnh portfolio để tăng trải nghiệm thị giác và thu hút khách hàng cưới.\n\n10. Dự án Kami Anna Studio Website:\n- URL / Link: https://kamiannastudio.com/\n- Mô tả chi tiết: Website chính thức của Kami Anna Studio – studio chuyên chụp ảnh cưới, makeup cô dâu, quay phim cưới và cung cấp các dịch vụ wedding concept hiện đại. Website giới thiệu portfolio ảnh cưới, các concept chụp ngoại cảnh – studio, váy cưới, dịch vụ makeup và tư vấn tổ chức cưới dành cho các cặp đôi. Giao diện website mang phong cách sang trọng, tinh tế, tập trung vào hình ảnh và trải nghiệm thị giác để tăng độ nhận diện thương hiệu trong ngành wedding.\n\n11. Dự án Aloha Media Website:\n- URL / Link: https://alohamedia.vn/\n- Mô tả chi tiết: Website chính thức của Aloha Media – đơn vị truyền thông đa phương tiện chuyên cung cấp dịch vụ chụp ảnh, quay phim, media production và sáng tạo nội dung tại Việt Nam. Website giới thiệu các dịch vụ như chụp ảnh kỷ yếu, ảnh doanh nghiệp, ảnh gia đình, ảnh cưới, quay video, đào tạo nhiếp ảnh và truyền thông thương hiệu. Giao diện website tập trung mạnh vào hình ảnh portfolio, trải nghiệm thị giác và xây dựng nhận diện thương hiệu sáng tạo. Aloha Media có hệ thống studio tại Hà Nội và TP.HCM."
  },
  {
    "title": "Kho Dự Án Tiêu Biểu Lĩnh Vực Điện lạnh Của DUDI SOFTWARE",
    "category": "Kho Dự Án - Điện lạnh",
    "tags": [
      "dự án",
      "điện lạnh",
      "Website Hòa Phát Gia Dụng",
      "Website Điện Máy Gia Phú",
      "Website Vật Tư Điện Lạnh Hoàng Đạt",
      "Website Điện Lạnh Bảo Ngọc",
      "Website Sửa Điện Lạnh Sài Gòn",
      "Siêu thị điện máy MediaMart",
      "Siêu Thị Máy Lạnh",
      "Điện Máy Giá Kho BestMua",
      "Website bán hàng LG Việt Nam.",
      "SUNHOUSE"
    ],
    "sourceType": "URL",
    "sourceName": "https://www.dudisoftware.com/projects",
    "content": "DANH SÁCH DỰ ÁN DUDI SOFTWARE THỰC HIỆN TRONG LĨNH VỰC ĐIỆN LẠNH (10 Dự án):\n\n1. Dự án Website Hòa Phát Gia Dụng:\n- URL / Link: https://dienmay.hoaphat.com.vn/\n- Mô tả chi tiết: Website dùng để giới thiệu và cung cấp các sản phẩm điện gia dụng như nồi áp suất, tủ lạnh, máy lọc nước và thiết bị nhà bếp. Website hiển thị danh mục sản phẩm, thông tin chi tiết, giá bán và hỗ trợ khách hàng tìm kiếm, lựa chọn và mua hàng. Ngoài ra, website còn cung cấp video sản phẩm và hệ thống phân phối.\n\n2. Dự án Website Điện Máy Gia Phú:\n- URL / Link: https://dienlanhgiaphu.com/\n- Mô tả chi tiết: Website dùng để cung cấp và bán các sản phẩm điện máy, điện lạnh như máy lạnh, tủ lạnh, máy giặt, máy nước nóng và thiết bị gia dụng.\n\n3. Dự án Website Vật Tư Điện Lạnh Hoàng Đạt:\n- URL / Link: https://www.hoangdat.vn/\n- Mô tả chi tiết: Website dùng để cung cấp các sản phẩm vật tư điện lạnh như ống đồng, ống bảo ôn, gas lạnh, máy nén lạnh và phụ kiện lắp đặt hệ thống lạnh. Website hiển thị danh mục sản phẩm theo từng nhóm và hỗ trợ khách hàng liên hệ hoặc yêu cầu báo giá.\n\n4. Dự án Website Điện Lạnh Bảo Ngọc:\n- URL / Link: https://dienlanhbaphong.vn/\n- Mô tả chi tiết: Website dùng để cung cấp các sản phẩm máy lạnh như máy lạnh treo tường, máy lạnh âm trần, máy lạnh tủ đứng và hệ thống multi. Website hiển thị danh mục sản phẩm, thông tin chi tiết, giá bán và hỗ trợ khách hàng lựa chọn, mua hàng. Ngoài ra, website còn cung cấp dịch vụ lắp đặt, sửa chữa và bảo trì hệ thống điện lạnh.\n\n5. Dự án Website Sửa Điện Lạnh Sài Gòn:\n- URL / Link: https://suadienlanhsaigon.vn/\n- Mô tả chi tiết: Website dùng để cung cấp dịch vụ sửa chữa điện lạnh tại nhà như sửa máy lạnh, tủ lạnh, máy giặt, lò vi sóng và các thiết bị gia dụng. Website hiển thị danh mục dịch vụ, thông tin chi tiết và hỗ trợ khách hàng liên hệ đặt lịch sửa chữa nhanh chóng.\n\n6. Dự án Siêu thị điện máy MediaMart:\n- URL / Link: https://mediamart.vn/dien-lanh\n- Mô tả chi tiết: Kinh doanh và bán lẻ trực tuyến các thiết bị điện lạnh chính hãng (điều hòa, tủ lạnh, máy giặt, máy sấy, tủ đông...) đi kèm các dịch vụ tra cứu giá cả, săn khuyến mãi, mua trả góp và đặt hàng giao lắp tận nhà.\n\n7. Dự án Siêu Thị Máy Lạnh:\n- URL / Link: https://sieuthimaylanh.com/\n- Mô tả chi tiết: Chuyên phân phối chính hãng các dòng điều hòa không khí từ dân dụng đến công nghiệp. Bên cạnh việc bán sản phẩm, còn cung cấp các dịch vụ kỹ thuật trọn gói bao gồm thi công ống đồng, lắp đặt hệ thống ống gió, bảo trì và vệ sinh máy lạnh chuyên nghiệp cho mọi công trình.\n\n8. Dự án Điện Máy Giá Kho BestMua:\n- URL / Link: https://bestmua.vn/\n- Mô tả chi tiết: Bán hàng trực tuyến chuyên phân phối các thiết bị điện máy và gia dụng (như Tivi, tủ lạnh, máy giặt, máy lạnh).\n\n9. Dự án Website bán hàng LG Việt Nam.:\n- URL / Link: https://www.lg.com/vn/\n- Mô tả chi tiết: Website chuyên giới thiệu và kinh doanh các sản phẩm điện tử, điện gia dụng cao cấp như TV, tủ lạnh, máy giặt, điều hòa và thiết bị tin học. Hệ thống được tích hợp các tính năng mua sắm hiện đại bao gồm: đặt hàng trực tuyến, đăng ký thành viên (MyLG), thanh toán trả góp, theo dõi bảo hành và đặt lịch dịch vụ sửa chữa (LG Best Care) nhằm tối ưu hóa trải nghiệm chăm sóc khách hàng toàn diện.\n\n10. Dự án SUNHOUSE:\n- URL / Link: https://sunhouse.com.vn/\n- Mô tả chi tiết: Trưng bày và hướng dẫn sử dụng các sản phẩm đồ gia dụng, thiết bị nhà bếp và điện lạnh (như nồi cơm điện, bếp từ, máy lọc nước, điều hòa...)"
  },
  {
    "title": "Kho Dự Án Tiêu Biểu Lĩnh Vực Gia công & Sản xuất Của DUDI SOFTWARE",
    "category": "Kho Dự Án - Gia công & Sản xuất",
    "tags": [
      "dự án",
      "gia công & sản xuất",
      "Website Bao Bì Kim Loại Nam Phong",
      "Website COIDB",
      "Website Bao Bì Giấy An Tín",
      "Website Bao Bì 77",
      "Website HomeOffice",
      "Website Gia Định Group",
      "Website Xưởng Đồ Gỗ Việt",
      "Website Đại Thành Forest",
      "Partron Korea Corporate Website",
      "Website Nội Thất Caco"
    ],
    "sourceType": "URL",
    "sourceName": "https://www.dudisoftware.com/projects",
    "content": "DANH SÁCH DỰ ÁN DUDI SOFTWARE THỰC HIỆN TRONG LĨNH VỰC GIA CÔNG & SẢN XUẤT (31 Dự án):\n\n1. Dự án Website Bao Bì Kim Loại Nam Phong:\n- URL / Link: https://baobikimloainamphong.com/\n- Mô tả chi tiết: Cung cấp sản phẩm bao bì kim loại và dịch vụ in ấn.\n\n2. Dự án Website COIDB:\n- URL / Link: https://coidb.com/\n- Mô tả chi tiết: Giới thiệu dịch vụ thiết kế và thi công nội thất.\n\n3. Dự án Website Bao Bì Giấy An Tín:\n- URL / Link: https://baobigiayantin.com/\n- Mô tả chi tiết: Cung cấp sản phẩm bao bì giấy và dịch vụ in ấn.\n\n4. Dự án Website Bao Bì 77:\n- URL / Link: http://baobi77.com.vn/\n- Mô tả chi tiết: Cung cấp sản phẩm bao bì và dịch vụ in ấn.\n\n5. Dự án Website HomeOffice:\n- URL / Link: https://homeoffice.com.vn/\n- Mô tả chi tiết: Cung cấp sản phẩm nội thất văn phòng và gia đình.\n\n6. Dự án Website Gia Định Group:\n- URL / Link: https://giadinhgroup.com.vn/pages/san-xuat-xuat-khau-giay-dep\n- Mô tả chi tiết: Sản xuất và xuất khẩu giày dép thời trang.\n\n7. Dự án Website Xưởng Đồ Gỗ Việt:\n- URL / Link: https://xuongdogoviet.com/\n- Mô tả chi tiết: Thiết kế và thi công nội thất đồ gỗ.\n\n8. Dự án Website Đại Thành Forest:\n- URL / Link: https://daithanhforest.vn/linh-vuc-hoat-dong/khai-thac-van-chuyen-lam-san/san-xuat-do-go-noi-that.html\n- Mô tả chi tiết: Sản xuất và cung cấp nội thất đồ gỗ.\n\n9. Dự án Partron Korea Corporate Website:\n- URL / Link: https://www.partron.co.kr/kr/\n- Mô tả chi tiết: Website giới thiệu doanh nghiệp Partron – công ty công nghệ Hàn Quốc chuyên sản xuất linh kiện điện tử, camera module, antenna, cảm biến, thiết bị wearable và automotive electronics. Website cung cấp thông tin công ty, lĩnh vực hoạt động, ESG, IR, nhà máy toàn cầu và tin tức doanh nghiệp.\n\n10. Dự án Website Nội Thất Caco:\n- URL / Link: https://noithatcaco.vn/cam-nang-noi-that/caco-xuong-san-xuat-noi-that-go-theo-yeu-cau-807.html?srsltid=AfmBOoqCNgIc6aRDcM0r7Ne7dme7eARUU6MM89fSTjRvYZO1QGEmAAld\n- Mô tả chi tiết: Thiết kế, sản xuất và thi công nội thất theo yêu cầu.\n\n11. Dự án Hôm nay dựa vào trang web này hãy trình bày cho con  tên dự án  mô tả ngắn về web này nè (mô ta3 đây nói về nội dung web truyền đạt á nha má) ✨ Đây là phần tóm tắt gọn gàng về trang web mà con đang xem:  📌 Tên dự án Dewood – Sản Xuất Quà Tặng Gỗ  📝 Mô tả ngắn Dewood là thương hiệu chuyên sản xuất và gia công các sản phẩm quà tặng bằng gỗ. Trang web giới thiệu đa dạng các mặt hàng như hộp đựng namecard, giá đỡ điện thoại/iPad, móc khóa gỗ cá nhân hóa, đồ chơi gỗ giáo dục, phụ kiện văn phòng, và nhiều sản phẩm thủ công tinh tế khác. Ngoài việc cung cấp sản phẩm, Dewood còn mang đến giải pháp quà tặng cho doanh nghiệp, đối tác, khách hàng, với dịch vụ gia công sỉ và cá nhân hóa theo yêu cầu. Điểm mạnh của Dewood là đội ngũ kỹ thuật lành nghề, nhà xưởng hiện đại, và nguồn nguyên liệu gỗ nhập khẩu đảm bảo chất lượng.  Con muốn má viết phần này theo kiểu giới thiệu dự án để nộp báo cáo, hay chỉ cần mô tả ngắn gọn cho dễ hiểu thôi?  mô tả ngắn lun á m ghi dị chi cho mệt dị dài vcl lun á 👌 Đây là mô tả ngắn gọn cho trang web mà con đang xem:  📌 Tên dự án Dewood – Sản Xuất Quà Tặng Gỗ  📝 Mô tả ngắn Dewood là thương hiệu chuyên làm quà tặng bằng gỗ, từ phụ kiện văn phòng, đồ chơi giáo dục đến các sản phẩm cá nhân hóa như móc khóa, hộp namecard. Trang web giới thiệu các sản phẩm thủ công tinh tế, mang tính sáng tạo và phù hợp làm quà tặng cho cá nhân lẫn doanh nghiệp.  👉 Nói ngắn gọn: Đây là một trang web bán và gia công quà tặng gỗ, tập trung vào sự độc đáo, bền đẹp và cá nhân hóa.  Con muốn má viết theo kiểu giới thiệu báo cáo học tập (nghiêm túc, chuẩn chỉnh) hay chỉ cần kiểu mô tả dễ hiểu, thân thiện để đọc cho nhanh thôi?  ngắn nữa á mom 👌 Đây là phiên bản ngắn gọn nhất:  📌 Tên dự án Dewood – Quà Tặng Gỗ  📝 Mô tả ngắn Trang web giới thiệu và bán quà tặng bằng gỗ, tập trung vào sự độc đáo, bền đẹp và cá nhân hóa.  👉 Vậy là đủ gọn để ghi vô báo cáo rồi đó.  tiếp đi trình bày thằng này nè mom làm này đi mom 👌 Đây là phần ngắn gọn cho trang web con đang mở:  📌 Tên dự án Kendotoy – Đồ Chơi Gỗ Việt Nam:\n- URL / Link: https://kendotoy.com/\n- Mô tả chi tiết: Trang web Kendotoy chuyên cung cấp đồ chơi gỗ an toàn cho trẻ em, giúp phát triển trí tuệ và kỹ năng thông qua các sản phẩm như khối xếp hình, bảng chữ cái, đồ chơi vận động, mô hình xe tàu, và nội thất gỗ cho bé.\n\n12. Dự án Công ty Bao Bì Hạnh Chung:\n- URL / Link: https://congtybaobihanhchung.com/\n- Mô tả chi tiết: Trang web giới thiệu doanh nghiệp chuyên sản xuất và cung cấp bao bì phục vụ cho nhiều ngành hàng. Nội dung tập trung vào các sản phẩm bao bì chất lượng, đa dạng mẫu mã, đáp ứng nhu cầu đóng gói – bảo quản – vận chuyển hàng hóa.\n\n13. Dự án Nibi Plastic:\n- URL / Link: https://www.nibiplastic.com/\n- Mô tả chi tiết: Nhà máy sản xuất sản phẩm nhựa, chuyên thiết kế và gia công khuôn nhựa chất lượng cao, cung cấp giải pháp tối ưu cho nhiều ngành công nghiệp.\n\n14. Dự án Haprocraft:\n- URL / Link: https://haprocraft.com/\n- Mô tả chi tiết: Chuyên sản xuất và xuất khẩu sản phẩm thủ công mỹ nghệ từ lục bình, mây tre, gỗ… Website giới thiệu các loại giỏ, hộp, đồ trang trí và đồ gia dụng thân thiện môi trường, mang đậm nét thủ công truyền thống Việt Nam.\n\n15. Dự án Nội Thất ABIG:\n- URL / Link: https://abig.com.vn/\n- Mô tả chi tiết: Đơn vị chuyên thiết kế, thi công và cung cấp giải pháp nội thất trọn gói cho nhà ở, văn phòng và công trình. Website giới thiệu dịch vụ thiết kế sáng tạo, sản phẩm nội thất chất lượng cao, mang đến không gian sống tiện nghi và hiện đại.\n\n16. Dự án VietNhat Precision:\n- URL / Link: https://vietnhatprecision.com/\n- Mô tả chi tiết: Doanh nghiệp chuyên về lĩnh vực cơ khí chính xác, sở hữu nhà máy sản xuất đạt các chứng chỉ chất lượng, cung cấp dịch vụ công nghiệp.\n\n17. Dự án Tam Minh Foods:\n- URL / Link: https://tamminhfoods.vn/\n- Mô tả chi tiết: Website giới thiệu công ty Tam Minh Foods chuyên cung cấp thực phẩm, nguyên liệu và sản phẩm chất lượng cao. Giao diện chuyên nghiệp, tối ưu hiển thị sản phẩm, thông tin doanh nghiệp và liên hệ khách hàng.\n\n18. Dự án PROSIMEX:\n- URL / Link: https://prosimex.com.vn/\n- Mô tả chi tiết: Chuyên cung cấp dịch vụ gia công cơ khí chính xác theo yêu cầu (như tiện, phay CNC, cắt laser, đột dập), đồng thời chuyên chế tạo kết cấu thép nhà xưởng và sản xuất các thiết bị phụ trợ công nghiệp như giàn giáo, pallet lưới.\n\n19. Dự án Cơ Khí Khôi Minh:\n- URL / Link: https://www.cokhikhoiminh.com/\n- Mô tả chi tiết: Chuyên thiết kế, chế tạo và lắp đặt các loại máy móc, dây chuyền sản xuất tự động hóa phục vụ cho các ngành công nghiệp, nông nghiệp và thực phẩm tại Việt Nam.\n\n20. Dự án Minh Long Online:\n- URL / Link: https://minhlongonline.com/ \n- Mô tả chi tiết: Website thương mại điện tử giới thiệu và bán các sản phẩm gốm sứ, đồ gia dụng và quà tặng cao cấp của Minh Long. Giao diện sang trọng, tối ưu trải nghiệm mua sắm và hiển thị sản phẩm chuyên nghiệp.\n\n21. Dự án Cơ Khí Nam Dũng:\n- URL / Link: https://cokhinamdung.vn/\n- Mô tả chi tiết: Chuyên gia công sản xuất các loại bánh răng (côn xoắn, trụ thẳng, bánh răng đồng/nhựa), nhông sên xích công nghiệp, pully và chi tiết máy theo yêu cầu. Cung cấp dịch vụ tiện CNC, phay CNC chất lượng cao, uy tín tại TP.HCM.\n\n22. Dự án Minh Long :\n- URL / Link: https://minhlong.com/\n- Mô tả chi tiết: Website thương mại điện tử giới thiệu và bán các sản phẩm gốm sứ, đồ gia dụng và quà tặng cao cấp của Minh Long. Giao diện sang trọng, tối ưu trải nghiệm mua sắm và hiển thị sản phẩm chuyên nghiệp.\n\n23. Dự án SUN COS GROUP:\n- URL / Link: https://suncosgroup.com/\n- Mô tả chi tiết: Chuyên gia công và sản xuất mỹ phẩm trọn gói từ A đến Z, giúp các cá nhân và doanh nghiệp xây dựng thương hiệu mỹ phẩm độc quyền (từ công thức, sản xuất đến pháp lý) mà không cần tự mở nhà xưởng.\n\n24. Dự án Mạnh Phát Cosmetics:\n- URL / Link: https://manhphatcosmetics.vn/\n- Mô tả chi tiết: Nhà máy chuyên gia công và sản xuất mỹ phẩm trọn gói đạt chuẩn cGMP, hỗ trợ khách hàng xây dựng thương hiệu độc quyền từ khâu nghiên cứu công thức, sản xuất đến hoàn thiện thủ tục pháp lý.\n\n25. Dự án Kanna Cosmetics:\n- URL / Link: https://kanna.vn/\n- Mô tả chi tiết: Nhà xưởng chuyên gia công mỹ phẩm độc quyền và trọn gói đạt chuẩn CGMP ASEAN, hỗ trợ từ khâu nghiên cứu công thức đến sản xuất các dòng mỹ phẩm nội địa cho khách hàng muốn làm thương hiệu riêng.\n\n26. Dự án Website công ty Nhựa Tiền Phong:\n- URL / Link: https://nhuatienphong.vn/\n- Mô tả chi tiết: Website giới thiệu sản phẩm và hoạt động sản xuất nhựa công nghiệp.\n\n27. Dự án Website công ty Bao Bì Gia Phát:\n- URL / Link: https://www.baobigiaphat.vn/\n- Mô tả chi tiết: Website giới thiệu sản phẩm và dịch vụ sản xuất bao bì.\n\n28. Dự án Website công ty Nhựa Hoàng Hà:\n- URL / Link: https://nhuahoangha.com/\n- Mô tả chi tiết: Website giới thiệu sản phẩm và hoạt động sản xuất nhựa.\n\n29. Dự án Website giới thiệu dịch vụ sản xuất – thương mại GCSE:\n- URL / Link: https://gcse.vn/san-xuat-thuong-mai-2-22.html\n- Mô tả chi tiết: Website giới thiệu lĩnh vực sản xuất và hoạt động thương mại của doanh nghiệp.\n\n30. Dự án Website công ty Duy Tân:\n- URL / Link: https://duytan.com/\n- Mô tả chi tiết: Website giới thiệu sản phẩm nhựa và hoạt động sản xuất của doanh nghiệp.\n\n31. Dự án Website Nhà xuất bản Trẻ:\n- URL / Link: https://www.nxbtre.com.vn/\n- Mô tả chi tiết: Website giới thiệu sách và hoạt động xuất bản của doanh nghiệp."
  },
  {
    "title": "Kho Dự Án Tiêu Biểu Lĩnh Vực Tài chính Của DUDI SOFTWARE",
    "category": "Kho Dự Án - Tài chính",
    "tags": [
      "dự án",
      "tài chính",
      "Tima",
      "Mcredit",
      "FE CREDIT",
      "HD SAISON",
      "ACS Vietnam",
      "Shinhan Finance",
      "Home Credit Việt Nam",
      "Website Dudi Credit",
      "Website MoneyWise",
      "Website Dudi Money Wise"
    ],
    "sourceType": "URL",
    "sourceName": "https://www.dudisoftware.com/projects",
    "content": "DANH SÁCH DỰ ÁN DUDI SOFTWARE THỰC HIỆN TRONG LĨNH VỰC TÀI CHÍNH (10 Dự án):\n\n1. Dự án Tima:\n- URL / Link: https://tima.vn/\n- Mô tả chi tiết: Tima là nền tảng tài chính kết nối hỗ trợ vay và cầm cố tài sản trực tuyến với giao diện hiện đại, dễ sử dụng và tối ưu trải nghiệm đăng ký dịch vụ nhanh chóng cho người dùng.\n\n2. Dự án Mcredit:\n- URL / Link: https://mcredit.com.vn/\n- Mô tả chi tiết: Mcredit cung cấp các giải pháp vay tiêu dùng trực tuyến với giao diện chuyên nghiệp, dễ thao tác và hỗ trợ đăng ký khoản vay nhanh chóng cho cá nhân trên toàn quốc.\n\n3. Dự án FE CREDIT:\n- URL / Link: https://www.fecredit.com.vn/\n- Mô tả chi tiết: FE CREDIT cung cấp các giải pháp tài chính cá nhân như vay tiền mặt, thẻ tín dụng và trả góp với giao diện hiện đại, dễ đăng ký và tối ưu trải nghiệm người dùng trên nhiều thiết bị.\n\n4. Dự án HD SAISON:\n- URL / Link: https://www.hdsaison.com.vn/\n- Mô tả chi tiết: HD SAISON cung cấp các dịch vụ vay tiêu dùng, trả góp và tài chính cá nhân với giao diện chuyên nghiệp, dễ sử dụng và hỗ trợ đăng ký dịch vụ trực tuyến nhanh chóng.\n\n5. Dự án ACS Vietnam:\n- URL / Link: https://acsvietnam.com.vn/\n- Mô tả chi tiết: ACS Vietnam cung cấp các giải pháp quản lý và thu hồi công nợ chuyên nghiệp với giao diện rõ ràng, hiện đại và hỗ trợ tra cứu thông tin dịch vụ nhanh chóng cho khách hàng.\n\n6. Dự án Shinhan Finance:\n- URL / Link: https://shinhanfinance.com.vn/\n- Mô tả chi tiết: Shinhan Finance cung cấp các giải pháp vay tiêu dùng và tài chính cá nhân với giao diện hiện đại, dễ sử dụng và hỗ trợ đăng ký khoản vay trực tuyến nhanh chóng.\n\n7. Dự án Home Credit Việt Nam:\n- URL / Link: https://www.homecredit.vn/\n- Mô tả chi tiết: Home Credit cung cấp các dịch vụ vay tiêu dùng, trả góp và tài chính cá nhân với giao diện thân thiện, dễ thao tác và hỗ trợ đăng ký trực tuyến nhanh chóng trên nhiều thiết bị.\n\n8. Dự án Website Dudi Credit:\n- URL / Link: https://dudi-credit.vercel.app/\n- Mô tả chi tiết: Website giới thiệu dịch vụ tài chính và quản lý tín dụng.\n\n9. Dự án Website MoneyWise:\n- URL / Link: https://moneywise.vn/\n- Mô tả chi tiết: Trang chia sẻ kiến thức tài chính, vay vốn và quản lý tiền cá nhân.\n\n10. Dự án Website Dudi Money Wise:\n- URL / Link: https://dudi-money-wise-fe-rho.vercel.app/home\n- Mô tả chi tiết: Website giới thiệu ứng dụng quản lý tài chính và theo dõi chi tiêu."
  },
  {
    "title": "Kho Dự Án Tiêu Biểu Lĩnh Vực Công nghệ Của DUDI SOFTWARE",
    "category": "Kho Dự Án - Công nghệ",
    "tags": [
      "dự án",
      "công nghệ",
      "Giải pháp phần mềm Techber",
      "Thiết kế website Megaweb",
      "Phần mềm hải quan điện tử ECUS",
      "Bosch Vietnam Corporate Website",
      "ONE ASIA by Evolable Asia Website",
      "Website PC Services",
      "Website KDI.",
      "Website Thiết Bị Mạng",
      "Website Siêu Thị Viễn Thông",
      "Website công ty HPT"
    ],
    "sourceType": "URL",
    "sourceName": "https://www.dudisoftware.com/projects",
    "content": "DANH SÁCH DỰ ÁN DUDI SOFTWARE THỰC HIỆN TRONG LĨNH VỰC CÔNG NGHỆ (10 Dự án):\n\n1. Dự án Giải pháp phần mềm Techber:\n- URL / Link: https://techber.vn/\n- Mô tả chi tiết: Cung cấp giải pháp phần mềm, chuyển đổi số và ứng dụng công nghệ theo nhu cầu doanh nghiệp.\n\n2. Dự án Thiết kế website Megaweb:\n- URL / Link: https://megaweb.vn/\n- Mô tả chi tiết: Cung cấp dịch vụ thiết kế website theo yêu cầu, hỗ trợ doanh nghiệp xây dựng website chuyên nghiệp.\n\n3. Dự án Phần mềm hải quan điện tử ECUS:\n- URL / Link: https://ecus.vn/\n- Mô tả chi tiết: Giải pháp khai báo hải quan điện tử, hỗ trợ doanh nghiệp xuất nhập khẩu tối ưu quy trình thông quan.\n\n4. Dự án Bosch Vietnam Corporate Website:\n- URL / Link: https://www.bosch.com.vn/\n- Mô tả chi tiết: Website chính thức của Bosch Việt Nam – tập đoàn công nghệ và dịch vụ hàng đầu thế giới hoạt động trong các lĩnh vực giải pháp di chuyển (Mobility), công nghệ công nghiệp, thiết bị gia dụng, năng lượng và tòa nhà thông minh. Website cung cấp thông tin doanh nghiệp, sản phẩm – dịch vụ, tuyển dụng, giải pháp công nghệ và hệ thống Bosch tại Việt Nam. Bosch hiện có văn phòng tại TP.HCM, Hà Nội, Đà Nẵng cùng trung tâm R&D và nhà máy tại Đồng Nai\n\n5. Dự án ONE ASIA by Evolable Asia Website:\n- URL / Link: https://vn.evolableasia.com/oneasia/vi/\n- Mô tả chi tiết: Website giới thiệu nền tảng ONE ASIA thuộc Evolable Asia – doanh nghiệp cung cấp giải pháp chuyển đổi số, smart factory và tối ưu sản xuất cho ngành công nghiệp tại châu Á. Website tập trung vào các giải pháp quản lý sản xuất, IoT, tự động hóa, dữ liệu nhà máy và hỗ trợ doanh nghiệp nâng cao hiệu suất vận hành. Ngoài ra còn giới thiệu dịch vụ tư vấn, hệ thống MES, DX và các dự án triển khai thực tế tại Việt Nam và khu vực châu Á.\n\n6. Dự án Website PC Services:\n- URL / Link: https://pc-services.vercel.app/user/home\n- Mô tả chi tiết: Website bán máy tính, linh kiện và thiết bị công nghệ.\n\n7. Dự án Website KDI.:\n- URL / Link: https://kdi.com.vn/\n- Mô tả chi tiết: Website giới thiệu dịch vụ hạ tầng mạng, hệ thống điện và giải pháp công nghệ doanh nghiệp.\n\n8. Dự án Website Thiết Bị Mạng:\n- URL / Link: https://thietbimang.com/\n- Mô tả chi tiết: Website bán thiết bị mạng, thiết bị quang và giải pháp hạ tầng mạng doanh nghiệp.\n\n9. Dự án Website Siêu Thị Viễn Thông:\n- URL / Link: https://www.sieuthivienthong.com/\n- Mô tả chi tiết: Website bán thiết bị mạng, camera an ninh và thiết bị viễn thông.\n\n10. Dự án Website công ty HPT:\n- URL / Link: https://hpt.vn/\n- Mô tả chi tiết: Website giới thiệu dịch vụ và giải pháp công nghệ thông tin cho doanh nghiệp."
  },
  {
    "title": "Kho Dự Án Tiêu Biểu Lĩnh Vực Tuyển dụng Của DUDI SOFTWARE",
    "category": "Kho Dự Án - Tuyển dụng",
    "tags": [
      "dự án",
      "tuyển dụng",
      "VietnamWorks",
      "CareerViet",
      "Việc Làm 24h",
      "123Job",
      "Timviec365",
      "YBOX",
      "Glints Việt Nam",
      "Website tuyển dụng JobOKO",
      "Website nền tảng TopCV",
      "Website nền tảng JobsGO"
    ],
    "sourceType": "URL",
    "sourceName": "https://www.dudisoftware.com/projects",
    "content": "DANH SÁCH DỰ ÁN DUDI SOFTWARE THỰC HIỆN TRONG LĨNH VỰC TUYỂN DỤNG (10 Dự án):\n\n1. Dự án VietnamWorks:\n- URL / Link: https://www.vietnamworks.com/\n- Mô tả chi tiết: Website kết nối nhà tuyển dụng và ứng viên, hỗ trợ tìm kiếm việc làm, đăng tin tuyển dụng và ứng tuyển online trên nhiều lĩnh vực nghề nghiệp.\n\n2. Dự án CareerViet:\n- URL / Link: https://careerviet.vn/\n- Mô tả chi tiết: Website hỗ trợ tìm kiếm việc làm, đăng tin tuyển dụng và kết nối giữa doanh nghiệp với ứng viên trên nhiều lĩnh vực nghề nghiệp khác nhau.\n\n3. Dự án Việc Làm 24h:\n- URL / Link: https://vieclam24h.vn/\n- Mô tả chi tiết: Website hỗ trợ tìm kiếm việc làm, tạo hồ sơ ứng tuyển và kết nối giữa ứng viên với nhà tuyển dụng trên nhiều ngành nghề khác nhau.\n\n4. Dự án 123Job:\n- URL / Link: https://123job.vn/\n- Mô tả chi tiết: Website hỗ trợ tìm kiếm việc làm, đăng tin tuyển dụng và kết nối giữa ứng viên với nhà tuyển dụng trên nhiều lĩnh vực nghề nghiệp khác nhau.\n\n5. Dự án Timviec365:\n- URL / Link: https://timviec365.vn/\n- Mô tả chi tiết: Website hỗ trợ tìm kiếm việc làm, tạo CV online và kết nối giữa ứng viên với nhà tuyển dụng trên nhiều lĩnh vực nghề nghiệp khác nhau.\n\n6. Dự án YBOX:\n- URL / Link: https://ybox.vn/\n- Mô tả chi tiết: Website chia sẻ cơ hội việc làm, thực tập, học bổng, kỹ năng và hoạt động dành cho học sinh – sinh viên và người trẻ.\n\n7. Dự án Glints Việt Nam:\n- URL / Link: https://glints.com/vn\n- Mô tả chi tiết: Website hỗ trợ tìm kiếm việc làm, tuyển dụng nhân sự và kết nối ứng viên với doanh nghiệp trong nhiều lĩnh vực nghề nghiệp khác nhau.\n\n8. Dự án Website tuyển dụng JobOKO:\n- URL / Link: https://vn.joboko.com/\n- Mô tả chi tiết: Website đăng tin tuyển dụng và tìm kiếm việc làm trực tuyến.\n\n9. Dự án Website nền tảng TopCV:\n- URL / Link: https://www.topcv.vn/?ref=you\n- Mô tả chi tiết: Website tạo CV và kết nối ứng viên với nhà tuyển dụng.\n\n10. Dự án Website nền tảng JobsGO:\n- URL / Link: https://jobsgo.vn/\n- Mô tả chi tiết: Website tìm kiếm việc làm và kết nối ứng viên với nhà tuyển dụng."
  },
  {
    "title": "Kho Dự Án Tiêu Biểu Lĩnh Vực Khách sạn & Homestay Của DUDI SOFTWARE",
    "category": "Kho Dự Án - Khách sạn & Homestay",
    "tags": [
      "dự án",
      "khách sạn & homestay",
      "Vinpearl",
      "D Home",
      "Nhà Sói Homestay",
      "The Odys Boutique Hotel",
      "Cozrum",
      "Modern Village Lifestyle",
      "Ladalat Hotel",
      "Hotels.com Booking Platform Website",
      "Gió Homestay Đà Lạt Website",
      "Meliá Hanoi Hotel Website"
    ],
    "sourceType": "URL",
    "sourceName": "https://www.dudisoftware.com/projects",
    "content": "DANH SÁCH DỰ ÁN DUDI SOFTWARE THỰC HIỆN TRONG LĨNH VỰC KHÁCH SẠN & HOMESTAY (10 Dự án):\n\n1. Dự án Vinpearl:\n- URL / Link: https://vinpearl.com/vi\n- Mô tả chi tiết: Website Vinpearl là nền tảng giới thiệu hệ thống khách sạn, resort và dịch vụ nghỉ dưỡng cao cấp, hỗ trợ người dùng tra cứu thông tin, xem phòng và đặt dịch vụ trực tuyến một cách nhanh chóng và thuận tiện.\n\n2. Dự án D Home:\n- URL / Link: https://dhomeai.com/\n- Mô tả chi tiết: Nền tảng đặt phòng homestay với mô hình self check-in, giúp khách hàng đặt phòng và trải nghiệm lưu trú tiện lợi, hiện đại.\n\n3. Dự án Nhà Sói Homestay:\n- URL / Link: https://www.nhasoi.com/\n- Mô tả chi tiết: Website giới thiệu homestay tại Đà Lạt, cung cấp thông tin phòng nghỉ, hình ảnh không gian, tiện ích và hỗ trợ khách hàng đặt phòng trực tuyến.\n\n4. Dự án The Odys Boutique Hotel:\n- URL / Link: https://theodyshotel.com/vi/\n- Mô tả chi tiết: Website giới thiệu khách sạn boutique tại trung tâm TP.HCM, cung cấp thông tin phòng nghỉ, tiện ích, nhà hàng và hỗ trợ đặt phòng trực tuyến.\n\n5. Dự án Cozrum:\n- URL / Link: https://cozrum.com/\n- Mô tả chi tiết: Website nền tảng lưu trú và đặt phòng, cung cấp căn hộ dịch vụ, homestay, khách sạn ngắn hạn/dài hạn cùng giải pháp quản lý lưu trú bằng công nghệ.\n\n6. Dự án Modern Village Lifestyle:\n- URL / Link: https://modernvillagelifestyle.vn/vi/\n- Mô tả chi tiết: Website đặt phòng và giới thiệu hệ sinh thái lưu trú hiện đại, cung cấp khách sạn, căn hộ dịch vụ và các trải nghiệm lưu trú linh hoạt tại nhiều thành phố ở Việt Nam.\n\n7. Dự án Ladalat Hotel:\n- URL / Link: https://ladalathotel.com.vn/vi\n- Mô tả chi tiết: Website giới thiệu khách sạn nghỉ dưỡng cao cấp tại Đà Lạt, cung cấp thông tin phòng nghỉ, ẩm thực, sự kiện, tiện ích và hỗ trợ đặt phòng trực tuyến.\n\n8. Dự án Hotels.com Booking Platform Website:\n- URL / Link: https://vi.hotels.com/\n- Mô tả chi tiết: Website chính thức của Hotels.com – nền tảng đặt phòng khách sạn và lưu trú trực tuyến thuộc Expedia Group, hỗ trợ tìm kiếm và đặt khách sạn, resort, villa, apartment và homestay trên toàn thế giới. Website cung cấp tính năng tìm kiếm điểm đến, so sánh giá phòng, đánh giá khách hàng, ưu đãi du lịch và chương trình thành viên Hotels.com Rewards. Giao diện website tập trung vào trải nghiệm booking nhanh, trực quan và tối ưu cho du lịch quốc tế lẫn nội địa.\n\n9. Dự án Gió Homestay Đà Lạt Website:\n- URL / Link: https://giohomestay.com.vn/\n- Mô tả chi tiết: Website chính thức của Gió Homestay Đà Lạt – mô hình homestay nghỉ dưỡng tập trung vào trải nghiệm yên tĩnh, gần gũi thiên nhiên và không gian thư giãn tại Đà Lạt. Website cung cấp thông tin đặt phòng, giới thiệu các hạng phòng, tiện ích, khu cafe, dịch vụ BBQ, review khách hàng và cẩm nang du lịch Đà Lạt. Gió Homestay tọa lạc tại đường Triệu Việt Vương, TP. Đà Lạt với phong cách thiết kế ấm cúng, hiện đại và thiên nhiên.\n\n10. Dự án Meliá Hanoi Hotel Website:\n- URL / Link: https://www.melia.com/vi/hotels/vietnam/hanoi/melia-hanoi\n- Mô tả chi tiết: Website chính thức của khách sạn Meliá Hanoi thuộc tập đoàn khách sạn quốc tế Meliá Hotels International. Website cung cấp thông tin về hệ thống phòng nghỉ cao cấp, nhà hàng, spa, hồ bơi, hội nghị – sự kiện và dịch vụ lưu trú tại trung tâm Hà Nội. Giao diện website theo phong cách sang trọng, hiện đại, tập trung vào trải nghiệm đặt phòng trực tuyến và quảng bá dịch vụ nghỉ dưỡng – business hotel chuẩn quốc tế. Khách sạn nằm gần Hồ Hoàn Kiếm và khu phố trung tâm Hà Nội."
  },
  {
    "title": "Kho Dự Án Tiêu Biểu Lĩnh Vực Sức khỏe Của DUDI SOFTWARE",
    "category": "Kho Dự Án - Sức khỏe",
    "tags": [
      "dự án",
      "sức khỏe",
      "Nền tảng đặt lịch khám BookingCare",
      "Nền tảng y tế Medpro",
      "Website Bác Sĩ Tư",
      "Website hệ thống phòng khám Nhi Đồng 315",
      "Website phòng khám nha khoa OneWay",
      "Website bệnh viện Vinmec",
      "Website Phòng khám Đa khoa Ngọc Minh",
      "Website Phòng khám Dr. Lê Na",
      "Website CarePlus Vietnam",
      "Hello Bacsi – Nền tảng thông tin sức khỏe"
    ],
    "sourceType": "URL",
    "sourceName": "https://www.dudisoftware.com/projects",
    "content": "DANH SÁCH DỰ ÁN DUDI SOFTWARE THỰC HIỆN TRONG LĨNH VỰC SỨC KHỎE (10 Dự án):\n\n1. Dự án Nền tảng đặt lịch khám BookingCare:\n- URL / Link: https://bookingcare.vn/\n- Mô tả chi tiết: Nền tảng hỗ trợ tìm kiếm bác sĩ, cơ sở y tế và đặt lịch khám trực tuyến tiện lợi.\n\n2. Dự án Nền tảng y tế Medpro:\n- URL / Link: https://medpro.vn/\n- Mô tả chi tiết: Nền tảng hỗ trợ đặt lịch khám, tư vấn y tế từ xa và kết nối người dùng với cơ sở y tế.\n\n3. Dự án Website Bác Sĩ Tư:\n- URL / Link: https://www.bacsitu.com/\n- Mô tả chi tiết: Website cung cấp và bán sản phẩm chăm sóc sức khỏe trực tuyến.\n\n4. Dự án Website hệ thống phòng khám Nhi Đồng 315:\n- URL / Link: https://www.nhidong315.com/\n- Mô tả chi tiết: Website giới thiệu dịch vụ khám chữa bệnh và hệ thống phòng khám nhi.\n\n5. Dự án Website phòng khám nha khoa OneWay:\n- URL / Link: https://nhakhoaoneway.vn/\n- Mô tả chi tiết: Website giới thiệu dịch vụ nha khoa và chăm sóc răng miệng.\n\n6. Dự án Website bệnh viện Vinmec:\n- URL / Link: https://www.vinmec.com/vie/\n- Mô tả chi tiết: Website cung cấp thông tin dịch vụ y tế, tra cứu chuyên khoa, bác sĩ và hỗ trợ đặt lịch khám trực tuyến.\n\n7. Dự án Website Phòng khám Đa khoa Ngọc Minh:\n- URL / Link: https://pkdkngocminh.com.vn/\n- Mô tả chi tiết: Cung cấp thông tin phòng khám, các dịch vụ khám chữa bệnh và hỗ trợ người dùng đăng ký khám, kết nối nhanh.\n\n8. Dự án Website Phòng khám Dr. Lê Na:\n- URL / Link: https://phongkhamdrlena.com/\n- Mô tả chi tiết: Cung cấp thông tin phòng khám, dịch vụ chuyên khoa và hỗ trợ đặt lịch khám nhanh chóng.\n\n9. Dự án Website CarePlus Vietnam:\n- URL / Link: https://careplusvn.com/vi/\n- Mô tả chi tiết: Website giới thiệu hệ thống phòng khám quốc tế CarePlus, cung cấp thông tin dịch vụ y tế, đội ngũ bác sĩ và hỗ trợ đặt lịch khám trực tuyến.\n\n10. Dự án Hello Bacsi – Nền tảng thông tin sức khỏe:\n- URL / Link: https://hellobacsi.com/\n- Mô tả chi tiết: Website cung cấp kiến thức y khoa, tư vấn sức khỏe và thông tin bệnh lý, giúp người đọc hiểu và chăm sóc sức khỏe bản thân hiệu quả."
  }
];
