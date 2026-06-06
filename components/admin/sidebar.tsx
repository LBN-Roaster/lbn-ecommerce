"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useAdminLocale } from "./admin-locale-context";
import {
  LayoutGrid,
  Map,
  MessageSquareText,
  Package,
  TrendingUp,
  Settings,
  Languages,
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const { locale, setLocale, t } = useAdminLocale();

  const navItems = [
    { href: "/admin", label: t.sidebar.overview, icon: LayoutGrid },
    { href: "/admin/map", label: t.sidebar.installationsMap, icon: Map },
  ];

  return (
    <aside className="sticky top-0 flex h-screen flex-col border-r border-border bg-sidebar p-4 gap-5">
      <div className="flex items-center gap-2.5 px-1.5 py-1">
        <div className="grid h-7 w-7 place-items-center rounded-md bg-foreground text-[12px] font-bold tracking-wider text-background">
          LBN
        </div>
        <div>
          <div className="text-[13.5px] font-semibold tracking-tight">
            {t.sidebar.title}
          </div>
          <div className="text-[11px] text-muted-foreground">
            {t.sidebar.subtitle}
          </div>
        </div>
      </div>

      <div>
        <div className="px-1.5 pb-1 text-[10.5px] font-medium uppercase tracking-widest text-muted-foreground">
          {t.sidebar.dashboard}
        </div>
        <nav className="flex flex-col gap-0.5">
          {navItems.map((item) => {
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
          {t.sidebar.data}
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
            {t.sidebar.products}
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
            {t.sidebar.sales}
            <span className="ml-auto text-[10px] text-muted-foreground">
              JSON
            </span>
          </Link>
          <Link
            href="/admin/feedback"
            className={cn(
              "flex items-center gap-2.5 rounded-md px-2.5 py-[7px] text-[13.5px] text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground",
              pathname === "/admin/feedback" &&
                "bg-background text-foreground shadow-sm font-medium",
            )}
          >
            <MessageSquareText
              className={cn(
                "h-4 w-4 text-muted-foreground",
                pathname === "/admin/feedback" && "text-primary",
              )}
            />
            {t.sidebar.feedback}
          </Link>
          <button
            className="flex items-center gap-2.5 rounded-md px-2.5 py-[7px] text-[13.5px] text-muted-foreground opacity-50 cursor-not-allowed"
            disabled
          >
            <Settings className="h-4 w-4 text-muted-foreground" />
            {t.sidebar.settings}
          </button>
        </nav>
      </div>

      <Separator className="mt-auto" />
      <button
        onClick={() => setLocale(locale === "vi" ? "en" : "vi")}
        className="flex items-center gap-2.5 rounded-md px-2.5 py-[7px] text-[13.5px] text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground"
      >
        <Languages className="h-4 w-4" />
        {locale === "vi" ? "English" : "Tiếng Việt"}
      </button>
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
