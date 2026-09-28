import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Card, Heading, Text } from "@/components/ui";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
};

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <Card variant="outline" padding="lg" className="items-center border-dashed text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-surface">
        <Icon className="size-5 text-text-muted" aria-hidden />
      </span>
      <div className="flex max-w-sm flex-col gap-1.5">
        <Heading level={3} size="xs">
          {title}
        </Heading>
        <Text size="sm" tone="muted">
          {description}
        </Text>
      </div>
      {action}
    </Card>
  );
}
