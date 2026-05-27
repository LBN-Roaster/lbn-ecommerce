import { ProductTable } from "components/admin/product-table";
import Link from "next/link";

export default function AdminProductsPage() {
  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1 className="page-title">Products</h1>
          <div className="page-sub">Manage your product catalog</div>
        </div>
        <Link href="/admin/products/new" className="btn btn-primary">
          + Add product
        </Link>
      </div>

      <ProductTable />
    </div>
  );
}
