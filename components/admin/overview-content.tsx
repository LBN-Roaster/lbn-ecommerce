"use client";

import { MonthlyRevenueChart } from "./monthly-revenue-chart";
import { RecentSalesTable } from "./recent-sales-table";
import { StatCard } from "./stat-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAdminLocale } from "./admin-locale-context";
import type { Sale } from "lib/sales";

const RECENT_LIMIT = 8;

type Props = {
  sales: Sale[];
  chartData: { ym: string; date: string; revenue: number; units: number }[];
  sparkRevenue: number[];
  sparkUnits: number[];
  allRevenueCompact: string;
  monthRevenueCompact: string;
  allUnits: number;
  monthUnits: number;
  revenueDelta: number | null;
  unitsDelta: number | null;
  currentMonthLabel: string;
  totalSalesCount: number;
};

export function OverviewContent({
  sales,
  chartData,
  sparkRevenue,
  sparkUnits,
  allRevenueCompact,
  monthRevenueCompact,
  allUnits,
  monthUnits,
  revenueDelta,
  unitsDelta,
  currentMonthLabel,
  totalSalesCount,
}: Props) {
  const { t } = useAdminLocale();

  return (
    <div className="max-w-[1480px] p-7 pb-12">
      <div className="mb-5 flex items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {t.overview.title}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {t.overview.subtitle}
          </p>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-4 gap-3.5">
        <StatCard
          label={t.overview.allTimeRevenue}
          value={allRevenueCompact}
          suffix="₫"
          foot={`${allUnits} ${t.overview.machinesSold}`}
        />
        <StatCard
          label={t.overview.allTimeUnits}
          value={String(allUnits)}
          foot={t.overview.acrossAllLocations}
        />
        <StatCard
          label={t.overview.thisMonthRevenue}
          value={monthRevenueCompact}
          suffix="₫"
          deltaPct={revenueDelta}
          foot={t.overview.vsPreviousMonth}
          spark={sparkRevenue}
        />
        <StatCard
          label={t.overview.thisMonthUnits}
          value={String(monthUnits)}
          deltaPct={unitsDelta}
          foot={t.overview.vsPreviousMonth}
          spark={sparkUnits}
        />
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-[13.5px]">
              {t.overview.monthlyRevenue}
            </CardTitle>
            <CardDescription>
              {t.overview.rollingWindow} {currentMonthLabel}
            </CardDescription>
          </div>
          <div className="flex items-center gap-3.5 text-[11.5px] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-muted-foreground" />
              {t.overview.closed}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-foreground" />
              {t.overview.currentMonth}
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
            <CardTitle className="text-[13.5px]">
              {t.overview.recentSales}
            </CardTitle>
            <CardDescription>
              {Math.min(RECENT_LIMIT, totalSalesCount)}/{totalSalesCount}{" "}
              {t.overview.latestTransactions}
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/sales">{t.overview.viewAll}</Link>
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <RecentSalesTable sales={sales} limit={RECENT_LIMIT} />
        </CardContent>
      </Card>
    </div>
  );
}
