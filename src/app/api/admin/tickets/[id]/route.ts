import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb/mongoose';
import SupportTicket from '@/models/SupportTicket';

export const dynamic = 'force-dynamic';

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { status, priority } = body;

    const updates: any = {};
    if (status) updates.status = status;
    if (priority) updates.priority = priority;

    const updatedTicket = await SupportTicket.findByIdAndUpdate(
      params.id,
      updates,
      { new: true }
    );

    if (!updatedTicket) {
      return NextResponse.json(
        { success: false, error: 'Không tìm thấy Support Ticket' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedTicket });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Cập nhật thất bại' },
      { status: 500 }
    );
  }
}
