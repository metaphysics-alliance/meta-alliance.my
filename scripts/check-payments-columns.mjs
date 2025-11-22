#!/usr/bin/env node
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
const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } })

;(async () => {
  try {
    await client.connect()
    const res = await client.query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'payments'
      ORDER BY ordinal_position;
    `)
    console.log(JSON.stringify(res.rows, null, 2))
  } catch (err) {
    console.error('Failed to inspect payments columns:', err.message)
  } finally {
    await client.end()
  }
})()

