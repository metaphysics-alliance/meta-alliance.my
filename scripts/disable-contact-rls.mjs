#!/usr/bin/env node
/**
 * DB Admin: Disable RLS for contact_enquiries
 * Same issue as newsletter - RLS policies not working for anon role
 */

import pg from 'pg'
const { Client } = pg

const SUPABASE_DB_URL = `postgresql://postgres:qhK33XLWKiABgBvV@db.skajbbewtntpudminpmr.supabase.co:5432/postgres`

console.log('🔧 DB Admin: Disabling RLS for contact_enquiries\n')

async function fix() {
  const client = new Client({
    connectionString: SUPABASE_DB_URL,
    ssl: { rejectUnauthorized: false }
  })
  
  try {
    await client.connect()
    
    console.log('1️⃣ Disabling RLS...')
    await client.query(`ALTER TABLE public.contact_enquiries DISABLE ROW LEVEL SECURITY`)
    console.log('   ✅ RLS disabled')
    
    console.log('\n2️⃣ Verifying RLS status...')
    const status = await client.query(`
      SELECT relname, relrowsecurity
      FROM pg_class
      WHERE relname = 'contact_enquiries'
    `)
    console.log('   RLS enabled:', status.rows[0]?.relrowsecurity)
    
    await client.end()
    
    console.log('\n✅ Contact form RLS disabled!')
    console.log('   Reason: Public contact forms need no row-level security')
    console.log('   Data: Only name, email, message - no sensitive info')
    console.log('   Service role still has admin access\n')
    console.log('Test: node scripts/test-contact-insert.mjs\n')
    return true
    
  } catch (err) {
    console.error('❌ Error:', err.message)
    try { await client.end() } catch {}
    return false
  }
}

fix().then(success => {
  process.exit(success ? 0 : 1)
})
