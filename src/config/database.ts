import mongoose from 'mongoose';
import { config } from './config';

// Connection options optimized for serverless environments
const connectionOptions = {
  // Connection pool settings - keep small for serverless
  maxPoolSize: 5,
  minPoolSize: 1,
  
  // Timeout settings
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 30000,
  
  // Retry settings
  retryWrites: true,
  retryReads: true,
  
  // Server settings
  autoIndex: false, // Disable auto-index in production
  
  // Keep alive settings
  maxIdleTimeMS: 30000,
};

export const connectDB = async (): Promise<void> => {
  try {
    // In serverless environments, we want to reuse connections
    // Check if we're already connected
    if (mongoose.connection.readyState === 1) {
      console.log('✅ Using existing MongoDB connection');
      return;
    }

    // Check if connection is in progress
    if (mongoose.connection.readyState === 2) {
      console.log('⏳ MongoDB connection in progress...');
      // Wait a bit and then return
      await new Promise(resolve => setTimeout(resolve, 1000));
      return;
    }

    // Connect to MongoDB
    await mongoose.connect(config.mongoUri, connectionOptions);
    console.log('✅ MongoDB connected successfully');
    
    // Log connection details in development
    if (config.env === 'development') {
      const db = mongoose.connection;
      console.log(`📊 MongoDB Details:`);
      console.log(`   Host: ${db.host}`);
      console.log(`   Name: ${db.name}`);
      console.log(`   Port: ${db.port}`);
      console.log(`   Ready State: ${db.readyState}`);
    }
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    // Don't throw error in production to prevent function crashes
    if (config.env !== 'production') {
      throw error;
    }
  }
};

// Gracefully close MongoDB connection
export const closeDB = async (): Promise<void> => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
    console.log('✅ MongoDB connection closed');
  }
};