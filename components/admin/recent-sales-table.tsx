"use client";

import { formatDate, formatVND, type Sale } from "lib/sales";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAdminLocale } from "./admin-locale-context";

type Props = {
  sales: Sale[];
  limit?: number;
};

export function RecentSalesTable({ sales, limit }: Props) {
  const { t } = useAdminLocale();
  const rows = limit !== undefined ? sales.slice(0, limit) : sales;

  if (rows.length === 0) {
    return (
      <div className="py-10 text-center text-sm text-muted-foreground">
        <div className="font-medium">{t.salesTable.noSales}</div>
        <div className="mt-1 text-xs">{t.salesTable.noSalesHint}</div>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[110px]">{t.salesTable.date}</TableHead>
          <TableHead>{t.salesTable.product}</TableHead>
          <TableHead>{t.salesTable.buyer}</TableHead>
          <TableHead>{t.salesTable.location}</TableHead>
          <TableHead className="text-right">{t.salesTable.price}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((s) => (
          <TableRow key={s.id}>
            <TableCell className="font-mono text-muted-foreground">
              {formatDate(s.date)}
            </TableCell>
            <TableCell>
              <span className="inline-flex items-center rounded border border-border bg-muted px-2 py-0.5 font-mono text-[11.5px] text-muted-foreground">
                {s.productHandle}
              </span>
            </TableCell>
            <TableCell>
              <div className="font-medium">{s.buyer.name}</div>
              {s.buyer.contact && (
                <div className="mt-0.5 text-[11.5px] text-muted-foreground">
                  {s.buyer.contact}
                </div>
              )}
            </TableCell>
            <TableCell className="text-muted-foreground">
              {s.location.label}
            </TableCell>
            <TableCell className="text-right font-mono">
              {formatVND(s.price)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
