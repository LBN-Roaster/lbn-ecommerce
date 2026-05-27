export type PriceVisibility = "VISIBLE" | "HIDDEN" | "CONTACT_US";
export type PriceType = "COST" | "SELLING" | "LISTED";

export interface ProductVariant {
  id: string;
  attributes: Record<string, unknown>;
  priceAdjustment: number;
  costPrice: number;
  sellingPrice: number;
  listedPrice: number;
  images: string[] | null;
}

export interface Product {
  id: string;
  model: string;
  generalInformation: string;
  detailInformation: Record<string, unknown> | null;
  costPrice: number;
  revenuePercent: number;
  distributorPercent: number;
  sellingPrice: number;
  listedPrice: number;
  priceVisibility: PriceVisibility;
  images: string[] | null;
  variants: ProductVariant[];
}

export interface CreateVariantPayload {
  attributes: Record<string, unknown>;
  priceAdjustment: number;
  images: string[];
}

export interface CreateProductPayload {
  model: string;
  generalInformation: string;
  detailInformation: Record<string, unknown> | null;
  costPrice: number;
  revenuePercent: number;
  distributorPercent: number;
  priceVisibility: PriceVisibility;
  images: string[];
  variants: CreateVariantPayload[];
}

export interface UpdateProductPayload {
  model: string;
  generalInformation: string;
  detailInformation: Record<string, unknown> | null;
  costPrice: number;
  revenuePercent: number;
  distributorPercent: number;
  priceVisibility: PriceVisibility;
  images: string[];
}

export function parseProductFormData(formData: FormData) {
  const imagesRaw = formData.get("images") as string;
  const images = imagesRaw
    ? imagesRaw
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  let detailInformation: Record<string, unknown> | null = null;
  const detailRaw = (formData.get("detailInformation") as string)?.trim();
  if (detailRaw) {
    try {
      detailInformation = JSON.parse(detailRaw);
    } catch {
      throw new Error("Detail information must be valid JSON");
    }
  }

  return {
    model: (formData.get("model") as string) || "",
    generalInformation: (formData.get("generalInformation") as string) || "",
    detailInformation,
    costPrice: Number(formData.get("costPrice")) || 0,
    revenuePercent: Number(formData.get("revenuePercent")) || 0,
    distributorPercent: Number(formData.get("distributorPercent")) || 0,
    priceVisibility:
      (formData.get("priceVisibility") as PriceVisibility) || "VISIBLE",
    images,
  };
}
