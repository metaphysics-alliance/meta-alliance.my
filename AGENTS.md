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
- MA-MAIN-TITLE-GRADIENT-2025-10-20T22:47:59+08:00: Applied 黑金+深蓝 high-contrast gradient styling to all main page titles across Next and Vite.
- MA-SECTION-DIVIDER-SUBTITLE-GRADIENT-2025-10-20T22:55:39+08:00: Matched SectionDivider subtitles to the main title gradient styling across both stacks.
- MA-CORPORATE-AUDIT-PAGE-2025-10-20T23:15:08+08:00: Authored bilingual Corporate Audit service experience with ten-section blueprint, Matplotlib chart directives, and CTA integration across both stacks.
- MA-CORPORATE-AUDIT-NAV-2025-10-20T23:29:32+08:00: Reverted SectionDivider palette and relocated Corporate Audit under the Enterprise navigation with aligned routes.
- MA-SECTION-DIVIDER-SUBTITLE-ALIGN-2025-10-20T23:35:53+08:00: Synced SectionDivider subtitle color/glow with the primary title styling while retaining legacy palette.
- MA-MAIN-TITLE-PADDING-2025-10-20T23:53:32+08:00: Added precise 3px bottom padding across hero titles in both frameworks for consistent vertical rhythm.
- MA-MAIN-TITLE-PADDING-UPDATE-2025-10-20T23:55:26+08:00: Increased hero title bottom padding to 5px across stacks to maintain consistent clearance beneath main headings.
- MA-MAIN-TITLE-PADDING-10PX-2025-10-21T00:15:39+08:00: Standardised a 10px bottom padding on all main hero titles for expanded breathing room beneath headings.
- MA-ENTERPRISE-SITE-SELECTION-2025-10-21T22:13:30+08:00: Authored bilingual site selection blueprint with 17-section workflow, CTA uploads, and linked Enterprise routes across both stacks.
- MA-SERVICES-THUMBNAILS-2025-10-21T22:35:37+08:00: Mapped page-services imagery onto services directory cards for EN/CN stacks.
- MA-TITLE-GOLD-GRADIENT-2025-10-21T22:39:22+08:00: Shifted hero title gradient to a bright metallic gold blend across both stacks for heightened sheen.
- MA-SECTION-DIVIDER-PANEL-GRADIENT-2025-10-21T22:43:08+08:00: Swapped SectionDivider panel styling to a metallic gold into deep blue gradient with reinforced glow across stacks.
- MA-HOMEPAGE-TITLE-PANEL-2025-10-21T22:47:26+08:00: Wrapped homepage hero title inside the new gold-blue gradient panel for extra emphasis.
- MA-HOMEPAGE-CAROUSEL-PANEL-2025-10-21T22:51:52+08:00: Applied the metallic gold + deep blue title panel styling to the homepage image carousel captions.
- MA-ENTERPRISE-CYCLES-PAGE-2025-10-21T23:06:22+08:00: Built bilingual Strategy & Cycles command deck with Matplotlib chart directives and wired routes across Next/Vite.
- MA-IMPERIAL-HUANGJI-ORACLE-2025-10-21T23:33:55+08:00: Authored Supreme Celestial Numbers Oracle experience with six-section Huangji blueprint, charts, and hooked routes across stacks.
- MA-HUANGJI-REF-UPDATE-2025-10-22T20:36:26+08:00: Adjusted CN references for Huangji oracle to cite 真太阳时 rather than spreadsheet naming.
- MA-HUANGJI-REF-EN-2025-10-22T20:38:07+08:00: Updated EN Huangji references to cite True Solar Time data tables instead of delta spreadsheets.
- MA-HUANGJI-REF-EN-TRIM-2025-10-22T20:39:35+08:00: Simplified EN Huangji reference phrasing to cite True Solar Time directly.
- MA-CYCLES-MATPLOTLIB-REMOVAL-2025-10-22T20:52:27+08:00: Removed Matplotlib references from Enterprise Strategy & Cycles copy in EN/CN per branding guidance.
- MA-HUANGJI-MATPLOTLIB-REMOVAL-2025-10-22T20:53:44+08:00: Cleared Matplotlib mentions from Supreme Celestial Numbers Oracle copy (EN/CN) for neutral phrasing.
- MA-SITE-SELECTION-REFRESH-2025-10-22T20:59:18+08:00: Rebuilt Enterprise Site Selection content with 17-section brief covering scope, landform, compass, timing and execution in EN/CN.
- MA-CORPORATE-AUDIT-REFRESH-2025-10-22T21:10:12+08:00: Rebuilt Corporate Destiny Audit content (EN/CN) with urgent CTA and ten-section blueprint covering destiny mapping, leadership, space, timing and action plan.
- MA-NAME-CODE-IMAGERY-2025-10-22T21:19:28+08:00: Linked new /public/images/page-name assets to each Name Destiny Code section across EN/CN content.
- MA-SOUL-NUMBER-IMAGERY-2025-10-22T21:38:58+08:00: Wired /public/images/page-numerology assets into every Soul Number Blueprint section across EN/CN and Vite routes.
- MA-IMPERIAL-ORACLE-PAGES-2025-10-22T22:00:04+08:00: Added Taiyi/Six Ren content blocks (EN/CN), Next.js pages, SPA routes, sitemap entries, and nav links so Imperial oracles load correctly.
- MA-COSMIC-TAIYI-REVAMP-2025-10-22T22:05:00+08:00: Rebuilt Tai Yi oracle content (EN/CN), switched Next/Vite routes to shared data, and aligned nav/sitemap entries.
- MA-VITE-CELESTIAL-SYNC-2025-10-22T23:00:43+08:00: Streamlined Vite Celestial service routing to shared dictionary data and matched the page layout with the Next stack so Tai Yi updates render consistently.
- MA-TAIYI-CTA-BUTTON-2025-10-22T23:08:01+08:00: Restored the Celestial CTA block in the Vite stack with bilingual Tai Yi buttons to match the shared service metadata.
- MA-FSHOME-LANG-FIX-2025-10-22T23:23:48+08:00: Corrected the Home Destiny Compass service data split so EN renders English copy and CN retains the Mandarin set across both stacks.
- MA-MATPLOTLIB-REMOVAL-2025-10-20T11:00:00+08:00: Replaced all occurrences of "Matplotlib" with a professional term in the website content.
- MA-TAIYI-CN-SYNC-2025-10-20T12:00:00+08:00: Synced the Chinese content of the Cosmic Tai Yi Strategy page with the English version.
- MA-TAIYI-HEADER-MONOLINGUAL-2025-10-20T13:00:00+08:00: Made the section headers on the Cosmic Tai Yi Strategy page monolingual.
- MA-TAIYI-CONTENT-MONOLINGUAL-2025-10-20T14:00:00+08:00: Made the content of the Cosmic Tai Yi Strategy page monolingual.
- MA-SIX-REN-PAGE-CREATION-2025-10-20T15:00:00+08:00: Created the Mystical Mechanism of Six Ren page and added it to the navigation.
- MA-FIX-NAV-SYNTAX-2025-10-20T15:30:00+08:00: Fixed syntax errors in the navigation object in dictionary.js.
- MA-FIX-CELESTIAL-SYNTAX-2025-10-20T16:00:00+08:00: Fixed syntax errors in celestialContent.js.
- MA-FIX-CELESTIAL-SYNTAX-AGAIN-2025-10-20T16:30:00+08:00: Fixed syntax errors in celestialContent.js again.
- MA-ADVANCED-BLUEPRINT-CN-SYNC-2025-10-29T16:15:27+08:00: Restored the CN Advanced Destiny Blueprint service content so `/vip-report/pro` renders localized data in both stacks.
- MA-SUPREME-IMAGERY-SEQUENCE-2025-10-29T16:21:21+08:00: Wired sequential Supreme Blueprint hero images to each section across EN/CN `/vip-report/supreme` content.
- MA-SUPREME-CELESTIAL-REFRESH-2025-10-26T01:52:01+08:00: Rewrote Supreme Celestial Numbers Oracle content and CTA per the new design layout across both stacks.
- MA-CONTACT-PRO-CTA-2025-10-27T12:07:25+08:00: Updated Contact hero headline and Malaysia state label across Next/Vite forms to match new wording.
- MA-CONTACT-PRO-HERO-2025-10-27T13:23:05+08:00: Synced the Vite contact hero copy to “Contact Our Professionals” so both stacks display the new main title.
- MA-CEL-NUMBERS-CTA-SPLIT-2025-10-27T13:55:44+08:00: Localised Supreme Celestial Numbers CTA button labels so EN/CN render single-language text per navigation toggle.
- MA-TAIYI-STRATEGY-REFRESH-2025-10-27T14:07:07+08:00: Rebuilt Celestial Tai Yi Strategy content and CTA in both languages to match the new design layout.
- MA-SIX-REN-STRATEGY-2025-10-27T14:21:16+08:00: Reauthored the Six Ren strategy page copy and CTA in EN/CN following the latest design layout.
- MA-CORPORATE-DESTINY-REFRESH-2025-10-27T14:42:01+08:00: Rebuilt Corporate Destiny Intelligence content and CTA in both languages per the new enterprise design brief.
- MA-SITE-STRATEGY-REFRESH-2025-10-27T14:57:01+08:00: Updated Enterprise Site Strategy copy, sections, and CTA in EN/CN to align with the new selection blueprint.
- MA-STRATEGY-CYCLE-REFRESH-2025-10-27T15:07:47+08:00: refreshed Strategy & Cycle Intelligence narrative, flow, and CTA for both locales.
- MA-ESSENTIAL-BLUEPRINT-REFRESH-2025-10-27T15:56:27+08:00: Updated Essential Destiny Blueprint tier copy and Vite route messaging per new blueprint design.
- MA-ADVANCED-BLUEPRINT-REFRESH-2025-10-27T16:40:25+08:00: Rebuilt Advanced Destiny Blueprint content, routes, and homepage bullets/links for the new consultation structure.
- MA-SUPREME-BLUEPRINT-REFRESH-2025-10-27T17:02:28+08:00: Rebuilt Supreme Destiny Blueprint content, routes, and homepage tier details to match the new full-holographic design.
- MA-SUPREME-BLUEPRINT-OUTCOME-2025-10-27T17:31:03+08:00: Synced Supreme Destiny Blueprint How It Works and Outcome copy with the latest doc structure across EN/CN.
- MA-ACADEMY-COURSE-OVERVIEW-2025-10-27T18:46:29+08:00: Designed the bilingual Academy course overview pages with the new mastery pathway structure across Next and Vite stacks.
- MA-HERO-GLOBAL-CTA-2025-10-27T22:16:33+08:00: Added matching hero/banner CTA buttons (excluding home/about/contact) using each page’s primary CTA copy across both stacks.
- MA-ACADEMY-MENU-REALIGN-2025-10-27T23:18:43+08:00: Reordered Academy navigation to courses > foundation > beginner > advanced > professional and removed calendar links across both stacks.
- MA-ACADEMY-FOUNDATION-DESIGN-2025-10-27T23:37:55+08:00: Built a bilingual Chinese Metaphysics Foundation page with hero CTAs, structured sections, and mirrored Vite routing/components.
- MA-ACADEMY-FOUNDATION-FAQ-2025-10-27T23:41:18+08:00: Replaced the map section with a dedicated FAQ block for the Foundation course and mirrored it in the SPA detail page.
- MA-ACADEMY-FOUNDATION-FAQ-REFINE-2025-10-28T00:32:49+08:00: Removed duplicate FAQ renders and replaced with Foundation-specific Q&A in both EN/CN dictionaries and layouts.
- MA-ACADEMY-FAQ-RELOCATION-2025-10-28T01:05:00+08:00: Shifted the Foundation FAQ onto the Academy Courses overview and stripped the redundant detail-page rendering across both stacks.
- MA-ACADEMY-BEGINNER-REDESIGN-2025-10-28T01:45:00+08:00: Rebuilt the Beginner course content (EN/CN) from the new layout, updated Next/Vite pages, and aligned hero/CTA actions.
- MA-ACADEMY-INTERMEDIATE-REDESIGN-2025-10-28T02:20:00+08:00: Authored the Advanced Course content in EN/CN, updated Next/Vite routes, and synced hero plus CTA structure with the new integration blueprint.
- MA-ACADEMY-PROFESSIONAL-REDESIGN-2025-10-28T02:55:00+08:00: Delivered the professional certification course copy (EN/CN), rebuilt the Next/Vite pages, and wired the hero/CTA flows to the shared dictionary.
- MA-NEXT-BUILD-HERO-FIX-2025-10-28T03:20:00+08:00: Replaced missing Banner import with Hero in app/components/CelestialServicePage.tsx to restore Next build.
- MA-LINT-CLEANUP-2025-10-28T16:45:00+08:00: Fixed lint blockers across worker, components, and pages; allowed non-blocking Tailwind warnings.
- MA-VIP-PRO-HOW-IT-WORKS-CN-SYNC-2025-10-29T19:57:59+08:00: Synced vip-report/pro CN "How It Works" copy with the Advanced Destiny Blueprint layout and restored the bullet list cadence.
- MA-ADV-BLUEPRINT-IMAGERY-2025-10-29T20:26:57+08:00: Assigned page-360-advanced imagery sequentially to every Advanced Destiny Blueprint section across both stacks.
- MA-ENTERPRISE-AUDIT-IMAGERY-2025-10-29T21:05:25+08:00: Mapped page-audit visuals to each Corporate Destiny Intelligence section so /enterprise/audit cards render the new artwork in order.
- MA-ENTERPRISE-SITE-IMAGERY-2025-10-29T21:38:34+08:00: Applied page-site imagery sequence to every Enterprise Site Strategy section in EN/CN so the site cards mirror the new visuals.
- MA-ENTERPRISE-CYCLES-IMAGERY-2025-10-29T22:03:31+08:00: Wired page-cycles artwork sequentially into each Enterprise Strategy & Cycle Intelligence section across both stacks.
- MA-ACADEMY-NAV-LABELS-2025-10-29T22:12:19+08:00: Renamed EN Academy menu items to "Beginner Course" and "Advanced Course" for clearer labelling.
- MA-IMPERIAL-CTA-TUNE-2025-10-29T22:25:31+08:00: Removed the secondary CTA from Imperial Star Atlas so only the primary consultation button remains.
- MA-QIMEN-CTA-TUNE-2025-10-29T22:27:10+08:00: Removed the secondary CTA from Arcane Strategy Matrix, leaving just the briefing button on the page.
- MA-CELESTIAL-CTA-PRIMARY-ONLY-2025-10-29T22:28:29+08:00: Cleared secondary CTAs across Celestial services so each page shows only the main consultation button.
- MA-ASSET-UPDATE-2025-10-29T23:10:00+08:00: feat(assets): update images for name and numerology pages
- MA-PRICING-TABLE-2025-10-30T12:14:37+08:00: Added bilingual pricing data, dedicated Pricing page (including academy & 360 Holistic tiers), and navigation entry across Next/Vite stacks.
- MA-HOMEPAGE-CAROUSEL-REFINE-2025-10-30T12:42:59+08:00: Restyled Vite hero carousel with left-aligned copy, per-slide CTAs and right-aligned imagery to reduce distortion.
- MA-HOMEPAGE-CAROUSEL-REPAIR-2025-10-30T13:28:11+08:00: Rebuilt the Vite hero carousel file with valid JSX, restored autoplay controls, and aligned the image panel with the gradient card design.
- MA-HOMEPAGE-CAROUSEL-IMAGE-SLIDE-2025-10-30T13:44:39+08:00: Added directional slide-in/out animation to the Vite hero imagery while keeping the existing layout intact.
- MA-HOMEPAGE-CAROUSEL-SQUARE-2025-10-30T13:53:48+08:00: Converted the Vite hero carousel panels to square edges so both the text card and gallery frame align with the image background.
- MA-HOMEPAGE-CAROUSEL-BORDERLESS-2025-10-30T13:56:43+08:00: Removed the outer border line from the Vite hero carousel so the card merges cleanly into the background.
- MA-HOMEPAGE-CAROUSEL-FULLBLEED-2025-10-30T13:58:21+08:00: Stretched the text and imagery containers edge-to-edge inside the Vite hero carousel for a full-bleed layout.
- MA-HOMEPAGE-CAROUSEL-CENTER-TEXT-2025-10-30T13:59:48+08:00: Centered the hero copy block horizontally so badge, headline, summary, and CTA align perfectly within the panel.
- MA-HOMEPAGE-CAROUSEL-VERTICAL-CENTER-2025-10-30T14:01:14+08:00: Aligned the hero text stack vertically within the panel so content sits perfectly mid-card on every slide.
- MA-HOMEPAGE-CAROUSEL-PANEL-BORDERLESS-2025-10-30T14:02:22+08:00: Removed the gold outline from the hero text panel so it blends seamlessly with the main carousel container.
- MA-HOMEPAGE-CAROUSEL-INDICATOR-REMOVAL-2025-10-30T14:03:42+08:00: Removed the numeric slide indicator from the hero CTA row for a cleaner minimal layout.
- MA-HOMEPAGE-CAROUSEL-SERVICES-CTA-2025-10-30T14:07:24+08:00: Pointed every hero CTA to `/services` with bilingual labels “Explore Our Services” / “了解我们的服务”.
- MA-HOMEPAGE-CAROUSEL-GALACTIC-PANEL-2025-10-30T14:09:32+08:00: Swapped the hero text card background for a dark galactic solar-system motif and removed per-slide imagery.
- MA-HOMEPAGE-CAROUSEL-CTA-HOVER-2025-10-30T14:11:47+08:00: Added a solar-flare hover treatment to the hero CTA button for higher tactile feedback.
- MA-LEGAL-TERMS-PDF-SYNC-2025-11-03T11:45:00+08:00: Synced Vite legal routes with Next and generated bilingual Terms PDF download placeholders.
- MA-LEGAL-CONTACT-SYNC-2025-11-03T12:05:00+08:00: Renamed legal contact headings and standardised support team details across privacy and terms policies.
- MA-LEGAL-TERMS-PDF-REFRESH-2025-11-03T12:25:00+08:00: Automated bilingual Terms/Privacy markdown export and regenerated all legal PDFs via ReportLab.
- MA-LEGAL-DOCX-EXPORT-2025-11-03T12:45:00+08:00: Added docx outputs for Terms/Privacy (EN/CN) via shared generator so legal text is editable offline.
- MA-LEGAL-ASSET-RELOCATE-2025-11-03T13:00:00+08:00: Pointed downloads to /legal/ paths and updated generator to emit PDFs/DOCX into the relocated public/legal directory.
- MA-LEGAL-COOKIES-PAGE-2025-11-03T13:20:00+08:00: Added bilingual Cookies policy data, routes, and asset generation so /legal/cookies mirrors the privacy/terms structure across stacks.
- MA-LEGAL-REFUND-PAGE-2025-11-03T13:40:00+08:00: Wired bilingual Refund policy data and routes so /legal/refund renders through the shared LegalPage across stacks.
- MA-LEGAL-DISCLAIMER-PAGE-2025-11-03T13:50:00+08:00: Added bilingual Disclaimer policy content, aligned Next/Vite legal routes, and linked the downloadable PDF assets.
- MA-LEGAL-TERMS-RESTORE-2025-11-03T14:05:00+08:00: Reinstated the Terms of Service data in both languages and routed /legal/terms through the shared LegalPage component across stacks.
- MA-NAV-PRICING-REORDER-2025-11-03T14:30:00+08:00: Moved the Pricing link between Resources and About across Next/Vite navigation and kept bilingual labels aligned.
- MA-PRICING-DATA-SYNC-2025-11-04T16:05:00+08:00: Synced pricing experience with Supabase service_pricing data, added live USD conversion, and introduced automatic FX rate triggers.
- MA-ENV-IGNORE-2025-11-04T16:45:00+08:00: Removed tracked .env.local and added ignore rules to keep Supabase secrets out of git.
- MA-ENV-SECRETS-GUIDE-2025-11-04T17:00:00+08:00: Added .env.local.example and wired deploy workflow to GitHub Secrets for Supabase credentials.
- MA-EXCHANGE-RATE-DUAL-2025-11-04T13:07:03+08:00: Extended the exchange-rate GitHub Action to capture both USD/MYR and MYR/USD pairs for Supabase automation.
- MA-PRICING-ECOMMERCE-2025-11-04T14:23:31+08:00: Rebuilt the pricing journey with immersive visuals, cart flow, and checkout coverage across Next and Vite.
