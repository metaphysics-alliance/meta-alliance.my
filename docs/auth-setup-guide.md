# Authentication Setup Guide

This guide explains how to configure authentication for Meta Alliance with Supabase, including OAuth providers (Google, Facebook) and email authentication.

---

## 📋 Prerequisites

- Supabase project created
- Access to Supabase dashboard
- Google Cloud Console account (for Google OAuth)
- Meta for Developers account (for Facebook OAuth)

---

## 🔐 1. Supabase Auth Configuration

### Enable Email Authentication

1. Go to **Authentication > Providers** in Supabase dashboard
2. Find **Email** provider
3. Enable the following options:
   - ✅ **Enable email provider**
   - ✅ **Confirm email** (recommended for production)
   - ✅ **Secure email change** (recommended)
4. Configure email templates:
   - **Confirm signup**: Customize the confirmation email
   - **Magic link**: Customize the passwordless login email
   - **Change email address**: Customize the email change confirmation

### Site URL Configuration

1. Go to **Authentication > URL Configuration**
2. Set **Site URL**: `https://meta-alliance.my` (production) or `http://localhost:5173` (development)
3. Add **Redirect URLs**:
   ```
   http://localhost:5173/auth/callback
   http://localhost:3000/auth/callback
   https://meta-alliance.my/auth/callback
   ```

---

## 🌐 2. Google OAuth Setup

### Step 1: Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Navigate to **APIs & Services > Credentials**
4. Click **Create Credentials > OAuth client ID**
5. Select **Web application**
6. Configure:
   - **Name**: `Meta Alliance Production` (or dev)
   - **Authorized JavaScript origins**:
     ```
     http://localhost:5173
     http://localhost:3000
     https://meta-alliance.my
     ```
   - **Authorized redirect URIs**:
     ```
     https://[YOUR-SUPABASE-PROJECT].supabase.co/auth/v1/callback
     http://localhost:54321/auth/v1/callback
     ```
7. Click **Create** and copy:
   - ✅ **Client ID**
   - ✅ **Client Secret**

### Step 2: Enable Google Provider in Supabase

1. Go to **Authentication > Providers** in Supabase
2. Find **Google** provider
3. Toggle **Enable**
4. Paste your **Client ID** and **Client Secret**
5. Click **Save**

### Step 3: Configure OAuth Consent Screen

1. In Google Cloud Console, go to **APIs & Services > OAuth consent screen**
2. Select **External** user type
3. Fill in required fields:
   - **App name**: `Meta Alliance`
   - **User support email**: `work.shaunq@gmail.com`
   - **Developer contact**: `work.shaunq@gmail.com`
   - **App domain**: `https://meta-alliance.my`
4. Add scopes:
   - `email`
   - `profile`
   - `openid`
5. Save and publish (or keep in testing mode for development)

---

## 📘 3. Facebook (Meta) OAuth Setup

### Step 1: Create Facebook App

1. Go to [Meta for Developers](https://developers.facebook.com/)
2. Click **My Apps > Create App**
3. Select use case: **Authenticate and request data from users with Facebook Login**
4. Fill in:
   - **App name**: `Meta Alliance`
   - **App contact email**: `work.shaunq@gmail.com`
5. Click **Create app**

### Step 2: Configure Facebook Login

1. In your app dashboard, click **Add Product**
2. Find **Facebook Login** and click **Set Up**
3. Select **Web** platform
4. Enter **Site URL**: `https://meta-alliance.my`
5. Click **Save**

### Step 3: Get App Credentials

1. Go to **Settings > Basic**
2. Copy:
   - ✅ **App ID**
   - ✅ **App Secret** (click **Show**)

### Step 4: Configure OAuth Redirect URIs

1. Go to **Facebook Login > Settings**
2. Add **Valid OAuth Redirect URIs**:
   ```
   https://[YOUR-SUPABASE-PROJECT].supabase.co/auth/v1/callback
   http://localhost:54321/auth/v1/callback
   ```
3. Save changes

### Step 5: Enable Facebook Provider in Supabase

1. Go to **Authentication > Providers** in Supabase
2. Find **Facebook** provider
3. Toggle **Enable**
4. Paste your **App ID** as **Client ID**
5. Paste your **App Secret** as **Client Secret**
6. Click **Save**

### Step 6: Configure App Permissions

1. In Facebook app dashboard, go to **App Review > Permissions and Features**
2. Request advanced access for:
   - `email` (required)
   - `public_profile` (required)
3. Provide justification and submit for review (for production)

---

## 🗄️ 4. Database Setup

### Run the User Profiles Schema

1. Go to **SQL Editor** in Supabase dashboard
2. Open the file: `supabase/sql/user_profiles_subscriptions.sql`
3. Copy the entire content
4. Paste and click **Run**
5. Verify tables created:
   - `user_profiles`
   - `subscriptions`
   - `subscription_payments`

### Test the Auto-Profile Creation

1. Sign up with a test email or OAuth
2. Query the database:
   ```sql
   SELECT * FROM user_profiles;
   ```
3. Verify your profile was auto-created

---

## 🔧 5. Environment Variables

### Update `.env.local`

Add your Supabase credentials:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Optional: Admin credentials for server-side operations
VITE_SUPABASE_EMAIL=admin@meta-alliance.my
VITE_SUPABASE_PASSWORD=your-secure-password

# Mirror for Next.js
SUPABASE_URL=${VITE_SUPABASE_URL}
SUPABASE_SERVICE_ROLE_KEY=${VITE_SUPABASE_SERVICE_ROLE_KEY}
```

### Find Your Supabase Keys

1. Go to **Settings > API** in Supabase dashboard
2. Copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **Project API keys > anon public** → `VITE_SUPABASE_ANON_KEY`
   - **Project API keys > service_role** → `VITE_SUPABASE_SERVICE_ROLE_KEY` (keep secret!)

---

## 🧪 6. Testing Authentication

### Test Google OAuth

1. Run dev server: `npm run dev`
2. Go to `http://localhost:5173/EN/auth`
3. Click **Continue with Google**
4. Sign in with Google account
5. Verify redirect to profile completion
6. Check database for new profile

### Test Facebook OAuth

1. Click **Continue with Facebook**
2. Sign in with Facebook account
3. Grant permissions (email, public_profile)
4. Verify redirect to profile completion

### Test Email Sign Up

1. Click **Sign up** tab
2. Enter name, email, password
3. Click **Sign up**
4. Check email for confirmation link
5. Click link to confirm
6. Verify profile created

### Test Magic Link

1. Click **Prefer passwordless?**
2. Enter email
3. Click **Send Magic Link**
4. Check email for login link
5. Click link to sign in

---

## 🚨 7. Common Issues & Troubleshooting

### Google OAuth "redirect_uri_mismatch"

**Problem**: Google rejects the redirect URI

**Solution**:
1. Check that redirect URI in Google Console **exactly matches** Supabase callback URL
2. Format: `https://[project-ref].supabase.co/auth/v1/callback`
3. No trailing slashes
4. Must use HTTPS in production

### Facebook "URL Blocked"

**Problem**: Facebook blocks the redirect URL

**Solution**:
1. Go to Facebook Login settings
2. Add Supabase callback URL to **Valid OAuth Redirect URIs**
3. Save and wait 5-10 minutes for propagation

### Profile Not Created

**Problem**: User authenticated but no profile in database

**Solution**:
1. Check if trigger `on_auth_user_created` exists:
   ```sql
   SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';
   ```
2. Re-run the user profiles schema SQL
3. Verify RLS policies allow inserts

### Email Confirmation Required

**Problem**: Can't sign in after signup

**Solution**:
1. For development, disable email confirmation:
   - Go to **Authentication > Providers > Email**
   - Uncheck **Confirm email**
2. For production, keep enabled and check spam folder

---

## 📚 8. Next Steps

1. **Add payment integration** (see payment setup guide)
2. **Configure subscription webhooks** for recurring billing
3. **Set up admin dashboard** for managing users
4. **Add user dashboard** for profile and subscription management
5. **Configure email templates** for branded communications

---

## 🔒 9. Production Checklist

Before launching:

- [ ] Enable **Confirm email** in Supabase
- [ ] Publish Google OAuth consent screen
- [ ] Submit Facebook app for review (email permission)
- [ ] Update redirect URIs to production domain
- [ ] Set production `Site URL` in Supabase
- [ ] Enable RLS on all tables
- [ ] Test complete user journey (sign up → profile → subscribe)
- [ ] Set up monitoring for auth errors
- [ ] Configure backup admin access

---

## 📞 Support

If you encounter issues:
- Supabase Docs: https://supabase.com/docs/guides/auth
- Google OAuth: https://developers.google.com/identity/protocols/oauth2
- Facebook Login: https://developers.facebook.com/docs/facebook-login

---

**Last Updated**: 2025-11-13  
**Work ID**: MA-AUTH-OAUTH-SETUP-2025-11-13T12:45:00+08:00
