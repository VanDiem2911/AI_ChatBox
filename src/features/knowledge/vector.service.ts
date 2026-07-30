import clientPromise from '@/lib/mongodb/client';
import { connectToDatabase } from '@/lib/mongodb/mongoose';
import KnowledgeChunk from '@/models/KnowledgeChunk';
import KnowledgeDocument from '@/models/KnowledgeDocument';
import { generateEmbedding } from '@/lib/ai/embeddings';

export interface VectorSearchResult {
  chunkId: string;
  documentId: string;
  title: string;
  content: string;
  category: string;
  score: number;
}

export class VectorService {
  /**
   * Tính điểm Cosine Similarity giữa 2 mảng Vector
   */
  static cosineSimilarity(vecA: number[], vecB: number[]): number {
    if (!vecA || !vecB || vecA.length !== vecB.length) return 0;
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }
    if (normA === 0 || normB === 0) return 0;
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  /**
   * Truy vấn Semantic Vector Search bằng MongoDB Atlas $vectorSearch
   * Có cơ chế fallback Cosine Similarity in-memory khi chạy ở môi trường Local dev chưa có Atlas Vector Search Index.
   */
  static async searchSimilarChunks(
    queryText: string,
    options: {
      topK?: number;
      similarityThreshold?: number;
      category?: string;
      /** When provided, only chunks whose category is in this list are scored */
      categories?: string[];
      queryVector?: number[];
    } = {}
  ): Promise<VectorSearchResult[]> {
    const topK = options.topK || 4;
    const similarityThreshold = options.similarityThreshold || 0.65;

    // 1. Generate Query Vector Embedding
    const queryVector = options.queryVector || await generateEmbedding(queryText);

    try {
      // 2. Try Atlas Vector Search Aggregation Pipeline
      const client = await clientPromise;
      const db = client.db(process.env.MONGODB_DB_NAME || 'smartconsult_ai');
      const collection = db.collection('knowledgechunks');

      const atlasFilter: any = { status: 'ACTIVE' };
      if (options.categories && options.categories.length > 0) {
        atlasFilter.category = { $in: options.categories };
      } else if (options.category) {
        atlasFilter.category = options.category;
      }

      const pipeline: any[] = [
        {
          $vectorSearch: {
            index: 'vector_index',
            path: 'embedding',
            queryVector: queryVector,
            numCandidates: topK * 10,
            limit: topK,
            filter: atlasFilter,
          },
        },
        {
          $project: {
            _id: 1,
            documentId: 1,
            content: 1,
            category: 1,
            score: { $meta: 'vectorSearchScore' },
          },
        },
        {
          $match: {
            score: { $gte: similarityThreshold },
          },
        },
      ];

      const atlasResults = await collection.aggregate(pipeline).toArray();

      if (atlasResults && atlasResults.length > 0) {
        await connectToDatabase();
        const results: VectorSearchResult[] = [];
        for (const item of atlasResults) {
          const doc = await KnowledgeDocument.findById(item.documentId).lean();
          results.push({
            chunkId: item._id.toString(),
            documentId: item.documentId.toString(),
            title: doc?.title || 'Tài liệu kiến thức',
            content: item.content,
            category: item.category || 'Chung',
            score: item.score,
          });
        }
        return results;
      }
    } catch (atlasError) {
      console.warn(
        '[Atlas Vector Search Exception / Local Fallback Active]:',
        (atlasError as any)?.errorResponse?.errmsg || atlasError
      );
    }

    // 3. Fallback: Hybrid Local Vector + Keyword Match for Local Mongo
    await connectToDatabase();

    // If category whitelist is provided, pre-filter at DB level for performance
    const dbFilter: any = { status: 'ACTIVE' };
    if (options.categories && options.categories.length > 0) {
      dbFilter.category = { $in: options.categories };
    } else if (options.category) {
      dbFilter.category = options.category;
    }
    const activeChunks = await KnowledgeChunk.find(dbFilter).lean();

    const STOP_WORDS = new Set([
      'bạn', 'ban', 'cho', 'mình', 'minh', 'xin', 'của', 'cua', 'và', 'va', 'có', 'co',
      'không', 'khong', 'gì', 'gi', 'ở', 'o', 'đâu', 'dau', 'là', 'la', 'bao', 'nhiêu',
      'nhieu', 'nào', 'nao', 'chưa', 'chua', 'cụ', 'cu', 'thể', 'the', 'nhé', 'nhe',
      'với', 'voi', 'từng', 'tung', 'làm', 'lam', 'xem', 'thử', 'thu', 'tôi', 'toi',
      'anh', 'em', 'chị', 'chi', 'cái', 'cai', 'này', 'nay', 'về', 've', 'nữa', 'nua',
      'what', 'is', 'can', 'you', 'please', 'give', 'me', 'some', 'did', 'in', 'and', 'or', 'for',
      'trang', 'web', 'du', 'an', 'cung', 'cap', 'ho', 'tro', 'cac', 'tat', 'mot', 'hai',
    ]);

    // Normalize Vietnamese diacritics for better matching
    function normVi(s: string): string {
      return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'd').toLowerCase();
    }

    const normalizedQuery = normVi(queryText);
    const rawTerms = normalizedQuery.split(/[\s,?.!]+/).filter((t) => t.length > 2);
    const queryTerms = rawTerms.filter((t) => !STOP_WORDS.has(t) && !STOP_WORDS.has(normVi(t)));
    const effectiveTerms = queryTerms.length > 0 ? queryTerms : rawTerms;

    const scoredChunks: VectorSearchResult[] = [];

    for (const chunk of activeChunks) {
      let score = this.cosineSimilarity(queryVector, chunk.embedding);

      const doc = await KnowledgeDocument.findById(chunk.documentId).lean();
      const docTitleRaw = doc?.title || '';
      const docTagsRaw = (doc?.tags || []).join(' ');
      const categoryRaw = chunk.category || '';

      const chunkTextNorm = normVi(
        chunk.content + ' ' + categoryRaw + ' ' + docTitleRaw + ' ' + docTagsRaw
      );
      const categoryNorm = normVi(categoryRaw);
      const docTitleNorm = normVi(docTitleRaw);

      let keywordHits = 0;
      let titleCatHits = 0;
      for (const term of effectiveTerms) {
        if (chunkTextNorm.includes(term)) keywordHits++;
        if (docTitleNorm.includes(term) || categoryNorm.includes(term)) titleCatHits++;
      }

      if (effectiveTerms.length > 0 && keywordHits > 0) {
        const keywordScore = (keywordHits / effectiveTerms.length) * 0.90;
        score = Math.max(score, keywordScore);
        // Title/category match is a strong signal
        score += titleCatHits * 0.15;
      }

      if (score >= 0.15 || keywordHits > 0) {
        scoredChunks.push({
          chunkId: chunk._id.toString(),
          documentId: chunk.documentId.toString(),
          title: doc?.title || 'Tài liệu kiến thức',
          content: chunk.content,
          category: chunk.category,
          score,
        });
      }
    }

    // Sort descending by similarity score
    scoredChunks.sort((a, b) => b.score - a.score);

    // Final fallback: If no chunks hit threshold, return top chunks from db
    if (scoredChunks.length === 0 && activeChunks.length > 0) {
      for (const chunk of activeChunks.slice(0, topK)) {
        const doc = await KnowledgeDocument.findById(chunk.documentId).lean();
        scoredChunks.push({
          chunkId: chunk._id.toString(),
          documentId: chunk.documentId.toString(),
          title: doc?.title || 'Tài liệu kiến thức',
          content: chunk.content,
          category: chunk.category,
          score: 0.5,
        });
      }
    }

    return scoredChunks.slice(0, topK);
  }
}
