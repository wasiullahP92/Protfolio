import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongodInstance = null;

export const connectDB = async (uri) => {
  const mongoUri = uri || process.env.MONGO_URI;

  // 1. If remote MONGO_URI (e.g. MongoDB Atlas) is configured, connect to it
  if (mongoUri && !mongoUri.includes('localhost') && !mongoUri.includes('127.0.0.1')) {
    try {
      const conn = await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
      console.log(`[MongoDB Atlas] Connected successfully: ${conn.connection.host}/${conn.connection.name}`);
      return conn;
    } catch (err) {
      console.warn(`[MongoDB] Atlas connection error (${err.message}). Trying fallback...`);
    }
  }

  // 2. Attempt local MongoDB (fast 2-second timeout)
  try {
    const localUri = mongoUri || 'mongodb://127.0.0.1:27017/portfolio_wasi';
    const conn = await mongoose.connect(localUri, { serverSelectionTimeoutMS: 2000 });
    console.log(`[MongoDB Local] Connected successfully: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch {
    // 3. Automatically launch embedded in-memory MongoDB so developer has zero setup headaches!
    console.log('[MongoDB] No external MongoDB service detected. Initializing embedded database engine...');
    try {
      mongodInstance = await MongoMemoryServer.create();
      const memUri = mongodInstance.getUri();
      const conn = await mongoose.connect(memUri);
      console.log(`[MongoDB Embedded] In-memory database ready & connected!`);
      return conn;
    } catch (memErr) {
      console.error('[MongoDB Error]:', memErr.message);
      throw memErr;
    }
  }
};

