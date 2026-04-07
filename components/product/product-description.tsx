import { Product } from "lib/types";
import Link from "next/link";
import { VariantPrice } from "./variant-price";
import { VariantSelector } from "./variant-selector";

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-4xl font-medium">{product.title}</h1>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <VariantPrice
            variants={product.variants}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
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
      {product.introHtml && (
        <>
          <hr className="my-6 border-neutral-200 dark:border-neutral-700" />
          <div
            className="prose prose-sm dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: product.introHtml }}
          />
        </>
      )}
      {/* <AddToCart product={product} /> */}
    </>
  );
}
