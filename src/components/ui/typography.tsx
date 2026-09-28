import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

/**
 * Heading: display type is light and tightly tracked; small headings are regular weight.
 * `level` sets the HTML element (for accessibility), `size` sets the look. They're separate
 * on purpose: an h2 can look like a display heading, a card title can be an h3 that looks small.
 */
export const headingVariants = cva("text-text", {
  variants: {
    size: {
      display: "text-5xl font-light tracking-tight md:text-6xl",
      xl: "text-4xl font-light tracking-tight",
      lg: "text-3xl font-light tracking-tight",
      md: "text-2xl font-normal tracking-tight",
      sm: "text-lg font-medium",
      xs: "text-base font-medium",
    },
  },
  defaultVariants: { size: "lg" },
});

type HeadingProps = ComponentProps<"h2"> &
  VariantProps<typeof headingVariants> & { level?: 1 | 2 | 3 | 4 };

export function Heading({ level = 2, size, className, ...props }: HeadingProps) {
  const Tag = `h${level}` as const;
  return <Tag className={cn(headingVariants({ size }), className)} {...props} />;
}

/** Text: body copy. `tone` picks the text color, `size` the type scale step. */
export const textVariants = cva("", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
    },
    tone: {
      default: "text-text",
      muted: "text-text-muted",
      subtle: "text-text-subtle",
      danger: "text-danger",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
    },
  },
  defaultVariants: { size: "base", tone: "default", weight: "normal" },
});

type TextProps = ComponentProps<"p"> &
  VariantProps<typeof textVariants> & { as?: "p" | "span" | "div" };

export function Text({ as: Tag = "p", size, tone, weight, className, ...props }: TextProps) {
  return <Tag className={cn(textVariants({ size, tone, weight }), className)} {...props} />;
}
