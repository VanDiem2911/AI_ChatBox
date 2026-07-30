import fs from 'fs';
import path from 'path';
import { DUDI_KNOWLEDGE_DOCUMENTS } from '../data/dudi-knowledge';

export function generateAllMdFiles() {
  const outputDir = path.resolve(process.cwd(), 'knowledge_md');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(`[MD Generator] Starting to generate Markdown files for ${DUDI_KNOWLEDGE_DOCUMENTS.length} topics...`);

  DUDI_KNOWLEDGE_DOCUMENTS.forEach((doc, index) => {
    // Generate clean filename
    const cleanTitle = doc.title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "_")
      .replace(/-+/g, "_");

    const filePrefix = String(index + 1).padStart(2, '0');
    const fileName = `${filePrefix}_${cleanTitle}.md`;
    const filePath = path.join(outputDir, fileName);

    const markdownContent = `# ${doc.title}

- **Danh mục**: ${doc.category}
- **Thẻ/Tags**: ${doc.tags.join(', ')}
- **Nguồn dữ liệu**: ${doc.sourceName} (${doc.sourceType})

---

${doc.content}
`;

    fs.writeFileSync(filePath, markdownContent, 'utf-8');
    console.log(`  -> Generated: "${fileName}"`);
  });

  console.log(`[MD Generator] Generation complete! All files saved in: ${outputDir}`);
}

if (require.main === module) {
  generateAllMdFiles();
}
