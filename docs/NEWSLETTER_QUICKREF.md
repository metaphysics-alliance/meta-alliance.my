# Newsletter Signup - Quick Reference

## ✅ What's Complete

### 1. Frontend Component (`src/components/Newsletter.jsx`)
- ✅ Form UI with email input
- ✅ CTAButton integration with gold glow
- ✅ Bilingual support (EN/CN)
- ✅ Loading states
- ✅ Success/error messaging
- ✅ Supabase client integration
- ✅ Already wired in homepage

### 2. Database Schema (`supabase/sql/newsletter_subscriptions.sql`)
- ✅ Table definition with all fields
- ✅ Indexes for performance (email, status)
- ✅ Row Level Security (RLS) policies
- ✅ Permissions for anon/authenticated/service_role
- ✅ Auto-timestamp triggers

### 3. Testing & Documentation
- ✅ Test script: `scripts/test-newsletter-db.mjs`
- ✅ Setup guide: `docs/NEWSLETTER_SETUP.md`
- ✅ NPM command: `npm run newsletter:test`
- ✅ CHANGELOG updated with v2.4.0

## ⚠️ Action Required

**The SQL needs to be run in Supabase Dashboard manually:**

1. Open: https://supabase.com/dashboard/project/skajbbewtntpudminpmr/sql
2. Copy SQL from: `supabase/sql/newsletter_subscriptions.sql`
3. Paste and click "RUN"
4. Verify: `npm run newsletter:test`

## 🔍 Why Manual?

Programmatic SQL execution via Supabase JS client has limitations:
- RPC functions not available in standard setup
- Direct connection requires connection pooler setup
- Dashboard SQL editor is fastest and most reliable

## 🚀 After Setup

Once the table is created:

1. **Test locally**:
   ```bash
   npm run newsletter:test
   ```

2. **Use in browser**:
   - Visit: http://localhost:5173
   - Scroll to newsletter section
   - Enter email and subscribe
   - Check Supabase table editor for the record

3. **View subscriptions**:
   - Dashboard: https://supabase.com/dashboard/project/skajbbewtntpudminpmr/editor/public.newsletter_subscriptions

## 📊 Table Structure

```sql
newsletter_subscriptions
├── id (uuid, PK)
├── email (text, unique) 
├── full_name (text, nullable)
├── status (text, default: 'active')
├── source (text, e.g., 'homepage')
├── preferred_language (text, default: 'EN')
├── subscribed_at (timestamptz)
├── unsubscribed_at (timestamptz, nullable)
├── consent_given (boolean, default: true)
├── metadata (jsonb)
├── created_at (timestamptz)
└── updated_at (timestamptz)
```

## 🔐 Security

- **RLS Enabled**: ✅
- **Public Insert**: ✅ (required for signup forms)
- **Anonymous Read**: ❌ (privacy protected)
- **Service Role Access**: ✅ (full admin access)

## 📝 Component Usage

The Newsletter component is already imported and used in:
- `src/App.jsx` - Homepage

It automatically:
- Detects current language (EN/CN)
- Saves to Supabase `newsletter_subscriptions`
- Handles duplicate email gracefully
- Shows success/error feedback
- Includes PDPA/GDPR consent

## 🎯 Next Steps (Optional Enhancements)

- [ ] Email confirmation (double opt-in)
- [ ] Unsubscribe page
- [ ] Email campaign integration (Mailchimp, SendGrid)
- [ ] Admin dashboard for viewing subscribers
- [ ] Export to CSV functionality

---

**Work ID**: MA-NEWSLETTER-SIGNUP-INFRASTRUCTURE-2025-11-13T15:22:00+08:00
