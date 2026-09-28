import Link from "next/link";

import { Container, Grid, Stack } from "@/components/layout";
import { Text } from "@/components/ui";

import { Logo } from "./logo";

const columns = [
  { title: "Product", links: ["Features", "Pricing", "Changelog"] },
  { title: "Resources", links: ["Docs", "Storybook", "Guides"] },
  { title: "Company", links: ["About", "Careers", "Contact"] },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <Container size="xl" className="py-16">
        <Grid cols={4} gap={10}>
          <Stack gap={3}>
            <Logo />
            <Text size="sm" tone="muted" className="max-w-xs">
              A sandbox for shipping design straight to code.
            </Text>
          </Stack>
          {columns.map((col) => (
            <Stack key={col.title} gap={3}>
              <Text size="sm" weight="medium">
                {col.title}
              </Text>
              {col.links.map((label) => (
                <Link
                  key={label}
                  href="/"
                  className="text-sm text-text-muted transition-colors hover:text-text"
                >
                  {label}
                </Link>
              ))}
            </Stack>
          ))}
        </Grid>
        <Text size="xs" tone="subtle" className="mt-16">
          Harbor is a fictional brand used for testing a design system.
        </Text>
      </Container>
    </footer>
  );
}
