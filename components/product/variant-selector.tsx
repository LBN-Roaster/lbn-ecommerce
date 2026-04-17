"use client";

import clsx from "clsx";
import { getColor } from "lib/color-map";
import type { ProductOption, ProductVariant } from "lib/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean;
};

export function VariantSelector({
  options,
  variants,
}: {
  options: ProductOption[];
  variants: ProductVariant[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasNoOptionsOrJustOneOption =
    !options.length ||
    (options.length === 1 && options[0]?.values.length === 1);

  // Set default option params on first load if none are present
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    let changed = false;
    for (const option of options) {
      const key = option.name.toLowerCase();
      if (!params.has(key) && option.values[0]) {
        params.set(key, option.values[0]);
        changed = true;
      }
    }
    if (changed) {
      params.set("image", "0");
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, []);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({
        ...accumulator,
        [option.name.toLowerCase()]: option.value,
      }),
      {},
    ),
  }));

  const updateOption = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    // Reset to first image whenever the variant selection changes
    params.set("image", "0");
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return options.map((option) => (
    <form key={option.id}>
      <dl className="mb-8">
        <dt className="mb-4 text-sm uppercase tracking-wide">{option.name}</dt>
        <dd className="flex flex-wrap gap-3">
          {option.values.map((value) => {
            const optionNameLowerCase = option.name.toLowerCase();

            // Base option params on current searchParams so we can preserve any other param state.
            const optionParams: Record<string, string> = {};
            searchParams.forEach((v, k) => (optionParams[k] = v));
            optionParams[optionNameLowerCase] = value;

            // Filter out invalid options and check if the option combination is available for sale.
            const filtered = Object.entries(optionParams).filter(
              ([key, value]) =>
                options.find(
                  (option) =>
                    option.name.toLowerCase() === key &&
                    option.values.includes(value),
                ),
            );
            const isAvailableForSale = combinations.find((combination) =>
              filtered.every(
                ([key, value]) =>
                  combination[key] === value && combination.availableForSale,
              ),
            );

            // The option is active if it's in the selected options, defaulting to the first value.
            const isActive =
              (searchParams.get(optionNameLowerCase) ?? option.values[0]) ===
              value;

            const cssColor = getColor(value);
            const isColorSwatch = !!cssColor;

            return (
              <button
                formAction={() => updateOption(optionNameLowerCase, value)}
                key={value}
                aria-disabled={!isAvailableForSale}
                disabled={!isAvailableForSale}
                title={value}
                className={clsx(
                  "flex items-center justify-center rounded-full border transition duration-300 ease-in-out",
                  isColorSwatch
                    ? "h-8 w-8"
                    : "min-w-[48px] bg-neutral-100 px-2 py-1 text-sm dark:border-neutral-800 dark:bg-neutral-900",
                  {
                    "cursor-default ring-2 ring-blue-600": isActive,
                    "ring-1 ring-transparent hover:ring-blue-600":
                      !isActive && isAvailableForSale,
                    "relative z-10 cursor-not-allowed overflow-hidden text-neutral-500 ring-1 ring-neutral-300 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform dark:text-neutral-400 dark:ring-neutral-700 dark:before:bg-neutral-700":
                      !isAvailableForSale && !isColorSwatch,
                  },
                )}
                style={isColorSwatch ? { backgroundColor: cssColor } : undefined}
              >
                {!isColorSwatch && value}
              </button>
            );
          })}
        </dd>
      </dl>
    </form>
  ));
}
