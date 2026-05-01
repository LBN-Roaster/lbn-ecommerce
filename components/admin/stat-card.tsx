import { ReactNode } from "react";
import { Sparkline } from "./sparkline";

type Props = {
  label: string;
  value: string;
  suffix?: string;
  foot?: ReactNode;
  deltaPct?: number | null;
  spark?: number[];
};

function DeltaArrow({ up }: { up: boolean }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {up ? <path d="M2 7 L5 3 L8 7" /> : <path d="M2 3 L5 7 L8 3" />}
    </svg>
  );
}

export function StatCard({
  label,
  value,
  suffix,
  foot,
  deltaPct,
  spark,
}: Props) {
  const isUp = deltaPct != null && deltaPct >= 0;
  return (
    <div className="stat">
      <div className="stat-head">
        <div className="stat-label">{label}</div>
        {spark && <Sparkline values={spark} />}
      </div>
      <div className="stat-value">
        {value}
        {suffix && <span className="currency-suffix">{suffix}</span>}
      </div>
      <div className="stat-foot">
        {deltaPct != null && (
          <span className={"delta " + (isUp ? "up" : "down")}>
            <DeltaArrow up={isUp} />
            {Math.abs(deltaPct).toFixed(1)}%
          </span>
        )}
        {foot && <span>{foot}</span>}
      </div>
    </div>
  );
}
