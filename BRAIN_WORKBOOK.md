# BRAIN WORKBOOK – SYSTEM REASONING LEDGER

> Owner: **Brain (Supreme Agent)**
> Scope: **All agents, both repos (Tools + MVP)**
> Purpose: Single source of truth for system-wide reasoning, SDLC, and cross-agent workflows.

## 1. Activity Log (Reasoning Threads)
- Append entries for major decisions:
  - Date/Time (UTC)
  - Problem / Question
  - Inputs (files, tables, health logs, workbooks)
  - Options considered
  - Decision taken
  - Agents involved
  - Follow-ups

## 2. System Development Lifecycle (High-Level)
- Capture the canonical SDLC that all agents follow (mirrors/extends DB_ADMIN_WORKBOOK.md).

> Global rule (Brain memory):
> Any change to an agent’s charter, workbook, autopilot behavior, or triggers in **one** instance (Tools or MVP) must be mirrored in the **other** so both repos remain structurally identical. Differences must be explicitly documented as intentional, never accidental.

## 3. Agent Handoff Maps
- For each feature area (pricing, checkout, magic-link, tools access, TongShu), document:
  - Lead agent(s)
  - Supporting agents
  - Handoff order
  - Expected artefacts (migration, workbook section, UI spec, tests).

## 4. RAG Context Map
- Enumerate what Brain reads when answering:
  - Workbooks: `*_WORKBOOK.md`
  - Design docs: `Reference Docs/*`, `docs/*.md`
  - Health logs: `scripts/health/*.json`
  - Database schema snapshots

---

### MA-BRAIN-LEDGER-ENTRY-2025-11-21T00:00:00+08:00
**Stripe Sandbox Switch + MVP Payment/Magic-Link Refinement**

- **Date/Time (UTC+8)**: 2025-11-21T00:00:00+08:00
- **Problem / Question**:
  - MVP `/checkout/payment` and `/auth/magic/:token` flows were partially wired, but:
    - Pricing source of truth had legacy noise (`pricing_*` vs `service_pricing`.
    - Stripe integration was card-only and tied to an older test environment.
    - Magic link sometimes failed to resolve (`guest_orders` columns out-of-sync) or didn’t create subscriptions/payments consistently.
    - Cart badge remained non-zero after successful payments.
    - Workbooks and changelog weren’t updated for the new work, breaking the SDLC expectation.
- **Inputs**:
  - MVP repo files:
    - `src/pages/PaymentPage.jsx`, `src/components/StripePayment.jsx`
    - `app/api/create-payment-intent/route.ts`
    - `app/api/magic-link/resolve/route.ts`, `app/api/payments/mirror-from-order/route.ts`
    - `src/pages/MagicLinkHandler.jsx`, `src/pages/CheckoutSuccessPage.jsx`
    - `src/lib/emailService.js`, `app/api/send-email/route.ts`
  - Tools repo references:
    - `supabase/migrations/20251115_sync_infrastructure.sql`
    - `src/services/sync-service.ts`
  - Supabase schema (`guest_orders`, `user_subscriptions`, `payments`).
  - Stripe sandbox dashboard (new test project) + Stripe CLI output.
- **Options Considered**:
  1. Patch MVP only, leave Tools + sync infrastructure unused.
  2. Move magic-link handling fully to Tools and call back from MVP.
  3. Keep MVP’s magic-link handler but make it **Tools-aware** (Tools URL + payments mirror) and minimal, deferring heavier sync to existing Tools infra later.
- **Decision Taken**:
  - Chosen path: **Option 3** (minimal but correct integration):
    - Keep `MagicLinkHandler.jsx` in MVP as the entry point.
    - Resolve tokens server-side using service role (`/api/magic-link/resolve`).
    - Create auth user + `user_subscriptions` + `payments` mirror in Supabase.
    - Send a **Tools-branded welcome email** with login credentials and direct login URL.
    - Ensure magic link reuse shows a clean CTA to the Tools login.
    - Keep Tools-side sync infrastructure ready but not overcomplicate the current flow.
  - Document the work in `CHANGELOG.md` under `MA-PAYMENT-MAGICLINK-STRIPE-REFINE-2025-11-21...` so future sessions have a concrete resumption point.
- **Agents Involved**:
  - **Brain**: Chose the minimal coherent integration path and codified the SDLC rule: any agent/autopilot change must update its `*_WORKBOOK.md` + changelog in both repos.
  - **DB Admin**: Ensured `guest_orders` columns (`magic_link_token`, `account_created`, `payment_provider_id`) are consumed correctly and used for mirroring into `payments`.
  - **UI**: Fixed checkout UX copy, badge clearing, and magic-link/error states.
  - **Workflow**: Ensured the Stripe CLI + local webhook pattern is the canonical dev approach and documented it.
  - **QA**: Identified cart badge persistence as a regression and required a two-layer fix (payment success + success page).
- **Follow-ups**:
  - Implement a shared `agent-log` utility in both repos that allows ANY agent/autopilot script to append timestamped entries to:
    - `CHANGELOG.md`
    - The relevant `*_WORKBOOK.md`
  - Wire `agent-log` into:
    - Tools `scripts/autopilot-start.ts`, `scripts/db-admin-autopilot.ts`, and other agent-specific autopilot scripts.
    - MVP `scripts/autopilot-health.ts` (if present) and any Brain/Workflow health runners.
  - Enforce the rule: no autopilot/agent change is “done” until:
    - Work is logged in changelog + workbook.
    - Health record exists under `scripts/health/*.json` where applicable.
---

### Brain Log Entry - 2025-11-21T03:15:16+08:00
- **Scope**: MVP
- **Summary**: npm start: MVP dev bootstrap
- **Logged At**: 2025-11-21T03:15:16+08:00
---

### Brain Log Entry - 2025-11-21T03:21:19+08:00
- **Scope**: MVP
- **Summary**: npm start: MVP dev bootstrap
- **Logged At**: 2025-11-21T03:21:19+08:00
---

### Brain Log Entry - 2025-11-21T03:29:46+08:00
- **Scope**: MVP
- **Summary**: npm start: MVP dev bootstrap
- **Logged At**: 2025-11-21T03:29:46+08:00
---

### Brain Log Entry - 2025-11-21T04:14:18+08:00
- **Scope**: MVP
- **Summary**: Payment Page social identity CTA, Apple auth helper, and email flow review (order-resume, receipt, magic-link, welcome)
- **Logged At**: 2025-11-21T04:14:18+08:00
---

### Brain Log Entry - 2025-11-21T06:16:48+08:00
- **Scope**: MVP
- **Summary**: npm start: MVP dev bootstrap
- **Logged At**: 2025-11-21T06:16:48+08:00
---

### Brain Log Entry - 2025-11-21T07:16:01+08:00
- **Scope**: MVP
- **Summary**: npm start: MVP dev bootstrap
- **Logged At**: 2025-11-21T07:16:01+08:00
---

### Brain Log Entry - 2025-11-21T07:47:04+08:00
- **Scope**: MVP
- **Summary**: npm start: MVP dev bootstrap
- **Logged At**: 2025-11-21T07:47:04+08:00
---

### Brain Log Entry - 2025-11-21T08:25:53+08:00
- **Scope**: MVP
- **Summary**: npm start: MVP dev bootstrap
- **Logged At**: 2025-11-21T08:25:53+08:00
---

### Brain Log Entry - 2025-11-21T09:09:08+08:00
- **Scope**: MVP
- **Summary**: npm start: MVP dev bootstrap
- **Logged At**: 2025-11-21T09:09:08+08:00
---

### Brain Log Entry - 2025-11-21T11:18:36+08:00
- **Scope**: MVP
- **Summary**: npm start: MVP dev bootstrap
- **Logged At**: 2025-11-21T11:18:36+08:00
---

### Brain Log Entry - 2025-11-21T11:30:33+08:00
- **Scope**: MVP
- **Summary**: npm start: MVP dev bootstrap
- **Logged At**: 2025-11-21T11:30:33+08:00
---

### Brain Log Entry - 2025-11-21T11:40:20+08:00
- **Scope**: MVP
- **Summary**: npm start: MVP dev bootstrap
- **Logged At**: 2025-11-21T11:40:20+08:00
---

### Brain Log Entry - 2025-11-21T12:04:00+08:00
- **Scope**: MVP
- **Summary**: npm start: MVP dev bootstrap
- **Logged At**: 2025-11-21T12:04:00+08:00
---

### Brain Log Entry - 2025-11-21T12:17:19+08:00
- **Scope**: MVP
- **Summary**: npm start: MVP dev bootstrap
- **Logged At**: 2025-11-21T12:17:19+08:00
---

### Brain Log Entry - 2025-11-21T12:39:19+08:00
- **Scope**: MVP
- **Summary**: npm start: MVP dev bootstrap
- **Logged At**: 2025-11-21T12:39:19+08:00
---

### Brain Log Entry - 2025-11-21T18:38:40+08:00
- **Scope**: MVP
- **Summary**: npm start: MVP dev bootstrap
- **Logged At**: 2025-11-21T18:38:40+08:00
---

### Brain Log Entry - 2025-11-22T01:48:30+08:00
- **Scope**: MVP
- **Summary**: npm start: MVP dev bootstrap
- **Logged At**: 2025-11-22T01:48:30+08:00
---

### Brain Log Entry - 2025-11-22T12:09:09+08:00
- **Scope**: MVP
- **Summary**: npm start: MVP dev bootstrap
- **Logged At**: 2025-11-22T12:09:09+08:00
---

### Brain Log Entry - 2025-11-22T12:20:46+08:00
- **Scope**: MVP
- **Summary**: npm start: MVP dev bootstrap
- **Logged At**: 2025-11-22T12:20:46+08:00
---

### Brain Log Entry - 2025-11-22T12:24:04+08:00
- **Scope**: MVP
- **Summary**: npm start: MVP dev bootstrap
- **Logged At**: 2025-11-22T12:24:04+08:00
---

### Brain Log Entry - 2025-11-22T12:34:46+08:00
- **Scope**: MVP
- **Summary**: npm start: MVP dev bootstrap
- **Logged At**: 2025-11-22T12:34:46+08:00
---

### Brain Log Entry - 2025-11-24T15:32:20+08:00
- **Scope**: MVP
- **Summary**: npm start: MVP Marketing UI + autopilot bootstrap
- **Logged At**: 2025-11-24T15:32:20+08:00

