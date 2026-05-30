import Grid from "components/grid";
import ProductGridItems from "components/layout/product-grid-items";
import { defaultSort, sorting } from "lib/constants";
import { getProducts } from "lib/data/products";
import { getDictionary, type Locale } from "lib/i18n";

export const metadata = {
  title: "Search",
  description: "Search for products in the store.",
};

export default async function SearchPage(props: {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale } = await props.params;
  const dict = getDictionary(locale as Locale);
  const searchParams = await props.searchParams;
  const {
    sort,
    q: searchValue,
    area,
  } = searchParams as { [key: string]: string };
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  const products = await getProducts({
    sortKey,
    reverse,
    query: searchValue,
    tag: area,
    locale: locale as Locale,
  });
  const resultsText =
    products.length > 1 ? dict.search.results : dict.search.result;

  return (
    <>
      {searchValue ? (
        <p className="mb-4">
          {products.length === 0
            ? `${dict.search.noProducts}`
            : `${dict.search.showing} ${products.length} ${resultsText} ${dict.search.for} `}
          <span className="font-bold">&quot;{searchValue}&quot;</span>
        </p>
      ) : null}
      {products.length > 0 ? (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} locale={locale as Locale} />
        </Grid>
      ) : null}
    </>
  );
}
