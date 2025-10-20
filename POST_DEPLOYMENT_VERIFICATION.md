# Post-Deployment Verification Checklist

After deploying to Vercel, follow this checklist to ensure everything is working correctly.

## 📝 Basic Verification

### ✅ Deployment Success

- [ ] Deployment completed without errors
- [ ] Build logs show no warnings
- [ ] Function deployed successfully
- [ ] Domain is accessible

**How to check:**
```bash
# Visit your Vercel dashboard
https://vercel.com/dashboard

# Check deployment status
vercel ls
```

### ✅ Environment Variables

- [ ] All environment variables are set
- [ ] No typos in variable names
- [ ] Secrets are properly formatted
- [ ] ALLOWED_ORIGINS includes frontend URL

**How to check:**
```bash
# In Vercel Dashboard
Settings → Environment Variables

# Required variables:
NODE_ENV
MONGODB_URI
JWT_SECRET
JWT_REFRESH_SECRET
JWT_EXPIRE
JWT_REFRESH_EXPIRE
ALLOWED_ORIGINS
```

## 🔍 Endpoint Testing

### ✅ Health Check

**Test:**
```bash
curl https://your-backend.vercel.app/health
```

**Expected Response:**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

- [ ] Status is "OK"
- [ ] Response time < 2 seconds
- [ ] No errors in response

### ✅ User Registration

**Test:**
```bash
curl -X POST https://your-backend.vercel.app/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!",
    "firstName": "Test",
    "lastName": "User"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "...",
      "email": "test@example.com",
      "firstName": "Test",
      "lastName": "User",
      "role": "CUSTOMER"
    },
    "tokens": {
      "token": "eyJhbG...",
      "refreshToken": "eyJhbG..."
    }
  }
}
```

- [ ] Success is true
- [ ] User object returned
- [ ] Tokens received
- [ ] Email matches input
- [ ] Role is CUSTOMER

### ✅ User Login

**Test:**
```bash
curl -X POST https://your-backend.vercel.app/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "...",
      "email": "test@example.com"
    },
    "tokens": {
      "token": "eyJhbG...",
      "refreshToken": "eyJhbG..."
    }
  }
}
```

- [ ] Login successful
- [ ] Tokens received
- [ ] User data correct

### ✅ Get Profile (Authenticated)

**Test:**
```bash
# Replace TOKEN with the token from login/register
curl https://your-backend.vercel.app/api/v1/auth/profile \
  -H "Authorization: Bearer TOKEN"
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "id": "...",
    "email": "test@example.com",
    "firstName": "Test",
    "lastName": "User",
    "role": "CUSTOMER"
  }
}
```

- [ ] Profile data returned
- [ ] No password in response
- [ ] Authorization working

### ✅ Get Products

**Test:**
```bash
curl https://your-backend.vercel.app/api/v1/products
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "products": [],
    "total": 0,
    "page": 1,
    "pages": 1
  }
}
```

- [ ] Products endpoint accessible
- [ ] Response structure correct
- [ ] Pagination info included

## 🔒 Security Verification

### ✅ CORS Configuration

**Test from Browser Console:**
```javascript
fetch('https://your-backend.vercel.app/api/v1/products')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error);
```

- [ ] Request succeeds from frontend domain
- [ ] No CORS errors in console
- [ ] Credentials allowed if needed

### ✅ Authentication Protection

**Test:**
```bash
# Try to access protected route without token
curl https://your-backend.vercel.app/api/v1/auth/profile
```

**Expected Response:**
```json
{
  "success": false,
  "message": "No token provided" // or similar
}
```

- [ ] Returns 401 Unauthorized
- [ ] Proper error message
- [ ] No data exposed

### ✅ Invalid Token Handling

**Test:**
```bash
curl https://your-backend.vercel.app/api/v1/auth/profile \
  -H "Authorization: Bearer invalid-token"
```

**Expected Response:**
```json
{
  "success": false,
  "message": "Invalid token" // or similar
}
```

- [ ] Returns 401 Unauthorized
- [ ] Proper error handling
- [ ] No stack traces exposed

## 💾 Database Verification

### ✅ MongoDB Connection

**Check Vercel Logs:**
```bash
vercel logs
```

**Look for:**
```
✅ Using existing MongoDB connection
or
✅ MongoDB connected successfully
```

- [ ] Connection successful
- [ ] No connection errors
- [ ] Connection reuse working

### ✅ Database Operations

**Test:**
1. Register a new user
2. Check MongoDB Atlas → Collections
3. Verify user document exists

- [ ] User saved to database
- [ ] Password is hashed
- [ ] Timestamps created
- [ ] Correct collection

## ⚡ Performance Verification

### ✅ Response Times

**Test all endpoints and measure:**
```bash
time curl https://your-backend.vercel.app/health
```

**Expected Times:**
- Health check: < 500ms
- Products list: < 1s
- User registration: < 2s
- Login: < 1s

- [ ] All responses under 3 seconds
- [ ] Warm starts < 200ms
- [ ] No timeout errors

### ✅ Cold Start Performance

**Test:**
1. Wait 5 minutes (for function to go cold)
2. Make request
3. Measure time

**Expected:**
- First request: 1-3 seconds
- Subsequent requests: < 500ms

- [ ] Cold start completes
- [ ] Warm starts are fast
- [ ] Connection reuse working

## 📊 Monitoring Setup

### ✅ Vercel Dashboard

**Check:**
1. Go to Vercel Dashboard
2. Select your project
3. View Analytics

- [ ] Function invocations showing
- [ ] No errors in logs
- [ ] Response times acceptable
- [ ] Bandwidth within limits

### ✅ MongoDB Atlas Monitoring

**Check:**
1. Go to MongoDB Atlas
2. Clusters → Metrics
3. View connections

- [ ] Connection count reasonable (< 10)
- [ ] No connection spikes
- [ ] Queries executing successfully
- [ ] No slow queries

## 🔍 Error Handling Verification

### ✅ Invalid Input

**Test:**
```bash
curl -X POST https://your-backend.vercel.app/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "invalid-email",
    "password": "123"
  }'
```

**Expected:**
- [ ] Returns validation error
- [ ] 400 Bad Request status
- [ ] Helpful error messages
- [ ] No server crash

### ✅ Non-existent Routes

**Test:**
```bash
curl https://your-backend.vercel.app/api/v1/nonexistent
```

**Expected:**
- [ ] Returns 404 Not Found
- [ ] Proper error message
- [ ] No server errors

### ✅ Database Errors

**Simulate:**
1. Temporarily change MONGODB_URI to invalid
2. Make request
3. Check logs

**Expected:**
- [ ] Graceful error handling
- [ ] Function doesn't crash
- [ ] Error logged properly

## 🌐 Frontend Integration

### ✅ Update Frontend URL

**In Frontend Code:**
```typescript
// frontend/src/lib/api.ts
const API_BASE_URL = 'https://your-backend.vercel.app/api/v1';
```

- [ ] URL updated
- [ ] Frontend can reach backend
- [ ] API calls working

### ✅ Test Full User Flow

**From Frontend:**
1. Register new account
2. Login
3. View products
4. Access profile

- [ ] Registration works
- [ ] Login successful
- [ ] Products load
- [ ] Profile accessible
- [ ] Logout works

## 📝 Final Checks

### ✅ Documentation

- [ ] README.md updated
- [ ] API documentation accurate
- [ ] Environment variables documented
- [ ] Deployment guide followed

### ✅ Security

- [ ] .env not committed to Git
- [ ] Strong JWT secrets used
- [ ] CORS properly configured
- [ ] HTTPS enforced

### ✅ Cleanup

- [ ] Test users removed (if needed)
- [ ] Development endpoints disabled
- [ ] Debug logs removed
- [ ] Unnecessary console.logs removed

## 🚨 Common Issues & Solutions

### Issue: "Cannot connect to database"
**Solutions:**
- [ ] Check MongoDB Atlas IP whitelist (0.0.0.0/0)
- [ ] Verify MONGODB_URI is correct
- [ ] Ensure cluster is running
- [ ] Check network access settings

### Issue: "CORS error from frontend"
**Solutions:**
- [ ] Add frontend URL to ALLOWED_ORIGINS
- [ ] Include protocol (https://)
- [ ] Redeploy after env var change
- [ ] Clear browser cache

### Issue: "Function timeout"
**Solutions:**
- [ ] Check query performance
- [ ] Add database indexes
- [ ] Optimize connection pooling
- [ ] Consider upgrading Vercel plan

### Issue: "Invalid token"
**Solutions:**
- [ ] Verify JWT_SECRET matches
- [ ] Check token expiration
- [ ] Ensure proper token format
- [ ] Frontend sending token correctly

## 📞 Support

If issues persist:

**Contact:**
- 📧 Email: santoshhiretanad292@gmail.com
- 📱 Phone: +91 9972433292

**Resources:**
- [Vercel Logs](https://vercel.com/docs/concepts/deployments/logs)
- [MongoDB Atlas Support](https://www.mongodb.com/cloud/atlas/support)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

## ✅ Sign-Off

Once all checks pass:

- [ ] All endpoints working
- [ ] Security verified
- [ ] Performance acceptable
- [ ] Frontend integrated
- [ ] Monitoring setup
- [ ] Documentation complete

**🎉 Deployment successful! Your backend is live and running!**

---

**Date Verified:** _______________
**Verified By:** _______________
**Backend URL:** _______________
**Frontend URL:** _______________
