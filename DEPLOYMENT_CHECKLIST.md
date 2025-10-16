# Quick Vercel Deployment Checklist

## ✅ Pre-Deployment Checklist

- [ ] MongoDB Atlas cluster created and configured
- [ ] Database user created with proper permissions
- [ ] IP whitelist set to 0.0.0.0/0 (all IPs for serverless)
- [ ] Connection string copied
- [ ] Strong JWT secrets generated
- [ ] Frontend URL for CORS identified

## ✅ Vercel Configuration

- [ ] Account created on Vercel
- [ ] Project connected to Git repository
- [ ] Root directory set to `backend`
- [ ] Environment variables configured:
  - [ ] `NODE_ENV=production`
  - [ ] `MONGODB_URI` (MongoDB Atlas connection string)
  - [ ] `JWT_SECRET` (strong random string)
  - [ ] `JWT_REFRESH_SECRET` (strong random string)
  - [ ] `JWT_EXPIRE=24h`
  - [ ] `JWT_REFRESH_EXPIRE=7d`
  - [ ] `ALLOWED_ORIGINS` (your frontend URL)

## ✅ Post-Deployment Verification

- [ ] Health check endpoint responds: `https://your-backend.vercel.app/health`
- [ ] Database connection successful (check Vercel logs)
- [ ] API endpoints accessible
- [ ] CORS working with frontend
- [ ] Authentication flow working (register/login)
- [ ] Products API returning data

## 🚀 Deployment Commands

### Deploy to Preview
```bash
cd backend
vercel
```

### Deploy to Production
```bash
cd backend
vercel --prod
```

## 🔧 Common Issues & Solutions

### Issue: Database connection timeout
**Solution**: 
- Check MongoDB Atlas IP whitelist includes 0.0.0.0/0
- Verify connection string is correct
- Ensure cluster is active

### Issue: CORS errors
**Solution**: 
- Add frontend URL to `ALLOWED_ORIGINS`
- Format: `https://frontend.vercel.app,http://localhost:5173`

### Issue: Function timeout
**Solution**: 
- Optimize database queries
- Add indexes to MongoDB collections
- Consider upgrading Vercel plan for longer timeouts

### Issue: TypeScript errors
**Solution**: 
```bash
npm run type-check
npm run build
```

## 📝 Environment Variable Template

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/retail-relay?retryWrites=true&w=majority
JWT_SECRET=generate-a-strong-random-string-here
JWT_REFRESH_SECRET=generate-another-strong-random-string-here
JWT_EXPIRE=24h
JWT_REFRESH_EXPIRE=7d
ALLOWED_ORIGINS=https://your-frontend.vercel.app,http://localhost:5173
```

## 🔐 Generate Strong Secrets

Use these commands to generate strong secrets:

```bash
# Generate JWT_SECRET
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Generate JWT_REFRESH_SECRET
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## 📊 Monitoring

- **Vercel Dashboard**: Monitor function invocations and errors
- **MongoDB Atlas**: Track database performance
- **Logs**: `vercel logs` to view real-time logs

## 🆘 Support

- Email: santoshhiretanad292@gmail.com
- Phone: +91 9972433292
