#!/usr/bin/env node
/**
 * Cleanup non-paid users identified by preview-nonpaid-users.mjs,
 * excluding specific emails we want to keep.
 *
 * CURRENT EXCLUSION: shaun414131@gmail.com
 *
 * This script deletes from auth.users; cascading FKs and triggers
 * will clean up related rows in public.users, user_profiles, etc.
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

const EXCLUDED_EMAILS = ['shaun414131@gmail.com']

async function main() {
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  })

  try {
    await client.connect()

    console.log('\n🔎 Selecting non-paid users for cleanup (excluding: ' + EXCLUDED_EMAILS.join(', ') + ')')

    const { rows } = await client.query(
      `
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
        AND lower(u.email) <> ANY($1::text[])
      ORDER BY u.created_at DESC;
    `,
      [EXCLUDED_EMAILS.map((e) => e.toLowerCase())],
    )

    if (rows.length === 0) {
      console.log('\n✅ No non-paid users to clean up (after exclusions).\n')
      return
    }

    console.log(`\n⚠️ Will delete ${rows.length} auth.users rows:`)
    rows.forEach((u) => {
      console.log(` - id=${u.id} email=${u.email} created_at=${u.created_at}`)
    })

    const ids = rows.map((u) => u.id)

    const { rowCount } = await client.query(
      `
      DELETE FROM auth.users
      WHERE id = ANY($1::uuid[]);
    `,
      [ids],
    )

    console.log(`\n🧹 Deleted ${rowCount} auth.users rows (cascading to related tables via triggers/FKs).\n`)
  } catch (err) {
    console.error('❌ Cleanup failed:', err.message)
    process.exit(1)
  } finally {
    await client.end()
  }
}

main()

