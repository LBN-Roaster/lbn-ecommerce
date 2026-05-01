"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CogIcon, MapIcon, OverviewIcon, SalesIcon } from "./icons";

const NAV_ITEMS = [
  { href: "/admin", label: "Overview", icon: OverviewIcon },
  { href: "/admin/map", label: "Installations Map", icon: MapIcon },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">LBN</div>
        <div>
          <div className="brand-name">LBN Admin</div>
          <div className="brand-sub">Khánh Hòa · VN</div>
        </div>
      </div>

      <div>
        <div className="nav-label">Dashboard</div>
        <nav className="nav">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={"nav-item" + (active ? " active" : "")}
              >
                {item.icon} {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div>
        <div className="nav-label">Data</div>
        <nav className="nav">
          <Link
            href="/admin/sales"
            className={
              "nav-item" + (pathname === "/admin/sales" ? " active" : "")
            }
          >
            {SalesIcon} Sales
            <span
              style={{
                marginLeft: "auto",
                fontSize: 10,
                color: "var(--ink-3)",
              }}
            >
              JSON
            </span>
          </Link>
          <button
            className="nav-item"
            disabled
            style={{ opacity: 0.5, cursor: "not-allowed" }}
          >
            {CogIcon} Settings
          </button>
        </nav>
      </div>

      <div className="sidebar-foot">
        <div className="avatar">PT</div>
        <div style={{ minWidth: 0 }}>
          <div className="user-name">Phương Trần</div>
          <div className="user-mail">owner@lbn.com.vn</div>
        </div>
      </div>
    </aside>
  );
}
