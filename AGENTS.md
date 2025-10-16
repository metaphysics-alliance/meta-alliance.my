AGENTS.md — Build & Dev Rules

Purpose

- Capture the agreed rules for compiling builds and keeping Next (app/) and Vite (src/) in sync.

Build Priority & Ports

- Vite dev: 5173 (primary). Command: `vite --port 5173` (via `npm run dev`).
- Vite preview: 4173. Command: `vite preview --port 4173` (via `npm run preview`).
- Next dev: 3000. Command: `next dev -p 3000`.
- Do not change these ports unless explicitly requested.

Dual‑Stack Requirement (Next + Vite)

- All UI/component changes must be applied to BOTH stacks:
  - Next: files under `app/` (TypeScript/React, server components).
  - Vite: files under `src/` (React Router SPA).
- Example mapping (non‑exhaustive):
  - Roadmap component: `app/components/Roadmap.tsx` and `src/components/Roadmap.jsx`.
  - i18n dictionary: `shared/i18n/dictionary.js` (shared by both).

Assets Pipeline (Roadmap images)

- Always regenerate roadmap assets before dev/build:
  - Command: `npm run assets:roadmap`.
  - Script: `scripts/export-roadmap.mjs` (uses `sharp`).
  - Inputs: `public/images/roadmap-en.svg`, `public/images/roadmap-cn.svg`.
  - Outputs: `public/images/roadmap-en.png`, `public/images/roadmap-cn.png`.

Standard Commands

- Dev (runs both stacks concurrently): `npm run dev`.
- Next build (SSG + metadata): `npm run next:build`.
- Vite prod build (dist for gh‑pages): `npm run build`.
- Vite preview (serve built dist on 4173): `npm run preview`.

Deployment Notes

- GitHub Pages publishes from `dist/` on `gh-pages` branch via CI.
- Custom domain MUST be `meta-alliance.my` (no `www`).
  - Keep `CNAME` present with exactly `meta-alliance.my`.
  - CI workflow `deploy-gh-pages.yml` must set `cname: meta-alliance.my`.
- Do not remove or overwrite `CNAME` in builds/commits.

i18n & Content Rules

- All new content must support EN and CN where relevant.
- About milestones and timeline items should render consistently on both stacks.
- When adding visual affordances (e.g., icons), keep data under `shared/i18n/dictionary.js` or add non‑breaking post‑processing.

Commit & Work IDs

- Always include a Work ID at the end of user-visible updates and when describing change sets.
- Format (strict): `MA-{WORK-NAME}-{YYYY-MM-DDThh:mm:ss+08:00}`
  - Time must be ISO 8601 with timezone `+08:00`.
  - Replace `{WORK-NAME}` with a concise, kebab/upper-case name for the task.
  - Examples:
    - `MA-CONTACT-FORM-WORKFLOW-2025-10-15T15:43:00+08:00`
    - `MA-PAGE-BANNER-UPDATE-2025-10-15T16:05:00+08:00`
- Use concise conventional commits (feat/fix/chore/refactor/docs) with a short scope.

Verification Checklist (before push/PR)

- [ ] `npm run assets:roadmap` completes and PNGs are updated.
- [ ] `npm run next:build` completes without errors.
- [ ] `npm run build` (Vite) completes and emits `dist/`.
- [ ] Visual spot‑check About pages on:
  - [ ] Next dev at `http://localhost:3000/EN/about` and `/CN/about`.
  - [ ] Vite dev at `http://localhost:5173/#/about` (or the app’s route).
- [ ] If previewing built SPA, `npm run preview` on `http://localhost:4173/`.
- [ ] Ensure changes exist in both `app/` and `src/` where applicable.

Common Pitfalls

- Unescaped apostrophes in long strings in `shared/i18n/dictionary.js` can break Next builds. Prefer backticks for long literals when needed.
- Keep both Roadmap implementations aligned (props shape and optional `icon` support).

Work Log (for resume)

- MA-ABOUT-ROADMAP-MOBILE-UX-2025-10-16T21:15:00+08:00
- MA-ROADMAP-UX-UNIFY-ICONS-2025-10-16T21:22:00+08:00
- MA-ROADMAP-ICON-MAP-2025-10-16T21:26:00+08:00
- MA-AGENTSMD-WORK-LOG-INIT-2025-10-16T21:36:00+08:00
- MA-ABOUT-FOUNDERS-NOTE-SIGNATURE-2025-10-16T21:46:00+08:00
- MA-ABOUT-FOUNDERS-NOTE-SIGNATURE-RIGHT-2025-10-16T21:55:00+08:00
- MA-ABOUT-FOUNDERS-NOTE-SIGNATURE-INCREASE-30-2025-10-16T22:02:00+08:00
- MA-ABOUT-FOUNDERS-NOTE-SIGNATURE-ALIGN-LAST-PARAGRAPH-2025-10-16T22:12:00+08:00
- MA-ABOUT-FOUNDERS-NOTE-SIGNATURE-ALIGN-TITLE-RIGHT-2025-10-16T22:20:00+08:00
- MA-ABOUT-FOUNDERS-NOTE-SIGNATURE-BASELINE-ALIGN-2025-10-16T22:28:00+08:00
- MA-ABOUT-FOUNDERS-NOTE-SIGNATURE-TWEAK-ALIGN-2025-10-16T22:35:00+08:00
- MA-ABOUT-FOUNDERS-NOTE-SIGNATURE-BOTTOM-ALIGN-TITLE-2025-10-16T22:42:00+08:00
- MA-ABOUT-FOUNDERS-NOTE-SIGNATURE-LOWER-2PX-2025-10-16T22:48:00+08:00
- MA-ABOUT-FOUNDERS-NOTE-SIGNATURE-LOWER-ANOTHER-3PX-2025-10-16T22:54:00+08:00
- MA-ABOUT-FOUNDERS-NOTE-SIGNATURE-LOWER-ANOTHER-2PX-2025-10-16T22:58:00+08:00
- MA-ABOUT-MILESTONES-ICON-SPACING-2025-10-16T23:06:00+08:00
- MA-ABOUT-MILESTONES-ICON-SPACING-STRICTER-2025-10-16T23:14:00+08:00
- MA-ABOUT-MILESTONES-ICON-SPACING-MAX-PADDING-2025-10-16T23:20:00+08:00
- MA-ABOUT-MILESTONES-ICON-TITLE-OVERLAP-FIX-2025-10-16T23:28:00+08:00
- MA-ABOUT-MILESTONES-LAYERING-FIX-2025-10-16T23:36:00+08:00
- MA-ABOUT-PAGE-CENTER-BUTTONS-2025-10-16T17:31:46+08:00
- MA-MILESTONE-LABEL-OVERLAP-FIX-2025-10-16T17:34:25+08:00
- MA-REFACTOR-MILESTONE-TOOLTIP-2025-10-16T20:29:02+08:00
- MA-MILESTONE-DATE-PADDING-INCREASE-2PX-2025-10-16T20:31:35+08:00
- MA-MILESTONE-DATE-PADDING-INCREASE-5PX-2025-10-16T20:32:26+08:00
- MA-MILESTONE-DATE-PADDING-INCREASE-ANOTHER-5PX-2025-10-16T20:33:22+08:00
- MA-MILESTONE-TOOLTIP-Z-INDEX-FIX-2025-10-16T20:34:38+08:00