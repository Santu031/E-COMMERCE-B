import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 5004,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/retailrelay',
  jwtSecret: process.env.JWT_SECRET || 'retail_relay_jwt_secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  allowedOrigins: process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(',') 
    : ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:8080']
};