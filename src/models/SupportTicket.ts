import mongoose, { Schema, Model, Document } from 'mongoose';
import { ISupportTicketDocument } from '@/types';

export interface ISupportTicketModel extends Omit<ISupportTicketDocument, '_id'>, Document {}

const SupportTicketSchema = new Schema<ISupportTicketModel>(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: 'Conversation',
      required: true,
      index: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    customerName: { type: String, required: true, trim: true },
    customerEmail: { type: String, required: true, lowercase: true, trim: true },
    customerPhone: { type: String, trim: true },
    subject: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED', 'CHUA_BAO_GIA', 'DA_BAO_GIA'],
      default: 'OPEN',
      index: true,
    },
    priority: {
      type: String,
      enum: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'],
      default: 'MEDIUM',
      index: true,
    },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

SupportTicketSchema.index({ status: 1, priority: -1 });

const SupportTicket: Model<ISupportTicketModel> =
  mongoose.models.SupportTicket ||
  mongoose.model<ISupportTicketModel>('SupportTicket', SupportTicketSchema);

export default SupportTicket;
