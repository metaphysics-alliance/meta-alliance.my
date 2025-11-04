# update-pricing-usd

Edge Function that recalculates `price_usd` for every row in `public.service_pricing` by pulling the latest MYR→USD rate and multiplying each `price_myr` value.

## Prerequisites

1. `public.service_pricing` table (see SQL shared earlier).
2. Postgres helper function:

```sql
create or replace function public.update_service_pricing_usd(conversion_rate numeric)
returns void
language sql
security definer
as $$
  update public.service_pricing
  set price_usd = round(price_myr * conversion_rate, 2),
      updated_at = timezone('utc', now());
$$;

grant execute on function public.update_service_pricing_usd(numeric) to authenticated, service_role, anon;
```

3. Environment variables for the function (use the dashboard or `.env`):

```
SUPABASE_URL=...
SERVICE_ROLE_KEY=...
```

## Deploy & schedule

```bash
supabase functions deploy update-pricing-usd --no-verify-jwt
supabase functions schedule create update-pricing-usd --cron \"0 0 * * *\"
```

Modify the cron as needed. The function logs errors via `console.error` and returns the captured FX rate for observability.
