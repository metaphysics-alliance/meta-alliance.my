#!/usr/bin/env node
/**
 * Quick helper: list columns on public.guest_orders
 * so we can see what the live Supabase schema actually has.
 */

import pg from 'pg'
import { config } from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load .env.local from project root
config({ path: join(__dirname, '..', '.env.local') })

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

    const { rows } = await client.query(
      `
      SELECT
        column_name,
        data_type,
        column_default,
        is_nullable
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name = 'guest_orders'
      ORDER BY ordinal_position;
    `,
    )

    console.log('\nColumns on public.guest_orders:')
    for (const row of rows) {
      console.log(
        ` - ${row.column_name} :: ${row.data_type}` +
          (row.is_nullable === 'NO' ? ' NOT NULL' : '') +
          (row.column_default ? ` DEFAULT ${row.column_default}` : ''),
      )
    }
  } catch (err) {
    console.error('Failed to inspect guest_orders columns:', err.message)
    process.exit(1)
  } finally {
    await client.end()
  }
}

main()

