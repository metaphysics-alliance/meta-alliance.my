#!/usr/bin/env node
/**
 * Migration: Guest Orders Payment Tracking
 * Adds payment status tracking and resume token functionality
 * 
 * Run: node scripts/migrate-guest-orders-tracking.mjs
 */

import pg from 'pg'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const { Client } = pg
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load environment variables
const SUPABASE_PASSWORD = process.env.SUPABASE_DB_PASSWORD
const SUPABASE_PROJECT_REF = process.env.SUPABASE_PROJECT_REF

if (!SUPABASE_PASSWORD || !SUPABASE_PROJECT_REF) {
  console.error('❌ Missing environment variables:')
  console.error('   SUPABASE_DB_PASSWORD')
  console.error('   SUPABASE_PROJECT_REF')
  console.error('\nSet these in .env.local')
  process.exit(1)
}

// Direct PostgreSQL connection (port 5432, NOT pooler)
const SUPABASE_DB_URL = `postgresql://postgres:${SUPABASE_PASSWORD}@db.${SUPABASE_PROJECT_REF}.supabase.co:5432/postgres`

async function runMigration() {
  const client = new Client({
    connectionString: SUPABASE_DB_URL,
    ssl: { rejectUnauthorized: false }
  })

  try {
    console.log('🔌 Connecting to Supabase...')
    await client.connect()
    console.log('✅ Connected')

    // Read SQL migration file
    const sqlPath = join(__dirname, '..', 'supabase', 'sql', 'guest_orders_payment_tracking.sql')
    const sql = readFileSync(sqlPath, 'utf8')

    console.log('\n📝 Executing migration...')
    await client.query(sql)
    console.log('✅ Migration completed successfully')

    // Verify columns were added
    console.log('\n🔍 Verifying schema changes...')
    const verifyQuery = `
      SELECT column_name, data_type, column_default
      FROM information_schema.columns 
      WHERE table_schema = 'public' 
        AND table_name = 'guest_orders'
        AND column_name IN (
          'payment_status', 
          'payment_attempts', 
          'resume_token',
          'order_expires_at'
        )
      ORDER BY column_name;
    `
    const { rows } = await client.query(verifyQuery)
    
    console.log('\n📊 Added columns:')
    rows.forEach(row => {
      console.log(`   ✓ ${row.column_name} (${row.data_type})`)
    })

    // Verify functions were created
    console.log('\n🔍 Verifying functions...')
    const functionsQuery = `
      SELECT routine_name 
      FROM information_schema.routines 
      WHERE routine_schema = 'public' 
        AND routine_name IN (
          'generate_resume_token',
          'mark_abandoned_orders',
          'get_resumable_order',
          'create_resume_token',
          'validate_resume_token'
        )
      ORDER BY routine_name;
    `
    const { rows: functions } = await client.query(functionsQuery)
    
    console.log('\n⚙️  Created functions:')
    functions.forEach(func => {
      console.log(`   ✓ ${func.routine_name}()`)
    })

    console.log('\n✨ Migration successful!')
    console.log('\n📋 Next steps:')
    console.log('   1. Update PaymentPage.jsx to use resume tokens')
    console.log('   2. Create /checkout/resume/:token route')
    console.log('   3. Add "Resume Order" check on /pricing page')
    console.log('   4. Setup cron job to mark abandoned orders')
    console.log('   5. Create recovery email template')

  } catch (error) {
    console.error('\n❌ Migration failed:', error.message)
    console.error('\nFull error:', error)
    process.exit(1)
  } finally {
    await client.end()
    console.log('\n🔌 Database connection closed')
  }
}

// Run migration
runMigration()
