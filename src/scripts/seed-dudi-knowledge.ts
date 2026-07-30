import fs from 'fs';
import path from 'path';

// Parse .env.local manually
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
import { DUDI_KNOWLEDGE_DOCUMENTS } from '../data/dudi-knowledge';
import bcrypt from 'bcryptjs';

export async function seedDudiKnowledge() {
  console.log('[Seed DUDI] Connecting to MongoDB database...');
  await connectToDatabase();

  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@smartconsult.ai').toLowerCase();
  let adminUser = await User.findOne({ email: adminEmail });

  if (!adminUser) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('AdminSecurePass123!', salt);
    adminUser = await User.create({
      name: 'System Administrator',
      email: adminEmail,
      passwordHash,
      role: 'ADMIN',
      status: 'ACTIVE',
    });
    console.log(`[Seed DUDI] Admin user created: ${adminUser.email}`);
  }

  console.log('[Seed DUDI] Cleaning old sample knowledge documents...');
  // Clean documents created by previous seeds to ensure clean state
  const existingDocs = await KnowledgeDocument.find({});
  for (const doc of existingDocs) {
    await KnowledgeChunk.deleteMany({ documentId: doc._id });
    await KnowledgeDocument.findByIdAndDelete(doc._id);
  }

  console.log(`[Seed DUDI] Seeding ${DUDI_KNOWLEDGE_DOCUMENTS.length} DUDI SOFTWARE documents...`);

  for (const docData of DUDI_KNOWLEDGE_DOCUMENTS) {
    const doc = await KnowledgeService.createDocument({
      title: docData.title,
      category: docData.category,
      tags: docData.tags,
      content: docData.content,
      sourceType: docData.sourceType,
      sourceName: docData.sourceName,
      status: 'ACTIVE',
      createdBy: adminUser._id.toString(),
    });
    console.log(`  -> Indexed Document: "${doc.title}" (ID: ${doc._id})`);
  }

  const totalDocs = await KnowledgeDocument.countDocuments();
  const totalChunks = await KnowledgeChunk.countDocuments();

  console.log(`[Seed DUDI] Seeding Complete! Total Documents: ${totalDocs}, Total Chunks: ${totalChunks}`);
  return { success: true, totalDocs, totalChunks };
}

if (require.main === module) {
  seedDudiKnowledge()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('[Seed DUDI] Error during seeding:', err);
      process.exit(1);
    });
}
