import { cva, type VariantProps } from "class-variance-authority";
import { Star } from "lucide-react";
import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

/**
 * Rating: read-only star score from 0 to 5 in half steps, with an optional numeric value.
 * Screen readers get one label ("3.5 out of 5 stars"); the stars themselves are decorative.
 * Half stars are a filled star clipped to its left half over an outlined one.
 */
export const ratingVariants = cva("inline-flex items-center text-text", {
  variants: {
    size: {
      sm: "gap-2 text-sm",
      md: "gap-3 text-base",
    },
  },
  defaultVariants: { size: "sm" },
});

const starsVariants = cva("flex items-center text-rating", {
  variants: {
    size: {
      sm: "gap-1.5 [&_svg]:size-3.5",
      md: "gap-2 [&_svg]:size-4",
    },
  },
  defaultVariants: { size: "sm" },
});

const MAX = 5;

type RatingProps = Omit<ComponentProps<"div">, "children"> &
  VariantProps<typeof ratingVariants> & {
    /** 0 to 5; rounded to the nearest half */
    value: number;
    /** Show the number before the stars */
    showValue?: boolean;
  };

export function Rating({ value, size, showValue = true, className, ...props }: RatingProps) {
  const rounded = Math.min(MAX, Math.max(0, Math.round(value * 2) / 2));
  return (
    <div
      role="img"
      aria-label={`${rounded} out of ${MAX} stars`}
      className={cn(ratingVariants({ size }), className)}
      {...props}
    >
      {showValue && <span aria-hidden>{rounded}</span>}
      <span className={starsVariants({ size })} aria-hidden>
        {Array.from({ length: MAX }, (_, i) => {
          const fill = Math.min(1, Math.max(0, rounded - i));
          if (fill === 1) return <Star key={i} className="fill-current" />;
          if (fill === 0) return <Star key={i} />;
          return (
            <span key={i} className="relative inline-flex">
              <Star />
              <span className="absolute inset-y-0 left-0 w-1/2 overflow-hidden">
                <Star className="fill-current" />
              </span>
            </span>
          );
        })}
      </span>
    </div>
  );
}
