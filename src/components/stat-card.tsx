import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { Card, Text } from "@/components/ui";
import { cn } from "@/lib/cn";

type StatCardProps = {
  label: string;
  value: string;
  /** Change vs. last period, e.g. "+12%" */
  delta?: string;
  /** Whether the change is good news; sets the delta color. The arrow follows the sign. */
  sentiment?: "good" | "bad";
};

export function StatCard({ label, value, delta, sentiment = "good" }: StatCardProps) {
  const Arrow = delta?.startsWith("-") ? ArrowDownRight : ArrowUpRight;
  return (
    <Card variant="raised" className="gap-3">
      <Text size="sm" tone="muted">
        {label}
      </Text>
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-3xl font-light tracking-tight">{value}</span>
        {delta && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 text-sm",
              sentiment === "good" ? "text-success" : "text-danger",
            )}
          >
            <Arrow className="size-4" aria-hidden />
            {delta}
          </span>
        )}
      </div>
    </Card>
  );
}
