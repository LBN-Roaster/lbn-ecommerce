import { SalesMap } from "components/admin/sales-map";
import { getSalesByLocation } from "lib/sales";

export default function AdminMapPage() {
  const locations = getSalesByLocation();
  return (
    <div className="page" style={{ paddingBottom: 28 }}>
      <SalesMap locations={locations} />
    </div>
  );
}
