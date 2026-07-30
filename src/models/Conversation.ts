import mongoose, { Schema, Model, Document } from 'mongoose';
import { IConversationDocument } from '@/types';

export interface IConversationModel extends Omit<IConversationDocument, '_id'>, Document {}

const ConversationSchema = new Schema<IConversationModel>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    anonymousSessionId: { type: String, index: true },
    title: { type: String, required: true, default: 'Cuộc trò chuyện mới' },
    status: {
      type: String,
      enum: ['AI_ACTIVE', 'WAITING_FOR_AGENT', 'AGENT_ACTIVE', 'CLOSED'],
      default: 'AI_ACTIVE',
      index: true,
    },
    summary: { type: String },
    memorySummary: { type: String },
    lastMessageAt: { type: Date, default: Date.now, index: true },
  },
  {
    timestamps: true,
  }
);

// Compound index for querying user conversations efficiently
ConversationSchema.index({ userId: 1, lastMessageAt: -1 });
ConversationSchema.index({ anonymousSessionId: 1, lastMessageAt: -1 });

const Conversation: Model<IConversationModel> =
  mongoose.models.Conversation ||
  mongoose.model<IConversationModel>('Conversation', ConversationSchema);

export default Conversation;
