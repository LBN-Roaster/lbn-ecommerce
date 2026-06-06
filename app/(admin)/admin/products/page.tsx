"use client";

import { ProductTable } from "components/admin/product-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useAdminLocale } from "components/admin/admin-locale-context";

export default function AdminProductsPage() {
  const { t } = useAdminLocale();

  return (
    <div className="max-w-[1480px] p-7 pb-12">
      <div className="mb-5 flex items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {t.productsPage.title}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {t.productsPage.subtitle}
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus className="h-4 w-4" />
            {t.productsPage.addProduct}
          </Link>
        </Button>
      </div>

      <ProductTable />
    </div>
  );
}
