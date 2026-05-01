import { describe, expect, it } from "vitest";
import {
  getSales,
  getSalesByLocation,
  getSalesByMonth,
  getTotals,
} from "./index";
import type { Sale } from "./types";

function sale(partial: Partial<Sale> & { id: string; date: string }): Sale {
  return {
    productHandle: "1.5-CL-roaster",
    productName: "LBN 1.5kg",
    price: 100_000_000,
    buyer: { name: "Buyer" },
    location: { label: "Hà Nội", lat: 21.0285, lng: 105.8542 },
    ...partial,
  };
}

describe("getSales", () => {
  const fixture: Sale[] = [
    sale({ id: "a", date: "2026-01-15" }),
    sale({ id: "b", date: "2026-03-20", price: 300_000_000 }),
    sale({ id: "c", date: "2025-11-02", price: 180_000_000 }),
  ];

  it("returns sales sorted by date descending", async () => {
    expect((await getSales(fixture)).map((s) => s.id)).toEqual(["b", "a", "c"]);
  });

  it("returns all rows from input", async () => {
    expect(await getSales(fixture)).toHaveLength(fixture.length);
  });

  it("returns an empty array for empty input", async () => {
    expect(await getSales([])).toEqual([]);
  });

  it("does not mutate the input array", async () => {
    const input = [...fixture];
    await getSales(input);
    expect(input.map((s) => s.id)).toEqual(["a", "b", "c"]);
  });
});

describe("getTotals", () => {
  const NOW = new Date(2026, 4, 15); // 2026-05-15

  it("sums all-time revenue and counts units", async () => {
    const fixture: Sale[] = [
      sale({ id: "a", date: "2026-05-01", price: 100_000_000 }),
      sale({ id: "b", date: "2026-04-01", price: 200_000_000 }),
      sale({ id: "c", date: "2025-09-15", price: 150_000_000 }),
    ];
    const t = await getTotals(fixture, NOW);
    expect(t.allRevenue).toBe(450_000_000);
    expect(t.allUnits).toBe(3);
  });

  it("returns zeros for empty input", async () => {
    const t = await getTotals([], NOW);
    expect(t).toEqual({
      allRevenue: 0,
      allUnits: 0,
      monthRevenue: 0,
      monthUnits: 0,
      lastMonthRevenue: 0,
      lastMonthUnits: 0,
    });
  });

  it("buckets sales into current month vs previous month", async () => {
    const fixture: Sale[] = [
      sale({ id: "may1", date: "2026-05-01", price: 100_000_000 }),
      sale({ id: "may2", date: "2026-05-30", price: 50_000_000 }),
      sale({ id: "apr", date: "2026-04-20", price: 200_000_000 }),
      sale({ id: "older", date: "2025-11-02", price: 999_000_000 }),
    ];
    const t = await getTotals(fixture, NOW);
    expect(t.monthRevenue).toBe(150_000_000);
    expect(t.monthUnits).toBe(2);
    expect(t.lastMonthRevenue).toBe(200_000_000);
    expect(t.lastMonthUnits).toBe(1);
  });

  it("returns zero this-month when no sales in current month", async () => {
    const fixture: Sale[] = [
      sale({ id: "apr", date: "2026-04-15", price: 200_000_000 }),
    ];
    const t = await getTotals(fixture, NOW);
    expect(t.monthRevenue).toBe(0);
    expect(t.monthUnits).toBe(0);
    expect(t.lastMonthRevenue).toBe(200_000_000);
    expect(t.lastMonthUnits).toBe(1);
  });

  it("returns zero last-month when no sales in previous month", async () => {
    const fixture: Sale[] = [
      sale({ id: "may", date: "2026-05-10", price: 100_000_000 }),
    ];
    const t = await getTotals(fixture, NOW);
    expect(t.monthRevenue).toBe(100_000_000);
    expect(t.lastMonthRevenue).toBe(0);
    expect(t.lastMonthUnits).toBe(0);
  });

  it("treats Dec 31 and Jan 1 as different months", async () => {
    const NEW_YEAR = new Date(2026, 0, 5); // 2026-01-05
    const fixture: Sale[] = [
      sale({ id: "dec31", date: "2025-12-31", price: 200_000_000 }),
      sale({ id: "jan1", date: "2026-01-01", price: 100_000_000 }),
    ];
    const t = await getTotals(fixture, NEW_YEAR);
    expect(t.monthRevenue).toBe(100_000_000);
    expect(t.monthUnits).toBe(1);
    expect(t.lastMonthRevenue).toBe(200_000_000);
    expect(t.lastMonthUnits).toBe(1);
  });

  it("rolls last-month back across a year boundary in January", async () => {
    const JAN = new Date(2026, 0, 15); // 2026-01-15 → last month is 2025-12
    const fixture: Sale[] = [
      sale({ id: "dec", date: "2025-12-15", price: 200_000_000 }),
    ];
    const t = await getTotals(fixture, JAN);
    expect(t.lastMonthRevenue).toBe(200_000_000);
  });
});

describe("getSalesByMonth", () => {
  const NOW = new Date(2026, 4, 15); // 2026-05-15

  it("returns exactly `window` buckets ending at the current month", async () => {
    const buckets = await getSalesByMonth(12, [], NOW);
    expect(buckets).toHaveLength(12);
    expect(buckets[0]?.ym).toBe("2025-06");
    expect(buckets[11]?.ym).toBe("2026-05");
  });

  it("returns zero buckets for an empty sales array", async () => {
    const buckets = await getSalesByMonth(12, [], NOW);
    expect(buckets.every((b) => b.revenue === 0 && b.units === 0)).toBe(true);
  });

  it("places a single sale into its correct bucket", async () => {
    const fixture = [
      sale({ id: "x", date: "2026-03-12", price: 200_000_000 }),
    ];
    const buckets = await getSalesByMonth(12, fixture, NOW);
    const target = buckets.find((b) => b.ym === "2026-03");
    expect(target).toMatchObject({ revenue: 200_000_000, units: 1 });
    const others = buckets.filter((b) => b.ym !== "2026-03");
    expect(others.every((b) => b.revenue === 0 && b.units === 0)).toBe(true);
  });

  it("aggregates multiple sales in the same month", async () => {
    const fixture = [
      sale({ id: "a", date: "2026-02-05", price: 100_000_000 }),
      sale({ id: "b", date: "2026-02-25", price: 50_000_000 }),
    ];
    const buckets = await getSalesByMonth(12, fixture, NOW);
    const feb = buckets.find((b) => b.ym === "2026-02");
    expect(feb).toMatchObject({ revenue: 150_000_000, units: 2 });
  });

  it("excludes sales older than the window", async () => {
    const fixture = [
      sale({ id: "old", date: "2024-01-15", price: 999_000_000 }),
      sale({ id: "recent", date: "2026-04-10", price: 100_000_000 }),
    ];
    const buckets = await getSalesByMonth(12, fixture, NOW);
    const total = buckets.reduce((sum, b) => sum + b.revenue, 0);
    expect(total).toBe(100_000_000);
  });

  it("buckets are ordered oldest to newest", async () => {
    const buckets = await getSalesByMonth(6, [], NOW);
    const yms = buckets.map((b) => b.ym);
    expect(yms).toEqual([
      "2025-12",
      "2026-01",
      "2026-02",
      "2026-03",
      "2026-04",
      "2026-05",
    ]);
  });

  it("respects custom window sizes", async () => {
    expect(await getSalesByMonth(3, [], NOW)).toHaveLength(3);
    expect(await getSalesByMonth(1, [], NOW)).toHaveLength(1);
  });
});

describe("getSalesByLocation", () => {
  it("returns an empty array for empty input", async () => {
    expect(await getSalesByLocation([])).toEqual([]);
  });

  it("returns one entry for a single sale", async () => {
    const fixture = [
      sale({
        id: "x",
        date: "2026-03-12",
        price: 200_000_000,
        location: { label: "Hà Nội", lat: 21.0285, lng: 105.8542 },
      }),
    ];
    const result = await getSalesByLocation(fixture);
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      label: "Hà Nội",
      lat: 21.0285,
      lng: 105.8542,
      count: 1,
      revenue: 200_000_000,
    });
    expect(result[0]?.sales).toHaveLength(1);
  });

  it("aggregates sales at the same lat/lng", async () => {
    const fixture = [
      sale({
        id: "a",
        date: "2026-01-01",
        price: 100_000_000,
        location: { label: "Hà Nội", lat: 21.0285, lng: 105.8542 },
      }),
      sale({
        id: "b",
        date: "2026-02-01",
        price: 200_000_000,
        location: { label: "Hà Nội", lat: 21.0285, lng: 105.8542 },
      }),
    ];
    const result = await getSalesByLocation(fixture);
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      count: 2,
      revenue: 300_000_000,
    });
    expect(result[0]?.sales.map((s) => s.id).sort()).toEqual(["a", "b"]);
  });

  it("collapses lat/lng jitter beyond 4 decimals into one entry", async () => {
    const fixture = [
      sale({
        id: "a",
        date: "2026-01-01",
        location: { label: "HCMC", lat: 10.7769, lng: 106.7009 },
      }),
      sale({
        id: "b",
        date: "2026-01-02",
        location: { label: "HCMC", lat: 10.77690001, lng: 106.70090009 },
      }),
    ];
    expect(await getSalesByLocation(fixture)).toHaveLength(1);
  });

  it("keeps distinct locations separate", async () => {
    const fixture = [
      sale({
        id: "han",
        date: "2026-01-01",
        price: 100_000_000,
        location: { label: "Hà Nội", lat: 21.0285, lng: 105.8542 },
      }),
      sale({
        id: "hcm",
        date: "2026-02-01",
        price: 300_000_000,
        location: {
          label: "Hồ Chí Minh",
          lat: 10.7769,
          lng: 106.7009,
        },
      }),
      sale({
        id: "dad",
        date: "2026-03-01",
        price: 200_000_000,
        location: { label: "Đà Nẵng", lat: 16.0544, lng: 108.2022 },
      }),
    ];
    const result = await getSalesByLocation(fixture);
    expect(result).toHaveLength(3);
    expect(result.map((l) => l.label)).toEqual([
      "Hồ Chí Minh",
      "Đà Nẵng",
      "Hà Nội",
    ]);
  });

  it("sorts entries by revenue descending", async () => {
    const fixture = [
      sale({
        id: "small",
        date: "2026-01-01",
        price: 50_000_000,
        location: { label: "Small", lat: 1, lng: 1 },
      }),
      sale({
        id: "big",
        date: "2026-02-01",
        price: 500_000_000,
        location: { label: "Big", lat: 2, lng: 2 },
      }),
      sale({
        id: "mid",
        date: "2026-03-01",
        price: 200_000_000,
        location: { label: "Mid", lat: 3, lng: 3 },
      }),
    ];
    expect((await getSalesByLocation(fixture)).map((l) => l.label)).toEqual([
      "Big",
      "Mid",
      "Small",
    ]);
  });
});
