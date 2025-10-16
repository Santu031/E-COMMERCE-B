# Vercel Deployment Guide

## ✅ Files Created for Deployment

1. **`api/index.ts`** - Serverless entry point
2. **`vercel.json`** - Deployment configuration
3. **`.vercelignore`** - Files to exclude from deployment

---

## 🚀 Deploy to Vercel

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Set Environment Variables

Before deploying, you MUST set these environment variables in Vercel:

```bash
vercel env add MONGODB_URI
# Paste your MongoDB Atlas connection string

vercel env add JWT_SECRET  
# Paste your JWT secret

vercel env add JWT_REFRESH_SECRET
# Paste your refresh token secret

vercel env add ALLOWED_ORIGINS
# Example: https://your-frontend.vercel.app

vercel env add PORT
# Set to 3000 (Vercel standard)
```

**Or set via Vercel Dashboard:**
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add each variable for Production, Preview, and Development

### Step 4: Deploy

```bash
# From backend directory
cd backend

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

---

## 📋 Required Environment Variables

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/retail-relay
JWT_SECRET=your-super-secret-jwt-key-here
JWT_REFRESH_SECRET=your-super-secret-refresh-key-here
JWT_EXPIRE=24h
JWT_REFRESH_EXPIRE=7d
ALLOWED_ORIGINS=https://your-frontend.vercel.app
PORT=3000
NODE_ENV=production
```

---

## 🗄️ MongoDB Atlas Setup

### 1. Create Cluster
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a **free M0 cluster**
3. Choose a cloud provider and region

### 2. Create Database User
1. Click "Database Access"
2. Add new database user
3. Set username and password (save these!)

### 3. Whitelist IP Addresses
1. Click "Network Access"
2. Add IP Address
3. Select **"Allow Access from Anywhere"** (0.0.0.0/0)
   - Required for Vercel's dynamic IPs

### 4. Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your actual password
5. Replace `<dbname>` with `retail-relay`

Example:
```
mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/retail-relay?retryWrites=true&w=majority
```

---

## 🧪 Test Your Deployment

After deploying, test these endpoints:

### Health Check
```bash
curl https://your-backend.vercel.app/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

### Products API
```bash
curl https://your-backend.vercel.app/api/v1/products
```

### Login API
```bash
curl -X POST https://your-backend.vercel.app/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"customer@example.com","password":"customer123"}'
```

---

## 🔧 Troubleshooting

### Error: FUNCTION_INVOCATION_FAILED

**Common Causes:**
1. Missing environment variables
2. Database connection failure
3. Invalid MongoDB connection string

**Solutions:**
- Check Vercel logs: `vercel logs`
- Verify all environment variables are set
- Test MongoDB connection string locally
- Ensure MongoDB Atlas allows all IPs (0.0.0.0/0)

### Error: Cannot find module

**Solution:**
- Ensure all dependencies are in `package.json`
- Run `npm install` locally
- Redeploy: `vercel --prod`

### CORS Errors

**Solution:**
- Add your frontend URL to `ALLOWED_ORIGINS`
- Format: `https://your-frontend.vercel.app`
- Multiple origins: separate with commas

---

## 📊 Deployment Architecture

```
Frontend (Vercel) → Backend (Vercel Serverless) → MongoDB Atlas
     ↓                      ↓                          ↓
  React App          Express API (api/index.ts)    Cloud Database
```

---

## ✨ After Successful Deployment

1. **Update Frontend API URL:**
   ```env
   VITE_API_URL=https://your-backend.vercel.app/api/v1
   ```

2. **Test All Features:**
   - User registration
   - User login
   - Product fetching
   - Cart operations

3. **Monitor Logs:**
   ```bash
   vercel logs --follow
   ```

---

## 🎯 Production Checklist

- [x] vercel.json configured
- [x] api/index.ts created
- [x] .vercelignore created
- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] IP whitelist configured (0.0.0.0/0)
- [ ] All environment variables set in Vercel
- [ ] Deployment successful
- [ ] Health check passes
- [ ] API endpoints working
- [ ] Frontend connected

---

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify MongoDB Atlas connection
3. Test API endpoints
4. Check environment variables

**Contact:** santoshhiretanad292@gmail.com  
**Mobile:** +91 9972433292

---

**Last Updated:** October 16, 2025  
**Status:** Ready for Deployment ✅
