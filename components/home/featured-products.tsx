import { getCollectionProducts } from "lib/data/collections";
import { getProducts } from "lib/data/products";
import Image from "next/image";
import Link from "next/link";

function formatPrice(amount: string, currencyCode: string) {
  if (Number(amount) === 0) return "Liên Hệ";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: currencyCode,
  }).format(Number(amount));
}

export async function FeaturedProducts({ area }: { area?: string }) {
  const products = (
    !area || area === "may-rang"
      ? await getCollectionProducts({ collection: "hidden-homepage-featured-items" })
      : await getProducts({ tag: area })
  ).slice(0, 3);

  if (!products.length) return null;

  return (
    <section className="bg-neutral-50 py-20 dark:bg-neutral-900">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">
            Sản phẩm
          </p>
          <h2 className="text-3xl font-bold text-black md:text-4xl dark:text-white">
            Dòng sản phẩm nổi bật
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product.handle}
              href={`/product/${product.handle}`}
              className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white transition hover:border-blue-600 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-950"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                <Image
                  src={product.featuredImage?.url}
                  alt={product.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="mb-1 font-semibold text-black dark:text-white">
                  {product.title}
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {product.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-semibold text-blue-600">
                    {formatPrice(
                      product.priceRange.minVariantPrice.amount,
                      product.priceRange.minVariantPrice.currencyCode,
                    )}
                  </span>
                  <span className="text-xs font-medium text-neutral-400 transition group-hover:text-blue-600">
                    Xem chi tiết →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href={area ? `/search?area=${area}` : "/search"}
            className="inline-block rounded-lg border border-neutral-300 px-8 py-3 text-sm font-semibold transition hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
          >
            Xem tất cả sản phẩm
          </Link>
        </div>
      </div>
    </section>
  );
}
