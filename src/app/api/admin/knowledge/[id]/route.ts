import { NextResponse } from 'next/server';
import { KnowledgeService } from '@/features/knowledge/knowledge.service';
import KnowledgeDocument from '@/models/KnowledgeDocument';
import { connectToDatabase } from '@/lib/mongodb/mongoose';

export const dynamic = 'force-dynamic';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const doc = await KnowledgeDocument.findById(params.id).lean();
    if (!doc) {
      return NextResponse.json(
        { success: false, error: 'Không tìm thấy tài liệu' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: doc });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Lỗi lấy tài liệu' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const updatedDoc = await KnowledgeService.updateDocument(params.id, body);
    return NextResponse.json({
      success: true,
      data: updatedDoc,
      message: 'Cập nhật tài liệu và sinh lại Vector Embeddings thành công!',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Lỗi khi cập nhật tài liệu' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await KnowledgeService.deleteDocument(params.id);
    return NextResponse.json({ success: true, message: 'Đã xóa tài liệu và các vector chunks' });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Lỗi khi xóa tài liệu' },
      { status: 500 }
    );
  }
}
