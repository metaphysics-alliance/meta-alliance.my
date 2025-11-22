# Newsletter Subscriptions Setup Guide

## ✅ What's Already Done

1. **Frontend Component**: `src/components/Newsletter.jsx` is ready and wired to Supabase
2. **SQL Migration File**: `supabase/sql/newsletter_subscriptions.sql` is prepared
3. **Environment Variables**: `.env.local` contains Supabase credentials

## 🔧 Manual Setup Required

The `newsletter_subscriptions` table needs to be created in Supabase. Due to limitations with programmatic SQL execution, please follow these steps:

### Option 1: Via Supabase Dashboard (Recommended)

1. **Open Supabase SQL Editor**:
   - Go to: https://supabase.com/dashboard/project/skajbbewtntpudminpmr/sql
   - Or click: Project → SQL Editor

2. **Run This SQL**:

```sql
-- Create newsletter_subscriptions table
CREATE TABLE IF NOT EXISTS public.newsletter_subscriptions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text UNIQUE NOT NULL,
  full_name text,
  status text DEFAULT 'active',
  source text,
  preferred_language text DEFAULT 'EN',
  subscribed_at timestamptz DEFAULT timezone('utc', now()),
  unsubscribed_at timestamptz,
  consent_given boolean DEFAULT true,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT timezone('utc', now()),
  updated_at timestamptz DEFAULT timezone('utc', now())
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS newsletter_subscriptions_email_idx 
  ON public.newsletter_subscriptions(email);

CREATE INDEX IF NOT EXISTS newsletter_subscriptions_status_idx 
  ON public.newsletter_subscriptions(status);

-- Enable Row Level Security
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous and authenticated users to subscribe
CREATE POLICY "Anyone can subscribe" 
  ON public.newsletter_subscriptions
  FOR INSERT 
  TO anon, authenticated 
  WITH CHECK (true);

-- Service role has full access (for admin/backend operations)
CREATE POLICY "Service role full access" 
  ON public.newsletter_subscriptions
  FOR ALL 
  TO service_role 
  USING (true) 
  WITH CHECK (true);

-- Grant necessary permissions
GRANT INSERT ON public.newsletter_subscriptions TO anon, authenticated;
GRANT ALL ON public.newsletter_subscriptions TO service_role;
```

3. **Click "RUN"** at the bottom of the SQL Editor

4. **Verify**: You should see the table appear in:
   - Table Editor: https://supabase.com/dashboard/project/skajbbewtntpudminpmr/editor

### Option 2: Using Supabase CLI

If you have Supabase CLI installed:

```bash
npx supabase db push --file supabase/sql/newsletter_subscriptions.sql
```

## 🧪 Testing

After creating the table, test it works:

```bash
node scripts/test-newsletter-db.mjs
```

Expected output:
```
✅ Table exists! Current row count: 0
✅ Insert successful!
✅ Test record cleaned up
✨ All tests passed! Newsletter signup is ready to use.
```

## 🚀 Using the Newsletter Component

Once the table is created, the newsletter form on your homepage will automatically work:

1. Visit: http://localhost:5173 (Vite) or http://localhost:3000 (Next.js)
2. Scroll to the newsletter section
3. Enter an email and click subscribe
4. Check the `newsletter_subscriptions` table in Supabase to see the record

## 📊 Viewing Subscriptions

To view newsletter subscriptions in Supabase:

1. Go to: https://supabase.com/dashboard/project/skajbbewtntpudminpmr/editor/public.newsletter_subscriptions
2. Or: Table Editor → public → newsletter_subscriptions

## 🔑 Table Schema

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key |
| `email` | text | Subscriber email (unique) |
| `full_name` | text | Optional full name |
| `status` | text | active, unsubscribed, or bounced |
| `source` | text | Where they subscribed (homepage, etc.) |
| `preferred_language` | text | EN or CN |
| `subscribed_at` | timestamptz | When they subscribed |
| `consent_given` | boolean | GDPR/PDPA consent |
| `metadata` | jsonb | Additional custom data |
| `created_at` | timestamptz | Record creation time |
| `updated_at` | timestamptz | Last update time |

## 🔒 Security

- **RLS Enabled**: Row Level Security ensures data protection
- **Public Insert**: Anyone can subscribe (necessary for public forms)
- **No Public Read**: Anonymous users cannot view subscriber lists
- **Service Role**: Backend has full access for admin operations

## 📝 Notes

- Email addresses are automatically lowercased and trimmed
- Duplicate emails are prevented by unique constraint
- The component handles duplicate subscription attempts gracefully
- All timestamps are stored in UTC
