#!/usr/bin/env node
/**
 * DB Admin: Check if contact_enquiries table exists
 */

import pg from 'pg'
const { Client } = pg

const SUPABASE_DB_URL = `postgresql://postgres:qhK33XLWKiABgBvV@db.skajbbewtntpudminpmr.supabase.co:5432/postgres`

async function checkTable() {
  const client = new Client({
    connectionString: SUPABASE_DB_URL,
    ssl: { rejectUnauthorized: false }
  })
  
  try {
    await client.connect()
    
    const result = await client.query(`
      SELECT table_name, column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_schema = 'public' 
      AND table_name = 'contact_enquiries'
      ORDER BY ordinal_position
    `)
    
    if (result.rows.length === 0) {
      console.log('❌ Table contact_enquiries does NOT exist\n')
      console.log('Need to create migration for contact form storage.')
    } else {
      console.log('✅ Table contact_enquiries EXISTS\n')
      console.log('Schema:')
      result.rows.forEach(row => {
        console.log(`  • ${row.column_name} (${row.data_type}) ${row.is_nullable === 'NO' ? '*' : ''}`)
      })
    }
    
    await client.end()
  } catch (err) {
    console.error('Error:', err.message)
  }
}

checkTable()
