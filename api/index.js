// Serverless entry for Vercel (JavaScript)
// This file is used by Vercel to run the serverless function

// Load environment variables
require('dotenv').config();

let isConnecting = false;
let connectionPromise = null;

// Import the compiled app and database modules
const app = require('../dist/src/app').default || require('../dist/src/app');
const { connectDB } = require('../dist/src/config/database');

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
    throw error;
  } finally {
    isConnecting = false;
  }
};

// Serverless function handler
module.exports = async (req, res) => {
  try {
    // Ensure database is connected before handling requests
    await ensureDatabaseConnection();
    
    // Let Express handle the request
    return app(req, res);
  } catch (error) {
    console.error('Handler error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};