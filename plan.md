# Plan: Replace Shopify with Custom Next.js Backend

## Context
The project is a Next.js 15 storefront currently 100% wired to Shopify's Storefront GraphQL API. The user only needs product catalog functionality (create/update/show) — no cart, payments, or transactions. This plan replaces all Shopify-dependent code with a local PostgreSQL database (via Prisma), a custom REST API, a Google Drive image storage layer, and an admin panel for product management.

---

## 1. New Dependencies

```bash
# Runtime
pnpm add prisma @prisma/client next-auth googleapis

# Dev
pnpm add -D prisma
```

- `prisma` + `@prisma/client` — ORM for PostgreSQL
- `next-auth@4` — admin auth (use v4, not v5/Auth.js — stable App Router support)
- `googleapis` — Google Drive API for image upload

---

## 2. Prisma Schema (`prisma/schema.prisma`)

```prisma
generator client { provider = "prisma-client-js" }
datasource db { provider = "postgresql"; url = env("DATABASE_URL") }

model Product {
  id               String           @id @default(cuid())
  handle           String           @unique
  title            String
  description      String           @default("")
  descriptionHtml  String           @default("")
  availableForSale Boolean          @default(true)
  tags             String[]
  seo              Json             // { title: string, description: string }
  createdAt        DateTime         @default(now())
  updatedAt        DateTime         @updatedAt
  options          ProductOption[]
  variants         ProductVariant[]
  images           ProductImage[]
  collections      CollectionProduct[]
}

model ProductOption {
  id        String   @id @default(cuid())
  name      String
  values    String[]
  product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  productId String
}

model ProductVariant {
  id               String  @id @default(cuid())
  title            String
  availableForSale Boolean @default(true)
  priceAmount      String
  currencyCode     String  @default("USD")
  selectedOptions  Json    // [{ name: string, value: string }]
  product          Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  productId        String
}

model ProductImage {
  id        String  @id @default(cuid())
  url       String
  fileId    String  @default("")  // Google Drive file ID for deletion
  altText   String  @default("")
  width     Int     @default(0)
  height    Int     @default(0)
  position  Int     @default(0)
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  productId String
}

model Collection {
  id          String             @id @default(cuid())
  handle      String             @unique
  title       String
  description String             @default("")
  seo         Json
  createdAt   DateTime           @default(now())
  updatedAt   DateTime           @updatedAt
  products    CollectionProduct[]
}

model CollectionProduct {
  collection   Collection @relation(fields: [collectionId], references: [id])
  collectionId String
  product      Product    @relation(fields: [productId], references: [id])
  productId    String
  @@id([collectionId, productId])
}
```

---

## 3. New Files to Create

| File | Purpose |
|------|---------|
| `prisma/schema.prisma` | DB schema |
| `lib/db/index.ts` | Prisma client singleton |
| `lib/db/products.ts` | Data access: getProduct, getProducts, getProductRecommendations |
| `lib/db/collections.ts` | Data access: getCollection, getCollections, getCollectionProducts |
| `lib/types.ts` | Shared types (replaces `lib/shopify/types.ts`, same Product/Collection shapes) |
| `lib/google-drive.ts` | uploadImage(buffer, filename) → URL, deleteImage(fileId) |
| `lib/auth.ts` | NextAuth options (CredentialsProvider using ADMIN_EMAIL + ADMIN_PASSWORD env vars) |
| `app/api/auth/[...nextauth]/route.ts` | NextAuth handler |
| `app/api/products/route.ts` | GET (list) + POST (create) |
| `app/api/products/[id]/route.ts` | GET + PUT (update) + DELETE |
| `app/api/collections/route.ts` | GET (list) + POST (create) |
| `app/api/collections/[id]/route.ts` | PUT + DELETE |
| `app/api/upload/route.ts` | POST multipart → uploads to Google Drive, returns { url, fileId } |
| `middleware.ts` | Protect `/admin/*` routes via NextAuth session |
| `app/admin/layout.tsx` | Admin shell layout (sidebar nav) |
| `app/admin/page.tsx` | Product list table with edit/delete links |
| `app/admin/login/page.tsx` | Login form |
| `app/admin/products/new/page.tsx` | Create product form |
| `app/admin/products/[id]/edit/page.tsx` | Edit product form |
| `app/admin/collections/page.tsx` | Collections list + create form |

---

## 4. Files to Modify

| File | Change |
|------|--------|
| `next.config.ts` | Replace `cdn.shopify.com` with `lh3.googleusercontent.com` in `remotePatterns` |
| `app/layout.tsx` | Remove `CartProvider`, remove `getCart()` call |
| `components/layout/navbar/index.tsx` | Remove `CartModal`, cart icon; replace `getMenu()` with static links (or keep as static config) |
| `components/layout/footer.tsx` | Replace `getMenu()` with static nav config |
| `components/product/product-description.tsx` | Remove `AddToCart` button and cart-related imports |
| `components/grid/three-items.tsx` | Replace `getCollectionProducts("hidden-homepage-featured-items")` with `getCollectionProducts` from `lib/db/collections.ts` |
| `app/product/[handle]/page.tsx` | Replace `getProduct`, `getProductRecommendations` imports from `lib/shopify` → `lib/db/products` |
| `app/search/page.tsx` | Replace `getProducts` import |
| `app/search/[collection]/page.tsx` | Replace `getCollection`, `getCollectionProducts` imports |
| `components/layout/search/collections.tsx` | Replace `getCollections` import |
| `lib/constants.ts` | Remove Shopify-specific TAGS and revalidation constants; keep `SORTING_OPTIONS`, `DEFAULT_OPTION` |
| `.env.example` | Replace Shopify vars with new DB/Drive/Auth vars |

---

## 5. Files/Directories to Delete

- `lib/shopify/` — entire directory
- `components/cart/` — entire directory
- `app/api/revalidate/route.ts`
- `app/[page]/` — Shopify CMS pages route
- `lib/type-guards.ts` — only used by Shopify fetch

---

## 6. Data Access Layer Function Signatures

Maintain the same signatures as current Shopify functions so page components need minimal changes:

```typescript
// lib/db/products.ts
getProduct(handle: string): Promise<Product | undefined>
getProducts({ query?, sortKey?, reverse? }): Promise<Product[]>
getProductRecommendations(productId: string): Promise<Product[]>
  // → finds products sharing tags with given product, excluding itself (limit 4)

// lib/db/collections.ts
getCollection(handle: string): Promise<Collection | undefined>
getCollections(): Promise<Collection[]>
getCollectionProducts({ collection, sortKey?, reverse? }): Promise<Product[]>
```

Each function uses `"use cache"` + `cacheTag` + `cacheLife` (same pattern as existing Shopify functions). Revalidation is triggered manually via `revalidateTag()` inside API route handlers on write operations.

**`reshapeProduct()` logic (in `lib/db/products.ts`):**
- `featuredImage` → `images.sort by position[0]`
- `priceRange` → derived from `min/max` of `variants[].priceAmount`
- `images` → sorted by `position`, shape `{ url, altText, width, height }`
- `variants` → shape `{ id, title, availableForSale, selectedOptions, price: { amount, currencyCode } }`

---

## 7. Google Drive Image Storage (`lib/google-drive.ts`)

- Authenticate using a **Service Account** (`GOOGLE_SERVICE_ACCOUNT_JSON` env — base64-encoded JSON)
- Upload files to a specific folder (`GOOGLE_DRIVE_FOLDER_ID` env)
- Make uploaded file publicly readable (`role: "reader"`, `type: "anyone"`)
- Return public URL: `https://lh3.googleusercontent.com/d/{fileId}`
- `uploadImage(buffer: Buffer, mimeType: string, filename: string): Promise<{ url: string, fileId: string }>`
- `deleteImage(fileId: string): Promise<void>`

Add to `next.config.ts` remotePatterns:
```ts
{ protocol: "https", hostname: "lh3.googleusercontent.com" }
```

---

## 8. Admin Auth (`lib/auth.ts`)

```typescript
// NextAuth v4 CredentialsProvider
// Validates against ADMIN_EMAIL + ADMIN_PASSWORD env vars
// JWT strategy (no DB sessions needed)
// Session: { user: { email } }
```

Middleware (`middleware.ts`) redirects unauthenticated requests to `/admin/login`.

---

## 9. Admin Panel Structure

- `/admin` — product list table (title, handle, price, availability) with Edit / Delete buttons
- `/admin/products/new` — form: title, handle (auto-generated), description (rich text or textarea), availableForSale, tags, options (dynamic add/remove), variants (auto-generated from options cartesian product with price/availability per variant), image upload (multiple, drag-reorder)
- `/admin/products/[id]/edit` — same form pre-populated
- `/admin/collections` — list collections, create/assign products to collection
- `/admin/login` — email + password form → `signIn("credentials")`

All admin pages: `export const dynamic = 'force-dynamic'` (never statically cached).

---

## 10. Environment Variables

```bash
DATABASE_URL="postgresql://..."
GOOGLE_SERVICE_ACCOUNT_JSON="<base64>"
GOOGLE_DRIVE_FOLDER_ID="<folder-id>"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="<32-char-random-string>"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="<secure-password>"
SITE_NAME="Your Store"
COMPANY_NAME="Your Company"
```

---

## 11. Implementation Sequence

1. Install dependencies
2. Create `prisma/schema.prisma` → run `pnpm prisma migrate dev --name init`
3. Create `lib/db/index.ts`, `lib/types.ts`
4. Create `lib/db/products.ts`, `lib/db/collections.ts`
5. Create `lib/google-drive.ts`, `app/api/upload/route.ts`
6. Create `lib/auth.ts`, `app/api/auth/[...nextauth]/route.ts`, `middleware.ts`
7. Create product/collection API routes (`app/api/products/`, `app/api/collections/`)
8. Update `next.config.ts`
9. Delete `lib/shopify/`, `components/cart/`, `app/api/revalidate/`, `app/[page]/`, `lib/type-guards.ts`
10. Update `app/layout.tsx`, navbar, footer, product-description (remove cart)
11. Update all page imports to use `lib/db/*` instead of `lib/shopify`
12. Update `lib/constants.ts`, `.env.example`
13. Build admin panel pages
14. Seed DB with a `hidden-homepage-featured-items` collection + test products

---

## 12. Verification

- `prisma migrate dev` completes without errors
- `GET /api/products` returns empty array (no data yet)
- Create a product via `POST /api/products` or admin UI → shows on `/` and `/product/[handle]`
- Upload image via admin → file appears in Google Drive folder, renders in product gallery
- `/admin` redirects to `/admin/login` when unauthenticated
- Search at `/search?q=<term>` returns matching products
- Collection pages at `/search/[collection]` render products in that collection
- No Shopify env vars needed for any of the above to work
