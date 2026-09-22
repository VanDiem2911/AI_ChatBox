import mongoose from 'mongoose';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

export async function connectToDatabase(): Promise<typeof mongoose> {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local'
    );
  }

  if (cached?.conn) {
    return cached.conn;
  }

  if (!cached?.promise) {
    const opts = {
      bufferCommands: false,
      dbName: process.env.MONGODB_DB_NAME || 'smartconsult_ai',
      // ✅ Tối ưu connection pool cho Vercel Serverless + MongoDB Free Tier
      maxPoolSize: 5,                // Free tier: tối đa 500 connections, giữ pool nhỏ để tránh exhausted
      minPoolSize: 1,
      serverSelectionTimeoutMS: 5000,  // Fail fast nếu không kết nối được
      socketTimeoutMS: 30000,
      connectTimeoutMS: 10000,
      heartbeatFrequencyMS: 30000,     // Giảm heartbeat để tiết kiệm tài nguyên
      maxIdleTimeMS: 60000,            // Đóng connection nhàn rỗi sau 60s (tốt cho serverless)
    };

    cached!.promise = mongoose.connect(MONGODB_URI!, opts).then((m) => {
      return m;
    });
  }

  try {
    cached!.conn = await cached!.promise;
  } catch (e) {
    cached!.promise = null;
    throw e;
  }

  return cached!.conn;
}

/**
 * Pre-warm MongoDB connection khi module được load.
 * Giúp giảm cold start latency trên Vercel Serverless.
 */
if (process.env.MONGODB_URI) {
  connectToDatabase().catch(() => {
    // Ignore warm-up errors, sẽ retry khi có request thực
  });
}
