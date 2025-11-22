#!/usr/bin/env node
/**
 * Helper: list columns on public.user_profiles (if it exists)
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
        AND table_name = 'user_profiles';
    `,
    )

    if (tables.length === 0) {
      console.log('Table public.user_profiles does not exist yet.')
      return
    }

    const { rows } = await client.query(
      `
      SELECT column_name, data_type, column_default, is_nullable
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name = 'user_profiles'
      ORDER BY ordinal_position;
    `,
    )

    console.log('\nColumns on public.user_profiles:')
    for (const row of rows) {
      console.log(
        ` - ${row.column_name} :: ${row.data_type}` +
          (row.is_nullable === 'NO' ? ' NOT NULL' : '') +
          (row.column_default ? ` DEFAULT ${row.column_default}` : ''),
      )
    }
  } catch (err) {
    console.error('Failed to inspect user_profiles columns:', err.message)
    process.exit(1)
  } finally {
    await client.end()
  }
}

main()

