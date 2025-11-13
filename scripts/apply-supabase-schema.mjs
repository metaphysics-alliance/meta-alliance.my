/**
 * Apply Supabase Schema - Create all payment & user tables
 * MA-SUPABASE-SCHEMA-APPLY-2025-11-13T21:51:00+08:00
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://skajbbewtntpudminpmr.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing VITE_SUPABASE_SERVICE_ROLE_KEY in environment');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function applySchema() {
  console.log('🚀 Meta Alliance - Supabase Schema Application');
  console.log('================================================\n');

  // Read SQL file
  const sqlPath = join(__dirname, '..', 'supabase', 'sql', 'user_profiles_subscriptions.sql');
  console.log(`📄 Reading SQL from: ${sqlPath}`);
  
  const sql = readFileSync(sqlPath, 'utf-8');
  console.log(`✅ SQL file loaded (${sql.length} bytes)\n`);

  // Execute SQL
  console.log('⚡ Executing SQL schema...');
  console.log('This may take a few moments...\n');

  try {
    const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });

    if (error) {
      // Try alternative method: split and execute each statement
      console.log('⚠️ RPC method failed, trying direct execution...\n');
      
      // Split SQL into individual statements
      const statements = sql
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0 && !s.startsWith('--'));

      console.log(`Found ${statements.length} SQL statements to execute\n`);

      for (let i = 0; i < statements.length; i++) {
        const stmt = statements[i] + ';';
        console.log(`[${i + 1}/${statements.length}] Executing...`);
        
        const { error: stmtError } = await supabase.rpc('exec_sql', { sql_query: stmt });
        
        if (stmtError) {
          console.error(`❌ Error on statement ${i + 1}:`, stmtError.message);
          // Continue to next statement (some might already exist)
        } else {
          console.log(`✅ Statement ${i + 1} completed`);
        }
      }
    } else {
      console.log('✅ Schema applied successfully!\n');
    }
  } catch (err) {
    console.error('❌ Unexpected error:', err);
    console.log('\n⚠️ If errors persist, please:');
    console.log('1. Copy the SQL from supabase/sql/user_profiles_subscriptions.sql');
    console.log('2. Go to: https://skajbbewtntpudminpmr.supabase.co/project/_/sql');
    console.log('3. Paste and run the SQL in the SQL Editor\n');
    process.exit(1);
  }

  // Verify tables created
  console.log('\n🔍 Verifying tables...');
  
  const tables = [
    'user_profiles',
    'subscriptions',
    'subscription_payments',
    'newsletter_subscriptions',
    'guest_orders',
    'contact_enquiries'
  ];

  for (const table of tables) {
    const { count, error } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.log(`❌ ${table}: NOT FOUND (${error.message})`);
    } else {
      console.log(`✅ ${table}: EXISTS (${count} rows)`);
    }
  }

  console.log('\n================================================');
  console.log('✅ Schema application complete!');
  console.log('================================================\n');
}

applySchema().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
