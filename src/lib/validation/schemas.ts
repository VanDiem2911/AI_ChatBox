import { z } from 'zod';

export const createConversationSchema = z.object({
  anonymousSessionId: z.string().min(1, 'Session ID không được để trống'),
  title: z.string().optional(),
  createNew: z.boolean().optional(),
});

export const sendMessageSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, 'Tin nhắn không được để trống')
    .max(2000, 'Tin nhắn vượt quá giới hạn 2000 ký tự'),
  anonymousSessionId: z.string().min(1, 'Session ID không được để trống'),
});

export const feedbackSchema = z.object({
  messageId: z.string().min(1, 'Message ID là bắt buộc'),
  conversationId: z.string().min(1, 'Conversation ID là bắt buộc'),
  rating: z.enum(['UP', 'DOWN']),
  reason: z.string().max(500, 'Lý do không quá 500 ký tự').optional(),
});

export const createTicketSchema = z.object({
  conversationId: z.string().min(1, 'Conversation ID là bắt buộc'),
  customerName: z.string().trim().min(2, 'Họ tên ít nhất 2 ký tự'),
  customerEmail: z.string().email('Email không đúng định dạng'),
  customerPhone: z.string().optional(),
  subject: z.string().trim().min(5, 'Tiêu đề ít nhất 5 ký tự'),
  description: z.string().trim().min(10, 'Nội dung ít nhất 10 ký tự'),
});

export const knowledgeDocumentSchema = z.object({
  title: z.string().trim().min(3, 'Tiêu đề ít nhất 3 ký tự'),
  content: z.string().trim().min(10, 'Nội dung ít nhất 10 ký tự'),
  sourceType: z.enum(['TEXT', 'PDF', 'FAQ', 'URL', 'DOCX']).default('TEXT'),
  sourceName: z.string().optional(),
  category: z.string().trim().min(1, 'Danh mục không được để trống'),
  tags: z.array(z.string()).default([]),
  status: z.enum(['ACTIVE', 'INACTIVE', 'DRAFT']).default('ACTIVE'),
  effectiveFrom: z.string().optional(),
  effectiveTo: z.string().optional(),
});
