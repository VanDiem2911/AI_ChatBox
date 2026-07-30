import mongoose, { Schema, Model, Document } from 'mongoose';
import { IAiUsageLogDocument } from '@/types';

export interface IAiUsageLogModel extends Omit<Document, 'model'>, Omit<IAiUsageLogDocument, '_id'> {}

const AiUsageLogSchema = new Schema<IAiUsageLogModel>(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: 'Conversation',
      required: true,
      index: true,
    },
    messageId: { type: Schema.Types.ObjectId, ref: 'Message' },
    provider: { type: String, default: 'openai' },
    model: { type: String, required: true },
    inputTokens: { type: Number, required: true, default: 0 },
    outputTokens: { type: Number, required: true, default: 0 },
    totalTokens: { type: Number, required: true, default: 0 },
    responseTimeMs: { type: Number, required: true, default: 0 },
    success: { type: Boolean, required: true, default: true },
    errorCode: { type: String },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

AiUsageLogSchema.index({ createdAt: -1 });

const AiUsageLog: Model<IAiUsageLogModel> =
  mongoose.models.AiUsageLog ||
  mongoose.model<IAiUsageLogModel>('AiUsageLog', AiUsageLogSchema);

export default AiUsageLog;
