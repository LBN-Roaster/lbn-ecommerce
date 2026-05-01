import { Sidebar } from "components/admin/sidebar";
import { Topbar } from "components/admin/topbar";
import { ReactNode } from "react";
import "./admin.css";

export const metadata = {
  title: "LBN Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="admin-app">
      <Sidebar />
      <div className="main">
        <Topbar />
        {children}
      </div>
    </div>
  );
}
