import app from '../src/app';
import { connectDB } from '../src/config/database';

// Connect to database once (Vercel will cache this)
let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) {
    return;
  }
  
  try {
    await connectDB();
    isConnected = true;
    console.log('✅ Database connected');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    // Don't throw - allow health check to work
  }
};

// Initialize database connection
connectToDatabase();

// Export the Express app as a serverless function
export default app;
