#!/usr/bin/env node
/**
 * Preview non-paid users for potential cleanup.
 *
 * Definition (for preview):
 *  - auth.users row exists
 *  - NO guest_orders with payment_status = 'succeeded'
 *  - NO user_subscriptions rows
 *
 * This script DOES NOT DELETE anything. It only prints candidates.
 */

import pg from 'pg'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: join(__dirname, '..', '.env.local') })

const connectionString = process.env.SUPABASE_DB_URL

if (!connectionString) {
  console.error('Missing SUPABASE_DB_URL in .env.local')
  process.exit(1)
}

const { Client } = pg

async function main() {
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  })

  try {
    await client.connect()

    console.log('\n🔎 Previewing non-paid users (no succeeded guest_orders, no user_subscriptions)...')

    const { rows } = await client.query(`
      WITH all_users AS (
        SELECT id, email, created_at
        FROM auth.users
      ),
      has_paid AS (
        SELECT DISTINCT user_id
        FROM public.guest_orders
        WHERE payment_status = 'succeeded'
          AND user_id IS NOT NULL
      ),
      has_subs AS (
        SELECT DISTINCT user_id
        FROM public.user_subscriptions
      )
      SELECT
        u.id,
        u.email,
        u.created_at
      FROM all_users u
      LEFT JOIN has_paid p ON p.user_id = u.id
      LEFT JOIN has_subs s ON s.user_id = u.id
      WHERE p.user_id IS NULL
        AND s.user_id IS NULL
      ORDER BY u.created_at DESC
      LIMIT 200;
    `)

    if (rows.length === 0) {
      console.log('\n✅ No non-paid users found by this definition.\n')
      return
    }

    console.log(`\n⚠️ Found ${rows.length} candidate non-paid users (showing up to 200):\n`)
    rows.forEach((u) => {
      console.log(` - id=${u.id} email=${u.email} created_at=${u.created_at}`)
    })

    console.log('\nThis is a PREVIEW ONLY. No deletions have been performed.\n')
    console.log('If you decide to proceed with cleanup, we should:')
    console.log('  1) Narrow criteria further (e.g., known test domains).')
    console.log('  2) Write a dedicated cleanup script that deletes from auth.users and cascades.')
    console.log('  3) Log the operation in DB_ADMIN_WORKBOOK.md and MIGRATIONLOG.\n')
  } catch (err) {
    console.error('❌ Preview failed:', err.message)
    process.exit(1)
  } finally {
    await client.end()
  }
}

main()

