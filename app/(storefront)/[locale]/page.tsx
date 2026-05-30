import { BusinessAreas } from "components/home/business-areas";
import { FeaturedProducts } from "components/home/featured-products";
import { GallerySection } from "components/home/gallery";
import { HeroSection } from "components/home/hero";
import { JourneySection } from "components/home/journey";
import { MachineDetails } from "components/home/machine-details";
import { NewsSection } from "components/home/news";
import { getDictionary, type Locale } from "lib/i18n";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  return {
    title: dict.metadata.homeTitle,
    description: dict.metadata.homeDescription,
    openGraph: { type: "website" },
  };
}

export default async function HomePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ area?: string }>;
}) {
  const { locale } = await params;
  const { area } = await searchParams;
  const dict = getDictionary(locale as Locale);
  return (
    <>
      <HeroSection dict={dict} locale={locale as Locale} />
      <Suspense fallback={null}>
        <BusinessAreas dict={dict} />
      </Suspense>
      <JourneySection area={area} dict={dict} />
      <MachineDetails area={area} dict={dict} />
      <FeaturedProducts area={area} dict={dict} locale={locale as Locale} />
      <NewsSection dict={dict} locale={locale as Locale} />
      <GallerySection dict={dict} />
    </>
  );
}
