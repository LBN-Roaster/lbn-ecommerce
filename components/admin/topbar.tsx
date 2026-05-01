"use client";

import { usePathname } from "next/navigation";
import { DownloadIcon } from "./icons";

const CRUMB_LABELS: Record<string, string> = {
  "/admin": "Overview",
  "/admin/map": "Installations Map",
  "/admin/sales": "Sales",
};

export function Topbar() {
  const pathname = usePathname();
  const crumb = CRUMB_LABELS[pathname] ?? "Admin";

  return (
    <div className="topbar">
      <div className="crumbs">
        admin{" "}
        <span style={{ margin: "0 6px", color: "var(--line-strong)" }}>/</span>{" "}
        <strong>{crumb}</strong>
      </div>
      <div className="topbar-right">
        <span className="pill">
          <span className="pill-dot" /> Synced from{" "}
          <span className="mono" style={{ marginLeft: 2 }}>
            data/sales.json
          </span>
        </span>
        <button
          className="btn btn-ghost"
          title="Export CSV"
          disabled
          style={{ opacity: 0.6, cursor: "not-allowed" }}
        >
          {DownloadIcon} Export
        </button>
      </div>
    </div>
  );
}
