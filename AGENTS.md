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

GitHub Automation

- All pushes to `main` trigger the `deploy-gh-pages.yml` GitHub Actions workflow, which builds the project and deploys `dist/` to the `gh-pages` branch.
- Before pushing, run the Verification Checklist locally so automation jobs do not fail.
- Keep workflow configuration, secrets, and branch protections intact; raise any required updates via PR review before changing automation.
- Ensure every push includes the latest `CNAME` and static asset updates so automation can publish the custom domain correctly.
- GitHub organization/account ID: `metaphysics-alliance`.

i18n & Content Rules

- All new content must support EN and CN where relevant.
- About milestones and timeline items should render consistently on both stacks.
- When adding visual affordances (e.g., icons), keep data under `shared/i18n/dictionary.js` or add non-breaking post-processing.

Commit & Work IDs

- Always include a Work ID at the end of user-visible updates and when describing change sets.
- Format (strict): `MA-{WORK-NAME}-{YYYY-MM-DDThh:mm:ss+08:00}`
  - Time must be ISO 8601 with timezone `+08:00`.
  - Replace `{WORK-NAME}` with a concise, kebab/upper-case name for the task.
  - Examples:
    - `MA-CONTACT-FORM-WORKFLOW-2025-10-15T15:43:00+08:00`
    - `MA-PAGE-BANNER-UPDATE-2025-10-15T16:05:00+08:00`
- Use concise conventional commits (feat/fix/chore/refactor/docs) with a short scope.
- Permanent instruction: whenever you create a new Work ID, also append a side-by-side single-line change summary for that Work ID in the `Work Log` section of this document.

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
- MA-RUN-NPM-BUILD-2025-10-16T21:12:32+08:00
- MA-FIX-USEI18N-IMPORT-2025-10-16T21:16:11+08:00
- MA-FIX-I18N-FALLBACK-LOGIC-2025-10-16T21:18:25+08:00
- MA-FIX-ENCODING-ISSUES-PAGECONFIG-2025-10-17T13:01:00+08:00: Fixed character encoding issues and resulting syntax errors in src/routes/pageConfig.jsx.
- MA-GEMINI-CONTEXT-2025-10-18T14:00:00+08:00: Created `GEMINI.md` to provide context for future AI interactions.
- MA-SERVICE-PAGE-REFACTOR-2025-10-18T15:00:00+08:00: Refactored the celestial service pages to use a consistent template and added images to the `bazi` and `ziwei` pages. Renamed image directory and updated paths.
- MA-QIMEN-IMAGES-2025-10-18T15:30:00+08:00: Added images to the "Arcane Strategy Matrix (Qi Men)" page.
- MA-ZIMEI-RENAME-2025-10-18T16:00:00+08:00: Renamed the `zimei-page` directory to `page-zimei` and updated the image paths.
- MA-MAP-CARD-UPDATE-2025-10-18T16:30:00+08:00: Updated email and WhatsApp number on the MapCard component.
- MA-PRIVACY-POLICY-UPDATE-2025-10-18T17:00:00+08:00: Rewrote the Privacy Policy based on Malaysian PDPA, added content to dictionary, created a generic `LegalPage` component, and added a downloadable PDF link.
- MA-FIX-DICTIONARY-SYNTAX-2025-10-18T17:15:00+08:00: Fixed a syntax error in `shared/i18n/dictionary.js` by adding a missing comma and removing a duplicated object.
- MA-PRIVACY-CN-POLICY-FIX-2025-10-19T00:41:37+08:00: Reattached the CN privacy policy data to the shared dictionary so the CN legal page renders correctly across both stacks.
- MA-AGENTS-WORKID-INSTRUCTION-2025-10-19T14:40:00+08:00: Added permanent rule requiring every new Work ID to include a matching summary entry in the Work Log.
- MA-OFFICE-POWER-IMAGERY-2025-10-19T15:05:00+08:00: Wired Office Power Alignment sections on both stacks to the `/public/images/page-fs-office` assets and registered the new Next.js route.
- MA-DRAGON-VEIN-IMAGERY-2025-10-19T15:25:00+08:00: Linked Dragon Vein Oracle sections to `/public/images/page-fs-dragon`, updated shared service data, and added the Next.js route.
- MA-GIT-PUSH-PREPARATION-2025-10-19T17:30:00+08:00: Prepared the project for a git push by staging and committing all changes, including new service pages, legal pages, and updated components.
- MA-COSMIC-CYCLE-IMAGERY-2025-10-19T18:10:00+08:00: Placed the page-3core imagery across all Cosmic Cycle of Fate sections in both stacks and exposed the new Next.js service route.
- MA-COSMIC-CYCLE-TITLE-2025-10-19T18:20:00+08:00: Renamed the CN title for the Cosmic Cycle service to 三元九运 across both stacks.
- MA-CELESTIAL-STAR-IMAGERY-2025-10-19T18:40:00+08:00: Routed page-flying-star visuals into every Celestial Star Matrix section for both stacks and stood up the matching Next.js service entry.
- MA-ENERGY-CONVERGENCE-IMAGERY-2025-10-19T18:55:00+08:00: Applied page-land imagery to all Energy Convergence Field sections in both stacks and registered the shared Next.js route.
- MA-ICHING-IMAGERY-2025-10-19T19:05:00+08:00: Connected page-iching assets to the I-Ching Energy Matrix content for both stacks and added the Next.js service route.
- MA-GITHUB-AUTOMATION-2025-10-19T19:15:00+08:00: Documented the GitHub Actions push-to-deploy process and safeguards for the automation pipeline in AGENTS.md.
- MA-NAV-MOBILE-AUTOCLOSE-2025-10-19T19:25:00+08:00: Updated the mobile navigation so selecting an item automatically closes the menu and navigates to the target page.
- MA-CELESTIAL-ENGAGEMENT-PROFILES-2025-10-19T19:35:00+08:00: Reframed Celestial service “Ideal Clients” sections into technical engagement profiles for BaZi, Zi Wei and Qi Men in EN/CN.
- MA-CELESTIAL-IDEAL-REFINEMENT-2025-10-19T19:55:00+08:00: Converted Ideal Clients sections across Feng Shui Assessment/Layout and Magnetic Matrix services into technical engagement profiles with explicit deployment bullet points in both stacks.
- MA-MAGNETIC-IDEAL-BENEFICIARIES-2025-10-19T20:20:00+08:00: Added Name Destiny Code and Soul Number Blueprint engagement profiles, assets, and bilingual Ideal Beneficiaries metadata across both stacks.
- MA-SECTION-DIVIDER-BRAND-2025-10-19T20:30:00+08:00: Restyled SectionDivider lines and typography with black-gold to deep-blue gradients across Vite and Next implementations.
- MA-BACKGROUND-DIM-2025-10-19T20:34:00+08:00: Increased global overlay opacity to 50% in both stacks to deliver a deeper dimmed backdrop.
- MA-SECTION-DIVIDER-GLOW-2025-10-19T20:40:00+08:00: Added luminous panels and stronger glow to SectionDivider fonts and lines for higher contrast.
