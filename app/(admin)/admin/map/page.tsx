import { SalesMap } from "components/admin/sales-map";
import { getSalesByLocation } from "lib/sales";

export default async function AdminMapPage() {
  const locations = await getSalesByLocation();
  return (
    <div className="page" style={{ paddingBottom: 28 }}>
      <SalesMap locations={locations} />
    </div>
  );
}
