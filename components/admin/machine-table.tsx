"use client";

import { useEffect, useState, useTransition } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, Search, Plus } from "lucide-react";
import { useAdminLocale } from "./admin-locale-context";
import {
  getMachines,
  getProducts,
  createMachine,
  updateMachine,
  deleteMachine,
} from "lib/admin-api";
import type { Machine, MachineStatus, Product } from "lib/backend-api";

type FilterTab = "all" | MachineStatus;

interface MachineFormState {
  serialNumber: string;
  productVariantId: string;
  status: MachineStatus;
  warrantyMonths: string;
}

const EMPTY_FORM: MachineFormState = {
  serialNumber: "",
  productVariantId: "",
  status: "IN_PRODUCTION",
  warrantyMonths: "12",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("vi-VN");
}

function findProductByVariantId(
  products: Product[],
  variantId: string,
): Product | undefined {
  return products.find((p) => p.variants.some((v) => v.id === variantId));
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
          await deleteMachine(id);
          onDeleted();
        });
      }}
    >
      {pending ? "..." : labels.delete}
    </button>
  );
}

export function MachineTable() {
  const { t } = useAdminLocale();
  const [machines, setMachines] = useState<Machine[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState<Machine | null>(null);
  const [form, setForm] = useState<MachineFormState>(EMPTY_FORM);
  const [productSearch, setProductSearch] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, startSaving] = useTransition();

  const statusMeta: Record<
    MachineStatus,
    { label: string; variant: "warning" | "success" | "info" | "secondary" }
  > = {
    IN_PRODUCTION: { label: t.machineTable.inProduction, variant: "warning" },
    READY_FOR_SHIPPING: {
      label: t.machineTable.readyForShipping,
      variant: "info",
    },
    SOLD: { label: t.machineTable.sold, variant: "success" },
    CONSIGNMENT: { label: t.machineTable.consignment, variant: "secondary" },
  };

  const tabs: { value: FilterTab; label: string }[] = [
    { value: "all", label: t.machineTable.all },
    { value: "IN_PRODUCTION", label: t.machineTable.inProduction },
    { value: "READY_FOR_SHIPPING", label: t.machineTable.readyForShipping },
    { value: "SOLD", label: t.machineTable.sold },
    { value: "CONSIGNMENT", label: t.machineTable.consignment },
  ];

  function refresh() {
    getMachines()
      .then(setMachines)
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    refresh();
    getProducts().then(setProducts);
  }, []);

  const selectedProduct = findProductByVariantId(products, form.productVariantId);

  const filtered = machines.filter((m) => {
    if (activeTab !== "all" && m.status !== activeTab) return false;
    if (search) {
      return m.serialNumber.toLowerCase().includes(search.toLowerCase());
    }
    return true;
  });

  const tabCounts: Record<FilterTab, number> = {
    all: machines.length,
    IN_PRODUCTION: machines.filter((m) => m.status === "IN_PRODUCTION").length,
    READY_FOR_SHIPPING: machines.filter((m) => m.status === "READY_FOR_SHIPPING")
      .length,
    SOLD: machines.filter((m) => m.status === "SOLD").length,
    CONSIGNMENT: machines.filter((m) => m.status === "CONSIGNMENT").length,
  };

  function openRegister() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setProductSearch("");
    setFormError(null);
    setDrawerOpen(true);
  }

  function openEdit(machine: Machine) {
    setEditing(machine);
    setForm({
      serialNumber: machine.serialNumber,
      productVariantId: machine.productVariantId,
      status: machine.status,
      warrantyMonths: String(machine.warrantyMonths),
    });
    setProductSearch(
      findProductByVariantId(products, machine.productVariantId)?.model ?? "",
    );
    setFormError(null);
    setDrawerOpen(true);
  }

  function handleSubmit() {
    setFormError(null);
    const warrantyMonths = parseInt(form.warrantyMonths, 10);
    if (
      !form.serialNumber.trim() ||
      !form.productVariantId ||
      isNaN(warrantyMonths) ||
      warrantyMonths < 1
    ) {
      setFormError(t.machineForm.somethingWrong);
      return;
    }
    const payload = {
      serialNumber: form.serialNumber.trim(),
      productVariantId: form.productVariantId,
      status: form.status,
      warrantyMonths,
    };
    startSaving(async () => {
      try {
        if (editing) {
          await updateMachine(editing.id, payload);
        } else {
          await createMachine(payload);
        }
        setDrawerOpen(false);
        refresh();
      } catch {
        setFormError(t.machineForm.somethingWrong);
      }
    });
  }

  if (loading) {
    return (
      <div className="py-10 text-center text-sm text-muted-foreground">
        {t.machineTable.loadingMachines}
      </div>
    );
  }

  return (
    <>
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent className="flex w-full flex-col gap-0 overflow-y-auto p-0 sm:max-w-md">
          <SheetHeader className="border-b border-border px-6 py-5">
            <SheetTitle>
              {editing ? t.machineForm.editTitle : t.machineForm.registerTitle}
            </SheetTitle>
            <SheetDescription className="sr-only">
              {editing ? t.machineForm.editTitle : t.machineForm.registerTitle}
            </SheetDescription>
          </SheetHeader>

          <div className="flex flex-col gap-5 p-6">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="serial-number">{t.machineForm.serialNumber}</Label>
              <Input
                id="serial-number"
                placeholder={t.machineForm.serialNumberPlaceholder}
                value={form.serialNumber}
                onChange={(e) =>
                  setForm((f) => ({ ...f, serialNumber: e.target.value }))
                }
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>{t.machineForm.productVariant}</Label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder={t.machineForm.selectVariant}
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="pl-8"
                />
              </div>
              <div className="max-h-44 overflow-y-auto rounded-md border border-border bg-background">
                {products.filter((p) =>
                  p.model
                    .toLowerCase()
                    .includes(productSearch.toLowerCase()),
                ).length === 0 ? (
                  <p className="px-3 py-2 text-sm text-muted-foreground">
                    {t.machineForm.noVariantsAvailable}
                  </p>
                ) : (
                  products
                    .filter((p) =>
                      p.model
                        .toLowerCase()
                        .includes(productSearch.toLowerCase()),
                    )
                    .map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        className={cn(
                          "flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-accent",
                          selectedProduct?.id === p.id &&
                            "bg-accent font-medium",
                        )}
                        onClick={() =>
                          setForm((f) => ({
                            ...f,
                            productVariantId: p.variants[0]?.id ?? "",
                          }))
                        }
                      >
                        <Check
                          className={cn(
                            "h-3.5 w-3.5 shrink-0",
                            selectedProduct?.id === p.id
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {p.model}
                      </button>
                    ))
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="status">{t.machineForm.status}</Label>
              <Select
                value={form.status}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, status: v as MachineStatus }))
                }
              >
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IN_PRODUCTION">
                    {t.machineTable.inProduction}
                  </SelectItem>
                  <SelectItem value="READY_FOR_SHIPPING">
                    {t.machineTable.readyForShipping}
                  </SelectItem>
                  <SelectItem value="SOLD">{t.machineTable.sold}</SelectItem>
                  <SelectItem value="CONSIGNMENT">
                    {t.machineTable.consignment}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="warranty">{t.machineForm.warrantyMonths}</Label>
              <Input
                id="warranty"
                type="number"
                min={1}
                placeholder={t.machineForm.warrantyMonthsPlaceholder}
                value={form.warrantyMonths}
                onChange={(e) =>
                  setForm((f) => ({ ...f, warrantyMonths: e.target.value }))
                }
              />
            </div>

            {formError && (
              <p className="text-sm text-destructive">{formError}</p>
            )}

            <div className="flex gap-2 pt-2">
              <Button
                className="flex-1"
                onClick={handleSubmit}
                disabled={saving}
              >
                {saving
                  ? t.machineForm.saving
                  : editing
                    ? t.machineForm.saveChanges
                    : t.machineForm.register}
              </Button>
              <Button
                variant="outline"
                onClick={() => setDrawerOpen(false)}
                disabled={saving}
              >
                {t.machineForm.cancel}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <div className="mb-5 flex items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {t.machinesPage.title}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {t.machinesPage.subtitle}
          </p>
        </div>
        <Button onClick={openRegister}>
          <Plus className="h-4 w-4" />
          {t.machinesPage.addMachine}
        </Button>
      </div>

      <Card>
        <div className="border-b border-border p-3.5">
          <div className="relative max-w-[400px]">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={t.machineTable.searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        <div className="flex overflow-x-auto border-b border-border px-4">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              className={cn(
                "-mb-px inline-flex shrink-0 items-center gap-1.5 border-b-2 border-transparent px-3.5 py-2.5 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground",
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
              {search ? t.machineTable.noMatch : t.machineTable.noMachines}
            </div>
            <div className="mt-1 text-xs">
              {search
                ? t.machineTable.tryDifferent
                : t.machineTable.addFirst}
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t.machineTable.serialNumber}</TableHead>
                  <TableHead>{t.machineTable.productVariant}</TableHead>
                  <TableHead>{t.machineTable.status}</TableHead>
                  <TableHead className="text-right">
                    {t.machineTable.warranty}
                  </TableHead>
                  <TableHead>{t.machineTable.createdDate}</TableHead>
                  <TableHead className="w-[100px]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((m) => {
                  const productName =
                    findProductByVariantId(products, m.productVariantId)
                      ?.model ?? m.productVariantId;
                  return (
                    <TableRow key={m.id}>
                      <TableCell className="font-mono text-[13px] font-medium">
                        {m.serialNumber}
                      </TableCell>
                      <TableCell className="max-w-[220px] truncate text-[13px] text-muted-foreground">
                        {productName}
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusMeta[m.status]?.variant}>
                          {statusMeta[m.status]?.label ?? m.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-mono text-[12.5px]">
                        {m.warrantyMonths} {t.machineTable.warrantyUnit}
                      </TableCell>
                      <TableCell className="text-[12.5px] text-muted-foreground">
                        {formatDate(m.createdDate)}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <button
                            className="text-xs text-muted-foreground hover:text-foreground hover:underline"
                            onClick={() => openEdit(m)}
                          >
                            {t.machineTable.edit}
                          </button>
                          <DeleteButton
                            id={m.id}
                            onDeleted={refresh}
                            labels={{
                              delete: t.machineTable.delete,
                              deleteConfirm: t.machineTable.deleteConfirm,
                            }}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>
    </>
  );
}
