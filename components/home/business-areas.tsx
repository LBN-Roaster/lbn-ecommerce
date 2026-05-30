"use client";

import type { Dictionary } from "lib/i18n/dictionaries/vi";
import { useRouter, useSearchParams } from "next/navigation";

const areaKeys = ["may-rang", "noi-that", "bep-cong-nghiep"] as const;

const icons: Record<string, React.ReactNode> = {
  "may-rang": (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.485-8.485-.707.707M4.222 4.222l-.707.707M21 12h-1M4 12H3m15.364 6.364-.707-.707M6.343 6.343l-.707-.707M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  ),
  "noi-that": (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  ),
  "bep-cong-nghiep": (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
    </svg>
  ),
};

export function BusinessAreas({ dict }: { dict: Dictionary }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selected = searchParams.get("area") ?? "may-rang";

  const setArea = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("area", key);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <section className="border-y border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">
            {dict.businessAreas.label}
          </p>
          <h2 className="text-3xl font-bold text-black md:text-4xl dark:text-white">
            {dict.businessAreas.heading}
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {areaKeys.map((key) => {
            const area = dict.businessAreas.areas[key];
            const isActive = selected === key;
            return (
              <button
                key={key}
                onClick={() => setArea(key)}
                className={`group rounded-2xl border p-8 text-left transition hover:shadow-lg ${
                  isActive
                    ? "border-blue-600 bg-blue-50 dark:bg-blue-950"
                    : "border-neutral-200 hover:border-blue-600 dark:border-neutral-800"
                }`}
              >
                <div
                  className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-950 dark:text-blue-400"
                  }`}
                >
                  {icons[key]}
                </div>
                <h3
                  className={`mb-2 text-lg font-semibold ${isActive ? "text-blue-700 dark:text-blue-300" : "text-black dark:text-white"}`}
                >
                  {area.title}
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {area.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
