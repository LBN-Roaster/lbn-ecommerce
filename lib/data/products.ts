import type { Product } from "@/lib/types";

export const products: Product[] = [
  {
    id: "1",
    handle: "my-product",
    availableForSale: true,
    title: "My Product",
    description: "A great product.",
    descriptionHtml: "<p>A great product.</p>",
    options: [{ id: "o1", name: "Size", values: ["S", "M", "L"] }],
    priceRange: {
      minVariantPrice: { amount: "29.00", currencyCode: "USD" },
      maxVariantPrice: { amount: "29.00", currencyCode: "USD" },
    },
    variants: [
      {
        id: "v1",
        title: "S",
        availableForSale: true,
        selectedOptions: [{ name: "Size", value: "S" }],
        price: { amount: "29.00", currencyCode: "USD" },
      },
    ],
    featuredImage: {
      url: "/placeholder.jpg",
      altText: "My Product",
      width: 800,
      height: 800,
    },
    images: [
      {
        url: "/placeholder.jpg",
        altText: "My Product",
        width: 800,
        height: 800,
      },
    ],
    seo: { title: "My Product", description: "A great product." },
    tags: [],
    updatedAt: "2024-01-01T00:00:00Z",
    createdAt: "2024-01-01T00:00:00Z",
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
