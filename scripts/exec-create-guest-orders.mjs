import pg from 'pg';
import { readFileSync } from 'fs';
const { Client } = pg;

const client = new Client({
  connectionString: 'postgresql://postgres:6EuZVaBBydfDgw9u@db.skajbbewtntpudminpmr.supabase.co:5432/postgres',
  ssl: { rejectUnauthorized: false }
});

await client.connect();
console.log('Creating guest_orders table...');

const sql = readFileSync('./scripts/create-guest-orders.sql', 'utf8');
await client.query(sql);

console.log('✅ guest_orders table created');
await client.end();
