import { BusinessAreas } from "components/home/business-areas";
import { FeaturedProducts } from "components/home/featured-products";
import { GallerySection } from "components/home/gallery";
import { HeroSection } from "components/home/hero";
import { JourneySection } from "components/home/journey";
import { MachineDetails } from "components/home/machine-details";
import { NewsSection } from "components/home/news";
import Footer from "components/layout/footer";
import { Suspense } from "react";

export const metadata = {
  title: "LBN - Máy rang cà phê, Nội thất & Bếp công nghiệp",
  description: "Công ty Cổ phần Sản xuất – Thương mại – Dịch vụ LBN",
  openGraph: { type: "website" },
};

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ area?: string }>;
}) {
  const { area } = await searchParams;
  return (
    <>
      <HeroSection />
      <Suspense fallback={null}>
        <BusinessAreas />
      </Suspense>
      <JourneySection area={area} />
      <MachineDetails area={area} />
      <FeaturedProducts area={area} />
      <NewsSection />
      <GallerySection />
      <Footer />
    </>
  );
}
