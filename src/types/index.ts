import { Types } from 'mongoose';

// User Roles & Status
export type UserRole = 'CUSTOMER' | 'ADMIN';
export type UserStatus = 'ACTIVE' | 'INACTIVE';

// Conversation Status
export type ConversationStatus = 
  | 'AI_ACTIVE' 
  | 'WAITING_FOR_AGENT' 
  | 'AGENT_ACTIVE' 
  | 'CLOSED';

// Message Roles & Status
export type MessageRole = 'USER' | 'ASSISTANT' | 'SYSTEM' | 'AGENT' | 'TOOL';
export type MessageStatus = 'SENDING' | 'SUCCESS' | 'ERROR';

// Knowledge Document Source & Status
export type DocumentSourceType = 'TEXT' | 'PDF' | 'FAQ' | 'URL' | 'DOCX';
export type DocumentStatus = 'ACTIVE' | 'INACTIVE' | 'DRAFT';

// Support Ticket Status & Priority
export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

// Feedback Rating
export type FeedbackRating = 'UP' | 'DOWN';

// Interfaces for Document References in Assistant Message
export interface IMessageReference {
  chunkId: string | Types.ObjectId;
  documentId: string | Types.ObjectId;
  title: string;
  score: number;
}

// Token Usage Interface
export interface ITokenUsage {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
}

// Tool Call Interface
export interface IToolCall {
  id: string;
  name: string;
  arguments: Record<string, any>;
  result?: any;
}

// User Document Interface
export interface IUserDocument {
  _id?: string | Types.ObjectId;
  name: string;
  email: string;
  passwordHash?: string;
  role: UserRole;
  status: UserStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

// Conversation Interface
export interface IConversationDocument {
  _id?: string | Types.ObjectId;
  userId?: string | Types.ObjectId;
  anonymousSessionId?: string;
  title: string;
  status: ConversationStatus;
  summary?: string;
  memorySummary?: string;
  lastMessageAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

// Message Interface
export interface IMessageDocument {
  _id?: string | Types.ObjectId;
  conversationId: string | Types.ObjectId;
  role: MessageRole;
  content: string;
  status: MessageStatus;
  model?: string;
  tokenUsage?: ITokenUsage;
  references?: IMessageReference[];
  toolCalls?: IToolCall[];
  error?: string;
  createdAt?: Date;
}

// Knowledge Document Interface
export interface IKnowledgeDocument {
  _id?: string | Types.ObjectId;
  title: string;
  content: string;
  sourceType: DocumentSourceType;
  sourceName?: string;
  category: string;
  tags: string[];
  language: string;
  status: DocumentStatus;
  effectiveFrom?: Date;
  effectiveTo?: Date;
  createdBy: string | Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

// Knowledge Chunk Interface
export interface IKnowledgeChunkDocument {
  _id?: string | Types.ObjectId;
  documentId: string | Types.ObjectId;
  content: string;
  embedding: number[];
  chunkIndex: number;
  category: string;
  tags: string[];
  language: string;
  status: DocumentStatus;
  effectiveFrom?: Date;
  effectiveTo?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

// Support Ticket Interface
export interface ISupportTicketDocument {
  _id?: string | Types.ObjectId;
  conversationId: string | Types.ObjectId;
  userId?: string | Types.ObjectId;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  assignedTo?: string | Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

// Feedback Interface
export interface IFeedbackDocument {
  _id?: string | Types.ObjectId;
  messageId: string | Types.ObjectId;
  conversationId: string | Types.ObjectId;
  userId?: string | Types.ObjectId;
  rating: FeedbackRating;
  reason?: string;
  createdAt?: Date;
}

// AI Usage Log Interface
export interface IAiUsageLogDocument {
  _id?: string | Types.ObjectId;
  conversationId: string | Types.ObjectId;
  messageId?: string | Types.ObjectId;
  provider: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  responseTimeMs: number;
  success: boolean;
  errorCode?: string;
  createdAt?: Date;
}

// Standard API Response Format
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
