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
- Keep `CNAME` present to preserve custom domain (www.meta-alliance.my).
- Do not remove or overwrite `CNAME` in builds/commits.

i18n & Content Rules

- All new content must support EN and CN where relevant.
- About milestones and timeline items should render consistently on both stacks.
- When adding visual affordances (e.g., icons), keep data under `shared/i18n/dictionary.js` or add non‑breaking post‑processing.

Commit & Work IDs

- Include a Work ID in every change set description:
  - Format: `MA-<AREA>-<DESC>-YYYY-MM-DDThh:mm:ss±TZ`.
  - Example: `MA-ABOUT-ROADMAP-ICONS-2025-10-14T12:49:00+08:00`.
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

