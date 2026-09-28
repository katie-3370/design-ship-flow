import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

/** Gap steps on the 8px grid (plus 4px and 12px for tight UI). Shared by Stack and Grid. */
export const gapScale = {
  0: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  6: "gap-6",
  8: "gap-8",
  10: "gap-10",
  12: "gap-12",
  16: "gap-16",
} as const;

/** Stack: auto layout. Mirrors Figma's auto layout direction, gap and alignment. */
export const stackVariants = cva("flex", {
  variants: {
    direction: {
      vertical: "flex-col",
      horizontal: "flex-row",
    },
    gap: gapScale,
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
    },
    wrap: {
      true: "flex-wrap",
      false: "",
    },
  },
  defaultVariants: { direction: "vertical", gap: 4 },
});

type StackProps = ComponentProps<"div"> & VariantProps<typeof stackVariants>;

export function Stack({ className, direction, gap, align, justify, wrap, ...props }: StackProps) {
  return (
    <div
      className={cn(stackVariants({ direction, gap, align, justify, wrap }), className)}
      {...props}
    />
  );
}
