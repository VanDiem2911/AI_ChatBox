import { genAI, GEMINI_FALLBACK_MODELS, openai, OPENAI_CHAT_MODEL, ollamaClient, OLLAMA_CHAT_MODEL, AI_PROVIDER } from '@/lib/ai/client';
import KnowledgeDocument from '@/models/KnowledgeDocument';
import { connectToDatabase } from '@/lib/mongodb/mongoose';

export interface IClassificationResult {
  title: string;
  category: string;
  tags: string[];
  summary: string;
}

export class DocumentClassifierService {
  /**
   * Lấy danh sách các danh mục hiện có trong cơ sở dữ liệu để gợi ý cho AI
   */
  static async getExistingCategories(): Promise<string[]> {
    try {
      await connectToDatabase();
      const categories = await KnowledgeDocument.distinct('category', { status: 'ACTIVE' });
      const filtered = categories.filter((c: any) => typeof c === 'string' && c.trim().length > 0);
      
      const defaultCategories = [
        'Chính sách',
        'Dịch vụ & Công nghệ',
        'Quy trình & Báo giá',
        'Kho Dự Án',
        'Giới thiệu & Liên hệ',
        'Hướng dẫn & Hỗ trợ',
        'Nhân sự & Tuyển dụng',
        'Tài liệu kỹ thuật'
      ];

      return Array.from(new Set([...filtered, ...defaultCategories]));
    } catch (err) {
      console.warn('[Classifier] Failed to get existing categories, using defaults:', err);
      return [
        'Chính sách',
        'Dịch vụ & Công nghệ',
        'Quy trình & Báo giá',
        'Kho Dự Án',
        'Giới thiệu & Liên hệ',
        'Hướng dẫn & Hỗ trợ'
      ];
    }
  }

  /**
   * Phân loại tài liệu và trích xuất thông tin tự động bằng AI
   */
  static async classify(params: {
    text: string;
    fileName?: string;
  }): Promise<IClassificationResult> {
    const { text, fileName } = params;
    const cleanFileName = fileName ? fileName.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ') : '';
    
    // Giới hạn độ dài nội dung đưa vào prompt để tối ưu token & tốc độ (lấy tối đa 4000 ký tự đầu và 1000 ký tự cuối)
    let sampleContent = text.trim();
    if (sampleContent.length > 5000) {
      sampleContent = sampleContent.slice(0, 4000) + '\n\n[...Nội dung văn bản dài tiếp tục...]\n\n' + sampleContent.slice(-1000);
    }

    const categories = await this.getExistingCategories();
    const categoriesStr = categories.join(', ');

    const systemPrompt = `Bạn là chuyên gia phân loại tài liệu và quản lý tri thức doanh nghiệp (RAG Knowledge Base).
Nhiệm vụ của bạn là đọc nội dung văn bản (và tên file đính kèm nếu có), sau đó:
1. Đặt Tiêu đề tài liệu ("title"): Ngắn gọn, rõ ràng, trang trọng, chuyên nghiệp (dưới 100 ký tự). Phản ánh đúng chủ đề chính.
2. Phân loại Danh mục ("category"): Chọn danh mục phù hợp nhất từ danh sách danh mục hiện có: [${categoriesStr}]. Nếu tài liệu thuộc chủ đề hoàn toàn mới không khớp danh mục nào, bạn có thể tạo một danh mục mới ngắn gọn (2-4 từ, ví dụ "Chính sách bảo mật", "Tuyển dụng").
3. Gợi ý các Thẻ nhãn ("tags"): Danh sách 3 - 6 từ khóa quan trọng (viết thường, tiếng Việt không dấu hoặc có dấu).
4. Tóm tắt ("summary"): 1-2 câu súc tích tóm tắt nội dung tài liệu.

YÊU CẦU ĐẶC BIỆT:
- Bạn CHỈ trả về duy nhất 1 chuỗi JSON hợp lệ, KHÔNG kèm markdown explanation ngoài code block.
- Định dạng JSON bắt buộc:
{
  "title": "Tiêu đề tài liệu ở đây",
  "category": "Danh mục phân loại ở đây",
  "tags": ["tag1", "tag2", "tag3"],
  "summary": "Tóm tắt ngắn gọn ở đây"
}`;

    const userPrompt = `Tên file nguồn: ${cleanFileName || 'Không có'}
Nội dung tài liệu:
"""
${sampleContent}
"""

Hãy phân tích và trả về JSON phân loại.`;

    // 1. Thử gọi Google Gemini nếu có key hoặc AI_PROVIDER là gemini
    if (process.env.GEMINI_API_KEY) {
      const modelsToTry = Array.from(
        new Set([
          'gemini-3.5-flash',
          'gemini-3.6-flash',
          'gemini-3.7-flash',
          'gemini-flash-latest',
          ...GEMINI_FALLBACK_MODELS,
        ])
      );

      for (const modelName of modelsToTry) {
        try {
          const model = genAI.getGenerativeModel({
            model: modelName,
            systemInstruction: systemPrompt,
            generationConfig: {
              temperature: 0.2,
              responseMimeType: 'application/json',
            },
          });

          const result = await model.generateContent(userPrompt);
          const responseText = result.response.text();
          const parsed = this.parseJsonResult(responseText);
          if (parsed) return parsed;
        } catch (geminiErr: any) {
          console.warn(`[Classifier] Gemini ${modelName} error:`, geminiErr.message || geminiErr);
        }
      }
    }

    // 2. Thử gọi OpenAI nếu có API Key
    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'dummy-key-for-build') {
      try {
        const completion = await openai.chat.completions.create({
          model: OPENAI_CHAT_MODEL,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          temperature: 0.2,
          response_format: { type: 'json_object' },
        });

        const raw = completion.choices[0]?.message?.content || '';
        const parsed = this.parseJsonResult(raw);
        if (parsed) return parsed;
      } catch (openAiErr: any) {
        console.warn('[Classifier] OpenAI error:', openAiErr.message || openAiErr);
      }
    }

    // 3. Thử gọi Ollama Local
    if (AI_PROVIDER === 'ollama' || AI_PROVIDER === 'local') {
      try {
        const response = await ollamaClient.chat({
          model: OLLAMA_CHAT_MODEL,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          format: 'json',
          options: { temperature: 0.2 },
        });

        const parsed = this.parseJsonResult(response.message.content);
        if (parsed) return parsed;
      } catch (ollamaErr: any) {
        console.warn('[Classifier] Ollama error:', ollamaErr.message || ollamaErr);
      }
    }

    // 4. Heuristic Rule-based Fallback nếu mọi AI provider đều offline
    return this.fallbackRuleBasedClassification(sampleContent, cleanFileName, categories);
  }

  /**
   * Helper trích xuất JSON từ text trả về của LLM
   */
  private static parseJsonResult(text: string): IClassificationResult | null {
    try {
      let cleaned = text.trim();
      if (cleaned.startsWith('```json')) {
        cleaned = cleaned.replace(/^```json\s*/, '').replace(/```\s*$/, '');
      } else if (cleaned.startsWith('```')) {
        cleaned = cleaned.replace(/^```\s*/, '').replace(/```\s*$/, '');
      }

      const parsed = JSON.parse(cleaned);
      if (parsed && parsed.title && parsed.category) {
        return {
          title: String(parsed.title).trim(),
          category: String(parsed.category).trim(),
          tags: Array.isArray(parsed.tags) ? parsed.tags.map((t: any) => String(t).trim()).filter(Boolean) : [],
          summary: String(parsed.summary || '').trim(),
        };
      }
    } catch (e) {
      console.warn('[Classifier] Failed to parse JSON response:', text);
    }
    return null;
  }

  /**
   * Phân loại heuristic thông minh dựa trên từ khóa tiếng Việt nếu AI offline
   */
  private static fallbackRuleBasedClassification(
    content: string,
    fileName: string,
    existingCategories: string[]
  ): IClassificationResult {
    const textLower = (fileName + ' ' + content).toLowerCase();
    
    // Suy đoán title
    let derivedTitle = fileName;
    if (!derivedTitle) {
      const firstLine = content.split('\n').map((l) => l.trim()).filter(Boolean)[0] || '';
      derivedTitle = firstLine.slice(0, 80) || 'Tài liệu kiến thức mới';
    }

    // Suy đoán Category
    let category = 'Chính sách';
    if (/dự án|project|khách hàng tiêu biểu|case study|triển khai/i.test(textLower)) {
      category = existingCategories.find((c) => /dự án/i.test(c)) || 'Kho Dự Án';
    } else if (/báo giá|bảng giá|chi phí|thanh toán|hợp đồng|quy trình làm việc/i.test(textLower)) {
      category = existingCategories.find((c) => /quy trình|báo giá/i.test(c)) || 'Quy trình & Báo giá';
    } else if (/dịch vụ|công nghệ|lập trình|thiết kế website|mobile app|cloud|ai/i.test(textLower)) {
      category = existingCategories.find((c) => /dịch vụ/i.test(c)) || 'Dịch vụ & Công nghệ';
    } else if (/liên hệ|giới thiệu|tầm nhìn|sứ mệnh|địa chỉ|hotline|slogan/i.test(textLower)) {
      category = existingCategories.find((c) => /giới thiệu/i.test(c)) || 'Giới thiệu & Liên hệ';
    } else if (/tuyển dụng|nhân sự|lương|phúc lợi|jd|intern|fresher/i.test(textLower)) {
      category = 'Nhân sự & Tuyển dụng';
    } else if (/hướng dẫn|hỗ trợ|support|cài đặt|sử dụng/i.test(textLower)) {
      category = 'Hướng dẫn & Hỗ trợ';
    }

    return {
      title: derivedTitle,
      category,
      tags: [category.toLowerCase(), 'tài liệu', 'word'],
      summary: content.slice(0, 150) + '...',
    };
  }
}
