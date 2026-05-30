import Footer from "components/layout/footer";
import { Navbar } from "components/layout/navbar";
import { getDictionary, isLocale, locales, type Locale } from "lib/i18n";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale as Locale);

  return (
    <>
      <Navbar dict={dict} locale={locale} />
      {children}
      <Footer dict={dict} locale={locale} />
    </>
  );
}
