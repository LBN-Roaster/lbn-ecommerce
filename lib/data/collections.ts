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
    productHandles: ["1.5-CL-roaster", "3-CL-roaster", "6-CL-roaster"],
  },
  {
    handle: "may-rang-ca-phe",
    title: "Máy rang cà phê",
    description: "Các dòng máy rang cà phê chuyên nghiệp",
    seo: { title: "Máy rang cà phê", description: "Các dòng máy rang cà phê chuyên nghiệp" },
    updatedAt: "2024-01-01T00:00:00Z",
    path: "/search/may-rang-ca-phe",
    area: "may-rang",
    productHandles: [
      "1.5-CL-roaster",
      "1.5-MD-roaster",
      "15-MD-roaster",
      "3-CL-roaster",
      "3-MD-roaster",
      "6-CL-roaster",
      "MA-HR3.0-BT",
      "MA-HR6.0-BT",
    ],
  },
  {
    handle: "may-va-dung-cu-lien-quan",
    title: "Máy & dụng cụ liên quan",
    description: "Các máy và dụng cụ hỗ trợ rang cà phê",
    seo: { title: "Máy & dụng cụ liên quan", description: "Các máy và dụng cụ hỗ trợ rang cà phê" },
    updatedAt: "2024-01-01T00:00:00Z",
    path: "/search/may-va-dung-cu-lien-quan",
    area: "may-rang",
    productHandles: ["destoner", "after-burner", "airlock"],
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
