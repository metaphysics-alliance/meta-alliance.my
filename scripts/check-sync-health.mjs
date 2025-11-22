import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = join(__dirname, '..')

dotenv.config({ path: join(projectRoot, '.env.local') })

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function checkSyncHealth() {
  console.log('\n🔍 Checking Subscription Sync Health...\n')

  try {
    // Check sync health dashboard
    const { data: health, error: healthError } = await supabase
      .from('sync_health_dashboard')
      .select('*')

    if (healthError) throw healthError

    console.log('📊 Sync Status Overview:')
    console.table(health)

    // Check recent sync logs
    const { data: recentLogs, error: logsError } = await supabase
      .from('subscription_sync_log')
      .select('event_type, event_status, started_at, error_message')
      .order('started_at', { ascending: false })
      .limit(10)

    if (logsError) throw logsError

    console.log('\n📝 Recent Sync Operations (Last 10):')
    if (recentLogs && recentLogs.length > 0) {
      console.table(recentLogs)
    } else {
      console.log('  No sync operations yet')
    }

    // Check pending syncs
    const { data: pending, error: pendingError } = await supabase
      .from('account_sync')
      .select('email, sync_status, last_synced_at, last_error')
      .eq('sync_status', 'pending')

    if (pendingError) throw pendingError

    if (pending && pending.length > 0) {
      console.log('\n⚠️  Pending Syncs:')
      console.table(pending)
    } else {
      console.log('\n✅ No pending syncs')
    }

    // Check failed syncs
    const { data: failed, error: failedError } = await supabase
      .from('account_sync')
      .select('email, sync_status, last_synced_at, last_error')
      .eq('sync_status', 'error')

    if (failedError) throw failedError

    if (failed && failed.length > 0) {
      console.log('\n❌ Failed Syncs:')
      console.table(failed)
    } else {
      console.log('\n✅ No failed syncs')
    }

    // Check active service mappings
    const { data: mappings, error: mappingsError } = await supabase
      .from('service_plan_mapping')
      .select('mvp_service_name, master_plan_code, priority')
      .eq('is_active', true)
      .order('priority', { ascending: false })

    if (mappingsError) throw mappingsError

    console.log('\n🗺️  Active Service Plan Mappings:')
    console.table(mappings)

    console.log('\n✅ Sync health check complete!\n')

  } catch (error) {
    console.error('\n❌ Error checking sync health:', error.message)
    process.exit(1)
  }
}

checkSyncHealth()
