import { RecentSalesTable } from "components/admin/recent-sales-table";
import { getSales } from "lib/sales";

export default async function AdminSalesPage() {
  const sales = await getSales();
  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1 className="page-title">Sales</h1>
          <div className="page-sub">
            {sales.length} transactions · sorted by most recent
          </div>
        </div>
      </div>
      <div className="card">
        <RecentSalesTable sales={sales} />
      </div>
    </div>
  );
}
