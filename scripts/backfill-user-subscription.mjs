#!/usr/bin/env node
/**
 * Backfill a missing user_subscriptions record for an existing user.
 *
 * Usage:
 *   node scripts/backfill-user-subscription.mjs <email>
 *
 * Steps:
 *   1. Find auth.users row by email.
 *   2. Check if user_subscriptions already has any row for that user_id.
 *   3. If not, pick a plan from subscription_plans (essential/advanced/supreme).
 *   4. Insert an active user_subscriptions record.
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

const email = process.argv[2]

if (!email) {
  console.error('Usage: node scripts/backfill-user-subscription.mjs <email>')
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

    console.log('\n🔎 Looking up auth user for email:', email)

    const { rows: users } = await client.query(
      `
        SELECT id, email
        FROM auth.users
        WHERE lower(email) = lower($1)
        ORDER BY created_at DESC
        LIMIT 1;
      `,
      [email],
    )

    if (users.length === 0) {
      console.error('❌ No auth.users row found for that email.')
      process.exit(1)
    }

    const user = users[0]
    console.log('✅ Found auth user id:', user.id)

    // Check for existing user_subscriptions
    const { rows: existingSubs } = await client.query(
      `
        SELECT id, status, started_at
        FROM public.user_subscriptions
        WHERE user_id = $1
        ORDER BY created_at DESC;
      `,
      [user.id],
    )

    if (existingSubs.length > 0) {
      console.log('\nℹ️ user_subscriptions already exists for this user:')
      existingSubs.forEach((s) => {
        console.log(
          ` - ${s.id} (status=${s.status}, started_at=${s.started_at})`,
        )
      })
      return
    }

    console.log('\n🔎 No user_subscriptions found, selecting a plan...')

    const { rows: plans } = await client.query(
      `
        SELECT id, plan_code, plan_name_en
        FROM public.subscription_plans
        WHERE plan_code IN ('essential', 'advanced', 'supreme')
        ORDER BY plan_code;
      `,
    )

    if (plans.length === 0) {
      console.error('❌ No subscription_plans (essential/advanced/supreme) found.')
      process.exit(1)
    }

    const preferredOrder = ['essential', 'advanced', 'supreme']
    let selected =
      plans.find((p) => p.plan_code === preferredOrder[0]) ||
      plans.find((p) => p.plan_code === preferredOrder[1]) ||
      plans[0]

    console.log(
      `✅ Selected plan: ${selected.plan_code} (${selected.plan_name_en})`,
    )

    const now = new Date().toISOString()

    const { rows: inserted, rowCount } = await client.query(
      `
        INSERT INTO public.user_subscriptions (
          user_id,
          plan_id,
          status,
          started_at,
          auto_renew,
          created_at,
          updated_at
        )
        VALUES ($1, $2, 'active', $3, false, $3, $3)
        RETURNING id, status, started_at;
      `,
      [user.id, selected.id, now],
    )

    if (rowCount !== 1) {
      console.error('❌ Failed to insert user_subscriptions row.')
      process.exit(1)
    }

    const sub = inserted[0]
    console.log('\n✅ user_subscriptions row created:')
    console.log('   id         :', sub.id)
    console.log('   status     :', sub.status)
    console.log('   started_at :', sub.started_at)
  } catch (err) {
    console.error('❌ Backfill user_subscriptions failed:', err.message)
    process.exit(1)
  } finally {
    await client.end()
  }
}

main()

