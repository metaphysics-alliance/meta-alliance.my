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

const SERVICE_MAPPINGS = [
  // BaZi Consultation - Basic
  {
    mvp_service_id: 'bazi_consultation_basic',
    mvp_service_name: 'BaZi Consultation - Basic',
    master_plan_code: 'BASIC',
    priority: 1,
    notes: '60min consultation, Written report, Email support'
  },
  // BaZi Consultation - Premium
  {
    mvp_service_id: 'bazi_consultation_premium',
    mvp_service_name: 'BaZi Consultation - Premium',
    master_plan_code: 'PREMIUM',
    priority: 2,
    notes: '90min consultation, Detailed report, Priority support, Annual review'
  },
  // Feng Shui - Residential
  {
    mvp_service_id: 'feng_shui_residential',
    mvp_service_name: 'Feng Shui Assessment - Residential',
    master_plan_code: 'PREMIUM',
    priority: 2,
    notes: 'Home assessment, Layout recommendations, Element analysis'
  },
  // Feng Shui - Commercial
  {
    mvp_service_id: 'feng_shui_commercial',
    mvp_service_name: 'Feng Shui Assessment - Commercial',
    master_plan_code: 'ENTERPRISE',
    priority: 3,
    notes: 'Office assessment, Business optimization, Quarterly reviews'
  },
  // Date Selection - Standard
  {
    mvp_service_id: 'date_selection_standard',
    mvp_service_name: 'Date Selection - Standard',
    master_plan_code: 'BASIC',
    priority: 1,
    notes: 'Event date analysis, 3 date options, Timing recommendations'
  },
  // Date Selection - Premium
  {
    mvp_service_id: 'date_selection_premium',
    mvp_service_name: 'Date Selection - Premium',
    master_plan_code: 'PREMIUM',
    priority: 2,
    notes: 'Multiple events, Unlimited options, Priority processing'
  },
  // Bundle upgrade rule: 2+ services = Enterprise
  {
    mvp_service_id: 'bundle_2_services',
    mvp_service_name: 'Multi-Service Bundle',
    master_plan_code: 'PREMIUM',
    min_services_for_upgrade: 2,
    upgrade_to_plan_code: 'ENTERPRISE',
    priority: 10,
    notes: 'Auto-upgrade to Enterprise when 2+ services purchased'
  }
]

async function initServiceMapping() {
  console.log('\n🔧 Initializing Service Plan Mappings...\n')

  try {
    for (const mapping of SERVICE_MAPPINGS) {
      console.log(`Processing: ${mapping.mvp_service_name}`)
      
      // Check if mapping exists
      const { data: existing } = await supabase
        .from('service_plan_mapping')
        .select('id')
        .eq('mvp_service_id', mapping.mvp_service_id)
        .single()

      if (existing) {
        // Update existing mapping
        const { error } = await supabase
          .from('service_plan_mapping')
          .update(mapping)
          .eq('id', existing.id)

        if (error) throw error
        console.log(`  ✅ Updated existing mapping`)
      } else {
        // Insert new mapping
        const { error } = await supabase
          .from('service_plan_mapping')
          .insert(mapping)

        if (error) throw error
        console.log(`  ✅ Created new mapping`)
      }
    }

    console.log('\n✅ Service plan mappings initialized successfully!\n')

    // Display final state
    const { data: allMappings } = await supabase
      .from('service_plan_mapping')
      .select('mvp_service_name, master_plan_code, priority, notes')
      .eq('is_active', true)
      .order('priority', { ascending: false })

    console.log('📊 Current Active Mappings:')
    console.table(allMappings)

  } catch (error) {
    console.error('\n❌ Error initializing service mappings:', error.message)
    console.error('Details:', error)
    process.exit(1)
  }
}

initServiceMapping()
