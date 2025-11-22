#!/usr/bin/env node
/**
 * List all Master Users (grand_master / master_admin).
 *
 * Shows:
 *  - email
 *  - role (from allowlist)
 *  - public.users.role
 *  - auth.users.id and created_at
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

    const { rows } = await client.query(`
      SELECT
        m.email,
        m.role          AS allowlist_role,
        u.id            AS auth_user_id,
        au.created_at   AS auth_created_at,
        u.role          AS users_role,
        u.status        AS users_status
      FROM public.master_user_allowlist m
      LEFT JOIN auth.users au
        ON lower(au.email) = lower(m.email)
      LEFT JOIN public.users u
        ON u.id = au.id
      ORDER BY m.email;
    `)

    if (rows.length === 0) {
      console.log('\n(no entries in master_user_allowlist)\n')
      return
    }

    console.log('\nMaster Users (from master_user_allowlist + public.users):\n')
    rows.forEach((r) => {
      console.log(
        ` - email=${r.email} allowlist_role=${r.allowlist_role} auth_user_id=${r.auth_user_id || 'NULL'} users_role=${r.users_role || 'NULL'} status=${r.users_status || 'NULL'} created_at=${r.auth_created_at || 'NULL'}`,
      )
    })
    console.log('')
  } catch (err) {
    console.error('Failed to list master users:', err.message)
    process.exit(1)
  } finally {
    await client.end()
  }
}

main()

