# update-pricing-usd

Edge Function that recalculates `price_usd` for every row in `public.service_pricing` by pulling the latest MYR/USD rate and multiplying each numeric `price_myr` value. It also persists the FX rate to `public.service_pricing_rates` so database triggers keep future edits in sync automatically.

## Prerequisites

1. `public.service_pricing` table with at least:
   - `service_id` (primary key / unique identifier)
   - `service_name`
   - `price_myr` (numeric)
   - `price_usd` (numeric)
   - `updated_at` (timestamp)
2. Helper table + trigger (`supabase/sql/service_pricing_rates.sql`):
   - Stores the latest MYR/USD rate under the key `MYR_USD`
   - Adds a `BEFORE INSERT OR UPDATE OF price_myr` trigger that recalculates `price_usd`
3. Edge Function secrets (set via the Supabase dashboard or `supabase secrets set`):

```
SUPABASE_URL=...
SERVICE_ROLE_KEY=...
```

Use the Service Role key so the function can read/write the tables directly.

## Deploy & schedule

```bash
supabase functions deploy update-pricing-usd --no-verify-jwt
supabase functions schedule create update-pricing-usd --cron "0 0 * * *"
```

Modify the cron as needed. The function logs errors via `console.error` and returns the captured FX rate, timestamp, and number of rows updated for observability.

### Manual invocation

```bash
curl -X POST \
  -H "Authorization: Bearer $SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  https://$PROJECT_REF.functions.supabase.co/update-pricing-usd
```
