import clsx from "clsx";
import Price from "./price";

function formatAmount(amount: string, currencyCode: string) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currencyCode,
    currencyDisplay: "narrowSymbol",
  }).format(parseFloat(amount));
}

const Label = ({
  title,
  amount,
  minAmount,
  currencyCode,
  position = "bottom",
}: {
  title: string;
  amount: string;
  minAmount?: string;
  currencyCode: string;
  position?: "bottom" | "center";
}) => {
  const hasRange =
    minAmount && minAmount !== "0" && amount !== "0" && minAmount !== amount;

  return (
    <div
      className={clsx(
        "absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label",
        {
          "lg:px-20 lg:pb-[35%]": position === "center",
        },
      )}
    >
      <div className="flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
        <h3 className="mr-4 line-clamp-2 grow pl-2 leading-none tracking-tight">
          {title}
        </h3>
        {amount === "0" ? (
          <span className="flex-none rounded-full bg-blue-600 p-2 text-white">
            Liên hệ
          </span>
        ) : hasRange ? (
          <span className="flex-none rounded-full bg-blue-600 p-2 text-white">
            {formatAmount(minAmount, currencyCode)} –{" "}
            {formatAmount(amount, currencyCode)}
          </span>
        ) : (
          <Price
            className="flex-none rounded-full bg-blue-600 p-2 text-white"
            amount={amount}
            currencyCode={currencyCode}
            currencyCodeClassName="hidden @[275px]/label:inline"
          />
        )}
      </div>
    </div>
  );
};

export default Label;
