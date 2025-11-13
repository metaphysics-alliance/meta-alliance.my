# ✅ Cart & Checkout - Route Reference

## 📍 **Correct Routes**

| Route | Purpose | Status |
|-------|---------|--------|
| `/pricing` | Browse services & add to cart | ✅ Working |
| `/pricing/checkout` | Review cart & proceed to payment | ✅ Fixed |
| `/checkout/payment` | Guest checkout form + payment | ✅ New |
| `/checkout/success` | Payment successful | 🚧 TODO |
| `/checkout/pending` | Payment processing | 🚧 TODO |
| `/checkout/failed` | Payment failed | 🚧 TODO |

---

## ⚠️ **Important: No `/pricing/cart` route**

The cart review page is at `/pricing/checkout`, NOT `/pricing/cart`.

---

## 🔄 **Complete User Flow**

```
Step 1: Browse Services
URL: /pricing
Action: User clicks "Add to Cart" on services
Storage: Items saved to localStorage

Step 2: Review Cart
URL: /pricing/checkout
Action: User reviews selected services
CTA: "Proceed to Payment" button

Step 3: Guest Checkout
URL: /checkout/payment
Action: User fills contact info & selects payment method
Form: Name, Email, Phone, Address, Payment Method
CTA: "Pay Now" button

Step 4: Payment Processing
(Stripe/FPX/TNG integration - TODO)

Step 5: Status Page
URL: /checkout/success (or /pending or /failed)
Action: Show confirmation & send email

Step 6: Email with Magic Link
Email contains order details + magic link

Step 7: Customer Portal
URL: master.meta-alliance.my/magic/{token}
Action: Auto-create account & redirect to dashboard
```

---

## 🧪 **Testing Steps**

```bash
# Start dev server
npm run dev
```

1. **Go to pricing**: `http://localhost:5173/pricing`
2. **Add to cart**: Click "Add" on any service
3. **View cart**: Click cart icon or go to `http://localhost:5173/pricing/checkout`
4. **Proceed to payment**: Click "Proceed to Payment" button
5. **Fill form**: Enter guest details at `http://localhost:5173/checkout/payment`
6. **Test payment**: Click "Pay Now" (currently simulates, redirects to success)

---

## 📦 **Files Modified**

- ✅ `src/components/PricingExperience.jsx` - Fixed cart ID collision
- ✅ `src/components/PricingCheckout.jsx` - Added "Proceed to Payment" CTA
- ✅ `src/pages/PaymentPage.jsx` - Created guest checkout page
- ✅ `src/routes/pageConfig.jsx` - Added `/checkout/payment` route

---

## 🎯 **Next Implementation Steps**

### Week 1: Payment Integration
- [ ] Set up Stripe account
- [ ] Create Supabase Edge Function for payment processing
- [ ] Wire PaymentPage to real Stripe Elements
- [ ] Add FPX and Touch 'n Go support

### Week 2: Status Pages
- [ ] Create success/pending/failed pages
- [ ] Add order tracking
- [ ] Set up email notifications

### Week 3: Customer Portal
- [ ] Set up master.meta-alliance.my subdomain
- [ ] Create magic link handler
- [ ] Build dashboard for orders/subscriptions

---

**Last Updated**: 2025-11-13  
**Work ID**: MA-CART-PAYMENT-FIX-2025-11-13T13:50:00+08:00
