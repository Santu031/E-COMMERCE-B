# 🚀 Vercel Deployment - Quick Start

Your backend is now **fully configured** for Vercel deployment! 

## What's Been Optimized

✅ Serverless function handler in `api/index.ts`  
✅ Database connection pooling for serverless  
✅ Optimized MongoDB configuration  
✅ TypeScript configuration updated  
✅ `.vercelignore` file created  
✅ Environment variable templates  

## Deploy Now (3 Steps)

### 1️⃣ Set Up MongoDB Atlas

```bash
1. Go to: https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Create database user
4. Whitelist IP: 0.0.0.0/0 (all IPs)
5. Copy connection string
```

### 2️⃣ Deploy to Vercel

**Option A - Via Dashboard (Easiest)**
```
1. Visit: https://vercel.com/new
2. Import your Git repository
3. Root Directory: backend
4. Add environment variables (see below)
5. Click Deploy!
```

**Option B - Via CLI**
```bash
npm i -g vercel
cd backend
vercel
```

### 3️⃣ Configure Environment Variables

Add these in Vercel dashboard → Settings → Environment Variables:

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/retail-relay
JWT_SECRET=your-secret-key-here
JWT_REFRESH_SECRET=your-refresh-secret-here
JWT_EXPIRE=24h
JWT_REFRESH_EXPIRE=7d
ALLOWED_ORIGINS=https://e-commerce-f-omega.vercel.app,http://localhost:5173
```

💡 **Generate secure secrets:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## Verify Deployment

Test your deployed backend:

```bash
# Health check
curl https://your-backend.vercel.app/health

# Expected: {"status":"OK","message":"Server is running"}
```

## Update Frontend

Update your frontend API URL:

```typescript
// frontend/src/lib/api.ts
const API_BASE_URL = 'https://your-backend.vercel.app/api/v1';
```

## 📚 Additional Documentation

- **Complete Guide**: [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md)
- **Checklist**: [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)
- **Environment Template**: [.env.example](./.env.example)

## 🆘 Need Help?

**Contact:**
- 📧 Email: santoshhiretanad292@gmail.com
- 📱 Phone: +91 9972433292

## Common Issues

❌ **Database Connection Failed**
- Check MongoDB Atlas IP whitelist (0.0.0.0/0)
- Verify connection string in environment variables

❌ **CORS Errors**
- Add your frontend URL to `ALLOWED_ORIGINS`
- Use full URL: `https://your-app.vercel.app`

❌ **Function Timeout**
- Default timeout: 10 seconds (Hobby plan)
- Optimize database queries
- Add MongoDB indexes

## Project Structure

```
backend/
├── api/
│   └── index.ts          # Vercel serverless entry point ⚡
├── src/
│   ├── app.ts            # Express app configuration
│   ├── config/
│   │   ├── config.ts     # App configuration
│   │   └── database.ts   # Optimized DB connection 🔥
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Auth, error handling
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API routes
│   └── services/         # Business logic
├── vercel.json           # Vercel configuration ✅
├── .vercelignore         # Files to exclude ✅
├── .env.example          # Environment template ✅
└── package.json          # Dependencies
```

---

**🎉 Your backend is ready for deployment!**

Follow the 3 steps above and you'll be live in minutes.
