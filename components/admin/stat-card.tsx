import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkline } from "./sparkline";
import { cn } from "@/lib/utils";

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
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="text-[11.5px] font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </div>
          {spark && <Sparkline values={spark} />}
        </div>
        <div className="mt-2 font-mono text-2xl font-semibold tracking-tight">
          {value}
          {suffix && (
            <span className="ml-1 text-lg font-medium text-muted-foreground">
              {suffix}
            </span>
          )}
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
          {deltaPct != null && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 font-medium",
                isUp ? "text-emerald-600" : "text-red-500",
              )}
            >
              <DeltaArrow up={isUp} />
              {Math.abs(deltaPct).toFixed(1)}%
            </span>
          )}
          {foot && <span>{foot}</span>}
        </div>
      </CardContent>
    </Card>
  );
}
