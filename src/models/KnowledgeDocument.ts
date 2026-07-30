import mongoose, { Schema, Model, Document } from 'mongoose';
import { IKnowledgeDocument } from '@/types';

export interface IKnowledgeDocumentModel extends Omit<IKnowledgeDocument, '_id'>, Document {}

const KnowledgeDocumentSchema = new Schema<IKnowledgeDocumentModel>(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    sourceType: {
      type: String,
      enum: ['TEXT', 'PDF', 'FAQ', 'URL'],
      default: 'TEXT',
    },
    sourceName: { type: String },
    category: { type: String, required: true, default: 'Chung', index: true },
    tags: [{ type: String, index: true }],
    language: { type: String, default: 'vi' },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE', 'DRAFT'],
      default: 'ACTIVE',
      index: true,
    },
    effectiveFrom: { type: Date },
    effectiveTo: { type: Date },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
);

KnowledgeDocumentSchema.index({ status: 1, category: 1 });

const KnowledgeDocument: Model<IKnowledgeDocumentModel> =
  mongoose.models.KnowledgeDocument ||
  mongoose.model<IKnowledgeDocumentModel>('KnowledgeDocument', KnowledgeDocumentSchema);

export default KnowledgeDocument;
