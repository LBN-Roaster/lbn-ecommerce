import { MonthlyRevenueChart } from "components/admin/monthly-revenue-chart";
import { RecentSalesTable } from "components/admin/recent-sales-table";
import { StatCard } from "components/admin/stat-card";
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

export default function AdminOverviewPage() {
  const sales = getSales();
  const totals = getTotals();
  const monthly = getSalesByMonth(12);

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
    <div className="page">
      <div className="page-head">
        <div>
          <h1 className="page-title">Overview</h1>
          <div className="page-sub">Business health at a glance</div>
        </div>
      </div>

      <div className="stats">
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

      <div className="row">
        <div className="card">
          <div className="card-head">
            <div>
              <div className="card-title">Monthly revenue</div>
              <div className="card-sub">
                Rolling 12-month window · ending {currentMonthLabel}
              </div>
            </div>
            <div className="chart-legend">
              <span>
                <span
                  className="legend-swatch"
                  style={{ background: "var(--accent)" }}
                />
                Closed
              </span>
              <span>
                <span
                  className="legend-swatch"
                  style={{ background: "var(--ink)" }}
                />
                Current month
              </span>
            </div>
          </div>
          <div className="chart-wrap">
            <MonthlyRevenueChart data={chartData} />
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 14 }}>
        <div className="card-head">
          <div>
            <div className="card-title">Recent sales</div>
            <div className="card-sub">
              Latest {Math.min(RECENT_LIMIT, sales.length)} of {sales.length}{" "}
              transactions
            </div>
          </div>
          <Link
            href="/admin/sales"
            className="btn btn-ghost"
            style={{ fontSize: 12 }}
          >
            View all →
          </Link>
        </div>
        <RecentSalesTable sales={sales} limit={RECENT_LIMIT} />
      </div>
    </div>
  );
}
