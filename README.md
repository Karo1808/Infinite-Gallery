# Infinite Gallery

A responsive Unsplash photo browser built as a personal portfolio project. It combines an infinite masonry gallery with search, photo details, photographer links, sharing, and downloads.

## Live Demo

[infinite-gallery-nqv7.vercel.app](https://infinite-gallery-nqv7.vercel.app/)

## Key Features

- Infinite loading powered by `IntersectionObserver`
- Unsplash photo search through URL query parameters
- Responsive masonry layout with mobile-specific presentation
- Photo details shown as a desktop modal or a dedicated page on smaller screens
- BlurHash placeholders and responsive image sources
- Photographer profiles, related photos, sharing options, and tracked downloads
- Loading, empty, missing-configuration, and API error states

## Technical Highlights

- React Router uses hash-based routing for static-host compatibility and preserves gallery context behind photo modals.
- TanStack Query manages API state, one-minute stale caching, paginated queries, and photo-detail requests.
- Route components are lazy-loaded with React `Suspense`.
- The Unsplash SDK is called from the browser; API responses are normalized into the app's `Photo` type before rendering.
- CSS Modules scope component styles, while a global stylesheet provides shared rules.

## Stack

- React 18 and TypeScript
- Vite 7 with SWC
- TanStack Query
- React Router
- Unsplash JavaScript SDK
- React Masonry CSS and React BlurHash
- CSS Modules
- ESLint

## Local Setup

Requires Node.js `20.19.0` or newer and an [Unsplash developer access key](https://unsplash.com/developers).

```bash
git clone https://github.com/Karo1808/infinite-gallery.git
cd infinite-gallery
npm install
cp .env.example .env.local
```

Set the access key in `.env.local`:

```dotenv
VITE_UNSPLASH_ACCESS_KEY=your_unsplash_access_key
```

Start the development server:

```bash
npm run dev
```

### How to Verify

Open the local URL printed by Vite. Confirm that photos load, searching changes the gallery, scrolling loads another page, and selecting a photo opens its details.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run lint` | Run ESLint with warnings treated as errors. |
| `npm run typecheck` | Check TypeScript without emitting files. |
| `npm run build` | Type-check the project and create the production build in `dist/`. |
| `npm run preview` | Serve the production build locally for inspection. |

To verify a production build:

```bash
npm run lint
npm run build
npm run preview
```

## Deploy to Vercel

This Vite application can be deployed as a static Vercel project:

1. Import the repository into Vercel.
2. Select the **Vite** framework preset.
3. Use `npm run build` as the build command and `dist` as the output directory.
4. Add `VITE_UNSPLASH_ACCESS_KEY` under **Project Settings > Environment Variables** for the required deployment environments.
5. Deploy the project.

### Verification

Open the deployment URL and repeat the gallery, search, infinite-scroll, and photo-detail checks. The app uses `HashRouter`, so client routes remain inside the URL hash on static hosting.

## Environment Variable Safety

Vite exposes every `VITE_`-prefixed variable in the public client bundle. `VITE_UNSPLASH_ACCESS_KEY` is therefore visible to site visitors and must not contain a private secret. Never place the Unsplash secret key or other confidential credentials in a `VITE_` variable.

## Unsplash Attribution and API Guidelines

Photo content comes from Unsplash and remains subject to Unsplash's terms. The app links photographer names to their Unsplash profiles with referral parameters and calls the Unsplash download-tracking endpoint before starting a download. Preserve these behaviors when modifying the project, and review the official [Unsplash API Guidelines](https://help.unsplash.com/en/articles/2511245-unsplash-api-guidelines) before deployment.
