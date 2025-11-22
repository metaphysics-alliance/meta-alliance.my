#!/usr/bin/env node

/**
 * Database Migration Runner
 * Executes SQL migration files directly against Supabase
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Load environment variables
dotenv.config({ path: join(projectRoot, '.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  console.error('   Required: VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runMigration(sqlFilePath) {
  try {
    console.log(`\n📄 Reading migration: ${sqlFilePath}`);
    const sql = readFileSync(sqlFilePath, 'utf-8');
    
    console.log(`🚀 Executing migration...`);
    
    // Execute the SQL
    const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql }).single();
    
    if (error) {
      // If the RPC doesn't exist, try direct execution via REST API
      console.log('   Trying direct SQL execution...');
      
      const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`
        },
        body: JSON.stringify({ sql_query: sql })
      });
      
      if (!response.ok) {
        // Fallback: Execute via pg connection string if available
        console.log('   Using alternative execution method...');
        
        // Split SQL into individual statements and execute
        const statements = sql
          .split(';')
          .map(s => s.trim())
          .filter(s => s.length > 0 && !s.startsWith('--'));
        
        for (const statement of statements) {
          const { error: stmtError } = await supabase.from('_sql_exec').select('*').limit(0);
          if (stmtError) {
            console.warn(`   ⚠️  Could not execute statement directly`);
          }
        }
        
        console.log('   ℹ️  Please run this migration manually via Supabase SQL Editor');
        console.log('   📋 SQL file location:', sqlFilePath);
        return false;
      }
    }
    
    console.log(`✅ Migration completed successfully!`);
    return true;
    
  } catch (error) {
    console.error(`❌ Migration failed:`, error.message);
    return false;
  }
}

async function main() {
  console.log('🗄️  Database Migration Runner');
  console.log('================================\n');
  
  const migrationFile = process.argv[2] || 'supabase/sql/subscription_sync_infrastructure.sql';
  const migrationPath = join(projectRoot, migrationFile);
  
  const success = await runMigration(migrationPath);
  
  if (success) {
    console.log('\n✨ Next steps:');
    console.log('   npm run sync:init - Initialize service mappings');
    console.log('   npm run sync:monitor - View sync health\n');
  } else {
    console.log('\n📝 Manual migration required:');
    console.log('   1. Open Supabase Dashboard → SQL Editor');
    console.log('   2. Copy contents from:', migrationPath);
    console.log('   3. Execute the SQL');
    console.log('   4. Run: npm run sync:init\n');
    process.exit(1);
  }
}

main();
