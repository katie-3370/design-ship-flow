import { Avatar, Card, Rating, Text } from "@/components/ui";

type RatingCardProps = {
  /** Figma `Elevation`: tinted panel or white card with a hairline ring */
  elevation?: "surface" | "raised";
  /** 0 to 5 in half steps */
  rating: number;
  /** ISO date, e.g. "2026-01-01" */
  date: string;
  quote: string;
  name: string;
  /** Job title shown under the name */
  title: string;
  avatarSrc?: string;
  className?: string;
};

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export function RatingCard({
  elevation = "surface",
  rating,
  date,
  quote,
  name,
  title,
  avatarSrc,
  className,
}: RatingCardProps) {
  return (
    <Card variant={elevation} padding="lg" className={className}>
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
        <Rating value={rating} size="md" />
        <Text as="span" size="xs" tone="subtle" className="whitespace-nowrap">
          <time dateTime={date}>{dateFormat.format(new Date(date))}</time>
        </Text>
      </div>
      <blockquote>
        <Text size="lg">{quote}</Text>
      </blockquote>
      <div className="mt-auto flex items-center gap-3">
        <Avatar name={name} src={avatarSrc} size="lg" />
        <div className="flex flex-col">
          <Text as="span" size="sm" weight="medium">
            {name}
          </Text>
          <Text as="span" size="sm" tone="muted">
            {title}
          </Text>
        </div>
      </div>
    </Card>
  );
}
