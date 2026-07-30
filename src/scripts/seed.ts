import { connectToDatabase } from '../lib/mongodb/mongoose';
import User from '../models/User';
import KnowledgeDocument from '../models/KnowledgeDocument';
import { KnowledgeService } from '../features/knowledge/knowledge.service';
import bcrypt from 'bcryptjs';

import { seedDudiKnowledge } from './seed-dudi-knowledge';

export async function seedAdminUser() {
  await connectToDatabase();

  const adminEmails = [
    (process.env.ADMIN_EMAIL || 'admin@dudisoftware.com').toLowerCase(),
    'admin@dudisoftware.com',
    'admin@smartconsult.ai'
  ];
  const adminPassword = process.env.ADMIN_PASSWORD || 'AdminSecurePass123!';
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(adminPassword, salt);

  for (const email of Array.from(new Set(adminEmails))) {
    let adminUser = await User.findOne({ email });
    if (!adminUser) {
      adminUser = await User.create({
        name: 'DUDI Administrator',
        email,
        passwordHash,
        role: 'ADMIN',
        status: 'ACTIVE',
      });
      console.log(`[Seed] Admin user created: ${adminUser.email}`);
    }
  }

  // Seed DUDI Software Knowledge Documents if empty
  const docCount = await KnowledgeDocument.countDocuments();
  if (docCount === 0) {
    console.log('[Seed] Seeding DUDI SOFTWARE business knowledge documents...');
    await seedDudiKnowledge();
  }

  return {
    success: true,
    message: `Admin accounts and knowledge base ready.`,
  };
}

