-- ================================================================
-- SUBSCRIPTION SYNC INFRASTRUCTURE
-- Purpose: Sync subscription states between MVP and Master systems
-- Created: 2025-11-15
-- ================================================================

-- ================================================================
-- TABLE: account_sync
-- Purpose: Track MVP ↔ Master account relationships and sync state
-- ================================================================
CREATE TABLE IF NOT EXISTS public.account_sync (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- MVP Side
  mvp_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  mvp_email TEXT NOT NULL,
  
  -- Master Side
  master_user_id UUID,
  master_email TEXT,
  
  -- Sync State
  sync_status TEXT NOT NULL DEFAULT 'pending' CHECK (sync_status IN ('pending', 'synced', 'failed', 'diverged')),
  last_sync_at TIMESTAMPTZ,
  sync_error TEXT,
  
  -- Magic Link for Account Linking
  magic_link_token TEXT UNIQUE,
  magic_link_expires_at TIMESTAMPTZ,
  magic_link_used BOOLEAN DEFAULT false,
  
  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  -- Constraints
  UNIQUE(mvp_user_id),
  UNIQUE(master_user_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_account_sync_mvp_user ON public.account_sync(mvp_user_id);
CREATE INDEX IF NOT EXISTS idx_account_sync_master_user ON public.account_sync(master_user_id);
CREATE INDEX IF NOT EXISTS idx_account_sync_status ON public.account_sync(sync_status);
CREATE INDEX IF NOT EXISTS idx_account_sync_token ON public.account_sync(magic_link_token) WHERE magic_link_token IS NOT NULL;

-- RLS Policies
ALTER TABLE public.account_sync ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own sync status"
  ON public.account_sync FOR SELECT
  USING (auth.uid() = mvp_user_id);

CREATE POLICY "Service role full access"
  ON public.account_sync FOR ALL
  USING (auth.jwt()->>'role' = 'service_role');

-- ================================================================
-- TABLE: subscription_sync_log
-- Purpose: Audit trail for all sync operations
-- ================================================================
CREATE TABLE IF NOT EXISTS public.subscription_sync_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- References
  account_sync_id UUID REFERENCES public.account_sync(id) ON DELETE CASCADE,
  mvp_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Operation Details
  operation TEXT NOT NULL CHECK (operation IN ('create', 'update', 'cancel', 'reactivate', 'sync')),
  source TEXT NOT NULL CHECK (source IN ('mvp', 'master')),
  
  -- Sync Details
  status TEXT NOT NULL CHECK (status IN ('success', 'failed', 'pending')),
  error_message TEXT,
  
  -- Data Snapshot
  mvp_data JSONB,
  master_data JSONB,
  
  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  processed_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_sync_log_account ON public.subscription_sync_log(account_sync_id);
CREATE INDEX IF NOT EXISTS idx_sync_log_user ON public.subscription_sync_log(mvp_user_id);
CREATE INDEX IF NOT EXISTS idx_sync_log_status ON public.subscription_sync_log(status);
CREATE INDEX IF NOT EXISTS idx_sync_log_created ON public.subscription_sync_log(created_at DESC);

-- RLS Policies
ALTER TABLE public.subscription_sync_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own sync logs"
  ON public.subscription_sync_log FOR SELECT
  USING (auth.uid() = mvp_user_id);

CREATE POLICY "Service role full access"
  ON public.subscription_sync_log FOR ALL
  USING (auth.jwt()->>'role' = 'service_role');

-- ================================================================
-- TABLE: service_plan_mapping
-- Purpose: Map MVP service plans to Master subscription tiers
-- ================================================================
CREATE TABLE IF NOT EXISTS public.service_plan_mapping (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- MVP Side
  mvp_service_name TEXT NOT NULL,
  mvp_plan_code TEXT NOT NULL,
  
  -- Master Side
  master_service_id TEXT NOT NULL,
  master_plan_tier TEXT NOT NULL,
  
  -- Pricing
  monthly_price_usd DECIMAL(10,2),
  annual_price_usd DECIMAL(10,2),
  
  -- Features Mapping
  features JSONB DEFAULT '[]'::jsonb,
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  
  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  -- Constraints
  UNIQUE(mvp_service_name, mvp_plan_code)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_service_mapping_mvp ON public.service_plan_mapping(mvp_service_name, mvp_plan_code);
CREATE INDEX IF NOT EXISTS idx_service_mapping_master ON public.service_plan_mapping(master_service_id, master_plan_tier);
CREATE INDEX IF NOT EXISTS idx_service_mapping_active ON public.service_plan_mapping(is_active) WHERE is_active = true;

-- RLS Policies
ALTER TABLE public.service_plan_mapping ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active mappings"
  ON public.service_plan_mapping FOR SELECT
  USING (is_active = true);

CREATE POLICY "Service role full access"
  ON public.service_plan_mapping FOR ALL
  USING (auth.jwt()->>'role' = 'service_role');

-- ================================================================
-- FUNCTION: generate_magic_link_token
-- Purpose: Create secure token for account linking
-- ================================================================
CREATE OR REPLACE FUNCTION public.generate_magic_link_token(
  p_mvp_user_id UUID,
  p_validity_hours INTEGER DEFAULT 24
)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_token TEXT;
BEGIN
  -- Generate cryptographically secure token
  v_token := encode(gen_random_bytes(32), 'base64');
  
  -- Store token with expiry
  UPDATE public.account_sync
  SET 
    magic_link_token = v_token,
    magic_link_expires_at = now() + (p_validity_hours || ' hours')::interval,
    magic_link_used = false,
    updated_at = now()
  WHERE mvp_user_id = p_mvp_user_id;
  
  RETURN v_token;
END;
$$;

-- ================================================================
-- FUNCTION: validate_magic_link_token
-- Purpose: Verify and consume magic link token
-- ================================================================
CREATE OR REPLACE FUNCTION public.validate_magic_link_token(
  p_token TEXT,
  p_master_user_id UUID,
  p_master_email TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_sync_record RECORD;
BEGIN
  -- Find and validate token
  SELECT *
  INTO v_sync_record
  FROM public.account_sync
  WHERE magic_link_token = p_token
    AND magic_link_used = false
    AND magic_link_expires_at > now();
  
  IF NOT FOUND THEN
    RETURN false;
  END IF;
  
  -- Link accounts
  UPDATE public.account_sync
  SET 
    master_user_id = p_master_user_id,
    master_email = p_master_email,
    sync_status = 'synced',
    last_sync_at = now(),
    magic_link_used = true,
    updated_at = now()
  WHERE id = v_sync_record.id;
  
  -- Log success
  INSERT INTO public.subscription_sync_log (
    account_sync_id,
    mvp_user_id,
    operation,
    source,
    status
  ) VALUES (
    v_sync_record.id,
    v_sync_record.mvp_user_id,
    'sync',
    'master',
    'success'
  );
  
  RETURN true;
END;
$$;

-- ================================================================
-- FUNCTION: update_account_sync_timestamp
-- Purpose: Auto-update updated_at on changes
-- ================================================================
CREATE OR REPLACE FUNCTION public.update_account_sync_timestamp()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER account_sync_update_timestamp
  BEFORE UPDATE ON public.account_sync
  FOR EACH ROW
  EXECUTE FUNCTION public.update_account_sync_timestamp();

CREATE TRIGGER service_plan_mapping_update_timestamp
  BEFORE UPDATE ON public.service_plan_mapping
  FOR EACH ROW
  EXECUTE FUNCTION public.update_account_sync_timestamp();

-- ================================================================
-- VIEW: sync_health_dashboard
-- Purpose: Monitor sync health across all accounts
-- ================================================================
CREATE OR REPLACE VIEW public.sync_health_dashboard AS
SELECT 
  sync_status,
  COUNT(*) as account_count,
  COUNT(*) FILTER (WHERE last_sync_at > now() - interval '24 hours') as synced_recently,
  COUNT(*) FILTER (WHERE sync_error IS NOT NULL) as error_count,
  AVG(EXTRACT(EPOCH FROM (now() - last_sync_at))) / 3600 as avg_hours_since_sync
FROM public.account_sync
GROUP BY sync_status;

-- Grant access to authenticated users
GRANT SELECT ON public.sync_health_dashboard TO authenticated;

-- ================================================================
-- SEED DATA: Default Service Plan Mappings
-- ================================================================
INSERT INTO public.service_plan_mapping 
  (mvp_service_name, mvp_plan_code, master_service_id, master_plan_tier, monthly_price_usd, annual_price_usd, features)
VALUES
  -- BaZi Consultation
  ('bazi-consultation', 'BASIC', 'bazi_service', 'basic', 88.00, 880.00, 
   '["60min consultation", "Written report", "Email support"]'::jsonb),
  ('bazi-consultation', 'PREMIUM', 'bazi_service', 'premium', 188.00, 1880.00, 
   '["90min consultation", "Detailed report", "Priority support", "Annual review"]'::jsonb),
  
  -- Feng Shui Assessment
  ('feng-shui', 'RESIDENTIAL', 'fengshui_service', 'residential', 388.00, 3880.00, 
   '["Home assessment", "Layout recommendations", "Element analysis"]'::jsonb),
  ('feng-shui', 'COMMERCIAL', 'fengshui_service', 'commercial', 888.00, 8880.00, 
   '["Office assessment", "Business optimization", "Quarterly reviews"]'::jsonb),
  
  -- Date Selection
  ('date-selection', 'STANDARD', 'dateselection_service', 'standard', 128.00, 1280.00, 
   '["Event date analysis", "3 date options", "Timing recommendations"]'::jsonb),
  ('date-selection', 'PREMIUM', 'dateselection_service', 'premium', 288.00, 2880.00, 
   '["Multiple events", "Unlimited options", "Priority processing"]'::jsonb)
ON CONFLICT (mvp_service_name, mvp_plan_code) DO NOTHING;

-- ================================================================
-- COMMENTS FOR DOCUMENTATION
-- ================================================================
COMMENT ON TABLE public.account_sync IS 'Tracks user account relationships between MVP and Master systems';
COMMENT ON TABLE public.subscription_sync_log IS 'Audit trail for all subscription sync operations';
COMMENT ON TABLE public.service_plan_mapping IS 'Maps MVP service plans to Master subscription tiers';
COMMENT ON FUNCTION public.generate_magic_link_token IS 'Creates secure token for linking MVP account to Master account';
COMMENT ON FUNCTION public.validate_magic_link_token IS 'Validates and consumes magic link token to complete account linking';

-- ================================================================
-- GRANT PERMISSIONS
-- ================================================================
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;
