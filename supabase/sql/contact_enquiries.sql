-- ============================================================================
-- Contact Enquiries Table
-- ============================================================================
-- Tracks contact form submissions with case tracking and response management

-- Create contact_enquiries table
CREATE TABLE IF NOT EXISTS public.contact_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Case Management
  case_id text UNIQUE NOT NULL,
  status text DEFAULT 'new', -- new, in_progress, responded, closed
  assigned_to uuid,
  
  -- Contact Information
  full_name text NOT NULL,
  email text NOT NULL,
  phone_code text,
  phone text,
  company_role text,
  
  -- Location
  country text,
  malaysia_state text,
  
  -- Inquiry Details
  topic text NOT NULL,
  budget text,
  timeline text,
  message text NOT NULL,
  
  -- Consent & Verification
  consent_given boolean NOT NULL DEFAULT true,
  recaptcha_token text,
  turnstile_token text,
  
  -- Metadata
  preferred_language text DEFAULT 'EN',
  source_url text,
  user_agent text,
  ip_address inet,
  
  -- Response Tracking
  first_response_at timestamptz,
  last_response_at timestamptz,
  response_count integer DEFAULT 0,
  
  -- Additional Data
  notes text,
  metadata jsonb DEFAULT '{}'::jsonb,
  
  -- Timestamps
  created_at timestamptz DEFAULT timezone('utc', now()),
  updated_at timestamptz DEFAULT timezone('utc', now())
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS contact_enquiries_case_id_idx ON public.contact_enquiries(case_id);
CREATE INDEX IF NOT EXISTS contact_enquiries_email_idx ON public.contact_enquiries(email);
CREATE INDEX IF NOT EXISTS contact_enquiries_status_idx ON public.contact_enquiries(status);
CREATE INDEX IF NOT EXISTS contact_enquiries_created_at_idx ON public.contact_enquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS contact_enquiries_topic_idx ON public.contact_enquiries(topic);

-- Auto-update timestamp trigger
CREATE OR REPLACE FUNCTION public.update_contact_enquiries_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  NEW.updated_at = timezone('utc', now());
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS contact_enquiries_updated_at ON public.contact_enquiries;
CREATE TRIGGER contact_enquiries_updated_at
  BEFORE UPDATE ON public.contact_enquiries
  FOR EACH ROW EXECUTE FUNCTION public.update_contact_enquiries_updated_at();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

ALTER TABLE public.contact_enquiries ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (for public contact forms)
DROP POLICY IF EXISTS "Anyone can submit contact enquiry" ON public.contact_enquiries;
CREATE POLICY "Anyone can submit contact enquiry"
  ON public.contact_enquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Users can view their own enquiries by email
DROP POLICY IF EXISTS "Users can view own enquiries" ON public.contact_enquiries;
CREATE POLICY "Users can view own enquiries"
  ON public.contact_enquiries FOR SELECT
  TO authenticated
  USING (
    email = (SELECT email FROM auth.users WHERE id = auth.uid())
    OR assigned_to = auth.uid()
  );

-- Service role full access (for admin panel)
DROP POLICY IF EXISTS "Service role full access contact" ON public.contact_enquiries;
CREATE POLICY "Service role full access contact"
  ON public.contact_enquiries FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================================================
-- GRANTS
-- ============================================================================

GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT INSERT ON public.contact_enquiries TO anon, authenticated;
GRANT SELECT ON public.contact_enquiries TO authenticated;
GRANT ALL ON public.contact_enquiries TO service_role;

-- ============================================================================
-- HELPER FUNCTIONS (Optional)
-- ============================================================================

-- Function to generate case ID (can be called from app or database)
CREATE OR REPLACE FUNCTION public.generate_case_id()
RETURNS text
LANGUAGE plpgsql
AS $$
DECLARE
  timestamp_part text;
  random_part text;
BEGIN
  timestamp_part := UPPER(TO_CHAR(EXTRACT(EPOCH FROM NOW())::bigint, 'FM00000000000000'));
  random_part := UPPER(SUBSTRING(MD5(RANDOM()::text) FROM 1 FOR 4));
  RETURN 'MA-' || timestamp_part || '-' || random_part;
END;
$$;

-- Test query (comment out after verifying)
-- SELECT COUNT(*) FROM public.contact_enquiries;
