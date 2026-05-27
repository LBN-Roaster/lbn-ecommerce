"use client";

import { useState } from "react";
import { type Product, type ProductVariant } from "lib/backend-api";
import { generateQuotation } from "lib/admin-api";

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

function getVariantPrice(
  variant: ProductVariant,
  priceType: "COST" | "SELLING" | "LISTED",
): number {
  switch (priceType) {
    case "COST":
      return variant.costPrice;
    case "SELLING":
      return variant.sellingPrice;
    case "LISTED":
      return variant.listedPrice;
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
    <div className="quotation-modal-backdrop" onClick={onClose}>
      <div className="quotation-modal" onClick={(e) => e.stopPropagation()}>
        <div className="quotation-modal-header">
          <h2 className="quotation-modal-title">Generate Quotation</h2>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            <svg
              viewBox="0 0 20 20"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="quotation-modal-body">
          {error && <div className="form-error">{error}</div>}

          <div className="quotation-section">
            <div className="quotation-section-title">Quotation settings</div>
            <div className="quotation-recipient-fields">
              <label className="form-field">
                <span className="form-label">Name</span>
                <input
                  className="form-input"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Customer name"
                />
              </label>
              <label className="form-field">
                <span className="form-label">Company</span>
                <input
                  className="form-input"
                  value={recipientCompany}
                  onChange={(e) => setRecipientCompany(e.target.value)}
                  placeholder="Company name"
                />
              </label>
              <label className="form-field">
                <span className="form-label">Address</span>
                <input
                  className="form-input"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  placeholder="Delivery address"
                />
              </label>
              <label className="form-field">
                <span className="form-label">Sender Name</span>
                <input
                  className="form-input"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Your name"
                />
              </label>
              <label className="form-field">
                <span className="form-label">Sender Phone</span>
                <input
                  className="form-input"
                  value={senderPhone}
                  onChange={(e) => setSenderPhone(e.target.value)}
                  placeholder="Phone number"
                />
              </label>
              <label className="form-field">
                <span className="form-label">Language</span>
                <select
                  className="form-input"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="vi">Vietnamese</option>
                  <option value="en">English</option>
                </select>
              </label>
            </div>
          </div>

          <div className="quotation-section">
            <div className="quotation-section-title">
              Items ({lines.length})
            </div>
            <div className="quotation-items">
              {lines.map((line, idx) => {
                const selectedVariant = line.product.variants.find(
                  (v) => v.id === line.variantId,
                );
                const basePrice = selectedVariant
                  ? getVariantPrice(selectedVariant, line.priceType)
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
                  <div key={line.product.id} className="quotation-item">
                    <div className="quotation-item-header">
                      <div className="quotation-item-thumb">
                        {line.product.images &&
                        line.product.images.length > 0 ? (
                          <img
                            src={line.product.images[0]}
                            alt={line.product.model}
                          />
                        ) : (
                          <div className="quotation-item-thumb-placeholder" />
                        )}
                      </div>
                      <div className="quotation-item-info">
                        <span className="quotation-item-name">
                          {line.product.model}
                        </span>
                        {selectedVariant && (
                          <span className="quotation-item-price">
                            {formatPrice(Math.ceil(basePrice))} ₫
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        className="quotation-item-remove"
                        onClick={() => removeLine(idx)}
                        title="Remove"
                      >
                        <svg
                          viewBox="0 0 16 16"
                          width="14"
                          height="14"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
                        </svg>
                      </button>
                    </div>
                    <div className="quotation-item-grid">
                      {line.product.variants.length > 1 && (
                        <label className="form-field quotation-item-variant">
                          <span className="form-label">Variant</span>
                          <select
                            className="form-input"
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
                        </label>
                      )}
                      {line.product.variants.length === 0 && (
                        <div className="quotation-item-no-variant">
                          No variants available
                        </div>
                      )}
                      <label className="form-field">
                        <span className="form-label">Price Type</span>
                        <select
                          className="form-input"
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
                      </label>
                      <label className="form-field">
                        <span className="form-label">Qty</span>
                        <input
                          type="number"
                          className="form-input"
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
                      </label>
                      <label className="form-field">
                        <span className="form-label">Discount %</span>
                        <input
                          type="number"
                          className="form-input"
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
                      </label>
                      <label className="form-field">
                        <span className="form-label">Price Override</span>
                        <input
                          type="text"
                          className="form-input"
                          value={line.priceOverride}
                          onChange={(e) =>
                            updateLine(idx, {
                              priceOverride: e.target.value,
                            })
                          }
                          placeholder="Optional"
                        />
                      </label>
                    </div>
                    {selectedVariant && (
                      <div className="quotation-item-summary">
                        {hasDiscount ? (
                          <>
                            <span className="quotation-price-original">
                              {formatPrice(Math.ceil(basePrice))} ₫
                            </span>
                            <span className="quotation-price-arrow">→</span>
                            <span className="quotation-price-final">
                              {formatPrice(Math.ceil(finalUnit))} ₫
                            </span>
                            <span className="quotation-price-total">
                              × {line.quantity} ={" "}
                              {formatPrice(
                                Math.ceil(finalUnit * line.quantity),
                              )}{" "}
                              ₫
                            </span>
                          </>
                        ) : (
                          <span className="quotation-price-total">
                            {formatPrice(Math.ceil(basePrice))} ₫ ×{" "}
                            {line.quantity} ={" "}
                            {formatPrice(Math.ceil(basePrice * line.quantity))}{" "}
                            ₫
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="quotation-modal-footer">
          <button type="button" className="btn" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            disabled={generating || lines.every((l) => !l.variantId)}
            onClick={handleGenerate}
          >
            {generating ? "Generating..." : "Generate PDF"}
          </button>
        </div>
      </div>
    </div>
  );
}
