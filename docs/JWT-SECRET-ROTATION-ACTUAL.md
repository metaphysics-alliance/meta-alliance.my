# Emergency JWT Secret Rotation Guide

## 🚨 CRITICAL: Database Password Reset Didn't Work

You've discovered that resetting the database password **does NOT** regenerate JWT tokens in current Supabase versions.

## ✅ **ACTUAL SOLUTION OPTIONS**

### Option 1: Check for JWT Secret Rotation in Dashboard

1. **Go to JWT Settings**:
   - URL: https://supabase.com/dashboard/project/skajbbewtntpudminpmr/settings/api
   - Scroll to **JWT Settings** section

2. **Look for rotation options**:
   - ❓ "Generate new JWT secret" button
   - ❓ "Rotate JWT secret" button  
   - ❓ Editable JWT Secret field with "Save" button

3. **If you find it**:
   - Click the rotation button
   - Or edit the JWT secret to a new random value (use strong random generator)
   - Save changes
   - New service_role key will be generated immediately

---

### Option 2: Supabase CLI JWT Rotation (Try this!)

```bash
# Install/Update Supabase CLI
npm install -g supabase@latest

# Login
supabase login

# Check available commands
supabase projects api-keys --help

# Attempt rotation (if available)
supabase projects api-keys rotate --project-ref skajbbewtntpudminpmr
```

If this command doesn't exist, proceed to Option 3.

---

### Option 3: Contact Supabase Support (Fastest for Emergency)

**Direct Support Link**: https://supabase.com/dashboard/support

**Template Message**:
```
Subject: URGENT - Rotate JWT Secret for Leaked SERVICE_ROLE_KEY

Project ID: skajbbewtntpudminpmr
Project URL: https://skajbbewtntpudminpmr.supabase.co

Issue:
My SERVICE_ROLE_KEY was accidentally committed to a public GitHub repository
and detected by GitHub's secret scanning. The key is now publicly exposed.

Request:
Please rotate the JWT secret for this project immediately to invalidate
the leaked service_role key.

Current leaked key (first 30 chars):
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX...

Urgency: CRITICAL
Time of leak detection: 2025-11-13 14:00 UTC

Actions already taken:
- Removed file from git tracking
- Added to .gitignore
- Ready to update GitHub Secrets and Edge Function secrets immediately
  after receiving new key

Thank you for urgent assistance.
```

**Expected Response Time**: 1-4 hours (usually faster for security issues)

---

### Option 4: Temporary Mitigation (While Waiting)

If you can't rotate immediately, implement these temporary protections:

#### A. Enable Row Level Security (RLS) on ALL Tables
```sql
-- Run this in SQL Editor: https://supabase.com/dashboard/project/skajbbewtntpudminpmr/editor

-- Enable RLS on critical tables
ALTER TABLE service_pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_pricing_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE guest_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_enquiries ENABLE ROW LEVEL SECURITY;

-- Create policies that ONLY allow service_role access
CREATE POLICY "Service role only" ON service_pricing
  FOR ALL USING (auth.jwt()->>'role' = 'service_role');

CREATE POLICY "Service role only" ON service_pricing_rates
  FOR ALL USING (auth.jwt()->>'role' = 'service_role');

-- Repeat for other tables
```

This restricts table access even with the leaked key.

#### B. Monitor Database Logs
```bash
# Watch for suspicious activity
# Dashboard: Settings → Database → Logs
https://supabase.com/dashboard/project/skajbbewtntpudminpmr/settings/database

# Look for:
# - Unexpected queries
# - Data modifications
# - Failed authentication attempts
```

#### C. Temporarily Disable Edge Function
```bash
# If you're extremely concerned, pause the edge function
# This stops the automated pricing updates but protects the service_role key

# Via CLI:
supabase functions delete update-pricing-usd --project-ref skajbbewtntpudminpmr

# (You can redeploy after getting new key)
```

---

### Option 5: Nuclear Option - Migrate to New Project

**ONLY if Supabase cannot/will not rotate your JWT secret:**

1. Create new Supabase project
2. Export data from old project:
   ```bash
   supabase db dump --project-ref skajbbewtntpudminpmr > backup.sql
   ```
3. Import to new project
4. Update all application secrets
5. Decommission old project

**⚠️ Warning**: This causes downtime and is complex. Use as last resort.

---

## 📊 Why Database Password Reset Didn't Work

**Old Behavior (Pre-2024)**:
- Database password reset → Regenerated JWT secret → New API keys

**New Behavior (Current)**:
- Database password reset → Only updates database credentials
- JWT secret remains unchanged
- API keys (anon, service_role) stay the same

**Reason**: Supabase separated concerns:
- Database access control ≠ API authentication
- This prevents accidental API key rotation when users just want to change DB password

---

## 🎯 Recommended Action Plan

**Right Now (Next 30 minutes)**:
1. ✅ Try Supabase CLI JWT rotation (Option 2)
2. ✅ If CLI doesn't work, submit support ticket (Option 3)
3. ✅ Enable RLS on all tables (Option 4A) as temporary protection

**While Waiting for Support**:
4. ✅ Monitor database logs (Option 4B)
5. ✅ Prepare to update GitHub Secrets immediately when you get new key
6. ✅ Have Edge Function update command ready

**After Getting New Key**:
7. ✅ Update GitHub Secrets
8. ✅ Update Edge Function secrets
9. ✅ Test workflow
10. ✅ Update .env.local

---

## 📞 Supabase Support Contacts

- **Dashboard Support**: https://supabase.com/dashboard/support
- **Discord Community**: https://discord.supabase.com (for urgent help)
- **Twitter/X**: @supabase (for public visibility on urgent issues)
- **Email**: support@supabase.io

---

## Expected Timeline

| Action | Time |
|--------|------|
| Submit support ticket | 5 minutes |
| Supabase response | 1-4 hours |
| JWT rotation by support | 15 minutes |
| Update all secrets | 10 minutes |
| Full verification | 15 minutes |
| **Total** | **2-5 hours** |

---

## Work ID
MA-JWT-ROTATION-REALITY-CHECK-2025-11-13T22:25:00+08:00
