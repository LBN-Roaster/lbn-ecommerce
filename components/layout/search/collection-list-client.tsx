"use client";

import type { Collection } from "lib/types";
import { usePathname, useSearchParams } from "next/navigation";
import FilterList from "./filter";

const DEFAULT_HANDLE_BY_AREA: Record<string, string> = {
  "may-rang": "may-rang-ca-phe",
};

export default function CollectionListClient({
  collections,
}: {
  collections: Collection[];
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const areaParam = searchParams.get("area");

  // When on a /search/[collection] page, infer area from that collection
  const pathCollection = collections.find((c) => c.path === pathname);
  const effectiveArea = areaParam ?? pathCollection?.area;

  const filtered = effectiveArea
    ? collections.filter((c) => c.area === effectiveArea)
    : collections;

  const defaultHandle = effectiveArea
    ? DEFAULT_HANDLE_BY_AREA[effectiveArea]
    : undefined;
  const defaultTitle = filtered.find((c) => c.handle === defaultHandle)?.title;

  if (filtered.length === 0) return null;

  return (
    <FilterList
      list={filtered}
      title="Bộ sưu tập"
      defaultTitle={defaultTitle}
    />
  );
}
