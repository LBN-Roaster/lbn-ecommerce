import { OverviewContent } from "components/admin/overview-content";
import {
  formatVNDCompact,
  getSales,
  getSalesByMonth,
  getTotals,
} from "lib/sales";

function deltaPct(current: number, previous: number): number | null {
  if (previous === 0) return null;
  return ((current - previous) / previous) * 100;
}

export default async function AdminOverviewPage() {
  const sales = await getSales();
  const totals = await getTotals();
  const monthly = await getSalesByMonth(12);

  const chartData = monthly.map((m) => ({
    ym: m.ym,
    date: m.date.toISOString(),
    revenue: m.revenue,
    units: m.units,
  }));

  const sparkRevenue = monthly.map((m) => m.revenue);
  const sparkUnits = monthly.map((m) => m.units);

  const revenueDelta = deltaPct(totals.monthRevenue, totals.lastMonthRevenue);
  const unitsDelta = deltaPct(totals.monthUnits, totals.lastMonthUnits);

  const allRevenueCompact = formatVNDCompact(totals.allRevenue).replace(
    " ₫",
    "",
  );
  const monthRevenueCompact = formatVNDCompact(totals.monthRevenue).replace(
    " ₫",
    "",
  );

  const lastBucket = monthly[monthly.length - 1];
  const currentMonthLabel = lastBucket
    ? lastBucket.date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "";

  return (
    <OverviewContent
      sales={sales}
      chartData={chartData}
      sparkRevenue={sparkRevenue}
      sparkUnits={sparkUnits}
      allRevenueCompact={allRevenueCompact}
      monthRevenueCompact={monthRevenueCompact}
      allUnits={totals.allUnits}
      monthUnits={totals.monthUnits}
      revenueDelta={revenueDelta}
      unitsDelta={unitsDelta}
      currentMonthLabel={currentMonthLabel}
      totalSalesCount={sales.length}
    />
  );
}
