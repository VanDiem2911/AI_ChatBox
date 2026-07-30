import mongoose, { Schema, Model, Document } from 'mongoose';
import { IKnowledgeChunkDocument } from '@/types';

export interface IKnowledgeChunkModel extends Omit<IKnowledgeChunkDocument, '_id'>, Document {}

const KnowledgeChunkSchema = new Schema<IKnowledgeChunkModel>(
  {
    documentId: {
      type: Schema.Types.ObjectId,
      ref: 'KnowledgeDocument',
      required: true,
      index: true,
    },
    content: { type: String, required: true },
    embedding: { type: [Number], required: true }, // Array 1536 dims for text-embedding-3-small
    chunkIndex: { type: Number, required: true },
    category: { type: String, required: true, index: true },
    tags: [{ type: String }],
    language: { type: String, default: 'vi' },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE', 'DRAFT'],
      default: 'ACTIVE',
      index: true,
    },
    effectiveFrom: { type: Date },
    effectiveTo: { type: Date },
  },
  {
    timestamps: true,
  }
);

// Indexes for regular filtering alongside Atlas Vector Search
KnowledgeChunkSchema.index({ status: 1, effectiveFrom: 1, effectiveTo: 1 });

const KnowledgeChunk: Model<IKnowledgeChunkModel> =
  mongoose.models.KnowledgeChunk ||
  mongoose.model<IKnowledgeChunkModel>('KnowledgeChunk', KnowledgeChunkSchema);

export default KnowledgeChunk;
