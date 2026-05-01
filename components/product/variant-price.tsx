"use client";

import Price from "components/price";
import type { ProductVariant } from "lib/types";
import { useSearchParams } from "next/navigation";

function formatAmount(amount: string, currencyCode: string) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currencyCode,
    currencyDisplay: "narrowSymbol",
  }).format(parseFloat(amount));
}

export function VariantPrice({
  variants,
  currencyCode,
  fallbackAmount,
  maxAmount,
}: {
  variants: ProductVariant[];
  currencyCode: string;
  fallbackAmount?: string;
  maxAmount?: string;
}) {
  const searchParams = useSearchParams();

  const activeVariant = variants.find((variant) =>
    variant.selectedOptions.every(
      (option) => searchParams.get(option.name.toLowerCase()) === option.value,
    ),
  );

  const price =
    activeVariant?.price.amount ?? variants[0]?.price.amount ?? fallbackAmount;
  const currency = activeVariant?.price.currencyCode ?? currencyCode;

  if (!price || price === "0") return null;

  const showRange =
    !activeVariant && maxAmount && maxAmount !== "0" && maxAmount !== price;

  return (
    <div className="rounded-full bg-blue-600 p-2 text-sm text-white">
      {showRange ? (
        <span>
          {formatAmount(price, currency)} – {formatAmount(maxAmount, currency)}
        </span>
      ) : (
        <Price amount={price} currencyCode={currency} />
      )}
    </div>
  );
}
