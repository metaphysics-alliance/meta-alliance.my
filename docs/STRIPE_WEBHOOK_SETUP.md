# Stripe Webhook Secret Setup Guide

**Last Updated:** 2025-11-14  
**Stripe API Version:** Latest (2024)

---

## 🎯 What is STRIPE_WEBHOOK_SECRET?

The webhook secret is a **signing key** that Stripe uses to cryptographically sign webhook events. Your server verifies this signature to ensure webhook requests are genuinely from Stripe (not attackers).

**Security:** Without webhook signature verification, anyone could send fake payment events to your server!

---

## 📋 Prerequisites

Before you start:
- ✅ Stripe account created at [stripe.com](https://stripe.com)
- ✅ Project deployed to a public URL (for production webhooks)
- ✅ `STRIPE_SECRET_KEY` already configured in `.env.local`

---

## 🔧 Option 1: Local Development (Stripe CLI - Recommended)

### Step 1: Install Stripe CLI

**Windows (PowerShell as Administrator):**
```powershell
# Using Scoop package manager
scoop bucket add stripe https://github.com/stripe/scoop-stripe-cli.git
scoop install stripe
```

**macOS:**
```bash
brew install stripe/stripe-cli/stripe
```

**Linux:**
```bash
# Download latest release
wget https://github.com/stripe/stripe-cli/releases/latest/download/stripe_linux_x86_64.tar.gz
tar -xvf stripe_linux_x86_64.tar.gz
sudo mv stripe /usr/local/bin/
```

**Verify Installation:**
```bash
stripe --version
# Should output: stripe version X.X.X
```

---

### Step 2: Login to Stripe CLI

```bash
stripe login
```

This will:
1. Open your browser
2. Ask you to authorize the CLI
3. Link your Stripe account

**Output:**
```
Your pairing code is: word-word-word
Press Enter to open the browser or visit https://dashboard.stripe.com/stripecli/confirm_auth?t=xxx
```

---

### Step 3: Start Local Webhook Forwarding

```bash
stripe listen --forward-to http://localhost:3000/api/webhooks
```

**What This Does:**
- Creates a temporary webhook endpoint
- Forwards all Stripe events to your local server
- **Generates a webhook signing secret** (whsec_xxx)

**Output:**
```
> Ready! You are using Stripe API Version [2024-XX-XX]. Your webhook signing secret is whsec_...REDACTED_EXAMPLE_SECRET... (^C to quit)
```

---

### Step 4: Copy the Webhook Secret

**Look for this line in the output:**
```
Your webhook signing secret is whsec_...REDACTED_EXAMPLE_SECRET...
```

**Copy the `whsec_xxx` value and add to `.env.local`:**
```bash
# .env.local
STRIPE_WEBHOOK_SECRET=whsec_...REDACTED_EXAMPLE_SECRET...
```

**⚠️ Important:** This secret is **temporary** and only works while `stripe listen` is running!

---

### Step 5: Test Webhook Events

**In a separate terminal, trigger a test event:**
```bash
stripe trigger payment_intent.succeeded
```

**Expected Output:**
```
Setting up fixture for: payment_intent
Running fixture for: payment_intent
Trigger succeeded! Check dashboard for event details.
```

**Check your server logs** - you should see the webhook hit your `/api/webhooks` endpoint!

---

## 🌐 Option 2: Production Webhooks (Live Server)

### Step 1: Deploy Your Application

Your webhook endpoint must be publicly accessible:
```
https://yourdomain.com/api/webhooks
```

**For Metaphysics Alliance:**
```
https://meta-alliance.my/api/webhooks
```

---

### Step 2: Create Webhook Endpoint in Stripe Dashboard

1. **Go to:** [https://dashboard.stripe.com/webhooks](https://dashboard.stripe.com/webhooks)

2. **Click:** "Add endpoint" (top right button)

3. **Fill in the form:**
   - **Endpoint URL:** `https://meta-alliance.my/api/webhooks`
   - **Description:** "Production Payment Webhooks"
   - **API Version:** Leave as default (latest)

4. **Select Events to Listen To:**
   - Click "Select events"
   - Choose these critical events:
     - ✅ `payment_intent.succeeded`
     - ✅ `payment_intent.payment_failed`
     - ✅ `payment_intent.canceled`
     - ✅ `payment_intent.processing`
     - ✅ `charge.succeeded`
     - ✅ `charge.failed`
     - ✅ `charge.refunded`

5. **Click "Add endpoint"**

---

### Step 3: Reveal & Copy Signing Secret

After creating the endpoint:

1. **Click on your new webhook endpoint** (shows in the list)

2. **Scroll down to "Signing secret" section**

3. **Click "Reveal" button**

4. **Copy the secret** (starts with `whsec_`)

**Screenshot Reference:**
```
┌─────────────────────────────────────────┐
│ Signing secret                          │
│ ┌─────────────────────────────────────┐ │
│ │ whsec_abc...xyz            [Reveal] │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Click "Reveal" to see full secret      │
└─────────────────────────────────────────┘
```

---

### Step 4: Add to Environment Variables

**Local Development:**
```bash
# .env.local
STRIPE_WEBHOOK_SECRET=whsec_abc123xyz789...
```

**Production (Vercel/Netlify):**

**Vercel:**
```bash
vercel env add STRIPE_WEBHOOK_SECRET production
# Paste the whsec_xxx value when prompted
```

**Netlify:**
```bash
netlify env:set STRIPE_WEBHOOK_SECRET whsec_abc123xyz789...
```

**GitHub Actions:**
```yaml
# Add to repository secrets:
Settings → Secrets and variables → Actions → New repository secret
Name: STRIPE_WEBHOOK_SECRET
Value: whsec_abc123xyz789...
```

---

## 🧪 Testing Webhooks

### Test Local Webhook with Stripe CLI

```bash
# Terminal 1: Start local server
npm run dev

# Terminal 2: Forward webhooks
stripe listen --forward-to http://localhost:3000/api/webhooks

# Terminal 3: Trigger test event
stripe trigger payment_intent.succeeded
```

**Expected Flow:**
1. Stripe CLI triggers event
2. Event forwarded to local server
3. Server logs show webhook received
4. Database updated (check `guest_orders` table)
5. Email sent (check Resend dashboard)

---

### Test Production Webhook

**Option A: Use Stripe Dashboard "Send test webhook"**

1. Go to: [https://dashboard.stripe.com/test/webhooks](https://dashboard.stripe.com/test/webhooks)
2. Click your webhook endpoint
3. Click "Send test webhook" button
4. Select event type: `payment_intent.succeeded`
5. Click "Send test webhook"

**Option B: Create Real Test Payment**

1. Use Stripe test card: `4242 4242 4242 4242`
2. Any future expiry date (e.g., 12/34)
3. Any 3-digit CVC (e.g., 123)
4. Complete checkout on your site
5. Webhook fires automatically!

---

## 🔍 Verify Webhook Configuration

### Check Webhook Status in Dashboard

**Go to:** [https://dashboard.stripe.com/webhooks](https://dashboard.stripe.com/webhooks)

**Healthy Webhook Shows:**
- ✅ Status: **Enabled**
- ✅ Events delivered: **XX successful**
- ✅ Latest attempt: **Success (200)**
- ✅ Signed: **Yes**

**Unhealthy Webhook Shows:**
- ❌ Status: **Error**
- ❌ Latest attempt: **Failed (400/500)**
- ❌ Error message: Connection timeout / Invalid signature

---

### Debug Failed Webhooks

**Common Issues:**

**1. "No signatures found matching expected signature"**
```
❌ Cause: Wrong webhook secret
✅ Fix: Copy secret from exact webhook endpoint
```

**2. "Webhook endpoint returned error 401"**
```
❌ Cause: Server rejecting request
✅ Fix: Disable authentication on webhook route
```

**3. "Connection timeout"**
```
❌ Cause: Server not responding fast enough
✅ Fix: Respond with 200 immediately, process async
```

**4. "SSL certificate error"**
```
❌ Cause: Invalid HTTPS certificate
✅ Fix: Use valid SSL cert (Let's Encrypt, Cloudflare)
```

---

## 📝 Example Webhook Handler Code

**File:** `app/api/webhooks/route.ts`

```typescript
import { headers } from 'next/headers'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia'
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const signature = headers().get('stripe-signature')!

    // ✅ Verify webhook signature
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    )

    // Handle specific events
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object
        console.log('✅ Payment succeeded:', paymentIntent.id)
        // Update database, send email, etc.
        break

      case 'payment_intent.payment_failed':
        const failedIntent = event.data.object
        console.log('❌ Payment failed:', failedIntent.id)
        // Send failure email
        break

      default:
        console.log('ℹ️ Unhandled event type:', event.type)
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200
    })

  } catch (err) {
    console.error('❌ Webhook error:', err.message)
    return new Response(`Webhook Error: ${err.message}`, {
      status: 400
    })
  }
}
```

---

## 🎯 Quick Reference

### Environment Variable Format

```bash
# .env.local
STRIPE_WEBHOOK_SECRET=whsec_...REDACTED_EXAMPLE_SECRET...
```

**Key Characteristics:**
- ✅ Starts with `whsec_`
- ✅ 64+ characters long
- ✅ Contains letters and numbers
- ❌ NOT the same as `STRIPE_SECRET_KEY` (which starts with `sk_`)

---

### Stripe CLI Commands Cheat Sheet

```bash
# Install (Windows)
scoop install stripe

# Login
stripe login

# List webhooks
stripe webhooks list

# Forward to local server
stripe listen --forward-to http://localhost:3000/api/webhooks

# Trigger test event
stripe trigger payment_intent.succeeded

# View event details
stripe events list

# Tail live events
stripe listen --print-json
```

---

## 🆘 Troubleshooting

### "stripe: command not found"

**Windows:**
```powershell
# Install Scoop first
iwr -useb get.scoop.sh | iex

# Then install Stripe
scoop bucket add stripe https://github.com/stripe/scoop-stripe-cli.git
scoop install stripe
```

**macOS/Linux:**
```bash
# Check if Stripe CLI is in PATH
which stripe

# If not found, add to PATH
export PATH=$PATH:/usr/local/bin
```

---

### "Webhook secret not found"

1. **Check `.env.local` file exists** in project root
2. **Verify variable name:** `STRIPE_WEBHOOK_SECRET` (not `WEBHOOK_SECRET`)
3. **Restart dev server** after adding variable
4. **Check for typos** in the secret value

---

### "Signature verification failed"

1. **Use exact secret** from webhook endpoint
2. **Don't manually format** the secret (copy-paste as-is)
3. **Check for whitespace** at start/end of secret
4. **Verify endpoint URL** matches exactly (http vs https, port number)

---

## 📚 Additional Resources

**Stripe Documentation:**
- [Webhook Events](https://stripe.com/docs/webhooks)
- [Stripe CLI](https://stripe.com/docs/stripe-cli)
- [Testing Webhooks](https://stripe.com/docs/webhooks/test)
- [Webhook Best Practices](https://stripe.com/docs/webhooks/best-practices)

**Metaphysics Alliance Docs:**
- `docs/PHASE2_COMPLETION.md` - Full payment system guide
- `app/api/webhooks/route.ts` - Webhook handler implementation
- `.env.local.example` - Environment variable template

---

## ✅ Checklist

**Before Going Live:**

- [ ] Webhook endpoint deployed to public URL
- [ ] Webhook created in Stripe Dashboard
- [ ] `STRIPE_WEBHOOK_SECRET` added to production environment
- [ ] Webhook signature verification implemented
- [ ] Test payment completed successfully
- [ ] Webhook logs show "200 OK" responses
- [ ] Database updates confirmed after webhook
- [ ] Email sends confirmed after webhook
- [ ] Error handling tested (invalid signature, timeout)
- [ ] Webhook endpoint monitoring enabled

---

**Work ID:** MA-STRIPE-WEBHOOK-GUIDE-2025-11-14T12:50:00+08:00

