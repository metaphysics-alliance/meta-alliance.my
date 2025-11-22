-- ============================================================================
-- Guest Orders: Magic Link & Provider Columns
-- ============================================================================
-- Aligns existing public.guest_orders table with the application logic for:
-- - Storing payment provider reference (e.g. Stripe PaymentIntent ID)
-- - Tracking magic link send / click timestamps
-- - Linking guest orders to created user profiles
-- ============================================================================

ALTER TABLE public.guest_orders
  ADD COLUMN IF NOT EXISTS payment_provider_id text,
  ADD COLUMN IF NOT EXISTS magic_link_sent_at timestamptz,
  ADD COLUMN IF NOT EXISTS magic_link_clicked_at timestamptz,
  ADD COLUMN IF NOT EXISTS user_id uuid;

-- Helpful indexes (idempotent)
CREATE INDEX IF NOT EXISTS guest_orders_magic_token_idx
  ON public.guest_orders(magic_link_token)
  WHERE magic_link_token IS NOT NULL;

CREATE INDEX IF NOT EXISTS guest_orders_status_idx
  ON public.guest_orders(payment_status);
