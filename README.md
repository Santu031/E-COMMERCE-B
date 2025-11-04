# Retail Relay Backend API

This is the backend API for the Retail Relay e-commerce platform, built with Node.js, Express, and MongoDB.

## Features

- User authentication (register, login, profile)
- Product management (CRUD operations)
- JWT-based authentication
- MongoDB database integration
- RESTful API design

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **TypeScript** - Typed superset of JavaScript
- **JWT** - JSON Web Tokens for authentication

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
5. Update the `.env` file with your configuration

### Running the Application

- **Development mode**:
  ```bash
  npm run dev
  ```

- **Production mode**:
  ```bash
  npm run build
  npm start
  ```

### API Endpoints

#### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/profile` - Get user profile (protected)

#### Products
- `GET /api/v1/products` - Get all products (with pagination and filtering)
- `GET /api/v1/products/:id` - Get a specific product
- `POST /api/v1/products` - Create a new product (admin only)
- `PUT /api/v1/products/:id` - Update a product (admin only)
- `DELETE /api/v1/products/:id` - Delete a product (admin only)

### Seeding Data

To populate the database with sample data:
```bash
npm run seed
```

This will create:
- 2 sample users (1 admin, 1 customer)
- 4 sample products

## Environment Variables

- `PORT` - Server port (default: 5002)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT signing
- `JWT_EXPIRES_IN` - JWT expiration time
- `ALLOWED_ORIGINS` - CORS allowed origins (comma-separated)

## Development

- **TypeScript**: Source files are in `src/` and compiled to `dist/`
- **Controllers**: Handle incoming requests and responses
- **Services**: Business logic implementation
- **Models**: Database schema definitions
- **Routes**: API endpoint definitions
- **Middleware**: Request processing functions

## 🚀 Quick Deploy to Vercel

**Ready to deploy!** This backend is fully configured for Vercel serverless deployment.

```bash
# Run pre-deployment check
./pre-deploy-check.sh

# Deploy to Vercel
vercel --prod
```

📚 **Deployment Guides:**
- [Quick Deploy (3 steps)](./QUICK_DEPLOY.md) - Start here!
- [Complete Guide](./VERCEL_DEPLOYMENT_GUIDE.md) - Detailed instructions
- [Deployment Checklist](./DEPLOYMENT_CHECKLIST.md) - Task checklist
- [Changes Summary](./VERCEL_CHANGES_SUMMARY.md) - What was optimized

## License

ISC
