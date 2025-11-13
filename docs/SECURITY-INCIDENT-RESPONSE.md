# Security Incident Response: Leaked SERVICE_ROLE_KEY

## Incident Summary
The file `supabase/functions/.env.update-pricing-usd` was accidentally committed with a Supabase SERVICE_ROLE_KEY, which GitHub detected as a publicly leaked secret.

**Status**: 🔴 CRITICAL - Immediate action required

## Immediate Actions Required

### 1. Rotate the Supabase Service Role Key (URGENT)
The leaked key **must be revoked immediately**:

```
Leaked Key (first 20 chars): eyJhbGciOiJIUzI1NiIsInR...
Project: skajbbewtntpudminpmr.supabase.co
```

**Steps to rotate:**
1. Go to Supabase Dashboard: https://supabase.com/dashboard/project/skajbbewtntpudminpmr/settings/api
2. Navigate to **Settings → API → Service Role Key**
3. Click **Reset Service Role Key** (or generate new JWT)
4. Copy the new SERVICE_ROLE_KEY

### 2. Update GitHub Secrets
Once you have the new key, update GitHub Secrets:

1. Go to: https://github.com/metaphysics-alliance/meta-alliance-mvp/settings/secrets/actions
2. Update `SUPABASE_SERVICE_ROLE_KEY` with the new value
3. Verify `SUPABASE_PROJECT_REF` is set to: `skajbbewtntpudminpmr`

### 3. Update Supabase Edge Function Secrets
For the edge function to work in Supabase:

```bash
# Using Supabase CLI
supabase secrets set SERVICE_ROLE_KEY=<new_key> --project-ref skajbbewtntpudminpmr

# Or in Supabase Dashboard:
# Edge Functions → update-pricing-usd → Settings → Secrets
```

### 4. Verify GitHub Workflow
Test the workflow after rotation:

1. Go to: https://github.com/metaphysics-alliance/meta-alliance-mvp/actions/workflows/update-pricing-usd.yml
2. Click **Run workflow** manually
3. Verify it completes successfully with the new key

## Root Cause Analysis

### Why the leak happened:
- A local `.env.update-pricing-usd` file was created for testing
- The file contained real production secrets
- It was accidentally committed and pushed to GitHub
- GitHub's secret scanning detected the Supabase JWT pattern

### Why the file wasn't needed:
1. **Edge Functions** read from Supabase Edge Function secrets (set via dashboard/CLI)
2. **GitHub Actions** read from GitHub Secrets (`${{ secrets.SUPABASE_SERVICE_ROLE_KEY }}`)
3. **No local testing** was required for this scheduled function

## Preventive Measures

### ✅ Already Implemented:
- `.gitignore` includes `.env` and `.env.*` patterns
- File has been removed from git tracking
- Commit pushed: `4111a11 chore: remove leaked env file from tracking`

### 🔒 Additional Safeguards:
1. **Never** create `.env.*` files outside the project root
2. Use `.env.local.example` templates instead
3. Always verify `.gitignore` before committing
4. Enable git pre-commit hooks to scan for secrets

### Future Development:
```bash
# For local Supabase Edge Function testing, use:
supabase functions serve update-pricing-usd --env-file .env.local

# Where .env.local is ignored and contains:
SUPABASE_URL=http://localhost:54321
SERVICE_ROLE_KEY=<local_supabase_service_key>
```

## Git History Cleanup (Optional)

If you need to purge the secret from git history:

```bash
# Using BFG Repo-Cleaner (recommended)
bfg --delete-files .env.update-pricing-usd
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Force push (WARNING: rewrites history)
git push origin main --force
```

**Note**: Force pushing affects all collaborators. Only do this if:
- The repository is private
- You've coordinated with all team members
- You understand the implications

## Verification Checklist

After completing the rotation:

- [ ] New SERVICE_ROLE_KEY generated in Supabase
- [ ] Old key revoked/invalidated
- [ ] GitHub Secret `SUPABASE_SERVICE_ROLE_KEY` updated
- [ ] Supabase Edge Function secret `SERVICE_ROLE_KEY` updated
- [ ] GitHub Actions workflow tested manually
- [ ] File removed from git tracking (commit `4111a11`)
- [ ] `.gitignore` verified to prevent future leaks
- [ ] Team notified of incident and resolution

## Work ID
MA-SECRET-LEAK-INCIDENT-RESPONSE-2025-11-13T22:00:00+08:00
