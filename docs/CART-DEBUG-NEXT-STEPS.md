# 🐛 Cart Debugging & Next Steps

## 🔍 **Debug Mode Enabled**

I've added console logging to track cart operations. Here's how to test:

### **Testing Steps:**

1. **Start the server** (should already be running):
   ```
   Server at: http://localhost:5173
   ```

2. **Open Browser Console** (F12 → Console tab)

3. **Go to Pricing Page**:
   ```
   http://localhost:5173/pricing
   ```

4. **Click "Add to Cart" on any service**
   - Watch console for: `🛒 Adding to cart:`
   - Should see: `✅ Item normalized:`
   - Should see: `💾 Saving cart to localStorage`

5. **Go to Checkout Page**:
   ```
   http://localhost:5173/pricing/checkout
   ```
   - Watch console for: `📦 Loading cart from localStorage`
   - Should see: `✅ Loaded X items from storage`

### **Debug Commands (in Browser Console):**

```javascript
// Check current cart state
checkCart()

// Clear cart and reload
clearCart()

// Manual check
localStorage.getItem('ma-pricing-cart-EN')
```

---

## 🐛 **Common Issues & Fixes**

### Issue 1: Items added but not showing on checkout
**Check:**
- Console shows "Saving cart" on /pricing
- Console shows "Loading cart" on /pricing/checkout
- localStorage key is `ma-pricing-cart-EN` (same on both pages)

**Fix if keys don't match:**
```javascript
// In console, check:
localStorage.getItem('ma-pricing-cart-EN')
localStorage.getItem('ma-pricing-cart-CN')
// Should see items in one of them
```

### Issue 2: Cart clears between pages
**Cause:** Page reload or router navigation issue
**Fix:** Cart should persist in localStorage - check Network tab for page reloads

### Issue 3: Button shows "Added" but cart empty
**Cause:** ID mismatch between add and load
**Fix:** Check console for the `id` value when adding vs when loading

---

## ✅ **What Should Happen (Normal Flow)**

```
User clicks "Add to Cart" on /pricing
↓
Console: 🛒 Adding to cart: { id: "...", name: "...", ... }
Console: ✅ Item normalized: { ... }
Console: 💾 Saving cart to localStorage [ma-pricing-cart-EN]: 1 items
↓
User navigates to /pricing/checkout
↓
Console: 📦 Loading cart from localStorage [ma-pricing-cart-EN]: [...]
Console: ✅ Loaded 1 items from storage
↓
Checkout page shows cart items ✅
```

---

## 📋 **Next Steps After Cart is Working**

### ✅ **Immediate (Today)**
1. Test cart add/remove on /pricing
2. Verify items persist to /pricing/checkout
3. Test "Proceed to Payment" button
4. Verify payment form loads correctly

### 🔄 **Phase 1: Database Setup (This Week)**
```sql
-- Run in Supabase SQL Editor
-- File: supabase/sql/user_profiles_subscriptions.sql

CREATE TABLE guest_orders (
  id uuid PRIMARY KEY,
  guest_email text,
  guest_name text,
  items jsonb,
  total_myr numeric,
  payment_status text,
  magic_link_token text,
  ...
);
```

**Actions:**
- [ ] Sign up for Supabase (if not done)
- [ ] Run the SQL schema
- [ ] Test database connection

### 💳 **Phase 2: Stripe Setup (Week 1)**

**Actions:**
- [ ] Create Stripe account: https://dashboard.stripe.com/register
- [ ] Get API keys (test mode first)
- [ ] Install Stripe SDK:
  ```bash
  npm install @stripe/stripe-js @stripe/react-stripe-js stripe
  ```
- [ ] Create Supabase Edge Function: `create-stripe-payment`
- [ ] Wire PaymentPage to Stripe Elements

**Files to Create:**
```
supabase/
├── functions/
│   ├── create-stripe-payment/
│   │   └── index.ts
│   └── stripe-webhook/
│       └── index.ts
```

### 📧 **Phase 3: Email & Magic Links (Week 2)**

**Actions:**
- [ ] Choose email provider (Supabase Auth emails or SendGrid)
- [ ] Create email templates (order confirmation, magic link)
- [ ] Generate secure magic link tokens
- [ ] Set up email sending on successful payment

**Templates Needed:**
1. Order Confirmation Email
2. Payment Receipt
3. Magic Link Welcome
4. Payment Failed Notification

### 🏗️ **Phase 4: Customer Portal (Week 3-4)**

**Actions:**
- [ ] Set up `master.meta-alliance.my` subdomain DNS
- [ ] Create portal directory structure:
  ```
  portal/
  ├── pages/
  │   ├── magic/[token].tsx
  │   ├── dashboard/orders.tsx
  │   └── dashboard/subscriptions.tsx
  ```
- [ ] Build magic link handler
- [ ] Create dashboard UI
- [ ] Add subscription management (pause/cancel)

---

## 🎯 **Current Status**

| Component | Status | Next Action |
|-----------|--------|-------------|
| Cart System | 🟡 **TESTING** | Debug with console logs |
| Checkout Page | ✅ **READY** | - |
| Payment Page | ✅ **UI READY** | Connect to Stripe |
| Database Schema | ⚪ **TODO** | Run SQL in Supabase |
| Stripe Integration | ⚪ **TODO** | Sign up + get keys |
| Email System | ⚪ **TODO** | Choose provider |
| Customer Portal | ⚪ **TODO** | Set up subdomain |

---

## 🚨 **Report Back With:**

After testing cart:
1. ✅ Cart items persist to checkout? (Yes/No)
2. 📸 Screenshot of browser console logs
3. 💬 Any error messages you see

Then I'll help with:
- Fixing any remaining cart issues
- Setting up Stripe account
- Creating payment integration

---

**Debug Session Started**: 2025-11-13T06:00:00+08:00  
**Work ID**: MA-CART-DEBUG-LOGGING-2025-11-13T14:00:00+08:00
