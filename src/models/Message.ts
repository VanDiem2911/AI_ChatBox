import mongoose, { Schema, Model, Document } from 'mongoose';
import { IMessageDocument } from '@/types';

export interface IMessageModel extends Omit<Document, 'model'>, Omit<IMessageDocument, '_id'> {}

const MessageReferenceSchema = new Schema(
  {
    chunkId: { type: Schema.Types.ObjectId, ref: 'KnowledgeChunk', required: true },
    documentId: { type: Schema.Types.ObjectId, ref: 'KnowledgeDocument', required: true },
    title: { type: String, required: true },
    score: { type: Number, required: true },
  },
  { _id: false }
);

const TokenUsageSchema = new Schema(
  {
    inputTokens: { type: Number, default: 0 },
    outputTokens: { type: Number, default: 0 },
    totalTokens: { type: Number, default: 0 },
  },
  { _id: false }
);

const MessageSchema = new Schema<IMessageModel>(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: 'Conversation',
      required: true,
      index: true,
    },
    role: {
      type: String,
      enum: ['USER', 'ASSISTANT', 'SYSTEM', 'AGENT', 'TOOL'],
      required: true,
    },
    content: { type: String, required: true },
    status: {
      type: String,
      enum: ['SENDING', 'SUCCESS', 'ERROR'],
      default: 'SUCCESS',
    },
    model: { type: String },
    tokenUsage: { type: TokenUsageSchema },
    references: [MessageReferenceSchema],
    toolCalls: [{ type: Schema.Types.Mixed }],
    error: { type: String },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

// Index to quickly load message history in order
MessageSchema.index({ conversationId: 1, createdAt: 1 });

const Message: Model<IMessageModel> =
  mongoose.models.Message || mongoose.model<IMessageModel>('Message', MessageSchema);

export default Message;
