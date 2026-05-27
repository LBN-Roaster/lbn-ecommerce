"use client";

import { ProductForm } from "components/admin/product-form";
import { createProduct } from "lib/admin-api";
import { parseProductFormData } from "lib/backend-api";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    const payload = { ...parseProductFormData(formData), variants: [] };
    await createProduct(payload);
    router.push("/admin/products");
  }

  return (
    <div className="page">
      <div className="page-head">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/admin/products" className="back-arrow">
            <svg
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              width="20"
              height="20"
            >
              <path
                d="M13 4l-6 6 6 6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <h1 className="page-title">Add product</h1>
        </div>
      </div>

      <ProductForm action={handleSubmit} />
    </div>
  );
}
