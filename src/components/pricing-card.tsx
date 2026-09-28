import { Check } from "lucide-react";

import { Badge, Button, Card, CardDescription, CardTitle } from "@/components/ui";
import { cn } from "@/lib/cn";

export type PricingCardProps = {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: string;
  /** The recommended plan: raised card, ink button and a badge */
  featured?: boolean;
};

export function PricingCard({
  name,
  price,
  period = "/ month",
  description,
  features,
  cta,
  featured,
}: PricingCardProps) {
  return (
    <Card variant={featured ? "raised" : "surface"} padding="lg" className="h-full">
      <div className="flex items-center justify-between">
        <CardTitle>{name}</CardTitle>
        {featured && <Badge variant="solid">Popular</Badge>}
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-5xl font-light tracking-tight">{price}</span>
        <span className="text-sm text-text-subtle">{period}</span>
      </div>
      <CardDescription>{description}</CardDescription>
      <Button variant={featured ? "primary" : "secondary"} size="lg" className="w-full">
        {cta}
      </Button>
      <ul className="flex flex-col gap-3 pt-2">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm">
            <Check
              aria-hidden
              className={cn("mt-0.5 size-4 shrink-0", featured ? "text-text" : "text-text-subtle")}
            />
            {f}
          </li>
        ))}
      </ul>
    </Card>
  );
}
