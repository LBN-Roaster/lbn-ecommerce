import clsx from "clsx";
import { Suspense } from "react";

import { getCollections } from "lib/data/collections";
import type { Dictionary } from "lib/i18n/dictionaries/vi";
import type { Locale } from "lib/i18n";
import CollectionListClient from "./collection-list-client";

async function CollectionList({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const collections = await getCollections(locale);
  return (
    <CollectionListClient
      collections={collections}
      collectionsLabel={dict.search.collections}
    />
  );
}

const skeleton = "mb-3 h-4 w-5/6 animate-pulse rounded-sm";
const activeAndTitles = "bg-neutral-800 dark:bg-neutral-300";
const items = "bg-neutral-400 dark:bg-neutral-700";

export default function Collections({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <Suspense
      fallback={
        <div className="col-span-2 hidden h-[400px] w-full flex-none py-4 lg:block">
          <div className={clsx(skeleton, activeAndTitles)} />
          <div className={clsx(skeleton, activeAndTitles)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
        </div>
      }
    >
      <CollectionList locale={locale} dict={dict} />
    </Suspense>
  );
}
