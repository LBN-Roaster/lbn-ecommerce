"use client";

import { formatVND, formatVNDCompact, type MonthBucket } from "lib/sales";
import { useState } from "react";

const W = 800;
const H = 220;
const PAD_L = 56;
const PAD_R = 16;
const PAD_T = 16;
const PAD_B = 32;
const INNER_W = W - PAD_L - PAD_R;
const INNER_H = H - PAD_T - PAD_B;
const TICKS = 4;

type SerializableBucket = {
  ym: string;
  date: string;
  revenue: number;
  units: number;
};

type Props = {
  data: SerializableBucket[];
};

function shortMonth(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short" });
}

function longMonth(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

function niceMax(maxValue: number): number {
  if (maxValue <= 0) return 100_000_000;
  return Math.ceil(maxValue / 100_000_000) * 100_000_000;
}

export function MonthlyRevenueChart({ data }: Props) {
  const [hover, setHover] = useState<number | null>(null);

  const rawMax = data.reduce((m, d) => Math.max(m, d.revenue), 0);
  const yMax = niceMax(rawMax);
  const tickValues = Array.from(
    { length: TICKS + 1 },
    (_, i) => (yMax / TICKS) * i,
  );

  const colWidth = INNER_W / Math.max(data.length, 1);
  const barWidth = Math.min(colWidth * 0.62, 38);
  const lastIndex = data.length - 1;

  return (
    <div style={{ position: "relative" }}>
      <svg
        className="chart-svg"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <g className="chart-grid">
          {tickValues.map((v, i) => {
            const y = PAD_T + INNER_H - (v / yMax) * INNER_H;
            return (
              <g key={i}>
                <line x1={PAD_L} y1={y} x2={W - PAD_R} y2={y} />
                <text
                  className="chart-axis-label"
                  x={PAD_L - 8}
                  y={y + 3.5}
                  textAnchor="end"
                >
                  {v === 0 ? "0" : formatVNDCompact(v)}
                </text>
              </g>
            );
          })}
        </g>

        {data.map((d, i) => {
          const x = PAD_L + i * colWidth + (colWidth - barWidth) / 2;
          const h = (d.revenue / yMax) * INNER_H;
          const y = PAD_T + INNER_H - h;
          const isHover = hover === i;
          const isCurrent = i === lastIndex;
          const opacity = hover == null ? 1 : isHover ? 1 : 0.35;

          return (
            <g key={d.ym}>
              <rect
                x={PAD_L + i * colWidth}
                y={PAD_T}
                width={colWidth}
                height={INNER_H}
                fill="transparent"
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
              />
              {h > 0 ? (
                <rect
                  className="chart-bar"
                  x={x}
                  y={y}
                  width={barWidth}
                  height={h}
                  fill={isCurrent ? "var(--ink)" : "var(--accent)"}
                  opacity={opacity}
                  rx="2"
                  pointerEvents="none"
                />
              ) : (
                <rect
                  x={x}
                  y={PAD_T + INNER_H - 1}
                  width={barWidth}
                  height={1.5}
                  fill="var(--line-strong)"
                  pointerEvents="none"
                />
              )}
              <text
                className="chart-axis-label"
                x={PAD_L + i * colWidth + colWidth / 2}
                y={H - PAD_B + 16}
                textAnchor="middle"
                fill={
                  isHover
                    ? "var(--ink)"
                    : isCurrent
                      ? "var(--ink-2)"
                      : "var(--ink-3)"
                }
              >
                {shortMonth(d.date)}
              </text>
            </g>
          );
        })}
      </svg>

      {hover != null &&
        (() => {
          const d = data[hover];
          if (!d) return null;
          const xPct = ((PAD_L + hover * colWidth + colWidth / 2) / W) * 100;
          const h = (d.revenue / yMax) * INNER_H;
          const yPct = ((PAD_T + INNER_H - h) / H) * 100;
          return (
            <div
              className="chart-tooltip"
              style={{ left: `${xPct}%`, top: `${yPct}%` }}
            >
              <div>{longMonth(d.date)}</div>
              <div style={{ marginTop: 4 }}>
                <strong>{formatVND(d.revenue)}</strong>
              </div>
              <div className="chart-tooltip-sub">
                {d.units} unit{d.units === 1 ? "" : "s"}
              </div>
            </div>
          );
        })()}
    </div>
  );
}
