#!/usr/bin/env node
/**
 * DB Admin: Remove problematic foreign key constraint
 * 
 * The user_id → auth.users FK prevents anon inserts because
 * anon role cannot SELECT from auth.users to verify FK.
 */

import pg from 'pg'
const { Client } = pg

const SUPABASE_DB_URL = `postgresql://postgres:qhK33XLWKiABgBvV@db.skajbbewtntpudminpmr.supabase.co:5432/postgres`

console.log('🔧 DB Admin: Removing FK constraint\n')

async function fix() {
  const client = new Client({
    connectionString: SUPABASE_DB_URL,
    ssl: { rejectUnauthorized: false }
  })
  
  try {
    await client.connect()
    
    console.log('1️⃣ Finding foreign key constraints...')
    const fks = await client.query(`
      SELECT conname
      FROM pg_constraint
      WHERE conrelid = 'public.newsletter_subscriptions'::regclass
      AND contype = 'f'
    `)
    
    if (fks.rows.length === 0) {
      console.log('   ℹ️  No foreign keys found')
    } else {
      console.log(`   Found ${fks.rows.length} FK(s):`)
      for (const fk of fks.rows) {
        console.log(`      • ${fk.conname}`)
        console.log(`        Dropping...`)
        await client.query(`
          ALTER TABLE public.newsletter_subscriptions
          DROP CONSTRAINT IF EXISTS "${fk.conname}"
        `)
        console.log(`        ✅ Dropped`)
      }
    }
    
    await client.end()
    
    console.log('\n✅ FK constraint removed!')
    console.log('   user_id is still a valid column, just not enforced by FK.')
    console.log('   This allows anon role to insert without checking auth.users.\n')
    console.log('Test now: node scripts/test-newsletter-insert.mjs\n')
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
