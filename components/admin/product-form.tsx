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

const VISIBILITY_OPTIONS: {
  value: PriceVisibility;
  label: string;
  description: string;
}[] = [
  {
    value: "VISIBLE",
    label: "Active",
    description: "Product is visible to customers",
  },
  {
    value: "HIDDEN",
    label: "Draft",
    description: "Product is hidden from storefront",
  },
  {
    value: "CONTACT_US",
    label: "Contact Us",
    description: "Price shown as 'Contact Us'",
  },
];

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

function computeSellingPrice(cost: number, revPct: number): number {
  return cost * (1 + revPct / 100);
}

function computeListedPrice(
  cost: number,
  revPct: number,
  distPct: number,
): number {
  const selling = computeSellingPrice(cost, revPct);
  return selling * (1 + distPct / 100);
}

export function ProductForm({
  product,
  action,
}: {
  product?: Product;
  action: (formData: FormData) => Promise<void>;
}) {
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
            return "Invalid JSON";
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
        return e instanceof Error ? e.message : "Something went wrong";
      }
    },
    null,
  );

  const defaultVariantOptions = extractVariantOptions(
    snapshot.detailInformation as Record<string, unknown> | null,
  );

  return (
    <form ref={formRef} action={formAction} className="shopify-form">
      {error && <div className="form-error">{error}</div>}

      <div className="view-toggle">
        <button
          type="button"
          className={"view-toggle-btn" + (viewMode === "form" ? " active" : "")}
          onClick={() => viewMode === "json" && switchToForm()}
        >
          Form
        </button>
        <button
          type="button"
          className={"view-toggle-btn" + (viewMode === "json" ? " active" : "")}
          onClick={() => viewMode === "form" && switchToJson()}
        >
          JSON
        </button>
      </div>

      {viewMode === "json" ? (
        <div className="form-card">
          <div className="form-card-header">
            <h2 className="form-card-title">JSON Payload</h2>
            <p className="form-card-desc">Paste AI-generated JSON here</p>
          </div>
          <div className="form-card-body">
            <textarea
              name="jsonPayload"
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              rows={24}
              className="form-input mono"
              spellCheck={false}
            />
          </div>
        </div>
      ) : (
        <div key={formKey} className="shopify-form-layout">
          <div className="shopify-form-main">
            {/* Title & Description */}
            <div className="form-card">
              <div className="form-card-header">
                <h2 className="form-card-title">Product information</h2>
              </div>
              <div className="form-card-body">
                <label className="form-field">
                  <span className="form-label">Title</span>
                  <input
                    name="model"
                    defaultValue={snapshot.model}
                    required
                    className="form-input"
                    placeholder="Short sleeves t-shirt"
                  />
                </label>
                <div className="form-field">
                  <span className="form-label">Description</span>
                  <RichTextEditor
                    name="generalInformation"
                    defaultValue={snapshot.generalInformation}
                    placeholder="Write a description for your product..."
                  />
                </div>
              </div>
            </div>

            {/* Media */}
            <div className="form-card">
              <div className="form-card-header">
                <h2 className="form-card-title">Media</h2>
              </div>
              <div className="form-card-body">
                <ImageManager name="images" defaultValue={snapshot.images} />
              </div>
            </div>

            {/* Pricing */}
            <div className="form-card">
              <div className="form-card-header">
                <h2 className="form-card-title">Pricing</h2>
              </div>
              <div className="form-card-body">
                <div className="pricing-grid">
                  <label className="form-field">
                    <span className="form-label">Cost Price</span>
                    <div className="price-input-wrap">
                      <span className="price-currency">₫</span>
                      <input
                        name="costPrice"
                        type="text"
                        inputMode="numeric"
                        value={costDisplay}
                        onChange={(e) =>
                          setCostDisplay(formatCurrency(e.target.value))
                        }
                        required
                        className="form-input price-input"
                        placeholder="0"
                      />
                    </div>
                  </label>
                  <label className="form-field">
                    <span className="form-label">Revenue %</span>
                    <div className="price-input-wrap">
                      <input
                        name="revenuePercent"
                        type="number"
                        step="0.01"
                        value={revenuePercent || ""}
                        onChange={(e) =>
                          setRevenuePercent(Number(e.target.value) || 0)
                        }
                        className="form-input price-input"
                        placeholder="0"
                      />
                      <span className="price-currency">%</span>
                    </div>
                  </label>
                  <label className="form-field">
                    <span className="form-label">Distributor %</span>
                    <div className="price-input-wrap">
                      <input
                        name="distributorPercent"
                        type="number"
                        step="0.01"
                        value={distributorPercent || ""}
                        onChange={(e) =>
                          setDistributorPercent(Number(e.target.value) || 0)
                        }
                        className="form-input price-input"
                        placeholder="0"
                      />
                      <span className="price-currency">%</span>
                    </div>
                  </label>
                </div>
                <div className="pricing-computed">
                  <div className="pricing-computed-row">
                    <span className="pricing-computed-label">
                      Selling Price
                    </span>
                    <span className="pricing-computed-value">
                      {formatCurrency(String(Math.ceil(sellingPrice)))} ₫
                    </span>
                  </div>
                  <div className="pricing-computed-row">
                    <span className="pricing-computed-label">Listed Price</span>
                    <span className="pricing-computed-value">
                      {formatCurrency(String(Math.ceil(listedPrice)))} ₫
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Options & Variants */}
            <VariantBuilder
              name="variantOptions"
              defaultOptions={defaultVariantOptions}
              defaultPrice={costDisplay}
            />
          </div>

          {/* Right Sidebar */}
          <div className="shopify-form-sidebar">
            {/* Status */}
            <div className="form-card">
              <div className="form-card-header">
                <h2 className="form-card-title">Status</h2>
              </div>
              <div className="form-card-body">
                <label className="form-field">
                  <select
                    name="priceVisibility"
                    defaultValue={snapshot.priceVisibility}
                    className="form-input"
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
                </label>
                <p className="form-hint">{visibilityDesc}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="form-actions-bar">
        <button type="submit" className="btn btn-primary" disabled={isPending}>
          {isPending ? "Saving..." : product ? "Save" : "Save product"}
        </button>
      </div>
    </form>
  );
}
