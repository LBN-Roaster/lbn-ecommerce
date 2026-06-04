"use client";

import { useState } from "react";
import { type Product, type ProductVariant } from "lib/backend-api";
import { generateQuotation } from "lib/admin-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface QuotationLine {
  product: Product;
  variantId: string;
  quantity: number;
  priceType: "COST" | "SELLING" | "LISTED";
  discountPercent: number;
  priceOverride: string;
}

function variantLabel(variant: ProductVariant): string {
  const attrs = variant.attributes;
  if (!attrs || Object.keys(attrs).length === 0) return "Default";
  return Object.values(attrs).join(" / ");
}

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

function getVariantPrice(
  variant: ProductVariant,
  product: Product,
  priceType: "COST" | "SELLING" | "LISTED",
): number {
  switch (priceType) {
    case "COST":
      return variant.costPrice;
    case "SELLING":
      return computeSellingPrice(variant.costPrice, product.revenuePercent);
    case "LISTED":
      return computeListedPrice(variant.costPrice, product.revenuePercent, product.distributorPercent);
  }
}

export function QuotationModal({
  products,
  onClose,
}: {
  products: Product[];
  onClose: () => void;
}) {
  const [lines, setLines] = useState<QuotationLine[]>(() =>
    products.map((p) => ({
      product: p,
      variantId: p.variants.length > 0 ? p.variants[0]!.id : "",
      quantity: 1,
      priceType: "LISTED",
      discountPercent: 0,
      priceOverride: "",
    })),
  );
  const [recipientName, setRecipientName] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [recipientCompany, setRecipientCompany] = useState("");
  const [senderName, setSenderName] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [language, setLanguage] = useState("vi");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateLine(idx: number, patch: Partial<QuotationLine>) {
    setLines((prev) =>
      prev.map((l, i) => (i === idx ? { ...l, ...patch } : l)),
    );
  }

  function removeLine(idx: number) {
    setLines((prev) => prev.filter((_, i) => i !== idx));
  }

  async function handleGenerate() {
    const validLines = lines.filter((l) => l.variantId && l.quantity > 0);
    if (validLines.length === 0) {
      setError("Add at least one item with a variant");
      return;
    }

    setGenerating(true);
    setError(null);
    try {
      await generateQuotation({
        recipientName: recipientName || undefined,
        recipientAddress: recipientAddress || undefined,
        recipientCompany: recipientCompany || undefined,
        senderName: senderName || undefined,
        senderPhone: senderPhone || undefined,
        language,
        items: validLines.map((l) => ({
          productVariantId: l.variantId,
          quantity: l.quantity,
          priceType: l.priceType,
          discountPercent: l.discountPercent || undefined,
          priceOverride: l.priceOverride ? Number(l.priceOverride) : undefined,
        })),
      });
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to generate quotation");
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/35" onClick={onClose}>
      <div
        className="flex max-h-[85vh] w-[640px] max-w-[90vw] flex-col rounded-lg border border-border bg-background shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-base font-semibold">Generate Quotation</h2>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-col gap-5 overflow-y-auto p-5">
          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-destructive">
              {error}
            </div>
          )}

          <div>
            <div className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Quotation settings
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="flex flex-col gap-1">
                <Label className="text-xs">Name</Label>
                <Input
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Customer name"
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-xs">Company</Label>
                <Input
                  value={recipientCompany}
                  onChange={(e) => setRecipientCompany(e.target.value)}
                  placeholder="Company name"
                />
              </div>
              <div className="col-span-2 flex flex-col gap-1">
                <Label className="text-xs">Address</Label>
                <Input
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  placeholder="Delivery address"
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-xs">Sender Name</Label>
                <Input
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Your name"
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-xs">Sender Phone</Label>
                <Input
                  value={senderPhone}
                  onChange={(e) => setSenderPhone(e.target.value)}
                  placeholder="Phone number"
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-xs">Language</Label>
                <select
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="vi">Vietnamese</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Items ({lines.length})
            </div>
            <div className="flex flex-col gap-3">
              {lines.map((line, idx) => {
                const selectedVariant = line.product.variants.find(
                  (v) => v.id === line.variantId,
                );
                const basePrice = selectedVariant
                  ? getVariantPrice(selectedVariant, line.product, line.priceType)
                  : 0;
                const overrideNum = line.priceOverride
                  ? Number(line.priceOverride)
                  : 0;
                const finalUnit = overrideNum
                  ? overrideNum
                  : basePrice * (1 - (line.discountPercent || 0) / 100);
                const hasDiscount =
                  (line.discountPercent > 0 || overrideNum > 0) &&
                  finalUnit !== basePrice;
                return (
                  <div key={line.product.id} className="rounded-md border border-border p-3">
                    <div className="mb-2.5 flex items-center gap-2.5">
                      <div className="h-10 w-10 shrink-0 overflow-hidden rounded bg-muted">
                        {line.product.images &&
                        line.product.images.length > 0 ? (
                          <img
                            src={line.product.images[0]}
                            alt={line.product.model}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full bg-muted" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold">
                          {line.product.model}
                        </span>
                        {selectedVariant && (
                          <span className="block text-xs text-muted-foreground">
                            {formatPrice(roundUp(basePrice))} ₫
                          </span>
                        )}
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 shrink-0 text-muted-foreground hover:text-destructive"
                        onClick={() => removeLine(idx)}
                      >
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] items-end gap-2.5">
                      {line.product.variants.length > 1 && (
                        <div className="col-span-full flex flex-col gap-1">
                          <Label className="text-xs">Variant</Label>
                          <select
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            value={line.variantId}
                            onChange={(e) =>
                              updateLine(idx, { variantId: e.target.value })
                            }
                          >
                            {line.product.variants.map((v) => (
                              <option key={v.id} value={v.id}>
                                {variantLabel(v)}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                      {line.product.variants.length === 0 && (
                        <div className="col-span-full py-1.5 text-xs italic text-muted-foreground">
                          No variants available
                        </div>
                      )}
                      <div className="flex flex-col gap-1">
                        <Label className="text-xs">Price Type</Label>
                        <select
                          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                          value={line.priceType}
                          onChange={(e) =>
                            updateLine(idx, {
                              priceType: e.target.value as
                                | "COST"
                                | "SELLING"
                                | "LISTED",
                            })
                          }
                        >
                          <option value="COST">Cost</option>
                          <option value="SELLING">Selling</option>
                          <option value="LISTED">Listed</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Label className="text-xs">Qty</Label>
                        <Input
                          type="number"
                          min={1}
                          value={line.quantity}
                          onChange={(e) =>
                            updateLine(idx, {
                              quantity: Math.max(
                                1,
                                Number(e.target.value) || 1,
                              ),
                            })
                          }
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <Label className="text-xs">Discount %</Label>
                        <Input
                          type="number"
                          min={0}
                          max={100}
                          step="0.01"
                          value={line.discountPercent || ""}
                          onChange={(e) =>
                            updateLine(idx, {
                              discountPercent: Number(e.target.value) || 0,
                            })
                          }
                          placeholder="0"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <Label className="text-xs">Price Override</Label>
                        <Input
                          type="text"
                          value={line.priceOverride}
                          onChange={(e) =>
                            updateLine(idx, {
                              priceOverride: e.target.value,
                            })
                          }
                          placeholder="Optional"
                        />
                      </div>
                    </div>
                    {selectedVariant && (
                      <div className="mt-2 flex items-center gap-1.5 border-t border-dashed border-border pt-2 font-mono text-sm">
                        {hasDiscount ? (
                          <>
                            <span className="text-muted-foreground line-through">
                              {formatPrice(roundUp(basePrice))} ₫
                            </span>
                            <span className="text-muted-foreground">→</span>
                            <span className="font-semibold text-emerald-600">
                              {formatPrice(roundUp(finalUnit))} ₫
                            </span>
                            <span className="ml-auto font-medium text-muted-foreground">
                              × {line.quantity} ={" "}
                              {formatPrice(
                                roundUp(finalUnit * line.quantity),
                              )}{" "}
                              ₫
                            </span>
                          </>
                        ) : (
                          <span className="ml-auto font-medium text-muted-foreground">
                            {formatPrice(roundUp(basePrice))} ₫ ×{" "}
                            {line.quantity} ={" "}
                            {formatPrice(roundUp(basePrice * line.quantity))}{" "}
                            ₫
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {lines.length > 0 &&
              (() => {
                let totalPrice = 0;
                let totalCost = 0;
                for (const line of lines) {
                  const variant = line.product.variants.find(
                    (v) => v.id === line.variantId,
                  );
                  if (!variant) continue;
                  const base = getVariantPrice(
                    variant,
                    line.product,
                    line.priceType,
                  );
                  const override = line.priceOverride
                    ? Number(line.priceOverride)
                    : 0;
                  const unit = override
                    ? override
                    : base * (1 - (line.discountPercent || 0) / 100);
                  totalPrice += roundUp(unit * line.quantity);
                  totalCost += variant.costPrice * line.quantity;
                }
                const profitPct =
                  totalCost > 0
                    ? ((totalPrice - totalCost) / totalCost) * 100
                    : 0;
                return (
                  <div className="mt-3 flex flex-col gap-1.5 border-t-2 border-border px-3 pt-2.5 font-mono text-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-muted-foreground">
                        Total Cost
                      </span>
                      <span className="font-medium text-muted-foreground">
                        {formatPrice(totalCost)} ₫
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-muted-foreground">
                        Total Price
                      </span>
                      <span className="text-sm font-bold">
                        {formatPrice(totalPrice)} ₫
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-muted-foreground">
                        Profit
                      </span>
                      <span
                        className={cn(
                          "font-semibold",
                          profitPct >= 0
                            ? "text-emerald-600"
                            : "text-destructive",
                        )}
                      >
                        {profitPct >= 0 ? "+" : ""}
                        {profitPct.toFixed(1)}%
                        {" · "}
                        {formatPrice(totalPrice - totalCost)} ₫
                      </span>
                    </div>
                  </div>
                );
              })()}
          </div>
        </div>

        <div className="flex shrink-0 justify-end gap-2 border-t border-border px-5 py-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            disabled={generating || lines.every((l) => !l.variantId)}
            onClick={handleGenerate}
          >
            {generating ? "Generating..." : "Generate PDF"}
          </Button>
        </div>
      </div>
    </div>
  );
}
