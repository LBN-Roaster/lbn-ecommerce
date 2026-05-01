const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,
});

const VI_DATE = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export function formatVND(amount: number): string {
  return VND.format(amount);
}

export function formatVNDCompact(amount: number): string {
  if (amount >= 1_000_000_000) {
    const v = amount / 1_000_000_000;
    return `${v % 1 === 0 ? v.toFixed(0) : v.toFixed(1)}B ₫`;
  }
  if (amount >= 1_000_000) return `${Math.round(amount / 1_000_000)}M ₫`;
  if (amount >= 1_000) return `${Math.round(amount / 1_000)}K ₫`;
  return `${amount} ₫`;
}

export function formatDate(iso: string): string {
  return VI_DATE.format(new Date(iso));
}
