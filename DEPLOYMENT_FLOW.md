# 🔄 Auto-Deployment Flow Explanation

## How It Works - Step by Step

### 1. **Admin Makes Changes** 
```
Admin Panel → Add/Edit Product → Save Changes
```

### 2. **Admin Clicks Deploy Button**
```
Admin Panel → "Deploy to Production" Button → API Call
```

### 3. **Deployment Process**
```
API Call → Webhook → Server → Git Pull → Build → Restart → Live
```

## Detailed Flow:

### **Step 1: Admin Action**
- Admin logs into admin panel
- Makes changes (adds product, edits price, etc.)
- Clicks "Deploy to Production" button

### **Step 2: API Trigger**
```javascript
// When admin clicks deploy button:
fetch('/api/admin/auto-deploy', {
  method: 'POST',
  body: JSON.stringify({ action: 'deploy' })
})
```

### **Step 3: Webhook Call**
```javascript
// Server receives webhook:
POST /api/webhook/deploy
Headers: { 'x-webhook-secret': 'your-secret' }
```

### **Step 4: Server Actions**
```bash
# On Hostinger server:
cd /public_html
git pull origin main          # Get latest code
npm ci                       # Install dependencies
npx prisma generate          # Update database client
npx prisma db push           # Update database schema
npm run build               # Build production version
pm2 restart hars-jewellery   # Restart application
```

### **Step 5: Live Website**
- Website automatically updates with new changes
- Zero downtime deployment
- Users see new products immediately

## Real Example:

1. **Admin adds new ring** → Saves in admin panel
2. **Clicks deploy button** → Sees "Deploying..." status
3. **Server updates** → Pulls code, builds, restarts
4. **Website shows** → New ring appears on homepage
5. **Admin sees** → "Deployed Successfully!" message

## Technical Implementation:

### **Frontend (Admin Panel)**
```typescript
// DeployButton.tsx
const handleDeploy = async () => {
  const response = await fetch('/api/admin/auto-deploy', {
    method: 'POST',
    body: JSON.stringify({ action: 'deploy' })
  })
  // Show success/error message
}
```

### **Backend (API)**
```typescript
// app/api/admin/auto-deploy/route.ts
export async function POST(request: NextRequest) {
  // Verify admin permissions
  // Trigger webhook
  // Return status
}
```

### **Server (Hostinger)**
```bash
# deploy.sh
git pull origin main
npm ci
npx prisma generate
npx prisma db push
npm run build
pm2 restart hars-jewellery
```

## Security Features:

1. **Admin Authentication** - Only logged-in admins can deploy
2. **Webhook Secret** - Prevents unauthorized deployments
3. **SSH Keys** - Secure server access
4. **Environment Variables** - Protected sensitive data

## Benefits:

✅ **One-Click Deployment** - No technical knowledge needed
✅ **Real-Time Updates** - Changes go live immediately
✅ **Zero Downtime** - PM2 ensures continuous service
✅ **Secure** - Multiple security layers
✅ **Automatic** - No manual server commands required
