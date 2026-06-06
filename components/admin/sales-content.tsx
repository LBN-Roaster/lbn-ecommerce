"use client";

import { RecentSalesTable } from "./recent-sales-table";
import { Card, CardContent } from "@/components/ui/card";
import { useAdminLocale } from "./admin-locale-context";
import type { Sale } from "lib/sales";

export function SalesContent({ sales }: { sales: Sale[] }) {
  const { t } = useAdminLocale();

  return (
    <div className="max-w-[1480px] p-7 pb-12">
      <div className="mb-5">
        <h1 className="text-2xl font-semibold tracking-tight">
          {t.salesPage.title}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {sales.length} {t.salesPage.subtitle}
        </p>
      </div>
      <Card>
        <CardContent className="p-0">
          <RecentSalesTable sales={sales} />
        </CardContent>
      </Card>
    </div>
  );
}
