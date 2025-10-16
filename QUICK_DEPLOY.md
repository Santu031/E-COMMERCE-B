# 🚀 Quick Deploy - Retail Relay Backend to Vercel

## ⚡ Fast Track Deployment

### 1️⃣ MongoDB Atlas (5 minutes)
```
1. Visit: https://www.mongodb.com/cloud/atlas/register
2. Create FREE M0 cluster
3. Create database user (save password!)
4. Network Access → Add 0.0.0.0/0
5. Get connection string
6. Replace <password> and add /retail-relay
```

### 2️⃣ Deploy to Vercel (2 minutes)
```bash
cd backend
vercel login
vercel
```

### 3️⃣ Set Environment Variables
```bash
vercel env add MONGODB_URI production
# Paste: mongodb+srv://user:pass@cluster.mongodb.net/retail-relay

vercel env add JWT_SECRET production
# Enter: your-super-secret-key-min-32-chars

vercel env add JWT_REFRESH_SECRET production
# Enter: another-super-secret-key-min-32-chars

vercel env add ALLOWED_ORIGINS production
# Enter: https://e-commerce-f-omega.vercel.app
```

### 4️⃣ Production Deploy
```bash
vercel --prod
```

### 5️⃣ Test
```bash
curl https://your-backend.vercel.app/health
```

---

## 📋 Required Environment Variables

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/retail-relay
JWT_SECRET=minimum-32-characters-long-secret-key-here
JWT_REFRESH_SECRET=another-minimum-32-characters-secret-key
ALLOWED_ORIGINS=https://e-commerce-f-omega.vercel.app
```

---

## ✅ Success Checklist

- [x] Backend files ready for Vercel
- [x] TypeScript compilation working
- [x] CORS configured for frontend
- [ ] MongoDB Atlas cluster created
- [ ] Environment variables set
- [ ] Deployed to Vercel
- [ ] Health check passing

---

## 🔗 Your URLs

**Frontend:** https://e-commerce-f-omega.vercel.app  
**Backend:** Will be assigned after deployment

---

## 📞 Help

Email: santoshhiretanad292@gmail.com  
Mobile: +91 9972433292

**Full Guide:** See VERCEL_DEPLOY_GUIDE.md
