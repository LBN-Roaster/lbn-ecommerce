import Price from "components/price";
import { Product } from "lib/types";
import Link from "next/link";
import { VariantSelector } from "./variant-selector";

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-4xl font-medium">{product.title}</h1>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <div className="rounded-full bg-blue-600 p-2 text-sm text-white">
            <Price
              amount={product.priceRange.maxVariantPrice.amount}
              currencyCode={product.priceRange.maxVariantPrice.currencyCode}
            />
          </div>
          <Link
            href="https://zalo.me/lbncompany"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-black"
          >
            Liên hệ / Báo giá
          </Link>
        </div>
      </div>
      <VariantSelector options={product.options} variants={product.variants} />
      {/* <AddToCart product={product} /> */}
    </>
  );
}
