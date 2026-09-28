import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

import { gapScale } from "./stack";

/** Grid: responsive columns. Collapses to one column on phones, then steps up. */
export const gridVariants = cva("grid grid-cols-1", {
  variants: {
    cols: {
      1: "",
      2: "sm:grid-cols-2",
      3: "sm:grid-cols-2 lg:grid-cols-3",
      4: "sm:grid-cols-2 lg:grid-cols-4",
    },
    gap: gapScale,
  },
  defaultVariants: { cols: 3, gap: 6 },
});

type GridProps = ComponentProps<"div"> & VariantProps<typeof gridVariants>;

export function Grid({ className, cols, gap, ...props }: GridProps) {
  return <div className={cn(gridVariants({ cols, gap }), className)} {...props} />;
}
