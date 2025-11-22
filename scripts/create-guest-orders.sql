-- Create guest_orders table (base schema)
CREATE TABLE IF NOT EXISTS public.guest_orders (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  guest_email text NOT NULL,
  guest_name text NOT NULL,
  guest_phone text,
  address_line1 text,
  address_line2 text,
  city text,
  state_province text,
  postcode text,
  country text DEFAULT 'Malaysia',
  cart_items jsonb NOT NULL,
  total_myr numeric,
  total_usd numeric,
  currency text DEFAULT 'MYR',
  payment_method text,
  newsletter_opt_in boolean DEFAULT false,
  magic_link_token text UNIQUE,
  magic_link_expires_at timestamptz,
  account_created boolean DEFAULT false,
  created_at timestamptz DEFAULT timezone('utc', now()),
  updated_at timestamptz DEFAULT timezone('utc', now())
);

-- Indexes
CREATE INDEX IF NOT EXISTS guest_orders_email_idx ON public.guest_orders(guest_email);
CREATE INDEX IF NOT EXISTS guest_orders_created_idx ON public.guest_orders(created_at);
CREATE INDEX IF NOT EXISTS guest_orders_magic_token_idx ON public.guest_orders(magic_link_token) WHERE magic_link_token IS NOT NULL;

-- RLS (disabled for guest checkout)
ALTER TABLE public.guest_orders DISABLE ROW LEVEL SECURITY;

-- Service role access
GRANT ALL ON public.guest_orders TO service_role;
GRANT SELECT, INSERT ON public.guest_orders TO anon;
