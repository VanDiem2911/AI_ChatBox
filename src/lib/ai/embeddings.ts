import {
  genAI,
  GEMINI_EMBEDDING_MODEL,
  openai,
  OPENAI_EMBEDDING_MODEL,
  AI_PROVIDER,
  GEMINI_API_KEY,
  ollamaClient,
  OLLAMA_EMBEDDING_MODEL,
  GEMINI_EMBEDDING_DIMENSIONS,
} from './client';

/**
 * Hàm sinh Vector giả lập dựa trên Hash (Mock fallback nếu AI offline hoặc chưa cài key)
 */
function createHashVector(text: string, dimensions = 768): number[] {
  const vec: number[] = new Array(dimensions).fill(0);
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }
  for (let i = 0; i < dimensions; i++) {
    const val = Math.sin(hash + i) * 10000;
    vec[i] = val - Math.floor(val) - 0.5;
  }
  const norm = Math.sqrt(vec.reduce((sum, v) => sum + v * v, 0));
  return vec.map((v) => (norm > 0 ? v / norm : 0));
}

/**
 * Sinh Vector Embedding cho một văn bản đơn lẻ
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const cleanedText = text.replace(/\n/g, ' ').trim();
  if (!cleanedText) return createHashVector('empty');

  // 1. Nếu cấu hình dùng Ollama Local AI
  if (AI_PROVIDER === 'ollama') {
    try {
      const response = await ollamaClient.embeddings({
        model: OLLAMA_EMBEDDING_MODEL,
        prompt: cleanedText,
      });
      if (response?.embedding && response.embedding.length > 0) {
        return response.embedding;
      }
    } catch (ollamaError: any) {
      console.warn('[Ollama Embedding Warning - Using Fallback Vector]:', ollamaError.message || ollamaError);
      return createHashVector(cleanedText, 768);
    }
  }

  // 2. Nếu dùng Gemini
  if (AI_PROVIDER === 'gemini' && GEMINI_API_KEY) {
    try {
      const model = genAI.getGenerativeModel({ model: GEMINI_EMBEDDING_MODEL });
      const response = await model.embedContent({
        content: { role: 'user', parts: [{ text: cleanedText }] },
        outputDimensionality: GEMINI_EMBEDDING_DIMENSIONS,
      } as any);
      if (response?.embedding?.values) {
        return response.embedding.values;
      }
    } catch (geminiError: any) {
      console.warn('[Gemini Embedding Warning]:', geminiError.message || geminiError);
      return createHashVector(cleanedText, 768);
    }
  }

  // 3. Nếu dùng OpenAI
  if (AI_PROVIDER === 'openai' && process.env.OPENAI_API_KEY) {
    try {
      const response = await openai.embeddings.create({
        model: OPENAI_EMBEDDING_MODEL,
        input: cleanedText,
      });
      return response.data[0].embedding;
    } catch (error: any) {
      console.warn('[OpenAI Embedding Warning - Using Fallback]:', error.message || error);
      return createHashVector(cleanedText, 1536);
    }
  }

  // Mặc định: Fallback Vector local
  return createHashVector(cleanedText, 768);
}

/**
 * Sinh Vector Embedding hàng loạt cho danh sách văn bản (Batch Embeddings)
 */
export async function generateBatchEmbeddings(texts: string[]): Promise<number[][]> {
  const cleanedTexts = texts.map((t) => t.replace(/\n/g, ' ').trim());
  if (cleanedTexts.length === 0) return [];

  if (AI_PROVIDER === 'ollama') {
    try {
      const results: number[][] = [];
      for (const text of cleanedTexts) {
        const response = await ollamaClient.embeddings({
          model: OLLAMA_EMBEDDING_MODEL,
          prompt: text,
        });
        results.push(response.embedding && response.embedding.length > 0 ? response.embedding : createHashVector(text, 768));
      }
      return results;
    } catch (ollamaErr: any) {
      console.warn('[Ollama Batch Embeddings Warning - Using Fallback]:', ollamaErr.message || ollamaErr);
      return cleanedTexts.map((t) => createHashVector(t, 768));
    }
  }

  if (AI_PROVIDER === 'gemini' && GEMINI_API_KEY) {
    try {
      const model = genAI.getGenerativeModel({ model: GEMINI_EMBEDDING_MODEL });
      const response = await model.batchEmbedContents({
        requests: cleanedTexts.map((text) => ({
          content: { role: 'user', parts: [{ text }] },
          model: `models/${GEMINI_EMBEDDING_MODEL}`,
          outputDimensionality: GEMINI_EMBEDDING_DIMENSIONS,
        })),
      } as any);

      if (response?.embeddings) {
        return response.embeddings.map((e) => e.values);
      }
    } catch (geminiError: any) {
      console.warn('[Gemini Batch Embeddings Warning]:', geminiError.message || geminiError);
      return cleanedTexts.map((t) => createHashVector(t, 768));
    }
  }

  if (AI_PROVIDER === 'openai' && process.env.OPENAI_API_KEY) {
    try {
      const response = await openai.embeddings.create({
        model: OPENAI_EMBEDDING_MODEL,
        input: cleanedTexts,
      });
      return response.data.map((item) => item.embedding);
    } catch (error: any) {
      console.warn('[OpenAI Batch Embeddings Warning - Using Fallback]:', error.message || error);
      return cleanedTexts.map((t) => createHashVector(t, 1536));
    }
  }

  return cleanedTexts.map((t) => createHashVector(t, 768));
}

