# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Collaboration Preferences
- Before making any changes to the codebase, always propose a few plans, then implement the one I pick.
- Since I want to write the code myself, provide the implementation but let me write it to the codebase.

## Commands

```bash
pnpm dev        # Start dev server with Turbopack
pnpm build      # Production build
pnpm start      # Start production server
pnpm prettier   # Format all files
pnpm test       # Runs prettier:check (only lint check — no unit tests exist)
```

There are no unit or integration tests. The `test` script only checks formatting with Prettier + `prettier-plugin-tailwindcss` (which auto-sorts Tailwind classes).

## Architecture

**Stack:** Next.js 15 App Router · React 19 · TypeScript · Tailwind CSS v4 · pnpm

### Data Layer — `lib/shopify/`

All product, collection, cart, and menu data comes from **Shopify's Storefront GraphQL API** (`/api/2023-01/graphql.json`). The data layer is fully contained in `lib/shopify/`:

- `index.ts` — `shopifyFetch<T>()` generic fetch wrapper + all public data functions (`getProduct`, `getProducts`, `getCollections`, `getCart`, etc.) + `revalidate()` webhook handler
- `queries/` — GraphQL query strings (product, collection, cart, menu, page)
- `mutations/` — GraphQL mutation strings (cart CRUD only)
- `fragments/` — Shared GraphQL field fragments
- `types.ts` — All TypeScript types; raw `ShopifyXxx` types are reshaped into clean `Product`, `Cart`, `Collection` etc. via `reshapeProduct()`, `reshapeCart()`, etc.

The `reshapeProduct()` function filters out products tagged `"nextjs-frontend-hidden"` and flattens GraphQL `edges/nodes` connection format to plain arrays.

### Caching Strategy

Uses Next.js 15 experimental `"use cache"` directive (enabled via `experimental.useCache: true` in `next.config.ts`):

- `"use cache"` + `cacheTag(TAGS.products)` + `cacheLife("days")` — product and collection reads
- `"use cache: private"` + `cacheTag(TAGS.cart)` + `cacheLife("seconds")` — cart (user-specific)
- Cache invalidation: Shopify webhooks hit `app/api/revalidate/route.ts` → `revalidateTag(TAGS.products | TAGS.collections)`. Cart is invalidated via `revalidateTag(TAGS.cart)` inside Server Actions after mutations.

### Cart Flow

Cart state lives in two layers:
1. **Server:** Cart ID stored in an HTTP-only cookie (`cartId`). All mutations go through Server Actions in `components/cart/actions.ts` → Shopify GraphQL mutations.
2. **Client:** `CartProvider` (`components/cart/cart-context.tsx`) accepts a `Promise<Cart>` (not awaited, passed from root layout), exposes `useCart()` which uses `useOptimistic()` for instant UI updates before server response.

Root layout passes `getCart()` as an unawaited Promise to `CartProvider` — this enables streaming/Suspense without blocking the page render.

### Special Collection Handles

Certain Shopify collection handles have UI-specific meanings:
- `hidden-homepage-featured-items` — drives the 3-item featured grid on the homepage (`components/grid/three-items.tsx`)
- `hidden-homepage-carousel` — drives the carousel on the homepage
- Collections prefixed with `hidden-` are filtered out of the public `/search` sidebar

### Key Constants (`lib/constants.ts`)

- `HIDDEN_PRODUCT_TAG = "nextjs-frontend-hidden"` — tag to hide products from storefront
- `DEFAULT_OPTION = "Default Title"` — used by `variant-selector.tsx` to suppress the variant UI when there's only one variant
- `TAGS` — cache tag names used with `cacheTag()` and `revalidateTag()`

### Experimental Next.js Features

`next.config.ts` enables three canary features:
- `ppr: true` — Partial Pre-rendering
- `inlineCss: true` — Inline critical CSS
- `useCache: true` — Required for the `"use cache"` directive in data functions
