import { connectToDatabase } from '@/lib/mongodb/mongoose';
import KnowledgeDocument from '@/models/KnowledgeDocument';
import KnowledgeChunk from '@/models/KnowledgeChunk';
import { splitTextIntoChunks, cleanContent } from './chunker';
import { generateBatchEmbeddings } from '@/lib/ai/embeddings';
import { DocumentSourceType } from '@/types';

export class KnowledgeService {
  /**
   * Tạo tài liệu mới, tự động cắt chunk và sinh Vector Embeddings
   */
  static async createDocument(data: {
    title: string;
    content: string;
    sourceType?: DocumentSourceType;
    sourceName?: string;
    category: string;
    tags?: string[];
    status?: 'ACTIVE' | 'INACTIVE' | 'DRAFT';
    createdBy: string;
    effectiveFrom?: Date;
    effectiveTo?: Date;
  }) {
    await connectToDatabase();

    const cleanedText = cleanContent(data.content);

    // 1. Tạo Document nguyên bản
    const doc = await KnowledgeDocument.create({
      ...data,
      content: cleanedText,
    });

    // 2. Chia nhỏ nội dung thành các chunk
    const rawChunks = splitTextIntoChunks(cleanedText);

    if (rawChunks.length > 0) {
      // 3. Sinh Vector Embeddings hàng loạt cho các chunk
      const embeddings = await generateBatchEmbeddings(rawChunks);

      // 4. Lưu từng chunk kèm embedding vector vào DB
      const chunkDocuments = rawChunks.map((chunkContent, idx) => ({
        documentId: doc._id,
        content: chunkContent,
        embedding: embeddings[idx],
        chunkIndex: idx,
        category: data.category,
        tags: data.tags || [],
        language: 'vi',
        status: data.status || 'ACTIVE',
        effectiveFrom: data.effectiveFrom,
        effectiveTo: data.effectiveTo,
      }));

      await KnowledgeChunk.insertMany(chunkDocuments);
    }

    return doc;
  }

  /**
   * Cập nhật tài liệu, xóa vector cũ & sinh lại Vector Embeddings mới
   */
  static async updateDocument(
    id: string,
    data: {
      title?: string;
      category?: string;
      content?: string;
      status?: 'ACTIVE' | 'INACTIVE' | 'DRAFT';
    }
  ) {
    await connectToDatabase();

    const existingDoc = await KnowledgeDocument.findById(id);
    if (!existingDoc) throw new Error('Không tìm thấy tài liệu');

    const updatedTitle = data.title || existingDoc.title;
    const updatedCategory = data.category || existingDoc.category;
    const updatedContent = data.content ? cleanContent(data.content) : existingDoc.content;
    const updatedStatus = data.status || existingDoc.status;

    // 1. Cập nhật record Document
    const updatedDoc = await KnowledgeDocument.findByIdAndUpdate(
      id,
      {
        title: updatedTitle,
        category: updatedCategory,
        content: updatedContent,
        status: updatedStatus,
      },
      { new: true }
    );

    // 2. Xóa toàn bộ Vector Chunks cũ
    await KnowledgeChunk.deleteMany({ documentId: id });

    // 3. Chia nhỏ nội dung mới và tái tạo Embeddings mới
    const rawChunks = splitTextIntoChunks(updatedContent);

    if (rawChunks.length > 0) {
      const embeddings = await generateBatchEmbeddings(rawChunks);

      const chunkDocuments = rawChunks.map((chunkContent, idx) => ({
        documentId: id,
        content: chunkContent,
        embedding: embeddings[idx],
        chunkIndex: idx,
        category: updatedCategory,
        tags: existingDoc.tags || [],
        language: 'vi',
        status: updatedStatus,
      }));

      await KnowledgeChunk.insertMany(chunkDocuments);
    }

    return updatedDoc;
  }

  /**
   * Lấy danh sách tài liệu kiến thức kèm phân trang
   */
  static async getDocuments(query: {
    page?: number;
    limit?: number;
    category?: string;
    status?: string;
    search?: string;
  }) {
    await connectToDatabase();
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (query.category) filter.category = query.category;
    if (query.status) filter.status = query.status;
    if (query.search) {
      filter.$or = [
        { title: { $regex: query.search, $options: 'i' } },
        { content: { $regex: query.search, $options: 'i' } },
      ];
    }

    const [documents, total] = await Promise.all([
      KnowledgeDocument.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      KnowledgeDocument.countDocuments(filter),
    ]);

    return {
      documents,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Xóa tài liệu và các vector chunks liên quan
   */
  static async deleteDocument(id: string) {
    await connectToDatabase();
    await Promise.all([
      KnowledgeDocument.findByIdAndDelete(id),
      KnowledgeChunk.deleteMany({ documentId: id }),
    ]);
    return true;
  }
}
