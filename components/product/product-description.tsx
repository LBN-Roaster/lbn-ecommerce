import type { Dictionary } from "lib/i18n/dictionaries/vi";
import { Product } from "lib/types";
import Link from "next/link";
import { VariantPrice } from "./variant-price";
import { VariantSelector } from "./variant-selector";

export function ProductDescription({
  product,
  dict,
}: {
  product: Product;
  dict: Dictionary;
}) {
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-4xl font-medium">{product.title}</h1>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <VariantPrice
            variants={product.variants}
            currencyCode={product.priceRange.minVariantPrice.currencyCode}
            fallbackAmount={product.priceRange.minVariantPrice.amount}
            maxAmount={product.priceRange.maxVariantPrice.amount}
          />
          <Link
            href="https://zalo.me/lbncompany"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-full border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 dark:border-blue-400 dark:text-blue-400"
          >
            <span className="absolute -inset-x-2 -bottom-2 -top-12 translate-y-full rounded-t-[50%] bg-blue-600 transition-transform duration-500 ease-out group-hover:translate-y-0 dark:bg-blue-400" />
            <span className="relative group-hover:text-white dark:group-hover:text-black">
              {dict.product.contactQuote}
            </span>
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
    </>
  );
}
