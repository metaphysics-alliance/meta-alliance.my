# sync-exchange-rate

Scheduled Supabase Edge Function that fetches the latest exchange rate for a given currency pair (default `USD/MYR`) and upserts it into `currency_rates`.

## Environment

Set secrets via Supabase CLI before deploying:
```bash
supabase secrets set --env-file supabase/functions/.env.sync-exchange-rate
```

`supabase/functions/.env.sync-exchange-rate` should contain:
```
SUPABASE_URL=https://<your-project>.supabase.co
SERVICE_ROLE_KEY=<service_role_key>
```

## Deployment

```bash
supabase functions deploy sync-exchange-rate
```

## Scheduling

In Supabase Studio → Edge Functions → Schedule, create a job that invokes this function daily (e.g. `0 0 * * *`). Optionally send JSON payload `{ "pair": "USD/MYR" }` or leave blank for the default.