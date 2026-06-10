"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useAdminLocale } from "./admin-locale-context";

const EXAMPLE = ["0426", "L", "C", "HR", "030", "M", "0004"];

const COLORS = [
  { chip: "bg-violet-100 text-violet-800 border border-violet-300" },
  { chip: "bg-blue-100 text-blue-800 border border-blue-300" },
  { chip: "bg-emerald-100 text-emerald-800 border border-emerald-300" },
  { chip: "bg-orange-100 text-orange-800 border border-orange-300" },
  { chip: "bg-amber-100 text-amber-800 border border-amber-300" },
  { chip: "bg-pink-100 text-pink-800 border border-pink-300" },
  { chip: "bg-slate-100 text-slate-700 border border-slate-300" },
];

const ROW_BG = [
  "bg-violet-50",
  "bg-blue-50",
  "bg-emerald-50",
  "bg-orange-50",
  "bg-amber-50",
  "bg-pink-50",
  "bg-slate-50",
];

interface Entry {
  code?: string;
  meaning: { vi: string; en: string };
}

interface Segment {
  pos: number;
  entries: Entry[];
}

const SEGMENTS: Segment[] = [
  {
    pos: 1,
    entries: [{ meaning: { vi: "Tháng/Năm xuất xưởng", en: "Month / Year manufactured" } }],
  },
  {
    pos: 2,
    entries: [
      { code: "L", meaning: { vi: "LBN", en: "LBN" } },
      { code: "M", meaning: { vi: "MAROSA", en: "MAROSA" } },
    ],
  },
  {
    pos: 3,
    entries: [
      { code: "C", meaning: { vi: "CLASSICS", en: "CLASSICS" } },
      { code: "M", meaning: { vi: "MODERN", en: "MODERN" } },
    ],
  },
  {
    pos: 4,
    entries: [
      { code: "MR", meaning: { vi: "MANUAL", en: "Manual" } },
      { code: "HR", meaning: { vi: "AUTOMATIC", en: "Automatic" } },
      { code: "SR", meaning: { vi: "REMOTE + AUTOMATIC", en: "Remote + Automatic" } },
    ],
  },
  {
    pos: 5,
    entries: [
      { code: "001", meaning: { vi: "1.5 KG", en: "1.5 KG" } },
      { code: "003", meaning: { vi: "3 KG", en: "3 KG" } },
      { code: "006", meaning: { vi: "6 KG", en: "6 KG" } },
      { code: "015", meaning: { vi: "15 KG", en: "15 KG" } },
      { code: "030", meaning: { vi: "30 KG", en: "30 KG" } },
      { code: "060", meaning: { vi: "60 KG", en: "60 KG" } },
      { code: "120", meaning: { vi: "120 KG", en: "120 KG" } },
    ],
  },
  {
    pos: 6,
    entries: [
      { code: "M", meaning: { vi: "PLC + HMI MITSUBISHI", en: "PLC + HMI Mitsubishi" } },
      { code: "D", meaning: { vi: "PLC + HMI DELTA", en: "PLC + HMI Delta" } },
    ],
  },
  {
    pos: 7,
    entries: [{ meaning: { vi: "Số thứ tự máy", en: "Machine sequence number" } }],
  },
];

export function SerialNumberGuide() {
  const { t, locale } = useAdminLocale();

  return (
    <Card className="overflow-hidden">
      <div className="border-b border-border px-5 py-4">
        <h2 className="text-[15px] font-semibold tracking-tight">
          {t.serialGuide.title}
        </h2>
        <p className="mt-0.5 text-[13px] text-muted-foreground">
          {t.serialGuide.subtitle}
        </p>
      </div>

      {/* Example strip */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-border bg-muted/40 px-5 py-3">
        <span className="mr-1 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
          {t.serialGuide.example}
        </span>
        {EXAMPLE.map((seg, i) => (
          <span
            key={i}
            className={cn(
              "rounded px-2.5 py-0.5 font-mono text-[13px] font-semibold",
              COLORS[i]!.chip,
            )}
          >
            {seg}
          </span>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-border text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
              <th className="w-14 px-5 py-2.5 text-center">{t.serialGuide.position}</th>
              <th className="w-20 px-4 py-2.5 text-left">{t.serialGuide.codes}</th>
              <th className="px-4 py-2.5 text-left">{t.serialGuide.meaning}</th>
            </tr>
          </thead>
          <tbody>
            {SEGMENTS.map((seg) =>
              seg.entries.map((entry, ei) => (
                <tr
                  key={`${seg.pos}-${ei}`}
                  className={cn(
                    "border-b border-border/60 last:border-0",
                    ei === 0 && ROW_BG[seg.pos - 1],
                  )}
                >
                  {ei === 0 && (
                    <td
                      rowSpan={seg.entries.length}
                      className={cn(
                        "px-5 py-2 text-center align-middle",
                        ROW_BG[seg.pos - 1],
                      )}
                    >
                      <span
                        className={cn(
                          "inline-flex h-6 w-6 items-center justify-center rounded-full text-[12px] font-bold",
                          COLORS[seg.pos - 1]!.chip,
                        )}
                      >
                        {seg.pos}
                      </span>
                    </td>
                  )}
                  <td className="px-4 py-2 font-mono font-semibold">
                    {entry.code ?? ""}
                  </td>
                  <td className="px-4 py-2 text-foreground">
                    {entry.meaning[locale]}
                  </td>
                </tr>
              )),
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
