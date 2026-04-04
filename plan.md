# Plan: Replace Shopify with Custom Next.js Backend

## Context
The project is a Next.js 15 storefront currently 100% wired to Shopify's Storefront GraphQL API. The goal is to replace all Shopify-dependent code with a custom data layer. Only product catalog functionality is needed — no cart, payments, or transactions.

The migration is split into two phases:
- **Phase 1** — Hardcoded data (current): fast to ship, no infrastructure needed
- **Phase 2** — Database + admin panel: when product count or update frequency justifies it

---

## Phase 1: Hardcoded Data Layer ✅

### What was done
- Removed all Shopify imports and cart components
- Created `lib/types.ts` with shared `Product`, `Collection`, `SortFilterItem` types
- Created `lib/data/products.ts` — hardcoded product array + `getProduct`, `getProducts`, `getProductRecommendations`
- Created `lib/data/collections.ts` — hardcoded collection array + `getCollection`, `getCollections`, `getCollectionProducts`
- Created `lib/data/html/` — per-product HTML files loaded via `fs.readFileSync`
- Images served from `public/images/`
- Updated all page imports to use `lib/data/*` instead of `lib/shopify`
- Stripped `CartProvider`, `CartModal`, `getMenu()`, `getCart()`, `validateEnvironmentVariables()` from layout/navbar/footer
- Stubbed out `app/api/revalidate/route.ts` and `app/[page]/page.tsx`

### Adding a new product
1. Add images to `public/images/`
2. Create `lib/data/html/<product-handle>.html`
3. Add a new entry to the `products` array in `lib/data/products.ts`
4. Add the handle to a collection's `productHandles` in `lib/data/collections.ts`

---

## Phase 2: Database + Admin Panel

Trigger: when managing products via code files becomes impractical (many products, frequent updates, non-technical editors).

### New Dependencies

```bash
pnpm add prisma @prisma/client next-auth googleapis
pnpm add -D prisma
```

- `prisma` + `@prisma/client` — ORM for PostgreSQL
- `next-auth@4` — admin auth (use v4, not v5/Auth.js — stable App Router support)
- `googleapis` — Google Drive API for image upload

---

### Prisma Schema (`prisma/schema.prisma`)

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
  seo              Json
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
  selectedOptions  Json
  product          Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  productId        String
}

model ProductImage {
  id        String  @id @default(cuid())
  url       String
  fileId    String  @default("")
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

### New Files to Create

| File | Purpose |
|------|---------|
| `prisma/schema.prisma` | DB schema |
| `lib/db/index.ts` | Prisma client singleton |
| `lib/db/products.ts` | Data access: getProduct, getProducts, getProductRecommendations |
| `lib/db/collections.ts` | Data access: getCollection, getCollections, getCollectionProducts |
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

### Files to Modify

| File | Change |
|------|--------|
| `next.config.ts` | Add `lh3.googleusercontent.com` to `remotePatterns` |
| `components/grid/three-items.tsx` | Switch import from `lib/data/collections` → `lib/db/collections` |
| `app/product/[handle]/page.tsx` | Switch imports to `lib/db/products` |
| `app/search/page.tsx` | Switch import to `lib/db/products` |
| `app/search/[collection]/page.tsx` | Switch imports to `lib/db/collections` |
| `components/layout/search/collections.tsx` | Switch import to `lib/db/collections` |
| `.env.example` | Add DB/Drive/Auth vars |

---

### Google Drive Image Storage

- Auth via Service Account (`GOOGLE_SERVICE_ACCOUNT_JSON` env — base64-encoded JSON)
- Upload to folder (`GOOGLE_DRIVE_FOLDER_ID` env), set public readable
- Public URL: `https://lh3.googleusercontent.com/d/{fileId}`

---

### Admin Auth

- NextAuth v4 CredentialsProvider
- Validates `ADMIN_EMAIL` + `ADMIN_PASSWORD` env vars
- JWT strategy, no DB sessions
- Middleware protects `/admin/*`, redirects to `/admin/login`

---

### Admin Panel

- `/admin` — product list table with Edit / Delete
- `/admin/products/new` — create form (title, handle, description, options, variants, image upload)
- `/admin/products/[id]/edit` — same form pre-populated
- `/admin/collections` — list + assign products
- `/admin/login` — credentials form

---

### Environment Variables

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

### Implementation Sequence

1. Create `prisma/schema.prisma` → run `pnpm prisma migrate dev --name init`
2. Create `lib/db/index.ts`
3. Create `lib/db/products.ts`, `lib/db/collections.ts` (same function signatures as `lib/data/*`)
4. Create `lib/google-drive.ts`, `app/api/upload/route.ts`
5. Create `lib/auth.ts`, `app/api/auth/[...nextauth]/route.ts`, `middleware.ts`
6. Create product/collection API routes
7. Swap page imports from `lib/data/*` → `lib/db/*`
8. Build admin panel pages
9. Seed DB with existing products from `lib/data/products.ts`
10. Delete `lib/data/` once DB is verified
