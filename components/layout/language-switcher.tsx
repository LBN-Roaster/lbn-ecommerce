"use client";

import type { Locale } from "lib/i18n";
import { usePathname } from "next/navigation";
import Link from "next/link";

const labels: Record<Locale, string> = {
  vi: "VI",
  en: "EN",
};

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const otherLocale: Locale = locale === "vi" ? "en" : "vi";
  const newPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  return (
    <Link
      href={newPath}
      className="flex items-center gap-1 rounded-lg border border-neutral-200 px-2.5 py-1.5 text-xs font-medium text-neutral-600 transition hover:border-blue-600 hover:text-blue-600 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-blue-500 dark:hover:text-blue-500"
    >
      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A8.966 8.966 0 0 1 3 12c0-1.264.26-2.467.732-3.558" />
      </svg>
      {labels[otherLocale]}
    </Link>
  );
}
