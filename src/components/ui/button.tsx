import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

/**
 * Button: the reference primitive. Every other component follows this pattern:
 * - styles come only from design tokens (bg-primary, rounded-md, text-sm...)
 * - variants are declared with cva and mirror the Figma component properties
 * - it forwards all native props, so it works anywhere a <button> does
 */
export const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 font-medium whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-fg hover:bg-primary-hover",
        secondary: "bg-secondary text-secondary-fg hover:bg-secondary-hover",
        outline: "border border-border-strong bg-transparent text-text hover:bg-surface-sunken",
        ghost: "bg-transparent text-text hover:bg-surface-sunken",
        danger: "bg-danger text-danger-fg hover:opacity-90",
      },
      size: {
        sm: "h-8 rounded-sm px-3 text-sm",
        md: "h-10 rounded-md px-4 text-sm",
        lg: "h-12 rounded-md px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonProps = ComponentProps<"button"> & VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, type = "button", ...props }: ButtonProps) {
  return (
    <button type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
