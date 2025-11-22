#!/usr/bin/env node
/**
 * DB Admin: Test newsletter insert with anon key
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://skajbbewtntpudminpmr.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrYWpiYmV3dG50cHVkbWlucG1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNDM4ODUsImV4cCI6MjA3ODQwMzg4NX0.7-xxgijtuDmRY6-P0aS2DY43_xVJYBcl0wo60Pa3KIU'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

console.log('🧪 Testing newsletter subscription with anon key...\n')

async function testInsert() {
  const testEmail = `test-newsletter-${Date.now()}@example.com`
  
  console.log('Attempting to insert:', testEmail)
  
  const { data, error } = await supabase
    .from('newsletter_subscriptions')
    .insert([
      {
        email: testEmail,
        source: 'test',
        preferred_language: 'EN',
        consent_given: true,
      }
    ])
    .select()

  if (error) {
    console.error('\n❌ Insert FAILED:', error.message)
    console.error('Error code:', error.code)
    console.error('Error details:', error.details)
    console.error('Error hint:', error.hint)
    console.error('\nThis means the RLS policy is blocking anonymous inserts!')
    console.error('Need to check the policy configuration.\n')
    return false
  }

  console.log('\n✅ Insert SUCCESSFUL!')
  console.log('Data:', data)
  
  // Clean up
  const { error: deleteError } = await supabase
    .from('newsletter_subscriptions')
    .delete()
    .eq('email', testEmail)
  
  if (deleteError) {
    console.log('⚠️  Could not delete test record (this is OK, will be cleaned manually)')
  } else {
    console.log('✅ Test record cleaned up')
  }
  
  console.log('\n✨ Newsletter subscription is working correctly!')
  return true
}

testInsert().then(success => {
  process.exit(success ? 0 : 1)
})
