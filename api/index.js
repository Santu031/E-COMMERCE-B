// Serverless entry for Vercel (JavaScript)
// Loads the compiled Express app from dist and reuses a single MongoDB connection

// Load environment variables
require('dotenv').config();

let isConnecting = false;

// Lazy-load compiled files to avoid issues during Vercel build init
const getApp = () => require('../dist/app').default || require('../dist/app');
const { connectDB } = require('../dist/config/database');

const ensureDatabaseConnection = async () => {
  if (isConnecting) return;
  try {
    isConnecting = true;
    await connectDB();
  } finally {
    isConnecting = false;
  }
};

// Vercel handler
module.exports = async (req, res) => {
  try {
    await ensureDatabaseConnection();
    const app = getApp();
    return app(req, res);
  } catch (err) {
    console.error('Handler error:', err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: false, message: 'Internal server error' }));
  }
};


