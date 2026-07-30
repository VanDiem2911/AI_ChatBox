import fs from 'fs';
import path from 'path';

// Parse .env.local manually for database connection
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8');
  for (const line of envConfig.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const [key, ...values] = trimmed.split('=');
      process.env[key.trim()] = values.join('=').trim();
    }
  }
}

import { connectToDatabase } from '../lib/mongodb/mongoose';
import User from '../models/User';
import KnowledgeDocument from '../models/KnowledgeDocument';
import KnowledgeChunk from '../models/KnowledgeChunk';
import { KnowledgeService } from '../features/knowledge/knowledge.service';

export async function loadMarkdownKnowledgeFiles() {
  console.log('[Markdown Loader] Connecting to MongoDB database...');
  await connectToDatabase();

  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@smartconsult.ai').toLowerCase();
  let adminUser = await User.findOne({ email: adminEmail });
  if (!adminUser) {
    adminUser = await User.findOne({});
  }

  const knowledgeDir = path.resolve(process.cwd(), 'knowledge_md');
  if (!fs.existsSync(knowledgeDir)) {
    console.warn(`[Markdown Loader] Directory ${knowledgeDir} does not exist.`);
    return;
  }

  const files = fs.readdirSync(knowledgeDir).filter(file => file.endsWith('.md'));
  console.log(`[Markdown Loader] Found ${files.length} markdown files in ${knowledgeDir}`);

  for (const file of files) {
    const filePath = path.join(knowledgeDir, file);
    const rawContent = fs.readFileSync(filePath, 'utf-8').trim();
    if (!rawContent) continue;

    // Extract title from first line (# Title)
    const titleMatch = rawContent.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1].trim() : file.replace('.md', '');

    // Determine category based on document contents first
    const catMatch = rawContent.match(/^-\s+\*\*Danh mục\*\*:\s*(.+)$/m);
    let category = catMatch ? catMatch[1].trim() : 'Thông tin doanh nghiệp';

    // Fallback if not found in content
    if (!catMatch) {
      if (file.includes('dich_vu')) category = 'Dịch vụ & Công nghệ';
      else if (file.includes('quy_trinh')) category = 'Quy trình & Báo giá';
      else if (file.includes('phap_luat')) category = 'Kho Dự Án - Tư vấn Pháp luật';
      else if (file.includes('bat_dong_san')) category = 'Kho Dự Án - Bất động sản';
      else if (file.includes('ecommerce')) category = 'Kho Dự Án - Thời trang';
      else if (file.includes('khach_san')) category = 'Kho Dự Án - Khách sạn & Homestay';
    }


    // Delete existing document with same title if present
    const existingDoc = await KnowledgeDocument.findOne({ title });
    if (existingDoc) {
      await KnowledgeChunk.deleteMany({ documentId: existingDoc._id });
      await KnowledgeDocument.findByIdAndDelete(existingDoc._id);
    }

    const doc = await KnowledgeService.createDocument({
      title,
      category,
      tags: ['markdown', category.toLowerCase(), 'dudi software'],
      content: rawContent,
      sourceType: 'TEXT',
      sourceName: `knowledge_md/${file}`,
      status: 'ACTIVE',
      createdBy: adminUser ? adminUser._id.toString() : 'system',
    });


    console.log(`  -> Successfully ingested Markdown file: "${file}" as Document ID: ${doc._id}`);
  }

  const totalDocs = await KnowledgeDocument.countDocuments();
  const totalChunks = await KnowledgeChunk.countDocuments();
  console.log(`[Markdown Loader] Total Active Documents: ${totalDocs}, Total Chunks: ${totalChunks}`);
}

if (require.main === module) {
  loadMarkdownKnowledgeFiles()
    .then(() => process.exit(0))
    .catch(err => {
      console.error('[Markdown Loader] Error loading Markdown files:', err);
      process.exit(1);
    });
}
