import Collections from "components/layout/search/collections";
import FilterList from "components/layout/search/filter";
import { getDictionary, type Locale } from "lib/i18n";
import { Suspense } from "react";
import ChildrenWrapper from "./children-wrapper";

export default async function SearchLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);

  const sortingList = [
    {
      title: dict.sorting.relevance,
      slug: null,
      sortKey: "RELEVANCE" as const,
      reverse: false,
    },
    {
      title: dict.sorting.trending,
      slug: "trending-desc",
      sortKey: "BEST_SELLING" as const,
      reverse: false,
    },
    {
      title: dict.sorting.latest,
      slug: "latest-desc",
      sortKey: "CREATED_AT" as const,
      reverse: true,
    },
    {
      title: dict.sorting.priceAsc,
      slug: "price-asc",
      sortKey: "PRICE" as const,
      reverse: false,
    },
    {
      title: dict.sorting.priceDesc,
      slug: "price-desc",
      sortKey: "PRICE" as const,
      reverse: true,
    },
  ];

  return (
    <>
      <div className="mx-auto flex max-w-(--breakpoint-2xl) flex-col gap-8 px-4 pb-4 text-black md:flex-row dark:text-white">
        <div className="order-first w-full flex-none md:max-w-[125px]">
          <Collections locale={locale as Locale} dict={dict} />
        </div>
        <div className="order-last min-h-screen w-full md:order-none">
          <Suspense fallback={null}>
            <ChildrenWrapper>{children}</ChildrenWrapper>
          </Suspense>
        </div>
        <div className="order-none flex-none md:order-last md:w-[125px]">
          <FilterList list={sortingList} title={dict.search.sortBy} />
        </div>
      </div>
    </>
  );
}
