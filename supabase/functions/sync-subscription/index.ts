import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface SyncRequest {
  mvpUserId: string
  masterUserId?: string
  operation: 'create' | 'update' | 'cancel' | 'reactivate'
  subscriptionData: {
    serviceName: string
    planCode: string
    status: string
    startDate?: string
    endDate?: string
    metadata?: Record<string, any>
  }
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { mvpUserId, masterUserId, operation, subscriptionData }: SyncRequest = await req.json()

    // 1. Get or create account sync record
    let accountSync = await supabaseClient
      .from('account_sync')
      .select('*')
      .eq('mvp_user_id', mvpUserId)
      .single()

    if (!accountSync.data) {
      // Get user email from auth
      const { data: authData } = await supabaseClient.auth.admin.getUserById(mvpUserId)
      
      const { data: newSync, error: createError } = await supabaseClient
        .from('account_sync')
        .insert({
          mvp_user_id: mvpUserId,
          mvp_email: authData?.user?.email,
          master_user_id: masterUserId,
          sync_status: 'pending'
        })
        .select()
        .single()

      if (createError) throw createError
      accountSync = { data: newSync }
    }

    // 2. Get service plan mapping
    const { data: mapping } = await supabaseClient
      .from('service_plan_mapping')
      .select('*')
      .eq('mvp_service_name', subscriptionData.serviceName)
      .eq('mvp_plan_code', subscriptionData.planCode)
      .single()

    if (!mapping) {
      throw new Error(`No mapping found for ${subscriptionData.serviceName} - ${subscriptionData.planCode}`)
    }

    // 3. Sync to Master system (placeholder for actual API call)
    const masterSyncResult = await syncToMasterSystem({
      masterUserId: accountSync.data.master_user_id,
      serviceId: mapping.master_service_id,
      planTier: mapping.master_plan_tier,
      operation,
      subscriptionData
    })

    // 4. Update account sync status
    await supabaseClient
      .from('account_sync')
      .update({
        sync_status: masterSyncResult.success ? 'synced' : 'failed',
        last_sync_at: new Date().toISOString(),
        sync_error: masterSyncResult.error || null
      })
      .eq('id', accountSync.data.id)

    // 5. Log sync operation
    await supabaseClient
      .from('subscription_sync_log')
      .insert({
        account_sync_id: accountSync.data.id,
        mvp_user_id: mvpUserId,
        operation,
        source: 'mvp',
        status: masterSyncResult.success ? 'success' : 'failed',
        error_message: masterSyncResult.error,
        mvp_data: subscriptionData,
        master_data: masterSyncResult.data,
        processed_at: new Date().toISOString()
      })

    return new Response(
      JSON.stringify({
        success: masterSyncResult.success,
        syncId: accountSync.data.id,
        message: masterSyncResult.success 
          ? 'Subscription synced successfully'
          : `Sync failed: ${masterSyncResult.error}`
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: masterSyncResult.success ? 200 : 500
      }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      }
    )
  }
})

// Placeholder function - replace with actual Master system API integration
async function syncToMasterSystem(params: {
  masterUserId: string | null
  serviceId: string
  planTier: string
  operation: string
  subscriptionData: any
}): Promise<{ success: boolean; error?: string; data?: any }> {
  try {
    // TODO: Implement actual API call to Master system
    // const response = await fetch(MASTER_API_URL, {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${MASTER_API_KEY}`,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     userId: params.masterUserId,
    //     serviceId: params.serviceId,
    //     planTier: params.planTier,
    //     operation: params.operation,
    //     ...params.subscriptionData
    //   })
    // })
    
    // For now, return success (mock)
    console.log('Master sync params:', params)
    
    return {
      success: true,
      data: {
        masterSubscriptionId: 'mock-' + crypto.randomUUID(),
        syncedAt: new Date().toISOString()
      }
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
    }
  }
}
