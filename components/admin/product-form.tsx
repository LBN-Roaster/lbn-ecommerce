"use client";

import { type Product, type PriceVisibility } from "lib/backend-api";
import { useActionState, useRef, useState } from "react";
import { RichTextEditor } from "./rich-text-editor";
import { ImageManager } from "./image-manager";
import {
  VariantBuilder,
  type VariantOption,
  type VariantData,
} from "./variant-builder";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useAdminLocale } from "./admin-locale-context";

type ViewMode = "form" | "json";

interface ProductPayload {
  model: string;
  generalInformation: string;
  detailInformation: Record<string, unknown> | null;
  costPrice: number;
  revenuePercent: number;
  distributorPercent: number;
  priceVisibility: PriceVisibility;
  images: string[];
}

function useVisibilityOptions() {
  const { t } = useAdminLocale();
  return [
    {
      value: "VISIBLE" as PriceVisibility,
      label: t.productForm.activeLabel,
      description: t.productForm.activeDesc,
    },
    {
      value: "HIDDEN" as PriceVisibility,
      label: t.productForm.draftLabel,
      description: t.productForm.draftDesc,
    },
    {
      value: "CONTACT_US" as PriceVisibility,
      label: t.productForm.contactUsLabel,
      description: t.productForm.contactUsDesc,
    },
  ];
}

function productToPayload(product?: Product): ProductPayload {
  return {
    model: product?.model ?? "",
    generalInformation: product?.generalInformation ?? "",
    detailInformation: product?.detailInformation ?? null,
    costPrice: product?.costPrice ?? 0,
    revenuePercent: product?.revenuePercent ?? 0,
    distributorPercent: product?.distributorPercent ?? 0,
    priceVisibility: product?.priceVisibility ?? "CONTACT_US",
    images: product?.images ?? [],
  };
}

function extractVariantOptions(
  detail: Record<string, unknown> | null | undefined,
): VariantOption[] {
  if (!detail) return [];
  const opts = detail.variantOptions as VariantOption[] | undefined;
  return opts ?? [];
}

function formatCurrency(value: string): string {
  const num = parseInt(value.replace(/[^\d]/g, ""), 10);
  if (isNaN(num)) return "";
  return new Intl.NumberFormat("vi-VN").format(num);
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

export function ProductForm({
  product,
  action,
}: {
  product?: Product;
  action: (formData: FormData) => Promise<void>;
}) {
  const { t } = useAdminLocale();
  const VISIBILITY_OPTIONS = useVisibilityOptions();
  const [viewMode, setViewMode] = useState<ViewMode>("form");
  const [snapshot, setSnapshot] = useState<ProductPayload>(() =>
    productToPayload(product),
  );
  const [formKey, setFormKey] = useState(0);
  const [jsonText, setJsonText] = useState("");
  const [costDisplay, setCostDisplay] = useState(() =>
    snapshot.costPrice ? formatCurrency(String(snapshot.costPrice)) : "",
  );
  const [revenuePercent, setRevenuePercent] = useState(snapshot.revenuePercent);
  const [distributorPercent, setDistributorPercent] = useState(
    snapshot.distributorPercent,
  );
  const [visibilityDesc, setVisibilityDesc] = useState(
    () =>
      VISIBILITY_OPTIONS.find((o) => o.value === snapshot.priceVisibility)
        ?.description ?? "",
  );
  const formRef = useRef<HTMLFormElement>(null);

  const costNum = parseInt(costDisplay.replace(/[^\d]/g, ""), 10) || 0;
  const sellingPrice = computeSellingPrice(costNum, revenuePercent);
  const listedPrice = computeListedPrice(
    costNum,
    revenuePercent,
    distributorPercent,
  );

  function readFormAsPayload(): ProductPayload {
    if (!formRef.current) return snapshot;
    const fd = new FormData(formRef.current);
    const imagesRaw = (fd.get("images") as string) ?? "";
    return {
      model: (fd.get("model") as string) ?? "",
      generalInformation: (fd.get("generalInformation") as string) ?? "",
      detailInformation: snapshot.detailInformation,
      costPrice: costNum,
      revenuePercent,
      distributorPercent,
      priceVisibility:
        (fd.get("priceVisibility") as PriceVisibility) ?? "VISIBLE",
      images: imagesRaw
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    };
  }

  function switchToJson() {
    const payload = readFormAsPayload();
    setJsonText(JSON.stringify(payload, null, 2));
    setViewMode("json");
  }

  function switchToForm() {
    if (jsonText.trim()) {
      try {
        const parsed = JSON.parse(jsonText) as ProductPayload;
        setSnapshot(parsed);
        setCostDisplay(
          parsed.costPrice ? formatCurrency(String(parsed.costPrice)) : "",
        );
        setRevenuePercent(parsed.revenuePercent ?? 0);
        setDistributorPercent(parsed.distributorPercent ?? 0);
        setFormKey((k) => k + 1);
      } catch {
        // keep current snapshot if JSON is invalid
      }
    }
    setViewMode("form");
  }

  const [error, formAction, isPending] = useActionState(
    async (_prev: string | null, formData: FormData) => {
      try {
        if (viewMode === "json") {
          const raw = (formData.get("jsonPayload") as string) ?? "";
          let parsed: ProductPayload;
          try {
            parsed = JSON.parse(raw);
          } catch {
            return t.productForm.invalidJson;
          }
          formData.set("model", parsed.model ?? "");
          formData.set("generalInformation", parsed.generalInformation ?? "");
          formData.set(
            "detailInformation",
            JSON.stringify(parsed.detailInformation ?? null),
          );
          formData.set("costPrice", String(parsed.costPrice ?? 0));
          formData.set("revenuePercent", String(parsed.revenuePercent ?? 0));
          formData.set(
            "distributorPercent",
            String(parsed.distributorPercent ?? 0),
          );
          formData.set("priceVisibility", parsed.priceVisibility ?? "VISIBLE");
          formData.set("images", (parsed.images ?? []).join("\n"));
        } else {
          const variantOptionsRaw = (
            formData.get("variantOptions") as string
          )?.trim();
          let variantOptions: VariantOption[] = [];
          try {
            variantOptions = variantOptionsRaw
              ? JSON.parse(variantOptionsRaw)
              : [];
          } catch {
            /* ignore */
          }

          const variantDataRaw = (
            formData.get("variantData") as string
          )?.trim();
          let variantDataList: VariantData[] = [];
          try {
            variantDataList = variantDataRaw ? JSON.parse(variantDataRaw) : [];
          } catch {
            /* ignore */
          }

          const detail: Record<string, unknown> = {};
          if (variantOptions.length > 0) {
            detail.variantOptions = variantOptions;
            detail.variants = variantDataList;
          }
          formData.set("detailInformation", JSON.stringify(detail));

          formData.set("costPrice", String(costNum));
          formData.set("revenuePercent", String(revenuePercent));
          formData.set("distributorPercent", String(distributorPercent));
        }

        await action(formData);
        return null;
      } catch (e) {
        return e instanceof Error ? e.message : t.productForm.somethingWrong;
      }
    },
    null,
  );

  const defaultVariantOptions = extractVariantOptions(
    snapshot.detailInformation as Record<string, unknown> | null,
  );

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-4">
      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="inline-flex self-start overflow-hidden rounded-md border border-border">
        <button
          type="button"
          className={cn(
            "border-r border-border bg-background px-4 py-1.5 text-[12.5px] font-medium text-muted-foreground transition-colors hover:text-foreground",
            viewMode === "form" && "bg-foreground text-background",
          )}
          onClick={() => viewMode === "json" && switchToForm()}
        >
          {t.productForm.form}
        </button>
        <button
          type="button"
          className={cn(
            "bg-background px-4 py-1.5 text-[12.5px] font-medium text-muted-foreground transition-colors hover:text-foreground",
            viewMode === "json" && "bg-foreground text-background",
          )}
          onClick={() => viewMode === "form" && switchToJson()}
        >
          {t.productForm.json}
        </button>
      </div>

      {viewMode === "json" ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">
              {t.productForm.jsonPayload}
            </CardTitle>
            <CardDescription>{t.productForm.pasteJson}</CardDescription>
          </CardHeader>
          <CardContent>
            <textarea
              name="jsonPayload"
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              rows={24}
              className="w-full rounded-md border border-input bg-transparent px-3 py-2 font-mono text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              spellCheck={false}
            />
          </CardContent>
        </Card>
      ) : (
        <div
          key={formKey}
          className="grid grid-cols-[1fr_320px] items-start gap-5"
        >
          <div className="flex min-w-0 flex-col gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">
                  {t.productForm.productInfo}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3.5">
                <div className="flex flex-col gap-1.5">
                  <Label>{t.productForm.titleLabel}</Label>
                  <Input
                    name="model"
                    defaultValue={snapshot.model}
                    required
                    placeholder={t.productForm.titlePlaceholder}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>{t.productForm.description}</Label>
                  <RichTextEditor
                    name="generalInformation"
                    defaultValue={snapshot.generalInformation}
                    placeholder={t.productForm.descriptionPlaceholder}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">{t.productForm.media}</CardTitle>
              </CardHeader>
              <CardContent>
                <ImageManager name="images" defaultValue={snapshot.images} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">
                  {t.productForm.pricing}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3.5">
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <Label>{t.productForm.costPrice}</Label>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                        ₫
                      </span>
                      <Input
                        name="costPrice"
                        type="text"
                        inputMode="numeric"
                        value={costDisplay}
                        onChange={(e) =>
                          setCostDisplay(formatCurrency(e.target.value))
                        }
                        required
                        className="pl-7 font-mono"
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>{t.productForm.revenuePercent}</Label>
                    <div className="relative">
                      <Input
                        name="revenuePercent"
                        type="number"
                        step="0.01"
                        value={revenuePercent || ""}
                        onChange={(e) =>
                          setRevenuePercent(Number(e.target.value) || 0)
                        }
                        className="pr-7 font-mono"
                        placeholder="0"
                      />
                      <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                        %
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>{t.productForm.distributorPercent}</Label>
                    <div className="relative">
                      <Input
                        name="distributorPercent"
                        type="number"
                        step="0.01"
                        value={distributorPercent || ""}
                        onChange={(e) =>
                          setDistributorPercent(Number(e.target.value) || 0)
                        }
                        className="pr-7 font-mono"
                        placeholder="0"
                      />
                      <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                        %
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-3.5 flex flex-col gap-2 border-t border-border pt-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {t.productForm.sellingPrice}
                    </span>
                    <span className="font-mono text-sm font-semibold">
                      {formatCurrency(String(sellingPrice))} ₫
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {t.productForm.listedPrice}
                    </span>
                    <span className="font-mono text-sm font-semibold">
                      {formatCurrency(String(listedPrice))} ₫
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <VariantBuilder
              name="variantOptions"
              defaultOptions={defaultVariantOptions}
              defaultPrice={costDisplay}
            />
          </div>

          <div className="sticky top-[76px] flex flex-col gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">
                  {t.productForm.statusLabel}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <select
                  name="priceVisibility"
                  defaultValue={snapshot.priceVisibility}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  onChange={(e) => {
                    const opt = VISIBILITY_OPTIONS.find(
                      (o) => o.value === e.target.value,
                    );
                    setVisibilityDesc(opt?.description ?? "");
                  }}
                >
                  {VISIBILITY_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-muted-foreground">
                  {visibilityDesc}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      <div className="flex justify-end pt-2">
        <Button type="submit" disabled={isPending}>
          {isPending
            ? t.productForm.saving
            : product
              ? t.productForm.save
              : t.productForm.saveProduct}
        </Button>
      </div>
    </form>
  );
}
