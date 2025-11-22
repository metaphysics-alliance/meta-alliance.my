#!/usr/bin/env node
/**
 * Fix guest_orders.user_id for a paid order so it matches the current auth user id.
 *
 * Usage:
 *   node scripts/fix-paid-order-user-link.mjs <email>
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
  console.error('Usage: node scripts/fix-paid-order-user-link.mjs <email>')
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

    console.log('\n🔎 Fixing guest_orders.user_id for paid order of:', email)

    // 1) Get latest auth user id for the email
    const { rows: authUsers } = await client.query(
      `
      SELECT id, email, created_at
      FROM auth.users
      WHERE lower(email) = lower($1)
      ORDER BY created_at DESC
      LIMIT 1;
    `,
      [email],
    )

    if (authUsers.length === 0) {
      console.error('❌ No auth.users row found for that email.')
      process.exit(1)
    }

    const authUser = authUsers[0]
    console.log('✅ Using auth user id:', authUser.id)

    // 2) Find latest succeeded guest_order for that email
    const { rows: orders } = await client.query(
      `
      SELECT id, user_id, payment_status, account_created, magic_link_token, created_at
      FROM public.guest_orders
      WHERE lower(guest_email) = lower($1)
        AND payment_status = 'succeeded'
      ORDER BY created_at DESC
      LIMIT 1;
    `,
      [email],
    )

    if (orders.length === 0) {
      console.error('❌ No succeeded guest_orders found for that email.')
      process.exit(1)
    }

    const order = orders[0]
    console.log('✅ Found succeeded guest_order:', order.id)
    console.log('   current user_id   :', order.user_id)
    console.log('   account_created   :', order.account_created)
    console.log('   magic_link_token  :', order.magic_link_token)

    if (order.user_id === authUser.id) {
      console.log('\nℹ️ guest_orders.user_id already matches auth user id. Nothing to fix.')
      return
    }

    // 3) Update guest_orders.user_id and account_created flag
    const { rowCount } = await client.query(
      `
      UPDATE public.guest_orders
      SET
        user_id = $2,
        account_created = true,
        updated_at = timezone('utc', now())
      WHERE id = $1;
    `,
      [order.id, authUser.id],
    )

    if (rowCount !== 1) {
      console.error('❌ Update failed; no rows modified.')
      process.exit(1)
    }

    console.log('\n✅ guest_orders updated:')
    console.log('   id               :', order.id)
    console.log('   user_id (new)    :', authUser.id)
    console.log('   account_created  : true')
    console.log('\nDone.\n')
  } catch (err) {
    console.error('❌ Fix failed:', err.message)
    process.exit(1)
  } finally {
    await client.end()
  }
}

main()

