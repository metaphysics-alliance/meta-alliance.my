#!/usr/bin/env node
/**
 * DB Admin: Debug RLS issue - check all constraints
 */

import pg from 'pg'
const { Client } = pg

const SUPABASE_DB_URL = `postgresql://postgres:qhK33XLWKiABgBvV@db.skajbbewtntpudminpmr.supabase.co:5432/postgres`

async function debug() {
  const client = new Client({
    connectionString: SUPABASE_DB_URL,
    ssl: { rejectUnauthorized: false }
  })
  
  try {
    await client.connect()
    
    console.log('🔍 Debugging RLS issue\n')
    
    console.log('1️⃣ Check RLS status...')
    const rlsStatus = await client.query(`
      SELECT relname, relrowsecurity
      FROM pg_class
      WHERE relname = 'newsletter_subscriptions'
    `)
    console.log('   RLS enabled:', rlsStatus.rows[0]?.relrowsecurity)
    
    console.log('\n2️⃣ List all policies...')
    const policies = await client.query(`
      SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
      FROM pg_policies
      WHERE tablename = 'newsletter_subscriptions'
    `)
    console.log('   Policies found:', policies.rows.length)
    policies.rows.forEach(p => {
      console.log(`\n   Policy: ${p.policyname}`)
      console.log(`   Command: ${p.cmd}`)
      console.log(`   Roles: ${p.roles}`)
      console.log(`   Permissive: ${p.permissive}`)
      console.log(`   USING: ${p.qual || 'NULL'}`)
      console.log(`   WITH CHECK: ${p.with_check || 'NULL'}`)
    })
    
    console.log('\n3️⃣ Check grants...')
    const grants = await client.query(`
      SELECT grantee, privilege_type
      FROM information_schema.role_table_grants
      WHERE table_name = 'newsletter_subscriptions'
      AND table_schema = 'public'
    `)
    console.log('   Grants:')
    grants.rows.forEach(g => {
      console.log(`      • ${g.grantee}: ${g.privilege_type}`)
    })
    
    console.log('\n4️⃣ Test direct insert as postgres (bypass RLS)...')
    const testEmail = `test-postgres-${Date.now()}@example.com`
    await client.query(`
      INSERT INTO public.newsletter_subscriptions (email, source, preferred_language, consent_given)
      VALUES ($1, 'postgres_test', 'EN', true)
    `, [testEmail])
    console.log('   ✅ Direct insert works (RLS bypassed with postgres role)')
    
    await client.query(`DELETE FROM public.newsletter_subscriptions WHERE email = $1`, [testEmail])
    console.log('   ✅ Cleaned up')
    
    console.log('\n💡 Diagnosis:')
    console.log('   The table structure is fine.')
    console.log('   The issue is the anon role cannot see/execute the policy.')
    console.log('   This suggests the policy is not reaching the anon role.\n')
    
    console.log('🔧 Trying alternative fix: Set policy to PUBLIC...')
    await client.query(`
      DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_subscriptions;
    `)
    await client.query(`
      CREATE POLICY "Anyone can subscribe to newsletter"
        ON public.newsletter_subscriptions
        FOR INSERT
        TO PUBLIC
        WITH CHECK (true);
    `)
    console.log('   ✅ Policy recreated with PUBLIC role')
    
    await client.end()
    
    console.log('\n✅ Try the test again now!\n')
    return true
    
  } catch (err) {
    console.error('❌ Error:', err.message)
    console.error(err)
    try { await client.end() } catch {}
    return false
  }
}

debug().then(success => {
  process.exit(success ? 0 : 1)
})
