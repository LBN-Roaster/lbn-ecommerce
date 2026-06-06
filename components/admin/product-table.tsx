"use client";

import { type Product } from "lib/backend-api";
import { getProducts, deleteProduct } from "lib/admin-api";
import { QuotationModal } from "./quotation-modal";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Search, ImageIcon } from "lucide-react";
import { useAdminLocale } from "./admin-locale-context";

type FilterTab = "all" | "VISIBLE" | "HIDDEN" | "CONTACT_US";

function formatPrice(n: number) {
  return new Intl.NumberFormat("vi-VN").format(n);
}

function roundUp(n: number): number {
  return Math.ceil(n / 1_000_000) * 1_000_000;
}

function roundDown(n: number): number {
  return Math.floor(n / 1_000_000) * 1_000_000;
}

function computeSellingPrice(cost: number, revPct: number): number {
  return roundUp(cost * (1 + revPct / 100));
}

function computeListedPrice(
  cost: number,
  revPct: number,
  distPct: number,
): number {
  const selling = computeSellingPrice(cost, revPct);
  return roundDown(selling / ((100 - distPct) / 100));
}

function DeleteButton({
  id,
  onDeleted,
  labels,
}: {
  id: string;
  onDeleted: () => void;
  labels: { delete: string; deleteConfirm: string };
}) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      className="text-xs text-muted-foreground hover:text-destructive hover:underline disabled:opacity-50"
      disabled={pending}
      onClick={() => {
        if (!confirm(labels.deleteConfirm)) return;
        startTransition(async () => {
          await deleteProduct(id);
          onDeleted();
        });
      }}
    >
      {pending ? "..." : labels.delete}
    </button>
  );
}

export function ProductTable() {
  const { t } = useAdminLocale();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showQuotation, setShowQuotation] = useState(false);

  const tabs: { value: FilterTab; label: string }[] = [
    { value: "all", label: t.productTable.all },
    { value: "VISIBLE", label: t.productTable.active },
    { value: "HIDDEN", label: t.productTable.draft },
    { value: "CONTACT_US", label: t.productTable.contactUs },
  ];

  const statusVariant: Record<
    string,
    { label: string; variant: "success" | "secondary" | "info" }
  > = {
    VISIBLE: { label: t.productTable.active, variant: "success" },
    HIDDEN: { label: t.productTable.draft, variant: "secondary" },
    CONTACT_US: { label: t.productTable.contactUs, variant: "info" },
  };

  function refresh() {
    getProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    refresh();
  }, []);

  const filtered = products.filter((p) => {
    if (activeTab !== "all" && p.priceVisibility !== activeTab) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        p.model.toLowerCase().includes(q) ||
        (p.generalInformation || "").toLowerCase().includes(q)
      );
    }
    return true;
  });

  const allSelected =
    filtered.length > 0 && filtered.every((p) => selected.has(p.id));

  function toggleAll() {
    if (allSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map((p) => p.id)));
    }
  }

  function toggleOne(id: string) {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  }

  const tabCounts: Record<FilterTab, number> = {
    all: products.length,
    VISIBLE: products.filter((p) => p.priceVisibility === "VISIBLE").length,
    HIDDEN: products.filter((p) => p.priceVisibility === "HIDDEN").length,
    CONTACT_US: products.filter((p) => p.priceVisibility === "CONTACT_US")
      .length,
  };

  if (loading) {
    return (
      <div className="py-10 text-center text-sm text-muted-foreground">
        {t.productTable.loadingProducts}
      </div>
    );
  }

  return (
    <Card>
      <div className="border-b border-border p-3.5">
        <div className="relative max-w-[400px]">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={t.productTable.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="flex border-b border-border px-4">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={cn(
              "-mb-px inline-flex items-center gap-1.5 border-b-2 border-transparent px-3.5 py-2.5 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground",
              activeTab === tab.value && "border-foreground text-foreground",
            )}
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.label}
            <span
              className={cn(
                "rounded-full border border-border bg-muted px-1.5 py-px text-[11px] font-medium text-muted-foreground",
                activeTab === tab.value &&
                  "border-foreground bg-foreground text-background",
              )}
            >
              {tabCounts[tab.value]}
            </span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="py-10 text-center text-sm text-muted-foreground">
          <div className="font-medium">
            {search ? t.productTable.noMatch : t.productTable.noProducts}
          </div>
          <div className="mt-1 text-xs">
            {search ? t.productTable.tryDifferent : t.productTable.addFirst}
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          {selected.size > 0 && (
            <div className="flex items-center gap-3 border-b border-border bg-muted px-4 py-2">
              <span className="text-[12.5px] font-medium">
                {selected.size} {t.productTable.selected}
              </span>
              <Button
                size="sm"
                className="text-xs"
                onClick={() => setShowQuotation(true)}
              >
                {t.productTable.generateQuotation}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs"
                onClick={() => setSelected(new Set())}
              >
                {t.productTable.deselectAll}
              </Button>
            </div>
          )}
          {showQuotation && (
            <QuotationModal
              products={products.filter((p) => selected.has(p.id))}
              onClose={() => setShowQuotation(false)}
            />
          )}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <Checkbox checked={allSelected} onCheckedChange={toggleAll} />
                </TableHead>
                <TableHead className="w-[60px]" />
                <TableHead>{t.productTable.product}</TableHead>
                <TableHead>{t.productTable.status}</TableHead>
                <TableHead className="text-right">
                  {t.productTable.cost}
                </TableHead>
                <TableHead className="text-right">
                  {t.productTable.sellingRev}
                </TableHead>
                <TableHead className="text-right">
                  {t.productTable.listedDist}
                </TableHead>
                <TableHead className="w-[100px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => (
                <TableRow
                  key={p.id}
                  data-state={selected.has(p.id) ? "selected" : undefined}
                >
                  <TableCell>
                    <Checkbox
                      checked={selected.has(p.id)}
                      onCheckedChange={() => toggleOne(p.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="grid h-10 w-10 place-items-center overflow-hidden rounded border border-border bg-muted">
                      {p.images && p.images.length > 0 ? (
                        <img
                          src={p.images[0]}
                          alt={p.model}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/admin/products/${p.id}/edit`}
                      className="text-[13px] font-medium hover:text-primary hover:underline"
                    >
                      {p.model}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        statusVariant[p.priceVisibility]?.variant ?? "secondary"
                      }
                    >
                      {statusVariant[p.priceVisibility]?.label ??
                        p.priceVisibility}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono text-[12.5px]">
                    {formatPrice(p.costPrice)} ₫
                  </TableCell>
                  <TableCell className="text-right font-mono text-[12.5px]">
                    {formatPrice(
                      computeSellingPrice(p.costPrice, p.revenuePercent),
                    )}{" "}
                    ₫ / {p.revenuePercent}%
                  </TableCell>
                  <TableCell className="text-right font-mono text-[12.5px]">
                    {formatPrice(
                      computeListedPrice(
                        p.costPrice,
                        p.revenuePercent,
                        p.distributorPercent,
                      ),
                    )}{" "}
                    ₫ / {p.distributorPercent}%
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/products/${p.id}/edit`}
                        className="text-xs text-muted-foreground hover:text-foreground hover:underline"
                      >
                        {t.productTable.edit}
                      </Link>
                      <DeleteButton
                        id={p.id}
                        onDeleted={refresh}
                        labels={{
                          delete: t.productTable.delete,
                          deleteConfirm: t.productTable.deleteConfirm,
                        }}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </Card>
  );
}
