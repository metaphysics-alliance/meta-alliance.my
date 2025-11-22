#!/usr/bin/env node
/**
 * DB Admin: Test contact form insert with anon key
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://skajbbewtntpudminpmr.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrYWpiYmV3dG50cHVkbWlucG1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNDM4ODUsImV4cCI6MjA3ODQwMzg4NX0.7-xxgijtuDmRY6-P0aS2DY43_xVJYBcl0wo60Pa3KIU'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

console.log('🧪 Testing contact form insert with anon key...\n')

async function testInsert() {
  const caseId = `MA-TEST-${Date.now()}`
  
  console.log('Attempting to insert contact enquiry:', caseId)
  
  const { data, error } = await supabase
    .from('contact_enquiries')
    .insert([
      {
        case_id: caseId,
        full_name: 'Test User',
        email: 'test@example.com',
        topic: 'Sales',
        message: 'Test message from script',
        consent_given: true,
      }
    ])
    .select()

  if (error) {
    console.error('\n❌ Insert FAILED:', error.message)
    console.error('Error code:', error.code)
    console.error('Error details:', error.details)
    console.error('Error hint:', error.hint)
    console.error('\n💡 This means RLS is blocking anon inserts!')
    console.error('Same issue as newsletter - need to fix RLS.\n')
    return false
  }

  console.log('\n✅ Insert SUCCESSFUL!')
  console.log('Data:', data)
  
  // Clean up
  const { error: deleteError } = await supabase
    .from('contact_enquiries')
    .delete()
    .eq('case_id', caseId)
  
  if (deleteError) {
    console.log('⚠️  Could not delete test record (manual cleanup needed)')
  } else {
    console.log('✅ Test record cleaned up')
  }
  
  console.log('\n✨ Contact form save is working correctly!')
  return true
}

testInsert().then(success => {
  process.exit(success ? 0 : 1)
})
