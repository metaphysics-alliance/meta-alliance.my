# Task Board — meta-alliance-mvp (Phase 1: Auth & Payments)

Status: [ ] Pending · [~] In progress · [x] Done · [!] Blocked

## Initial Status (P0 quick pass)
- Auth callback route: [x] Present (src/pages/AuthCallback.tsx, routes/pageConfig.jsx)
- Reset password page: [!] Missing (lib/auth.ts uses /auth/reset-password redirect)
- Env files present: [x] .env.local, .env.example
- Dev ports: [x] Next 3000, [x] Vite 5173 (no conflict with 4173 from other repo)
- Supabase env naming: [x] VITE_SUPABASE_URL/ANON_KEY (consistent with code)
- Stripe scripts present: [x] scripts/test-payment-flow.mjs (secrets needed)

Last updated: (fill when updating)

## 1) Auth Flows (Email + OAuth)
- Owners: Workflow, DevOps, UI, QA
- Acceptance:
  - [ ] Email sign‑up/verify completes and lands to app home
  - [ ] Password reset link updates password successfully
  - [ ] Google/Facebook providers enabled (or gated) and redirect correctly
- Validate:
  - Configure Supabase Auth URLs (local + prod), provider redirect to Supabase callback
  - Test email verification + reset, then social sign‑in flows
  - Add `/auth/reset-password` page to handle recovery tokens (type=recovery) and update password

## 2) Payments (Stripe Test)
- Owners: DB Admin, Architect, Codex, QA
- Acceptance:
  - [ ] Plan entries present and pricing page renders
  - [ ] Test checkout completes; DB rows `payments` and `user_subscriptions` correct
  - [ ] Webhook/verification path finalizes the subscription
- Validate:
  - Set Stripe secrets; run checkout; confirm DB state and UI acknowledgment

## 3) RLS & Security
- Owners: DB Admin, QA
- Acceptance:
  - [ ] Client can read pricing/catalog as intended
  - [ ] Service role can write billing rows; users can read their own data
- Validate:
  - Token‑based checks for client vs service role; no 401/403 under normal UI actions

## 4) Translation Coverage (If applicable)
- Owners: Translator, Contentor, QA
- Acceptance:
  - [ ] Detect → translate → upsert pipeline effective for new CN terms
  - [ ] UI renders EN after refresh for unknown terms
- Validate:
  - Run detect/full; verify DB rows; recheck UI

## 5) Health & Reporting
- Owners: Workflow, Brain, Codex
- Acceptance:
  - [ ] Autopilot/health checks pass for repo
  - [ ] Progress summary generated
- Validate:
  - Run health command(s) if present; record status

---

## Runbook (Local)
- Install deps: `npm ci`
- Start dev: `npm run dev` (check README for the right command)
- Health (if available): see `.github/workflows/agents-autopilot.yml`

## Supabase Auth URLs (recommended)
- Local: `http://localhost:<port>/auth/callback`, `http://localhost:<port>/auth/reset-password`
- Prod:  `https://<your-domain>/auth/callback`, `https://<your-domain>/auth/reset-password`

## Repo‑Specific Plan (ports, env, Stripe)
- Ports:
  - Next dev: 3000; Vite dev: 5173 (keep as-is to avoid conflict with 4173 used elsewhere)
  - Avoid running Vite preview (4173) concurrently with the other repo
- Env:
  - Use VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY / SUPABASE_SERVICE_ROLE_KEY specific to this project
  - Keep Stripe keys separate; set STRIPE_SECRET_KEY / STRIPE_WEBHOOK_SECRET for this repo’s flows
- Stripe:
  - Run test flow with `npm run payment:test` after setting secrets
  - Ensure webhook points to the correct edge or listener for this project only
