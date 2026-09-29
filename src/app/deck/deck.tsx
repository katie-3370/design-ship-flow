"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { RatingCard } from "@/components";
import { Container, Grid, Stack } from "@/components/layout";
import { Badge, Button, Card, CardDescription, CardTitle, Heading, Text } from "@/components/ui";
import { cn } from "@/lib/cn";

/**
 * /deck: a short proposal deck built entirely from the Harbor library.
 * Present with arrow keys / space / page down; on phones it simply scrolls.
 */

function Slide({ children, tone = "bg" }: { children: ReactNode; tone?: "bg" | "surface" }) {
  return (
    <section
      data-slide
      className={cn(
        "flex min-h-dvh items-center py-20 md:snap-start",
        tone === "surface" ? "bg-surface" : "bg-bg",
      )}
    >
      <Container size="xl">{children}</Container>
    </section>
  );
}

function Kicker({ children }: { children: ReactNode }) {
  return (
    <Text size="sm" tone="subtle" className="font-mono">
      {children}
    </Text>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-base text-text-muted">
          <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-text-subtle" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function Steps({ steps }: { steps: string[] }) {
  return (
    <ol className="flex flex-col gap-4">
      {steps.map((step, i) => (
        <li key={step} className="flex gap-4">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-fg">
            {i + 1}
          </span>
          <Text tone="muted" className="pt-0.5">
            {step}
          </Text>
        </li>
      ))}
    </ol>
  );
}

const loop = [
  { title: "Design", body: "In the Figma sandbox, using library parts." },
  {
    title: "Build",
    body: "Claude builds it from existing components and tokens, and reports gaps first.",
  },
  {
    title: "Check",
    body: "Every PR: build, token guardrail, live preview, Storybook and a visual diff.",
  },
  { title: "Review & merge", body: "Designer reviews the visuals, developer reviews the code." },
  { title: "Sync", body: "The Figma library regenerates from what shipped." },
];

const TOTAL = 7;

export function Deck() {
  const ref = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const slides = Array.from(root.querySelectorAll<HTMLElement>("[data-slide]"));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting) setCurrent(slides.indexOf(e.target as HTMLElement) + 1);
      },
      { root, threshold: 0.6 },
    );
    slides.forEach((s) => observer.observe(s));

    const onKey = (e: KeyboardEvent) => {
      const next = ["ArrowRight", "ArrowDown", "PageDown", " "].includes(e.key);
      const prev = ["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key);
      if (!next && !prev) return;
      e.preventDefault();
      const idx = slides.findIndex((s) => Math.abs(s.getBoundingClientRect().top) < 8);
      const target =
        slides[Math.min(slides.length - 1, Math.max(0, (idx < 0 ? 0 : idx) + (next ? 1 : -1)))];
      target?.scrollIntoView({ behavior: "smooth" });
    };
    window.addEventListener("keydown", onKey);
    return () => {
      observer.disconnect();
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <main ref={ref} className="h-dvh overflow-y-auto bg-bg text-text md:snap-y md:snap-mandatory">
      {/* 1 · Title */}
      <Slide>
        <Stack gap={8} className="max-w-4xl">
          <Badge variant="outline" className="self-start">
            Proposal · Design & Engineering
          </Badge>
          <Heading level={1} size="display">
            Design ships to code
          </Heading>
          <Text size="lg" tone="muted" className="max-w-2xl">
            Make code the source of truth for our design system. Designers ship components through
            reviewed pull requests, and Figma becomes the sandbox.
          </Text>
          <Text size="sm" tone="subtle">
            Katie Proulx · Agilno · September 2026
          </Text>
        </Stack>
      </Slide>

      {/* 2 · Problem */}
      <Slide tone="surface">
        <Stack gap={10}>
          <Stack gap={3}>
            <Kicker>01 · The problem</Kicker>
            <Heading level={2} size="xl" className="max-w-3xl">
              Figma is the source of truth, and code drifts away from it
            </Heading>
          </Stack>
          <Grid cols={3} gap={4}>
            {[
              ["Two sources of truth", "Figma and code drift apart a little more every sprint."],
              ["Lossy handoff", "Specs get reinterpreted. Spacing, states and tokens get lost."],
              ["Designers can't ship", "Every visual fix waits in a developer's queue."],
            ].map(([t, d]) => (
              <Card key={t} padding="lg">
                <CardTitle>{t}</CardTitle>
                <CardDescription className="text-base">{d}</CardDescription>
              </Card>
            ))}
          </Grid>
        </Stack>
      </Slide>

      {/* 3 · Proposal */}
      <Slide>
        <Stack gap={10}>
          <Stack gap={3}>
            <Kicker>02 · The proposal</Kicker>
            <Heading level={2} size="xl" className="max-w-3xl">
              Code is the source of truth. Figma is the sandbox.
            </Heading>
          </Stack>
          <Grid cols={2} gap={4}>
            <Card variant="raised" padding="lg">
              <CardTitle>Code owns</CardTitle>
              <List
                items={[
                  "Design tokens: color, type, spacing, radius",
                  "Components and their props",
                  "The Figma library, generated from code",
                ]}
              />
            </Card>
            <Card variant="surface" padding="lg">
              <CardTitle>Figma is for</CardTitle>
              <List
                items={[
                  "Exploring flows and ideas",
                  "Designing new components",
                  "Proposing new tokens",
                ]}
              />
            </Card>
          </Grid>
          <Text tone="muted">
            Nothing reaches the library without going through a pull request.
          </Text>
        </Stack>
      </Slide>

      {/* 4 · The loop */}
      <Slide tone="surface">
        <Stack gap={10}>
          <Stack gap={3}>
            <Kicker>03 · How it works</Kicker>
            <Heading level={2} size="xl">
              One loop for every change
            </Heading>
          </Stack>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
            {loop.map((s, i) => (
              <Card key={s.title} className="relative">
                <Text size="sm" tone="subtle" className="font-mono">
                  0{i + 1}
                </Text>
                <CardTitle>{s.title}</CardTitle>
                <CardDescription>{s.body}</CardDescription>
                {i < loop.length - 1 && (
                  <ArrowRight
                    aria-hidden
                    className="absolute top-1/2 -right-3.5 z-10 hidden size-5 -translate-y-1/2 rounded-full bg-surface text-text-subtle md:block"
                  />
                )}
              </Card>
            ))}
          </div>
          <Text tone="muted">
            <code className="font-mono text-sm">main</code> is protected: nothing merges without a
            pull request and passing checks.
          </Text>
        </Stack>
      </Slide>

      {/* 5 · Roles & guardrails */}
      <Slide>
        <Stack gap={10}>
          <Stack gap={3}>
            <Kicker>04 · Who does what</Kicker>
            <Heading level={2} size="xl" className="max-w-3xl">
              Everyone reviews what they&apos;re best at
            </Heading>
          </Stack>
          <Grid cols={3} gap={4}>
            {[
              [
                "Designers",
                "Design in the sandbox, brief Claude, review previews, merge visual changes.",
              ],
              [
                "Developers",
                "Own the architecture and the rules file, review code, approve new primitives.",
              ],
              ["POs", "Every PR has a live preview link. Review features before they merge."],
            ].map(([t, d]) => (
              <Card key={t} variant="surface" padding="lg">
                <CardTitle>{t}</CardTitle>
                <CardDescription className="text-base">{d}</CardDescription>
              </Card>
            ))}
          </Grid>
          <Stack direction="horizontal" gap={2} wrap>
            {[
              "Hard-coded values fail CI",
              "Protected main branch",
              "Visual diff on every PR",
              "Rules file Claude follows",
            ].map((g) => (
              <Badge key={g} variant="neutral" dot>
                {g}
              </Badge>
            ))}
          </Stack>
        </Stack>
      </Slide>

      {/* 6 · New vs existing */}
      <Slide tone="surface">
        <Stack gap={10}>
          <Stack gap={3}>
            <Kicker>05 · Where it applies</Kicker>
            <Heading level={2} size="xl">
              New projects and existing ones
            </Heading>
          </Stack>
          <Grid cols={2} gap={4}>
            <Card variant="raised" padding="lg">
              <Stack gap={1}>
                <CardTitle>Net-new project</CardTitle>
                <CardDescription>No code yet, so Figma goes first, once.</CardDescription>
              </Stack>
              <Steps
                steps={[
                  "Design the foundations in Figma: color, type, spacing",
                  "Convert them once into code tokens and the first components",
                  "Code-first from then on; new work starts in the sandbox",
                ]}
              />
            </Card>
            <Card variant="raised" padding="lg">
              <Stack gap={1}>
                <CardTitle>Existing project</CardTitle>
                <CardDescription>The code already exists, so it goes first.</CardDescription>
              </Stack>
              <Steps
                steps={[
                  "Consolidate existing styles into one tokens file and a component library",
                  "Generate the Figma library from that code",
                  "New work starts in the sandbox and ships through PRs",
                ]}
              />
            </Card>
          </Grid>
        </Stack>
      </Slide>

      {/* 7 · Proof & ask */}
      <Slide>
        <Grid cols={2} gap={12} className="items-center">
          <Stack gap={8}>
            <Stack gap={3}>
              <Kicker>06 · Proven in a sandbox</Kicker>
              <Heading level={2} size="xl">
                Figma to production, and back
              </Heading>
              <Text size="lg" tone="muted">
                A new Rating component was designed in Figma, built in two reviewed PRs, merged, and
                synced back to the Figma library.
              </Text>
            </Stack>
            <Stack direction="horizontal" gap={2} wrap>
              {["1 new token", "1 new primitive", "1 new component", "0 hard-coded values"].map(
                (s) => (
                  <Badge key={s} variant="outline">
                    {s}
                  </Badge>
                ),
              )}
            </Stack>
            <Card variant="surface" padding="md">
              <CardTitle>The ask</CardTitle>
              <CardDescription className="text-base">
                Pilot it on our next project. We need one developer to own the repo setup, and POs
                reviewing through preview links.
              </CardDescription>
            </Card>
            <Stack direction="horizontal" gap={2} wrap>
              <Button asChild>
                <Link href="/">Live sandbox</Link>
              </Button>
              <Button asChild variant="secondary">
                <a href="https://github.com/katie-3370/design-ship-flow">Repo</a>
              </Button>
              <Button asChild variant="secondary">
                <a href="https://www.figma.com/design/H6SamGGGOWQN1tI2caZYiM">Figma library</a>
              </Button>
            </Stack>
          </Stack>
          <RatingCard
            elevation="raised"
            rating={3.5}
            date="2026-01-01"
            quote="Great work. Would die without this new workflow. Thanks Claude!"
            name="Katie Proulx"
            title="Senior Product Designer"
          />
        </Grid>
      </Slide>

      <div
        aria-live="polite"
        className="fixed right-6 bottom-6 z-20 rounded-full bg-surface-raised px-3 py-1 font-mono text-xs text-text-subtle shadow-xs"
      >
        {current} / {TOTAL}
      </div>
    </main>
  );
}
