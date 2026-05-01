import { formatDate, formatVND, type Sale } from "lib/sales";

type Props = {
  sales: Sale[];
  limit?: number;
};

export function RecentSalesTable({ sales, limit }: Props) {
  const rows = limit !== undefined ? sales.slice(0, limit) : sales;

  if (rows.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-title">No sales yet</div>
        <div className="empty-state-hint">
          Sales will appear here once data/sales.json has entries.
        </div>
      </div>
    );
  }

  return (
    <table className="tbl">
      <thead>
        <tr>
          <th style={{ width: 110 }}>Date</th>
          <th>Product</th>
          <th>Buyer</th>
          <th>Location</th>
          <th className="num">Price</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((s) => (
          <tr key={s.id}>
            <td className="date-cell">{formatDate(s.date)}</td>
            <td>
              <span className="product-tag">{s.productHandle}</span>
            </td>
            <td>
              <div className="buyer">{s.buyer.name}</div>
              {s.buyer.contact && (
                <div className="buyer-contact">{s.buyer.contact}</div>
              )}
            </td>
            <td className="location-cell">{s.location.label}</td>
            <td className="num">{formatVND(s.price)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
