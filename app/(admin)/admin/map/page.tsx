import { SalesMap } from "components/admin/sales-map";
import { getSalesByLocation } from "lib/sales";

export default async function AdminMapPage() {
  const locations = await getSalesByLocation();
  return (
    <div className="max-w-[1480px] p-7 pb-7">
      <SalesMap locations={locations} />
    </div>
  );
}
