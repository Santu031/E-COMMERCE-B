import app from '../src/app.js';
import { connectDB } from '../src/config/database.js';
import { Request, Response } from 'express';

// Track connection state for serverless optimization
let isConnecting = false;
let connectionPromise: Promise<void> | null = null;

const ensureDatabaseConnection = async () => {
  // If already connecting, wait for that connection
  if (isConnecting && connectionPromise) {
    return connectionPromise;
  }
  
  try {
    isConnecting = true;
    connectionPromise = connectDB();
    await connectionPromise;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    connectionPromise = null;
  } finally {
    isConnecting = false;
  }
};

// Create a wrapper to convert Vercel's request/response to Express
const expressHandler = (req: Request, res: Response) => {
  return new Promise((resolve) => {
    const originalSend = res.send;
    res.send = function (body) {
      resolve(body);
      return originalSend.call(this, body);
    };
    
    // Handle end event for responses without body
    res.on('finish', () => resolve(null));
    
    app(req, res);
  });
};

// Serverless function handler
const handler = async (req: Request, res: Response) => {
  try {
    // Ensure database is connected before handling requests
    await ensureDatabaseConnection();
    
    // Let Express handle the request
    await expressHandler(req, res);
  } catch (error) {
    console.error('Handler error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};

// Export the handler for Vercel
export default handler;