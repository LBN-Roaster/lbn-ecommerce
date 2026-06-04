"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const CRUMB_LABELS: Record<string, string> = {
  "/admin": "Overview",
  "/admin/map": "Installations Map",
  "/admin/sales": "Sales",
};

export function Topbar() {
  const pathname = usePathname();
  const crumb = CRUMB_LABELS[pathname] ?? "Admin";

  return (
    <div className="sticky top-0 z-10 flex h-14 items-center gap-3.5 border-b border-border bg-background px-7">
      <div className="text-[12.5px] text-muted-foreground">
        admin{" "}
        <span className="mx-1.5 text-border">/</span>{" "}
        <span className="font-medium text-foreground">{crumb}</span>
      </div>
      <div className="ml-auto flex items-center gap-2.5">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-[11.5px] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Synced from{" "}
          <span className="ml-0.5 font-mono text-[11px]">data/sales.json</span>
        </span>
        <Button
          variant="ghost"
          size="sm"
          disabled
          className="opacity-60"
        >
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>
    </div>
  );
}
