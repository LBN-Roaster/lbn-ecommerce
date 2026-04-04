import Image from "next/image";

const images = [
  {
    src: "https://lbn.com.vn/wp-content/uploads/2025/06/i25_06_28_1103-scaled.png",
    alt: "Máy rang cà phê LBN",
  },
  { src: "/images/airlock1.png", alt: "Chi tiết máy rang" },
  { src: "/images/airlock2.png", alt: "Hệ thống điều khiển" },
  { src: "/images/airlock3.png", alt: "Buồng rang" },
  { src: "/images/airlock4.png", alt: "Xưởng sản xuất LBN" },
];

export function GallerySection() {
  return (
    <section className="bg-neutral-50 py-20 dark:bg-neutral-900">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">
            Thư viện ảnh
          </p>
          <h2 className="text-3xl font-bold text-black md:text-4xl dark:text-white">
            Hình ảnh sản phẩm
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {images.map((img) => (
            <div
              key={img.src}
              className="relative aspect-square overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
