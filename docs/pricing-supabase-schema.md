# Supabase Pricing Schema (updated SQL)

Use this SQL in the Supabase SQL editor. It creates/updates every table, trigger, and policy required for the pricing system, including automatic timestamp management.

```sql
-- 0. Required extension -----------------------------------------------------
create extension if not exists moddatetime schema extensions;

-- 1. Legacy pricing snapshot ------------------------------------------------
create table if not exists public.pricing_content (
  id bigint generated always as identity primary key,
  locale text not null unique,
  content jsonb not null,
  currency_pair text default 'MYR/USD',
  published boolean default true,
  created_at timestamptz default timezone('utc', now()),
  updated_at timestamptz default timezone('utc', now())
);

alter table public.pricing_content enable row level security;

drop policy if exists "Public pricing read" on public.pricing_content;
create policy "Public pricing read"
  on public.pricing_content for select
  to anon using (published is true);

drop policy if exists "Authenticated pricing manage" on public.pricing_content;
create policy "Authenticated pricing manage"
  on public.pricing_content for all
  to authenticated using (true) with check (true);

drop trigger if exists pricing_content_set_updated on public.pricing_content;
create trigger pricing_content_set_updated
  before update on public.pricing_content
  for each row executes procedure extensions.moddatetime('updated_at');

-- 2. Normalised metadata ----------------------------------------------------
create table if not exists public.pricing_metadata (
  locale text primary key,
  hero_title text,
  hero_subtitle text,
  hero_description text,
  cta_label text,
  cta_href text,
  currency_note text,
  currency_pair text default 'MYR/USD',
  default_currency text default 'MYR',
  notice_title text,
  add_ons_title text,
  fine_print_title text,
  created_at timestamptz default timezone('utc', now()),
  updated_at timestamptz default timezone('utc', now())
);

drop trigger if exists pricing_metadata_set_updated on public.pricing_metadata;
create trigger pricing_metadata_set_updated
  before update on public.pricing_metadata
  for each row executes procedure extensions.moddatetime('updated_at');

-- 3. Sections & items -------------------------------------------------------
create table if not exists public.pricing_sections (
  id bigint generated always as identity primary key,
  locale text not null,
  key text,
  title text not null,
  subtitle text,
  description text,
  order_index integer default 0,
  created_at timestamptz default timezone('utc', now()),
  updated_at timestamptz default timezone('utc', now()),
  constraint pricing_sections_locale_key unique (locale, key)
);

drop trigger if exists pricing_sections_set_updated on public.pricing_sections;
create trigger pricing_sections_set_updated
  before update on public.pricing_sections
  for each row executes procedure extensions.moddatetime('updated_at');

create table if not exists public.pricing_items (
  id bigint generated always as identity primary key,
  locale text not null,
  section_id bigint not null references public.pricing_sections(id) on delete cascade,
  name text not null,
  price_myr text,
  price_usd text,
  cadence_myr text,
  cadence_usd text,
  href text,
  features text[] default '{}'::text[],
  order_index integer default 0,
  created_at timestamptz default timezone('utc', now()),
  updated_at timestamptz default timezone('utc', now())
);

drop trigger if exists pricing_items_set_updated on public.pricing_items;
create trigger pricing_items_set_updated
  before update on public.pricing_items
  for each row executes procedure extensions.moddatetime('updated_at');

-- 4. Add-ons, notice points, fine print ------------------------------------
create table if not exists public.pricing_addons (
  id bigint generated always as identity primary key,
  locale text not null,
  name text not null,
  price_myr text,
  price_usd text,
  features text[] default '{}'::text[],
  order_index integer default 0,
  created_at timestamptz default timezone('utc', now()),
  updated_at timestamptz default timezone('utc', now())
);

drop trigger if exists pricing_addons_set_updated on public.pricing_addons;
create trigger pricing_addons_set_updated
  before update on public.pricing_addons
  for each row executes procedure extensions.moddatetime('updated_at');

create table if not exists public.pricing_notice_points (
  id bigint generated always as identity primary key,
  locale text not null,
  body text not null,
  order_index integer default 0,
  created_at timestamptz default timezone('utc', now()),
  updated_at timestamptz default timezone('utc', now())
);

drop trigger if exists pricing_notice_points_set_updated on public.pricing_notice_points;
create trigger pricing_notice_points_set_updated
  before update on public.pricing_notice_points
  for each row executes procedure extensions.moddatetime('updated_at');

create table if not exists public.pricing_fine_print (
  id bigint generated always as identity primary key,
  locale text not null,
  body text not null,
  order_index integer default 0,
  created_at timestamptz default timezone('utc', now()),
  updated_at timestamptz default timezone('utc', now())
);

drop trigger if exists pricing_fine_print_set_updated on public.pricing_fine_print;
create trigger pricing_fine_print_set_updated
  before update on public.pricing_fine_print
  for each row executes procedure extensions.moddatetime('updated_at');

-- 5. Currency rates ---------------------------------------------------------
create table if not exists public.currency_rates (
  id bigint generated always as identity primary key,
  pair text not null,
  rate numeric,
  captured_at timestamptz not null default timezone('utc', now()),
  source text,
  created_at timestamptz default timezone('utc', now()),
  updated_at timestamptz default timezone('utc', now()),
  unique (pair, captured_at::date)
);

drop trigger if exists currency_rates_set_updated on public.currency_rates;
create trigger currency_rates_set_updated
  before update on public.currency_rates
  for each row executes procedure extensions.moddatetime('updated_at');

-- 6. RLS + policies ---------------------------------------------------------
alter table public.pricing_metadata enable row level security;
alter table public.pricing_sections enable row level security;
alter table public.pricing_items enable row level security;
alter table public.pricing_addons enable row level security;
alter table public.pricing_notice_points enable row level security;
alter table public.pricing_fine_print enable row level security;
alter table public.currency_rates enable row level security;

drop policy if exists "Public pricing metadata read" on public.pricing_metadata;
create policy "Public pricing metadata read"
  on public.pricing_metadata for select to anon using (true);

drop policy if exists "Public pricing sections read" on public.pricing_sections;
create policy "Public pricing sections read"
  on public.pricing_sections for select to anon using (true);

drop policy if exists "Public pricing items read" on public.pricing_items;
create policy "Public pricing items read"
  on public.pricing_items for select to anon using (true);

drop policy if exists "Public pricing add ons read" on public.pricing_addons;
create policy "Public pricing add ons read"
  on public.pricing_addons for select to anon using (true);

drop policy if exists "Public pricing notice read" on public.pricing_notice_points;
create policy "Public pricing notice read"
  on public.pricing_notice_points for select to anon using (true);

drop policy if exists "Public pricing fine print read" on public.pricing_fine_print;
create policy "Public pricing fine print read"
  on public.pricing_fine_print for select to anon using (true);

drop policy if exists "Public currency rates read" on public.currency_rates;
create policy "Public currency rates read"
  on public.currency_rates for select to anon using (true);

drop policy if exists "Pricing metadata manage" on public.pricing_metadata;
create policy "Pricing metadata manage"
  on public.pricing_metadata for all to authenticated using (true) with check (true);

drop policy if exists "Pricing sections manage" on public.pricing_sections;
create policy "Pricing sections manage"
  on public.pricing_sections for all to authenticated using (true) with check (true);

drop policy if exists "Pricing items manage" on public.pricing_items;
create policy "Pricing items manage"
  on public.pricing_items for all to authenticated using (true) with check (true);

drop policy if exists "Pricing add ons manage" on public.pricing_addons;
create policy "Pricing add ons manage"
  on public.pricing_addons for all to authenticated using (true) with check (true);

drop policy if exists "Pricing notice manage" on public.pricing_notice_points;
create policy "Pricing notice manage"
  on public.pricing_notice_points for all to authenticated using (true) with check (true);

drop policy if exists "Pricing fine print manage" on public.pricing_fine_print;
create policy "Pricing fine print manage"
  on public.pricing_fine_print for all to authenticated using (true) with check (true);

drop policy if exists "Currency rates manage" on public.currency_rates;
create policy "Currency rates manage"
  on public.currency_rates for all to authenticated using (true) with check (true);
```

---

## After Running the SQL
1. Re-run the seed script to populate every table:
   ```bash
   node scripts/seed-pricing.mjs
   ```
2. Confirm data in Supabase Studio:
   - `pricing_metadata` holds the hero copy and default currency.
   - `pricing_sections` + `pricing_items` cover Celestial, Imperial, 360 Holistic, Enterprise, Academy entries.
   - `pricing_addons`, `pricing_notice_points`, `pricing_fine_print` mirror the supplementary lists.
   - `currency_rates` will store any manually inserted USD/MYR rates (optional now, future automation later).
3. The `/pricing` page now reads from these normalised tables (with fallback to `pricing_content` and, finally, the bundled dictionary).

### Updating currency rates
Grab the latest USD/MYR (or any pair) and store it in `currency_rates`:

```bash
node scripts/pull-exchange-rate.mjs USD/MYR
```

- Defaults to `USD/MYR` if no argument is provided.
- Fetches from `https://open.er-api.com` and either inserts or refreshes today’s entry.
- Requires the `currency_rates` table (created by the SQL above) and the same Supabase `.env.local` credentials used by the other scripts.
