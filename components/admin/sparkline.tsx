type Props = {
  values: number[];
  width?: number;
  height?: number;
};

export function Sparkline({ values, width = 56, height = 18 }: Props) {
  if (values.length === 0) return null;
  const max = Math.max(...values, 1);
  const step = width / Math.max(values.length - 1, 1);
  const points = values
    .map(
      (v, i) =>
        `${(i * step).toFixed(1)},${(height - (v / max) * height).toFixed(1)}`,
    )
    .join(" ");
  return (
    <svg width={width} height={height} style={{ display: "block" }}>
      <polyline
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}
