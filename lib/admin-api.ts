import type {
  Product,
  CreateProductPayload,
  UpdateProductPayload,
} from "./backend-api";

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status}: ${text}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as T;
}

export function getProducts(): Promise<Product[]> {
  return apiFetch<Product[]>("/api/admin/products");
}

export function getProduct(id: string): Promise<Product> {
  return apiFetch<Product>(`/api/admin/products/${id}`);
}

export function createProduct(data: CreateProductPayload): Promise<Product> {
  return apiFetch<Product>("/api/admin/products", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateProduct(
  id: string,
  data: UpdateProductPayload,
): Promise<Product> {
  return apiFetch<Product>(`/api/admin/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteProduct(id: string): Promise<void> {
  return apiFetch<void>(`/api/admin/products/${id}`, { method: "DELETE" });
}

export interface QuotationItem {
  productVariantId: string;
  quantity: number;
  priceType: "COST" | "SELLING" | "LISTED";
  discountPercent?: number;
  priceOverride?: number;
}

export interface QuotationRequest {
  customerId?: string;
  recipientName?: string;
  recipientAddress?: string;
  recipientCompany?: string;
  language?: string;
  items: QuotationItem[];
}

export async function generateQuotation(
  request: QuotationRequest,
): Promise<void> {
  const res = await fetch("/api/admin/quotations/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to generate quotation: ${text}`);
  }
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotation.pdf";
  a.click();
  URL.revokeObjectURL(url);
}
