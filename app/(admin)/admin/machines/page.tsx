import { MachineTable } from "components/admin/machine-table";
import { SerialNumberGuide } from "components/admin/serial-number-guide";

export default function AdminMachinesPage() {
  return (
    <div className="max-w-[1480px] p-7 pb-12">
      <MachineTable />
      <div className="mt-8">
        <SerialNumberGuide />
      </div>
    </div>
  );
}
