#!/usr/bin/env node
import pg from 'pg'
const { Client } = pg
const client = new Client({ 
  connectionString: 'postgresql://postgres:qhK33XLWKiABgBvV@db.skajbbewtntpudminpmr.supabase.co:5432/postgres', 
  ssl: { rejectUnauthorized: false } 
})
await client.connect()
const cols = await client.query(`
  SELECT column_name, data_type, column_default, is_nullable
  FROM information_schema.columns 
  WHERE table_name = 'newsletter_subscriptions' 
  ORDER BY ordinal_position
`)
console.log('📋 Columns in newsletter_subscriptions:')
cols.rows.forEach(c => {
  const nullable = c.is_nullable === 'YES' ? ' (nullable)' : ' *REQUIRED*'
  console.log(`  • ${c.column_name} (${c.data_type})${nullable}`)
  if (c.column_default) console.log(`    default: ${c.column_default}`)
})
await client.end()
