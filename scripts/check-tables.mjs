import pg from 'pg';
const { Client } = pg;

const client = new Client({
  connectionString: 'postgresql://postgres:6EuZVaBBydfDgw9u@db.skajbbewtntpudminpmr.supabase.co:5432/postgres',
  ssl: { rejectUnauthorized: false }
});

await client.connect();

// Check what tables exist
const result = await client.query(`
  SELECT table_name 
  FROM information_schema.tables 
  WHERE table_schema = 'public' 
    AND table_type = 'BASE TABLE'
  ORDER BY table_name;
`);

console.log('\\n📊 Existing tables in public schema:');
if (result.rows.length === 0) {
  console.log('  ❌ No tables found!');
} else {
  result.rows.forEach(row => {
    console.log('  ✓', row.table_name);
  });
}

await client.end();
