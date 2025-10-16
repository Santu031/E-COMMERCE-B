# Vercel Deployment Guide - Retail Relay Backend

## 🎯 Quick Deploy Checklist

### ✅ Pre-Deployment Setup Complete
- [x] TypeScript compilation fixed
- [x] Import paths corrected (User.model, Product.model)
- [x] JWT type issues resolved
- [x] Serverless entry point created (api/index.ts)
- [x] CORS configured for frontend: `https://e-commerce-f-omega.vercel.app`
- [x] Build successful

---

## 🚀 Deploy to Vercel (Step-by-Step)

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Navigate to Backend Directory

```bash
cd /Users/santosh/Desktop/retail-relay-project/backend
```

### Step 4: Set Environment Variables

**CRITICAL:** Before deploying, set these environment variables in Vercel:

#### Via Vercel CLI:

```bash
# MongoDB Connection String (REQUIRED)
vercel env add MONGODB_URI production
# When prompted, paste your MongoDB Atlas connection string

# JWT Secret (REQUIRED)
vercel env add JWT_SECRET production
# When prompted, enter a strong secret key

# JWT Refresh Secret (REQUIRED)
vercel env add JWT_REFRESH_SECRET production
# When prompted, enter another strong secret key

# Frontend URL (REQUIRED for CORS)
vercel env add ALLOWED_ORIGINS production
# When prompted, paste: https://e-commerce-f-omega.vercel.app
```

#### Via Vercel Dashboard (Alternative):

1. Go to https://vercel.com/dashboard
2. Select your project (after first deployment)
3. Go to Settings → Environment Variables
4. Add each variable:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/retail-relay?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long
JWT_REFRESH_SECRET=your-super-secret-refresh-key-min-32-characters-long
JWT_EXPIRE=24h
JWT_REFRESH_EXPIRE=7d
ALLOWED_ORIGINS=https://e-commerce-f-omega.vercel.app
PORT=3000
NODE_ENV=production
```

### Step 5: Deploy

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

---

## 🗄️ MongoDB Atlas Setup (REQUIRED)

### Why MongoDB Atlas?
- Vercel serverless functions need a cloud database
- Local MongoDB won't work with Vercel

### Setup Steps:

#### 1. Create Free Cluster

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up / Login
3. Create a **FREE M0 cluster**
4. Choose your preferred cloud provider (AWS recommended)
5. Select a region close to your Vercel deployment region

#### 2. Create Database User

1. Go to **Database Access** (left sidebar)
2. Click **Add New Database User**
3. Authentication Method: **Password**
4. Username: `retailrelay_user` (or your choice)
5. Password: **Generate a strong password** (save it!)
6. Database User Privileges: **Read and write to any database**
7. Click **Add User**

#### 3. Whitelist All IPs (Required for Vercel)

1. Go to **Network Access** (left sidebar)
2. Click **Add IP Address**
3. Select **Allow Access from Anywhere**
4. IP Address: `0.0.0.0/0`
5. Click **Confirm**

⚠️ **Important:** Vercel uses dynamic IPs, so you MUST whitelist `0.0.0.0/0`

#### 4. Get Connection String

1. Go to **Database** (left sidebar)
2. Click **Connect** on your cluster
3. Choose **Connect your application**
4. Driver: **Node.js**
5. Version: **4.1 or later**
6. Copy the connection string

Example:
```
mongodb+srv://retailrelay_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

#### 5. Modify Connection String

Replace:
- `<password>` with your actual password
- Add database name after `.net/`: `retail-relay`

Final example:
```
mongodb+srv://retailrelay_user:MyP@ssw0rd@cluster0.xxxxx.mongodb.net/retail-relay?retryWrites=true&w=majority
```

#### 6. Seed Database (Optional)

After deployment, seed your database:

```bash
# Update MONGODB_URI in .env with Atlas connection string
# Then run:
npm run seed
```

---

## 📝 Environment Variables Reference

### Complete List:

| Variable | Required | Example | Description |
|----------|----------|---------|-------------|
| `MONGODB_URI` | ✅ Yes | `mongodb+srv://user:pass@cluster.mongodb.net/retail-relay` | MongoDB Atlas connection string |
| `JWT_SECRET` | ✅ Yes | `super-secret-key-min-32-chars-long-123456` | JWT signing secret (min 32 characters) |
| `JWT_REFRESH_SECRET` | ✅ Yes | `another-secret-key-for-refresh-tokens-456` | Refresh token secret (min 32 characters) |
| `ALLOWED_ORIGINS` | ✅ Yes | `https://e-commerce-f-omega.vercel.app` | Frontend URL for CORS |
| `JWT_EXPIRE` | No | `24h` | Access token expiry (default: 24h) |
| `JWT_REFRESH_EXPIRE` | No | `7d` | Refresh token expiry (default: 7d) |
| `PORT` | No | `3000` | Server port (Vercel uses 3000) |
| `NODE_ENV` | No | `production` | Environment (auto-set by Vercel) |

---

## 🧪 Test Deployment

After deployment, Vercel will provide a URL like:
```
https://retail-relay-backend.vercel.app
```

### Test Endpoints:

#### 1. Health Check
```bash
curl https://your-backend-url.vercel.app/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

#### 2. Test Products API
```bash
curl https://your-backend-url.vercel.app/api/v1/products
```

Expected: List of products

#### 3. Test Login
```bash
curl -X POST https://your-backend-url.vercel.app/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "customer@example.com",
    "password": "customer123"
  }'
```

Expected: User data and tokens

---

## 🔗 Update Frontend

After backend deployment, update your frontend to use the new backend URL:

### In your frontend `.env` file:

```env
VITE_API_URL=https://your-backend-url.vercel.app/api/v1
```

**Important:** Replace `your-backend-url` with your actual Vercel backend URL.

---

## 📊 Deployment Architecture

```
Frontend (Vercel)                Backend (Vercel)              Database
https://e-commerce-f-omega   →   https://your-backend  →  MongoDB Atlas
    .vercel.app                      .vercel.app              Cloud DB
        ↓                                ↓                         ↓
   React/Vite                    Express/Node.js         Managed MongoDB
   Static Site                   Serverless Functions      (Free M0 Cluster)
```

---

## 🔧 Troubleshooting

### Error: FUNCTION_INVOCATION_FAILED

**Cause:** Build failure or missing environment variables

**Solution:**
1. Check Vercel deployment logs: `vercel logs`
2. Verify all environment variables are set
3. Ensure MongoDB connection string is correct
4. Check MongoDB Atlas network access (0.0.0.0/0)

### Error: CORS

**Cause:** Frontend URL not in ALLOWED_ORIGINS

**Solution:**
```bash
vercel env add ALLOWED_ORIGINS production
# Enter: https://e-commerce-f-omega.vercel.app
```

### Error: Cannot connect to database

**Cause:** MongoDB connection issues

**Solutions:**
1. Verify connection string format
2. Check password doesn't contain special characters (URL encode if needed)
3. Ensure IP whitelist includes 0.0.0.0/0
4. Test connection locally first

### Build Errors

**Cause:** TypeScript compilation issues

**Solution:**
```bash
# Test build locally first
npm run build

# If successful, redeploy
vercel --prod
```

---

## 📁 Deployment Files

### Files Created for Vercel:

1. **`api/index.ts`** - Serverless entry point
   - Handles database connection caching
   - Exports Express app for Vercel

2. **`vercel.json`** - Deployment configuration
   - Defines build settings
   - Routes all requests to api/index.ts

3. **`.vercelignore`** - Excludes unnecessary files
   - node_modules, .env, markdown files, etc.

4. **`.env.example`** - Template for environment variables
   - Updated with production URL

---

## ✅ Post-Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] Network access: 0.0.0.0/0 whitelisted
- [ ] Connection string copied and tested
- [ ] All environment variables set in Vercel
- [ ] Backend deployed successfully
- [ ] Health check endpoint returns 200
- [ ] Products API returns data
- [ ] Login API works
- [ ] CORS allows frontend requests
- [ ] Frontend `.env` updated with backend URL
- [ ] Frontend redeployed with new backend URL

---

## 🎯 Quick Command Reference

```bash
# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs

# View logs (live)
vercel logs --follow

# List deployments
vercel ls

# Add environment variable
vercel env add VARIABLE_NAME production

# Remove deployment
vercel rm deployment-url
```

---

## 📞 Support

**Developer:** Santosh  
**Email:** santoshhiretanad292@gmail.com  
**Mobile:** +91 9972433292

---

## 🎉 Success Indicators

Your deployment is successful when:

✅ `vercel --prod` completes without errors  
✅ Health check returns `{"status":"OK"}`  
✅ Products API returns product list  
✅ Login works with test credentials  
✅ Frontend can communicate with backend  
✅ No CORS errors in browser console  

---

**Last Updated:** October 16, 2025  
**Frontend URL:** https://e-commerce-f-omega.vercel.app  
**Status:** Ready for Production Deployment ✅
