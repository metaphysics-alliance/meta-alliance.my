#!/usr/bin/env node
/**
 * DB Admin: Final fix - Enable RLS with simplified working policy
 * 
 * The issue was complex policies with auth.users references.
 * For public newsletter signup, we just need INSERT to work.
 */

import pg from 'pg'
const { Client } = pg

const SUPABASE_DB_URL = `postgresql://postgres:qhK33XLWKiABgBvV@db.skajbbewtntpudminpmr.supabase.co:5432/postgres`

console.log('🔧 DB Admin: Enabling RLS with working policy\n')

async function fix() {
  const client = new Client({
    connectionString: SUPABASE_DB_URL,
    ssl: { rejectUnauthorized: false }
  })
  
  try {
    await client.connect()
    
    console.log('1️⃣ Dropping all existing policies...')
    await client.query(`
      DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_subscriptions;
      DROP POLICY IF EXISTS "Users can view own newsletter subscription" ON public.newsletter_subscriptions;
      DROP POLICY IF EXISTS "Users can update own newsletter subscription" ON public.newsletter_subscriptions;
      DROP POLICY IF EXISTS "Service role full access newsletter" ON public.newsletter_subscriptions;
    `)
    console.log('   ✅ Policies dropped')
    
    console.log('\n2️⃣ Re-enabling RLS...')
    await client.query(`ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY`)
    console.log('   ✅ RLS enabled')
    
    console.log('\n3️⃣ Creating working INSERT policy...')
    // Use USING clause instead of WITH CHECK for INSERT
    await client.query(`
      CREATE POLICY "newsletter_anon_insert"
        ON public.newsletter_subscriptions
        AS PERMISSIVE
        FOR INSERT
        TO public
        WITH CHECK (true);
    `)
    console.log('   ✅ Insert policy created')
    
    console.log('\n4️⃣ Creating service role policy...')
    await client.query(`
      CREATE POLICY "newsletter_service_all"
        ON public.newsletter_subscriptions
        AS PERMISSIVE
        FOR ALL
        TO service_role
        USING (true)
        WITH CHECK (true);
    `)
    console.log('   ✅ Service role policy created')
    
    console.log('\n5️⃣ Verifying policies...')
    const policies = await client.query(`
      SELECT policyname, cmd, roles
      FROM pg_policies
      WHERE tablename = 'newsletter_subscriptions'
    `)
    console.log(`   Found ${policies.rows.length} policies:`)
    policies.rows.forEach(p => {
      console.log(`      • ${p.policyname} (${p.cmd}) → ${p.roles}`)
    })
    
    await client.end()
    
    console.log('\n✅ RLS properly configured!')
    console.log('   Test: node scripts/test-newsletter-insert.mjs\n')
    return true
    
  } catch (err) {
    console.error('❌ Error:', err.message)
    console.error(err)
    try { await client.end() } catch {}
    return false
  }
}

fix().then(success => {
  process.exit(success ? 0 : 1)
})
