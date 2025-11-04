-- Helper table to store the latest MYR_USD exchange rate.
create table if not exists public.service_pricing_rates (
  rate_key text primary key,
  rate numeric not null,
  captured_at timestamptz not null default timezone('utc', now()),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

comment on table public.service_pricing_rates is 'Stores latest FX rates used by service pricing triggers.';
comment on column public.service_pricing_rates.rate_key is 'Composite identifier, e.g. MYR_USD.';

-- Trigger function that multiplies price_myr using the stored FX rate.
create or replace function public.apply_service_pricing_rate()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  rate_record public.service_pricing_rates%rowtype;
begin
  select *
  into rate_record
  from public.service_pricing_rates
  where rate_key = 'MYR_USD'
  limit 1;

  if rate_record.rate is null then
    raise exception 'No MYR_USD rate found in service_pricing_rates. Unable to price.';
  end if;

  if NEW.price_myr is null then
    return NEW;
  end if;

  NEW.price_usd := round(NEW.price_myr * rate_record.rate, 2);
  NEW.updated_at := timezone('utc', now());
  return NEW;
end;
$$;

grant execute on function public.apply_service_pricing_rate() to authenticated, service_role;

-- Attach the trigger to price_myr updates/inserts.
drop trigger if exists service_pricing_apply_rate on public.service_pricing;
create trigger service_pricing_apply_rate
before insert or update of price_myr
on public.service_pricing
for each row
execute function public.apply_service_pricing_rate();
