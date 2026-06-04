import { RecentSalesTable } from "components/admin/recent-sales-table";
import { Card, CardContent } from "@/components/ui/card";
import { getSales } from "lib/sales";

export default async function AdminSalesPage() {
  const sales = await getSales();
  return (
    <div className="max-w-[1480px] p-7 pb-12">
      <div className="mb-5">
        <h1 className="text-2xl font-semibold tracking-tight">Sales</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {sales.length} transactions · sorted by most recent
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
