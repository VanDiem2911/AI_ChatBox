import { NextResponse } from 'next/server';
import { knowledgeDocumentSchema } from '@/lib/validation/schemas';
import { KnowledgeService } from '@/features/knowledge/knowledge.service';
import { getToken } from 'next-auth/jwt';

// Force dynamic route and ensure fresh schema
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category') || undefined;
    const status = searchParams.get('status') || undefined;
    const search = searchParams.get('search') || undefined;

    const result = await KnowledgeService.getDocuments({
      page,
      limit,
      category,
      status,
      search,
    });

    return NextResponse.json({ success: true, data: result.documents, pagination: result.pagination });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Lỗi khi lấy danh sách tài liệu' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const token = await getToken({
      req: req as any,
      secret: process.env.AUTH_SECRET || 'fallback-super-secret-key-32-chars-minimum',
    } as any);
    const body = await req.json();
    const validated = knowledgeDocumentSchema.parse(body);

    const doc = await KnowledgeService.createDocument({
      ...validated,
      createdBy: (token?.id as string) || '669000000000000000000001',
      effectiveFrom: validated.effectiveFrom ? new Date(validated.effectiveFrom) : undefined,
      effectiveTo: validated.effectiveTo ? new Date(validated.effectiveTo) : undefined,
    });

    return NextResponse.json({ success: true, data: doc }, { status: 201 });
  } catch (error: any) {
    console.error('[API Admin Knowledge POST Error]:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Không thể tạo tài liệu mới' },
      { status: 400 }
    );
  }
}
