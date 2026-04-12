"use client";

import LogoSquare from "components/logo-square";
import Link from "next/link";
import { Suspense, useState } from "react";
import MobileMenu from "./mobile-menu";

const mobileMenu = [
  { title: "Trang chủ", path: "/" },
  { title: "Máy rang cà phê", path: "/search?area=may-rang" },
  { title: "Bếp công nghiệp", path: "/search?area=bep-cong-nghiep" },
  { title: "Nội thất", path: "/search?area=noi-that" },
  { title: "Tin tức", path: "/news" },
  { title: "Liên hệ", path: "tel:+84865112161" },
];

const productItems = [
  { title: "Máy rang cà phê", path: "/search?area=may-rang" },
  { title: "Bếp công nghiệp", path: "/search?area=bep-cong-nghiep" },
  { title: "Nội thất gỗ – thép", path: "/search?area=noi-that" },
];

function ProductDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <li
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="flex items-center gap-1 text-neutral-600 underline-offset-4 transition hover:text-black dark:text-neutral-400 dark:hover:text-white">
        Sản phẩm
        <svg
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 pt-1">
          <ul className="min-w-[200px] overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-900">
            {productItems.map((item) => (
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

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-md dark:border-neutral-800 dark:bg-black/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-6">
        {/* Mobile hamburger */}
        <div className="block flex-none md:hidden">
          <Suspense fallback={null}>
            <MobileMenu menu={mobileMenu} />
          </Suspense>
        </div>

        {/* Logo */}
        <Link href="/" prefetch={true} className="flex items-center">
          <LogoSquare />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 text-sm md:flex">
          <li>
            <Link
              href="/"
              className="text-neutral-600 underline-offset-4 transition hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-white"
            >
              Trang chủ
            </Link>
          </li>
          <ProductDropdown />
          <li>
            <Link
              href="/news"
              className="text-neutral-600 underline-offset-4 transition hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-white"
            >
              Tin tức
            </Link>
          </li>
        </ul>

        {/* CTA */}
        <a
          href="tel:+84865112161"
          className="hidden rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 md:block"
        >
          (+84) 0865.112.161
        </a>
      </div>
    </nav>
  );
}
