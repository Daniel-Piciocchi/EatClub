# EatClub

Next.js (App Router) front-end for browsing EatClub restaurant deals. Home lists venues with their best available discount and supports searching by name/cuisine. Detail pages show restaurant info, available deals, and quick actions.

## Stack

-   Next.js 16 + React 19 (TypeScript)
-   App Router with server components plus client islands
-   Styling with plain CSS files
-   Zustand for a lightweight client-side restaurant cache

## App structure (key paths)

-   `src/app/page.tsx` — server route for the home feed; fetches restaurants then renders `HomePageClient`.
-   `src/components/home` — search, cards, and the home client shell.
-   `src/app/restaurant/[id]/page.tsx` — server route for a restaurant detail page; renders `RestaurantDetailClient`.
-   `src/components/restaurant` — detail UI (hero, action bar, deal list).
-   `src/app/api/restaurants/route.ts` — API route proxying the challenge data from eccdn.
-   `src/utils` — fetching, search, sorting, and deal-format helpers.
-   `src/store/restaurant_store.ts` — Zustand store used by hooks in `src/hooks`.

## Data flow

-   `API_URL` points to `/api/restaurants`; that route fetches `https://eccdn.com.au/misc/challengedata.json`.
-   `fetchRestaurants` / `fetchRestaurantById` (in `src/utils/restaurant_service.ts`) power the server routes. The client hook/store (`useRestaurants`, `useRestaurantStore`) can also fetch with a short intro delay to show the branded loader.
-   If you need to force absolute URLs in non-Vercel environments, set `NEXT_PUBLIC_SITE_URL` or `VERCEL_URL`.

## Running locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

Lint:

```bash
npm run lint
```

Build for production:

```bash
npm run build
npm start
```

## Feature notes

-   Home: best-deal sorting (discount, lightning flag, then qty), search by name/cuisine, image placeholders for failures.
-   Detail: hero image with graceful fallback, action bar, hours/address, and deals list with separators.
-   Loading/error states: intro loader on first visit; clear error messaging for fetch failures.

## Future tweaks

-   Wire action buttons to real menu/phone/location targets.
-   Add tests around sorting/filtering and API error handling.
-   Tune image aspect handling per source (current hero uses 16:9 with min/max height bounds).
