import mongoose, { Schema, Model, Document } from 'mongoose';
import { IFeedbackDocument } from '@/types';

export interface IFeedbackModel extends Omit<IFeedbackDocument, '_id'>, Document {}

const FeedbackSchema = new Schema<IFeedbackModel>(
  {
    messageId: {
      type: Schema.Types.ObjectId,
      ref: 'Message',
      required: true,
      index: true,
    },
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: 'Conversation',
      required: true,
      index: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    rating: {
      type: String,
      enum: ['UP', 'DOWN'],
      required: true,
    },
    reason: { type: String, trim: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const Feedback: Model<IFeedbackModel> =
  mongoose.models.Feedback || mongoose.model<IFeedbackModel>('Feedback', FeedbackSchema);

export default Feedback;
