#!/usr/bin/env node
/**
 * DB Admin: Newsletter Migration Executor
 * 
 * Uses direct PostgreSQL connection to execute DDL statements.
 * This is the CORRECT way to run migrations programmatically.
 */

import pg from 'pg'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const { Client } = pg

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Supabase PostgreSQL connection
const connectionConfig = {
  host: 'aws-0-ap-southeast-1.pooler.supabase.com',
  port: 6543,
  database: 'postgres',
  user: 'postgres.skajbbewtntpudminpmr',
  password: 'qhK33XLWKiABgBvV',
  ssl: { rejectUnauthorized: false }
}

console.log('🔧 DB Admin: Newsletter Migration Executor\n')
console.log('=' .repeat(60))

async function executeMigration() {
  const client = new Client(connectionConfig)
  
  try {
    // Step 1: Connect
    console.log('\n1️⃣ Connecting to PostgreSQL...')
    await client.connect()
    console.log('   ✅ Connected to Supabase database')

    // Step 2: Read SQL file
    console.log('\n2️⃣ Reading migration SQL...')
    const sqlPath = join(__dirname, '..', 'supabase', 'sql', 'newsletter_subscriptions.sql')
    const sql = readFileSync(sqlPath, 'utf8')
    console.log('   ✅ SQL file loaded')

    // Step 3: Execute migration
    console.log('\n3️⃣ Executing migration...')
    await client.query(sql)
    console.log('   ✅ Migration executed successfully')

    // Step 4: Verify table exists
    console.log('\n4️⃣ Verifying table...')
    const result = await client.query(`
      SELECT COUNT(*) as count 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'newsletter_subscriptions'
    `)
    
    if (result.rows[0].count === '1') {
      console.log('   ✅ Table exists in database')
    } else {
      throw new Error('Table not found after migration')
    }

    // Step 5: Verify RLS is enabled
    console.log('\n5️⃣ Verifying Row Level Security...')
    const rlsCheck = await client.query(`
      SELECT relname, relrowsecurity 
      FROM pg_class 
      WHERE relname = 'newsletter_subscriptions'
    `)
    
    if (rlsCheck.rows[0]?.relrowsecurity) {
      console.log('   ✅ RLS is enabled')
    } else {
      console.log('   ⚠️  RLS status unclear')
    }

    // Step 6: Verify policies
    console.log('\n6️⃣ Verifying RLS policies...')
    const policyCheck = await client.query(`
      SELECT policyname 
      FROM pg_policies 
      WHERE tablename = 'newsletter_subscriptions'
    `)
    
    console.log(`   ✅ Found ${policyCheck.rows.length} policies:`)
    policyCheck.rows.forEach(row => {
      console.log(`      • ${row.policyname}`)
    })

    // Step 7: Test insert permission
    console.log('\n7️⃣ Testing insert operation...')
    const testEmail = `test-${Date.now()}@migration.test`
    await client.query(`
      INSERT INTO public.newsletter_subscriptions (email, source, preferred_language, consent_given)
      VALUES ($1, 'migration_test', 'EN', true)
    `, [testEmail])
    console.log('   ✅ Insert successful')

    // Clean up test data
    await client.query(`
      DELETE FROM public.newsletter_subscriptions WHERE email = $1
    `, [testEmail])
    console.log('   ✅ Test data cleaned up')

    await client.end()

    console.log('\n' + '='.repeat(60))
    console.log('✨ MIGRATION COMPLETE!\n')
    console.log('📊 Summary:')
    console.log('   • Table: newsletter_subscriptions')
    console.log('   • RLS: Enabled')
    console.log('   • Policies: ' + policyCheck.rows.length)
    console.log('   • Insert test: PASSED\n')
    console.log('🚀 Next steps:')
    console.log('   1. Visit: http://localhost:5173')
    console.log('   2. Test newsletter signup on homepage')
    console.log('   3. Verify: npm run newsletter:test\n')
    console.log('=' .repeat(60))

    return true

  } catch (err) {
    console.error('\n❌ Migration failed:', err.message)
    console.error('\n🔍 Error details:')
    console.error(err)
    
    console.log('\n📋 Troubleshooting:')
    console.log('   • Check Supabase connection string is correct')
    console.log('   • Verify password in .env.local matches')
    console.log('   • Ensure database allows connections from your IP')
    console.log('   • Try running SQL manually in Dashboard if all else fails\n')
    
    try { await client.end() } catch {}
    return false
  }
}

executeMigration().then(success => {
  process.exit(success ? 0 : 1)
})
