import type { Product } from "@/lib/types";
import fs from "fs";
import matter from "gray-matter";
import { marked } from "marked";
import path from "path";

const productsDir = path.join(process.cwd(), "lib/data/product-posts");

function readProduct(filename: string): Product {
  const raw = fs.readFileSync(path.join(productsDir, filename), "utf-8");
  const { data, content } = matter(raw);

  return {
    id: data.id,
    handle: data.handle,
    title: data.title,
    availableForSale: data.availableForSale ?? true,
    description: content.trim().split("\n")[0]?.replace(/^#+\s*/, "") ?? "",
    descriptionHtml: marked(content) as string,
    tags: data.tags ?? [],
    options: data.options ?? [],
    variants: (data.variants ?? []).map(
      (v: {
        id: string;
        title: string;
        availableForSale?: boolean;
        price: string;
        currencyCode: string;
        selectedOptions: { name: string; value: string }[];
      }) => ({
        id: v.id,
        title: v.title,
        availableForSale: v.availableForSale ?? true,
        selectedOptions: v.selectedOptions,
        price: { amount: v.price, currencyCode: v.currencyCode },
      }),
    ),
    featuredImage: data.featuredImage,
    images: data.images ?? [],
    priceRange: {
      minVariantPrice: {
        amount: data.minPrice,
        currencyCode: data.currencyCode,
      },
      maxVariantPrice: {
        amount: data.maxPrice,
        currencyCode: data.currencyCode,
      },
    },
    seo: {
      title: data.seoTitle ?? data.title,
      description: data.seoDescription ?? "",
    },
    updatedAt: data.updatedAt ?? new Date().toISOString(),
  };
}

export const products: Product[] = fs
  .readdirSync(productsDir)
  .filter((f) => f.endsWith(".md"))
  .map(readProduct);

export async function getProducts({
  query,
  sortKey,
  reverse,
}: {
  query?: string;
  sortKey?: string;
  reverse?: boolean;
} = {}): Promise<Product[]> {
  let result = [...products];
  if (query) {
    const q = query.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q),
    );
  }
  if (sortKey === "PRICE") {
    result.sort((a, b) => {
      const diff =
        parseFloat(a.priceRange.minVariantPrice.amount) -
        parseFloat(b.priceRange.minVariantPrice.amount);
      return reverse ? -diff : diff;
    });
  }
  return result;
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  return products.find((p) => p.handle === handle);
}

export async function getProductRecommendations(
  productId: string,
): Promise<Product[]> {
  return products.filter((p) => p.id !== productId).slice(0, 4);
}
