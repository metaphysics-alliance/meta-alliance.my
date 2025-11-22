# Agent Autopilot Guide

Each autonomous agent ships with a dedicated command and environment so you can let it run without manual intervention. The same scripts are used locally (via process managers) and in CI (via `.github/workflows/agents-autopilot.yml`), so the autopilot behavior stays consistent across both environments.

## 1. Translator

- **Core command**: `npm run translator:autopilot` (long-running watcher).
- **Check command**: `npm run translator:autopilot:check` (scans once and exits; used by CI/workflows).
- **Local launch (pm2)**:
  ```bash
  pm2 start npm --name translator-autopilot -- run translator:autopilot \
    --env production \
    --watch
  ```
  *Use `pm2 save` to persist across reboots; `pm2 monit` to ensure the process stays healthy.*
- **Local systemd unit** (`/etc/systemd/system/translator-autopilot.service`):
  ```ini
  [Unit]
  Description=Translator Autopilot
  After=network-online.target

  [Service]
  Type=simple
  WorkingDirectory=/path/to/master-meta-alliance
  ExecStart=/usr/bin/npm run translator:autopilot
  Restart=on-failure
  Environment=NODE_ENV=production
  Environment=PATH=/usr/bin:/usr/local/bin
  User=your-user

  [Install]
  WantedBy=multi-user.target
  ```
  Then: `sudo systemctl daemon-reload && sudo systemctl enable --now translator-autopilot.service`.

## 2. TongShu Cache (Master + DB Admin)

- **Command**: `npm run tongshu:cache` (caches the current KL day into Supabase).
- **GitHub Actions**: `.github/workflows/agents-autopilot.yml` already runs this once per day (plus the translator check) and on every push.
- **Local launch (pm2)**:
  ```bash
  pm2 start npm --name tongshu-cache -- run tongshu:cache --deploy --watch
  ```
  Use a cron or `watch` command if you prefer hourly cadence.
- **Local systemd unit** (`/etc/systemd/system/tongshu-cache.service`):
  ```ini
  [Unit]
  Description=TongShu Cache Cron
  After=network-online.target

  [Service]
  Type=oneshot
  WorkingDirectory=/path/to/master-meta-alliance
  ExecStart=/usr/bin/npm run tongshu:cache
  Environment=VITE_SUPABASE_URL=…
  Environment=VITE_SUPABASE_SERVICE_ROLE_KEY=…
  Environment=VITE_SUPABASE_PASSWORD=…
  Environment=SUPABASE_DB_URL=…

  [Install]
  WantedBy=multi-user.target
  ```
  Trigger via `0 0,6,12,18 * * * /usr/bin/systemctl start tongshu-cache.service` in `crontab`.

## 3. TongShu Translator (Localization Autopilot)

- **Command**: `npm run tongshu:translator` (subscribes to Supabase and re-runs `resolveTongShuSnapshot` for every insert/update so all copies stay bilingual).
- **Check command**: `npm run tongshu:translator:check` (walks existing rows and upserts translations once; used in CI).
- **Local launch (pm2)**:
  ```bash
  pm2 start npm --name tongshu-translator -- run tongshu:translator \
    --env production
  ```
- **Local systemd unit** (`/etc/systemd/system/tongshu-translator.service`):
  ```ini
  [Unit]
  Description=TongShu Translator
  After=network-online.target

  [Service]
  WorkingDirectory=/path/to/master-meta-alliance
  ExecStart=/usr/bin/npm run tongshu:translator
  Restart=always
  Environment=NODE_ENV=production
  Environment=VITE_SUPABASE_URL=…
  Environment=VITE_SUPABASE_SERVICE_ROLE_KEY=…
  Environment=VITE_SUPABASE_PASSWORD=…
  Environment=SUPABASE_DB_URL=…

  [Install]
  WantedBy=multi-user.target
  ```
- **Notes**:
  * The translator job runs before the autocompletion on `/default` or `/form`, so every TongShu packet always exposes both `en` and `cn` fields.
  * The CI workflow fires `tongshu:translator:check` after caching so any manual Master push gets translated before it hits production.
  * The simplified autopilot entry point is `npm run autopilot:start`. It launches the translator watcher plus the TongShu/master translators in one shell. When you want to verify the entire cycle (cache → translator → health), run `npm run autopilot:check` instead: it sequentially executes the cache, translator checks, master translator check, and health validation from start to finish.
  * `npm run autopilot:start` also runs the Supabase migration (`npm run migrate:supabase`) before the agents start and schedules `npm run autopilot:health` every five minutes so the heartbeats stay fresh.

## 4. Master Feed Translator (Bazi / Zi Wei / Qi Men)

- **Command**: `npm run master:translator` (reprocesses configured tables and listens to Supabase realtime events to ensure every `_en`/`_cn` pair is filled in each row).
- **Check command**: `npm run master:translator --once` (walk the current tables and fill missing locale columns once; used by CI).
- **Configuration**: set `MASTER_TRANSLATOR_FEEDS='[{"table":"bazi_records","key":"id"},{"table":"ziwei_records","key":"id"},{"table":"qimen_records","key":"id"}]'` in `.env.local`/CI if your tables differ.
- **Local launch (pm2)**:
  ```bash
  pm2 start npm --name master-translator -- run master:translator
  ```
- **Local systemd unit** (`/etc/systemd/system/master-translator.service`):
  ```ini
  [Unit]
  Description=Master Feed Translator
  After=network-online.target

  [Service]
  WorkingDirectory=/path/to/master-meta-alliance
  ExecStart=/usr/bin/npm run master:translator
  Restart=always
  Environment=NODE_ENV=production
  Environment=VITE_SUPABASE_URL=…
  Environment=VITE_SUPABASE_SERVICE_ROLE_KEY=…
  Environment=VITE_SUPABASE_PASSWORD=…
  Environment=SUPABASE_DB_URL=…
  Environment=MASTER_TRANSLATOR_FEEDS='[{"table":"bazi_records","key":"id"}]'

  [Install]
  WantedBy=multi-user.target
  ```
- **Notes**:
  * This service uses `extractLocales` to detect any `_en`/`_cn` pairs and copies the existing value into the missing locale so the UI never sees a blank string.
  * The GitHub workflow runs the `--once` check before health validation, so the autopilot loop keeps up with Master’s Bazi/Zi Wei/Qi Men feeds as soon as they reach Supabase.

## 5. Autopilot Health Watcher

- **Command**: `npm run autopilot:health` (examines `scripts/health/*.json` heartbeats; fails if any service heartbeat is stale).
- **Local reuse**: Add a cron or PM2 timer that runs this script every 15 minutes to ensure the translator, TongShu translator, master translator, and TongShu cache stay healthy.
- **CI**: The Agents Autopilot workflow already runs this check after the translator jobs, so you'll get a failing job if any heartbeat file hasn’t been refreshed within its threshold (15–180 minutes, configurable in `scripts/autopilot-health.ts`).

## 3. Keeping Autopilot Healthy

1. `scripts/translator-autopilot.ts` writes alerts to `scripts/translator-alerts.log` whenever new keys appear; monitor that log (PM2 has built-in log rotation).
2. `.github/workflows/agents-autopilot.yml` ensures translators + TongShu stay synced whenever code hits `main`.
3. Extensions (Chartor, Workflow, Designer) can install similar patterns by creating npm scripts that call their autopilot helpers and adding matching workflow jobs/per your editing.
