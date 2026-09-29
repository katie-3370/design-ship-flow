import { Code2, Eye, PenTool, GitMerge, GitPullRequest, Palette } from "lucide-react";
import Link from "next/link";

import { FeatureCard, PricingTable, RatingCard, SiteFooter, SiteHeader } from "@/components";
import { Container, Grid, Section, Stack } from "@/components/layout";
import {
  Badge,
  Button,
  Card,
  Heading,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
} from "@/components/ui";

const reviews = [
  {
    rating: 5,
    date: "2026-03-12",
    quote:
      "We used to lose a week between the final frame and a merged PR. Now I open the pull request myself, review the stories in Chromatic, and the tokens keep everyone honest.",
    name: "Katie Proulx",
    title: "Senior Product Designer",
  },
  {
    rating: 4.5,
    date: "2026-02-03",
    quote: "Reviews are about the product now, not about which grey someone picked.",
    name: "Marco Ilić",
    title: "Frontend Lead",
  },
  {
    rating: 4,
    date: "2026-01-19",
    quote: "Every new component lands with stories for each state. QA finally has a map.",
    name: "Ana Petrović",
    title: "QA Engineer",
  },
];

const features = [
  {
    icon: Palette,
    title: "Tokens are the source",
    description: "Color, type, spacing and radius live in one file. Figma variables follow it.",
  },
  {
    icon: PenTool,
    title: "Figma is the sandbox",
    description: "Explore flows and new components freely, using the real library parts.",
  },
  {
    icon: GitPullRequest,
    title: "Ship through review",
    description: "Every change lands as a pull request with checks and a live preview.",
  },
];

const steps = [
  {
    icon: PenTool,
    title: "Design",
    body: "Build the component in Figma from library instances and variables.",
  },
  {
    icon: Code2,
    title: "Build",
    body: "Claude reads the frame and writes it from existing components and tokens.",
  },
  {
    icon: Eye,
    title: "Review",
    body: "Checks run and a preview link appears. Compare it against the frame.",
  },
  { icon: GitMerge, title: "Merge", body: "Approve and merge. Production updates in a minute." },
];

const demo = [
  {
    value: "design",
    label: "Design",
    title: "PricingCard · Figma",
    lines: ["Card / raised · padding lg", "Badge / solid · Popular", "Button / primary · lg"],
  },
  {
    value: "build",
    label: "Build",
    title: "pricing-card.tsx",
    lines: [
      '<Card variant="raised" padding="lg">',
      '<Badge variant="solid">',
      '<Button size="lg">',
    ],
  },
  {
    value: "review",
    label: "Review",
    title: "#12 Add PricingCard",
    lines: ["CI · all checks passed", "Preview · ready", "Storybook · 3 stories"],
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Section spacing="md" className="md:pt-32">
          <Container size="xl">
            <Stack gap={12}>
              <Grid cols={2} gap={10} className="items-end">
                <Stack gap={6}>
                  <Badge variant="outline" className="self-start">
                    Design ship flow · sandbox
                  </Badge>
                  <Heading level={1} size="display">
                    Ship design straight to code
                  </Heading>
                  <Stack direction="horizontal" gap={2} wrap>
                    <Button asChild size="lg">
                      <Link href="#pricing">Start free</Link>
                    </Button>
                    <Button asChild size="lg" variant="secondary">
                      <Link href="/dashboard">See the dashboard</Link>
                    </Button>
                  </Stack>
                </Stack>
                <Text size="lg" tone="muted" className="max-w-md">
                  Code is the source of truth for your components. Figma is where you explore.
                  Changes move between them through reviewed pull requests.
                </Text>
              </Grid>

              <Card variant="surface" padding="none" className="p-2">
                <Tabs defaultValue="build">
                  <TabsList className="flex w-full bg-transparent">
                    {demo.map((d) => (
                      <TabsTrigger key={d.value} value={d.value}>
                        {d.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {demo.map((d) => (
                    <TabsContent key={d.value} value={d.value} className="mt-2">
                      <Card className="min-h-64 justify-center md:p-12">
                        <Text size="sm" tone="subtle" className="font-mono">
                          {d.title}
                        </Text>
                        <Stack gap={2}>
                          {d.lines.map((line) => (
                            <Text key={line} className="font-mono text-lg md:text-xl">
                              {line}
                            </Text>
                          ))}
                        </Stack>
                      </Card>
                    </TabsContent>
                  ))}
                </Tabs>
              </Card>
            </Stack>
          </Container>
        </Section>

        <Section id="features">
          <Container size="xl">
            <Stack gap={10}>
              <Heading size="xl" className="max-w-2xl">
                One library, two places to work
              </Heading>
              <Grid cols={3} gap={4}>
                {features.map((f) => (
                  <FeatureCard key={f.title} {...f} />
                ))}
              </Grid>
            </Stack>
          </Container>
        </Section>

        <Section id="how-it-works" tone="surface">
          <Container size="xl">
            <Stack gap={10}>
              <Stack gap={3}>
                <Heading size="xl">How it works</Heading>
                <Text size="lg" tone="muted">
                  Four steps from frame to production.
                </Text>
              </Stack>
              <Grid cols={4} gap={4}>
                {steps.map((s, i) => (
                  <Card key={s.title}>
                    <Stack direction="horizontal" justify="between" align="center">
                      <s.icon className="size-5" aria-hidden />
                      <Text size="sm" tone="subtle" className="font-mono">
                        0{i + 1}
                      </Text>
                    </Stack>
                    <Stack gap={1}>
                      <Heading level={3} size="sm">
                        {s.title}
                      </Heading>
                      <Text size="sm" tone="muted">
                        {s.body}
                      </Text>
                    </Stack>
                  </Card>
                ))}
              </Grid>
            </Stack>
          </Container>
        </Section>

        <Section id="reviews">
          <Container size="xl">
            <Stack gap={10}>
              <Heading size="xl">What teams are saying</Heading>
              <Grid cols={3} gap={4}>
                {reviews.map((r, i) => (
                  <RatingCard
                    key={r.name}
                    {...r}
                    elevation={i === 0 ? "raised" : "surface"}
                    className={i === 0 ? "sm:col-span-2 lg:row-span-2" : undefined}
                  />
                ))}
              </Grid>
            </Stack>
          </Container>
        </Section>

        <Section id="pricing" spacing="lg">
          <Container size="lg">
            <Stack gap={12} align="center">
              <Stack gap={3} align="center" className="text-center">
                <Heading size="xl">Simple pricing</Heading>
                <Text size="lg" tone="muted">
                  Fictional plans, real components.
                </Text>
              </Stack>
              <PricingTable />
            </Stack>
          </Container>
        </Section>

        <Section tone="inverse" spacing="md">
          <Container size="xl">
            <Stack direction="horizontal" justify="between" align="center" gap={6} wrap>
              <Heading size="lg" className="text-primary-fg">
                Ready to ship your first component?
              </Heading>
              <Button asChild size="lg" variant="secondary">
                <Link href="/dashboard">Open the dashboard</Link>
              </Button>
            </Stack>
          </Container>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
