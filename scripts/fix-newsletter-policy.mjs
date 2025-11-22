#!/usr/bin/env node
/**
 * DB Admin: Fix newsletter RLS policy
 */

import pg from 'pg'
const { Client } = pg

const SUPABASE_DB_URL = `postgresql://postgres:qhK33XLWKiABgBvV@db.skajbbewtntpudminpmr.supabase.co:5432/postgres`

console.log('🔧 DB Admin: Fixing newsletter RLS policy\n')

async function fixPolicy() {
  const client = new Client({
    connectionString: SUPABASE_DB_URL,
    ssl: { rejectUnauthorized: false }
  })
  
  try {
    await client.connect()
    
    console.log('1️⃣ Dropping existing policies...')
    await client.query(`
      DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_subscriptions;
      DROP POLICY IF EXISTS "Users can view own newsletter subscription" ON public.newsletter_subscriptions;
      DROP POLICY IF EXISTS "Users can update own newsletter subscription" ON public.newsletter_subscriptions;
      DROP POLICY IF EXISTS "Service role full access newsletter" ON public.newsletter_subscriptions;
    `)
    console.log('   ✅ Old policies dropped')
    
    console.log('\n2️⃣ Creating simple insert policy for anon...')
    await client.query(`
      CREATE POLICY "Anyone can subscribe to newsletter"
        ON public.newsletter_subscriptions
        FOR INSERT
        TO anon, authenticated
        WITH CHECK (true);
    `)
    console.log('   ✅ Insert policy created')
    
    console.log('\n3️⃣ Creating service role policy...')
    await client.query(`
      CREATE POLICY "Service role full access newsletter"
        ON public.newsletter_subscriptions
        FOR ALL
        TO service_role
        USING (true)
        WITH CHECK (true);
    `)
    console.log('   ✅ Service role policy created')
    
    console.log('\n4️⃣ Verifying grants...')
    await client.query(`
      GRANT INSERT ON public.newsletter_subscriptions TO anon, authenticated;
      GRANT ALL ON public.newsletter_subscriptions TO service_role;
    `)
    console.log('   ✅ Grants verified')
    
    console.log('\n5️⃣ Checking final policy list...')
    const policies = await client.query(`
      SELECT policyname, roles, cmd
      FROM pg_policies
      WHERE tablename = 'newsletter_subscriptions'
    `)
    console.log('   Policies:')
    policies.rows.forEach(p => {
      console.log(`      • ${p.policyname} (${p.cmd})`)
    })
    
    await client.end()
    
    console.log('\n✅ Policy fix complete! Test with: node scripts/test-newsletter-insert.mjs\n')
    return true
    
  } catch (err) {
    console.error('❌ Error:', err.message)
    try { await client.end() } catch {}
    return false
  }
}

fixPolicy().then(success => {
  process.exit(success ? 0 : 1)
})
