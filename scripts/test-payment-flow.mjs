#!/usr/bin/env node
/**
 * Test Payment Flow Simulation
 * Simulates the complete guest checkout → payment → magic link → account creation flow
 * 
 * Usage: node scripts/test-payment-flow.mjs
 */

import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

// Load environment variables
config()

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials')
  console.error('Please set VITE_SUPABASE_URL and VITE_SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Test data
const testCustomer = {
  fullName: 'Test Customer',
  email: `test-${Date.now()}@example.com`,
  phone: '+60123456789',
  addressLine1: '123 Test Street',
  city: 'Kuala Lumpur',
  state: 'Federal Territory of Kuala Lumpur',
  postcode: '50000',
  country: 'Malaysia',
}

const testCartItems = [
  {
    id: 'celestial-bazi',
    name: 'BaZi Destiny Blueprint',
    price: 'RM 800',
    priceMYR: 800,
    priceUSD: 180,
    category: 'celestial',
  },
  {
    id: 'spatial-home',
    name: 'Home Destiny Compass',
    price: 'RM 1,200',
    priceMYR: 1200,
    priceUSD: 270,
    category: 'spatial',
  },
]

async function testPaymentFlow() {
  console.log('\n🧪 Starting Payment Flow Simulation\n')
  console.log('━'.repeat(60))

  try {
    // ========================================================================
    // STEP 1: Create Guest Order
    // ========================================================================
    console.log('\n📝 STEP 1: Creating guest order...')
    
    const { data: order, error: orderError } = await supabase
      .from('guest_orders')
      .insert([
        {
          guest_email: testCustomer.email,
          guest_name: testCustomer.fullName,
          guest_phone: testCustomer.phone,
          address_line1: testCustomer.addressLine1,
          city: testCustomer.city,
          state_province: testCustomer.state,
          postcode: testCustomer.postcode,
          country: testCustomer.country,
          cart_items: testCartItems,
          total_myr: 2000,
          total_usd: 450,
          currency: 'MYR',
          payment_method: 'stripe',
          payment_status: 'pending',
          newsletter_opt_in: true,
        },
      ])
      .select()
      .single()

    if (orderError) throw orderError

    console.log('✅ Guest order created')
    console.log(`   Order ID: ${order.id}`)
    console.log(`   Customer: ${order.guest_name} (${order.guest_email})`)
    console.log(`   Total: RM ${order.total_myr}`)

    // ========================================================================
    // STEP 2: Generate Resume Token
    // ========================================================================
    console.log('\n🔑 STEP 2: Generating resume token...')
    
    const { data: resumeToken, error: tokenError } = await supabase
      .rpc('create_resume_token', { order_id: order.id })

    if (tokenError) throw tokenError

    console.log('✅ Resume token generated')
    console.log(`   Token: ${resumeToken}`)
    console.log(`   Resume URL: ${supabaseUrl.replace('https://', 'https://master.')}/checkout/resume/${resumeToken}`)

    // ========================================================================
    // STEP 3: Simulate Payment Success
    // ========================================================================
    console.log('\n💳 STEP 3: Simulating payment success...')
    
    const mockStripePaymentIntentId = `pi_test_${Date.now()}`
    
    const { error: paymentUpdateError } = await supabase
      .from('guest_orders')
      .update({
        payment_status: 'succeeded',
        payment_attempts: 1,
        last_payment_attempt_at: new Date().toISOString(),
        stripe_payment_intent_id: mockStripePaymentIntentId,
      })
      .eq('id', order.id)

    if (paymentUpdateError) throw paymentUpdateError

    console.log('✅ Payment marked as succeeded')
    console.log(`   Payment Intent ID: ${mockStripePaymentIntentId}`)

    // ========================================================================
    // STEP 4: Generate Magic Link Token
    // ========================================================================
    console.log('\n🔗 STEP 4: Generating magic link token...')
    
    const magicToken = `magic_${Math.random().toString(36).substring(2)}${Date.now()}`
    
    const { error: magicUpdateError } = await supabase
      .from('guest_orders')
      .update({
        magic_link_token: magicToken,
        magic_link_sent_at: new Date().toISOString(),
      })
      .eq('id', order.id)

    if (magicUpdateError) throw magicUpdateError

    console.log('✅ Magic link token generated')
    console.log(`   Token: ${magicToken}`)
    console.log(`   Magic Link URL: ${supabaseUrl.replace('https://', 'https://master.')}/auth/magic/${magicToken}`)

    // ========================================================================
    // STEP 5: Validate Magic Link Token
    // ========================================================================
    console.log('\n🔍 STEP 5: Validating magic link token...')
    
    const { data: validatedOrder, error: validateError } = await supabase
      .from('guest_orders')
      .select('*')
      .eq('magic_link_token', magicToken)
      .eq('payment_status', 'succeeded')
      .is('account_created', false)
      .single()

    if (validateError) throw validateError

    console.log('✅ Magic link validated')
    console.log(`   Order found: ${validatedOrder.id}`)
    console.log(`   Customer: ${validatedOrder.guest_name}`)

    // ========================================================================
    // STEP 6: Create User Account
    // ========================================================================
    console.log('\n👤 STEP 6: Creating user account...')
    
    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: testCustomer.email,
      email_confirm: true,
      user_metadata: {
        full_name: testCustomer.fullName,
        source: 'magic_link',
        order_id: order.id,
      },
    })

    if (authError) throw authError

    console.log('✅ Auth account created')
    console.log(`   User ID: ${authData.user.id}`)

    // ========================================================================
    // STEP 7: Create User Profile
    // ========================================================================
    console.log('\n📋 STEP 7: Creating user profile...')
    
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .insert([
        {
          id: authData.user.id,
          full_name: testCustomer.fullName,
          email: testCustomer.email,
          phone: testCustomer.phone,
          address_line1: testCustomer.addressLine1,
          city: testCustomer.city,
          state_province: testCustomer.state,
          postcode: testCustomer.postcode,
          country: testCustomer.country,
          preferred_language: 'EN',
          preferred_currency: 'MYR',
          profile_completed: false,
        },
      ])
      .select()
      .single()

    if (profileError) throw profileError

    console.log('✅ User profile created')
    console.log(`   Profile ID: ${profile.id}`)
    console.log(`   Email: ${profile.email}`)

    // ========================================================================
    // STEP 8: Create Subscription Records
    // ========================================================================
    console.log('\n📦 STEP 8: Creating subscription records...')
    
    const subscriptions = testCartItems.map((item) => ({
      user_id: authData.user.id,
      service_id: item.id,
      service_name: item.name,
      service_category: item.category,
      price_myr: item.priceMYR,
      price_usd: item.priceUSD,
      currency: 'MYR',
      status: 'active',
      payment_provider: 'stripe',
      starts_at: new Date().toISOString(),
    }))

    const { data: subscriptionData, error: subscriptionError } = await supabase
      .from('subscriptions')
      .insert(subscriptions)
      .select()

    if (subscriptionError) throw subscriptionError

    console.log(`✅ ${subscriptionData.length} subscriptions created`)
    subscriptionData.forEach((sub) => {
      console.log(`   - ${sub.service_name} (${sub.status})`)
    })

    // ========================================================================
    // STEP 9: Create Payment Record
    // ========================================================================
    console.log('\n💰 STEP 9: Creating payment record...')
    
    const { data: payment, error: paymentError } = await supabase
      .from('subscription_payments')
      .insert([
        {
          subscription_id: subscriptionData[0].id, // Link to first subscription
          amount: order.total_myr,
          currency: 'MYR',
          payment_provider: 'stripe',
          status: 'succeeded',
          stripe_payment_intent_id: mockStripePaymentIntentId,
          receipt_url: `https://dashboard.stripe.com/test/payments/${mockStripePaymentIntentId}`,
        },
      ])
      .select()
      .single()

    if (paymentError) throw paymentError

    console.log('✅ Payment record created')
    console.log(`   Payment ID: ${payment.id}`)
    console.log(`   Amount: ${payment.currency} ${payment.amount}`)

    // ========================================================================
    // STEP 10: Mark Order Complete
    // ========================================================================
    console.log('\n✅ STEP 10: Marking order as complete...')
    
    const { error: completeError } = await supabase
      .from('guest_orders')
      .update({
        account_created: true,
        user_id: authData.user.id,
        updated_at: new Date().toISOString(),
      })
      .eq('id', order.id)

    if (completeError) throw completeError

    console.log('✅ Order marked as complete')

    // ========================================================================
    // FINAL SUMMARY
    // ========================================================================
    console.log('\n' + '━'.repeat(60))
    console.log('\n🎉 PAYMENT FLOW SIMULATION COMPLETE!\n')
    console.log('Summary:')
    console.log(`  ✅ Guest order created: ${order.id}`)
    console.log(`  ✅ Resume token: ${resumeToken}`)
    console.log(`  ✅ Payment succeeded: ${mockStripePaymentIntentId}`)
    console.log(`  ✅ Magic link token: ${magicToken}`)
    console.log(`  ✅ User account: ${authData.user.id}`)
    console.log(`  ✅ Profile created: ${profile.email}`)
    console.log(`  ✅ Subscriptions: ${subscriptionData.length} active`)
    console.log(`  ✅ Payment record: ${payment.id}`)
    console.log('\n📧 Next Steps (Simulated Emails):')
    console.log(`  1. Resume email: /checkout/resume/${resumeToken}`)
    console.log(`  2. Magic link: /auth/magic/${magicToken}`)
    console.log(`  3. Success email with receipt`)
    console.log('\n' + '━'.repeat(60))

    // ========================================================================
    // CLEANUP (Optional)
    // ========================================================================
    console.log('\n🧹 Cleanup test data? (y/n)')
    console.log('   Test records created:')
    console.log(`   - Guest Order: ${order.id}`)
    console.log(`   - User Account: ${authData.user.id}`)
    console.log(`   - Subscriptions: ${subscriptionData.length} records`)
    console.log('\n   To cleanup manually, run:')
    console.log(`   DELETE FROM auth.users WHERE id = '${authData.user.id}';`)
    console.log(`   (This will cascade delete profile, subscriptions, and payments)`)
    console.log(`   DELETE FROM guest_orders WHERE id = '${order.id}';`)

  } catch (error) {
    console.error('\n❌ ERROR:', error.message)
    console.error(error)
    process.exit(1)
  }
}

// Run the test
testPaymentFlow()
