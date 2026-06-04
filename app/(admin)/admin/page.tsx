import { MonthlyRevenueChart } from "components/admin/monthly-revenue-chart";
import { RecentSalesTable } from "components/admin/recent-sales-table";
import { StatCard } from "components/admin/stat-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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

const RECENT_LIMIT = 8;

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
    <div className="max-w-[1480px] p-7 pb-12">
      <div className="mb-5 flex items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Business health at a glance
          </p>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-4 gap-3.5">
        <StatCard
          label="All-time revenue"
          value={allRevenueCompact}
          suffix="₫"
          foot={`${totals.allUnits} machines sold since launch`}
        />
        <StatCard
          label="All-time units"
          value={String(totals.allUnits)}
          foot="across all locations"
        />
        <StatCard
          label="This month · revenue"
          value={monthRevenueCompact}
          suffix="₫"
          deltaPct={revenueDelta}
          foot="vs. previous month"
          spark={sparkRevenue}
        />
        <StatCard
          label="This month · units"
          value={String(totals.monthUnits)}
          deltaPct={unitsDelta}
          foot="vs. previous month"
          spark={sparkUnits}
        />
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-[13.5px]">Monthly revenue</CardTitle>
            <CardDescription>
              Rolling 12-month window · ending {currentMonthLabel}
            </CardDescription>
          </div>
          <div className="flex items-center gap-3.5 text-[11.5px] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-muted-foreground" />
              Closed
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-foreground" />
              Current month
            </span>
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-2">
          <MonthlyRevenueChart data={chartData} />
        </CardContent>
      </Card>

      <Card className="mt-3.5">
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="text-[13.5px]">Recent sales</CardTitle>
            <CardDescription>
              Latest {Math.min(RECENT_LIMIT, sales.length)} of {sales.length}{" "}
              transactions
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/sales">View all →</Link>
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <RecentSalesTable sales={sales} limit={RECENT_LIMIT} />
        </CardContent>
      </Card>
    </div>
  );
}
