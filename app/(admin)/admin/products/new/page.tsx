"use client";

import { ProductForm } from "components/admin/product-form";
import { createProduct } from "lib/admin-api";
import { parseProductFormData } from "lib/backend-api";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useAdminLocale } from "components/admin/admin-locale-context";

export default function NewProductPage() {
  const router = useRouter();
  const { t } = useAdminLocale();

  async function handleSubmit(formData: FormData) {
    const payload = { ...parseProductFormData(formData), variants: [] };
    await createProduct(payload);
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
          {t.productsPage.addProduct}
        </h1>
      </div>

      <ProductForm action={handleSubmit} />
    </div>
  );
}
