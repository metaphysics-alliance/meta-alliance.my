-- ============================================================================
-- Guest Orders: Payment Status Tracking Enhancement
-- ============================================================================
-- Adds payment tracking fields to distinguish between cancelled, abandoned,
-- and pay-later scenarios. Enables order resumption and recovery workflows.
-- ============================================================================

-- Add payment status tracking columns
ALTER TABLE public.guest_orders 
  ADD COLUMN IF NOT EXISTS payment_status text DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS payment_attempts integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_payment_attempt_at timestamptz,
  ADD COLUMN IF NOT EXISTS payment_failure_reason text,
  ADD COLUMN IF NOT EXISTS payment_session_id text,
  ADD COLUMN IF NOT EXISTS order_expires_at timestamptz DEFAULT (timezone('utc', now()) + interval '24 hours'),
  ADD COLUMN IF NOT EXISTS cancelled_at timestamptz,
  ADD COLUMN IF NOT EXISTS cancelled_reason text,
  ADD COLUMN IF NOT EXISTS resume_token text UNIQUE,
  ADD COLUMN IF NOT EXISTS resume_token_expires_at timestamptz;

-- Add comment explaining payment_status values
COMMENT ON COLUMN public.guest_orders.payment_status IS 
  'Payment status: pending (awaiting payment), processing (payment in progress), succeeded (payment confirmed), failed (payment declined), cancelled (user cancelled), abandoned (order expired without payment)';

-- Create indexes for order lookup and recovery
CREATE INDEX IF NOT EXISTS guest_orders_payment_status_idx 
  ON public.guest_orders(payment_status);

CREATE INDEX IF NOT EXISTS guest_orders_expires_idx 
  ON public.guest_orders(order_expires_at);

CREATE INDEX IF NOT EXISTS guest_orders_email_status_idx 
  ON public.guest_orders(guest_email, payment_status);

CREATE INDEX IF NOT EXISTS guest_orders_resume_token_idx 
  ON public.guest_orders(resume_token) 
  WHERE resume_token IS NOT NULL;

-- ============================================================================
-- Function: Generate Resume Token
-- ============================================================================
-- Creates a secure token that allows users to resume their order
-- Token format: UUID + timestamp for uniqueness

CREATE OR REPLACE FUNCTION public.generate_resume_token()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  token text;
BEGIN
  -- Generate UUID-based token
  token := encode(gen_random_bytes(32), 'hex');
  RETURN token;
END;
$$;

-- ============================================================================
-- Function: Mark Abandoned Orders
-- ============================================================================
-- Automatically marks orders as abandoned when they expire
-- Run this via cron job or scheduled task

CREATE OR REPLACE FUNCTION public.mark_abandoned_orders()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  updated_count integer;
BEGIN
  UPDATE public.guest_orders
  SET 
    payment_status = 'abandoned',
    updated_at = timezone('utc', now())
  WHERE 
    payment_status = 'pending'
    AND order_expires_at < timezone('utc', now())
    AND cancelled_at IS NULL;
  
  GET DIAGNOSTICS updated_count = ROW_COUNT;
  RETURN updated_count;
END;
$$;

-- ============================================================================
-- Function: Get Resumable Order
-- ============================================================================
-- Finds the most recent resumable order for a given email
-- Returns NULL if no valid order exists

CREATE OR REPLACE FUNCTION public.get_resumable_order(user_email text)
RETURNS TABLE (
  id uuid,
  guest_email text,
  guest_name text,
  cart_items jsonb,
  total_myr numeric,
  total_usd numeric,
  currency text,
  payment_method text,
  payment_status text,
  created_at timestamptz,
  order_expires_at timestamptz,
  resume_token text
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    o.id,
    o.guest_email,
    o.guest_name,
    o.cart_items,
    o.total_myr,
    o.total_usd,
    o.currency,
    o.payment_method,
    o.payment_status,
    o.created_at,
    o.order_expires_at,
    o.resume_token
  FROM public.guest_orders o
  WHERE 
    LOWER(o.guest_email) = LOWER(user_email)
    AND o.payment_status IN ('pending', 'failed')
    AND o.cancelled_at IS NULL
    AND (
      -- Either not expired, or expired within 30 days (recoverable)
      o.order_expires_at > timezone('utc', now())
      OR (o.order_expires_at > timezone('utc', now()) - interval '30 days')
    )
  ORDER BY o.created_at DESC
  LIMIT 1;
END;
$$;

-- ============================================================================
-- Function: Create Resume Token for Order
-- ============================================================================
-- Generates and saves a resume token for an order
-- Token expires in 7 days

CREATE OR REPLACE FUNCTION public.create_resume_token(order_id uuid)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_token text;
BEGIN
  -- Generate new token
  new_token := encode(gen_random_bytes(32), 'hex');
  
  -- Update order with token
  UPDATE public.guest_orders
  SET 
    resume_token = new_token,
    resume_token_expires_at = timezone('utc', now()) + interval '7 days',
    updated_at = timezone('utc', now())
  WHERE id = order_id;
  
  RETURN new_token;
END;
$$;

-- ============================================================================
-- Function: Validate Resume Token
-- ============================================================================
-- Checks if a resume token is valid and returns the order

CREATE OR REPLACE FUNCTION public.validate_resume_token(token text)
RETURNS TABLE (
  id uuid,
  guest_email text,
  guest_name text,
  guest_phone text,
  cart_items jsonb,
  total_myr numeric,
  total_usd numeric,
  currency text,
  payment_method text,
  payment_status text,
  created_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    o.id,
    o.guest_email,
    o.guest_name,
    o.guest_phone,
    o.cart_items,
    o.total_myr,
    o.total_usd,
    o.currency,
    o.payment_method,
    o.payment_status,
    o.created_at
  FROM public.guest_orders o
  WHERE 
    o.resume_token = token
    AND o.resume_token_expires_at > timezone('utc', now())
    AND o.payment_status IN ('pending', 'failed', 'abandoned')
    AND o.cancelled_at IS NULL;
END;
$$;

-- ============================================================================
-- RLS Policies for Resume Token Access
-- ============================================================================

-- Allow anonymous users to validate resume tokens
DROP POLICY IF EXISTS "Anyone can validate resume tokens" ON public.guest_orders;
CREATE POLICY "Anyone can validate resume tokens"
  ON public.guest_orders FOR SELECT
  TO anon, authenticated
  USING (
    resume_token IS NOT NULL 
    AND resume_token_expires_at > timezone('utc', now())
  );

-- ============================================================================
-- Comments for Documentation
-- ============================================================================

COMMENT ON FUNCTION public.generate_resume_token() IS 
  'Generates a secure 64-character hex token for order resumption';

COMMENT ON FUNCTION public.mark_abandoned_orders() IS 
  'Marks expired pending orders as abandoned. Run via cron every hour.';

COMMENT ON FUNCTION public.get_resumable_order(text) IS 
  'Returns the most recent resumable order for an email address. Includes orders expired within 30 days for recovery.';

COMMENT ON FUNCTION public.create_resume_token(uuid) IS 
  'Creates a resume token for an order. Token expires in 7 days.';

COMMENT ON FUNCTION public.validate_resume_token(text) IS 
  'Validates a resume token and returns order details if valid.';

-- ============================================================================
-- Usage Examples
-- ============================================================================
/*

-- 1. Check for resumable order when user returns
SELECT * FROM public.get_resumable_order('customer@example.com');

-- 2. Create resume token for recovery email
SELECT public.create_resume_token('order-uuid-here');

-- 3. Validate token from URL parameter
SELECT * FROM public.validate_resume_token('token-from-url');

-- 4. Mark abandoned orders (run via cron)
SELECT public.mark_abandoned_orders();

-- 5. Find all pending orders for an email
SELECT * FROM public.guest_orders 
WHERE guest_email = 'customer@example.com' 
  AND payment_status = 'pending'
ORDER BY created_at DESC;

*/
