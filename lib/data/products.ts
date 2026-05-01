import type { Product } from "@/lib/types";
import fs from "fs";
import matter from "gray-matter";
import { marked } from "marked";
import path from "path";

const productsDir = path.join(process.cwd(), "lib/data/product-posts");

function getMdFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return getMdFiles(full);
    return entry.name.endsWith(".md") ? [full] : [];
  });
}

function readProduct(filename: string): Product {
  const raw = fs.readFileSync(filename, "utf-8");
  const { data, content } = matter(raw);

  const SPLIT_MARKER = "<!-- split -->";
  const splitIndex = content.indexOf(SPLIT_MARKER);
  const introPart =
    splitIndex !== -1 ? content.slice(0, splitIndex).trim() : "";
  const detailsPart =
    splitIndex !== -1
      ? content.slice(splitIndex + SPLIT_MARKER.length).trim()
      : content.trim();

  return {
    id: data.id,
    handle: data.handle,
    title: data.title,
    availableForSale: data.availableForSale ?? true,
    description:
      content
        .trim()
        .split("\n")[0]
        ?.replace(/^#+\s*/, "") ?? "",
    introHtml: introPart ? (marked(introPart) as string) : "",
    descriptionHtml: marked(detailsPart) as string,
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
        images?: {
          url: string;
          altText?: string;
          width?: number;
          height?: number;
        }[];
      }) => ({
        id: v.id,
        title: v.title,
        availableForSale: v.availableForSale ?? true,
        selectedOptions: v.selectedOptions,
        price: { amount: v.price, currencyCode: v.currencyCode },
        images: v.images?.map((img) => ({
          url: img.url,
          altText: img.altText ?? "",
          width: img.width ?? 800,
          height: img.height ?? 800,
        })),
      }),
    ),
    featuredImage: {
      url: data.featuredImage?.url ?? "",
      altText: data.featuredImage?.altText ?? "",
      width: data.featuredImage?.width ?? 800,
      height: data.featuredImage?.height ?? 800,
    },
    images: (data.images ?? []).map(
      (img: {
        url: string;
        altText?: string;
        width?: number;
        height?: number;
      }) => ({
        url: img.url,
        altText: img.altText ?? "",
        width: img.width ?? 800,
        height: img.height ?? 800,
      }),
    ),
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

export const products: Product[] = getMdFiles(productsDir)
  .filter((f) => {
    const raw = fs.readFileSync(f, "utf-8");
    const { data } = matter(raw);
    return !data.draft;
  })
  .map(readProduct);

export async function getProducts({
  query,
  sortKey,
  reverse,
  tag,
}: {
  query?: string;
  sortKey?: string;
  reverse?: boolean;
  tag?: string;
} = {}): Promise<Product[]> {
  let result = [...products];
  if (tag) {
    result = result.filter((p) => p.tags.includes(tag));
  }
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
  tags?: string[],
): Promise<Product[]> {
  return products
    .filter((p) => p.id !== productId)
    .filter((p) => !tags?.length || p.tags.some((t) => tags.includes(t)))
    .slice(0, 4);
}
