#!/usr/bin/env node

/**
 * Database Migration Runner using PostgreSQL direct connection
 */

import pg from 'pg';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

const { Client } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Load environment variables
dotenv.config({ path: join(projectRoot, '.env.local') });

const connectionString = process.env.SUPABASE_DB_URL;

if (!connectionString) {
  console.error('❌ Missing SUPABASE_DB_URL in .env.local');
  process.exit(1);
}

async function runMigration(sqlFilePath) {
  const client = new Client({ connectionString });
  
  try {
    console.log(`\n📄 Reading migration: ${sqlFilePath}`);
    const sql = readFileSync(sqlFilePath, 'utf-8');
    
    console.log('🔌 Connecting to database...');
    await client.connect();
    console.log('✅ Connected!');
    
    console.log(`🚀 Executing migration...`);
    await client.query(sql);
    
    console.log(`✅ Migration completed successfully!`);
    return true;
    
  } catch (error) {
    console.error(`❌ Migration failed:`, error.message);
    if (error.stack) {
      console.error('Stack trace:', error.stack);
    }
    return false;
  } finally {
    await client.end();
  }
}

async function main() {
  console.log('🗄️  Database Migration Runner (PostgreSQL)');
  console.log('==========================================\n');
  
  const migrationFile = process.argv[2] || 'supabase/migrations/20251115_sync_infrastructure.sql';
  const migrationPath = join(projectRoot, migrationFile);
  
  const success = await runMigration(migrationPath);
  
  if (success) {
    console.log('\n✨ Next steps:');
    console.log('   npm run sync:init - Initialize service mappings');
    console.log('   npm run sync:monitor - View sync health\n');
  } else {
    console.log('\n📝 Migration failed. Please check the error above.\n');
    process.exit(1);
  }
}

main();
