import { BusinessAreas } from "components/home/business-areas";
import { FeaturedProducts } from "components/home/featured-products";
import { GallerySection } from "components/home/gallery";
import { HeroSection } from "components/home/hero";
import { JourneySection } from "components/home/journey";
import { NewsSection } from "components/home/news";
import Footer from "components/layout/footer";

export const metadata = {
  title: "LBN - Máy rang cà phê, Nội thất & Bếp công nghiệp",
  description: "Công ty Cổ phần Sản xuất – Thương mại – Dịch vụ LBN",
  openGraph: { type: "website" },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BusinessAreas />
      <JourneySection />
      <FeaturedProducts />
      <NewsSection />
      <GallerySection />
      <Footer />
    </>
  );
}
