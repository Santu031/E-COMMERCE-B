import dotenv from 'dotenv';

dotenv.config();

// Helper function to get environment variable with fallback
const getEnvVar = (name: string, fallback: string): string => {
  return process.env[name] || fallback;
};

// Helper function to get environment variable as number with fallback
const getEnvVarAsNumber = (name: string, fallback: number): number => {
  const value = process.env[name];
  return value ? parseInt(value, 10) : fallback;
};

export const config = {
  env: getEnvVar('NODE_ENV', 'development'),
  port: getEnvVarAsNumber('PORT', 5002),
  mongoUri: getEnvVar('MONGODB_URI', 'mongodb://localhost:27017/retail-relay'),
  jwt: {
    secret: getEnvVar('JWT_SECRET', 'your-secret-key'),
    refreshSecret: getEnvVar('JWT_REFRESH_SECRET', 'your-refresh-secret-key'),
    expire: getEnvVar('JWT_EXPIRE', '24h'),
    refreshExpire: getEnvVar('JWT_REFRESH_EXPIRE', '7d'),
  },
  cors: {
    allowedOrigins: process.env.ALLOWED_ORIGINS 
      ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
      : ['http://localhost:8080', 'http://localhost:5173'],
  },
};