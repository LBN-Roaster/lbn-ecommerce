"use client";

import { ProductForm } from "components/admin/product-form";
import { getProduct, updateProduct } from "lib/admin-api";
import { parseProductFormData, type Product } from "lib/backend-api";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProduct(id)
      .then(setProduct)
      .catch(() => setError("Product not found"));
  }, [id]);

  if (error) {
    return (
      <div className="page">
        <div className="empty-state">
          <div className="empty-state-title">{error}</div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="page">
        <div className="empty-state">
          <div className="empty-state-title">Loading...</div>
        </div>
      </div>
    );
  }

  async function handleSubmit(formData: FormData) {
    const payload = parseProductFormData(formData);
    await updateProduct(id, payload);
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
          <div>
            <h1 className="page-title">{product.model}</h1>
          </div>
        </div>
      </div>

      <ProductForm product={product} action={handleSubmit} />
    </div>
  );
}
