import { NextResponse } from 'next/server';
import { createTicketSchema } from '@/lib/validation/schemas';
import { TicketService } from '@/features/support/ticket.service';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = createTicketSchema.parse(body);

    const ticket = await TicketService.createTicket(validated);

    return NextResponse.json({ success: true, data: ticket }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Không thể tạo Yêu cầu Hỗ trợ' },
      { status: 400 }
    );
  }
}
