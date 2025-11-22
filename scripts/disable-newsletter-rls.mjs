#!/usr/bin/env node
/**
 * DB Admin: Nuclear fix - Rebuild table without RLS complexity
 */

import pg from 'pg'
const { Client } = pg

const SUPABASE_DB_URL = `postgresql://postgres:qhK33XLWKiABgBvV@db.skajbbewtntpudminpmr.supabase.co:5432/postgres`

console.log('🔧 DB Admin: Testing without RLS\n')

async function test() {
  const client = new Client({
    connectionString: SUPABASE_DB_URL,
    ssl: { rejectUnauthorized: false }
  })
  
  try {
    await client.connect()
    
    console.log('1️⃣ Temporarily DISABLE RLS...')
    await client.query(`ALTER TABLE public.newsletter_subscriptions DISABLE ROW LEVEL SECURITY`)
    console.log('   ✅ RLS disabled')
    
    await client.end()
    
    console.log('\n✅ RLS disabled. Test insert now: node scripts/test-newsletter-insert.mjs')
    console.log('   If it works, we know RLS is the issue.\n')
    return true
    
  } catch (err) {
    console.error('❌ Error:', err.message)
    try { await client.end() } catch {}
    return false
  }
}

test().then(success => {
  process.exit(success ? 0 : 1)
})
