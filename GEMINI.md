# Project Overview

This is a Next.js web application for Meta Alliance, a metaphysics consultancy. The website is built with React, TypeScript, and Tailwind CSS. It supports internationalization for English (EN) and Chinese (CN). The project also includes a Vite-based development environment, which seems to be used for component development or a separate part of the site.

## Key Technologies

*   **Framework:** Next.js
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **Internationalization:** `i18next` (custom implementation)
*   **Testing:** Playwright for visual regression testing
*   **Deployment:** Vercel for the Next.js app and Cloudflare Workers for serverless functions.

# Building and Running

## Development

To run the development server, which includes both the Next.js and Vite applications, use the following command:

```bash
npm run dev
```

This will start the Next.js app on `http://localhost:3000` and the Vite app on `http://localhost:5173`.

## Building

To build the application for production, use the following command:

```bash
npm run next:build
```

This will create an optimized build of the Next.js application in the `.next` directory.

## Testing

To run the Playwright tests, use the following command:

```bash
npm run test:visual
```

To update the snapshots for the visual regression tests, use:

```bash
npm run test:visual:update
```

# Development Conventions

## Code Style

The project uses ESLint to enforce a consistent code style. To check for linting errors, run:

```bash
npm run lint
```

## Internationalization

The website supports English (`EN`) and Chinese (`CN`). The content is stored in a shared dictionary located at `shared/i1n/dictionary.js`. The `middleware.ts` file handles the routing to the correct locale.

## Components

The React components are located in the `app/components` directory. The Vite app in the `src` directory seems to be used for developing and testing components in isolation.

### Service Pages

The celestial service pages (e.g., BaZi, Zi Wei, Qi Men) are implemented using a shared template component.

*   **Vite:** The `src/pages/CelestialServicePage.jsx` component is used to render all celestial service pages. It fetches content from the `shared/i18n/celestialContent.js` file based on the `serviceKey` prop.
*   **Next.js:** The `app/components/CelestialServicePage.tsx` component serves the same purpose for the Next.js application. The individual service pages under `app/[locale]/services/` use this component and pass the corresponding `serviceKey`.

This structure ensures that the content and layout of the service pages are consistent across both the Vite and Next.js applications.

### Legal Pages

The legal pages (e.g., Privacy Policy, Disclaimer) are implemented using a shared template component.

*   **Next.js:** The `app/components/LegalPage.tsx` component is used to render all legal pages. It fetches content from the `shared/i18n/dictionary.js` file under the `legal` key based on the `policyKey` prop.
*   **Vite:** (To be implemented) The Vite application currently uses `src/pages/ContentPage.jsx` for rendering content pages. A similar approach will be adopted for legal pages in the Vite app, where `ContentPage.jsx` will be updated to fetch content from the dictionary based on a `policyKey`.

This structure ensures that the content and layout of the legal pages are consistent across both the Vite and Next.js applications.
