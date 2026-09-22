/**
 * Script tạo MongoDB Indexes để tối ưu query performance.
 * Chạy 1 lần sau khi deploy: npx ts-node src/scripts/create-indexes.ts
 *
 * Các indexes này giúp:
 * - messages: sort theo createdAt nhanh hơn khi lấy history
 * - conversations: filter theo session + status + sort lastMessageAt
 * - knowledgechunks: filter theo status + category cho vector search fallback
 * - knowledgedocuments: lookup nhanh theo _id (đã có mặc định)
 */

import { connectToDatabase } from '../lib/mongodb/mongoose';
import mongoose from 'mongoose';

async function createIndexes() {
  console.log('🔧 Connecting to MongoDB...');
  await connectToDatabase();
  const db = mongoose.connection.db!;

  console.log('\n📦 Creating indexes...\n');

  // ─── messages collection ───────────────────────────────────────────────────
  try {
    await db.collection('messages').createIndex(
      { conversationId: 1, createdAt: -1 },
      { background: true, name: 'messages_conv_created_idx' }
    );
    console.log('✅ messages: { conversationId, createdAt }');
  } catch (e: any) {
    console.warn('⚠️  messages index:', e.message);
  }

  // ─── conversations collection ──────────────────────────────────────────────
  try {
    await db.collection('conversations').createIndex(
      { anonymousSessionId: 1, status: 1, lastMessageAt: -1 },
      { background: true, name: 'conv_session_status_last_idx' }
    );
    console.log('✅ conversations: { anonymousSessionId, status, lastMessageAt }');
  } catch (e: any) {
    console.warn('⚠️  conversations index:', e.message);
  }

  try {
    await db.collection('conversations').createIndex(
      { lastMessageAt: -1 },
      { background: true, name: 'conv_last_msg_idx' }
    );
    console.log('✅ conversations: { lastMessageAt }');
  } catch (e: any) {
    console.warn('⚠️  conversations lastMessageAt index:', e.message);
  }

  // ─── knowledgechunks collection ───────────────────────────────────────────
  try {
    await db.collection('knowledgechunks').createIndex(
      { status: 1, category: 1 },
      { background: true, name: 'chunks_status_category_idx' }
    );
    console.log('✅ knowledgechunks: { status, category }');
  } catch (e: any) {
    console.warn('⚠️  knowledgechunks index:', e.message);
  }

  try {
    await db.collection('knowledgechunks').createIndex(
      { documentId: 1 },
      { background: true, name: 'chunks_documentId_idx' }
    );
    console.log('✅ knowledgechunks: { documentId }');
  } catch (e: any) {
    console.warn('⚠️  knowledgechunks documentId index:', e.message);
  }

  // ─── knowledgedocuments collection ────────────────────────────────────────
  try {
    await db.collection('knowledgedocuments').createIndex(
      { status: 1 },
      { background: true, name: 'docs_status_idx' }
    );
    console.log('✅ knowledgedocuments: { status }');
  } catch (e: any) {
    console.warn('⚠️  knowledgedocuments index:', e.message);
  }

  // ─── aiusagelogs collection ────────────────────────────────────────────────
  try {
    await db.collection('aiusagelogs').createIndex(
      { conversationId: 1, createdAt: -1 },
      { background: true, name: 'logs_conv_created_idx' }
    );
    console.log('✅ aiusagelogs: { conversationId, createdAt }');
  } catch (e: any) {
    console.warn('⚠️  aiusagelogs index:', e.message);
  }

  console.log('\n🎉 Done! All indexes created.\n');
  process.exit(0);
}

createIndexes().catch((err) => {
  console.error('❌ Error creating indexes:', err);
  process.exit(1);
});
