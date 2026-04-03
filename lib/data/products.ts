import type { Product } from "@/lib/types";
import fs from "fs";
import path from "path";

function loadHtml(filename: string): string {
  return fs.readFileSync(
    path.join(process.cwd(), "lib/data/html", filename),
    "utf-8",
  );
}

export const products: Product[] = [
  {
    id: "1",
    handle: "my-product",
    availableForSale: true,
    title: "Airlock",
    description: "A great product.",
    descriptionHtml: loadHtml("airlock.html"),
    options: [
      { id: "o1", name: "Màu", values: ["Đen", "Trắng", "Xanh Nhăn"] },
      {
        id: "o2",
        name: "Công Suất",
        values: ["6-15KG", "30-60KG"],
      },
    ],
    priceRange: {
      minVariantPrice: { amount: "15000000", currencyCode: "VND" },
      maxVariantPrice: { amount: "15000000", currencyCode: "VND" },
    },
    variants: [
      {
        id: "v1",
        title: "Đen",
        availableForSale: true,
        selectedOptions: [
          { name: "Màu", value: "Đen" },
          { name: "Công Suất", value: "6-15KG" },
        ],
        price: { amount: "15000000 ", currencyCode: "VND" },
      },
    ],
    featuredImage: {
      url: "/images/airlock.png",
      altText: "My Product",
      width: 800,
      height: 800,
    },
    images: [
      {
        url: "/images/airlock1.png",
        altText: "My Product",
        width: 800,
        height: 800,
      },
      {
        url: "/images/airlock2.png",
        altText: "View 1",
        width: 800,
        height: 800,
      },
      {
        url: "/images/airlock3.png",
        altText: "View 2",
        width: 800,
        height: 800,
      },
      {
        url: "/images/airlock4.png",
        altText: "View 3",
        width: 800,
        height: 800,
      },
    ],
    seo: { title: "My Product", description: "A great product." },
    tags: [],
    updatedAt: "2024-01-01T00:00:00Z",
  },
  // TODO: Add more products here for testing purposes
];

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
  if (sortKey == "PRICE") {
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
  // For simplicity, just return the first 4 products that are not the current product
  return products.filter((p) => p.id !== productId).slice(0, 4);
}
