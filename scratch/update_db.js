import mongoose from 'mongoose';

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio_db');
    const Project = mongoose.model('Project', new mongoose.Schema({}, { strict: false }));
    const res = await Project.updateMany({}, { $set: { githubUrl: 'https://github.com/wasiullahP92' } });
    console.log('Updated projects githubUrl:', res.modifiedCount);
  } catch (err) {
    console.log('Skipping standalone DB connection:', err.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

run();
