# Vercel Deployment Guide

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **MongoDB Atlas**: Create a free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
3. **Vercel CLI** (optional): Install with `npm i -g vercel`

## Step 1: Prepare MongoDB Atlas

1. Create a MongoDB Atlas account and cluster
2. Create a database user with read/write permissions
3. Whitelist all IP addresses (0.0.0.0/0) for serverless access
4. Get your connection string:
   ```
   mongodb+srv://<username>:<password>@cluster.mongodb.net/retail-relay?retryWrites=true&w=majority
   ```

## Step 2: Configure Environment Variables

In your Vercel project dashboard, add these environment variables:

```bash
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/retail-relay?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production
JWT_EXPIRE=24h
JWT_REFRESH_EXPIRE=7d
ALLOWED_ORIGINS=https://your-frontend.vercel.app,http://localhost:5173
```

⚠️ **Important**: 
- Use strong, random strings for JWT secrets
- Update `ALLOWED_ORIGINS` with your actual frontend URL
- Never commit `.env` files to Git

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your Git repository
3. Select the `backend` folder as the root directory
4. Add environment variables from Step 2
5. Click "Deploy"

### Option B: Deploy via CLI

```bash
# Login to Vercel
vercel login

# Navigate to backend directory
cd backend

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## Step 4: Verify Deployment

1. **Health Check**: Visit `https://your-backend.vercel.app/health`
   - Expected response: `{"status":"OK","message":"Server is running"}`

2. **Test API Endpoints**:
   ```bash
   # Register a user
   curl -X POST https://your-backend.vercel.app/api/v1/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"Test123!","firstName":"Test","lastName":"User"}'
   
   # Get products
   curl https://your-backend.vercel.app/api/v1/products
   ```

## Step 5: Update Frontend

Update your frontend's API base URL to point to your Vercel backend:

```typescript
// frontend/src/lib/api.ts
const API_BASE_URL = 'https://your-backend.vercel.app/api/v1';
```

## Troubleshooting

### Database Connection Issues

- Ensure MongoDB Atlas allows connections from all IPs (0.0.0.0/0)
- Verify connection string is correct
- Check MongoDB Atlas cluster is active

### CORS Errors

- Add your frontend URL to `ALLOWED_ORIGINS` environment variable
- Format: `https://frontend.vercel.app,http://localhost:5173`

### Function Timeout

- Default timeout is 10 seconds
- For Hobby plan: max 10s
- For Pro plan: max 60s
- Optimize database queries if hitting timeout

### Build Errors

```bash
# Check TypeScript compilation locally
npm run build

# Check for type errors
npx tsc --noEmit
```

## Optimization Tips

1. **Connection Pooling**: Already configured in `database.ts` with `maxPoolSize: 10`
2. **Response Caching**: Consider adding Redis for frequently accessed data
3. **MongoDB Indexes**: Create indexes on frequently queried fields
4. **Environment-specific Config**: Use different configs for dev/staging/prod

## Monitoring

1. **Vercel Dashboard**: Monitor function invocations and errors
2. **MongoDB Atlas**: Track database performance and queries
3. **Logs**: View real-time logs in Vercel dashboard

## Useful Commands

```bash
# View deployment logs
vercel logs

# List deployments
vercel ls

# Remove deployment
vercel rm <deployment-url>

# Pull environment variables locally
vercel env pull
```

## Additional Resources

- [Vercel Node.js Functions](https://vercel.com/docs/functions/serverless-functions/runtimes/node-js)
- [MongoDB Atlas Setup](https://www.mongodb.com/docs/atlas/getting-started/)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

## Support

For issues or questions:
- Email: santoshhiretanad292@gmail.com
- Phone: +91 9972433292
