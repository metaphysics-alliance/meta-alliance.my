Cloudflare Worker — Contact Endpoint

Overview
- Verifies CAPTCHA (Turnstile or reCAPTCHA v3), applies KV-based rate-limiting, emails the team and auto-replies to the visitor via MailChannels.

Setup
1) Install Wrangler
   - npm i -g wrangler
   - or use: npx wrangler --version

2) Create KV Namespace (rate limit)
   - cd cloudflare/worker
   - wrangler kv:namespace create RATE_LIMIT
   - Copy the returned id and set it into wrangler.toml under [[kv_namespaces]].

3) Configure Secrets
   - wrangler secret put TURNSTILE_SECRET          # if using Turnstile
   - wrangler secret put RECAPTCHA_SECRET          # if using reCAPTCHA v3
   - wrangler secret put MAILCHANNELS_FROM_EMAIL   # e.g., no-reply@meta-alliance.my
   - wrangler secret put MAILCHANNELS_FROM_NAME    # e.g., Metaphysics Alliance
   - wrangler secret put SALES_EMAIL               # sales@meta-alliance.my
   - wrangler secret put SUPPORT_EMAIL             # support@meta-alliance.my
   - wrangler secret put MEDIA_EMAIL               # press@meta-alliance.my

4) Optional Vars (wrangler.toml [vars])
   - RATE_LIMIT_MAX     (default 5)
   - RATE_LIMIT_WINDOW  (default 300 seconds)

5) Deploy
   - wrangler deploy
   - Note output URL (e.g., https://<name>.<account>.workers.dev)

MailChannels Notes
- Ensure SPF/DMARC alignment for the From domain. Use a subdomain you control on Cloudflare and add MailChannels recommended DNS entries if prompted by their docs.

Frontend Integration
- Next.js env (.env.local):
  NEXT_PUBLIC_CONTACT_ENDPOINT=https://<your-worker>.workers.dev
  NEXT_PUBLIC_TURNSTILE_SITE_KEY=<site-key>        # if using Turnstile
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY=<site-key>        # if using reCAPTCHA
  NEXT_PUBLIC_EMAIL_SALES=sales@meta-alliance.my
  NEXT_PUBLIC_EMAIL_SUPPORT=support@meta-alliance.my
  NEXT_PUBLIC_EMAIL_MEDIA=press@meta-alliance.my
  NEXT_PUBLIC_PHONE=+60 16-587 3141
  NEXT_PUBLIC_WHATSAPP=6016-5873141

- Vite env (.env):
  VITE_CONTACT_ENDPOINT=https://<your-worker>.workers.dev
  VITE_TURNSTILE_SITE_KEY=<site-key>
  VITE_RECAPTCHA_SITE_KEY=<site-key>
  VITE_EMAIL_SALES=sales@meta-alliance.my
  VITE_EMAIL_SUPPORT=support@meta-alliance.my
  VITE_EMAIL_MEDIA=press@meta-alliance.my
  VITE_PHONE=+60 16-587 3141
  VITE_WHATSAPP=6016-5873141

