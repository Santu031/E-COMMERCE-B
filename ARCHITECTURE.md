# Backend Architecture

## System Overview

The Retail Relay backend is built using a **layered architecture** pattern with clear separation of concerns.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND                                 │
│                  (React + Vite + TypeScript)                     │
└────────────────────────┬────────────────────────────────────────┘
                         │ HTTP/HTTPS
                         │ (JSON)
┌────────────────────────▼────────────────────────────────────────┐
│                     API GATEWAY                                  │
│                    (Express Router)                              │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  CORS  │  Helmet  │  Morgan  │  Body Parser              │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────────┘
                         │
        ┌────────────────┴────────────────┐
        │                                  │
┌───────▼────────┐              ┌─────────▼────────┐
│  Auth Routes   │              │  Product Routes  │
│  /api/v1/auth  │              │  /api/v1/products│
└───────┬────────┘              └─────────┬────────┘
        │                                  │
┌───────▼────────┐              ┌─────────▼────────┐
│ Auth Middleware│◄─────────────┤ Auth Middleware  │
│  (JWT Check)   │              │ + Authorization  │
└───────┬────────┘              └─────────┬────────┘
        │                                  │
┌───────▼────────┐              ┌─────────▼────────┐
│     Auth       │              │     Product      │
│   Controller   │              │   Controller     │
└───────┬────────┘              └─────────┬────────┘
        │                                  │
┌───────▼────────┐              ┌─────────▼────────┐
│     Auth       │              │     Product      │
│    Service     │              │    Service       │
└───────┬────────┘              └─────────┬────────┘
        │                                  │
        └────────────────┬─────────────────┘
                         │
                ┌────────▼─────────┐
                │   Mongoose ODM   │
                └────────┬─────────┘
                         │
                ┌────────▼─────────┐
                │     MongoDB      │
                │   (Database)     │
                └──────────────────┘
```

## Layer Responsibilities

### 1. **API Gateway Layer** (`app.ts`)
- Request routing
- Middleware configuration
- CORS handling
- Security headers (Helmet)
- Request logging (Morgan)
- Error handling

### 2. **Routes Layer** (`routes/`)
- Endpoint definitions
- Route-level middleware
- Request validation
- Authorization checks

**Files:**
- `auth.routes.ts` - Authentication endpoints
- `product.routes.ts` - Product management endpoints

### 3. **Middleware Layer** (`middleware/`)
- Authentication verification
- Authorization checks
- Error handling
- Request transformation

**Files:**
- `auth.ts` - JWT verification & role-based access
- `error.ts` - Global error handler

### 4. **Controller Layer** (`controllers/`)
- HTTP request/response handling
- Input validation
- Response formatting
- Status code management

**Files:**
- `auth.controller.ts` - Register, login, profile
- `product.controller.ts` - CRUD operations

### 5. **Service Layer** (`services/`)
- Business logic
- Data processing
- External service integration
- Transaction management

**Files:**
- `auth.service.ts` - User authentication, token generation
- `product.service.ts` - Product operations

### 6. **Model Layer** (`models/`)
- Data schema definitions
- Database validation
- Model methods
- Virtual properties

**Files:**
- `user.model.ts` - User schema
- `product.model.ts` - Product schema

### 7. **Configuration Layer** (`config/`)
- Environment variables
- Database connection
- Application settings

**Files:**
- `config.ts` - Environment configuration
- `database.ts` - MongoDB connection

## Data Flow

### Authentication Flow

```
1. Client sends credentials
   POST /api/v1/auth/login
   ↓
2. Auth Routes → Auth Controller
   ↓
3. Auth Controller → Auth Service
   ↓
4. Auth Service:
   - Validates credentials
   - Checks password (bcrypt)
   - Generates JWT tokens
   ↓
5. Returns: User object + Tokens
   ↓
6. Client stores token
```

### Protected Resource Access

```
1. Client sends request with token
   GET /api/v1/auth/profile
   Header: Authorization: Bearer <token>
   ↓
2. Auth Middleware:
   - Extracts token
   - Verifies signature
   - Decodes payload
   - Attaches user to request
   ↓
3. Controller processes request
   ↓
4. Service fetches data
   ↓
5. Response sent to client
```

### Product CRUD Flow

```
GET /api/v1/products
   ↓
Product Controller
   ↓
Product Service
   - Build query filters
   - Pagination logic
   - Search functionality
   ↓
Mongoose Model
   ↓
MongoDB Query
   ↓
Return results with pagination
```

## Security Architecture

### Authentication & Authorization

```
┌─────────────────┐
│   JWT Token     │
│                 │
│  Header:        │
│  - Algorithm    │
│  Payload:       │
│  - userId       │
│  - email        │
│  - role         │
│  Signature:     │
│  - Secret key   │
└─────────────────┘
```

**Security Layers:**
1. **Password Security** - bcryptjs hashing (10 rounds)
2. **Token-based Auth** - JWT with expiration
3. **Role-based Access** - CUSTOMER vs ADMIN
4. **CORS Protection** - Whitelist allowed origins
5. **Security Headers** - Helmet middleware
6. **Input Validation** - Request body validation

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  email: String (unique, lowercase),
  password: String (hashed),
  firstName: String,
  lastName: String,
  role: Enum['CUSTOMER', 'ADMIN'],
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- email (unique)

### Products Collection
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String,
  stock: Number,
  featured: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- category
- featured
- createdAt (for sorting)

## API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

### Paginated Response
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 100,
    "pages": 9
  }
}
```

## Environment Configuration

```
Development ────► .env.example ────► .env
                    │
                    ▼
Production ────► Environment Variables
                 (Server/Cloud)
```

## Error Handling

```
Error Occurs
    ↓
Try-Catch in Controller/Service
    ↓
throw Error("message")
    ↓
Express Error Handler Middleware
    ↓
Format Error Response
    ↓
Send to Client
```

## Scalability Considerations

### Current Architecture Supports:
- ✅ Horizontal scaling (stateless design)
- ✅ Database indexing for performance
- ✅ JWT for distributed auth
- ✅ Separation of concerns
- ✅ Easy to add new features

### Future Enhancements:
- 🔄 Redis for session management
- 🔄 Rate limiting
- 🔄 API versioning
- 🔄 Caching layer
- 🔄 Message queues
- 🔄 Microservices migration

## Development Workflow

```
Code Change
    ↓
ts-node-dev (auto-reload)
    ↓
TypeScript Compilation
    ↓
Server Restart
    ↓
Test Endpoint
```

## Deployment Architecture

```
┌──────────────────┐
│   Source Code    │
└────────┬─────────┘
         │
    npm run build
         │
         ▼
┌──────────────────┐
│  Compiled JS     │
│    (dist/)       │
└────────┬─────────┘
         │
    npm start
         │
         ▼
┌──────────────────┐
│  Node.js Server  │
│   (Production)   │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  MongoDB Cloud   │
│  (Atlas/Cloud)   │
└──────────────────┘
```

## Technology Stack

| Layer | Technology |
|-------|------------|
| Runtime | Node.js |
| Language | TypeScript |
| Framework | Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| Auth | JWT + bcryptjs |
| Security | Helmet, CORS |
| Logging | Morgan |
| Dev Tool | ts-node-dev |

## Code Organization Principles

1. **Single Responsibility** - Each module has one job
2. **Dependency Injection** - Services are injectable
3. **DRY** - Don't Repeat Yourself
4. **SOLID** - Object-oriented design principles
5. **Type Safety** - TypeScript for compile-time checks

## API Versioning

Current: `/api/v1/`

Future versions can be added:
- `/api/v2/` - With backward compatibility
- Separate route files per version
- Shared services where appropriate
