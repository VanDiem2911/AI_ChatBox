export interface ChunkOptions {
  maxChunkSize?: number;
  overlapSize?: number;
}

export function cleanContent(text: string): string {
  if (!text) return '';
  return text
    .replace(/\r\n/g, '\n')
    .replace(/\t/g, ' ')
    .replace(/ +/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Chia văn bản thành các đoạn nhỏ (chunks) theo khối đoạn văn và kích thước ký tự
 */
export function splitTextIntoChunks(
  text: string,
  options: ChunkOptions = {}
): string[] {
  const maxChunkSize = options.maxChunkSize || 800;
  const overlapSize = options.overlapSize || 150;

  const cleaned = cleanContent(text);
  if (!cleaned) return [];

  if (cleaned.length <= maxChunkSize) {
    return [cleaned];
  }

  const chunks: string[] = [];
  const paragraphs = cleaned.split('\n\n');
  let currentChunk = '';

  for (const paragraph of paragraphs) {
    if ((currentChunk + '\n\n' + paragraph).length <= maxChunkSize) {
      currentChunk = currentChunk ? `${currentChunk}\n\n${paragraph}` : paragraph;
    } else {
      if (currentChunk) {
        chunks.push(currentChunk.trim());
      }

      // Handle single paragraph larger than maxChunkSize
      if (paragraph.length > maxChunkSize) {
        const sentenceChunks = splitBySentences(paragraph, maxChunkSize, overlapSize);
        chunks.push(...sentenceChunks);
        currentChunk = '';
      } else {
        // Create overlap from previous chunk end
        const overlap = currentChunk.slice(-overlapSize);
        currentChunk = overlap ? `${overlap}\n\n${paragraph}` : paragraph;
      }
    }
  }

  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

function splitBySentences(
  text: string,
  maxSize: number,
  overlap: number
): string[] {
  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g) || [text];
  const result: string[] = [];
  let current = '';

  for (const sentence of sentences) {
    if ((current + sentence).length <= maxSize) {
      current += sentence;
    } else {
      if (current) result.push(current.trim());
      const overlapText = current.slice(-overlap);
      current = overlapText + sentence;
    }
  }

  if (current.trim()) {
    result.push(current.trim());
  }

  return result;
}
