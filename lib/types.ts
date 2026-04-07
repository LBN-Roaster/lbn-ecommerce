export type Image = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

export type Money = {
  amount: string;
  currencyCode: string;
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: { name: string; value: string }[];
  price: Money;
  images?: Image[];
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type Product = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  introHtml: string;
  availableForSale: boolean;
  tags: string[];
  options: ProductOption[];
  variants: ProductVariant[];
  images: Image[];
  featuredImage: Image;
  priceRange: { minVariantPrice: Money; maxVariantPrice: Money };
  seo: { title: string; description: string };
  updatedAt: string;
};

export type Collection = {
  handle: string;
  title: string;
  description: string;
  seo: { title: string; description: string };
  updatedAt: string;
  path: string;
};

export type SortFilterItem = {
  title: string;
  slug: string | null;
  sortKey: "RELEVANCE" | "BEST_SELLING" | "CREATED_AT" | "PRICE";
  reverse: boolean;
};
