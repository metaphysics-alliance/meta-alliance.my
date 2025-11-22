# Order Resume & Recovery System
**How visitors can resume abandoned/failed payments**

---

## 🎯 The Problem

**Visitor closes browser during checkout → How do they resume payment later?**

Without a system, the order data exists in `guest_orders` but the visitor has:
- ❌ No account/login
- ❌ No way to find their order
- ❌ No unique identifier to resume
- ❌ Cart cleared from localStorage

---

## ✅ The Solution: Resume Token System

### **How It Works**

```
1. Visitor starts checkout → Creates guest_order
   - Generates unique resume_token (64-char hex)
   - Sets resume_token_expires_at = 7 days from now
   
2. System sends email:
   - Subject: "Complete Your Order - Meta Alliance"
   - Body: "You have items waiting in your cart"
   - CTA button: "Resume Order" → https://meta-alliance.my/checkout/resume/{token}
   
3. Days/weeks/months later:
   - Visitor clicks email link
   - Token validates against database
   - System restores: cart items, contact info, payment method
   - Visitor clicks "Pay Now" → proceeds to payment
```

---

## 🔐 Resume Token Security

### **Token Generation:**
```javascript
// 256-bit secure random token (64 hex characters)
encode(gen_random_bytes(32), 'hex')
// Example: "a3f7c89d2e5b4f1a8c6d9e7f3a5b8c2d4e9f6a1b7c3d8e5f2a4b9c6d7e8f1a3b"
```

### **Token Properties:**
- ✅ **Unique:** UUID-based, impossible to guess
- ✅ **Time-Limited:** Expires in 7 days
- ✅ **Single-Use Option:** Can be invalidated after successful payment
- ✅ **Email-Verified:** Token sent only to guest_email
- ✅ **Status-Gated:** Only works for pending/failed/abandoned orders

---

## 📧 Email Resume Workflow

### **Email Sent When:**

| Trigger | Timing | Email Type |
|---------|--------|------------|
| **Cart Abandonment** | Visitor closes browser without paying | "Complete Your Order" |
| **Payment Failed** | Payment declined/failed | "Retry Your Payment" |
| **Order Expired** | 24h passed, status=abandoned | "Your Order Expired - Recover Now" |

### **Email Contains:**
- Resume link with token
- Order summary (services, total)
- Expiry notice (7 days)
- Support contact

---

## 🔄 Complete Resume Flow

### **Scenario 1: Visitor Closes Browser**

```
Timeline:
---------
Day 1, 10:00 AM - Visitor adds services to cart
Day 1, 10:15 AM - Starts checkout, fills form
Day 1, 10:20 AM - Closes browser (emergency call)
Day 1, 10:21 AM - System creates guest_order (status=pending)
Day 1, 10:22 AM - Email sent: "Complete Your Order"

Day 3, 2:00 PM  - Visitor opens email, clicks "Resume Order"
Day 3, 2:01 PM  - System validates token → restores order
Day 3, 2:02 PM  - Pre-fills form with saved data
Day 3, 2:05 PM  - Visitor clicks "Pay Now" → payment succeeds
Day 3, 2:06 PM  - Status updates: pending → succeeded
```

**Database States:**

```sql
-- Day 1, 10:21 AM (order created)
payment_status: 'pending'
resume_token: 'a3f7c89d2e5b4f1a...'
resume_token_expires_at: '2025-11-21T10:21:00Z'
order_expires_at: '2025-11-15T10:21:00Z' (24h)

-- Day 3, 2:01 PM (visitor resumes)
-- Token still valid (< 7 days)
-- Order expired but recoverable (< 30 days)

-- Day 3, 2:06 PM (payment succeeds)
payment_status: 'succeeded'
updated_at: '2025-11-17T14:06:00Z'
```

---

### **Scenario 2: Payment Failed**

```
Timeline:
---------
Day 1, 10:00 AM - Visitor completes checkout
Day 1, 10:05 AM - Payment fails (insufficient funds)
Day 1, 10:06 AM - Status: pending → failed
Day 1, 10:07 AM - Email sent: "Payment Failed - Retry Now"

Day 5, 9:00 AM  - Visitor gets paid (funds available)
Day 5, 9:15 AM  - Opens email, clicks "Retry Payment"
Day 5, 9:16 AM  - System restores order details
Day 5, 9:17 AM  - Visitor clicks "Pay Now" → payment succeeds
Day 5, 9:18 AM  - Status updates: failed → succeeded
```

**Database Updates:**

```sql
-- Day 1, 10:06 AM (payment failed)
payment_status: 'failed'
payment_attempts: 1
payment_failure_reason: 'insufficient_funds'
last_payment_attempt_at: '2025-11-14T10:05:00Z'

-- Day 5, 9:18 AM (retry succeeds)
payment_status: 'succeeded'
payment_attempts: 2
last_payment_attempt_at: '2025-11-19T09:17:00Z'
```

---

### **Scenario 3: Abandoned Order (Auto Recovery)**

```
Timeline:
---------
Day 1, 10:00 AM - Visitor creates order (status=pending)
Day 2, 10:01 AM - Cron job marks as 'abandoned' (24h passed)
Day 2, 10:05 AM - Email sent: "Don't Miss Out - Complete Order"

Day 10, 3:00 PM - Visitor remembers, opens email
Day 10, 3:01 PM - Clicks resume link → validates token
Day 10, 3:02 PM - System restores order
Day 10, 3:05 PM - Completes payment → status=succeeded
```

**Cron Job (runs hourly):**

```sql
-- Marks expired orders as abandoned
SELECT public.mark_abandoned_orders();
-- Returns count of updated orders
```

---

## 🌐 Implementation: Resume Routes

### **Frontend Routes:**

```javascript
// Route definition (React Router)
{
  path: '/checkout/resume/:token',
  element: <ResumeOrderPage />
}
```

### **ResumeOrderPage.jsx Logic:**

```javascript
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { usePricingCart } from '../components/PricingCartContext'

export default function ResumeOrderPage() {
  const { token } = useParams()
  const navigate = useNavigate()
  const { setItems } = usePricingCart()
  
  useEffect(() => {
    async function resumeOrder() {
      // 1. Validate token
      const { data, error } = await supabase
        .rpc('validate_resume_token', { token })
      
      if (error || !data || data.length === 0) {
        // Token invalid/expired
        navigate('/checkout/resume/expired')
        return
      }
      
      const order = data[0]
      
      // 2. Restore cart items
      setItems(order.cart_items)
      
      // 3. Store order data in sessionStorage for form pre-fill
      sessionStorage.setItem('resuming_order', JSON.stringify({
        orderId: order.id,
        email: order.guest_email,
        name: order.guest_name,
        phone: order.guest_phone,
        paymentMethod: order.payment_method,
        currency: order.currency
      }))
      
      // 4. Redirect to payment page
      navigate('/checkout/payment')
    }
    
    resumeOrder()
  }, [token])
  
  return <div>Loading your order...</div>
}
```

---

### **Update PaymentPage.jsx: Pre-fill from Resume**

```javascript
// At top of PaymentPage component
useEffect(() => {
  const resumingData = sessionStorage.getItem('resuming_order')
  
  if (resumingData) {
    const order = JSON.parse(resumingData)
    
    // Pre-fill form with saved data
    setFormData(prev => ({
      ...prev,
      fullName: order.name,
      email: order.email,
      phone: order.phone,
      preferredCurrency: order.currency
    }))
    
    setPaymentMethod(order.paymentMethod)
    
    // Show resume banner
    setShowResumeNotice(true)
    
    // Clear after use
    sessionStorage.removeItem('resuming_order')
  }
}, [])
```

---

## 📊 Database Queries

### **Check for Resumable Order (on /pricing page):**

```javascript
// When visitor enters email in newsletter/contact form
async function checkForPendingOrder(email) {
  const { data } = await supabase
    .rpc('get_resumable_order', { user_email: email })
  
  if (data && data.length > 0) {
    const order = data[0]
    
    // Show banner: "You have a pending order. Resume now?"
    showResumeOrderBanner({
      items: order.cart_items,
      total: order.currency === 'MYR' ? order.total_myr : order.total_usd,
      currency: order.currency,
      resumeUrl: `/checkout/resume/${order.resume_token}`
    })
  }
}
```

---

### **Create Resume Token (backend after order creation):**

```javascript
// In PaymentPage.jsx handleSubmit, after creating guest_order
const { data: orderData } = await supabase
  .from('guest_orders')
  .insert([{ ...orderDetails }])
  .select()
  .single()

// Generate resume token
const { data: tokenData } = await supabase
  .rpc('create_resume_token', { order_id: orderData.id })

const resumeToken = tokenData

// Send email with resume link
await sendResumeEmail({
  to: formData.email,
  resumeUrl: `https://meta-alliance.my/checkout/resume/${resumeToken}`,
  orderDetails: orderData
})
```

---

## 📧 Email Templates

### **1. Abandonment Email (Immediate)**

**Subject:** Complete Your Order - Meta Alliance  
**Sent:** 5 minutes after order creation if no payment

```html
<h2>You left items in your cart</h2>

<p>Hi {{guest_name}},</p>

<p>You recently started an order but didn't complete payment. Your items are still waiting:</p>

<ul>
  {{#each cart_items}}
  <li>{{this.name}} - {{this.price}}</li>
  {{/each}}
</ul>

<p><strong>Total: {{currency}} {{total}}</strong></p>

<a href="{{resume_url}}" class="cta-button">
  Complete Your Order Now
</a>

<p>This link expires in 7 days.</p>
```

---

### **2. Failed Payment Email**

**Subject:** Payment Failed - Retry Your Order  
**Sent:** Immediately after payment failure

```html
<h2>Payment Unsuccessful</h2>

<p>We couldn't process your payment for the following reason:</p>

<p><strong>{{failure_reason}}</strong></p>

<p>Don't worry - your order is saved and ready when you are.</p>

<a href="{{resume_url}}" class="cta-button">
  Retry Payment
</a>
```

---

### **3. Abandoned Recovery Email (24h later)**

**Subject:** Your Order is About to Expire  
**Sent:** 24 hours after order marked as abandoned

```html
<h2>Last Chance - Complete Your Order</h2>

<p>Hi {{guest_name}},</p>

<p>Your order from {{created_date}} is still pending. You can complete it now:</p>

<p><strong>{{cart_summary}}</strong></p>

<a href="{{resume_url}}" class="cta-button">
  Resume Order (Expires in 6 Days)
</a>
```

---

## ⏰ Automated Cleanup

### **Cron Job: Mark Abandoned Orders**

**Run:** Every hour  
**Action:** Update `payment_status` for expired orders

```javascript
// Server-side scheduled function (Supabase Edge Function or Vercel Cron)
export async function markAbandonedOrders() {
  const { data } = await supabase
    .rpc('mark_abandoned_orders')
  
  console.log(`Marked ${data} orders as abandoned`)
  
  // Optionally send recovery emails
  if (data > 0) {
    await sendRecoveryEmails()
  }
}
```

---

### **Cron Job: Delete Expired Orders**

**Run:** Daily at midnight  
**Action:** Permanently delete orders older than 30 days

```sql
DELETE FROM public.guest_orders
WHERE 
  payment_status IN ('abandoned', 'cancelled')
  AND order_expires_at < timezone('utc', now()) - interval '30 days';
```

---

## 🛡️ Edge Cases Handled

| Scenario | Behavior |
|----------|----------|
| **Token expired (>7 days)** | Show "Link Expired" page with option to start new order |
| **Order already paid** | Redirect to success page with receipt |
| **Order cancelled** | Show "Order Cancelled" page, option to create new order |
| **Email changed** | Token still works (tied to order ID, not email) |
| **Cart items unavailable** | Show warning, allow editing before payment |
| **Price changed** | Show price change notice, require confirmation |

---

## 📈 Analytics & Monitoring

### **Track Resume Success Rate:**

```sql
-- Calculate recovery rate
SELECT 
  COUNT(*) FILTER (WHERE payment_status = 'succeeded' AND payment_attempts > 1) AS recovered_orders,
  COUNT(*) FILTER (WHERE payment_status IN ('abandoned', 'cancelled')) AS lost_orders,
  ROUND(
    100.0 * COUNT(*) FILTER (WHERE payment_status = 'succeeded' AND payment_attempts > 1) 
    / NULLIF(COUNT(*), 0),
    2
  ) AS recovery_rate_percent
FROM public.guest_orders
WHERE created_at > timezone('utc', now()) - interval '30 days';
```

---

## ✅ Summary: Complete Resume Journey

```
Visitor Action          →  System Response               →  Visitor Experience
────────────────────────────────────────────────────────────────────────────────
Adds to cart           →  Save to localStorage           →  Badge updates
Fills checkout form    →  Create guest_order             →  Form saved
Closes browser         →  Generate resume_token          →  Email sent (5 min)
                       →  Email: "Complete Your Order"   →  
Opens email (days later) → Validate token              →  Pre-filled form
Clicks "Pay Now"       →  Process payment                →  Success!
                       →  Update status: succeeded       →  Receipt + Magic Link
                       →  Clear cart                     →  Account creation
```

**Result:** Zero friction resumption - visitor can return anytime within 7 days and complete payment with one click.

---

## 🚀 Implementation Checklist

- [ ] Run schema migration (add resume_token columns)
- [ ] Create resume page route `/checkout/resume/:token`
- [ ] Update PaymentPage to generate tokens
- [ ] Build email templates (abandonment, failed, recovery)
- [ ] Setup email sending service (Resend/SendGrid)
- [ ] Create cron job to mark abandoned orders
- [ ] Add "Resume Order" banner on /pricing page
- [ ] Build token expired page
- [ ] Add analytics tracking for recovery rate
- [ ] Test complete flow: abandon → email → resume → pay

---

**Work ID:** MA-RESUME-ORDER-SYSTEM-DESIGN-2025-11-14T11:17:00+08:00
