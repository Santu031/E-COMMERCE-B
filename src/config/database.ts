import mongoose from 'mongoose';
import { config } from './config';

// Optimize for serverless environments
if (mongoose.connection.readyState === 0) {
  mongoose.set('strictQuery', false);
  // Buffer commands until connection is established
  mongoose.set('bufferCommands', false);
}

export const connectDB = async (): Promise<void> => {
  try {
    // Reuse existing connection if available (important for serverless)
    if (mongoose.connection.readyState === 1) {
      console.log('✅ Using existing MongoDB connection');
      return;
    }

    if (mongoose.connection.readyState === 2) {
      console.log('⏳ MongoDB connection in progress...');
      return;
    }

    await mongoose.connect(config.mongoUri, {
      // Optimize for serverless
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    // Don't exit process in serverless environment
    if (config.env !== 'production') {
      throw error;
    }
  }
};
