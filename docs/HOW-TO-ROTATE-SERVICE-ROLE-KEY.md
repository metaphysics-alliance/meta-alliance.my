# How to Rotate Supabase SERVICE_ROLE_KEY

## Step-by-Step Guide

### Option A: Generate New Project (Nuclear Option - NOT RECOMMENDED)
This creates a completely new Supabase project. **Only use if you want to start fresh.**

### Option B: Rotate via Database Password Reset (Recommended)
Since Supabase doesn't provide a direct "reset service role key" button, you need to reset the database password which regenerates all JWT tokens including the service role key.

---

## 🔧 **RECOMMENDED METHOD: Reset Database Password**

### Step 1: Access Supabase Dashboard
1. Go to: https://supabase.com/dashboard
2. Log in to your account
3. Select your project: **skajbbewtntpudminpmr**

### Step 2: Navigate to Database Settings
1. Click **Settings** (gear icon) in the left sidebar
2. Click **Database** under Settings
3. Scroll down to **Database Password** section

### Step 3: Reset Database Password
1. Click **Reset database password**
2. You'll see a warning: "This will invalidate your current connection strings"
3. Generate a new strong password or let Supabase generate one
4. Click **Reset password**
5. ⚠️ **IMPORTANT**: Copy and save the new password immediately

### Step 4: Get New API Keys
After resetting the database password, all JWT tokens are regenerated:

1. Go to **Settings → API** in the left sidebar
2. You'll see new keys:
   - **anon (public) key** - for client-side use
   - **service_role (secret) key** - this is your new SERVICE_ROLE_KEY ✅
3. Copy the **service_role** key (starts with `eyJ...`)

---

## 🔄 **ALTERNATIVE: Manual JWT Generation (Advanced)**

If you want to keep your database password but rotate only the JWT:

### Prerequisites
- Access to your project's JWT secret
- Understanding of JWT token structure

### Steps:
1. Go to **Settings → API** in Supabase Dashboard
2. Find **JWT Settings** section
3. Look for **JWT Secret** (this is used to sign all tokens)
4. Unfortunately, Supabase doesn't allow rotating just the JWT secret without resetting the database password

**Conclusion**: You must use **Option B (Reset Database Password)** to rotate the SERVICE_ROLE_KEY.

---

## 📝 After Getting the New Key

### 1. Update GitHub Secrets
```bash
# Go to GitHub repository
https://github.com/metaphysics-alliance/meta-alliance-mvp/settings/secrets/actions

# Update these secrets:
SUPABASE_SERVICE_ROLE_KEY = <new_service_role_key>
SUPABASE_URL = https://skajbbewtntpudminpmr.supabase.co
SUPABASE_PROJECT_REF = skajbbewtntpudminpmr
```

**Via GitHub UI:**
1. Navigate to: **Settings → Secrets and variables → Actions**
2. Click **SUPABASE_SERVICE_ROLE_KEY**
3. Click **Update secret**
4. Paste the new key
5. Click **Update secret**

### 2. Update Supabase Edge Function Secrets

**Option A: Via Supabase CLI**
```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Login to Supabase
supabase login

# Set the secret
supabase secrets set SERVICE_ROLE_KEY=<your_new_key> --project-ref skajbbewtntpudminpmr
```

**Option B: Via Supabase Dashboard**
1. Go to **Edge Functions** in left sidebar
2. Click **update-pricing-usd** function
3. Click **Settings** tab
4. Scroll to **Secrets** section
5. Add/Update secret:
   - Name: `SERVICE_ROLE_KEY`
   - Value: `<your_new_key>`
6. Click **Save**

### 3. Update Local .env.local (If You Have One)
```bash
# Edit .env.local in project root (this file is gitignored)
VITE_SUPABASE_URL=https://skajbbewtntpudminpmr.supabase.co
VITE_SUPABASE_ANON_KEY=<new_anon_key>
SUPABASE_SERVICE_ROLE_KEY=<new_service_role_key>
```

### 4. Update Other Applications
If you're using this key in other places:
- ✅ **Frontend App**: Update `VITE_SUPABASE_ANON_KEY` (public key)
- ✅ **Backend/Server**: Update `SUPABASE_SERVICE_ROLE_KEY` (private key)
- ✅ **CI/CD Pipelines**: Update environment variables
- ✅ **Deployment Platforms**: Update secrets in Vercel/Netlify/etc.

---

## ✅ Verification Steps

### Test 1: Check GitHub Actions Workflow
```bash
# Trigger the workflow manually
1. Go to: https://github.com/metaphysics-alliance/meta-alliance-mvp/actions/workflows/update-pricing-usd.yml
2. Click "Run workflow"
3. Select branch: main
4. Click "Run workflow"
5. Wait for completion (should succeed)
```

### Test 2: Test Edge Function Directly
```bash
# Using curl with new SERVICE_ROLE_KEY
curl -X POST \
  -H "Authorization: Bearer <new_service_role_key>" \
  -H "Content-Type: application/json" \
  https://skajbbewtntpudminpmr.functions.supabase.co/update-pricing-usd

# Expected response:
{
  "success": true,
  "rate": 0.224,
  "capturedAt": "2025-11-13T14:00:00.000Z",
  "rateKey": "MYR_USD",
  "updated": 30,
  "message": "service_pricing price_usd values updated"
}
```

### Test 3: Check Application Access
```bash
# Run your app locally
npm run dev

# Verify:
# - Pricing page loads
# - Cart functionality works
# - No authentication errors in console
```

---

## 🚨 Important Notes

1. **Old Key is NOW INVALID**: After rotation, the leaked key will stop working
2. **Connection Strings Change**: Database password reset changes your connection strings
3. **Minimal Downtime**: Update all secrets within 5-10 minutes to minimize disruption
4. **Test Immediately**: Run verification tests right after updating secrets
5. **Anon Key Also Changes**: The public `anon` key also changes when you reset the database password

---

## 📞 What If Something Goes Wrong?

### Issue: GitHub Actions fails after rotation
**Solution**: Verify GitHub Secrets are updated correctly
```bash
# Check workflow logs:
https://github.com/metaphysics-alliance/meta-alliance-mvp/actions
```

### Issue: Edge Function returns 401 Unauthorized
**Solution**: Edge Function secret not updated
```bash
supabase secrets list --project-ref skajbbewtntpudminpmr
# Should show SERVICE_ROLE_KEY
```

### Issue: Frontend app broken
**Solution**: Update `VITE_SUPABASE_ANON_KEY` in `.env.local`
```bash
# Get new anon key from: Settings → API → anon public key
```

### Issue: Database connection fails
**Solution**: Update connection strings with new password
```bash
# Get new connection string from: Settings → Database → Connection string
```

---

## ⏱️ Estimated Time: 10-15 minutes

- Step 1-4: 5 minutes (reset password, get new keys)
- Update GitHub Secrets: 2 minutes
- Update Supabase Edge Function: 3 minutes
- Update .env.local: 1 minute
- Verification: 5 minutes

---

## Work ID
MA-SERVICE-KEY-ROTATION-GUIDE-2025-11-13T22:10:00+08:00
