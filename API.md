# API Documentation

Base URL: `http://localhost:5001/api/v1`

## Authentication

All authenticated endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Endpoints

### Health Check

#### GET /health
Check if server is running.

**Response:**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

---

## Authentication Endpoints

### POST /api/v1/auth/register
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:** (201 Created)
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "CUSTOMER"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response:** (400 Bad Request)
```json
{
  "success": false,
  "message": "User already exists with this email"
}
```

---

### POST /api/v1/auth/login
Login with existing credentials.

**Request Body:**
```json
{
  "email": "customer@example.com",
  "password": "customer123"
}
```

**Response:** (200 OK)
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "email": "customer@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "CUSTOMER"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response:** (401 Unauthorized)
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

### GET /api/v1/auth/profile
Get current user profile (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** (200 OK)
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "customer@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "CUSTOMER"
  }
}
```

**Error Response:** (401 Unauthorized)
```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

---

## Product Endpoints

### GET /api/v1/products
Get all products with pagination and filtering.

**Query Parameters:**
- `page` (optional, default: 1) - Page number
- `limit` (optional, default: 12) - Items per page
- `category` (optional) - Filter by category
- `search` (optional) - Search in name and description

**Example:**
```
GET /api/v1/products?page=1&limit=10&category=Electronics&search=phone
```

**Response:** (200 OK)
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Premium Wireless Headphones",
      "description": "High-quality wireless headphones with noise cancellation",
      "price": 299.99,
      "image": "https://images.unsplash.com/photo...",
      "category": "Electronics",
      "stock": 50,
      "featured": true,
      "createdAt": "2025-10-15T10:00:00.000Z",
      "updatedAt": "2025-10-15T10:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 8,
    "pages": 1
  }
}
```

---

### GET /api/v1/products/:id
Get a single product by ID.

**Example:**
```
GET /api/v1/products/507f1f77bcf86cd799439011
```

**Response:** (200 OK)
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Premium Wireless Headphones",
    "description": "High-quality wireless headphones with noise cancellation",
    "price": 299.99,
    "image": "https://images.unsplash.com/photo...",
    "category": "Electronics",
    "stock": 50,
    "featured": true,
    "createdAt": "2025-10-15T10:00:00.000Z",
    "updatedAt": "2025-10-15T10:00:00.000Z"
  }
}
```

**Error Response:** (404 Not Found)
```json
{
  "success": false,
  "message": "Product not found"
}
```

---

### POST /api/v1/products
Create a new product (Admin only).

**Headers:**
```
Authorization: Bearer <admin-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "New Product",
  "description": "Product description",
  "price": 99.99,
  "image": "https://example.com/image.jpg",
  "category": "Electronics",
  "stock": 100,
  "featured": false
}
```

**Response:** (201 Created)
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "New Product",
    "description": "Product description",
    "price": 99.99,
    "image": "https://example.com/image.jpg",
    "category": "Electronics",
    "stock": 100,
    "featured": false,
    "createdAt": "2025-10-15T10:00:00.000Z",
    "updatedAt": "2025-10-15T10:00:00.000Z"
  }
}
```

**Error Response:** (403 Forbidden)
```json
{
  "success": false,
  "message": "Forbidden: Insufficient permissions"
}
```

---

### PUT /api/v1/products/:id
Update an existing product (Admin only).

**Headers:**
```
Authorization: Bearer <admin-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Updated Product Name",
  "price": 149.99,
  "stock": 75
}
```

**Response:** (200 OK)
```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Updated Product Name",
    "description": "Product description",
    "price": 149.99,
    "image": "https://example.com/image.jpg",
    "category": "Electronics",
    "stock": 75,
    "featured": false,
    "createdAt": "2025-10-15T10:00:00.000Z",
    "updatedAt": "2025-10-15T11:00:00.000Z"
  }
}
```

---

### DELETE /api/v1/products/:id
Delete a product (Admin only).

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Response:** (200 OK)
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

**Error Response:** (404 Not Found)
```json
{
  "success": false,
  "message": "Product not found"
}
```

---

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error message describing what went wrong"
}
```

### Common HTTP Status Codes

- `200 OK` - Request succeeded
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Missing or invalid authentication token
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

## Testing with cURL

### Register a user
```bash
curl -X POST http://localhost:5001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User"
  }'
```

### Login
```bash
curl -X POST http://localhost:5001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "customer@example.com",
    "password": "customer123"
  }'
```

### Get profile (replace TOKEN with actual token)
```bash
curl http://localhost:5001/api/v1/auth/profile \
  -H "Authorization: Bearer TOKEN"
```

### Get products
```bash
curl "http://localhost:5001/api/v1/products?page=1&limit=5"
```

### Get product by ID
```bash
curl http://localhost:5001/api/v1/products/507f1f77bcf86cd799439011
```

---

## Sample Data

The seed script creates these test accounts:

**Admin Account:**
- Email: `admin@retailrelay.com`
- Password: `admin123`
- Role: ADMIN

**Customer Account:**
- Email: `customer@example.com`
- Password: `customer123`
- Role: CUSTOMER

**Products:** 8 sample products across various categories (Electronics, Accessories, Bags, Footwear, Home, Sports)
