#!/usr/bin/env node
/**
 * Backfill magic link + payment_status for an already-paid guest order
 *
 * Usage:
 *   node scripts/backfill-magic-link.mjs <magicToken> <guestEmail>
 *
 * This will:
 *   1. Find the most recent guest_orders row for that email.
 *   2. Set payment_status = 'succeeded' (if not already).
 *   3. Set magic_link_token = <magicToken>, magic_link_sent_at = now().
 *
 * After running, the existing "Create My Account" magic link email
 * that contains <magicToken> should resolve correctly.
 */

import pg from 'pg'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load .env.local from project root
dotenv.config({ path: join(__dirname, '..', '.env.local') })

const connectionString = process.env.SUPABASE_DB_URL

if (!connectionString) {
  console.error('Missing SUPABASE_DB_URL in .env.local')
  process.exit(1)
}

const [magicToken, guestEmail] = process.argv.slice(2)

if (!magicToken || !guestEmail) {
  console.error('Usage: node scripts/backfill-magic-link.mjs <magicToken> <guestEmail>')
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

    console.log('\n🔎 Looking up latest guest_orders row for email:', guestEmail)

    const { rows } = await client.query(
      `
        SELECT id, guest_email, payment_status, account_created, magic_link_token, created_at
        FROM public.guest_orders
        WHERE lower(guest_email) = lower($1)
        ORDER BY created_at DESC
        LIMIT 1;
      `,
      [guestEmail],
    )

    if (rows.length === 0) {
      console.error('❌ No guest_orders row found for that email.')
      process.exit(1)
    }

    const order = rows[0]

    console.log('✅ Found order:')
    console.log('   id             :', order.id)
    console.log('   created_at     :', order.created_at)
    console.log('   payment_status :', order.payment_status)
    console.log('   account_created:', order.account_created)
    console.log('   magic_link_token (before):', order.magic_link_token)

    const { rowCount } = await client.query(
      `
        UPDATE public.guest_orders
        SET
          payment_status      = 'succeeded',
          magic_link_token    = $2,
          magic_link_sent_at  = timezone('utc', now()),
          updated_at          = timezone('utc', now())
        WHERE id = $1;
      `,
      [order.id, magicToken],
    )

    if (rowCount !== 1) {
      console.error('❌ Update failed; no rows modified.')
      process.exit(1)
    }

    console.log('\n✅ guest_orders row updated:')
    console.log('   id                 :', order.id)
    console.log('   payment_status     : succeeded')
    console.log('   magic_link_token   :', magicToken)
    console.log('   magic_link_sent_at : now()')

    console.log('\nNext step:')
    console.log('  • Re-click the existing "Create My Account" link')
    console.log('    that contains this magic token:', magicToken)
    console.log('  • The /auth/magic/:token handler should now resolve it')
    console.log('    and create your account without another payment.')
  } catch (err) {
    console.error('❌ Backfill failed:', err.message)
    process.exit(1)
  } finally {
    await client.end()
  }
}

main()

