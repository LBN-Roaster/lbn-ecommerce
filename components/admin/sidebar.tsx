"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import {
  LayoutGrid,
  Map,
  Package,
  TrendingUp,
  Settings,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", label: "Overview", icon: LayoutGrid },
  { href: "/admin/map", label: "Installations Map", icon: Map },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen flex-col border-r border-border bg-sidebar p-4 gap-5">
      <div className="flex items-center gap-2.5 px-1.5 py-1">
        <div className="grid h-7 w-7 place-items-center rounded-md bg-foreground text-[12px] font-bold tracking-wider text-background">
          LBN
        </div>
        <div>
          <div className="text-[13.5px] font-semibold tracking-tight">
            LBN Admin
          </div>
          <div className="text-[11px] text-muted-foreground">
            Khánh Hòa · VN
          </div>
        </div>
      </div>

      <div>
        <div className="px-1.5 pb-1 text-[10.5px] font-medium uppercase tracking-widest text-muted-foreground">
          Dashboard
        </div>
        <nav className="flex flex-col gap-0.5">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-md px-2.5 py-[7px] text-[13.5px] text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground",
                  active &&
                    "bg-background text-foreground shadow-sm font-medium",
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 text-muted-foreground",
                    active && "text-primary",
                  )}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div>
        <div className="px-1.5 pb-1 text-[10.5px] font-medium uppercase tracking-widest text-muted-foreground">
          Data
        </div>
        <nav className="flex flex-col gap-0.5">
          <Link
            href="/admin/products"
            className={cn(
              "flex items-center gap-2.5 rounded-md px-2.5 py-[7px] text-[13.5px] text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground",
              pathname.startsWith("/admin/products") &&
                "bg-background text-foreground shadow-sm font-medium",
            )}
          >
            <Package
              className={cn(
                "h-4 w-4 text-muted-foreground",
                pathname.startsWith("/admin/products") && "text-primary",
              )}
            />
            Products
          </Link>
          <Link
            href="/admin/sales"
            className={cn(
              "flex items-center gap-2.5 rounded-md px-2.5 py-[7px] text-[13.5px] text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground",
              pathname === "/admin/sales" &&
                "bg-background text-foreground shadow-sm font-medium",
            )}
          >
            <TrendingUp
              className={cn(
                "h-4 w-4 text-muted-foreground",
                pathname === "/admin/sales" && "text-primary",
              )}
            />
            Sales
            <span className="ml-auto text-[10px] text-muted-foreground">
              JSON
            </span>
          </Link>
          <button
            className="flex items-center gap-2.5 rounded-md px-2.5 py-[7px] text-[13.5px] text-muted-foreground opacity-50 cursor-not-allowed"
            disabled
          >
            <Settings className="h-4 w-4 text-muted-foreground" />
            Settings
          </button>
        </nav>
      </div>

      <Separator className="mt-auto" />
      <div className="flex items-center gap-2.5 px-2.5">
        <div className="grid h-7 w-7 place-items-center rounded-full bg-secondary text-[11px] font-semibold text-foreground">
          PT
        </div>
        <div className="min-w-0">
          <div className="text-[12.5px] font-medium">Phương Trần</div>
          <div className="truncate text-[11px] text-muted-foreground">
            owner@lbn.com.vn
          </div>
        </div>
      </div>
    </aside>
  );
}
