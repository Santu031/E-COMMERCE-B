# Retail Relay Backend

Backend API for the Retail Relay e-commerce platform built with Node.js, Express, TypeScript, and MongoDB.

## Features

- 🔐 JWT Authentication (login, register, profile)
- 👥 User Management
- 🛍️ Product Management
- 🔒 Role-based Access Control (Customer/Admin)
- 📦 MongoDB with Mongoose ODM
- 🛡️ Security with Helmet and CORS
- ✅ Input Validation
- 🎯 TypeScript for type safety

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/retail-relay
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key
JWT_EXPIRE=24h
JWT_REFRESH_EXPIRE=7d
ALLOWED_ORIGINS=http://localhost:8080,http://localhost:5173
```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

### Seed Database
```bash
npm run seed
```

This will create:
- 8 sample products
- Admin user: `admin@retailrelay.com` / `admin123`
- Customer user: `customer@example.com` / `customer123`

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/profile` - Get user profile (requires authentication)

### Products
- `GET /api/v1/products` - Get all products (with pagination, filtering)
- `GET /api/v1/products/:id` - Get product by ID
- `POST /api/v1/products` - Create product (admin only)
- `PUT /api/v1/products/:id` - Update product (admin only)
- `DELETE /api/v1/products/:id` - Delete product (admin only)

### Health Check
- `GET /health` - Server health status

## Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   │   ├── config.ts
│   │   └── database.ts
│   ├── controllers/     # Route controllers
│   │   ├── auth.controller.ts
│   │   └── product.controller.ts
│   ├── middleware/      # Custom middleware
│   │   ├── auth.ts
│   │   └── error.ts
│   ├── models/          # Mongoose models
│   │   ├── user.model.ts
│   │   └── product.model.ts
│   ├── routes/          # API routes
│   │   ├── auth.routes.ts
│   │   └── product.routes.ts
│   ├── services/        # Business logic
│   │   ├── auth.service.ts
│   │   └── product.service.ts
│   ├── scripts/         # Utility scripts
│   │   └── seed.ts
│   ├── app.ts           # Express app setup
│   └── server.ts        # Server entry point
├── .env.example
├── .gitignore
├── package.json
└── tsconfig.json
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| NODE_ENV | Environment mode | development |
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/retail-relay |
| JWT_SECRET | JWT secret key | - |
| JWT_REFRESH_SECRET | JWT refresh secret key | - |
| JWT_EXPIRE | JWT expiration time | 24h |
| JWT_REFRESH_EXPIRE | Refresh token expiration | 7d |
| ALLOWED_ORIGINS | CORS allowed origins | http://localhost:8080 |

## Technologies

- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger

## License

ISC
