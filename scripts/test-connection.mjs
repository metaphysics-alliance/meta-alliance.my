import pg from 'pg';
const { Client } = pg;

const configs = [
  {
    name: 'Direct Connection (5432)',
    connectionString: 'postgresql://postgres:6EuZVaBBydfDgw9u@db.skajbbewtntpudminpmr.supabase.co:5432/postgres',
    ssl: { rejectUnauthorized: false }
  },
  {
    name: 'Pooler Connection (6543)',
    connectionString: 'postgresql://postgres.skajbbewtntpudminpmr:6EuZVaBBydfDgw9u@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false }
  }
];

async function testConnections() {
  for (const config of configs) {
    console.log('\\nTesting:', config.name);
    const client = new Client(config);
    try {
      await client.connect();
      console.log('✅ Connection successful!');
      
      // Test query
      const result = await client.query('SELECT current_database(), current_user;');
      console.log('  Database:', result.rows[0].current_database);
      console.log('  User:', result.rows[0].current_user);
      
      await client.end();
      
      // If successful, return this config
      return config;
    } catch (error) {
      console.log('❌ Failed:', error.message);
      try { await client.end(); } catch {}
    }
  }
  return null;
}

const workingConfig = await testConnections();
if (workingConfig) {
  console.log('\\n🎉 Found working connection:', workingConfig.name);
  process.exit(0);
} else {
  console.log('\\n❌ All connection methods failed');
  process.exit(1);
}
