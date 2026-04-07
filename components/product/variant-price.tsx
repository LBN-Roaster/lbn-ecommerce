"use client";

import Price from "components/price";
import type { ProductVariant } from "lib/types";
import { useSearchParams } from "next/navigation";

export function VariantPrice({
  variants,
  currencyCode,
}: {
  variants: ProductVariant[];
  currencyCode: string;
}) {
  const searchParams = useSearchParams();

  const activeVariant = variants.find((variant) =>
    variant.selectedOptions.every(
      (option) =>
        searchParams.get(option.name.toLowerCase()) === option.value,
    ),
  );

  const price = activeVariant?.price.amount ?? variants[0]?.price.amount;
  const currency =
    activeVariant?.price.currencyCode ?? currencyCode;

  if (!price || price === "0") return null;

  return (
    <div className="rounded-full bg-blue-600 p-2 text-sm text-white">
      <Price amount={price} currencyCode={currency} />
    </div>
  );
}
