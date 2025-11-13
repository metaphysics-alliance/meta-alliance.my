# Authentication & Subscription Flow Implementation Guide

This document provides the complete integration plan for adding authentication and subscription management to Meta Alliance.

---

## 📋 Implementation Summary

We've created:
1. ✅ **Database schema** (`user_profiles`, `subscriptions`, `subscription_payments`)
2. ✅ **Authentication library** with OAuth (Google/Facebook) + email/password + magic link
3. ✅ **Profile completion form** (4-step wizard)
4. ✅ **Auth pages** (sign in, sign up, callback handler)
5. ✅ **Setup guide** for Supabase OAuth configuration

---

## 🚀 Integration Steps

### Step 1: Install Dependencies (if needed)

```bash
# Already have @supabase/supabase-js
npm install react-icons  # For Google/Facebook icons (if not already installed)
```

### Step 2: Update Vite Router Configuration

Add auth routes to `src/routes/pageConfig.jsx`:

```javascript
// Import new components
import AuthPage from '../pages/AuthPage.tsx'
import AuthCallback from '../pages/AuthCallback.tsx'
import ProfileCompletionForm from '../components/ProfileCompletionForm.tsx'

// Add to routes array
export const routes = [
  // ... existing routes ...
  
  // Authentication routes
  { path: '/auth', element: <AuthPage locale="EN" /> },
  { path: '/auth/callback', element: <AuthCallback locale="EN" /> },
  { path: '/profile/complete', element: <ProfileCompletionForm locale="EN" /> },
]
```

### Step 3: Set Up Supabase Configuration

1. Follow `docs/auth-setup-guide.md` to configure:
   - Google OAuth credentials
   - Facebook OAuth credentials
   - Supabase auth settings
   - Database schema

2. Run the SQL schema:
   ```bash
   # Copy content from supabase/sql/user_profiles_subscriptions.sql
   # Paste into Supabase SQL Editor and execute
   ```

3. Update `.env.local` with Supabase keys

### Step 4: Protect Subscription Routes

Add authentication check before allowing checkout:

```typescript
// In src/pages/PricingPage.jsx
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { isAuthenticated } from '../lib/auth'

export default function PricingPage() {
  const navigate = useNavigate()
  
  useEffect(() => {
    checkAuth()
  }, [])
  
  const checkAuth = async () => {
    const authed = await isAuthenticated()
    if (!authed) {
      // Redirect to auth with return URL
      navigate(`/auth?redirect=${encodeURIComponent(window.location.pathname)}`)
    }
  }
  
  // ... rest of component
}
```

### Step 5: Add Auth State to Navigation

Update `src/components/Nav.jsx` to show user profile when signed in:

```javascript
import { useEffect, useState } from 'react'
import { getCurrentUser, getDisplayName, signOut } from '../lib/auth'

export default function Nav() {
  const [user, setUser] = useState(null)
  const [displayName, setDisplayName] = useState(null)
  
  useEffect(() => {
    loadUser()
  }, [])
  
  const loadUser = async () => {
    const currentUser = await getCurrentUser()
    setUser(currentUser)
    
    if (currentUser) {
      const name = await getDisplayName()
      setDisplayName(name)
    }
  }
  
  const handleSignOut = async () => {
    await signOut()
    setUser(null)
    navigate('/auth')
  }
  
  return (
    <nav>
      {/* ... existing nav items ... */}
      
      {user ? (
        <div className="flex items-center gap-4">
          <span className="text-white/70">Welcome, {displayName}</span>
          <button onClick={handleSignOut} className="text-gold">
            Sign Out
          </button>
        </div>
      ) : (
        <a href="/auth" className="text-gold">
          Sign In
        </a>
      )}
    </nav>
  )
}
```

### Step 6: Update "Subscribe" CTAs

Change all service CTA buttons to redirect to auth if not signed in:

```javascript
// In service pages
import { isAuthenticated } from '../lib/auth'

const handleSubscribe = async () => {
  const authed = await isAuthenticated()
  
  if (!authed) {
    // Redirect to auth, then back to this service
    window.location.href = `/auth?redirect=${encodeURIComponent(window.location.pathname)}`
  } else {
    // Add to cart or go to pricing
    navigate('/pricing')
  }
}
```

---

## 🔄 Complete User Journey

### For New Users:

```
1. User clicks "Subscribe" on service page
   ↓
2. Redirected to /auth (not signed in)
   ↓
3. User signs in with Google/Facebook/Email
   ↓
4. Redirected to /auth/callback
   ↓
5. Profile auto-created by database trigger
   ↓
6. Redirected to /profile/complete (profile incomplete)
   ↓
7. User fills out 4-step profile form
   ↓
8. Redirected back to /pricing
   ↓
9. User selects services and adds to cart
   ↓
10. User proceeds to checkout
    ↓
11. Payment processed (Stripe/FPX/TNG)
    ↓
12. Subscription created in database
    ↓
13. Confirmation email sent
    ↓
14. User dashboard shows active subscription
```

### For Returning Users:

```
1. User clicks "Subscribe" on service page
   ↓
2. Already authenticated (session exists)
   ↓
3. Directly shown pricing page
   ↓
4. Proceeds to checkout
   ↓
5. Payment & subscription created
```

---

## 🗂️ File Structure Reference

```
meta-alliance-mvp/
├── src/
│   ├── lib/
│   │   ├── auth.ts                          # ✅ NEW: Auth functions
│   │   ├── supabaseClient.ts                # Existing
│   │   └── supabaseAuth.ts                  # Can deprecate this
│   ├── components/
│   │   ├── ProfileCompletionForm.tsx        # ✅ NEW: Profile wizard
│   │   └── Nav.jsx                          # UPDATE: Add auth state
│   ├── pages/
│   │   ├── AuthPage.tsx                     # ✅ NEW: Sign in/up
│   │   ├── AuthCallback.tsx                 # ✅ NEW: OAuth callback
│   │   ├── PricingPage.jsx                  # UPDATE: Add auth check
│   │   └── CheckoutPage.jsx                 # UPDATE: Add auth check
│   └── routes/
│       └── pageConfig.jsx                   # UPDATE: Add auth routes
├── supabase/
│   └── sql/
│       └── user_profiles_subscriptions.sql  # ✅ NEW: Database schema
└── docs/
    ├── auth-setup-guide.md                  # ✅ NEW: OAuth config guide
    └── subscription-flow.md                 # ✅ THIS FILE
```

---

## 🧪 Testing Checklist

### OAuth Flow
- [ ] Google sign-in redirects correctly
- [ ] Facebook sign-in redirects correctly
- [ ] User profile auto-created in database
- [ ] OAuth callback handles errors gracefully

### Profile Completion
- [ ] All 4 steps validate correctly
- [ ] Malaysian states populate in dropdown
- [ ] Profile saves to database at each step
- [ ] Redirect works after completion

### Protected Routes
- [ ] Pricing page requires authentication
- [ ] Checkout page requires authentication
- [ ] Redirects work with `?redirect=` parameter

### Navigation
- [ ] Signed-in users see profile menu
- [ ] Sign out clears session
- [ ] Auth state persists on page refresh

---

## 🔐 Security Considerations

1. **RLS (Row Level Security)** is enabled on all tables
2. Users can only access their own profiles/subscriptions
3. Service role key used only in backend (Edge Functions)
4. OAuth tokens never exposed to client
5. HTTPS enforced on production domain
6. CSRF protection via Supabase session

---

## 📊 Database Tables

### `user_profiles`
Stores detailed user information collected during onboarding.

### `subscriptions`
Tracks active/paused/cancelled service subscriptions with billing cycles.

### `subscription_payments`
Records individual payment transactions linked to subscriptions.

---

## 🎯 Next Phase: Payment Integration

After authentication is working:

1. Add Stripe SDK for card payments
2. Add FPX integration (via Stripe or Billplz)
3. Add Touch 'n Go integration (via Revenue Monster)
4. Create Supabase Edge Functions for payment webhooks
5. Build user dashboard for managing subscriptions

See separate payment integration guide for details.

---

## 🐛 Troubleshooting

### "No user profile found"
→ Check if trigger `on_auth_user_created` is active in database

### "Redirect URI mismatch"
→ Verify Supabase callback URL in Google/Facebook console

### "Session not persisting"
→ Check `Site URL` in Supabase Auth settings

### "Profile completion skipped"
→ Verify `isProfileComplete()` checks required fields correctly

---

## 📞 Support Resources

- **Supabase Auth Docs**: https://supabase.com/docs/guides/auth
- **OAuth Provider Setup**: See `docs/auth-setup-guide.md`
- **Database Schema**: See `supabase/sql/user_profiles_subscriptions.sql`

---

**Work ID**: MA-AUTH-SUBSCRIPTION-FLOW-2025-11-13T12:50:00+08:00
