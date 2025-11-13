-- ============================================================================
-- Meta Alliance: User Profiles & Subscriptions Schema
-- ============================================================================
-- Creates tables for OAuth-based authentication, detailed user profiles,
-- and recurring subscription management with payment tracking.
-- ============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================================
-- 1. USER PROFILES
-- ============================================================================
-- Extends Supabase auth.users with detailed profile information
-- Automatically created on first sign-up via trigger

create table if not exists public.user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  
  -- Basic Info (from OAuth or manual entry)
  full_name text,
  display_name text,
  email text unique not null,
  phone text,
  avatar_url text,
  
  -- Address Information
  address_line1 text,
  address_line2 text,
  city text,
  state_province text, -- For Malaysia: Johor, Selangor, etc.
  postcode text,
  country text default 'Malaysia',
  
  -- Preferences
  preferred_language text default 'EN', -- EN or CN
  preferred_currency text default 'MYR', -- MYR or USD
  timezone text default 'Asia/Kuala_Lumpur',
  
  -- Profile Status
  profile_completed boolean default false,
  onboarding_step integer default 0, -- Track multi-step onboarding
  
  -- Marketing
  marketing_consent boolean default false,
  newsletter_subscribed boolean default false,
  
  -- Metadata
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default timezone('utc', now()),
  updated_at timestamptz default timezone('utc', now())
);

-- Indexes
create index if not exists user_profiles_email_idx on public.user_profiles(email);
create index if not exists user_profiles_country_idx on public.user_profiles(country);

-- Auto-update timestamp trigger
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

drop trigger if exists user_profiles_updated_at on public.user_profiles;
create trigger user_profiles_updated_at
  before update on public.user_profiles
  for each row execute function public.update_updated_at();

-- ============================================================================
-- 2. SUBSCRIPTIONS
-- ============================================================================
-- Tracks active/paused/cancelled service subscriptions

create table if not exists public.subscriptions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.user_profiles(id) on delete cascade,
  
  -- Service Details
  service_id text not null, -- References service_pricing.service_id
  service_name text not null,
  plan_tier text, -- 'essential', 'advanced', 'supreme', etc.
  
  -- Pricing
  price_myr numeric not null,
  price_usd numeric,
  billing_currency text default 'MYR',
  billing_cycle text default 'monthly', -- monthly, quarterly, annual, one-time
  
  -- Status
  status text default 'pending', -- pending, active, paused, cancelled, expired
  trial_ends_at timestamptz,
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancelled_at timestamptz,
  
  -- Payment Provider
  payment_provider text, -- stripe, fpx, tng
  provider_subscription_id text, -- External subscription ID from Stripe/etc
  
  -- Metadata
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default timezone('utc', now()),
  updated_at timestamptz default timezone('utc', now())
);

-- Indexes
create index if not exists subscriptions_user_id_idx on public.subscriptions(user_id);
create index if not exists subscriptions_status_idx on public.subscriptions(status);
create index if not exists subscriptions_provider_sub_idx on public.subscriptions(provider_subscription_id);

drop trigger if exists subscriptions_updated_at on public.subscriptions;
create trigger subscriptions_updated_at
  before update on public.subscriptions
  for each row execute function public.update_updated_at();

-- ============================================================================
-- 3. SUBSCRIPTION PAYMENTS
-- ============================================================================
-- Tracks individual payment transactions for subscriptions

create table if not exists public.subscription_payments (
  id uuid primary key default uuid_generate_v4(),
  subscription_id uuid not null references public.subscriptions(id) on delete cascade,
  user_id uuid not null references public.user_profiles(id) on delete cascade,
  
  -- Payment Details
  amount numeric not null,
  currency text not null,
  payment_provider text not null, -- stripe, fpx, tng
  provider_payment_id text, -- Transaction ID from provider
  payment_method text, -- card, fpx, ewallet
  
  -- Status
  status text default 'pending', -- pending, processing, succeeded, failed, refunded
  failure_reason text,
  
  -- Billing Period
  billing_period_start timestamptz,
  billing_period_end timestamptz,
  
  -- Receipt
  receipt_url text,
  invoice_url text,
  
  -- Metadata
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default timezone('utc', now()),
  updated_at timestamptz default timezone('utc', now())
);

-- Indexes
create index if not exists subscription_payments_subscription_idx on public.subscription_payments(subscription_id);
create index if not exists subscription_payments_user_idx on public.subscription_payments(user_id);
create index if not exists subscription_payments_status_idx on public.subscription_payments(status);
create index if not exists subscription_payments_provider_idx on public.subscription_payments(provider_payment_id);

drop trigger if exists subscription_payments_updated_at on public.subscription_payments;
create trigger subscription_payments_updated_at
  before update on public.subscription_payments
  for each row execute function public.update_updated_at();

-- ============================================================================
-- 4. AUTO-CREATE USER PROFILE ON SIGN UP
-- ============================================================================
-- Automatically create user_profiles entry when user signs up via Supabase Auth

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.user_profiles (id, email, full_name, avatar_url)
  values (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  return NEW;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================================
-- 5. ROW LEVEL SECURITY (RLS)
-- ============================================================================

alter table public.user_profiles enable row level security;
alter table public.subscriptions enable row level security;
alter table public.subscription_payments enable row level security;

-- User Profiles: Users can only read/update their own profile
drop policy if exists "Users can view own profile" on public.user_profiles;
create policy "Users can view own profile"
  on public.user_profiles for select
  to authenticated
  using (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.user_profiles;
create policy "Users can update own profile"
  on public.user_profiles for update
  to authenticated
  using (auth.uid() = id);

-- Subscriptions: Users can view their own subscriptions
drop policy if exists "Users can view own subscriptions" on public.subscriptions;
create policy "Users can view own subscriptions"
  on public.subscriptions for select
  to authenticated
  using (auth.uid() = user_id);

-- Subscription creation allowed for authenticated users
drop policy if exists "Users can create subscriptions" on public.subscriptions;
create policy "Users can create subscriptions"
  on public.subscriptions for insert
  to authenticated
  with check (auth.uid() = user_id);

-- Subscription Payments: Users can view their own payments
drop policy if exists "Users can view own payments" on public.subscription_payments;
create policy "Users can view own payments"
  on public.subscription_payments for select
  to authenticated
  using (auth.uid() = user_id);

-- Service role (backend) has full access
drop policy if exists "Service role full access profiles" on public.user_profiles;
create policy "Service role full access profiles"
  on public.user_profiles for all
  to service_role
  using (true)
  with check (true);

drop policy if exists "Service role full access subscriptions" on public.subscriptions;
create policy "Service role full access subscriptions"
  on public.subscriptions for all
  to service_role
  using (true)
  with check (true);

drop policy if exists "Service role full access payments" on public.subscription_payments;
create policy "Service role full access payments"
  on public.subscription_payments for all
  to service_role
  using (true)
  with check (true);

-- ============================================================================
-- 6. HELPER VIEWS
-- ============================================================================

-- Active subscriptions with user details
create or replace view public.active_subscriptions_view as
select
  s.id as subscription_id,
  s.user_id,
  u.email,
  u.full_name,
  u.phone,
  s.service_id,
  s.service_name,
  s.plan_tier,
  s.price_myr,
  s.billing_currency,
  s.billing_cycle,
  s.status,
  s.current_period_start,
  s.current_period_end,
  s.created_at
from public.subscriptions s
join public.user_profiles u on s.user_id = u.id
where s.status = 'active';

comment on view public.active_subscriptions_view is 'Quick view of active subscriptions with user contact info';

-- ============================================================================
-- 8. NEWSLETTER SUBSCRIPTIONS
-- ============================================================================
-- Tracks newsletter opt-ins from both guests and registered users

create table if not exists public.newsletter_subscriptions (
  id uuid primary key default uuid_generate_v4(),
  
  -- Subscriber Info
  email text unique not null,
  full_name text,
  user_id uuid references public.user_profiles(id) on delete set null,
  
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

drop trigger if exists newsletter_subscriptions_updated_at on public.newsletter_subscriptions;
create trigger newsletter_subscriptions_updated_at
  before update on public.newsletter_subscriptions
  for each row execute function public.update_updated_at();

-- RLS for newsletter subscriptions
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
  using (auth.uid() = user_id or email = (select email from public.user_profiles where id = auth.uid()));

-- Users can update their own subscription (unsubscribe)
drop policy if exists "Users can update own newsletter subscription" on public.newsletter_subscriptions;
create policy "Users can update own newsletter subscription"
  on public.newsletter_subscriptions for update
  to authenticated
  using (auth.uid() = user_id or email = (select email from public.user_profiles where id = auth.uid()));

-- Service role full access
drop policy if exists "Service role full access newsletter" on public.newsletter_subscriptions;
create policy "Service role full access newsletter"
  on public.newsletter_subscriptions for all
  to service_role
  using (true)
  with check (true);

-- ============================================================================
-- 9. GUEST ORDERS (Before Payment/Account Creation)
-- ============================================================================
-- Stores guest checkout data before account is created via magic link

create table if not exists public.guest_orders (
  id uuid primary key default uuid_generate_v4(),
  
  -- Guest Contact Info
  guest_email text not null,
  guest_name text,
  guest_phone text,
  
  -- Billing Address
  address_line1 text,
  address_line2 text,
  city text,
  state_province text,
  postcode text,
  country text default 'Malaysia',
  
  -- Cart & Pricing
  cart_items jsonb not null, -- Array of selected services with prices
  total_myr numeric,
  total_usd numeric,
  currency text default 'MYR',
  
  -- Payment
  payment_method text, -- stripe, fpx, tng
  payment_status text default 'pending', -- pending, processing, succeeded, failed
  payment_provider_id text, -- Stripe payment intent ID, etc.
  
  -- Magic Link for Account Creation
  magic_link_token text unique,
  magic_link_sent_at timestamptz,
  magic_link_clicked_at timestamptz,
  account_created boolean default false,
  user_id uuid references public.user_profiles(id) on delete set null,
  
  -- Marketing
  newsletter_opt_in boolean default false,
  
  -- Metadata
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default timezone('utc', now()),
  updated_at timestamptz default timezone('utc', now())
);

-- Indexes
create index if not exists guest_orders_email_idx on public.guest_orders(guest_email);
create index if not exists guest_orders_status_idx on public.guest_orders(payment_status);
create index if not exists guest_orders_token_idx on public.guest_orders(magic_link_token);

drop trigger if exists guest_orders_updated_at on public.guest_orders;
create trigger guest_orders_updated_at
  before update on public.guest_orders
  for each row execute function public.update_updated_at();

-- RLS for guest orders
alter table public.guest_orders enable row level security;

-- Service role only (backend handles guest orders)
drop policy if exists "Service role full access guest orders" on public.guest_orders;
create policy "Service role full access guest orders"
  on public.guest_orders for all
  to service_role
  using (true)
  with check (true);

-- ============================================================================
-- 10. GRANTS (Updated)
-- ============================================================================

grant usage on schema public to anon, authenticated;
grant all on all tables in schema public to service_role;
grant select, insert, update on public.user_profiles to authenticated;
grant select, insert on public.subscriptions to authenticated;
grant select on public.subscription_payments to authenticated;
grant select on public.active_subscriptions_view to authenticated;
grant insert on public.newsletter_subscriptions to anon, authenticated;
grant select, update on public.newsletter_subscriptions to authenticated;

-- ============================================================================
-- 11. CONTACT ENQUIRIES
-- ============================================================================
-- Stores all contact form submissions from website

create table if not exists public.contact_enquiries (
  id uuid primary key default uuid_generate_v4(),
  
  -- Case Tracking
  case_id text unique not null, -- MA-{timestamp}-{random}
  status text default 'new', -- new, in_progress, replied, resolved, closed
  assigned_to text, -- Staff member handling the enquiry
  
  -- Contact Information
  full_name text not null,
  email text not null,
  phone_code text,
  phone text,
  company_role text,
  
  -- Location
  country text default 'MY',
  malaysia_state text,
  
  -- Enquiry Details
  topic text not null, -- Sales, Partnership, Media, Service name, etc.
  budget text,
  timeline text, -- Immediate, This month, This quarter, etc.
  message text not null,
  
  -- Privacy & Consent
  consent_given boolean default true,
  
  -- Marketing (if they want to subscribe)
  newsletter_opt_in boolean default false,
  
  -- Anti-spam
  recaptcha_token text,
  turnstile_token text,
  ip_address inet,
  user_agent text,
  
  -- Language & Source
  preferred_language text default 'EN',
  source_url text, -- Which page they submitted from
  utm_source text,
  utm_medium text,
  utm_campaign text,
  
  -- Response Tracking
  first_response_at timestamptz,
  last_response_at timestamptz,
  response_count integer default 0,
  
  -- Internal Notes
  internal_notes text,
  priority text default 'normal', -- low, normal, high, urgent
  
  -- Metadata
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default timezone('utc', now()),
  updated_at timestamptz default timezone('utc', now())
);

-- Indexes
create index if not exists contact_enquiries_case_id_idx on public.contact_enquiries(case_id);
create index if not exists contact_enquiries_email_idx on public.contact_enquiries(email);
create index if not exists contact_enquiries_status_idx on public.contact_enquiries(status);
create index if not exists contact_enquiries_topic_idx on public.contact_enquiries(topic);
create index if not exists contact_enquiries_created_idx on public.contact_enquiries(created_at desc);

drop trigger if exists contact_enquiries_updated_at on public.contact_enquiries;
create trigger contact_enquiries_updated_at
  before update on public.contact_enquiries
  for each row execute function public.update_updated_at();

-- RLS for contact enquiries
alter table public.contact_enquiries enable row level security;

-- Anyone can submit (for public contact form)
drop policy if exists "Anyone can submit enquiry" on public.contact_enquiries;
create policy "Anyone can submit enquiry"
  on public.contact_enquiries for insert
  to anon, authenticated
  with check (true);

-- Service role full access
drop policy if exists "Service role full access enquiries" on public.contact_enquiries;
create policy "Service role full access enquiries"
  on public.contact_enquiries for all
  to service_role
  using (true)
  with check (true);

-- Grant permissions
grant insert on public.contact_enquiries to anon, authenticated;

-- ============================================================================
-- 12. HELPER VIEWS FOR CONTACT ENQUIRIES
-- ============================================================================

-- Pending enquiries view
create or replace view public.pending_enquiries_view as
select
  id,
  case_id,
  status,
  full_name,
  email,
  phone,
  topic,
  timeline,
  priority,
  created_at,
  case
    when first_response_at is null then 
      extract(epoch from (now() - created_at)) / 3600
    else 0
  end as hours_waiting
from public.contact_enquiries
where status in ('new', 'in_progress')
order by 
  case priority
    when 'urgent' then 1
    when 'high' then 2
    when 'normal' then 3
    when 'low' then 4
    else 5
  end,
  created_at asc;

comment on view public.pending_enquiries_view is 'Active enquiries requiring attention, sorted by priority and age';

grant select on public.pending_enquiries_view to service_role;
