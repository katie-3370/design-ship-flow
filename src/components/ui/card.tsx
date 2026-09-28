import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

/**
 * Card: the large soft container. `surface` is the tinted panel used for page sections,
 * `raised` is a white card with a hairline ring, `outline` is border only.
 */
export const cardVariants = cva("flex flex-col rounded-xl text-text", {
  variants: {
    variant: {
      surface: "bg-surface",
      raised: "bg-surface-raised shadow-sm",
      outline: "border border-border",
    },
    padding: {
      none: "",
      md: "gap-4 p-6",
      lg: "gap-6 p-8",
    },
  },
  defaultVariants: { variant: "raised", padding: "md" },
});

type CardProps = ComponentProps<"div"> & VariantProps<typeof cardVariants>;

export function Card({ className, variant, padding, ...props }: CardProps) {
  return <div className={cn(cardVariants({ variant, padding }), className)} {...props} />;
}

export function CardHeader({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-1.5", className)} {...props} />;
}

export function CardTitle({ className, ...props }: ComponentProps<"h3">) {
  return <h3 className={cn("text-lg font-medium", className)} {...props} />;
}

export function CardDescription({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("text-sm text-text-muted", className)} {...props} />;
}

export function CardContent({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-3", className)} {...props} />;
}

export function CardFooter({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mt-auto flex items-center gap-2 pt-2", className)} {...props} />;
}
