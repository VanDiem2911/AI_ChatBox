export interface ProjectKnowledgeChunk {
  content: string;
  category?: string;
}

export interface ProjectSummary {
  title: string;
  url: string;
  description: string;
}

function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
}

const GENERIC_PROJECT_QUERY_TERMS = new Set([
  'anh',
  'ban',
  'ben',
  'cac',
  'cho',
  'co',
  'cong',
  'dudi',
  'du',
  'duoc',
  'em',
  'gui',
  'khong',
  'ko',
  'link',
  'mau',
  'mot',
  'nao',
  'phan',
  'project',
  'software',
  'tham',
  'toi',
  'trang',
  'van',
  'web',
  'website',
  'xem',
]);

const PROJECT_DOMAIN_RULES: Array<{ phrases: string[]; relatedTerms: string[] }> = [
  {
    phrases: ['bat dong san'],
    relatedTerms: [
      'bat dong san',
      'can ho',
      'khu do thi',
      'nha pho',
      'dat nen',
      'cho thue',
      'mua ban nha',
      'moi gioi',
      'nha dat',
      'chung cu',
    ],
  },
  {
    phrases: ['nha khoa'],
    relatedTerms: ['nha khoa', 'rang', 'implant', 'nieng rang'],
  },
  {
    phrases: ['phong kham tham my', 'tham my', 'benh vien tham my'],
    relatedTerms: ['tham my', 'benh vien tham my'],
  },
  {
    phrases: ['lam dep', 'spa', 'my pham', 'cham soc da'],
    relatedTerms: ['lam dep', 'spa', 'sac dep', 'my pham', 'cham soc da', 'tham my'],
  },
  {
    phrases: ['phong kham', 'suc khoe', 'y te'],
    relatedTerms: ['phong kham', 'suc khoe', 'y te', 'bac si', 'benh vien', 'dat lich', 'nha khoa'],
  },
  {
    phrases: ['giao duc', 'ngoai ngu', 'tieng anh', 'e learning', 'elearning', 'lms', 'hoc truc tuyen'],
    relatedTerms: ['giao duc', 'ngoai ngu', 'tieng anh', 'e learning', 'elearning', 'lms', 'hoc truc tuyen', 'khoa hoc', 'dao tao'],
  },
  {
    phrases: ['thuc pham', 'thuc pham sach', 'f b', 'do an', 'nha hang'],
    relatedTerms: ['thuc pham', 'thuc pham sach', 'huu co', 'rau cu', 'trai cay', 'hai san', 'do an', 'nha hang', 'f b'],
  },
  {
    phrases: ['loyalty', 'tich diem', 'doi qua', 'thanh vien'],
    relatedTerms: ['loyalty', 'tich diem', 'doi qua', 'rewards', 'mylg'],
  },
  {
    phrases: ['ban hang da kenh', 'thuong mai dien tu', 'e commerce', 'ecommerce', 'ban hang'],
    relatedTerms: ['ban hang', 'thuong mai dien tu', 'e commerce', 'ecommerce', 'don hang', 'san pham', 'gio hang'],
  },
  {
    phrases: ['du lich'],
    relatedTerms: ['du lich', 'tour', 'khach san', 've may bay', 'booking'],
  },
  {
    phrases: ['o to'],
    relatedTerms: ['o to', 'xe', 'showroom', 'oto'],
  },
];

function cleanProjectTitle(rawTitle: string): string {
  return rawTitle
    .replace(/^:\s*/, '')
    .replace(/:\s*$/, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function isValidProjectTitle(title: string): boolean {
  const normalizedTitle = normalizeText(title);

  return (
    title.length >= 3 &&
    !normalizedTitle.includes('mo ta chi tiet') &&
    !normalizedTitle.includes('chi tiet') &&
    !normalizedTitle.includes('truc tuyen') &&
    !normalizedTitle.includes('gio truc tuyen')
  );
}

function extractDescription(block: string): string {
  const descMatch = block.match(/(?:Mô tả chi tiết|Mo ta chi tiet|MÃ´ táº£ chi tiáº¿t):\s*([\s\S]*)/i);
  const rawDescription = descMatch ? descMatch[1] : '';
  const description = rawDescription
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !/^URL\s*\/\s*Link\s*:/i.test(line))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();

  return description || 'Dự án thiết kế website & ứng dụng phần mềm chuyên nghiệp do DUDI SOFTWARE triển khai.';
}

function getRequiredDomainTerms(queryText: string): string[] {
  const normalizedQuery = normalizeText(queryText);
  const matchedRule = PROJECT_DOMAIN_RULES.find((rule) =>
    rule.phrases.some((phrase) => normalizedQuery.includes(phrase))
  );

  return matchedRule?.relatedTerms || [];
}

function getProjectMatchScore(
  project: ProjectSummary,
  block: string,
  chunk: ProjectKnowledgeChunk,
  queryTerms: string[],
  requiredDomainTerms: string[]
): number {
  const haystack = normalizeText([
    project.title,
    project.description,
    block,
    chunk.category || '',
  ].join(' '));
  const terms = requiredDomainTerms.length > 0 ? requiredDomainTerms : queryTerms;

  if (terms.length === 0) {
    return 1;
  }

  return terms.reduce((score, term) => score + (haystack.includes(term) ? 1 : 0), 0);
}

export function extractProjectsFromKnowledge(
  chunks: ProjectKnowledgeChunk[],
  queryText: string,
  limit = 5
): ProjectSummary[] {
  const requiredDomainTerms = getRequiredDomainTerms(queryText);
  const queryTerms = normalizeText(queryText)
    .split(/[\s,?.!]+/)
    .filter((term) => term.length > 1)
    .filter((term) => !GENERIC_PROJECT_QUERY_TERMS.has(term));

  const candidates: Array<{ project: ProjectSummary; score: number; order: number }> = [];
  const seenKeys = new Set<string>();
  let order = 0;

  for (const chunk of chunks) {
    const blocks = chunk.content.split(/(?=\d+\.\s*(?:Dự án|Du an|Dá»± Ã¡n)\s+)/g);

    for (const rawBlock of blocks) {
      const block = rawBlock.trim();
      const titleMatch = block.match(/^(\d+)\.\s*(?:Dự án|Du an|Dá»± Ã¡n)\s+([^:\n]+):?/i);
      const urlMatch = block.match(/(?:URL\s*\/\s*Link|URL|Link):\s*(https?:\/\/[^\s\n]+)/i);

      if (!titleMatch || !urlMatch) {
        continue;
      }

      const title = cleanProjectTitle(titleMatch[2]);
      const url = urlMatch[1].trim();

      if (!isValidProjectTitle(title)) {
        continue;
      }

      const project = {
        title,
        url,
        description: extractDescription(block),
      };

      const projectKey = `${normalizeText(project.title)}|${normalizeText(project.url)}`;
      const score = getProjectMatchScore(project, block, chunk, queryTerms, requiredDomainTerms);

      if (score > 0 && !seenKeys.has(projectKey)) {
        seenKeys.add(projectKey);
        candidates.push({ project, score, order });
      }

      order += 1;
    }
  }

  return candidates
    .sort((a, b) => b.score - a.score || a.order - b.order)
    .slice(0, limit)
    .map((candidate) => candidate.project);
}
