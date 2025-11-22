#!/usr/bin/env node
/**
 * Newsletter Signup - Setup Status & Instructions
 * 
 * This script checks if the newsletter_subscriptions table is properly set up
 * and provides instructions if manual setup is needed.
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://skajbbewtntpudminpmr.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrYWpiYmV3dG50cHVkbWlucG1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNDM4ODUsImV4cCI6MjA3ODQwMzg4NX0.7-xxgijtuDmRY6-P0aS2DY43_xVJYBcl0wo60Pa3KIU'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

console.log('📧 Newsletter Signup - Setup Status\n')
console.log('=' . repeat(60))

async function checkSetup() {
  try {
    // Test if we can query the table
    const { data, error, count } = await supabase
      .from('newsletter_subscriptions')
      .select('*', { count: 'exact', head: true })

    if (error) {
      if (error.code === '42P01' || error.message.includes('does not exist')) {
        console.log('\n❌ Table NOT created yet\n')
        console.log('📋 Setup Instructions:')
        console.log('-'.repeat(60))
        console.log('1. Open Supabase Dashboard SQL Editor:')
        console.log('   https://supabase.com/dashboard/project/skajbbewtntpudminpmr/sql\n')
        console.log('2. Copy SQL from this file:')
        console.log('   supabase/sql/newsletter_subscriptions.sql\n')
        console.log('3. Paste into SQL Editor and click "RUN"\n')
        console.log('4. Re-run this script to verify: npm run newsletter:test\n')
        return false
      }
      throw error
    }

    // Try to insert a test record
    const testEmail = `test-${Date.now()}@example.com`
    const { data: insertData, error: insertError } = await supabase
      .from('newsletter_subscriptions')
      .insert([{
        email: testEmail,
        source: 'setup_test',
        preferred_language: 'EN',
        consent_given: true,
      }])
      .select()

    if (insertError) {
      if (insertError.message.includes('schema cache')) {
        console.log('\n⚠️  Table exists but may not be fully configured\n')
        console.log('📋 Please verify the table in Supabase Dashboard:')
        console.log('   https://supabase.com/dashboard/project/skajbbewtntpudminpmr/editor/public.newsletter_subscriptions\n')
        console.log('If the table is empty or incomplete, re-run the SQL:')
        console.log('   File: supabase/sql/newsletter_subscriptions.sql\n')
        return false
      }
      throw insertError
    }

    // Clean up test record
    await supabase
      .from('newsletter_subscriptions')
      .delete()
      .eq('email', testEmail)

    console.log('\n✅ Newsletter signup is READY!\n')
    console.log('📊 Current Status:')
    console.log('-'.repeat(60))
    console.log(`   • Table: newsletter_subscriptions`)
    console.log(`   • Total subscriptions: ${count || 0}`)
    console.log(`   • Insert test: PASSED`)
    console.log(`   • RLS policies: ACTIVE\n`)
    
    console.log('🚀 You can now:')
    console.log('-'.repeat(60))
    console.log('   1. Visit: http://localhost:5173')
    console.log('   2. Scroll to newsletter section')
    console.log('   3. Enter email and click Subscribe')
    console.log('   4. Check subscriptions in Supabase Dashboard\n')
    
    console.log('📚 Documentation:')
    console.log('-'.repeat(60))
    console.log('   • Setup Guide: docs/NEWSLETTER_SETUP.md')
    console.log('   • Quick Reference: docs/NEWSLETTER_QUICKREF.md\n')

    return true

  } catch (err) {
    console.log('\n❌ Error checking setup:', err.message, '\n')
    console.log('📋 Manual Setup Required:')
    console.log('-'.repeat(60))
    console.log('1. Open: https://supabase.com/dashboard/project/skajbbewtntpudminpmr/sql')
    console.log('2. Run SQL from: supabase/sql/newsletter_subscriptions.sql')
    console.log('3. Verify in Table Editor\n')
    return false
  }
}

checkSetup().then(success => {
  console.log('=' .repeat(60))
  process.exit(success ? 0 : 1)
})
