import { SalesContent } from "components/admin/sales-content";
import { getSales } from "lib/sales";

export default async function AdminSalesPage() {
  const sales = await getSales();
  return <SalesContent sales={sales} />;
}
