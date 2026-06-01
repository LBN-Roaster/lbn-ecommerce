"use client";

import LogoSquare from "components/logo-square";
import type { Dictionary } from "lib/i18n/dictionaries/vi";
import type { Locale } from "lib/i18n";
import Link from "next/link";
import { Suspense, useState } from "react";
import MobileMenu from "./mobile-menu";
import { LanguageSwitcher } from "../language-switcher";

export function Navbar({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const mobileMenu = [
    { title: dict.nav.home, path: `/${locale}` },
    { title: dict.nav.coffeeRoasters, path: `/${locale}/search/may-rang-ca-phe` },
    { title: dict.nav.furniture, path: `/${locale}/search?area=noi-that` },
    { title: dict.nav.industrialKitchen, path: `/${locale}/search?area=bep-cong-nghiep` },
    { title: dict.nav.news, path: `/${locale}/news` },
    { title: dict.nav.contact, path: "tel:+84865112161" },
  ];

  const productItems = [
    { title: dict.nav.coffeeRoasters, path: `/${locale}/search/may-rang-ca-phe` },
    { title: dict.nav.furnitureFull, path: `/${locale}/search?area=noi-that` },
    { title: dict.nav.industrialKitchen, path: `/${locale}/search?area=bep-cong-nghiep` },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-md dark:border-neutral-800 dark:bg-black/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-6">
        <div className="block flex-none md:hidden">
          <Suspense fallback={null}>
            <MobileMenu menu={mobileMenu} />
          </Suspense>
        </div>

        <Link href={`/${locale}`} prefetch={true} className="flex items-center">
          <LogoSquare />
        </Link>

        <ul className="hidden items-center gap-8 text-sm md:flex">
          <li>
            <Link
              href={`/${locale}`}
              className="text-neutral-600 underline-offset-4 transition hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-white"
            >
              {dict.nav.home}
            </Link>
          </li>
          <ProductDropdown
            label={dict.nav.products}
            items={productItems}
          />
          <li>
            <Link
              href={`/${locale}/news`}
              className="text-neutral-600 underline-offset-4 transition hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-white"
            >
              {dict.nav.news}
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          <LanguageSwitcher locale={locale} />
          <a
            href="tel:+84865112161"
            className="group relative hidden overflow-hidden rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white md:block"
          >
            <span className="absolute -inset-x-2 -bottom-2 -top-12 translate-y-full rounded-t-[50%] bg-blue-800 transition-transform duration-500 ease-out group-hover:translate-y-0" />
            <span className="relative">(+84) 903596900</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

function ProductDropdown({
  label,
  items,
}: {
  label: string;
  items: { title: string; path: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <li
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="flex items-center gap-1 text-neutral-600 underline-offset-4 transition hover:text-black dark:text-neutral-400 dark:hover:text-white">
        {label}
        <svg
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19 9-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 pt-1">
          <ul className="min-w-[200px] overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-900">
            {items.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.path}
                  className="block px-4 py-3 text-sm text-neutral-600 transition hover:bg-neutral-50 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}
