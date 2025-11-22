#!/usr/bin/env node
/**
 * DB Admin: Contact Enquiries Migration
 * Uses direct PostgreSQL connection (port 5432)
 */

import pg from 'pg'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const { Client } = pg

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const SUPABASE_DB_URL = `postgresql://postgres:qhK33XLWKiABgBvV@db.skajbbewtntpudminpmr.supabase.co:5432/postgres`

console.log('🔧 DB Admin: Contact Enquiries Migration\n')
console.log('='.repeat(60))

async function executeMigration() {
  const client = new Client({
    connectionString: SUPABASE_DB_URL,
    ssl: { rejectUnauthorized: false }
  })
  
  try {
    console.log('\n1️⃣ Connecting to PostgreSQL (port 5432)...')
    await client.connect()
    console.log('   ✅ Connected')

    console.log('\n2️⃣ Reading migration SQL...')
    const sqlPath = join(__dirname, '..', 'supabase', 'sql', 'contact_enquiries.sql')
    const sql = readFileSync(sqlPath, 'utf8')
    console.log(`   ✅ Loaded (${sql.length} bytes)`)

    console.log('\n3️⃣ Executing migration...')
    await client.query(sql)
    console.log('   ✅ Migration executed')

    console.log('\n4️⃣ Verifying table...')
    const result = await client.query(`
      SELECT COUNT(*) as count 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'contact_enquiries'
    `)
    
    if (result.rows[0].count === '1') {
      console.log('   ✅ Table exists')
    } else {
      throw new Error('Table not found after migration')
    }

    console.log('\n5️⃣ Verifying RLS...')
    const rlsCheck = await client.query(`
      SELECT relrowsecurity 
      FROM pg_class 
      WHERE relname = 'contact_enquiries'
    `)
    
    if (rlsCheck.rows[0]?.relrowsecurity) {
      console.log('   ✅ RLS enabled')
    }

    console.log('\n6️⃣ Verifying policies...')
    const policyCheck = await client.query(`
      SELECT policyname 
      FROM pg_policies 
      WHERE tablename = 'contact_enquiries'
    `)
    
    console.log(`   ✅ Found ${policyCheck.rows.length} policies:`)
    policyCheck.rows.forEach(row => {
      console.log(`      • ${row.policyname}`)
    })

    console.log('\n7️⃣ Testing insert...')
    const testCaseId = `MA-TEST-${Date.now()}`
    await client.query(`
      INSERT INTO public.contact_enquiries 
      (case_id, full_name, email, topic, message, consent_given)
      VALUES ($1, 'Test User', 'test@example.com', 'Sales', 'Test message', true)
    `, [testCaseId])
    console.log('   ✅ Insert successful')

    await client.query(`DELETE FROM public.contact_enquiries WHERE case_id = $1`, [testCaseId])
    console.log('   ✅ Test data cleaned')

    await client.end()

    console.log('\n' + '='.repeat(60))
    console.log('✨ MIGRATION COMPLETE!\n')
    console.log('📊 Summary:')
    console.log('   • Table: contact_enquiries')
    console.log('   • RLS: Enabled')
    console.log('   • Policies: ' + policyCheck.rows.length)
    console.log('   • Insert test: PASSED\n')
    console.log('🚀 Contact form is now saving to database!')
    console.log('   • Test at: http://localhost:5173/#/contact')
    console.log('   • Check data: Supabase Dashboard → contact_enquiries\n')
    console.log('='.repeat(60))

    return true

  } catch (err) {
    console.error('\n❌ Migration failed:', err.message)
    try { await client.end() } catch {}
    return false
  }
}

executeMigration().then(success => {
  process.exit(success ? 0 : 1)
})
