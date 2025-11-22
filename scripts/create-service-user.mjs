#!/usr/bin/env node
/**
 * Create service user account for automatic Supabase sign-in
 *
 * Uses service role key to ensure there is an auth user matching
 * VITE_SUPABASE_EMAIL / VITE_SUPABASE_PASSWORD from .env.local.
 *
 * Usage: node scripts/create-service-user.mjs
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve } from 'path'

function loadEnvFile(path = '.env.local') {
  try {
    const absolute = resolve(path)
    const content = readFileSync(absolute, 'utf8')
    content
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#'))
      .forEach((line) => {
        const index = line.indexOf('=')
        if (index === -1) return
        const key = line.slice(0, index).trim()
        let value = line.slice(index + 1).trim()
        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1)
        }
        if (!process.env[key]) {
          process.env[key] = value
        }
      })
  } catch (err) {
    console.warn(`Could not read ${path}:`, err.message)
  }
}

loadEnvFile()

const supabaseUrl =
  process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey =
  process.env.VITE_SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceKey) {
  console.error('Missing Supabase URL or service role key in .env.local')
  process.exit(1)
}

const email = process.env.VITE_SUPABASE_EMAIL
let password = process.env.VITE_SUPABASE_PASSWORD

if (!email || !password) {
  console.error(
    'VITE_SUPABASE_EMAIL and VITE_SUPABASE_PASSWORD must be set in .env.local',
  )
  process.exit(1)
}

// Strip possible surrounding quotes for safety
password = password.replace(/^["']|["']$/g, '')

const supabase = createClient(supabaseUrl, serviceKey)

async function main() {
  console.log('Ensuring service user exists for:', email)

  // Check if user already exists
  const { data: existing, error: listError } = await supabase.auth.admin.listUsers(
    { page: 1, perPage: 1000 },
  )

  if (listError) {
    console.error('Failed to list users:', listError)
    process.exit(1)
  }

  const found = existing.users.find((u) => u.email?.toLowerCase() === email.toLowerCase())

  if (found) {
    console.log('Service user already exists with id:', found.id)
    console.log('Updating service user password from .env.local...')

    const { error: updateError } = await supabase.auth.admin.updateUserById(found.id, {
      password,
      email_confirm: true,
      user_metadata: {
        ...(found.user_metadata || {}),
        role: 'service',
        updated_by: 'create-service-user.mjs',
      },
    })

    if (updateError) {
      console.error('Failed to update service user password:', updateError)
      process.exit(1)
    }

    console.log('Service user password updated successfully.')
    return
  }

  console.log('Creating new service user...')

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      role: 'service',
      created_by: 'create-service-user.mjs',
    },
  })

  if (error) {
    console.error('Failed to create service user:', error)
    process.exit(1)
  }

  console.log('Service user created with id:', data.user.id)
}

main().catch((err) => {
  console.error('Error while creating service user:', err)
  process.exit(1)
})
