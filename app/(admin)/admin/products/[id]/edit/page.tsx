"use client";

import { ProductForm } from "components/admin/product-form";
import { getProduct, updateProduct } from "lib/admin-api";
import { parseProductFormData, type Product } from "lib/backend-api";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useAdminLocale } from "components/admin/admin-locale-context";

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { t } = useAdminLocale();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProduct(id)
      .then(setProduct)
      .catch(() => setError(t.editProduct.notFound));
  }, [id]);

  if (error) {
    return (
      <div className="max-w-[1480px] p-7 pb-12">
        <div className="py-10 text-center text-sm font-medium text-muted-foreground">
          {error}
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-[1480px] p-7 pb-12">
        <div className="py-10 text-center text-sm text-muted-foreground">
          {t.editProduct.loading}
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
    <div className="max-w-[1480px] p-7 pb-12">
      <div className="mb-5 flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/products">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold tracking-tight">
          {product.model}
        </h1>
      </div>

      <ProductForm product={product} action={handleSubmit} />
    </div>
  );
}
