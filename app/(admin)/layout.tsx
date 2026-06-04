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
    <div className="grid min-h-screen grid-cols-[240px_1fr] bg-background text-foreground antialiased">
      <Sidebar />
      <div className="flex min-w-0 flex-col">
        <Topbar />
        {children}
      </div>
    </div>
  );
}
