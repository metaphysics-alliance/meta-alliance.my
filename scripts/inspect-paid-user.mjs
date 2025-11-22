#!/usr/bin/env node
/**
 * Inspect all key tables for a given email to see
 * what records exist and where there are gaps.
 *
 * Usage:
 *   node scripts/inspect-paid-user.mjs <email>
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
  console.error('Usage: node scripts/inspect-paid-user.mjs <email>')
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
    console.log('\n🔎 Inspecting records for:', email)

    // auth.users
    const { rows: authUsers } = await client.query(
      `
      SELECT id, email, created_at
      FROM auth.users
      WHERE lower(email) = lower($1)
      ORDER BY created_at DESC;
    `,
      [email],
    )
    console.log('\n🧩 auth.users:')
    if (authUsers.length === 0) {
      console.log('  (none)')
    } else {
      authUsers.forEach((u) =>
        console.log(`  - id=${u.id} created_at=${u.created_at}`),
      )
    }

    const userIds = authUsers.map((u) => u.id)

    // guest_orders
    const { rows: orders } = await client.query(
      `
      SELECT id, payment_status, magic_link_token, account_created, user_id, created_at
      FROM public.guest_orders
      WHERE lower(guest_email) = lower($1)
      ORDER BY created_at DESC;
    `,
      [email],
    )
    console.log('\n🧾 guest_orders:')
    if (orders.length === 0) {
      console.log('  (none)')
    } else {
      orders.forEach((o) =>
        console.log(
          `  - id=${o.id} status=${o.payment_status} account_created=${o.account_created} user_id=${o.user_id} magic_token=${o.magic_link_token} created_at=${o.created_at}`,
        ),
      )
    }

    // user_profiles (Tools shape: user_id)
    const { rows: profiles } = await client.query(
      `
      SELECT user_id, profile_state, completion_pct, created_at, updated_at
      FROM public.user_profiles
      WHERE user_id = ANY($1::uuid[]);
    `,
      [userIds],
    )
    console.log('\n👤 user_profiles:')
    if (profiles.length === 0) {
      console.log('  (none)')
    } else {
      profiles.forEach((p) =>
        console.log(
          `  - user_id=${p.user_id} state=${p.profile_state} completion=${p.completion_pct} created_at=${p.created_at}`,
        ),
      )
    }

    // user_subscriptions
    const { rows: subs } = await client.query(
      `
      SELECT id, user_id, plan_id, status, started_at, expires_at
      FROM public.user_subscriptions
      WHERE user_id = ANY($1::uuid[])
      ORDER BY created_at DESC;
    `,
      [userIds],
    )
    console.log('\n📦 user_subscriptions:')
    if (subs.length === 0) {
      console.log('  (none)')
    } else {
      subs.forEach((s) =>
        console.log(
          `  - id=${s.id} user_id=${s.user_id} status=${s.status} started_at=${s.started_at}`,
        ),
      )
    }

    // payments (if any)
    const { rows: pay } = await client.query(
      `
      SELECT id, user_id, amount, currency, status, created_at
      FROM public.payments
      WHERE user_id = ANY($1::uuid[])
      ORDER BY created_at DESC;
    `,
      [userIds],
    )
    console.log('\n💳 payments:')
    if (pay.length === 0) {
      console.log('  (none)')
    } else {
      pay.forEach((p) =>
        console.log(
          `  - id=${p.id} amount=${p.amount} ${p.currency} status=${p.status} created_at=${p.created_at}`,
        ),
      )
    }

    // account_sync / subscription_sync_log
    const { rows: sync } = await client.query(
      `
      SELECT id, mvp_user_id, master_user_id, sync_status, magic_link_token
      FROM public.account_sync
      WHERE mvp_user_id = ANY($1::uuid[]);
    `,
      [userIds],
    )
    console.log('\n🔗 account_sync:')
    if (sync.length === 0) {
      console.log('  (none)')
    } else {
      sync.forEach((s) =>
        console.log(
          `  - id=${s.id} status=${s.sync_status} magic_link_token=${s.magic_link_token}`,
        ),
      )
    }

    try {
      const { rows: syncLog } = await client.query(
        `
        SELECT id, account_sync_id, mvp_subscription_id, master_subscription_id, event_type, event_status, sync_direction, created_at
        FROM public.subscription_sync_log
        WHERE mvp_subscription_id = ANY($1::uuid[])
        ORDER BY created_at DESC;
      `,
        [userIds],
      )
      console.log('\n📝 subscription_sync_log:')
      if (syncLog.length === 0) {
        console.log('  (none)')
      } else {
        syncLog.forEach((l) =>
          console.log(
            `  - id=${l.id} event=${l.event_type} status=${l.event_status} direction=${l.sync_direction} created_at=${l.created_at}`,
          ),
        )
      }
    } catch (e) {
      console.log('\n📝 subscription_sync_log: (schema mismatch or table not present)')
    }

    console.log('\n✅ Inspection complete.\n')
  } catch (err) {
    console.error('❌ Inspection failed:', err.message)
    process.exit(1)
  } finally {
    await client.end()
  }
}

main()
