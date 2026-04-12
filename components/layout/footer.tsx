import Link from "next/link";
import LogoSquare from "components/logo-square";

const { COMPANY_NAME, SITE_NAME } = process.env;

const navLinks = [
  { title: "Trang chủ", path: "/" },
  { title: "Sản phẩm", path: "/search" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://facebook.com/lbn.com.vn",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@lbnvietnam",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "Zalo",
    href: "https://zalo.me/0865112161",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.441 16.158c-.34.479-.937.592-1.416.252l-2.379-1.687c-.269-.19-.618-.19-.886 0l-2.38 1.687c-.478.34-1.075.227-1.415-.252a1.01 1.01 0 0 1 .252-1.415l1.687-1.196c.269-.19.269-.575 0-.765L9.217 11.59a1.01 1.01 0 0 1-.252-1.415c.34-.479.937-.593 1.415-.252l2.38 1.687c.268.19.617.19.886 0l2.379-1.687c.479-.341 1.076-.227 1.416.252.34.478.226 1.075-.252 1.415l-1.687 1.197c-.269.19-.269.575 0 .765l1.687 1.196c.478.34.592.937.252 1.41z" />
      </svg>
    ),
  },
];

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : "");
  const copyrightName = COMPANY_NAME || SITE_NAME || "LBN";

  return (
    <footer className="text-sm text-neutral-500 dark:text-neutral-400">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 border-t border-neutral-200 px-4 py-12 md:flex-row md:gap-16 min-[1320px]:px-0 dark:border-neutral-700">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <Link
            className="flex items-center gap-2 text-black dark:text-white"
            href="/"
          >
            <LogoSquare size="sm" />
            {/* <span className="font-semibold uppercase">{SITE_NAME}</span> */}
          </Link>
          <p className="max-w-xs text-neutral-500 dark:text-neutral-400">
            Công ty Cổ phần Sản xuất – Thương mại – Dịch vụ LBN.
            Chuyên sản xuất máy rang cà phê và thiết bị công nghiệp tại Khánh Hòa.
          </p>
          <div className="flex gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 transition hover:border-blue-600 hover:text-blue-600 dark:border-neutral-700 dark:hover:border-blue-500 dark:hover:text-blue-500"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Nav */}
        <div className="flex flex-col gap-3">
          <p className="font-semibold text-black dark:text-white">Liên kết</p>
          {navLinks.map((link) => (
            <Link
              key={link.title}
              href={link.path}
              className="hover:text-black dark:hover:text-white"
            >
              {link.title}
            </Link>
          ))}
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-3 md:ml-auto">
          <p className="font-semibold text-black dark:text-white">Liên hệ</p>
          <p>Lô 24 CCN Diên Phú, xã Diên Điền, Khánh Hòa</p>
          <a
            href="tel:+84865112161"
            className="hover:text-black dark:hover:text-white"
          >
            (+84) 903596900 
          </a>
          <a
            href="mailto:info@lbn.com.vn"
            className="hover:text-black dark:hover:text-white"
          >
            info@lbn.com.vn
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-200 py-6 dark:border-neutral-700">
        <div className="mx-auto flex w-full max-w-7xl items-center px-4 min-[1320px]:px-0">
          <p>
            &copy; {copyrightDate} {copyrightName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
