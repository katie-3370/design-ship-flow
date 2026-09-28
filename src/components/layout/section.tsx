import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

/** Section: a full-width page band with consistent vertical rhythm. */
export const sectionVariants = cva("w-full", {
  variants: {
    spacing: {
      sm: "py-10 md:py-12",
      md: "py-16 md:py-20",
      lg: "py-20 md:py-32",
    },
    tone: {
      default: "bg-bg",
      surface: "bg-surface",
      inverse: "bg-primary text-primary-fg",
    },
  },
  defaultVariants: { spacing: "md", tone: "default" },
});

type SectionProps = ComponentProps<"section"> & VariantProps<typeof sectionVariants>;

export function Section({ className, spacing, tone, ...props }: SectionProps) {
  return <section className={cn(sectionVariants({ spacing, tone }), className)} {...props} />;
}
