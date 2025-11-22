-- ============================================================================
-- SUBSCRIPTION SYNC INFRASTRUCTURE
-- ============================================================================
-- Purpose: Enable bidirectional sync between MVP and Master Portal
-- Created: 2025-11-15
-- Owner: Brain + DB Admin
-- ============================================================================

-- ============================================================================
-- 1. ACCOUNT SYNC TRACKING TABLE
-- ============================================================================
-- Tracks the relationship between MVP and Master accounts

CREATE TABLE IF NOT EXISTS public.account_sync (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Identity mapping
  mvp_user_id uuid NOT NULL,
  master_user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  
  -- Sync status
  sync_status text NOT NULL DEFAULT 'pending',
  sync_method text NOT NULL,
  
  -- Magic link tracking
  magic_link_token text UNIQUE,
  magic_link_sent_at timestamptz,
  magic_link_clicked_at timestamptz,
  magic_link_expires_at timestamptz,
  
  -- Sync details
  first_synced_at timestamptz DEFAULT now(),
  last_synced_at timestamptz DEFAULT now(),
  sync_count integer DEFAULT 1,
  
  -- Error tracking
  last_error text,
  error_count integer DEFAULT 0,
  
  -- Metadata
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

COMMENT ON TABLE public.account_sync IS 'Tracks sync relationship between MVP and Master Portal accounts';
COMMENT ON COLUMN public.account_sync.sync_status IS 'pending, synced, error, expired';
COMMENT ON COLUMN public.account_sync.sync_method IS 'magic_link, oauth, manual';

-- Indexes
CREATE INDEX IF NOT EXISTS idx_account_sync_mvp_user ON public.account_sync(mvp_user_id);
CREATE INDEX IF NOT EXISTS idx_account_sync_master_user ON public.account_sync(master_user_id);
CREATE INDEX IF NOT EXISTS idx_account_sync_email ON public.account_sync(email);
CREATE INDEX IF NOT EXISTS idx_account_sync_status ON public.account_sync(sync_status);
CREATE INDEX IF NOT EXISTS idx_account_sync_token ON public.account_sync(magic_link_token) WHERE magic_link_token IS NOT NULL;

-- ============================================================================
-- 2. SUBSCRIPTION SYNC LOG
-- ============================================================================
-- Detailed log of all sync events for debugging and monitoring

CREATE TABLE IF NOT EXISTS public.subscription_sync_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Related entities
  account_sync_id uuid REFERENCES public.account_sync(id) ON DELETE CASCADE,
  mvp_subscription_id uuid,
  master_subscription_id uuid,
  
  -- Event details
  event_type text NOT NULL,
  event_status text NOT NULL DEFAULT 'started',
  
  -- Data synced
  sync_direction text NOT NULL,
  data_synced jsonb DEFAULT '{}'::jsonb,
  
  -- Timing
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  duration_ms integer,
  
  -- Error handling
  error_message text,
  error_stack text,
  retry_count integer DEFAULT 0,
  
  -- Metadata
  metadata jsonb DEFAULT '{}'::jsonb
);

COMMENT ON TABLE public.subscription_sync_log IS 'Audit log for all sync operations';
COMMENT ON COLUMN public.subscription_sync_log.event_type IS 'account_create, subscription_sync, payment_sync, profile_update, tool_access_grant';
COMMENT ON COLUMN public.subscription_sync_log.event_status IS 'started, completed, failed, retrying';
COMMENT ON COLUMN public.subscription_sync_log.sync_direction IS 'mvp_to_master, master_to_mvp, bidirectional';

-- Indexes
CREATE INDEX IF NOT EXISTS idx_sync_log_account ON public.subscription_sync_log(account_sync_id);
CREATE INDEX IF NOT EXISTS idx_sync_log_event_type ON public.subscription_sync_log(event_type);
CREATE INDEX IF NOT EXISTS idx_sync_log_status ON public.subscription_sync_log(event_status);
CREATE INDEX IF NOT EXISTS idx_sync_log_started_at ON public.subscription_sync_log(started_at DESC);

-- ============================================================================
-- 3. SERVICE TO PLAN MAPPING
-- ============================================================================
-- Maps MVP service IDs to Master plan tiers

CREATE TABLE IF NOT EXISTS public.service_plan_mapping (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- MVP service info
  mvp_service_id text NOT NULL UNIQUE,
  mvp_service_name text NOT NULL,
  
  -- Master plan info
  master_plan_code text NOT NULL,
  master_plan_id uuid REFERENCES public.subscription_plans(id),
  
  -- Mapping rules
  priority integer DEFAULT 0,
  is_active boolean DEFAULT true,
  
  -- Bundle rules (for multiple services)
  min_services_for_upgrade integer DEFAULT 1,
  upgrade_to_plan_code text,
  
  -- Metadata
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

COMMENT ON TABLE public.service_plan_mapping IS 'Maps MVP individual services to Master subscription plan tiers';
COMMENT ON COLUMN public.service_plan_mapping.priority IS 'Higher priority mappings take precedence when multiple match';

-- Indexes
CREATE INDEX IF NOT EXISTS idx_service_mapping_mvp ON public.service_plan_mapping(mvp_service_id);
CREATE INDEX IF NOT EXISTS idx_service_mapping_plan ON public.service_plan_mapping(master_plan_code);

-- ============================================================================
-- 4. SYNC STATUS VIEW
-- ============================================================================
-- Real-time view of sync health for monitoring

CREATE OR REPLACE VIEW public.sync_health_dashboard AS
SELECT 
  DATE_TRUNC('day', created_at) as sync_date,
  sync_status,
  COUNT(*) as account_count,
  AVG(sync_count) as avg_sync_count,
  AVG(error_count) as avg_error_count,
  MAX(last_synced_at) as last_sync_time
FROM public.account_sync
GROUP BY DATE_TRUNC('day', created_at), sync_status
ORDER BY sync_date DESC, sync_status;

COMMENT ON VIEW public.sync_health_dashboard IS 'Daily sync health metrics for monitoring';

-- ============================================================================
-- 5. HELPER FUNCTIONS
-- ============================================================================

-- Function: Generate magic link token
CREATE OR REPLACE FUNCTION public.generate_magic_link_token()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  token text;
BEGIN
  token := encode(gen_random_bytes(32), 'base64');
  token := replace(token, '/', '_');
  token := replace(token, '+', '-');
  token := replace(token, '=', '');
  RETURN token;
END;
$$;

COMMENT ON FUNCTION public.generate_magic_link_token IS 'Generates URL-safe random token for magic links';

-- Function: Validate magic link token
CREATE OR REPLACE FUNCTION public.validate_magic_link_token(token text)
RETURNS TABLE (
  valid boolean,
  account_sync_id uuid,
  mvp_user_id uuid,
  email text,
  expired boolean
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    CASE 
      WHEN a.magic_link_token IS NULL THEN false
      WHEN a.magic_link_expires_at < now() THEN false
      WHEN a.magic_link_clicked_at IS NOT NULL THEN false
      ELSE true
    END as valid,
    a.id as account_sync_id,
    a.mvp_user_id,
    a.email,
    CASE 
      WHEN a.magic_link_expires_at < now() THEN true
      ELSE false
    END as expired
  FROM public.account_sync a
  WHERE a.magic_link_token = token;
END;
$$;

COMMENT ON FUNCTION public.validate_magic_link_token IS 'Validates magic link token and returns account info';

-- Function: Mark magic link as used
CREATE OR REPLACE FUNCTION public.mark_magic_link_used(token text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.account_sync
  SET 
    magic_link_clicked_at = now(),
    sync_status = 'synced',
    last_synced_at = now(),
    updated_at = now()
  WHERE magic_link_token = token
    AND magic_link_clicked_at IS NULL
    AND magic_link_expires_at > now();
  
  RETURN FOUND;
END;
$$;

COMMENT ON FUNCTION public.mark_magic_link_used IS 'Marks magic link as clicked and updates sync status';

-- Function: Get service to plan mapping
CREATE OR REPLACE FUNCTION public.get_plan_for_services(service_ids text[])
RETURNS TABLE (
  plan_code text,
  plan_id uuid,
  plan_name text
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  service_count integer;
  highest_priority_mapping record;
BEGIN
  service_count := array_length(service_ids, 1);
  
  -- Check for bundle upgrade rules
  SELECT m.upgrade_to_plan_code INTO highest_priority_mapping
  FROM public.service_plan_mapping m
  WHERE m.mvp_service_id = ANY(service_ids)
    AND m.is_active = true
    AND service_count >= m.min_services_for_upgrade
    AND m.upgrade_to_plan_code IS NOT NULL
  ORDER BY m.priority DESC, m.min_services_for_upgrade DESC
  LIMIT 1;
  
  -- If bundle upgrade found, use it
  IF highest_priority_mapping.upgrade_to_plan_code IS NOT NULL THEN
    RETURN QUERY
    SELECT 
      sp.plan_code,
      sp.id,
      sp.plan_name_en
    FROM public.subscription_plans sp
    WHERE sp.plan_code = highest_priority_mapping.upgrade_to_plan_code;
    RETURN;
  END IF;
  
  -- Otherwise, get highest priority individual mapping
  RETURN QUERY
  SELECT 
    sp.plan_code,
    sp.id,
    sp.plan_name_en
  FROM public.service_plan_mapping m
  JOIN public.subscription_plans sp ON sp.id = m.master_plan_id
  WHERE m.mvp_service_id = ANY(service_ids)
    AND m.is_active = true
  ORDER BY m.priority DESC
  LIMIT 1;
END;
$$;

COMMENT ON FUNCTION public.get_plan_for_services IS 'Determines best Master plan based on purchased MVP services';

-- ============================================================================
-- 6. AUTO-UPDATE TRIGGERS
-- ============================================================================

-- Trigger function for updated_at
CREATE OR REPLACE FUNCTION public.update_sync_timestamp()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Apply to account_sync
DROP TRIGGER IF EXISTS account_sync_updated_at ON public.account_sync;
CREATE TRIGGER account_sync_updated_at
  BEFORE UPDATE ON public.account_sync
  FOR EACH ROW
  EXECUTE FUNCTION public.update_sync_timestamp();

-- Apply to service_plan_mapping
DROP TRIGGER IF EXISTS service_plan_mapping_updated_at ON public.service_plan_mapping;
CREATE TRIGGER service_plan_mapping_updated_at
  BEFORE UPDATE ON public.service_plan_mapping
  FOR EACH ROW
  EXECUTE FUNCTION public.update_sync_timestamp();

-- ============================================================================
-- 7. ROW LEVEL SECURITY
-- ============================================================================

-- Enable RLS
ALTER TABLE public.account_sync ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_sync_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_plan_mapping ENABLE ROW LEVEL SECURITY;

-- Policies for account_sync
CREATE POLICY "Users can view their own sync records"
  ON public.account_sync FOR SELECT
  TO authenticated
  USING (master_user_id = auth.uid());

CREATE POLICY "Service role has full access to account_sync"
  ON public.account_sync FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Policies for sync log
CREATE POLICY "Users can view their own sync logs"
  ON public.subscription_sync_log FOR SELECT
  TO authenticated
  USING (
    account_sync_id IN (
      SELECT id FROM public.account_sync WHERE master_user_id = auth.uid()
    )
  );

CREATE POLICY "Service role has full access to sync log"
  ON public.subscription_sync_log FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Policies for service mapping (read-only for all authenticated)
CREATE POLICY "All authenticated users can view service mappings"
  ON public.service_plan_mapping FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Service role has full access to service mappings"
  ON public.service_plan_mapping FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================
