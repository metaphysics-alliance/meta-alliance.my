-- ============================================================================
-- Newsletter Subscriptions Table
-- ============================================================================
-- Tracks newsletter opt-ins from casual visitors

-- Enable UUID extension if not already enabled
create extension if not exists "uuid-ossp";

-- Create newsletter_subscriptions table
create table if not exists public.newsletter_subscriptions (
  id uuid primary key default uuid_generate_v4(),
  
  -- Subscriber Info
  email text unique not null,
  full_name text,
  user_id uuid references auth.users(id) on delete set null,
  
  -- Subscription Details
  status text default 'active', -- active, unsubscribed, bounced
  source text, -- 'homepage', 'checkout', 'footer', 'popup'
  preferred_language text default 'EN',
  
  -- Tracking
  subscribed_at timestamptz default timezone('utc', now()),
  unsubscribed_at timestamptz,
  last_email_sent_at timestamptz,
  email_open_count integer default 0,
  email_click_count integer default 0,
  
  -- Privacy & Compliance
  ip_address inet,
  consent_given boolean default true,
  double_opt_in_confirmed boolean default false,
  confirmation_token text unique,
  
  -- Metadata
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default timezone('utc', now()),
  updated_at timestamptz default timezone('utc', now())
);

-- Indexes
create index if not exists newsletter_subscriptions_email_idx on public.newsletter_subscriptions(email);
create index if not exists newsletter_subscriptions_status_idx on public.newsletter_subscriptions(status);
create index if not exists newsletter_subscriptions_user_id_idx on public.newsletter_subscriptions(user_id);

-- Auto-update timestamp trigger function (create if not exists)
create or replace function public.update_updated_at()
returns trigger
language plpgsql
security definer
as $$
begin
  NEW.updated_at = timezone('utc', now());
  return NEW;
end;
$$;

-- Apply trigger
drop trigger if exists newsletter_subscriptions_updated_at on public.newsletter_subscriptions;
create trigger newsletter_subscriptions_updated_at
  before update on public.newsletter_subscriptions
  for each row execute function public.update_updated_at();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

alter table public.newsletter_subscriptions enable row level security;

-- Anyone can insert (for public signup forms)
drop policy if exists "Anyone can subscribe to newsletter" on public.newsletter_subscriptions;
create policy "Anyone can subscribe to newsletter"
  on public.newsletter_subscriptions for insert
  to anon, authenticated
  with check (true);

-- Users can view their own subscription
drop policy if exists "Users can view own newsletter subscription" on public.newsletter_subscriptions;
create policy "Users can view own newsletter subscription"
  on public.newsletter_subscriptions for select
  to authenticated
  using (auth.uid() = user_id or email = (select email from auth.users where id = auth.uid()));

-- Users can update their own subscription (unsubscribe)
drop policy if exists "Users can update own newsletter subscription" on public.newsletter_subscriptions;
create policy "Users can update own newsletter subscription"
  on public.newsletter_subscriptions for update
  to authenticated
  using (auth.uid() = user_id or email = (select email from auth.users where id = auth.uid()));

-- Service role full access
drop policy if exists "Service role full access newsletter" on public.newsletter_subscriptions;
create policy "Service role full access newsletter"
  on public.newsletter_subscriptions for all
  to service_role
  using (true)
  with check (true);

-- ============================================================================
-- GRANTS
-- ============================================================================

grant usage on schema public to anon, authenticated;
grant insert on public.newsletter_subscriptions to anon, authenticated;
grant select, update on public.newsletter_subscriptions to authenticated;
grant all on public.newsletter_subscriptions to service_role;

-- ============================================================================
-- TEST QUERY (Optional - comment out after verifying)
-- ============================================================================

-- You can run this to test the table was created:
-- SELECT COUNT(*) FROM public.newsletter_subscriptions;
