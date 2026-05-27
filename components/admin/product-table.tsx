"use client";

import { type Product } from "lib/backend-api";
import { getProducts, deleteProduct } from "lib/admin-api";
import { QuotationModal } from "./quotation-modal";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";

type FilterTab = "all" | "VISIBLE" | "HIDDEN" | "CONTACT_US";

const TABS: { value: FilterTab; label: string }[] = [
  { value: "all", label: "All" },
  { value: "VISIBLE", label: "Active" },
  { value: "HIDDEN", label: "Draft" },
  { value: "CONTACT_US", label: "Contact Us" },
];

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  VISIBLE: { label: "Active", className: "status-badge status-active" },
  HIDDEN: { label: "Draft", className: "status-badge status-draft" },
  CONTACT_US: { label: "Contact Us", className: "status-badge status-contact" },
};

function formatPrice(n: number) {
  return new Intl.NumberFormat("vi-VN").format(n);
}

function DeleteButton({
  id,
  onDeleted,
}: {
  id: string;
  onDeleted: () => void;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      className="action-link danger"
      disabled={pending}
      onClick={() => {
        if (!confirm("Delete this product?")) return;
        startTransition(async () => {
          await deleteProduct(id);
          onDeleted();
        });
      }}
    >
      {pending ? "..." : "Delete"}
    </button>
  );
}

export function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showQuotation, setShowQuotation] = useState(false);

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
      <div className="empty-state">
        <div className="empty-state-title">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="product-list">
      <div className="product-list-toolbar">
        <div className="search-box">
          <svg
            className="search-icon"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="9" cy="9" r="6" />
            <path d="M13.5 13.5L17 17" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="filter-tabs">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            className={
              "filter-tab" + (activeTab === tab.value ? " active" : "")
            }
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.label}
            <span className="filter-tab-count">{tabCounts[tab.value]}</span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-title">
            {search ? "No products match your search" : "No products yet"}
          </div>
          <div className="empty-state-hint">
            {search
              ? "Try a different search term"
              : "Add your first product to get started"}
          </div>
        </div>
      ) : (
        <div className="product-table-wrap">
          {selected.size > 0 && (
            <div className="bulk-bar">
              <span className="bulk-count">{selected.size} selected</span>
              <button
                className="btn btn-primary"
                style={{ fontSize: 12 }}
                onClick={() => setShowQuotation(true)}
              >
                Generate Quotation
              </button>
              <button
                className="btn btn-ghost"
                style={{ fontSize: 12 }}
                onClick={() => setSelected(new Set())}
              >
                Deselect all
              </button>
            </div>
          )}
          {showQuotation && (
            <QuotationModal
              products={products.filter((p) => selected.has(p.id))}
              onClose={() => setShowQuotation(false)}
            />
          )}
          <table className="tbl product-tbl">
            <thead>
              <tr>
                <th style={{ width: 40 }}>
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    className="checkbox"
                  />
                </th>
                <th style={{ width: 60 }}></th>
                <th>Product</th>
                <th>Status</th>
                <th className="num">Cost</th>
                <th className="num">Selling / %Rev</th>
                <th className="num">Listed / %Dist</th>
                <th style={{ width: 100 }}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className={selected.has(p.id) ? "selected" : ""}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selected.has(p.id)}
                      onChange={() => toggleOne(p.id)}
                      className="checkbox"
                    />
                  </td>
                  <td>
                    <div className="product-thumb">
                      {p.images && p.images.length > 0 ? (
                        <img src={p.images[0]} alt={p.model} />
                      ) : (
                        <div className="product-thumb-placeholder">
                          <svg
                            viewBox="0 0 20 20"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.2"
                          >
                            <rect x="2" y="2" width="16" height="16" rx="2" />
                            <circle cx="7" cy="7" r="1.5" />
                            <path d="M2 14l5-5 3 3 4-4 4 4v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <Link
                      href={`/admin/products/${p.id}/edit`}
                      className="product-cell-link"
                    >
                      {p.model}
                    </Link>
                  </td>
                  <td>
                    <span
                      className={
                        STATUS_CONFIG[p.priceVisibility]?.className ||
                        "status-badge"
                      }
                    >
                      {STATUS_CONFIG[p.priceVisibility]?.label ||
                        p.priceVisibility}
                    </span>
                  </td>
                  <td className="num">
                    <span className="price-line">
                      {formatPrice(p.costPrice)} ₫
                    </span>
                  </td>
                  <td className="num">
                    <span className="price-line">
                      {formatPrice(Math.ceil(p.sellingPrice))} ₫ /{" "}
                      {p.revenuePercent}%
                    </span>
                  </td>
                  <td className="num">
                    <span className="price-line">
                      {formatPrice(Math.ceil(p.listedPrice))} ₫ /{" "}
                      {p.distributorPercent}%
                    </span>
                  </td>
                  <td>
                    <div className="product-actions">
                      <Link
                        href={`/admin/products/${p.id}/edit`}
                        className="action-link"
                      >
                        Edit
                      </Link>
                      <DeleteButton id={p.id} onDeleted={refresh} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
