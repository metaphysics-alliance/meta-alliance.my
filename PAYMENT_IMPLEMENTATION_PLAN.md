# Payment Processing Implementation Plan
**Meta Alliance MVP - Subscription-Based Payment System**

**Work ID:** MA-PAYMENT-SYSTEM-DESIGN-2025-11-13T21:44:00+08:00

---

## 📋 Project Overview

This document outlines the complete implementation plan for integrating payment processing into the Meta Alliance MVP. The system supports subscription-based services with multiple payment providers targeting Malaysian markets.

### Current Status
- ✅ Dual-stack architecture (Next.js + Vite) operational
- ✅ Supabase configured with comprehensive schema
- ✅ Cart system with localStorage persistence
- ✅ Basic checkout UI
- ✅ Database tables: `user_profiles`, `subscriptions`, `subscription_payments`, `newsletter_subscriptions`, `guest_orders`, `contact_enquiries`
- ⚠️ Cart selection bugs (needs fix)
- ⚠️ Missing payment gateway integrations
- ⚠️ Missing magic link email system
- ⚠️ Missing account creation flow

---

## 🎯 User Journey Flow

### Complete Checkout Journey:
```
1. Browse Services → /pricing
2. Add to Cart → Real-time cart badge updates
3. View Cart → /pricing/checkout (review selections)
4. Proceed to Payment → /checkout/payment
5. Fill Profile Info:
   - Full Name
   - Email (allow social signup: Google/Meta)
   - Phone Number
   - Residential/Business Address
   - City, State/Province, Postcode
   - Country
   - Newsletter opt-in
6. Select Payment Method:
   - Stripe (Credit/Debit Card)
   - FPX (Malaysian Online Banking)
   - Touch 'n Go (E-Wallet)
7. Process Payment → Payment provider integration
8. Payment Confirmation → /checkout/success
9. Send Receipt Email:
   - Payment confirmation
   - Service details
   - Magic link to https://master.meta-alliance.my
10. Account Creation via Magic Link:
    - User clicks magic link in email
    - Auto-login + profile completion wizard
    - Dashboard access
```

---

## 📊 Database Schema (Already Created)

### Existing Tables:
✅ **VERIFIED: All tables exist in Supabase** (confirmed 2025-11-13T21:51:00+08:00)

1. **`public.user_profiles`** ✅ EXISTS
   - Stores user account information
   - Fields: id, full_name, email, phone, address, preferred_language, preferred_currency, etc.
   - Status: 0 rows (ready for first user)

2. **`public.subscriptions`** ✅ EXISTS
   - Tracks active service subscriptions
   - Fields: user_id, service_id, price_myr, price_usd, status, billing_cycle, payment_provider
   - Status: Empty, ready for data

3. **`public.subscription_payments`** ✅ EXISTS
   - Individual payment transactions
   - Fields: subscription_id, amount, currency, payment_provider, status, receipt_url
   - Status: Empty, ready for data

4. **`public.newsletter_subscriptions`** ✅ EXISTS
   - Newsletter opt-ins (homepage + checkout)
   - Fields: email, full_name, status, source, preferred_language
   - Status: Empty, ready for data

5. **`public.guest_orders`** ✅ EXISTS
   - Pre-account checkout data
   - Fields: guest_email, guest_name, cart_items, payment_status, magic_link_token
   - Status: Empty, ready for data

6. **`public.contact_enquiries`** ✅ EXISTS
   - Contact form submissions
   - Fields: case_id, full_name, email, phone, topic, message, status
   - Status: Empty, ready for data

**Schema Source:** `/supabase/sql/user_profiles_subscriptions.sql`  
**Verification Script:** `/scripts/apply-supabase-schema.mjs`

---

## 🔧 Implementation Phases

### **PHASE 1: Fix Current Issues** (PRIORITY)
**Status:** ✅ COMPLETED (2025-11-13T21:51:00+08:00)

#### Issues to Fix:
1. ✅ Cart selection bug - clicking service selects entire row
2. ✅ `/pricing/cart` → should be `/pricing/checkout`
3. ✅ Cart items not showing in checkout
4. ✅ Add service descriptions to checkout table
5. ✅ Remove "Remove" column header (keep button, remove label)
6. ✅ Add cart icon with badge to navigation
7. ✅ Real-time cart badge updates
8. ✅ Standardize CTA buttons across website
9. ✅ Apply slide-in page transitions
10. ✅ Cancel order modal with cart clear functionality

**Deliverables:**
- Fixed cart selection behavior
- Proper route naming (/pricing/checkout)
- Cart persistence working correctly
- Navigation cart icon with live badge
- Standardized button styling
- Smooth page transitions

---

### **PHASE 2: Payment Gateway Integration** (NEXT)
**Status:** Not Started

#### 2.1 Stripe Integration
**Provider:** Stripe  
**Methods:** Credit Card, Debit Card  
**Documentation:** https://stripe.com/docs/payments

**Tasks:**
- [ ] Create Stripe account & get API keys
- [ ] Install Stripe SDK: `npm install @stripe/stripe-js @stripe/react-stripe-js`
- [ ] Create Stripe payment intent endpoint
- [ ] Build card payment UI component
- [ ] Handle 3D Secure authentication
- [ ] Setup webhook for payment confirmation
- [ ] Test with Stripe test cards

**Environment Variables Needed:**
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

---

#### 2.2 FPX Integration (Malaysia Online Banking)
**Provider:** FPX via Stripe or direct integration  
**Documentation:** https://stripe.com/docs/payments/fpx

**Tasks:**
- [ ] Enable FPX in Stripe dashboard (if using Stripe)
- [ ] Add FPX payment method to checkout
- [ ] Handle bank selection UI
- [ ] Redirect flow for bank authentication
- [ ] Webhook handling for async confirmation
- [ ] Test with FPX test banks

**FPX Banks Supported:**
- Maybank2U, CIMB Clicks, Hong Leong Bank, RHB, AmBank, Bank Islam, etc.

---

#### 2.3 Touch 'n Go E-Wallet
**Provider:** Touch 'n Go API or payment aggregator (e.g., iPay88, MOLPay)  
**Documentation:** https://developer.tngdigital.com.my/

**Tasks:**
- [ ] Register Touch 'n Go merchant account
- [ ] Get API credentials
- [ ] Install TNG SDK (if available)
- [ ] Build TNG payment flow
- [ ] QR code generation (if applicable)
- [ ] Deep link to TNG app
- [ ] Webhook for payment status
- [ ] Test with sandbox credentials

**Alternative:** Use payment aggregator like **iPay88** or **MOLPay** which supports TNG + FPX + cards in one integration.

---

### **PHASE 3: Email System & Magic Links**
**Status:** Not Started

#### 3.1 Email Service Setup
**Provider Options:**
- **Supabase Auth** (built-in email templates)
- **Resend** (modern email API)
- **SendGrid** (enterprise-grade)

**Recommended:** Supabase Auth + Resend for transactional emails

**Tasks:**
- [ ] Configure email provider
- [ ] Design email templates:
  - Payment confirmation
  - Receipt with service details
  - Magic link for account creation
  - Welcome email after account setup
- [ ] HTML/CSS email templates (responsive)
- [ ] Setup SMTP/API credentials
- [ ] Test email delivery

**Environment Variables:**
```env
RESEND_API_KEY=re_...
EMAIL_FROM=noreply@meta-alliance.my
EMAIL_REPLY_TO=support@meta-alliance.my
```

---

#### 3.2 Magic Link Implementation
**Tasks:**
- [ ] Generate secure magic link tokens (UUID + expiry)
- [ ] Store token in `guest_orders.magic_link_token`
- [ ] Send email with magic link
- [ ] Create magic link handler route: `/auth/magic/:token`
- [ ] Verify token on click
- [ ] Auto-create Supabase Auth account
- [ ] Populate `user_profiles` from `guest_orders` data
- [ ] Mark order as `account_created = true`
- [ ] Redirect to profile completion wizard

**Magic Link URL Format:**
```
https://master.meta-alliance.my/auth/magic/{token}?email={email}
```

**Security:**
- Token expires after 24 hours
- One-time use only
- Email verification required

---

### **PHASE 4: Social Authentication (Google/Meta)**
**Status:** Not Started

#### 4.1 Google OAuth
**Provider:** Supabase Auth (Google provider)  
**Documentation:** https://supabase.com/docs/guides/auth/social-login/auth-google

**Tasks:**
- [ ] Create Google Cloud Console project
- [ ] Enable Google OAuth API
- [ ] Get Client ID and Client Secret
- [ ] Configure redirect URLs in Google Console
- [ ] Add Google provider in Supabase Auth settings
- [ ] Build "Sign in with Google" button
- [ ] Handle OAuth callback
- [ ] Sync profile data to `user_profiles`

**Redirect URLs:**
```
https://master.meta-alliance.my/auth/callback
http://localhost:5173/auth/callback (dev)
```

---

#### 4.2 Meta (Facebook) OAuth
**Provider:** Supabase Auth (Facebook provider)  
**Documentation:** https://supabase.com/docs/guides/auth/social-login/auth-facebook

**Tasks:**
- [ ] Create Meta Developer App
- [ ] Enable Facebook Login product
- [ ] Get App ID and App Secret
- [ ] Configure OAuth redirect URIs
- [ ] Add Facebook provider in Supabase Auth
- [ ] Build "Continue with Facebook" button
- [ ] Handle OAuth callback
- [ ] Request necessary permissions (email, public_profile)

---

### **PHASE 5: Profile Completion & Dashboard**
**Status:** Not Started

#### 5.1 Profile Completion Wizard
**Route:** `/profile/complete`

**Steps:**
1. **Welcome** - Greet user, explain next steps
2. **Basic Info** - Confirm name, email (pre-filled from OAuth/magic link)
3. **Contact Details** - Phone number
4. **Address** - Full address (residential/business)
5. **Preferences** - Language (EN/CN), Currency (MYR/USD), Timezone
6. **Marketing Consent** - Newsletter, updates

**Tasks:**
- [ ] Multi-step form component
- [ ] Progress indicator
- [ ] Form validation
- [ ] Save to `user_profiles` on each step
- [ ] Mark `profile_completed = true` on finish
- [ ] Redirect to dashboard

**Component:** `src/components/ProfileCompletionForm.tsx` (already exists, needs enhancement)

---

#### 5.2 User Dashboard
**Route:** `/dashboard`

**Features:**
- Active subscriptions list
- Payment history
- Download receipts/invoices
- Manage billing address
- Update payment method
- Cancel/pause subscription
- Newsletter preferences
- Account settings

**Tasks:**
- [ ] Dashboard layout component
- [ ] Subscriptions table with status badges
- [ ] Payment history timeline
- [ ] Invoice download links
- [ ] Update payment method flow
- [ ] Cancel subscription modal
- [ ] Account settings form
- [ ] Protected route (require auth)

---

### **PHASE 6: Payment Webhooks & Status Handling**
**Status:** Not Started

#### 6.1 Webhook Endpoints
**Purpose:** Receive payment status updates from providers

**Endpoints:**
- `/api/webhooks/stripe` - Stripe events
- `/api/webhooks/fpx` - FPX status updates
- `/api/webhooks/tng` - Touch 'n Go callbacks

**Tasks:**
- [ ] Create webhook handler functions
- [ ] Verify webhook signatures (security)
- [ ] Parse payment events:
  - `payment_intent.succeeded`
  - `payment_intent.failed`
  - `charge.refunded`
- [ ] Update `subscription_payments` table
- [ ] Update `subscriptions.status`
- [ ] Send confirmation emails
- [ ] Trigger magic link email (on success)
- [ ] Handle failed payment retry logic

**Webhook Events to Handle:**
```javascript
// Stripe
payment_intent.succeeded → Update payment to "succeeded"
payment_intent.payment_failed → Update to "failed", send retry email
charge.refunded → Update to "refunded", notify user
invoice.payment_succeeded → Recurring payment success

// FPX
fpx.payment.completed → Payment successful
fpx.payment.failed → Payment failed

// TNG
tng.payment.success → Payment confirmed
tng.payment.pending → Awaiting user action
tng.payment.failed → Payment declined
```

---

### **PHASE 7: Receipt Generation & Email Design**
**Status:** Not Started

#### 7.1 Receipt Design
**Format:** HTML Email + PDF attachment (optional)

**Receipt Components:**
- Company logo & branding
- Receipt number (e.g., `MA-RCP-20251113-ABC123`)
- Date & time
- Customer details (name, email, address)
- Services purchased (list with prices)
- Subtotal, taxes (if applicable), total
- Payment method used
- Transaction ID
- Magic link CTA button
- Support contact info

**Tasks:**
- [ ] Design HTML email template
- [ ] Create PDF generator (optional, using `jsPDF` or server-side)
- [ ] Generate unique receipt numbers
- [ ] Store receipt URL in `subscription_payments.receipt_url`
- [ ] Attach PDF or link to receipt page
- [ ] Test across email clients (Gmail, Outlook, Apple Mail)

---

#### 7.2 Email Template Design
**Templates Needed:**
1. **Payment Confirmation Email**
   - Subject: "Payment Confirmed - Your Meta Alliance Services"
   - Body: Confirmation message, receipt attached, magic link CTA

2. **Welcome Email** (after account creation)
   - Subject: "Welcome to Meta Alliance"
   - Body: Onboarding guide, next steps, dashboard link

3. **Failed Payment Email**
   - Subject: "Payment Failed - Action Required"
   - Body: Retry instructions, update payment method link

4. **Subscription Reminder** (recurring)
   - Subject: "Your subscription renews in 3 days"
   - Body: Renewal notice, invoice preview

**Design Guidelines:**
- Mobile-responsive
- Dark theme with gold accents (brand consistency)
- Clear CTAs
- Footer with unsubscribe link, legal info

---

### **PHASE 8: Payment Status Pages**
**Status:** Not Started

#### 8.1 Success Page
**Route:** `/checkout/success`

**Content:**
- ✅ Success animation/icon
- Payment confirmation message
- Order summary
- Receipt download link
- Magic link email notice
- "Go to Dashboard" CTA (if logged in)
- "Check your email" message

---

#### 8.2 Pending Page
**Route:** `/checkout/pending`

**Use Case:** FPX/TNG redirects while waiting for bank confirmation

**Content:**
- ⏳ Processing animation
- "Your payment is being processed"
- Expected wait time
- "We'll email you once confirmed"
- "Return to homepage" link

---

#### 8.3 Failed Page
**Route:** `/checkout/failed`

**Content:**
- ❌ Error icon
- "Payment failed" message
- Reason (if available from provider)
- "Retry payment" button → back to /checkout/payment
- "Contact support" link
- FAQ/troubleshooting tips

---

## 🔐 Security Considerations

### Payment Security:
- ✅ **PCI Compliance:** Use Stripe/FPX tokenization (no card data stored)
- ✅ **HTTPS Only:** Enforce SSL certificates
- ✅ **Webhook Signature Verification:** Validate all webhook requests
- ✅ **Environment Variables:** Never commit secrets to git
- ✅ **Rate Limiting:** Prevent payment API abuse

### Authentication Security:
- ✅ **Magic Link Expiry:** 24-hour token lifetime
- ✅ **One-time Use:** Invalidate token after use
- ✅ **Email Verification:** Require email match for token redemption
- ✅ **Password Hashing:** Use Supabase Auth (bcrypt)
- ✅ **Row Level Security (RLS):** Supabase policies already configured

### Data Privacy:
- ✅ **PDPA Compliance** (Malaysia Personal Data Protection Act)
- ✅ **Consent Management:** Track marketing consent, newsletter opt-ins
- ✅ **Data Encryption:** At rest (Supabase) and in transit (HTTPS)
- ✅ **Right to Erasure:** Allow users to delete accounts
- ✅ **Privacy Policy:** Already created (`/legal/privacy`)

---

## 🧪 Testing Checklist

### Payment Testing:
- [ ] Stripe test card: `4242 4242 4242 4242`
- [ ] Stripe 3D Secure test card: `4000 0027 6000 3184`
- [ ] Stripe declined card: `4000 0000 0000 0002`
- [ ] FPX test bank accounts
- [ ] Touch 'n Go sandbox credentials
- [ ] Refund flow testing
- [ ] Failed payment retry flow
- [ ] Webhook delivery simulation

### User Journey Testing:
- [ ] Guest checkout (no account)
- [ ] Magic link email delivery
- [ ] Magic link account creation
- [ ] Google OAuth signup
- [ ] Facebook OAuth signup
- [ ] Profile completion wizard
- [ ] Dashboard access
- [ ] Newsletter opt-in/opt-out
- [ ] Contact form submission
- [ ] Cart persistence across sessions
- [ ] Multi-device cart sync

### Edge Cases:
- [ ] Duplicate email registration
- [ ] Expired magic link
- [ ] Invalid magic token
- [ ] Payment timeout
- [ ] Network failure during payment
- [ ] Browser back button during checkout
- [ ] Multiple tab/window handling
- [ ] Mobile responsive testing

---

## 📦 Required NPM Packages

### Payment Providers:
```bash
npm install @stripe/stripe-js @stripe/react-stripe-js stripe
```

### Email:
```bash
npm install resend
# OR
npm install @sendgrid/mail
```

### PDF Generation (Optional):
```bash
npm install jspdf
```

### Utilities:
```bash
npm install uuid nanoid
```

---

## 🌍 Environment Variables Required

### Supabase (Already Configured):
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

### Stripe:
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### FPX (if direct integration):
```env
FPX_MERCHANT_ID=...
FPX_API_KEY=...
FPX_WEBHOOK_SECRET=...
```

### Touch 'n Go:
```env
TNG_MERCHANT_ID=...
TNG_API_KEY=...
TNG_API_SECRET=...
TNG_WEBHOOK_URL=https://meta-alliance.my/api/webhooks/tng
```

### Email (Resend):
```env
RESEND_API_KEY=re_...
EMAIL_FROM=noreply@meta-alliance.my
EMAIL_REPLY_TO=support@meta-alliance.my
```

### Google OAuth:
```env
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

### Meta OAuth:
```env
FACEBOOK_APP_ID=...
FACEBOOK_APP_SECRET=...
```

---

## 📈 Success Metrics

### KPIs to Track:
- **Conversion Rate:** % of visitors who complete payment
- **Cart Abandonment Rate:** % who add to cart but don't checkout
- **Payment Success Rate:** % of successful transactions vs. failed
- **Average Order Value (AOV):** Total revenue / # orders
- **Newsletter Signup Rate:** % of checkouts with newsletter opt-in
- **Magic Link Click Rate:** % of emails with link clicked
- **Profile Completion Rate:** % of magic link users who complete profile
- **Payment Method Distribution:** Stripe vs. FPX vs. TNG usage

### Monitoring:
- Setup Supabase Analytics
- Track payment events in Google Analytics
- Monitor Stripe Dashboard for payment insights
- Email delivery rates (Resend/SendGrid analytics)

---

## 🚀 Next Steps

### Immediate (This Session):
1. ✅ Fix cart selection bugs
2. ✅ Fix routing `/pricing/cart` → `/pricing/checkout`
3. ✅ Add service descriptions to checkout
4. ✅ Add cart icon with badge to navigation
5. ✅ Standardize CTA buttons
6. ✅ Implement page transitions

### Short Term (Next 1-2 weeks):
1. Integrate Stripe payment (Phase 2.1)
2. Setup email system with Resend (Phase 3.1)
3. Implement magic link flow (Phase 3.2)
4. Build success/pending/failed pages (Phase 8)
5. Test end-to-end payment flow

### Medium Term (Next 1 month):
1. Add FPX integration (Phase 2.2)
2. Add Touch 'n Go (Phase 2.3)
3. Setup Google/Meta OAuth (Phase 4)
4. Build user dashboard (Phase 5.2)
5. Setup payment webhooks (Phase 6)

### Long Term (Next 2-3 months):
1. Receipt generation system (Phase 7)
2. Subscription management features
3. Admin dashboard for managing orders
4. Analytics & reporting dashboard
5. Email automation (reminders, renewals)

---

## 📞 Support & Resources

### Documentation Links:
- **Stripe Docs:** https://stripe.com/docs
- **Supabase Auth:** https://supabase.com/docs/guides/auth
- **Resend API:** https://resend.com/docs
- **FPX Integration:** https://www.mepsfpx.com.my/
- **Touch 'n Go API:** https://developer.tngdigital.com.my/

### Internal Resources:
- **AGENTS.md:** Build rules and workflow
- **GEMINI.md:** Project context for AI assistants
- **Supabase SQL:** `/supabase/sql/user_profiles_subscriptions.sql`
- **Pricing Data:** `/shared/i18n/dictionary.js`

---

## ✅ Work Log Entry

```
MA-PAYMENT-SYSTEM-DESIGN-2025-11-13T21:44:00+08:00: Authored comprehensive payment processing implementation plan covering 8 phases from cart fixes to full subscription management system with Stripe/FPX/TNG integration, magic link auth, and email receipts.
```

---

**End of Implementation Plan**

**Last Updated:** 2025-11-13T21:44:00+08:00  
**Version:** 1.0  
**Status:** Phase 1 In Progress
