import type { LucideIcon } from "lucide-react";

import { Card, CardDescription, CardTitle } from "@/components/ui";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

/** FeatureCard: icon chip, title, one or two lines of copy, on the tinted surface. */
export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <Card variant="surface" padding="lg">
      <span className="flex size-10 items-center justify-center rounded-full bg-surface-raised shadow-xs">
        <Icon className="size-5" aria-hidden />
      </span>
      <div className="flex flex-col gap-2">
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </div>
    </Card>
  );
}
