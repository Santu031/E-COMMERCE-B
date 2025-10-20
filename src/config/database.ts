import mongoose from 'mongoose';
import { config } from './config';

// Optimize for serverless environments
if (mongoose.connection.readyState === 0) {
  mongoose.set('strictQuery', false);
  // Buffer commands until connection is established
  mongoose.set('bufferCommands', false);
}

// Connection options for better reliability
const connectionOptions = {
  // Connection pool settings
  maxPoolSize: 10, // Maximum number of connections in the pool
  minPoolSize: 2,  // Minimum number of connections in the pool
  
  // Timeout settings
  serverSelectionTimeoutMS: 5000,  // Timeout for selecting server
  socketTimeoutMS: 45000,          // Close sockets after this time
  connectTimeoutMS: 30000,         // Timeout for initial connection
  
  // Retry settings
  retryWrites: true,
  retryReads: true,
  
  // Server settings
  autoIndex: config.env === 'development', // Only auto-index in development
  
  // Keep alive settings
  maxIdleTimeMS: 30000, // Close connections after 30 seconds of inactivity
};

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
    // Don't exit process in serverless environment
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
