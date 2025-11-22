#!/usr/bin/env node
/**
 * Inspect subscription-related tables in the live Supabase DB.
 */

import pg from 'pg'
import { config } from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

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

    const { rows: tables } = await client.query(
      `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_type = 'BASE TABLE'
        AND table_name ILIKE '%subscript%';
    `,
    )

    if (tables.length === 0) {
      console.log('No subscription-related tables found in public schema.')
      return
    }

    console.log('Subscription-related tables:')
    for (const t of tables) {
      console.log(' -', t.table_name)
    }

    for (const t of tables) {
      console.log(`\nColumns for public.${t.table_name}:`)
      const { rows: cols } = await client.query(
        `
        SELECT column_name, data_type, column_default, is_nullable
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = $1
        ORDER BY ordinal_position;
      `,
        [t.table_name],
      )
      for (const c of cols) {
        console.log(
          ` - ${c.column_name} :: ${c.data_type}` +
            (c.is_nullable === 'NO' ? ' NOT NULL' : '') +
            (c.column_default ? ` DEFAULT ${c.column_default}` : ''),
        )
      }
    }
  } catch (err) {
    console.error('Failed to inspect subscription tables:', err.message)
    process.exit(1)
  } finally {
    await client.end()
  }
}

main()

