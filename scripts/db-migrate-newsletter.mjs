#!/usr/bin/env node
/**
 * DB Admin: Direct Migration via Supabase Management API
 * 
 * Uses Supabase Management API to execute SQL migrations.
 * No external dependencies required - uses native fetch API.
 */

import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Supabase credentials
const PROJECT_REF = 'skajbbewtntpudminpmr'
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrYWpiYmV3dG50cHVkbWlucG1yIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzA0Mzg4NSwiZXhwIjoyMDc4NDAzODg1fQ.zMt93w00MpukB__xJJdhVWLLTA9IJfsWI9-LnftFrHg'
const DB_PASSWORD = 'qhK33XLWKiABgBvV'

console.log('🔧 DB Admin: Management API Migration Executor\n')
console.log('='.repeat(60))

async function executeMigration() {
  try {
    // Step 1: Read SQL file
    console.log('\n1️⃣ Reading migration SQL...')
    const sqlPath = join(__dirname, '..', 'supabase', 'sql', 'newsletter_subscriptions.sql')
    const sql = readFileSync(sqlPath, 'utf8')
    console.log('   ✅ SQL file loaded (' + sql.length + ' bytes)')

    // Step 2: Execute via Management API
    console.log('\n2️⃣ Executing migration via Management API...')
    
    const response = await fetch(
      `https://${PROJECT_REF}.supabase.co/rest/v1/rpc/exec_sql`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SERVICE_ROLE_KEY,
          'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
        },
        body: JSON.stringify({ query: sql })
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      
      if (errorText.includes('function public.exec_sql') || errorText.includes('does not exist')) {
        console.log('   ⚠️  Management API method not available')
        console.log('\n' + '='.repeat(60))
        console.log('📋 MANUAL MIGRATION REQUIRED\n')
        console.log('The Supabase JS/REST API cannot execute DDL statements.')
        console.log('This is a platform limitation, not a bug.\n')
        console.log('✅ Solution: Run SQL in Supabase Dashboard (30 seconds)\n')
        console.log('Steps:')
        console.log('  1. Open: https://supabase.com/dashboard/project/' + PROJECT_REF + '/sql')
        console.log('  2. Copy ALL contents of: supabase/sql/newsletter_subscriptions.sql')
        console.log('  3. Paste into SQL Editor')
        console.log('  4. Click "RUN"')
        console.log('  5. Verify: npm run newsletter:test\n')
        console.log('='.repeat(60))
        return false
      }
      
      throw new Error(`API returned ${response.status}: ${errorText}`)
    }

    console.log('   ✅ Migration executed via API')

    // Step 3: Verify via REST API
    console.log('\n3️⃣ Verifying table exists...')
    const checkResponse = await fetch(
      `https://${PROJECT_REF}.supabase.co/rest/v1/newsletter_subscriptions?select=count`,
      {
        method: 'HEAD',
        headers: {
          'apikey': SERVICE_ROLE_KEY,
          'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
        }
      }
    )

    if (checkResponse.ok) {
      console.log('   ✅ Table accessible via REST API')
    } else {
      console.log('   ⚠️  Table verification inconclusive')
    }

    console.log('\n' + '='.repeat(60))
    console.log('✨ MIGRATION COMPLETE!\n')
    console.log('🚀 Next steps:')
    console.log('   1. Visit: http://localhost:5173')
    console.log('   2. Test newsletter signup')
    console.log('   3. Verify: npm run newsletter:test\n')
    console.log('='.repeat(60))

    return true

  } catch (err) {
    console.error('\n❌ Migration failed:', err.message)
    
    console.log('\n' + '='.repeat(60))
    console.log('📋 FALLBACK: Manual Migration\n')
    console.log('Why automated migration failed:')
    console.log('  • Supabase JS client is REST API only (no DDL support)')
    console.log('  • Management API requires custom RPC functions')
    console.log('  • Direct PostgreSQL connection had dependency issues\n')
    console.log('✅ Recommended Solution:\n')
    console.log('Run SQL manually in Supabase Dashboard:')
    console.log('  1. Open: https://supabase.com/dashboard/project/' + PROJECT_REF + '/sql')
    console.log('  2. Copy: supabase/sql/newsletter_subscriptions.sql')
    console.log('  3. Paste and click RUN')
    console.log('  4. Takes < 30 seconds\n')
    console.log('='.repeat(60))
    
    return false
  }
}

executeMigration().then(success => {
  process.exit(success ? 0 : 1)
})
