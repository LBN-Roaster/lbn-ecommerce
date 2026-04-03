import type { Collection, Product } from "lib/types";
import { products } from "./products";
type CollectionDef = Collection & { productHandles: string[] };

const collections: CollectionDef[] = [
  {
    handle: "hidden-homepage-featured-items",
    title: "Featured",
    description: "",
    seo: { title: "Featured", description: "" },
    updatedAt: "2024-01-01T00:00:00Z",
    path: "/search/hidden-homepage-featured-items",
    productHandles: ["my-product"], // ← list product handles here
  },
];

export async function getCollection(
  handle: string,
): Promise<Collection | undefined> {
  const c = collections.find((c) => c.handle === handle);
  if (!c) return undefined;
  const { productHandles: _, ...rest } = c;
  return rest;
}

export async function getCollections(): Promise<Collection[]> {
  return collections
    .filter((c) => !c.handle.startsWith("hidden-"))
    .map(({ productHandles: _, ...rest }) => rest);
}

export async function getCollectionProducts({
  collection,
  sortKey,
  reverse,
}: {
  collection: string;
  sortKey?: string;
  reverse?: boolean;
}): Promise<Product[]> {
  const col = collections.find((c) => c.handle === collection);
  if (!col) return [];
  return products.filter((p) => col.productHandles.includes(p.handle));
}
