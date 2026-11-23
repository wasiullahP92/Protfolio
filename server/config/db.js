import mongoose from 'mongoose';

export const connectDB = async (uri) => {
  const mongoUri = uri || process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio_wasi';

  try {
    const conn = await mongoose.connect(mongoUri, {
      autoIndex: true,
    });
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`[MongoDB] Connection Error: ${error.message}`);
    // Don't crash immediately in dev mode so memory server / diagnostics can run
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
    throw error;
  }
};

