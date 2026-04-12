export type SortFilterItem = {
  title: string;
  slug: string | null;
  sortKey: "RELEVANCE" | "BEST_SELLING" | "CREATED_AT" | "PRICE";
  reverse: boolean;
};

export const defaultSort: SortFilterItem = {
  title: "Liên quan",
  slug: null,
  sortKey: "RELEVANCE",
  reverse: false,
};

export const sorting: SortFilterItem[] = [
  defaultSort,
  {
    title: "Phổ biến",
    slug: "trending-desc",
    sortKey: "BEST_SELLING",
    reverse: false,
  },
  {
    title: "Mới nhất",
    slug: "latest-desc",
    sortKey: "CREATED_AT",
    reverse: true,
  },
  {
    title: "Giá tăng dần",
    slug: "price-asc",
    sortKey: "PRICE",
    reverse: false,
  },
  {
    title: "Giá giảm dần",
    slug: "price-desc",
    sortKey: "PRICE",
    reverse: true,
  },
];

export const TAGS = {
  collections: "Bộ sưu tập",
  products: "products",
  cart: "cart",
};

export const HIDDEN_PRODUCT_TAG = "nextjs-frontend-hidden";
export const DEFAULT_OPTION = "Default Title";
// export const SHOPIFY_GRAPHQL_API_ENDPOINT = "/api/2023-01/graphql.json";
