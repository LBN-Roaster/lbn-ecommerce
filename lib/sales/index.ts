import salesData from "@/data/sales.json";
import type { LocationEntry, MonthBucket, Sale, Totals } from "./types";

const SALES = salesData as Sale[];

function ymKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function locationKey(loc: { lat: number; lng: number }): string {
  return `${loc.lat.toFixed(4)},${loc.lng.toFixed(4)}`;
}

export function getSales(sales: Sale[] = SALES): Sale[] {
  return [...sales].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getTotals(
  sales: Sale[] = SALES,
  now: Date = new Date(),
): Totals {
  const ymNow = ymKey(now);
  const ymLast = ymKey(new Date(now.getFullYear(), now.getMonth() - 1, 1));

  let allRevenue = 0;
  let allUnits = 0;
  let monthRevenue = 0;
  let monthUnits = 0;
  let lastMonthRevenue = 0;
  let lastMonthUnits = 0;

  for (const s of sales) {
    allRevenue += s.price;
    allUnits += 1;
    const ym = s.date.slice(0, 7);
    if (ym === ymNow) {
      monthRevenue += s.price;
      monthUnits += 1;
    } else if (ym === ymLast) {
      lastMonthRevenue += s.price;
      lastMonthUnits += 1;
    }
  }

  return {
    allRevenue,
    allUnits,
    monthRevenue,
    monthUnits,
    lastMonthRevenue,
    lastMonthUnits,
  };
}

export function getSalesByMonth(
  window = 12,
  sales: Sale[] = SALES,
  now: Date = new Date(),
): MonthBucket[] {
  const buckets: MonthBucket[] = [];
  const index = new Map<string, MonthBucket>();
  for (let i = window - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const bucket: MonthBucket = {
      ym: ymKey(d),
      date: d,
      revenue: 0,
      units: 0,
    };
    buckets.push(bucket);
    index.set(bucket.ym, bucket);
  }
  for (const s of sales) {
    const bucket = index.get(s.date.slice(0, 7));
    if (bucket) {
      bucket.revenue += s.price;
      bucket.units += 1;
    }
  }
  return buckets;
}

export function getSalesByLocation(sales: Sale[] = SALES): LocationEntry[] {
  const map = new Map<string, LocationEntry>();
  for (const s of sales) {
    const key = locationKey(s.location);
    let entry = map.get(key);
    if (!entry) {
      entry = {
        key,
        label: s.location.label,
        lat: s.location.lat,
        lng: s.location.lng,
        count: 0,
        revenue: 0,
        sales: [],
      };
      map.set(key, entry);
    }
    entry.count += 1;
    entry.revenue += s.price;
    entry.sales.push(s);
  }
  return [...map.values()].sort((a, b) => b.revenue - a.revenue);
}

export type { LocationEntry, MonthBucket, Sale, Totals } from "./types";
export { formatDate, formatVND, formatVNDCompact } from "./format";
