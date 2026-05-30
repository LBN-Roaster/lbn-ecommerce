import { getCollection, getCollectionProducts } from "lib/data/collections";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import Grid from "components/grid";
import ProductGridItems from "components/layout/product-grid-items";
import { defaultSort, sorting } from "lib/constants";
import { getDictionary, type Locale } from "lib/i18n";

export async function generateMetadata(props: {
  params: Promise<{ locale: string; collection: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const locale = params.locale as Locale;
  const collection = await getCollection(params.collection, locale);

  if (!collection) return notFound();

  return {
    title: collection.seo?.title || collection.title,
    description:
      collection.seo?.description ||
      collection.description ||
      `${collection.title} products`,
  };
}

export default async function CategoryPage(props: {
  params: Promise<{ locale: string; collection: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const locale = params.locale as Locale;
  const dict = getDictionary(locale);
  const { sort } = searchParams as { [key: string]: string };
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;
  const products = await getCollectionProducts({
    collection: params.collection,
    sortKey,
    reverse,
    locale,
  });

  return (
    <section>
      {products.length === 0 ? (
        <p className="py-3 text-lg">{dict.search.noCollection}</p>
      ) : (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} locale={locale} />
        </Grid>
      )}
    </section>
  );
}
