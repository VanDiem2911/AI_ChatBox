import { NextResponse } from 'next/server';
import mammoth from 'mammoth';
import { DocumentClassifierService } from '@/features/knowledge/document-classifier.service';
import { getToken } from 'next-auth/jwt';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    // Optional check admin token if configured
    await getToken({
      req: req as any,
      secret: process.env.AUTH_SECRET || 'fallback-super-secret-key-32-chars-minimum',
    } as any);

    const contentType = req.headers.get('content-type') || '';

    let textContent = '';
    let originalFileName = '';

    // Trường hợp 1: Nhận file Word qua FormData (multipart/form-data)
    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') as File | null;

      if (!file) {
        return NextResponse.json(
          { success: false, error: 'Vui lòng chọn file Word (.docx) để tải lên.' },
          { status: 400 }
        );
      }

      originalFileName = file.name;
      const lowerName = file.name.toLowerCase();

      if (!lowerName.endsWith('.docx') && !lowerName.endsWith('.doc')) {
        return NextResponse.json(
          { success: false, error: 'Định dạng file không hỗ trợ. Vui lòng tải lên file Word định dạng .docx' },
          { status: 400 }
        );
      }

      // Convert File sang Buffer để mammoth đọc
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      try {
        const extraction = await mammoth.extractRawText({ buffer });
        textContent = extraction.value ? extraction.value.trim() : '';
      } catch (extractErr: any) {
        console.error('[Word Import Extract Error]:', extractErr);
        return NextResponse.json(
          {
            success: false,
            error: 'Không thể đọc nội dung file Word này. Hãy đảm bảo file không bị lỗi và là định dạng .docx hợp lệ.',
          },
          { status: 400 }
        );
      }

      if (!textContent || textContent.length < 5) {
        return NextResponse.json(
          { success: false, error: 'File Word rỗng hoặc không chứa nội dung văn bản có thể trích xuất.' },
          { status: 400 }
        );
      }
    } 
    // Trường hợp 2: Gửi JSON text để AI tự phân loại
    else {
      const body = await req.json();
      textContent = body.content ? String(body.content).trim() : '';
      originalFileName = body.fileName ? String(body.fileName).trim() : '';

      if (!textContent || textContent.length < 5) {
        return NextResponse.json(
          { success: false, error: 'Nội dung văn bản quá ngắn để AI có thể phân loại.' },
          { status: 400 }
        );
      }
    }

    // Tiến hành gọi AI phân tích và phân loại
    const classification = await DocumentClassifierService.classify({
      text: textContent,
      fileName: originalFileName,
    });

    return NextResponse.json({
      success: true,
      data: {
        title: classification.title,
        category: classification.category,
        tags: classification.tags,
        summary: classification.summary,
        content: textContent,
        fileName: originalFileName || undefined,
        sourceType: originalFileName ? 'DOCX' : 'TEXT',
      },
    });
  } catch (error: any) {
    console.error('[API Import Word Error]:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Lỗi trong quá trình xử lý file Word và phân loại tài liệu.' },
      { status: 500 }
    );
  }
}
